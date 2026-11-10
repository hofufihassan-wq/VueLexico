// عامل تشغيل معزول: لا يملك وصولًا إلى DOM أو localStorage الخاص بالصفحة.
// نعطّل أدوات الشبكة قبل تشغيل كود المستخدم (حماية إضافية، ليست عزلًا مطلقًا).
import { instrument } from './instrument.js'
import { execute } from './runtime.js'
import { runJsTests } from './jsTests.js'

for (const k of ['fetch', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'importScripts', 'indexedDB', 'caches', 'BroadcastChannel']) {
  try { Object.defineProperty(self, k, { value: undefined, configurable: false, writable: false }) } catch { /* ignore */ }
}

self.onmessage = async (ev) => {
  const { id, kind, source, spec, limits } = ev.data || {}
  try {
    if (kind === 'test') {
      const result = await runJsTests(source, spec)
      self.postMessage({ id, result })
      return
    }
    const inst = instrument(source, { mode: kind === 'trace' ? 'trace' : 'lines' })
    if (!inst.ok) {
      self.postMessage({ id, result: { status: 'syntax', error: { name: 'SyntaxError', message: inst.error.message }, errorLine: inst.error.line, errorColumn: inst.error.column, events: [], logs: [] } })
      return
    }
    const result = await execute(inst.code, inst.meta, { patchPromise: true, trackUnhandled: true, limits })
    delete result.drain
    result.meta = inst.meta
    self.postMessage({ id, result })
  } catch (e) {
    self.postMessage({ id, result: { status: 'error', error: { name: e?.name || 'Error', message: String(e?.message || e) }, events: [], logs: [] } })
  }
}
