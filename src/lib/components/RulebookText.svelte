<script lang="ts">
	interface Props { text: string }
	let { text }: Props = $props();

	function renderText(raw: string): string {
		return raw
			// (page NN) veya (pages NN-MM) → PDF deep-link (basılı sayfa + 11 = PDF sayfası)
			.replace(/\(pages?\s+(\d+)(?:[–\-]\d+)?\)/g, (_, n) => {
				const pdfPage = parseInt(n) + 11;
				return `<a class="page-ref" href="/pdf/rulebook.pdf#page=${pdfPage}" target="_blank" rel="noopener">(sayfa ${n})</a>`;
			})
			// Bullet maddeler: • ile başlayan satırlar
			.replace(/^•\s+(.+)$/gm, '<li>$1</li>')
			// <li> gruplarını <ul> içine al
			.replace(/(<li>[^]*?<\/li>\n?)+/g, '<ul>$&</ul>')
			// Paragraf ayırıcılar: \n\n → </p><p>
			.replace(/\n\n+/g, '</p><p>')
			// Kalan tek \n → <br> (kısa satırlar, sidebar artıkları)
			.replace(/\n/g, '<br>')
			// Sarma
			.replace(/^(?!<[uolp])/, '<p>')
			.replace(/(?<![>])$/, '</p>');
	}

	const html = $derived(renderText(text));
</script>

<div class="rb-text">{@html html}</div>

<style>
	.rb-text :global(p) {
		margin: 0.5em 0; color: var(--text-2); line-height: 1.75; font-size: 0.9rem;
	}
	.rb-text :global(p:first-child) { margin-top: 0; }
	.rb-text :global(p:last-child)  { margin-bottom: 0; }
	.rb-text :global(ul) { padding-left: 1.5em; margin: 0.5em 0; }
	.rb-text :global(li) {
		color: var(--text-2); font-size: 0.9rem; line-height: 1.6; margin-bottom: 0.25em;
	}
	.rb-text :global(.page-ref) {
		color: var(--accent); text-decoration: underline; font-size: 0.85rem;
	}
</style>
