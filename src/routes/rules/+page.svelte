<script lang="ts">
	import { onMount } from 'svelte';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot, Rules } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
	const rules = $derived.by((): Rules | null => data ? data.rules : null);
	const RID = 'classic/rules';
</script>

<div class="page-header">
	<div class="title-row">
		<h1>{ui(lang, 'nav_rules')}</h1>
		<a class="pdf-link" href="/pdf/rules-summary.pdf" target="_blank" rel="noopener">{ui(lang, 'view_pdf')}</a>
	</div>
	<p class="page-desc">{ui(lang, 'desc_rules')}</p>
</div>

{#if !rules}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	<!-- Stats -->
	<section class="block">
		<h2>{ui(lang, 'rules_stats')}</h2>
		<div class="grid">
			{#each Object.entries(rules.stats) as [k, stat]}
				<div class="item">
					<strong class="cap">{tr(`${RID}/stats/${k}`, 'label', stat.label, lang)}</strong>
					{#if stat.description}<p>{tr(`${RID}/stats/${k}`, 'description', stat.description, lang)}</p>{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Condition meters -->
	<section class="block">
		<h2>{ui(lang, 'rules_meters')}</h2>
		<div class="grid">
			{#each Object.entries(rules.condition_meters) as [k, cm]}
				<div class="item">
					<strong class="cap">{tr(`${RID}/condition_meters/${k}`, 'label', cm.label, lang)} <span class="range">{cm.min}–{cm.max}</span></strong>
					{#if cm.description}<p>{tr(`${RID}/condition_meters/${k}`, 'description', cm.description, lang)}</p>{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Impacts / debilities -->
	<section class="block">
		<h2>{ui(lang, 'rules_impacts')}</h2>
		{#each Object.entries(rules.impacts) as [k, imp]}
			<div class="impact-cat">
				<h3 class="cap">{tr(`${RID}/impacts/${k}`, 'label', imp.label, lang)}</h3>
				{#if imp.description}<p class="cat-desc">{tr(`${RID}/impacts/${k}`, 'description', imp.description, lang)}</p>{/if}
				<div class="grid">
					{#each Object.entries(imp.contents) as [ik, item]}
						<div class="item">
							<strong class="cap">
								{tr(`${RID}/impacts/${k}/${ik}`, 'label', item.label, lang)}
								{#if item.permanent}<span class="tag">{ui(lang, 'rules_permanent')}</span>{/if}
							</strong>
							{#if item.description}<p>{tr(`${RID}/impacts/${k}/${ik}`, 'description', item.description, lang)}</p>{/if}
							{#if item.prevents_recovery?.length}
								<span class="prevents">{ui(lang, 'rules_prevents')} {item.prevents_recovery.join(', ')}</span>
							{/if}
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>

	<!-- Special tracks (bonds) -->
	{#if rules.special_tracks}
		<section class="block">
			<h2>{ui(lang, 'rules_bonds')}</h2>
			<div class="grid">
				{#each Object.entries(rules.special_tracks) as [k, st]}
					<div class="item">
						<strong class="cap">{tr(`${RID}/special_tracks/${k}`, 'label', st.label, lang)}</strong>
						{#if st.description}<p>{tr(`${RID}/special_tracks/${k}`, 'description', st.description, lang)}</p>{/if}
					</div>
				{/each}
			</div>
		</section>
	{/if}
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
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.block { margin-bottom: 2rem; }
	.block h2 { border-bottom: 1px solid var(--border); padding-bottom: 0.4rem; margin-bottom: 0.9rem; }
	.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 0.6rem; }
	.item {
		padding: 0.7rem 0.85rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
	}
	.item strong { color: var(--text-1); display: block; margin-bottom: 0.25rem; }
	.item p { color: var(--text-2); font-size: 0.85rem; line-height: 1.5; }
	.cap { text-transform: capitalize; }
	.range { color: var(--text-3); font-size: 0.8rem; font-weight: 400; }
	.tag {
		font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.05em;
		padding: 0.05rem 0.35rem; border-radius: 4px; background: #3a1a1a; color: #e08080; margin-left: 0.4rem;
	}
	.prevents { display: block; margin-top: 0.35rem; font-size: 0.75rem; color: var(--text-3); }

	.impact-cat { margin-bottom: 1.25rem; }
	.impact-cat h3 { font-size: 1rem; color: var(--accent); margin-bottom: 0.2rem; }
	.cat-desc { color: var(--text-3); font-size: 0.85rem; margin-bottom: 0.6rem; line-height: 1.5; }
</style>
