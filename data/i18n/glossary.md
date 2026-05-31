# Ironsworn Çeviri Terim Sözlüğü

Bu dosya çeviri tutarlılığı için kullanılır. Ajanın her batch çevirisinde bu sözlüğe uyması gerekir.

## Stat İsimleri (korunur — çevrilmez)
| Terim | Kullanım |
|---|---|
| Edge | Çevrilmez (stat adı) |
| Heart | Çevrilmez |
| Iron | Çevrilmez |
| Shadow | Çevrilmez |
| Wits | Çevrilmez |

## Temel Mekanik Terimler
| İngilizce | Türkçe |
|---|---|
| Move | Hamle |
| Vow | Ant |
| Bond / Bonds | Bağ / Bağlar |
| Momentum | Momentum (korunur) |
| Supply | İkmal |
| Health | Can |
| Spirit | Ruh |
| Progress Track | İlerleme İzi |
| Challenge Rank | Zorluk Derecesi |
| Troublesome | Sıradan |
| Dangerous | Tehlikeli |
| Formidable | Zorlu |
| Extreme | Aşırı |
| Epic | Destansı |
| Oracle | Kehanet |
| Asset | Yetenek Kartı |
| Companion | Yoldaş |
| Path | Yol |
| Combat Talent | Savaş Yeteneği |
| Ritual | Ritüel |
| Debility / Debilities | Zaaf / Zaaflar |
| Battered | Sarsılmış |
| Cursed | Lanetli |
| Corrupted | Yozlaşmış |
| Maimed | Sakat |
| Shaken | Yıkılmış |
| Tormented | Ezilmiş |
| Weak hit | Zayıf başarı |
| Strong hit | Güçlü başarı |
| Miss | Başarısızlık |
| Action die | Eylem zarı |
| Challenge dice | Zorluk zarları |
| Roll +<stat> | Zar at +<stat> (stat ismi değişmez) |
| Fulfill Your Vow | Antını Tamamla |
| Forsake Your Vow | Antından Vazgeç |
| Reach a Milestone | Bir Dönüm Noktasına Ulaş |
| Swear an Iron Vow | Demir Ant İç |
| Face Danger | Tehlikeyle Yüzleş |
| Secure an Advantage | Avantaj Sağla |
| Gather Information | Bilgi Topla |
| Heal | Şifa Bul |
| Resupply | İkmal Et |
| Make Camp | Kamp Kur |
| Undertake a Journey | Yolculuğa Çık |
| Reach Your Destination | Hedefe Ulaş |
| Enter the Fray | Savaşa Gir |
| Strike | Saldır |
| Clash | Çatış |
| Turn the Tide | Savaşı Çevir |
| End the Fight | Savaşı Bitir |
| Battle | Muharebe |
| Compel | İkna Et |
| Sojourn | Konaklama |
| Draw the Circle | Çemberi Çiz |
| Forge a Bond | Bağ Kur |
| Test Your Bond | Bağını Sına |
| Aid Your Ally | Müttefikine Yardım Et |
| Write Your Epilogue | Sonsözünü Yaz |
| Face Death | Ölümle Yüzleş |
| Face Desolation | Yıkımla Yüzleş |
| Pay the Price | Bedelini Öde |
| Ask the Oracle | Kehanetin Sesini Dinle |
| NPC | OYK (Oyuncu Yönetmeyen Karakter) |
| Quest Starter | Görev Başlangıcı |
| The Ironlands | Demir Diyarlar |
| Ironlander | Demir Diyar sakini |
| The Old World | Eski Dünya |

## Ek Terimler (Kural Kitabı Anlatımı)
| İngilizce | Türkçe |
|---|---|
| Gamemaster / GM | Oyun Yöneticisi / OY |
| Initiative | İnisiyatif |
| Harm | Hasar |
| Progress | İlerleme |
| Milestone | Dönüm Noktası |
| Threat | Tehdit |
| Encounter | Karşılaşma |
| Legacy | Miras |
| Fate | Kader |
| Ironsworn (sıfat) | Demir-Andlı |
| Steading | Yerleşim |
| Hold | Kale/Hisar |
| Overseer | Gözetici |
| Firstborn | İlk Doğanlar |
| Elf / Elves | Elf / Elfler (çevrilmez) |
| Varou | Varou (çevrilmez, kurgusal ırk) |
| Troll | Troll (çevrilmez) |
| Cursed | Lanetli |

## Kural Kitabı Anlatım Tonu ve Kuralları

### Ton
- **İmmersive, 2. tekil şahıs**: "sen" ile hitap et. "You are Ironsworn" → "Sen Demir-Andlısın."
- Oyun kitabının orijinal sesi: heyecan verici, net, oyunu öğreten.
- Akademik/teknik kuru çeviri değil; sürükleyici anlatım.

### Terim Gösterimi
- Bir terim **ilk kez** geçtiğinde: **Türkçe (English)** — ör. **İlerleme İzi (Progress Track)**.
- Sonraki geçişlerde yalnızca Türkçeyi kullan.
- Stat adları (Edge, Heart, Iron, Shadow, Wits) **hiçbir zaman** çevrilmez, parantez gösterimi de gerekmez.
- Oyun mekanik değerleri (+1, -6, d6, d10) hiç dokunma.

### Sayfa Referansları
- "(page NN)" ifadelerini olduğu gibi bırak: `(sayfa NN)`. Bunlar UI'da otomatik PDF linkine dönüşür.

## Çeviri Kuralları (datasworn metinleri için)

1. **Stat adları** (Edge, Heart, Iron, Shadow, Wits) çevrilmez, orijinal bırakılır.
2. **`[etiket](id:...)` linkleri**: sadece `etiket` kısmı çevrilir, parantez içindeki hedef ID değişmez.
3. **`__metin__` bold markdown**: çift alt çizgi korunur, sadece içindeki metin çevrilir.
4. **`{{table>...}}` template tagları**: hiç dokunulmaz, aynen kopyalanır.
5. **Zar ifadeleri** (örn. `1d100`, `1-25`, `+2`): dokunulmaz.
6. **"Roll +"** ifadelerinde stat ismi korunur: `Zar at +Edge` (Edge çevrilmez).
7. Çeviri akıcı Türkçe olmalı; çok teknik/kuru çeviri yerine anlatım tercih edilir.
8. Bu sözlükte olmayan terimler için tutarlı bir karşılık seç ve kullan (ilk kez geçtiğinde sözlüğü güncelle).
