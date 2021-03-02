(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["course-online"],{"46bc":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",[t.course?s("CourseDetail",{attrs:{course:t.course,type:"online",btnTitle:"BUY THIS COURSE"}}):t._e()],1)},a=[],n=s("5530"),c=s("2f62"),o=s("95db"),i={name:"OnlineCourse",components:{CourseDetail:o["a"]},data:function(){return{}},computed:Object(n["a"])({},Object(c["d"])("courses",["course"])),methods:{btnCallBack:function(){this.$router.push({name:"personal-data"})}},mounted:function(){this.$store.dispatch("courses/GET_COURSE",this.$route.params.courseid)},beforeDestroy:function(){}},l=i,u=s("2877"),d=s("6544"),f=s.n(d),p=s("a523"),v=Object(u["a"])(l,r,a,!1,null,"65e5cd6e",null);e["default"]=v.exports;f()(v,{VContainer:p["a"]})},"8bd4":function(t,e,s){"use strict";s("a287")},"95db":function(t,e,s){"use strict";var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:"",dark:""}},[s("v-row",[s("v-col",{staticClass:"d-flex flex-column justify-space-between align-center align-sm-start",attrs:{cols:"12",xs:"12",order:"2",sm:"6","order-sm":"2"}},[s("v-card",{staticClass:"mb-8 transparent",attrs:{flat:"",dark:""}},[s("v-card-title",{staticClass:"pa-0 pl-4"},[t._v(t._s(t.course.category))]),s("v-card-text",{staticClass:"pa-0 pl-4 buttons--text d-flex"},[t._v(t._s(t.type)+" course")]),s("v-card-title",{staticClass:"pa-0 pl-4"},[t._v(t._s(t.course.nameOfCourse))]),s("v-card-text",{staticClass:"pa-0 pl-4 text-start"},[t._v(t._s(t.course.subtitle))]),s("v-card-title",{staticClass:"pa-0 pl-4 buttons--text"},[t._v(t._s(t.course.accessDays)+" days | $ "+t._s(t.course.price))])],1),"online"===t.type?s("v-card",{staticClass:"transparent",attrs:{flat:"",dark:""}},[t.course.isPaid?t._e():s("v-card-text",{staticClass:"pa-0 pl-4 pb-4 d-flex notPaidAndPublished--text"},[s("h3",[t._v("this course has not been paid for yet")])]),t.course.isPublished?t._e():s("v-card-text",{staticClass:"pa-0 pl-4 d-flex notPaidAndPublished--text"},[s("h3",[t._v("this course has not been published yet")])])],1):t._e(),"offline"===t.type?s("v-card",{staticClass:"transparent d-flex flex-column align-center",attrs:{flat:"",dark:""}},[s("v-card-title",[t._v("Date of courses:")]),s("table",t._l(t.course.dateOfCourses,(function(e){return s("tr",{key:e._id},[s("td",[t._v(t._s(e.date))]),s("td",[t._v("available spots "+t._s(e.availableSpots))])])})),0)],1):t._e(),s("v-card",{staticClass:"transparent d-flex flex-column align-center",attrs:{flat:"",dark:""}},[s("v-card-title",[t._v("This course is cuitable for:")]),s("ul",t._l(t.course.thisCourseIsSuitableFor,(function(e,r){return s("li",{key:r},[t._v(" "+t._s(e)+" ")])})),0)],1)],1),s("v-col",{attrs:{cols:"12",xs:"12",order:"1",sm:"6","order-sm":"2",align:"center",justify:"center"}},[s("CoverImage",{attrs:{url:t.linkCheck(t.course)}})],1),s("v-col",{attrs:{cols:"12",xs:"12",order:"2"}},[s("v-card-text",{staticClass:"mt-16 whitefone--text d-flex justify-center justify-sm-start"},[t._v("Author and instructor of the course: "+t._s(t.course.instructor))])],1),s("v-col",{attrs:{cols:"12",xs:"12",order:"2"}},[s("v-card",{staticClass:"transparent",attrs:{flat:"",dark:""}},[s("v-card-title",{staticClass:"d-flex justify-center justify-sm-start"},[t._v("On this course:")]),s("v-card-text",t._l(t.descriptions,(function(e,r){return s("p",{key:r},[t._v(" "+t._s(e)+" ")])})),0),s("v-card-text",[t._v(t._s(t.course.infoForBonus))])],1)],1),s("v-col",{staticClass:"d-flex justify-center justify-sm-end",attrs:{cols:"12",xs:"12",order:"2"}},[s("v-btn",{staticClass:"yellow-button mr-4",attrs:{color:"buttons",rounded:"",small:"",outlined:"",primary:"","min-width":"90"},on:{click:t.btnHandler}},[t._v(t._s("offline"===t.type?"Apply":"Buy this course"))])],1)],1)],1)},a=[],n=(s("a4d3"),s("e01a"),s("4de4"),s("d81d"),s("ac1f"),s("1276"),s("498a"),s("5530")),c=s("2f62"),o=s("67bf"),i=s("a17f"),l={name:"CourseDetail",props:{course:{type:Object,required:!0},type:{type:String,required:!0},preview:{type:Boolean,default:!1}},components:{CoverImage:o["a"]},data:function(){return{}},watch:{},computed:Object(n["a"])(Object(n["a"])({},Object(c["d"])("auth",["user"])),{},{descriptions:function(){var t;return null!==(t=this.course)&&void 0!==t&&t.description?this.course.description.split("\n").map((function(t){return t.trim()})).filter((function(t){return t})):[]}}),methods:{linkCheck:function(t){return Object(i["a"])(t)},btnHandler:function(){this.preview||(this.user?this.$router.push({name:"online"===this.type?"by-course":"by-offline",params:{courseid:this.course._id}}):this.$router.push({name:"sign-in"}))}}},u=l,d=(s("8bd4"),s("2877")),f=s("6544"),p=s.n(f),v=s("8336"),b=s("b0af"),_=s("99d9"),h=s("62ad"),m=s("a523"),C=s("0fd9"),x=Object(d["a"])(u,r,a,!1,null,"354bce1a",null);e["a"]=x.exports;p()(x,{VBtn:v["a"],VCard:b["a"],VCardText:_["b"],VCardTitle:_["c"],VCol:h["a"],VContainer:m["a"],VRow:C["a"]})},a287:function(t,e,s){}}]);
//# sourceMappingURL=course-online.f08a4664.js.map