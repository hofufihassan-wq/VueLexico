// مخطط بيانات المستخدم المحفوظة محليًا، مع تنقية صارمة عند التحميل والاستيراد.
// التنقية تعيد بناء كل كائن من الحقول المعروفة فقط (لا نثق بأي ملف مستورد).

export const STORAGE_KEY = 'satr:v1'
export const SCHEMA_VERSION = 1
const MAX_CODE = 200_000
const MAX_TEXT = 20_000

export const LEITNER_DAYS = [0, 1, 2, 4, 8, 16]

export function defaultState() {
  const now = new Date().toISOString()
  return {
    app: 'satr',
    version: SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    settings: { theme: 'system', editorFontSize: 15, autoRun: true, reduceMotion: false, name: '' },
    lessons: {},
    lastLesson: null,
    drafts: [],
    practice: {},
    labs: { js: '', visualizer: '', explain: { lang: 'js', code: '' }, css: {} },
    reviews: {},
    favorites: [],
    tasks: [],
    activity: {},
  }
}

const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)
const str = (v, max = MAX_TEXT, def = '') => (typeof v === 'string' ? v.slice(0, max) : def)
const bool = (v, def = false) => (typeof v === 'boolean' ? v : def)
const num = (v, min, max, def) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : def)
const date = (v) => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? v : null)
const safeKey = (k) => typeof k === 'string' && k.length <= 120 && !['__proto__', 'constructor', 'prototype'].includes(k)
const oneOf = (v, list, def) => (list.includes(v) ? v : def)

function files(v) {
  if (!isObj(v)) return {}
  const out = {}
  for (const k of ['html', 'css', 'js', 'vue']) if (typeof v[k] === 'string') out[k] = v[k].slice(0, MAX_CODE)
  return out
}

function mapOf(v, fn, limit = 2000) {
  const out = {}
  if (!isObj(v)) return out
  let n = 0
  for (const k of Object.keys(v)) {
    if (!safeKey(k) || n++ >= limit) continue
    const r = fn(v[k])
    if (r !== undefined) out[k] = r
  }
  return out
}

export function sanitize(input) {
  const d = defaultState()
  if (!isObj(input)) return d
  const s = input
  const settings = isObj(s.settings) ? s.settings : {}
  const labs = isObj(s.labs) ? s.labs : {}
  return {
    app: 'satr',
    version: SCHEMA_VERSION,
    createdAt: date(s.createdAt) || d.createdAt,
    updatedAt: date(s.updatedAt) || d.updatedAt,
    settings: {
      theme: oneOf(settings.theme, ['system', 'dark', 'light'], 'system'),
      editorFontSize: num(settings.editorFontSize, 12, 24, 15),
      autoRun: bool(settings.autoRun, true),
      reduceMotion: bool(settings.reduceMotion, false),
      name: str(settings.name, 60),
    },
    lessons: mapOf(s.lessons, (l) => {
      if (!isObj(l)) return undefined
      const quiz = isObj(l.quiz) ? {
        answers: Array.isArray(l.quiz.answers) ? l.quiz.answers.slice(0, 50).map((a) => (Number.isInteger(a) ? a : null)) : [],
        score: num(l.quiz.score, 0, 100, 0),
        total: num(l.quiz.total, 0, 100, 0),
        at: date(l.quiz.at),
      } : null
      const ex = isObj(l.exercise) ? {
        code: typeof l.exercise.code === 'string' ? l.exercise.code.slice(0, MAX_CODE) : files(l.exercise.code),
        passed: bool(l.exercise.passed),
        attempts: num(l.exercise.attempts, 0, 1e6, 0),
        at: date(l.exercise.at),
      } : null
      return {
        status: oneOf(l.status, ['started', 'done'], 'started'),
        visitedAt: date(l.visitedAt),
        completedAt: date(l.completedAt),
        quiz,
        exercise: ex,
        note: str(l.note),
      }
    }),
    lastLesson: typeof s.lastLesson === 'string' && safeKey(s.lastLesson) ? s.lastLesson : null,
    drafts: (Array.isArray(s.drafts) ? s.drafts : []).slice(0, 200).filter(isObj).map((x) => ({
      id: str(x.id, 60) || Math.random().toString(36).slice(2),
      name: str(x.name, 80) || 'مسودة',
      mode: oneOf(x.mode, ['web', 'vue'], 'web'),
      files: files(x.files),
      createdAt: date(x.createdAt) || d.createdAt,
      updatedAt: date(x.updatedAt) || d.updatedAt,
    })),
    practice: mapOf(s.practice, (p) => {
      if (!isObj(p)) return undefined
      return {
        files: files(p.files),
        passed: bool(p.passed),
        best: num(p.best, 0, 100, 0),
        attempts: num(p.attempts, 0, 1e6, 0),
        hints: num(p.hints, 0, 20, 0),
        updatedAt: date(p.updatedAt),
        history: (Array.isArray(p.history) ? p.history : []).slice(-30).filter(isObj).map((h) => ({ at: date(h.at), score: num(h.score, 0, 100, 0) })),
      }
    }),
    labs: {
      js: str(labs.js, MAX_CODE),
      visualizer: str(labs.visualizer, MAX_CODE),
      explain: isObj(labs.explain) ? { lang: oneOf(labs.explain.lang, ['js', 'html', 'css', 'vue'], 'js'), code: str(labs.explain.code, MAX_CODE) } : { lang: 'js', code: '' },
      css: mapOf(labs.css, (v) => (typeof v === 'string' ? v.slice(0, MAX_CODE) : typeof v === 'number' || typeof v === 'boolean' ? v : undefined), 200),
    },
    reviews: mapOf(s.reviews, (r) => {
      if (!isObj(r)) return undefined
      return { box: num(r.box, 0, LEITNER_DAYS.length - 1, 0), due: date(r.due) || d.createdAt, last: date(r.last), seen: num(r.seen, 0, 1e6, 0), ok: num(r.ok, 0, 1e6, 0) }
    }, 5000),
    favorites: (Array.isArray(s.favorites) ? s.favorites : []).filter((x) => typeof x === 'string' && safeKey(x)).slice(0, 500),
    tasks: (Array.isArray(s.tasks) ? s.tasks : []).slice(0, 300).filter(isObj).map((t) => ({
      id: str(t.id, 60) || Math.random().toString(36).slice(2),
      text: str(t.text, 300),
      done: bool(t.done),
      createdAt: date(t.createdAt) || d.createdAt,
    })).filter((t) => t.text),
    activity: mapOf(s.activity, (v) => (typeof v === 'number' && v >= 0 ? Math.min(v, 1e5) : undefined), 1000),
  }
}

export function migrate(raw) {
  // نقطة مركزية لترقية الإصدارات القديمة مستقبلًا
  if (!isObj(raw)) return defaultState()
  return sanitize(raw)
}

export function exportBackup(state) {
  return JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2)
}

/** @returns {{ ok: true, state } | { ok: false, error: string }} */
export function parseBackup(text) {
  let data
  try { data = JSON.parse(text) } catch { return { ok: false, error: 'الملف ليس JSON صالحًا.' } }
  if (!isObj(data) || data.app !== 'satr') return { ok: false, error: 'هذا الملف ليس نسخة احتياطية من منصة سطر.' }
  if (typeof data.version !== 'number' || data.version > SCHEMA_VERSION) return { ok: false, error: 'إصدار النسخة الاحتياطية أحدث من إصدار المنصة.' }
  return { ok: true, state: migrate(data) }
}

// ---------- المراجعة المتباعدة (نظام صناديق لايتنر) ----------
export function scheduleReview(card, correct, now = new Date()) {
  const box = correct ? Math.min((card?.box ?? 0) + 1, LEITNER_DAYS.length - 1) : 0
  const due = new Date(now)
  due.setHours(0, 0, 0, 0)
  due.setDate(due.getDate() + (correct ? LEITNER_DAYS[box] : 0))
  return { box, due: due.toISOString(), last: now.toISOString(), seen: (card?.seen ?? 0) + 1, ok: (card?.ok ?? 0) + (correct ? 1 : 0) }
}

export const isDue = (card, now = new Date()) => !!card && Date.parse(card.due) <= now.getTime()

export const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
