<script setup>
// لوحة الأوامر (Ctrl+K): بحث موحّد في الدروس والمصطلحات والأدوات والتحديات
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Icon from './Icon.vue'
import { palette } from '../composables/ui.js'
import { allLessons } from '../content/lessons/index.js'
import { searchTerms, normalize } from '../content/dictionary/index.js'
import { allPractice } from '../content/practice.js'

const router = useRouter()
const q = ref('')
const sel = ref(0)
const input = ref(null)

const TOOLS = [
  { label: 'المحرر', hint: 'HTML وCSS وJS وVue مع معاينة', to: '/editor', icon: 'code' },
  { label: 'شرح الأكواد', hint: 'الصق كودًا واستكشف معناه', to: '/explain', icon: 'lens' },
  { label: 'مختبر CSS', hint: 'Flexbox وGrid والألوان والحركة', to: '/css-lab', icon: 'palette' },
  { label: 'مختبر JavaScript', hint: 'تنفيذ خطوة بخطوة', to: '/js-lab', icon: 'terminal' },
  { label: 'محاكي التنفيذ', hint: 'الذاكرة والاستدعاءات وحلقة الأحداث', to: '/visualizer', icon: 'flow' },
  { label: 'المراجعة', hint: 'بطاقات المراجعة المتباعدة', to: '/review', icon: 'cards' },
  { label: 'الإعدادات والنسخ الاحتياطي', hint: 'تصدير واستيراد التقدّم', to: '/settings', icon: 'gear' },
]

const results = computed(() => {
  const n = normalize(q.value)
  const match = (s) => !n || normalize(s).includes(n)
  const out = []
  for (const t of TOOLS) if (match(`${t.label} ${t.hint}`)) out.push({ ...t, kind: 'أداة' })
  for (const l of allLessons) if (match(`${l.title} ${l.summary} ${l.track}`)) out.push({ label: l.title, hint: l.summary, to: `/learn/${l.id}`, icon: 'path', kind: `درس · ${l.track.toUpperCase()}` })
  for (const p of allPractice) if (match(`${p.title} ${p.summary || p.prompt}`)) out.push({ label: p.title, hint: p.summary || '', to: `/practice/${p.id}`, icon: 'target', kind: p.requirements ? 'مشروع' : 'تحدٍّ' })
  if (n) for (const t of searchTerms(q.value).slice(0, 12)) out.push({ label: `${t.term} — ${t.ar}`, hint: t.meaning, to: `/dictionary/${t.id}`, icon: 'book', kind: 'قاموس' })
  return out.slice(0, 40)
})

watch(q, () => { sel.value = 0 })
watch(() => palette.open, async (o) => {
  if (o) { q.value = ''; await nextTick(); input.value?.focus() }
})

function go(r) {
  if (!r) return
  palette.open = false
  router.push(r.to)
}
function onKey(e) {
  if (e.key === 'ArrowDown') { e.preventDefault(); sel.value = Math.min(sel.value + 1, results.value.length - 1); scrollSel() }
  else if (e.key === 'ArrowUp') { e.preventDefault(); sel.value = Math.max(sel.value - 1, 0); scrollSel() }
  else if (e.key === 'Enter') { e.preventDefault(); go(results.value[sel.value]) }
  else if (e.key === 'Escape') palette.open = false
}
const list = ref(null)
async function scrollSel() {
  await nextTick()
  list.value?.querySelector('.on')?.scrollIntoView({ block: 'nearest' })
}
</script>

<template>
  <Transition name="fade">
    <div v-if="palette.open" class="pal-wrap" @mousedown.self="palette.open = false">
      <div class="pal" role="dialog" aria-modal="true" aria-label="بحث سريع">
        <div class="pal-in">
          <Icon name="search" />
          <input ref="input" v-model="q" placeholder="ابحث في الدروس والقاموس والأدوات…" aria-label="بحث" @keydown="onKey">
          <kbd>Esc</kbd>
        </div>
        <ul ref="list" class="pal-list" role="listbox">
          <li v-for="(r, i) in results" :key="r.to + i" :class="{ on: i === sel }" role="option" :aria-selected="i === sel" @mouseenter="sel = i" @click="go(r)">
            <Icon :name="r.icon" />
            <div class="txt">
              <div class="l">{{ r.label }}</div>
              <div v-if="r.hint" class="h">{{ r.hint }}</div>
            </div>
            <span class="k">{{ r.kind }}</span>
          </li>
          <li v-if="!results.length" class="empty">لا نتائج لـ «{{ q }}». جرّب كلمة إنجليزية مثل flex أو عربية مثل «مصفوفة».</li>
        </ul>
        <div class="pal-foot"><kbd>↑</kbd><kbd>↓</kbd> للتنقل · <kbd>Enter</kbd> للفتح</div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.pal-wrap { position: fixed; inset: 0; z-index: 80; background: rgb(5 8 15 / 55%); backdrop-filter: blur(4px); display: grid; justify-items: center; align-items: start; padding: 12vh 16px 16px; }
.pal { width: min(640px, 100%); background: var(--bg-2); border: 1px solid var(--line-2); border-radius: 16px; box-shadow: var(--glow); overflow: hidden; }
.pal-in { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-bottom: 1px solid var(--line); color: var(--muted); }
.pal-in input { flex: 1; background: transparent; border: 0; outline: none; font-size: 16px; color: var(--text); }
.pal-list { list-style: none; margin: 0; padding: 6px; max-height: min(56vh, 460px); overflow-y: auto; }
.pal-list li { display: flex; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 10px; cursor: pointer; color: var(--text-2); }
.pal-list li.on { background: var(--accent-soft); color: var(--text); }
.txt { flex: 1; min-width: 0; }
.l { font-size: 14.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.h { font-size: 12.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.k { font-size: 11.5px; color: var(--muted); white-space: nowrap; }
.empty { color: var(--muted); font-size: 14px; cursor: default !important; }
.pal-foot { padding: 8px 14px; font-size: 12px; color: var(--muted); border-top: 1px solid var(--line); display: flex; gap: 6px; align-items: center; }
</style>
