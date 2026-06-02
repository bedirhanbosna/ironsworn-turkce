<script lang="ts">
	// Eylem Atışı diyagramı — Türkçe etiketli (PDF s.8 yeniden çizimi).
</script>

<div class="ar">
	<div class="dice-row">
		<div class="grp">
			<div class="dice">
				<span class="d10">4</span>
				<span class="d10">8</span>
			</div>
			<span class="lbl">Zorluk Zarları · 2d10</span>
		</div>
		<div class="grp">
			<div class="dice">
				<span class="d6">3</span>
			</div>
			<span class="lbl">Eylem Zarı · d6</span>
		</div>
	</div>

	<div class="formula">
		<span class="d6 sm">3</span>
		<span class="op">+</span>
		<span class="chip">Stat <b>2</b></span>
		<span class="op">+</span>
		<span class="chip">Ekler <b>1</b></span>
		<span class="op">=</span>
		<span class="score">6</span>
		<span class="score-lbl">Eylem Skoru</span>
	</div>

	<div class="compare">
		<span class="score sm">6</span>
		<span class="vs">karşılaştır</span>
		<span class="d10 res ok">4 ✓</span>
		<span class="d10 res no">8 ✗</span>
	</div>

	<ul class="legend">
		<li><span class="dot ok"></span> İki zarı da geçersen → <b>Güçlü Başarı</b></li>
		<li><span class="dot half"></span> Yalnızca birini geçersen → <b>Zayıf Başarı</b></li>
		<li><span class="dot no"></span> Hiçbirini geçemezsen → <b>Başarısızlık</b></li>
	</ul>
	<p class="note">Eylem skoru asla 10'u geçmez; üstü yok sayılır.</p>
</div>

<style>
	.ar {
		background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--radius);
		padding: 1.25rem; display: flex; flex-direction: column; gap: 1.1rem; align-items: center;
	}
	.dice-row { display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; }
	.grp { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
	.dice { display: flex; gap: 0.6rem; }
	.lbl { font-size: 0.7rem; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-3); }

	.d10, .d6 {
		display: grid; place-items: center;
		width: 3rem; height: 3rem;
		font-family: var(--font-display); font-weight: 700; font-size: 1.25rem;
		color: var(--text-1);
	}
	.d10 { background: var(--bg-4); border: 2px solid var(--accent-2); border-radius: 6px; }
	.d6 { background: var(--bg-4); border: 2px solid var(--accent); border-radius: 8px; }
	.sm { width: 2.4rem; height: 2.4rem; font-size: 1rem; }

	.formula, .compare { display: flex; align-items: center; gap: 0.55rem; flex-wrap: wrap; justify-content: center; }
	.op { color: var(--text-3); font-size: 1.2rem; }
	.chip {
		background: var(--bg-3); border: 1px solid var(--border); border-radius: 999px;
		padding: 0.25rem 0.7rem; font-size: 0.82rem; color: var(--text-2);
	}
	.chip b { color: var(--text-1); }
	.score {
		display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%;
		background: radial-gradient(circle at 35% 30%, var(--accent-glow), transparent 70%), var(--bg-3);
		border: 2px solid var(--accent); color: var(--accent);
		font-family: var(--font-display); font-weight: 700; font-size: 1.3rem;
	}
	.score-lbl, .vs { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-3); }
	.res { font-size: 0.95rem; }
	.res.ok { border-color: #5a9a6a; color: #7ec89a; }
	.res.no { border-color: var(--danger); color: var(--danger); }

	.legend { list-style: none; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.88rem; color: var(--text-2); align-self: stretch; }
	.legend b { color: var(--text-1); }
	.dot { display: inline-block; width: 0.7rem; height: 0.7rem; border-radius: 50%; margin-right: 0.4rem; vertical-align: middle; }
	.dot.ok { background: #7ec89a; }
	.dot.half { background: var(--accent); }
	.dot.no { background: var(--danger); }
	.note { font-size: 0.78rem; color: var(--text-3); font-style: italic; }
</style>
