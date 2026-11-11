<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import CodeEditor from '../components/CodeEditor.vue'
import ValueView from '../components/ValueView.vue'
import ErrorCard from '../components/ErrorCard.vue'
import Icon from '../components/Icon.vue'
import { traceJs } from '../engine/runJs.js'
import { buildTimeline } from '../engine/timeline.js'
import { toText } from '../engine/runtime.js'
import { explainJs } from '../explain/js.js'
import { store, touchActivity } from '../store/index.js'

const EXAMPLES = {
  loop: { name: 'أكبر عدد', code: 'const nums = [3, 8, 2, 7]\nlet max = nums[0]\n\nfor (const n of nums) {\n  if (n > max) {\n    max = n\n  }\n}\n\nconsole.log("الأكبر:", max)\n' },
  fn: { name: 'دوال واستدعاءات', code: 'function square(x) {\n  return x * x\n}\n\nfunction sumOfSquares(a, b) {\n  const s = square(a) + square(b)\n  return s\n}\n\nconst result = sumOfSquares(3, 4)\nconsole.log(result)\n' },
  recursion: { name: 'الاستدعاء الذاتي', code: 'function factorial(n) {\n  if (n <= 1) return 1\n  return n * factorial(n - 1)\n}\n\nconsole.log(factorial(4))\n' },
  objects: { name: 'الكائنات والمراجع', code: 'const user = { name: "سارة", tags: ["طالبة"] }\nconst same = user\nconst copy = { ...user }\n\nsame.name = "نور"\ncopy.tags.push("مبرمجة")\n\nconsole.log(user.name, user.tags)\n' },
  array: { name: 'map وfilter', code: 'const prices = [12, 45, 7, 30]\nconst expensive = prices.filter((p) => p > 10)\nconst withTax = expensive.map((p) => p * 1.15)\nconst total = withTax.reduce((s, p) => s + p, 0)\nconsole.log(total.toFixed(2))\n' },
  bug: { name: 'ابحث عن الخطأ', code: '// هذه الدالة يُفترض أن تحسب المتوسط، لكنها تعطي نتيجة خاطئة\nfunction average(list) {\n  let sum = 0\n  for (let i = 1; i < list.length; i++) {\n    sum += list[i]\n  }\n  return sum / list.length\n}\n\nconsole.log(average([10, 20, 30]))\n' },
}

const code = computed({
  get: () => store.labs.js || EXAMPLES.loop.code,
  set: (v) => { store.labs.js = v },
})

const busy = ref(false)
const result = ref(null)
const timeline = ref(null)
const pos = ref(0) // فهرس الخطوة ضمن steps
const playing = ref(false)
const speed = ref(500)
const watchName = ref('')
const stale = ref(false)
watch(code, () => { if (result.value) stale.value = true })

async function run() {
  busy.value = true
  stop()
  try {
    const r = await traceJs(code.value)
    result.value = r
    stale.value = false
    timeline.value = r.events?.length && r.meta ? buildTimeline(r.events, r.meta) : null
    pos.value = 0
    touchActivity(1)
  } finally {
    busy.value = false
  }
}

const steps = computed(() => timeline.value?.steps || [])
const state = computed(() => {
  const tl = timeline.value
  if (!tl || !steps.value.length) return null
  return tl.states[steps.value[Math.min(pos.value, steps.value.length - 1)]]
})
const curLine = computed(() => (stale.value ? 0 : state.value?.line || 0))
const visibleLogs = computed(() => {
  if (!timeline.value || !state.value) return result.value?.logs || []
  const next = steps.value[pos.value + 1]
  const upTo = next === undefined ? timeline.value.states.length - 1 : next
  return timeline.value.logs.slice(0, timeline.value.states[upTo].logCount)
})
const atEnd = computed(() => pos.value >= steps.value.length - 1)

function go(n) { pos.value = Math.max(0, Math.min(steps.value.length - 1, n)) }
let timer = null
function play() {
  if (!steps.value.length) return
  if (atEnd.value) pos.value = 0
  playing.value = true
  const tick = () => {
    if (!playing.value) return
    if (atEnd.value) { playing.value = false; return }
    pos.value++
    timer = setTimeout(tick, speed.value)
  }
  timer = setTimeout(tick, speed.value)
}
function stop() { playing.value = false; clearTimeout(timer) }
onBeforeUnmount(stop)

// الإطار الحالي ومتغيراته
const frame = computed(() => state.value?.stack?.[state.value.stack.length - 1] || state.value?.globals || null)
const globalView = computed(() => {
  if (!state.value || !frame.value || frame.value.id === 0) return null
  return state.value.stack.find((f) => f.id === 0) || state.value.globals
})
const varRows = (f) => (f ? f.names.map((n, i) => ({ name: n, v: f.vars?.[i] })).filter((r) => r.v) : [])
const changedNames = computed(() => new Set((state.value?.changed || []).map((c) => c.name)))

// تاريخ متغير عبر الخطوات
const allNames = computed(() => {
  const s = new Set()
  if (result.value?.meta) for (const st of result.value.meta.steps) st.names.forEach((n) => s.add(n))
  return [...s]
})
const history = computed(() => {
  if (!watchName.value || !timeline.value) return []
  const out = []
  let last
  for (const si of steps.value) {
    const st = timeline.value.states[si]
    const ev = st.ev
    const names = result.value.meta.steps[ev.id].names
    const k = names.indexOf(watchName.value)
    if (k === -1) continue
    const v = ev.vars[k]
    if (v.t === 'tdz') continue // قبل سطر التعريف: ليست قيمة بعد
    const text = toText(v, ev.heap, 1, false)
    if (text !== last) { out.push({ line: ev.line, text, step: steps.value.indexOf(si) }); last = text }
  }
  return out
})

// شرح السطر الحالي (تحليل ثابت)
const explained = computed(() => (result.value && !stale.value ? explainJs(code.value) : null))
const lineExplain = computed(() => {
  if (!explained.value || !curLine.value) return null
  const items = explained.value.items.filter((it) => it.line === curLine.value && ['statement', 'loop', 'function', 'call', 'expression'].includes(it.kind))
  items.sort((a, b) => (b.to - b.from) - (a.to - a.from))
  return items[0] || null
})

function loadExample(k) { code.value = EXAMPLES[k].code; result.value = null; timeline.value = null }
</script>

<template>
  <div class="page wide lab">
    <header class="lab-head">
      <div>
        <div class="eyebrow">مختبر JavaScript</div>
        <h1>نفّذ الكود خطوة بخطوة</h1>
        <p class="muted">يُشغَّل كودك فعليًا في عامل معزول، ويُسجَّل كل سطر يُنفَّذ مع قيم المتغيرات في تلك اللحظة. تنقّل للأمام والخلف كأنك تعيد شريطًا.</p>
      </div>
      <div class="ex-row">
        <span class="muted small">أمثلة:</span>
        <button v-for="(e, k) in EXAMPLES" :key="k" class="chip" @click="loadExample(k)">{{ e.name }}</button>
      </div>
    </header>

    <div class="grid">
      <section class="panel code-pane">
        <div class="bar">
          <span class="mono small muted">main.js</span>
          <span v-if="stale" class="chip warn-chip">الكود تغيّر — أعد التشغيل</span>
          <span class="spacer" />
          <button class="btn primary sm" :disabled="busy" @click="run"><Icon name="play" :size="14" /> {{ busy ? 'جارٍ…' : 'شغّل وتتبّع' }}</button>
        </div>
        <CodeEditor v-model="code" lang="js" :highlight-line="curLine" height="calc(100vh - 330px)" @run="run" />
        <div v-if="lineExplain" class="line-explain">
          <span class="ln mono">{{ curLine }}</span>
          <div><strong>{{ lineExplain.title }}</strong> — {{ lineExplain.text }}</div>
        </div>
      </section>

      <section class="side-col">
        <div class="panel stepper">
          <div class="controls">
            <button class="btn sm icon" :disabled="!steps.length" aria-label="البداية" @click="go(0)"><Icon name="stepBack" :size="15" /></button>
            <button class="btn sm" :disabled="!steps.length || pos === 0" @click="go(pos - 1)">السابق</button>
            <button class="btn primary sm" :disabled="!steps.length" @click="playing ? stop() : play()"><Icon :name="playing ? 'pause' : 'play'" :size="14" /> {{ playing ? 'إيقاف' : 'تشغيل تلقائي' }}</button>
            <button class="btn sm" :disabled="!steps.length || atEnd" @click="go(pos + 1)">التالي</button>
            <button class="btn sm icon" :disabled="!steps.length" aria-label="النهاية" @click="go(steps.length - 1)"><Icon name="step" :size="15" /></button>
          </div>
          <input v-model.number="pos" type="range" min="0" :max="Math.max(0, steps.length - 1)" :disabled="!steps.length" aria-label="موضع التنفيذ" class="range">
          <div class="row small muted">
            <span>{{ steps.length ? `الخطوة ${pos + 1} من ${steps.length}` : 'شغّل الكود لتبدأ' }}</span>
            <span v-if="state">· السطر {{ state.line }}</span>
            <span class="spacer" />
            <label class="row">السرعة <select v-model.number="speed" class="select mini"><option :value="900">بطيء</option><option :value="500">عادي</option><option :value="180">سريع</option></select></label>
          </div>
          <p v-if="result?.truncated" class="note">سُجّلت أول {{ steps.length }} خطوة فقط بالتفصيل (حد العرض)؛ التنفيذ نفسه اكتمل.</p>
        </div>

        <div v-if="result?.error" class="panel pad"><ErrorCard :error="{ ...result.error, line: result.errorLine }" @goto="(l) => { const i = steps.findIndex((s) => timeline.states[s].line === l); if (i >= 0) go(i) }" /></div>

        <div class="panel pad">
          <div class="eyebrow">المتغيرات الآن</div>
          <template v-if="frame">
            <div class="frame-name"><Icon name="layers" :size="14" /> {{ frame.name }}</div>
            <table class="vars">
              <tr v-for="r in varRows(frame)" :key="r.name" :class="{ changed: changedNames.has(r.name) }">
                <th class="mono">{{ r.name }}</th>
                <td><ValueView :v="r.v" :heap="state.heap" /></td>
              </tr>
              <tr v-if="!varRows(frame).length"><td class="muted small">لا متغيرات في هذا النطاق بعد.</td></tr>
            </table>
            <template v-if="globalView">
              <div class="frame-name sub">النطاق العام</div>
              <table class="vars">
                <tr v-for="r in varRows(globalView)" :key="r.name"><th class="mono">{{ r.name }}</th><td><ValueView :v="r.v" :heap="state.heap" /></td></tr>
              </table>
            </template>
            <div class="callstack">
              <span class="muted small">مكدس الاستدعاءات:</span>
              <span v-for="(f, i) in [...state.stack].reverse()" :key="f.id" class="chip" :class="{ on: i === 0 }">{{ f.name }}</span>
            </div>
          </template>
          <p v-else class="muted small">لا توجد خطوة محددة.</p>
        </div>

        <div class="panel pad">
          <div class="eyebrow">الطرفية حتى هذه اللحظة</div>
          <div class="logs mono" dir="ltr">
            <div v-for="(l, i) in visibleLogs" :key="i" class="log" :class="l.level">{{ l.text }}</div>
            <div v-if="!visibleLogs.length" class="muted small" dir="rtl">لا شيء بعد.</div>
          </div>
        </div>

        <div class="panel pad">
          <div class="eyebrow">تاريخ متغير</div>
          <select v-model="watchName" class="select" aria-label="اختر متغيرًا">
            <option value="">اختر متغيرًا لتتبع قيمه…</option>
            <option v-for="n in allNames" :key="n" :value="n">{{ n }}</option>
          </select>
          <ol v-if="history.length" class="hist">
            <li v-for="(h, i) in history" :key="i" :class="{ on: h.step <= pos && (history[i + 1]?.step ?? Infinity) > pos }" @click="go(h.step)">
              <span class="mono muted">س{{ h.line }}</span><span class="mono val">{{ h.text }}</span>
            </li>
          </ol>
        </div>
        <p class="muted small honest">
          حدود المشغّل: المؤقتات تعمل بساعة افتراضية (لا انتظار حقيقي)، لا توجد صفحة ويب (document)، والشبكة معطّلة. يُسجَّل حتى 2500 خطوة، ويُوقف الكود بعد 200 ألف خطوة لحمايتك من الحلقات اللانهائية.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.lab { padding-top: 20px; }
.lab-head { display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: flex-end; margin-bottom: 16px; }
.lab-head h1 { font-size: 1.8rem; margin: 2px 0; }
.lab-head p { margin: 0; max-width: 70ch; }
.ex-row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
.grid { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(320px, .9fr); gap: 16px; align-items: start; }
.code-pane { overflow: hidden; }
.bar { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--line); }
.warn-chip { background: var(--accent-soft); color: var(--warn); }
.line-explain { display: flex; gap: 10px; padding: 10px 14px; border-top: 1px solid var(--line); font-size: 14px; color: var(--text-2); }
.line-explain .ln { flex: none; background: var(--accent); color: var(--accent-ink); border-radius: 6px; padding: 0 8px; height: 22px; font-size: 12px; display: grid; place-items: center; margin-top: 2px; }
.side-col { display: grid; gap: 12px; }
.pad { padding: 12px 14px; }
.stepper { padding: 12px 14px; display: grid; gap: 10px; }
.controls { display: flex; gap: 6px; flex-wrap: wrap; }
.range { width: 100%; accent-color: var(--accent); direction: ltr; }
.select.mini { min-height: 28px; padding: 2px 8px; width: auto; }
.note { margin: 0; font-size: 12.5px; color: var(--warn); }
.frame-name { display: flex; align-items: center; gap: 6px; font-weight: 600; margin: 8px 0 4px; font-size: 14px; }
.frame-name.sub { font-weight: 500; color: var(--muted); margin-top: 12px; }
.vars { width: 100%; border-collapse: collapse; }
.vars th { text-align: start; font-weight: 500; color: var(--syn-prop); font-size: 13px; padding: 4px 8px 4px 0; vertical-align: top; width: 1%; white-space: nowrap; }
.vars td { padding: 4px 0; direction: ltr; text-align: left; }
.vars tr { border-bottom: 1px solid var(--line); transition: background 300ms; }
.vars tr.changed { background: var(--accent-soft); }
.callstack { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-top: 10px; }
.logs { max-height: 180px; overflow: auto; font-size: 12.5px; margin-top: 8px; }
.log { padding: 3px 0; border-bottom: 1px solid var(--line); unicode-bidi: plaintext; }
.log.error { color: var(--bad); } .log.warn { color: var(--warn); }
.hist { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 2px; max-height: 200px; overflow: auto; }
.hist li { display: flex; gap: 12px; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 13px; }
.hist li.on { background: var(--accent-soft); }
.hist .val { direction: ltr; }
.honest { margin: 0; }
@media (max-width: 1000px) { .grid { grid-template-columns: 1fr; } }
</style>
