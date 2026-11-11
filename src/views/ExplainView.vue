<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import CodeEditor from '../components/CodeEditor.vue'
import Icon from '../components/Icon.vue'
import { explainJs } from '../explain/js.js'
import { explainCss } from '../explain/css.js'
import { explainHtml } from '../explain/html.js'
import { explainVue } from '../explain/vue.js'
import { termById } from '../content/dictionary/index.js'
import { store } from '../store/index.js'

const EXAMPLES = {
  js: 'const cart = [\n  { name: "قلم", price: 5, qty: 2 },\n  { name: "دفتر", price: 12, qty: 1 },\n]\n\nfunction total(items) {\n  let sum = 0\n  for (const item of items) {\n    sum += item.price * item.qty\n  }\n  return sum\n}\n\nconst btn = document.querySelector("#pay")\nbtn.addEventListener("click", () => {\n  console.log(`المجموع: ${total(cart)}`)\n})\n',
  html: '<!DOCTYPE html>\n<html lang="ar" dir="rtl">\n<head>\n  <meta charset="utf-8">\n  <title>تسجيل</title>\n</head>\n<body>\n  <form id="signup">\n    <label for="email">البريد</label>\n    <input id="email" type="email" required>\n    <img src="logo.png">\n    <button type="submit">سجّل</button>\n  </form>\n</body>\n</html>\n',
  css: ':root {\n  --brand: hsl(174 72% 40%);\n}\n\n.card > h2:hover {\n  color: var(--brand);\n  transition: color 200ms ease;\n}\n\n#main .card {\n  display: flex;\n  gap: 1rem;\n  paddng: 12px;\n}\n\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}\n',
  vue: '<script setup>\nimport { ref, computed } from "vue"\n\nconst todos = ref([{ id: 1, text: "تعلم Vue", done: false }])\nconst draft = ref("")\nconst left = computed(() => todos.value.filter((t) => !t.done).length)\n\nfunction add() {\n  todos.value.push({ id: Date.now(), text: draft.value, done: false })\n  draft.value = ""\n}\n<\/script>\n\n<template>\n  <form @submit.prevent="add">\n    <input v-model.trim="draft">\n  </form>\n  <li v-for="t in todos" :class="{ done: t.done }">{{ t.text }}</li>\n  <p>المتبقي: {{ left }}</p>\n</template>\n\n<style scoped>\n.done { text-decoration: line-through; }\n</style>\n',
}
const LANGS = { js: 'JavaScript', html: 'HTML', css: 'CSS', vue: 'Vue' }

const lang = computed({ get: () => store.labs.explain.lang, set: (v) => { store.labs.explain.lang = v } })
const code = computed({ get: () => store.labs.explain.code, set: (v) => { store.labs.explain.code = v } })
if (!code.value) code.value = EXAMPLES[lang.value]

const result = ref(null)
const analyzing = ref(false)
const cursor = ref(0)
const tab = ref('cursor')
const focusSym = ref(null)
const editor = ref(null)

let seq = 0
let timer
async function analyze() {
  const my = ++seq
  analyzing.value = true
  try {
    const src = code.value
    let r
    if (lang.value === 'js') r = explainJs(src)
    else if (lang.value === 'css') r = explainCss(src)
    else if (lang.value === 'html') r = explainHtml(src)
    else r = await explainVue(src)
    if (my === seq) result.value = r
  } catch (e) {
    if (my === seq) result.value = { items: [], symbols: [], notes: [], error: { message: 'تعذّر التحليل', detail: String(e.message || e), line: 1 } }
  } finally {
    if (my === seq) analyzing.value = false
  }
}
watch([code, lang], () => { clearTimeout(timer); timer = setTimeout(analyze, 280) })
onMounted(analyze)

function detect() {
  const s = code.value.trim()
  if (/<template[\s>]|<script\s+setup/.test(s)) return 'vue'
  if (/^</.test(s)) return 'html'
  if (/^[^{}]*\{[^{}]*:[^{}]*;?[^{}]*\}/.test(s) && !/\b(function|const|let|var|=>|console)\b/.test(s)) return 'css'
  return 'js'
}
function setLang(l) {
  if (l === lang.value) return
  const wasExample = Object.values(EXAMPLES).includes(code.value) || !code.value.trim()
  lang.value = l
  if (wasExample) code.value = EXAMPLES[l]
}
const suggested = computed(() => { const d = detect(); return d !== lang.value ? d : null })

const items = computed(() => result.value?.items || [])
const atCursor = computed(() => items.value.filter((it) => it.from <= cursor.value && cursor.value <= it.to && it.kind !== 'block').sort((a, b) => (a.to - a.from) - (b.to - b.from)))
const primary = computed(() => atCursor.value[0] || null)
const context = computed(() => atCursor.value.slice(1, 6))

const lines = computed(() => {
  const map = new Map()
  for (const it of items.value) {
    if (['identifier', 'literal', 'value', 'property', 'operator', 'text'].includes(it.kind)) continue
    if (!map.has(it.line)) map.set(it.line, [])
    map.get(it.line).push(it)
  }
  const src = code.value.split('\n')
  return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([line, its]) => {
    its.sort((a, b) => (b.to - b.from) - (a.to - a.from))
    return { line, text: src[line - 1]?.trim() || '', top: its[0], more: its.length - 1 }
  })
})
const warnings = computed(() => items.value.filter((i) => i.warn))
const symbols = computed(() => (result.value?.symbols || []).filter((s) => s.kind !== 'import' || s.refs.length).slice(0, 80))

const marks = computed(() => {
  const out = []
  if (primary.value) out.push({ from: primary.value.from, to: primary.value.to, kind: 'main' })
  const symId = focusSym.value ?? primary.value?.symbol
  const sym = symId !== undefined && symId !== null ? result.value?.symbols?.[symId] : null
  if (sym) {
    if (sym.from !== undefined) out.push({ from: sym.from, to: sym.to, kind: 'def' })
    for (const r of sym.refs || []) if (r.from !== undefined) out.push({ from: r.from, to: r.to, kind: 'rel' })
  }
  for (const w of warnings.value) out.push({ from: w.from, to: w.to, kind: 'warn' })
  return out
})
const diagnostics = computed(() => (result.value?.error ? [{ line: result.value.error.line, message: `${result.value.error.message}: ${result.value.error.detail}` }] : []))

function gotoLine(line) {
  const src = code.value.split('\n')
  let off = 0
  for (let i = 0; i < Math.min(line - 1, src.length); i++) off += src[i].length + 1
  editor.value?.setCursor(off + (src[line - 1]?.match(/^\s*/)[0].length || 0))
}
function gotoItem(it) { editor.value?.setCursor(it.from) }
const kindLabel = { statement: 'جملة', loop: 'حلقة', function: 'دالة', call: 'استدعاء', expression: 'تعبير', identifier: 'اسم', declaration: 'تعريف', literal: 'قيمة', operator: 'عامل', property: 'خاصية', element: 'عنصر', tag: 'وسم', attribute: 'سمة', selector: 'محدِّد', rule: 'قاعدة', atrule: 'قاعدة @', value: 'قيمة', directive: 'توجيه', interpolation: 'إدراج', note: 'تنبيه', error: 'خطأ', relation: 'علاقة', text: 'نص', comment: 'تعليق', doctype: 'تصريح', class: 'صنف', method: 'طريقة', pattern: 'تفكيك' }
</script>

<template>
  <div class="page wide explain">
    <header class="x-head">
      <div>
        <div class="eyebrow">شرح الأكواد</div>
        <h1>ضع المؤشر على أي جزء… واسأل: ماذا يفعل؟</h1>
        <p class="muted">اكتب أو الصق كودًا. تحلّله المنصة بمحللات حقيقية (acorn لـ JavaScript، وparse5 لـ HTML، وcss-tree لـ CSS، ومترجم Vue الرسمي) دون تشغيله، ثم تشرح كل جزء وعلاقته بالباقي.</p>
      </div>
    </header>

    <div class="x-grid">
      <section class="panel ed">
        <div class="bar">
          <div class="tabs">
            <button v-for="(l, k) in LANGS" :key="k" :class="{ on: lang === k }" @click="setLang(k)">{{ l }}</button>
          </div>
          <button v-if="suggested" class="chip on" @click="lang = suggested">يبدو أنه {{ LANGS[suggested] }} — بدّل؟</button>
          <span class="spacer" />
          <span v-if="analyzing" class="muted small">جارٍ التحليل…</span>
          <button class="btn ghost sm" @click="code = EXAMPLES[lang]">مثال</button>
          <button class="btn ghost sm" @click="code = ''">مسح</button>
        </div>
        <CodeEditor ref="editor" v-model="code" :lang="lang" :marks="marks" :diagnostics="diagnostics" height="calc(100vh - 250px)" label="الكود المراد شرحه" @cursor="cursor = $event; focusSym = null" />
      </section>

      <section class="panel side">
        <div class="tabs side-tabs">
          <button :class="{ on: tab === 'cursor' }" @click="tab = 'cursor'">عند المؤشر</button>
          <button :class="{ on: tab === 'lines' }" @click="tab = 'lines'">سطرًا بسطر</button>
          <button :class="{ on: tab === 'rel' }" @click="tab = 'rel'">العلاقات ({{ symbols.length }})</button>
          <button :class="{ on: tab === 'warn' }" @click="tab = 'warn'">تنبيهات<span v-if="warnings.length" class="cnt">{{ warnings.length }}</span></button>
        </div>
        <div class="side-body">
          <div v-if="result?.error" class="x-err">
            <Icon name="x" :size="16" />
            <div><strong>{{ result.error.message }} (السطر {{ result.error.line }})</strong><p>{{ result.error.detail }}</p><p class="muted small">أصلح الصياغة ليكتمل التحليل. لا نخمّن معنى كود لا يمكن تحليله.</p></div>
          </div>

          <template v-if="tab === 'cursor'">
            <template v-if="primary">
              <article class="card-x" :class="{ warn: primary.warn }">
                <div class="k-row"><span class="kind">{{ kindLabel[primary.kind] || primary.kind }}</span><span class="mono small muted">السطر {{ primary.line }}</span></div>
                <h3 class="mono-title" dir="auto">{{ primary.title }}</h3>
                <p>{{ primary.text }}</p>
                <div class="links">
                  <button v-for="r in primary.rel || []" :key="r.line + r.label" class="chip" @click="gotoLine(r.line)"><Icon name="link" :size="12" /> {{ r.label }}: السطر {{ r.line }}</button>
                  <RouterLink v-if="primary.term && termById[primary.term]" :to="`/dictionary/${primary.term}`" class="chip"><Icon name="book" :size="12" /> {{ termById[primary.term].term }} في القاموس</RouterLink>
                  <span v-if="primary.specificity" class="chip mono">({{ primary.specificity.join(',') }})</span>
                </div>
              </article>
              <div v-if="context.length" class="ctx">
                <div class="eyebrow">ضمن السياق</div>
                <button v-for="(c, i) in context" :key="i" class="ctx-item" @click="gotoItem(c)">
                  <span class="kind">{{ kindLabel[c.kind] || c.kind }}</span>
                  <span><strong class="mono-title" dir="auto">{{ c.title }}</strong> — {{ c.text }}</span>
                </button>
              </div>
            </template>
            <p v-else-if="!result?.error" class="empty">انقر داخل الكود أو حرّك المؤشر بالأسهم لترى شرح الجزء الذي تحته. المسافات الفارغة والتعليقات قد لا يكون لها شرح.</p>
          </template>

          <ol v-else-if="tab === 'lines'" class="by-line">
            <li v-for="l in lines" :key="l.line" @click="gotoLine(l.line)">
              <span class="ln mono">{{ l.line }}</span>
              <div>
                <code class="src">{{ l.text }}</code>
                <p><strong>{{ l.top.title }}:</strong> {{ l.top.text }}</p>
              </div>
            </li>
            <li v-if="!lines.length" class="empty">لا يوجد ما يُشرح بعد.</li>
          </ol>

          <div v-else-if="tab === 'rel'" class="rels">
            <p class="muted small">كل اسم مُعرّف في الكود: أين عُرّف، وأين يُقرأ، وأين تتغير قيمته. انقر لتمييز كل مواضعه.</p>
            <button v-for="s in symbols" :key="s.id" class="rel" :class="{ on: focusSym === s.id }" @click="focusSym = focusSym === s.id ? null : s.id">
              <span class="mono name">{{ s.name }}</span>
              <span class="muted small">{{ s.kind }}</span>
              <span class="spacer" />
              <span class="small">عُرّف: {{ s.line || '—' }}</span>
              <span class="small">يُستخدم: {{ [...new Set((s.refs || []).map((r) => r.line))].join('، ') || '—' }}</span>
              <span v-if="s.writes?.length" class="small w">يتغيّر: {{ [...new Set(s.writes)].join('، ') }}</span>
            </button>
            <p v-if="!symbols.length" class="empty">لا توجد أسماء معرّفة.</p>
          </div>

          <div v-else class="warns">
            <button v-for="(w, i) in warnings" :key="i" class="w-item" @click="gotoItem(w)">
              <span class="ln mono">{{ w.line }}</span>
              <div><strong>{{ w.title }}</strong><p>{{ w.text }}</p></div>
            </button>
            <p v-if="!warnings.length" class="empty">لا تنبيهات. هذا لا يعني أن الكود خالٍ من الأخطاء المنطقية؛ التحليل يكتشف أنماطًا معروفة فقط.</p>
          </div>

          <div v-if="result?.notes?.length" class="notes">
            <div class="eyebrow">حدود هذا التحليل</div>
            <ul><li v-for="n in result.notes" :key="n">{{ n }}</li></ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.explain { padding-top: 20px; }
.x-head h1 { font-size: 1.8rem; margin: 2px 0; }
.x-head p { margin: 0 0 14px; max-width: 80ch; }
.x-grid { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(320px, .85fr); gap: 14px; }
.ed { overflow: hidden; }
.bar { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-bottom: 1px solid var(--line); flex-wrap: wrap; }
.side { display: flex; flex-direction: column; max-height: calc(100vh - 150px); overflow: hidden; }
.side-tabs { margin: 8px; width: auto; }
.cnt { background: var(--warn); color: var(--bg); border-radius: 8px; font-size: 11px; padding: 0 6px; margin-inline-start: 6px; }
.side-body { overflow: auto; padding: 4px 14px 16px; display: grid; gap: 14px; align-content: start; }
.card-x { border: 1px solid var(--line-2); border-radius: 14px; padding: 14px; background: var(--bg); border-top: 3px solid var(--accent); }
.card-x.warn { border-top-color: var(--warn); }
.k-row { display: flex; justify-content: space-between; }
.kind { font-size: 11.5px; color: var(--accent); background: var(--accent-soft); padding: 1px 8px; border-radius: 6px; white-space: nowrap; }
.mono-title { font-family: var(--font-code), var(--font-ui); font-size: 15px; unicode-bidi: isolate; display: block; margin: 8px 0 4px; text-align: start; }
.card-x p { margin: 0; line-height: 1.85; color: var(--text-2); }
.links { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 10px; }
.links a { text-decoration: none !important; }
.ctx { display: grid; gap: 6px; }
.ctx-item { display: flex; gap: 10px; align-items: flex-start; text-align: start; background: none; border: 1px solid var(--line); border-radius: 10px; padding: 8px 10px; cursor: pointer; font-size: 13.5px; color: var(--text-2); }
.ctx-item:hover { border-color: var(--line-2); }
.ctx-item .mono-title { font-size: 13px; margin: 0; }
.by-line { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.by-line li { display: flex; gap: 10px; padding: 8px; border-radius: 10px; cursor: pointer; }
.by-line li:hover { background: var(--bg-3); }
.ln { flex: none; min-width: 28px; height: 22px; border-radius: 6px; background: var(--bg-3); color: var(--accent); font-size: 12px; display: grid; place-items: center; }
.src { display: block; font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; text-align: left; direction: ltr; background: none; border: 0; padding: 0; }
.by-line p { margin: 2px 0 0; font-size: 13.5px; color: var(--text-2); }
.rels { display: grid; gap: 4px; }
.rel { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; text-align: start; background: none; border: 1px solid transparent; border-radius: 10px; padding: 7px 10px; cursor: pointer; }
.rel:hover { background: var(--bg-3); }
.rel.on { border-color: var(--mint); background: var(--mint-soft); }
.rel .name { color: var(--syn-prop); font-weight: 600; }
.rel .w { color: var(--warn); }
.warns { display: grid; gap: 6px; }
.w-item { display: flex; gap: 10px; text-align: start; background: color-mix(in srgb, var(--warn) 8%, transparent); border: 1px solid color-mix(in srgb, var(--warn) 25%, transparent); border-radius: 10px; padding: 8px 10px; cursor: pointer; }
.w-item p { margin: 2px 0 0; font-size: 13.5px; color: var(--text-2); }
.x-err { display: flex; gap: 10px; background: var(--bad-soft); border-radius: 12px; padding: 10px 12px; color: var(--bad); }
.x-err p { margin: 2px 0 0; color: var(--text-2); }
.notes { border-top: 1px dashed var(--line-2); padding-top: 10px; }
.notes ul { margin: 6px 0 0; padding-inline-start: 1.1em; font-size: 13px; color: var(--muted); }
.empty { color: var(--muted); font-size: 14px; }
@media (max-width: 1000px) { .x-grid { grid-template-columns: 1fr; } .side { max-height: none; } }
</style>
