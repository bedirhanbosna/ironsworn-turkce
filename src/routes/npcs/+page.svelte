<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay, iterNpcs } from '$lib/data/loader.js';
	import type { DataswornRoot, Npc } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr, trArr } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import RankBadge from '$lib/components/RankBadge.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});
	let openId = $state<string | null>(null);

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);

	const rankUiKey: Record<number, 'rank_1'|'rank_2'|'rank_3'|'rank_4'|'rank_5'> = {
		1: 'rank_1', 2: 'rank_2', 3: 'rank_3', 4: 'rank_4', 5: 'rank_5'
	};

	const npcs = $derived.by((): Npc[] => data ? [...iterNpcs(data)] : []);
</script>

<div class="page-header">
	<h1>{ui(lang, 'nav_npcs')}</h1>
	<p class="page-desc">{ui(lang, 'desc_npcs')}</p>
</div>

{#if !data}
	<p style="color:var(--text-3)">{ui(lang, 'loading')}</p>
{:else}
	<div class="list">
		{#each npcs as npc}
			{@const nid = npc._id}
			{@const isOpen = openId === nid}
			<div class="npc-card" id={nid.split('/').pop()}>
				<button class="npc-header" onclick={() => openId = isOpen ? null : nid}>
					<div class="npc-title">
						<span class="npc-name">{tr(nid, 'name', npc.name, lang)}</span>
						<RankBadge rank={npc.rank} label={rankUiKey[npc.rank] ? ui(lang, rankUiKey[npc.rank]) : String(npc.rank)} />
					</div>
					<span class="chevron">{isOpen ? '▲' : '▼'}</span>
				</button>

				{#if isOpen}
					<div class="npc-body">
						{#if npc._source?.page}
							<div class="npc-meta"><PdfRef page={npc._source.page} /></div>
						{/if}
						{#if npc.description}
							<div class="section">
								<Markdown text={tr(nid, 'description', npc.description, lang)} />
							</div>
						{/if}
						{#if npc.features.length}
							<div class="section">
								<h3>{ui(lang, 'features')}</h3>
								<ul>{#each trArr(nid, 'features', npc.features, lang) as f}<li>{f}</li>{/each}</ul>
							</div>
						{/if}
						{#if npc.drives.length}
							<div class="section">
								<h3>{ui(lang, 'drives')}</h3>
								<ul>{#each trArr(nid, 'drives', npc.drives, lang) as d}<li>{d}</li>{/each}</ul>
							</div>
						{/if}
						{#if npc.tactics.length}
							<div class="section">
								<h3>{ui(lang, 'tactics')}</h3>
								<ul>{#each trArr(nid, 'tactics', npc.tactics, lang) as t}<li>{t}</li>{/each}</ul>
							</div>
						{/if}
						{#if npc.quest_starter}
							<div class="section quest">
								<h3>{ui(lang, 'quest_starter')}</h3>
								<Markdown text={tr(nid, 'quest_starter', npc.quest_starter, lang)} />
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
	.list { display: flex; flex-direction: column; gap: 0.4rem; }
	.npc-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-2); overflow: hidden; }
	.npc-header {
		width: 100%; display: flex; justify-content: space-between; align-items: center;
		padding: 0.65rem 1rem; background: none; border: none;
		color: var(--text-1); cursor: pointer; text-align: left;
	}
	.npc-header:hover { background: var(--bg-3); }
	.npc-title { display: flex; align-items: center; gap: 0.6rem; }
	.npc-name { font-weight: 600; }
	.chevron { color: var(--text-3); font-size: 0.8rem; }

	.npc-body { padding: 0.75rem 1rem; border-top: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.75rem; }
	.npc-meta { align-self: flex-end; margin-bottom: -0.25rem; }
	.section h3 { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); margin-bottom: 0.3rem; }
	.section ul { list-style: disc; padding-left: 1.4em; }
	.section ul li { color: var(--text-2); font-size: 0.9rem; }
	.quest { background: var(--bg-3); padding: 0.6rem 0.75rem; border-radius: 4px; border-left: 3px solid var(--accent); }
</style>
