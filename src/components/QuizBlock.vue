<script setup>
// اختبار الفهم: تغذية راجعة فورية مع شرح، وكل سؤال يدخل بطاقات المراجعة المتباعدة.
import { computed } from 'vue'
import Icon from './Icon.vue'
import { fmt } from '../composables/ui.js'
import { reviewCard } from '../store/index.js'
import { quizCardId } from '../content/lessons/index.js'

const props = defineProps({ lessonId: String, quiz: Array, state: Object })
if (!props.state.quiz) props.state.quiz = { answers: props.quiz.map(() => null), score: 0, total: props.quiz.length, at: null }
const q = computed(() => props.state.quiz)

function choose(qi, oi) {
  if (q.value.answers[qi] !== null && q.value.answers[qi] !== undefined) return
  q.value.answers[qi] = oi
  const correct = oi === props.quiz[qi].answer
  reviewCard(quizCardId(props.lessonId, qi), correct)
  q.value.score = q.value.answers.filter((a, i) => a === props.quiz[i].answer).length
  q.value.total = props.quiz.length
  q.value.at = new Date().toISOString()
}
const answered = computed(() => q.value.answers.filter((a) => a !== null && a !== undefined).length)
function retry() {
  q.value.answers = props.quiz.map(() => null)
  q.value.score = 0
}
</script>

<template>
  <div class="quiz">
    <div v-for="(item, qi) in quiz" :key="qi" class="qq">
      <p class="qtext"><span class="n">{{ qi + 1 }}</span><span v-html="fmt(item.q)" /></p>
      <div class="opts" role="radiogroup" :aria-label="`السؤال ${qi + 1}`">
        <button
          v-for="(o, oi) in item.options" :key="oi" role="radio"
          :aria-checked="q.answers[qi] === oi"
          :disabled="q.answers[qi] !== null && q.answers[qi] !== undefined"
          :class="{
            picked: q.answers[qi] === oi,
            right: q.answers[qi] !== null && q.answers[qi] !== undefined && oi === item.answer,
            wrong: q.answers[qi] === oi && oi !== item.answer,
          }"
          @click="choose(qi, oi)"
        >
          <span class="mark"><Icon v-if="q.answers[qi] !== null && q.answers[qi] !== undefined && oi === item.answer" name="check" :size="14" /><Icon v-else-if="q.answers[qi] === oi" name="x" :size="14" /></span>
          <span v-html="fmt(o)" />
        </button>
      </div>
      <Transition name="fade">
        <p v-if="q.answers[qi] !== null && q.answers[qi] !== undefined" class="explain" :class="q.answers[qi] === item.answer ? 'ok' : 'no'">
          <strong>{{ q.answers[qi] === item.answer ? 'صحيح.' : 'ليس تمامًا.' }}</strong> <span v-html="fmt(item.explain)" />
        </p>
      </Transition>
    </div>
    <div class="qfoot">
      <span>أجبت {{ answered }} من {{ quiz.length }} · الصحيح: <strong>{{ q.score }}</strong></span>
      <span class="muted small">كل سؤال أُضيف لبطاقات المراجعة؛ الخاطئ يعود إليك اليوم، والصحيح بعد أيام.</span>
      <span class="spacer" />
      <button v-if="answered" class="btn ghost sm" @click="retry"><Icon name="refresh" :size="14" /> أعد الاختبار</button>
    </div>
  </div>
</template>

<style scoped>
.quiz { display: grid; gap: 20px; }
.qtext { display: flex; gap: 10px; font-weight: 500; margin: 0 0 8px; font-size: 15.5px; }
.n { flex: none; width: 26px; height: 26px; border-radius: 8px; background: var(--bg-3); display: grid; place-items: center; font-size: 13px; color: var(--accent); font-family: var(--font-code); }
.opts { display: grid; gap: 6px; padding-inline-start: 36px; }
.opts button { display: flex; align-items: center; gap: 10px; text-align: start; padding: 9px 12px; border-radius: 10px; border: 1px solid var(--line-2); background: var(--bg-2); cursor: pointer; transition: border-color var(--t), background var(--t); font-size: 14.5px; }
.opts button:hover:not(:disabled) { border-color: var(--accent); }
.opts button:disabled { cursor: default; }
.mark { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--line-2); display: grid; place-items: center; flex: none; }
.opts .right { border-color: color-mix(in srgb, var(--ok) 55%, transparent); background: var(--ok-soft); }
.opts .right .mark { background: var(--ok); border-color: var(--ok); color: var(--bg); }
.opts .wrong { border-color: color-mix(in srgb, var(--bad) 55%, transparent); background: var(--bad-soft); }
.opts .wrong .mark { background: var(--bad); border-color: var(--bad); color: var(--bg); }
.explain { margin: 8px 0 0; padding: 8px 12px; padding-inline-start: 46px; border-radius: 10px; font-size: 14.5px; color: var(--text-2); }
.explain.ok strong { color: var(--ok); }
.explain.no strong { color: var(--bad); }
.qfoot { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; padding-top: 12px; border-top: 1px solid var(--line); font-size: 14px; }
</style>
