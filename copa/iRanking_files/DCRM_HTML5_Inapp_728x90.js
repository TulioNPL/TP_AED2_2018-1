// JavaScript Document
//HTML5 Ad Template JS from DoubleClick by Google

var container;
var content;
var bgExit;
		
//Function confirm if the creative is visible	
enablerInitHandler = function(e) {
	if(Enabler.isVisible()) {
	startAd();
	} else {
	Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, startAd);
	} 
};

//Start the creative
startAd = function(e) {
	//Assign All the elements to the element on the page
	container = document.getElementById('container_dc');
	content = document.getElementById('content_dc');	
	bgExit = document.getElementById('background_exit_dc');
	//Add listeners
	addListeners();
	container.style.display = "block";
};

//Add Event Listeners
addListeners = function(e) {
	bgExit.addEventListener('touchEnd', bgExitHandler, false);
	bgExit.addEventListener('click', bgExitHandler, false);
};

//Add exits
bgExitHandler = function(e) {	
	Enabler.exit('HTML5_Background_Clickthrough');
};

//Wait for the content to load to call the start od the ad
window.onload = function(){
	if (Enabler.isInitialized()) {
	  enablerInitHandler();
	} else {
	  Enabler.addEventListener(studio.events.StudioEvent.INIT, enablerInitHandler);
	}
};	
