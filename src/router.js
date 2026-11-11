import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/DashboardView.vue'), meta: { title: 'لوحتي' } },
  { path: '/learn', name: 'learn', component: () => import('./views/LearnView.vue'), meta: { title: 'المسار التعليمي' } },
  { path: '/learn/:id', name: 'lesson', component: () => import('./views/LessonView.vue'), meta: { title: 'درس' }, props: true },
  { path: '/review', name: 'review', component: () => import('./views/ReviewView.vue'), meta: { title: 'المراجعة' } },
  { path: '/editor/:draft?', name: 'editor', component: () => import('./views/EditorView.vue'), meta: { title: 'المحرر', wide: true }, props: true },
  { path: '/explain', name: 'explain', component: () => import('./views/ExplainView.vue'), meta: { title: 'شرح الأكواد', wide: true } },
  { path: '/css-lab', name: 'css-lab', component: () => import('./views/CssLabView.vue'), meta: { title: 'مختبر CSS', wide: true } },
  { path: '/js-lab', name: 'js-lab', component: () => import('./views/JsLabView.vue'), meta: { title: 'مختبر JavaScript', wide: true } },
  { path: '/visualizer', name: 'visualizer', component: () => import('./views/VisualizerView.vue'), meta: { title: 'محاكي التنفيذ', wide: true } },
  { path: '/dictionary', name: 'dictionary', component: () => import('./views/DictionaryView.vue'), meta: { title: 'القاموس' } },
  { path: '/dictionary/:id', name: 'term', component: () => import('./views/DictionaryView.vue'), meta: { title: 'القاموس' }, props: true },
  { path: '/practice', name: 'practice', component: () => import('./views/PracticeView.vue'), meta: { title: 'التدريب والمشاريع' } },
  { path: '/practice/:id', name: 'practice-item', component: () => import('./views/PracticeItemView.vue'), meta: { title: 'تحدٍّ', wide: true }, props: true },
  { path: '/settings', name: 'settings', component: () => import('./views/SettingsView.vue'), meta: { title: 'الإعدادات والنسخ الاحتياطي' } },
  { path: '/selftest', name: 'selftest', component: () => import('./views/SelfTestView.vue'), meta: { title: 'الفحص الذاتي' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue'), meta: { title: 'غير موجود' } },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 80 }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'سطر'} · سطر`
})
