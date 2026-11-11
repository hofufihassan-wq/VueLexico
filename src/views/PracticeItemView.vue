<script setup>
import { computed } from 'vue'
import Icon from '../components/Icon.vue'
import ExerciseRunner from '../components/ExerciseRunner.vue'
import { practiceById } from '../content/practice.js'
import { store } from '../store/index.js'
import { relTime, fmt } from '../composables/ui.js'

const props = defineProps({ id: String })
const item = computed(() => practiceById[props.id])
const LEVEL = { 1: 'مبتدئ', 2: 'متوسط', 3: 'متقدم' }

if (item.value && !store.practice[props.id]) store.practice[props.id] = { files: {}, passed: false, best: 0, attempts: 0, hints: 0, updatedAt: null, history: [] }
const state = computed(() => store.practice[props.id])

// المشروع يُعرض عبر نفس المشغّل: الوصف + المتطلبات تُصحَّح بالنقاط
const ex = computed(() => {
  const it = item.value
  if (!it) return null
  return it.requirements ? { ...it, prompt: `${it.summary} حقّق المتطلبات المدرجة؛ لكل متطلب نقاط ويُفحص وظيفيًا.` } : it
})

function onGraded(r) {
  const score = r.score !== undefined ? r.score : (r.results.length ? Math.round((r.results.filter((x) => x.pass).length / r.results.length) * 100) : 0)
  const s = state.value
  s.best = Math.max(s.best || 0, score)
  s.updatedAt = new Date().toISOString()
  s.history.push({ at: s.updatedAt, score })
  if (s.history.length > 30) s.history.splice(0, s.history.length - 30)
}
</script>

<template>
  <div v-if="!item" class="page"><h1>غير موجود</h1><RouterLink to="/practice">العودة</RouterLink></div>
  <div v-else class="page wide p-item" :class="'t-' + item.track">
    <header class="p-head">
      <RouterLink to="/practice" class="crumb">التدريب والمشاريع · {{ item.requirements ? 'مشروع' : 'تحدٍّ' }}</RouterLink>
      <div class="row">
        <h1>{{ item.title }}</h1>
        <span class="chip"><span class="dot tc" /> {{ item.track.toUpperCase() }} · {{ LEVEL[item.level] }}</span>
        <span class="spacer" />
        <div class="best"><span class="muted small">أفضل نتيجة</span> <strong class="display">{{ state.best }}</strong><span class="muted">/100</span></div>
      </div>
    </header>

    <div class="cols">
      <div class="main">
        <ExerciseRunner :ex="ex" :state="state" height="min(72vh, 680px)" @graded="onGraded" />
      </div>
      <aside class="brief">
        <template v-if="item.requirements">
          <div class="eyebrow">المتطلبات ومعايير التقييم</div>
          <ol class="reqs">
            <li v-for="(r, i) in item.requirements" :key="i"><span class="pts mono">{{ r.points }}</span><span v-html="fmt(r.text)" /></li>
          </ol>
          <div class="eyebrow">المهارات</div>
          <div class="row"><span v-for="s in item.skills" :key="s" class="chip">{{ s }}</span></div>
        </template>
        <div class="eyebrow">سجل المحاولات</div>
        <ol v-if="state.history.length" class="hist">
          <li v-for="(h, i) in [...state.history].reverse().slice(0, 8)" :key="i"><span class="mono">{{ h.score }}</span><div class="rule-line"><i :style="{ width: h.score + '%' }" /></div><span class="muted small">{{ relTime(h.at) }}</span></li>
        </ol>
        <p v-else class="muted small">لا محاولات بعد. كودك يُحفظ تلقائيًا أثناء الكتابة.</p>
        <p class="muted small honest"><Icon name="flag" :size="13" style="display:inline;vertical-align:-2px" /> بعض الفحوص تعتمد على حالة الصفحة بعد الفحوص السابقة (مثل إضافة مهمة ثم حذفها)، لذلك فشل متطلب مبكر قد يُفشل ما بعده.</p>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.p-item { padding-top: 18px; }
.crumb { font-size: 13px; color: var(--muted); }
.p-head h1 { margin: 2px 0; font-size: 1.8rem; }
.best strong { font-size: 1.8rem; color: var(--accent); margin-inline-start: 6px; }
.cols { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 18px; margin-top: 12px; align-items: start; }
.brief { position: sticky; top: 16px; display: grid; gap: 12px; background: var(--bg-2); border: 1px solid var(--line); border-radius: 16px; padding: 14px; }
.reqs { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; font-size: 14px; }
.reqs li { display: flex; gap: 10px; align-items: flex-start; }
.pts { flex: none; min-width: 32px; text-align: center; background: var(--accent-soft); color: var(--accent); border-radius: 6px; font-size: 12px; padding: 1px 0; }
.hist { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
.hist li { display: grid; grid-template-columns: 32px 1fr auto; gap: 8px; align-items: center; font-size: 13px; }
.honest { margin: 0; }
@media (max-width: 1100px) { .cols { grid-template-columns: 1fr; } .brief { position: static; } }
</style>
