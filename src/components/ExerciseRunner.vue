<script setup>
// مشغّل التمرين: محرر + معاينة + زر تحقق وظيفي + تلميحات متدرجة + عرض الحل عند الحاجة.
// الحالة (الكود والمحاولات والتلميحات) تُحفظ تلقائيًا في الكائن state الممرَّر.
import { ref, computed, watch } from 'vue'
import Workspace from './Workspace.vue'
import CheckResults from './CheckResults.vue'
import Icon from './Icon.vue'
import CodeEditor from './CodeEditor.vue'
import { fmt, toast } from '../composables/ui.js'
import { grade, modeOf, startFiles, solutionFiles, restoreFiles } from '../composables/grader.js'
import { touchActivity } from '../store/index.js'

const props = defineProps({
  ex: { type: Object, required: true },
  state: { type: Object, required: true }, // { files, attempts, passed, hints, best? }
  height: { type: String, default: 'min(70vh, 620px)' },
})
const emit = defineEmits(['graded'])

if (!props.state.files || !Object.keys(props.state.files).length) props.state.files = startFiles(props.ex)
const files = ref(restoreFiles(props.ex, props.state.files))
watch(files, (v) => { props.state.files = { ...v } }, { deep: true })

const ws = ref(null)
const busy = ref(false)
const result = ref(null)
const confirmReset = ref(false)
const showSolution = ref(false)
const mode = computed(() => modeOf(props.ex))
const hintsShown = computed(() => props.state.hints || 0)
const solutionView = computed(() => {
  const s = solutionFiles(props.ex)
  return mode.value === 'js' ? [{ lang: 'js', code: s.js }] : mode.value === 'vue' ? [{ lang: 'vue', code: s.vue }] : (props.ex.editable || ['html', 'css', 'js']).map((k) => ({ lang: k, code: s[k] || '' }))
})

async function check() {
  busy.value = true
  try {
    const r = await grade(props.ex, files.value, ws.value)
    result.value = r
    props.state.attempts = (props.state.attempts || 0) + 1
    touchActivity(1)
    if (r.ok && !props.state.passed) {
      props.state.passed = true
      touchActivity(4)
      toast(props.ex.requirements ? 'مبروك! حققت كل المتطلبات 🎉' : 'أحسنت! اجتزت كل الفحوص ✓', 'ok')
    }
    emit('graded', r)
  } finally {
    busy.value = false
  }
}
function hint() { props.state.hints = Math.min((props.state.hints || 0) + 1, props.ex.hints.length) }
function reset() {
  files.value = startFiles(props.ex)
  confirmReset.value = false
  result.value = null
}
function useSolution() {
  files.value = solutionFiles(props.ex)
  showSolution.value = false
}
const passedCount = computed(() => result.value?.results?.filter((r) => r.pass).length ?? 0)
const total = computed(() => result.value?.results?.length ?? 0)
</script>

<template>
  <div class="runner">
    <div class="prompt">
      <p v-html="fmt(ex.prompt)" />
    </div>
    <Workspace ref="ws" v-model="files" :mode="mode" :editable="ex.editable || null" :readonly="ex.readonly || []" :height="height" />
    <div class="actions">
      <button class="btn primary" :disabled="busy" @click="check">
        <Icon :name="busy ? 'clock' : 'check'" :size="16" /> {{ busy ? 'جارٍ التحقق…' : 'تحقّق من الحل' }}
      </button>
      <button class="btn" :disabled="hintsShown >= ex.hints.length" @click="hint"><Icon name="bulb" :size="16" /> تلميح ({{ hintsShown }}/{{ ex.hints.length }})</button>
      <span class="spacer" />
      <template v-if="confirmReset">
        <span class="muted small">سيُستبدل كودك بكود البداية.</span>
        <button class="btn danger sm" @click="reset">تأكيد</button>
        <button class="btn ghost sm" @click="confirmReset = false">إلغاء</button>
      </template>
      <button v-else class="btn ghost sm" @click="confirmReset = true"><Icon name="refresh" :size="15" /> البداية</button>
      <button class="btn ghost sm" @click="showSolution = !showSolution"><Icon name="eye" :size="15" /> {{ showSolution ? 'إخفاء الحل' : 'الحل المرجعي' }}</button>
      <span v-if="state.passed" class="chip on"><Icon name="check" :size="13" /> مُجتاز</span>
    </div>

    <TransitionGroup name="fade" tag="div" class="below">
      <ol v-if="hintsShown" key="hints" class="hints">
        <li v-for="(h, i) in ex.hints.slice(0, hintsShown)" :key="i"><Icon name="bulb" :size="15" /> <span v-html="fmt(h)" /></li>
      </ol>
      <div v-if="result" key="res" class="res" :class="{ ok: result.ok }">
        <div class="res-head">
          <strong>{{ result.ok ? 'كل الفحوص ناجحة' : 'بعض الفحوص لم تنجح بعد' }}</strong>
          <span v-if="result.score !== undefined" class="score">{{ result.score }}/100</span>
          <span v-else class="muted small">{{ passedCount }} من {{ total }}</span>
        </div>
        <CheckResults :results="result.results" :syntax="result.syntax" />
        <p class="muted small honest">الفحوص تتحقق من السلوك الفعلي لكودك (وليس من تطابق النص)، لكن نجاحها لا يعني خلوّ الكود من كل الأخطاء؛ هي تغطي الحالات المذكورة فقط.</p>
      </div>
      <div v-if="showSolution" key="sol" class="sol panel">
        <div class="row"><strong>الحل المرجعي</strong><span class="muted small">أحد الحلول الممكنة — حلّك قد يختلف ويبقى صحيحًا.</span><span class="spacer" /><button class="btn sm" @click="useSolution">ضعه في المحرر</button></div>
        <div v-for="s in solutionView" :key="s.lang" class="sol-code">
          <span class="mono muted small">{{ s.lang }}</span>
          <CodeEditor :model-value="s.code" :lang="s.lang" readonly :height="`${Math.min(s.code.split('\n').length, 16) * 22 + 24}px`" />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.prompt { background: var(--bg-2); border: 1px solid var(--line); border-inline-start: 3px solid var(--accent); border-radius: 12px; padding: 12px 16px; margin-bottom: 12px; font-size: 15.5px; line-height: 1.9; }
.prompt p { margin: 0; }
.actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 12px; }
.below { display: grid; gap: 12px; margin-top: 12px; }
.hints { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.hints li { display: flex; gap: 8px; align-items: flex-start; background: var(--accent-soft); border-radius: 10px; padding: 8px 12px; font-size: 14.5px; }
.hints :deep(svg) { margin-top: 5px; color: var(--accent); }
.res { border: 1px solid var(--line); border-radius: 14px; padding: 12px; background: var(--bg-2); }
.res.ok { border-color: color-mix(in srgb, var(--ok) 40%, transparent); }
.res-head { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.res.ok .res-head strong { color: var(--ok); }
.score { font-family: var(--font-display); font-size: 1.4rem; color: var(--accent); }
.honest { margin: 10px 0 0; }
.sol { padding: 12px; display: grid; gap: 10px; }
.sol-code { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.sol-code > span { display: block; padding: 2px 10px; border-bottom: 1px solid var(--line); }
</style>
