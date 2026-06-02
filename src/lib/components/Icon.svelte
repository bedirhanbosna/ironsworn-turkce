<script lang="ts">
	import { iconPaths, type IconName } from '$lib/icons.js';
	let { name, size = 20, class: cls = '' }: { name: IconName; size?: number; class?: string } = $props();
</script>

<svg viewBox="0 0 512 512" width={size} height={size} class="gi {cls}" fill="currentColor" aria-hidden="true">
	<path d={iconPaths[name]} />
</svg>
