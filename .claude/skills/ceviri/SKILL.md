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
5. **Yaz.** Hedef alanları yerinde düzenle (Edit/Write).
6. **Sözlüğü büyüt (ZORUNLU).** Çeviri sırasında kanonik olabilecek her terimi tespit et
   ve `data/i18n/glossary.md`'ye ekle — bkz. aşağıdaki bölüm. (Subagent isen: bu terimleri
   özetinde **liste halinde bildir**; ana ajan glossary'ye işler ve datasworn ile uzlaştırır.)
7. **Doğrula.** `strings.todo.json` çevirisinden sonra `npm run build-i18n`
   çalıştır; token/link uyarısı çıkarsa düzelt. JSON'ın hâlâ geçerli ayrıştığını
   teyit et.

## Sözlüğü Büyütme — Kanonik Terim Tespiti (ZORUNLU)

Amaç: sözlük her çeviriyle büyüsün, aynı terim **her yerde birebir aynı** çevrilsin. Özellikle
**Yetenek Kartları** (asset) çok tekrar eden mekanik terim içerir (buff/bonus/durum) — hepsi tutarlı olmalı.

**Kanonik aday say:** birden çok yerde geçebilecek her terim →
- Hamle/Yetenek Kartı/Kehanet/bölge/yaratık **adları**,
- Mekanik terimler: buff/bonus/ceza, durum/etki adları, izler, sayaçlar
  (ör. *bolster, harm, hardship, momentum, edge, impact, condition, debility, supply, bond*),
- Tekrar eden kalıp ifadeler (ör. *take +1 momentum, mark progress, suffer -health, clear a debility,
  reroll any dice, on a strong hit*).

**Akış:**
1. Terimi gör → `data/i18n/glossary.md`'de **ara**. Varsa **birebir** onu kullan.
2. Yoksa: önce **datasworn'da kanonik karşılık var mı** bak (asset/move/oracle adları için
   `tr.json` / `/assets` / `/moves` kanoniktir; uygulama o adı gösterir). Varsa onu kullan.
3. Hâlâ yoksa: bağlama uygun, tutarlı bir Türkçe karşılık **seç**, kullan ve **glossary'nin uygun
   tablosuna ekle** (yeni satır). Bir daha icat etme; sonraki tüm çeviriler bu satırı kullanır.
4. Çakışma olursa **glossary kanoniktir**; datasworn yanlışsa datasworn'u glossary'ye hizala.

Kararsız kaldığın aday terimleri yine de bildir — eklenip eklenmeyeceğine ana ajan/kullanıcı karar verir.

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
- [ ] Kanonik aday terimler glossary'ye eklendi / (subagent isen) özette bildirildi
