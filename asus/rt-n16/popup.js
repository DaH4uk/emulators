// JavaScript Document
var winH,winW; //瀏覽器內容的長與寬,判斷遮罩大小使用
var timeout = 0;
var progress = 0;

function winW_H(){
	if(parseInt(navigator.appVersion) > 3){
		winW = document.documentElement.scrollWidth;
		if(document.documentElement.clientHeight > document.documentElement.scrollHeight)
			winH = document.documentElement.clientHeight;
		else
			winH = document.documentElement.scrollHeight;
	}
} 

function LoadingTime(seconds, flag){
	showtext($("proceeding_main_txt"), "Proceeding...");
	$("Loading").style.visibility = "visible";
	
	y = y+progress;
	if(typeof(seconds) == "number" && seconds >= 0){
		if(seconds != 0){
			showtext($("proceeding_main_txt"), "Please wait, ");
			showtext($("proceeding_txt"), Math.round(y)+"% Proceeding");
			--seconds;
			timeout = setTimeout("LoadingTime("+seconds+", '"+flag+"');", 1000);
		}
		else{
			showtext($("proceeding_main_txt"), translate("Complete!"));
			showtext($("proceeding_txt"), "");
			y = 0;
			
			if(flag != "waiting")
				timeout = setTimeout("hideLoading();",1000);
		}
	}
}
function LoadingProgress(seconds){
	$("LoadingBar").style.visibility = "visible";
	
	y = y+progress;
	if(typeof(seconds) == "number" && seconds >= 0){
		if(seconds != 0){
			$("proceeding_img").style.width = Math.round(y) + "%";
			$("proceeding_img_text").innerHTML = Math.round(y) + "%";
			--seconds;
			timeout = setTimeout("LoadingProgress("+seconds+");", 1000);
		}
		else{
			$("proceeding_img_text").innerHTML = "Complete!";
			y = 0;
			timeout = setTimeout("hideLoadingBar();",1000);
			location.href = "/";
		}
	}
}

function showLoading(seconds, flag){
	disableCheckChangedStatus();
	
	if(location.pathname.indexOf("QIS_wizard.htm") < 0)
		hideHint();
	clearHintTimeout();
	
	clearTimeout(timeout);
	
	htmlbodyforIE = document.getElementsByTagName("html");  //this both for IE&FF, use "html" but not "body" because <!DOCTYPE html PUBLIC.......>
	htmlbodyforIE[0].style.overflow = "hidden";	  //hidden the Y-scrollbar for preventing from user scroll it.
	
	winW_H();
	var blockmarginTop;
	blockmarginTop = document.documentElement.scrollTop + 200;	
	$("loadingBlock").style.marginTop = blockmarginTop+"px"
	$("Loading").style.width = winW+"px";
	$("Loading").style.height = winH+"px";
	
	loadingSeconds = seconds;
	if(seconds > 0)
		progress = 100/loadingSeconds;
	else
		progress = 100;
	y = 0;
	
	LoadingTime(seconds, flag);
}

function dr_advise(){
	disableCheckChangedStatus();
	
	clearHintTimeout();
	
	htmlbodyforIE = document.getElementsByTagName("html");  //this both for IE&FF, use "html" but not "body" because <!DOCTYPE html PUBLIC.......>
	htmlbodyforIE[0].style.overflow = "hidden";	  //hidden the Y-scrollbar for preventing from user scroll it.
	
	winW_H();
	var blockmarginTop;
	blockmarginTop = document.documentElement.scrollTop + 200;	
	$("dr_sweet_advise").style.marginTop = blockmarginTop+"px"
	$("hiddenMask").style.width = winW+"px";
	$("hiddenMask").style.height = winH+"px";	
	$("hiddenMask").style.visibility = "visible";
}

function showLoadingBar(seconds){
	disableCheckChangedStatus();
	
	if(location.pathname.indexOf("QIS_wizard.htm") < 0)
		hideHint();
	clearHintTimeout();
	
	htmlbodyforIE = document.getElementsByTagName("html");  //this both for IE&FF, use "html" but not "body" because <!DOCTYPE html PUBLIC.......>
	htmlbodyforIE[0].style.overflow = "hidden";	  //hidden the Y-scrollbar for preventing from user scroll it.
	
	winW_H();
	var blockmarginTop;
	blockmarginTop = document.documentElement.scrollTop + 200;
	$("loadingBarBlock").style.marginTop = blockmarginTop+"px";
	$("LoadingBar").style.width = winW+"px";
	$("LoadingBar").style.height = winH+"px";
	
	loadingSeconds = seconds;
	if(seconds > 0)
		progress = 100/loadingSeconds;
	else
		progress = 100;
	y = 0;
	
	LoadingProgress(seconds);
}

function hideLoadingBar(flag){
	if(flag != "noDrSurf")
		enableCheckChangedStatus();
	
	$("LoadingBar").style.visibility = "hidden";
}

function hideLoading(flag){
	if(flag != "noDrSurf")
		enableCheckChangedStatus();
	
	$("Loading").style.visibility = "hidden";
}             

function simpleSSID(obj){
	var SSID = document.loginform.wl_ssid.value;
	
	if(SSID.length < 16)
		showtext(obj, SSID);
	else{
		obj.title = SSID;
		showtext(obj, SSID.substring(0, 16)+"...");
	}
}        
