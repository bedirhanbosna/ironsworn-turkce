<script lang="ts">
	// Karakter sayfası şeması — Türkçe açıklamalı (PDF s.5 yeniden çizimi, sadeleştirilmiş).
	const stats = ['Edge', 'Heart', 'Iron', 'Shadow', 'Wits'];
	const meters = [
		{ key: 'Can', en: 'Health' },
		{ key: 'Ruh', en: 'Spirit' },
		{ key: 'İkmal', en: 'Supply' },
	];
</script>

<div class="cs">
	<div class="block stats">
		<span class="cap">Statlar</span>
		<div class="stat-row">
			{#each stats as s}<span class="stat">{s}</span>{/each}
		</div>
		<p class="exp">Karakterinin temel yönleri; harekete geçerken eylem zarına eklenir.</p>
	</div>

	<div class="grid">
		<div class="block">
			<span class="cap">Antlar & İlerleme İzleri</span>
			<div class="track">{#each Array(10) as _}<span class="box"></span>{/each}</div>
			<p class="exp">Her ant bir <b>dereceye</b> sahiptir (Sıradan → Destansı) ve bir izle takip edilir.</p>
		</div>
		<div class="block">
			<span class="cap">Deneyim</span>
			<div class="track">{#each Array(10) as _}<span class="pip"></span>{/each}</div>
			<p class="exp">Antları tamamladıkça kazanır, yeni Yetenek Kartları almak için harcarsın.</p>
		</div>
	</div>

	<div class="grid">
		<div class="block">
			<span class="cap">Momentum</span>
			<div class="mom"><span>-6</span><span class="mid">0</span><span class="hi">+10</span></div>
			<p class="exp">Gidişatın ölçüsü; <b>+</b> seni öne taşır, <b>−</b> aleyhine işler.</p>
		</div>
		<div class="block">
			<span class="cap">Durum Ölçerleri</span>
			<div class="meters">{#each meters as m}<span class="meter">{m.key}</span>{/each}</div>
			<p class="exp">Mevcut durumun ve hazırlığın: Can, Ruh, İkmal.</p>
		</div>
	</div>

	<div class="block">
		<span class="cap">Olumsuz Etkiler</span>
		<div class="imp">
			<span>Yaralı</span><span>Yıkılmış</span><span>Hazırlıksız</span><span>Yüklü</span>
			<span class="perm">Sakat</span><span class="perm">Yozlaşmış</span><span class="perm">Lanetli</span><span class="perm">Ezilmiş</span>
		</div>
		<p class="exp">Zorluklarla yüzleştikçe işaretlenir; bazıları geçici, bazıları kalıcıdır.</p>
	</div>
</div>

<style>
	.cs {
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		padding: 1.1rem; display: flex; flex-direction: column; gap: 0.7rem;
	}
	.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
	@media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
	.block { background: var(--bg-1); border: 1px solid var(--border); border-radius: 6px; padding: 0.7rem 0.8rem; }
	.cap { font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); display: block; margin-bottom: 0.5rem; }
	.exp { font-size: 0.78rem; color: var(--text-3); line-height: 1.5; margin-top: 0.45rem; }
	.exp b { color: var(--text-2); }

	.stat-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
	.stat {
		font-family: var(--font-display); font-weight: 600; font-size: 0.85rem;
		padding: 0.3rem 0.6rem; border-radius: 5px;
		background: var(--bg-3); border: 1px solid var(--border); color: var(--text-1);
	}
	.track { display: flex; gap: 3px; flex-wrap: wrap; }
	.box { width: 0.9rem; height: 0.9rem; border: 1px solid var(--text-3); border-radius: 2px; }
	.pip { width: 0.6rem; height: 0.6rem; border: 1px solid var(--text-3); border-radius: 50%; }
	.mom { display: flex; justify-content: space-between; align-items: center; font-family: var(--font-display); font-weight: 700; color: var(--text-2); }
	.mom .mid { color: var(--text-3); }
	.mom .hi { color: var(--accent); }
	.meters { display: flex; gap: 0.4rem; }
	.meter { flex: 1; text-align: center; padding: 0.3rem; border-radius: 5px; background: var(--bg-3); border: 1px solid var(--border); font-size: 0.82rem; color: var(--text-1); }
	.imp { display: flex; flex-wrap: wrap; gap: 0.3rem; }
	.imp span { font-size: 0.75rem; padding: 0.18rem 0.5rem; border-radius: 999px; background: var(--bg-3); border: 1px solid var(--border); color: var(--text-2); }
	.imp .perm { border-color: color-mix(in srgb, var(--danger) 45%, transparent); color: #e0a0a0; }
</style>
