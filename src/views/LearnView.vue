<script setup>
import { computed } from 'vue'
import Icon from '../components/Icon.vue'
import { tracks, allLessons } from '../content/lessons/index.js'
import { store } from '../store/index.js'

const status = (id) => store.lessons[id]?.status || 'new'
const doneIn = (t) => t.lessons.filter((l) => status(l.id) === 'done').length
const totalDone = computed(() => allLessons.filter((l) => status(l.id) === 'done').length)
const nextId = computed(() => {
  if (store.lastLesson && status(store.lastLesson) !== 'done') return store.lastLesson
  return allLessons.find((l) => status(l.id) !== 'done')?.id
})
</script>

<template>
  <div class="page learn">
    <header class="page-head head">
      <div>
        <div class="eyebrow">المسار التعليمي</div>
        <h1>من أول وسم إلى أول تطبيق Vue</h1>
        <p>أربعة مسارات متتابعة، كل درس فيه شرح ومثال مشروح سطرًا بسطر وتجربة حية وتمرين يُصحَّح وظيفيًا واختبار فهم. يمكنك القفز لأي درس، لكن الترتيب مصمم ليبني كل درس على ما قبله.</p>
      </div>
      <div class="total">
        <div class="num display">{{ totalDone }}<span>/{{ allLessons.length }}</span></div>
        <div class="muted small">درسًا مكتملًا</div>
        <div class="rule-line"><i :style="{ width: (totalDone / allLessons.length) * 100 + '%' }" /></div>
      </div>
    </header>

    <section v-for="(t, ti) in tracks" :key="t.key" class="track" :class="'t-' + t.key">
      <div class="t-head">
        <span class="t-num mono">0{{ ti + 1 }}</span>
        <div>
          <h2><span class="tc">{{ t.label }}</span> — {{ t.title }}</h2>
          <p class="muted">{{ t.blurb }}</p>
        </div>
        <span class="spacer" />
        <span class="chip">{{ doneIn(t) }}/{{ t.lessons.length }}</span>
      </div>
      <ol class="line">
        <li v-for="(l, i) in t.lessons" :key="l.id" :class="[status(l.id), { next: l.id === nextId }]">
          <RouterLink :to="`/learn/${l.id}`" class="stop">
            <span class="node"><Icon v-if="status(l.id) === 'done'" name="check" :size="14" /><template v-else>{{ i + 1 }}</template></span>
            <span class="body">
              <span class="title">{{ l.title }}<span v-if="l.id === nextId" class="here">تابع من هنا</span></span>
              <span class="sum">{{ l.summary }}</span>
            </span>
            <span class="min muted small">{{ l.minutes }} د</span>
          </RouterLink>
        </li>
      </ol>
    </section>

    <section class="after">
      <Icon name="target" :size="22" />
      <div>
        <strong>بعد المسار: ابنِ مشاريع حقيقية</strong>
        <p class="muted">التحديات والمشاريع المتدرجة تصحَّح بمعايير فعلية مع نقاط لكل متطلب.</p>
      </div>
      <RouterLink to="/practice" class="btn">التدريب والمشاريع</RouterLink>
    </section>
  </div>
</template>

<style scoped>
.head { display: flex; gap: 32px; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; }
.total { min-width: 200px; }
.num { font-size: 3rem; line-height: 1; color: var(--accent); }
.num span { font-size: 1.2rem; color: var(--muted); }
.total .rule-line { margin-top: 10px; }
.track { margin-top: 40px; max-width: 900px; }
.t-head { display: flex; align-items: center; gap: 16px; margin-bottom: 8px; }
.t-head h2 { font-family: var(--font-display); font-weight: 500; font-size: 1.5rem; margin: 0; }
.t-head p { margin: 0; font-size: 14px; }
.t-num { font-size: 13px; color: var(--tc); border: 1px solid color-mix(in srgb, var(--tc) 40%, transparent); border-radius: 8px; padding: 2px 8px; }
.line { list-style: none; margin: 0; padding: 0 0 0 0; position: relative; }
.line::before { content: ''; position: absolute; inset-inline-start: 23px; top: 14px; bottom: 14px; width: 2px; background: linear-gradient(var(--tc), color-mix(in srgb, var(--tc) 15%, transparent)); border-radius: 2px; }
.stop { position: relative; display: flex; align-items: center; gap: 16px; padding-block: 12px; padding-inline: 12px 14px; border-radius: 14px; color: var(--text); text-decoration: none !important; transition: background var(--t); }
.stop:hover { background: var(--bg-2); }
.node { position: relative; z-index: 1; flex: none; width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-family: var(--font-code); background: var(--bg); border: 2px solid var(--tc); color: var(--tc); margin-inline-start: 0; }
.done .node { background: var(--tc); color: var(--bg); }
.next .node { box-shadow: 0 0 0 5px var(--accent-soft); border-color: var(--accent); color: var(--accent); }
.body { flex: 1; min-width: 0; display: grid; }
.title { font-weight: 500; font-size: 16px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.here { font-size: 11.5px; font-weight: 600; background: var(--accent); color: var(--accent-ink); border-radius: 999px; padding: 1px 9px; }
.sum { font-size: 13.5px; color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.min { flex: none; }
.after { display: flex; align-items: center; gap: 16px; margin-top: 48px; padding: 18px; border: 1px dashed var(--line-2); border-radius: 16px; flex-wrap: wrap; }
.after :deep(svg) { color: var(--accent); }
.after div { flex: 1; min-width: 220px; }
.after p { margin: 0; }
@media (max-width: 640px) { .sum { white-space: normal; } }
</style>
