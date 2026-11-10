// بناء مستند المعاينة المعزول (srcdoc) لصفحات HTML/CSS/JS ومكوّنات Vue.
// العزل: iframe بخاصية sandbox="allow-scripts allow-forms" دون allow-same-origin،
// أي أن الصفحة تعمل في أصل مجهول (opaque origin) فلا تصل إلى localStorage أو كوكيز المنصة.
// إضافة إلى ذلك: سياسة CSP تمنع الاتصال بالشبكة، وحماية من الحلقات اللانهائية في السكربتات.
import { instrument } from './instrument.js'

export const SANDBOX_ATTR = 'allow-scripts allow-forms'

export const newToken = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')

function csp(origin) {
  return [
    "default-src 'none'",
    `script-src 'unsafe-inline' 'unsafe-eval' ${origin}`,
    "style-src 'unsafe-inline'",
    'img-src data: blob: https:',
    'font-src data:',
    'media-src data: blob:',
    "connect-src 'none'",
    "form-action 'none'",
    "frame-src 'none'",
    "worker-src 'none'",
  ].join('; ')
}

// سكربت الجسر: ينقل الطرفية والأخطاء إلى الصفحة الأم، ويشغّل فحوص التصحيح داخل المعاينة
function bridge(token) {
  return `(function(){
var TOKEN=${JSON.stringify(token)};
var post=function(type,data){try{var m=data||{};m.__satr=TOKEN;m.type=type;parent.postMessage(m,'*')}catch(e){}};
var LOGS=[];
var fmt=function(v,d,top){
  d=d||0;
  try{
    if(v===null)return'null';
    if(v===undefined)return'undefined';
    var t=typeof v;
    if(t==='string')return top?v:JSON.stringify(v);
    if(t==='number'||t==='boolean'||t==='bigint')return String(v);
    if(t==='symbol')return v.toString();
    if(t==='function')return'ƒ '+(v.name||'')+'()';
    if(v instanceof Error)return v.name+': '+v.message;
    if(typeof Element!=='undefined'&&v instanceof Element){return'<'+v.tagName.toLowerCase()+(v.id?'#'+v.id:'')+(v.classList&&v.classList.length?'.'+[].join.call(v.classList,'.'):'')+'>'}
    if(d>2)return Array.isArray(v)?'[…]':'{…}';
    if(Array.isArray(v))return'['+v.slice(0,50).map(function(x){return fmt(x,d+1)}).join(', ')+(v.length>50?', …':'')+']';
    if(typeof NodeList!=='undefined'&&v instanceof NodeList)return'NodeList('+v.length+')';
    var ks=Object.keys(v).slice(0,30);
    var name=v.constructor&&v.constructor.name&&v.constructor.name!=='Object'?v.constructor.name+' ':'';
    return name+'{'+ks.map(function(k){return k+': '+fmt(v[k],d+1)}).join(', ')+'}';
  }catch(e){return'[كائن]'}
};
var T=window.__t={line:0,file:'',n:0,pend:false,
  l:function(x,f){this.line=x;if(f)this.file=f;this.c()},
  g:function(){this.c()},
  c:function(){if(++this.n>3000000){this.n=0;var e=new Error('توقّف التنفيذ: حلقة لا تنتهي على الأغلب (تجاوزت 3 ملايين خطوة).');e.name='LimitError';throw e}
    if(!this.pend){this.pend=true;setTimeout(function(){T.n=0;T.pend=false},0)}}};
['log','info','warn','error','debug','table'].forEach(function(level){
  var orig=console[level];
  console[level]=function(){var a=[].slice.call(arguments);var text=a.map(function(x){return fmt(x,0,true)}).join(' ');
    LOGS.push(text);if(LOGS.length>500)LOGS.shift();
    post('log',{level:level==='debug'||level==='table'?'log':level,text:text,line:T.line,file:T.file});
    try{orig&&orig.apply(console,a)}catch(e){}};
});
window.addEventListener('error',function(e){
  if(e.target&&e.target!==window&&e.target.tagName){post('log',{level:'warn',text:'تعذّر تحميل المورد: <'+e.target.tagName.toLowerCase()+'> '+(e.target.src||e.target.href||'')});return}
  var err=e.error;post('error',{name:(err&&err.name)||'Error',message:(err&&err.message)||String(e.message||'').replace(/^Uncaught\\s+/,''),line:T.line,file:T.file});
},true);
window.addEventListener('unhandledrejection',function(e){var r=e.reason;post('error',{name:(r&&r.name)||'UnhandledRejection',message:(r&&r.message)||String(r),line:T.line,file:T.file})});
var toast=function(msg){try{var d=document.createElement('div');d.textContent=String(msg);d.setAttribute('style','position:fixed;inset-inline:12px;top:12px;z-index:2147483647;background:#1d2738;color:#fff;font:14px system-ui;padding:10px 14px;border-radius:10px;box-shadow:0 6px 24px rgba(0,0,0,.3)');(document.body||document.documentElement).appendChild(d);setTimeout(function(){d.remove()},2500)}catch(e){}};
window.alert=function(m){post('log',{level:'info',text:'alert(): '+fmt(m,0,true)});toast(m)};
window.confirm=function(m){post('log',{level:'info',text:'confirm(): '+fmt(m,0,true)+' ← أُعيدت القيمة true تلقائيًا في المعاينة'});return true};
window.prompt=function(m,def){post('log',{level:'info',text:'prompt(): '+fmt(m,0,true)+' ← أُعيدت القيمة الافتراضية في المعاينة'});return def===undefined?'':String(def)};
document.addEventListener('click',function(e){var a=e.target&&e.target.closest&&e.target.closest('a[href]');if(!a)return;var h=a.getAttribute('href')||'';if(h.charAt(0)==='#')return;e.preventDefault();post('log',{level:'info',text:'تم منع الانتقال إلى «'+h+'» داخل المعاينة المعزولة.'})},true);
var api={
  $:function(s){return document.querySelector(s)},
  $$:function(s){return [].slice.call(document.querySelectorAll(s))},
  el:function(x){return typeof x==='string'?document.querySelector(x):x},
  css:function(x,p){var e=api.el(x);if(!e)throw new Error('العنصر غير موجود: '+x);return getComputedStyle(e).getPropertyValue(p).trim()},
  text:function(x){var e=api.el(x);return e?e.textContent.replace(/\\s+/g,' ').trim():''},
  click:function(x){var e=api.el(x);if(!e)throw new Error('لا يوجد عنصر للنقر: '+x);e.click();return api.tick()},
  input:function(x,v){var e=api.el(x);if(!e)throw new Error('لا يوجد حقل: '+x);e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return api.tick()},
  key:function(x,k){var e=api.el(x);e.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true}));e.dispatchEvent(new KeyboardEvent('keyup',{key:k,bubbles:true}));return api.tick()},
  submit:function(x){var f=api.el(x);if(f.requestSubmit)f.requestSubmit();else f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));return api.tick()},
  wait:function(ms){return new Promise(function(r){setTimeout(r,ms||0)})},
  tick:function(){return new Promise(function(r){setTimeout(r,0)}).then(function(){return window.Vue&&Vue.nextTick?Vue.nextTick():null}).then(function(){return new Promise(function(r){setTimeout(r,0)})})},
  color:function(c){var p=document.createElement('i');p.style.color=c;document.body.appendChild(p);var v=getComputedStyle(p).color;p.remove();return v},
  px:function(v){return parseFloat(v)||0},
  logs:LOGS,doc:document,win:window
};
var runChecks=function(list){
  var out=[];var i=0;
  var next=function(){
    if(i>=list.length)return Promise.resolve(out);
    var c=list[i++];
    return Promise.race([
      Promise.resolve().then(function(){var f=new Function('api','return ('+c.test+')(api)');return f(api)}),
      new Promise(function(_,rej){setTimeout(function(){rej(new Error('انتهت مهلة الفحص'))},2500)})
    ]).then(function(r){out.push({title:c.title,pass:r===true,message:r===true?'':(typeof r==='string'?r:(c.fail||'لم يتحقق الشرط'))})},
      function(e){out.push({title:c.title,pass:false,message:c.fail||('خطأ أثناء الفحص: '+(e&&e.message||e))})}).then(next);
  };
  return next();
};
window.addEventListener('message',function(e){
  if(e.source!==parent)return;var d=e.data||{};if(d.__satr!==TOKEN)return;
  if(d.type==='set-style'){var s=document.getElementById('__satr_style');if(s)s.textContent=d.css}
  if(d.type==='run-checks'){api.files=d.files||{};runChecks(d.checks||[]).then(function(results){post('check-results',{results:results,runId:d.runId})})}
});
window.addEventListener('load',function(){post('loaded',{})});
})();`
}

function instrumentScript(code, fileTag, lineOffset) {
  const r = instrument(code, { mode: 'lines', fileTag, lineOffset })
  if (r.ok) return { code: r.code }
  return {
    code: `__t.file=${JSON.stringify(fileTag)};(function(){var e=new Error(${JSON.stringify(r.error.message)});e.name='SyntaxError';parent.postMessage({__satr:window.__satrToken,type:'error',name:'SyntaxError',message:e.message,line:${r.error.line},file:${JSON.stringify(fileTag)}},'*')})();`,
    syntax: r.error,
  }
}

const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi

// يجهّز السكربتات المضمّنة في HTML بحماية الحلقات ورقم السطر
function processInlineScripts(html, syntaxErrors) {
  return html.replace(SCRIPT_RE, (full, attrs, body, offset) => {
    if (/\bsrc\s*=/.test(attrs)) return full
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1]
    if (type && !/^(text\/javascript|application\/javascript|module)$/i.test(type)) return full
    if (type && /module/i.test(type)) return full
    const lineOffset = html.slice(0, offset + full.indexOf('>') + 1).split('\n').length - 1
    const r = instrumentScript(body, 'index.html', lineOffset)
    if (r.syntax) syntaxErrors.push({ ...r.syntax, file: 'index.html' })
    return `<script${attrs}>${r.code.replace(/<\/script/gi, '<\\/script')}</script>`
  })
}

function head(token, origin, includeVue) {
  return `<meta charset="utf-8" data-satr><meta http-equiv="Content-Security-Policy" content="${escapeAttr(csp(origin))}" data-satr><meta name="viewport" content="width=device-width, initial-scale=1" data-satr><script data-satr>window.__satrToken=${JSON.stringify(token)};${bridge(token)}</script>${includeVue ? `<script src="${origin}/vendor/vue.global.prod.js" data-satr></script>` : ''}`
}

function vendorOrigin() {
  if (typeof location === 'undefined') return 'http://localhost'
  return location.href.replace(/[#?].*$/, '').replace(/\/[^/]*$/, '')
}

/**
 * يبني مستند صفحة ويب من ملفات المستخدم.
 * @returns {{ doc: string, syntaxErrors: Array }}
 */
export function buildWebDoc({ html = '', css = '', js = '' }, { token, vue = false } = {}) {
  const base = vendorOrigin()
  const origin = base.match(/^[a-z]+:\/\/[^/]+/i)?.[0] || base
  const syntaxErrors = []
  const includeVue = vue || /\bVue\s*\./.test(html + '\n' + js)
  let body = processInlineScripts(html, syntaxErrors)
  const style = `<style id="__satr_style" data-satr>${css.replace(/<\/style/gi, '<\\/style')}</style>`
  let script = ''
  if (js.trim()) {
    const r = instrumentScript(js, 'script.js', 0)
    if (r.syntax) syntaxErrors.push({ ...r.syntax, file: 'script.js' })
    script = `<script data-satr-file="script.js">${r.code.replace(/<\/script/gi, '<\\/script')}</script>`
  }
  const hd = head(token, origin, includeVue).replace(`${origin}/vendor`, `${base}/vendor`)
  let doc
  if (/<html[\s>]/i.test(body) || /<head[\s>]/i.test(body) || /<body[\s>]/i.test(body)) {
    doc = body
    if (/<head[^>]*>/i.test(doc)) doc = doc.replace(/<head[^>]*>/i, (m) => m + hd)
    else if (/<html[^>]*>/i.test(doc)) doc = doc.replace(/<html[^>]*>/i, (m) => m + '<head>' + hd + '</head>')
    else doc = hd + doc
    doc = /<\/head>/i.test(doc) ? doc.replace(/<\/head>/i, style + '</head>') : doc.replace(hd, hd + style)
    doc = /<\/body>/i.test(doc) ? doc.replace(/<\/body>(?![\s\S]*<\/body>)/i, script + '</body>') : doc + script
  } else {
    // غلاف للمقاطع: بلا lang/dir حتى لا تنجح فحوص تتطلب أن يكتبها المتعلّم بنفسه
    doc = `<!doctype html><html data-satr-wrap><head>${hd}<style data-satr>html[data-satr-wrap]{direction:rtl}</style>${style}</head><body>${body}${script}</body></html>`
  }
  return { doc, syntaxErrors }
}

/** يبني مستند معاينة لمكوّن Vue مُترجَم */
export function buildVueDoc({ js, css }, { token } = {}) {
  const base = vendorOrigin()
  const origin = base.match(/^[a-z]+:\/\/[^/]+/i)?.[0] || base
  const hd = head(token, origin, true).replace(`${origin}/vendor`, `${base}/vendor`)
  const guarded = instrument(js, { mode: 'guard' })
  const code = guarded.ok ? guarded.code : js
  const mount = `
(function(){
  try {
    ${code}
    var app = Vue.createApp(__sfc__);
    app.config.errorHandler = function(err, inst, info){ parent.postMessage({__satr:window.__satrToken,type:'error',name:(err&&err.name)||'Error',message:((err&&err.message)||String(err))+' ('+info+')'},'*') };
    app.config.warnHandler = function(msg){ parent.postMessage({__satr:window.__satrToken,type:'log',level:'warn',text:'[Vue] '+msg},'*') };
    app.mount('#app');
  } catch (e) {
    parent.postMessage({__satr:window.__satrToken,type:'error',name:e.name||'Error',message:e.message||String(e)},'*');
  }
})();`
  const doc = `<!doctype html><html lang="ar" dir="rtl"><head>${hd}<style id="__satr_style">${(css || '').replace(/<\/style/gi, '<\\/style')}</style></head><body><div id="app"></div><script>${mount.replace(/<\/script/gi, '<\\/script')}</script></body></html>`
  return { doc, syntaxErrors: [] }
}
