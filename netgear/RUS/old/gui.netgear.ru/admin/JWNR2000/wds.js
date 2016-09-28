function click_endis_wds()
{
var cf=document.forms[0];
 var dflag;
 dflag=(!(cf.enable_wds_fun.checked));
 setDisabled ( dflag, cf.wds_repeater_basic[0], cf.disable_ip_client, cf.re_ip1,cf.re_ip2,cf.re_ip3,cf.re_ip4, cf.mac_addr,cf.wds_repeater_basic[1], cf.mac1_addr,cf.mac2_addr,cf.mac3_addr,cf.mac4_addr);
if(cf.enable_wds_fun.checked)
click_repeater_basic();
}
function click_repeater_basic()
{
var cf=document.forms[0];
 var aflag;
var bflag;
aflag=(!(cf.wds_repeater_basic[0].checked));
bflag=(!(cf.wds_repeater_basic[1].checked));
setDisabled ( aflag, cf.re_ip1,cf.re_ip2,cf.re_ip3,cf.re_ip4, cf.mac_addr);
setDisabled ( bflag, cf.mac1_addr, cf.mac2_addr,cf.mac3_addr,cf.mac4_addr);
}
function check_wds (cf)
{
var count_mac=0;
cf.change_ip_flag.value=0;
if(cf.disable_ip_client.checked == true)
 cf.wds_endis_ip_client.value=1;
else
 cf.wds_endis_ip_client.value=0;

if(cf.enable_wds_fun.checked)
{
cf.wds_endis_fun.value=1;
if(cf.wds_repeater_basic[0].checked == true)
{
//////start of 0,00 in ipaddr , 007->7
if(cf.re_ip1.value.length==3 && cf.re_ip1.value < 100)
{
if(cf.re_ip1.value.charAt(0)==0 && cf.re_ip1.value.charAt(1)!=0)
 cf.re_ip1.value=cf.re_ip1.value.charAt(1)+cf.re_ip1.value.charAt(2);
else if(cf.re_ip1.value.charAt(0)==0 && cf.re_ip1.value.charAt(1)==0)
 cf.re_ip1.value=cf.re_ip1.value.charAt(2);
}
 else if(cf.re_ip1.value.length==2 && cf.re_ip1.value < 10)
 {
 cf.re_ip1.value=cf.re_ip1.value.charAt(1); 
 }
 if(cf.re_ip2.value.length==3 && cf.re_ip2.value < 100)
{
if(cf.re_ip2.value.charAt(0)==0 && cf.re_ip2.value.charAt(1)!=0)
 cf.re_ip2.value=cf.re_ip2.value.charAt(1)+cf.re_ip2.value.charAt(2);
else if(cf.re_ip2.value.charAt(0)==0 && cf.re_ip2.value.charAt(1)==0)
 cf.re_ip2.value=cf.re_ip2.value.charAt(2);
}
 else if(cf.re_ip2.value.length==2 && cf.re_ip2.value < 10)
 {
 cf.re_ip2.value=cf.re_ip2.value.charAt(1); 
 }
 if(cf.re_ip3.value.length==3 && cf.re_ip3.value < 100)
{
if(cf.re_ip3.value.charAt(0)==0 && cf.re_ip3.value.charAt(1)!=0)
 cf.re_ip3.value=cf.re_ip3.value.charAt(1)+cf.re_ip3.value.charAt(2);
else if(cf.re_ip3.value.charAt(0)==0 && cf.re_ip3.value.charAt(1)==0)
 cf.re_ip3.value=cf.re_ip3.value.charAt(2);
}
 else if(cf.re_ip3.value.length==2 && cf.re_ip3.value < 10)
 {
 cf.re_ip3.value=cf.re_ip3.value.charAt(1); 
 }
 if(cf.re_ip4.value.length==3 && cf.re_ip4.value < 100)
{
if(cf.re_ip4.value.charAt(0)==0 && cf.re_ip4.value.charAt(1)!=0)
 cf.re_ip4.value=cf.re_ip4.value.charAt(1)+cf.re_ip4.value.charAt(2);
else if(cf.re_ip4.value.charAt(0)==0 && cf.re_ip4.value.charAt(1)==0)
 cf.re_ip4.value=cf.re_ip4.value.charAt(2);
}
 else if(cf.re_ip4.value.length==2 && cf.re_ip4.value < 10)
 {
 cf.re_ip4.value=cf.re_ip4.value.charAt(1); 
 }
//////end 

cf.repeater_ip.value=cf.re_ip1.value+'.'+cf.re_ip2.value+'.'+cf.re_ip3.value+'.'+cf.re_ip4.value;
if( checkipaddr(cf.repeater_ip.value)== false )
{
alert(invalid_wds_ip);
return false;
}
if (old_wds_endis_fun == 1 && old_wds_repeater_basic == 0)
{
if(isSameIp(old_repeater_ip,cf.repeater_ip.value) == false)
cf.change_ip_flag.value=1;
else
cf.change_ip_flag.value=0;
}
else
{
if(isSameIp(old_lanip,cf.repeater_ip.value) == false)
cf.change_ip_flag.value=1;
else
cf.change_ip_flag.value=0;
}
var the_mac= cf.mac_addr.value;
var mac, the_mac;
mac = cf.mac_addr.value;
if(mac.indexOf(":") == -1 && mac.length == "12")
{
the_mac = mac.substr(0,2) + ":"
 + mac.substr(2,2) + ":"
 + mac.substr(4,2) + ":"
 + mac.substr(6,2) + ":"
 + mac.substr(8,2) + ":"
 + mac.substr(10,2);
}
else the_mac = cf.mac_addr.value;
if(maccheck_wds(the_mac) == 1 )
{
alert(invalid_mac_basic_station);
return false;
}
else if(maccheck_wds(the_mac) == 2)
{
alert(mac_basic_station_null);
return false;
}
else
 cf.basic_station_mac.value = the_mac;

}
else if(cf.wds_repeater_basic[1].checked == true)
{
if(model == "JWNB2100-1ZGNLS")
{
  if(cf.disable_mac_client.checked == true)
 cf.wds_endis_mac_client.value=1;
 else
 cf.wds_endis_mac_client.value=0;
}
var mac1, the_mac1;
mac1 = cf.mac1_addr.value;
if(mac1.indexOf(":") == -1 && mac1.length == "12")
{
the_mac1 = mac1.substr(0,2) + ":"
 + mac1.substr(2,2) + ":"
 + mac1.substr(4,2) + ":"
 + mac1.substr(6,2) + ":"
 + mac1.substr(8,2) + ":"
 + mac1.substr(10,2);
}
else the_mac1 = cf.mac1_addr.value;
if(maccheck_wds(the_mac1) == 1)
{
alert(invalid_mac1);
return false;
}
else if(maccheck_wds(the_mac1) == 2)
{
cf.repeater_mac1.value = "";
count_mac++;
}
else
cf.repeater_mac1.value = the_mac1;
var mac2, the_mac2;
mac2 = cf.mac2_addr.value;
if(mac2.indexOf(":") == -1 && mac2.length == "12")
{
the_mac2 = mac2.substr(0,2) + ":"
 + mac2.substr(2,2) + ":"
 + mac2.substr(4,2) + ":"
 + mac2.substr(6,2) + ":"
 + mac2.substr(8,2) + ":"
 + mac2.substr(10,2);
}
else the_mac2 = cf.mac2_addr.value;
if(maccheck_wds(the_mac2) == 1)
{
alert(invalid_mac2);
return false;
}
else if(maccheck_wds(the_mac2) == 2)
{
cf.repeater_mac2.value = "";
count_mac++;
}
else
cf.repeater_mac2.value = the_mac2;
var mac3, the_mac3;
mac3 = cf.mac3_addr.value;
if(mac3.indexOf(":") == -1 && mac3.length == "12")
{
the_mac3 = mac3.substr(0,2) + ":"
 + mac3.substr(2,2) + ":"
 + mac3.substr(4,2) + ":"
 + mac3.substr(6,2) + ":"
 + mac3.substr(8,2) + ":"
 + mac3.substr(10,2);
}
else the_mac3 = cf.mac3_addr.value;
if(maccheck_wds(the_mac3) == 1)
{
alert(invalid_mac3);
return false;
}
else if(maccheck_wds(the_mac3) == 2)
{
cf.repeater_mac3.value = "";
count_mac++;
}
else
cf.repeater_mac3.value = the_mac3;

var mac4, the_mac4;
mac4 = cf.mac4_addr.value;
if(mac4.indexOf(":") == -1 && mac4.length == "12")
{
the_mac4 = mac4.substr(0,2) + ":"
 + mac4.substr(2,2) + ":"
 + mac4.substr(4,2) + ":"
 + mac4.substr(6,2) + ":"
 + mac4.substr(8,2) + ":"
 + mac4.substr(10,2);
}
else the_mac4 = cf.mac4_addr.value;
if(maccheck_wds(the_mac4) == 1)
{
alert(invalid_mac4);
return false;
}
else if(maccheck_wds(the_mac4) == 2)
{
cf.repeater_mac4.value = "";
count_mac++;
}
else
cf.repeater_mac4.value = the_mac4;
if(count_mac==4)
{
alert(all_mac_null);
return false;
}
if((the_mac1.toUpperCase()==the_mac2.toUpperCase() && the_mac1!="") || (the_mac1.toUpperCase()==the_mac3.toUpperCase() && the_mac1!="")||(the_mac1.toUpperCase()==the_mac4.toUpperCase() && the_mac1!="")||(the_mac2.toUpperCase()==the_mac3.toUpperCase()&&the_mac2!="")||(the_mac2.toUpperCase()==the_mac4.toUpperCase()&&the_mac2!="")||(the_mac3.toUpperCase()==the_mac4.toUpperCase()&&the_mac3!=""))
{
 alert(mac_dup);
return false;
}
}
if ( old_wds_endis_fun == '1' && old_wds_repeater_basic == '0' && endis_wl_radio == '1' )
 top.contents.location.href="menu_no_link_wds.html";
else
top.contents.location.href="menu_no_link.html";
cf.submit();
}
else
{
cf.wds_endis_fun.value=0;
if(old_wds_endis_fun==0)
cf.change_ip_flag.value=0;
else
cf.change_ip_flag.value=1;
if ( old_wds_endis_fun == '1' && old_wds_repeater_basic == '0' && endis_wl_radio == '1' )
 top.contents.location.href="menu_no_link_wds.html";
else
top.contents.location.href="menu_no_link.html";
cf.submit();
}
}
function wdsWaring()
{
var cf=document.forms[0];

if(security_mode=="3" || security_mode=="4" || security_mode == "5")
{
alert(wds_not_wpa)
location.href="wlan.html"
}
if (wl_channel=="0") 
{
alert(wds_auto_channel)
location.href="wlan.html"
}
}
