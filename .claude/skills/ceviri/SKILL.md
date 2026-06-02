---
name: ceviri
description: Ironsworn TTRPG metinlerini (datasworn strings.todo.json `tr` alanı veya PDF rulebook.json `text_tr` alanı) Türkçeye çevirir. data/i18n/glossary.md sözlüğünü birebir uygular, JSON yapısını/markdown token'larını korur. Bir çeviri parçası, dosya, key aralığı ya da ham JSON chunk'ı çevrilmesi istendiğinde kullan.
---

# Ironsworn Türkçe Çeviri

Ironsworn rulebook'unun bir parçasını Türkçeye çevirir. **CLAUDE.md'deki çeviri
kuralları her zaman geçerlidir** — bu skill o kuralları somut bir iş akışına döker.

## Girdi
Kullanıcı şunlardan birini belirtir:
- Bir **dosya** (`data/i18n/classic/strings.todo.json` ya da `data/pdf/rulebook.json`)
  ve isteğe bağlı bir **key/aralık** ("face_danger ile başlayan tüm key'ler",
  "ch1 blokları", "ilk 50 boş kayıt" gibi),
- ya da doğrudan yapıştırılmış bir **ham JSON chunk'ı**.

Belirsizse hangi dosya/aralık olduğunu sor.

## İş Akışı

1. **Sözlüğü oku.** `data/i18n/glossary.md` her seferinde okunur ve kanonik kabul
   edilir. Sözlükte olan her terim **birebir** kullanılır (eşanlamlı yok).
2. **Hedef alanları belirle:**
   - `strings.todo.json` → her kaydın **`tr`** alanı doldurulur, `en` aynen kalır.
     Yalnızca boş `tr`'leri çevir (aksi belirtilmedikçe mevcut çevirilere dokunma).
   - `rulebook.json` → her bloğun **`text_tr`** alanı doldurulur, `text_en` aynen kalır.
   - Ham chunk → yalnızca insan-okur string değerleri çevrilir (bkz. CLAUDE.md §2).
3. **Çevir.** CLAUDE.md'deki İhlal Edilemez Kuralları uygula:
   - JSON key'leri, ID'ler, tip enumları, link **hedefleri**, `{{table:...}}`,
     sayılar, boolean'lar, stat adları (`Roll +Iron` → `Zar at +Iron`), `*Ironsworn*`
     → **dokunma**.
   - `[etiket](id:...)` → yalnızca etiketi çevir; `__kalın__`/`*italik*` işaretlerini koru.
   - "(page NN)" → "(sayfa NN)". Terim ilk geçişte `Türkçe (English)`.
   - Ton: 2. tekil şahıs, terse, mitik; modern jargon yok.
4. **Token bütünlüğünü koru.** Her string'de EN ile TR'nin
   `[...](...)` / `{{...}}` / `__...__` token **sayısı eşit** ve link hedefleri
   **aynı** olmalı. `build-i18n.ts` bunları denetler.
5. **Yaz.** Hedef alanları yerinde düzenle (Edit/Write). Sözlükte olmayan yeni bir
   terim kararı verdiysen `data/i18n/glossary.md`'nin uygun tablosuna ekle.
6. **Doğrula.** `strings.todo.json` çevirisinden sonra `npm run build-i18n`
   çalıştır; token/link uyarısı çıkarsa düzelt. JSON'ın hâlâ geçerli ayrıştığını
   teyit et.

## Ham JSON modu (dosyaya yazmadan)
Kullanıcı doğrudan bir JSON chunk verir ve "çevrilmiş JSON'ı bana ver" derse:
**yalnızca** çevrilmiş ham JSON'ı döndür — yorum yok, açıklama yok, kod fence yok;
`{` veya `[` ile başlayıp `}` veya `]` ile bitsin. Tüm key/ID/tip/hedef/sayı/boolean
korunmuş, sözlük birebir uygulanmış olsun.

## Son Kontrol (çıktıdan önce)
- [ ] Key'ler, sayı/boolean değerler, ID/tip/link-hedefleri, `{{table:...}}` değişmedi
- [ ] Sözlük terimleri birebir; stat adları korundu; `*Ironsworn*` korundu
- [ ] Markdown ve EN/TR token sayısı eşit
- [ ] Yalnızca hedef alan(lar) (`tr` / `text_tr` / insan-okur değerler) değişti
- [ ] (strings.todo.json ise) `npm run build-i18n` temiz geçti
