// يبني مستند المعاينة من ملفات المستخدم (وضع الويب أو Vue) ويجمع الطرفية والأخطاء.
import { ref } from 'vue'
import { buildWebDoc, buildVueDoc, newToken } from '../engine/sandbox.js'
import { compileSfc } from '../engine/vueCompile.js'

export function useRunner() {
  const token = newToken()
  const doc = ref('')
  const logs = ref([])
  const errors = ref([])
  const diagnostics = ref([]) // لتعليم الأخطاء داخل المحرر: { file, line, message }
  const building = ref(false)
  let seq = 0

  async function build(mode, files) {
    const my = ++seq
    logs.value = []
    errors.value = []
    diagnostics.value = []
    if (mode === 'vue') {
      building.value = true
      let r
      try {
        r = await compileSfc(files.vue || '')
      } catch (e) {
        r = { ok: false, errors: [{ message: String(e.message || e), line: 0 }] }
      }
      if (my !== seq) return false
      building.value = false
      if (!r.ok) {
        errors.value = r.errors.map((e) => ({ name: 'VueCompileError', message: e.message, line: e.line || 0, file: 'App.vue' }))
        diagnostics.value = r.errors.filter((e) => e.line).map((e) => ({ file: 'vue', line: e.line, message: e.message }))
        doc.value = buildVueDoc({ js: 'const __sfc__ = { render() { return null } }', css: '' }, { token }).doc
        return false
      }
      doc.value = buildVueDoc(r, { token }).doc
      return true
    }
    const { doc: d, syntaxErrors } = buildWebDoc(files, { token })
    diagnostics.value = syntaxErrors.map((s) => ({ file: s.file === 'script.js' ? 'js' : 'html', line: s.line, message: s.message }))
    // نُعيد تعيين المستند حتى لو لم يتغير ليُعاد التشغيل فعلًا
    doc.value = d + `<!-- ${my} -->`
    return syntaxErrors.length === 0
  }

  function onLog(l) {
    if (logs.value.length > 500) logs.value.shift()
    const last = logs.value[logs.value.length - 1]
    if (last && last.text === l.text && last.level === l.level && last.line === l.line) { last.count = (last.count || 1) + 1; return }
    logs.value.push(l)
  }
  function onError(e) {
    if (errors.value.some((x) => x.message === e.message && x.line === e.line)) return
    errors.value.push(e)
  }
  function clear() { logs.value = []; errors.value = [] }

  return { token, doc, logs, errors, diagnostics, building, build, onLog, onError, clear }
}
