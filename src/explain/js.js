// شارح JavaScript: تحليل ثابت (دون تنفيذ) يعتمد على شجرة AST من acorn.
// يحلّ أسماء المتغيرات حسب النطاق الحقيقي (كتلة/دالة/عام) ليربط كل استخدام بتعريفه.
// مبدأ الدقة: إذا لم نستطع معرفة شيء من الكود وحده (مثل نوع قيمة قادمة من الخارج) نقول ذلك صراحة.
import { parseJs } from '../engine/instrument.js'
import { explainError } from '../engine/errors.js'
import { termById } from '../content/dictionary/index.js'

const KNOWN_GLOBALS = {
  document: 'كائن المستند: يمثّل الصفحة الحالية (DOM) ويتيح البحث عن العناصر وإنشاءها.',
  window: 'كائن النافذة العام في المتصفح.',
  console: 'كائن الطرفية لطباعة الرسائل لأغراض الفحص.',
  Math: 'كائن مدمج فيه دوال وثوابت رياضية.',
  JSON: 'كائن مدمج لتحويل القيم من وإلى نص JSON.',
  Date: 'صنف مدمج للتواريخ والأوقات.',
  Array: 'صنف المصفوفات المدمج.', Object: 'الصنف الأساسي لكل الكائنات.', Number: 'دالة/صنف الأعداد.', String: 'دالة/صنف النصوص.', Boolean: 'دالة/صنف القيم المنطقية.',
  Promise: 'صنف الوعود المدمج.', Map: 'صنف الخرائط (مفتاح ← قيمة).', Set: 'صنف المجموعات (قيم فريدة).', Error: 'صنف الأخطاء.', Symbol: 'دالة إنشاء الرموز الفريدة.',
  setTimeout: 'دالة مدمجة تجدول تنفيذ دالة بعد مدة.', setInterval: 'دالة مدمجة تكرر تنفيذ دالة كل مدة.', clearTimeout: 'تلغي مؤقتًا.', clearInterval: 'تلغي مؤقتًا متكررًا.',
  localStorage: 'التخزين المحلي الدائم في المتصفح.', fetch: 'دالة مدمجة لطلبات الشبكة.', alert: 'تعرض رسالة منبثقة.', prompt: 'تطلب إدخالًا من المستخدم.', confirm: 'تطلب تأكيدًا من المستخدم.',
  parseInt: 'تحوّل نصًا إلى عدد صحيح.', parseFloat: 'تحوّل نصًا إلى عدد عشري.', isNaN: 'تفحص هل القيمة NaN.',
  undefined: 'القيمة undefined.', NaN: 'قيمة «ليس عددًا».', Infinity: 'قيمة اللانهاية.', globalThis: 'الكائن العام.', navigator: 'معلومات المتصفح.', location: 'عنوان الصفحة الحالي.',
  queueMicrotask: 'تجدول مهمة دقيقة.', structuredClone: 'تنسخ قيمة نسخًا عميقًا.', requestAnimationFrame: 'تجدول دالة قبل الرسم التالي.', Intl: 'أدوات التنسيق الدولي (أرقام وتواريخ).', RegExp: 'صنف التعابير النمطية.',
}

// دوال ومعرّفات Vue المعروفة (عند استيرادها من 'vue')
const VUE_API = {
  ref: ['vue-ref', 'ينشئ مرجعًا تفاعليًا. تُقرأ قيمته وتُعدّل عبر .value في JavaScript، وتُكتب مباشرة في القالب.'],
  reactive: ['vue-reactive', 'يحوّل الكائن إلى كائن تفاعلي تُقرأ خصائصه مباشرة.'],
  computed: ['vue-computed', 'ينشئ قيمة محسوبة تُعاد حسابها تلقائيًا عند تغيّر القيم التفاعلية التي تعتمد عليها.'],
  watch: ['vue-watch', 'يراقب مصدرًا تفاعليًا وينفّذ الدالة عند تغيّره.'],
  watchEffect: ['vue-watch', 'ينفّذ الدالة فورًا ثم يعيد تنفيذها كلما تغيّر أي مصدر تفاعلي تقرؤه.'],
  onMounted: ['vue-lifecycle', 'يسجّل دالة تُنفَّذ بعد تركيب المكوّن في الصفحة.'],
  onUnmounted: ['vue-lifecycle', 'يسجّل دالة تُنفَّذ عند إزالة المكوّن (مناسب للتنظيف).'],
  onUpdated: ['vue-lifecycle', 'يسجّل دالة تُنفَّذ بعد كل تحديث للـ DOM.'],
  nextTick: ['vue-nexttick', 'ينتظر حتى يطبّق Vue تحديثات DOM المعلّقة.'],
  createApp: ['vue-createapp', 'ينشئ تطبيق Vue.'],
  defineProps: ['vue-props', 'ماكرو المترجم: يعرّف الخصائص التي يستقبلها المكوّن من الأب. لا يحتاج إلى استيراد.'],
  defineEmits: ['vue-emits', 'ماكرو المترجم: يعرّف الأحداث التي يطلقها المكوّن. لا يحتاج إلى استيراد.'],
  defineModel: ['vue-v-model', 'ماكرو المترجم: يعرّف خاصية تعمل مع v-model على هذا المكوّن.'],
}

// طرق معروفة: [الاسم] → [النوع المفترض، الشرح، معرّف القاموس]
const METHODS = {
  log: ['console', 'يطبع القيم في الطرفية لأغراض الفحص، ولا يُرجع قيمة.', 'js-console-log'],
  warn: ['console', 'يطبع تحذيرًا في الطرفية.', 'js-console-log'],
  error: ['console', 'يطبع رسالة خطأ في الطرفية.', 'js-console-log'],
  querySelector: ['document/element', 'يبحث عن أول عنصر يطابق محدِّد CSS ويُرجعه، أو null إن لم يجده.', 'js-queryselector'],
  querySelectorAll: ['document/element', 'يُرجع كل العناصر المطابقة للمحدِّد في NodeList.', 'js-queryselector'],
  getElementById: ['document', 'يُرجع العنصر صاحب المعرّف id المحدد، أو null.', 'js-queryselector'],
  addEventListener: ['element', 'يسجّل دالة تُستدعى كلما وقع الحدث المذكور على هذا الهدف.', 'js-addeventlistener'],
  removeEventListener: ['element', 'يلغي تسجيل مستمع حدث سابق.', 'js-addeventlistener'],
  preventDefault: ['event', 'يمنع السلوك الافتراضي للحدث (مثل إعادة تحميل الصفحة عند إرسال النموذج).', 'js-preventdefault'],
  createElement: ['document', 'ينشئ عنصرًا جديدًا في الذاكرة (لا يظهر حتى يُضاف للصفحة).', 'js-createelement'],
  append: ['element', 'يضيف عقدًا أو نصوصًا في نهاية أبناء العنصر.', 'js-createelement'],
  appendChild: ['element', 'يضيف عقدة واحدة في نهاية أبناء العنصر.', 'js-createelement'],
  remove: ['element/classList', 'يحذف العنصر من الصفحة (أو يحذف صنفًا إن استُدعي على classList).', null],
  toggle: ['classList', 'يضيف الصنف إن لم يكن موجودًا ويحذفه إن كان موجودًا.', 'js-classlist'],
  add: ['classList/Set', 'يضيف صنفًا (classList) أو قيمة (Set).', 'js-classlist'],
  contains: ['classList', 'يُرجع true إن كان الصنف موجودًا.', 'js-classlist'],
  map: ['array', 'تُنشئ مصفوفة جديدة بتطبيق الدالة على كل عنصر.', 'js-map'],
  filter: ['array', 'تُنشئ مصفوفة جديدة بالعناصر التي تحقق الشرط.', 'js-filter'],
  reduce: ['array', 'تختزل العناصر إلى قيمة واحدة عبر مُجمِّع.', 'js-reduce'],
  forEach: ['array', 'تستدعي الدالة لكل عنصر ولا تُرجع شيئًا.', 'js-foreach'],
  find: ['array', 'تُرجع أول عنصر يحقق الشرط أو undefined.', 'js-find'],
  findIndex: ['array', 'تُرجع موقع أول عنصر يحقق الشرط أو -1.', 'js-find'],
  some: ['array', 'تُرجع true إن حقق عنصر واحد على الأقل الشرط.', null],
  every: ['array', 'تُرجع true إن حققت كل العناصر الشرط.', null],
  push: ['array', 'تضيف عناصر في نهاية المصفوفة (تعدّلها نفسها) وتُرجع الطول الجديد.', 'js-push'],
  pop: ['array', 'تحذف آخر عنصر وتُرجعه.', 'js-push'],
  shift: ['array', 'تحذف أول عنصر وتُرجعه.', 'js-push'],
  unshift: ['array', 'تضيف عناصر في بداية المصفوفة.', 'js-push'],
  splice: ['array', 'تحذف أو تُدرج عناصر في موضع محدد (تعدّل المصفوفة نفسها).', 'js-push'],
  slice: ['array/string', 'تُرجع جزءًا منسوخًا دون تعديل الأصل.', null],
  includes: ['array/string', 'تُرجع true إن وُجدت القيمة.', null],
  indexOf: ['array/string', 'تُرجع موقع القيمة أو -1.', null],
  join: ['array', 'تدمج العناصر في نص واحد بفاصل.', null],
  sort: ['array', 'ترتّب المصفوفة نفسها. بدون دالة مقارنة ترتّب كنصوص (لذلك 10 قبل 9).', null],
  reverse: ['array', 'تعكس ترتيب المصفوفة نفسها.', null],
  concat: ['array/string', 'تُرجع دمجًا جديدًا دون تعديل الأصل.', null],
  at: ['array/string', 'تُرجع العنصر في الموقع المحدد؛ الأرقام السالبة تعدّ من النهاية.', null],
  toUpperCase: ['string', 'تُرجع نسخة بأحرف كبيرة.', 'js-string'],
  toLowerCase: ['string', 'تُرجع نسخة بأحرف صغيرة.', 'js-string'],
  trim: ['string', 'تُرجع نسخة بلا مسافات في البداية والنهاية.', 'js-string'],
  split: ['string', 'تقسم النص إلى مصفوفة حسب الفاصل.', 'js-string'],
  replace: ['string', 'تُرجع نصًا جديدًا باستبدال أول تطابق.', 'js-string'],
  replaceAll: ['string', 'تُرجع نصًا جديدًا باستبدال كل التطابقات.', 'js-string'],
  startsWith: ['string', 'تُرجع true إن بدأ النص بالقيمة.', 'js-string'],
  padStart: ['string', 'تُكمل النص من البداية حتى طول معين.', 'js-string'],
  toFixed: ['number', 'تُرجع نصًا للعدد بعدد محدد من المنازل العشرية.', 'js-number'],
  toString: ['any', 'تُرجع تمثيلًا نصيًا للقيمة.', null],
  stringify: ['JSON', 'تحوّل القيمة إلى نص JSON.', 'js-json'],
  parse: ['JSON', 'تحوّل نص JSON إلى قيمة.', 'js-json'],
  keys: ['Object', 'تُرجع مصفوفة بمفاتيح الكائن.', 'js-object'],
  values: ['Object', 'تُرجع مصفوفة بقيم الكائن.', 'js-object'],
  entries: ['Object', 'تُرجع مصفوفة بأزواج [مفتاح، قيمة].', 'js-object'],
  getItem: ['localStorage', 'تقرأ نصًا محفوظًا بالمفتاح، أو null.', 'js-localstorage'],
  setItem: ['localStorage', 'تحفظ نصًا بمفتاح (القيم غير النصية تُحوَّل لنص).', 'js-localstorage'],
  removeItem: ['localStorage', 'تحذف المفتاح المحفوظ.', 'js-localstorage'],
  then: ['promise', 'تسجّل دالة تُنفَّذ عند إنجاز الوعد، وتُرجع وعدًا جديدًا.', 'js-promise'],
  catch: ['promise', 'تسجّل دالة تُنفَّذ عند رفض الوعد.', 'js-promise'],
  finally: ['promise', 'تسجّل دالة تُنفَّذ في الحالتين.', 'js-promise'],
  json: ['response', 'تقرأ جسم الاستجابة وتحوّله من JSON (تُرجع Promise).', 'js-fetch'],
  random: ['Math', 'تُرجع عددًا عشوائيًا بين 0 (مشمول) و1 (غير مشمول).', null],
  floor: ['Math', 'تقرّب العدد للأسفل.', null], ceil: ['Math', 'تقرّب العدد للأعلى.', null], round: ['Math', 'تقرّب العدد لأقرب عدد صحيح.', null],
  max: ['Math', 'تُرجع أكبر قيمة.', null], min: ['Math', 'تُرجع أصغر قيمة.', null], abs: ['Math', 'تُرجع القيمة المطلقة.', null],
  isArray: ['Array', 'تُرجع true إن كانت القيمة مصفوفة.', 'js-array'],
  from: ['Array', 'تنشئ مصفوفة من شيء قابل للتكرار.', 'js-array'],
  setAttribute: ['element', 'تضبط قيمة سمة على العنصر.', 'html-attribute'],
  getAttribute: ['element', 'تقرأ قيمة سمة من العنصر.', 'html-attribute'],
  focus: ['element', 'تنقل التركيز إلى العنصر.', null],
}

const PROPS = {
  length: 'عدد العناصر (في المصفوفة) أو عدد الحروف (في النص).',
  textContent: 'النص الموجود داخل العنصر.',
  innerHTML: 'محتوى العنصر كـ HTML (احذر استخدامه مع مدخلات المستخدم).',
  value: 'القيمة الحالية لحقل الإدخال (نص دائمًا في input) — أو قيمة ref في Vue.',
  classList: 'قائمة أصناف العنصر مع دوال add/remove/toggle.',
  style: 'الأنماط المضمّنة للعنصر (style="").',
  target: 'العنصر الذي وقع عليه الحدث.',
  key: 'المفتاح المضغوط في حدث لوحة المفاتيح.',
  checked: 'حالة مربع الاختيار (true/false).',
  dataset: 'سمات data-* المخصصة على العنصر.',
  ok: 'true إن كانت حالة استجابة HTTP بين 200 و299.',
  PI: 'الثابت π.',
}

const OPS = {
  '===': 'مساواة صارمة: صحيح إن تساوت القيمة والنوع معًا.',
  '!==': 'عدم مساواة صارمة.',
  '==': 'مساواة مع تحويل ضمني للأنواع — يُفضّل === لتجنّب النتائج المفاجئة.',
  '!=': 'عدم مساواة مع تحويل ضمني — يُفضّل !==.',
  '+': 'جمع الأعداد، أو دمج النصوص إن كان أحد الطرفين نصًا.',
  '-': 'طرح.', '*': 'ضرب.', '/': 'قسمة.', '%': 'باقي القسمة (مفيد لمعرفة الزوجي: n % 2 === 0).', '**': 'رفع للقوة.',
  '<': 'أصغر من.', '>': 'أكبر من.', '<=': 'أصغر من أو يساوي.', '>=': 'أكبر من أو يساوي.',
  '&&': 'و المنطقية: يُرجع الطرف الأول إن كان كاذبًا، وإلا الطرف الثاني.',
  '||': 'أو المنطقية: يُرجع الطرف الأول إن كان صادقًا، وإلا الطرف الثاني (شائع لقيمة افتراضية).',
  '??': 'دمج القيم الفارغة: يُرجع الطرف الثاني فقط إن كان الأول null أو undefined (بعكس || لا يتجاهل 0 و"").',
  instanceof: 'يفحص هل الكائن مُنشأ من صنف معين.', in: 'يفحص وجود مفتاح في كائن.',
}

const ASSIGN = {
  '=': 'يُسند القيمة على اليمين إلى ما على اليسار.',
  '+=': 'يضيف القيمة إلى القيمة الحالية (x += 2 تعني x = x + 2).',
  '-=': 'يطرح من القيمة الحالية.', '*=': 'يضرب القيمة الحالية.', '/=': 'يقسم القيمة الحالية.', '%=': 'يضع باقي القسمة.',
  '||=': 'يُسند فقط إن كانت القيمة الحالية كاذبة.', '&&=': 'يُسند فقط إن كانت القيمة الحالية صادقة.', '??=': 'يُسند فقط إن كانت القيمة الحالية null أو undefined.',
}

const KIND_LABEL = { const: 'ثابت (const)', let: 'متغير (let)', var: 'متغير (var)', function: 'دالة', class: 'صنف', param: 'معامل دالة', catch: 'متغير الخطأ في catch', import: 'استيراد' }

function src(code, n) { return code.slice(n.start, n.end) }
function short(s, max = 40) { s = s.replace(/\s+/g, ' ').trim(); return s.length > max ? s.slice(0, max - 1) + '…' : s }

class Scope {
  constructor(parent, kind, node) { this.parent = parent; this.kind = kind; this.node = node; this.names = new Map() }
  lookup(name) { let s = this; while (s) { if (s.names.has(name)) return s.names.get(name); s = s.parent } return null }
  fnScope() { let s = this; while (s.kind !== 'function' && s.kind !== 'global') s = s.parent; return s }
}

function patternIds(p, out = []) {
  if (!p) return out
  switch (p.type) {
    case 'Identifier': out.push(p); break
    case 'ObjectPattern': for (const pr of p.properties) patternIds(pr.type === 'RestElement' ? pr.argument : pr.value, out); break
    case 'ArrayPattern': for (const e of p.elements) patternIds(e, out); break
    case 'RestElement': patternIds(p.argument, out); break
    case 'AssignmentPattern': patternIds(p.left, out); break
  }
  return out
}

/**
 * @param {string} code
 * @param {{ lineOffset?: number, offset?: number, vueBindings?: object, sourceType?: string }} opts
 */
export function explainJs(code, opts = {}) {
  const lineOffset = opts.lineOffset || 0
  const offset = opts.offset || 0
  let ast
  try {
    ast = parseJs(code, opts.sourceType === 'module' ? { sourceType: 'module' } : (/^\s*(import|export)\s/m.test(code) ? { sourceType: 'module' } : {}))
  } catch (e) {
    const info = explainError({ name: 'SyntaxError', message: e.message.replace(/\s*\(\d+:\d+\)$/, '') })
    return { lang: 'js', items: [], symbols: [], notes: [], error: { message: info.title, detail: `${info.explain} ${info.hint}`, raw: e.message, line: (e.loc?.line ?? 1) + lineOffset, from: (e.pos ?? 0) + offset } }
  }

  const items = []
  const symbols = []
  const notes = new Set()
  const unknownCalls = new Set()
  const vueImports = new Set()

  const L = (n) => n.loc.start.line + lineOffset
  const add = (node, kind, title, text, extra = {}) => {
    items.push({ from: node.start + offset, to: node.end + offset, line: L(node), endLine: node.loc.end.line + lineOffset, kind, title, text, ...extra })
  }

  const declare = (scope, idNode, kind, extra = {}) => {
    const sym = { id: symbols.length, name: idNode.name, kind, line: L(idNode), from: idNode.start + offset, to: idNode.end + offset, refs: [], writes: [], ...extra }
    symbols.push(sym)
    scope.names.set(idNode.name, sym)
    return sym
  }

  // رفع التصريحات: نسجّل الأسماء قبل المرور على الجمل حتى تعمل الإشارات المتقدمة (hoisting)
  function hoistBlock(stmts, scope) {
    for (const s of stmts) {
      const d = s.type === 'ExportNamedDeclaration' || s.type === 'ExportDefaultDeclaration' ? s.declaration : s
      if (!d) continue
      if (d.type === 'VariableDeclaration' && d.kind !== 'var') for (const dec of d.declarations) for (const id of patternIds(dec.id)) declare(scope, id, d.kind, { init: dec.init })
      if (d.type === 'FunctionDeclaration' && d.id) declare(scope, d.id, 'function', { params: d.params.map((p) => src(code, p)), node: d })
      if (d.type === 'ClassDeclaration' && d.id) declare(scope, d.id, 'class')
      if (s.type === 'ImportDeclaration') {
        for (const sp of s.specifiers) {
          const imported = sp.imported ? (sp.imported.name ?? sp.imported.value) : 'default'
          declare(scope, sp.local, 'import', { module: s.source.value, imported })
          if (s.source.value === 'vue') vueImports.add(sp.local.name)
        }
      }
    }
  }
  function hoistVars(node, scope) {
    const visit = (n) => {
      if (!n || typeof n !== 'object') return
      if (Array.isArray(n)) { n.forEach(visit); return }
      if (typeof n.type !== 'string') return
      if (/Function/.test(n.type) || n.type === 'ClassDeclaration' || n.type === 'ClassExpression') return
      if (n.type === 'VariableDeclaration' && n.kind === 'var') for (const dec of n.declarations) for (const id of patternIds(dec.id)) if (!scope.names.has(id.name)) declare(scope, id, 'var', { init: dec.init })
      for (const k in n) if (k !== 'loc') { const v = n[k]; if (v && typeof v === 'object') visit(v) }
    }
    visit(node)
  }

  const typeOfInit = (init) => {
    if (!init) return null
    switch (init.type) {
      case 'ArrayExpression': return 'array'
      case 'ObjectExpression': return 'object'
      case 'TemplateLiteral': return 'string'
      case 'Literal': return typeof init.value === 'string' ? 'string' : typeof init.value === 'number' ? 'number' : typeof init.value === 'boolean' ? 'boolean' : init.value === null ? 'null' : init.regex ? 'regexp' : null
      case 'ArrowFunctionExpression': case 'FunctionExpression': return 'function'
      case 'NewExpression': return init.callee.type === 'Identifier' ? `new ${init.callee.name}` : null
      case 'CallExpression': {
        const c = init.callee
        if (c.type === 'MemberExpression' && !c.computed) {
          const m = c.property.name
          if (m === 'querySelector' || m === 'getElementById' || m === 'createElement') return 'element'
          if (m === 'querySelectorAll') return 'nodelist'
          if (['map', 'filter', 'slice', 'concat', 'split', 'keys', 'values', 'entries', 'from'].includes(m)) return 'array'
          if (['toUpperCase', 'toLowerCase', 'trim', 'join', 'stringify', 'replace', 'replaceAll', 'toFixed'].includes(m)) return 'string'
        }
        if (c.type === 'Identifier' && vueImports.has(c.name)) return `vue:${c.name}`
        return null
      }
      default: return null
    }
  }
  const TYPE_AR = { array: 'مصفوفة', object: 'كائن', string: 'نص', number: 'عدد', boolean: 'قيمة منطقية', null: 'null', function: 'دالة', element: 'عنصر DOM (أو null)', nodelist: 'قائمة عناصر NodeList', regexp: 'تعبير نمطي' }
  const describeType = (t) => {
    if (!t) return null
    if (t.startsWith('new ')) return `كائن من الصنف ${t.slice(4)}`
    if (t.startsWith('vue:')) return { 'vue:ref': 'مرجع تفاعلي (ref)', 'vue:computed': 'قيمة محسوبة (computed)', 'vue:reactive': 'كائن تفاعلي (reactive)' }[t] || `ناتج ${t.slice(4)}()`
    return TYPE_AR[t] || null
  }

  const refText = (sym) => {
    const kind = KIND_LABEL[sym.kind] || sym.kind
    let t = `يشير إلى «${sym.name}»: ${kind} معرّف في السطر ${sym.line}.`
    const ty = describeType(typeOfInit(sym.init))
    if (ty && sym.kind !== 'function') t += ` قيمته الابتدائية ${ty}${sym.kind === 'let' || sym.kind === 'var' ? ' (وقد تتغير لاحقًا)' : ''}.`
    if (sym.kind === 'import') t = `يشير إلى «${sym.name}» المستورد من «${sym.module}» في السطر ${sym.line}.`
    return t
  }

  function fnName(node, parent) {
    if (node.id) return node.id.name
    if (parent?.type === 'VariableDeclarator' && parent.id.type === 'Identifier') return parent.id.name
    if (parent?.type === 'Property' || parent?.type === 'MethodDefinition') return parent.key.name || parent.key.value
    if (parent?.type === 'AssignmentExpression') return src(code, parent.left)
    return null
  }

  function explainCall(node, scope, parent) {
    const c = node.callee
    const argCount = node.arguments.length
    const argsTxt = argCount ? `بـ ${argCount === 1 ? 'وسيط واحد' : argCount === 2 ? 'وسيطين' : `${argCount} وسائط`}` : 'بلا وسائط'
    if (c.type === 'Identifier') {
      const sym = scope.lookup(c.name)
      if (sym && sym.kind === 'import' && sym.module === 'vue' && VUE_API[sym.imported]) {
        const [term, text] = VUE_API[sym.imported]
        return add(node, 'call', `${c.name}() من Vue`, text, { term })
      }
      if (!sym && VUE_API[c.name] && /^define/.test(c.name)) {
        const [term, text] = VUE_API[c.name]
        return add(node, 'call', `${c.name}()`, text, { term })
      }
      if (sym && (sym.kind === 'function' || typeOfInit(sym.init) === 'function')) {
        return add(node, 'call', `استدعاء ${c.name}()`, `ينفّذ الدالة «${c.name}» المعرّفة في السطر ${sym.line} ${argsTxt}${argCount ? ` (${short(node.arguments.map((a) => src(code, a)).join('، '), 50)})` : ''}. القيم تُنسخ إلى معاملاتها ثم يُنفَّذ جسمها، والنتيجة هي ما تُرجعه return.`, { rel: [{ line: sym.line, label: 'التعريف' }] })
      }
      if (sym) return add(node, 'call', `استدعاء ${c.name}()`, `يستدعي «${c.name}» (${KIND_LABEL[sym.kind] || sym.kind} من السطر ${sym.line}) كدالة. لا يمكن التأكد من التحليل الثابت أن قيمته دالة فعلًا وقت التنفيذ.`, { rel: [{ line: sym.line, label: 'التعريف' }] })
      if (KNOWN_GLOBALS[c.name]) return add(node, 'call', `${c.name}()`, `دالة مدمجة: ${KNOWN_GLOBALS[c.name]}`, { term: { setTimeout: 'js-settimeout', fetch: 'js-fetch' }[c.name] })
      unknownCalls.add(c.name)
      return add(node, 'call', `${c.name}()`, `استدعاء دالة اسمها «${c.name}» غير معرّفة في هذا الكود. قد تكون معرّفة في ملف آخر أو مكتبة، أو قد يكون خطأ إملائيًا سيسبب ReferenceError عند التنفيذ. لا نستطيع معرفة ما تفعله.`, { warn: true })
    }
    if (c.type === 'MemberExpression' && !c.computed && c.property.type === 'Identifier') {
      const m = c.property.name
      const objSrc = short(src(code, c.object), 30)
      const known = METHODS[m]
      if (known) {
        const [owner, text, term] = known
        let objType = null
        if (c.object.type === 'Identifier') {
          const sym = scope.lookup(c.object.name)
          objType = sym ? typeOfInit(sym.init) : (KNOWN_GLOBALS[c.object.name] ? c.object.name : null)
        } else objType = typeOfInit(c.object)
        let certainty = ''
        const ownerMatches = objType && (owner.includes(objType) || owner.split('/').some((o) => objType === o || objType.startsWith(o)))
        const globalOwner = ['console', 'JSON', 'Object', 'Math', 'Array', 'localStorage', 'document'].includes(owner.split('/')[0]) && c.object.type === 'Identifier' && c.object.name === owner.split('/')[0]
        if (!ownerMatches && !globalOwner) {
          const ownerAr = { array: 'مصفوفة', string: 'نصًا', 'array/string': 'مصفوفة أو نصًا', element: 'عنصر DOM', classList: 'classList', promise: 'وعدًا (Promise)', event: 'كائن حدث', 'document/element': 'document أو عنصرًا' }[owner] || owner
          certainty = ` (بافتراض أن «${objSrc}» ${ownerAr}؛ لا يمكن التحقق من نوعه بالتحليل الثابت وحده)`
        }
        return add(node, 'call', `${objSrc}.${m}()`, `${text}${certainty}`, { term: term || undefined })
      }
      return add(node, 'call', `${objSrc}.${m}()`, `يستدعي الطريقة «${m}» على «${objSrc}» ${argsTxt}. هذه الطريقة ليست ضمن قائمتنا المعروفة، لذلك لا نشرح ما تفعله بدقة.`)
    }
    add(node, 'call', 'استدعاء', `استدعاء لتعبير محسوب «${short(src(code, c), 30)}» ${argsTxt}.`)
  }

  // ------- المرور على الشجرة -------
  function walk(node, scope, parent, ctx) {
    if (!node || typeof node.type !== 'string') return
    switch (node.type) {
      case 'Program': {
        hoistVars(node.body, scope)
        hoistBlock(node.body, scope)
        node.body.forEach((s) => walk(s, scope, node, ctx))
        return
      }
      case 'ImportDeclaration':
        add(node, 'statement', 'استيراد', `يستورد ${node.specifiers.map((s) => `«${s.local.name}»`).join('، ') || 'الوحدة'} من «${node.source.value}».${node.source.value === 'vue' ? ' هذه دوال Vue الرسمية.' : ''}`, { term: 'js-module' })
        return
      case 'ExportNamedDeclaration': case 'ExportDefaultDeclaration':
        add(node, 'statement', 'تصدير', 'يجعل هذا التعريف متاحًا للاستيراد من ملفات أخرى.', { term: 'js-module' })
        if (node.declaration) walk(node.declaration, scope, node, ctx)
        return
      case 'VariableDeclaration': {
        const k = node.kind
        const names = node.declarations.flatMap((d) => patternIds(d.id).map((i) => i.name))
        let text = `يعرّف ${names.map((n) => `«${n}»`).join('، ')} بالكلمة ${k}. `
        text += k === 'const' ? 'لا يمكن إعادة إسناده لاحقًا.' : k === 'let' ? 'يمكن تغيير قيمته لاحقًا، ونطاقه الكتلة الحالية.' : 'var قديمة: نطاقها الدالة كاملة وتُرفع لأعلاها؛ يُفضّل let أو const.'
        add(node, 'statement', `تعريف ${k === 'const' ? 'ثابت' : 'متغير'}`, text, { term: `js-${k}` })
        for (const d of node.declarations) {
          if (d.id.type !== 'Identifier') add(d.id, 'pattern', 'تفكيك', `يستخرج ${patternIds(d.id).map((i) => `«${i.name}»`).join('، ')} من ${d.id.type === 'ObjectPattern' ? 'خصائص الكائن بالاسم' : 'عناصر المصفوفة بالترتيب'}.`, { term: 'js-destructuring' })
          if (k === 'var' && scope.fnScope() !== scope) { /* var مرفوعة مسبقًا */ }
          for (const id of patternIds(d.id)) {
            const sym = scope.lookup(id.name)
            const ty = describeType(typeOfInit(d.init))
            add(id, 'declaration', `«${id.name}»`, `هنا يُنشأ ${KIND_LABEL[k]} باسم «${id.name}»${d.init ? `، وقيمته الابتدائية ناتج التعبير «${short(src(code, d.init), 35)}»${ty ? ` (${ty})` : ''}` : '، بلا قيمة ابتدائية فقيمته undefined'}.${sym ? ' أماكن قراءته وتعديله تظهر في لوحة العلاقات.' : ''}`, { symbol: sym?.id })
          }
          if (d.init) walk(d.init, scope, d, ctx)
          if (d.id.type !== 'Identifier') walkPatternDefaults(d.id, scope, ctx)
        }
        return
      }
      case 'FunctionDeclaration': case 'FunctionExpression': case 'ArrowFunctionExpression': {
        const name = fnName(node, parent)
        const params = node.params.map((p) => src(code, p))
        const pTxt = params.length ? `تستقبل ${params.length === 1 ? 'معاملًا واحدًا' : `${params.length} معاملات`}: ${params.map((p) => `«${short(p, 20)}»`).join('، ')}` : 'لا تستقبل معاملات'
        const asyncTxt = node.async ? ' وهي async: تُرجع دائمًا Promise ويمكن استخدام await داخلها.' : ''
        if (node.type === 'ArrowFunctionExpression') {
          add(node, 'function', `دالة سهمية${name ? ` «${name}»` : ''}`, `${pTxt}.${node.expression ? ' جسمها تعبير واحد بلا أقواس معقوفة، فتُرجع قيمته تلقائيًا.' : ''}${asyncTxt}${parent?.type === 'CallExpression' && parent.arguments.includes(node) ? ' مُرّرت كوسيط (callback) لتستدعيها الدالة الأخرى لاحقًا — لا تُنفَّذ الآن.' : ''}`, { term: 'js-arrow' })
        } else {
          add(node, 'function', `تعريف دالة${name ? ` «${name}»` : ''}`, `${pTxt}. التعريف وحده لا ينفّذ الكود؛ يُنفَّذ الجسم فقط عند الاستدعاء بالأقواس ().${asyncTxt}${node.type === 'FunctionDeclaration' ? ' تصريحات الدوال تُرفع، فيمكن استدعاؤها حتى قبل سطر تعريفها.' : ''}`, { term: 'js-function', symbol: node.id ? scope.lookup(node.id.name)?.id : undefined })
        }
        const fs = new Scope(scope, 'function', node)
        if (node.type === 'FunctionExpression' && node.id) declare(fs, node.id, 'function')
        for (const p of node.params) for (const id of patternIds(p)) {
          const sym = declare(fs, id, 'param', { fn: name })
          add(id, 'declaration', `معامل «${id.name}»`, `معامل للدالة${name ? ` «${name}»` : ''}: اسم محلي يأخذ قيمة الوسيط المقابل عند كل استدعاء.`, { symbol: sym.id })
        }
        for (const p of node.params) walkPatternDefaults(p, fs, ctx)
        if (node.body.type === 'BlockStatement') {
          hoistVars(node.body.body, fs)
          hoistBlock(node.body.body, fs)
          node.body.body.forEach((s) => walk(s, fs, node.body, { ...ctx, fn: name || 'الدالة' }))
        } else walk(node.body, fs, node, { ...ctx, fn: name || 'الدالة' })
        return
      }
      case 'ClassDeclaration': case 'ClassExpression': {
        add(node, 'class', `صنف «${node.id?.name || ''}»`, `يعرّف صنفًا (قالبًا لإنشاء كائنات بـ new)${node.superClass ? ` يرث من «${src(code, node.superClass)}»` : ''}.`, { term: 'js-class' })
        if (node.superClass) walk(node.superClass, scope, node, ctx)
        for (const m of node.body.body) {
          if (m.type === 'MethodDefinition') {
            const n = m.key.name || m.key.value
            add(m.key, 'method', m.kind === 'constructor' ? 'constructor' : `طريقة ${n}`, m.kind === 'constructor' ? 'دالة البناء: تُنفَّذ تلقائيًا عند new، وthis فيها هو الكائن الجديد.' : `طريقة (دالة) متاحة لكل كائن من هذا الصنف${m.static ? '؛ static: تُستدعى على الصنف نفسه لا على الكائنات' : ''}.`)
            walk(m.value, scope, m, ctx)
          } else if (m.type === 'PropertyDefinition') {
            add(m, 'property', `حقل ${m.key.name || ''}`, 'حقل يُنشأ على كل كائن جديد من هذا الصنف.')
            if (m.value) walk(m.value, scope, m, ctx)
          }
        }
        return
      }
      case 'BlockStatement': {
        const bs = new Scope(scope, 'block', node)
        hoistBlock(node.body, bs)
        node.body.forEach((s) => walk(s, bs, node, ctx))
        return
      }
      case 'ReturnStatement':
        add(node, 'statement', 'return', node.argument ? `ينهي تنفيذ ${ctx.fn ? `«${ctx.fn}»` : 'الدالة'} فورًا ويُرجع قيمة «${short(src(code, node.argument), 35)}» إلى مكان الاستدعاء.` : `ينهي تنفيذ ${ctx.fn ? `«${ctx.fn}»` : 'الدالة'} ويُرجع undefined.`, { term: 'js-return' })
        walk(node.argument, scope, node, ctx)
        return
      case 'IfStatement':
        add(node, 'statement', 'شرط if', `يقيّم الشرط «${short(src(code, node.test), 40)}». إن كانت النتيجة صادقة تُنفَّذ الكتلة الأولى${node.alternate ? (node.alternate.type === 'IfStatement' ? '، وإلا يُفحص الشرط التالي (else if)' : '، وإلا تُنفَّذ كتلة else') : '، وإلا تُتخطّى'}.`, { term: 'js-if' })
        walk(node.test, scope, node, ctx); walk(node.consequent, scope, node, ctx); walk(node.alternate, scope, node, ctx)
        return
      case 'ForStatement': {
        add(node, 'loop', 'حلقة for', `1) ${node.init ? `التهيئة «${short(src(code, node.init), 25)}» مرة واحدة` : 'بلا تهيئة'}، 2) قبل كل دورة يُفحص الشرط «${node.test ? short(src(code, node.test), 25) : 'لا شرط — حلقة لا تنتهي إلا بـ break'}»، 3) بعد كل دورة يُنفَّذ «${node.update ? short(src(code, node.update), 25) : 'لا شيء'}». تتوقف عندما يصبح الشرط false.`, { term: 'js-for' })
        const ls = new Scope(scope, 'block', node)
        if (node.init?.type === 'VariableDeclaration') { if (node.init.kind !== 'var') hoistBlock([node.init], ls) }
        walk(node.init, ls, node, ctx); walk(node.test, ls, node, ctx); walk(node.update, ls, node, ctx); walk(node.body, ls, node, ctx)
        return
      }
      case 'ForOfStatement': case 'ForInStatement': {
        const of = node.type === 'ForOfStatement'
        add(node, 'loop', of ? 'حلقة for...of' : 'حلقة for...in', of ? `تمر على كل قيمة في «${short(src(code, node.right), 25)}» واحدة تلو الأخرى، وتضعها في «${short(src(code, node.left), 25)}».` : `تمر على مفاتيح «${short(src(code, node.right), 25)}» (أسماء الخصائص). لا تُنصح للمصفوفات؛ استخدم for...of.`, { term: 'js-for-of' })
        const ls = new Scope(scope, 'block', node)
        if (node.left.type === 'VariableDeclaration' && node.left.kind !== 'var') hoistBlock([node.left], ls)
        walk(node.right, scope, node, ctx); walk(node.left, ls, node, ctx); walk(node.body, ls, node, ctx)
        return
      }
      case 'WhileStatement': case 'DoWhileStatement':
        add(node, 'loop', node.type === 'WhileStatement' ? 'حلقة while' : 'حلقة do...while', node.type === 'WhileStatement' ? `تكرر الكتلة ما دام «${short(src(code, node.test), 35)}» صادقًا. يجب أن يغيّر شيء داخل الحلقة الشرط وإلا لن تنتهي.` : `تنفّذ الكتلة مرة واحدة على الأقل، ثم تكررها ما دام «${short(src(code, node.test), 35)}» صادقًا.`, { term: 'js-while' })
        walk(node.test, scope, node, ctx); walk(node.body, scope, node, ctx)
        return
      case 'BreakStatement': add(node, 'statement', 'break', 'يخرج فورًا من أقرب حلقة أو switch.'); return
      case 'ContinueStatement': add(node, 'statement', 'continue', 'يتخطى بقية الدورة الحالية وينتقل للدورة التالية.'); return
      case 'ThrowStatement': add(node, 'statement', 'throw', 'يرمي خطأً يوقف التنفيذ الحالي حتى يلتقطه try...catch.', { term: 'js-try-catch' }); walk(node.argument, scope, node, ctx); return
      case 'TryStatement': {
        add(node, 'statement', 'try...catch', `ينفّذ كتلة try؛ إن رُمي خطأ داخلها ينتقل التنفيذ إلى catch${node.finalizer ? '، وكتلة finally تُنفَّذ في كل الأحوال' : ''}.`, { term: 'js-try-catch' })
        walk(node.block, scope, node, ctx)
        if (node.handler) {
          const cs = new Scope(scope, 'block', node.handler)
          if (node.handler.param) for (const id of patternIds(node.handler.param)) declare(cs, id, 'catch')
          walk(node.handler.body, cs, node.handler, ctx)
        }
        walk(node.finalizer, scope, node, ctx)
        return
      }
      case 'SwitchStatement': {
        add(node, 'statement', 'switch', `يقارن «${short(src(code, node.discriminant), 30)}» بكل case بالمساواة الصارمة ===، وينفّذ من أول تطابق حتى break.`)
        walk(node.discriminant, scope, node, ctx)
        const ss = new Scope(scope, 'block', node)
        hoistBlock(node.cases.flatMap((c) => c.consequent), ss)
        for (const c of node.cases) { walk(c.test, ss, c, ctx); c.consequent.forEach((s) => walk(s, ss, c, ctx)) }
        return
      }
      case 'ExpressionStatement':
        walk(node.expression, scope, node, ctx)
        return
      case 'CallExpression':
        explainCall(node, scope, parent)
        walk(node.callee, scope, node, ctx)
        node.arguments.forEach((a) => walk(a, scope, node, ctx))
        return
      case 'NewExpression':
        add(node, 'expression', `new ${short(src(code, node.callee), 20)}`, `ينشئ كائنًا جديدًا من «${short(src(code, node.callee), 20)}» ويستدعي دالة بنائه.`, { term: 'js-class' })
        walk(node.callee, scope, node, ctx); node.arguments.forEach((a) => walk(a, scope, node, ctx))
        return
      case 'AssignmentExpression': {
        let warnConst = ''
        if (node.left.type === 'Identifier') {
          const sym = scope.lookup(node.left.name)
          if (sym) {
            sym.writes.push(L(node))
            if (sym.kind === 'const') warnConst = ` تنبيه: «${sym.name}» معرّف بـ const في السطر ${sym.line}، لذلك سيرمي هذا السطر TypeError عند التنفيذ.`
          } else if (!KNOWN_GLOBALS[node.left.name]) {
            warnConst = ` «${node.left.name}» غير معرّف بـ let أو const أو var في هذا الكود؛ في الوضع المتساهل ينشئ هذا متغيرًا عامًا ضمنيًا، وفي الوضع الصارم يرمي ReferenceError.`
          }
        }
        add(node, 'expression', `إسناد ${node.operator}`, `${ASSIGN[node.operator] || 'إسناد.'} الهدف: «${short(src(code, node.left), 30)}».${warnConst}`, { warn: !!warnConst })
        walkTarget(node.left, scope, node, ctx)
        walk(node.right, scope, node, ctx)
        return
      }
      case 'UpdateExpression': {
        const name = src(code, node.argument)
        add(node, 'expression', node.operator, `${node.operator === '++' ? 'يزيد' : 'ينقص'} «${name}» بمقدار 1. ${node.prefix ? 'الصيغة السابقة تُرجع القيمة بعد التعديل.' : 'الصيغة اللاحقة تُرجع القيمة قبل التعديل.'}`)
        if (node.argument.type === 'Identifier') { const sym = scope.lookup(node.argument.name); if (sym) sym.writes.push(L(node)) }
        walkTarget(node.argument, scope, node, ctx)
        return
      }
      case 'BinaryExpression': case 'LogicalExpression':
        add(node, 'operator', node.operator, OPS[node.operator] || `العامل ${node.operator}.`, { term: node.operator === '===' || node.operator === '==' ? 'js-equality' : undefined, opOnly: true })
        walk(node.left, scope, node, ctx); walk(node.right, scope, node, ctx)
        return
      case 'UnaryExpression':
        add(node, 'operator', node.operator, { '!': 'النفي المنطقي: يحوّل القيمة إلى boolean ثم يعكسها.', typeof: 'يُرجع نصًا يصف نوع القيمة.', '-': 'سالب العدد.', '+': 'يحوّل القيمة إلى عدد.', delete: 'يحذف خاصية من كائن.', void: 'يُرجع undefined.' }[node.operator] || node.operator, { term: node.operator === 'typeof' ? 'js-typeof' : undefined })
        walk(node.argument, scope, node, ctx)
        return
      case 'ConditionalExpression':
        add(node, 'expression', 'عامل شرطي ? :', `إن كان «${short(src(code, node.test), 25)}» صادقًا فالنتيجة «${short(src(code, node.consequent), 20)}»، وإلا «${short(src(code, node.alternate), 20)}».`, { term: 'js-ternary' })
        walk(node.test, scope, node, ctx); walk(node.consequent, scope, node, ctx); walk(node.alternate, scope, node, ctx)
        return
      case 'AwaitExpression':
        add(node, 'expression', 'await', 'ينتظر استقرار الوعد ثم يُرجع قيمته. يوقف هذه الدالة فقط مؤقتًا، بينما يستمر باقي البرنامج.', { term: 'js-async-await' })
        walk(node.argument, scope, node, ctx)
        return
      case 'TemplateLiteral':
        add(node, 'literal', 'قالب نصي', `نص يُبنى بإدراج ${node.expressions.length} ${node.expressions.length === 1 ? 'تعبير' : 'تعابير'} داخل \${…}.`, { term: 'js-template' })
        node.expressions.forEach((e) => walk(e, scope, node, ctx))
        return
      case 'Literal': {
        let t
        if (node.regex) t = ['تعبير نمطي', `نمط بحث في النصوص: /${node.regex.pattern}/${node.regex.flags}`]
        else if (typeof node.value === 'string') t = ['نص', `قيمة نصية من ${[...node.value].length} حرفًا.`]
        else if (typeof node.value === 'number') t = ['عدد', `القيمة العددية ${node.value}.`]
        else if (typeof node.value === 'boolean') t = ['قيمة منطقية', `القيمة ${node.value}.`]
        else if (node.value === null) t = ['null', 'قيمة «لا شيء» مقصودة.']
        else t = ['قيمة', String(node.raw)]
        add(node, 'literal', t[0], t[1])
        return
      }
      case 'ArrayExpression':
        add(node, 'literal', 'مصفوفة', `مصفوفة جديدة فيها ${node.elements.length} ${node.elements.length === 1 ? 'عنصر' : 'عناصر'}. الفهرس يبدأ من 0.`, { term: 'js-array' })
        node.elements.forEach((e) => walk(e, scope, node, ctx))
        return
      case 'ObjectExpression':
        add(node, 'literal', 'كائن', `كائن جديد فيه ${node.properties.length} ${node.properties.length === 1 ? 'خاصية' : 'خصائص'}${node.properties.length ? `: ${node.properties.filter((p) => p.key).map((p) => p.key.name ?? p.key.value).slice(0, 5).join('، ')}` : ''}.`, { term: 'js-object' })
        for (const p of node.properties) {
          if (p.type === 'SpreadElement') { walk(p, scope, node, ctx); continue }
          if (p.computed) walk(p.key, scope, p, ctx)
          if (p.shorthand && p.value.type === 'Identifier') { walk(p.value, scope, p, ctx); continue }
          walk(p.value, scope, p, ctx)
        }
        return
      case 'SpreadElement':
        add(node, 'expression', '...', `ينشر عناصر/خصائص «${short(src(code, node.argument), 25)}» في هذا الموضع.`, { term: 'js-spread' })
        walk(node.argument, scope, node, ctx)
        return
      case 'MemberExpression': {
        if (!node.computed && node.property.type === 'Identifier' && !(parent?.type === 'CallExpression' && parent.callee === node)) {
          const p = node.property.name
          if (PROPS[p]) add(node.property, 'property', `.${p}`, PROPS[p])
          else add(node.property, 'property', `.${p}`, `الوصول إلى الخاصية «${p}» من «${short(src(code, node.object), 25)}».`)
        }
        if (node.optional) add(node, 'expression', '?.', 'سلسلة اختيارية: إن كان ما قبلها null أو undefined تُرجع undefined بدل رمي خطأ.', { term: 'js-optional-chaining' })
        walk(node.object, scope, node, ctx)
        if (node.computed) walk(node.property, scope, node, ctx)
        return
      }
      case 'ChainExpression':
        walk(node.expression, scope, node, ctx)
        return
      case 'Identifier':
        reference(node, scope, false)
        return
      case 'ThisExpression':
        add(node, 'expression', 'this', 'يشير إلى الكائن الذي استُدعيت عليه الدالة الحالية؛ قيمته تُحدد وقت الاستدعاء، والدوال السهمية تأخذه من النطاق المحيط.')
        return
      default:
        for (const k in node) {
          if (k === 'loc' || k === 'type' || k === 'start' || k === 'end') continue
          const v = node[k]
          if (Array.isArray(v)) v.forEach((x) => x && typeof x.type === 'string' && walk(x, scope, node, ctx))
          else if (v && typeof v.type === 'string') walk(v, scope, node, ctx)
        }
    }
  }

  function walkPatternDefaults(p, scope, ctx) {
    if (!p) return
    if (p.type === 'AssignmentPattern') { walk(p.right, scope, p, ctx); walkPatternDefaults(p.left, scope, ctx) }
    else if (p.type === 'ObjectPattern') p.properties.forEach((pr) => walkPatternDefaults(pr.type === 'RestElement' ? pr.argument : pr.value, scope, ctx))
    else if (p.type === 'ArrayPattern') p.elements.forEach((e) => walkPatternDefaults(e, scope, ctx))
  }

  function walkTarget(n, scope, parent, ctx) {
    if (n.type === 'Identifier') reference(n, scope, true)
    else walk(n, scope, parent, ctx)
  }

  function reference(node, scope, write) {
    const sym = scope.lookup(node.name)
    if (sym) {
      if (sym.from === node.start + offset) return
      sym.refs.push({ line: L(node), from: node.start + offset, to: node.end + offset, write })
      add(node, 'identifier', node.name, (write ? 'هنا تُكتب قيمة جديدة في المتغير. ' : '') + refText(sym), { symbol: sym.id, rel: [{ line: sym.line, label: 'التعريف' }], term: sym.kind === 'import' && sym.module === 'vue' && VUE_API[sym.imported] ? VUE_API[sym.imported][0] : undefined })
      return
    }
    if (KNOWN_GLOBALS[node.name]) {
      add(node, 'identifier', node.name, `اسم عام مدمج في المتصفح/اللغة: ${KNOWN_GLOBALS[node.name]}`, { term: node.name === 'document' ? 'js-dom' : node.name === 'localStorage' ? 'js-localstorage' : node.name === 'console' ? 'js-console-log' : undefined })
      return
    }
    if (opts.vueBindings && opts.vueBindings[node.name]) {
      add(node, 'identifier', node.name, `اسم يوفّره Vue (${opts.vueBindings[node.name]}).`)
      return
    }
    add(node, 'identifier', node.name, `«${node.name}» غير معرّف في هذا الكود. إن لم يكن متغيرًا عامًا من بيئة أخرى (مكتبة أو ملف آخر) فسيرمي ReferenceError عند التنفيذ — تحقّق من الإملاء وحالة الأحرف.`, { warn: true })
    notes.add('بعض الأسماء غير معرّفة في الكود المعروض؛ لا يمكن معرفة مصدرها أو سلوكها من التحليل وحده.')
  }

  const global = new Scope(null, 'global', ast)
  walk(ast, global, null, { fn: null })

  if (/\beval\s*\(|\bnew Function\b|\bwith\s*\(/.test(code)) notes.add('الكود يستخدم eval أو new Function أو with؛ هذه تجعل التحليل الثابت غير موثوق لأن الكود يُنشأ وقت التنفيذ.')
  if (unknownCalls.size) notes.add(`دوال مستدعاة غير معرّفة هنا: ${[...unknownCalls].join('، ')}.`)
  notes.add('هذا تحليل ثابت للنص دون تشغيله: الأنواع والقيم الفعلية قد تختلف وقت التنفيذ. لرؤية القيم الحقيقية خطوة بخطوة استخدم مختبر JavaScript.')

  items.sort((a, b) => a.from - b.from || b.to - a.to)
  return { lang: 'js', items, symbols: symbols.map(({ init, node, ...s }) => s), notes: [...notes], error: null }
}

export { termById }
