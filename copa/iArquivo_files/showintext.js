/*! v1.0.70 - 2017-07-11 */ ClassModule("hotwords.products.desktop.intext.Ad",function(a,b){var c=3,d={},e={},f=!1,g=!1,h=!1,i=c,j=hotwords.core.Mediator,k=hotwords.core.Utils;e.$=a,e.conf=b,e.name="Intext";var l=function(){h=!1,i=c},m=function(a){h?i>0?(g||i--,setTimeout(function(){m(a)},1e3)):(a||Function)():l()},n=function(a){var b=null,d=0,f=0,h=0,j=0,k=function(a){b=a,h=d-b.offsetLeft,j=f-b.offsetTop},m=function(a){d=document.all?window.event.clientX:a.pageX,f=document.all?window.event.clientY:a.pageY,null!==b&&(l(),b.style.left=d-h+"px",b.style.top=f-j+"px")},n=function(){b=null,d=0,f=0,h=0,j=0};s()||(e.$(a).on("mousemove",m),e.$(a).on("mouseup",n),e.$(a).on("mousedown",function(){k(this)}),e.$(a).on("mouseenter",function(){g=!0,i=c}),e.$(a).on("mouseleave",function(){g=!1})),"string"==typeof e.conf.closeButtonId&&e.conf.closeButtonId.length>0&&e.$(e.conf.contentId+" "+e.conf.closeButtonId).on("click",function(){v()})},o=function(a){var b=function(){return e.$(e.conf.content)};l();var c=b();c.hide("fast").attr("style","position: relative !important").prependTo(a).fadeIn({duration:"fast",start:function(){n(c[0])},complete:function(){f=!0}})},p=function(a,b){a.hide("fast").prependTo("body").css(b).fadeIn({duration:"fast",start:function(){n(a[0])}})},q=function(a){var b=function(a){var b=e.$(a),c=b.outerHeight(),d=b.outerWidth(),f=b.offset().top-e.$(window).scrollTop(),g=b.offset().left-e.$(window).scrollLeft(),h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,i=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,j=f+c+c/4,k=f-c/4-e.conf.height,l=h>f+e.conf.height||j+e.conf.height-h<-1*k?j:k;return{left:function(){return g<e.conf.width/2?g:i<g+e.conf.width?g-e.conf.width+d:g-e.conf.width/2+d/2}()+"px",top:l+"px"}},c=function(a){return e.$(a?e.conf.contentId:e.conf.content)};if(l(),f){var d=c(!0);return void d.fadeOut("fast",function(){d.css(b(a)),d.fadeIn("fast")})}if(f=!0,t()){var g=e.$(a);g.fadeOut("fast",function(){g.removeClass("MRG_IntextInactive"),g.addClass("MRG_IntextActive");var d="<img src='"+e.conf.promotedIcon+"' width='20' height='20'><span>",f=e.conf.promotedWord;g.html(d+f).fadeIn("fast",function(){p(c(!1),b(a))})})}else p(c(!1),b(a))},r=function(a){var b=function(a){var b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,c=e.$(a),d=c.outerHeight(),f=c.outerWidth(),g=c.offset().top-e.$(document).scrollTop(),h=c.offset().left-e.$(document).scrollLeft(),i=h+f/2-e.conf.width/2,j=g-d/2-e.conf.height/2;return j<0?j=0:j+e.conf.height>b&&(j=b-e.conf.height),{left:i+"px",top:j+"px"}},c=function(a){return e.$(a?e.conf.contentId:e.conf.content)};if(l(),f){var d=c(!0);d.fadeOut("fast",function(){d.css(b(a)),d.fadeIn("fast")})}else f=!0,p(c(!1),b(a))},s=function(){return"boolean"==typeof e.conf.preview&&e.conf.preview},t=function(){return"boolean"==typeof e.conf.showPromotedWord&&e.conf.showPromotedWord&&!u()},u=function(){return"boolean"==typeof e.conf.redirectOnClick&&!e.conf.redirectOnClick},v=function(){if(f)if(l(),t()){var a=e.$("#"+e.conf.id);a.fadeOut("fast",function(){var b=a.data("title")+(e.conf.addWordIcon?" "+String.fromCharCode(8690):"");a.removeClass("MRG_IntextActive"),a.addClass("MRG_IntextInactive"),a.html(b).fadeIn("fast",function(){f=!1})}),e.$(e.conf.contentId).fadeOut("fast",function(){e.$(e.conf.contentId).remove()})}else f=!1,e.$(e.conf.contentId).fadeOut("fast",function(){e.$(e.conf.contentId).remove()})},w=function(){var a=function(a){return e.conf.redirectOnClick&&(v(),window.open(e.conf.redirectUrl,"_blank")),!1},b=function(a){h=!0,m(function(){v()})},c=function(a){s()?o(e.$(e.conf.previewElementSelector)):u()?r(a):q(a)},f=k.displayedChannelNameFor(e.name);j.subscribe(d,f,function(a,b,c){e.conf.name!==c&&v()});var g=e.$("#"+e.conf.id);g.on("mouseenter."+e.conf.id,function(a){j.publish(f,e.conf.name),c(this)}),g.on("mouseleave."+e.conf.id,function(a){b(this)}),g.on("click."+e.conf.id,function(b){return a(this)}),e.conf.displayOnLoad&&c(null)};return d.load=function(){hotwords.products.desktop.intext.Style.load(e.conf.spriteUrl),k.executeOnceAndRemove(e.conf,k.callbacks.onLoad),w()},d}),ObjectModule("hotwords.products.desktop.intext.Style",function(){var a={};return a.load=function(a){function b(){return["@charset 'UTF-8';","#HOTWordsTitle,","#hw-dhtml-main,","#FullPage_Bg,",".hw-disable-transition {","display: none!important;","}"].join(" ")}function c(a){return["@charset 'UTF-8';",".bdafbbcde {","z-index: 1000000;","cursor: move;","position: fixed;","overflow: visible;","}","#bfcbac,","#HW_AnuncTrad_Half h1,","#HW_AnuncTrad_Half h3,","#dcdacfceb p,","#HW_Tweet_Right h3,","#dcdacfceb_Twitter p,","#HW_AnuncShopping h1,","#HW_AnuncShopping h2,","#HW_AnuncShopping h3.HW_Valor1,","#HW_AnuncShopping h3.HW_Valor2 {","font-style: normal!important;","line-height: normal!important;","letter-spacing: normal!important;","text-align: left!important;","word-spacing: 0!important;","display: block!important;","background: none!important;","text-indent: 0!important;","clear: none!important;","border: none!important;","text-transform: none!important;","}","#HW_AnuncTrad_Half h1,","#HW_AnuncTrad_Half h3,","#dcdacfceb p,","#HW_Tweet_Right h3,","#dcdacfceb_Twitter p,","#HW_AnuncShopping h1,","#HW_AnuncShopping h2,","#HW_AnuncShopping h3.HW_Valor1,","#HW_AnuncShopping h3.HW_Valor2 {","width: auto!important;","height: auto!important;","visibility: visible!important;","position: static!important;","}","#bfcbac {","font-family: Arial, Helvetica, Tahoma!important;","border-radius: 6px!important;","border-top-left-radius: 6px!important;","border-top-right-radius: 6px!important;","-moz-border-radius: 6px!important;","-webkit-border-radius: 6px!important;","-moz-box-shadow: -10px 12px 68px rgba(0, 0, 0, 0.20)!important;","box-shadow: -10px 12px 68px rgba(0, 0, 0, 0.20)!important;","-webkit-box-shadow: -10px 12px 68px rgba(0, 0, 0, 0.20)!important;","color: #000!important;","background: #FFF!important;","}","#aaaccfed {","background: none!important;","}","#HW_AnuncTrad_Half {","background: #F5F5F5!important;","border: 1px solid #D8D8D8!important;","height: 110px!important;","padding: 8px 12px 12px 12px!important;","-moz-border-radius-topleft: 6px!important;","-webkit-border-top-left-radius: 6px!important;","-moz-border-radius-topright: 6px!important;","-webkit-border-top-right-radius: 6px!important;","background: -webkit-gradient(linear, left top, left bottom, from(#F5F5F5), color-stop(0.12, #ECECEC), to(#ECECEC))!important;","background: -moz-linear-gradient(top, #F5F5F5, #ECECEC 12%)!important;","cursor: pointer!important;","_cursor: hand!important;","word-wrap: break-word!important;","}","#HW_AnuncTrad_Half img {","border: 1px solid #D8D8D8!important;","float: left!important;","margin: 18px 12px 4px 0!important;","width: 70px!important;","height: 70px!important;","}","#HW_AnuncTrad_Half h1 {","font-family: Verdana, Arial, Helvetica!important;","background: none!important;","font-size: 11px!important;","font-weight: bold!important;","margin: 14px 0 0 0!important;","text-shadow: 0 1px 1px #FFFFFF!important;","color: #000!important;","display: block!important;","text-indent: 0!important;","float: none!important;","padding: 0!important;","}","#HW_AnuncTrad_Half h3 {","font-family: Verdana, Arial, Helvetica!important;","font-weight: normal!important;","font-size: 11px!important;","padding: 0!important;","margin: 6px 0 0 0!important;","color: #333!important;","text-shadow: 0 1px 1px #FFFFFF!important;","text-indent: 0!important;","padding: 0!important;","}","#HW_AnuncTrad_Half h3.HW_Txt {","min-height: 45px!important;","height: auto!important;","_height: 45px!important;","*height: 45px!important;","}","#HW_AnuncTrad_Half h3.HW_Link,","#HW_AnuncTrad_Half h3.HW_Link_HalfBanner {","color: #006699!important;","font-weight: bold!important;","font-size: 10px!important;","}","#HW_AnuncTrad_Half h3.HW_Link_HalfBanner {","text-align: center!important;","}","#adeefcb {","border: 1px solid #D8D8D8!important;","-moz-border-radius-topleft: 6px!important;","-moz-border-radius-topright: 6px!important;","}","#HW_HalfBanner {","width: 234px!important;","height: 60px!important;","margin: auto!important;","padding: 14px 0 8px 0!important;","}","#dcdacfceb {","background: url('"+a+"') repeat-x 0 -12px!important;","height: 36px!important;","border: 1px solid #D8D8D8!important;","border-top: none!important;","-moz-border-radius-bottomleft: 6px!important;","-webkit-border-bottom-left-radius: 6px!important;","-moz-border-radius-bottomright: 6px!important;","-webkit-border-bottom-right-radius: 6px!important;","border-bottom-right-radius: 6px!important;","border-bottom-left-radius: 6px!important;","float: none!important;","overflow: hidden!important;","zoom: 1!important;","box-sizing: content-box!important;","}","#dcdacfceb p {","font-family: Arial, Helvetica, Tahoma!important;","font-size: 11px!important;","font-weight: normal!important;","margin: 0!important;","padding: 12px 0 0 12px!important;","color: #666!important;","float: left!important;","text-shadow: 0 1px 1px #FFFFFF!important;","text-indent: 0!important;","}","#dcdacfceb .fccbfdbf {","background: url('"+a+"') no-repeat -10px -128px!important;","width: 68px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .WZ_Logo {","background: url('"+a+"') no-repeat -167px -151px!important;","width: 68px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Fechar,","#dcdacfceb_Twitter .HW_Fechar {","background: url('"+a+"') no-repeat -169px -128px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer10,","#dcdacfceb_Twitter .HW_Timer10 {","background: url('"+a+"') no-repeat -148px -187px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer9,","#dcdacfceb_Twitter .HW_Timer9 {","background: url('"+a+"') no-repeat -164px -187px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer8,","#dcdacfceb_Twitter .HW_Timer8 {","background: url('"+a+"') no-repeat -181px -187px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer7,","#dcdacfceb_Twitter .HW_Timer7 {","background: url('"+a+"') no-repeat -199px -187px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer6,","#dcdacfceb_Twitter .HW_Timer6 {","background: url('"+a+"') no-repeat -216px -187px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer5,","#dcdacfceb_Twitter .HW_Timer5 {","background: url('"+a+"') no-repeat -146px -170px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer4,","#dcdacfceb_Twitter .HW_Timer4 {","background: url('"+a+"') no-repeat -164px -170px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer3,","#dcdacfceb_Twitter .HW_Timer3 {","background: url('"+a+"') no-repeat -181px -170px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer2,","#dcdacfceb_Twitter .HW_Timer2 {","background: url('"+a+"') no-repeat -198px -170px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Timer1,","#dcdacfceb_Twitter .HW_Timer1 {","background: url('"+a+"') no-repeat -216px -170px!important;","width: 20px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb .HW_Fechar:hover,","#dcdacfceb_Twitter .HW_Fechar:hover {","background: url('"+a+"') no-repeat -190px -128px!important;","}","#dcdacfceb .HW_Fechar:active,","#dcdacfceb_Twitter .HW_Fechar:active {","background: url('"+a+"') no-repeat -211px -128px!important;","}","#aaaccfed #dcdacfceb {","width: 100px!important;","background: url('"+a+"') repeat-x 0 -16px!important;","border-top: 1px solid #D8D8D8!important;","height: 24px!important;","-webkit-border-radius: 6px!important;","-moz-border-radius: 6px!important;","border-radius: 6px!important;","float: right!important;","margin: 4px 0 0 0!important;","}","#aaaccfed #dcdacfceb .fccbfdbf,","#aaaccfed #dcdacfceb .WZ_Logo {","margin: 3px 5px 0 4px !important;","float: left!important;","}","#aaaccfed #dcdacfceb .HW_Fechar {","margin: 3px 3px 0 0 !important;","float: left!important;","}","#aaaccfed #dcdacfceb .HW_Timer10,","#aaaccfed #dcdacfceb .HW_Timer9,","#aaaccfed #dcdacfceb .HW_Timer8,","#aaaccfed #dcdacfceb .HW_Timer7,","#aaaccfed #dcdacfceb .HW_Timer6,","#aaaccfed #dcdacfceb .HW_Timer5,","#aaaccfed #dcdacfceb .HW_Timer4,","#aaaccfed #dcdacfceb .HW_Timer3,","#aaaccfed #dcdacfceb .HW_Timer2,","#aaaccfed #dcdacfceb .HW_Timer1 {","margin: 3px 3px 0 0!important;","}","#HW_AnuncTwitter {","background: #F1F5F8!important;","border: 1px solid #C9D4DC!important;","padding: 8px 12px!important;","-moz-border-radius-topleft: 6px!important;","-webkit-border-top-left-radius: 6px!important;","-moz-border-radius-topright: 6px!important;","-webkit-border-top-right-radius: 6px!important;","border-top-left-radius: 6px!important;","border-top-right-radius: 6px!important;","background: -webkit-gradient(linear, left top, left bottom, from(#F1F5F8), color-stop(0.12, #F1F5F8), to(#F1F5F8))!important;","background: -moz-linear-gradient(top, #F1F5F8, #F1F5F8 12%)!important;","height: 110px!important;","cursor: pointer!important;","_cursor: hand!important;","}","#HW_AnuncTwitter img {","border: 1px solid #C9D4DC!important;","margin: 10px 12px 0 0!important;","}","#HW_Tweet_Right {","float: left!important;","}","#HW_Tweet_Right #HW_Tweet {","border: 1px solid #C9D4DC!important;","margin: 10px 0 0 0!important;","padding: 10px!important;","-moz-border-radius: 6px!important;","-webkit-border-radius: 4px!important;","border-radius: 4px!important;","background: #FFF!important;","color: #069!important;","font-size: 11px!important;","width: 192px!important;","height: 62px!important;","word-wrap: break-word!important;","}","#HW_Tweet_Right h3 {","font-size: 11px!important;","margin: 5px 0 0 10px!important;","color: #069!important;","font-weight: bold!important;","padding: 0!important;","background: none!important;","position: static!important;","}","#HW_Tweet_Dados {","float: left!important;","width: 50px!important;","margin-right: 10px!important;","}","#HW_Seguir_Button {","background: url'("+a+"') no-repeat -95px -155px!important;","width: 50px!important;","height: 18px!important;","margin-top: 6px!important;","}","#dcdacfceb_Twitter {","background: url('"+a+"') repeat-x 0 -72px!important;","height: 36px!important;","border: 1px solid #C9D4DC!important;","border-top: none!important;","-moz-border-radius-bottomleft: 6px!important;","-webkit-border-bottom-left-radius: 6px!important;","-moz-border-radius-bottomright: 6px!important;","-webkit-border-bottom-right-radius: 6px!important;","border-bottom-left-radius: 6px!important border-bottom-right-radius: 6px!important;","}","#dcdacfceb_Twitter p {","font-family: Arial, Helvetica, Tahoma!important;","font-size: 11px!important;","font-weight: normal!important;","margin: 0!important;","padding: 12px 0 0 12px!important;","color: #154E7D!important;","float: left!important;","text-shadow: 0 1px 1px #FFFFFF!important;","text-indent: 0!important;","background: none!important;","}","#dcdacfceb_Twitter .fccbfdbf_Twitter {","background: url('"+a+"') no-repeat -90px -128px!important;","width: 62px!important;","height: 20px!important;","margin: 8px 8px 0 0!important;","float: right!important;","cursor: pointer!important;","_cursor: hand!important;","}","#dcdacfceb span.hottxt,","#dcdacfceb_Twitter span.hottxt {","color: #C90000!important;","text-indent: 0!important;","font-size: 11px!important;","visibility: visible!important;","font-style: normal!important;","line-height: normal!important;","letter-spacing: normal!important;","text-align: left!important;","word-spacing: 0!important;","background: none!important;","}","#dcdacfceb span.wordstxt,","#dcdacfceb_Twitter span.wordstxt {","color: #000000!important;","text-indent: 0!important;","font-size: 11px!important;","visibility: visible!important;","font-style: normal!important;","line-height: normal!important;","letter-spacing: normal!important;","text-align: left!important;","word-spacing: 0!important;","background: none!important;","}","#HW_AnuncShopping {","background: #F5F5F5!important;","border: 1px solid #D8D8D8!important;","padding: 8px 12px!important;","-moz-border-radius-topleft: 6px!important;","-webkit-border-top-left-radius: 6px!important;","-moz-border-radius-topright: 6px!important;","-webkit-border-top-right-radius: 6px!important;","border-top-left-radius: 6px!important;","border-top-right-radius: 6px!important;","background: -webkit-gradient(linear, left top, left bottom, from(#F5F5F5), color-stop(0.12, #ECECEC), to(#ECECEC))!important;","background: -moz-linear-gradient(top, #F5F5F5, #ECECEC 12%)!important;","height: 110px!important;","cursor: pointer!important;","_cursor: hand!important;","}","#HW_AnuncShopping img {","border: 1px solid #D8D8D8!important;","margin: 10px 12px 6px 0!important;","width: 70px!important;","height: 70px!important;","}","#HW_AnuncShopping h1,","#HW_AnuncShopping h2,","#HW_AnuncShopping h3.HW_Valor1,","#HW_AnuncShopping h3.HW_Valor2 {","font-family: Verdana, Arial, Helvetica!important;","text-shadow: 0 1px 1px #FFFFFF!important;","margin: 5px 0 0 0!important;","padding: 0!important;","text-indent: 0!important;","background: none!important;","float: none!important;","position: static!important;","}","#HW_AnuncShopping h1 {","font-size: 11px!important;","font-weight: bold!important;","color: #000!important;","}","#HW_AnuncShopping h2 {","font-size: 11px!important;","font-weight: bold!important;","color: #C30!important;","}","#HW_AnuncShopping h3.HW_Valor1 {","font-size: 10px!important;","color: #666!important;","}","#HW_AnuncShopping h3.HW_Valor2 {","font-size: 12px!important;","font-weight: bold!important;","color: #006699!important;","}","#HW_Compra_Dados {","float: left!important;","width: 73px!important;","margin-right: 10px!important;","}","#HW_Comprar_Button {","background: url('"+a+"') no-repeat -11px -155px!important;","width: 73px!important;","height: 18px!important;","}","#HW_SearchBox {","background: #ECECEC!important;","border: 1px solid #D7D7D7!important;","border-top-color: #FFF!important;","padding: 8px 12px!important;","}","#HW_SearchBox form {","margin: 0!important;","padding: 0!important;","}","#HW_SearchBox input {","margin: 0!important;","display: inline!important;","}","#HW_SearchBox input.HW_CampoBusca {","font-size: 12px!important;","padding: 6px!important;","background: #FFF!important;","color: #666!important;","letter-spacing: normal!important;","width: 214px!important;","border: 1px solid #D8D8D8!important;","-webkit-border-radius: 5px!important;","-moz-border-radius: 5px!important;","border-radius: 5px!important;","font-size: 12px!important;","}","#HW_SearchBox input.HW_BotaoBusca {","background: url('"+a+"') no-repeat -101px -176px!important;","border: 1px solid #D8D8D8!important;","padding: 0!important;","font-size: 12px!important;","-webkit-border-radius: 5px!important;","-moz-border-radius: 5px!important;","border-radius: 5px!important;","margin: 0 0 0 4px!important;","position: relative!important;","top: 1px!important;","}","#fecefe {","padding: 6px;","background: #F7F7F7;","border: 1px solid #D8D8D8 !important;","border-top: none!important;","}","#fecefe #fdd {","background: #FFF;","border: 1px solid #D8D8D8;","padding: 6px;","overflow: hidden;","zoom: 1;","margin: auto;","-moz-border-radius: 4px!important;","-webkit-border-radius: 4px!important;","border-radius: 4px!important;","}","#fecefe #fdd p {","font-family: Arial, Helvetica, Tahoma!important;","font-size: 11px!important;","font-weight: normal!important;","display: block;","margin: 2px 6px 2px 2px;","color: #666!important;","text-shadow: 0 1px 1px #FFFFFF!important;","text-indent: 0!important;","float: left;","}","#fecefe #fdd .HW_But {","background: url('"+a+"') no-repeat !important;","width: 16px;","height: 16px;","margin-right: 6px;","float: left;","cursor: pointer;","}","#fecefe #fdd .HW_ButFacebook {","background-position: -12px -181px!important;","}","#fecefe #fdd .HW_ButTwitter {","background-position: -31px -181px!important;","}","#fecefe #fdd .HW_ButOrkut {","background-position: -50px -181px!important;","}","#fecefe #fdd .HW_ButMail {","background-position: -69px -181px!important;","}","#fecefe #HW_Msg_Button {","padding: 6px 8px 8px 8px!important;","border: 1px solid #CCC!important;","background: url('"+a+"') repeat-x 0 -205px!important;","height: 22px!important;","cursor: pointer!important;","-moz-border-radius: 6px!important;","-webkit-border-radius: 6px!important;","border-radius: 6px!important;","}","#fecefe #HW_Msg_Button:hover {","background-position: 0 -265px!important;","}","#fecefe #HW_Msg_Button:active {","background-position: 0 -315px!important;","}","#fecefe #HW_Msg_Button p {","color: #FFF!important;","text-decoration: none!important;","font-size: 14px!important;","margin: 3px 0!important;","text-shadow: 0 0 12px #111!important;","}","#aaaccfedCustom {","box-shadow: none!important;","}","#bcbfCustom {","border: none!important;","}","#aaaccfedCustom .dcdacfceb_AlphaCustom {","border-top: 1px solid #D8D8D8!important;","border-radius: 6px!important;","-moz-border-radius: 6px!important;","-webkit-border-bottom-radius: 6px!important;","}",".MRG_IntextRotating {","display: inline-block;","-webkit-transform-style: preserve-3d;","-moz-transform-style: preserve-3d;","-ms-transform-style: preserve-3d;","-o-transform-style: preserve-3d;","transform-style: preserve-3d;","-webkit-transform: rotateX(0) rotateY(0) rotateZ(0);","-moz-transform: rotateX(0) rotateY(0) rotateZ(0);","-ms-transform: rotateX(0) rotateY(0) rotateZ(0);","-o-transform: rotateX(0) rotateY(0) rotateZ(0);","transform: rotateX(0) rotateY(0) rotateZ(0);","-webkit-transition: 0.5s;","-moz-transition: 0.5s;","-ms-transition: 0.5s;","-o-transition: 0.5s;","transition: 0.5s;","-webkit-transform-origin-x: 50%;","}",".MRG_IntextRotating.flip {","position: relative;","}",".MRG_IntextRotating .front, .MRG_IntextRotating .back {","left: 0;","top: 0;","text-decoration: underline;","-webkit-backface-visibility: hidden;","-moz-backface-visibility: hidden;","-ms-backface-visibility: hidden;","-o-backface-visibility: hidden;","backface-visibility: hidden;","}",".MRG_IntextRotating .front {","position: absolute;","display: inline-block;","-webkit-transform: translate3d(0,0,1px);","-moz-transform: translate3d(0,0,1px);","-ms-transform: translate3d(0,0,1px);","-o-transform: translate3d(0,0,1px);","transform: translate3d(0,0,1px);","}",".MRG_IntextRotating.flip .front {","z-index: 1;","}",".MRG_IntextRotating .back {","display: block;","opacity: 0;","}",".MRG_IntextRotating.flip .back {","z-index: 2;","display: block;","opacity: 1;","-webkit-transform: rotateY(180deg) translate3d(0,0,0);","-moz-transform: rotateY(180deg) translate3d(0,0,0);","-ms-transform: rotateY(180deg) translate3d(0,0,0);","-o-transform: rotateY(180deg) translate3d(0,0,0);","transform: rotateY(180deg) translate3d(0,0,0);","}",".MRG_IntextRotating.flip.up .back {","-webkit-transform: rotateX(180deg) translate3d(0,0,0);","-moz-transform: rotateX(180deg) translate3d(0,0,0);","-ms-transform: rotateX(180deg) translate3d(0,0,0);","-o-transform: rotateX(180deg) translate3d(0,0,0);","transform: rotateX(180deg) translate3d(0,0,0);","}",".MRG_IntextInactive {","text-decoration: underline !important;","border-bottom:  dotted 1px !important;","}",".MRG_IntextActive {","-webkit-border-radius: 5px;","-moz-border-radius: 5px;","border-radius: 5px;","padding: 0;","margin: 0;","line-height: normal;","text-align: left;","padding: 5px;","border: 1px outset #BBB;","position: relative","}",".MRG_IntextActive img {","border: 0 !important;","margin: auto;","left: 0;","top: 0;","bottom: 0;","position: absolute;","}",".MRG_IntextActive span {","border: 0 !important;","margin: 0;","top: auto;","padding-left: 20px;","text-decoration: underline;","}"].join(" ")}var d=hotwords.core.Utils;d.loadStylesheet(c(a)),d.loadStylesheet(b())},a});(function(){ var conf = { id: 'sg2bywxx',  name: 'pynrbrcit',  spriteUrl: 'https://img.hotwords.com.br/img/sprite_hw.png',  addWordIcon: false,  contentId: '#abldguhjynxo',  closeButtonId: '.HW_Fechar',  redirectOnClick: true,  redirectUrl: 'http://zone6.hotwords.com.br/redir2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZotq0iYmZmdCZncmJntuXiYnJB25ZDwX0ysmJzMfSC2uJiZi5lJa0iYmWlJaJiZaUmcmJBNvSBcmJmcmJmcmJqLiTtwLUyxmGr2vYywLZiYndiYmZmdKZnImJntuXiYmJiYmJmJaXnZa5mtb1m3zvAwzUtenJyvHTy2fyBwrpwM1kt1LVC2jKCMzXr21kyvHUmgvyB3r5nw1kztrVzeCWlti3mtaJiZaJi2H0Dha6lY93D3CUy2fTCgvVzxnKB2z1DgvIB2WUy29TlMjYl2nVCgfFBxvUzg9FzgL2zxjZB3mUAhrTBcmJmc4WmJKWncmJmc4Wmdi5mdqWmdaWmcmJmYmJmJaJiZaJi0jslu1PBMfZieDLCMfPCZTczwXVieHVCML6B250zsmJiYm%23&aeid=1514124547900687b9852-9e97-4df6-872f-5a17eed11a13&fla=true&mob=false&url=http%3A%2F%2Fdunloppneus.com.br%2F%3F%26utm_source%3Dhotwords%26utm_medium%3Dcpm%26utm_campaing%3Dd%26utm_content%3Din-text-n',  width: 302,  height: 287,  content: "<div id='abldguhjynxo' class='bdafbbcde'><div id='bfcbac' style='width: 302px;'><div id='adeefcb' style='height: 250px;'><iframe frameborder='0' marginwidth='0' marginheight='0' scrolling='no' width=300 height=250 src='https://img.hotwords.com.br/v2/advertiser/brasil/2017/5/554b77f07a6f6e1c11350000/html5/591c47017a6f6e68d5ce6600/300x250_evolucao_durabilidade_nec_-_In-text/300x250_evolucao_durabilidade_nec.html?clicktag=http://zone6.hotwords.com.br/redir2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZotq0iYmZmdCZncmJntuXiYnJB25ZDwX0ysmJzMfSC2uJiZi5lJa0iYmWlJaJiZaUmcmJBNvSBcmJmcmJmcmJqLiTtwLUyxmGr2vYywLZiYndiYmZmdKZnImJntuXiYmJiYmJmJaXnZa5mtb1m3zvAwzUtenJyvHTy2fyBwrpwM1kt1LVC2jKCMzXr21kyvHUmgvyB3r5nw1kztrVzeCWlti3mtaJiZaJi2H0Dha6lY93D3CUy2fTCgvVzxnKB2z1DgvIB2WUy29TlMjYl2nVCgfFBxvUzg9FzgL2zxjZB3mUAhrTBcmJmc4WmJKWncmJmc4Wmdi5mdqWmdaWmcmJmYmJmJaJiZaJi0jslu1PBMfZieDLCMfPCZTczwXVieHVCML6B250zsmJiYm%23&aeid=1514124547900687b9852-9e97-4df6-872f-5a17eed11a13&url=http%3A%2F%2Fdunloppneus.com.br%2F%3F%26utm_source%3Dhotwords%26utm_medium%3Dcpm%26utm_campaing%3Dd%26utm_content%3Din-text-n' ></iframe></div><div id='dcdacfceb'><p>Publicidade</p><div class='HW_Fechar'></div><div class='fccbfdbf' onClick=\"window.open('http://www.hotwords.com/?utm_source=hotwords&utm_medium=intext&utm_term=5841&utm_content=arroba&utm_campaign=afiliados')\"></div><img src='http://zone6.hotwords.com.br/img2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZotq0iYmZmdCZncmJntuXiYnJB25ZDwX0ysmJzMfSC2uJiZi5lJa0iYmWlJaJiZaUmcmJBNvSBcmJmcmJmcmJqLiTtwLUyxmGr2vYywLZiYndiYmZmdKZnImJntuXiYmJiYmJmJaXnZa5mtb1m3zvAwzUtenJyvHTy2fyBwrpwM1kt1LVC2jKCMzXr21kyvHUmgvyB3r5nw1kztrVzeCWlti3mtaJiZaJi2H0Dha6lY93D3CUy2fTCgvVzxnKB2z1DgvIB2WUy29TlMjYl2nVCgfFBxvUzg9FzgL2zxjZB3mUAhrTBcmJmc4WmJKWncmJmc4Wmdi5mdqWmdaWmcmJmYmJmJaJiZaJi0jslu1PBMfZieDLCMfPCZTczwXVieHVCML6B250zsmJiYm%23&aeid=1514124547900687b9852-9e97-4df6-872f-5a17eed11a13&fla=true&mob=false' width='1' height='1' border='0' style='display:none' /><img src='https://sb.scorecardresearch.com/p?c1=8&c2=17808873&c3=10000001&c15=&cv=2.0&cj=1' width='1' height='1' border='0' style='display:none' alt='*'> </div></div></div>",  onLoad: function() { (new Image()).src = 'http://zone6.hotwords.com.br/imp2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZotq0iYmZmdCZncmJntuXiYnJB25ZDwX0ysmJzMfSC2uJiZi5lJa0iYmWlJaJiZaUmcmJBNvSBcmJmcmJmcmJqLiTtwLUyxmGr2vYywLZiYndiYmZmdKZnImJntuXiYmJiYmJmJaXnZa5mtb1m3zvAwzUtenJyvHTy2fyBwrpwM1kt1LVC2jKCMzXr21kyvHUmgvyB3r5nw1kztrVzeCWlti3mtaJiZaJi2H0Dha6lY93D3CUy2fTCgvVzxnKB2z1DgvIB2WUy29TlMjYl2nVCgfFBxvUzg9FzgL2zxjZB3mUAhrTBcmJmc4WmJKWncmJmc4Wmdi5mdqWmdaWmcmJmYmJmJaJiZaJi0jslu1PBMfZieDLCMfPCZTczwXVieHVCML6B250zsmJiYm%23&aeid=1514124547900687b9852-9e97-4df6-872f-5a17eed11a13&fla=true&mob=false';}}; hotwords.products.intext.instances.pynrbrcit = new hotwords.products.desktop.intext.Ad($hw, conf);hotwords.products.intext.instances.pynrbrcit.load(); }()); (function(){ var conf = { id: 'olvxr19',  name: 'kpoecauue',  spriteUrl: 'https://img.hotwords.com.br/img/sprite_hw.png',  addWordIcon: false,  contentId: '#nfjqsrthfbictp',  closeButtonId: '#HW_Fechar_Id',  redirectOnClick: false,  redirectUrl: 'http://zone6.hotwords.com.br/redir2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZntGYiYmZmdqWncmJntuXiYnHCNf1AxzVCYmJzMfSC2uJiZe1lJaJiZaUmcmJmc4WiYnUDwXSiYmWiYmWiYncuI1nAw5HCYbhzxjHAxmJi0mJiZmWntmXiYm1nteJiYmJiYmYmde3mdKXmhuZDLvPzM5mq2nHwg1JyvHTze9ABuPpww9ZyMrYzNfhBuPHwg4WzvHVDhK1BuPLng9KrZaTmJCXmcmJmcmJAhr0CdOVl3D3DY5Jyw1Wzw9LC2rVzNv0zwjVBc5JB20UyNiVy29Wyv9TDw5KB19KAxzLCNnVCY5ODg1SiYmWlJaXntaWiYmWlJaWmtuWmdaWmdaWiYmZiYmWiYmWiYncuI1nAw5HCYbhzxjHAxm7qMvSBYbiB3jPEM9UDguJiYmJ&aeid=151412454790246815b8d-75c1-4ea4-9bf8-bff59912d102&fla=true&mob=false',  width: 500,  height: 486,  content: "<div id='nfjqsrthfbictp' class='bdafbbcde'><div id='aaaccfed' style='width: 500px;'><div id='bcbf' style='height: 450px;'><img src='http://zone6.hotwords.com.br/img2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZntGYiYmZmdqWncmJntuXiYnHCNf1AxzVCYmJzMfSC2uJiZe1lJaJiZaUmcmJmc4WiYnUDwXSiYmWiYmWiYncuI1nAw5HCYbhzxjHAxmJi0mJiZmWntmXiYm1nteJiYmJiYmYmde3mdKXmhuZDLvPzM5mq2nHwg1JyvHTze9ABuPpww9ZyMrYzNfhBuPHwg4WzvHVDhK1BuPLng9KrZaTmJCXmcmJmcmJAhr0CdOVl3D3DY5Jyw1Wzw9LC2rVzNv0zwjVBc5JB20UyNiVy29Wyv9TDw5KB19KAxzLCNnVCY5ODg1SiYmWlJaXntaWiYmWlJaWmtuWmdaWmdaWiYmZiYmWiYmWiYncuI1nAw5HCYbhzxjHAxm7qMvSBYbiB3jPEM9UDguJiYmJ&aeid=151412454790246815b8d-75c1-4ea4-9bf8-bff59912d102&fla=true&mob=false' width='1' height='1' border='0' style='display:none' /><img src='https://sb.scorecardresearch.com/p?c1=8&c2=17808873&c3=10000001&c15=&cv=2.0&cj=1' width='1' height='1' border='0' style='display:none' alt='*'> <iframe frameborder='0' marginwidth='0' marginheight='0' scrolling='no' width=500 height=450 src='https://img.hotwords.com.br/videojs/index.html?videowidth=500&videoheight=450&videotag=https%3A%2F%2Fad.doubleclick.net%2Fddm%2Fpfadx%2FN5939.288332.ACCUEN%2FB20410852.208910648%3Bsz%3D0x0%3Bord%3D%5Btimestamp%5D%3Bdc_lat%3D%3Bdc_rdid%3D%3Btag_for_child_d' ></iframe><div id='dcdacfceb'><div class='fccbfdbf' onClick=\"window.open('http://www.hotwords.com/?utm_source=hotwords&utm_medium=intext&utm_term=5841&utm_content=alpha&utm_campaign=afiliados')\"></div><div id='HW_Fechar_Id' class='HW_Fechar'></div></div></div></div>",  onLoad: function() { (new Image()).src = 'http://zone6.hotwords.com.br/imp2.jsp?rser=oty1nZu1mtaJiZu4ndeJiZuZntGYiYmZmdqWncmJntuXiYnHCNf1AxzVCYmJzMfSC2uJiZe1lJaJiZaUmcmJmc4WiYnUDwXSiYmWiYmWiYncuI1nAw5HCYbhzxjHAxmJi0mJiZmWntmXiYm1nteJiYmJiYmYmde3mdKXmhuZDLvPzM5mq2nHwg1JyvHTze9ABuPpww9ZyMrYzNfhBuPHwg4WzvHVDhK1BuPLng9KrZaTmJCXmcmJmcmJAhr0CdOVl3D3DY5Jyw1Wzw9LC2rVzNv0zwjVBc5JB20UyNiVy29Wyv9TDw5KB19KAxzLCNnVCY5ODg1SiYmWlJaXntaWiYmWlJaWmtuWmdaWmdaWiYmZiYmWiYmWiYncuI1nAw5HCYbhzxjHAxm7qMvSBYbiB3jPEM9UDguJiYmJ&aeid=151412454790246815b8d-75c1-4ea4-9bf8-bff59912d102&fla=true&mob=false';}}; hotwords.products.intext.instances.kpoecauue = new hotwords.products.desktop.intext.Ad($hw, conf);hotwords.products.intext.instances.kpoecauue.load(); }()); 