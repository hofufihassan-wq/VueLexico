import { describe, it, expect } from 'vitest'
import { explainJs } from '../../src/explain/js.js'
import { explainCss, specificity } from '../../src/explain/css.js'
import { explainHtml } from '../../src/explain/html.js'
import { explainVue, freeIdentifiers } from '../../src/explain/vue.js'
import * as csstree from 'css-tree/dist/csstree.esm'

const at = (r, line, kind) => r.items.filter((i) => i.line === line && (!kind || i.kind === kind))

describe('JS explainer', () => {
  const code = [
    'const items = [3, 1, 2]', // 1
    'let total = 0', // 2
    'function add(n) {', // 3
    '  total += n', // 4
    '  return total', // 5
    '}', // 6
    'items.forEach((x) => add(x))', // 7
    'console.log(totl)', // 8
    'items = []', // 9
  ].join('\n')
  const r = explainJs(code)

  it('resolves symbols to their declarations with scope', () => {
    const total = r.symbols.find((s) => s.name === 'total')
    expect(total.line).toBe(2)
    expect(total.writes).toContain(4)
    expect(total.refs.map((x) => x.line)).toEqual(expect.arrayContaining([4, 5]))
    const n = r.symbols.find((s) => s.name === 'n')
    expect(n.kind).toBe('param')
  })
  it('links calls to the function definition', () => {
    const call = at(r, 7, 'call').find((i) => i.title.includes('add'))
    expect(call.rel[0].line).toBe(3)
  })
  it('knows array methods when the type is certain', () => {
    const fe = at(r, 7, 'call').find((i) => i.title.includes('forEach'))
    expect(fe.text).not.toContain('بافتراض')
    expect(fe.term).toBe('js-foreach')
  })
  it('hedges when the type is unknown', () => {
    const r2 = explainJs('function f(list) { return list.map((v) => v * 2) }')
    const m = r2.items.find((i) => i.kind === 'call')
    expect(m.text).toContain('بافتراض')
  })
  it('flags undefined names and const reassignment', () => {
    expect(at(r, 8, 'identifier').find((i) => i.title === 'totl').warn).toBe(true)
    expect(at(r, 9, 'expression')[0].text).toContain('TypeError')
  })
  it('honors hoisting and block scope', () => {
    const r3 = explainJs('f()\nfunction f() {}\n{ let a = 1 }\nconsole.log(a)')
    expect(r3.items.find((i) => i.line === 1 && i.kind === 'call').rel[0].line).toBe(2)
    expect(at(r3, 4, 'identifier').find((i) => i.title === 'a').warn).toBe(true)
  })
  it('returns a friendly syntax error', () => {
    const e = explainJs('let x = (1 + ;')
    expect(e.error.line).toBe(1)
    expect(e.error.message).toBeTruthy()
  })
})

describe('CSS explainer', () => {
  it('computes specificity correctly', () => {
    const spec = (s) => specificity(csstree.parse(s, { context: 'selector' }))
    expect(spec('#nav a')).toEqual([1, 0, 1])
    expect(spec('.menu > li:hover')).toEqual([0, 2, 1])
    expect(spec(':where(.a) p')).toEqual([0, 0, 1])
    expect(spec(':is(#a, .b) p')).toEqual([1, 0, 1])
    expect(spec('p::before')).toEqual([0, 0, 2])
  })
  it('validates properties and values', () => {
    const r = explainCss('.a { colr: red; display: flexx; color: teal; }')
    const decl = r.items.filter((i) => i.kind === 'declaration')
    expect(decl[0].warn).toBe(true)
    expect(decl[0].text).toContain('ليست خاصية')
    expect(decl[1].text).toContain('غير صالحة')
    expect(decl[2].warn).toBeFalsy()
  })
  it('describes selectors right-to-left', () => {
    const r = explainCss('nav > a.active { color: red }')
    const sel = r.items.find((i) => i.kind === 'selector')
    expect(sel.text).toMatch(/<a>.*active.*ابن مباشر.*<nav>/)
  })
  it('tracks custom properties and keyframes', () => {
    const r = explainCss(':root { --brand: teal }\n.b { color: var(--brand); animation: spin 1s }\n@keyframes spin { to { transform: rotate(1turn) } }')
    const v = r.symbols.find((s) => s.name === '--brand')
    expect(v.refs[0].line).toBe(2)
    const k = r.symbols.find((s) => s.name === 'spin')
    expect(k.defs).toEqual([3])
  })
  it('detects same-selector conflicts', () => {
    const r = explainCss('p { color: red }\np { color: blue }')
    expect(r.items.some((i) => i.title === 'تعارض')).toBe(true)
  })
})

describe('HTML explainer', () => {
  it('explains elements and attributes with locations', () => {
    const r = explainHtml('<ul class="x">\n  <li>أ</li>\n</ul>')
    expect(r.items.find((i) => i.kind === 'element' && i.title === '<li>').line).toBe(2)
    expect(r.items.find((i) => i.kind === 'attribute').term).toBe('html-class')
  })
  it('finds accessibility issues and broken relations', () => {
    const r = explainHtml('<img src="a.png">\n<label for="nm">الاسم</label>\n<input id="name">\n<a href="#missing">x</a>')
    const titles = r.items.filter((i) => i.warn).map((i) => i.title)
    expect(titles).toContain('صورة بلا alt')
    expect(titles).toContain('ربط مكسور')
    expect(titles).toContain('حقل بلا تسمية')
    expect(titles).toContain('رابط داخلي مكسور')
  })
  it('links label[for] to the input id', () => {
    const r = explainHtml('<label for="e">البريد</label>\n<input id="e" type="email">')
    const rel = r.items.find((i) => i.kind === 'relation')
    expect(rel.rel[0].line).toBe(2)
    expect(r.items.some((i) => i.title === 'حقل بلا تسمية')).toBe(false)
  })
  it('reports real parser errors and unknown tags', () => {
    const r = explainHtml('<div>\n<p>نص</span>\n</div>\n<sectoin>x</sectoin>')
    expect(r.items.some((i) => i.kind === 'error' && i.text.includes('end-tag-without-matching-open-element'))).toBe(true)
    expect(r.items.find((i) => i.title === '<sectoin>').warn).toBe(true)
  })
  it('delegates inline style and script with correct line numbers', () => {
    const r = explainHtml('<style>\nh1 { color: red }\n</style>\n<script>\nconst a = 1\n</script>')
    expect(r.items.find((i) => i.kind === 'selector').line).toBe(2)
    expect(r.items.find((i) => i.kind === 'statement' && i.title.includes('ثابت')).line).toBe(5)
  })
})

describe('Vue explainer', () => {
  const sfc = `<script setup>
import { ref, computed } from 'vue'
const count = ref(0)
const double = computed(() => count.value * 2)
const label = 'x'
</script>

<template>
  <button @click="count++">{{ count }}</button>
  <p>{{ double }} {{ missing }}</p>
  <li v-for="(item, i) in [1,2]">{{ item + i }}</li>
  <input v-model="label">
  <p>{{ count.value }}</p>
</template>`
  it('links template usages to script bindings', async () => {
    const r = await explainVue(sfc)
    const count = r.symbols.find((s) => s.name === 'count')
    expect(count.binding).toBe('setup-ref')
    expect(count.line).toBe(3)
    expect(count.templateRefs).toEqual(expect.arrayContaining([9, 13]))
  })
  it('warns about real mistakes', async () => {
    const r = await explainVue(sfc)
    const warns = r.items.filter((i) => i.warn)
    expect(warns.some((w) => w.title === 'missing')).toBe(true)
    expect(warns.some((w) => w.title === 'v-for' && w.text.includes(':key'))).toBe(true)
    expect(warns.some((w) => w.title === 'v-model على ثابت')).toBe(true)
    expect(warns.some((w) => w.title === 'count' && w.line === 13)).toBe(true)
    // متغيرات v-for ليست «غير معرّفة»
    expect(warns.some((w) => w.title === 'item')).toBe(false)
  })
  it('freeIdentifiers handles statements and arrows', () => {
    expect(freeIdentifiers('a.b + c').map((x) => x.name)).toEqual(['a', 'c'])
    expect(freeIdentifiers('x => x + y').map((x) => x.name)).toEqual(['y'])
    expect(freeIdentifiers('a++; b()').map((x) => x.name)).toEqual(['a', 'b'])
    const ids = freeIdentifiers('count + 1')
    expect('count + 1'.slice(ids[0].start, ids[0].end)).toBe('count')
  })
})
