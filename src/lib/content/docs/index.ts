import type { RulebookPage } from '../rulebook/types.js';

// Kural kitabı dışındaki yardımcı belgeler. Her biri RulebookReader ile gösterilir.
export interface DocMeta {
	slug: string;
	title_en: string;
	title_tr: string;
	desc_tr: string;
	desc_en: string;
	available: boolean;
	load?: () => Promise<RulebookPage[]>;
}

export const documents: DocMeta[] = [
	{
		slug: 'rules-summary',
		title_en: 'Rules Summary',
		title_tr: 'Kurallar Özeti',
		desc_tr: 'Tek sayfalık hızlı başvuru kartı.',
		desc_en: 'One-page quick reference card.',
		available: true,
		load: () => import('./rules_summary.js').then((m) => m.rulesSummaryPages)
	},
	{
		slug: 'world-workbook',
		title_en: 'World Workbook',
		title_tr: 'Dünya Çalışma Kitabı',
		desc_tr: 'Demir Diyarlar\'ın gerçeklerini seçtiğin çalışma sayfaları.',
		desc_en: 'Worksheets for choosing the truths of the Ironlands.',
		available: true,
		load: () => import('./world_workbook.js').then((m) => m.worldWorkbookPages)
	},
	{
		slug: 'playkit',
		title_en: 'Playkit',
		title_tr: 'Oyun Kiti',
		desc_tr: 'Hamle başvuruları ve karakter/ilerleme kayıt formları.',
		desc_en: 'Move reference and character/progress sheets.',
		available: true,
		load: () => import('./playkit.js').then((m) => m.playkitPages)
	}
];

export function getDoc(slug: string): DocMeta | undefined {
	return documents.find((d) => d.slug === slug);
}
