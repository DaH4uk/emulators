//For operation mode;
var sw_mode = '1';
if(sw_mode == 3 && '0' == 1)
	sw_mode = 4;
var productid = 'RT-AC66U';
var based_modelid = 'RT-AC66U';
var hw_ver = '';
var uptimeStr = "Sat, 15 Jun 2013 01:30:57 +0800(1924 secs since boot)";
var timezone = uptimeStr.substring(26,31);
var boottime = parseInt(uptimeStr.substring(32,42));
var newformat_systime = uptimeStr.substring(8,11) + " " + uptimeStr.substring(5,7) + " " + uptimeStr.substring(17,25) + " " + uptimeStr.substring(12,16);  //Ex format: Jun 23 10:33:31 2008
var systime_millsec = Date.parse(newformat_systime); // millsec from system
var JS_timeObj = new Date(); // 1970.1.1
var wan_route_x = "";
var wan_nat_x = "";
var wan_proto = "";
var test_page = 0;
var testEventID = "";
var httpd_dir = "/cifs1"
var isFromWAN = false;
if((location.hostname.search('192.168.1.1') == -1) && (location.hostname.search('router.asus') == -1)){
	isFromWAN = true;
}

// parsing rc_support
var rc_support = "mssid 2.4G 5G update usbX2 switchctrl manual_stb pwrctrl WIFI_LOGO nandflash ipv6 PARENTAL2 pptpd printer modem wimax HTTPS webdav cloudsync appbase media diskutility psta wl6 wifi_tog_btn";
var wl_vifnames = "wl0.1 wl0.2 wl0.3";
var dbwww_support = false; 
var wifilogo_support = (rc_support.search("WIFI_LOGO") == -1) ? false : true; 
var band2g_support = rc_support.search("2.4G");
var band5g_support = rc_support.search("5G");
var live_update_support = rc_support.search("update"); 
var cooler_support = rc_support.search("fanctrl"); 
var power_support = (rc_support.search("pwrctrl") == -1) ? false : true; 
var repeater_support = rc_support.search("repeater"); 
var psta_support = rc_support.search("psta"); // AC66U proxy sta support
var wl6_support = rc_support.search("wl6"); // BRCM wl6 support
var Rawifi_support = (rc_support.search("rawifi") == -1) ? false : true;
var SwitchCtrl_support = rc_support.search("switchctrl");
var dsl_support = (rc_support.search("dsl") == -1) ? false : true;
var dualWAN_support = (rc_support.search("dualwan") == -1) ? false : true;
var ruisp_support = rc_support.search("ruisp");

var multissid_support = rc_support.search("mssid");
if(sw_mode == 2 || sw_mode == 4)
	multissid_support = -1;
if(multissid_support != -1)
	multissid_support = wl_vifnames.split(" ").length;
var no5gmssid_support = rc_support.search("no5gmssid");

var wifi_hw_sw_support = (rc_support.search("wifi_hw_sw") == -1) ? false : true;
var wifi_tog_btn_support = rc_support.search("wifi_tog_btn");
var usb_support = rc_support.search("usb"); 
var printer_support = rc_support.search("printer"); 
var appbase_support = rc_support.search("appbase");
var appnet_support = rc_support.search("appnet");
var media_support = (rc_support.search(" media") == -1) ? false : true;
var nomedia_support = (rc_support.search("nomedia") == -1) ? false : true;
var cloudsync_support = (rc_support.search("cloudsync") == -1) ? false : true; 
var yadns_support = (rc_support.search("yadns") == -1) ? false : true; 

//MODELDEP : DSL-N55U、DSL-N55U-B、RT-N56U
if(based_modelid == "DSL-N55U" || based_modelid == "DSL-N55U-B" || based_modelid == "RT-N56U")
	var aicloudipk_support = true;
else
	var aicloudipk_support = false;

var modem_support = rc_support.search("modem"); 
var IPv6_support = (rc_support.search("ipv6") == -1) ? false : true; 
var ParentalCtrl2_support = (rc_support.search("PARENTAL2")  == -1) ? false : true;;
var ParentalCtrl_support = rc_support.search("PARENTAL "); 
var pptpd_support = rc_support.search("pptpd"); 
var openvpnd_support = rc_support.search("openvpnd"); 
var WebDav_support = rc_support.search("webdav"); 
var HTTPS_support = (rc_support.search("HTTPS") == -1) ? false : true; 
var nodm_support = rc_support.search("nodm"); 
var wimax_support = rc_support.search("wimax");
var downsize_4m_support = (rc_support.search("sfp4m") == -1) ? false : true;
var downsize_8m_support = (rc_support.search("sfp8m") == -1) ? false : true;
var hwmodeSwitch_support = (rc_support.search("swmode_switch") == -1) ? false : true;
var diskUtility_support = (rc_support.search("diskutility") == -1) ? false : true;
var networkTool_support = true;
var optimizeXbox_support = (rc_support.search("optimize_xbox") == -1) ? false : true;

var QISWIZARD = "QIS_wizard.htm";
// Todo: Support repeater mode
if(isMobile() && sw_mode != 2 && !dsl_support)
	QISWIZARD = "QIS_wizard_m.htm";

// for detect if the status of the machine is changed. {
var wanstate = -1;
var wansbstate = -1;
var wanauxstate = -1;
var stopFlag = 0;

var gn_array_2g = [["1", "ASUS_Guest1", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", "0"], ["0", "ASUS_Guest2", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", ""], ["0", "ASUS_Guest3", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", ""]];
var gn_array_5g = [["1", "ASUS_5G_Guest1", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", "0"], ["0", "ASUS_5G_Guest2", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", ""], ["0", "ASUS_5G_Guest3", "open", "aes", "", "0", "1", "", "", "", "", "0", "off", ""]];

function available_disks(){ return [];}

function available_disk_sizes(){ return [];}

function claimed_disks(){ return [];}

function claimed_disk_interface_names(){ return [];}

function claimed_disk_model_info(){ return [];}

function claimed_disk_total_size(){ return [];}

function claimed_disk_total_mounted_number(){ return [];}

function blank_disks(){ return [];}

function blank_disk_interface_names(){ return [];}

function blank_disk_model_info(){ return [];}

function blank_disk_total_size(){ return [];}

function blank_disk_total_mounted_number(){ return [];}

function foreign_disks(){
    return ["JetFlash%20Transcend%208GB"];
}

function foreign_disk_interface_names(){
    return ["1"];
}

function foreign_disk_model_info(){
    return ["JetFlash Transcend%208GB"];
}

function foreign_disk_total_size(){
    return ["7910400"];
}

function foreign_disk_total_mounted_number(){
    return ["1"];
}


function total_disk_sizes(){
    return ["7910400"];
}

function disk_interface_names(){
    return ["usb"];
}

function pool_names(){
    return ["JET_8G"];
}

function pool_devices(){
    return ["sda1"];
}

function pool_types(){
    return ["ufsd"];
}

function pool_mirror_counts(){
    return [0];
}

function pool_status(){
    return ["rw"];
}

function pool_kilobytes(){
    return [7903948];
}

function pool_encryption_password_is_missing(){
    return ["no"];
}

function pool_kilobytes_in_use(){
    return [1265068];
}

function disk_usage(){
    return [7903948];
}

function per_pane_pool_usage_kilobytes(pool_num, disk_num){
    if (pool_num == 0){
	if (disk_num == 0) {
	    return [7903948];
	}
    }
}



var wan_line_state = "";
var wlan0_radio_flag = "1";
var wlan1_radio_flag = "1";

function change_wl_unit_status(_unit){
	if(sw_mode == 2 || sw_mode == 4) return false;
	location.href = "Advanced_Wireless_Content.html";
	document.titleForm.wl_unit.disabled = false;
	document.titleForm.wl_unit.value = _unit;
	if(document.titleForm.current_page.value == "")
		document.titleForm.current_page.value = "Advanced_Wireless_Content.html";
	if(document.titleForm.next_page.value == "")
		document.titleForm.next_page.value = "Advanced_Wireless_Content.html";
	document.titleForm.action_mode.value = "change_wl_unit";
	//document.titleForm.action = "apply.cgi";
	document.titleForm.target = "";
	//document.titleForm.submit();
}

var banner_code, menu_code="", menu1_code="", menu2_code="", tab_code="", footer_code;
function show_banner(L3){// L3 = The third Level of Menu
	var banner_code = "";	

	// creat a hidden iframe to cache offline page
	//banner_code +='<iframe width="0" height="0" frameborder="0" scrolling="no" src="manifest.html"></iframe>';

	banner_code +='<form method="post" name="titleForm" id="titleForm" action="/start_apply.htm" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="next_page" value="">\n';
	banner_code +='<input type="hidden" name="current_page" value="">\n';
	banner_code +='<input type="hidden" name="action_mode" value="apply">\n';
	banner_code +='<input type="hidden" name="action_script" value="">\n';
	banner_code +='<input type="hidden" name="action_wait" value="5">\n';
	banner_code +='<input type="hidden" name="wl_unit" value="" disabled>\n';
	banner_code +='<input type="hidden" name="wl_subunit" value="-1" disabled>\n';
	banner_code +='<input type="hidden" name="preferred_lang" value="EN">\n';
	banner_code +='<input type="hidden" name="flag" value="">\n';
	banner_code +='</form>\n';

	banner_code +='<form method="post" name="diskForm_title" action="device-map/safely_remove_disk.html" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="disk" value="">\n';
	banner_code +='</form>\n';

	banner_code +='<form method="post" name="internetForm_title" action="start_apply2.htm" target="hidden_frame">\n';
	banner_code +='<input type="hidden" name="current_page" value="index.html">\n';
	banner_code +='<input type="hidden" name="next_page" value="index.html">\n';
	banner_code +='<input type="hidden" name="action_mode" value="apply">\n';
	banner_code +='<input type="hidden" name="action_script" value="restart_wan_if">\n';
	banner_code +='<input type="hidden" name="action_wait" value="5">\n';
	banner_code +='<input type="hidden" name="wan_enable" value="1">\n';
	banner_code +='<input type="hidden" name="wan_unit" value="0">\n';
	banner_code +='</form>\n';

	banner_code +='<div class="banner1" align="center"><img src="images/New_ui/asustitle.png" width="218" height="54" align="left">\n';
	banner_code +='<div style="margin-top:13px;margin-left:-90px;*margin-top:0px;*margin-left:0px;" align="center"><span id="modelName_top" onclick="this.focus();" class="modelName_top">RT-AC66U</span></div>';

	// logout, reboot
	banner_code +='<a href="javascript:logout();"><div style="margin-top:13px;margin-left:25px; *width:136px;" class="titlebtn" align="center"><span>Logout</span></div></a>\n';
	banner_code +='<a href="javascript:reboot();"><div style="margin-top:13px;margin-left:0px;*width:136px;" class="titlebtn" align="center"><span>Reboot</span></div></a>\n';

	// language
	banner_code +='<ul class="navigation"><a href="#">';
	banner_code +='<li><dl><dt id="selected_lang"></dt>\n<dd><a onclick="submit_language(this)" id="TW">繁體中文</a></dd>\n<dd><a onclick="submit_language(this)" id="CN">简体中文</a></dd>\n<dd><a onclick="submit_language(this)" id="CZ">Česky</a></dd>\n<dd><a onclick="submit_language(this)" id="PL">Polski</a></dd>\n<dd><a onclick="submit_language(this)" id="RU">Pусский</a></dd>\n<dd><a onclick="submit_language(this)" id="DE">Deutsch</a></dd>\n<dd><a onclick="submit_language(this)" id="FR">Français</a></dd>\n<dd><a onclick="submit_language(this)" id="TR">Türkçe</a></dd>\n<dd><a onclick="submit_language(this)" id="TH">ไทย</a></dd>\n<dd><a onclick="submit_language(this)" id="MS">Malay</a></dd>\n<dd><a onclick="submit_language(this)" id="NO">Norsk</a></dd>\n<dd><a onclick="submit_language(this)" id="FI">Finsk</a></dd>\n<dd><a onclick="submit_language(this)" id="DA">Dansk</a></dd>\n<dd><a onclick="submit_language(this)" id="SV">Svensk</a></dd>\n<dd><a onclick="submit_language(this)" id="BR">Portuguese(Brazil)</a></dd>\n<dd><a onclick="submit_language(this)" id="JP">日本語</a></dd>\n<dd><a onclick="submit_language(this)" id="ES">Español</a></dd>\n<dd><a onclick="submit_language(this)" id="IT">Italiano</a></dd>\n<dd><a onclick="submit_language(this)" id="UK">Ukrainian</a></dd>\n<dd><a onclick="submit_language(this)" id="HU">Hungarian</a></dd>\n<dd><a onclick="submit_language(this)" id="RO">Romanian</a></dd>\n</dl></li>\n';
	banner_code +='</a></ul>';

	banner_code +='</div>\n';
	banner_code +='<table width="998" border="0" align="center" cellpadding="0" cellspacing="0" class="statusBar">\n';
	banner_code +='<tr>\n';
	banner_code +='<td background="images/New_ui/midup_bg.png" height="179" valign="top"><table width="764" border="0" cellpadding="0" cellspacing="0" height="35px" style="margin-left:230px;">\n';
	banner_code +='<tbody><tr>\n';
 	banner_code +='<td valign="center" class="titledown" width="auto">';

	// dsl does not support operation mode
	if (!dsl_support) {
		banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;">Operation Mode:</sapn><span class="title_link" style="text-decoration: none;" id="op_link"><a href="Advanced_OperationMode_Content.html" style="color:white"><span id="sw_mode_span" style="text-decoration: underline;"></span></a></span>\n';
	}
	banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;">Firmware Version:</sapn><a href="Advanced_FirmwareUpgrade_Content.html" style="color:white;"><span id="firmver" class="title_link"></span></a>\n';
	banner_code +='<span style="font-family:Verdana, Arial, Helvetica, sans-serif;" id="ssidTitle">SSID:</sapn>';
	banner_code +='<span onclick="change_wl_unit_status(0)" id="elliptic_ssid_2g" class="title_link"></span>';
	banner_code +='<span onclick="change_wl_unit_status(1)" id="elliptic_ssid_5g" style="margin-left:-5px;" class="title_link"></span>\n';
	banner_code +='</td>\n';

	if(wifi_hw_sw_support)
		banner_code +='<td width="30"><div id="wifi_hw_sw_status"></div></td>\n';

	if(cooler_support != -1)
		banner_code +='<td width="30"><div id="cooler_status"" style="display:none;"></div></td>\n';

	if(multissid_support != -1)
		banner_code +='<td width="30"><div id="guestnetwork_status""></div></td>\n';

	//Viz add 2013.04 for dsl sync status
	if(dsl_support)
		banner_code +='<td width="30"><div id="adsl_line_status"></div></td>\n';

	if(sw_mode != 3)
	  banner_code +='<td width="30"><div id="connect_status"></div></td>\n';

	if(usb_support != -1)
		banner_code +='<td width="30"><div id="usb_status"></div></td>\n';
	
	if(printer_support != -1)
	  banner_code +='<td width="30"><div id="printer_status"></div></td>\n';

	banner_code +='<td width="17"></td>\n';
	banner_code +='</tr></tbody></table></td></tr></table>\n';

	$("TopBanner").innerHTML = banner_code;

	show_loading_obj();	
	show_top_status();
//	updateStatus_AJAX();
refresh_info_status();
}

//Level 3 Tab
var tabtitle = new Array();
tabtitle[0] = new Array("", "General", "WPS", "Bridge", "Wireless MAC Filter", "RADIUS Setting", "Professional");
tabtitle[1] = new Array("", "LAN IP", "DHCP Server", "Route", "IPTV", "Switch Control");
tabtitle[2] = new Array("", "Internet Connection", "Dual WAN", "Port Trigger", "Virtual Server / Port Forwarding", "DMZ", "DDNS", "NAT Passthrough", "USB Modem");
tabtitle[3] = new Array("", "Media Server", "Network Place(Samba) Share", "FTP Share", "Miscellaneous setting");
tabtitle[4] = new Array("", "IPv6");
tabtitle[5] = new Array("", "VPN Server", "VPN Details", "VPN Status");
tabtitle[6] = new Array("", "General", "URL Filter", "Keyword Filter", "MAC Filter", "Network Services Filter");
tabtitle[7] = new Array("", "Operation Mode", "System", "Firmware Upgrade", "Restore/Save/Upload Setting", "Performance tuning", "DSL Setting");
tabtitle[8] = new Array("", "General Log", "DHCP leases", "Wireless Log", "Port Forwarding", "Routing Table", "ADSL Log", "Connections", "IPv6");
tabtitle[9] = new Array("", "Network Analysis", "Netstat", "Wake on LAN");
tabtitle[10] = new Array("", "QoS", "Traffic Monitor");
tabtitle[11] = new Array("", "Parental control", "Yandex.DNS");

var tablink = new Array();
tablink[0] = new Array("", "Advanced_Wireless_Content.html", "Advanced_WWPS_Content.html", "Advanced_WMode_Content.html", "Advanced_ACL_Content.html", "Advanced_WSecurity_Content.html", "Advanced_WAdvanced_Content.html");
tablink[1] = new Array("", "Advanced_LAN_Content.html", "Advanced_DHCP_Content.html", "Advanced_GWStaticRoute_Content.html", "Advanced_IPTV_Content.html", "Advanced_SwitchCtrl_Content.html");
tablink[2] = new Array("", "Advanced_WAN_Content.html", "Advanced_WANPort_Content.html", "Advanced_PortTrigger_Content.html", "Advanced_VirtualServer_Content.html", "Advanced_Exposed_Content.html", "Advanced_ASUSDDNS_Content.html", "Advanced_NATPassThrough_Content.html", "Advanced_Modem_Content.html");
tablink[3] = new Array("", "mediaserver.html", "Advanced_AiDisk_samba.html", "Advanced_AiDisk_ftp.html", "Advanced_AiDisk_others.html");
tablink[4] = new Array("", "Advanced_IPv6_Content.html");
tablink[5] = new Array("", "Advanced_PPTP_Content.html", "Advanced_PPTPAdvanced_Content.html", "Advanced_VPNStatus.html", "Main_Ping_Content.html", "Main_Netstat_Content.html", "Main_Traceroute_Content.html");
tablink[6] = new Array("", "Advanced_BasicFirewall_Content.html", "Advanced_URLFilter_Content.html", "Advanced_KeywordFilter_Content.html","Advanced_MACFilter_Content.html", "Advanced_Firewall_Content.html");
tablink[7] = new Array("", "Advanced_OperationMode_Content.html", "Advanced_System_Content.html", "Advanced_FirmwareUpgrade_Content.html", "Advanced_SettingBackup_Content.html", "Advanced_PerformanceTuning_Content.html", "Advanced_ADSL_Content.html");
tablink[8] = new Array("", "Main_LogStatus_Content.html", "Main_DHCPStatus_Content.html", "Main_WStatus_Content.html", "Main_IPTStatus_Content.html", "Main_RouteStatus_Content.html", "Main_AdslStatus_Content.html", "Main_ConnStatus_Content.html", "Main_IPV6Status_Content.html");
tablink[9] = new Array("", "Main_Analysis_Content.html", "Main_Netstat_Content.html", "Main_WOL_Content.html");
tablink[10] = new Array("", "QoS_EZQoS.html", "Main_TrafficMonitor_realtime.html", "Main_TrafficMonitor_last24.html", "Main_TrafficMonitor_daily.html", "Advanced_QOSUserPrio_Content.html", "Advanced_QOSUserRules_Content.html");
tablink[11] = new Array("", "ParentalControl.html", "YandexDNS.html");

//Level 2 Menu
menuL2_title = new Array("", "Wireless", "LAN", "WAN", "USB Application", "IPv6", "VPN Server", "Firewall", "Administration", "System Log", "Network Tools");
menuL2_link  = new Array("", tablink[0][1], tablink[1][1], tablink[2][1], tablink[3][1], tablink[4][1], tablink[5][1], tablink[6][1], tablink[7][1], tablink[8][1], tablink[9][1]);

//Level 1 Menu
menuL1_title = new Array("", "Network Map", "Guest Network", "Traffic Manager", "Parental control", "USB application", "AiCloud", "Advanced Settings");
menuL1_link = new Array("", "index.html", "Guest_network.html", "QoS_EZQoS.html", "ParentalControl.html", "APP_Installation.html", "cloud_main.html", "");
var calculate_height = menuL1_link.length+tablink.length-2;

var traffic_L1_dx = 3;
var traffic_L2_dx = 11;

function remove_url(){
	remove_menu_item(2, "Advanced_Modem_Content.html");
	
	if('1' == '0')
		menuL1_link[6] = "cloud__main.html"

	if(!networkTool_support){
		menuL2_title[10] = "";
		menuL2_link[10] = "";
	}

	if(downsize_4m_support) {
		remove_menu_item(8, "Main_ConnStatus_Content.html");
		remove_menu_item(10, "Main_TrafficMonitor_realtime.html");		
	}
	
	if(downsize_8m_support) {
		//remove_menu_item(8, "Main_ConnStatus_Content.html");
	}	

	if(!dsl_support) {
		remove_menu_item(7, "Advanced_ADSL_Content.html");
		remove_menu_item(8, "Main_AdslStatus_Content.html");
		remove_menu_item(8, "Main_Spectrum_Content.html");
	}
	else {
		menuL2_link[3] = "Advanced_DSL_Content.html";

		//no_op_mode
		remove_menu_item(7, "Advanced_OperationMode_Content.html");
	}

	if(hwmodeSwitch_support){
		remove_menu_item(7, "Advanced_OperationMode_Content.html");		
	}

	if(WebDav_support != -1) {
		tabtitle[3][2] = "Network Place(Samba) Share / Cloud Disk";
	}
	
	if(!cloudsync_support && !aicloudipk_support){
		menuL1_title[6] = "";
		menuL1_link[6] = "";
	}
		
	if(sw_mode == 2 || sw_mode == 4){
		// Guest Network
		menuL1_title[2] ="";
		menuL1_link[2] ="";
		// Traffic Manager
		menuL1_title[3] ="";
		menuL1_link[3] ="";
		// Parental Ctrl
		menuL1_title[4] ="";
		menuL1_link[4] ="";				
		// AiCloud
		menuL1_title[6] ="";
		menuL1_link[6] ="";				
		// Wireless
		menuL2_title[1]="";
		menuL2_link[1]="";
		// WAN
		menuL2_title[3]="";
		menuL2_link[3]="";	
		// LAN
		remove_menu_item(1, "Advanced_DHCP_Content.html");
		remove_menu_item(1, "Advanced_GWStaticRoute_Content.html");
		remove_menu_item(1, "Advanced_IPTV_Content.html");								
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.html");
		// VPN
		menuL2_title[5]="";
		menuL2_link[5]="";
		//IPv6
		menuL2_title[6]="";
		menuL2_link[6]="";
		// Firewall		
		menuL2_title[7]="";
		menuL2_link[7]="";
		// Log
		remove_menu_item(8, "Main_DHCPStatus_Content.html");
		remove_menu_item(8, "Main_IPTStatus_Content.html");
		remove_menu_item(8, "Main_RouteStatus_Content.html");								
	}
	else if(sw_mode == 3){
		// Traffic Manager
		menuL1_title[3] ="";
		menuL1_link[3] ="";		
		// Parental Ctrl
		menuL1_title[4] ="";
		menuL1_link[4] ="";
		// AiCloud
		menuL1_title[6] ="";
		menuL1_link[6] ="";

		// Wireless
		remove_menu_item(0, "Advanced_WWPS_Content.html");
		// WAN
		menuL2_title[3]="";
		menuL2_link[3]="";
		// LAN
		remove_menu_item(1, "Advanced_DHCP_Content.html");
		remove_menu_item(1, "Advanced_GWStaticRoute_Content.html");
		remove_menu_item(1, "Advanced_IPTV_Content.html");
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.html");
		// VPN
		menuL2_title[5]="";
		menuL2_link[5]="";
		// IPv6
		menuL2_title[6]="";
		menuL2_link[6]="";
		// Firewall		
		menuL2_title[7]="";
		menuL2_link[7]="";
		// Log
		remove_menu_item(8, "Main_DHCPStatus_Content.html");
		remove_menu_item(8, "Main_IPTStatus_Content.html");
		remove_menu_item(8, "Main_RouteStatus_Content.html");								
	}
	
	if(!dualWAN_support){
		remove_menu_item(2, "Advanced_WANPort_Content.html");
		if (dsl_support) {
			tablink[2][1] = "Advanced_DSL_Content.html";
		}
	}
	else{
		var dualwan_pri_if = ''.split(" ");
		if(dualwan_pri_if == 'lan') tablink[2][1] = "Advanced_WAN_Content.html";
		else if(dualwan_pri_if == 'wan') tablink[2][1] = "Advanced_WAN_Content.html";
		else if(dualwan_pri_if == 'usb') tablink[2][1] = "Advanced_Modem_Content.html";
		else if(dualwan_pri_if == 'dsl') tablink[2][1] = "Advanced_DSL_Content.html";
	}

	if(!media_support){
		tabtitle[3].splice(1, 1);
		tablink[3].splice(1, 1);	
	}

	if(cooler_support == -1){
		remove_menu_item(7, "Advanced_PerformanceTuning_Content.html");
	}

	if(!ParentalCtrl2_support && !yadns_support){
		menuL1_title[4]="";
		menuL1_link[4]="";
	}
	else if(!ParentalCtrl2_support && yadns_support){
		remove_menu_item(11, "ParentalControl.html");
		menuL1_link[4]="YandexDNS.html";
	}
	else if(ParentalCtrl2_support && !yadns_support){
		remove_menu_item(11, "YandexDNS.html");
	}
	
	if(ParentalCtrl_support == -1)
		remove_menu_item(6, "Advanced_MACFilter_Content.html");

	if(!IPv6_support){
		menuL2_title[5] = "";
		menuL2_link[5] = "";
		remove_menu_item(8, "Main_IPV6Status_Content.html");		
	}
	
	if(multissid_support == -1){
		menuL1_title[2]="";
		menuL1_link[2]="";
	}

	if(usb_support == -1){
		menuL1_title[5]="";
		menuL1_link[5]="";
	}

	if(pptpd_support == -1){
		remove_menu_item(5, "Advanced_PPTP_Content.html");
		if(openvpnd_support == -1){
			menuL2_title[6] = "";
			menuL2_link[6] = "";
		}
	}	
	
	if(SwitchCtrl_support == -1){
		remove_menu_item(1, "Advanced_SwitchCtrl_Content.html");		
	}
}

function remove_menu_item(L2, remove_url){
	var dx;
	for(var i = 0; i < tablink[L2].length; i++){
		dx = tablink[L2].getIndexByValue(remove_url);
		if(dx == -1)	//If not match, pass it
			return false;
		else if(dx == 1) //If the url to be removed is the 1st tablink then replace by next tablink 
			menuL2_link.splice(L2+1, 1, tablink[L2][2]);

		tabtitle[L2].splice(dx, 1);
		tablink[L2].splice(dx, 1);
		break;
	}
}

Array.prototype.getIndexByValue = function(value){
	var index = -1;
	for(var i=0; i<this.length; i++){
		if (this[i] == value){
			index = i;
			break;
		}
	}
	return index;
}

Array.prototype.getIndexByValue2D = function(value){
	for(var i=0; i<this.length; i++){
		if(this[i].getIndexByValue(value) != -1){
			return [i, this[i].getIndexByValue(value)]; // return [1-D_index, 2-D_index];
		}
	}
	return -1;
}

var current_url = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
function show_menu(){
	var L1 = 0, L2 = 0, L3 = 0;
	if(current_url == "") current_url = "index.html";
	if (dualWAN_support) {
		// fix dualwan showmenu
		if(current_url == "Advanced_DSL_Content.html") current_url = "Advanced_WAN_Content.html";
		if(current_url == "Advanced_Modem_Content.html") current_url = "Advanced_WAN_Content.html";
	}

	remove_url();
	// calculate L1, L2, L3.
	for(var i = 1; i < menuL1_link.length; i++){
		if(current_url == menuL1_link[i]){
			L1 = i;
			break;
		}
		else
			L1 = menuL1_link.length;
	}
	if(L1 == menuL1_link.length){
		for(var j = 0; j < tablink.length; j++){
			for(var k = 1; k < tablink[j].length; k++){
				if(current_url == tablink[j][k]){
					L2 = j+1;
					L3 = k;
					break;
				}
			}
		}
	}

	// special case for Traffic Manager
	if(L1 == traffic_L1_dx || L2 == traffic_L2_dx){
		if(current_url.indexOf("Main_TrafficMonitor_") == 0){
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 2;
		}
		else if(current_url.indexOf("ParentalControl") == 0){
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 3;
		}
		else if(current_url.indexOf("cloud") == 0){
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 1;
		}
		else{
			L1 = traffic_L1_dx; 
			L2 = traffic_L2_dx; 
			L3 = 1;
		}
	}
	//end

	// cloud
	if(current_url.indexOf("cloud") == 0)
		L1 = 6;

	if(current_url.indexOf("ParentalControl") == 0){
		if(ParentalCtrl2_support && yadns_support){
			traffic_L1_dx = 4;
			traffic_L2_dx = 12;
			L1 = traffic_L1_dx;	
			L2 = traffic_L2_dx;
			L3 = 1;
		}	
	}	
	
	if(current_url.indexOf("YandexDNS") == 0){
		if(ParentalCtrl2_support && yadns_support){
			traffic_L1_dx = 4;
			traffic_L2_dx = 12;
			L1 = traffic_L1_dx;	
			L2 = traffic_L2_dx;
			L3 = 2;
		}	
	}
	
	show_banner(L3);
	show_footer();
	browser_compatibility();	
	show_selected_language();
	autoFocus('');

	// QIS wizard
	if(sw_mode == 2){
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\'/'+ QISWIZARD +'?flag=sitesurvey\');"><table><tr><td><div id="index_img0"></div></td><td><div>Quick Internet Setup</div></td></tr></table></div>\n';
	}else if(sw_mode == 3){
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\''+ QISWIZARD +'?flag=lanip\');"><table><tr><td><div id="index_img0"></div></td><td><div>Quick Internet Setup</div></td></tr></table></div>\n'; 	
	}else if(sw_mode == 4){
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\'/'+ QISWIZARD +'?flag=sitesurvey_mb\');"><table><tr><td><div id="index_img0"></div></td><td><div>Quick Internet Setup</div></td></tr></table></div>\n';
	}else{
		menu1_code += '<div class="m_qis_r" style="margin-top:-170px;cursor:pointer;" onclick="go_setting(\''+ QISWIZARD +'?flag=detect\');"><table><tr><td><div id="index_img0"></div></td><td><div>Quick Internet Setup</div></td></tr></table></div>\n';
	}	

	// Feature
	menu1_code += '<div class="m0_r" style="margin-top:10px;" id="option0"><table width="192px" height="37px"><tr><td>General</td></tr></table></div>\n';
	for(i = 1; i <= menuL1_title.length-2; i++){
		if(menuL1_title[i] == ""){
			calculate_height--;
			continue;
		}
		else if(L1 == i && (L2 <= 0 || L2 == traffic_L2_dx)){
		  //menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+'<table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_index_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></div>\n';
		  menu1_code += '<div class="m'+i+'_r" id="option'+i+'">'+'<table><tr><td><div id="index_img'+i+'"></div></td><td><div id="menu_string'+i+'" style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></div>\n';
		}
		else{
		  menu1_code += '<div class="menu" id="option'+i+'" onclick="location.href=\''+menuL1_link[i]+'\'" style="cursor:pointer;"><table><tr><td><div id="index_img'+i+'"></div></td><td><div id="menu_string" style="width:120px;">'+menuL1_title[i]+'</div></td></tr></table></div>\n';
		}
	}	
	menu1_code += '<div class="m0_r" style="margin-top:10px;" id="option0">'+'<table width="192px" height="37px"><tr><td>Advanced Settings</td></tr></table></div>\n'; 	

	//menu1_code += '<div class="m0_r" style="margin-top:10px;" id="option0">'+'<table width="192px" height="37px"><tr><td>Advanced Settings</td></tr></table></div>\n'; 	
			menu1_code +='<div id="supported_link">';
		menu1_code +='<div class="test_text"><a href="http://event.asus.com/2013/nw/ASUSWRT/index.htm" target="_blank" style="text-decoration: underline;">Check ASUSWRT supported models</div>';
		menu1_code +='<div style="margin-left:11px;"><img style="width:25px;height:25px;" src="images/white arrow.png"></a></div></div>';

	$("mainMenu").innerHTML = menu1_code;

	// Advanced
	if(L2 != -1){ 
		for(var i = 1; i < menuL2_title.length; ++i){
			if(menuL2_link[i] == "Advanced_Wireless_Content.html" && "-1" != "0" && "-1" != "-1")
				menuL2_link[i] = "javascript:change_wl_unit_status(" + 0 + ");";
			if(menuL2_title[i] == "" || i == 4){
				calculate_height--;
				continue;
			}
			else if(L2 == i){
				//menu2_code += '<div class="m'+i+'_r" id="option'+i+'">'+'<table><tr><td><img border="0" width="50px" height="50px" src="images/New_ui/icon_menu_'+i+'.png" style="margin-top:-3px;"/></td><td><div style="width:120px;">'+menuL2_title[i]+'</div></td></tr></table></div>\n';
				menu2_code += '<div class="m'+i+'_r" id="option'+i+'">'+'<table><tr><td><div id="menu_img'+i+'"></div></td><td><div id="option_str1" style="width:120px;">'+menuL2_title[i]+'</div></td></tr></table></div>\n';
			}else{				
				menu2_code += '<div class="menu" id="option'+i+'" onclick="location.href=\''+menuL2_link[i]+'\'" style="cursor:pointer;"><table><tr><td><div id="menu_img'+i+'"></div></td><td><div id="option_str1" style="width:120px;">'+menuL2_title[i]+'</div></td></tr></table></div>\n';
			}	
		}
	}
	$("subMenu").innerHTML = menu2_code;

	// Tabs
	if(L3){
		if(L2 == traffic_L2_dx){ // if tm
			tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
			for(var i=1; i < tabtitle[traffic_L2_dx-1].length; ++i){
				if(tabtitle[traffic_L2_dx-1][i] == "")
					continue;
				else if(L3 == i)
					tab_code += '<td><div class="tabclick"><span>'+ tabtitle[traffic_L2_dx-1][i] +'</span></div></td>';
				else
					tab_code += '<td><a href="' + tablink[traffic_L2_dx-1][i] + '"><div class="tab"><span>'+ tabtitle[traffic_L2_dx-1][i] +'</span></div></a></td>';
			}
			tab_code += '</tr></table>\n';		
		}
		else{
			tab_code = '<table border="0" cellspacing="0" cellpadding="0"><tr>\n';
			for(var i=1; i < tabtitle[L2-1].length; ++i){
				if(tabtitle[L2-1][i] == "")
					continue;
				else if(L3 == i)
					tab_code += '<td><div class="tabclick"><span><table><tbody><tr><td>'+tabtitle[L2-1][i]+'</td></tr></tbody></table></span></div></td>';
				else
					tab_code += '<td><div class="tab"onclick="location.href=\''+tablink[L2-1][i]+'\'" style="cursor:pointer;"><span><table><tbody><tr><td>'+tabtitle[L2-1][i]+'</td></tr></tbody></table></span></div></td>';
			}
			tab_code += '</tr></table>\n';		
		}

		$("tabMenu").innerHTML = tab_code;
	}

	if(current_url == "index.html" || current_url == "")
		cal_height();
	else
		setTimeout('cal_height();', 1);
}

function addOnlineHelp(obj, keywordArray){
	var faqLang = {
		EN : "en",
		TW : "en",
		CN : "en",
		CZ : "en",
		PL : "en",
		RU : "en",
		DE : "en",
		FR : "en",
		TR : "en",
		TH : "en",
		MS : "en",
		NO : "en",
		FI : "en",
		DA : "en",
		SV : "en",
		BR : "en",
		JP : "en",
		ES : "en",
		IT : "en",
		UK : "en",
		HU : "en",
		RO : "en"
	}

	// exception start
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "download" 
			&& (keywordArray[2] == "master" || keywordArray[2] == "tool")){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}		
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "ez" && keywordArray[2] == "printer"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}		
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "lpr"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}
	if(keywordArray[0] == "mac" && keywordArray[1] == "lpr"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}
	if(keywordArray[0] == "monopoly" && keywordArray[1] == "mode"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}			
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "VPN"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "DMZ"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}	
	if(keywordArray[0] == "set" && keywordArray[1] == "up" && keywordArray[2] == "specific" && keywordArray[3] == "IP" && keywordArray[4] == "addresses"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";		
	}
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "port" && keywordArray[2] == "forwarding"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";		
	}
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "port" && keywordArray[2] == "trigger"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.ES = "es-es";		
	}
	//keyword=UPnP
	if(keywordArray[0] == "UPnP"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}	
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "hard" && keywordArray[2] == "disk" 
		&& keywordArray[3] == "USB"){

	}	
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "Traffic" && keywordArray[2] == "Monitor"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";		
	}	
	if(keywordArray[0] == "ASUSWRT" && keywordArray[1] == "samba" && keywordArray[2] == "Windows"
			&& keywordArray[3] == "network" && keywordArray[4] == "place"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}
	if(keywordArray[0] == "samba"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}
	if(keywordArray[0] == "WOL" && keywordArray[1] == "wake" && keywordArray[2] == "on"
			&& keywordArray[3] == "lan"){
	}
	if(keywordArray[0] == "WOL" && keywordArray[1] == "BIOS"){
		faqLang.TW = "zh-tw";
		faqLang.CN = "zh-cn";
		faqLang.FR = "fr-fr";
		faqLang.ES = "es-es";
	}		
	// exception end	
	

	if(obj){
		obj.href = "http://support.asus.com/search.htmlx?SLanguage=";
		obj.href += faqLang.EN;
		obj.href += "&keyword=";
		for(var i=0; i<keywordArray.length; i++){
			obj.href += keywordArray[i];
			obj.href += "%20";
		}
	}
}

function Block_chars(obj, keywordArray){
	// bolck ascii code 32~126 first
	var invalid_char = "";		
	for(var i = 0; i < obj.value.length; ++i){
		if(obj.value.charCodeAt(i) < '32' || obj.value.charCodeAt(i) > '126'){
			invalid_char += obj.value.charAt(i);
		}
	}
	if(invalid_char != ""){
		alert('This string cannot contain" '+ invalid_char +'" !');
		obj.focus();
		return false;
	}

	// check if char in the specified array
	if(obj.value){
		for(var i=0; i<keywordArray.length; i++){
				if( obj.value.indexOf(keywordArray[i]) >= 0){						
					alert(keywordArray+ " are invalid characters.");
					obj.focus();
					return false;
				}	
		}
	}
	
	return true;
}

function cal_height(){
	var tableClientHeight;
	var optionHeight = 52;
	var manualOffSet = 25;
	var table_height = Math.round(optionHeight*calculate_height - manualOffSet*calculate_height/14 - $("tabMenu").clientHeight);	
	if(navigator.appName.indexOf("Microsoft") < 0)
		var contentObj = document.getElementsByClassName("content");
	else
		var contentObj = getElementsByClassName_iefix("table", "content");

	if($("FormTitle") && current_url.indexOf("Advanced_AiDisk_ftp") != 0 && current_url.indexOf("Advanced_AiDisk_samba") != 0 && current_url.indexOf("QoS_EZQoS") != 0){
		table_height = table_height + 24;
		$("FormTitle").style.height = table_height + "px";
		tableClientHeight = $("FormTitle").clientHeight;
	}
	// index.html
	else if($("NM_table")){
		var statusPageHeight = 720;
		if(table_height < 740)
			table_height = 740;
		$("NM_table").style.height = table_height + "px";

		var root = document.compatMode == 'BackCompat' ? document.body : document.documentElement;
		var isVerticalScrollbar = root.scrollHeight > root.clientHeight;
		if(!isVerticalScrollbar)
			$("NM_table_div").style.marginTop = (table_height - statusPageHeight)/2 + "px";

		tableClientHeight = $("NM_table").clientHeight;
	}
	// aidisk.html
	else if($("AiDiskFormTitle")){
		table_height = table_height + 24;
		$("AiDiskFormTitle").style.height = table_height + "px";
		tableClientHeight = $("AiDiskFormTitle").clientHeight;
	}
	// APP Install
	else if($("applist_table")){
		if(sw_mode == 2 || sw_mode == 3 || sw_mode == 4)
				table_height = table_height + 120;				
		else
				table_height = table_height + 40;	//2
		$("applist_table").style.height = table_height + "px";		
		tableClientHeight = $("applist_table").clientHeight;
		
		if(navigator.appName.indexOf("Microsoft") >= 0)
						contentObj[0].style.height = contentObj[0].clientHeight + 18 + "px";
	}
	// PrinterServ
	else if($("printerServer_table")){
		if(sw_mode == 2 || sw_mode == 4)
				table_height = table_height + 90;
		else
				table_height = table_height + 2;
		$("printerServer_table").style.height = table_height + "px";		
		tableClientHeight = $("printerServer_table").clientHeight;
		
		if(navigator.appName.indexOf("Microsoft") >= 0)
						contentObj[0].style.height = contentObj[0].clientHeight + 18 + "px";
	}	

	/*// overflow
	var isOverflow = parseInt(tableClientHeight) - parseInt(table_height);
	if(isOverflow >= 0){
		if(current_url.indexOf("Main_TrafficMonitor_realtime") == 0 && navigator.appName.indexOf("Microsoft") < 0)
			contentObj[0].style.height = contentObj[0].clientHeight + 45 + "px";
		else
			contentObj[0].style.height = contentObj[0].clientHeight + 19 + "px";	
	}*/
}

function show_footer(){
	footer_code = '<div align="center" class="bottom-image"></div>\n';
	footer_code +='<div align="center" class="copyright">2013 ASUSTeK Computer Inc. All rights reserved.</div><br>';

	// FAQ searching bar{
	footer_code += '<div style="margin-top:-75px;margin-left:205px;"><table width="765px" border="0" align="center" cellpadding="0" cellspacing="0"><tr>';
	footer_code += '<td width="20" align="right"><div id="bottom_help_icon" style="margin-right:3px;"></div></td><td width="100" id="bottom_help_title" align="left">Help & Support</td>';

	if(based_modelid =="RT-N12" || hw_ver.search("RTN12") != -1){	//MODELDEP : RT-N12
		if( hw_ver.search("RTN12HP") != -1){	//RT-N12HP
				footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12HP" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12HP" target="_blank">Utility</a></td>';
		}else if(hw_ver.search("RTN12B1") != -1){ //RT-N12B1
				footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.B1)" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.B1)" target="_blank">Utility</a></td>';
		}else if(hw_ver.search("RTN12C1") != -1){ //RT-N12C1
				footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.C1)" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.C1)" target="_blank">Utility</a></td>';
		}else if(hw_ver.search("RTN12D1") != -1){ //RT-N12D1
				footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.D1)" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N12%20(VER.D1)" target="_blank">Utility</a></td>';
		}else{	//RT-N12
				footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-AC66U" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-AC66U" target="_blank">Utility</a></td>';
		}
	}
	else	if(productid == "RT-N66U"){	//MODELDEP : RT-N66U
		footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N66U%20(VER.B1)" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-N66U%20(VER.B1)" target="_blank">Utility</a></td>';
	}
	else if(productid == "DSL-N55U-B"){	//MODELDEP : DSL-N55U-B
		footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=DSL-N55U%20(VER.B1)" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=DSL-N55U%20(VER.B1)" target="_blank">Utility</a></td>';
	}
	else{
		footer_code += '<td width="200" id="bottom_help_link" align="left">&nbsp&nbsp<a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-AC66U" target="_blank">Manual</a> | <a style="font-weight: bolder;text-decoration:underline;cursor:pointer;" href="http://support.asus.com/download.htmlx?SLanguage=en&m=RT-AC66U" target="_blank">Utility</a></td>';	
	}			

	footer_code += '<td width="390" id="bottom_help_FAQ" align="right" style="font-family:Arial, Helvetica, sans-serif;">FAQ&nbsp&nbsp<input type="text" id="FAQ_input" name="FAQ_input" class="input_FAQ_table" maxlength="40"></td>';
	footer_code += '<td width="30" align="left"><div id="bottom_help_FAQ_icon" class="bottom_help_FAQ_icon" style="cursor:pointer;margin-left:3px;" target="_blank" onClick="search_supportsite();"></div></td>';
	footer_code += '</tr></table></div>\n';
	//}

	$("footer").innerHTML = footer_code;
	flash_button();
}

function search_supportsite(obj){
	var faqLang = {
		EN : "en",
		TW : "zh-tw",
		CN : "zh-cn",
		BR : "en",		
		CZ : "en",
		DA : "en",
		DE : "en",		
		ES : "es-es",
		FI : "en",
		FR : "fr-fr",
		IT : "en",
		JP : "en",				
		MS : "en",
		NO : "en",
		PL : "en",
		RU : "en",
		SV : "en",
		TH : "en",
		TR : "en",		
		UK : "en"
	}	
	
		var keywordArray = $("FAQ_input").value.split(" ");
		var faq_href;
		faq_href = "http://support.asus.com/search.htmlx?SLanguage=";
		faq_href += faqLang.EN;
		faq_href += "&keyword=";
		for(var i=0; i<keywordArray.length; i++){
			faq_href += keywordArray[i];
			faq_href += "%20";
		}
		window.open(faq_href);
}

var isFirefox = navigator.userAgent.search("Firefox") > -1;
var isOpera = navigator.userAgent.search("Opera") > -1;
var isIE8 = navigator.userAgent.search("MSIE 8") > -1; 
var isiOS = navigator.userAgent.search("iP") > -1; 
function browser_compatibility(){
	var obj_inputBtn;

	if((isFirefox || isOpera) && document.getElementById("FormTitle")){
		document.getElementById("FormTitle").className = "FormTitle_firefox";
		if(current_url.indexOf("Guest_network") == 0)
			document.getElementById("FormTitle").style.marginTop = "-140px";	
		if(current_url.indexOf("ParentalControl") == 0 && !yadns_support)
			document.getElementById("FormTitle").style.marginTop = "-140px";				
	}

	if(isiOS){
		/* language options */
		document.body.addEventListener("touchstart", mouseClick, false);

		obj_inputBtn = document.getElementsByClassName("button_gen");
		for(var i=0; i<obj_inputBtn.length; i++){
			obj_inputBtn[i].addEventListener('touchstart', function(){this.className = 'button_gen_touch';}, false);
			obj_inputBtn[i].addEventListener('touchend', function(){this.className = 'button_gen';}, false);
		}
		obj_inputBtn = document.getElementsByClassName("button_gen_long");
		for(var i=0; i<obj_inputBtn.length; i++){
			obj_inputBtn[i].addEventListener('touchstart', function(){this.className = 'button_gen_long_touch';}, false);
			obj_inputBtn[i].addEventListener('touchend', function(){this.className = 'button_gen_long';}, false);
		}
	}
}	

var mouseClick = function(){
	var e = document.createEvent('MouseEvent');
	e.initEvent('click', false, false);
	document.getElementById("modelName_top").dispatchEvent(e);
}

function show_top_status(){
	var ssid_status_2g =  decodeURIComponent('ASUS');
	var ssid_status_5g =  decodeURIComponent('ASUS%5F5G');

	if(band2g_support == -1)
		ssid_status_2g = "";

	if(band5g_support == -1)
		ssid_status_5g = "";

	if(sw_mode == 4){
		if('' == '0'){
			$("elliptic_ssid_2g").style.display = "none";
			$("elliptic_ssid_5g").style.marginLeft = "";
		}
		else
			$("elliptic_ssid_5g").style.display = "none";

		$('elliptic_ssid_2g').style.textDecoration="none";
		$('elliptic_ssid_2g').style.cursor="auto";
		$('elliptic_ssid_5g').style.textDecoration="none";
		$('elliptic_ssid_5g').style.cursor="auto";
	}
	else if(sw_mode == 2){
		if('' == '0')
			ssid_status_2g =  decodeURIComponent('ASUS%5FGuest1');
		else
			ssid_status_5g =  decodeURIComponent('ASUS%5F5G%5FGuest1');

		$('elliptic_ssid_2g').style.textDecoration="none";
		$('elliptic_ssid_2g').style.cursor="auto";
		$('elliptic_ssid_5g').style.textDecoration="none";
		$('elliptic_ssid_5g').style.cursor="auto";
	}

	if(!isFirefox){
		$("elliptic_ssid_2g").innerText = ssid_status_2g;
		$("elliptic_ssid_5g").innerText = ssid_status_5g;	
	}
	else{
		$("elliptic_ssid_2g").textContent = ssid_status_2g;
		$("elliptic_ssid_5g").textContent = ssid_status_5g;	
	}

  var swpjverno = '';
  var buildno = '372';
  var firmver = '3.0.0.4'
	var extendno = '67-g55910de';
	if(extendno == "") extendno="0";

  if(swpjverno == ''){
		showtext($("firmver"), firmver + "." + buildno + '_' + extendno.split("-g")[0]);
	}
  else{
		showtext($("firmver"), swpjverno + '_' + extendno);
  }
	
	// no_op_mode
	if (!dsl_support) {
		if(sw_mode == "1")  // Show operation mode in banner, Viz 2011.11
			$("sw_mode_span").innerHTML = "Wireless router";
		else if(sw_mode == "2")
			$("sw_mode_span").innerHTML = "Repeater mode";
		else if(sw_mode == "3")
			$("sw_mode_span").innerHTML = "Access Point(AP) mode";
		else if(sw_mode == "4")
			$("sw_mode_span").innerHTML = "Media bridge";
		else
			$("sw_mode_span").innerHTML = "Unknown";	

		if(hwmodeSwitch_support){
			$("op_link").innerHTML = $("sw_mode_span").innerHTML;	
		}
	}
}

function go_setting(page){
		location.href = page;
}

function go_setting_parent(page){
		parent.location.href = page;
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

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}

function show_loading_obj(){
	var obj = $("Loading");
	var code = "";
	
	code +='<table cellpadding="5" cellspacing="0" id="loadingBlock" class="loadingBlock" align="center">\n';
	code +='<tr>\n';
	code +='<td width="20%" height="80" align="center"><img src="images/loading.gif"></td>\n';
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

// display selected language in language bar, Viz modified at 2013/03/22
function show_selected_language(){
	switch($("preferred_lang").value){
		case 'EN':{
			$('selected_lang').innerHTML = "English";
			break;
		}
		case 'CN':{
			$('selected_lang').innerHTML = "简体中文";
			break;
		}	
		case 'TW':{
			$('selected_lang').innerHTML = "繁體中文";
			break;
		}
		case 'BR':{
			$('selected_lang').innerHTML = "Portuguese(Brazil)&nbsp&nbsp";
			break;
		}
		case 'CZ':{
			$('selected_lang').innerHTML = "Česky";
			break;
		}
		case 'DA':{
			$('selected_lang').innerHTML = "Dansk";
			break;
		}	
		case 'DE':{
			$('selected_lang').innerHTML = "Deutsch";
			break;
		}
		case 'ES':{
			$('selected_lang').innerHTML = "Español";
			break;
		}
		case 'FI':{
			$('selected_lang').innerHTML = "Finsk";
			break;
		}
		case 'FR':{
			$('selected_lang').innerHTML = "Français";
			break;
		}
		case 'HU':{
			$('selected_lang').innerHTML = "Hungarian";
			break;
		}
		case 'IT':{
			$('selected_lang').innerHTML = "Italiano";
			break;
		}		
		case 'JP':{
			$('selected_lang').innerHTML = "日本語";
			break;
		}
		case 'MS':{
			$('selected_lang').innerHTML = "Malay";
			break;
		}
		case 'NO':{
			$('selected_lang').innerHTML = "Norsk";
			break;
		}
		case 'PL':{
			$('selected_lang').innerHTML = "Polski";
			break;
		}
		case 'RO':{
			$('selected_lang').innerHTML = "Romanian";
			break;
		}
		case 'RU':{
			$('selected_lang').innerHTML = "Pусский";
			break;
		}
		case 'SV':{
			$('selected_lang').innerHTML = "Svensk";
			break;
		}		
		case 'TH':{
			$('selected_lang').innerHTML = "ไทย";
			break;
		}			
		case 'TR':{
			$('selected_lang').innerHTML = "Türkçe";
			break;
		}	
		case 'UK':{
			$('selected_lang').innerHTML = "Ukrainian";
			break;
		}		
	}
}

function submit_language(obj){
	//if($("select_lang").value != $("preferred_lang").value){
	if(obj.id != $("preferred_lang").value){
		showLoading();
		location.href = "../" + obj.id + "/" +document.form.current_page.value;
		with(document.titleForm){
			action = "/start_apply.htm";
			
			if(location.pathname == "/")
				current_page.value = "/index.html";
			else
				current_page.value = location.pathname;
				
			preferred_lang.value = obj.id;
			//preferred_lang.value = $("select_lang").value;
			flag.value = "set_language";
			
			//submit();
		}
	}
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
	if(confirm('Are you sure to logout?')){
		/*etTimeout('location = "Logout.html";', 1);*/
		location.href = "Logout.html";
	}
}

function reboot(){
	if(confirm("Rebooting the router takes about 60 seconds. Are you sure you want to reboot the router now?")){
		if(document.form.current_page){
			if(document.form.current_page.value.indexOf("Advanced_FirmwareUpgrade_Content")>=0
		  	 || document.form.current_page.value.indexOf("Advanced_SettingBackup_Content")>=0)
					document.form.removeAttribute('enctype');
		}
		showLoading(70);
		/*FormActions("apply.cgi", "reboot", "", "70");
		document.form.submit();*/
	}
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

function showhtmland(ori_str){
	var str = "", head, tail_num;
	
	head = ori_str;
	while((tail_num = head.indexOf("&")) >= 0){
		str += head.substring(0, tail_num);
		str += "&amp;";
		
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
	return event.which;
}

function is_string(o, event){
	keyPressed = event.keyCode ? event.keyCode : event.which;

	if(keyPressed >= 0 && keyPressed <= 126)
		return true;
	else{
		alert('Invalid character!');
		return false;
	}	
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
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits. If you leave this field blank, system will assign [00000000] as your passphrase.");
		psk_obj.value = "00000000";
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length > 64){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits. If you leave this field blank, system will assign [00000000] as your passphrase.");
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length >= 8 && psk_length <= 63 && !validate_string(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
		psk_obj.focus();
		psk_obj.select();
		
		return false;
	}
	
	if(psk_length == 64 && !validate_hex(psk_obj)){
		alert("Pre-shared key should be 8 to 63 characters or 64 hex digits!");
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
		if(key_obj.value.length == 5 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 10 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else{
			str += "(5 ASCII digits or 10 hex digits)";
			
			iscurrect = false;
		}
	}
	else if(wep_type == "2"){
		if(key_obj.value.length == 13 && validate_string(key_obj)){
			document.form.wl_key_type.value = 1; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
		else if(key_obj.value.length == 26 && validate_hex(key_obj)){
			document.form.wl_key_type.value = 0; /*Lock Add 11.25 for ralink platform*/
			iscurrect = true;
		}
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

function validate_account(string_obj, flag){
	var invalid_char = "";

	if(string_obj.value.charAt(0) == ' '){
		if(flag != "noalert")
			alert('This string cannot start with [  ]');

		string_obj.value = "";
		string_obj.focus();

		if(flag != "noalert")
			return false;
		else
			return 'This string cannot start with [&nbsp;&nbsp;&nbsp;]';
	}
	else if(string_obj.value.charAt(0) == '-'){
		if(flag != "noalert")
			alert('This string cannot start with [-]');

		string_obj.value = "";
		string_obj.focus();

		if(flag != "noalert")
			return false;
		else
			return 'This string cannot start with [-]';
	}

	for(var i = 0; i < string_obj.value.length; ++i){
		if(string_obj.value.charAt(i) == '"'
				||  string_obj.value.charAt(i) == '/'
				||  string_obj.value.charAt(i) == '\\'
				||  string_obj.value.charAt(i) == '['
				||  string_obj.value.charAt(i) == ']'
				||  string_obj.value.charAt(i) == ':'
				||  string_obj.value.charAt(i) == ';'
				||  string_obj.value.charAt(i) == '|'
				||  string_obj.value.charAt(i) == '='
				||  string_obj.value.charAt(i) == ','
				||  string_obj.value.charAt(i) == '+'
				||  string_obj.value.charAt(i) == '*'
				||  string_obj.value.charAt(i) == '?'
				||  string_obj.value.charAt(i) == '<'
				||  string_obj.value.charAt(i) == '>'
				||  string_obj.value.charAt(i) == '@'
				||  string_obj.value.charAt(i) == ' '
				){
			invalid_char = invalid_char+string_obj.value.charAt(i);
		}
	}

	if(invalid_char != ""){
		if(flag != "noalert")
			alert("This string cannot contain ' "+invalid_char+" ' !");

		string_obj.value = "";
		string_obj.focus();

		if(flag != "noalert")
			return false;
		else
			return "This string cannot contain ' "+invalid_char+" ' !";
	}

	if(flag != "noalert")
		return true;
	else
		return "";
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
	o.style.background = "url(images/bgaibutton.gif) #ACCCE1";
	o.style.cursor = "hand";
}

function buttonOut(o){	//Lockchou 1206 modified
	o.style.color = "#000000";
	o.style.background = "url(images/bgaibutton0.gif) #ACCCE1";
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
		prev_page = "/index.html";
	
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
		if(obj.type != "select-one")
			obj.style.backgroundColor = "#CCCCCC";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#475A5F";
		if(obj.type == "text" || obj.type == "password")
			obj.style.backgroundImage = "url(images/New_ui/inputbg_disable.png)";
	}
	else{
		obj.disabled = false;
		if(obj.type != "select-one")	
			obj.style.backgroundColor = "#FFF";
		if(obj.type == "radio" || obj.type == "checkbox")
			obj.style.backgroundColor = "#475A5F";
		if(obj.type == "text" || obj.type == "password")
			obj.style.backgroundImage = "url(images/New_ui/inputbg.png)";
	}

	if(current_url.indexOf("Advanced_Wireless_Content") == 0
	|| current_url.indexOf("Advanced_WAN_Content") == 0
	|| current_url.indexOf("Guest_network") == 0
	|| current_url.indexOf("Advanced_PerformanceTuning_Content") == 0
	|| current_url.indexOf("Advanced_Modem_Content") == 0
	|| current_url.indexOf("QIS_modem") == 0
	|| current_url.indexOf("Advanced_IPv6_Content") == 0
	|| current_url.indexOf("Advanced_WAdvanced_Content") == 0
	|| current_url.indexOf("Advanced_IPTV_Content") == 0
	|| current_url.indexOf("Advanced_WANPort_Content.html") == 0
	|| current_url.indexOf("Advanced_ASUSDDNS_Content.html") == 0
	|| current_url.indexOf("Advanced_DSL_Content.html") == 0
	|| current_url.indexOf("Advanced_SwitchCtrl_Content.html") == 0
	){
		if(obj.type == "checkbox")
			return true;
		if(flag == 0)
			obj.parentNode.parentNode.style.display = "none";
		else
			obj.parentNode.parentNode.style.display = "";
		return true;
	}
}

function inputHideCtrl(obj, flag){
	if(obj.type == "checkbox")
		return true;
	if(flag == 0)
		obj.parentNode.parentNode.style.display = "none";
	else
		obj.parentNode.parentNode.style.display = "";
	return true;
}

//Update current status via AJAX
var http_request_status = false;

function updateStatus_AJAX(){
	if(stopFlag == 1)
		return false;

	var ie = window.ActiveXObject;

	if(ie)
		makeRequest_status_ie('/ajax_status.html');
	else
		makeRequest_status('/ajax_status.html');
}

function makeRequest_status(url) {
	http_request_status = new XMLHttpRequest();
	if (http_request_status && http_request_status.overrideMimeType)
		http_request_status.overrideMimeType('text/xml');
	else
		return false;

	http_request_status.onreadystatechange = alertContents_status;
	http_request_status.open('GET', url, true);
	http_request_status.send(null);
}

var xmlDoc_ie;

function makeRequest_status_ie(file)
{
	xmlDoc_ie = new ActiveXObject("Microsoft.XMLDOM");
	xmlDoc_ie.async = false;
	if (xmlDoc_ie.readyState==4)
	{
		xmlDoc_ie.load(file);
		setTimeout("refresh_info_status(xmlDoc_ie);", 1000);
	}
}

function alertContents_status()
{
	if (http_request_status != null && http_request_status.readyState != null && http_request_status.readyState == 4)
	{
		if (http_request_status.status != null && http_request_status.status == 200)
		{
			var xmldoc_mz = http_request_status.responseXML;
			refresh_info_status(xmldoc_mz);
		}
	}
}

function updateUSBStatus(){
	if(current_url == "index.html" || current_url == ""){
		return true;
		detectUSBStatusIndex();
	}	
	else
		detectUSBStatus();
}

function detectUSBStatus(){
	$j.ajax({
    		url: '/update_diskinfo.html',
    		dataType: 'script',
    		error: function(xhr){
    			detectUSBStatus();
    		},
    		success: function(){
					return true;
  			}
  });
}

var link_status;
var link_auxstatus;
var link_sbstatus;
var usb_path1;
var usb_path2;
var usb_path1_tmp = "init";
var usb_path2_tmp = "init";
var usb_path1_removed;
var usb_path2_removed;
var usb_path1_removed_tmp = "init";
var usb_path2_removed_tmp = "init";
var ddns_return_code = '';
var ddns_updated = '';

function refresh_info_status(xmldoc)
{
	/*var devicemapXML = xmldoc.getElementsByTagName("devicemap");
	var wanStatus = devicemapXML[0].getElementsByTagName("wan");*/
	link_status = 2;
	link_sbstatus = 0;
	link_auxstatus = 0;
	usb_path1 = "usb=storage";
	usb_path2 = "usb=printer";
	monoClient = "monoClient=";	
	cooler = "cooler=";	
	_wlc_state = "wlc_state=0";
	_wlc_sbstate = "wlc_sbstate=0";	
	_wlc_auth = "psta:wlc_state=0;wlc_state_auth=0;";	
	wifi_hw_switch = "wifi_hw_switch=1";
	usb_path1_removed = "umount=0";	
	usb_path2_removed = "umount=0";
	ddns_return_code = "ddnsRet=";
	ddns_updated = "ddnsUpdate=";
	wan_line_state = "wan_line_state=";
	wlan0_radio_flag = "wlan0_radio_flag=1";
	wlan1_radio_flag = "wlan1_radio_flag=1";

	if(location.pathname == "/"+ QISWIZARD)
		return false;	

	// internet
	if(sw_mode == 1){
		//Viz add 2013.04 for dsl sync status
		if(dsl_support){		
				if(wan_line_state == "up"){
						$("adsl_line_status").className = "linestatusup";			
						$("adsl_line_status").onclick = function(){openHint(24,6);}
				}else if(wan_line_state == "wait for init"){
						$("adsl_line_status").className = "linestatuselse";
				}else if(wan_line_state == "init"){
						$("adsl_line_status").className = "linestatuselse";
				}else{
						$("adsl_line_status").className = "linestatusdown";
				}		
				$("adsl_line_status").onmouseover = function(){overHint(9);}
				$("adsl_line_status").onmouseout = function(){nd();}
		}
						
		if((link_status == "2" && link_auxstatus == "0") || (link_status == "2" && link_auxstatus == "2")){
			$("connect_status").className = "connectstatuson";
			$("connect_status").onclick = function(){openHint(24,3);}
			if(location.pathname == "/" || location.pathname == "/index.html"){
				$("NM_connect_status").innerHTML = "Connected";
				$('single_wan').src = "images/New_ui/networkmap/line_dualwan.png";
			}	
		}
		else{
			$("connect_status").className = "connectstatusoff";
			if(_wlc_sbstate == "wlc_sbstate=2")
				$("connect_status").onclick = function(){openHint(24,3);}
			else
				$("connect_status").onclick = function(){overHint(3);}

			if(location.pathname == "/" || location.pathname == "/index.html"){
				$("NM_connect_status").innerHTML = '<a style="color:#FFF;text-decoration:underline;" href="/'+ QISWIZARD +'?flag=detect">Disconnected</a>';
				$('single_wan').src = "images/New_ui/networkmap/line_dualwan_disconnected.png";
				$("wanIP_div").style.display = "none";		
			}
		}
		$("connect_status").onmouseover = function(){overHint(3);}
		$("connect_status").onmouseout = function(){nd();}
	}
	else if(sw_mode == 2 || sw_mode == 4){
		if(sw_mode == 4){
			if(wanStatus[10].firstChild.nodeValue.search("wlc_state=1") != -1 && wanStatus[10].firstChild.nodeValue.search("wlc_state_auth=0") != -1)
				_wlc_state = "wlc_state=2";
			else
				_wlc_state = "wlc_state=0";
		}

		if(_wlc_state == "wlc_state=2"){
			$("connect_status").className = "connectstatuson";
			$("connect_status").onclick = function(){openHint(24,3);}
			if(location.pathname == "/" || location.pathname == "/index.html"){
				$("NM_connect_status").innerHTML = "Connected";
				$('single_wan').src = "images/New_ui/networkmap/line_dualwan.png";
			}	
		}
		else{
			$("connect_status").className = "connectstatusoff";
			if(location.pathname == "/" || location.pathname == "/index.html"){
			  $("NM_connect_status").innerHTML = "Disconnected";		 
			  $('single_wan').src = "images/New_ui/networkmap/line_dualwan_disconnected.png";
			}	
		}
		$("connect_status").onmouseover = function(){overHint(3);}
		$("connect_status").onmouseout = function(){nd();}
	}

	// wifi hw sw status
	if(wifi_hw_sw_support){
		if(band5g_support != -1){
				if(wlan0_radio_flag == "0" && wlan1_radio_flag == "0"){
						$("wifi_hw_sw_status").className = "wifihwswstatusoff";
						$("wifi_hw_sw_status").onclick = function(){}
				}
				else{
						$("wifi_hw_sw_status").className = "wifihwswstatuson";
						$("wifi_hw_sw_status").onclick = function(){}
				}
		}
		else{
				if(wlan0_radio_flag == "0"){
						$("wifi_hw_sw_status").className = "wifihwswstatusoff";
						$("wifi_hw_sw_status").onclick = function(){}
				}
				else{
						$("wifi_hw_sw_status").className = "wifihwswstatuson";
						$("wifi_hw_sw_status").onclick = function(){}
				}
		}		
		$("wifi_hw_sw_status").onmouseover = function(){overHint(8);}
		$("wifi_hw_sw_status").onmouseout = function(){nd();}		
	}	

	// usb
	if(usb_support != -1){
		if(current_url=="index.html"||current_url==""){
			if((usb_path1_removed != usb_path1_removed_tmp && usb_path1_removed_tmp != "init")){
				location.href = "/index.html";
			}
			else if(usb_path1_removed == "umount=0"){ // umount=0->umount=0, 0->storage
				if((usb_path1 != usb_path1_tmp && usb_path1_tmp != "init"))
					location.href = "/index.html";
			}

			if((usb_path2_removed != usb_path2_removed_tmp && usb_path2_removed_tmp != "init")){
				location.href = "/index.html";
			}
			else if(usb_path2_removed == "umount=0"){ // umount=0->umount=0, 0->storage
				if((usb_path2 != usb_path2_tmp && usb_path2_tmp != "init"))
					location.href = "/index.html";
			}
		}

		if(usb_path1_removed == "umount=1")
			usb_path1 = "usb=";

		if(usb_path2_removed == "umount=1")
			usb_path2 = "usb=";

		if(usb_path1 == "usb=" && usb_path2 == "usb="){
			$("usb_status").className = "usbstatusoff";
			$("usb_status").onclick = function(){overHint(2);}
			if(printer_support != -1){
				$("printer_status").className = "printstatusoff";
				$("printer_status").onclick = function(){overHint(5);}
				$("printer_status").onmouseover = function(){overHint(5);}
				$("printer_status").onmouseout = function(){nd();}
			}
		}
		else{
			if(usb_path1 == "usb=printer" || usb_path2 == "usb=printer"){ // printer
				if((current_url == "index.html" || current_url == "") && $("printerName0") == null && $("printerName1") == null)
					updateUSBStatus();
				if(printer_support != -1){
					$("printer_status").className = "printstatuson";
					$("printer_status").onmouseover = function(){overHint(6);}
					$("printer_status").onmouseout = function(){nd();}
					$("printer_status").onclick = function(){openHint(24,1);}
				}
				if(usb_path1 == "usb=" || usb_path2 == "usb=")
					$("usb_status").className = "usbstatusoff";			
				else
					$("usb_status").className = "usbstatuson";
			}
			else{ // !printer
				if((current_url == "index.html" || current_url == "") && ($("printerName0") != null || $("printerName1") != null))
					location.href = "/index.html";

				if(printer_support != -1){
					$("printer_status").className = "printstatusoff";
					$("printer_status").onmouseover = function(){overHint(5);}
					$("printer_status").onmouseout = function(){nd();}
				}

				$("usb_status").className = "usbstatuson";
			}
			$("usb_status").onclick = function(){openHint(24,2);}
		}
		$("usb_status").onmouseover = function(){overHint(2);}
		$("usb_status").onmouseout = function(){nd();}

		usb_path1_tmp = usb_path1;
		usb_path2_tmp = usb_path2;
		usb_path1_removed_tmp = usb_path1_removed;
		usb_path2_removed_tmp = usb_path2_removed;
	}

	// guest network
	if(multissid_support != -1 && gn_array_5g.length > 0){
		for(var i=0; i<gn_array_2g.length; i++){
			if(gn_array_2g[i][0] == 1 || gn_array_5g[i][0] == 1){
				$("guestnetwork_status").className = "guestnetworkstatuson";
				$("guestnetwork_status").onclick = function(){openHint(24,4);}
				break;
			}
			else{
				$("guestnetwork_status").className = "guestnetworkstatusoff";
				$("guestnetwork_status").onclick = function(){overHint(4);}
			}
		}
		$("guestnetwork_status").onmouseover = function(){overHint(4);}
		$("guestnetwork_status").onmouseout = function(){nd();}
	}
	else if(multissid_support != -1 && gn_array_5g.length == 0){
		for(var i=0; i<gn_array_2g.length; i++){
			if(gn_array_2g[i][0] == 1){
				$("guestnetwork_status").className = "guestnetworkstatuson";
				$("guestnetwork_status").onclick = function(){openHint(24,4);}
				break;
			}
			else{
				$("guestnetwork_status").className = "guestnetworkstatusoff";
			}
		}
		$("guestnetwork_status").onmouseover = function(){overHint(4);}
		$("guestnetwork_status").onmouseout = function(){nd();}
	}

	if(cooler_support != -1){
		if(cooler == "cooler=2"){
			$("cooler_status").className = "coolerstatusoff";
			$("cooler_status").onclick = function(){}
		}
		else{
			$("cooler_status").className = "coolerstatuson";
			$("cooler_status").onclick = function(){openHint(24,5);}
		}
		$("cooler_status").onmouseover = function(){overHint(7);}
		$("cooler_status").onmouseout = function(){nd();}
	}

	if(window.frames["statusframe"] && window.frames["statusframe"].stopFlag == 1 || stopFlag == 1){
		return 0;
	}

	//setTimeout("updateStatus_AJAX();", 3000);
}

function db(obj){
	if(typeof console == 'object')
		console.log(obj);
}

function dbObj(obj){
	for(var j in obj){	
		if(j!="textContent" && j!="outerHTML" && j!="innerHTML" && j!="innerText" && j!="outerText")
			db(j+" : "+obj[j]);
	}
}

function FormActions(_Action, _ActionMode, _ActionScript, _ActionWait){
	if(_Action != "")
		document.form.action = _Action;
	if(_ActionMode != "")
		document.form.action_mode.value = _ActionMode;
	if(_ActionScript != "")
		document.form.action_script.value = _ActionScript;
	if(_ActionWait != "")
		document.form.action_wait.value = _ActionWait;
}

function change_wl_unit(){
	FormActions("apply.cgi", "change_wl_unit", "", "");
	document.form.target = "";
	document.form.submit();
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

function addNewScript(scriptName){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = scriptName;
	document.getElementsByTagName("head")[0].appendChild(script);
}

function addNewCSS(cssName){
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = cssName;
	document.getElementsByTagName("head")[0].appendChild(cssNode);
}

var cookie_help = {
	set: function(key, value, days) {
		document.cookie = key + '=' + value + '; expires=' +
			(new Date(new Date().getTime() + ((days ? days : 14) * 86400000))).toUTCString() + '; path=/';
	}
};

function getCookie_help(c_name){
	if (document.cookie.length > 0){ 
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1 
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		} 
	}
	return null;
}

function unload_body(){
}

function enableCheckChangedStatus(){
}

function disableCheckChangedStatus(){
	stopFlag = 1;
}

function get_changed_status(){
}

function isMobile(){
	if((navigator.userAgent.match(/iPhone/i))  || 
     (navigator.userAgent.match(/iPod/i))    ||
     (navigator.userAgent.match(/Android/i)) && (navigator.userAgent.match(/Mobile/i))){
		return true;
	}
	else{
		return false;
	}
}

var stopAutoFocus;
function autoFocus(str){
	if(str == "")
		return false;

	stopAutoFocus = 0;
	if(document.form){
		for(var i = 0; i < document.form.length; i++){
			if(document.form[i].name == str){
				var sec = 600;
				var maxAF = 20;
				if(navigator.userAgent.toLowerCase().search("webkit") < 0){
					window.onclick = function(){stopAutoFocus=1;document.form[i].style.border='';}
					for(var j=0; j<maxAF; j++){
						setTimeout("if(stopAutoFocus==0)document.form["+i+"].style.border='1px solid #56B4EF';", sec*j++);
						setTimeout("if(stopAutoFocus==0)document.form["+i+"].style.border='';", sec*j);							
					}
				}
				else{
					window.onclick = function(){stopAutoFocus=1;}
					document.form[i].focus();
					for(var j=1; j<maxAF; j++){
						setTimeout("if(stopAutoFocus==0)document.form["+i+"].blur();", sec*j++);
						setTimeout("if(stopAutoFocus==0)document.form["+i+"].focus();", sec*j);
					}
				}
				break;
			}
		}
	}
}

function charToAscii(str){
	var retAscii = "";
	for(var i = 0; i < str.length; i++){
		retAscii += "%";
		retAscii += str.charCodeAt(i).toString(16).toUpperCase();
	}
	return retAscii;
}

function set_variable(_variable, _val){
	var NewInput = document.createElement("input");
	NewInput.type = "hidden";
	NewInput.name = _variable;
	NewInput.value = _val;
	document.form.appendChild(NewInput);
}

function isPortConflict(_val){
	if(_val == '80')
		return "This port is for HTTP LAN port.";
	else if(_val == '')
		return "This port is for Download Master.";
	else if(_val == '8082')
		return "This port is for Cloud Disk.";
	else if(_val == '443')
		return "This port is for Cloud Disk.";
	else
		return false;
}

//Jieming added at 2013.05.24, to switch type of password to text or password
//for IE, need to use two input field and ID should be "xxx", "xxx_text" 
var isNotIE = (navigator.userAgent.search("MSIE") == -1); 
function switchType(obj, _method){
	if(isNotIE){
		$(obj.id).type = _method ? "text" : "password";	
	}
	else{
		var tmp = "";
		tmp = obj.value;
		obj.style.display = "none";
		if(obj.id.indexOf('text') < 0){		// for password	
			$(obj.id + "_text").style.display = "";
			$(obj.id + "_text").value = tmp;
			$(obj.id + "_text").focus();					
		}else{								//for plain text					
			$(obj.id.split('_text')[0]).style.display = "";
			$(obj.id.split('_text')[0]).value = tmp;						
		}
	}	
}
