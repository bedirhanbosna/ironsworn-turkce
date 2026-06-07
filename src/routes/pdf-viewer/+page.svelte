<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { page } from '$app/stores';

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

		await tick(); // DOM güncellemesinin tamamlanmasını bekle
		const pdfPage = await pdfDoc.getPage(pageNum);
		const dpr = window.devicePixelRatio || 1;
		const containerWidth = container.getBoundingClientRect().width || window.innerWidth;
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
			// disableRange/Stream: servis worker + Cloudflare proxy range request bozulmasını önler
			pdfDoc = await pdfjsLib.getDocument({ url: fileParam, disableRange: true, disableStream: true }).promise;
			totalPages = pdfDoc.numPages;
			const startPage = Math.min(Math.max(1, initialPage), totalPages);
			loading = false;
			await tick(); // canvas DOM'a gelsin
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
		min-height: calc(100dvh - 60px);
		background: var(--bg-1, #0f0f18);
		color: var(--text-1, #eee);
		border-radius: 10px;
		border: 1px solid var(--border, #2a2a3a);
		overflow: hidden;
		/* Nötr bir zeminde derin gölge */
		box-shadow:
			0 2px 8px rgba(0,0,0,0.4),
			0 0 0 1px rgba(255,255,255,0.03) inset;
	}

	/* ── Toolbar ── */
	.toolbar {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 0.9rem;
		background: var(--bg-2, #16161f);
		border-bottom: 1px solid var(--border, #2a2a3a);
		flex-shrink: 0;
	}

	.back-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.3rem;
		background: none;
		border: 1px solid color-mix(in srgb, var(--accent, #c9a84c) 40%, transparent);
		color: var(--accent, #c9a84c);
		border-radius: 6px;
		padding: 0.28rem 0.7rem;
		cursor: pointer;
		font-size: 0.8rem;
		font-family: var(--font-display, serif);
		letter-spacing: 0.04em;
		white-space: nowrap;
		transition: background 0.15s, border-color 0.15s;
	}
	.back-btn:hover {
		background: color-mix(in srgb, var(--accent, #c9a84c) 10%, transparent);
		border-color: var(--accent, #c9a84c);
	}

	.title {
		flex: 1;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-3, #666);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.page-info {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		flex-shrink: 0;
		background: var(--bg-3, #1e1e2a);
		border: 1px solid var(--border, #2a2a3a);
		border-radius: 6px;
		padding: 0.18rem 0.5rem;
	}

	.page-input {
		width: 2.8rem;
		background: none;
		border: none;
		color: var(--text-1, #eee);
		font-size: 0.82rem;
		text-align: center;
		outline: none;
	}
	.page-input::-webkit-inner-spin-button { opacity: 0; }

	.page-sep {
		font-size: 0.78rem;
		color: var(--text-3, #666);
	}

	/* ── PDF alanı ── */
	.pdf-container {
		flex: 1;
		overflow-y: auto;
		overflow-x: hidden;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 1.5rem 1rem;
		background:
			radial-gradient(ellipse 80% 60% at 50% 0%, color-mix(in srgb, var(--accent, #c9a84c) 4%, transparent), transparent),
			var(--bg-1, #0f0f18);
		-webkit-overflow-scrolling: touch;
	}

	.pdf-canvas {
		display: block;
		max-width: 100%;
		border-radius: 4px;
		box-shadow:
			0 4px 24px rgba(0,0,0,0.6),
			0 1px 0 rgba(255,255,255,0.06) inset,
			0 0 0 1px rgba(0,0,0,0.4);
	}

	.state-msg {
		align-self: center;
		padding: 3rem 2rem;
		color: var(--text-3, #666);
		font-size: 0.95rem;
		text-align: center;
		line-height: 1.6;
	}
	.state-msg.error { color: #c97070; }

	/* ── Alt navigasyon ── */
	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.55rem 0.9rem;
		background: var(--bg-2, #16161f);
		border-top: 1px solid var(--border, #2a2a3a);
		flex-shrink: 0;
		gap: 0.5rem;
	}

	.nav-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
		background: var(--bg-3, #1e1e2a);
		border: 1px solid var(--border, #2a2a3a);
		color: var(--text-2, #ccc);
		border-radius: 6px;
		padding: 0.4rem 1rem;
		cursor: pointer;
		font-size: 0.85rem;
		min-width: 84px;
		justify-content: center;
		touch-action: manipulation;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
	}
	.nav-btn:disabled { opacity: 0.28; cursor: default; }
	.nav-btn:not(:disabled):hover {
		border-color: var(--accent, #c9a84c);
		color: var(--accent, #c9a84c);
	}
	.nav-btn:not(:disabled):active { background: var(--bg-1, #0f0f18); }

	.nav-label {
		font-size: 0.78rem;
		color: var(--text-3, #666);
		letter-spacing: 0.06em;
		text-align: center;
	}

	/* Mobil: küçük padding */
	@media (max-width: 600px) {
		.pdf-container { padding: 0.75rem 0.4rem; }
		.nav-btn { min-width: 70px; padding: 0.4rem 0.6rem; font-size: 0.8rem; }
	}
</style>
