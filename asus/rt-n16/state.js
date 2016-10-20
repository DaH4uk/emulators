<<<<<<< HEAD
﻿var uptimeStr = "Thu, 01 Jan 1970 02:29:09 +0000(8955 secs since boot)";
var timezone = uptimeStr.substring(26,31);
var boottime = parseInt(uptimeStr.substring(32,38));
var newformat_systime = uptimeStr.substring(8,11) + " " + uptimeStr.substring(5,7) + " " + uptimeStr.substring(17,25) + " " + uptimeStr.substring(12,16);  //Ex format: Jun 23 10:33:31 2008
var systime_millsec = Date.parse(newformat_systime); // millsec from system
var JS_timeObj = new Date(); // 1970.1.1

var test_page = 0;
var testEventID = "";
var dr_surf_time_interval = 5;	// second
var show_hint_time_interval = 1;	// second

var wan_route_x = "";
var wan_nat_x = "";
var wan_proto = "";

// Dr. Surf {
// for detect if the status of the machine is changed. {
var manually_stop_wan = "";

// original status {
var old_ifWANConnect = 0;
var old_qos_ready = 1;
var old_wan_link_str = "";
var old_detect_dhcp_pppoe = "";
var old_wan_status_log = "";

var old_disk_status = "";
var old_mount_status = "";
var old_printer_sn = "";
var old_wireless_clients = "";
// original status }

// new status {
var new_ifWANConnect = 0;
var new_wan_link_str = "";
var new_detect_dhcp_pppoe = "";
var new_wan_status_log = "";

var new_disk_status = "";
var new_mount_status = "";
var new_printer_sn = "";
var new_wireless_clients = "";
// new status }

var id_of_check_changed_status = 0;

function unload_body(){
	disableCheckChangedStatus();
	no_flash_button();
	
	return true;
}

function enableCheckChangedStatus(flag){
	var seconds = this.dr_surf_time_interval*1000;
	
	disableCheckChangedStatus();
	
	if(old_wan_link_str == ""){
		seconds = 1;
		id_of_check_changed_status = setTimeout("get_changed_status('initial');", seconds);
	}
	else
		id_of_check_changed_status = setTimeout("get_changed_status();", seconds);
}

function disableCheckChangedStatus(){
	clearTimeout(id_of_check_changed_status);
	id_of_check_changed_status = 0;
}

function check_if_support_dr_surf(){
	if($("helpname"))
		return 1;
	else
		return 0;
}

function compareWirelessClient(target1, target2){
	if(target1.length != target2.length)
		return (target2.length-target1.length);
	
	for(var i = 0; i < target1.length; ++i)
		for(var j = 0; j < 3; ++j)
			if(target1[i][j] != target2[i][j])
					return 1;
	
	return 0;
}

var current_connect_status = -1;

function set_connect_status(connect_status){
	current_connect_status = connect_status;
}

function get_connect_status(){
	return current_connect_status;
}

function check_changed_status(flag){
	if(this.test_page == 1
			|| wan_route_x == "IP_Bridged")
		return;
	
	if(flag == "initial"){
		// for the middle of index.html.
		if(location.pathname == "/" || location.pathname == "/index.html"){
			if(old_ifWANConnect == 1 && old_wan_link_str == "Connected"){
				showMapWANStatus(1);
				set_connect_status(1);
			}
			else{
				showMapWANStatus(0);
				set_connect_status(0);
			}
		}
		
		// Dr. Surf
		if(old_ifWANConnect == 0) // WAN port is not plugged.
			parent.showDrSurf("1");
		else if(old_qos_ready == 0)
			parent.showDrSurf("40");
		else if(old_wan_link_str == "Disconnected"){
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
					parent.showDrSurf("2_1");
				else if(old_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("5");
			}
			// dhcp, static
			else
				parent.showDrSurf("5");
		}
		else
			parent.showDrSurf("0_0"); // connect is ok.
		
		enableCheckChangedStatus();
		
		return;
	}
	
	// for the middle of index.html.
	if(location.pathname == "/" || location.pathname == "/index.html"){
		if(new_ifWANConnect == 1 && new_wan_link_str == "Connected"){
			showMapWANStatus(1);
			set_connect_status(1);
		}
		else{
			showMapWANStatus(0);
			set_connect_status(0);
		}
	}
	
	// Dr.Surf.
	var diff_number = compareWirelessClient(old_wireless_clients, new_wireless_clients);
	
	if(diff_number != 0){
		old_wireless_clients = new_wireless_clients;
		
		//parent.showDrSurf("10");
		if(diff_number > 0)
			parent.showDrSurf("11");
		else
			parent.showDrSurf("12");
	}
	else if(old_disk_status != new_disk_status){
		old_disk_status = new_disk_status;
		
		parent.showDrSurf("20");
	}
	else if(parseInt(old_mount_status) < parseInt(new_mount_status)){
		old_mount_status = new_mount_status;
		
		parent.showDrSurf("21");
	}
	else if(old_printer_sn != new_printer_sn){
		old_printer_sn = new_printer_sn;
		
		parent.showDrSurf("30");
	}
	else if(old_ifWANConnect != new_ifWANConnect){ // if WAN port is plugged.
		old_ifWANConnect = new_ifWANConnect;
		
		if(new_ifWANConnect == 1)
			parent.showDrSurf("0_2");	// not plugged -> plugged
		else
			parent.showDrSurf("1");	// plugged -> not plugged
	}
	else if(old_wan_link_str != new_wan_link_str){
		old_wan_link_str = new_wan_link_str;
		
		if(new_wan_link_str == "Disconnected"){
			old_detect_dhcp_pppoe = new_detect_dhcp_pppoe;
			
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log != new_wan_status_log){ // PPP serial change!
					old_wan_status_log = new_wan_status_log;
					
					if(new_wan_status_log.length > 0){
						if(new_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
							parent.showDrSurf("2_1");
						else
							parent.showDrSurf("2_2");
					}
					else if(new_detect_dhcp_pppoe == "no-respond")
						parent.showDrSurf("2_2");
					else
						parent.showDrSurf("5");
				}
				else if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("3");
			}
			// dhcp, static
			else{
				if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else if(new_detect_dhcp_pppoe == "error")
					parent.showDrSurf("3");
				else
					parent.showDrSurf("5");
			}
		}
		else
			parent.showDrSurf("0_1");
	}
	
	enableCheckChangedStatus();
}

function get_changed_status(flag){
	document.titleForm.action = "/result_of_get_changed_status.html";
	
	if(flag == "initial")
		document.titleForm.flag.value = flag;
	else
		document.titleForm.flag.value = "";
	
//	document.titleForm.submit();
}

function initial_change_status(manually_stop_wan,
															 ifWANConnect,
														   wan_link_str,
														   detect_dhcp_pppoe,
														   wan_status_log,
														   disk_status,
														   mount_status,
														   printer_sn,
														   wireless_clients,
														   qos_ready
														   ){
	this.manually_stop_wan = manually_stop_wan;
	this.old_ifWANConnect = ifWANConnect;
	this.old_wan_link_str = wan_link_str;
	this.old_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.old_wan_status_log = wan_status_log;
	this.old_disk_status = disk_status;
	this.old_mount_status = mount_status;
	this.old_printer_sn = printer_sn;
	this.old_wireless_clients = wireless_clients;
	this.old_qos_ready = qos_ready;
}

function set_changed_status(manually_stop_wan,
														ifWANConnect,
														wan_link_str,
														detect_dhcp_pppoe,
														wan_status_log,
														disk_status,
														mount_status,
														printer_sn,
														wireless_clients
														){
	this.manually_stop_wan = manually_stop_wan;
	this.new_ifWANConnect = ifWANConnect;
	this.new_wan_link_str = wan_link_str;
	this.new_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.new_new_wan_status_log = wan_status_log;
	this.new_disk_status = disk_status;
	this.new_mount_status = mount_status;
	this.new_printer_sn = printer_sn;
	this.new_wireless_clients = wireless_clients;
}
// for detect if the status of the machine is changed. }

function set_Dr_work(flag){
	if(flag != "help"){
		$("Dr_body").onclick = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf();
			};
	}
	else{
		$("Dr_body").onclick = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf(null, "help");
			};
	}
}

var slowHide_ID_start = 0;
var slowHide_ID_mid = 0;

function clearHintTimeout(){
	if(slowHide_ID_start != 0){
		clearTimeout(slowHide_ID_start);
		slowHide_ID_start = 0;
	}
	
	if(slowHide_ID_mid != 0){
		clearTimeout(slowHide_ID_mid);
		slowHide_ID_mid = 0;
	}
}

function showHelpofDrSurf(hint_array_id, hint_show_id){
	var seconds = this.show_hint_time_interval*1000;
	
	if(!$("eventDescription")){
		setTimeout('showHelpofDrSurf('+hint_array_id+', '+hint_show_id+');', 100);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(typeof(hint_show_id) == "number" && hint_show_id > 0)
		clicked_help_string = "<span>"+helptitle[hint_array_id][hint_show_id][0]+"</span><br>"+helpcontent[hint_array_id][hint_show_id];
	$("eventDescription").innerHTML = clicked_help_string;
	
	set_Dr_work("help");
	$("eventLink").onclick = function(){};
	showtext($("linkDescription"), "");
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

var current_eventID = null;
var now_alert = new Array(3);

var alert_event0_0 = new Array("Connection is established.", "", "");
var alert_event0_1 = new Array("Connection is reestablished.", "Refresh page", refreshpage);
var alert_event0_2 = new Array("Cable in WAN port is plugged.", "Refresh page", refreshpage);
var alert_event1 = new Array("The cable for Ethernet is not plugged in.", "Refer to the diagnosis.", drdiagnose);
var alert_event2_1 = new Array("Your PPPoE or PPTP authentification failed.", "Refer to the diagnosis.", drdiagnose);
var alert_event2_2 = new Array("No response from the remote server.", "Refer to the diagnosis.", drdiagnose);
var alert_event3 = new Array("Your ISP's DHCP does not function properly.", "Refer to the diagnosis.", drdiagnose);
var alert_event4 = new Array("The Internet connection failed. Your router's IP address is the same as that of the gateway IP address.", "Refer to the diagnosis.", drdiagnose);  //wan_gateway & lan_ipaddr;
var alert_event5 = new Array("1. You have probably stopped the WAN connection manually.<br>2. You have set the wrong dynamic or static IP address for your RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event6 = new Array("RT-N16's subnet ID and the subnet ID in WAN are the same.", "Refer to the diagnosis.", drdiagnose);  //wan_gateway & lan_ipaddr;

var alert_event10 = new Array("Some wireless clients is connected to or disconnected from the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event11 = new Array("Some wireless clients were connected to the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event12 = new Array("Some wireless clients were disconnected from the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event20 = new Array("The USB disk status in RT-N16 has changed.", "Refer to the diagnosis.", drdiagnose);
var alert_event21 = new Array("The disk in RT-N16 is mounted and can be accessed.", "Refer to the diagnosis.", drdiagnose);
var alert_event30 = new Array("The status of USB printer status in RT-N16 has changed.", "Refer to the diagnosis.", drdiagnose);
var alert_event40 = new Array("Bandwidth Management is work, but the system can't detect the uplink speed. Please manually set the uplink speed.", "Refer to the diagnosis.", drdiagnose);

function showDrSurf(eventID, flag){
	var seconds = this.show_hint_time_interval*1000;
	var temp_eventID;
	
	// for test
	if(this.testEventID != "")
		eventID = this.testEventID;
	
	if(eventID){
		this.current_eventID = eventID;
		temp_eventID = eventID;
	}
	else
		temp_eventID = this.current_eventID;
	
	if(!temp_eventID || temp_eventID.length <= 0){
		id_of_check_changed_status = setTimeout("enableCheckChangedStatus();", 1000);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(flag != "help"){
		now_alert[0] = eval("alert_event"+temp_eventID+"[0]");
		if(temp_eventID != "5")
			showtext($("eventDescription"), now_alert[0]);
		else if(this.manually_stop_wan == "1")
			showtext($("eventDescription"), "You have probably stopped the WAN connection manually.");
		else
			showtext($("eventDescription"), "You have set the wrong dynamic or static IP address for your RT-N16.");
		
		now_alert[1] = eval("alert_event"+temp_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+temp_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](temp_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

function slowHide(filter){
	clearHintTimeout();
	
	$("drsword").style.filter = "alpha(opacity="+filter+")";
	$("drsword").style.opacity = filter*0.01;
	$("wordarrow").style.filter	= "alpha(opacity="+filter+")";
	$("wordarrow").style.opacity = filter*0.01;
	
	filter -= 5;
	if(filter <= 0){
		hideHint();
		
		enableCheckChangedStatus();
	}
	else
		slowHide_ID_mid = setTimeout("slowHide("+filter+");", 100);
}

function hideHint(){
	if(this.current_eventID){
		now_alert[0] = eval("alert_event"+this.current_eventID+"[0]");
		showtext($("eventDescription"), now_alert[0]);
		
		now_alert[1] = eval("alert_event"+this.current_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+this.current_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](current_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.visibility = "hidden";
	$("wordarrow").style.visibility = "hidden";
}

function drdiagnose(eventID){
	if(!check_if_support_dr_surf()){
		alert("Don't yet support Dr. Surf!");
		return;
	}
	
	if($('statusIcon'))
		$('statusIcon').src = "/images/iframe-iconDr.gif";
	
	if(typeof(openHint) == "function")
		openHint(0, 0);
	
	showtext($('helpname'), "Dr.Surf's diagnosis");
	
	if($("hint_body"))
		$("hint_body").style.display = "none";
	
	$("statusframe").style.display = "block";
	$('statusframe').src = "/device-map/diagnose"+eventID+".html";
}
// Dr. Surf }

var banner_code, menu_code="", menu1_code="", menu2_code="", tab_code="", footer_code;

function show_banner(L3){// L3 = The third Level of Menu
	var banner_code = "";
	
	// for chang language
	banner_code +='<form method="post" name="titleForm" id="titleForm" action="" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="current_page" value="">\n';
	banner_code +='<input type="hidden" name="sid_list" value="LANGUAGE;">\n';
	banner_code +='<input type="hidden" name="action_mode" value=" Apply ">\n';
	banner_code +='<input type="hidden" name="preferred_lang" value="">\n';
	banner_code +='<input type="hidden" name="flag" value="">\n';
	banner_code +='</form>\n';
	
	banner_code +='<div class="banner1" align="center"></div>\n';
	banner_code +='<table width="983" border="0" align="center" cellpadding="0" cellspacing="0">\n';
	banner_code +='<tr>\n';
	banner_code +='<td class="top-logo"><a href="/"><div id="modelName">RT-N16</div></a></td>\n';
	
	banner_code +='<td class="top-message">\n';
	banner_code +='<span class="top-messagebold">Time: </span><span class="time" id="systemtime"></span><br>\n';
	banner_code +='<span class="top-messagebold">SSID: </span><input class="top_ssid" type="text" value="" id="elliptic_ssid" readonly=readonly><br>\n';
	banner_code +='<span class="top-messagebold">Firmware Version:: </span><a href="/Advanced_FirmwareUpgrade_Content.html"><span id="firmver" class="time"></span></a>\n';
	banner_code +='</td>\n';
	
	banner_code +='<td class="top-message"width="150">\n';
	banner_code +='<span class="top-messagebold">Language:</span><br>\n';
	
	banner_code +='<select name="select_lang" id="select_lang" class="top-input" onchange="change_language();">\n';
	banner_code +='<option value="EN" selected>English</option>\n<option value="TW">繁體中文</option>\n<option value="CN">简体中文</option>\n<option value="KR">한국어</option>\n<option value="CZ">Česky</option>\n<option value="PL">Polski</option>\n<option value="RU">Pусский</option>\n<option value="DE">Deutsch</option>\n<option value="FR">Français</option>\n';
	banner_code +='</select>\n';
	banner_code +='<input type="button" id="change_lang_btn" class="button" value="Ok" onclick="submit_language();" style="float:right; margin:5px 10px 0 0;" disabled=disabled>\n';
	
	banner_code +='</td>\n';
	banner_code +='<td class="top-message" width="120">\n';
	banner_code +='<div id="logout_btn" class="buttonquit"><a href="javascript:;" onclick="logout();">Logout</a></div>\n';
	banner_code +='<div id="reboto_btn" class="buttonquit"><a href="javascript:;" onclick="reboot();">Reboot</a></div>\n';
	banner_code +='</td>\n';
	
// Dr. Surf {
	banner_code += '<td id="Dr_body" class="top-message" width="40">\n';
	
	banner_code += '<div id="dr" class="dr"></div>\n';
	banner_code += '<div id="drsword" class="drsword">\n';
	banner_code += '<span id="eventDescription"></span>\n';
	banner_code += '<br>\n';
	banner_code += '<a id="eventLink" href="javascript:void(0);"><span id="linkDescription"></span></a>\n';
	banner_code += '</div>\n';
	banner_code += '<div id="wordarrow" class="wordarrow"><img src="/images/wordarrow.png"></div>\n';
	
	banner_code += '&nbsp;</td>\n';
// Dr. Surf }
	
	banner_code +='<td width="11"><img src="images/top-03.gif" width="11" height="78" /></td>\n';
	banner_code +='</td></tr></table>\n';
	
	if(L3 == 0) 		// IF Without Level 3 menu, banner style will use top.gif.
		banner_code +='<div id="banner3" align="center"><img src="images/top.gif" width="983" height="19" /></div>\n';
	else
		banner_code +='<div id="banner3" align="center"><img src="images/top-advance.gif" width="983" height="19" /></div>\n';

	$("TopBanner").innerHTML = banner_code;
	
	show_loading_obj();
	
	if(location.pathname == "/" || location.pathname == "/index.html"){
		if(wan_route_x != "IP_Bridged")
			id_of_check_changed_status = setTimeout('hideLoading();', 3000);
	}
	else{
		id_of_check_changed_status = setTimeout('hideLoading();', 1);
	}
	
	show_time();
	show_top_status();
	set_Dr_work();
}

//Level 3 Menu in Gateway mode
var tabtitle = new Array(7);   // Use a 2-dimension Array to arrange tab title
tabtitle[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle[1] = new Array("", "LAN IP", "DHCP Server", "Route");
tabtitle[2] = new Array("", "Internet Connection", "QoS", "Port Trigger", "Virtual Server", "DMZ", "DDNS");
tabtitle[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle[4] = new Array("", "General", "URL Filter", "MAC Filter", "LAN to WAN Filter");
tabtitle[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle[6] = new Array("", "General Log", "DHCP Leases", "Wireless Log", "Port Forwarding", "Routing Table");
var tablink = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink[1] = new Array("", "Advanced_LAN_Content.html", "Advanced_DHCP_Content.html", "Advanced_GWStaticRoute_Content.html");
tablink[2] = new Array("", "Advanced_WAN_Content.html", "Advanced_QOSUserSpec_Content.html", "Advanced_PortTrigger_Content.html", "Advanced_VirtualServer_Content.html", "Advanced_Exposed_Content.html", "Advanced_ASUSDDNS_Content.html");
tablink[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink[4] = new Array("", "Advanced_BasicFirewall_Content.html", "Advanced_URLFilter_Content.html", "Advanced_MACFilter_Content.html", "Advanced_Firewall_Content.html");
tablink[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink[6] = new Array("", "Main_LogStatus_Content.html", "Main_DHCPStatus_Content.html", "Main_WStatus_Content.html", "Main_IPTStatus_Content.html", "Main_RouteStatus_Content.html");

//Level 3 Tab Menu in Router mode
var tabtitle_Router = new Array(7);   // Use a 2-dimension Array to arrange tab title
tabtitle_Router[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle_Router[1] = new Array("", "LAN IP", "DHCP Server", "Route");
tabtitle_Router[2] = new Array("", "Internet Connection", "QoS", "", "", "", "DDNS");
tabtitle_Router[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle_Router[4] = new Array("", "General", "URL Filter", "MAC Filter", "LAN to WAN Filter");
tabtitle_Router[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle_Router[6] = new Array("", "General Log", "DHCP Leases", "Wireless Log", "Port Forwarding", "Routing Table");
var tablink_Router = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink_Router[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink_Router[1] = new Array("", "Advanced_LAN_Content.html", "Advanced_DHCP_Content.html", "Advanced_GWStaticRoute_Content.html");
tablink_Router[2] = new Array("", "Advanced_WAN_Content.html", "Advanced_QOSUserSpec_Content.html", "", "", "", "Advanced_ASUSDDNS_Content.html");
tablink_Router[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink_Router[4] = new Array("", "Advanced_BasicFirewall_Content.html", "Advanced_URLFilter_Content.html", "Advanced_MACFilter_Content.html", "Advanced_Firewall_Content.html");
tablink_Router[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink_Router[6] = new Array("", "Main_LogStatus_Content.html", "Main_DHCPStatus_Content.html", "Main_WStatus_Content.html", "Main_IPTStatus_Content.html", "Main_RouteStatus_Content.html");

//Level 3 Tab Menu in AP mode
var tabtitle_AP = new Array(7);
tabtitle_AP[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle_AP[1] = new Array("", "LAN IP");
tabtitle_AP[2] = new Array("");
tabtitle_AP[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle_AP[4] = new Array("");
tabtitle_AP[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle_AP[6] = new Array("", "", "", "Wireless Log", "", "");
var tablink_AP = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink_AP[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink_AP[1] = new Array("", "Advanced_APLAN_Content.html");
tablink_AP[2] = new Array("", "");
tablink_AP[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink_AP[4] = new Array("", "");
tablink_AP[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink_AP[6] = new Array("", "", "", "Main_WStatus_Content.html", "", "");

//Level 1 Menu in Gateway, Router mode
menuL1_title = new Array("", "Network Map", "UPnP Media Server", "AiDisk", "EzQoS<br/> Bandwidth<br/> Management", "<br/> Advanced Setting");
menuL1_link = new Array("", "index.html","upnp.html", "aidisk.html", "EZQoS.html", "as.html");

//Level 1 Menu in AP mode
menuL1_title_AP = new Array("", "Network Map", "", "AiDisk", "", "<br/> Advanced Setting");
menuL1_link_AP = new Array("", "index.html", "", "aidisk.html", "", "as.html");

//Level 2 Menu in Gateway, Router mode, default link is 1st option in tab
menuL2_title = new Array("", "Wireless", "LAN", "WAN", "USB Application", "Firewall", "Administration", "System Log");
menuL2_link = new Array("", tablink[0][1], tablink[1][1], tablink[2][1], tablink[3][1], tablink[4][1], tablink[5][1], tablink[6][1]);	//指定第二層選單的預設連結為各類別的第一個選項

//Level 2 Menu in AP mode, default link is 1st option in tab
menuL2_title_AP = new Array("", "Wireless", "LAN", "", "USB Application", "", "Administration", "System Log");
menuL2_link_AP = new Array("", tablink_AP[0][1], tablink_AP[1][1], tablink_AP[2][1], tablink_AP[3][1], tablink_AP[4][1], tablink_AP[5][1], tablink_AP[6][3]);

function show_menu(L1, L2, L3){
	if(wan_route_x == "IP_Routed" && wan_nat_x == "0"){
		tabtitle = tabtitle_Router;
		tablink = tablink_Router;
	}
	else if(wan_route_x == "IP_Bridged"){
		tabtitle = tabtitle_AP;
		tablink = tablink_AP;
		menuL1_title = menuL1_title_AP;
		menuL1_link = menuL1_link_AP;
		menuL2_title = menuL2_title_AP;
		menuL2_link = menuL2_link_AP;
	}
	
	for(i = 1; i <= menuL1_title.length-1; i++){
		if(menuL1_title[i] == "")
			continue;
		else if(L1 == i && L2 <= 0)
		  menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+menuL1_title[i]+'</div>\n';
		else
		  menu1_code += '<div class="menu" id="option'+i+'"><a href="'+menuL1_link[i]+'" title="'+menuL1_link[i]+'">'+menuL1_title[i]+'</a></div>\n';	
	}
	
	$("mainMenu").innerHTML = menu1_code;
	
	if(L2 != -1){	// 先以Ｌ２判斷該頁是否為有子選單， －１表示沒有子選單，０表示有子選單但沒有任何被選擇的選項。 １~７依序為第二層選項
		for(var i = 1; i <= menuL2_title.length-1; ++i){
			if(menuL2_title[i] == "")
				continue;
			else if(L2 == i)	// 指定被選擇選項的Class style
				menu2_code += '<div class="thissubmenu">'+menuL2_title[i]+'</div>\n';
			else	// 指定非被選擇選項的Class style，以及連結的網址
				menu2_code += '<div class="submenu"><a href="'+menuL2_link[i]+'">'+menuL2_title[i]+'</a></div>\n';
		}
	}
	menu2_code += '<div><img src="images/m-button-07end.gif" width="187" height="47" /></div>\n';	//裝飾線
	
	$("subMenu").innerHTML = menu2_code;
	
	if(L3){
		tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
		for(var i = 1; i < tabtitle[L2-1].length; ++i){
			if(tabtitle[L2-1][i] == "")
				continue;
			else if(L3 == i)
				tab_code += '<td class=\"b1\">'+ tabtitle[L2-1][i] +'</td>\n';
			else
				tab_code += '<td class=\"b2\"><a href="' +tablink[L2-1][i]+ '">'+ tabtitle[L2-1][i] +'</a></td>\n';
		}
		tab_code += '</tr></table>\n';
		
		$("tabMenu").innerHTML = tab_code;
	}
	else
		$("tabMenu").innerHTML = "";//*/
}

function show_footer(){
	footer_code = '<div align="center" class="bottom-image"></div>\n';
	footer_code +='<div align="center" class="copyright">2009 ASUSTek Computer Inc. All rights reserved.</div>\n';
	
	$("footer").innerHTML = footer_code;
	
	if($("helpname"))
		showtext($("helpname"), "Help");
	if($("hint_body"))
		showtext($("hint_body"), "Help provides you with guidelines and information about using the router's functions.  Click the <a class=\"hintstyle\" style=\"background-color:#7aa3bd\">hyperlinked words with yellow and blue underline.</a> to get help.");
	flash_button();
}

function show_top_status(){
	// show SSID in the top-middle block
	var ssid_value = decodeURIComponent(document.form.ssid_acsii.value);
	
	if(ssid_value.length > 21){
		ssid_value = ssid_value.substring(0,20) + "...";
		$("elliptic_ssid").title = decodeURIComponent(document.form.ssid_acsii.value);
	}	
	
	$("elliptic_ssid").value = ssid_value;
	showtext($("firmver"), document.form.firmver.value);
}

function show_time(){
	JS_timeObj.setTime(systime_millsec); // Add millsec to it.
	JS_timeObj3 = JS_timeObj.toString();
	JS_timeObj3 = checkTime(JS_timeObj.getHours()) + ":" +
				  			checkTime(JS_timeObj.getMinutes()) + ":" +
				  			checkTime(JS_timeObj.getSeconds());
	$('systemtime').innerHTML ="<a href='/Advanced_System_Content.html'>" + JS_timeObj3 + "</a>";
	systime_millsec += 1000;
	
	stime_ID = setTimeout("show_time();", 1000);
}

function checkTime(i){
	if(i < 10)
		i = "0"+i;
	
  return i;
}

function show_loading_obj(){
	var obj = $("Loading");
	var code = "";
	
	code +='<table cellpadding="5" cellspacing="0" id="loadingBlock" class="loadingBlock" align="center">\n';
	code +='<tr>\n';
	code +='<td width="20%" height="80" align="center"><img src="/images/loading.gif"></td>\n';
	code +='<td><span id="proceeding_main_txt">Please wait, </span><span id="proceeding_txt" style="color:#FFFFCC;"></span></td>\n';
	code +='</tr>\n';
	code +='</table>\n';
	code +='<!--[if lte IE 6.5]><iframe class="hackiframe"></iframe><![endif]-->\n';
	
	obj.innerHTML = code;
}

var nav;

if(navigator.appName == 'Netscape')
	nav = true;
else{
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}

function MicrosoftEventHandler_KeyDown(){
	return true;
}

function submit_language(){
	if($("select_lang").value != $("preferred_lang").value)
		alert("This function is unavailable!");
	
	else
		alert("No change LANGUAGE!");
}

function change_language(){
	if($("select_lang").value != $("preferred_lang").value)
		$("change_lang_btn").disabled = false;
	else
		$("change_lang_btn").disabled = true;
}

function logout(){
	alert("This function is unavailable!");
}

function reboot(){
	alert("This function is unavailable!");
}

function kb_to_gb(kilobytes){
	if(typeof(kilobytes) == "string" && kilobytes.length == 0)
		return 0;
	
	return (kilobytes*1024)/(1024*1024*1024);
}

function simpleNum(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(kb_to_gb(num)*1000)/1000;
}

function simpleNum2(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num*1000)/1000;
}

function simpleNum3(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num)/1024;
}

function $(){
	var elements = new Array();
	
	for(var i = 0; i < arguments.length; ++i){
		var element = arguments[i];
	if(typeof element == 'string')
		element = document.getElementById(element);
		
		if(arguments.length == 1)
			return element;
		
		elements.push(element);
	}
	
	return elements;
}

function getElementsByName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		objsName = tagObjs[i].getAttribute("name");
		
		if(objsName && objsName.indexOf(name) == 0){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function getElementsByClassName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		if(navigator.appName == 'Netscape')
			objsName = tagObjs[i].getAttribute("class");
		else
			objsName = tagObjs[i].getAttribute("className");
		
		if(objsName == name){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function showtext(obj, str){
	/*if(!obj)
		return ;
	
	if(obj.hasChildNodes() && obj.lastChild.nodeName == "#text")
		obj.lastChild.nodeValue = str;
	else
		obj.appendChild(document.createTextNode(str));//*/
	if(obj)
		obj.innerHTML = str;//*/
}

function showhtmlspace(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf(" ")) >= 0){
		str += head.substring(0, tail_num);
		str += "&nbsp;";
		
		head = head.substr(tail_num+1, head.length-(tail_num+1));
	}
	str += head;
	
	return str;
}

// A dummy function which just returns its argument. This was needed for localization purpose
function translate(str){
	return str;
}

function trim(val){
	val = val+'';
	for (var startIndex=0;startIndex<val.length && val.substring(startIndex,startIndex+1) == ' ';startIndex++);
	for (var endIndex=val.length-1; endIndex>startIndex && val.substring(endIndex,endIndex+1) == ' ';endIndex--);
	return val.substring(startIndex,endIndex+1);
}

function IEKey(){
	return event.keyCode;
}

function NSKey(){
	return 0;
}

function is_string(o){
	if(!nav)
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0)
		return true;
	else if(keyPressed >= 0 && keyPressed <= 126)
		return true;
	
	alert('Invalid character!');
	return false;
}

function validate_string(string_obj, flag){
	if(string_obj.value.charAt(0) == '"'){
		if(flag != "noalert")
			alert('This string cannot start with ["]');
		
		string_obj.value = "";
		string_obj.focus();
		
		return false;
	}
	else{
		invalid_char = "";
		
		for(var i = 0; i < string_obj.value.length; ++i){
			if(string_obj.value.charAt(i) < ' ' || string_obj.value.charAt(i) > '~'){
				invalid_char = invalid_char+string_obj.value.charAt(i);
			}
		}
		
		if(invalid_char != ""){
			if(flag != "noalert")
				alert("This string cannot contain '"+invalid_char+"' !");
			string_obj.value = "";
			string_obj.focus();
			
			return false;
		}
	}
	
	return true;
}

function validate_hex(obj){
	var obj_value = obj.value
	var re = new RegExp("[^a-fA-F0-9]+","gi");
	
	if(re.test(obj_value))
		return false;
	else
		return true;
}

function validate_psk(psk_obj){
	var psk_length = psk_obj.value.length;
	
	if(psk_length < 8){
		alert("Pre-shared key should be 8 to 63 characters. If you leave this field blank, system will assign [00000000] as your passphrase.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length > 64){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = psk_obj.value.substring(0, 64);
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length >= 8 && psk_length <= 63 && !validate_string(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length == 64 && !validate_hex(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	return true;
}

function validate_wlkey(key_obj){
	var wep_type = document.form.wl_wep_x.value;
	var iscurrect = true;
	var str = "Please enter the correct WEP key.";
	
	if(wep_type == "0")
		iscurrect = true;	// do nothing
	else if(wep_type == "1"){
		if(key_obj.value.length == 5 && validate_string(key_obj))
			iscurrect = true;
		else if(key_obj.value.length == 10 && validate_hex(key_obj))
			iscurrect = true;
		else{
			str += "(5 ASCII digits or 10 hex digits)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj))
			iscurrect = true;
		else if(key_obj.value.length == 26 && validate_hex(key_obj))
			iscurrect = true;
		else{
			str += "(13 ASCII digits or 26 hex digits)";
			
			iscurrect = false;
		}
	}
	else{
		alert("System error!");
		iscurrect = false;
	}
	
	if(iscurrect == false){
		alert(str);
		
		key_obj.focus();
		key_obj.select();
	}
	
	return iscurrect;
}

function checkDuplicateName(newname, targetArray){
	var existing_string = targetArray.join(',');
	existing_string = ","+existing_string+",";
	var newstr = ","+trim(newname)+",";
	
	var re = new RegExp(newstr, "gi");
	var matchArray = existing_string.match(re);
	
	if(matchArray != null)
		return true;
	else
		return false;
}

function alert_error_msg(error_msg){
	alert(error_msg);
	refreshpage();
}

function refreshpage(seconds){
	if(typeof(seconds) == "number")
		setTimeout("refreshpage()", seconds*1000);
	else
		location.href = location.href;
}

function hideLinkTag(){
	if(document.all){
		var tagObjs = document.all.tags("a");
		
		for(var i = 0; i < tagObjs.length; ++i)
			tagObjs(i).outerHTML = tagObjs(i).outerHTML.replace(">"," hidefocus=true>");
	}
}

function buttonOver(o){	//Lockchou 1206 modified
	o.style.color = "#FFFFFF";
	o.style.background = "url(/images/bgaibutton.gif) #ACCCE1";
	o.style.cursor = "hand";
}

function buttonOut(o){	//Lockchou 1206 modified
	o.style.color = "#000000";
	o.style.background = "url(/images/bgaibutton0.gif) #ACCCE1";
}

function flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = function(){
				buttonOver(this);
			};
		
		btnObj[i].onmouseout = function(){
				buttonOut(this);
			};
	}
}

function no_flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = "";
		
		btnObj[i].onmouseout = "";
	}
}

function gotoprev(formObj){
	var prev_page = formObj.prev_page.value;
	
	if(prev_page == "/")
		prev_page = "/";
	
	if(prev_page.indexOf('QIS') < 0){
		formObj.action = prev_page;
		formObj.target = "_parent";
		formObj.submit();
	}
	else{
		formObj.action = prev_page;
		formObj.target = "";
		formObj.submit();
	}
}

function add_option(selectObj, str, value, selected){
	var tail = selectObj.options.length;
	
	if(typeof(str) != "undefined")
		selectObj.options[tail] = new Option(str);
	else
		selectObj.options[tail] = new Option();
	
	if(typeof(value) != "undefined")
		selectObj.options[tail].value = value;
	else
		selectObj.options[tail].value = "";
	
	if(selected == 1)
		selectObj.options[tail].selected = selected;
}

function free_options(selectObj){
	if(selectObj == null)
		return;
	
	for(var i = selectObj.options.length-1; i >= 0; --i){
		selectObj.options[i].value = null;
		selectObj.options[i] = null;
	}
}

function blocking(obj_id, show){
	var state = show?'block':'none';
	
	if(document.getElementById)
		$(obj_id).style.display = state;
	else if(document.layers)
		document.layers[obj_id].display = state;
	else if(document.all)
		document.all[obj_id].style.display = state;
}

function inputCtrl(obj, flag){
	if(flag == 0){
		obj.disabled = true;
		obj.style.backgroundColor = "#CCCCCC";		
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
	else{
		obj.disabled = false;
		obj.style.backgroundColor = "#FFF";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
}
=======
﻿var uptimeStr = "Thu, 01 Jan 1970 02:29:09 +0000(8955 secs since boot)";
var timezone = uptimeStr.substring(26,31);
var boottime = parseInt(uptimeStr.substring(32,38));
var newformat_systime = uptimeStr.substring(8,11) + " " + uptimeStr.substring(5,7) + " " + uptimeStr.substring(17,25) + " " + uptimeStr.substring(12,16);  //Ex format: Jun 23 10:33:31 2008
var systime_millsec = Date.parse(newformat_systime); // millsec from system
var JS_timeObj = new Date(); // 1970.1.1

var test_page = 0;
var testEventID = "";
var dr_surf_time_interval = 5;	// second
var show_hint_time_interval = 1;	// second

var wan_route_x = "";
var wan_nat_x = "";
var wan_proto = "";

// Dr. Surf {
// for detect if the status of the machine is changed. {
var manually_stop_wan = "";

// original status {
var old_ifWANConnect = 0;
var old_qos_ready = 1;
var old_wan_link_str = "";
var old_detect_dhcp_pppoe = "";
var old_wan_status_log = "";

var old_disk_status = "";
var old_mount_status = "";
var old_printer_sn = "";
var old_wireless_clients = "";
// original status }

// new status {
var new_ifWANConnect = 0;
var new_wan_link_str = "";
var new_detect_dhcp_pppoe = "";
var new_wan_status_log = "";

var new_disk_status = "";
var new_mount_status = "";
var new_printer_sn = "";
var new_wireless_clients = "";
// new status }

var id_of_check_changed_status = 0;

function unload_body(){
	disableCheckChangedStatus();
	no_flash_button();
	
	return true;
}

function enableCheckChangedStatus(flag){
	var seconds = this.dr_surf_time_interval*1000;
	
	disableCheckChangedStatus();
	
	if(old_wan_link_str == ""){
		seconds = 1;
		id_of_check_changed_status = setTimeout("get_changed_status('initial');", seconds);
	}
	else
		id_of_check_changed_status = setTimeout("get_changed_status();", seconds);
}

function disableCheckChangedStatus(){
	clearTimeout(id_of_check_changed_status);
	id_of_check_changed_status = 0;
}

function check_if_support_dr_surf(){
	if($("helpname"))
		return 1;
	else
		return 0;
}

function compareWirelessClient(target1, target2){
	if(target1.length != target2.length)
		return (target2.length-target1.length);
	
	for(var i = 0; i < target1.length; ++i)
		for(var j = 0; j < 3; ++j)
			if(target1[i][j] != target2[i][j])
					return 1;
	
	return 0;
}

var current_connect_status = -1;

function set_connect_status(connect_status){
	current_connect_status = connect_status;
}

function get_connect_status(){
	return current_connect_status;
}

function check_changed_status(flag){
	if(this.test_page == 1
			|| wan_route_x == "IP_Bridged")
		return;
	
	if(flag == "initial"){
		// for the middle of index.html.
		if(location.pathname == "/" || location.pathname == "/index.html"){
			if(old_ifWANConnect == 1 && old_wan_link_str == "Connected"){
				showMapWANStatus(1);
				set_connect_status(1);
			}
			else{
				showMapWANStatus(0);
				set_connect_status(0);
			}
		}
		
		// Dr. Surf
		if(old_ifWANConnect == 0) // WAN port is not plugged.
			parent.showDrSurf("1");
		else if(old_qos_ready == 0)
			parent.showDrSurf("40");
		else if(old_wan_link_str == "Disconnected"){
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
					parent.showDrSurf("2_1");
				else if(old_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("5");
			}
			// dhcp, static
			else
				parent.showDrSurf("5");
		}
		else
			parent.showDrSurf("0_0"); // connect is ok.
		
		enableCheckChangedStatus();
		
		return;
	}
	
	// for the middle of index.html.
	if(location.pathname == "/" || location.pathname == "/index.html"){
		if(new_ifWANConnect == 1 && new_wan_link_str == "Connected"){
			showMapWANStatus(1);
			set_connect_status(1);
		}
		else{
			showMapWANStatus(0);
			set_connect_status(0);
		}
	}
	
	// Dr.Surf.
	var diff_number = compareWirelessClient(old_wireless_clients, new_wireless_clients);
	
	if(diff_number != 0){
		old_wireless_clients = new_wireless_clients;
		
		//parent.showDrSurf("10");
		if(diff_number > 0)
			parent.showDrSurf("11");
		else
			parent.showDrSurf("12");
	}
	else if(old_disk_status != new_disk_status){
		old_disk_status = new_disk_status;
		
		parent.showDrSurf("20");
	}
	else if(parseInt(old_mount_status) < parseInt(new_mount_status)){
		old_mount_status = new_mount_status;
		
		parent.showDrSurf("21");
	}
	else if(old_printer_sn != new_printer_sn){
		old_printer_sn = new_printer_sn;
		
		parent.showDrSurf("30");
	}
	else if(old_ifWANConnect != new_ifWANConnect){ // if WAN port is plugged.
		old_ifWANConnect = new_ifWANConnect;
		
		if(new_ifWANConnect == 1)
			parent.showDrSurf("0_2");	// not plugged -> plugged
		else
			parent.showDrSurf("1");	// plugged -> not plugged
	}
	else if(old_wan_link_str != new_wan_link_str){
		old_wan_link_str = new_wan_link_str;
		
		if(new_wan_link_str == "Disconnected"){
			old_detect_dhcp_pppoe = new_detect_dhcp_pppoe;
			
			// PPPoE, PPTP, L2TP
			if(wan_proto != "dhcp" && wan_proto != "static"){
				if(old_wan_status_log != new_wan_status_log){ // PPP serial change!
					old_wan_status_log = new_wan_status_log;
					
					if(new_wan_status_log.length > 0){
						if(new_wan_status_log.indexOf("Failed to authenticate ourselves to peer") >= 0)
							parent.showDrSurf("2_1");
						else
							parent.showDrSurf("2_2");
					}
					else if(new_detect_dhcp_pppoe == "no-respond")
						parent.showDrSurf("2_2");
					else
						parent.showDrSurf("5");
				}
				else if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else
					parent.showDrSurf("3");
			}
			// dhcp, static
			else{
				if(new_detect_dhcp_pppoe == "no-respond")
					parent.showDrSurf("2_2");
				else if(new_detect_dhcp_pppoe == "error")
					parent.showDrSurf("3");
				else
					parent.showDrSurf("5");
			}
		}
		else
			parent.showDrSurf("0_1");
	}
	
	enableCheckChangedStatus();
}

function get_changed_status(flag){
	document.titleForm.action = "/result_of_get_changed_status.html";
	
	if(flag == "initial")
		document.titleForm.flag.value = flag;
	else
		document.titleForm.flag.value = "";
	
//	document.titleForm.submit();
}

function initial_change_status(manually_stop_wan,
															 ifWANConnect,
														   wan_link_str,
														   detect_dhcp_pppoe,
														   wan_status_log,
														   disk_status,
														   mount_status,
														   printer_sn,
														   wireless_clients,
														   qos_ready
														   ){
	this.manually_stop_wan = manually_stop_wan;
	this.old_ifWANConnect = ifWANConnect;
	this.old_wan_link_str = wan_link_str;
	this.old_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.old_wan_status_log = wan_status_log;
	this.old_disk_status = disk_status;
	this.old_mount_status = mount_status;
	this.old_printer_sn = printer_sn;
	this.old_wireless_clients = wireless_clients;
	this.old_qos_ready = qos_ready;
}

function set_changed_status(manually_stop_wan,
														ifWANConnect,
														wan_link_str,
														detect_dhcp_pppoe,
														wan_status_log,
														disk_status,
														mount_status,
														printer_sn,
														wireless_clients
														){
	this.manually_stop_wan = manually_stop_wan;
	this.new_ifWANConnect = ifWANConnect;
	this.new_wan_link_str = wan_link_str;
	this.new_detect_dhcp_pppoe = detect_dhcp_pppoe;
	this.new_new_wan_status_log = wan_status_log;
	this.new_disk_status = disk_status;
	this.new_mount_status = mount_status;
	this.new_printer_sn = printer_sn;
	this.new_wireless_clients = wireless_clients;
}
// for detect if the status of the machine is changed. }

function set_Dr_work(flag){
	if(flag != "help"){
		$("Dr_body").onclick = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf();
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf();
			};
	}
	else{
		$("Dr_body").onclick = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseover = function(){
				showDrSurf(null, "help");
			};
		
		$("Dr_body").onmouseout = function(){
				showDrSurf(null, "help");
			};
	}
}

var slowHide_ID_start = 0;
var slowHide_ID_mid = 0;

function clearHintTimeout(){
	if(slowHide_ID_start != 0){
		clearTimeout(slowHide_ID_start);
		slowHide_ID_start = 0;
	}
	
	if(slowHide_ID_mid != 0){
		clearTimeout(slowHide_ID_mid);
		slowHide_ID_mid = 0;
	}
}

function showHelpofDrSurf(hint_array_id, hint_show_id){
	var seconds = this.show_hint_time_interval*1000;
	
	if(!$("eventDescription")){
		setTimeout('showHelpofDrSurf('+hint_array_id+', '+hint_show_id+');', 100);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(typeof(hint_show_id) == "number" && hint_show_id > 0)
		clicked_help_string = "<span>"+helptitle[hint_array_id][hint_show_id][0]+"</span><br>"+helpcontent[hint_array_id][hint_show_id];
	$("eventDescription").innerHTML = clicked_help_string;
	
	set_Dr_work("help");
	$("eventLink").onclick = function(){};
	showtext($("linkDescription"), "");
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

var current_eventID = null;
var now_alert = new Array(3);

var alert_event0_0 = new Array("Connection is established.", "", "");
var alert_event0_1 = new Array("Connection is reestablished.", "Refresh page", refreshpage);
var alert_event0_2 = new Array("Cable in WAN port is plugged.", "Refresh page", refreshpage);
var alert_event1 = new Array("The cable for Ethernet is not plugged in.", "Refer to the diagnosis.", drdiagnose);
var alert_event2_1 = new Array("Your PPPoE or PPTP authentification failed.", "Refer to the diagnosis.", drdiagnose);
var alert_event2_2 = new Array("No response from the remote server.", "Refer to the diagnosis.", drdiagnose);
var alert_event3 = new Array("Your ISP's DHCP does not function properly.", "Refer to the diagnosis.", drdiagnose);
var alert_event4 = new Array("The Internet connection failed. Your router's IP address is the same as that of the gateway IP address.", "Refer to the diagnosis.", drdiagnose);  //wan_gateway & lan_ipaddr;
var alert_event5 = new Array("1. You have probably stopped the WAN connection manually.<br>2. You have set the wrong dynamic or static IP address for your RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event6 = new Array("RT-N16's subnet ID and the subnet ID in WAN are the same.", "Refer to the diagnosis.", drdiagnose);  //wan_gateway & lan_ipaddr;

var alert_event10 = new Array("Some wireless clients is connected to or disconnected from the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event11 = new Array("Some wireless clients were connected to the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event12 = new Array("Some wireless clients were disconnected from the RT-N16.", "Refer to the diagnosis.", drdiagnose);
var alert_event20 = new Array("The USB disk status in RT-N16 has changed.", "Refer to the diagnosis.", drdiagnose);
var alert_event21 = new Array("The disk in RT-N16 is mounted and can be accessed.", "Refer to the diagnosis.", drdiagnose);
var alert_event30 = new Array("The status of USB printer status in RT-N16 has changed.", "Refer to the diagnosis.", drdiagnose);
var alert_event40 = new Array("Bandwidth Management is work, but the system can't detect the uplink speed. Please manually set the uplink speed.", "Refer to the diagnosis.", drdiagnose);

function showDrSurf(eventID, flag){
	var seconds = this.show_hint_time_interval*1000;
	var temp_eventID;
	
	// for test
	if(this.testEventID != "")
		eventID = this.testEventID;
	
	if(eventID){
		this.current_eventID = eventID;
		temp_eventID = eventID;
	}
	else
		temp_eventID = this.current_eventID;
	
	if(!temp_eventID || temp_eventID.length <= 0){
		id_of_check_changed_status = setTimeout("enableCheckChangedStatus();", 1000);
		return;
	}
	
	disableCheckChangedStatus();
	clearHintTimeout();
	
	if(flag != "help"){
		now_alert[0] = eval("alert_event"+temp_eventID+"[0]");
		if(temp_eventID != "5")
			showtext($("eventDescription"), now_alert[0]);
		else if(this.manually_stop_wan == "1")
			showtext($("eventDescription"), "You have probably stopped the WAN connection manually.");
		else
			showtext($("eventDescription"), "You have set the wrong dynamic or static IP address for your RT-N16.");
		
		now_alert[1] = eval("alert_event"+temp_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+temp_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](temp_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.filter = "alpha(opacity=100)";
	$("drsword").style.opacity = 1;	
	$("drsword").style.visibility = "visible";
	
	$("wordarrow").style.filter	= "alpha(opacity=100)";
	$("wordarrow").style.opacity = 1;	
	$("wordarrow").style.visibility = "visible";
	
	slowHide_ID_start = setTimeout("slowHide(100);", seconds);
}

function slowHide(filter){
	clearHintTimeout();
	
	$("drsword").style.filter = "alpha(opacity="+filter+")";
	$("drsword").style.opacity = filter*0.01;
	$("wordarrow").style.filter	= "alpha(opacity="+filter+")";
	$("wordarrow").style.opacity = filter*0.01;
	
	filter -= 5;
	if(filter <= 0){
		hideHint();
		
		enableCheckChangedStatus();
	}
	else
		slowHide_ID_mid = setTimeout("slowHide("+filter+");", 100);
}

function hideHint(){
	if(this.current_eventID){
		now_alert[0] = eval("alert_event"+this.current_eventID+"[0]");
		showtext($("eventDescription"), now_alert[0]);
		
		now_alert[1] = eval("alert_event"+this.current_eventID+"[1]");
		if(now_alert[1] != ""){
			now_alert[2] = eval("alert_event"+this.current_eventID+"[2]");
			
			$("eventLink").onclick = function(){
					now_alert[2](current_eventID);
				};
			
			showtext($("linkDescription"), now_alert[1]);
		}
	}
	
	$("drsword").style.visibility = "hidden";
	$("wordarrow").style.visibility = "hidden";
}

function drdiagnose(eventID){
	if(!check_if_support_dr_surf()){
		alert("Don't yet support Dr. Surf!");
		return;
	}
	
	if($('statusIcon'))
		$('statusIcon').src = "/images/iframe-iconDr.gif";
	
	if(typeof(openHint) == "function")
		openHint(0, 0);
	
	showtext($('helpname'), "Dr.Surf's diagnosis");
	
	if($("hint_body"))
		$("hint_body").style.display = "none";
	
	$("statusframe").style.display = "block";
	$('statusframe').src = "/device-map/diagnose"+eventID+".html";
}
// Dr. Surf }

var banner_code, menu_code="", menu1_code="", menu2_code="", tab_code="", footer_code;

function show_banner(L3){// L3 = The third Level of Menu
	var banner_code = "";
	
	// for chang language
	banner_code +='<form method="post" name="titleForm" id="titleForm" action="" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="current_page" value="">\n';
	banner_code +='<input type="hidden" name="sid_list" value="LANGUAGE;">\n';
	banner_code +='<input type="hidden" name="action_mode" value=" Apply ">\n';
	banner_code +='<input type="hidden" name="preferred_lang" value="">\n';
	banner_code +='<input type="hidden" name="flag" value="">\n';
	banner_code +='</form>\n';
	
	banner_code +='<div class="banner1" align="center"></div>\n';
	banner_code +='<table width="983" border="0" align="center" cellpadding="0" cellspacing="0">\n';
	banner_code +='<tr>\n';
	banner_code +='<td class="top-logo"><a href="/"><div id="modelName">RT-N16</div></a></td>\n';
	
	banner_code +='<td class="top-message">\n';
	banner_code +='<span class="top-messagebold">Time: </span><span class="time" id="systemtime"></span><br>\n';
	banner_code +='<span class="top-messagebold">SSID: </span><input class="top_ssid" type="text" value="" id="elliptic_ssid" readonly=readonly><br>\n';
	banner_code +='<span class="top-messagebold">Firmware Version:: </span><a href="/Advanced_FirmwareUpgrade_Content.html"><span id="firmver" class="time"></span></a>\n';
	banner_code +='</td>\n';
	
	banner_code +='<td class="top-message"width="150">\n';
	banner_code +='<span class="top-messagebold">Language:</span><br>\n';
	
	banner_code +='<select name="select_lang" id="select_lang" class="top-input" onchange="change_language();">\n';
	banner_code +='<option value="EN" selected>English</option>\n<option value="TW">繁體中文</option>\n<option value="CN">简体中文</option>\n<option value="KR">한국어</option>\n<option value="CZ">Česky</option>\n<option value="PL">Polski</option>\n<option value="RU">Pусский</option>\n<option value="DE">Deutsch</option>\n<option value="FR">Français</option>\n';
	banner_code +='</select>\n';
	banner_code +='<input type="button" id="change_lang_btn" class="button" value="Ok" onclick="submit_language();" style="float:right; margin:5px 10px 0 0;" disabled=disabled>\n';
	
	banner_code +='</td>\n';
	banner_code +='<td class="top-message" width="120">\n';
	banner_code +='<div id="logout_btn" class="buttonquit"><a href="javascript:;" onclick="logout();">Logout</a></div>\n';
	banner_code +='<div id="reboto_btn" class="buttonquit"><a href="javascript:;" onclick="reboot();">Reboot</a></div>\n';
	banner_code +='</td>\n';
	
// Dr. Surf {
	banner_code += '<td id="Dr_body" class="top-message" width="40">\n';
	
	banner_code += '<div id="dr" class="dr"></div>\n';
	banner_code += '<div id="drsword" class="drsword">\n';
	banner_code += '<span id="eventDescription"></span>\n';
	banner_code += '<br>\n';
	banner_code += '<a id="eventLink" href="javascript:void(0);"><span id="linkDescription"></span></a>\n';
	banner_code += '</div>\n';
	banner_code += '<div id="wordarrow" class="wordarrow"><img src="/images/wordarrow.png"></div>\n';
	
	banner_code += '&nbsp;</td>\n';
// Dr. Surf }
	
	banner_code +='<td width="11"><img src="images/top-03.gif" width="11" height="78" /></td>\n';
	banner_code +='</td></tr></table>\n';
	
	if(L3 == 0) 		// IF Without Level 3 menu, banner style will use top.gif.
		banner_code +='<div id="banner3" align="center"><img src="images/top.gif" width="983" height="19" /></div>\n';
	else
		banner_code +='<div id="banner3" align="center"><img src="images/top-advance.gif" width="983" height="19" /></div>\n';

	$("TopBanner").innerHTML = banner_code;
	
	show_loading_obj();
	
	if(location.pathname == "/" || location.pathname == "/index.html"){
		if(wan_route_x != "IP_Bridged")
			id_of_check_changed_status = setTimeout('hideLoading();', 3000);
	}
	else{
		id_of_check_changed_status = setTimeout('hideLoading();', 1);
	}
	
	show_time();
	show_top_status();
	set_Dr_work();
}

//Level 3 Menu in Gateway mode
var tabtitle = new Array(7);   // Use a 2-dimension Array to arrange tab title
tabtitle[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle[1] = new Array("", "LAN IP", "DHCP Server", "Route");
tabtitle[2] = new Array("", "Internet Connection", "QoS", "Port Trigger", "Virtual Server", "DMZ", "DDNS");
tabtitle[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle[4] = new Array("", "General", "URL Filter", "MAC Filter", "LAN to WAN Filter");
tabtitle[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle[6] = new Array("", "General Log", "DHCP Leases", "Wireless Log", "Port Forwarding", "Routing Table");
var tablink = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink[1] = new Array("", "Advanced_LAN_Content.html", "Advanced_DHCP_Content.html", "Advanced_GWStaticRoute_Content.html");
tablink[2] = new Array("", "Advanced_WAN_Content.html", "Advanced_QOSUserSpec_Content.html", "Advanced_PortTrigger_Content.html", "Advanced_VirtualServer_Content.html", "Advanced_Exposed_Content.html", "Advanced_ASUSDDNS_Content.html");
tablink[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink[4] = new Array("", "Advanced_BasicFirewall_Content.html", "Advanced_URLFilter_Content.html", "Advanced_MACFilter_Content.html", "Advanced_Firewall_Content.html");
tablink[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink[6] = new Array("", "Main_LogStatus_Content.html", "Main_DHCPStatus_Content.html", "Main_WStatus_Content.html", "Main_IPTStatus_Content.html", "Main_RouteStatus_Content.html");

//Level 3 Tab Menu in Router mode
var tabtitle_Router = new Array(7);   // Use a 2-dimension Array to arrange tab title
tabtitle_Router[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle_Router[1] = new Array("", "LAN IP", "DHCP Server", "Route");
tabtitle_Router[2] = new Array("", "Internet Connection", "QoS", "", "", "", "DDNS");
tabtitle_Router[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle_Router[4] = new Array("", "General", "URL Filter", "MAC Filter", "LAN to WAN Filter");
tabtitle_Router[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle_Router[6] = new Array("", "General Log", "DHCP Leases", "Wireless Log", "Port Forwarding", "Routing Table");
var tablink_Router = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink_Router[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink_Router[1] = new Array("", "Advanced_LAN_Content.html", "Advanced_DHCP_Content.html", "Advanced_GWStaticRoute_Content.html");
tablink_Router[2] = new Array("", "Advanced_WAN_Content.html", "Advanced_QOSUserSpec_Content.html", "", "", "", "Advanced_ASUSDDNS_Content.html");
tablink_Router[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink_Router[4] = new Array("", "Advanced_BasicFirewall_Content.html", "Advanced_URLFilter_Content.html", "Advanced_MACFilter_Content.html", "Advanced_Firewall_Content.html");
tablink_Router[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink_Router[6] = new Array("", "Main_LogStatus_Content.html", "Main_DHCPStatus_Content.html", "Main_WStatus_Content.html", "Main_IPTStatus_Content.html", "Main_RouteStatus_Content.html");

//Level 3 Tab Menu in AP mode
var tabtitle_AP = new Array(7);
tabtitle_AP[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");  //[x][0]為保留欄位
tabtitle_AP[1] = new Array("", "LAN IP");
tabtitle_AP[2] = new Array("");
tabtitle_AP[3] = new Array("", "Network Neighborhood Share", "FTP Share", "Miscellaneous setting");
tabtitle_AP[4] = new Array("");
tabtitle_AP[5] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting");
tabtitle_AP[6] = new Array("", "", "", "Wireless Log", "", "");
var tablink_AP = new Array(7);   // Use a 2-dimension Array to arrange tab link
tablink_AP[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink_AP[1] = new Array("", "Advanced_APLAN_Content.html");
tablink_AP[2] = new Array("", "");
tablink_AP[3] = new Array("", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink_AP[4] = new Array("", "");
tablink_AP[5] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html");
tablink_AP[6] = new Array("", "", "", "Main_WStatus_Content.html", "", "");

//Level 1 Menu in Gateway, Router mode
menuL1_title = new Array("", "Network Map", "UPnP Media Server", "AiDisk", "EzQoS<br/> Bandwidth<br/> Management", "<br/> Advanced Setting");
menuL1_link = new Array("", "index.html","upnp.html", "aidisk.html", "EZQoS.html", "as.html");

//Level 1 Menu in AP mode
menuL1_title_AP = new Array("", "Network Map", "", "AiDisk", "", "<br/> Advanced Setting");
menuL1_link_AP = new Array("", "index.html", "", "aidisk.html", "", "as.html");

//Level 2 Menu in Gateway, Router mode, default link is 1st option in tab
menuL2_title = new Array("", "Wireless", "LAN", "WAN", "USB Application", "Firewall", "Administration", "System Log");
menuL2_link = new Array("", tablink[0][1], tablink[1][1], tablink[2][1], tablink[3][1], tablink[4][1], tablink[5][1], tablink[6][1]);	//指定第二層選單的預設連結為各類別的第一個選項

//Level 2 Menu in AP mode, default link is 1st option in tab
menuL2_title_AP = new Array("", "Wireless", "LAN", "", "USB Application", "", "Administration", "System Log");
menuL2_link_AP = new Array("", tablink_AP[0][1], tablink_AP[1][1], tablink_AP[2][1], tablink_AP[3][1], tablink_AP[4][1], tablink_AP[5][1], tablink_AP[6][3]);

function show_menu(L1, L2, L3){
	if(wan_route_x == "IP_Routed" && wan_nat_x == "0"){
		tabtitle = tabtitle_Router;
		tablink = tablink_Router;
	}
	else if(wan_route_x == "IP_Bridged"){
		tabtitle = tabtitle_AP;
		tablink = tablink_AP;
		menuL1_title = menuL1_title_AP;
		menuL1_link = menuL1_link_AP;
		menuL2_title = menuL2_title_AP;
		menuL2_link = menuL2_link_AP;
	}
	
	for(i = 1; i <= menuL1_title.length-1; i++){
		if(menuL1_title[i] == "")
			continue;
		else if(L1 == i && L2 <= 0)
		  menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+menuL1_title[i]+'</div>\n';
		else
		  menu1_code += '<div class="menu" id="option'+i+'"><a href="'+menuL1_link[i]+'" title="'+menuL1_link[i]+'">'+menuL1_title[i]+'</a></div>\n';	
	}
	
	$("mainMenu").innerHTML = menu1_code;
	
	if(L2 != -1){	// 先以Ｌ２判斷該頁是否為有子選單， －１表示沒有子選單，０表示有子選單但沒有任何被選擇的選項。 １~７依序為第二層選項
		for(var i = 1; i <= menuL2_title.length-1; ++i){
			if(menuL2_title[i] == "")
				continue;
			else if(L2 == i)	// 指定被選擇選項的Class style
				menu2_code += '<div class="thissubmenu">'+menuL2_title[i]+'</div>\n';
			else	// 指定非被選擇選項的Class style，以及連結的網址
				menu2_code += '<div class="submenu"><a href="'+menuL2_link[i]+'">'+menuL2_title[i]+'</a></div>\n';
		}
	}
	menu2_code += '<div><img src="images/m-button-07end.gif" width="187" height="47" /></div>\n';	//裝飾線
	
	$("subMenu").innerHTML = menu2_code;
	
	if(L3){
		tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
		for(var i = 1; i < tabtitle[L2-1].length; ++i){
			if(tabtitle[L2-1][i] == "")
				continue;
			else if(L3 == i)
				tab_code += '<td class=\"b1\">'+ tabtitle[L2-1][i] +'</td>\n';
			else
				tab_code += '<td class=\"b2\"><a href="' +tablink[L2-1][i]+ '">'+ tabtitle[L2-1][i] +'</a></td>\n';
		}
		tab_code += '</tr></table>\n';
		
		$("tabMenu").innerHTML = tab_code;
	}
	else
		$("tabMenu").innerHTML = "";//*/
}

function show_footer(){
	footer_code = '<div align="center" class="bottom-image"></div>\n';
	footer_code +='<div align="center" class="copyright">2009 ASUSTek Computer Inc. All rights reserved.</div>\n';
	
	$("footer").innerHTML = footer_code;
	
	if($("helpname"))
		showtext($("helpname"), "Help");
	if($("hint_body"))
		showtext($("hint_body"), "Help provides you with guidelines and information about using the router's functions.  Click the <a class=\"hintstyle\" style=\"background-color:#7aa3bd\">hyperlinked words with yellow and blue underline.</a> to get help.");
	flash_button();
}

function show_top_status(){
	// show SSID in the top-middle block
	var ssid_value = decodeURIComponent(document.form.ssid_acsii.value);
	
	if(ssid_value.length > 21){
		ssid_value = ssid_value.substring(0,20) + "...";
		$("elliptic_ssid").title = decodeURIComponent(document.form.ssid_acsii.value);
	}	
	
	$("elliptic_ssid").value = ssid_value;
	showtext($("firmver"), document.form.firmver.value);
}

function show_time(){
	JS_timeObj.setTime(systime_millsec); // Add millsec to it.
	JS_timeObj3 = JS_timeObj.toString();
	JS_timeObj3 = checkTime(JS_timeObj.getHours()) + ":" +
				  			checkTime(JS_timeObj.getMinutes()) + ":" +
				  			checkTime(JS_timeObj.getSeconds());
	$('systemtime').innerHTML ="<a href='/Advanced_System_Content.html'>" + JS_timeObj3 + "</a>";
	systime_millsec += 1000;
	
	stime_ID = setTimeout("show_time();", 1000);
}

function checkTime(i){
	if(i < 10)
		i = "0"+i;
	
  return i;
}

function show_loading_obj(){
	var obj = $("Loading");
	var code = "";
	
	code +='<table cellpadding="5" cellspacing="0" id="loadingBlock" class="loadingBlock" align="center">\n';
	code +='<tr>\n';
	code +='<td width="20%" height="80" align="center"><img src="/images/loading.gif"></td>\n';
	code +='<td><span id="proceeding_main_txt">Please wait, </span><span id="proceeding_txt" style="color:#FFFFCC;"></span></td>\n';
	code +='</tr>\n';
	code +='</table>\n';
	code +='<!--[if lte IE 6.5]><iframe class="hackiframe"></iframe><![endif]-->\n';
	
	obj.innerHTML = code;
}

var nav;

if(navigator.appName == 'Netscape')
	nav = true;
else{
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}

function MicrosoftEventHandler_KeyDown(){
	return true;
}

function submit_language(){
	if($("select_lang").value != $("preferred_lang").value)
		alert("This function is unavailable!");
	
	else
		alert("No change LANGUAGE!");
}

function change_language(){
	if($("select_lang").value != $("preferred_lang").value)
		$("change_lang_btn").disabled = false;
	else
		$("change_lang_btn").disabled = true;
}

function logout(){
	alert("This function is unavailable!");
}

function reboot(){
	alert("This function is unavailable!");
}

function kb_to_gb(kilobytes){
	if(typeof(kilobytes) == "string" && kilobytes.length == 0)
		return 0;
	
	return (kilobytes*1024)/(1024*1024*1024);
}

function simpleNum(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(kb_to_gb(num)*1000)/1000;
}

function simpleNum2(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num*1000)/1000;
}

function simpleNum3(num){
	if(typeof(num) == "string" && num.length == 0)
		return 0;
	
	return parseInt(num)/1024;
}

function $(){
	var elements = new Array();
	
	for(var i = 0; i < arguments.length; ++i){
		var element = arguments[i];
	if(typeof element == 'string')
		element = document.getElementById(element);
		
		if(arguments.length == 1)
			return element;
		
		elements.push(element);
	}
	
	return elements;
}

function getElementsByName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		objsName = tagObjs[i].getAttribute("name");
		
		if(objsName && objsName.indexOf(name) == 0){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function getElementsByClassName_iefix(tag, name){
	var tagObjs = document.getElementsByTagName(tag);
	var objsName;
	var targetObjs = new Array();
	var targetObjs_length;
	
	if(!(typeof(name) == "string" && name.length > 0))
		return [];
	
	for(var i = 0, targetObjs_length = 0; i < tagObjs.length; ++i){
		if(navigator.appName == 'Netscape')
			objsName = tagObjs[i].getAttribute("class");
		else
			objsName = tagObjs[i].getAttribute("className");
		
		if(objsName == name){
			targetObjs[targetObjs_length] = tagObjs[i];
			++targetObjs_length;
		}
	}
	
	return targetObjs;
}

function showtext(obj, str){
	/*if(!obj)
		return ;
	
	if(obj.hasChildNodes() && obj.lastChild.nodeName == "#text")
		obj.lastChild.nodeValue = str;
	else
		obj.appendChild(document.createTextNode(str));//*/
	if(obj)
		obj.innerHTML = str;//*/
}

function showhtmlspace(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf(" ")) >= 0){
		str += head.substring(0, tail_num);
		str += "&nbsp;";
		
		head = head.substr(tail_num+1, head.length-(tail_num+1));
	}
	str += head;
	
	return str;
}

// A dummy function which just returns its argument. This was needed for localization purpose
function translate(str){
	return str;
}

function trim(val){
	val = val+'';
	for (var startIndex=0;startIndex<val.length && val.substring(startIndex,startIndex+1) == ' ';startIndex++);
	for (var endIndex=val.length-1; endIndex>startIndex && val.substring(endIndex,endIndex+1) == ' ';endIndex--);
	return val.substring(startIndex,endIndex+1);
}

function IEKey(){
	return event.keyCode;
}

function NSKey(){
	return 0;
}

function is_string(o){
	if(!nav)
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0)
		return true;
	else if(keyPressed >= 0 && keyPressed <= 126)
		return true;
	
	alert('Invalid character!');
	return false;
}

function validate_string(string_obj, flag){
	if(string_obj.value.charAt(0) == '"'){
		if(flag != "noalert")
			alert('This string cannot start with ["]');
		
		string_obj.value = "";
		string_obj.focus();
		
		return false;
	}
	else{
		invalid_char = "";
		
		for(var i = 0; i < string_obj.value.length; ++i){
			if(string_obj.value.charAt(i) < ' ' || string_obj.value.charAt(i) > '~'){
				invalid_char = invalid_char+string_obj.value.charAt(i);
			}
		}
		
		if(invalid_char != ""){
			if(flag != "noalert")
				alert("This string cannot contain '"+invalid_char+"' !");
			string_obj.value = "";
			string_obj.focus();
			
			return false;
		}
	}
	
	return true;
}

function validate_hex(obj){
	var obj_value = obj.value
	var re = new RegExp("[^a-fA-F0-9]+","gi");
	
	if(re.test(obj_value))
		return false;
	else
		return true;
}

function validate_psk(psk_obj){
	var psk_length = psk_obj.value.length;
	
	if(psk_length < 8){
		alert("Pre-shared key should be 8 to 63 characters. If you leave this field blank, system will assign [00000000] as your passphrase.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length > 64){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = psk_obj.value.substring(0, 64);
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length >= 8 && psk_length <= 63 && !validate_string(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length == 64 && !validate_hex(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	return true;
}

function validate_wlkey(key_obj){
	var wep_type = document.form.wl_wep_x.value;
	var iscurrect = true;
	var str = "Please enter the correct WEP key.";
	
	if(wep_type == "0")
		iscurrect = true;	// do nothing
	else if(wep_type == "1"){
		if(key_obj.value.length == 5 && validate_string(key_obj))
			iscurrect = true;
		else if(key_obj.value.length == 10 && validate_hex(key_obj))
			iscurrect = true;
		else{
			str += "(5 ASCII digits or 10 hex digits)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj))
			iscurrect = true;
		else if(key_obj.value.length == 26 && validate_hex(key_obj))
			iscurrect = true;
		else{
			str += "(13 ASCII digits or 26 hex digits)";
			
			iscurrect = false;
		}
	}
	else{
		alert("System error!");
		iscurrect = false;
	}
	
	if(iscurrect == false){
		alert(str);
		
		key_obj.focus();
		key_obj.select();
	}
	
	return iscurrect;
}

function checkDuplicateName(newname, targetArray){
	var existing_string = targetArray.join(',');
	existing_string = ","+existing_string+",";
	var newstr = ","+trim(newname)+",";
	
	var re = new RegExp(newstr, "gi");
	var matchArray = existing_string.match(re);
	
	if(matchArray != null)
		return true;
	else
		return false;
}

function alert_error_msg(error_msg){
	alert(error_msg);
	refreshpage();
}

function refreshpage(seconds){
	if(typeof(seconds) == "number")
		setTimeout("refreshpage()", seconds*1000);
	else
		location.href = location.href;
}

function hideLinkTag(){
	if(document.all){
		var tagObjs = document.all.tags("a");
		
		for(var i = 0; i < tagObjs.length; ++i)
			tagObjs(i).outerHTML = tagObjs(i).outerHTML.replace(">"," hidefocus=true>");
	}
}

function buttonOver(o){	//Lockchou 1206 modified
	o.style.color = "#FFFFFF";
	o.style.background = "url(/images/bgaibutton.gif) #ACCCE1";
	o.style.cursor = "hand";
}

function buttonOut(o){	//Lockchou 1206 modified
	o.style.color = "#000000";
	o.style.background = "url(/images/bgaibutton0.gif) #ACCCE1";
}

function flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = function(){
				buttonOver(this);
			};
		
		btnObj[i].onmouseout = function(){
				buttonOut(this);
			};
	}
}

function no_flash_button(){
	if(navigator.appName.indexOf("Microsoft") < 0)
		return;
	
	var btnObj = getElementsByClassName_iefix("input", "button");
	
	for(var i = 0; i < btnObj.length; ++i){
		btnObj[i].onmouseover = "";
		
		btnObj[i].onmouseout = "";
	}
}

function gotoprev(formObj){
	var prev_page = formObj.prev_page.value;
	
	if(prev_page == "/")
		prev_page = "/";
	
	if(prev_page.indexOf('QIS') < 0){
		formObj.action = prev_page;
		formObj.target = "_parent";
		formObj.submit();
	}
	else{
		formObj.action = prev_page;
		formObj.target = "";
		formObj.submit();
	}
}

function add_option(selectObj, str, value, selected){
	var tail = selectObj.options.length;
	
	if(typeof(str) != "undefined")
		selectObj.options[tail] = new Option(str);
	else
		selectObj.options[tail] = new Option();
	
	if(typeof(value) != "undefined")
		selectObj.options[tail].value = value;
	else
		selectObj.options[tail].value = "";
	
	if(selected == 1)
		selectObj.options[tail].selected = selected;
}

function free_options(selectObj){
	if(selectObj == null)
		return;
	
	for(var i = selectObj.options.length-1; i >= 0; --i){
		selectObj.options[i].value = null;
		selectObj.options[i] = null;
	}
}

function blocking(obj_id, show){
	var state = show?'block':'none';
	
	if(document.getElementById)
		$(obj_id).style.display = state;
	else if(document.layers)
		document.layers[obj_id].display = state;
	else if(document.all)
		document.all[obj_id].style.display = state;
}

function inputCtrl(obj, flag){
	if(flag == 0){
		obj.disabled = true;
		obj.style.backgroundColor = "#CCCCCC";		
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
	else{
		obj.disabled = false;
		obj.style.backgroundColor = "#FFF";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#C0DAE4";
	}
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
