<<<<<<< HEAD
function check_reservation_add(cf,flag)
{
var rsvipaddr = new Array();
if( array_num == 64 && flag== 'add')
{
 alert(reservation_length_64);
 return false;
}

rsvipaddr = cf.reservation_ipaddr1.value+'.'+cf.reservation_ipaddr2.value+'.'+cf.reservation_ipaddr3.value+'.'+cf.reservation_ipaddr4.value;
if(cf.device.value == "")
{
alert(device_name_null);
return false;
}
for(i=0;i<cf.device.value.length;i++)
 { 
 if(isValidChar(cf.device.value.charCodeAt(i))==false)
 {
 alert(device_name_error);
 return false;
 }
 }

 if(checkipaddr(rsvipaddr)==false)
{
alert(invalid_ip);
return false;
}
 if(cf.this_mac.value.length==12 && cf.this_mac.value.indexOf(":")==-1)
 {
 var mac=cf.this_mac.value; 
 cf.this_mac.value=mac.substr(0,2)+":"+mac.substr(2,2)+":"+mac.substr(4,2)+":"+mac.substr(6,2)+":"+mac.substr(8,2)+":"+mac.substr(10,2);
 
 }
else if ( cf.this_mac.value.split("-").length == 6 )
{
var tmp_mac = cf.this_mac.value.replace(/-/g,":");
cf.this_mac.value=tmp_mac;
}
if(maccheck(cf.this_mac.value) == false)
return false;
if(isSameSubNet(rsvipaddr,lanmask,lanip,lanmask) == false)
{
alert(same_lan_reser_subnet);
return false;
}
var start_array=startip.split('.');
var end_array=endip.split('.');
var msg_ip=rsvip_dhcp_rang+'[ '+startip+' ~ '+endip+' ].';

if(!(parseInt(start_array[3]) <= parseInt(cf.reservation_ipaddr4.value) && parseInt(cf.reservation_ipaddr4.value) <= parseInt(end_array[3])))
{
alert(msg_ip);
return false;
}
for(i=1;i<=array_num;i++)
{
var str = eval ( 'resevArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
if(each_info[2]==cf.device.value && each_info[2]!="<unknown>" && select_editnum!=i)
{
alert(device_name_dup);
return false;
}
if( rsvipaddr == each_info[0] && select_editnum!=i) 
{
alert(ip_dup);
return false;
}
if( cf.this_mac.value.toUpperCase() == each_info[1].toUpperCase() && select_editnum!=i)
{
alert(mac_dup);
return false;
}
}
else
{
if(each_info[2]==cf.device.value && cf.device.value !="<unknown>")
{
alert(device_name_dup);
return false;
}
if( rsvipaddr == each_info[0])
{
alert(ip_dup);
return false;
}
if( cf.this_mac.value.toUpperCase() == each_info[1].toUpperCase())
{
alert(mac_dup);
return false;
}
}
}
cf.reservation_ipaddr.value=rsvipaddr;
return true;
}
function data_select(num)
{
var cf=document.forms[0];
cf.device.value=show_name_array[num].replace(/&lt;/g,"<").replace(/&gt;/g,">");
cf.this_mac.value=show_mac_array[num];
 var ip_array=show_ip_array[num].split('.');
 cf.reservation_ipaddr1.value=ip_array[0];
 cf.reservation_ipaddr2.value=ip_array[1];
 cf.reservation_ipaddr3.value=ip_array[2];
 cf.reservation_ipaddr4.value=ip_array[3];
}
=======
function check_reservation_add(cf,flag)
{
var rsvipaddr = new Array();
if( array_num == 64 && flag== 'add')
{
 alert(reservation_length_64);
 return false;
}

rsvipaddr = cf.reservation_ipaddr1.value+'.'+cf.reservation_ipaddr2.value+'.'+cf.reservation_ipaddr3.value+'.'+cf.reservation_ipaddr4.value;
if(cf.device.value == "")
{
alert(device_name_null);
return false;
}
for(i=0;i<cf.device.value.length;i++)
 { 
 if(isValidChar(cf.device.value.charCodeAt(i))==false)
 {
 alert(device_name_error);
 return false;
 }
 }

 if(checkipaddr(rsvipaddr)==false)
{
alert(invalid_ip);
return false;
}
 if(cf.this_mac.value.length==12 && cf.this_mac.value.indexOf(":")==-1)
 {
 var mac=cf.this_mac.value; 
 cf.this_mac.value=mac.substr(0,2)+":"+mac.substr(2,2)+":"+mac.substr(4,2)+":"+mac.substr(6,2)+":"+mac.substr(8,2)+":"+mac.substr(10,2);
 
 }
else if ( cf.this_mac.value.split("-").length == 6 )
{
var tmp_mac = cf.this_mac.value.replace(/-/g,":");
cf.this_mac.value=tmp_mac;
}
if(maccheck(cf.this_mac.value) == false)
return false;
if(isSameSubNet(rsvipaddr,lanmask,lanip,lanmask) == false)
{
alert(same_lan_reser_subnet);
return false;
}
var start_array=startip.split('.');
var end_array=endip.split('.');
var msg_ip=rsvip_dhcp_rang+'[ '+startip+' ~ '+endip+' ].';

if(!(parseInt(start_array[3]) <= parseInt(cf.reservation_ipaddr4.value) && parseInt(cf.reservation_ipaddr4.value) <= parseInt(end_array[3])))
{
alert(msg_ip);
return false;
}
for(i=1;i<=array_num;i++)
{
var str = eval ( 'resevArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
if(each_info[2]==cf.device.value && each_info[2]!="<unknown>" && select_editnum!=i)
{
alert(device_name_dup);
return false;
}
if( rsvipaddr == each_info[0] && select_editnum!=i) 
{
alert(ip_dup);
return false;
}
if( cf.this_mac.value.toUpperCase() == each_info[1].toUpperCase() && select_editnum!=i)
{
alert(mac_dup);
return false;
}
}
else
{
if(each_info[2]==cf.device.value && cf.device.value !="<unknown>")
{
alert(device_name_dup);
return false;
}
if( rsvipaddr == each_info[0])
{
alert(ip_dup);
return false;
}
if( cf.this_mac.value.toUpperCase() == each_info[1].toUpperCase())
{
alert(mac_dup);
return false;
}
}
}
cf.reservation_ipaddr.value=rsvipaddr;
return true;
}
function data_select(num)
{
var cf=document.forms[0];
cf.device.value=show_name_array[num].replace(/&lt;/g,"<").replace(/&gt;/g,">");
cf.this_mac.value=show_mac_array[num];
 var ip_array=show_ip_array[num].split('.');
 cf.reservation_ipaddr1.value=ip_array[0];
 cf.reservation_ipaddr2.value=ip_array[1];
 cf.reservation_ipaddr3.value=ip_array[2];
 cf.reservation_ipaddr4.value=ip_array[3];
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
