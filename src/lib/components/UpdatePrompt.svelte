<script lang="ts">
	import { onMount } from 'svelte';
	import { useRegisterSW } from 'virtual:pwa-register/svelte';

	const { needRefresh, updateServiceWorker } = useRegisterSW();

	onMount(() => {
		// Yeni SW kontrolü devralınca sayfayı otomatik yenile — kullanıcı etkileşimi gerektirmez
		navigator.serviceWorker?.addEventListener('controllerchange', () => {
			window.location.reload();
		});
	});
</script>

{#if $needRefresh}
	<div class="update-banner" role="status" aria-live="polite">
		<span class="update-text">Yeni sürüm hazır.</span>
		<button class="btn-refresh" onclick={() => updateServiceWorker(true)}>
			Yenile
		</button>
		<button class="btn-dismiss" onclick={() => $needRefresh = false} aria-label="Kapat">
			✕
		</button>
	</div>
{/if}

<style>
	.update-banner {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.65rem 1rem;
		background: var(--bg-2, #1c1c2e);
		border: 1px solid var(--accent, #c9a84c);
		border-radius: 10px;
		box-shadow: 0 4px 24px rgba(0, 0, 0, 0.5);
		font-size: 0.875rem;
		color: var(--text-1, #eee);
		white-space: nowrap;
		animation: slide-up 0.2s ease;
	}

	@keyframes slide-up {
		from { opacity: 0; transform: translateX(-50%) translateY(8px); }
		to   { opacity: 1; transform: translateX(-50%) translateY(0); }
	}

	.update-text {
		color: var(--text-2, #ccc);
	}

	.btn-refresh {
		padding: 0.3rem 0.8rem;
		background: var(--accent, #c9a84c);
		color: #111;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 0.85rem;
		font-weight: 600;
		transition: opacity 0.15s;
	}
	.btn-refresh:hover { opacity: 0.85; }

	.btn-dismiss {
		background: none;
		border: none;
		color: var(--text-3, #888);
		cursor: pointer;
		font-size: 0.9rem;
		padding: 0.15rem 0.25rem;
		line-height: 1;
	}
	.btn-dismiss:hover { color: var(--text-1, #eee); }
</style>
