import type { IconName } from '$lib/icons.js';

// Referans PDF belgeleri. Dosyalar build/dev'de copy-data.js ile static/pdf/ altına kopyalanır.
export interface DocEntry {
	file: string;        // /pdf/<file>
	icon: IconName;
	title_tr: string;
	title_en: string;
	desc_tr: string;
	desc_en: string;
	size: string;
	offline: boolean;    // PWA önbelleğinde tutulmaya uygun mu (büyük Rulebook hariç)
}

export const docs: DocEntry[] = [
	{
		file: 'rules-summary.pdf',
		icon: 'scales',
		title_tr: 'Kural Özeti',
		title_en: 'Rules Summary',
		desc_tr: 'Tüm hamleleri ve temel kuralları içeren iki sayfalık hızlı referans. Oyun sırasında en çok bakacağın belge.',
		desc_en: 'A concise reference sheet of every move and the core rules. The document you will reach for most during play.',
		size: '0.5 MB',
		offline: true,
	},
	{
		file: 'playkit.pdf',
		icon: 'scroll',
		title_tr: 'Oyun Kiti',
		title_en: 'Play Kit',
		desc_tr: 'Karakter sayfaları, ilerleme izleri ve yazdırılabilir oyun yardımcıları.',
		desc_en: 'Character sheets, progress tracks, and printable play aids.',
		size: '1.1 MB',
		offline: true,
	},
	{
		file: 'assets-printable.pdf',
		icon: 'crossed-axes',
		title_tr: 'Yetenek Kartları (Yazdırılabilir)',
		title_en: 'Asset Cards (Printable)',
		desc_tr: 'Tüm yetenek kartlarının yazdırmaya uygun düzeni.',
		desc_en: 'Print-ready layout of all asset cards.',
		size: '0.5 MB',
		offline: true,
	},
	{
		file: 'world-workbook.pdf',
		icon: 'earth',
		title_tr: 'Dünya Çalışma Kitabı',
		title_en: 'World Workbook',
		desc_tr: 'Dünya gerçeklerini seçmek ve kendi Demir Diyarlar\'ını oluşturmak için çalışma sayfaları.',
		desc_en: 'Worksheets for choosing world truths and building your own Ironlands.',
		size: '0.1 MB',
		offline: true,
	},
	{
		file: 'rulebook.pdf',
		icon: 'book',
		title_tr: 'Tam Kural Kitabı',
		title_en: 'Full Rulebook',
		desc_tr: 'Eksiksiz Ironsworn kural kitabı — tüm kurallar, dünya/lore, oyun örnekleri ve görseller. Büyük dosya (~40 MB), ilk açılışta indirilir.',
		desc_en: 'The complete Ironsworn rulebook — all rules, setting/lore, examples of play, and art. Large file (~40 MB), downloads on first open.',
		size: '40 MB',
		offline: false,
	},
];

export const docByFile: Record<string, DocEntry> = Object.fromEntries(docs.map((d) => [d.file, d]));
