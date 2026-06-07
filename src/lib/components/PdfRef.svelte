<script lang="ts">
	// Datasworn _source.page (basılı kitap sayfası) → rulebook.pdf iç sayfası.
	// Doğrulanan ofset: PDF #page = basılı sayfa + 11.
	const PDF_PAGE_OFFSET = 11;

	let { page }: { page?: number } = $props();

	const viewerHref = (p: number) =>
		`/pdf-viewer?file=/pdf/rulebook.pdf&page=${p + PDF_PAGE_OFFSET}`;
</script>

{#if page}
	<a
		class="pdf-ref"
		href={viewerHref(page)}
		title="Kural kitabında aç (s.{page})"
	>
		📖 s.{page}
	</a>
{/if}

<style>
	.pdf-ref {
		flex-shrink: 0;
		font-size: 0.72rem;
		padding: 0.12rem 0.4rem;
		border-radius: 4px;
		background: var(--bg-3);
		border: 1px solid var(--border);
		color: var(--accent);
		text-decoration: none;
		white-space: nowrap;
	}
	.pdf-ref:hover { border-color: var(--accent); }
</style>
