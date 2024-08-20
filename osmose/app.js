(async function(e,t,n){function o(e){if(e.shiftKey&&9===e.keyCode)F(!1);else if(e.shiftKey||9!==e.keyCode){if(!e.ctrlKey)return;if(82==e.keyCode)j(!1);else if(83==e.keyCode)l("search");else if(90==e.keyCode)l("zoom");else{if(65!=e.keyCode)return;l("align")}}else W(!1);e.preventDefault()}function i(e){if(e.shiftKey&&9===e.keyCode)E(I(H.index));else if(e.shiftKey||9!==e.keyCode){if(!e.ctrlKey)return;if(82==e.keyCode)E(I(H.index));else if(83==e.keyCode);else if(90==e.keyCode);else if(65!=e.keyCode)return}else E(I(H.index));e.preventDefault()}function l(e){t.getElementById(e).focus()}function r(){const e=[];return n.outputs.forEach((t,n)=>{e.push(t.name)}),e}function s(e){const o=n.getOutputByName(e);return o?(t.getElementById("connected").style.display="flex",t.getElementById("disconnected").style.display="none"):(t.getElementById("connected").style.display="none",t.getElementById("disconnected").style.display="flex"),o}function c(){H.port&&"?"!==H.port||g();let e="List of available MIDI ports:\n"+r().toString().replaceAll(","," / ");e+="\n\nEnter Osmose MIDI Port :";const t=prompt(e,H.port);H.port=t,$(),t&&"?"!==t&&!s(t)&&alert(`Cannot connect to '${t}'.`),G()}function a(){let e="";return H.firmware2?u()?e="Osmose Port 1":f()?e="Osmose":m()&&(e="?"):u()?e="Osmose Port 2":f()?e="MIDIOUT2 (Osmose)":m()&&(e="?"),e}function d(){let t="";return t=e.navigator.userAgentData?e.navigator.userAgentData.platform:e.navigator.platform,t.toLowerCase()}function u(){return d().startsWith("mac")}function f(){return d().startsWith("win")}function m(){return d().startsWith("linux")}function g(){let e="Do you have installed Osmose Firmware v2.x ? ";H.firmware2=confirm(e),H.port=a()}async function h(){let e;e=H.firmware2?"./osmose-presets-2.json":"./osmose-presets-1.json";const t=await fetch(e),n=await t.json();return n}function y(e){const n=t.getElementById("list");n.replaceChildren(),e.forEach(e=>{const o=t.createElement("div");o.textContent=e.name,o.addEventListener("click",p),o.preset=e,o.className="item",n.appendChild(o)})}function p(e){const t=e.target;C(t),x(t,!0),E(t.preset)}function E(e){const t=s(H.port);t&&(H.firmware2?t.channels[15].sendControlChange(0,e.cc0).sendProgramChange(e.pc):t.channels[15].sendControlChange(0,e.cc0).sendControlChange(32,e.cc32).sendProgramChange(e.pc)),H.index=v(e),$()}function I(e){const n=t.getElementById("list").children,o=n[e];return o.preset}function v(e){return Q.findIndex(t=>t.name==e.name)}function B(e){e.className="item"}function k(e){e.className="highlight"}function C(e){S(e)||(R&&(N(R)?k(R):B(R)),e.className="selected",R=e,t.getElementById("title").innerText=e.preset.name)}function x(e,t){e.scrollIntoView({behavior:t?"smooth":"auto",block:"center",inline:"center"})}function w(e){t.getElementById("zoom").value=e,t.getElementById("list").style.fontSize=`${e}em`,x(R,!1)}function M(e){t.getElementById("align").value=e;const n=1===e?"left":2===e?"center":"right",o=t.getElementById("list").children;for(let e=0;e<o.length;e++)o[e].style.textAlign=n}function b(e){const t=e.target.value;return"!restart"===t?G():"!reset"===t?q():void L(t)}function L(e){t.getElementById("search").value=e,H.search=e,$();const n=t.getElementById("list").children;for(let e=0;e<n.length;e++){const t=n[e];S(t)||(N(t)?k(t):B(t))}let o=n.length;H.search&&(o=D().length),t.title=`Osmose Factory Presets (${o})`}function O(){return t.getElementById("search").value}function z(){return t.getElementById("search").value.length>0}function N(e){return z()&&e.innerText.includes(O())}function D(){let e=[];const n=t.getElementById("list").children;for(let t=0;t<n.length;t++){const o=n[t];N(o)&&e.push(t)}return e}function S(e){return"selected"===e.className}function K(e){return"highlight"===e.className}function P(){let e=-1;const n=z()&&D().length>0,o=t.getElementById("list").children;for(let t=H.index+1;t<o.length;t++){const i=o[t];if(!n){e=t;break}if(K(i)){e=t;break}}return e}function A(){const e=t.getElementById("list").children,n=z()&&D().length>0;let o=-1;for(let t=H.index-1;t>=0;t--){const i=e[t];if(!n){o=t;break}if(K(i)){o=t;break}}return o}function F(e=!0){const t=A();-1!==t&&T(t,e)}function W(e=!0){const t=P();-1!==t&&T(t,e)}function j(e=!0){let t;const n=D();z()&&n.length>0?(t=Math.floor(Math.random()*n.length),t===H.index&&(t=Math.floor(Math.random()*n.length)),T(n[t],e)):(t=Math.floor(Math.random()*Q.length),t===H.index&&(t=Math.floor(Math.random()*Q.length)),T(t,e))}function T(e,n=!0){H.index=e;const o=t.getElementById("list").children,i=o[e];C(i),x(i,!0),n&&E(i.preset)}function $(){localStorage.setItem("state",JSON.stringify(H))}function J(){const e=localStorage.getItem("state");let t;return null===e?t={port:"?",firmware2:!1,index:0,search:"",zoom:1,align:1}:"string"==typeof e&&(t=JSON.parse(e)),t}function U(){localStorage.removeItem("state")}function V(){H.index>=0&&T(H.index,!0),s(H.port),L(H.search),w(H.zoom),M(H.align)}function q(){U(),G()}function G(){e.location.reload()}await n.enable();let H=J();const Q=await h();y(Q),t.body.addEventListener("keydown",o),t.body.addEventListener("keyup",i),t.getElementById("connected").addEventListener("click",c),t.getElementById("disconnected").addEventListener("click",c);let R=null;t.getElementById("zoom").oninput=function(){H.zoom=parseFloat(this.value),w(H.zoom)},t.getElementById("zoom").onchange=function(){H.zoom=parseFloat(this.value),$()},t.getElementById("align").oninput=function(){H.align=parseInt(this.value),$(),M(H.align)},t.getElementById("search").addEventListener("input",b),t.getElementById("previous").addEventListener("click",F),t.getElementById("next").addEventListener("click",W),t.getElementById("random").addEventListener("click",j),V()})(window,document,WebMidi);