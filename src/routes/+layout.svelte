<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { loadTranslations } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';
	import Icon from '$lib/components/Icon.svelte';
	import '../app.css';

	let { children } = $props();

	onMount(async () => {
		langStore.init();
		await loadTranslations();
	});

	const lang = $derived(langStore.current);
	let menuOpen = $state(false);

	// Nav, etkileşim moduna göre gruplanır: Oku (anlatı) · Başvuru (data) · Kaynaklar (dış).
	const navGroups = [
		{ key: 'navg_read', items: [
			{ href: '/basla',        key: 'nav_start'     },
			{ href: '/kural-kitabi', key: 'nav_rulebook'  },
			{ href: '/belgeler',     key: 'nav_documents' },
		] },
		{ key: 'navg_reference', items: [
			{ href: '/moves',   key: 'nav_moves'   },
			{ href: '/oracles', key: 'nav_oracles' },
			{ href: '/assets',  key: 'nav_assets'  },
			{ href: '/npcs',    key: 'nav_npcs'    },
			{ href: '/rules',   key: 'nav_rules'   },
			{ href: '/truths',  key: 'nav_truths'  },
			{ href: '/atlas',   key: 'nav_atlas'   },
		] },
	] as const;
	// Tek başına dış öğe (göm sonrası "Dosya" grubu yalnız buna iner)
	const navTrailing = [ { href: '/kaynaklar', key: 'nav_resources' } ] as const;

	const currentPath = $derived($page.url.pathname);
	// Rota değişince mobil menüyü kapat
	$effect(() => { currentPath; menuOpen = false; });
</script>

<svelte:head>
	<title>Ironsworn TR</title>
	<meta name="description" content="Ironsworn TTRPG Türkçe referans" />
</svelte:head>

<div class="app">
	<header>
		<a href="/" class="logo"><Icon name="crossed-swords" size={18} /> Ironsworn</a>

		<nav class:open={menuOpen} id="main-nav">
			{#each navGroups as group}
				<div class="nav-group">
					<span class="nav-group-label">{ui(lang, group.key)}</span>
					{#each group.items as item}
						<a href={item.href} class:active={currentPath.startsWith(item.href)} onclick={() => (menuOpen = false)}>{ui(lang, item.key)}</a>
					{/each}
				</div>
			{/each}
			<div class="nav-group nav-trailing">
				{#each navTrailing as item}
					<a href={item.href} class:active={currentPath.startsWith(item.href)} onclick={() => (menuOpen = false)}>{ui(lang, item.key)}</a>
				{/each}
			</div>
		</nav>

		<div class="header-actions">
			<button
				class="lang-toggle"
				onclick={() => langStore.toggle()}
				title="Switch language"
			>
				{ui(lang, 'lang_btn')}
			</button>
			<button
				class="nav-toggle"
				aria-label="Menü"
				aria-expanded={menuOpen}
				aria-controls="main-nav"
				onclick={() => (menuOpen = !menuOpen)}
			>
				{menuOpen ? '✕' : '☰'}
			</button>
		</div>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<p class="f-main">
			<a href="https://www.ironswornrpg.com" target="_blank" rel="noopener"><em>Ironsworn</em></a>
			© Shawn Tomkin — <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>.
			Bu bir gönüllü hayran çevirisidir; resmî değildir.
		</p>
		<p class="f-thanks">
			Teşekkürler ✦
			<a href="https://www.ironswornrpg.com" target="_blank" rel="noopener">Shawn Tomkin</a> (oyun) ·
			<a href="https://github.com/rsek/datasworn" target="_blank" rel="noopener">datasworn</a> (veri) ·
			<a href="https://billiam.github.io/awesome-ironsworn/" target="_blank" rel="noopener">awesome-ironsworn</a> (kaynaklar) ·
			<a href="https://game-icons.net" target="_blank" rel="noopener">game-icons.net</a> (ikonlar, CC BY 3.0) ·
			Cinzel &amp; Spectral (fontlar, OFL) ·
			<a href="/pdf/rulebook.pdf" target="_blank" rel="noopener">Kural Kitabı (PDF)</a>
		</p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.7rem 1.25rem;
		background: linear-gradient(180deg, var(--bg-2), color-mix(in srgb, var(--bg-2) 88%, #000));
		border-bottom: 1px solid var(--border);
		box-shadow: 0 1px 0 var(--accent-glow);
		flex-wrap: wrap;
		position: relative;
	}
	.logo {
		font-family: var(--font-display);
		font-weight: 700;
		font-size: 1.15rem;
		letter-spacing: 0.04em;
		color: var(--accent);
		text-decoration: none;
		white-space: nowrap;
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
	}
	nav {
		display: flex;
		align-items: center;
		gap: 0.3rem 0.7rem;
		flex-wrap: wrap;
		flex: 1;
	}
	.nav-group { display: inline-flex; align-items: center; gap: 0.1rem; }
	.nav-group-label {
		font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.14em;
		color: var(--text-3); opacity: 0.7; margin-right: 0.25rem;
		white-space: nowrap; user-select: none;
	}
	.nav-trailing { border-left: 1px solid var(--border); padding-left: 0.7rem; }
	nav a {
		padding: 0.3rem 0.7rem;
		border-radius: 6px;
		color: var(--text-2);
		text-decoration: none;
		font-size: 0.85rem;
		letter-spacing: 0.02em;
		position: relative;
		transition: background 0.15s, color 0.15s;
	}
	nav a:hover { background: var(--bg-3); color: var(--text-1); }
	nav a.active {
		color: var(--accent);
		background: var(--bg-3);
	}
	nav a.active::after {
		content: '';
		position: absolute; left: 0.7rem; right: 0.7rem; bottom: 0.05rem;
		height: 2px; border-radius: 2px;
		background: linear-gradient(90deg, var(--accent), transparent);
	}
	.header-actions { display: flex; align-items: center; gap: 0.5rem; margin-left: auto; }
	.lang-toggle {
		padding: 0.3rem 0.75rem;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--bg-3);
		color: var(--text-1);
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
	}
	.nav-toggle {
		display: none;
		width: 2.2rem; height: 2.2rem;
		align-items: center; justify-content: center;
		border-radius: 6px; border: 1px solid var(--border);
		background: var(--bg-3); color: var(--accent);
		cursor: pointer; font-size: 1.1rem; line-height: 1;
	}

	/* ── Mobil: yatay nav → açılır panel + hamburger ── */
	@media (max-width: 720px) {
		header { flex-wrap: nowrap; }
		.nav-toggle { display: inline-flex; }
		nav {
			display: none;
			position: absolute; top: 100%; left: 0; right: 0; z-index: 50;
			flex-direction: column; gap: 0.1rem;
			padding: 0.5rem;
			background: linear-gradient(180deg, var(--bg-2), color-mix(in srgb, var(--bg-2) 92%, #000));
			border-bottom: 1px solid var(--border);
			box-shadow: 0 10px 24px rgba(0,0,0,0.4);
		}
		nav.open { display: flex; }
		nav a { padding: 0.6rem 0.8rem; font-size: 0.95rem; }
		.nav-group { flex-direction: column; align-items: stretch; gap: 0; width: 100%; }
		.nav-group-label { margin: 0.5rem 0.8rem 0.2rem; opacity: 0.6; }
		.nav-trailing { border-left: none; border-top: 1px solid var(--border); padding-left: 0; margin-top: 0.3rem; padding-top: 0.3rem; }
		nav a.active::after {
			left: 0; right: auto; top: 0.5rem; bottom: 0.5rem;
			width: 3px; height: auto;
			background: linear-gradient(180deg, var(--accent), transparent);
		}
	}
	main {
		flex: 1;
		padding: 1.25rem;
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}
	footer {
		padding: 1rem 1.25rem 1.25rem;
		border-top: 1px solid var(--border);
		text-align: center;
		color: var(--text-3);
		font-size: 0.78rem;
		line-height: 1.7;
	}
	footer a { color: var(--text-3); text-decoration: none; border-bottom: 1px dotted color-mix(in srgb, var(--text-3) 50%, transparent); }
	footer a:hover { color: var(--accent); border-bottom-color: var(--accent); }
	.f-main { margin-bottom: 0.35rem; }
	.f-main a em { color: var(--accent); font-style: italic; }
	.f-thanks { max-width: 760px; margin: 0 auto; }
</style>
