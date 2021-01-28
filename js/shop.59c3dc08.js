(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop"],{"0fa5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"pa-0 ma-0",attrs:{flat:"","min-height":"350",height:"100%"}},[t.isShopLoading?a("v-card",{attrs:{width:"100%",flat:""}},[a("v-row",t._l(12,(function(t){return a("v-col",{key:t,staticClass:"px-5 pb-2",attrs:{cols:"12",sm:"6",md:"4",lg:"3"}},[a("v-card",{staticClass:"pa-0 pt-0 mt-0",attrs:{color:"lgrey"}},[a("v-skeleton-loader",{attrs:{type:"image, list-item-three-line",animation:""}})],1)],1)})),1)],1):a("v-card",{staticClass:"pa-0 pt-0 mt-0",attrs:{flat:"",width:"100%",height:"100%"}},[t.commodities.length?a("v-row",{staticClass:"ma-0 pa-0"},t._l(t.commodities,(function(e){return a("v-col",{key:e.id,staticClass:"px-5 pb-2",attrs:{cols:"12",sm:"6",md:"4",lg:"3",link:""}},[a("v-card",{staticClass:"pa-2",attrs:{width:"100%","min-height":"300",rounded:"0",shaped:"",height:"100%",color:"lgrey"},on:{click:function(a){return t.goToItem(e._id)}}},[a("v-card",{attrs:{flat:"",width:"100%"}},[a("v-img",{attrs:{src:e.previewImage[0]&&e.previewImage[0].link||t.coverImageSrc,width:"100%",height:"270",contain:""}})],1),a("v-card-text",{staticClass:"pa-2 pb-0"},[a("span",[a("p",{staticClass:"text-h6 ma-0 pa-0 font-weight-bold dgrey--text text-start"},[t._v(" "+t._s(e.name)+" ")]),a("p",{staticClass:"text-subtitle-1 ma-0 font-weight-medium dgrey--text text-start"},[t._v(" "+t._s(e.brand)+" ")])]),a("p",{staticClass:"text-end text-subtitle-1 ma-0 pa-0 font-weight-bold dgrey--text"},[t._v(t._s(e.price)+" AUD")])])],1)],1)})),1):a("v-card",{staticClass:"justify-center align-items-center flex-column ma-0 pa-0 d-flex",attrs:{flat:"",height:"100%",width:"100%",justify:"center"}},[a("v-card-text",{staticClass:"d-flex flex-column justify-center align-center"},[a("p",{staticClass:"dgrey--text text-center text-h4 font-weight-medium"},[t._v("Unfortunately, there are no products "),a("br")]),a("p",{staticClass:"dgrey--text text-center text-h4 font-weight-medium"},[t._v("suitable for your request...")])])],1)],1),t.totalPages>1&&!t.isShopLoading?a("v-row",[a("v-col",{staticClass:"mt-10",attrs:{cols:"12"}},[a("v-pagination",{staticClass:"pagination-buttons",attrs:{length:t.pagination.total,color:"orange","prev-icon":"mdi-menu-left","next-icon":"mdi-menu-right"},on:{input:t.setPage},model:{value:t.pagination.page,callback:function(e){t.$set(t.pagination,"page",e)},expression:"pagination.page"}})],1)],1):t._e()],1)},n=[],s=(a("b0c0"),a("ac1f"),a("5319"),a("96cf"),a("1da1")),r=a("5530"),o=a("2f62"),c={name:"Shop",data:function(){return{categoryName:this.$route.params.categoryName,coverImageSrc:a("7e1a")}},computed:Object(r["a"])(Object(r["a"])(Object(r["a"])({},Object(o["d"])(["viewportWidth"])),Object(o["d"])("shop",["categories","isShopLoading","commodities","totalCommodities","activeCategory","totalPages"])),{},{pagination:function(){var t=+this.$route.query.page;return{page:isNaN(t)?1:t,total:Math.ceil(this.totalCommodities/12),skip:isNaN(t)?0:12*t-12}},mobileMenu:function(){return this.viewportWidth<960},selectedCategoryName:function(){return this.$store.getters.selectedCategoryName}}),watch:{$route:function(t,e){"shop"===e.name&&"shop"===t.name&&t.params.categoryName!==e.params.categoryName&&this.$store.dispatch("shop/SET_NEW_CATEGORY",{category:t.params.categoryName})}},methods:{setPage:function(t){t!==this.$route.query.page&&(this.$router.push({name:"shop",params:{categoryId:this.categoryId},query:{page:t}}),this.$store.dispatch("shop/GET_MORE_COMMODITIES",{skip:this.pagination.skip}),this.pagination.page=t,this.pagination.skip=12*t-12)},goToItem:function(t){this.$router.push({name:"shop-item",params:{commodityId:t}})}},beforeDestroy:function(){this.$store.commit("shop/CLEAR_COMMODITIES")},created:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.categories){e.next=3;break}return e.next=3,t.$store.dispatch("shop/GET_SHOP_CATEGORIES");case 3:return e.next=5,t.$store.dispatch("shop/INIT_SHOP",{categoryName:t.categoryName,skip:t.pagination.skip});case 5:if(t.categoryName){e.next=8;break}return e.next=8,t.$router.replace({name:"shop",params:{categoryName:t.activeCategory.slug}});case 8:case"end":return e.stop()}}),e)})))()}},l=c,u=(a("a6b9"),a("2877")),h=a("6544"),p=a.n(h),g=a("b0af"),m=a("99d9"),d=a("62ad"),v=a("adda"),f=(a("99af"),a("d81d"),a("a9e3"),a("d3b7"),a("25f0"),a("2909")),b=(a("17b3"),a("9d26")),y=a("dc22"),x=a("a9ad"),$=a("de2c"),w=a("7560"),C=a("58df"),_=Object(C["a"])(x["a"],Object($["a"])({onVisible:["init"]}),w["a"]).extend({name:"v-pagination",directives:{Resize:y["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},wrapperAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.wrapper"}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(r["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10);if(0===t)return[];var e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var a=e%2===0?1:0,i=Math.floor(e/2),n=this.length-i+1+a;if(this.value>i&&this.value<n){var s=this.value-i+2,r=this.value+i-2-a;return[1,"..."].concat(Object(f["a"])(this.range(s,r)),["...",this.length])}if(this.value===i){var o=this.value+i-1-a;return[].concat(Object(f["a"])(this.range(1,o)),["...",this.length])}if(this.value===n){var c=this.value-i+1;return[1,"..."].concat(Object(f["a"])(this.range(c,this.length)))}return[].concat(Object(f["a"])(this.range(1,i)),["..."],Object(f["a"])(this.range(n,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var a=[];t=t>0?t:1;for(var i=t;i<=e;i++)a.push(i);return a},genIcon:function(t,e,a,i,n){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":a},attrs:{type:"button","aria-label":n},on:a?{}:{click:i}},[t(b["a"],[e])])])},genItem:function(t,e){var a=this,i=e===this.value&&(this.color||"primary"),n=e===this.value,s=n?this.currentPageAriaLabel:this.pageAriaLabel;return t("button",this.setBackgroundColor(i,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button","aria-current":n,"aria-label":this.$vuetify.lang.t(s,e)},on:{click:function(){return a.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(a,i){return t("li",{key:i},[isNaN(Number(a))?t("span",{class:"v-pagination__more"},[a.toString()]):e.genItem(t,a)])}))},genList:function(t,e){return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous,this.$vuetify.lang.t(this.previousAriaLabel)),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next,this.$vuetify.lang.t(this.nextAriaLabel))];return t("nav",{attrs:{role:"navigation","aria-label":this.$vuetify.lang.t(this.wrapperAriaLabel)}},[this.genList(t,e)])}}),I=a("0fd9"),k=a("3129"),O=Object(u["a"])(l,i,n,!1,null,null,null);e["default"]=O.exports;p()(O,{VCard:g["a"],VCardText:m["b"],VCol:d["a"],VImg:v["a"],VPagination:_,VRow:I["a"],VSkeletonLoader:k["a"]})},1262:function(t,e,a){},"17b3":function(t,e,a){},a6b9:function(t,e,a){"use strict";a("1262")}}]);
//# sourceMappingURL=shop.59c3dc08.js.map