function chgCh(from)
{ 
 if ( from == 2 )
 {
 var cf = document.forms[0];
 //cf.only_mode.value = "1";
 //cf.submit();
setChannel();
 }
 else
 {
 // setwlan_mode(); // modify by Dungjiun, for JWNR2000
 setChannel();
 }
}
function setwlan_mode()
{
var cf = document.forms[0];
var index = cf.wlan_coun.selectedIndex;
var currentMode = cf.wlan_mode.selectedIndex;
/*if (index==4 || index==15)
 {
cf.wlan_mode.options.length = 2;
cf.wlan_mode.options[0].text =wlan_mode_54;
cf.wlan_mode.options[1].text =wlan_mode_145;
cf.wlan_mode.options[0].value = "1";
cf.wlan_mode.options[1].value = "2";
if (currentMode <= 1)
cf.wlan_mode.selectedIndex = currentMode;
else
cf.wlan_mode.selectedIndex = 1;
} 
*/
//else {
cf.wlan_mode.options.length = 3;
cf.wlan_mode.options[0].text =wlan_mode_54;
cf.wlan_mode.options[1].text =wlan_mode_145;
cf.wlan_mode.options[2].text =wlan_mode_300;
cf.wlan_mode.options[0].value = "1";
cf.wlan_mode.options[1].value = "2";
cf.wlan_mode.options[2].value = "3";
cf.wlan_mode.selectedIndex = currentMode;
//}
return;
}
var pre_chIndex;
function restore()
{
var cf = document.forms[0];
var chIndex = cf.wlan_chan.selectedIndex;
if (cf.wlan_chan.options[chIndex].disabled) {
cf.wlan_chan.selectedIndex = pre_chIndex;
}
else pre_chIndex = chIndex;
}
function setChannel(wds)
{
var cf = document.forms[0];
var index = cf.wlan_coun.selectedIndex;
var chIndex = cf.wlan_chan.selectedIndex;
pre_chIndex = chIndex;
 cf.wlan_chan.options.length = FinishChannel[index] - StartChannel[index] + 2;

cf.wlan_chan.options[0].text =wlan_chan_auto;
cf.wlan_chan.options[0].value = 0;
if (wds == 1) {
cf.wlan_chan.options[0].disabled = true;
cf.wlan_chan.options[0].style.color = '#CCC';
}
else{
cf.wlan_chan.options[0].disabled = false;
}
 setwlan_mode();
for (var i = StartChannel[index]; i <= FinishChannel[index]; i++) {

cf.wlan_chan.options[i - StartChannel[index] + 1].value = i;
cf.wlan_chan.options[i - StartChannel[index] + 1].text = (i < 10)? "0" + i : i;
}
cf.wlan_chan.selectedIndex = ((chIndex > -1) && (chIndex < cf.wlan_chan.options.length)) ? chIndex : 0 ;
}
function check_wlan()
{
var cf=document.forms[0];
 var ssid = document.forms[0].wlan_ssid.value;
 var len = ssid.length;
 var space_flag=0
 var last=ssid.charAt(len-1);
if(ssid == "")
 {
 alert(ssid_null);
 return false;
 }
 
 if(last == " ")
 { 
 alert(ssid_space);
 return false;
 
 }
 if(ssid==ssid_2 || ssid==ssid_3 || ssid==ssid_4 || ssid==ssid_5)
 { alert(samename);
 return false;
 }
/* if(ssid.toLowerCase() == "any" || ssid.toLowerCase() == "default")
 {
 alert(ssid + ssid_not_allowed);
 return false;
 }
*/ 
for(i=0;i<ssid.length;i++)
 {
 if(isValidChar_space(ssid.charCodeAt(i))==false)
 {
 alert(ssid + ssid_not_allowed);
 return false;
 }
 }
 for(i=0;i<ssid.length;i++)
 {
 if(ssid.charCodeAt(i)!=32)
 space_flag++;
 }
if(space_flag==0)
{
alert(ssid_null);
 return false;
}
if(cf.wlan_coun.selectedIndex == 0)
{
alert(coun_select);
return false;
}
if(cf.wlan_coun.selectedIndex == 0)
{
cf.wlan_chan.options[0].value = 0;
}
if ( wds_endis_fun == 1 )
{
if ( cf.wlan_chan.selectedIndex == 0 )
{
alert(wds_not_allow_auto_channel);
return false;
}
}
if(cf.sec_type[1].checked == true)
{
if( checkwep(cf,0)== false)
return false;
cf.hidden_sec_type.value=2;
}
else if(cf.sec_type[2].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=3;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
else if(cf.sec_type[3].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=4;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
else if(cf.sec_type[4].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=5;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
/*else if(cf.sec_type[5].checked == true)
{
if(!confirm(w8021x_confirmation))
return false;
cf.hidden_sec_type.value=6;
cf.radius_ip.value=cf.sec_1x_ip1.value+'.'+cf.sec_1x_ip2.value+'.'+cf.sec_1x_ip3.value+'.'+cf.sec_1x_ip4.value;
if( checkipaddr(cf.radius_ip.value)== false )
{
alert(invalid_ip);
return false;
}
if( isSameIp(cf.radius_ip.value,cf.lan_ip.value)==true )
{
alert(same_lan_radius_ip);
return false;
}
}*/
else
cf.hidden_sec_type.value=1;
/*if ( cf.wlan_mode.selectedIndex == 2 )
{
cf.hidden_wlan_mode.value = cf.wlan_width.value;
}
else*/
cf.hidden_wlan_mode.value = cf.wlan_mode.value;
//if ( (ssid != old_ssid) || (cf.hidden_sec_type.value != old_sectype) )
//cf.wps_change_flag.value = 5;
return true;
}
