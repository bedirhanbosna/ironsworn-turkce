<script lang="ts">
	import { goto } from '$app/navigation';

	interface Props {
		text: string;
		inline?: boolean;
	}

	let { text, inline = false }: Props = $props();

	// GFM tablolarını <table> HTML'e çevir (başlık + |---| ayraç + satırlar)
	function tableize(raw: string): string {
		const lines = raw.split('\n');
		const out: string[] = [];
		let i = 0;
		const isSep = (s: string) => /^\s*\|?\s*:?-{2,}.*\|/.test(s) && /-/.test(s);
		while (i < lines.length) {
			if (lines[i].includes('|') && i + 1 < lines.length && isSep(lines[i + 1])) {
				const cells = (s: string) => s.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
				const head = cells(lines[i]);
				let j = i + 2;
				const rows: string[][] = [];
				while (j < lines.length && lines[j].includes('|') && lines[j].trim().startsWith('|')) {
					rows.push(cells(lines[j])); j++;
				}
				const th = head.map((c) => `<th>${c}</th>`).join('');
				const body = rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('');
				out.push(`<table><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>`);
				i = j;
			} else {
				out.push(lines[i]); i++;
			}
		}
		return out.join('\n');
	}

	function parseMarkdown(raw: string): string {
		return tableize(raw)
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
			// Başlıklar ( ### / ## )
			.replace(/^###\s+(.+)$/gm, '<h5>$1</h5>')
			.replace(/^##\s+(.+)$/gm, '<h4>$1</h4>')
			// Bullet listeleri ( - veya * satır başında )
			.replace(/^\s*[-*]\s+(.+)$/gm, '<li>$1</li>')
			.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
			// Italic *text* ve _text_
			.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
			.replace(/(?<![_])_([^_]+)_(?![_])/g, '<em>$1</em>')
			// Paragraflar
			.replace(/\n\n+/g, '</p><p>')
			.replace(/^(?!<(?:table|[uolph]))/, '<p>')
			.replace(/(?<![>])$/, '</p>')
			// Blok öğeleri yanlış <p> sarmasından kurtar
			.replace(/<p>(<(?:h4|h5|ul|ol|table)>)/g, '$1')
			.replace(/(<\/(?:h4|h5|ul|ol|table)>)<\/p>/g, '$1')
			.replace(/<p><\/p>/g, '');
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
			// koleksiyon (kategori) linkleri → ilgili kategori sayfasına
			case 'collections': {
				const sub = parts[1];
				const slug = parts[2];
				switch (sub) {
					case 'moves':   return slug ? `/moves/${slug}` : '/moves';
					case 'oracles': return slug ? `/oracles/${slug}` : '/oracles';
					case 'assets':  return slug ? `/assets/${slug}` : '/assets';
					case 'npcs':    return '/npcs';
					case 'atlas':   return '/atlas';
					default:        return '/';
				}
			}
			// delve içeriği bu uygulamada yok → en yakın yüzeye yönlendir
			case 'delve':   return '/moves';
			default:        return '/';
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
	.isl-md :global(h4) { font-family: var(--font-display); font-size: 1.02rem; color: var(--accent); margin: 0.9em 0 0.35em; }
	.isl-md :global(h5) { font-size: 0.9rem; color: var(--text-1); margin: 0.7em 0 0.3em; text-transform: uppercase; letter-spacing: 0.04em; }
	.isl-md :global(h4):first-child, .isl-md :global(h5):first-child { margin-top: 0; }
	.isl-md :global(table) { width: 100%; border-collapse: collapse; font-size: 0.85rem; margin: 0.5em 0; }
	.isl-md :global(th), .isl-md :global(td) { border: 1px solid var(--border); padding: 0.25rem 0.5rem; text-align: left; }
	.isl-md :global(th) { background: var(--bg-3); color: var(--text-1); font-weight: 600; }
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
