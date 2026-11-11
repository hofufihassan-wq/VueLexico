<script setup>
// الفحص الذاتي: يشغّل كل حل مرجعي عبر المصحّح الحقيقي (المعاينة المعزولة أو العامل)
// ويتأكد أن الحل ينجح وأن كود البداية لا ينجح. يُستخدم يدويًا وفي اختبارات E2E.
import { ref, computed, reactive } from 'vue'
import PreviewFrame from '../components/PreviewFrame.vue'
import Icon from '../components/Icon.vue'
import { useRunner } from '../composables/useRunner.js'
import { allLessons } from '../content/lessons/index.js'
import { challenges, projects } from '../content/practice.js'
import { grade, modeOf, startFiles, solutionFiles } from '../composables/grader.js'

const runner = useRunner()
const frame = ref(null)
const rows = reactive([])
const running = ref(false)
const filter = ref('all')

const ITEMS = [
  ...allLessons.map((l) => ({ id: l.id, label: `درس: ${l.title}`, ex: l.exercise, group: 'lessons' })),
  ...challenges.map((c) => ({ id: c.id, label: `تحدٍّ: ${c.title}`, ex: c, group: 'practice' })),
  ...projects.map((p) => ({ id: p.id, label: `مشروع: ${p.title}`, ex: p, group: 'practice' })),
]

// غلاف يطابق واجهة Workspace التي يتوقعها grade()
const ws = {
  async runChecks(checks, files) {
    await runner.build(ws.mode, files || ws.files)
    return frame.value.runChecks(checks, ws.files)
  },
}

async function check(ex, files) {
  ws.mode = modeOf(ex)
  ws.files = files
  const wsProxy = { runChecks: (checks) => ws.runChecks(checks, files) }
  return grade(ex, files, wsProxy)
}

async function runAll() {
  running.value = true
  rows.splice(0)
  window.__selftest = { done: false }
  const list = filter.value === 'all' ? ITEMS : ITEMS.filter((i) => i.group === filter.value || i.ex.kind === filter.value)
  for (const it of list) {
    const row = reactive({ id: it.id, label: it.label, kind: it.ex.kind, solution: null, starter: null, ms: 0, details: '' })
    rows.push(row)
    const t0 = performance.now()
    try {
      const s = await check(it.ex, solutionFiles(it.ex))
      row.solution = s.ok
      if (!s.ok) row.details = (s.results || []).filter((r) => !r.pass).map((r) => `${r.title}: ${r.message}`).join(' | ') || (s.syntax ? s.syntax.message : '')
      const b = await check(it.ex, startFiles(it.ex))
      row.starter = !b.ok
    } catch (e) {
      row.solution = false
      row.details = String(e.message || e)
    }
    row.ms = Math.round(performance.now() - t0)
  }
  running.value = false
  window.__selftest = { done: true, total: rows.length, failed: rows.filter((r) => !r.solution || !r.starter).map((r) => ({ id: r.id, solution: r.solution, starter: r.starter, details: r.details })) }
}
const summary = computed(() => ({ ok: rows.filter((r) => r.solution && r.starter).length, total: rows.length }))
</script>

<template>
  <div class="page selftest">
    <header class="page-head">
      <div class="eyebrow">الفحص الذاتي</div>
      <h1>هل المصحّحات والحلول سليمة؟</h1>
      <p>يشغّل الحل المرجعي لكل تمرين وتحدٍّ ومشروع عبر المصحّح الفعلي نفسه الذي يستخدمه المتعلّم (في المعاينة المعزولة أو العامل)، ثم يشغّل كود البداية ليتأكد أنه لا يُقبل. هذا يكشف أخطاء المحتوى، لكنه لا يضمن أن الفحوص تغطي كل حل خاطئ ممكن.</p>
    </header>
    <div class="row">
      <select v-model="filter" class="select narrow" aria-label="النطاق">
        <option value="all">الكل ({{ ITEMS.length }})</option>
        <option value="lessons">تمارين الدروس</option>
        <option value="practice">التحديات والمشاريع</option>
        <option value="dom">نوع dom فقط</option>
        <option value="vue">نوع vue فقط</option>
        <option value="js">نوع js فقط</option>
      </select>
      <button class="btn primary" :disabled="running" data-test="run-selftest" @click="runAll"><Icon name="play" :size="15" /> {{ running ? 'جارٍ الفحص…' : 'شغّل الفحص' }}</button>
      <span v-if="rows.length" class="summary" :class="{ ok: summary.ok === summary.total && !running }">{{ summary.ok }} / {{ summary.total }} سليم</span>
    </div>
    <table v-if="rows.length" class="tbl">
      <thead><tr><th>العنصر</th><th>النوع</th><th>الحل يجتاز</th><th>البداية تُرفض</th><th>الزمن</th></tr></thead>
      <tbody>
        <tr v-for="r in rows" :key="r.id" :class="{ bad: r.solution === false || r.starter === false }">
          <td>{{ r.label }}<div v-if="r.details" class="det">{{ r.details }}</div></td>
          <td class="mono">{{ r.kind }}</td>
          <td><span v-if="r.solution === null" class="muted">…</span><Icon v-else :name="r.solution ? 'check' : 'x'" :size="16" :class="r.solution ? 'ok' : 'no'" /></td>
          <td><span v-if="r.starter === null" class="muted">…</span><Icon v-else :name="r.starter ? 'check' : 'x'" :size="16" :class="r.starter ? 'ok' : 'no'" /></td>
          <td class="mono small">{{ r.ms }}ms</td>
        </tr>
      </tbody>
    </table>
    <div class="hidden-frame" aria-hidden="true">
      <PreviewFrame ref="frame" :doc="runner.doc.value" :token="runner.token" title="إطار الفحص" @log="runner.onLog" @error="runner.onError" />
    </div>
  </div>
</template>

<style scoped>
.narrow { width: auto; }
.summary { font-weight: 600; color: var(--warn); }
.summary.ok { color: var(--ok); }
.tbl { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px; }
.tbl th { text-align: start; color: var(--muted); font-weight: 500; padding: 8px; border-bottom: 1px solid var(--line-2); }
.tbl td { padding: 8px; border-bottom: 1px solid var(--line); vertical-align: top; }
.tbl tr.bad { background: var(--bad-soft); }
.ok { color: var(--ok); } .no { color: var(--bad); }
.det { font-size: 12.5px; color: var(--bad); margin-top: 4px; }
.hidden-frame { position: fixed; inset-inline-start: -2000px; top: 0; width: 1024px; height: 768px; }
</style>
