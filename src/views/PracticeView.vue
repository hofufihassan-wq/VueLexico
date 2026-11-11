<script setup>
import Icon from '../components/Icon.vue'
import { challenges, projects } from '../content/practice.js'
import { store } from '../store/index.js'

const LEVEL = { 1: 'مبتدئ', 2: 'متوسط', 3: 'متقدم' }
const st = (id) => store.practice[id]
</script>

<template>
  <div class="page practice">
    <header class="page-head">
      <div class="eyebrow">التدريب والمشاريع</div>
      <h1>تعلّم بالبناء</h1>
      <p>التحديات قصيرة وتركّز على مهارة واحدة. المشاريع أكبر: لكل منها متطلبات بنقاط، وتصحيح يتفاعل مع صفحتك فعلًا (ينقر ويكتب ويقيس)، وتلميحات متدرجة، وسجل لمحاولاتك.</p>
    </header>

    <section>
      <h2 class="sec">المشاريع</h2>
      <div class="projects">
        <RouterLink v-for="(p, i) in projects" :key="p.id" :to="`/practice/${p.id}`" class="proj" :class="'t-' + p.track">
          <span class="idx mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="p-body">
            <div class="p-top"><strong>{{ p.title }}</strong><span class="chip"><span class="dot tc" />{{ p.track.toUpperCase() }} · {{ LEVEL[p.level] }}</span></div>
            <p class="muted">{{ p.summary }}</p>
            <div class="skills"><span v-for="s in p.skills" :key="s">{{ s }}</span></div>
          </div>
          <div class="score">
            <div class="display num" :class="{ full: st(p.id)?.best === 100 }">{{ st(p.id)?.best ?? 0 }}</div>
            <div class="muted small">/ 100</div>
            <div class="rule-line"><i :style="{ width: (st(p.id)?.best || 0) + '%' }" /></div>
          </div>
        </RouterLink>
      </div>
    </section>

    <section>
      <h2 class="sec">التحديات</h2>
      <ul class="chals">
        <li v-for="c in challenges" :key="c.id">
          <RouterLink :to="`/practice/${c.id}`" :class="'t-' + c.track">
            <span class="state" :class="{ done: st(c.id)?.passed, tried: st(c.id)?.attempts && !st(c.id)?.passed }"><Icon v-if="st(c.id)?.passed" name="check" :size="13" /></span>
            <span class="c-title">{{ c.title }}</span>
            <span class="dot tc" /><span class="muted small">{{ c.track.toUpperCase() }}</span>
            <span class="lvl">{{ '●'.repeat(c.level) }}<span class="faint">{{ '●'.repeat(3 - c.level) }}</span></span>
          </RouterLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.sec { font-family: var(--font-display); font-weight: 500; font-size: 1.4rem; margin: 30px 0 12px; }
.projects { display: grid; gap: 10px; }
.proj { display: flex; gap: 18px; align-items: center; padding: 16px 18px; border: 1px solid var(--line); border-radius: 16px; background: var(--bg-2); color: var(--text); text-decoration: none !important; transition: border-color var(--t), transform var(--t) var(--ease); }
.proj:hover { border-color: color-mix(in srgb, var(--tc) 50%, transparent); transform: translateY(-1px); }
.idx { font-size: 13px; color: var(--tc); align-self: flex-start; padding-top: 3px; }
.p-body { flex: 1; min-width: 0; }
.p-top { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.p-top strong { font-size: 17px; font-weight: 600; }
.p-body p { margin: 4px 0 8px; font-size: 14px; }
.skills { display: flex; flex-wrap: wrap; gap: 6px; }
.skills span { font-size: 12px; color: var(--text-2); border: 1px solid var(--line-2); border-radius: 6px; padding: 0 7px; }
.score { width: 90px; text-align: center; flex: none; }
.num { font-size: 2rem; line-height: 1; color: var(--text-2); }
.num.full { color: var(--ok); }
.score .rule-line { margin-top: 6px; }
.chals { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 6px 16px; }
.chals a { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-bottom: 1px solid var(--line); color: var(--text); text-decoration: none !important; border-radius: 8px; }
.chals a:hover { background: var(--bg-2); }
.state { width: 20px; height: 20px; border-radius: 50%; border: 1.5px solid var(--line-2); display: grid; place-items: center; flex: none; }
.state.done { background: var(--ok); border-color: var(--ok); color: var(--bg); }
.state.tried { border-color: var(--accent); }
.c-title { flex: 1; }
.lvl { font-size: 9px; letter-spacing: 2px; color: var(--accent); }
.faint { color: var(--line-2); }
@media (max-width: 640px) { .proj { flex-wrap: wrap; } .score { width: 100%; display: flex; align-items: center; gap: 10px; text-align: start; } .score .rule-line { flex: 1; margin: 0; } }
</style>
