// Sayfa-sayfa okuyucu için ortak tipler.

export interface RulebookPage {
	/** Kitap sayfası (PdfRef +11 ekleyip PDF iç sayfasına gider). */
	page: number;
	img: string;
	title_en: string;
	title_tr: string;
	text_en: string;
	text_tr: string;
	diagram?: 'action-roll' | 'move' | 'sheet';
}

export interface Chapter {
	num: number;
	slug: string;
	title_en: string;
	title_tr: string;
	available: boolean;
	/** Sayfaları tembel yükler (yalnızca available bölümlerde). */
	load?: () => Promise<RulebookPage[]>;
}
