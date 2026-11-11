// تمرير كود من صفحة إلى أخرى (مثلًا «جرّب في المحرر» من القاموس أو الدروس)
import { store } from '../store/index.js'

const uid = () => Math.random().toString(36).slice(2, 10)

export const TEMPLATES = {
  blank: { name: 'صفحة فارغة', mode: 'web', files: { html: '<h1>مرحبًا</h1>\n<p>ابدأ من هنا.</p>\n', css: 'body {\n  font-family: system-ui, sans-serif;\n  padding: 24px;\n}\n', js: 'console.log("جاهز!")\n' } },
  card: { name: 'بطاقة منتج', mode: 'web', files: {
    html: '<article class="card">\n  <h2>سماعات لاسلكية</h2>\n  <p class="price">249 ريال</p>\n  <button id="buy">أضف للسلة</button>\n</article>\n',
    css: 'body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #f1f5f9; }\n.card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 10px 30px rgb(0 0 0 / 8%); width: min(320px, 90vw); }\n.price { color: #0d9488; font-weight: 700; font-size: 1.4rem; }\nbutton { padding: 10px 16px; border: 0; border-radius: 10px; background: #0f172a; color: white; cursor: pointer; }\nbutton.added { background: #16a34a; }\n',
    js: 'const btn = document.querySelector("#buy")\nbtn.addEventListener("click", () => {\n  btn.classList.add("added")\n  btn.textContent = "أُضيفت ✓"\n  console.log("تمت الإضافة")\n})\n',
  } },
  vue: { name: 'مكوّن Vue', mode: 'vue', files: { vue: '<script setup>\nimport { ref, computed } from "vue"\n\nconst items = ref(["HTML", "CSS"])\nconst draft = ref("")\nconst count = computed(() => items.value.length)\n\nfunction add() {\n  if (!draft.value.trim()) return\n  items.value.push(draft.value.trim())\n  draft.value = ""\n}\n</script>\n\n<template>\n  <h2>ما أتعلمه ({{ count }})</h2>\n  <form @submit.prevent="add">\n    <input v-model="draft" placeholder="أضف موضوعًا">\n    <button>إضافة</button>\n  </form>\n  <ul>\n    <li v-for="it in items" :key="it">{{ it }}</li>\n  </ul>\n</template>\n\n<style scoped>\nh2 { color: #0d9488; }\nform { display: flex; gap: 8px; }\n</style>\n' } },
}

export function createDraft({ name, mode, files }) {
  const now = new Date().toISOString()
  const d = { id: uid(), name: name || 'مسودة جديدة', mode: mode || 'web', files: { ...files }, createdAt: now, updatedAt: now }
  store.drafts.unshift(d)
  return d
}

/** يفتح كودًا في مسودة جديدة ويعيد معرّفها للتوجيه */
export function draftFrom({ name, mode = 'web', files }) {
  return createDraft({ name, mode, files }).id
}
