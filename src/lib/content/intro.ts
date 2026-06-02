// Otomatik üretildi: PDF the-basics intro blokları küratörlü + glossary uyumlu çevrildi.
// Kaynak: data/pdf/rulebook.json (the-basics). Çeviri: /ceviri (Opus, glossary).
import type { IconName } from '$lib/icons.js';

export interface IntroSection {
	id: string;
	icon: IconName;
	/** Basılı kitap sayfası (PdfRef +11 ekleyip PDF iç sayfasına gider). */
	page: number;
	title_en: string;
	title_tr: string;
	body_en: string;
	body_tr: string;
}

export const introSections: IntroSection[] = [
	{
		"id": "playing",
		"icon": "book",
		"page": 1,
		"title_en": "Playing Ironsworn",
		"title_tr": "Ironsworn Oynamak",
		"body_en": "In *Ironsworn* you are a hero sworn to perilous quests in the dark fantasy world of the Ironlands. You will explore untracked wilds, fight desperate battles, forge bonds with isolated communities, and uncover the secrets of this harsh land. Above all, you will swear iron vows and see them fulfilled—no matter the cost.\n\nYou create a character, decide a few things about your world, and set the story in motion. When you face something dangerous or uncertain, your choices and the dice decide what happens. *Ironsworn* is built for solo and small-group play, and supports three modes:\n\n- *Guided:* A gamemaster (GM) moderates the session, brings the world to life, and decides the outcome of your actions.\n- *Cooperative:* You and one or more friends play together to overcome challenges. No GM required.\n- *Solo:* You alone portray a lone hero in a dangerous world.",
		"body_tr": "*Ironsworn*'de sen, Demir Diyarlar'ın (Ironlands) karanlık fantastik dünyasında tehlikeli görevlere yemin etmiş bir kahramansın. Yolu kesilmemiş yabanları keşfedecek, umutsuz savaşlar verecek, ücra topluluklarla bağlar (Bonds) kuracak ve bu çetin diyarın sırlarını açığa çıkaracaksın. Hepsinden önemlisi, demir antlar (Iron Vows) içecek ve bedeli ne olursa olsun onları yerine getireceksin.\n\nBir karakter yaratır, dünyan hakkında birkaç karar verir ve hikâyeyi başlatırsın. Tehlikeli ya da belirsiz bir şeyle karşılaştığında, sonucu senin seçimlerin ve zarlar belirler. *Ironsworn* solo ve küçük grup oyunu için tasarlanmıştır ve üç oyun modunu destekler:\n\n- *Rehberli (Guided):* Bir Oyun Yöneticisi (OY) oturumu yönetir, dünyayı canlandırır ve eylemlerinin sonucuna karar verir.\n- *Ortak (Co-op):* Sen ve bir ya da daha fazla arkadaşın, zorlukları aşmak için birlikte oynarsınız. OY gerekmez.\n- *Solo:* Tehlikeli bir dünyada yalnız bir kahramanı tek başına canlandırırsın."
	},
	{
		"id": "setting",
		"icon": "compass",
		"page": 2,
		"title_en": "The Setting",
		"title_tr": "Dünya",
		"body_en": "Your adventures unfold in the Ironlands—a rugged peninsula of isolated communities and untracked wilds on the frontier of the known world. A few default truths to start from:\n\n- Two generations ago, your people were driven here from their homes in the Old World.\n- The weather is harsh and winters are brutal. Rugged terrain makes travel and trade difficult and dangerous.\n- There are no cities or kingdoms. Ironlanders live in isolated villages and steadings of wood, stone, and thatch.\n- Vast areas are uninhabited except by the firstborn—elves, giants, and the wolf-like varou.\n- Coins are nearly worthless; commerce runs on barter and favors. Raiding and skirmishes between communities are a constant menace.\n- Magic is subtle and mysterious. Mystics ward away the darkness through ritual, but often succumb to it.\n\nThis is your Ironlands. You are encouraged to bend the setting to your liking—the choices you make will inspire the personal vows that drive your character.",
		"body_tr": "Maceraların Demir Diyarlar'da geçer: bilinen dünyanın sınırında, ücra toplulukların ve yolu kesilmemiş yabanların uzandığı sarp bir yarımada. Başlangıç için birkaç temel hakikat:\n\n- İki kuşak önce halkın, Eski Dünya'daki (Old World) yurtlarından buraya sürüldü.\n- Hava çetindir, kışlar acımasız. Sarp araziler yolculuğu ve ticareti hem zor hem tehlikeli kılar.\n- Ne şehir vardır ne krallık. Demir Diyar sakinleri (Ironlanders) ahşap, taş ve samandan yapılma ücra köy ve yerleşimlerde yaşar.\n- Engin topraklar İlk Doğanlar (firstborn) dışında ıssızdır: elfler, devler ve kurt benzeri varoular.\n- Para neredeyse değersizdir; ticaret takas ve iyilik üzerine döner. Topluluklar arası yağma ve çatışmalar daimî bir tehdittir.\n- Büyü ince ve gizemlidir. Mistikler ritüellerle karanlığı uzak tutmaya çalışır, ama çoğu kez ona yenik düşer.\n\nBu senin Demir Diyarların. Dünyayı dilediğince eğip bükmen için teşvik edilirsin; verdiğin kararlar, karakterini yönlendiren kişisel antlarına ilham verecek."
	},
	{
		"id": "vows",
		"icon": "quill",
		"page": 4,
		"title_en": "Iron Vows",
		"title_tr": "Demir Antlar",
		"body_en": "In the Ironlands, a vow is sacred. When you declare your solemn promise—to serve someone, to aid them, or to complete a personal quest—your honor is bound to it. Abandoning an oath is the worst sort of failure.\n\nWhen you swear a vow, you touch a piece of iron: a coin, a weapon, your armor. It is an old tradition. Some say the iron, a piece of the primal world, carries your promise to the old gods so they may better hear it.\n\nVows are the heart of *Ironsworn*. They drive you, create the context for your adventures, and as you fulfill them you gain experience and new abilities. You begin with a background vow, and your campaign opens with an inciting incident that triggers your first iron vow.",
		"body_tr": "Demir Diyarlar'da bir ant kutsaldır. Birine hizmet etmek, ona yardım etmek ya da kişisel bir görevi tamamlamak için ağzından çıkan o ağırbaşlı sözü verdiğinde, onurun ona bağlanır. Bir yemini terk etmek, başarısızlığın en kötü türüdür.\n\nBir ant içerken bir demir parçasına dokunursun: bir sikke, bir silah ya da zırhın. Bu eski bir gelenektir. Kimi der ki ilkel dünyanın bir parçası olan demir, sözünü eski tanrılara taşır; ki onlar onu daha iyi işitsin.\n\nAntlar *Ironsworn*'ün kalbidir. Seni ileri sürerler, maceralarının zeminini kurarlar ve sen onları yerine getirdikçe deneyim ve yeni yetenekler kazanırsın. Bir geçmiş andıyla başlarsın; seferin ise ilk demir antını tetikleyen bir kıvılcım olayıyla açılır."
	},
	{
		"id": "moves",
		"icon": "crossed-swords",
		"page": 6,
		"title_en": "Moves",
		"title_tr": "Hamleler",
		"body_en": "Moves are self-contained systems for resolving a specific action, scene, or question. There's a move for nearly every common situation. Each has a trigger phrased as *\"When you...\"*—when your character does that thing, you refer to the move to see what happens. They're grouped by activity: adventure, relationship, combat, suffer, quest, and fate moves.\n\nMost moves resolve a risky action—attacking, climbing, healing—with an action roll. Others measure your headway against an extended challenge like a journey or a fight using a progress track, resolved with a progress roll. A few use an oracle roll to decide events beyond your control.\n\nSome moves require no roll at all. The golden rule: don't roll dice unless a move tells you to.",
		"body_tr": "Hamleler (Moves), belirli bir eylemi, sahneyi ya da soruyu çözmek için kendi içinde bütün sistemlerdir. Karşılaşacağın hemen her yaygın durum için bir hamle vardır. Her birinin *\"Şunu yaptığında...\"* diye ifade edilen bir tetikleyicisi olur; karakterin o şeyi yaptığında, ne olacağını görmek için hamleye bakarsın. Etkinliklere göre gruplanırlar: macera, ilişki, savaş, çile, görev ve kader hamleleri.\n\nÇoğu hamle riskli bir eylemi (saldırmak, tırmanmak, şifa bulmak) bir eylem zarıyla çözer. Bazıları ise bir yolculuk ya da dövüş gibi uzun bir zorluğa karşı ilerlemeni İlerleme İzi (Progress Track) üzerinden ölçer ve bir ilerleme zarıyla sonuca bağlar. Birkaçı da denetimin dışındaki olayları belirlemek için bir kehanet zarı kullanır.\n\nKimi hamleler hiç zar gerektirmez. Altın kural: bir hamle sana söylemedikçe zar atma."
	},
	{
		"id": "action_roll",
		"icon": "dice",
		"page": 8,
		"title_en": "The Action Roll",
		"title_tr": "Eylem Zarı Atışı",
		"body_en": "When you make a move for a risky or uncertain action, you roll three dice at once:\n\n- *Challenge dice:* two ten-sided dice (d10)\n- *Action die:* one six-sided die (d6)\n\nAdd the relevant stat (and any bonuses) to your action die, then compare the total to each challenge die. Beat both for a strong hit, one for a weak hit, neither for a miss.",
		"body_tr": "Riskli ya da belirsiz bir eylem için bir hamle yaptığında, aynı anda üç zar atarsın:\n\n- *Zorluk zarları (Challenge dice):* iki on yüzlü zar (d10)\n- *Eylem zarı (Action die):* bir altı yüzlü zar (d6)\n\nİlgili stat'i (ve varsa eklenecek bonusları) eylem zarına ekler, sonra toplamı her bir zorluk zarıyla karşılaştırırsın. İkisini de geçersen Güçlü Başarı, birini geçersen Zayıf Başarı, hiçbirini geçemezsen Başarısızlık."
	},
	{
		"id": "momentum",
		"icon": "vortex",
		"page": 11,
		"title_en": "Momentum",
		"title_tr": "Momentum",
		"body_en": "Momentum is a special mechanic at the core of *Ironsworn*. Your momentum ranges from -6 to +10 and represents how you're faring in your quests. Move results often tell you to increase or decrease it.\n\nWhen momentum is positive, things are going your way—you have the advantage, you're in control, your path is clear. When it's negative, the tide has turned against you: you face tough odds and your next steps are uncertain.\n\nMomentum persists through scenes and between sessions. When you stop playing, note your current value and pick up where you left off.",
		"body_tr": "Momentum, *Ironsworn*'ün merkezinde duran özel bir mekaniktir. Momentum'un -6 ile +10 arasında değişir ve görevlerinde işlerin nasıl gittiğini gösterir. Hamle sonuçları çoğu kez sana onu artırmanı ya da azaltmanı söyler.\n\nMomentum pozitifken işler senin lehine döner: avantaj sendedir, kontrol sendedir, yolun açıktır. Negatifken ise gidişat aleyhine dönmüştür; çetin ihtimallerle yüzleşir, atacağın adımdan emin olamazsın.\n\nMomentum sahneler boyunca ve oturumlar arasında kalıcıdır. Oyunu bıraktığında mevcut değerini not et ve döndüğünde kaldığın yerden devam et."
	},
	{
		"id": "oracle",
		"icon": "crystal-ball",
		"page": 23,
		"title_en": "Ask the Oracle",
		"title_tr": "Kehanetin Sesini Dinle",
		"body_en": "When you need to resolve a question, discover a detail, decide how others respond, or trigger an event, you may:\n\n- *Draw a conclusion:* go with the most interesting and obvious answer.\n- *Ask a yes/no question:* judge the odds of a 'yes', then roll to check.\n- *Pick two:* envision two options, rate one as likely, and roll to see if it's true.\n- *Spark an idea:* brainstorm or use a random prompt.\n\nTo answer a yes/no question, roll your oracle dice for a result from 1 to 100 and compare it to the odds you set, from *Almost Certain* down to *Small Chance*. If you're playing with a GM, they are the oracle—but *Ironsworn* is shared storytelling. Offer suggestions, talk it out, and build the world together.",
		"body_tr": "Bir soruyu çözmek, dünyada bir ayrıntı keşfetmek, başkalarının nasıl tepki vereceğine karar vermek ya da bir olayı tetiklemek istediğinde şunları yapabilirsin:\n\n- *Bir sonuca var:* en ilginç ve en bariz cevabı seç.\n- *Evet/hayır sorusu sor:* 'evet' ihtimalini tart, sonra kontrol için zar at.\n- *İkisinden birini seç:* iki seçenek hayal et, birini olası say ve doğru olup olmadığını görmek için zar at.\n- *Bir fikir kıvılcımla:* beyin fırtınası yap ya da rastgele bir esin kullan.\n\nBir evet/hayır sorusunu yanıtlamak için kehanet zarlarını atıp 1 ile 100 arası bir sonuç elde eder ve onu belirlediğin ihtimalle karşılaştırırsın; *Neredeyse Kesin*'den *Küçük İhtimal*'e kadar. Bir OY ile oynuyorsan kehanet odur; ama *Ironsworn* ortak bir hikâye anlatıcılığıdır. Öneriler sun, konuşup karara bağla ve dünyayı birlikte kurun."
	},
	{
		"id": "flow",
		"icon": "scroll",
		"page": 26,
		"title_en": "The Flow of Play",
		"title_tr": "Oyunun Akışı",
		"body_en": "You play from your character's perspective. What are you doing? What are you trying to achieve? What stands in your way? Your quests and the situations you encounter guide the story and your choices.\n\nWhen you have a question about what you find or what happens next, go with what feels right (in solo or co-op) or ask your GM. When you want to leave it to fate, make the *Ask the Oracle* move. Above all: if it's interesting, dramatic, and fits the fiction, make it happen.\n\nIf a move covers what you're doing, use it. A strong hit means you're in control—you drive the narrative. A weak hit or a miss means you don't have control; instead of acting, you react. What happens next?",
		"body_tr": "Oyunu karakterinin gözünden oynarsın. Ne yapıyorsun? Neyi başarmaya çalışıyorsun? Karşında ne duruyor? Görevlerin ve karşılaştığın durumlar, hikâyeye ve seçimlerine yön verir.\n\nBulduğun şey ya da bundan sonra olacaklar hakkında bir sorun olduğunda, doğru gelene uy (solo ya da ortak oyunda) ya da OY'na sor. İşi kadere bırakmak istediğinde *Kehanetin Sesini Dinle* hamlesini yap. Hepsinden önemlisi: ilginç, dramatik ve kurguya uyuyorsa, olmasını sağla.\n\nYaptığın şeyi bir hamle kapsıyorsa onu kullan. Güçlü Başarı, kontrolün sende olduğu anlamına gelir; anlatıyı sen sürersin. Zayıf Başarı ya da Başarısızlık ise kontrolün sende olmadığını gösterir; eylemde bulunmak yerine tepki verirsin. Şimdi ne olacak?"
	},
	{
		"id": "what_you_need",
		"icon": "papers",
		"page": 1,
		"title_en": "What You Need",
		"title_tr": "Neye İhtiyacın Var",
		"body_en": "If you're playing solo, just grab your materials and begin—a session can run from a few minutes to a few hours. Playing with friends, guided or co-op? Set aside a couple of hours to make real progress on your quests.\n\nMake sure you have:\n\n- Two ten-sided dice (d10) per player—your challenge dice.\n- One six-sided die (d6) per player—your action die.\n- Optionally, another pair of d10s to use as oracle dice.\n- A character sheet and asset cards for each player.\n- Counters to mark your status tracks: paper clips, beads, coins, tokens—whatever's handy.",
		"body_tr": "Solo oynuyorsan, malzemelerini kap ve başla; bir oturum birkaç dakikadan birkaç saate kadar sürebilir. Arkadaşlarınla, rehberli ya da ortak oynuyorsan, görevlerinde gerçek bir ilerleme kaydetmek için birkaç saat ayır.\n\nElinde şunların olduğundan emin ol:\n\n- Her oyuncu için iki on yüzlü zar (d10): zorluk zarların.\n- Her oyuncu için bir altı yüzlü zar (d6): eylem zarın.\n- İstersen, kehanet zarı olarak kullanmak için bir çift d10 daha.\n- Her oyuncu için bir karakter kâğıdı ve Yetenek Kartları (Asset cards).\n- Durum izlerini işaretlemek için sayaçlar: ataç, boncuk, sikke, pul; ne elverişliyse."
	}
];
