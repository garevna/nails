(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20e7f902"],{a9e7:function(e,t,r){"use strict";r("e262")},e262:function(e,t,r){},ee6a:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.filteredError.length||e.filteredQueue.length?r("v-card",{staticClass:"homefone upload-dialog",attrs:{flat:""}},[r("h3",{staticClass:"text-center"},[e._v("Upload files")]),e._l(e.filteredError,(function(t,n){return r("v-progress-linear",{key:n+14,staticClass:"ma-2",attrs:{color:"error",height:"25"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.value;return[r("strong",[e._v(e._s(Math.ceil(n))+"%")])]}}],null,!0),model:{value:t.progress,callback:function(r){e.$set(t,"progress",r)},expression:"item.progress"}})})),e._l(e.filteredQueue,(function(t,n){return r("v-progress-linear",{key:n,staticClass:"ma-2",attrs:{color:"buttons",height:"25"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.value;return[r("strong",[e._v(e._s(Math.ceil(n))+"%")])]}}],null,!0),model:{value:t.progress,callback:function(r){e.$set(t,"progress",r)},expression:"item.progress"}})})),r("v-card-actions",{staticClass:"ma-2"},[e.filteredError.length&&!e.filteredQueue.length?r("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:""},on:{click:e.repeat}},[e._v("Repeat")]):e._e(),r("v-spacer"),e.filteredError.length&&!e.filteredQueue.length?r("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:""},on:{click:e.close}},[e._v("Close")]):e._e()],1)],2):e._e()},o=[],s=(r("4de4"),r("d81d"),r("5530")),l=r("2f62"),u={name:"UploadFiles",components:{},data:function(){return{}},computed:Object(s["a"])(Object(s["a"])({},Object(l["d"])("courses",["queue"])),{},{filteredQueue:function(){return this.queue.filter((function(e){return!e.error}))},filteredError:function(){return this.queue.filter((function(e){return e.error}))}}),watch:{filteredQueue:function(e,t){null!==e&&void 0!==e&&e.length&&(null===e||void 0===e?void 0:e.length)!==(null===t||void 0===t?void 0:t.length)&&this.addLesson(e[0])}},methods:Object(s["a"])(Object(s["a"])({},Object(l["b"])("courses",{addLesson:"ADD_LESSON",addQueue:"ADD_QUEUE"})),{},{repeat:function(){this.addQueue(this.filteredError.map((function(e){return Object.assign({},e,{error:!1})})))},close:function(){this.addQueue([])}}),created:function(){},beforeDestroy:function(){}},a=u,i=(r("a9e7"),r("2877")),c=r("6544"),d=r.n(c),f=r("8336"),p=r("b0af"),h=r("99d9"),v=r("8e36"),g=r("2fa4"),b=Object(i["a"])(a,n,o,!1,null,null,null);t["default"]=b.exports;d()(b,{VBtn:f["a"],VCard:p["a"],VCardActions:h["a"],VProgressLinear:v["a"],VSpacer:g["a"]})}}]);
//# sourceMappingURL=chunk-20e7f902.df3beb0b.js.map