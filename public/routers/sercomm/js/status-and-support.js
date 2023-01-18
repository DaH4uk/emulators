function page_statussupport_load()
{	
  var data = new Date().getTime() + '&csrf_token=' + csrf_token;
	page_statussupport_die();
	
	var pageId = sys_pageid;	
	if(pageId == "sub=1")
	{
		$('#content').load('statusandsupport/status.html?_=' + data, function(response, status, xhr) {
			
		});
	}
	else if(pageId == "sub=1&subSub=66")
	{
		$('#content').load('statusandsupport/dsl.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/status-and-support_adsl.js"];
				getScriptByArray(tmp_js_ary);
		});		
	}
	else if(pageId == "sub=1&subSub=82") //Fibre Status
	{
		$('#content').load('statusandsupport/fibre.html?_=' + data, function(response, status, xhr) {
		});		
	}
	else if(pageId == "sub=1&subSub=44")
	{
		$('#content').load('statusandsupport/umts.html?_=' + data, function(response, status, xhr) {
		});
	}
	else if(pageId == "sub=1&subSub=3")
		page_statussupport_voice_load();
	else if(pageId == "sub=4")
		page_statussupport_diagnostic_load();
	else if(pageId == "sub=41")
		page_statussupport_restart_load();
	else if(pageId == "sub=42")
		page_statussupport_about_load();
	else if(pageId == "sub=28")
		page_statussupport_matmapping_load();
	else if(pageId == "sub=6"){
		$("#content").load('./statusandsupport/eventlog.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {	  
		});
	}
	else if(pageId == "sub=1&subSub=71"){ //routing
		$('#content').load('statusandsupport/routing.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/status-and-support_routing.js"];
				getScriptByArray(tmp_js_ary);
		});
	}
	else if(pageId == "sub=1&subSub=67"){ //wan
		$('#content').load('statusandsupport/wan.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/status-and-support_wan.js"];
				getScriptByArray(tmp_js_ary);
		});
	}
	else if(pageId == "sub=1&subSub=70"){ //lan
		$('#content').load('statusandsupport/lan.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/status-and-support_lan.js"];
				getScriptByArray(tmp_js_ary);
		});
	}
	else if(pageId == "sub=87"){ //VOIP Diagnostics
		$('#content').load('statusandsupport/voip_diagnostics.html?_=' + data, function(response, status, xhr) {
		});
	}
	else if(pageId == "sub=98"){ //Port Mirroring
		$('#content').load('statusandsupport/port_mirroring.html?_=' + data, function(response, status, xhr) {
		});
	}
}

function page_statussupport_voice_load()
{
	transHTMLString();
	
	var str='';
	str+='<div class="table-row table-row-head">';
	str+='<div class="table-col"><span id="lang603004">'+getHTMLString(603004)+'</span></div>'; //Phone Number
	str+='<div class="table-col"><span id="lang603013">'+getHTMLString(603013)+'</span></div>'; //Line
	str+='<div class="table-col"><span id="lang603019">'+getHTMLString(603019)+'</span></div>'; //Service Status
	str+='</div>';
			
	$("#content").load('./statusandsupport/voice.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {	  
			var JSONSource   = './data/statussupportvoice.json?_='+ new Date().getTime() + '&csrf_token=' + csrf_token;
			$.getJSON(JSONSource, function(data) {				
					//Invalid filter
					data = filterInvalidString(data);
					
					$.each(data, function(key, val) {
						//alert(key + ':' + val);
									var phone_number='';
									var phone_line='';
									var service_status='';
									$.each(val, function(key, val) {
										//alert(key + ':' + val);										
										if(key == "phone_number") phone_number = val;
										if(key == "phone_line") phone_line = val;
										if(key == "service_status") service_status = val;
									});
									
									str+='<div class="table-row">';
									str+='<div class="table-col">';
									str+=phone_number;
									str+='</div>';
									str+='<div class="table-col"><img src="';
									if(phone_line=="603014")
										str+='img/online.png';
									else
										str+='img/offline.png';
									str+='" alt=""> <span>';
									str+=getHTMLString(phone_line);
									str+='</span></div>';
									str+='<div class="table-col">';
									str+=getHTMLString(service_status);
									str+='</div>';
									str+='</div>';
						});
			$('#voice_table').html(str); 
			});	  	  
	});
		
}

function page_statussupport_matmapping_load()
{	
	$("#content").load('./statusandsupport/matmapping.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {
		
	});
}

function page_statussupport_diagnostic_load()
{
	$("#content").load('./statusandsupport/diagnostic.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {	  
				var tmp_js_ary = ["js/statussupport_diagnostic.js"];
				getScriptByArray(tmp_js_ary);
	});
}

function page_statussupport_restart_load()
{
	$("#content").load('./statusandsupport/restart.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {	  
	});
}

function page_statussupport_about_load()
{
	$("#content").load('statusandsupport/about.html?_='+ new Date().getTime() + '&csrf_token=' + csrf_token, function() {	  
	});
}

function page_statussupport_die(){
	$('.radio-unchecked').die();
}
