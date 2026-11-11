<script setup>
// «جرّب بنفسك»: مساحة صغيرة قابلة للتعديل داخل الدرس، مع إعادة ضبط وفتح في المحرر
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Workspace from './Workspace.vue'
import Icon from './Icon.vue'
import { draftFrom } from '../composables/handoff.js'

const props = defineProps({ mode: String, files: Object, code: String })
const router = useRouter()
const initial = () => (props.mode === 'js' ? { js: props.code } : props.mode === 'vue' ? { vue: props.code } : { html: '', css: '', js: '', ...props.files })
const model = ref(initial())
const key = ref(0)
function reset() { model.value = initial(); key.value++ }
function openInEditor() {
  const id = draftFrom({ name: 'تجربة من درس', mode: props.mode === 'vue' ? 'vue' : 'web', files: props.mode === 'js' ? { html: '', css: '', js: model.value.js } : model.value })
  router.push(`/editor/${id}`)
}
const editable = props.mode === 'web' ? Object.keys(props.files || {}).filter((k) => ['html', 'css', 'js'].includes(k)) : null
</script>

<template>
  <div class="try">
    <div class="try-head">
      <span class="tag"><Icon name="spark" :size="14" /> جرّب بنفسك</span>
      <span class="muted small">عدّل الكود وشاهد النتيجة فورًا</span>
      <span class="spacer" />
      <button class="btn ghost sm" @click="reset"><Icon name="refresh" :size="14" /> إعادة</button>
      <button class="btn ghost sm" @click="openInEditor"><Icon name="external" :size="14" /> في المحرر</button>
    </div>
    <Workspace :key="key" v-model="model" :mode="mode" :editable="editable" :height="mode === 'js' ? '300px' : '380px'" :auto-run-default="mode !== 'js'" compact />
  </div>
</template>

<style scoped>
.try { margin: 1.4em 0; }
.try-head { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
.tag { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--mint); background: var(--mint-soft); padding: 3px 10px; border-radius: 999px; }
</style>
