<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';
	import Markdown from '$lib/components/Markdown.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
</script>

<div class="page-header">
	<div class="title-row">
		<h1>{ui(lang, 'nav_truths')}</h1>
		<a class="pdf-link" href="/pdf/world-workbook.pdf" target="_blank" rel="noopener">{ui(lang, 'view_pdf')}</a>
	</div>
	<p class="page-desc">{ui(lang, 'desc_truths')}</p>
	<p class="intro">{ui(lang, 'truths_intro')}</p>
</div>

{#if !data}
	<p style="color:var(--text-3)">{ui(lang, 'loading')}</p>
{:else}
	<div class="truths">
		{#each Object.values(data.truths) as truth}
			{@const tid = truth._id}
			<div class="truth-section" id={tid.split('/').pop()}>
				<h2>{tr(tid, 'name', truth.name, lang)}</h2>
				<div class="options">
					{#each truth.options as opt, i}
						<div class="option">
							{#if opt.min !== null && opt.max !== null}
								<span class="range">{opt.min === opt.max ? opt.min : `${opt.min}–${opt.max}`}</span>
							{/if}
							<div class="option-body">
								<Markdown text={tr(tid, `options.${i}.description`, opt.description, lang)} />
								{#if opt.quest_starter}
									<div class="quest-starter">
										<strong>{ui(lang, 'quest_starter')}:</strong>
										<Markdown text={tr(tid, `options.${i}.quest_starter`, opt.quest_starter, lang)} inline={true} />
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.75rem; }
	.title-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
	.pdf-link {
		font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px;
		background: var(--bg-3); border: 1px solid var(--border);
		color: var(--accent); text-decoration: none;
	}
	.pdf-link:hover { border-color: var(--accent); }
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; margin-bottom: 0.5rem; }
	.intro { color: var(--text-3); font-size: 0.85rem; font-style: italic; margin-bottom: 1.5rem; }
	.truths { display: flex; flex-direction: column; gap: 2rem; }
	.truth-section h2 { border-bottom: 1px solid var(--border); padding-bottom: 0.4rem; margin-bottom: 0.75rem; }
	.options { display: flex; flex-direction: column; gap: 0.5rem; }
	.option {
		display: flex; gap: 0.9rem; align-items: flex-start;
		padding: 0.75rem 1rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
	}
	.range {
		flex-shrink: 0; min-width: 2.5rem; text-align: center;
		color: var(--text-3); font-size: 0.8rem; padding-top: 0.1rem;
	}
	.option-body { flex: 1; color: var(--text-2); font-size: 0.9rem; }
	.quest-starter {
		margin-top: 0.5rem; padding: 0.4rem 0.6rem;
		background: var(--bg-3); border-radius: 4px;
		border-left: 3px solid var(--accent);
		font-size: 0.85rem; color: var(--text-2);
	}
	.quest-starter strong { color: var(--accent); }
</style>
