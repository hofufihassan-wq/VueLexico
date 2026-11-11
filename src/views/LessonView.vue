<script setup>
import { computed, watch, ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '../components/Icon.vue'
import CodeExample from '../components/CodeExample.vue'
import TryBlock from '../components/TryBlock.vue'
import ExerciseRunner from '../components/ExerciseRunner.vue'
import QuizBlock from '../components/QuizBlock.vue'
import { lessonById, tracks, nextLesson, prevLesson } from '../content/lessons/index.js'
import { store, lessonState, visitLesson, completeLesson } from '../store/index.js'
import { fmt } from '../composables/ui.js'

const props = defineProps({ id: String })
const lesson = computed(() => lessonById[props.id])
const track = computed(() => tracks.find((t) => t.key === lesson.value?.track))
const state = computed(() => (lesson.value ? lessonState(props.id) : null))
if (lesson.value) visitLesson(props.id)

if (state.value && !state.value.exercise) state.value.exercise = { files: null, passed: false, attempts: 0, hints: 0 }

const quizOk = computed(() => {
  const q = state.value?.quiz
  if (!q) return false
  const answered = q.answers.filter((a) => a !== null && a !== undefined).length
  return answered === lesson.value.quiz.length && q.score >= Math.ceil(lesson.value.quiz.length * 2 / 3)
})
const exOk = computed(() => !!state.value?.exercise?.passed)
const done = computed(() => state.value?.status === 'done')
watch([quizOk, exOk], ([a, b]) => { if (a && b) completeLesson(props.id) }, { immediate: true })

const next = computed(() => nextLesson(props.id))
const prev = computed(() => prevLesson(props.id))
const indexInTrack = computed(() => track.value.lessons.findIndex((l) => l.id === props.id))

const sections = computed(() => {
  const out = [{ id: 'intro', label: 'المقدمة' }]
  lesson.value.blocks.forEach((b, i) => { if (b.type === 'h') out.push({ id: `s${i}`, label: b.text }) })
  out.push({ id: 'exercise', label: 'التمرين' }, { id: 'quiz', label: 'اختبر فهمك' }, { id: 'notes', label: 'ملاحظاتي' })
  return out
})
const activeSec = ref('intro')
let obs
onMounted(() => {
  obs = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) activeSec.value = e.target.id
  }, { rootMargin: '-20% 0px -70% 0px' })
  document.querySelectorAll('.lesson [data-sec]').forEach((el) => obs.observe(el))
})
onBeforeUnmount(() => obs?.disconnect())
function jump(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
</script>

<template>
  <div v-if="!lesson" class="page"><h1>الدرس غير موجود</h1><RouterLink to="/learn">العودة للمسار</RouterLink></div>
  <div v-else class="page lesson" :class="'t-' + lesson.track">
    <div class="layout">
      <article class="main">
        <header id="intro" data-sec class="l-head">
          <RouterLink to="/learn" class="crumb"><span class="tc">{{ track.label }}</span> · الدرس {{ indexInTrack + 1 }} من {{ track.lessons.length }}</RouterLink>
          <h1>{{ lesson.title }}</h1>
          <p class="sum">{{ lesson.summary }}</p>
          <div class="meta">
            <span class="chip"><Icon name="clock" :size="13" /> {{ lesson.minutes }} دقيقة تقريبًا</span>
            <span class="chip" :class="{ on: exOk }"><Icon :name="exOk ? 'check' : 'code'" :size="13" /> التمرين</span>
            <span class="chip" :class="{ on: quizOk }"><Icon :name="quizOk ? 'check' : 'cards'" :size="13" /> الاختبار</span>
            <span v-if="done" class="chip on"><Icon name="flag" :size="13" /> مكتمل</span>
          </div>
          <div class="track-line">
            <i v-for="(l, i) in track.lessons" :key="l.id" :class="{ cur: l.id === lesson.id, done: store.lessons[l.id]?.status === 'done', past: i < indexInTrack }" :title="l.title" />
          </div>
          <div class="objectives">
            <div class="eyebrow">بعد هذا الدرس ستستطيع أن</div>
            <ul><li v-for="o in lesson.objectives" :key="o">{{ o }}</li></ul>
          </div>
        </header>

        <section class="prose">
          <template v-for="(b, i) in lesson.blocks" :key="i">
            <p v-if="b.type === 'p'" v-html="fmt(b.text)" />
            <h2 v-else-if="b.type === 'h'" :id="`s${i}`" data-sec class="h2">{{ b.text }}</h2>
            <ul v-else-if="b.type === 'list'"><li v-for="(it, k) in b.items" :key="k" v-html="fmt(it)" /></ul>
            <CodeExample v-else-if="b.type === 'code'" :code="b.code" :lang="b.lang" :notes="b.notes" />
            <TryBlock v-else-if="b.type === 'try'" :mode="b.mode" :files="b.files" :code="b.code" />
            <aside v-else class="callout" :class="b.type">
              <span class="c-ico"><Icon :name="b.type === 'warn' ? 'flag' : b.type === 'why' ? 'spark' : 'bulb'" :size="16" /></span>
              <div><strong>{{ b.type === 'warn' ? 'انتبه' : b.type === 'why' ? 'لماذا يعمل هكذا؟' : 'نصيحة' }}</strong><p v-html="fmt(b.text)" /></div>
            </aside>
          </template>
        </section>

        <section id="exercise" data-sec class="block">
          <div class="eyebrow">التمرين العملي</div>
          <h2 class="h2">طبّق ما تعلمته</h2>
          <ExerciseRunner :ex="lesson.exercise" :state="state.exercise" />
        </section>

        <section id="quiz" data-sec class="block">
          <div class="eyebrow">اختبار الفهم</div>
          <h2 class="h2">هل فهمت «لماذا» وليس فقط «كيف»؟</h2>
          <QuizBlock :lesson-id="lesson.id" :quiz="lesson.quiz" :state="state" />
        </section>

        <section id="notes" data-sec class="block">
          <div class="eyebrow">ملاحظاتي</div>
          <textarea v-model="state.note" class="textarea notes" rows="5" placeholder="اكتب ما تريد تذكّره من هذا الدرس… تُحفظ تلقائيًا." aria-label="ملاحظاتي على الدرس" />
          <div class="refs">
            <span class="muted small">المراجع الرسمية:</span>
            <a v-for="r in lesson.refs" :key="r.url" :href="r.url" target="_blank" rel="noopener" class="chip"><Icon name="external" :size="12" /> {{ r.title }}</a>
          </div>
        </section>

        <Transition name="fade">
          <div v-if="done" class="complete">
            <Icon name="flag" :size="22" />
            <div><strong>أكملت هذا الدرس</strong><p class="muted">اجتزت التمرين وأجبت عن الاختبار. أسئلته ستعود إليك في المراجعة المتباعدة.</p></div>
          </div>
        </Transition>
        <div v-if="!done" class="todo muted small">
          لإكمال الدرس: {{ exOk ? '✓' : '○' }} اجتياز التمرين · {{ quizOk ? '✓' : '○' }} الإجابة عن كل الأسئلة بصواب ثلثيها على الأقل
        </div>

        <nav class="pager">
          <RouterLink v-if="prev" :to="`/learn/${prev.id}`" class="pg prev"><span class="muted small">السابق</span><span>{{ prev.title }}</span></RouterLink>
          <span v-else />
          <RouterLink v-if="next" :to="`/learn/${next.id}`" class="pg next"><span class="muted small">التالي</span><span>{{ next.title }}</span></RouterLink>
        </nav>
      </article>

      <aside class="toc" aria-label="محتويات الدرس">
        <div class="toc-in">
          <div class="eyebrow">في هذا الدرس</div>
          <button v-for="s in sections" :key="s.id" :class="{ on: activeSec === s.id }" @click="jump(s.id)">{{ s.label }}</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 210px; gap: 40px; }
.main { min-width: 0; max-width: 900px; }
.l-head { margin-bottom: 28px; scroll-margin-top: 20px; }
.crumb { font-size: 13px; color: var(--muted); text-decoration: none !important; }
.l-head h1 { font-size: clamp(1.8rem, 3.6vw, 2.6rem); margin: 6px 0 8px; }
.sum { font-size: 17px; color: var(--text-2); margin: 0 0 14px; max-width: 64ch; }
.meta { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.track-line { display: flex; gap: 4px; margin-bottom: 20px; }
.track-line i { flex: 1; height: 4px; border-radius: 3px; background: var(--line-2); }
.track-line i.done { background: var(--tc); }
.track-line i.cur { background: var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); }
.objectives { background: var(--bg-2); border: 1px solid var(--line); border-radius: 14px; padding: 12px 16px; }
.objectives ul { margin: 8px 0 0; padding-inline-start: 1.2em; }
.objectives li::marker { color: var(--tc); }
.h2 { font-size: 1.45rem; margin: 1.6em 0 .6em; scroll-margin-top: 20px; font-family: var(--font-display); font-weight: 500; }
.callout { display: flex; gap: 12px; padding: 12px 16px; border-radius: 14px; margin: 1.2em 0; background: var(--bg-2); border: 1px solid var(--line); font-size: 15px; line-height: 1.85; }
.callout p { margin: 2px 0 0; color: var(--text-2); }
.c-ico { flex: none; width: 30px; height: 30px; border-radius: 9px; display: grid; place-items: center; background: var(--accent-soft); color: var(--accent); }
.callout.why .c-ico { background: var(--mint-soft); color: var(--mint); }
.callout.warn { border-color: color-mix(in srgb, var(--warn) 30%, transparent); }
.callout.warn .c-ico { background: color-mix(in srgb, var(--warn) 15%, transparent); color: var(--warn); }
.block { margin-top: 48px; scroll-margin-top: 20px; }
.block .h2 { margin-top: .3em; }
.notes { min-height: 110px; }
.refs { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 12px; }
.refs a { text-decoration: none !important; }
.complete { display: flex; gap: 14px; align-items: center; margin-top: 32px; padding: 16px 18px; border-radius: 16px; background: linear-gradient(120deg, var(--ok-soft), transparent); border: 1px solid color-mix(in srgb, var(--ok) 35%, transparent); }
.complete :deep(svg) { color: var(--ok); }
.complete p { margin: 2px 0 0; }
.todo { margin-top: 28px; }
.pager { display: flex; justify-content: space-between; gap: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid var(--line); }
.pg { display: grid; padding: 10px 14px; border-radius: 12px; border: 1px solid var(--line); color: var(--text); text-decoration: none !important; max-width: 48%; transition: border-color var(--t); }
.pg:hover { border-color: var(--accent); }
.pg.next { text-align: end; }
.toc { position: relative; }
.toc-in { position: sticky; top: 24px; display: grid; gap: 2px; }
.toc-in .eyebrow { margin-bottom: 6px; }
.toc button { text-align: start; background: none; border: 0; border-inline-start: 2px solid var(--line); padding: 5px 12px; color: var(--muted); font-size: 13.5px; cursor: pointer; transition: color var(--t), border-color var(--t); }
.toc button:hover { color: var(--text); }
.toc button.on { color: var(--text); border-color: var(--accent); }
@media (max-width: 1180px) { .layout { grid-template-columns: 1fr; } .toc { display: none; } }
</style>
