<<<<<<< HEAD
﻿/*general*/
var nav;
var change;
var keyPressed;
var wItem;
var ip = "";
var ip_addr = '<!--#echo var="REMOTE_ADDR"-->';
var chanList = 0;
var wep1, wep2, wep3, wep4;
var varload=0;
var final_flag = 0;	// for validate_ipaddr() always return true.

if(navigator.appName.indexOf("Microsoft") != -1){
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}
else{
	nav = true;
}

function NetscapeEventHandler_KeyDown(e)
{keyPressed = e.which;
if (keyPressed<48 && keyPressed!=16)
{keyPressed = 0;
}
return true;
}

function changeDate()
{pageChanged = 1;
return true;
}
function MicrosoftEventHandler_KeyDown()
{/* if (keyPressed == 13  && event.srcElement.type != 'button' && event.srcElement.type != 'textarea' && event.srcElement.type != 'submit')
return false;
return true;*/
return true;
}

function str2val(v)
{for(i=0; i<v.length; i++)
{if (v.charAt(i) !='0') break;
}
return v.substring(i);
}
function inputRCtrl1(o, flag)
{if (flag == 0)
{o[0].disabled = 1;
o[1].disabled = 1;
}
else
{o[0].disabled = 0;
o[1].disabled = 0;
}
}
function inputRCtrl2(o, flag)
{if (flag == 0)
{o[0].checked = true;
o[1].checked = false;
}
else
{o[0].checked = false;
o[1].checked = true;
}
}

function checkPass(o, o1, o2)
{if (o1.value==o2.value)
{document.form.action_mode.value = "  Save  ";
return true;
}
alert('Two password strings do not match.');
return false;
}

function markGroup(o, s, c, b) {
	var bFlag, cFlag;
	
	document.form.group_id.value = s;
	bFlag = 0; //Judge the input field is blank or not. 1:blank;
	cFlag = 0; //Judge the input item number is overload or not.
	
	if(b == " Add "){		
		if(s == 'RBRList'){
			if(document.form.wl_wdsnum_x_0.value >= c)
				cFlag=1;
			else if(!validate_hwaddr(document.form.wl_wdslist_x_0))
				return false;
			else if(document.form.wl_wdslist_x_0.value == "")
				bFlag = 1;
			else if(!validate_duplicate(document.form.RBRList_s, document.form.wl_wdslist_x_0.value, 12, 0))
				return false;
		}
		else if (s == 'MFList'){
			document.form.macfilter_list_x_0.value = document.form.macfilter_list_x_0.value.toUpperCase();
			
			if (document.form.macfilter_num_x_0.value >= c) cFlag=1;
			else if (!validate_hwaddr(document.form.macfilter_list_x_0)) return false;
			else if (document.form.macfilter_list_x_0.value=="") bFlag=1;
			else if (!validate_duplicate(document.form.MFList_s, document.form.macfilter_list_x_0.value, 12, 0)) return false;
		}
		else if (s == 'ACLList'){
			if(document.form.wl_macnum_x_0.value >= c)
				cFlag=1;
			else if(!validate_hwaddr(document.form.wl_maclist_x_0))
				return false;
			else if(document.form.wl_maclist_x_0.value=="")
				bFlag = 1;
			else if(!validate_duplicate(document.form.ACLList_s, document.form.wl_maclist_x_0.value, 12, 0))
				return false;
		}
		else if (s=='ManualDHCPList'){
			if (!validate_ipaddr_final(document.form.dhcp_start, 'dhcp_start') ||
			!validate_ipaddr_final(document.form.dhcp_end, 'dhcp_end') ||
			!validate_ipaddr_final(document.form.dhcp_gateway_x, 'dhcp_gateway_x') ||
			!validate_ipaddr_final(document.form.dhcp_dns1_x, 'dhcp_dns1_x') ||
			!validate_ipaddr_final(document.form.dhcp_wins_x, 'dhcp_wins_x') ) return false;
			
			if (intoa(document.form.dhcp_start.value)>intoa(document.form.dhcp_end.value)){
					tmp = document.form.dhcp_start.value;
					document.form.dhcp_start.value = document.form.dhcp_end.value;
					document.form.dhcp_end.value = tmp;
			}
			if (document.form.dhcp_staticnum_x_0.value >= c) cFlag=1;
			else if (!validate_hwaddr(document.form.dhcp_staticmac_x_0) ||
							!validate_ipaddr_final(document.form.dhcp_staticip_x_0, "staticip")) return false;
			else if (document.form.dhcp_staticmac_x_0.value=="" ||
							document.form.dhcp_staticip_x_0.value=="") bFlag=1;
			else if (!validate_duplicate(document.form.ManualDHCPList_s, document.form.dhcp_staticmac_x_0.value, 12, 0)) return false;
			else if (!validate_duplicate(document.form.ManualDHCPList_s, document.form.dhcp_staticip_x_0.value, 15, 14)) return false;
		}
		else if (s=='PPPoERouteList'){
			if (document.form.PPPConnection_PPPoERouteCount_0.value > c) cFlag=1;
			else if (!validate_ipaddr(document.form.PPPConnection_x_PPPoEIP_0, "") ||
							!validate_range(document.form.PPPConnection_x_PPPoEMask_0, 0, 32)) return false;
			else if (document.form.PPPConnection_x_PPPoEIP_0.value=="" ||
							document.form.PPPConnection_x_PPPoEMask_0.value=="") bFlag=1;
		}
		else if (s=='WLFilterList'){
			if (document.form.filter_wl_num_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.filter_wl_srcip_x_0, "") ||
!validate_portrange(document.form.filter_wl_srcport_x_0, "") ||
!validate_iprange(document.form.filter_wl_dstip_x_0, "") ||
!validate_portrange(document.form.filter_wl_dstport_x_0, "")) return false;
else if (document.form.filter_wl_srcip_x_0.value=="" &&
document.form.filter_wl_srcport_x_0.value=="" &&
document.form.filter_wl_dstip_x_0.value=="" &&
document.form.filter_wl_dstport_x_0.value=="") bFlag=1;
		}
		else if (s=='LWFilterList'){			
			if (isModel()!="WL520gc" && isModel()!="SnapAP")
			{				
				if (document.form.filter_lw_num_x_0.value >= c) cFlag=1;
				else if (!validate_iprange(document.form.filter_lw_srcip_x_0, "") ||
									!validate_portrange(document.form.filter_lw_srcport_x_0, "") ||
									!validate_iprange(document.form.filter_lw_dstip_x_0, "") ||
									!validate_portrange(document.form.filter_lw_dstport_x_0, "")) return false;
				else if (document.form.filter_lw_srcip_x_0.value=="" &&
								 document.form.filter_lw_srcport_x_0.value=="" &&
								 document.form.filter_lw_dstip_x_0.value=="" &&
								 document.form.filter_lw_dstport_x_0.value=="") bFlag=1;
				
				//alert(document.form.filter_lw_srcip_x_0.value +", "+ LWFilterList[0][0]);
				for(var i=0; i < LWFilterList.length; i++){ //validate if the entry is duplicated in list.
					if(document.form.filter_lw_srcip_x_0.value == LWFilterList[i][0] &&
						 document.form.filter_lw_srcport_x_0.value == LWFilterList[i][1] &&
						 document.form.filter_lw_dstip_x_0.value == LWFilterList[i][2] &&
						 document.form.filter_lw_dstport_x_0.value == LWFilterList[i][3]){
							alert("This entry has been in list.");
							return false;
					}
				}
			}
			else
			{
				if (document.form.filter_lw_num_x_0.value >= c)
					cFlag=1;
				else if (!validate_iprange(document.form.filter_lw_srcip_x_0, "") ||
								 !validate_portrange(document.form.filter_lw_dstport_x_0, "")){					
					return false;					
				}
				else if (document.form.filter_lw_srcip_x_0.value=="" && document.form.filter_lw_dstport_x_0.value=="")
					bFlag=1;
			}
		}
		else if (s=='UrlList'){
			if (document.form.url_num_x_0.value >= c)
				cFlag=1;
			else if (document.form.url_keyword_x_0.value=="")
				bFlag=1;
			else if (!validate_duplicate(document.form.UrlList_s, document.form.url_keyword_x_0.value, 32, 0))
				return false;
		}
		else if (s=='x_FUserList'){
			if (document.form.usb_ftpnum_x_0.value >= c) cFlag=1;
else if (!validate_string(document.form.usb_ftpusername_x_0) ||
!validate_string(document.form.usb_ftppasswd_x_0) ||
!validate_range(document.form.usb_ftpmaxuser_x_0, 1, 12)) return false;
else if (document.form.usb_ftpusername_x_0.value=="" ||
document.form.usb_ftppasswd_x_0.value=="" ||
document.form.usb_ftpmaxuser_x_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.x_FUserList_s, document.form.usb_ftpusername_x_0.value, 16, 0)) return false;
		}
		else if (s=='x_FBanIPList'){
			if (document.form.usb_bannum_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.usb_ftpbanip_x_0, "")) return false;
else if (document.form.usb_ftpbanip_x_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.x_FBanIPList_s, document.form.usb_ftpbanip_x_0.value, 15, 0)) return false;
		}
		else if (s=='x_QRuleList'){
			if (document.form.qos_rulenum_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.qos_ipaddr_x_0) ||
!validate_range_sp(document.form.qos_port_x_0, 1, 65535) ||
!validate_range_sp(document.form.qos_maxbw_x_0, 0, 1000000) ||
!validate_range_sp(document.form.qos_minbw_x_0, 0, 1000000)) return false;
else if (document.form.qos_maxbw_x_0.value=="" &&
document.form.qos_minbw_x_0.value=="") bFlag=1;
else if (document.form.qos_maxbw_x_0.value!="" &&
document.form.qos_minbw_x_0.value!="" &&
eval(document.form.qos_minbw_x_0.value) > eval(document.form.qos_maxbw_x_0.value))
{alert('Please enter a value between 0 to ' + document.form.qos_maxbw_x_0.value + '.');
document.form.qos_minbw_x_0.focus();
document.form.qos_minbw_x_0.select();
return false;
}
		}
		else if (s=='x_UQRuleList'){
			if (document.form.qos_urulenum_x_0.value >= c) cFlag=1;
else if (!validate_range_sp(document.form.qos_uport_x_0, 1, 65535) ||
!validate_range_sp(document.form.qos_umaxbw_x_0, 0, 1000000) ||
!validate_range_sp(document.form.qos_uminbw_x_0, 0, 1000000)) return false;
else if (document.form.qos_umaxbw_x_0.value=="" &&
document.form.qos_uminbw_x_0.value=="") bFlag=1;
else if (document.form.qos_umaxbw_x_0.value!="" &&
document.form.qos_uminbw_x_0.value!="" &&
eval(document.form.qos_uminbw_x_0.value) > eval(document.form.qos_umaxbw_x_0.value))
{alert('Please enter a value between 0 to ' + document.form.qos_umaxbw_x_0.value + '.');
document.form.qos_uminbw_x_0.focus();
document.form.qos_uminbw_x_0.select();
return false;
}
		}
		else if(s == 'x_USRRuleList'){
			if(document.form.qos_rulenum_x_0.value >= c)
				cFlag = 1;
			else if(!validate_string(document.form.qos_service_name_x_0) ||
					!validate_iprange(document.form.qos_ip_x_0) ||
					!validate_portrange(document.form.qos_port_x_0, "")
					)
				return false;
			else if(document.form.qos_service_name_x_0.value == ""
// 2008.05 James. {
					//document.form.qos_port_x_0.value == "" ||	// 2008.01 James.
					|| (document.form.qos_ip_x_0.value == "" && document.form.qos_port_x_0.value == ""))
				bFlag = 1;
			/*else if(!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_prio_x_0.value, 1, 44) ||	// 2008.01 James.
					!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_service_name_x_0.value, 16, 0))//*/
			//else if(!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_ip_x_0.value, 28, 16))
			//	return false;
			else if(!validate_duplicate_USRRuleList(document.form.qos_ip_x_0.value, document.form.qos_port_x_0.value))
				return false;
// 2008.05 James. }
		}
		else if (s=='Storage_SharedList'){
			if (document.form.sh_num_0.value >= c) cFlag=1;
/* 2005.12.16 Jiahao
else if (!validate_path(document.form.sh_path_0)) return false;
*/
else if (document.form.sh_path_0.value=="") bFlag=1;
else if (document.form.sh_name_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.Storage_SharedList_s, document.form.sh_path_0.value, 32, 0))  return false;
else if (!validate_duplicate(document.form.Storage_SharedList_s, document.form.sh_name_0.value, 16, 34)) return false;
top.Edit_Flag = "on";
		}
		else if (s=='Storage_UserList'){
			if (document.form.acc_num_0.value >= c) cFlag=1;
else if (!validate_string(document.form.acc_username_0)) return false;
else if (!validate_string(document.form.acc_password_0)) return false;
else if (document.form.acc_username_0.value=="") bFlag=1;
else if (document.form.acc_username_0.value.toLowerCase()=="guest")
{alert(" You cannot use Guest as a user name!");
return false;
}
else if (document.form.acc_username_0.value.toLowerCase()=="anonymous")
{alert(" You cannot use Anonymous as a user name!");
return false;
}
else if (document.form.acc_username_0.value.toLowerCase()=="ftp")
{alert(" You cannot use Ftp as a user name!");
return false;
}
else if (document.form.acc_password_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.Storage_UserList_s, document.form.acc_username_0.value, 28, 0)) return false;
else if (!validate_duplicate(document.form.Storage_UserList_s, document.form.acc_password_0.value, 24, 29)) return false;
		}
		else if (s=='Storage_UserRight_List'){
			if (document.form.sh_acc_onlist_num_x_0.value >= c) cFlag = 1;
else if (!validate_string(document.form.sh_acc_user_0.value)) return false;
else if (document.form.sh_acc_user_0.value == "") bFlag = 1;
		}
	}
	
	if(bFlag == 1)
		alert("Fields cannot be blank!");
	else if(cFlag == 1)
		alert("This table only allow " + c + " items!");
	else{	// b == " Del "
		if(s == 'WLFilterList'){
			updateDateTime("Advanced_Firewall_Content.html");
		}
		else if(s == 'LWFilterList'){
			updateDateTime("Advanced_Firewall_Content.html");
		}
		else if(s == 'UrlList'){
			updateDateTime("Advanced_URLFilter_Content.html");
		}
		else if(s == 'LocalCertDB'){}
		
		pageChanged = 0;
		pageChangedCount = 0;
		
		document.form.action_mode.value = b;
		return true;
	}
	
	return false;
}

function portrange_min(o, v){
	var num = 0;
	var common_index = o.substring(0, v).indexOf(':');
	
	if(common_index == -1)
		num = parseInt(o.substring(0, v));
	else
		num = parseInt(o.substring(0, common_index));
		
	return num;
}
function portrange_max(o, v){
	var num = 0;
	var common_index = o.substring(0, v).indexOf(':');

	if(common_index == -1)
		num = parseInt(o.substring(0, v));
	else
		num = parseInt(o.substring(common_index+1, v+1));
		
	return num;
}
function isBlank(s) {
for(i=0; i<s.length; i++) {
c=s.charAt(i);
if((c!=' ')&&(c!='\n')&&(c!='\t'))return false;}
return true;
}
function numbersonly()
{if (keyPressed>47 && keyPressed<58)
return true;
else
return false;
}
function check_ptl()
{if(keyPressed==38)
return false;
else
return true;
}
function linkOver(o)
{o.style.cursor="hand";
}
function linkOut(o) {
}
function linkTo(s)
{location=s;
}
function refreshList()
{parent.location.href = '/';
}

function entry_cmp(entry, match, len){  //compare string length function
	
	var j;
	
	if(entry.length < match.length)
		return (1);
	
	for(j=0; j < entry.length && j<len; j++){
		c1 = entry.charCodeAt(j);
		if (j>=match.length) 
			c2=160;
		else 
			c2 = match.charCodeAt(j);
			
		if (c1==160) 
			c1 = 32;
			
		if (c2==160) 
			c2 = 32;
			
		if (c1>c2) 
			return (1);
		else if (c1<c2) 
			return(-1);
	}
	return 0;
}
function validate_duplicate_noalert(o, v, l, off){
	
	for (var i=0; i<o.options.length; i++)
	{		
		if (entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l)==0){
			return false;
		}
	}
	return true;
}

function validate_duplicate(o, v, l, off){	// 2008.01 James.	
	for(var i = 0; i < o.options.length; i++){		
		if(entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l) == 0){
			alert('This entry has been in list.');
			
			return false;
		}
	}	
	return true;
}

function validate_duplicate2(o, v, l, off){
	var i;
	for (i=0; i<o.options.length; i++)
	{
		if (entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l)==0)
		{
			return false;
		}
	}
	return true;
}
function is_hwaddr()
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if ((keyPressed>47 && keyPressed<58)||(keyPressed>64 && keyPressed<71)||(keyPressed>96 && keyPressed<103))
return true;
else if (keyPressed==0)
return true;
else
return false;
}
function validate_hwaddr(o)
{
	if (o.value.length == 0) return true;
	if(o.value != "")
	{
		if(o.value.length == 12)
		{
			for(i=0; i<o.value.length; i++)
			{c=o.value.charAt(i);
			if (!(c>='0'&&c<='9') && !(c>='a'&&c<='f') && !(c>='A'&&c<='F'))
				{alert('Please enter the complete MAC address which contains 12 hexadecimal letters.');
				o.value = "";
				o.focus();
				o.select();
				return false;
			}
			}
		return true;
		}
	}
	alert('Please enter the complete MAC address which contains 12 hexadecimal letters.');
	o.value = "";
	o.focus();
	o.select();
	return false;
}
function is_string(o) {
if (!nav)
keyPressed = IEKey();
else
keyPressed = NSKey();
if (keyPressed==0)
return true;
else if (keyPressed>=0&&keyPressed<=126)
return true;
alert('Invalid character!');
return false;
}
function is_string2(o) {
if (!nav)
keyPressed = IEKey();
else
keyPressed = NSKey();
if (keyPressed==0)
return true;
else if ((keyPressed>=48&&keyPressed<=57) ||
(keyPressed>=97&&keyPressed<=122) ||
(keyPressed>=65&&keyPressed<=90) ||
(keyPressed==45)
)
return true;
alert('Invalid character!');
return false;
}

function validate_ssidchar(ch){
	if(ch >= 32 && ch <= 126)
		return true;
	
	return false;
}

function validate_string_ssid(o){
	var c;	// character code
	
	for(var i = 0; i < o.value.length; ++i){
		c = o.value.charCodeAt(i);
		
		if(!validate_ssidchar(c)){
			alert('SSID cannot contain the character \" '+o.value.charAt(i)+' \".');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	if(document.form.current_page.value == "Advanced_Wireless_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	else if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html" && document.form.wl_guest_ssid_1.value == "")
		o.value = "guest";
	else if(document.form.current_page.value == "Basic_GOperation_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	else if(document.form.current_page.value == "Basic_AOperation_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	
	return true;
}

function validate_share(o)
{s=o.value;
if (!validate_string(o))
{return false;
}
for(i=0;i<s.length;i++)
{c = s.charCodeAt(i);
if (!validate_sharechar(c))
{alert("Share name can not contain '" + s.charAt(i) +"' !");
return(false);
}
}
return(true);
}
function validate_sharechar(ch)
{if (ch>=48&&ch<=57) return true;
if (ch>=97&&ch<=122) return true;
if (ch>=65&&ch<=90) return true;
if (ch==45) return true;
if (ch==95) return true;
if (ch==32) return true;
return false;
}
function is_number(o)
{if (!nav) keyPressed = IEKey();
else keyPressed = NSKey();
if (keyPressed==0) return true;
if (keyPressed>47 && keyPressed<58)
{if (keyPressed==48 && o.length == 0) return false;
return true;
}
else
{return false;
}
}
function validate_range(o, min, max) {
	for(i=0; i<o.value.length; i++)
	{
		if (o.value.charAt(i)<'0' || o.value.charAt(i)>'9')
		{
			alert('Please enter a value between ' + min + ' to ' + max);
			//o.value = max;
			o.focus();
			o.select();
			return false;
		}
	}
	if(o.value<min || o.value>max) {
		alert('Please enter a value between ' + min + ' to ' + max);
		//o.value = max;
		o.focus();
		o.select();
		return false;
	}
	else {
		o.value = str2val(o.value);
		if(o.value=="")
		o.value="0";
		return true;
	}
}
function validate_range_sp(o, min, max) {
	if (o.value.length==0) return true;
	
	if(o.value<min || o.value>max) {
		alert('Please enter a value between ' + min + ' to ' + max + '.');
		o.value = min;
		o.focus();
		o.select();
		return false;
	}
	else {
		o.value = str2val(o.value);
		if(o.value=="") o.value="0";
		return true;
	}
}

function change_ipaddr(o){}

function is_ipaddr(o){
	if(!nav) 
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0){
		return true;
	}
	
	if(o.value.length >= 16)
		return false;
	
	if((keyPressed > 47 && keyPressed < 58)){
		j = 0;
		
		for(i = 0; i < o.value.length; i++){
			if(o.value.charAt(i) == '.'){
				j++;
			}
		}
		
		if(j < 3 && i >= 3){
			if(o.value.charAt(i-3) != '.' && o.value.charAt(i-2) != '.' && o.value.charAt(i-1) != '.'){
				o.value = o.value+'.';
			}
		}
		
		return true;
	}
	else if(keyPressed == 46){
		j = 0;
		
		for(i = 0; i < o.value.length; i++){
			if(o.value.charAt(i) == '.'){
				j++;
			}
		}
		
		if(o.value.charAt(i-1) == '.' || j == 3){
			return false;
		}
		
		return true;
	}
	else{
		return false;
	}
	
	return false;
}

function intoa(ip)
{n=0;
vip=0;
for(i=0;i<ip.length;i++)
{c = ip.charAt(i);
if (c == '.')
{vip = vip * 256 + n;
n = 0;
}
else if(c>='0' && c<='9')
{n = n*10 + (c-'0');
}
}
vip = vip*256 + n;
return(vip);
}

function requireWANIP(v){
	if(v == 'wan_ipaddr' || v == 'wan_netmask' ||
			v == 'lan_ipaddr' || v == 'lan_netmask' ||
			v == 'lan1_ipaddr' || v == 'lan1_netmask'){
		// 2008.03 James. patch for Oleg's patch. {
		/*if(document.form.wan_proto.value == "static" || document.form.wan_proto.value == "pptp")
			return 1;
		else
			return 0;*/
		if(document.form.wan_proto.value == "static")
			return 1;
		else if(document.form.wan_proto.value == "pppoe" && intoa(document.form.wan_ipaddr.value))
			return 1;
		else if((document.form.wan_proto.value=="pptp" || document.form.wan_proto.value == "l2tp")
				&& document.form.wan_ipaddr.value != '0.0.0.0')
			return 1;
		else
			return 0;
		// 2008.03 James. patch for Oleg's patch. }
	}
	
	else return 0;
}

function matchSubnet2(ip1, sb1, ip2, sb2){
	var nsb;
	var nsb1 = intoa(sb1.value);
	var nsb2 = intoa(sb2.value);
	//alert("");
	if(nsb1 < nsb2)
		nsb = nsb1;
	else
		nsb = nsb2;
	
	if((intoa(ip1)&nsb) == (intoa(ip2)&nsb))
		return 1;
	else
		return 0;
}

function validate_ipaddr(o, v){
	if(final_flag)
		return true;
	
num = -1;
pos = 0;
if (o.value.length==0)
{if (v=='dhcp_start' || v=='dhcp_end' || v=='wan_ipaddr' || v=='dhcp1_start' || v=='dhcp1_end' ||
v=='lan_ipaddr' || v=='lan_netmask' || v=='lan1_ipaddr' || v=='lan1_netmask')
{alert("Fields cannot be blank!");
if (v=='wan_ipaddr')
{document.form.wan_ipaddr.value = "10.1.1.1";
document.form.wan_netmask.value = "255.0.0.0";
}
else if (v=='lan_ipaddr')
{document.form.lan_ipaddr.value = "192.168.1.1";
document.form.lan_netmask.value = "255.255.255.0";
}
else if (v=='lan1_ipaddr')
{document.form.lan1_ipaddr.value = "192.168.2.1";
document.form.lan1_netmask.value = "255.255.255.0";
}
else if (v=='lan_netmask') document.form.lan_netmask.value = "255.255.255.0";
else if (v=='lan1_netmask') document.form.lan1_netmask.value = "255.255.255.0";
else if (v=='dhcp_start') document.form.dhcp_start.value = document.form.dhcp_end.value;
else if (v=='dhcp_end') document.form.dhcp_end.value = document.form.dhcp_start.value;
else if (v=='dhcp1_start') document.form.dhcp1_start.value = document.form.dhcp1_end.value;
else if (v=='dhcp1_end') document.form.dhcp1_end.value = document.form.dhcp1_start.value;
o.focus();
o.select();
return false;
}
else return true;
}
if(v=='wan_ipaddr' && document.form.wan_netmask.value=="")
document.form.wan_netmask.value="255.255.255.0";
for(i=0; i<o.value.length; i++) {
c=o.value.charAt(i);
if(c>='0' && c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else
{if ( num<0 || num>255 || c!='.')
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (pos==0) v1=num;
else if (pos==1) v2=num;
else if (pos==2) v3=num;
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
else v4=num;
if (v=='dhcp_start' || v=='dhcp_end' || v=='wan_ipaddr' || v=='dhcp1_start' || v=='dhcp1_end' || v=='lan_ipaddr' || v=='lan1_ipaddr' || v=='staticip')
{
	
	//if(v1==255||v2==255||v3==255||v4==255||v1==0||v4==0||v1==127||v1==224)
	if(v != 'wan_ipaddr' && (v1 == 255 || v2 == 255 || v3 == 255 || v4 == 255 || v1 == 0 || v4 == 0 || v1 == 127 || v1 == 224))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if ((v=='wan_ipaddr' &&  matchSubnet2(o.value, document.form.wan_netmask, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(v=='lan_ipaddr' &&  matchSubnet2(o.value, document.form.lan_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
(isModel3() == 'WL550gE' && v=='wan_ipaddr' && matchSubnet2(o.value, document.form.wan_netmask, document.form.lan1_ipaddr.value, document.form.lan1_netmask)) ||
(isModel3() == 'WL550gE' && v=='lan1_ipaddr' && matchSubnet2(o.value, document.form.lan1_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask))
)
{
	alert(o.value + ' is not a valid IP address!');
	if (v=='wan_ipaddr')
	{document.form.wan_ipaddr.value = "10.1.1.1";
	document.form.wan_netmask.value = "255.0.0.0";
	}
	else if(v=='lan_ipaddr')
	{document.form.lan_ipaddr.value = "192.168.1.1";
	document.form.lan_netmask.value = "255.255.255.0";
	}
	else if(v=='lan1_ipaddr')
	{document.form.lan1_ipaddr.value = "192.168.2.1";
	document.form.lan1_netmask.value = "255.255.255.0";
	}
	o.focus();
	o.select();
	return false;
}

}
else if(v=='lan_netmask' || v=='lan1_netmask')
{if(v1==255&&v2==255&&v3==255&&v4==255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
if (requireWANIP(v) && (
(v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(v=='lan_netmask' &&  matchSubnet2(document.form.lan_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
(isModel3() == 'WL550gE' && v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(isModel3() == 'WL550gE' && v=='lan1_netmask' &&  matchSubnet2(document.form.lan1_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask))
))
{alert(o.value + ' is not a valid IP address!');
if (v=='wan_netmask')
{document.form.wan_ipaddr.value = "10.1.1.1";
document.form.wan_netmask.value = "255.0.0.0";
}
else if(v=='lan_netmask')
{document.form.lan_ipaddr.value = "192.168.1.1";
document.form.lan_netmask.value = "255.255.255.0";
}
else if(v=='lan1_netmask')
{document.form.lan1_ipaddr.value = "192.168.2.1";
document.form.lan1_netmask.value = "255.255.255.0";
}
o.focus();
o.select();
return false;
}
if(v=='lan1_ipaddr')
{if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
else if(v=='lan_ipaddr' && isBand() != 'b')
{if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
o.value = v1 + "." + v2 + "." + v3 + "." + v4;
if ((v1 > 0) && (v1 < 127)) mask = "255.0.0.0";
else if ((v1 > 127) && (v1 < 192)) mask = "255.255.0.0";
else if ((v1 > 191) && (v1 < 224)) mask = "255.255.255.0";
else mask = "0.0.0.0";
if (v=='wan_ipaddr' && document.form.wan_netmask.value=="")
{document.form.wan_netmask.value = mask;
}
else if (v=='lan_ipaddr' && document.form.lan_netmask.value=="" )
{document.form.lan_netmask.value = mask;
}
else if (v=='dhcp_start')
{if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(o.value)>intoa(document.form.dhcp_end.value))
{tmp = document.form.dhcp_start.value;
document.form.dhcp_start.value = document.form.dhcp_end.value;
document.form.dhcp_end.value = tmp;
}
}
else if (v=='dhcp_end')
{if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(document.form.dhcp_start.value)>intoa(o.value))
{tmp = document.form.dhcp_start.value;
document.form.dhcp_start.value = document.form.dhcp_end.value;
document.form.dhcp_end.value = tmp;
}
}
else if (v=='lan1_ipaddr')
{if(document.form.lan1_netmask.value=="" )
document.form.lan1_netmask.value = mask;
}
else if (v=='dhcp1_start')
{if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(o.value)>intoa(document.form.dhcp1_end.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
}
else if (v=='dhcp1_end')
{if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(document.form.dhcp1_start.value)>intoa(o.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
}
return true;
}

function validate_ipaddr_final(o, v){
	var num = -1;
	var pos = 0;
	
	if(o.value.length == 0){
		if(v == 'dhcp_start' || v == 'dhcp_end' ||
				v == 'wan_ipaddr' ||
				v == 'dhcp1_start' || v=='dhcp1_end' ||
				v == 'lan_ipaddr' || v=='lan_netmask' ||
				v=='lan1_ipaddr' || v=='lan1_netmask' ||
				v == 'wl_radius_ipaddr'){
			alert("Fields cannot be blank!");
			
			if(v == 'wan_ipaddr'){
				document.form.wan_ipaddr.value = "10.1.1.1";
				document.form.wan_netmask.value = "255.0.0.0";
			}
			else if(v == 'lan_ipaddr'){
				document.form.lan_ipaddr.value = "192.168.1.1";
				document.form.lan_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan1_ipaddr'){
				document.form.lan1_ipaddr.value = "192.168.2.1";
				document.form.lan1_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan_netmask')
				document.form.lan_netmask.value = "255.255.255.0";
			else if(v == 'lan1_netmask')
				document.form.lan1_netmask.value = "255.255.255.0";
			
			o.focus();
			o.select();
			
			return false;
		}
		else
			return true;
	}
	
	if(v == 'wan_ipaddr' && document.form.wan_netmask.value == "")
		document.form.wan_netmask.value="255.255.255.0";
	
	for(var i = 0; i < o.value.length; ++i){
		var c = o.value.charAt(i);
		
		if(c >= '0' && c <= '9'){
			if(num == -1 ){
				num = (c-'0');
			}
			else{
				num = num*10+(c-'0');
			}
		}
		else{
			if(num < 0 || num > 255 || c != '.'){
				alert(o.value+' is not a valid IP address!');
				
				o.value = "";
				o.focus();
				o.select();
				
				return false;
			}
			
			if(pos == 0)
				v1 = num;
			else if(pos == 1)
				v2 = num;
			else if(pos == 2)
				v3 = num;
			
			num = -1;
			++pos;
		}
	}
	
	if(pos!=3 || num<0 || num>255){
		alert(o.value + ' is not a valid IP address!');
		o.value = "";
		o.focus();
		o.select();
		
		return false;
	}
	else
		v4 = num;
	
	if(v == 'dhcp_start' || v == 'dhcp_end' ||
			v == 'wan_ipaddr' ||
			v == 'dhcp1_start' || v == 'dhcp1_end' ||
			v == 'lan_ipaddr' || v == 'lan1_ipaddr' ||
			v == 'staticip' || v == 'wl_radius_ipaddr' ||
			v == 'dhcp_dns1_x' || v == 'dhcp_gateway_x' || v == 'dhcp_wins_x'){
		if((v!='wan_ipaddr')&& (v1==255||v2==255||v3==255||v4==255||v1==0||v4==0||v1==127||v1==224)){
			alert(o.value + ' is not a valid IP address!');
			
			o.value = "";
			o.focus();
			o.select();
			
			return false;
		}
		
		if(wan_route_x == "IP_Bridged" && wan_nat_x == "0")	// variables are defined in state.js
			;	// there is no WAN in AP mode, so it wouldn't be compared with the wan ip..., etc.
		else if(requireWANIP(v) && (
				(v=='wan_ipaddr' &&  matchSubnet2(o.value, document.form.wan_netmask, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
				(v=='lan_ipaddr' &&  matchSubnet2(o.value, document.form.lan_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
				(isModel3() == 'WL550gE' && v=='wan_ipaddr' && matchSubnet2(o.value, document.form.wan_netmask, document.form.lan1_ipaddr.value, document.form.lan1_netmask)) ||
				(isModel3() == 'WL550gE' && v=='lan1_ipaddr' && matchSubnet2(o.value, document.form.lan1_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask))
				)){
			alert(o.value + ' is not a valid IP address!');
			if(v == 'wan_ipaddr'){
				document.form.wan_ipaddr.value = "10.1.1.1";
				document.form.wan_netmask.value = "255.0.0.0";
			}
			else if(v == 'lan_ipaddr'){
				document.form.lan_ipaddr.value = "192.168.1.1";
				document.form.lan_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan1_ipaddr'){
				document.form.lan1_ipaddr.value = "192.168.2.1";
				document.form.lan1_netmask.value = "255.255.255.0";
			}
			
			o.focus();
			o.select();
			
			return false;
		}
	}
	else if(v=='lan_netmask' || v=='lan1_netmask'){
		if(v1==255&&v2==255&&v3==255&&v4==255){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	if(wan_route_x == "IP_Bridged" && wan_nat_x == "0")	// variables are defined in state.js
			;	// there is no WAN in AP mode, so it wouldn't be compared with the wan ip..., etc.
	else if(requireWANIP(v) && (
			(v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
			(v=='lan_netmask' &&  matchSubnet2(document.form.lan_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
			(isModel3() == 'WL550gE' && v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
			(isModel3() == 'WL550gE' && v=='lan1_netmask' &&  matchSubnet2(document.form.lan1_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask))
			)){
		alert(o.value + ' is not a valid IP address!');
		
		if (v=='wan_netmask'){
			document.form.wan_ipaddr.value = "10.1.1.1";
			document.form.wan_netmask.value = "255.0.0.0";
		}
		else if(v=='lan_netmask'){
			document.form.lan_ipaddr.value = "192.168.1.1";
			document.form.lan_netmask.value = "255.255.255.0";
		}
		else if(v=='lan1_netmask'){
			document.form.lan1_ipaddr.value = "192.168.2.1";
			document.form.lan1_netmask.value = "255.255.255.0";
		}
		
		o.focus();
		o.select();
		return false;
	}
	
	if(v=='lan1_ipaddr'){
		if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	else if(v=='lan_ipaddr' && isBand() != 'b'){
		if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	o.value = v1 + "." + v2 + "." + v3 + "." + v4;
	
	if((v1 > 0) && (v1 < 127)) mask = "255.0.0.0";
	else if ((v1 > 127) && (v1 < 192)) mask = "255.255.0.0";
	else if ((v1 > 191) && (v1 < 224)) mask = "255.255.255.0";
	else mask = "0.0.0.0";
	
	if(v=='wan_ipaddr' && document.form.wan_netmask.value==""){
		document.form.wan_netmask.value = mask;
	}
	else if (v=='lan_ipaddr' && document.form.lan_netmask.value=="" ){
		document.form.lan_netmask.value = mask;
	}
	else if (v=='dhcp_start'){
		if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='dhcp_end'){
		if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='lan1_ipaddr'){
		if(document.form.lan1_netmask.value=="") document.form.lan1_netmask.value = mask;
	}
	else if (v=='dhcp1_start'){
		if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='dhcp1_end'){
		if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	
	return true;
}

function change_ipaddrport(o)
{}
function is_ipaddrport(o)
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if (keyPressed==0)
{return true;
}
if ((keyPressed>47 && keyPressed<58) || keyPressed == 46 || keyPressed == 58)
{return true;
}
return false;
}
function validate_ipaddrport(o, v)
{num = -1;
pos = 0;
if (o.value.length==0)
return true;
str = o.value;
portidx = str.indexOf(":");
if (portidx!=-1)
{port = str.substring(portidx+1);
len = portidx;
if (port>65535)
{alert(port + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
}
else
{len = o.value.length;
}
for(i=0; i<len; i++) {
c=o.value.charAt(i);
if(c>='0' && c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else
{if ( num<0 || num>255 || c!='.')
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (v=='ExternalIPAddress' && document.form.wan_netmask.value == '')
{document.form.wan_netmask.value = "255.255.255.0";
}
else if (v=='IPRouters' && document.form.lan_netmask.value == '')
{document.form.lan_netmask.value = "255.255.255.0";
}
return true;
}
function change_iprange(o)
{}
function is_iprange(o)
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if (keyPressed==0)
{return true;
}
if (o.value.length>=15) return false;
if ((keyPressed>47 && keyPressed<58))
{j = 0;
for(i=0; i<o.value.length; i++)
{if (o.value.charAt(i)=='.')
{j++;
}
}
if (j<3 && i>=3)
{if (o.value.charAt(i-3)!='.' && o.value.charAt(i-2)!='.' && o.value.charAt(i-1)!='.')
o.value = o.value + '.';
}
return true;
}
else if (keyPressed == 46)
{j = 0;
for(i=0; i<o.value.length; i++)
{if (o.value.charAt(i)=='.')
{j++;
}
}
if (o.value.charAt(i-1)=='.' || j==3)
{return false;
}
return true;
}
else if (keyPressed == 42) /* '*' */
{return true;
}
else
{return false;
}
return false;
}
function validate_iprange(o, v)
{num = -1;
pos = 0;
if (o.value.length==0)
return true;
for(i=0; i<o.value.length; i++)
{c=o.value.charAt(i);
if(c>='0'&&c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else if (c=='*'&&num==-1)
{num = 0;
}
else
{if ( num<0 || num>255 || (c!='.'))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (v=='ExternalIPAddress' && document.form.wan_netmask.value == '')
{document.form.wan_netmask.value = "255.255.255.0";
}
else if (v=='IPRouters' && document.form.lan_netmask.value == '')
{document.form.lan_netmask.value = "255.255.255.0";
}
return true;
}
function is_portrange(o){
	if (!nav) keyPressed = IEKey();
	else keyPressed=NSKey();
		
	if (keyPressed==0) return true;
	//if (o.value.length>11) return false;  //limit the input length;
	
	if ((keyPressed>47 && keyPressed<58)){
		return true;
	}
	else if (keyPressed == 58 && o.value.length>0){
		for(i=0; i<o.value.length; i++){
			c=o.value.charAt(i);
			if (c==':' || c=='>' || c=='<' || c=='=')
			return false;
		}
		return true;
	}
	else if (keyPressed==44){  //"，" can be type in first charAt  ::: 0220 Lock add
		if (o.value.length==0)
			return false;		
		else
			return true;
	}
	else if (keyPressed==60 || keyPressed==62){  //">" and "<" only can be type in first charAt ::: 0220 Lock add
		if (o.value.length==0)
			return true;		
		else
			return false;
	}
	else{
		return false;
	}
}

function validate_portrange(o, v){
		if(o.value.length == 0)
			return true;
		
		prev = -1;
		num = -1;
		for(var i = 0; i < o.value.length; i++){
			c=o.value.charAt(i);
			if (c>='0'&&c<='9'){
				if(num==-1) num=0;
				num = num*10 + (c-'0');				
			}
			else{				
				if (num>65535 || num==0 || (c!=':' && c!='>' && c!='<' && c!=',')){
					alert(o.value + ' is not a valid port number.');
					//o.value = "";
					o.focus();
					o.select();
					return false;
				}
			
				if (c=='>') prev = -2;
				else if (c=='<') prev = -3;
				else if (c==','){ //偵測到字串中出現逗點
					prev = -4;
					num = 0;					
				}
				else{ //when c=":"
					prev = num;
					num = 0;					
				}
			}			
		}
		
		if ((num>65535 && prev!=-3) || (num<1&&prev!=-2) || (prev>num) || (num>=65535&&prev==-2) || (num<=1&&prev==-3)){
			if (num>65535){				
				alert(o.value + ' is not a valid port number.');
				
				o.focus();
				o.select();
				return false;
			}
			else{				
				alert(o.value + ' is not a valid port range!');
				//o.value = "";
				o.focus();
				o.select();
				return false;
			}
		}
		else{
			if (prev==-2){
				if (num==65535) o.value = num;
				else o.value = (num+1) + ":65535";  //ex. o.value=">2000", it will change to 2001:65535
			}
			else if (prev==-3){
				if (num==1) o.value = num;
				else o.value = "1:" + (num-1);     //ex. o.value="<2000", it will change to 1:1999
			}
			else if (prev==-4){ // "，" case
				if(document.form.current_page.value == "Advanced_VirtualServer_Content.html"){
					//alert(document.form.current_page.value);
					multi_vts_port = o.value.split(",");				
					//o.value = multi_vts_port[0];
					//alert(multi_vts_port[0]);
					split_vts_rule(multi_vts_port);
					return false;
				}
				else{
					alert(o.value + ' is not a valid port number.');

					o.focus();
					o.select();
					return false;						
				}
			}
			else if (prev!=-1)
				o.value = prev + ":" + num;
			else 
				o.value = num;                  //single port number case;
		}		
		return true;
}

function is_portlist(o)
{if (!nav) keyPressed = IEKey();
else keyPressed = NSKey();
if (keyPressed == 0 ) return true;
if (o.value.length>36) return false;
if ((keyPressed>47 && keyPressed<58) || keyPressed == 32)
{return true;
}
else
{return false;
}
}
function validate_portlist(o, v)
{if (o.value.length==0)
return true;
num = 0;
for(i=0; i<o.value.length; i++)
{c=o.value.charAt(i);
if (c>='0'&&c<='9')
{num = num*10 + (c-'0');
}
else
{if (num>255)
{alert(num + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
num = 0;
}
}
if (num>255)
{alert(num + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
return true;
}

function add_option_match(o, s, f)
{tail = o.options.length;
o.options[tail] = new Option(s);
o.options[tail].value = s;
if (f==s)
{o.options[tail].selected = 1;
return(1);
}
else return(0);
}
function add_option_match_x(o, s, f)
{tail = o.options.length;
o.options[tail] = new Option(s);
o.options[tail].value = tail;
if (tail==f)
{o.options[tail].selected = 1;
return(1);
}
else return(0);
}
function find_option(o)
{count = o.options.length;
for (i=0; i<count; i++)
{if (o.options[i].selected)
return(o.options[i].value);
}
return(null);
}

function add_options(o, arr, orig){
	for(var i = 0; i < arr.length; i++){
		if(orig == arr[i])
			add_option(o, arr[i], arr[i], 1);
		else
			add_option(o, arr[i], arr[i], 0);
	}
}

function add_options_x(o, arr, orig){
	for(var i = 0; i < arr.length; i++){
		if(orig == i)
			add_option(o, i, arr[i], arr[i], 1);
		else
			add_option(o, i, arr[i], arr[i], 0);
	}
}

function add_options_x2(o, arr, varr, orig){
	free_options(o);
	
	for(var i = 0; i < arr.length; ++i){
		if(orig == varr[i])
			add_option(o, arr[i], varr[i], 1);
		else
			add_option(o, arr[i], varr[i], 0);
	}
}

function rcheck(o){
	if(o[0].checked == true)
		return("1");
	else
	return("0");
}

function SaveChannelList(o)
{count = o.options.length;
chanList = new Array;
for (i=0; i<count; i++)
{chanList[chanList.length] = o.options[i].value;
}
}
function RestoreChannelList(d, isOut, isTurbo)
{for (i=0; i< chanList.length; i++)
{if (isOut=="0"&&chanList[i]>=100) return;
if (chanList[i] == 999) return;
d[d.length] = chanList[i];
}
}
function RefreshChannelList(isOut, isTurbo)
{orig = document.form.WLANConfig11a_Channel.value;
free_options(document.form.WLANConfig11a_Channel);
if (isTurbo=="1")
{if (isOut == "1")
{items = new Array("42","50","58","152","160");
}
else
{items = new Array("42","50","58");
}
}
else
{items = new Array;
RestoreChannelList(items, isOut, isTurbo);
}
add_options(document.form.WLANConfig11a_Channel, items, orig);
}
function RefreshRateList(isTurbo)
{orig = document.form.WLANConfig11a_DataRate.value;
free_options(document.form.WLANConfig11a_DataRate);
if (isTurbo=="1")
{items = new Array("Best","12","18","24","36","48","72","96","108");
}
else
{items = new Array("Best","6","9","12","18","24","36","48","54");
}
add_options_x(document.form.WLANConfig11a_DataRate, items, orig);
}
function RefreshRateSetList(gmode, chg)
{orig = document.form.WLANConfig11b_DataRate.value;
free_options(document.form.WLANConfig11b_DataRate);
if (gmode != "3")
{if (gmode == "1")
{items = new Array("1 & 2 Mbps", "Default", "All");
}
else
{items = new Array("1 & 2 Mbps", "Default", "All");
}
if (chg) orig = 1;
}
else
{items = new Array("1 & 2 Mbps", "Default");
if (chg) orig = 1;
}
add_options_x(document.form.WLANConfig11b_DataRate, items, orig);
}
function getDateCheck(str, pos)
{if (str.charAt(pos) == '1')
return true;
else
return false;
}
function getTimeRange(str, pos)
{if (pos == 0)
return str.substring(0,2);
else if (pos == 1)
return str.substring(2,4);
else if (pos == 2)
return str.substring(4,6);
else if (pos == 3)
return str.substring(6,8);
}
function setDateCheck(d1, d2, d3, d4, d5, d6, d7)
{str = "";
if (d7.checked == true ) str = "1" + str;
else str = "0" + str;
if (d6.checked == true ) str = "1" + str;
else str = "0" + str;
if (d5.checked == true ) str = "1" + str;
else str = "0" + str;
if (d4.checked == true ) str = "1" + str;
else str = "0" + str;
if (d3.checked == true ) str = "1" + str;
else str = "0" + str;
if (d2.checked == true ) str = "1" + str;
else str = "0" + str;
if (d1.checked == true ) str = "1" + str;
else str = "0" + str;
return str;
}
function setTimeRange(sh, sm, eh, em)
{return(sh.value+sm.value+eh.value+em.value);
}

function load_body(){
	document.form.next_host.value = location.host;
	if(document.form.current_page.value == "Advanced_Wireless_Content.html"){
		if(isBand() == 'b'){
			inputCtrl(document.form.wl_gmode, 0);
			inputCtrl(document.form.wl_gmode_check, 0);
		}
		
		if(isModel() == "SnapAP" || isCard() == 'ralink'){
			wl_auth_mode_reconf();
		}
		
		wl_auth_mode_change(1);
		change = 0;
		pageChanged = 0;
		if(document.form.wl_gmode_protection_x.value == "1"){
			document.form.wl_gmode_check.checked = true;
		}
		else{
			document.form.wl_gmode_check.checked = false;
		}
		
		/* Disable G-protect mode in 11B/N-only*/
		if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "4")
			inputCtrl(document.form.wl_gmode_check, 0);

		// Disable N-BW cap in Auto/N-only
		if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "0")
			inputCtrl(document.form.wl_nbw_cap, 1);
		else {
			inputCtrl(document.form.wl_nbw_cap, 0);
			document.form.wl_nbw_cap.value = "0";
		}

		// Syne N channels
		insertExtChannelOption();
	}
	else if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html"){
		final_flag = 1;
masq_wepkey_guest();
wl_auth_mode_reconf_guest();
wl_auth_mode_change_guest(1);
	}
	else if(document.form.current_page.value == "Advanced_WMode_Content.html"){
		if (isCard() == 'ralink'){
			document.form.wl_mode_x.options[1].value = null;
			document.form.wl_mode_x.options[1] = null;
			change_wireless_bridge2(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 1, 0);
		}
		else if(isModel2() == 'WL530'){
			change_wireless_bridge2(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 1, 0);
		}
		else{
			change_wireless_bridge(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 0, 0);
		}
		insertExtChannelOption();
	}
	else if(document.form.current_page.value == "Advanced_WAdvanced_Content.html"){
		document.form.wl_wme.options[0].selected = 0;
		document.form.wl_wme.options[1].selected = 1;
		inputCtrl(document.form.wl_wme, 0);
		change_common(document.form.wl_wme, "WLANConfig11b", "wl_wme");
		
		/* Greenfield by Lock Add in 2008.10.01 */
		if (document.form.wl_gmode.value!="2" && document.form.wl_gmode.value!="0"){ 
			inputCtrl(document.form.wl_mimo_preamble, 0);
		}
		

if (isModel()!="WL520gc" && isModel()!="SnapAP" && isModel()!="WL300" && isModel()!="WL331" && isCard()!='ralink')
{if (isBand() == 'b') inputCtrl(document.form.wl_frameburst, 0);
document.form.wl_radio_date_x_Sun.checked = getDateCheck(document.form.wl_radio_date_x.value, 0);
document.form.wl_radio_date_x_Mon.checked = getDateCheck(document.form.wl_radio_date_x.value, 1);
document.form.wl_radio_date_x_Tue.checked = getDateCheck(document.form.wl_radio_date_x.value, 2);
document.form.wl_radio_date_x_Wed.checked = getDateCheck(document.form.wl_radio_date_x.value, 3);
document.form.wl_radio_date_x_Thu.checked = getDateCheck(document.form.wl_radio_date_x.value, 4);
document.form.wl_radio_date_x_Fri.checked = getDateCheck(document.form.wl_radio_date_x.value, 5);
document.form.wl_radio_date_x_Sat.checked = getDateCheck(document.form.wl_radio_date_x.value, 6);
document.form.wl_radio_time_x_starthour.value = getTimeRange(document.form.wl_radio_time_x.value, 0);
document.form.wl_radio_time_x_startmin.value = getTimeRange(document.form.wl_radio_time_x.value, 1);
document.form.wl_radio_time_x_endhour.value = getTimeRange(document.form.wl_radio_time_x.value, 2);
document.form.wl_radio_time_x_endmin.value = getTimeRange(document.form.wl_radio_time_x.value, 3);
}
	}
else if (document.form.current_page.value == "Advanced_MultiPPPoE_Content.html")
{if (document.form.PPPConnection_x_MultiPPPoEEnable1[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName1, flag);
inputCtrl(document.form.PPPConnection_x_Password1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU1, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU1, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName1, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator1, flag);
if (document.form.PPPConnection_x_MultiPPPoEEnable2[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName2, flag);
inputCtrl(document.form.PPPConnection_x_Password2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU2, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU2, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName2, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator2, flag);
if (document.form.PPPConnection_x_IdleTxOnly1.value == "1")
{document.form.PPPConnection_x_IdleTime1_check.checked = true;
}
if (document.form.PPPConnection_x_IdleTxOnly2.value == "1")
{document.form.PPPConnection_x_IdleTime2_check.checked = true;
}
}
else if (document.form.current_page.value == "Advanced_RLANWAN_Content.html")
{}
else if (document.form.current_page.value == "Advanced_PortTrigger_Content.html")
{wItem = new Array(
new Array("Quicktime 4 Client", "554", "TCP", "6970:32000", "UDP"),
new Array("Real Audio", "7070", "TCP", "6970:7170", "UDP"));
free_options(document.form.TriggerKnownApps);
add_option(document.form.TriggerKnownApps, "Please select", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.TriggerKnownApps, wItem[i][0], wItem[i][0], 0);
}
}
else if (document.form.current_page.value == "Advanced_BasicFirewall_Content.html")
{change_firewall(rcheck(document.form.fw_enable_x));
}
	else if (document.form.current_page.value == "Advanced_Firewall_Content.html")
{wItem = new Array(
new Array("WWW", "80", "TCP"),
new Array("TELNET", "23", "TCP"),
new Array("FTP", "20:21", "TCP")
);
free_options(document.form.LWKnownApps);
add_option(document.form.LWKnownApps, "User Defined", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.LWKnownApps, wItem[i][0], wItem[i][0], 0);
}
document.form.filter_lw_date_x_Sun.checked = getDateCheck(document.form.filter_lw_date_x.value, 0);
document.form.filter_lw_date_x_Mon.checked = getDateCheck(document.form.filter_lw_date_x.value, 1);
document.form.filter_lw_date_x_Tue.checked = getDateCheck(document.form.filter_lw_date_x.value, 2);
document.form.filter_lw_date_x_Wed.checked = getDateCheck(document.form.filter_lw_date_x.value, 3);
document.form.filter_lw_date_x_Thu.checked = getDateCheck(document.form.filter_lw_date_x.value, 4);
document.form.filter_lw_date_x_Fri.checked = getDateCheck(document.form.filter_lw_date_x.value, 5);
document.form.filter_lw_date_x_Sat.checked = getDateCheck(document.form.filter_lw_date_x.value, 6);
document.form.filter_lw_time_x_starthour.value = getTimeRange(document.form.filter_lw_time_x.value, 0);
document.form.filter_lw_time_x_startmin.value = getTimeRange(document.form.filter_lw_time_x.value, 1);
document.form.filter_lw_time_x_endhour.value = getTimeRange(document.form.filter_lw_time_x.value, 2);
document.form.filter_lw_time_x_endmin.value = getTimeRange(document.form.filter_lw_time_x.value, 3);
}
else if (document.form.current_page.value == "Advanced_LFirewall_Content.html")
{document.form.FirewallConfig_WanLocalActiveDate_Sun.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 0);
document.form.FirewallConfig_WanLocalActiveDate_Mon.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 1);
document.form.FirewallConfig_WanLocalActiveDate_Tue.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 2);
document.form.FirewallConfig_WanLocalActiveDate_Wed.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 3);
document.form.FirewallConfig_WanLocalActiveDate_Thu.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 4);
document.form.FirewallConfig_WanLocalActiveDate_Fri.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 5);
document.form.FirewallConfig_WanLocalActiveDate_Sat.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 6);
document.form.FirewallConfig_WanLocalActiveTime_starthour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 0);
document.form.FirewallConfig_WanLocalActiveTime_startmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 1);
document.form.FirewallConfig_WanLocalActiveTime_endhour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 2);
document.form.FirewallConfig_WanLocalActiveTime_endmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 3);
}
else if (document.form.current_page.value == "Advanced_URLFilter_Content.html")
{document.form.url_date_x_Sun.checked = getDateCheck(document.form.url_date_x.value, 0);
document.form.url_date_x_Mon.checked = getDateCheck(document.form.url_date_x.value, 1);
document.form.url_date_x_Tue.checked = getDateCheck(document.form.url_date_x.value, 2);
document.form.url_date_x_Wed.checked = getDateCheck(document.form.url_date_x.value, 3);
document.form.url_date_x_Thu.checked = getDateCheck(document.form.url_date_x.value, 4);
document.form.url_date_x_Fri.checked = getDateCheck(document.form.url_date_x.value, 5);
document.form.url_date_x_Sat.checked = getDateCheck(document.form.url_date_x.value, 6);
document.form.url_time_x_starthour.value = getTimeRange(document.form.url_time_x.value, 0);
document.form.url_time_x_startmin.value = getTimeRange(document.form.url_time_x.value, 1);
document.form.url_time_x_endhour.value = getTimeRange(document.form.url_time_x.value, 2);
document.form.url_time_x_endmin.value = getTimeRange(document.form.url_time_x.value, 3);
}
else if (document.form.current_page.value == "Advanced_DHCP_Content.html" ||
document.form.current_page.value == "Advanced_RDHCP_Content.html")
{final_flag = 1;
}
else if (document.form.current_page.value == "Advanced_DDNS_Content.html")
{}
else if (document.form.current_page.value == "Main_GStatus_Content.html")
{}
else if (document.form.current_page.value == "Advanced_QOSUserSpec_Content.html")
{
	if (document.form.qos_dfragment_enable_w.checked == true)
		{inputCtrl(document.form.qos_dfragment_size, 1);
	}
	else{
		inputCtrl(document.form.qos_dfragment_size, 0);
	}
}
change = 0;
}

function change_wireless_firewall()
{if (isModel() == "WL600")
{if (document.form.FirewallConfig_DmzEnable[0].checked == true )
{if (document.form.FirewallConfig_DmzDevices.value == "Both")
document.form.WirelessFirewall_img.src = "graph/wf_both.gif";
else if (document.form.FirewallConfig_DmzDevices.value == "802.11a only")
document.form.WirelessFirewall_img.src = "graph/wf_a.gif";
else if (document.form.FirewallConfig_DmzDevices.value == "802.11g only")
document.form.WirelessFirewall_img.src = "graph/wf_g.gif";
}
else  document.form.WirelessFirewall_img.src = "graph/wf_none.gif";
}
else
{if (document.form.FirewallConfig_DmzEnable[0].checked == true)
{document.form.WirelessFirewall_img.src = "graph/wf_g.gif";
}
else document.form.WirelessFirewall_img.src = "graph/wf_none.gif";
}
}
function change_firewall(r)
{if (r == "0")
{inputRCtrl1(document.form.misc_http_x, 0);
inputRCtrl2(document.form.misc_http_x, 1);
inputCtrl(document.form.misc_httpport_x, 0);
if (isModel()!="WL520gc" && isModel()!="SnapAP")
{if (isFlash() != '2MB' && isModel()!= "WL331" )
{inputRCtrl1(document.form.misc_lpr_x, 0);
inputRCtrl2(document.form.misc_lpr_x, 1);
}
inputRCtrl1(document.form.misc_ping_x, 0);
inputRCtrl2(document.form.misc_ping_x, 1);
}
}
else
{inputRCtrl1(document.form.misc_http_x, 1);
inputCtrl(document.form.misc_httpport_x, 1);
if (isModel()!="WL520gc" && isModel()!="SnapAP")
{if (isFlash() != '2MB' && isModel()!="WL331")
{inputRCtrl1(document.form.misc_lpr_x, 1);
}
inputRCtrl1(document.form.misc_ping_x, 1);
}
}
}
function change_wireless_bridge(m, a, r, mflag)
{if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m != 0) {
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
}
return;
if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{wdsimage = "wds_ap";
inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m == "1")
wdsimage = "wds_wds";
else
wdsimage = "wds_mixed";
if (a == "0")
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_anony";
}
else
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_both";
}
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
wdsimage = "graph/" + wdsimage + ".gif";
if (isFlash() != '2MB')
document.form.WirelessBridge_img.src = wdsimage;
}
function change_wireless_bridge2(m, a, r, mflag)
{return;
if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{wdsimage = "wds_ap";
inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m == "1")
wdsimage = "wds_wds";
else
wdsimage = "wds_mixed";
if (a == "0")
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_anony";
}
else
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_both";
}
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
wdsimage = "graph/" + wdsimage + ".gif";
if (isFlash() != '2MB' && isModel2()!='WL530')
document.form.WirelessBridge_img.src = wdsimage;
}
function onSubmit(){
	change = 0;
	pageChanged = 0;
	pageChangedCount = 0;
	
if (document.form.current_page.value == "Advanced_RLANWAN_Content.html")
{checkSubnet();
}
else if (document.form.current_page.value == "Advanced_DMZIP_Content.html")
{checkDmzSubnet();
}
else if (document.form.current_page.value == "Advanced_LFirewall_Content.html")
{updateDateTime(document.form.current_page.value);
}
else if (document.form.current_page.value == "Advanced_WebCam_Content.html")
{updateDateTime(document.form.current_page.value);
}
else if (document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
{if (!validate_ipaddr_final(document.form.lan1_ipaddr, 'lan1_ipaddr') ||
!validate_ipaddr_final(document.form.lan1_netmask, 'lan1_netmask') ||
!validate_ipaddr_final(document.form.dhcp1_start, 'dhcp1_start') ||
!validate_ipaddr_final(document.form.dhcp1_end, 'dhcp1_end')) return false;
if (intoa(document.form.dhcp1_start.value)>intoa(document.form.dhcp1_end.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
inputCtrl(document.form.wl_guest_phrase_x_1, 1);
inputCtrl(document.form.wl_guest_wep_x_1, 1);
inputCtrl(document.form.wl_guest_key1_1, 1);
inputCtrl(document.form.wl_guest_key2_1, 1);
inputCtrl(document.form.wl_guest_key3_1, 1);
inputCtrl(document.form.wl_guest_key4_1, 1);
inputCtrl(document.form.wl_guest_key_1, 1);
unmasq_wepkey_guest();
}

	return true;
}

function onSubmitCtrl(o, s) {
document.form.action_mode.value = s;
return (onSubmit());
}

function onSubmitCtrlOnly(o, s){
	if(s != 'Upload' && s != 'Upload1')
		document.form.action_mode.value = s;
	
	if(s == 'Upload1'){
		if(varload){
			alert("It takes about three minutes to upgrade the firmware. Please do not press [Upload] twice.");
			return false;
		}
		else{			
			disableCheckChangedStatus();
			document.form.submit();
		}		
		//varload++;
	}
	stopFlag = 1;	
	disableCheckChangedStatus();
	return true;
}

function validate_ddns_hostname(o)
{dot=0;
s=o.value;
if(!s.match(".asuscomm.com"))
{alert("Invalid Hostname! The format should be 'xxx.asuscomm.com' and 'xxx' cannot be entirely number.");
return false;
}
if (!validate_string(o))
{return false;
}
for(i=0;i<s.length;i++)
{c = s.charCodeAt(i);
if (c==46)
{dot++;
if(dot>2)
{alert("Invalid Hostname! The format should be 'xxx.asuscomm.com' and 'xxx' cannot be entirely number.");
return false;
}
}
if (!validate_hostnamechar(c))
{alert("Invalid characters of domain name is '" + s.charAt(i) +"' !");
return(false);
}
}
return(true);
}
function validate_hostnamechar(ch)
{if (ch>=48&&ch<=57) return true;
if (ch>=97&&ch<=122) return true;
if (ch>=65&&ch<=90) return true;
if (ch==45) return true;
if (ch==46) return true;
return false;
}

function onSubmitApply(s){
	pageChanged = 0;
	pageChangedCount = 0;
if (document.form.current_page.value == "Advanced_PortMapping_Content.html")
{if (s == "0")
{action = document.form.IPConnection_MappedAction_0;
local = document.form.IPConnection_MappedIP_0;
port = document.form.IPConnection_MappedInPort_0;
desc = document.form.IPConnection_MappedDescript_0;
}
else if (s == "1")
{action = document.form.IPConnection_MappedAction_1;
local = document.form.IPConnection_MappedIP_1;
port = document.form.IPConnection_MappedInPort_1;
desc = document.form.IPConnection_MappedDescript_1;
}
else if (s == "2")
{action = document.form.IPConnection_MappedAction_2;
local = document.form.IPConnection_MappedIP_2;
port = document.form.IPConnection_MappedInPort_2;
desc = document.form.IPConnection_MappedDescript_2;
}
else if (s == "3")
{action = document.form.IPConnection_MappedAction_3;
local = document.form.IPConnection_MappedIP_3;
port = document.form.IPConnection_MappedInPort_3;
desc = document.form.IPConnection_MappedDescript_3;
}
else if (s == "4")
{action = document.form.IPConnection_MappedAction_4;
local = document.form.IPConnection_MappedIP_4;
port = document.form.IPConnection_MappedInPort_4;
desc = document.form.IPConnection_MappedDescript_4;
}
else if (s == "5")
{action = document.form.IPConnection_MappedAction_5;
local = document.form.IPConnection_MappedIP_5;
port = document.form.IPConnection_MappedInPort_5;
desc = document.form.IPConnection_MappedDescript_5;
}
if (action.value == "Set")
{if (!validate_ipaddr(local, "") ||
!validate_portrange(port, ""))
{return false;
}
else if (local.value=="" || port.value == "")
{alert("Local IP or port range fields cannot be empty!");
return false;
}
}
document.form.action_mode.value = action.value;
document.form.action_script.value = "portmapping.sh" + " " + action.value + " " + local.value + " " + port.value;
}
	else if(document.form.current_page.value == "Advanced_ASUSDDNS_Content.html"){
		if(s == "hostname_check"){
			if(!validate_ddns_hostname(document.form.ddns_hostname_x))
				return false;
		}
		
		document.form.action_mode.value = "Update";
		document.form.action_script.value = s;
		document.form.flag.value = "nodetect";
	}
	else{
		document.form.action_mode.value = "Update";
		document.form.action_script.value = s;
	}
	
	return true;
}

function setup_script(s)
{if (document.form.current_page.value == "Advanced_ACL_Content.html")
{document.form.action_script.value = s;
}
}

function change_common(o, s, v){
	change = 1;
	pageChanged = 1;
	
	if(v == "wl_auth_mode"){ /* Handle AuthenticationMethod Change */
		wl_auth_mode_change(0);
		
		if(o.value == "psk" || o.value == "wpa"){
			opts = document.form.wl_auth_mode.options;
			
			if(opts[opts.selectedIndex].text == "WPA-Personal")
				document.form.wl_wpa_mode.value="1";
			else if(opts[opts.selectedIndex].text == "WPA2-Personal")
				document.form.wl_wpa_mode.value="2";
			else if(opts[opts.selectedIndex].text == "WPA-Auto-Personal")
				document.form.wl_wpa_mode.value="0";
			else if(opts[opts.selectedIndex].text == "WPA-Enterprise")  
				document.form.wl_wpa_mode.value="3";
			else if(opts[opts.selectedIndex].text == "WPA-Auto-Enterprise")
				document.form.wl_wpa_mode.value="4";
			
			if(o.value == "psk"){
				document.form.wl_wpa_psk.focus();
				document.form.wl_wpa_psk.select();
			}
		}
		else if(o.value == "shared"){
			//document.form.wl_phrase_x.focus();
			document.form.wl_key1.focus();
			document.form.wl_key1.select();			
		}
	}
	else if (v == "wl_crypto"){
		wl_auth_mode_change(0);
	}
	else if(v == "wl_wep_x"){ /* Handle AuthenticationMethod Change */
		change_wlweptype(o, "WLANConfig11b");
	}
	else if(v == "wl_key"){ /* Handle AuthenticationMethod Change */
		var selected_key = eval("document.form.wl_key"+o.value);
		
		selected_key.focus();
		selected_key.select();
	}
//else if(s=="WLANConfig11b" && v == "wl_channel")
//{insertExtChannelOption();
//}
else if(s=="WLANConfig11b" && v == "wl_nbw_cap")
{insertExtChannelOption();
}
else if (s=="WLANConfig11b" && v=="wl_gmode_check")
{
	if (document.form.wl_gmode_check.checked == true)
		document.form.wl_gmode_protection_x.value = "1";
	else
		document.form.wl_gmode_protection_x.value = "0";
}
else if(s=="WLANConfig11b" && v == "wl_gmode")
{
	if(window.top.isBand() == 'b' || o.value=='4' || o.value=='2') 
		inputCtrl(document.form.wl_gmode_check, 0); // B/N only
	else
		inputCtrl(document.form.wl_gmode_check, 1);
		
	if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "0")
		inputCtrl(document.form.wl_nbw_cap, 1);
	else {
		inputCtrl(document.form.wl_nbw_cap, 0);
		document.form.wl_nbw_cap.value = "0";
	}
		
	insertExtChannelOption();
	if(o.value=='2')
		document.form.wl_wme.value = '1';
}
else if (v == "wl_mode_x")
{change_wireless_bridge(o.value, rcheck(document.form.wl_wdsapply_x), 0, 1);
}
else if (v == "wl_guest_auth_mode_1") /* Handle AuthenticationMethod Change */
{wl_auth_mode_change_guest(0);
if (o.value == "psk"){
document.form.wl_guest_wpa_psk_1.focus();
document.form.wl_guest_wpa_psk_1.select();
}
else if (o.value == "shared"){
document.form.wl_guest_phrase_x_1.focus();
document.form.wl_guest_phrase_x_1.select();
}
}
else if (v == "wl_guest_wep_x_1") /* Handle AuthenticationMethod Change */
{change_wlweptype_guest(o, "WLANConfig11b");
}
else if (v == "wl_guest_crypto_1")
{wl_auth_mode_change_guest(0);
}
else if (s == "FirewallConfig" && v=="DmzDevices")
{change_wireless_firewall();
}
else if (s == "FirewallConfig" && v=="WanLanDefaultAct")
{if (o.value == "DROP")
alert("Selecting DROP will drop all WAN to LAN packets except for those matched in filter table. Please use it carefully.");
}
else if (s == "FirewallConfig" && v=="LanWanDefaultAct")
{if (o.value == "DROP")
alert("Selecting DROP will drop all LAN to WAN packets except for those matched in filter table. Please use it carefully.");
}
else if (s=="WLANConfig11b" && v=="x_Mode11g")
{RefreshRateSetList(document.form.WLANConfig11b_x_Mode11g.value, true);
}
else if (s=="WLANConfig11b" && v=="Channel" && document.form.current_page.value=="Advanced_WMode_Content.html")
{
	if (document.form.WLANConfig11b_x_APMode.value != "0" && document.form.WLANConfig11b_Channel.value == "0")
	{
		alert("Please choose a fixed channel for WDS.");
		document.form.WLANConfig11b_Channel.options[0].selected = 0;
		document.form.WLANConfig11b_Channel.options[1].selected = 1;
	}
}
else if (v=="ddns_server_x")
{change_ddns_setting(o.value);
}
return true;
}

function change_ddns_setting(v)
{if (v == "WWW.ASUS.COM")
{inputCtrl(document.form.ddns_username_x, 0);
inputCtrl(document.form.ddns_passwd_x, 0);
document.form.ddns_wildcard_x[0].disabled= 1;
document.form.ddns_wildcard_x[1].disabled= 1;
document.form.LANHostConfig_x_DDNSHostnameCheck_button.disabled= 0;
document.getElementsByTagName("a")[0].removeAttribute("href");
showhide("link", 0);
showhide("Hostname_Note", 1);
}
else
{inputCtrl(document.form.ddns_username_x, 1);
inputCtrl(document.form.ddns_passwd_x, 1);
document.form.ddns_wildcard_x[0].disabled= 0;
document.form.ddns_wildcard_x[1].disabled= 0;
document.form.LANHostConfig_x_DDNSHostnameCheck_button.disabled= 1;
document.getElementsByTagName("a")[0].setAttribute("href","javascript:openLink('x_DDNSServer')");
showhide("link", 1);
showhide("Hostname_Note", 0);
}
}

function change_common_radio(o, s, v, r){
	change = 1;
	pageChanged = 1;
if (v=='wl_wdsapply_x')
{if (isCard()=='ralink'  || isModel2()=='WL530' )
{change_wireless_bridge2(document.form.wl_mode_x.value,
rcheck(document.form.wl_wdsapply_x),
1, 0);
}
else{}
}
else if (v=='wl_lazywds')
{}
	else if (v=='wps_mode')
	{
		if (r == '1')
			inputCtrl(document.form.wps_sta_pin, 1);
		else
			inputCtrl(document.form.wps_sta_pin, 0);
	}
else if (v=="qos_dfragment_enable")
{if (r == '1')
{inputCtrl(document.form.qos_dfragment_size, 1);
}
else
{inputCtrl(document.form.qos_dfragment_size, 0);
}
}
	else if(v == "wan_dnsenable_x"){
		if(r == 1){
			inputCtrl(document.form.wan_dns1_x, 0);
			inputCtrl(document.form.wan_dns2_x, 0);
		}
		else{
			inputCtrl(document.form.wan_dns1_x, 1);
			inputCtrl(document.form.wan_dns2_x, 1);
		}
	}
else if (v=="fw_enable_x")
{change_firewall(r);
}
else if (v=="x_AESEnable")
{if (r == '1')
{if (document.form.WLANConfig11a_AuthenticationMethod.value!="Open System")
{rst = confirm("If you would like to enable AES unique, Authentication should be set as Open System!");
if (rst)
document.form.WLANConfig11a_AuthenticationMethod.value = "Open System";
else
{inputRCtrl2(document.form.WLANConfig11a_x_AESEnable, 1);
return false;
}
}
else
{if (document.form.WLANConfig11a_WEPType.value == "None")
{rst = confirm("If you would like to enable AES unique, WEP should be enabled too!");
if (rst)
{document.form.WLANConfig11a_WEPType.value = "64bits";
change_wlweptype(document.form.WLANConfig11a_WEPType, "WLANConfig11a");
}
else
{inputRCtrl2(document.form.WLANConfig11a_x_AESEnable, 1);
return false;
}
}
}
}
}
else if (s=="WLANConfig11b" && v=="wl_gmode") 
{if (document.form.wl_gmode_check.checked == true)
{document.form.wl_gmode_protection_x.value = "1";
}
else
{document.form.wl_gmode_protection_x.value = "0";
}
}
else if (s=="PrinterStatus" && v=="usb_webhttpport_x")
{if (document.form.usb_webhttpport_x_check.checked)
{document.form.usb_webhttpcheck_x.value = "1";
}
else
{document.form.usb_webhttpcheck_x.value = "0";
}
}
else if (v=="lan_proto_x")
{if (r == '1')
{inputCtrl(document.form.lan_ipaddr, 0);
inputCtrl(document.form.lan_netmask, 0);
inputCtrl(document.form.lan_gateway, 0);
}
else
{inputCtrl(document.form.lan_ipaddr, 1);
inputCtrl(document.form.lan_netmask, 1);
inputCtrl(document.form.lan_gateway, 1);
}
}
else if (s=='FirewallConfig' && v=='DmzEnable')
{change_wireless_firewall();
}
else if (s=="PPPConnection" && v=="wan_pppoe_idletime")
{if (document.form.wan_pppoe_idletime_check.checked)
{document.form.wan_pppoe_txonly_x.value = "1";
}
else
{document.form.wan_pppoe_txonly_x.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_IdleTime1")
{if (document.form.PPPConnection_x_IdleTime1_check.checked)
{document.form.PPPConnection_x_IdleTxOnly1.value = "1";
}
else
{document.form.PPPConnection_x_IdleTxOnly1.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_MultiPPPoEEnable1")
{if (document.form.PPPConnection_x_MultiPPPoEEnable1[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName1, flag);
inputCtrl(document.form.PPPConnection_x_Password1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU1, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU1, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName1, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator1, flag);
}
else if (s=="PPPConnection" && v=="x_IdleTime2")
{if (document.form.PPPConnection_x_IdleTime2_check.checked)
{document.form.PPPConnection_x_IdleTxOnly2.value = "1";
}
else
{document.form.PPPConnection_x_IdleTxOnly2.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_MultiPPPoEEnable2")
{if (document.form.PPPConnection_x_MultiPPPoEEnable2[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName2, flag);
inputCtrl(document.form.PPPConnection_x_Password2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU2, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU2, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName2, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator2, flag);
}
return true;
}

function valid_WPAPSK(o){
	if(o.value.length >= 64){
		o.value = o.value.substring(0, 63);
		alert("Pre-shared key should be less than 64 characters!");
		return false;
	}
	
	return true;
}

function encryptionType(authType, wepType)
{pflag = "1";
if (authType.value == "1")
{if (wepType.value == "0") wepLen = "64";
else wepLen = "128";
}
else if (authType.value == "2")
{wepLen = "0";
}
else if (authType.value == "3")
{wepLen = "0";
pflag = "0";
}
else if (authType.value == "4")
{if (wepType.value == "0") wepLen = "64";
else wepLen = "128";
}
else
{if (wepType.value == "0")
{wepLen = "0";
pflag = "0";
}
else if (wepType.value == "1") wepLen = "64";
else wepLen = "128";
}
return(pflag + wepLen);
}

function change_wlweptype(o, s, isload){
	if(o.value == "0"){
		wflag = 0;
		wep = "";
		
		document.form.wl_key1.value = wep;
		document.form.wl_key2.value = wep;
		document.form.wl_key3.value = wep;
		document.form.wl_key4.value = wep;
	}
	else{
		wflag = 1;
		
		if(document.form.wl_phrase_x.value.length > 0 && isload == 0)
			is_wlphrase("WLANConfig11b", "wl_phrase_x", document.form.wl_phrase_x);
	}
	
	inputCtrl(document.form.wl_phrase_x, wflag);
	inputCtrl(document.form.wl_key1, wflag);
	inputCtrl(document.form.wl_key2, wflag);
	inputCtrl(document.form.wl_key3, wflag);
	inputCtrl(document.form.wl_key4, wflag);
	inputCtrl(document.form.wl_key, wflag);
	
	wl_wep_change();
	/*if(wflag == "1"){
		document.form.wl_key1.focus();
		document.form.wl_key1.select();		
	}*/
}

function is_wlkey(o, s){
	if(!nav)
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0)
		return true;
	
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
		wep = document.form.wl_guest_wep_x_1.value;
	else
		wep = document.form.wl_wep_x.value;
	
	if((keyPressed > 47 && keyPressed < 58)
			|| (keyPressed > 64 && keyPressed < 71)
			|| (keyPressed > 96 && keyPressed < 103)){
		if(wep == "1"){
			if(o.value != "" && o.value.length > 10)
				return false;
		}
		else if(wep == "2"){
			if(o.value != "" && o.value.length > 26)
				return false;
		}
		else
			return false;
	}
	else
		return false;
	
	return true;
}

function change_wlkey(o, s){
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
		wep = document.form.wl_guest_wep_x_1.value;
	else
		wep = document.form.wl_wep_x.value;
	
	if(wep == "1"){
		if(o.value.length > 10)
			o.value = o.value.substring(0, 10);
	}
	else if(wep == "2"){
		if(o.value.length > 26)
			o.value = o.value.substring(0, 26);
	}
	
	return true;
}

function validate_timerange(o, p)
{
	if (o.value.length==0) 
		o.value = "00";
	else if (o.value.length==1) 
		o.value = "0" + o.value;
		
	if (o.value.charAt(0)<'0' || o.value.charAt(0)>'9') 
		o.value = "00";
	else if (o.value.charAt(1)<'0' || o.value.charAt(1)>'9') 
		o.value = "00";
	else if (p==0 || p==2)
	{
		if(o.value>23)
			o.value = "00";
	}
	else
	{
		if(o.value>59)
			o.value = "00";
	}
	return true;
}

function matchSubnet(ip1, ip2, count)
{var c = 0;
var v1 = 0;
var v2 = 0;
for(i=0;i<ip1.length;i++)
{if (ip1.charAt(i) == '.')
{if (ip2.charAt(i) != '.')
return false;
c++;
if (v1!=v2) return false;
v1 = 0;
v2 = 0;
}
else
{if (ip2.charAt(i)=='.') return false;
v1 = v1*10 + (ip1.charAt(i) - '0');
v2 = v2*10 + (ip2.charAt(i) - '0');
}
if (c==count) return true;
}
return false;
}
function subnetPrefix(ip, orig, count)
{r='';
c=0;
for(i=0;i<ip.length;i++)
{if (ip.charAt(i) == '.')
c++;
if (c==count) break;
r = r + ip.charAt(i);
}
c=0;
for(i=0;i<orig.length;i++)
{if (orig.charAt(i) == '.')
{c++;
}
if (c>=count)
r = r + orig.charAt(i);
}
return (r);
}

function checkSubnet(){
	/* Rule : If addresses in pool are match to subnet, don't change */
	/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
	if(!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3) ||
			!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3)){
		if(confirm("The setting of DHCP server does not match current IP address of LAN. Would you like to change it automatically?")){
			document.form.dhcp_start.value = subnetPrefix(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3);
			document.form.dhcp_end.value = subnetPrefix(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3);
		}
	}
}

function checkDmzSubnet()
{/* Rule : If addresses in pool are match to subnet, don't change */
/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
if (!matchSubnet(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMinAddress.value, 3) ||
!matchSubnet(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMaxAddress.value, 3))
{if (confirm("The setting of DHCP server does not match current IP address of Wireless Firewall. Would you like to change it automatically?"))
{document.form.LANHostConfig_DmzMinAddress.value = subnetPrefix(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMinAddress.value, 3);
document.form.LANHostConfig_DmzMaxAddress.value = subnetPrefix(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMaxAddress.value, 3);
}
}
}
function checkSubnetGuest()
{
	/* Rule : If addresses in pool are match to subnet, don't change */
	/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
	if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3) ||
	!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3))
	{
		if (confirm("The setting of DHCP server does not match current IP address of LAN. Would you like to change it automatically?"))
		{
			document.form.dhcp1_start.value = subnetPrefix(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3);
			document.form.dhcp1_end.value = subnetPrefix(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3);
		}
	}
}
function wan_netmask_check(o) {
ip =intoa(document.form.wan_ipaddr.value);
gw =intoa(document.form.wan_gateway.value);
nm =intoa(document.form.wan_netmask.value);
lip=intoa(document.form.lan_ipaddr.value);
lnm=intoa(document.form.lan_netmask.value);
rem=1;
// 2008.03 James. patch for Oleg's patch. {
//if (ip==0x0 || (ip&lnm)==(lip&lnm))
if (document.form.wan_ipaddr.value != '0.0.0.0' && (ip&lnm)==(lip&lnm))
// 2008.03 James. patch for Oleg's patch. }
{alert(o.value + ' is not a valid IP address!');
document.form.wan_ipaddr.value="10.1.1.1";
document.form.wan_netmask.value="255.0.0.0";
o.focus();
o.select();
return false;
}
if (gw==0 || gw==0xffffffff || (ip&nm)==(gw&nm))
{return true;
}
else
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
}

function updateDateTime(s)
{
	if (s == "Advanced_Firewall_Content.html")
	{
		document.form.filter_lw_date_x.value = setDateCheck(
		document.form.filter_lw_date_x_Sun,
		document.form.filter_lw_date_x_Mon,
		document.form.filter_lw_date_x_Tue,
		document.form.filter_lw_date_x_Wed,
		document.form.filter_lw_date_x_Thu,
		document.form.filter_lw_date_x_Fri,
		document.form.filter_lw_date_x_Sat);
		document.form.filter_lw_time_x.value = setTimeRange(
		document.form.filter_lw_time_x_starthour,
		document.form.filter_lw_time_x_startmin,
		document.form.filter_lw_time_x_endhour,
		document.form.filter_lw_time_x_endmin);
	}
	else if (s == "Advanced_WAdvanced_Content.html")
	{
		if (isModel()!="WL520gc" && isModel()!="SnapAP")
		{
			document.form.wl_radio_date_x.value = setDateCheck(
			document.form.wl_radio_date_x_Sun,
			document.form.wl_radio_date_x_Mon,
			document.form.wl_radio_date_x_Tue,
			document.form.wl_radio_date_x_Wed,
			document.form.wl_radio_date_x_Thu,
			document.form.wl_radio_date_x_Fri,
			document.form.wl_radio_date_x_Sat);
			document.form.wl_radio_time_x.value = setTimeRange(
			document.form.wl_radio_time_x_starthour,
			document.form.wl_radio_time_x_startmin,
			document.form.wl_radio_time_x_endhour,
			document.form.wl_radio_time_x_endmin);
		}
	}
	else if (s == "Advanced_URLFilter_Content.html")
	{
		document.form.url_date_x.value = setDateCheck(
		document.form.url_date_x_Sun,
		document.form.url_date_x_Mon,
		document.form.url_date_x_Tue,
		document.form.url_date_x_Wed,
		document.form.url_date_x_Thu,
		document.form.url_date_x_Fri,
		document.form.url_date_x_Sat);
		document.form.url_time_x.value = setTimeRange(
		document.form.url_time_x_starthour,
		document.form.url_time_x_startmin,
		document.form.url_time_x_endhour,
		document.form.url_time_x_endmin);
	}		
	else if (s == "Advanced_LFirewall_Content.html")
	{
		document.form.FirewallConfig_WanLocalActiveDate.value = setDateCheck(
		document.form.FirewallConfig_WanLocalActiveDate_Sun,
		document.form.FirewallConfig_WanLocalActiveDate_Mon,
		document.form.FirewallConfig_WanLocalActiveDate_Tue,
		document.form.FirewallConfig_WanLocalActiveDate_Wed,
		document.form.FirewallConfig_WanLocalActiveDate_Thu,
		document.form.FirewallConfig_WanLocalActiveDate_Fri,
		document.form.FirewallConfig_WanLocalActiveDate_Sat);
		document.form.FirewallConfig_WanLocalActiveTime.value = setTimeRange(
		document.form.FirewallConfig_WanLocalActiveTime_starthour,
		document.form.FirewallConfig_WanLocalActiveTime_startmin,
		document.form.FirewallConfig_WanLocalActiveTime_endhour,
		document.form.FirewallConfig_WanLocalActiveTime_endmin);
	}
}

function openLink(s)
{if (s=='x_DDNSServer')
{if (document.form.ddns_server_x.value.indexOf("WWW.DYNDNS.ORG")!=-1)
tourl = "https://www.dyndns.org/account/create.html"
else if (document.form.ddns_server_x.value == 'WWW.ZONEEDIT.COM')
tourl = "https://www.zoneedit.com/signup.html"
else if (document.form.ddns_server_x.value == 'WWW.ASUS.COM')
tourl = "";
else
tourl = "https://controlpanel.tzo.com/cgi-bin/tzopanel.exe"
link = window.open(tourl, "DDNSLink",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=480");
}
else if (s=='x_NTPServer1')
{tourl = "http://ntp.isc.org/bin/view/Servers/WebHome"
link = window.open(tourl, "NTPLink",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=480");
}
else if (s=='x_WImageSize')
{tourl = "Advanced_ShowTime_Widzard.html"
link = window.open(tourl, "WebCamera",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
else if (s=='x_WImageStatic')
{tourl = "ShowWebCamPic.html"
link = window.open(tourl, "WebCamera",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
else if (s=='x_WRemote')
{tourl = "Advanced_RemoteControl_Widzard.html"
link = window.open(tourl, "RemoteMonitor",
"toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,top=0,left=0,width=" + screen.width + ",height=" + screen.height);
}
else if (s=='x_FIsAnonymous' || s=='x_FIsSuperuser')
{urlstr = location.href;
url = urlstr.indexOf("http://");
port = document.form.usb_ftpport_x.value;
if (url == -1) urlpref = LANIP;
else
{urlstr = urlstr.substring(7, urlstr.length);
url = urlstr.indexOf(":");
if (url!=-1)
{urlpref = urlstr.substring(0, url);
}
else
{url = urlstr.indexOf("/");
if (url!=-1) urlpref = urlstr.substring(0, url);
else urlpref = urlstr;
}
}
if (s=='x_FIsAnonymous')
{user = 'anonymous';
tourl = "ftp://" + urlpref;
}
else
{user = 'admin';
tourl = "ftp://" + user + "@" + urlpref;
}
if (port!=21) tourl = tourl + ":" + port;
link = window.open(tourl, "FTPServer",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
if (!link.opener) link.opener = self;
}

function blur_body()
{alert('Out of focus!');
}
/* Used when WEP is changed */
function changeWEPType()
{if (document.form.wl_wep.value == "0")
{flag = 0;
}
else
{flag = 1;
}
inputCtrl(document.form.wl_phrase_x, flag);
inputCtrl(document.form.wl_key1, flag);
inputCtrl(document.form.wl_key2, flag);
inputCtrl(document.form.wl_key3, flag);
inputCtrl(document.form.wl_key4, flag);
inputCtrl(document.form.wl_key, flag);
}
/* Used when Authenication Method is changed */
function changeAuthType()
{if (document.form.wl_auth_mode.value == "shared")
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key2, 1);
inputCtrl(document.form.wl_key3, 1);
inputCtrl(document.form.wl_key4, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "psk")
{inputCtrl(document.form.wl_crypto, 1);
inputCtrl(document.form.wl_wpa_psk, 1);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key2, 1);
inputCtrl(document.form.wl_key3, 1);
inputCtrl(document.form.wl_key4, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "wpa" || document.form.wl_auth_mode.value == "wpa2")
{inputCtrl(document.form.wl_crypto, 1);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 0);
inputCtrl(document.form.wl_phrase_x, 0);
inputCtrl(document.form.wl_key1, 0);
inputCtrl(document.form.wl_key2, 0);
inputCtrl(document.form.wl_key3, 0);
inputCtrl(document.form.wl_key4, 0);
inputCtrl(document.form.wl_key, 0);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "radius")
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 0);
inputCtrl(document.form.wl_phrase_x, 0);
inputCtrl(document.form.wl_key1, 0);
inputCtrl(document.form.wl_key2, 0);
inputCtrl(document.form.wl_key3, 0);
inputCtrl(document.form.wl_key4, 0);
inputCtrl(document.form.wl_key, 0);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
}
/* input : s: service id, v: value name, o: current value */
/* output: wep key1~4       */
function is_wlphrase(s, v, o){
	var pseed = new Array;
	var wep_key = new Array(5);
	
	if(v=='wl_wpa_psk')
		return(valid_WPAPSK(o));
	
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html"){
		wepType = document.form.wl_guest_wep_x_1.value;
		wepKey1 = document.form.wl_guest_key1_1;
		wepKey2 = document.form.wl_guest_key2_1;
		wepKey3 = document.form.wl_guest_key3_1;
		wepKey4 = document.form.wl_guest_key4_1;
	}
	else{	// note: current_page == "Advanced_Wireless_Content.html"
		wepType = document.form.wl_wep_x.value;
		wepKey1 = document.form.wl_key1;
		wepKey2 = document.form.wl_key2;
		wepKey3 = document.form.wl_key3;
		wepKey4 = document.form.wl_key4;
	}
	
	phrase = o.value;
	if(wepType == "1"){
		for(var i = 0; i < phrase.length; i++){
			pseed[i%4] ^= phrase.charCodeAt(i);
		}
		
		randNumber = pseed[0] | (pseed[1]<<8) | (pseed[2]<<16) | (pseed[3]<<24);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber*0x343fd)%0x1000000);
			randNumber = ((randNumber+0x269ec3)%0x1000000);
			wep_key[j] = ((randNumber>>16)&0xff);
		}
		
		wepKey1.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey2.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey3.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey4.value = binl2hex_c(wep_key);
	}
	else if(wepType == "2" || wepType == "3"){
		password = "";
		
		if(phrase.length > 0){
			for(var i = 0; i < 64; i++){
				ch = phrase.charAt(i%phrase.length);
				password = password+ch;
			}
		}
		
		password = calcMD5(password);
		if(wepType == "2"){
			wepKey1.value = password.substr(0, 26);
		}
		else{
			wepKey1.value = password.substr(0, 32);
		}
		
		wepKey2.value = wepKey1.value;
		wepKey3.value = wepKey1.value;
		wepKey4.value = wepKey1.value;
	}
	
	return true;
}

function wl_wep_change(){
	var mode = document.form.wl_auth_mode.value;
	var wep = document.form.wl_wep_x.value;
	
	inputCtrl(document.form.wl_crypto, 0);
	inputCtrl(document.form.wl_wpa_psk, 0);
	
	if(mode == "psk" || mode == "wpa" || mode == "wpa2" || mode == "radius"){
		if(mode != "radius")
			inputCtrl(document.form.wl_crypto, 1);
		
		if(mode == "psk")
			inputCtrl(document.form.wl_wpa_psk, 1);
		
		inputCtrl(document.form.wl_wep_x, 0);
		inputCtrl(document.form.wl_phrase_x, 0);
		inputCtrl(document.form.wl_key1, 0);
		inputCtrl(document.form.wl_key2, 0);
		inputCtrl(document.form.wl_key3, 0);
		inputCtrl(document.form.wl_key4, 0);
		inputCtrl(document.form.wl_key, 0);
		
		if(mode == "radius")
			inputCtrl(document.form.wl_wpa_gtk_rekey, 0);
		else
			inputCtrl(document.form.wl_wpa_gtk_rekey, 1);
	}
	else{
		if(wep != "0"){
			inputCtrl(document.form.wl_phrase_x, 1);
			inputCtrl(document.form.wl_key1, 1);
			inputCtrl(document.form.wl_key2, 1);
			inputCtrl(document.form.wl_key3, 1);
			inputCtrl(document.form.wl_key4, 1);
			inputCtrl(document.form.wl_key, 1);
		}
		else{
			inputCtrl(document.form.wl_phrase_x, 0);
			inputCtrl(document.form.wl_key1, 0);
			inputCtrl(document.form.wl_key2, 0);
			inputCtrl(document.form.wl_key3, 0);
			inputCtrl(document.form.wl_key4, 0);
			inputCtrl(document.form.wl_key, 0);
		}
	}
	
	change_key_des();	// 2008.01 James.
}

function change_wep_type(mode, isload){
	var cur_wep = document.form.wl_wep_x.value;
	var wep_type_array;
	var value_array;
	
	free_options(document.form.wl_wep_x);
	
	if(mode == "shared" || mode == "radius"){
		wep_type_array = new Array("WEP-64bits", "WEP-128bits");
		value_array = new Array("1", "2");
	}
	else{
		wep_type_array = new Array("None", "WEP-64bits", "WEP-128bits");
		value_array = new Array("0", "1", "2");
	}
	
	add_options_x2(document.form.wl_wep_x, wep_type_array, value_array, cur_wep);
	
	if(mode == "psk" || mode == "wpa" || mode == "wpa2")
		document.form.wl_wep_x.value = "0";
	
	change_wlweptype(document.form.wl_wep_x, "WLANConfig11b", isload);
}

function wl_auth_mode_reconf(){
	if(document.form.wl_auth_mode.value == "radius" || document.form.wl_auth_mode.value == "wpa" || document.form.wl_auth_mode.value == "wpa2")
		document.form.wl_auth_mode.value = "open";
	
	for(var i = 5; i <= 8; ++i){
		document.form.wl_auth_mode.options[i].value = null;
		document.form.wl_auth_mode.options[i] = null;
	}
}

function insertExtChannelOption()
{
        var country = document.form.wl_country_code.value;
        var orig = document.form.wl_channel.value;
        free_options(document.form.wl_channel);
                                                                                                  
        if (document.form.wl_nbw_cap.value == "1"){
                if (country == "AS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "AG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BD")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "CV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GF")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "GT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ID")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IL0")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "Q2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MQ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "YT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MX")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "MC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "NO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "OM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "PG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "RE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "RO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "RU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ZA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ES")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "TJ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "UA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "US")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "Q1")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "UM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "UY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "UZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "YU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ZM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "Z2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "XB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "XA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                                                                                                  
        } else if (document.form.wl_nbw_cap.value == "0"){
                if (country == "AS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "AG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BD")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "CV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GF")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "GT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ID")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IL0")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
                if (country == "JE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "Q2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MQ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "YT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MX")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "MC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "NO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "OM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "PG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "RE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "RO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "RU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ZA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ES")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "TJ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
                if (country == "TT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "UA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "US")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "Q1")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "UM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "UY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "UZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "YU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ZM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "Z2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "XB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "XA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                                                                                                  
        }
                                                                                                  
        var ch = channels;
                                                                                                  
        ch[0] = "Auto";
        add_options_x2(document.form.wl_channel, ch, channels, orig);

}
/*{
	var nphy_set = "1";
        var phytype;
        var band;
        var nbw_cap;
        var nctrlsb;
        var country = document.forms[0].wl_country_code[document.forms[0].wl_country_code.selectedIndex].value;
        var channels = new Array(0);
        var cur = 0;
        var sel = 0;
                                                                                                  
        if (nphy_set == "1") {
                phytype = "n";
                band  = document.forms[0].wl_nband[document.forms[0].wl_nband.selectedIndex].value;
                nctrlsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                nbw_cap = document.forms[0].wl_nbw_cap[document.forms[0].wl_nbw_cap.selectedIndex].value;
                                                                                                  
                                                                                                  
        } else {
                phytype =  document.forms[0].wl_phytype[document.forms[0].wl_phytype.selectedIndex].value;
        }
*/        /* Save current channel */
/*        for (i = 0; i < document.forms[0].wl_channel.length; i++) {
                if (document.forms[0].wl_channel[i].selected) {
                        cur = document.forms[0].wl_channel[i].value;
                        break;
                }
        }
                                                                                                  
        if (phytype == "a") {
                
        } else if (phytype == "n") {
*/                /* 5 Ghz == a */
/*                if (band == "1") {
                        var nsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                        if ((nbw_cap == "1") || (nbw_cap == "2")) {
                                if (nsb == "upper") {
                                        
                                } else {
                                        
                                }
                        } else if (nbw_cap == "0") {
                                
                        }
                } else if (band == "2")  {
                        var nsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                        if (nbw_cap == "1") {
                                if (nsb == "upper") {
                                        		if (country == "AL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "AI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0B")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "BD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "KY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CX")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ET")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GP")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "VA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ID")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LB")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MQ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MX")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ME")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NP")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "OM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "QA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ES")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "TH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GB")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "US")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "Q2")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "WF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0C")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X0")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X1")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X2")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);

                                } else {
                                        		if (country == "AL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "AI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "0B")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "BD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "KY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "CL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "DK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ET")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "DE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "VA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ID")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "JM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "JO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "YT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ME")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "OM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "QA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ZA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ES")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "TH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "US")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "Q2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "UM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "UY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "WF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "0C")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ZW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "X0")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "X1")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "X2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "XW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "XY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "XV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

                                }
                        } else if ((nbw_cap == "0") || (nbw_cap == "2")) {
                                		if (country == "AF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "AO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0B")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "BD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ER")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ET")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "GT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ID")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "JE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0A")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ML")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "MD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ME")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "NO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "OM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "QA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "WS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ST")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ES")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "TJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "US")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "Q2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "WF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0C")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "Z2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X0")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X1")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X3")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "XY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "XV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "B2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);

                        }
                }
        } else {
                
        }
*/                                                                                                  
        /* Reconstruct channel array from new channels */
/*        document.forms[0].wl_channel.length = channels.length;
        for (var i in channels) {
                if (channels[i] == 0)
                        document.forms[0].wl_channel[i] = new Option("Auto", channels[i]);
                else
                        document.forms[0].wl_channel[i] = new Option(channels[i], channels[i]);
                document.forms[0].wl_channel[i].value = channels[i];
                if (channels[i] == cur) {
                        document.forms[0].wl_channel[i].selected = true;
                        sel = 1;
                }
        }
                                                                                                  
        if (sel == 0)
                document.forms[0].wl_channel[0].selected = true;
	
}
*/
/*
function insertExtChannelOption()
{var wmode = document.form.wl_gmode.value;
var CurrentCh = document.form.wl_channel.value;
var option_length = document.form.wl_channel.options.length;
if ((wmode == "2"||wmode == "3") && document.form.HT_BW.value == "1")
{inputCtrl(document.form.HT_EXTCHA, 1);
var x = document.form.HT_EXTCHA;
var length = document.form.HT_EXTCHA.options.length;
if (length > 1)
{x.selectedIndex = 1;
x.remove(x.selectedIndex);
}
if ((CurrentCh >=1) && (CurrentCh <= 4))
{x.options[0].text = 1*CurrentCh + 4;
x.options[0].value = 1;
}
else if ((CurrentCh >= 5) && (CurrentCh <= 7))
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
else if ((CurrentCh >= 8) && (CurrentCh <= 9))
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
if (option_length >=14)
{CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
}
else if (CurrentCh == 10)
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
if (option_length > 14)
{CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
}
else if (CurrentCh >= 11)
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 1;
}
else
{x.options[0].text = "Auto";
x.options[0].value = "1";
}
}
else
inputCtrl(document.form.HT_EXTCHA, 0);
}
*/

function wl_auth_mode_change(isload){
	var mode = document.form.wl_auth_mode.value;
	var i, cur, algos;
	
	if(mode == "radius")
		inputCtrl(document.form.wl_wep_x, 0);
	else
		inputCtrl(document.form.wl_wep_x, 1);
	
	/* enable/disable crypto algorithm */
	if(mode == "wpa" || mode == "wpa2" || mode == "psk")
		inputCtrl(document.form.wl_crypto, 1);
	else
		inputCtrl(document.form.wl_crypto, 0);
	
	/* enable/disable psk passphrase */
	if(mode == "psk")
		inputCtrl(document.form.wl_wpa_psk, 1);
	else
		inputCtrl(document.form.wl_wpa_psk, 0);

	/* update wl_crypto */
	if(mode == "psk"){
		/* Save current crypto algorithm */
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		if(isModel() == "SnapAP" || isBand() == 'b')
			algos = new Array("TKIP");
		else{
			opts = document.form.wl_auth_mode.options;
			
			if(opts[opts.selectedIndex].text == "WPA-Personal")
				algos = new Array("TKIP");
			else if(opts[opts.selectedIndex].text == "WPA2-Personal")
				algos = new Array("AES");
			else
				algos = new Array("TKIP", "AES", "TKIP+AES");
		}
		
		/* Reconstruct algorithm array from new crypto algorithms */
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	else if(mode == "wpa"){
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		opts = document.form.wl_auth_mode.options;
		if(opts[opts.selectedIndex].text == "WPA-Enterprise")
			algos = new Array("TKIP");
		else
			algos = new Array("TKIP", "AES", "TKIP+AES");
		
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	else if(mode == "wpa2"){
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		algos = new Array("AES");
		
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	
	change_wep_type(mode, isload);
	
	/* Save current network key index */
	for(var i = 0; i < document.form.wl_key.length; i++){
		if(document.form.wl_key[i].selected){
			cur = document.form.wl_key[i].value;
			break;
		}
	}
	
	/* Define new network key indices */
	if(mode == "wpa" || mode == "wpa2" || mode == "psk")
		algos = new Array("2", "3");
	else{
		algos = new Array("1", "2", "3", "4");
		if(!isload)
			cur = "1";
	}
	
	/* Reconstruct network key indices array from new network key indices */
	document.form.wl_key.length = algos.length;
	for(var i in algos){
		document.form.wl_key[i] = new Option(algos[i], algos[i]);
		document.form.wl_key[i].value = algos[i];
		if(algos[i] == cur)
			document.form.wl_key[i].selected = true;
	}
	
	wl_wep_change();
}

function wl_rate_change()
{
	orig = document.form.wl_rate.value;
	free_options(document.form.wl_rate);
	if (document.form.wl_gmode.value == "1")
	{
		vitems = new Array("0", "1000000", "2000000", "5500000", "6000000", "9000000", "11000000", "12000000", "18000000", "24000000", "36000000", "48000000", "54000000");
		items = new Array("Auto", "1", "2", "5.5", "6", "9", "11", "12", "18", "24", "36", "48", "54");
	}
	else if (document.form.wl_gmode.value == "4")
	{
		vitems = new Array("0", "6000000", "9000000", "12000000", "18000000", "24000000", "36000000", "48000000", "54000000");
		items = new Array("Auto", "6", "9", "12", "18", "24", "36", "48", "54");
	}
	else
	{
		vitems = new Array("0", "1000000", "2000000", "5500000", "11000000");
		items = new Array("Auto", "1", "2", "5.5", "11");
	}
	add_options_x2(document.form.wl_rate, items, vitems, orig);
}

function masq_wepkey()
{wep1 = document.form.wl_key1.value;
wep2 = document.form.wl_key2.value;
wep3 = document.form.wl_key3.value;
wep4 = document.form.wl_key4.value;
if (wep1.length == 10)
{wep = "**********";
}
else if (wep1.length == 26)
{wep = "**************************";
}
else wep = "";
document.form.wl_key1.value = wep;
document.form.wl_key2.value = wep;
document.form.wl_key3.value = wep;
document.form.wl_key4.value = wep;
}
function unmasq_wepkey()
{if (document.form.wl_key1.value.indexOf("**********") != -1)
document.form.wl_key1.value = wep1;
if (document.form.wl_key2.value.indexOf("**********") != -1)
document.form.wl_key2.value = wep2;
if (document.form.wl_key3.value.indexOf("**********") != -1)
document.form.wl_key3.value = wep3;
if (document.form.wl_key4.value.indexOf("**********") != -1)
document.form.wl_key4.value = wep4;
}

function showhide(element, sh)
{
	var status;
	if (sh == 1){
		status = "block";
	}
	else{
		status = "none"
	}
	
	if(document.getElementById){
		document.getElementById(element).style.display = status;
	}
	else if (document.all){
		document.all[element].style.display = status;
	}
	else if (document.layers){
		document.layers[element].display = status;
	}
}

/****  Lock add in 1127 from OLD UI in index.html******/
var Add_Flag = "";
var Edit_Flag = "";
var Mkdir_Flag = "";
var Share_Path = "";
function isMode()
{if (document.form.wan_nat_x.value == '1')
mode = 'Gateway';
else if (document.form.wan_route_x.value == 'IP_Routed')
mode = 'Router';
else
mode = 'AP';
return mode;
}
function isModel()
{model = 'WL600';
pid = document.form.productid.value;
if (pid.indexOf("WL520gc")!=-1 ||
pid.indexOf("WL500g-X")!=-1 ||
pid.indexOf("WL500g-E")!=-1 ||
pid.indexOf("WL550gE")!=-1 ||
pid.indexOf("WL530")!=-1) model = 'WL520gc';
else if (pid.indexOf("WL500")!=-1 ||
pid.indexOf("WL700")!=-1 ||
pid.indexOf("WL-500gP V2")!=-1 ||
pid.indexOf("WLMIMO")!=-1) model = 'WL500';
else if (pid.indexOf("WL331")!=-1) model = 'WL331';
else if (pid.indexOf("SnapAP")!=-1) model = 'SnapAP';
else if (pid.indexOf("WL300")!=-1) model = 'WL300';
else if (pid.indexOf("WL550")!=-1) model = 'WL550';
else if (pid.indexOf("WL520gu")!=-1) model = 'WL520gu';
return model;
}
function isModel2()
{model2 = 'WL600';
pid = document.form.productid.value;
if (pid.indexOf("WL530")!=-1) model2 = 'WL530';
else if (pid.indexOf("WL500g-X")!=-1 || pid.indexOf("WL500g-E")!=-1 || pid.indexOf("WL520")!=-1 || pid.indexOf("WL550gE")!=-1) model2 = 'WL520';
return model2;
}
function isModel3()
{model3 = 'WL500';
pid = document.form.productid.value;
if (pid.indexOf("WL550gE")!=-1) model3 = 'WL550gE';
return model3;
}
function isBand()
{band = 'g';
pid = document.form.productid.value;
if (pid.indexOf("WL500b")!=-1) band = 'b';
return band;
}
function isCard()
{card = 'broadcom';
pid = document.form.productid.value;
if (pid.indexOf("WL500bv2")!=-1) card = 'ralink';
return card;
}
function isFlash()
{flash = '4MB';
pid = document.form.productid.value;
if (pid.indexOf("WL331g")!=-1) flash = '2MB';
else if (pid.indexOf("WL500g.Lite")!=-1) flash = '2MB';
else if (pid.indexOf("WL500b.Lite")!=-1) flash = '2MB';
else if (pid.indexOf("WL500g-X")!=-1 || pid.indexOf("WL500g-E")!=-1 || pid.indexOf("WL520gc")!=-1 || pid.indexOf("WL550gE")!=-1) flash = '2MB';
return flash;
}

function appendChild(parent, child)
{parent[parent.length] = child
return child
}

var foldersTree = 0
var timeOutId = 0
var pageChanged = 0;
var pageChangedCount = 0;
var goquick=0;

/****  Lock add in 1127 from OLD UI in index.html******/
function is_number_sp(event, o){
	keyPressed = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (nav)
	{
		if (	(keyPressed==8)||	// backspace
			(keyPressed==35)||	// end
			(keyPressed==36)||	// home
			(keyPressed==37)||	// <-
			(keyPressed==39)||	// ->
			(keyPressed==46)	// delete
		)
			keyPressed=0;
	}

	if (keyPressed==0)
		return true;
	if (keyPressed>47 && keyPressed<58)
	{
		if (keyPressed==48 && o.length == 0) return false;
		return true;
	}
	else
	{
		return false;
	}
}
=======
﻿/*general*/
var nav;
var change;
var keyPressed;
var wItem;
var ip = "";
var ip_addr = '<!--#echo var="REMOTE_ADDR"-->';
var chanList = 0;
var wep1, wep2, wep3, wep4;
var varload=0;
var final_flag = 0;	// for validate_ipaddr() always return true.

if(navigator.appName.indexOf("Microsoft") != -1){
	nav = false;
	document.onkeydown = MicrosoftEventHandler_KeyDown;
}
else{
	nav = true;
}

function NetscapeEventHandler_KeyDown(e)
{keyPressed = e.which;
if (keyPressed<48 && keyPressed!=16)
{keyPressed = 0;
}
return true;
}

function changeDate()
{pageChanged = 1;
return true;
}
function MicrosoftEventHandler_KeyDown()
{/* if (keyPressed == 13  && event.srcElement.type != 'button' && event.srcElement.type != 'textarea' && event.srcElement.type != 'submit')
return false;
return true;*/
return true;
}

function str2val(v)
{for(i=0; i<v.length; i++)
{if (v.charAt(i) !='0') break;
}
return v.substring(i);
}
function inputRCtrl1(o, flag)
{if (flag == 0)
{o[0].disabled = 1;
o[1].disabled = 1;
}
else
{o[0].disabled = 0;
o[1].disabled = 0;
}
}
function inputRCtrl2(o, flag)
{if (flag == 0)
{o[0].checked = true;
o[1].checked = false;
}
else
{o[0].checked = false;
o[1].checked = true;
}
}

function checkPass(o, o1, o2)
{if (o1.value==o2.value)
{document.form.action_mode.value = "  Save  ";
return true;
}
alert('Two password strings do not match.');
return false;
}

function markGroup(o, s, c, b) {
	var bFlag, cFlag;
	
	document.form.group_id.value = s;
	bFlag = 0; //Judge the input field is blank or not. 1:blank;
	cFlag = 0; //Judge the input item number is overload or not.
	
	if(b == " Add "){		
		if(s == 'RBRList'){
			if(document.form.wl_wdsnum_x_0.value >= c)
				cFlag=1;
			else if(!validate_hwaddr(document.form.wl_wdslist_x_0))
				return false;
			else if(document.form.wl_wdslist_x_0.value == "")
				bFlag = 1;
			else if(!validate_duplicate(document.form.RBRList_s, document.form.wl_wdslist_x_0.value, 12, 0))
				return false;
		}
		else if (s == 'MFList'){
			document.form.macfilter_list_x_0.value = document.form.macfilter_list_x_0.value.toUpperCase();
			
			if (document.form.macfilter_num_x_0.value >= c) cFlag=1;
			else if (!validate_hwaddr(document.form.macfilter_list_x_0)) return false;
			else if (document.form.macfilter_list_x_0.value=="") bFlag=1;
			else if (!validate_duplicate(document.form.MFList_s, document.form.macfilter_list_x_0.value, 12, 0)) return false;
		}
		else if (s == 'ACLList'){
			if(document.form.wl_macnum_x_0.value >= c)
				cFlag=1;
			else if(!validate_hwaddr(document.form.wl_maclist_x_0))
				return false;
			else if(document.form.wl_maclist_x_0.value=="")
				bFlag = 1;
			else if(!validate_duplicate(document.form.ACLList_s, document.form.wl_maclist_x_0.value, 12, 0))
				return false;
		}
		else if (s=='ManualDHCPList'){
			if (!validate_ipaddr_final(document.form.dhcp_start, 'dhcp_start') ||
			!validate_ipaddr_final(document.form.dhcp_end, 'dhcp_end') ||
			!validate_ipaddr_final(document.form.dhcp_gateway_x, 'dhcp_gateway_x') ||
			!validate_ipaddr_final(document.form.dhcp_dns1_x, 'dhcp_dns1_x') ||
			!validate_ipaddr_final(document.form.dhcp_wins_x, 'dhcp_wins_x') ) return false;
			
			if (intoa(document.form.dhcp_start.value)>intoa(document.form.dhcp_end.value)){
					tmp = document.form.dhcp_start.value;
					document.form.dhcp_start.value = document.form.dhcp_end.value;
					document.form.dhcp_end.value = tmp;
			}
			if (document.form.dhcp_staticnum_x_0.value >= c) cFlag=1;
			else if (!validate_hwaddr(document.form.dhcp_staticmac_x_0) ||
							!validate_ipaddr_final(document.form.dhcp_staticip_x_0, "staticip")) return false;
			else if (document.form.dhcp_staticmac_x_0.value=="" ||
							document.form.dhcp_staticip_x_0.value=="") bFlag=1;
			else if (!validate_duplicate(document.form.ManualDHCPList_s, document.form.dhcp_staticmac_x_0.value, 12, 0)) return false;
			else if (!validate_duplicate(document.form.ManualDHCPList_s, document.form.dhcp_staticip_x_0.value, 15, 14)) return false;
		}
		else if (s=='PPPoERouteList'){
			if (document.form.PPPConnection_PPPoERouteCount_0.value > c) cFlag=1;
			else if (!validate_ipaddr(document.form.PPPConnection_x_PPPoEIP_0, "") ||
							!validate_range(document.form.PPPConnection_x_PPPoEMask_0, 0, 32)) return false;
			else if (document.form.PPPConnection_x_PPPoEIP_0.value=="" ||
							document.form.PPPConnection_x_PPPoEMask_0.value=="") bFlag=1;
		}
		else if (s=='WLFilterList'){
			if (document.form.filter_wl_num_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.filter_wl_srcip_x_0, "") ||
!validate_portrange(document.form.filter_wl_srcport_x_0, "") ||
!validate_iprange(document.form.filter_wl_dstip_x_0, "") ||
!validate_portrange(document.form.filter_wl_dstport_x_0, "")) return false;
else if (document.form.filter_wl_srcip_x_0.value=="" &&
document.form.filter_wl_srcport_x_0.value=="" &&
document.form.filter_wl_dstip_x_0.value=="" &&
document.form.filter_wl_dstport_x_0.value=="") bFlag=1;
		}
		else if (s=='LWFilterList'){			
			if (isModel()!="WL520gc" && isModel()!="SnapAP")
			{				
				if (document.form.filter_lw_num_x_0.value >= c) cFlag=1;
				else if (!validate_iprange(document.form.filter_lw_srcip_x_0, "") ||
									!validate_portrange(document.form.filter_lw_srcport_x_0, "") ||
									!validate_iprange(document.form.filter_lw_dstip_x_0, "") ||
									!validate_portrange(document.form.filter_lw_dstport_x_0, "")) return false;
				else if (document.form.filter_lw_srcip_x_0.value=="" &&
								 document.form.filter_lw_srcport_x_0.value=="" &&
								 document.form.filter_lw_dstip_x_0.value=="" &&
								 document.form.filter_lw_dstport_x_0.value=="") bFlag=1;
				
				//alert(document.form.filter_lw_srcip_x_0.value +", "+ LWFilterList[0][0]);
				for(var i=0; i < LWFilterList.length; i++){ //validate if the entry is duplicated in list.
					if(document.form.filter_lw_srcip_x_0.value == LWFilterList[i][0] &&
						 document.form.filter_lw_srcport_x_0.value == LWFilterList[i][1] &&
						 document.form.filter_lw_dstip_x_0.value == LWFilterList[i][2] &&
						 document.form.filter_lw_dstport_x_0.value == LWFilterList[i][3]){
							alert("This entry has been in list.");
							return false;
					}
				}
			}
			else
			{
				if (document.form.filter_lw_num_x_0.value >= c)
					cFlag=1;
				else if (!validate_iprange(document.form.filter_lw_srcip_x_0, "") ||
								 !validate_portrange(document.form.filter_lw_dstport_x_0, "")){					
					return false;					
				}
				else if (document.form.filter_lw_srcip_x_0.value=="" && document.form.filter_lw_dstport_x_0.value=="")
					bFlag=1;
			}
		}
		else if (s=='UrlList'){
			if (document.form.url_num_x_0.value >= c)
				cFlag=1;
			else if (document.form.url_keyword_x_0.value=="")
				bFlag=1;
			else if (!validate_duplicate(document.form.UrlList_s, document.form.url_keyword_x_0.value, 32, 0))
				return false;
		}
		else if (s=='x_FUserList'){
			if (document.form.usb_ftpnum_x_0.value >= c) cFlag=1;
else if (!validate_string(document.form.usb_ftpusername_x_0) ||
!validate_string(document.form.usb_ftppasswd_x_0) ||
!validate_range(document.form.usb_ftpmaxuser_x_0, 1, 12)) return false;
else if (document.form.usb_ftpusername_x_0.value=="" ||
document.form.usb_ftppasswd_x_0.value=="" ||
document.form.usb_ftpmaxuser_x_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.x_FUserList_s, document.form.usb_ftpusername_x_0.value, 16, 0)) return false;
		}
		else if (s=='x_FBanIPList'){
			if (document.form.usb_bannum_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.usb_ftpbanip_x_0, "")) return false;
else if (document.form.usb_ftpbanip_x_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.x_FBanIPList_s, document.form.usb_ftpbanip_x_0.value, 15, 0)) return false;
		}
		else if (s=='x_QRuleList'){
			if (document.form.qos_rulenum_x_0.value >= c) cFlag=1;
else if (!validate_iprange(document.form.qos_ipaddr_x_0) ||
!validate_range_sp(document.form.qos_port_x_0, 1, 65535) ||
!validate_range_sp(document.form.qos_maxbw_x_0, 0, 1000000) ||
!validate_range_sp(document.form.qos_minbw_x_0, 0, 1000000)) return false;
else if (document.form.qos_maxbw_x_0.value=="" &&
document.form.qos_minbw_x_0.value=="") bFlag=1;
else if (document.form.qos_maxbw_x_0.value!="" &&
document.form.qos_minbw_x_0.value!="" &&
eval(document.form.qos_minbw_x_0.value) > eval(document.form.qos_maxbw_x_0.value))
{alert('Please enter a value between 0 to ' + document.form.qos_maxbw_x_0.value + '.');
document.form.qos_minbw_x_0.focus();
document.form.qos_minbw_x_0.select();
return false;
}
		}
		else if (s=='x_UQRuleList'){
			if (document.form.qos_urulenum_x_0.value >= c) cFlag=1;
else if (!validate_range_sp(document.form.qos_uport_x_0, 1, 65535) ||
!validate_range_sp(document.form.qos_umaxbw_x_0, 0, 1000000) ||
!validate_range_sp(document.form.qos_uminbw_x_0, 0, 1000000)) return false;
else if (document.form.qos_umaxbw_x_0.value=="" &&
document.form.qos_uminbw_x_0.value=="") bFlag=1;
else if (document.form.qos_umaxbw_x_0.value!="" &&
document.form.qos_uminbw_x_0.value!="" &&
eval(document.form.qos_uminbw_x_0.value) > eval(document.form.qos_umaxbw_x_0.value))
{alert('Please enter a value between 0 to ' + document.form.qos_umaxbw_x_0.value + '.');
document.form.qos_uminbw_x_0.focus();
document.form.qos_uminbw_x_0.select();
return false;
}
		}
		else if(s == 'x_USRRuleList'){
			if(document.form.qos_rulenum_x_0.value >= c)
				cFlag = 1;
			else if(!validate_string(document.form.qos_service_name_x_0) ||
					!validate_iprange(document.form.qos_ip_x_0) ||
					!validate_portrange(document.form.qos_port_x_0, "")
					)
				return false;
			else if(document.form.qos_service_name_x_0.value == ""
// 2008.05 James. {
					//document.form.qos_port_x_0.value == "" ||	// 2008.01 James.
					|| (document.form.qos_ip_x_0.value == "" && document.form.qos_port_x_0.value == ""))
				bFlag = 1;
			/*else if(!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_prio_x_0.value, 1, 44) ||	// 2008.01 James.
					!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_service_name_x_0.value, 16, 0))//*/
			//else if(!validate_duplicate(document.form.x_USRRuleList_s, document.form.qos_ip_x_0.value, 28, 16))
			//	return false;
			else if(!validate_duplicate_USRRuleList(document.form.qos_ip_x_0.value, document.form.qos_port_x_0.value))
				return false;
// 2008.05 James. }
		}
		else if (s=='Storage_SharedList'){
			if (document.form.sh_num_0.value >= c) cFlag=1;
/* 2005.12.16 Jiahao
else if (!validate_path(document.form.sh_path_0)) return false;
*/
else if (document.form.sh_path_0.value=="") bFlag=1;
else if (document.form.sh_name_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.Storage_SharedList_s, document.form.sh_path_0.value, 32, 0))  return false;
else if (!validate_duplicate(document.form.Storage_SharedList_s, document.form.sh_name_0.value, 16, 34)) return false;
top.Edit_Flag = "on";
		}
		else if (s=='Storage_UserList'){
			if (document.form.acc_num_0.value >= c) cFlag=1;
else if (!validate_string(document.form.acc_username_0)) return false;
else if (!validate_string(document.form.acc_password_0)) return false;
else if (document.form.acc_username_0.value=="") bFlag=1;
else if (document.form.acc_username_0.value.toLowerCase()=="guest")
{alert(" You cannot use Guest as a user name!");
return false;
}
else if (document.form.acc_username_0.value.toLowerCase()=="anonymous")
{alert(" You cannot use Anonymous as a user name!");
return false;
}
else if (document.form.acc_username_0.value.toLowerCase()=="ftp")
{alert(" You cannot use Ftp as a user name!");
return false;
}
else if (document.form.acc_password_0.value=="") bFlag=1;
else if (!validate_duplicate(document.form.Storage_UserList_s, document.form.acc_username_0.value, 28, 0)) return false;
else if (!validate_duplicate(document.form.Storage_UserList_s, document.form.acc_password_0.value, 24, 29)) return false;
		}
		else if (s=='Storage_UserRight_List'){
			if (document.form.sh_acc_onlist_num_x_0.value >= c) cFlag = 1;
else if (!validate_string(document.form.sh_acc_user_0.value)) return false;
else if (document.form.sh_acc_user_0.value == "") bFlag = 1;
		}
	}
	
	if(bFlag == 1)
		alert("Fields cannot be blank!");
	else if(cFlag == 1)
		alert("This table only allow " + c + " items!");
	else{	// b == " Del "
		if(s == 'WLFilterList'){
			updateDateTime("Advanced_Firewall_Content.html");
		}
		else if(s == 'LWFilterList'){
			updateDateTime("Advanced_Firewall_Content.html");
		}
		else if(s == 'UrlList'){
			updateDateTime("Advanced_URLFilter_Content.html");
		}
		else if(s == 'LocalCertDB'){}
		
		pageChanged = 0;
		pageChangedCount = 0;
		
		document.form.action_mode.value = b;
		return true;
	}
	
	return false;
}

function portrange_min(o, v){
	var num = 0;
	var common_index = o.substring(0, v).indexOf(':');
	
	if(common_index == -1)
		num = parseInt(o.substring(0, v));
	else
		num = parseInt(o.substring(0, common_index));
		
	return num;
}
function portrange_max(o, v){
	var num = 0;
	var common_index = o.substring(0, v).indexOf(':');

	if(common_index == -1)
		num = parseInt(o.substring(0, v));
	else
		num = parseInt(o.substring(common_index+1, v+1));
		
	return num;
}
function isBlank(s) {
for(i=0; i<s.length; i++) {
c=s.charAt(i);
if((c!=' ')&&(c!='\n')&&(c!='\t'))return false;}
return true;
}
function numbersonly()
{if (keyPressed>47 && keyPressed<58)
return true;
else
return false;
}
function check_ptl()
{if(keyPressed==38)
return false;
else
return true;
}
function linkOver(o)
{o.style.cursor="hand";
}
function linkOut(o) {
}
function linkTo(s)
{location=s;
}
function refreshList()
{parent.location.href = '/';
}

function entry_cmp(entry, match, len){  //compare string length function
	
	var j;
	
	if(entry.length < match.length)
		return (1);
	
	for(j=0; j < entry.length && j<len; j++){
		c1 = entry.charCodeAt(j);
		if (j>=match.length) 
			c2=160;
		else 
			c2 = match.charCodeAt(j);
			
		if (c1==160) 
			c1 = 32;
			
		if (c2==160) 
			c2 = 32;
			
		if (c1>c2) 
			return (1);
		else if (c1<c2) 
			return(-1);
	}
	return 0;
}
function validate_duplicate_noalert(o, v, l, off){
	
	for (var i=0; i<o.options.length; i++)
	{		
		if (entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l)==0){
			return false;
		}
	}
	return true;
}

function validate_duplicate(o, v, l, off){	// 2008.01 James.	
	for(var i = 0; i < o.options.length; i++){		
		if(entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l) == 0){
			alert('This entry has been in list.');
			
			return false;
		}
	}	
	return true;
}

function validate_duplicate2(o, v, l, off){
	var i;
	for (i=0; i<o.options.length; i++)
	{
		if (entry_cmp(o.options[i].text.substring(off).toLowerCase(), v.toLowerCase(), l)==0)
		{
			return false;
		}
	}
	return true;
}
function is_hwaddr()
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if ((keyPressed>47 && keyPressed<58)||(keyPressed>64 && keyPressed<71)||(keyPressed>96 && keyPressed<103))
return true;
else if (keyPressed==0)
return true;
else
return false;
}
function validate_hwaddr(o)
{
	if (o.value.length == 0) return true;
	if(o.value != "")
	{
		if(o.value.length == 12)
		{
			for(i=0; i<o.value.length; i++)
			{c=o.value.charAt(i);
			if (!(c>='0'&&c<='9') && !(c>='a'&&c<='f') && !(c>='A'&&c<='F'))
				{alert('Please enter the complete MAC address which contains 12 hexadecimal letters.');
				o.value = "";
				o.focus();
				o.select();
				return false;
			}
			}
		return true;
		}
	}
	alert('Please enter the complete MAC address which contains 12 hexadecimal letters.');
	o.value = "";
	o.focus();
	o.select();
	return false;
}
function is_string(o) {
if (!nav)
keyPressed = IEKey();
else
keyPressed = NSKey();
if (keyPressed==0)
return true;
else if (keyPressed>=0&&keyPressed<=126)
return true;
alert('Invalid character!');
return false;
}
function is_string2(o) {
if (!nav)
keyPressed = IEKey();
else
keyPressed = NSKey();
if (keyPressed==0)
return true;
else if ((keyPressed>=48&&keyPressed<=57) ||
(keyPressed>=97&&keyPressed<=122) ||
(keyPressed>=65&&keyPressed<=90) ||
(keyPressed==45)
)
return true;
alert('Invalid character!');
return false;
}

function validate_ssidchar(ch){
	if(ch >= 32 && ch <= 126)
		return true;
	
	return false;
}

function validate_string_ssid(o){
	var c;	// character code
	
	for(var i = 0; i < o.value.length; ++i){
		c = o.value.charCodeAt(i);
		
		if(!validate_ssidchar(c)){
			alert('SSID cannot contain the character \" '+o.value.charAt(i)+' \".');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	if(document.form.current_page.value == "Advanced_Wireless_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	else if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html" && document.form.wl_guest_ssid_1.value == "")
		o.value = "guest";
	else if(document.form.current_page.value == "Basic_GOperation_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	else if(document.form.current_page.value == "Basic_AOperation_Content.html" && document.form.wl_ssid.value == "")
		o.value = "default";
	
	return true;
}

function validate_share(o)
{s=o.value;
if (!validate_string(o))
{return false;
}
for(i=0;i<s.length;i++)
{c = s.charCodeAt(i);
if (!validate_sharechar(c))
{alert("Share name can not contain '" + s.charAt(i) +"' !");
return(false);
}
}
return(true);
}
function validate_sharechar(ch)
{if (ch>=48&&ch<=57) return true;
if (ch>=97&&ch<=122) return true;
if (ch>=65&&ch<=90) return true;
if (ch==45) return true;
if (ch==95) return true;
if (ch==32) return true;
return false;
}
function is_number(o)
{if (!nav) keyPressed = IEKey();
else keyPressed = NSKey();
if (keyPressed==0) return true;
if (keyPressed>47 && keyPressed<58)
{if (keyPressed==48 && o.length == 0) return false;
return true;
}
else
{return false;
}
}
function validate_range(o, min, max) {
	for(i=0; i<o.value.length; i++)
	{
		if (o.value.charAt(i)<'0' || o.value.charAt(i)>'9')
		{
			alert('Please enter a value between ' + min + ' to ' + max);
			//o.value = max;
			o.focus();
			o.select();
			return false;
		}
	}
	if(o.value<min || o.value>max) {
		alert('Please enter a value between ' + min + ' to ' + max);
		//o.value = max;
		o.focus();
		o.select();
		return false;
	}
	else {
		o.value = str2val(o.value);
		if(o.value=="")
		o.value="0";
		return true;
	}
}
function validate_range_sp(o, min, max) {
	if (o.value.length==0) return true;
	
	if(o.value<min || o.value>max) {
		alert('Please enter a value between ' + min + ' to ' + max + '.');
		o.value = min;
		o.focus();
		o.select();
		return false;
	}
	else {
		o.value = str2val(o.value);
		if(o.value=="") o.value="0";
		return true;
	}
}

function change_ipaddr(o){}

function is_ipaddr(o){
	if(!nav) 
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0){
		return true;
	}
	
	if(o.value.length >= 16)
		return false;
	
	if((keyPressed > 47 && keyPressed < 58)){
		j = 0;
		
		for(i = 0; i < o.value.length; i++){
			if(o.value.charAt(i) == '.'){
				j++;
			}
		}
		
		if(j < 3 && i >= 3){
			if(o.value.charAt(i-3) != '.' && o.value.charAt(i-2) != '.' && o.value.charAt(i-1) != '.'){
				o.value = o.value+'.';
			}
		}
		
		return true;
	}
	else if(keyPressed == 46){
		j = 0;
		
		for(i = 0; i < o.value.length; i++){
			if(o.value.charAt(i) == '.'){
				j++;
			}
		}
		
		if(o.value.charAt(i-1) == '.' || j == 3){
			return false;
		}
		
		return true;
	}
	else{
		return false;
	}
	
	return false;
}

function intoa(ip)
{n=0;
vip=0;
for(i=0;i<ip.length;i++)
{c = ip.charAt(i);
if (c == '.')
{vip = vip * 256 + n;
n = 0;
}
else if(c>='0' && c<='9')
{n = n*10 + (c-'0');
}
}
vip = vip*256 + n;
return(vip);
}

function requireWANIP(v){
	if(v == 'wan_ipaddr' || v == 'wan_netmask' ||
			v == 'lan_ipaddr' || v == 'lan_netmask' ||
			v == 'lan1_ipaddr' || v == 'lan1_netmask'){
		// 2008.03 James. patch for Oleg's patch. {
		/*if(document.form.wan_proto.value == "static" || document.form.wan_proto.value == "pptp")
			return 1;
		else
			return 0;*/
		if(document.form.wan_proto.value == "static")
			return 1;
		else if(document.form.wan_proto.value == "pppoe" && intoa(document.form.wan_ipaddr.value))
			return 1;
		else if((document.form.wan_proto.value=="pptp" || document.form.wan_proto.value == "l2tp")
				&& document.form.wan_ipaddr.value != '0.0.0.0')
			return 1;
		else
			return 0;
		// 2008.03 James. patch for Oleg's patch. }
	}
	
	else return 0;
}

function matchSubnet2(ip1, sb1, ip2, sb2){
	var nsb;
	var nsb1 = intoa(sb1.value);
	var nsb2 = intoa(sb2.value);
	//alert("");
	if(nsb1 < nsb2)
		nsb = nsb1;
	else
		nsb = nsb2;
	
	if((intoa(ip1)&nsb) == (intoa(ip2)&nsb))
		return 1;
	else
		return 0;
}

function validate_ipaddr(o, v){
	if(final_flag)
		return true;
	
num = -1;
pos = 0;
if (o.value.length==0)
{if (v=='dhcp_start' || v=='dhcp_end' || v=='wan_ipaddr' || v=='dhcp1_start' || v=='dhcp1_end' ||
v=='lan_ipaddr' || v=='lan_netmask' || v=='lan1_ipaddr' || v=='lan1_netmask')
{alert("Fields cannot be blank!");
if (v=='wan_ipaddr')
{document.form.wan_ipaddr.value = "10.1.1.1";
document.form.wan_netmask.value = "255.0.0.0";
}
else if (v=='lan_ipaddr')
{document.form.lan_ipaddr.value = "192.168.1.1";
document.form.lan_netmask.value = "255.255.255.0";
}
else if (v=='lan1_ipaddr')
{document.form.lan1_ipaddr.value = "192.168.2.1";
document.form.lan1_netmask.value = "255.255.255.0";
}
else if (v=='lan_netmask') document.form.lan_netmask.value = "255.255.255.0";
else if (v=='lan1_netmask') document.form.lan1_netmask.value = "255.255.255.0";
else if (v=='dhcp_start') document.form.dhcp_start.value = document.form.dhcp_end.value;
else if (v=='dhcp_end') document.form.dhcp_end.value = document.form.dhcp_start.value;
else if (v=='dhcp1_start') document.form.dhcp1_start.value = document.form.dhcp1_end.value;
else if (v=='dhcp1_end') document.form.dhcp1_end.value = document.form.dhcp1_start.value;
o.focus();
o.select();
return false;
}
else return true;
}
if(v=='wan_ipaddr' && document.form.wan_netmask.value=="")
document.form.wan_netmask.value="255.255.255.0";
for(i=0; i<o.value.length; i++) {
c=o.value.charAt(i);
if(c>='0' && c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else
{if ( num<0 || num>255 || c!='.')
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (pos==0) v1=num;
else if (pos==1) v2=num;
else if (pos==2) v3=num;
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
else v4=num;
if (v=='dhcp_start' || v=='dhcp_end' || v=='wan_ipaddr' || v=='dhcp1_start' || v=='dhcp1_end' || v=='lan_ipaddr' || v=='lan1_ipaddr' || v=='staticip')
{
	
	//if(v1==255||v2==255||v3==255||v4==255||v1==0||v4==0||v1==127||v1==224)
	if(v != 'wan_ipaddr' && (v1 == 255 || v2 == 255 || v3 == 255 || v4 == 255 || v1 == 0 || v4 == 0 || v1 == 127 || v1 == 224))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if ((v=='wan_ipaddr' &&  matchSubnet2(o.value, document.form.wan_netmask, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(v=='lan_ipaddr' &&  matchSubnet2(o.value, document.form.lan_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
(isModel3() == 'WL550gE' && v=='wan_ipaddr' && matchSubnet2(o.value, document.form.wan_netmask, document.form.lan1_ipaddr.value, document.form.lan1_netmask)) ||
(isModel3() == 'WL550gE' && v=='lan1_ipaddr' && matchSubnet2(o.value, document.form.lan1_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask))
)
{
	alert(o.value + ' is not a valid IP address!');
	if (v=='wan_ipaddr')
	{document.form.wan_ipaddr.value = "10.1.1.1";
	document.form.wan_netmask.value = "255.0.0.0";
	}
	else if(v=='lan_ipaddr')
	{document.form.lan_ipaddr.value = "192.168.1.1";
	document.form.lan_netmask.value = "255.255.255.0";
	}
	else if(v=='lan1_ipaddr')
	{document.form.lan1_ipaddr.value = "192.168.2.1";
	document.form.lan1_netmask.value = "255.255.255.0";
	}
	o.focus();
	o.select();
	return false;
}

}
else if(v=='lan_netmask' || v=='lan1_netmask')
{if(v1==255&&v2==255&&v3==255&&v4==255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
if (requireWANIP(v) && (
(v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(v=='lan_netmask' &&  matchSubnet2(document.form.lan_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
(isModel3() == 'WL550gE' && v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
(isModel3() == 'WL550gE' && v=='lan1_netmask' &&  matchSubnet2(document.form.lan1_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask))
))
{alert(o.value + ' is not a valid IP address!');
if (v=='wan_netmask')
{document.form.wan_ipaddr.value = "10.1.1.1";
document.form.wan_netmask.value = "255.0.0.0";
}
else if(v=='lan_netmask')
{document.form.lan_ipaddr.value = "192.168.1.1";
document.form.lan_netmask.value = "255.255.255.0";
}
else if(v=='lan1_netmask')
{document.form.lan1_ipaddr.value = "192.168.2.1";
document.form.lan1_netmask.value = "255.255.255.0";
}
o.focus();
o.select();
return false;
}
if(v=='lan1_ipaddr')
{if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
else if(v=='lan_ipaddr' && isBand() != 'b')
{if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
}
o.value = v1 + "." + v2 + "." + v3 + "." + v4;
if ((v1 > 0) && (v1 < 127)) mask = "255.0.0.0";
else if ((v1 > 127) && (v1 < 192)) mask = "255.255.0.0";
else if ((v1 > 191) && (v1 < 224)) mask = "255.255.255.0";
else mask = "0.0.0.0";
if (v=='wan_ipaddr' && document.form.wan_netmask.value=="")
{document.form.wan_netmask.value = mask;
}
else if (v=='lan_ipaddr' && document.form.lan_netmask.value=="" )
{document.form.lan_netmask.value = mask;
}
else if (v=='dhcp_start')
{if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(o.value)>intoa(document.form.dhcp_end.value))
{tmp = document.form.dhcp_start.value;
document.form.dhcp_start.value = document.form.dhcp_end.value;
document.form.dhcp_end.value = tmp;
}
}
else if (v=='dhcp_end')
{if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(document.form.dhcp_start.value)>intoa(o.value))
{tmp = document.form.dhcp_start.value;
document.form.dhcp_start.value = document.form.dhcp_end.value;
document.form.dhcp_end.value = tmp;
}
}
else if (v=='lan1_ipaddr')
{if(document.form.lan1_netmask.value=="" )
document.form.lan1_netmask.value = mask;
}
else if (v=='dhcp1_start')
{if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(o.value)>intoa(document.form.dhcp1_end.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
}
else if (v=='dhcp1_end')
{if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3))
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
if (intoa(document.form.dhcp1_start.value)>intoa(o.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
}
return true;
}

function validate_ipaddr_final(o, v){
	var num = -1;
	var pos = 0;
	
	if(o.value.length == 0){
		if(v == 'dhcp_start' || v == 'dhcp_end' ||
				v == 'wan_ipaddr' ||
				v == 'dhcp1_start' || v=='dhcp1_end' ||
				v == 'lan_ipaddr' || v=='lan_netmask' ||
				v=='lan1_ipaddr' || v=='lan1_netmask' ||
				v == 'wl_radius_ipaddr'){
			alert("Fields cannot be blank!");
			
			if(v == 'wan_ipaddr'){
				document.form.wan_ipaddr.value = "10.1.1.1";
				document.form.wan_netmask.value = "255.0.0.0";
			}
			else if(v == 'lan_ipaddr'){
				document.form.lan_ipaddr.value = "192.168.1.1";
				document.form.lan_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan1_ipaddr'){
				document.form.lan1_ipaddr.value = "192.168.2.1";
				document.form.lan1_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan_netmask')
				document.form.lan_netmask.value = "255.255.255.0";
			else if(v == 'lan1_netmask')
				document.form.lan1_netmask.value = "255.255.255.0";
			
			o.focus();
			o.select();
			
			return false;
		}
		else
			return true;
	}
	
	if(v == 'wan_ipaddr' && document.form.wan_netmask.value == "")
		document.form.wan_netmask.value="255.255.255.0";
	
	for(var i = 0; i < o.value.length; ++i){
		var c = o.value.charAt(i);
		
		if(c >= '0' && c <= '9'){
			if(num == -1 ){
				num = (c-'0');
			}
			else{
				num = num*10+(c-'0');
			}
		}
		else{
			if(num < 0 || num > 255 || c != '.'){
				alert(o.value+' is not a valid IP address!');
				
				o.value = "";
				o.focus();
				o.select();
				
				return false;
			}
			
			if(pos == 0)
				v1 = num;
			else if(pos == 1)
				v2 = num;
			else if(pos == 2)
				v3 = num;
			
			num = -1;
			++pos;
		}
	}
	
	if(pos!=3 || num<0 || num>255){
		alert(o.value + ' is not a valid IP address!');
		o.value = "";
		o.focus();
		o.select();
		
		return false;
	}
	else
		v4 = num;
	
	if(v == 'dhcp_start' || v == 'dhcp_end' ||
			v == 'wan_ipaddr' ||
			v == 'dhcp1_start' || v == 'dhcp1_end' ||
			v == 'lan_ipaddr' || v == 'lan1_ipaddr' ||
			v == 'staticip' || v == 'wl_radius_ipaddr' ||
			v == 'dhcp_dns1_x' || v == 'dhcp_gateway_x' || v == 'dhcp_wins_x'){
		if((v!='wan_ipaddr')&& (v1==255||v2==255||v3==255||v4==255||v1==0||v4==0||v1==127||v1==224)){
			alert(o.value + ' is not a valid IP address!');
			
			o.value = "";
			o.focus();
			o.select();
			
			return false;
		}
		
		if(wan_route_x == "IP_Bridged" && wan_nat_x == "0")	// variables are defined in state.js
			;	// there is no WAN in AP mode, so it wouldn't be compared with the wan ip..., etc.
		else if(requireWANIP(v) && (
				(v=='wan_ipaddr' &&  matchSubnet2(o.value, document.form.wan_netmask, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
				(v=='lan_ipaddr' &&  matchSubnet2(o.value, document.form.lan_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
				(isModel3() == 'WL550gE' && v=='wan_ipaddr' && matchSubnet2(o.value, document.form.wan_netmask, document.form.lan1_ipaddr.value, document.form.lan1_netmask)) ||
				(isModel3() == 'WL550gE' && v=='lan1_ipaddr' && matchSubnet2(o.value, document.form.lan1_netmask, document.form.wan_ipaddr.value, document.form.wan_netmask))
				)){
			alert(o.value + ' is not a valid IP address!');
			if(v == 'wan_ipaddr'){
				document.form.wan_ipaddr.value = "10.1.1.1";
				document.form.wan_netmask.value = "255.0.0.0";
			}
			else if(v == 'lan_ipaddr'){
				document.form.lan_ipaddr.value = "192.168.1.1";
				document.form.lan_netmask.value = "255.255.255.0";
			}
			else if(v == 'lan1_ipaddr'){
				document.form.lan1_ipaddr.value = "192.168.2.1";
				document.form.lan1_netmask.value = "255.255.255.0";
			}
			
			o.focus();
			o.select();
			
			return false;
		}
	}
	else if(v=='lan_netmask' || v=='lan1_netmask'){
		if(v1==255&&v2==255&&v3==255&&v4==255){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	if(wan_route_x == "IP_Bridged" && wan_nat_x == "0")	// variables are defined in state.js
			;	// there is no WAN in AP mode, so it wouldn't be compared with the wan ip..., etc.
	else if(requireWANIP(v) && (
			(v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
			(v=='lan_netmask' &&  matchSubnet2(document.form.lan_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask)) ||
			(isModel3() == 'WL550gE' && v=='wan_netmask' &&  matchSubnet2(document.form.wan_ipaddr.value, o, document.form.lan_ipaddr.value, document.form.lan_netmask)) ||
			(isModel3() == 'WL550gE' && v=='lan1_netmask' &&  matchSubnet2(document.form.lan1_ipaddr.value, o, document.form.wan_ipaddr.value, document.form.wan_netmask))
			)){
		alert(o.value + ' is not a valid IP address!');
		
		if (v=='wan_netmask'){
			document.form.wan_ipaddr.value = "10.1.1.1";
			document.form.wan_netmask.value = "255.0.0.0";
		}
		else if(v=='lan_netmask'){
			document.form.lan_ipaddr.value = "192.168.1.1";
			document.form.lan_netmask.value = "255.255.255.0";
		}
		else if(v=='lan1_netmask'){
			document.form.lan1_ipaddr.value = "192.168.2.1";
			document.form.lan1_netmask.value = "255.255.255.0";
		}
		
		o.focus();
		o.select();
		return false;
	}
	
	if(v=='lan1_ipaddr'){
		if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	else if(v=='lan_ipaddr' && isBand() != 'b'){
		if(isModel3() == 'WL550gE' && matchSubnet(document.form.lan_ipaddr.value, document.form.lan1_ipaddr.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.value = "";
			o.focus();
			o.select();
			return false;
		}
	}
	
	o.value = v1 + "." + v2 + "." + v3 + "." + v4;
	
	if((v1 > 0) && (v1 < 127)) mask = "255.0.0.0";
	else if ((v1 > 127) && (v1 < 192)) mask = "255.255.0.0";
	else if ((v1 > 191) && (v1 < 224)) mask = "255.255.255.0";
	else mask = "0.0.0.0";
	
	if(v=='wan_ipaddr' && document.form.wan_netmask.value==""){
		document.form.wan_netmask.value = mask;
	}
	else if (v=='lan_ipaddr' && document.form.lan_netmask.value=="" ){
		document.form.lan_netmask.value = mask;
	}
	else if (v=='dhcp_start'){
		if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='dhcp_end'){
		if (!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='lan1_ipaddr'){
		if(document.form.lan1_netmask.value=="") document.form.lan1_netmask.value = mask;
	}
	else if (v=='dhcp1_start'){
		if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	else if (v=='dhcp1_end'){
		if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3)){
			alert(o.value + ' is not a valid IP address!');
			o.focus();
			o.select();
			return false;
		}
	}
	
	return true;
}

function change_ipaddrport(o)
{}
function is_ipaddrport(o)
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if (keyPressed==0)
{return true;
}
if ((keyPressed>47 && keyPressed<58) || keyPressed == 46 || keyPressed == 58)
{return true;
}
return false;
}
function validate_ipaddrport(o, v)
{num = -1;
pos = 0;
if (o.value.length==0)
return true;
str = o.value;
portidx = str.indexOf(":");
if (portidx!=-1)
{port = str.substring(portidx+1);
len = portidx;
if (port>65535)
{alert(port + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
}
else
{len = o.value.length;
}
for(i=0; i<len; i++) {
c=o.value.charAt(i);
if(c>='0' && c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else
{if ( num<0 || num>255 || c!='.')
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (v=='ExternalIPAddress' && document.form.wan_netmask.value == '')
{document.form.wan_netmask.value = "255.255.255.0";
}
else if (v=='IPRouters' && document.form.lan_netmask.value == '')
{document.form.lan_netmask.value = "255.255.255.0";
}
return true;
}
function change_iprange(o)
{}
function is_iprange(o)
{if (!nav) keyPressed = IEKey();
else keyPressed=NSKey();
if (keyPressed==0)
{return true;
}
if (o.value.length>=15) return false;
if ((keyPressed>47 && keyPressed<58))
{j = 0;
for(i=0; i<o.value.length; i++)
{if (o.value.charAt(i)=='.')
{j++;
}
}
if (j<3 && i>=3)
{if (o.value.charAt(i-3)!='.' && o.value.charAt(i-2)!='.' && o.value.charAt(i-1)!='.')
o.value = o.value + '.';
}
return true;
}
else if (keyPressed == 46)
{j = 0;
for(i=0; i<o.value.length; i++)
{if (o.value.charAt(i)=='.')
{j++;
}
}
if (o.value.charAt(i-1)=='.' || j==3)
{return false;
}
return true;
}
else if (keyPressed == 42) /* '*' */
{return true;
}
else
{return false;
}
return false;
}
function validate_iprange(o, v)
{num = -1;
pos = 0;
if (o.value.length==0)
return true;
for(i=0; i<o.value.length; i++)
{c=o.value.charAt(i);
if(c>='0'&&c<='9')
{if ( num==-1 )
{num = (c-'0');
}
else
{num = num*10 + (c-'0');
}
}
else if (c=='*'&&num==-1)
{num = 0;
}
else
{if ( num<0 || num>255 || (c!='.'))
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
num = -1;
pos++;
}
}
if (pos!=3 || num<0 || num>255)
{alert(o.value + ' is not a valid IP address!');
o.value = "";
o.focus();
o.select();
return false;
}
if (v=='ExternalIPAddress' && document.form.wan_netmask.value == '')
{document.form.wan_netmask.value = "255.255.255.0";
}
else if (v=='IPRouters' && document.form.lan_netmask.value == '')
{document.form.lan_netmask.value = "255.255.255.0";
}
return true;
}
function is_portrange(o){
	if (!nav) keyPressed = IEKey();
	else keyPressed=NSKey();
		
	if (keyPressed==0) return true;
	//if (o.value.length>11) return false;  //limit the input length;
	
	if ((keyPressed>47 && keyPressed<58)){
		return true;
	}
	else if (keyPressed == 58 && o.value.length>0){
		for(i=0; i<o.value.length; i++){
			c=o.value.charAt(i);
			if (c==':' || c=='>' || c=='<' || c=='=')
			return false;
		}
		return true;
	}
	else if (keyPressed==44){  //"，" can be type in first charAt  ::: 0220 Lock add
		if (o.value.length==0)
			return false;		
		else
			return true;
	}
	else if (keyPressed==60 || keyPressed==62){  //">" and "<" only can be type in first charAt ::: 0220 Lock add
		if (o.value.length==0)
			return true;		
		else
			return false;
	}
	else{
		return false;
	}
}

function validate_portrange(o, v){
		if(o.value.length == 0)
			return true;
		
		prev = -1;
		num = -1;
		for(var i = 0; i < o.value.length; i++){
			c=o.value.charAt(i);
			if (c>='0'&&c<='9'){
				if(num==-1) num=0;
				num = num*10 + (c-'0');				
			}
			else{				
				if (num>65535 || num==0 || (c!=':' && c!='>' && c!='<' && c!=',')){
					alert(o.value + ' is not a valid port number.');
					//o.value = "";
					o.focus();
					o.select();
					return false;
				}
			
				if (c=='>') prev = -2;
				else if (c=='<') prev = -3;
				else if (c==','){ //偵測到字串中出現逗點
					prev = -4;
					num = 0;					
				}
				else{ //when c=":"
					prev = num;
					num = 0;					
				}
			}			
		}
		
		if ((num>65535 && prev!=-3) || (num<1&&prev!=-2) || (prev>num) || (num>=65535&&prev==-2) || (num<=1&&prev==-3)){
			if (num>65535){				
				alert(o.value + ' is not a valid port number.');
				
				o.focus();
				o.select();
				return false;
			}
			else{				
				alert(o.value + ' is not a valid port range!');
				//o.value = "";
				o.focus();
				o.select();
				return false;
			}
		}
		else{
			if (prev==-2){
				if (num==65535) o.value = num;
				else o.value = (num+1) + ":65535";  //ex. o.value=">2000", it will change to 2001:65535
			}
			else if (prev==-3){
				if (num==1) o.value = num;
				else o.value = "1:" + (num-1);     //ex. o.value="<2000", it will change to 1:1999
			}
			else if (prev==-4){ // "，" case
				if(document.form.current_page.value == "Advanced_VirtualServer_Content.html"){
					//alert(document.form.current_page.value);
					multi_vts_port = o.value.split(",");				
					//o.value = multi_vts_port[0];
					//alert(multi_vts_port[0]);
					split_vts_rule(multi_vts_port);
					return false;
				}
				else{
					alert(o.value + ' is not a valid port number.');

					o.focus();
					o.select();
					return false;						
				}
			}
			else if (prev!=-1)
				o.value = prev + ":" + num;
			else 
				o.value = num;                  //single port number case;
		}		
		return true;
}

function is_portlist(o)
{if (!nav) keyPressed = IEKey();
else keyPressed = NSKey();
if (keyPressed == 0 ) return true;
if (o.value.length>36) return false;
if ((keyPressed>47 && keyPressed<58) || keyPressed == 32)
{return true;
}
else
{return false;
}
}
function validate_portlist(o, v)
{if (o.value.length==0)
return true;
num = 0;
for(i=0; i<o.value.length; i++)
{c=o.value.charAt(i);
if (c>='0'&&c<='9')
{num = num*10 + (c-'0');
}
else
{if (num>255)
{alert(num + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
num = 0;
}
}
if (num>255)
{alert(num + ' is not a valid port number.');
o.value = "";
o.focus();
o.select();
return false;
}
return true;
}

function add_option_match(o, s, f)
{tail = o.options.length;
o.options[tail] = new Option(s);
o.options[tail].value = s;
if (f==s)
{o.options[tail].selected = 1;
return(1);
}
else return(0);
}
function add_option_match_x(o, s, f)
{tail = o.options.length;
o.options[tail] = new Option(s);
o.options[tail].value = tail;
if (tail==f)
{o.options[tail].selected = 1;
return(1);
}
else return(0);
}
function find_option(o)
{count = o.options.length;
for (i=0; i<count; i++)
{if (o.options[i].selected)
return(o.options[i].value);
}
return(null);
}

function add_options(o, arr, orig){
	for(var i = 0; i < arr.length; i++){
		if(orig == arr[i])
			add_option(o, arr[i], arr[i], 1);
		else
			add_option(o, arr[i], arr[i], 0);
	}
}

function add_options_x(o, arr, orig){
	for(var i = 0; i < arr.length; i++){
		if(orig == i)
			add_option(o, i, arr[i], arr[i], 1);
		else
			add_option(o, i, arr[i], arr[i], 0);
	}
}

function add_options_x2(o, arr, varr, orig){
	free_options(o);
	
	for(var i = 0; i < arr.length; ++i){
		if(orig == varr[i])
			add_option(o, arr[i], varr[i], 1);
		else
			add_option(o, arr[i], varr[i], 0);
	}
}

function rcheck(o){
	if(o[0].checked == true)
		return("1");
	else
	return("0");
}

function SaveChannelList(o)
{count = o.options.length;
chanList = new Array;
for (i=0; i<count; i++)
{chanList[chanList.length] = o.options[i].value;
}
}
function RestoreChannelList(d, isOut, isTurbo)
{for (i=0; i< chanList.length; i++)
{if (isOut=="0"&&chanList[i]>=100) return;
if (chanList[i] == 999) return;
d[d.length] = chanList[i];
}
}
function RefreshChannelList(isOut, isTurbo)
{orig = document.form.WLANConfig11a_Channel.value;
free_options(document.form.WLANConfig11a_Channel);
if (isTurbo=="1")
{if (isOut == "1")
{items = new Array("42","50","58","152","160");
}
else
{items = new Array("42","50","58");
}
}
else
{items = new Array;
RestoreChannelList(items, isOut, isTurbo);
}
add_options(document.form.WLANConfig11a_Channel, items, orig);
}
function RefreshRateList(isTurbo)
{orig = document.form.WLANConfig11a_DataRate.value;
free_options(document.form.WLANConfig11a_DataRate);
if (isTurbo=="1")
{items = new Array("Best","12","18","24","36","48","72","96","108");
}
else
{items = new Array("Best","6","9","12","18","24","36","48","54");
}
add_options_x(document.form.WLANConfig11a_DataRate, items, orig);
}
function RefreshRateSetList(gmode, chg)
{orig = document.form.WLANConfig11b_DataRate.value;
free_options(document.form.WLANConfig11b_DataRate);
if (gmode != "3")
{if (gmode == "1")
{items = new Array("1 & 2 Mbps", "Default", "All");
}
else
{items = new Array("1 & 2 Mbps", "Default", "All");
}
if (chg) orig = 1;
}
else
{items = new Array("1 & 2 Mbps", "Default");
if (chg) orig = 1;
}
add_options_x(document.form.WLANConfig11b_DataRate, items, orig);
}
function getDateCheck(str, pos)
{if (str.charAt(pos) == '1')
return true;
else
return false;
}
function getTimeRange(str, pos)
{if (pos == 0)
return str.substring(0,2);
else if (pos == 1)
return str.substring(2,4);
else if (pos == 2)
return str.substring(4,6);
else if (pos == 3)
return str.substring(6,8);
}
function setDateCheck(d1, d2, d3, d4, d5, d6, d7)
{str = "";
if (d7.checked == true ) str = "1" + str;
else str = "0" + str;
if (d6.checked == true ) str = "1" + str;
else str = "0" + str;
if (d5.checked == true ) str = "1" + str;
else str = "0" + str;
if (d4.checked == true ) str = "1" + str;
else str = "0" + str;
if (d3.checked == true ) str = "1" + str;
else str = "0" + str;
if (d2.checked == true ) str = "1" + str;
else str = "0" + str;
if (d1.checked == true ) str = "1" + str;
else str = "0" + str;
return str;
}
function setTimeRange(sh, sm, eh, em)
{return(sh.value+sm.value+eh.value+em.value);
}

function load_body(){
	document.form.next_host.value = location.host;
	if(document.form.current_page.value == "Advanced_Wireless_Content.html"){
		if(isBand() == 'b'){
			inputCtrl(document.form.wl_gmode, 0);
			inputCtrl(document.form.wl_gmode_check, 0);
		}
		
		if(isModel() == "SnapAP" || isCard() == 'ralink'){
			wl_auth_mode_reconf();
		}
		
		wl_auth_mode_change(1);
		change = 0;
		pageChanged = 0;
		if(document.form.wl_gmode_protection_x.value == "1"){
			document.form.wl_gmode_check.checked = true;
		}
		else{
			document.form.wl_gmode_check.checked = false;
		}
		
		/* Disable G-protect mode in 11B/N-only*/
		if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "4")
			inputCtrl(document.form.wl_gmode_check, 0);

		// Disable N-BW cap in Auto/N-only
		if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "0")
			inputCtrl(document.form.wl_nbw_cap, 1);
		else {
			inputCtrl(document.form.wl_nbw_cap, 0);
			document.form.wl_nbw_cap.value = "0";
		}

		// Syne N channels
		insertExtChannelOption();
	}
	else if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html"){
		final_flag = 1;
masq_wepkey_guest();
wl_auth_mode_reconf_guest();
wl_auth_mode_change_guest(1);
	}
	else if(document.form.current_page.value == "Advanced_WMode_Content.html"){
		if (isCard() == 'ralink'){
			document.form.wl_mode_x.options[1].value = null;
			document.form.wl_mode_x.options[1] = null;
			change_wireless_bridge2(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 1, 0);
		}
		else if(isModel2() == 'WL530'){
			change_wireless_bridge2(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 1, 0);
		}
		else{
			change_wireless_bridge(document.form.wl_mode_x.value, rcheck(document.form.wl_wdsapply_x), 0, 0);
		}
		insertExtChannelOption();
	}
	else if(document.form.current_page.value == "Advanced_WAdvanced_Content.html"){
		document.form.wl_wme.options[0].selected = 0;
		document.form.wl_wme.options[1].selected = 1;
		inputCtrl(document.form.wl_wme, 0);
		change_common(document.form.wl_wme, "WLANConfig11b", "wl_wme");
		
		/* Greenfield by Lock Add in 2008.10.01 */
		if (document.form.wl_gmode.value!="2" && document.form.wl_gmode.value!="0"){ 
			inputCtrl(document.form.wl_mimo_preamble, 0);
		}
		

if (isModel()!="WL520gc" && isModel()!="SnapAP" && isModel()!="WL300" && isModel()!="WL331" && isCard()!='ralink')
{if (isBand() == 'b') inputCtrl(document.form.wl_frameburst, 0);
document.form.wl_radio_date_x_Sun.checked = getDateCheck(document.form.wl_radio_date_x.value, 0);
document.form.wl_radio_date_x_Mon.checked = getDateCheck(document.form.wl_radio_date_x.value, 1);
document.form.wl_radio_date_x_Tue.checked = getDateCheck(document.form.wl_radio_date_x.value, 2);
document.form.wl_radio_date_x_Wed.checked = getDateCheck(document.form.wl_radio_date_x.value, 3);
document.form.wl_radio_date_x_Thu.checked = getDateCheck(document.form.wl_radio_date_x.value, 4);
document.form.wl_radio_date_x_Fri.checked = getDateCheck(document.form.wl_radio_date_x.value, 5);
document.form.wl_radio_date_x_Sat.checked = getDateCheck(document.form.wl_radio_date_x.value, 6);
document.form.wl_radio_time_x_starthour.value = getTimeRange(document.form.wl_radio_time_x.value, 0);
document.form.wl_radio_time_x_startmin.value = getTimeRange(document.form.wl_radio_time_x.value, 1);
document.form.wl_radio_time_x_endhour.value = getTimeRange(document.form.wl_radio_time_x.value, 2);
document.form.wl_radio_time_x_endmin.value = getTimeRange(document.form.wl_radio_time_x.value, 3);
}
	}
else if (document.form.current_page.value == "Advanced_MultiPPPoE_Content.html")
{if (document.form.PPPConnection_x_MultiPPPoEEnable1[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName1, flag);
inputCtrl(document.form.PPPConnection_x_Password1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU1, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU1, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName1, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator1, flag);
if (document.form.PPPConnection_x_MultiPPPoEEnable2[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName2, flag);
inputCtrl(document.form.PPPConnection_x_Password2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU2, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU2, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName2, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator2, flag);
if (document.form.PPPConnection_x_IdleTxOnly1.value == "1")
{document.form.PPPConnection_x_IdleTime1_check.checked = true;
}
if (document.form.PPPConnection_x_IdleTxOnly2.value == "1")
{document.form.PPPConnection_x_IdleTime2_check.checked = true;
}
}
else if (document.form.current_page.value == "Advanced_RLANWAN_Content.html")
{}
else if (document.form.current_page.value == "Advanced_PortTrigger_Content.html")
{wItem = new Array(
new Array("Quicktime 4 Client", "554", "TCP", "6970:32000", "UDP"),
new Array("Real Audio", "7070", "TCP", "6970:7170", "UDP"));
free_options(document.form.TriggerKnownApps);
add_option(document.form.TriggerKnownApps, "Please select", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.TriggerKnownApps, wItem[i][0], wItem[i][0], 0);
}
}
else if (document.form.current_page.value == "Advanced_BasicFirewall_Content.html")
{change_firewall(rcheck(document.form.fw_enable_x));
}
	else if (document.form.current_page.value == "Advanced_Firewall_Content.html")
{wItem = new Array(
new Array("WWW", "80", "TCP"),
new Array("TELNET", "23", "TCP"),
new Array("FTP", "20:21", "TCP")
);
free_options(document.form.LWKnownApps);
add_option(document.form.LWKnownApps, "User Defined", "User Defined", 1);
for (i = 0; i < wItem.length; i++)
{add_option(document.form.LWKnownApps, wItem[i][0], wItem[i][0], 0);
}
document.form.filter_lw_date_x_Sun.checked = getDateCheck(document.form.filter_lw_date_x.value, 0);
document.form.filter_lw_date_x_Mon.checked = getDateCheck(document.form.filter_lw_date_x.value, 1);
document.form.filter_lw_date_x_Tue.checked = getDateCheck(document.form.filter_lw_date_x.value, 2);
document.form.filter_lw_date_x_Wed.checked = getDateCheck(document.form.filter_lw_date_x.value, 3);
document.form.filter_lw_date_x_Thu.checked = getDateCheck(document.form.filter_lw_date_x.value, 4);
document.form.filter_lw_date_x_Fri.checked = getDateCheck(document.form.filter_lw_date_x.value, 5);
document.form.filter_lw_date_x_Sat.checked = getDateCheck(document.form.filter_lw_date_x.value, 6);
document.form.filter_lw_time_x_starthour.value = getTimeRange(document.form.filter_lw_time_x.value, 0);
document.form.filter_lw_time_x_startmin.value = getTimeRange(document.form.filter_lw_time_x.value, 1);
document.form.filter_lw_time_x_endhour.value = getTimeRange(document.form.filter_lw_time_x.value, 2);
document.form.filter_lw_time_x_endmin.value = getTimeRange(document.form.filter_lw_time_x.value, 3);
}
else if (document.form.current_page.value == "Advanced_LFirewall_Content.html")
{document.form.FirewallConfig_WanLocalActiveDate_Sun.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 0);
document.form.FirewallConfig_WanLocalActiveDate_Mon.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 1);
document.form.FirewallConfig_WanLocalActiveDate_Tue.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 2);
document.form.FirewallConfig_WanLocalActiveDate_Wed.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 3);
document.form.FirewallConfig_WanLocalActiveDate_Thu.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 4);
document.form.FirewallConfig_WanLocalActiveDate_Fri.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 5);
document.form.FirewallConfig_WanLocalActiveDate_Sat.checked = getDateCheck(document.form.FirewallConfig_WanLocalActiveDate.value, 6);
document.form.FirewallConfig_WanLocalActiveTime_starthour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 0);
document.form.FirewallConfig_WanLocalActiveTime_startmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 1);
document.form.FirewallConfig_WanLocalActiveTime_endhour.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 2);
document.form.FirewallConfig_WanLocalActiveTime_endmin.value = getTimeRange(document.form.FirewallConfig_WanLocalActiveTime.value, 3);
}
else if (document.form.current_page.value == "Advanced_URLFilter_Content.html")
{document.form.url_date_x_Sun.checked = getDateCheck(document.form.url_date_x.value, 0);
document.form.url_date_x_Mon.checked = getDateCheck(document.form.url_date_x.value, 1);
document.form.url_date_x_Tue.checked = getDateCheck(document.form.url_date_x.value, 2);
document.form.url_date_x_Wed.checked = getDateCheck(document.form.url_date_x.value, 3);
document.form.url_date_x_Thu.checked = getDateCheck(document.form.url_date_x.value, 4);
document.form.url_date_x_Fri.checked = getDateCheck(document.form.url_date_x.value, 5);
document.form.url_date_x_Sat.checked = getDateCheck(document.form.url_date_x.value, 6);
document.form.url_time_x_starthour.value = getTimeRange(document.form.url_time_x.value, 0);
document.form.url_time_x_startmin.value = getTimeRange(document.form.url_time_x.value, 1);
document.form.url_time_x_endhour.value = getTimeRange(document.form.url_time_x.value, 2);
document.form.url_time_x_endmin.value = getTimeRange(document.form.url_time_x.value, 3);
}
else if (document.form.current_page.value == "Advanced_DHCP_Content.html" ||
document.form.current_page.value == "Advanced_RDHCP_Content.html")
{final_flag = 1;
}
else if (document.form.current_page.value == "Advanced_DDNS_Content.html")
{}
else if (document.form.current_page.value == "Main_GStatus_Content.html")
{}
else if (document.form.current_page.value == "Advanced_QOSUserSpec_Content.html")
{
	if (document.form.qos_dfragment_enable_w.checked == true)
		{inputCtrl(document.form.qos_dfragment_size, 1);
	}
	else{
		inputCtrl(document.form.qos_dfragment_size, 0);
	}
}
change = 0;
}

function change_wireless_firewall()
{if (isModel() == "WL600")
{if (document.form.FirewallConfig_DmzEnable[0].checked == true )
{if (document.form.FirewallConfig_DmzDevices.value == "Both")
document.form.WirelessFirewall_img.src = "graph/wf_both.gif";
else if (document.form.FirewallConfig_DmzDevices.value == "802.11a only")
document.form.WirelessFirewall_img.src = "graph/wf_a.gif";
else if (document.form.FirewallConfig_DmzDevices.value == "802.11g only")
document.form.WirelessFirewall_img.src = "graph/wf_g.gif";
}
else  document.form.WirelessFirewall_img.src = "graph/wf_none.gif";
}
else
{if (document.form.FirewallConfig_DmzEnable[0].checked == true)
{document.form.WirelessFirewall_img.src = "graph/wf_g.gif";
}
else document.form.WirelessFirewall_img.src = "graph/wf_none.gif";
}
}
function change_firewall(r)
{if (r == "0")
{inputRCtrl1(document.form.misc_http_x, 0);
inputRCtrl2(document.form.misc_http_x, 1);
inputCtrl(document.form.misc_httpport_x, 0);
if (isModel()!="WL520gc" && isModel()!="SnapAP")
{if (isFlash() != '2MB' && isModel()!= "WL331" )
{inputRCtrl1(document.form.misc_lpr_x, 0);
inputRCtrl2(document.form.misc_lpr_x, 1);
}
inputRCtrl1(document.form.misc_ping_x, 0);
inputRCtrl2(document.form.misc_ping_x, 1);
}
}
else
{inputRCtrl1(document.form.misc_http_x, 1);
inputCtrl(document.form.misc_httpport_x, 1);
if (isModel()!="WL520gc" && isModel()!="SnapAP")
{if (isFlash() != '2MB' && isModel()!="WL331")
{inputRCtrl1(document.form.misc_lpr_x, 1);
}
inputRCtrl1(document.form.misc_ping_x, 1);
}
}
}
function change_wireless_bridge(m, a, r, mflag)
{if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m != 0) {
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
}
return;
if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{wdsimage = "wds_ap";
inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m == "1")
wdsimage = "wds_wds";
else
wdsimage = "wds_mixed";
if (a == "0")
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_anony";
}
else
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_both";
}
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
wdsimage = "graph/" + wdsimage + ".gif";
if (isFlash() != '2MB')
document.form.WirelessBridge_img.src = wdsimage;
}
function change_wireless_bridge2(m, a, r, mflag)
{return;
if (a=="0" && r == "0" && mflag != 1)
{document.form.wl_mode_x.value = "0";
m = "0";
}
if (m == "0")
{wdsimage = "wds_ap";
inputRCtrl2(document.form.wl_wdsapply_x, 1);
inputRCtrl1(document.form.wl_wdsapply_x, 0);
}
else
{if (a=="0" && r == "0")
{inputRCtrl2(document.form.wl_wdsapply_x, 0);
}
inputRCtrl1(document.form.wl_wdsapply_x, 1);
if (m == "1")
wdsimage = "wds_wds";
else
wdsimage = "wds_mixed";
if (a == "0")
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_anony";
}
else
{if (r == "0")
wdsimage += "_connect";
else
wdsimage += "_both";
}
if (document.form.wl_channel.value == "0")
{alert("Please choose a fixed channel for WDS.");
document.form.wl_channel.options[0].selected = 0;
document.form.wl_channel.options[1].selected = 1;
}
}
wdsimage = "graph/" + wdsimage + ".gif";
if (isFlash() != '2MB' && isModel2()!='WL530')
document.form.WirelessBridge_img.src = wdsimage;
}
function onSubmit(){
	change = 0;
	pageChanged = 0;
	pageChangedCount = 0;
	
if (document.form.current_page.value == "Advanced_RLANWAN_Content.html")
{checkSubnet();
}
else if (document.form.current_page.value == "Advanced_DMZIP_Content.html")
{checkDmzSubnet();
}
else if (document.form.current_page.value == "Advanced_LFirewall_Content.html")
{updateDateTime(document.form.current_page.value);
}
else if (document.form.current_page.value == "Advanced_WebCam_Content.html")
{updateDateTime(document.form.current_page.value);
}
else if (document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
{if (!validate_ipaddr_final(document.form.lan1_ipaddr, 'lan1_ipaddr') ||
!validate_ipaddr_final(document.form.lan1_netmask, 'lan1_netmask') ||
!validate_ipaddr_final(document.form.dhcp1_start, 'dhcp1_start') ||
!validate_ipaddr_final(document.form.dhcp1_end, 'dhcp1_end')) return false;
if (intoa(document.form.dhcp1_start.value)>intoa(document.form.dhcp1_end.value))
{tmp = document.form.dhcp1_start.value;
document.form.dhcp1_start.value = document.form.dhcp1_end.value;
document.form.dhcp1_end.value = tmp;
}
inputCtrl(document.form.wl_guest_phrase_x_1, 1);
inputCtrl(document.form.wl_guest_wep_x_1, 1);
inputCtrl(document.form.wl_guest_key1_1, 1);
inputCtrl(document.form.wl_guest_key2_1, 1);
inputCtrl(document.form.wl_guest_key3_1, 1);
inputCtrl(document.form.wl_guest_key4_1, 1);
inputCtrl(document.form.wl_guest_key_1, 1);
unmasq_wepkey_guest();
}

	return true;
}

function onSubmitCtrl(o, s) {
document.form.action_mode.value = s;
return (onSubmit());
}

function onSubmitCtrlOnly(o, s){
	if(s != 'Upload' && s != 'Upload1')
		document.form.action_mode.value = s;
	
	if(s == 'Upload1'){
		if(varload){
			alert("It takes about three minutes to upgrade the firmware. Please do not press [Upload] twice.");
			return false;
		}
		else{			
			disableCheckChangedStatus();
			document.form.submit();
		}		
		//varload++;
	}
	stopFlag = 1;	
	disableCheckChangedStatus();
	return true;
}

function validate_ddns_hostname(o)
{dot=0;
s=o.value;
if(!s.match(".asuscomm.com"))
{alert("Invalid Hostname! The format should be 'xxx.asuscomm.com' and 'xxx' cannot be entirely number.");
return false;
}
if (!validate_string(o))
{return false;
}
for(i=0;i<s.length;i++)
{c = s.charCodeAt(i);
if (c==46)
{dot++;
if(dot>2)
{alert("Invalid Hostname! The format should be 'xxx.asuscomm.com' and 'xxx' cannot be entirely number.");
return false;
}
}
if (!validate_hostnamechar(c))
{alert("Invalid characters of domain name is '" + s.charAt(i) +"' !");
return(false);
}
}
return(true);
}
function validate_hostnamechar(ch)
{if (ch>=48&&ch<=57) return true;
if (ch>=97&&ch<=122) return true;
if (ch>=65&&ch<=90) return true;
if (ch==45) return true;
if (ch==46) return true;
return false;
}

function onSubmitApply(s){
	pageChanged = 0;
	pageChangedCount = 0;
if (document.form.current_page.value == "Advanced_PortMapping_Content.html")
{if (s == "0")
{action = document.form.IPConnection_MappedAction_0;
local = document.form.IPConnection_MappedIP_0;
port = document.form.IPConnection_MappedInPort_0;
desc = document.form.IPConnection_MappedDescript_0;
}
else if (s == "1")
{action = document.form.IPConnection_MappedAction_1;
local = document.form.IPConnection_MappedIP_1;
port = document.form.IPConnection_MappedInPort_1;
desc = document.form.IPConnection_MappedDescript_1;
}
else if (s == "2")
{action = document.form.IPConnection_MappedAction_2;
local = document.form.IPConnection_MappedIP_2;
port = document.form.IPConnection_MappedInPort_2;
desc = document.form.IPConnection_MappedDescript_2;
}
else if (s == "3")
{action = document.form.IPConnection_MappedAction_3;
local = document.form.IPConnection_MappedIP_3;
port = document.form.IPConnection_MappedInPort_3;
desc = document.form.IPConnection_MappedDescript_3;
}
else if (s == "4")
{action = document.form.IPConnection_MappedAction_4;
local = document.form.IPConnection_MappedIP_4;
port = document.form.IPConnection_MappedInPort_4;
desc = document.form.IPConnection_MappedDescript_4;
}
else if (s == "5")
{action = document.form.IPConnection_MappedAction_5;
local = document.form.IPConnection_MappedIP_5;
port = document.form.IPConnection_MappedInPort_5;
desc = document.form.IPConnection_MappedDescript_5;
}
if (action.value == "Set")
{if (!validate_ipaddr(local, "") ||
!validate_portrange(port, ""))
{return false;
}
else if (local.value=="" || port.value == "")
{alert("Local IP or port range fields cannot be empty!");
return false;
}
}
document.form.action_mode.value = action.value;
document.form.action_script.value = "portmapping.sh" + " " + action.value + " " + local.value + " " + port.value;
}
	else if(document.form.current_page.value == "Advanced_ASUSDDNS_Content.html"){
		if(s == "hostname_check"){
			if(!validate_ddns_hostname(document.form.ddns_hostname_x))
				return false;
		}
		
		document.form.action_mode.value = "Update";
		document.form.action_script.value = s;
		document.form.flag.value = "nodetect";
	}
	else{
		document.form.action_mode.value = "Update";
		document.form.action_script.value = s;
	}
	
	return true;
}

function setup_script(s)
{if (document.form.current_page.value == "Advanced_ACL_Content.html")
{document.form.action_script.value = s;
}
}

function change_common(o, s, v){
	change = 1;
	pageChanged = 1;
	
	if(v == "wl_auth_mode"){ /* Handle AuthenticationMethod Change */
		wl_auth_mode_change(0);
		
		if(o.value == "psk" || o.value == "wpa"){
			opts = document.form.wl_auth_mode.options;
			
			if(opts[opts.selectedIndex].text == "WPA-Personal")
				document.form.wl_wpa_mode.value="1";
			else if(opts[opts.selectedIndex].text == "WPA2-Personal")
				document.form.wl_wpa_mode.value="2";
			else if(opts[opts.selectedIndex].text == "WPA-Auto-Personal")
				document.form.wl_wpa_mode.value="0";
			else if(opts[opts.selectedIndex].text == "WPA-Enterprise")  
				document.form.wl_wpa_mode.value="3";
			else if(opts[opts.selectedIndex].text == "WPA-Auto-Enterprise")
				document.form.wl_wpa_mode.value="4";
			
			if(o.value == "psk"){
				document.form.wl_wpa_psk.focus();
				document.form.wl_wpa_psk.select();
			}
		}
		else if(o.value == "shared"){
			//document.form.wl_phrase_x.focus();
			document.form.wl_key1.focus();
			document.form.wl_key1.select();			
		}
	}
	else if (v == "wl_crypto"){
		wl_auth_mode_change(0);
	}
	else if(v == "wl_wep_x"){ /* Handle AuthenticationMethod Change */
		change_wlweptype(o, "WLANConfig11b");
	}
	else if(v == "wl_key"){ /* Handle AuthenticationMethod Change */
		var selected_key = eval("document.form.wl_key"+o.value);
		
		selected_key.focus();
		selected_key.select();
	}
//else if(s=="WLANConfig11b" && v == "wl_channel")
//{insertExtChannelOption();
//}
else if(s=="WLANConfig11b" && v == "wl_nbw_cap")
{insertExtChannelOption();
}
else if (s=="WLANConfig11b" && v=="wl_gmode_check")
{
	if (document.form.wl_gmode_check.checked == true)
		document.form.wl_gmode_protection_x.value = "1";
	else
		document.form.wl_gmode_protection_x.value = "0";
}
else if(s=="WLANConfig11b" && v == "wl_gmode")
{
	if(window.top.isBand() == 'b' || o.value=='4' || o.value=='2') 
		inputCtrl(document.form.wl_gmode_check, 0); // B/N only
	else
		inputCtrl(document.form.wl_gmode_check, 1);
		
	if(document.form.wl_gmode.value == "2" || document.form.wl_gmode.value == "0")
		inputCtrl(document.form.wl_nbw_cap, 1);
	else {
		inputCtrl(document.form.wl_nbw_cap, 0);
		document.form.wl_nbw_cap.value = "0";
	}
		
	insertExtChannelOption();
	if(o.value=='2')
		document.form.wl_wme.value = '1';
}
else if (v == "wl_mode_x")
{change_wireless_bridge(o.value, rcheck(document.form.wl_wdsapply_x), 0, 1);
}
else if (v == "wl_guest_auth_mode_1") /* Handle AuthenticationMethod Change */
{wl_auth_mode_change_guest(0);
if (o.value == "psk"){
document.form.wl_guest_wpa_psk_1.focus();
document.form.wl_guest_wpa_psk_1.select();
}
else if (o.value == "shared"){
document.form.wl_guest_phrase_x_1.focus();
document.form.wl_guest_phrase_x_1.select();
}
}
else if (v == "wl_guest_wep_x_1") /* Handle AuthenticationMethod Change */
{change_wlweptype_guest(o, "WLANConfig11b");
}
else if (v == "wl_guest_crypto_1")
{wl_auth_mode_change_guest(0);
}
else if (s == "FirewallConfig" && v=="DmzDevices")
{change_wireless_firewall();
}
else if (s == "FirewallConfig" && v=="WanLanDefaultAct")
{if (o.value == "DROP")
alert("Selecting DROP will drop all WAN to LAN packets except for those matched in filter table. Please use it carefully.");
}
else if (s == "FirewallConfig" && v=="LanWanDefaultAct")
{if (o.value == "DROP")
alert("Selecting DROP will drop all LAN to WAN packets except for those matched in filter table. Please use it carefully.");
}
else if (s=="WLANConfig11b" && v=="x_Mode11g")
{RefreshRateSetList(document.form.WLANConfig11b_x_Mode11g.value, true);
}
else if (s=="WLANConfig11b" && v=="Channel" && document.form.current_page.value=="Advanced_WMode_Content.html")
{
	if (document.form.WLANConfig11b_x_APMode.value != "0" && document.form.WLANConfig11b_Channel.value == "0")
	{
		alert("Please choose a fixed channel for WDS.");
		document.form.WLANConfig11b_Channel.options[0].selected = 0;
		document.form.WLANConfig11b_Channel.options[1].selected = 1;
	}
}
else if (v=="ddns_server_x")
{change_ddns_setting(o.value);
}
return true;
}

function change_ddns_setting(v)
{if (v == "WWW.ASUS.COM")
{inputCtrl(document.form.ddns_username_x, 0);
inputCtrl(document.form.ddns_passwd_x, 0);
document.form.ddns_wildcard_x[0].disabled= 1;
document.form.ddns_wildcard_x[1].disabled= 1;
document.form.LANHostConfig_x_DDNSHostnameCheck_button.disabled= 0;
document.getElementsByTagName("a")[0].removeAttribute("href");
showhide("link", 0);
showhide("Hostname_Note", 1);
}
else
{inputCtrl(document.form.ddns_username_x, 1);
inputCtrl(document.form.ddns_passwd_x, 1);
document.form.ddns_wildcard_x[0].disabled= 0;
document.form.ddns_wildcard_x[1].disabled= 0;
document.form.LANHostConfig_x_DDNSHostnameCheck_button.disabled= 1;
document.getElementsByTagName("a")[0].setAttribute("href","javascript:openLink('x_DDNSServer')");
showhide("link", 1);
showhide("Hostname_Note", 0);
}
}

function change_common_radio(o, s, v, r){
	change = 1;
	pageChanged = 1;
if (v=='wl_wdsapply_x')
{if (isCard()=='ralink'  || isModel2()=='WL530' )
{change_wireless_bridge2(document.form.wl_mode_x.value,
rcheck(document.form.wl_wdsapply_x),
1, 0);
}
else{}
}
else if (v=='wl_lazywds')
{}
	else if (v=='wps_mode')
	{
		if (r == '1')
			inputCtrl(document.form.wps_sta_pin, 1);
		else
			inputCtrl(document.form.wps_sta_pin, 0);
	}
else if (v=="qos_dfragment_enable")
{if (r == '1')
{inputCtrl(document.form.qos_dfragment_size, 1);
}
else
{inputCtrl(document.form.qos_dfragment_size, 0);
}
}
	else if(v == "wan_dnsenable_x"){
		if(r == 1){
			inputCtrl(document.form.wan_dns1_x, 0);
			inputCtrl(document.form.wan_dns2_x, 0);
		}
		else{
			inputCtrl(document.form.wan_dns1_x, 1);
			inputCtrl(document.form.wan_dns2_x, 1);
		}
	}
else if (v=="fw_enable_x")
{change_firewall(r);
}
else if (v=="x_AESEnable")
{if (r == '1')
{if (document.form.WLANConfig11a_AuthenticationMethod.value!="Open System")
{rst = confirm("If you would like to enable AES unique, Authentication should be set as Open System!");
if (rst)
document.form.WLANConfig11a_AuthenticationMethod.value = "Open System";
else
{inputRCtrl2(document.form.WLANConfig11a_x_AESEnable, 1);
return false;
}
}
else
{if (document.form.WLANConfig11a_WEPType.value == "None")
{rst = confirm("If you would like to enable AES unique, WEP should be enabled too!");
if (rst)
{document.form.WLANConfig11a_WEPType.value = "64bits";
change_wlweptype(document.form.WLANConfig11a_WEPType, "WLANConfig11a");
}
else
{inputRCtrl2(document.form.WLANConfig11a_x_AESEnable, 1);
return false;
}
}
}
}
}
else if (s=="WLANConfig11b" && v=="wl_gmode") 
{if (document.form.wl_gmode_check.checked == true)
{document.form.wl_gmode_protection_x.value = "1";
}
else
{document.form.wl_gmode_protection_x.value = "0";
}
}
else if (s=="PrinterStatus" && v=="usb_webhttpport_x")
{if (document.form.usb_webhttpport_x_check.checked)
{document.form.usb_webhttpcheck_x.value = "1";
}
else
{document.form.usb_webhttpcheck_x.value = "0";
}
}
else if (v=="lan_proto_x")
{if (r == '1')
{inputCtrl(document.form.lan_ipaddr, 0);
inputCtrl(document.form.lan_netmask, 0);
inputCtrl(document.form.lan_gateway, 0);
}
else
{inputCtrl(document.form.lan_ipaddr, 1);
inputCtrl(document.form.lan_netmask, 1);
inputCtrl(document.form.lan_gateway, 1);
}
}
else if (s=='FirewallConfig' && v=='DmzEnable')
{change_wireless_firewall();
}
else if (s=="PPPConnection" && v=="wan_pppoe_idletime")
{if (document.form.wan_pppoe_idletime_check.checked)
{document.form.wan_pppoe_txonly_x.value = "1";
}
else
{document.form.wan_pppoe_txonly_x.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_IdleTime1")
{if (document.form.PPPConnection_x_IdleTime1_check.checked)
{document.form.PPPConnection_x_IdleTxOnly1.value = "1";
}
else
{document.form.PPPConnection_x_IdleTxOnly1.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_MultiPPPoEEnable1")
{if (document.form.PPPConnection_x_MultiPPPoEEnable1[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName1, flag);
inputCtrl(document.form.PPPConnection_x_Password1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime1_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU1, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU1, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName1, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator1, flag);
}
else if (s=="PPPConnection" && v=="x_IdleTime2")
{if (document.form.PPPConnection_x_IdleTime2_check.checked)
{document.form.PPPConnection_x_IdleTxOnly2.value = "1";
}
else
{document.form.PPPConnection_x_IdleTxOnly2.value = "0";
}
}
else if (s=="PPPConnection" && v=="x_MultiPPPoEEnable2")
{if (document.form.PPPConnection_x_MultiPPPoEEnable2[0].checked == true)
{flag=1;
}
else
{flag=0;
}
inputCtrl(document.form.PPPConnection_x_UserName2, flag);
inputCtrl(document.form.PPPConnection_x_Password2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2, flag);
inputCtrl(document.form.PPPConnection_x_IdleTime2_check, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMTU2, flag);
inputCtrl(document.form.PPPConnection_x_PPPoEMRU2, flag);
inputCtrl(document.form.PPPConnection_x_ServiceName2, flag);
inputCtrl(document.form.PPPConnection_x_AccessConcentrator2, flag);
}
return true;
}

function valid_WPAPSK(o){
	if(o.value.length >= 64){
		o.value = o.value.substring(0, 63);
		alert("Pre-shared key should be less than 64 characters!");
		return false;
	}
	
	return true;
}

function encryptionType(authType, wepType)
{pflag = "1";
if (authType.value == "1")
{if (wepType.value == "0") wepLen = "64";
else wepLen = "128";
}
else if (authType.value == "2")
{wepLen = "0";
}
else if (authType.value == "3")
{wepLen = "0";
pflag = "0";
}
else if (authType.value == "4")
{if (wepType.value == "0") wepLen = "64";
else wepLen = "128";
}
else
{if (wepType.value == "0")
{wepLen = "0";
pflag = "0";
}
else if (wepType.value == "1") wepLen = "64";
else wepLen = "128";
}
return(pflag + wepLen);
}

function change_wlweptype(o, s, isload){
	if(o.value == "0"){
		wflag = 0;
		wep = "";
		
		document.form.wl_key1.value = wep;
		document.form.wl_key2.value = wep;
		document.form.wl_key3.value = wep;
		document.form.wl_key4.value = wep;
	}
	else{
		wflag = 1;
		
		if(document.form.wl_phrase_x.value.length > 0 && isload == 0)
			is_wlphrase("WLANConfig11b", "wl_phrase_x", document.form.wl_phrase_x);
	}
	
	inputCtrl(document.form.wl_phrase_x, wflag);
	inputCtrl(document.form.wl_key1, wflag);
	inputCtrl(document.form.wl_key2, wflag);
	inputCtrl(document.form.wl_key3, wflag);
	inputCtrl(document.form.wl_key4, wflag);
	inputCtrl(document.form.wl_key, wflag);
	
	wl_wep_change();
	/*if(wflag == "1"){
		document.form.wl_key1.focus();
		document.form.wl_key1.select();		
	}*/
}

function is_wlkey(o, s){
	if(!nav)
		keyPressed = IEKey();
	else
		keyPressed = NSKey();
	
	if(keyPressed == 0)
		return true;
	
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
		wep = document.form.wl_guest_wep_x_1.value;
	else
		wep = document.form.wl_wep_x.value;
	
	if((keyPressed > 47 && keyPressed < 58)
			|| (keyPressed > 64 && keyPressed < 71)
			|| (keyPressed > 96 && keyPressed < 103)){
		if(wep == "1"){
			if(o.value != "" && o.value.length > 10)
				return false;
		}
		else if(wep == "2"){
			if(o.value != "" && o.value.length > 26)
				return false;
		}
		else
			return false;
	}
	else
		return false;
	
	return true;
}

function change_wlkey(o, s){
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html")
		wep = document.form.wl_guest_wep_x_1.value;
	else
		wep = document.form.wl_wep_x.value;
	
	if(wep == "1"){
		if(o.value.length > 10)
			o.value = o.value.substring(0, 10);
	}
	else if(wep == "2"){
		if(o.value.length > 26)
			o.value = o.value.substring(0, 26);
	}
	
	return true;
}

function validate_timerange(o, p)
{
	if (o.value.length==0) 
		o.value = "00";
	else if (o.value.length==1) 
		o.value = "0" + o.value;
		
	if (o.value.charAt(0)<'0' || o.value.charAt(0)>'9') 
		o.value = "00";
	else if (o.value.charAt(1)<'0' || o.value.charAt(1)>'9') 
		o.value = "00";
	else if (p==0 || p==2)
	{
		if(o.value>23)
			o.value = "00";
	}
	else
	{
		if(o.value>59)
			o.value = "00";
	}
	return true;
}

function matchSubnet(ip1, ip2, count)
{var c = 0;
var v1 = 0;
var v2 = 0;
for(i=0;i<ip1.length;i++)
{if (ip1.charAt(i) == '.')
{if (ip2.charAt(i) != '.')
return false;
c++;
if (v1!=v2) return false;
v1 = 0;
v2 = 0;
}
else
{if (ip2.charAt(i)=='.') return false;
v1 = v1*10 + (ip1.charAt(i) - '0');
v2 = v2*10 + (ip2.charAt(i) - '0');
}
if (c==count) return true;
}
return false;
}
function subnetPrefix(ip, orig, count)
{r='';
c=0;
for(i=0;i<ip.length;i++)
{if (ip.charAt(i) == '.')
c++;
if (c==count) break;
r = r + ip.charAt(i);
}
c=0;
for(i=0;i<orig.length;i++)
{if (orig.charAt(i) == '.')
{c++;
}
if (c>=count)
r = r + orig.charAt(i);
}
return (r);
}

function checkSubnet(){
	/* Rule : If addresses in pool are match to subnet, don't change */
	/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
	if(!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3) ||
			!matchSubnet(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3)){
		if(confirm("The setting of DHCP server does not match current IP address of LAN. Would you like to change it automatically?")){
			document.form.dhcp_start.value = subnetPrefix(document.form.lan_ipaddr.value, document.form.dhcp_start.value, 3);
			document.form.dhcp_end.value = subnetPrefix(document.form.lan_ipaddr.value, document.form.dhcp_end.value, 3);
		}
	}
}

function checkDmzSubnet()
{/* Rule : If addresses in pool are match to subnet, don't change */
/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
if (!matchSubnet(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMinAddress.value, 3) ||
!matchSubnet(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMaxAddress.value, 3))
{if (confirm("The setting of DHCP server does not match current IP address of Wireless Firewall. Would you like to change it automatically?"))
{document.form.LANHostConfig_DmzMinAddress.value = subnetPrefix(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMinAddress.value, 3);
document.form.LANHostConfig_DmzMaxAddress.value = subnetPrefix(document.form.FirewallConfig_DmzIP.value, document.form.LANHostConfig_DmzMaxAddress.value, 3);
}
}
}
function checkSubnetGuest()
{
	/* Rule : If addresses in pool are match to subnet, don't change */
	/* Rule : If addresses in pool are not match to subnet, change to subnet.2~subnet.254 */
	if (!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3) ||
	!matchSubnet(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3))
	{
		if (confirm("The setting of DHCP server does not match current IP address of LAN. Would you like to change it automatically?"))
		{
			document.form.dhcp1_start.value = subnetPrefix(document.form.lan1_ipaddr.value, document.form.dhcp1_start.value, 3);
			document.form.dhcp1_end.value = subnetPrefix(document.form.lan1_ipaddr.value, document.form.dhcp1_end.value, 3);
		}
	}
}
function wan_netmask_check(o) {
ip =intoa(document.form.wan_ipaddr.value);
gw =intoa(document.form.wan_gateway.value);
nm =intoa(document.form.wan_netmask.value);
lip=intoa(document.form.lan_ipaddr.value);
lnm=intoa(document.form.lan_netmask.value);
rem=1;
// 2008.03 James. patch for Oleg's patch. {
//if (ip==0x0 || (ip&lnm)==(lip&lnm))
if (document.form.wan_ipaddr.value != '0.0.0.0' && (ip&lnm)==(lip&lnm))
// 2008.03 James. patch for Oleg's patch. }
{alert(o.value + ' is not a valid IP address!');
document.form.wan_ipaddr.value="10.1.1.1";
document.form.wan_netmask.value="255.0.0.0";
o.focus();
o.select();
return false;
}
if (gw==0 || gw==0xffffffff || (ip&nm)==(gw&nm))
{return true;
}
else
{alert(o.value + ' is not a valid IP address!');
o.focus();
o.select();
return false;
}
}

function updateDateTime(s)
{
	if (s == "Advanced_Firewall_Content.html")
	{
		document.form.filter_lw_date_x.value = setDateCheck(
		document.form.filter_lw_date_x_Sun,
		document.form.filter_lw_date_x_Mon,
		document.form.filter_lw_date_x_Tue,
		document.form.filter_lw_date_x_Wed,
		document.form.filter_lw_date_x_Thu,
		document.form.filter_lw_date_x_Fri,
		document.form.filter_lw_date_x_Sat);
		document.form.filter_lw_time_x.value = setTimeRange(
		document.form.filter_lw_time_x_starthour,
		document.form.filter_lw_time_x_startmin,
		document.form.filter_lw_time_x_endhour,
		document.form.filter_lw_time_x_endmin);
	}
	else if (s == "Advanced_WAdvanced_Content.html")
	{
		if (isModel()!="WL520gc" && isModel()!="SnapAP")
		{
			document.form.wl_radio_date_x.value = setDateCheck(
			document.form.wl_radio_date_x_Sun,
			document.form.wl_radio_date_x_Mon,
			document.form.wl_radio_date_x_Tue,
			document.form.wl_radio_date_x_Wed,
			document.form.wl_radio_date_x_Thu,
			document.form.wl_radio_date_x_Fri,
			document.form.wl_radio_date_x_Sat);
			document.form.wl_radio_time_x.value = setTimeRange(
			document.form.wl_radio_time_x_starthour,
			document.form.wl_radio_time_x_startmin,
			document.form.wl_radio_time_x_endhour,
			document.form.wl_radio_time_x_endmin);
		}
	}
	else if (s == "Advanced_URLFilter_Content.html")
	{
		document.form.url_date_x.value = setDateCheck(
		document.form.url_date_x_Sun,
		document.form.url_date_x_Mon,
		document.form.url_date_x_Tue,
		document.form.url_date_x_Wed,
		document.form.url_date_x_Thu,
		document.form.url_date_x_Fri,
		document.form.url_date_x_Sat);
		document.form.url_time_x.value = setTimeRange(
		document.form.url_time_x_starthour,
		document.form.url_time_x_startmin,
		document.form.url_time_x_endhour,
		document.form.url_time_x_endmin);
	}		
	else if (s == "Advanced_LFirewall_Content.html")
	{
		document.form.FirewallConfig_WanLocalActiveDate.value = setDateCheck(
		document.form.FirewallConfig_WanLocalActiveDate_Sun,
		document.form.FirewallConfig_WanLocalActiveDate_Mon,
		document.form.FirewallConfig_WanLocalActiveDate_Tue,
		document.form.FirewallConfig_WanLocalActiveDate_Wed,
		document.form.FirewallConfig_WanLocalActiveDate_Thu,
		document.form.FirewallConfig_WanLocalActiveDate_Fri,
		document.form.FirewallConfig_WanLocalActiveDate_Sat);
		document.form.FirewallConfig_WanLocalActiveTime.value = setTimeRange(
		document.form.FirewallConfig_WanLocalActiveTime_starthour,
		document.form.FirewallConfig_WanLocalActiveTime_startmin,
		document.form.FirewallConfig_WanLocalActiveTime_endhour,
		document.form.FirewallConfig_WanLocalActiveTime_endmin);
	}
}

function openLink(s)
{if (s=='x_DDNSServer')
{if (document.form.ddns_server_x.value.indexOf("WWW.DYNDNS.ORG")!=-1)
tourl = "https://www.dyndns.org/account/create.html"
else if (document.form.ddns_server_x.value == 'WWW.ZONEEDIT.COM')
tourl = "https://www.zoneedit.com/signup.html"
else if (document.form.ddns_server_x.value == 'WWW.ASUS.COM')
tourl = "";
else
tourl = "https://controlpanel.tzo.com/cgi-bin/tzopanel.exe"
link = window.open(tourl, "DDNSLink",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=480");
}
else if (s=='x_NTPServer1')
{tourl = "http://ntp.isc.org/bin/view/Servers/WebHome"
link = window.open(tourl, "NTPLink",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=480");
}
else if (s=='x_WImageSize')
{tourl = "Advanced_ShowTime_Widzard.html"
link = window.open(tourl, "WebCamera",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
else if (s=='x_WImageStatic')
{tourl = "ShowWebCamPic.html"
link = window.open(tourl, "WebCamera",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
else if (s=='x_WRemote')
{tourl = "Advanced_RemoteControl_Widzard.html"
link = window.open(tourl, "RemoteMonitor",
"toolbar=no,location=no,directories=no,status=no,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,top=0,left=0,width=" + screen.width + ",height=" + screen.height);
}
else if (s=='x_FIsAnonymous' || s=='x_FIsSuperuser')
{urlstr = location.href;
url = urlstr.indexOf("http://");
port = document.form.usb_ftpport_x.value;
if (url == -1) urlpref = LANIP;
else
{urlstr = urlstr.substring(7, urlstr.length);
url = urlstr.indexOf(":");
if (url!=-1)
{urlpref = urlstr.substring(0, url);
}
else
{url = urlstr.indexOf("/");
if (url!=-1) urlpref = urlstr.substring(0, url);
else urlpref = urlstr;
}
}
if (s=='x_FIsAnonymous')
{user = 'anonymous';
tourl = "ftp://" + urlpref;
}
else
{user = 'admin';
tourl = "ftp://" + user + "@" + urlpref;
}
if (port!=21) tourl = tourl + ":" + port;
link = window.open(tourl, "FTPServer",
"toolbar=yes,location=yes,directories=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,copyhistory=no,width=640,height=560");
}
if (!link.opener) link.opener = self;
}

function blur_body()
{alert('Out of focus!');
}
/* Used when WEP is changed */
function changeWEPType()
{if (document.form.wl_wep.value == "0")
{flag = 0;
}
else
{flag = 1;
}
inputCtrl(document.form.wl_phrase_x, flag);
inputCtrl(document.form.wl_key1, flag);
inputCtrl(document.form.wl_key2, flag);
inputCtrl(document.form.wl_key3, flag);
inputCtrl(document.form.wl_key4, flag);
inputCtrl(document.form.wl_key, flag);
}
/* Used when Authenication Method is changed */
function changeAuthType()
{if (document.form.wl_auth_mode.value == "shared")
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key2, 1);
inputCtrl(document.form.wl_key3, 1);
inputCtrl(document.form.wl_key4, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "psk")
{inputCtrl(document.form.wl_crypto, 1);
inputCtrl(document.form.wl_wpa_psk, 1);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key2, 1);
inputCtrl(document.form.wl_key3, 1);
inputCtrl(document.form.wl_key4, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "wpa" || document.form.wl_auth_mode.value == "wpa2")
{inputCtrl(document.form.wl_crypto, 1);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 0);
inputCtrl(document.form.wl_phrase_x, 0);
inputCtrl(document.form.wl_key1, 0);
inputCtrl(document.form.wl_key2, 0);
inputCtrl(document.form.wl_key3, 0);
inputCtrl(document.form.wl_key4, 0);
inputCtrl(document.form.wl_key, 0);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else if (document.form.wl_auth_mode.value == "radius")
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 0);
inputCtrl(document.form.wl_phrase_x, 0);
inputCtrl(document.form.wl_key1, 0);
inputCtrl(document.form.wl_key2, 0);
inputCtrl(document.form.wl_key3, 0);
inputCtrl(document.form.wl_key4, 0);
inputCtrl(document.form.wl_key, 0);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
else
{inputCtrl(document.form.wl_crypto, 0);
inputCtrl(document.form.wl_wpa_psk, 0);
inputCtrl(document.form.wl_wep, 1);
inputCtrl(document.form.wl_phrase_x, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key1, 1);
inputCtrl(document.form.wl_key, 1);
inputCtrl(document.form.wl_wpa_gtk_rekey,  0);
}
}
/* input : s: service id, v: value name, o: current value */
/* output: wep key1~4       */
function is_wlphrase(s, v, o){
	var pseed = new Array;
	var wep_key = new Array(5);
	
	if(v=='wl_wpa_psk')
		return(valid_WPAPSK(o));
	
	if(document.form.current_page.value == "Advanced_WirelessGuest_Content.html"){
		wepType = document.form.wl_guest_wep_x_1.value;
		wepKey1 = document.form.wl_guest_key1_1;
		wepKey2 = document.form.wl_guest_key2_1;
		wepKey3 = document.form.wl_guest_key3_1;
		wepKey4 = document.form.wl_guest_key4_1;
	}
	else{	// note: current_page == "Advanced_Wireless_Content.html"
		wepType = document.form.wl_wep_x.value;
		wepKey1 = document.form.wl_key1;
		wepKey2 = document.form.wl_key2;
		wepKey3 = document.form.wl_key3;
		wepKey4 = document.form.wl_key4;
	}
	
	phrase = o.value;
	if(wepType == "1"){
		for(var i = 0; i < phrase.length; i++){
			pseed[i%4] ^= phrase.charCodeAt(i);
		}
		
		randNumber = pseed[0] | (pseed[1]<<8) | (pseed[2]<<16) | (pseed[3]<<24);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber*0x343fd)%0x1000000);
			randNumber = ((randNumber+0x269ec3)%0x1000000);
			wep_key[j] = ((randNumber>>16)&0xff);
		}
		
		wepKey1.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey2.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey3.value = binl2hex_c(wep_key);
		for(var j = 0; j < 5; j++){
			randNumber = ((randNumber * 0x343fd) % 0x1000000);
			randNumber = ((randNumber + 0x269ec3) % 0x1000000);
			wep_key[j] = ((randNumber>>16) & 0xff);
		}
		
		wepKey4.value = binl2hex_c(wep_key);
	}
	else if(wepType == "2" || wepType == "3"){
		password = "";
		
		if(phrase.length > 0){
			for(var i = 0; i < 64; i++){
				ch = phrase.charAt(i%phrase.length);
				password = password+ch;
			}
		}
		
		password = calcMD5(password);
		if(wepType == "2"){
			wepKey1.value = password.substr(0, 26);
		}
		else{
			wepKey1.value = password.substr(0, 32);
		}
		
		wepKey2.value = wepKey1.value;
		wepKey3.value = wepKey1.value;
		wepKey4.value = wepKey1.value;
	}
	
	return true;
}

function wl_wep_change(){
	var mode = document.form.wl_auth_mode.value;
	var wep = document.form.wl_wep_x.value;
	
	inputCtrl(document.form.wl_crypto, 0);
	inputCtrl(document.form.wl_wpa_psk, 0);
	
	if(mode == "psk" || mode == "wpa" || mode == "wpa2" || mode == "radius"){
		if(mode != "radius")
			inputCtrl(document.form.wl_crypto, 1);
		
		if(mode == "psk")
			inputCtrl(document.form.wl_wpa_psk, 1);
		
		inputCtrl(document.form.wl_wep_x, 0);
		inputCtrl(document.form.wl_phrase_x, 0);
		inputCtrl(document.form.wl_key1, 0);
		inputCtrl(document.form.wl_key2, 0);
		inputCtrl(document.form.wl_key3, 0);
		inputCtrl(document.form.wl_key4, 0);
		inputCtrl(document.form.wl_key, 0);
		
		if(mode == "radius")
			inputCtrl(document.form.wl_wpa_gtk_rekey, 0);
		else
			inputCtrl(document.form.wl_wpa_gtk_rekey, 1);
	}
	else{
		if(wep != "0"){
			inputCtrl(document.form.wl_phrase_x, 1);
			inputCtrl(document.form.wl_key1, 1);
			inputCtrl(document.form.wl_key2, 1);
			inputCtrl(document.form.wl_key3, 1);
			inputCtrl(document.form.wl_key4, 1);
			inputCtrl(document.form.wl_key, 1);
		}
		else{
			inputCtrl(document.form.wl_phrase_x, 0);
			inputCtrl(document.form.wl_key1, 0);
			inputCtrl(document.form.wl_key2, 0);
			inputCtrl(document.form.wl_key3, 0);
			inputCtrl(document.form.wl_key4, 0);
			inputCtrl(document.form.wl_key, 0);
		}
	}
	
	change_key_des();	// 2008.01 James.
}

function change_wep_type(mode, isload){
	var cur_wep = document.form.wl_wep_x.value;
	var wep_type_array;
	var value_array;
	
	free_options(document.form.wl_wep_x);
	
	if(mode == "shared" || mode == "radius"){
		wep_type_array = new Array("WEP-64bits", "WEP-128bits");
		value_array = new Array("1", "2");
	}
	else{
		wep_type_array = new Array("None", "WEP-64bits", "WEP-128bits");
		value_array = new Array("0", "1", "2");
	}
	
	add_options_x2(document.form.wl_wep_x, wep_type_array, value_array, cur_wep);
	
	if(mode == "psk" || mode == "wpa" || mode == "wpa2")
		document.form.wl_wep_x.value = "0";
	
	change_wlweptype(document.form.wl_wep_x, "WLANConfig11b", isload);
}

function wl_auth_mode_reconf(){
	if(document.form.wl_auth_mode.value == "radius" || document.form.wl_auth_mode.value == "wpa" || document.form.wl_auth_mode.value == "wpa2")
		document.form.wl_auth_mode.value = "open";
	
	for(var i = 5; i <= 8; ++i){
		document.form.wl_auth_mode.options[i].value = null;
		document.form.wl_auth_mode.options[i] = null;
	}
}

function insertExtChannelOption()
{
        var country = document.form.wl_country_code.value;
        var orig = document.form.wl_channel.value;
        free_options(document.form.wl_channel);
                                                                                                  
        if (document.form.wl_nbw_cap.value == "1"){
                if (country == "AS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "AG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BD")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "BG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "CV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "EE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GF")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "DE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "GT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "HU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ID")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IL0")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "JO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "Q2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "KW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "IM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MQ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "YT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MX")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "FM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "MC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "NG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "MP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "NO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "OM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "PG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "RE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "RO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "RU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "PM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ZA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ES")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "LK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "SE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "CH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "TJ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "TR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "UA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "AE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "GB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "US")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "Q1")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "UM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "UY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "UZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "VI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "YU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "ZM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                if (country == "Z2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "XB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
                if (country == "XA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
                                                                                                  
        } else if (document.form.wl_nbw_cap.value == "0"){
                if (country == "AS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "AG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BD")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "BG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "CV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "EE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GF")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "DE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "GT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "HU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ID")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IL0")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
                if (country == "JE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "JO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "Q2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "KW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LS")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MV")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "IM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MQ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "YT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MX")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "FM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "MC")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "NG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "MP")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "NO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "OM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "PG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PL")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "RE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "RO")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "RU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "PM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ZA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ES")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "LK")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "SE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "CH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TW")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "TJ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TH")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
                if (country == "TT")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "TR")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "UA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "AE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "GB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "US")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "Q1")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "UM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "UY")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "UZ")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VE")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VN")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VG")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "VI")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "YU")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "ZM")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                if (country == "Z2")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "XB")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
                if (country == "XA")
                        channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
                                                                                                  
        }
                                                                                                  
        var ch = channels;
                                                                                                  
        ch[0] = "Auto";
        add_options_x2(document.form.wl_channel, ch, channels, orig);

}
/*{
	var nphy_set = "1";
        var phytype;
        var band;
        var nbw_cap;
        var nctrlsb;
        var country = document.forms[0].wl_country_code[document.forms[0].wl_country_code.selectedIndex].value;
        var channels = new Array(0);
        var cur = 0;
        var sel = 0;
                                                                                                  
        if (nphy_set == "1") {
                phytype = "n";
                band  = document.forms[0].wl_nband[document.forms[0].wl_nband.selectedIndex].value;
                nctrlsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                nbw_cap = document.forms[0].wl_nbw_cap[document.forms[0].wl_nbw_cap.selectedIndex].value;
                                                                                                  
                                                                                                  
        } else {
                phytype =  document.forms[0].wl_phytype[document.forms[0].wl_phytype.selectedIndex].value;
        }
*/        /* Save current channel */
/*        for (i = 0; i < document.forms[0].wl_channel.length; i++) {
                if (document.forms[0].wl_channel[i].selected) {
                        cur = document.forms[0].wl_channel[i].value;
                        break;
                }
        }
                                                                                                  
        if (phytype == "a") {
                
        } else if (phytype == "n") {
*/                /* 5 Ghz == a */
/*                if (band == "1") {
                        var nsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                        if ((nbw_cap == "1") || (nbw_cap == "2")) {
                                if (nsb == "upper") {
                                        
                                } else {
                                        
                                }
                        } else if (nbw_cap == "0") {
                                
                        }
                } else if (band == "2")  {
                        var nsb = document.forms[0].wl_nctrlsb[document.forms[0].wl_nctrlsb.selectedIndex].value;
                        if (nbw_cap == "1") {
                                if (nsb == "upper") {
                                        		if (country == "AL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "AI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0B")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "BD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "KY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CX")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ET")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GP")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "VA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ID")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LB")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MQ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MX")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MD")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ME")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NP")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NZ")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "OM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PL")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "QA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RO")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RS")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZA")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ES")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LK")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "TH")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TT")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TR")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TC")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GB")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "US")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "Q2")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UM")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VE")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VN")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VG")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VI")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "WF")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0C")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X0")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X1")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X2")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EU")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XW")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XY")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XV")
			channels = new Array(0, 5, 6, 7, 8, 9, 10, 11, 12, 13);

                                } else {
                                        		if (country == "AL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "AI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "0B")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "BD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "BG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "KY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "CL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "DK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ET")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "FR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "DE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "VA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "HU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ID")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "IT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "JM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "JO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "KW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "YT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ME")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "MZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "NO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "OM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "PR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "QA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "RS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ZA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ES")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "LK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "SE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "CH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "TH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "TC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "AE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "GB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "US")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "Q2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "UM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "UY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "VI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "WF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "0C")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "ZW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "X0")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "X1")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "X2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "EU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "XW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7);
		if (country == "XY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
		if (country == "XV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);

                                }
                        } else if ((nbw_cap == "0") || (nbw_cap == "2")) {
                                		if (country == "AF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "AO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0B")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "BD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "BI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "CF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ER")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ET")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "DE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "GT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "HU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ID")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "JE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "JO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0A")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ML")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "IM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MQ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "FM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "MD")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ME")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "NF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MP")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "NO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "OM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "QA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "KN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "MF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "PM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "WS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ST")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "RS")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SL")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ES")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "LK")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "SE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "CH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "TJ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TO")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TT")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TR")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TC")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "TV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "AE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "GB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "US")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "Q2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "UY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "UZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VN")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VG")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "VI")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "WF")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "0C")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EH")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "YE")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZM")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "ZW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "Z2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XA")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XB")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X0")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "X1")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "X3")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "EU")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XW")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
		if (country == "XX")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "XY")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
		if (country == "XZ")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "XV")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);
		if (country == "B2")
			channels = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14);

                        }
                }
        } else {
                
        }
*/                                                                                                  
        /* Reconstruct channel array from new channels */
/*        document.forms[0].wl_channel.length = channels.length;
        for (var i in channels) {
                if (channels[i] == 0)
                        document.forms[0].wl_channel[i] = new Option("Auto", channels[i]);
                else
                        document.forms[0].wl_channel[i] = new Option(channels[i], channels[i]);
                document.forms[0].wl_channel[i].value = channels[i];
                if (channels[i] == cur) {
                        document.forms[0].wl_channel[i].selected = true;
                        sel = 1;
                }
        }
                                                                                                  
        if (sel == 0)
                document.forms[0].wl_channel[0].selected = true;
	
}
*/
/*
function insertExtChannelOption()
{var wmode = document.form.wl_gmode.value;
var CurrentCh = document.form.wl_channel.value;
var option_length = document.form.wl_channel.options.length;
if ((wmode == "2"||wmode == "3") && document.form.HT_BW.value == "1")
{inputCtrl(document.form.HT_EXTCHA, 1);
var x = document.form.HT_EXTCHA;
var length = document.form.HT_EXTCHA.options.length;
if (length > 1)
{x.selectedIndex = 1;
x.remove(x.selectedIndex);
}
if ((CurrentCh >=1) && (CurrentCh <= 4))
{x.options[0].text = 1*CurrentCh + 4;
x.options[0].value = 1;
}
else if ((CurrentCh >= 5) && (CurrentCh <= 7))
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
else if ((CurrentCh >= 8) && (CurrentCh <= 9))
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
if (option_length >=14)
{CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
}
else if (CurrentCh == 10)
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 0;
if (option_length > 14)
{CurrentCh = 1*CurrentCh;
CurrentCh += 4;
add_a_option(document.form.HT_EXTCHA, 1, CurrentCh);
if (document.form.HT_EXTCHA_old.value == 1)
document.form.HT_EXTCHA.options.selectedIndex=1;
}
}
else if (CurrentCh >= 11)
{x.options[0].text = 1*CurrentCh - 4;
x.options[0].value = 1;
}
else
{x.options[0].text = "Auto";
x.options[0].value = "1";
}
}
else
inputCtrl(document.form.HT_EXTCHA, 0);
}
*/

function wl_auth_mode_change(isload){
	var mode = document.form.wl_auth_mode.value;
	var i, cur, algos;
	
	if(mode == "radius")
		inputCtrl(document.form.wl_wep_x, 0);
	else
		inputCtrl(document.form.wl_wep_x, 1);
	
	/* enable/disable crypto algorithm */
	if(mode == "wpa" || mode == "wpa2" || mode == "psk")
		inputCtrl(document.form.wl_crypto, 1);
	else
		inputCtrl(document.form.wl_crypto, 0);
	
	/* enable/disable psk passphrase */
	if(mode == "psk")
		inputCtrl(document.form.wl_wpa_psk, 1);
	else
		inputCtrl(document.form.wl_wpa_psk, 0);

	/* update wl_crypto */
	if(mode == "psk"){
		/* Save current crypto algorithm */
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		if(isModel() == "SnapAP" || isBand() == 'b')
			algos = new Array("TKIP");
		else{
			opts = document.form.wl_auth_mode.options;
			
			if(opts[opts.selectedIndex].text == "WPA-Personal")
				algos = new Array("TKIP");
			else if(opts[opts.selectedIndex].text == "WPA2-Personal")
				algos = new Array("AES");
			else
				algos = new Array("TKIP", "AES", "TKIP+AES");
		}
		
		/* Reconstruct algorithm array from new crypto algorithms */
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	else if(mode == "wpa"){
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		opts = document.form.wl_auth_mode.options;
		if(opts[opts.selectedIndex].text == "WPA-Enterprise")
			algos = new Array("TKIP");
		else
			algos = new Array("TKIP", "AES", "TKIP+AES");
		
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	else if(mode == "wpa2"){
		for(var i = 0; i < document.form.wl_crypto.length; i++){
			if(document.form.wl_crypto[i].selected){
				cur = document.form.wl_crypto[i].value;
				break;
			}
		}
		
		algos = new Array("AES");
		
		document.form.wl_crypto.length = algos.length;
		for(var i in algos){
			document.form.wl_crypto[i] = new Option(algos[i], algos[i].toLowerCase());
			document.form.wl_crypto[i].value = algos[i].toLowerCase();
			
			if(algos[i].toLowerCase() == cur)
				document.form.wl_crypto[i].selected = true;
		}
	}
	
	change_wep_type(mode, isload);
	
	/* Save current network key index */
	for(var i = 0; i < document.form.wl_key.length; i++){
		if(document.form.wl_key[i].selected){
			cur = document.form.wl_key[i].value;
			break;
		}
	}
	
	/* Define new network key indices */
	if(mode == "wpa" || mode == "wpa2" || mode == "psk")
		algos = new Array("2", "3");
	else{
		algos = new Array("1", "2", "3", "4");
		if(!isload)
			cur = "1";
	}
	
	/* Reconstruct network key indices array from new network key indices */
	document.form.wl_key.length = algos.length;
	for(var i in algos){
		document.form.wl_key[i] = new Option(algos[i], algos[i]);
		document.form.wl_key[i].value = algos[i];
		if(algos[i] == cur)
			document.form.wl_key[i].selected = true;
	}
	
	wl_wep_change();
}

function wl_rate_change()
{
	orig = document.form.wl_rate.value;
	free_options(document.form.wl_rate);
	if (document.form.wl_gmode.value == "1")
	{
		vitems = new Array("0", "1000000", "2000000", "5500000", "6000000", "9000000", "11000000", "12000000", "18000000", "24000000", "36000000", "48000000", "54000000");
		items = new Array("Auto", "1", "2", "5.5", "6", "9", "11", "12", "18", "24", "36", "48", "54");
	}
	else if (document.form.wl_gmode.value == "4")
	{
		vitems = new Array("0", "6000000", "9000000", "12000000", "18000000", "24000000", "36000000", "48000000", "54000000");
		items = new Array("Auto", "6", "9", "12", "18", "24", "36", "48", "54");
	}
	else
	{
		vitems = new Array("0", "1000000", "2000000", "5500000", "11000000");
		items = new Array("Auto", "1", "2", "5.5", "11");
	}
	add_options_x2(document.form.wl_rate, items, vitems, orig);
}

function masq_wepkey()
{wep1 = document.form.wl_key1.value;
wep2 = document.form.wl_key2.value;
wep3 = document.form.wl_key3.value;
wep4 = document.form.wl_key4.value;
if (wep1.length == 10)
{wep = "**********";
}
else if (wep1.length == 26)
{wep = "**************************";
}
else wep = "";
document.form.wl_key1.value = wep;
document.form.wl_key2.value = wep;
document.form.wl_key3.value = wep;
document.form.wl_key4.value = wep;
}
function unmasq_wepkey()
{if (document.form.wl_key1.value.indexOf("**********") != -1)
document.form.wl_key1.value = wep1;
if (document.form.wl_key2.value.indexOf("**********") != -1)
document.form.wl_key2.value = wep2;
if (document.form.wl_key3.value.indexOf("**********") != -1)
document.form.wl_key3.value = wep3;
if (document.form.wl_key4.value.indexOf("**********") != -1)
document.form.wl_key4.value = wep4;
}

function showhide(element, sh)
{
	var status;
	if (sh == 1){
		status = "block";
	}
	else{
		status = "none"
	}
	
	if(document.getElementById){
		document.getElementById(element).style.display = status;
	}
	else if (document.all){
		document.all[element].style.display = status;
	}
	else if (document.layers){
		document.layers[element].display = status;
	}
}

/****  Lock add in 1127 from OLD UI in index.html******/
var Add_Flag = "";
var Edit_Flag = "";
var Mkdir_Flag = "";
var Share_Path = "";
function isMode()
{if (document.form.wan_nat_x.value == '1')
mode = 'Gateway';
else if (document.form.wan_route_x.value == 'IP_Routed')
mode = 'Router';
else
mode = 'AP';
return mode;
}
function isModel()
{model = 'WL600';
pid = document.form.productid.value;
if (pid.indexOf("WL520gc")!=-1 ||
pid.indexOf("WL500g-X")!=-1 ||
pid.indexOf("WL500g-E")!=-1 ||
pid.indexOf("WL550gE")!=-1 ||
pid.indexOf("WL530")!=-1) model = 'WL520gc';
else if (pid.indexOf("WL500")!=-1 ||
pid.indexOf("WL700")!=-1 ||
pid.indexOf("WL-500gP V2")!=-1 ||
pid.indexOf("WLMIMO")!=-1) model = 'WL500';
else if (pid.indexOf("WL331")!=-1) model = 'WL331';
else if (pid.indexOf("SnapAP")!=-1) model = 'SnapAP';
else if (pid.indexOf("WL300")!=-1) model = 'WL300';
else if (pid.indexOf("WL550")!=-1) model = 'WL550';
else if (pid.indexOf("WL520gu")!=-1) model = 'WL520gu';
return model;
}
function isModel2()
{model2 = 'WL600';
pid = document.form.productid.value;
if (pid.indexOf("WL530")!=-1) model2 = 'WL530';
else if (pid.indexOf("WL500g-X")!=-1 || pid.indexOf("WL500g-E")!=-1 || pid.indexOf("WL520")!=-1 || pid.indexOf("WL550gE")!=-1) model2 = 'WL520';
return model2;
}
function isModel3()
{model3 = 'WL500';
pid = document.form.productid.value;
if (pid.indexOf("WL550gE")!=-1) model3 = 'WL550gE';
return model3;
}
function isBand()
{band = 'g';
pid = document.form.productid.value;
if (pid.indexOf("WL500b")!=-1) band = 'b';
return band;
}
function isCard()
{card = 'broadcom';
pid = document.form.productid.value;
if (pid.indexOf("WL500bv2")!=-1) card = 'ralink';
return card;
}
function isFlash()
{flash = '4MB';
pid = document.form.productid.value;
if (pid.indexOf("WL331g")!=-1) flash = '2MB';
else if (pid.indexOf("WL500g.Lite")!=-1) flash = '2MB';
else if (pid.indexOf("WL500b.Lite")!=-1) flash = '2MB';
else if (pid.indexOf("WL500g-X")!=-1 || pid.indexOf("WL500g-E")!=-1 || pid.indexOf("WL520gc")!=-1 || pid.indexOf("WL550gE")!=-1) flash = '2MB';
return flash;
}

function appendChild(parent, child)
{parent[parent.length] = child
return child
}

var foldersTree = 0
var timeOutId = 0
var pageChanged = 0;
var pageChangedCount = 0;
var goquick=0;

/****  Lock add in 1127 from OLD UI in index.html******/
function is_number_sp(event, o){
	keyPressed = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (nav)
	{
		if (	(keyPressed==8)||	// backspace
			(keyPressed==35)||	// end
			(keyPressed==36)||	// home
			(keyPressed==37)||	// <-
			(keyPressed==39)||	// ->
			(keyPressed==46)	// delete
		)
			keyPressed=0;
	}

	if (keyPressed==0)
		return true;
	if (keyPressed>47 && keyPressed<58)
	{
		if (keyPressed==48 && o.length == 0) return false;
		return true;
	}
	else
	{
		return false;
	}
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
