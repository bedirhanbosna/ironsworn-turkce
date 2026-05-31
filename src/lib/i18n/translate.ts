// Runtime çeviri yardımcısı — overlay üzerinden çalışır

let _overlay: Record<string, string> = {};
let _loaded = false;

export async function loadTranslations(): Promise<void> {
	if (_loaded) return;
	try {
		const res = await fetch('/data/tr_classic.json');
		if (res.ok) _overlay = await res.json();
	} catch { /* overlay olmadan EN ile devam */ }
	_loaded = true;
}

export function tr(id: string, field: string, en: string, lang: 'tr' | 'en'): string {
	if (lang === 'en') return en;
	return _overlay[`${id}#${field}`] ?? en;
}

export function trArr(id: string, field: string, en: string[], lang: 'tr' | 'en'): string[] {
	if (lang === 'en') return en;
	return en.map((item, i) => _overlay[`${id}#${field}.${i}`] ?? item);
}
