function clearData1()
{
var cf = document.forms[0];
cf.local_ip1.disabled = true;
cf.local_ip2.disabled = true;
cf.local_ip3.disabled = true;
cf.local_ip4.disabled = true;
cf.start_ip_1.disabled = true;
cf.start_ip_2.disabled = true;
cf.start_ip_3.disabled = true;
cf.start_ip_4.disabled = true;
cf.fin_ip_1.disabled = true;
cf.fin_ip_2.disabled = true;
cf.fin_ip_3.disabled = true;
cf.fin_ip_4.disabled = true;
}
function check_remote()
{
var cf = document.forms[0];
if(cf.remote_mg_enable.checked == true)
cf.http_rmenable.value = 1;
else
cf.http_rmenable.value = 0;
 //if(cf.enable_telnet.checked == true)
 // cf.endis_telnet.value = 1;
 //else
 // cf.endis_telnet.value = 0;
cf.local_ip.value=cf.local_ip1.value+'.'+cf.local_ip2.value+'.'+cf.local_ip3.value+'.'+cf.local_ip4.value;
warningMessage=same_ip_wan+remote_manage_ip+" , "+include_wan_ip;
if(cf.rm_access[0].checked) 
{
if (checkipaddr(cf.local_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(cf.local_ip.value,lan_subnet,lan_ip,lan_subnet) == true)
{
alert(diff_thisip_lanip);
return false;
}
if (isSameIp(cf.local_ip.value,remote_manage_ip)==true)
{
alert(warningMessage);
return false;
}
}
else if(cf.rm_access[1].checked)
{
var start_ip=cf.start_ip_1.value+'.'+cf.start_ip_2.value+'.'+cf.start_ip_3.value+'.'+cf.start_ip_4.value;
var end_ip=cf.fin_ip_1.value+'.'+cf.fin_ip_2.value+'.'+cf.fin_ip_3.value+'.'+cf.fin_ip_4.value;
if (checkipaddr(start_ip)==false)
 {
 alert(invalid_ip);
 return false;
 }
if (checkipaddr(end_ip)==false)
 {
 alert(invalid_ip);
 return false;
 }
 if(cp_ip2(start_ip,end_ip)==false)
 {
 alert(invalid_ip_rang);
 return false;
 }
if(isSameSubNet(start_ip,lan_subnet,lan_ip,lan_subnet) == true)
 {
 alert(same_ip_lan);
 return false;
 }
 if(isSameSubNet(end_ip,lan_subnet,lan_ip,lan_subnet) == true)
 {
 alert(same_ip_lan);
 return false;
 }
startipNum=ipNum(start_ip);
endipNum=ipNum(end_ip);
wanipNum=ipNum(remote_manage_ip);
if( wanipNum >= startipNum && wanipNum <= endipNum )
{
alert(warningMessage);
return false;
}
cf.local_ip.value=start_ip+'-'+end_ip;
}
if(isNaN(parseInt(cf.http_rmport.value,10)) ||
 parseInt(cf.http_rmport.value) < 1024 ||
 parseInt(cf.http_rmport.value) > 65534 ||
 cf.http_rmport.value.indexOf(".") != -1)
{
 alert(invalid_port_number);
 cf.http_rmport.focus();
 return false;
 }
var remote_port=parseInt(cf.http_rmport.value);
//port_forwarding
for(i=1;i<=forward_array_num;i++)
{
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
sertype=each_info[1];
startport=each_info[2];
endport=each_info[3];
serflag=each_info[5];
if(sertype=="UDP")
{
}
else if(remote_port>=parseInt(startport)&& remote_port<=parseInt(endport) )
{
alert(invalid_remote_port_used);
return false;
}
}
//port_triggering
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
constart_port=each_info[6];
conend_port=each_info[7];
if(remote_port>=parseInt(constart_port)&& remote_port<=parseInt(conend_port) )
{
alert(invalid_remote_port_used);
return false;
}
}
//upnp
for(i=1;i<=upnp_array_num;i++)
{
var str = eval ( 'upnpArray' + i );
var each_info=str.split(';');
upnp_ext=each_info[3];
if(remote_port==parseInt(upnp_ext))
{
alert(invalid_remote_port_used);
return false;
}
}
//port 53
if(remote_port=="53")
 {
 alert(invalid_port_used);
 return false;
 }
//enable ntp
if(remote_port=="123" && endis_ntp == "1")
{
 alert(invalid_port_used);
 return false;
 }
//enable upnp
 if(remote_port=="1900" && endis_upnp == "1")
 {
 alert(invalid_port_used);
 return false;
 }
//enable bigpond
if(info_get_wanproto == "bigpond" && remote_port == "5050")
{
alert(invalid_port_used);
 return false;
}
return true;
}
function clearData2()
{
var cf=document.forms[0];
cf.start_ip_1.disabled = true;
cf.start_ip_2.disabled = true;
cf.start_ip_3.disabled = true;
cf.start_ip_4.disabled = true;
cf.fin_ip_1.disabled = true;
cf.fin_ip_2.disabled = true;
cf.fin_ip_3.disabled = true;
cf.fin_ip_4.disabled = true;
cf.local_ip1.disabled = false;
cf.local_ip2.disabled = false;
cf.local_ip3.disabled = false;
cf.local_ip4.disabled = false;
}
function clearData3()
{
var cf = document.forms[0];
cf.start_ip_1.disabled = false;
cf.start_ip_2.disabled = false;
cf.start_ip_3.disabled = false;
cf.start_ip_4.disabled = false;
cf.fin_ip_1.disabled = false;
cf.fin_ip_2.disabled = false;
cf.fin_ip_3.disabled = false;
cf.fin_ip_4.disabled = false;
cf.local_ip1.disabled = true;
cf.local_ip2.disabled = true;
cf.local_ip3.disabled = true;
cf.local_ip4.disabled = true;
}
function ipNum(ipStr)
{
 var total = 0;
 var ip_array=ipStr.split('.');
 var ip1=ip_array[0];
 var ip2=ip_array[1];
 var ip3=ip_array[2];
 var ip4=ip_array[3];
 total += parseInt(ip4);
 total += parseInt(ip3)*256;
 total += parseInt(ip2)*256*256;
 total += parseInt(ip1)*256*256*256;
total = parseInt(total);
return total;
}