#!/usr/bin/env node
// strings.todo.json'daki dolu tr alanlarından tr.json overlay'i derler.
// Token bütünlüğü doğrulaması da yapar.
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { validateEntry } from './i18n-validate.js';

const inPath = 'data/i18n/classic/strings.todo.json';
const outPath = 'data/i18n/classic/tr.json';

const strings: Record<string, { en: string; tr: string }> = JSON.parse(readFileSync(inPath, 'utf8'));

const overlay: Record<string, string> = {};
const warnings: string[] = [];

for (const [key, val] of Object.entries(strings)) {
	if (!val.tr) continue;

	// Token/link bütünlüğü — bozulsa da overlay'e ekle ama uyar
	warnings.push(...validateEntry(key, val.en, val.tr));

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
