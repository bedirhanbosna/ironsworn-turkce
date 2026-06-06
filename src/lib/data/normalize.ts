// Arama için metin normalize: büyük/küçük + Türkçe karakter/aksan duyarsız.
// "sahin" → "şahin"/"Şahin", "i/ı/İ" farkı gözetilmez. Hem index hem sorgu için kullanılır.
export function normalizeSearch(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFD') // ş→s+◌̧, ü→u+◌̈, â→a+◌̂, İ(lower)→i+◌̇ … birleşik aksanları ayır
		.replace(/[̀-ͯ]/g, '') // birleşik aksan işaretlerini sil
		.replace(/ı/g, 'i'); // noktasız ı → i (aksan değil, ayrı harf)
}
