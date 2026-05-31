<script lang="ts">
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { ui } from '$lib/i18n/ui.js';
	import { docs } from '$lib/docs.js';

	const lang = $derived(langStore.current);
</script>

<div class="page-header">
	<h1>{ui(lang, 'nav_docs')}</h1>
	<p class="page-desc">{ui(lang, 'desc_docs')}</p>
</div>

<div class="doc-list">
	{#each docs as doc}
		<a class="doc-card" href="/pdf/{doc.file}" target="_blank" rel="noopener">
			<span class="icon">{doc.icon}</span>
			<div class="doc-body">
				<div class="doc-title">
					<strong>{lang === 'tr' ? doc.title_tr : doc.title_en}</strong>
					<span class="size">{doc.size}</span>
				</div>
				<span class="doc-desc">{lang === 'tr' ? doc.desc_tr : doc.desc_en}</span>
				<span class="badge" class:on={doc.offline}>
					{doc.offline ? `🔒 ${ui(lang, 'offline_ready')}` : `☁ ${ui(lang, 'download_first')}`}
				</span>
			</div>
		</a>
	{/each}
</div>

<style>
	.page-header { margin-bottom: 1.75rem; }
	.page-desc { color: var(--text-3); font-size: 0.9rem; line-height: 1.6; margin-top: 0.4rem; max-width: 680px; }

	.doc-list { display: flex; flex-direction: column; gap: 0.6rem; }
	.doc-card {
		display: flex; gap: 0.9rem; align-items: flex-start;
		padding: 0.9rem 1rem;
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		text-decoration: none; color: var(--text-2);
		transition: border-color 0.15s, background 0.15s;
	}
	.doc-card:hover { background: var(--bg-3); border-color: var(--accent); }
	.icon { font-size: 1.8rem; line-height: 1; }
	.doc-body { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
	.doc-title { display: flex; align-items: baseline; gap: 0.6rem; }
	.doc-title strong { font-size: 1rem; color: var(--text-1); }
	.size { font-size: 0.75rem; color: var(--text-3); }
	.doc-desc { font-size: 0.85rem; color: var(--text-3); line-height: 1.5; }
	.badge {
		align-self: flex-start; margin-top: 0.2rem;
		font-size: 0.7rem; padding: 0.1rem 0.45rem; border-radius: 4px;
		background: var(--bg-4); color: var(--text-3);
	}
	.badge.on { color: #7ec89a; }
</style>
