<script lang="ts">
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui, rulebookChapters } from '$lib/i18n/ui.js';

	const lang = $derived(langStore.current);
</script>

<div class="page-header">
	<div class="title-row">
		<h1>{ui(lang, 'nav_rulebook')}</h1>
		<a class="pdf-link" href="/pdf/rulebook.pdf" target="_blank" rel="noopener">{ui(lang, 'view_pdf')}</a>
	</div>
	<p class="page-desc">{ui(lang, 'desc_rulebook')}</p>
</div>

<div class="chapter-grid">
	{#each rulebookChapters as ch}
		<a href="/rulebook/{ch.slug}" class="chapter-card">
			<span class="icon">{ch.icon}</span>
			<div class="ch-body">
				<strong>Bölüm {ch.num}: {ui(lang, ch.titleKey)}</strong>
				<span class="ch-desc">{ui(lang, ch.descKey)}</span>
			</div>
		</a>
	{/each}
</div>

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

	.chapter-grid { display: flex; flex-direction: column; gap: 0.5rem; }
	.chapter-card {
		display: flex; gap: 0.85rem; align-items: center;
		padding: 0.85rem 1rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.15s, background 0.15s;
	}
	.chapter-card:hover { background: var(--bg-3); border-color: var(--accent); }
	.icon { font-size: 1.6rem; flex-shrink: 0; }
	.ch-body { display: flex; flex-direction: column; gap: 0.2rem; }
	.ch-body strong { font-size: 0.95rem; color: var(--text-1); }
	.ch-desc { font-size: 0.82rem; color: var(--text-3); }
</style>
