<script setup>
import Icon from './Icon.vue'
import ErrorCard from './ErrorCard.vue'

defineProps({
  logs: { type: Array, default: () => [] },
  errors: { type: Array, default: () => [] },
  empty: { type: String, default: 'لا مخرجات بعد. استخدم console.log لطباعة القيم هنا.' },
})
const emit = defineEmits(['clear', 'goto'])
</script>

<template>
  <div class="console">
    <div class="c-head">
      <Icon name="terminal" :size="15" />
      <span>الطرفية</span>
      <span v-if="errors.length" class="chip bad">{{ errors.length }} خطأ</span>
      <span class="spacer" />
      <button class="btn ghost sm" @click="emit('clear')">مسح</button>
    </div>
    <div class="c-body" dir="ltr">
      <div v-for="(e, i) in errors" :key="'e' + i" dir="rtl" class="c-err"><ErrorCard :error="e" compact @goto="emit('goto', $event)" /></div>
      <div v-for="(l, i) in logs" :key="i" class="c-line" :class="l.level">
        <span class="c-text">{{ l.text }}</span>
        <button v-if="l.line" class="c-loc" @click="emit('goto', l.line)">{{ l.file ? l.file + ':' : '' }}{{ l.line }}</button>
      </div>
      <p v-if="!logs.length && !errors.length" class="c-empty" dir="rtl">{{ empty }}</p>
    </div>
  </div>
</template>

<style scoped>
.console { display: flex; flex-direction: column; min-height: 0; height: 100%; background: var(--code-bg); }
.c-head { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-bottom: 1px solid var(--line); font-size: 13px; color: var(--text-2); }
.chip.bad { background: var(--bad-soft); color: var(--bad); border-color: transparent; height: 22px; }
.c-body { flex: 1; overflow: auto; padding: 6px 0; font-family: var(--font-code); font-size: 13px; }
.c-line { display: flex; gap: 10px; padding: 4px 12px; border-bottom: 1px solid var(--line); white-space: pre-wrap; word-break: break-word; }
.c-line.warn { background: color-mix(in srgb, var(--warn) 10%, transparent); color: var(--warn); }
.c-line.error { background: var(--bad-soft); color: var(--bad); }
.c-line.info { color: var(--mint); }
.c-text { flex: 1; unicode-bidi: plaintext; text-align: start; }
.c-loc { background: none; border: 0; color: var(--muted); font-size: 11.5px; cursor: pointer; padding: 0; white-space: nowrap; }
.c-loc:hover { color: var(--accent); }
.c-err { padding: 6px 10px; }
.c-empty { color: var(--muted); font-family: var(--font-ui); padding: 10px 14px; margin: 0; font-size: 13.5px; }
</style>
