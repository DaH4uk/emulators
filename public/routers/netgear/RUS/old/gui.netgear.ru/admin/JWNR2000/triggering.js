function checkPort(name, port)
{
var msg = "";
var portNum = parseInt(port);
if (port.length == 0)
{
msg = name + trigger_null;
alert(msg);
return false;
}
if (isNaN(portNum) || portNum < 1 || portNum > 65535)
{
msg = trigger_invalid + name + trigger_1_65535;
alert(msg);
return false
}
return true;
}
function setsrc(cf)
{
var type = cf.src_ip_type.selectedIndex;
if (type == 1)
{
cf.src_ip1.disabled = false;
cf.src_ip2.disabled = false;
cf.src_ip3.disabled = false;
cf.src_ip4.disabled = false;
}
else
{
cf.src_ip1.disabled = true;
cf.src_ip2.disabled = true;
cf.src_ip3.disabled = true;
cf.src_ip4.disabled = true;
}
}
function check_triggering_add(cf,flag)
{
var all_port_num=0;
if(flag== 'add')
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
constart_port=each_info[6];
conend_port=each_info[7];
all_port_num=all_port_num+parseInt(conend_port)-parseInt(constart_port)+1;
}
else if(flag == 'edit')
for(i=1;i<=trigger_array_num;i++)
{
if(select_editnum!=i)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
constart_port=each_info[6];
conend_port=each_info[7];
all_port_num=all_port_num+parseInt(conend_port)-parseInt(constart_port)+1;
}
}

if(trigger_array_num==20 && flag== 'add')
{
alert(trigger_length_20);
return false;
}
if(cf.service_name.value == "" )
{
alert(trigger_ser_name_null);
return false;
}
for(i=0;i<cf.service_name.value.length;i++)
 {
 if(isValidChar_space(cf.service_name.value.charCodeAt(i))==false)
 {
 alert(servname_not_allowed);
 return false;
 }
 }
cf.pt_name.value=cf.service_name.value.replace(/ /g, "&harr;");
for(i=1;i<=trigger_array_num;i++)
{
var str = eval ( 'triggeringArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
if( cf.pt_name.value == each_info[0] && select_editnum!=i )
{
alert(trigger_ser_name_dup);
return false;
}
}
else
{
if( cf.pt_name.value == each_info[0])
{
alert(trigger_ser_name_dup);
return false;
}
}
}
var type = cf.src_ip_type.selectedIndex;
if (type == 0)
cf.service_ip.value="any";
else
{
cf.service_ip.value=cf.src_ip1.value+'.'+cf.src_ip2.value+'.'+cf.src_ip3.value+'.'+cf.src_ip4.value;
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
}
if(checkPort("Triggering Port", cf.trigger_port.value)==false)
return false;
if(cf.trigger_port.value == "21" )
{
alert(trigger_port_invalid_21);
return false;
}
if(checkPort("Starting Port", cf.portstart.value)==false)
return false;

if (cf.portend.value.length > 0)
{
if(checkPort("Ending Port", cf.portend.value)==false)
return false;
if (parseInt(cf.portend.value) < parseInt(cf.portstart.value))
{
alert(trigger_invalid_port_rang);
return false;
}
}
if (cf.portend.value.length == 0)
cf.portend.value = cf.portstart.value;
var now_port_num=parseInt(cf.portend.value)-parseInt(cf.portstart.value)+1;
all_port_num=all_port_num+now_port_num;
if( all_port_num > 256)
{
alert(trigger_port_less256);
return false;
}
var input_out_sertype=cf.protocol.value;
var input_trigger_port=cf.trigger_port.value;
var input_start_port=cf.portstart.value;
var input_end_port=cf.portend.value;
var input_sertype=cf.in_port_type.value;
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
else if (!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)))
{
if ( sertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == sertype )
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
con_out_sertype=each_info[3];
con_trigger_port=each_info[4];
consertype=each_info[5];
constart_port=each_info[6];
conend_port=each_info[7];
if (flag == 'edit')
{
if ((!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))&& select_editnum!=i)
{
if ( (consertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == consertype) && select_editnum != i )
{
alert(invalid_port_used);
return false;
}
}
}
else
{
/*
if (( input_out_sertype == con_out_sertype ) && (parseInt(input_trigger_port) == parseInt(con_trigger_port) ))
{
alert(invalid_port_used);
return false;
}
*/
if (!(parseInt(conend_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(constart_port) ))
{
if ( consertype == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == consertype )
{
alert(invalid_port_used);
return false;
}
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
if (!( parseInt(upnp_ext)<parseInt(input_start_port) || parseInt(input_end_port)<parseInt(upnp_ext) ))
{
if ( upnp_protocal == "TCP/UDP" || input_sertype == "TCP/UDP" || input_sertype == upnp_protocal )
{
alert(invalid_port_used);
return false;
}
}
}
//check with remote
if(endis_remote=="1")
if (input_sertype!="UDP")
{
if (!(parseInt(remote_port)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(remote_port)) && remote_port!="")
{
alert(invalid_port_used);
return false;
}
}
//port 53
 if(parseInt(input_start_port)<=53 && parseInt(input_end_port)>=53)
 {
 alert(invalid_port_used);
 return false;
 }
//enable ntp
 if( parseInt(input_start_port)<=123 && parseInt(input_end_port)>=123 && endis_ntp == "1")
 {
 alert(invalid_port_used);
 return false;
 }
//enable upnp
 if( parseInt(input_start_port)<=1900 && parseInt(input_end_port)>=1900 && endis_upnp == "1")
 {
 alert(invalid_port_used);
 return false;
 }
//enable bigpond
 if( parseInt(input_start_port)<=5050 && parseInt(input_end_port)>=5050 && info_get_wanproto == "bigpond")
 {
 alert(invalid_port_used);
 return false;
 }

//return true;
}
function check_triggering_edit(cf)
{
if( array_num == "" )
{
location.href="edit_fail.html"
return false;
}
var count_select=0;
var select_num;
if( array_num == 1)
{
if(cf.select_triggering.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<array_num;i++)
if(cf.select_triggering[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
location.href="edit_fail.html"
return false;
}
else
{
cf.select_edit.value=select_num;
cf.submit_flag.value="triggering_editnum";
cf.action="setobject.cgi@_2Fcgi-bin_2Ftriggering_edit.html";
return true;
}
}
function check_triggering_del(cf)
{
if( array_num == "" )
{
location.href="del_fail.html"
return false;
}
var count_select=0;
var select_num;
if( array_num == 1)
{
if(cf.select_triggering.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<array_num;i++)
if(cf.select_triggering[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
location.href="del_fail.html"
return false;
}
else
{
cf.select_del.value=select_num;
cf.submit_flag.value="triggering_del";
cf.action="setobject.cgi@_2Fcgi-bin_2Ftriggering.html";
return true;
}
}
function check_triggering_apply(cf)
{
if(cf.fwpt_disabled.checked == true)
cf.disable_trigger_on.value=1;
else
cf.disable_trigger_on.value=0;
if(cf.fwpt_timeout.value=="")
{
alert(timeout_null);
return false;
}
if(array_num == 0)
{}
else if ( array_num == 1)
{
if(cf.enable_triggering.checked == true)
cf.endis_trigger_value.value="1";
else
cf.endis_trigger_value.value="0";
}
else for(i=0;i<array_num;i++)
{
if(cf.enable_triggering[i].checked == true)
cf.endis_trigger_value.value=cf.endis_trigger_value.value+"1,";
else
cf.endis_trigger_value.value=cf.endis_trigger_value.value+"0,";
}
cf.submit_flag.value="triggering_apply";
cf.action="setobject.cgi@_2Fcgi-bin_2Ftriggering.html";
return true;
}
