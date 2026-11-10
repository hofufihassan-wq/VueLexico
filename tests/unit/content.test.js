// سلامة المحتوى: كل حل مرجعي لتمارين JavaScript يجتاز المصحّح الحقيقي، وكل كود بداية يفشل،
// وكل فحوص DOM قابلة للتحليل، والاختبارات والمراجع سليمة. (فحوص DOM/Vue تُشغَّل فعليًا في اختبارات E2E.)
import { describe, it, expect } from 'vitest'
import { allLessons } from '../../src/content/lessons/index.js'
import { challenges, projects } from '../../src/content/practice.js'
import { terms, termById } from '../../src/content/dictionary/index.js'
import { runJsTests } from '../../src/engine/jsTests.js'
import { parseJs } from '../../src/engine/instrument.js'

const OFFICIAL = /^https:\/\/(developer\.mozilla\.org|vuejs\.org|html\.spec\.whatwg\.org|www\.w3\.org)\//

describe('lessons structure', () => {
  it('has unique ids and required fields', () => {
    const ids = new Set()
    for (const l of allLessons) {
      expect(ids.has(l.id), l.id).toBe(false)
      ids.add(l.id)
      expect(l.title && l.summary && l.blocks.length > 3, l.id).toBeTruthy()
      expect(l.objectives.length, l.id).toBeGreaterThan(0)
      expect(l.quiz.length, l.id).toBeGreaterThanOrEqual(3)
      expect(l.exercise, l.id).toBeTruthy()
      expect(l.exercise.hints.length, l.id).toBeGreaterThan(0)
    }
    expect(allLessons.length).toBeGreaterThanOrEqual(28)
  })
  it('quiz answers point to existing options and have explanations', () => {
    for (const l of allLessons) for (const q of l.quiz) {
      expect(q.answer, `${l.id}: ${q.q}`).toBeGreaterThanOrEqual(0)
      expect(q.answer, `${l.id}: ${q.q}`).toBeLessThan(q.options.length)
      expect(q.explain.length, l.id).toBeGreaterThan(5)
    }
  })
  it('references point to official documentation', () => {
    for (const l of allLessons) for (const r of l.refs) expect(r.url, l.id).toMatch(OFFICIAL)
    for (const t of terms) expect(t.ref, t.id).toMatch(OFFICIAL)
  })
  it('code example notes reference real lines', () => {
    for (const l of allLessons) for (const b of l.blocks) {
      if (b.type !== 'code') continue
      const n = b.code.split('\n').length
      for (const note of b.notes || []) for (const ln of note.lines) expect(ln, `${l.id} line ${ln}`).toBeLessThanOrEqual(n)
    }
  })
  it('JS example and try blocks are valid JavaScript', () => {
    for (const l of allLessons) for (const b of l.blocks) {
      if ((b.type === 'code' && b.lang === 'js') || (b.type === 'try' && b.mode === 'js')) expect(() => parseJs(b.code), l.id).not.toThrow()
    }
  })
})

describe('DOM/Vue checks are syntactically valid functions', () => {
  const all = [
    ...allLessons.filter((l) => l.exercise.checks).flatMap((l) => l.exercise.checks.map((c) => [l.id, c.test])),
    ...challenges.filter((c) => c.checks).flatMap((c) => c.checks.map((x) => [c.id, x.test])),
    ...projects.flatMap((p) => p.requirements.filter((r) => r.test).map((r) => [p.id, r.test])),
  ]
  it.each(all)('%s check parses', (id, test) => {
    // eslint-disable-next-line no-new-func
    expect(() => new Function('api', `return (${test})(api)`)).not.toThrow()
  })
})

describe('JS exercises: reference solutions pass, starters fail', () => {
  const jsLessons = allLessons.filter((l) => l.exercise.kind === 'js')
  it.each(jsLessons.map((l) => [l.id, l]))('%s', async (_id, l) => {
    const good = await runJsTests(l.exercise.solution, l.exercise.spec)
    expect(good.results.filter((r) => !r.pass), JSON.stringify(good.results.filter((r) => !r.pass))).toEqual([])
    expect(good.ok).toBe(true)
    const bad = await runJsTests(l.exercise.starter, l.exercise.spec)
    expect(bad.ok).toBe(false)
  })
  const jsChallenges = challenges.filter((c) => c.kind === 'js')
  it.each(jsChallenges.map((c) => [c.id, c]))('challenge %s', async (_id, c) => {
    const good = await runJsTests(c.solution, c.spec)
    expect(good.results.filter((r) => !r.pass)).toEqual([])
    expect((await runJsTests(c.starter, c.spec)).ok).toBe(false)
  })
  const jsProjects = projects.filter((p) => p.kind === 'js')
  it.each(jsProjects.map((p) => [p.id, p]))('project %s', async (_id, p) => {
    for (const req of p.requirements) {
      const good = await runJsTests(p.solution, req.spec)
      expect(good.results.filter((r) => !r.pass), req.text).toEqual([])
      expect((await runJsTests(p.starter, req.spec)).ok, req.text).toBe(false)
    }
    expect(p.requirements.reduce((s, r) => s + r.points, 0)).toBe(100)
  })
})

describe('practice rubrics', () => {
  it('every project totals 100 points', () => {
    for (const p of projects) expect(p.requirements.reduce((s, r) => s + r.points, 0), p.id).toBe(100)
  })
})

describe('dictionary', () => {
  it('has complete entries and valid related links', () => {
    expect(terms.length).toBeGreaterThanOrEqual(120)
    const ids = new Set()
    for (const t of terms) {
      expect(ids.has(t.id), t.id).toBe(false)
      ids.add(t.id)
      for (const k of ['term', 'ar', 'meaning', 'explain', 'syntax', 'example', 'pron', 'say']) expect(t[k], `${t.id}.${k}`).toBeTruthy()
    }
    for (const t of terms) for (const r of t.related) expect(termById[r], `${t.id} → ${r}`).toBeTruthy()
  })
})
