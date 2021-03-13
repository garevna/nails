(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["add-course-videos"],{"00a4":function(e,t,a){"use strict";a.r(t),t["default"]={item:{name:{label:"Name of video",type:"text",limit:60,required:!0},videoFile:{label:"Video file",type:"file",icon:"mdi-video",accept:"video/mp4",size:1e6,required:!0},imgFile:{label:"Image file",type:"file",icon:"mdi-camera",accept:"image/png, image/jpeg, image/bmp",size:1e4,required:!0},pdfFiles:{count:3,label:"PDF file",type:"pdfFile",icon:"mdi-file-pdf-box",accept:".pdf",size:5e4,required:!1},description:{label:"Description",type:"textarea",limit:2e3,required:!0}},count:5}},"29fb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",[a("v-col",{staticClass:"d-flex justify-center justify-md-end",attrs:{cols:"12",xs:"12",md:"6"}},[a("v-btn",{staticClass:"yellow-button",class:{"button-unactive":e.isActive},attrs:{rounded:"",color:"buttons",large:"",dark:"","min-width":"160",disabled:!e.$route.params.courseid},on:{click:e.toggleBtn}},[e._v("CONFIRM DETAILS")])],1),a("v-col",{staticClass:"d-flex justify-center justify-md-start",attrs:{cols:"12",xs:"12",md:"6"}},[a("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",large:"",dark:"","min-width":"160"},on:{click:e.goToUserCourse}},[e._v("EDIT DETAILS")])],1),a("v-col",{attrs:{cols:"12",xs:"12",md:"4"}},[a("v-card",{staticClass:"secondaryGray",attrs:{flat:"",dark:""}},[a("v-card-title",[e._v("Requirements to the video")]),a("v-card-text",[e._v("Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, doloremque. Vel, aliquid illo, adipisci magnam ratione explicabo voluptates, aperiam voluptate inventore ea aspernatur veniam fugit animi et nihil obcaecati quibusdam!")])],1)],1),a("v-col",{attrs:{cols:"12",xs:"12",md:"8"}},[a("p",[e._v("Upload video for moderation")]),a("v-expansion-panels",{attrs:{flat:"",disabled:!e.isActive}},e._l(e.data,(function(t,n){return a("v-expansion-panel",{key:n,staticClass:"d-flex flex-column align-center align-sm-stretch justify-sm-center"},[a("v-expansion-panel-header",{staticClass:"btn-open-video mb-4",class:{"button-unactive":!e.isActive},attrs:{width:"100%"},on:{click:function(t){e.expansionIndex=n}}},[e._v(" + add video "+e._s(n+1)+" "),e.validates[n]?e._e():a("h3",{staticClass:"error-form error--text"},[e._v("error")])]),a("v-expansion-panel-content",{staticClass:"mt-8"},[a("v-form",{ref:"form"+n,refInFor:!0},[a("AddVideoItem",{attrs:{data:e.data[n]},on:{"update:data":function(t){return e.$set(e.data,n,t)}}})],1)],1)],1)})),1)],1),a("v-col",{staticClass:"pa-0 my-8 d-flex justify-center",attrs:{cols:"12",xs:"12"}},[a("v-btn",{staticClass:"yellow-button",attrs:{rounded:"",color:"buttons",large:"",dark:"","min-width":"160",disabled:e.disabledSubmit},on:{click:e.sendData}},[e._v("PROCEED AND CHECKOUT")])],1)],1)],1)},i=[],r=(a("a4d3"),a("e01a"),a("cb29"),a("4de4"),a("4160"),a("a15b"),a("d81d"),a("13d5"),a("45fc"),a("4fad"),a("b64b"),a("07ac"),a("ac1f"),a("1276"),a("159b"),a("3835")),s=(a("96cf"),a("1da1")),o=a("5530"),c=a("2f62"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",e._l(e.localData,(function(t,n){return a("div",{key:n},["text"===e.schema[n].type?a("TextInput",{attrs:{value:e.localData[n],label:e.schema[n].label,limit:e.schema[n].limit,required:e.schema[n].required},on:{"update:value":function(t){return e.$set(e.localData,n,t)}}}):e._e(),"file"===e.schema[n].type?a("FileInput",{attrs:{value:e.localData[n],label:e.schema[n].label,icon:e.schema[n].icon,size:e.schema[n].size,accept:e.schema[n].accept,required:e.schema[n].required},on:{"update:value":function(t){return e.$set(e.localData,n,t)}}}):e._e(),"pdfFile"===e.schema[n].type?a("PdfInputs",{attrs:{pdfs:e.localData[n],options:e.schema[n]},on:{"update:pdfs":function(t){return e.$set(e.localData,n,t)}}}):e._e(),"textarea"===e.schema[n].type?a("TextAreaInput",{attrs:{value:e.localData[n],label:e.schema[n].label,limit:e.schema[n].limit,required:e.schema[n].required},on:{"update:value":function(t){return e.$set(e.localData,n,t)}}}):e._e()],1)})),0)},l=[],d=a("ade3"),p=a("9284"),f=a("9d48"),m=a("37e9"),v=a("761f"),b=a("00a4").default,h={props:{data:{type:Object,default:null}},name:"AddVideoItem",components:{TextInput:p["a"],TextAreaInput:f["a"],FileInput:m["a"],PdfInputs:v["a"]},data:function(){return{schema:b.item,localData:Object.entries(b.item).reduce((function(e,t){var a=Object(r["a"])(t,2),n=a[0],i=a[1],s="";return"pdfFile"===i.type&&(s=new Array(i.count).fill(null)),"file"===i.type&&(s=null),Object.assign(e,Object(d["a"])({},n,s))}),{})}},computed:{},watch:{localData:{deep:!0,handler:function(e){this.$emit("update:data",e)}}},methods:{}},y=h,x=a("2877"),g=Object(x["a"])(y,u,l,!1,null,null,null),j=g.exports,w=a("00a4").default,C={name:"AddCourseVideos",components:{AddVideoItem:j},data:function(){return{noValid:!1,isActive:!1,disabledSubmit:!1,expansionIndex:0,data:new Array(w.count).fill(null),validates:new Array(w.count).fill(!0)}},computed:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(c["e"])("auth",["user"])),Object(c["e"])("courses",["courses","queue"])),{},{validateFull:function(){return!this.validates.some((function(e){return!e}))},videos:function(){var e,t;return null!==(e=null===this||void 0===this||null===(t=this.courses)||void 0===t?void 0:t.videos)&&void 0!==e?e:[]}}),watch:{queue:function(e){e.length||(this.goToVideos(),this.disabledSubmit=!1)}},methods:Object(o["a"])(Object(o["a"])({},Object(c["b"])("courses",{getCourse:"GET_COURSE",addQueue:"ADD_QUEUE"})),{},{isEmtyObj:function(e){var t=this,a=Object.keys(e);return!a.reduce((function(a,n){return t.isEmty(e[n])?a:a+1}),0)},isEmty:function(e){var t=!e;return Array.isArray(e)&&(t=!e.some((function(e){return!!e}))),t},validationForms:function(){var e=this;return this.noValid=!1,this.data.map((function(t,a){if(!t||e.isEmtyObj(t))return e.$refs["form".concat(a)]&&e.$refs["form".concat(a)][0].resetValidation(),e.validates[a]=!0,null;var n=!e.$refs["form".concat(a)]||e.$refs["form".concat(a)][0].validate();return e.noValid=e.noValid||!n,e.noValid?(e.validates[a]=!1,null):(e.validates[a]=!0,t)}))},sendData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var a,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a=e.validationForms(),e.$forceUpdate(),!e.noValid){t.next=4;break}return t.abrupt("return");case 4:if(a.some((function(e){return e}))){t.next=6;break}return t.abrupt("return");case 6:a.forEach((function(e){e&&(e.description=e.description.split(" ").filter((function(e){return e})).join(" "))})),e.disabledSubmit=!0,n=[],a.forEach(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a,i){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(a){t.next=2;break}return t.abrupt("return");case 2:s=new FormData,Object.entries(a).forEach((function(e){var t=Object(r["a"])(e,2),n=t[0],i=t[1];Array.isArray(a[n])?Object.values(a[n]).forEach((function(e){return e&&s.append("files",e)})):a[n]instanceof File?s.append("files",i):s.append(n,i)})),n.push({id:e.$route.params.courseid,lesson:s,progress:0,error:!1,index:i});case 5:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()),e.addQueue(n);case 11:case"end":return t.stop()}}),t)})))()},toggleBtn:function(){this.isActive=!this.isActive},goToUserCourse:function(){this.$router.push({name:"user-course",params:{courseid:this.$route.params.courseid}})},goToVideos:function(){this.$router.push({name:"user-videos"})}}),created:function(){this.getCourse(this.$route.params.courseid)},beforeDestroy:function(){}},O=C,V=(a("65eb"),a("cb293"),a("6544")),E=a.n(V),_=a("8336"),A=a("b0af"),D=a("99d9"),I=a("62ad"),$=a("a523"),q=a("cd55"),k=a("49e2"),F=a("c865"),T=a("0393"),R=a("4bd4"),P=a("0fd9"),S=Object(x["a"])(O,n,i,!1,null,"7be18239",null);t["default"]=S.exports;E()(S,{VBtn:_["a"],VCard:A["a"],VCardText:D["b"],VCardTitle:D["c"],VCol:I["a"],VContainer:$["a"],VExpansionPanel:q["a"],VExpansionPanelContent:k["a"],VExpansionPanelHeader:F["a"],VExpansionPanels:T["a"],VForm:R["a"],VRow:P["a"]})},"3a9e":function(e,t,a){},"65eb":function(e,t,a){"use strict";a("3a9e")},"761f":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",e._l(e.data,(function(t,n){return a("v-col",{key:n,staticClass:" py-0 py-lg-2",attrs:{cols:"12",sm:"12",lg:"4"}},[a("FileInput",{attrs:{value:e.data[n],label:e.options.label,icon:e.options.icon,size:e.options.size,accept:e.options.accept,required:e.options.required},on:{"update:value":function(t){return e.$set(e.data,n,t)}}})],1)})),1)},i=[],r=a("37e9"),s={props:{pdfs:{type:Array,required:!0},options:{type:Object,required:!0}},name:"PdfInputs",components:{FileInput:r["a"]},data:function(){return{}},computed:{data:{get:function(){return this.pdfs},set:function(e){this.$emit("update:pdfs",e)}}},watch:{},methods:{}},o=s,c=a("2877"),u=a("6544"),l=a.n(u),d=a("62ad"),p=a("0fd9"),f=Object(c["a"])(o,n,i,!1,null,"69936066",null);t["a"]=f.exports;l()(f,{VCol:d["a"],VRow:p["a"]})},cb293:function(e,t,a){"use strict";a("e5ee")},e5ee:function(e,t,a){}}]);
//# sourceMappingURL=add-course-videos.751412db.js.map