(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-314ba62f"],{"166a":function(t,e,i){},"277e":function(t,e,i){"use strict";i("a9e3");var a=i("f977"),n=i("d9bd"),s=i("2b0e");e["a"]=s["a"].extend({name:"scrollable",directives:{Scroll:a["a"]},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(n["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}})},"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var a=i("fe6c"),n=i("58df");function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(n["a"])(Object(a["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"604c":function(t,e,i){"use strict";i.d(e,"a",(function(){return c}));i("4de4"),i("7db0"),i("c740"),i("4160"),i("caad"),i("c975"),i("fb6a"),i("a434"),i("a9e3"),i("2532"),i("159b");var a=i("5530"),n=(i("166a"),i("a452")),s=i("7560"),o=i("58df"),r=i("d9bd"),c=Object(o["a"])(n["a"],s["a"]).extend({name:"base-item-group",props:{activeClass:{type:String,default:"v-item--active"},mandatory:Boolean,max:{type:[Number,String],default:null},multiple:Boolean,tag:{type:String,default:"div"}},data:function(){return{internalLazyValue:void 0!==this.value?this.value:this.multiple?[]:void 0,items:[]}},computed:{classes:function(){return Object(a["a"])({"v-item-group":!0},this.themeClasses)},selectedIndex:function(){return this.selectedItem&&this.items.indexOf(this.selectedItem)||-1},selectedItem:function(){if(!this.multiple)return this.selectedItems[0]},selectedItems:function(){var t=this;return this.items.filter((function(e,i){return t.toggleMethod(t.getValue(e,i))}))},selectedValues:function(){return null==this.internalValue?[]:Array.isArray(this.internalValue)?this.internalValue:[this.internalValue]},toggleMethod:function(){var t=this;if(!this.multiple)return function(e){return t.internalValue===e};var e=this.internalValue;return Array.isArray(e)?function(t){return e.includes(t)}:function(){return!1}}},watch:{internalValue:"updateItemsState",items:"updateItemsState"},created:function(){this.multiple&&!Array.isArray(this.internalValue)&&Object(r["c"])("Model must be bound to an array if the multiple property is true.",this)},methods:{genData:function(){return{class:this.classes}},getValue:function(t,e){return null==t.value||""===t.value?e:t.value},onClick:function(t){this.updateInternalValue(this.getValue(t,this.items.indexOf(t)))},register:function(t){var e=this,i=this.items.push(t)-1;t.$on("change",(function(){return e.onClick(t)})),this.mandatory&&!this.selectedValues.length&&this.updateMandatory(),this.updateItem(t,i)},unregister:function(t){if(!this._isDestroyed){var e=this.items.indexOf(t),i=this.getValue(t,e);this.items.splice(e,1);var a=this.selectedValues.indexOf(i);if(!(a<0)){if(!this.mandatory)return this.updateInternalValue(i);this.multiple&&Array.isArray(this.internalValue)?this.internalValue=this.internalValue.filter((function(t){return t!==i})):this.internalValue=void 0,this.selectedItems.length||this.updateMandatory(!0)}}},updateItem:function(t,e){var i=this.getValue(t,e);t.isActive=this.toggleMethod(i)},updateItemsState:function(){var t=this;this.$nextTick((function(){if(t.mandatory&&!t.selectedItems.length)return t.updateMandatory();t.items.forEach(t.updateItem)}))},updateInternalValue:function(t){this.multiple?this.updateMultiple(t):this.updateSingle(t)},updateMandatory:function(t){if(this.items.length){var e=this.items.slice();t&&e.reverse();var i=e.find((function(t){return!t.disabled}));if(i){var a=this.items.indexOf(i);this.updateInternalValue(this.getValue(i,a))}}},updateMultiple:function(t){var e=Array.isArray(this.internalValue)?this.internalValue:[],i=e.slice(),a=i.findIndex((function(e){return e===t}));this.mandatory&&a>-1&&i.length-1<1||null!=this.max&&a<0&&i.length+1>this.max||(a>-1?i.splice(a,1):i.push(t),this.internalValue=i)},updateSingle:function(t){var e=t===this.internalValue;this.mandatory&&e||(this.internalValue=e?void 0:t)}},render:function(t){return t(this.tag,this.genData(),this.$slots.default)}});c.extend({name:"v-item-group",provide:function(){return{itemGroup:this}}})},"7a91":function(t,e,i){},a434:function(t,e,i){"use strict";var a=i("23e7"),n=i("23cb"),s=i("a691"),o=i("50c4"),r=i("7b0b"),c=i("65f0"),l=i("8418"),u=i("1dde"),d=i("ae40"),h=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,f=Math.min,g=9007199254740991,v="Maximum allowed length exceeded";a({target:"Array",proto:!0,forced:!h||!p},{splice:function(t,e){var i,a,u,d,h,p,b=r(this),w=o(b.length),y=n(t,w),k=arguments.length;if(0===k?i=a=0:1===k?(i=0,a=w-y):(i=k-2,a=f(m(s(e),0),w-y)),w+i-a>g)throw TypeError(v);for(u=c(b,a),d=0;d<a;d++)h=y+d,h in b&&l(u,d,b[h]);if(u.length=a,i<a){for(d=y;d<w-a;d++)h=d+a,p=d+i,h in b?b[p]=b[h]:delete b[p];for(d=w;d>w-a+i;d--)delete b[d-1]}else if(i>a)for(d=w-a;d>y;d--)h=d+a-1,p=d+i-1,h in b?b[p]=b[h]:delete b[p];for(d=0;d<i;d++)b[d+y]=arguments[d+2];return b.length=w-a+i,u}})},bae0:function(t,e,i){"use strict";i("7a91")},c740:function(t,e,i){"use strict";var a=i("23e7"),n=i("b727").findIndex,s=i("44d2"),o=i("ae40"),r="findIndex",c=!0,l=o(r);r in[]&&Array(1)[r]((function(){c=!1})),a({target:"Array",proto:!0,forced:c||!l},{findIndex:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),s(r)},dd43:function(t,e,i){},f977:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var a=i("53ca");function n(t,e){var i=e.modifiers||{},n=i.self,s=void 0!==n&&n,o=e.value,r="object"===Object(a["a"])(o)&&o.options||{passive:!0},c="function"===typeof o||"handleEvent"in o?o:o.handler,l=s?t:e.arg?document.querySelector(e.arg):window;l&&(l.addEventListener("scroll",c,r),t._onScroll={handler:c,options:r,target:s?void 0:l})}function s(t){if(t._onScroll){var e=t._onScroll,i=e.handler,a=e.options,n=e.target,s=void 0===n?t:n;s.removeEventListener("scroll",i,a),delete t._onScroll}}var o={inserted:n,unbind:s};e["b"]=o},fd2d:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"footer-wrapper homefone"},[i("v-bottom-navigation",{staticClass:"footer pb-8",attrs:{shift:"",height:"auto","background-color":"#FFC44A"},model:{value:t.bottomNav,callback:function(e){t.bottomNav=e},expression:"bottomNav"}},[i("v-card",{staticClass:"transparent mx-auto",attrs:{flat:"","max-width":"2400",width:"80%"}},[i("v-row",{attrs:{align:"start",justify:"end",width:"100%"}},[i("v-col",{attrs:{cols:"12",sm:"12",md:"5",lg:"5"}},[i("v-row",{staticClass:"mt-5 justify-center justify-md-start pl-md-5"},[i("a",{staticClass:"social-icon",attrs:{href:"https://www.instagram.com/nailsaustralia",target:"_blank",fab:""}},[i("IconInstagram")],1),i("a",{staticClass:"social-icon",attrs:{href:"https://www.instagram.com/nailsaustralia_shop",target:"_blank",fab:""}},[i("IconInstagram")],1),i("a",{staticClass:"social-icon",attrs:{href:"https://www.facebook.com/nailsaustralia",target:"_blank",fab:""}},[i("IconFacebook")],1)]),i("v-row",{staticClass:"mt-5 text-center text-md-left"},[i("v-card-text",{staticClass:"justify-sm-center darkGrey--text pa-2 pa-sm-4"},[i("h2",[t._v("32 Brewer rd, Bentleigh 3204 VIC")]),i("a",{staticClass:"darkGrey--text",attrs:{href:"mailto:nailsauinfo@gmail.com"}},[i("h3",{staticClass:"gmail"},[t._v("nailsauinfo@gmail.com")])])])],1)],1),i("v-col",{attrs:{cols:"6",sm:"4",md:"2",lg:"2"}},[i("v-card-text",{staticClass:"darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4"},[i("h3",{staticClass:"mb-2 mt-sm-2"},[t._v("Shop")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("cuticle-nippers")}}},[t._v("Nippers")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("cuticle-scissors")}}},[t._v("Scissors")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("pushers")}}},[t._v("Pushers\\Curette")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("diamond-drill-bits")}}},[t._v("Drill bits")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("cosmetics")}}},[t._v("Cosmetics")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("brushes")}}},[t._v("Brushes")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToShopRoute("promotions")}}},[t._v("Promotions")])])],1),i("v-col",{attrs:{cols:"6",sm:"3",md:"2",lg:"2"}},[i("v-card-text",{staticClass:"darkGrey--text no-wrap text-center text-sm-left pa-2 pa-sm-4"},[i("h3",{staticClass:"route mb-2 mt-sm-2"},[t._v("Courses")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToRoute("courses")}}},[t._v("Manicure")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToRoute("courses")}}},[t._v("Pedicure")]),i("h4",{staticClass:"route mb-1",on:{click:function(e){return t.goToRoute("courses")}}},[t._v("Design")])])],1),i("v-col",{attrs:{cols:"12",sm:"5",md:"3",lg:"3"}},[i("v-card-text",{staticClass:"darkGrey--text no-wrap text-center text-sm-left pt-0 pb-2 py-sm-4"},[i("h2",{staticClass:"route",on:{click:function(e){return t.goToRoute("products-cart")}}},[t._v("Payment")]),i("h2",{staticClass:"route",on:{click:function(e){return t.goToRoute("delivery")}}},[t._v("Delivery")]),i("h2",{staticClass:"route",on:{click:function(e){return t.goToRoute("return")}}},[t._v("Return")]),i("p"),i("h2",{staticClass:"route",on:{click:function(e){return t.goToRoute("add-course")}}},[t._v("Add course")]),i("h2",{staticClass:"route",on:{click:function(e){return t.goToRoute("cooperation")}}},[t._v("Cooperation")])])],1)],1)],1),i("div",{staticClass:"py-4 homefone",staticStyle:{position:"absolute",bottom:"0",right:"0",left:"0"}})],1)],1)},n=[],s=(i("b0c0"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{attrs:{"xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:cc":"http://creativecommons.org/ns#","xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:sodipodi":"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd","xmlns:inkscape":"http://www.inkscape.org/namespaces/inkscape",viewBox:"0 0 34.91592 33.669369",version:"1.1",id:"svg127","inkscape:version":"1.0.1 (3bc2e813f5, 2020-09-07)","sodipodi:docname":"1.svg"}},[i("defs",{attrs:{id:"defs121"}}),i("sodipodi:namedview",{attrs:{id:"base",borderopacity:"1.0","inkscape:pageopacity":"0.0","inkscape:pageshadow":"2","inkscape:zoom":"5.6","inkscape:cx":"64.473721","inkscape:cy":"71.604421","inkscape:document-units":"mm","inkscape:current-layer":"layer1","inkscape:document-rotation":"0",showgrid:"false","inkscape:window-width":"1880","inkscape:window-height":"1015","inkscape:window-x":"40","inkscape:window-y":"28","inkscape:window-maximized":"1"}}),i("metadata",{attrs:{id:"metadata124"}},[i("rdf:RDF",[i("cc:Work",{attrs:{"rdf:about":""}},[i("dc:format",[t._v("image/svg+xml")]),i("dc:type",{attrs:{"rdf:resource":"http://purl.org/dc/dcmitype/StillImage"}}),i("dc:title")],1)],1)],1),i("g",{attrs:{"inkscape:label":"Слой 1","inkscape:groupmode":"layer",id:"layer1",transform:"translate(-21.851564,-131.33198)"}},[i("path",{staticClass:"fil0",staticStyle:{"clip-rule":"evenodd",fill:"#262624","fill-rule":"evenodd","stroke-width":"0.0125914","image-rendering":"optimizeQuality","shape-rendering":"geometricPrecision","text-rendering":"geometricPrecision"},attrs:{d:"m 56.767483,148.16667 c 0,-9.30504 -7.819252,-16.83469 -17.451663,-16.83469 -9.645003,0 -17.464256,7.52965 -17.464256,16.83469 0,9.29244 7.819253,16.83468 17.464256,16.83468 9.632411,0 17.451663,-7.54224 17.451663,-16.83468 z",id:"path85"}}),i("path",{staticClass:"fil1",staticStyle:{"clip-rule":"evenodd",fill:"#ffc44a","fill-rule":"evenodd","stroke-width":"0.0125914","image-rendering":"optimizeQuality","shape-rendering":"geometricPrecision","text-rendering":"geometricPrecision"},attrs:{d:"m 43.420613,143.01679 c 0,-0.55402 0.440698,-0.99472 0.994719,-0.99472 0.54143,0 0.99472,0.4407 0.99472,0.99472 0,0.54143 -0.45329,0.99472 -0.99472,0.99472 -0.554021,0 -0.994719,-0.45329 -0.994719,-0.99472 z m -0.528839,-3.81519 h -7.151908 c -2.89602,0 -5.2632,2.36718 -5.2632,5.2632 v 7.40374 c 0,2.89601 2.36718,5.2632 5.2632,5.2632 h 7.151908 c 2.883428,0 5.250609,-2.36719 5.250609,-5.2632 v -7.40374 c 0,-2.89602 -2.367181,-5.2632 -5.250609,-5.2632 z m -3.62632,5.25061 c 2.127945,0 3.865557,1.73761 3.865557,3.86555 0,2.14054 -1.737612,3.87815 -3.865557,3.87815 -2.140536,0 -3.878147,-1.73761 -3.878147,-3.87815 0,-2.12794 1.737611,-3.86555 3.878147,-3.86555 z",id:"path91"}}),i("path",{staticClass:"fil1",staticStyle:{"clip-rule":"evenodd",fill:"#ffc44a","fill-rule":"evenodd","stroke-width":"0.0125914","image-rendering":"optimizeQuality","shape-rendering":"geometricPrecision","text-rendering":"geometricPrecision"},attrs:{d:"m 42.287388,148.34295 c 0,-1.67466 -1.35987,-3.03453 -3.034525,-3.03453 -1.674655,0 -3.034525,1.35987 -3.034525,3.03453 0,1.67465 1.35987,3.03452 3.034525,3.03452 1.674655,0 3.034525,-1.35987 3.034525,-3.03452 z",id:"path93"}})])],1)}),o=[],r={props:["width"]},c=r,l=i("2877"),u=Object(l["a"])(c,s,o,!1,null,null,null),d=u.exports,h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("svg",{attrs:{"xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:cc":"http://creativecommons.org/ns#","xmlns:rdf":"http://www.w3.org/1999/02/22-rdf-syntax-ns#","xmlns:svg":"http://www.w3.org/2000/svg",xmlns:"http://www.w3.org/2000/svg","xmlns:sodipodi":"http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd","xmlns:inkscape":"http://www.inkscape.org/namespaces/inkscape",viewBox:"0 0 34.928513 33.669373",version:"1.1",id:"svg191","inkscape:version":"1.0.1 (3bc2e813f5, 2020-09-07)","sodipodi:docname":"2.svg"}},[i("defs",{attrs:{id:"defs185"}}),i("sodipodi:namedview",{attrs:{id:"base",pagecolor:"#ffffff",bordercolor:"#666666",borderopacity:"1.0","inkscape:pageopacity":"0.0","inkscape:pageshadow":"2","inkscape:zoom":"5.6","inkscape:cx":"76.709304","inkscape:cy":"66.876869","inkscape:document-units":"mm","inkscape:current-layer":"layer1","inkscape:document-rotation":"0",showgrid:"false","inkscape:window-width":"1880","inkscape:window-height":"1015","inkscape:window-x":"40","inkscape:window-y":"28","inkscape:window-maximized":"1"}}),i("metadata",{attrs:{id:"metadata188"}},[i("rdf:RDF",[i("cc:Work",{attrs:{"rdf:about":""}},[i("dc:format",[t._v("image/svg+xml")]),i("dc:type",{attrs:{"rdf:resource":"http://purl.org/dc/dcmitype/StillImage"}}),i("dc:title")],1)],1)],1),i("g",{attrs:{"inkscape:label":"Слой 1","inkscape:groupmode":"layer",id:"layer1",transform:"translate(-1.2280329,-1.3066833)"}},[i("path",{staticClass:"fil0",staticStyle:{"clip-rule":"evenodd",fill:"#262624","fill-rule":"evenodd","stroke-width":"0.0125914","image-rendering":"optimizeQuality","shape-rendering":"geometricPrecision","text-rendering":"geometricPrecision"},attrs:{d:"m 36.156544,18.141369 c 0,-9.2924447 -7.819252,-16.8346857 -17.464255,-16.8346857 -9.6450042,0 -17.4642561,7.542241 -17.4642561,16.8346857 0,9.305037 7.8192519,16.834686 17.4642561,16.834686 9.645003,0 17.464255,-7.529649 17.464255,-16.834686 z",id:"path87"}}),i("path",{staticClass:"fil2",staticStyle:{"clip-rule":"evenodd",fill:"#ffc44a","fill-rule":"nonzero","stroke-width":"0.0125914","image-rendering":"optimizeQuality","shape-rendering":"geometricPrecision","text-rendering":"geometricPrecision"},attrs:{d:"m 13.781647,13.822523 h 2.228676 v -1.158408 c 0,-1.27173 0.138505,-2.228676 0.415516,-2.8582447 0.27701,-0.642161 0.591795,-1.27173 1.309505,-1.750203 0.692526,-0.465881 1.422826,-0.679935 2.54346,-0.755483 1.246547,-0.07555 1.9013,-0.05036 3.311535,-0.03777 v 3.2108037 c -0.7303,0.02518 -1.27173,-0.02518 -1.901299,0.05036 -0.591796,0.07555 -1.007312,0.352559 -1.25914,0.629569 -0.264419,0.26442 -0.402924,0.793258 -0.402924,1.573924 v 1.095451 h 3.021933 v 3.160439 h -3.021933 v 12.06255 h -4.016653 v -12.06255 h -2.228676 z",id:"path95"}})])],1)},p=[],m={},f=Object(l["a"])(m,h,p,!1,null,null,null),g=f.exports,v={name:"Footer",props:[],components:{IconInstagram:d,IconFacebook:g},data:function(){return{bottomNav:null}},computed:{},methods:{goToShopRoute:function(t){this.$route.params.categoryName!==t&&this.$router.push({name:"shop",params:{categoryName:t}})},goToRoute:function(t){this.$route.name!==t&&this.$router.push({name:t})}}},b=v,w=(i("bae0"),i("6544")),y=i.n(w),k=(i("a9e3"),i("c7cd"),i("5530")),x=(i("dd43"),i("3a66")),S=i("604c"),C=S["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return S["a"].options.computed.classes.call(this)}},methods:{genData:S["a"].options.methods.genData}}),V=i("a9ad"),T=i("24b2"),_=i("a452"),I=i("277e"),A=i("7560"),O=i("f2e7"),R=i("58df"),j=i("d9bd"),z=Object(R["a"])(Object(x["a"])("bottom",["height","inputValue"]),V["a"],T["a"],Object(O["b"])("inputValue"),_["a"],I["a"],A["a"]).extend({name:"v-bottom-navigation",props:{activeClass:{type:String,default:"v-btn--active"},backgroundColor:String,grow:Boolean,height:{type:[Number,String],default:56},hideOnScroll:Boolean,horizontal:Boolean,inputValue:{type:Boolean,default:!0},mandatory:Boolean,shift:Boolean},data:function(){return{isActive:this.inputValue}},computed:{canScroll:function(){return I["a"].options.computed.canScroll.call(this)&&(this.hideOnScroll||!this.inputValue)},classes:function(){return{"v-bottom-navigation--absolute":this.absolute,"v-bottom-navigation--grow":this.grow,"v-bottom-navigation--fixed":!this.absolute&&(this.app||this.fixed),"v-bottom-navigation--horizontal":this.horizontal,"v-bottom-navigation--shift":this.shift}},styles:function(){return Object(k["a"])(Object(k["a"])({},this.measurableStyles),{},{transform:this.isActive?"none":"translateY(100%)"})}},created:function(){this.$attrs.hasOwnProperty("active")&&Object(j["a"])("active.sync","value or v-model",this)},methods:{thresholdMet:function(){this.isActive=!this.isScrollingUp,this.$emit("update:input-value",this.isActive)},updateApplication:function(){return this.$el?this.$el.clientHeight:0},updateValue:function(t){this.$emit("change",t)}},render:function(t){var e=this.setBackgroundColor(this.backgroundColor,{staticClass:"v-bottom-navigation",class:this.classes,style:this.styles,props:{activeClass:this.activeClass,mandatory:Boolean(this.mandatory||void 0!==this.value),value:this.internalValue},on:{change:this.updateValue}});return this.canScroll&&(e.directives=e.directives||[],e.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),t(C,this.setTextColor(this.color,e),this.$slots.default)}}),$=i("b0af"),M=i("99d9"),P=i("62ad"),B=i("0fd9"),D=Object(l["a"])(b,a,n,!1,null,"1b64cefb",null);e["default"]=D.exports;y()(D,{VBottomNavigation:z,VCard:$["a"],VCardText:M["b"],VCol:P["a"],VRow:B["a"]})}}]);
//# sourceMappingURL=chunk-314ba62f.b1577eb4.js.map