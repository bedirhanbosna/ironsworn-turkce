<script lang="ts">
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import { introSections } from '$lib/content/intro.js';
	import Icon from '$lib/components/Icon.svelte';
	import Markdown from '$lib/components/Markdown.svelte';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import type { IconName } from '$lib/icons.js';

	const lang = $derived(langStore.current);

	const nextSteps: { href: string; icon: IconName; tr: string; en: string; d_tr: string; d_en: string }[] = [
		{ href: '/truths',  icon: 'earth',          tr: 'Dünyanı Kur',     en: 'Build Your World',  d_tr: 'Demir Diyarlar\'ın gerçeklerini seç', d_en: 'Choose the truths of the Ironlands' },
		{ href: '/assets',  icon: 'scroll',         tr: 'Kartlarını Seç',  en: 'Choose Assets',     d_tr: '3 yetenek kartıyla başla',            d_en: 'Start with 3 asset cards' },
		{ href: '/moves',   icon: 'crossed-swords', tr: 'Hamleleri Öğren',  en: 'Learn the Moves',   d_tr: 'Tehlikeyle yüzleş, ant iç, savaş',    d_en: 'Face danger, swear vows, fight' },
		{ href: '/oracles', icon: 'crystal-ball',   tr: 'Kehanete Danış',  en: 'Ask the Oracle',    d_tr: 'Belirsizlikte kaderin sesini dinle',  d_en: 'Let fate decide the unknown' },
	];
</script>

<div class="start">
	<section class="hero">
		<div class="hero-glow" aria-hidden="true"></div>
		<p class="eyebrow"><Icon name="book" size={14} /> {lang === 'tr' ? 'BAŞLANGIÇ REHBERİ' : 'GETTING STARTED'}</p>
		<h1>{lang === 'tr' ? 'Demir Diyarlar\'a Hoş Geldin' : 'Welcome to the Ironlands'}</h1>
		<p class="lede">{ui(lang, 'desc_start')}</p>
	</section>

	<div class="sections">
		{#each introSections as s, i}
			<article class="sec" id={s.id}>
				<div class="sec-head">
					<span class="sec-num">{String(i + 1).padStart(2, '0')}</span>
					<span class="sec-icon"><Icon name={s.icon} size={22} /></span>
					<h2>{lang === 'tr' ? s.title_tr : s.title_en}</h2>
					<PdfRef page={s.page} />
				</div>
				<div class="sec-body">
					<Markdown text={lang === 'tr' ? s.body_tr : s.body_en} />
				</div>
			</article>
		{/each}
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
	.start { max-width: 760px; margin: 0 auto; }

	/* Hero */
	.hero { position: relative; text-align: center; padding: 2rem 1rem 1.5rem; margin-bottom: 1.5rem; overflow: hidden; }
	.hero-glow {
		position: absolute; top: -50%; left: 50%; transform: translateX(-50%);
		width: 600px; height: 420px;
		background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 65%);
		pointer-events: none; z-index: 0;
	}
	.hero > *:not(.hero-glow) { position: relative; z-index: 1; }
	.eyebrow {
		font-size: 0.7rem; letter-spacing: 0.26em; color: var(--accent);
		display: inline-flex; align-items: center; gap: 0.4rem; text-transform: uppercase;
		margin-bottom: 0.85rem; opacity: 0.85;
	}
	.hero h1 {
		font-family: var(--font-display); font-size: clamp(1.8rem, 4.5vw, 2.6rem);
		font-weight: 600; color: var(--accent); line-height: 1.15; margin-bottom: 0.7rem;
		text-shadow: 0 2px 22px var(--accent-glow);
	}
	.lede { color: var(--text-2); font-size: 1rem; line-height: 1.7; max-width: 520px; margin: 0 auto; }

	/* Sections */
	.sections { display: flex; flex-direction: column; gap: 1rem; }
	.sec {
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		padding: 1.3rem 1.4rem; scroll-margin-top: 1rem;
		position: relative;
	}
	.sec-head { display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.85rem; }
	.sec-num {
		font-family: var(--font-display); font-size: 0.95rem; font-weight: 700;
		color: var(--accent); opacity: 0.55; min-width: 1.6rem;
	}
	.sec-icon { color: var(--accent); display: flex; }
	.sec-head h2 {
		font-family: var(--font-display); font-size: 1.25rem; font-weight: 600;
		color: var(--text-1); margin: 0; flex: 1;
	}
	.sec-body {
		color: var(--text-2); font-size: 0.95rem; line-height: 1.75;
		padding-left: calc(1.6rem + 0.6rem);
	}
	.sec-body :global(p) { margin-bottom: 0.7rem; }
	.sec-body :global(p:last-child) { margin-bottom: 0; }
	.sec-body :global(ul) { margin: 0.5rem 0 0.7rem 1.1rem; display: flex; flex-direction: column; gap: 0.3rem; }
	.sec-body :global(strong) { color: var(--text-1); }
	.sec-body :global(em) { color: var(--accent-2); }

	/* Next steps */
	.next { margin-top: 2.5rem; }
	.next-title {
		font-family: var(--font-display); text-align: center; color: var(--accent);
		font-size: 1.4rem; margin-bottom: 1.1rem; font-weight: 600;
	}
	.next-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.7rem; }
	.step {
		display: flex; flex-direction: column; gap: 0.35rem; align-items: flex-start;
		padding: 1rem 1.05rem; border-radius: var(--radius);
		background: var(--bg-2); border: 1px solid var(--border);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.18s, background 0.18s, transform 0.18s;
	}
	.step:hover { background: var(--bg-3); border-color: var(--accent); transform: translateY(-2px); }
	.step-icon { color: var(--accent); }
	.step strong { color: var(--text-1); font-size: 0.98rem; }
	.step-desc { font-size: 0.8rem; line-height: 1.45; }
</style>
