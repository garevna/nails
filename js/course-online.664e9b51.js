(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["course-online","chunk-2d0d07bb"],{"02aa":function(t,e,r){},"0611":function(t,e,r){"use strict";r("02aa")},"46bc":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[t.course?r("CourseDetail",{attrs:{course:t.course,type:"online",btnTitle:"BUY THIS COURSE"}}):t._e()],1)},a=[],n=r("5530"),o=r("2f62"),i=r("95db"),c={name:"OnlineCourse",components:{CourseDetail:i["a"]},data:function(){return{}},computed:Object(n["a"])({},Object(o["e"])("courses",["course"])),methods:{btnCallBack:function(){this.$router.push({name:"personal-data"})}},mounted:function(){this.$store.dispatch("courses/GET_COURSE",this.$route.params.courseid)},beforeDestroy:function(){}},u=c,l=r("2877"),d=r("6544"),f=r.n(d),p=r("a523"),h=Object(l["a"])(u,s,a,!1,null,"65e5cd6e",null);e["default"]=h.exports;f()(h,{VContainer:p["a"]})},"67bf":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-img",{attrs:{src:t.imgUrl,width:t.width,height:t.height,contain:""},on:{error:function(e){t.error=!0}}})},a=[],n={name:"CoverImage",props:{url:{type:String,required:!0},height:{type:String,default:"300"},width:{type:String,default:"300"}},data:function(){return{error:!1,coverImageSrc:"".concat("https://nails-australia-staging.herokuapp.com","/img/noImage300x300.png")}},computed:{imgUrl:function(){return this.error||!this.url?this.coverImageSrc:this.url}},watch:{url:function(t){t&&(this.error=!1)}},methods:{}},o=n,i=r("2877"),c=r("6544"),u=r.n(c),l=r("adda"),d=Object(i["a"])(o,s,a,!1,null,null,null);e["default"]=d.exports;u()(d,{VImg:l["a"]})},"95db":function(t,e,r){"use strict";var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:"",dark:""}},[r("v-row",[r("v-col",{staticClass:"d-flex flex-column justify-space-between align-center align-sm-start",attrs:{cols:"12",xs:"12",order:"2",sm:"6","order-sm":"2"}},[r("v-card",{staticClass:"mb-8 transparent",attrs:{flat:"",dark:""}},[r("v-card-title",{staticClass:"pa-0 pl-4"},[t._v(t._s(t.course.category))]),r("v-card-text",{staticClass:"pa-0 pl-4 buttons--text d-flex"},[t._v(t._s(t.type)+" course")]),r("v-card-title",{staticClass:"pa-0 pl-4"},[t._v(t._s(t.course.nameOfCourse))]),r("v-card-text",{staticClass:"pa-0 pl-4 text-start"},[t._v(t._s(t.course.subtitle))]),r("v-card-title",{staticClass:"pa-0 pl-4 buttons--text"},[t._v(t._s(t.course.accessDays)+" days | $ "+t._s(t.course.price))])],1),"online"===t.type?r("v-card",{staticClass:"transparent",attrs:{flat:"",dark:""}},[t.course.isPaid?t._e():r("v-card-text",{staticClass:"pa-0 pl-4 pb-4 d-flex notPaidAndPublished--text"},[r("h3",[t._v("this course has not been paid for yet")])]),t.course.isPublished?t._e():r("v-card-text",{staticClass:"pa-0 pl-4 d-flex notPaidAndPublished--text"},[r("h3",[t._v("this course has not been published yet")])])],1):t._e(),"offline"===t.type?r("v-card",{staticClass:"transparent d-flex flex-column align-center",attrs:{flat:"",dark:""}},[r("table",[r("tr",[r("th",[t._v("Date of course")]),r("th",[t._v("Available spots")])]),t._l(t.dateOfCourses,(function(e){return r("tr",{key:e.id},[r("td",[t._v(t._s(e.date))]),r("td",{staticClass:"text-right"},[t._v(t._s(e.availableSpots))])])}))],2)]):t._e(),r("v-card",{staticClass:"transparent d-flex flex-column align-center",attrs:{flat:"",dark:""}},[r("v-card-title",[t._v("This course is cuitable for:")]),r("ul",t._l(t.course.thisCourseIsSuitableFor,(function(e,s){return r("li",{key:s},[t._v(" "+t._s(e)+" ")])})),0)],1)],1),r("v-col",{attrs:{cols:"12",xs:"12",order:"1",sm:"6","order-sm":"2",align:"center",justify:"center"}},[r("CoverImage",{attrs:{url:t.linkCheck(t.course)}})],1),r("v-col",{attrs:{cols:"12",xs:"12",order:"2"}},[r("v-card-text",{staticClass:"mt-16 whitefone--text d-flex justify-center justify-sm-start"},[t._v("Author and instructor of the course: "+t._s(t.course.instructor))])],1),r("v-col",{attrs:{cols:"12",xs:"12",order:"2"}},[r("v-card",{staticClass:"transparent",attrs:{flat:"",dark:""}},[r("v-card-title",{staticClass:"d-flex justify-center justify-sm-start"},[t._v("On this course:")]),r("v-card-text",t._l(t.descriptions,(function(e,s){return r("p",{key:s},[t._v(" "+t._s(e)+" ")])})),0),r("v-card-text",[t._v(t._s(t.course.infoForBonus))])],1)],1),r("v-col",{staticClass:"d-flex justify-center justify-sm-end",attrs:{cols:"12",xs:"12",order:"2"}},[r("v-btn",{staticClass:"yellow-button mr-4",attrs:{color:"buttons",rounded:"",small:"",outlined:"",primary:"","min-width":"90"},on:{click:t.btnHandler}},[t._v(t._s("offline"===t.type?"Apply":"Buy this course"))])],1)],1)],1)},a=[],n=(r("a4d3"),r("e01a"),r("4de4"),r("d81d"),r("ac1f"),r("1276"),r("498a"),r("5530")),o=r("2f62"),i=r("67bf"),c=r("a17f"),u=r("ff98"),l={name:"CourseDetail",props:{course:{type:Object,required:!0},type:{type:String,required:!0},preview:{type:Boolean,default:!1}},components:{CoverImage:i["default"]},data:function(){return{}},watch:{},computed:Object(n["a"])(Object(n["a"])({},Object(o["e"])("auth",["user"])),{},{descriptions:function(){var t;return null!==(t=this.course)&&void 0!==t&&t.description?this.course.description.split("\n").map((function(t){return t.trim()})).filter((function(t){return t})):[]},dateOfCourses:function(){var t=this;return this.course.dateOfCourses.map((function(e){return{date:t.formatedDate(e.date),availableSpots:e.availableSpots,id:e._id}}))}}),methods:{linkCheck:function(t){return Object(c["a"])(t)},formatedDate:function(t){var e=[];try{e=JSON.parse(t)}catch(r){}return Array.isArray(e)||(e=[]),Object(u["a"])(e)},btnHandler:function(){this.preview||(this.user?this.$router.push({name:"online"===this.type?"by-course":"by-offline",params:{courseid:this.course._id}}):this.$router.push({name:"sign-in"}))}}},d=l,f=(r("0611"),r("2877")),p=r("6544"),h=r.n(p),v=r("8336"),m=r("b0af"),b=r("99d9"),_=r("62ad"),y=r("a523"),C=r("0fd9"),x=Object(f["a"])(d,s,a,!1,null,"f0f95c44",null);e["a"]=x.exports;h()(x,{VBtn:v["a"],VCard:m["a"],VCardText:b["b"],VCardTitle:b["c"],VCol:_["a"],VContainer:y["a"],VRow:C["a"]})},a17f:function(t,e,r){"use strict";r("d3b7"),r("3ca3"),r("9911"),r("ddb0"),r("2b3d");e["a"]=function(t){var e;return t?t.photo instanceof File?URL.createObjectURL(t.photo):Array.isArray(t.photo)&&t.photo.length?null===(e=t.photo[0])||void 0===e?void 0:e.link:null:null}},ff98:function(t,e,r){"use strict";r.d(e,"a",(function(){return c}));r("a15b"),r("d81d"),r("13d5"),r("ac1f"),r("1276");var s=function(t){var e=t.split("-"),r=e.pop(),s=e.join("-"),a={month:s,days:[r]};return a},a=function(t){return t.map((function(t){return s(t)}))},n=function(t){return t.reduce((function(t,e){return t.length&&e.month===t[t.length-1].month?(t[t.length-1].days.push(e.days[0]),t):(t.push(e),t)}),[])};function o(t){return 1===t.length?"-"+t[0]:"("+t.join(", ")+")"}function i(t){return t.map((function(t){return t.month+o(t.days)})).join(", \n")}function c(t){return i(n(a(t.sort())))}}}]);
//# sourceMappingURL=course-online.664e9b51.js.map