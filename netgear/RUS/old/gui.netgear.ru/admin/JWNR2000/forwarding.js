<<<<<<< HEAD
var isIE = document.all;
var disable = false;
var serv_array=[["TCP","20","21","FTP","1"],["TCP","80","80","HTTP","1"],["TCP","23566","23566","ICUII","1"],["TCP","6670","6670","IP_Phone","1"],["TCP","1720","1720","NetMeeting","1"],["TCP","119","119","News","1"],["TCP","1723","1723","PPTP","1"],["TCP/UDP","27960","27960","QuakeII/III","1"],["TCP/UDP","6970","7170","Real-Audio","1"],["TCP","23","23","Telnet","1"]];
function show_servip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.SV_IP1.value=lanip_array[0];
cf.SV_IP2.value=lanip_array[1];
cf.SV_IP3.value=lanip_array[2];
}
function check_list_length(forward_array_num)
{
var flag1720=0;
for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
serflag=each_info[5];
if(serflag==1)
flag1720=1;
}
if(flag1720 == 0)
{
if(forward_array_num==20)
{
alert(forward_length_20);
return false;
}
}
else
{
if(forward_array_num==21)
{
alert(forward_length_20);
return false;
}
}
}
function check_port(cf)
{
//check port
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
return true;
}
function check_forwarding_add(cf,flag)
{
cf.serflag.value=0;
if( flag != "edit" && check_list_length(forward_array_num)==false)
return false;
txt=cf.service_name.value;
if(txt=="")
{
alert(invalid_ser_name);
return false;
}
for(i=0;i<cf.service_name.value.length;i++)
 {
 if(isValidChar_space(cf.service_name.value.charCodeAt(i))==false)
 {
 alert(invalid_ser_name);
 return false;
 }
 }
cf.portname.value=cf.service_name.value.replace(/ /g, "&harr;");
for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
 if(each_info[0]==cf.portname.value && select_editnum!=i && each_info[5]==0)
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
}
else
{
if(each_info[0]==cf.portname.value)
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
}
 }
if(check_port(cf)==false)
return false;
cf.service_ip.value=cf.ser_ip1.value+'.'+cf.ser_ip2.value+'.'+cf.ser_ip3.value+'.'+cf.ser_ip4.value;
if(checkipaddr(cf.service_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(cf.service_ip.value,lan_subnet,lan_ip,lan_subnet)== false)
 {
alert(diff_lan_this_subnet);
 return false;
 }
 if(isSameIp(cf.service_ip.value,lan_ip) == true)
 {
 alert(same_ip_lan);
 return false;
 }
var input_start_port=cf.portstart.value;
var input_end_port=cf.portend.value;
var input_sertype=cf.protocol.value;
var input_ip=cf.service_ip.value;
//port_forwarding
for(i=1;i<=forward_array_num;i++)
{
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
sertype=each_info[1];
startport=each_info[2];
endport=each_info[3];
serflag=each_info[5];
if(sertype=="UDP"&&serflag=="1")
{
}
else if (sertype=="TCP/UDP"||sertype==input_sertype||input_sertype=="TCP/UDP")
{
if(flag == 'edit')
{
if ((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i)
{
if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) && input_ip != each_info[4] && select_editnum!=i)
{
alert(invalid_port_used);
return false;
}
}
}
else
if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
{
if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) && input_ip != each_info[4] )
{
alert(invalid_port_used);
return false;
}
}
}
}
//port_triggering
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
triggeringip=each_info[2];
consertype=each_info[5];
constart_port=each_info[6];
conend_port=each_info[7];
if (!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))
{
if (( consertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == consertype ) && (triggeringip == "any" || input_ip != triggeringip ))
{
alert(invalid_port_used);
return false;
}
}
}
//upnp
for(i=1;i<=upnp_array_num;i++)
{
var str = eval ( 'upnpArray' + i );
var each_info=str.split(';');
upnp_protocal=each_info[1];
upnp_ext=each_info[3];
upnp_ip=each_info[4];
if (!( parseInt(upnp_ext)<parseInt(input_start_port) || parseInt(input_end_port)<parseInt(upnp_ext) ))
{
if (( upnp_protocal == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == upnp_protocal ) && input_ip != upnp_ip)
{
alert(invalid_port_used);
return false;
}
}
}
//check with remote
if(endis_remote=="1")
if (cf.protocol.value!="UDP")
{
if (!(parseInt(remote_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(remote_port)) && remote_port!="")
{
alert(invalid_port_used);
return false;
}
}
//set NetMeeting
if (cf.protocol.value !="UDP")
if (parseInt(cf.portend.value)>="1720"&&parseInt(cf.portstart.value)<="1720")
cf.serflag.value=1;
else
cf.serflag.value=0;
//port 53
 /*if(parseInt(input_start_port)<=53 && parseInt(input_end_port)>=53)
 {
 alert(invalid_port_used);
 return false;
 }*/
//enable ntp
 if( parseInt(input_start_port)<=123 && parseInt(input_end_port)>=123 && endis_ntp == "1")
 {
 alert(invalid_port_used);
 return false;
 }
//enable upnp
 /*if( parseInt(input_start_port)<=1900 && parseInt(input_end_port)>=1900 && endis_upnp == "1")
 {
 alert(invalid_port_used);
 return false;
 }*/
//enable bigpond
if( parseInt(input_start_port)<=5050 && parseInt(input_end_port)>=5050 && info_get_wanproto == "bigpond")
 {
 alert(invalid_port_used);
 return false;
 }

return true;
}
function check_forwarding_edit(cf)
{
if( forward_array_num == "" )
{
location.href="edit_fail.html"
return false;
}
var count_select=0;
var select_num;
if( forward_array_num == 1)
{
if(cf.select_forwarding.checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding.value);
}
}
else for(i=0;i<forward_array_num;i++)
if(cf.select_forwarding[i].checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding[i].value);
}
if(count_select==0)
{
location.href="edit_fail.html"
return false;
}
else
{
cf.select_edit.value=select_num;
cf.submit_flag.value="forwarding_editnum";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding_edit.html";
return true;
}
}
function check_forwarding_del(cf)
{
if( forward_array_num == "" )
{
location.href="del_fail.html"
return false;
}
var count_select=0;
var select_num;
if( forward_array_num == 1)
{
if(cf.select_forwarding.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<forward_array_num;i++)
if(cf.select_forwarding[i].checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding[i].value);
}
if(count_select==0)
{
location.href="del_fail.html"
return false;
}
else
{
cf.select_del.value=select_num;
cf.submit_flag.value="forwarding_del";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding.html";
return true;
}
}
function Check_add(cf) 
{
cf.serflag.value=0;
if (forward_array_num >= 20)
{
alert(forward_length_20);
return false;
}
cf.service_ip.value=cf.SV_IP1.value+'.'+cf.SV_IP2.value+'.'+cf.SV_IP3.value+'.'+cf.SV_IP4.value;
if(checkipaddr(cf.service_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(cf.service_ip.value,lan_subnet,lan_ip,lan_subnet)== false)
 {
 alert(diff_lan_this_subnet);
 return false;
 }
 if(isSameIp(cf.service_ip.value,lan_ip) == true)
 {
 alert(same_ip_lan);
 return false; 
}
var selectService=cf.svs_gm.options[cf.svs_gm.selectedIndex].value;
var s = cf.svs_gm.selectedIndex;
 for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
 if(each_info[0]==serv_array[s][3])
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
 }

cf.hidden_protocol.value = serv_array[s][0];
cf.hidden_portstart.value = serv_array[s][1];
cf.hidden_portend.value = serv_array[s][2];
cf.hidden_service_name.value = serv_array[s][3];
var input_sername=serv_array[s][3];
var input_sertype=serv_array[s][0];
var input_start_port=serv_array[s][1];
var input_end_port=serv_array[s][2];
//port_forwarding
for(i=1;i<=forward_array_num;i++)
{
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
sertype=each_info[1];
startport=each_info[2];
endport=each_info[3];
serflag=each_info[5];
if(sertype=="UDP"&&serflag=="1")
{
}
else if (sertype=="TCP/UDP"||sertype==input_sertype||input_sertype=="TCP/UDP")
{
if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
{
alert(invalid_port_used);
return false;
}
}
}
//port_triggering
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
constart_port=each_info[6];
conend_port=each_info[7];
if (!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))
{
alert(invalid_port_used);
return false;
}
}
//upnp
for(i=1;i<=upnp_array_num;i++)
{
var str = eval ( 'upnpArray' + i );
var each_info=str.split(';');
upnp_ext=each_info[3];
if (!( parseInt(upnp_ext)<parseInt(input_start_port) || parseInt(input_end_port)<parseInt(upnp_ext) ))
{
alert(invalid_port_used);
return false;
}
}
//check with remote
if (!(parseInt(remote_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(remote_port)) && remote_port!="")
{
alert(invalid_port_used);
return false;
}
if(cf.hidden_service_name.value=="NetMeeting")
cf.serflag.value=1;
else
cf.serflag.value=0;

cf.submit_flag.value="forwarding_hidden_add";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding.html";
return true;
}
=======
var isIE = document.all;
var disable = false;
var serv_array=[["TCP","20","21","FTP","1"],["TCP","80","80","HTTP","1"],["TCP","23566","23566","ICUII","1"],["TCP","6670","6670","IP_Phone","1"],["TCP","1720","1720","NetMeeting","1"],["TCP","119","119","News","1"],["TCP","1723","1723","PPTP","1"],["TCP/UDP","27960","27960","QuakeII/III","1"],["TCP/UDP","6970","7170","Real-Audio","1"],["TCP","23","23","Telnet","1"]];
function show_servip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.SV_IP1.value=lanip_array[0];
cf.SV_IP2.value=lanip_array[1];
cf.SV_IP3.value=lanip_array[2];
}
function check_list_length(forward_array_num)
{
var flag1720=0;
for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
serflag=each_info[5];
if(serflag==1)
flag1720=1;
}
if(flag1720 == 0)
{
if(forward_array_num==20)
{
alert(forward_length_20);
return false;
}
}
else
{
if(forward_array_num==21)
{
alert(forward_length_20);
return false;
}
}
}
function check_port(cf)
{
//check port
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
return true;
}
function check_forwarding_add(cf,flag)
{
cf.serflag.value=0;
if( flag != "edit" && check_list_length(forward_array_num)==false)
return false;
txt=cf.service_name.value;
if(txt=="")
{
alert(invalid_ser_name);
return false;
}
for(i=0;i<cf.service_name.value.length;i++)
 {
 if(isValidChar_space(cf.service_name.value.charCodeAt(i))==false)
 {
 alert(invalid_ser_name);
 return false;
 }
 }
cf.portname.value=cf.service_name.value.replace(/ /g, "&harr;");
for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
 if(each_info[0]==cf.portname.value && select_editnum!=i && each_info[5]==0)
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
}
else
{
if(each_info[0]==cf.portname.value)
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
}
 }
if(check_port(cf)==false)
return false;
cf.service_ip.value=cf.ser_ip1.value+'.'+cf.ser_ip2.value+'.'+cf.ser_ip3.value+'.'+cf.ser_ip4.value;
if(checkipaddr(cf.service_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(cf.service_ip.value,lan_subnet,lan_ip,lan_subnet)== false)
 {
alert(diff_lan_this_subnet);
 return false;
 }
 if(isSameIp(cf.service_ip.value,lan_ip) == true)
 {
 alert(same_ip_lan);
 return false;
 }
var input_start_port=cf.portstart.value;
var input_end_port=cf.portend.value;
var input_sertype=cf.protocol.value;
var input_ip=cf.service_ip.value;
//port_forwarding
for(i=1;i<=forward_array_num;i++)
{
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
sertype=each_info[1];
startport=each_info[2];
endport=each_info[3];
serflag=each_info[5];
if(sertype=="UDP"&&serflag=="1")
{
}
else if (sertype=="TCP/UDP"||sertype==input_sertype||input_sertype=="TCP/UDP")
{
if(flag == 'edit')
{
if ((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i)
{
if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) && input_ip != each_info[4] && select_editnum!=i)
{
alert(invalid_port_used);
return false;
}
}
}
else
if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
{
if ( (sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype) && input_ip != each_info[4] )
{
alert(invalid_port_used);
return false;
}
}
}
}
//port_triggering
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
triggeringip=each_info[2];
consertype=each_info[5];
constart_port=each_info[6];
conend_port=each_info[7];
if (!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))
{
if (( consertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == consertype ) && (triggeringip == "any" || input_ip != triggeringip ))
{
alert(invalid_port_used);
return false;
}
}
}
//upnp
for(i=1;i<=upnp_array_num;i++)
{
var str = eval ( 'upnpArray' + i );
var each_info=str.split(';');
upnp_protocal=each_info[1];
upnp_ext=each_info[3];
upnp_ip=each_info[4];
if (!( parseInt(upnp_ext)<parseInt(input_start_port) || parseInt(input_end_port)<parseInt(upnp_ext) ))
{
if (( upnp_protocal == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == upnp_protocal ) && input_ip != upnp_ip)
{
alert(invalid_port_used);
return false;
}
}
}
//check with remote
if(endis_remote=="1")
if (cf.protocol.value!="UDP")
{
if (!(parseInt(remote_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(remote_port)) && remote_port!="")
{
alert(invalid_port_used);
return false;
}
}
//set NetMeeting
if (cf.protocol.value !="UDP")
if (parseInt(cf.portend.value)>="1720"&&parseInt(cf.portstart.value)<="1720")
cf.serflag.value=1;
else
cf.serflag.value=0;
//port 53
 /*if(parseInt(input_start_port)<=53 && parseInt(input_end_port)>=53)
 {
 alert(invalid_port_used);
 return false;
 }*/
//enable ntp
 if( parseInt(input_start_port)<=123 && parseInt(input_end_port)>=123 && endis_ntp == "1")
 {
 alert(invalid_port_used);
 return false;
 }
//enable upnp
 /*if( parseInt(input_start_port)<=1900 && parseInt(input_end_port)>=1900 && endis_upnp == "1")
 {
 alert(invalid_port_used);
 return false;
 }*/
//enable bigpond
if( parseInt(input_start_port)<=5050 && parseInt(input_end_port)>=5050 && info_get_wanproto == "bigpond")
 {
 alert(invalid_port_used);
 return false;
 }

return true;
}
function check_forwarding_edit(cf)
{
if( forward_array_num == "" )
{
location.href="edit_fail.html"
return false;
}
var count_select=0;
var select_num;
if( forward_array_num == 1)
{
if(cf.select_forwarding.checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding.value);
}
}
else for(i=0;i<forward_array_num;i++)
if(cf.select_forwarding[i].checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding[i].value);
}
if(count_select==0)
{
location.href="edit_fail.html"
return false;
}
else
{
cf.select_edit.value=select_num;
cf.submit_flag.value="forwarding_editnum";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding_edit.html";
return true;
}
}
function check_forwarding_del(cf)
{
if( forward_array_num == "" )
{
location.href="del_fail.html"
return false;
}
var count_select=0;
var select_num;
if( forward_array_num == 1)
{
if(cf.select_forwarding.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<forward_array_num;i++)
if(cf.select_forwarding[i].checked == true)
{
count_select++;
select_num=parseInt(cf.select_forwarding[i].value);
}
if(count_select==0)
{
location.href="del_fail.html"
return false;
}
else
{
cf.select_del.value=select_num;
cf.submit_flag.value="forwarding_del";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding.html";
return true;
}
}
function Check_add(cf) 
{
cf.serflag.value=0;
if (forward_array_num >= 20)
{
alert(forward_length_20);
return false;
}
cf.service_ip.value=cf.SV_IP1.value+'.'+cf.SV_IP2.value+'.'+cf.SV_IP3.value+'.'+cf.SV_IP4.value;
if(checkipaddr(cf.service_ip.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameSubNet(cf.service_ip.value,lan_subnet,lan_ip,lan_subnet)== false)
 {
 alert(diff_lan_this_subnet);
 return false;
 }
 if(isSameIp(cf.service_ip.value,lan_ip) == true)
 {
 alert(same_ip_lan);
 return false; 
}
var selectService=cf.svs_gm.options[cf.svs_gm.selectedIndex].value;
var s = cf.svs_gm.selectedIndex;
 for(i=1;i<=forward_array_num;i++)
 {
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
 if(each_info[0]==serv_array[s][3])
 {
 alert(forwarding_ser_name_dup);
 return false;
 }
 }

cf.hidden_protocol.value = serv_array[s][0];
cf.hidden_portstart.value = serv_array[s][1];
cf.hidden_portend.value = serv_array[s][2];
cf.hidden_service_name.value = serv_array[s][3];
var input_sername=serv_array[s][3];
var input_sertype=serv_array[s][0];
var input_start_port=serv_array[s][1];
var input_end_port=serv_array[s][2];
//port_forwarding
for(i=1;i<=forward_array_num;i++)
{
var str = eval ( 'forwardingArray' + i );
var each_info=str.split(' ');
sertype=each_info[1];
startport=each_info[2];
endport=each_info[3];
serflag=each_info[5];
if(sertype=="UDP"&&serflag=="1")
{
}
else if (sertype=="TCP/UDP"||sertype==input_sertype||input_sertype=="TCP/UDP")
{
if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
{
alert(invalid_port_used);
return false;
}
}
}
//port_triggering
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
constart_port=each_info[6];
conend_port=each_info[7];
if (!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))
{
alert(invalid_port_used);
return false;
}
}
//upnp
for(i=1;i<=upnp_array_num;i++)
{
var str = eval ( 'upnpArray' + i );
var each_info=str.split(';');
upnp_ext=each_info[3];
if (!( parseInt(upnp_ext)<parseInt(input_start_port) || parseInt(input_end_port)<parseInt(upnp_ext) ))
{
alert(invalid_port_used);
return false;
}
}
//check with remote
if (!(parseInt(remote_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(remote_port)) && remote_port!="")
{
alert(invalid_port_used);
return false;
}
if(cf.hidden_service_name.value=="NetMeeting")
cf.serflag.value=1;
else
cf.serflag.value=0;

cf.submit_flag.value="forwarding_hidden_add";
cf.action="setobject.cgi@_2Fcgi-bin_2Fforwarding.html";
return true;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
