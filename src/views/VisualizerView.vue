<script setup>
// محاكي التنفيذ «رحلة الكود»: يروي قصة التنفيذ حدثًا بحدث، ويرسم المكدس والذاكرة (مع أسهم المراجع)
// وحلقة الأحداث (المؤقتات، طابور المهام، المهام الدقيقة). يختلف عن مختبر JS الذي يركّز على تصحيح سطر بسطر.
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import CodeEditor from '../components/CodeEditor.vue'
import Icon from '../components/Icon.vue'
import { traceJs } from '../engine/runJs.js'
import { buildTimeline, EVENT_LABEL, PHASE_AR } from '../engine/timeline.js'
import { toText } from '../engine/runtime.js'
import { store, touchActivity } from '../store/index.js'

const EXAMPLES = {
  loop: { name: 'ترتيب حلقة الأحداث', code: 'console.log("1: متزامن")\n\nsetTimeout(() => {\n  console.log("4: مؤقت")\n}, 0)\n\nPromise.resolve().then(() => {\n  console.log("3: وعد")\n})\n\nconsole.log("2: متزامن")\n' },
  async: { name: 'async / await', code: 'const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))\n\nasync function brew() {\n  console.log("بدأ التحضير")\n  await wait(1000)\n  console.log("القهوة جاهزة")\n  return "☕"\n}\n\nbrew().then((cup) => console.log("استلمت", cup))\nconsole.log("أفعل شيئًا آخر أثناء الانتظار")\n' },
  refs: { name: 'المراجع في الذاكرة', code: 'const a = { score: 1 }\nconst b = a\nconst c = { ...a }\nconst team = [a, c]\n\nb.score = 99\nconsole.log(a.score, c.score, team[0] === b)\n' },
  closure: { name: 'الإغلاق (closure)', code: 'function makeCounter() {\n  let count = 0\n  return function next() {\n    count++\n    return count\n  }\n}\n\nconst counter = makeCounter()\ncounter()\ncounter()\nconsole.log(counter())\n' },
  recursion: { name: 'الاستدعاء الذاتي', code: 'function sum(list) {\n  if (list.length === 0) return 0\n  const [first, ...rest] = list\n  return first + sum(rest)\n}\n\nconsole.log(sum([4, 5, 6]))\n' },
}

const code = computed({ get: () => store.labs.visualizer || EXAMPLES.loop.code, set: (v) => { store.labs.visualizer = v } })
const busy = ref(false)
const result = ref(null)
const tl = ref(null)
const idx = ref(0) // موضع ضمن قائمة الأحداث المعروضة
const detail = ref('story') // story: بدون أحداث الأسطر | all: كل الأحداث
const playing = ref(false)
const speed = ref(1100)

async function run() {
  busy.value = true
  stop()
  try {
    const r = await traceJs(code.value)
    result.value = r
    tl.value = r.meta && r.events?.length ? buildTimeline(r.events, r.meta) : null
    idx.value = 0
    touchActivity(1)
  } finally { busy.value = false }
}

const visible = computed(() => {
  if (!tl.value) return []
  const all = tl.value.states
  if (detail.value === 'all') return all.map((s) => s.i)
  // وضع القصة: نُبقي الأحداث البنيوية، ومن الأسطر فقط ما تغيّرت فيه قيم
  return all.filter((s) => s.ev.type !== 'step' || s.changed.length).map((s) => s.i)
})
const cur = computed(() => (tl.value && visible.value.length ? tl.value.states[visible.value[Math.min(idx.value, visible.value.length - 1)]] : null))
watch(detail, () => { idx.value = 0 })

const logs = computed(() => (tl.value && cur.value ? tl.value.logs.slice(0, cur.value.logCount) : []))

// الكائنات الظاهرة: كل ما يمكن الوصول إليه من المكدس والنطاق العام
const frames = computed(() => {
  if (!cur.value) return []
  const list = [...cur.value.stack]
  if (cur.value.globals) list.unshift(cur.value.globals)
  return list
})
const heapObjs = computed(() => {
  if (!cur.value) return []
  const heap = cur.value.heap
  const seen = new Set()
  const queue = []
  for (const f of frames.value) for (const v of f.vars || []) if (v?.t === 'ref') queue.push(v.id)
  while (queue.length) {
    const id = queue.shift()
    if (seen.has(id) || !heap[id]) continue
    seen.add(id)
    for (const [k, v] of heap[id].entries || []) {
      if (v?.t === 'ref') queue.push(v.id)
      if (k && typeof k === 'object' && k.t === 'ref') queue.push(k.id)
    }
  }
  return [...seen].map((id) => heap[id])
})
const short = (v) => (v ? toText(v, cur.value?.heap || {}, 2, false) : '')
const prim = (v) => {
  if (!v) return ''
  if (v.t === 'tdz') return 'غير مهيأ'
  if (v.t === 'fn') return v.cls ? `class ${v.name}` : `ƒ ${v.name || ''}`
  return toText(v, {}, 0, false)
}

// ---------- الأسهم ----------
const stage = ref(null)
const arrows = ref([])
async function drawArrows() {
  await nextTick()
  const root = stage.value
  if (!root) return
  const base = root.getBoundingClientRect()
  const out = []
  root.querySelectorAll('[data-ref]').forEach((el) => {
    const target = root.querySelector(`[data-obj="${el.dataset.ref}"]`)
    if (!target) return
    const a = el.getBoundingClientRect()
    const b = target.getBoundingClientRect()
    const x1 = a.left - base.left
    const y1 = a.top + a.height / 2 - base.top
    const x2 = b.right - base.left
    const y2 = b.top + 14 - base.top
    const dx = Math.max(40, Math.abs(x1 - x2) / 2)
    out.push({ d: `M ${x1} ${y1} C ${x1 - dx} ${y1}, ${x2 + dx} ${y2}, ${x2} ${y2}`, hot: el.dataset.hot === '1' })
  })
  arrows.value = out
}
watch([cur, () => heapObjs.value.length], drawArrows, { flush: 'post' })
let ro
onMounted(() => { ro = new ResizeObserver(drawArrows); if (stage.value) ro.observe(stage.value) })
onBeforeUnmount(() => { ro?.disconnect(); stop() })

// ---------- التشغيل ----------
let timer
function play() {
  if (!visible.value.length) return
  if (idx.value >= visible.value.length - 1) idx.value = 0
  playing.value = true
  const tick = () => {
    if (!playing.value) return
    if (idx.value >= visible.value.length - 1) { playing.value = false; return }
    idx.value++
    timer = setTimeout(tick, speed.value)
  }
  timer = setTimeout(tick, speed.value)
}
function stop() { playing.value = false; clearTimeout(timer) }
function onKey(e) {
  if (e.target.closest?.('.cm-editor, input, select, textarea')) return
  if (e.key === 'ArrowLeft') idx.value = Math.min(idx.value + 1, visible.value.length - 1)
  if (e.key === 'ArrowRight') idx.value = Math.max(idx.value - 1, 0)
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

const markers = computed(() => (tl.value ? visible.value.map((i, k) => ({ k, type: tl.value.states[i].ev.type })) : []))
const changedSet = computed(() => new Set((cur.value?.changed || []).map((c) => c.name)))
const readyTimers = computed(() => (cur.value ? cur.value.timers.filter((t) => t.due <= cur.value.clock) : []))
const waitingTimers = computed(() => (cur.value ? cur.value.timers.filter((t) => t.due > cur.value.clock) : []))
function loadExample(k) { code.value = EXAMPLES[k].code; result.value = null; tl.value = null }
</script>

<template>
  <div class="page wide viz">
    <header class="v-head">
      <div>
        <div class="eyebrow">محاكي التنفيذ</div>
        <h1>رحلة الكود</h1>
        <p class="muted">شاهد ما لا يظهر في الكود: كيف تُبنى إطارات الدوال وتُزال، وأين تعيش الكائنات في الذاكرة ومن يشير إليها، وكيف تنتظر المؤقتات والوعود دورها في حلقة الأحداث.</p>
      </div>
      <div class="ex-row">
        <button v-for="(e, k) in EXAMPLES" :key="k" class="chip" @click="loadExample(k)">{{ e.name }}</button>
      </div>
    </header>

    <div class="top">
      <section class="panel code-box">
        <div class="bar"><span class="mono small muted">journey.js</span><span class="spacer" /><button class="btn primary sm" :disabled="busy" @click="run"><Icon name="play" :size="14" /> {{ busy ? 'جارٍ…' : 'ابدأ الرحلة' }}</button></div>
        <CodeEditor v-model="code" lang="js" :highlight-line="cur?.line || 0" height="300px" @run="run" />
      </section>
      <section class="narrator panel" :class="cur ? 'ev-' + cur.ev.type : ''">
        <template v-if="cur">
          <div class="n-top">
            <span class="badge-ev">{{ EVENT_LABEL[cur.ev.type] }}</span>
            <span class="phase"><span class="dot" /> {{ PHASE_AR[cur.phase] || '—' }}</span>
            <span class="clock mono" title="الساعة الافتراضية"><Icon name="clock" :size="13" /> {{ cur.clock }}ms</span>
            <span class="spacer" />
            <span class="muted small">{{ idx + 1 }} من {{ visible.length }}</span>
          </div>
          <Transition name="fade" mode="out-in">
            <p :key="cur.i" class="story">{{ cur.story }}</p>
          </Transition>
          <div class="out">
            <div class="eyebrow">الطرفية</div>
            <div class="out-lines mono" dir="ltr">
              <div v-for="(l, i) in logs" :key="i" :class="{ fresh: i === logs.length - 1 && cur.ev.type === 'log' }">{{ l.text }}</div>
            </div>
          </div>
        </template>
        <div v-else class="intro">
          <Icon name="flow" :size="28" />
          <p>اختر مثالًا أو اكتب كودك، ثم اضغط <strong>ابدأ الرحلة</strong>. سيرويها لك الراوي هنا حدثًا بحدث.</p>
          <p v-if="result?.status === 'syntax'" class="bad">خطأ صياغة في السطر {{ result.errorLine }}: {{ result.error.message }}</p>
        </div>
      </section>
    </div>

    <section ref="stage" class="stage" :class="{ empty: !cur }">
      <svg class="wires" aria-hidden="true">
        <defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="currentColor" /></marker></defs>
        <path v-for="(a, i) in arrows" :key="i" :d="a.d" :class="{ hot: a.hot }" marker-end="url(#arr)" />
      </svg>

      <div class="col">
        <h3><Icon name="layers" :size="16" /> مكدس الاستدعاءات</h3>
        <p class="hint">الأعلى يُنفَّذ الآن. كل استدعاء يبني إطارًا، وكل return يهدمه.</p>
        <TransitionGroup name="frame" tag="div" class="stack">
          <div v-for="(f, fi) in [...frames].reverse()" :key="f.id" class="frame" :class="{ top: fi === 0 && cur?.stack.length, global: f.id === 0, idle: f.id === 0 && !cur?.stack.some((s) => s.id === 0) }">
            <div class="f-name">{{ f.name }}<span v-if="f.id === 0 && !cur?.stack.some((s) => s.id === 0)" class="muted small"> (انتهى تنفيذه، وتبقى متغيراته)</span></div>
            <div v-for="(n, k) in f.names" :key="n" class="var" :class="{ changed: changedSet.has(n) && fi === 0 }">
              <template v-if="f.vars && f.vars[k]">
                <span class="vn mono">{{ n }}</span>
                <span v-if="f.vars[k].t === 'ref'" class="vref mono" :data-ref="f.vars[k].id" :data-hot="changedSet.has(n) ? 1 : 0">#{{ f.vars[k].id }}</span>
                <span v-else class="vp mono" :class="'p-' + f.vars[k].t">{{ prim(f.vars[k]) }}</span>
              </template>
            </div>
          </div>
        </TransitionGroup>
        <p v-if="cur && !cur.stack.length" class="empty-stack">المكدس فارغ — المحرّك ينتظر حلقة الأحداث.</p>
      </div>

      <div class="col heap">
        <h3><Icon name="cards" :size="16" /> الذاكرة (الكومة)</h3>
        <p class="hint">الكائنات والمصفوفات تعيش هنا، والمتغيرات تحمل «مرجعًا» إليها فقط.</p>
        <TransitionGroup name="frame" tag="div" class="objs">
          <div v-for="o in heapObjs" :key="o.id" class="obj" :data-obj="o.id">
            <div class="o-head mono"><span>#{{ o.id }}</span> <span class="muted">{{ o.kind === 'array' ? `Array(${o.length})` : o.ctor || (o.kind === 'object' ? 'Object' : o.kind) }}</span></div>
            <div v-if="o.text" class="o-row mono">{{ o.text }}</div>
            <div v-for="([k, v], j) in o.entries" :key="j" class="o-row">
              <span class="ok mono">{{ o.kind === 'set' ? '•' : typeof k === 'string' ? k : short(k) }}</span>
              <span v-if="v.t === 'ref'" class="vref mono" :data-ref="v.id">#{{ v.id }}</span>
              <span v-else class="vp mono" :class="'p-' + v.t">{{ prim(v) }}</span>
            </div>
            <div v-if="o.more" class="o-row muted small">… و{{ o.more }} أخرى</div>
          </div>
        </TransitionGroup>
        <p v-if="cur && !heapObjs.length" class="hint">لا كائنات مرئية الآن.</p>
      </div>

      <div class="col loop">
        <h3><Icon name="refresh" :size="16" /> حلقة الأحداث</h3>
        <div class="lane">
          <div class="l-title">واجهات المتصفح · مؤقتات تنتظر موعدها</div>
          <TransitionGroup name="frame" tag="div" class="chips">
            <span v-for="t in waitingTimers" :key="t.id" class="tk timer">#{{ t.id }} {{ t.name }} <small>عند {{ t.due }}ms</small></span>
          </TransitionGroup>
          <span v-if="!waitingTimers.length" class="none">—</span>
        </div>
        <div class="lane">
          <div class="l-title">طابور المهام (Tasks)</div>
          <TransitionGroup name="frame" tag="div" class="chips">
            <span v-for="t in readyTimers" :key="t.id" class="tk task">#{{ t.id }} {{ t.name }}</span>
          </TransitionGroup>
          <span v-if="!readyTimers.length" class="none">فارغ</span>
        </div>
        <div class="lane">
          <div class="l-title">المهام الدقيقة (Microtasks)</div>
          <TransitionGroup name="frame" tag="div" class="chips">
            <span v-for="m in cur?.micro || []" :key="m.id" class="tk micro" :title="m.source === 'then' ? 'مسجّلة عبر then وتُنفَّذ بعد استقرار الوعد' : ''">{{ m.name }}<small v-if="m.source === 'then'"> (then)</small></span>
          </TransitionGroup>
          <span v-if="!cur?.micro.length" class="none">فارغ</span>
        </div>
        <ol class="rules">
          <li :class="{ on: cur?.phase === 'script' }">نفّذ الكود المتزامن حتى يفرغ المكدس</li>
          <li :class="{ on: cur?.phase === 'micro' }">نفّذ كل المهام الدقيقة</li>
          <li :class="{ on: cur?.phase === 'timer' }">خذ مهمة واحدة من الطابور، ثم عُد للخطوة 2</li>
        </ol>
      </div>
    </section>

    <section class="panel track">
      <div class="t-controls">
        <button class="btn sm icon" :disabled="!visible.length" aria-label="السابق" @click="idx = Math.max(0, idx - 1)"><Icon name="chevronLeft" :size="16" style="transform: scaleX(-1)" /></button>
        <button class="btn primary sm" :disabled="!visible.length" @click="playing ? stop() : play()"><Icon :name="playing ? 'pause' : 'play'" :size="14" /> {{ playing ? 'إيقاف' : 'شغّل الرحلة' }}</button>
        <button class="btn sm icon" :disabled="!visible.length" aria-label="التالي" @click="idx = Math.min(visible.length - 1, idx + 1)"><Icon name="chevron" :size="16" style="transform: scaleX(-1)" /></button>
        <div class="tabs">
          <button :class="{ on: detail === 'story' }" @click="detail = 'story'">القصة</button>
          <button :class="{ on: detail === 'all' }" @click="detail = 'all'">كل خطوة</button>
        </div>
        <select v-model.number="speed" class="select mini" aria-label="السرعة"><option :value="1800">هادئ</option><option :value="1100">عادي</option><option :value="450">سريع</option></select>
        <span class="muted small keys">← → للتنقل</span>
      </div>
      <div class="markers" dir="ltr">
        <button v-for="m in markers" :key="m.k" class="mk" :class="['m-' + m.type, { on: m.k === idx }]" :title="EVENT_LABEL[m.type]" :aria-label="`حدث ${m.k + 1}: ${EVENT_LABEL[m.type]}`" @click="idx = m.k" />
      </div>
      <div class="legend small muted">
        <span><i class="m-call" /> استدعاء</span><span><i class="m-return" /> إرجاع</span><span><i class="m-log" /> طباعة</span><span><i class="m-timer-add" /> مؤقت</span><span><i class="m-micro-run" /> مهمة دقيقة</span><span><i class="m-suspend" /> await</span><span><i class="m-step" /> تغيّر قيمة</span>
      </div>
      <p class="muted small honest">ما تراه مأخوذ من تشغيل حقيقي للكود في عامل معزول. حدود معروفة: المؤقتات بساعة افتراضية، و«المهام الدقيقة» الظاهرة هي ما سُجّل عبر then وqueueMicrotask (انتظارات await الداخلية تظهر كأحداث await/استئناف)، ودوال المولّدات لا تظهر كإطارات مستقلة.</p>
    </section>
  </div>
</template>

<style scoped>
.viz { padding-top: 20px; }
.v-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 16px; margin-bottom: 16px; }
.v-head h1 { font-size: 2rem; margin: 2px 0; }
.v-head p { margin: 0; max-width: 72ch; }
.ex-row { display: flex; gap: 6px; flex-wrap: wrap; }
.top { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 14px; }
.code-box { overflow: hidden; }
.bar { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--line); }
.narrator { padding: 16px 18px; display: flex; flex-direction: column; gap: 10px; min-height: 340px; position: relative; overflow: hidden; }
.narrator::before { content: ''; position: absolute; inset-inline-start: 0; top: 0; bottom: 0; width: 4px; background: var(--ev, var(--line-2)); transition: background 300ms; }
.ev-call { --ev: var(--mint); } .ev-return { --ev: var(--c-css); } .ev-log { --ev: var(--accent); } .ev-timer-add, .ev-timer-run { --ev: var(--c-html); } .ev-micro-add, .ev-micro-run { --ev: var(--c-vue); } .ev-suspend, .ev-resume { --ev: #c79bff; } .ev-error { --ev: var(--bad); }
.n-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.badge-ev { font-size: 12px; font-weight: 600; padding: 2px 10px; border-radius: 999px; background: color-mix(in srgb, var(--ev, var(--muted)) 18%, transparent); color: var(--ev, var(--text)); }
.phase { font-size: 12.5px; color: var(--text-2); display: flex; align-items: center; gap: 6px; }
.phase .dot { color: var(--accent); }
.clock { font-size: 12px; color: var(--muted); display: flex; gap: 4px; align-items: center; }
.story { font-size: 17px; line-height: 1.9; margin: 4px 0 0; min-height: 4.5em; }
.out { margin-top: auto; }
.out-lines { background: var(--code-bg); border-radius: 10px; padding: 6px 10px; max-height: 110px; overflow: auto; font-size: 12.5px; margin-top: 6px; }
.out-lines > div { unicode-bidi: plaintext; }
.out-lines .fresh { color: var(--accent); }
.intro { margin: auto; text-align: center; color: var(--text-2); display: grid; justify-items: center; gap: 6px; max-width: 40ch; }
.intro :deep(svg) { color: var(--accent); }
.bad { color: var(--bad); }
.stage { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, .95fr); gap: 14px; margin-top: 14px; min-height: 340px; }
.stage.empty { opacity: .55; }
.wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; z-index: 2; color: color-mix(in srgb, var(--mint) 75%, transparent); }
.wires path { fill: none; stroke: currentColor; stroke-width: 1.6; }
.wires path.hot { stroke: var(--accent); stroke-width: 2.2; color: var(--accent); }
.col { background: var(--bg-2); border: 1px solid var(--line); border-radius: var(--r-lg); padding: 12px; min-width: 0; }
.col h3 { font-size: 14.5px; display: flex; align-items: center; gap: 8px; margin: 0; font-weight: 600; }
.hint { font-size: 12.5px; color: var(--muted); margin: 2px 0 10px; }
.stack { display: grid; gap: 8px; }
.frame { border: 1px solid var(--line-2); border-radius: 12px; padding: 8px 10px; background: var(--bg); transition: border-color 300ms, box-shadow 300ms, opacity 300ms; }
.frame.top { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.frame.global { border-style: dashed; }
.frame.idle { opacity: .65; }
.f-name { font-weight: 600; font-size: 13.5px; margin-bottom: 4px; }
.var { display: flex; align-items: center; gap: 8px; padding: 2px 4px; border-radius: 6px; font-size: 12.5px; transition: background 400ms; }
.var.changed { background: var(--accent-soft); }
.vn { color: var(--syn-prop); }
.vp { margin-inline-start: auto; direction: ltr; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.p-num { color: var(--syn-number); } .p-str { color: var(--syn-string); } .p-bool, .p-undef, .p-null { color: var(--syn-keyword); } .p-fn { color: var(--syn-fn); font-style: italic; } .p-tdz { color: var(--muted); font-family: var(--font-ui); }
.vref { margin-inline-start: auto; background: var(--mint-soft); color: var(--mint); border-radius: 6px; padding: 0 6px; font-size: 11.5px; }
.empty-stack { font-size: 13px; color: var(--muted); border: 1px dashed var(--line-2); border-radius: 10px; padding: 10px; text-align: center; }
.objs { display: grid; gap: 10px; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
.obj { border: 1px solid color-mix(in srgb, var(--mint) 35%, transparent); background: var(--bg); border-radius: 12px; padding: 6px 8px; }
.o-head { font-size: 11.5px; color: var(--mint); border-bottom: 1px solid var(--line); padding-bottom: 3px; margin-bottom: 3px; }
.o-row { display: flex; gap: 8px; font-size: 12px; padding: 1px 0; }
.ok { color: var(--syn-prop); }
.lane { border: 1px solid var(--line); border-radius: 12px; padding: 8px 10px; margin-bottom: 8px; background: var(--bg); }
.l-title { font-size: 12px; color: var(--muted); margin-bottom: 6px; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }
.tk { font-size: 12px; padding: 3px 9px; border-radius: 8px; font-family: var(--font-code); }
.tk small { color: var(--muted); }
.timer { background: color-mix(in srgb, var(--c-html) 15%, transparent); color: var(--c-html); }
.task { background: color-mix(in srgb, var(--c-html) 25%, transparent); color: var(--text); outline: 1px solid var(--c-html); }
.micro { background: color-mix(in srgb, var(--c-vue) 18%, transparent); color: var(--c-vue); }
.none { font-size: 12px; color: var(--muted); }
.rules { margin: 10px 0 0; padding-inline-start: 1.2em; font-size: 12.5px; color: var(--muted); display: grid; gap: 4px; }
.rules li.on { color: var(--text); font-weight: 600; }
.rules li.on::marker { color: var(--accent); }
.track { margin-top: 14px; padding: 12px 14px; }
.t-controls { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.select.mini { min-height: 30px; padding: 2px 8px; width: auto; }
.keys { margin-inline-start: auto; }
.markers { display: flex; flex-wrap: wrap; gap: 3px; margin: 12px 0 8px; direction: rtl; }
.mk { width: 10px; height: 18px; border-radius: 3px; border: 0; cursor: pointer; background: var(--line-2); padding: 0; transition: transform 120ms; }
.mk.on { transform: scaleY(1.4); outline: 2px solid var(--text); }
.m-call { background: var(--mint) !important; } .m-return { background: var(--c-css) !important; } .m-log { background: var(--accent) !important; }
.m-timer-add, .m-timer-run, .m-timer-clear { background: var(--c-html) !important; } .m-micro-add, .m-micro-run { background: var(--c-vue) !important; }
.m-suspend, .m-resume { background: #c79bff !important; } .m-error { background: var(--bad) !important; } .m-step { background: var(--bg-4) !important; }
.legend { display: flex; flex-wrap: wrap; gap: 14px; }
.legend i { display: inline-block; width: 9px; height: 9px; border-radius: 2px; margin-inline-end: 4px; vertical-align: -1px; }
.honest { margin: 10px 0 0; }
.frame-enter-active, .frame-leave-active { transition: all 320ms var(--ease); }
.frame-enter-from { opacity: 0; transform: translateY(-10px) scale(.97); }
.frame-leave-to { opacity: 0; transform: translateX(-16px); }
@media (max-width: 1100px) { .stage { grid-template-columns: 1fr 1fr; } .loop { grid-column: 1 / -1; } }
@media (max-width: 760px) { .top, .stage { grid-template-columns: 1fr; } .wires { display: none; } }
</style>
