(async function(e,t,n){function o(e){if(e.shiftKey&&9===e.keyCode)H(!1);else if(e.shiftKey||9!==e.keyCode){if(!e.ctrlKey)return;if(13==e.keyCode)k();else if(84==e.keyCode)v();else if(82==e.keyCode)R(!1);else if(83==e.keyCode)r("search");else if(90==e.keyCode)r("zoom");else{if(65!=e.keyCode)return;j()}}else Q(!1);e.preventDefault()}function i(e){if(e.shiftKey&&9===e.keyCode)C(L(ae.index));else if(e.shiftKey||9!==e.keyCode){if(!e.ctrlKey)return;if(82!=e.keyCode)return;C(L(ae.index))}else C(L(ae.index));e.preventDefault()}function r(e){le(e).focus()}function s(){const e=[];return n.outputs.forEach((t,n)=>{e.push(t.name)}),e}function l(e){const t=n.getOutputByName(e);return a(t),t}function a(e){e?(le("connected").style.display="flex",le("disconnected").style.display="none"):(le("connected").style.display="none",le("disconnected").style.display="flex")}function c(){let t=!1;ae.port||(t=p());const n="List of available MIDI ports:\n"+s().toString().replaceAll(","," / ")+"\n\n";if(ae.firmware2){const t="Osmose Port 1:",o=e.prompt(n+t,ae.port);if(null===o)return;ae.port=o,Y(),o&&!l(o)&&e.alert(`Cannot connect to '${o}'.`)}const o="Osmose Port 2:",i=e.prompt(n+o,ae.port2);null!==i&&(ae.port2=i,Y(),i&&!l(i)&&e.alert(`Cannot connect to '${i}'.`),ae.firmware2||(ae.port=ae.port2,Y()),t&&se())}function f(e){let t="";return ae.firmware2&&1===e?d()?t="Osmose Port 1":h()?t="Osmose":m():d()?t="Osmose Port 2":h()?t="MIDIOUT2 (Osmose)":m(),t}function u(){let t="";return t=e.navigator.userAgentData?e.navigator.userAgentData.platform:e.navigator.platform,t.toLowerCase()}function d(){return u().startsWith("mac")}function h(){return u().startsWith("win")}function m(){return u().startsWith("linux")}function p(){let t="Is Osmose Firmware v2.x installed?";const n=e.confirm(t),o=ae.firmware2!==n;return ae.firmware2=n,ae.port=f(1),ae.port2=f(2),Y(),o}async function y(){let e;e=ae.firmware2?"./osmose-presets-2.json":"./osmose-presets-1.json";const t=await fetch(e),n=await t.json();return n}function g(e){const n=le("list");n.replaceChildren(),e.forEach(e=>{const o=t.createElement("div");o.textContent=e.name,o.addEventListener("click",v),o.addEventListener("dblclick",k),o.preset=e,o.className="item",n.appendChild(o)})}function k(e){const t=e&&e.target?e.target:E(ae.index);t&&x(t)}function v(e){const t=e&&e.target?e.target:E(ae.index);t&&(U(t)?w(ae.transpose?60:ae.keynote,!1):x(t))}function x(e){z(e),M(e,!0),C(e.preset)}function C(e){const t=l(ae.port);t&&(ae.firmware2?t.sendControlChange(0,e.cc0).sendProgramChange(e.pc):t.channels[16].sendControlChange(0,e.cc0).sendControlChange(32,e.cc32).sendProgramChange(e.pc)),ae.index=N(e),ae.transpose=!1,P(e.name),Y()}function w(e,t=!0){if(60===e&&60===ae.keynote)return P(E(ae.index).preset.name);const n=l(ae.port2);n&&n.channels[16].sendControlChange(44,e),ae.transpose=60!==e,t&&(ae.keynote=e),P(E(ae.index).preset.name),Y()}function b(){return le("list").children}function E(e){const t=b();return t[e]}function L(e){const t=E(e);return t.preset}function N(e){return ce.findIndex(t=>t.name==e.name)}function I(e){e.className="item"}function O(e){e.className="highlight"}function z(e){U(e)||(fe&&(F(fe)?O(fe):I(fe)),e.className="selected",fe=e)}function M(e,t){e&&e.scrollIntoView({behavior:t?"smooth":"auto",block:"center",inline:"center"})}function P(t){if(ae.transpose){const e=ae.keynote-60,n=` (${e>0?"+":""}${e})`;le("title").innerText=t+n}else le("title").innerText=t;ae.title&&e.innerWidth<=768&&(le("header").style.justifyContent="center",le("title").style.display="flex",le("toolbar").style.display="none",ue&&clearTimeout(ue),ue=setTimeout(()=>{le("title").style.display="none",le("toolbar").style.display="flex"},1e3))}function S(e){ae.zoom=parseFloat(e.target.value),Y(),$(ae.zoom)}function $(e){le("zoom").value=e,le("list").style.fontSize=`${e}em`,M(fe,!1)}function j(){ae.align=ae.align>=3?1:ae.align+1,Y(),D(ae.align)}function D(e){le("align-left").style.display="none",le("align-center").style.display="none",le("align-right").style.display="none",1===e?le("align-left").style.display="block":2===e?le("align-center").style.display="block":le("align-right").style.display="block";const t=1===e?"left":2===e?"center":"right",n=b();for(let e=0;e<n.length;e++)n[e].style.textAlign=t}function K(e){let t=e.target.value;const[n,o]=t.split("!");if("reset"===o)return T(""),void re();if("restart"===o)return T(n),void se();if("off"!==o){if("dark"===o)return T(n),ne("dark"),void te("dark");if("light"===o)return T(n),ne("light"),void te("light");if("auto"===o)return T(n),ne(""),void te("");if("title"===o)ae.title=!ae.title,P(E(ae.index).preset.name);else if("scroll"===o)ae.scroll=!ae.scroll;else if("string"==typeof o){const t=parseInt(o);if(t>=-48&&t<=48){const e=60+t;w(e,!0),ae.keynote=e,T(n)}else if(isNaN(t))try{const t=Utilities.toNoteNumber(o);w(t,!0),ae.keynote=t,T(n)}catch(e){}return}T(n),W(n)}else T(n)}function T(e){le("search").value=e,ae.search=e,Y()}function W(e){le("search").value=e;const n=b();for(let e=0;e<n.length;e++){const t=n[e];U(t)||(F(t)?O(t):I(t))}let o=ce.length;ae.search&&(o=J().length),t.title=`Osmose Presets v${ae.firmware2?2:1} (${o})`}function A(){return le("search").value}function B(){return le("search").value.length>0}function F(e){return B()&&e.innerText.includes(A())}function J(){let e=[];const t=b();for(let n=0;n<t.length;n++){const o=t[n];F(o)&&e.push(n)}return e}function U(e){return"selected"===e.className}function V(e){return"highlight"===e.className}function q(e=ae.index+1){let t=-1;const n=b();for(let o=e;o<n.length;o++){if(!B()){t=o;break}if(V(n[o])){t=o;break}}return ae.scroll&&-1===t&&(t=q(0)),t}function G(e=ae.index-1){let t=-1;const n=b();for(let o=e;o>=0;o--){if(!B()){t=o;break}if(V(n[o])){t=o;break}}return ae.scroll&&-1===t&&(t=G(n.length-1)),t}function H(e=!0){const t=G();-1!==t&&X(t,e)}function Q(e=!0){const t=q();-1!==t&&X(t,e)}function R(e=!0){let t;const n=J();if(B()&&n.length>1){if(t=Math.floor(Math.random()*n.length),n[t]===ae.index)return R(e);X(n[t],e)}else if(!B()&&ce.length>1){if(t=Math.floor(Math.random()*ce.length),t===ae.index)return R(e);X(t,e)}}function X(e,t=!0){ae.index=e;const n=E(e);z(n),M(n,!0),t&&C(n.preset)}function Y(){localStorage.setItem("state",JSON.stringify(ae))}function Z(){const e=localStorage.getItem("state");let t;return null===e?t={port:"",port2:"",firmware2:!1,title:!0,scroll:!1,transpose:!1,keynote:60,index:0,search:"",zoom:1,align:1,theme:""}:"string"==typeof e&&(t=JSON.parse(e)),t}function _(){localStorage.removeItem("state")}function ee(e){te(ae.theme)}function te(n){if(!n){const t=e.matchMedia("(prefers-color-scheme: dark)").matches;n=t?"dark":"light"}t.documentElement.setAttribute("data-theme",n)}function ne(e){ae.theme=e,Y()}function oe(t){e.innerWidth<=768?(le("header").style.justifyContent="center",le("title").style.display="none"):(le("header").style.justifyContent="space-between",le("title").style.display="flex");const n=E(ae.index);n&&M(n,!1)}function ie(){te(ae.theme),ae.index>=0&&X(ae.index,!0),l(ae.port),l(ae.port2),W(ae.search),$(ae.zoom),D(ae.align)}function re(){_(),se()}function se(){e.location.reload()}const le=e=>t.getElementById(e);await n.enable();let ae=Z();const ce=await y();g(ce),t.body.addEventListener("keydown",o),t.body.addEventListener("keyup",i),le("connected").addEventListener("click",c),le("disconnected").addEventListener("click",c);let fe=null,ue=null;le("zoom").addEventListener("input",S),le("align").addEventListener("click",j),le("search").addEventListener("change",K),le("previous").addEventListener("click",H),le("next").addEventListener("click",Q),le("random").addEventListener("click",R),e.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",ee),e.addEventListener("resize",oe),ie()})(window,document,WebMidi);