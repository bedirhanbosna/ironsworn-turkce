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

	const navItems = [
		{ href: '/basla',   key: 'nav_start'   },
		{ href: '/moves',   key: 'nav_moves'   },
		{ href: '/oracles', key: 'nav_oracles'  },
		{ href: '/assets',  key: 'nav_assets'   },
		{ href: '/npcs',    key: 'nav_npcs'     },
		{ href: '/truths',  key: 'nav_truths'   },
{ href: '/rules',   key: 'nav_rules'    },
		{ href: '/atlas',   key: 'nav_atlas'    },
		{ href: '/docs',    key: 'nav_docs'     },
		{ href: '/kaynaklar', key: 'nav_resources' },
	] as const;

	const currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<title>Ironsworn TR</title>
	<meta name="description" content="Ironsworn TTRPG Türkçe referans" />
</svelte:head>

<div class="app">
	<header>
		<a href="/" class="logo"><Icon name="crossed-swords" size={18} /> Ironsworn</a>
		<nav>
			{#each navItems as item}
				<a href={item.href} class:active={currentPath.startsWith(item.href)}>{ui(lang, item.key)}</a>
			{/each}
		</nav>
		<button
			class="lang-toggle"
			onclick={() => langStore.toggle()}
			title="Switch language"
		>
			{ui(lang, 'lang_btn')}
		</button>
	</header>

	<main>
		{@render children()}
	</main>

	<footer>
		<small>Ironsworn © Shawn Tomkin, CC-BY-NC-4.0 · Veri: <a href="https://github.com/rsek/datasworn" target="_blank" rel="noopener">datasworn</a> · <a href="/pdf/rulebook.pdf" target="_blank" rel="noopener">Kural Kitabı (PDF)</a> · İkonlar: <a href="https://game-icons.net" target="_blank" rel="noopener">game-icons.net</a> (CC BY 3.0)</small>
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
		gap: 0.15rem;
		flex-wrap: wrap;
		flex: 1;
	}
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
	.lang-toggle {
		margin-left: auto;
		padding: 0.3rem 0.75rem;
		border-radius: 6px;
		border: 1px solid var(--border);
		background: var(--bg-3);
		color: var(--text-1);
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
	}
	main {
		flex: 1;
		padding: 1.25rem;
		max-width: 900px;
		margin: 0 auto;
		width: 100%;
	}
	footer {
		padding: 0.75rem 1.25rem;
		border-top: 1px solid var(--border);
		text-align: center;
		color: var(--text-3);
	}
	footer a { color: var(--text-3); }
</style>
