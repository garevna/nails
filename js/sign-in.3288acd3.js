(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sign-in"],{2306:function(t,e,i){"use strict";i("74c0")},"28ab":function(t,e,i){},"4bd4":function(t,e,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),a=i("58df"),s=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},"54e2":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-form",{ref:"form",staticClass:"form mt-16"},[i("div",{staticClass:"d-flex flex-column align-center"},[i("h2",[t._v("Sign in")]),i("div",{staticClass:"input-container pa-4"},[i("v-text-field",{attrs:{rules:[t.rules.required],label:"Email or phone"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),i("div",{staticClass:"input-pass"},[i("v-text-field",{attrs:{type:t.showPass?"text":"password",rules:[t.rules.required],label:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),i("v-checkbox",{staticClass:"show-pass pa-0 ma-0",attrs:{label:"Show"},model:{value:t.showPass,callback:function(e){t.showPass=e},expression:"showPass"}},[t._v("show")])],1),i("v-checkbox",{attrs:{rules:[t.rules.required],label:" Agree to terms and conditions"},model:{value:t.isPoliticAgree,callback:function(e){t.isPoliticAgree=e},expression:"isPoliticAgree"}})],1),i("div",{staticClass:"d-flex"},[i("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",disabled:t.loading},on:{click:t.submit}},[t._v("sign in")])],1)])])},a=[],s=i("5530"),r=i("2f62"),o={name:"login",data:function(){var t=this;return{login:"",password:"",phone:"",email:"",isPoliticAgree:!1,showPass:!1,rules:{required:function(t){return!!t||"input is required"},confirmPass:function(e){return e===t.password||"Passwords do not match"},mailValidation:function(t){return/^(\w+\.?\w+\.?\w+?|\d+\.?\d+\.?\d+)([@])(\w+|\d+)\.{1}[a-zA-Z]{2,3}$/.test(t)||"invalid email"}}}},computed:Object(s["a"])({},Object(r["b"])("auth",["isLogged","error","loading"])),watch:{isLogged:function(t){if(t){var e=this.$router.history._startLocation,i=this.$router.history.current.fullPath;e===i?this.$router.push({name:"home"}):this.$router.go(-1)}},error:function(t){t&&this.$notify({group:"foo",type:"error",text:t})}},methods:{submit:function(){var t=this.email,e=this.password;this.$refs.form.validate()&&this.$store.dispatch("auth/SIGN_IN",{email:t,password:e})}}},u=o,l=(i("2306"),i("8fa5"),i("2877")),c=i("6544"),h=i.n(c),d=i("8336"),p=i("ac7c"),f=i("4bd4"),m=i("8654"),v=Object(l["a"])(u,n,a,!1,null,"484e57f4",null);e["default"]=v.exports;h()(v,{VBtn:d["a"],VCheckbox:p["a"],VForm:f["a"],VTextField:m["a"]})},"6ca7":function(t,e,i){},"74c0":function(t,e,i){},8547:function(t,e,i){"use strict";var n=i("2b0e"),a=i("80d2");e["a"]=n["default"].extend({name:"comparable",props:{valueComparator:{type:Function,default:a["j"]}}})},"8fa5":function(t,e,i){"use strict";i("28ab")},ac7c:function(t,e,i){"use strict";i("d3b7"),i("25f0");var n=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),s=i("c37a"),r=(i("4de4"),i("45fc"),i("5607")),o=i("2b0e"),u=o["default"].extend({name:"rippleable",directives:{ripple:r["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}}),l=i("8547"),c=i("58df");function h(t){t.preventDefault()}var d=Object(c["a"])(s["a"],u,l["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=s["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:h},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:h},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}});e["a"]=d.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},ec29:function(t,e,i){}}]);
//# sourceMappingURL=sign-in.3288acd3.js.map