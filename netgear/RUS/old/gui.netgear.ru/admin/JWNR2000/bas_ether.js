function setIP(cf)
{
var dflag = cf.WANAssign[0].checked;
setDisabled(dflag,cf.ether_ip1,cf.ether_ip2,cf.ether_ip3,cf.ether_ip4,cf.ether_mask1,cf.ether_mask2,cf.ether_mask3,cf.ether_mask4,cf.ether_gtw1,cf.ether_gtw2,cf.ether_gtw3,cf.ether_gtw4);
if (cf.WANAssign[1].checked)
{
cf.DNSAssign[1].checked = true;
setDNS(cf);
//cf.test_mark.disabled =true;
}
//else
//cf.test_mark.disabled =false;
DisableFixedIP = dflag;
}
function setDNS(cf)
{
var dflag = cf.DNSAssign[0].checked;
if (cf.WANAssign[1].checked)
{
cf.DNSAssign[1].checked=true;
dflag = false;
}
setDisabled(dflag,cf.ether_dnsp1,cf.ether_dnsp2,cf.ether_dnsp3,cf.ether_dnsp4,cf.ether_dnss1,cf.ether_dnss2,cf.ether_dnss3,cf.ether_dnss4);
DisableFixedDNS = dflag;
}
function check_wizard_dhcp(check)
{
cf=document.forms[0];
if(cf.ac_name.value=="")
{
alert(account_name_null);
return false;
}
for(i=0;i<cf.ac_name.value.length;i++)
 {
 if(isValidChar_space(cf.ac_name.value.charCodeAt(i))==false)
 {
 alert(acname_not_allowed);
 return false;
 }
 }
for(i=0;i<cf.do_name.value.length;i++)
 {
 if(isValidChar_space(cf.do_name.value.charCodeAt(i))==false)
 {
 alert(doname_not_allowed);
 return false;
 }
 }
if (check == 1)
cf.run_test.value="test"
else
cf.run_test.value="no"
return true;
}
function check_static_ip_mask_gtw()
{
cf=document.forms[0];
cf.ether_ipaddr.value=cf.ether_ip1.value+'.'+cf.ether_ip2.value+'.'+cf.ether_ip3.value+'.'+cf.ether_ip4.value;
cf.ether_subnet.value=cf.ether_mask1.value+'.'+cf.ether_mask2.value+'.'+cf.ether_mask3.value+'.'+cf.ether_mask4.value;
cf.ether_gateway.value=cf.ether_gtw1.value+'.'+cf.ether_gtw2.value+'.'+cf.ether_gtw3.value+'.'+cf.ether_gtw4.value;
if(checkipaddr(cf.ether_ipaddr.value)==false)
{
alert(invalid_ip);
return false;
}
if(checksubnet(cf.ether_subnet.value)==false)
{
alert(invalid_mask);
return false;
}
if(checkgateway(cf.ether_gateway.value)==false)
{
alert(invalid_gateway);
return false;
}
if(isGateway(cf.ether_ipaddr.value,cf.ether_subnet.value,cf.ether_gateway.value)==false)
{
alert(invalid_gateway);
return false;
}
if(isSameSubNet(cf.ether_ipaddr.value,cf.ether_subnet.value,cf.ether_gateway.value,cf.ether_subnet.value) == false)
{
alert(same_subnet_ip_gtw);
return false;
}
if(((cf.ether_ip4.value | cf.ether_mask4.value) == 255) ||
(((cf.ether_ip4.value - 1) | cf.ether_mask4.value) == 255) ||
(cf.ether_ipaddr.value == cf.ether_gateway.value))
{
alert(invalid_ip);
return false;
}
return true;
}
function check_static_dns()
{
var cf=document.forms[0];
cf.ether_dnsaddr1.value=cf.ether_dnsp1.value+'.'+cf.ether_dnsp2.value+'.'+cf.ether_dnsp3.value+'.'+cf.ether_dnsp4.value;
cf.ether_dnsaddr2.value=cf.ether_dnss1.value+'.'+cf.ether_dnss2.value+'.'+cf.ether_dnss3.value+'.'+cf.ether_dnss4.value;
if(checkipaddr(cf.ether_dnsaddr1.value)==false)
{
alert(invalid_primary_dns);
return false;
}
if(cf.ether_dnsaddr2.value=="...")
cf.ether_dnsaddr2.value="";
if(cf.ether_dnsaddr2.value!="" && cf.ether_dnsaddr2.value !="0.0.0.0")
{
if(checkipaddr(cf.ether_dnsaddr2.value)==false)
{
alert(invalid_second_dns);
return false;
}
}
if(cf.ether_dnsaddr2.value!="" && cf.ether_dnsaddr2.value == cf.ether_dnsaddr1.value)
{
alert(invalid_second_dns);
return false;
}

return true;
}
function check_ether_samesubnet()
{
var cf=document.forms[0];
 cf.ether_ipaddr.value=cf.ether_ip1.value+'.'+cf.ether_ip2.value+'.'+cf.ether_ip3.value+'.'+cf.ether_ip4.value;
 cf.ether_subnet.value=cf.ether_mask1.value+'.'+cf.ether_mask2.value+'.'+cf.ether_mask3.value+'.'+cf.ether_mask4.value;
 cf.ether_gateway.value=cf.ether_gtw1.value+'.'+cf.ether_gtw2.value+'.'+cf.ether_gtw3.value+'.'+cf.ether_gtw4.value;
if(isSameSubNet(cf.ether_ipaddr.value,cf.ether_subnet.value,lan_ip,lan_subnet) == true)
{
alert(same_lan_wan_subnet);
return false;
}
if(isSameSubNet(cf.ether_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
alert(same_lan_wan_subnet);
return false;
}
if(isSameSubNet(cf.ether_ipaddr.value,cf.ether_subnet.value,lan_ip,cf.ether_subnet.value) == true)
{
alert(same_lan_wan_subnet);
return false;
}
if(isSameIp(cf.ether_ipaddr.value,lan_ip) == true)
{
alert(same_lan_wan_ip);
return false;
}
return true;
}
function check_wizard_static(check)
{
var cf=document.forms[0];
if(check_static_ip_mask_gtw()==false)
return false;
if(check_ether_samesubnet()==false)
return false;
if(check_static_dns()==false)
return false;
if (check == 1)
cf.run_test.value="test"
else
cf.run_test.value="no"
return true;
}
function check_static_ip_dup_dns()
{
 var cf=document.forms[0];
 
 if( cf.ether_ipaddr.value == cf.ether_dnsaddr1.value )
 {
 alert(invalid_primary_dns_dup_wan);
 return true;
 } 
 if(cf.ether_ipaddr.value == cf.ether_dnsaddr2.value)
 {
 alert(invalid_second_dns_dup_wan);
 return true;
 }
 
 return false;
}
function check_ether(cf,check)
{
 cf.ether_ipaddr.value=cf.ether_ip1.value+'.'+cf.ether_ip2.value+'.'+cf.ether_ip3.value+'.'+cf.ether_ip4.value;
 cf.ether_subnet.value=cf.ether_mask1.value+'.'+cf.ether_mask2.value+'.'+cf.ether_mask3.value+'.'+cf.ether_mask4.value;
 cf.ether_gateway.value=cf.ether_gtw1.value+'.'+cf.ether_gtw2.value+'.'+cf.ether_gtw3.value+'.'+cf.ether_gtw4.value;
 
if(check_wizard_dhcp(check)==false)
return false;
if (cf.MACAssign[2].checked )
{
the_mac=cf.this_mac.value;
if(the_mac.indexOf(":")==-1 && the_mac.length=="12")
{
 var tmp_mac=the_mac.substr(0,2)+":"+the_mac.substr(2,2)+":"+the_mac.substr(4,2)+":"+the_mac.substr(6,2)+":"+the_mac.substr(8,2)+":"+the_mac.substr(10,2);
cf.this_mac.value = tmp_mac;
 }
else if ( the_mac.split("-").length == 6 )
{
var tmp_mac = the_mac.replace(/-/g,":");
cf.this_mac.value=tmp_mac;
}
if(maccheck(cf.this_mac.value) == false)
return false;
}
if(cf.WANAssign[1].checked == true)
{
if(check_static_ip_mask_gtw()==false)
return false;
if(isSameSubNet(cf.ether_ipaddr.value,cf.ether_subnet.value,lan_ip,lan_subnet) == true)
{
cf.conflict_wanlan.value=1;
}

if(isSameSubNet(cf.ether_ipaddr.value,lan_subnet,lan_ip,lan_subnet) == true)
{
cf.conflict_wanlan.value=1;
}
if(isSameSubNet(cf.ether_ipaddr.value,cf.ether_subnet.value,lan_ip,cf.ether_subnet.value) == true)
{
cf.conflict_wanlan.value=1;
}
if(isSameIp(cf.ether_ipaddr.value,lan_ip) == true)
{
cf.conflict_wanlan.value=1;
}
}
if(cf.DNSAssign[1].checked)
{
if(check_static_dns()==false)
return false;

if( (cf.WANAssign[1].checked == true) && (check_static_ip_dup_dns() == true) )
 return false;
}
if( old_wan_type!="dhcp" )
 cf.change_wan_type.value=0;
else if ( old_wan_assign == "1" )
{
 if(old_wan_ip!=cf.ether_ipaddr.value && cf.WANAssign[1].checked)
 cf.change_wan_type.value=0;
 else if(cf.WANAssign[0].checked)
 cf.change_wan_type.value=0;
 else
 cf.change_wan_type.value=1;
}
else if(old_wan_assign == "0" )
{
 if(old_wan_ip!=cf.ether_ipaddr.value && cf.WANAssign[1].checked)
 cf.change_wan_type.value=0;
 else
 cf.change_wan_type.value=1;
}
if( easy_setup == "1")
cf.is_easy_setup.value=1;
else
cf.is_easy_setup.value=0;
return true;
}
function check_welcome_dhcp()
{
var cf = document.forms[0];
parent.account_name=cf.ac_name.value;
parent.domain_name=cf.do_name.value;
parent.welcome_wan_type=2;
return true;
}
function check_welcome_static()
{
var cf = document.forms[0];
 cf.ether_ipaddr.value=cf.ether_ip1.value+'.'+cf.ether_ip2.value+'.'+cf.ether_ip3.value+'.'+cf.ether_ip4.value;
 cf.ether_subnet.value=cf.ether_mask1.value+'.'+cf.ether_mask2.value+'.'+cf.ether_mask3.value+'.'+cf.ether_mask4.value;
 cf.ether_gateway.value=cf.ether_gtw1.value+'.'+cf.ether_gtw2.value+'.'+cf.ether_gtw3.value+'.'+cf.ether_gtw4.value;
 cf.ether_dnsaddr1.value=cf.ether_dnsp1.value+'.'+cf.ether_dnsp2.value+'.'+cf.ether_dnsp3.value+'.'+cf.ether_dnsp4.value;
 cf.ether_dnsaddr2.value=cf.ether_dnss1.value+'.'+cf.ether_dnss2.value+'.'+cf.ether_dnss3.value+'.'+cf.ether_dnss4.value;
if(cf.ether_dnsaddr2.value=="...")
cf.ether_dnsaddr2.value="";
if(check_wizard_static(0)==false)
return false;
parent.welcome_wan_type=1;
parent.static_ip=cf.ether_ipaddr.value;
parent.static_subnet=cf.ether_subnet.value;
parent.static_gateway=cf.ether_gateway.value;
parent.static_dns1=cf.ether_dnsaddr1.value;
parent.static_dns2=cf.ether_dnsaddr2.value;
return true;
}
function ew_return_page()
{
cf=document.forms[0];
cf.action="noauth_no_commit.cgi@_2Fcgi-bin_2Few_detwan_wait.html";
cf.submit();
}
