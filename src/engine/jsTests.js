// مصحّح تمارين JavaScript: يشغّل كود المتعلّم فعليًا ثم يستدعي دواله بمدخلات
// محددة ويقارن النتائج بعمق (وليس بمطابقة النص). يعمل داخل Worker وفي Node.
import { instrument } from './instrument.js'
import { execute, createSerializer, toText } from './runtime.js'

const realSetTimeout = globalThis.setTimeout.bind(globalThis)

export function deepEqual(a, b, seen = new WeakMap()) {
  if (Object.is(a, b)) return true
  if (typeof a === 'number' && typeof b === 'number') return Math.abs(a - b) < 1e-9
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  if (seen.get(a) === b) return true
  seen.set(a, b)
  if (Array.isArray(a) !== Array.isArray(b)) return false
  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map && b instanceof Map) || a.size !== b.size) return false
    for (const [k, v] of a) if (!b.has(k) || !deepEqual(v, b.get(k), seen)) return false
    return true
  }
  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set && b instanceof Set) || a.size !== b.size) return false
    for (const v of a) if (!b.has(v)) return false
    return true
  }
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  const ka = Object.keys(a)
  const kb = Object.keys(b)
  if (ka.length !== kb.length) return false
  for (const k of ka) if (!Object.prototype.hasOwnProperty.call(b, k) || !deepEqual(a[k], b[k], seen)) return false
  return true
}

const clone = (v) => (typeof structuredClone === 'function' ? structuredClone(v) : JSON.parse(JSON.stringify(v)))

function show(v) {
  const { ser } = createSerializer()
  const heap = new Map()
  const s = ser(v, heap)
  return toText(s, Object.fromEntries(heap), 0, false)
}

const withTimeout = (p, ms) => Promise.race([
  p,
  new Promise((_, rej) => realSetTimeout(() => rej(new Error('انتهت المهلة: لم تُرجع الدالة نتيجة خلال الوقت المسموح')), ms)),
])

const isThenable = (v) => v && (typeof v === 'object' || typeof v === 'function') && typeof v.then === 'function'

/**
 * spec: {
 *   exports: ['name'],                       أسماء يجب أن يعرّفها الكود
 *   cases: [{ title, call, args, expect }],  استدعاءات ومقارنة عميقة
 *   logs: ['سطر متوقع', ...],                 مخرجات الطرفية المتوقعة بالترتيب
 *   checks: [{ title, check: '(ctx) => true | "رسالة"' }]  فحوص مخصصة
 * }
 */
export async function runJsTests(source, spec = {}) {
  const inst = instrument(source, { mode: 'lines' })
  if (!inst.ok) {
    return { ok: false, syntax: inst.error, results: [], logs: [], passed: 0, total: countTests(spec) }
  }
  const names = spec.exports || []
  const exportCode = names.length
    ? `\n;__t.exp(() => ({${names.map((n) => `${JSON.stringify(n)}: typeof ${n} !== 'undefined' ? ${n} : undefined`).join(', ')}}));`
    : ''
  const run = await execute(inst.code + exportCode, inst.meta, { limits: { lineSteps: 3000000 } })
  const exportsObj = run.exports || {}
  const logs = run.logs.map((l) => l.text)
  const results = []

  if (run.error) {
    results.push({ title: 'تشغيل البرنامج دون أخطاء', pass: false, message: `${run.error.name}: ${run.error.message}`, line: run.errorLine })
  }

  for (const c of spec.cases || []) {
    const title = c.title || `${c.call}(${(c.args || []).map(show).join(', ')}) ← ${show(c.expect)}`
    const fn = exportsObj[c.call]
    if (typeof fn !== 'function') {
      results.push({ title, pass: false, message: `لم يتم العثور على دالة باسم ${c.call}. تأكد من تعريفها بنفس الاسم تمامًا.` })
      continue
    }
    try {
      let actual = fn(...clone(c.args || []))
      if (isThenable(actual)) actual = await withTimeout(Promise.resolve(actual), 1500)
      const pass = deepEqual(actual, c.expect)
      results.push({ title, pass, expected: show(c.expect), actual: show(actual), message: pass ? '' : `النتيجة ${show(actual)} بينما المتوقع ${show(c.expect)}` })
    } catch (e) {
      results.push({ title, pass: false, message: `حدث خطأ أثناء الاستدعاء: ${e && e.name ? e.name + ': ' + e.message : String(e)}` })
    }
  }

  if (spec.logs) {
    const exp = spec.logs.map((s) => String(s).trim())
    const got = logs.map((s) => s.trim())
    const pass = exp.length === got.length && exp.every((s, i) => s === got[i])
    let message = ''
    if (!pass) {
      const i = exp.findIndex((s, k) => s !== got[k])
      message = i === -1
        ? `طُبع ${got.length} سطرًا بينما المتوقع ${exp.length}`
        : `السطر ${i + 1}: المتوقع «${exp[i]}» لكن طُبع «${got[i] ?? '(لا شيء)'}»`
    }
    results.push({ title: 'مخرجات الطرفية مطابقة للمطلوب', pass, message, expected: exp.join('\n'), actual: got.join('\n') })
  }

  for (const ch of spec.checks || []) {
    try {
      // eslint-disable-next-line no-new-func
      const f = new Function('ctx', `return (${ch.check})(ctx)`)
      let r = f({ exports: exportsObj, logs, source, deepEqual })
      if (isThenable(r)) r = await withTimeout(Promise.resolve(r), 1500)
      const pass = r === true
      results.push({ title: ch.title, pass, message: pass ? '' : typeof r === 'string' ? r : 'لم يتحقق الشرط' })
    } catch (e) {
      results.push({ title: ch.title, pass: false, message: `خطأ أثناء الفحص: ${e && e.message ? e.message : e}` })
    }
  }

  const passed = results.filter((r) => r.pass).length
  return { ok: passed === results.length && results.length > 0, results, logs, passed, total: results.length, runtimeError: run.error, errorLine: run.errorLine }
}

function countTests(spec) {
  return (spec.cases?.length || 0) + (spec.logs ? 1 : 0) + (spec.checks?.length || 0)
}
