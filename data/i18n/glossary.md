# Ironsworn Çeviri Terim Sözlüğü

Bu dosya çeviri tutarlılığı için **tek kaynaktır**. Hem datasworn arayüz metinleri
(`strings.todo.json` → `tr.json`) hem de PDF kural kitabı çevirisi bu sözlüğe uymalıdır.
Bir terimin karşılığından emin değilsen önce burayı kontrol et; burada yoksa tutarlı bir
karşılık seç, kullan ve aşağıdaki uygun tabloya ekle.

> Aşağıdaki Türkçe karşılıklar uygulamada (`src/lib/i18n/ui.ts`) ve mevcut `tr.json`
> çevirisinde fiilen kullanılan biçimlerdir. Tutarlılık için bunları değiştirme.

---

## 1. Korunan Terimler — ASLA Çevrilmez

Bu terimler İngilizce bırakılır; parantezle Türkçe karşılık de verilmez.

| Terim | Not |
|---|---|
| **Edge, Heart, Iron, Shadow, Wits** | Beş stat adı. Yalnızca **stat** olarak korunur (aşağıdaki "Iron" istisnasına bak). |
| **Momentum** | Asla "ivme/ivmen" yapılma. Aynen "Momentum". |
| **Elf / Elves** | Kurgusal ırk. (Çoğul gerekiyorsa "Elfler".) |
| **Varou** | Kurgusal ırk (kurt-insan). |
| **Troll** | Kurgusal ırk. |
| Oyun değerleri: `+1`, `-6`, `d6`, `d10`, `1d100`, `1-25` | Sayı/zar ifadelerine dokunma. |
| `[etiket](id:...)`, `{{table:...}}`, `__bold__` | Markdown/template; bkz. Bölüm 6. |

**"Iron" istisnası:** Yalnızca **stat adı** olarak geçtiğinde korunur (`Roll +Iron` → `Zar at +Iron`).
Bir kelime olarak geçtiğinde **Demir** olur: *Iron Vow* → Demir Ant, *the Ironlands* → Demir Diyarlar,
*Ironlander* → Demir Diyar sakini.

---

## 2. Temel Mekanik Terimler

| İngilizce | Türkçe |
|---|---|
| Move | **Hamle** (asla "hareket" değil) |
| Vow | Ant |
| Iron Vow | Demir Ant |
| Bond / Bonds | Bağ / Bağlar |
| Supply | İkmal |
| Health | Can |
| Spirit | Ruh |
| Harm | Hasar |
| Progress / Progress Track | İlerleme / İlerleme İzi |
| Tick | Çentik (ilerleme kutusunun ¼'ü) |
| Milestone | Dönüm Noktası |
| Challenge Rank | Zorluk Derecesi |
| Action die | Eylem zarı |
| Challenge dice | Zorluk zarları |
| Roll +\<stat\> | Zar at +\<stat\> (stat adı korunur) |
| Strong hit | Güçlü Başarı |
| Weak hit | Zayıf Başarı |
| Miss | Başarısızlık |
| Oracle | Kehanet |
| Asset | Yetenek Kartı |
| Companion | Yoldaş |
| Path | Yol |
| Combat Talent | Savaş Yeteneği |
| Ritual | Ritüel |
| Initiative | İnisiyatif |
| Battle | Muharebe |
| Encounter | Karşılaşma |
| Fate | Kader |

### Zorluk Dereceleri (Challenge Rank)
| İngilizce | Türkçe |
|---|---|
| Troublesome | Sıradan |
| Dangerous | Tehlikeli |
| Formidable | Zorlu |
| Extreme | Aşırı |
| Epic | Destansı |

---

## 3. Olumsuz Etkiler — Impacts (kitapta "Debilities")

Datasworn bunları **Impact**, klasik kural kitabı **Debility** der; ikisi de **Olumsuz Etki**
olarak çevrilir. Üç kategoriye ayrılır:

### Durumlar — Conditions (geçici)
| İngilizce | Türkçe |
|---|---|
| Wounded | Yaralı |
| Shaken | Yıkılmış |
| Unprepared | Hazırlıksız |
| Encumbered | Yüklü |

### Belalar — Banes (kalıcı)
| İngilizce | Türkçe |
|---|---|
| Maimed | Sakat |
| Corrupted | Yozlaşmış |

### Yükler — Burdens (kalıcı, göreve bağlı)
| İngilizce | Türkçe |
|---|---|
| Cursed | Lanetli |
| Tormented | Ezilmiş |

---

## 4. Hamle Adları (Move Names)

Özel ad gibi; baş harfleri büyük, tutarlı kullanılır.

| İngilizce | Türkçe |
|---|---|
| Face Danger | Tehlikeyle Yüzleş |
| Secure an Advantage | Avantaj Sağla |
| Gather Information | Bilgi Topla |
| Heal | Şifa Bul |
| Resupply | İkmal Et |
| Make Camp | Kamp Kur |
| Undertake a Journey | Yolculuğa Çık |
| Reach Your Destination | Hedefe Ulaş |
| Compel | İkna Et |
| Sojourn | Konaklama |
| Draw the Circle | Çemberi Çiz |
| Forge a Bond | Bağ Kur |
| Test Your Bond | Bağını Sına |
| Aid Your Ally | Müttefikine Yardım Et |
| Write Your Epilogue | Sonsözünü Yaz |
| Enter the Fray | Savaşa Gir |
| Strike | Saldır |
| Clash | Çatış |
| Turn the Tide | Savaşı Çevir |
| End the Fight | Savaşı Bitir |
| Endure Harm | Hasara Katlan |
| Endure Stress | Strese Katlan |
| Face Death | Ölümle Yüzleş |
| Face Desolation | Yıkımla Yüzleş |
| Swear an Iron Vow | Demir Ant İç |
| Reach a Milestone | Bir Dönüm Noktasına Ulaş |
| Fulfill Your Vow | Antını Tamamla |
| Forsake Your Vow | Antından Vazgeç |
| Pay the Price | Bedelini Öde |
| Ask the Oracle | Kehanetin Sesini Dinle |
| Battle | Muharebe |
| Advance | İlerle |
| Out of Supply | İkmalsiz Kal |
| Face a Setback | Aksilikle Yüzleş |

**Ask the Oracle seçenek/ihtimal etiketleri** datasworn `/moves` metnine uyar: *Bir sonuca var · Evet/hayır
sorusu sor · İki seçenek seç · Bir fikir kıvılcımı yak*. İhtimal kademeleri ch6 (Kehanetler) ile tutarlı tutulur.

### Ek terimler (kural kitabı anlatımı)
| İngilizce | Türkçe |
|---|---|
| Waypoint | Durak |
| Match (zar eşleşmesi) | Eşleşme |
| Pack (düşman sürüsü) | Sürü |
| Longhouse | Uzunev |
| Inciting incident | Seni harekete geçiren olay |
| Features / Drives / Tactics (OYK blokları) | Özellikler / Güdüler / Taktikler |
| Beasts / Horrors (yaratık kategorileri) | Canavarlar / Dehşetler |
| Mystic (OYK) | Mistik |
| the sight (mistiğin görüsü) | görü |
| Rank (düşman derecesi) | Derece |

---

## 5. Dünya ve Anlatım Terimleri

| İngilizce | Türkçe |
|---|---|
| The Ironlands | Demir Diyarlar |
| Ironlander | Demir Diyar sakini |
| The Old World | Eski Dünya |
| Iron Priests | Demir Rahipler |
| True Crown | Gerçek Taç |
| black iron | kara demir |
| the Veils (Veiled Mountains) | Örtüler |
| Ironsworn (sıfat) | Demir-Andlı |
| Firstborn | İlk Doğanlar |
| Steading | Yerleşim |
| Hold | Kale / Hisar |
| Overseer | Gözetici |
| Threat | Tehdit |
| Legacy | Miras |
| Quest Starter | Görev Başlangıcı |
| Gamemaster / GM | Oyun Yöneticisi / OY |
| NPC | OYK (Oyuncu Yönetmeyen Karakter) |
| Circle (düello) | Çember |
| Warden | Muhafız |
| Warband | Savaş Bölüğü |
| Slayer | Canavar Avcısı |
| Primordial | İlksel |

### Bölgeler (Atlas) — özel adlar
| İngilizce | Türkçe |
|---|---|
| Barrier Islands | Set Adaları |
| Ragged Coast | Parçalı Kıyı |
| Deep Wilds | Derin Yabanlar |
| Flooded Lands | Su Basmış Topraklar |
| Havens | Sığınaklar |
| Hinterlands | Ardtopraklar |
| Tempest Hills | Fırtına Tepeleri |
| Veiled Mountains | Örtülü Dağlar |
| Shattered Wastes | Paramparça Çoraklıklar |

### Yetenek Kartı (Asset) adları
**Kanonik kaynak = datasworn `tr.json` çevirileri** (uygulamadaki `/assets` sayfasında görünen adlar).
Kural kitabı sayfa çevirilerinde bir kart adı geçince **birebir o ad kullanılır** (ör. Storyweaver→Öykü Dokuyucu,
Shield-Bearer→Kalkan Taşıyıcısı, Veteran→Kıdemli Savaşçı, Herbalist→Şifacı Otçu, Communion→Ruhla Görüşme,
Scry→Alevde Görme, Ironclad→Zırhlı, Banner-Sworn→Sancağa Antlı). Yeni icat etme; `/assets`'e bak.

### Yaratıklar / OYK'lar — özel adlar
Korunan (çevrilmez) kurgusal türler: **Elf, Troll, Varou, Gaunt, Basilisk, Leviathan, Wyvern**.

| İngilizce | Türkçe |
|---|---|
| Broken | Yıkıklar (asla "Yıkılmış" — o Shaken'a ait) |
| Raider | Yağmacı |
| Mammoth | Mamut |
| Chimera | Kimera |
| Elder Beast | Kadim Canavar |
| Harrow Spider | Dehşet Örümceği |
| Bonewalker | Kemikyürüyen |
| Frostbound | Ayazabağlı |
| Haunt | Tayf |
| Hollow | Kovukvaran |
| Iron Revenant | Demir Hortlak |
| Sodden | Sucul |

---

## 6. Markdown / Token Kuralları (datasworn metinleri)

1. `[etiket](id:...)` linkleri: yalnızca `etiket` çevrilir, parantez içindeki hedef **aynen** kalır.
2. `__metin__` bold: çift alt çizgi korunur, içindeki metin çevrilir.
3. `{{table:...}}` template tagları: hiç dokunulmaz, aynen kopyalanır.
4. Zar/değer ifadeleri (`1d100`, `1-25`, `+2`): dokunulmaz.
5. EN ve TR'deki token sayısı **eşit** olmalı (`build-i18n.ts` bunu denetler ve uyarır).

---

## 7. Anlatım Tonu ve Gösterim

### Ton
- **İmmersive, 2. tekil şahıs**: "sen" ile hitap. *"You are Ironsworn"* → *"Sen Demir-Andlısın."*
- Oyun kitabının sesi: heyecan verici, net, öğreten. Akademik/kuru değil; sürükleyici anlatım.

### Terim İlk Geçiş Gösterimi (kural kitabı anlatımı için)
- Bir terim **ilk kez** geçtiğinde: **Türkçe (English)** — ör. **İlerleme İzi (Progress Track)**.
- Sonraki geçişlerde yalnızca Türkçeyi kullan.
- Stat adları (Edge, Heart, Iron, Shadow, Wits) hiçbir zaman çevrilmez, parantez de gerekmez.

### Sayfa Referansları
- "(page NN)" → "(sayfa NN)" olarak bırak. Bunlar UI'da otomatik PDF linkine dönüşür.

---

## 8. Yaygın Hatalar (Negatif Örnekler)

Çeviride en sık görülen tutarsızlıklar — bunlardan kaçın:

| ✗ Yanlış | ✓ Doğru | Neden |
|---|---|---|
| Move → "hareket" | Move → **Hamle** | "hareket" = fiziksel hareket; oyun terimi değil. |
| Momentum → "ivme/ivmen" | **Momentum** (korunur) | Markalı oyun terimi. |
| "Harm" İngilizce bırakmak | **Hasar** | Çevrilir. |
| "Asset" İngilizce bırakmak | **Yetenek Kartı** | Çevrilir. |
| Shaken → "sarsılmış" | Shaken → **Yıkılmış** | Proje kararı; `tr.json` ile tutarlı olmalı. |
| Tek metinde "hamle" ve "hareket" karışık | Hep **Hamle** | Aynı belge içinde terim değiştirme. |

**Genel kural:** Bölüm 1'deki korunan terimler dışında hiçbir İngilizce oyun terimi
çevrilmeden bırakılmaz. Bir terimi bir kez nasıl çevirdiysen tüm metinde aynı kullan.
