<script setup>
import { ref, computed } from 'vue'
import Icon from '../components/Icon.vue'
import { store, saveStatus, exportData, importData, resetAll, saveNow } from '../store/index.js'
import { STORAGE_KEY } from '../store/schema.js'
import { downloadText, toast, relTime } from '../composables/ui.js'

const pendingImport = ref(null) // { name, text }
const importError = ref('')
const confirmReset = ref('')
const fileInput = ref(null)

const usage = computed(() => {
  void saveStatus.at
  try { return new Blob([localStorage.getItem(STORAGE_KEY) || '']).size } catch { return 0 }
})
const fmtBytes = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(2)} م.ب` : `${(n / 1024).toFixed(1)} ك.ب`)
const counts = computed(() => ({
  lessons: Object.values(store.lessons).filter((l) => l.status === 'done').length,
  drafts: store.drafts.length,
  practice: Object.keys(store.practice).length,
  reviews: Object.keys(store.reviews).length,
  notes: Object.values(store.lessons).filter((l) => l.note).length,
}))

function doExport() {
  const d = new Date()
  downloadText(`satr-backup-${d.toISOString().slice(0, 10)}.json`, exportData())
  toast('نُزّلت النسخة الاحتياطية', 'ok')
}
async function onFile(e) {
  importError.value = ''
  const f = e.target.files?.[0]
  e.target.value = ''
  if (!f) return
  if (f.size > 8 * 1024 * 1024) { importError.value = 'الملف كبير جدًا (أكثر من 8 م.ب).'; return }
  const text = await f.text()
  try {
    const data = JSON.parse(text)
    if (data.app !== 'satr') throw new Error()
  } catch { importError.value = 'هذا الملف ليس نسخة احتياطية صالحة من سطر.'; return }
  pendingImport.value = { name: f.name, text }
}
function applyImport(mode) {
  const r = importData(pendingImport.value.text, mode)
  if (!r.ok) { importError.value = r.error; return }
  pendingImport.value = null
  toast(mode === 'merge' ? 'دُمجت النسخة مع بياناتك' : 'استُعيدت النسخة الاحتياطية', 'ok')
}
function doReset() {
  resetAll()
  confirmReset.value = ''
  toast('حُذفت كل البيانات المحلية')
}
</script>

<template>
  <div class="page settings">
    <header class="page-head">
      <div class="eyebrow">الإعدادات</div>
      <h1>الإعدادات والنسخ الاحتياطي</h1>
      <p>كل بياناتك (التقدم، الأكواد، الملاحظات، المشاريع، المراجعات) محفوظة في هذا المتصفح فقط، تلقائيًا، ولا تُرسل لأي خادم. لنقلها لجهاز آخر أو حمايتها صدّر نسخة احتياطية.</p>
    </header>

    <section class="block">
      <h2>التفضيلات</h2>
      <div class="form">
        <label class="field">اسمك (للترحيب في لوحتك)<input v-model.trim="store.settings.name" class="input" maxlength="60" placeholder="اختياري"></label>
        <div class="field">الثيم
          <div class="tabs">
            <button :class="{ on: store.settings.theme === 'system' }" @click="store.settings.theme = 'system'">حسب النظام</button>
            <button :class="{ on: store.settings.theme === 'dark' }" @click="store.settings.theme = 'dark'">داكن (حبر)</button>
            <button :class="{ on: store.settings.theme === 'light' }" @click="store.settings.theme = 'light'">فاتح (ورق)</button>
          </div>
        </div>
        <label class="field">حجم خط المحرر: {{ store.settings.editorFontSize }}px<input v-model.number="store.settings.editorFontSize" type="range" min="12" max="22"></label>
        <label class="check"><input v-model="store.settings.autoRun" type="checkbox"> تشغيل المعاينة تلقائيًا أثناء الكتابة (للمساحات الجديدة)</label>
        <label class="check"><input v-model="store.settings.reduceMotion" type="checkbox"> تقليل الحركة والانتقالات</label>
      </div>
    </section>

    <section class="block">
      <h2>بياناتك</h2>
      <div class="stats">
        <div><strong class="display">{{ counts.lessons }}</strong><span>دروس مكتملة</span></div>
        <div><strong class="display">{{ counts.drafts }}</strong><span>مسودات</span></div>
        <div><strong class="display">{{ counts.practice }}</strong><span>تحديات ومشاريع</span></div>
        <div><strong class="display">{{ counts.reviews }}</strong><span>بطاقات مراجعة</span></div>
        <div><strong class="display">{{ counts.notes }}</strong><span>ملاحظات</span></div>
      </div>
      <p class="muted small">الحجم المستخدم: {{ fmtBytes(usage) }} · آخر حفظ: {{ saveStatus.at ? relTime(saveStatus.at) : '—' }} · المتصفحات تسمح عادة بنحو 5 م.ب لكل موقع.</p>
      <p v-if="saveStatus.error" class="err">{{ saveStatus.error }}</p>

      <div class="row actions">
        <button class="btn primary" @click="doExport"><Icon name="download" :size="16" /> تصدير نسخة احتياطية</button>
        <button class="btn" @click="fileInput.click()"><Icon name="upload" :size="16" /> استيراد نسخة</button>
        <button class="btn ghost" @click="saveNow(); toast('حُفظ الآن', 'ok')"><Icon name="save" :size="16" /> احفظ الآن</button>
        <input ref="fileInput" type="file" accept="application/json,.json" hidden @change="onFile">
      </div>
      <p v-if="importError" class="err">{{ importError }}</p>

      <div v-if="pendingImport" class="confirm panel">
        <p><strong>استيراد «{{ pendingImport.name }}»</strong></p>
        <p class="muted small">الدمج يضيف ما في النسخة دون حذف شيء (ويحتفظ بالأفضل عند التعارض). الاستبدال يمسح بياناتك الحالية ويضع النسخة مكانها.</p>
        <div class="row">
          <button class="btn primary sm" @click="applyImport('merge')">دمج مع بياناتي</button>
          <button class="btn danger sm" @click="applyImport('replace')">استبدال الكل</button>
          <button class="btn ghost sm" @click="pendingImport = null">إلغاء</button>
        </div>
      </div>
    </section>

    <section class="block danger-zone">
      <h2>منطقة الحذف</h2>
      <p class="muted">يحذف كل التقدم والمسودات والملاحظات من هذا المتصفح نهائيًا. صدّر نسخة احتياطية أولًا إن أردت الاحتفاظ بها.</p>
      <div class="row">
        <input v-model="confirmReset" class="input narrow" placeholder="اكتب: احذف" aria-label="اكتب احذف للتأكيد">
        <button class="btn danger" :disabled="confirmReset.trim() !== 'احذف'" @click="doReset"><Icon name="trash" :size="16" /> حذف كل البيانات</button>
      </div>
    </section>

    <section class="block about">
      <h2>عن المنصة</h2>
      <ul class="muted">
        <li>تعمل بالكامل في متصفحك: لا حسابات، ولا خوادم، ولا مفاتيح API، ولا خدمات مدفوعة.</li>
        <li>أكوادك تُشغَّل في بيئات معزولة: Web Worker لـ JavaScript، وإطار sandbox بلا أصل مع سياسة CSP تمنع الشبكة لصفحات HTML وVue.</li>
        <li>لوحة <RouterLink to="/selftest">الفحص الذاتي</RouterLink> تشغّل كل الحلول المرجعية عبر المصحّح الحقيقي للتحقق من سلامة المحتوى.</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.block { margin-top: 28px; padding-top: 20px; border-top: 1px solid var(--line); }
.block h2 { font-family: var(--font-display); font-weight: 500; font-size: 1.3rem; }
.form { display: grid; gap: 16px; max-width: 520px; }
.check { display: flex; gap: 10px; align-items: center; cursor: pointer; }
input[type='range'] { accent-color: var(--accent); }
.stats { display: flex; flex-wrap: wrap; gap: 26px; margin: 10px 0; }
.stats div { display: grid; }
.stats strong { font-size: 2rem; color: var(--accent); line-height: 1.1; }
.stats span { font-size: 13px; color: var(--muted); }
.actions { margin-top: 12px; }
.confirm { padding: 14px; margin-top: 12px; border-color: var(--accent); }
.confirm p { margin: 0 0 8px; }
.err { color: var(--bad); }
.narrow { max-width: 200px; }
.danger-zone h2 { color: var(--bad); }
.about ul { padding-inline-start: 1.2em; line-height: 2; }
</style>
