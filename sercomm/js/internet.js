
function page_internet_load(){
	page_internet_die();
	
	var pageId = sys_pageid;
	var data = new Date().getTime();
	
	if(pageId == "sub=26"){ //port-mapping
		if(usermode == 'admin'){
			$('#content').load('internet_page/internet_port_mappin_admin.html?_='+data, function(response, status, xhr) {
				var tmp_js_ary = ['js/internet_port_mappin_admin.js', 'js/internet_port_mappin_expert.js', 'js/internet_port_mappin.js' ];
				getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}else{
			if(sys_dropDownBasExp == 'basic'){
				$('#content').load('internet_page/internet_port_mappin.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ['js/internet_port_mappin.js'];
					getScriptByArray(tmp_js_ary);
					//alert(response);
					//alert(status);
					//alert(xhr);
				});
			}
			if(sys_dropDownBasExp == 'expert'){
				$('#content').load('internet_page/internet_port_mappin_expert.html?_='+data, function(response, status, xhr) {
					var tmp_js_ary = ["js/internet_port_mappin_expert.js", "js/internet_port_mappin.js"];
					getScriptByArray(tmp_js_ary);
					//alert(response);
					//alert(status);
					//alert(xhr);
				});
			}
		}
	}else if(pageId == "sub=27"){ //DMZ
		$('#content').load('internet_page/internet_dmz.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_dmz.js"];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=23"){ //parental control
		$('#content').load('internet_page/internet_parental_control.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_parental_control.js" ];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=29"){ //DynDNS
		$('#content').load('internet_page/internet_dyn_dns.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_dyndns.js" ];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=85"){ //UPnP
		$('#content').load('internet_page/internet_upnp.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_upnp.js" ];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=22"){ //Firewall
		$('#content').load('internet_page/internet_firewall.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_firewall.js" ];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=32"){ //DSL & UMTS
		$('#content').load('internet_page/internet_dsl_umts.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ["js/internet_dsl_umts.js" ];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=89"){ //UMTS
		$('#content').load('internet_page/internet_umts.html?_='+data, function(response, status, xhr) {
			var tmp_js_ary = ['js/internet_umts.js'];
			getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else{
		$('#content').html('&nbsp;');
	}
}

function page_internet_die(){
	$('input[type="text"], input[type="password"]').die();
	$('.button-delete-small, .button-delete').die();
	$('.button-edit-small').die();
	$('.popup #cancelButton').die();
	$('.popup .button-cancel').die();
	$('.port-mapping .button-off').die();
	$('.port-mapping .button-on').die();
	$('#port-mapping-del').die();
	$('#port-mapping-edit').die();
	$('#alg_sip, #alg_h323, #alg_ftp, #alg_l2tp, #alg_pptp, #alg_ipse').die();
	$('.port-triggering .button-off').die();
	$('.port-triggering .button-on').die();
	$('#port-triggering-del').die();
	$('#port-triggering-edit').die();
}