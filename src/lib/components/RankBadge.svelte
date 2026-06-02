<script lang="ts">
	// Zorluk derecesi rozeti — rank 1–5 tehdit tonuyla renklenir.
	let { rank, label }: { rank: number; label: string } = $props();
	const toned = $derived(rank >= 1 && rank <= 5);
</script>

<span class="rank-badge" class:toned style={toned ? `--bg:var(--rank-${rank}-bg);--fg:var(--rank-${rank}-fg)` : ''}>
	{label}
</span>

<style>
	.rank-badge {
		font-size: 0.68rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		padding: 0.12rem 0.5rem;
		border-radius: 999px;
		white-space: nowrap;
		background: var(--bg-4);
		color: var(--text-3);
		border: 1px solid transparent;
	}
	.rank-badge.toned {
		background: var(--bg);
		color: var(--fg);
		border-color: color-mix(in srgb, var(--fg) 35%, transparent);
	}
</style>
