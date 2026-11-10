import html from './html.js'
import css from './css.js'
import js from './js.js'
import vue from './vue.js'

export const TECHS = {
  html: { key: 'html', label: 'HTML', name: 'الهيكل' },
  css: { key: 'css', label: 'CSS', name: 'التنسيق' },
  js: { key: 'js', label: 'JavaScript', name: 'السلوك' },
  vue: { key: 'vue', label: 'Vue 3', name: 'الواجهات التفاعلية' },
}

export const terms = [...html, ...css, ...js, ...vue]
export const termById = Object.fromEntries(terms.map((t) => [t.id, t]))

// توحيد النص العربي للبحث: إزالة التشكيل والتطويل وتوحيد الألف والياء والتاء المربوطة
export function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[إأآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/[<>(){}.:@\-_/]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const index = terms.map((t) => ({
  t,
  primary: normalize(`${t.term} ${t.ar}`),
  secondary: normalize(`${t.say} ${t.pron} ${t.meaning} ${t.cat}`),
  body: normalize(`${t.explain} ${t.syntax}`),
}))

export function searchTerms(query, tech = 'all') {
  const q = normalize(query)
  const pool = index.filter((x) => tech === 'all' || x.t.tech === tech)
  if (!q) return pool.map((x) => x.t)
  const words = q.split(' ')
  const scored = []
  for (const x of pool) {
    let score = 0
    for (const w of words) {
      if (x.primary.split(' ').includes(w)) score += 10
      else if (x.primary.includes(w)) score += 6
      else if (x.secondary.includes(w)) score += 3
      else if (x.body.includes(w)) score += 1
      else { score = 0; break }
    }
    if (score > 0) scored.push([score, x.t])
  }
  return scored.sort((a, b) => b[0] - a[0]).map((s) => s[1])
}

// جداول ربط يستخدمها شارح الكود
export const htmlTagTerm = (tag) => {
  if (/^h[1-6]$/.test(tag)) return termById['html-h1']
  return termById[`html-${tag}`] || null
}

const CSS_PROP_MAP = {
  color: 'css-color', 'background-color': 'css-background', background: 'css-background',
  'font-size': 'css-font-size', 'font-family': 'css-font-family', 'font-weight': 'css-font-weight', 'line-height': 'css-line-height', 'text-align': 'css-text-align',
  margin: 'css-margin', padding: 'css-padding', border: 'css-border', 'border-radius': 'css-border-radius', 'box-sizing': 'css-box-sizing',
  width: 'css-width', 'max-width': 'css-width', 'min-width': 'css-width', height: 'css-width', 'max-height': 'css-width', 'min-height': 'css-width',
  display: 'css-display', 'flex-direction': 'css-flex-direction', 'justify-content': 'css-justify', 'align-items': 'css-align-items', gap: 'css-gap', 'row-gap': 'css-gap', 'column-gap': 'css-gap',
  flex: 'css-flex-item', 'flex-grow': 'css-flex-item', 'flex-shrink': 'css-flex-item', 'flex-basis': 'css-flex-item',
  'grid-template-columns': 'css-grid-template', 'grid-template-rows': 'css-grid-template', 'grid-column': 'css-grid-template', 'grid-row': 'css-grid-template',
  position: 'css-position', top: 'css-position', left: 'css-position', right: 'css-position', bottom: 'css-position', inset: 'css-position', 'z-index': 'css-z-index',
  transition: 'css-transition', animation: 'css-animation', 'animation-name': 'css-animation', transform: 'css-transform', opacity: 'css-opacity', 'box-shadow': 'css-box-shadow', overflow: 'css-overflow',
}
export const cssPropTerm = (prop) => {
  if (CSS_PROP_MAP[prop]) return termById[CSS_PROP_MAP[prop]]
  const base = prop.replace(/-(top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end)$/, '')
  if (CSS_PROP_MAP[base]) return termById[CSS_PROP_MAP[base]]
  if (/^(margin|padding)-(inline|block)/.test(prop)) return termById['css-logical']
  return null
}
