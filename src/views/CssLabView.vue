<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PreviewFrame from '../components/PreviewFrame.vue'
import CodeEditor from '../components/CodeEditor.vue'
import Icon from '../components/Icon.vue'
import { buildWebDoc, newToken } from '../engine/sandbox.js'
import { hslToRgb, rgbToHex, contrast } from '../composables/color.js'
import { draftFrom } from '../composables/handoff.js'
import { store } from '../store/index.js'
import { toast } from '../composables/ui.js'
import * as csstree from 'css-tree/dist/csstree.esm'

const router = useRouter()
const TOOLS = [
  { key: 'flex', label: 'Flexbox' },
  { key: 'grid', label: 'Grid' },
  { key: 'box', label: 'نموذج الصندوق' },
  { key: 'color', label: 'الألوان والتباين' },
  { key: 'anim', label: 'الحركة' },
  { key: 'resp', label: 'التجاوب' },
]
const tool = computed({ get: () => store.labs.css.tool || 'flex', set: (v) => { store.labs.css.tool = v } })

// حالة محفوظة لكل أداة (قيم بسيطة فقط)
const S = store.labs.css
const def = (k, v) => { if (S[k] === undefined) S[k] = v }
def('fDir', 'row'); def('fJustify', 'flex-start'); def('fAlign', 'stretch'); def('fWrap', 'nowrap'); def('fGap', 12); def('fCount', 4); def('fGrow', 0)
def('gCols', 'repeat(3, 1fr)'); def('gGap', 12); def('gCount', 7); def('gSpan', 2); def('gAuto', 140)
def('bW', 220); def('bPad', 20); def('bBorder', 4); def('bMargin', 24); def('bSizing', 'content-box')
def('cH', 174); def('cS', 72); def('cL', 30); def('bgH', 40); def('bgS', 30); def('bgL', 97)
def('aProp', 'translate'); def('aDur', 600); def('aEase', 'ease-in-out'); def('aDelay', 0); def('aIter', 'infinite'); def('aDir', 'alternate'); def('aX1', 0.42); def('aY1', 0); def('aX2', 0.58); def('aY2', 1)
def('rWidth', 760)
def('rCss', '.cards {\n  display: grid;\n  gap: 12px;\n  padding: 12px;\n}\n.card { background: #e0f2fe; padding: 16px; border-radius: 10px; }\n\n@media (min-width: 600px) {\n  .cards { grid-template-columns: 1fr 1fr; }\n}\n\n@media (min-width: 900px) {\n  .cards { grid-template-columns: repeat(3, 1fr); }\n  .card { background: #fde68a; }\n}\n')

const EXPLAIN = {
  fDir: { row: 'صف: العناصر بجانب بعضها، تبدأ من اليمين في الصفحات العربية.', 'row-reverse': 'صف معكوس: تبدأ من الطرف الآخر.', column: 'عمود: العناصر فوق بعضها. لاحظ أن justify وalign تبادلا دوريهما!', 'column-reverse': 'عمود معكوس.' },
  fJustify: { 'flex-start': 'كل العناصر عند بداية المحور الرئيسي.', center: 'العناصر متجمعة في المنتصف.', 'flex-end': 'العناصر عند نهاية المحور.', 'space-between': 'الأول عند البداية والأخير عند النهاية، والمسافات بينها متساوية.', 'space-around': 'مسافة حول كل عنصر؛ لذلك الأطراف تبدو نصف المسافة الداخلية.', 'space-evenly': 'كل المسافات متساوية تمامًا بما فيها الأطراف.' },
  fAlign: { stretch: 'تتمدد العناصر لتملأ ارتفاع الحاوية (الافتراضي) — ما لم يكن لها ارتفاع محدد.', 'flex-start': 'تلتصق ببداية المحور العرضي.', center: 'متوسطة على المحور العرضي — أشهر طريقة للتوسيط العمودي.', 'flex-end': 'تلتصق بنهاية المحور العرضي.', baseline: 'تصطف خطوط النص الأساسية رغم اختلاف الأحجام.' },
  fWrap: { nowrap: 'كل العناصر في سطر واحد حتى لو ضاقت (تنكمش).', wrap: 'تنتقل العناصر لسطر جديد عند ضيق المساحة.' },
}

// ---------- معاينة معزولة مشتركة لأدوات flex/grid/anim/resp ----------
const token = newToken()
const frame = ref(null)
const HTML = {
  flex: () => `<div class="box">${Array.from({ length: S.fCount }, (_, i) => `<div class="item i${i + 1}">${i + 1}</div>`).join('')}</div>`,
  grid: () => `<div class="grid">${Array.from({ length: S.gCount }, (_, i) => `<div class="cell c${i + 1}">${i + 1}</div>`).join('')}</div>`,
  anim: () => '<div class="stage"><div class="ball"></div></div>',
  resp: () => '<section class="cards"><article class="card">بطاقة 1</article><article class="card">بطاقة 2</article><article class="card">بطاقة 3</article><article class="card">بطاقة 4</article></section>',
}
const BASE = 'body{margin:0;font-family:system-ui,sans-serif;padding:16px;background:#f8fafc}'

const flexCss = computed(() => `.box {\n  display: flex;\n  flex-direction: ${S.fDir};\n  justify-content: ${S.fJustify};\n  align-items: ${S.fAlign};\n  flex-wrap: ${S.fWrap};\n  gap: ${S.fGap}px;\n}${S.fGrow ? `\n.i1 {\n  flex-grow: ${S.fGrow};\n}` : ''}`)
const gridCss = computed(() => `.grid {\n  display: grid;\n  grid-template-columns: ${S.gCols === 'auto-fit' ? `repeat(auto-fit, minmax(${S.gAuto}px, 1fr))` : S.gCols};\n  gap: ${S.gGap}px;\n}\n.c1 {\n  grid-column: span ${S.gSpan};\n}`)
const easing = computed(() => (S.aEase === 'custom' ? `cubic-bezier(${S.aX1}, ${S.aY1}, ${S.aX2}, ${S.aY2})` : S.aEase))
const KEYFRAMES = { translate: 'transform: translateX(0);|transform: translateX(-220px);', rotate: 'transform: rotate(0);|transform: rotate(-360deg);', scale: 'transform: scale(1);|transform: scale(1.6);', fade: 'opacity: 1;|opacity: .15;' }
const animCss = computed(() => {
  const [a, b] = KEYFRAMES[S.aProp].split('|')
  return `@keyframes move {\n  from { ${a} }\n  to { ${b} }\n}\n.ball {\n  animation: move ${S.aDur}ms ${easing.value} ${S.aDelay}ms ${S.aIter} ${S.aDir};\n}`
})
const DECOR = {
  flex: '.box{min-height:220px;background:#eef2ff;border:2px dashed #a5b4fc;border-radius:12px;padding:8px}.item{background:#6366f1;color:#fff;font-weight:700;padding:14px 18px;border-radius:10px;min-width:44px;text-align:center}.i2{padding-block:26px}.i3{font-size:22px}',
  grid: '.grid{background:#fff7ed;border:2px dashed #fdba74;border-radius:12px;padding:8px}.cell{background:#f97316;color:#fff;font-weight:700;padding:18px;border-radius:10px;text-align:center}',
  anim: '.stage{height:160px;display:flex;align-items:center;justify-content:flex-start;padding:0 24px;background:#ecfeff;border-radius:12px}.ball{width:56px;height:56px;border-radius:50%;background:#0891b2}',
  resp: '',
}
const toolCss = computed(() => {
  const t = tool.value
  if (t === 'flex') return BASE + DECOR.flex + '\n' + flexCss.value
  if (t === 'grid') return BASE + DECOR.grid + '\n' + gridCss.value
  if (t === 'anim') return BASE + DECOR.anim + '\n' + animCss.value
  if (t === 'resp') return BASE + '\n' + S.rCss
  return ''
})
const doc = ref('')
function rebuild() {
  if (!HTML[tool.value]) return
  doc.value = buildWebDoc({ html: HTML[tool.value](), css: toolCss.value }, { token }).doc
}
watch(tool, rebuild)
watch(() => [S.fCount, S.gCount], rebuild)
let cssTimer
watch(toolCss, (css) => { clearTimeout(cssTimer); cssTimer = setTimeout(() => frame.value?.setStyle(css), 30) })
onMounted(rebuild)
function replay() { rebuild() }

// ---------- نموذج الصندوق (حساب مباشر) ----------
const boxTotal = computed(() => (S.bSizing === 'border-box' ? S.bW : S.bW + 2 * S.bPad + 2 * S.bBorder))
const boxContent = computed(() => (S.bSizing === 'border-box' ? Math.max(0, S.bW - 2 * S.bPad - 2 * S.bBorder) : S.bW))
const boxCss = computed(() => `.box {\n  box-sizing: ${S.bSizing};\n  width: ${S.bW}px;\n  padding: ${S.bPad}px;\n  border: ${S.bBorder}px solid;\n  margin: ${S.bMargin}px;\n}`)

// ---------- الألوان ----------
const fg = computed(() => hslToRgb(S.cH, S.cS, S.cL))
const bg = computed(() => hslToRgb(S.bgH, S.bgS, S.bgL))
const ratio = computed(() => contrast(fg.value, bg.value))
const shades = computed(() => [92, 80, 65, 50, 38, 26, 16].map((l) => ({ l, hex: rgbToHex(hslToRgb(S.cH, S.cS, l)) })))
const colorCss = computed(() => `:root {\n  --text: hsl(${S.cH} ${S.cS}% ${S.cL}%); /* ${rgbToHex(fg.value)} */\n  --bg: hsl(${S.bgH} ${S.bgS}% ${S.bgL}%); /* ${rgbToHex(bg.value)} */\n}\nbody {\n  color: var(--text);\n  background: var(--bg);\n}`)

// ---------- منحنى التوقيت ----------
const PRESET_CURVES = { linear: [0, 0, 1, 1], ease: [0.25, 0.1, 0.25, 1], 'ease-in': [0.42, 0, 1, 1], 'ease-out': [0, 0, 0.58, 1], 'ease-in-out': [0.42, 0, 0.58, 1] }
const curve = computed(() => (S.aEase === 'custom' ? [S.aX1, S.aY1, S.aX2, S.aY2] : PRESET_CURVES[S.aEase] || PRESET_CURVES.ease))
const curvePath = computed(() => { const [a, b, c, d] = curve.value; return `M 0 100 C ${a * 100} ${100 - b * 100}, ${c * 100} ${100 - d * 100}, 100 0` })

// ---------- التجاوب: أي media query مطابقة للعرض الحالي ----------
const mediaRules = computed(() => {
  const out = []
  try {
    const ast = csstree.parse(S.rCss, { positions: true })
    csstree.walk(ast, { visit: 'Atrule', enter(n) {
      if (n.name !== 'media' || !n.prelude) return
      const text = csstree.generate(n.prelude)
      const min = text.match(/min-width:\s*(\d+)px/)
      const max = text.match(/max-width:\s*(\d+)px/)
      if (!min && !max) { out.push({ text, line: n.loc.start.line, active: null }); return }
      const w = S.rWidth
      const active = (!min || w >= +min[1]) && (!max || w <= +max[1])
      out.push({ text, line: n.loc.start.line, active })
    } })
  } catch { /* CSS غير مكتمل أثناء الكتابة */ }
  return out
})

const generated = computed(() => ({ flex: flexCss.value, grid: gridCss.value, box: boxCss.value, color: colorCss.value, anim: animCss.value, resp: S.rCss })[tool.value])
async function copy() {
  try { await navigator.clipboard.writeText(generated.value); toast('نُسخ الكود', 'ok') } catch { toast('تعذّر النسخ — حدّد النص يدويًا', 'bad') }
}
function toEditor() {
  const html = HTML[tool.value] ? HTML[tool.value]() : tool.value === 'box' ? '<div class="box">محتوى</div>' : '<h1>عنوان</h1><p>نص للتجربة.</p>'
  const css = (DECOR[tool.value] || '') + '\n' + generated.value
  router.push(`/editor/${draftFrom({ name: `من مختبر CSS: ${TOOLS.find((t) => t.key === tool.value).label}`, mode: 'web', files: { html, css, js: '' } })}`)
}
const opts = reactive({
  fDir: ['row', 'row-reverse', 'column', 'column-reverse'],
  fJustify: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'],
  fAlign: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
  fWrap: ['nowrap', 'wrap'],
})
const LABELS = { fDir: 'flex-direction', fJustify: 'justify-content', fAlign: 'align-items', fWrap: 'flex-wrap' }
</script>

<template>
  <div class="page wide csslab">
    <header class="c-head">
      <div>
        <div class="eyebrow">مختبر CSS</div>
        <h1>جرّب التصميم بيديك</h1>
        <p class="muted">كل أداة تغيّر قيمة حقيقية في صفحة معزولة، وتشرح لك ما تعنيه القيمة المختارة، وتولّد الكود الذي يمكنك نسخه أو نقله للمحرر.</p>
      </div>
      <div class="tabs tools" role="tablist">
        <button v-for="t in TOOLS" :key="t.key" role="tab" :aria-selected="tool === t.key" :class="{ on: tool === t.key }" @click="tool = t.key">{{ t.label }}</button>
      </div>
    </header>

    <div class="c-grid">
      <section class="panel controls">
        <!-- Flexbox -->
        <template v-if="tool === 'flex'">
          <div v-for="(list, key) in opts" :key="key" class="ctl">
            <div class="ctl-name mono">{{ LABELS[key] }}</div>
            <div class="seg">
              <button v-for="o in list" :key="o" :class="{ on: S[key] === o }" class="mono" @click="S[key] = o">{{ o }}</button>
            </div>
            <p class="why">{{ EXPLAIN[key][S[key]] }}</p>
          </div>
          <div class="ctl two">
            <label class="field">gap: {{ S.fGap }}px<input v-model.number="S.fGap" type="range" min="0" max="48"></label>
            <label class="field">عدد العناصر: {{ S.fCount }}<input v-model.number="S.fCount" type="range" min="1" max="10"></label>
            <label class="field">flex-grow للعنصر 1: {{ S.fGrow }}<input v-model.number="S.fGrow" type="range" min="0" max="3"></label>
          </div>
          <p class="why">flex-grow يجعل العنصر الأول يأخذ حصة من المساحة الفارغة؛ لاحظ كيف يقلّ أثر justify-content لأن المساحة الحرة لم تعد موجودة.</p>
        </template>

        <!-- Grid -->
        <template v-else-if="tool === 'grid'">
          <div class="ctl">
            <div class="ctl-name mono">grid-template-columns</div>
            <div class="seg">
              <button v-for="o in ['repeat(3, 1fr)', '1fr 2fr', '200px 1fr', 'repeat(4, 1fr)', 'auto-fit']" :key="o" class="mono" :class="{ on: S.gCols === o }" @click="S.gCols = o">{{ o === 'auto-fit' ? 'repeat(auto-fit, minmax())' : o }}</button>
            </div>
            <input v-if="S.gCols !== 'auto-fit'" v-model="S.gCols" class="input mono" dir="ltr" aria-label="قيمة مخصصة">
            <label v-else class="field">أصغر عرض للعمود: {{ S.gAuto }}px<input v-model.number="S.gAuto" type="range" min="80" max="300"></label>
            <p class="why">{{ S.gCols === 'auto-fit' ? 'يضع أكبر عدد ممكن من الأعمدة لا يقل عرض كل منها عن الحد الأدنى، ويوزّع الباقي. صغّر عرض نافذة المتصفح أو غيّر الحد لترى الأعمدة تتغير.' : 'fr تعني حصة من المساحة المتبقية بعد الأعمدة الثابتة والفجوات.' }}</p>
          </div>
          <div class="ctl two">
            <label class="field">gap: {{ S.gGap }}px<input v-model.number="S.gGap" type="range" min="0" max="40"></label>
            <label class="field">العنصر 1 يمتد على: {{ S.gSpan }} عمود<input v-model.number="S.gSpan" type="range" min="1" max="4"></label>
            <label class="field">عدد العناصر: {{ S.gCount }}<input v-model.number="S.gCount" type="range" min="1" max="16"></label>
          </div>
        </template>

        <!-- Box model -->
        <template v-else-if="tool === 'box'">
          <div class="ctl two">
            <label class="field">width: {{ S.bW }}px<input v-model.number="S.bW" type="range" min="80" max="360"></label>
            <label class="field">padding: {{ S.bPad }}px<input v-model.number="S.bPad" type="range" min="0" max="60"></label>
            <label class="field">border: {{ S.bBorder }}px<input v-model.number="S.bBorder" type="range" min="0" max="24"></label>
            <label class="field">margin: {{ S.bMargin }}px<input v-model.number="S.bMargin" type="range" min="0" max="60"></label>
          </div>
          <div class="ctl">
            <div class="ctl-name mono">box-sizing</div>
            <div class="seg"><button v-for="o in ['content-box', 'border-box']" :key="o" class="mono" :class="{ on: S.bSizing === o }" @click="S.bSizing = o">{{ o }}</button></div>
            <p class="why">{{ S.bSizing === 'content-box' ? `العرض المرئي = ${S.bW} + ${S.bPad}×2 + ${S.bBorder}×2 = ${boxTotal}px. أي أن width لا يشمل الحشوة والحد.` : `العرض المرئي = width = ${S.bW}px بالضبط، والمحتوى ينكمش إلى ${boxContent}px ليفسح للحشوة والحد.` }}</p>
          </div>
        </template>

        <!-- Colors -->
        <template v-else-if="tool === 'color'">
          <div class="ctl">
            <div class="ctl-name">لون النص (HSL)</div>
            <label class="field">الدرجة H: {{ S.cH }}°<input v-model.number="S.cH" type="range" min="0" max="360" class="hue"></label>
            <label class="field">التشبّع S: {{ S.cS }}%<input v-model.number="S.cS" type="range" min="0" max="100"></label>
            <label class="field">الإضاءة L: {{ S.cL }}%<input v-model.number="S.cL" type="range" min="0" max="100"></label>
          </div>
          <div class="ctl">
            <div class="ctl-name">لون الخلفية (HSL)</div>
            <label class="field">H: {{ S.bgH }}°<input v-model.number="S.bgH" type="range" min="0" max="360" class="hue"></label>
            <label class="field">S: {{ S.bgS }}%<input v-model.number="S.bgS" type="range" min="0" max="100"></label>
            <label class="field">L: {{ S.bgL }}%<input v-model.number="S.bgL" type="range" min="0" max="100"></label>
          </div>
          <p class="why">جرّب تغيير الإضاءة L وحدها: تحصل على درجات أفتح وأغمق من اللون نفسه — لهذا HSL مريحة للتصميم.</p>
        </template>

        <!-- Animation -->
        <template v-else-if="tool === 'anim'">
          <div class="ctl">
            <div class="ctl-name">ماذا يتحرك؟</div>
            <div class="seg">
              <button v-for="(v, k) in { translate: 'إزاحة', rotate: 'تدوير', scale: 'تكبير', fade: 'شفافية' }" :key="k" :class="{ on: S.aProp === k }" @click="S.aProp = k">{{ v }}</button>
            </div>
          </div>
          <div class="ctl two">
            <label class="field">المدة: {{ S.aDur }}ms<input v-model.number="S.aDur" type="range" min="100" max="3000" step="50"></label>
            <label class="field">التأخير: {{ S.aDelay }}ms<input v-model.number="S.aDelay" type="range" min="0" max="1500" step="50"></label>
          </div>
          <div class="ctl">
            <div class="ctl-name mono">animation-timing-function</div>
            <div class="seg"><button v-for="o in ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'custom']" :key="o" class="mono" :class="{ on: S.aEase === o }" @click="S.aEase = o">{{ o === 'custom' ? 'cubic-bezier' : o }}</button></div>
            <div class="curve-wrap">
              <svg viewBox="-10 -10 120 120" class="curve" aria-label="منحنى التوقيت">
                <rect x="0" y="0" width="100" height="100" class="frame-r" />
                <line x1="0" y1="100" :x2="curve[0] * 100" :y2="100 - curve[1] * 100" class="handle" />
                <line x1="100" y1="0" :x2="curve[2] * 100" :y2="100 - curve[3] * 100" class="handle" />
                <path :d="curvePath" class="cpath" />
              </svg>
              <div v-if="S.aEase === 'custom'" class="bez">
                <label v-for="k in ['aX1', 'aY1', 'aX2', 'aY2']" :key="k" class="field mono">{{ k.slice(1) }}: {{ S[k] }}<input v-model.number="S[k]" type="range" :min="k.includes('X') ? 0 : -0.5" :max="k.includes('X') ? 1 : 1.5" step="0.01"></label>
              </div>
              <p v-else class="why">المحور الأفقي هو الزمن والعمودي مقدار التقدم. المنحنى الحاد يعني سرعة أكبر في تلك اللحظة.</p>
            </div>
          </div>
          <div class="ctl two">
            <label class="field">التكرار<select v-model="S.aIter" class="select"><option value="1">مرة</option><option value="3">3 مرات</option><option value="infinite">لا نهائي</option></select></label>
            <label class="field">الاتجاه<select v-model="S.aDir" class="select"><option value="normal">normal</option><option value="alternate">alternate (ذهاب وإياب)</option><option value="reverse">reverse</option></select></label>
          </div>
          <button class="btn sm" @click="replay"><Icon name="refresh" :size="14" /> أعد تشغيل الحركة</button>
        </template>

        <!-- Responsive -->
        <template v-else>
          <div class="ctl">
            <label class="field">عرض نافذة المعاينة: <strong class="mono">{{ S.rWidth }}px</strong><input v-model.number="S.rWidth" type="range" min="320" max="1280" step="10"></label>
            <div class="seg"><button v-for="w in [360, 600, 768, 900, 1280]" :key="w" class="mono" :class="{ on: S.rWidth === w }" @click="S.rWidth = w">{{ w }}</button></div>
          </div>
          <div class="ctl">
            <div class="ctl-name">استعلامات الوسائط في الكود</div>
            <ul class="mq">
              <li v-for="m in mediaRules" :key="m.line" :class="{ on: m.active, unk: m.active === null }">
                <Icon :name="m.active ? 'check' : m.active === null ? 'dots' : 'x'" :size="14" />
                <span class="mono">@media {{ m.text }}</span>
                <span class="muted small">{{ m.active ? 'مطبّقة الآن' : m.active === null ? 'شرط لا نقيّمه هنا' : 'غير مطبّقة' }}</span>
              </li>
              <li v-if="!mediaRules.length" class="muted small">لا توجد @media في الكود.</li>
            </ul>
          </div>
          <div class="ctl editor-ctl">
            <div class="ctl-name">CSS (قابل للتعديل)</div>
            <CodeEditor v-model="S.rCss" lang="css" height="260px" />
          </div>
        </template>

        <div class="gen">
          <div class="row"><span class="ctl-name">الكود الناتج</span><span class="spacer" /><button class="btn ghost sm" @click="copy"><Icon name="copy" :size="14" /> نسخ</button><button class="btn ghost sm" @click="toEditor"><Icon name="external" :size="14" /> في المحرر</button></div>
          <CodeEditor :model-value="generated" lang="css" readonly :height="`${Math.min(generated.split('\n').length, 14) * 22 + 22}px`" />
        </div>
      </section>

      <section class="panel stage">
        <template v-if="['flex', 'grid', 'anim', 'resp'].includes(tool)">
          <div class="frame-wrap" :style="tool === 'resp' ? { width: S.rWidth + 'px' } : {}">
            <PreviewFrame ref="frame" :doc="doc" :token="token" title="معاينة مختبر CSS" @loaded="frame?.setStyle(toolCss)" />
          </div>
          <p v-if="tool === 'resp'" class="muted small cap">المعاينة إطار حقيقي بعرض {{ S.rWidth }}px، فالمتصفح نفسه يقيّم media queries.</p>
        </template>

        <div v-else-if="tool === 'box'" class="boxviz">
          <div class="layer margin" :style="{ padding: S.bMargin + 'px' }">
            <span class="tag">margin {{ S.bMargin }}</span>
            <div class="layer border" :style="{ padding: S.bBorder + 'px' }">
              <span class="tag">border {{ S.bBorder }}</span>
              <div class="layer padding" :style="{ padding: S.bPad + 'px' }">
                <span class="tag">padding {{ S.bPad }}</span>
                <div class="layer content" :style="{ width: boxContent + 'px' }">المحتوى<br><span class="mono">{{ boxContent }}px</span></div>
              </div>
            </div>
          </div>
          <div class="measure"><span class="mono">{{ boxTotal }}px</span> العرض المرئي · <span class="mono">{{ boxTotal + 2 * S.bMargin }}px</span> مع الهوامش</div>
        </div>

        <div v-else class="colorviz">
          <div class="sample" :style="{ color: rgbToHex(fg), background: rgbToHex(bg) }">
            <h2>عنوان تجريبي كبير</h2>
            <p>نص عادي بحجم القراءة المعتاد ليظهر أثر التباين على الراحة والوضوح.</p>
          </div>
          <div class="ratio">
            <div class="big display">{{ ratio.toFixed(2) }}:1</div>
            <div class="checks">
              <span :class="ratio >= 4.5 ? 'ok' : 'no'">AA نص عادي (4.5)</span>
              <span :class="ratio >= 3 ? 'ok' : 'no'">AA نص كبير (3)</span>
              <span :class="ratio >= 7 ? 'ok' : 'no'">AAA نص عادي (7)</span>
            </div>
            <p class="muted small">محسوبة بمعادلة الإضاءة النسبية في معيار WCAG 2.x.</p>
          </div>
          <div class="shades">
            <button v-for="s in shades" :key="s.l" :style="{ background: s.hex }" :title="`L ${s.l}% · ${s.hex}`" @click="S.cL = s.l"><span class="mono">{{ s.l }}</span></button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.csslab { padding-top: 20px; }
.c-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 14px; margin-bottom: 14px; }
.c-head h1 { font-size: 1.8rem; margin: 2px 0; }
.c-head p { margin: 0; max-width: 70ch; }
.c-grid { display: grid; grid-template-columns: minmax(300px, .8fr) minmax(0, 1.2fr); gap: 14px; align-items: start; }
.controls { padding: 14px; display: grid; gap: 16px; }
.ctl { display: grid; gap: 8px; }
.ctl.two { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; }
.ctl-name { font-size: 13px; font-weight: 600; color: var(--text-2); }
.seg { display: flex; flex-wrap: wrap; gap: 4px; }
.seg button { border: 1px solid var(--line-2); background: var(--bg); border-radius: 8px; padding: 4px 9px; font-size: 12.5px; cursor: pointer; color: var(--text-2); }
.seg button.on { border-color: var(--accent); background: var(--accent-soft); color: var(--text); }
.why { margin: 0; font-size: 13.5px; color: var(--text-2); background: var(--bg-3); border-radius: 8px; padding: 6px 10px; }
input[type='range'] { width: 100%; accent-color: var(--accent); }
.hue { accent-color: var(--mint); }
.gen { border-top: 1px dashed var(--line-2); padding-top: 12px; display: grid; gap: 8px; }
.gen :deep(.code-editor), .editor-ctl :deep(.code-editor) { border-radius: 10px; border: 1px solid var(--line); }
.stage { padding: 14px; min-height: 420px; position: sticky; top: 16px; overflow: auto; }
.frame-wrap { height: 420px; max-width: 100%; margin: 0 auto; border-radius: 12px; overflow: hidden; border: 1px solid var(--line-2); transition: width 200ms var(--ease); background: white; }
.cap { text-align: center; margin: 8px 0 0; }
.curve-wrap { display: grid; grid-template-columns: 140px 1fr; gap: 12px; align-items: center; }
.curve { width: 140px; height: 140px; background: var(--bg); border-radius: 10px; }
.frame-r { fill: none; stroke: var(--line-2); }
.handle { stroke: var(--muted); stroke-dasharray: 3 3; }
.cpath { fill: none; stroke: var(--accent); stroke-width: 3; }
.bez { display: grid; gap: 4px; }
.mq { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; }
.mq li { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 8px; background: var(--bg-3); font-size: 13px; flex-wrap: wrap; }
.mq li.on { background: var(--ok-soft); }
.mq li.on :deep(svg) { color: var(--ok); }
.boxviz { display: grid; justify-items: center; gap: 16px; padding: 20px 0; }
.layer { position: relative; border-radius: 6px; transition: padding 200ms var(--ease); }
.margin { background: repeating-linear-gradient(45deg, color-mix(in srgb, var(--c-html) 18%, transparent), color-mix(in srgb, var(--c-html) 18%, transparent) 6px, transparent 6px, transparent 12px); outline: 1px dashed var(--c-html); }
.border { background: color-mix(in srgb, var(--accent) 70%, black); }
.padding { background: color-mix(in srgb, var(--c-vue) 35%, transparent); }
.content { background: color-mix(in srgb, var(--c-css) 45%, transparent); min-height: 70px; display: grid; place-items: center; text-align: center; font-size: 13px; transition: width 200ms var(--ease); }
.tag { position: absolute; top: 2px; inset-inline-start: 6px; font-size: 10.5px; font-family: var(--font-code); color: var(--text); opacity: .85; }
.measure { font-size: 14px; color: var(--text-2); }
.colorviz { display: grid; gap: 16px; }
.sample { border-radius: 14px; padding: 26px; border: 1px solid var(--line); }
.sample h2 { font-family: var(--font-display); margin: 0 0 6px; }
.sample p { margin: 0; }
.ratio { display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
.big { font-size: 2.6rem; color: var(--accent); }
.checks { display: grid; gap: 4px; font-size: 13px; }
.checks .ok { color: var(--ok); } .checks .ok::before { content: '✓ '; }
.checks .no { color: var(--bad); } .checks .no::before { content: '✗ '; }
.shades { display: flex; gap: 6px; flex-wrap: wrap; }
.shades button { width: 52px; height: 52px; border-radius: 12px; border: 1px solid var(--line-2); cursor: pointer; display: grid; place-items: end center; padding-bottom: 4px; }
.shades span { font-size: 10.5px; background: rgb(0 0 0 / 45%); color: white; border-radius: 4px; padding: 0 4px; }
@media (max-width: 980px) { .c-grid { grid-template-columns: 1fr; } .stage { position: static; } }
</style>
