<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui, moveCatMeta } from '$lib/i18n/ui.js';
	import Icon from '$lib/components/Icon.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
</script>

<div class="page-header">
	<h1>{ui(lang, 'nav_moves')}</h1>
	<p class="page-desc">{ui(lang, 'desc_moves')}</p>
</div>

{#if !data}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	<div class="cat-grid">
		{#each Object.values(data.moves) as cat}
			{@const slug = cat._id.split('/').pop() ?? ''}
			{@const meta = moveCatMeta[slug]}
			<a href="/moves/{slug}" class="cat-card">
				<span class="icon icon-medallion"><Icon name={meta?.icon ?? 'crossed-swords'} size={24} /></span>
				<strong>{tr(cat._id, 'name', cat.name, lang)}</strong>
				<span class="cat-desc">{meta ? ui(lang, meta.desc) : ''}</span>
				<span class="count">{Object.keys(cat.contents).length} hamle</span>
			</a>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.75rem; }
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.cat-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; }
	.cat-card {
		display: flex; flex-direction: column; gap: 0.35rem;
		padding: 1.1rem 1.15rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.15s, background 0.15s;
	}
	.cat-card:hover { background: var(--bg-3); border-color: var(--accent); }
	.icon { font-size: 1.6rem; }
	.cat-card strong { font-size: 1rem; color: var(--text-1); }
	.cat-desc { font-size: 0.82rem; color: var(--text-3); line-height: 1.5; }
	.count { font-size: 0.75rem; color: var(--accent); margin-top: auto; padding-top: 0.4rem; }
</style>
