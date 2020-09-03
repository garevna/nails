(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop-item"],{1348:function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-card",{staticClass:"transparent",attrs:{flat:""}},t._l(t.categories,(function(e,i){return s("v-card-text",{key:i},[t._l(e,(function(e,i){return s("h3",{key:i,staticClass:"gray-font",staticStyle:{cursor:"pointer"},on:{click:function(s){return t.setSection(e)}}},[t._v(" "+t._s(e.name)+" ")])})),e.length>1?s("v-divider",{staticClass:"gray-divider"}):t._e()],2)})),1)},o=[],a=(s("b0c0"),s("5530")),n=s("2f62"),c={name:"Shop",props:["setSelectedSection"],computed:Object(a["a"])({},Object(n["b"])("shop",["categories"])),methods:{setSection:function(t){this.setSelectedSection(t),"shop"===this.$route.name?(this.$store.dispatch("shop/GET_SHOP_COMMODITIES",{categoryId:t._id}),this.$route.params.categoryId!==t._id&&this.$router.push({name:"shop",params:{categoryId:t._id}})):this.$router.push({name:"shop",params:{categoryId:t._id}})}}},r=c,d=(s("66bc"),s("2877")),l=s("6544"),m=s.n(l),h=s("b0af"),u=s("99d9"),f=s("ce7e"),p=Object(d["a"])(r,i,o,!1,null,null,null);e["a"]=p.exports;m()(p,{VCard:h["a"],VCardText:u["a"],VDivider:f["a"]})},"16ec":function(t,e,s){"use strict";var i=s("bfaf"),o=s.n(i);o.a},"21af":function(t,e,s){"use strict";var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-row",{attrs:{justify:"center"}},[s("v-col",{attrs:{cols:"12",sm:"0",md:"4"}}),s("v-col",{attrs:{cols:"12",sm:"12",md:"7"}},[s("v-card",{staticClass:"transparent"},[s("v-expansion-panels",{staticClass:"category-switcher",attrs:{flat:"",readonly:!t.mobileMenu,value:t.isOpened}},[s("v-expansion-panel",[s("v-expansion-panel-header",{staticClass:"category-switcher-header",attrs:{"expand-icon":"mdi-menu-down","hide-actions":!t.mobileMenu}},[s("h4",[t._v(t._s(t.selectedSection.name))])]),s("v-expansion-panel-content",[s("LeftSideMenu",{attrs:{setSelectedSection:t.setNewCategory}})],1)],1)],1)],1)],1)],1)},o=[],a=(s("b0c0"),s("5530")),n=s("2f62"),c=s("1348"),r={name:"CategoriesSwithcer",components:{LeftSideMenu:c["a"]},props:["selectedSection","setSelectedSection","mobileMenu"],data:function(){return{isOpened:!1}},computed:Object(a["a"])(Object(a["a"])({},Object(n["b"])(["viewportWidth"])),Object(n["b"])("shop",["categories","commodities"])),watch:{mobileMenu:function(){this.isOpened=this.mobileMenu}},methods:{setNewCategory:function(t){this.setSelectedSection(t.name),this.isOpened=!this.isOpened}},mounted:function(){this.categories||this.$store.dispatch("shop/GET_SHOP_CATEGORIES")}},d=r,l=(s("95f6"),s("2877")),m=s("6544"),h=s.n(m),u=s("b0af"),f=s("62ad"),p=s("cd55"),v=s("49e2"),g=s("c865"),y=s("0393"),b=s("0fd9"),S=Object(l["a"])(d,i,o,!1,null,null,null);e["a"]=S.exports;h()(S,{VCard:u["a"],VCol:f["a"],VExpansionPanel:p["a"],VExpansionPanelContent:v["a"],VExpansionPanelHeader:g["a"],VExpansionPanels:y["a"],VRow:b["a"]})},3133:function(t,e,s){},"66bc":function(t,e,s){"use strict";var i=s("3133"),o=s.n(i);o.a},"95f6":function(t,e,s){"use strict";var i=s("c549"),o=s.n(i);o.a},bfaf:function(t,e,s){},c4da:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"whitefone shop-layout",attrs:{fluid:"","fill-height":""}},[s("v-card",{staticClass:"transparent mx-auto",attrs:{flat:"","max-width":"1440",width:"100%"}},[s("CategoriesSwitcher",{attrs:{selectedSection:t.selectedSection,setSelectedSection:t.setSelectedSection,mobileMenu:t.mobileMenu}}),s("v-row",[t.mobileMenu?t._e():s("v-col",{attrs:{cols:"12",sm:"6",md:"3",xl:"3",lg:"3"}},[s("LeftSideMenu",{attrs:{setSelectedSection:t.setSelectedSection}})],1),t.commodity?s("v-col",{attrs:{cols:"12",sm:"12",md:"9",xl:"9",lg:"9"}},[s("v-row",{staticClass:"description",attrs:{justify:"start"}},[s("v-col",{attrs:{cols:"1",sm:"1",md:"1",xl:"2",lg:"2"}}),s("v-col",{staticClass:"px-0",attrs:{cols:"12",sm:"6",md:"4",xl:"4",lg:"4",xs:"12"}},[s("v-img",{attrs:{src:t.commodity.image[0],"max-width":"100%","max-height":"100%",contain:""}})],1),s("v-col",{attrs:{cols:"1",md:"0"}}),s("v-col",{staticClass:"px-0",attrs:{cols:"12",sm:"12",md:"5",xl:"4",lg:"4"}},[s("v-col",{staticClass:"gray-font px-0",attrs:{cols:"12"}},[s("h2",{staticClass:"dark-gray-font "},[t._v(t._s(t.commodity.name))]),s("h4",[t._v(t._s(t.commodity.description))]),s("div",{staticClass:"caption"},[s("h2",[t._v("Working part diametr, mm: 2.3")]),s("h2",[t._v("Grain size: medium")]),s("h2",[t._v("Working part length, mm: 10.0")]),s("h2",[t._v("Shank diameter, mm: 2.3")])]),s("div",{staticClass:"price"},[s("h3",{staticClass:"dark-gray-font"},[t._v(t._s(t.commodity.price)+" AUD")]),s("div",{staticClass:"shop-buttons"},[s("v-btn",{staticClass:"add",attrs:{tile:"",small:"",width:"100%",color:"#FFC44A"}},[t._v("Add to card")]),s("v-btn",{staticClass:"buy",attrs:{tile:"",small:"",width:"100%",color:"#333333"}},[t._v("Buy it now")])],1)])])],1)],1)],1):t._e()],1)],1)],1)},o=[],a=(s("7db0"),s("0481"),s("4069"),s("5530")),n=s("2f62"),c=s("1348"),r=s("21af"),d={name:"Shop",components:{LeftSideMenu:c["a"],CategoriesSwitcher:r["a"]},props:["section"],data:function(){return{selectedBlock:0,mobileMenu:window.innerWidth<960,selectedSection:{},commodityId:this.$route.params.commodityId}},computed:Object(a["a"])(Object(a["a"])({},Object(n["b"])(["viewportWidth"])),Object(n["b"])("shop",["categories","commodities","commodity"])),methods:{setSelectedSection:function(t){this.selectedSection=t},onResizeHandler:function(){this.mobileMenu=window.innerWidth<960}},watch:{categories:function(){var t=this;this.categories&&this.categories.length&&this.commodity&&(this.selectedSection=this.categories.flat().find((function(e){return e._id===t.commodity.categoryId})))},commodity:function(){var t=this;this.categories&&this.categories.length&&this.commodity&&(this.selectedSection=this.categories.flat().find((function(e){return e._id===t.commodity.categoryId}))),console.log(this.commodity)}},mounted:function(){this.$store.dispatch("shop/GET_COMMODITY",{commodityId:this.commodityId}),this.$vuetify.theme.themes.light.homefone=this.$vuetify.theme.themes.light.whitefone,this.mobileMenu=window.innerWidth<960,window.addEventListener("resize",this.onResizeHandler,{passive:!0})},beforeDestroy:function(){this.$vuetify.theme.themes.light.homefone=this.$vuetify.theme.themes.light.secondaryGray,window.removeEventListener("resize",this.onResizeHandler)}},l=d,m=(s("16ec"),s("2877")),h=s("6544"),u=s.n(h),f=s("8336"),p=s("b0af"),v=s("62ad"),g=s("a523"),y=s("adda"),b=s("0fd9"),S=Object(m["a"])(l,i,o,!1,null,null,null);e["default"]=S.exports;u()(S,{VBtn:f["a"],VCard:p["a"],VCol:v["a"],VContainer:g["a"],VImg:y["a"],VRow:b["a"]})},c549:function(t,e,s){}}]);
//# sourceMappingURL=shop-item.04cd6e47.js.map