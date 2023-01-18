
function page_settings_load(){
	page_settings_die();
	
	var pageId = sys_pageid;
  var data = new Date().getTime() + '&csrf_token=' + csrf_token;

	if(pageId == "sub=60"){ //password
		if(usermode == 'admin'){
			$('#content').load('settings_page/settings_password_admin.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_password.js"];
				getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}else{
			$('#content').load('settings_page/settings_password.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_password.js"];
				getScriptByArray(tmp_js_ary);
				//alert(response);
				//alert(status);
				//alert(xhr);
			});
		}
		
	}else if(pageId == "sub=54"){ //configuration
		if(usermode == 'basic'){
			$('#content').load('settings_page/settings_configuration_enduser.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_configuration_enduser.js", "js/settings_configuration.js"];
				getScriptByArray(tmp_js_ary);
			});
		}else{
			$('#content').load('settings_page/settings_configuration.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_configuration_enduser.js", "js/settings_configuration.js"];
				getScriptByArray(tmp_js_ary);
			});
		}
		
	}else if(pageId == "sub=77"){ //Language
		$('#content').load('settings_page/settings_language.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_language.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=52"){ //LAN
		$('#content').load('settings_page/settings_lan.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_lan.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});

	}else if(pageId == "sub=75"){ //tr069
		$('#content').load('settings_page/settings_tr069.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_tr069.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
	}else if(pageId == "sub=74"){ //internet time
		$('#content').load('settings_page/settings_internet_time.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_internet_time.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=59"){ //Firmware Update
		$('#content').load('settings_page/settings_fw_update.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_fw_update.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=80"){ //Access Control Services
		$('#content').load('settings_page/settings_access_control.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_access_control.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=69"){ //ADSL Settings
		$('#content').load('settings_page/settings_adsl_settings.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_adsl_settings.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=88"){ //UMTS
		$('#content').load('settings_page/settings_umts.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_umts.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}else if(pageId == "sub=68"){ //WAN
		
		    if (usermode != 'admin')
    {
     	$('#content').load('settings_page/settings_enduser_wan.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_enduser_wan.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});        //return;
    }else
	{
			$('#content').load('settings_page/settings_wan2.html?_=' + data, function(response, status, xhr) {
				var tmp_js_ary = ["js/settings_wan2.js"];
				getScriptByArray(tmp_js_ary);
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}

    } else if (pageId == "sub=92") { //FD1018/VD1018 WAN
        $('#content').load('settings_page/settings_wan2.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_wan2.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

        //INTERNATIONAL PAGES START
    } else if (pageId == "sub=58") { //USB
        $('#content').load('settings_page/settings_usb.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_usb.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=56") { //Content Sharing
        $('#content').load('settings_page/settings_content_sharing.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_content_sharing.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=56&subSub=57") { //DLNA
        $('#content').load('settings_page/settings_dlna.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_content_sharing_folder.js", "js/settings_dlna.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=56&subSub=51") { //Network Share (Samba)
        $('#content').load('settings_page/settings_network_sharing.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_content_sharing_folder.js", "js/settings_network_sharing.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=56&subSub=50") { //FTP
        $('#content').load('settings_page/settings_ftp.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_content_sharing_folder.js", "js/settings_ftp.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=83") { //Printer Sharing
        $('#content').load('settings_page/settings_printer_sharing.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_printer_sharing.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=73") { //Quality of Service(QoS)
        $('#content').load('settings_page/settings_qos.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_qos.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=76") { //SNMP Configuration
        $('#content').load('settings_page/settings_snmp.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_snmp.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });
        //INTERNATIONAL PAGES END

    } else if (pageId == "sub=97") { //IPv6 Basic Configuration
        $('#content').load('settings_page/settings_ipv6_basic_configuration.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_ipv6_basic_configuration.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=86") { //Static Routing
        $('#content').load('settings_page/settings_static_routing.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_static_routing.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=93") { //Policy Routing
        $('#content').load('settings_page/settings_policy_routing.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_policy_routing.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=300") { //IPTV
        $('#content').load('settings_page/settings_iptv.html?_=' + data, function (response, status, xhr) {
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else if (pageId == "sub=301") { //VLAN
        $('#content').load('settings_page/settings_vlan.html?_=' + data, function (response, status, xhr) {
            //alert(response);
            //alert(status);
            //alert(xhr);
        });


    } else if (pageId == "sub=302") { //PPPOE RELAY
        $('#content').load('settings_page/settings_pppoe_relay.html?_=' + data, function (response, status, xhr) {
            var tmp_js_ary = ["js/settings_pppoe_relay.js"];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    }else if(pageId == "sub=303"){ //Syslog Client
		$('#content').load('settings_page/settings_syslog_client.html?_=' + data, function(response, status, xhr) {
			//alert(response);
			//alert(status);
			//alert(xhr);
		});
		
	}
    else {
        $('#content').html('&nbsp;');
    }
}

function page_settings_die(){
	$('.popup .button-cancel').die();
	$('#uploadedfile').die();
	$('.button-delete-small').die();
	$('select').die();
	$('input[type="text"]').die();
	$('select').die();
	$('.popup .button-cancel').die();
	$('input.button-on, input.button-off').die();
	$('.button-edit-small').die();
	$('.button.button-delete:not(.op40)').die();
	
	$('#device_data input.button-on, #device_data input.button-off').die();
	
}