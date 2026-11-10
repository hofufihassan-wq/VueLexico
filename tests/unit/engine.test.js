import { describe, it, expect } from 'vitest'
import { instrument } from '../../src/engine/instrument.js'
import { execute, toText } from '../../src/engine/runtime.js'
import { runJsTests, deepEqual } from '../../src/engine/jsTests.js'

async function trace(code, opts = {}) {
  const inst = instrument(code, { mode: 'trace' })
  expect(inst.ok).toBe(true)
  const res = await execute(inst.code, inst.meta, { patchPromise: true, ...opts })
  return { ...res, meta: inst.meta }
}
const steps = (r) => r.events.filter((e) => e.type === 'step')
const varOf = (r, step, name) => {
  const names = r.meta.steps[step.id].names
  const i = names.indexOf(name)
  return i === -1 ? undefined : step.vars[i]
}

describe('instrument', () => {
  it('reports syntax errors with location', () => {
    const r = instrument('let x = ;\n')
    expect(r.ok).toBe(false)
    expect(r.error.line).toBe(1)
  })
  it('keeps semantics of a program', async () => {
    const r = await trace('let s = 0\nfor (let i = 1; i <= 4; i++) { s += i }\nconsole.log(s)')
    expect(r.status).toBe('ok')
    expect(r.logs.map((l) => l.text)).toEqual(['10'])
  })
})

describe('trace mode', () => {
  it('records lines and variable values per step', async () => {
    const r = await trace('let a = 1\nlet b = a + 1\na = b * 10')
    const st = steps(r)
    expect(st.map((s) => s.line)).toEqual([1, 2, 3])
    // قبل تنفيذ السطر الثاني: a = 1 و b في منطقة TDZ
    expect(varOf(r, st[1], 'a')).toEqual({ t: 'num', v: '1' })
    expect(varOf(r, st[1], 'b')).toEqual({ t: 'tdz' })
  })

  it('records call / return frames with arguments and values', async () => {
    const r = await trace('function add(x, y) {\n  return x + y\n}\nconst z = add(2, 3)\nconsole.log(z)')
    const call = r.events.find((e) => e.type === 'call')
    const ret = r.events.find((e) => e.type === 'return')
    expect(call.name).toBe('add')
    expect(call.args).toEqual([{ t: 'num', v: '2' }, { t: 'num', v: '3' }])
    expect(call.line).toBe(4)
    expect(ret.value).toEqual({ t: 'num', v: '5' })
    expect(ret.threw).toBe(false)
    expect(r.logs[0].text).toBe('5')
  })

  it('names arrow functions and methods from context', async () => {
    const r = await trace('const sq = (n) => n * n\nconst o = { twice(n) { return n * 2 } }\nsq(3); o.twice(4)')
    const names = r.events.filter((e) => e.type === 'call').map((e) => e.name)
    expect(names).toEqual(['sq', 'twice'])
  })

  it('tracks recursion depth', async () => {
    const r = await trace('function f(n) { if (n === 0) return 0; return n + f(n - 1) }\nconsole.log(f(3))')
    const maxDepth = Math.max(...steps(r).map((s) => s.stack.length))
    expect(maxDepth).toBe(5) // العام + 4 إطارات للدالة f
    expect(r.logs[0].text).toBe('6')
  })

  it('serializes objects into a heap with shared references', async () => {
    const r = await trace('const a = [1, 2]\nconst b = a\nb.push(3)\nconsole.log(a)')
    const last = steps(r).at(-1)
    const va = varOf(r, last, 'a')
    const vb = varOf(r, last, 'b')
    expect(va.t).toBe('ref')
    expect(va.id).toBe(vb.id)
    expect(last.heap[va.id].entries.length).toBe(3)
    expect(r.logs[0].text).toBe('[1, 2, 3]')
  })

  it('stops infinite loops with a limit error', async () => {
    const r = await trace('let i = 0\nwhile (true) { i++ }', { limits: { steps: 5000 } })
    expect(r.status).toBe('limit')
    expect(r.error.name).toBe('LimitError')
  })

  it('stops empty-body infinite loops too', async () => {
    const r = await trace('for (;;);', { limits: { steps: 1000 } })
    expect(r.status).toBe('limit')
  })

  it('orders sync, microtasks and timers like the real event loop', async () => {
    const code = [
      "console.log('1 sync')",
      "setTimeout(() => console.log('4 timeout'), 0)",
      "Promise.resolve().then(() => console.log('3 micro'))",
      "console.log('2 sync')",
    ].join('\n')
    const r = await trace(code)
    expect(r.logs.map((l) => l.text)).toEqual(['1 sync', '2 sync', '3 micro', '4 timeout'])
    const types = r.events.map((e) => e.type)
    expect(types).toContain('timer-add')
    expect(types).toContain('micro-add')
    expect(types).toContain('micro-run')
    expect(types.indexOf('micro-run')).toBeLessThan(types.indexOf('timer-run'))
  })

  it('runs timers by due time with a virtual clock', async () => {
    const r = await trace("setTimeout(() => console.log('b'), 200)\nsetTimeout(() => console.log('a'), 100)")
    expect(r.logs.map((l) => l.text)).toEqual(['a', 'b'])
    const runs = r.events.filter((e) => e.type === 'timer-run')
    expect(runs.map((e) => e.clock)).toEqual([100, 200])
  })

  it('suspends and resumes async frames around await', async () => {
    const code = [
      'async function load() {',
      "  console.log('start')",
      '  const v = await Promise.resolve(7)',
      "  console.log('got', v)",
      '  return v',
      '}',
      'load()',
      "console.log('after call')",
    ].join('\n')
    const r = await trace(code)
    expect(r.logs.map((l) => l.text)).toEqual(['start', 'after call', 'got 7'])
    const kinds = r.events.filter((e) => ['call', 'suspend', 'resume', 'return'].includes(e.type)).map((e) => e.type)
    expect(kinds).toEqual(['call', 'suspend', 'resume', 'return'])
  })

  it('supports top-level await', async () => {
    const r = await trace("const v = await new Promise(r => setTimeout(() => r(5), 50))\nconsole.log(v)")
    expect(r.logs.map((l) => l.text)).toEqual(['5'])
    expect(r.status).toBe('ok')
  })

  it('reports runtime errors with the line', async () => {
    const r = await trace('let a = 1\nlet b = a.foo.bar\nconsole.log(b)')
    expect(r.status).toBe('error')
    expect(r.error.name).toBe('TypeError')
    expect(r.errorLine).toBe(2)
  })

  it('marks frames that exited by throwing', async () => {
    const r = await trace("function bad() { throw new Error('x') }\ntry { bad() } catch (e) { console.log('caught') }")
    const ret = r.events.find((e) => e.type === 'return')
    expect(ret.threw).toBe(true)
    expect(r.logs[0].text).toBe('caught')
  })

  it('handles classes, getters, destructuring, generators', async () => {
    const code = [
      'class Animal { constructor(name) { this.name = name } speak() { return this.name + "!" } }',
      'class Dog extends Animal { constructor(n) { super(n); this.kind = "dog" } }',
      'const { name, kind } = new Dog("Rex")',
      'function* gen() { yield 1; yield 2 }',
      'console.log(name, kind, [...gen()].join(","), new Dog("A").speak())',
    ].join('\n')
    const r = await trace(code)
    expect(r.status).toBe('ok')
    expect(r.logs[0].text).toBe('Rex dog 1,2 A!')
  })

  it('formats logs like the browser console', async () => {
    const r = await trace('console.log("a", 1, [1, "x"], { k: true, n: null }, undefined)')
    expect(r.logs[0].text).toBe('a 1 [1, "x"] {k: true, n: null} undefined')
  })
})

describe('lines mode + js tests', () => {
  it('grades functions functionally, not textually', async () => {
    const spec = { exports: ['sum'], cases: [{ call: 'sum', args: [2, 3], expect: 5 }, { call: 'sum', args: [-1, 1], expect: 0 }] }
    const a = await runJsTests('function sum(a, b) { return a + b }', spec)
    const b = await runJsTests('const sum = (x, y) => [x, y].reduce((p, c) => p + c, 0)', spec)
    const c = await runJsTests('function sum(a, b) { return 5 }', spec)
    expect(a.ok).toBe(true)
    expect(b.ok).toBe(true)
    expect(c.ok).toBe(false)
    expect(c.passed).toBe(1)
  })
  it('reports missing functions and syntax errors', async () => {
    const spec = { exports: ['sum'], cases: [{ call: 'sum', args: [1, 1], expect: 2 }] }
    const r = await runJsTests('function add(a, b) { return a + b }', spec)
    expect(r.ok).toBe(false)
    expect(r.results[0].message).toMatch('sum')
    const s = await runJsTests('function sum(a, b) { return a + }', spec)
    expect(s.syntax).toBeTruthy()
  })
  it('catches infinite loops inside graded functions', async () => {
    const spec = { exports: ['f'], cases: [{ call: 'f', args: [], expect: 1 }] }
    const r = await runJsTests('function f() { while (true) {} }', spec)
    expect(r.ok).toBe(false)
    expect(r.results[0].message).toMatch('LimitError')
  })
  it('checks console output', async () => {
    const r = await runJsTests('for (let i = 1; i <= 3; i++) console.log(i)', { logs: ['1', '2', '3'] })
    expect(r.ok).toBe(true)
  })
  it('deepEqual', () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true)
    expect(deepEqual([1, 2], [2, 1])).toBe(false)
    expect(deepEqual(NaN, NaN)).toBe(true)
    expect(deepEqual(0.1 + 0.2, 0.3)).toBe(true)
  })
})

describe('toText', () => {
  it('renders nested values', () => {
    expect(toText({ t: 'str', v: 'x' }, {}, 0, false)).toBe('"x"')
  })
})
