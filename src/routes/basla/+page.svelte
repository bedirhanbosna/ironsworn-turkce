<script lang="ts">
	import { onMount } from 'svelte';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import { basicsPages } from '$lib/content/basics.js';
	import Icon from '$lib/components/Icon.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import ActionRoll from '$lib/components/diagrams/ActionRoll.svelte';
	import MoveAnatomy from '$lib/components/diagrams/MoveAnatomy.svelte';
	import CharacterSheet from '$lib/components/diagrams/CharacterSheet.svelte';
	import type { IconName } from '$lib/icons.js';

	const lang = $derived(langStore.current);
	let openImgs = $state<Record<number, boolean>>({});
	let activePage = $state(1);

	const nextSteps: { href: string; icon: IconName; tr: string; en: string; d_tr: string; d_en: string }[] = [
		{ href: '/truths',  icon: 'earth',          tr: 'Dünyanı Kur',     en: 'Build Your World',  d_tr: 'Demir Diyarlar\'ın gerçeklerini seç', d_en: 'Choose the truths of the Ironlands' },
		{ href: '/assets',  icon: 'scroll',         tr: 'Kartlarını Seç',  en: 'Choose Assets',     d_tr: '3 yetenek kartıyla başla',            d_en: 'Start with 3 asset cards' },
		{ href: '/moves',   icon: 'crossed-swords', tr: 'Hamleleri Öğren',  en: 'Learn the Moves',   d_tr: 'Tehlikeyle yüzleş, ant iç, savaş',    d_en: 'Face danger, swear vows, fight' },
		{ href: '/oracles', icon: 'crystal-ball',   tr: 'Kehanete Danış',  en: 'Ask the Oracle',    d_tr: 'Belirsizlikte kaderin sesini dinle',  d_en: 'Let fate decide the unknown' },
	];

	function scrollTo(page: number) {
		document.getElementById(`s${page}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	onMount(() => {
		const obs = new IntersectionObserver(
			(entries) => {
				for (const e of entries) if (e.isIntersecting) activePage = Number(e.target.id.slice(1));
			},
			{ rootMargin: '-15% 0px -75% 0px' }
		);
		const t = setTimeout(() => document.querySelectorAll('.pg[id]').forEach((el) => obs.observe(el)), 200);
		return () => { obs.disconnect(); clearTimeout(t); };
	});
</script>

<div class="start">
	<section class="hero">
		<div class="hero-glow" aria-hidden="true"></div>
		<p class="eyebrow"><Icon name="book" size={14} /> {lang === 'tr' ? 'BAŞLANGIÇ REHBERİ · BÖLÜM 1' : 'GETTING STARTED · CHAPTER 1'}</p>
		<h1>{lang === 'tr' ? 'Demir Diyarlar\'a Hoş Geldin' : 'Welcome to the Ironlands'}</h1>
		<p class="lede">{ui(lang, 'desc_start')}</p>
	</section>

	<div class="reader">
		<aside class="toc" aria-label="İçindekiler">
			<p class="toc-title">İçindekiler</p>
			{#each basicsPages as p}
				<button class="toc-link" class:active={activePage === p.page} onclick={() => scrollTo(p.page)}>
					<span class="toc-num">{String(p.page).padStart(2, '0')}</span>
					<span class="toc-text">{lang === 'tr' ? p.title_tr : p.title_en}</span>
				</button>
			{/each}
		</aside>

		<div class="pages">
			{#each basicsPages as p}
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

	<section class="next">
		<h2 class="next-title">{lang === 'tr' ? 'İlk Adımların' : 'Your First Steps'}</h2>
		<div class="next-grid">
			{#each nextSteps as step}
				<a class="step" href={step.href}>
					<span class="step-icon icon-medallion"><Icon name={step.icon} size={24} /></span>
					<strong>{lang === 'tr' ? step.tr : step.en}</strong>
					<span class="step-desc">{lang === 'tr' ? step.d_tr : step.d_en}</span>
				</a>
			{/each}
		</div>
	</section>
</div>

<style>
	.start { max-width: 980px; margin: 0 auto; }

	/* Hero */
	.hero { position: relative; text-align: center; padding: 0.75rem 1rem 1.25rem; margin: -1.25rem 0 1.5rem; overflow: hidden; }
	.hero-glow { position: absolute; top: -30%; left: 50%; transform: translateX(-50%); width: 600px; height: 380px; background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 65%); pointer-events: none; z-index: 0; }
	.hero > *:not(.hero-glow) { position: relative; z-index: 1; }
	.eyebrow { font-size: 0.7rem; letter-spacing: 0.24em; color: var(--accent); display: inline-flex; align-items: center; gap: 0.4rem; text-transform: uppercase; margin-bottom: 0.85rem; opacity: 0.85; }
	.hero h1 { font-family: var(--font-display); font-size: clamp(1.8rem, 4.5vw, 2.6rem); font-weight: 600; color: var(--accent); line-height: 1.15; margin-bottom: 0.7rem; text-shadow: 0 2px 22px var(--accent-glow); }
	.lede { color: var(--text-2); font-size: 1rem; line-height: 1.7; max-width: 520px; margin: 0 auto; }

	/* Doc-style layout */
	.reader { display: grid; grid-template-columns: 210px 1fr; gap: 1.5rem; align-items: start; }

	.toc { position: sticky; top: 1rem; max-height: calc(100vh - 2rem); overflow-y: auto; padding: 0.6rem; background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius); scrollbar-width: thin; }
	.toc-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3); margin: 0 0 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid var(--border); }
	.toc-link { display: flex; gap: 0.5rem; align-items: baseline; width: 100%; text-align: left; background: none; border: none; cursor: pointer; padding: 0.3rem 0.4rem; border-radius: 5px; color: var(--text-3); transition: color 0.12s, background 0.12s; }
	.toc-link:hover { background: var(--bg-3); color: var(--text-1); }
	.toc-link.active { background: var(--bg-3); color: var(--accent); }
	.toc-num { font-family: var(--font-display); font-size: 0.7rem; font-weight: 700; opacity: 0.6; flex-shrink: 0; }
	.toc-text { font-size: 0.78rem; line-height: 1.35; }

	/* Sayfalar */
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
	.show-page {
		display: inline-flex; align-items: center; gap: 0.4rem; align-self: flex-start;
		padding: 0.35rem 0.75rem; border-radius: 6px; cursor: pointer;
		background: var(--bg-3); border: 1px solid var(--border); color: var(--accent);
		font-size: 0.78rem; font-family: inherit;
	}
	.show-page:hover { border-color: var(--accent); }

	/* Mobil: sidebar gizli */
	@media (max-width: 720px) {
		.reader { grid-template-columns: 1fr; }
		.toc { display: none; }
	}

	/* Sonraki adımlar */
	.next { margin-top: 2.5rem; }
	.next-title { font-family: var(--font-display); text-align: center; color: var(--accent); font-size: 1.4rem; margin-bottom: 1.1rem; font-weight: 600; }
	.next-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.7rem; }
	.step { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; padding: 1rem 1.05rem; border-radius: var(--radius); background: var(--bg-2); border: 1px solid var(--border); text-decoration: none; color: var(--text-2); transition: border-color 0.18s, background 0.18s, transform 0.18s; }
	.step:hover { background: var(--bg-3); border-color: var(--accent); transform: translateY(-2px); }
	.step strong { color: var(--text-1); font-size: 0.98rem; }
	.step-desc { font-size: 0.8rem; line-height: 1.45; }
</style>
