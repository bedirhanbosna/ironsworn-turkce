import { defineConfig } from 'vitest/config';

// Ayrı config: uygulamanın vite.config.ts'ini (SvelteKit + PWA plugin) yüklemeden
// saf Node/TS yardımcı script'lerini test eder.
export default defineConfig({
	test: {
		include: ['scripts/**/*.test.ts'],
		environment: 'node'
	}
});
