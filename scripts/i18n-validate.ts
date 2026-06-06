// strings.todo.json çeviri kayıtları için token/link bütünlüğü doğrulaması.
// build-i18n.ts buradan kullanır; saf fonksiyonlar olduğu için test edilebilir.

// Token regex: datasworn linkleri, template tagları, markdown bold
export const TOKEN_RE = /\[([^\]]+)\]\([^)]+\)|\{\{[^}]+\}\}|__[^_]+__/g;

// Markdown link hedeflerini (id:/move:/url) yakalar
const LINK_TARGET_RE = /\]\(([^)]+)\)/g;

/** Metindeki link hedeflerini hedef → adet olarak sayar. */
function countTargets(text: string): Map<string, number> {
	const counts = new Map<string, number>();
	for (const m of text.matchAll(LINK_TARGET_RE)) {
		counts.set(m[1], (counts.get(m[1]) ?? 0) + 1);
	}
	return counts;
}

/**
 * Tek bir EN→TR çeviri kaydını doğrular. Çeviri yapıyı bozmamalı:
 *  1. EN ve TR'deki token (link/template/bold) **sayısı** eşit olmalı.
 *  2. Markdown link **hedef kümesi** birebir korunmalı (yalnızca etiket çevrilir).
 *     Karşılaştırma sıradan bağımsızdır — Türkçe söz dizimi linkleri yeniden
 *     sıralayabilir; önemli olan aynı hedeflerin aynı adette bulunmasıdır.
 *     Eklenen/silinen/değişen hedef yine yakalanır.
 * Bozulma başına bir uyarı string'i döndürür; sorun yoksa boş dizi.
 */
export function validateEntry(key: string, en: string, tr: string): string[] {
	const warnings: string[] = [];

	const enCount = (en.match(TOKEN_RE) ?? []).length;
	const trCount = (tr.match(TOKEN_RE) ?? []).length;
	if (enCount !== trCount) {
		warnings.push(`TOKEN MISMATCH [${key}]: EN=${enCount} TR=${trCount}`);
	}

	const enTargets = countTargets(en);
	const trTargets = countTargets(tr);
	// Deterministik çıktı için hedefleri sıralı gez
	for (const target of [...new Set([...enTargets.keys(), ...trTargets.keys()])].sort()) {
		const e = enTargets.get(target) ?? 0;
		const t = trTargets.get(target) ?? 0;
		if (e > t) {
			warnings.push(`LINK TARGET MISSING [${key}]: "${target}" (EN'de ${e}, TR'de ${t})`);
		} else if (t > e) {
			warnings.push(`LINK TARGET ADDED [${key}]: "${target}" (EN'de ${e}, TR'de ${t})`);
		}
	}

	return warnings;
}
