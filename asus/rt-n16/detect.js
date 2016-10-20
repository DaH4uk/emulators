<<<<<<< HEAD
﻿// Use AJAX to detect LAN connection
function isWLclient(){  //detect login client is by wireless or wired
	if(wireless.length > 0){
		for(var i=0; i < wireless.length; i++){
			if(wireless[i][0] == login_mac_str())
				return true;  //wireless
		}
	}
	
	return false; //wired
}

//var http_request2 = false;

function makeRequest_lan(url) {
	//http_request2 = new XMLHttpRequest();
	var http_request2 = new XMLHttpRequest();
	
	if (http_request2 && http_request2.overrideMimeType)
		http_request2.overrideMimeType('text/xml');
	else
		return false;

	//http_request2.onreadystatechange = alertContents_lan;
	http_request2.onreadystatechange = function(){
				alertContents_lan(this);
			};
	http_request2.open('GET', url, true);
	http_request2.send(null);
}

var xmlDoc_ie2;

function makeRequest_ie_lan(file)
{
	xmlDoc_ie2 = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc_ie2.async = false;
	if (xmlDoc_ie2.readyState==4)
	{
		xmlDoc_ie2.load(file);
		refresh_laninfo(xmlDoc_ie2);
	}
}

//function alertContents_lan()
function alertContents_lan(request_obj)
{
	//if (http_request2 != null && http_request2.readyState != null && http_request2.readyState == 4)
	if (request_obj != null && request_obj.readyState != null && request_obj.readyState == 4)
	{
		//if (http_request2.status != null && http_request2.status == 200)
		if (request_obj.status != null && request_obj.status == 200)
		{
			//var xmldoc_mz2 = http_request2.responseXML;
			var xmldoc_mz2 = request_obj.responseXML;
			refresh_laninfo(xmldoc_mz2);
		}
	}
}

var msecs;
var timerID = null;
var timerRunning = false;
var timeout = 1000;
var delay = 5000;
var stopFlag_lan = 0;

function resetTimer(){
	if(stopFlag_lan == 1){
		stopFlag_lan = 0;
		InitializeTimer2();
	}
}

function InitializeTimer2()
{
	msecs = timeout;
	StopTheClock2();
	StartTheTimer2();
}

function StopTheClock2()
{
	if(timerRunning)
		clearTimeout(timerID);
	timerRunning = false;
}

function StartTheTimer2()
{
	if (msecs==0)
	{
		StopTheClock2();

		if(stopFlag_lan==1)
			return;

		updateLAN();
		msecs = timeout;
		StartTheTimer2();
	}
	else
	{
		msecs = msecs - 1000;
		timerRunning = true;
		timerID = setTimeout("StartTheTimer2();", delay);
	}
}

var forward_page = "";
var page_flag = "";

function detectLANstatus(forward_page, page_flag)
{
	this.forward_page = forward_page;
	this.page_flag = page_flag;
	
	updateLAN();
	InitializeTimer2();
}

function updateLAN()
{
	var ie = window.ActiveXObject;

	if (ie)
		makeRequest_ie_lan('/WPS_info.html');
	else
		makeRequest_lan('/WPS_info.html');
}

function refresh_laninfo(xmldoc)
{
	var wpss=xmldoc.getElementsByTagName("wps");
	if (wpss!=null && wpss[0]!=null)
	{
		if($("drword")){
			$("drword").innerHTML = "Connection is reestablished.<br/><br/>";
		}
		
		stopFlag_lan = 1;
		if(page_flag == "detectWAN"){
			send_for_detectWAN();
		}
		else if(document.forms[0].current_page.value == "/QIS_wizard.htm"){
			setTimeout("gotoFinish('"+forward_page+"', '"+page_flag+"');", 1000);
		}
		else if(forward_page.length > 0){
			setTimeout("location.href = '"+forward_page+"';", 1000);
		}
	}
}

function send_for_detectWAN(){
	document.redirectForm.action = "detectWAN.html";
	document.redirectForm.target = "contentM";
	document.redirectForm.submit();
}

function reply_of_detectWAN(result){
	document.redirectForm.action = "QIS_wizard.htm";
	document.redirectForm.target = "";
	
	if(result == 1){
		document.redirectForm.flag.value = "remind";
	}
	else{
		document.redirectForm.flag.value = "auto_way_static";
		document.redirectForm.prev_page.value = "start_apply.htm";
	}
	
	document.redirectForm.submit();
}
=======
﻿// Use AJAX to detect LAN connection
function isWLclient(){  //detect login client is by wireless or wired
	if(wireless.length > 0){
		for(var i=0; i < wireless.length; i++){
			if(wireless[i][0] == login_mac_str())
				return true;  //wireless
		}
	}
	
	return false; //wired
}

//var http_request2 = false;

function makeRequest_lan(url) {
	//http_request2 = new XMLHttpRequest();
	var http_request2 = new XMLHttpRequest();
	
	if (http_request2 && http_request2.overrideMimeType)
		http_request2.overrideMimeType('text/xml');
	else
		return false;

	//http_request2.onreadystatechange = alertContents_lan;
	http_request2.onreadystatechange = function(){
				alertContents_lan(this);
			};
	http_request2.open('GET', url, true);
	http_request2.send(null);
}

var xmlDoc_ie2;

function makeRequest_ie_lan(file)
{
	xmlDoc_ie2 = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc_ie2.async = false;
	if (xmlDoc_ie2.readyState==4)
	{
		xmlDoc_ie2.load(file);
		refresh_laninfo(xmlDoc_ie2);
	}
}

//function alertContents_lan()
function alertContents_lan(request_obj)
{
	//if (http_request2 != null && http_request2.readyState != null && http_request2.readyState == 4)
	if (request_obj != null && request_obj.readyState != null && request_obj.readyState == 4)
	{
		//if (http_request2.status != null && http_request2.status == 200)
		if (request_obj.status != null && request_obj.status == 200)
		{
			//var xmldoc_mz2 = http_request2.responseXML;
			var xmldoc_mz2 = request_obj.responseXML;
			refresh_laninfo(xmldoc_mz2);
		}
	}
}

var msecs;
var timerID = null;
var timerRunning = false;
var timeout = 1000;
var delay = 5000;
var stopFlag_lan = 0;

function resetTimer(){
	if(stopFlag_lan == 1){
		stopFlag_lan = 0;
		InitializeTimer2();
	}
}

function InitializeTimer2()
{
	msecs = timeout;
	StopTheClock2();
	StartTheTimer2();
}

function StopTheClock2()
{
	if(timerRunning)
		clearTimeout(timerID);
	timerRunning = false;
}

function StartTheTimer2()
{
	if (msecs==0)
	{
		StopTheClock2();

		if(stopFlag_lan==1)
			return;

		updateLAN();
		msecs = timeout;
		StartTheTimer2();
	}
	else
	{
		msecs = msecs - 1000;
		timerRunning = true;
		timerID = setTimeout("StartTheTimer2();", delay);
	}
}

var forward_page = "";
var page_flag = "";

function detectLANstatus(forward_page, page_flag)
{
	this.forward_page = forward_page;
	this.page_flag = page_flag;
	
	updateLAN();
	InitializeTimer2();
}

function updateLAN()
{
	var ie = window.ActiveXObject;

	if (ie)
		makeRequest_ie_lan('/WPS_info.html');
	else
		makeRequest_lan('/WPS_info.html');
}

function refresh_laninfo(xmldoc)
{
	var wpss=xmldoc.getElementsByTagName("wps");
	if (wpss!=null && wpss[0]!=null)
	{
		if($("drword")){
			$("drword").innerHTML = "Connection is reestablished.<br/><br/>";
		}
		
		stopFlag_lan = 1;
		if(page_flag == "detectWAN"){
			send_for_detectWAN();
		}
		else if(document.forms[0].current_page.value == "/QIS_wizard.htm"){
			setTimeout("gotoFinish('"+forward_page+"', '"+page_flag+"');", 1000);
		}
		else if(forward_page.length > 0){
			setTimeout("location.href = '"+forward_page+"';", 1000);
		}
	}
}

function send_for_detectWAN(){
	document.redirectForm.action = "detectWAN.html";
	document.redirectForm.target = "contentM";
	document.redirectForm.submit();
}

function reply_of_detectWAN(result){
	document.redirectForm.action = "QIS_wizard.htm";
	document.redirectForm.target = "";
	
	if(result == 1){
		document.redirectForm.flag.value = "remind";
	}
	else{
		document.redirectForm.flag.value = "auto_way_static";
		document.redirectForm.prev_page.value = "start_apply.htm";
	}
	
	document.redirectForm.submit();
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
