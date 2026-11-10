import { describe, it, expect } from 'vitest'
import { compileSfc, rewriteVueImports } from '../../src/engine/vueCompile.js'
import { buildWebDoc, buildVueDoc } from '../../src/engine/sandbox.js'
import { explainError } from '../../src/engine/errors.js'

describe('vue compile', () => {
  it('compiles <script setup> with scoped style', async () => {
    const r = await compileSfc(`<script setup>
import { ref, computed } from 'vue'
const count = ref(0)
const double = computed(() => count.value * 2)
</script>
<template><button @click="count++">{{ count }} / {{ double }}</button></template>
<style scoped>button{color:red}</style>`)
    expect(r.ok).toBe(true)
    expect(r.js).toContain('const __sfc__')
    expect(r.js).toContain('= Vue')
    expect(r.js).not.toMatch(/^\s*import /m)
    expect(r.css).toMatch(/button\[data-v-\w+\]/)
    expect(r.bindings.count).toBe('setup-ref')
  })
  it('compiles options API components', async () => {
    const r = await compileSfc(`<script>\nexport default { data() { return { n: 1 } } }\n</script>\n<template><p>{{ n }}</p></template>`)
    expect(r.ok).toBe(true)
    expect(r.js).toContain('__sfc__.render = render')
  })
  it('reports template errors', async () => {
    const r = await compileSfc(`<template><p>{{ n </p></template>`)
    expect(r.ok).toBe(false)
    expect(r.errors.length).toBeGreaterThan(0)
  })
  it('rejects non-vue imports', () => {
    const r = rewriteVueImports("import axios from 'axios'\nimport { ref as r } from 'vue'")
    expect(r.unsupported).toEqual(['axios'])
    expect(r.code).toContain('const { ref: r } = Vue;')
  })
})

describe('sandbox documents', () => {
  it('wraps fragments with CSP and bridge', () => {
    const { doc } = buildWebDoc({ html: '<h1>hi</h1>', css: 'h1{color:red}', js: 'console.log(1)' }, { token: 't' })
    expect(doc).toContain('Content-Security-Policy')
    expect(doc).toContain("connect-src 'none'")
    expect(doc).toContain('<h1>hi</h1>')
    expect(doc).toContain('__t.l(1, "script.js")')
  })
  it('injects into full documents and guards inline scripts with correct lines', () => {
    const html = '<!doctype html>\n<html>\n<head><title>x</title></head>\n<body>\n<script>\nwhile(true){}\n</script>\n</body>\n</html>'
    const { doc } = buildWebDoc({ html }, { token: 't' })
    expect(doc.indexOf('Content-Security-Policy')).toBeLessThan(doc.indexOf('<title>'))
    expect(doc).toContain('__t.g()')
    expect(doc).toContain('__t.l(6, "index.html")')
  })
  it('reports syntax errors without breaking the page', () => {
    const { doc, syntaxErrors } = buildWebDoc({ html: '<p>ok</p>', js: 'let = ;' }, { token: 't' })
    expect(syntaxErrors[0].file).toBe('script.js')
    expect(doc).toContain('<p>ok</p>')
  })
  it('builds a vue doc including the vendor runtime', () => {
    const { doc } = buildVueDoc({ js: 'const __sfc__ = {}', css: '' }, { token: 't' })
    expect(doc).toContain('/vendor/vue.global.prod.js')
    expect(doc).toContain('Vue.createApp(__sfc__)')
  })
})

describe('error explanations', () => {
  it('explains common errors in Arabic', () => {
    expect(explainError({ name: 'ReferenceError', message: 'conut is not defined' }).title).toContain('conut')
    expect(explainError({ name: 'TypeError', message: "Cannot read properties of null (reading 'textContent')" }).hint).toContain('querySelector')
    expect(explainError({ name: 'TypeError', message: 'Assignment to constant variable.' }).title).toContain('ثابت')
    expect(explainError({ name: 'ReferenceError', message: 'document is not defined' }).hint).toContain('المحرر')
    const unknown = explainError({ name: 'Error', message: 'something odd' })
    expect(unknown.explain).toContain('دون تخمين')
  })
})
