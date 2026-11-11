// أدوات واجهة مشتركة: الثيم، والإشعارات المؤقتة، ولوحة الأوامر، والتنزيل.
import { reactive, watch, ref } from 'vue'
import { store } from '../store/index.js'

// ---------- الثيم ----------
const media = typeof matchMedia !== 'undefined' ? matchMedia('(prefers-color-scheme: light)') : null
export const resolvedTheme = ref('dark')

function applyTheme() {
  const t = store.settings.theme === 'system' ? (media && media.matches ? 'light' : 'dark') : store.settings.theme
  resolvedTheme.value = t
  document.documentElement.dataset.theme = t
  document.documentElement.classList.toggle('reduce-motion', !!store.settings.reduceMotion)
}
export function initTheme() {
  applyTheme()
  watch(() => [store.settings.theme, store.settings.reduceMotion], applyTheme)
  media?.addEventListener?.('change', applyTheme)
}
export function toggleTheme() {
  store.settings.theme = resolvedTheme.value === 'dark' ? 'light' : 'dark'
}

// ---------- الإشعارات ----------
export const toasts = reactive([])
let tid = 0
export function toast(text, kind = 'info', ms = 3200) {
  const id = ++tid
  toasts.push({ id, text, kind })
  setTimeout(() => {
    const i = toasts.findIndex((t) => t.id === id)
    if (i !== -1) toasts.splice(i, 1)
  }, ms)
}

// ---------- لوحة الأوامر ----------
export const palette = reactive({ open: false })
export const openPalette = () => { palette.open = true }

// ---------- تنزيل ملف ----------
export function downloadText(filename, text, type = 'application/json') {
  const blob = new Blob([text], { type: `${type};charset=utf-8` })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.append(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function relTime(ts) {
  if (!ts) return ''
  const d = typeof ts === 'number' ? ts : Date.parse(ts)
  const s = Math.round((Date.now() - d) / 1000)
  if (s < 10) return 'الآن'
  if (s < 60) return `قبل ${s} ثانية`
  const m = Math.round(s / 60)
  if (m < 60) return m === 1 ? 'قبل دقيقة' : m === 2 ? 'قبل دقيقتين' : `قبل ${m} دقائق`
  const h = Math.round(m / 60)
  if (h < 24) return h === 1 ? 'قبل ساعة' : h === 2 ? 'قبل ساعتين' : `قبل ${h} ساعات`
  const days = Math.round(h / 24)
  return days === 1 ? 'أمس' : days === 2 ? 'قبل يومين' : `قبل ${days} أيام`
}

// تنسيق نص الدروس: يهرب HTML ثم يدعم `code` و**عريض**
export function fmt(text) {
  const esc = String(text ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return esc
    .replace(/``\s?(.+?)\s?``/g, (m, c) => `<code>${c}</code>`)
    .replace(/`([^`]+)`/g, (m, c) => `<code>${c}</code>`)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}
