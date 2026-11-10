import html from './html.js'
import css from './css.js'
import js from './js.js'
import vue from './vue.js'

export const tracks = [
  { key: 'html', label: 'HTML', title: 'الهيكل', blurb: 'كيف تصف المحتوى بعناصر لها معنى.', color: 'var(--c-html)', lessons: html },
  { key: 'css', label: 'CSS', title: 'التنسيق', blurb: 'الألوان والمسافات والتخطيط المتجاوب.', color: 'var(--c-css)', lessons: css },
  { key: 'js', label: 'JavaScript', title: 'السلوك', blurb: 'المنطق والبيانات والتفاعل مع الصفحة.', color: 'var(--c-js)', lessons: js },
  { key: 'vue', label: 'Vue 3', title: 'الواجهات التفاعلية', blurb: 'واجهات تتحدّث تلقائيًا من البيانات.', color: 'var(--c-vue)', lessons: vue },
]

for (const t of tracks) t.lessons.forEach((l, i) => { l.track = t.key; l.order = i + 1 })

export const allLessons = tracks.flatMap((t) => t.lessons)
export const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l]))

export function nextLesson(id) {
  const i = allLessons.findIndex((l) => l.id === id)
  return i >= 0 ? allLessons[i + 1] || null : null
}
export function prevLesson(id) {
  const i = allLessons.findIndex((l) => l.id === id)
  return i > 0 ? allLessons[i - 1] : null
}

// بطاقات المراجعة: سؤال الاختبار يصبح بطاقة بمعرّف ثابت
export const quizCardId = (lessonId, qi) => `quiz:${lessonId}:${qi}`
export const termCardId = (termId) => `term:${termId}`
