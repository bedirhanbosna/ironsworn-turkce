// Dil durumu — TR varsayılan, localStorage'da kalıcı
type Lang = 'tr' | 'en';

function createLangStore() {
	let lang = $state<Lang>('tr');

	function init() {
		if (typeof localStorage !== 'undefined') {
			const saved = localStorage.getItem('ironsworn-lang');
			if (saved === 'en' || saved === 'tr') lang = saved;
		}
	}

	function set(l: Lang) {
		lang = l;
		if (typeof localStorage !== 'undefined') localStorage.setItem('ironsworn-lang', l);
	}

	function toggle() {
		set(lang === 'tr' ? 'en' : 'tr');
	}

	return {
		get current() { return lang; },
		init,
		set,
		toggle
	};
}

export const langStore = createLangStore();
