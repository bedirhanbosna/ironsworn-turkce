import type {
	DataswornRoot, Move, OracleTable, Asset, Npc, Truth,
	MoveCategory, OracleCollection, AssetCollection, NpcCollection, SearchEntry,
	ContentIndexEntry,
} from './types.js';
import { normalizeSearch } from './normalize.js';
import { chapters } from '$lib/content/rulebook/index.js';
import { documents } from '$lib/content/docs/index.js';

let _cache: DataswornRoot | null = null;
let _overlay: Record<string, string> | null = null;
let _contentIndex: ContentIndexEntry[] | null = null;

export async function loadRuleset(): Promise<DataswornRoot> {
	if (_cache) return _cache;
	const res = await fetch('/data/classic.json');
	if (!res.ok) throw new Error(`Veri yüklenemedi: ${res.status}`);
	_cache = await res.json();
	return _cache!;
}

export async function loadOverlay(): Promise<Record<string, string>> {
	if (_overlay) return _overlay;
	try {
		const res = await fetch('/data/tr_classic.json');
		if (!res.ok) { _overlay = {}; return {}; }
		_overlay = await res.json();
	} catch {
		_overlay = {};
	}
	return _overlay!;
}

/** Kural kitabı/belge sayfa başlık index'ini yükler (yoksa boş — geri uyumlu) */
export async function loadContentIndex(): Promise<ContentIndexEntry[]> {
	if (_contentIndex) return _contentIndex;
	try {
		const res = await fetch('/data/content_index.json');
		_contentIndex = res.ok ? await res.json() : [];
	} catch {
		_contentIndex = [];
	}
	return _contentIndex!;
}

/** `_id` ile birleştirilmiş alanı overlay'den veya EN'den döndürür */
export function t(id: string, field: string, en: string, overlay: Record<string, string>): string {
	const key = `${id}#${field}`;
	return overlay[key] ?? en;
}

// --- Flat iterators ---

export function* iterMoves(data: DataswornRoot): Generator<{ cat: MoveCategory; move: Move }> {
	for (const cat of Object.values(data.moves)) {
		for (const move of Object.values(cat.contents)) {
			yield { cat, move };
		}
	}
}

export function* iterOracles(data: DataswornRoot): Generator<{ path: string; table: OracleTable }> {
	function* walk(col: OracleCollection, path: string): Generator<{ path: string; table: OracleTable }> {
		if (col.contents) {
			for (const [k, tbl] of Object.entries(col.contents)) {
				yield { path: `${path}/${k}`, table: tbl };
			}
		}
		if (col.collections) {
			for (const [k, sub] of Object.entries(col.collections)) {
				yield* walk(sub, `${path}/${k}`);
			}
		}
	}
	for (const [k, col] of Object.entries(data.oracles)) {
		yield* walk(col, k);
	}
}

export function* iterAssets(data: DataswornRoot): Generator<{ col: AssetCollection; asset: Asset }> {
	for (const col of Object.values(data.assets)) {
		for (const asset of Object.values(col.contents)) {
			yield { col, asset };
		}
	}
}

export function* iterNpcs(data: DataswornRoot): Generator<Npc> {
	function* walk(col: NpcCollection): Generator<Npc> {
		if (col.contents) yield* Object.values(col.contents);
		if (col.collections) for (const sub of Object.values(col.collections)) yield* walk(sub);
	}
	for (const col of Object.values(data.npcs)) yield* walk(col);
}

// --- Search index builder ---

export function buildSearchIndex(
	data: DataswornRoot,
	overlay: Record<string, string>,
	contentIndex: ContentIndexEntry[] = []
): SearchEntry[] {
	const entries: SearchEntry[] = [];
	// EN + TR + (varsa) kategori metnini normalize edip aranabilir haystack üretir
	const hay = (...parts: (string | undefined)[]) => normalizeSearch(parts.filter(Boolean).join(' '));

	for (const { cat, move } of iterMoves(data)) {
		const name = overlay[`${move._id}#name`] ?? move.name;
		const category = overlay[`${cat._id}#name`] ?? cat.name;
		const trigger = overlay[`${move._id}#trigger.text`] ?? move.trigger.text;
		entries.push({
			id: move._id, type: 'move', name, category,
			preview: trigger.slice(0, 120),
			search: hay(name, move.name, category, cat.name, trigger, move.trigger.text)
		});
	}

	for (const { table } of iterOracles(data)) {
		const name = overlay[`${table._id}#name`] ?? table.name;
		const summaryTr = table.summary ? overlay[`${table._id}#summary`] ?? table.summary : undefined;
		entries.push({
			id: table._id, type: 'oracle', name,
			preview: summaryTr ? summaryTr.slice(0, 120) : undefined,
			search: hay(name, table.name, summaryTr, table.summary)
		});
	}

	for (const { col, asset } of iterAssets(data)) {
		const name = overlay[`${asset._id}#name`] ?? asset.name;
		const category = overlay[`${col._id}#name`] ?? col.name;
		entries.push({
			id: asset._id, type: 'asset', name, category,
			search: hay(name, asset.name, category, col.name)
		});
	}

	for (const npc of iterNpcs(data)) {
		const name = overlay[`${npc._id}#name`] ?? npc.name;
		const descTr = npc.description ? overlay[`${npc._id}#description`] ?? npc.description : undefined;
		entries.push({
			id: npc._id, type: 'npc', name,
			preview: descTr ? descTr.slice(0, 120) : undefined,
			search: hay(name, npc.name, descTr, npc.description)
		});
	}

	for (const truth of Object.values(data.truths)) {
		const name = overlay[`${truth._id}#name`] ?? truth.name;
		entries.push({ id: truth._id, type: 'truth', name, search: hay(name, truth.name) });
	}

	for (const col of Object.values(data.atlas)) {
		if (!col.contents) continue;
		for (const region of Object.values(col.contents)) {
			const name = overlay[`${region._id}#name`] ?? region.name;
			const summaryTr = region.summary ? overlay[`${region._id}#summary`] ?? region.summary : undefined;
			entries.push({
				id: region._id, type: 'atlas', name,
				preview: summaryTr ? summaryTr.slice(0, 120) : undefined,
				search: hay(name, region.name, summaryTr, region.summary)
			});
		}
	}

	// Kural kitabı + belge sayfa başlıkları (iki dilli, derin-link)
	const chapterTitle = new Map(chapters.map((c) => [c.slug, c.title_tr]));
	const docTitle = new Map(documents.map((d) => [d.slug, d.title_tr]));
	for (const ci of contentIndex) {
		const isBook = ci.ctx === 'rulebook';
		const container = (isBook ? chapterTitle.get(ci.slug) : docTitle.get(ci.slug)) ?? '';
		const href = isBook
			? `/kural-kitabi?ch=${ci.slug}&p=${ci.page}`
			: `/belgeler?doc=${ci.slug}&p=${ci.page}`;
		entries.push({
			id: `${ci.ctx}/${ci.slug}/${ci.page}`,
			type: 'page',
			name: ci.title_tr,
			category: `${isBook ? 'Kural Kitabı' : 'Belge'} · ${container}`,
			href,
			search: hay(ci.title_en, ci.title_tr, container)
		});
	}

	return entries;
}
