
function page_wifi_load(){
	page_wifi_die();
	
	var pageId = sys_pageid;
	var data = new Date().getTime() + '&csrf_token=' + csrf_token;
	
	if(pageId == "sub=35"){ //wifi_general
		if(usermode == 'admin'){
			$('#content').load('wifi_page/general_admin.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_general.js"];
					getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}else{
			$('#content').load('wifi_page/general.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_general.js"];
					getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}
	}else if(pageId == "sub=36"){ //wifi_schedule
		$('#content').load('wifi_page/schedule.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_schedule.js"];
					getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=37"){ //wifi_wps
		$('#content').load('wifi_page/wps.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_wps.js"];
					getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=38"){ //wifi_mac_filter
		if(usermode == 'admin'){
			$('#content').load('wifi_page/mac_filter_admin.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_mac_filter.js"];
					getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}else{
			$('#content').load('wifi_page/mac_filter.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_mac_filter.js"];
					getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}
		
	}else if(pageId == "sub=40"){ //wifi_settings
		$('#content').load('wifi_page/settings.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/wifi_settings.js"];
					getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=102"){ //VF WiFi Network
		$('#content').load('wifi_page/vf_wifi_network.html?_='+data, function(response, status, xhr) {
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else{
		$('#content').html('&nbsp;');
	}
}

function page_wifi_die(){
	$('#normSelect').die();
	$('.button-delete').die();
	$('input[type="text"]').die();
	$('.button-delete, .button-add').die();
	$('.button-delete-small').die();
	$('#allowNormal.radio-unchecked').die();
	$('#denyNormal.radio-unchecked').die();
	$(".scm-cancel").die();
}