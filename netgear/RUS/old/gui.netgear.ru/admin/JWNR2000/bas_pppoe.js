<<<<<<< HEAD
function ReleasePeriodClick(cf)
{
var dflag;
if(cf.enable_pppoe_dual.checked)
dflag = false;
else
dflag = true;
//setDisabled(dflag,cf.Duethr1,cf.Duethr2,cf.Duethr3,cf.Duethr4,cf.DuMask1,cf.DuMask2,cf.DuMask3,cf.DuMask4,cf.DuGateway1,cf.DuGateway2,cf.DuGateway3,cf.DuGateway4);
setDisabled(dflag,cf.Duethr1,cf.Duethr2,cf.Duethr3,cf.Duethr4,cf.DuMask1,cf.DuMask2,cf.DuMask3,cf.DuMask4);
return;
}
function setIP(cf)
{
var dflag = cf.WANAssign[0].checked;
setDisabled(dflag,cf.pppoe_ip1,cf.pppoe_ip2,cf.pppoe_ip3,cf.pppoe_ip4);
//setDisabled(dflag,cf.pppoe_nm1,cf.pppoe_nm2,cf.pppoe_nm3,cf.pppoe_nm4);
DisableFixedIP = dflag;
}
function setDNS(cf)
{
var dflag = cf.DNSAssign[0].checked;
setDisabled(dflag,cf.pppoe_dnsp1,cf.pppoe_dnsp2,cf.pppoe_dnsp3,cf.pppoe_dnsp4,cf.pppoe_dnss1,cf.pppoe_dnss2,cf.pppoe_dnss3,cf.pppoe_dnss4);
DisableFixedDNS = dflag;
}
function check_static_ip_mask_gtw()
{
cf=document.forms[0];
cf.pppoe_dual_ipaddr.value=cf.Duethr1.value+'.'+cf.Duethr2.value+'.'+cf.Duethr3.value+'.'+cf.Duethr4.value;
cf.pppoe_dual_subnet.value=cf.DuMask1.value+'.'+cf.DuMask2.value+'.'+cf.DuMask3.value+'.'+cf.DuMask4.value;
if(cf.pppoe_dual_ipaddr.value=="..." && cf.pppoe_dual_subnet.value=="...")
{
cf.pppoe_dual_ipaddr.value="";
cf.pppoe_dual_subnet.value="";
cf.pppoe_dual_assign.value=0;
return true;
}
if(checkipaddr(cf.pppoe_dual_ipaddr.value)==false || is_sub_or_broad(cf.pppoe_dual_ipaddr.value, cf.pppoe_dual_ipaddr.value, cf.pppoe_dual_subnet.value) == false)
{
alert(invalid_ip);
return false;
}
if(checksubnet(cf.pppoe_dual_subnet.value)==false)
{
alert(invalid_mask);
return false;
}
cf.pppoe_dual_assign.value=1;
if(isSameSubNet(cf.pppoe_dual_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
cf.conflict_wanlan.value=1;
}
if(isSameIp(cf.pppoe_dual_ipaddr.value,lan_ip) == true)
{
cf.conflict_wanlan.value=1;
}
return true;
}
function check_wizard_pppoe(check)
{
var form=document.forms[0];
if(form.pppoe_username.value=="")
{
alert(login_name_null);
return false;
}
for(i=0;i<form.pppoe_username.value.length;i++)
 {
 if(isValidChar(form.pppoe_username.value.charCodeAt(i))==false)
 {
 alert(loginname_not_allowed);
 return false;
 }
 }
for(i=0;i<form.pppoe_password.value.length;i++)
 {
 if(isValidChar(form.pppoe_password.value.charCodeAt(i))==false)
 {
 alert(password_not_allowed);
 return false;
 }
 }
for(i=0;i<form.pppoe_servicename.value.length;i++)
 {
 if(isValidChar(form.pppoe_servicename.value.charCodeAt(i))==false)
 {
 alert(servname_not_allowed);
 return false;
 }
 }
if(form.pppoe_idle_time.value.length<=0)
{
alert(idle_time_null);
return false;
}
else if(!_isNumeric(form.pppoe_idle_time.value))
{
alert(invalid_idle_time);
return false;
}
if (check == 1)
form.run_test.value="test"
else
form.run_test.value="no"
return true;
}
function check_pppoe_static_ip_dup_dns(form)
{ 
 if( form.pppoe_ipaddr.value == form.pppoe_dnsaddr1.value )
 {
 alert(invalid_primary_dns_dup_wan);
 return true;
 } 
 if(form.pppoe_ipaddr.value == form.pppoe_dnsaddr2.value)
 {
 alert(invalid_second_dns_dup_wan);
 return true;
 }
 
 return false;
}
function check_pppoe(form,check)
{
if(check_wizard_pppoe(check)==false)
return false;
 if (form.MACAssign[2].checked )
 {
 the_mac=form.this_mac.value;
 if(the_mac.indexOf(":")==-1 && the_mac.length=="12")
 {
 var tmp_mac=the_mac.substr(0,2)+":"+the_mac.substr(2,2)+":"+the_mac.substr(4,2)+":"+the_mac.substr(6,2)+":"+the_mac.substr(8,2)+":"+the_mac.substr(10,2);
 form.this_mac.value = tmp_mac;
 }
 else if ( the_mac.split("-").length == 6 )
 {
 var tmp_mac = the_mac.replace(/-/g,":");
 form.this_mac.value=tmp_mac;
 }
 if(maccheck(form.this_mac.value) == false)
 return false;
 }
form.hidden_pppoe_idle_time.value = form.pppoe_idle_time.value;
if(form.WANAssign[1].checked == true)
{
 form.pppoe_ipaddr.value=form.pppoe_ip1.value+'.'+form.pppoe_ip2.value+'.'+form.pppoe_ip3.value+'.'+form.pppoe_ip4.value;
if(checkipaddr(form.pppoe_ipaddr.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(form.pppoe_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
form.conflict_wanlan.value=1;
}
if(isSameIp(form.pppoe_ipaddr.value,lan_ip) == true)
{
form.conflict_wanlan.value=1;
}
 /* form.pppoe_netmask.value=form.pppoe_nm1.value+'.'+form.pppoe_nm2.value+'.'+form.pppoe_nm3.value+'.'+form.pppoe_nm4.value;
if(form.pppoe_netmask.value !="..." && form.pppoe_netmask.value!="0.0.0.0")
if(checksubnet(form.pppoe_netmask.value)==false)
{
alert(invalid_mask);
return false;
}*/
}
if(form.enable_pppoe_dual.checked){
form.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
form.dual_access.value=0;
if(form.DNSAssign[1].checked == true)
{
 form.pppoe_dnsaddr1.value=form.pppoe_dnsp1.value+'.'+form.pppoe_dnsp2.value+'.'+form.pppoe_dnsp3.value+'.'+form.pppoe_dnsp4.value;
 form.pppoe_dnsaddr2.value=form.pppoe_dnss1.value+'.'+form.pppoe_dnss2.value+'.'+form.pppoe_dnss3.value+'.'+form.pppoe_dnss4.value;
 if(form.pppoe_dnsaddr2.value=="...")
 form.pppoe_dnsaddr2.value="";
if(checkipaddr(form.pppoe_dnsaddr1.value)==false)
{
alert(invalid_primary_dns);
return false;
}
if(form.pppoe_dnsaddr2.value!="" && form.pppoe_dnsaddr2.value!="0.0.0.0")
if(checkipaddr(form.pppoe_dnsaddr2.value)==false)
{
alert(invalid_second_dns);
return false;
}
if(form.pppoe_dnsaddr2.value!="" && form.pppoe_dnsaddr2.value==form.pppoe_dnsaddr1.value)
{
alert(invalid_second_dns);
return false;
}
if( (form.WANAssign[1].checked == true) && (check_pppoe_static_ip_dup_dns(form) == true) )
 return false;
}
if ( !( old_wan_type=="pppoe"))
 form.change_wan_type.value=0;
else if ( old_pppoe_wan_assign == "1")
{
 if( old_wan_ip!= form.pppoe_ipaddr.value && form.WANAssign[1].checked)
 form.change_wan_type.value=0;
 else if(form.WANAssign[0].checked)
 form.change_wan_type.value=0;
 else
 form.change_wan_type.value=1;
}
else if( old_pppoe_wan_assign == "0")
{
 if( old_wan_ip!=form.pppoe_ipaddr.value && form.WANAssign[1].checked)
 form.change_wan_type.value=0;
 else
 form.change_wan_type.value=1;
}

if( easy_setup == "1")
form.is_easy_setup.value=1;
else
form.is_easy_setup.value=0;

return true;
}
function setIP_welcome_pppoe()
{
cf=document.forms[0];
var dflag = cf.WANAssign[0].checked;
setDisabled(dflag,cf.pppoe_ip1,cf.pppoe_ip2,cf.pppoe_ip3,cf.pppoe_ip4);
//setDisabled(dflag,cf.pppoe_nm1,cf.pppoe_nm2,cf.pppoe_nm3,cf.pppoe_nm4);
DisableFixedIP = dflag;
}
function setDNS_welcome_pppoe()
{
cf=document.forms[0];
 var dflag = cf.DNSAssign[0].checked;
 setDisabled(dflag,cf.pppoe_dnsp1,cf.pppoe_dnsp2,cf.pppoe_dnsp3,cf.pppoe_dnsp4,cf.pppoe_dnss1,cf.pppoe_dnss2,cf.pppoe_dnss3,cf.pppoe_dnss4);
 DisableFixedDNS = dflag;
}
function check_wizard_pppoe_new(check)
{
var cf=document.forms[0];
 if(check_wizard_pppoe(check)==false)
 return false;
 cf.pppoe_ipaddr.value=cf.pppoe_ip1.value+'.'+cf.pppoe_ip2.value+'.'+cf.pppoe_ip3.value+'.'+cf.pppoe_ip4.value;
 if(cf.WANAssign[1].checked)
 {
 if(checkipaddr(cf.pppoe_ipaddr.value)==false)
 {
 alert(invalid_ip);
 return false;
 }
 }
/*cf.pppoe_netmask.value=cf.pppoe_nm1.value+'.'+cf.pppoe_nm2.value+'.'+cf.pppoe_nm3.value+'.'+cf.pppoe_nm4.value;
if(cf.pppoe_netmask.value !="..." && cf.pppoe_netmask.value!="0.0.0.0")
if(checksubnet(cf.pppoe_netmask.value)==false)
{
alert(invalid_mask);
return false;
}*/
if(cf.enable_pppoe_dual.checked){
cf.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
cf.dual_access.value=0;
if(cf.DNSAssign[1].checked == true)
{
 cf.pppoe_dnsaddr1.value=cf.pppoe_dnsp1.value+'.'+cf.pppoe_dnsp2.value+'.'+cf.pppoe_dnsp3.value+'.'+cf.pppoe_dnsp4.value;
 cf.pppoe_dnsaddr2.value=cf.pppoe_dnss1.value+'.'+cf.pppoe_dnss2.value+'.'+cf.pppoe_dnss3.value+'.'+cf.pppoe_dnss4.value;
 if(cf.pppoe_dnsaddr2.value=="...")
 cf.pppoe_dnsaddr2.value="";
  if(checkipaddr(cf.pppoe_dnsaddr1.value)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value!="0.0.0.0")
  if(checkipaddr(cf.pppoe_dnsaddr2.value)==false)
  {
 alert(invalid_second_dns);
 return false;
  }
 }
}
function check_welcome_pppoe()
{
var cf=document.forms[0];
if(check_wizard_pppoe(0)==false)
return false;
cf.pppoe_ipaddr.value=cf.pppoe_ip1.value+'.'+cf.pppoe_ip2.value+'.'+cf.pppoe_ip3.value+'.'+cf.pppoe_ip4.value;
if(cf.WANAssign[1].checked)
{
if(checkipaddr(cf.pppoe_ipaddr.value)==false)
{
alert(invalid_ip);
return false;
}
}
 /*cf.pppoe_netmask.value=cf.pppoe_nm1.value+'.'+cf.pppoe_nm2.value+'.'+cf.pppoe_nm3.value+'.'+cf.pppoe_nm4.value;
 if(cf.pppoe_netmask.value !="..." && cf.pppoe_netmask.value!="0.0.0.0")
 if(checksubnet(cf.pppoe_netmask.value)==false)
 {
 alert(invalid_mask);
 return false;
 }*/
 if(cf.enable_pppoe_dual.checked){
cf.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
cf.dual_access.value=0;
if(cf.DNSAssign[1].checked == true)
 {
 cf.pppoe_dnsaddr1.value=cf.pppoe_dnsp1.value+'.'+cf.pppoe_dnsp2.value+'.'+cf.pppoe_dnsp3.value+'.'+cf.pppoe_dnsp4.value;
 cf.pppoe_dnsaddr2.value=cf.pppoe_dnss1.value+'.'+cf.pppoe_dnss2.value+'.'+cf.pppoe_dnss3.value+'.'+cf.pppoe_dnss4.value;
 if(cf.pppoe_dnsaddr2.value=="...")
 cf.pppoe_dnsaddr2.value="";
 if(checkipaddr(cf.pppoe_dnsaddr1.value)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value!="0.0.0.0")
 if(checkipaddr(cf.pppoe_dnsaddr2.value)==false)
 {
 alert(invalid_second_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value==cf.pppoe_dnsaddr1.value)
 {
 alert(invalid_second_dns);
 return false;
 }
 }
parent.pppoe_username=cf.pppoe_username.value;
parent.pppoe_password=cf.pppoe_password.value;
parent.pppoe_server=cf.pppoe_servicename.value;
parent.pppoe_idle=cf.pppoe_idle_time.value;

parent.pppoe_eth_ip=cf.pppoe_dual_ipaddr.value;
parent.pppoe_eth_netmask=cf.pppoe_dual_subnet.value;
parent.dual_access=cf.dual_access.value;
parent.pppoe_dual_assign=cf.pppoe_dual_assign.value;
if(cf.WANAssign[1].checked)
{
parent.pppoe_wan_assign=1;
parent.pppoe_static_ip=cf.pppoe_ipaddr.value;
}
else
{
parent.pppoe_wan_assign=0;
parent.pppoe_static_ip="";
}
if(cf.DNSAssign[1].checked == true)
{
parent.pppoe_dns_assign=1;
parent.pppoe_dns1.value=cf.pppoe_dnsaddr1.value;
parent.pppoe_dns2.value=cf.pppoe_dnsaddr2.value;
}
else
{
parent.pppoe_dns_assign=0;
 parent.pppoe_dns1.value="";
 parent.pppoe_dns2.value="";
}
parent.welcome_wan_type=3;
return true;
}
function ew_return_page()
{
cf=document.forms[0];
cf.action="noauth_no_commit.cgi@_2Fcgi-bin_2Few_detwan_wait.html";
cf.submit();
}
=======
function ReleasePeriodClick(cf)
{
var dflag;
if(cf.enable_pppoe_dual.checked)
dflag = false;
else
dflag = true;
//setDisabled(dflag,cf.Duethr1,cf.Duethr2,cf.Duethr3,cf.Duethr4,cf.DuMask1,cf.DuMask2,cf.DuMask3,cf.DuMask4,cf.DuGateway1,cf.DuGateway2,cf.DuGateway3,cf.DuGateway4);
setDisabled(dflag,cf.Duethr1,cf.Duethr2,cf.Duethr3,cf.Duethr4,cf.DuMask1,cf.DuMask2,cf.DuMask3,cf.DuMask4);
return;
}
function setIP(cf)
{
var dflag = cf.WANAssign[0].checked;
setDisabled(dflag,cf.pppoe_ip1,cf.pppoe_ip2,cf.pppoe_ip3,cf.pppoe_ip4);
//setDisabled(dflag,cf.pppoe_nm1,cf.pppoe_nm2,cf.pppoe_nm3,cf.pppoe_nm4);
DisableFixedIP = dflag;
}
function setDNS(cf)
{
var dflag = cf.DNSAssign[0].checked;
setDisabled(dflag,cf.pppoe_dnsp1,cf.pppoe_dnsp2,cf.pppoe_dnsp3,cf.pppoe_dnsp4,cf.pppoe_dnss1,cf.pppoe_dnss2,cf.pppoe_dnss3,cf.pppoe_dnss4);
DisableFixedDNS = dflag;
}
function check_static_ip_mask_gtw()
{
cf=document.forms[0];
cf.pppoe_dual_ipaddr.value=cf.Duethr1.value+'.'+cf.Duethr2.value+'.'+cf.Duethr3.value+'.'+cf.Duethr4.value;
cf.pppoe_dual_subnet.value=cf.DuMask1.value+'.'+cf.DuMask2.value+'.'+cf.DuMask3.value+'.'+cf.DuMask4.value;
if(cf.pppoe_dual_ipaddr.value=="..." && cf.pppoe_dual_subnet.value=="...")
{
cf.pppoe_dual_ipaddr.value="";
cf.pppoe_dual_subnet.value="";
cf.pppoe_dual_assign.value=0;
return true;
}
if(checkipaddr(cf.pppoe_dual_ipaddr.value)==false || is_sub_or_broad(cf.pppoe_dual_ipaddr.value, cf.pppoe_dual_ipaddr.value, cf.pppoe_dual_subnet.value) == false)
{
alert(invalid_ip);
return false;
}
if(checksubnet(cf.pppoe_dual_subnet.value)==false)
{
alert(invalid_mask);
return false;
}
cf.pppoe_dual_assign.value=1;
if(isSameSubNet(cf.pppoe_dual_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
cf.conflict_wanlan.value=1;
}
if(isSameIp(cf.pppoe_dual_ipaddr.value,lan_ip) == true)
{
cf.conflict_wanlan.value=1;
}
return true;
}
function check_wizard_pppoe(check)
{
var form=document.forms[0];
if(form.pppoe_username.value=="")
{
alert(login_name_null);
return false;
}
for(i=0;i<form.pppoe_username.value.length;i++)
 {
 if(isValidChar(form.pppoe_username.value.charCodeAt(i))==false)
 {
 alert(loginname_not_allowed);
 return false;
 }
 }
for(i=0;i<form.pppoe_password.value.length;i++)
 {
 if(isValidChar(form.pppoe_password.value.charCodeAt(i))==false)
 {
 alert(password_not_allowed);
 return false;
 }
 }
for(i=0;i<form.pppoe_servicename.value.length;i++)
 {
 if(isValidChar(form.pppoe_servicename.value.charCodeAt(i))==false)
 {
 alert(servname_not_allowed);
 return false;
 }
 }
if(form.pppoe_idle_time.value.length<=0)
{
alert(idle_time_null);
return false;
}
else if(!_isNumeric(form.pppoe_idle_time.value))
{
alert(invalid_idle_time);
return false;
}
if (check == 1)
form.run_test.value="test"
else
form.run_test.value="no"
return true;
}
function check_pppoe_static_ip_dup_dns(form)
{ 
 if( form.pppoe_ipaddr.value == form.pppoe_dnsaddr1.value )
 {
 alert(invalid_primary_dns_dup_wan);
 return true;
 } 
 if(form.pppoe_ipaddr.value == form.pppoe_dnsaddr2.value)
 {
 alert(invalid_second_dns_dup_wan);
 return true;
 }
 
 return false;
}
function check_pppoe(form,check)
{
if(check_wizard_pppoe(check)==false)
return false;
 if (form.MACAssign[2].checked )
 {
 the_mac=form.this_mac.value;
 if(the_mac.indexOf(":")==-1 && the_mac.length=="12")
 {
 var tmp_mac=the_mac.substr(0,2)+":"+the_mac.substr(2,2)+":"+the_mac.substr(4,2)+":"+the_mac.substr(6,2)+":"+the_mac.substr(8,2)+":"+the_mac.substr(10,2);
 form.this_mac.value = tmp_mac;
 }
 else if ( the_mac.split("-").length == 6 )
 {
 var tmp_mac = the_mac.replace(/-/g,":");
 form.this_mac.value=tmp_mac;
 }
 if(maccheck(form.this_mac.value) == false)
 return false;
 }
form.hidden_pppoe_idle_time.value = form.pppoe_idle_time.value;
if(form.WANAssign[1].checked == true)
{
 form.pppoe_ipaddr.value=form.pppoe_ip1.value+'.'+form.pppoe_ip2.value+'.'+form.pppoe_ip3.value+'.'+form.pppoe_ip4.value;
if(checkipaddr(form.pppoe_ipaddr.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(form.pppoe_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
form.conflict_wanlan.value=1;
}
if(isSameIp(form.pppoe_ipaddr.value,lan_ip) == true)
{
form.conflict_wanlan.value=1;
}
 /* form.pppoe_netmask.value=form.pppoe_nm1.value+'.'+form.pppoe_nm2.value+'.'+form.pppoe_nm3.value+'.'+form.pppoe_nm4.value;
if(form.pppoe_netmask.value !="..." && form.pppoe_netmask.value!="0.0.0.0")
if(checksubnet(form.pppoe_netmask.value)==false)
{
alert(invalid_mask);
return false;
}*/
}
if(form.enable_pppoe_dual.checked){
form.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
form.dual_access.value=0;
if(form.DNSAssign[1].checked == true)
{
 form.pppoe_dnsaddr1.value=form.pppoe_dnsp1.value+'.'+form.pppoe_dnsp2.value+'.'+form.pppoe_dnsp3.value+'.'+form.pppoe_dnsp4.value;
 form.pppoe_dnsaddr2.value=form.pppoe_dnss1.value+'.'+form.pppoe_dnss2.value+'.'+form.pppoe_dnss3.value+'.'+form.pppoe_dnss4.value;
 if(form.pppoe_dnsaddr2.value=="...")
 form.pppoe_dnsaddr2.value="";
if(checkipaddr(form.pppoe_dnsaddr1.value)==false)
{
alert(invalid_primary_dns);
return false;
}
if(form.pppoe_dnsaddr2.value!="" && form.pppoe_dnsaddr2.value!="0.0.0.0")
if(checkipaddr(form.pppoe_dnsaddr2.value)==false)
{
alert(invalid_second_dns);
return false;
}
if(form.pppoe_dnsaddr2.value!="" && form.pppoe_dnsaddr2.value==form.pppoe_dnsaddr1.value)
{
alert(invalid_second_dns);
return false;
}
if( (form.WANAssign[1].checked == true) && (check_pppoe_static_ip_dup_dns(form) == true) )
 return false;
}
if ( !( old_wan_type=="pppoe"))
 form.change_wan_type.value=0;
else if ( old_pppoe_wan_assign == "1")
{
 if( old_wan_ip!= form.pppoe_ipaddr.value && form.WANAssign[1].checked)
 form.change_wan_type.value=0;
 else if(form.WANAssign[0].checked)
 form.change_wan_type.value=0;
 else
 form.change_wan_type.value=1;
}
else if( old_pppoe_wan_assign == "0")
{
 if( old_wan_ip!=form.pppoe_ipaddr.value && form.WANAssign[1].checked)
 form.change_wan_type.value=0;
 else
 form.change_wan_type.value=1;
}

if( easy_setup == "1")
form.is_easy_setup.value=1;
else
form.is_easy_setup.value=0;

return true;
}
function setIP_welcome_pppoe()
{
cf=document.forms[0];
var dflag = cf.WANAssign[0].checked;
setDisabled(dflag,cf.pppoe_ip1,cf.pppoe_ip2,cf.pppoe_ip3,cf.pppoe_ip4);
//setDisabled(dflag,cf.pppoe_nm1,cf.pppoe_nm2,cf.pppoe_nm3,cf.pppoe_nm4);
DisableFixedIP = dflag;
}
function setDNS_welcome_pppoe()
{
cf=document.forms[0];
 var dflag = cf.DNSAssign[0].checked;
 setDisabled(dflag,cf.pppoe_dnsp1,cf.pppoe_dnsp2,cf.pppoe_dnsp3,cf.pppoe_dnsp4,cf.pppoe_dnss1,cf.pppoe_dnss2,cf.pppoe_dnss3,cf.pppoe_dnss4);
 DisableFixedDNS = dflag;
}
function check_wizard_pppoe_new(check)
{
var cf=document.forms[0];
 if(check_wizard_pppoe(check)==false)
 return false;
 cf.pppoe_ipaddr.value=cf.pppoe_ip1.value+'.'+cf.pppoe_ip2.value+'.'+cf.pppoe_ip3.value+'.'+cf.pppoe_ip4.value;
 if(cf.WANAssign[1].checked)
 {
 if(checkipaddr(cf.pppoe_ipaddr.value)==false)
 {
 alert(invalid_ip);
 return false;
 }
 }
/*cf.pppoe_netmask.value=cf.pppoe_nm1.value+'.'+cf.pppoe_nm2.value+'.'+cf.pppoe_nm3.value+'.'+cf.pppoe_nm4.value;
if(cf.pppoe_netmask.value !="..." && cf.pppoe_netmask.value!="0.0.0.0")
if(checksubnet(cf.pppoe_netmask.value)==false)
{
alert(invalid_mask);
return false;
}*/
if(cf.enable_pppoe_dual.checked){
cf.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
cf.dual_access.value=0;
if(cf.DNSAssign[1].checked == true)
{
 cf.pppoe_dnsaddr1.value=cf.pppoe_dnsp1.value+'.'+cf.pppoe_dnsp2.value+'.'+cf.pppoe_dnsp3.value+'.'+cf.pppoe_dnsp4.value;
 cf.pppoe_dnsaddr2.value=cf.pppoe_dnss1.value+'.'+cf.pppoe_dnss2.value+'.'+cf.pppoe_dnss3.value+'.'+cf.pppoe_dnss4.value;
 if(cf.pppoe_dnsaddr2.value=="...")
 cf.pppoe_dnsaddr2.value="";
  if(checkipaddr(cf.pppoe_dnsaddr1.value)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value!="0.0.0.0")
  if(checkipaddr(cf.pppoe_dnsaddr2.value)==false)
  {
 alert(invalid_second_dns);
 return false;
  }
 }
}
function check_welcome_pppoe()
{
var cf=document.forms[0];
if(check_wizard_pppoe(0)==false)
return false;
cf.pppoe_ipaddr.value=cf.pppoe_ip1.value+'.'+cf.pppoe_ip2.value+'.'+cf.pppoe_ip3.value+'.'+cf.pppoe_ip4.value;
if(cf.WANAssign[1].checked)
{
if(checkipaddr(cf.pppoe_ipaddr.value)==false)
{
alert(invalid_ip);
return false;
}
}
 /*cf.pppoe_netmask.value=cf.pppoe_nm1.value+'.'+cf.pppoe_nm2.value+'.'+cf.pppoe_nm3.value+'.'+cf.pppoe_nm4.value;
 if(cf.pppoe_netmask.value !="..." && cf.pppoe_netmask.value!="0.0.0.0")
 if(checksubnet(cf.pppoe_netmask.value)==false)
 {
 alert(invalid_mask);
 return false;
 }*/
 if(cf.enable_pppoe_dual.checked){
cf.dual_access.value=1;
if(check_static_ip_mask_gtw() == false)
return false;
}
else
cf.dual_access.value=0;
if(cf.DNSAssign[1].checked == true)
 {
 cf.pppoe_dnsaddr1.value=cf.pppoe_dnsp1.value+'.'+cf.pppoe_dnsp2.value+'.'+cf.pppoe_dnsp3.value+'.'+cf.pppoe_dnsp4.value;
 cf.pppoe_dnsaddr2.value=cf.pppoe_dnss1.value+'.'+cf.pppoe_dnss2.value+'.'+cf.pppoe_dnss3.value+'.'+cf.pppoe_dnss4.value;
 if(cf.pppoe_dnsaddr2.value=="...")
 cf.pppoe_dnsaddr2.value="";
 if(checkipaddr(cf.pppoe_dnsaddr1.value)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value!="0.0.0.0")
 if(checkipaddr(cf.pppoe_dnsaddr2.value)==false)
 {
 alert(invalid_second_dns);
 return false;
 }
 if(cf.pppoe_dnsaddr2.value!="" && cf.pppoe_dnsaddr2.value==cf.pppoe_dnsaddr1.value)
 {
 alert(invalid_second_dns);
 return false;
 }
 }
parent.pppoe_username=cf.pppoe_username.value;
parent.pppoe_password=cf.pppoe_password.value;
parent.pppoe_server=cf.pppoe_servicename.value;
parent.pppoe_idle=cf.pppoe_idle_time.value;

parent.pppoe_eth_ip=cf.pppoe_dual_ipaddr.value;
parent.pppoe_eth_netmask=cf.pppoe_dual_subnet.value;
parent.dual_access=cf.dual_access.value;
parent.pppoe_dual_assign=cf.pppoe_dual_assign.value;
if(cf.WANAssign[1].checked)
{
parent.pppoe_wan_assign=1;
parent.pppoe_static_ip=cf.pppoe_ipaddr.value;
}
else
{
parent.pppoe_wan_assign=0;
parent.pppoe_static_ip="";
}
if(cf.DNSAssign[1].checked == true)
{
parent.pppoe_dns_assign=1;
parent.pppoe_dns1.value=cf.pppoe_dnsaddr1.value;
parent.pppoe_dns2.value=cf.pppoe_dnsaddr2.value;
}
else
{
parent.pppoe_dns_assign=0;
 parent.pppoe_dns1.value="";
 parent.pppoe_dns2.value="";
}
parent.welcome_wan_type=3;
return true;
}
function ew_return_page()
{
cf=document.forms[0];
cf.action="noauth_no_commit.cgi@_2Fcgi-bin_2Few_detwan_wait.html";
cf.submit();
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
