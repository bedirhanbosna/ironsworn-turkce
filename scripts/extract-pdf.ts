/**
 * Ironsworn Rulebook PDF → JSON çıkarım script'i
 * Çalıştır: npx tsx scripts/extract-pdf.ts
 * Resumable: mevcut rulebook.json varsa text_tr değerleri korunur.
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';

const PDF_PATH = 'Oyun dataları/Ironsworn-Rulebook.pdf';
const OUT_PATH = 'data/pdf/rulebook.json';

// Atlanacak başlıklar (ön madde / oyun içeriği değil)
const SKIP_HEADINGS = new Set([
	'WRITING AND DESIGN', 'ACKNOWLEDGEMENTS', 'PLAYTESTERS AND CONTRIBUTORS',
	'SPECIAL THANKS', 'IMAGE CREDITS', 'CONTENTS',
	'IRONSWORN', 'IRONSWORN RULEBOOK',
]);

// Footer/tekrarlayan satır kalıpları
const SKIP_PATTERNS = [
	/^IRONSWORN$/i,
	/^IRONSWORN RULEBOOK$/i,
	/^CHAPTER \d+$/,
	/^\d{1,3}$/, // salt sayfa numarası
];

function isSkipLine(line: string): boolean {
	return SKIP_PATTERNS.some(p => p.test(line));
}

// BÜYÜK HARF başlık tespiti
function isUpperHeading(line: string): boolean {
	if (line.length < 4) return false;
	return /^[A-Z][A-Z0-9 ':,&\-\/()]+$/.test(line);
}

function slugify(text: string): string {
	return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ------------------------------------------------------------------
// PDF metni al
// ------------------------------------------------------------------
console.log('PDF okunuyor…');
const raw = execSync(`pdftotext "${PDF_PATH}" -`, { maxBuffer: 50 * 1024 * 1024 }).toString('utf-8');
const pages = raw.split('\f');
console.log(`Toplam sayfa: ${pages.length}`);

// ------------------------------------------------------------------
// Bölüm tespiti
// ------------------------------------------------------------------
interface ChapterInfo { num: number; title: string; slug: string; startPdf: number; }
const chapters: ChapterInfo[] = [];
for (let i = 0; i < pages.length; i++) {
	const lines = pages[i].split('\n').map(l => l.trim()).filter(Boolean);
	const chLine = lines.find(l => /^CHAPTER \d+$/.test(l));
	if (!chLine) continue;
	const num = parseInt(chLine.replace('CHAPTER ', ''));
	const titleLines: string[] = [];
	let after = false;
	for (const l of lines) {
		if (l === chLine) { after = true; continue; }
		if (after && l.length > 1) { titleLines.push(l); if (titleLines.length >= 2) break; }
	}
	const title = titleLines.join(' ').replace(/\s+/g, ' ').trim();
	chapters.push({ num, title, slug: slugify(title || `chapter-${num}`), startPdf: i + 1 });
}
console.log('Bölümler:', chapters.map(c => `CH${c.num}(sf${c.startPdf})`).join(' '));

function chapterForPage(pdfPage: number): ChapterInfo {
	let cur = chapters[0];
	for (const ch of chapters) { if (ch.startPdf <= pdfPage) cur = ch; }
	return cur;
}

function isChapterOpenerPage(pageText: string): boolean {
	const lines = pageText.split('\n').map(l => l.trim()).filter(Boolean);
	const meaningful = lines.filter(l => !SKIP_PATTERNS.some(p => p.test(l)));
	return meaningful.length <= 3 && meaningful.every(l => isUpperHeading(l) || l.length < 4);
}

// ------------------------------------------------------------------
// Paragraf yapısını koruyan metin birleştirici
// Her PDF sayfasındaki satırları düzgün paragraflara dönüştürür.
// - Boş satır → paragraf sonu (\n\n)
// - Ardışık dolu satırlar → pdftotext'in sütun sarması, boşlukla birleştir
// - \b (nokta öncüsü) karakterlerini sil
// ------------------------------------------------------------------
function buildParagraphText(lines: string[]): string {
	const out: string[] = [];
	let currentPara: string[] = [];

	function flush() {
		if (currentPara.length > 0) {
			out.push(currentPara.join(' '));
			currentPara = [];
		}
	}

	for (const line of lines) {
		if (line === '') {
			flush();
			out.push(''); // paragraf ayırıcı
		} else {
			currentPara.push(line);
		}
	}
	flush();

	// Ardışık boş satırları tek boşluğa indir
	return out
		.join('\n')
		.replace(/\n{2,}/g, '\n\n')
		.trim();
}

// ------------------------------------------------------------------
// Tip tanımı
// ------------------------------------------------------------------
export interface RulebookSection {
	id: string;
	chapter: number;
	chapter_slug: string;
	heading: string;
	level: 1 | 2;
	pdf_page: number;
	text_en: string;
	text_tr: string;
}

// ------------------------------------------------------------------
// Ana geçiş
// ------------------------------------------------------------------
const sections: RulebookSection[] = [];
let currentHeading: string | null = null;
let currentPdfPage = 1;
let currentChapter = chapters[0] ?? { num: 1, title: 'The Basics', slug: 'the-basics', startPdf: 11 };
let bodyLines: string[] = []; // boş satırlar dahil

function flushSection() {
	if (!currentHeading) return;
	if (SKIP_HEADINGS.has(currentHeading)) { bodyLines = []; return; }
	const text = buildParagraphText(bodyLines);
	const idBase = `ch${currentChapter.num}-${slugify(currentHeading)}`;
	const existing = sections.filter(s => s.id.startsWith(idBase));
	const id = existing.length > 0 ? `${idBase}-${existing.length + 1}` : idBase;
	sections.push({
		id, chapter: currentChapter.num, chapter_slug: currentChapter.slug,
		heading: currentHeading, level: 1, pdf_page: currentPdfPage,
		text_en: text, text_tr: '',
	});
}

for (let i = 0; i < pages.length; i++) {
	const pdfPage = i + 1;
	const pageText = pages[i];
	if (!pageText.trim()) continue;
	if (isChapterOpenerPage(pageText)) continue;

	const ch = chapterForPage(pdfPage);
	if (ch.num !== currentChapter.num) {
		if (currentHeading) flushSection();
		currentChapter = ch;
		currentHeading = null;
		bodyLines = [];
	}

	// Satırları temizle: \b (dot leader) kaldır, SKIP satırlarını atla
	// Boş satırları koru (paragraf sınırı)
	const rawLines = pageText.split('\n');
	let lastWasBlank = bodyLines.length > 0 && bodyLines[bodyLines.length - 1] === '';

	for (const raw of rawLines) {
		const line = raw.replace(/\b/g, '').trim();
		if (isSkipLine(line)) continue;

		if (line === '') {
			// Çift boş satır oluşmasın
			if (!lastWasBlank) { bodyLines.push(''); lastWasBlank = true; }
			continue;
		}
		lastWasBlank = false;

		if (isUpperHeading(line)) {
			if (currentHeading) flushSection();
			currentHeading = line;
			currentPdfPage = pdfPage;
			bodyLines = [];
			lastWasBlank = false;
		} else {
			bodyLines.push(line);
		}
	}
}
if (currentHeading) flushSection();

console.log(`Üretilen section sayısı: ${sections.length}`);

// ------------------------------------------------------------------
// Resumable
// ------------------------------------------------------------------
if (existsSync(OUT_PATH)) {
	const existing: RulebookSection[] = JSON.parse(readFileSync(OUT_PATH, 'utf-8'));
	const trMap = new Map(existing.map(s => [s.id, s.text_tr]));
	let preserved = 0;
	for (const s of sections) {
		const saved = trMap.get(s.id);
		if (saved) { s.text_tr = saved; preserved++; }
	}
	console.log(`Korunan text_tr: ${preserved}/${sections.length}`);
}

mkdirSync('data/pdf', { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(sections, null, '\t'), 'utf-8');
console.log(`Kaydedildi: ${OUT_PATH}`);
console.log(`Çevrilen: ${sections.filter(s => s.text_tr).length}/${sections.length}`);
