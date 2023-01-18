function check_guest()
{
var cf=document.forms[0];
 var ssid = document.forms[0].guest_name.value;
 var space_flag=0
 var len = ssid.length;
 var last=ssid.charAt(len-1);
if(ssid == "")
 {
 alert(ssid_null);
 return false;
 }
 if(cf.ssidSelect[0].checked == 1)
 {
 if(ssid==ssid_1 || ssid==ssid_3 || ssid==ssid_4 || ssid==ssid_5)
 { alert(samename);
  return false;
 }
 }
 if(cf.ssidSelect[1].checked == 1)
 {
 if(ssid==ssid_1 || ssid==ssid_2 || ssid==ssid_4 || ssid==ssid_5)
 { alert(samename);
  return false;
 }
 }
 if(cf.ssidSelect[2].checked == 1)
 {
 if(ssid==ssid_1 || ssid==ssid_2 || ssid==ssid_3 || ssid==ssid_5)
 { alert(samename);
  return false;
 }
 }
 if(cf.ssidSelect[3].checked == 1)
 {
 if(ssid==ssid_1 || ssid==ssid_2 || ssid==ssid_3 || ssid==ssid_4)
 { alert(samename);
  return false;
 }
 }
 
 
for(i=0;i<ssid.length;i++)
 {
 if(isValidChar_space(ssid.charCodeAt(i))==false)
 {
 alert(ssid + ssid_not_allowed);
 return false;
 }
 }
 
 if(last == " ")
 { 
 alert(ssid_space);
 return false;
 
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
if(cf.enable_guest.checked == true)
cf.enable_guest_value.value="1";
else
cf.enable_guest_value.value="0";
if(cf.enable_broad.checked == true)
cf.enable_broad_value.value="1";
else
cf.enable_broad_value.value="0";
if(cf.allow_access.checked == true)
cf.allow_access_value.value="1";
else
cf.allow_access_value.value="0";
if(cf.security_type[1].checked == true)
{
if( checkwep(cf,1)== false)
return false;
cf.hidden_sec_type.value=2;
}
else if(cf.security_type[2].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=3;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
else if(cf.security_type[3].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=4;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
else if(cf.security_type[4].checked == true)
{
if( checkpsk(cf)== false)
return false;
cf.hidden_sec_type.value=5;
cf.hidden_wpa_psk.value = cf.sec_wpaphrase.value.replace(/\ /g, "&nbsp;");
}
else
cf.hidden_sec_type.value=1;
if ( (ssid != old_ssid2) || (cf.hidden_sec_type.value != old_sectype2) )
cf.wps_change_flag.value = 5;
return true;
}
