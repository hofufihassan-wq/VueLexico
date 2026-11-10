// أداة تجهيز كود JavaScript للتتبّع.
// تُحلّل الكود إلى شجرة AST عبر acorn، ثم تُدرج نداءات خفيفة إلى كائن التتبّع __t
// قبل كل جملة، وعند الدخول إلى الدوال والخروج منها، وداخل الحلقات (حماية من الحلقات اللانهائية).
// الأنماط:
//   trace  : تتبّع كامل (الأسطر + قيم المتغيرات + إطارات الاستدعاء + await)
//   lines  : رقم السطر الحالي + حماية الحلقات فقط (للتصحيح والمعاينة)
import { parse } from 'acorn'
import { generate } from 'astring'

export const PARSE_OPTIONS = {
  ecmaVersion: 'latest',
  sourceType: 'script',
  locations: true,
  allowAwaitOutsideFunction: true,
  allowHashBang: true,
}

export function parseJs(code, opts = {}) {
  return parse(code, { ...PARSE_OPTIONS, ...opts })
}

// ---------- مساعدات بناء العُقد ----------
const ident = (name) => ({ type: 'Identifier', name })
const lit = (value) => ({ type: 'Literal', value, raw: JSON.stringify(value) })
const member = (obj, prop) => ({
  type: 'MemberExpression',
  object: typeof obj === 'string' ? ident(obj) : obj,
  property: ident(prop),
  computed: false,
  optional: false,
})
const call = (callee, args) => ({ type: 'CallExpression', callee, arguments: args, optional: false })
const T = (method, args) => call(member('__t', method), args)
const stmt = (expression) => ({ type: 'ExpressionStatement', expression })
const getter = (name) => ({
  type: 'ArrowFunctionExpression',
  params: [],
  body: ident(name),
  expression: true,
  async: false,
  generator: false,
})
const getters = (names) => ({ type: 'ArrayExpression', elements: names.map(getter) })
const block = (body) => ({ type: 'BlockStatement', body })

const FUNCTION_TYPES = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'])
const isFunction = (n) => n && FUNCTION_TYPES.has(n.type)
const unique = (arr) => [...new Set(arr)]

export function patternNames(p, out = []) {
  if (!p) return out
  switch (p.type) {
    case 'Identifier': out.push(p.name); break
    case 'ObjectPattern':
      for (const pr of p.properties) patternNames(pr.type === 'RestElement' ? pr.argument : pr.value, out)
      break
    case 'ArrayPattern': for (const e of p.elements) if (e) patternNames(e, out); break
    case 'RestElement': patternNames(p.argument, out); break
    case 'AssignmentPattern': patternNames(p.left, out); break
  }
  return out
}

// أسماء var (مرفوعة) داخل جسم دالة دون الدخول إلى الدوال المتداخلة
function collectVars(node, out = []) {
  if (!node || typeof node !== 'object') return out
  if (Array.isArray(node)) { for (const n of node) collectVars(n, out); return out }
  if (typeof node.type !== 'string') return out
  if (isFunction(node) || node.type === 'ClassDeclaration' || node.type === 'ClassExpression') return out
  if (node.type === 'VariableDeclaration' && node.kind === 'var') {
    for (const d of node.declarations) patternNames(d.id, out)
  }
  for (const key in node) {
    if (key === 'loc' || key === 'start' || key === 'end') continue
    const v = node[key]
    if (v && typeof v === 'object') collectVars(v, out)
  }
  return out
}

// تصريحات مستوى الكتلة المباشرة (let/const/class/function)
function blockDecls(stmts) {
  const out = []
  for (const s of stmts) {
    if (s.type === 'VariableDeclaration' && s.kind !== 'var') for (const d of s.declarations) patternNames(d.id, out)
    else if (s.type === 'ClassDeclaration' && s.id) out.push(s.id.name)
    else if (s.type === 'FunctionDeclaration' && s.id) out.push(s.id.name)
  }
  return out
}

function keyName(key, computed) {
  if (!key || computed) return null
  if (key.type === 'Identifier' || key.type === 'PrivateIdentifier') return key.name
  if (key.type === 'Literal') return String(key.value)
  return null
}

/**
 * يجهّز الكود للتشغيل المتتبَّع.
 * @returns {{ ok: true, code: string, meta: object } | { ok: false, error: { message, line, column } }}
 */
export function instrument(source, { mode = 'trace', lineOffset = 0, fileTag = '' } = {}) {
  let ast
  try {
    ast = parseJs(source)
  } catch (e) {
    return { ok: false, error: { message: e.message.replace(/\s*\(\d+:\d+\)$/, ''), line: (e.loc?.line ?? 0) + lineOffset, column: e.loc?.column ?? 0, raw: e.message } }
  }
  const trace = mode === 'trace'
  const meta = { mode, steps: [], fns: [], globals: [], lineCount: source.split('\n').length }

  function addStep(node, names) {
    meta.steps.push({ line: node.loc.start.line, col: node.loc.start.column, endLine: node.loc.end.line, names: trace ? names : [] })
    return meta.steps.length - 1
  }

  function visibleNames(ctx) {
    const out = []
    for (const s of ctx.scopes) out.push(...s)
    return unique(out)
  }

  function stepFor(node, ctx) {
    if (trace) {
      const names = visibleNames(ctx)
      const id = addStep(node, names)
      return stmt(T('s', [lit(id), getters(names)]))
    }
    if (mode === 'guard') return null
    const args = [lit(node.loc.start.line + lineOffset)]
    if (fileTag) args.push(lit(fileTag))
    return stmt(T('l', args))
  }

  const guard = () => stmt(T('g', []))

  function toBlockBody(node) {
    return node.type === 'BlockStatement' ? node.body : [node]
  }

  function transformStatements(list, ctx) {
    const out = []
    for (const s of list) {
      if (s.type === 'FunctionDeclaration') { out.push(transformFunction(s, ctx)); continue }
      if (s.type === 'EmptyStatement') continue
      if (s.type === 'ExpressionStatement' && s.directive) { out.push(s); continue }
      const step = stepFor(s, ctx)
      if (step) out.push(step)
      out.push(transformStatement(s, ctx))
    }
    return out
  }

  function withScope(ctx, names) {
    return { ...ctx, scopes: [...ctx.scopes, names] }
  }

  function transformBlock(node, ctx, extraNames = []) {
    const stmts = toBlockBody(node)
    const inner = withScope(ctx, unique([...extraNames, ...blockDecls(stmts)]))
    return block(transformStatements(stmts, inner))
  }

  function loopBody(body, ctx, extraNames = []) {
    const b = transformBlock(body, ctx, extraNames)
    b.body.unshift(guard())
    return b
  }

  function transformStatement(s, ctx) {
    switch (s.type) {
      case 'BlockStatement':
        return transformBlock(s, ctx)
      case 'VariableDeclaration':
        for (const d of s.declarations) if (d.init) d.init = expr(d.init, ctx, d.id.type === 'Identifier' ? d.id.name : null)
        return s
      case 'ExpressionStatement':
        s.expression = expr(s.expression, ctx)
        return s
      case 'IfStatement':
        s.test = expr(s.test, ctx)
        s.consequent = transformBlock(s.consequent, ctx)
        if (s.alternate) s.alternate = transformBlock(s.alternate, ctx)
        return s
      case 'ForStatement': {
        const names = s.init && s.init.type === 'VariableDeclaration' && s.init.kind !== 'var'
          ? s.init.declarations.flatMap((d) => patternNames(d.id)) : []
        const inner = withScope(ctx, names)
        if (s.init) s.init = s.init.type === 'VariableDeclaration' ? transformStatement(s.init, inner) : expr(s.init, inner)
        if (s.test) s.test = expr(s.test, inner)
        if (s.update) s.update = expr(s.update, inner)
        s.body = loopBody(s.body, inner)
        return s
      }
      case 'ForInStatement':
      case 'ForOfStatement': {
        const names = s.left.type === 'VariableDeclaration' && s.left.kind !== 'var'
          ? s.left.declarations.flatMap((d) => patternNames(d.id)) : []
        s.right = expr(s.right, ctx)
        s.body = loopBody(s.body, withScope(ctx, names))
        return s
      }
      case 'WhileStatement':
      case 'DoWhileStatement':
        s.test = expr(s.test, ctx)
        s.body = loopBody(s.body, ctx)
        return s
      case 'ReturnStatement':
        if (trace && ctx.frame && !ctx.generator) {
          s.argument = T('r', [s.argument ? expr(s.argument, ctx) : ident('undefined'), lit(s.loc.start.line)])
        } else if (s.argument) s.argument = expr(s.argument, ctx)
        return s
      case 'ThrowStatement':
        s.argument = expr(s.argument, ctx)
        return s
      case 'SwitchStatement': {
        s.discriminant = expr(s.discriminant, ctx)
        const inner = withScope(ctx, blockDecls(s.cases.flatMap((c) => c.consequent)))
        for (const c of s.cases) {
          if (c.test) c.test = expr(c.test, inner)
          c.consequent = transformStatements(c.consequent, inner)
        }
        return s
      }
      case 'TryStatement':
        s.block = transformBlock(s.block, ctx)
        if (s.handler) s.handler.body = transformBlock(s.handler.body, ctx, s.handler.param ? patternNames(s.handler.param) : [])
        if (s.finalizer) s.finalizer = transformBlock(s.finalizer, ctx)
        return s
      case 'LabeledStatement':
        s.body = transformStatement(s.body, ctx)
        return s
      case 'ClassDeclaration':
        transformClass(s, ctx)
        return s
      case 'FunctionDeclaration':
        return transformFunction(s, ctx)
      default:
        return genericChildren(s, ctx)
    }
  }

  function transformClass(c, ctx) {
    if (c.superClass) c.superClass = expr(c.superClass, ctx)
    const className = c.id?.name || 'صنف'
    for (const m of c.body.body) {
      if (m.type === 'MethodDefinition') {
        const n = keyName(m.key, m.computed)
        m.value = transformFunction(m.value, ctx, m.kind === 'constructor' ? `${className} (constructor)` : `${className}.${n ?? 'method'}`)
      } else if (m.type === 'PropertyDefinition' && m.value) {
        m.value = expr(m.value, ctx, keyName(m.key, m.computed))
      } else if (m.type === 'StaticBlock') {
        m.body = transformStatements(m.body, ctx)
      }
    }
    return c
  }

  function transformFunction(fn, ctx, hint) {
    const name = fn.id?.name || hint || 'دالة مجهولة'
    const paramNames = fn.params.flatMap((p) => patternNames(p))
    fn.params = fn.params.map((p) => (p.type === 'Identifier' ? p : genericChildren(p, ctx)))

    let bodyStmts
    if (fn.body.type !== 'BlockStatement') {
      bodyStmts = [{ type: 'ReturnStatement', argument: fn.body, loc: fn.body.loc }]
      fn.expression = false
    } else bodyStmts = fn.body.body

    const directives = []
    while (bodyStmts.length && bodyStmts[0].type === 'ExpressionStatement' && bodyStmts[0].directive) directives.push(bodyStmts.shift())

    const names = unique([...paramNames, ...collectVars(bodyStmts), ...blockDecls(bodyStmts)])
    const framed = trace && !fn.generator
    const inner = {
      scopes: [names],
      frame: framed ? '__f' : null,
      generator: fn.generator,
      async: fn.async,
    }
    let body = transformStatements(bodyStmts, inner)

    if (framed) {
      meta.fns.push({ name, line: fn.loc.start.line, endLine: fn.loc.end.line, params: paramNames, async: fn.async })
      const fnId = meta.fns.length - 1
      body.push(stmt(T('r', [ident('undefined'), lit(fn.loc.end.line)])))
      body = [
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [{ type: 'VariableDeclarator', id: ident('__f'), init: T('e', [lit(fnId), getters(paramNames)]) }],
        },
        { type: 'TryStatement', block: block(body), handler: null, finalizer: block([stmt(T('x', [ident('__f')]))]) },
      ]
    }
    fn.body = block([...directives, ...body])
    return fn
  }

  function genericChildren(node, ctx) {
    for (const key in node) {
      if (key === 'loc' || key === 'start' || key === 'end' || key === 'type') continue
      const v = node[key]
      if (Array.isArray(v)) node[key] = v.map((x) => (x && typeof x.type === 'string' ? expr(x, ctx) : x))
      else if (v && typeof v.type === 'string') node[key] = expr(v, ctx)
    }
    return node
  }

  function expr(node, ctx, hint = null) {
    if (!node || typeof node.type !== 'string') return node
    switch (node.type) {
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        return transformFunction(node, ctx, hint)
      case 'ClassExpression':
        return transformClass(node, ctx)
      case 'AwaitExpression': {
        const arg = expr(node.argument, ctx)
        if (!trace) { node.argument = arg; return node }
        const frame = ctx.frame ? ident('__f') : member('__t', 'G')
        const line = lit(node.loc.start.line)
        return T('aw', [frame, { type: 'AwaitExpression', argument: T('as', [frame, arg, line]) }])
      }
      case 'Property':
        if (node.computed) node.key = expr(node.key, ctx)
        node.value = expr(node.value, ctx, keyName(node.key, node.computed))
        return node
      case 'AssignmentExpression': {
        node.left = expr(node.left, ctx)
        const h = node.left.type === 'Identifier' ? node.left.name
          : node.left.type === 'MemberExpression' ? keyName(node.left.property, node.left.computed) : null
        node.right = expr(node.right, ctx, h)
        return node
      }
      case 'VariableDeclaration':
        return transformStatement(node, ctx)
      default:
        return genericChildren(node, ctx)
    }
  }

  const programNames = unique([...collectVars(ast.body), ...blockDecls(ast.body)])
  meta.globals = trace ? programNames : []
  const rootCtx = { scopes: [programNames], frame: null, generator: false, async: true }
  let body = transformStatements(ast.body, rootCtx)
  if (trace) {
    body.unshift(stmt(T('globals', [getters(programNames)])))
    body.push(stmt(T('end', [])))
  }
  ast.body = body
  let code
  try {
    code = generate(ast)
  } catch (e) {
    return { ok: false, error: { message: 'تعذّر تجهيز الكود للتشغيل: ' + e.message, line: 0, column: 0 } }
  }
  return { ok: true, code, meta }
}

/** يجمع أسماء التصريحات في المستوى الأعلى (لاستخدامها في التصحيح) */
export function topLevelNames(source) {
  const ast = parseJs(source)
  return unique([...collectVars(ast.body), ...blockDecls(ast.body)])
}
