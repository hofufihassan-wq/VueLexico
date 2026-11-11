<script setup>
// محرر أكواد مبني على CodeMirror 6: تلوين نحوي حقيقي (Lezer)، إكمال تلقائي، طي، بحث،
// تعليم الأخطاء، وتمييز سطر التنفيذ الحالي ونطاقات الشرح.
import { ref, onMounted, onBeforeUnmount, watch, shallowRef } from 'vue'
import { EditorState, Compartment, StateField, StateEffect, RangeSetBuilder } from '@codemirror/state'
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, highlightActiveLine, Decoration } from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { indentOnInput, bracketMatching, foldGutter, foldKeymap, syntaxHighlighting, HighlightStyle, indentUnit } from '@codemirror/language'
import { closeBrackets, closeBracketsKeymap, autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { setDiagnostics, lintGutter } from '@codemirror/lint'
import { tags as t } from '@lezer/highlight'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { vue } from '@codemirror/lang-vue'
import { store } from '../store/index.js'

const props = defineProps({
  modelValue: { type: String, default: '' },
  lang: { type: String, default: 'js' },
  readonly: { type: Boolean, default: false },
  height: { type: String, default: '100%' },
  highlightLine: { type: Number, default: 0 },
  marks: { type: Array, default: () => [] },
  diagnostics: { type: Array, default: () => [] },
  label: { type: String, default: 'محرر الكود' },
})
const emit = defineEmits(['update:modelValue', 'cursor', 'run'])

const host = ref(null)
const view = shallowRef(null)
const langC = new Compartment()
const roC = new Compartment()
const sizeC = new Compartment()

const languageFor = (l) => ({ html: html(), css: css(), js: javascript(), vue: vue() }[l] || javascript())

const style = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword, t.definitionKeyword, t.modifier], color: 'var(--syn-keyword)' },
  { tag: [t.string, t.special(t.string), t.regexp, t.attributeValue], color: 'var(--syn-string)' },
  { tag: [t.number, t.bool, t.null, t.atom, t.unit], color: 'var(--syn-number)' },
  { tag: [t.comment, t.lineComment, t.blockComment, t.docComment], color: 'var(--syn-comment)', fontStyle: 'italic' },
  { tag: [t.function(t.variableName), t.function(t.propertyName), t.macroName], color: 'var(--syn-fn)' },
  { tag: [t.propertyName, t.definition(t.propertyName)], color: 'var(--syn-prop)' },
  { tag: [t.tagName, t.angleBracket], color: 'var(--syn-tag)' },
  { tag: [t.attributeName, t.className, t.labelName], color: 'var(--syn-attr)' },
  { tag: [t.typeName, t.namespace, t.self, t.constant(t.variableName)], color: 'var(--syn-type)' },
  { tag: [t.operator, t.punctuation, t.separator, t.bracket, t.derefOperator], color: 'var(--syn-op)' },
  { tag: [t.variableName, t.definition(t.variableName)], color: 'var(--syn-var)' },
  { tag: t.heading, fontWeight: '600' },
  { tag: t.invalid, color: 'var(--bad)' },
])

const theme = EditorView.theme({
  '&': { height: '100%', backgroundColor: 'var(--code-bg)', color: 'var(--syn-var)' },
  '.cm-scroller': { fontFamily: 'var(--font-code)', lineHeight: '1.65' },
  '.cm-content': { caretColor: 'var(--accent)', padding: '10px 0' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)', borderLeftWidth: '2px' },
  '.cm-gutters': { backgroundColor: 'var(--code-bg)', color: 'var(--code-gutter)', border: 'none', paddingInlineStart: '4px' },
  '.cm-activeLine': { backgroundColor: 'var(--code-active)' },
  '.cm-activeLineGutter': { backgroundColor: 'transparent', color: 'var(--text-2)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': { backgroundColor: 'var(--code-sel) !important' },
  '.cm-selectionMatch': { backgroundColor: 'var(--mint-soft)' },
  '&.cm-focused .cm-matchingBracket': { backgroundColor: 'var(--accent-soft)', outline: '1px solid var(--accent)' },
  '.cm-foldGutter span': { color: 'var(--code-gutter)' },
  '.cm-tooltip': { background: 'var(--bg-3)', border: '1px solid var(--line-2)', borderRadius: '10px', color: 'var(--text)' },
  '.cm-tooltip-autocomplete > ul > li[aria-selected]': { background: 'var(--accent-soft)', color: 'var(--text)' },
  '.cm-panels': { background: 'var(--bg-3)', color: 'var(--text)' },
  '.cm-panel input, .cm-panel button': { color: 'var(--text)' },
  '.cm-exec-line': { backgroundColor: 'color-mix(in srgb, var(--accent) 16%, transparent)', boxShadow: 'inset 3px 0 0 var(--accent)' },
  '.cm-mark-main': { backgroundColor: 'color-mix(in srgb, var(--accent) 24%, transparent)', borderRadius: '3px' },
  '.cm-mark-rel': { backgroundColor: 'var(--mint-soft)', borderBottom: '2px solid var(--mint)', borderRadius: '2px' },
  '.cm-mark-def': { backgroundColor: 'color-mix(in srgb, var(--mint) 26%, transparent)', borderRadius: '3px', outline: '1px solid var(--mint)' },
  '.cm-mark-warn': { textDecoration: 'underline wavy var(--warn)', textUnderlineOffset: '3px' },
  '.cm-lintRange-error': { backgroundImage: 'none', textDecoration: 'underline wavy var(--bad)', textUnderlineOffset: '3px' },
  '.cm-diagnostic': { fontFamily: 'var(--font-ui)', direction: 'rtl', textAlign: 'right' },
})

// ---------- زخارف: سطر التنفيذ والنطاقات ----------
const setDeco = StateEffect.define()
const decoField = StateField.define({
  create: () => Decoration.none,
  update(deco, tr) {
    deco = deco.map(tr.changes)
    for (const e of tr.effects) if (e.is(setDeco)) deco = e.value
    return deco
  },
  provide: (f) => EditorView.decorations.from(f),
})

function buildDeco(state) {
  const ranges = []
  const doc = state.doc
  if (props.highlightLine > 0 && props.highlightLine <= doc.lines) {
    const line = doc.line(props.highlightLine)
    ranges.push({ from: line.from, to: line.from, deco: Decoration.line({ class: 'cm-exec-line' }) })
  }
  for (const m of props.marks) {
    const from = Math.max(0, Math.min(m.from, doc.length))
    const to = Math.max(from, Math.min(m.to, doc.length))
    if (to > from) ranges.push({ from, to, deco: Decoration.mark({ class: `cm-mark-${m.kind || 'main'}` }) })
  }
  ranges.sort((a, b) => a.from - b.from || (a.deco.startSide ?? 0) - (b.deco.startSide ?? 0))
  const b = new RangeSetBuilder()
  for (const r of ranges) {
    try { b.add(r.from, r.to, r.deco) } catch { /* نطاقات متداخلة بترتيب غير مدعوم */ }
  }
  return b.finish()
}

function refreshDeco() {
  if (!view.value) return
  view.value.dispatch({ effects: setDeco.of(buildDeco(view.value.state)) })
}

function refreshDiagnostics() {
  if (!view.value) return
  const doc = view.value.state.doc
  const diags = props.diagnostics.filter((d) => d.line >= 1 && d.line <= doc.lines).map((d) => {
    const line = doc.line(d.line)
    return { from: d.from ?? line.from, to: d.to ?? line.to, severity: d.severity || 'error', message: d.message }
  })
  view.value.dispatch(setDiagnostics(view.value.state, diags))
}

const fontTheme = (px) => EditorView.theme({ '&': { fontSize: `${px}px` } })

onMounted(() => {
  const runKey = keymap.of([{ key: 'Mod-Enter', run: () => { emit('run'); return true } }, { key: 'Mod-s', run: () => { emit('run'); return true } }])
  view.value = new EditorView({
    parent: host.value,
    state: EditorState.create({
      doc: props.modelValue,
      extensions: [
        lineNumbers(), highlightActiveLineGutter(), highlightSpecialChars(), history(), foldGutter(), drawSelection(), dropCursor(),
        EditorState.allowMultipleSelections.of(true), indentOnInput(), syntaxHighlighting(style), bracketMatching(), closeBrackets(),
        autocompletion(), rectangularSelection(), highlightActiveLine(), highlightSelectionMatches(), lintGutter(),
        indentUnit.of('  '), EditorState.tabSize.of(2),
        runKey,
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap, ...historyKeymap, ...foldKeymap, ...completionKeymap, indentWithTab]),
        langC.of(languageFor(props.lang)),
        roC.of([EditorState.readOnly.of(props.readonly), EditorView.editable.of(!props.readonly)]),
        sizeC.of(fontTheme(store.settings.editorFontSize)),
        theme,
        decoField,
        EditorView.contentAttributes.of({ 'aria-label': props.label, dir: 'ltr' }),
        EditorView.updateListener.of((u) => {
          if (u.docChanged) emit('update:modelValue', u.state.doc.toString())
          if (u.selectionSet || u.docChanged) emit('cursor', u.state.selection.main.head)
        }),
      ],
    }),
  })
  refreshDeco()
  refreshDiagnostics()
})

onBeforeUnmount(() => view.value?.destroy())

watch(() => props.modelValue, (v) => {
  if (!view.value) return
  const cur = view.value.state.doc.toString()
  if (v !== cur) view.value.dispatch({ changes: { from: 0, to: cur.length, insert: v } })
})
watch(() => props.lang, (l) => view.value?.dispatch({ effects: langC.reconfigure(languageFor(l)) }))
watch(() => props.readonly, (r) => view.value?.dispatch({ effects: roC.reconfigure([EditorState.readOnly.of(r), EditorView.editable.of(!r)]) }))
watch(() => store.settings.editorFontSize, (s) => view.value?.dispatch({ effects: sizeC.reconfigure(fontTheme(s)) }))
watch(() => [props.highlightLine, props.marks], () => {
  refreshDeco()
  if (props.highlightLine > 0 && view.value) {
    const doc = view.value.state.doc
    if (props.highlightLine <= doc.lines) view.value.dispatch({ effects: EditorView.scrollIntoView(doc.line(props.highlightLine).from, { y: 'nearest' }) })
  }
}, { deep: true })
watch(() => props.diagnostics, refreshDiagnostics, { deep: true })

defineExpose({
  focus: () => view.value?.focus(),
  setCursor(pos) {
    if (!view.value) return
    const p = Math.max(0, Math.min(pos, view.value.state.doc.length))
    view.value.dispatch({ selection: { anchor: p }, scrollIntoView: true })
    view.value.focus()
  },
})
</script>

<template>
  <div ref="host" class="code-editor" dir="ltr" :style="{ height }" />
</template>

<style scoped>
.code-editor { position: relative; overflow: hidden; background: var(--code-bg); text-align: left; }
.code-editor :deep(.cm-editor) { height: 100%; }
.code-editor :deep(.cm-editor.cm-focused) { outline: none; }
</style>
