(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0d07bb"],{"67bf":function(r,t,e){"use strict";e.r(t);var n=function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("v-img",{attrs:{src:r.imgUrl,width:r.width,height:r.height,contain:""},on:{error:function(t){r.error=!0}}})},i=[],a={name:"CoverImage",props:{url:{type:String,required:!0},height:{type:String,default:"300"},width:{type:String,default:"300"}},data:function(){return{error:!1,coverImageSrc:"".concat("https://nails-australia-staging.herokuapp.com","/img/noImage300x300.png")}},computed:{imgUrl:function(){return this.error||!this.url?this.coverImageSrc:this.url}},watch:{url:function(r){r&&(this.error=!1)}},methods:{}},o=a,u=e("2877"),c=e("6544"),h=e.n(c),s=e("adda"),l=Object(u["a"])(o,n,i,!1,null,null,null);t["default"]=l.exports;h()(l,{VImg:s["a"]})}}]);
//# sourceMappingURL=chunk-2d0d07bb.ce7e8f69.js.map