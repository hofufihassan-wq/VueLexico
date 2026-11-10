// شارح HTML: يحلّل المستند بالمحلّل parse5 (يطبّق خوارزمية HTML القياسية نفسها التي تستخدمها المتصفحات)
// مع مواقع المصدر، ويشرح كل عنصر وسمة، ويكشف أخطاء التحليل الحقيقية ومشاكل إتاحة الوصول الشائعة.
import { parse, parseFragment } from 'parse5'
import { htmlTagTerm, termById } from '../content/dictionary/index.js'
import { explainCss } from './css.js'
import { explainJs } from './js.js'

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const OPTIONAL_END = new Set(['html', 'head', 'body', 'p', 'li', 'dt', 'dd', 'option', 'optgroup', 'tr', 'td', 'th', 'thead', 'tbody', 'tfoot', 'colgroup', 'rt', 'rp', 'caption'])
const KNOWN_TAGS = new Set(('a abbr address area article aside audio b base bdi bdo blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd label legend li link main map mark menu meta meter nav noscript object ol optgroup option output p picture pre progress q rp rt ruby s samp script search section select slot small source span strong style sub summary sup table tbody td template textarea tfoot th thead time title tr track u ul var video wbr svg path circle rect line g polyline polygon text math').split(' '))

const ATTRS = {
  class: ['html-class', 'يصنّف العنصر بأسماء أصناف تُستخدم في CSS وJavaScript.'],
  id: ['html-id', 'معرّف فريد للعنصر في الصفحة.'],
  href: ['html-href', 'عنوان الوجهة.'],
  src: [null, 'مسار الملف المصدر (صورة، سكربت، وسائط).'],
  alt: ['html-alt', 'النص البديل للصورة (لإتاحة الوصول).'],
  type: [null, 'نوع العنصر: يغيّر سلوك input وbutton وscript.'],
  name: [null, 'اسم الحقل عند إرسال النموذج.'],
  value: [null, 'القيمة الابتدائية.'],
  placeholder: [null, 'نص تلميح يظهر في الحقل الفارغ (لا يغني عن label).'],
  for: ['html-label', 'يربط التسمية بالحقل صاحب المعرّف المذكور.'],
  required: [null, 'يجعل الحقل إلزاميًا قبل الإرسال (سمة منطقية: يكفي وجودها).'],
  disabled: [null, 'يعطّل العنصر فلا يمكن التفاعل معه (سمة منطقية).'],
  checked: [null, 'يجعل مربع الاختيار محددًا مبدئيًا.'],
  style: [null, 'تنسيق CSS مضمّن على هذا العنصر وحده — له أولوية عالية جدًا؛ يفضّل استخدام الأصناف.'],
  lang: [null, 'لغة المحتوى (مهمة للنطق في قارئات الشاشة).'],
  dir: [null, 'اتجاه النص: rtl من اليمين لليسار، ltr العكس.'],
  charset: ['html-meta', 'ترميز الأحرف؛ utf-8 ضروري للعربية.'],
  content: ['html-meta', 'قيمة البيانات الوصفية.'],
  rel: ['html-link', 'نوع العلاقة مع المورد المرتبط.'],
  target: ['html-a', 'أين يُفتح الرابط؛ _blank تبويب جديد.'],
  title: [null, 'نص تلميح يظهر عند التحويم (لا يعتمد عليه للمعلومات المهمة).'],
  width: [null, 'العرض بالبكسل (للصور والوسائط).'], height: [null, 'الارتفاع بالبكسل.'],
  action: ['html-form', 'العنوان الذي تُرسل إليه بيانات النموذج.'], method: ['html-form', 'طريقة الإرسال: get أو post.'],
  min: [null, 'أصغر قيمة مسموحة.'], max: [null, 'أكبر قيمة مسموحة.'], step: [null, 'مقدار الخطوة.'],
  rows: [null, 'عدد الأسطر المرئية.'], colspan: [null, 'عدد الأعمدة التي تمتد عليها الخلية.'],
  defer: ['html-script', 'يؤجل تنفيذ السكربت حتى ينتهي تحليل الصفحة.'], async: ['html-script', 'ينفّذ السكربت فور تحميله دون انتظار.'],
  role: [null, 'دور ARIA يصف وظيفة العنصر لتقنيات المساعدة.'], tabindex: [null, 'يتحكم في إمكانية الوصول للعنصر بمفتاح Tab.'],
  hidden: [null, 'يخفي العنصر (سمة منطقية).'], loading: [null, 'lazy يؤجل تحميل الصورة حتى تقترب من الظهور.'],
}

const PARSE_ERRORS = {
  'end-tag-without-matching-open-element': 'وسم إغلاق لا يقابله وسم فتح مفتوح — قد يكون زائدًا أو بترتيب خاطئ.',
  'closing-of-element-with-open-child-elements': 'أُغلق عنصر بينما أحد أبنائه ما زال مفتوحًا — تحقّق من ترتيب الإغلاق.',
  'duplicate-attribute': 'السمة نفسها مكررة على العنصر؛ المتصفح يأخذ الأولى ويتجاهل الباقي.',
  'missing-whitespace-between-attributes': 'لا توجد مسافة بين سمتين.',
  'missing-attribute-value': 'سمة بعدها = بلا قيمة.',
  'unexpected-character-in-attribute-name': 'حرف غير متوقع في اسم سمة (ربما علامة اقتباس ناقصة).',
  'unexpected-character-in-unquoted-attribute-value': 'حرف غير مسموح في قيمة سمة غير محاطة بعلامات اقتباس.',
  'eof-in-tag': 'انتهى الملف في منتصف وسم لم يُغلق بـ >.',
  'missing-doctype': 'المستند لا يبدأ بـ <!DOCTYPE html>، فقد يعمل المتصفح في وضع التوافق القديم.',
  'non-void-html-element-start-tag-with-trailing-solidus': 'الشرطة المائلة /> لا تُغلق العناصر غير الفارغة في HTML؛ العنصر ما زال مفتوحًا.',
  'abrupt-closing-of-empty-comment': 'تعليق مغلق بشكل غير صحيح.',
  'eof-in-comment': 'تعليق لم يُغلق بـ -->.',
  'misplaced-doctype': 'تصريح DOCTYPE في غير مكانه؛ يجب أن يكون أول سطر.',
  'misplaced-start-tag-for-head-element': 'وسم head في غير مكانه.',
  'nested-noscript-in-head': 'noscript متداخل في head.',
  'unexpected-solidus-in-tag': 'شرطة مائلة غير متوقعة داخل الوسم.',
  'disallowed-content-in-noscript-in-head': 'محتوى غير مسموح.',
}

const lineAt = (code, off) => { let n = 1; for (let i = 0; i < off && i < code.length; i++) if (code.charCodeAt(i) === 10) n++; return n }

export function explainHtml(code, opts = {}) {
  const offset = opts.offset || 0
  const lineOffset = opts.lineOffset || 0
  const isDoc = /<!doctype|<html[\s>]|<head[\s>]|<body[\s>]/i.test(code)
  const errors = []
  const tree = (isDoc ? parse : parseFragment)(code, { sourceCodeLocationInfo: true, onParseError: (e) => errors.push(e) })
  const items = []
  const notes = new Set()
  const symbols = []
  const ids = new Map()
  const labelsFor = []
  const anchors = []
  let h1Count = 0
  const tagCounts = {}

  const at = (s, e) => ({ from: s + offset, to: e + offset, line: lineAt(code, s) + lineOffset, endLine: lineAt(code, e) + lineOffset })
  const add = (s, e, kind, title, text, extra = {}) => items.push({ ...at(s, e), kind, title, text, ...extra })
  const nested = []
  const consumedEnd = new Set()
  const rawRanges = [] // تعليقات ومحتوى script/style لا نبحث فيها عن وسوم

  function visit(node, parent, depth) {
    const loc = node.sourceCodeLocation
    if (node.nodeName === '#documentType' && loc) {
      add(loc.startOffset, loc.endOffset, 'doctype', '<!DOCTYPE html>', termById['html-doctype'].explain, { term: 'html-doctype' })
    } else if (node.nodeName === '#comment' && loc) {
      rawRanges.push([loc.startOffset, loc.endOffset])
      add(loc.startOffset, loc.endOffset, 'comment', 'تعليق', 'ملاحظة للمبرمجين؛ المتصفح لا يعرضها في الصفحة (لكنها تظهر لمن يفتح الكود المصدري).')
    } else if (node.nodeName === '#text' && loc) {
      const t = node.value.trim()
      if (t && !['style', 'script'].includes(parent?.tagName)) add(loc.startOffset, loc.endOffset, 'text', 'نص', `نص يظهر للمستخدم داخل <${parent?.tagName || 'الصفحة'}>. المسافات والأسطر المتعددة تُعرض كمسافة واحدة.`)
    } else if (node.tagName && loc) {
      const tag = node.tagName
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
      const st = loc.startTag || loc
      const term = htmlTagTerm(tag)
      const kids = (node.childNodes || []).filter((c) => c.tagName)
      let text = term ? `${term.meaning} ${term.explain}` : KNOWN_TAGS.has(tag) ? `عنصر HTML قياسي <${tag}>.` : tag.includes('-') ? 'عنصر مخصص (Custom Element) — يحتاج إلى تعريف بـ JavaScript ليكون له سلوك.' : `«${tag}» ليس عنصرًا معروفًا في HTML القياسي؛ المتصفح سيعامله كعنصر عام بلا معنى (HTMLUnknownElement). تحقّق من الإملاء.`
      if (parent?.tagName && !['html'].includes(parent.tagName)) text += ` يقع داخل <${parent.tagName}>.`
      if (kids.length) text += ` يحتوي على ${kids.length} ${kids.length === 1 ? 'عنصر ابن' : 'عناصر أبناء'}: ${[...new Set(kids.map((k) => `<${k.tagName}>`))].slice(0, 5).join(' ')}.`
      if (VOID.has(tag)) text += ' عنصر فارغ: ليس له وسم إغلاق.'
      const warn = !term && !KNOWN_TAGS.has(tag) && !tag.includes('-')
      add(loc.startOffset, loc.endOffset, 'element', `<${tag}>`, text, { term: term?.id, warn, depth })
      add(st.startOffset, st.endOffset, 'tag', `وسم فتح <${tag}>`, `بداية العنصر <${tag}>${node.attrs.length ? ` مع ${node.attrs.length} ${node.attrs.length === 1 ? 'سمة' : 'سمات'}` : ''}.`, { term: term?.id })
      if (loc.endTag) consumedEnd.add(loc.endTag.startOffset)
      if (['script', 'style', 'textarea', 'title'].includes(tag) && loc.startTag && loc.endTag) rawRanges.push([loc.startTag.endOffset, loc.endTag.startOffset])
      if (loc.endTag) add(loc.endTag.startOffset, loc.endTag.endOffset, 'tag', `وسم إغلاق </${tag}>`, `نهاية العنصر <${tag}> الذي بدأ في السطر ${lineAt(code, st.startOffset) + lineOffset}.`, { rel: [{ line: lineAt(code, st.startOffset) + lineOffset, label: 'وسم الفتح' }] })
      else if (!VOID.has(tag) && !OPTIONAL_END.has(tag)) add(st.startOffset, st.endOffset, 'note', `<${tag}> بلا إغلاق`, `لم يُكتب </${tag}> صراحة، فأغلقه المتصفح تلقائيًا في موضع قد لا يكون ما تقصده.`, { warn: true })

      for (const a of node.attrs) {
        const aloc = loc.attrs?.[a.name]
        if (!aloc) continue
        let [t, desc] = ATTRS[a.name] || [null, null]
        if (!desc) {
          if (/^on/.test(a.name)) desc = `معالج حدث مضمّن: ينفّذ كود JavaScript عند حدث ${a.name.slice(2)}. يفضّل addEventListener في ملف JS منفصل.`
          else if (/^data-/.test(a.name)) desc = 'سمة بيانات مخصصة؛ تُقرأ في JavaScript عبر element.dataset.'
          else if (/^aria-/.test(a.name)) desc = 'سمة ARIA لإتاحة الوصول: تصف العنصر لتقنيات المساعدة.'
          else desc = `السمة «${a.name}».`
        }
        add(aloc.startOffset, aloc.endOffset, 'attribute', `${a.name}="${a.value.length > 30 ? a.value.slice(0, 29) + '…' : a.value}"`, desc, { term: t || undefined })
        if (a.name === 'id') {
          if (!ids.has(a.value)) ids.set(a.value, { id: symbols.length, name: '#' + a.value, kind: 'id', line: aloc.startLine + lineOffset, refs: [], writes: [], defs: [] })
          const s = ids.get(a.value)
          s.defs.push(aloc.startLine + lineOffset)
        }
        if (a.name === 'for' && tag === 'label') labelsFor.push({ value: a.value, line: aloc.startLine + lineOffset, from: aloc.startOffset + offset, to: aloc.endOffset + offset })
        if (a.name === 'href' && tag === 'a' && a.value.startsWith('#') && a.value.length > 1) anchors.push({ value: a.value.slice(1), line: aloc.startLine + lineOffset, from: aloc.startOffset + offset, to: aloc.endOffset + offset })
      }

      // فحوص إتاحة الوصول الشائعة
      const attr = (n) => node.attrs.find((a) => a.name === n)
      if (tag === 'img' && !attr('alt')) add(st.startOffset, st.endOffset, 'note', 'صورة بلا alt', 'الصورة بلا نص بديل: قارئات الشاشة ستقرأ اسم الملف أو تتجاهلها. أضف alt يصف الصورة، أو alt="" إن كانت زخرفية.', { warn: true, term: 'html-alt' })
      if (tag === 'h1') h1Count++
      if (tag === 'input' && !['hidden', 'submit', 'button', 'reset'].includes(attr('type')?.value)) {
        const wrapped = (() => { let p = parent; while (p) { if (p.tagName === 'label') return true; p = p.parentNode } return false })()
        if (!wrapped && !attr('aria-label') && !attr('aria-labelledby')) node.__needsLabel = { id: attr('id')?.value, s: st.startOffset, e: st.endOffset }
        if (node.__needsLabel) nested.push(node.__needsLabel)
      }
      if (tag === 'a' && attr('target')?.value === '_blank') add(st.startOffset, st.endOffset, 'note', 'target="_blank"', 'يفتح الرابط في تبويب جديد. من الأفضل إخبار المستخدم بذلك في نص الرابط.')
      if ((tag === 'div' || tag === 'span') && node.attrs.some((a) => a.name === 'onclick')) add(st.startOffset, st.endOffset, 'note', 'عنصر قابل للنقر غير دلالي', `<${tag}> مع onclick لا يعمل بلوحة المفاتيح ولا تعرفه قارئات الشاشة كزر. استخدم <button>.`, { warn: true, term: 'html-button' })

      if (tag === 'style') {
        const txt = node.childNodes[0]
        if (txt?.sourceCodeLocation) {
          const s = txt.sourceCodeLocation.startOffset
          const r = explainCss(txt.value, { offset: s + offset, lineOffset: lineAt(code, s) - 1 + lineOffset })
          items.push(...r.items); r.notes.forEach((n) => notes.add(n))
        }
      }
      if (tag === 'script' && !attr('src')) {
        const txt = node.childNodes[0]
        if (txt?.sourceCodeLocation) {
          const s = txt.sourceCodeLocation.startOffset
          const r = explainJs(txt.value, { offset: s + offset, lineOffset: lineAt(code, s) - 1 + lineOffset })
          if (r.error) items.push({ from: r.error.from, to: r.error.from + 1, line: r.error.line, endLine: r.error.line, kind: 'error', title: 'خطأ في السكربت', text: `${r.error.message}: ${r.error.detail}`, warn: true })
          items.push(...r.items)
        }
      }
    }
    const children = node.tagName === 'template' && node.content ? node.content.childNodes : node.childNodes
    if (children) for (const c of children) visit(c, node.tagName ? node : parent, node.tagName ? depth + 1 : depth)
  }
  visit(tree, null, 0)

  // العلاقات: label[for] ← → #id و a[href=#id] ← → #id
  for (const lf of labelsFor) {
    const s = ids.get(lf.value)
    if (s) { s.refs.push({ line: lf.line, from: lf.from, to: lf.to }); items.push({ from: lf.from, to: lf.to, line: lf.line, endLine: lf.line, kind: 'relation', title: `for → #${lf.value}`, text: `التسمية مرتبطة بالحقل ذي المعرّف «${lf.value}» في السطر ${s.line}. النقر عليها يركّز ذلك الحقل.`, rel: [{ line: s.line, label: 'الحقل' }], symbol: s.id }) }
    else items.push({ from: lf.from, to: lf.to, line: lf.line, endLine: lf.line, kind: 'note', title: 'ربط مكسور', text: `لا يوجد عنصر بالمعرّف «${lf.value}» في هذا الكود، فالتسمية غير مرتبطة بأي حقل.`, warn: true })
  }
  for (const an of anchors) {
    const s = ids.get(an.value)
    if (s) s.refs.push({ line: an.line, from: an.from, to: an.to })
    else items.push({ from: an.from, to: an.to, line: an.line, endLine: an.line, kind: 'note', title: 'رابط داخلي مكسور', text: `الرابط يشير إلى #${an.value} لكن لا يوجد عنصر بهذا المعرّف في الكود المعروض.`, warn: true })
  }
  const labeledIds = new Set(labelsFor.map((l) => l.value))
  for (const n of nested) {
    if (n.id && labeledIds.has(n.id)) continue
    items.push({ ...at(n.s, n.e), kind: 'note', title: 'حقل بلا تسمية', text: 'حقل الإدخال غير مرتبط بعنصر <label> (لا for مطابق ولا تغليف). أضف تسمية مرئية مرتبطة بالحقل؛ placeholder لا يكفي.', warn: true, term: 'html-label' })
  }
  for (const [v, s] of ids) {
    symbols.push(s)
    s.id = symbols.length - 1
    if (s.defs.length > 1) notes.add(`المعرّف «${v}» مكرر في الأسطر ${s.defs.join('، ')}؛ يجب أن يكون id فريدًا.`)
  }
  if (h1Count > 1) notes.add(`يوجد ${h1Count} عناوين h1؛ الأفضل عادة عنوان رئيسي واحد للصفحة.`)

  // وسوم إغلاق لم تستهلكها شجرة التحليل الحقيقية = تجاهلها المتصفح
  const endRe = /<\/([a-zA-Z][\w-]*)\s*>/g
  let m
  while ((m = endRe.exec(code))) {
    const off = m.index
    if (consumedEnd.has(off) || rawRanges.some(([a, b]) => off >= a && off < b)) continue
    const tag = m[1].toLowerCase()
    if (['html', 'head', 'body'].includes(tag)) continue
    items.push({ ...at(off, off + m[0].length), kind: 'error', title: `</${tag}> بلا فتح مطابق`, text: `وسم الإغلاق </${tag}> لا يقابله عنصر <${tag}> مفتوح في هذا الموضع، لذلك تجاهله المتصفح تمامًا. ربما الوسم مكتوب خطأً أو ترتيب الإغلاق غير صحيح (الرمز القياسي: end-tag-without-matching-open-element).`, warn: true })
  }

  for (const e of errors) {
    const desc = PARSE_ERRORS[e.code]
    if (!desc) continue
    if (e.code === 'missing-doctype' && !isDoc) continue
    items.push({ from: e.startOffset + offset, to: Math.max(e.endOffset, e.startOffset + 1) + offset, line: e.startLine + lineOffset, endLine: (e.endLine || e.startLine) + lineOffset, kind: 'error', title: 'ملاحظة من محلّل HTML', text: `${desc} (الرمز القياسي: ${e.code})`, warn: true })
  }
  notes.add('HTML متسامح: المتصفح يصحّح كثيرًا من الأخطاء تلقائيًا بدل أن يتوقف، لذلك قد «تعمل» الصفحة رغم وجود أخطاء — والنتيجة قد تختلف عما قصدته.')

  items.sort((a, b) => a.from - b.from || b.to - a.to)
  return { lang: 'html', items, symbols, notes: [...notes], error: null, stats: tagCounts }
}
