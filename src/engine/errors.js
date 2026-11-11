// يحوّل رسائل الأخطاء التقنية إلى شرح عربي مفهوم مع تلميح للإصلاح.
// القاعدة: لا نخمّن سببًا غير مؤكد؛ إن لم نتعرّف على الرسالة نعرضها كما هي مع شرح عام لنوع الخطأ.

const TYPES = {
  SyntaxError: 'خطأ في الصياغة: المتصفح لم يستطع فهم الكود، لذلك لم يُنفَّذ أي جزء منه.',
  ReferenceError: 'خطأ مرجعي: استخدمتَ اسمًا لا يعرفه البرنامج في هذا المكان.',
  TypeError: 'خطأ في النوع: العملية لا تناسب نوع القيمة الموجودة فعلًا.',
  RangeError: 'خطأ في النطاق: قيمة خارج الحدود المسموحة.',
  LimitError: 'حماية التشغيل: أوقفنا الكود قبل أن يجمّد الصفحة.',
  TimeoutError: 'انتهت المهلة: الكود استغرق وقتًا أطول من المسموح.',
  VueCompileError: 'خطأ في ترجمة المكوّن: مترجم Vue لم يستطع فهم القالب أو السكربت، فلم يُعرض المكوّن.',
  SecurityError: 'خطأ أمان: المتصفح منع عملية غير مسموحة في هذه البيئة.',
  Error: 'خطأ أطلقه الكود نفسه (throw) أو مكتبة يستخدمها.',
}

const RULES = [
  [/^(\w+) is not defined$|^(\w+) is undefined$|Can't find variable: (\w+)/, (m) => {
    const name = m[1] || m[2] || m[3]
    const dom = ['document', 'window', 'alert', 'localStorage', 'prompt']
    if (dom.includes(name)) {
      return { title: `«${name}» غير متاح هنا`, explain: `هذا المختبر يشغّل JavaScript في بيئة معزولة بلا صفحة ويب، لذلك لا يوجد ${name}.`, hint: 'لتجربة الكود الذي يتعامل مع الصفحة استخدم «المحرر» حيث توجد معاينة HTML حقيقية.' }
    }
    return { title: `الاسم «${name}» غير معرّف`, explain: `حاول الكود استخدام «${name}» لكنه لم يُعرَّف بـ let أو const أو function في نطاق يصل إليه هذا السطر.`, hint: 'تحقّق من الإملاء وحالة الأحرف (JavaScript تفرّق بين Name وname)، ومن أنك عرّفته قبل استخدامه أو في النطاق الصحيح.' }
  }],
  [/Cannot access '(\w+)' before initialization|can't access lexical declaration '(\w+)' before initialization/, (m) => ({
    title: `استخدام «${m[1] || m[2]}» قبل تهيئته`,
    explain: 'المتغيرات المعرّفة بـ let وconst موجودة في نطاقها من البداية لكنها في «المنطقة الميتة مؤقتًا» حتى يُنفَّذ سطر تعريفها.',
    hint: 'انقل سطر التعريف إلى ما قبل أول استخدام.',
  })],
  [/Assignment to constant variable|invalid assignment to const/, () => ({
    title: 'محاولة تغيير ثابت',
    explain: 'المتغير المعرّف بـ const لا يمكن إعادة إسناد قيمة جديدة له.',
    hint: 'استخدم let إذا كانت القيمة ستتغير. لاحظ أن محتوى مصفوفة أو كائن معرّف بـ const يمكن تعديله، لكن لا يمكن استبداله كاملًا.',
  })],
  [/Cannot read propert(?:y|ies) of (undefined|null)(?: \(reading '([^']+)'\))?|(\S+) is (undefined|null)$|can't access property "([^"]+)", (\S+) is (undefined|null)/, (m) => {
    const what = m[1] || m[4] || m[7]
    const prop = m[2] || m[5]
    return {
      title: `قراءة خاصية من ${what === 'null' ? 'null' : 'undefined'}`,
      explain: `حاول الكود قراءة ${prop ? `الخاصية «${prop}»` : 'خاصية'} من قيمة هي ${what}، أي أن الشيء الذي قبل النقطة غير موجود.`,
      hint: what === 'null'
        ? 'إذا استخدمت document.querySelector فربما لم يُعثر على العنصر: تحقّق من المحدِّد ومن أن السكربت يعمل بعد إنشاء العنصر.'
        : 'اطبع القيمة التي قبل النقطة بـ console.log لتعرف لماذا هي undefined، أو استخدم ?. للوصول الآمن.',
    }
  }],
  [/Cannot set propert(?:y|ies) of (undefined|null)(?: \(setting '([^']+)'\))?/, (m) => ({
    title: `إسناد خاصية إلى ${m[1]}`,
    explain: `حاول الكود وضع قيمة ${m[2] ? `في «${m[2]}» ` : ''}على شيء غير موجود (${m[1]}).`,
    hint: 'تأكد من أن الكائن موجود قبل تعديل خصائصه.',
  })],
  [/(.+) is not a function/, (m) => ({
    title: 'استدعاء شيء ليس دالة',
    explain: `«${m[1].trim()}» ليست دالة، لكن الكود حاول استدعاءها بالأقواس ().`,
    hint: 'تحقّق من اسم الدالة ومن نوع الكائن. مثلًا map موجودة في المصفوفات وليست في الكائنات العادية.',
  })],
  [/(.+) is not iterable/, (m) => ({
    title: 'قيمة غير قابلة للتكرار',
    explain: `حاول الكود المرور على «${m[1].trim()}» بـ for...of أو النشر ... لكنها ليست مصفوفة أو مجموعة قابلة للتكرار.`,
    hint: 'للمرور على مفاتيح كائن استخدم Object.keys(obj) أو Object.entries(obj).',
  })],
  [/is not a constructor/, () => ({ title: 'استخدام new مع ما ليس صنفًا', explain: 'الكلمة new تعمل مع الأصناف والدوال البانية فقط.', hint: 'الدوال السهمية لا يمكن استخدامها مع new.' })],
  [/Maximum call stack size exceeded|too much recursion/, () => ({
    title: 'امتلأت مكدّس الاستدعاءات',
    explain: 'دالة تستدعي نفسها (مباشرة أو غير مباشرة) بلا توقف.',
    hint: 'أضف شرط توقف (حالة أساس) يمنع الاستدعاء الذاتي عند الوصول للنهاية.',
  })],
  [/Invalid array length/, () => ({ title: 'طول مصفوفة غير صالح', explain: 'طول المصفوفة يجب أن يكون عددًا صحيحًا موجبًا وضمن الحدود.', hint: '' })],
  [/Unexpected token|Unexpected character/, () => ({
    title: 'رمز في غير مكانه',
    explain: 'وجد المحلّل رمزًا لا يتوقعه في هذا الموضع.',
    hint: 'ابحث عن قوس أو فاصلة أو علامة اقتباس ناقصة أو زائدة في السطر المشار إليه أو الذي قبله.',
  })],
  [/Unterminated string constant|unterminated string literal/, () => ({ title: 'نص غير مغلق', explain: 'بدأ نص بعلامة اقتباس ولم يُغلق في السطر نفسه.', hint: 'أغلق النص بنفس علامة الاقتباس التي بدأ بها، أو استخدم القالب `...` للنصوص متعددة الأسطر.' })],
  [/Unterminated template/, () => ({ title: 'قالب نصي غير مغلق', explain: 'بدأ قالب نصي بعلامة ` ولم يُغلق.', hint: 'أضف علامة ` في نهاية القالب.' })],
  [/Unterminated comment/, () => ({ title: 'تعليق غير مغلق', explain: 'بدأ تعليق /* ولم يُغلق بـ */.', hint: '' })],
  [/Identifier '(\w+)' has already been declared|redeclaration of (?:let|const) (\w+)/, (m) => ({
    title: `تعريف «${m[1] || m[2]}» مرتين`,
    explain: 'لا يمكن تعريف المتغير نفسه بـ let أو const مرتين في النطاق نفسه.',
    hint: 'احذف let/const من التعريف الثاني إن كنت تريد تغيير القيمة فقط.',
  })],
  [/'return' outside of function/, () => ({ title: 'return خارج دالة', explain: 'الكلمة return تُستخدم داخل الدوال فقط.', hint: '' })],
  [/Unexpected end of input|missing \} /, () => ({ title: 'الكود انتهى قبل أوانه', explain: 'هناك قوس أو كتلة لم تُغلق.', hint: 'عدّ الأقواس { } و( ) وتأكد من إغلاق كل واحد منها.' })],
  [/Assigning to rvalue|Invalid left-hand side/, () => ({ title: 'إسناد إلى ما لا يقبل الإسناد', explain: 'الطرف الأيسر من = يجب أن يكون متغيرًا أو خاصية.', hint: 'إن كنت تقارن فاستخدم === بدلًا من =.' })],
  [/localStorage|sessionStorage|The document is sandboxed|Access is denied for this document/i, () => ({ title: 'التخزين غير متاح في المعاينة', explain: 'المعاينة تعمل في بيئة معزولة بلا أصل (origin)، لذلك يمنع المتصفح localStorage فيها لحماية بيانات المنصة.', hint: 'الكود نفسه سيعمل في صفحة حقيقية. للتجربة هنا خزّن البيانات في متغير.' })],
  [/Element is missing end tag|Invalid end tag/, () => ({ title: 'وسم غير مغلق في القالب', explain: 'مترجم Vue وجد عنصرًا بلا وسم إغلاق أو وسم إغلاق في غير مكانه. قوالب Vue أكثر صرامة من HTML العادي.', hint: 'تحقّق من أن كل وسم مفتوح أُغلق بالترتيب الصحيح.' })],
  [/Interpolation end sign was not found/, () => ({ title: '{{ بلا }}', explain: 'بدأ إدراج نصي بـ {{ ولم يُغلق بـ }}.', hint: 'أغلق التعبير بـ }}.' })],
  [/v-for has invalid expression|v-for.*alias/, () => ({ title: 'صيغة v-for غير صحيحة', explain: 'v-for يتوقع صيغة مثل: item in items أو (item, index) in items.', hint: '' })],
  [/Component is missing template or render function/, () => ({ title: 'المكوّن بلا قالب', explain: 'لا يوجد <template> ولا دالة render، فلا يعرف Vue ماذا يعرض.', hint: 'أضف كتلة <template>.' })],
  [/Failed to resolve component: (\S+)/, (m) => ({ title: `مكوّن غير معروف: ${m[1]}`, explain: 'استُخدم مكوّن في القالب لم يُستورد أو يُعرَّف في هذا الملف.', hint: 'عرّف المكوّن أو استورده في <script setup>.' })],
  [/Property "(\w+)" was accessed during render but is not defined/, (m) => ({ title: `«${m[1]}» غير معرّف في المكوّن`, explain: 'القالب يستخدم اسمًا لم يُعرَّف في script setup (أو props/data).', hint: 'عرّفه في السكربت أو صحّح الإملاء.' })],
]

export function explainError(err) {
  if (!err) return null
  const name = err.name || 'Error'
  const message = String(err.message || '')
  for (const [re, fn] of RULES) {
    const m = message.match(re)
    if (m) return { name, message, kind: TYPES[name] || TYPES.Error, ...fn(m) }
  }
  if (name === 'LimitError' || name === 'TimeoutError') {
    return { name, message, kind: TYPES[name], title: name === 'LimitError' ? 'تجاوز حد الخطوات' : 'انتهت المهلة', explain: message, hint: 'تحقّق من أن شرط كل حلقة يصبح false في النهاية، وأن كل دالة تستدعي نفسها لها شرط توقف.' }
  }
  return { name, message, kind: TYPES[name] || TYPES.Error, title: name, explain: 'لم نتعرّف على هذه الرسالة تحديدًا، لذلك نعرضها كما هي دون تخمين سببها.', hint: 'اقرأ الرسالة الأصلية والسطر المشار إليه، واستخدم console.log لفحص القيم قبل السطر.' }
}
