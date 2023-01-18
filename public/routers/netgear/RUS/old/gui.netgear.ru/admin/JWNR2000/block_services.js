var isIE = document.all;
var disable = false;
var serv_array=[["0","","","","0"],["0","5190","5190","AIM","1"],["1","47624","47624","Age-of-Empire","1"],["0","20","21","FTP","1"],["0","80","80","HTTP","1"],["0","23566","23566","ICUII","1"],["0","6670","6670","IP_Phone","1"],["0","1720","1720","NetMeeting","1"],["0","119","119","News","1"],["0","1723","1723","PPTP","1"],["2","27960","27960","QuakeII/III","1"],["2","6970","7170","Real-Audio","1"],["0","23","23","Telnet","1"]];
function pi(val)
{
 return parseInt(val,10);
} 
function chg_by_service(is_load,cf)
{
var s = cf.service_type.selectedIndex;
var len = cf.service_type.options.length;
if(s<0)
{
s = cf.service_type.selectedIndex = 0;
}
if((s==len-1)&&(is_load == 1))//user defined
return;
disable = (pi(serv_array[s][4])==1)?true:false;
cf.protocol.selectedIndex = pi(serv_array[s][0]);
cf.portstart.value = serv_array[s][1];
cf.portend.value = serv_array[s][2];
cf.userdefined.value = serv_array[s][3];
if(isIE)
{
cf.protocol.disabled = disable; 
cf.portstart.disabled = disable;
cf.portend.disabled = disable;
cf.userdefined.disabled = disable;
}
}
function change_radio(check,cf)
{
if(check == 0)
{
cf.only_ip1.disabled = true;
cf.only_ip2.disabled = true;
cf.only_ip3.disabled = true;
cf.only_ip4.disabled = false;
cf.start_ip1.disabled =true;
cf.start_ip2.disabled =true;
cf.start_ip3.disabled =true;
cf.start_ip4.disabled =true;
cf.end_ip1.disabled =true;
cf.end_ip2.disabled =true;
cf.end_ip3.disabled =true;
cf.end_ip4.disabled =true;
}
else if (check == 1)
{
cf.only_ip1.disabled = true;
 cf.only_ip2.disabled = true;
 cf.only_ip3.disabled = true;
 cf.only_ip4.disabled = true;
 cf.start_ip1.disabled =true;
 cf.start_ip2.disabled =true;
 cf.start_ip3.disabled =true;
 cf.start_ip4.disabled =false;
 cf.end_ip1.disabled =true;
 cf.end_ip2.disabled =true;
 cf.end_ip3.disabled =true;
 cf.end_ip4.disabled =false;
}
else
{
cf.only_ip1.disabled = true;
 cf.only_ip2.disabled = true;
 cf.only_ip3.disabled = true;
 cf.only_ip4.disabled = true;
cf.start_ip1.disabled =true;
 cf.start_ip2.disabled =true;
 cf.start_ip3.disabled =true;
 cf.start_ip4.disabled =true;
 cf.end_ip1.disabled =true;
 cf.end_ip2.disabled =true;
 cf.end_ip3.disabled =true;
 cf.end_ip4.disabled =true;
}
}
function check_block_services_add(cf,flag)
{
if(flag == 'add' && array_num == 20 )
{
alert(blockser_length_20);
return false;
}
if(cf.portstart.value==""||cf.portend.value=="")
{
alert(invalid_port);
return false;
}
txt=cf.portstart.value;
for(i=0;i<txt.length;i++)
{
c=txt.charAt(i);
if("0123456789".indexOf(c,0)<0)
{
alert(invalid_start_port);
return false;
}
}
txt=cf.portend.value;
for(i=0;i<txt.length;i++)
{
c=txt.charAt(i);
if("0123456789".indexOf(c,0)<0)
{
alert(invalid_end_port);
return false;
}
}
if(parseInt(cf.portstart.value)<1||parseInt(cf.portstart.value)>65534)
{
alert(invalid_start_port);
return false;
}
if(parseInt(cf.portend.value)<1||parseInt(cf.portend.value)>65534)
{
alert(invalid_end_port);
return false;
}
if(parseInt(cf.portend.value)<parseInt(cf.portstart.value))
{
alert(end_port_greater);
return false;
}
txt=cf.userdefined.value;
if(txt=="")
{
alert(invalid_user_type);
return false;
}
for(i=0;i<cf.userdefined.value.length;i++)
 {
 if(isValidChar_space(cf.userdefined.value.charCodeAt(i))==false)
 //if(isValidChar(txt.charCodeAt(i))==false)
 {
 alert(invalid_user_type);
 return false;
 }
 }
cf.user_type.value=cf.userdefined.value.replace(/ /g, "&harr;");
for(i=1;i<=array_num;i++)
 {
var str = eval ( 'block_servicesArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
 if(cf.service_type.value != "User_Defined")
{
if((cf.service_type.value == each_info[0]||cf.user_type.value == each_info[4]) && i!=select_edit )
{
alert(service_type_dup);
return false;
}
}
else
{
if(cf.user_type.value == each_info[4] && i!=select_edit)
{
alert(service_type_dup);
return false;
}
}
}
else
{
if(cf.service_type.value != "User_Defined")
{
if( cf.service_type.value == each_info[0]||cf.user_type.value == each_info[4])
{
alert(service_type_dup);
return false;
}
}
else
{
if(cf.user_type.value == each_info[4])
{
alert(service_type_dup);
return false;
}
}
}
 }
cf.hidden_protocol.value = cf.protocol.value; 
cf.hidden_portstart.value = cf.portstart.value;
cf.hidden_portend.value = cf.portend.value;
//cf.hidden_userdefined.value = cf.userdefined.value;
cf.only_ip.value=cf.only_ip1.value+'.'+cf.only_ip2.value+'.'+cf.only_ip3.value+'.'+cf.only_ip4.value;
cf.iprange_start.value=cf.start_ip1.value+'.'+cf.start_ip2.value+'.'+cf.start_ip3.value+'.'+cf.start_ip4.value;
cf.iprange_end.value=cf.end_ip1.value+'.'+cf.end_ip2.value+'.'+cf.end_ip3.value+'.'+cf.end_ip4.value;
if(cf.iptype[0].checked == true)
{
 if(checkipaddr(cf.only_ip.value)==false)
 {
  alert(invalid_ip);
 return false;
 }
 if(isSameIp(cf.only_ip.value,lan_ip)==true)
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.only_ip.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(diff_lan_this_subnet);
return false;
}
cf.iplist.value=cf.only_ip.value;
}
else if(cf.iptype[1].checked == true)
{
if(checkipaddr(cf.iprange_start.value)==false)
 {
alert(invalid_ip);
 return false;
 }
if(checkipaddr(cf.iprange_end.value)==false)
 {
alert(invalid_ip);
 return false;
 }
if(cp_ip2(cf.iprange_start.value,cf.iprange_end.value)==false)
{
alert(invalid_ip_rang);
return false;
}
if((cp_ip2(cf.iprange_start.value,lan_ip)==true) && (cp_ip2(lan_ip,cf.iprange_end.value)==true))
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.iprange_start.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(diff_lan_ipstart_subnet);
return false;
}
if(isSameSubNet(cf.iprange_end.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(diff_lan_ipend_subnet);
return false;
}
cf.iplist.value=cf.iprange_start.value+'-'+cf.iprange_end.value;
}
else
cf.iplist.value="all";
return true;
}
function check_block_services_apply(cf)
{
cf.submit_flag.value="block_services_apply";
cf.action="setobject.cgi@_2Fcgi-bin_2Fblock_services.html";
return true;
}
