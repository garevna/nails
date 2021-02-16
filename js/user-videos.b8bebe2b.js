(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-videos"],{"18e1":function(e,t,a){},2375:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},o=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("div",{staticClass:"bouncer"},[a("div"),a("div"),a("div"),a("div")])])}],s={},n=s,r=(a("9251"),a("2877")),l=Object(r["a"])(n,i,o,!1,null,"48111247",null);t["a"]=l.exports},"2f8e":function(e,t,a){"use strict";a.r(t),t["default"]={name:{label:"Name of video",type:"text",limit:60,required:!0},videoFile:{label:"Video file",type:"file",icon:"mdi-video",accept:"video/mp4",size:1e6,required:!0,progress:!0},imgFile:{label:"Image file",type:"file",icon:"mdi-camera",accept:"image/png, image/jpeg, image/bmp",size:1e4,required:!0},pdfFiles:{count:3,label:"PDF file",type:"pdfFile",icon:"mdi-file-pdf-box",accept:".pdf",size:5e4,required:!1},description:{label:"Description",type:"textarea",limit:2e3,required:!0}}},"6eaa":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-dialog",{attrs:{persistent:"","max-width":"320"},model:{value:e.localDialog,callback:function(t){e.localDialog=t},expression:"localDialog"}},[a("v-card",[a("v-card-title",[e._v(" Do you really want to remove this "+e._s(e.name)+" ?")]),a("v-card-actions",{staticClass:"justify-center"},[a("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",large:"",text:""},on:{click:e.cancelHandler}},[e._v(" Disagree ")]),a("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",large:"",text:""},on:{click:e.deleteHandler}},[e._v(" Agree ")])],1)],1)],1)},o=[],s={name:"DeletePopup",props:["cancelHandler","deleteHandler","name","dialog"],computed:{localDialog:{get:function(){return this.dialog},set:function(e){this.$emit("update:dialog",e)}}}},n=s,r=a("2877"),l=a("6544"),c=a.n(l),d=a("8336"),u=a("b0af"),v=a("99d9"),f=a("169a"),p=Object(r["a"])(n,i,o,!1,null,null,null);t["a"]=p.exports;c()(p,{VBtn:d["a"],VCard:u["a"],VCardActions:v["a"],VCardTitle:v["c"],VDialog:f["a"]})},"761f":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-row",e._l(e.data,(function(t,i){return a("v-col",{key:i,staticClass:" py-0 py-lg-2",attrs:{cols:"12",sm:"12",lg:"4"}},[a("FileInput",{attrs:{value:e.data[i],label:e.options.label,icon:e.options.icon,size:e.options.size,accept:e.options.accept,required:e.options.required},on:{"update:value":function(t){return e.$set(e.data,i,t)}}})],1)})),1)},o=[],s=a("37e9"),n={props:{pdfs:{type:Array,required:!0},options:{type:Object,required:!0}},name:"PdfInputs",components:{FileInput:s["a"]},data:function(){return{}},computed:{data:{get:function(){return this.pdfs},set:function(e){this.$emit("update:pdfs",e)}}},watch:{},methods:{}},r=n,l=a("2877"),c=a("6544"),d=a.n(c),u=a("62ad"),v=a("0fd9"),f=Object(l["a"])(r,i,o,!1,null,"69936066",null);t["a"]=f.exports;d()(f,{VCol:u["a"],VRow:v["a"]})},"7d77":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",{staticClass:"d-flex justify-center"},[a("v-col",{attrs:{cols:"12",xs:"12",align:"right"}},[e.course&&!e.course.isPaid?a("v-btn",{staticClass:"yellow-button",attrs:{rounded:"",color:"buttons",large:"","min-width":"160"},on:{click:e.payDetail}},[e._v(" pay for the course")]):e._e()],1),a("v-col",{attrs:{cols:"12",xs:"12"}},[a("h2",{attrs:{align:"center"}},[e._v(e._s(e.course&&e.course.nameOfCourse))])]),e.noVideos?a("v-col",{attrs:{cols:"12",xs:"12"}},[a("h2",{attrs:{align:"center"}},[e._v("You don't have video yet")])]):e._e(),e.ready?e._e():a("v-col",{attrs:{cols:"12",xs:"12"}},[a("Spinner")],1),e.videos&&!e.showForm?a("v-col",{staticClass:"d-flex justify-center flex-wrap",attrs:{cols:"12",xs:"12"}},e._l(e.videos,(function(t){return a("UserVideoCard",{key:t._id,attrs:{goToDetailVideo:e.goToDetailVideo,video:t,removeVideo:e.removeVideo}})})),1):e._e(),e.showForm?e._e():a("v-col",{attrs:{cols:"12",xs:"12"}},[a("v-card",{staticClass:"transparent",attrs:{flat:""}},[a("v-card-title",{staticClass:"d-flex justify-center justify-sm-start"},[e._v("On this course:")]),a("v-card-text",e._l(e.descriptions,(function(t,i){return a("p",{key:i,staticClass:"text--text"},[e._v(" "+e._s(t)+" ")])})),0)],1)],1),e.showForm?a("v-col",{attrs:{cols:"12",xs:"12",md:"6"}},[a("AddVideoForm",{attrs:{showForm:e.showForm},on:{"update:showForm":function(t){e.showForm=t},"update:show-form":function(t){e.showForm=t}}})],1):e._e(),e.showBtnAddVideo?a("v-col",{staticClass:"d-flex justify-center",attrs:{cols:"12",xs:"12"}},[a("v-btn",{staticClass:"yellow-button",attrs:{rounded:"",color:"buttons",large:"","min-width":"160"},on:{click:function(t){e.showForm=!0}}},[e._v(" add video")])],1):e._e(),a("DeletePopup",{attrs:{cancelHandler:e.cancelHandler,deleteHandler:e.deleteVideo,name:"video",dialog:e.dialog}})],1)],1)},o=[],s=(a("a4d3"),a("e01a"),a("4de4"),a("d81d"),a("ac1f"),a("1276"),a("498a"),a("96cf"),a("1da1")),n=a("5530"),r=a("2f62"),l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-hover",{attrs:{"open-delay":"100"},scopedSlots:e._u([{key:"default",fn:function(t){var i=t.hover;return[a("v-card",{staticClass:"ma-4",class:{"on-hover":i},attrs:{elevation:i?16:2,width:"500",height:"350"},on:{click:e.detailHandler}},[a("h2",{staticClass:"text-center"},[e._v(" "+e._s(e.videoName)+" ")]),a("CoverImage",{attrs:{url:e.linkCheck(e.video),height:250}}),e.published?a("v-card-actions",{staticClass:"d-flex justify-end"},[a("v-btn",{staticClass:"yellow-button",attrs:{rounded:"",color:"buttons",large:"","min-width":"160"},on:{click:function(t){return t.stopPropagation(),e.removeHandler(t)}}},[e._v("Delete")])],1):e._e()],1)]}}])})},c=[],d=(a("fb6a"),a("b0c0"),a("67bf")),u=a("a237"),v={props:["goToDetailVideo","video","removeVideo"],name:"UserVideoCard",components:{CoverImage:d["a"]},data:function(){return{}},computed:Object(n["a"])(Object(n["a"])({},Object(r["d"])("courses",["course"])),{},{videoName:function(){var e,t,a,i,o;return(null===(e=this.video)||void 0===e||null===(t=e.name)||void 0===t?void 0:t.length)<20?null===(a=this.video)||void 0===a?void 0:a.name:(null===(i=this.video)||void 0===i||null===(o=i.name)||void 0===o?void 0:o.slice(0,17))+"..."},published:function(){var e;return!(null!==this&&void 0!==this&&null!==(e=this.course)&&void 0!==e&&e.isPublished)}}),methods:{linkCheck:function(e){return Object(u["a"])(e)},detailHandler:function(){this.goToDetailVideo(this.video._id)},removeHandler:function(){this.removeVideo(this.video._id)}}},f=v,p=a("2877"),m=a("6544"),h=a.n(m),b=a("8336"),g=a("b0af"),_=a("99d9"),w=a("ce87"),y=Object(p["a"])(f,l,c,!1,null,null,null),V=y.exports;h()(y,{VBtn:b["a"],VCard:g["a"],VCardActions:_["a"],VHover:w["a"]});var C=a("6eaa"),x=a("2375"),j=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-form",{ref:"form"},e._l(e.data,(function(t,i){return a("div",{key:i},["text"===e.schema[i].type?a("TextInput",{attrs:{value:e.data[i],label:e.schema[i].label,limit:e.schema[i].limit,required:e.schema[i].required},on:{"update:value":function(t){return e.$set(e.data,i,t)}}}):e._e(),"file"===e.schema[i].type?a("FileInput",{attrs:{value:e.data[i],label:e.schema[i].label,icon:e.schema[i].icon,size:e.schema[i].size,accept:e.schema[i].accept,required:e.schema[i].required},on:{"update:value":function(t){return e.$set(e.data,i,t)}}}):e._e(),"pdfFile"===e.schema[i].type?a("PdfInputs",{attrs:{pdfs:e.data[i],options:e.schema[i]},on:{"update:pdfs":function(t){return e.$set(e.data,i,t)}}}):e._e(),"textarea"===e.schema[i].type?a("TextAreaInput",{attrs:{value:e.data[i],label:e.schema[i].label,limit:e.schema[i].limit,required:e.schema[i].required},on:{"update:value":function(t){return e.$set(e.data,i,t)}}}):e._e()],1)})),0),a("div",{staticClass:"d-flex flex-column align-center flex-sm-row justify-sm-center my-8"},[a("v-btn",{staticClass:"yellow-button mr-sm-4 mb-8 mb-sm-0",attrs:{rounded:"",color:"buttons",large:"","min-width":"160",disabled:e.disabled},on:{click:e.clearFormInputs}},[e._v("Cancel")]),a("v-btn",{staticClass:"yellow-button",attrs:{rounded:"",color:"buttons",large:"","min-width":"160",disabled:e.disabled},on:{click:e.validateForm}},[e._v("Submit")])],1)],1)},F=[],O=(a("cb29"),a("4160"),a("13d5"),a("4fad"),a("07ac"),a("159b"),a("ade3")),D=a("3835"),I=a("9284"),$=a("9d48"),k=a("37e9"),E=a("761f"),q=a("2f8e").default,A={name:"AddVideoForm",props:["showForm"],components:{TextInput:I["a"],TextAreaInput:$["a"],FileInput:k["a"],PdfInputs:E["a"]},data:function(){return{schema:q,data:Object.entries(q).reduce((function(e,t){var a=Object(D["a"])(t,2),i=a[0],o=a[1],s="";return"pdfFile"===o.type&&(s=new Array(o.count).fill(null)),"file"===o.type&&(s=null),Object.assign(e,Object(O["a"])({},i,s))}),{}),disabled:!1}},computed:Object(n["a"])({},Object(r["d"])("courses",["queue"])),watch:{queue:function(e){e.length||(this.getCourse(this.$route.params.courseid),this.disabled=!1,this.clearFormInputs())}},methods:Object(n["a"])(Object(n["a"])({},Object(r["b"])("courses",{getCourse:"GET_COURSE",addQueue:"ADD_QUEUE"})),{},{clearFormInputs:function(){this.$refs.form.reset(),this.$emit("update:showForm",!1)},sendData:function(){var e=this;this.disabled=!0;var t=new FormData,a=[];Object.entries(this.data).forEach((function(a){var i=Object(D["a"])(a,2),o=i[0],s=i[1];Array.isArray(s)?Object.values(e.data[o]).forEach((function(e){e&&t.append("files",e)})):s instanceof File?t.append("files",s):t.append(o,s)})),a.push({id:this.$route.params.courseid,lesson:t,progress:0,error:!1,index:0}),this.addQueue(a)},validateForm:function(){this.$refs.form.validate()&&this.sendData()}})},T=A,H=a("4bd4"),P=Object(p["a"])(T,j,F,!1,null,null,null),U=P.exports;h()(P,{VBtn:b["a"],VForm:H["a"]});var R={components:{Spinner:x["a"],UserVideoCard:V,DeletePopup:C["a"],AddVideoForm:U},data:function(){return{loading:!1,ready:!0,showForm:!1,dialog:!1,deleteId:null}},computed:Object(n["a"])(Object(n["a"])({},Object(r["d"])("courses",["course"])),{},{videos:function(){var e,t;return null!==(e=null===(t=this.course)||void 0===t?void 0:t.videos)&&void 0!==e?e:[]},noVideos:function(){return!this.videos.length},showBtnAddVideo:function(){return!this.course.isPublished&&!this.showForm&&this.videos.length<5},descriptions:function(){var e;return null!==(e=this.course)&&void 0!==e&&e.description?this.course.description.split("\n").map((function(e){return e.trim()})).filter((function(e){return e})):[]}}),watch:{},methods:{removeVideo:function(e){this.dialog=!0,this.deleteId=e},cancelHandler:function(){this.dialog=!1,this.deleteId=null},deleteVideo:function(){this.$store.dispatch("courses/DELETE_VIDEO",{id:this.deleteId,courseId:this.$route.params.courseid}),this.dialog=!1,this.deleteId=null},goToDetailVideo:function(e){this.$router.push({name:"user-video",params:{videoid:e}})},getVideos:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.loading=!0,t.next=3,e.$store.dispatch("courses/GET_COURSE",e.$route.params.courseid);case 3:e.loading=!1;case 4:case"end":return t.stop()}}),t)})))()},payDetail:function(){this.$router.push({name:"by-course-creator",params:{courseid:this.$route.params.courseid}})}},created:function(){this.getVideos()}},z=R,B=a("62ad"),S=a("a523"),L=a("0fd9"),N=Object(p["a"])(z,i,o,!1,null,null,null);t["default"]=N.exports;h()(N,{VBtn:b["a"],VCard:g["a"],VCardText:_["b"],VCardTitle:_["c"],VCol:B["a"],VContainer:S["a"],VRow:L["a"]})},9251:function(e,t,a){"use strict";a("18e1")},a237:function(e,t,a){"use strict";a("d3b7"),a("3ca3"),a("9911"),a("ddb0"),a("2b3d");t["a"]=function(e){var t,a;return e?e.coverImg instanceof File?URL.createObjectURL(e.coverImg):null!==(t=null===e||void 0===e||null===(a=e.coverImg)||void 0===a?void 0:a.link)&&void 0!==t?t:null:null}}}]);
//# sourceMappingURL=user-videos.b8bebe2b.js.map