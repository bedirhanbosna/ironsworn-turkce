#!/usr/bin/env node
// Çevrilecek tüm stringleri data/source/classic.json'dan çıkarır.
// Varolan tr değerlerini korur (resumable).
// Çıktı: data/i18n/classic/strings.todo.json
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const src = JSON.parse(readFileSync('data/source/classic.json', 'utf8'));
const outPath = 'data/i18n/classic/strings.todo.json';

// Varolan çevirileri yükle (varsa)
const existing: Record<string, { en: string; tr: string }> = existsSync(outPath)
	? JSON.parse(readFileSync(outPath, 'utf8'))
	: {};

const strings: Record<string, { en: string; tr: string }> = {};

function add(id: string, field: string, en: string) {
	if (!en?.trim()) return;
	const key = `${id}#${field}`;
	strings[key] = { en, tr: existing[key]?.tr ?? '' };
}

// Moves
for (const cat of Object.values(src.moves) as any[]) {
	add(cat._id, 'name', cat.name);
	for (const move of Object.values(cat.contents) as any[]) {
		add(move._id, 'name', move.name);
		add(move._id, 'trigger.text', move.trigger?.text);
		add(move._id, 'text', move.text);
		if (move.outcomes?.strong_hit?.text) add(move._id, 'outcomes.strong_hit.text', move.outcomes.strong_hit.text);
		if (move.outcomes?.weak_hit?.text)   add(move._id, 'outcomes.weak_hit.text',   move.outcomes.weak_hit.text);
		if (move.outcomes?.miss?.text)        add(move._id, 'outcomes.miss.text',        move.outcomes.miss.text);
	}
}

// Oracles (recursive)
function extractOracles(col: any) {
	add(col._id, 'name', col.name);
	if (col.summary) add(col._id, 'summary', col.summary);
	if (col.contents) {
		for (const tbl of Object.values(col.contents) as any[]) {
			add(tbl._id, 'name', tbl.name);
			if (tbl.summary) add(tbl._id, 'summary', tbl.summary);
			if (tbl.column_labels?.text) add(tbl._id, 'column_labels.text', tbl.column_labels.text);
			if (tbl.rows) {
				tbl.rows.forEach((row: any, i: number) => {
					if (row.text) add(tbl._id, `rows.${i}.text`, row.text);
					if (row.detail) add(tbl._id, `rows.${i}.detail`, row.detail);
				});
			}
		}
	}
	if (col.collections) for (const sub of Object.values(col.collections)) extractOracles(sub);
}
for (const col of Object.values(src.oracles)) extractOracles(col);

// Assets
for (const col of Object.values(src.assets) as any[]) {
	add(col._id, 'name', col.name);
	for (const asset of Object.values(col.contents) as any[]) {
		add(asset._id, 'name', asset.name);
		if (asset.requirement) add(asset._id, 'requirement', asset.requirement);
		asset.abilities?.forEach((ab: any, i: number) => {
			add(asset._id, `abilities.${i}.text`, ab.text);
		});
	}
}

// NPCs (recursive)
function extractNpcs(col: any) {
	add(col._id, 'name', col.name);
	if (col.summary) add(col._id, 'summary', col.summary);
	if (col.contents) {
		for (const npc of Object.values(col.contents) as any[]) {
			add(npc._id, 'name', npc.name);
			if (npc.description) add(npc._id, 'description', npc.description);
			if (npc.quest_starter) add(npc._id, 'quest_starter', npc.quest_starter);
			npc.features?.forEach((f: string, i: number) => add(npc._id, `features.${i}`, f));
			npc.drives?.forEach((d: string, i: number) => add(npc._id, `drives.${i}`, d));
			npc.tactics?.forEach((t2: string, i: number) => add(npc._id, `tactics.${i}`, t2));
		}
	}
	if (col.collections) for (const sub of Object.values(col.collections)) extractNpcs(sub);
}
for (const col of Object.values(src.npcs)) extractNpcs(col);

// Truths
for (const truth of Object.values(src.truths) as any[]) {
	add(truth._id, 'name', truth.name);
	truth.options?.forEach((opt: any, i: number) => {
		add(truth._id, `options.${i}.description`, opt.description);
		if (opt.quest_starter) add(truth._id, `options.${i}.quest_starter`, opt.quest_starter);
	});
}

// Atlas (recursive)
function extractAtlas(col: any) {
	add(col._id, 'name', col.name);
	if (col.summary) add(col._id, 'summary', col.summary);
	if (col.contents) {
		for (const entry of Object.values(col.contents) as any[]) {
			add(entry._id, 'name', entry.name);
			if (entry.summary) add(entry._id, 'summary', entry.summary);
			if (entry.description) add(entry._id, 'description', entry.description);
			if (entry.quest_starter) add(entry._id, 'quest_starter', entry.quest_starter);
			entry.features?.forEach((f: string, i: number) => add(entry._id, `features.${i}`, f));
		}
	}
	if (col.collections) for (const sub of Object.values(col.collections)) extractAtlas(sub);
}
if (src.atlas) for (const col of Object.values(src.atlas)) extractAtlas(col);

// Rules (stats, condition_meters, impacts)
for (const [k, stat] of Object.entries(src.rules?.stats ?? {}) as any) {
	add(`classic/rules/stats/${k}`, 'label', stat.label);
	if (stat.description) add(`classic/rules/stats/${k}`, 'description', stat.description);
}
for (const [k, cm] of Object.entries(src.rules?.condition_meters ?? {}) as any) {
	add(`classic/rules/condition_meters/${k}`, 'label', cm.label);
	if (cm.description) add(`classic/rules/condition_meters/${k}`, 'description', cm.description);
}
for (const [k, imp] of Object.entries(src.rules?.impacts ?? {}) as any) {
	add(`classic/rules/impacts/${k}`, 'label', imp.label);
	if (imp.description) add(`classic/rules/impacts/${k}`, 'description', imp.description);
	for (const [ik, item] of Object.entries(imp.contents ?? {}) as any) {
		add(`classic/rules/impacts/${k}/${ik}`, 'label', item.label);
		if (item.description) add(`classic/rules/impacts/${k}/${ik}`, 'description', item.description);
	}
}
for (const [k, st] of Object.entries(src.rules?.special_tracks ?? {}) as any) {
	add(`classic/rules/special_tracks/${k}`, 'label', st.label);
	if (st.description) add(`classic/rules/special_tracks/${k}`, 'description', st.description);
}

mkdirSync('data/i18n/classic', { recursive: true });
writeFileSync(outPath, JSON.stringify(strings, null, '\t'), 'utf8');

const total = Object.keys(strings).length;
const done = Object.values(strings).filter(v => v.tr).length;
console.log(`Extracted ${total} strings. Translated: ${done}/${total}`);
