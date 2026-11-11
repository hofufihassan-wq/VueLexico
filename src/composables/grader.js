// التصحيح الموحّد للتمارين والتحديات والمشاريع. كل الفحوص وظيفية:
// - js: تُستدعى دوال المتعلّم في عامل معزول وتُقارن النتائج بعمق.
// - dom / vue: تُشغَّل الصفحة في المعاينة المعزولة ثم تُنفَّذ فحوص تتفاعل معها (نقر، إدخال، قياس أنماط محسوبة).
import { testJs } from '../engine/runJs.js'

export const modeOf = (ex) => (ex.kind === 'js' ? 'js' : ex.kind === 'vue' ? 'vue' : 'web')

export function startFiles(ex) {
  if (ex.kind === 'js') return { js: ex.starter }
  if (ex.kind === 'vue') return { vue: ex.starter }
  return { html: '', css: '', js: '', ...ex.starter }
}

export function solutionFiles(ex) {
  if (ex.kind === 'js') return { js: ex.solution }
  if (ex.kind === 'vue') return { vue: ex.solution }
  return { ...startFiles(ex), ...ex.solution }
}

// الملفات المحفوظة مع فرض ملفات القراءة فقط من البداية (لا يمكن «حل» التمرين بتعديلها)
export function restoreFiles(ex, saved) {
  const base = startFiles(ex)
  if (!saved || typeof saved !== 'object') return base
  const out = { ...base, ...saved }
  for (const k of ex.readonly || []) out[k] = base[k]
  return out
}

/**
 * @param ex التمرين/التحدي/المشروع
 * @param files ملفات المتعلّم
 * @param workspace مرجع Workspace (للفحوص داخل المعاينة)
 * @returns {Promise<{ ok, results, score?, syntax? }>}
 */
export async function grade(ex, files, workspace) {
  if (ex.requirements) {
    let results
    if (ex.kind === 'js') {
      results = []
      for (const req of ex.requirements) {
        const r = await testJs(files.js || '', req.spec)
        const failed = r.syntax ? `خطأ صياغة في السطر ${r.syntax.line}: ${r.syntax.message}` : (r.results.find((x) => !x.pass)?.message || r.results.find((x) => !x.pass)?.title || '')
        results.push({ title: req.text, pass: r.ok, message: r.ok ? '' : failed, points: req.points })
      }
    } else {
      const res = await workspace.runChecks(ex.requirements.map((r) => ({ title: r.text, test: r.test })))
      results = res.map((r, i) => ({ ...r, points: ex.requirements[i].points }))
    }
    const score = results.reduce((s, r) => s + (r.pass ? r.points : 0), 0)
    return { ok: score === 100, results, score }
  }
  if (ex.kind === 'js') {
    const r = await testJs(files.js || '', ex.spec)
    return { ok: !!r.ok, results: r.results || [], syntax: r.syntax, logs: r.logs }
  }
  const results = await workspace.runChecks(ex.checks)
  return { ok: results.length > 0 && results.every((r) => r.pass), results }
}
