<<<<<<< HEAD
function setGray(cf)
{
 if(cf.email_notify.checked)
 {

 cf.block_site.disabled = false;
 cf.email_smtp.disabled = false;
 cf.email_addr.disabled = false;
 cf.cfAlert_Select.disabled = false;
 cf.enable_auth.disabled = false;
 cf.enable_ssl.disabled = false;
 }
 else
 {
cf.block_site.disabled = true;
 cf.email_smtp.disabled = true;
 cf.email_addr.disabled = true;
cf.cfAlert_Select.disabled = true;
cf.enable_auth.disabled = true;
cf.enable_ssl.disabled = true;
 cf.cfAlert_Day.disabled = true;
 cf.cfAlert_Hour.disabled = true;
 cf.cfAlert_am[0].disabled = true;
 cf.cfAlert_am[1].disabled = true;
 
 }
setAuth(cf)
}
function setAuth(cf)
{
if(cf.email_notify.checked)
{
if(cf.enable_auth.checked == true)
{
cf.email_username.disabled = false;
cf.email_password.disabled = false;
}
else
{
cf.email_username.disabled = true;
 cf.email_password.disabled = true;
}
}
else
{
cf.email_username.disabled = true;
 cf.email_password.disabled = true;
}
}
function change_type(check,cf)
{
if(check == 0)
cf.email_this_addr.disabled =true;
else
cf.email_this_addr.disabled =false;
}
function disable_am(disable_flag,cf)
{
cf.cfAlert_am[0].disabled = disable_flag;
cf.cfAlert_am[1].disabled = disable_flag;
}
function OnAlertChange(cf)
{
var index = cf.cfAlert_Select.selectedIndex;
if ( (index == 0) || (index == 1) || (index == 4) )
{
cf.cfAlert_Day.selectedIndex = 0;
cf.cfAlert_Hour.selectedIndex= 0;
cf.cfAlert_Day.disabled = true;
cf.cfAlert_Hour.disabled = true;
AlertTimeDisabled = true;
AlertHourDisabled = true;
disable_am(true,cf);
}
else if(index == 2) // daily
{
cf.cfAlert_Day.selectedIndex = 0;
cf.cfAlert_Day.disabled = true;
cf.cfAlert_Hour.disabled = false;
AlertTimeDisabled = true;
AlertHourDisabled = false;
disable_am(false,cf);
}
else if(index == 3) // weekly
{
cf.cfAlert_Day.disabled = false;
cf.cfAlert_Hour.disabled = false;
AlertTimeDisabled = false;
AlertHourDisabled = false;
disable_am(false,cf);
}
}
function check_email(cf)
{
 var reEml = /^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i; 
if (cf.email_notify.checked) 
{
cf.email_notify_enabled.value = "1";
for(i=0;i<cf.email_addr.value.length;i++)
 {
 if(isValidChar(cf.email_addr.value.charCodeAt(i))==false)
 {
 alert(error_email_addr);
 cf.email_addr.focus();
 return false;
 }
 }
 /*
if(cf.email_addr.value.indexOf("@", 0) == -1 || cf.email_addr.value.indexOf(".", 0) == -1)
{
alert(error_email_addr);
cf.email_addr.focus();
return false;
}
 */
 if (reEml.test(cf.email_addr.value)==false) {
alert(error_email_addr);
cf.email_addr.focus();
 return (false);
 }
if(cf.email_smtp.value=="") 
{
 alert(error_email_smtp);
 cf.email_smtp.focus();
 return false;
}
for(i=0;i<cf.email_smtp.value.length;i++)
 {
 if(isValidChar(cf.email_smtp.value.charCodeAt(i))==false)
 {
 alert(error_email_smtp);
 cf.email_smtp.focus();
 return false;
 }
 }
 if((isSameIp(cf.email_smtp.value,lan_ipaddr)==true) || (isSameIp(cf.email_smtp.value,"127.0.0.1")==true) || (cp_ip2("224.0.0.0",cf.email_smtp.value)==true))
 {
 alert(error_email_smtp);
 return false;
 }
/*if(cf.email_from_assign[1].checked == true)
{
for(i=0;i<cf.email_this_addr.value.length;i++)
 {
 if(isValidChar(cf.email_this_addr.value.charCodeAt(i))==false)
 {
 alert(error_email_addr);
 cf.email_this_addr.focus();
 return false;
 }
 }
if(cf.email_this_addr.value.indexOf("@", 0) == -1 || cf.email_this_addr.value.indexOf(".", 0) == -1)
{
alert(error_email_addr);
cf.email_this_addr.focus();
return false;
}
}
*/if(cf.enable_auth.checked == true)
{
for(i=0;i<cf.email_username.value.length;i++)
 {
 if(isValidChar(cf.email_username.value.charCodeAt(i))==false)
 {
 alert(user_name_error);
 return false;
 }
 }
for(i=0;i<cf.email_password.value.length;i++)
 {
 if(isValidChar(cf.email_password.value.charCodeAt(i))==false)
 {
 alert(password_error);
 return false;
 }
 }
if(cf.email_username.value=="")
{
alert(user_name_null);
return false;
}
if(cf.email_password.value=="")
{
alert(password_null);
return false;
}
cf.email_endis_auth.value=1;
}
else
cf.email_endis_auth.value=0;

if(cf.enable_ssl.checked == true)
cf.email_support_ssl.value=1;
else
cf.email_support_ssl.value=0;

if(cf.block_site.checked)
cf.send_alert_immediately.value = "1";
else
cf.send_alert_immediately.value = "0";

if(cf.cfAlert_Select.selectedIndex == 2)// daily
{
if(cf.cfAlert_am[1].checked) 
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
else
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);
}
if(cf.cfAlert_Select.selectedIndex == 3) // weekly
{
if(cf.cfAlert_am[1].checked) 
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
else
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);
}
}
else 
cf.email_notify_enabled.value = "0";
/*if(cf.adjust.checked == true)
cf.ntpadjust.value=1;
else
cf.ntpadjust.value=0;
*/
check_ntp(cf);
return true;
}
function check_ntp(cf)
{
cfindex=cf.ntp_server.options[cf.ntp_server.selectedIndex].value;
if( cfindex == "GMT+1" || cfindex == "GMT+2" || cfindex == "GMT+3" )
{
cf.ntpserver1.value="time-h.netgear.com";
cf.ntpserver2.value="time-a.netgear.com";
}
else if( cfindex == "GMT+4" || cfindex == "GMT+5" || cfindex == "GMT+6" )
{
cf.ntpserver1.value="time-a.netgear.com";
cf.ntpserver2.value="time-b.netgear.com";
}
else if( cfindex == "GMT+7" || cfindex == "GMT+8" || cfindex == "GMT+9" )
{
cf.ntpserver1.value="time-b.netgear.com";
cf.ntpserver2.value="time-c.netgear.com";
}
else if( cfindex == "GMT+10" || cfindex == "GMT+11" || cfindex == "GMT+12" )
{
cf.ntpserver1.value="time-c.netgear.com";
cf.ntpserver2.value="time-d.netgear.com";
}
else if( cfindex == "GMT-9" || cfindex == "GMT-10" || cfindex == "GMT-11" || cfindex=="GMT-12" )
{
cf.ntpserver1.value="time-d.netgear.com";
cf.ntpserver2.value="time-e.netgear.com";
}
else if( cfindex == "GMT-6" || cfindex == "GMT-7" || cfindex == "GMT-8" )
{
cf.ntpserver1.value="time-e.netgear.com";
cf.ntpserver2.value="time-f.netgear.com";
}
else if( cfindex == "GMT-3" || cfindex == "GMT-4" || cfindex == "GMT-5" )
{
cf.ntpserver1.value="time-f.netgear.com";
cf.ntpserver2.value="time-g.netgear.com";
}
else if( cfindex == "GMT-0" || cfindex == "GMT-1" || cfindex == "GMT-2" )
{
cf.ntpserver1.value="time-g.netgear.com";
cf.ntpserver2.value="time-h.netgear.com";
}
if(cf.adjust.checked == true)
{
cf.ntpadjust.value=1;
cf.hidden_ntpserver.value=cf.ntp_server.value+"GMT";
}
else
{
cf.ntpadjust.value=0;
cf.hidden_ntpserver.value=cf.ntp_server.value;
}
cf.hidden_select.value=cf.ntp_server.selectedIndex;
return true;
}
=======
function setGray(cf)
{
 if(cf.email_notify.checked)
 {

 cf.block_site.disabled = false;
 cf.email_smtp.disabled = false;
 cf.email_addr.disabled = false;
 cf.cfAlert_Select.disabled = false;
 cf.enable_auth.disabled = false;
 cf.enable_ssl.disabled = false;
 }
 else
 {
cf.block_site.disabled = true;
 cf.email_smtp.disabled = true;
 cf.email_addr.disabled = true;
cf.cfAlert_Select.disabled = true;
cf.enable_auth.disabled = true;
cf.enable_ssl.disabled = true;
 cf.cfAlert_Day.disabled = true;
 cf.cfAlert_Hour.disabled = true;
 cf.cfAlert_am[0].disabled = true;
 cf.cfAlert_am[1].disabled = true;
 
 }
setAuth(cf)
}
function setAuth(cf)
{
if(cf.email_notify.checked)
{
if(cf.enable_auth.checked == true)
{
cf.email_username.disabled = false;
cf.email_password.disabled = false;
}
else
{
cf.email_username.disabled = true;
 cf.email_password.disabled = true;
}
}
else
{
cf.email_username.disabled = true;
 cf.email_password.disabled = true;
}
}
function change_type(check,cf)
{
if(check == 0)
cf.email_this_addr.disabled =true;
else
cf.email_this_addr.disabled =false;
}
function disable_am(disable_flag,cf)
{
cf.cfAlert_am[0].disabled = disable_flag;
cf.cfAlert_am[1].disabled = disable_flag;
}
function OnAlertChange(cf)
{
var index = cf.cfAlert_Select.selectedIndex;
if ( (index == 0) || (index == 1) || (index == 4) )
{
cf.cfAlert_Day.selectedIndex = 0;
cf.cfAlert_Hour.selectedIndex= 0;
cf.cfAlert_Day.disabled = true;
cf.cfAlert_Hour.disabled = true;
AlertTimeDisabled = true;
AlertHourDisabled = true;
disable_am(true,cf);
}
else if(index == 2) // daily
{
cf.cfAlert_Day.selectedIndex = 0;
cf.cfAlert_Day.disabled = true;
cf.cfAlert_Hour.disabled = false;
AlertTimeDisabled = true;
AlertHourDisabled = false;
disable_am(false,cf);
}
else if(index == 3) // weekly
{
cf.cfAlert_Day.disabled = false;
cf.cfAlert_Hour.disabled = false;
AlertTimeDisabled = false;
AlertHourDisabled = false;
disable_am(false,cf);
}
}
function check_email(cf)
{
 var reEml = /^[\w\-\.]+@[a-z0-9]+(\-[a-z0-9]+)?(\.[a-z0-9]+(\-[a-z0-9]+)?)*\.[a-z]{2,4}$/i; 
if (cf.email_notify.checked) 
{
cf.email_notify_enabled.value = "1";
for(i=0;i<cf.email_addr.value.length;i++)
 {
 if(isValidChar(cf.email_addr.value.charCodeAt(i))==false)
 {
 alert(error_email_addr);
 cf.email_addr.focus();
 return false;
 }
 }
 /*
if(cf.email_addr.value.indexOf("@", 0) == -1 || cf.email_addr.value.indexOf(".", 0) == -1)
{
alert(error_email_addr);
cf.email_addr.focus();
return false;
}
 */
 if (reEml.test(cf.email_addr.value)==false) {
alert(error_email_addr);
cf.email_addr.focus();
 return (false);
 }
if(cf.email_smtp.value=="") 
{
 alert(error_email_smtp);
 cf.email_smtp.focus();
 return false;
}
for(i=0;i<cf.email_smtp.value.length;i++)
 {
 if(isValidChar(cf.email_smtp.value.charCodeAt(i))==false)
 {
 alert(error_email_smtp);
 cf.email_smtp.focus();
 return false;
 }
 }
 if((isSameIp(cf.email_smtp.value,lan_ipaddr)==true) || (isSameIp(cf.email_smtp.value,"127.0.0.1")==true) || (cp_ip2("224.0.0.0",cf.email_smtp.value)==true))
 {
 alert(error_email_smtp);
 return false;
 }
/*if(cf.email_from_assign[1].checked == true)
{
for(i=0;i<cf.email_this_addr.value.length;i++)
 {
 if(isValidChar(cf.email_this_addr.value.charCodeAt(i))==false)
 {
 alert(error_email_addr);
 cf.email_this_addr.focus();
 return false;
 }
 }
if(cf.email_this_addr.value.indexOf("@", 0) == -1 || cf.email_this_addr.value.indexOf(".", 0) == -1)
{
alert(error_email_addr);
cf.email_this_addr.focus();
return false;
}
}
*/if(cf.enable_auth.checked == true)
{
for(i=0;i<cf.email_username.value.length;i++)
 {
 if(isValidChar(cf.email_username.value.charCodeAt(i))==false)
 {
 alert(user_name_error);
 return false;
 }
 }
for(i=0;i<cf.email_password.value.length;i++)
 {
 if(isValidChar(cf.email_password.value.charCodeAt(i))==false)
 {
 alert(password_error);
 return false;
 }
 }
if(cf.email_username.value=="")
{
alert(user_name_null);
return false;
}
if(cf.email_password.value=="")
{
alert(password_null);
return false;
}
cf.email_endis_auth.value=1;
}
else
cf.email_endis_auth.value=0;

if(cf.enable_ssl.checked == true)
cf.email_support_ssl.value=1;
else
cf.email_support_ssl.value=0;

if(cf.block_site.checked)
cf.send_alert_immediately.value = "1";
else
cf.send_alert_immediately.value = "0";

if(cf.cfAlert_Select.selectedIndex == 2)// daily
{
if(cf.cfAlert_am[1].checked) 
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
else
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);
}
if(cf.cfAlert_Select.selectedIndex == 3) // weekly
{
if(cf.cfAlert_am[1].checked) 
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value) + 12;
else
cf.schedule_hour.value = parseInt(cf.cfAlert_Hour.value);
}
}
else 
cf.email_notify_enabled.value = "0";
/*if(cf.adjust.checked == true)
cf.ntpadjust.value=1;
else
cf.ntpadjust.value=0;
*/
check_ntp(cf);
return true;
}
function check_ntp(cf)
{
cfindex=cf.ntp_server.options[cf.ntp_server.selectedIndex].value;
if( cfindex == "GMT+1" || cfindex == "GMT+2" || cfindex == "GMT+3" )
{
cf.ntpserver1.value="time-h.netgear.com";
cf.ntpserver2.value="time-a.netgear.com";
}
else if( cfindex == "GMT+4" || cfindex == "GMT+5" || cfindex == "GMT+6" )
{
cf.ntpserver1.value="time-a.netgear.com";
cf.ntpserver2.value="time-b.netgear.com";
}
else if( cfindex == "GMT+7" || cfindex == "GMT+8" || cfindex == "GMT+9" )
{
cf.ntpserver1.value="time-b.netgear.com";
cf.ntpserver2.value="time-c.netgear.com";
}
else if( cfindex == "GMT+10" || cfindex == "GMT+11" || cfindex == "GMT+12" )
{
cf.ntpserver1.value="time-c.netgear.com";
cf.ntpserver2.value="time-d.netgear.com";
}
else if( cfindex == "GMT-9" || cfindex == "GMT-10" || cfindex == "GMT-11" || cfindex=="GMT-12" )
{
cf.ntpserver1.value="time-d.netgear.com";
cf.ntpserver2.value="time-e.netgear.com";
}
else if( cfindex == "GMT-6" || cfindex == "GMT-7" || cfindex == "GMT-8" )
{
cf.ntpserver1.value="time-e.netgear.com";
cf.ntpserver2.value="time-f.netgear.com";
}
else if( cfindex == "GMT-3" || cfindex == "GMT-4" || cfindex == "GMT-5" )
{
cf.ntpserver1.value="time-f.netgear.com";
cf.ntpserver2.value="time-g.netgear.com";
}
else if( cfindex == "GMT-0" || cfindex == "GMT-1" || cfindex == "GMT-2" )
{
cf.ntpserver1.value="time-g.netgear.com";
cf.ntpserver2.value="time-h.netgear.com";
}
if(cf.adjust.checked == true)
{
cf.ntpadjust.value=1;
cf.hidden_ntpserver.value=cf.ntp_server.value+"GMT";
}
else
{
cf.ntpadjust.value=0;
cf.hidden_ntpserver.value=cf.ntp_server.value;
}
cf.hidden_select.value=cf.ntp_server.selectedIndex;
return true;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
