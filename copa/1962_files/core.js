function trace(e){console.log(e)}function Amadre_Animation(){function e(e,t,i){for(var o=0,c=0;c<t.length;c++)document.querySelector(t[c][0])?(l+=1e3*t[c][1],r=t[c][0].replace(".",""),window["timer"+c]=l,window["clear_"+r]=setTimeout(function(){if("STOP_HERE"==e&&i&&i(),"LOOPING"==e)n(".all"),i&&i();else for(var r=o;r==o;o++){window["elementMoment"+r]=t[r][0];for(var l=document.querySelectorAll(window["elementMoment"+r]),a=0;a<l.length;a++)l[a].classList.add(e)}},window["timer"+c]),a.push([r,e,window["clear_"+r]])):(s.innerHTML=s.innerHTML+t[c][0]+": error<br>",document.body.appendChild(s))}function t(e){var t=1,n=document.createElement("div");n.setAttribute("style","width:95px;height:40px;background-color:#B50707;color:white;z-index:9999;position:relative;text-align:center;top:0px;left:0px;opacity: 0.5;border-radius: 50px;font-size: 22px;line-height: 50px;"),n.innerHTML="<span>Timer animation:</span>",n.querySelector("span").setAttribute("style","position: absolute;font-size: 9px;color: #fff;top: -16px;left: 9px;"),document.body.appendChild(n);var i=setInterval(function(){var o,r=t.toString();1==r.length?o="0."+r.substr(0,1):2==r.length?o=r.substr(0,1)+"."+r.substr(1,1):3==r.length&&(o=r.substr(0,1)+r.substr(1,1)+"."+r.substr(2,1)),n.innerHTML=o+"<span>Timer animation:</span>s",n.querySelector("span").setAttribute("style","position: absolute;font-size: 9px;color: #fff;top: -16px;left: 9px;"),t++,el(e).addEventListener("transitionend",function(e){clearInterval(i)},!1),el(e).addEventListener("webkitTransitionEnd",function(e){clearInterval(i)},!1),el(e).addEventListener("oTransitionEnd",function(e){clearInterval(i)},!1),el(e).addEventListener("animationend",function(e){clearInterval(i)},!1),el(e).addEventListener("webkitAnimationEnd",function(e){clearInterval(i)},!1),el(e).addEventListener("MSAnimationEnd",function(e){clearInterval(i)},!1)},100)}function n(e){if(".all"==e){l=0;for(var t=0;t<a.length;t++){for(var n=document.querySelectorAll("."+a[t][0]),i=0;i<n.length;i++)n[i].classList.remove(a[t][1]);clearTimeout(a[t][2])}}else for(var o=0;o<a.length;o++)if(a[o][0]==e.replace(".",""))for(var r=document.querySelectorAll("."+a[o][0]),i=0;i<r.length;i++)r[i].classList.remove(a[o][1])}function i(t,n,i,o){var r=el(n).innerHTML,l=r.split(o),a=Math.floor(1e3*Math.random()+1);el(n).innerHTML="";for(var s=0;s<l.length;s++){var c=l[s];if(""==o){" "==c&&(c="&nbsp");var d=document.createElement("div");d.innerHTML=c,el(n).appendChild(d),d.style.position="relative",d.style["float"]="left",d.classList.add(t+"_"+a+"_"+s)}else{var d=document.createElement("div");d.innerHTML=c+"&nbsp",el(n).appendChild(d),d.style.position="relative",d.style["float"]="left",d.classList.add(t+"_"+a+"_"+s)}}for(var s=0;s<el(n).children.length;s++)e(t,[["."+t+"_"+a+"_"+[s],i]])}function o(){var e=navigator.userAgent.toLowerCase();return-1!=e.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)?!0:!1}var r,l=0,a=[],s=document.createElement("div");s.setAttribute("style","margin:2px;width:95px;height:auto;background-color:#000000;color:white;z-index:9999;position:relative;text-align:center;top:0px;left:0px;opacity: 0.5;border-radius: 10px;font-size: 10px;line-height: 50px;"),s.innerHTML="<span>DEBUG:</span>",s.querySelector("span").setAttribute("style","position: absolute;font-size: 9px;color: #fff;top: -16px;left: 31px;"),this.animationElements=e,this.animationControlTime=t,this.clearAnimation=n,this.splitWordAnimation=i,this.isMobile=o}function Performance_Align(){function e(e){for(var t=0;t<e.length;t++){var n=0;e[t][3]&&(n=e[t][3]),"top"===e[t][1]?el(e[t][0]).style[e[t][1]]=Math.floor(e[t][2]/2-el(e[t][0]).clientHeight/2+n)+"px":"tl"===e[t][1]||"TL"===e[t][1]?(el(e[t][0]).style.top=Math.floor(e[t][2][0]/2-el(e[t][0]).clientHeight/2+n)+"px",el(e[t][0]).style.left=Math.floor(e[t][2][1]/2-el(e[t][0]).clientWidth/2+n)+"px"):el(e[t][0]).style[e[t][1]]=Math.floor(e[t][2]/2-el(e[t][0]).clientWidth/2+n)+"px"}}function t(e,n){var i=window.getComputedStyle(document.querySelector(e),null).getPropertyValue("width").split("px");n=null===n?parseInt(i):n;for(var o=window.getComputedStyle(document.querySelector(e),null).getPropertyValue("font-size").split("px"),r=window.getComputedStyle(document.querySelector(e),null).getPropertyValue("letter-spacing").split("px"),l=window.getComputedStyle(document.querySelector(e),null).getPropertyValue("font-family"),a=window.getComputedStyle(document.querySelector(e),null).getPropertyValue("text-transform"),s=o[0],c=el(e).innerHTML,d=c.split(" "),p=0;p<d.length;p++){var u=document.createElement("div");u.innerHTML=d[p],u.style.width="auto",u.style.position="absolute",u.style.fontSize=s+"px",u.style.fontFamily=l,u.style.textTransform=a,u.style.letterSpacing=r[0]+"px",document.getElementById("banner").appendChild(u);var f=u.clientWidth;if(f>n){s-=1,el(e).style.fontSize=s+"px",document.getElementById("banner").removeChild(u),t(e,n);break}document.getElementById("banner").removeChild(u)}}this.alignText=e,this.automateText=t}function Performance_Sprites(){function e(t,n,i,o,r){var l=1e3/(o/r);setTimeout(function(){o>i&&(el(t).style.backgroundPosition=n-n*i+"px",i++,e(t,n,i,o,r))},l)}function t(e,t,n){for(var i=document.styleSheets,o=0;o<i.length;o++)if(-1!=i[o].href.indexOf("animate")){var r=i[o];r.insertRule("@keyframes spriteAnimacaoScript {0% { background-position: 0% 0%; }100% { background-position: 100% 100%; }}",0),el(e).style.opacity="1",el(e).style.animation="spriteAnimacaoScript "+n+"s steps("+t+") forwards"}}this.spriteScript=e,this.spriteCss=t}function Performance_Config(){function e(e,t){function n(){if(s++,s===c)if(el(".preloaderMain"))el(".preloaderMain").style.transition="all 1s cubic-bezier(0.215, 0.61, 0.355, 1)",el(".preloaderMain").style.opacity=0,setTimeout(function(){for(var e=0;d>e;e++)t[e]()},1100);else for(var e=0;d>e;e++)t[e]()}for(var i=JSON.stringify(e),o=[],r=!0;r;){var l=new RegExp(/http[^\"]*(jpg|png|gif)/g),a=l.exec(i);a?(i=i.replace(a[0]," "),o.push(a[0])):r=!1}for(var s=0,c=o.length,d=t.length,p=0;c>p;p++)window["imgPreloader_"+p]=new Image,window["imgPreloader_"+p].src=o[p],window["imgPreloader_"+p].addEventListener?window["imgPreloader_"+p].addEventListener("load",function(){n()}):window["imgPreloader_"+p].attachEvent("onload",function(){n()})}this.preloaderImgs=e}var d=document,el=function(e){return d.querySelector(e)};