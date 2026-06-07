<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let canvas = $state<HTMLCanvasElement | null>(null);
	let container = $state<HTMLDivElement | null>(null);
	let currentPage = $state(1);
	let totalPages = $state(0);
	let loading = $state(true);
	let errorMsg = $state('');
	let pageInput = $state('1');

	let pdfDoc: any = null;
	let renderTask: any = null;
	let rendering = false;

	const fileParam = $page.url.searchParams.get('file') || '/pdf/rulebook.pdf';
	const initialPage = parseInt($page.url.searchParams.get('page') || '1', 10);

	async function renderPage(pageNum: number) {
		if (!pdfDoc || !canvas || !container) return;
		if (rendering) {
			try { renderTask?.cancel(); } catch {}
		}
		rendering = true;

		const pdfPage = await pdfDoc.getPage(pageNum);
		const dpr = window.devicePixelRatio || 1;
		const containerWidth = container.clientWidth;
		const baseViewport = pdfPage.getViewport({ scale: 1 });
		const scale = (containerWidth / baseViewport.width) * dpr;
		const viewport = pdfPage.getViewport({ scale });

		canvas.width = viewport.width;
		canvas.height = viewport.height;
		canvas.style.width = `${viewport.width / dpr}px`;
		canvas.style.height = `${viewport.height / dpr}px`;

		const ctx = canvas.getContext('2d')!;
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		renderTask = pdfPage.render({ canvasContext: ctx, viewport });
		try {
			await renderTask.promise;
		} catch (e: any) {
			if (e?.name !== 'RenderingCancelledException') {
				errorMsg = 'Sayfa render edilemedi.';
			}
		}
		rendering = false;
	}

	async function goToPage(num: number) {
		const clamped = Math.min(Math.max(1, num), totalPages);
		currentPage = clamped;
		pageInput = String(clamped);
		await renderPage(clamped);
		container?.scrollTo({ top: 0, behavior: 'instant' });
	}

	function handlePageInput(e: Event) {
		const val = parseInt((e.target as HTMLInputElement).value, 10);
		if (!isNaN(val)) goToPage(val);
	}

	function handleKey(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goToPage(currentPage + 1);
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goToPage(currentPage - 1);
	}

	onMount(async () => {
		const pdfjsLib = await import('pdfjs-dist');
		const workerUrl = await import('pdfjs-dist/build/pdf.worker.mjs?url');
		pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.default;

		try {
			pdfDoc = await pdfjsLib.getDocument({ url: fileParam }).promise;
			totalPages = pdfDoc.numPages;
			const startPage = Math.min(Math.max(1, initialPage), totalPages);
			loading = false;
			await goToPage(startPage);
		} catch (e) {
			console.error('[pdf-viewer] getDocument failed:', e);
			errorMsg = 'PDF yüklenemedi. Dosya mevcut değil ya da erişilemiyor.';
			loading = false;
		}
	});
</script>

<svelte:window on:keydown={handleKey} />

<div class="viewer-shell">
	<!-- Üst bar -->
	<header class="toolbar">
		<button class="back-btn" onclick={() => history.back()} aria-label="Geri dön">
			← Geri
		</button>
		<span class="title" title={fileParam}>{fileParam.split('/').pop()}</span>
		{#if totalPages > 0}
			<span class="page-info">
				<input
					type="number"
					class="page-input"
					min="1"
					max={totalPages}
					value={pageInput}
					onchange={handlePageInput}
					aria-label="Sayfa numarası"
				/>
				<span class="page-sep">/ {totalPages}</span>
			</span>
		{/if}
	</header>

	<!-- İçerik -->
	<div class="pdf-container" bind:this={container}>
		{#if loading}
			<div class="state-msg">PDF yükleniyor…</div>
		{:else if errorMsg}
			<div class="state-msg error">{errorMsg}</div>
		{:else}
			<canvas bind:this={canvas} class="pdf-canvas"></canvas>
		{/if}
	</div>

	<!-- Alt navigasyon -->
	{#if totalPages > 0}
		<nav class="nav-bar">
			<button
				class="nav-btn"
				disabled={currentPage <= 1}
				onclick={() => goToPage(currentPage - 1)}
				aria-label="Önceki sayfa"
			>
				‹ Önceki
			</button>
			<span class="nav-label">Sayfa {currentPage} / {totalPages}</span>
			<button
				class="nav-btn"
				disabled={currentPage >= totalPages}
				onclick={() => goToPage(currentPage + 1)}
				aria-label="Sonraki sayfa"
			>
				Sonraki ›
			</button>
		</nav>
	{/if}
</div>

<style>
	.viewer-shell {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		background: #111;
		color: #eee;
		overflow: hidden;
	}

	/* Üst araç çubuğu */
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: #1c1c1c;
		border-bottom: 1px solid #333;
		flex-shrink: 0;
		min-height: 48px;
	}

	.back-btn {
		background: none;
		border: 1px solid #444;
		color: var(--accent, #c9a84c);
		border-radius: 6px;
		padding: 0.25rem 0.6rem;
		cursor: pointer;
		font-size: 0.85rem;
		white-space: nowrap;
	}
	.back-btn:hover { border-color: var(--accent, #c9a84c); }

	.title {
		flex: 1;
		font-size: 0.8rem;
		color: #888;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.page-info {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
	}

	.page-input {
		width: 3.5rem;
		padding: 0.2rem 0.3rem;
		background: #2a2a2a;
		border: 1px solid #444;
		border-radius: 4px;
		color: #eee;
		font-size: 0.85rem;
		text-align: center;
	}
	.page-input::-webkit-inner-spin-button { opacity: 0; }

	.page-sep { font-size: 0.8rem; color: #888; }

	/* PDF alanı */
	.pdf-container {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		background: #222;
		-webkit-overflow-scrolling: touch;
	}

	.pdf-canvas {
		display: block;
		max-width: 100%;
		background: #fff;
	}

	.state-msg {
		align-self: center;
		padding: 2rem;
		color: #aaa;
		font-size: 1rem;
	}
	.state-msg.error { color: #e07070; }

	/* Alt navigasyon */
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.5rem 1rem;
		background: #1c1c1c;
		border-top: 1px solid #333;
		flex-shrink: 0;
		min-height: 52px;
	}

	.nav-btn {
		background: #2a2a2a;
		border: 1px solid #444;
		color: #eee;
		border-radius: 6px;
		padding: 0.4rem 1rem;
		cursor: pointer;
		font-size: 0.9rem;
		min-width: 90px;
		touch-action: manipulation;
	}
	.nav-btn:disabled { opacity: 0.35; cursor: default; }
	.nav-btn:not(:disabled):hover { border-color: var(--accent, #c9a84c); }
	.nav-btn:not(:disabled):active { background: #3a3a3a; }

	.nav-label {
		font-size: 0.85rem;
		color: #aaa;
	}
</style>
