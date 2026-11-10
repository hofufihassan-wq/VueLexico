// ترجمة مكوّن Vue أحادي الملف (SFC) داخل المتصفح باستخدام المترجم الرسمي vue/compiler-sfc،
// ثم تحويل الاستيرادات من 'vue' إلى المتغير العام Vue المتوفر في إطار المعاينة.

let compilerPromise = null
export const loadCompiler = () => (compilerPromise ||= import('vue/compiler-sfc'))

function hash(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0
  return (h >>> 0).toString(36).slice(0, 7)
}

// import { ref, computed as c } from 'vue'  →  const { ref, computed: c } = Vue
export function rewriteVueImports(code) {
  const unsupported = []
  const out = code.replace(/^\s*import\s+([\s\S]*?)\s+from\s+(['"])([^'"]+)\2;?/gm, (m, what, _q, from) => {
    if (from !== 'vue') { unsupported.push(from); return '' }
    const named = what.match(/\{([\s\S]*)\}/)
    if (!named) return ''
    const parts = named[1].split(',').map((s) => s.trim()).filter(Boolean).map((s) => {
      const [a, b] = s.split(/\s+as\s+/)
      return b ? `${a.trim()}: ${b.trim()}` : a.trim()
    })
    return `const { ${parts.join(', ')} } = Vue;`
  })
  return { code: out, unsupported }
}

/**
 * @returns {Promise<{ ok: boolean, js?: string, css?: string, errors?: Array<{message, line}>, bindings?: object }>}
 */
export async function compileSfc(source, filename = 'App.vue') {
  const { parse, compileScript, compileTemplate, compileStyle } = await loadCompiler()
  const { descriptor, errors } = parse(source, { filename })
  if (errors.length) {
    return { ok: false, errors: errors.map((e) => ({ message: e.message, line: e.loc?.start?.line ?? 0 })) }
  }
  if (!descriptor.template && !descriptor.script && !descriptor.scriptSetup) {
    return { ok: false, errors: [{ message: 'الملف لا يحتوي على <template> أو <script>. مكوّن Vue يحتاج قالبًا على الأقل.', line: 1 }] }
  }
  const id = hash(source)
  const scopeId = `data-v-${id}`
  const scoped = descriptor.styles.some((s) => s.scoped)
  let js = ''
  let bindings = {}
  try {
    if (descriptor.script || descriptor.scriptSetup) {
      const script = compileScript(descriptor, { id, inlineTemplate: true, genDefaultAs: '__sfc__' })
      js = script.content
      bindings = script.bindings || {}
    } else {
      js = 'const __sfc__ = {}'
    }
    if (!descriptor.scriptSetup && descriptor.template) {
      const t = compileTemplate({ source: descriptor.template.content, filename, id, scoped, compilerOptions: { scopeId: scoped ? scopeId : undefined } })
      if (t.errors.length) {
        return { ok: false, errors: t.errors.map((e) => ({ message: typeof e === 'string' ? e : e.message, line: (e.loc?.start?.line ?? 0) + (descriptor.template.loc.start.line - 1) })) }
      }
      js += '\n' + t.code.replace(/export function render/, 'function render') + '\n__sfc__.render = render;'
    }
  } catch (e) {
    const lineMatch = String(e.message).match(/\((\d+):(\d+)\)/)
    return { ok: false, errors: [{ message: String(e.message).split('\n')[0], line: e.loc?.start?.line ?? (lineMatch ? Number(lineMatch[1]) : 0) }] }
  }
  js = js.replace(/export\s+default\s+/g, 'const __sfc__ = ')
  const rewritten = rewriteVueImports(js)
  if (rewritten.unsupported.length) {
    return { ok: false, errors: [{ message: `الاستيراد من «${rewritten.unsupported.join('، ')}» غير مدعوم في المعاينة. يمكن استخدام 'vue' فقط.`, line: 0 }] }
  }
  js = rewritten.code
  if (scoped) js += `\n__sfc__.__scopeId = ${JSON.stringify(scopeId)};`
  const css = descriptor.styles.map((s) => {
    const r = compileStyle({ source: s.content, filename, id: scopeId, scoped: s.scoped })
    return r.code
  }).join('\n')
  return { ok: true, js, css, bindings, descriptor }
}
