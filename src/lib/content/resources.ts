// Otomatik üretildi: billiam/awesome-ironsworn README.md'den ayrıştırıldı (CC).
// Topluluk kaynak/araç dizini. Öğe adları/URL'leri orijinal (İngilizce); bölüm başlıkları Türkçe.
import type { IconName } from '$lib/icons.js';

export interface ResourceItem { name: string; url: string; desc: string; group?: string; }
export interface ResourceSection { id: string; title_en: string; title_tr: string; icon: IconName; items: ResourceItem[]; }

export const resourceSections: ResourceSection[] = [
	{
		"id": "official-content",
		"title_en": "Official content",
		"title_tr": "Resmî İçerik",
		"icon": "book",
		"items": [
			{
				"name": "Ironsworn",
				"url": "https://tomkinpress.com/pages/ironsworn",
				"desc": "A tabletop RPG of perilous quests"
			},
			{
				"name": "Ironsworn: Delve",
				"url": "https://tomkinpress.com/pages/ironsworn-delve",
				"desc": "Supplement for the Ironsworn tabletop roleplaying game taking your quests to the deepest, darkest reaches of the Ironlands"
			},
			{
				"name": "Ironsworn: Starforged",
				"url": "https://tomkinpress.com/pages/ironsworn-starforged",
				"desc": "The sci-fi evolution of the award-winning tabletop roleplaying game"
			},
			{
				"name": "Lodestar",
				"url": "https://tomkinpress.com/collections/all-products/products/ironsworn-lodestar-expanded-reference-guide",
				"desc": "Reference guide for Ironsworn and Ironsworn: Delve"
			},
			{
				"name": "Sundered Isles",
				"url": "https://tomkinpress.com/pages/sundered-isles",
				"desc": "Supplement for Ironsworn: Starforged with guidelines, options, and tools for exploring a world of fantasy seafaring adventure"
			}
		]
	},
	{
		"id": "community",
		"title_en": "Community",
		"title_tr": "Topluluk",
		"icon": "two-shadows",
		"items": [
			{
				"name": "Discord",
				"url": "https://discord.gg/8bRuZwK",
				"desc": "Official discord server for Ironsworn"
			},
			{
				"name": "Reddit",
				"url": "https://www.reddit.com/r/Ironsworn/",
				"desc": "Ironsworn subreddit"
			}
		]
	},
	{
		"id": "translations",
		"title_en": "Translations",
		"title_tr": "Çeviriler",
		"icon": "scroll",
		"items": [
			{
				"name": "French by Thomas Pereira",
				"url": "http://ironsworn.pbta.fr/",
				"desc": "Ironsworn rulebook and references in French",
				"group": "Ironsworn"
			},
			{
				"name": "German from System Matters",
				"url": "https://www.system-matters.de/produkt-kategorie/ironsworn/",
				"desc": "Ironsworn rulebook and assets in German",
				"group": "Ironsworn"
			},
			{
				"name": "Portuguese by Rodrigo Marini",
				"url": "https://drive.google.com/drive/folders/1X_tA19udvRFT8wsLBT5sWZAce5ttQ7kc",
				"desc": "Ironsworn SRD and play materials in Portuguese",
				"group": "Ironsworn"
			},
			{
				"name": "Spanish by Samuel Rondón",
				"url": "https://www.patreon.com/posts/ironsworn-in-34784503",
				"desc": "Ironsworn play materials in Spanish",
				"group": "Ironsworn"
			},
			{
				"name": "Ukrainian by Dense Forest Camp",
				"url": "https://dense-forest-camp.itch.io/zalizna-prysiaha-playkit",
				"desc": "Ironsworn play materials in Ukrainian",
				"group": "Ironsworn"
			},
			{
				"name": "Polish (Core Oracles only) by Mateusz Czapliński",
				"url": "https://akavel.itch.io/starforged-pl-wyrocznie",
				"desc": "the Core Oracles of Ironsworn: Starforged in Polish",
				"group": "Starforged"
			}
		]
	},
	{
		"id": "tools",
		"title_en": "Tools",
		"title_tr": "Araçlar",
		"icon": "crossed-axes",
		"items": [
			{
				"name": "Asset Printouts",
				"url": "https://jaderavens.itch.io/ironsworn-asset-printouts",
				"desc": "Spreadsheet utility for printing off assets for Ironsworn, Starforged, and Sundered Isles"
			},
			{
				"name": "Asset Workbench",
				"url": "https://effortlessmountain.github.io/ironsworn-asset-workbench/",
				"desc": "Tool for creating custom Ironsworn assets"
			},
			{
				"name": "The Augur",
				"url": "https://the-augur.itch.io/theaugur",
				"desc": "A virtual tabletop for solo RPGs, based on Ironsworn"
			},
			{
				"name": "Fusake Play Aid",
				"url": "https://docs.google.com/document/d/191sfXfcrxars0CXgLNN54eCoQRsuPmyd5Qe-IS5Vlhg/view",
				"desc": "Microsoft Excel play-aid for solo Ironsworn play"
			},
			{
				"name": "Iron Fellowship",
				"url": "https://iron-fellowship.scottbenton.dev/",
				"desc": "Synced character sheet and campaign manager for Ironsworn"
			},
			{
				"name": "Iron Journal",
				"url": "https://nboughton.uk/apps/ironsworn-campaign/",
				"desc": "Tools and references for running and journaling Ironsworn games"
			},
			{
				"name": "Iron Vault",
				"url": "https://ironvault.quest",
				"desc": "Ironsworn/Starforged plugin for [Obsidian](https://obsidian.md/)"
			},
			{
				"name": "IronWriter",
				"url": "https://github.com/SHiLLySiT/IronWriter/blob/master/readme.md",
				"desc": "Writing tool for solo Ironsworn playthroughs"
			},
			{
				"name": "Ironsmith Expanded Oracles Module for FoundryVTT",
				"url": "https://foundryvtt.com/packages/ironsmith-expanded-oracles",
				"desc": "A FoundryVTT compendium of the Ironsmith oracles for Ironsworn"
			},
			{
				"name": "Ironsworn Character Creation Questions",
				"url": "https://www.drivethrurpg.com/product/392486/Ironsworn-Character-Creation-Questions?affiliate_id=844973",
				"desc": "Questions to help build NPC relationships"
			},
			{
				"name": "Ironsworn Companion",
				"url": "https://gcoulby.github.io/IronswornCompanion/",
				"desc": "Digital companion for the tabletop RPG Ironsworn"
			},
			{
				"name": "Ironsworn Generators by rsek",
				"url": "https://perchance.org/rsek-ironsworn-generators",
				"desc": "Collection of random generators for Ironsworn"
			},
			{
				"name": "Ironsworn and Starforged for Foundry VTT",
				"url": "https://github.com/ben/foundry-ironsworn",
				"desc": "Ironsworn, Delve and Starforged for Foundry Virtual Tabletop"
			},
			{
				"name": "Ironsworn for Role",
				"url": "https://app.playrole.com/sheet-templates/bbc0c65a-ironsworn-starforged/save",
				"desc": "Ironsworn character sheet for Role"
			},
			{
				"name": "Ironsworn for Tabletop Simulator",
				"url": "https://steamcommunity.com/sharedfiles/filedetails/?id=1545126579",
				"desc": "Ironsworn module for Tabletop Simulator"
			},
			{
				"name": "Ironsworn Numbers Spreadsheet",
				"url": "https://www.dropbox.com/s/m16aazqk3t7ashd/Ironsworn%20-%20Public%20iPad%20v%200-7.numbers?dl=0",
				"desc": "Spreadsheet for Ironsworn solo play"
			},
			{
				"name": "isscrolls",
				"url": "https://github.com/thexhr/isscrolls",
				"desc": "Command line player toolkit for Ironsworn"
			},
			{
				"name": "Pocketforge",
				"url": "https://rockpaperstory.com/pocketforge",
				"desc": "Ironsworn & Starforged companion app"
			},
			{
				"name": "SectorCrucible",
				"url": "https://lucatabone.com/sector-crucible/",
				"desc": "Starforged universe procedural generator"
			},
			{
				"name": "Sector Forge",
				"url": "https://sector-forge.linkon.click/",
				"desc": "Procedural sector generator for Ironsworn: Starforged"
			},
			{
				"name": "Starforged Asset Workbench",
				"url": "https://starforged-asset-workbench.vercel.app",
				"desc": "Tool for creating custom assets with Starforged's aesthetic"
			},
			{
				"name": "Starforged Crew Sheet",
				"url": "https://jaderavens.itch.io/starforged-crew-sheet",
				"desc": "Interactive playkit for group/solo play in Google Sheets"
			},
			{
				"name": "Starforged Custom Oracles Module for FoundryVTT",
				"url": "https://foundryvtt.com/packages/starforged-custom-oracles",
				"desc": "A FoundryVTT compendium of the fan-created oracles for the Ironsworn: Starforged system"
			},
			{
				"name": "Starforged Sectors Discord Bot",
				"url": "https://github.com/Ferretsroq/Starforged-Sectors",
				"desc": "Display, create, and explore sectors in Discord"
			},
			{
				"name": "Starforged Numbers Spreadsheet",
				"url": "https://www.dropbox.com/s/ge40xrazw0c9ng1/Starforged%20Public%20v2.5.numbers?dl=0",
				"desc": "Spreadsheet for Starforged solo play"
			},
			{
				"name": "Starsmith Expanded Oracles Module for FoundryVTT",
				"url": "https://foundryvtt.com/packages/starsmith-expanded-oracles",
				"desc": "A FoundryVTT compendium of the Starsmith oracles for the Ironsworn: Starforged system"
			},
			{
				"name": "Sticky Starforged",
				"url": "https://jaderavens.itch.io/sticky-starforged",
				"desc": "Print Starforged progress tracks, clocks, and more directly onto sticky notes"
			},
			{
				"name": "TheOracle",
				"url": "https://github.com/XenotropicDev/TheOracle",
				"desc": "Discord bot for Ironsworn, with a focus on play-by-post games"
			}
		]
	},
	{
		"id": "resources",
		"title_en": "Resources",
		"title_tr": "Kaynaklar",
		"icon": "papers",
		"items": [
			{
				"name": "Character-Centric Packs",
				"url": "https://www.drivethrurpg.com/browse/pub/14520/Samuel-Rondn/subcategory/32227_36337/CharacterCentric-Packs-for-the-Ironsworn-System?affiliate_id=844973",
				"desc": "Character building card sets for Ironsworn"
			},
			{
				"name": "Condensed Truths",
				"url": "https://jaderavens.itch.io/condensed-truths",
				"desc": "Single-page truths worksheets for Ironsworn, Starforged & Sundered Isles"
			},
			{
				"name": "DataForged",
				"url": "https://github.com/rsek/dataforged",
				"desc": "Starforged rules data in JSON format"
			},
			{
				"name": "DataSworn",
				"url": "https://github.com/rsek/datasworn",
				"desc": "Ironsworn rules data in JSON format"
			},
			{
				"name": "Eidolon Flight Manual",
				"url": "https://jaderavens.itch.io/eidolon-flight-manual",
				"desc": "Comprehensive play aid and sector maps for drift pilots in the Forge"
			},
			{
				"name": "Forge Codex",
				"url": "https://www.drivethrurpg.com/en/product/490797/forge-codex-001?affiliate_id=844973",
				"desc": "Modular supplement with locations, characters, and encounters for Starforged"
			},
			{
				"name": "Iron Atlas",
				"url": "https://jaderavens.itch.io/iron-atlas-omnibus",
				"desc": "Explore the Ironlands with 100 hand-drawn maps, plus oracles for weather, flora, & fauna"
			},
			{
				"name": "Ironforged V1",
				"url": "https://nqjasmine.itch.io/ironforged-v1",
				"desc": "A short guide to adapt Starforged to be set in the Ironlands, with printable adapted Ironsworn asset cards"
			},
			{
				"name": "Ironlands Hand-Drawn Map",
				"url": "https://notofthisworld.itch.io/ironlands-map",
				"desc": "Hand-drawn map of the Ironlands, in both black and white and color"
			},
			{
				"name": "Ironsmith",
				"url": "https://www.drivethrurpg.com/product/351813/Ironsmith?affiliate_id=844973",
				"desc": "Supplemental oracles, assets, locations, vows and more"
			},
			{
				"name": "Ironsworn Half-Page Worksheets",
				"url": "https://notofthisworld.itch.io/ironsworn-half-page-worksheets",
				"desc": "Half-page versions of the character, progress, vow and Delve worksheets"
			},
			{
				"name": "Ironsworn Pocket Refs",
				"url": "https://notofthisworld.itch.io/ironsworn-pocket-refs",
				"desc": "Pocket-sized reference of Ironsworn Moves"
			},
			{
				"name": "Ironsworn Starforged Move Cards and Their Oracles",
				"url": "https://lancelol.itch.io/starforged-move-cards",
				"desc": "All Starforged moves on double-sided, 63x88mm cards"
			},
			{
				"name": "Lodestone",
				"url": "https://jaderavens.itch.io/lodestone",
				"desc": "Fillable story sheet oracle for Ironsworn campaigns"
			},
			{
				"name": "Minimalist Starforged Character Sheet",
				"url": "https://mendercap.itch.io/minimalist-starforged-character-sheet",
				"desc": "Simple character sheet for Starforged and Sundered Isles"
			},
			{
				"name": "Minimalist Sundered Isles Command Sheet",
				"url": "https://mendercap.itch.io/minimalist-sundered-isles-command-sheet",
				"desc": "Simple command ship sheet for Sundered Isles"
			},
			{
				"name": "Rhoam's Oracle Decks",
				"url": "https://rhoam.itch.io/",
				"desc": "Ironsworn and weather oracles in card format, in English and French"
			},
			{
				"name": "Starforged Half-Page Worksheets",
				"url": "https://drive.google.com/file/d/1WYVxnzkRElXK9ho4W3P8oDaycblYEkck/view",
				"desc": "Half-page versions of the character, sector, progress, and connection worksheets"
			},
			{
				"name": "Starforged Moves Starter",
				"url": "https://akavel.itch.io/starforged-moves-starter",
				"desc": "Cheatsheet of the most important moves in Starforged, aimed especially at new players"
			},
			{
				"name": "Starforged Notebook",
				"url": "https://evil-wayne.itch.io/starforged-notebook",
				"desc": "All-in-one campaign notebook for Starforged"
			},
			{
				"name": "Starforged Player Move Cards",
				"url": "https://drive.google.com/drive/folders/1P4cDrnGzTrNpNrZFh-3oL2VB-f7pS4U4",
				"desc": "All Starforged moves (except the Session moves) in standard \"poker\" card size"
			},
			{
				"name": "Starforged Progress Cards",
				"url": "https://jeremyteeter.itch.io/ironsworn-starforged-progress-cards",
				"desc": "Printable progress tracking cards for Starforged in standard \"poker\" card size"
			},
			{
				"name": "Starsmith Expanded Oracles",
				"url": "https://preview.drivethrurpg.com/en/product/417619/Starsmith-Expanded-Oracles?affiliate_id=844973",
				"desc": "Supplemental oracles for Starforged"
			},
			{
				"name": "Starswoosh",
				"url": "https://www.drivethrurpg.com/en/product/443900/Starswoosh-An-Ironsworn-Starforged-Quick-Reference-For-Your-eReader?affiliate_id=844973",
				"desc": "Starforged quick reference for e-readers"
			},
			{
				"name": "Tarot Sworn Sheet",
				"url": "https://nightjargames.itch.io/tarot-sworn-sheet",
				"desc": "Tarot-themed character sheet for Ironsworn"
			},
			{
				"name": "Traveler's Ironsworn",
				"url": "https://www.drivethrurpg.com/product/301866/Travelers-Ironsworn-Playkit?affiliate_id=844973",
				"desc": "Compact move, oracle, worksheets and character sheets for Ironsworn"
			},
			{
				"name": "Traveler's Starforged",
				"url": "https://www.drivethrurpg.com/en/product/495130/traveler-s-starforged-diy-edition?affiliate_id=844973",
				"desc": "Compact move and oracle reference for Starforged"
			}
		]
	},
	{
		"id": "hacks-and-homebrew",
		"title_en": "Hacks and homebrew",
		"title_tr": "Hack'ler & Homebrew",
		"icon": "magic",
		"items": [
			{
				"name": "Ancient Wonders",
				"url": "https://www.drivethrurpg.com/en/product/505365/ancient-wonders?affiliate_id=844973",
				"desc": "Explore the galaxy with new mechanics and generators for solar systems, planets, alien megastructure and more"
			},
			{
				"name": "Arcanum",
				"url": "https://www.drivethrurpg.com/product/368750/Arcanum-High-Magic-for-Ironsworn?affiliate_id=844973",
				"desc": "High magic for Ironsworn"
			},
			{
				"name": "Atomsworn",
				"url": "https://www.drivethrurpg.com/product/285005/Atomsworn-A-Post-Nuclear-Primer-Powered-by-Ironsworn-SRD?affiliate_id=844973",
				"desc": "Modern/sci-fi post-apocalyptic setting primer for Ironsworn"
			},
			{
				"name": "Bladesworn",
				"url": "https://drive.google.com/file/d/1HUyXWTDGdLddZygFyPt-NHAhUVGobwxJ/view?usp=sharing",
				"desc": "A simplified Blades in the Dark ruleset for Ironsworn"
			},
			{
				"name": "Bloodsworn",
				"url": "https://drive.google.com/file/d/104B93Fw6hpN4Cagr6TtyDvsh4VgHk-5F/view",
				"desc": "A tabletop roleplaying game in which you play the role of a vampire"
			},
			{
				"name": "Cyberforged",
				"url": "https://the-homebrewster.itch.io/cyberforged",
				"desc": "Cyberpunk setting for Starforged (a successor to Cybersworn)"
			},
			{
				"name": "Cybersworn",
				"url": "https://the-homebrewster.itch.io/cybersworn",
				"desc": "Cyberpunk setting for Starforged"
			},
			{
				"name": "Darkest Delves",
				"url": "https://jaderavens.itch.io/darkest-delves",
				"desc": "Torchlight and darkness for Ironsworn: Delve"
			},
			{
				"name": "Darkest Derelicts",
				"url": "https://jaderavens.itch.io/darkest-derelicts",
				"desc": "Rules for Starforged, inspired by The Expanse and Alien"
			},
			{
				"name": "Deck of Many Fortunes",
				"url": "https://www.drivethrurpg.com/product/382532?affiliate_id=844973",
				"desc": "Tarot deck offering blessings and malisons for Ironsworn and Starforged"
			},
			{
				"name": "Delves & Denizens",
				"url": "https://delves-n-denizens.tumblr.com/",
				"desc": "Ironsworn addon focused on classical fantasy"
			},
			{
				"name": "DungeonSworn",
				"url": "https://drive.google.com/drive/folders/1-2HeceIG9VnkPdOVaJKWcHq3zfA78X4l",
				"desc": "A dungeon delving adventure supplement"
			},
			{
				"name": "Dwellers Under the High Grave",
				"url": "https://mendercap.itch.io/dwellers-under-the-high-grave",
				"desc": "A setting drawing inspiration from the history, folklore and landscapes of Ukraine"
			},
			{
				"name": "Elegy",
				"url": "https://miraclem.itch.io/elegy",
				"desc": "Solo role playing game about being a vampire and surviving the big city nights"
			},
			{
				"name": "Elementsworn",
				"url": "https://satan-bouchuncoin.itch.io/elementsworn",
				"desc": "Readapt Ironsworn to the the _Avatar: The Last Airbender_ setting"
			},
			{
				"name": "Feats & Favors",
				"url": "https://satan-bouchuncoin.itch.io/feats-favors",
				"desc": "Faction and reputation system for Ironsworn and Starforged"
			},
			{
				"name": "FurSworn",
				"url": "https://notofthisworld.itch.io/fursworn",
				"desc": "Anthropomorphic animal supplement"
			},
			{
				"name": "Glina",
				"url": "https://www.drivethrurpg.com/product/400633/Glina--kryminalna-gra-fabularna?affiliate_id=844973",
				"desc": "Become a police officer assigned to crack unsolved murder cases. Rulebook in Polish"
			},
			{
				"name": "Herosworn",
				"url": "https://docs.google.com/document/d/1ttFFH8Ul7NlXhWw8vOr39YIx6FHcKuaC_Uueaf6f0B0/view",
				"desc": "Ironsworn for super heroes"
			},
			{
				"name": "Hogsworn",
				"url": "https://arkh.itch.io/hogsworn",
				"desc": "Ironsworn hack to play as a student at Hogwarts"
			},
			{
				"name": "HyperCity",
				"url": "https://newmadras.itch.io/hypercity",
				"desc": "A cyberpunk hack of Ironsworn"
			},
			{
				"name": "Investigation Hack by rsek",
				"url": "https://drive.google.com/drive/folders/1_tKqEn-iKDFyfzrNYgvVlzZuHOu1pUmc",
				"desc": "An investigation hack for Ironsworn"
			},
			{
				"name": "Iron Degenerates",
				"url": "https://drive.google.com/file/d/12iPtYAHlUJ_WMJIDqfTqgA2Sm44ayddV/view",
				"desc": "Bringing the Dungeon Degenerates setting to Ironsworn"
			},
			{
				"name": "Iron in the Blood",
				"url": "https://www.drivethrurpg.com/product/309460/Iron-in-the-Blood?affiliate_id=844973",
				"desc": "Supplement in which in which you play vampires struggling through the epochs of time"
			},
			{
				"name": "Iron Valley",
				"url": "https://mkirin.itch.io/iron-valley",
				"desc": "A cozy, simplified Ironsworn and Starforged hack focusing on small town life, fulfilling promises, and making the most of each day"
			},
			{
				"name": "Iron Witcher",
				"url": "https://drive.google.com/drive/folders/1jPPTgfWyYyIhLPbqn8qwplWdr4UPhFy-",
				"desc": "Assets cards for The Witcher setting, in Portuguese"
			},
			{
				"name": "Ironcrunch",
				"url": "https://www.patreon.com/posts/ironcrunch-35463893",
				"desc": "A crunchy Ironsworn supplement"
			},
			{
				"name": "Ironmons",
				"url": "https://docs.google.com/document/d/1MPLxI_RdVdhqvvvAbjXAt1PnKJ11CMZg4V6NTT7BNx0/",
				"desc": "An Ironsworn Pokemon hack"
			},
			{
				"name": "Ironspheres",
				"url": "https://neonpico.itch.io/ironspheres",
				"desc": "A magical system inspired by the _Mage: The Ascension_ game system"
			},
			{
				"name": "Ironsworn Flavor Packs",
				"url": "https://www.drivethrurpg.com/product/374949/Ironsmith-Flavor-Packs?affiliate_id=844973",
				"desc": "Japanese, South American and Norse setting card packs"
			},
			{
				"name": "Ironsworn Foes & Fights",
				"url": "https://drive.google.com/drive/folders/1tB_Hyw_b1GEtTV5MRugL-YmNP74NfJUp",
				"desc": "An Ironsworn hack adding more mechanical context to fights"
			},
			{
				"name": "Ironsworn Nemesis",
				"url": "https://gceh.itch.io/ironsworn-nemesis",
				"desc": "Generate nemeses when defeated, a hack for Ironsworn and Starforged"
			},
			{
				"name": "Ironsworn Winterhall",
				"url": "https://drive.google.com/file/d/160Ki8oVab0yZdlPUwHWROKIe8ILaTzNd/view",
				"desc": "Put down roots in the Ironlands"
			},
			{
				"name": "Ironsworn: Badlands",
				"url": "https://kstetson.itch.io/ironsworn-badlands",
				"desc": "Western setting supplement"
			},
			{
				"name": "Ironsworn: Reign",
				"url": "https://www.drivethrurpg.com/product/419256/Ironsworn-Reign?affiliate_id=844973",
				"desc": "Settlement mechanics for Ironsworn"
			},
			{
				"name": "Justice Sworn",
				"url": "https://sandypuggames.itch.io/justice-sworn",
				"desc": "Ironsworn in a side scrolling beat-em-up setting"
			},
			{
				"name": "Knight Frame",
				"url": "https://seraguith.itch.io/knight-frame",
				"desc": "Add high-speed humanoid mech battles to your Starforged campaign"
			},
			{
				"name": "Kybersworn",
				"url": "https://drive.google.com/drive/folders/1bnhf7ha5IOuDgiCYl2JOyzyVDum2qPDx",
				"desc": "A Star Wars-themed supplement for Ironsworn"
			},
			{
				"name": "Legacy Iron",
				"url": "https://www.drivethrurpg.com/en/product/534886/legacy-iron-starforged-asset-pack?affiliate_id=844973",
				"desc": "Asset pack for Starforge, based on the original Ironsworn assets"
			},
			{
				"name": "Mistsworn",
				"url": "https://docs.google.com/document/d/1dTLl2rLMmJ0MQfs2BOKu_WxEWEJ6gpQQf1jaSyMK-pY/",
				"desc": "A City of Mist / Ironsworn hybrid hack"
			},
			{
				"name": "Modern Domains for Ironsworn by Stephanie M",
				"url": "https://drive.google.com/file/d/13KBv58Pq836vWLwDOK9qGYcCK8asK-O8/view",
				"desc": "Modern domain oracles"
			},
			{
				"name": "MÖRKSWORN",
				"url": "https://chaoclypse.itch.io/morksworn",
				"desc": "Conversion rules for MÖRK BORG magic, weapons and enemies to Ironsworn"
			},
			{
				"name": "Noironsworn",
				"url": "https://drive.google.com/file/d/1O9411BV4jsNNWT5FZZ1MFRCK2jDCjAfd/view",
				"desc": "An investigation supplement"
			},
			{
				"name": "On Hollow Roads",
				"url": "https://drive.google.com/file/d/1-Ye9rHOTPejGRSjk3SKRHKiLpVOCozDJ/view",
				"desc": "An Ironsworn supplement set in a haunted, surrealist American landscape"
			},
			{
				"name": "Order of the Falcon",
				"url": "https://drakonspyre.itch.io/order-of-the-falcon",
				"desc": "Assassin's Creed inspired Ironsworn supplement"
			},
			{
				"name": "The Orphans of Ragnarökr",
				"url": "https://www.drivethrurpg.com/product/361512?affiliate_id=844973",
				"desc": "A post-apocalyptic/Ragnarok Viking setting"
			},
			{
				"name": "The Outer Edge",
				"url": "https://drive.google.com/drive/folders/1oVed10NZgiSniJG2sbXm40-7O59conPU",
				"desc": "A spacefaring supplement for Ironsworn"
			},
			{
				"name": "Pinkysworn",
				"url": "https://www.drivethrurpg.com/product/405015/Pinkysworn?affiliate_id=844973",
				"desc": "Ironcampers swear pinky promises in a summercamp-themed abbreviation of the Ironsworn rules"
			},
			{
				"name": "Ringsworn",
				"url": "https://www.dropbox.com/s/72tq31pxzqc7bx0/Ringsworn.pdf?dl=0",
				"desc": "Ironsworn rules grafted onto The One Ring dice mechanics"
			},
			{
				"name": "Shadowsworn: Haunts",
				"url": "https://nightsandweekends.itch.io/shadowsworn-haunts",
				"desc": "Frameworks for modern horror games"
			},
			{
				"name": "Silently Sworn",
				"url": "https://silentlysworn.wordpress.com/",
				"desc": "A cosmic horror supplement"
			},
			{
				"name": "SnowForged",
				"url": "https://mmcv.itch.io/ironsworn-snowforged",
				"desc": "A stripped-down ruleset for playing short, fun, Christmas-themed adventures"
			},
			{
				"name": "Solar Crown Online",
				"url": "https://umbralaeronaut.itch.io/solar-crown-online",
				"desc": "Undertake perilous quests in the world of Solar Crown Online, a wildly-popular MMORPG"
			},
			{
				"name": "Space Sightings Expanded",
				"url": "https://www.drivethrurpg.com/product/426718?affiliate_id=844973",
				"desc": "Generators for wonders you might discover while voyaging through space"
			},
			{
				"name": "Spellforge",
				"url": "https://rockpaperstory.itch.io/spellforge",
				"desc": "Magic supplement with custom spells and narrative focus, compatible with all variants of Ironsworn"
			},
			{
				"name": "Spiritbound",
				"url": "https://mstrocks.itch.io/spiritbound",
				"desc": "A Studio Ghibli hack of Ironsworn"
			},
			{
				"name": "Starforged Oracles for Fantasy Settings",
				"url": "https://www.patreon.com/posts/starforged-for-73094405",
				"desc": "Numerous oracles for fantasy settings in Starforged"
			},
			{
				"name": "Steelforged",
				"url": "https://drive.google.com/drive/folders/1X7P2R-rD_89fMWR8JiYKDk5lm62UPhfL",
				"desc": "High fantasy supplements for Starforged"
			},
			{
				"name": "Stonebound",
				"url": "https://s0randme.itch.io/stonebound",
				"desc": "A stone-age stone and sorcery setting for Ironsworn"
			},
			{
				"name": "Summer Camp Mystery",
				"url": "https://www.drivethrurpg.com/product/404832/Summer-Camp-Mystery?affiliate_id=844973",
				"desc": "Family summercamp investigation with simplified rules"
			},
			{
				"name": "Supersworn",
				"url": "https://drive.google.com/drive/folders/1THcUielU0wvcyZAAwUtqDT-J95XlyQvc",
				"desc": "Superhero hack for Starforged"
			},
			{
				"name": "Sworn by Ghostlight",
				"url": "https://yuigaron.itch.io/sworn-by-ghostlight",
				"desc": "Hunt a serial killer in a haunted Victorian era London-like city"
			},
			{
				"name": "Time Traveler",
				"url": "https://lemunde.itch.io/ironsworn-starforged-time-traveler",
				"desc": "Tools for working with time travel for Starforged"
			},
			{
				"name": "Threads of Destiny",
				"url": "https://wraithdrof.itch.io/threads-of-destiny",
				"desc": "Create a destiny deck to weave plot threads into your characters story"
			},
			{
				"name": "Under Contract",
				"url": "https://docs.google.com/document/d/1K1Cr1F1MABw8h-Hm-YL7DH4V9VLmq2Ezn9PEcOsuw-o/",
				"desc": "A cyberpunk hack for Ironsworn"
			},
			{
				"name": "Vaults & Vows",
				"url": "https://ludicpen.itch.io/vaults-and-vows",
				"desc": "Classic fantasy roleplaying supplement"
			},
			{
				"name": "The 'Verse",
				"url": "https://jaderavens.itch.io/starforged-the-verse",
				"desc": "_Firefly_ setting kit for Starforged"
			},
			{
				"name": "Vigilance",
				"url": "https://maxb.fm/vigilance",
				"desc": "Espionage and deceit in a 1950s wizarding world setting, an Ironsworn conversion"
			},
			{
				"name": "Voidforged",
				"url": "https://kerys.itch.io/voidforged",
				"desc": "A sci-fi horror supplement for Starforged"
			},
			{
				"name": "Winsome",
				"url": "https://elstiko.itch.io/winsome",
				"desc": "Stripped-down, setting-less hack of Ironsworn"
			},
			{
				"name": "Your Legends of Iron",
				"url": "https://anarisis.itch.io/patreon-papers-021",
				"desc": "Zelda-themed truths for Ironsworn"
			}
		]
	},
	{
		"id": "game-jams",
		"title_en": "Game jams",
		"title_tr": "Oyun Jam'leri",
		"icon": "dice",
		"items": [
			{
				"name": "Coalitions of Ironsworn and Starforged",
				"url": "https://itch.io/jam/coalitions-of-ironsworn-and-starforged/entries",
				"desc": ""
			},
			{
				"name": "Ironsworn Jam 1",
				"url": "https://itch.io/jam/ironsworn-jam-1/entries",
				"desc": ""
			},
			{
				"name": "Starforged 2022 Jam",
				"url": "https://itch.io/jam/starforged-2022-jam/entries",
				"desc": ""
			},
			{
				"name": "Starforged 2023 Jam",
				"url": "https://itch.io/jam/starforged-2023-jam/entries",
				"desc": ""
			},
			{
				"name": "Starforged: Ancient Connections Jam",
				"url": "https://itch.io/jam/starforged-ancient-connections/entries",
				"desc": ""
			}
		]
	},
	{
		"id": "adventure-starters-and-scenarios",
		"title_en": "Adventure starters and scenarios",
		"title_tr": "Macera Başlangıçları & Senaryolar",
		"icon": "compass",
		"items": [
			{
				"name": "Cargoth: Ruinous Edition",
				"url": "https://croakerrpgs.itch.io/cargoth-ruinous-edition",
				"desc": "A lost city, a great power, riches to be made and an ancient curse.  Cargoth has many perils and opportunities for an enterprising Ironsworn traveller",
				"group": "Ironsworn"
			},
			{
				"name": "Escape",
				"url": "https://drakonspyre.itch.io/escape-a-starter-adventure-for-ironsworn",
				"desc": "Escape the dungeon",
				"group": "Ironsworn"
			},
			{
				"name": "Hadley's Beast",
				"url": "https://drakonspyre.itch.io/hadleys-beast",
				"desc": "Take on the role of investigator and monster hunter as the village of Hadley's Grove is beset by a terrible horror",
				"group": "Ironsworn"
			},
			{
				"name": "Quest Fronts",
				"url": "https://www.drivethrurpg.com/product/360541/Quest-Fronts--Issue-1?affiliate_id=844973",
				"desc": "Various adventure starters inspired by Dungeon World campaign fronts",
				"group": "Ironsworn"
			},
			{
				"name": "Sea Beast",
				"url": "https://croakerrpgs.itch.io/sea-beast",
				"desc": "An adventure starter about a village plagued by a sea monster",
				"group": "Ironsworn"
			},
			{
				"name": "The Selkie Envoy",
				"url": "https://chihuahuazero.itch.io/the-selkie-envoy",
				"desc": "An adventure module for icy regions",
				"group": "Ironsworn"
			},
			{
				"name": "Adventures in the Forge",
				"url": "https://drakonspyre.itch.io/adventures-in-the-forge",
				"desc": "A collection of quest starters",
				"group": "Starforged"
			},
			{
				"name": "New Canaan Run",
				"url": "https://jaderavens.itch.io/new-canaan-run",
				"desc": "Six sector starters for smugglers in The 'Verse.",
				"group": "Starforged"
			},
			{
				"name": "The Ferrum Mysteries",
				"url": "https://croakerrpgs.itch.io/the-ferrum-mysteries",
				"desc": "Explore the mystery behind the iron pillars",
				"group": "Starforged"
			},
			{
				"name": "Rise & Shiningstar",
				"url": "https://www.gatling.xyz/rise-and-shiningstar/",
				"desc": "Find out what happened to the settlement Shiningstar",
				"group": "Starforged"
			}
		]
	}
];
