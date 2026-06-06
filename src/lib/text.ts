// Markdown'ı düz metne indirger — özet/preview gibi <Markdown> kullanılmayan
// (ör. buton içi başlık) yerlerde ham `[etiket](id:...)` sözdiziminin görünmesini önler.
// Link etiketi korunur, hedef atılır.
export function stripMarkdown(s: string): string {
	return s
		.replace(/\[([^\]]+)\]\((?:id|move):[^)]+\)/g, '$1') // [etiket](id:/move:...) → etiket
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // [etiket](url) → etiket
		.replace(/\{\{table:[^}]+\}\}/g, '') // {{table:...}} tag'ı
		.replace(/__([^_]+)__/g, '$1') // __kalın__
		.replace(/\*([^*]+)\*/g, '$1') // *italik*
		.replace(/`([^`]+)`/g, '$1') // `kod`
		.trim();
}
