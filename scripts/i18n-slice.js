// Çeviri revizyonu için kategori dilimi çıkarma/birleştirme yardımcısı.
// Kullanım:
//   node scripts/i18n-slice.js extract <prefix> <out.json>
//   node scripts/i18n-slice.js merge <slice.json>
// extract: strings.todo.json'dan prefix ile başlayan key'leri <out.json>'a yazar.
// merge: <slice.json>'daki tr alanlarını strings.todo.json'a geri yazar (sadece o key'ler).
import { readFileSync, writeFileSync } from 'fs';

const SRC = 'data/i18n/classic/strings.todo.json';
const [, , cmd, arg1, arg2] = process.argv;

if (cmd === 'extract') {
	const prefix = arg1;
	const out = arg2;
	const all = JSON.parse(readFileSync(SRC, 'utf8'));
	const slice = {};
	for (const [k, v] of Object.entries(all)) {
		if (k.startsWith(prefix)) slice[k] = v;
	}
	writeFileSync(out, JSON.stringify(slice, null, '\t'), 'utf8');
	console.log(`extract: ${Object.keys(slice).length} key → ${out} (prefix="${prefix}")`);
} else if (cmd === 'merge') {
	const slicePath = arg1;
	const slice = JSON.parse(readFileSync(slicePath, 'utf8'));
	const all = JSON.parse(readFileSync(SRC, 'utf8'));
	let changed = 0;
	for (const [k, v] of Object.entries(slice)) {
		if (!(k in all)) { console.warn(`  UYARI: bilinmeyen key atlandı: ${k}`); continue; }
		if (all[k].tr !== v.tr) { all[k].tr = v.tr; changed++; }
		if (all[k].en !== v.en) console.warn(`  UYARI: en değişmiş (yok sayıldı): ${k}`);
	}
	writeFileSync(SRC, JSON.stringify(all, null, '\t'), 'utf8');
	console.log(`merge: ${changed} key güncellendi ← ${slicePath}`);
} else {
	console.error('Kullanım: extract <prefix> <out.json> | merge <slice.json>');
	process.exit(1);
}
