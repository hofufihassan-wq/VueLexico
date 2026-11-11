import { describe, it, expect } from 'vitest'
import { instrument } from '../../src/engine/instrument.js'
import { execute } from '../../src/engine/runtime.js'
import { buildTimeline } from '../../src/engine/timeline.js'

async function tl(code) {
  const inst = instrument(code, { mode: 'trace' })
  const r = await execute(inst.code, inst.meta, { patchPromise: true })
  return { r, ...buildTimeline(r.events, inst.meta) }
}

describe('timeline', () => {
  it('does not leak runtime-internal promise reactions into the trace', async () => {
    const { r } = await tl('const a = { n: 1 }\nconst b = a\nb.n = 2')
    expect(r.events.filter((e) => e.type === 'micro-add' || e.type === 'micro-run')).toEqual([])
  })

  it('keeps global variables visible after the synchronous script ends', async () => {
    const { states } = await tl('const a = [1, 2]\nlet n = 5\nsetTimeout(() => { n++ }, 10)')
    const timerRun = states.find((s) => s.ev.type === 'timer-run')
    expect(timerRun.stack.some((f) => f.id === 0)).toBe(false)
    expect(timerRun.globals.names).toEqual(expect.arrayContaining(['a', 'n']))
    const last = states.at(-1)
    const g = last.globals
    expect(g.vars[g.names.indexOf('n')]).toEqual({ t: 'num', v: '6' })
  })

  it('tracks call frames, returns and narrates them', async () => {
    const { states } = await tl('function add(x, y) { return x + y }\nconst s = add(2, 3)')
    const call = states.find((s) => s.ev.type === 'call')
    expect(call.story).toContain('add')
    expect(call.stack.map((f) => f.name)).toEqual(['النطاق العام', 'add'])
    const ret = states.find((s) => s.ev.type === 'return')
    expect(ret.story).toContain('5')
  })

  it('reports variable changes between steps', async () => {
    const { states } = await tl('let x = 1\nx = x + 1\nx = x * 10')
    const changes = states.flatMap((s) => s.changed.map((c) => `${c.name}:${c.from}->${c.to}`))
    expect(changes).toEqual(['x:1->2', 'x:2->20'])
  })

  it('models the event loop queues', async () => {
    const { states } = await tl("setTimeout(() => console.log('t'), 0)\nPromise.resolve().then(() => console.log('p'))\nconsole.log('s')")
    const afterSync = states.find((s) => s.ev.type === 'script-end')
    expect(afterSync.timers.length).toBe(1)
    expect(afterSync.micro.length).toBe(1)
    const microRun = states.find((s) => s.ev.type === 'micro-run')
    expect(microRun.micro.length).toBe(0)
    expect(microRun.timers.length).toBe(1)
  })
})
