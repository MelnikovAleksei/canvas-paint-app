(this["webpackJsonpcanvas-paint-app"]=this["webpackJsonpcanvas-paint-app"]||[]).push([[0],{15:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n.n(a),r=n(9),s=n.n(r),c=(n(15),n(10)),o=n(0),l=n(1),u=n(6),p=n(8),f=function(){return window.innerWidth},h=function(){return window.innerHeight};var d=function(){var e=i.a.useState({width:f(),height:h()}),t=Object(l.a)(e,2),n=t[0],a=t[1];return i.a.useEffect((function(){var e=null,t=function(){clearTimeout(e),e=setTimeout((function(){a({width:f(),height:h()})}),150)};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),n},v=n(2),y=p.a.generator();function x(e,t,n,a,i,r){var s;switch(r){case"line":s=y.line(t,n,a,i);break;case"rectangle":s=y.rectangle(t,n,a-t,i-n)}return{id:e,x1:t,y1:n,x2:a,y2:i,type:r,roughElement:s}}var b=function(e,t,n,a,i){return Math.abs(e-n)<5&&Math.abs(t-a)<5?i:null},m=function(e,t,n){var a=n.type,i=n.x1,r=n.x2,s=n.y1,c=n.y2;switch(a){case"rectangle":var o=b(e,t,i,s,"top-left"),l=b(e,t,r,s,"top-right"),u=b(e,t,i,c,"bottom-left"),p=b(e,t,r,c,"bottom-right");return o||l||u||p||(e>=i&&e<=r&&t>=s&&t<=c?"inside":null);case"line":var f={x:i,y:s},h={x:r,y:c},d={x:e,y:t},v=g(f,h)-(g(f,d)+g(h,d)),y=b(e,t,i,s,"start"),x=b(e,t,r,c,"end"),m=Math.abs(v)<1?"inside":null;return y||x||m}},g=function(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},j=function(e,t,n){return n.map((function(n){return Object(u.a)(Object(u.a)({},n),{},{position:m(e,t,n)})})).find((function(e){return null!==e.position}))};var w=function(){var e=i.a.useState([]),t=Object(l.a)(e,2),n=t[0],a=t[1],r=i.a.useState("none"),s=Object(l.a)(r,2),f=s[0],h=s[1],y=i.a.useState("line"),b=Object(l.a)(y,2),m=b[0],g=b[1],w=i.a.useState(null),O=Object(l.a)(w,2),M=O[0],_=O[1],N=d();i.a.useLayoutEffect((function(){var e=document.querySelector("#canvas");e.getContext("2d").clearRect(0,0,e.width,e.height);var t=p.a.canvas(e);n.forEach((function(e){var n=e.roughElement;return t.draw(n)}))}),[n,N]);var C=function(e,t,i,r,s,c){var l=x(e,t,i,r,s,c),u=Object(o.a)(n);u[e]=l,a(u)},S=function(e){var t,i;if("mousedown"===e.type?(t=e.clientX,i=e.clientY):(t=e.touches[0].clientX,i=e.touches[0].clientY),"selection"===m){var r=j(t,i,n);if(r){var s=t-r.x1,c=i-r.y1;_(Object(u.a)(Object(u.a)({},r),{},{offsetX:s,offsetY:c})),"inside"===r.position?h("moving"):h("resizing")}}else{var l=x(n.length,t,i,t,i,m);a((function(e){return[].concat(Object(o.a)(e),[l])})),_(l),h("drawing")}},E=function(e){var t,a;if("mousemove"===e.type?(t=e.clientX,a=e.clientY):(t=e.touches[0].clientX,a=e.touches[0].clientY),"selection"===m){var i=j(t,a,n);e.target.style.cursor=i?function(e){switch(e){case"top-left":case"bottom-right":case"start":case"end":return"nwse-resize";case"top-right":case"bottom-left":return"nesw-resize";default:return"move"}}(i.position):"default"}if("drawing"===f){var r=n.length-1,s=n[r],o=s.x1,l=s.y1;C(r,o,l,t,a,m)}else if("moving"===f){var u=M.id,p=M.x1,h=M.x2,d=M.y1,v=M.y2,y=M.type,x=t-M.offsetX,b=a-M.offsetY;C(u,x,b,x+(h-p),b+(v-d),y)}else if("resizing"===f){var g=M.id,w=M.type,O=function(e,t,n,a){var i=a.x1,r=a.y1,s=a.x2,c=a.y2;switch(n){case"top-left":case"start":return{x1:e,y1:t,x2:s,y2:c};case"bottom-left":return{x1:e,x2:s,y1:r,y2:t};case"top-right":return{x1:i,x2:e,y1:t,y2:c};case"bottom-right":case"end":return{x1:i,x2:e,y1:r,y2:t};default:return null}}(t,a,M.position,Object(c.a)(M,["id","type","position"])),_=O.x1,N=O.y1,S=O.x2,E=O.y2;C(g,_,N,S,E,w)}},z=function(){if("drawing"===f||"resizing"===f){var e=M.id,t=n[e],a=(t.id,t.type),i=function(e){var t=e.type,n=e.x1,a=e.y1,i=e.x2,r=e.y2;switch(t){case"rectangle":return{x1:Math.min(n,i),x2:Math.max(n,i),y1:Math.min(a,r),y2:Math.max(a,r)};case"line":return n<i||n===i&&a<r?{x1:n,y1:a,x2:i,y2:r}:{x1:i,y1:r,x2:n,y2:a}}}(n[e]),r=i.x1,s=i.y1,c=i.x2,o=i.y2;C(e,r,s,c,o,a)}h("none"),_(null)},X=function(e){var t=e.target.value;g(t)},Y=[{id:1,type:"radio",value:"line",label:"Line",inputClassName:"paint__input",labelClassName:"paint__label"},{id:2,type:"radio",value:"rectangle",label:"Rectangle",inputClassName:"paint__input",labelClassName:"paint__label"},{id:3,type:"radio",value:"selection",label:"Selection",inputClassName:"paint__input",labelClassName:"paint__label"}].map((function(e){return Object(v.jsxs)("label",{className:e.labelClassName,children:[e.label,Object(v.jsx)("input",{type:e.type,checked:m===e.value,onChange:X,value:e.value,className:e.inputClassName})]},e.id)}));return Object(v.jsxs)("div",{className:"paint",children:[Object(v.jsx)("form",{children:Object(v.jsxs)("fieldset",{className:"paint__inputs-fieldset",children:[Object(v.jsx)("legend",{className:"paint__inputs-legent",children:"Shapes:"}),Y]})}),Object(v.jsx)("canvas",{id:"canvas",width:N.width,height:N.height,onMouseDown:S,onTouchStart:S,onTouchMove:E,onMouseMove:E,onMouseUp:z,onTouchEnd:z})]})};var O=function(){return Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(w,{})})};s.a.render(Object(v.jsx)(i.a.StrictMode,{children:Object(v.jsx)(O,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.e2aec71e.chunk.js.map