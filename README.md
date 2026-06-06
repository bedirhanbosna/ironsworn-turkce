# Ironsworn — Türkçe Referans

*Ironsworn* (Shawn Tomkin) masaüstü rol yapma oyununun **Türkçe topluluk fan çevirisi** ve
etrafına kurulmuş, çevrimdışı çalışan bir **PWA** referans uygulaması. Hamleler, kehanetler,
yetenek kartları, düşmanlar, dünya gerçekleri ve kurallar — oyun masasında hızlı bakış için
tek yerde, Türkçe.

> Ironsworn © Shawn Tomkin, **CC BY 4.0**. Bu proje resmî değildir; bir hayran çalışmasıdır.

## ✦ Özellikler

- **Başla** — yeni oyuncular için sürükleyici başlangıç rehberi (oyun nasıl oynanır, Demir Ant, zar mekaniği, oyunun akışı).
- **Hamleler / Kehanetler / Yetenek Kartları / Düşmanlar / Dünya / Bölgeler / Kurallar** — datasworn verisinden Türkçe referans; arama, kategori gezinmesi, zar atılabilir kehanet tabloları.
- **PDF sayfa atıfları** — her kural öğesinde basılı kitap sayfasına (`📖 s.NN`) doğrudan bağlantı.
- **Kaynaklar** — `awesome-ironsworn` topluluğundan 150+ araç, üretici ve eklentinin derlenmiş, filtrelenebilir dizini.
- **TR/EN dil değiştirme**, çevrimdışı (PWA, service worker) ve mitik karanlık-fantezi arayüz (Cinzel + Spectral fontları).

## ✦ Çeviri Mimarisi

İki çeviri yüzeyi vardır; ikisi de **`data/i18n/glossary.md`** sözlüğüne uyar (terim tutarlılığı esastır):

1. **Datasworn arayüz metinleri** — `data/i18n/classic/strings.todo.json` (`{ "<key>": { "en", "tr" } }`).
   `npm run build-i18n` bunlardan `tr.json` overlay'ini derler ve **token/link bütünlüğünü** denetler.
2. **Sayfa-sayfa kural kitabı & belgeler** — `src/lib/content/rulebook/*.ts` ve
   `src/lib/content/docs/*.ts` içindeki `RulebookPage[]` dizileri (`text_tr` doldurulur).
   PDF'ten çıkarım → `/ceviri` → TS'e baking akışı için aşağıdaki **Uygulama Mimarisi**'ne bak.

Çeviri yaparken `data/i18n/glossary.md` kanoniktir; bir terimin karşılığı oradaysa birebir kullanılır.

> **Çeviri notu:** Çevirilerin büyük bölümü, glossary'ye bağlı kalınarak **büyük dil modeli (LLM)
> yardımıyla** üretilmiş ve gözden geçirilmiştir. Forklayıp kendi çevirini yapmak ya da katkıda
> bulunmak isteyenler için `data/i18n/glossary.md`, `CLAUDE.md` ve `.claude/skills/ceviri` çeviri
> personası/iş akışını içerir.

## ✦ Geliştirme

```sh
npm install
npm run dev        # geliştirme sunucusu (önce copy-data çalışır)
npm run build      # üretim derlemesi
npm run preview    # üretim derlemesini önizle
npm run check      # svelte-check (tip denetimi)
```

Yardımcı betikler:

```sh
npm run build-i18n   # strings.todo.json → tr.json (token/link denetimiyle)
npm run fetch-source # datasworn kaynak verisini çek
npm run extract      # çevrilecek string'leri çıkar
```

## ✦ Uygulama Mimarisi

Tamamen statik bir **SvelteKit 2 / Svelte 5 (runes)** PWA'sı. Tüm sayfalar
`prerender = true`, `ssr = false` — veri tarayıcıda `fetch` ile yüklenir.

**Çalışma-anı çeviri (datasworn yüzeyi).** Kaynak veri (`data/source/classic.json`) ve
çeviri overlay'i (`data/i18n/classic/tr.json`) ayrı tutulur ve **birleştirilmez**:
`src/lib/data/loader.ts`, `overlay["<datasworn _id>#<alan>"] ?? en` mantığıyla okur. Bu
sayede upstream datasworn güncellenince çeviri kopmaz, eksik çeviriler İngilizceye düşer.
`build-i18n.ts` bu anahtarlarda EN/TR token ve link-hedefi tutarlılığını denetler. Dil
durumu `lang.svelte.ts`'te (TR varsayılan, localStorage); sabit menü/başlık metni `ui.ts`'te.
Arama `normalize.ts` ile Türkçe-duyarlıdır (`ı→i`, aksan ayırma).

**Sayfa-sayfa okuyucu (kural kitabı & belgeler).** datasworn'dan bağımsızdır; gösterilen
veri elle bakılan TS dosyalarında yaşar. Akış:

1. PDF'ten sayfa-sayfa çıkarım → `data/pdf/wip-*/<ad>_*.json` (`{ page, img, en }`).
2. `/ceviri` ile çeviri → `_out_*.json` (`title_*`/`text_*`, Markdown'a normalize).
3. **Baking** → `src/lib/content/{rulebook,docs}/<slug>.ts` içinde `RulebookPage[]`
   (gerçeğin kaynağı burasıdır), `index.ts`'e `available: true` + tembel `load` ile kaydedilir.
4. `build-content-index.ts` başlıkları toplar → ana sayfada iki dilli, derin-linkli arama.

Sayfa görselleri `static/{rulebook,belgeler}/<slug>/pNNN.webp` (PWA'da runtime-cache).
`data/pdf/rulebook.json` ve `npm run extract-pdf` bu hattın **eski** bir sürümüdür; okuyucu
kullanmaz.

## ✦ Dağıtım (Coolify)

Uygulama `adapter-static` ile tamamen statiktir; depodaki **Dockerfile** (Node ile derler → nginx ile servis eder, SPA fallback) Coolify için hazırdır.

1. Coolify'da **New Resource → Application → Public/Private Repository**, bu depoyu seç.
2. Build Pack: **Dockerfile** (otomatik algılanır).
3. **Port: 80**, domaini bağla. Push'ta Coolify otomatik yeniden derler (Actions gerekmez).

Resmî PDF'ler (`Oyun dataları/`) depoda olduğundan derleme sırasında `copy-data` onları `static/pdf`'e kopyalar — ek yapılandırma gerekmez.

## ✦ Teknoloji

SvelteKit 2 · Svelte 5 · TypeScript · Vite · `@sveltejs/adapter-static` · `vite-plugin-pwa`. Docker + nginx ile dağıtım.

## ✦ Lisans ve Atıf

- **Ironsworn** © Shawn Tomkin — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- Oyun verisi: [datasworn](https://github.com/rsek/datasworn) (rsek)
- Kaynak dizini: [awesome-ironsworn](https://github.com/billiam/awesome-ironsworn)
- İkonlar: [game-icons.net](https://game-icons.net) — CC BY 3.0
- Fontlar: [Cinzel](https://fonts.google.com/specimen/Cinzel) & [Spectral](https://fonts.google.com/specimen/Spectral) — SIL Open Font License 1.1

Ayrıntılar için [LICENSE.md](LICENSE.md). Özetle: çeviri/içerik **CC BY 4.0**, özgün uygulama kodu **MIT**.

Çeviri ve uygulama kodu topluluk katkısıdır. Hatalı çeviri veya terim önerileri için issue/PR açabilirsin.
