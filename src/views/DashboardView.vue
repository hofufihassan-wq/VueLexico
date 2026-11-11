<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import { store, dueCards } from '../store/index.js'
import { tracks, allLessons, lessonById } from '../content/lessons/index.js'
import { practiceById } from '../content/practice.js'
import { dayKey } from '../store/schema.js'
import { relTime, openPalette } from '../composables/ui.js'

const hour = new Date().getHours()
const greet = hour < 12 ? 'صباح الخير' : hour < 18 ? 'نهارك سعيد' : 'مساء الخير'
const status = (id) => store.lessons[id]?.status
const doneCount = computed(() => allLessons.filter((l) => status(l.id) === 'done').length)

const current = computed(() => {
  if (store.lastLesson && lessonById[store.lastLesson] && status(store.lastLesson) !== 'done') return lessonById[store.lastLesson]
  return allLessons.find((l) => status(l.id) !== 'done') || null
})
const currentState = computed(() => (current.value ? store.lessons[current.value.id] : null))
const currentTrack = computed(() => tracks.find((t) => t.key === current.value?.track))
const isFresh = computed(() => !Object.keys(store.lessons).length)

const due = computed(() => dueCards().length)
const streak = computed(() => {
  let n = 0
  const d = new Date()
  if (!store.activity[dayKey(d)]) d.setDate(d.getDate() - 1)
  while (store.activity[dayKey(d)]) { n++; d.setDate(d.getDate() - 1) }
  return n
})
const todayPts = computed(() => store.activity[dayKey()] || 0)

// خريطة النشاط: 12 أسبوعًا
const weeks = computed(() => {
  const out = []
  const end = new Date()
  const start = new Date(end)
  start.setDate(end.getDate() - (7 * 12 - 1) - end.getDay())
  const max = Math.max(1, ...Object.values(store.activity))
  for (let w = 0; w < 12 + 1; w++) {
    const col = []
    for (let d = 0; d < 7; d++) {
      const day = new Date(start)
      day.setDate(start.getDate() + w * 7 + d)
      if (day > end) { col.push(null); continue }
      const v = store.activity[dayKey(day)] || 0
      col.push({ key: dayKey(day), v, lvl: v === 0 ? 0 : Math.min(4, Math.ceil((v / max) * 4)) })
    }
    out.push(col)
  }
  return out
})

// المهام
const newTask = ref('')
function addTask() {
  const t = newTask.value.trim()
  if (!t) return
  store.tasks.unshift({ id: Math.random().toString(36).slice(2, 10), text: t, done: false, createdAt: new Date().toISOString() })
  newTask.value = ''
}
const removeTask = (id) => { const i = store.tasks.findIndex((t) => t.id === id); if (i !== -1) store.tasks.splice(i, 1) }
const openTasks = computed(() => store.tasks.filter((t) => !t.done).length)

// العمل الأخير
const recent = computed(() => {
  const drafts = store.drafts.map((d) => ({ kind: 'مسودة', title: d.name, to: `/editor/${d.id}`, at: d.updatedAt, icon: 'code' }))
  const prac = Object.entries(store.practice).filter(([id, p]) => practiceById[id] && p.updatedAt).map(([id, p]) => ({ kind: practiceById[id].requirements ? 'مشروع' : 'تحدٍّ', title: practiceById[id].title, to: `/practice/${id}`, at: p.updatedAt, icon: 'target', score: p.best }))
  return [...drafts, ...prac].sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 5)
})
const notes = computed(() => Object.entries(store.lessons).filter(([id, l]) => l.note && lessonById[id]).map(([id, l]) => ({ id, title: lessonById[id].title, note: l.note, at: l.visitedAt })).sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 3))

const TOOLS = [
  { to: '/editor', icon: 'code', label: 'المحرر', hint: 'صفحة أو مكوّن Vue' },
  { to: '/explain', icon: 'lens', label: 'شرح الأكواد', hint: 'افهم أي كود' },
  { to: '/js-lab', icon: 'terminal', label: 'مختبر JS', hint: 'خطوة بخطوة' },
  { to: '/visualizer', icon: 'flow', label: 'رحلة الكود', hint: 'الذاكرة والأحداث' },
  { to: '/css-lab', icon: 'palette', label: 'مختبر CSS', hint: 'Flex وGrid والألوان' },
  { to: '/dictionary', icon: 'book', label: 'القاموس', hint: 'المصطلحات بالعربية' },
]
</script>

<template>
  <div class="page dash">
    <header class="hello">
      <p class="muted">{{ greet }}{{ store.settings.name ? `، ${store.settings.name}` : '' }}</p>
      <h1 class="display">{{ isFresh ? 'سطرٌ واحد كل يوم يصنع مبرمجًا.' : doneCount === allLessons.length ? 'أنهيت المسار كاملًا. وقت المشاريع.' : 'لنكمل من حيث توقفت.' }}</h1>
    </header>

    <div class="cols">
      <div class="main">
        <!-- المتابعة -->
        <section v-if="current" class="continue" :class="'t-' + current.track">
          <div class="c-meta">
            <span class="chip"><span class="dot tc" /> {{ currentTrack.label }} · الدرس {{ current.order }}</span>
            <span class="muted small">{{ current.minutes }} دقيقة</span>
          </div>
          <h2 class="display">{{ current.title }}</h2>
          <p class="muted">{{ current.summary }}</p>
          <div class="c-steps">
            <span :class="{ ok: currentState }"><Icon :name="currentState ? 'check' : 'book'" :size="14" /> القراءة</span>
            <span :class="{ ok: currentState?.exercise?.passed }"><Icon :name="currentState?.exercise?.passed ? 'check' : 'code'" :size="14" /> التمرين</span>
            <span :class="{ ok: currentState?.quiz?.score >= 2 }"><Icon :name="currentState?.quiz?.score >= 2 ? 'check' : 'cards'" :size="14" /> الاختبار</span>
          </div>
          <RouterLink :to="`/learn/${current.id}`" class="btn primary">{{ currentState ? 'تابع الدرس' : 'ابدأ الدرس' }} <Icon name="chevron" :size="16" /></RouterLink>
        </section>
        <section v-else class="continue">
          <h2 class="display">أكملت كل الدروس 🎉</h2>
          <p class="muted">اختبر نفسك في المشاريع، فهي الامتحان الحقيقي.</p>
          <RouterLink to="/practice" class="btn primary">المشاريع</RouterLink>
        </section>

        <!-- التقدم -->
        <section class="progress">
          <div class="eyebrow">تقدّمك · {{ doneCount }} من {{ allLessons.length }} درسًا</div>
          <RouterLink v-for="t in tracks" :key="t.key" :to="'/learn'" class="trk" :class="'t-' + t.key">
            <span class="t-name"><span class="tc">{{ t.label }}</span> <span class="muted small">{{ t.title }}</span></span>
            <span class="segs"><i v-for="l in t.lessons" :key="l.id" :class="status(l.id) || 'new'" :title="l.title" /></span>
            <span class="mono small muted">{{ t.lessons.filter((l) => status(l.id) === 'done').length }}/{{ t.lessons.length }}</span>
          </RouterLink>
        </section>

        <!-- العمل الأخير -->
        <section class="recent">
          <div class="eyebrow">آخر ما عملت عليه</div>
          <RouterLink v-for="r in recent" :key="r.to" :to="r.to" class="rec">
            <Icon :name="r.icon" :size="16" />
            <span class="r-title">{{ r.title }}</span>
            <span class="muted small">{{ r.kind }}</span>
            <span v-if="r.score !== undefined" class="mono small">{{ r.score }}/100</span>
            <span class="spacer" />
            <span class="muted small">{{ relTime(r.at) }}</span>
          </RouterLink>
          <p v-if="!recent.length" class="muted small">مسوداتك ومشاريعك ستظهر هنا. <RouterLink to="/editor">افتح المحرر</RouterLink> أو <RouterLink to="/practice">ابدأ تحديًا</RouterLink>.</p>
        </section>

        <!-- الأدوات -->
        <section class="tools">
          <div class="eyebrow">أدواتك</div>
          <div class="tool-row">
            <RouterLink v-for="t in TOOLS" :key="t.to" :to="t.to" class="tool"><Icon :name="t.icon" :size="20" /><span>{{ t.label }}</span><small class="muted">{{ t.hint }}</small></RouterLink>
          </div>
        </section>
      </div>

      <aside class="rail">
        <section class="today">
          <div class="eyebrow">اليوم</div>
          <div class="nums">
            <RouterLink to="/review" class="num-box" :class="{ hot: due }"><strong class="display">{{ due }}</strong><span>بطاقة للمراجعة</span></RouterLink>
            <div class="num-box"><strong class="display">{{ streak }}</strong><span>{{ streak === 1 ? 'يوم متتالٍ' : 'أيام متتالية' }}</span></div>
            <div class="num-box"><strong class="display">{{ todayPts }}</strong><span>نقطة نشاط</span></div>
          </div>
        </section>

        <section class="heat">
          <div class="eyebrow">نشاطك في 12 أسبوعًا</div>
          <div class="grid-heat" dir="ltr" role="img" aria-label="خريطة النشاط">
            <div v-for="(w, wi) in weeks" :key="wi" class="wk">
              <i v-for="(d, di) in w" :key="di" :class="d ? 'l' + d.lvl : 'void'" :title="d ? `${d.key}: ${d.v}` : ''" />
            </div>
          </div>
        </section>

        <section class="tasks">
          <div class="eyebrow">مهامي <span v-if="openTasks" class="muted">({{ openTasks }})</span></div>
          <form class="add" @submit.prevent="addTask">
            <input v-model="newTask" class="input" placeholder="مثال: أنهِ درس Flexbox" aria-label="مهمة جديدة" maxlength="300">
            <button class="btn icon" aria-label="إضافة"><Icon name="plus" :size="16" /></button>
          </form>
          <ul>
            <li v-for="t in store.tasks.slice(0, 8)" :key="t.id" :class="{ done: t.done }">
              <label><input v-model="t.done" type="checkbox"> <span>{{ t.text }}</span></label>
              <button class="btn ghost sm icon" aria-label="حذف المهمة" @click="removeTask(t.id)"><Icon name="x" :size="14" /></button>
            </li>
          </ul>
        </section>

        <section v-if="notes.length" class="notes">
          <div class="eyebrow">من ملاحظاتك</div>
          <RouterLink v-for="n in notes" :key="n.id" :to="`/learn/${n.id}#notes`" class="note"><strong>{{ n.title }}</strong><p>{{ n.note.slice(0, 120) }}{{ n.note.length > 120 ? '…' : '' }}</p></RouterLink>
        </section>

        <section class="keys">
          <div class="eyebrow">اختصارات</div>
          <button class="key-row" @click="openPalette"><kbd>Ctrl</kbd><kbd>K</kbd><span>بحث في كل شيء</span></button>
          <div class="key-row"><kbd>Ctrl</kbd><kbd>Enter</kbd><span>تشغيل الكود</span></div>
          <div class="key-row"><kbd>Ctrl</kbd><kbd>F</kbd><span>بحث داخل المحرر</span></div>
        </section>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.hello h1 { font-size: clamp(1.7rem, 3.4vw, 2.5rem); margin: 0 0 22px; max-width: 24ch; line-height: 1.4; }
.hello p { margin: 0; }
.cols { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: 36px; align-items: start; }
.main { display: grid; gap: 34px; min-width: 0; }
.continue { position: relative; padding: 26px 28px; border-radius: 22px; background: radial-gradient(120% 140% at 100% 0%, color-mix(in srgb, var(--tc, var(--accent)) 16%, transparent), transparent 60%), var(--bg-2); border: 1px solid var(--line); overflow: hidden; }
.continue::after { content: ''; position: absolute; inset-inline: 28px; bottom: 0; height: 3px; border-radius: 3px 3px 0 0; background: linear-gradient(90deg, transparent, var(--accent)); opacity: .7; }
.c-meta { display: flex; align-items: center; gap: 10px; }
.continue h2 { font-size: clamp(1.5rem, 3vw, 2.1rem); margin: 12px 0 4px; }
.continue p { margin: 0 0 16px; max-width: 60ch; }
.c-steps { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 18px; font-size: 13.5px; color: var(--muted); }
.c-steps span { display: flex; align-items: center; gap: 6px; }
.c-steps .ok { color: var(--ok); }
.progress { display: grid; gap: 6px; }
.trk { display: grid; grid-template-columns: 170px 1fr 48px; gap: 14px; align-items: center; padding: 8px 4px; color: var(--text); text-decoration: none !important; border-radius: 10px; }
.trk:hover { background: var(--bg-2); }
.t-name { font-weight: 500; white-space: nowrap; }
.segs { display: flex; gap: 4px; }
.segs i { flex: 1; height: 8px; border-radius: 4px; background: var(--line-2); }
.segs i.started { background: color-mix(in srgb, var(--tc) 40%, transparent); }
.segs i.done { background: var(--tc); }
.recent { display: grid; gap: 2px; }
.rec { display: flex; align-items: center; gap: 12px; padding: 10px 8px; border-bottom: 1px solid var(--line); color: var(--text); text-decoration: none !important; }
.rec:hover { background: var(--bg-2); }
.rec :deep(svg) { color: var(--muted); }
.r-title { font-weight: 500; }
.tool-row { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; margin-top: 4px; }
.tool { display: grid; gap: 2px; padding: 14px; border-radius: 14px; border: 1px solid var(--line); color: var(--text); text-decoration: none !important; transition: border-color var(--t), background var(--t); }
.tool:hover { border-color: var(--accent); background: var(--bg-2); }
.tool :deep(svg) { color: var(--accent); margin-bottom: 6px; }
.rail { display: grid; gap: 26px; position: sticky; top: 16px; }
.nums { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 6px; }
.num-box { display: grid; padding: 12px 10px; border-radius: 14px; background: var(--bg-2); border: 1px solid var(--line); color: var(--text); text-decoration: none !important; }
.num-box strong { font-size: 1.9rem; line-height: 1.1; }
.num-box span { font-size: 12px; color: var(--muted); }
.num-box.hot { border-color: var(--accent); background: var(--accent-soft); }
.num-box.hot strong { color: var(--accent); }
.grid-heat { display: flex; gap: 3px; margin-top: 8px; }
.wk { display: grid; gap: 3px; flex: 1; }
.wk i { aspect-ratio: 1; border-radius: 3px; background: var(--bg-3); display: block; }
.wk i.void { background: transparent; }
.wk i.l1 { background: color-mix(in srgb, var(--mint) 30%, var(--bg-3)); }
.wk i.l2 { background: color-mix(in srgb, var(--mint) 55%, var(--bg-3)); }
.wk i.l3 { background: color-mix(in srgb, var(--mint) 80%, var(--bg-3)); }
.wk i.l4 { background: var(--mint); }
.add { display: flex; gap: 6px; margin: 8px 0; }
.tasks ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
.tasks li { display: flex; align-items: center; gap: 6px; padding: 4px 0; border-bottom: 1px solid var(--line); }
.tasks label { flex: 1; display: flex; gap: 8px; align-items: flex-start; cursor: pointer; font-size: 14px; }
.tasks input[type='checkbox'] { margin-top: 6px; accent-color: var(--accent); }
.tasks li.done span { text-decoration: line-through; color: var(--muted); }
.note { display: block; padding: 10px 12px; border-inline-start: 3px solid var(--accent); background: var(--bg-2); border-radius: 0 10px 10px 0; margin-top: 8px; color: var(--text); text-decoration: none !important; font-size: 13.5px; }
.note p { margin: 2px 0 0; color: var(--text-2); }
.key-row { display: flex; gap: 6px; align-items: center; padding: 6px 0; font-size: 13.5px; color: var(--text-2); background: none; border: 0; cursor: pointer; width: 100%; text-align: start; }
.key-row span { margin-inline-start: 8px; }
@media (max-width: 1080px) { .cols { grid-template-columns: 1fr; } .rail { position: static; } }
@media (max-width: 560px) { .trk { grid-template-columns: 1fr 40px; } .segs { grid-column: 1 / -1; grid-row: 2; } }
</style>
