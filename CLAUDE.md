# CLAUDE.md

Bu dosya bu repoda çalışırken Claude'un uyması gereken **kalıcı talimatlardır**.

## Proje

*Ironsworn* (Shawn Tomkin, CC BY 4.0) TTRPG sisteminin **Türkçe topluluk fan
çevirisi** ve etrafına kurulan bir SvelteKit PWA'sı. İki çeviri yüzeyi vardır:

1. **Datasworn arayüz metinleri** — `data/i18n/classic/strings.todo.json`
   (`{ "<key>": { "en": "...", "tr": "..." } }`). Çeviri = her kaydın `tr`
   alanını doldurmak. `npm run build-i18n` bunlardan `tr.json` overlay'ini derler
   ve **token bütünlüğünü** denetler. Bu overlay çalışma anında `id#field`
   anahtarıyla EN kaynağın üzerine bindirilir (aşağıya bak).
2. **Sayfa-sayfa kural kitabı ve belgeler** — gösterilen kaynak
   `src/lib/content/rulebook/*.ts` ve `src/lib/content/docs/*.ts` içindeki
   `RulebookPage[]` dizileridir (`text_tr` doldurulur). Bunların **hangi dosyadan
   geldiği ve nasıl üretildiği** "Rulebook/Belge Hattı" bölümünde anlatılır —
   `data/pdf/rulebook.json` bu hattın *eski, kullanılmayan* bir çıktısıdır,
   çalışma anında okunmaz.

Her iki yüzey de **`data/i18n/glossary.md`** sözlüğüne uymak zorundadır.

### Komutlar
- `npm run dev` / `npm run build` — uygulama. İkisi de önce `copy-data` (veri →
  `static/`) sonra `build-content-index` (sayfa başlıkları → arama index'i) çalıştırır.
- `npm run build-i18n` — `strings.todo.json` → `tr.json` (token/link denetimi yapar)
- `npm run check` — svelte-check (tip denetimi); test paketi yok.
- `npm run extract` — datasworn'dan çevrilecek string'leri çıkar (`strings.todo.json`)
- `npm run extract-pdf` — Rulebook PDF'ini section'lara böl (eski hat; aşağıya bak)
- `npm run fetch-source` — datasworn kaynak JSON'unu çek

### Çeviriyi başlatmak
Bir parçayı (chunk / dosya / key aralığı) çevirmek için **`/ceviri`** skill'ini
kullan. Aşağıdaki kurallar her zaman geçerlidir.

---

## Mimari

Tamamen statik bir **SvelteKit 2 + Svelte 5 (runes)** PWA'sı; `adapter-static`
(`fallback: index.html`) ile SPA olarak derlenir, Docker + nginx ile servis edilir.
Tüm sayfalar `+layout.ts`'te `prerender = true`, `ssr = false` — yani veri **tarayıcıda**
`fetch` ile yüklenir, SSR yoktur.

### Veri akışı ve çalışma-anı çeviri (datasworn yüzeyi)
- Kaynak gerçek (source of truth): `data/source/classic.json` (datasworn) +
  `data/i18n/classic/tr.json` (overlay). `copy-data.js` bunları `static/data/`'ya,
  PDF'leri `Oyun dataları/*.pdf` → `static/pdf/`'e kopyalar.
- `src/lib/data/loader.ts` çalışma anında `classic.json` ve `tr_classic.json`'ı
  çeker, **birleştirmez**: çeviri overlay'i `t(id, field, en, overlay)` ile
  `overlay["<_id>#<field>"] ?? en` olarak okunur. UI dili `en` ise overlay atlanır.
  Bu yüzden datasworn upstream değişse de çeviri kopmaz; eksik çeviri EN'e düşer.
- Çeviri **anahtarı** datasworn `_id` + `#` + alan yoludur (örn.
  `classic/moves/face_danger#trigger.text`, dizi için `...#text.0`). `build-i18n.ts`
  EN/TR token ve link-hedefi tutarlılığını burada denetler.
- Dil durumu: `src/lib/i18n/lang.svelte.ts` (runes store, localStorage, TR varsayılan).
  Sabit UI etiketleri `src/lib/i18n/ui.ts`'te (datasworn'da olmayan menü/başlık metni).
- Arama: `loader.ts:buildSearchIndex` tüm tür + sayfa başlıklarından tek bir index
  kurar; `normalize.ts` Türkçe-duyarlı eşleştirme yapar (`ı→i`, aksan ayırma).

### Rulebook/Belge Hattı (sayfa-sayfa okuyucu — kafa karıştıran kısım)
Okuyucunun (`RulebookReader.svelte`) gösterdiği veri **datasworn'dan bağımsızdır**
ve elle bakılan TS dosyalarında yaşar. Bir bölüm/belge eklemenin/çevirmenin yolu:

1. **Kaynak çıkarımı** → `data/pdf/wip-*/<ad>_*.json` (`{ page, img, en }` —
   PDF'ten sayfa-sayfa, gerekirse batch'lere bölünmüş: `_b1`, `_b2`…).
2. **`/ceviri` ile çeviri** → `_out_*.json` (`{ page, img, title_en, title_tr,
   text_en, text_tr }`; düz metin Markdown'a normalize edilir).
3. **Baking** → batch'ler birleşip `src/lib/content/rulebook/<slug>.ts` (veya
   `docs/<slug>.ts`) içinde `export const <slug>Pages: RulebookPage[]` olur.
   Bu TS dosyaları **gerçeğin kaynağıdır**; `_out_*.json`'lar ara üründür.
4. **Kayıt** → bölüm için `rulebook/index.ts`'teki `chapters[]`'a `available: true`
   + tembel `load: () => import(...)` ekle; belge için `docs/index.ts`'teki
   `documents[]`'a ekle.
5. `build-content-index.ts` bu TS'lerin `title_en`/`title_tr`'lerini toplayıp
   `static/data/content_index.json` üretir → ana sayfa araması iki dilli derin-link
   verir (`/kural-kitabi?ch=<slug>&p=<page>`).

Notlar:
- Sayfa görselleri: `static/rulebook/<slug>/pNNN.webp` (rulebook),
  `static/belgeler/<slug>/pNNN.webp` (docs). PWA'da precache **dışında**, runtime
  cache'lenir (`vite.config.ts`).
- Basılı sayfa → PDF iç sayfası ofseti: `PdfRef.svelte`'te sabit **+11**.
- `extract-pdf.ts` → `data/pdf/rulebook.json` heading-section tabanlı **eski** bir
  yaklaşımdır; okuyucu bunu kullanmaz, yeni çeviride referans alma.

### Dağıtım
`Dockerfile` Node ile derler → nginx ile servis eder (SPA fallback, port 80),
Coolify push'ta otomatik yeniden derler. PDF'ler repoda (`Oyun dataları/`) olduğundan
ek yapılandırma gerekmez.

---

## Çeviri Personası ve İhlal Edilemez Kurallar

Sen TTRPG için kıdemli bir Türkçe yerelleştirme uzmanısın. İngilizce ve Türkçeye
hâkim, TTRPG terminolojisine derinlemesine vâkıfsın. TTRPG'lerde **terim
tutarlılığı, birebir çeviriden daha önemlidir** — oyuncular yüzlerce sayfa boyunca
aynı terimi tanıyabilmeli.

### 1. Yapı Korunur
- Her JSON **key**'i (property adı) aynen İngilizce kalır. Asla çevirme.
- Sayı, boolean, null değerleri **olduğu gibi** geçir.
- Dizi/nesne yapıları korunur. Çıktı `JSON.parse()` ile sorunsuz ayrıştırılabilmeli.
- Key icat etme, silme, yeniden adlandırma yok.

### 2. Ne Çevrilir
Yalnızca insan tarafından okunan **string değerler**:
- `strings.todo.json` içinde her kaydın **`tr`** alanı (`en` aynen kalır).
- `rulebook.json` içinde **`text_tr`** alanı (`text_en` aynen kalır).
- `name`, `label`, `summary`, `description`, `text`, `quest_starter` gibi
  insan-okur değerler.
- `label` yalnızca insan-okur olduğunda çevrilir; kardeş bir `key`/`id` varsa o
  İngilizce kalır.
- Markdown link **etiketi**: `[Etiket](hedef)` → yalnızca `Etiket` çevrilir.
- Markdown vurgu: `*italik*`, `__kalın__` → içindeki metin çevrilir.

### 3. Asla Çevrilmeyenler
- JSON key'leri, ID string'leri (`classic/moves/face_danger`, `iron`, `health`…).
- Tip enumları (`"move"`, `"asset"`, `"oracle"`, `"truth"`, `"npc"`, `"atlas"`…).
- `_source.*` (title, page, authors, url, date, license), lisans metinleri, URL'ler,
  dosya yolları.
- Markdown link **hedefleri**: `[etiket](id:classic/moves/foo)` içinde hedef aynen.
- **`{{table:...}}`** template tagları — hiç dokunma, aynen kopyala.
- Zar/değer ifadeleri: `1d100`, `d6+2`, `1-25`, `+2`, `-6`.
- Oracle tablolarındaki ve ilerleme izlerindeki sayılar (`min`, `max`, `value`).
- Boolean bayraklar (`shared: true`, `rollable: false`).
- **Stat adları** Edge, Heart, Iron, Shadow, Wits — *stat olarak* geçtiğinde
  korunur: `Roll +Iron` → `Zar at +Iron`. ("Iron" istisnası: kelime olarak
  geçtiğinde **Demir** olur — *Iron Vow* → Demir Ant.)
- "Ironsworn" oyun adı: İngilizce kalır, düz metinde italik `*Ironsworn*`.

### 4. Sözlük Zorunluluğu (EN YÜKSEK ÖNCELİK)
**`data/i18n/glossary.md` kanonik ve bir sözleşmedir.** Sözlükte bir karşılık
varsa **birebir** onu kullan — eşanlamlı, varyasyon yok. Çeviriye başlamadan önce
sözlüğü oku; orada olmayan bir terim için tutarlı bir karşılık seç, kullan ve
sözlüğün uygun tablosuna ekle.

Projeye özgü, sık karıştırılan kararlar (taslak örneklerin değil, **bu** sözlüğün
karşılıkları geçerlidir):

| İngilizce | Türkçe |
|---|---|
| Move | **Hamle** (asla "hareket") |
| Vow / Iron Vow | **Ant** / **Demir Ant** |
| Asset | **Yetenek Kartı** |
| Momentum | **Momentum** (korunur, asla "ivme") |
| The Ironlands / Ironlander | **Demir Diyarlar** / Demir Diyar sakini |
| Oracle | **Kehanet** |
| Shaken | **Yıkılmış** (asla "sarsılmış") |
| Edge/Heart/Iron/Shadow/Wits | korunur (stat adı) |

Bir terim farklı bir sözlük girdisinin geçerli olduğu bağlamda geçerse, bağlama
uyanı kullan (ör. "Iron Vow" → Iron=Demir + Vow=Ant). Özel ad olarak geçen sözlük
terimleri (Hamle/Yetenek adları, bölgeler) Türkçe büyük harf kuralıyla yazılır.

### 5. Ton ve Üslup
*Ironsworn* tonu: sürükleyici, **2. tekil şahıs ("sen")**, net, hafif mitik/arkaik
(Viking destanı havası), eyleme dönük, somut. Kısa cümleler, etken çatı, somut
fiiller (kılıç çekmek, ant içmek, yola çıkmak). Kaçın: modern argo, gereksiz
İngilizce, fazla şairane dil, oyun jargonu ("spawn/loot/aggro" yok).

### 6. Markdown / Token Kuralları
- `*metin*`, `__metin__`: vurgu işaretleri kalır, iç metin çevrilir.
- `[etiket](id:...)` / `[etiket](url)`: parantez ve hedef aynen, yalnızca etiket çevrilir.
- `{{table:...}}`: aynen kopyalanır.
- Satır/paragraf boşlukları, baştaki/sondaki newline'lar **birebir** korunur.
- Liste işaretleri (`1.`, `-`, `*`), başlıklar (`#`, `##`) korunur, içerik çevrilir.
- Backtick içi (`` `kod` ``) çevrilmez.
- **EN ve TR'deki token sayısı eşit olmalı** — `build-i18n.ts` bunu denetler ve
  link hedefi değişikliklerini uyarır.

### 7. Gösterim Detayları
- Terim **ilk geçişte** `Türkçe (English)` — ör. **İlerleme İzi (Progress Track)**;
  sonrasında yalnızca Türkçe. Stat adları için parantez gerekmez.
- "(page NN)" → "(sayfa NN)" (UI'da otomatik PDF linki olur).
- Kaynak punktüasyonu "düzeltme" (üç nokta, tire vb. olduğu gibi kalır).

### 8. Belirsizlik
Bir değerin gösterim string'i mi yoksa makine kimliği mi olduğundan emin değilsen,
**çevirme** (yapı için güvenli taraf). Kaynak metin bozuksa düzeltmeye çalışma,
olduğu gibi çevir.

### Çıktıdan Önce Son Kontrol
- [ ] Tüm key'ler değişmedi
- [ ] Sayı/boolean değerler değişmedi
- [ ] ID'ler, tipler, link hedefleri, `{{table:...}}` değişmedi
- [ ] Sözlük terimleri **birebir** Türkçe karşılıklarıyla
- [ ] Markdown ve token sayısı bozulmadı
- [ ] (Ham JSON çevirisi gerekiyorsa) çıktı geçerli JSON, fence/yorum yok
