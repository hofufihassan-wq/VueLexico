<script setup>
// مثال كود مشروح: كل ملاحظة مرتبطة بأسطر؛ التمرير أو النقر على ملاحظة يضيء أسطرها في الكود.
import { ref, computed } from 'vue'
import CodeEditor from './CodeEditor.vue'
import Icon from './Icon.vue'
import { fmt } from '../composables/ui.js'
import { draftFrom } from '../composables/handoff.js'
import { useRouter } from 'vue-router'

const props = defineProps({ code: String, lang: String, notes: { type: Array, default: () => [] } })
const router = useRouter()
const active = ref(-1)
const lines = computed(() => props.code.split('\n'))
const height = computed(() => `${Math.min(lines.value.length, 18) * 22 + 26}px`)

const marks = computed(() => {
  if (active.value < 0) return []
  const n = props.notes[active.value]
  const starts = []
  let off = 0
  for (const l of lines.value) { starts.push(off); off += l.length + 1 }
  const ls = [...n.lines].sort((a, b) => a - b)
  const out = []
  for (const ln of ls) {
    const from = starts[ln - 1] ?? 0
    out.push({ from, to: from + (lines.value[ln - 1]?.length || 0), kind: 'main' })
  }
  return out
})

function openInEditor() {
  const files = props.lang === 'vue' ? { vue: props.code } : props.lang === 'css' ? { html: '<div class="card"><h2>عنوان</h2><p>نص</p></div>', css: props.code, js: '' } : props.lang === 'js' ? { html: '', css: '', js: props.code } : { html: props.code, css: '', js: '' }
  const id = draftFrom({ name: 'مثال من درس', mode: props.lang === 'vue' ? 'vue' : 'web', files })
  router.push(`/editor/${id}`)
}
</script>

<template>
  <figure class="ex">
    <div class="ex-code">
      <div class="ex-bar">
        <span class="lang mono">{{ lang }}</span>
        <span class="spacer" />
        <button class="btn ghost sm" @click="openInEditor"><Icon name="external" :size="14" /> افتح في المحرر</button>
      </div>
      <CodeEditor :model-value="code" :lang="lang" readonly :height="height" :marks="marks" label="مثال للقراءة فقط" />
    </div>
    <ol v-if="notes.length" class="ex-notes">
      <li v-for="(n, i) in notes" :key="i" :class="{ on: active === i }" tabindex="0" @mouseenter="active = i" @focus="active = i" @mouseleave="active = -1" @click="active = active === i ? -1 : i">
        <span class="ln mono">{{ n.lines.length > 1 ? `${Math.min(...n.lines)}–${Math.max(...n.lines)}` : n.lines[0] }}</span>
        <span v-html="fmt(n.text)" />
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.ex { margin: 1.4em 0; display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 0; border: 1px solid var(--line); border-radius: var(--r-lg); overflow: hidden; background: var(--bg-2); }
.ex-code { border-inline-end: 1px solid var(--line); min-width: 0; }
.ex-bar { display: flex; align-items: center; padding: 4px 8px 4px 12px; border-bottom: 1px solid var(--line); }
.lang { font-size: 11.5px; color: var(--muted); text-transform: uppercase; }
.ex-notes { list-style: none; margin: 0; padding: 8px; display: grid; gap: 4px; align-content: start; font-size: 14.5px; line-height: 1.8; }
.ex-notes li { display: flex; gap: 10px; padding: 8px 10px; border-radius: 10px; cursor: pointer; color: var(--text-2); transition: background var(--t), color var(--t); }
.ex-notes li.on { background: var(--accent-soft); color: var(--text); }
.ln { flex: none; min-width: 34px; height: 22px; border-radius: 6px; background: var(--bg-3); color: var(--accent); font-size: 11.5px; display: grid; place-items: center; margin-top: 3px; }
@media (max-width: 900px) { .ex { grid-template-columns: 1fr; } .ex-code { border-inline-end: 0; border-bottom: 1px solid var(--line); } }
</style>
