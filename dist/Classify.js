define("Classify.Interface",[],function(){function a(b){function c(a,b){var c;for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c])}function d(){c(this,b)}return b.Name=b.Name||"Unnamed",b.Extends&&(a.prototype=b.Extends),new d}return a}),define("Classify.Abstract",["Trinity/Classify","require"],function(a,b){function c(a){function c(){if(this.$initializing)b.apply(this,arguments);else throw new Error("An abstract class cannot be instantiated.")}var b=a.initialize;a.initialize=c}return function(d){a=b("Trinity/Classify"),c(d);var e=a(d);return e.$abstract=!0,e}}),define("Trinity/Classify",["Classify.Abstract","Classify.Interface"],function(a,b){function c(a){function c(a,b){var c;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c])}function d(a,b){var d,e=a.length,f,g;for(d=0;d<e;d+=1)g=a[d],g.prototype&&g.prototype.constructor?(f=g.prototype.constructor,delete g.prototype.constructor,c(g.prototype,b.prototype),g.prototype.constructor=f):c(g.prototype||g,b.prototype)}function e(a,c,d){var e=function(a){return Function.prototype.bind?a.bind(c):function(){return a.apply(c,arguments)}},f=a.length-1;for(f;f>=0;f-=1)d[a[f]]=e(d[a[f]],b)}function f(a){function b(){}return b.prototype=a,new b}function g(a,b){var c,d,e,f;for(c=a.length-1;c>=0;c-=1){f=a[c];for(d in f)if(f.hasOwnProperty(d)){if(d!=="Name"&&d!=="Statics"&&!b.prototype.hasOwnProperty(d))throw new Error("Class does not implements Interface "+f.Name+" correctly, "+d+" was not found");if(d==="Statics"){if(!b.prototype.hasOwnProperty(d))throw new Error("Class does not implements Interface "+f.Name+" correctly, "+d+"object was not found");for(e in f.Statics)if(f.Statics.hasOwnProperty(e)&&!b.hasOwnProperty(e))throw new Error("Class does not implements Interface "+f.Name+" correctly, static method "+d+"  was not found")}}}}var b=a.initialize;return a.Extends?(b=b||a.Extends.prototype.initialize,b.Super=a.Extends.prototype,b.prototype=f(b.Super),c(a,b.prototype)):(b=b||function(){},b.prototype=a),b.prototype.constructor=b,a.Borrows&&(d(a.Borrows,b),delete b.prototype.Borrows),a.Binds&&(e(a.Binds,b,b.prototype),delete b.prototype.Binds),a.Statics&&c(a.Statics,b),a.Implements&&(g(a.Implements,b),delete b.prototype.Implements),a.Statics&&delete b.prototype.Statics,b}return c.Abstract=a,c.Interface=b,c})