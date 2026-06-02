<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot, AssetCollection } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui, assetCatMeta } from '$lib/i18n/ui.js';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
	const slug = $derived($page.params.type); // e.g. "companion", "combat_talent"

	const col = $derived.by((): AssetCollection | null => {
		if (!data) return null;
		return Object.values(data.assets).find(c =>
			c.name.toLowerCase().replace(/ /g, '_') === slug
		) ?? null;
	});

	const meta = $derived(
		Object.values(assetCatMeta).find(m => m.slug === slug)
	);
</script>

<div class="page-header">
	<a href="/assets" class="back">{ui(lang, 'back')}</a>
	{#if col}
		<h1><Icon name={meta?.icon ?? 'scroll'} size={24} /> {tr(col._id, 'name', col.name, lang)}</h1>
		{#if meta}<p class="page-desc">{ui(lang, meta.desc)}</p>{/if}
	{:else if data}
		<h1>—</h1>
	{:else}
		<p class="hint">{ui(lang, 'loading')}</p>
	{/if}
</div>

{#if col}
	<div class="cards">
		{#each Object.values(col.contents) as asset}
			{@const aid = asset._id}
			<div class="asset-card" id={aid.split('/').pop()}>
				<div class="asset-header">
					<span class="asset-name">{tr(aid, 'name', asset.name, lang)}</span>
					<PdfRef page={asset._source?.page} />
				</div>
				{#if asset.requirement}
					<p class="requirement">{tr(aid, 'requirement', asset.requirement, lang)}</p>
				{/if}
				<ul class="abilities">
					{#each asset.abilities as ab, i}
						<li class:enabled={ab.enabled}>
							<span class="dot">{ab.enabled ? '●' : '○'}</span>
							<Markdown text={tr(aid, `abilities.${i}.text`, ab.text, lang)} />
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.75rem; }
	.page-header h1 { display: flex; align-items: center; gap: 0.55rem; }
	.back { font-size: 0.85rem; color: var(--text-3); text-decoration: none; display: block; margin-bottom: 0.5rem; }
	.back:hover { color: var(--accent); }
	.page-desc { color: var(--text-3); font-size: 0.9rem; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 0.75rem; }
	.asset-card {
		border: 1px solid var(--border); border-radius: var(--radius);
		background: var(--bg-2); padding: 0.9rem 1rem;
		display: flex; flex-direction: column; gap: 0.5rem;
	}
	.asset-header { display: flex; justify-content: space-between; align-items: baseline; }
	.asset-name { font-weight: 700; color: var(--accent); }
	.requirement { font-size: 0.8rem; color: var(--text-3); font-style: italic; }

	.abilities { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
	.abilities li { display: flex; gap: 0.5rem; align-items: flex-start; font-size: 0.85rem; color: var(--text-3); }
	.abilities li.enabled { color: var(--text-1); }
	.dot { flex-shrink: 0; margin-top: 0.15rem; }
	.abilities li.enabled .dot { color: var(--accent); }
</style>
