<script setup>
// مساحة عمل: محرر بتبويبات ملفات + معاينة معزولة + طرفية.
// الأنماط: web (HTML/CSS/JS)، vue (مكوّن .vue)، js (JavaScript فقط في عامل معزول).
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import CodeEditor from './CodeEditor.vue'
import PreviewFrame from './PreviewFrame.vue'
import ConsolePanel from './ConsolePanel.vue'
import Icon from './Icon.vue'
import { useRunner } from '../composables/useRunner.js'
import { runJs } from '../engine/runJs.js'
import { parseJs } from '../engine/instrument.js'
import { store } from '../store/index.js'

const props = defineProps({
  modelValue: { type: Object, required: true },
  mode: { type: String, default: 'web' },
  editable: { type: Array, default: null },
  readonly: { type: Array, default: () => [] },
  height: { type: String, default: 'min(72vh, 680px)' },
  autoRunDefault: { type: Boolean, default: undefined },
  compact: Boolean,
})
const emit = defineEmits(['update:modelValue', 'ran'])

const FILES = {
  web: [{ key: 'html', name: 'index.html', lang: 'html' }, { key: 'css', name: 'style.css', lang: 'css' }, { key: 'js', name: 'script.js', lang: 'js' }],
  vue: [{ key: 'vue', name: 'App.vue', lang: 'vue' }],
  js: [{ key: 'js', name: 'main.js', lang: 'js' }],
}
const visibleFiles = computed(() => {
  const all = FILES[props.mode] || FILES.web
  const allowed = new Set([...(props.editable || all.map((f) => f.key)), ...props.readonly])
  return all.filter((f) => allowed.has(f.key))
})
const active = ref(visibleFiles.value[0]?.key)
watch(visibleFiles, (v) => { if (!v.some((f) => f.key === active.value)) active.value = v[0]?.key })
const activeFile = computed(() => visibleFiles.value.find((f) => f.key === active.value) || visibleFiles.value[0])
const isReadonly = computed(() => props.readonly.includes(active.value))

const code = computed({
  get: () => props.modelValue[active.value] ?? '',
  set: (v) => emit('update:modelValue', { ...props.modelValue, [active.value]: v }),
})

const runner = useRunner()
const preview = ref(null)
const editor = ref(null)
const autoRun = ref(props.autoRunDefault ?? store.settings.autoRun)
const device = ref('fluid')
const jsLogs = ref([])
const jsErrors = ref([])
const running = ref(false)
const consoleOpen = ref(true)

const logs = computed(() => (props.mode === 'js' ? jsLogs.value : runner.logs.value))
const errors = computed(() => (props.mode === 'js' ? jsErrors.value : runner.errors.value))

const diagnostics = computed(() => {
  if (props.mode === 'js') {
    try { parseJs(props.modelValue.js || ''); return [] } catch (e) { return e.loc ? [{ line: e.loc.line, message: e.message }] : [] }
  }
  return runner.diagnostics.value.filter((d) => d.file === active.value).map((d) => ({ line: d.line, message: d.message }))
})

async function run() {
  running.value = true
  try {
    if (props.mode === 'js') {
      const r = await runJs(props.modelValue.js || '')
      jsLogs.value = (r.logs || []).map((l) => ({ level: l.level, text: l.text, line: l.line }))
      jsErrors.value = r.error ? [{ ...r.error, line: r.errorLine }] : []
      if (r.pendingMain && !r.error) jsLogs.value.push({ level: 'info', text: '(انتهى التنفيذ بينما ما زال وعد ينتظر — قد يكون هناك await لا يستقر أبدًا)' })
    } else {
      await runner.build(props.mode, props.modelValue)
    }
    emit('ran')
  } finally {
    running.value = false
  }
}

let timer
watch(() => props.modelValue, () => {
  if (!autoRun.value) return
  clearTimeout(timer)
  timer = setTimeout(run, props.mode === 'vue' ? 600 : 450)
}, { deep: true })
onMounted(run)
onBeforeUnmount(() => clearTimeout(timer))

function clearConsole() {
  if (props.mode === 'js') { jsLogs.value = []; jsErrors.value = [] } else runner.clear()
}

async function gotoLine(line) {
  if (props.mode === 'web') {
    const e = errors.value.find((x) => x.line === line)
    if (e?.file === 'script.js') active.value = 'js'
    else if (e?.file === 'index.html') active.value = 'html'
  }
  await nextTick()
  const text = props.modelValue[active.value] || ''
  const lines = text.split('\n')
  let off = 0
  for (let i = 0; i < Math.min(line - 1, lines.length); i++) off += lines[i].length + 1
  editor.value?.setCursor(off)
}

async function runChecks(checks) {
  await run()
  return preview.value ? preview.value.runChecks(checks, props.modelValue) : []
}

const widths = { fluid: '100%', tablet: '768px', phone: '375px' }
defineExpose({ run, runChecks, setStyle: (css) => preview.value?.setStyle(css) })
</script>

<template>
  <div class="ws" :class="[mode, { compact }]" :style="{ '--ws-h': height }">
    <section class="ws-edit">
      <div class="ws-bar">
        <div class="files" role="tablist">
          <button v-for="f in visibleFiles" :key="f.key" role="tab" :aria-selected="f.key === active" :class="{ on: f.key === active }" @click="active = f.key">
            <span class="dot" :class="'f-' + f.key" />{{ f.name }}
            <span v-if="readonly.includes(f.key)" class="ro" title="للقراءة فقط">قراءة</span>
          </button>
        </div>
        <span class="spacer" />
        <label class="auto" title="تشغيل تلقائي عند التعديل">
          <input v-model="autoRun" type="checkbox"> تلقائي
        </label>
        <button class="btn primary sm" :disabled="running" title="Ctrl+Enter" @click="run">
          <Icon name="play" :size="14" /> تشغيل
        </button>
      </div>
      <CodeEditor ref="editor" v-model="code" class="ws-code" :lang="activeFile?.lang" :readonly="isReadonly" :diagnostics="diagnostics" :label="`محرر ${activeFile?.name}`" @run="run" />
    </section>

    <section class="ws-out">
      <template v-if="mode !== 'js'">
        <div class="ws-bar">
          <span class="muted small"><Icon name="eye" :size="15" style="display:inline;vertical-align:-3px" /> المعاينة المعزولة</span>
          <span v-if="runner.building.value" class="muted small">· جارٍ الترجمة…</span>
          <span class="spacer" />
          <div class="tabs devices" aria-label="عرض المعاينة">
            <button :class="{ on: device === 'fluid' }" title="ملء المساحة" @click="device = 'fluid'"><Icon name="monitor" :size="15" /></button>
            <button :class="{ on: device === 'tablet' }" title="جهاز لوحي 768px" @click="device = 'tablet'"><Icon name="tablet" :size="15" /></button>
            <button :class="{ on: device === 'phone' }" title="جوال 375px" @click="device = 'phone'"><Icon name="phone" :size="15" /></button>
          </div>
        </div>
        <div class="stage" :class="device">
          <div class="device" :style="{ width: widths[device] }">
            <PreviewFrame ref="preview" :doc="runner.doc.value" :token="runner.token" title="معاينة الكود" @log="runner.onLog" @error="runner.onError" />
          </div>
        </div>
      </template>
      <div class="ws-console" :class="{ closed: !consoleOpen && mode !== 'js', full: mode === 'js' }">
        <button v-if="mode !== 'js'" class="toggle" @click="consoleOpen = !consoleOpen">
          {{ consoleOpen ? 'إخفاء الطرفية' : 'إظهار الطرفية' }}<span v-if="errors.length" class="err-n">{{ errors.length }}</span>
        </button>
        <ConsolePanel v-show="consoleOpen || mode === 'js'" :logs="logs" :errors="errors" :empty="mode === 'js' ? 'اضغط «تشغيل» (أو Ctrl+Enter) لترى المخرجات هنا.' : 'لا مخرجات. استخدم console.log في script.js.'" @clear="clearConsole" @goto="gotoLine" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.ws {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  height: var(--ws-h);
  min-height: 420px;
  border: 1px solid var(--line);
  border-radius: var(--r-lg);
  overflow: hidden;
  background: var(--bg-2);
  box-shadow: var(--shadow);
}
.ws-edit, .ws-out { display: flex; flex-direction: column; min-height: 0; min-width: 0; }
.ws-edit { border-inline-end: 1px solid var(--line); }
.ws-bar { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-bottom: 1px solid var(--line); background: var(--bg-2); min-height: 46px; }
.files { display: flex; gap: 2px; overflow-x: auto; }
.files button { display: flex; align-items: center; gap: 6px; border: 0; background: none; color: var(--text-2); padding: 6px 10px; border-radius: 8px; font-family: var(--font-code); font-size: 12.5px; cursor: pointer; white-space: nowrap; }
.files button.on { background: var(--bg-3); color: var(--text); }
.files .dot { width: 7px; height: 7px; }
.f-html { color: var(--c-html); } .f-css { color: var(--c-css); } .f-js { color: var(--c-js); } .f-vue { color: var(--c-vue); }
.ro { font-family: var(--font-ui); font-size: 10.5px; color: var(--muted); border: 1px solid var(--line-2); border-radius: 5px; padding: 0 4px; }
.auto { display: flex; align-items: center; gap: 5px; font-size: 12.5px; color: var(--muted); cursor: pointer; }
.ws-code { flex: 1; min-height: 0; }
.ws-out { background: var(--bg); }
.stage { flex: 1; min-height: 0; display: flex; justify-content: center; overflow: auto; background: repeating-linear-gradient(45deg, var(--bg), var(--bg) 8px, var(--bg-2) 8px, var(--bg-2) 9px); }
.stage.fluid { background: white; }
.device { height: 100%; max-width: 100%; background: white; transition: width 260ms var(--ease); box-shadow: 0 0 0 1px var(--line-2); }
.devices button { padding: 5px 8px; }
.ws-console { flex: 0 0 38%; min-height: 0; display: flex; flex-direction: column; border-top: 1px solid var(--line); position: relative; }
.ws-console.closed { flex: 0 0 auto; }
.ws-console.full { flex: 1; border-top: 0; }
.toggle { border: 0; background: var(--bg-2); color: var(--muted); font-size: 12px; padding: 4px 10px; cursor: pointer; text-align: start; border-bottom: 1px solid var(--line); display: flex; gap: 6px; align-items: center; }
.err-n { background: var(--bad); color: white; border-radius: 9px; font-size: 11px; padding: 0 6px; }

@media (max-width: 860px) {
  .ws { grid-template-columns: 1fr; grid-template-rows: minmax(300px, 1fr) minmax(320px, 1fr); height: auto; }
  .ws-edit { border-inline-end: 0; border-bottom: 1px solid var(--line); min-height: 340px; }
  .ws-out { min-height: 380px; }
}
</style>
