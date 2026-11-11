import{N as e}from"./index-CDh9hu3B.js";var t=()=>Math.random().toString(36).slice(2,10),n={blank:{name:`صفحة فارغة`,mode:`web`,files:{html:`<h1>مرحبًا</h1>
<p>ابدأ من هنا.</p>
`,css:`body {
  font-family: system-ui, sans-serif;
  padding: 24px;
}
`,js:`console.log("جاهز!")
`}},card:{name:`بطاقة منتج`,mode:`web`,files:{html:`<article class="card">
  <h2>سماعات لاسلكية</h2>
  <p class="price">249 ريال</p>
  <button id="buy">أضف للسلة</button>
</article>
`,css:`body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #f1f5f9; }
.card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 10px 30px rgb(0 0 0 / 8%); width: min(320px, 90vw); }
.price { color: #0d9488; font-weight: 700; font-size: 1.4rem; }
button { padding: 10px 16px; border: 0; border-radius: 10px; background: #0f172a; color: white; cursor: pointer; }
button.added { background: #16a34a; }
`,js:`const btn = document.querySelector("#buy")
btn.addEventListener("click", () => {
  btn.classList.add("added")
  btn.textContent = "أُضيفت ✓"
  console.log("تمت الإضافة")
})
`}},vue:{name:`مكوّن Vue`,mode:`vue`,files:{vue:`<script setup>
import { ref, computed } from "vue"

const items = ref(["HTML", "CSS"])
const draft = ref("")
const count = computed(() => items.value.length)

function add() {
  if (!draft.value.trim()) return
  items.value.push(draft.value.trim())
  draft.value = ""
}
<\/script>

<template>
  <h2>ما أتعلمه ({{ count }})</h2>
  <form @submit.prevent="add">
    <input v-model="draft" placeholder="أضف موضوعًا">
    <button>إضافة</button>
  </form>
  <ul>
    <li v-for="it in items" :key="it">{{ it }}</li>
  </ul>
</template>

<style scoped>
h2 { color: #0d9488; }
form { display: flex; gap: 8px; }
</style>
`}}};function r({name:n,mode:r,files:i}){let a=new Date().toISOString(),o={id:t(),name:n||`مسودة جديدة`,mode:r||`web`,files:{...i},createdAt:a,updatedAt:a};return e.drafts.unshift(o),o}function i({name:e,mode:t=`web`,files:n}){return r({name:e,mode:t,files:n}).id}export{r as n,i as r,n as t};