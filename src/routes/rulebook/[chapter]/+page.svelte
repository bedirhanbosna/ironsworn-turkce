<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { loadRulebook } from '$lib/data/loader.js';
	import type { RulebookSection } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui, rulebookChapters } from '$lib/i18n/ui.js';
	import RulebookText from '$lib/components/RulebookText.svelte';

	let allSections: RulebookSection[] = $state([]);

	onMount(async () => {
		allSections = await loadRulebook();
	});

	const lang = $derived(langStore.current);
	const slug = $derived($page.params.chapter);

	const chMeta = $derived(rulebookChapters.find(c => c.slug === slug));

	const sections = $derived(allSections.filter(s => s.chapter_slug === slug));

	// İlk section'ın pdf_page'i (chapter PDF linki için)
	const firstPdfPage = $derived(sections[0]?.pdf_page ?? 1);
</script>

<div class="page-header">
	<a href="/rulebook" class="back">{ui(lang, 'back')}</a>
	<div class="title-row">
		<h1>
			{chMeta?.icon ?? '📖'}
			{chMeta ? `Bölüm ${chMeta.num}: ${ui(lang, chMeta.titleKey)}` : slug}
		</h1>
		<a
			class="pdf-link"
			href="/pdf/rulebook.pdf#page={firstPdfPage}"
			target="_blank"
			rel="noopener"
		>{ui(lang, 'open_in_pdf')}</a>
	</div>
	{#if chMeta}<p class="page-desc">{ui(lang, chMeta.descKey)}</p>{/if}
</div>

{#if sections.length === 0}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	<div class="sections">
		{#each sections as sec}
			<div class="section" id={sec.id}>
				<div class="sec-header">
					<h2 class="sec-heading level-{sec.level}">{sec.heading}</h2>
					<a
						class="pdf-page-link"
						href="/pdf/rulebook.pdf#page={sec.pdf_page}"
						target="_blank"
						rel="noopener"
						title="PDF'de aç"
					>📖 {ui(lang, 'page_abbr')} {sec.pdf_page - 11}</a>
				</div>
				{#if lang === 'tr' && sec.text_tr}
					<RulebookText text={sec.text_tr} />
				{:else if sec.text_en}
					<RulebookText text={sec.text_en} />
					{#if lang === 'tr' && !sec.text_tr}
						<span class="no-tr">{ui(lang, 'no_translation')}</span>
					{/if}
				{/if}
			</div>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.75rem; }
	.back { font-size: 0.85rem; color: var(--text-3); text-decoration: none; display: block; margin-bottom: 0.5rem; }
	.back:hover { color: var(--accent); }
	.title-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
	.pdf-link {
		font-size: 0.75rem; padding: 0.2rem 0.5rem; border-radius: 4px;
		background: var(--bg-3); border: 1px solid var(--border);
		color: var(--accent); text-decoration: none;
	}
	.pdf-link:hover { border-color: var(--accent); }
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.sections { display: flex; flex-direction: column; gap: 1.5rem; }
	.section {
		padding: 0.85rem 1rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
	}
	.sec-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 0.6rem; flex-wrap: wrap; }
	.sec-heading { margin: 0; }
	.sec-heading.level-1 { font-size: 1.05rem; color: var(--accent); }
	.sec-heading.level-2 { font-size: 0.9rem; color: var(--text-1); }
	.pdf-page-link {
		font-size: 0.72rem; padding: 0.1rem 0.4rem; border-radius: 4px;
		background: var(--bg-3); border: 1px solid var(--border);
		color: var(--text-3); text-decoration: none; white-space: nowrap; flex-shrink: 0;
	}
	.pdf-page-link:hover { color: var(--accent); border-color: var(--accent); }
	.no-tr { display: inline-block; margin-top: 0.4rem; font-size: 0.75rem; color: var(--text-3); font-style: italic; }
</style>
