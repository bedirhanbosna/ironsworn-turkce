<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot, MoveCategory } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui, moveCatMeta } from '$lib/i18n/ui.js';
	import Markdown from '$lib/components/Markdown.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});
	let openId = $state<string | null>(null);

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
	const slug = $derived($page.params.category);

	const cat = $derived.by((): MoveCategory | null => {
		if (!data || !slug) return null;
		return Object.values(data.moves).find(c => c._id.endsWith(`/${slug}`)) ?? null;
	});

	const meta = $derived(slug ? moveCatMeta[slug] : undefined);

	const outcomeKey: Record<string, 'strong_hit' | 'weak_hit' | 'miss'> = {
		strong_hit: 'strong_hit', weak_hit: 'weak_hit', miss: 'miss'
	};
</script>

<div class="page-header">
	<a href="/moves" class="back">{ui(lang, 'back')}</a>
	{#if cat}
		<h1>{meta?.icon ?? '⚔'} {tr(cat._id, 'name', cat.name, lang)}</h1>
		{#if meta}<p class="page-desc">{ui(lang, meta.desc)}</p>{/if}
	{:else if data}
		<h1>—</h1>
	{:else}
		<p class="hint">{ui(lang, 'loading')}</p>
	{/if}
</div>

{#if cat}
	<div class="moves">
		{#each Object.values(cat.contents) as move}
			{@const mid = move._id}
			{@const isOpen = openId === mid}
			<div class="move-card" id={mid.split('/').pop()}>
				<button class="move-header" onclick={() => openId = isOpen ? null : mid}>
					<span class="move-name">{tr(mid, 'name', move.name, lang)}</span>
					<span class="chevron">{isOpen ? '▲' : '▼'}</span>
				</button>
				{#if isOpen}
					<div class="move-body">
						<div class="trigger">
							<Markdown text={tr(mid, 'trigger.text', move.trigger.text, lang)} />
						</div>
						{#if move.text}
							<div class="move-text">
								<Markdown text={tr(mid, 'text', move.text, lang)} />
							</div>
						{/if}
						{#if move.outcomes}
							<div class="outcomes">
								{#each Object.entries(move.outcomes) as [key, outcome]}
									{#if outcome?.text}
										<div class="outcome outcome-{key}">
											<strong>{outcomeKey[key] ? ui(lang, outcomeKey[key]) : key}</strong>
											<Markdown text={tr(mid, `outcomes.${key}.text`, outcome.text, lang)} />
										</div>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.5rem; }
	.back { font-size: 0.85rem; color: var(--text-3); text-decoration: none; display: block; margin-bottom: 0.5rem; }
	.back:hover { color: var(--accent); }
	.page-desc { color: var(--text-3); font-size: 0.9rem; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.moves { display: flex; flex-direction: column; gap: 0.4rem; }
	.move-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-2); overflow: hidden; }
	.move-header {
		width: 100%; display: flex; justify-content: space-between; align-items: center;
		padding: 0.7rem 1rem; background: none; border: none;
		color: var(--text-1); cursor: pointer; text-align: left; font-size: 0.95rem;
	}
	.move-header:hover { background: var(--bg-3); }
	.move-name { font-weight: 600; }
	.chevron { color: var(--text-3); font-size: 0.8rem; }

	.move-body { padding: 0.75rem 1rem 1rem; border-top: 1px solid var(--border); }
	.trigger {
		font-style: italic; color: var(--text-2); margin-bottom: 0.75rem;
		padding: 0.5rem 0.75rem; border-left: 3px solid var(--accent);
		background: var(--bg-3); border-radius: 0 4px 4px 0;
	}
	.move-text { color: var(--text-1); margin-bottom: 0.75rem; }
	.outcomes { display: flex; flex-direction: column; gap: 0.4rem; }
	.outcome { padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.9rem; }
	.outcome strong { display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.2rem; }
	.outcome-strong_hit { background: #1a3a2a; border-left: 3px solid #5a9a6a; }
	.outcome-strong_hit strong { color: #7ec89a; }
	.outcome-weak_hit { background: #3a3a1a; border-left: 3px solid #9a9a5a; }
	.outcome-weak_hit strong { color: #c8c870; }
	.outcome-miss { background: #3a1a1a; border-left: 3px solid #9a5a5a; }
	.outcome-miss strong { color: #e08080; }
</style>
