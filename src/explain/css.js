// شارح CSS: يعتمد على css-tree لتحليل القواعد والتحقق من صحة الخصائص والقيم وفق قاعدة بيانات CSS،
// ويحسب الخصوصية (specificity) لكل محدِّد ويشرح بنيته من اليمين (العنصر المستهدف) إلى اليسار.
import * as csstree from 'css-tree/dist/csstree.esm'
import { cssPropTerm } from '../content/dictionary/index.js'

const UNITS = {
  px: 'بكسل: وحدة ثابتة', rem: 'نسبة إلى حجم خط الجذر (عادة 16px)', em: 'نسبة إلى حجم خط العنصر نفسه', '%': 'نسبة مئوية من قيمة مرجعية (غالبًا أبعاد الأب)',
  vw: '1% من عرض نافذة العرض', vh: '1% من ارتفاع نافذة العرض', dvh: '1% من الارتفاع الديناميكي لنافذة العرض', ch: 'عرض الرقم "0" في الخط الحالي', fr: 'حصة من المساحة المتبقية في Grid',
  s: 'ثانية', ms: 'ميلي ثانية', deg: 'درجة', turn: 'لفة كاملة',
}

const KEYWORDS = {
  display: { block: 'كتلة تأخذ سطرًا كاملًا', inline: 'داخل السطر ولا تقبل width/height', 'inline-block': 'داخل السطر لكنها تقبل الأبعاد', flex: 'تجعل الأبناء عناصر Flexbox مرنة في صف أو عمود', grid: 'تجعل الأبناء في شبكة صفوف وأعمدة', none: 'يُخفى العنصر تمامًا ولا يشغل مساحة', 'inline-flex': 'حاوية flex تتصرف كعنصر سطري', contents: 'يختفي صندوق العنصر ويبقى أبناؤه' },
  'justify-content': { 'flex-start': 'العناصر في بداية المحور الرئيسي', start: 'العناصر في البداية', center: 'العناصر في المنتصف', 'flex-end': 'العناصر في نهاية المحور', end: 'العناصر في النهاية', 'space-between': 'المساحة الحرة موزعة بين العناصر فقط', 'space-around': 'مساحة حول كل عنصر (الأطراف نصفها)', 'space-evenly': 'مسافات متساوية تمامًا بما فيها الأطراف' },
  'align-items': { stretch: 'تمدد العناصر لتملأ المحور العرضي (الافتراضي)', center: 'توسيط على المحور العرضي', 'flex-start': 'محاذاة لبداية المحور العرضي', 'flex-end': 'محاذاة لنهايته', baseline: 'محاذاة خطوط النص الأساسية' },
  'flex-direction': { row: 'صف (في RTL يبدأ من اليمين)', column: 'عمود من الأعلى للأسفل', 'row-reverse': 'صف معكوس', 'column-reverse': 'عمود معكوس' },
  'flex-wrap': { wrap: 'تلتف العناصر إلى سطر جديد عند ضيق المساحة', nowrap: 'كل العناصر في سطر واحد (الافتراضي)' },
  position: { static: 'التموضع العادي (الافتراضي)', relative: 'يبقى في مكانه ويمكن إزاحته، ويصبح مرجعًا للأبناء absolute', absolute: 'يخرج من التدفق ويتموضع بالنسبة لأقرب أب متموضع', fixed: 'يتموضع بالنسبة للنافذة ولا يتحرك مع التمرير', sticky: 'يلتصق عند وصول التمرير إلى الحد المحدد' },
  'box-sizing': { 'border-box': 'العرض يشمل الحشوة والحد', 'content-box': 'العرض للمحتوى فقط (الافتراضي)' },
  overflow: { hidden: 'يقص المحتوى الزائد', auto: 'شريط تمرير عند الحاجة فقط', scroll: 'شريط تمرير دائمًا', visible: 'المحتوى الزائد يظهر خارج الصندوق' },
  'text-align': { center: 'توسيط', start: 'بداية السطر حسب اتجاه الكتابة', end: 'نهاية السطر حسب الاتجاه', justify: 'ضبط على الجانبين', left: 'يسار دائمًا', right: 'يمين دائمًا' },
}
const GLOBAL_KW = {
  auto: 'يترك للمتصفح حساب القيمة', none: 'لا شيء', inherit: 'يرث القيمة من الأب', initial: 'القيمة الابتدائية حسب المواصفة', unset: 'يرث إن كانت الخاصية موروثة وإلا القيمة الابتدائية',
  ease: 'تسارع ثم تباطؤ (افتراضي)', linear: 'سرعة ثابتة', 'ease-in': 'يبدأ ببطء', 'ease-out': 'ينتهي ببطء', 'ease-in-out': 'يبدأ وينتهي ببطء', infinite: 'تكرار لا نهائي', alternate: 'تتبادل الاتجاه كل دورة',
  solid: 'خط متصل', dashed: 'خط متقطع', dotted: 'نقاط', bold: 'عريض (700)', normal: 'القيمة العادية', transparent: 'شفاف تمامًا', currentcolor: 'لون النص الحالي',
}
const FUNCS = {
  rgb: 'لون بقنوات الأحمر والأخضر والأزرق (0–255)', rgba: 'لون RGB مع شفافية', hsl: 'لون بدرجة اللون (0–360) والتشبّع والإضاءة', hsla: 'لون HSL مع شفافية', oklch: 'لون في فضاء OKLCH المتسق إدراكيًا',
  var: 'يقرأ قيمة متغير CSS (خاصية مخصصة)', calc: 'يحسب قيمة رياضية بخلط وحدات مختلفة', clamp: 'قيمة مرنة محصورة بين حد أدنى وأقصى: clamp(أدنى، مفضّل، أقصى)', min: 'أصغر القيم', max: 'أكبر القيم',
  repeat: 'يكرر نمط الأعمدة/الصفوف', minmax: 'حجم بين حد أدنى وأقصى', translate: 'إزاحة', translateX: 'إزاحة أفقية', translateY: 'إزاحة عمودية', rotate: 'تدوير', scale: 'تكبير/تصغير',
  url: 'مسار ملف (صورة أو خط)', 'linear-gradient': 'تدرّج لوني خطي', 'radial-gradient': 'تدرّج لوني دائري', 'cubic-bezier': 'منحنى توقيت مخصص للحركة', steps: 'حركة على خطوات متقطعة',
}

function specificity(selectorNode) {
  let a = 0, b = 0, c = 0
  const visitList = (children) => {
    children.forEach((n) => {
      switch (n.type) {
        case 'IdSelector': a++; break
        case 'ClassSelector': case 'AttributeSelector': b++; break
        case 'TypeSelector': if (n.name !== '*') c++; break
        case 'PseudoElementSelector': c++; break
        case 'PseudoClassSelector': {
          const name = n.name.toLowerCase()
          if (name === 'where') break
          if (['is', 'not', 'has', 'matches'].includes(name) && n.children) {
            let best = [0, 0, 0]
            n.children.forEach((list) => {
              if (list.type === 'SelectorList') list.children.forEach((sel) => { const s = specificity(sel); if (cmp(s, best) > 0) best = s })
            })
            a += best[0]; b += best[1]; c += best[2]
          } else b++
          break
        }
      }
    })
  }
  visitList(selectorNode.children)
  return [a, b, c]
}
const cmp = (x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]

const PSEUDO = {
  hover: 'عندما يكون المؤشر فوقه', focus: 'عندما يكون عليه التركيز', 'focus-visible': 'عندما يكون عليه التركيز من لوحة المفاتيح', active: 'أثناء الضغط عليه', visited: 'إن كان رابطًا تمت زيارته',
  'first-child': 'إن كان الابن الأول لأبيه', 'last-child': 'إن كان الابن الأخير لأبيه', 'nth-child': 'حسب ترتيبه بين إخوته', checked: 'إن كان محددًا (checkbox/radio)', disabled: 'إن كان معطّلًا', root: 'جذر المستند (عنصر html)', not: 'إن لم يطابق المحدد داخل الأقواس', is: 'إن طابق أيًا من المحددات داخل الأقواس', has: 'إن احتوى على عنصر يطابق ما داخل الأقواس', empty: 'إن لم يكن له أبناء', 'placeholder-shown': 'عندما يظهر نص placeholder',
}

function describeCompound(parts) {
  let tag = ''
  const bits = []
  for (const n of parts) {
    switch (n.type) {
      case 'TypeSelector': tag = n.name === '*' ? 'أي عنصر' : `<${n.name}>`; break
      case 'ClassSelector': bits.push(`يحمل الصنف «${n.name}»`); break
      case 'IdSelector': bits.push(`معرّفه «${n.name}»`); break
      case 'AttributeSelector': bits.push(`له السمة [${n.name.name}${n.value ? `${n.matcher}${n.value.value ?? n.value.name}` : ''}]`); break
      case 'PseudoClassSelector': bits.push(PSEUDO[n.name] || `في حالة :${n.name}`); break
      case 'PseudoElementSelector': bits.push(n.name === 'before' ? 'المحتوى الزخرفي قبله (::before)' : n.name === 'after' ? 'المحتوى الزخرفي بعده (::after)' : `الجزء ::${n.name}`); break
      case 'NestingSelector': bits.push('القاعدة الأب (&)'); break
    }
  }
  return `${tag || 'أي عنصر'}${bits.length ? ' ' + bits.join(' و') : ''}`
}

function describeSelector(sel) {
  const compounds = [[]]
  const combs = []
  sel.children.forEach((n) => {
    if (n.type === 'Combinator') { combs.push(n.name); compounds.push([]) } else compounds[compounds.length - 1].push(n)
  })
  // المحدِّد يُقرأ من اليمين: آخر جزء هو العنصر المستهدف فعلًا
  let text = describeCompound(compounds[compounds.length - 1])
  for (let i = compounds.length - 2; i >= 0; i--) {
    const c = combs[i]
    const rel = c === '>' ? 'ابن مباشر لـ' : c === '+' ? 'يأتي مباشرة بعد' : c === '~' ? 'يأتي بعد (أخ لاحق لـ)' : 'داخل'
    text += `، ${rel} ${describeCompound(compounds[i])}`
  }
  return text
}

function describeMedia(prelude) {
  return prelude
    .replace(/\(\s*min-width\s*:\s*([^)]+)\)/g, 'عرض النافذة $1 أو أكثر')
    .replace(/\(\s*max-width\s*:\s*([^)]+)\)/g, 'عرض النافذة $1 أو أقل')
    .replace(/\(\s*prefers-color-scheme\s*:\s*dark\s*\)/g, 'المستخدم يفضّل الوضع الداكن')
    .replace(/\(\s*prefers-color-scheme\s*:\s*light\s*\)/g, 'المستخدم يفضّل الوضع الفاتح')
    .replace(/\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/g, 'المستخدم طلب تقليل الحركة')
    .replace(/\(\s*orientation\s*:\s*portrait\s*\)/g, 'الشاشة عمودية')
    .replace(/\(\s*orientation\s*:\s*landscape\s*\)/g, 'الشاشة أفقية')
    .replace(/\band\b/g, 'و')
    .replace(/\bscreen\b/g, 'الشاشات')
    .replace(/\bprint\b/g, 'الطباعة')
}

/**
 * @param {string} code
 * @param {{ lineOffset?: number, offset?: number }} opts
 */
export function explainCss(code, opts = {}) {
  const lineOffset = opts.lineOffset || 0
  const offset = opts.offset || 0
  const items = []
  const notes = new Set()
  const parseErrors = []
  let ast
  try {
    ast = csstree.parse(code, { positions: true, onParseError: (e) => parseErrors.push(e) })
  } catch (e) {
    return { lang: 'css', items: [], symbols: [], notes: [], error: { message: 'تعذّر تحليل CSS', detail: e.message, line: (e.line || 1) + lineOffset } }
  }
  const pos = (n) => ({ from: n.loc.start.offset + offset, to: n.loc.end.offset + offset, line: n.loc.start.line + lineOffset, endLine: n.loc.end.line + lineOffset })
  const add = (n, kind, title, text, extra = {}) => items.push({ ...pos(n), kind, title, text, ...extra })

  const symbols = []
  const symByName = new Map()
  const sym = (name, kind) => {
    const key = kind + ':' + name
    if (!symByName.has(key)) { const s = { id: symbols.length, name, kind, line: null, refs: [], writes: [], defs: [] }; symbols.push(s); symByName.set(key, s) }
    return symByName.get(key)
  }
  const ruleProps = new Map() // selector text -> Map(prop -> line)

  csstree.walk(ast, {
    enter(node, item, list) {
      if (node.type === 'Rule' && node.prelude.type === 'SelectorList') {
        const selTexts = []
        node.prelude.children.forEach((sel) => {
          const spec = specificity(sel)
          const text = csstree.generate(sel)
          selTexts.push(text)
          add(sel, 'selector', text, `يستهدف: ${describeSelector(sel)}. الخصوصية (${spec.join(', ')}) — أي ${spec[0]} معرّف، ${spec[1]} صنف/سمة/حالة، ${spec[2]} عنصر.`, { term: 'css-selector', specificity: spec })
        })
        add(node, 'rule', 'قاعدة CSS', `${selTexts.length > 1 ? `قاعدة لعدة محددات مفصولة بفواصل (${selTexts.length}) — تُطبّق على كل منها` : `قاعدة تطبّق تصريحاتها على «${selTexts[0]}»`}. فيها ${node.block.children.size} تصريح.`, { term: 'css-rule' })
        // تعارضات بسيطة: نفس المحدد ونفس الخاصية في قاعدتين
        const key = selTexts.join(',')
        if (!ruleProps.has(key)) ruleProps.set(key, new Map())
        const seen = ruleProps.get(key)
        node.block.children.forEach((d) => {
          if (d.type !== 'Declaration') return
          const prev = seen.get(d.property)
          if (prev && prev !== d.loc.start.line + lineOffset) {
            add(d, 'note', 'تعارض', `الخاصية «${d.property}» معرّفة أيضًا لنفس المحدد في السطر ${prev}. بما أن الخصوصية متساوية فالتصريح اللاحق في الملف هو الذي يُطبّق (ما لم يكن أحدهما !important).`, { rel: [{ line: prev, label: 'التصريح الآخر' }], term: 'css-cascade' })
          }
          seen.set(d.property, d.loc.start.line + lineOffset)
        })
      }
      if (node.type === 'Atrule') {
        const prelude = node.prelude ? csstree.generate(node.prelude) : ''
        const name = node.name.toLowerCase()
        if (name === 'media') add(node, 'atrule', '@media', `القواعد داخل هذه الكتلة تُطبّق فقط عندما: ${describeMedia(prelude)}.`, { term: 'css-media' })
        else if (name === 'keyframes') { add(node, 'atrule', `@keyframes ${prelude}`, `يعرّف مراحل حركة اسمها «${prelude}» تُشغَّل بخاصية animation.`, { term: 'css-animation' }); const s = sym(prelude, 'keyframes'); s.line = node.loc.start.line + lineOffset; s.defs.push(s.line) }
        else if (name === 'import') add(node, 'atrule', '@import', 'يستورد ملف CSS آخر. ملاحظة: المعاينة المعزولة لا تحمّل ملفات من الشبكة.')
        else if (name === 'font-face') add(node, 'atrule', '@font-face', 'يعرّف خطًا مخصصًا من ملف ليُستخدم في font-family.')
        else if (name === 'supports') add(node, 'atrule', '@supports', `القواعد داخلها تُطبّق فقط إن كان المتصفح يدعم: ${prelude}.`)
        else if (name === 'layer') add(node, 'atrule', '@layer', 'طبقات التتالي: تتحكم في أولوية مجموعات القواعد بغض النظر عن الخصوصية.')
        else if (name === 'container') add(node, 'atrule', '@container', `قواعد تُطبّق حسب حجم الحاوية لا النافذة: ${prelude}.`)
        else add(node, 'atrule', `@${name}`, 'قاعدة at خاصة.')
      }
      if (node.type === 'Declaration') {
        const prop = node.property
        const valueText = csstree.generate(node.value).trim()
        const term = cssPropTerm(prop.toLowerCase())
        if (prop.startsWith('--')) {
          const s = sym(prop, 'var')
          s.defs.push(node.loc.start.line + lineOffset)
          if (s.line === null) s.line = node.loc.start.line + lineOffset
          add(node, 'declaration', prop, `يعرّف متغير CSS (خاصية مخصصة) باسم «${prop}» وقيمته «${valueText}». يُقرأ عبر var(${prop}) في هذا العنصر وكل أبنائه.`, { term: 'css-var', symbol: s.id })
          return
        }
        let validity = ''
        let warn = false
        try {
          const m = csstree.lexer.matchProperty(prop, node.value)
          if (m.error) {
            warn = true
            validity = /Unknown property/i.test(m.error.message)
              ? ` تنبيه: «${prop}» ليست خاصية CSS معروفة — المتصفح سيتجاهل هذا التصريح. تحقّق من الإملاء.`
              : /var\(|env\(/.test(valueText) ? '' : ` تنبيه: القيمة «${valueText}» غير صالحة لهذه الخاصية حسب مواصفات CSS، لذلك سيتجاهل المتصفح هذا التصريح.`
            if (!validity) warn = false
          }
        } catch { /* لا نحكم إن تعذّر التحقق */ }
        add(node, 'declaration', `${prop}: ${valueText}`, `${term ? term.meaning : `الخاصية «${prop}».`}${node.important ? ' !important يرفع أولويتها فوق القواعد الأعلى خصوصية — استخدمه بحذر.' : ''}${validity}`, { term: term?.id, warn })
        // تفاصيل القيمة
        csstree.walk(node.value, (v) => {
          if (v.type === 'Dimension' && UNITS[v.unit.toLowerCase()]) add(v, 'value', `${v.value}${v.unit}`, `${v.unit}: ${UNITS[v.unit.toLowerCase()]}.`, { term: 'css-units' })
          else if (v.type === 'Percentage') add(v, 'value', `${v.value}%`, 'نسبة مئوية؛ المرجع يختلف حسب الخاصية (غالبًا أبعاد العنصر الأب).', { term: 'css-units' })
          else if (v.type === 'Hash') add(v, 'value', `#${v.value}`, `لون سداسي عشري: ${v.value.length <= 4 ? 'صيغة مختصرة، كل حرف يتكرر' : 'زوج لكل قناة: أحمر، أخضر، أزرق' + (v.value.length === 8 ? '، شفافية' : '')}.`, { term: 'css-color' })
          else if (v.type === 'Function') {
            const fname = v.name.toLowerCase()
            if (fname === 'var') {
              const first = v.children.first
              if (first && first.type === 'Identifier') { const s = sym(first.name, 'var'); s.refs.push({ line: v.loc.start.line + lineOffset, from: v.loc.start.offset + offset, to: v.loc.end.offset + offset }) }
            }
            if (FUNCS[fname]) add(v, 'value', `${fname}()`, `${FUNCS[fname]}.`, { term: fname === 'var' ? 'css-var' : undefined })
          } else if (v.type === 'Identifier') {
            const kw = KEYWORDS[prop]?.[v.name] || GLOBAL_KW[v.name.toLowerCase()]
            if (kw) add(v, 'value', v.name, `${kw}.`)
            if (prop === 'animation' || prop === 'animation-name') { const s = sym(v.name, 'keyframes'); s.refs.push({ line: v.loc.start.line + lineOffset, from: v.loc.start.offset + offset, to: v.loc.end.offset + offset }) }
          }
        })
      }
    },
  })

  for (const e of parseErrors) {
    items.push({ from: (e.offset ?? 0) + offset, to: (e.offset ?? 0) + offset + 1, line: (e.line ?? 1) + lineOffset, endLine: (e.line ?? 1) + lineOffset, kind: 'error', title: 'خطأ في الصياغة', text: `المحلّل واجه مشكلة: ${e.formattedMessage ? e.message : e.message}. المتصفحات تتجاهل الجزء الخاطئ وتكمل ما بعده، لذلك قد يبدو جزء من التنسيق «لا يعمل».`, warn: true })
  }

  for (const s of symbols) {
    if (s.kind === 'var' && !s.defs.length && s.refs.length) notes.add(`المتغير ${s.name} مستخدم لكنه غير معرّف في هذا الملف؛ قد يكون معرّفًا في ملف آخر، وإلا فلن تعمل var() إلا إن وُجدت قيمة احتياطية.`)
    if (s.kind === 'keyframes' && !s.defs.length && s.refs.length) notes.add(`الحركة «${s.name}» مستخدمة لكن لا يوجد @keyframes بهذا الاسم في هذا الملف.`)
  }
  notes.add('التحليل يشرح القواعد كما كُتبت. أي العناصر تطابقها فعلًا يعتمد على HTML الذي ستُطبّق عليه — جرّبها في المحرر أو مختبر CSS.')

  items.sort((a, b) => a.from - b.from || b.to - a.to)
  return { lang: 'css', items, symbols: symbols.map((s) => ({ ...s, line: s.line ?? s.refs[0]?.line ?? 0 })), notes: [...notes], error: null }
}

export { specificity, describeSelector }
