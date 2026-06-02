<script lang="ts">
	// Bir hamlenin anatomisi — örnek "Bilgi Topla" (PDF s.7 yeniden çizimi, Türkçe).
</script>

<div class="ma">
	<div class="card">
		<div class="row name-row">
			<h4>Bilgi Topla</h4>
			<span class="tag">← Hamlenin adı</span>
		</div>
		<p class="trigger">
			<span class="tag inline">Tetik →</span>
			<strong>Bir alanı araştırdığında, sorular sorduğunda ya da iz sürdüğünde</strong>, zar at +Wits.
			Bağ paylaştığın biriyle konuşuyorsan +1 ekle.
			<span class="tag inline a">↑ Hangi stat eklenir</span>
		</p>
		<div class="outcomes">
			<div class="oc ok"><b>Güçlü Başarı:</b> Yararlı, net bir şey öğrenirsin. +2 momentum.</div>
			<div class="oc weak"><b>Zayıf Başarı:</b> Öğrendiğin şey işleri karmaşıklaştırır. +1 momentum.</div>
			<div class="oc miss"><b>Başarısızlık:</b> Araştırman korkunç bir tehdit açığa çıkarır. <em>Bedelini Öde.</em></div>
		</div>
		<span class="tag out-tag">↑ Üç sonuç düzeyi: Güçlü / Zayıf Başarı ve Başarısızlık</span>
	</div>
</div>

<style>
	.ma { display: flex; justify-content: center; }
	.card {
		max-width: 460px; width: 100%;
		background: var(--bg-2); border: 1px solid var(--accent); border-radius: var(--radius);
		padding: 1.1rem 1.2rem; display: flex; flex-direction: column; gap: 0.7rem;
		box-shadow: 0 0 0 4px var(--accent-glow);
	}
	.name-row { display: flex; align-items: baseline; gap: 0.6rem; }
	.card h4 { font-family: var(--font-display); color: var(--accent); font-size: 1.1rem; margin: 0; }
	.trigger { font-size: 0.9rem; color: var(--text-2); line-height: 1.6; }
	.trigger strong { color: var(--text-1); font-style: italic; }
	.outcomes { display: flex; flex-direction: column; gap: 0.4rem; }
	.oc { font-size: 0.85rem; padding: 0.4rem 0.6rem; border-radius: 4px; border-left: 3px solid var(--border); color: var(--text-2); }
	.oc b { color: var(--text-1); }
	.oc.ok { background: #16291d; border-left-color: #5a9a6a; }
	.oc.weak { background: #2a2618; border-left-color: var(--accent); }
	.oc.miss { background: #2a1a1a; border-left-color: var(--danger); }
	.oc.miss em { color: var(--danger); font-style: italic; }
	.tag { font-size: 0.68rem; letter-spacing: 0.04em; color: var(--text-3); white-space: nowrap; }
	.tag.inline { display: inline-block; }
	.tag.a { color: var(--accent-2); }
	.out-tag { align-self: flex-start; }
</style>
