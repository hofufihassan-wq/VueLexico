<script setup>
// عرض قيمة مُسلسلة من المشغّل (مع كومة الكائنات) بشكل قابل للتوسيع
import { ref, computed } from 'vue'
import { toText } from '../engine/runtime.js'

defineOptions({ name: 'ValueView' })
const props = defineProps({ v: Object, heap: { type: Object, default: () => ({}) }, depth: { type: Number, default: 0 } })
const open = ref(props.depth < 1)
const obj = computed(() => (props.v?.t === 'ref' ? props.heap[props.v.id] : null))
const expandable = computed(() => obj.value && ['array', 'object', 'map', 'set'].includes(obj.value.kind) && obj.value.entries.length)
const label = computed(() => {
  const o = obj.value
  if (!o) return toText(props.v, props.heap, 0, false)
  if (o.kind === 'array') return `Array(${o.length})`
  if (o.kind === 'map') return `Map(${o.length})`
  if (o.kind === 'set') return `Set(${o.length})`
  if (o.kind === 'object') return o.ctor || 'Object'
  return toText(props.v, props.heap, 0, false)
})
const preview = computed(() => (obj.value ? toText(props.v, props.heap, 1, false) : ''))
const cls = computed(() => `v-${props.v?.t}`)
</script>

<template>
  <span class="vv" dir="ltr">
    <template v-if="expandable">
      <button class="tw" :aria-expanded="open" @click="open = !open">{{ open ? '▾' : '▸' }}</button>
      <span class="lbl">{{ label }}</span>
      <span v-if="!open" class="pv">{{ preview }}</span>
      <span v-if="obj.id" class="oid">#{{ obj.id }}</span>
      <ul v-if="open" class="kids">
        <li v-for="([k, val], i) in obj.entries" :key="i">
          <span class="k">{{ obj.kind === 'map' ? toText(k, heap, 1, false) : obj.kind === 'set' ? '•' : k }}</span><span class="sep">:</span>
          <ValueView :v="val" :heap="heap" :depth="depth + 1" />
        </li>
        <li v-if="obj.more" class="more">… و{{ obj.more }} أخرى</li>
      </ul>
    </template>
    <span v-else :class="cls">{{ label }}</span>
  </span>
</template>

<style scoped>
.vv { font-family: var(--font-code); font-size: 12.5px; unicode-bidi: isolate; }
.tw { background: none; border: 0; color: var(--muted); cursor: pointer; padding: 0 3px 0 0; font-size: 11px; }
.lbl { color: var(--syn-type); }
.pv { color: var(--muted); margin-inline-start: 6px; }
.oid { color: var(--muted); font-size: 10.5px; margin-inline-start: 4px; }
.kids { list-style: none; margin: 2px 0 2px 12px; padding: 0 0 0 8px; border-inline-start: 1px solid var(--line-2); }
.k { color: var(--syn-prop); }
.sep { color: var(--muted); margin-inline-end: 6px; }
.more { color: var(--muted); }
.v-num, .v-big { color: var(--syn-number); }
.v-str { color: var(--syn-string); }
.v-bool, .v-null, .v-undef { color: var(--syn-keyword); }
.v-fn { color: var(--syn-fn); font-style: italic; }
.v-tdz { color: var(--muted); font-style: italic; }
</style>
