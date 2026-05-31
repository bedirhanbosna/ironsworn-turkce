#!/usr/bin/env node
// Pinlenmiş datasworn classic.json'u indirir ve data/source/classic.json'a yazar.
// Çalıştır: npx tsx scripts/fetch-source.ts
import { writeFileSync } from 'fs';

const SOURCES = [
	{
		id: 'classic',
		url: 'https://raw.githubusercontent.com/rsek/datasworn/main/datasworn/classic/classic.json',
		out: 'data/source/classic.json'
	}
];

for (const s of SOURCES) {
	console.log(`Fetching ${s.id}...`);
	const res = await fetch(s.url);
	if (!res.ok) throw new Error(`HTTP ${res.status} for ${s.url}`);
	const text = await res.text();
	writeFileSync(s.out, text, 'utf8');
	console.log(`  Saved ${text.length} bytes → ${s.out}`);
}
