<script lang="ts">
	import { onMount } from 'svelte';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import Icon from '$lib/components/Icon.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import ActionRoll from '$lib/components/diagrams/ActionRoll.svelte';
	import MoveAnatomy from '$lib/components/diagrams/MoveAnatomy.svelte';
	import CharacterSheet from '$lib/components/diagrams/CharacterSheet.svelte';
	import type { RulebookPage } from '$lib/content/rulebook/types.js';

	let { pages }: { pages: RulebookPage[] } = $props();

	const lang = $derived(langStore.current);
	let openImgs = $state<Record<number, boolean>>({});
	let activePage = $state(0);

	function scrollTo(page: number) {
		document.getElementById(`s${page}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => { for (const e of entries) if (e.isIntersecting) activePage = Number(e.target.id.slice(1)); },
			{ rootMargin: '-15% 0px -75% 0px' }
		);
		const t = setTimeout(() => document.querySelectorAll('.pg[id]').forEach((el) => obs.observe(el)), 200);
		return () => { obs.disconnect(); clearTimeout(t); };
	});
</script>

<div class="reader">
	<aside class="toc" aria-label="İçindekiler">
		<p class="toc-title">İçindekiler</p>
		{#each pages as p}
			<button class="toc-link" class:active={activePage === p.page} onclick={() => scrollTo(p.page)}>
				<span class="toc-num">{String(p.page).padStart(2, '0')}</span>
				<span class="toc-text">{lang === 'tr' ? p.title_tr : p.title_en}</span>
			</button>
		{/each}
	</aside>

	<div class="pages">
		{#each pages as p}
			<article class="pg" id="s{p.page}">
				<div class="pg-head">
					<span class="pg-num">{String(p.page).padStart(2, '0')}</span>
					<h2>{lang === 'tr' ? p.title_tr : p.title_en}</h2>
					<PdfRef page={p.page} />
				</div>
				<div class="pg-body">
					{#if p.diagram}
						<div class="visual">
							{#if p.diagram === 'action-roll'}<ActionRoll />
							{:else if p.diagram === 'move'}<MoveAnatomy />
							{:else}<CharacterSheet />{/if}
						</div>
					{/if}
					<div class="text">
						<Markdown text={lang === 'tr' ? p.text_tr : p.text_en} />
					</div>
					<div class="visual">
						<button class="show-page" onclick={() => (openImgs[p.page] = !openImgs[p.page])}>
							<Icon name="papers" size={14} /> {openImgs[p.page] ? 'Orijinal sayfayı gizle' : 'Orijinal sayfayı göster'}
						</button>
						{#if openImgs[p.page]}
							<img src={p.img} alt={`Sayfa ${p.page}`} loading="lazy" />
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</div>

<style>
	.reader { display: grid; grid-template-columns: 210px 1fr; gap: 1.5rem; align-items: start; }
	.toc { position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto; padding: 0.6rem; background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius); scrollbar-width: thin; }
	.toc-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); margin: 0 0 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--border); }
	.toc-link { display: flex; gap: 0.5rem; align-items: baseline; width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 0.3rem 0.4rem; border-radius: 5px; color: var(--text-3); transition: color 0.12s, background 0.12s; }
	.toc-link:hover { background: var(--bg-3); color: var(--text-1); }
	.toc-link.active { background: var(--bg-3); color: var(--accent); }
	.toc-num { font-family: var(--font-display); font-size: 0.7rem; font-weight: 700; opacity: 0.6; flex-shrink: 0; }
	.toc-text { font-size: 0.78rem; line-height: 1.35; }

	.pages { display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }
	.pg { background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius); padding: 1.1rem 1.2rem; scroll-margin-top: 1rem; }
	.pg-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.85rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
	.pg-num { font-family: var(--font-display); font-weight: 700; color: var(--accent); opacity: 0.5; }
	.pg-head h2 { font-family: var(--font-display); font-size: 1.2rem; margin: 0; flex: 1; }

	.pg-body { display: flex; flex-direction: column; gap: 1rem; }
	.text { color: var(--text-2); font-size: 0.92rem; line-height: 1.75; min-width: 0; }
	.text :global(strong) { color: var(--text-1); }
	.text :global(em) { color: var(--accent-2); }
	.text :global(ul) { margin: 0.5rem 0 0.7rem 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }

	.visual img { width: 100%; max-width: 520px; border-radius: 6px; border: 1px solid var(--border); background: #fff; display: block; margin: 0.6rem auto 0; }
	.show-page { display: inline-flex; align-items: center; gap: 0.4rem; align-self: flex-start; padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer; background: var(--bg-3); border: 1px solid var(--border); color: var(--accent); font-size: 0.78rem; font-family: inherit; }
	.show-page:hover { border-color: var(--accent); }

	@media (max-width: 720px) {
		.reader { grid-template-columns: 1fr; }
		.toc { display: none; }
	}
</style>
