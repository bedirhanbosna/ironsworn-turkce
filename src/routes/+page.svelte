<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay, buildSearchIndex } from '$lib/data/loader.js';
	import type { SearchEntry } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';

	let query = $state('');
	let allEntries: SearchEntry[] = $state([]);
	let loading = $state(true);

	onMount(async () => {
		const [data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
		allEntries = buildSearchIndex(data, overlay);
		loading = false;
	});

	const lang = $derived(langStore.current);

	const typeBadgeKey: Record<string, 'badge_move'|'badge_oracle'|'badge_asset'|'badge_npc'|'badge_truth'|'badge_atlas'> = {
		move: 'badge_move', oracle: 'badge_oracle', asset: 'badge_asset',
		npc: 'badge_npc', truth: 'badge_truth', atlas: 'badge_atlas'
	};
	const typeHref: Record<string, string> = {
		move: '/moves', oracle: '/oracles', asset: '/assets', npc: '/npcs', truth: '/truths', atlas: '/atlas'
	};

	const results = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q || q.length < 2) return [];
		return allEntries.filter(e =>
			e.name.toLowerCase().includes(q) ||
			(e.preview?.toLowerCase().includes(q))
		).slice(0, 40);
	});

	function entryHref(e: SearchEntry) {
		return `${typeHref[e.type] ?? '/'}#${e.id.split('/').pop()}`;
	}
</script>

<div class="home">
	<div class="hero">
		<h1>{ui(lang, 'home_title')}</h1>
		<p class="subtitle">{ui(lang, 'home_subtitle')}</p>
	</div>

	<div class="search-box">
		<input
			type="search"
			placeholder={ui(lang, 'home_search')}
			bind:value={query}
		/>
	</div>

	{#if loading}
		<p class="hint">{ui(lang, 'loading')}</p>
	{:else if query.length >= 2 && results.length === 0}
		<p class="hint">{ui(lang, 'no_result')}</p>
	{:else if results.length > 0}
		<ul class="results">
			{#each results as e (e.id)}
				<li>
					<a href={entryHref(e)}>
						<span class="badge badge-{e.type}">{ui(lang, typeBadgeKey[e.type] ?? 'badge_move')}</span>
						<span class="name">{e.name}</span>
						{#if e.category}<span class="cat">{e.category}</span>{/if}
						{#if e.preview}<span class="preview">{e.preview}</span>{/if}
					</a>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="nav-cards">
			{#each [
				{ href: '/moves',   icon: '⚔', lk: 'home_moves',   dk: 'home_moves_d'   },
				{ href: '/oracles', icon: '🎲', lk: 'home_oracles', dk: 'home_oracles_d' },
				{ href: '/assets',  icon: '📜', lk: 'home_assets',  dk: 'home_assets_d'  },
				{ href: '/npcs',    icon: '💀', lk: 'home_npcs',    dk: 'home_npcs_d'    },
				{ href: '/truths',   icon: '🌍', lk: 'home_truths',    dk: 'home_truths_d'   },
				{ href: '/rulebook', icon: '📖', lk: 'home_rulebook',  dk: 'home_rulebook_d' },
				{ href: '/rules',    icon: '📐', lk: 'home_rules',     dk: 'home_rules_d'    },
				{ href: '/atlas',   icon: '🧭', lk: 'home_atlas',   dk: 'home_atlas_d'   },
				{ href: '/docs',    icon: '📄', lk: 'home_docs',    dk: 'home_docs_d'    },
			] as card}
				<a href={card.href} class="nav-card">
					<span class="icon">{card.icon}</span>
					<strong>{ui(lang, card.lk as any)}</strong>
					<span>{ui(lang, card.dk as any)}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.hero { margin-bottom: 1.5rem; }
	.subtitle { color: var(--text-3); margin-top: 0.25rem; }
	.search-box { margin-bottom: 1.25rem; }
	.hint { color: var(--text-3); margin-top: 0.5rem; }

	.results { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
	.results li a {
		display: flex; align-items: baseline; gap: 0.5rem;
		padding: 0.6rem 0.9rem; border-radius: var(--radius);
		background: var(--bg-2); text-decoration: none; color: var(--text-1);
		flex-wrap: wrap;
	}
	.results li a:hover { background: var(--bg-3); }
	.badge {
		font-size: 0.7rem; padding: 0.1rem 0.45rem; border-radius: 4px;
		font-weight: 600; white-space: nowrap;
	}
	.badge-move    { background: #2a3a5a; color: #8fb4e8; }
	.badge-oracle  { background: #2a4a3a; color: #7ec89a; }
	.badge-asset   { background: #4a3a2a; color: #d4a060; }
	.badge-npc     { background: #4a2a2a; color: #e08080; }
	.badge-truth   { background: #3a2a4a; color: #b890d8; }
	.badge-atlas   { background: #2a4a4a; color: #70c8c8; }
	.name { font-weight: 600; }
	.cat { font-size: 0.8rem; color: var(--text-3); }
	.preview { font-size: 0.8rem; color: var(--text-3); width: 100%; margin-top: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

	.nav-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 0.75rem; margin-top: 0.5rem; }
	.nav-card {
		display: flex; flex-direction: column; gap: 0.3rem;
		padding: 1rem; border-radius: var(--radius);
		background: var(--bg-2); border: 1px solid var(--border);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.15s, background 0.15s;
	}
	.nav-card:hover { background: var(--bg-3); border-color: var(--accent); }
	.nav-card .icon { font-size: 1.5rem; }
	.nav-card strong { color: var(--text-1); }
	.nav-card span { font-size: 0.85rem; }
</style>
