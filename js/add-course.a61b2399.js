(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["add-course"],{"356f":function(e,t,i){"use strict";i("d22f")},"6ca7":function(e,t,i){},8547:function(e,t,i){"use strict";var s=i("2b0e"),a=i("80d2");t["a"]=s["default"].extend({name:"comparable",props:{valueComparator:{type:Function,default:a["j"]}}})},ac7c:function(e,t,i){"use strict";i("d3b7"),i("25f0");var s=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),n=(i("4de4"),i("45fc"),i("5607")),o=i("2b0e"),l=o["default"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}}),u=i("8547"),c=i("58df");function d(e){e.preventDefault()}var h=Object(c["a"])(r["a"],l,u["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return e.valueComparator(i,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=r["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:d},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:d},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var s=i.length;i=i.filter((function(i){return!e.valueComparator(i,t)})),i.length===s&&i.push(t)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(i,t)?null:t:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}});t["a"]=h.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},d22f:function(e,t,i){},ec29:function(e,t,i){},ff7b:function(e,t,i){"use strict";i.r(t);var s=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",[i("v-row",[i("v-col",{staticClass:"pa-0 mb-4",attrs:{cols:"12","offset-sm":"2",sm:"8"}},[i("v-card",{staticClass:"transparent",staticStyle:{color:"#fff"},attrs:{flat:""}},[i("v-card-title",[e._v("Portal terms of use")]),i("v-card-text",{staticStyle:{color:"#fff"}},[e._v("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel reprehenderit repellendus nesciunt voluptatibus porro saepe dicta numquam aliquid aperiam explicabo a nisi sapiente, velit, veritatis nobis. Placeat doloremque in inventore.")])],1)],1),i("v-form",{ref:"form"},[i("v-row",[i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Business name",outlined:"",dark:""},model:{value:e.businessName,callback:function(t){e.businessName=t},expression:"businessName"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required,e.rules.mailValidation],label:"E-mail",outlined:"",dark:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required,e.rules.phoneValidation],label:"Phone number",outlined:"",dark:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Author",outlined:"",dark:""},model:{value:e.author,callback:function(t){e.author=t},expression:"author"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Instructor",outlined:"",dark:""},model:{value:e.instructor,callback:function(t){e.instructor=t},expression:"instructor"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"info for bonus",outlined:"",dark:""},model:{value:e.infoForBonus,callback:function(t){e.infoForBonus=t},expression:"infoForBonus"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Category",outlined:"",dark:""},model:{value:e.category,callback:function(t){e.category=t},expression:"category"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Name of course",outlined:"",dark:""},model:{value:e.nameOfCourse,callback:function(t){e.nameOfCourse=t},expression:"nameOfCourse"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Subtitle",outlined:"",dark:""},model:{value:e.subtitle,callback:function(t){e.subtitle=t},expression:"subtitle"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Access (days)",outlined:"",dark:""},model:{value:e.access,callback:function(t){e.access=t},expression:"access"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-text-field",{attrs:{rules:[e.rules.required],label:"Price",outlined:"",dark:""},model:{value:e.price,callback:function(t){e.price=t},expression:"price"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-file-input",{attrs:{label:"Cover picture",placeholder:"Select your file","prepend-icon":"mdi-paperclip",outlined:"",dark:"","show-size":1e3},on:{change:e.Preview_image},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}}),e._l(e.courseSuitable,(function(t,s){return i("div",{key:s,staticClass:"d-flex input-container"},[i("v-text-field",{attrs:{label:e.labelForSuitable,rules:[e.rules.required],outlined:"",dark:""},model:{value:e.courseSuitable[s],callback:function(t){e.$set(e.courseSuitable,s,t)},expression:"courseSuitable[i]"}}),0!==s?i("v-btn",{staticClass:"remove",on:{click:function(t){return e.removeField(s,"suitable")}}},[i("v-icon",[e._v("mdi-delete")])],1):e._e()],1)})),i("div",{staticClass:"d-flex justify-end mb-8"},[i("v-btn",{on:{click:function(t){return e.addField("suitable")}}},[i("v-icon",[e._v("mdi-plus")])],1)],1)],2),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-textarea",{attrs:{rules:[e.rules.required],label:"Description",outlined:"",dark:"","no-resize":""},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-checkbox",{attrs:{rules:[e.rules.required],label:"Agree to privacy policy",dark:""},model:{value:e.checkbox1,callback:function(t){e.checkbox1=t},expression:"checkbox1"}})],1),i("v-col",{staticClass:"pa-0",attrs:{cols:"12","offset-sm":"4",sm:"4"}},[i("v-checkbox",{attrs:{rules:[e.rules.required],label:"Agree to portal terms of use",dark:""},model:{value:e.checkbox2,callback:function(t){e.checkbox2=t},expression:"checkbox2"}})],1),i("v-col",{staticClass:"pa-0",staticStyle:{"text-align":"center"},attrs:{cols:"12"}},[i("v-btn",{staticClass:"yellow-button mt-4",attrs:{color:"buttons",rounded:"",outlined:"",small:"",dark:"","min-width":"90",disabled:e.loading},on:{click:e.checkForm}},[e._v("submit")])],1)],1)],1)],1)],1)},a=[],r=(i("a4d3"),i("e01a"),i("4160"),i("a434"),i("4fad"),i("d3b7"),i("07ac"),i("3ca3"),i("159b"),i("ddb0"),i("2b3d"),i("3835")),n=i("5530"),o=i("2f62"),l={name:"personal-data",data:function(){return{businessName:"",email:"",phone:"",author:"",instructor:"",category:"",nameOfCourse:"",subtitle:"",access:"",price:"",infoForBonus:"",labelForSuitable:"This course is suitable for",courseSuitable:[""],file:[],description:"",checkbox1:"",checkbox2:"",url:null,rules:{required:function(e){return!!e||"input is required"},minLengthName:function(e){return e.length<=15||"the maximum number of characters entered"},mailValidation:function(e){return/^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(e)||"invalid email"},phoneValidation:function(e){return/^\({0,1}((0|\+61)(2|4|3|7|8)){0,1}\){0,1}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{2}( |-){0,1}[0-9]{1}( |-){0,1}[0-9]{3}$/.test(e)||"invalid number"}}}},computed:Object(n["a"])(Object(n["a"])({},Object(o["b"])("auth",["user"])),Object(o["b"])("userCourses",["currentCourseId","loading","error"])),watch:{currentCourseId:function(e){e&&this.$router.push({name:"add-course-videos",params:{courseid:e}})},error:function(e){e&&this.$notify({group:"foo",type:"error",text:e})},loading:function(e){return e}},methods:{Preview_image:function(){try{this.url=URL.createObjectURL(this.file)}catch(e){console.log("uups")}},sendData:function(){var e={businessName:this.businessName,nameOfCourse:this.nameOfCourse,idUser:this.user._id,subtitle:this.subtitle,accessDays:this.access,price:this.price,email:this.email,phone:this.phone,author:this.author,instructor:this.instructor,category:this.category,thisCourseIsSuitableFor:this.courseSuitable,description:this.description,infoForBonus:this.infoForBonus,isPublished:!1,file:this.file},t=new FormData;Object.entries(e).forEach((function(i){var s=Object(r["a"])(i,2),a=s[0],n=s[1];Array.isArray(n)?Object.values(e[a]).forEach((function(e){return t.append("".concat(a,"[]"),e)})):t.append(a,n)})),this.$store.dispatch("userCourses/CREATE_ONLINE_COURSE",{fd:t,userId:this.user._id})},checkForm:function(){this.$refs.form.validate()&&(this.loading=!0,this.sendData())},addField:function(e){return e?this.courseSuitable.push(""):this.dateOfCourses.push("")},removeField:function(e,t){return t?this.courseSuitable.splice(e,1):this.dateOfCourses.splice(e,1)}}},u=l,c=(i("356f"),i("2877")),d=i("6544"),h=i.n(d),f=i("8336"),p=i("b0af"),m=i("99d9"),v=i("ac7c"),b=i("62ad"),k=i("a523"),C=i("23a7"),x=i("4bd4"),g=i("132d"),y=i("0fd9"),V=i("8654"),S=i("a844"),I=Object(c["a"])(u,s,a,!1,null,"60cfe9e4",null);t["default"]=I.exports;h()(I,{VBtn:f["a"],VCard:p["a"],VCardText:m["b"],VCardTitle:m["c"],VCheckbox:v["a"],VCol:b["a"],VContainer:k["a"],VFileInput:C["a"],VForm:x["a"],VIcon:g["a"],VRow:y["a"],VTextField:V["a"],VTextarea:S["a"]})}}]);
//# sourceMappingURL=add-course.a61b2399.js.map