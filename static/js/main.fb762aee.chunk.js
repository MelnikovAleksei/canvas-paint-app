(this["webpackJsonpcanvas-paint-app"]=this["webpackJsonpcanvas-paint-app"]||[]).push([[0],{16:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n.n(a),r=n(10),s=n.n(r),c=(n(16),n(11)),l=n(0),o=n(1),u=n(7),p=n(6),f=n(9),d=n(2),y=f.a.generator();function h(e,t,n,a,i,r){var s;switch(r){case"line":s=y.line(t,n,a,i);break;case"rectangle":s=y.rectangle(t,n,a-t,i-n)}return{id:e,x1:t,y1:n,x2:a,y2:i,type:r,roughElement:s}}var x=function(e,t,n,a,i){return Math.abs(e-n)<5&&Math.abs(t-a)<5?i:null},v=function(e,t,n){var a=n.type,i=n.x1,r=n.x2,s=n.y1,c=n.y2;switch(a){case"rectangle":var l=x(e,t,i,s,"top-left"),o=x(e,t,r,s,"top-right"),u=x(e,t,i,c,"bottom-left"),p=x(e,t,r,c,"bottom-right");return l||o||u||p||(e>=i&&e<=r&&t>=s&&t<=c?"inside":null);case"line":var f={x:i,y:s},d={x:r,y:c},y={x:e,y:t},h=b(f,d)-(b(f,y)+b(d,y)),v=x(e,t,i,s,"start"),g=x(e,t,r,c,"end"),m=Math.abs(h)<1?"inside":null;return v||g||m}},b=function(e,t){return Math.sqrt(Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2))},g=function(e,t,n){return n.map((function(n){return Object(p.a)(Object(p.a)({},n),{},{position:v(e,t,n)})})).find((function(e){return null!==e.position}))};var m=function(){var e=i.a.useState([]),t=Object(o.a)(e,2),n=t[0],a=t[1],r=i.a.useState("none"),s=Object(o.a)(r,2),y=s[0],x=s[1],v=i.a.useState("line"),b=Object(o.a)(v,2),m=b[0],j=b[1],w=i.a.useState(null),O=Object(o.a)(w,2),M=O[0],_=O[1];i.a.useLayoutEffect((function(){var e=document.querySelector("#canvas");e.getContext("2d").clearRect(0,0,e.width,e.height);var t=f.a.canvas(e);n.forEach((function(e){var n=e.roughElement;return t.draw(n)}))}),[n]);var N=function(e,t,i,r,s,c){var o=h(e,t,i,r,s,c),u=Object(l.a)(n);u[e]=o,a(u)},C=function(e){var t=e.clientX,i=e.clientY;if("selection"===m){var r=g(t,i,n);if(r){var s=t-r.x1,c=i-r.y1;_(Object(p.a)(Object(p.a)({},r),{},{offsetX:s,offsetY:c})),"inside"===r.position?x("moving"):x("resizing")}}else{var o=h(n.length,t,i,t,i,m);a((function(e){return[].concat(Object(l.a)(e),[o])})),_(o),x("drawing")}},S=function(e){var t=e.clientX,a=e.clientY;if("selection"===m){var i=g(t,a,n);e.target.style.cursor=i?function(e){switch(e){case"top-left":case"bottom-right":case"start":case"end":return"nwse-resize";case"top-right":case"bottom-left":return"nesw-resize";default:return"move"}}(i.position):"default"}if("drawing"===y){var r=n.length-1,s=n[r],l=s.x1,o=s.y1;N(r,l,o,t,a,m)}else if("moving"===y){var p=M.id,f=M.x1,d=M.x2,h=M.y1,x=M.y2,v=M.type,b=t-M.offsetX,j=a-M.offsetY;N(p,b,j,b+(d-f),j+(x-h),v)}else if("resizing"===y){var w=M.id,O=M.type,_=function(e,t,n,a){var i=a.x1,r=a.y1,s=a.x2,c=a.y2;switch(n){case"top-left":case"start":return{x1:e,y1:t,x2:s,y2:c};case"bottom-left":return Object(u.a)({x1:e,y2:c,x2:s},"y2",t);case"top-right":return{x1:i,x2:e,y1:t,y2:c};case"bottom-right":case"end":return{x1:i,x2:e,y1:r,y2:t};default:return null}}(t,a,M.position,Object(c.a)(M,["id","type","position"])),C=_.x1,S=_.y1,E=_.x2,z=_.y2;N(w,C,S,E,z,O)}},E=function(){if("drawing"===y||"resizing"===y){var e=M.id,t=n[e],a=(t.id,t.type),i=function(e){var t=e.type,n=e.x1,a=e.y1,i=e.x2,r=e.y2;switch(t){case"rectangle":return{x1:Math.min(n,i),x2:Math.max(n,i),y1:Math.min(a,r),y2:Math.max(a,r)};case"line":return n<i||n===i&&a<r?{x1:n,y1:a,x2:i,y2:r}:{x1:i,y1:r,x2:n,y2:a}}}(n[e]),r=i.x1,s=i.y1,c=i.x2,l=i.y2;N(e,r,s,c,l,a)}x("none"),_(null)},z=function(e){var t=e.target.value;j(t)},k=[{id:1,type:"radio",value:"line",label:"Line",inputClassName:"paint__input",labelClassName:"paint__label"},{id:2,type:"radio",value:"rectangle",label:"Rectangle",inputClassName:"paint__input",labelClassName:"paint__label"},{id:3,type:"radio",value:"selection",label:"Selection",inputClassName:"paint__input",labelClassName:"paint__label"}].map((function(e){return Object(d.jsxs)("label",{className:e.labelClassName,children:[e.label,Object(d.jsx)("input",{type:e.type,checked:m===e.value,onChange:z,value:e.value,className:e.inputClassName})]},e.id)}));return Object(d.jsxs)("div",{className:"paint",children:[Object(d.jsxs)("fieldset",{className:"paint__inputs-fieldset",children:[Object(d.jsx)("legend",{className:"paint__inputs-legent",children:"Shapes:"}),k]}),Object(d.jsx)("canvas",{id:"canvas",width:window.innerWidth,height:window.innerHeight,onMouseDown:C,onTouchStart:C,onTouchMove:S,onMouseMove:S,onMouseUp:E,onTouchEnd:E})]})};var j=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(m,{})})};s.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(j,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.fb762aee.chunk.js.map