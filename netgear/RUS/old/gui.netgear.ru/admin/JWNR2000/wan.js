function checkwan()
{
var cf = document.forms[0];
if(basic_type == "1")
{
 if(!((cf.wan_mtu1.value<=1500)&&(cf.wan_mtu1.value>=616)))
 {
alert(mtu_616_1500);
return false;
}
}
else if(ppp_login_type == "0" || ppp_login_type == "3")
{
if(!((cf.wan_mtu1.value<=1492)&&(cf.wan_mtu1.value>=616)))
 {
 alert(mtu_616_1492);
 return false;
 }
}
else if(ppp_login_type == "1" )
{
if(!((cf.wan_mtu1.value<=1450)&&(cf.wan_mtu1.value>=616)))
 {
 alert(mtu_616_1450);
 return false;
 }
}
else
{
if(!((cf.wan_mtu1.value<=1500)&&(cf.wan_mtu1.value>=616)))
 {
 alert(mtu_616_1500);
 return false;
 }
}
/*
if (cf.dod.checked == true)
 cf.dod_value.value = 1;
else
cf.dod_value.value = 0;
*/
if (cf.disable_spi.checked == false)
cf.spi_value.value = 1;
else
cf.spi_value.value = 0;
if (cf.dmz_enable.checked == true)
{
cf.dmz_value.value = 1;
cf.dmz_ip.value = cf.dmzip1.value + '.' + cf.dmzip2.value + '.' + cf.dmzip3.value + '.' + cf.dmzip4.value; 
if(checkipaddr(cf.dmz_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameIp(lan_ip,cf.dmz_ip.value) == true)
 {
 alert(same_dmz_lan_ip);
 return false;
 }
}
else
cf.dmz_value.value = 0;
if (cf.rspToPing.checked == true)
cf.rspToPing_value.value = 1;
else
cf.rspToPing_value.value = 0;
if (cf.igmp.checked == true)
cf.igmp_enable.value = 0;
else
cf.igmp_enable.value = 1;
if (cf.disable_sipalg.checked == true)
cf.sipalg_value.value = 1;
else
cf.sipalg_value.value = 0;
if (cf.enable_ipv6_passthru.checked == true)
cf.ipv6_passthru_value.value = 1;
else
cf.ipv6_passthru_value.value = 0;
return true;
}
function checkdmzip()
{
var cf = document.forms[0];
if(!cf.dmz_enable.checked)
cf.dmzip4.disabled = true;
else
cf.dmzip4.disabled = false;
}
