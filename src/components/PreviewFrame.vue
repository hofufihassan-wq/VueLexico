<script setup>
// إطار المعاينة المعزول. لا يملك allow-same-origin، فيعمل في أصل مجهول بعيدًا عن بيانات المنصة.
// كل الرسائل القادمة منه تُقبل فقط إن جاءت من نافذته وتحمل الرمز الصحيح.
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { SANDBOX_ATTR } from '../engine/sandbox.js'

const props = defineProps({
  doc: { type: String, default: '' },
  token: { type: String, required: true },
  title: { type: String, default: 'معاينة' },
})
const emit = defineEmits(['log', 'error', 'loaded'])
const frame = ref(null)
const pending = new Map()
let runSeq = 0
let loadedResolve = null
let loadedPromise = Promise.resolve()

function resetLoaded() {
  loadedPromise = new Promise((r) => { loadedResolve = r })
}
resetLoaded()
// نعيد إنشاء الإطار لكل مستند جديد بدل تحديث srcdoc على إطار قائم: تحديث srcdoc أثناء
// تنقّل الإطار الأولي قد يضيع في Chromium، والإطار الجديد يضمن أيضًا بيئة نظيفة لكل تشغيل.
// متزامن عمدًا: يجب أن يُعاد ضبط وعد التحميل لحظة تغيّر المستند، قبل أي runChecks لاحق.
const version = ref(0)
watch(() => props.doc, () => { version.value++; resetLoaded() }, { flush: 'sync' })

function onMessage(e) {
  if (!frame.value || e.source !== frame.value.contentWindow) return
  const d = e.data
  if (!d || d.__satr !== props.token) return
  if (d.type === 'log') emit('log', { level: d.level, text: d.text, line: d.line, file: d.file })
  else if (d.type === 'error') emit('error', { name: d.name, message: d.message, line: d.line, file: d.file })
  else if (d.type === 'loaded') { loadedResolve?.(); emit('loaded') }
  else if (d.type === 'check-results') {
    const p = pending.get(d.runId)
    if (p) { pending.delete(d.runId); p(d.results) }
  }
}
onMounted(() => window.addEventListener('message', onMessage))
onBeforeUnmount(() => window.removeEventListener('message', onMessage))

async function runChecks(checks, files = {}) {
  await Promise.race([loadedPromise, new Promise((r) => setTimeout(r, 4000))])
  await new Promise((r) => setTimeout(r, 60))
  const runId = ++runSeq
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      pending.delete(runId)
      resolve(checks.map((c) => ({ title: c.title, pass: false, message: 'لم تستجب المعاينة (ربما توقف الكود في حلقة لا تنتهي أو حدث خطأ قبل التحميل).' })))
    }, 20000)
    pending.set(runId, (res) => { clearTimeout(timer); resolve(res) })
    frame.value?.contentWindow?.postMessage({ __satr: props.token, type: 'run-checks', runId, checks: checks.map((c) => ({ title: c.title, test: c.test, fail: c.fail })), files: JSON.parse(JSON.stringify(files)) }, '*')
  })
}

function setStyle(css) {
  frame.value?.contentWindow?.postMessage({ __satr: props.token, type: 'set-style', css }, '*')
}

defineExpose({ runChecks, setStyle, whenLoaded: () => loadedPromise })
</script>

<template>
  <iframe v-if="doc" :key="version" ref="frame" class="preview" :sandbox="SANDBOX_ATTR" :srcdoc="doc" :title="title" referrerpolicy="no-referrer" />
  <div v-else class="preview empty" />
</template>

<style scoped>
.preview { width: 100%; height: 100%; border: 0; background: white; display: block; }
</style>
