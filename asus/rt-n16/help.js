var helptitle = new Array(19);
// Wireless
helptitle[0] = [["", ""],
				["SSID", "wl_ssid"],
				["Hide SSID", "wl_closed"],				
				["Channel", "wl_channel"],
				["Wireless Mode", "wl_gmode"],
				["Authentication Method", "wl_auth_mode"],
				["WPA Encryption", "wl_crypto"],
				["WPA Pre-Shared Key", "wl_wpa_psk"],
				["ASUS Passphrase", "wl_phrase_x"],
				["WEP Encryption", "wl_wep_x"],
				["Key Index", "wl_key"],
				["Network Key Rotation Interval", "wl_wpa_gtk_rekey"],
				["WEP Key", "wl_asuskey1"],
				["WEP Key", "wl_asuskey1"],
				["Channel bandwidth", "HT_BW"],
				["Extension Channel", "HT_EXTCHA"]				
				];
helptitle[1] = [["", ""],
				["AP Mode", "wl_mode_x"],
				["Channel", "wl_channel"],
				["Connect to APs in list?", "wl_wdsapply_x"]];
helptitle[2] = [["", ""],
				["Server IP Address", "wl_radius_ipaddr"],
				["Server Port", "wl_radius_port"],
				["Connection Secret", "wl_radius_key"]];
helptitle[3] = [["", ""],
				["Enable Radio?", "wl_radio_x"],
				["Date to Enable Radio", "wl_radio_date_x_"],
				["Time of Day to Enable Radio", "wl_radio_time_x_"],
				["Enable AfterBurner?", "wl_afterburner"],
				["Set AP Isolated?", "wl_ap_isolate"], // 5
				["Data Rate(Mbps)", "wl_rate"],
				["Multicast Rate(Mbps)", "wl_mrate"],
				["Basic Rate Set", "wl_rateset"],
				["Fragmentation Threshold", "wl_frag"],
				["RTS Threshold", "wl_rts"], // 10
				["DTIM Interval", "wl_dtim"],
				["Beacon Interval", "wl_bcn"],
				["Enable TX Bursting?", "TxBurst"],
				["Enable WMM?", "wl_wme"],
				["Enable WMM No-Acknowledgement?", "wl_wme_no_ack"], // 15
				["Enable Packet Aggregation?", "PktAggregate"],
				["Enable WMM APSD?", "APSDCapable"],
				["Enable WMM DLS?", "DLSCapable"],
				["Enable Greenfield?", "wl_mimo_preamble"],
				["Preamble Type", "wl_plcphdr"] // 20
				];
// LAN
helptitle[4] = [["", ""],
				["IP Address", "lan_ipaddr"],
				["Subnet Mask", "lan_netmask"],
				["Default Gateway", "lan_gateway"]];
helptitle[5] = [["", ""],
			 	["Enable the DHCP Server?", "dhcp_enable_x"],
				["RT-N16's Domain Name", "lan_domain"],
				["IP Pool Starting Address", "dhcp_start"],
				["IP Pool Ending Address", "dhcp_end"],
				["Lease Time", "dhcp_lease"],
				["Default Gateway", "dhcp_gateway_x"],
				["DNS Server", "dhcp_dns1_x"],
				["WINS Server", "dhcp_wins_x"]];
helptitle[6] = [["", ""],
				["Network/Host IP", "sr_ipaddr_x_0"],
				["Netmask", "sr_netmask_x_0"],
				["Gateway", "sr_gateway_x_0"],
				["Metric ", "sr_matric_x_0"],
				["Interface", "sr_if_x_0"]];
// WAN
helptitle[7] = [["", ""],
				["IP Address", "wan_ipaddr"],
				["Subnet Mask", "wan_netmask"],
				["Default Gateway", "wan_gateway"],
				["User Name", "wan_pppoe_username"],
				["Password", "wan_pppoe_passwd"],
				["Idle Disconnect Time in seconds: Disconnect after time of inactivity (in seconds):", "wan_pppoe_idletime"],
				["MTU", "wan_pppoe_mtu"],
				["MRU", "wan_pppoe_mru"],
				["Service Name", "wan_pppoe_service"],
				["Access Concentrator Name", "wan_pppoe_ac"],
				["Enable PPPoE Relay?", "wan_pppoe_relay_x"],
				["Connect to DNS Server automatically?", "wan_dnsenable_x"],
				["DNS Server1", "wan_dns1_x"],
				["DNS Server2", "wan_dns2_x"],
				["Host Name", "wan_hostname"],
				["MAC Address", "wan_hwaddr_x"],
				["PPTP Options", "wan_pptp_options_x"],
				["Additional pppd options", "wan_pppoe_options_x"],
				["VPN Server", "wan_heartbeat_x"],
				["Starcraft(Battle.Net)", "sp_battle_ips"]];
//Firewall
helptitle[8] = [["", ""],
				["Logged packets type", "fw_log_x"],
				["Enable Web Access from WAN?", "misc_http_x"],
				["Port of Web Access from WAN:", "misc_httpport_x"],
				["Respond LPR Request from WAN?", "misc_lpr_x"],
				["Respond Ping Request from WAN?", "misc_ping_x"],
				["Enable Firewall?", "fw_enable_x"]];
helptitle[9] = [["", ""],
				["Date to Enable URL Filter", "url_date_x_"],
				["Time of Day to Enable URL Filter", "url_time_x_"]];
helptitle[10] = [["", ""],
				["Date to Enable Filter Table", "filter_lw_date_x_"],
				["Time of Day to Enable Filter Table", "filter_lw_time_x_"],
				["Packets not specified will be", "filter_lw_default_x"],
				["Filtered ICMP packet types", "filter_lw_icmp_x"],
				["Enable LAN to WAN Filter? ", "fw_lw_enable_x"]];
//Administration
helptitle[11] = [["", ""],
				["Remote Log Server", "log_ipaddr"],
				["Time Zone", "time_zone"],
				["NTP Server", "ntp_server0"]];
//Log
helptitle[12] = [["", ""],
				["Boot time", "system_now_time"],
				["Printer Model", ""],
				["Printer Status", ""],
				["User in use", ""]];
//WPS
helptitle[13] = [["", ""],
				["Enable WPS", ""],
				["WPS Method", ""],
				["Client PIN Code", ""],
				["AP PIN Code", ""]];
//UPnP
helptitle[14] = [["", ""],
				["UPnP Media Server", ""]];
//AiDisk Wizard
helptitle[15] = [["", ""],
				["<a href='../Advanced_AiDisk_samba.html' target='_parent' hidefocus='true'>USB Application</a>", ""],
				["Creating the access rights", ""],
				["Setting up the DDNS services", ""],
				["Setting up the shared disk", ""]];

helptitle[16] = [["", ""],
				["About EzQoS", ""]];
//Others in the USB application
helptitle[17] = [["", ""],
				["Maximum Login User", "st_max_user"],
				["Device Name", "computer_name"],
				["Work Group", "st_samba_workgroup"],
				["Enable Download Master?", "apps_dl"],
				["Enable Download Share?", "apps_dl_share"],
				["Enable UPnP?", "upnp_enable"],
				["Initial Script", "run_prog"]];
// MAC filter
helptitle[18] = [["", ""],
				["MAC Filter Mode", "macfilter_enable_x"]];
// Setting
helptitle[19] = [["", ""],
				["Factory default", ""],
				["Save setting", ""],
				["Restore setting", ""]];
// QoS
helptitle[20] = [["", ""],
				["Measured uplink speed", ""],
				["Manual uplink speed", "qos_manual_ubw"]];
// HSDPA
helptitle[21] = [["", ""],
				["HSDPA mode", "hsdpa_mode"],
				["PIN code", "pin_code"],
				["APN service(optional)", "private_apn"],
				["HSDPAMTU", "wan_hsdpa_mtu"],
				["HSDPAMRU", "wan_hsdpa_mru"],
				["DNS Server1", "wan2_dns1_x"],
				["DNS Server2", "wan2_dns2_x"]];

var helpcontent = new Array(19);
helpcontent[0] = new Array("",
						   "Assign an identification string of up to 32 characters for your wireless connection.",
						   "If [YES] is selected, your SSID does not show in site surveys by wireless mobile clients and they can only connect to your ASUS Wireless Router with your SSID of AP. ",						   
						   "The radio channel for wireless connection operation.",
						   "This item allows you to select any of these options for the Wireless Mode of your 802.11n interface. <p>[Auto]: Allows 802.11n, 802.11g, and 802.11b clients to connect to RT-N16.</p><p>[b/g Mixed]: Allows 802.11b/g/n clients to connect to RT-N16, but 802.11n clients only run at a speed of 54Mbps.</p><p>[n Only]: Maximizes performance, but does not allow 802.11g and 802.11b clients to connect to your device.</p><p>Check b/g Protection to enable b/g Protection for 11g or 11b traffic.</p>",
						   "This field enables the authentication methods for wireless clients.",
						   "Enable WPA Encyption to encrypt data.",
						   "This field requires a password of 8 to 63 characters to start the encryption process . If you leave this field blank, the default [00000000] will be assigned as your password.",
						   "Select [WEP-64bits] or [WEP-128bits] in WEP encryption field to generate four WEP keys automatically.",
						   "Enable WEP Encyption to encrypt data.",
						   "Set the WEP key to transmit data on your wireless.",
						   "This field specifies the interval (in seconds) after which a WPA group key is changed . Enter [0] (zero) to indicate that a periodic key-change is not required.",
						   "5 ASCII digits or 10 hex digits",
						   "13 ASCII digits or 26 hex digits",
						   "Selecting a wider channel bandwidth provides you with a higher transmission speed.",
						   "Select the extension channel used in the 20/40MHz channel bandwidth mode. 802.11n uses the extension channel to get extra speed.");
helpcontent[1] = new Array("",
						   "Select [AP Only] to disable Wireless Bridge function. Select [WDS Only] to disable local wireless station connection. Select [Hybrid] to enable Wireless bridge function and wireless stations will be able to  connect to the AP.",
						   "The radio channel for wireless connection operation.",
						   "Select [Yes] to connect RT-N16 to other APs listed in the Remote Bridge List.");
helpcontent[2] = new Array("",
						   "The IP address of the RADIUS server for 802.1X wireless authentication and dynamic WEP key derivation.",
						   "The UDP port number for connection to the RADIUS server.",
						   "The password to connect to the RADIUS server.");
helpcontent[3] = new Array("",
						   "Select [Yes] to enable Radio function.",
						   "This field defines the dates that wireless function is enabled.",
						   "This field defines the time interval that wireless function is enabled.",
						   "When AfterBurner is enabled, using the wireless card (with Afterburner capability) to connect to the router improves transmission performance. AfterBurner mode requires: [Authentication Method] be set to [Open System or Shared Key], [AP Mode] be set to [AP only], and [Allow Anonymous] set to [No].",
						   "Select [YES] to allow off the connection among the wireless mobile clients.", 	//5
						   "This field allows you to select the transmission rate.[Auto] is recommended to maximize performance.",
						   "Select the multicast transmission rate. You are recommended to select Auto to maximize performance.",
						   "This field indicates the basic rates that wireless client must support.",
						   "Fragmentation Threshold sets the frame size of incoming messages (ranging from 256 to 2346 bytes) used as fragmentation boundary. If the frame size is too big, the heavy interference affects transmission reliability. If the frame size is too small, it decreases transmission efficiency.",
						   "Lower the signal RTS (Request To Send) to promote the transmission efficiency in condition of noisy environment or too many clients.", 		//10
						   "DTIM (Delivery Traffic Indication Message) is included in Beacon packet.The DTIM Interval (1-255) means the period of time to wake up wireless clients from Sleep Mode. The default value is 1.",
						   "Beacon Interval means the period of time between one beacon and the next one. The default value is 100 (the unit is millisecond, or 1/1000 second). Lower the Beacon Interval to improve transmission performance in unstable environment or for roaming clients, but it will be power consuming.",
						   "Selecting [Enable] enables TX Bursting to improve the transmission speed (from AP to client) of g/n devices.",
						   "Enable WMM (Wi-Fi Multimedia) to improve user experience of multimedia applications on your wireless network.",
						   "[No-Acknowledgement] is the acknowledge policy at MAC level. When enabled, it results in more efficient throughput but higher error rates in a noisy Radio Frequency (RF) environment.",	//15
						   "Selecting [Enable] enables Packet Aggregation to increase the delivered bandwidth in your network.",
						   "Enable or Disable WMM APSD (Automatic Power Save Delivery).",
						   "Enable or Disable WMM DLS (Direct Link Setup).",
						   "Selecting [Green Field] enables Greenfield to allow the network to ignore earlier standards.",
						   "The Preamble type defines the length of the CRC (Cyclic Redundancy Check) block which is a technique for detecting data transmission errors. We suggest that you configure all wireless devices to the same type. Short preambles improve throughput but all clients in the wireless network must support this capacity if selected."	//20
						   //"");
						   );
helpcontent[4] = new Array("",
						   "The LAN IP address of RT-N16. The default value is 192.168.1.1.",
						   "The LAN subnet mask of RT-N16. The default value is 255.255.255.0.",
						   "This is the IP address of default gateway for Access Point");
helpcontent[5] = new Array("",
							 "DHCP server administers and assigns IP addresses for LAN clients automatically.",
							 "The Domain Name for clients who request IP Address from the DHCP Server.",
							 "The first address in the pool to be assigned by the DHCP server in LAN.",
							 "This field indicates the last address in the pool to be assigned by the DHCP server in LAN.",
							 "The amount of connection time with the current dynamic IP address.",
							 "This field indicates the IP address of gateway in your LAN. If you leave it blank, the IP address of RT-N16 will be assigned.",
							 "This field indicates the IP address of DNS to provide to clients that request IP Address from DHCP Server. You can leave it blank, then the DNS request will be processed by RT-N16.",
							 "The Windows Internet Naming Service manages interaction of each PC with the Internet. If you use a WINS server, enter IP Address of server here.");
helpcontent[6] = new Array("",
						   "It stands for the destination network or host of a route rule. So it could be a host address, such as 「192.168.123.11」 or a network address, such as 「192.168.0.0」.",
						   "It indicates how many bits are for network ID and subnet ID. For example: if the dotted-decimal netmask is 255.255.255.0, then its netmask bits is 24. If the destination is a host, its netmask bits should be 32.",
						   "It stands for the IP address of gateway where packets are routed to. The specified gateway must be reachable first. It means you have to set up a static route to the gateway beforehand.",
						   "Metric is a value of distance for the network",
						   "Network interface that the route rule apply to.");
//WAN
helpcontent[7] = new Array("",
							 "This is the IP address of RT-N16 as seen on the remote network.",
							 "This is the Subnet Mask of RT-N16 as seen on the remote network.",
							 "This is the IP address of the default gateway that allows for contact between RT-N16 and the remote network or host.",
							 "This field is only available when you set WAN Connection Type as PPPoE or PPTP.",
							 "This field is only available when you set WAN Connection Type as PPPoE.",
							 "This field is optional and allows you to configure to terminate your ISP connection after a specified period of time. A value of zero allows infinite idle time. If Tx Only is checked, the data from Internet will be skipped for counting idle time. If Tx Only is checked, Internet activity such as downloading data, is not counted as idle time.",
							 "That is It means Maximum Transmission Unit(MTU) of PPPoE packet.",
							 "That is It means Maximum Receive Unit(MRU) of PPPoE packet.",
							 "This field is optional and may be specified by some ISPs. Check with your ISP and fill them in if required.",
							 "This field is optional and may be specified by some ISPs. Check with your ISP and fill them in if required.",
							 "Enable PPPoE relay allows stations in LAN to set up individual PPPoE connections that passes through NAT.",
							 "This field allows you to get the DNS IP address from the remote network automatically.",
							 "This field indicates the IP address of DNS that RT-N16 contact to.",
							 "This field indicates the IP address of DNS that RT-N16 contact to.",
							 "This field allows you to provide a host name for RT-N16. It is usually requested by your ISP.",
							 "This field allows you to provide a unique MAC address for RT-N16 to connect Internet. It is usually requested by your ISP.",
							 "This item may be specified by some ISPs. Check with your ISP and fill them in if required.",
							 "This item may be specified by some ISPs. Check with your ISP and fill them in if required.",
							 "If your WAN connection type is PPTP or L2TP, Please enter the server name or server ip of the VPN server.",
							 "Selecting Yes allows multiple players in the LAN to play Starcraft at the same time.");
//Firewall
helpcontent[8] = new Array("",
						   "This field indicates the kind of packets logged between LAN and WAN.",
						   "This feature allows you to config RT-N16 from the Internet. If you are under Home Gateway mode, please access RT-N16 with 8080 port(i.e. http://Your WAN IP:8080).",
						   "To specify the port used to config RT-N16 from the Internet. The default port is 8080.",
						   "Allows RT-N16 to respond LPR request from WAN.",
						   "This feature allows you to respond to ping request from WAN.",
						   "If you disable the firewall function, we will disable related function below. Ex.disable Web Access from WAN.");
helpcontent[9] = new Array("",
						   "This field defines the dates that URL filter will be enabled.",
						   "This field defines the time interval that URL filter will be enabled. Please enter different start and end time. If start time is later than end time, the function will work cross midnight.");
helpcontent[10] = new Array("",
							"This field defines the dates that rules in filter table will be enabled.",
							"This field defines the time interval that rules in filter table will be enabled.",
							"This field defines those LAN to WAN packets which are not specified in Filter Table will be accepted or dropped.",
							"This field defines a list of LAN to WAN ICMP packets type that will be filtered. For example, if you would like to filter Echo(type 8) and Echo Reply(type 0) ICMP packets, you need to enter a string with numbers separated by blank, such as, [0 8].",
							"Select [Yes] to enable filter. RT-N16 will filter packets that match the specified rules in table during the time period.");
//Administration
helpcontent[11] = new Array("",
							"This field allows to assign a remote server to record log messages of RT-N16. If you leave it blank, the system will record up to 1024 messages on RT-N16.",
							"The standard time in your area or locality.",
							"To synchronize your system time with NTP Server.");
//Log
helpcontent[12] = new Array("",
							"Elapsed time since system boot",
							"Printer model connect to RT-N16.",
							"Current status of printer",
							"IP address of user which using this printer.");
//WPS
helpcontent[13] = new Array("",
							"Selecting Yes allows Wi-Fi Protected Setup (WPS) to simplify the process of connecting any device to the wireless network.WPS support the authentication of Open system, WPA-Personal, WPA2-Personal. Not support Shared Key, WPA-Enterprise, WPA2-Enterprise and Radius.",
							"Selecting PIN (Personal Information Number) you have to enter a number to establish a wireless connection. Select PBC (Push Button Configuration) you have to push a button (the Apply button on this page) to establish a wireless connection.",
							"Key in an eight-digit number for the PIN code and click [Connect].",
							"Remember the PIN code of AP(the same as PIN code in the bottom of RT-N16).<p>Input this PIN code in client's WPS utility and utility will config the wireless security setting of RT-N16.</p>");
//UPnP
helpcontent[14] = new Array("",
							"RT-N16 supports UPnP standards. You can enable it and allow other UPnP devices, such as PS3 or a digital media player, to access the multimedia files in the USB disk.");
//AiDisk Wizard
helpcontent[15] = new Array("",
							"For advanced file-sharing configuration.",
							//"RT-N16 provides you with these three types of access rights to the shared resources:<p> a) limitless access rights, in which anyone can access your USB disk in the FTP server.</p> <p>b) limited access rights, in which access to your USB disk is limited to those you have assigned access rights. For this type, the RT-N16 creates the \"admin/family\" accounts. </p> <p>c) admin rights in which the RT-N16 creates the \"admin\" account for full access rights.</p><span style='color:#CC0000'>PS. Account management function cannot work on NTFS partition.</span>",
							"RT-N16 provides you with these three types of access rights to the shared resources:<p> a) limitless access rights, in which anyone can access your USB disk in the FTP server.</p> <p>b) limited access rights, in which access to your USB disk is limited to those you have assigned access rights. For this type, the RT-N16 creates the \"admin/family\" accounts. </p> <p>c) admin rights in which the RT-N16 creates the \"admin\" account for full access rights.</p>",
							"ASUS DDNS creates a domain name with a dynamic IP address. <p>If you need to configure other DDNS service settings, please refer to <a href='/Advanced_ASUSDDNS_Content.html' target='_top'>Advanced DDNS</a></p>",
							"Network Neighborhood Share: You can operate the Samba server professionally. FTP Share: You can operate the FTP server professionally.");

//EzQoS
helpcontent[16] = new Array("",
							"EZQoS provides 4 types of popular Internet applications and enables you to easily configure your Quality of Service (QoS) settings. QoS ensures the performance of the Internet download speed and enables you to change its settings in different scenarios.<p>EX. Application you choose will remain the quality and will not lag even when you use P2P.</p><p>If your uplink speed has reached 40MB/s, we suggest you need not enable EzQoS for saving system resource.</p><p>For more professional and detailed configuration, please enter<a href='/Advanced_QOSUserSpec_Content.html'>Bandwidth Management - User Specify Service</a></p>");
//Others in the USB application
helpcontent[17] = new Array("",
							"It is the maximum number of concurrent connections for the Network Neighborhood or FTP Server. Some ftp clients may establish more than one connection. Setting this number too low leads to failed logon.",
							"It's the name of the RT-N16, and standard input characters include letters(A-Z,a-z), digits(0-9), spaces, underscores(_) and hyphens(-). The first and last character should not contain any spaces. Using a non-standard name will prevent other users from finding your computer on the network.<br>If you have registered and opened the ASUS DDNS service, the field are updated automatically.",
							"It is the group name of the RT-N16 in the Network Neighborhood, and standard input characters include letters(A-Z,a-z), digits(0-9), spaces, underscores(_), and hyphens(-). There should not be any space in the first and last character . Using a non-standard  name results in other users cannot find your computer in LAN.",
							"This field allows you to enable or disable Download Master.",
							"This field allows you to share downloaded materials to Internet users.",
							"This field allows you to enable or disable UPnP.",
							"You can save the script file in the first partition of your USB disk and  enter its file name here. RT-N16 executes this script when the system mounts the USB disk.");
// MAC filter
helpcontent[18] = new Array("",
							"In Accept mode, RT-N16 only accept clients with MAC address in the list. In Reject mode, RT-N16 will reject clients with MAC address in the list.");
// Setting
helpcontent[19] = new Array("",
							"Click [Factory default] to restore the router to its factory default settings and delete all the current settings. Wait for a while until the router reboots. ",
							"Click the [Save] button to save current setting of RT-N16 into a file. (Note: While you save current settings to a file, it will be saved to flash as well.)",
							"Specify the path and name of setting file. Then click [Upload] to write the file to RT-N16. Please wait 30 seconds until RT-N16 reboots.");
// QoS
helpcontent[20] = new Array("",
							"This is a measured uplink speed when the WAN connection was built. It may be lower than the ideal value from ISP.",
							"If the measured uplink speed is incorrect, you can assign it manually here.");
// HSDPA
helpcontent[21] = new Array("",
							"Choose the HSDPA mode according by your requirements and enviroments. We provide four mode below: Backup, Equal weight, Always high and Always low.",
							"Please input the PIN code of your SIM card. It must be the number which length is greater than 3 and smaller than 8. If you do not know the PIN code, please contact your ISP.",
							"If you do not know the APN service name, please contact your ISP.",
							"HSDPAThat is It means Maximum Transmission Unit(MTU) of PPPoE packet.",
							"HSDPAThat is It means Maximum Receive Unit(MRU) of PPPoE packet.",
							"This field indicates the IP address of DNS that RT-N16 contact to.",
							"This field indicates the IP address of DNS that RT-N16 contact to.");

var clicked_help_string = "Help provides you with guidelines and information about using the router's functions.  Click the <a class=\"hintstyle\" style=\"background-color:#7aa3bd\">hyperlinked words with yellow and blue underline.</a> to get help.";

function openHint(hint_array_id, hint_show_id, flag){
	$('helpicon').style.display = "none";
	$('hintofPM').style.display = "";
	
	showtext($('helpname'), "Help");
	
	if($("statusframe")){
		$("statusframe").src = "";
		$("statusframe").style.display = "none";
	}
	
	$("hint_body").style.display = "";
	
	if(typeof(hint_show_id) == "number" && hint_show_id > 0){
		$('hint_body').style.display = "";
		$("statusframe").style.display = "none";
		
		showtext($('helpname'), "Help");
		
		clicked_help_string = "<span>"+helptitle[hint_array_id][hint_show_id][0]+"</span><br>"+helpcontent[hint_array_id][hint_show_id];
		
		showtext($('hint_body'), clicked_help_string);
	}
	
	if(hint_array_id == 14
			|| hint_array_id == 15
			|| hint_array_id == 16)
		return;
	
	if(flag != "false")
		document.hint_form.scrollIntoView("true");
}

function closeHint(){
	$('helpicon').style.display = "";
	$('hintofPM').style.display = "none";
}

function enable_auto_hint(group_num, all_hint_num){
	var obj_name = "";
	var input_objs = new Array();
	var select_objs = new Array();
	
	for(var i = 1; i <= all_hint_num; ++i){
		obj_name = helptitle[group_num][i][1];
		input_objs = getElementsByName_iefix("input", obj_name);
		select_objs = getElementsByName_iefix("select", obj_name);
		
		if(input_objs.length > 0)
			for(var j = 0; j < input_objs.length; ++j){
				var temp_class_name = input_objs[j].hint_order;
				
				input_objs[j].hint_order = i;
				input_objs[j].onmouseup = function(){
						openHint(group_num, parseInt(this.hint_order), "false");
					};
			}
		
		if(select_objs.length > 0)
			for(var j = 0; j < select_objs.length; ++j){
				var temp_class_name = select_objs[j].hint_order;
				
				select_objs[j].hint_order = i;
				select_objs[j].onmouseup = function(){
						openHint(group_num, parseInt(this.hint_order), "false");
					};
			}
	}
}

function disable_auto_hint(group_num, all_hint_num){
	var obj_name = "";
	var input_objs = new Array();
	var select_objs = new Array();
	
	for(var i = 1; i <= all_hint_num; ++i){
		obj_name = helptitle[group_num][i][1];
		input_objs = getElementsByName_iefix("input", obj_name);
		select_objs = getElementsByName_iefix("select", obj_name);
		
		if(input_objs.length > 0)
			for(var j = 0; j < input_objs.length; ++j){
				var temp_class_name = input_objs[j].hint_order;
				
				input_objs[j].hint_order = i;
				input_objs[j].onfocus = function(){};
			}
		
		if(select_objs.length > 0)
			for(var j = 0; j < select_objs.length; ++j){
				var temp_class_name = select_objs[j].hint_order;
				
				select_objs[j].hint_order = i;
				select_objs[j].onfocus = function(){};
			}
	}
}
