var initEnlarger,autoHideEnlarger,showTimeout,offerComplete,autoHide,autoClose,autoShowNext,priceAutoAnim,persp,enlarger={allOffersAnim:{},checkNumber:0,flags:{enlargerShown:!1,vertical:[],ok:!1,stars:!1,region:!1,classesAdded:!1},options:{infobarAnim:!1,showSpeed:640,hideSpeed:640,enlargerWidth:'100%',enlargerHeight:'100%',isAutoStopped:!1,rollText:!1},elements:{},initEnlarger:function(options){if(!enlarger.enabled){o=enlarger.options;o=$.extend(o,options);e=enlarger.elements;enlarger.enabled=!0;enlarger.cacheEnlargerElem();e.enlargerButtonTxt.css('opacity',0);if(isIE&&o.animType==='2')o.animType='4'}
e.enlarger.css('display','block');e.enlarger.css('visibility','hidden');e.enlargerButtonTxt.css('display','block');enlarger.placeButtonText();function startAnim(){setTimeout(function(){if(!tools.working()){if(e.enlarger.width()<9||e.enlarger.height()<9){e.loader.css('display','none');if(enlarger.checkNumber<5){setTimeout(enlarger.initEnlarger,500)}
enlarger.checkNumber++;return}
e.loader.css('display','block');enlarger.bindEnlargerUIAction();enlarger.initEnlargerOpt();e.enlargerButtonTxt.css('display','table-cell');enlarger.startShow()}else{startAnim()}},10)}
startAnim()},startShow:function(){enlarger.flags.ok=!0;if(o.enlargeHover)return;initEnlarger=setTimeout(function(){if(planche.enabled){planche.makeShow(function(){enlarger.offerAnim.start(nextOffer,function(){enlarger.enlargerAnim.show(nextOffer)})})}else{enlarger.offerAnim.start(nextOffer,function(){enlarger.enlargerAnim.show(nextOffer)})}},500)},initEnlargerOpt:function(){var imageWidth;var imageHeight;enlarger.flags.detectratio=o.enlargerType.toLowerCase()==='detectratio';var marg=Number(o.imgMargPix);if(enlarger.flags.detectratio&&!o.dontChangeAspectRatio){marg+=Math.round(Math.min(e.enlarger.width(),e.enlarger.width())*o.imgMargPercent);imageWidth=Math.round(e.enlarger.width()-8-marg);imageHeight=Math.round(e.enlarger.height()-8-marg)}else{marg+=Math.round(Math.min(e.eImgContainer.width(),e.eImgContainer.width())*o.imgMargPercent);imageWidth=Math.round(e.eImgContainer.width()-8-marg);imageHeight=Math.round(e.eImgContainer.height()-8-marg)}
$('.offer-enlarger-image').css('padding',(marg/2)+'px');e.enlarger.css('visibility','visible').css('display','none');e.eImg.each(function(i){if(offers[i].formats==='[]')return;var img=$('#canv'+i);if(img.height()===null)img=$('#div-image-canv'+i);enlarger.flags.vertical[i]=img.width()<img.height()&&enlarger.flags.detectratio&&!o.dontChangeAspectRatio||o.enlargerType.toLowerCase()==='boxing';var imgW=(enlarger.flags.vertical[i]?Math.round(imageWidth/2)-4:imageWidth);$('.offer-enlarger-image').append('<div id="enlargerImg'+i+'" class="canv-img" style="padding:4px"><canvas id="enlargerCanv'+i+'" width="'+imgW+'" height="'+imageHeight+'"></canvas></div>');displayImage(offers[i].imgUrl,'enlargerCanv'+i,imgW,imageHeight,offers[i].formats,!1,!1,!0);$(e.eImg[i]).remove();var canv=$('#enlargerImg'+i);canv.css('display','none');e.eCanv.push(canv)});if(supportTransition){switch(o.animType){case '1':persp=(o.bannerHeight&&o.bannerWidth)?((o.bannerWidth/o.bannerHeight)*150+300)+'px':'600px';enlarger.enlargerAnim.animStart={perspective:persp,rotateX:-55,opacity:0,y:"-25%"};enlarger.enlargerAnim.animIn={perspective:persp,rotateX:0,opacity:1,y:"0%",easing:'easeOutCirc'};enlarger.enlargerAnim.animOut={perspective:persp,rotateX:55,opacity:0,y:"25%",easing:'easeInCubic'};break;case '2':e.allOffers.css('left','0px');persp=(o.bannerHeight&&o.bannerWidth)?((o.bannerWidth/o.bannerHeight)*150+300)+'px':'600px';enlarger.allOffersAnim.animIn={perspective:persp,rotateY:-90,opacity:0,easing:'easeInOutCubic'};enlarger.allOffersAnim.animOut={perspective:persp,rotateY:0,opacity:1,easing:'easeInOutCubic'};enlarger.enlargerAnim.animIn={perspective:persp,rotateY:0,opacity:1,easing:'easeInOutCubic'};enlarger.enlargerAnim.animOut={perspective:persp,rotateY:90,opacity:0,easing:'easeInOutCubic'};break;case '3':e.allOffers.css('left','0px');enlarger.allOffersAnim.animIn={x:'-100%',opacity:0,easing:'easeInOutCubic'};enlarger.allOffersAnim.animOut={x:'0%',opacity:1,easing:'easeInOutCubic'};enlarger.enlargerAnim.animIn={x:'0%',opacity:1,easing:'easeInOutCubic'};enlarger.enlargerAnim.animOut={x:'100%',opacity:0,easing:'easeInOutCubic'};break;case '4':enlarger.enlargerAnim.animIn={scale:[1,1],opacity:1},enlarger.enlargerAnim.animOut={scale:[0.35,0.35],opacity:0};break;default:enlarger.enlargerAnim.animIn={scale:[1,1],x:0,y:0},enlarger.enlargerAnim.animOut={x:'-75%',y:'-75%',scale:[0.25,0.25]};break}
enlarger.enlargerAnim.infobar.animIn=[{e:e.eInfobar,p:{y:0},o:{duration:400}},{e:e.nameContainer,p:{y:0},o:{duration:400}},{e:$('.offer-enlarger-price-wrapper'),p:{y:0},o:{duration:400}},{e:$('.offer-enlarger-button-wrapper'),p:{y:0},o:{duration:400,complete:function(){if(enlarger.enlargerAnim.promo){enlarger.priceAnim.start()}}}}];enlarger.enlargerAnim.infobar.animOut=[{e:$('.offer-enlarger-infobar'),p:{y:200},o:{duration:0}},{e:e.nameContainer,p:{y:200},o:{duration:0}},{e:$('.offer-enlarger-price-wrapper'),p:{y:200},o:{duration:0}},{e:$('.offer-enlarger-button-wrapper'),p:{y:200},o:{duration:0}}]}else{o.rollText=!1}
e.enlarger.anim(enlarger.enlargerAnim.animStart?enlarger.enlargerAnim.animStart:enlarger.enlargerAnim.animOut,0);if(o.offerRibbonAlways)
banner.showElem(e.eRibbon)},cacheEnlargerElem:function(){e.enlarger=$('#offer-enlarger'),e.loader=$('.offer-loader'),e.eClose=$('.offer-enlarger-close'),e.eImgContainer=$('.offer-enlarger-image'),e.eImg=$('.offer-enlarger-image img'),e.eRibbonContainer=o.ribbonType===2?$('.enlarger-ribbon.radius'):$('.offer-enlarger-ribbon-container'),e.eRibbon=$('.offer-enlarger-ribbon'),e.eRibbonValue=o.ribbonType===2?$('.enlarger-ribbon.radius .content'):$('.offer-enlarger-ribbon span'),e.eInfobar=$('.offer-enlarger-infobar'),e.ePrice=$('.offer-enlarger-price'),e.ePriceValue=$('.offer-enlarger-price-value'),e.eCurrency=$('.offer-enlarger-infobar .offer-currency'),e.eOldprice=$('.offer-enlarger-oldprice'),e.eOldpriceValue=$('.offer-enlarger-oldprice-value'),e.eLink=$('.offer-enlarger-link'),e.eName=$('.offer-enlarger-name-value'),e.nameContainer=$('.offer-enlarger-name')
e.stars=$('#enlarger-stars'),e.starsInside=$('#stars-inside'),e.region=$('#enlarger-region'),e.regionTxt=$('.offer-enlarger-region')
e.enlargerButton=$('.offer-enlarger-button-wrapper');e.enlargerButtonTxt=$('.offer-enlarger-button span');e.eCanv=[]},bindEnlargerUIAction:function(){e.offer.on('mouseenter',function(ev){if(!enlarger.flags.ok)return;banner.flags.mouseOnBanner=!0;enlarger.clearAllTimeout();enlarger.offerAnim.stop();var id=$(this).data('id');banner.changeOfferZindex(id);nextOffer=id;enlarger.enlargerAnim.start(id);if(o.enlargeHover){if(o.initHoverAnim){banner.hoverAnim.stop()}else{banner.frameAnim.stop()}}
ev.preventDefault()}).on('mouseleave',function(ev){if(!enlarger.flags.ok)return;enlarger.enlargerAnim.stopLoader();if(o.enlargeHover){if(o.initHoverAnim){banner.hoverAnim.stop()}else{banner.frameAnim.stop()}}
ev.preventDefault()});e.banner.on('mouseenter',function(ev){if(!enlarger.flags.ok)return;banner.flags.mouseOnBanner=!0;enlarger.clearAllTimeout();enlarger.offerAnim.stop();if(multiscreen.enabled)multiscreen.arrowActions.visibility();ev.preventDefault()}).on('mouseleave',function(ev){if(!enlarger.flags.ok)return;banner.flags.mouseOnBanner=!1;if(multiscreen.enabled)multiscreen.arrowActions.visibility();if(banner.flags.theEnd)banner.offerPriceAnim.hideOldPrice();ev.preventDefault();if(o.enlargeHover)banner.restartOffersAnim();autoHide=setTimeout(function(){enlarger.enlargerAnim.hide();autoShowNext=setTimeout(function(){o.isAutoStopped=!1;if(!banner.flags.dontChangeOffer){nextOffer=nextOffer===o.offersCount-1?0:nextOffer+1}else{banner.flags.dontChangeOffer=!1}
if(!banner.flags.theEnd)enlarger.autoAnim.start(nextOffer)},500)},0)});e.eClose.on('mouseenter',function(ev){enlarger.closeBtnAnim.start();ev.preventDefault()}).on('mouseleave',function(ev){enlarger.closeBtnAnim.stop();ev.preventDefault()}).on('click',function(ev){clearTimeout(autoClose);enlarger.enlargerAnim.hide();ev.preventDefault()})},placeButtonText:function(){tools.placeTextField({container:$('.offer-enlarger-button'),txt:e.enlargerButtonTxt},{changeFontSize:!0,minFontSize:5,html:!0,showFunction:function(txt,con){txt.css('opacity','1')}})},enlargerAnim:{promo:!1,animIn:{opacity:1,x:'0%',y:'0%',width:'100%',height:'100%'},animOut:{opacity:0,x:'12.5%',y:'12.5%',width:'75%',height:'75%'},start:function(id){$(e.loader[id]).animate({width:'100%'},800,function(){enlarger.enlargerAnim.show(id)})},stopLoader:function(){e.loader.clearQueue().stop().animate({width:0},100)},show:function(id){if(enlarger.flags.enlargerShown)return;enlarger.flags.currentOffer=id;$(document).trigger("enlargerOpen");if(banner.flags.arrowsVisible)multiscreen.arrowActions.show(!1);if(o.showMoreInfo){enlarger.flags.stars=Number(offers[id].stars)>=0.25;enlarger.flags.region=offers[id].tripRegion!=''&&offers[id].tripRegion!='custom_property'&&offers[id].tripRegion!=undefined;if(enlarger.flags.stars){var starsHtml='';var starsReal=offers[id].stars;var starsNumber=Math.ceil(offers[id].stars);for(var i=0;i<starsNumber;i++){if(i===Math.floor(offers[id].stars)&&(starsNumber-starsReal>=0.25&&starsNumber-starsReal<0.75)){starsHtml+='<div style="width:6px; height:12px; left:0px; display:inline-block;"><img src="'+o.starUrl+'"/></div>'}else{starsHtml+='<div style="width:12px; height:12px; display:inline-block;"><img src="'+o.starUrl+'"/></div>'}}
e.starsInside.html(starsHtml);e.stars.css('visibility','visible');if(o.infobarAnim)e.stars.css('bottom','0px')}else{e.stars.css('visibility','hidden')}
if(enlarger.flags.region){e.regionTxt.html(offers[id].tripRegion);e.region.css('visibility','visible');if(o.infobarAnim)e.region.css('bottom','0px')}else{e.region.css('visibility','hidden')}
if(e.banner.width()<200){if(enlarger.flags.stars&&enlarger.flags.region){e.stars.addClass('enlarger-stars-position-left');e.region.addClass('enlarger-region-position-left');e.banner.classesAdded=!0}else if(e.banner.classesAdded){e.stars.removeClass('enlarger-stars-position-left');e.region.removeClass('enlarger-region-position-left');e.banner.classesAdded=!1}}}
banner.flags.dontShowArrows=!0;enlarger.flags.enlargerShown=!0;if(enlarger.flags.vertical[id]){e.enlarger.addClass('boxing')}else{e.enlarger.removeClass('boxing')}
if(multiscreen.enabled)multiscreen.checkScreen(id);enlarger.enlargerAnim.addInfo(id);if(enlarger.flags.vertical[id])enlarger.enlargerAnim.infobar.show();if(!e.banner.hasClass('planche-in')){e.banner.addClass('enlarger-in');e.enlarger.css('display','inline-block').anim(enlarger.enlargerAnim.animIn,o.showSpeed,function(){enlarger.enlargerAnim.stopLoader();if(!enlarger.flags.vertical[id])showTimeout=setTimeout('enlarger.enlargerAnim.infobar.show()',500);e.enlarger.css('transform','none');$(document).trigger("enlargerOpened")});if(enlarger.allOffersAnim.animIn){e.allOffers.anim(enlarger.allOffersAnim.animIn,o.showSpeed)}}else{enlarger.enlargerAnim.stopLoader()}
if(!o.isAutoStopped&&!o.enlargeHover){autoHideEnlarger=setTimeout(function(){nextOffer=nextOffer===o.offersCount-1?0:nextOffer+1;enlarger.autoAnim.start(nextOffer)},3500)}},hide:function(){if(!enlarger.flags.enlargerShown)return;$(document).trigger("enlargerClose");if(banner.flags.arrowsVisible&&banner.flags.mouseOnBanner&&multiscreen.enabled)multiscreen.arrowActions.show(!0);banner.flags.dontShowArrows=!1;enlarger.flags.enlargerShown=!1;e.enlarger.anim(enlarger.enlargerAnim.animOut,o.hideSpeed,function(){enlarger.priceAnim.stop();e.banner.removeClass('enlarger-in');if(enlarger.enlargerAnim.animStart)e.enlarger.anim(enlarger.enlargerAnim.animStart,0).css('display','block');$(this).css('display','none');$(document).trigger("enlargerClosed")});if(enlarger.allOffersAnim.animOut){e.allOffers.anim(enlarger.allOffersAnim.animOut,o.hideSpeed,function(){e.allOffers.css('transform','none')})}
if(o.rollText)setTimeout(function(){tools.stopRollAllTexts(!0)},o.hideSpeed/2)},addInfo:function(id){e.eRibbon.css('display','none'),e.eOldprice.css('display','none');for(var i=0;i<e.eCanv.length;i++){e.eCanv[i].css('display',id===i?'inline-block':'none')}
if(o.infobarAnim){this.infobar.hide()}
var wrap=!1;if(o.rollTextOptions)var wrap=o.rollTextOptions.horizontal!=!0&&o.rollTextOptions.horizontal!=undefined;e.eLink[0].href=offers[id].url,e.eRibbonValue.html(offers[id].ribbonText);if(offers[id].price){e.ePriceValue.html(offers[id].price)
e.eCurrency.html(offers[id].offerCurrency);e.ePrice.css('display','')}else{e.ePrice.css('display','none')}
var space=!wrap?"          ":"";e.eName.html(o.rollText?space+offers[id].fullName+space:offers[id].name);e.eRibbonContainer.css('display',offers[id].ribbonText!=''?'block':'none');if(e.enlarger.hasClass('oldprice-set'))e.enlarger.removeClass('oldprice-set');if(e.enlarger.hasClass('no-oldprice-set'))e.enlarger.removeClass('no-oldprice-set');if(offers[id].oldPrice){e.enlarger.addClass('oldprice-set');e.eOldpriceValue.html(offers[id].oldPrice)
e.eCurrency.html(offers[id].offerCurrency);e.eRibbon.css('display','inline-block');enlarger.enlargerAnim.promo=!0;if(o.showTwoPrices)enlarger.showPrices()}else{e.enlarger.addClass('no-oldprice-set');if(o.showTwoPrices){enlarger.flags.twoPricesInfobar=!1;e.ePrice.css("margin-top",0)}}
if(o.rollText){if(!wrap)e.eName.css('white-space','nowrap').css('width','auto')
tools.stopRollAllTexts(!0);setTimeout(function(){tools.rollTextField({container:e.nameContainer,txt:e.eName},o.rollTextOptions?o.rollTextOptions:{horizontal:!0,infinite:!0,noBreak:!0,stopOnEnd:!1})},400+(wrap?250:0)+((o.infobarAnim&&!(enlarger.flags.detectratio&&enlarger.flags.vertical[id]))?1000:0))}},infobar:{animIn:[{e:$('.offer-enlarger-infobar'),p:{bottom:0},o:{duration:300,complete:function(){if(enlarger.enlargerAnim.promo){enlarger.priceAnim.start()}}}}],animOut:[{e:$('.offer-enlarger-infobar'),p:{bottom:-200},o:{duration:0}}],show:function(){if(enlarger.flags.twoPricesInfobar){e.eInfobar.css("height","80px").css("margin-top","-20px")}else{e.eInfobar.css("height","").css("margin-top","")}
if(o.showMoreInfo&&o.infobarAnim){e.stars.anim({bottom:'50px'},{duration:300,delay:200});e.region.anim({bottom:'50px'},{duration:300,delay:220})}
if(!o.infobarAnim){if(enlarger.enlargerAnim.promo){enlarger.priceAnim.start()}
return}
var that=this;$.each(that.animIn,function(i,seq){seq.e.delay(i*50).anim(seq.p,seq.o)})},hide:function(){var that=this;$.each(that.animOut,function(i,seq){seq.e.anim(seq.p,seq.o)})}}},autoAnim:{start:function(id){if(o.enlargeHover)return;enlarger.enlargerAnim.hide();autoShowNext=setTimeout(function(){if(planche.enabled){planche.makeShow(function(){enlarger.offerAnim.start(id,function(){enlarger.enlargerAnim.show(id)})})}else{enlarger.offerAnim.start(id,function(){enlarger.enlargerAnim.show(id)})}},1000)},stop:function(){o.isAutoStopped=!0;enlarger.enlargerAnim.stopLoader();clearTimeout(autoHideEnlarger);clearTimeout(autoShowNext)}},priceAnim:{start:function(){if(o.showTwoPrices)return;priceAutoAnim=setTimeout(function(){e.ePrice.toggle();e.eOldprice.toggle();enlarger.priceAnim.start()},1000)},stop:function(){clearTimeout(priceAutoAnim);e.ePrice.css('display','inline-block');enlarger.enlargerAnim.promo=!1;setTimeout(function(){clearTimeout(priceAutoAnim)},500)}},closeBtnAnim:{start:function(){var imgEl=e.eClose.find('img');imgEl[0].src=imgEl.data('src');autoClose=setTimeout(enlarger.enlargerAnim.hide,1000)},stop:function(){clearTimeout(autoClose);var imgEl=e.eClose.find('img');imgEl[0].src=imgEl.data('default')}},offerAnim:{start:function(id,callback){if(multiscreen.enabled)multiscreen.checkScreen(id);banner.changeOfferZindex(id);var dur=400;offerComplete=setTimeout(function(){if(!banner.flags.mouseOnBanner)callback.call(this)},dur*4);var sequence=[{param:{opacity:.1},options:{duration:dur}},{param:{opacity:1},options:{duration:dur}},{param:{opacity:.1},options:{duration:dur}},{param:{opacity:1},options:{duration:dur}}];$.each(sequence,function(i,seq){$(e.offer[id]).delay(i*5).anim(seq.param,seq.options)})},stop:function(){e.offer.stop().clearQueue().anim({opacity:1},{duration:1,queue:!1})}},clearAllTimeout:function(clearInfo){clearInfo=clearInfo||!1;o.isAutoStopped=!0;clearTimeout(initEnlarger);clearTimeout(autoHideEnlarger);clearTimeout(autoShowNext);clearTimeout(autoHide);clearTimeout(autoClose);if(clearInfo)clearTimeout(showTimeout);clearTimeout(offerComplete)},showPrices:function(){enlarger.flags.twoPricesInfobar=o.infobarAnim&&!enlarger.flags.vertical[enlarger.flags.currentOffer];if(!enlarger.priceLineHeight)enlarger.priceLineHeight=Number(e.ePrice.css("line-height").replace("px",""));var higher=e.allContainer.css("left")!="0px"&&e.eImgContainer.css("width")==="100%";e.eOldprice.css("display","block").css("margin-top",(enlarger.flags.twoPricesInfobar?-enlarger.priceLineHeight/1.2:higher?-enlarger.priceLineHeight*1.5:enlarger.flags.detectratio?-enlarger.priceLineHeight*1.5:-enlarger.priceLineHeight*1.5)+"px");e.ePrice.css("display","block").css("margin-top",(enlarger.flags.twoPricesInfobar?enlarger.priceLineHeight/1.4:higher?enlarger.priceLineHeight/4:-enlarger.priceLineHeight?enlarger.priceLineHeight/2:enlarger.priceLineHeight*1.5)+"px")}}