const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./DashboardView-CfNAaDm2.js","./_plugin-vue_export-helper-DrNfnDTu.js","./DashboardView-CTLAuNXf.css","./LearnView-BvP7y9Bu.js","./LearnView-Cj4mnuEK.css","./LessonView-DxH5uKrT.js","./CodeEditor-BJQ51YjD.js","./CodeEditor-D8Z2FS4G.css","./handoff-CGLzpjBq.js","./Workspace-B38IQvgL.js","./PreviewFrame-WWMZM-he.js","./instrument-C1Wgdoj5.js","./PreviewFrame-BI8HRcdJ.css","./ErrorCard-DiF6EVUc.js","./errors-DkCqQp7M.js","./ErrorCard-BBNO0THl.css","./useRunner-D-cF2omC.js","./vueCompile-hDryRnS5.js","./runJs-B6ipzgfA.js","./Workspace-PFjx_nZM.css","./ExerciseRunner-C0f-yBH_.js","./grader-DxK2VFKt.js","./ExerciseRunner-CSXDjz3-.css","./LessonView-DhE65GYh.css","./ReviewView-CKXyGQRU.js","./ReviewView-C2ldAwXy.css","./EditorView-DTWvNZmu.js","./EditorView-BlF1AEpG.css","./ExplainView-BifRS1pL.js","./js-Cua8vb1t.js","./csstree.esm-Cdr-ZcG6.js","./ExplainView-DsBjFYBf.css","./CssLabView-CLod1vZF.js","./CssLabView-C7HjMzhn.css","./JsLabView-rmOpZbLD.js","./timeline-CUY14YpG.js","./JsLabView-3peS7UJA.css","./VisualizerView-qbI2Oo4j.js","./VisualizerView-CG00zdC7.css","./DictionaryView-CDXG9GZX.js","./DictionaryView-D1hVjUaY.css","./PracticeView-JnAHGOI9.js","./PracticeView-BsneO_NF.css","./PracticeItemView-D8Bzrg4l.js","./PracticeItemView-CXWv1RX_.css","./SettingsView-CjBBvIAw.js","./SettingsView-fzs3P34x.css","./SelfTestView-DkPvyRin.js","./SelfTestView-C74ty9zb.css","./NotFoundView-kqcY8wAP.js","./NotFoundView-CyKz7wZg.css"])))=>i.map(i=>d[i]);
import{$ as e,A as t,B as n,C as r,D as i,E as a,F as o,G as s,H as c,I as l,J as u,K as d,L as f,M as p,N as m,O as ee,P as te,Q as h,R as ne,S as re,T as g,U as ie,V as _,W as v,X as ae,Y as oe,Z as y,_ as se,a as b,at as ce,b as le,c as ue,ct as x,d as de,et as fe,g as pe,h as me,i as S,it as he,j as ge,k as _e,l as C,lt as ve,m as w,n as ye,nt as be,o as T,ot as xe,p as Se,q as Ce,r as we,rt as Te,s as E,t as Ee,tt as D,u as O,v as De,w as k,x as Oe,y as ke,z as Ae}from"./_plugin-vue_export-helper-DrNfnDTu.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var je=void 0,Me=typeof window<`u`&&window.trustedTypes;if(Me)try{je=Me.createPolicy(`vue`,{createHTML:e=>e})}catch{}var Ne=je?e=>je.createHTML(e):e=>e,Pe=`http://www.w3.org/2000/svg`,Fe=`http://www.w3.org/1998/Math/MathML`,A=typeof document<`u`?document:null,Ie=A&&A.createElement(`template`),Le={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?A.createElementNS(Pe,e):t===`mathml`?A.createElementNS(Fe,e):n?A.createElement(e,{is:n}):A.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>A.createTextNode(e),createComment:e=>A.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>A.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==a&&(i=i.nextSibling););else{Ie.innerHTML=Ne(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=Ie.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},j=`transition`,Re=`animation`,ze=Symbol(`_vtc`),Be={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},Ve=v({},we,Be),He=(e=>(e.displayName=`Transition`,e.props=Ve,e))((e,{slots:t})=>De(ye,Ge(e),t)),Ue=(e,t=[])=>{u(e)?e.forEach(e=>e(...t)):e&&e(...t)},We=e=>e?u(e)?e.some(e=>e.length>1):e.length>1:!1;function Ge(e){let t={};for(let n in e)n in Be||(t[n]=e[n]);if(e.css===!1)return t;let{name:n=`v`,type:r,duration:i,enterFromClass:a=`${n}-enter-from`,enterActiveClass:o=`${n}-enter-active`,enterToClass:s=`${n}-enter-to`,appearFromClass:c=a,appearActiveClass:l=o,appearToClass:u=s,leaveFromClass:d=`${n}-leave-from`,leaveActiveClass:f=`${n}-leave-active`,leaveToClass:p=`${n}-leave-to`}=e,m=Ke(i),ee=m&&m[0],te=m&&m[1],{onBeforeEnter:h,onEnter:ne,onEnterCancelled:re,onLeave:g,onLeaveCancelled:ie,onBeforeAppear:_=h,onAppear:ae=ne,onAppearCancelled:oe=re}=t,y=(e,t,n,r)=>{e._enterCancelled=r,N(e,t?u:s),N(e,t?l:o),n&&n()},se=(e,t)=>{e._isLeaving=!1,N(e,d),N(e,p),N(e,f),t&&t()},b=e=>(t,n)=>{let i=e?ae:ne,o=()=>y(t,e,n);Ue(i,[t,o]),Je(()=>{N(t,e?c:a),M(t,e?u:s),We(i)||Xe(t,r,ee,o)})};return v(t,{onBeforeEnter(e){Ue(h,[e]),M(e,a),M(e,o)},onBeforeAppear(e){Ue(_,[e]),M(e,c),M(e,l)},onEnter:b(!1),onAppear:b(!0),onLeave(e,t){e._isLeaving=!0;let n=()=>se(e,t);M(e,d),e._enterCancelled?(M(e,f),et(e)):(et(e),M(e,f)),Je(()=>{e._isLeaving&&(N(e,d),M(e,p),We(g)||Xe(e,r,te,n))}),Ue(g,[e,n])},onEnterCancelled(e){y(e,!1,void 0,!0),Ue(re,[e])},onAppearCancelled(e){y(e,!0,void 0,!0),Ue(oe,[e])},onLeaveCancelled(e){se(e),Ue(ie,[e])}})}function Ke(e){if(e==null)return null;if(y(e))return[qe(e.enter),qe(e.leave)];{let t=qe(e);return[t,t]}}function qe(e){return ve(e)}function M(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.add(t)),(e[ze]||(e[ze]=new Set)).add(t)}function N(e,t){t.split(/\s+/).forEach(t=>t&&e.classList.remove(t));let n=e[ze];n&&(n.delete(t),n.size||(e[ze]=void 0))}function Je(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}var Ye=0;function Xe(e,t,n,r){let i=e._endId=++Ye,a=()=>{i===e._endId&&r()};if(n!=null)return setTimeout(a,n);let{type:o,timeout:s,propCount:c}=Ze(e,t);if(!o)return r();let l=o+`end`,u=0,d=()=>{e.removeEventListener(l,f),a()},f=t=>{t.target===e&&++u>=c&&d()};setTimeout(()=>{u<c&&d()},s+1),e.addEventListener(l,f)}function Ze(e,t){let n=window.getComputedStyle(e),r=e=>(n[e]||``).split(`, `),i=r(`${j}Delay`),a=r(`${j}Duration`),o=Qe(i,a),s=r(`${Re}Delay`),c=r(`${Re}Duration`),l=Qe(s,c),u=null,d=0,f=0;t===j?o>0&&(u=j,d=o,f=a.length):t===Re?l>0&&(u=Re,d=l,f=c.length):(d=Math.max(o,l),u=d>0?o>l?j:Re:null,f=u?u===j?a.length:c.length:0);let p=u===j&&/\b(?:transform|all)(?:,|$)/.test(r(`${j}Property`).toString());return{type:u,timeout:d,propCount:f,hasTransform:p}}function Qe(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((t,n)=>$e(t)+$e(e[n])))}function $e(e){return e===`auto`?0:Number(e.slice(0,-1).replace(`,`,`.`))*1e3}function et(e){return(e?e.ownerDocument:document).body.offsetHeight}function tt(e,t,n){let r=e[ze];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var nt=Symbol(`_vod`),rt=Symbol(`_vsh`),it={name:`show`,beforeMount(e,{value:t},{transition:n}){e[nt]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):at(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),at(e,!0),r.enter(e)):r.leave(e,()=>{at(e,!1)}):at(e,t))},beforeUnmount(e,{value:t}){at(e,t)}};function at(e,t){e.style.display=t?e[nt]:`none`,e[rt]=!t}var ot=Symbol(``),st=/(?:^|;)\s*display\s*:/;function ct(e,t,n){let r=e.style,i=D(n),a=!1;if(n&&!i){if(t){if(D(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??ut(r,t,``)}else for(let e in t)n[e]??ut(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?ut(r,i,``):mt(e,i,!D(t)&&t?t[i]:void 0,o)||ut(r,i,o)}}else if(i){if(t!==n){let e=r[ot];e&&(n+=`;`+e),r.cssText=n,a=st.test(n)}}else t&&e.removeAttribute(`style`);nt in e&&(i&&t===n||(e[nt]=a?r.display:``),e[rt]&&(r.display=`none`))}var lt=/\s*!important$/;function ut(e,t,n){if(u(n))n.forEach(n=>ut(e,t,n));else if(n??=``,t.startsWith(`--`))lt.test(n)?e.setProperty(t,n.replace(lt,``),`important`):e.setProperty(t,n);else{let r=pt(e,t);lt.test(n)?e.setProperty(s(r),n.replace(lt,``),`important`):e[r]=n}}var dt=[`Webkit`,`Moz`,`ms`],ft={};function pt(e,t){let n=ft[t];if(n)return n;let r=c(t);if(r!==`filter`&&r in e)return ft[t]=r;r=ie(r);for(let n=0;n<dt.length;n++){let i=dt[n]+r;if(i in e)return ft[t]=i}return t}function mt(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&D(r)&&n===r}var ht=`http://www.w3.org/1999/xlink`;function gt(e,t,n,r,i,a=fe(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(ht,t.slice(6,t.length)):e.setAttributeNS(ht,t,n):n==null||a&&!d(n)?e.removeAttribute(t):e.setAttribute(t,a?``:be(n)?String(n):n)}function _t(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?Ne(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);r===i&&`_value`in e||(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=d(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function P(e,t,n,r){e.addEventListener(t,n,r)}function vt(e,t,n,r){e.removeEventListener(t,n,r)}var yt=Symbol(`_vei`);function bt(e,t,n,r,i=null){let a=e[yt]||(e[yt]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=Ct(t);r?P(e,n,a[t]=Dt(r,i),s):o&&(vt(e,n,o,s),a[t]=void 0)}}var xt=/(Once|Passive|Capture)$/,St=/^on:?(?:Once|Passive|Capture)$/;function Ct(e){let t,n;for(;(n=e.match(xt))&&!St.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):s(e.slice(2)),t]}var wt=0,Tt=Promise.resolve(),Et=()=>wt||=(Tt.then(()=>wt=0),Date.now());function Dt(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(u(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&b(e,t,5,a)}}else b(r,t,5,[e])};return n.value=e,n.attached=Et(),n}var Ot=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,kt=(e,t,n,r,i,a)=>{let o=i===`svg`;t===`class`?tt(e,r,o):t===`style`?ct(e,n,r):h(t)?ae(t)||bt(e,t,n,r,a):(t[0]===`.`?(t=t.slice(1),1):t[0]===`^`?(t=t.slice(1),0):At(e,t,r,o))?(_t(e,t,r),e.tagName.includes(`-`)||t!==`value`&&t!==`checked`&&t!==`selected`||gt(e,t,r,o,a,t!==`value`)):e._isVueCE&&(jt(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!D(r)))?_t(e,c(t),r,a,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),gt(e,t,r,o))};function At(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&Ot(t)&&oe(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return Ot(t)&&D(n)?!1:t in e}function jt(e,t){let n=e._def.props;if(!n)return!1;let r=c(t);return Array.isArray(n)?n.some(e=>c(e)===r):Object.keys(n).some(e=>c(e)===r)}var Mt=new WeakMap,Nt=new WeakMap,Pt=Symbol(`_moveCb`),Ft=Symbol(`_enterCb`),It=new WeakMap,Lt=(e=>(delete e.props.mode,e))({name:`TransitionGroup`,props:v({},Ve,{tag:String,moveClass:String}),setup(e,{slots:i}){let a=pe(),o=ge(),s,c,l,u,d=()=>(u===void 0&&(u=s.length>0&&Kt(s[0].el,a.vnode.el,zt(e))),u);return r(()=>{if(It.delete(a),!d()){s=[],l=void 0;return}let t=zt(e);s.forEach(Rt);let n=l&&Gt(l,a.vnode.el);l=void 0,s.forEach(e=>Bt(e,n));let r=s.filter(Vt);et(a.vnode.el),r.forEach(e=>{let n=e.el,r=n.style;M(n,t),r.transform=r.webkitTransform=r.transitionDuration=``;let i=n[Pt]=e=>{e&&e.target!==n||(!e||e.propertyName.endsWith(`transform`))&&(n.removeEventListener(`transitionend`,i),n[Pt]=null,N(n,t))};n.addEventListener(`transitionend`,i)}),s=[]}),()=>{let r=n(e),f=Ge(r),p=r.tag||S;if(s=[],u=void 0,c)for(let e=0;e<c.length;e++){let n=c[e];n.el&&n.el instanceof Element&&!n.el[rt]&&(s.push(n),t(n,_e(n,f,o,a)),Mt.set(n,Ht(n.el)))}c=i.default?se(i.default()):[];for(let e=0;e<c.length;e++){let n=c[e];n.key!=null&&t(n,_e(n,f,o,a))}return s.length&&(l=Ut(a),It.set(a,d)),w(p,null,c)}}});function Rt(e){let t=e.el;t[Pt]&&t[Pt](),t[Ft]&&t[Ft]()}function zt(e){return e.moveClass||`${e.name||`v`}-move`}function Bt(e,t){Nt.set(e,Ht(e.el,t))}function Vt(e){let t=Mt.get(e),n=Nt.get(e),r=t.left-n.left,i=t.top-n.top;if(r||i){let t=e.el,n=t.style,a=t.getBoundingClientRect(),o=1,s=1;return t.offsetWidth&&(o=a.width/t.offsetWidth),t.offsetHeight&&(s=a.height/t.offsetHeight),Number.isFinite(o)&&o!==0||(o=1),Number.isFinite(s)&&s!==0||(s=1),Math.abs(o-1)<.01&&(o=1),Math.abs(s-1)<.01&&(s=1),n.transform=n.webkitTransform=`translate(${r/o}px,${i/s}px)`,n.transitionDuration=`0s`,e}}function Ht(e,t){let n=e.getBoundingClientRect();return{left:n.left-(t?t.left:0),top:n.top-(t?t.top:0)}}function Ut(e){let t;for(let n=e.parent;n;n=n.parent){let r=It.get(n);if(r){let i=Wt(n.vnode.el,e.vnode.el);i&&(t||=[]).push(v(Ht(i),{item:i,willMove:r}))}}return t}function Wt(e,t){let n=e.nodeType===1?e:e.parentNode;for(;t&&t.parentNode!==n;)t=t.parentNode;if(t&&t.nodeType===1)return t}function Gt(e,t){let n=e.find(e=>e.willMove()&&e.item.contains(t));return n&&Ht(n.item,n)}function Kt(e,t,n){let r=e.cloneNode(),i=e[ze];i&&i.forEach(e=>{e.split(/\s+/).forEach(e=>e&&r.classList.remove(e))}),n.split(/\s+/).forEach(e=>e&&r.classList.add(e)),r.style.display=`none`;let a=t.nodeType===1?t:t.parentNode;a.appendChild(r);let{hasTransform:o}=Ze(r);return a.removeChild(r),o}var qt=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return u(t)?e=>Ce(t,e):t};function Jt(e){e.target.composing=!0}function Yt(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var F=Symbol(`_assign`),Xt=Symbol(`_initialValue`);function Zt(e,t,n){return t&&(e=e.trim()),n&&(e=ce(e)),e}var Qt={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e.parentNode&&(e.type===`text`?e[Xt]=e.defaultValue.replace(/[\r\n]/g,``):e.type===`textarea`&&(e[Xt]=e.defaultValue.replace(/\r\n?/g,`
`))),e[F]=qt(i);let a=r||i.props&&i.props.type===`number`;P(e,t?`change`:`input`,t=>{t.target.composing||e[F](Zt(e.value,n,a))}),(n||a)&&P(e,`change`,()=>{e.value=Zt(e.value,n,a)}),t||(P(e,`compositionstart`,Jt),P(e,`compositionend`,Yt),P(e,`change`,Yt))},mounted(e,{value:t,modifiers:{trim:n,number:r}}){let i=t??``,a=e[Xt];delete e[Xt],a!==void 0&&(e.type===`text`||e.type===`textarea`)&&e.value!==a?e[F](Zt(e.value,n,r)):e.value=i},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[F]=qt(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?ce(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},$t={deep:!0,created(t,n,r){t[F]=qt(r),P(t,`change`,()=>{let n=t._modelValue,r=an(t),i=t.checked,a=t[F];if(u(n)){let e=he(n,r),t=e!==-1;if(i&&!t)a(n.concat(r));else if(!i&&t){let t=[...n];t.splice(e,1),a(t)}}else if(e(n)){let e=new Set(n);i?e.add(r):e.delete(r),a(e)}else a(on(t,i))})},mounted:en,beforeUpdate(e,t,n){e[F]=qt(n),en(e,t,n)}};function en(t,{value:n,oldValue:r},i){t._modelValue=n;let a;if(u(n))a=he(n,i.props.value)>-1;else if(e(n))a=n.has(i.props.value);else{if(n===r)return;a=Te(n,on(t,!0))}t.checked!==a&&(t.checked=a)}var tn={deep:!0,created(t,{value:n,modifiers:{number:r}},i){t._modelValue=n,P(t,`change`,()=>{let n=Array.prototype.filter.call(t.options,e=>e.selected).map(e=>r?ce(an(e)):an(e)),i=t.multiple,a=i?e(t._modelValue)?new Set(n):n:n[0],o=t._pendingValue=[i,i?u(a)?n.slice():n:a];try{t[F](a)}finally{le(()=>{t._pendingValue===o&&(t._pendingValue=void 0)})}}),t[F]=qt(i)},mounted(e,{value:t,modifiers:{number:n}}){rn(e,t,n)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[F]=qt(n)},updated(e,{value:t,modifiers:{number:n}}){let r=e._pendingValue;e._pendingValue=void 0,r&&r[0]===e.multiple&&nn(t,r[1],r[0])||rn(e,t,n)}};function nn(t,n,r){if(!r||u(t))return Te(t,n);if(e(t)){if(t.size!==n.length)return!1;for(let e of n)if(!t.has(e))return!1;return!0}return!1}function rn(t,n,r=!1){let i=t.multiple,a=u(n);if(!i||a||e(n)){for(let e=0,o=t.options.length;e<o;e++){let o=t.options[e],s=an(o);if(i){if(a){let e=typeof s;o.selected=e===`string`||e===`number`?n.some(e=>String(e)===String(s)):he(n,s)>-1}else o.selected=n.has(s)||r&&typeof s==`string`&&n.has(ce(s))}else if(Te(an(o),n)){t.selectedIndex!==e&&(t.selectedIndex=e);return}}!i&&t.selectedIndex!==-1&&(t.selectedIndex=-1)}}function an(e){return`_value`in e?e._value:e.value}function on(e,t){let n=t?`_trueValue`:`_falseValue`;return n in e?e[n]:t}var sn=[`ctrl`,`shift`,`alt`,`meta`],cn={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>sn.some(n=>e[`${n}Key`]&&!t.includes(n))},ln=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=cn[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},un=v({patchProp:kt},Le),dn;function fn(){return dn||=de(un)}var pn=((...e)=>{let t=fn().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=hn(e);if(!r)return;let i=t._component;oe(i)||i.render||i.template||(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,mn(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function mn(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function hn(e){return D(e)?document.querySelector(e):e}var gn=e=>e.startsWith(`/`);function _n(e){return typeof e==`object`||`displayName`in e||`props`in e||`__vccOpts`in e}function vn(e){return e.__esModule||e[Symbol.toStringTag]===`Module`||e.default&&_n(e.default)}var I=Object.assign;function yn(e,t){let n={};for(let r in t){let i=t[r];n[r]=L(i)?i.map(e):e(i)}return n}var bn=()=>{},L=Array.isArray;function xn(e,t){let n={};for(let r in e)n[r]=r in t?t[r]:e[r];return n}var Sn=Symbol(``);function Cn(e,t){return I(Error(),{type:e,[Sn]:!0},t)}function R(e,t){return e instanceof Error&&Sn in e&&(t==null||!!(e.type&t))}var wn=Symbol(``),Tn=Symbol(``),En=Symbol(``),Dn=Symbol(``),On=Symbol(``),kn=Symbol(``);function An(){return ke(En)}function jn(e){return ke(Dn)}var Mn=typeof document<`u`,Nn=/#/g,Pn=/&/g,Fn=/\//g,In=/=/g,Ln=/\?/g,Rn=/\+/g,zn=/%5B/g,Bn=/%5D/g,Vn=/%5E/g,Hn=/%60/g,Un=/%7B/g,Wn=/%7C/g,Gn=/%7D/g,Kn=/%20/g;function qn(e){return e==null?``:encodeURI(``+e).replace(Wn,`|`).replace(zn,`[`).replace(Bn,`]`)}function Jn(e){return qn(e).replace(Un,`{`).replace(Gn,`}`).replace(Vn,`^`)}function Yn(e){return qn(e).replace(Rn,`%2B`).replace(Kn,`+`).replace(Nn,`%23`).replace(Pn,`%26`).replace(Hn,"`").replace(Un,`{`).replace(Gn,`}`).replace(Vn,`^`)}function Xn(e){return Yn(e).replace(In,`%3D`)}function Zn(e){return qn(e).replace(Nn,`%23`).replace(Ln,`%3F`)}function Qn(e){return Zn(e).replace(Fn,`%2F`)}function $n(e){if(e==null)return null;try{return decodeURIComponent(``+e)}catch{}return``+e}var er=/\/$/,tr=e=>e.replace(er,``);function nr(e,t,n=`/`){let r,i={},a=``,o=``,s=t.indexOf(`#`),c=t.indexOf(`?`);return c=s>=0&&c>s?-1:c,c>=0&&(r=t.slice(0,c),a=t.slice(c,s>0?s:t.length),i=e(a.slice(1))),s>=0&&(r||=t.slice(0,s),o=t.slice(s,t.length)),r=ur(r??t,n),{fullPath:r+a+o,path:r,query:i,hash:$n(o)}}function rr(e,t){let n=t.query?e(t.query):``;return t.path+(n&&`?`)+n+(t.hash||``)}function ir(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||`/`}function ar(e,t,n){let r=t.matched.length-1,i=n.matched.length-1;return r>-1&&r===i&&or(t.matched[r],n.matched[i])&&sr(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function or(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function sr(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var n in e)if(!cr(e[n],t[n]))return!1;return!0}function cr(e,t){return L(e)?lr(e,t):L(t)?lr(t,e):(e&&e.valueOf())===(t&&t.valueOf())}function lr(e,t){return L(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e.length===1&&e[0]===t}function ur(e,t){if(gn(e))return e;if(!e)return t;let n=t.split(`/`),r=e.split(`/`),i=r[r.length-1];(i===`..`||i===`.`)&&r.push(``);let a=n.length-1,o,s;for(o=0;o<r.length;o++)if(s=r[o],s!==`.`){if(s===`..`)a>1&&a--;else break}return n.slice(0,a).join(`/`)+`/`+r.slice(o).join(`/`)}var z={path:`/`,name:void 0,params:{},query:{},hash:``,fullPath:`/`,matched:[],meta:{},redirectedFrom:void 0};function dr(e){let t={};for(let n in z)Object.defineProperty(t,n,{get:()=>e.value[n],enumerable:!0});return ne(t)}function fr(e){if(!e){if(Mn){let t=document.querySelector(`base`);e=t&&t.getAttribute(`href`)||`/`,e=e.replace(/^\w+:\/\/[^/]+/,``)}else e=`/`}return e[0]!==`/`&&e[0]!==`#`&&(e=`/`+e),tr(e)}var pr=/^[^#]+#/;function mr(e,t){return e.replace(pr,`#`)+t}function hr(e,t){let n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}function gr(e){let t;if(`el`in e){let n=e.el,r=typeof n==`string`&&n.startsWith(`#`),i=typeof n==`string`?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!i)return;t=hr(i,e)}else t=e;`scrollBehavior`in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left==null?window.scrollX:t.left,t.top==null?window.scrollY:t.top)}var _r=`vue-router:scroll`;function vr(){try{return I({},JSON.parse(sessionStorage[_r]))}catch{return{}}}var yr=vr();function br(){try{sessionStorage[_r]=JSON.stringify(yr)}catch{}}function xr(e,t){return(history.state?history.state.position-t:-1)+e}function Sr(e,t=0){history.scrollRestoration===`manual`&&(yr[xr(e,t)]={left:window.scrollX,top:window.scrollY},br())}function Cr(e){let t=xr(e,0),n=yr[t];return delete yr[t],br(),n}function wr(e,t=!1){for(let n in yr){let r=parseInt(n,10);(r===e||!t&&r>e)&&delete yr[n]}br()}function Tr(e){return typeof e==`string`||e&&typeof e==`object`}function Er(e){return typeof e==`string`||typeof e==`symbol`}function Dr(e){let t={};if(e===``||e===`?`)return t;let n=(e[0]===`?`?e.slice(1):e).split(`&`);for(let e=0;e<n.length;++e){let r=n[e].replace(Rn,` `),i=r.indexOf(`=`),a=$n(i<0?r:r.slice(0,i)),o=i<0?null:$n(r.slice(i+1));if(a in t){let e=t[a];L(e)||(e=t[a]=[e]),e.push(o)}else t[a]=o}return t}function Or(e){let t=``;for(let n in e){let r=e[n];n=Xn(n),r==null?r!==void 0&&(t+=(t.length?`&`:``)+n):(L(r)?r.map(e=>e&&Yn(e)):[r&&Yn(r)]).forEach(e=>{e!==void 0&&(t+=(t.length?`&`:``)+n,e!=null&&(t+=`=`+e))})}return t}function kr(e){let t={};for(let n in e){let r=e[n];r!==void 0&&(t[n]=L(r)?r.map(e=>e==null?null:``+e):r==null?r:``+r)}return t}function Ar(){let e=[];function t(t){return e.push(t),()=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function B(e,t,n,r,i,a=e=>e()){let o=r&&(r.enterCallbacks[i]=r.enterCallbacks[i]||[]);return()=>new Promise((s,c)=>{let l=e=>{e===!1?c(Cn(4,{from:n,to:t})):e instanceof Error?c(e):Tr(e)?c(Cn(2,{from:t,to:e})):(o&&r.enterCallbacks[i]===o&&typeof e==`function`&&o.push(e),s())},u=a(()=>e.call(r&&r.instances[i],t,n,l)),d=Promise.resolve(u);e.length<3&&(d=d.then(l)),d.catch(e=>c(e))})}function jr(e,t,n,r,i=e=>e()){let a=[];for(let o of e)for(let e in o.components){let s=o.components[e];if(t===`beforeRouteEnter`||o.instances[e]){if(_n(s)){let c=(s.__vccOpts||s)[t];c&&a.push(B(c,n,r,o,e,i))}else{let c=s();a.push(()=>c.then(a=>{if(!a)throw Error(`Couldn't resolve component "${e}" at "${o.path}"`);let s=vn(a)?a.default:a;o.mods[e]=a,o.components[e]=s;let c=(s.__vccOpts||s)[t];return c&&B(c,n,r,o,e,i)()}))}}}return a}function Mr(e,t){let n=[],r=[],i=[],a=Math.max(t.matched.length,e.matched.length);for(let o=0;o<a;o++){let a=t.matched[o];a&&(e.matched.find(e=>or(e,a))?r.push(a):n.push(a));let s=e.matched[o];s&&(t.matched.find(e=>or(e,s))||i.push(s))}return[n,r,i]}var Nr=()=>location.protocol+`//`+location.host;function Pr(e,t){let{pathname:n,search:r,hash:i}=t,a=e.indexOf(`#`);if(a>-1){let t=i.includes(e.slice(a))?e.slice(a).length:1,n=i.slice(t);return n[0]!==`/`&&(n=`/`+n),ir(n,``)}return ir(n,e)+r+i}function Fr(e,t,n,r){let i=[],a=[],o=null,s=({state:a})=>{let s=Pr(e,location),c=n.value,l=t.value,u=0;if(a){if(n.value=s,t.value=a,o&&o===c){o=null;return}u=l?a.position-l.position:0}else r(s);i.forEach(e=>{e(n.value,c,{delta:u,type:`pop`,direction:u?u>0?`forward`:`back`:``})})};function c(){o=n.value}function l(e){i.push(e);let t=()=>{let t=i.indexOf(e);t>-1&&i.splice(t,1)};return a.push(t),t}function u(){Sr(n.value)}function d(){for(let e of a)e();a=[],window.removeEventListener(`popstate`,s),window.removeEventListener(`pagehide`,u)}return window.addEventListener(`popstate`,s),window.addEventListener(`pagehide`,u),{pauseListeners:c,listen:l,destroy:d}}function Ir(e,t,n,r=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length}}function Lr(e){let{history:t,location:n}=window,r={value:Pr(e,n)},i={value:t.state};i.value||a(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0},!0);function a(r,a,o){let s=e.indexOf(`#`),c=s>-1?(n.host&&document.querySelector(`base`)?e:e.slice(s))+r:Nr()+e+r;try{t[o?`replaceState`:`pushState`](a,``,c),i.value=a}catch(e){console.error(e),n[o?`replace`:`assign`](c)}}function o(e,n){let o=I({},t.state,Ir(i.value.back,e,i.value.forward,!0),n,{position:i.value.position});a(e,o,!0),wr(o.position,!0),r.value=e}function s(e,n){let o=I({},i.value,t.state,{forward:e});a(o.current,o,!0),wr(o.position),Sr(o.current),a(e,I({},Ir(r.value,e,null),{position:o.position+1},n),!1),r.value=e}return{location:r,state:i,push:s,replace:o}}function Rr(e){e=fr(e);let t=Lr(e),n=Fr(e,t.state,t.location,t.replace);function r(e,t=!0){t||n.pauseListeners(),history.go(e)}let i=I({location:``,base:e,go:r,createHref:mr.bind(null,e)},t,n);return Object.defineProperty(i,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(i,"state",{enumerable:!0,get:()=>t.state.value}),i}function zr(e){return e=location.host?e||location.pathname+location.search:``,e.includes(`#`)||(e+=`#`),Rr(e)}var Br={type:0,value:``},Vr=/[a-zA-Z0-9_]/;function Hr(e){if(!e)return[[]];if(e===`/`)return[[Br]];if(!gn(e))throw Error(`Invalid path "${e}"`);function t(e){throw Error(`ERR (${n})/"${l}": ${e}`)}let n=0,r=n,i=[],a;function o(){a&&i.push(a),a=[]}let s=0,c,l=``,u=``;function d(){l&&=(n===0?a.push({type:0,value:l}):n===1||n===2||n===3?(a.length>1&&(c===`*`||c===`+`)&&t(`A repeatable param (${l}) must be alone in its segment. eg: '/:ids+.`),a.push({type:1,value:l,regexp:u,repeatable:c===`*`||c===`+`,optional:c===`*`||c===`?`})):t(`Invalid state to consume buffer`),``)}function f(){l+=c}for(;s<e.length;)switch(c=e[s++],n){case 0:c===`\\`?(r=n,n=4):c===`/`?(l&&d(),o()):c===`:`?(d(),n=1):f();break;case 4:f(),n=r;break;case 1:c===`(`?n=2:Vr.test(c)?f():(d(),n=0,c!==`*`&&c!==`?`&&c!==`+`&&s--);break;case 2:c===`)`?u[u.length-1]==`\\`?u=u.slice(0,-1)+c:n=3:u+=c;break;case 3:d(),n=0,c!==`*`&&c!==`?`&&c!==`+`&&s--,u=``;break;default:t(`Unknown state`)}return n===2&&t(`Unfinished custom RegExp for param "${l}"`),d(),o(),i}var Ur=`[^/]+?`,Wr={sensitive:!1,strict:!1,start:!0,end:!0},Gr=/[.+*?^${}()[\]/\\]/g;function Kr(e,t){let n=I({},Wr,t),r=[],i=n.start?`^`:``,a=[];for(let t of e){let e=t.length?[]:[90];n.strict&&!t.length&&(i+=`/`);for(let r=0;r<t.length;r++){let o=t[r],s=40+(n.sensitive?.25:0);if(o.type===0)r||(i+=`/`),i+=o.value.replace(Gr,`\\$&`),s+=40;else if(o.type===1){let{value:e,repeatable:n,optional:c,regexp:l}=o;a.push({name:e,repeatable:n,optional:c});let u=l||Ur;if(u!==Ur){s+=10;try{RegExp(`(${u})`)}catch(t){throw Error(`Invalid custom RegExp for param "${e}" (${u}): `+t.message)}}let d=n&&u!==`.+`&&u!==`.*`?`((?:${u})(?:/(?:${u}))*)`:`(${u})`;r||(d=c&&t.length<2?`(?:/${d})`:`/`+d),c&&(d+=`?`),i+=d,s+=20,c&&(s+=-8),n&&(s+=-20),u===`.*`&&(s+=-50)}e.push(s)}r.push(e)}if(n.strict&&n.end){let e=r.length-1;r[e][r[e].length-1]+=.7000000000000001}n.strict||(i+=`/?`),n.end?i+=`$`:n.strict&&!i.endsWith(`/`)&&(i+=`(?:/|$)`);let o=new RegExp(i,n.sensitive?``:`i`);function s(e){let t=e.match(o),n={};if(!t)return null;for(let e=1;e<t.length;e++){let r=t[e]||``,i=a[e-1];n[i.name]=r&&i.repeatable?r.split(`/`):r}return n}function c(t){let n=``,r=!1;for(let i of e){r&&n.endsWith(`/`)||(n+=`/`),r=!1;for(let e of i)if(e.type===0)n+=e.value;else if(e.type===1){let{value:a,repeatable:o,optional:s}=e,c=a in t?t[a]:``;if(L(c)&&!o)throw Error(`Provided param "${a}" is an array but it is not repeatable (* or + modifiers)`);let l=L(c)?c.join(`/`):c;if(!l){if(s)i.length<2&&(n.endsWith(`/`)?n=n.slice(0,-1):r=!0);else throw Error(`Missing required param "${a}"`)}n+=l}}return n||`/`}return{re:o,score:r,keys:a,parse:s,stringify:c}}function qr(e,t){let n=0;for(;n<e.length&&n<t.length;){let r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function Jr(e,t){let n=0,r=e.score,i=t.score;for(;n<r.length&&n<i.length;){let e=qr(r[n],i[n]);if(e)return e;n++}if(Math.abs(i.length-r.length)===1){if(Yr(r))return 1;if(Yr(i))return-1}return i.length-r.length}function Yr(e){let t=e[e.length-1];return e.length>0&&t[t.length-1]<0}var Xr={strict:!1,end:!0,sensitive:!1};function Zr(e,t,n){let r=I(Kr(Hr(e.path),n),{record:e,parent:t,children:[],alias:[]});return t&&!r.record.aliasOf==!t.record.aliasOf&&t.children.push(r),r}function Qr(e,t){let n=[],r=new Map;t=xn(Xr,t);function i(e){return r.get(e)}function a(e,n,r){let i=!r,s=ei(e);s.aliasOf=r&&r.record;let l=xn(t,e),u=[s];if(`alias`in e){let t=typeof e.alias==`string`?[e.alias]:e.alias;for(let e of t)u.push(ei(I({},s,{components:r?r.record.components:s.components,path:e,aliasOf:r?r.record:s})))}let d,f;for(let t of u){let{path:u}=t;if(n&&!gn(u)){let e=n.record.path,r=e[e.length-1]===`/`?``:`/`;t.path=n.record.path+(u&&r+u)}if(d=Zr(t,n,l),r?r.alias.push(d):(f||=d,f!==d&&f.alias.push(d),i&&e.name&&!ni(d)&&o(e.name)),oi(d)&&c(d),s.children){let e=s.children;for(let t=0;t<e.length;t++)a(e[t],d,r&&r.children[t])}r||=d}return f?()=>{o(f)}:bn}function o(e){if(Er(e)){let t=r.get(e);t&&(r.delete(e),n.splice(n.indexOf(t),1),t.children.forEach(o),t.alias.forEach(o))}else{let t=n.indexOf(e);t>-1&&(n.splice(t,1),e.record.name&&r.delete(e.record.name),e.children.forEach(o),e.alias.forEach(o))}}function s(){return n}function c(e){let t=ii(e,n);n.splice(t,0,e),e.record.name&&!ni(e)&&r.set(e.record.name,e)}function l(e,t){let i,a={},o,s;if(`name`in e&&e.name){if(i=r.get(e.name),!i)throw Cn(1,{location:e});s=i.record.name,a=I($r(t.params,i.keys.filter(e=>!e.optional).concat(i.parent?i.parent.keys.filter(e=>e.optional):[]).map(e=>e.name)),e.params&&$r(e.params,i.keys.map(e=>e.name))),o=i.stringify(a)}else if(e.path!=null)o=e.path,i=n.find(e=>e.re.test(o)),i&&(a=i.parse(o),s=i.record.name,i.keys.forEach(e=>{e.optional&&!a[e.name]&&delete a[e.name]}));else{if(i=t.name?r.get(t.name):n.find(e=>e.re.test(t.path)),!i)throw Cn(1,{location:e,currentLocation:t});s=i.record.name,a=I({},t.params,e.params),o=i.stringify(a)}let c=[],l=i;for(;l;)c.unshift(l.record),l=l.parent;return{name:s,path:o,params:a,matched:c,meta:ri(c)}}e.forEach(e=>a(e));function u(){n.length=0,r.clear()}return{addRoute:a,resolve:l,removeRoute:o,clearRoutes:u,getRoutes:s,getRecordMatcher:i}}function $r(e,t){let n={};for(let r of t)r in e&&(n[r]=e[r]);return n}function ei(e){let t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:ti(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:`components`in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function ti(e){let t={},n=e.props||!1;if(`component`in e)t.default=n;else for(let r in e.components)t[r]=typeof n==`object`?n[r]:n;return t}function ni(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ri(e){return e.reduce((e,t)=>I(e,t.meta),{})}function ii(e,t){let n=0,r=t.length;for(;n!==r;){let i=n+r>>1;Jr(e,t[i])<0?r=i:n=i+1}let i=ai(e);return i&&(r=t.lastIndexOf(i,r-1)),r}function ai(e){let t=e;for(;t=t.parent;)if(oi(t)&&Jr(e,t)===0)return t}function oi({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function si(e){let t=ke(En),n=ke(Dn),r=T(()=>{let n=_(e.to);return t.resolve(n)}),i=T(()=>{let{matched:e}=r.value,{length:t}=e,i=e[t-1],a=n.matched;if(!i||!a.length)return-1;let o=a.findIndex(or.bind(null,i));if(o>-1)return o;let s=fi(e[t-2]);return t>1&&fi(i)===s&&a[a.length-1].path!==s?a.findIndex(or.bind(null,e[t-2])):o}),a=T(()=>i.value>-1&&di(n.params,r.value.params)),o=T(()=>i.value>-1&&i.value===n.matched.length-1&&sr(n.params,r.value.params));function s(n={}){if(ui(n)){let n=t[_(e.replace)?`replace`:`push`](_(e.to)).catch(bn);return e.viewTransition&&typeof document<`u`&&`startViewTransition`in document&&document.startViewTransition(()=>n),n}return Promise.resolve()}return{route:r,href:T(()=>r.value.href),isActive:a,isExactActive:o,navigate:s}}function ci(e){return e.length===1?e[0]:e}var li=me({name:`RouterLink`,compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:`page`},viewTransition:Boolean},useLink:si,setup(e,{slots:t}){let n=o(si(e)),{options:r}=ke(En),i=T(()=>({[pi(e.activeClass,r.linkActiveClass,`router-link-active`)]:n.isActive,[pi(e.exactActiveClass,r.linkExactActiveClass,`router-link-exact-active`)]:n.isExactActive}));return()=>{let r=t.default&&ci(t.default(n));return e.custom?r:De(`a`,{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:i.value},r)}}});function ui(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&(e.button===void 0||e.button===0)){if(e.currentTarget&&e.currentTarget.getAttribute){let t=e.currentTarget.getAttribute(`target`);if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function di(e,t){for(let n in t){let r=t[n],i=e[n];if(L(r)){if(!L(i)||i.length!==r.length||r.some((e,t)=>e.valueOf()!==i[t].valueOf()))return!1}else if(r!==i)return!1}return!0}function fi(e){return e?e.aliasOf?e.aliasOf.path:e.path:``}var pi=(e,t,n)=>e??t??n,mi=me({name:`RouterView`,inheritAttrs:!1,props:{name:{type:String,default:`default`},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){let r=ke(On),i=T(()=>e.route||r.value),a=ke(Tn,0),o=T(()=>{let e=_(a),{matched:t}=i.value,n;for(;(n=t[e])&&!n.components;)e++;return e}),s=T(()=>i.value.matched[o.value]);g(Tn,T(()=>o.value+1)),g(wn,s),g(On,i),g(Dn,dr(i));let c=new Set;g(kn,c);let l=f(),u=z,{app:d}=pe().appContext;return p(()=>[l.value,s.value,e.name],([e,t,n],[r,i,a])=>{t&&(t.instances[n]=e,i&&i!==t&&e&&e===r&&(t.leaveGuards.size||(t.leaveGuards=i.leaveGuards),t.updateGuards.size||(t.updateGuards=i.updateGuards))),!e||!t||i&&or(t,i)&&r||(t.enterCallbacks[n]||[]).forEach(t=>t(e))},{flush:`post`}),()=>{let r=i.value,a=e.name,o=s.value,f=o&&o.components[a];if(!f)return hi(n.default,{Component:f,route:r});let p=o.props[a],m=p?p===!0?r.params:typeof p==`function`?p(r):p:null,ee=e=>{e.component.isUnmounted&&(o.instances[a]=null)},te=e=>le(()=>{for(;!e.el&&e.component;)e=e.component.subTree;if(u===r||i.value!==r||e.el?.getRootNode()!==d._container.getRootNode())return;let t=u;u=r;for(let e of c)e(r,t)}),h=De(f,I({},m,t,{onVnodeUnmounted:ee,onVnodeMounted:te,onVnodeUpdated:te,ref:l}));return hi(n.default,{Component:h,route:r})||h}}});function hi(e,t){if(!e)return null;let n=e(t);return n.length===1?n[0]:n}var gi=mi;function _i(e){let t=e.matcher||Qr(e.routes,e),n=e.parseQuery||Dr,r=e.stringifyQuery||Or,i=e.history,a=Ar(),o=Ar(),s=Ar(),c=Ae(z),l=Ae(0),u=z;Mn&&e.scrollBehavior&&`scrollRestoration`in history&&(history.scrollRestoration=`manual`);let d=yn.bind(null,e=>``+e),f=yn.bind(null,Qn),p=yn.bind(null,$n);function m(e,n){let r,i;Er(e)?(r=t.getRecordMatcher(e),i=n):i=e;let a=t.addRoute(i,r);return l.value++,()=>{a(),l.value++}}function ee(e){let n=t.getRecordMatcher(e);n&&(t.removeRoute(n),l.value++)}function te(){t.clearRoutes(),l.value++}function h(){return t.getRoutes().map(e=>e.record)}function ne(e){return!!t.getRecordMatcher(e)}function re(e,a){if(l.value,typeof e==`string`){a||=e.startsWith(`/`)?z:c.value;let r=nr(n,e,a.path),o=t.resolve({path:r.path},a),s=i.createHref(r.fullPath);return I(r,o,{params:p(o.params),redirectedFrom:void 0,href:s})}a=I({},a||(e.path!=null&&e.path.startsWith(`/`)&&!(`name`in e&&e.name)?z:c.value));let o;if(e.path!=null)o=I({},e,{path:nr(n,e.path,a.path).path});else{let t=I({},e.params);for(let e in t)t[e]??delete t[e];o=I({},e,{params:f(t)}),a.params=f(a.params)}let s=t.resolve(o,a),u=e.hash||``;s.params=d(p(s.params));let m=rr(r,I({},e,{hash:Jn(u),path:s.path})),ee=i.createHref(m);return I({fullPath:m,hash:u,query:r===Or?kr(e.query):e.query||{}},s,{redirectedFrom:void 0,href:ee})}function g(e){return typeof e==`string`?nr(n,e,c.value.path):I({},e)}function ie(e,t){if(u!==e)return Cn(8,{from:t,to:e})}function v(e){return y(e)}function ae(e){return v(I(g(e),{replace:!0}))}function oe(e,t){let n=e.matched[e.matched.length-1];if(n&&n.redirect){let{redirect:r}=n,i=typeof r==`function`?r(e,t):r;return typeof i==`string`&&(i=i.includes(`?`)||i.includes(`#`)?i=g(i):{path:i},i.params={}),I({query:e.query,hash:e.hash,params:i.path==null?e.params:{}},i)}}function y(e,t){let n=u=re(e),i=c.value,a=e.state,o=e.force,s=e.replace===!0,l=oe(n,i);if(l)return y(I(g(l),{state:typeof l==`object`?I({},a,l.state):a,force:o,replace:s}),t||n);let d=n;d.redirectedFrom=t;let f;return!o&&ar(r,i,n)&&(f=Cn(16,{to:d,from:i}),C(i,i)),(f?Promise.resolve(f):ce(d,i)).catch(e=>R(e)?R(e,2)?e:_e(e):he(e,d,i)).then(e=>{if(e){if(R(e,2))return y(I({replace:s},g(e.to),{state:typeof e.to==`object`?I({},a,e.to.state):a,force:o}),t||d)}else e=x(d,i,!0,s,a);return ue(d,i,e),e})}function se(e,t){let n=ie(e,t);return n?Promise.reject(n):Promise.resolve()}function b(e){let t=ye.values().next().value;return t&&typeof t.runWithContext==`function`?t.runWithContext(e):e()}function ce(e,t){let n,[r,i,s]=Mr(e,t);n=jr(r.reverse(),`beforeRouteLeave`,e,t);for(let i of r)i.leaveGuards.forEach(r=>{n.push(B(r,e,t))});let c=se.bind(null,e,t);return n.push(c),T(n).then(()=>{n=[];for(let r of a.list())n.push(B(r,e,t));return n.push(c),T(n)}).then(()=>{n=jr(i,`beforeRouteUpdate`,e,t);for(let r of i)r.updateGuards.forEach(r=>{n.push(B(r,e,t))});return n.push(c),T(n)}).then(()=>{n=[];for(let r of s)if(r.beforeEnter){if(L(r.beforeEnter))for(let i of r.beforeEnter)n.push(B(i,e,t));else n.push(B(r.beforeEnter,e,t))}return n.push(c),T(n)}).then(()=>(e.matched.forEach(e=>e.enterCallbacks={}),n=jr(s,`beforeRouteEnter`,e,t,b),n.push(c),T(n))).then(()=>{n=[];for(let r of o.list())n.push(B(r,e,t));return n.push(c),T(n)}).catch(e=>R(e,8)?e:Promise.reject(e))}function ue(e,t,n){s.list().forEach(r=>b(()=>r(e,t,n)))}function x(e,t,n,r,a){let o=ie(e,t);if(o)return o;let s=t===z,l=Mn&&(s||!n)&&Cr(e.fullPath);n&&(r||s?i.replace(e.fullPath,a):i.push(e.fullPath,a)),c.value=e,C(e,t,l),_e()}let de;function fe(){de||=i.listen((e,t,n)=>{if(!be.listening)return;let r=re(e),a=oe(r,be.currentRoute.value);if(a){y(I(a,{replace:!0,force:!0}),r).catch(bn);return}u=r;let o=c.value;Mn&&n.delta&&Sr(o.fullPath,n.delta),ce(r,o).catch(e=>R(e,12)?e:R(e,2)?(y(I(g(e.to),{force:!0}),r).then(e=>{R(e,20)&&!n.delta&&n.type===`pop`&&i.go(-1,!1)}).catch(bn),Promise.reject()):(n.delta&&i.go(-n.delta,!1),he(e,r,o))).then(e=>{e||=x(r,o,!1),e&&(n.delta&&!R(e,8)?i.go(-n.delta,!1):n.type===`pop`&&R(e,20)&&i.go(-1,!1)),ue(r,o,e)}).catch(bn)})}let pe=Ar(),me=Ar(),S;function he(e,t,n){_e(e);let r=me.list();return r.length?r.forEach(r=>r(e,t,n)):console.error(e),Promise.reject(e)}function ge(){return S&&c.value!==z?Promise.resolve():new Promise((e,t)=>{pe.add([e,t])})}function _e(e){return S||(S=!e,fe(),pe.list().forEach(([t,n])=>e?n(e):t()),pe.reset()),e}function C(t,n,r){let{scrollBehavior:i}=e;return!Mn||!i?Promise.resolve():le().then(()=>i(t,n,r||null)).then(e=>t===c.value&&e&&gr(e)).catch(e=>t===c.value&&he(e,t,n))}let ve=e=>i.go(e),w,ye=new Set,be={currentRoute:c,listening:!0,addRoute:m,removeRoute:ee,clearRoutes:te,hasRoute:ne,getRoutes:h,resolve:re,options:e,push:v,replace:ae,go:ve,back:()=>ve(-1),forward:()=>ve(1),beforeEach:a.add,beforeResolve:o.add,afterEach:s.add,onError:me.add,isReady:ge,install(e){e.component(`RouterLink`,li),e.component(`RouterView`,gi),e.config.globalProperties.$router=be,Object.defineProperty(e.config.globalProperties,"$route",{enumerable:!0,get:()=>_(c)}),Mn&&!w&&c.value===z&&(w=!0,v(i.location).catch(e=>{})),e.provide(En,be),e.provide(Dn,dr(c)),e.provide(On,c);let t=e.unmount;ye.add(e),e.unmount=function(){ye.delete(e),ye.size<1&&(u=z,de&&de(),de=null,c.value=z,w=!1,S=!1),t()}}};function T(e){return e.reduce((e,t)=>e.then(()=>b(t)),Promise.resolve())}return be}var vi=[`width`,`height`],yi=[`d`],V=Ee({__name:`Icon`,props:{name:{type:String,required:!0},size:{type:[Number,String],default:18}},setup(e){let t={home:`M4 11.5 12 5l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z`,path:`M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 17h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6`,cards:`M7 4h11a1 1 0 0 1 1 1v13M4 7h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Zm3 6h5`,code:`m9 8-4 4 4 4m6-8 4 4-4 4m-2-10-2 12`,lens:`M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm4.6-1.9L20 20M8 9h5M8 12h3`,palette:`M12 3a9 9 0 0 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.8-.6-1.2-.6-2 0-1 .8-1.6 1.8-1.6H17a4 4 0 0 0 4-4C21 6.6 17 3 12 3Zm-5 9h.01M9 7.5h.01M14.5 7h.01`,terminal:`M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm3 5 3 2.5L7 15m6 0h4`,flow:`M6 4v5a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v5M6 4a2 2 0 1 0 0 .01M18 20a2 2 0 1 0 0-.01M4 20h4m8-16h4`,book:`M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5m0-15v15m0 0A1.5 1.5 0 0 0 6.5 21H19M9 7h6`,target:`M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z`,gear:`M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.2l2-1.6-2-3.4-2.4 1a7.2 7.2 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.2 7.2 0 0 0-2 1.2l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.4l-2 1.6 2 3.4 2.4-1c.6.5 1.3.9 2 1.2l.4 2.6h5l.4-2.6c.7-.3 1.4-.7 2-1.2l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z`,search:`M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4`,sun:`M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-13v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4m0-12.8L17 7M7 17l-1.4 1.4`,moon:`M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z`,menu:`M4 7h16M4 12h16M4 17h10`,close:`m6 6 12 12M18 6 6 18`,play:`M8 5.5v13a.6.6 0 0 0 .9.5l10.2-6.5a.6.6 0 0 0 0-1L8.9 5a.6.6 0 0 0-.9.5Z`,pause:`M8 5v14m8-14v14`,step:`M16 6v12M6 6.5v11l8-5.5z`,stepBack:`M8 6v12m10-11.5v11l-8-5.5z`,check:`m5 12.5 4.5 4.5L19 7.5`,x:`m7 7 10 10M17 7 7 17`,bulb:`M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.4.9 1 .9 1.6V16h5.2v-.5c0-.6.3-1.2.9-1.6A6 6 0 0 0 12 3Z`,note:`M6 3h9l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm8 0v5h5M8 12h8M8 16h5`,download:`M12 4v11m0 0 4-4m-4 4-4-4M5 19h14`,upload:`M12 16V5m0 0 4 4m-4-4L8 9M5 19h14`,trash:`M5 7h14M10 7V4h4v3m-7 0 .8 12.2a1 1 0 0 0 1 .8h6.4a1 1 0 0 0 1-.8L17 7`,plus:`M12 5v14M5 12h14`,external:`M14 4h6v6m0-6-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5`,volume:`M4 9.5v5h3.5L12 19V5L7.5 9.5H4Zm12 .5a3 3 0 0 1 0 4m2.5-6.5a6.5 6.5 0 0 1 0 9`,star:`m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z`,copy:`M9 9h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm-4 6H4.5A.5.5 0 0 1 4 14.5V4.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5V5`,refresh:`M20 11a8 8 0 0 0-14.7-4M4 5v4h4m-4 4a8 8 0 0 0 14.7 4M20 19v-4h-4`,chevron:`m14 6-6 6 6 6`,chevronLeft:`m10 6 6 6-6 6`,flag:`M5 21V4m0 0h11l-2 4 2 4H5`,clock:`M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2`,spark:`M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18m0-12-2.5 2.5m-7 7L6 18`,layers:`m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5`,link:`M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1`,eye:`M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Zm9.5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z`,phone:`M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 15h2`,monitor:`M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm5 15h6m-3-3v3`,tablet:`M6 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm5 15h2`,save:`M5 4h11l3 3v12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4Zm3 0v5h7V4M8 20v-6h8v6`,dots:`M6 12h.01M12 12h.01M18 12h.01`};return(n,r)=>(k(),O(`svg`,{width:e.size,height:e.size,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`1.7`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`,class:`icon`},[E(`path`,{d:t[e.name]||t.dots},null,8,yi)],8,vi))}},[[`__scopeId`,`data-v-620a7e27`]]),bi=`satr:v1`,xi=2e5,Si=2e4,Ci=[0,1,2,4,8,16];function wi(){let e=new Date().toISOString();return{app:`satr`,version:1,createdAt:e,updatedAt:e,settings:{theme:`system`,editorFontSize:15,autoRun:!0,reduceMotion:!1,name:``},lessons:{},lastLesson:null,drafts:[],practice:{},labs:{js:``,visualizer:``,explain:{lang:`js`,code:``},css:{}},reviews:{},favorites:[],tasks:[],activity:{}}}var H=e=>typeof e==`object`&&!!e&&!Array.isArray(e),U=(e,t=Si,n=``)=>typeof e==`string`?e.slice(0,t):n,Ti=(e,t=!1)=>typeof e==`boolean`?e:t,W=(e,t,n,r)=>typeof e==`number`&&Number.isFinite(e)?Math.min(n,Math.max(t,e)):r,G=e=>typeof e==`string`&&!Number.isNaN(Date.parse(e))?e:null,Ei=e=>typeof e==`string`&&e.length<=120&&![`__proto__`,`constructor`,`prototype`].includes(e),Di=(e,t,n)=>t.includes(e)?e:n;function Oi(e){if(!H(e))return{};let t={};for(let n of[`html`,`css`,`js`,`vue`])typeof e[n]==`string`&&(t[n]=e[n].slice(0,xi));return t}function ki(e,t,n=2e3){let r={};if(!H(e))return r;let i=0;for(let a of Object.keys(e)){if(!Ei(a)||i++>=n)continue;let o=t(e[a]);o!==void 0&&(r[a]=o)}return r}function Ai(e){let t=wi();if(!H(e))return t;let n=e,r=H(n.settings)?n.settings:{},i=H(n.labs)?n.labs:{};return{app:`satr`,version:1,createdAt:G(n.createdAt)||t.createdAt,updatedAt:G(n.updatedAt)||t.updatedAt,settings:{theme:Di(r.theme,[`system`,`dark`,`light`],`system`),editorFontSize:W(r.editorFontSize,12,24,15),autoRun:Ti(r.autoRun,!0),reduceMotion:Ti(r.reduceMotion,!1),name:U(r.name,60)},lessons:ki(n.lessons,e=>{if(!H(e))return;let t=H(e.quiz)?{answers:Array.isArray(e.quiz.answers)?e.quiz.answers.slice(0,50).map(e=>Number.isInteger(e)?e:null):[],score:W(e.quiz.score,0,100,0),total:W(e.quiz.total,0,100,0),at:G(e.quiz.at)}:null,n=H(e.exercise)?{files:Oi(e.exercise.files),passed:Ti(e.exercise.passed),attempts:W(e.exercise.attempts,0,1e6,0),hints:W(e.exercise.hints,0,20,0)}:null;return{status:Di(e.status,[`started`,`done`],`started`),visitedAt:G(e.visitedAt),completedAt:G(e.completedAt),quiz:t,exercise:n,note:U(e.note)}}),lastLesson:typeof n.lastLesson==`string`&&Ei(n.lastLesson)?n.lastLesson:null,drafts:(Array.isArray(n.drafts)?n.drafts:[]).slice(0,200).filter(H).map(e=>({id:U(e.id,60)||Math.random().toString(36).slice(2),name:U(e.name,80)||`مسودة`,mode:Di(e.mode,[`web`,`vue`],`web`),files:Oi(e.files),createdAt:G(e.createdAt)||t.createdAt,updatedAt:G(e.updatedAt)||t.updatedAt})),practice:ki(n.practice,e=>{if(H(e))return{files:Oi(e.files),passed:Ti(e.passed),best:W(e.best,0,100,0),attempts:W(e.attempts,0,1e6,0),hints:W(e.hints,0,20,0),updatedAt:G(e.updatedAt),history:(Array.isArray(e.history)?e.history:[]).slice(-30).filter(H).map(e=>({at:G(e.at),score:W(e.score,0,100,0)}))}}),labs:{js:U(i.js,xi),visualizer:U(i.visualizer,xi),explain:H(i.explain)?{lang:Di(i.explain.lang,[`js`,`html`,`css`,`vue`],`js`),code:U(i.explain.code,xi)}:{lang:`js`,code:``},css:ki(i.css,e=>typeof e==`string`?e.slice(0,xi):typeof e==`number`||typeof e==`boolean`?e:void 0,200)},reviews:ki(n.reviews,e=>{if(H(e))return{box:W(e.box,0,Ci.length-1,0),due:G(e.due)||t.createdAt,last:G(e.last),seen:W(e.seen,0,1e6,0),ok:W(e.ok,0,1e6,0)}},5e3),favorites:(Array.isArray(n.favorites)?n.favorites:[]).filter(e=>typeof e==`string`&&Ei(e)).slice(0,500),tasks:(Array.isArray(n.tasks)?n.tasks:[]).slice(0,300).filter(H).map(e=>({id:U(e.id,60)||Math.random().toString(36).slice(2),text:U(e.text,300),done:Ti(e.done),createdAt:G(e.createdAt)||t.createdAt})).filter(e=>e.text),activity:ki(n.activity,e=>typeof e==`number`&&e>=0?Math.min(e,1e5):void 0,1e3)}}function ji(e){return H(e)?Ai(e):wi()}function Mi(e){return JSON.stringify({...e,exportedAt:new Date().toISOString()},null,2)}function Ni(e){let t;try{t=JSON.parse(e)}catch{return{ok:!1,error:`الملف ليس JSON صالحًا.`}}return!H(t)||t.app!==`satr`?{ok:!1,error:`هذا الملف ليس نسخة احتياطية من منصة سطر.`}:typeof t.version!=`number`||t.version>1?{ok:!1,error:`إصدار النسخة الاحتياطية أحدث من إصدار المنصة.`}:{ok:!0,state:ji(t)}}function Pi(e,t,n=new Date){let r=t?Math.min((e?.box??0)+1,Ci.length-1):0,i=new Date(n);return i.setHours(0,0,0,0),i.setDate(i.getDate()+(t?Ci[r]:0)),{box:r,due:i.toISOString(),last:n.toISOString(),seen:(e?.seen??0)+1,ok:(e?.ok??0)+ +!!t}}var Fi=(e,t=new Date)=>!!e&&Date.parse(e.due)<=t.getTime(),Ii=(e=new Date)=>`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`;function Li(){try{let e=localStorage.getItem(bi);return e?{state:ji(JSON.parse(e)),fresh:!1}:{state:wi(),fresh:!0}}catch{return{state:wi(),fresh:!0,corrupted:!0}}}var Ri=Li(),K=o(Ri.state),q=o({state:`idle`,at:null,error:``,available:!0,corrupted:!!Ri.corrupted,fresh:Ri.fresh});try{localStorage.setItem(`satr:probe`,`1`),localStorage.removeItem(`satr:probe`)}catch{q.available=!1}var zi=null,Bi=!1;function Vi(){if(clearTimeout(zi),zi=null,!q.available)return!1;try{return localStorage.setItem(bi,JSON.stringify({...n(K),updatedAt:new Date().toISOString()})),q.state=`saved`,q.at=Date.now(),q.error=``,!0}catch(e){return q.state=`error`,q.error=e&&e.name===`QuotaExceededError`?`امتلأت مساحة التخزين المحلي. صدّر نسخة احتياطية واحذف مسودات قديمة.`:`تعذّر الحفظ المحلي في هذا المتصفح.`,!1}}p(K,()=>{Bi||(q.state=`pending`,clearTimeout(zi),zi=setTimeout(Vi,400))},{deep:!0}),typeof window<`u`&&(window.addEventListener(`beforeunload`,()=>{zi&&Vi()}),document.addEventListener(`visibilitychange`,()=>{document.visibilityState===`hidden`&&zi&&Vi()}),window.addEventListener(`storage`,e=>{if(e.key===`satr:v1`&&e.newValue)try{let t=ji(JSON.parse(e.newValue));Bi=!0,Hi(t),q.state=`synced`,q.at=Date.now()}catch{}finally{setTimeout(()=>{Bi=!1},0)}}));function Hi(e){for(let t of Object.keys(K))t in e||delete K[t];Object.assign(K,e)}function Ui(e=1){let t=Ii();K.activity[t]=(K.activity[t]||0)+e}function Wi(e){return K.lessons[e]||(K.lessons[e]={status:`started`,visitedAt:new Date().toISOString(),completedAt:null,quiz:null,exercise:null,note:``}),K.lessons[e]}function Gi(e){let t=Wi(e);t.visitedAt=new Date().toISOString(),K.lastLesson=e}function Ki(e){let t=Wi(e);t.status!==`done`&&(t.status=`done`,t.completedAt=new Date().toISOString(),Ui(5))}function qi(e,t){K.reviews[e]=Pi(K.reviews[e],t),Ui(1)}function Ji(e){K.reviews[e]||(K.reviews[e]={box:0,due:new Date().toISOString(),last:null,seen:0,ok:0})}var Yi=()=>Object.entries(K.reviews).filter(([,e])=>Fi(e)).map(([e])=>e);function Xi(e){let t=K.favorites.indexOf(e);t===-1?K.favorites.push(e):K.favorites.splice(t,1)}function Zi(){return Vi(),Mi(K)}function Qi(e,t=`replace`){let n=Ni(e);if(!n.ok)return n;if(t===`merge`){let e=n.state;for(let[t,n]of Object.entries(e.lessons)){let e=K.lessons[t];(!e||n.status===`done`&&e.status!==`done`||Date.parse(n.visitedAt||0)>Date.parse(e.visitedAt||0))&&(K.lessons[t]=n)}let t=new Set(K.drafts.map(e=>e.id));for(let n of e.drafts)t.has(n.id)||K.drafts.push(n);for(let[t,n]of Object.entries(e.practice))(!K.practice[t]||n.best>K.practice[t].best)&&(K.practice[t]=n);for(let[t,n]of Object.entries(e.reviews))K.reviews[t]||(K.reviews[t]=n);for(let t of e.favorites)K.favorites.includes(t)||K.favorites.push(t);let r=new Set(K.tasks.map(e=>e.id));for(let t of e.tasks)r.has(t.id)||K.tasks.push(t);for(let[t,n]of Object.entries(e.activity))K.activity[t]=Math.max(K.activity[t]||0,n)}else Hi(n.state);return Vi(),{ok:!0}}function $i(){Hi(wi()),Vi()}l(K);var ea=typeof matchMedia<`u`?matchMedia(`(prefers-color-scheme: light)`):null,ta=f(`dark`);function na(){let e=K.settings.theme===`system`?ea&&ea.matches?`light`:`dark`:K.settings.theme;ta.value=e,document.documentElement.dataset.theme=e,document.documentElement.classList.toggle(`reduce-motion`,!!K.settings.reduceMotion)}function ra(){na(),p(()=>[K.settings.theme,K.settings.reduceMotion],na),ea?.addEventListener?.(`change`,na)}function ia(){K.settings.theme=ta.value===`dark`?`light`:`dark`}var aa=o([]),oa=0;function sa(e,t=`info`,n=3200){let r=++oa;aa.push({id:r,text:e,kind:t}),setTimeout(()=>{let e=aa.findIndex(e=>e.id===r);e!==-1&&aa.splice(e,1)},n)}var ca=o({open:!1}),la=()=>{ca.open=!0};function ua(e,t,n=`application/json`){let r=new Blob([t],{type:`${n};charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=e,document.body.append(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(i),1e3)}function da(e){if(!e)return``;let t=typeof e==`number`?e:Date.parse(e),n=Math.round((Date.now()-t)/1e3);if(n<10)return`الآن`;if(n<60)return`قبل ${n} ثانية`;let r=Math.round(n/60);if(r<60)return r===1?`قبل دقيقة`:r===2?`قبل دقيقتين`:`قبل ${r} دقائق`;let i=Math.round(r/60);if(i<24)return i===1?`قبل ساعة`:i===2?`قبل ساعتين`:`قبل ${i} ساعات`;let a=Math.round(i/24);return a===1?`أمس`:a===2?`قبل يومين`:`قبل ${a} أيام`}function fa(e){return String(e??``).replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/>/g,`&gt;`).replace(/``\s?(.+?)\s?``/g,(e,t)=>`<code>${t}</code>`).replace(/`([^`]+)`/g,(e,t)=>`<code>${t}</code>`).replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`)}var pa=[{key:`html`,label:`HTML`,title:`الهيكل`,blurb:`كيف تصف المحتوى بعناصر لها معنى.`,color:`var(--c-html)`,lessons:[{id:`html-01`,title:`كيف تُبنى صفحة الويب؟`,summary:`ما الذي يحدث عندما يفتح المتصفح صفحة، ودور كل من HTML وCSS وJavaScript، وأول عنصر تكتبه.`,minutes:15,objectives:[`تفرّق بين أدوار HTML وCSS وJavaScript`,`تفهم الفرق بين الوسم والعنصر والسمة`,`تكتب أول عناصر لك وترى نتيجتها`],blocks:[{type:`p`,text:`عندما تفتح صفحة ويب، يحمّل المتصفح ملفًا نصيًا مكتوبًا بلغة **HTML**، ثم يقرؤه من الأعلى للأسفل ويبني منه «شجرة» من العناصر تسمى **DOM**، ثم يرسمها على الشاشة.`},{type:`list`,items:[`**HTML** تصف **ما هو** المحتوى: هذا عنوان، هذه فقرة، هذا زر.`,`**CSS** تصف **كيف يبدو**: الألوان والمسافات والتخطيط.`,`**JavaScript** تصف **كيف يتصرف**: ماذا يحدث عند النقر أو الكتابة.`]},{type:`h`,text:`تشريح العنصر`},{type:`code`,lang:`html`,code:`<p class="intro">أهلًا بك في سطر</p>`,notes:[{lines:[1],text:"`<p>` هو **وسم الفتح**، و`</p>` **وسم الإغلاق** (لاحظ الشرطة المائلة). كل ما بينهما هو **المحتوى**."},{lines:[1],text:'`class="intro"` **سمة**: معلومة إضافية بصيغة اسم="قيمة" تُكتب داخل وسم الفتح فقط.'},{lines:[1],text:`الوسم + المحتوى + وسم الإغلاق معًا = **عنصر** واحد.`}]},{type:`why`,text:"لماذا لا يظهر الوسم نفسه في الصفحة؟ لأن المتصفح يعامل ما بين `<` و`>` كتعليمات بناء وليس كنص. لهذا إن أردت عرض الرمز `<` كنص تكتبه `&lt;`."},{type:`h`,text:`جرّب بنفسك`},{type:`p`,text:"عدّل الكود التالي وشاهد النتيجة مباشرة. جرّب حذف وسم الإغلاق `</strong>` ولاحظ كيف يمتد الخط العريض — المتصفح «يخمّن» أين ينتهي العنصر."},{type:`try`,mode:`web`,files:{html:`<h1>صفحتي الأولى</h1>
<p>أتعلم <strong>HTML</strong> اليوم.</p>
<p>والفقرة الثانية هنا.</p>`}},{type:`tip`,text:`المسافات والأسطر الجديدة الزائدة في الكود لا تظهر في الصفحة: المتصفح يدمجها في مسافة واحدة. تنسيق الكود بالمسافات البادئة هو لراحة القارئ فقط.`},{type:`h`,text:`العناصر المتداخلة`},{type:`p`,text:`يمكن أن يحتوي العنصر على عناصر أخرى. القاعدة الذهبية: **ما يُفتح أخيرًا يُغلق أولًا**، تمامًا كالأقواس في الرياضيات.`},{type:`code`,lang:`html`,code:`<p>هذا <em>مهم <strong>جدًا</strong></em></p>`,notes:[{lines:[1],text:"`strong` فُتح داخل `em`، لذلك يُغلق قبله: `</strong></em>`. الترتيب المعاكس خطأ شائع يربك المتصفح."}]}],exercise:{kind:`dom`,prompt:"اكتب عنوانًا رئيسيًا `h1` نصه **مرحبًا بالعالم**، وتحته فقرة `p` فيها جملة واحدة على الأقل عن نفسك، وضع كلمة واحدة داخل الفقرة في عنصر `strong`.",editable:[`html`],starter:{html:`<!-- اكتب الكود هنا -->
`},solution:{html:`<h1>مرحبًا بالعالم</h1>
<p>أنا أتعلم <strong>البرمجة</strong> خطوة بخطوة.</p>`},hints:["العنوان الرئيسي يُكتب: `<h1>النص</h1>`.","العنصر `strong` يجب أن يكون **داخل** الفقرة، أي بين `<p>` و`</p>`."],checks:[{title:`يوجد عنوان h1 نصه «مرحبًا بالعالم»`,test:`({ $, text }) => !!$('h1') && text('h1') === 'مرحبًا بالعالم' || (!$('h1') ? 'لا يوجد عنصر h1' : 'نص العنوان الحالي: «' + text('h1') + '»')`},{title:`توجد فقرة p فيها نص`,test:`({ $, text }) => !!$('p') && text('p').length > 0`},{title:`يوجد strong داخل الفقرة`,test:`({ $ }) => !!$('p strong')`,fail:`لم نجد strong داخل p. تأكد أنه بين وسمي الفقرة.`}]},quiz:[{q:`أي اللغات الثلاث مسؤولة عن **معنى** المحتوى وهيكله؟`,options:[`CSS`,`HTML`,`JavaScript`],answer:1,explain:`HTML تصف ما هو المحتوى (عنوان، فقرة، صورة)، وCSS تصف شكله، وJavaScript سلوكه.`},{q:'في `<a href="x.html">رابط</a>`، ما هو `href`؟',options:[`وسم`,`سمة`,`عنصر`],answer:1,explain:`href سمة تُكتب داخل وسم الفتح بصيغة اسم="قيمة".`},{q:`أي ترتيب إغلاق صحيح؟`,options:[`<p><em>نص</p></em>`,`<p><em>نص</em></p>`,`كلاهما صحيح`],answer:1,explain:`العنصر الذي فُتح أخيرًا (em) يُغلق أولًا.`}],refs:[{title:`MDN: Getting started with HTML`,url:`https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started`}]},{id:`html-02`,title:`هيكل المستند الكامل`,summary:`DOCTYPE وhtml وhead وbody: الهيكل الذي تحتاجه كل صفحة حقيقية، ولماذا lang وdir وcharset مهمة للعربية.`,minutes:15,objectives:[`تكتب هيكل مستند HTML صحيحًا من الذاكرة`,`تعرف ما يوضع في head وما يوضع في body`,`تضبط اللغة والاتجاه والترميز لصفحة عربية`],blocks:[{type:`p`,text:`المقتطفات في الدرس السابق كانت تعمل لأن المتصفح متسامح ويكمل الناقص. لكن الصفحة الحقيقية لها هيكل ثابت:`},{type:`code`,lang:`html`,code:`<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>مدونتي</title>
  </head>
  <body>
    <h1>أهلًا</h1>
  </body>
</html>`,notes:[{lines:[1],text:"`<!DOCTYPE html>` يخبر المتصفح باستخدام **الوضع القياسي**. بدونه قد يحسب بعض الأبعاد بطرق قديمة (quirks mode)."},{lines:[2],text:'`lang="ar"` يعرّف لغة المحتوى: تستخدمه قارئات الشاشة لاختيار النطق الصحيح، ومحركات البحث والترجمة. `dir="rtl"` يجعل الاتجاه من اليمين لليسار.'},{lines:[3,7],text:"`head` يحوي معلومات **عن** الصفحة لا تظهر فيها مباشرة."},{lines:[4],text:'`charset="utf-8"` يحدد ترميز الأحرف. بدونه قد تظهر العربية رموزًا غريبة.'},{lines:[5],text:`وسم viewport يجعل الصفحة تتكيف مع عرض شاشة الجوال بدل أن تُعرض مصغّرة.`},{lines:[6],text:"`title` يظهر في تبويب المتصفح وفي نتائج البحث."},{lines:[8,10],text:"`body` يحوي كل ما يراه المستخدم."}]},{type:`why`,text:"لماذا يهم `lang` إن كانت الصفحة تظهر جيدًا بدونه؟ لأن «الظهور» ليس كل شيء: قارئ الشاشة قد يقرأ النص العربي بنطق إنجليزي، والمتصفح قد يعرض ترجمة خاطئة. هذه أمثلة على أن HTML يخدم الآلات والبشر معًا."},{type:`warn`,text:"لا تضع عناصر مرئية مثل `h1` أو `p` داخل `head`. المتصفح سينقلها تلقائيًا إلى `body`، لكن هذا يعني أن الكود لا يعبّر عمّا يحدث فعلًا."},{type:`try`,mode:`web`,files:{html:`<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>تجربة</title>
  </head>
  <body>
    <h1>غيّر dir إلى ltr وراقب</h1>
    <p>لاحظ كيف تتغير محاذاة النص.</p>
  </body>
</html>`}},{type:`tip`,text:"التعليقات `<!-- ... -->` لا تظهر في الصفحة؛ استخدمها لتوضيح الكود لنفسك ولزملائك، لكن تذكّر أن أي زائر يستطيع رؤيتها في «عرض المصدر»."}],exercise:{kind:`dom`,prompt:'اكتب مستند HTML كاملًا لصفحة عربية: يبدأ بـ DOCTYPE، وعنصر `html` بلغة عربية واتجاه من اليمين لليسار، و`head` فيه `meta charset="utf-8"` وعنوان صفحة (title) غير فارغ، و`body` فيه `h1`.',editable:[`html`],starter:{html:`<!-- اكتب المستند كاملًا هنا -->
`},solution:{html:`<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="utf-8">
    <title>صفحتي</title>
  </head>
  <body>
    <h1>مرحبًا</h1>
  </body>
</html>`},hints:["ابدأ بالسطر `<!DOCTYPE html>`.","السمتان `lang` و`dir` تُكتبان على عنصر `html` نفسه.",`title يوضع داخل head وليس body.`],checks:[{title:`المستند يبدأ بـ DOCTYPE`,test:`({ files }) => /^\\s*(<!--[\\s\\S]*?-->\\s*)*<!doctype html>/i.test(files.html || '')`,fail:`لم نجد <!DOCTYPE html> في بداية المستند.`},{title:`html lang="ar"`,test:`({ doc }) => (doc.documentElement.getAttribute('lang') || '').toLowerCase().startsWith('ar')`,fail:`أضف lang="ar" على عنصر html.`},{title:`html dir="rtl"`,test:`({ doc }) => (doc.documentElement.getAttribute('dir') || '').toLowerCase() === 'rtl'`,fail:`أضف dir="rtl" على عنصر html.`},{title:`meta charset="utf-8" داخل head`,test:`({ $ }) => { const m = $('head meta[charset]:not([data-satr])'); return !!m && m.getAttribute('charset').toLowerCase().replace('-', '') === 'utf8' }`,fail:`لم نجد <meta charset="utf-8"> داخل head.`},{title:`عنوان الصفحة title غير فارغ`,test:`({ doc }) => !!doc.querySelector('head title') && doc.title.trim().length > 0`},{title:`يوجد h1 داخل body`,test:`({ $ }) => !!$('body h1')`}]},quiz:[{q:"أين يوضع عنصر `title`؟",options:[`داخل body`,`داخل head`,`قبل html`],answer:1,explain:`title معلومة عن الصفحة، لذلك يوضع في head.`},{q:'ما فائدة `lang="ar"`؟',options:[`يغيّر الخط إلى عربي`,`يخبر المتصفح وقارئات الشاشة بلغة المحتوى`,`يجعل الاتجاه من اليمين لليسار`],answer:1,explain:`lang يعرّف اللغة. الاتجاه تتحكم به السمة dir.`},{q:'ماذا قد يحدث بدون `<meta charset="utf-8">`؟',options:[`لا شيء`,`قد تظهر الحروف العربية رموزًا مشوّهة`,`لن تعمل الروابط`],answer:1,explain:`الترميز الخاطئ يجعل المتصفح يفسر بايتات النص بشكل غير صحيح.`}],refs:[{title:`MDN: Document and website structure`,url:`https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure`},{title:`MDN: lang attribute`,url:`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang`}]},{id:`html-03`,title:`النصوص والعناوين والقوائم`,summary:`كيف تنظّم المحتوى بعناوين متدرجة وفقرات وقوائم، ومتى تستخدم strong وem.`,minutes:20,objectives:[`تبني تسلسل عناوين منطقيًا`,`تختار بين ul وol`,`تفرّق بين المعنى والشكل (strong مقابل الخط العريض)`],blocks:[{type:`p`,text:"العناوين من `h1` إلى `h6` تبني **مخطط** الصفحة، تمامًا كفهرس كتاب. اختر المستوى حسب **الترتيب المنطقي** لا حسب حجم الخط — الحجم تتحكم به CSS لاحقًا."},{type:`code`,lang:`html`,code:`<h1>دليل الطبخ</h1>
<h2>الحلويات</h2>
<h3>الكنافة</h3>
<h3>البسبوسة</h3>
<h2>المشروبات</h2>`,notes:[{lines:[1],text:`عنوان رئيسي واحد للصفحة.`},{lines:[2,5],text:`أقسام رئيسية بالمستوى الثاني.`},{lines:[3,4],text:`أقسام فرعية داخل «الحلويات». لا تقفز من h2 إلى h4 مباشرة.`}]},{type:`why`,text:`مستخدمو قارئات الشاشة يتنقلون في الصفحة عبر قائمة العناوين. تسلسل منطقي = خريطة واضحة لهم، ولمحركات البحث أيضًا.`},{type:`h`,text:`القوائم`},{type:`code`,lang:`html`,code:`<ol>
  <li>سخّن الفرن</li>
  <li>اخلط المكونات</li>
</ol>
<ul>
  <li>دقيق</li>
  <li>سكر</li>
</ul>`,notes:[{lines:[1,4],text:"`ol` قائمة **مرتبة**: الترتيب له معنى (خطوات)، فتظهر بالأرقام."},{lines:[5,8],text:"`ul` قائمة **غير مرتبة**: الترتيب لا يهم (مكونات)، فتظهر بنقاط."},{lines:[2,3,6,7],text:"الأبناء المباشرون للقائمة يجب أن يكونوا `li` فقط."}]},{type:`h`,text:`التوكيد: المعنى قبل الشكل`},{type:`p`,text:"`strong` تعني «هذا مهم» و`em` تعني «شدّد على هذه الكلمة». مظهرهما الافتراضي عريض ومائل، لكن الفكرة هي **المعنى**. إن أردت خطًا عريضًا لأسباب جمالية فقط فهذا عمل CSS."},{type:`try`,mode:`web`,files:{html:`<h2>قائمة التسوق</h2>
<ul>
  <li>حليب</li>
  <li>خبز <strong>طازج</strong></li>
</ul>
<h2>الخطوات</h2>
<ol>
  <li>اذهب للسوق</li>
  <li>عُد للمنزل</li>
</ol>`}},{type:`tip`,text:"يمكن وضع قائمة داخل `li` لإنشاء قائمة متداخلة، وهي طريقة شائعة لبناء القوائم الفرعية في التنقل."}],exercise:{kind:`dom`,prompt:"اكتب وصفة طعام: عنوان `h2` باسم الوصفة، ثم قائمة **غير مرتبة** للمكونات (عنصران على الأقل)، ثم قائمة **مرتبة** للخطوات (3 خطوات على الأقل)، وضع كلمة مهمة في إحدى الخطوات داخل `strong`.",editable:[`html`],starter:{html:`<h2></h2>
`},solution:{html:`<h2>شاي بالنعناع</h2>
<ul>
  <li>شاي</li>
  <li>نعناع</li>
</ul>
<ol>
  <li>اغلِ الماء</li>
  <li>أضف الشاي</li>
  <li>أضف النعناع <strong>في النهاية</strong></li>
</ol>`},hints:["المكونات لا يهم ترتيبها → `ul`. الخطوات يهم ترتيبها → `ol`.","كل عنصر في القائمة يُكتب داخل `<li>...</li>`."],checks:[{title:`عنوان h2 غير فارغ`,test:`({ $, text }) => !!$('h2') && text('h2').length > 0`},{title:`قائمة ul فيها عنصران على الأقل`,test:`({ $$ }) => $$('ul > li').length >= 2`,fail:`نحتاج ul بداخلها عنصري li على الأقل.`},{title:`قائمة ol فيها 3 خطوات على الأقل`,test:`({ $$ }) => $$('ol > li').length >= 3`,fail:`نحتاج ol بداخلها 3 عناصر li على الأقل.`},{title:`strong داخل إحدى الخطوات`,test:`({ $ }) => !!$('ol li strong')`},{title:`لا توجد عناصر غير li مباشرة داخل القوائم`,test:`({ $$ }) => $$('ul > :not(li), ol > :not(li)').length === 0`,fail:`الأبناء المباشرون لـ ul وol يجب أن يكونوا li فقط.`}]},quiz:[{q:`كيف تختار مستوى العنوان (h2 أو h3...)؟`,options:[`حسب الحجم الذي أريده`,`حسب موقعه في التسلسل المنطقي للمحتوى`,`عشوائيًا`],answer:1,explain:`الحجم يُضبط بـ CSS. المستوى يعبّر عن البنية.`},{q:`خطوات تثبيت برنامج تناسبها:`,options:[`ul`,`ol`,`p`],answer:1,explain:`الترتيب مهم في الخطوات، فنستخدم القائمة المرتبة ol.`},{q:"متى تستخدم `strong`؟",options:[`كلما أردت خطًا عريضًا`,`عندما يكون النص مهمًا فعلًا`,`للعناوين`],answer:1,explain:`strong تعبّر عن الأهمية. الشكل وحده عمل CSS (font-weight).`}],refs:[{title:`MDN: HTML text fundamentals`,url:`https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals`}]},{id:`html-04`,title:`الروابط والصور`,summary:`الروابط المطلقة والنسبية وروابط داخل الصفحة، والصور مع نص بديل يصفها فعلًا.`,minutes:20,objectives:[`تكتب روابط لصفحات أخرى ولأقسام في الصفحة نفسها`,`تفهم الفرق بين المسار المطلق والنسبي`,`تكتب نصًا بديلًا مفيدًا للصور`],blocks:[{type:`p`,text:"الرابط هو ما يجعل الويب «شبكة». عنصره `a` (من anchor) وسمته الأساسية `href`:"},{type:`code`,lang:`html`,code:`<a href="https://developer.mozilla.org">توثيق MDN</a>
<a href="about.html">من نحن</a>
<a href="#contact">تواصل معنا</a>

<section id="contact">…</section>`,notes:[{lines:[1],text:`**رابط مطلق**: العنوان الكامل بما فيه البروتوكول https.`},{lines:[2],text:`**رابط نسبي**: يُحسب بالنسبة لمكان الصفحة الحالية. مناسب لصفحات موقعك.`},{lines:[3],text:"**رابط داخلي**: `#` ثم معرّف عنصر في الصفحة نفسها. النقر ينقلك إليه."},{lines:[5],text:'العنصر الهدف يحمل `id="contact"` — يجب أن يطابق ما بعد `#` تمامًا.'}]},{type:`tip`,text:`اكتب نص رابط يصف الوجهة: «اقرأ دليل الألوان» أفضل من «اضغط هنا»، لأن قارئات الشاشة تعرض قائمة الروابط منفصلة عن سياقها.`},{type:`h`,text:`الصور`},{type:`code`,lang:`html`,code:`<img src="cat.jpg" alt="قطة رمادية نائمة على وسادة" width="320">`,notes:[{lines:[1],text:"`img` عنصر **فارغ**: لا محتوى له ولا وسم إغلاق."},{lines:[1],text:"`src` مسار ملف الصورة، و`alt` **النص البديل**: يُقرأ لمن لا يرى الصورة، ويظهر إن فشل تحميلها."},{lines:[1],text:"`width` يحجز المساحة مسبقًا فلا «تقفز» الصفحة عند تحميل الصورة."}]},{type:`why`,text:'كيف تكتب alt جيدًا؟ اسأل: لو وصفت الصورة لصديق عبر الهاتف في هذا السياق، ماذا ستقول؟ إن كانت الصورة زخرفية بحتة اكتب `alt=""` (فارغًا) ليتجاهلها قارئ الشاشة — وهذا يختلف عن حذف alt كليًا.'},{type:`try`,mode:`web`,files:{html:`<nav>
  <a href="#gallery">المعرض</a>
  <a href="#contact">تواصل</a>
</nav>
<section id="gallery">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='120'%3E%3Crect width='200' height='120' fill='%2370d6c3'/%3E%3C/svg%3E" alt="مستطيل بلون فيروزي">
</section>
<section id="contact" style="margin-top:600px">
  <h2>تواصل معنا</h2>
</section>`}},{type:`warn`,text:`في هذه المنصة تُعرض صفحاتك في معاينة معزولة لا تتصل بالإنترنت، لذلك الروابط الخارجية لا تفتح من داخلها، وهذا مقصود لحمايتك.`}],exercise:{kind:`dom`,prompt:"أنشئ `nav` فيه رابطان على الأقل، أحدهما يشير إلى قسم في الصفحة نفسها بالمعرّف `contact`. ثم أضف صورة `img` لها نص `alt` وصفي (5 أحرف على الأقل)، ثم قسمًا `section` معرّفه `contact` فيه عنوان.",editable:[`html`],starter:{html:`<nav>
  
</nav>
`},solution:{html:`<nav>
  <a href="#about">من أنا</a>
  <a href="#contact">تواصل</a>
</nav>
<img src="me.png" alt="صورتي الشخصية مبتسمًا">
<section id="contact">
  <h2>تواصل معي</h2>
</section>`},hints:['الرابط الداخلي: `<a href="#contact">...</a>`.','القسم الهدف: `<section id="contact">...</section>` — بدون #.'],checks:[{title:`nav فيه رابطان على الأقل`,test:`({ $$ }) => $$('nav a[href]').length >= 2`},{title:`رابط يشير إلى #contact`,test:`({ $ }) => !!$('a[href="#contact"]')`},{title:`section معرّفه contact وبه عنوان`,test:`({ $ }) => !!$('section#contact') && !!$('section#contact h1, section#contact h2, section#contact h3')`},{title:`img مع alt وصفي`,test:`({ $ }) => { const i = $('img'); if (!i) return 'لا توجد صورة'; const a = i.getAttribute('alt'); return a !== null && a.trim().length >= 5 || 'أضف alt يصف الصورة (5 أحرف على الأقل)' }`}]},quiz:[{q:'ما نوع الرابط `href="blog/post.html"`؟',options:[`مطلق`,`نسبي`,`داخلي`],answer:1,explain:`لا يحتوي بروتوكولًا ونطاقًا، فيُحسب نسبة للصفحة الحالية.`},{q:`صورة زخرفية لا تضيف معلومة، ماذا تكتب؟`,options:[`احذف alt`,`alt=""`,`alt="صورة"`],answer:1,explain:`alt الفارغ يخبر قارئ الشاشة بتجاهلها. حذفه قد يجعله يقرأ اسم الملف.`},{q:'لكي يعمل `<a href="#faq">` يجب وجود:',options:[`عنصر id="faq"`,`عنصر class="faq"`,`ملف faq.html`],answer:0,explain:`الروابط الداخلية تعتمد على المعرّف id.`}],refs:[{title:`MDN: Creating hyperlinks`,url:`https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks`},{title:`MDN: img`,url:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img`}]},{id:`html-05`,title:`HTML الدلالي: بنية تفهمها الآلات`,summary:`header وnav وmain وarticle وsection وfooter: لماذا العناصر الدلالية أفضل من div في كل مكان.`,minutes:20,objectives:[`تبني هيكل صفحة بعناصر دلالية`,`تختار بين section وarticle وdiv`,`تفهم أثر الدلالة على إتاحة الوصول`],blocks:[{type:`p`,text:"يمكنك بناء أي صفحة بعناصر `div` فقط، وستبدو متطابقة بصريًا. فلماذا توجد عناصر مثل `header` و`main`؟ لأنها تحمل **معنى** تستفيد منه قارئات الشاشة ومحركات البحث وحتى أنت عند قراءة الكود."},{type:`code`,lang:`html`,code:`<header>
  <h1>مدونة سطر</h1>
  <nav>…</nav>
</header>
<main>
  <article>
    <h2>كيف تتعلم البرمجة؟</h2>
    <p>…</p>
  </article>
</main>
<footer>© 2026</footer>`,notes:[{lines:[1,4],text:"`header`: مقدمة الصفحة (الشعار، العنوان، التنقل)."},{lines:[3],text:"`nav`: منطقة التنقل الرئيسية. قارئات الشاشة تسمح بالقفز إليها مباشرة."},{lines:[5,10],text:"`main`: المحتوى الأساسي الفريد. واحد فقط في الصفحة."},{lines:[6,9],text:"`article`: محتوى مستقل له معنى لو نُشر وحده (تدوينة، منتج، تعليق)."},{lines:[11],text:"`footer`: التذييل."}]},{type:`why`,text:"اختبار سريع: هل يمكن نقل هذا المحتوى إلى موقع آخر ويبقى مفهومًا؟ إذن `article`. هل هو جزء موضوعي من كل أكبر وله عنوان؟ إذن `section`. هل تحتاجه فقط لأغراض التنسيق؟ إذن `div`."},{type:`h`,text:`الدلالة تعني السلوك أحيانًا`},{type:`p`,text:"المثال الأشهر: `<button>` مقابل `<div onclick>`. الزر الحقيقي يمكن الوصول إليه بمفتاح Tab ويُفعَّل بـ Enter والمسافة، وتعلن عنه قارئات الشاشة كزر — كل ذلك مجانًا. أما div فلا يفعل شيئًا من هذا."},{type:`try`,mode:`web`,files:{html:`<header>
  <h1>متجر الكتب</h1>
  <nav><a href="#new">الجديد</a> · <a href="#offers">العروض</a></nav>
</header>
<main>
  <section id="new">
    <h2>وصل حديثًا</h2>
    <article>
      <h3>كتاب البرمجة للمبتدئين</h3>
      <p>السعر: 45 ريال</p>
    </article>
  </section>
</main>
<footer><p>جميع الحقوق محفوظة</p></footer>`,css:`header, main, footer, section, article { outline: 1px dashed #999; padding: 8px; margin: 6px 0; }`}}],exercise:{kind:`dom`,prompt:"ابنِ هيكل صفحة دلالية: `header` يحتوي `h1` و`nav` (فيه رابط واحد على الأقل)، ثم `main` يحتوي `article` واحدًا على الأقل له عنوان `h2`، ثم `footer`. يجب أن يكون هناك `main` واحد فقط.",editable:[`html`],starter:{html:``},solution:{html:`<header>
  <h1>موقعي</h1>
  <nav><a href="#">الرئيسية</a></nav>
</header>
<main>
  <article>
    <h2>أول تدوينة</h2>
    <p>محتوى</p>
  </article>
</main>
<footer>© 2026</footer>`},hints:[`الترتيب: header ثم main ثم footer، كلها في المستوى نفسه.`,`nav يوضع داخل header في هذا التمرين.`],checks:[{title:`header يحتوي h1 وnav فيه رابط`,test:`({ $ }) => !!$('header h1') && !!$('header nav a')`},{title:`main واحد فقط`,test:`({ $$ }) => $$('main').length === 1 || 'عدد عناصر main: ' + $$('main').length`},{title:`article داخل main وله h2`,test:`({ $ }) => !!$('main article h2')`},{title:`يوجد footer خارج main`,test:`({ $ }) => !!$('footer') && !$('main footer')`},{title:`لا يوجد div يستخدم onclick كزر`,test:`({ $$ }) => $$('div[onclick], span[onclick]').length === 0`}]},quiz:[{q:`بطاقة منتج في متجر يمكن عرضها منفردة، أنسب عنصر لها:`,options:[`div`,`article`,`nav`],answer:1,explain:`محتوى مستقل ذو معنى بذاته → article.`},{q:"لماذا `<button>` أفضل من `<div onclick>`؟",options:[`شكله أجمل`,`يدعم لوحة المفاتيح وقارئات الشاشة تلقائيًا`,`أسرع في التحميل`],answer:1,explain:`العناصر الدلالية تأتي بسلوك إتاحة الوصول مجانًا.`},{q:"كم عنصر `main` ظاهر يجب أن يكون في الصفحة؟",options:[`واحد`,`اثنان`,`أي عدد`],answer:0,explain:`main يمثل المحتوى الأساسي الفريد للصفحة.`}],refs:[{title:`MDN: Semantics`,url:`https://developer.mozilla.org/en-US/docs/Glossary/Semantics`},{title:`MDN: HTML: A good basis for accessibility`,url:`https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML`}]},{id:`html-06`,title:`النماذج: جمع المدخلات`,summary:`form وlabel وinput بأنواعه وbutton، والتحقق المدمج في المتصفح.`,minutes:25,objectives:[`تبني نموذجًا يربط كل حقل بتسمية`,`تختار نوع input المناسب`,`تستخدم التحقق المدمج مثل required`],blocks:[{type:`p`,text:`النماذج هي الطريقة التي يعطي بها المستخدم بيانات للموقع: تسجيل، بحث، تعليق. أهم قاعدة: **كل حقل يحتاج تسمية مرتبطة به**.`},{type:`code`,lang:`html`,code:`<form>
  <label for="email">البريد الإلكتروني</label>
  <input id="email" name="email" type="email" required>

  <label for="age">العمر</label>
  <input id="age" name="age" type="number" min="10" max="99">

  <button type="submit">تسجيل</button>
</form>`,notes:[{lines:[2,3],text:'`for="email"` في التسمية يطابق `id="email"` في الحقل. النتيجة: النقر على التسمية يركّز الحقل، وقارئ الشاشة يقرأ التسمية عند الوصول للحقل.'},{lines:[3],text:'`type="email"` يجعل المتصفح يتحقق من صيغة البريد ويُظهر لوحة مفاتيح مناسبة على الجوال. `required` يمنع الإرسال إن كان فارغًا.'},{lines:[3,6],text:"`name` هو اسم القيمة عند إرسال البيانات."},{lines:[6],text:'`type="number"` مع `min` و`max` يقيّد القيمة.'},{lines:[8],text:"زر داخل نموذج نوعه الافتراضي submit. اكتب `type` صراحة دائمًا لتوضيح نيتك."}]},{type:`warn`,text:"`placeholder` ليس بديلًا عن `label`: يختفي عند الكتابة، ولونه الباهت يصعب قراءته، وبعض قارئات الشاشة لا تعتمده."},{type:`try`,mode:`web`,files:{html:`<form>
  <label for="n">الاسم</label>
  <input id="n" required>
  <label for="c">المدينة</label>
  <select id="c">
    <option>الرياض</option>
    <option>القاهرة</option>
  </select>
  <label><input type="checkbox"> أوافق على الشروط</label>
  <button type="submit">إرسال</button>
</form>`,css:`form { display: grid; gap: 8px; max-width: 280px; }`}},{type:`why`,text:`لاحظ أن النقر على «أوافق على الشروط» يحدد المربع: الحقل **داخل** label، وهذه طريقة ثانية للربط دون for/id.`},{type:`tip`,text:`التحقق في المتصفح (required، type="email") يحسّن التجربة، لكنه ليس حماية: أي شخص يستطيع تجاوزه، لذلك الخادم يجب أن يتحقق من البيانات دائمًا.`}],exercise:{kind:`dom`,prompt:"ابنِ نموذج تسجيل `form` فيه: حقل بريد إلكتروني من النوع المناسب **وإلزامي**، وحقل كلمة مرور من النوع المناسب، وكل حقل مرتبط بـ `label` عبر for/id، وزر إرسال نوعه submit.",editable:[`html`],starter:{html:`<form>
  
</form>
`},solution:{html:`<form>
  <label for="email">البريد</label>
  <input id="email" type="email" name="email" required>
  <label for="pass">كلمة المرور</label>
  <input id="pass" type="password" name="password">
  <button type="submit">تسجيل</button>
</form>`},hints:['نوع حقل البريد: `type="email"`، ونوع كلمة المرور: `type="password"`.',"قيمة `for` في label = قيمة `id` في input."],checks:[{title:`حقل email إلزامي داخل form`,test:`({ $ }) => { const i = $('form input[type=email]'); return !!i && i.required }`},{title:`حقل password داخل form`,test:`({ $ }) => !!$('form input[type=password]')`},{title:`كل حقل مرتبط بتسمية label`,test:`({ $$ }) => { const ins = $$('form input:not([type=submit]):not([type=hidden])'); return ins.length > 0 && ins.every((i) => i.labels && i.labels.length > 0) || 'يوجد حقل بلا label مرتبط' }`},{title:`زر إرسال type="submit"`,test:`({ $ }) => !!$('form button[type=submit], form input[type=submit]')`},{title:`التحقق المدمج يعمل: البريد الخاطئ مرفوض`,test:`({ $ }) => { const i = $('form input[type=email]'); i.value = 'ليس-بريدًا'; const bad = !i.checkValidity(); i.value = 'a@b.co'; const good = i.checkValidity(); i.value = ''; return bad && good }`}]},quiz:[{q:`كيف تربط label بحقل؟`,options:[`for في label = id في الحقل`,`name متطابق`,`وضعهما متجاورين`],answer:0,explain:`أو بوضع الحقل داخل label. التجاور وحده لا يربطهما.`},{q:"ماذا يفعل `required`؟",options:[`يحمي الخادم من البيانات الخاطئة`,`يمنع المتصفح من إرسال النموذج والحقل فارغ`,`يجعل الحقل مرئيًا`],answer:1,explain:`تحقق في المتصفح لتحسين التجربة، والخادم يجب أن يتحقق أيضًا.`},{q:`نوع الزر الافتراضي داخل form:`,options:[`button`,`submit`,`reset`],answer:1,explain:`لذلك زر بلا type داخل نموذج سيرسله عند النقر.`}],refs:[{title:`MDN: Your first form`,url:`https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form`},{title:`MDN: Client-side form validation`,url:`https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation`}]}]},{key:`css`,label:`CSS`,title:`التنسيق`,blurb:`الألوان والمسافات والتخطيط المتجاوب.`,color:`var(--c-css)`,lessons:[{id:`css-01`,title:`كيف يصل CSS إلى العناصر؟`,summary:`بنية القاعدة، وطرق ربط CSS بالصفحة، والمحددات الأساسية: العنصر والصنف والمعرّف.`,minutes:20,objectives:[`تقرأ قاعدة CSS وتسمّي أجزاءها`,`تستهدف العناصر بالعنصر والصنف والمعرّف`,`تعرف لماذا يفضّل التنسيق بالأصناف`],blocks:[{type:`p`,text:`CSS لغة قواعد: كل قاعدة تقول «هذه العناصر ← بهذا الشكل».`},{type:`code`,lang:`css`,code:`.card h2 {
  color: teal;
  font-size: 1.5rem;
}`,notes:[{lines:[1],text:"`.card h2` **المحدِّد**: كل `h2` داخل عنصر يحمل الصنف `card`. المسافة بين الجزأين تعني «منحدر من/داخل»."},{lines:[2],text:"**تصريح**: خاصية `color` ثم نقطتان ثم القيمة ثم فاصلة منقوطة."},{lines:[1,4],text:"الأقواس المعقوفة `{ }` تحيط بكتلة التصريحات."}]},{type:`h`,text:`المحددات الثلاثة الأساسية`},{type:`list`,items:["`p` — كل عناصر p في الصفحة.",'`.price` — كل عنصر يحمل `class="price"` (يمكن أن يتكرر).','`#main` — العنصر الوحيد صاحب `id="main"`.']},{type:`why`,text:`لماذا نفضّل الأصناف على المعرّفات للتنسيق؟ الصنف قابل لإعادة الاستخدام على عناصر كثيرة، وخصوصيته معتدلة فيسهل تجاوزه لاحقًا. خصوصية المعرّف عالية جدًا فتجبرك على محددات أثقل لتغييره (سترى ذلك في الدرس التالي).`},{type:`h`,text:`أين يُكتب CSS؟`},{type:`list`,items:['ملف منفصل مربوط بـ `<link rel="stylesheet" href="style.css">` — الأفضل للمشاريع.',"داخل `<style>` في head — مناسب للتجارب الصغيرة.",'سمة `style=""` على العنصر — تجنّبها إلا لحالات خاصة لأنها تخلط المحتوى بالشكل.']},{type:`try`,mode:`web`,files:{html:`<h1 class="title">مرحبًا</h1>
<p>فقرة عادية</p>
<p class="note">فقرة بصنف note</p>
<p id="special">فقرة بمعرّف special</p>`,css:`p { color: gray; }
.note { color: darkorange; }
#special { color: crimson; }
.title { letter-spacing: 2px; }`}},{type:`tip`,text:"إن أخطأت في تصريح (مثل `colr: red`) يتجاهله المتصفح بصمت ويكمل الباقي. لذلك عندما «لا يعمل» التنسيق، افحص الإملاء أولًا — أداة «شرح الأكواد» في المنصة تنبّهك لهذا."}],exercise:{kind:`dom`,prompt:"لديك HTML جاهز (لا تعدّله). اكتب CSS يجعل: العنوان صاحب الصنف `title` بلون `teal`، وكل الفقرات `p` بحجم خط `18px`، والفقرة صاحبة المعرّف `intro` بخط عريض (font-weight: 700).",editable:[`css`],readonly:[`html`],starter:{html:`<h1 class="title">مكتبتي</h1>
<p id="intro">مرحبًا بك في مكتبتي.</p>
<p>لدينا أكثر من ألف كتاب.</p>`,css:`/* اكتب قواعدك هنا */
`},solution:{css:`.title { color: teal; }
p { font-size: 18px; }
#intro { font-weight: 700; }`},hints:["محدد الصنف يبدأ بنقطة `.title`، ومحدد المعرّف بعلامة `#intro`.",`تذكّر الفاصلة المنقوطة بعد كل تصريح.`],checks:[{title:`لون .title هو teal`,test:`({ css, color }) => css('.title', 'color') === color('teal')`},{title:`كل الفقرات بحجم 18px`,test:`({ $$, css }) => $$('p').every((p) => css(p, 'font-size') === '18px')`},{title:`#intro بخط عريض 700`,test:`({ css }) => css('#intro', 'font-weight') === '700'`},{title:`الفقرة الثانية ليست عريضة`,test:`({ $$, css }) => css($$('p')[1], 'font-weight') === '400'`,fail:`الخط العريض يجب أن يطبَّق على #intro فقط.`}]},quiz:[{q:"المحدد `.menu a` يستهدف:",options:[`العناصر a التي تحمل الصنف menu`,`كل a داخل عنصر يحمل الصنف menu`,`عنصر menu وعنصر a`],answer:1,explain:`المسافة تعني «داخل» (منحدر من).`},{q:`ماذا يحدث لتصريح فيه خطأ إملائي؟`,options:[`تتوقف كل القاعدة`,`يتجاهله المتصفح ويكمل الباقي`,`تظهر رسالة خطأ للمستخدم`],answer:1,explain:`CSS متسامحة: تتجاهل ما لا تفهمه.`},{q:`أي محدد يمكن أن يطابق عدة عناصر بطبيعته؟`,options:[`#logo`,`.btn`,`كلاهما`],answer:1,explain:`المعرّف يجب أن يكون فريدًا في الصفحة، والصنف قابل للتكرار.`}],refs:[{title:`MDN: CSS first steps`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/First_steps`},{title:`MDN: Basic selectors`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors`}]},{id:`css-02`,title:`التتالي والخصوصية والوراثة`,summary:`من يفوز عندما تتعارض القواعد؟ ثلاثة مبادئ تفسر 90% من حالات «لماذا لا يُطبَّق التنسيق؟».`,minutes:25,objectives:[`تحسب خصوصية المحدد`,`تتنبأ بالقاعدة الفائزة`,`تميّز الخصائص الموروثة من غيرها`],blocks:[{type:`p`,text:`عندما تنطبق عدة قواعد على العنصر نفسه وتحدد الخاصية نفسها، يقرر المتصفح الفائز بالترتيب التالي (مبسّطًا):`},{type:`list`,items:["**الأهمية**: التصريح المعلَّم بـ `!important` يتفوق.",`**الخصوصية**: المحدد الأكثر تحديدًا يفوز.`,`**ترتيب الظهور**: عند التساوي، القاعدة الأخيرة في الملف تفوز.`]},{type:`h`,text:`حساب الخصوصية`},{type:`p`,text:"نعدّ ثلاثة أرقام (أ، ب، ج): **أ** عدد المعرّفات، **ب** عدد الأصناف والسمات والحالات مثل `:hover`، **ج** عدد العناصر. نقارن من اليسار: معرّف واحد يتفوق على أي عدد من الأصناف."},{type:`code`,lang:`css`,code:`p { color: gray; }            /* (0,0,1) */
.note { color: orange; }      /* (0,1,0) يفوز على p */
article .note { color: green; } /* (0,1,1) يفوز على .note */
#tip { color: red; }          /* (1,0,0) يفوز على الجميع */`,notes:[{lines:[1,2],text:`صنف واحد (0,1,0) أكبر من عنصر واحد (0,0,1).`},{lines:[3],text:`صنف + عنصر = (0,1,1)، أعلى من الصنف وحده.`},{lines:[4],text:`المعرّف في خانة أعلى، فيفوز ولو جاء أولًا في الملف.`}]},{type:`warn`,text:"`!important` يحل المشكلة اليوم ويصنع مشكلة أكبر غدًا: لتجاوزه تحتاج `!important` آخر بخصوصية أعلى. استخدمه فقط كحل أخير."},{type:`h`,text:`الوراثة`},{type:`p`,text:"بعض الخصائص تنتقل تلقائيًا من الأب لأبنائه: الخصائص **النصية** مثل `color` و`font-family` و`line-height`. خصائص **الصندوق** مثل `margin` و`border` و`padding` لا تُورث — تخيّل لو ورث كل ابن حدود أبيه!"},{type:`try`,mode:`web`,files:{html:`<article>
  <p class="note" id="tip">من سيفوز بلون هذه الفقرة؟</p>
  <p>وهذه؟ (ترث من article؟)</p>
</article>`,css:`article { color: navy; border: 2px solid; padding: 8px; }
p { color: gray; }
.note { color: orange; }
article .note { color: green; }
/* احذف التعليق عن السطر التالي */
/* #tip { color: red; } */`}},{type:`why`,text:"في التجربة: الفقرة الثانية رمادية لا كحلية. لماذا لم ترث لون article؟ لأن الوراثة تعطي قيمة فقط عندما **لا توجد قاعدة** تستهدف العنصر مباشرة، والقاعدة `p { color: gray }` تستهدفه."},{type:`tip`,text:`أداة «شرح الأكواد» في المنصة تحسب الخصوصية لكل محدد تكتبه تلقائيًا. جرّب لصق CSS فيها.`}],exercise:{kind:`dom`,prompt:"في الكود الجاهز، الفقرة `.warning` تظهر بلون رمادي بسبب قاعدة أعلى خصوصية. **دون استخدام !important ودون تعديل HTML أو القواعد الموجودة**، أضف قاعدة جديدة في النهاية تجعل لون `.warning` أحمر (`red`)، مع بقاء الفقرة العادية رمادية.",editable:[`css`],readonly:[`html`],starter:{html:`<main id="page">
  <p>فقرة عادية</p>
  <p class="warning">تحذير مهم!</p>
</main>`,css:`#page p { color: gray; }

/* أضف قاعدتك أدناه */
`},solution:{css:`#page p { color: gray; }

#page p.warning { color: red; }`},hints:["خصوصية `#page p` هي (1,0,1). تحتاج محددًا أعلى منها.","جرّب إضافة الصنف إلى المحدد نفسه: `#page p.warning` = (1,1,1)."],checks:[{title:`.warning باللون الأحمر`,test:`({ css, color }) => css('.warning', 'color') === color('red')`},{title:`الفقرة العادية ما زالت رمادية`,test:`({ $, css, color }) => css($('#page p:not(.warning)'), 'color') === color('gray')`},{title:`بدون !important`,test:`({ files }) => !/!\\s*important/i.test(files.css || '') || 'وجدنا !important في الكود'`},{title:`القاعدة الأصلية ما زالت موجودة`,test:`({ doc }) => [...doc.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => r.selectorText === '#page p' && r.style.color === 'gray') } catch (e) { return false } }) || 'لا تحذف قاعدة #page p الأصلية'`}]},quiz:[{q:"خصوصية `nav ul li a.active`:",options:[`(0,1,4)`,`(0,0,5)`,`(1,0,4)`],answer:0,explain:`أربعة عناصر (nav, ul, li, a) وصنف واحد.`},{q:"`#a { color: red }` ثم `.b.c.d { color: blue }` على عنصر يطابقهما:",options:[`أحمر`,`أزرق`],answer:0,explain:`المعرّف (1,0,0) أعلى من ثلاثة أصناف (0,3,0) لأن المقارنة من الخانة اليسرى.`},{q:`أي خاصية تُورث افتراضيًا؟`,options:[`padding`,`border`,`color`],answer:2,explain:`الخصائص النصية مثل color تُورث، وخصائص الصندوق لا.`}],refs:[{title:`MDN: Cascade, specificity, and inheritance`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance`}]},{id:`css-03`,title:`نموذج الصندوق`,summary:`كل عنصر صندوق: محتوى ثم حشوة ثم حد ثم هامش. وbox-sizing الذي يجعل الحسابات منطقية.`,minutes:25,objectives:[`تميّز padding من margin`,`تحسب العرض الكلي لصندوق`,`تستخدم box-sizing: border-box`],blocks:[{type:`p`,text:`المتصفح يرسم كل عنصر كمستطيل من أربع طبقات، من الداخل للخارج:`},{type:`list`,items:[`**المحتوى** (content): النص أو الصورة.`,`**الحشوة** (padding): مسافة داخلية تأخذ لون الخلفية.`,`**الحد** (border): الإطار.`,`**الهامش** (margin): مسافة شفافة خارجية تبعد العناصر الأخرى.`]},{type:`code`,lang:`css`,code:`.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  margin: 10px;
}`,notes:[{lines:[2],text:"افتراضيًا (`box-sizing: content-box`) هذا عرض **المحتوى فقط**."},{lines:[3,4],text:`العرض المرئي = 200 + 20×2 + 5×2 = **250px**. مفاجأة شائعة للمبتدئين!`},{lines:[5],text:`الهامش لا يُحسب ضمن الصندوق المرئي لكنه يشغل مساحة حوله.`}]},{type:`h`,text:`الحل: border-box`},{type:`code`,lang:`css`,code:`*, *::before, *::after {
  box-sizing: border-box;
}`,notes:[{lines:[1,3],text:"مع `border-box` يصبح `width` شاملًا للحشوة والحد: width: 200px يعني 200px مرئية بالضبط، والمحتوى يتقلص ليتسع. معظم المشاريع الحديثة تبدأ بهذه القاعدة."}]},{type:`h`,text:`اختصارات الجهات`},{type:`p`,text:"`margin: 10px` الجهات الأربع. `margin: 10px 20px` عمودي ثم أفقي. `margin: 1px 2px 3px 4px` أعلى، يمين، أسفل، يسار (مع عقارب الساعة). وللمواقع العربية فضّل الخصائص المنطقية مثل `padding-inline-start` التي تتبع اتجاه الكتابة."},{type:`try`,mode:`web`,files:{html:`<div class="box">صندوق</div>
<div class="box b2">صندوق border-box</div>`,css:`.box {
  width: 200px;
  padding: 20px;
  border: 5px solid teal;
  margin: 10px;
  background: #e6fffa;
}
.b2 { box-sizing: border-box; }`}},{type:`why`,text:`لماذا الهوامش العمودية بين فقرتين لا تُجمع أحيانًا؟ هذا «انطواء الهوامش» (margin collapsing): الهامش السفلي لعنصر والعلوي للتالي في التدفق العادي يندمجان ويُستخدم الأكبر فقط. لا يحدث هذا داخل حاويات flex وgrid.`}],exercise:{kind:`dom`,prompt:"اجعل `.card` بعرض مرئي كلي **300px بالضبط**، مع حشوة `24px` من كل الجهات، وحد `2px solid` بأي لون، وهامش سفلي `16px`. يجب أن يبقى العرض 300px رغم الحشوة والحد.",editable:[`css`],readonly:[`html`],starter:{html:`<div class="card">بطاقة</div>
<div class="card">بطاقة ثانية</div>`,css:`.card {
  width: 300px;
  background: #f1f5f9;
}
`},solution:{css:`.card {
  box-sizing: border-box;
  width: 300px;
  padding: 24px;
  border: 2px solid #94a3b8;
  margin-bottom: 16px;
  background: #f1f5f9;
}`},hints:[`بدون تغيير طريقة الحساب سيصبح العرض 300 + 48 + 4 = 352px.`,"خاصية `box-sizing` هي المفتاح."],checks:[{title:`العرض المرئي 300px`,test:`({ $ }) => { const w = $('.card').getBoundingClientRect().width; return Math.abs(w - 300) < 0.5 || 'العرض الحالي ' + w + 'px' }`},{title:`حشوة 24px من كل الجهات`,test:`({ css }) => ['top','right','bottom','left'].every((s) => css('.card', 'padding-' + s) === '24px')`},{title:`حد 2px solid`,test:`({ css }) => css('.card', 'border-top-width') === '2px' && css('.card', 'border-top-style') === 'solid' && css('.card', 'border-left-width') === '2px'`},{title:`هامش سفلي 16px`,test:`({ css }) => css('.card', 'margin-bottom') === '16px'`},{title:`المسافة بين البطاقتين 16px`,test:`({ $$ }) => { const [a, b] = $$('.card'); const gap = b.getBoundingClientRect().top - a.getBoundingClientRect().bottom; return Math.abs(gap - 16) < 0.5 || 'المسافة الحالية ' + gap + 'px' }`}]},quiz:[{q:`width: 100px; padding: 10px; border: 1px — العرض المرئي مع content-box:`,options:[`100px`,`122px`,`111px`],answer:1,explain:`100 + 10×2 + 1×2 = 122.`},{q:`أي طبقة تأخذ لون الخلفية؟`,options:[`margin`,`padding`,`كلاهما`],answer:1,explain:`الخلفية تمتد تحت المحتوى والحشوة (والحد)، والهامش شفاف دائمًا.`},{q:"`margin: 0 auto` على عنصر كتلي له عرض محدد:",options:[`يحذف الهامش`,`يوسّطه أفقيًا`,`يمدّه لكامل العرض`],answer:1,explain:`auto يقسّم المساحة الأفقية المتبقية بالتساوي.`}],refs:[{title:`MDN: The box model`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model`}]},{id:`css-04`,title:`الألوان والخطوط والوحدات`,summary:`HSL للألوان، وrem للأحجام، وline-height المريح للعربية، وتباين يقرأه الجميع.`,minutes:20,objectives:[`تكتب الألوان بصيغ مختلفة وتعدّلها بـ HSL`,`تختار بين px وrem و%`,`تضبط قراءة مريحة للنص العربي`],blocks:[{type:`p`,text:"اللون الواحد يمكن كتابته بعدة صيغ: `teal` و`#008080` و`rgb(0 128 128)` و`hsl(180 100% 25%)` — كلها اللون نفسه."},{type:`code`,lang:`css`,code:`:root {
  --brand: hsl(174 72% 40%);
  --brand-dark: hsl(174 72% 28%);
}
button { background: var(--brand); }
button:hover { background: var(--brand-dark); }`,notes:[{lines:[2],text:`HSL = درجة اللون (0–360 على عجلة الألوان)، التشبّع، الإضاءة. مريحة لأنك تغيّر رقمًا واحدًا لتحصل على درجة أغمق.`},{lines:[3],text:`نفس الدرجة والتشبع، إضاءة أقل = نسخة أغمق متناسقة.`},{lines:[1,4],text:"`--brand` **متغير CSS**؛ نعرّفه مرة ونستخدمه بـ `var()`. تغيير الثيم كله يصبح تعديل سطر واحد."}]},{type:`h`,text:`الوحدات`},{type:`list`,items:["`px` ثابتة: جيدة للحدود الرفيعة.","`rem` نسبة لحجم خط الجذر (16px افتراضيًا): الأفضل لأحجام الخطوط لأنها تحترم إعدادات تكبير الخط عند المستخدم.","`%` نسبة للأب، و`vw`/`vh` نسبة لنافذة العرض.","`line-height` بلا وحدة مثل `1.7` يكون نسبة لحجم خط كل عنصر."]},{type:`why`,text:`لماذا rem وليس px للخطوط؟ بعض المستخدمين ضعاف النظر يكبّرون الخط الافتراضي في إعدادات المتصفح. مع rem تكبر صفحتك معهم، ومع px تبقى صغيرة.`},{type:`h`,text:`التباين`},{type:`p`,text:`معيار WCAG يطلب نسبة تباين 4.5:1 على الأقل بين النص العادي وخلفيته. الرمادي الفاتح الأنيق على الأبيض كثيرًا ما يفشل! جرّب «مختبر الألوان» في المنصة لقياس التباين.`},{type:`try`,mode:`web`,files:{html:`<h1>عنوان</h1>
<p>نص عربي طويل بعض الشيء ليظهر أثر ارتفاع السطر على راحة القراءة. جرّب تغيير line-height وحجم الخط.</p>`,css:`body {
  font-family: Tahoma, sans-serif;
  line-height: 1.8;
  color: hsl(220 20% 20%);
}
h1 { font-size: 2rem; color: hsl(174 72% 30%); }
p { max-width: 45ch; }`}}],exercise:{kind:`dom`,prompt:"عرّف متغيرًا `--accent` على `:root` بقيمة `hsl(174 72% 30%)`، واستخدمه لون نص لـ `h1`. اجعل حجم خط `h1` بوحدة rem يساوي `2rem`، واجعل `line-height` للـ `body` يساوي `1.7` (بلا وحدة).",editable:[`css`],readonly:[`html`],starter:{html:`<h1>تعلّم CSS</h1>
<p>الألوان والخطوط تصنع الانطباع الأول.</p>`,css:``},solution:{css:`:root { --accent: hsl(174 72% 30%); }
body { line-height: 1.7; }
h1 { color: var(--accent); font-size: 2rem; }`},hints:["المتغير يُعرَّف هكذا: `:root { --accent: ...; }`.","استخدمه بـ `color: var(--accent);`."],checks:[{title:`المتغير --accent معرّف على :root`,test:`({ doc }) => getComputedStyle(doc.documentElement).getPropertyValue('--accent').trim().length > 0`},{title:`لون h1 يأتي من المتغير`,test:`({ css, color, doc }) => { const v = getComputedStyle(doc.documentElement).getPropertyValue('--accent').trim(); return css('h1', 'color') === color('hsl(174 72% 30%)') && color(v) === color('hsl(174 72% 30%)') }`},{title:`h1 بحجم 2rem (32px)`,test:`({ css, files }) => css('h1', 'font-size') === '32px' && /2rem/.test(files.css || '') || 'استخدم 2rem'`},{title:`line-height للـ body = 1.7 بلا وحدة`,test:`({ $, css }) => { const p = $('p'); const fs = parseFloat(css(p, 'font-size')); const lh = parseFloat(css(p, 'line-height')); return Math.abs(lh - fs * 1.7) < 0.6 || 'ارتفاع السطر المحسوب ' + lh + 'px' }`}]},quiz:[{q:`إذا كان خط الجذر 16px، كم يساوي 1.5rem؟`,options:[`15px`,`24px`,`1.5px`],answer:1,explain:`1.5 × 16 = 24.`},{q:`لصنع درجة أغمق من hsl(200 80% 50%) نغيّر:`,options:[`الرقم الأول`,`التشبّع`,`الإضاءة`],answer:2,explain:`تقليل الإضاءة (L) يعطي درجة أغمق من اللون نفسه.`},{q:`لماذا يفضل line-height بلا وحدة؟`,options:[`أقصر في الكتابة`,`يُحسب نسبة لخط كل عنصر بدل قيمة ثابتة موروثة`,`لا فرق`],answer:1,explain:`القيمة بلا وحدة تُورث كنسبة، أما 24px فتُورث كما هي حتى للعناوين الكبيرة.`}],refs:[{title:`MDN: Values and units`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units`},{title:`MDN: Using CSS custom properties`,url:`https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties`}]},{id:`css-05`,title:`Flexbox: التخطيط في بُعد واحد`,summary:`المحور الرئيسي والعرضي، وjustify-content وalign-items وgap — وكيف يتأثر كل ذلك باتجاه RTL.`,minutes:30,objectives:[`تفعّل Flexbox على حاوية`,`توزّع العناصر وتحاذيها على المحورين`,`تفهم أثر flex-direction وRTL`],blocks:[{type:`p`,text:"Flexbox يرتّب **أبناء** الحاوية في صف أو عمود ويوزّع المساحة بينهم. يكفي سطر واحد لتفعيله: `display: flex` على الحاوية."},{type:`code`,lang:`css`,code:`.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,notes:[{lines:[2],text:`الأبناء المباشرون يصبحون «عناصر مرنة» مصطفة في صف.`},{lines:[3],text:"`justify-content` يوزّع على **المحور الرئيسي** (أفقي في الصف). `space-between`: الأول في البداية والأخير في النهاية والباقي بينهما."},{lines:[4],text:"`align-items` يحاذي على **المحور العرضي** (عمودي في الصف)."},{lines:[5],text:"`gap` مسافة ثابتة بين العناصر فقط، لا على الأطراف."}]},{type:`why`,text:"لماذا يقولون «المحور الرئيسي» بدل «أفقي»؟ لأن `flex-direction: column` يقلب المحاور: يصبح justify-content عموديًا وalign-items أفقيًا. وفي صفحة RTL يبدأ الصف من **اليمين**، فـ`flex-start` تعني اليمين. Flexbox يفكّر بالبداية والنهاية لا باليمين واليسار."},{type:`try`,mode:`web`,files:{html:`<div class="row">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`,css:`.row {
  display: flex;
  justify-content: space-between; /* جرّب: center, flex-end, space-evenly */
  align-items: center;            /* جرّب: flex-start, stretch */
  gap: 8px;
  height: 120px;
  background: #eef2ff;
}
.item { background: #6366f1; color: white; padding: 12px 18px; }
.item:nth-child(2) { padding-block: 30px; }`}},{type:`h`,text:`تمدد العناصر`},{type:`p`,text:"`flex: 1` على عنصر يجعله يأخذ المساحة المتبقية. شائع في التخطيطات: شريط جانبي ثابت `flex: 0 0 240px` ومحتوى `flex: 1`."},{type:`tip`,text:`جرّب «مختبر CSS ← Flexbox» في المنصة: كل خيار مشروح بالعربية وترى أثره فورًا مع الكود الناتج.`}],exercise:{kind:`dom`,prompt:"حوّل `.toolbar` إلى حاوية flex بحيث يكون الشعار في **بداية** السطر وزر الدخول في **نهايته** (space-between)، والعناصر **متوسطة عموديًا**، وبينها فجوة `12px`. لا تعدّل HTML.",editable:[`css`],readonly:[`html`],starter:{html:`<header class="toolbar">
  <strong class="logo">سطر</strong>
  <nav class="links"><a href="#">الدروس</a> <a href="#">المشاريع</a></nav>
  <button class="login">دخول</button>
</header>`,css:`.toolbar {
  height: 64px;
  padding: 0 16px;
  background: #0f172a;
  color: white;
}
.links a { color: #93c5fd; }
`},solution:{css:`.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  height: 64px;
  padding: 0 16px;
  background: #0f172a;
  color: white;
}
.links a { color: #93c5fd; }`},hints:["ابدأ بـ `display: flex;` على `.toolbar`.","للتوسيط العمودي في الصف: `align-items: center`."],checks:[{title:`display: flex`,test:`({ css }) => css('.toolbar', 'display') === 'flex'`},{title:`الشعار في البداية (اليمين في RTL) والزر في النهاية`,test:`({ $ }) => { const bar = $('.toolbar').getBoundingClientRect(); const logo = $('.logo').getBoundingClientRect(); const btn = $('.login').getBoundingClientRect(); const pad = 16; return Math.abs(bar.right - pad - logo.right) < 2 && Math.abs(btn.left - (bar.left + pad)) < 2 }`,fail:`الشعار يجب أن يلتصق بالبداية والزر بالنهاية (space-between).`},{title:`العناصر متوسطة عموديًا`,test:`({ $ }) => { const bar = $('.toolbar').getBoundingClientRect(); const c = bar.top + bar.height / 2; return ['.logo', '.login', '.links'].every((s) => { const r = $(s).getBoundingClientRect(); return Math.abs(r.top + r.height / 2 - c) < 2 }) }`},{title:`gap = 12px`,test:`({ css }) => css('.toolbar', 'column-gap') === '12px'`}]},quiz:[{q:"مع `flex-direction: column`، أي خاصية توسّط العناصر عموديًا؟",options:[`align-items`,`justify-content`],answer:1,explain:`في العمود يصبح المحور الرئيسي عموديًا، وjustify-content تعمل على المحور الرئيسي.`},{q:'في صفحة dir="rtl"، أين يقع `flex-start` في صف؟',options:[`اليسار`,`اليمين`],answer:1,explain:`البداية تتبع اتجاه الكتابة.`},{q:"على من نكتب `display: flex`؟",options:[`على العناصر التي نريد ترتيبها`,`على حاويتها الأب`],answer:1,explain:`الحاوية تصبح flex container وأبناؤها المباشرون flex items.`}],refs:[{title:`MDN: Flexbox`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox`},{title:`MDN: Basic concepts of flexbox`,url:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox`}]},{id:`css-06`,title:`CSS Grid: التخطيط في بُعدين`,summary:`الأعمدة والصفوف معًا، ووحدة fr، وrepeat وminmax لشبكات تتجاوب تلقائيًا.`,minutes:30,objectives:[`تعرّف أعمدة الشبكة بـ grid-template-columns`,`تستخدم fr وrepeat`,`تجعل عنصرًا يمتد على عدة أعمدة`],blocks:[{type:`p`,text:`Flexbox يفكّر في سطر واحد؛ Grid يفكّر في **شبكة** صفوف وأعمدة معًا، فهو مثالي لتخطيط الصفحات ومعارض الصور.`},{type:`code`,lang:`css`,code:`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.featured {
  grid-column: span 2;
}`,notes:[{lines:[3],text:"`repeat(3, 1fr)` = `1fr 1fr 1fr`: ثلاثة أعمدة متساوية. `fr` تعني «حصة من المساحة المتبقية» بعد الفجوات."},{lines:[4],text:"`gap` بين الصفوف والأعمدة معًا."},{lines:[6,8],text:`هذا العنصر يمتد على عمودين.`}]},{type:`h`,text:`شبكة متجاوبة بلا media queries`},{type:`code`,lang:`css`,code:`.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,notes:[{lines:[3],text:`«ضع أكبر عدد ممكن من الأعمدة، كل عمود 200px على الأقل، ووزّع الباقي بالتساوي». على الجوال عمود واحد، وعلى الشاشة الكبيرة أربعة — تلقائيًا.`}]},{type:`try`,mode:`web`,files:{html:`<div class="gallery">
  <div class="featured">مميز</div>
  <div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
</div>`,css:`.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.gallery > div { background: #fde68a; padding: 24px; text-align: center; border-radius: 8px; }
.featured { grid-column: span 2; background: #f59e0b !important; }`}},{type:`why`,text:`متى Grid ومتى Flexbox؟ إن كنت تريد العناصر أن تصطف في أعمدة **متطابقة** عبر الصفوف → Grid. إن كنت تريد توزيع عناصر بأحجام مختلفة على سطر واحد (شريط أدوات، أزرار) → Flexbox. وكثيرًا ما نستخدمهما معًا.`}],exercise:{kind:`dom`,prompt:"اجعل `.gallery` شبكة من **3 أعمدة متساوية** بفجوة `16px`، واجعل العنصر `.wide` يمتد على **عمودين**.",editable:[`css`],readonly:[`html`],starter:{html:`<section class="gallery">
  <div class="wide">صورة عريضة</div>
  <div>1</div><div>2</div><div>3</div><div>4</div>
</section>`,css:`.gallery { width: 600px; }
.gallery > div { background: #c7d2fe; padding: 20px; }
`},solution:{css:`.gallery { width: 600px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gallery > div { background: #c7d2fe; padding: 20px; }
.wide { grid-column: span 2; }`},hints:["`display: grid` ثم `grid-template-columns: repeat(3, 1fr)`.","`grid-column: span 2` على `.wide`."],checks:[{title:`display: grid`,test:`({ css }) => css('.gallery', 'display') === 'grid'`},{title:`3 أعمدة متساوية`,test:`({ css }) => { const cols = css('.gallery', 'grid-template-columns').split(' ').map(parseFloat); return cols.length === 3 && Math.max(...cols) - Math.min(...cols) < 0.5 || 'الأعمدة الحالية: ' + css('.gallery', 'grid-template-columns') }`},{title:`الفجوة 16px`,test:`({ css }) => css('.gallery', 'column-gap') === '16px' && css('.gallery', 'row-gap') === '16px'`},{title:`.wide يمتد على عمودين`,test:`({ $, $$ }) => { const w = $('.wide').getBoundingClientRect().width; const one = $$('.gallery > div')[1].getBoundingClientRect().width; return Math.abs(w - (one * 2 + 16)) < 1 }`}]},quiz:[{q:"`grid-template-columns: 200px 1fr` في حاوية عرضها 800px بلا فجوة. عرض العمود الثاني:",options:[`200px`,`600px`,`400px`],answer:1,explain:`1fr يأخذ كل المساحة المتبقية: 800 − 200 = 600.`},{q:"ماذا يفعل `repeat(auto-fit, minmax(150px, 1fr))`؟",options:[`150 عمودًا`,`أكبر عدد من الأعمدة لا يقل عرض كل منها عن 150px`,`عمود واحد دائمًا`],answer:1,explain:`يتكيف عدد الأعمدة مع عرض الحاوية.`},{q:`لشريط أزرار بأحجام مختلفة على سطر واحد، الأنسب:`,options:[`Grid`,`Flexbox`],answer:1,explain:`Flexbox مصمم للتوزيع على بعد واحد.`}],refs:[{title:`MDN: Grids`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids`}]},{id:`css-07`,title:`التصميم المتجاوب والحركة`,summary:`media queries بنهج الجوال أولًا، وtransition وanimation مع احترام من يفضّل حركة أقل.`,minutes:30,objectives:[`تكتب media query بنهج الجوال أولًا`,`تضيف انتقالًا ناعمًا لتغيّر حالة`,`تحترم prefers-reduced-motion`],blocks:[{type:`p`,text:"نهج **الجوال أولًا**: اكتب التنسيق الأساسي للشاشات الصغيرة، ثم أضف تعديلات للشاشات الأكبر بـ `min-width`."},{type:`code`,lang:`css`,code:`.grid { display: grid; gap: 1rem; }

@media (min-width: 600px) {
  .grid { grid-template-columns: 1fr 1fr; }
}`,notes:[{lines:[1],text:`على الجوال: عمود واحد (الافتراضي في Grid).`},{lines:[3,5],text:`إذا كان عرض النافذة 600px أو أكثر → عمودان. القواعد داخل الكتلة تُطبّق فقط عند تحقق الشرط.`}]},{type:`warn`,text:'لن تعمل media queries كما تتوقع على الجوال بدون `<meta name="viewport" content="width=device-width, initial-scale=1">` في head.'},{type:`h`,text:`الانتقال (transition)`},{type:`code`,lang:`css`,code:`.btn {
  transition: transform 200ms ease-out, background-color 200ms;
}
.btn:hover {
  transform: translateY(-2px);
}`,notes:[{lines:[2],text:`«عندما تتغير هاتان الخاصيتان، غيّرهما تدريجيًا خلال 200ms». يُكتب على الحالة الأساسية لا على :hover، ليعمل في الاتجاهين.`},{lines:[5],text:"`transform` و`opacity` أخف الخصائص على الأداء لأنها لا تعيد حساب التخطيط."}]},{type:`h`,text:`احترام تفضيلات المستخدم`},{type:`code`,lang:`css`,code:`@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`,notes:[{lines:[1,3],text:`بعض المستخدمين يصابون بالدوار من الحركة ويفعّلون «تقليل الحركة» في نظامهم. هذا أحد الاستخدامات القليلة المبررة لـ !important.`}]},{type:`try`,mode:`web`,files:{html:`<div class="grid">
  <button class="btn">زر 1</button>
  <button class="btn">زر 2</button>
</div>`,css:`.grid { display: grid; gap: 1rem; }
@media (min-width: 400px) {
  .grid { grid-template-columns: 1fr 1fr; }
}
.btn { padding: 14px; border: 0; border-radius: 10px; background: #0ea5e9; color: white; transition: transform 200ms ease-out; }
.btn:hover { transform: translateY(-3px) scale(1.02); }`}},{type:`tip`,text:`في «مختبر CSS ← التجاوب» يمكنك سحب عرض المعاينة ومشاهدة أي media query تتفعّل لحظيًا.`}],exercise:{kind:`dom`,prompt:"اجعل `.cards` عمودًا واحدًا افتراضيًا، و**عمودين** عندما يكون عرض النافذة `600px` أو أكثر (media query بـ min-width). وأضف على `.card` انتقالًا لخاصية `transform` مدته `200ms`.",editable:[`css`],readonly:[`html`],starter:{html:`<section class="cards">
  <article class="card">أ</article>
  <article class="card">ب</article>
</section>`,css:`.cards { display: grid; gap: 12px; }
.card { background: #e0f2fe; padding: 16px; }
.card:hover { transform: translateY(-4px); }
`},solution:{css:`.cards { display: grid; gap: 12px; }
.card { background: #e0f2fe; padding: 16px; transition: transform 200ms ease; }
.card:hover { transform: translateY(-4px); }
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}`},hints:["الصيغة: `@media (min-width: 600px) { .cards { ... } }`.","الانتقال يُكتب على `.card` نفسها: `transition: transform 200ms;`."],checks:[{title:`توجد media query بـ min-width: 600px`,test:`({ doc }) => [...doc.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => r.media && /min-width:\\s*600px/.test(r.media.mediaText) && [...r.cssRules].some((x) => x.selectorText === '.cards' && x.style.gridTemplateColumns)) } catch (e) { return false } })`,fail:`نحتاج @media (min-width: 600px) تحوي قاعدة .cards تحدد grid-template-columns.`},{title:`القاعدة الأساسية عمود واحد (الجوال أولًا)`,test:`({ doc }) => [...doc.styleSheets].every((sh) => { try { return [...sh.cssRules].every((r) => !(r.selectorText === '.cards' && r.style.gridTemplateColumns && r.style.gridTemplateColumns.split(' ').length > 1)) } catch (e) { return true } })`,fail:`خارج media query يجب ألا تحدد أكثر من عمود.`},{title:`transition على transform بمدة 200ms`,test:`({ css }) => { const p = css('.card', 'transition-property').split(',').map((s) => s.trim()); const d = css('.card', 'transition-duration').split(',').map((s) => s.trim()); const i = p.findIndex((x) => x === 'transform' || x === 'all'); return i !== -1 && (d[i] || d[0]) === '0.2s' }`}]},quiz:[{q:`في نهج الجوال أولًا نستخدم غالبًا:`,options:[`max-width`,`min-width`],answer:1,explain:`نبدأ بالصغير ونضيف للأكبر عند «عرض لا يقل عن».`},{q:`أين نكتب transition ليعمل عند الدخول والخروج من hover؟`,options:[`في :hover`,`في الحالة الأساسية`],answer:1,explain:`إن كُتب في :hover فقط فسيعمل عند الدخول ويقفز فجأة عند الخروج.`},{q:`أخف خصائص للتحريك على الأداء:`,options:[`width وheight`,`transform وopacity`,`margin`],answer:1,explain:`لا تسبب إعادة حساب التخطيط.`}],refs:[{title:`MDN: Responsive design`,url:`https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design`},{title:`MDN: Using CSS transitions`,url:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_transitions/Using_CSS_transitions`},{title:`MDN: prefers-reduced-motion`,url:`https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion`}]}]},{key:`js`,label:`JavaScript`,title:`السلوك`,blurb:`المنطق والبيانات والتفاعل مع الصفحة.`,color:`var(--c-js)`,lessons:[{id:`js-01`,title:`أول برنامج: القيم والطرفية`,summary:`ما هو البرنامج، وكيف تطبع القيم بـ console.log، والأنواع الأساسية: نصوص وأعداد.`,minutes:15,objectives:[`تشغّل أول سطر JavaScript وترى ناتجه`,`تفرّق بين النص والعدد`,`تستخدم التعليقات`],blocks:[{type:`p`,text:`البرنامج سلسلة من **التعليمات** ينفّذها الحاسوب بالترتيب من الأعلى للأسفل. أول تعليمة يتعلمها كل مبرمج JavaScript هي الطباعة في **الطرفية** (console): مكان يرى فيه المبرمج النتائج، لا المستخدم.`},{type:`code`,lang:`js`,code:`// هذا تعليق: يتجاهله البرنامج
console.log("مرحبًا")
console.log(7 + 3)
console.log("7" + 3)`,notes:[{lines:[1],text:"التعليق يبدأ بـ `//` ويستمر حتى نهاية السطر. للشرح فقط."},{lines:[2],text:"`console.log` تطبع ما بين القوسين. النص (string) يُكتب بين علامتي اقتباس."},{lines:[3],text:`أعداد بلا اقتباس → عملية جمع حسابية: يُطبع 10.`},{lines:[4],text:'عندما يكون أحد الطرفين نصًا، `+` **تدمج** النصوص: يُطبع "73". هذا من أشهر مفاجآت JavaScript.'}]},{type:`try`,mode:`js`,code:`console.log("مرحبًا")
console.log(7 + 3)
console.log("7" + 3)
console.log(10 / 4, 10 % 4)`},{type:`why`,text:'لماذا يعطي `"7" + 3` النتيجة "73"؟ لأن العامل `+` له معنيان: جمع للأعداد ودمج للنصوص. إذا وجد نصًا في أحد الطرفين حوّل الآخر إلى نص ودمجهما. باقي العوامل مثل `-` و`*` تعمل على الأعداد فقط، لذلك `"7" - 3` يعطي 4.'},{type:`tip`,text:`جرّب الكود في «مختبر JavaScript» واضغط «خطوة» لترى البرنامج ينفّذ سطرًا بعد سطر.`}],exercise:{kind:`js`,prompt:`اكتب برنامجًا يطبع سطرين بالترتيب: الأول النص **أهلًا بالبرمجة**، والثاني **ناتج** ضرب 6 في 7 (احسبه بالكود، لا تكتب 42 مباشرة).`,starter:`// اكتب برنامجك هنا
`,solution:`console.log("أهلًا بالبرمجة")
console.log(6 * 7)`,hints:["عامل الضرب في JavaScript هو `*`.","كل `console.log` يطبع سطرًا جديدًا."],spec:{logs:[`أهلًا بالبرمجة`,`42`],checks:[{title:`الناتج محسوب بعملية ضرب`,check:`({ source }) => source.includes('*') || 'استخدم عامل الضرب *'`}]}},quiz:[{q:'ما ناتج `console.log(2 + "2")`؟',options:[`4`,`"22" أي 22 كنص`,`خطأ`],answer:1,explain:`وجود نص يجعل + تدمج: "22".`},{q:`لمن تظهر رسائل console.log؟`,options:[`للمستخدم في الصفحة`,`للمبرمج في أدوات المطوّر`,`لا تظهر`],answer:1,explain:`الطرفية أداة فحص للمبرمج.`},{q:"ما ناتج `10 % 3`؟",options:[`3.33`,`1`,`0`],answer:1,explain:`% باقي القسمة: 10 = 3×3 + 1.`}],refs:[{title:`MDN: What is JavaScript?`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript`}]},{id:`js-02`,title:`المتغيرات وأنواع البيانات`,summary:`const وlet، والأنواع الأساسية، وtypeof، والقوالب النصية.`,minutes:20,objectives:[`تعرّف متغيرات بـ const وlet وتختار بينهما`,`تعرف أنواع القيم الأساسية`,`تبني نصوصًا بالقوالب`],blocks:[{type:`p`,text:"المتغير **اسم** يشير إلى قيمة. بدل أن تكرر الرقم 50 في كل مكان، تسمّيه `price` وتستخدم الاسم."},{type:`code`,lang:`js`,code:`const price = 50
let quantity = 2
quantity = quantity + 1
const total = price * quantity
console.log(\`المجموع: \${total} ريال\`)`,notes:[{lines:[1],text:"`const` لقيمة لن يُعاد إسنادها. ابدأ بها دائمًا."},{lines:[2,3],text:"`let` لقيمة ستتغير. السطر 3 يقرأ القيمة الحالية (2) ويضيف 1 ثم يخزن الناتج (3) في المتغير نفسه."},{lines:[4],text:`التعبير على اليمين يُحسب أولًا (50 × 3 = 150) ثم يُخزَّن.`},{lines:[5],text:"**القالب النصي** بين علامتي `` ` `` يسمح بإدراج قيم داخل `${ }`. أوضح بكثير من الدمج بـ +."}]},{type:`h`,text:`الأنواع الأساسية`},{type:`list`,items:['نص `"سارة"` → `string`',"عدد `42` أو `3.5` → `number`","منطقي `true` / `false` → `boolean`","`undefined`: لم تُعطَ قيمة بعد","`null`: «لا شيء» مقصود"]},{type:`try`,mode:`js`,code:`const name = "ليلى"
let age = 24
console.log(typeof name, typeof age, typeof true)
let nothing
console.log(nothing)
console.log(\`\${name} عمرها \${age}\`)`},{type:`why`,text:`لماذا نفضّل const؟ لأنها تخبر من يقرأ الكود (وأنت منهم بعد شهر) أن هذه القيمة لن تتغير، فيقل ما يجب تتبعه ذهنيًا. وإن حاولت تغييرها خطأً ستحصل على خطأ واضح بدل سلوك غامض.`},{type:`warn`,text:"تجنب `var` في الكود الجديد: نطاقها غير بديهي وتُرفع لأعلى الدالة. ستراها في الأكواد القديمة فقط."}],exercise:{kind:`js`,prompt:"لديك المتغيران `book` و`pages`. عرّف متغيرًا `pagesPerDay` بقيمة 25، ثم احسب عدد الأيام اللازمة للقراءة في متغير `days` (قسمة pages على pagesPerDay ثم قرّب للأعلى بـ `Math.ceil`)، ثم اطبع بالضبط: `سأنهي كتاب البرمجة في 8 أيام` باستخدام قالب نصي.",starter:`const book = "البرمجة"
const pages = 190

// أكمل هنا
`,solution:`const book = "البرمجة"
const pages = 190
const pagesPerDay = 25
const days = Math.ceil(pages / pagesPerDay)
console.log(\`سأنهي كتاب \${book} في \${days} أيام\`)`,hints:["`Math.ceil(7.6)` يعطي 8.","القالب: `` `سأنهي كتاب ${book} في ${days} أيام` ``."],spec:{exports:[`pagesPerDay`,`days`],logs:[`سأنهي كتاب البرمجة في 8 أيام`],checks:[{title:`pagesPerDay = 25`,check:`({ exports }) => exports.pagesPerDay === 25`},{title:`days = 8 ومحسوبة لا مكتوبة`,check:`({ exports, source }) => exports.days === 8 && source.includes('Math.ceil') || 'احسب days باستخدام Math.ceil'`},{title:`استخدام قالب نصي`,check:"({ source }) => source.includes('`') && source.includes('${') || 'استخدم القالب النصي `...${}`'"}]}},quiz:[{q:`أي تعريف سيسبب خطأ عند التنفيذ؟`,options:[`let a = 1; a = 2`,`const b = 1; b = 2`,`let c`],answer:1,explain:`لا يمكن إعادة إسناد const.`},{q:"ما قيمة متغير عُرّف بـ `let x` بلا قيمة؟",options:[`null`,`0`,`undefined`],answer:2,explain:`undefined تعني لم تُعطَ قيمة بعد.`},{q:'ناتج `typeof "5"`:',options:[`"number"`,`"string"`],answer:1,explain:`علامات الاقتباس تجعلها نصًا ولو كان محتواها رقمًا.`}],refs:[{title:`MDN: Storing the information you need — Variables`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Variables`},{title:`MDN: Template literals`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals`}]},{id:`js-03`,title:`الدوال: مدخلات ومخرجات`,summary:`كيف تعرّف دالة وتستدعيها، والفرق الجوهري بين return وconsole.log، والدوال السهمية.`,minutes:25,objectives:[`تعرّف دالة بمعاملات وتستدعيها بوسائط`,`تفهم أن return تُعيد قيمة للبرنامج`,`تكتب دوال سهمية مختصرة`],blocks:[{type:`p`,text:`الدالة **آلة صغيرة**: تعطيها مدخلات، تعمل عليها، وتُرجع مخرجًا. تكتبها مرة وتستخدمها مرات.`},{type:`code`,lang:`js`,code:`function area(width, height) {
  return width * height
}

const room = area(4, 5)
console.log(room)`,notes:[{lines:[1],text:"تعريف دالة اسمها `area` لها **معاملان**: `width` و`height` — أسماء محلية تنتظر قيمًا."},{lines:[2],text:"`return` تنهي الدالة وتُعيد الناتج **إلى مكان الاستدعاء**."},{lines:[5],text:"**الاستدعاء** `area(4, 5)`: القيمتان 4 و5 (الوسائط) تُنسخان إلى width وheight، يُنفَّذ الجسم، وتحل النتيجة 20 محل الاستدعاء فتُخزَّن في room."}]},{type:`why`,text:"الفرق الأهم للمبتدئين: `console.log` **يعرض** قيمة لك أنت، و`return` **يعطي** القيمة للبرنامج. دالة تطبع النتيجة بدل إرجاعها لا يمكن استخدام ناتجها في حساب آخر: `area(2,3) + 1` سيعطي NaN إن كانت area تطبع فقط."},{type:`try`,mode:`js`,code:`function printArea(w, h) { console.log(w * h) }
function area(w, h) { return w * h }

const a = printArea(2, 3)
const b = area(2, 3)
console.log("a =", a, "| b =", b)`},{type:`h`,text:`الدوال السهمية`},{type:`code`,lang:`js`,code:"const double = (n) => n * 2\nconst greet = (name) => `أهلًا ${name}`",notes:[{lines:[1],text:"صيغة مختصرة: المعاملات ثم `=>` ثم الناتج. عندما يكون الجسم تعبيرًا واحدًا بلا `{}` يُرجع تلقائيًا دون كتابة return."}]},{type:`tip`,text:`افتح «محاكي التنفيذ» وشغّل مثالًا فيه دالة: سترى إطار الدالة يُبنى عند الاستدعاء بمعاملاتها، ثم يُزال عند return حاملًا القيمة.`}],exercise:{kind:`js`,prompt:'اكتب دالتين: `area(width, height)` تُرجع مساحة المستطيل، و`greet(name)` تُرجع النص `أهلًا، ` متبوعًا بالاسم (مثال: `greet("سارة")` تُرجع `"أهلًا، سارة"`). يجب أن **تُرجعا** القيم لا أن تطبعاها.',starter:`function area(width, height) {
  // 
}

function greet(name) {
  // 
}
`,solution:`function area(width, height) {
  return width * height
}

function greet(name) {
  return \`أهلًا، \${name}\`
}`,hints:["تذكّر `return` — بدونها تُرجع الدالة undefined.",`انتبه للفاصلة العربية «،» والمسافة بعدها.`],spec:{exports:[`area`,`greet`],cases:[{call:`area`,args:[4,5],expect:20},{call:`area`,args:[3,0],expect:0},{call:`area`,args:[2.5,4],expect:10},{call:`greet`,args:[`سارة`],expect:`أهلًا، سارة`},{call:`greet`,args:[`Ali`],expect:`أهلًا، Ali`}]}},quiz:[{q:`ماذا تُرجع دالة ليس فيها return؟`,options:[`0`,`undefined`,`آخر قيمة حُسبت`],answer:1,explain:`بدون return تُرجع الدالة undefined.`},{q:"في `function f(a) {}` ثم `f(5)`، ما هو `a`؟",options:[`وسيط`,`معامل`,`دالة`],answer:1,explain:`a معامل (في التعريف)، و5 وسيط (القيمة عند الاستدعاء).`},{q:"ما ناتج `const s = (x) => x + 1; s(s(1))`؟",options:[`2`,`3`,`خطأ`],answer:1,explain:`s(1) = 2 ثم s(2) = 3. الاستدعاء الداخلي يُنفَّذ أولًا.`}],refs:[{title:`MDN: Functions`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Functions`},{title:`MDN: Function return values`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Return_values`}]},{id:`js-04`,title:`الشروط والمقارنات`,summary:`if وelse if وelse، والمقارنة الصارمة ===، والعوامل المنطقية، والقيم الصادقة والكاذبة.`,minutes:25,objectives:[`تكتب سلسلة شروط تُفحص بالترتيب`,`تستخدم === بدل ==`,`تجمع الشروط بـ && و||`],blocks:[{type:`p`,text:`الشرط يجعل البرنامج **يقرر**: نفّذ هذا إن تحقق كذا، وإلا نفّذ ذاك.`},{type:`code`,lang:`js`,code:`function shipping(total, isMember) {
  if (total >= 200 || isMember) {
    return 0
  } else if (total >= 100) {
    return 10
  } else {
    return 25
  }
}`,notes:[{lines:[2],text:"`||` تعني «أو»: يكفي تحقق أحد الشرطين. و`&&` تعني «و»: يجب تحققهما معًا."},{lines:[2,4,6],text:`الشروط تُفحص **بالترتيب**، وأول شرط صحيح فقط يُنفَّذ. لذلك ترتيب الحدود (200 قبل 100) مهم.`},{lines:[3],text:"`return` تنهي الدالة فورًا، فلا تُفحص الشروط التالية."}]},{type:`h`,text:`المساواة الصارمة`},{type:`p`,text:'استخدم `===` دائمًا: تقارن القيمة **والنوع**. أما `==` فتحوّل الأنواع قبل المقارنة فتعطي نتائج غريبة مثل `0 == ""` صحيح.'},{type:`try`,mode:`js`,code:`console.log(5 === "5", 5 == "5")
console.log(0 == "", 0 === "")

const age = 17
if (age >= 18) {
  console.log("بالغ")
} else {
  console.log("قاصر")
}`},{type:`why`,text:'القيم «الكاذبة» (falsy) ست فقط: `false` و`0` و`""` و`null` و`undefined` و`NaN`. كل ما عداها «صادق» حتى `"0"` و`[]`. لذلك `if (name)` تعني عمليًا «إن لم يكن name فارغًا».'}],exercise:{kind:`js`,prompt:'اكتب دالة `grade(score)` تُرجع: `"ممتاز"` إذا كانت الدرجة 90 فأكثر، و`"جيد"` من 70 إلى أقل من 90، و`"مقبول"` من 50 إلى أقل من 70، و`"راسب"` لأقل من 50. وإذا كانت الدرجة أكبر من 100 أو أقل من 0 تُرجع `"درجة غير صالحة"`.',starter:`function grade(score) {
  
}
`,solution:`function grade(score) {
  if (score < 0 || score > 100) return "درجة غير صالحة"
  if (score >= 90) return "ممتاز"
  if (score >= 70) return "جيد"
  if (score >= 50) return "مقبول"
  return "راسب"
}`,hints:[`افحص الحالة غير الصالحة أولًا.`,`رتّب الشروط من الأعلى للأدنى: 90 ثم 70 ثم 50.`,`انتبه لحدود القيم: 90 بالضبط «ممتاز»، و89 «جيد».`],spec:{exports:[`grade`],cases:[{call:`grade`,args:[95],expect:`ممتاز`},{call:`grade`,args:[90],expect:`ممتاز`},{call:`grade`,args:[89],expect:`جيد`},{call:`grade`,args:[70],expect:`جيد`},{call:`grade`,args:[69.5],expect:`مقبول`},{call:`grade`,args:[50],expect:`مقبول`},{call:`grade`,args:[0],expect:`راسب`},{call:`grade`,args:[101],expect:`درجة غير صالحة`},{call:`grade`,args:[-5],expect:`درجة غير صالحة`}]}},quiz:[{q:"`true && false || true` يساوي:",options:[`true`,`false`],answer:0,explain:`&& أولًا: true && false = false، ثم false || true = true.`},{q:`أي قيمة «صادقة»؟`,options:[`0`,`""`,`"0"`],answer:2,explain:`النص "0" غير فارغ، لذلك صادق.`},{q:`لماذا يُفضل === على ==؟`,options:[`أسرع`,`لا تحوّل الأنواع فتكون النتيجة متوقعة`,`تعمل مع النصوص فقط`],answer:1,explain:`التحويل الضمني في == مصدر أخطاء خفية.`}],refs:[{title:`MDN: Making decisions in your code — conditionals`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/conditionals`},{title:`MDN: Equality comparisons`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness`}]},{id:`js-05`,title:`المصفوفات والحلقات`,summary:`تخزين قوائم القيم، والمرور عليها بـ for وfor...of، وتجنّب الحلقات اللانهائية.`,minutes:30,objectives:[`تنشئ مصفوفة وتصل لعناصرها بالفهرس`,`تمر على العناصر بالحلقات`,`تبني نتيجة تراكمية داخل حلقة`],blocks:[{type:`p`,text:`المصفوفة قائمة مرتبة من القيم. ترقيمها (الفهرس) يبدأ من **صفر**.`},{type:`code`,lang:`js`,code:`const scores = [70, 85, 92]
console.log(scores[0])
console.log(scores.length)
scores.push(60)`,notes:[{lines:[2],text:`العنصر الأول فهرسه 0 → 70.`},{lines:[3],text:"`length` عدد العناصر: 3. لذلك آخر فهرس هو `length - 1`."},{lines:[4],text:"`push` تضيف في النهاية وتعدّل المصفوفة نفسها (لاحظ أنها const ويمكن تعديل محتواها)."}]},{type:`h`,text:`الحلقات`},{type:`code`,lang:`js`,code:`let sum = 0
for (const s of scores) {
  sum += s
}

for (let i = 0; i < scores.length; i++) {
  console.log(i, scores[i])
}`,notes:[{lines:[1,4],text:`نمط **المُجمِّع**: متغير يبدأ بقيمة ابتدائية ويتحدث في كل دورة.`},{lines:[2],text:"`for...of` الأبسط عندما تحتاج القيم فقط."},{lines:[6],text:"`for` الكلاسيكية: تهيئة؛ شرط يُفحص قبل كل دورة؛ تحديث بعد كل دورة. استخدمها عندما تحتاج الفهرس."}]},{type:`try`,mode:`js`,code:`const nums = [3, 8, 2, 7]
let max = nums[0]
for (const n of nums) {
  if (n > max) max = n
}
console.log("الأكبر:", max)`},{type:`warn`,text:`إذا لم يصبح شرط الحلقة false أبدًا، فلن تنتهي وستجمّد الصفحة. في هذه المنصة يوقف المشغّل الكود تلقائيًا بعد عدد كبير من الخطوات ويخبرك.`},{type:`why`,text:"لماذا يبدأ الفهرس من صفر؟ الفهرس يعني «كم خطوة من البداية»: العنصر الأول على بعد 0 خطوات. لهذا الشرط المعتاد `i < arr.length` وليس `<=`، فالأخير يتجاوز آخر عنصر ويقرأ undefined."},{type:`tip`,text:"شغّل مثال «أكبر عدد» في مختبر JavaScript وتابع المتغيرين `n` و`max` يتغيران في كل دورة عبر «تاريخ المتغير»."}],exercise:{kind:`js`,prompt:"اكتب دالتين: `sumEven(nums)` تُرجع مجموع الأعداد **الزوجية** فقط في المصفوفة (مصفوفة فارغة → 0)، و`countdown(n)` تُرجع مصفوفة تنازلية من n إلى 1 (مثال: `countdown(3)` → `[3, 2, 1]`، و`countdown(0)` → `[]`).",starter:`function sumEven(nums) {
  
}

function countdown(n) {
  
}
`,solution:`function sumEven(nums) {
  let sum = 0
  for (const x of nums) {
    if (x % 2 === 0) sum += x
  }
  return sum
}

function countdown(n) {
  const out = []
  for (let i = n; i >= 1; i--) out.push(i)
  return out
}`,hints:["العدد زوجي إذا كان `x % 2 === 0`.","لـ countdown: ابدأ بمصفوفة فارغة واستخدم `push` في حلقة تبدأ من n وتنقص."],spec:{exports:[`sumEven`,`countdown`],cases:[{call:`sumEven`,args:[[1,2,3,4]],expect:6},{call:`sumEven`,args:[[]],expect:0},{call:`sumEven`,args:[[7,9]],expect:0},{call:`sumEven`,args:[[-2,10,5]],expect:8},{call:`countdown`,args:[3],expect:[3,2,1]},{call:`countdown`,args:[1],expect:[1]},{call:`countdown`,args:[0],expect:[]}]}},quiz:[{q:"`const a = [5, 6, 7]` — ما قيمة `a[a.length - 1]`؟",options:[`undefined`,`7`,`3`],answer:1,explain:`length = 3، والفهرس 2 هو العنصر الأخير.`},{q:"كم مرة تدور `for (let i = 0; i < 5; i++)`؟",options:[`4`,`5`,`6`],answer:1,explain:`i = 0, 1, 2, 3, 4.`},{q:"ما ناتج `[1, 2, 3][3]`؟",options:[`3`,`خطأ`,`undefined`],answer:2,explain:`فهرس غير موجود يعطي undefined لا خطأ.`}],refs:[{title:`MDN: Arrays`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Arrays`},{title:`MDN: Looping code`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Looping_code`}]},{id:`js-06`,title:`الكائنات: بيانات لها أسماء`,summary:`المفتاح والقيمة، والوصول بالنقطة والأقواس، والمراجع: لماذا تغيير «نسخة» يغيّر الأصل.`,minutes:30,objectives:[`تنشئ كائنًا وتقرأ خصائصه وتعدّلها`,`تفهم أن الكائنات تُنسخ بالمرجع`,`تنشئ كائنًا جديدًا بدل تعديل الأصل`],blocks:[{type:`p`,text:`المصفوفة تخزن قيمًا **بالترتيب**، والكائن يخزنها **بالأسماء**. مثالي لوصف شيء واحد له صفات.`},{type:`code`,lang:`js`,code:`const user = { name: "نور", age: 22, skills: ["HTML"] }
console.log(user.name)
user.age = 23
user.city = "عمّان"
const key = "age"
console.log(user[key])`,notes:[{lines:[1],text:`كائن بثلاث خصائص. القيمة يمكن أن تكون أي شيء، حتى مصفوفة.`},{lines:[2],text:`الوصول بالنقطة.`},{lines:[3,4],text:`تعديل خاصية موجودة أو إضافة خاصية جديدة.`},{lines:[5,6],text:"الأقواس `[ ]` عندما يكون اسم الخاصية في متغير."}]},{type:`h`,text:`المراجع: أهم فكرة في هذا الدرس`},{type:`code`,lang:`js`,code:`const a = { n: 1 }
const b = a
b.n = 99
console.log(a.n) // 99!`,notes:[{lines:[2],text:"`b = a` لا ينسخ الكائن؛ بل ينسخ **المرجع** إليه. الآن المتغيران يشيران إلى الكائن نفسه."},{lines:[3,4],text:`لذلك التعديل عبر b يظهر عبر a.`}]},{type:`try`,mode:`js`,code:`const a = { n: 1 }
const b = a
const c = { ...a }
b.n = 99
console.log(a.n, b.n, c.n)`},{type:`why`,text:"افتح هذا المثال في «محاكي التنفيذ»: سترى في خريطة الذاكرة سهمين من a وb إلى **صندوق واحد**، وسهمًا من c إلى صندوق آخر. صيغة النشر `{ ...a }` تنشئ كائنًا جديدًا بنسخة (سطحية) من الخصائص."},{type:`tip`,text:`في Vue وكثير من التطبيقات نفضّل إنشاء كائن جديد بدل تعديل الأصل عندما نريد تغييرًا «آمنًا» لا يفاجئ أجزاء أخرى من البرنامج.`}],exercise:{kind:`js`,prompt:'اكتب دالتين: `describe(product)` تُرجع نصًا بالصيغة `"قلم — 5 ريال"` من خاصيتي `name` و`price`. و`withTag(product, tag)` تُرجع **كائنًا جديدًا** فيه كل خصائص المنتج ومصفوفة `tags` جديدة مضافًا لها الوسم، **دون تعديل** المنتج الأصلي أو مصفوفته.',starter:`function describe(product) {
  
}

function withTag(product, tag) {
  
}
`,solution:`function describe(product) {
  return \`\${product.name} — \${product.price} ريال\`
}

function withTag(product, tag) {
  return { ...product, tags: [...product.tags, tag] }
}`,hints:[`الفاصل في describe هو « — » (شرطة طويلة بمسافتين).`,"لنسخ الكائن: `{ ...product }`، ولنسخ المصفوفة مع إضافة: `[...product.tags, tag]`."],spec:{exports:[`describe`,`withTag`],cases:[{call:`describe`,args:[{name:`قلم`,price:5}],expect:`قلم — 5 ريال`},{call:`describe`,args:[{name:`دفتر`,price:12.5}],expect:`دفتر — 12.5 ريال`},{call:`withTag`,args:[{name:`كوب`,price:20,tags:[`مطبخ`]},`هدية`],expect:{name:`كوب`,price:20,tags:[`مطبخ`,`هدية`]}}],checks:[{title:`withTag لا تعدّل الكائن الأصلي ولا مصفوفته`,check:`({ exports }) => { const p = { name: 'x', price: 1, tags: ['a'] }; const r = exports.withTag(p, 'b'); return p.tags.length === 1 && r !== p && r.tags !== p.tags || 'الأصل تغيّر أو أُعيد الكائن نفسه' }`}]}},quiz:[{q:"`const o = {}; o.x = 1` — هل هذا خطأ لأن o ثابت؟",options:[`نعم`,`لا، const تمنع إعادة الإسناد لا تعديل المحتوى`],answer:1,explain:`المتغير ما زال يشير إلى الكائن نفسه.`},{q:"بعد `const a = [1]; const b = a; b.push(2)` قيمة a:",options:[`[1]`,`[1, 2]`],answer:1,explain:`a وb مرجعان للمصفوفة نفسها.`},{q:"متى نستخدم `obj[key]` بدل `obj.key`؟",options:[`دائمًا`,`عندما يكون اسم الخاصية في متغير أو فيه مسافات`,`أبدًا`],answer:1,explain:`obj.key تبحث حرفيًا عن خاصية اسمها "key".`}],refs:[{title:`MDN: JavaScript object basics`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics`},{title:`MDN: Spread syntax`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax`}]},{id:`js-07`,title:`طرق المصفوفات: map وfilter وreduce`,summary:`تحويل وتصفية واختزال البيانات بأسلوب واضح دون حلقات يدوية، وتمرير الدوال كقيم.`,minutes:30,objectives:[`تحوّل كل عنصر بـ map`,`تصفّي بـ filter`,`تختزل إلى قيمة بـ reduce وتسلسل الطرق معًا`],blocks:[{type:`p`,text:`في JavaScript الدوال **قيم**: يمكن تمريرها لدوال أخرى. طرق المصفوفات تستقبل دالة (callback) وتستدعيها لكل عنصر.`},{type:`code`,lang:`js`,code:`const cart = [
  { name: "قلم", price: 5, qty: 3 },
  { name: "دفتر", price: 12, qty: 1 },
]
const lines = cart.map((item) => item.price * item.qty)
const cheap = cart.filter((item) => item.price < 10)
const total = lines.reduce((sum, x) => sum + x, 0)`,notes:[{lines:[5],text:"`map` → مصفوفة **بنفس الطول**، كل عنصر هو ما أرجعته الدالة: `[15, 12]`."},{lines:[6],text:"`filter` → مصفوفة بالعناصر التي أرجعت لها الدالة قيمة صادقة."},{lines:[7],text:"`reduce` → قيمة واحدة. `sum` المُجمِّع يبدأ من 0 (الوسيط الثاني)، وفي كل خطوة يصبح ما تُرجعه الدالة: 0 → 15 → 27."}]},{type:`why`,text:"لماذا هذه أفضل من for؟ ليست أسرع، لكنها **تُعلن النية**: قارئ `filter` يعرف فورًا أن الناتج مجموعة جزئية. ولأنها لا تعدّل المصفوفة الأصلية، تقل الآثار الجانبية المفاجئة."},{type:`try`,mode:`js`,code:`const users = [
  { name: "علي", age: 17 },
  { name: "هدى", age: 25 },
  { name: "سامي", age: 31 },
]
const adults = users
  .filter((u) => u.age >= 18)
  .map((u) => u.name)
console.log(adults)`},{type:`warn`,text:"خطأ شائع: نسيان return داخل دالة بأقواس معقوفة: `arr.map((x) => { x * 2 })` يُرجع `[undefined, ...]`. إما احذف الأقواس أو اكتب return."}],exercise:{kind:`js`,prompt:"اكتب `cartTotal(items)` تُرجع إجمالي سلة (مجموع price × qty لكل عنصر)، و`adultNames(users)` تُرجع مصفوفة أسماء من أعمارهم 18 فأكثر بالترتيب نفسه. استخدم طرق المصفوفات (map/filter/reduce) لا حلقات for.",starter:`function cartTotal(items) {
  
}

function adultNames(users) {
  
}
`,solution:`function cartTotal(items) {
  return items.reduce((sum, it) => sum + it.price * it.qty, 0)
}

function adultNames(users) {
  return users.filter((u) => u.age >= 18).map((u) => u.name)
}`,hints:[`reduce مع قيمة ابتدائية 0 لتعمل مع السلة الفارغة.`,`filter ثم map بالتسلسل.`],spec:{exports:[`cartTotal`,`adultNames`],cases:[{call:`cartTotal`,args:[[{price:5,qty:3},{price:12,qty:1}]],expect:27},{call:`cartTotal`,args:[[]],expect:0},{call:`cartTotal`,args:[[{price:2.5,qty:2}]],expect:5},{call:`adultNames`,args:[[{name:`علي`,age:17},{name:`هدى`,age:25},{name:`سامي`,age:18}]],expect:[`هدى`,`سامي`]},{call:`adultNames`,args:[[]],expect:[]}],checks:[{title:`بدون حلقات for/while`,check:`({ source }) => !/\\b(for|while)\\s*\\(/.test(source) || 'استخدم طرق المصفوفات بدل الحلقات'`},{title:`لا تعديل للمصفوفة الأصلية`,check:`({ exports }) => { const u = [{ name: 'أ', age: 30 }]; const before = JSON.stringify(u); exports.adultNames(u); return JSON.stringify(u) === before }`}]}},quiz:[{q:"`[1, 2, 3].map((x) => x * 10)` يُرجع:",options:[`60`,`[10, 20, 30]`,`[1, 2, 3]`],answer:1,explain:`map تحوّل كل عنصر وتُرجع مصفوفة بالطول نفسه.`},{q:"`[4, 7, 9].filter((x) => x > 5).length`:",options:[`1`,`2`,`3`],answer:1,explain:`filter تُبقي 7 و9 فقط (الأكبر من 5)، فطول الناتج 2.`},{q:`لماذا نمرر 0 كوسيط ثانٍ لـ reduce في الجمع؟`,options:[`للزينة`,`ليبدأ المُجمِّع من 0 ويعمل مع المصفوفة الفارغة`,`لتحديد عدد العناصر`],answer:1,explain:`بدونه يُستخدم أول عنصر كبداية، وتفشل reduce مع مصفوفة فارغة.`}],refs:[{title:`MDN: Array.prototype.map`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map`},{title:`MDN: Array.prototype.reduce`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce`}]},{id:`js-08`,title:`DOM والأحداث: صفحات تتفاعل`,summary:`البحث عن العناصر، وتغيير محتواها وأصنافها، والاستماع للنقر والكتابة والإرسال.`,minutes:35,objectives:[`تجد عنصرًا بـ querySelector`,`تغيّر النص والأصناف`,`تستمع للأحداث وتحدّث الحالة والواجهة`],blocks:[{type:`p`,text:`المتصفح يحوّل HTML إلى شجرة كائنات (DOM). JavaScript تستطيع قراءة هذه الكائنات وتعديلها، فتتغير الصفحة فورًا.`},{type:`code`,lang:`js`,code:`const btn = document.querySelector("#like")
const out = document.querySelector("#count")
let likes = 0

btn.addEventListener("click", () => {
  likes++
  out.textContent = likes
  btn.classList.toggle("active", likes > 0)
})`,notes:[{lines:[1,2],text:"`querySelector` يقبل أي محدد CSS ويُرجع أول عنصر مطابق، أو `null` إن لم يجد."},{lines:[3],text:`**الحالة**: متغير يحفظ البيانات. الواجهة تعكس الحالة.`},{lines:[5],text:`نسجّل دالة تُستدعى **عند كل نقرة** — لا تُنفَّذ الآن. لاحظ أننا نمرر الدالة نفسها.`},{lines:[6,8],text:"عند النقر: نحدّث الحالة ثم نحدّث الواجهة لتطابقها. `classList.toggle(name, force)` يضيف الصنف إن كان الشرط صادقًا ويحذفه إن كان كاذبًا."}]},{type:`warn`,text:`إذا وُضع السكربت في head قبل العناصر فإن querySelector سيُرجع null، والسطر التالي سيرمي خطأ «Cannot read properties of null». ضع السكربت في نهاية body أو استخدم defer.`},{type:`try`,mode:`web`,files:{html:`<button id="like">إعجاب ♥</button>
<p>عدد الإعجابات: <span id="count">0</span></p>`,css:`#like { padding: 8px 14px; border-radius: 8px; border: 1px solid #ccc; }
#like.active { background: #fecdd3; border-color: #e11d48; }`,js:`const btn = document.querySelector("#like")
const out = document.querySelector("#count")
let likes = 0

btn.addEventListener("click", () => {
  likes++
  out.textContent = likes
  btn.classList.toggle("active", likes > 0)
})`}},{type:`why`,text:`لماذا textContent وليس innerHTML لعرض النصوص؟ innerHTML يفسّر النص كـ HTML، فإن كان النص من المستخدم قد يحقن كودًا ضارًا (XSS). textContent يعرضه كنص حرفي دائمًا.`},{type:`h`,text:`أحداث شائعة`},{type:`list`,items:["`click` النقر","`input` كل تغيير في حقل (لكل حرف)","`submit` إرسال نموذج — استدعِ `event.preventDefault()` لمنع إعادة التحميل","`keydown` ضغط مفتاح، و`event.key` اسمه"]}],exercise:{kind:`dom`,prompt:"اصنع عدادًا: عند النقر على `#inc` يزيد الرقم في `#count` بواحد، وعند النقر على `#dec` ينقص بواحد **لكن لا ينزل تحت الصفر**، وعند النقر على `#reset` يعود إلى 0. أضف الصنف `zero` إلى `#count` عندما تكون القيمة 0 واحذفه غير ذلك.",editable:[`js`],readonly:[`html`,`css`],starter:{html:`<p>العدد: <strong id="count" class="zero">0</strong></p>
<button id="dec">−</button>
<button id="inc">+</button>
<button id="reset">تصفير</button>`,css:`#count.zero { color: #94a3b8; }`,js:`const countEl = document.querySelector("#count")
let count = 0

// أكمل الكود
`},solution:{js:`const countEl = document.querySelector("#count")
let count = 0

function render() {
  countEl.textContent = count
  countEl.classList.toggle("zero", count === 0)
}

document.querySelector("#inc").addEventListener("click", () => { count++; render() })
document.querySelector("#dec").addEventListener("click", () => { if (count > 0) count--; render() })
document.querySelector("#reset").addEventListener("click", () => { count = 0; render() })`},hints:["اكتب دالة `render()` واحدة تحدّث النص والصنف من قيمة count، واستدعها بعد كل تغيير.",'`classList.toggle("zero", count === 0)`.'],checks:[{title:`النقر على + يزيد العدد`,test:`async ({ click, text }) => { await click('#inc'); await click('#inc'); return text('#count') === '2' || 'بعد نقرتين: ' + text('#count') }`},{title:`النقر على − ينقص العدد`,test:`async ({ click, text }) => { await click('#dec'); return text('#count') === '1' || 'القيمة: ' + text('#count') }`},{title:`لا ينزل تحت الصفر`,test:`async ({ click, text }) => { await click('#dec'); await click('#dec'); await click('#dec'); return text('#count') === '0' || 'القيمة: ' + text('#count') }`},{title:`الصنف zero عند الصفر فقط`,test:`async ({ $, click }) => { const a = $('#count').classList.contains('zero'); await click('#inc'); const b = !$('#count').classList.contains('zero'); return a && b }`},{title:`زر التصفير يعيد 0`,test:`async ({ click, text, $ }) => { await click('#inc'); await click('#inc'); await click('#reset'); return text('#count') === '0' && $('#count').classList.contains('zero') }`}]},quiz:[{q:`ماذا يُرجع querySelector إن لم يجد العنصر؟`,options:[`undefined`,`null`,`مصفوفة فارغة`],answer:1,explain:`null، ولهذا تظهر رسالة «Cannot read properties of null».`},{q:'`btn.addEventListener("click", save())` — المشكلة:',options:[`لا مشكلة`,`save تُستدعى فورًا ويُمرَّر ناتجها بدل الدالة`,`"click" يجب أن تكون "onclick"`],answer:1,explain:`مرر الدالة نفسها: save بدون أقواس.`},{q:`لعرض اسم كتبه المستخدم بأمان:`,options:[`innerHTML`,`textContent`],answer:1,explain:`textContent لا يفسّر HTML.`}],refs:[{title:`MDN: Manipulating documents`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents`},{title:`MDN: Introduction to events`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events`}]},{id:`js-09`,title:`البرمجة غير المتزامنة وحلقة الأحداث`,summary:`setTimeout والوعود وasync/await — ولماذا يُطبع «2» قبل «1» أحيانًا.`,minutes:35,objectives:[`تفهم ترتيب تنفيذ الكود المتزامن والمؤقتات والوعود`,`تستخدم async/await مع try/catch`,`تتعامل مع الوعود المرفوضة`],blocks:[{type:`p`,text:`JavaScript تنفّذ شيئًا واحدًا في كل لحظة (خيط واحد). لكن بعض العمليات تأخذ وقتًا (مؤقت، طلب شبكة). بدل أن تنتظر وتجمّد الصفحة، **تجدولها** وتكمل.`},{type:`code`,lang:`js`,code:`console.log("1")
setTimeout(() => console.log("4"), 0)
Promise.resolve().then(() => console.log("3"))
console.log("2")`,notes:[{lines:[1,4],text:`الكود **المتزامن** يُنفَّذ أولًا كاملًا: 1 ثم 2.`},{lines:[3],text:`ردود الوعود **مهام دقيقة** (microtasks): تُنفَّذ فور انتهاء الكود المتزامن.`},{lines:[2],text:`المؤقت **مهمة** (task) في طابور آخر: تُنفَّذ بعد المهام الدقيقة، حتى لو كانت المدة 0.`}]},{type:`tip`,text:`هذا المثال هو أفضل ما يُشغَّل في «محاكي التنفيذ»: سترى المسارات الثلاثة (مكدس الاستدعاءات، طابور المهام، المهام الدقيقة) والقطع تتحرك بينها.`},{type:`h`,text:`async / await`},{type:`code`,lang:`js`,code:`async function loadUser(id) {
  try {
    const user = await fakeFetch(id)
    return user.name
  } catch (err) {
    return "غير موجود"
  }
}`,notes:[{lines:[1],text:"الدالة `async` تُرجع **دائمًا** وعدًا (Promise)."},{lines:[3],text:"`await` توقف **هذه الدالة فقط** حتى يستقر الوعد، ثم تُرجع قيمته. باقي البرنامج يستمر أثناء الانتظار."},{lines:[5,7],text:"إذا رُفض الوعد، `await` ترمي الخطأ فيلتقطه catch."}]},{type:`try`,mode:`js`,code:`const wait = (ms) => new Promise((r) => setTimeout(r, ms))

async function demo() {
  console.log("قبل الانتظار")
  await wait(500)
  console.log("بعد 500ms")
}
demo()
console.log("هذا يُطبع قبل «بعد 500ms»")`},{type:`why`,text:`لماذا لا تنتظر JavaScript ببساطة؟ لأن نفس الخيط يرسم الصفحة ويستجيب للنقر. لو انتظر طلب شبكة لمدة ثانيتين لتجمّدت الواجهة كليًا. الجدولة تبقي الصفحة حية.`},{type:`warn`,text:`ملاحظة دقة: المؤقتات في مختبرات المنصة تعمل بساعة افتراضية حتمية (لا تنتظر الوقت الحقيقي) لتسهيل الفهم، لكن **الترتيب** يطابق المتصفح الحقيقي.`}],exercise:{kind:`js`,prompt:'الدالة `fakeFetch(id)` جاهزة: تُرجع وعدًا يُنجَز بعد 100ms بكائن `{ name }` للمعرّفين 1 و2، ويُرفض لغيرهما. اكتب دالة `async` اسمها `loadUser(id)` تُرجع اسم المستخدم **بأحرف كبيرة** (`toUpperCase`)، وإذا رُفض الوعد تُرجع `"غير موجود"`.',starter:`function fakeFetch(id) {
  const db = { 1: { name: "ali" }, 2: { name: "mona" } }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (db[id]) resolve(db[id])
      else reject(new Error("not found"))
    }, 100)
  })
}

async function loadUser(id) {
  // أكمل هنا
}
`,solution:`function fakeFetch(id) {
  const db = { 1: { name: "ali" }, 2: { name: "mona" } }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (db[id]) resolve(db[id])
      else reject(new Error("not found"))
    }, 100)
  })
}

async function loadUser(id) {
  try {
    const user = await fakeFetch(id)
    return user.name.toUpperCase()
  } catch (err) {
    return "غير موجود"
  }
}`,hints:["`const user = await fakeFetch(id)`.",`غلّف الانتظار بـ try/catch.`],spec:{exports:[`loadUser`],cases:[{call:`loadUser`,args:[1],expect:`ALI`},{call:`loadUser`,args:[2],expect:`MONA`},{call:`loadUser`,args:[99],expect:`غير موجود`}],checks:[{title:`loadUser تُرجع وعدًا (async)`,check:`({ exports }) => { const r = exports.loadUser(1); return !!r && typeof r.then === 'function' }`}]}},quiz:[{q:'ترتيب الطباعة: `setTimeout(() => log("A"), 0); Promise.resolve().then(() => log("B")); log("C")`',options:[`A B C`,`C B A`,`C A B`],answer:1,explain:`المتزامن (C) ثم المهام الدقيقة (B) ثم المؤقت (A).`},{q:`ماذا تُرجع أي دالة async؟`,options:[`القيمة مباشرة`,`Promise دائمًا`,`undefined`],answer:1,explain:"حتى `return 5` داخل async تصبح Promise تُنجَز بـ 5."},{q:"`await` توقف:",options:[`البرنامج كله`,`الدالة async الحالية فقط`],answer:1,explain:`باقي البرنامج يستمر في العمل.`}],refs:[{title:`MDN: Introducing asynchronous JavaScript`,url:`https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing`},{title:`MDN: The event loop`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop`},{title:`MDN: async function`,url:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function`}]}]},{key:`vue`,label:`Vue 3`,title:`الواجهات التفاعلية`,blurb:`واجهات تتحدّث تلقائيًا من البيانات.`,color:`var(--c-vue)`,lessons:[{id:`vue-01`,title:`لماذا Vue؟ التفاعلية في سطر`,summary:`من تحديث DOM يدويًا إلى وصف الواجهة كدالة للحالة: ref والقوالب و{{ }}.`,minutes:25,objectives:[`تفهم المشكلة التي يحلها Vue`,`تعرّف حالة تفاعلية بـ ref`,`تعرض الحالة في القالب وتغيّرها بحدث`],blocks:[{type:`p`,text:`في درس DOM كتبنا: «غيّر المتغير، ثم تذكّر أن تحدّث النص، ثم الصنف...». كلما كبر التطبيق زادت الأماكن التي قد ننسى تحديثها. Vue يقلب الفكرة: **أنت تصف كيف تبدو الواجهة بدلالة البيانات**، وهو يحدّثها تلقائيًا عند تغيّر البيانات.`},{type:`code`,lang:`vue`,code:`<script setup>
import { ref } from "vue"

const count = ref(0)
<\/script>

<template>
  <button @click="count++">
    نقرت {{ count }} مرة
  </button>
</template>`,notes:[{lines:[1,5],text:"`<script setup>` منطق المكوّن. كل ما يُعرَّف هنا متاح في القالب مباشرة."},{lines:[2],text:"نستورد `ref` من مكتبة Vue."},{lines:[4],text:"`ref(0)` ينشئ **حالة تفاعلية** قيمتها الابتدائية 0. Vue «يراقب» قراءتها وكتابتها."},{lines:[7,11],text:"`<template>` يصف الواجهة."},{lines:[8],text:"`@click` يربط حدث النقر بتعبير. `count++` يغيّر الحالة."},{lines:[9],text:"`{{ count }}` يعرض القيمة. عند تغيّرها يعيد Vue عرض هذا الجزء تلقائيًا — لم نكتب أي كود لتحديث النص!"}]},{type:`why`,text:"لماذا نكتب `count` في القالب لكن `count.value` في JavaScript؟ ref كائن صغير يغلّف القيمة ليتمكن Vue من تتبّعها. في القالب يفكّه Vue تلقائيًا، أما في السكربت فنصل للقيمة عبر `.value`."},{type:`try`,mode:`vue`,code:`<script setup>
import { ref } from "vue"
const name = ref("زائر")
const count = ref(0)
function reset() { count.value = 0 }
<\/script>

<template>
  <h2>مرحبًا {{ name }}</h2>
  <button @click="count++">نقرت {{ count }} مرة</button>
  <button @click="reset">تصفير</button>
</template>`},{type:`tip`,text:"الملف بامتداد `.vue` يسمى **مكوّنًا أحادي الملف** (SFC): قالب + منطق + تنسيق معًا. يحتاج إلى ترجمة قبل أن يفهمه المتصفح؛ المنصة تترجمه داخل متصفحك بالمترجم الرسمي من Vue."}],exercise:{kind:`vue`,prompt:"أنشئ حالة `likes` تبدأ من 0. اعرضها داخل عنصر معرّفه `count`. عند النقر على زر معرّفه `like` تزيد بواحد. وعند النقر على زر معرّفه `reset` تعود إلى 0 عبر دالة اسمها `reset` في السكربت.",starter:`<script setup>
import { ref } from "vue"

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref } from "vue"
const likes = ref(0)
function reset() {
  likes.value = 0
}
<\/script>

<template>
  <p>الإعجابات: <strong id="count">{{ likes }}</strong></p>
  <button id="like" @click="likes++">إعجاب</button>
  <button id="reset" @click="reset">تصفير</button>
</template>
`,hints:["`const likes = ref(0)`.","داخل دالة reset اكتب `likes.value = 0` (مع .value لأننا في JavaScript)."],checks:[{title:`العداد يبدأ من 0`,test:`({ text }) => text('#count') === '0' || 'القيمة: ' + text('#count')`},{title:`النقر على like يزيد العداد`,test:`async ({ click, text }) => { await click('#like'); await click('#like'); await click('#like'); return text('#count') === '3' || 'بعد 3 نقرات: ' + text('#count') }`},{title:`reset يعيده إلى 0`,test:`async ({ click, text }) => { await click('#reset'); return text('#count') === '0' }`},{title:`يستخدم ref ودالة reset في السكربت`,test:`({ files }) => /ref\\(\\s*0\\s*\\)/.test(files.vue || '') && /function\\s+reset|const\\s+reset\\s*=/.test(files.vue || '') || 'نحتاج ref(0) ودالة اسمها reset'`}]},quiz:[{q:"كيف تقرأ قيمة `const n = ref(5)` داخل `<script setup>`؟",options:[`n`,`n.value`,`{{ n }}`],answer:1,explain:`في JavaScript نصل للقيمة عبر .value، وفي القالب يفكّها Vue.`},{q:"ماذا يحدث للنص `{{ n }}` عند تنفيذ `n.value++`؟",options:[`لا شيء حتى نحدّثه يدويًا`,`يتحدّث تلقائيًا`],answer:1,explain:`هذه هي التفاعلية: Vue يعيد العرض عند تغيّر البيانات المستخدمة.`},{q:'ما الذي يقابل `addEventListener("click", ...)` في قالب Vue؟',options:[`:click`,`@click`,`v-model`],answer:1,explain:`@click اختصار v-on:click.`}],refs:[{title:`Vue: Introduction`,url:`https://vuejs.org/guide/introduction.html`},{title:`Vue: Reactivity Fundamentals`,url:`https://vuejs.org/guide/essentials/reactivity-fundamentals.html`}]},{id:`vue-02`,title:`ربط السمات والأحداث`,summary:`v-bind (:) لجعل السمات ديناميكية، وربط class وstyle بالحالة، وv-on (@) ومعدِّلاته.`,minutes:25,objectives:[`تربط سمة بتعبير بـ :`,`تضيف أصنافًا شرطيًا بـ :class`,`تستخدم معدِّلات الأحداث`],blocks:[{type:`p`,text:'السمة العادية `src="a.png"` قيمتها نص ثابت. مع `:` قبلها تصبح **تعبير JavaScript** يُحسب من الحالة ويتحدّث تلقائيًا.'},{type:`code`,lang:`vue`,code:`<script setup>
import { ref } from "vue"
const open = ref(false)
const size = ref(16)
<\/script>

<template>
  <button :aria-expanded="open" @click="open = !open">القائمة</button>
  <nav :class="{ visible: open }" :style="{ fontSize: size + 'px' }">…</nav>
</template>`,notes:[{lines:[8],text:'`:aria-expanded="open"` قيمة السمة تتبع الحالة. `@click="open = !open"` يقلب القيمة المنطقية.'},{lines:[9],text:'`:class="{ visible: open }"` كائن: مفتاحه اسم الصنف، وقيمته شرط. الصنف يُضاف فقط عندما يكون open صادقًا.'},{lines:[9],text:"`:style` يقبل كائن خصائص CSS بأسماء camelCase."}]},{type:`h`,text:`معدِّلات الأحداث`},{type:`list`,items:["`@submit.prevent` يستدعي preventDefault تلقائيًا.","`@keyup.enter` فقط عند مفتاح Enter.","`@click.once` مرة واحدة فقط."]},{type:`try`,mode:`vue`,code:`<script setup>
import { ref } from "vue"
const dark = ref(false)
<\/script>

<template>
  <div :class="['box', { dark }]">
    <p>الوضع: {{ dark ? "داكن" : "فاتح" }}</p>
    <button @click="dark = !dark">بدّل</button>
  </div>
</template>

<style scoped>
.box { padding: 16px; border-radius: 12px; background: #f1f5f9; transition: background 200ms; }
.box.dark { background: #0f172a; color: white; }
</style>`},{type:`why`,text:"لاحظ `{ dark }` في المثال: اختصار JavaScript لـ `{ dark: dark }`. وماذا يحدث للصنف الثابت `box`؟ Vue يدمج `class` الثابت مع `:class` الديناميكي."}],exercise:{kind:`vue`,prompt:"أنشئ زرًا معرّفه `toggle` وعنصرًا `div` بالصنف `panel`. النقر على الزر يبدّل ظهور اللوحة: عند الفتح يُضاف للوحة الصنف `open`، ويتغير نص الزر من **إظهار** إلى **إخفاء**، وسمة الزر `aria-expanded` تعكس الحالة (`true`/`false`).",starter:`<script setup>
import { ref } from "vue"

<\/script>

<template>
  
</template>

<style scoped>
.panel { display: none; padding: 12px; background: #e0f2fe; }
.panel.open { display: block; }
</style>
`,solution:`<script setup>
import { ref } from "vue"
const open = ref(false)
<\/script>

<template>
  <button id="toggle" :aria-expanded="open" @click="open = !open">{{ open ? "إخفاء" : "إظهار" }}</button>
  <div class="panel" :class="{ open }">محتوى اللوحة</div>
</template>

<style scoped>
.panel { display: none; padding: 12px; background: #e0f2fe; }
.panel.open { display: block; }
</style>
`,hints:["حالة واحدة `open` تكفي، وكل شيء آخر يُشتق منها.",'نص الزر: `{{ open ? "إخفاء" : "إظهار" }}`.'],checks:[{title:`مغلقة في البداية`,test:`({ $, text }) => !$('.panel').classList.contains('open') && text('#toggle') === 'إظهار' && $('#toggle').getAttribute('aria-expanded') === 'false'`},{title:`النقر يفتح اللوحة ويغيّر النص والسمة`,test:`async ({ $, click, text, css }) => { await click('#toggle'); return $('.panel').classList.contains('open') && text('#toggle') === 'إخفاء' && $('#toggle').getAttribute('aria-expanded') === 'true' && css('.panel', 'display') === 'block' }`},{title:`النقر مرة أخرى يغلقها`,test:`async ({ $, click, text }) => { await click('#toggle'); return !$('.panel').classList.contains('open') && text('#toggle') === 'إظهار' }`},{title:`الصنف panel الثابت باقٍ دائمًا`,test:`({ $ }) => $('.panel') !== null`}]},quiz:[{q:'الفرق بين `src="url"` و`:src="url"`:',options:[`لا فرق`,`الأولى النص "url" حرفيًا، والثانية قيمة المتغير url`,`الثانية خطأ`],answer:1,explain:`النقطتان تعنيان: قيّم ما بين علامات الاقتباس كتعبير JavaScript.`},{q:'`:class="{ active: isActive }"` يضيف الصنف active عندما:',options:[`دائمًا`,`isActive صادقة`],answer:1,explain:`القيمة في الكائن شرط الإضافة.`},{q:`لمنع إعادة تحميل الصفحة عند إرسال نموذج في Vue:`,options:[`@submit.prevent`,`@submit.stop`,`:submit`],answer:0,explain:`.prevent يستدعي event.preventDefault().`}],refs:[{title:`Vue: Template Syntax`,url:`https://vuejs.org/guide/essentials/template-syntax.html`},{title:`Vue: Class and Style Bindings`,url:`https://vuejs.org/guide/essentials/class-and-style.html`},{title:`Vue: Event Handling`,url:`https://vuejs.org/guide/essentials/event-handling.html`}]},{id:`vue-03`,title:`العرض الشرطي والقوائم`,summary:`v-if وv-else وv-show، وv-for مع :key، وكيف يعيد Vue استخدام العناصر.`,minutes:30,objectives:[`تعرض عناصر شرطيًا`,`تكرر عنصرًا لكل عنصر في مصفوفة`,`تفهم لماذا :key ضروري`],blocks:[{type:`code`,lang:`vue`,code:`<script setup>
import { ref } from "vue"
const tasks = ref([
  { id: 1, text: "مراجعة الدرس" },
  { id: 2, text: "حل التمرين" },
])
<\/script>

<template>
  <p v-if="tasks.length === 0">لا مهام 🎉</p>
  <ul v-else>
    <li v-for="task in tasks" :key="task.id">{{ task.text }}</li>
  </ul>
</template>`,notes:[{lines:[3,6],text:`ref يمكن أن يحمل مصفوفة كائنات. تعديلها (push، splice…) تفاعلي أيضًا.`},{lines:[10],text:"`v-if`: العنصر **يُنشأ أو يُزال** من DOM حسب الشرط."},{lines:[11],text:"`v-else` يجب أن يلي عنصر v-if مباشرة."},{lines:[12],text:'`v-for="task in tasks"` يكرر li لكل مهمة. `:key` معرّف فريد مستقر لكل عنصر.'}]},{type:`why`,text:`لماذا :key؟ عندما تتغير القائمة يحاول Vue **إعادة استخدام** عناصر DOM الموجودة بدل إنشائها من جديد (لأن ذلك أسرع). بدون مفتاح يطابقها بالموقع، فلو حذفت العنصر الأول قد «تنتقل» حالة عنصر (مثل نص في حقل) إلى العنصر الخطأ. المفتاح يخبره بهوية كل عنصر.`},{type:`h`,text:`v-show مقابل v-if`},{type:`p`,text:"`v-show` يخفي العنصر بـ `display: none` ويبقيه في DOM — أنسب لما يتبدّل كثيرًا. `v-if` يزيله فعلًا — أنسب لما نادرًا ما يتغير، ولا يكلّف شيئًا عندما يكون false."},{type:`try`,mode:`vue`,code:`<script setup>
import { ref } from "vue"
const fruits = ref(["تفاح", "موز", "عنب"])
function removeFirst() { fruits.value.shift() }
<\/script>

<template>
  <ol>
    <li v-for="(f, i) in fruits" :key="f">{{ i + 1 }}. {{ f }}</li>
  </ol>
  <p v-if="!fruits.length">انتهت الفواكه</p>
  <button @click="removeFirst" :disabled="!fruits.length">احذف الأول</button>
</template>`},{type:`warn`,text:"لا تضع v-if وv-for على العنصر نفسه. في Vue 3 يُقيَّم v-if أولًا فلا يرى متغير التكرار. صفِّ القائمة بـ computed (الدرس الخامس) أو غلّف بـ `<template>`."}],exercise:{kind:`vue`,prompt:"لديك مصفوفة مهام. اعرضها في `ul` بحيث يكون لكل مهمة `li` يحمل `:key`. إذا كانت القائمة فارغة اعرض فقرة بالصنف `empty` بدل `ul`. أضف زرًا معرّفه `clear` يفرّغ القائمة، وزرًا معرّفه `remove-first` يحذف أول مهمة.",starter:`<script setup>
import { ref } from "vue"
const tasks = ref([
  { id: 1, text: "قراءة" },
  { id: 2, text: "كتابة" },
  { id: 3, text: "تمرين" },
])
<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref } from "vue"
const tasks = ref([
  { id: 1, text: "قراءة" },
  { id: 2, text: "كتابة" },
  { id: 3, text: "تمرين" },
])
<\/script>

<template>
  <p v-if="tasks.length === 0" class="empty">لا توجد مهام</p>
  <ul v-else>
    <li v-for="t in tasks" :key="t.id">{{ t.text }}</li>
  </ul>
  <button id="remove-first" @click="tasks.shift()">احذف الأولى</button>
  <button id="clear" @click="tasks = []">تفريغ</button>
</template>
`,hints:['`v-if="tasks.length === 0"` على الفقرة و`v-else` على ul.',"في القالب يمكنك كتابة `tasks = []` مباشرة لأن Vue يفكّ ref."],checks:[{title:`تُعرض 3 مهام بالنصوص الصحيحة`,test:`({ $$ }) => { const li = $$('ul li').map((x) => x.textContent.trim()); return li.join('|') === 'قراءة|كتابة|تمرين' || 'العناصر: ' + li.join('، ') }`},{title:`لا تظهر فقرة empty والقائمة غير فارغة`,test:`({ $ }) => !$('.empty')`},{title:`remove-first يحذف الأولى`,test:`async ({ click, $$ }) => { await click('#remove-first'); return $$('ul li').map((x) => x.textContent.trim()).join('|') === 'كتابة|تمرين' }`},{title:`clear يفرّغ ويظهر .empty بدل ul`,test:`async ({ click, $ }) => { await click('#clear'); return !!$('.empty') && !$('ul') }`},{title:`v-for يستخدم :key`,test:`({ files }) => /v-for=[^>]*:key=|:key=[^>]*v-for=/.test(files.vue || '') || 'أضف :key على عنصر v-for'`}]},quiz:[{q:'عنصر عليه `v-show="false"`:',options:[`غير موجود في DOM`,`موجود في DOM مع display: none`],answer:1,explain:`v-show يغيّر display فقط.`},{q:`أفضل قيمة لـ :key:`,options:[`الفهرس دائمًا`,`معرّف فريد مستقر مثل id`,`Math.random()`],answer:1,explain:`العشوائي يتغير كل عرض فيعيد إنشاء كل العناصر، والفهرس يتغير عند الحذف والترتيب.`},{q:"`v-else` يعمل إذا:",options:[`كان في أي مكان بعد v-if`,`جاء مباشرة بعد عنصر v-if أو v-else-if`],answer:1,explain:`يجب أن يكونا عنصرين متجاورين.`}],refs:[{title:`Vue: Conditional Rendering`,url:`https://vuejs.org/guide/essentials/conditional.html`},{title:`Vue: List Rendering`,url:`https://vuejs.org/guide/essentials/list.html`}]},{id:`vue-04`,title:`النماذج وv-model`,summary:`الربط ثنائي الاتجاه بين الحقول والحالة، ومعدِّلات trim وnumber، وبناء قائمة مهام.`,minutes:30,objectives:[`تربط حقلًا بحالة بـ v-model`,`تتعامل مع إرسال النموذج`,`تتحقق من المدخلات قبل إضافتها`],blocks:[{type:`p`,text:"`v-model` اختصار لشيئين معًا: ربط قيمة الحقل بالحالة (`:value`)، وتحديث الحالة عند كل إدخال (`@input`)."},{type:`code`,lang:`vue`,code:`<script setup>
import { ref } from "vue"
const draft = ref("")
const items = ref([])
let nextId = 1
function add() {
  if (!draft.value) return
  items.value.push({ id: nextId++, text: draft.value })
  draft.value = ""
}
<\/script>

<template>
  <form @submit.prevent="add">
    <input v-model.trim="draft" placeholder="مهمة جديدة">
    <button>إضافة</button>
  </form>
</template>`,notes:[{lines:[3],text:`الحالة التي يمثلها الحقل.`},{lines:[7],text:"لا نضيف نصًا فارغًا. بفضل `.trim` المسافات وحدها تُعد فارغة."},{lines:[9],text:`تفريغ الحالة يفرّغ الحقل تلقائيًا — هذا هو «ثنائي الاتجاه».`},{lines:[14],text:"`@submit.prevent` يعمل مع Enter والزر معًا، ويمنع إعادة التحميل."},{lines:[15],text:"`v-model.trim` يحذف المسافات من الطرفين قبل التخزين. `.number` يحوّل إلى عدد."}]},{type:`try`,mode:`vue`,code:`<script setup>
import { ref } from "vue"
const name = ref("")
const agree = ref(false)
const level = ref("مبتدئ")
<\/script>

<template>
  <input v-model.trim="name" placeholder="اسمك">
  <label><input type="checkbox" v-model="agree"> أوافق</label>
  <select v-model="level"><option>مبتدئ</option><option>متوسط</option></select>
  <pre>{{ { name, agree, level } }}</pre>
</template>`},{type:`why`,text:`لماذا نستخدم form مع submit بدل زر بـ @click؟ لأن النموذج يعطيك مجانًا: الإرسال بمفتاح Enter، ودعم قارئات الشاشة، والتحقق المدمج مثل required.`}],exercise:{kind:`vue`,prompt:"ابنِ قائمة مهام: حقل معرّفه `new` مربوط بـ v-model (مع trim)، ونموذج يضيف المهمة عند الإرسال إلى قائمة `ul` (كل مهمة `li`)، ثم يفرّغ الحقل. تجاهل النص الفارغ أو المسافات فقط. واعرض عدد المهام في عنصر معرّفه `total`.",starter:`<script setup>
import { ref } from "vue"

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref } from "vue"
const draft = ref("")
const todos = ref([])
let id = 0
function add() {
  if (!draft.value) return
  todos.value.push({ id: ++id, text: draft.value })
  draft.value = ""
}
<\/script>

<template>
  <form @submit.prevent="add">
    <label for="new">مهمة</label>
    <input id="new" v-model.trim="draft">
    <button type="submit">إضافة</button>
  </form>
  <p>العدد: <span id="total">{{ todos.length }}</span></p>
  <ul>
    <li v-for="t in todos" :key="t.id">{{ t.text }}</li>
  </ul>
</template>
`,hints:['`<form @submit.prevent="add">` مع زر type="submit".',"في add: تحقق من `draft.value` ثم push ثم فرّغ."],checks:[{title:`إضافة مهمة عبر النموذج`,test:`async ({ input, submit, $$ }) => { await input('#new', '  مراجعة  '); await submit('form'); const li = $$('ul li').map((x) => x.textContent.trim()); return li.length === 1 && li[0] === 'مراجعة' || 'العناصر: ' + li.join('، ') }`},{title:`الحقل يُفرَّغ بعد الإضافة`,test:`({ $ }) => $('#new').value === ''`},{title:`تجاهل المدخل الفارغ والمسافات`,test:`async ({ input, submit, $$ }) => { await input('#new', '   '); await submit('form'); return $$('ul li').length === 1 }`},{title:`العدد يتحدّث`,test:`async ({ input, submit, text }) => { await input('#new', 'تمرين'); await submit('form'); return text('#total') === '2' || 'العدد: ' + text('#total') }`}]},quiz:[{q:"`v-model` على input يكافئ تقريبًا:",options:[`:value + @input`,`:value فقط`,`@click`],answer:0,explain:`ربط القيمة + الاستماع للتغيير.`},{q:'مع `v-model.number="age"` وكتابة "21":',options:[`age = "21"`,`age = 21`],answer:1,explain:`.number يحوّل إلى عدد.`},{q:'بعد `draft.value = ""` الحقل المربوط:',options:[`يبقى فيه النص`,`يُفرَّغ تلقائيًا`],answer:1,explain:`الربط في الاتجاهين.`}],refs:[{title:`Vue: Form Input Bindings`,url:`https://vuejs.org/guide/essentials/forms.html`}]},{id:`vue-05`,title:`القيم المحسوبة والمراقبة`,summary:`computed للقيم المشتقة، وwatch للتأثيرات الجانبية كالحفظ — ومتى تختار كلًا منهما.`,minutes:30,objectives:[`تشتق قيمًا بـ computed`,`تفرّق بين computed وwatch`,`تحفظ الحالة تلقائيًا بـ watch`],blocks:[{type:`code`,lang:`vue`,code:`<script setup>
import { ref, computed, watch } from "vue"
const items = ref([{ name: "قلم", price: 5, qty: 2 }])
const query = ref("")

const total = computed(() =>
  items.value.reduce((s, i) => s + i.price * i.qty, 0)
)
const visible = computed(() =>
  items.value.filter((i) => i.name.includes(query.value))
)

watch(items, (val) => {
  console.log("تغيّرت السلة", val.length)
}, { deep: true })
<\/script>`,notes:[{lines:[6,8],text:"`computed` قيمة **مشتقة**: تُحسب من حالات أخرى، وتُعاد حسابها تلقائيًا فقط عندما تتغير مصادرها (وتُخزَّن مؤقتًا بين القراءات)."},{lines:[9,11],text:`نمط شائع: قائمة مُصفّاة محسوبة بدل v-if داخل v-for.`},{lines:[13,15],text:"`watch` **ينفّذ فعلًا** عند التغير (طباعة، حفظ، طلب شبكة). `deep: true` لمراقبة التغييرات داخل المصفوفة وكائناتها."}]},{type:`why`,text:`القاعدة: إن كنت تريد **قيمة** فاستخدم computed. إن كنت تريد **فعل شيء** عند التغير فاستخدم watch. خطأ شائع: استخدام watch لتحديث ref آخر — هذا عمل computed وأبسط منه وأقل عرضة للأخطاء.`},{type:`try`,mode:`vue`,code:`<script setup>
import { ref, computed } from "vue"
const first = ref("سارة")
const last = ref("أحمد")
const full = computed(() => \`\${first.value} \${last.value}\`.trim())
<\/script>

<template>
  <input v-model="first"> <input v-model="last">
  <p>الاسم الكامل: <strong>{{ full }}</strong></p>
</template>`},{type:`tip`,text:`دالة computed يجب أن تكون «نقية»: تحسب وتُرجع فقط، دون تعديل حالة أخرى أو طلبات شبكة.`}],exercise:{kind:`vue`,prompt:"لديك سلة منتجات. اعرض الإجمالي (مجموع price × qty) في عنصر معرّفه `total` باستخدام **computed**. أضف حقل بحث معرّفه `search` يصفّي المنتجات المعروضة (كل منتج في `li`) حسب الاسم عبر computed أيضًا. أزرار `.plus` داخل كل li تزيد كمية المنتج.",starter:`<script setup>
import { ref, computed } from "vue"
const items = ref([
  { id: 1, name: "قلم", price: 5, qty: 2 },
  { id: 2, name: "دفتر", price: 12, qty: 1 },
  { id: 3, name: "قلم رصاص", price: 3, qty: 4 },
])

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref, computed } from "vue"
const items = ref([
  { id: 1, name: "قلم", price: 5, qty: 2 },
  { id: 2, name: "دفتر", price: 12, qty: 1 },
  { id: 3, name: "قلم رصاص", price: 3, qty: 4 },
])
const query = ref("")
const total = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))
const visible = computed(() => items.value.filter((i) => i.name.includes(query.value.trim())))
<\/script>

<template>
  <input id="search" v-model="query" placeholder="ابحث">
  <ul>
    <li v-for="i in visible" :key="i.id">
      {{ i.name }} × {{ i.qty }}
      <button class="plus" @click="i.qty++">+</button>
    </li>
  </ul>
  <p>الإجمالي: <strong id="total">{{ total }}</strong></p>
</template>
`,hints:["`const total = computed(() => items.value.reduce(...))`.","التصفية: `items.value.filter((i) => i.name.includes(query.value))`."],checks:[{title:`الإجمالي الابتدائي 34`,test:`({ text }) => text('#total') === '34' || 'الإجمالي: ' + text('#total')`},{title:`زر + يزيد الكمية والإجمالي`,test:`async ({ $$, click, text }) => { await click($$('li .plus')[1]); return text('#total') === '46' || 'بعد زيادة الدفتر: ' + text('#total') }`},{title:`البحث يصفّي القائمة`,test:`async ({ input, $$ }) => { await input('#search', 'قلم'); const n = $$('ul li').length; await input('#search', 'دفتر'); const m = $$('ul li').length; await input('#search', ''); return n === 2 && m === 1 && $$('ul li').length === 3 || [n, m].join(',') }`},{title:`الإجمالي لا يتأثر بالبحث`,test:`async ({ input, text }) => { await input('#search', 'دفتر'); const t = text('#total'); await input('#search', ''); return t === '46' }`},{title:`استخدام computed`,test:`({ files }) => ((files.vue || '').match(/computed\\(/g) || []).length >= 2 || 'نحتاج computed للإجمالي وللتصفية'`}]},quiz:[{q:`لعرض عدد المهام المكتملة الأنسب:`,options:[`watch يحدّث ref`,`computed`,`دالة تُستدعى في created`],answer:1,explain:`قيمة مشتقة → computed.`},{q:`لحفظ السلة في localStorage عند كل تغيير:`,options:[`computed`,`watch`],answer:1,explain:`الحفظ فعل (تأثير جانبي) → watch.`},{q:`متى تُعاد حسابات computed؟`,options:[`كل ثانية`,`عند كل عرض`,`عندما تتغير المصادر التفاعلية التي تقرؤها`],answer:2,explain:`وتُخزَّن نتيجتها بين القراءات.`}],refs:[{title:`Vue: Computed Properties`,url:`https://vuejs.org/guide/essentials/computed.html`},{title:`Vue: Watchers`,url:`https://vuejs.org/guide/essentials/watchers.html`}]},{id:`vue-06`,title:`المكوّنات: props وemits`,summary:`تقسيم الواجهة إلى مكوّنات، وتمرير البيانات للأسفل بـ props، وإبلاغ الأب بالأحداث للأعلى بـ emits.`,minutes:35,objectives:[`تعرّف مكوّنًا يستقبل props`,`تطلق حدثًا مخصصًا من الابن`,`تفهم التدفق أحادي الاتجاه للبيانات`],blocks:[{type:`p`,text:`التطبيقات الحقيقية تُبنى من مكوّنات صغيرة متكررة. القاعدة الذهبية: **البيانات تنزل** من الأب للابن عبر props، و**الأحداث تصعد** من الابن للأب عبر emits.`},{type:`code`,lang:`vue`,code:`<!-- TodoItem.vue -->
<script setup>
const props = defineProps({ text: String, done: Boolean })
const emit = defineEmits(["toggle", "remove"])
<\/script>

<template>
  <li :class="{ done }">
    <span @click="emit('toggle')">{{ text }}</span>
    <button @click="emit('remove')">حذف</button>
  </li>
</template>`,notes:[{lines:[3],text:"`defineProps` يعرّف ما يستقبله المكوّن. props **للقراءة فقط** داخل الابن."},{lines:[4],text:"`defineEmits` يعرّف الأحداث التي قد يطلقها."},{lines:[9,10],text:`الابن لا يحذف نفسه ولا يعدّل البيانات؛ يخبر الأب «حدث كذا» والأب يقرر.`}]},{type:`code`,lang:`vue`,code:`<!-- App.vue (الأب) -->
<TodoItem
  v-for="t in todos" :key="t.id"
  :text="t.text" :done="t.done"
  @toggle="t.done = !t.done"
  @remove="todos = todos.filter((x) => x.id !== t.id)"
/>`,notes:[{lines:[4],text:`تمرير البيانات للأسفل.`},{lines:[5,6],text:`الاستماع لأحداث الابن وتعديل الحالة **في الأب** حيث تعيش.`}]},{type:`why`,text:`لماذا لا يعدّل الابن props مباشرة؟ لأن البيانات حينها قد تتغير من أماكن كثيرة فيصعب معرفة من غيّرها. مع التدفق أحادي الاتجاه، كل تغيير يحدث في مكان واحد معروف: مالك البيانات.`},{type:`warn`,text:"ملاحظة عن بيئة المنصة: المحرر يدعم ملف `.vue` واحدًا، لذلك نعرّف المكوّن الابن هنا ككائن خيارات داخل الملف نفسه مع `template` نصي (تترجمه نسخة Vue الكاملة وقت التشغيل). في مشروع حقيقي مع Vite يكون كل مكوّن في ملف `.vue` خاص به كما في المثال أعلاه، والمفاهيم متطابقة."},{type:`try`,mode:`vue`,code:`<script setup>
import { ref } from "vue"

const Badge = {
  props: { label: String, count: Number },
  emits: ["reset"],
  template: \`<span class="badge">{{ label }}: {{ count }} <button @click="$emit('reset')">×</button></span>\`,
}

const n = ref(3)
<\/script>

<template>
  <Badge label="الإشعارات" :count="n" @reset="n = 0" />
  <button @click="n++">+1</button>
</template>

<style>
.badge { background: #fef3c7; padding: 4px 10px; border-radius: 99px; }
</style>`}],exercise:{kind:`vue`,prompt:"عرّف مكوّنًا ابنًا `TodoItem` (ككائن خيارات بقالب نصي) يستقبل prop اسمه `text` ويعرض `li` فيه النص وزر بالصنف `remove`. النقر على الزر **يطلق حدث** `remove` (لا يحذف بنفسه). في الأب اعرض قائمة المهام باستخدام TodoItem، واحذف المهمة عند استقبال الحدث.",starter:`<script setup>
import { ref } from "vue"

const TodoItem = {
  // props و emits و template
}

const todos = ref([
  { id: 1, text: "أ" },
  { id: 2, text: "ب" },
  { id: 3, text: "ج" },
])
<\/script>

<template>
  <ul>
    
  </ul>
</template>
`,solution:`<script setup>
import { ref } from "vue"

const TodoItem = {
  props: { text: String },
  emits: ["remove"],
  template: \`<li><span class="text">{{ text }}</span> <button class="remove" @click="$emit('remove')">حذف</button></li>\`,
}

const todos = ref([
  { id: 1, text: "أ" },
  { id: 2, text: "ب" },
  { id: 3, text: "ج" },
])
function remove(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
<\/script>

<template>
  <ul>
    <TodoItem v-for="t in todos" :key="t.id" :text="t.text" @remove="remove(t.id)" />
  </ul>
</template>
`,hints:["في الابن: `props: { text: String }` و`emits: [\"remove\"]`، وفي القالب `$emit('remove')`.",'في الأب: `@remove="remove(t.id)"` ودالة remove تصفّي المصفوفة.'],checks:[{title:`تُعرض 3 عناصر li بالنصوص`,test:`({ $$ }) => $$('ul li').length === 3 && $$('ul li')[1].textContent.includes('ب')`},{title:`حذف العنصر الأوسط`,test:`async ({ $$, click }) => { await click($$('ul li .remove')[1]); const t = $$('ul li').map((l) => l.textContent); return t.length === 2 && t[0].includes('أ') && t[1].includes('ج') || t.join('|') }`},{title:`الابن يطلق حدثًا ولا يعدّل البيانات بنفسه`,test:`({ files }) => /emits\\s*:/.test(files.vue || '') && /\\$emit\\(\\s*['"]remove/.test(files.vue || '') || 'عرّف emits واستخدم $emit(\\'remove\\')'`},{title:`الابن يستقبل text كـ prop`,test:`({ files }) => /props\\s*:/.test(files.vue || '') && /:text=/.test(files.vue || '')`}]},quiz:[{q:`كيف يغيّر الابن بيانات يملكها الأب؟`,options:[`يعدّل props مباشرة`,`يطلق حدثًا والأب يعدّل`,`لا يمكن`],answer:1,explain:`التدفق أحادي الاتجاه: الأحداث للأعلى، البيانات للأسفل.`},{q:'`<Child :count="n" />` — ماذا يستقبل الابن؟',options:[`النص "n"`,`قيمة n الحالية وتتحدّث معها`],answer:1,explain:`النقطتان تجعلان القيمة تعبيرًا تفاعليًا.`},{q:"أين يُستمع لحدث `remove` يطلقه الابن؟",options:[`في الابن`,`على وسم المكوّن في قالب الأب: @remove`],answer:1,explain:`الأب يستمع للحدث كما يستمع لأي حدث DOM.`}],refs:[{title:`Vue: Components Basics`,url:`https://vuejs.org/guide/essentials/component-basics.html`},{title:`Vue: Props`,url:`https://vuejs.org/guide/components/props.html`},{title:`Vue: Component Events`,url:`https://vuejs.org/guide/components/events.html`}]}]}];for(let e of pa)e.lessons.forEach((t,n)=>{t.track=e.key,t.order=n+1});var ma=pa.flatMap(e=>e.lessons),ha=Object.fromEntries(ma.map(e=>[e.id,e]));function ga(e){let t=ma.findIndex(t=>t.id===e);return t>=0&&ma[t+1]||null}function _a(e){let t=ma.findIndex(t=>t.id===e);return t>0?ma[t-1]:null}var va=(e,t)=>`quiz:${e}:${t}`,ya=e=>`term:${e}`,J=e=>`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${e}`,ba=e=>`https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/${e}`,xa=[{id:`html-element`,term:`Element`,say:`element`,pron:`إليمِنت`,tech:`html`,cat:`مفهوم`,ar:`عنصر`,meaning:`وحدة البناء الأساسية في صفحة HTML.`,explain:`العنصر يتكوّن غالبًا من وسم افتتاحي ومحتوى ووسم إغلاق. المتصفح يحوّل كل عنصر إلى عقدة في شجرة DOM يمكن تنسيقها بـ CSS والتحكم بها بـ JavaScript.`,syntax:`<tag attribute="value">المحتوى</tag>`,example:`<p class="note">هذه فقرة</p>`,related:[`html-tag`,`html-attribute`,`js-dom`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Element`},{id:`html-tag`,term:`Tag`,say:`tag`,pron:`تاغ`,tech:`html`,cat:`مفهوم`,ar:`وسم`,meaning:`الكلمة المحاطة بالقوسين < > التي تحدد بداية العنصر أو نهايته.`,explain:`الوسم الافتتاحي مثل <p> يبدأ العنصر، ووسم الإغلاق مثل </p> ينهيه. بعض العناصر «فارغة» ليس لها إغلاق مثل <img> و<br> و<input>.`,syntax:`<p> … </p>`,example:`<strong>مهم</strong>
<br>`,related:[`html-element`,`html-void`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Tag`},{id:`html-attribute`,term:`Attribute`,say:`attribute`,pron:`أتريبيوت`,tech:`html`,cat:`مفهوم`,ar:`سمة`,meaning:`معلومة إضافية تُكتب داخل الوسم الافتتاحي على شكل اسم="قيمة".`,explain:`السمات تغيّر سلوك العنصر أو تصفه: href تحدد وجهة الرابط، وsrc مصدر الصورة، وclass تصنيفًا للتنسيق. بعض السمات منطقية (boolean) يكفي وجودها مثل disabled.`,syntax:`<tag name="value">`,example:`<input type="email" required>`,related:[`html-class`,`html-id`],ref:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes`},{id:`html-void`,term:`Void element`,say:`void element`,pron:`فويد إليمِنت`,tech:`html`,cat:`مفهوم`,ar:`عنصر فارغ`,meaning:`عنصر لا يمكن أن يحتوي على محتوى وليس له وسم إغلاق.`,explain:`أمثلة: img وbr وhr وinput وmeta وlink. كتابة الشرطة المائلة في النهاية مثل <br /> مسموحة لكنها غير ضرورية في HTML.`,syntax:`<img src="a.png" alt="وصف">`,example:`<hr>
<input type="text">`,related:[`html-tag`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Void_element`},{id:`html-doctype`,term:`<!DOCTYPE html>`,say:`doctype`,pron:`دوك تايب`,tech:`html`,cat:`تصريح`,ar:`تصريح نوع المستند`,meaning:`السطر الأول في المستند، يطلب من المتصفح استخدام الوضع القياسي الحديث.`,explain:`بدونه قد يدخل المتصفح «وضع التوافق» (quirks mode) فيحسب بعض الأبعاد بطريقة قديمة. ليس وسمًا ولا يُغلق.`,syntax:`<!DOCTYPE html>`,example:`<!DOCTYPE html>
<html lang="ar" dir="rtl">
  ...
</html>`,related:[`html-html`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Doctype`},{id:`html-html`,term:`<html>`,say:`html`,pron:`إتش تي إم إل`,tech:`html`,cat:`عنصر هيكلي`,ar:`جذر المستند`,meaning:`العنصر الجذري الذي يحتوي كل عناصر الصفحة.`,explain:`يحتوي على عنصرين فقط: head وbody. السمة lang تحدد لغة المحتوى (مهمة لقارئات الشاشة ومحركات البحث)، وdir="rtl" تجعل الاتجاه من اليمين لليسار.`,syntax:`<html lang="ar" dir="rtl">…</html>`,example:`<html lang="ar" dir="rtl">
  <head>…</head>
  <body>…</body>
</html>`,related:[`html-head`,`html-body`],ref:J(`html`)},{id:`html-head`,term:`<head>`,say:`head`,pron:`هِد`,tech:`html`,cat:`عنصر هيكلي`,ar:`رأس المستند`,meaning:`يحتوي معلومات عن الصفحة لا تظهر مباشرة في محتواها.`,explain:`فيه العنوان title، ووسوم meta، وروابط ملفات CSS عبر link، وأحيانًا السكربتات.`,syntax:`<head>…</head>`,example:`<head>
  <meta charset="utf-8">
  <title>صفحتي</title>
</head>`,related:[`html-title`,`html-meta`,`html-link`],ref:J(`head`)},{id:`html-body`,term:`<body>`,say:`body`,pron:`بودي`,tech:`html`,cat:`عنصر هيكلي`,ar:`جسم المستند`,meaning:`يحتوي كل المحتوى المرئي للصفحة.`,explain:`كل ما يراه المستخدم من نصوص وصور وأزرار يوضع داخل body. يوجد body واحد فقط في المستند.`,syntax:`<body>…</body>`,example:`<body>
  <h1>مرحبًا</h1>
</body>`,related:[`html-html`],ref:J(`body`)},{id:`html-title`,term:`<title>`,say:`title`,pron:`تايتل`,tech:`html`,cat:`بيانات وصفية`,ar:`عنوان الصفحة`,meaning:`النص الذي يظهر في تبويب المتصفح ونتائج البحث.`,explain:`يوضع داخل head، ويجب أن يكون وصفيًا وقصيرًا. لا يظهر داخل الصفحة نفسها.`,syntax:`<title>النص</title>`,example:`<title>متجر الكتب — الرئيسية</title>`,related:[`html-head`],ref:J(`title`)},{id:`html-meta`,term:`<meta>`,say:`meta`,pron:`ميتا`,tech:`html`,cat:`بيانات وصفية`,ar:`بيانات وصفية`,meaning:`يعرّف معلومات وصفية مثل ترميز الأحرف وإعدادات العرض على الجوال.`,explain:`meta charset="utf-8" ضروري لعرض العربية بشكل صحيح، وmeta name="viewport" يجعل الصفحة تتكيف مع عرض شاشة الجوال.`,syntax:`<meta name="..." content="...">`,example:`<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">`,related:[`html-head`,`css-media`],ref:J(`meta`)},{id:`html-link`,term:`<link>`,say:`link`,pron:`لينك`,tech:`html`,cat:`بيانات وصفية`,ar:`ربط مورد خارجي`,meaning:`يربط الصفحة بمورد خارجي، وأشهر استخدام له ربط ملف CSS.`,explain:`السمة rel تحدد نوع العلاقة (stylesheet للتنسيق)، وhref مسار الملف. لا تخلط بينه وبين عنصر الرابط <a>.`,syntax:`<link rel="stylesheet" href="style.css">`,example:`<link rel="stylesheet" href="style.css">`,related:[`html-a`,`css-selector`],ref:J(`link`)},{id:`html-h1`,term:`<h1> … <h6>`,say:`heading`,pron:`هيدينغ`,tech:`html`,cat:`نص`,ar:`العناوين`,meaning:`ستة مستويات من العناوين، h1 أهمها وh6 أقلها.`,explain:`تبني العناوين «مخطط» الصفحة الذي تعتمد عليه قارئات الشاشة ومحركات البحث. لا تختر المستوى حسب حجم الخط، بل حسب الترتيب المنطقي، والحجم يُضبط بـ CSS. يُفضّل h1 واحد لكل صفحة.`,syntax:`<h2>عنوان قسم</h2>`,example:`<h1>دليل الطبخ</h1>
<h2>الحلويات</h2>
<h3>الكنافة</h3>`,related:[`html-p`,`html-semantic`],ref:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements`},{id:`html-p`,term:`<p>`,say:`paragraph`,pron:`باراغراف`,tech:`html`,cat:`نص`,ar:`فقرة`,meaning:`يمثل فقرة نصية.`,explain:`المتصفح يضيف هامشًا فوق الفقرة وتحتها افتراضيًا. المسافات والأسطر الجديدة المتعددة داخل الكود تُدمج في مسافة واحدة عند العرض.`,syntax:`<p>نص الفقرة</p>`,example:`<p>HTML هي لغة <strong>هيكلة</strong> المحتوى.</p>`,related:[`html-br`,`html-strong`],ref:J(`p`)},{id:`html-a`,term:`<a>`,say:`anchor`,pron:`آنكر`,tech:`html`,cat:`نص`,ar:`رابط`,meaning:`ينشئ رابطًا إلى صفحة أخرى أو موضع في الصفحة نفسها أو بريد إلكتروني.`,explain:`السمة href هي الوجهة. href="#id" ينقل إلى عنصر في الصفحة نفسها. target="_blank" يفتح تبويبًا جديدًا. نص الرابط يجب أن يصف الوجهة (تجنّب «اضغط هنا»).`,syntax:`<a href="URL">نص الرابط</a>`,example:`<a href="https://developer.mozilla.org">توثيق MDN</a>
<a href="#contact">تواصل معنا</a>`,related:[`html-href`,`html-link`],ref:J(`a`)},{id:`html-href`,term:`href`,say:`h ref`,pron:`إتش رِف`,tech:`html`,cat:`سمة`,ar:`مرجع الارتباط`,meaning:`سمة تحدد عنوان الوجهة في <a> و<link>.`,explain:`يمكن أن يكون عنوانًا مطلقًا (https://...) أو نسبيًا (about.html) أو معرّفًا داخل الصفحة (#section) أو mailto: للبريد.`,syntax:`href="عنوان"`,example:`<a href="about.html">من نحن</a>`,related:[`html-a`],ref:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href`},{id:`html-img`,term:`<img>`,say:`image`,pron:`إيمج`,tech:`html`,cat:`وسائط`,ar:`صورة`,meaning:`يعرض صورة في الصفحة.`,explain:`src مسار الصورة، وalt نص بديل يُقرأ لمن لا يرى الصورة ويظهر إن فشل تحميلها — وهو مطلوب لإتاحة الوصول. إن كانت الصورة زخرفية فقط اكتب alt="". عنصر فارغ بلا إغلاق.`,syntax:`<img src="مسار" alt="وصف">`,example:`<img src="cat.jpg" alt="قطة رمادية نائمة على الأريكة" width="300">`,related:[`html-alt`,`html-void`],ref:J(`img`)},{id:`html-alt`,term:`alt`,say:`alt`,pron:`أولت`,tech:`html`,cat:`سمة`,ar:`النص البديل`,meaning:`وصف نصي للصورة.`,explain:`تستخدمه قارئات الشاشة لوصف الصورة للمكفوفين، ويظهر عند فشل التحميل. صِف محتوى الصورة ومعناها في سياق الصفحة، لا «صورة» فقط.`,syntax:`alt="وصف"`,example:`<img src="chart.png" alt="ارتفاع المبيعات 20% في مارس">`,related:[`html-img`,`html-a11y`],ref:`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#alt`},{id:`html-ul`,term:`<ul>`,say:`unordered list`,pron:`أنأوردرد ليست`,tech:`html`,cat:`قوائم`,ar:`قائمة غير مرتبة`,meaning:`قائمة عناصر لا يهم ترتيبها، تُعرض بنقاط.`,explain:`أبناؤها المباشرون يجب أن يكونوا عناصر <li>. تُستخدم كثيرًا لقوائم التنقل.`,syntax:`<ul><li>…</li></ul>`,example:`<ul>
  <li>حليب</li>
  <li>خبز</li>
</ul>`,related:[`html-ol`,`html-li`],ref:J(`ul`)},{id:`html-ol`,term:`<ol>`,say:`ordered list`,pron:`أوردرد ليست`,tech:`html`,cat:`قوائم`,ar:`قائمة مرتبة`,meaning:`قائمة يهم ترتيب عناصرها، تُعرض بالأرقام.`,explain:`مناسبة للخطوات والترتيب. السمة start تغيّر رقم البداية، وreversed تعكس الترقيم.`,syntax:`<ol><li>…</li></ol>`,example:`<ol>
  <li>اغسل اليدين</li>
  <li>قطّع الخضار</li>
</ol>`,related:[`html-ul`,`html-li`],ref:J(`ol`)},{id:`html-li`,term:`<li>`,say:`list item`,pron:`ليست آيتم`,tech:`html`,cat:`قوائم`,ar:`عنصر قائمة`,meaning:`عنصر واحد داخل قائمة ul أو ol.`,explain:`يمكن أن يحتوي على أي محتوى، بما في ذلك قائمة متداخلة.`,syntax:`<li>نص</li>`,example:`<li>الدرس الأول</li>`,related:[`html-ul`,`html-ol`],ref:J(`li`)},{id:`html-div`,term:`<div>`,say:`div`,pron:`دِف`,tech:`html`,cat:`تجميع`,ar:`حاوية عامة`,meaning:`حاوية كتلية عامة بلا أي معنى دلالي.`,explain:`تُستخدم لتجميع عناصر من أجل التنسيق أو التخطيط. قبل استخدامها اسأل: هل يوجد عنصر دلالي أنسب مثل section أو nav أو article؟`,syntax:`<div class="...">…</div>`,example:`<div class="card">
  <h3>عنوان</h3>
  <p>وصف</p>
</div>`,related:[`html-span`,`html-semantic`],ref:J(`div`)},{id:`html-span`,term:`<span>`,say:`span`,pron:`سبان`,tech:`html`,cat:`تجميع`,ar:`حاوية سطرية`,meaning:`حاوية سطرية عامة لجزء من النص.`,explain:`لا تبدأ سطرًا جديدًا. تُستخدم لتنسيق كلمة أو جزء داخل نص عندما لا يوجد عنصر دلالي مناسب مثل strong أو em.`,syntax:`<span>…</span>`,example:`<p>السعر: <span class="price">25 ريال</span></p>`,related:[`html-div`],ref:J(`span`)},{id:`html-semantic`,term:`Semantic HTML`,say:`semantic HTML`,pron:`سيمانتِك`,tech:`html`,cat:`مفهوم`,ar:`HTML الدلالي`,meaning:`استخدام العنصر الذي يصف معنى المحتوى وليس شكله فقط.`,explain:`مثل header وnav وmain وarticle وfooter وbutton. الفائدة: إتاحة وصول أفضل، وفهم أدق لمحركات البحث، وكود أوضح. زر حقيقي <button> يعمل بلوحة المفاتيح تلقائيًا بعكس div قابل للنقر.`,syntax:`<main>…</main>`,example:`<header>…</header>
<nav>…</nav>
<main>
  <article>…</article>
</main>
<footer>…</footer>`,related:[`html-header`,`html-main`,`html-a11y`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Semantics`},{id:`html-header`,term:`<header>`,say:`header`,pron:`هيدر`,tech:`html`,cat:`دلالي`,ar:`ترويسة`,meaning:`محتوى تمهيدي للصفحة أو للقسم، كالشعار والعنوان والتنقل.`,explain:`يمكن أن يتكرر داخل article أو section. لا تخلط بينه وبين head.`,syntax:`<header>…</header>`,example:`<header>
  <h1>مدونتي</h1>
  <nav>…</nav>
</header>`,related:[`html-footer`,`html-nav`],ref:J(`header`)},{id:`html-nav`,term:`<nav>`,say:`nav`,pron:`ناف`,tech:`html`,cat:`دلالي`,ar:`منطقة التنقل`,meaning:`مجموعة روابط التنقل الرئيسية.`,explain:`قارئات الشاشة تتيح القفز إليها مباشرة. ليست كل مجموعة روابط nav — فقط الرئيسية.`,syntax:`<nav>…</nav>`,example:`<nav>
  <a href="/">الرئيسية</a>
  <a href="/blog">المدونة</a>
</nav>`,related:[`html-header`,`html-a`],ref:J(`nav`)},{id:`html-main`,term:`<main>`,say:`main`,pron:`مَين`,tech:`html`,cat:`دلالي`,ar:`المحتوى الرئيسي`,meaning:`المحتوى الأساسي الفريد في الصفحة.`,explain:`يجب ألا يتكرر ظاهرًا أكثر من مرة في الصفحة، ولا يحتوي على الترويسة أو التذييل المشتركين.`,syntax:`<main>…</main>`,example:`<main>
  <h1>المقالات</h1>
</main>`,related:[`html-semantic`],ref:J(`main`)},{id:`html-section`,term:`<section>`,say:`section`,pron:`سِكشن`,tech:`html`,cat:`دلالي`,ar:`قسم`,meaning:`قسم موضوعي من المحتوى، عادة له عنوان.`,explain:`إن لم يكن للقسم عنوان طبيعي فغالبًا div أنسب.`,syntax:`<section>…</section>`,example:`<section>
  <h2>خدماتنا</h2>
  …
</section>`,related:[`html-article`],ref:J(`section`)},{id:`html-article`,term:`<article>`,say:`article`,pron:`آرتِكل`,tech:`html`,cat:`دلالي`,ar:`مقالة`,meaning:`محتوى مستقل يمكن نشره وحده، كتدوينة أو بطاقة منتج أو تعليق.`,explain:`الاختبار: هل له معنى لو نُقل إلى صفحة أخرى منفردًا؟ إذا نعم فهو article.`,syntax:`<article>…</article>`,example:`<article>
  <h2>عنوان التدوينة</h2>
  <p>…</p>
</article>`,related:[`html-section`],ref:J(`article`)},{id:`html-footer`,term:`<footer>`,say:`footer`,pron:`فوتر`,tech:`html`,cat:`دلالي`,ar:`تذييل`,meaning:`تذييل الصفحة أو القسم: حقوق النشر، روابط ثانوية، معلومات الكاتب.`,explain:`مثل header يمكن أن يكون للصفحة أو لمقالة.`,syntax:`<footer>…</footer>`,example:`<footer>
  <p>© 2026 موقعي</p>
</footer>`,related:[`html-header`],ref:J(`footer`)},{id:`html-strong`,term:`<strong>`,say:`strong`,pron:`سترونغ`,tech:`html`,cat:`نص`,ar:`أهمية قوية`,meaning:`يدل على أهمية أو خطورة النص، ويظهر عريضًا افتراضيًا.`,explain:`استخدمه للمعنى لا للشكل؛ إن أردت خطًا عريضًا لأسباب جمالية فقط فاستخدم CSS (font-weight).`,syntax:`<strong>نص</strong>`,example:`<p><strong>تحذير:</strong> لا تشارك كلمة المرور.</p>`,related:[`html-em`,`css-font-weight`],ref:J(`strong`)},{id:`html-em`,term:`<em>`,say:`emphasis`,pron:`إمفَسِس`,tech:`html`,cat:`نص`,ar:`توكيد`,meaning:`توكيد يغيّر نبرة الجملة، ويظهر مائلًا افتراضيًا.`,explain:`قارئات الشاشة قد تغيّر نبرتها عند قراءته.`,syntax:`<em>نص</em>`,example:`<p>أريد <em>هذا</em> الكتاب.</p>`,related:[`html-strong`],ref:J(`em`)},{id:`html-br`,term:`<br>`,say:`line break`,pron:`لاين بريك`,tech:`html`,cat:`نص`,ar:`سطر جديد`,meaning:`فاصل سطر داخل النص.`,explain:`مناسب للعناوين البريدية والقصائد، وليس لإضافة مسافات بين الفقرات (استخدم CSS margin).`,syntax:`<br>`,example:`الرياض<br>المملكة العربية السعودية`,related:[`html-p`,`html-void`],ref:J(`br`)},{id:`html-form`,term:`<form>`,say:`form`,pron:`فورم`,tech:`html`,cat:`نماذج`,ar:`نموذج`,meaning:`يجمع حقول الإدخال لإرسال بيانات.`,explain:`عند الضغط على زر إرسال يُطلق حدث submit. في تطبيقات JavaScript نستدعي event.preventDefault() لمنع إعادة تحميل الصفحة ونعالج البيانات بأنفسنا.`,syntax:`<form>…</form>`,example:`<form id="signup">
  <label for="em">البريد</label>
  <input id="em" type="email" required>
  <button>تسجيل</button>
</form>`,related:[`html-input`,`html-label`,`html-button`,`js-preventdefault`],ref:J(`form`)},{id:`html-input`,term:`<input>`,say:`input`,pron:`إنبُت`,tech:`html`,cat:`نماذج`,ar:`حقل إدخال`,meaning:`حقل يُدخل فيه المستخدم بيانات، ويتغير شكله حسب type.`,explain:`أنواع شائعة: text وemail وpassword وnumber وcheckbox وradio وrange وdate. السمة value تحمل القيمة، وplaceholder تلميح، وrequired تجعل الحقل إلزاميًا. عنصر فارغ.`,syntax:`<input type="text" name="..">`,example:`<input type="number" min="1" max="10" value="3">`,related:[`html-label`,`html-form`,`vue-v-model`],ref:J(`input`)},{id:`html-label`,term:`<label>`,say:`label`,pron:`ليبل`,tech:`html`,cat:`نماذج`,ar:`تسمية الحقل`,meaning:`نص يصف حقل إدخال ومرتبط به.`,explain:`اربطه بالحقل عبر for="id-الحقل". الفائدة: النقر على التسمية يركّز الحقل، وقارئات الشاشة تقرأها. placeholder لا يغني عن label.`,syntax:`<label for="id">النص</label>`,example:`<label for="name">الاسم</label>
<input id="name">`,related:[`html-input`,`html-a11y`],ref:J(`label`)},{id:`html-button`,term:`<button>`,say:`button`,pron:`باتِن`,tech:`html`,cat:`نماذج`,ar:`زر`,meaning:`زر قابل للنقر.`,explain:`داخل form يكون نوعه الافتراضي submit أي أنه يرسل النموذج. اكتب type="button" إن أردته زرًا عاديًا. يعمل بلوحة المفاتيح تلقائيًا (Enter وSpace).`,syntax:`<button type="button">نص</button>`,example:`<button type="button" id="like">إعجاب</button>`,related:[`html-form`,`js-addeventlistener`],ref:J(`button`)},{id:`html-textarea`,term:`<textarea>`,say:`text area`,pron:`تِكست إيريا`,tech:`html`,cat:`نماذج`,ar:`منطقة نص`,meaning:`حقل نص متعدد الأسطر.`,explain:`القيمة الأولية تُكتب بين وسميه لا في سمة value. rows يحدد الارتفاع المبدئي.`,syntax:`<textarea rows="4"></textarea>`,example:`<label for="msg">رسالتك</label>
<textarea id="msg" rows="4"></textarea>`,related:[`html-input`],ref:J(`textarea`)},{id:`html-select`,term:`<select>`,say:`select`,pron:`سِلِكت`,tech:`html`,cat:`نماذج`,ar:`قائمة منسدلة`,meaning:`قائمة اختيارات منسدلة، كل خيار عنصر <option>.`,explain:`قيمة select هي value الخيار المحدد. selected يجعل الخيار محددًا مبدئيًا.`,syntax:`<select><option value="..">..</option></select>`,example:`<select id="city">
  <option value="ruh">الرياض</option>
  <option value="jed">جدة</option>
</select>`,related:[`html-input`],ref:J(`select`)},{id:`html-table`,term:`<table>`,say:`table`,pron:`تيبل`,tech:`html`,cat:`جداول`,ar:`جدول`,meaning:`لعرض بيانات جدولية في صفوف وأعمدة.`,explain:`tr صف، وth خلية عنوان، وtd خلية بيانات، وthead/tbody لتقسيم الجدول. لا تستخدم الجداول لتخطيط الصفحة؛ استخدم CSS Grid أو Flexbox.`,syntax:`<table><tr><td>..</td></tr></table>`,example:`<table>
  <thead><tr><th>المادة</th><th>الدرجة</th></tr></thead>
  <tbody><tr><td>رياضيات</td><td>95</td></tr></tbody>
</table>`,related:[`css-grid`],ref:J(`table`)},{id:`html-script`,term:`<script>`,say:`script`,pron:`سكريبت`,tech:`html`,cat:`سكربت`,ar:`سكربت`,meaning:`يضمّن كود JavaScript أو يربط ملفًا خارجيًا.`,explain:`السكربت في head ينفَّذ قبل إنشاء عناصر body فلا يجدها؛ لذلك نضعه في نهاية body أو نضيف السمة defer مع src.`,syntax:`<script src="app.js" defer><\/script>`,example:`<script>
  console.log("مرحبًا")
<\/script>`,related:[`js-dom`],ref:J(`script`)},{id:`html-style`,term:`<style>`,say:`style`,pron:`ستايل`,tech:`html`,cat:`تنسيق`,ar:`تنسيق مضمّن`,meaning:`يضمّن قواعد CSS داخل المستند.`,explain:`للصفحات الكبيرة يفضّل ملف CSS مستقل مربوط بـ link لإعادة الاستخدام والتخزين المؤقت.`,syntax:`<style> p { color: navy; } </style>`,example:`<style>
  h1 { color: teal; }
</style>`,related:[`html-link`,`css-selector`],ref:J(`style`)},{id:`html-class`,term:`class`,say:`class`,pron:`كلاس`,tech:`html`,cat:`سمة عامة`,ar:`الصنف`,meaning:`سمة تعطي العنصر اسمًا أو أكثر لاستهدافه في CSS وJavaScript.`,explain:`يمكن لعدة عناصر مشاركة الصنف نفسه، ويمكن للعنصر الواحد حمل عدة أصناف مفصولة بمسافات. في CSS نستهدفه بنقطة: .card`,syntax:`class="name other"`,example:`<div class="card featured">…</div>`,related:[`html-id`,`css-selector`,`js-classlist`],ref:ba(`class`)},{id:`html-id`,term:`id`,say:`I D`,pron:`آي دي`,tech:`html`,cat:`سمة عامة`,ar:`المعرّف`,meaning:`معرّف فريد للعنصر في الصفحة.`,explain:`يجب ألا يتكرر في الصفحة نفسها. يُستخدم في روابط #id، وfor في label، وgetElementById. خصوصيته في CSS عالية جدًا لذا يفضّل التنسيق بالأصناف.`,syntax:`id="unique"`,example:`<section id="contact">…</section>`,related:[`html-class`,`css-specificity`],ref:ba(`id`)},{id:`html-a11y`,term:`Accessibility`,say:`accessibility`,pron:`أكسِسِبِلِتي`,tech:`html`,cat:`مفهوم`,ar:`إتاحة الوصول`,meaning:`جعل الصفحة قابلة للاستخدام من الجميع، بمن فيهم ذوو الإعاقة.`,explain:`يبدأ بـ HTML الدلالي، ونص alt للصور، وربط label بالحقول، وتباين ألوان كافٍ، وإمكانية التنقل بلوحة المفاتيح.`,syntax:`—`,example:`<button aria-label="إغلاق">×</button>`,related:[`html-semantic`,`html-alt`,`css-color`],ref:`https://developer.mozilla.org/en-US/docs/Learn/Accessibility`}],Y=e=>`https://developer.mozilla.org/en-US/docs/Web/CSS/${e}`,Sa=[{id:`css-selector`,term:`Selector`,say:`selector`,pron:`سِلِكتر`,tech:`css`,cat:`مفهوم`,ar:`المحدِّد`,meaning:`الجزء من القاعدة الذي يحدد العناصر التي سيُطبَّق عليها التنسيق.`,explain:`أنواع أساسية: اسم العنصر p، والصنف .card، والمعرّف #main، والسمة [type="email"]. يمكن تركيبها: .card p تعني كل p داخل .card (المسافة = «منحدر من»)، و.card > p تعني الأبناء المباشرين فقط.`,syntax:`selector { property: value; }`,example:`.card p { color: gray; }
nav > a:hover { color: teal; }`,related:[`css-specificity`,`css-pseudo-class`],ref:Y(`CSS_selectors`)},{id:`css-rule`,term:`Rule`,say:`rule`,pron:`رول`,tech:`css`,cat:`مفهوم`,ar:`قاعدة`,meaning:`محدِّد يتبعه كتلة من التصريحات بين قوسين معقوفين.`,explain:`كل تصريح (declaration) هو خاصية ثم نقطتان ثم قيمة وينتهي بفاصلة منقوطة. إن أخطأت في تصريح يتجاهله المتصفح وحده ويكمل باقي القاعدة.`,syntax:`h1 { color: red; font-size: 2rem; }`,example:`button {
  padding: 8px 16px;
  border-radius: 8px;
}`,related:[`css-selector`],ref:Y(`Syntax`)},{id:`css-cascade`,term:`Cascade`,say:`cascade`,pron:`كاسكيد`,tech:`css`,cat:`مفهوم`,ar:`التتالي`,meaning:`الخوارزمية التي تقرر أي تصريح يفوز عندما تتعارض عدة قواعد على العنصر نفسه.`,explain:`الترتيب المبسّط: الأهمية (!important) ثم الخصوصية (specificity) ثم ترتيب الظهور — القاعدة اللاحقة تفوز عند التساوي.`,syntax:`—`,example:`p { color: blue; }
p { color: green; } /* تفوز: لاحقة بنفس الخصوصية */`,related:[`css-specificity`,`css-inheritance`],ref:Y(`Cascade`)},{id:`css-specificity`,term:`Specificity`,say:`specificity`,pron:`سبيسِفيسِتي`,tech:`css`,cat:`مفهوم`,ar:`الخصوصية`,meaning:`وزن المحدِّد، ويُحسب بثلاثة أعداد (معرّفات، أصناف/سمات/أصناف زائفة، عناصر).`,explain:`مثال: #nav a = (1,0,1) و.menu a = (0,1,1). المقارنة من اليسار: معرّف واحد يتفوق على أي عدد من الأصناف. الأنماط المضمّنة style="" أعلى من كل المحددات، و!important يتجاوز ذلك (استخدمه نادرًا).`,syntax:`(id, class, type)`,example:`#main p   /* (1,0,1) */
.intro p  /* (0,1,1) */
p         /* (0,0,1) */`,related:[`css-cascade`,`css-selector`],ref:Y(`Specificity`)},{id:`css-inheritance`,term:`Inheritance`,say:`inheritance`,pron:`إنهيريتَنس`,tech:`css`,cat:`مفهوم`,ar:`الوراثة`,meaning:`بعض الخصائص تنتقل تلقائيًا من العنصر الأب إلى أبنائه.`,explain:`الخصائص النصية مثل color وfont-family وline-height موروثة. خصائص الصندوق مثل margin وpadding وborder غير موروثة. القيمة inherit تفرض الوراثة.`,syntax:`color: inherit;`,example:`body { color: #222; } /* كل النصوص ترث هذا اللون */`,related:[`css-cascade`],ref:Y(`Inheritance`)},{id:`css-color`,term:`color`,say:`color`,pron:`كَلَر`,tech:`css`,cat:`خاصية نص`,ar:`لون النص`,meaning:`يحدد لون النص والزخارف النصية.`,explain:`صيغ القيم: الأسماء (teal)، والسداسي #1e90ff، وrgb(30 144 255)، وhsl(210 100% 56%). HSL مريحة لأن تعديل الإضاءة سهل. تأكد من تباين كافٍ مع الخلفية (4.5:1 للنص العادي حسب WCAG).`,syntax:`color: <color>;`,example:`p { color: hsl(220 15% 25%); }`,related:[`css-background`,`html-a11y`],ref:Y(`color`)},{id:`css-background`,term:`background-color`,say:`background color`,pron:`باكغراوند كَلَر`,tech:`css`,cat:`خلفية`,ar:`لون الخلفية`,meaning:`يحدد لون خلفية العنصر.`,explain:`يملأ منطقة المحتوى والحشوة (padding) وتحت الحد. الخاصية المختصرة background تجمع اللون والصورة والموضع.`,syntax:`background-color: <color>;`,example:`.alert { background-color: #fff3cd; }`,related:[`css-color`],ref:Y(`background-color`)},{id:`css-font-size`,term:`font-size`,say:`font size`,pron:`فونت سايز`,tech:`css`,cat:`خاصية نص`,ar:`حجم الخط`,meaning:`يحدد حجم الخط.`,explain:`يُفضّل rem (نسبة إلى حجم خط الجذر) لأنه يحترم إعدادات تكبير الخط عند المستخدم. القيمة الافتراضية في المتصفحات عادة 16px.`,syntax:`font-size: 1.25rem;`,example:`h1 { font-size: clamp(1.8rem, 4vw, 3rem); }`,related:[`css-units`],ref:Y(`font-size`)},{id:`css-font-family`,term:`font-family`,say:`font family`,pron:`فونت فاميلي`,tech:`css`,cat:`خاصية نص`,ar:`عائلة الخط`,meaning:`قائمة خطوط بالترتيب، يستخدم المتصفح أول خط متوفر.`,explain:`اختم القائمة دائمًا بعائلة عامة مثل sans-serif أو serif أو monospace كبديل أخير.`,syntax:`font-family: "Name", sans-serif;`,example:`body { font-family: "IBM Plex Sans Arabic", Tahoma, sans-serif; }`,related:[`css-font-size`],ref:Y(`font-family`)},{id:`css-font-weight`,term:`font-weight`,say:`font weight`,pron:`فونت وَيت`,tech:`css`,cat:`خاصية نص`,ar:`سماكة الخط`,meaning:`سماكة الخط من 100 إلى 900.`,explain:`400 عادي (normal) و700 عريض (bold). تتوفر الأوزان فعليًا فقط إن كانت موجودة في ملفات الخط.`,syntax:`font-weight: 700;`,example:`.title { font-weight: 600; }`,related:[`html-strong`],ref:Y(`font-weight`)},{id:`css-line-height`,term:`line-height`,say:`line height`,pron:`لاين هايت`,tech:`css`,cat:`خاصية نص`,ar:`ارتفاع السطر`,meaning:`المسافة العمودية لكل سطر نصي.`,explain:`يُفضّل كتابته بلا وحدة مثل 1.6 ليكون نسبة إلى حجم خط كل عنصر. النص العربي يحتاج عادة ارتفاعًا مريحًا بين 1.6 و1.9.`,syntax:`line-height: 1.7;`,example:`p { line-height: 1.8; }`,related:[`css-font-size`],ref:Y(`line-height`)},{id:`css-text-align`,term:`text-align`,say:`text align`,pron:`تِكست ألاين`,tech:`css`,cat:`خاصية نص`,ar:`محاذاة النص`,meaning:`محاذاة النص أفقيًا داخل العنصر.`,explain:`القيم المنطقية start وend تحترم اتجاه الصفحة (في العربية start = اليمين)، وهي أفضل من left/right.`,syntax:`text-align: start | center | end | justify;`,example:`h1 { text-align: center; }`,related:[`css-logical`],ref:Y(`text-align`)},{id:`css-box-model`,term:`Box model`,say:`box model`,pron:`بوكس موديل`,tech:`css`,cat:`مفهوم`,ar:`نموذج الصندوق`,meaning:`كل عنصر صندوق مكوّن من: المحتوى ثم الحشوة padding ثم الحد border ثم الهامش margin.`,explain:`افتراضيًا (content-box) العرض width يشمل المحتوى فقط، فيضاف إليه padding وborder. مع box-sizing: border-box يصبح width شاملًا للحشوة والحد، وهذا أسهل في الحساب.`,syntax:`—`,example:`.box {
  width: 200px;
  padding: 20px;
  border: 2px solid;
  margin: 16px;
}`,related:[`css-padding`,`css-margin`,`css-box-sizing`],ref:Y(`CSS_box_model/Introduction_to_the_CSS_box_model`)},{id:`css-margin`,term:`margin`,say:`margin`,pron:`مارجِن`,tech:`css`,cat:`صندوق`,ar:`الهامش الخارجي`,meaning:`المسافة الشفافة خارج حدود العنصر.`,explain:`الصيغة المختصرة: قيمة واحدة للجهات الأربع، أو قيمتان (عمودي أفقي)، أو أربع (أعلى، يمين، أسفل، يسار — باتجاه عقارب الساعة). margin-inline: auto يوسّط عنصرًا كتليًا له عرض. الهوامش العمودية بين الكتل المتجاورة قد «تنطوي» فيُستخدم الأكبر منها فقط.`,syntax:`margin: 16px 24px;`,example:`.container { max-width: 960px; margin-inline: auto; }`,related:[`css-padding`,`css-box-model`],ref:Y(`margin`)},{id:`css-padding`,term:`padding`,say:`padding`,pron:`بادينغ`,tech:`css`,cat:`صندوق`,ar:`الحشوة الداخلية`,meaning:`المسافة بين المحتوى وحدود العنصر.`,explain:`تأخذ لون خلفية العنصر. نفس صيغ الاختصار في margin. لا تقبل القيم السالبة.`,syntax:`padding: 12px 20px;`,example:`button { padding: 0.6em 1.2em; }`,related:[`css-margin`,`css-box-model`],ref:Y(`padding`)},{id:`css-border`,term:`border`,say:`border`,pron:`بوردَر`,tech:`css`,cat:`صندوق`,ar:`الحد`,meaning:`خط حول العنصر يجمع السماكة والنمط واللون.`,explain:`النمط مطلوب ليظهر الحد (solid أو dashed أو dotted…). border-radius يدوّر الزوايا.`,syntax:`border: 1px solid #ccc;`,example:`.card { border: 1px solid hsl(0 0% 85%); border-radius: 12px; }`,related:[`css-border-radius`,`css-box-model`],ref:Y(`border`)},{id:`css-border-radius`,term:`border-radius`,say:`border radius`,pron:`بوردر ريديَس`,tech:`css`,cat:`صندوق`,ar:`استدارة الزوايا`,meaning:`يجعل زوايا العنصر دائرية.`,explain:`border-radius: 50% على عنصر مربع يجعله دائرة.`,syntax:`border-radius: 12px;`,example:`.avatar { width: 64px; height: 64px; border-radius: 50%; }`,related:[`css-border`],ref:Y(`border-radius`)},{id:`css-box-sizing`,term:`box-sizing`,say:`box sizing`,pron:`بوكس سايزينغ`,tech:`css`,cat:`صندوق`,ar:`حساب الحجم`,meaning:`يحدد هل width وheight يشملان الحشوة والحد أم لا.`,explain:`القيمة border-box تجعل العرض الكلي يساوي width تمامًا. شائع وضعها على كل العناصر في بداية ملف CSS.`,syntax:`box-sizing: border-box;`,example:`*, *::before, *::after { box-sizing: border-box; }`,related:[`css-box-model`],ref:Y(`box-sizing`)},{id:`css-width`,term:`width / max-width`,say:`width`,pron:`وِدث`,tech:`css`,cat:`صندوق`,ar:`العرض`,meaning:`عرض العنصر، وmax-width أقصى عرض مسموح.`,explain:`max-width مع width: 100% يجعل العنصر مرنًا على الشاشات الصغيرة دون أن يتجاوز حدًا على الكبيرة. الصور: img { max-width: 100%; } تمنع خروجها عن حاويتها.`,syntax:`max-width: 60ch;`,example:`article { max-width: 65ch; }`,related:[`css-units`,`css-box-sizing`],ref:Y(`max-width`)},{id:`css-display`,term:`display`,say:`display`,pron:`دِسبلاي`,tech:`css`,cat:`تخطيط`,ar:`نوع العرض`,meaning:`يحدد طريقة عرض العنصر وتخطيط أبنائه.`,explain:`block: يأخذ سطرًا كاملًا. inline: داخل السطر ولا يقبل width/height. inline-block: داخل السطر ويقبل الأبعاد. flex وgrid: تخطيط مرن لأبنائه. none: يخفي العنصر تمامًا (لا يأخذ مساحة).`,syntax:`display: flex;`,example:`nav { display: flex; gap: 1rem; }`,related:[`css-flex`,`css-grid`],ref:Y(`display`)},{id:`css-flex`,term:`Flexbox`,say:`flexbox`,pron:`فلِكس بوكس`,tech:`css`,cat:`تخطيط`,ar:`الصندوق المرن`,meaning:`نظام تخطيط أحادي البعد (صف أو عمود) يوزّع الأبناء ويحاذيهم.`,explain:`تفعّله بـ display: flex على الحاوية. المحور الرئيسي يحدده flex-direction، وjustify-content توزّع على المحور الرئيسي، وalign-items تحاذي على المحور العرضي. في صفحة RTL يبدأ الصف من اليمين.`,syntax:`display: flex;`,example:`.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}`,related:[`css-justify`,`css-align-items`,`css-flex-direction`,`css-gap`],ref:Y(`CSS_flexible_box_layout/Basic_concepts_of_flexbox`)},{id:`css-flex-direction`,term:`flex-direction`,say:`flex direction`,pron:`فلِكس دايركشن`,tech:`css`,cat:`تخطيط`,ar:`اتجاه المحور`,meaning:`يحدد المحور الرئيسي: row (صف) أو column (عمود) ونسختيهما المعكوستين.`,explain:`تغيير الاتجاه يبدّل دور justify-content وalign-items لأنهما مرتبطان بالمحاور لا بالجهات.`,syntax:`flex-direction: row | column;`,example:`.stack { display: flex; flex-direction: column; }`,related:[`css-flex`],ref:Y(`flex-direction`)},{id:`css-justify`,term:`justify-content`,say:`justify content`,pron:`جاستِفاي كونتِنت`,tech:`css`,cat:`تخطيط`,ar:`التوزيع على المحور الرئيسي`,meaning:`توزيع المساحة الحرة بين العناصر على المحور الرئيسي.`,explain:`القيم: flex-start وcenter وflex-end وspace-between (المساحة بين العناصر فقط) وspace-around وspace-evenly (مسافات متساوية تمامًا).`,syntax:`justify-content: space-between;`,example:`header { display: flex; justify-content: space-between; }`,related:[`css-flex`,`css-align-items`],ref:Y(`justify-content`)},{id:`css-align-items`,term:`align-items`,say:`align items`,pron:`ألاين آيتمز`,tech:`css`,cat:`تخطيط`,ar:`المحاذاة على المحور العرضي`,meaning:`محاذاة العناصر على المحور المتعامد مع المحور الرئيسي.`,explain:`في الصف: محاذاة عمودية. القيمة الافتراضية stretch تمدّ العناصر لتملأ الارتفاع. center للتوسيط.`,syntax:`align-items: center;`,example:`.row { display: flex; align-items: center; }`,related:[`css-flex`,`css-justify`],ref:Y(`align-items`)},{id:`css-gap`,term:`gap`,say:`gap`,pron:`غاب`,tech:`css`,cat:`تخطيط`,ar:`الفجوة`,meaning:`المسافة بين عناصر flex أو grid.`,explain:`أفضل من وضع margin على كل عنصر لأنها لا تضيف مسافة على الأطراف.`,syntax:`gap: 16px;`,example:`.grid { display: grid; gap: 1rem 2rem; }`,related:[`css-flex`,`css-grid`],ref:Y(`gap`)},{id:`css-flex-item`,term:`flex (item)`,say:`flex`,pron:`فلِكس`,tech:`css`,cat:`تخطيط`,ar:`مرونة العنصر`,meaning:`اختصار لـ flex-grow وflex-shrink وflex-basis على العنصر الابن.`,explain:`flex: 1 يجعل العنصر يتمدد ليأخذ حصة متساوية من المساحة الحرة. flex-grow: 2 يأخذ ضعف حصة من قيمته 1.`,syntax:`flex: 1;`,example:`.main { flex: 1; }
.sidebar { flex: 0 0 240px; }`,related:[`css-flex`],ref:Y(`flex`)},{id:`css-grid`,term:`CSS Grid`,say:`grid`,pron:`غريد`,tech:`css`,cat:`تخطيط`,ar:`الشبكة`,meaning:`نظام تخطيط ثنائي البعد (صفوف وأعمدة معًا).`,explain:`تعرّف الأعمدة بـ grid-template-columns. الوحدة fr تعني «حصة من المساحة المتبقية». repeat(auto-fit, minmax(200px, 1fr)) ينشئ أعمدة متجاوبة تلقائيًا دون media queries.`,syntax:`display: grid;`,example:`.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}`,related:[`css-grid-template`,`css-gap`,`css-flex`],ref:Y(`CSS_grid_layout/Basic_concepts_of_grid_layout`)},{id:`css-grid-template`,term:`grid-template-columns`,say:`grid template columns`,pron:`غريد تمبليت كولَمز`,tech:`css`,cat:`تخطيط`,ar:`قالب الأعمدة`,meaning:`يحدد عدد أعمدة الشبكة وعرض كل منها.`,explain:`200px 1fr تعني عمود ثابت وآخر يأخذ الباقي. grid-column: span 2 يجعل عنصرًا يمتد على عمودين.`,syntax:`grid-template-columns: 1fr 2fr;`,example:`.layout { display: grid; grid-template-columns: 240px 1fr; }`,related:[`css-grid`],ref:Y(`grid-template-columns`)},{id:`css-position`,term:`position`,say:`position`,pron:`بوزِشن`,tech:`css`,cat:`تخطيط`,ar:`التموضع`,meaning:`طريقة تموضع العنصر: static أو relative أو absolute أو fixed أو sticky.`,explain:`absolute يتموضع بالنسبة لأقرب أب له position غير static. fixed بالنسبة لنافذة العرض. sticky يلتصق عند التمرير. تُستخدم مع top/right/bottom/left أو inset.`,syntax:`position: absolute; top: 0;`,example:`.badge { position: absolute; top: 8px; inset-inline-end: 8px; }
.card { position: relative; }`,related:[`css-z-index`],ref:Y(`position`)},{id:`css-z-index`,term:`z-index`,say:`z index`,pron:`زِد إندِكس`,tech:`css`,cat:`تخطيط`,ar:`ترتيب الطبقات`,meaning:`يحدد أي العناصر المتموضعة يظهر فوق الآخر.`,explain:`يعمل على العناصر المتموضعة (غير static) وعناصر flex/grid. القيم الأعلى فوق، لكن ضمن «سياق التراص» نفسه فقط.`,syntax:`z-index: 10;`,example:`.modal { position: fixed; z-index: 100; }`,related:[`css-position`],ref:Y(`z-index`)},{id:`css-units`,term:`Units`,say:`units`,pron:`يونِتس`,tech:`css`,cat:`مفهوم`,ar:`وحدات القياس`,meaning:`وحدات القيم: مطلقة مثل px، ونسبية مثل rem وem و% وvw وvh وch.`,explain:`rem نسبة لحجم خط الجذر، em نسبة لحجم خط العنصر نفسه، % نسبة للأب، vw/vh نسبة لعرض/ارتفاع نافذة العرض (1vw = 1%)، ch عرض الحرف "0" ومفيدة لعرض الأسطر النصية.`,syntax:`16px | 1rem | 50% | 100vh`,example:`h1 { font-size: 2.5rem; }
.hero { min-height: 80vh; }`,related:[`css-font-size`],ref:Y(`CSS_Values_and_Units`)},{id:`css-media`,term:`@media`,say:`media query`,pron:`ميديا كويري`,tech:`css`,cat:`تجاوب`,ar:`استعلام الوسائط`,meaning:`يطبّق قواعد فقط عندما تتحقق شروط مثل عرض الشاشة.`,explain:`نهج «الجوال أولًا»: اكتب التنسيق الأساسي للشاشات الصغيرة ثم أضف تعديلات للأكبر بـ min-width. يمكن الاستعلام عن تفضيلات المستخدم مثل prefers-color-scheme وprefers-reduced-motion.`,syntax:`@media (min-width: 768px) { … }`,example:`.grid { display: grid; }
@media (min-width: 768px) {
  .grid { grid-template-columns: 1fr 1fr; }
}`,related:[`html-meta`,`css-units`],ref:Y(`@media`)},{id:`css-transition`,term:`transition`,say:`transition`,pron:`ترانزِشن`,tech:`css`,cat:`حركة`,ar:`الانتقال`,meaning:`يجعل تغيّر قيمة خاصية يحدث تدريجيًا خلال مدة.`,explain:`يحتاج إلى تغيير يحدث فعلًا (مثل :hover أو تغيير صنف بـ JavaScript). الصيغة: الخاصية المدة دالة التوقيت التأخير. الخصائص الأخف على الأداء: transform وopacity.`,syntax:`transition: transform 200ms ease-out;`,example:`button { transition: background-color 150ms ease; }
button:hover { background-color: teal; }`,related:[`css-transform`,`css-animation`],ref:Y(`transition`)},{id:`css-animation`,term:`animation / @keyframes`,say:`animation`,pron:`أنيميشن`,tech:`css`,cat:`حركة`,ar:`الحركة`,meaning:`حركة متعددة المراحل تُعرّف بـ @keyframes وتُشغَّل بخاصية animation.`,explain:`بعكس transition لا تحتاج إلى محفّز. تحدد الاسم والمدة والتوقيت وعدد التكرار (infinite) والاتجاه. احترم prefers-reduced-motion للمستخدمين الحساسين للحركة.`,syntax:`animation: name 1s ease-in-out infinite;`,example:`@keyframes pulse {
  from { transform: scale(1); }
  to { transform: scale(1.1); }
}
.dot { animation: pulse 800ms ease-in-out infinite alternate; }`,related:[`css-transition`,`css-transform`],ref:Y(`animation`)},{id:`css-transform`,term:`transform`,say:`transform`,pron:`ترانسفورم`,tech:`css`,cat:`حركة`,ar:`التحويل`,meaning:`يحرّك العنصر أو يدوّره أو يكبّره بصريًا دون التأثير على تخطيط ما حوله.`,explain:`دوال شائعة: translate(x, y) وrotate(45deg) وscale(1.2). العنصر يبقى يشغل مكانه الأصلي في التخطيط.`,syntax:`transform: translateY(-4px) rotate(3deg);`,example:`.card:hover { transform: translateY(-4px); }`,related:[`css-transition`],ref:Y(`transform`)},{id:`css-opacity`,term:`opacity`,say:`opacity`,pron:`أوباسِتي`,tech:`css`,cat:`مظهر`,ar:`الشفافية`,meaning:`شفافية العنصر كاملًا من 0 (غير مرئي) إلى 1.`,explain:`تؤثر على العنصر وكل أبنائه. لشفافية الخلفية فقط استخدم لونًا شفافًا مثل rgb(0 0 0 / 50%). العنصر بشفافية 0 يبقى قابلًا للنقر ويشغل مساحة.`,syntax:`opacity: 0.5;`,example:`.disabled { opacity: 0.5; }`,related:[`css-color`],ref:Y(`opacity`)},{id:`css-box-shadow`,term:`box-shadow`,say:`box shadow`,pron:`بوكس شادو`,tech:`css`,cat:`مظهر`,ar:`ظل الصندوق`,meaning:`يضيف ظلًا حول الصندوق.`,explain:`الصيغة: إزاحة أفقية، إزاحة عمودية، التمويه، الانتشار، اللون. يمكن وضع عدة ظلال مفصولة بفواصل. inset للظل الداخلي.`,syntax:`box-shadow: 0 4px 12px rgb(0 0 0 / 15%);`,example:`.card { box-shadow: 0 1px 2px rgb(0 0 0 / 8%), 0 8px 24px rgb(0 0 0 / 8%); }`,related:[`css-border`],ref:Y(`box-shadow`)},{id:`css-overflow`,term:`overflow`,say:`overflow`,pron:`أوفرفلو`,tech:`css`,cat:`صندوق`,ar:`الفيض`,meaning:`ماذا يحدث عندما يكون المحتوى أكبر من الصندوق.`,explain:`visible (افتراضي: يظهر خارجه) وhidden (يُقص) وauto (شريط تمرير عند الحاجة) وscroll (شريط دائمًا).`,syntax:`overflow: auto;`,example:`.code { overflow-x: auto; }`,related:[`css-box-model`],ref:Y(`overflow`)},{id:`css-var`,term:`Custom properties (var)`,say:`custom properties`,pron:`كاستم بروبرتيز`,tech:`css`,cat:`متغيرات`,ar:`المتغيرات (الخصائص المخصصة)`,meaning:`خصائص تبدأ بشرطتين --name تخزن قيمًا يعاد استخدامها عبر var().`,explain:`تُعرّف غالبًا على :root لتكون متاحة لكل الصفحة، وهي موروثة ويمكن تغييرها لاحقًا أو داخل media query أو بـ JavaScript، مما يجعلها مثالية للثيمات. var(--x, بديل) يقبل قيمة احتياطية.`,syntax:`--name: value;  /  var(--name)`,example:`:root { --brand: #0d9488; }
button { background: var(--brand); }`,related:[`css-cascade`],ref:Y(`Using_CSS_custom_properties`)},{id:`css-pseudo-class`,term:`Pseudo-class`,say:`pseudo class`,pron:`سودو كلاس`,tech:`css`,cat:`محدِّدات`,ar:`الصنف الزائف`,meaning:`يستهدف العنصر في حالة معينة، ويُكتب بنقطتين :`,explain:`أمثلة: :hover (المؤشر فوقه)، :focus-visible (عليه التركيز بلوحة المفاتيح)، :first-child، :nth-child(2n)، :checked، :disabled. خصوصيته مثل الصنف.`,syntax:`a:hover { … }`,example:`button:focus-visible { outline: 3px solid orange; }
li:nth-child(odd) { background: #f6f6f6; }`,related:[`css-selector`,`css-pseudo-element`],ref:Y(`Pseudo-classes`)},{id:`css-pseudo-element`,term:`Pseudo-element`,say:`pseudo element`,pron:`سودو إليمنت`,tech:`css`,cat:`محدِّدات`,ar:`العنصر الزائف`,meaning:`يستهدف جزءًا من العنصر أو يضيف محتوى زخرفيًا، ويُكتب بنقطتين مزدوجتين ::`,explain:`::before و::after ينشئان عنصرًا ابنًا زخرفيًا ويحتاجان إلى خاصية content. ::placeholder و::selection أمثلة أخرى.`,syntax:`.x::before { content: ""; }`,example:`.tag::before { content: "#"; color: gray; }`,related:[`css-pseudo-class`],ref:Y(`Pseudo-elements`)},{id:`css-logical`,term:`Logical properties`,say:`logical properties`,pron:`لوجيكال بروبرتيز`,tech:`css`,cat:`مفهوم`,ar:`الخصائص المنطقية`,meaning:`خصائص تعتمد على اتجاه الكتابة بدل الجهات الثابتة.`,explain:`margin-inline-start تعني اليمين في الصفحات العربية واليسار في الإنجليزية. مهمة جدًا للمواقع العربية وثنائية الاتجاه: padding-inline، inset-inline-end، text-align: start.`,syntax:`margin-inline-start: 1rem;`,example:`.icon { margin-inline-end: 8px; }`,related:[`css-margin`,`css-text-align`],ref:Y(`CSS_logical_properties_and_values`)}],X=e=>`https://developer.mozilla.org/en-US/docs/Web/JavaScript/${e}`,Z=e=>`https://developer.mozilla.org/en-US/docs/Web/API/${e}`,Ca=[{id:`js-variable`,term:`Variable`,say:`variable`,pron:`ڤيريابل`,tech:`js`,cat:`مفهوم`,ar:`متغير`,meaning:`اسم يشير إلى قيمة مخزنة يمكن استخدامها لاحقًا.`,explain:`في JavaScript الحديثة نعرّف المتغيرات بـ const (لا يُعاد إسنادها) أو let (يمكن تغييرها). ابدأ بـ const دائمًا وانتقل إلى let فقط عند الحاجة لتغيير القيمة.`,syntax:`const name = value;`,example:`const price = 120
let quantity = 2
quantity = quantity + 1`,related:[`js-let`,`js-const`,`js-scope`],ref:X(`Guide/Grammar_and_types#declarations`)},{id:`js-let`,term:`let`,say:`let`,pron:`لِت`,tech:`js`,cat:`كلمة محجوزة`,ar:`تعريف متغير قابل للتغيير`,meaning:`يعرّف متغيرًا محصورًا في الكتلة { } التي عُرّف فيها ويمكن إعادة إسناده.`,explain:`لا يمكن استخدامه قبل سطر تعريفه (المنطقة الميتة المؤقتة)، ولا يمكن تعريفه مرتين في النطاق نفسه.`,syntax:`let x = 1;`,example:`let score = 0
score += 10
console.log(score) // 10`,related:[`js-const`,`js-var`,`js-scope`],ref:X(`Reference/Statements/let`)},{id:`js-const`,term:`const`,say:`const`,pron:`كونست`,tech:`js`,cat:`كلمة محجوزة`,ar:`تعريف ثابت`,meaning:`يعرّف متغيرًا لا يمكن إعادة إسناده، ويجب إعطاؤه قيمة عند التعريف.`,explain:`const يمنع تغيير «الربط» لا محتوى القيمة: يمكنك إضافة عناصر لمصفوفة معرّفة بـ const، لكن لا يمكنك إسناد مصفوفة جديدة لها.`,syntax:`const x = 1;`,example:`const list = [1, 2]
list.push(3)   // مسموح
// list = []   // TypeError`,related:[`js-let`,`js-variable`],ref:X(`Reference/Statements/const`)},{id:`js-var`,term:`var`,say:`var`,pron:`ڤار`,tech:`js`,cat:`كلمة محجوزة`,ar:`تعريف متغير (قديم)`,meaning:`الطريقة القديمة لتعريف المتغيرات؛ نطاقها الدالة كاملة لا الكتلة.`,explain:`تُرفع (hoisting) إلى أعلى الدالة بقيمة undefined، وتتجاهل حدود الكتل مثل if وfor، مما يسبب أخطاء خفية. تجنّبها في الكود الجديد واستخدم let وconst.`,syntax:`var x = 1;`,example:`if (true) { var a = 1 }
console.log(a) // 1 — خرجت من الكتلة!`,related:[`js-let`,`js-scope`],ref:X(`Reference/Statements/var`)},{id:`js-types`,term:`Data types`,say:`data types`,pron:`داتا تايبس`,tech:`js`,cat:`مفهوم`,ar:`أنواع البيانات`,meaning:`سبعة أنواع بدائية (string وnumber وboolean وnull وundefined وbigint وsymbol) إضافة إلى الكائنات (object).`,explain:`القيم البدائية تُنسخ عند الإسناد، أما الكائنات (والمصفوفات والدوال) فيُنسخ «مرجعها» فقط، لذلك متغيران قد يشيران إلى الكائن نفسه. typeof يكشف النوع.`,syntax:`typeof value`,example:`typeof "مرحبا"  // "string"
typeof 42       // "number"
typeof [1, 2]   // "object"`,related:[`js-typeof`,`js-object`,`js-array`],ref:X(`Data_structures`)},{id:`js-string`,term:`String`,say:`string`,pron:`سترينغ`,tech:`js`,cat:`نوع`,ar:`نص`,meaning:`سلسلة من الحروف بين علامات اقتباس.`,explain:`يمكن استخدام "..." أو '...' أو \`...\` (القالب النصي). النصوص غير قابلة للتعديل: الدوال مثل toUpperCase تُرجع نصًا جديدًا.`,syntax:`"نص"`,example:`const name = "سارة"
name.length        // 4
name.includes("سا") // true`,related:[`js-template`],ref:X(`Reference/Global_Objects/String`)},{id:`js-number`,term:`Number`,say:`number`,pron:`نَمبَر`,tech:`js`,cat:`نوع`,ar:`عدد`,meaning:`الأعداد الصحيحة والعشرية في نوع واحد.`,explain:`العمليات العشرية قد تعطي نتائج تقريبية مثل 0.1 + 0.2 = 0.30000000000000004 بسبب التمثيل الثنائي. Number("12") يحوّل نصًا إلى عدد، وNaN تعني «ليس عددًا».`,syntax:`42, 3.14`,example:`Number("7") + 1   // 8
"7" + 1           // "71"`,related:[`js-types`],ref:X(`Reference/Global_Objects/Number`)},{id:`js-boolean`,term:`Boolean`,say:`boolean`,pron:`بوليان`,tech:`js`,cat:`نوع`,ar:`قيمة منطقية`,meaning:`إحدى قيمتين: true أو false.`,explain:`القيم «الكاذبة» (falsy) عند التحويل: false و0 و"" وnull وundefined وNaN. أي قيمة أخرى «صادقة» حتى "0" و[] و{}.`,syntax:`true | false`,example:`const isAdult = age >= 18
if ("") { /* لن يُنفَّذ */ }`,related:[`js-if`,`js-equality`],ref:X(`Reference/Global_Objects/Boolean`)},{id:`js-null-undefined`,term:`null / undefined`,say:`null undefined`,pron:`نَل / أندِفايند`,tech:`js`,cat:`نوع`,ar:`لا قيمة`,meaning:`undefined: لم تُعطَ قيمة بعد. null: «لا شيء» بشكل مقصود.`,explain:`المتغير بلا قيمة، والخاصية غير الموجودة، والدالة بلا return كلها تعطي undefined. null يضعها المبرمج عمدًا، وdocument.querySelector تُرجعها إن لم تجد العنصر.`,syntax:`null, undefined`,example:`let x
console.log(x)          // undefined
const user = { name: "علي" }
user.age               // undefined`,related:[`js-optional-chaining`],ref:X(`Reference/Operators/null`)},{id:`js-array`,term:`Array`,say:`array`,pron:`أرَيْ`,tech:`js`,cat:`هيكل بيانات`,ar:`مصفوفة`,meaning:`قائمة مرتبة من القيم، يبدأ ترقيمها (الفهرس) من 0.`,explain:`list[0] أول عنصر، وlist.length عدد العناصر، فآخر عنصر هو list[list.length - 1] أو list.at(-1). المصفوفة كائن، فإسنادها لمتغير آخر لا ينسخها.`,syntax:`[a, b, c]`,example:`const fruits = ["تفاح", "موز"]
fruits.push("عنب")
fruits[0]       // "تفاح"
fruits.length   // 3`,related:[`js-map`,`js-filter`,`js-push`,`js-for-of`],ref:X(`Reference/Global_Objects/Array`)},{id:`js-object`,term:`Object`,say:`object`,pron:`أوبجِكت`,tech:`js`,cat:`هيكل بيانات`,ar:`كائن`,meaning:`مجموعة من الخصائص على شكل مفتاح: قيمة.`,explain:`الوصول بالنقطة user.name أو بالأقواس user["name"] (مفيدة عندما يكون المفتاح في متغير). Object.keys وObject.entries تعيدان المفاتيح والأزواج للمرور عليها.`,syntax:`{ key: value }`,example:`const user = { name: "ليلى", age: 25 }
user.age = 26
user.city = "جدة"`,related:[`js-destructuring`,`js-json`,`js-types`],ref:X(`Guide/Working_with_objects`)},{id:`js-function`,term:`Function`,say:`function`,pron:`فَنكشن`,tech:`js`,cat:`مفهوم`,ar:`دالة`,meaning:`كتلة كود لها اسم، تُنفَّذ عند استدعائها وقد تستقبل مدخلات (معاملات) وتُرجع نتيجة.`,explain:`التعريف لا ينفّذ الدالة؛ الاستدعاء بالأقواس () هو الذي ينفذها. المعاملات (parameters) أسماء في التعريف، والوسائط (arguments) القيم الفعلية عند الاستدعاء.`,syntax:`function name(a, b) { return a + b }`,example:`function greet(name) {
  return "أهلًا " + name
}
greet("منى") // "أهلًا منى"`,related:[`js-arrow`,`js-return`,`js-scope`],ref:X(`Guide/Functions`)},{id:`js-arrow`,term:`Arrow function`,say:`arrow function`,pron:`آرو فَنكشن`,tech:`js`,cat:`دوال`,ar:`الدالة السهمية`,meaning:`صيغة مختصرة للدوال باستخدام =>.`,explain:`إذا كان الجسم تعبيرًا واحدًا بلا أقواس معقوفة فإنه يُرجَع تلقائيًا. لا تملك this خاصة بها (تأخذه من السياق المحيط)، لذلك لا تصلح كدوال بانية.`,syntax:`(a, b) => a + b`,example:`const double = (n) => n * 2
[1, 2, 3].map((n) => n * 2) // [2, 4, 6]`,related:[`js-function`,`js-callback`],ref:X(`Reference/Functions/Arrow_functions`)},{id:`js-return`,term:`return`,say:`return`,pron:`ريتيرن`,tech:`js`,cat:`كلمة محجوزة`,ar:`إرجاع`,meaning:`ينهي تنفيذ الدالة ويُعيد قيمة إلى مكان استدعائها.`,explain:`أي كود بعد return في الكتلة نفسها لا يُنفَّذ. الدالة بلا return تُرجع undefined. الفرق المهم: console.log يعرض قيمة للمبرمج، وreturn يعطيها للبرنامج.`,syntax:`return value;`,example:`function isEven(n) {
  return n % 2 === 0
}`,related:[`js-function`],ref:X(`Reference/Statements/return`)},{id:`js-if`,term:`if...else`,say:`if else`,pron:`إف إلس`,tech:`js`,cat:`تحكم`,ar:`الشرط`,meaning:`ينفّذ كتلة كود فقط إذا تحقق شرط.`,explain:`الشرط يُحوَّل إلى boolean. يمكن تسلسل else if لاختبار عدة حالات بالترتيب، وأول شرط صحيح فقط يُنفَّذ.`,syntax:`if (cond) { … } else { … }`,example:`if (score >= 90) {
  grade = "ممتاز"
} else if (score >= 75) {
  grade = "جيد جدًا"
} else {
  grade = "حاول مجددًا"
}`,related:[`js-boolean`,`js-equality`,`js-ternary`],ref:X(`Reference/Statements/if...else`)},{id:`js-ternary`,term:`Ternary operator`,say:`ternary`,pron:`تيرناري`,tech:`js`,cat:`عوامل`,ar:`العامل الشرطي الثلاثي`,meaning:`تعبير شرطي مختصر: شرط ? قيمة1 : قيمة2.`,explain:`يُرجع قيمة، لذا يُستخدم داخل التعبيرات والقوالب. للمنطق المعقد استخدم if.`,syntax:`cond ? a : b`,example:`const label = count === 1 ? "عنصر" : "عناصر"`,related:[`js-if`],ref:X(`Reference/Operators/Conditional_operator`)},{id:`js-equality`,term:`=== (strict equality)`,say:`strict equality`,pron:`ستريكت إكواليتي`,tech:`js`,cat:`عوامل`,ar:`المساواة الصارمة`,meaning:`يقارن القيمة والنوع معًا دون تحويل.`,explain:`== يحوّل الأنواع قبل المقارنة فيعطي نتائج مفاجئة مثل 0 == "" صحيح. استخدم === و!== دائمًا. الكائنات تُقارن بالمرجع: [] === [] خطأ.`,syntax:`a === b`,example:`5 === "5"   // false
5 == "5"    // true (تحويل ضمني)
NaN === NaN // false`,related:[`js-types`,`js-if`],ref:X(`Reference/Operators/Strict_equality`)},{id:`js-for`,term:`for loop`,say:`for loop`,pron:`فور لوب`,tech:`js`,cat:`تحكم`,ar:`حلقة for`,meaning:`تكرر كتلة كود بعدد محدد: تهيئة؛ شرط؛ تحديث.`,explain:`تُنفَّذ التهيئة مرة واحدة، ثم يُفحص الشرط قبل كل دورة، ويُنفَّذ التحديث بعد كل دورة. إن لم يصبح الشرط false أبدًا فالحلقة لا تنتهي.`,syntax:`for (let i = 0; i < n; i++) { … }`,example:`for (let i = 1; i <= 3; i++) {
  console.log("الدورة", i)
}`,related:[`js-while`,`js-for-of`],ref:X(`Reference/Statements/for`)},{id:`js-while`,term:`while`,say:`while`,pron:`وايل`,tech:`js`,cat:`تحكم`,ar:`حلقة while`,meaning:`تكرر الكتلة ما دام الشرط صحيحًا.`,explain:`مناسبة عندما لا تعرف عدد الدورات مسبقًا. تأكد أن شيئًا داخل الحلقة يغيّر الشرط. break يخرج من الحلقة فورًا وcontinue يقفز للدورة التالية.`,syntax:`while (cond) { … }`,example:`let n = 100
while (n > 1) {
  n = n / 2
}`,related:[`js-for`],ref:X(`Reference/Statements/while`)},{id:`js-for-of`,term:`for...of`,say:`for of`,pron:`فور أوف`,tech:`js`,cat:`تحكم`,ar:`حلقة for...of`,meaning:`تمر على قيم أي شيء قابل للتكرار: مصفوفة، نص، Map، Set.`,explain:`أوضح من for العادية عندما لا تحتاج إلى الفهرس. لا تعمل مباشرة على الكائنات العادية؛ استخدم Object.entries(obj). (for...in تمر على المفاتيح وليست مناسبة للمصفوفات).`,syntax:`for (const item of list) { … }`,example:`for (const name of ["أحمد", "هدى"]) {
  console.log(name)
}`,related:[`js-array`,`js-for`],ref:X(`Reference/Statements/for...of`)},{id:`js-template`,term:`Template literal`,say:`template literal`,pron:`تمبليت ليتِرال`,tech:`js`,cat:`نصوص`,ar:`القالب النصي`,meaning:"نص بين علامتي ` يسمح بإدراج قيم بـ ${…} وبأسطر متعددة.",explain:"أوضح من الجمع بـ + عند بناء نصوص فيها متغيرات. أي تعبير يمكن وضعه داخل ${ }.",syntax:"`نص ${expr}`",example:'const name = "عمر"\nconst msg = `مرحبًا ${name}، لديك ${3 + 2} رسائل`',related:[`js-string`],ref:X(`Reference/Template_literals`)},{id:`js-console-log`,term:`console.log()`,say:`console log`,pron:`كونسول لوغ`,tech:`js`,cat:`أدوات`,ar:`الطباعة في الطرفية`,meaning:`يطبع قيمًا في طرفية أدوات المطوّر لفحصها.`,explain:`أداة التصحيح الأولى: اطبع القيم لتتأكد مما يحدث. يقبل عدة قيم مفصولة بفواصل. لا يُرجع شيئًا (undefined) ولا يظهر للمستخدم في الصفحة.`,syntax:`console.log(value1, value2)`,example:`const total = 5 * 3
console.log("المجموع:", total)`,related:[`js-return`],ref:Z(`console/log_static`)},{id:`js-typeof`,term:`typeof`,say:`type of`,pron:`تايب أوف`,tech:`js`,cat:`عوامل`,ar:`نوع القيمة`,meaning:`يُرجع نصًا يصف نوع القيمة.`,explain:`ملاحظتان مشهورتان: typeof null يعطي "object" (خطأ تاريخي في اللغة)، والمصفوفات تعطي "object" — استخدم Array.isArray للتحقق منها.`,syntax:`typeof x`,example:`typeof undefined  // "undefined"
typeof function(){} // "function"
Array.isArray([])   // true`,related:[`js-types`],ref:X(`Reference/Operators/typeof`)},{id:`js-scope`,term:`Scope`,say:`scope`,pron:`سكوب`,tech:`js`,cat:`مفهوم`,ar:`النطاق`,meaning:`المنطقة من الكود التي يمكن فيها الوصول إلى متغير.`,explain:`let وconst محصوران في الكتلة { }. الدالة تنشئ نطاقًا جديدًا. الكود الداخلي يرى متغيرات النطاقات الخارجية، والعكس غير صحيح. عند تشابه الأسماء يحجب المتغير الداخلي الخارجي.`,syntax:`—`,example:`const a = 1
function f() {
  const b = 2
  return a + b // يرى a من الخارج
}
// b غير متاح هنا`,related:[`js-closure`,`js-let`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Scope`},{id:`js-closure`,term:`Closure`,say:`closure`,pron:`كلوجَر`,tech:`js`,cat:`مفهوم`,ar:`الإغلاق`,meaning:`دالة «تتذكر» متغيرات النطاق الذي أُنشئت فيه حتى بعد انتهاء تنفيذه.`,explain:`يُستخدم لإنشاء حالة خاصة لا يمكن الوصول إليها من الخارج، وهو أساس كثير من الأنماط مثل العدادات ومعالجات الأحداث.`,syntax:`—`,example:`function makeCounter() {
  let count = 0
  return () => ++count
}
const next = makeCounter()
next() // 1
next() // 2`,related:[`js-scope`,`js-function`],ref:X(`Closures`)},{id:`js-callback`,term:`Callback`,say:`callback`,pron:`كول باك`,tech:`js`,cat:`مفهوم`,ar:`دالة رد النداء`,meaning:`دالة تُمرَّر إلى دالة أخرى لتستدعيها لاحقًا.`,explain:`نمرر الدالة نفسها (بدون أقواس)، والدالة المستقبِلة تقرر متى تستدعيها: بعد حدث، أو لكل عنصر في مصفوفة، أو بعد مؤقت.`,syntax:`doSomething(callbackFn)`,example:`button.addEventListener("click", handleClick) // بدون ()
[3, 1, 2].sort((a, b) => a - b)`,related:[`js-arrow`,`js-addeventlistener`,`js-map`],ref:`https://developer.mozilla.org/en-US/docs/Glossary/Callback_function`},{id:`js-map`,term:`Array.map()`,say:`map`,pron:`ماب`,tech:`js`,cat:`مصفوفات`,ar:`تحويل كل عنصر`,meaning:`تُنشئ مصفوفة جديدة بنفس الطول بعد تطبيق دالة على كل عنصر.`,explain:`لا تغيّر المصفوفة الأصلية. الدالة يجب أن تُرجع القيمة الجديدة؛ إن نسيت return في دالة بأقواس معقوفة ستحصل على undefined.`,syntax:`arr.map((item, index) => newValue)`,example:`const prices = [10, 20]
const withTax = prices.map((p) => p * 1.15)
// [11.5, 23]`,related:[`js-filter`,`js-reduce`,`js-foreach`],ref:X(`Reference/Global_Objects/Array/map`)},{id:`js-filter`,term:`Array.filter()`,say:`filter`,pron:`فِلتر`,tech:`js`,cat:`مصفوفات`,ar:`تصفية العناصر`,meaning:`تُنشئ مصفوفة جديدة بالعناصر التي أعادت لها الدالة قيمة صادقة.`,explain:`لا تغيّر الأصل. الطول الناتج قد يكون أقل أو صفرًا.`,syntax:`arr.filter((item) => condition)`,example:`const nums = [1, 2, 3, 4]
nums.filter((n) => n % 2 === 0) // [2, 4]`,related:[`js-map`,`js-find`],ref:X(`Reference/Global_Objects/Array/filter`)},{id:`js-reduce`,term:`Array.reduce()`,say:`reduce`,pron:`ريديوس`,tech:`js`,cat:`مصفوفات`,ar:`اختزال إلى قيمة`,meaning:`تختزل المصفوفة إلى قيمة واحدة عبر «مُجمِّع» يمر على كل العناصر.`,explain:`الدالة تستقبل المُجمِّع الحالي والعنصر وتُرجع المُجمِّع الجديد. القيمة الابتدائية (الوسيط الثاني) مهمة: بدونها يُستخدم أول عنصر، وتفشل مع مصفوفة فارغة.`,syntax:`arr.reduce((acc, item) => newAcc, initial)`,example:`[5, 10, 15].reduce((sum, n) => sum + n, 0) // 30`,related:[`js-map`,`js-filter`],ref:X(`Reference/Global_Objects/Array/reduce`)},{id:`js-foreach`,term:`Array.forEach()`,say:`for each`,pron:`فور إيتش`,tech:`js`,cat:`مصفوفات`,ar:`لكل عنصر`,meaning:`تستدعي دالة لكل عنصر ولا تُرجع شيئًا.`,explain:`مناسبة للتأثيرات الجانبية (طباعة، تعديل DOM). إن أردت مصفوفة جديدة فاستخدم map. لا يمكن إيقافها بـ break.`,syntax:`arr.forEach((item, index) => { … })`,example:`["أ", "ب"].forEach((ch, i) => console.log(i, ch))`,related:[`js-map`,`js-for-of`],ref:X(`Reference/Global_Objects/Array/forEach`)},{id:`js-find`,term:`Array.find()`,say:`find`,pron:`فايند`,tech:`js`,cat:`مصفوفات`,ar:`إيجاد أول عنصر`,meaning:`تُرجع أول عنصر يحقق الشرط، أو undefined.`,explain:`findIndex تُرجع موقعه بدلًا منه (أو -1). some وevery تُرجعان boolean.`,syntax:`arr.find((item) => condition)`,example:`users.find((u) => u.id === 7)`,related:[`js-filter`],ref:X(`Reference/Global_Objects/Array/find`)},{id:`js-push`,term:`Array.push()`,say:`push`,pron:`بوش`,tech:`js`,cat:`مصفوفات`,ar:`إضافة في النهاية`,meaning:`تضيف عنصرًا أو أكثر في نهاية المصفوفة وتُرجع الطول الجديد.`,explain:`تعدّل المصفوفة نفسها. pop تحذف آخر عنصر، وunshift/shift للبداية، وsplice للحذف والإدراج في أي موضع.`,syntax:`arr.push(item)`,example:`const todo = []
todo.push("دراسة")`,related:[`js-array`],ref:X(`Reference/Global_Objects/Array/push`)},{id:`js-spread`,term:`Spread (...)`,say:`spread`,pron:`سبريد`,tech:`js`,cat:`صياغة`,ar:`النشر`,meaning:`يفرد عناصر مصفوفة أو خصائص كائن داخل مصفوفة/كائن/استدعاء آخر.`,explain:`مفيد لنسخ سطحي ودمج: [...a, ...b] و{ ...obj, key: new }. النسخ سطحي: الكائنات المتداخلة تبقى مشتركة.`,syntax:`[...arr]  { ...obj }`,example:`const a = [1, 2]
const b = [...a, 3]      // [1, 2, 3]
Math.max(...a)           // 2`,related:[`js-destructuring`],ref:X(`Reference/Operators/Spread_syntax`)},{id:`js-destructuring`,term:`Destructuring`,say:`destructuring`,pron:`ديستراكتشرينغ`,tech:`js`,cat:`صياغة`,ar:`التفكيك`,meaning:`استخراج قيم من مصفوفة أو كائن إلى متغيرات بصياغة مختصرة.`,explain:`في الكائنات يكون بالاسم، وفي المصفوفات بالترتيب. يمكن إعطاء قيمة افتراضية وإعادة التسمية.`,syntax:`const { a, b } = obj`,example:`const { name, age = 0 } = user
const [first, second] = [10, 20]`,related:[`js-object`,`js-spread`],ref:X(`Reference/Operators/Destructuring_assignment`)},{id:`js-optional-chaining`,term:`Optional chaining (?.)`,say:`optional chaining`,pron:`أوبشنال تشينينغ`,tech:`js`,cat:`عوامل`,ar:`السلسلة الاختيارية`,meaning:`يصل إلى خاصية فقط إن كان ما قبلها ليس null أو undefined، وإلا يُرجع undefined بدل الخطأ.`,explain:`يمنع خطأ «Cannot read properties of undefined». يُستخدم مع ?? لإعطاء قيمة افتراضية.`,syntax:`obj?.prop`,example:`const city = user?.address?.city ?? "غير محدد"`,related:[`js-null-undefined`],ref:X(`Reference/Operators/Optional_chaining`)},{id:`js-class`,term:`class`,say:`class`,pron:`كلاس`,tech:`js`,cat:`كائنات`,ar:`الصنف`,meaning:`قالب لإنشاء كائنات لها البنية والسلوك نفسه.`,explain:`constructor يُنفَّذ عند الإنشاء بـ new، وthis يشير إلى الكائن الجديد. extends للوراثة وsuper لاستدعاء صنف الأب.`,syntax:`class Name { constructor() {} method() {} }`,example:`class Timer {
  constructor(sec) { this.sec = sec }
  tick() { this.sec-- }
}
const t = new Timer(10)`,related:[`js-object`],ref:X(`Reference/Classes`)},{id:`js-try-catch`,term:`try...catch`,say:`try catch`,pron:`تراي كاتش`,tech:`js`,cat:`تحكم`,ar:`معالجة الأخطاء`,meaning:`ينفّذ كودًا وإن رُمي خطأ يلتقطه بدل أن يتوقف البرنامج.`,explain:`catch تستقبل كائن الخطأ (name وmessage). finally تُنفَّذ في كل الأحوال. throw يرمي خطأً بنفسك.`,syntax:`try { … } catch (err) { … }`,example:`try {
  JSON.parse("{خطأ")
} catch (err) {
  console.log("بيانات غير صالحة:", err.message)
}`,related:[`js-json`],ref:X(`Reference/Statements/try...catch`)},{id:`js-json`,term:`JSON`,say:`J SON`,pron:`جيسون`,tech:`js`,cat:`بيانات`,ar:`صيغة JSON`,meaning:`صيغة نصية لتبادل البيانات مستوحاة من كائنات JavaScript.`,explain:`JSON.stringify يحوّل قيمة إلى نص، وJSON.parse يعيد النص إلى قيمة. المفاتيح في JSON بين علامات اقتباس مزدوجة دائمًا، ولا تدعم الدوال أو undefined.`,syntax:`JSON.stringify(v) / JSON.parse(s)`,example:`const text = JSON.stringify({ a: 1 }) // '{"a":1}'
JSON.parse(text).a                  // 1`,related:[`js-localstorage`,`js-object`],ref:X(`Reference/Global_Objects/JSON`)},{id:`js-dom`,term:`DOM`,say:`DOM`,pron:`دوم`,tech:`js`,cat:`متصفح`,ar:`نموذج كائنات المستند`,meaning:`تمثيل الصفحة كشجرة كائنات يمكن لـ JavaScript قراءتها وتعديلها.`,explain:`كل عنصر HTML يصبح كائنًا له خصائص (textContent، classList، style) ودوال (append، remove). تعديل DOM يغيّر الصفحة فورًا دون تغيير ملف HTML الأصلي.`,syntax:`document.…`,example:`const title = document.querySelector("h1")
title.textContent = "عنوان جديد"`,related:[`js-queryselector`,`js-textcontent`],ref:Z(`Document_Object_Model/Introduction`)},{id:`js-queryselector`,term:`querySelector()`,say:`query selector`,pron:`كويري سِلِكتر`,tech:`js`,cat:`متصفح`,ar:`البحث عن عنصر`,meaning:`يُرجع أول عنصر يطابق محدِّد CSS، أو null إن لم يجد.`,explain:`يقبل أي محدِّد CSS: "#id" و".class" و"nav a". querySelectorAll تُرجع كل المطابقات في NodeList يمكن المرور عليها بـ forEach.`,syntax:`document.querySelector("selector")`,example:`const btn = document.querySelector("#save")
const items = document.querySelectorAll(".item")`,related:[`js-dom`,`css-selector`],ref:Z(`Document/querySelector`)},{id:`js-addeventlistener`,term:`addEventListener()`,say:`add event listener`,pron:`آد إيفنت لِسنر`,tech:`js`,cat:`أحداث`,ar:`الاستماع لحدث`,meaning:`يربط دالة بحدث على عنصر (نقر، إدخال، إرسال…) لتُنفَّذ عند وقوعه.`,explain:`الوسيط الأول اسم الحدث بدون on، والثاني الدالة نفسها (لا تستدعها بأقواس). الدالة تستقبل كائن الحدث event.`,syntax:`el.addEventListener("click", handler)`,example:`btn.addEventListener("click", (event) => {
  console.log("تم النقر على", event.target)
})`,related:[`js-event`,`js-callback`],ref:Z(`EventTarget/addEventListener`)},{id:`js-event`,term:`Event`,say:`event`,pron:`إيفنت`,tech:`js`,cat:`أحداث`,ar:`الحدث`,meaning:`كائن يصف ما حدث: نوعه وهدفه وتفاصيله.`,explain:`event.target العنصر الذي وقع عليه الحدث، وevent.key المفتاح المضغوط. الأحداث «تفقّع» (bubble) من العنصر إلى آبائه، وهذا يسمح بتفويض الأحداث لأب واحد.`,syntax:`(event) => { event.target }`,example:`input.addEventListener("input", (e) => {
  console.log(e.target.value)
})`,related:[`js-addeventlistener`,`js-preventdefault`],ref:Z(`Event`)},{id:`js-preventdefault`,term:`preventDefault()`,say:`prevent default`,pron:`بريفنت ديفولت`,tech:`js`,cat:`أحداث`,ar:`منع السلوك الافتراضي`,meaning:`يمنع المتصفح من سلوكه الافتراضي للحدث، مثل إعادة تحميل الصفحة عند إرسال نموذج.`,explain:`لا يوقف انتشار الحدث (ذلك stopPropagation).`,syntax:`event.preventDefault()`,example:`form.addEventListener("submit", (e) => {
  e.preventDefault()
  // عالج البيانات هنا
})`,related:[`html-form`,`js-event`],ref:Z(`Event/preventDefault`)},{id:`js-textcontent`,term:`textContent`,say:`text content`,pron:`تِكست كونتِنت`,tech:`js`,cat:`متصفح`,ar:`محتوى النص`,meaning:`يقرأ أو يغيّر النص داخل العنصر.`,explain:`أكثر أمانًا من innerHTML عند عرض نص أدخله المستخدم، لأنه لا يفسّر الوسوم (يمنع حقن HTML).`,syntax:`el.textContent = "نص"`,example:`counter.textContent = String(count)`,related:[`js-dom`,`js-innerhtml`],ref:Z(`Node/textContent`)},{id:`js-innerhtml`,term:`innerHTML`,say:`inner HTML`,pron:`إنر إتش تي إم إل`,tech:`js`,cat:`متصفح`,ar:`HTML الداخلي`,meaning:`يقرأ أو يستبدل محتوى العنصر كـ HTML.`,explain:`خطِر مع البيانات القادمة من المستخدم لأنه قد ينفذ كودًا (ثغرة XSS). استخدم textContent أو createElement للنصوص.`,syntax:`el.innerHTML = "<b>…</b>"`,example:`list.innerHTML = "" // تفريغ القائمة`,related:[`js-textcontent`],ref:Z(`Element/innerHTML`)},{id:`js-classlist`,term:`classList`,say:`class list`,pron:`كلاس ليست`,tech:`js`,cat:`متصفح`,ar:`قائمة الأصناف`,meaning:`واجهة لإضافة أصناف العنصر وإزالتها وتبديلها.`,explain:`add وremove وtoggle وcontains. تغيير الصنف ودع CSS يتكفّل بالشكل أفضل من تعديل style مباشرة.`,syntax:`el.classList.toggle("active")`,example:`menu.classList.toggle("open")`,related:[`html-class`],ref:Z(`Element/classList`)},{id:`js-createelement`,term:`createElement()`,say:`create element`,pron:`كريِيت إليمنت`,tech:`js`,cat:`متصفح`,ar:`إنشاء عنصر`,meaning:`ينشئ عنصرًا جديدًا في الذاكرة يمكن إضافته للصفحة لاحقًا.`,explain:`العنصر لا يظهر حتى تضيفه بـ append أو appendChild إلى عنصر موجود.`,syntax:`document.createElement("li")`,example:`const li = document.createElement("li")
li.textContent = "مهمة جديدة"
list.append(li)`,related:[`js-dom`],ref:Z(`Document/createElement`)},{id:`js-localstorage`,term:`localStorage`,say:`local storage`,pron:`لوكال ستوريج`,tech:`js`,cat:`متصفح`,ar:`التخزين المحلي`,meaning:`تخزين نصي دائم في المتصفح لكل موقع.`,explain:`يحفظ نصوصًا فقط، لذا نحوّل الكائنات بـ JSON.stringify. البيانات تبقى بعد إغلاق المتصفح لكنها خاصة بالجهاز والمتصفح، ولا يصلح لبيانات حساسة.`,syntax:`localStorage.setItem(key, text)`,example:`localStorage.setItem("todos", JSON.stringify(todos))
const saved = JSON.parse(localStorage.getItem("todos") ?? "[]")`,related:[`js-json`],ref:Z(`Window/localStorage`)},{id:`js-settimeout`,term:`setTimeout()`,say:`set timeout`,pron:`سِت تايم آوت`,tech:`js`,cat:`غير متزامن`,ar:`مؤقت`,meaning:`يجدول تنفيذ دالة بعد مدة (بالميلي ثانية) مرة واحدة.`,explain:`لا يوقف البرنامج: الكود التالي يُنفَّذ فورًا، والدالة تنتظر في «طابور المهام» حتى ينتهي الكود الحالي ويمر الوقت. لذلك setTimeout(fn, 0) لا يعني «الآن».`,syntax:`setTimeout(fn, ms)`,example:`console.log("1")
setTimeout(() => console.log("3"), 0)
console.log("2")`,related:[`js-event-loop`,`js-promise`],ref:Z(`Window/setTimeout`)},{id:`js-promise`,term:`Promise`,say:`promise`,pron:`بروميس`,tech:`js`,cat:`غير متزامن`,ar:`الوعد`,meaning:`كائن يمثل نتيجة ستتوفر لاحقًا: معلّق ثم مُنجَز أو مرفوض.`,explain:`then تسجّل ما يحدث عند النجاح وcatch عند الفشل. ردود then تُنفَّذ كمهام دقيقة (microtasks) قبل المؤقتات.`,syntax:`promise.then(fn).catch(fn)`,example:`const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
wait(500).then(() => console.log("مرّ نصف ثانية"))`,related:[`js-async-await`,`js-event-loop`],ref:X(`Reference/Global_Objects/Promise`)},{id:`js-async-await`,term:`async / await`,say:`async await`,pron:`أسينك أوايت`,tech:`js`,cat:`غير متزامن`,ar:`الدوال غير المتزامنة`,meaning:`صياغة لكتابة كود الوعود وكأنه متسلسل.`,explain:`الدالة async تُرجع دائمًا Promise. await يوقف تنفيذ تلك الدالة فقط (لا البرنامج كله) حتى يستقر الوعد. استخدم try/catch لالتقاط الرفض.`,syntax:`async function f() { const v = await p }`,example:`async function load() {
  try {
    const res = await fetch("/data.json")
    return await res.json()
  } catch (err) {
    console.log("فشل التحميل")
  }
}`,related:[`js-promise`,`js-fetch`],ref:X(`Reference/Statements/async_function`)},{id:`js-fetch`,term:`fetch()`,say:`fetch`,pron:`فِتش`,tech:`js`,cat:`غير متزامن`,ar:`جلب البيانات`,meaning:`يرسل طلب شبكة ويُرجع Promise بالاستجابة.`,explain:`fetch لا يرفض الوعد عند أخطاء HTTP مثل 404؛ تحقق من response.ok. ملاحظة: المعاينات في هذه المنصة معزولة عن الشبكة عمدًا.`,syntax:`fetch(url).then((r) => r.json())`,example:`const res = await fetch("https://example.com/api")
if (!res.ok) throw new Error(res.status)
const data = await res.json()`,related:[`js-async-await`,`js-json`],ref:Z(`Window/fetch`)},{id:`js-event-loop`,term:`Event loop`,say:`event loop`,pron:`إيفنت لوب`,tech:`js`,cat:`مفهوم`,ar:`حلقة الأحداث`,meaning:`الآلية التي تنظّم تنفيذ الكود المتزامن ثم المهام المؤجلة في JavaScript أحادية الخيط.`,explain:`يُنفَّذ الكود المتزامن حتى يفرغ مكدس الاستدعاءات، ثم تُنفَّذ كل المهام الدقيقة (ردود الوعود وqueueMicrotask)، ثم مهمة واحدة من طابور المهام (مثل مؤقت)، ثم المهام الدقيقة مجددًا… وهكذا.`,syntax:`—`,example:`setTimeout(() => console.log("مؤقت"), 0)
Promise.resolve().then(() => console.log("وعد"))
console.log("متزامن")
// متزامن ← وعد ← مؤقت`,related:[`js-settimeout`,`js-promise`],ref:X(`Event_loop`)},{id:`js-module`,term:`import / export`,say:`modules`,pron:`موديولز`,tech:`js`,cat:`وحدات`,ar:`الوحدات`,meaning:`تقسيم الكود إلى ملفات تصدّر وتستورد من بعضها.`,explain:`export يجعل القيمة متاحة لملفات أخرى وimport يجلبها. يُستخدم بكثرة في مشاريع Vue (import { ref } from "vue").`,syntax:`export function f() {}  /  import { f } from "./a.js"`,example:`// math.js
export const add = (a, b) => a + b
// main.js
import { add } from "./math.js"`,related:[`vue-ref`],ref:X(`Guide/Modules`)}],Q=e=>`https://vuejs.org/${e}`,wa=[{id:`vue-createapp`,term:`createApp()`,say:`create app`,pron:`كريِيت آب`,tech:`vue`,cat:`تطبيق`,ar:`إنشاء التطبيق`,meaning:`ينشئ تطبيق Vue من مكوّن جذري، ثم يُركَّب في عنصر من الصفحة بـ mount.`,explain:`نقطة البداية لأي تطبيق Vue. كل ما داخل العنصر المحدد في mount يصبح تحت إدارة Vue.`,syntax:`createApp(App).mount("#app")`,example:`import { createApp } from "vue"
import App from "./App.vue"
createApp(App).mount("#app")`,related:[`vue-component`,`vue-sfc`],ref:Q(`api/application.html#createapp`)},{id:`vue-component`,term:`Component`,say:`component`,pron:`كومبونِنت`,tech:`vue`,cat:`مفهوم`,ar:`المكوّن`,meaning:`جزء مستقل قابل لإعادة الاستخدام من الواجهة، له قالبه ومنطقه وتنسيقه.`,explain:`نقسم الواجهة إلى مكوّنات صغيرة (زر، بطاقة، قائمة) ونركّبها معًا. البيانات تنزل من الأب للابن عبر props، والأحداث تصعد من الابن للأب عبر emits.`,syntax:`<MyButton />`,example:`<script setup>
import TodoItem from "./TodoItem.vue"
<\/script>
<template>
  <TodoItem title="دراسة" />
</template>`,related:[`vue-props`,`vue-emits`,`vue-sfc`],ref:Q(`guide/essentials/component-basics.html`)},{id:`vue-sfc`,term:`Single-File Component (.vue)`,say:`single file component`,pron:`سِنغل فايل كومبونِنت`,tech:`vue`,cat:`مفهوم`,ar:`المكوّن أحادي الملف`,meaning:`ملف .vue يجمع template وscript وstyle للمكوّن نفسه.`,explain:`يحتاج إلى أداة بناء (مثل Vite) لترجمته إلى JavaScript. في هذه المنصة يُترجم داخل المتصفح بالمترجم الرسمي vue/compiler-sfc.`,syntax:`<template>…</template>
<script setup>…<\/script>
<style scoped>…</style>`,example:`<script setup>
const msg = "مرحبًا"
<\/script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
h1 { color: teal; }
</style>`,related:[`vue-script-setup`,`vue-scoped`],ref:Q(`guide/scaling-up/sfc.html`)},{id:`vue-script-setup`,term:`<script setup>`,say:`script setup`,pron:`سكريبت سِت أب`,tech:`vue`,cat:`صياغة`,ar:`سكربت الإعداد`,meaning:`صياغة مختصرة لـ Composition API داخل ملفات .vue.`,explain:`كل المتغيرات والدوال والمكوّنات المستوردة في المستوى الأعلى متاحة مباشرة في القالب دون return. يُنفَّذ الكود مرة لكل نسخة من المكوّن.`,syntax:`<script setup> … <\/script>`,example:`<script setup>
import { ref } from "vue"
const count = ref(0)
function inc() { count.value++ }
<\/script>`,related:[`vue-ref`,`vue-sfc`],ref:Q(`api/sfc-script-setup.html`)},{id:`vue-template`,term:`Template`,say:`template`,pron:`تمبليت`,tech:`vue`,cat:`قالب`,ar:`القالب`,meaning:`HTML موسّع يصف ما يعرضه المكوّن، مع توجيهات Vue وتعابير {{ }}.`,explain:`Vue يحوّل القالب إلى دالة عرض (render function) ويعيد تنفيذها تلقائيًا عند تغيّر البيانات التفاعلية التي يستخدمها.`,syntax:`<template> … </template>`,example:`<template>
  <p v-if="items.length">لديك {{ items.length }} عناصر</p>
</template>`,related:[`vue-interpolation`,`vue-directive`],ref:Q(`guide/essentials/template-syntax.html`)},{id:`vue-interpolation`,term:`{{ }} Interpolation`,say:`interpolation`,pron:`إنتربوليشن`,tech:`vue`,cat:`قالب`,ar:`الإدراج النصي`,meaning:`يعرض قيمة تعبير JavaScript كنص داخل القالب.`,explain:`يقبل تعبيرًا واحدًا (لا جملًا مثل if أو let). يُعرض كنص لا كـ HTML، وهذا يحمي من الحقن. داخل القالب لا نكتب .value مع ref لأن Vue يفكّها تلقائيًا.`,syntax:`{{ expression }}`,example:`<p>المجموع: {{ price * qty }}</p>
<p>{{ name.toUpperCase() }}</p>`,related:[`vue-template`,`vue-ref`],ref:Q(`guide/essentials/template-syntax.html#text-interpolation`)},{id:`vue-directive`,term:`Directive`,say:`directive`,pron:`دايركتِف`,tech:`vue`,cat:`قالب`,ar:`التوجيه`,meaning:`سمة خاصة تبدأ بـ v- تطبّق سلوكًا تفاعليًا على العنصر.`,explain:`أهمها: v-if وv-for وv-bind (:) وv-on (@) وv-model وv-show. قيمتها تعبير JavaScript.`,syntax:`v-name:arg.modifier="expr"`,example:`<button @click.prevent="save">حفظ</button>`,related:[`vue-v-if`,`vue-v-for`,`vue-v-bind`,`vue-v-on`,`vue-v-model`],ref:Q(`guide/essentials/template-syntax.html#directives`)},{id:`vue-ref`,term:`ref()`,say:`ref`,pron:`رِف`,tech:`vue`,cat:`تفاعلية`,ar:`مرجع تفاعلي`,meaning:`ينشئ قيمة تفاعلية: عند تغييرها يتحدّث كل ما يعتمد عليها تلقائيًا.`,explain:`في JavaScript نقرأ ونكتب القيمة عبر .value، أما في القالب فنكتب الاسم مباشرة. يعمل مع أي نوع من القيم.`,syntax:`const x = ref(initial)`,example:`import { ref } from "vue"
const count = ref(0)
count.value++ // يتحدّث القالب تلقائيًا`,related:[`vue-reactive`,`vue-computed`,`vue-reactivity`],ref:Q(`api/reactivity-core.html#ref`)},{id:`vue-reactive`,term:`reactive()`,say:`reactive`,pron:`رياكتِف`,tech:`vue`,cat:`تفاعلية`,ar:`كائن تفاعلي`,meaning:`يحوّل كائنًا إلى نسخة تفاعلية (Proxy) تُقرأ خصائصها مباشرة دون .value.`,explain:`يعمل مع الكائنات والمصفوفات فقط. لا تستبدل الكائن كاملًا ولا تفكّكه بالتفكيك لأنك تفقد التفاعلية. التوثيق الرسمي يوصي بـ ref كخيار أساسي.`,syntax:`const state = reactive({ … })`,example:`const form = reactive({ name: "", email: "" })
form.name = "نور"`,related:[`vue-ref`],ref:Q(`api/reactivity-core.html#reactive`)},{id:`vue-computed`,term:`computed()`,say:`computed`,pron:`كومبيوتِد`,tech:`vue`,cat:`تفاعلية`,ar:`قيمة محسوبة`,meaning:`قيمة مشتقة من بيانات تفاعلية، تُحسب تلقائيًا وتُخزّن حتى تتغير مصادرها.`,explain:`استخدمها بدل تكرار تعابير معقدة في القالب. يجب أن تكون دالة نقية: تحسب وتُرجع دون تعديل حالة أخرى. نقرؤها بـ .value في JavaScript.`,syntax:`const x = computed(() => …)`,example:`const items = ref([5, 10])
const total = computed(() => items.value.reduce((s, n) => s + n, 0))`,related:[`vue-ref`,`vue-watch`],ref:Q(`guide/essentials/computed.html`)},{id:`vue-watch`,term:`watch()`,say:`watch`,pron:`ووتش`,tech:`vue`,cat:`تفاعلية`,ar:`المراقبة`,meaning:`ينفّذ دالة عند تغيّر مصدر تفاعلي، لأجل «تأثيرات جانبية» مثل الحفظ أو الطلبات.`,explain:`الفرق عن computed: computed تُرجع قيمة، وwatch تنفّذ فعلًا. يستقبل القيمة الجديدة والقديمة. { deep: true } لمراقبة التغييرات المتداخلة، و{ immediate: true } للتنفيذ فورًا.`,syntax:`watch(source, (newV, oldV) => { … })`,example:`watch(todos, (list) => {
  localStorage.setItem("todos", JSON.stringify(list))
}, { deep: true })`,related:[`vue-computed`,`js-localstorage`],ref:Q(`guide/essentials/watchers.html`)},{id:`vue-reactivity`,term:`Reactivity`,say:`reactivity`,pron:`رياكتيفِتي`,tech:`vue`,cat:`مفهوم`,ar:`التفاعلية`,meaning:`قدرة Vue على تتبّع البيانات التي تستخدمها الواجهة وتحديثها تلقائيًا عند تغيرها.`,explain:`بدل أن تعدّل DOM يدويًا (كما في JavaScript العادية)، تغيّر البيانات فقط وVue يحدّث العرض. Vue يتتبّع القراءات أثناء العرض ثم يعيد العرض عند الكتابة.`,syntax:`—`,example:`// بدون Vue:
el.textContent = count
// مع Vue: يكفي
count.value++`,related:[`vue-ref`,`js-dom`],ref:Q(`guide/extras/reactivity-in-depth.html`)},{id:`vue-v-if`,term:`v-if / v-else`,say:`v if`,pron:`ڤي إف`,tech:`vue`,cat:`توجيه`,ar:`العرض الشرطي`,meaning:`يُنشئ العنصر أو يزيله من DOM حسب الشرط.`,explain:`v-else-if وv-else يجب أن يأتيا مباشرة بعد عنصر v-if. العنصر الذي شرطه false غير موجود في الصفحة إطلاقًا.`,syntax:`<p v-if="cond">…</p><p v-else>…</p>`,example:`<p v-if="items.length === 0">القائمة فارغة</p>
<ul v-else>…</ul>`,related:[`vue-v-show`,`vue-v-for`],ref:Q(`guide/essentials/conditional.html`)},{id:`vue-v-show`,term:`v-show`,say:`v show`,pron:`ڤي شو`,tech:`vue`,cat:`توجيه`,ar:`الإظهار والإخفاء`,meaning:`يُظهر العنصر أو يخفيه بتغيير display فقط.`,explain:`العنصر يبقى في DOM دائمًا. أنسب من v-if للعناصر التي تتبدّل كثيرًا، بينما v-if أنسب عندما نادرًا ما يتغير الشرط.`,syntax:`<div v-show="open">…</div>`,example:`<div v-show="menuOpen" class="menu">…</div>`,related:[`vue-v-if`],ref:Q(`guide/essentials/conditional.html#v-show`)},{id:`vue-v-for`,term:`v-for`,say:`v for`,pron:`ڤي فور`,tech:`vue`,cat:`توجيه`,ar:`التكرار`,meaning:`يكرر العنصر لكل عنصر في مصفوفة أو كائن أو مدى عددي.`,explain:`اكتب دائمًا :key بقيمة فريدة ومستقرة (مثل id) ليتعرّف Vue على كل عنصر عند إعادة الترتيب. لا تستخدم v-if وv-for على العنصر نفسه.`,syntax:`<li v-for="item in items" :key="item.id">`,example:`<li v-for="(todo, i) in todos" :key="todo.id">
  {{ i + 1 }}. {{ todo.text }}
</li>`,related:[`vue-key`,`js-array`],ref:Q(`guide/essentials/list.html`)},{id:`vue-key`,term:`:key`,say:`key`,pron:`كي`,tech:`vue`,cat:`توجيه`,ar:`المفتاح`,meaning:`معرّف فريد يساعد Vue على تتبّع هوية كل عنصر في القوائم.`,explain:`بدون مفتاح مستقر قد يعيد Vue استخدام عناصر DOM بشكل خاطئ (مثل بقاء نص حقل في الصف الخطأ بعد الحذف). تجنّب الفهرس كمفتاح إن كانت القائمة تتغير ترتيبًا أو حذفًا.`,syntax:`:key="item.id"`,example:`<TodoItem v-for="t in todos" :key="t.id" :todo="t" />`,related:[`vue-v-for`],ref:Q(`api/built-in-special-attributes.html#key`)},{id:`vue-v-bind`,term:`v-bind ( : )`,say:`v bind`,pron:`ڤي بايند`,tech:`vue`,cat:`توجيه`,ar:`ربط السمات`,meaning:`يربط سمة HTML أو prop بتعبير JavaScript.`,explain:`الاختصار نقطتان: :src="url". مع class وstyle يقبل كائنات: :class="{ active: isActive }" يضيف الصنف عندما تكون القيمة صادقة.`,syntax:`:attr="expression"`,example:`<img :src="user.avatar" :alt="user.name">
<li :class="{ done: todo.done }">`,related:[`vue-directive`,`vue-props`],ref:Q(`guide/essentials/template-syntax.html#attribute-bindings`)},{id:`vue-v-on`,term:`v-on ( @ )`,say:`v on`,pron:`ڤي أون`,tech:`vue`,cat:`توجيه`,ar:`الاستماع للأحداث`,meaning:`يربط دالة أو تعبيرًا بحدث.`,explain:`الاختصار @: @click="inc". المعدِّلات تختصر عمليات شائعة: @submit.prevent يستدعي preventDefault، و@keyup.enter للمفتاح Enter فقط.`,syntax:`@event="handler"`,example:`<button @click="count++">+1</button>
<form @submit.prevent="save">…</form>`,related:[`js-addeventlistener`,`vue-emits`],ref:Q(`guide/essentials/event-handling.html`)},{id:`vue-v-model`,term:`v-model`,say:`v model`,pron:`ڤي مودِل`,tech:`vue`,cat:`توجيه`,ar:`الربط ثنائي الاتجاه`,meaning:`يربط قيمة حقل إدخال بمتغير تفاعلي في الاتجاهين.`,explain:`الكتابة في الحقل تغيّر المتغير، وتغيير المتغير يغيّر الحقل. يعمل مع input وtextarea وselect وcheckbox. معدِّلات: .trim و.number و.lazy.`,syntax:`<input v-model="name">`,example:`<input v-model.trim="newTodo" placeholder="مهمة جديدة">
<p>تكتب: {{ newTodo }}</p>`,related:[`html-input`,`vue-ref`],ref:Q(`guide/essentials/forms.html`)},{id:`vue-props`,term:`Props (defineProps)`,say:`props`,pron:`بروبس`,tech:`vue`,cat:`مكوّنات`,ar:`الخصائص الممرَّرة`,meaning:`بيانات يمررها المكوّن الأب إلى الابن.`,explain:`تُعرّف في الابن بـ defineProps. الـ props للقراءة فقط داخل الابن (تدفق أحادي الاتجاه)؛ إن أراد الابن تغييرًا فإنه يطلق حدثًا للأب.`,syntax:`const props = defineProps({ title: String })`,example:`<script setup>
const props = defineProps({ title: { type: String, required: true } })
<\/script>
<template><h3>{{ title }}</h3></template>`,related:[`vue-emits`,`vue-component`],ref:Q(`guide/components/props.html`)},{id:`vue-emits`,term:`Emits (defineEmits)`,say:`emits`,pron:`إيمِتس`,tech:`vue`,cat:`مكوّنات`,ar:`الأحداث المخصصة`,meaning:`أحداث يطلقها المكوّن الابن ليخبر الأب بما حدث.`,explain:`تُعرّف بـ defineEmits وتُطلق بـ emit("name", payload). الأب يستمع لها بـ @name.`,syntax:`const emit = defineEmits(["remove"])`,example:`<script setup>
const emit = defineEmits(["remove"])
<\/script>
<template><button @click="emit('remove')">حذف</button></template>`,related:[`vue-props`,`vue-v-on`],ref:Q(`guide/components/events.html`)},{id:`vue-slot`,term:`Slot`,say:`slot`,pron:`سلوت`,tech:`vue`,cat:`مكوّنات`,ar:`الفتحة`,meaning:`مكان في قالب المكوّن يملؤه الأب بمحتوى من عنده.`,explain:`مفيد لمكوّنات «الإطار» مثل البطاقة أو النافذة المنبثقة. الفتحات المسمّاة تسمح بعدة أماكن.`,syntax:`<slot />`,example:`<!-- Card.vue -->
<div class="card"><slot /></div>
<!-- الاستخدام -->
<Card><p>أي محتوى</p></Card>`,related:[`vue-component`],ref:Q(`guide/components/slots.html`)},{id:`vue-lifecycle`,term:`Lifecycle hooks (onMounted…)`,say:`lifecycle hooks`,pron:`لايف سايكل هوكس`,tech:`vue`,cat:`دورة الحياة`,ar:`خطافات دورة الحياة`,meaning:`دوال تُستدعى في مراحل حياة المكوّن: بعد التركيب، بعد التحديث، قبل الإزالة.`,explain:`onMounted مناسب لما يحتاج DOM جاهزًا أو لبدء جلب بيانات. onUnmounted لتنظيف المؤقتات والمستمعات حتى لا تبقى تعمل.`,syntax:`onMounted(() => { … })`,example:`import { onMounted, onUnmounted } from "vue"
let id
onMounted(() => { id = setInterval(tick, 1000) })
onUnmounted(() => clearInterval(id))`,related:[`vue-component`],ref:Q(`guide/essentials/lifecycle.html`)},{id:`vue-nexttick`,term:`nextTick()`,say:`next tick`,pron:`نِكست تِك`,tech:`vue`,cat:`تفاعلية`,ar:`الدورة التالية`,meaning:`ينتظر حتى يطبّق Vue تحديثات DOM المعلّقة.`,explain:`Vue يجمّع التغييرات ويحدّث DOM دفعة واحدة لاحقًا لا فورًا. إن احتجت قراءة DOM بعد تغيير البيانات مباشرة فانتظر nextTick.`,syntax:`await nextTick()`,example:`count.value++
await nextTick()
console.log(el.textContent) // القيمة المحدّثة`,related:[`vue-reactivity`],ref:Q(`api/general.html#nexttick`)},{id:`vue-scoped`,term:`<style scoped>`,say:`scoped style`,pron:`سكوبت ستايل`,tech:`vue`,cat:`تنسيق`,ar:`تنسيق محصور`,meaning:`يحصر قواعد CSS في عناصر هذا المكوّن فقط.`,explain:`يضيف Vue سمة فريدة (data-v-xxxx) لعناصر المكوّن ويعدّل المحددات لتطابقها، فلا تتسرب القواعد إلى مكوّنات أخرى.`,syntax:`<style scoped> … </style>`,example:`<style scoped>
.title { color: teal; } /* لا يؤثر على .title في مكوّن آخر */
</style>`,related:[`vue-sfc`,`css-selector`],ref:Q(`api/sfc-css-features.html#scoped-css`)},{id:`vue-composable`,term:`Composable`,say:`composable`,pron:`كومبوزابل`,tech:`vue`,cat:`أنماط`,ar:`الدالة التركيبية`,meaning:`دالة تبدأ عادة بـ use تغلّف منطقًا تفاعليًا قابلًا لإعادة الاستخدام بين المكوّنات.`,explain:`تستخدم ref وcomputed وwatch وخطافات دورة الحياة داخلها وتُرجع ما يحتاجه المكوّن.`,syntax:`function useX() { …; return { … } }`,example:`export function useCounter(start = 0) {
  const count = ref(start)
  const inc = () => count.value++
  return { count, inc }
}`,related:[`vue-ref`,`js-closure`],ref:Q(`guide/reusability/composables.html`)}],Ta={html:{key:`html`,label:`HTML`,name:`الهيكل`},css:{key:`css`,label:`CSS`,name:`التنسيق`},js:{key:`js`,label:`JavaScript`,name:`السلوك`},vue:{key:`vue`,label:`Vue 3`,name:`الواجهات التفاعلية`}},Ea=[...xa,...Sa,...Ca,...wa],Da=Object.fromEntries(Ea.map(e=>[e.id,e]));function Oa(e){return String(e||``).toLowerCase().replace(/[ً-ْٰـ]/g,``).replace(/[إأآٱ]/g,`ا`).replace(/ى/g,`ي`).replace(/ة/g,`ه`).replace(/ؤ/g,`و`).replace(/ئ/g,`ي`).replace(/[<>(){}.:@\-_/]/g,` `).replace(/\s+/g,` `).trim()}var ka=Ea.map(e=>({t:e,primary:Oa(`${e.term} ${e.ar}`),secondary:Oa(`${e.say} ${e.pron} ${e.meaning} ${e.cat}`),body:Oa(`${e.explain} ${e.syntax}`)}));function Aa(e,t=`all`){let n=Oa(e),r=ka.filter(e=>t===`all`||e.t.tech===t);if(!n)return r.map(e=>e.t);let i=n.split(` `),a=[];for(let e of r){let t=0;for(let n of i)if(e.primary.split(` `).includes(n))t+=10;else if(e.primary.includes(n))t+=6;else if(e.secondary.includes(n))t+=3;else if(e.body.includes(n))t+=1;else{t=0;break}t>0&&a.push([t,e.t])}return a.sort((e,t)=>t[0]-e[0]).map(e=>e[1])}var ja=e=>/^h[1-6]$/.test(e)?Da[`html-h1`]:Da[`html-${e}`]||null,Ma={color:`css-color`,"background-color":`css-background`,background:`css-background`,"font-size":`css-font-size`,"font-family":`css-font-family`,"font-weight":`css-font-weight`,"line-height":`css-line-height`,"text-align":`css-text-align`,margin:`css-margin`,padding:`css-padding`,border:`css-border`,"border-radius":`css-border-radius`,"box-sizing":`css-box-sizing`,width:`css-width`,"max-width":`css-width`,"min-width":`css-width`,height:`css-width`,"max-height":`css-width`,"min-height":`css-width`,display:`css-display`,"flex-direction":`css-flex-direction`,"justify-content":`css-justify`,"align-items":`css-align-items`,gap:`css-gap`,"row-gap":`css-gap`,"column-gap":`css-gap`,flex:`css-flex-item`,"flex-grow":`css-flex-item`,"flex-shrink":`css-flex-item`,"flex-basis":`css-flex-item`,"grid-template-columns":`css-grid-template`,"grid-template-rows":`css-grid-template`,"grid-column":`css-grid-template`,"grid-row":`css-grid-template`,position:`css-position`,top:`css-position`,left:`css-position`,right:`css-position`,bottom:`css-position`,inset:`css-position`,"z-index":`css-z-index`,transition:`css-transition`,animation:`css-animation`,"animation-name":`css-animation`,transform:`css-transform`,opacity:`css-opacity`,"box-shadow":`css-box-shadow`,overflow:`css-overflow`},Na=e=>{if(Ma[e])return Da[Ma[e]];let t=e.replace(/-(top|right|bottom|left|inline|block|inline-start|inline-end|block-start|block-end)$/,``);return Ma[t]?Da[Ma[t]]:/^(margin|padding)-(inline|block)/.test(e)?Da[`css-logical`]:null},Pa=[{id:`ch-reverse-words`,kind:`js`,level:1,track:`js`,title:`اعكس الكلمات`,prompt:"اكتب `reverseWords(sentence)` تُرجع الجملة بترتيب كلمات معكوس. الكلمات مفصولة بمسافة واحدة، وتجاهل المسافات الزائدة في الطرفين.",starter:`function reverseWords(sentence) {
  
}
`,solution:`function reverseWords(sentence) {
  return sentence.trim().split(" ").reverse().join(" ")
}`,hints:[`split(" ") يقسم النص إلى مصفوفة كلمات.`,`reverse ثم join(" ").`],spec:{exports:[`reverseWords`],cases:[{call:`reverseWords`,args:[`أنا أحب البرمجة`],expect:`البرمجة أحب أنا`},{call:`reverseWords`,args:[`  hello world `],expect:`world hello`},{call:`reverseWords`,args:[`كلمة`],expect:`كلمة`}]}},{id:`ch-palindrome`,kind:`js`,level:1,track:`js`,title:`هل هي متناظرة؟`,prompt:"اكتب `isPalindrome(text)` تُرجع true إن كان النص يُقرأ بالاتجاهين نفسه بعد تجاهل المسافات وحالة الأحرف.",starter:`function isPalindrome(text) {
  
}
`,solution:`function isPalindrome(text) {
  const clean = text.toLowerCase().split(" ").join("")
  return clean === [...clean].reverse().join("")
}`,hints:[`نظّف النص أولًا: أحرف صغيرة وبلا مسافات.`,`قارن النص بنسخته المعكوسة.`],spec:{exports:[`isPalindrome`],cases:[{call:`isPalindrome`,args:[`Racecar`],expect:!0},{call:`isPalindrome`,args:[`never odd or even`],expect:!0},{call:`isPalindrome`,args:[`سطر`],expect:!1},{call:`isPalindrome`,args:[`باب`],expect:!0}]}},{id:`ch-fizzbuzz`,kind:`js`,level:1,track:`js`,title:`فِز باز`,prompt:'اكتب `fizzBuzz(n)` تُرجع مصفوفة نصوص من 1 إلى n: مضاعفات 3 تصبح "Fizz"، ومضاعفات 5 تصبح "Buzz"، ومضاعفات الاثنين "FizzBuzz"، والباقي الرقم كنص.',starter:`function fizzBuzz(n) {
  
}
`,solution:`function fizzBuzz(n) {
  const out = []
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push("FizzBuzz")
    else if (i % 3 === 0) out.push("Fizz")
    else if (i % 5 === 0) out.push("Buzz")
    else out.push(String(i))
  }
  return out
}`,hints:[`افحص مضاعفات 15 أولًا.`,`String(i) يحوّل العدد لنص.`],spec:{exports:[`fizzBuzz`],cases:[{call:`fizzBuzz`,args:[5],expect:[`1`,`2`,`Fizz`,`4`,`Buzz`]},{call:`fizzBuzz`,args:[15],expect:[`1`,`2`,`Fizz`,`4`,`Buzz`,`Fizz`,`7`,`8`,`Fizz`,`Buzz`,`11`,`Fizz`,`13`,`14`,`FizzBuzz`]},{call:`fizzBuzz`,args:[0],expect:[]}]}},{id:`ch-unique`,kind:`js`,level:2,track:`js`,title:`إزالة التكرار`,prompt:"اكتب `unique(arr)` تُرجع مصفوفة جديدة بلا تكرار مع **الحفاظ على ترتيب أول ظهور**، دون تعديل الأصل.",starter:`function unique(arr) {
  
}
`,solution:`function unique(arr) {
  return [...new Set(arr)]
}`,hints:[`Set تخزن القيم الفريدة بترتيب الإدخال.`,`أو استخدم filter مع indexOf.`],spec:{exports:[`unique`],cases:[{call:`unique`,args:[[3,1,3,2,1]],expect:[3,1,2]},{call:`unique`,args:[[`أ`,`ب`,`أ`]],expect:[`أ`,`ب`]},{call:`unique`,args:[[]],expect:[]}],checks:[{title:`لا تعديل للأصل`,check:`({ exports }) => { const a = [1, 1, 2]; exports.unique(a); return a.length === 3 }`}]}},{id:`ch-count-chars`,kind:`js`,level:2,track:`js`,title:`عدّاد الحروف`,prompt:"اكتب `countChars(text)` تُرجع كائنًا مفاتيحه الحروف وقيمه عدد مرات ظهورها، متجاهلة المسافات.",starter:`function countChars(text) {
  
}
`,solution:`function countChars(text) {
  const out = {}
  for (const ch of text) {
    if (ch === " ") continue
    out[ch] = (out[ch] || 0) + 1
  }
  return out
}`,hints:["ابدأ بكائن فارغ `{}`.","`(out[ch] || 0) + 1` يعالج أول ظهور."],spec:{exports:[`countChars`],cases:[{call:`countChars`,args:[`باب`],expect:{ب:2,ا:1}},{call:`countChars`,args:[`a a b`],expect:{a:2,b:1}},{call:`countChars`,args:[``],expect:{}}]}},{id:`ch-chunk`,kind:`js`,level:2,track:`js`,title:`التقسيم إلى مجموعات`,prompt:"اكتب `chunk(arr, size)` تقسم المصفوفة إلى مصفوفات صغيرة طول كل منها size (الأخيرة قد تكون أقصر).",starter:`function chunk(arr, size) {
  
}
`,solution:`function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}`,hints:[`حلقة تقفز بمقدار size، وslice(i, i + size).`],spec:{exports:[`chunk`],cases:[{call:`chunk`,args:[[1,2,3,4,5],2],expect:[[1,2],[3,4],[5]]},{call:`chunk`,args:[[1,2,3],3],expect:[[1,2,3]]},{call:`chunk`,args:[[],2],expect:[]}]}},{id:`ch-group-by`,kind:`js`,level:3,track:`js`,title:`التجميع حسب مفتاح`,prompt:"اكتب `groupBy(items, key)` تُرجع كائنًا يجمع العناصر حسب قيمة الخاصية key. مثال: تجميع الطلاب حسب المدينة.",starter:`function groupBy(items, key) {
  
}
`,solution:`function groupBy(items, key) {
  return items.reduce((acc, it) => {
    const k = it[key]
    ;(acc[k] ||= []).push(it)
    return acc
  }, {})
}`,hints:[`reduce بقيمة ابتدائية {}.`,"`acc[k] = acc[k] || []` ثم push."],spec:{exports:[`groupBy`],cases:[{call:`groupBy`,args:[[{n:`أ`,c:`جدة`},{n:`ب`,c:`الرياض`},{n:`ج`,c:`جدة`}],`c`],expect:{جدة:[{n:`أ`,c:`جدة`},{n:`ج`,c:`جدة`}],الرياض:[{n:`ب`,c:`الرياض`}]}},{call:`groupBy`,args:[[],`x`],expect:{}}]}},{id:`ch-flatten`,kind:`js`,level:3,track:`js`,title:`تسطيح المصفوفات المتداخلة`,prompt:"اكتب `flatten(arr)` تُرجع مصفوفة مسطحة بالكامل مهما كان عمق التداخل، **دون** استخدام `Array.prototype.flat`.",starter:`function flatten(arr) {
  
}
`,solution:`function flatten(arr) {
  const out = []
  for (const x of arr) {
    if (Array.isArray(x)) out.push(...flatten(x))
    else out.push(x)
  }
  return out
}`,hints:[`الاستدعاء الذاتي (recursion): إذا كان العنصر مصفوفة فسطّحه هو أيضًا.`,`Array.isArray للتحقق.`],spec:{exports:[`flatten`],cases:[{call:`flatten`,args:[[1,[2,[3,[4]]],5]],expect:[1,2,3,4,5]},{call:`flatten`,args:[[[],[[]]]],expect:[]}],checks:[{title:`بدون flat()`,check:`({ source }) => !source.includes('.flat(') || 'المطلوب حلها دون flat'`}]}},{id:`ch-center`,kind:`dom`,level:1,track:`css`,title:`وسّط الصندوق`,prompt:"وسّط `.box` أفقيًا وعموديًا داخل `.stage` باستخدام Flexbox أو Grid (لا تستخدم position أو هوامش محسوبة).",editable:[`css`],readonly:[`html`],starter:{html:`<div class="stage">
  <div class="box">أنا في المنتصف؟</div>
</div>`,css:`.stage { height: 260px; background: #f1f5f9; }
.box { width: 140px; padding: 16px; background: #6366f1; color: white; }
`},solution:{css:`.stage { height: 260px; background: #f1f5f9; display: grid; place-items: center; }
.box { width: 140px; padding: 16px; background: #6366f1; color: white; }`},hints:["Grid: `display: grid; place-items: center;`","Flexbox: `display: flex; justify-content: center; align-items: center;`"],checks:[{title:`متوسط أفقيًا وعموديًا`,test:`({ $ }) => { const s = $('.stage').getBoundingClientRect(); const b = $('.box').getBoundingClientRect(); return Math.abs((s.left + s.width / 2) - (b.left + b.width / 2)) < 1.5 && Math.abs((s.top + s.height / 2) - (b.top + b.height / 2)) < 1.5 }`},{title:`بدون position`,test:`({ css }) => css('.box', 'position') === 'static'`},{title:`الحاوية flex أو grid`,test:`({ css }) => ['flex', 'grid'].includes(css('.stage', 'display'))`}]},{id:`ch-dark-toggle`,kind:`dom`,level:2,track:`js`,title:`زر الوضع الداكن`,prompt:"عند النقر على `#theme` يُضاف الصنف `dark` إلى `body` أو يُزال، ويتغيّر نص الزر بين **داكن** و**فاتح** (يعرض الوضع الذي سينتقل إليه)، وتعكس سمة `aria-pressed` الحالة.",editable:[`js`],readonly:[`html`,`css`],starter:{html:`<button id="theme" aria-pressed="false">داكن</button>
<p>نص تجريبي</p>`,css:`body.dark { background: #0f172a; color: #e2e8f0; }`,js:``},solution:{js:`const btn = document.querySelector("#theme")
btn.addEventListener("click", () => {
  const on = document.body.classList.toggle("dark")
  btn.textContent = on ? "فاتح" : "داكن"
  btn.setAttribute("aria-pressed", String(on))
})`},hints:["`classList.toggle` تُرجع true إن أضافت الصنف.",`setAttribute يقبل نصًا: String(on).`],checks:[{title:`النقر يفعّل الوضع الداكن`,test:`async ({ click, doc, text, $ }) => { await click('#theme'); return doc.body.classList.contains('dark') && text('#theme') === 'فاتح' && $('#theme').getAttribute('aria-pressed') === 'true' }`},{title:`النقر ثانية يعيد الوضع الفاتح`,test:`async ({ click, doc, text, $ }) => { await click('#theme'); return !doc.body.classList.contains('dark') && text('#theme') === 'داكن' && $('#theme').getAttribute('aria-pressed') === 'false' }`}]},{id:`ch-vue-stepper`,kind:`vue`,level:2,track:`vue`,title:`عدّاد بحدود`,prompt:"عدّاد قيمته بين 0 و5. الزر `#minus` ينقص والزر `#plus` يزيد، ويصبح الزر **معطّلًا** (disabled) عند الوصول للحد. القيمة تُعرض في `#value`.",starter:`<script setup>
import { ref } from "vue"

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref } from "vue"
const v = ref(0)
<\/script>

<template>
  <button id="minus" :disabled="v <= 0" @click="v--">−</button>
  <span id="value">{{ v }}</span>
  <button id="plus" :disabled="v >= 5" @click="v++">+</button>
</template>
`,hints:[`:disabled="v <= 0"`],checks:[{title:`يبدأ من 0 والزر − معطّل`,test:`({ text, $ }) => text('#value') === '0' && $('#minus').disabled && !$('#plus').disabled`},{title:`لا يتجاوز 5 والزر + يتعطّل`,test:`async ({ click, text, $ }) => { for (let i = 0; i < 7; i++) await click('#plus'); return text('#value') === '5' && $('#plus').disabled && !$('#minus').disabled }`},{title:`ينقص عند −`,test:`async ({ click, text }) => { await click('#minus'); return text('#value') === '4' }`}]}],Fa=[{id:`p-profile-card`,kind:`dom`,level:1,track:`html`,title:`بطاقة تعريف شخصية`,summary:`أول مشروع: بطاقة دلالية أنيقة بصورة واسم ونبذة وروابط — HTML + CSS.`,skills:[`HTML الدلالي`,`الصور وalt`,`Flexbox`,`نموذج الصندوق`],editable:[`html`,`css`],starter:{html:`<!-- ابنِ البطاقة هنا -->
`,css:`body { font-family: Tahoma, sans-serif; background: #f8fafc; }
`},solution:{html:`<article class="profile">
  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%2370d6c3'/%3E%3C/svg%3E" alt="صورة رمزية دائرية بلون فيروزي">
  <h2>ريم العتيبي</h2>
  <p>مطوّرة واجهات تتعلم Vue وتحب التصميم الواضح.</p>
  <ul class="links">
    <li><a href="#">مدونتي</a></li>
    <li><a href="#">مشاريعي</a></li>
  </ul>
</article>`,css:`body { font-family: Tahoma, sans-serif; background: #f8fafc; }
.profile { box-sizing: border-box; max-width: 360px; margin: 40px auto; padding: 24px; background: white; border-radius: 16px; text-align: center; box-shadow: 0 8px 24px rgb(0 0 0 / 8%); }
.profile img { width: 96px; height: 96px; border-radius: 50%; }
.links { display: flex; justify-content: center; gap: 16px; list-style: none; padding: 0; }`},hints:["ابدأ بـ `article` كحاوية، فالبطاقة محتوى مستقل.","لتوسيط البطاقة: `max-width` مع `margin: 0 auto`.","روابطك في `ul` واجعلها `display: flex`."],requirements:[{text:"البطاقة عنصر `article` بالصنف `profile`",points:10,test:`({ $ }) => !!$('article.profile')`},{text:`صورة داخل البطاقة لها alt وصفي (5 أحرف+)`,points:15,test:`({ $ }) => { const i = $('.profile img'); return !!i && (i.getAttribute('alt') || '').trim().length >= 5 }`},{text:"اسم في `h2` ونبذة في `p`",points:10,test:`({ $, text }) => text('.profile h2').length > 0 && text('.profile p').length > 10`},{text:"قائمة روابط `ul.links` فيها رابطان على الأقل",points:10,test:`({ $$ }) => $$('.profile ul.links li a').length >= 2`},{text:`أقصى عرض للبطاقة 360px وهي متوسطة أفقيًا`,points:20,test:`({ $, doc }) => { const r = $('.profile').getBoundingClientRect(); const W = doc.documentElement.clientWidth; return r.width <= 360.5 && (W < 380 || Math.abs((r.left + r.width / 2) - W / 2) < 2) }`},{text:`الصورة دائرية (border-radius 50%)`,points:10,test:`({ css }) => { const v = css('.profile img', 'border-top-left-radius'); return v === '50%' || parseFloat(v) >= parseFloat(css('.profile img', 'width')) / 2 }`},{text:`الروابط مصفوفة بـ Flexbox مع gap`,points:15,test:`({ css }) => css('.links', 'display') === 'flex' && parseFloat(css('.links', 'column-gap')) > 0`},{text:`زوايا البطاقة مستديرة وظل خفيف`,points:10,test:`({ css }) => parseFloat(css('.profile', 'border-top-left-radius')) > 0 && css('.profile', 'box-shadow') !== 'none'`}]},{id:`p-landing`,kind:`dom`,level:2,track:`css`,title:`صفحة هبوط متجاوبة`,summary:`صفحة منتج كاملة: ترويسة وقسم بطولي وشبكة مزايا تتحول من عمود إلى ثلاثة أعمدة.`,skills:[`HTML الدلالي`,`Grid`,`media queries`,`المتغيرات`],editable:[`html`,`css`],starter:{html:`<header>
  
</header>
<main>
  
</main>
<footer></footer>
`,css:`:root {
  --brand: hsl(250 70% 55%);
}
`},solution:{html:`<header class="site">
  <strong>نُهى</strong>
  <nav><a href="#features">المزايا</a> <a href="#">الأسعار</a></nav>
</header>
<main>
  <section class="hero">
    <h1>نظّم يومك في دقائق</h1>
    <p>تطبيق مهام بسيط وسريع.</p>
    <a class="cta" href="#">ابدأ مجانًا</a>
  </section>
  <section id="features" class="features">
    <article class="feature"><h3>سريع</h3><p>…</p></article>
    <article class="feature"><h3>آمن</h3><p>…</p></article>
    <article class="feature"><h3>مجاني</h3><p>…</p></article>
  </section>
</main>
<footer>© 2026</footer>`,css:`:root {
  --brand: hsl(250 70% 55%);
}
.site { display: flex; justify-content: space-between; align-items: center; padding: 16px; }
.hero { text-align: center; padding: 48px 16px; }
.cta { display: inline-block; background: var(--brand); color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; }
.features { display: grid; gap: 16px; padding: 16px; }
@media (min-width: 700px) {
  .features { grid-template-columns: repeat(3, 1fr); }
}`},hints:["المزايا: ثلاثة `article.feature` داخل `section.features`.",`نهج الجوال أولًا: عمود واحد خارج media query.`,"زر الدعوة رابط `a.cta` بخلفية `var(--brand)`."],requirements:[{text:"ترويسة `header` فيها `nav` بروابط",points:10,test:`({ $$ }) => $$('header nav a').length >= 2`},{text:"قسم `.hero` فيه `h1` واحد ورابط `.cta`",points:15,test:`({ $, $$ }) => $$('h1').length === 1 && !!$('.hero h1') && !!$('.hero a.cta')`},{text:"لون خلفية `.cta` يأتي من متغير `--brand`",points:15,test:`({ css, doc, color }) => { const v = getComputedStyle(doc.documentElement).getPropertyValue('--brand').trim(); return !!v && css('.cta', 'background-color') === color(v) }`},{text:"ثلاث مزايا `article.feature` داخل `section.features`",points:10,test:`({ $$ }) => $$('section.features > article.feature').length === 3`},{text:`المزايا شبكة Grid بعمود واحد افتراضيًا`,points:15,test:`({ css, doc }) => css('.features', 'display') === 'grid' && [...doc.styleSheets].every((sh) => { try { return [...sh.cssRules].every((r) => !(r.selectorText === '.features' && r.style.gridTemplateColumns)) } catch (e) { return true } })`},{text:`media query بـ min-width تجعلها 3 أعمدة`,points:25,test:`({ doc }) => [...doc.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => r.media && /min-width/.test(r.media.mediaText) && [...r.cssRules].some((x) => x.selectorText === '.features' && /repeat\\(3|1fr 1fr 1fr/.test(x.style.gridTemplateColumns))) } catch (e) { return false } })`},{text:"تذييل `footer` خارج `main`",points:10,test:`({ $ }) => !!$('footer') && !$('main footer')`}]},{id:`p-todo-js`,kind:`dom`,level:2,track:`js`,title:`قائمة مهام بـ JavaScript`,summary:`تطبيق مهام حقيقي بدون مكتبات: إضافة وإنجاز وحذف وعدّاد — الحالة في مصفوفة والواجهة تُبنى منها.`,skills:[`DOM`,`الأحداث`,`المصفوفات`,`النماذج`],editable:[`html`,`css`,`js`],starter:{html:`<form id="add-form">
  <label for="task">مهمة جديدة</label>
  <input id="task" autocomplete="off">
  <button type="submit">إضافة</button>
</form>
<ul id="list"></ul>
<p>المتبقي: <span id="left">0</span></p>`,css:`.done span { text-decoration: line-through; opacity: .6; }
`,js:`const todos = []

function render() {
  // ابنِ عناصر li من todos
}
`},solution:{html:`<form id="add-form">
  <label for="task">مهمة جديدة</label>
  <input id="task" autocomplete="off">
  <button type="submit">إضافة</button>
</form>
<ul id="list"></ul>
<p>المتبقي: <span id="left">0</span></p>`,css:`.done span { text-decoration: line-through; opacity: .6; }`,js:`let todos = []
let nextId = 1
const list = document.querySelector("#list")
const input = document.querySelector("#task")

function render() {
  list.innerHTML = ""
  for (const t of todos) {
    const li = document.createElement("li")
    li.classList.toggle("done", t.done)
    const span = document.createElement("span")
    span.textContent = t.text
    span.addEventListener("click", () => { t.done = !t.done; render() })
    const del = document.createElement("button")
    del.textContent = "حذف"
    del.className = "delete"
    del.addEventListener("click", () => { todos = todos.filter((x) => x.id !== t.id); render() })
    li.append(span, " ", del)
    list.append(li)
  }
  document.querySelector("#left").textContent = todos.filter((t) => !t.done).length
}

document.querySelector("#add-form").addEventListener("submit", (e) => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return
  todos.push({ id: nextId++, text, done: false })
  input.value = ""
  render()
})
render()`},hints:["كل `li` فيه `span` للنص وزر بالصنف `delete`.","النقر على span يبدّل `done` ثم استدعِ render.",`استخدم textContent للنص (لا innerHTML) لتجنّب الحقن.`],requirements:[{text:`إضافة مهمة عبر النموذج (مع trim)`,points:20,test:`async ({ input, submit, $$ }) => { await input('#task', '  شراء خبز '); await submit('#add-form'); const li = $$('#list li'); return li.length === 1 && li[0].querySelector('span') && li[0].querySelector('span').textContent === 'شراء خبز' }`},{text:`تفريغ الحقل بعد الإضافة وتجاهل الفارغ`,points:10,test:`async ({ input, submit, $, $$ }) => { const empty = $('#task').value === ''; await input('#task', '   '); await submit('#add-form'); return empty && $$('#list li').length === 1 }`},{text:`النقر على نص المهمة يبدّل الصنف done`,points:20,test:`async ({ input, submit, $$, click }) => { await input('#task', 'مهمة ثانية'); await submit('#add-form'); await click($$('#list li span')[0]); const a = $$('#list li')[0].classList.contains('done'); await click($$('#list li span')[0]); const b = !$$('#list li')[0].classList.contains('done'); return a && b }`},{text:`العدّاد يعرض المهام غير المنجزة`,points:20,test:`async ({ text, click, $$ }) => { const before = text('#left'); await click($$('#list li span')[0]); const after = text('#left'); await click($$('#list li span')[0]); return before === '2' && after === '1' || before + '→' + after }`},{text:`زر .delete يحذف المهمة الصحيحة`,points:20,test:`async ({ click, $$ }) => { await click($$('#list li .delete')[0]); const t = $$('#list li span').map((s) => s.textContent); return t.length === 1 && t[0] === 'مهمة ثانية' }`},{text:`النص يُعرض كنص لا كـ HTML (أمان)`,points:10,test:`async ({ input, submit, $$ }) => { await input('#task', '<b>x</b>'); await submit('#add-form'); const last = $$('#list li span').pop(); return last.textContent === '<b>x</b>' && !last.querySelector('b') }`}]},{id:`p-gradebook`,kind:`js`,level:2,track:`js`,title:`محلل الدرجات`,summary:`معالجة بيانات حقيقية: متوسطات وأعلى طالب وتقديرات وتقرير منسق — كلها دوال مختبرة.`,skills:[`الدوال`,`المصفوفات`,`map/filter/reduce`,`الكائنات`],starter:`// كل طالب: { name: "…", scores: [عدد, …] }

function average(scores) {
  
}

function topStudent(students) {
  
}

function letter(avg) {
  
}

function report(students) {
  
}
`,solution:`function average(scores) {
  if (scores.length === 0) return 0
  const avg = scores.reduce((s, x) => s + x, 0) / scores.length
  return Math.round(avg * 10) / 10
}

function topStudent(students) {
  if (students.length === 0) return null
  let best = students[0]
  for (const s of students) if (average(s.scores) > average(best.scores)) best = s
  return best.name
}

function letter(avg) {
  if (avg >= 90) return "A"
  if (avg >= 80) return "B"
  if (avg >= 70) return "C"
  if (avg >= 60) return "D"
  return "F"
}

function report(students) {
  return students.map((s) => {
    const avg = average(s.scores)
    return \`\${s.name}: \${avg} (\${letter(avg)})\`
  })
}`,hints:[`average: تقريب لمنزلة عشرية واحدة: Math.round(x * 10) / 10.`,`topStudent: عند التعادل يبقى الأول.`,`report: map إلى نص بالصيغة المطلوبة.`],requirements:[{text:"`average(scores)` متوسط مقرّب لمنزلة واحدة، و0 للفارغة",points:25,spec:{exports:[`average`],cases:[{call:`average`,args:[[90,80,70]],expect:80},{call:`average`,args:[[85,90,92]],expect:89},{call:`average`,args:[[1,2]],expect:1.5},{call:`average`,args:[[100,95,96]],expect:97},{call:`average`,args:[[]],expect:0}]}},{text:"`topStudent(students)` اسم صاحب أعلى متوسط (الأول عند التعادل، null للفارغة)",points:25,spec:{exports:[`topStudent`],cases:[{call:`topStudent`,args:[[{name:`سلمى`,scores:[70,80]},{name:`خالد`,scores:[95,85]},{name:`منى`,scores:[90,90]}]],expect:`خالد`},{call:`topStudent`,args:[[{name:`أ`,scores:[80]},{name:`ب`,scores:[80]}]],expect:`أ`},{call:`topStudent`,args:[[]],expect:null}]}},{text:"`letter(avg)`: A ≥90، B ≥80، C ≥70، D ≥60، وإلا F",points:20,spec:{exports:[`letter`],cases:[{call:`letter`,args:[90],expect:`A`},{call:`letter`,args:[89.9],expect:`B`},{call:`letter`,args:[70],expect:`C`},{call:`letter`,args:[60],expect:`D`},{call:`letter`,args:[59],expect:`F`}]}},{text:"`report(students)` مصفوفة نصوص: `الاسم: المتوسط (التقدير)`",points:30,spec:{exports:[`report`],cases:[{call:`report`,args:[[{name:`سلمى`,scores:[70,80]},{name:`خالد`,scores:[95,85]}]],expect:[`سلمى: 75 (C)`,`خالد: 90 (A)`]},{call:`report`,args:[[]],expect:[]}]}}]},{id:`p-quiz-vue`,kind:`vue`,level:3,track:`vue`,title:`تطبيق اختبار تفاعلي`,summary:`اختبار بأسئلة متعددة الخيارات: سؤال واحد في كل مرة، تقدّم، نتيجة نهائية، وإعادة.`,skills:[`ref وcomputed`,`v-for وv-if`,`الأحداث`,`حالة التطبيق`],starter:`<script setup>
import { ref, computed } from "vue"
const questions = [
  { q: "ما ناتج 2 + 2؟", options: ["3", "4", "5"], answer: 1 },
  { q: "أي لغة للتنسيق؟", options: ["HTML", "CSS", "JS"], answer: 1 },
  { q: "ما الذي يجعل Vue تفاعليًا؟", options: ["ref", "div", "alert"], answer: 0 },
]

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref, computed } from "vue"
const questions = [
  { q: "ما ناتج 2 + 2؟", options: ["3", "4", "5"], answer: 1 },
  { q: "أي لغة للتنسيق؟", options: ["HTML", "CSS", "JS"], answer: 1 },
  { q: "ما الذي يجعل Vue تفاعليًا؟", options: ["ref", "div", "alert"], answer: 0 },
]
const index = ref(0)
const score = ref(0)
const selected = ref(null)
const finished = computed(() => index.value >= questions.length)
const current = computed(() => questions[index.value])
function choose(i) { selected.value = i }
function next() {
  if (selected.value === null) return
  if (selected.value === current.value.answer) score.value++
  selected.value = null
  index.value++
}
function restart() { index.value = 0; score.value = 0; selected.value = null }
<\/script>

<template>
  <section v-if="!finished">
    <p class="progress">السؤال {{ index + 1 }} من {{ questions.length }}</p>
    <h2 class="question">{{ current.q }}</h2>
    <button v-for="(o, i) in current.options" :key="o" class="option" :class="{ selected: selected === i }" @click="choose(i)">{{ o }}</button>
    <button id="next" :disabled="selected === null" @click="next">التالي</button>
  </section>
  <section v-else>
    <p id="result">نتيجتك {{ score }} من {{ questions.length }}</p>
    <button id="restart" @click="restart">أعد الاختبار</button>
  </section>
</template>
`,hints:[`حالات: index وscore وselected. وfinished محسوبة.`,"أزرار الخيارات بالصنف `option`، والمحدد يأخذ الصنف `selected`.","النتيجة في `#result` بالصيغة: «نتيجتك X من 3»."],requirements:[{text:"يعرض السؤال الأول في `.question` مع التقدم `.progress` «السؤال 1 من 3»",points:15,test:`({ text }) => text('.question') === 'ما ناتج 2 + 2؟' && text('.progress') === 'السؤال 1 من 3'`},{text:"خيارات `.option` لكل سؤال، والزر `#next` معطّل حتى الاختيار",points:15,test:`({ $$, $ }) => $$('.option').length === 3 && $('#next').disabled`},{text:"اختيار خيار يضيف له الصنف `selected` ويفعّل التالي",points:15,test:`async ({ $$, $, click }) => { await click($$('.option')[1]); return $$('.option')[1].classList.contains('selected') && !$$('.option')[0].classList.contains('selected') && !$('#next').disabled }`},{text:`التنقل للسؤال التالي`,points:15,test:`async ({ click, text }) => { await click('#next'); return text('.progress') === 'السؤال 2 من 3' && text('.question') === 'أي لغة للتنسيق؟' }`},{text:"حساب النتيجة النهائية بدقة في `#result`",points:25,test:`async ({ $$, click, text }) => { await click($$('.option')[0]); await click('#next'); await click($$('.option')[0]); await click('#next'); return text('#result') === 'نتيجتك 2 من 3' || text('#result') }`},{text:"`#restart` يعيد الاختبار من البداية والنتيجة صفر",points:15,test:`async ({ click, text, $$ }) => { await click('#restart'); await click($$('.option')[0]); await click('#next'); await click($$('.option')[0]); await click('#next'); await click($$('.option')[2]); await click('#next'); return text('#result') === 'نتيجتك 0 من 3' }`}]},{id:`p-shop-vue`,kind:`vue`,level:3,track:`vue`,title:`متجر مصغّر بسلة شراء`,summary:`قائمة منتجات وسلة: إضافة وكميات وحذف وإجمالي محسوب وحالة فارغة — كما في المتاجر الحقيقية.`,skills:[`computed`,`v-for مع key`,`الأحداث`,`تحديث الحالة بأمان`],starter:`<script setup>
import { ref, computed } from "vue"
const products = [
  { id: 1, name: "كوب", price: 25 },
  { id: 2, name: "دفتر", price: 15 },
  { id: 3, name: "قلم", price: 5 },
]

<\/script>

<template>
  
</template>
`,solution:`<script setup>
import { ref, computed } from "vue"
const products = [
  { id: 1, name: "كوب", price: 25 },
  { id: 2, name: "دفتر", price: 15 },
  { id: 3, name: "قلم", price: 5 },
]
const cart = ref([])
function add(p) {
  const line = cart.value.find((l) => l.id === p.id)
  if (line) line.qty++
  else cart.value.push({ ...p, qty: 1 })
}
function dec(line) {
  line.qty--
  if (line.qty <= 0) remove(line)
}
function remove(line) { cart.value = cart.value.filter((l) => l.id !== line.id) }
const count = computed(() => cart.value.reduce((s, l) => s + l.qty, 0))
const total = computed(() => cart.value.reduce((s, l) => s + l.qty * l.price, 0))
<\/script>

<template>
  <ul class="products">
    <li v-for="p in products" :key="p.id">{{ p.name }} — {{ p.price }} <button class="add" @click="add(p)">أضف</button></li>
  </ul>
  <p>في السلة: <span id="count">{{ count }}</span></p>
  <p v-if="!cart.length" class="empty">السلة فارغة</p>
  <ul v-else class="cart">
    <li v-for="l in cart" :key="l.id" class="line">
      <span class="name">{{ l.name }}</span> × <span class="qty">{{ l.qty }}</span>
      <button class="dec" @click="dec(l)">−</button>
      <button class="remove" @click="remove(l)">حذف</button>
    </li>
  </ul>
  <p>الإجمالي: <strong id="total">{{ total }}</strong></p>
</template>
`,hints:["السلة مصفوفة أسطر `{ id, name, price, qty }`.",`إضافة منتج موجود تزيد qty بدل سطر جديد.`,`count وtotal محسوبتان من السلة.`],requirements:[{text:"عرض المنتجات مع أزرار `.add`، والسلة فارغة `.empty` مبدئيًا",points:10,test:`({ $$, $ }) => $$('.products li .add').length === 3 && !!$('.empty') && !$('.cart')`},{text:"إضافة منتج تنشئ سطرًا `.line` في `.cart`",points:15,test:`async ({ $$, click, text }) => { await click($$('.add')[0]); return $$('.cart .line').length === 1 && text('.cart .line .name') === 'كوب' }`},{text:"إضافة المنتج نفسه تزيد الكمية `.qty` لا الأسطر",points:20,test:`async ({ $$, click }) => { await click($$('.add')[0]); return $$('.cart .line').length === 1 && $$('.cart .line .qty')[0].textContent.trim() === '2' }`},{text:"`#count` و`#total` محسوبان بدقة",points:25,test:`async ({ $$, click, text }) => { await click($$('.add')[2]); return text('#count') === '3' && text('#total') === '55' || text('#count') + ' / ' + text('#total') }`},{text:"`.dec` ينقص الكمية ويحذف السطر عند الصفر",points:15,test:`async ({ $$, click, text }) => { const pen = () => $$('.cart .line').find((l) => l.querySelector('.name').textContent === 'قلم'); await click(pen().querySelector('.dec')); return !pen() && text('#total') === '50' }`},{text:"`.remove` يحذف السطر، وتعود حالة السلة الفارغة",points:15,test:`async ({ $$, $, click, text }) => { await click($$('.cart .remove')[0]); return !!$('.empty') && text('#total') === '0' && text('#count') === '0' }`}]}],Ia=[...Pa,...Fa],La=Object.fromEntries(Ia.map(e=>[e.id,e])),Ra={class:`pal`,role:`dialog`,"aria-modal":`true`,"aria-label":`بحث سريع`},za={class:`pal-in`},Ba=[`aria-selected`,`onMouseenter`,`onClick`],Va={class:`txt`},Ha={class:`l`},Ua={key:0,class:`h`},Wa={class:`k`},Ga={key:0,class:`empty`},Ka=Ee({__name:`CommandPalette`,setup(e){let t=An(),n=f(``),r=f(0),i=f(null),o=[{label:`المحرر`,hint:`HTML وCSS وJS وVue مع معاينة`,to:`/editor`,icon:`code`},{label:`شرح الأكواد`,hint:`الصق كودًا واستكشف معناه`,to:`/explain`,icon:`lens`},{label:`مختبر CSS`,hint:`Flexbox وGrid والألوان والحركة`,to:`/css-lab`,icon:`palette`},{label:`مختبر JavaScript`,hint:`تنفيذ خطوة بخطوة`,to:`/js-lab`,icon:`terminal`},{label:`محاكي التنفيذ`,hint:`الذاكرة والاستدعاءات وحلقة الأحداث`,to:`/visualizer`,icon:`flow`},{label:`المراجعة`,hint:`بطاقات المراجعة المتباعدة`,to:`/review`,icon:`cards`},{label:`الإعدادات والنسخ الاحتياطي`,hint:`تصدير واستيراد التقدّم`,to:`/settings`,icon:`gear`}],s=T(()=>{let e=Oa(n.value),t=t=>!e||Oa(t).includes(e),r=[];for(let e of o)t(`${e.label} ${e.hint}`)&&r.push({...e,kind:`أداة`});for(let e of ma)t(`${e.title} ${e.summary} ${e.track}`)&&r.push({label:e.title,hint:e.summary,to:`/learn/${e.id}`,icon:`path`,kind:`درس · ${e.track.toUpperCase()}`});for(let e of Ia)t(`${e.title} ${e.summary||e.prompt}`)&&r.push({label:e.title,hint:e.summary||``,to:`/practice/${e.id}`,icon:`target`,kind:e.requirements?`مشروع`:`تحدٍّ`});if(e)for(let e of Aa(n.value).slice(0,12))r.push({label:`${e.term} — ${e.ar}`,hint:e.meaning,to:`/dictionary/${e.id}`,icon:`book`,kind:`قاموس`});return r.slice(0,40)});p(n,()=>{r.value=0}),p(()=>ca.open,async e=>{e&&(n.value=``,await le(),i.value?.focus())});function c(e){e&&(ca.open=!1,t.push(e.to))}function l(e){e.key===`ArrowDown`?(e.preventDefault(),r.value=Math.min(r.value+1,s.value.length-1),d()):e.key===`ArrowUp`?(e.preventDefault(),r.value=Math.max(r.value-1,0),d()):e.key===`Enter`?(e.preventDefault(),c(s.value[r.value])):e.key===`Escape`&&(ca.open=!1)}let u=f(null);async function d(){await le(),u.value?.querySelector(`.on`)?.scrollIntoView({block:`nearest`})}return(e,t)=>(k(),ue(He,{name:`fade`},{default:m(()=>[_(ca).open?(k(),O(`div`,{key:0,class:`pal-wrap`,onMousedown:t[1]||=ln(e=>_(ca).open=!1,[`self`])},[E(`div`,Ra,[E(`div`,za,[w(V,{name:`search`}),te(E(`input`,{ref_key:`input`,ref:i,"onUpdate:modelValue":t[0]||=e=>n.value=e,placeholder:`ابحث في الدروس والقاموس والأدوات…`,"aria-label":`بحث`,onKeydown:l},null,544),[[Qt,n.value]]),t[2]||=E(`kbd`,null,`Esc`,-1)]),E(`ul`,{ref_key:`list`,ref:u,class:`pal-list`,role:`listbox`},[(k(!0),O(S,null,a(s.value,(e,t)=>(k(),O(`li`,{key:e.to+t,class:xe({on:t===r.value}),role:`option`,"aria-selected":t===r.value,onMouseenter:e=>r.value=t,onClick:t=>c(e)},[w(V,{name:e.icon},null,8,[`name`]),E(`div`,Va,[E(`div`,Ha,x(e.label),1),e.hint?(k(),O(`div`,Ua,x(e.hint),1)):C(``,!0)]),E(`span`,Wa,x(e.kind),1)],42,Ba))),128)),s.value.length?C(``,!0):(k(),O(`li`,Ga,`لا نتائج لـ «`+x(n.value)+`». جرّب كلمة إنجليزية مثل flex أو عربية مثل «مصفوفة».`,1))],512),t[3]||=E(`div`,{class:`pal-foot`},[E(`kbd`,null,`↑`),E(`kbd`,null,`↓`),Se(` للتنقل · `),E(`kbd`,null,`Enter`),Se(` للفتح`)],-1)])],32)):C(``,!0)]),_:1}))}},[[`__scopeId`,`data-v-ca97bf9a`]]),qa=[`width`,`height`],Ja=Ee({__name:`BrandMark`,props:{size:{type:Number,default:30}},setup(e){return(t,n)=>(k(),O(`svg`,{width:e.size,height:e.size,viewBox:`0 0 32 32`,"aria-hidden":`true`,class:`mark`},[...n[0]||=[E(`rect`,{width:`32`,height:`32`,rx:`9`,class:`bg`},null,-1),E(`path`,{d:`M7 21h18`,class:`ln`,"stroke-width":`3`,"stroke-linecap":`round`},null,-1),E(`path`,{d:`M7 21h7`,class:`ln2`,"stroke-width":`3`,"stroke-linecap":`round`},null,-1),E(`circle`,{cx:`20.5`,cy:`12.5`,r:`3.2`,class:`dt`},null,-1)]],8,qa))}},[[`__scopeId`,`data-v-46274997`]]),Ya={class:`brand-row`},Xa={class:`nav`},Za={class:`nav-label`},Qa={key:0,class:`badge`},$a={class:`side-foot`},eo=[`title`],to={class:`row`},no=[`aria-label`],ro={class:`main-col`},io={class:`topbar only-mobile`},ao={key:0,class:`banner bad`},oo={key:1,class:`banner warn`},so={id:`main`,tabindex:`-1`},co={class:`tabbar only-mobile`,"aria-label":`تنقل سريع`},lo={class:`toasts`,"aria-live":`polite`},uo=Ee({__name:`App`,setup(e){ra();let t=jn(),n=f(!1);p(()=>t.fullPath,()=>{n.value=!1});let r=[{group:`التعلّم`,items:[{to:`/`,icon:`home`,label:`لوحتي`,exact:!0},{to:`/learn`,icon:`path`,label:`المسار التعليمي`},{to:`/review`,icon:`cards`,label:`المراجعة`,badge:`review`},{to:`/practice`,icon:`target`,label:`التدريب والمشاريع`}]},{group:`الأدوات`,items:[{to:`/editor`,icon:`code`,label:`المحرر`},{to:`/explain`,icon:`lens`,label:`شرح الأكواد`},{to:`/css-lab`,icon:`palette`,label:`مختبر CSS`},{to:`/js-lab`,icon:`terminal`,label:`مختبر JavaScript`},{to:`/visualizer`,icon:`flow`,label:`محاكي التنفيذ`}]},{group:`المراجع`,items:[{to:`/dictionary`,icon:`book`,label:`القاموس`}]}],o=[{to:`/`,icon:`home`,label:`لوحتي`,exact:!0},{to:`/learn`,icon:`path`,label:`المسار`},{to:`/editor`,icon:`code`,label:`المحرر`},{to:`/dictionary`,icon:`book`,label:`القاموس`}],s=T(()=>Yi().length),c=e=>e.exact?t.path===e.to:t.path.startsWith(e.to),l=f(0),u;re(()=>{u=setInterval(()=>l.value++,3e4)}),Oe(()=>clearInterval(u));let d=T(()=>(l.value,q.available?q.state===`error`?`تعذّر الحفظ`:q.state===`pending`?`جارٍ الحفظ…`:q.state===`synced`?`تمت المزامنة من تبويب آخر`:q.at?`حُفظ ${da(q.at)}`:`الحفظ التلقائي مفعّل`:`الحفظ المحلي غير متاح`)),te=T(()=>q.state===`error`||!q.available?`error`:q.state===`pending`?`pending`:``);function h(e){(e.ctrlKey||e.metaKey)&&e.key.toLowerCase()===`k`&&(e.preventDefault(),la())}return re(()=>window.addEventListener(`keydown`,h)),Oe(()=>window.removeEventListener(`keydown`,h)),(e,l)=>{let u=i(`RouterLink`),f=i(`RouterView`);return k(),O(S,null,[l[17]||=E(`a`,{href:`#main`,class:`skip`},`تخطَّ إلى المحتوى`,-1),E(`div`,{class:xe([`shell`,{wide:_(t).meta.wide}])},[E(`aside`,{class:xe([`side`,{open:n.value}]),"aria-label":`التنقل الرئيسي`},[E(`div`,Ya,[w(u,{to:`/`,class:`brand`,"aria-label":`سطر — الرئيسية`},{default:m(()=>[w(Ja),l[8]||=E(`span`,{class:`brand-name`},`سطر`,-1)]),_:1}),E(`button`,{class:`btn ghost icon only-mobile`,"aria-label":`إغلاق القائمة`,onClick:l[0]||=e=>n.value=!1},[w(V,{name:`close`})])]),E(`button`,{class:`search-trigger`,onClick:l[1]||=(...e)=>_(la)&&_(la)(...e)},[w(V,{name:`search`,size:16}),l[9]||=E(`span`,null,`ابحث عن درس أو مصطلح…`,-1),l[10]||=E(`kbd`,{class:`mono`},`Ctrl K`,-1)]),E(`nav`,Xa,[(k(),O(S,null,a(r,e=>E(`div`,{key:e.group,class:`nav-group`},[E(`div`,Za,x(e.group),1),(k(!0),O(S,null,a(e.items,e=>(k(),ue(u,{key:e.to,to:e.to,class:xe([`nav-item`,{active:c(e)}]),"aria-current":c(e)?`page`:void 0},{default:m(()=>[w(V,{name:e.icon},null,8,[`name`]),E(`span`,null,x(e.label),1),e.badge===`review`&&s.value?(k(),O(`span`,Qa,x(s.value),1)):C(``,!0)]),_:2},1032,[`to`,`class`,`aria-current`]))),128))])),64))]),E(`div`,$a,[E(`div`,{class:xe([`status`,te.value]),title:_(q).error||`تُحفظ كل بياناتك في هذا المتصفح تلقائيًا`},[l[11]||=E(`span`,{class:`dot`},null,-1),Se(` `+x(d.value),1)],10,eo),E(`div`,to,[w(u,{to:`/settings`,class:`btn ghost sm`},{default:m(()=>[w(V,{name:`gear`,size:16}),l[12]||=Se(` الإعدادات`,-1)]),_:1}),l[13]||=E(`span`,{class:`spacer`},null,-1),E(`button`,{class:`btn ghost sm icon`,"aria-label":_(ta)===`dark`?`الوضع الفاتح`:`الوضع الداكن`,onClick:l[2]||=(...e)=>_(ia)&&_(ia)(...e)},[w(V,{name:_(ta)===`dark`?`sun`:`moon`,size:16},null,8,[`name`])],8,no)])])],2),n.value?(k(),O(`div`,{key:0,class:`scrim`,onClick:l[3]||=e=>n.value=!1})):C(``,!0),E(`div`,ro,[E(`header`,io,[E(`button`,{class:`btn ghost icon`,"aria-label":`فتح القائمة`,onClick:l[4]||=e=>n.value=!0},[w(V,{name:`menu`})]),w(u,{to:`/`,class:`brand`},{default:m(()=>[w(Ja,{size:26}),l[14]||=E(`span`,{class:`brand-name`},`سطر`,-1)]),_:1}),l[15]||=E(`span`,{class:`spacer`},null,-1),E(`button`,{class:`btn ghost icon`,"aria-label":`بحث`,onClick:l[5]||=(...e)=>_(la)&&_(la)(...e)},[w(V,{name:`search`})]),E(`button`,{class:`btn ghost icon`,"aria-label":`تبديل الثيم`,onClick:l[6]||=(...e)=>_(ia)&&_(ia)(...e)},[w(V,{name:_(ta)===`dark`?`sun`:`moon`},null,8,[`name`])])]),_(q).corrupted?(k(),O(`div`,ao,`تعذّرت قراءة بياناتك المحفوظة (ربما تالفة)، فبدأنا بحالة جديدة. إن كانت لديك نسخة احتياطية فاستوردها من الإعدادات.`)):C(``,!0),_(q).available?C(``,!0):(k(),O(`div`,oo,`المتصفح يمنع التخزين المحلي (ربما وضع التصفح الخاص)، لذلك لن يُحفظ تقدّمك بعد إغلاق الصفحة. يمكنك تصدير نسخة احتياطية يدويًا من الإعدادات.`)),E(`main`,so,[w(f,null,{default:m(({Component:e,route:t})=>[w(He,{name:`fade`,mode:`out-in`},{default:m(()=>[(k(),ue(ee(e),{key:t.name===`lesson`||t.name===`practice-item`||t.name===`term`?t.fullPath:t.name}))]),_:2},1024)]),_:1})])]),E(`nav`,co,[(k(),O(S,null,a(o,e=>w(u,{key:e.to,to:e.to,class:xe({active:c(e)})},{default:m(()=>[w(V,{name:e.icon,size:20},null,8,[`name`]),E(`span`,null,x(e.label),1)]),_:2},1032,[`to`,`class`])),64)),E(`button`,{onClick:l[7]||=e=>n.value=!0},[w(V,{name:`dots`,size:20}),l[16]||=E(`span`,null,`المزيد`,-1)])])],2),w(Ka),E(`div`,lo,[w(Lt,{name:`fade`},{default:m(()=>[(k(!0),O(S,null,a(_(aa),e=>(k(),O(`div`,{key:e.id,class:xe([`toast`,e.kind])},x(e.text),3))),128))]),_:1})])],64)}}},[[`__scopeId`,`data-v-53adf2a6`]]),fo=`modulepreload`,po=function(e,t){return new URL(e,t).href},mo={},ho=function(e){return e.pathname.endsWith(`.css`)},go=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},$=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=po(t,n);let r=s(t),i=ho(r);return go(mo,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:fo,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},_o=_i({history:zr(),routes:[{path:`/`,name:`home`,component:()=>$(()=>import(`./DashboardView-CfNAaDm2.js`),__vite__mapDeps([0,1,2]),import.meta.url),meta:{title:`لوحتي`}},{path:`/learn`,name:`learn`,component:()=>$(()=>import(`./LearnView-BvP7y9Bu.js`),__vite__mapDeps([3,1,4]),import.meta.url),meta:{title:`المسار التعليمي`}},{path:`/learn/:id`,name:`lesson`,component:()=>$(()=>import(`./LessonView-DxH5uKrT.js`),__vite__mapDeps([5,1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]),import.meta.url),meta:{title:`درس`},props:!0},{path:`/review`,name:`review`,component:()=>$(()=>import(`./ReviewView-CKXyGQRU.js`),__vite__mapDeps([24,1,25]),import.meta.url),meta:{title:`المراجعة`}},{path:`/editor/:draft?`,name:`editor`,component:()=>$(()=>import(`./EditorView-DTWvNZmu.js`),__vite__mapDeps([26,1,9,6,7,10,11,12,13,14,15,16,17,18,19,8,27]),import.meta.url),meta:{title:`المحرر`,wide:!0},props:!0},{path:`/explain`,name:`explain`,component:()=>$(()=>import(`./ExplainView-BifRS1pL.js`),__vite__mapDeps([28,1,6,7,29,11,14,30,17,31]),import.meta.url),meta:{title:`شرح الأكواد`,wide:!0}},{path:`/css-lab`,name:`css-lab`,component:()=>$(()=>import(`./CssLabView-CLod1vZF.js`),__vite__mapDeps([32,1,10,11,12,6,7,8,30,33]),import.meta.url),meta:{title:`مختبر CSS`,wide:!0}},{path:`/js-lab`,name:`js-lab`,component:()=>$(()=>import(`./JsLabView-rmOpZbLD.js`),__vite__mapDeps([34,1,6,7,35,13,14,15,18,29,11,36]),import.meta.url),meta:{title:`مختبر JavaScript`,wide:!0}},{path:`/visualizer`,name:`visualizer`,component:()=>$(()=>import(`./VisualizerView-qbI2Oo4j.js`),__vite__mapDeps([37,1,6,7,18,35,38]),import.meta.url),meta:{title:`محاكي التنفيذ`,wide:!0}},{path:`/dictionary`,name:`dictionary`,component:()=>$(()=>import(`./DictionaryView-CDXG9GZX.js`),__vite__mapDeps([39,1,6,7,8,40]),import.meta.url),meta:{title:`القاموس`}},{path:`/dictionary/:id`,name:`term`,component:()=>$(()=>import(`./DictionaryView-CDXG9GZX.js`),__vite__mapDeps([39,1,6,7,8,40]),import.meta.url),meta:{title:`القاموس`},props:!0},{path:`/practice`,name:`practice`,component:()=>$(()=>import(`./PracticeView-JnAHGOI9.js`),__vite__mapDeps([41,1,42]),import.meta.url),meta:{title:`التدريب والمشاريع`}},{path:`/practice/:id`,name:`practice-item`,component:()=>$(()=>import(`./PracticeItemView-D8Bzrg4l.js`),__vite__mapDeps([43,1,20,9,6,7,10,11,12,13,14,15,16,17,18,19,21,22,44]),import.meta.url),meta:{title:`تحدٍّ`,wide:!0},props:!0},{path:`/settings`,name:`settings`,component:()=>$(()=>import(`./SettingsView-CjBBvIAw.js`),__vite__mapDeps([45,1,46]),import.meta.url),meta:{title:`الإعدادات والنسخ الاحتياطي`}},{path:`/selftest`,name:`selftest`,component:()=>$(()=>import(`./SelfTestView-DkPvyRin.js`),__vite__mapDeps([47,1,10,11,12,16,17,21,18,48]),import.meta.url),meta:{title:`الفحص الذاتي`}},{path:`/:pathMatch(.*)*`,name:`not-found`,component:()=>$(()=>import(`./NotFoundView-kqcY8wAP.js`),__vite__mapDeps([49,1,50]),import.meta.url),meta:{title:`غير موجود`}}],scrollBehavior(e,t,n){return n||(e.hash?{el:e.hash,behavior:`smooth`,top:80}:{top:0})}});_o.afterEach(e=>{document.title=`${e.meta.title||`سطر`} · سطر`}),pn(uo).use(_o).mount(`#app`);export{qi as A,Fi as B,Ji as C,Qi as D,Zi as E,Ui as F,$t as G,An as H,Gi as I,it as J,tn as K,Ci as L,q as M,K as N,Wi as O,Xi as P,bi as R,sa as S,Yi as T,He as U,V,Lt as W,ln as Y,pa as _,Ta as a,la as b,Aa as c,ma as d,ha as f,ya as g,va as h,Fa as i,Vi as j,$i as k,Da as l,_a as m,Pa as n,Na as o,ga as p,Qt as q,La as r,ja as s,$ as t,Ea as u,ua as v,Ki as w,da as x,fa as y,Ii as z};