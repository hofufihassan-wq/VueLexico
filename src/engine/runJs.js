// واجهة الخيط الرئيسي: تنشئ Worker جديدًا لكل تشغيل، وتنهيه قسرًا عند تجاوز المهلة.
const TIMEOUT = 5000

function spawn() {
  return new Worker(new URL('./js.worker.js', import.meta.url), { type: 'module' })
}

function runInWorker(payload, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    const worker = spawn()
    const timer = setTimeout(() => {
      worker.terminate()
      resolve({
        status: 'timeout',
        error: { name: 'TimeoutError', message: `أوقفنا التشغيل بعد ${timeout / 1000} ثوانٍ لأنه لم ينتهِ. تحقّق من الحلقات والاستدعاءات الذاتية.` },
        events: [],
        logs: [],
      })
    }, timeout)
    worker.onmessage = (ev) => {
      clearTimeout(timer)
      worker.terminate()
      resolve(ev.data.result)
    }
    worker.onerror = (ev) => {
      clearTimeout(timer)
      worker.terminate()
      resolve({ status: 'error', error: { name: 'WorkerError', message: ev.message || 'تعذّر تشغيل العامل' }, events: [], logs: [] })
    }
    worker.postMessage({ id: 1, ...payload })
  })
}

/** تشغيل مع تتبّع كامل للخطوات (مختبر JS والمحاكي) */
export const traceJs = (source, limits) => runInWorker({ kind: 'trace', source, limits })
/** تشغيل خفيف مع رقم السطر وحماية الحلقات */
export const runJs = (source) => runInWorker({ kind: 'lines', source })
/** تصحيح تمرين JavaScript وظيفيًا */
export const testJs = (source, spec) => runInWorker({ kind: 'test', source, spec }, 8000)
