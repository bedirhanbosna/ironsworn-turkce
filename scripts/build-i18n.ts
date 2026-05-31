#!/usr/bin/env node
// strings.todo.json'daki dolu tr alanlarından tr.json overlay'i derler.
// Token bütünlüğü doğrulaması da yapar.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';

const inPath = 'data/i18n/classic/strings.todo.json';
const outPath = 'data/i18n/classic/tr.json';

const strings: Record<string, { en: string; tr: string }> = JSON.parse(readFileSync(inPath, 'utf8'));

// Token regex: datasworn linkleri, template tagları, markdown bold
const TOKEN_RE = /\[([^\]]+)\]\([^)]+\)|\{\{[^}]+\}\}|__[^_]+__/g;

const overlay: Record<string, string> = {};
const warnings: string[] = [];

for (const [key, val] of Object.entries(strings)) {
	if (!val.tr) continue;

	// Token bütünlüğü: EN ve TR'deki token sayısı eşleşmeli
	const enTokens = val.en.match(TOKEN_RE) ?? [];
	const trTokens = val.tr.match(TOKEN_RE) ?? [];

	// Uzunluk kontrolü — sadece miktar değil içerik
	const enCount = enTokens.length;
	const trCount = trTokens.length;
	if (enCount !== trCount) {
		warnings.push(`TOKEN MISMATCH [${key}]: EN=${enCount} TR=${trCount}`);
		// Yine de ekle ama uyar
	}

	// id: / move: protokolü korunmuş mu?
	const enLinks = [...val.en.matchAll(/\]\(([^)]+)\)/g)].map(m => m[1]);
	const trLinks = [...val.tr.matchAll(/\]\(([^)]+)\)/g)].map(m => m[1]);
	for (let i = 0; i < enLinks.length; i++) {
		if (enLinks[i] !== trLinks[i]) {
			warnings.push(`LINK TARGET CHANGED [${key}]: EN="${enLinks[i]}" TR="${trLinks[i] ?? 'missing'}"`);
		}
	}

	overlay[key] = val.tr;
}

mkdirSync('data/i18n/classic', { recursive: true });
writeFileSync(outPath, JSON.stringify(overlay, null, '\t'), 'utf8');

const total = Object.keys(strings).length;
const translated = Object.keys(overlay).length;

console.log(`Built tr.json: ${translated}/${total} strings translated.`);
if (warnings.length) {
	console.warn(`\n⚠ ${warnings.length} token warning(s):`);
	warnings.forEach(w => console.warn('  ' + w));
} else {
	console.log('✓ Token validation passed.');
}
