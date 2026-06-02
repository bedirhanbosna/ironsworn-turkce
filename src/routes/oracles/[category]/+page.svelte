<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { loadRuleset, loadOverlay } from '$lib/data/loader.js';
	import type { DataswornRoot, OracleCollection, OracleTable } from '$lib/data/types.js';
	import { langStore } from '$lib/i18n/lang.svelte.js';
	import { tr } from '$lib/i18n/translate.js';
	import { ui, oracleCatMeta } from '$lib/i18n/ui.js';
	import PdfRef from '$lib/components/PdfRef.svelte';
	import Icon from '$lib/components/Icon.svelte';

	let data: DataswornRoot | null = $state(null);
	let overlay: Record<string, string> = $state({});
	let openId = $state<string | null>(null);
	let rolls = $state<Record<string, { value: number; text: string }>>({});

	onMount(async () => {
		[data, overlay] = await Promise.all([loadRuleset(), loadOverlay()]);
	});

	const lang = $derived(langStore.current);
	const slug = $derived($page.params.category);

	const col = $derived.by((): OracleCollection | null => {
		if (!data || !slug) return null;
		return data.oracles[slug as string] ?? null;
	});

	const meta = $derived(slug ? oracleCatMeta[slug] : undefined);

	// Flatten all tables in this collection (recursive)
	function flatTables(c: OracleCollection): { label: string; table: OracleTable }[] {
		const out: { label: string; table: OracleTable }[] = [];
		if (c.contents) {
			for (const t of Object.values(c.contents)) out.push({ label: '', table: t });
		}
		if (c.collections) {
			for (const sub of Object.values(c.collections)) {
				const subLabel = overlay[`${sub._id}#name`] ?? sub.name;
				const children = flatTables(sub);
				children.forEach(x => { if (!x.label) x.label = subLabel; });
				out.push(...children);
			}
		}
		return out;
	}

	const tables = $derived.by(() => col ? flatTables(col) : []);

	function rollOracle(table: OracleTable) {
		const dice = table.dice ?? '1d100';
		const match = dice.match(/(\d+)d(\d+)/);
		if (!match) return;
		const count = parseInt(match[1]);
		const sides = parseInt(match[2]);
		let total = 0;
		for (let i = 0; i < count; i++) total += Math.floor(Math.random() * sides) + 1;
		const row = table.rows.find(r => total >= (r.min ?? 0) && total <= (r.max ?? 100));
		if (row) {
			const idx = table.rows.indexOf(row);
			rolls[table._id] = { value: total, text: overlay[`${table._id}#rows.${idx}.text`] ?? row.text };
		}
	}
</script>

<div class="page-header">
	<a href="/oracles" class="back">{ui(lang, 'back')}</a>
	{#if col}
		<h1><Icon name={meta?.icon ?? 'dice'} size={24} /> {tr(col._id, 'name', col.name, lang)}</h1>
		{#if meta}<p class="page-desc">{ui(lang, meta.desc)}</p>{/if}
	{:else if data}
		<h1>—</h1>
	{:else}
		<p class="hint">{ui(lang, 'loading')}</p>
	{/if}
</div>

{#if col && tables.length > 0}
	{#each tables as { label, table }}
		{@const tid = table._id}
		{@const isOpen = openId === tid}
		{@const roll = rolls[tid]}

		{#if label}
			<h3 class="sub-label">{label}</h3>
		{/if}

		<div class="oracle-card" id={tid.split('/').pop()}>
			<div class="oracle-header">
				<button class="name-btn" onclick={() => openId = isOpen ? null : tid}>
					<span>{tr(tid, 'name', table.name, lang)}</span>
					<span class="chevron">{isOpen ? '▲' : '▼'}</span>
				</button>
				<button class="roll-btn" onclick={() => rollOracle(table)} title="Zar at">
					🎲 {table.dice ?? '1d100'}
				</button>
			</div>

			{#if roll}
				<div class="roll-result">
					<span class="roll-val">{roll.value}</span>
					<span class="roll-text">{roll.text}</span>
				</div>
			{/if}

			{#if isOpen}
				<div class="table-body">
					{#if table._source?.page}
						<div class="oracle-meta"><PdfRef page={table._source.page} /></div>
					{/if}
					{#if table.summary}
						<p class="summary">{tr(tid, 'summary', table.summary, lang)}</p>
					{/if}
					<table>
						<thead>
							<tr>
								<th>{table.dice ?? 'd100'}</th>
								<th>{tr(tid, 'column_labels.text', table.column_labels?.text ?? 'Result', lang)}</th>
							</tr>
						</thead>
						<tbody>
							{#each table.rows as row, i}
								{@const rowText = overlay[`${tid}#rows.${i}.text`] ?? row.text}
								{@const isRolled = roll?.text === rowText}
								<tr class:highlighted={isRolled}>
									<td class="range">{row.min === row.max ? row.min : `${row.min}–${row.max}`}</td>
									<td>{rowText}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</div>
	{/each}
{/if}

<style>
	.page-header { margin-bottom: 1.5rem; }
	.page-header h1 { display: flex; align-items: center; gap: 0.55rem; }
	.back { font-size: 0.85rem; color: var(--text-3); text-decoration: none; display: block; margin-bottom: 0.5rem; }
	.back:hover { color: var(--accent); }
	.page-desc { color: var(--text-3); font-size: 0.9rem; margin-top: 0.4rem; max-width: 680px; }
	.hint { color: var(--text-3); }

	.sub-label { font-size: 0.85rem; color: var(--text-3); text-transform: uppercase; letter-spacing: 0.05em; margin: 1.25rem 0 0.4rem; }

	.oracle-card { border: 1px solid var(--border); border-radius: var(--radius); background: var(--bg-2); overflow: hidden; margin-bottom: 0.4rem; }
	.oracle-header { display: flex; align-items: stretch; }
	.name-btn {
		flex: 1; display: flex; justify-content: space-between; align-items: center;
		padding: 0.6rem 0.9rem; background: none; border: none;
		color: var(--text-1); cursor: pointer; text-align: left; font-size: 0.9rem; font-weight: 600;
	}
	.name-btn:hover { background: var(--bg-3); }
	.chevron { color: var(--text-3); font-size: 0.75rem; }
	.roll-btn {
		padding: 0.6rem 0.9rem; background: none; border: none; border-left: 1px solid var(--border);
		color: var(--accent); cursor: pointer; font-size: 0.8rem; white-space: nowrap;
	}
	.roll-btn:hover { background: var(--bg-3); }

	.roll-result {
		display: flex; align-items: center; gap: 0.75rem;
		padding: 0.5rem 0.9rem; background: var(--bg-3); border-top: 1px solid var(--border);
	}
	.roll-val { font-size: 1.2rem; font-weight: 700; color: var(--accent); min-width: 2.5rem; text-align: center; }
	.roll-text { color: var(--text-1); }

	.table-body { padding: 0.75rem; border-top: 1px solid var(--border); }
	.oracle-meta { display: flex; justify-content: flex-end; margin-bottom: 0.5rem; }
	.summary { color: var(--text-3); font-style: italic; margin-bottom: 0.5rem; font-size: 0.85rem; }
	table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
	th { text-align: left; padding: 0.3rem 0.5rem; color: var(--text-3); border-bottom: 1px solid var(--border); }
	td { padding: 0.25rem 0.5rem; color: var(--text-2); }
	.range { color: var(--text-3); white-space: nowrap; min-width: 3.5rem; }
	tr:hover td { background: var(--bg-3); }
	tr.highlighted td { background: #2a3a2a; color: var(--text-1); }
</style>
