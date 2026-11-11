<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Workspace from '../components/Workspace.vue'
import Icon from '../components/Icon.vue'
import { store } from '../store/index.js'
import { TEMPLATES, createDraft } from '../composables/handoff.js'
import { downloadText, relTime, toast } from '../composables/ui.js'

const props = defineProps({ draft: { type: String, default: '' } })
const router = useRouter()

function ensureDraft() {
  if (props.draft) {
    const d = store.drafts.find((x) => x.id === props.draft)
    if (d) return d
  }
  const recent = [...store.drafts].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0]
  const d = recent || createDraft(TEMPLATES.card)
  router.replace(`/editor/${d.id}`)
  return d
}
const current = ref(ensureDraft())
watch(() => props.draft, () => { current.value = ensureDraft() })

const files = computed({
  get: () => current.value.files,
  set: (v) => { current.value.files = v; current.value.updatedAt = new Date().toISOString() },
})

const showDrafts = ref(false)
const confirmDelete = ref(null)
const sorted = computed(() => [...store.drafts].sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)))

function newFrom(key) {
  const d = createDraft(TEMPLATES[key])
  showDrafts.value = false
  router.push(`/editor/${d.id}`)
}
function duplicate() {
  const d = createDraft({ name: `${current.value.name} (نسخة)`, mode: current.value.mode, files: current.value.files })
  router.push(`/editor/${d.id}`)
  toast('أُنشئت نسخة من المسودة', 'ok')
}
function removeDraft(d) {
  const i = store.drafts.findIndex((x) => x.id === d.id)
  if (i !== -1) store.drafts.splice(i, 1)
  confirmDelete.value = null
  if (d.id === current.value.id) router.replace('/editor')
  toast('حُذفت المسودة')
}
function switchMode(m) {
  if (m === current.value.mode) return
  if (m === 'vue' && !current.value.files.vue) current.value.files = { ...current.value.files, vue: TEMPLATES.vue.files.vue }
  if (m === 'web' && !current.value.files.html) current.value.files = { ...TEMPLATES.blank.files, ...current.value.files }
  current.value.mode = m
}
function exportFile() {
  const d = current.value
  const safe = d.name.replace(/[\\/:*?"<>|]+/g, '-').slice(0, 60) || 'satr'
  if (d.mode === 'vue') return downloadText(`${safe}.vue`, d.files.vue || '', 'text/plain')
  // ملف HTML واحد مستقل (بدون جسر المعاينة) ليُفتح في أي متصفح
  const html = `<!doctype html>\n<html lang="ar" dir="rtl">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>${safe}</title>\n<style>\n${d.files.css || ''}\n</style>\n</head>\n<body>\n${d.files.html || ''}\n<script>\n${(d.files.js || '').replace(/<\/script/gi, '<\\/script')}\n<\/script>\n</body>\n</html>\n`
  downloadText(`${safe}.html`, html, 'text/html')
}
</script>

<template>
  <div class="page wide editor-page">
    <header class="ed-head">
      <div class="title-wrap">
        <Icon name="code" />
        <input v-model="current.name" class="name" aria-label="اسم المسودة" maxlength="80">
        <span class="muted small">حُفظت {{ relTime(current.updatedAt) }}</span>
      </div>
      <div class="row">
        <div class="tabs" aria-label="نوع المشروع">
          <button :class="{ on: current.mode === 'web' }" @click="switchMode('web')">HTML · CSS · JS</button>
          <button :class="{ on: current.mode === 'vue' }" @click="switchMode('vue')">Vue (SFC)</button>
        </div>
        <button class="btn sm" @click="showDrafts = !showDrafts"><Icon name="layers" :size="15" /> المسودات ({{ store.drafts.length }})</button>
        <button class="btn sm" @click="duplicate"><Icon name="copy" :size="15" /> نسخة</button>
        <button class="btn sm" @click="exportFile"><Icon name="download" :size="15" /> تنزيل</button>
      </div>
    </header>

    <Transition name="fade">
      <section v-if="showDrafts" class="drafts panel">
        <div class="d-new">
          <span class="muted small">جديد من قالب:</span>
          <button v-for="(t, k) in TEMPLATES" :key="k" class="chip" @click="newFrom(k)"><Icon name="plus" :size="13" /> {{ t.name }}</button>
        </div>
        <ul class="d-list">
          <li v-for="d in sorted" :key="d.id" :class="{ on: d.id === current.id }">
            <RouterLink :to="`/editor/${d.id}`" @click="showDrafts = false">
              <strong>{{ d.name }}</strong>
              <span class="muted small">{{ d.mode === 'vue' ? 'Vue' : 'ويب' }} · {{ relTime(d.updatedAt) }}</span>
            </RouterLink>
            <template v-if="confirmDelete === d.id">
              <button class="btn danger sm" @click="removeDraft(d)">تأكيد الحذف</button>
              <button class="btn ghost sm" @click="confirmDelete = null">إلغاء</button>
            </template>
            <button v-else class="btn ghost sm icon" aria-label="حذف المسودة" @click="confirmDelete = d.id"><Icon name="trash" :size="15" /></button>
          </li>
        </ul>
      </section>
    </Transition>

    <Workspace :key="current.id + current.mode" v-model="files" :mode="current.mode" height="calc(100vh - 150px)" />
    <p class="muted small foot">
      الكود يعمل في إطار معزول بلا وصول للشبكة أو لبيانات المنصة، مع إيقاف تلقائي للحلقات اللانهائية. اختصارات: <kbd>Ctrl</kbd>+<kbd>Enter</kbd> تشغيل، <kbd>Ctrl</kbd>+<kbd>F</kbd> بحث، <kbd>Ctrl</kbd>+<kbd>/</kbd> تعليق.
    </p>
  </div>
</template>

<style scoped>
.editor-page { padding-top: 16px; padding-bottom: 24px; }
.ed-head { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
.title-wrap { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
.title-wrap :deep(svg) { color: var(--accent); }
.name { font-family: var(--font-display); font-size: 1.35rem; background: transparent; border: 1px solid transparent; border-radius: 8px; padding: 2px 8px; min-width: 0; flex: 0 1 380px; }
.name:hover, .name:focus { border-color: var(--line-2); outline: none; background: var(--bg-2); }
.drafts { padding: 14px; margin-bottom: 12px; }
.d-new { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.d-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 4px; max-height: 280px; overflow: auto; }
.d-list li { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 10px; }
.d-list li.on { background: var(--accent-soft); }
.d-list a { flex: 1; display: flex; gap: 12px; align-items: baseline; color: var(--text); text-decoration: none; min-width: 0; }
.d-list strong { font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.foot { margin: 10px 2px 0; }
</style>
