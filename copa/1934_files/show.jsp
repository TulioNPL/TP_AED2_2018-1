wr_boardsize = null;window.Scroller = null;var hwPal1503487739 = {};function hw_exl_dw(str_request){try {document.write("<SCRIPT type='text/javascript' charset='ISO-8859-1' language='JavaScript1.1' SRC='" + str_request + "'></S" + "CRIPT>");return true;}catch(e){return false; }};/*! v1.0.2 - 2014-03-25 */ !function(a){"use strict";function b(b,c){for(var d,e=b.split(/[.:]+/),f=a,g=0,h=e.length;h>g;g++)d=g==h-1,f[e[g]]=d?c:f[e[g]]||{},f=f[e[g]];return f}function c(a,c,d){var e="object"==typeof d&&d.length>0;return b(a,c.apply(null,e?d:[]))}a.ClassModule=b,a.ObjectModule=c}(window);
/*! v1.0.70 - 2017-07-11 */ !function(a,b,c){b[a]=c()}("Fingerprint",this,function(){"use strict";var a=function(a){var b,c;b=Array.prototype.forEach,c=Array.prototype.map,this.each=function(a,c,d){if(null!==a)if(b&&a.forEach===b)a.forEach(c,d);else if(a.length===+a.length){for(var e=0,f=a.length;e<f;e++)if(c.call(d,a[e],e,a)==={})return}else for(var g in a)if(a.hasOwnProperty(g)&&c.call(d,a[g],g,a)==={})return},this.map=function(a,b,d){var e=[];return null==a?e:c&&a.map===c?a.map(b,d):(this.each(a,function(a,c,f){e[e.length]=b.call(d,a,c,f)}),e)},"object"==typeof a?(this.hasher=a.hasher,this.screen_resolution=a.screen_resolution,this.screen_orientation=a.screen_orientation,this.canvas=a.canvas,this.ie_activex=a.ie_activex):"function"==typeof a&&(this.hasher=a)};return a.prototype={get:function(){var a=[];if(a.push(navigator.userAgent),a.push(navigator.language),a.push(screen.colorDepth),this.screen_resolution){void 0!==this.getScreenResolution()&&a.push(this.getScreenResolution().join("x"))}a.push((new Date).getTimezoneOffset()),a.push(this.hasSessionStorage()),a.push(this.hasLocalStorage()),a.push(!!window.indexedDB),document.body?a.push(typeof document.body.addBehavior):a.push("undefined"),a.push(typeof window.openDatabase),a.push(navigator.cpuClass),a.push(navigator.platform),a.push(navigator.doNotTrack),a.push(this.getPluginsString()),this.canvas&&this.isCanvasSupported()&&a.push(this.getCanvasFingerprint());var b=function(a){return a};return this.hasher?this.hasher(a.join(b("#")+b("#")+b("#")),31):this.murmurhash3_32_gc(a.join(b("#")+b("#")+b("#")),31)},murmurhash3_32_gc:function(a,b){var c,d,e,f,g,h,i,j;for(c=3&a.length,d=a.length-c,e=b,g=3432918353,h=461845907,j=0;j<d;)i=255&a.charCodeAt(j)|(255&a.charCodeAt(++j))<<8|(255&a.charCodeAt(++j))<<16|(255&a.charCodeAt(++j))<<24,++j,i=(65535&i)*g+(((i>>>16)*g&65535)<<16)&4294967295,i=i<<15|i>>>17,i=(65535&i)*h+(((i>>>16)*h&65535)<<16)&4294967295,e^=i,e=e<<13|e>>>19,f=5*(65535&e)+((5*(e>>>16)&65535)<<16)&4294967295,e=27492+(65535&f)+((58964+(f>>>16)&65535)<<16);switch(i=0,c){case 3:i^=(255&a.charCodeAt(j+2))<<16;case 2:i^=(255&a.charCodeAt(j+1))<<8;case 1:i^=255&a.charCodeAt(j),i=(65535&i)*g+(((i>>>16)*g&65535)<<16)&4294967295,i=i<<15|i>>>17,i=(65535&i)*h+(((i>>>16)*h&65535)<<16)&4294967295,e^=i}return e^=a.length,e^=e>>>16,e=2246822507*(65535&e)+((2246822507*(e>>>16)&65535)<<16)&4294967295,e^=e>>>13,e=3266489909*(65535&e)+((3266489909*(e>>>16)&65535)<<16)&4294967295,(e^=e>>>16)>>>0},hasLocalStorage:function(){try{return!!window.localStorage}catch(a){return!0}},hasSessionStorage:function(){try{return!!window.sessionStorage}catch(a){return!0}},isCanvasSupported:function(){var a=document.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName||!("Netscape"!==navigator.appName||!/Trident/.test(navigator.userAgent))},getPluginsString:function(){return this.isIE()&&this.ie_activex?this.getIEPluginsString():this.getRegularPluginsString()},getRegularPluginsString:function(){return this.map(navigator.plugins,function(a){var b=this.map(a,function(a){return[a.type,a.suffixes].join("~")}).join(",");return[a.name,a.description,b].join("::")},this).join(";")},getIEPluginsString:function(){if(window.ActiveXObject){var a=["ShockwaveFlash.ShockwaveFlash","AcroPDF.PDF","PDF.PdfCtrl","QuickTime.QuickTime","rmocx.RealPlayer G2 Control","rmocx.RealPlayer G2 Control.1","RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)","RealVideo.RealVideo(tm) ActiveX Control (32-bit)","RealPlayer","SWCtl.SWCtl","WMPlayer.OCX","AgControl.AgControl","Skype.Detection"];return this.map(a,function(a){try{return new ActiveXObject(a),a}catch(b){return null}}).join(";")}return""},getScreenResolution:function(){return this.screen_orientation?screen.height>screen.width?[screen.height,screen.width]:[screen.width,screen.height]:[screen.height,screen.width]},getCanvasFingerprint:function(){var a=document.createElement("canvas"),b=a.getContext("2d"),c="BrowserLeaks,com <canvas> 1.0";return b.textBaseline="top",b.font="14px 'Arial'",b.textBaseline="alphabetic",b.fillStyle="#f60",b.fillRect(125,1,62,20),b.fillStyle="#069",b.fillText(c,2,15),b.fillStyle="rgba(102, 204, 0, 0.7)",b.fillText(c,4,17),a.toDataURL()}},a}),ObjectModule("hotwords.core.Utils",function(){var a={},b="mrg_hw_l",c="hotwordsIframeEvents";a.callbacks={onLoad:"onLoad",onView:"onView",onTime:"onTime",onClose:"onClose",onBeforeClose:"onBeforeClose",onTrueViewEnded:"onTrueViewEnded"};var d=function(a){return a.replace(/([^:]+:\/\/[^\/]+).*/,"$1")};return a.sendIframeMessageToParent=function(e,f){var g=function(){var a=b.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]"),c=new RegExp("[\\?&]"+a+"=([^&#]*)"),d=c.exec(location.search);return null===d?"":decodeURIComponent(d[1].replace(/\+/g," "))};a.sendMessageToParent(c,d(g()),e,f)},a.sendMessageToParent=function(a,b,c,d){if("object"==typeof window.parent){var e=JSON.stringify({owner:a,action:c,params:d});window.parent.postMessage(e,b)}else console.log("[HW-ADS] there's no window.parent instance to use.")},a.receiveMessageFromIframe=function(a){var b={publish:hotwords.core.Mediator.publish};!function(a){window.addEventListener?window.addEventListener("message",a):window.attachEvent&&window.attachEvent("onmessage",a)}(function(e){if(d(e.origin)===d(a)){var f=function(a){return null!==a&&"object"==typeof a&&"string"==typeof a.owner&&"string"==typeof a.action&&a.owner===c},g=JSON.parse(e.data),h=(g.owner,g.action),i=g.params;f(g)&&b[h].apply({},i)}})},a.closedChannelNameFor=function(b){return a.capitalize(b)+".closed"},a.displayedChannelNameFor=function(b){return a.capitalize(b)+".displayed"},a.capitalize=function(a){return"string"==typeof a&&a.length>0?a.charAt(0).toUpperCase()+a.slice(1):a},a.asyncRun=function(a,b,c){setTimeout(function(){(b||Function).apply(a,c)},0)},a.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)},a.map=function(b,c){var d=function(b,c,e,f){if(null!==b&&void 0!==b&&(e=f(e,b)),!a.isArray(c))return e;var g=c.length>0?c[0]:null,h=c.length>1?c.slice(1,c.length):null;return d(g,h,e,f)};return d(null,b,[],function(a,b){return a[a.length]=c(b),a})},a.executeOnceAndRemove=function(a,b){void 0!==a&&null!==a&&((a[b]||Function)(),a[b]&&(a[b]=null))},a.forEach=function(a,b){for(var c=0;c<a.length;c++)b(a[c])},a.createTag=function(a,b){return b(document.createElement(a))},a.loadStylesheet=function(a,b){var c=document.createElement("style"),d=b||"screen";c.type="text/css",c.media=d,c.styleSheet?c.styleSheet.cssText=a:c.appendChild(document.createTextNode(a)),document.getElementsByTagName("head")[0].appendChild(c)},a.loadJavascript=function(a,b){try{var c=!1,d=document.getElementsByTagName("head")[0],e=document.createElement("script");if(e.type="text/javascript",e.charset="ISO-8859-1",e.src=a,b&&(e.onreadystatechange=e.onload=function(){c||b(),c=!0}),null!==d)d.appendChild(e);else{var f=document.getElementsByTagName("body")[0];null!==f&&f.appendChild(e)}return!0}catch(g){return window.console&&window.console.log(g),!1}},a.setCookie=function(a,b,c,d,e,f){var g=new Date,h=0;g.setTime(g.getTime()),c&&(h=1e3*c*60*60);var i=new Date(g.getTime()+h);document.cookie=a+"="+escape(b)+(h?";expires="+i.toGMTString():"")+(d?";path="+d:"")+(e?";domain="+e:"")+(f?";secure":"")},a.getCookie=function(a){for(var b,c,d=document.cookie.split(";"),e=0;e<d.length;e++)if(b=d[e].substr(0,d[e].indexOf("=")),c=d[e].substr(d[e].indexOf("=")+1),b.replace(/^\s+|\s+$/g,"")==a)return unescape(c);return null},a.getUID=function(a){return new Fingerprint({ie_activex:!0,screen_resolution:!0,screen_orientation:!0}).get()},a.appendImage=function(a,b,c,d,e,f){var g=document.createElement("img");g.src=b,g.width=d,g.height=e,g.border=c;for(var h in f)g.style[h]=f[h];return document.getElementById(a).appendChild(g),g},a.interpolate=function(a,b){var c=a;for(var d in b){var e=new RegExp("#{"+d+"}","g");c=c.replace(e,b[d])}return c},a}),ObjectModule("hotwords.core.BrowserDetect",function(){var a={};return a.isFirstNodeADocType=function(){var a=document.firstChild;return a&&(10===a.nodeType||8===a.nodeType&&"innerHTML"in a&&""===a.innerHTML)},a.isInternetExplorerVersionLessThan8=function(){return a.isInternetExplorer()&&document.all&&!document.querySelector},a.isInternetExplorerVersionLessThan9=function(){return a.isInternetExplorer()&&window.attachEvent&&!window.addEventListener},a.isInternetExplorer=function(){return new RegExp(".*MSIE.*").test(navigator.appVersion)},a.isInternetExplorerInQuirksMode=function(){return a.isInternetExplorer()&&"BackCompat"===document.compatMode},a.isTouchDevice=function(){return"ontouchstart"in document.documentElement},a.isFlashEnabled=function(){var a=[{name:"ShockwaveFlash.ShockwaveFlash.7"},{name:"ShockwaveFlash.ShockwaveFlash.6"},{name:"ShockwaveFlash.ShockwaveFlash"}],b=function(a){return function(){try{return a.GetVariable("$version")}catch(b){return-1}}()||-1},c=function(a){return function(){try{return new ActiveXObject(a)}catch(b){return{activeXError:!0}}}()||-1};if(navigator.plugins&&navigator.plugins.length>0){var d="application/x-shockwave-flash",e=navigator.mimeTypes;if(e&&e[d]&&e[d].enabledPlugin&&e[d].enabledPlugin.description)return!0}else if(-1===navigator.appVersion.indexOf("Mac")&&navigator.appName.indexOf("Microsoft")>-1)for(var f=0;f<a.length&&-1==b();f++){var g=c(a[f].name);if(!g.activeXError)return!0}return!1},a.addEventListener=function(a,b){document.addEventListener?document.addEventListener(a,b):document.attachEvent&&document.attachEvent(a,b)},a.removeEventListener=function(a,b){document.removeEventListener?document.removeEventListener(a,b):document.detachEvent&&document.detachEvent(a,b)},a.getOrientation=function(){return 90===Math.abs(window.orientation)||-90===Math.abs(window.orientation)?"LANDSCAPE":"PORTRAIT"},a.supportCanvas=function(){var a=document.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},a.supportVideo=function(){var a=!1,b=document.createElement("video");return b.canPlayType&&b.canPlayType("video/mp4").replace(/^no$/,"")&&(a=!0),a},a.supportLocalStorage=function(){try{if(!("localStorage"in window&&null!==window.localStorage))return!1;var a="_localStorageExists";return localStorage.setItem(a,!0),localStorage.removeItem(a),!0}catch(b){return!1}},a}),ObjectModule("hotwords.core.Mediator",function(){var a={},b={},c={},d=0,e=function(){return"uid_"+(d+=1)};return a.clear=function(){b={},c={}},a.messageAlreadyPublished=function(a){var b=c[a];return 2!==arguments.length||void 0!==b&&null!==b?b:arguments[1]},a.subscribe=function(a,c,d){var f=e();return b[c]||(b[c]={}),b[c][f]={uid:f,context:a,callback:d},f},a.unsubscribe=function(a,c){try{return!("string"!=typeof a||!b[c]||!b[c][a])&&(delete b[c][a],!0)}catch(d){return console.log(d),!1}},a.publish=function(a){try{var d=Array.prototype.slice.call(arguments,1);if(c[a]=d&&d.length>0?d[0]:d,!b[a])return!1;for(var e in b[a]){var f=b[a][e],g=new Array(f.uid,a).concat(d);f.callback.apply(f.context,g)}return!0}catch(h){return console.log(h),!1}},a});
var mobileDetect = false; var flashDetect = function() { return (hotwords.core.BrowserDetect).isFlashEnabled(); }(); var canvasTagDetect = function() { return (hotwords.core.BrowserDetect).supportCanvas(); }(); var videoTagDetect = function() { return (hotwords.core.BrowserDetect).supportVideo(); }(); var localStorageDetect = function() { return (hotwords.core.BrowserDetect).supportLocalStorage(); }(); var featuresDetect = (function(){function n(n,o){var r=n.length,t=o.length;n:for(var e=0;r-t>=e;e++){for(var a=0;t>a;a++)if(o.charAt(a)!==n.charAt(e+a))continue n;return e}return-1}var o="";/HeadlessChrome/.test(window.navigator.userAgent)&&(o+="crhl."),navigator.plugins instanceof PluginArray&&0!=navigator.plugins.length||(o+="gepl."),""==navigator.languages&&(o+="gela."),Function.prototype.bind||(o+="gebd."),(""+Function.prototype.bind).replace(/bind/g,"Error")!=""+Error&&(o+="gerp1."),(""+Function.prototype.toString).replace(/toString/g,"Error")!=""+Error&&(o+="gerp2."),/PhantomJS/.test(window.navigator.userAgent)&&(o+="pthl1."),(window.callPhantom||window._phantom)&&(o+="pthl2."),window.__phantomas&&(o+="pthl3.");try{null[1]()}catch(r){n(r.stack,"phantomjs")>-1&&(o+="pter.")}return window.Buffer&&(o+="ndbf."),window.emit&&(o+="coem."),window.spawn&&(o+="rhsp."),window.webdriver&&(o+="sewd."),(window.domAutomation||window.domAutomationController)&&(o+="umau."),""===o?"nobo.":o})();(function() {  }());  (function(){ hotwords.core.Mediator.publish('Richmedia.closed', false); }());   (function(){ hotwords.core.Mediator.publish('Richmedia.displayed', false); }()); function hw_exl(str_request, idr){try {var head = document.getElementsByTagName('head')[0];var scriptElement = document.createElement('script');scriptElement.type = 'text/javascript';if (typeof idr != 'undefined') {scriptElement.id = idr;}scriptElement.charset = 'ISO-8859-1';scriptElement.src = str_request;if (head != null) {head.appendChild(scriptElement);}else{var head = document.getElementsByTagName('body')[0];if (head != null) {head.appendChild(scriptElement);}}return true;}catch(e){return false; }};function hw_replace(t, de, para){var str = t;var pos = str.indexOf(de);while (pos > -1){str = str.replace(de, para);pos = str.indexOf(de);}return str;};function hw_escape(url){var b = hw_replace(url, " ","%20");b = hw_replace(b, "&","%26");b = hw_replace(b, "#","%23");b = hw_replace(b, "?","%3F");b = hw_replace(b, "=","%3D");return b;};function hw_loadjquery(src, callback) { var script = document.createElement('script'), complete = false, attempts = 0; script.setAttribute('src', src); if (callback) { script.onreadystatechange = script.onload = function() { if (!complete && (!this.readyState || this.readyState === 'complete' || (this.readyState === 'loaded' && this.nextSibling != null))) { complete = true; var checkReady = function(cb) { if (attempts < 5) { if (window.jQuery && window.jQuery.fn.jquery === '1.8.2') { cb(jQuery); } else { window.setTimeout(function() { checkReady(cb); }, 200); } } }; checkReady(function($) { callback(); }); script.onload = script.onreadystatechange = null; } }; } document.getElementsByTagName('head')[0].appendChild(script); }; function hw_ex3(url, cb) {var f = arguments.callee;if (!('queue' in f)){f.queue = {};}var queue =  f.queue;if (url in queue) {if (cb) {if (queue[url]){queue[url].push(cb);}else{cb();}}return;}queue[url] = cb ? [cb] : [];var script = document.createElement('script');script.type = 'text/javascript';script.defer = true;script.charset = 'ISO-8859-1';script.onload = script.onreadystatechange = function() {if (script.readyState && script.readyState != 'loaded' && script.readyState != 'complete'){return;}script.onreadystatechange = script.onload = null;while (queue[url].length){queue[url].shift()();}queue[url] = null;};script.src = url;document.getElementsByTagName('head')[0].appendChild(script);}; function loadCssHOTWords(filename, imprimir){
var fileref=document.createElement("link");fileref.setAttribute("rel", "stylesheet");fileref.setAttribute("type", "text/css");fileref.setAttribute("href", filename);if(imprimir){fileref.setAttribute("media", "print");}else{fileref.setAttribute("media", "screen");}var head = document.getElementsByTagName('head')[0];if (head != null) {if (head.firstChild != null) {head.insertBefore(fileref, head.lastChild);} else {head.appendChild(fileref);}}};
try{var site = document.location.href;var refe = '';if (document.referrer){if ((document.referrer.indexOf("google") > 0) || (document.referrer.indexOf("yahoo") > 0) || (document.referrer.indexOf("bing") > 0)){refe = document.referrer;}}var ifram = '';if (window.top.location != self.location){var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0); var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); ifram = '&iframe=si';ifram += '&iframeh='+h;ifram += '&iframew='+w;}if(typeof hotwwords == 'undefined'){var _hwu = (function() { return hotwords.core.Utils.getUID() + '337779154'; }()); hw_exl('http://zone28.hotwords.com.br/script.js?cor=0000FF&atr=id&vatr=HOTWordsTxt&tag=div&id=5841&hq=96575510&preview=false&k=iYnOD1bHBde1mdm0odC3mZK%23&d=' + hw_escape(site) + '&ref=' + hw_escape(refe) + ifram + '&fla=' + flashDetect + '&mob=' + mobileDetect + '&cvs=' + canvasTagDetect + '&vid=' + videoTagDetect + '&lss=' + localStorageDetect + '&hbft=' + featuresDetect + '&bf=' + _hwu);hw_exl_dw('http://zone28.hotwords.com.br/main.js?cor=0000FF&atr=id&vatr=HOTWordsTxt&tag=div&id=5841&hq=96575510&k=iYnOD1bHBde1mdm0odC3mZK%23&d=' + hw_escape(site) + '&ref=' + hw_escape(refe) + ifram + '&fla=' + flashDetect + '&mob=' + mobileDetect + '&cvs=' + canvasTagDetect + '&vid=' + videoTagDetect + '&lss=' + localStorageDetect + '&bf=' + _hwu);}hotwwords = "OK";}catch(e){}var _comscore = _comscore || [];_comscore.push({ c1: "7", c2: "10128934", c3: "31782500"});(function() {var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";el.parentNode.insertBefore(s, el);})();