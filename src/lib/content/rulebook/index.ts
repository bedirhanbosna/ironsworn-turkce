import type { Chapter } from './types.js';

// Rulebook bölümleri. Tamamlanan bölümler `available: true` + `load`.
// Yeni bölüm çevrilince: chN.ts ekle, available'ı true yap, load bağla.
export const chapters: Chapter[] = [
	{ num: 1, slug: 'temel-kurallar', title_en: 'The Basics', title_tr: 'Temel Kurallar', available: true,
		load: () => import('$lib/content/basics.js').then((m) => m.basicsPages) },
	{ num: 2, slug: 'karakterin', title_en: 'Your Character', title_tr: 'Karakterin', available: true,
		load: () => import('$lib/content/rulebook/karakterin.js').then((m) => m.karakterinPages) },
	{ num: 3, slug: 'hamleler', title_en: 'Moves', title_tr: 'Hamleler', available: true,
		load: () => import('$lib/content/rulebook/hamleler.js').then((m) => m.hamlelerPages) },
	{ num: 4, slug: 'dunyan', title_en: 'Your World', title_tr: 'Dünyan', available: true,
		load: () => import('$lib/content/rulebook/dunyan.js').then((m) => m.dunyanPages) },
	{ num: 5, slug: 'dusmanlar', title_en: 'Foes & Encounters', title_tr: 'Düşmanlar ve Karşılaşmalar', available: true,
		load: () => import('$lib/content/rulebook/dusmanlar.js').then((m) => m.dusmanlarPages) },
	{ num: 6, slug: 'kehanetler', title_en: 'Oracles', title_tr: 'Kehanetler', available: true,
		load: () => import('$lib/content/rulebook/kehanetler.js').then((m) => m.kehanetlerPages) },
	{ num: 7, slug: 'derinlemesine', title_en: 'Gameplay in Depth', title_tr: 'Derinlemesine Oyun', available: false },
];

export function getChapter(slug: string): Chapter | undefined {
	return chapters.find((c) => c.slug === slug);
}
