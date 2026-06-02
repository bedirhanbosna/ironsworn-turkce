<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot, AtlasEntry } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr, trArr } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});
	let openId = $state<string | null>(null);

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);

	const regions = $derived.by((): AtlasEntry[] => {
		if (!data) return [];
		const out: AtlasEntry[] = [];
		for (const col of Object.values(data.atlas)) {
			if (col.contents) out.push(...Object.values(col.contents));
		}
		return out;
	});
</script>

<div class="page-header">
	<h1>{ui(lang, 'nav_atlas')}</h1>
	<p class="page-desc">{ui(lang, 'desc_atlas')}</p>
</div>

{#if !data}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	<div class="list">
		{#each regions as region}
			{@const rid = region._id}
			{@const isOpen = openId === rid}
			<div class="region-card" id={rid.split('/').pop()}>
				<button class="region-header" onclick={() => openId = isOpen ? null : rid}>
					<div class="region-title">
						<span class="region-name">{tr(rid, 'name', region.name, lang)}</span>
						{#if region.summary}<span class="region-summary">{tr(rid, 'summary', region.summary, lang)}</span>{/if}
					</div>
					<span class="chevron">{isOpen ? '▲' : '▼'}</span>
				</button>

				{#if isOpen}
					<div class="region-body">
						{#if region._source?.page}
							<div class="region-meta"><PdfRef page={region._source.page} /></div>
						{/if}
						{#if region.description}
							<div class="section">
								<Markdown text={tr(rid, 'description', region.description, lang)} />
							</div>
						{/if}
						{#if region.features?.length}
							<div class="section">
								<h3>{ui(lang, 'features')}</h3>
								<ul>{#each trArr(rid, 'features', region.features, lang) as f}<li>{f}</li>{/each}</ul>
							</div>
						{/if}
						{#if region.quest_starter}
							<div class="section quest">
								<h3>{ui(lang, 'quest_starter')}</h3>
								<Markdown text={tr(rid, 'quest_starter', region.quest_starter, lang)} />
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.75rem; }
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.list { display: flex; flex-direction: column; gap: 0.4rem; }
	.region-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-2); overflow: hidden; }
	.region-header {
		width: 100%; display: flex; justify-content: space-between; align-items: center;
		padding: 0.65rem 1rem; background: none; border: none;
		color: var(--text-1); cursor: pointer; text-align: left; gap: 1rem;
	}
	.region-header:hover { background: var(--bg-3); }
	.region-title { display: flex; flex-direction: column; gap: 0.15rem; }
	.region-name { font-weight: 600; }
	.region-summary { font-size: 0.8rem; color: var(--text-3); }
	.chevron { color: var(--text-3); font-size: 0.8rem; flex-shrink: 0; }

	.region-body { padding: 0.75rem 1rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.75rem; }
	.region-meta { align-self: flex-end; margin-bottom: -0.25rem; }
	.section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); margin-bottom: 0.3rem; }
	.section ul { list-style: disc; padding-left: 1.4em; }
	.section ul li { color: var(--text-2); font-size: 0.9rem; }
	.quest { background: var(--bg-3); padding: 0.6rem 0.75rem; border-radius: 4px; border-left: 3px solid var(--accent); }
</style>
