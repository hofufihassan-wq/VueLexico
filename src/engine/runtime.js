// بيئة تشغيل الكود المُجهَّز: تسجّل الخطوات والاستدعاءات وسجلّ الطرفية
// وتحاكي المؤقتات (setTimeout/setInterval) بساعة افتراضية حتمية،
// ثم تُفرغ حلقة الأحداث: المهام الدقيقة (microtasks) أولًا ثم المؤقت الأقرب موعدًا.
// تعمل داخل Web Worker في المتصفح، وتعمل كذلك في Node لأغراض الاختبار.

export const DEFAULT_LIMITS = {
  record: 2500, // أقصى عدد خطوات تُسجَّل بتفاصيلها
  steps: 200000, // أقصى عدد خطوات تنفيذ قبل الإيقاف (نمط التتبّع)
  lineSteps: 5000000, // أقصى عدد خطوات في نمط الأسطر
  events: 6000, // أقصى عدد أحداث غير الخطوات
  timers: 300, // أقصى عدد مهام مؤقتات تُنفَّذ
  heapObjects: 50,
  entries: 40,
  logs: 400,
}

export class LimitError extends Error {
  constructor(message) {
    super(message)
    this.name = 'LimitError'
  }
}

const realSetTimeout = globalThis.setTimeout.bind(globalThis)
const macrotask = () => new Promise((r) => realSetTimeout(r, 0))

const STRING_LIMIT = 400

export function createSerializer(limits = DEFAULT_LIMITS) {
  const ids = new WeakMap()
  let seq = 0
  const refId = (o) => {
    let id = ids.get(o)
    if (id === undefined) { id = ++seq; ids.set(o, id) }
    return id
  }

  function describe(o, id, heap) {
    if (heap.has(id)) return
    if (heap.size >= limits.heapObjects) return
    const entry = { id, kind: 'object', ctor: '', entries: [], more: 0 }
    heap.set(id, entry)
    const push = (k, v) => {
      if (entry.entries.length >= limits.entries) { entry.more++; return }
      entry.entries.push([k, ser(v, heap)])
    }
    try {
      if (Array.isArray(o)) {
        entry.kind = 'array'
        entry.length = o.length
        for (let i = 0; i < o.length; i++) {
          if (i >= limits.entries) { entry.more = o.length - i; break }
          entry.entries.push([String(i), i in o ? ser(o[i], heap) : { t: 'hole' }])
        }
        return
      }
      if (o instanceof Map) { entry.kind = 'map'; entry.length = o.size; for (const [k, v] of o) { if (entry.entries.length >= limits.entries) { entry.more++; continue } entry.entries.push([ser(k, heap), ser(v, heap)]) } return }
      if (o instanceof Set) { entry.kind = 'set'; entry.length = o.size; for (const v of o) { if (entry.entries.length >= limits.entries) { entry.more++; continue } entry.entries.push([null, ser(v, heap)]) } return }
      if (o instanceof Date) { entry.kind = 'date'; entry.text = isNaN(o) ? 'Invalid Date' : o.toISOString(); return }
      if (o instanceof RegExp) { entry.kind = 'regexp'; entry.text = String(o); return }
      if (o instanceof Error) { entry.kind = 'error'; entry.text = `${o.name}: ${o.message}`; return }
      if (typeof Promise !== 'undefined' && o instanceof Promise) { entry.kind = 'promise'; return }
      const proto = Object.getPrototypeOf(o)
      const ctor = proto && proto.constructor && proto.constructor.name
      if (ctor && ctor !== 'Object') entry.ctor = ctor
      for (const k of Object.keys(o)) {
        const d = Object.getOwnPropertyDescriptor(o, k)
        if (!d) continue
        push(k, 'value' in d ? d.value : GETTER)
      }
    } catch {
      entry.kind = 'opaque'
    }
  }

  const GETTER = Symbol('getter')

  function ser(v, heap) {
    if (v === GETTER) return { t: 'getter' }
    switch (typeof v) {
      case 'number': return { t: 'num', v: Object.is(v, -0) ? '-0' : String(v) }
      case 'string': return { t: 'str', v: v.length > STRING_LIMIT ? v.slice(0, STRING_LIMIT) + '…' : v }
      case 'boolean': return { t: 'bool', v }
      case 'undefined': return { t: 'undef' }
      case 'bigint': return { t: 'big', v: String(v) + 'n' }
      case 'symbol': return { t: 'sym', v: String(v) }
      case 'function': {
        let isClass = false
        try { isClass = /^class[\s{]/.test(Function.prototype.toString.call(v)) } catch { /* ignore */ }
        return { t: 'fn', id: refId(v), name: v.name || '', cls: isClass }
      }
      default: {
        if (v === null) return { t: 'null' }
        const id = refId(v)
        if (heap) describe(v, id, heap)
        return { t: 'ref', id }
      }
    }
  }
  return { ser, refId }
}

// تحويل قيمة مُسلسلة إلى نص يشبه عرض الطرفية في المتصفح
export function toText(s, heap = {}, depth = 0, top = true) {
  if (!s) return ''
  switch (s.t) {
    case 'num': case 'big': case 'sym': return s.v
    case 'str': return top ? s.v : JSON.stringify(s.v)
    case 'bool': return String(s.v)
    case 'undef': return 'undefined'
    case 'null': return 'null'
    case 'hole': return '<فارغ>'
    case 'tdz': return '<غير مهيأ>'
    case 'getter': return '[Getter]'
    case 'fn': return s.cls ? `class ${s.name || ''}`.trim() : `ƒ ${s.name || ''}()`
    case 'ref': {
      const o = heap[s.id]
      if (!o) return '{…}'
      if (depth > 3) return o.kind === 'array' ? '[…]' : '{…}'
      const more = o.more ? `, … (${o.more} أخرى)` : ''
      switch (o.kind) {
        case 'array': return `[${o.entries.map(([, v]) => toText(v, heap, depth + 1, false)).join(', ')}${more}]`
        case 'map': return `Map(${o.length}) {${o.entries.map(([k, v]) => `${toText(k, heap, depth + 1, false)} => ${toText(v, heap, depth + 1, false)}`).join(', ')}}`
        case 'set': return `Set(${o.length}) {${o.entries.map(([, v]) => toText(v, heap, depth + 1, false)).join(', ')}}`
        case 'date': case 'regexp': case 'error': return o.text
        case 'promise': return 'Promise {…}'
        case 'opaque': return '[كائن]'
        default: {
          const body = o.entries.map(([k, v]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k)}: ${toText(v, heap, depth + 1, false)}`).join(', ')
          return `${o.ctor ? o.ctor + ' ' : ''}{${body}${more}}`
        }
      }
    }
    default: return String(s.v ?? '')
  }
}

function serializeError(e) {
  if (e && typeof e === 'object') return { name: e.name || 'Error', message: String(e.message ?? e), stack: String(e.stack || '') }
  return { name: 'Throw', message: (() => { try { return typeof e === 'string' ? e : JSON.stringify(e) } catch { return String(e) } })() }
}

/**
 * ينفّذ كودًا مُجهّزًا عبر instrument().
 * @param {string} code الكود الناتج
 * @param {object} meta بيانات التجهيز
 * @param {object} options { limits, patchPromise, exportNames, onConsole }
 */
export async function execute(code, meta, options = {}) {
  const limits = { ...DEFAULT_LIMITS, ...(options.limits || {}) }
  const trace = meta.mode === 'trace'
  const { ser } = createSerializer(limits)
  const events = []
  const logs = []
  let steps = 0
  let recorded = 0
  let truncated = false
  let line = 0
  let phase = 'script'
  let clock = 0
  let frameSeq = 0
  let otherEvents = 0
  const G = { id: 0, fnId: -1, name: 'النطاق العام', get: [], returned: false }
  const stack = [G]

  const heapObj = (heap) => Object.fromEntries(heap)
  const capture = (g, heap) => { try { return ser(g(), heap) } catch { return { t: 'tdz' } } }
  const pushEvent = (ev) => {
    if (otherEvents >= limits.events) { truncated = true; return }
    otherEvents++
    ev.line = ev.line ?? line
    ev.phase = phase
    ev.clock = clock
    ev.stack = stack.map((f) => f.id)
    events.push(ev)
  }
  const limitError = () => new LimitError('توقّف التنفيذ لأن الكود تجاوز الحد الأقصى من الخطوات — غالبًا توجد حلقة لا تنتهي أو استدعاء ذاتي بلا شرط توقف.')

  const frameInfo = new Map([[0, { id: 0, name: G.name, fnId: -1 }]])

  const __t = {
    G,
    line: () => line,
    globals(gs) { G.get = gs },
    // خطوة في نمط التتبّع
    s(id, gs) {
      if (++steps > limits.steps) throw limitError()
      const m = meta.steps[id]
      line = m.line
      if (recorded >= limits.record) { truncated = true; return }
      recorded++
      const heap = new Map()
      const top = stack[stack.length - 1]
      const vars = gs.map((g) => capture(g, heap))
      const globals = top === G || !top ? null : G.get.map((g) => capture(g, heap))
      events.push({ type: 'step', id, line, frame: top ? top.id : -1, stack: stack.map((f) => f.id), vars, globals, heap: heapObj(heap), phase, clock })
    },
    // خطوة في نمط الأسطر
    l(ln) {
      line = ln
      if (++steps > limits.lineSteps) throw limitError()
    },
    g() {
      if (++steps > (trace ? limits.steps : limits.lineSteps)) throw limitError()
    },
    e(fnId, gs) {
      const fn = meta.fns[fnId]
      const parent = stack[stack.length - 1]
      const f = { id: ++frameSeq, fnId, name: fn.name, returned: false, ret: undefined, parent: parent ? parent.id : null }
      frameInfo.set(f.id, { id: f.id, name: fn.name, fnId, parent: f.parent, callLine: line })
      const heap = new Map()
      const args = gs.map((g) => capture(g, heap))
      const callLine = line
      stack.push(f)
      pushEvent({ type: 'call', frame: f.id, fnId, name: fn.name, args, heap: heapObj(heap), line: callLine })
      return f
    },
    r(value, ln) {
      const top = stack[stack.length - 1]
      if (top && !top.returned) { top.returned = true; top.ret = value; top.retLine = ln }
      return value
    },
    x(f) {
      const idx = stack.lastIndexOf(f)
      if (idx === -1) return
      stack.splice(idx)
      const heap = new Map()
      pushEvent({ type: 'return', frame: f.id, name: f.name, value: f.returned ? ser(f.ret, heap) : null, threw: !f.returned, heap: heapObj(heap), line: f.retLine })
    },
    as(f, value, ln) {
      line = ln
      const heap = new Map()
      pushEvent({ type: 'suspend', frame: f.id, name: f.name, value: ser(value, heap), heap: heapObj(heap), line: ln })
      const idx = stack.lastIndexOf(f)
      if (idx !== -1) stack.splice(idx, 1)
      return value
    },
    aw(f, value) {
      stack.push(f)
      const heap = new Map()
      pushEvent({ type: 'resume', frame: f.id, name: f.name, value: ser(value, heap), heap: heapObj(heap) })
      return value
    },
    end() {
      const idx = stack.indexOf(G)
      if (idx !== -1) stack.splice(idx, 1)
      pushEvent({ type: 'script-end' })
    },
    exportsGetter: null,
    exp(fn) { __t.exportsGetter = fn },
  }

  // ---------- الطرفية ----------
  const makeConsole = () => {
    const out = {}
    const levels = ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir']
    for (const level of levels) {
      out[level] = (...args) => {
        if (logs.length >= limits.logs) { truncated = true; return }
        const heap = new Map()
        const sargs = args.map((a) => ser(a, heap))
        const h = heapObj(heap)
        const rec = { level: level === 'debug' || level === 'dir' || level === 'table' ? 'log' : level, args: sargs, heap: h, line, text: sargs.map((a) => toText(a, h)).join(' ') }
        logs.push(rec)
        if (options.onConsole) options.onConsole(rec)
        pushEvent({ type: 'log', level: rec.level, args: sargs, heap: h, text: rec.text })
      }
    }
    out.clear = () => {}
    out.assert = (cond, ...args) => { if (!cond) out.error('Assertion failed:', ...args) }
    out.count = (() => { const c = {}; return (l = 'default') => { c[l] = (c[l] || 0) + 1; out.log(`${l}: ${c[l]}`) } })()
    out.time = () => {}
    out.timeEnd = (l = 'default') => out.log(`${l}: (الوقت غير مقاس في المحاكي)`)
    out.group = (...a) => a.length && out.log(...a)
    out.groupEnd = () => {}
    return out
  }
  const fakeConsole = makeConsole()

  // ---------- المؤقتات الافتراضية ----------
  const timers = []
  let timerSeq = 0
  let timersRun = 0
  const fnName = (cb) => (typeof cb === 'function' ? cb.name || 'دالة مجهولة' : String(cb))
  const addTimer = (cb, ms, args, repeat) => {
    const id = ++timerSeq
    const delay = Math.max(0, Number(ms) || 0)
    timers.push({ id, cb, args, delay, due: clock + delay, seq: id, repeat })
    pushEvent({ type: 'timer-add', timer: id, delay, due: clock + delay, name: fnName(cb), repeat })
    return id
  }
  const clearTimer = (id) => {
    const i = timers.findIndex((t) => t.id === id)
    if (i !== -1) { timers.splice(i, 1); pushEvent({ type: 'timer-clear', timer: id }) }
  }
  const fakeSetTimeout = (cb, ms, ...args) => addTimer(cb, ms, args, false)
  const fakeSetInterval = (cb, ms, ...args) => addTimer(cb, ms, args, true)

  let microSeq = 0
  const fakeQueueMicrotask = (cb) => {
    const id = ++microSeq
    pushEvent({ type: 'micro-add', micro: id, name: fnName(cb), source: 'queueMicrotask' })
    Promise.resolve().then(() => {
      const prev = phase
      phase = 'micro'
      pushEvent({ type: 'micro-run', micro: id, name: fnName(cb), source: 'queueMicrotask' })
      try { cb() } catch (e) { reportError(e) } finally { phase = prev === 'script' ? 'micro' : prev }
    })
  }

  // ---------- تتبّع تفاعلات Promise ----------
  const origThen = Promise.prototype.then
  let patched = false
  if (options.patchPromise && trace) {
    patched = true
    Promise.prototype.then = function (onF, onR) {
      const id = ++microSeq
      const regLine = line
      const wrap = (cb, kind) => {
        if (typeof cb !== 'function') return cb
        return function (v) {
          phase = 'micro'
          pushEvent({ type: 'micro-run', micro: id, name: fnName(cb), source: kind, line: regLine })
          return cb.call(this, v)
        }
      }
      const isUser = typeof onF === 'function' || typeof onR === 'function'
      if (isUser) pushEvent({ type: 'micro-add', micro: id, name: fnName(onF || onR), source: 'then', line: regLine })
      return origThen.call(this, wrap(onF, 'fulfilled'), wrap(onR, 'rejected'))
    }
  }

  let error = null
  let errorLine = 0
  const reportError = (e) => {
    if (error) return
    error = serializeError(e)
    errorLine = line
    if (error.name === 'LimitError') error.limit = true
    pushEvent({ type: 'error', error })
  }

  let status = 'ok'
  let mainDone = false
  let exportsObj = null
  try {
    // الوضع المتساهل مقصود: يطابق سلوك السكربتات العادية في المتصفح
    // eslint-disable-next-line no-new-func
    const runner = new Function('__t', 'console', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval', 'queueMicrotask', 'globalThis', 'self', 'window',
      `return (async () => {\n${code}\n})()`)
    if (options.trackUnhandled && typeof globalThis.addEventListener === 'function') {
      globalThis.addEventListener('unhandledrejection', (ev) => { ev.preventDefault?.(); reportError(ev.reason) })
    }
    const sandboxGlobal = Object.create(null)
    const p = runner(__t, fakeConsole, fakeSetTimeout, fakeSetInterval, clearTimer, clearTimer, fakeQueueMicrotask, sandboxGlobal, sandboxGlobal, undefined)
    phase = 'micro'
    p.then(() => { mainDone = true; exportsObj = __t.exportsGetter ? __t.exportsGetter() : null }, (e) => { mainDone = true; reportError(e) })

    // حلقة الأحداث: نترك المهام الدقيقة تنتهي ثم ننفّذ المؤقت الأقرب
    for (;;) {
      await macrotask()
      if (error && error.limit) break
      if (!timers.length) break
      if (timersRun >= limits.timers) { truncated = true; break }
      timers.sort((a, b) => a.due - b.due || a.seq - b.seq)
      const t = timers.shift()
      clock = Math.max(clock, t.due)
      phase = 'timer'
      timersRun++
      const stackBefore = stack.length
      pushEvent({ type: 'timer-run', timer: t.id, name: fnName(t.cb) })
      try {
        if (typeof t.cb === 'function') t.cb(...t.args)
      } catch (e) {
        reportError(e)
        if (e instanceof LimitError) break
      }
      stack.length = Math.min(stack.length, stackBefore)
      if (t.repeat) { t.due = clock + Math.max(1, t.delay); t.seq = ++timerSeq; timers.push(t) }
      phase = 'micro'
    }
    await macrotask()
  } catch (e) {
    reportError(e)
  } finally {
    if (patched) Promise.prototype.then = origThen
  }

  if (error) status = error.limit ? 'limit' : 'error'
  pushEvent({ type: 'done', status })
  return {
    status,
    error,
    errorLine,
    events,
    logs,
    truncated,
    pendingTimers: timers.length,
    pendingMain: !mainDone,
    steps,
    exports: exportsObj,
    frames: [...frameInfo.values()],
  }
}
