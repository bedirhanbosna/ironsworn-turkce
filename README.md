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
2. **PDF kural kitabı** — `data/pdf/rulebook.json` (`text_en` → `text_tr`). *(Ayrı, sürmekte olan iş.)*

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
