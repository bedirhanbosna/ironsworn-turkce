<script lang="ts">
	import { onMount } from 'svelte';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import Icon from '$lib/components/Icon.svelte';
	import RulebookReader from '$lib/components/RulebookReader.svelte';
	import { chapters, getChapter } from '$lib/content/rulebook/index.js';
	import type { RulebookPage } from '$lib/content/rulebook/types.js';

	const lang = $derived(langStore.current);
	let activeSlug = $state('temel-kurallar');
	let pages = $state<RulebookPage[]>([]);
	let loading = $state(true);

	async function select(slug: string) {
		const ch = getChapter(slug);
		if (!ch?.available || !ch.load) return;
		activeSlug = slug;
		loading = true;
		pages = await ch.load();
		loading = false;
		if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	onMount(() => select('temel-kurallar'));
</script>

<div class="page-header">
	<h1><Icon name="book" size={24} /> {ui(lang, 'nav_rulebook')}</h1>
	<p class="page-desc">{lang === 'tr'
		? 'Ironsworn kural kitabı, sayfa sayfa Türkçe. Bir bölüm seç; her sayfanın çevirisini oku, dilersen orijinal sayfayı aç.'
		: 'The Ironsworn rulebook, page by page in Turkish. Pick a chapter; read each page\'s translation and reveal the original if you wish.'}</p>
</div>

<nav class="chapter-bar" aria-label="Bölümler">
	{#each chapters as ch}
		<button
			class="ch"
			class:active={activeSlug === ch.slug}
			class:soon={!ch.available}
			disabled={!ch.available}
			onclick={() => select(ch.slug)}
			title={ch.available ? '' : (lang === 'tr' ? 'Yakında' : 'Coming soon')}
		>
			<span class="ch-num">{ch.num}</span>
			<span class="ch-title">{lang === 'tr' ? ch.title_tr : ch.title_en}</span>
			{#if !ch.available}<span class="ch-soon">{lang === 'tr' ? 'yakında' : 'soon'}</span>{/if}
		</button>
	{/each}
</nav>

{#if loading}
	<p class="hint">{ui(lang, 'loading')}</p>
{:else}
	{#key activeSlug}
		<RulebookReader {pages} />
	{/key}
{/if}

<style>
	.page-header { margin-bottom: 1rem; }
	.page-header h1 { display: flex; align-items: center; gap: 0.55rem; }
	.page-desc { color: var(--text-2); font-size: 0.92rem; line-height: 1.6; margin-top: 0.5rem; max-width: 640px; }
	.hint { color: var(--text-3); }

	.chapter-bar {
		display: flex; gap: 0.4rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.5rem;
		scrollbar-width: thin;
	}
	.ch {
		display: flex; align-items: center; gap: 0.45rem; flex-shrink: 0;
		padding: 0.4rem 0.8rem; border-radius: 999px; cursor: pointer;
		background: var(--bg-2); border: 1px solid var(--border); color: var(--text-2);
		font-family: inherit; font-size: 0.85rem; white-space: nowrap;
		transition: border-color 0.15s, background 0.15s, color 0.15s;
	}
	.ch:hover:not(:disabled) { border-color: var(--accent); color: var(--text-1); }
	.ch.active { background: var(--bg-3); border-color: var(--accent); color: var(--accent); }
	.ch-num { font-family: var(--font-display); font-weight: 700; font-size: 0.78rem; opacity: 0.7; }
	.ch.soon { opacity: 0.5; cursor: default; }
	.ch-soon { font-size: 0.62rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-3); border: 1px solid var(--border); border-radius: 4px; padding: 0 0.3rem; }
</style>
