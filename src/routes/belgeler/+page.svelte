<script lang="ts">
	import { onMount } from 'svelte';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import Icon from '$lib/components/Icon.svelte';
	import RulebookReader from '$lib/components/RulebookReader.svelte';
	import { documents, getDoc } from '$lib/content/docs/index.js';
	import type { RulebookPage } from '$lib/content/rulebook/types.js';

	const lang = $derived(langStore.current);
	let activeSlug = $state('rules-summary');
	let pages = $state<RulebookPage[]>([]);
	let loading = $state(true);

	const activeDoc = $derived(getDoc(activeSlug));
	let initialPage = $state<number | undefined>(undefined);
	// Okuduğun belgenin basılabilir PDF'i (yazdırma yolu). slug → /pdf/<file>.
	const pdfFile: Record<string, string> = {
		'rules-summary': 'rules-summary.pdf',
		'world-workbook': 'world-workbook.pdf',
		playkit: 'playkit.pdf'
	};
	const activePdf = $derived(pdfFile[activeSlug]);

	async function select(slug: string, scrollTop = true) {
		const doc = getDoc(slug);
		if (!doc?.available || !doc.load) return;
		if (scrollTop) initialPage = undefined; // manuel seçimde derin-link hedefini temizle
		activeSlug = slug;
		loading = true;
		pages = await doc.load();
		loading = false;
		if (scrollTop && typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => {
		// Arama derin-linki: ?doc=<slug>&p=<page>
		const params = new URLSearchParams(location.search);
		const doc = params.get('doc');
		const p = Number(params.get('p'));
		if (doc && getDoc(doc)?.available) {
			initialPage = p > 0 ? p : undefined;
			select(doc, false);
		} else {
			select('rules-summary');
		}
	});
</script>

<div class="page-header">
	<h1><Icon name="papers" size={24} /> {lang === 'tr' ? 'Belgeler' : 'Documents'}</h1>
	<p class="page-desc">{lang === 'tr'
		? 'Kural kitabını tamamlayan yardımcı belgeler, sayfa sayfa Türkçe. Bir belge seç; çeviriyi oku, dilersen orijinal sayfayı aç.'
		: 'Supplementary documents alongside the rulebook, page by page in Turkish. Pick a document; read the translation and reveal the original if you wish.'}</p>
	{#if activeDoc}
		<p class="doc-sub">{lang === 'tr' ? activeDoc.desc_tr : activeDoc.desc_en}</p>
	{/if}
	{#if activePdf}
		<a class="print-link" href="/pdf/{activePdf}" target="_blank" rel="noopener">
			<Icon name="papers" size={14} />
			{lang === 'tr' ? 'Basılabilir PDF\'i indir / yazdır' : 'Download / print PDF'}
		</a>
	{/if}
</div>

<nav class="chapter-bar" aria-label="Belgeler">
	{#each documents as doc}
		<button
			class="ch"
			class:active={activeSlug === doc.slug}
			class:soon={!doc.available}
			disabled={!doc.available}
			onclick={() => select(doc.slug)}
			title={doc.available ? '' : (lang === 'tr' ? 'Yakında' : 'Coming soon')}
		>
			<span class="ch-title">{lang === 'tr' ? doc.title_tr : doc.title_en}</span>
			{#if !doc.available}<span class="ch-soon">{lang === 'tr' ? 'yakında' : 'soon'}</span>{/if}
		</button>
	{/each}
</nav>

{#if loading}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	{#key activeSlug}
		<RulebookReader {pages} {initialPage} />
	{/key}
{/if}

<style>
	.page-header { margin-bottom: 1rem; }
	.page-header h1 { display: flex; align-items: center; gap: 0.55rem; }
	.page-desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.6; margin-top: 0.5rem; max-width: 640px; }
	.doc-sub { color: var(--accent); font-size: 0.85rem; margin-top: 0.4rem; font-style: italic; }
	.print-link {
		display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 0.6rem;
		font-size: 0.82rem; color: var(--text-2); text-decoration: none;
		padding: 0.35rem 0.75rem; border: 1px solid var(--border); border-radius: 999px;
		background: var(--bg-2); transition: border-color 0.15s, color 0.15s, background 0.15s;
	}
	.print-link:hover { border-color: var(--accent); color: var(--accent); background: var(--bg-3); }
	.hint { color: var(--text-3); }

	.chapter-bar {
		display: flex; gap: 0.4rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.5rem;
		scrollbar-width: thin;
	}
	.ch {
		display: flex; align-items: center; gap: 0.45rem; flex-shrink: 0;
		padding: 0.4rem 0.9rem; border-radius: 999px; cursor: pointer;
		background: var(--bg-2); border: 1px solid var(--border); color: var(--text-2);
		font-family: inherit; font-size: 0.85rem; white-space: nowrap;
		transition: border-color 0.15s, background 0.15s, color 0.15s;
	}
	.ch:hover:not(:disabled) { border-color: var(--accent); color: var(--text-1); }
	.ch.active { background: var(--bg-3); border-color: var(--accent); color: var(--accent); }
	.ch.soon { opacity: 0.5; cursor: default; }
	.ch-soon { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); border: 1px solid var(--border); border-radius: 4px; padding: 0 0.3rem; }
</style>
