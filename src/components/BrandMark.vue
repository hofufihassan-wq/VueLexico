<script setup>
defineProps({ size: { type: Number, default: 30 } })
</script>

<template>
  <!-- الشعار: نقطة فوق سطر — كأول حرف يُكتب على السطر -->
  <svg :width="size" :height="size" viewBox="0 0 32 32" aria-hidden="true" class="mark">
    <rect width="32" height="32" rx="9" class="bg" />
    <path d="M7 21h18" class="ln" stroke-width="3" stroke-linecap="round" />
    <path d="M7 21h7" class="ln2" stroke-width="3" stroke-linecap="round" />
    <circle cx="20.5" cy="12.5" r="3.2" class="dt" />
  </svg>
</template>

<style scoped>
.bg { fill: var(--bg-4); }
.ln { stroke: color-mix(in srgb, var(--accent) 45%, transparent); }
.ln2 { stroke: var(--accent); }
.dt { fill: var(--mint); }
.mark { flex: none; }
</style>
