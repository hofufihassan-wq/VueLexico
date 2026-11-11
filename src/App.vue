<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import Icon from './components/Icon.vue'
import CommandPalette from './components/CommandPalette.vue'
import BrandMark from './components/BrandMark.vue'
import { store, saveStatus, dueCards } from './store/index.js'
import { initTheme, toggleTheme, resolvedTheme, toasts, openPalette, relTime } from './composables/ui.js'

initTheme()
const route = useRoute()
const drawer = ref(false)
watch(() => route.fullPath, () => { drawer.value = false })

const nav = [
  { group: 'التعلّم', items: [
    { to: '/', icon: 'home', label: 'لوحتي', exact: true },
    { to: '/learn', icon: 'path', label: 'المسار التعليمي' },
    { to: '/review', icon: 'cards', label: 'المراجعة', badge: 'review' },
    { to: '/practice', icon: 'target', label: 'التدريب والمشاريع' },
  ] },
  { group: 'الأدوات', items: [
    { to: '/editor', icon: 'code', label: 'المحرر' },
    { to: '/explain', icon: 'lens', label: 'شرح الأكواد' },
    { to: '/css-lab', icon: 'palette', label: 'مختبر CSS' },
    { to: '/js-lab', icon: 'terminal', label: 'مختبر JavaScript' },
    { to: '/visualizer', icon: 'flow', label: 'محاكي التنفيذ' },
  ] },
  { group: 'المراجع', items: [
    { to: '/dictionary', icon: 'book', label: 'القاموس' },
  ] },
]
const mobileTabs = [
  { to: '/', icon: 'home', label: 'لوحتي', exact: true },
  { to: '/learn', icon: 'path', label: 'المسار' },
  { to: '/editor', icon: 'code', label: 'المحرر' },
  { to: '/dictionary', icon: 'book', label: 'القاموس' },
]

const dueCount = computed(() => dueCards().length)
const isActive = (item) => (item.exact ? route.path === item.to : route.path.startsWith(item.to))

// إعادة رسم نص حالة الحفظ كل 30 ثانية
const tick = ref(0)
let iv
onMounted(() => { iv = setInterval(() => tick.value++, 30000) })
onBeforeUnmount(() => clearInterval(iv))
const saveText = computed(() => {
  void tick.value
  if (!saveStatus.available) return 'الحفظ المحلي غير متاح'
  if (saveStatus.state === 'error') return 'تعذّر الحفظ'
  if (saveStatus.state === 'pending') return 'جارٍ الحفظ…'
  if (saveStatus.state === 'synced') return 'تمت المزامنة من تبويب آخر'
  if (saveStatus.at) return `حُفظ ${relTime(saveStatus.at)}`
  return 'الحفظ التلقائي مفعّل'
})
const saveClass = computed(() => (saveStatus.state === 'error' || !saveStatus.available ? 'error' : saveStatus.state === 'pending' ? 'pending' : ''))

function onKey(e) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openPalette() }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <a href="#main" class="skip">تخطَّ إلى المحتوى</a>
  <div class="shell" :class="{ wide: route.meta.wide }">
    <aside class="side" :class="{ open: drawer }" aria-label="التنقل الرئيسي">
      <div class="brand-row">
        <RouterLink to="/" class="brand" aria-label="سطر — الرئيسية">
          <BrandMark />
          <span class="brand-name">سطر</span>
        </RouterLink>
        <button class="btn ghost icon only-mobile" aria-label="إغلاق القائمة" @click="drawer = false"><Icon name="close" /></button>
      </div>
      <button class="search-trigger" @click="openPalette">
        <Icon name="search" :size="16" />
        <span>ابحث عن درس أو مصطلح…</span>
        <kbd class="mono">Ctrl K</kbd>
      </button>
      <nav class="nav">
        <div v-for="g in nav" :key="g.group" class="nav-group">
          <div class="nav-label">{{ g.group }}</div>
          <RouterLink v-for="it in g.items" :key="it.to" :to="it.to" class="nav-item" :class="{ active: isActive(it) }" :aria-current="isActive(it) ? 'page' : undefined">
            <Icon :name="it.icon" />
            <span>{{ it.label }}</span>
            <span v-if="it.badge === 'review' && dueCount" class="badge">{{ dueCount }}</span>
          </RouterLink>
        </div>
      </nav>
      <div class="side-foot">
        <div class="status" :class="saveClass" :title="saveStatus.error || 'تُحفظ كل بياناتك في هذا المتصفح تلقائيًا'">
          <span class="dot" /> {{ saveText }}
        </div>
        <div class="row">
          <RouterLink to="/settings" class="btn ghost sm"><Icon name="gear" :size="16" /> الإعدادات</RouterLink>
          <span class="spacer" />
          <button class="btn ghost sm icon" :aria-label="resolvedTheme === 'dark' ? 'الوضع الفاتح' : 'الوضع الداكن'" @click="toggleTheme">
            <Icon :name="resolvedTheme === 'dark' ? 'sun' : 'moon'" :size="16" />
          </button>
        </div>
      </div>
    </aside>
    <div v-if="drawer" class="scrim" @click="drawer = false" />

    <div class="main-col">
      <header class="topbar only-mobile">
        <button class="btn ghost icon" aria-label="فتح القائمة" @click="drawer = true"><Icon name="menu" /></button>
        <RouterLink to="/" class="brand"><BrandMark :size="26" /><span class="brand-name">سطر</span></RouterLink>
        <span class="spacer" />
        <button class="btn ghost icon" aria-label="بحث" @click="openPalette"><Icon name="search" /></button>
        <button class="btn ghost icon" aria-label="تبديل الثيم" @click="toggleTheme"><Icon :name="resolvedTheme === 'dark' ? 'sun' : 'moon'" /></button>
      </header>
      <div v-if="saveStatus.corrupted" class="banner bad">تعذّرت قراءة بياناتك المحفوظة (ربما تالفة)، فبدأنا بحالة جديدة. إن كانت لديك نسخة احتياطية فاستوردها من الإعدادات.</div>
      <div v-if="!saveStatus.available" class="banner warn">المتصفح يمنع التخزين المحلي (ربما وضع التصفح الخاص)، لذلك لن يُحفظ تقدّمك بعد إغلاق الصفحة. يمكنك تصدير نسخة احتياطية يدويًا من الإعدادات.</div>
      <main id="main" tabindex="-1">
        <RouterView v-slot="{ Component, route: r }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="r.name === 'lesson' || r.name === 'practice-item' || r.name === 'term' ? r.fullPath : r.name" />
          </Transition>
        </RouterView>
      </main>
    </div>

    <nav class="tabbar only-mobile" aria-label="تنقل سريع">
      <RouterLink v-for="t in mobileTabs" :key="t.to" :to="t.to" :class="{ active: isActive(t) }">
        <Icon :name="t.icon" :size="20" /><span>{{ t.label }}</span>
      </RouterLink>
      <button @click="drawer = true"><Icon name="dots" :size="20" /><span>المزيد</span></button>
    </nav>
  </div>

  <CommandPalette />

  <div class="toasts" aria-live="polite">
    <TransitionGroup name="fade">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="t.kind">{{ t.text }}</div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.skip { position: absolute; inset-inline-start: 12px; top: -60px; z-index: 100; background: var(--accent); color: var(--accent-ink); padding: 8px 12px; border-radius: 8px; }
.skip:focus { top: 12px; }
.shell { min-height: 100vh; display: flex; }
.side {
  position: sticky;
  top: 0;
  height: 100vh;
  width: var(--nav-w);
  flex: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 14px 14px;
  border-inline-end: 1px solid var(--line);
  background: linear-gradient(180deg, var(--bg-2), var(--bg));
  overflow-y: auto;
  z-index: 40;
}
.brand-row { display: flex; align-items: center; padding: 0 6px; }
.brand { display: flex; align-items: center; gap: 10px; color: var(--text); text-decoration: none !important; }
.brand-name { font-family: var(--font-display); font-size: 1.55rem; font-weight: 600; letter-spacing: .5px; }
.search-trigger {
  display: flex; align-items: center; gap: 8px;
  height: 38px; padding: 0 10px;
  border: 1px solid var(--line-2); border-radius: 10px;
  background: var(--bg); color: var(--muted); font-size: 13px; cursor: pointer;
  transition: border-color var(--t);
}
.search-trigger:hover { border-color: var(--accent); color: var(--text-2); }
.search-trigger span { flex: 1; text-align: start; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.nav { display: grid; gap: 14px; }
.nav-label { font-size: 11.5px; color: var(--muted); padding: 0 10px 4px; letter-spacing: .03em; }
.nav-item {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 7px 10px; margin-bottom: 2px;
  border-radius: 10px; color: var(--text-2); font-size: 14.5px;
  text-decoration: none !important;
  transition: background var(--t), color var(--t);
}
.nav-item:hover { background: var(--bg-3); color: var(--text); }
.nav-item.active { background: var(--accent-soft); color: var(--text); }
.nav-item.active::before {
  content: ''; position: absolute; inset-inline-start: -14px; top: 8px; bottom: 8px; width: 3px;
  border-radius: 0 3px 3px 0; background: var(--accent);
}
.nav-item.active :deep(svg) { color: var(--accent); }
.badge { margin-inline-start: auto; background: var(--accent); color: var(--accent-ink); font-size: 11px; font-weight: 700; min-width: 20px; height: 20px; border-radius: 10px; display: grid; place-items: center; padding: 0 6px; }
.side-foot { margin-top: auto; display: grid; gap: 8px; padding-top: 12px; border-top: 1px solid var(--line); }
.main-col { flex: 1; min-width: 0; display: flex; flex-direction: column; }
main { flex: 1; outline: none; }
.banner { padding: 10px 18px; font-size: 13.5px; border-bottom: 1px solid var(--line); }
.banner.bad { background: var(--bad-soft); color: var(--bad); }
.banner.warn { background: var(--accent-soft); color: var(--warn); }
.only-mobile { display: none !important; }
.scrim { position: fixed; inset: 0; background: rgb(0 0 0 / 45%); z-index: 39; backdrop-filter: blur(2px); }
.topbar { position: sticky; top: 0; z-index: 30; height: 56px; align-items: center; gap: 4px; padding: 0 8px; background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.tabbar { position: fixed; inset-inline: 0; bottom: 0; z-index: 30; height: 62px; padding-bottom: env(safe-area-inset-bottom); background: color-mix(in srgb, var(--bg-2) 92%, transparent); backdrop-filter: blur(10px); border-top: 1px solid var(--line); justify-content: space-around; }
.tabbar a, .tabbar button { flex: 1; display: grid; justify-items: center; gap: 2px; padding-top: 8px; font-size: 11px; color: var(--muted); background: none; border: 0; text-decoration: none !important; cursor: pointer; }
.tabbar .active { color: var(--accent); }
.toasts { position: fixed; z-index: 90; bottom: 20px; inset-inline-end: 20px; display: grid; gap: 8px; max-width: min(380px, calc(100vw - 32px)); }
.toast { background: var(--bg-3); border: 1px solid var(--line-2); padding: 10px 14px; border-radius: 12px; box-shadow: var(--glow); font-size: 14px; }
.toast.ok { border-color: color-mix(in srgb, var(--ok) 45%, transparent); }
.toast.bad { border-color: color-mix(in srgb, var(--bad) 45%, transparent); }

@media (max-width: 980px) {
  .only-mobile { display: flex !important; }
  .side { position: fixed; inset-block: 0; inset-inline-start: 0; transform: translateX(110%); transition: transform 240ms var(--ease); box-shadow: var(--glow); }
  .side.open { transform: none; }
  main { padding-bottom: 70px; }
  .toasts { bottom: 76px; }
}
</style>
