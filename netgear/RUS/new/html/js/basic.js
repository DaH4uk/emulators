function change_size()
{
setFooterClass();
var footer_div = document.getElementById("footer");
var is_double = ( footer_div.className == "footer_double") ;
if(isIE_or_Opera())
{
var height = document.documentElement.clientHeight - 97;
if( (height > 460 && !is_double) || (height > 503 && is_double) )
{
document.getElementById("container").style.height = height;
document.getElementById("middle").style.height = height-5;
document.getElementById("menu").style.height = is_double ? height-93 : height-50;
document.getElementById("formframe_div").style.height = is_double ? height-93 : height-50;
}
else
{
document.getElementById("container").style.height = is_double ? "503px" : "460px";
document.getElementById("middle").style.height = is_double ? "498px" : "455px";
document.getElementById("menu").style.height = "410px";
document.getElementById("formframe_div").style.height = "410px";
}
/* calculate the width */
var width = document.documentElement.clientWidth - 40;
document.getElementById("top").style.width = width > 820 ? width : "820px" ;
document.getElementById("container").style.width = width > 820 ? width : "820px" ;
document.getElementById("formframe_div").style.width = width > 820 ? width - 195 : "625px";
}
document.getElementById("middle").style.minHeight = is_double ? "498px" : "455px";
document.getElementById("formframe_div").style.bottom = is_double ? "88px" : "45px";
}
function basic_menu_class_default()
{
var menu_div = top.document.getElementById("menu");
var menu_btns = menu_div.getElementsByTagName("div");
var max_len = 20;
if(top.gui_region == "French" || top.gui_region == "Italian")////special handling for FR and IT
max_len = 21;
var i;
for(i=0; i<menu_btns.length; i++)
{
var words_len = menu_btns[i].getElementsByTagName("span")[0].innerHTML.length;
if(words_len > max_len)
menu_btns[i].className = "basic_button_big";
else
menu_btns[i].className = "basic_button";
}
if(top.enabled_wds==1 || top.enable_ap_flag== 1)
{
var internet_div = top.document.getElementById("internet");
internet_div.className = internet_div.className + "_grey";
}
if(top.enabled_wds == 1)
{
var wds_div = top.document.getElementById("guest");
wds_div.className = wds_div.className + "_grey";
}
}
function basic_menu_color_change( change_id )
{
basic_menu_class_default();
var clicked_item = top.document.getElementById(change_id);
clicked_item.className = clicked_item.className + "_purple";
}
function click_action(id)
{
if( id == "home")
{
basic_menu_color_change('home');
goto_formframe('basic_home.htm','basic');
}
else if( id == "internet")
{
basic_menu_color_change('internet');
goto_formframe("BAS_basic.htm",'basic');
}
else if( id == "wireless" )
{
basic_menu_color_change('wireless');
if( W_RadioEnable == '1')
goto_formframe('WLG_wireless.htm','basic');
else
goto_formframe('WLG_adv.htm','basic');
}
else if( id == "attached" )
{
basic_menu_color_change('attached');
goto_formframe('DEV_device.htm','basic');
}
else if( id == "parental" )
{
basic_menu_color_change('parental');
if( parental_ctrl_flag == '1' ) 
open_window('http://netgear.opendns.com/');
else 
open_window('#');
}
else if( id == "guest" )//&& top.enabled_wds == 0
{
basic_menu_color_change('guest');
goto_formframe('WLG_wireless_guest.htm','basic');
}
else if( id == "turbo" )//&& top.enabled_wds == 0
{
basic_menu_color_change('turbo');
goto_formframe('TVD_turbovideo.htm','basic');
}
else if( id == "no_internet" )
{
basic_menu_color_change('internet');
goto_formframe('WIZ_cfm.htm','basic');
}
}
function setIconClass(id)
{
var words_div = document.getElementById(id);
//alert(document.getElementById(id2).innerHTML.length);
//alert(document.getElementById(id3).innerHTML.length);
//alert("NIET INGESCHAKELD".length)
//var words_len = document.getElementById(id2).innerHTML.length + document.getElementById(id3).innerHTML.length;
var words_len = words_div.getElementsByTagName("span")[0].innerHTML.length + words_div.getElementsByTagName("span")[1].innerHTML.length;
//alert(words_len);
if( words_len >= 35 )
words_div.className = "icon_status_smallFonts";
else if(words_len >= 24)
words_div.className = "icon_status_double";
else if( gui_region == "Russian" && words_len >= 20)
words_div.className = "icon_status_double";
}
function setIconClass_noDouble(id)
{
var words_div = document.getElementById(id);
// var words_len = words.length;
var words_len = words_div.getElementsByTagName("span")[1].innerHTML.length + words_div.getElementsByTagName("b")[1].innerHTML.length;
if(words_len >= 25)
words_div.className = "icon_status_smallFonts";
else if( gui_region == "Russian" && words_len >= 20)
words_div.className = "icon_status_smallFonts";
}
