!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VueKeybindings=t():e.VueKeybindings=t()}(window,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();t.default=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.listeners=new Map}return r(e,[{key:"addListener",value:function(e,t,n){return"function"==typeof t&&(this.listeners.has(e)||this.listeners.set(e,[]),this.listeners.get(e).unshift({callback:t,vm:n}),!0)}},{key:"removeListener",value:function(e,t,n){var r=this.listeners.get(e),o=void 0;return!!(r&&r.length&&(o=r.reduce(function(e,r,o){return"function"==typeof r.callback&&r.callback===t&&r.vm===n?e=o:e},-1))>-1)&&(r.splice(o,1),this.listeners.set(e,r),!0)}},{key:"kebabToCamel",value:function(e){return e.replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})}},{key:"emit",value:function(e){var t=this.listeners.get(this.kebabToCamel(e));if(t&&t.length){for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];for(var u=0;u<t.length;u++){var i,a=t[u];if(!1===(i=a.callback).call.apply(i,[a.vm].concat(r)))return!1}}}}]),e}())},function(e,t,n){e.exports=n(2)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=u(n(3)),o=u(n(0));function u(e){return e&&e.__esModule?e:{default:e}}t.default={install:function(e,t){t||(t={});var n=new r.default(t);e.config.globalProperties.$shortcut=n,e.mixin({created:function(){var e=this,t=this.$options.shortcuts;this.$options.shortcuts=new Proxy({},{set:function(t,n,r){return o.default.addListener(n,r,e),t[n]=r,!0},deleteProperty:function(t,n){return o.default.removeListener(n,e.$options.shortcuts[n],e),delete t.key,!0}}),t&&Object.keys(t).forEach(function(n){e.$options.shortcuts[n]=t[n]})},beforeUnmount:function(){var e=this,t=this.$options.shortcuts;t&&Object.keys(t).forEach(function(t){delete e.$options.shortcuts[t]})}})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),i=(r=u)&&r.__esModule?r:{default:r};var a=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.shortcuts=new Map;var r=t.alias||{};Object.keys(r).forEach(function(e){n.add(e,t.alias[e])}),this.onEvent()}return o(e,[{key:"emit",value:function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return i.default.emit.apply(i.default,t)}},{key:"add",value:function(e,t){var n=this.buildKey(t);this.shortcuts.has(n)||this.shortcuts.set(n,[]);var r=this.shortcuts.get(n),o=i.default.kebabToCamel(e);-1===r.indexOf(o)&&r.push(o)}},{key:"remove",value:function(e,t){var n=this.buildKey(t),r=this.shortcuts.get(n)||[],o=i.default.kebabToCamel(e),u=r.indexOf(o);u>-1&&(r.splice(u,1),0===r.length&&this.shortcuts.delete(n))}},{key:"unbind",value:function(e){var t=this.buildKey(e);return this.shortcuts.delete(t)}},{key:"clear",value:function(){this.shortcuts.clear()}},{key:"onEvent",value:function(){var e=this;document.addEventListener("keydown",function(t){!1!==i.default.emit("keydown",t)&&e.onKeydown(t)})}},{key:"onKeydown",value:function(e){for(var t=this.buildShortcut(e),n=this.shortcuts.get(t)||[],r=0;r<n.length;r++){var o=n[r];if(!1===i.default.emit(o,e))break}}},{key:"buildKey",value:function(e){return("string"==typeof e?e.split("+"):e).join("")}},{key:"buildShortcut",value:function(e){var t="";return("Shift"===e.key||e.shiftKey)&&(t+="shift"),("Control"===e.key||e.ctrlKey)&&(t+="ctrl"),("Meta"===e.key||e.metaKey)&&(t+="meta"),("Alt"===e.key||e.altKey)&&(t+="alt"),"ArrowUp"===e.key&&(t+="arrowup"),"ArrowLeft"===e.key&&(t+="arrowleft"),"ArrowRight"===e.key&&(t+="arrowright"),"ArrowDown"===e.key&&(t+="arrowdown"),"AltGraph"===e.key&&(t+="altgraph"),"Escape"===e.key&&(t+="esc"),"Enter"===e.key&&(t+="enter"),"Tab"===e.key&&(t+="tab")," "===e.key&&(t+="space"),"PageUp"===e.key&&(t+="pageup"),"PageDown"===e.key&&(t+="pagedown"),"Home"===e.key&&(t+="home"),"End"===e.key&&(t+="end"),(e.key&&" "!==e.key&&1===e.key.length||/F\d{1,2}/g.test(e.key))&&(t+=e.key.toLowerCase()),t}}]),e}();t.default=a}])});
//# sourceMappingURL=build.js.map