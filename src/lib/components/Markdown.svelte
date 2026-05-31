<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		text: string;
		inline?: boolean;
	}

	let { text, inline = false }: Props = $props();

	function parseMarkdown(raw: string): string {
		return raw
			// datasworn id: linkleri → uygulama içi navigasyon
			.replace(/\[([^\]]+)\]\(id:([^)]+)\)/g, (_, label, id) => {
				const href = idToHref(id);
				return `<a class="isl-link" data-href="${href}">${label}</a>`;
			})
			// datasworn move: linkleri
			.replace(/\[([^\]]+)\]\(move:([^)]+)\)/g, (_, label, id) => {
				const href = idToHref(`move:${id}`);
				return `<a class="isl-link" data-href="${href}">${label}</a>`;
			})
			// Bold __text__
			.replace(/__([^_]+)__/g, '<strong>$1</strong>')
			// Italic _text_
			.replace(/(?<![_])_([^_]+)_(?![_])/g, '<em>$1</em>')
			// Bullet listeleri
			.replace(/^\s*\*\s+(.+)$/gm, '<li>$1</li>')
			.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
			// Paragraflar
			.replace(/\n\n+/g, '</p><p>')
			.replace(/^(?!<[uolp])/, '<p>')
			.replace(/(?<![>])$/, '</p>');
	}

	function idToHref(id: string): string {
		const clean = id.replace(/^(classic|move):/, '').replace(/^classic\//, '');
		const parts = clean.split('/');
		const type = parts[0];
		const anchor = parts[parts.length - 1];
		switch (type) {
			// /moves/[category]#<move>
			case 'moves':   return parts.length >= 3 ? `/moves/${parts[1]}#${anchor}` : '/moves';
			// /oracles/[category]#<table>
			case 'oracles': return parts.length >= 3 ? `/oracles/${parts[1]}#${anchor}` : '/oracles';
			// /assets/[type]#<asset>
			case 'assets':  return parts.length >= 3 ? `/assets/${parts[1]}#${anchor}` : '/assets';
			// tek sayfa, anchor ile
			case 'npcs':    return `/npcs#${anchor}`;
			case 'truths':  return `/truths#${anchor}`;
			case 'atlas':   return `/atlas#${anchor}`;
			case 'rules':   return '/rules';
			default:        return `/#${id}`;
		}
	}

	function handleClick(e: MouseEvent) {
		const t = e.target as HTMLElement;
		const link = t.closest<HTMLAnchorElement>('a[data-href]');
		if (link) {
			e.preventDefault();
			goto(link.dataset.href!);
		}
	}

	const html = $derived(parseMarkdown(text));
	const tag = inline ? 'span' : 'div';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<svelte:element
	this={tag}
	class="isl-md"
	onclick={handleClick}
>
	{@html html}
</svelte:element>

<style>
	.isl-md :global(ul) { padding-left: 1.4em; margin: 0.4em 0; }
	.isl-md :global(li) { margin-bottom: 0.2em; }
	.isl-md :global(p) { margin: 0.4em 0; }
	.isl-md :global(p:first-child) { margin-top: 0; }
	.isl-md :global(p:last-child) { margin-bottom: 0; }
	.isl-md :global(.isl-link) {
		color: var(--accent);
		text-decoration: underline;
		cursor: pointer;
	}
</style>
