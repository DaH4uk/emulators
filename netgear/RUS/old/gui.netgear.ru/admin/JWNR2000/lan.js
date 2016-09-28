function dhcponoff()
{
var cf=document.forms[0];
if(cf.lan_dhcpmode.checked ==true)
 {
 cf.sysPoolStartingAddr4.disabled =false;
 cf.sysPoolFinishAddr4.disabled =false;
}
else
{
 cf.sysPoolStartingAddr4.disabled =true;
 cf.sysPoolFinishAddr4.disabled =true;
}
}
function lanip_change(cf)
{
var addr_array = new Array();
cf.lan_ipaddr.value=cf.lan_ip1.value+'.'+cf.lan_ip2.value+'.'+cf.lan_ip3.value+'.'+cf.lan_ip4.value;
addr_array = cf.lan_ipaddr.value.split('.');
cf.sysPoolStartingAddr1.value = cf.sysPoolFinishAddr1.value=addr_array[0];
cf.sysPoolStartingAddr2.value = cf.sysPoolFinishAddr2.value= addr_array[1];
cf.sysPoolStartingAddr3.value = cf.sysPoolFinishAddr3.value=addr_array[2];
}
function check_clientNumber(cf)
{
cf.lan_subnet.value=cf.lan_mask1.value+'.'+cf.lan_mask2.value+'.'+cf.lan_mask3.value+'.'+cf.lan_mask4.value;
var lan_mask=cf.lan_subnet.value;
cf.lan_ipaddr.value=cf.lan_ip1.value+'.'+cf.lan_ip2.value+'.'+cf.lan_ip3.value+'.'+cf.lan_ip4.value;
var lan_ip=cf.lan_ipaddr.value;
var mask_array=lan_mask.split('.');
var lan_array=lan_ip.split('.');
var netmask = parseInt(mask_array[3], 10);
var net_number = 256 / (256 - netmask);
var client = 255-netmask;
var localip = parseInt(lan_array[3]);
var net_start = (netmask & localip) + 1;
var net_end = (net_start + client) - 1;
if (localip == (net_start-1)) {
cf.lan_ipaddr.focus();
return false;
}
if (localip >= (net_end)) {
cf.lan_ipaddr.focus();
return false;
}
if ((parseInt(cf.sysPoolStartingAddr4.value) < net_start) || (parseInt(cf.sysPoolStartingAddr4.value) >= net_end)) {
cf.sysPoolStartingAddr4.focus();
return false;
}
if ((parseInt(cf.sysPoolFinishAddr4.value) < net_start) || (parseInt(cf.sysPoolFinishAddr4.value) >= net_end)) {
cf.sysPoolFinishAddr4.focus();
return false;
}
return true;
}
function getNumOfNetwork(netArray)
{
var getNum=0;
getNum=netArray[0]*255*255*255;
getNum+=netArray[1]*255*255;
getNum+=netArray[2]*255;
getNum+=netArray[3];
return getNum;
}
