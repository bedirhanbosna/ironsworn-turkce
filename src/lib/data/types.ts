// Datasworn classic.json'dan alınan temel tipler (sadeleştirilmiş)

export interface DataswornRoot {
	_id: string;
	datasworn_version: string;
	type: string;
	title: { canonical: string; short?: string };
	rules: Rules;
	oracles: Record<string, OracleCollection>;
	assets: Record<string, AssetCollection>;
	moves: Record<string, MoveCategory>;
	npcs: Record<string, NpcCollection>;
	truths: Record<string, Truth>;
	atlas: Record<string, AtlasCollection>;
	rarities?: Record<string, Rarity>;
	delve_sites?: Record<string, DelveSite>;
	site_domains?: Record<string, SiteDomain>;
	site_themes?: Record<string, SiteTheme>;
}

export interface ImpactItem {
	label: string;
	description?: string;
	permanent?: boolean;
	shared?: boolean;
	prevents_recovery?: string[];
}

export interface ImpactCategory {
	label: string;
	description?: string;
	contents: Record<string, ImpactItem>;
}

export interface Rules {
	stats: Record<string, { label: string; description?: string }>;
	condition_meters: Record<string, { label: string; description?: string; min: number; max: number; rollable?: boolean }>;
	special_tracks?: Record<string, { label: string; description?: string }>;
	impacts: Record<string, ImpactCategory>;
	tags?: Record<string, unknown>;
}

export interface MoveCategory {
	_id: string;
	type: string;
	name: string;
	contents: Record<string, Move>;
	_source?: Source;
}

export interface Move {
	_id: string;
	type: string;
	name: string;
	roll_type: string;
	trigger: { text: string; conditions?: Condition[] };
	text: string;
	outcomes?: {
		strong_hit?: { text: string };
		weak_hit?: { text: string };
		miss?: { text: string };
	};
	_source: Source;
}

export interface Condition {
	method?: string;
	roll_options?: unknown[];
}

export interface OracleCollection {
	_id: string;
	type: string;
	name: string;
	oracle_type?: string;
	summary?: string;
	contents?: Record<string, OracleTable>;
	collections?: Record<string, OracleCollection>;
	_source: Source;
}

export interface OracleTable {
	_id: string;
	type: string;
	name: string;
	canonical_name?: string;
	oracle_type: string;
	dice?: string;
	summary?: string;
	column_labels?: { roll?: string; text: string; detail?: string };
	rows: OracleRow[];
	_source: Source;
}

export interface OracleRow {
	min: number | null;
	max: number | null;
	text: string;
	detail?: string;
	_i18n?: unknown;
}

export interface AssetCollection {
	_id: string;
	type: string;
	name: string;
	contents: Record<string, Asset>;
}

export interface Asset {
	_id: string;
	type: string;
	name: string;
	category: string;
	requirement?: string;
	shared?: boolean;
	count_as_impact?: boolean;
	abilities: AssetAbility[];
	_source: Source;
}

export interface AssetAbility {
	_id: string;
	enabled: boolean;
	text: string;
	moves?: Record<string, Move>;
}

export interface NpcCollection {
	_id: string;
	type: string;
	name: string;
	summary?: string;
	contents?: Record<string, Npc>;
	collections?: Record<string, NpcCollection>;
}

export interface Npc {
	_id: string;
	type: string;
	name: string;
	rank: number;
	nature: string;
	features: string[];
	drives: string[];
	tactics: string[];
	description?: string;
	quest_starter?: string;
	_source: Source;
}

export interface Truth {
	_id: string;
	type?: string;
	name: string;
	dice?: string;
	options: TruthOption[];
	_source: Source;
}

export interface TruthOption {
	min: number | null;
	max: number | null;
	description: string;
	quest_starter?: string;
}

export interface AtlasCollection {
	_id: string;
	type: string;
	name: string;
	summary?: string;
	contents?: Record<string, AtlasEntry>;
	collections?: Record<string, AtlasCollection>;
}

export interface AtlasEntry {
	_id: string;
	type: string;
	name: string;
	summary?: string;
	description?: string;
	features?: string[];
	quest_starter?: string;
	_source: Source;
}

export interface Rarity {
	_id: string;
	name: string;
	text: string;
	asset?: string;
	_source: Source;
}

export interface DelveSite {
	_id: string;
	name: string;
	rank: number;
	theme: string;
	domain: string;
	description?: string;
	_source: Source;
}

export interface SiteDomain {
	_id: string;
	name: string;
	summary?: string;
	description?: string;
	features: OracleRow[];
	dangers: OracleRow[];
	_source: Source;
}

export interface SiteTheme {
	_id: string;
	name: string;
	summary?: string;
	description?: string;
	features: OracleRow[];
	dangers: OracleRow[];
	_source: Source;
}

export interface Source {
	title: string;
	page?: number;
	authors?: { name: string }[];
	url?: string;
	license?: string;
}

// --- Arama / flat index tipi ---
export type SearchableType = 'move' | 'oracle' | 'asset' | 'npc' | 'truth' | 'atlas' | 'page';

export interface SearchEntry {
	id: string;
	type: SearchableType;
	name: string;
	category?: string;
	/** kısa özet/preview metin */
	preview?: string;
	/** normalize edilmiş arama haystack'i (EN+TR), büyük/küçük+aksan duyarsız */
	search: string;
	/** sayfa sonuçları için doğrudan hedef (varsa entryHref yerine kullanılır) */
	href?: string;
}

// Kural kitabı/belge sayfa başlık index'i (build-time üretilir; static/data/content_index.json)
export interface ContentIndexEntry {
	ctx: 'rulebook' | 'doc';
	slug: string;
	page: number;
	title_en: string;
	title_tr: string;
}
