(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sign-up"],{"178a":function(e,t,i){},"3fb9":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-text-field",{ref:"number",attrs:{label:e.label,disabled:e.disabled,rules:[e.rules.required,e.rules.phone,e.rules.noRepeat],outlined:e.outlined},model:{value:e.localValue,callback:function(t){e.localValue="string"===typeof t?t.trim():t},expression:"localValue"}})},a=[],r=(i("a15b"),i("ac1f"),i("1276"),{name:"PhoneInput",props:{value:{type:String,required:!0},label:{type:String,default:""},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},noRepeat:{type:String,default:""},outlined:{type:Boolean,default:!0}},data:function(){var e=this;return{rules:{required:function(t){var i=e.required&&!!t,n=!e.required,a=!(i&&n)&&(i||n);return a||"Input is required"},phone:function(e){var t=/^[0-9]{10,12}$/gm,i=!t.test(e.split(" ").join(""));return!e||!i||"Invalid phone number"},noRepeat:function(t){return!e.noRepeat||t.split(" ").join("")!==e.noRepeat.split(" ").join("")||"Digits must not match"}}}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("update:value",e)}}},watch:{noRepeat:function(){this.$refs.number.validate()}},methods:{showInput:function(){this.$emit("update:disabled",!1)}}}),u=r,s=i("2877"),l=i("6544"),o=i.n(l),c=i("8654"),d=Object(s["a"])(u,n,a,!1,null,null,null);t["a"]=d.exports;o()(d,{VTextField:c["a"]})},"4bd4":function(e,t,i){"use strict";i("4de4"),i("7db0"),i("4160"),i("caad"),i("07ac"),i("2532"),i("159b");var n=i("5530"),a=i("58df"),r=i("7e2b"),u=i("3206");t["a"]=Object(a["a"])(r["a"],Object(u["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,i=function(e){return e.$watch("hasError",(function(i){t.$set(t.errorBag,e._uid,i)}),{immediate:!0})},n={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=e.$watch("shouldValidate",(function(a){a&&(t.errorBag.hasOwnProperty(e._uid)||(n.valid=i(e)))})):n.valid=i(e),n},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var i=this.watchers.find((function(e){return e._uid===t._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},"519e":function(e,t,i){},"56fc":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-text-field",{ref:"email",attrs:{label:e.label,disabled:e.disabled,rules:[e.rules.required,e.rules.email,e.rules.noRepeat],outlined:e.outlined},model:{value:e.localValue,callback:function(t){e.localValue="string"===typeof t?t.trim():t},expression:"localValue"}})},a=[],r={name:"EmailInput",props:{value:{type:String,required:!0},label:{type:String,default:""},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},noRepeat:{type:String,default:""},outlined:{type:Boolean,default:!0}},data:function(){var e=this;return{rules:{required:function(t){var i=e.required&&!!t,n=!e.required,a=!(i&&n)&&(i||n);return a||"Input is required"},email:function(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,i=!t.test(e);return!e||!i||"Please enter your email address in format: yourname@example.com"},noRepeat:function(t){return!e.noRepeat||t!==e.noRepeat||"Email address and additional email address must not match"}}}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("update:value",e)}}},watch:{noRepeat:function(){this.$refs.email.validate()}},methods:{showInput:function(){this.$emit("update:disabled",!1)}}},u=r,s=i("2877"),l=i("6544"),o=i.n(l),c=i("8654"),d=Object(s["a"])(u,n,a,!1,null,null,null);t["a"]=d.exports;o()(d,{VTextField:c["a"]})},"5c9c":function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-form",{ref:"form",staticClass:"form mt-16"},[i("h2",{staticClass:"text-center"},[e._v("Create an account")]),i("v-card",{staticClass:"d-flex flex-column align-center",attrs:{flat:""}},[i("v-card",{staticClass:"pa-8",attrs:{flat:"","min-width":"350px"}},[i("div",{staticClass:"d-flex"},e._l(e.schema.sideUp,(function(t,n){return i("div",{key:n,staticClass:"inputUp"},["text"===t.type?i("TextInput",{attrs:{value:e.data[n],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,n,t)}}}):e._e()],1)})),0),e._l(e.schema.sideDown,(function(t,n){return i("div",{key:n},["email"===t.type?i("EmailInput",{attrs:{value:e.data[n],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,n,t)}}}):e._e(),"phone"===t.type?i("PhoneInput",{attrs:{value:e.data[n],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,n,t)}}}):e._e(),"password"===t.type?i("PasswordInput",{attrs:{value:e.data[n],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,n,t)}}}):e._e()],1)}))],2),i("v-checkbox",{attrs:{rules:[e.rules.required],label:"Agree to terms and conditions"},model:{value:e.isPoliticAgree,callback:function(t){e.isPoliticAgree=t},expression:"isPoliticAgree"}}),i("v-btn",{staticClass:"yellow-button mt-4",attrs:{color:"buttons",disabled:e.loading,rounded:""},on:{click:e.submit}},[e._v("Create account")])],1)],1)},a=[],r=(i("99af"),i("13d5"),i("b64b"),i("5530")),u=i("ade3"),s=i("2f62"),l=i("56fc"),o=i("c965"),c=i("9284"),d=i("3fb9"),p=i("6fbf").default,h={name:"SignUp",components:{EmailInput:l["a"],PasswordInput:o["a"],TextInput:c["a"],PhoneInput:d["a"]},data:function(){return{schema:p,data:Object.keys(p.sideUp).concat(Object.keys(p.sideDown)).reduce((function(e,t){return Object.assign(e,Object(u["a"])({},t,""))}),{}),isPoliticAgree:!1,rules:{required:function(e){return!!e||"input is required"}}}},computed:Object(r["a"])({},Object(s["d"])("auth",["isLogged","loading"])),watch:{isLogged:function(e){e&&this.$router.push({name:"home"})}},methods:{submit:function(){if(this.$refs.form.validate()){var e=Object.assign({},this.data,{role:"User",isPoliticAgree:this.isPoliticAgree});this.$store.dispatch("auth/SIGN_UP",e)}}},beforeRouteEnter:function(e,t,i){i((function(e){return e.$store.state.auth.isLogged&&e.$router.push({name:"user-cabinet"})}))}},f=h,m=(i("c823"),i("2877")),v=i("6544"),b=i.n(v),g=i("8336"),y=i("b0af"),w=i("ac7c"),V=i("4bd4"),x=Object(m["a"])(f,n,a,!1,null,"815ec64e",null);t["default"]=x.exports;b()(x,{VBtn:g["a"],VCard:y["a"],VCheckbox:w["a"],VForm:V["a"]})},"6ca7":function(e,t,i){},"6fbf":function(e,t,i){"use strict";i.r(t),t["default"]={sideUp:{firstName:{label:"First name",type:"text",required:!0},lastName:{label:"Last name",type:"text",required:!0}},sideDown:{email:{label:"Email",type:"email",required:!0},phone:{label:"Phone number",type:"phone",required:!0},password:{label:"Password",type:"password",required:!0}}}},7743:function(e,t,i){},8547:function(e,t,i){"use strict";var n=i("2b0e"),a=i("80d2");t["a"]=n["a"].extend({name:"comparable",props:{valueComparator:{type:Function,default:a["j"]}}})},9284:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-text-field",{attrs:{label:e.label,disabled:e.disabled,rules:[e.rules.required,e.rules.limit,e.rules.noRepeat],outlined:e.outlined},model:{value:e.localValue,callback:function(t){e.localValue=t},expression:"localValue"}})},a=[],r=(i("a9e3"),{name:"TextInput",props:{value:{type:String,required:!0},label:{type:String,default:""},disabled:{type:Boolean,default:!1},limit:{type:Number,default:25},required:{type:Boolean,default:!1},noRepeat:{type:String,default:""},outlined:{type:Boolean,default:!0}},data:function(){var e=this;return{rules:{required:function(t){var i=e.required&&!!t,n=!e.required,a=!(i&&n)&&(i||n);return a||"Input is required"},limit:function(t){return t.length<=e.limit||"Max ".concat(e.limit," characters")},noRepeat:function(t){return!e.noRepeat||t!==e.noRepeat||"Text must not match"}}}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("update:value",e)}}},methods:{showInput:function(){this.$emit("update:disabled",!1)}}}),u=r,s=i("2877"),l=i("6544"),o=i.n(l),c=i("8654"),d=Object(s["a"])(u,n,a,!1,null,null,null);t["a"]=d.exports;o()(d,{VTextField:c["a"]})},ac7c:function(e,t,i){"use strict";i("d3b7"),i("25f0");var n=i("5530"),a=(i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),u=(i("4de4"),i("45fc"),i("5607")),s=i("2b0e"),l=s["a"].extend({name:"rippleable",directives:{ripple:u["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(e.staticClass="v-input--selection-controls__ripple",e.directives=e.directives||[],e.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",e)):null}}}),o=i("8547"),c=i("58df");function d(e){e.preventDefault()}var p=Object(c["a"])(r["a"],l,o["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var e=this,t=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return e.valueComparator(i,t)})):void 0===this.trueValue||void 0===this.falseValue?t?this.valueComparator(t,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(e){this.lazyValue=e,this.hasColor=e}},methods:{genLabel:function(){var e=r["a"].options.methods.genLabel.call(this);return e?(e.data.on={click:d},e):e},genInput:function(e,t){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:e,type:e},t),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:d},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(e){this.onChange(),this.$emit("click",e)},onChange:function(){var e=this;if(this.isInteractive){var t=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!e.valueComparator(i,t)})),i.length===n&&i.push(t)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:t?this.valueComparator(i,t)?null:t:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(e){}}});t["a"]=p.extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(e){var t=this;this.$nextTick((function(){return t.inputIndeterminate=e}))},inputIndeterminate:function(e){this.$emit("update:indeterminate",e)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},c823:function(e,t,i){"use strict";i("178a")},c965:function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"input-pass"},[i("v-text-field",{ref:"pass",attrs:{disabled:e.disabled,label:e.label,type:e.showPass?"text":"password",rules:[e.rules.required,e.rules.confirm,e.rules.noRepeat,e.rules.equal],outlined:e.outlined},model:{value:e.localValue,callback:function(t){e.localValue="string"===typeof t?t.trim():t},expression:"localValue"}}),i("v-checkbox",{staticClass:"show-pass pa-0 ma-0",attrs:{label:"Show"},model:{value:e.showPass,callback:function(t){e.showPass=t},expression:"showPass"}},[e._v("show")])],1)},a=[],r={name:"PasswordInput",props:{value:{type:String,required:!0},label:{type:String,default:""},disabled:{type:Boolean,default:!1},required:{type:Boolean,default:!1},confirm:{type:String,default:""},noRepeat:{type:String,default:""},equal:{type:Boolean,default:!0},outlined:{type:Boolean,default:!0}},data:function(){var e=this;return{showPass:!1,rules:{required:function(t){var i=e.required&&!!t,n=!e.required,a=!(i&&n)&&(i||n);return a||"Input is required"},minPass:function(e){return e.length>=8||"Min 8 characters"},confirm:function(t){return!e.confirm||t===e.confirm||"Password confirmation must match password"},noRepeat:function(t){return!e.noRepeat||t!==e.noRepeat||"Old and new password must not match"},equal:function(){return e.equal||"Wrong password"}}}},computed:{localValue:{get:function(){return this.value},set:function(e){this.$emit("update:value",e)}}},watch:{confirm:function(){this.localValue&&this.$refs.pass.validate()},equal:function(){this.$refs.pass.validate()}},methods:{showInput:function(){this.$emit("update:disabled",!1)}}},u=r,s=(i("d69f"),i("c9ed"),i("2877")),l=i("6544"),o=i.n(l),c=i("ac7c"),d=i("8654"),p=Object(s["a"])(u,n,a,!1,null,"848765b6",null);t["a"]=p.exports;o()(p,{VCheckbox:c["a"],VTextField:d["a"]})},c9ed:function(e,t,i){"use strict";i("519e")},d69f:function(e,t,i){"use strict";i("7743")},ec29:function(e,t,i){}}]);
//# sourceMappingURL=sign-up.09432d71.js.map