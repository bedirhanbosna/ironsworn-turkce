<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { loadTranslations } from '$lib/i18n/translate.js';
	import { ui } from '$lib/i18n/ui.js';
	import '../app.css';

	let { children } = $props();

	onMount(async () => {
		langStore.init();
		await loadTranslations();
	});

	const lang = $derived(langStore.current);

	const navItems = [
		{ href: '/moves',   key: 'nav_moves'   },
		{ href: '/oracles', key: 'nav_oracles'  },
		{ href: '/assets',  key: 'nav_assets'   },
		{ href: '/npcs',    key: 'nav_npcs'     },
		{ href: '/truths',  key: 'nav_truths'   },
		{ href: '/rulebook',key: 'nav_rulebook' },
		{ href: '/rules',   key: 'nav_rules'    },
		{ href: '/atlas',   key: 'nav_atlas'    },
		{ href: '/docs',    key: 'nav_docs'     },
	] as const;

	const currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<title>Ironsworn TR</title>
	<meta name="description" content="Ironsworn TTRPG Türkçe referans" />
</svelte:head>

<div class="app">
	<header>
		<a href="/" class="logo">⚔ Ironsworn</a>
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
		<small>Ironsworn © Shawn Tomkin, CC-BY-NC-4.0 · Veri: <a href="https://github.com/rsek/datasworn" target="_blank" rel="noopener">datasworn</a> · <a href="/pdf/rulebook.pdf" target="_blank" rel="noopener">📖 Kural Kitabı (PDF)</a></small>
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
		padding: 0.75rem 1.25rem;
		background: var(--bg-2);
		border-bottom: 1px solid var(--border);
		flex-wrap: wrap;
	}
	.logo {
		font-weight: 700;
		font-size: 1.1rem;
		color: var(--accent);
		text-decoration: none;
		white-space: nowrap;
	}
	nav {
		display: flex;
		gap: 0.25rem;
		flex-wrap: wrap;
		flex: 1;
	}
	nav a {
		padding: 0.3rem 0.7rem;
		border-radius: 6px;
		color: var(--text-2);
		text-decoration: none;
		font-size: 0.9rem;
		transition: background 0.15s;
	}
	nav a:hover, nav a.active {
		background: var(--bg-3);
		color: var(--text-1);
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
