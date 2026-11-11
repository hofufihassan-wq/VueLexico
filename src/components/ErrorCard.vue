<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
import { explainError } from '../engine/errors.js'

const props = defineProps({ error: { type: Object, required: true }, compact: Boolean })
const emit = defineEmits(['goto'])
const info = computed(() => explainError(props.error))
</script>

<template>
  <div class="err" :class="{ compact }" role="alert">
    <div class="head">
      <Icon name="x" :size="16" />
      <strong>{{ info.title }}</strong>
      <button v-if="error.line" class="loc" @click="emit('goto', error.line)">
        {{ error.file ? error.file + ' · ' : '' }}السطر {{ error.line }}
      </button>
    </div>
    <p class="explain">{{ info.explain }}</p>
    <p v-if="info.hint && !compact" class="hint"><Icon name="bulb" :size="15" /> {{ info.hint }}</p>
    <details>
      <summary>الرسالة الأصلية</summary>
      <code class="mono raw">{{ error.name }}: {{ error.message }}</code>
      <p class="kind muted small">{{ info.kind }}</p>
    </details>
  </div>
</template>

<style scoped>
.err { border: 1px solid color-mix(in srgb, var(--bad) 35%, transparent); background: var(--bad-soft); border-radius: 12px; padding: 10px 12px; font-size: 14px; }
.head { display: flex; align-items: center; gap: 8px; color: var(--bad); }
.head strong { color: var(--text); font-weight: 600; }
.loc { margin-inline-start: auto; font-size: 12px; background: var(--bg-2); border: 1px solid var(--line-2); border-radius: 6px; padding: 1px 8px; cursor: pointer; color: var(--text-2); }
.explain { margin: 6px 0 0; color: var(--text-2); }
.hint { margin: 6px 0 0; display: flex; gap: 6px; align-items: flex-start; color: var(--text); }
.hint :deep(svg) { margin-top: 5px; color: var(--accent); }
details { margin-top: 6px; }
summary { cursor: pointer; font-size: 12.5px; color: var(--muted); }
.raw { display: block; margin-top: 4px; white-space: pre-wrap; word-break: break-word; font-size: 12.5px; background: var(--bg-2); padding: 6px 8px; border-radius: 6px; }
.kind { margin: 4px 0 0; }
.compact .explain { font-size: 13px; }
</style>
