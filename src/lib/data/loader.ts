import type {
	DataswornRoot, Move, OracleTable, Asset, Npc, Truth,
	MoveCategory, OracleCollection, AssetCollection, NpcCollection, SearchEntry,
	RulebookSection
} from './types.js';

let _cache: DataswornRoot | null = null;
let _overlay: Record<string, string> | null = null;
let _rulebook: RulebookSection[] | null = null;

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

export async function loadRulebook(): Promise<RulebookSection[]> {
	if (_rulebook) return _rulebook;
	try {
		const res = await fetch('/data/rulebook.json');
		if (!res.ok) { _rulebook = []; return []; }
		_rulebook = await res.json();
	} catch {
		_rulebook = [];
	}
	return _rulebook!;
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

export function buildSearchIndex(data: DataswornRoot, overlay: Record<string, string>): SearchEntry[] {
	const entries: SearchEntry[] = [];

	for (const { cat, move } of iterMoves(data)) {
		entries.push({
			id: move._id,
			type: 'move',
			name: overlay[`${move._id}#name`] ?? move.name,
			category: overlay[`${cat._id}#name`] ?? cat.name,
			preview: (overlay[`${move._id}#trigger.text`] ?? move.trigger.text).slice(0, 120)
		});
	}

	for (const { table } of iterOracles(data)) {
		entries.push({
			id: table._id,
			type: 'oracle',
			name: overlay[`${table._id}#name`] ?? table.name,
			preview: table.summary ? (overlay[`${table._id}#summary`] ?? table.summary).slice(0, 120) : undefined
		});
	}

	for (const { col, asset } of iterAssets(data)) {
		entries.push({
			id: asset._id,
			type: 'asset',
			name: overlay[`${asset._id}#name`] ?? asset.name,
			category: overlay[`${col._id}#name`] ?? col.name
		});
	}

	for (const npc of iterNpcs(data)) {
		entries.push({
			id: npc._id,
			type: 'npc',
			name: overlay[`${npc._id}#name`] ?? npc.name,
			preview: npc.description ? (overlay[`${npc._id}#description`] ?? npc.description).slice(0, 120) : undefined
		});
	}

	for (const truth of Object.values(data.truths)) {
		entries.push({
			id: truth._id,
			type: 'truth',
			name: overlay[`${truth._id}#name`] ?? truth.name
		});
	}

	for (const col of Object.values(data.atlas)) {
		if (!col.contents) continue;
		for (const region of Object.values(col.contents)) {
			entries.push({
				id: region._id,
				type: 'atlas',
				name: overlay[`${region._id}#name`] ?? region.name,
				preview: region.summary ? (overlay[`${region._id}#summary`] ?? region.summary).slice(0, 120) : undefined
			});
		}
	}

	return entries;
}
