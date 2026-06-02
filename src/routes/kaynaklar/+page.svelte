<script lang="ts">
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import { resourceSections } from '$lib/content/resources.js';
	import Icon from '$lib/components/Icon.svelte';

	const lang = $derived(langStore.current);
	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		if (!q) return resourceSections;
		return resourceSections
			.map(s => ({ ...s, items: s.items.filter(i =>
				i.name.toLowerCase().includes(q) || i.desc.toLowerCase().includes(q)) }))
			.filter(s => s.items.length > 0);
	});

	const total = resourceSections.reduce((n, s) => n + s.items.length, 0);
</script>

<div class="page-header">
	<h1><Icon name="papers" size={24} /> {ui(lang, 'nav_resources')}</h1>
	<p class="page-desc">{ui(lang, 'desc_resources')}</p>
	<p class="src-note">
		{lang === 'tr' ? 'Kaynak: ' : 'Source: '}
		<a href="https://billiam.github.io/awesome-ironsworn/" target="_blank" rel="noopener">awesome-ironsworn</a>
		· {total} {lang === 'tr' ? 'bağlantı' : 'links'}
	</p>
</div>

<div class="search-box">
	<input type="search" placeholder={lang === 'tr' ? 'Araçlarda ara: oracle, map, sheet…' : 'Search: oracle, map, sheet…'} bind:value={query} />
</div>

{#if filtered.length === 0}
	<p class="hint">{ui(lang, 'no_result')}</p>
{:else}
	<div class="sections">
		{#each filtered as sec (sec.id)}
			<section class="res-sec">
				<div class="sec-head">
					<span class="icon icon-medallion"><Icon name={sec.icon} size={22} /></span>
					<h2>{lang === 'tr' ? sec.title_tr : sec.title_en}</h2>
					<span class="count">{sec.items.length}</span>
				</div>
				<ul class="items">
					{#each sec.items as item}
						<li>
							<a class="res-link" href={item.url} target="_blank" rel="noopener">
								<span class="res-name">{item.name}<span class="ext">↗</span></span>
								{#if item.desc}<span class="res-desc">{item.desc}</span>{/if}
							</a>
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
{/if}

<style>
	.page-header { margin-bottom: 1.25rem; }
	.page-header h1 { display: flex; align-items: center; gap: 0.55rem; }
	.page-desc { color: var(--text-2); font-size: 0.95rem; line-height: 1.65; margin-top: 0.5rem; max-width: 640px; }
	.src-note { color: var(--text-3); font-size: 0.8rem; margin-top: 0.4rem; }
	.src-note a { color: var(--accent); }

	.search-box { margin-bottom: 1.5rem; max-width: 460px; }
	.hint { color: var(--text-3); }

	.sections { display: flex; flex-direction: column; gap: 1.5rem; }
	.sec-head {
		display: flex; align-items: center; gap: 0.6rem;
		margin-bottom: 0.7rem; padding-bottom: 0.4rem;
		border-bottom: 1px solid var(--border);
	}
	.sec-head h2 { font-size: 1.15rem; margin: 0; flex: 1; }
	.sec-head .count {
		font-size: 0.72rem; color: var(--text-3);
		background: var(--bg-3); border: 1px solid var(--border);
		padding: 0.05rem 0.5rem; border-radius: 999px;
	}

	.items {
		list-style: none;
		display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.5rem;
	}
	.res-link {
		display: flex; flex-direction: column; gap: 0.2rem;
		padding: 0.65rem 0.8rem; height: 100%;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.15s, background 0.15s, transform 0.15s;
	}
	.res-link:hover { background: var(--bg-3); border-color: var(--accent); transform: translateY(-1px); }
	.res-name { color: var(--accent); font-weight: 600; font-size: 0.92rem; }
	.ext { font-size: 0.7rem; opacity: 0.55; margin-left: 0.3rem; }
	.res-desc { font-size: 0.82rem; line-height: 1.45; color: var(--text-3); }
</style>
