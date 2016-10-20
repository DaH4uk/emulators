<<<<<<< HEAD

function close_all_sub(click_name)/* fold all menus, except the menu which user click */
{
var sub_list = "setup,security,admin,advanced";
var sub_array = sub_list.split(',');
for ( i=0; i< sub_array.length; i++)
{
var button_name = sub_array[i]+"_bt";
var sub_name = sub_array[i]+"_sub";
if( sub_name != click_name )
{
var div_name = top.document.getElementById(button_name);
var content_length = div_name.getElementsByTagName("span")[0].innerHTML.length;
settingClass(div_name, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="none";
}
}
}
function open_or_close_sub(name)
{
/* to fix bug 23268, when user want to unfold one menus, fold the other menus. */
var button_name= name+"_bt";
var sub_name= name+"_sub";
var open_flag= top.document.getElementById(sub_name).style.display;
close_all_sub(sub_name);/* fold all menus first, except the menu which user click*/
var button_div = top.document.getElementById(button_name);
var content_length = button_div.getElementsByTagName("span")[0].innerHTML.length;
if( open_flag == "none")
{
settingClass(button_div, content_length, "advanced_white_open_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="";
}
else
{
settingClass(button_div, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="none";
}
change_menu_height();
}
/* change the min-height of the fromframe if unfold "Advanced Setup" */
function change_menu_height()
{
var footer_div = document.getElementById("footer");
var is_double = (footer_div.className == "footer_double");
var menu_height = document.getElementById("menu").clientHeight > 410 ? document.getElementById("menu").clientHeight : 410;
//alert("isIE_or_Opera() " + " : " + isIE_or_Opera());
if(!isIE_or_Opera())
document.getElementById("middle").style.minHeight = is_double ? (menu_height + 87)+"px" : (menu_height+ 45)+"px";
else
{
var height = is_double ? document.documentElement.clientHeight - 190 : document.documentElement.clientHeight - 147;
menu_height = height > menu_height ? height : menu_height;
document.getElementById("container").style.height = is_double ? menu_height+93 : menu_height+ 50;
document.getElementById("middle").style.height = is_double ? menu_height+87 : menu_height+ 45;
document.getElementById("formframe_div").style.height = menu_height;
}
}
function change_size()
{
setFooterClass();
var footer_div = document.getElementById("footer");
var is_double = (footer_div.className == "footer_double");
if(isIE_or_Opera())
{
/* to calculate the width */
var width = document.documentElement.clientWidth - 40;
document.getElementById("top").style.width = width > 820 ? width : "820px" ;
document.getElementById("container").style.width = width > 820 ? width : "820px" ;
document.getElementById("formframe_div").style.width = width > 820 ? width - 195 : "625px";
}
document.getElementById("formframe_div").style.bottom = is_double ? "88px" : "45px";
change_menu_height();
}
/* according to the content length in a div, change the div class type
parameter: div name, div content length, class name to set, minimum length for triple class, ..
*/
function settingClass(obj, len, class_name)
{
var triple_len, double_len;
switch(arguments.length)
{
case 4://four parameter, take the last on as double_len
triple_len = 9999;
double_len = arguments[3];
break;
case 5:
triple_len = arguments[3];
double_len = arguments[4];
break;
default:
triple_len = top.region_class.adv_btn_triple;
double_len = top.region_class.adv_btn_double;
break;
}
if(len >= triple_len)
obj.className = class_name + "_triple";
else if(len >= double_len)
obj.className = class_name + "_double";
else
obj.className = class_name;
}
function subItemsClass(argv)
{
var sub_menu;
var items;
var words_length;
var i, num;
for(num=0; num<arguments.length; num++)
{
sub_menu = top.document.getElementById(arguments[num]);
items = sub_menu.getElementsByTagName("dt");
for(i=0; i<items.length; i++)
{
words_length = items[i].getElementsByTagName("span")[0].innerHTML.length;
if(words_length >= 20)
items[i].className = "long_name";
else
items[i].className = "sub_back";
}
}
}
var array_name = ["wds_items", "ap_items"];
var enable_flags = ["enabled_wds", "enable_ap_flag"];
var wds_items = ["internet", "guest", "wan", "qos", "block_site", "block_services", "schedule","email", "log", "forwarding_triggering", "dns", "static", "remote", "upnp", "traffic"];
var ap_items = ["lan", "wan", "internet", "block_site", "block_services", "schedule", "wds", "forwarding_triggering", "dns", "static", "remote"];
function enabledItemsClass()
{
var j;
var double_length = 25;
var item_group, enable_flag;
item_group = eval(array_name[0]);
enable_flag = eval("top." + enable_flags[0]);
for(j=0; j<item_group.length; j++)
{
var cur_div, content_length;
cur_div = top.document.getElementById(item_group[j]);
content_length = cur_div.getElementsByTagName("span")[0].innerHTML.length;
if(enable_flag == 1)
{
if(content_length > double_length)
cur_div.className = "long_grey";
else
cur_div.className = "sub_grey";
}
else
{
if(content_length > double_length)
cur_div.className = "long_name";
else
cur_div.className = "sub_back";
}
}
}
function menu_class_default()
{
var menu_div;
var content_length;
menu_div = top.document.getElementById("home");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(menu_div, content_length, "advanced_black_button");
menu_div = top.document.getElementById("setup_wizard");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
if( top.enabled_wds == 1 || top.enable_ap_flag == 1 )
settingClass(menu_div, content_length, "advanced_grey_button");
else
settingClass(menu_div, content_length, "advanced_black_button");
menu_div = top.document.getElementById("wps");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
if( top.enabled_wps == 1)
settingClass(menu_div, content_length, "advanced_black_button");
else
settingClass(menu_div, content_length, "advanced_grey_button");
var extensible_items = ["setup_bt", "security_bt", "admin_bt", "advanced_bt"];
var i;
for(i=0; i<extensible_items.length; i++)
{
menu_div = top.document.getElementById(extensible_items[i]);
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(menu_div, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
}
subItemsClass("setup_sub", "security_sub", "admin_sub", "advanced_sub");
enabledItemsClass();
}
function menu_color_change( change_id )
{
menu_class_default();
var current_div = top.document.getElementById(change_id);
var content_length = current_div.getElementsByTagName("span")[0].innerHTML.length;
if( change_id == "home" || change_id == "setup_wizard" || change_id == "wps" )
{
settingClass(current_div, content_length, "advanced_purple_button");
}
else
{
//the parent button class should be kept
var parent_id = top.document.getElementById(change_id).parentNode.parentNode.id;
var btn_id = parent_id.replace('sub', 'bt');
var btn_div = top.document.getElementById(btn_id);
var words_len = btn_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(btn_div, words_len, "advanced_white_open_button", top.region_class.white_triple, top.region_class.white_double);
content_length = current_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(current_div, content_length, "sub_back_purple", top.region_class.sub_triple, top.region_class.sub_double);
}
}
function click_adv_action(id)
{
if( id == "home" )
{
menu_color_change('home');
goto_formframe('RST_status.htm','advanced');
}
else if( id == "setup_wizard" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
menu_color_change('setup_wizard');
goto_formframe('WIZ_sel.htm','advanced');
}
else if( id == "wps" && top.enabled_wps == 1 && top.enabled_wds == 0 && (top.document.getElementById('wps').title == 'wps'))
{
goto_formframe('Add_WPS_Client.htm','advanced');
menu_color_change('wps');
}
/*不刷新整个页面时，由title的值判断是否可点击wps页面*/
else if( id == "wps" && (top.document.getElementById('wps').title == 'wps1'))
{
goto_formframe('Add_WPS_Client.htm','advanced');
menu_color_change('wps');
}
else if( id == "internet" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BAS_basic.htm",'advanced');//alert("enabled_wds enable_ap_flag "+enabled_wds+"\n"+enable_ap_flag);
menu_color_change('internet');
}
else if( id == "wireless" )
{
goto_formframe("WLG_wireless.htm",'advanced');
menu_color_change('wireless');
}
else if( id == "guest" && top.enabled_wds == 0 )
{
goto_formframe("WLG_wireless_guest.htm",'advanced');
menu_color_change('guest');
}
/*else if( id == "guest_a" && top.enabled_wds == 0 )
{
goto_formframe("WLG_wireless_guestA1.htm",'advanced');
menu_color_change('guest_a');
}*/
else if( id == "wan" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("WAN_wan.htm",'advanced');
menu_color_change('wan');
}
else if( id == "lan" && top.enable_ap_flag != 1 )
{
goto_formframe("LAN_lan.htm",'advanced');
menu_color_change('lan');
}
else if( id == "qos" && top.enabled_wds == 0 )
{
goto_formframe("QOS_main.htm",'advanced');
menu_color_change('qos');
}
else if( id == "parental" )
{
if(parental_ctrl_flag == '1')
open_window('http://netgear.opendns.com/');
else
open_window('http://lpc.netgear.ru/');
}
else if( id == "block_site" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BKS_keyword.htm",'advanced');
menu_color_change('block_site');
}
else if( id == "block_services" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BKS_service.htm",'advanced');
menu_color_change('block_services');
}
else if( id == "schedule" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_schedule.htm",'advanced');
menu_color_change('schedule');
}
else if( id == "email" && top.enabled_wds == 0 )
{
goto_formframe("FW_email.htm",'advanced');
menu_color_change('email');
}
else if( id == "status" )
{
goto_formframe("RST_status.htm",'advanced');
menu_color_change('status');
}
else if( id == "log" && top.enabled_wds == 0 )
{
goto_formframe("FW_log.htm",'advanced');
menu_color_change('log');
}
else if( id == "attached" )
{
goto_formframe("DEV_device.htm",'advanced');
menu_color_change('attached');
}
else if( id == "bak_set" )
{
goto_formframe("BAK_backup.htm",'advanced');
menu_color_change('bak_set');
}
else if( id == "passwd" )
{
goto_formframe("PWD_password.htm",'advanced');
menu_color_change('passwd');
}
else if( id == "upgrade" )
{
goto_formframe("UPG_upgrade.htm",'advanced');
menu_color_change('upgrade');
}
else if( id == "plc" )
{
goto_formframe("PLC_wait_scan.htm",'advanced');
menu_color_change('plc');
}
else if( id == "wladv" )
{
goto_formframe("WLG_adv.htm",'advanced');
menu_color_change('wladv');
}
else if( id == "wds" && top.enable_ap_flag != 1 )
{
goto_formframe("WLG_wds.htm",'advanced');
menu_color_change('wds');
}
else if( id == "forwarding_triggering" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_forward.htm",'advanced');
menu_color_change('forwarding_triggering');
}
else if( id == "dns" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("DNS_ddns.htm",'advanced');
menu_color_change('dns');
}
else if( id == "static" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("STR_routes.htm",'advanced');
menu_color_change('static');
}
else if( id == "remote" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_remote.htm",'advanced');
menu_color_change('remote');
}
else if( id == "usb" )
{
goto_formframe("USB_settings.htm",'advanced');
menu_color_change('usb');
}
else if( id == "upnp" && top.enabled_wds == 0 )
{
goto_formframe("UPNP_upnp.htm",'advanced');
menu_color_change('upnp');
}
else if( id == "tr069" )
{
goto_formframe("tr069.htm",'advanced');
menu_color_change('tr069');
}
else if( id == "traffic" && top.enabled_wds == 0 )
{
goto_formframe("traffic_meter.htm",'advanced');
menu_color_change('traffic');
}
change_menu_height();
}
//class: region words length
/*The code is come from region_class.js
****
*/
function class_region(btn_double, btn_triple, sub_double, sub_triple)
{
var _this = this;//save this to a private class variable to avoid some error may caused by event
_this.adv_btn_double = btn_double;
_this.adv_btn_triple = btn_triple;
_this.sub_double = sub_double;
_this.sub_triple = sub_triple;
if(arguments.length == 6)
{
_this.white_double = arguments[4];
_this.white_triple = arguments[5];
}
else
{
_this.white_double = _this.adv_btn_double;
_this.white_triple = _this.adv_btn_triple;
}
}
function initClass(region)
{
var ret_class;
switch(region)
{
//class_region(menu_double, menu_triple, sub_menu_double, sub_menu_triple, white_btns_double, white_btns_triple)
case "Czech":
ret_class = new class_region(20, 40, 22, 32);
break;
case "Danish":
ret_class = new class_region(19, 40, 25, 40);
break;
case "Greek":
ret_class = new class_region(20, 40, 20, 31);
break;
case "Finnish":
ret_class = new class_region(22, 40, 23, 35);
break;
case "French":
ret_class = new class_region(20, 40, 24, 40);
break;
case "Italian":
ret_class = new class_region(22, 40, 22, 35);
break;
case "Korean":
ret_class = new class_region(20, 40, 16, 35);
break;
case "Dutch":
ret_class = new class_region(20, 40, 23, 32);
break;
case "Norwegian":
ret_class = new class_region(23, 40, 24, 38, 22, 35);
break;
case "Polish":
ret_class = new class_region(20, 40, 23, 35);
break;
case "Portuguese":
ret_class = new class_region(18, 40, 22, 35, 17, 40);
break;
case "Russian":
ret_class = new class_region(20, 40, 22, 30);
break;
case "Slovak":
ret_class = new class_region(20, 40, 23, 34);
break;
case "Slovenian":
ret_class = new class_region(19, 40, 22, 38);
break;
case "Spanish":
ret_class = new class_region(18, 40, 22, 36);
break;
case "Swedish":
ret_class = new class_region(20, 40, 24, 35);
break;
default:
ret_class = new class_region(20, 40, 22, 35);
break;
}
return ret_class;
=======

function close_all_sub(click_name)/* fold all menus, except the menu which user click */
{
var sub_list = "setup,security,admin,advanced";
var sub_array = sub_list.split(',');
for ( i=0; i< sub_array.length; i++)
{
var button_name = sub_array[i]+"_bt";
var sub_name = sub_array[i]+"_sub";
if( sub_name != click_name )
{
var div_name = top.document.getElementById(button_name);
var content_length = div_name.getElementsByTagName("span")[0].innerHTML.length;
settingClass(div_name, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="none";
}
}
}
function open_or_close_sub(name)
{
/* to fix bug 23268, when user want to unfold one menus, fold the other menus. */
var button_name= name+"_bt";
var sub_name= name+"_sub";
var open_flag= top.document.getElementById(sub_name).style.display;
close_all_sub(sub_name);/* fold all menus first, except the menu which user click*/
var button_div = top.document.getElementById(button_name);
var content_length = button_div.getElementsByTagName("span")[0].innerHTML.length;
if( open_flag == "none")
{
settingClass(button_div, content_length, "advanced_white_open_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="";
}
else
{
settingClass(button_div, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
top.document.getElementById(sub_name).style.display="none";
}
change_menu_height();
}
/* change the min-height of the fromframe if unfold "Advanced Setup" */
function change_menu_height()
{
var footer_div = document.getElementById("footer");
var is_double = (footer_div.className == "footer_double");
var menu_height = document.getElementById("menu").clientHeight > 410 ? document.getElementById("menu").clientHeight : 410;
//alert("isIE_or_Opera() " + " : " + isIE_or_Opera());
if(!isIE_or_Opera())
document.getElementById("middle").style.minHeight = is_double ? (menu_height + 87)+"px" : (menu_height+ 45)+"px";
else
{
var height = is_double ? document.documentElement.clientHeight - 190 : document.documentElement.clientHeight - 147;
menu_height = height > menu_height ? height : menu_height;
document.getElementById("container").style.height = is_double ? menu_height+93 : menu_height+ 50;
document.getElementById("middle").style.height = is_double ? menu_height+87 : menu_height+ 45;
document.getElementById("formframe_div").style.height = menu_height;
}
}
function change_size()
{
setFooterClass();
var footer_div = document.getElementById("footer");
var is_double = (footer_div.className == "footer_double");
if(isIE_or_Opera())
{
/* to calculate the width */
var width = document.documentElement.clientWidth - 40;
document.getElementById("top").style.width = width > 820 ? width : "820px" ;
document.getElementById("container").style.width = width > 820 ? width : "820px" ;
document.getElementById("formframe_div").style.width = width > 820 ? width - 195 : "625px";
}
document.getElementById("formframe_div").style.bottom = is_double ? "88px" : "45px";
change_menu_height();
}
/* according to the content length in a div, change the div class type
parameter: div name, div content length, class name to set, minimum length for triple class, ..
*/
function settingClass(obj, len, class_name)
{
var triple_len, double_len;
switch(arguments.length)
{
case 4://four parameter, take the last on as double_len
triple_len = 9999;
double_len = arguments[3];
break;
case 5:
triple_len = arguments[3];
double_len = arguments[4];
break;
default:
triple_len = top.region_class.adv_btn_triple;
double_len = top.region_class.adv_btn_double;
break;
}
if(len >= triple_len)
obj.className = class_name + "_triple";
else if(len >= double_len)
obj.className = class_name + "_double";
else
obj.className = class_name;
}
function subItemsClass(argv)
{
var sub_menu;
var items;
var words_length;
var i, num;
for(num=0; num<arguments.length; num++)
{
sub_menu = top.document.getElementById(arguments[num]);
items = sub_menu.getElementsByTagName("dt");
for(i=0; i<items.length; i++)
{
words_length = items[i].getElementsByTagName("span")[0].innerHTML.length;
if(words_length >= 20)
items[i].className = "long_name";
else
items[i].className = "sub_back";
}
}
}
var array_name = ["wds_items", "ap_items"];
var enable_flags = ["enabled_wds", "enable_ap_flag"];
var wds_items = ["internet", "guest", "wan", "qos", "block_site", "block_services", "schedule","email", "log", "forwarding_triggering", "dns", "static", "remote", "upnp", "traffic"];
var ap_items = ["lan", "wan", "internet", "block_site", "block_services", "schedule", "wds", "forwarding_triggering", "dns", "static", "remote"];
function enabledItemsClass()
{
var j;
var double_length = 25;
var item_group, enable_flag;
item_group = eval(array_name[0]);
enable_flag = eval("top." + enable_flags[0]);
for(j=0; j<item_group.length; j++)
{
var cur_div, content_length;
cur_div = top.document.getElementById(item_group[j]);
content_length = cur_div.getElementsByTagName("span")[0].innerHTML.length;
if(enable_flag == 1)
{
if(content_length > double_length)
cur_div.className = "long_grey";
else
cur_div.className = "sub_grey";
}
else
{
if(content_length > double_length)
cur_div.className = "long_name";
else
cur_div.className = "sub_back";
}
}
}
function menu_class_default()
{
var menu_div;
var content_length;
menu_div = top.document.getElementById("home");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(menu_div, content_length, "advanced_black_button");
menu_div = top.document.getElementById("setup_wizard");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
if( top.enabled_wds == 1 || top.enable_ap_flag == 1 )
settingClass(menu_div, content_length, "advanced_grey_button");
else
settingClass(menu_div, content_length, "advanced_black_button");
menu_div = top.document.getElementById("wps");
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
if( top.enabled_wps == 1)
settingClass(menu_div, content_length, "advanced_black_button");
else
settingClass(menu_div, content_length, "advanced_grey_button");
var extensible_items = ["setup_bt", "security_bt", "admin_bt", "advanced_bt"];
var i;
for(i=0; i<extensible_items.length; i++)
{
menu_div = top.document.getElementById(extensible_items[i]);
content_length = menu_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(menu_div, content_length, "advanced_white_close_button", top.region_class.white_triple, top.region_class.white_double);
}
subItemsClass("setup_sub", "security_sub", "admin_sub", "advanced_sub");
enabledItemsClass();
}
function menu_color_change( change_id )
{
menu_class_default();
var current_div = top.document.getElementById(change_id);
var content_length = current_div.getElementsByTagName("span")[0].innerHTML.length;
if( change_id == "home" || change_id == "setup_wizard" || change_id == "wps" )
{
settingClass(current_div, content_length, "advanced_purple_button");
}
else
{
//the parent button class should be kept
var parent_id = top.document.getElementById(change_id).parentNode.parentNode.id;
var btn_id = parent_id.replace('sub', 'bt');
var btn_div = top.document.getElementById(btn_id);
var words_len = btn_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(btn_div, words_len, "advanced_white_open_button", top.region_class.white_triple, top.region_class.white_double);
content_length = current_div.getElementsByTagName("span")[0].innerHTML.length;
settingClass(current_div, content_length, "sub_back_purple", top.region_class.sub_triple, top.region_class.sub_double);
}
}
function click_adv_action(id)
{
if( id == "home" )
{
menu_color_change('home');
goto_formframe('RST_status.htm','advanced');
}
else if( id == "setup_wizard" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
menu_color_change('setup_wizard');
goto_formframe('WIZ_sel.htm','advanced');
}
else if( id == "wps" && top.enabled_wps == 1 && top.enabled_wds == 0 && (top.document.getElementById('wps').title == 'wps'))
{
goto_formframe('Add_WPS_Client.htm','advanced');
menu_color_change('wps');
}
/*不刷新整个页面时，由title的值判断是否可点击wps页面*/
else if( id == "wps" && (top.document.getElementById('wps').title == 'wps1'))
{
goto_formframe('Add_WPS_Client.htm','advanced');
menu_color_change('wps');
}
else if( id == "internet" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BAS_basic.htm",'advanced');//alert("enabled_wds enable_ap_flag "+enabled_wds+"\n"+enable_ap_flag);
menu_color_change('internet');
}
else if( id == "wireless" )
{
goto_formframe("WLG_wireless.htm",'advanced');
menu_color_change('wireless');
}
else if( id == "guest" && top.enabled_wds == 0 )
{
goto_formframe("WLG_wireless_guest.htm",'advanced');
menu_color_change('guest');
}
/*else if( id == "guest_a" && top.enabled_wds == 0 )
{
goto_formframe("WLG_wireless_guestA1.htm",'advanced');
menu_color_change('guest_a');
}*/
else if( id == "wan" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("WAN_wan.htm",'advanced');
menu_color_change('wan');
}
else if( id == "lan" && top.enable_ap_flag != 1 )
{
goto_formframe("LAN_lan.htm",'advanced');
menu_color_change('lan');
}
else if( id == "qos" && top.enabled_wds == 0 )
{
goto_formframe("QOS_main.htm",'advanced');
menu_color_change('qos');
}
else if( id == "parental" )
{
if(parental_ctrl_flag == '1')
open_window('http://netgear.opendns.com/');
else
open_window('http://lpc.netgear.ru/');
}
else if( id == "block_site" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BKS_keyword.htm",'advanced');
menu_color_change('block_site');
}
else if( id == "block_services" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("BKS_service.htm",'advanced');
menu_color_change('block_services');
}
else if( id == "schedule" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_schedule.htm",'advanced');
menu_color_change('schedule');
}
else if( id == "email" && top.enabled_wds == 0 )
{
goto_formframe("FW_email.htm",'advanced');
menu_color_change('email');
}
else if( id == "status" )
{
goto_formframe("RST_status.htm",'advanced');
menu_color_change('status');
}
else if( id == "log" && top.enabled_wds == 0 )
{
goto_formframe("FW_log.htm",'advanced');
menu_color_change('log');
}
else if( id == "attached" )
{
goto_formframe("DEV_device.htm",'advanced');
menu_color_change('attached');
}
else if( id == "bak_set" )
{
goto_formframe("BAK_backup.htm",'advanced');
menu_color_change('bak_set');
}
else if( id == "passwd" )
{
goto_formframe("PWD_password.htm",'advanced');
menu_color_change('passwd');
}
else if( id == "upgrade" )
{
goto_formframe("UPG_upgrade.htm",'advanced');
menu_color_change('upgrade');
}
else if( id == "plc" )
{
goto_formframe("PLC_wait_scan.htm",'advanced');
menu_color_change('plc');
}
else if( id == "wladv" )
{
goto_formframe("WLG_adv.htm",'advanced');
menu_color_change('wladv');
}
else if( id == "wds" && top.enable_ap_flag != 1 )
{
goto_formframe("WLG_wds.htm",'advanced');
menu_color_change('wds');
}
else if( id == "forwarding_triggering" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_forward.htm",'advanced');
menu_color_change('forwarding_triggering');
}
else if( id == "dns" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("DNS_ddns.htm",'advanced');
menu_color_change('dns');
}
else if( id == "static" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("STR_routes.htm",'advanced');
menu_color_change('static');
}
else if( id == "remote" && top.enabled_wds == 0 && top.enable_ap_flag != 1 )
{
goto_formframe("FW_remote.htm",'advanced');
menu_color_change('remote');
}
else if( id == "usb" )
{
goto_formframe("USB_settings.htm",'advanced');
menu_color_change('usb');
}
else if( id == "upnp" && top.enabled_wds == 0 )
{
goto_formframe("UPNP_upnp.htm",'advanced');
menu_color_change('upnp');
}
else if( id == "tr069" )
{
goto_formframe("tr069.htm",'advanced');
menu_color_change('tr069');
}
else if( id == "traffic" && top.enabled_wds == 0 )
{
goto_formframe("traffic_meter.htm",'advanced');
menu_color_change('traffic');
}
change_menu_height();
}
//class: region words length
/*The code is come from region_class.js
****
*/
function class_region(btn_double, btn_triple, sub_double, sub_triple)
{
var _this = this;//save this to a private class variable to avoid some error may caused by event
_this.adv_btn_double = btn_double;
_this.adv_btn_triple = btn_triple;
_this.sub_double = sub_double;
_this.sub_triple = sub_triple;
if(arguments.length == 6)
{
_this.white_double = arguments[4];
_this.white_triple = arguments[5];
}
else
{
_this.white_double = _this.adv_btn_double;
_this.white_triple = _this.adv_btn_triple;
}
}
function initClass(region)
{
var ret_class;
switch(region)
{
//class_region(menu_double, menu_triple, sub_menu_double, sub_menu_triple, white_btns_double, white_btns_triple)
case "Czech":
ret_class = new class_region(20, 40, 22, 32);
break;
case "Danish":
ret_class = new class_region(19, 40, 25, 40);
break;
case "Greek":
ret_class = new class_region(20, 40, 20, 31);
break;
case "Finnish":
ret_class = new class_region(22, 40, 23, 35);
break;
case "French":
ret_class = new class_region(20, 40, 24, 40);
break;
case "Italian":
ret_class = new class_region(22, 40, 22, 35);
break;
case "Korean":
ret_class = new class_region(20, 40, 16, 35);
break;
case "Dutch":
ret_class = new class_region(20, 40, 23, 32);
break;
case "Norwegian":
ret_class = new class_region(23, 40, 24, 38, 22, 35);
break;
case "Polish":
ret_class = new class_region(20, 40, 23, 35);
break;
case "Portuguese":
ret_class = new class_region(18, 40, 22, 35, 17, 40);
break;
case "Russian":
ret_class = new class_region(20, 40, 22, 30);
break;
case "Slovak":
ret_class = new class_region(20, 40, 23, 34);
break;
case "Slovenian":
ret_class = new class_region(19, 40, 22, 38);
break;
case "Spanish":
ret_class = new class_region(18, 40, 22, 36);
break;
case "Swedish":
ret_class = new class_region(20, 40, 24, 35);
break;
default:
ret_class = new class_region(20, 40, 22, 35);
break;
}
return ret_class;
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
}