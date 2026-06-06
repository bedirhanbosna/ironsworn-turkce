// Kural kitabı (7 bölüm) + belge (3) sayfa BAŞLIKLARINI tek bir küçük JSON'a derler.
// Çıktı: static/data/content_index.json — ana sayfa araması iki dilli başlık eşleşmesi için kullanır.
// Sadece başlık (title_en/title_tr) alınır; tam metin index'e girmez.
import { mkdirSync, writeFileSync } from 'fs';
import type { RulebookPage } from '../src/lib/content/rulebook/types.js';
import type { ContentIndexEntry } from '../src/lib/data/types.js';

import { basicsPages } from '../src/lib/content/basics.js';
import { karakterinPages } from '../src/lib/content/rulebook/karakterin.js';
import { hamlelerPages } from '../src/lib/content/rulebook/hamleler.js';
import { dunyanPages } from '../src/lib/content/rulebook/dunyan.js';
import { dusmanlarPages } from '../src/lib/content/rulebook/dusmanlar.js';
import { kehanetlerPages } from '../src/lib/content/rulebook/kehanetler.js';
import { derinlemesinePages } from '../src/lib/content/rulebook/derinlemesine.js';
import { rulesSummaryPages } from '../src/lib/content/docs/rules_summary.js';
import { worldWorkbookPages } from '../src/lib/content/docs/world_workbook.js';
import { playkitPages } from '../src/lib/content/docs/playkit.js';

// slug → registry'deki slug ile birebir aynı (index.ts'lerle eşleşir)
const sources: { ctx: 'rulebook' | 'doc'; slug: string; pages: RulebookPage[] }[] = [
	{ ctx: 'rulebook', slug: 'temel-kurallar', pages: basicsPages },
	{ ctx: 'rulebook', slug: 'karakterin', pages: karakterinPages },
	{ ctx: 'rulebook', slug: 'hamleler', pages: hamlelerPages },
	{ ctx: 'rulebook', slug: 'dunyan', pages: dunyanPages },
	{ ctx: 'rulebook', slug: 'dusmanlar', pages: dusmanlarPages },
	{ ctx: 'rulebook', slug: 'kehanetler', pages: kehanetlerPages },
	{ ctx: 'rulebook', slug: 'derinlemesine', pages: derinlemesinePages },
	{ ctx: 'doc', slug: 'rules-summary', pages: rulesSummaryPages },
	{ ctx: 'doc', slug: 'world-workbook', pages: worldWorkbookPages },
	{ ctx: 'doc', slug: 'playkit', pages: playkitPages }
];

const index: ContentIndexEntry[] = [];
for (const { ctx, slug, pages } of sources) {
	for (const p of pages) {
		index.push({ ctx, slug, page: p.page, title_en: p.title_en, title_tr: p.title_tr });
	}
}

mkdirSync('static/data', { recursive: true });
writeFileSync('static/data/content_index.json', JSON.stringify(index));
console.log(`  content_index.json: ${index.length} başlık (${sources.length} kaynak)`);
