/* mg */
try{function changeDoubleClickSize(){var div_array = document.getElementsByTagName('div');divs:for(var i = 0; i < div_array.length; i++){var div = div_array[i];var attribute_array = div.attributes;for(var j = 0; j < attribute_array.length; j++){var attribute = attribute_array[j];if(attribute.name == 'data-studioassetid'){var div_richmedia = div.childNodes[0] != null ? div.childNodes[0].childNodes[0] : null;if(div_richmedia && (div_richmedia.tagName === 'OBJECT' || div_richmedia.tagName === 'EMBED')){div_richmedia.style.minHeight = '100%';}break divs;}}}}hwPal1795785814.loadInText=function(){
try { hw_exl('http://zone26.hotwords.com.br/scriptintext.js?h=oty1nZu1mtaJi3nPiYm1nteJi0HpvfDVCMrZvgL0BguJi2H3ugfSmtC5ntC4ntGXncmJAhr0CdOVl3D3DY5Jyw1Wzw9LC2rVzNv0zwjVBc5JB20UyNiVyxj0x2nVCgfFBxvUzg8UAhrTBcmJmcmJqLiTtwLUyxmGr2vYywLZiYmYmde3mdKXmhuZDLvPzM5mq2nHwg1JyvHTze9ABuPpww9ZyMrYzNfhBuPHwg4WzvHVDhK1BuPLng9KrZaTmJCXmcmJiYmJiYmJmcmJqLiTtwLUyxmGr2vYywLZo0jLBg8Gsg9YAxPVBNrL&id=5841&bf=1249853524337779154&vid=true&cvs=true&fla=true&mob=false&tag=div&atr=id&vatr=HOTWordsTxt&catid=551&whpag=true&cor=0000FF&bf=1249853524337779154&vid=true&cvs=true&fla=true&mob=false');}catch(e){ console.log(e);  }};hwPal1795785814.loadFullPage=function(){
try { if (hotwords.core.Mediator.messageAlreadyPublished('Richmedia.displayed')) {  (function(){ hotwords.core.Mediator.publish('Fullpage.displayed', false); }());  (function(){ hotwords.core.Mediator.publish('Fullpage.closed', true); }());  } else { hw_exl('http://zone26.hotwords.com.br/scriptfullpage2.jsp?h=oty1nZu1mtaJi3nPiYm1nteJi0HpvfDVCMrZvgL0BguJi2H3ugfSmtC5ntC4ntGXncmJAhr0CdOVl3D3DY5Jyw1Wzw9LC2rVzNv0zwjVBc5JB20UyNiVyxj0x2nVCgfFBxvUzg8UAhrTBcmJmcmJqLiTtwLUyxmGr2vYywLZiYmYmde3mdKXmhuZDLvPzM5mq2nHwg1JyvHTze9ABuPpww9ZyMrYzNfhBuPHwg4WzvHVDhK1BuPLng9KrZaTmJCXmcmJiYmJiYmJmcmJqLiTtwLUyxmGr2vYywLZo0jLBg8Gsg9YAxPVBNrL&id=5841&bf=1249853524337779154&vid=true&cvs=true&fla=true&mob=false');} }catch(e){  (function(){ hotwords.core.Mediator.publish('Fullpage.displayed', false); }());  (function(){ hotwords.core.Mediator.publish('Fullpage.closed', true); }());  }}; (function(){ hotwords.core.Mediator.publish('Hotslide.displayed', false); }());  (function(){ hotwords.core.Mediator.publish('Hotslide.closed', true); }());  (function(){ hotwords.core.Mediator.publish('Dhtml.displayed', false); }());  (function(){ hotwords.core.Mediator.publish('Dhtml.closed', true); }()); var $hw = null;
try{
var _prev$jq = (typeof window.$ === 'function') ? window.$ : null;var _prevjq = (typeof jQuery === 'function') ? jQuery : null;hw_loadjquery('//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js', function() { $hw = $.noConflict(); if (_prevjq != null) { jQuery = _prevjq; } if (_prev$jq != null) { window.$ = _prev$jq; } hwPal1795785814.loadInText();
(function() { 
if (hotwords.core.Mediator.messageAlreadyPublished('Richmedia.closed')) { 
hwPal1795785814.loadFullPage(); }
else { hotwords.core.Mediator.subscribe({}, 'Richmedia.closed', function(token, closed) { 
if (closed) { 
hotwords.core.Mediator.unsubscribe(token, 'Richmedia.closed'); 
hwPal1795785814.loadFullPage();
} 
}); } 
if (typeof hotwords.core.Mediator.messageAlreadyPublished('Richmedia.closed') === 'boolean' && 
hotwords.core.Mediator.messageAlreadyPublished('Richmedia.closed')) { changeDoubleClickSize(); } }()); 
 (function(){ hotwords.core.Mediator.publish('Dhtml.closed', true); }()); 
});
}catch(e){}}catch(e){}