// data/source/*.json + data/i18n/*/tr.json dosyalarını static/data/ altına kopyalar.
import { cpSync, mkdirSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

mkdirSync('static/data', { recursive: true });

// Kaynak JSON'lar
const sourceDir = 'data/source';
if (existsSync(sourceDir)) {
	for (const f of readdirSync(sourceDir)) {
		if (f.endsWith('.json')) {
			cpSync(join(sourceDir, f), join('static/data', f));
			console.log(`  copied ${f}`);
		}
	}
}

// TR overlay JSON'lar (örn. i18n/classic/tr.json → static/data/tr_classic.json)
const i18nDir = 'data/i18n';
if (existsSync(i18nDir)) {
	for (const ruleset of readdirSync(i18nDir)) {
		const trFile = join(i18nDir, ruleset, 'tr.json');
		if (existsSync(trFile)) {
			cpSync(trFile, join('static/data', `tr_${ruleset}.json`));
			console.log(`  copied tr_${ruleset}.json`);
		}
	}
}

// Rulebook JSON (çeviri dahil kaynak artefakt)
const rulebookJson = 'data/pdf/rulebook.json';
if (existsSync(rulebookJson)) {
	cpSync(rulebookJson, 'static/data/rulebook.json');
	console.log(`  copied rulebook.json`);
}

// Referans PDF'leri (Oyun dataları/*.pdf → static/pdf/<sade-ad>.pdf)
const pdfMap = {
	'Ironsworn-Rulebook.pdf':           'rulebook.pdf',
	'Ironsworn-Rules-Summary.pdf':      'rules-summary.pdf',
	'Ironsworn-Playkit.pdf':            'playkit.pdf',
	'Ironsworn-Assets-Printable-1.pdf': 'assets-printable.pdf',
	'Ironsworn-World-Workbook.pdf':     'world-workbook.pdf',
};
const pdfSrcDir = 'Oyun dataları';
if (existsSync(pdfSrcDir)) {
	mkdirSync('static/pdf', { recursive: true });
	for (const [src, dest] of Object.entries(pdfMap)) {
		const from = join(pdfSrcDir, src);
		if (existsSync(from)) {
			cpSync(from, join('static/pdf', dest));
			console.log(`  copied pdf/${dest}`);
		}
	}
}
