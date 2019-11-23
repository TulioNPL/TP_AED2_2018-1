/* mg */try{ (function(){ hotwords.core.Mediator.publish('Richmedia.closed', true); }()); try{
var paramNv = '';
addNvgParam = function(name){
var connection = nvgGetSegment(name);
if ((connection != null) && (connection != '')){
paramNv = paramNv + '&nvg_' + name + '=' + connection;
}
}
addNvgParam('connection');
addNvgParam('brand');
addNvgParam('everyone');
addNvgParam('product');
addNvgParam('career');
addNvgParam('industry');
addNvgParam('gender');
addNvgParam('age');
addNvgParam('education');
addNvgParam('marital');
addNvgParam('income');
addNvgParam('interest');
addNvgParam('everybuyer');
if (paramNv != ''){
paramNv = paramNv + '&siteId=' + 5841;
var imgBalaoBG = new Image;
imgBalaoBG.src = 'http://zone28.hotwords.com.br/event.gif?event=navegg' + paramNv;
}
}catch(errNv){}
}catch(e){}