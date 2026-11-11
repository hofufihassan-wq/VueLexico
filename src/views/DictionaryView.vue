<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '../components/Icon.vue'
import CodeEditor from '../components/CodeEditor.vue'
import { terms, termById, searchTerms, TECHS } from '../content/dictionary/index.js'
import { store, toggleFavorite, addToReview } from '../store/index.js'
import { termCardId } from '../content/lessons/index.js'
import { draftFrom } from '../composables/handoff.js'
import { toast } from '../composables/ui.js'

const props = defineProps({ id: { type: String, default: '' } })
const router = useRouter()
const q = ref('')
const tech = ref('all')
const onlyFav = ref(false)

const list = computed(() => {
  let r = searchTerms(q.value, tech.value)
  if (onlyFav.value) r = r.filter((t) => store.favorites.includes(t.id))
  return r
})
const term = computed(() => termById[props.id] || null)
const counts = computed(() => Object.fromEntries(Object.keys(TECHS).map((k) => [k, terms.filter((t) => t.tech === k).length])))

// النطق عبر محرك الكلام في المتصفح (إن توفر صوت إنجليزي)
const canSpeak = ref(false)
onMounted(() => {
  if (!('speechSynthesis' in window)) return
  const check = () => { canSpeak.value = speechSynthesis.getVoices().some((v) => /^en/i.test(v.lang)) }
  check()
  speechSynthesis.addEventListener?.('voiceschanged', check)
})
function speak(t) {
  try {
    speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(t.say)
    u.lang = 'en-US'
    u.rate = 0.85
    const v = speechSynthesis.getVoices().find((x) => /^en-US/i.test(x.lang)) || speechSynthesis.getVoices().find((x) => /^en/i.test(x.lang))
    if (v) u.voice = v
    speechSynthesis.speak(u)
  } catch { toast('تعذّر تشغيل النطق في هذا المتصفح', 'bad') }
}

const exampleLang = (t) => (t.tech === 'vue' ? 'vue' : t.tech === 'css' ? 'css' : t.tech === 'html' ? 'html' : 'js')
function tryIt(t) {
  if (t.tech === 'js' && !/document|addEventListener|querySelector|localStorage|fetch/.test(t.example)) {
    store.labs.js = t.example
    router.push('/js-lab')
    return
  }
  const files = t.tech === 'vue'
    ? { vue: /<template|<script/.test(t.example) ? t.example : `<script setup>\nimport { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue"\n// ${t.term}\n<\/script>\n\n<template>\n  <p>راجع المثال في القاموس</p>\n</template>\n` }
    : t.tech === 'css' ? { html: '<div class="card"><h2>عنوان</h2><p>نص تجريبي</p><button>زر</button></div>', css: t.example, js: '' }
      : t.tech === 'html' ? { html: t.example, css: '', js: '' } : { html: '<button id="btn">زر</button>', css: '', js: t.example }
  router.push(`/editor/${draftFrom({ name: `تجربة: ${t.term}`, mode: t.tech === 'vue' ? 'vue' : 'web', files })}`)
}
function review(t) { addToReview(termCardId(t.id)); toast('أضيف المصطلح لبطاقات المراجعة', 'ok') }
const inReview = (t) => !!store.reviews[termCardId(t.id)]
</script>

<template>
  <div class="page dict">
    <header class="page-head">
      <div class="eyebrow">القاموس</div>
      <h1>كل مصطلح… بالعربية وبالمثال</h1>
      <p>{{ terms.length }} مصطلحًا في HTML وCSS وJavaScript وVue: المعنى، والشرح المبسّط، وطريقة الكتابة، ومثال يعمل، والنطق — مع رابط للتوثيق الرسمي.</p>
    </header>

    <div class="d-grid" :class="{ detail: !!term }">
      <aside class="d-list">
        <div class="search">
          <Icon name="search" :size="16" />
          <input v-model="q" class="input" placeholder="ابحث: flex، مصفوفة، v-model…" aria-label="ابحث في القاموس">
        </div>
        <div class="filters">
          <button class="chip" :class="{ on: tech === 'all' }" @click="tech = 'all'">الكل</button>
          <button v-for="(t, k) in TECHS" :key="k" class="chip" :class="['t-' + k, { on: tech === k }]" @click="tech = k"><span class="dot tc" />{{ t.label }} <span class="muted">{{ counts[k] }}</span></button>
          <button class="chip" :class="{ on: onlyFav }" @click="onlyFav = !onlyFav"><Icon name="star" :size="13" /> المفضلة</button>
        </div>
        <ul class="items">
          <li v-for="t in list" :key="t.id">
            <RouterLink :to="`/dictionary/${t.id}`" :class="['t-' + t.tech, { on: t.id === id }]">
              <span class="dot tc" />
              <span class="tt mono">{{ t.term }}</span>
              <span class="ar">{{ t.ar }}</span>
              <Icon v-if="store.favorites.includes(t.id)" name="star" :size="12" class="fav" />
            </RouterLink>
          </li>
          <li v-if="!list.length" class="empty">لا نتائج. جرّب الاسم الإنجليزي أو كلمة أقصر.</li>
        </ul>
      </aside>

      <article v-if="term" class="d-term panel" :class="'t-' + term.tech">
        <RouterLink to="/dictionary" class="back only-narrow"><Icon name="chevronLeft" :size="16" style="transform: scaleX(-1)" /> القائمة</RouterLink>
        <div class="top">
          <span class="chip"><span class="dot tc" /> {{ TECHS[term.tech].label }} · {{ term.cat }}</span>
          <span class="spacer" />
          <button class="btn ghost sm icon" :aria-label="store.favorites.includes(term.id) ? 'إزالة من المفضلة' : 'إضافة للمفضلة'" :class="{ faved: store.favorites.includes(term.id) }" @click="toggleFavorite(term.id)"><Icon name="star" :size="16" /></button>
        </div>
        <h2 class="name mono">{{ term.term }}</h2>
        <div class="ar-name display">{{ term.ar }}</div>
        <div class="pron">
          <span class="muted small">النطق:</span>
          <span>{{ term.pron }}</span>
          <span class="mono muted small">/{{ term.say }}/</span>
          <button class="btn ghost sm" :disabled="!canSpeak" :title="canSpeak ? 'استمع' : 'لا يتوفر صوت إنجليزي في متصفحك'" @click="speak(term)"><Icon name="volume" :size="15" /> استمع</button>
          <span v-if="!canSpeak" class="muted small">(النطق الصوتي غير متاح في هذا المتصفح)</span>
        </div>
        <p class="meaning">{{ term.meaning }}</p>
        <p class="explain">{{ term.explain }}</p>
        <div class="eyebrow">طريقة الكتابة</div>
        <pre class="syntax mono" dir="ltr">{{ term.syntax }}</pre>
        <div class="eyebrow">مثال</div>
        <div class="example"><CodeEditor :model-value="term.example" :lang="exampleLang(term)" readonly :height="`${Math.min(term.example.split('\n').length, 14) * 22 + 22}px`" /></div>
        <div class="actions">
          <button class="btn primary sm" @click="tryIt(term)"><Icon name="play" :size="14" /> جرّبه</button>
          <button class="btn sm" :disabled="inReview(term)" @click="review(term)"><Icon name="cards" :size="14" /> {{ inReview(term) ? 'في المراجعة' : 'أضف للمراجعة' }}</button>
          <a :href="term.ref" target="_blank" rel="noopener" class="btn ghost sm"><Icon name="external" :size="14" /> التوثيق الرسمي</a>
        </div>
        <div v-if="term.related.length" class="related">
          <div class="eyebrow">مصطلحات مرتبطة</div>
          <div class="row">
            <RouterLink v-for="r in term.related" :key="r" :to="`/dictionary/${r}`" class="chip" :class="'t-' + termById[r].tech"><span class="dot tc" /> {{ termById[r].term }} — {{ termById[r].ar }}</RouterLink>
          </div>
        </div>
      </article>
      <div v-else class="d-empty only-wide">
        <Icon name="book" :size="30" />
        <p>اختر مصطلحًا من القائمة. نصيحة: أي مصطلح يظهر في «شرح الأكواد» له رابط مباشر هنا.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.d-grid { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 20px; align-items: start; }
.d-list { position: sticky; top: 16px; display: grid; gap: 10px; }
.search { position: relative; }
.search :deep(svg) { position: absolute; inset-inline-start: 12px; top: 12px; color: var(--muted); }
.search .input { padding-inline-start: 36px; }
.filters { display: flex; flex-wrap: wrap; gap: 6px; }
.items { list-style: none; margin: 0; padding: 0; max-height: calc(100vh - 290px); overflow: auto; border: 1px solid var(--line); border-radius: 14px; background: var(--bg-2); }
.items a { display: flex; align-items: center; gap: 10px; padding: 8px 12px; color: var(--text); text-decoration: none !important; border-bottom: 1px solid var(--line); }
.items a:hover { background: var(--bg-3); }
.items a.on { background: var(--accent-soft); }
.tt { font-size: 13px; direction: ltr; }
.ar { color: var(--muted); font-size: 13px; margin-inline-start: auto; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.fav { color: var(--accent); }
.empty { padding: 14px; color: var(--muted); }
.d-term { padding: 22px 26px; }
.top { display: flex; align-items: center; }
.faved { color: var(--accent); }
.name { font-size: clamp(1.8rem, 4vw, 2.6rem); margin: 10px 0 0; direction: ltr; text-align: right; color: var(--tc); font-weight: 600; }
.ar-name { font-size: 1.4rem; color: var(--text-2); margin-bottom: 10px; }
.pron { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 8px 12px; background: var(--bg-3); border-radius: 10px; width: fit-content; max-width: 100%; }
.meaning { font-size: 18px; font-weight: 500; margin: 18px 0 8px; }
.explain { color: var(--text-2); line-height: 1.95; margin: 0 0 18px; }
.syntax { background: var(--code-bg); border: 1px solid var(--line); border-radius: 10px; padding: 10px 14px; margin: 8px 0 16px; white-space: pre-wrap; text-align: left; color: var(--syn-fn); }
.example { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; margin-top: 8px; }
.actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 14px; }
.actions a { text-decoration: none !important; }
.related { margin-top: 22px; }
.related .row { margin-top: 8px; }
.related a { text-decoration: none !important; }
.d-empty { display: grid; justify-items: center; gap: 8px; color: var(--muted); padding: 60px 20px; text-align: center; border: 1px dashed var(--line-2); border-radius: 16px; }
.only-narrow { display: none; }
@media (max-width: 860px) {
  .d-grid { grid-template-columns: 1fr; }
  .d-grid.detail .d-list { display: none; }
  .only-narrow { display: inline-flex; align-items: center; gap: 4px; margin-bottom: 8px; }
  .only-wide { display: none; }
  .d-list { position: static; }
  .items { max-height: none; }
}
</style>
