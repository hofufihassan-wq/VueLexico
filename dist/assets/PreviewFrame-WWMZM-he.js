import{L as e,M as t,S as n,V as r,t as i,u as a,w as o,x as s}from"./_plugin-vue_export-helper-DrNfnDTu.js";import{t as c}from"./instrument-C1Wgdoj5.js";var l=`allow-scripts allow-forms`,u=()=>Math.random().toString(36).slice(2)+Date.now().toString(36),d=e=>String(e).replace(/&/g,`&amp;`).replace(/"/g,`&quot;`);function f(e){return[`default-src 'none'`,`script-src 'unsafe-inline' 'unsafe-eval' ${e}`,`style-src 'unsafe-inline'`,`img-src data: blob: https:`,`font-src data:`,`media-src data: blob:`,`connect-src 'none'`,`form-action 'none'`,`frame-src 'none'`,`worker-src 'none'`].join(`; `)}function p(e){return`(function(){
var TOKEN=${JSON.stringify(e)};
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
})();`}function m(e,t,n){let r=c(e,{mode:`lines`,fileTag:t,lineOffset:n});return r.ok?{code:r.code}:{code:`__t.file=${JSON.stringify(t)};(function(){var e=new Error(${JSON.stringify(r.error.message)});e.name='SyntaxError';parent.postMessage({__satr:window.__satrToken,type:'error',name:'SyntaxError',message:e.message,line:${r.error.line},file:${JSON.stringify(t)}},'*')})();`,syntax:r.error}}var h=/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;function g(e,t){return e.replace(h,(n,r,i,a)=>{if(/\bsrc\s*=/.test(r))return n;let o=(r.match(/\btype\s*=\s*["']?([^"'\s>]+)/i)||[])[1];if(o&&!/^(text\/javascript|application\/javascript|module)$/i.test(o)||o&&/module/i.test(o))return n;let s=m(i,`index.html`,e.slice(0,a+n.indexOf(`>`)+1).split(`
`).length-1);return s.syntax&&t.push({...s.syntax,file:`index.html`}),`<script${r}>${s.code.replace(/<\/script/gi,`<\\/script`)}<\/script>`})}function _(e,t,n){return`<meta charset="utf-8" data-satr><meta http-equiv="Content-Security-Policy" content="${d(f(t))}" data-satr><meta name="viewport" content="width=device-width, initial-scale=1" data-satr><script data-satr>window.__satrToken=${JSON.stringify(e)};${p(e)}<\/script>${n?`<script src="${t}/vendor/vue.global.prod.js" data-satr><\/script>`:``}`}function v(){return typeof location>`u`?`http://localhost`:location.href.replace(/[#?].*$/,``).replace(/\/[^/]*$/,``)}function y({html:e=``,css:t=``,js:n=``},{token:r,vue:i=!1}={}){let a=v(),o=a.match(/^[a-z]+:\/\/[^/]+/i)?.[0]||a,s=[],c=i||/\bVue\s*\./.test(e+`
`+n),l=g(e,s),u=`<style id="__satr_style" data-satr>${t.replace(/<\/style/gi,`<\\/style`)}</style>`,d=``;if(n.trim()){let e=m(n,`script.js`,0);e.syntax&&s.push({...e.syntax,file:`script.js`}),d=`<script data-satr-file="script.js">${e.code.replace(/<\/script/gi,`<\\/script`)}<\/script>`}let f=_(r,o,c).replace(`${o}/vendor`,`${a}/vendor`),p;return/<html[\s>]/i.test(l)||/<head[\s>]/i.test(l)||/<body[\s>]/i.test(l)?(p=l,p=/<head[^>]*>/i.test(p)?p.replace(/<head[^>]*>/i,e=>e+f):/<html[^>]*>/i.test(p)?p.replace(/<html[^>]*>/i,e=>e+`<head>`+f+`</head>`):f+p,p=/<\/head>/i.test(p)?p.replace(/<\/head>/i,u+`</head>`):p.replace(f,f+u),p=/<\/body>/i.test(p)?p.replace(/<\/body>(?![\s\S]*<\/body>)/i,d+`</body>`):p+d):p=`<!doctype html><html data-satr-wrap><head>${f}<style data-satr>html[data-satr-wrap]{direction:rtl}</style>${u}</head><body>${l}${d}</body></html>`,{doc:p,syntaxErrors:s}}function b({js:e,css:t},{token:n}={}){let r=v(),i=r.match(/^[a-z]+:\/\/[^/]+/i)?.[0]||r,a=_(n,i,!0).replace(`${i}/vendor`,`${r}/vendor`),o=c(e,{mode:`guard`}),s=`
(function(){
  try {
    ${o.ok?o.code:e}
    var app = Vue.createApp(__sfc__);
    app.config.errorHandler = function(err, inst, info){ parent.postMessage({__satr:window.__satrToken,type:'error',name:(err&&err.name)||'Error',message:((err&&err.message)||String(err))+' ('+info+')'},'*') };
    app.config.warnHandler = function(msg){ parent.postMessage({__satr:window.__satrToken,type:'log',level:'warn',text:'[Vue] '+msg},'*') };
    app.mount('#app');
  } catch (e) {
    parent.postMessage({__satr:window.__satrToken,type:'error',name:e.name||'Error',message:e.message||String(e)},'*');
  }
})();`;return{doc:`<!doctype html><html lang="ar" dir="rtl"><head>${a}<style id="__satr_style">${(t||``).replace(/<\/style/gi,`<\\/style`)}</style></head><body><div id="app"></div><script>${s.replace(/<\/script/gi,`<\\/script`)}<\/script></body></html>`,syntaxErrors:[]}}var x=[`sandbox`,`srcdoc`,`title`],S={key:1,class:`preview empty`},C=i({__name:`PreviewFrame`,props:{doc:{type:String,default:``},token:{type:String,required:!0},title:{type:String,default:`معاينة`}},emits:[`log`,`error`,`loaded`],setup(i,{expose:c,emit:u}){let d=i,f=u,p=e(null),m=new Map,h=0,g=null,_=Promise.resolve();function v(){_=new Promise(e=>{g=e})}v();let y=e(0);t(()=>d.doc,()=>{y.value++,v()},{flush:`sync`});function b(e){if(!p.value||e.source!==p.value.contentWindow)return;let t=e.data;if(t&&t.__satr===d.token){if(t.type===`log`)f(`log`,{level:t.level,text:t.text,line:t.line,file:t.file});else if(t.type===`error`)f(`error`,{name:t.name,message:t.message,line:t.line,file:t.file});else if(t.type===`loaded`)g?.(),f(`loaded`);else if(t.type===`check-results`){let e=m.get(t.runId);e&&(m.delete(t.runId),e(t.results))}}}n(()=>window.addEventListener(`message`,b)),s(()=>window.removeEventListener(`message`,b));async function C(e,t={}){await Promise.race([_,new Promise(e=>setTimeout(e,4e3))]),await new Promise(e=>setTimeout(e,60));let n=++h;return new Promise(r=>{let i=setTimeout(()=>{m.delete(n),r(e.map(e=>({title:e.title,pass:!1,message:`لم تستجب المعاينة (ربما توقف الكود في حلقة لا تنتهي أو حدث خطأ قبل التحميل).`})))},2e4);m.set(n,e=>{clearTimeout(i),r(e)}),p.value?.contentWindow?.postMessage({__satr:d.token,type:`run-checks`,runId:n,checks:e.map(e=>({title:e.title,test:e.test,fail:e.fail})),files:JSON.parse(JSON.stringify(t))},`*`)})}function w(e){p.value?.contentWindow?.postMessage({__satr:d.token,type:`set-style`,css:e},`*`)}return c({runChecks:C,setStyle:w,whenLoaded:()=>_}),(e,t)=>i.doc?(o(),a(`iframe`,{key:y.value,ref_key:`frame`,ref:p,class:`preview`,sandbox:r(l),srcdoc:i.doc,title:i.title,referrerpolicy:`no-referrer`},null,8,x)):(o(),a(`div`,S))}},[[`__scopeId`,`data-v-ebdc98b4`]]);export{u as i,b as n,y as r,C as t};