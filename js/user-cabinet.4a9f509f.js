(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user-cabinet"],{c3ff:function(t,e,s){"use strict";s("d852")},d852:function(t,e,s){},f215:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{fluid:""}},[s("v-row",[s("v-col",{attrs:{cols:"12",xs:"10","offset-md":"0",md:"6",order:"2","order-md":"1"}},[s("h3",{staticClass:"d-flex justify-center justify-md-start pb-16 pl-md-16"},[t._v("My account")]),s("v-card",{staticClass:"d-sm-flex align-baseline",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("User name")])],1),s("v-card",{attrs:{flat:"",width:"100%"}},[s("v-text-field",{attrs:{disabled:""},model:{value:t.userName,callback:function(e){t.userName=e},expression:"userName"}})],1)],1),s("v-card",{staticClass:"d-sm-flex align-baseline",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("First name")])],1),s("v-card",{staticClass:"edit-container",attrs:{flat:"",width:"100%"}},[s("v-text-field",{staticClass:"pr-8",attrs:{disabled:t.firstNameDisabled},model:{value:t.firstName,callback:function(e){t.firstName=e},expression:"firstName"}}),t.firstNameDisabled?s("span",{staticClass:"edit-btn",on:{click:function(e){return t.editHandler("firstNameDisabled")}}},[t._v("edit")]):t._e()],1)],1),s("v-card",{staticClass:"d-sm-flex align-baseline",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("Last name")])],1),s("v-card",{staticClass:"edit-container",attrs:{flat:"",width:"100%"}},[s("v-text-field",{staticClass:"pr-8",attrs:{disabled:t.lastNameDisabled},model:{value:t.lastName,callback:function(e){t.lastName=e},expression:"lastName"}}),t.lastNameDisabled?s("span",{staticClass:"edit-btn",on:{click:function(e){return t.editHandler("lastNameDisabled")}}},[t._v("edit")]):t._e()],1)],1),s("v-card",{staticClass:"d-sm-flex align-baseline",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("Email")])],1),s("v-card",{staticClass:"edit-container",attrs:{flat:"",width:"100%"}},[s("v-text-field",{staticClass:"pr-8",attrs:{disabled:t.emailDisabled},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}}),t.emailDisabled?s("span",{staticClass:"edit-btn",on:{click:function(e){return t.editHandler("emailDisabled")}}},[t._v("edit")]):t._e()],1)],1),s("v-card",{staticClass:"d-sm-flex align-baseline",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("Phone number")])],1),s("v-card",{staticClass:"edit-container",attrs:{flat:"",width:"100%"}},[s("v-text-field",{staticClass:"pr-8",attrs:{disabled:t.phoneDisabled},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),t.phoneDisabled?s("span",{staticClass:"edit-btn",on:{click:function(e){return t.editHandler("phoneDisabled")}}},[t._v("edit")]):t._e()],1)],1),s("v-card",{staticClass:"d-sm-flex align-baseline mt-16",attrs:{flat:""}},[s("v-card",{staticClass:"mr-4",attrs:{flat:"","min-width":"140px"}},[s("v-card-text",{staticClass:"pa-0 text-center text-sm-end"},[t._v("Delivery address")])],1),s("v-card",{staticClass:"edit-container",attrs:{flat:"",width:"100%"}},[s("v-text-field",{staticClass:"pr-8",attrs:{disabled:t.deliveryAddressDisabled},model:{value:t.deliveryAddress,callback:function(e){t.deliveryAddress=e},expression:"deliveryAddress"}}),t.deliveryAddressDisabled?s("span",{staticClass:"edit-btn",on:{click:function(e){return t.editHandler("deliveryAddressDisabled")}}},[t._v("edit")]):t._e()],1)],1),s("v-card",{staticClass:"d-flex justify-center",attrs:{flat:""}},[t.touched?s("v-btn",{staticClass:"yellow-button mr-8",attrs:{color:"buttons",rounded:""},on:{click:t.cancel}},[t._v("cancel")]):t._e(),t.touched?s("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",disabled:t.loading},on:{click:t.confirm}},[t._v("confirm")]):t._e()],1)],1),s("v-col",{staticClass:"d-flex flex-column align-md-end",attrs:{cols:"12",xs:"12",md:"6",order:"1","order-md":"2"}},[s("v-btn",{attrs:{text:""},on:{click:function(e){t.dialog=!0}}},[t._v("Log out")]),s("v-btn",{attrs:{text:""},on:{click:function(e){return t.goTo("user-courses")}}},[t._v(" My courses")]),s("v-btn",{attrs:{text:""}},[t._v("Shoping card")])],1)],1),s("div",{staticClass:"d-flex flex-column flex-sm-row align-center justify-sm-space-around mt-16"},[s("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:""},on:{click:function(e){return t.goTo("courses")}}},[t._v("All courses")]),s("v-btn",{staticClass:"yellow-button my-12 my-sm-0",attrs:{color:"buttons",rounded:""},on:{click:function(e){return t.goTo("shop")}}},[t._v("Shop")]),s("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:""},on:{click:function(e){return t.goTo("add-course")}}},[t._v("Add course")])],1),s("v-dialog",{attrs:{persistent:"","max-width":"320"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[s("v-card",[s("v-card-title",[t._v(" Do you really want to leave ?")]),s("v-card-actions",{staticClass:"justify-center"},[s("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",large:"",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Disagree ")]),s("v-btn",{staticClass:"yellow-button",attrs:{color:"buttons",rounded:"",large:"",text:""},on:{click:t.logoutUser}},[t._v(" Agree ")])],1)],1)],1)],1)},i=[],l=(s("b0c0"),s("5530")),r=s("2f62"),n={name:"UserCabinet",data:function(){return{dialog:!1,userName:"",firstName:"",firstNameDisabled:!0,lastName:"",lastNameDisabled:!0,email:"",emailDisabled:!0,phone:"",phoneDisabled:!0,deliveryAddress:"",deliveryAddressDisabled:!0,role:"User",isPoliticAgree:!0}},computed:Object(l["a"])(Object(l["a"])(Object(l["a"])(Object(l["a"])({},Object(r["b"])("auth",["user"])),Object(r["b"])("auth",["error"])),Object(r["b"])("auth",["loading"])),{},{touched:function(){return!(this.firstNameDisabled&&this.lastNameDisabled&&this.emailDisabled&&this.phoneDisabled&&this.deliveryAddressDisabled)}}),watch:{user:function(){this.fillingInTheFields(),this.resetDisabled()},error:function(t){t&&this.$notify({group:"foo",type:"error",text:t})},loading:function(t){return t}},methods:{logoutUser:function(){this.$store.dispatch("auth/LOG_OUT"),this.$router.push({name:"home"}),this.dialog=!1},editHandler:function(t){this[t]=!this[t]},cancel:function(){this.fillingInTheFields(),this.resetDisabled()},confirm:function(){var t={firstName:this.firstName,lastName:this.lastName,email:this.email,phone:this.phone,deliveryAddress:this.deliveryAddress,role:this.role,isPoliticAgree:this.isPoliticAgree};this.$store.dispatch("auth/EDIT_USER",t)},fillingInTheFields:function(){this.userName=this.user.firstName,this.firstName=this.user.firstName,this.lastName=this.user.lastName,this.email=this.user.email,this.phone=this.user.phone,this.deliveryAddress=this.user.deliveryAddress},resetDisabled:function(){this.firstNameDisabled=!0,this.lastNameDisabled=!0,this.emailDisabled=!0,this.phoneDisabled=!0,this.deliveryAddressDisabled=!0},goTo:function(t){this.$route.name!==t&&this.$router.push({name:t})}},beforeMount:function(){this.fillingInTheFields()}},d=n,c=(s("c3ff"),s("2877")),o=s("6544"),u=s.n(o),f=s("8336"),m=s("b0af"),b=s("99d9"),v=s("62ad"),h=s("a523"),p=s("169a"),x=s("0fd9"),C=s("8654"),g=Object(c["a"])(d,a,i,!1,null,"09cfe9c0",null);e["default"]=g.exports;u()(g,{VBtn:f["a"],VCard:m["a"],VCardActions:b["a"],VCardText:b["b"],VCardTitle:b["c"],VCol:v["a"],VContainer:h["a"],VDialog:p["a"],VRow:x["a"],VTextField:C["a"]})}}]);
//# sourceMappingURL=user-cabinet.4a9f509f.js.map