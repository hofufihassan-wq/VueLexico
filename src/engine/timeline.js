// إعادة بناء «حالة العالم» عند كل حدث في التتبّع: المكدس، متغيرات كل إطار، الكومة،
// المؤقتات المنتظرة، المهام الدقيقة، الطرفية، ومرحلة حلقة الأحداث — مع سرد عربي لكل حدث.
import { toText } from './runtime.js'

const short = (s, n = 40) => (s.length > n ? s.slice(0, n - 1) + '…' : s)
const val = (v, heap) => short(toText(v, heap || {}, 1, false), 48)

export const PHASE_AR = { script: 'الكود المتزامن', micro: 'المهام الدقيقة', timer: 'مهمة من الطابور' }

/**
 * @param {Array} events أحداث التتبّع من execute()
 * @param {object} meta بيانات التجهيز (steps, fns, globals)
 * @returns {{ states: Array, steps: number[] }}
 */
export function buildTimeline(events, meta) {
  const frames = new Map([[0, { id: 0, name: 'النطاق العام', fnId: -1, vars: null, names: meta.globals || [], returned: null }]])
  let globalsVals = null
  let heap = {}
  const timers = new Map()
  const micro = new Map()
  const logs = []
  const states = []
  const steps = []
  let lastVals = new Map() // frameId -> Map(name -> text)

  // يقارن قيم إطار قبل وبعد؛ الانتقال من «غير مهيأ» إلى قيمة تهيئة وليس تغييرًا
  function diffVals(prev, cur, names, vars, h) {
    const out = []
    names.forEach((n, k) => {
      const t = vars[k]?.t === 'tdz' ? '—' : val(vars[k], h)
      cur.set(n, t)
      if (prev.has(n) && prev.get(n) !== t && prev.get(n) !== '—') out.push({ name: n, from: prev.get(n), to: t })
    })
    return out
  }
  function applyGlobals(ev) {
    if (!ev.globals) return []
    const g = frames.get(0)
    const names = meta.globals || []
    const prev = lastVals.get(0) || new Map()
    const cur = new Map(prev)
    const ch = diffVals(prev, cur, names, ev.globals, ev.heap)
    lastVals.set(0, cur)
    g.vars = ev.globals
    g.names = names
    globalsVals = g.vars
    return ch
  }

  events.forEach((ev, i) => {
    let story = ''
    let changed = []
    // كومة تراكمية: الأحدث يحل محل الأقدم لنفس الكائن، فتبقى كائنات الإطارات الأدنى قابلة للعرض
    if (ev.heap && Object.keys(ev.heap).length) heap = { ...heap, ...ev.heap }
    switch (ev.type) {
      case 'step': {
        const names = meta.steps[ev.id]?.names || []
        const f = frames.get(ev.frame) || { id: ev.frame, name: '؟', vars: null, names }
        const prev = lastVals.get(ev.frame) || new Map()
        const cur = new Map()
        changed = diffVals(prev, cur, names, ev.vars, ev.heap)
        lastVals.set(ev.frame, cur)
        f.vars = ev.vars
        f.names = names
        frames.set(ev.frame, f)
        // آخر قيم معروفة للنطاق العام: إما من خطوة في المستوى الأعلى أو من لقطة المتغيرات العامة داخل دالة
        if (ev.globals) { const g = frames.get(0); g.vars = ev.globals; g.names = meta.globals || [] }
        globalsVals = frames.get(0).vars
        steps.push(i)
        story = changed.length
          ? `بعد السطر السابق تغيّر: ${changed.map((c) => `«${c.name}» من ${c.from} إلى ${c.to}`).join('، ')}. الآن يُنفَّذ السطر ${ev.line}.`
          : `يُنفَّذ السطر ${ev.line}${ev.frame !== 0 ? ` داخل «${f.name}»` : ''}.`
        break
      }
      case 'call': {
        const fn = meta.fns[ev.fnId]
        frames.set(ev.frame, { id: ev.frame, name: ev.name, fnId: ev.fnId, vars: ev.args, names: fn?.params || [], returned: null })
        lastVals.delete(ev.frame)
        const args = ev.args.map((a) => val(a, ev.heap))
        story = `استُدعيت «${ev.name}»${ev.line ? ` من السطر ${ev.line}` : ''}${args.length ? ` بالقيم (${args.join('، ')})` : ' بلا وسائط'}. أُنشئ إطار جديد فوق المكدس${fn?.params?.length ? ` وفيه المعاملات ${fn.params.join('، ')}` : ''}.`
        break
      }
      case 'return': {
        const f = frames.get(ev.frame)
        if (f) f.returned = ev.value
        story = ev.threw
          ? `خرجت «${ev.name}» بسبب خطأ رُمي داخلها، وأُزيل إطارها من المكدس.`
          : `أنهت «${ev.name}» عملها وأعادت ${val(ev.value, ev.heap)}${ev.line ? ` (السطر ${ev.line})` : ''}. أُزيل إطارها من المكدس وعادت القيمة إلى من استدعاها.`
        break
      }
      case 'log':
        logs.push({ text: ev.text, level: ev.level, line: ev.line })
        story = `طُبع في الطرفية: ${short(ev.text, 60)}`
        break
      case 'timer-add':
        timers.set(ev.timer, { id: ev.timer, name: ev.name, delay: ev.delay, due: ev.due, repeat: ev.repeat })
        story = `سُجّل مؤقت #${ev.timer} لتنفيذ «${ev.name}» بعد ${ev.delay}ms${ev.repeat ? ' بشكل متكرر' : ''}. ينتظر خارج المكدس (في واجهات المتصفح)، والكود يكمل فورًا دون توقف.`
        break
      case 'timer-clear':
        timers.delete(ev.timer)
        story = `أُلغي المؤقت #${ev.timer} قبل تنفيذه.`
        break
      case 'timer-run': {
        const t = timers.get(ev.timer)
        if (t && !t.repeat) timers.delete(ev.timer)
        story = `فرغ المكدس والمهام الدقيقة، والساعة الآن ${ev.clock}ms: حان دور المؤقت #${ev.timer}، فتنتقل «${ev.name}» من طابور المهام إلى المكدس.`
        break
      }
      case 'micro-add':
        micro.set(ev.micro, { id: ev.micro, name: ev.name, source: ev.source })
        story = ev.source === 'then'
          ? `سُجّلت «${ev.name}» عبر then: ستُنفَّذ كمهمة دقيقة عندما يستقر الوعد — ليس الآن.`
          : `أضيفت «${ev.name}» إلى طابور المهام الدقيقة.`
        break
      case 'micro-run':
        micro.delete(ev.micro)
        story = `المكدس فارغ من الكود المتزامن، فتُنفَّذ المهام الدقيقة قبل أي مؤقت: تبدأ «${ev.name}».`
        break
      case 'suspend':
        story = `عند await توقفت «${ev.name}» مؤقتًا وخرجت من المكدس بانتظار استقرار ${val(ev.value, ev.heap)}. باقي البرنامج يكمل.`
        break
      case 'resume':
        story = `استقر الوعد فعادت «${ev.name}» إلى المكدس لتكمل من بعد await، وقيمة الانتظار ${val(ev.value, ev.heap)}.`
        break
      case 'script-end':
        changed = applyGlobals(ev)
        story = `${changed.length ? `أثر السطر الأخير: ${changed.map((c) => `«${c.name}» أصبح ${c.to}`).join('، ')}. ` : ''}انتهى الكود المتزامن في المستوى الأعلى. الآن يأتي دور حلقة الأحداث: المهام الدقيقة أولًا، ثم المؤقتات بحسب مواعيدها.`
        break
      case 'error':
        story = `حدث خطأ: ${ev.error.name}: ${ev.error.message}`
        break
      case 'done':
        changed = applyGlobals(ev)
        story = `${ev.status === 'ok' ? 'انتهى التنفيذ بالكامل.' : 'توقّف التنفيذ.'}${changed.length ? ` القيم النهائية: ${changed.map((c) => `«${c.name}» = ${c.to}`).join('، ')}.` : ''}`
        break
    }

    // المكدس الحالي بأسماء الإطارات وقيمها
    const stack = (ev.stack || []).map((id) => {
      const f = frames.get(id) || { id, name: '؟', names: [], vars: [] }
      return { id, name: f.name, names: f.names || [], vars: f.vars || [] }
    })
    const g = frames.get(0)
    const globalsFrame = !ev.stack?.includes(0) && globalsVals ? { id: 0, name: 'النطاق العام', names: g.names || [], vars: g.vars || [] } : null
    states.push({
      i,
      ev,
      story,
      changed,
      line: ev.line || 0,
      phase: ev.phase,
      clock: ev.clock,
      stack,
      globals: globalsFrame,
      heap,
      timers: [...timers.values()].sort((a, b) => a.due - b.due),
      micro: [...micro.values()],
      logCount: logs.length,
    })
  })
  return { states, steps, logs }
}

export const EVENT_LABEL = {
  step: 'سطر', call: 'استدعاء', return: 'إرجاع', log: 'طباعة', 'timer-add': 'مؤقت', 'timer-run': 'تشغيل مؤقت', 'timer-clear': 'إلغاء مؤقت',
  'micro-add': 'تسجيل مهمة دقيقة', 'micro-run': 'مهمة دقيقة', suspend: 'await', resume: 'استئناف', 'script-end': 'نهاية المتزامن', error: 'خطأ', done: 'النهاية',
}
