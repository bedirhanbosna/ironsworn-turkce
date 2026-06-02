<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay, buildSearchIndex } from '$lib/data/loader.js';
	import type { SearchEntry } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import Icon from '$lib/components/Icon.svelte';
	import type { IconName } from '$lib/icons.js';

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

	const cards: { href: string; icon: IconName; lk: string; dk: string }[] = [
		{ href: '/moves',    icon: 'crossed-swords', lk: 'home_moves',    dk: 'home_moves_d'    },
		{ href: '/oracles',  icon: 'crystal-ball',   lk: 'home_oracles',  dk: 'home_oracles_d'  },
		{ href: '/assets',   icon: 'scroll',         lk: 'home_assets',   dk: 'home_assets_d'   },
		{ href: '/npcs',     icon: 'skull',          lk: 'home_npcs',     dk: 'home_npcs_d'     },
		{ href: '/truths',   icon: 'earth',          lk: 'home_truths',   dk: 'home_truths_d'   },
		{ href: '/rules',    icon: 'scales',         lk: 'home_rules',    dk: 'home_rules_d'    },
		{ href: '/atlas',    icon: 'compass',        lk: 'home_atlas',    dk: 'home_atlas_d'    },
		{ href: '/docs',     icon: 'papers',         lk: 'home_docs',     dk: 'home_docs_d'     },
	];
</script>

<div class="home">
	<section class="hero">
		<div class="hero-glow" aria-hidden="true"></div>
		<p class="eyebrow"><Icon name="crossed-swords" size={14} /> IRONSWORN · TÜRKÇE</p>
		<h1>{ui(lang, 'home_title')}</h1>
		<p class="subtitle">{ui(lang, 'home_subtitle')}</p>

		<div class="cta-row">
			<a class="cta-primary" href="/basla">
				<Icon name="book" size={18} />
				<span class="cta-main">{ui(lang, 'home_cta')}</span>
				<span class="cta-arrow">→</span>
			</a>
			<span class="cta-sub">{ui(lang, 'home_cta_sub')}</span>
		</div>

		<div class="search-box">
			<input type="search" placeholder={ui(lang, 'home_search')} bind:value={query} />
		</div>
	</section>

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
		<p class="browse-label">{ui(lang, 'home_browse')}</p>
		<div class="nav-cards">
			{#each cards as card}
				<a href={card.href} class="nav-card">
					<span class="icon icon-medallion"><Icon name={card.icon} size={24} /></span>
					<strong>{ui(lang, card.lk as any)}</strong>
					<span class="card-desc">{ui(lang, card.dk as any)}</span>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.home { max-width: 920px; margin: 0 auto; }

	/* --- Hero --- */
	.hero {
		position: relative;
		text-align: center;
		padding: 2.5rem 1rem 2rem;
		margin-bottom: 2rem;
		overflow: hidden;
	}
	.hero-glow {
		position: absolute;
		top: -40%; left: 50%; transform: translateX(-50%);
		width: 680px; height: 480px;
		background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 65%);
		pointer-events: none; z-index: 0;
	}
	.hero > *:not(.hero-glow) { position: relative; z-index: 1; }

	.eyebrow {
		font-size: 0.72rem; letter-spacing: 0.28em; color: var(--accent);
		display: inline-flex; align-items: center; gap: 0.4rem;
		text-transform: uppercase; margin-bottom: 1rem; opacity: 0.85;
	}
	.hero h1 {
		font-family: var(--font-display);
		font-size: clamp(2.1rem, 5vw, 3.1rem);
		font-weight: 600; line-height: 1.1; letter-spacing: 0.01em;
		color: var(--accent); margin-bottom: 0.9rem;
		text-shadow: 0 2px 24px var(--accent-glow);
	}
	.subtitle {
		color: var(--text-2); font-size: 1.02rem; line-height: 1.7;
		max-width: 560px; margin: 0 auto 1.75rem;
	}

	/* --- CTA --- */
	.cta-row { display: flex; flex-direction: column; align-items: center; gap: 0.55rem; margin-bottom: 2rem; }
	.cta-primary {
		display: inline-flex; align-items: center; gap: 0.6rem;
		padding: 0.8rem 1.6rem; border-radius: 999px;
		background: linear-gradient(135deg, var(--accent) 0%, #b8965a 100%);
		color: #1a1208; font-weight: 700; font-size: 1.05rem; text-decoration: none;
		box-shadow: 0 4px 20px var(--accent-glow), 0 1px 0 rgba(255,255,255,0.15) inset;
		transition: transform 0.15s, box-shadow 0.15s;
	}
	.cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px var(--accent-glow); }
	.cta-arrow { transition: transform 0.15s; }
	.cta-primary:hover .cta-arrow { transform: translateX(3px); }
	.cta-sub { font-size: 0.8rem; color: var(--text-3); font-style: italic; }

	.search-box { max-width: 480px; margin: 0 auto; }

	.hint { color: var(--text-3); margin-top: 0.5rem; text-align: center; }

	/* --- Results --- */
	.results { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
	.results li a {
		display: flex; align-items: baseline; gap: 0.5rem;
		padding: 0.6rem 0.9rem; border-radius: var(--radius);
		background: var(--bg-2); text-decoration: none; color: var(--text-1);
		flex-wrap: wrap; border: 1px solid transparent;
	}
	.results li a:hover { background: var(--bg-3); border-color: var(--border); }
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

	/* --- Nav cards --- */
	.browse-label {
		text-align: center; font-size: 0.72rem; letter-spacing: 0.18em;
		text-transform: uppercase; color: var(--text-3); margin-bottom: 1rem;
	}
	.nav-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 0.75rem; }
	.nav-card {
		display: flex; flex-direction: column; gap: 0.4rem;
		padding: 1.15rem 1.1rem; border-radius: var(--radius);
		background: var(--bg-2); border: 1px solid var(--border);
		text-decoration: none; color: var(--text-2);
		position: relative; overflow: hidden;
		transition: border-color 0.18s, background 0.18s, transform 0.18s;
	}
	.nav-card::before {
		content: ''; position: absolute; inset: 0;
		background: radial-gradient(circle at top left, var(--accent-glow), transparent 60%);
		opacity: 0; transition: opacity 0.18s;
	}
	.nav-card:hover { background: var(--bg-3); border-color: var(--accent); transform: translateY(-2px); }
	.nav-card:hover::before { opacity: 1; }
	.nav-card .icon { color: var(--accent); position: relative; }
	.nav-card strong { color: var(--text-1); font-size: 1.02rem; position: relative; }
	.card-desc { font-size: 0.83rem; line-height: 1.5; position: relative; }
</style>
