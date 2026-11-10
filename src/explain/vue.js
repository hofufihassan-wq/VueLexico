// شارح مكوّنات Vue: يستخدم المترجم الرسمي (vue/compiler-sfc) لتحليل الكتل والقالب،
// ويعتمد على bindingMetadata التي يحسبها المترجم لمعرفة نوع كل اسم مستخدم في القالب بدقة.
import { loadCompiler } from '../engine/vueCompile.js'
import { parseJs } from '../engine/instrument.js'
import { explainJs } from './js.js'
import { explainCss } from './css.js'
import { htmlTagTerm } from '../content/dictionary/index.js'

const BINDING_AR = {
  'setup-ref': 'مرجع تفاعلي ref',
  'setup-maybe-ref': 'قيمة قد تكون ref (مثل ناتج computed أو دالة استدعاء)',
  'setup-const': 'ثابت/دالة في script setup',
  'setup-let': 'متغير let في script setup (ليس تفاعليًا بحد ذاته)',
  'setup-reactive-const': 'كائن تفاعلي reactive',
  'literal-const': 'ثابت بقيمة حرفية',
  props: 'خاصية props ممرَّرة من الأب',
  'props-aliased': 'خاصية props',
  data: 'بيانات من data()',
  options: 'من خيارات المكوّن (methods/computed)',
}

const DIRECTIVES = {
  if: ['vue-v-if', (e) => `يُنشئ هذا العنصر في الصفحة فقط إن كان «${e}» صادقًا، ويزيله تمامًا من DOM إن صار كاذبًا.`],
  'else-if': ['vue-v-if', (e) => `يُفحص فقط إن لم يتحقق الشرط السابق: يُعرض العنصر إن كان «${e}» صادقًا.`],
  else: ['vue-v-if', () => 'يُعرض إن لم يتحقق أي شرط سابق (v-if / v-else-if). يجب أن يأتي مباشرة بعد ذلك العنصر.'],
  show: ['vue-v-show', (e) => `يخفي العنصر أو يظهره حسب «${e}» بتغيير display فقط؛ العنصر يبقى في DOM.`],
  model: ['vue-v-model', (e) => `ربط ثنائي الاتجاه: ما يكتبه المستخدم يُخزَّن في «${e}»، وتغيير «${e}» يغيّر محتوى الحقل.`],
  html: [null, (e) => `يضع قيمة «${e}» كـ HTML داخل العنصر. خطر أمني (XSS) إن كانت القيمة من المستخدم؛ استخدم {{ }} للنصوص.`],
  text: [null, (e) => `يضع قيمة «${e}» كنص داخل العنصر.`],
  slot: ['vue-slot', () => 'يحدد محتوى فتحة (slot) يُمرَّر للمكوّن.'],
  once: [null, () => 'يُعرض العنصر مرة واحدة فقط ولا يتحدّث بعدها.'],
  cloak: [null, () => 'يبقى حتى ينتهي ترجمة القالب (لإخفاء {{ }} قبل الترجمة).'],
}

const MODIFIERS = {
  prevent: 'يستدعي event.preventDefault()', stop: 'يستدعي event.stopPropagation()', once: 'يُنفَّذ مرة واحدة فقط', enter: 'فقط عند مفتاح Enter', esc: 'فقط عند مفتاح Escape', self: 'فقط إن كان الحدث على العنصر نفسه',
  trim: 'يحذف المسافات من بداية القيمة ونهايتها', number: 'يحوّل القيمة إلى عدد', lazy: 'يحدّث القيمة عند change بدل كل حرف',
}

const lineAt = (code, off) => { let n = 1; for (let i = 0; i < off; i++) if (code.charCodeAt(i) === 10) n++; return n }

const JS_KEYWORDS = new Set(['true', 'false', 'null', 'undefined', 'this', 'in', 'of', 'typeof', 'new', 'Math', 'Date', 'JSON', 'Number', 'String', 'Array', 'Object', 'console', '$event', '$emit', '$attrs', '$slots', '$props', 'window', 'NaN', 'Infinity'])

// المعرّفات الحرة في تعبير القالب (ليست خصائص بعد نقطة وليست معاملات دوال سهمية)
function freeIdentifiers(expr) {
  // نحاول التحليل كتعبير بين أقواس (الإزاحة -1)، ثم كجمل مثل @click="a++; b()" (بلا إزاحة)
  let ast
  let shift = -1
  try { ast = parseJs(`(${expr})`) } catch {
    try { ast = parseJs(expr); shift = 0 } catch { return [] }
  }
  const out = []
  const walk = (n, parent, local) => {
    if (!n || typeof n.type !== 'string') return
    if (n.type === 'Identifier') {
      if (parent && parent.type === 'MemberExpression' && parent.property === n && !parent.computed) return
      if (parent && parent.type === 'Property' && parent.key === n && !parent.shorthand && !parent.computed) return
      if (local.has(n.name)) return
      out.push({ name: n.name, start: n.start + shift, end: n.end + shift, member: parent?.type === 'MemberExpression' && parent.object === n ? parent : null })
      return
    }
    if (n.type === 'ArrowFunctionExpression' || n.type === 'FunctionExpression') {
      const l = new Set(local)
      const collect = (p) => { if (!p) return; if (p.type === 'Identifier') l.add(p.name); else if (p.type === 'AssignmentPattern') collect(p.left); else if (p.type === 'ObjectPattern') p.properties.forEach((x) => collect(x.value || x.argument)); else if (p.type === 'ArrayPattern') p.elements.forEach(collect); else if (p.type === 'RestElement') collect(p.argument) }
      n.params.forEach(collect)
      walk(n.body, n, l)
      return
    }
    for (const k in n) {
      if (k === 'loc' || k === 'type' || k === 'start' || k === 'end') continue
      const v = n[k]
      if (Array.isArray(v)) v.forEach((x) => walk(x, n, local))
      else if (v && typeof v.type === 'string') walk(v, n, local)
    }
  }
  walk(ast, null, new Set())
  return out
}

export async function explainVue(code) {
  const { parse, compileScript } = await loadCompiler()
  const { descriptor, errors } = parse(code, { filename: 'Component.vue' })
  const items = []
  const notes = new Set()
  const at = (s, e) => ({ from: s, to: e, line: lineAt(code, s), endLine: lineAt(code, e) })
  const add = (s, e, kind, title, text, extra = {}) => items.push({ ...at(s, e), kind, title, text, ...extra })

  if (errors.length) {
    const e = errors[0]
    const off = e.loc?.start?.offset ?? 0
    return { lang: 'vue', items: [], symbols: [], notes: [], error: { message: 'خطأ في بنية الملف', detail: e.message, line: e.loc?.start?.line ?? 1, from: off } }
  }

  // ---------- الكتل ----------
  const tpl = descriptor.template
  const setup = descriptor.scriptSetup
  const script = descriptor.script
  if (tpl) add(tpl.loc.start.offset, tpl.loc.end.offset, 'block', '<template>', 'القالب: يصف ما يعرضه المكوّن. Vue يترجمه إلى دالة عرض ويعيد تنفيذها تلقائيًا عند تغيّر البيانات التفاعلية المستخدمة فيه.', { term: 'vue-template' })
  if (setup) add(setup.loc.start.offset, setup.loc.end.offset, 'block', '<script setup>', 'منطق المكوّن بصياغة Composition API: كل ما يُعرَّف في المستوى الأعلى متاح مباشرة في القالب. يُنفَّذ مرة لكل نسخة من المكوّن.', { term: 'vue-script-setup' })
  if (script) add(script.loc.start.offset, script.loc.end.offset, 'block', '<script>', setup ? 'سكربت عادي بجانب script setup (لخيارات إضافية).' : 'منطق المكوّن بصياغة Options API أو setup() صريحة.', { term: 'vue-sfc' })
  for (const st of descriptor.styles) add(st.loc.start.offset, st.loc.end.offset, 'block', st.scoped ? '<style scoped>' : '<style>', st.scoped ? 'تنسيق محصور: Vue يضيف سمة فريدة لعناصر هذا المكوّن فلا تتسرب القواعد لغيره.' : 'تنسيق عام: القواعد هنا تؤثر على الصفحة كلها، لا على هذا المكوّن وحده.', { term: 'vue-scoped' })

  // ---------- السكربت ----------
  let bindings = {}
  try {
    if (setup || script) bindings = compileScript(descriptor, { id: 'explain' }).bindings || {}
  } catch (e) {
    notes.add(`تعذّر على مترجم Vue تحليل السكربت بالكامل: ${String(e.message).split('\n')[0]}`)
  }
  const scriptSymbols = []
  for (const block of [script, setup].filter(Boolean)) {
    const r = explainJs(block.content, { offset: block.loc.start.offset, lineOffset: block.loc.start.line - 1, sourceType: 'module' })
    if (r.error) items.push({ from: r.error.from, to: r.error.from + 1, line: r.error.line, endLine: r.error.line, kind: 'error', title: r.error.message, text: r.error.detail, warn: true })
    items.push(...r.items)
    scriptSymbols.push(...r.symbols.map((s) => ({ ...s, block: block === setup ? 'setup' : 'script' })))
  }
  for (const st of descriptor.styles) {
    const r = explainCss(st.content, { offset: st.loc.start.offset, lineOffset: st.loc.start.line - 1 })
    items.push(...r.items)
  }

  // ---------- رموز القالب ----------
  const symbols = []
  const symByName = new Map()
  for (const [name, type] of Object.entries(bindings)) {
    if (name.startsWith('__')) continue
    const js = scriptSymbols.find((s) => s.name === name && (s.block === 'setup' || !setup))
    const sym = { id: symbols.length, name, kind: BINDING_AR[type] || type, binding: type, line: js?.line ?? 0, refs: js ? [...js.refs] : [], writes: js ? [...js.writes] : [], templateRefs: [] }
    symbols.push(sym)
    symByName.set(name, sym)
  }

  // ---------- القالب ----------
  if (tpl && tpl.ast) {
    const visit = (node, scopeNames, parent) => {
      if (node.type === 1) {
        const isComp = node.tagType === 1
        const tag = node.tag
        const t = !isComp ? htmlTagTerm(tag) : null
        let text = isComp
          ? `مكوّن «${tag}»${symByName.has(tag) ? ` مستورد في السكربت (السطر ${symByName.get(tag).line})` : ' — غير مستورد في هذا الملف؛ يجب أن يكون مسجلًا عامًا وإلا سيحذّر Vue أنه لم يُعثر عليه'}.`
          : t ? t.meaning : node.tagType === 3 ? 'عنصر <template> غلاف غير مرئي لتجميع عناصر تحت توجيه واحد.' : node.tagType === 2 ? 'فتحة <slot>: هنا يُعرض المحتوى الذي يمرّره الأب.' : `العنصر <${tag}>.`
        add(node.loc.start.offset, node.loc.end.offset, 'element', `<${tag}>`, text, { term: isComp ? 'vue-component' : node.tagType === 2 ? 'vue-slot' : t?.id, warn: isComp && !symByName.has(tag) })
        let local = scopeNames
        const hasFor = node.props.some((p) => p.type === 7 && p.name === 'for')
        const hasKey = node.props.some((p) => (p.type === 7 && p.name === 'bind' && p.arg?.content === 'key') || (p.type === 6 && p.name === 'key'))
        const hasIf = node.props.some((p) => p.type === 7 && p.name === 'if')
        for (const p of node.props) {
          if (p.type === 6) {
            add(p.loc.start.offset, p.loc.end.offset, 'attribute', p.name, `سمة ثابتة «${p.name}»${p.value ? ` قيمتها «${p.value.content}»` : ''}. بدون : قبلها، تُعامل قيمتها كنص حرفي لا كتعبير JavaScript.`)
            continue
          }
          if (p.type !== 7) continue
          const exp = p.exp?.content ?? ''
          const mods = (p.modifiers || []).map((m) => (typeof m === 'string' ? m : m.content))
          const modTxt = mods.length ? ` المعدِّلات: ${mods.map((m) => `.${m} (${MODIFIERS[m] || 'معدِّل'})`).join('، ')}.` : ''
          const raw = code.slice(p.loc.start.offset, p.loc.end.offset)
          if (p.name === 'for') {
            const m = exp.match(/^\s*\(?\s*([^)]*?)\s*\)?\s+(?:in|of)\s+([\s\S]+)$/)
            const aliases = m ? m[1].split(',').map((s) => s.trim().replace(/[{}[\]]/g, '').split(':').pop().trim()).filter(Boolean) : []
            local = new Set([...scopeNames, ...aliases])
            add(p.loc.start.offset, p.loc.end.offset, 'directive', 'v-for', `يكرر هذا العنصر لكل عنصر في «${m ? m[2].trim() : exp}»، ويضع العنصر الحالي في ${aliases.map((a) => `«${a}»`).join(' و')}. هذه الأسماء متاحة فقط داخل هذا العنصر.${hasKey ? '' : ' تنبيه: لا يوجد :key — أضف مفتاحًا فريدًا مستقرًا (مثل id) ليتتبّع Vue العناصر بدقة.'}${hasIf ? ' تنبيه: v-if وv-for على العنصر نفسه غير مستحسن؛ في Vue 3 يُقيَّم v-if أولًا فلا يرى متغير التكرار.' : ''}`, { term: 'vue-v-for', warn: !hasKey || hasIf })
            if (m) refsIn(m[2], p.exp.loc.start.offset + exp.indexOf(m[2]), scopeNames)
            continue
          }
          if (p.name === 'bind') {
            const arg = p.arg?.content
            let extra = ''
            if (arg === 'class') extra = ' مع class يمكن تمرير كائن { اسم_الصنف: شرط } ليُضاف الصنف عند تحقق الشرط، ويُدمج مع class الثابت.'
            if (arg === 'style') extra = ' مع style يمكن تمرير كائن خصائص CSS.'
            if (arg === 'key') extra = ' المفتاح يساعد Vue على تتبّع هوية العنصر.'
            add(p.loc.start.offset, p.loc.end.offset, 'directive', raw.startsWith(':') ? `:${arg ?? ''}` : `v-bind:${arg ?? ''}`, `${arg ? `يربط السمة/الخاصية «${arg}» بقيمة التعبير «${exp}» (تُحسب كـ JavaScript وتتحدّث تلقائيًا).` : `يربط كل خصائص الكائن «${exp}» كسمات.`}${extra}${modTxt}`, { term: arg === 'key' ? 'vue-key' : 'vue-v-bind' })
          } else if (p.name === 'on') {
            const arg = p.arg?.content
            const isFn = /^[A-Za-z_$][\w$.]*$/.test(exp.trim())
            add(p.loc.start.offset, p.loc.end.offset, 'directive', raw.startsWith('@') ? `@${arg}` : `v-on:${arg}`, `عند حدث «${arg}» ${isFn ? `تُستدعى الدالة «${exp.trim()}» (ويُمرَّر لها كائن الحدث)` : `يُنفَّذ «${exp}»`}.${modTxt}${tag && !isComp ? '' : ' على مكوّن: يستمع لحدث يطلقه المكوّن بـ emit (أو لحدث أصلي إن لم يعرّفه).'}`, { term: 'vue-v-on' })
          } else if (p.name === 'model') {
            add(p.loc.start.offset, p.loc.end.offset, 'directive', 'v-model', DIRECTIVES.model[1](exp) + modTxt, { term: 'vue-v-model' })
            const s = symByName.get(exp.trim())
            if (s && (s.binding === 'setup-const' || s.binding === 'literal-const')) add(p.loc.start.offset, p.loc.end.offset, 'note', 'v-model على ثابت', `«${exp}» ليس ref ولا reactive، لذلك لن يستطيع v-model تحديثه. عرّفه بـ ref().`, { warn: true })
          } else if (DIRECTIVES[p.name]) {
            const [term, fn] = DIRECTIVES[p.name]
            add(p.loc.start.offset, p.loc.end.offset, 'directive', `v-${p.name}`, fn(exp) + modTxt, { term: term || undefined, warn: p.name === 'html' })
          } else {
            add(p.loc.start.offset, p.loc.end.offset, 'directive', `v-${p.name}`, `توجيه مخصص «v-${p.name}» — يجب أن يكون مسجلًا؛ لا نعرف سلوكه من هذا الملف.`)
          }
          if (p.exp && p.name !== 'for') refsIn(exp, p.exp.loc.start.offset, p.name === 'for' ? scopeNames : local, p.name === 'on' || p.name === 'model')
        }
        for (const c of node.children) visit(c, local, node)
      } else if (node.type === 5) {
        const exp = node.content.content
        add(node.loc.start.offset, node.loc.end.offset, 'interpolation', `{{ ${exp.trim().length > 24 ? exp.trim().slice(0, 23) + '…' : exp.trim()} }}`, `يعرض ناتج التعبير «${exp.trim()}» كنص (وليس HTML)، ويتحدّث تلقائيًا عند تغيّر أي قيمة تفاعلية يعتمد عليها.`, { term: 'vue-interpolation' })
        refsIn(exp, node.content.loc.start.offset, scopeNames)
      } else if (node.type === 2 && node.content.trim()) {
        add(node.loc.start.offset, node.loc.end.offset, 'text', 'نص ثابت', 'نص يظهر كما هو.')
      } else if (node.type === 3) {
        add(node.loc.start.offset, node.loc.end.offset, 'comment', 'تعليق', 'تعليق في القالب؛ لا يظهر في الصفحة (يُحذف في نسخة الإنتاج).')
      }
      if (node.type === 0) node.children.forEach((c) => visit(c, scopeNames, node))
    }

    function refsIn(exp, base, scopeNames, writes = false) {
      for (const id of freeIdentifiers(exp)) {
        if (scopeNames.has(id.name) || JS_KEYWORDS.has(id.name)) continue
        const from = base + id.start
        const to = base + id.end
        const s = symByName.get(id.name)
        if (s) {
          s.templateRefs.push(lineAt(code, from))
          s.refs.push({ line: lineAt(code, from), from, to, write: writes })
          let text = `«${id.name}»: ${s.kind}${s.line ? ` معرّف في السطر ${s.line}` : ''}.`
          if (s.binding === 'setup-ref' || s.binding === 'setup-maybe-ref') text += ' في القالب يُفكّ الـ ref تلقائيًا، لذلك لا نكتب .value هنا.'
          const usesValue = id.member && !id.member.computed && id.member.property?.name === 'value'
          if (usesValue && s.binding === 'setup-ref') text += ' تنبيه: كتابة .value في القالب خاطئة هنا؛ القيمة مفكوكة أصلًا فستكون .value غير معرّفة.'
          add(from, to, 'identifier', id.name, text, { symbol: s.id, rel: s.line ? [{ line: s.line, label: 'التعريف' }] : [], warn: !!(usesValue && s.binding === 'setup-ref') })
        } else {
          add(from, to, 'identifier', id.name, `«${id.name}» غير معرّف في سكربت المكوّن ولا في متغيرات v-for المحيطة. سيحذّر Vue أثناء التشغيل بأن الخاصية غير معرّفة، ويُعرض كقيمة فارغة.`, { warn: true })
        }
      }
    }
    visit(tpl.ast, new Set(), null)
  } else if (!tpl) {
    notes.add('لا توجد كتلة <template>؛ المكوّن يحتاج قالبًا أو دالة render ليعرض شيئًا.')
  }

  for (const s of symbols) {
    if (s.templateRefs.length === 0 && s.binding?.startsWith('setup') && /^[a-z]/.test(s.name)) notes.add(`«${s.name}» معرّف في السكربت لكنه غير مستخدم في القالب (قد يكون مستخدمًا داخل السكربت فقط).`)
  }
  notes.add('التحليل يعتمد على مترجم Vue الرسمي لكنه لا يشغّل المكوّن؛ لرؤية السلوك الفعلي افتح المكوّن في المحرر (وضع Vue).')
  items.sort((a, b) => a.from - b.from || b.to - a.to)
  return { lang: 'vue', items, symbols, notes: [...notes], error: null }
}

export { freeIdentifiers }
