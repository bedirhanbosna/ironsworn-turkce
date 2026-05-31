import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.ico', 'icons/*.png'],
			manifest: {
				name: 'Ironsworn Türkçe Referans',
				short_name: 'Ironsworn TR',
				description: 'Ironsworn TTRPG Türkçe referans uygulaması',
				theme_color: '#1a1a2e',
				background_color: '#1a1a2e',
				display: 'standalone',
				icons: [
					{ src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
					{ src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' }
				]
			},
			workbox: {
				// PDF'ler precache'e DAHİL DEĞİL (40MB Rulebook'u şişirmesin); açılınca runtime cache'lenir.
				globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
				runtimeCaching: [
					{
						urlPattern: /\.json$/,
						handler: 'CacheFirst',
						options: { cacheName: 'ironsworn-data', expiration: { maxEntries: 20 } }
					},
					{
						urlPattern: /\.pdf$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'pdf-cache',
							expiration: { maxEntries: 5 },
							// Büyük PDF'lerin (Rulebook ~40MB) önbelleğe alınabilmesi için sınırı yükselt.
							cacheableResponse: { statuses: [0, 200] }
						}
					}
				]
			}
		})
	]
});
