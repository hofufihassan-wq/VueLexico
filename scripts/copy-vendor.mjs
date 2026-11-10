// ينسخ نسخة Vue العامة إلى public/vendor ليستخدمها إطار المعاينة المعزول دون الاتصال بأي CDN
import { copyFileSync, mkdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)
const vueDir = dirname(require.resolve('vue/package.json'))
const out = resolve('public/vendor')
mkdirSync(out, { recursive: true })
copyFileSync(resolve(vueDir, 'dist/vue.global.prod.js'), resolve(out, 'vue.global.prod.js'))
console.log('vendor: vue.global.prod.js copied')
