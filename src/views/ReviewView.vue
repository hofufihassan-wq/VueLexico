<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import { store, reviewCard } from '../store/index.js'
import { lessonById } from '../content/lessons/index.js'
import { termById } from '../content/dictionary/index.js'
import { LEITNER_DAYS, isDue } from '../store/schema.js'
import { fmt } from '../composables/ui.js'

function resolve(id) {
  const [kind, a, b] = id.split(':')
  if (kind === 'quiz') {
    const l = lessonById[a]
    const q = l?.quiz?.[+b]
    return q ? { id, kind, lesson: l, q } : null
  }
  if (kind === 'term') { const t = termById[a]; return t ? { id, kind, t } : null }
  return null
}

const queue = ref(Object.entries(store.reviews).filter(([, c]) => isDue(c)).map(([id]) => resolve(id)).filter(Boolean).sort(() => Math.random() - 0.5))
const pos = ref(0)
const picked = ref(null)
const revealed = ref(false)
const sessionOk = ref(0)
const card = computed(() => queue.value[pos.value] || null)

function choose(i) {
  if (picked.value !== null) return
  picked.value = i
  const ok = i === card.value.q.answer
  if (ok) sessionOk.value++
  reviewCard(card.value.id, ok)
}
function rate(ok) {
  if (ok) sessionOk.value++
  reviewCard(card.value.id, ok)
  next()
}
function next() { pos.value++; picked.value = null; revealed.value = false }

const boxes = computed(() => {
  const b = LEITNER_DAYS.map(() => 0)
  for (const c of Object.values(store.reviews)) b[c.box]++
  return b
})
const total = computed(() => Object.keys(store.reviews).length)
const upcoming = computed(() => {
  const days = {}
  const now = Date.now()
  for (const c of Object.values(store.reviews)) {
    const d = Math.ceil((Date.parse(c.due) - now) / 86400000)
    if (d > 0 && d <= 7) days[d] = (days[d] || 0) + 1
  }
  return days
})
</script>

<template>
  <div class="page review">
    <header class="page-head">
      <div class="eyebrow">المراجعة المتباعدة</div>
      <h1>تذكّر اليوم ما تعلمته أمس</h1>
      <p>كل سؤال تجيب عنه في الدروس، وكل مصطلح تضيفه من القاموس، يصبح بطاقة. البطاقة التي تعرفها تبتعد مواعيدها (1، 2، 4، 8، 16 يومًا)، والتي تخطئ فيها تعود إليك اليوم — بحسب نظام صناديق لايتنر.</p>
    </header>

    <div class="r-grid">
      <section class="deck">
        <template v-if="card">
          <div class="progress muted small">البطاقة {{ pos + 1 }} من {{ queue.length }}</div>
          <Transition name="fade" mode="out-in">
            <article :key="card.id" class="rcard panel">
              <template v-if="card.kind === 'quiz'">
                <RouterLink :to="`/learn/${card.lesson.id}#quiz`" class="src small">من درس: {{ card.lesson.title }}</RouterLink>
                <h2 class="q" v-html="fmt(card.q.q)" />
                <div class="opts">
                  <button v-for="(o, i) in card.q.options" :key="i" :disabled="picked !== null" :class="{ right: picked !== null && i === card.q.answer, wrong: picked === i && i !== card.q.answer }" @click="choose(i)" v-html="fmt(o)" />
                </div>
                <template v-if="picked !== null">
                  <p class="exp" v-html="fmt(card.q.explain)" />
                  <button class="btn primary" @click="next">التالية <Icon name="chevron" :size="15" /></button>
                </template>
              </template>
              <template v-else>
                <RouterLink :to="`/dictionary/${card.t.id}`" class="src small">من القاموس · {{ card.t.tech.toUpperCase() }}</RouterLink>
                <h2 class="q mono term">{{ card.t.term }}</h2>
                <p class="muted">ماذا يعني؟ حاول التذكر قبل الكشف.</p>
                <button v-if="!revealed" class="btn primary" @click="revealed = true"><Icon name="eye" :size="15" /> اكشف</button>
                <template v-else>
                  <p class="exp"><strong>{{ card.t.ar }}:</strong> {{ card.t.meaning }}</p>
                  <div class="row">
                    <button class="btn mint" @click="rate(true)"><Icon name="check" :size="15" /> تذكّرتها</button>
                    <button class="btn danger" @click="rate(false)"><Icon name="x" :size="15" /> لم أتذكّر</button>
                  </div>
                </template>
              </template>
            </article>
          </Transition>
        </template>
        <div v-else class="done panel">
          <Icon name="check" :size="28" />
          <h2>{{ queue.length ? 'أنهيت مراجعة اليوم' : 'لا بطاقات مستحقة الآن' }}</h2>
          <p v-if="queue.length" class="muted">أجبت صحيحًا عن {{ sessionOk }} من {{ queue.length }}.</p>
          <p v-else class="muted">{{ total ? 'عُد لاحقًا في مواعيد البطاقات القادمة.' : 'أجب عن اختبارات الدروس أو أضف مصطلحات من القاموس لتبدأ.' }}</p>
          <RouterLink to="/learn" class="btn">المسار التعليمي</RouterLink>
        </div>
      </section>

      <aside class="stats panel">
        <div class="eyebrow">الصناديق ({{ total }} بطاقة)</div>
        <div class="boxes">
          <div v-for="(n, i) in boxes" :key="i" class="bx">
            <div class="bar"><i :style="{ height: total ? Math.max(4, (n / Math.max(...boxes)) * 100) + '%' : '4%' }" /></div>
            <span class="mono">{{ n }}</span>
            <span class="muted small">{{ i === 0 ? 'اليوم' : `${LEITNER_DAYS[i]} ي` }}</span>
          </div>
        </div>
        <div class="eyebrow">القادم خلال أسبوع</div>
        <ul class="up">
          <li v-for="(n, d) in upcoming" :key="d"><span>{{ d === '1' ? 'غدًا' : `بعد ${d} أيام` }}</span><span class="mono">{{ n }}</span></li>
          <li v-if="!Object.keys(upcoming).length" class="muted small">لا شيء مجدول.</li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.r-grid { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 20px; align-items: start; }
.progress { margin-bottom: 8px; }
.rcard { padding: 26px; border-top: 3px solid var(--accent); }
.src { color: var(--muted); }
.q { font-size: 1.35rem; margin: 10px 0 16px; line-height: 1.6; font-weight: 500; }
.term { direction: ltr; text-align: right; font-size: 2rem; color: var(--accent); }
.opts { display: grid; gap: 8px; margin-bottom: 14px; }
.opts button { text-align: start; padding: 11px 14px; border-radius: 12px; border: 1px solid var(--line-2); background: var(--bg); cursor: pointer; font-size: 15px; }
.opts button:hover:not(:disabled) { border-color: var(--accent); }
.opts .right { background: var(--ok-soft); border-color: var(--ok); }
.opts .wrong { background: var(--bad-soft); border-color: var(--bad); }
.exp { background: var(--bg-3); padding: 10px 14px; border-radius: 10px; color: var(--text-2); }
.done { padding: 40px; display: grid; justify-items: center; text-align: center; gap: 6px; }
.done :deep(svg) { color: var(--ok); }
.stats { padding: 16px; display: grid; gap: 14px; position: sticky; top: 16px; }
.boxes { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; text-align: center; }
.bx { display: grid; gap: 2px; justify-items: center; }
.bar { height: 70px; width: 100%; display: flex; align-items: flex-end; background: var(--bg-3); border-radius: 6px; overflow: hidden; }
.bar i { display: block; width: 100%; background: linear-gradient(var(--accent), color-mix(in srgb, var(--accent) 50%, transparent)); border-radius: 6px 6px 0 0; transition: height 400ms var(--ease); }
.up { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; font-size: 14px; }
.up li { display: flex; justify-content: space-between; }
@media (max-width: 900px) { .r-grid { grid-template-columns: 1fr; } .stats { position: static; } }
</style>
