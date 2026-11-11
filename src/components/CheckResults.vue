<script setup>
import Icon from './Icon.vue'
defineProps({ results: { type: Array, default: () => [] }, syntax: Object })
</script>

<template>
  <div class="results">
    <div v-if="syntax" class="r fail">
      <Icon name="x" :size="16" />
      <div><strong>خطأ في الصياغة في السطر {{ syntax.line }}</strong><p>{{ syntax.message }} — لم يُشغَّل الكود. أصلح الصياغة ثم أعد التحقق.</p></div>
    </div>
    <div v-for="(r, i) in results" :key="i" class="r" :class="r.pass ? 'pass' : 'fail'">
      <Icon :name="r.pass ? 'check' : 'x'" :size="16" />
      <div>
        <strong>{{ r.title }}</strong>
        <p v-if="!r.pass && r.message">{{ r.message }}</p>
        <p v-if="!r.pass && r.expected !== undefined && r.actual !== undefined && !r.message?.includes(r.expected)" class="mono cmp">المتوقع: {{ r.expected }} · الفعلي: {{ r.actual }}</p>
      </div>
      <span v-if="r.points !== undefined" class="pts">{{ r.pass ? r.points : 0 }}/{{ r.points }}</span>
    </div>
  </div>
</template>

<style scoped>
.results { display: grid; gap: 6px; }
.r { display: flex; gap: 10px; align-items: flex-start; padding: 8px 12px; border-radius: 10px; font-size: 14px; border: 1px solid transparent; }
.r :deep(svg) { margin-top: 4px; }
.r.pass { background: var(--ok-soft); }
.r.pass :deep(svg) { color: var(--ok); }
.r.fail { background: var(--bad-soft); border-color: color-mix(in srgb, var(--bad) 22%, transparent); }
.r.fail :deep(svg) { color: var(--bad); }
.r strong { font-weight: 500; }
.r p { margin: 2px 0 0; color: var(--text-2); font-size: 13.5px; }
.r > div { flex: 1; min-width: 0; }
.cmp { font-size: 12.5px; white-space: pre-wrap; word-break: break-word; }
.pts { font-family: var(--font-code); font-size: 12px; color: var(--muted); white-space: nowrap; }
</style>
