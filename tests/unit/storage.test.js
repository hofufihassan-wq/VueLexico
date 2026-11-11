import { describe, it, expect } from 'vitest'
import { defaultState, sanitize, exportBackup, parseBackup, scheduleReview, isDue, LEITNER_DAYS } from '../../src/store/schema.js'

describe('storage schema', () => {
  it('round-trips a backup', () => {
    const s = defaultState()
    s.lessons['html-01'] = { status: 'done', visitedAt: new Date().toISOString(), completedAt: new Date().toISOString(), quiz: { answers: [1, 0], score: 2, total: 2, at: null }, exercise: { files: { html: '<p>x</p>' }, passed: true, attempts: 3, hints: 1 }, note: 'ملاحظة' }
    s.drafts.push({ id: 'd1', name: 'تجربة', mode: 'web', files: { html: '<h1>1</h1>', css: '', js: '' }, createdAt: s.createdAt, updatedAt: s.createdAt })
    const r = parseBackup(exportBackup(s))
    expect(r.ok).toBe(true)
    expect(r.state.lessons['html-01'].note).toBe('ملاحظة')
    expect(r.state.drafts[0].files.html).toBe('<h1>1</h1>')
  })
  it('rejects foreign or broken files', () => {
    expect(parseBackup('not json').ok).toBe(false)
    expect(parseBackup('{"a":1}').ok).toBe(false)
    expect(parseBackup(JSON.stringify({ app: 'satr', version: 99 })).ok).toBe(false)
  })
  it('strips unknown fields, bad types and prototype keys', () => {
    const evil = JSON.parse('{"app":"satr","version":1,"settings":{"theme":"neon","editorFontSize":999,"x":1},"lessons":{"__proto__":{"status":"done"},"ok":{"status":"weird","note":5}},"favorites":["a",{"b":1}],"extra":"drop"}')
    const s = sanitize(evil)
    expect(s.settings.theme).toBe('system')
    expect(s.settings.editorFontSize).toBe(24)
    expect(s.settings.x).toBeUndefined()
    expect(s.extra).toBeUndefined()
    expect(Object.keys(s.lessons)).toEqual(['ok'])
    expect(s.lessons.ok.status).toBe('started')
    expect(s.lessons.ok.note).toBe('')
    expect(s.favorites).toEqual(['a'])
    expect({}.status).toBeUndefined()
  })
  it('schedules Leitner reviews', () => {
    const now = new Date('2026-01-10T10:00:00')
    let c = scheduleReview(undefined, true, now)
    expect(c.box).toBe(1)
    expect(new Date(c.due).getDate()).toBe(10 + LEITNER_DAYS[1])
    c = scheduleReview(c, true, now)
    expect(c.box).toBe(2)
    c = scheduleReview(c, false, now)
    expect(c.box).toBe(0)
    expect(isDue(c, now)).toBe(true)
    expect(c.seen).toBe(3)
    expect(c.ok).toBe(2)
  })
})
