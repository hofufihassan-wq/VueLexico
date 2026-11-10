// الحالة العامة للتطبيق + الحفظ التلقائي في localStorage.
// - كل تغيير يُحفظ بعد 400ms من آخر تعديل، ويُحفظ فورًا عند إخفاء الصفحة أو إغلاقها.
// - المزامنة بين التبويبات عبر حدث storage حتى لا يكتب تبويب فوق تقدّم آخر.
import { reactive, watch, readonly } from 'vue'
import { STORAGE_KEY, defaultState, migrate, exportBackup, parseBackup, scheduleReview, isDue, dayKey } from './schema.js'

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { state: defaultState(), fresh: true }
    return { state: migrate(JSON.parse(raw)), fresh: false }
  } catch {
    return { state: defaultState(), fresh: true, corrupted: true }
  }
}

const initial = readStorage()
export const store = reactive(initial.state)
export const saveStatus = reactive({ state: 'idle', at: null, error: '', available: true, corrupted: !!initial.corrupted, fresh: initial.fresh })

try { localStorage.setItem('satr:probe', '1'); localStorage.removeItem('satr:probe') } catch { saveStatus.available = false }

let timer = null
let applyingRemote = false

export function saveNow() {
  clearTimeout(timer)
  timer = null
  if (!saveStatus.available) return false
  try {
    store.updatedAt = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
    saveStatus.state = 'saved'
    saveStatus.at = Date.now()
    saveStatus.error = ''
    return true
  } catch (e) {
    saveStatus.state = 'error'
    saveStatus.error = e && e.name === 'QuotaExceededError' ? 'امتلأت مساحة التخزين المحلي. صدّر نسخة احتياطية واحذف مسودات قديمة.' : 'تعذّر الحفظ المحلي في هذا المتصفح.'
    return false
  }
}

watch(store, () => {
  if (applyingRemote) return
  saveStatus.state = 'pending'
  clearTimeout(timer)
  timer = setTimeout(saveNow, 400)
}, { deep: true })

if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => { if (timer) saveNow() })
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && timer) saveNow() })
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY || !e.newValue) return
    try {
      const next = migrate(JSON.parse(e.newValue))
      applyingRemote = true
      replaceState(next)
      saveStatus.state = 'synced'
      saveStatus.at = Date.now()
    } catch { /* تجاهل بيانات تالفة من تبويب آخر */ } finally {
      setTimeout(() => { applyingRemote = false }, 0)
    }
  })
}

function replaceState(next) {
  for (const k of Object.keys(store)) if (!(k in next)) delete store[k]
  Object.assign(store, next)
}

// ---------- إجراءات ----------
export function touchActivity(points = 1) {
  const k = dayKey()
  store.activity[k] = (store.activity[k] || 0) + points
}

export function lessonState(id) {
  if (!store.lessons[id]) store.lessons[id] = { status: 'started', visitedAt: new Date().toISOString(), completedAt: null, quiz: null, exercise: null, note: '' }
  return store.lessons[id]
}

export function visitLesson(id) {
  const l = lessonState(id)
  l.visitedAt = new Date().toISOString()
  store.lastLesson = id
}

export function completeLesson(id) {
  const l = lessonState(id)
  if (l.status !== 'done') { l.status = 'done'; l.completedAt = new Date().toISOString(); touchActivity(5) }
}

export function reviewCard(cardId, correct) {
  store.reviews[cardId] = scheduleReview(store.reviews[cardId], correct)
  touchActivity(1)
}

export function addToReview(cardId) {
  if (!store.reviews[cardId]) store.reviews[cardId] = { box: 0, due: new Date().toISOString(), last: null, seen: 0, ok: 0 }
}

export const dueCards = () => Object.entries(store.reviews).filter(([, c]) => isDue(c)).map(([id]) => id)

export function toggleFavorite(termId) {
  const i = store.favorites.indexOf(termId)
  if (i === -1) store.favorites.push(termId)
  else store.favorites.splice(i, 1)
}

export function exportData() {
  saveNow()
  return exportBackup(store)
}

export function importData(text, mode = 'replace') {
  const r = parseBackup(text)
  if (!r.ok) return r
  if (mode === 'merge') {
    const s = r.state
    for (const [k, v] of Object.entries(s.lessons)) {
      const cur = store.lessons[k]
      if (!cur || (v.status === 'done' && cur.status !== 'done') || (Date.parse(v.visitedAt || 0) > Date.parse(cur.visitedAt || 0))) store.lessons[k] = v
    }
    const draftIds = new Set(store.drafts.map((d) => d.id))
    for (const d of s.drafts) if (!draftIds.has(d.id)) store.drafts.push(d)
    for (const [k, v] of Object.entries(s.practice)) if (!store.practice[k] || v.best > store.practice[k].best) store.practice[k] = v
    for (const [k, v] of Object.entries(s.reviews)) if (!store.reviews[k]) store.reviews[k] = v
    for (const f of s.favorites) if (!store.favorites.includes(f)) store.favorites.push(f)
    const taskIds = new Set(store.tasks.map((t) => t.id))
    for (const t of s.tasks) if (!taskIds.has(t.id)) store.tasks.push(t)
    for (const [k, v] of Object.entries(s.activity)) store.activity[k] = Math.max(store.activity[k] || 0, v)
  } else {
    replaceState(r.state)
  }
  saveNow()
  return { ok: true }
}

export function resetAll() {
  replaceState(defaultState())
  saveNow()
}

export const storeReadonly = readonly(store)
