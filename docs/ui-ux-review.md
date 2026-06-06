# UI/UX & Bilgi Mimarisi İncelemesi

> Çalışma belgesi · 2026-06-06 · planlama girdisi (henüz değişiklik yapılmadı)

## 1. Kapsam ve yöntem

İncelenen: `+layout.svelte` (nav/footer), `+page.svelte` (ana sayfa + arama),
`ui.ts` (TR/EN etiketler), `routes/{rules,docs,belgeler}/+page.svelte`,
`RulebookReader.svelte`, `oracles/[category]` ve `moves` etkileşim biçimi, route listesi (16 sayfa).

Henüz **derinlemesine bakılmadı**: `assets/oracles/npcs/truths/atlas` sayfalarının
iç düzeni, `basla` (onboarding) akışı, `kaynaklar` filtreleri, erişilebilirlik
(klavye/ARIA/odak), gerçek cihazda mobil his. Bunlar "açık sorular"da.

## 2. Bilgi mimarisi: 12 öğelik düz nav

Üst nav tek düz liste (sırayla): Başla · Kural Kitabı · Belgeler · Hamleler ·
Kehanetler · Yetenekler · Düşmanlar · Dünya · Kurallar · Bölgeler · PDF'ler · Kaynaklar.

Oysa içerik **üç farklı etkileşim moduna** ayrılıyor — ve nav bunu görünmez kılıyor:

| Mod | Etkileşim | Sayfalar |
|---|---|---|
| **Oku / Öğren** | sayfa-sayfa anlatı, TOC, kaydırma | Başla · Kural Kitabı · Belgeler |
| **Başvuru (data)** | listele / ara / drill-down / **zar at** | Hamleler · Kehanetler · Yetenekler · Düşmanlar · Kurallar · Dünya · Bölgeler |
| **Dosya / Dış** | indir / dış bağlantı | PDF'ler · Kaynaklar |

Kullanıcı, zar atılabilen interaktif **Kehanetler** ile okunacak **Kural Kitabı**'nı
nav'da aynı boyutta/biçimde görüyor; mod farkı iletilmiyor.

## 3. Tespit edilen sorunlar (öncelik sırası)

### P1 — "Kurallar" vs "Kural Kitabı" isim çakışması
`/rules` ("Kurallar") = datasworn stat/ölçer/debility/bond referansı (data).
`/kural-kitabi` ("Kural Kitabı") = sayfa-sayfa kitap okuyucu (anlatı).
İki etiket neredeyse aynı kelime, tamamen farklı şeyler. Nav'ı tarayan ayırt edemez.
**En kritik karışıklık.**

### P1 — "Belgeler" / "PDF'ler" / "Belgeler (PDF)" üçlü örtüşme
- `/belgeler` (nav: **Belgeler**) = rules-summary + world-workbook + playkit'in
  *çevrilmiş, sayfa-sayfa okuyucusu* (RulebookReader).
- `/docs` (nav: **PDF'ler**) = aynı belgelerin + rulebook'un *ham PDF indirme listesi*.
- Ana sayfa kartı `home_docs` = "**Belgeler (PDF)**" etiketiyle `/docs`'a gidiyor.

Aynı içerik, iki etkileşim modeli, üç ad. `/belgeler` okuyucusu zaten her belgenin
yazdırılabilir PDF'ine link veriyor → ayrı `/docs` üst-seviye öğesi büyük ölçüde tekrar.

### P2 — Ana sayfa kartları (9) ≠ nav (12)
Kartlar: rulebook, moves, oracles, assets, npcs, truths, rules, atlas, **docs**.
Kartlarda **Belgeler (okuyucu) ve Kaynaklar yok**; Başla yalnızca CTA olarak var.
Sonuç: ana sayfadan çevrilmiş belge okuyucusuna kartla ulaşılamıyor, yalnızca ham PDF'e.
Keşfedilebilirlik boşluğu + nav/kart envanteri tutarsız.

### P3 — Etiket/rozet tutarsızlıkları
- Bölge sayfası: nav "Bölgeler", arama rozeti "Atlas" (aynı şeye iki ad).
- Düşmanlar: nav "Düşmanlar" ama içerik OYK/NPC de kapsıyor (kart "Düşmanlar & OYK").
- "Yetenekler" (nav) vs "Yetenek Kartları" (kart/sözlük terimi) — kısaltma sapması.

### P3 — 12 düz öğe: taşma ve mobil yük
Masaüstünde nav `flex-wrap` ile iki satıra taşabiliyor; mobilde hamburger 12 satırlık
uzun bir liste. Gruplama yok.

## 4. Yüzey-yüzey kısa notlar

- **Ana sayfa / arama:** Tek kutudan tüm türler + kitap başlıkları aranıyor
  (`buildSearchIndex`), Türkçe-duyarlı (`normalize`), iki dilli, derin-linkli. Güçlü.
  Rozetler türü iyi ayırıyor. (Rozet adı ↔ nav adı tutarsızlığı hariç.)
- **Kural Kitabı / Belgeler (RulebookReader):** TOC kenar çubuğu, IntersectionObserver
  ile aktif-sayfa takibi, derin-link, gömülü diyagramlar, PdfRef. Olgun okuma deneyimi.
  İki ayrı route ama **aynı bileşen** — IA'da da birlikte anılmaları tutarlı olur.
- **Kehanetler:** Tablo başına "zar at" butonu, gerçek `1dN` atışı, sonucu gösterme.
  Projenin en interaktif yüzeyi — nav'da "data" yığınında kaybolmamalı.
- **Hamleler:** Kategori kartları → `/moves/{slug}` drill-down. Tutarlı kalıp.
- **Kurallar (/rules):** Stat/ölçer/debility/bond blokları + rules-summary PDF linki. Data.
- **PDF'ler (/docs):** Ham PDF kart listesi, çevrimdışı (🔒) / indir (☁) durumu. Yararlı
  ama "Belgeler" ile adı/işlevi çakışıyor (bkz. P1-örtüşme).
- **Kaynaklar:** Dış topluluk linkleri dizini. Tek gerçek "dış" öğe.

## 5. Açık sorular / incelenmeyenler

- `basla` onboarding akışının uzunluğu/yapısı (mod: oku) — nav'da Kural Kitabı'na yakın mı?
- Erişilebilirlik: nav klavye gezinmesi, okuyucu TOC butonlarının odak yönetimi,
  zar-at butonlarının ekran okuyucu duyurusu — hiç ölçülmedi.
- Mobilde RulebookReader TOC kenar çubuğu nasıl davranıyor (gizleniyor mu)?
- `truths` (Dünya) ile `atlas` (Bölgeler) kavramsal olarak "dünya" şemsiyesi altında
  birleştirilmeli mi, ayrı mı kalmalı?

## 6. Planlama için karar gerektiren yönler

1. **Nav gruplaması:** 12 düz → 3 mod (Oku / Başvuru / Dosya-Kaynak) görsel ayraçlarla?
   Yoksa düz kalsın, yalnızca çakışmalar mı çözülsün?
2. **"Kurallar" yeniden adlandırma:** "Statlar & Ölçerler" / "Oyun Kuralları" / başka?
3. **Belgeler ↔ PDF'ler birleştirme:** `/docs`'u okuyucuya "İndir" olarak göm, yoksa
   ayrı ama net adlarla mı bırak ("Belgeler" = oku, "İndirilebilir PDF'ler" = dosya)?
4. **Kart-nav hizalama:** Ana sayfa kartlarını nav envanteriyle eşitle (Belgeler/Kaynaklar
   kartı ekle) ve kartları da gruplara böl mü?
5. **Etiket tutarlılığı:** Atlas↔Bölgeler, Düşmanlar↔OYK, Yetenekler↔Yetenek Kartları
   tek kanona indir.
