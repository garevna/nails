(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["sign-in"],{"0e0a":function(e,t,a){},"37a3":function(e,t,a){"use strict";a.r(t),t["default"]={email:{label:"Email",type:"email",required:!0},password:{label:"Password",type:"password",required:!0}}},"3d97":function(e,t,a){"use strict";a("0e0a")},"54e2":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.show?a("v-form",{ref:"form",staticClass:"form mt-16"},[a("div",{staticClass:"d-flex flex-column align-center"},[a("h2",[e._v("Sign in")]),a("div",{staticClass:"input-container pa-4"},[e._l(e.schema,(function(t,i){return a("div",{key:i},["email"===t.type?a("EmailInput",{attrs:{value:e.data[i],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,i,t)}}}):e._e(),"password"===t.type?a("PasswordInput",{attrs:{value:e.data[i],label:t.label,required:t.required,outlined:!1},on:{"update:value":function(t){return e.$set(e.data,i,t)}}}):e._e()],1)})),a("v-checkbox",{attrs:{rules:[e.rules.required],label:" Agree to terms and conditions"},model:{value:e.isPoliticAgree,callback:function(t){e.isPoliticAgree=t},expression:"isPoliticAgree"}})],2),a("div",{staticClass:"d-flex"},[a("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",disabled:e.loading},on:{click:e.submit}},[e._v("sign in")])],1)])]):e._e()},s=[],r=(a("13d5"),a("b64b"),a("5530")),n=a("ade3"),o=a("94f8"),u=a.n(o),c=a("1132"),l=a.n(c),d=a("2f62"),f=a("56fc"),b=a("c965"),h=a("37a3").default,p={name:"SignIn",components:{EmailInput:f["a"],PasswordInput:b["a"]},data:function(){return{show:!1,schema:h,isPoliticAgree:!1,data:Object.keys(h).reduce((function(e,t){return Object.assign(e,Object(n["a"])({},t,""))}),{}),rules:{required:function(e){return!!e||"input is required"}}}},computed:Object(r["a"])({},Object(d["e"])("auth",["isLogged","loading"])),watch:{isLogged:function(e){if(e){var t=this.$router.history._startLocation,a=this.$router.history.current.fullPath;t===a?this.$router.push({name:"user-cabinet"}):this.$router.back()}else this.$router.push({name:"home"})}},methods:{submit:function(){if(this.$refs.form.validate()){var e=Object.assign({},this.data,{password:l.a.stringify(u()(this.data.password))});this.$store.dispatch("auth/SIGN_IN",e)}}},mounted:function(){var e=this;setTimeout((function(){return e.show=!0}),500)},beforeDestroy:function(){}},m=p,v=(a("3d97"),a("2877")),g=a("6544"),w=a.n(g),y=a("8336"),$=a("ac7c"),_=a("4bd4"),k=Object(v["a"])(m,i,s,!1,null,"724936c3",null);t["default"]=k.exports;w()(k,{VBtn:y["a"],VCheckbox:$["a"],VForm:_["a"]})}}]);
//# sourceMappingURL=sign-in.26628b48.js.map