import { describe, it, expect } from 'vitest';
import { validateEntry } from './i18n-validate.js';

describe('validateEntry', () => {
	it('düz metin doğru çeviride uyarı vermez', () => {
		expect(validateEntry('k', 'Swear an iron vow.', 'Bir demir ant iç.')).toEqual([]);
	});

	it('token içermeyen metni geçirir', () => {
		expect(validateEntry('k', '', '')).toEqual([]);
		expect(validateEntry('k', 'Roll +Iron', 'Zar at +Iron')).toEqual([]);
	});

	describe('token sayısı', () => {
		it('link etiketi çevrilip hedef korununca uyarı yok', () => {
			const en = 'See [Face Danger](id:classic/moves/face_danger).';
			const tr = 'Bkz. [Tehlikeyle Yüzleş](id:classic/moves/face_danger).';
			expect(validateEntry('k', en, tr)).toEqual([]);
		});

		it('link düşürülünce hem token sayısı hem hedef uyarısı verir', () => {
			const en = 'Use [Secure an Advantage](id:classic/moves/secure_an_advantage).';
			const tr = 'Avantaj sağla.'; // link tümden düşürülmüş
			const w = validateEntry('k', en, tr);
			expect(w).toHaveLength(2);
			expect(w[0]).toBe('TOKEN MISMATCH [k]: EN=1 TR=0');
			expect(w[1]).toBe(
				'LINK TARGET MISSING [k]: "id:classic/moves/secure_an_advantage" (EN\'de 1, TR\'de 0)'
			);
		});

		it('bold (__...__) token sayısını dener', () => {
			expect(validateEntry('k', '__Momentum__', 'Momentum')).toEqual([
				'TOKEN MISMATCH [k]: EN=1 TR=0'
			]);
			expect(validateEntry('k', '__Momentum__', '__Momentum__')).toEqual([]);
		});

		it('{{table:...}} template tag\'ını token sayar', () => {
			const en = 'Roll {{table:classic/oracles/action}}.';
			expect(validateEntry('k', en, 'Zar at.')).toEqual([
				'TOKEN MISMATCH [k]: EN=1 TR=0'
			]);
			expect(validateEntry('k', en, '{{table:classic/oracles/action}} at.')).toEqual([]);
		});
	});

	describe('link hedefi', () => {
		it('hedef değişince hem MISSING hem ADDED verir', () => {
			const en = '[Face Danger](id:classic/moves/face_danger)';
			const tr = '[Tehlikeyle Yüzleş](id:classic/moves/tehlike)'; // hedef bozulmuş
			const w = validateEntry('k', en, tr);
			expect(w).toHaveLength(2);
			expect(w).toContain('LINK TARGET MISSING [k]: "id:classic/moves/face_danger" (EN\'de 1, TR\'de 0)');
			expect(w).toContain('LINK TARGET ADDED [k]: "id:classic/moves/tehlike" (EN\'de 0, TR\'de 1)');
		});

		it('hedef yeniden sıralanınca uyarı vermez (Türkçe söz dizimi)', () => {
			const en = '[a](id:x) ve [b](id:y)';
			const tr = '[b](id:y), [a](id:x)'; // etiket→hedef doğru, yalnızca sıra değişti
			expect(validateEntry('k', en, tr)).toEqual([]);
		});

		it('TR\'de hedef düşünce MISSING raporlar', () => {
			// Aynı token sayısı (bold ile denk) ama link hedefi yok
			const en = '[etiket](id:x)';
			const tr = '__etiket__';
			const w = validateEntry('k', en, tr);
			expect(w).toEqual(['LINK TARGET MISSING [k]: "id:x" (EN\'de 1, TR\'de 0)']);
		});
	});
});
