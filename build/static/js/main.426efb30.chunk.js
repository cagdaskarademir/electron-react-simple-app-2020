(this["webpackJsonpelectron-react-user-management"]=this["webpackJsonpelectron-react-user-management"]||[]).push([[0],{35:function(e,t,a){e.exports=a(65)},40:function(e,t,a){},58:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(27),c=a.n(r);a(40),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o=a(33),i=a(8),m=a(10),u=a(11),s=a(12),d=a(13),E=a(29),h=a.n(E),p=(a(58),a(59),a(66)),f=a(72),v=a(67),g=a(68),w=a(69),b=a(70),y=a(71),k=window.require("electron").ipcRenderer,j=function(e){Object(d.a)(a,e);var t=Object(s.a)(a);function a(){var e;Object(m.a)(this,a);for(var n=arguments.length,l=new Array(n),r=0;r<n;r++)l[r]=arguments[r];return(e=t.call.apply(t,[this].concat(l))).state={items:[]},e.showUpdateForm=function(e){k.send("show-update-form-with-id",e)},e}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;h.a.get("https://reqres.in/api/users?page=1").then((function(t){e.setState({items:t.data.data}),console.log(t.data.data)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return l.a.createElement("div",{className:"App"},l.a.createElement(p.a,null,l.a.createElement("h1",null,"Hello, world!"),l.a.createElement("p",null,"This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."),l.a.createElement("p",null,l.a.createElement(f.a,{variant:"primary"},"Learn more"))),l.a.createElement(v.a,{fluid:!0},l.a.createElement(g.a,null,l.a.createElement(w.a,{striped:!0,bordered:!0,hover:!0,responsive:!0},l.a.createElement("thead",null,l.a.createElement("tr",null,l.a.createElement("th",null,"#"),l.a.createElement("th",null,"Avatar"),l.a.createElement("th",null,"First Name"),l.a.createElement("th",null,"Last Name"),l.a.createElement("th",null,"Email"),l.a.createElement("th",null,"Action"))),l.a.createElement("tbody",null,this.state.items.map((function(t){return l.a.createElement("tr",{key:t.id},l.a.createElement("td",null,t.id),l.a.createElement("td",null,l.a.createElement("img",{width:128,height:128,className:"mr-3",src:t.avatar,alt:t.first_name+" "+t.last_name+"'s Avatar"})),l.a.createElement("td",null,t.first_name),l.a.createElement("td",null,t.last_name),l.a.createElement("td",null,t.email),l.a.createElement("td",null,l.a.createElement(b.a,{size:"lg",className:"mb-2"},l.a.createElement(f.a,{onClick:function(){return e.showUpdateForm(t.id)}},"Update"),l.a.createElement(f.a,null,"Delete"))))}))))),l.a.createElement(g.a,null,l.a.createElement(y.a,null))))}}]),a}(n.Component),O=(window.require("electron").ipcRenderer,function(e){Object(d.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).state={userId:0},console.log("TEST"),n}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(){console.log("Updated")}},{key:"componentDidMount",value:function(){console.log("Update Form Loaded")}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(f.a,null,"Test"),"TEST : ",this.state.userId)}}]),a}(n.Component)),T=function(){return l.a.createElement(o.a,null,l.a.createElement(i.c,null,l.a.createElement(i.a,{exact:!0,path:"/",component:j}),l.a.createElement(i.a,{exact:!0,path:"/update",component:O})))};c.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[35,1,2]]]);
//# sourceMappingURL=main.426efb30.chunk.js.map