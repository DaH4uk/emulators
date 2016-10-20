<<<<<<< HEAD
function getObj(name)
{
 if (document.getElementById)
 {
 return document.getElementById(name);
 }
 else if (document.all)
 {
 return document.all[name];
 }
 else if (document.layers)
 {
 return document.layers[name];
 }
}
function check_qos()
{
var cf=document.forms[0];
if(cf.wmm_enable.checked == true)
cf.qos_endis_wmm.value=1;
else
cf.qos_endis_wmm.value=0;

if(cf.qosEnable.checked == true)
cf.qos_endis_on.value=1;
else
cf.qos_endis_on.value=0;
cf.submit_flag.value="apply_qos";
cf.submit();
}
function change_priority()
{
var cf=document.forms[0];
if( cf.category.selectedIndex == 0)
location.href="qos_adva_add.html";
else if( cf.category.selectedIndex == 1)
location.href="qos_online_add.html";
else if( cf.category.selectedIndex == 2)
location.href="qos_ether_add.html";
else if( cf.category.selectedIndex == 3)
location.href="qos_mac_add.html";
}
function change_serv_adva()
{
var cf=document.forms[0];
if (cf.apps.selectedIndex == 8)
{
cf.name.value='';
cf.priority.selectedIndex=0;
getObj("real_app_port").innerHTML=str_div;
}
else
{
getObj("real_app_port").innerHTML='';
var i=cf.apps.selectedIndex;
cf.name.value=serv_array[i][3];
cf.priority.selectedIndex=serv_array[i][4];
}
}
function change_serv_online()
{
var cf=document.forms[0];
if (cf.apps.selectedIndex == 7)
{
cf.name.value='';
cf.priority.selectedIndex=1;
getObj("real_app_port").innerHTML=str_div;
}
else
{
getObj("real_app_port").innerHTML='';
var i=cf.apps.selectedIndex;
if(serv_array[i][3]=="Counter-Strike")
cf.name.value="Counter Strike";
else if(serv_array[i][3]=="Age-of-Empires")
cf.name.value="Age of Empires";
else if(serv_array[i][3]=="Quake-2")
cf.name.value="Quake 2";
else if(serv_array[i][3]=="Quake-3")
cf.name.value="Quake 3";
else if(serv_array[i][3]=="Unreal-Tourment")
cf.name.value="Unreal Tourment";
else
cf.name.value=serv_array[i][3];
cf.hidden_qos_policy_name.value=serv_array[i][3];
cf.priority.selectedIndex=serv_array[i][4];
}
}
function change_name_online(name)
{
if(name=="Counter-Strike")
new_name="Counter Strike";
else if(name=="Age-of-Empires")
new_name="Age of Empires";
else if(name=="Diablo-II")
new_name="Diablo II";
else if(name=="Half-Life")
new_name="Half Life";
else if(name=="Quake-2")
new_name="Quake 2";
else if(name=="Quake-3")
new_name="Quake 3";
else if(name=="Unreal-Tourment")
new_name="Unreal Tourment";
else if(name=="Return-to-Castle-Wolfenstein")
new_name="Return to Castle Wolfenstein";
else if(name=="LAN_Port_1")
new_name="LAN Port 1";
else if(name=="LAN_Port_2")
new_name="LAN Port 2";
else if(name=="LAN_Port_3")
new_name="LAN Port 3";
else if(name=="LAN_Port_4")
new_name="LAN Port 4";
else if(name=="MSN_messenger")
new_name="MSN messenger";
else if(name=="Yahoo_Messenger")
new_name="Yahoo Messenger";
else if(name=="IP_Phone")
new_name="IP Phone";
else if(name=="Vonage_IP_Phone")
new_name="Vonage IP Phone";
else if(name=="Google_Talk")
new_name="Google Talk";
else if(name=="Netgear_EVA")
new_name="Netgear EVA";
else
new_name=name;
return new_name;
}
function change_serv_ether()
{
var cf=document.forms[0];
if(cf.name.value=="LAN Port 1" ||cf.name.value=="LAN Port 2"||cf.name.value=="LAN Port 3" || cf.name.value=="LAN Port 4" || cf.name.value=="")
{
cf.name.value="LAN Port "+cf.apps.options[cf.apps.selectedIndex].value;
cf.hidden_qos_policy_name.value="LAN_Port_"+cf.apps.options[cf.apps.selectedIndex].value;
}

}
function qosmac_data_select(num)
{
var cf=document.forms[0];
//var str = eval ( 'qosmac_Array' + num );
var str = attach_mac_show[num];
var each_info=str.split(' ');
cf.dev_name.value=each_info[2];
if(each_info[0]!='----')
cf.name.value=each_info[0];
else
cf.name.value='';
var edit_mac=each_info[3];
var mac_array=edit_mac.split(':');
cf.mac1.value=mac_array[0];
cf.mac2.value=mac_array[1];
cf.mac3.value=mac_array[2];
cf.mac4.value=mac_array[3];
cf.mac5.value=mac_array[4];
cf.mac6.value=mac_array[5];
cf.priority.value=each_info[1];
cf.select_editnum_mac.value=num;
var new_num=0;
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_qoslist_info=str.split(' ');
if( each_qoslist_info[0].toLowerCase() == each_info[0].toLowerCase())
new_num=i;
}
cf.select_qoslist_num.value=new_num;
}
function check_qoslist_editnum(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_edit);
return false;
}
var count_select=0;
var select_num;
if( qos_array_num == 1)
{
if(cf.ruleSelect.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<qos_array_num;i++)
if(cf.ruleSelect[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
alert(select_serv_edit);
return false;
}
else
{
cf.select_edit.value=select_num;
cf.submit_flag.value="qos_editnum";
var edit_str=eval('qosArray' + select_num);
var edit_each_info=edit_str.split(' ');
if(edit_each_info[1]=='0')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_adva_edit.html";
else if(edit_each_info[1]=='1')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_online_edit.html";
else if(edit_each_info[1]=='2')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_ether_edit.html";
else if(edit_each_info[1]=='3')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_edit.html";
cf.submit();
}
}
function check_qos_port(cf)
{
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
if(parseInt(cf.portstart.value)<1||parseInt(cf.portstart.value)>65535)
{
alert(invalid_start_port);
return false;
}
if(parseInt(cf.portend.value)<1||parseInt(cf.portend.value)>65535)
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
function check_qos_adva(cf,flag)
{
if(cf.name.value == "")
{
alert(qos_policy_name_null);
return false;
}
 if (cf.apps.selectedIndex == 8)
 {
 if (check_qos_port(cf)==false)
 return false;
 }
 if(cf.apps.selectedIndex == 8)
{
var input_start_port=cf.portstart.value;
 var input_end_port=cf.portend.value;
}
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
 var startport=each_info[5];
 var endport=each_info[6];
if(flag == 'edit')
{
if(cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" && select_editnum!=i )
{
alert(qos_rule_port_conflict);
return false;
}
 if(cf.apps.selectedIndex == 8)
{
if((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i && each_info[2]=="Add")
 {
 alert(qos_port_used);
return false;
 }
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" )
 {
 alert(qos_rule_port_conflict);
 return false;
 }
 if(cf.apps.selectedIndex == 8)
 {
if(!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)) && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
}
//add new info
if (cf.apps.selectedIndex == 8)
{
cf.hidden_port_type.value=cf.port_type.options[cf.port_type.selectedIndex].value;
cf.hidden_portstart.value=cf.portstart.value
cf.hidden_portend.value=cf.portend.value;
}
else
{
var i=cf.apps.selectedIndex;
cf.hidden_port_type.value=serv_array[i][0];
cf.hidden_portstart.value=serv_array[i][1];
cf.hidden_portend.value=serv_array[i][2];
}
 var str_adva=cf.name.value;
 var str_new="";
 for(var j=0;j<=str_adva.length;j++)
 {
 if(str_adva.substr(j,1)==' ')
 str_new+='_';
 else
 str_new+=str_adva.substr(j,1);
 }
 cf.name.value=str_new; 
cf.submit();
}
function check_qos_online(cf,flag)
{
if(cf.name.value=='')
{
alert(qos_policy_name_null);
return false;
}
 
if (cf.apps.selectedIndex == 7)
 {
 if (check_qos_port(cf)==false)
 return false;
 }
if (cf.apps.selectedIndex == 7)
{
 var input_start_port=cf.portstart.value;
 var input_end_port=cf.portend.value;
}
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
 startport=each_info[5];
 endport=each_info[6];
 if(flag == 'edit')
{
if( cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" && select_editnum!=i )
{
alert(qos_rule_port_conflict);
return false;
}
 if (cf.apps.selectedIndex == 7)
 {
if((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" )
 {
 alert(qos_rule_port_conflict);
 return false;
 }
 if (cf.apps.selectedIndex == 7)
 {
if(!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)) && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
}
//add new info
if (cf.apps.selectedIndex == 7)
{
cf.hidden_port_type.value=cf.port_type.options[cf.port_type.selectedIndex].value;
cf.hidden_portstart.value=cf.portstart.value;
cf.hidden_portend.value=cf.portend.value;
}
else
{
var i=cf.apps.selectedIndex;
cf.hidden_port_type.value=serv_array[i][0];
cf.hidden_portstart.value=serv_array[i][1];
cf.hidden_portend.value=serv_array[i][2];
 }
 var str_game=cf.name.value;
var str_new="";
for(var j=0;j<=str_game.length;j++)
{
if(str_game.substr(j,1)==' ')
str_new+='-';
else
str_new+=str_game.substr(j,1);
}
 cf.hidden_qos_policy_name.value=str_new;
cf.submit();
}
function check_qos_ether(cf,flag)
{
if(cf.name.value=="LAN Port 1" ||cf.name.value=="LAN Port 2"||cf.name.value=="LAN Port 3" || cf.name.value=="LAN Port 4" || cf.name.value=="")
{
cf.name.value="LAN Port "+cf.apps.options[cf.apps.selectedIndex].value;
cf.hidden_qos_policy_name.value="LAN_Port_"+cf.apps.options[cf.apps.selectedIndex].value;
}
else
 cf.hidden_qos_policy_name.value=cf.name.value;

for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
if( cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if(cf.apps.options[cf.apps.selectedIndex].value==each_info[2] && select_editnum!=i )
{
alert(qos_ether_port_dup);
return false;
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if(cf.apps.options[cf.apps.selectedIndex].value==each_info[2] )
{
alert(qos_ether_port_dup);
return false;
}
}
}
var str_ether=cf.name.value;
var str_new="";
for(var j=0;j<=str_ether.length;j++)
{
if(str_ether.substr(j,1)==' ')
str_new+='_';
else
str_new+=str_ether.substr(j,1);
}
 cf.hidden_qos_policy_name.value=str_new;
cf.submit();
}
function valid_add_qosmac(cf,flag,from_page)
{
if (mac_show_num ==0 && flag == 'edit')
{
alert(no_serv_edit);
return false;
}
else if( cf.select_editnum_mac.value == '' && flag == 'edit')
{
alert(select_serv_edit);
return false;
}
if(cf.dev_name.value=='')
{
alert(device_name_null);
return false;
}
cf.the_mac.value = cf.mac1.value+':'+cf.mac2.value+':'+cf.mac3.value+':'+
 cf.mac4.value+':'+cf.mac5.value+':'+cf.mac6.value;
if(maccheck(cf.the_mac.value) == false)
return false;
for(i=0;i<mac_show_num;i++)
{
//var str = eval ( 'qosmac_Array' + i );
var str = attach_mac_show[i];
var each_info=str.split(' ');
if(flag == 'edit')
{
if( cf.dev_name.value == each_info[2] && cf.select_editnum_mac.value!=i )
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0] && cf.select_editnum_mac.value!=i)
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase() && cf.select_editnum_mac.value!=i)
{
alert(mac_dup);
return false;
}
}
else //flag==add
{
if( cf.dev_name.value == each_info[2])
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0])
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase())
{
alert(mac_dup);
return false;
}
}
}

cf.hidden_att_num.value = attach_show_num;

var def_name=cf.the_mac.value.substring(9,11)+cf.the_mac.value.substring(12,14)+cf.the_mac.value.substring(15,17);
if(cf.name.value=='')
cf.name.value='Pri_MAC_'+def_name;
if (flag == 'add')
cf.submit_flag.value="qos_addmac";
else
cf.submit_flag.value="qos_editmac";
if (from_page == "add_page")
 cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_add.html";
else
 cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_edit.html";
cf.submit();
}
function valid_delete_qosmac(cf)
{
cf.hidden_att_num.value = attach_show_num;

if (mac_show_num ==0 || cf.select_editnum_mac.value < attach_show_num)
{
alert(no_serv_del);
return false;
}
else if( cf.select_editnum_mac.value == '')
{
alert(select_serv_del);
return false;
}
else
{
cf.submit_flag.value="qos_delmac";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_add.html";
cf.submit();
}
}
function check_qos_mac(cf,flag)
{
var cf=document.forms[0];
cf.hidden_att_num.value = attach_show_num;
if( cf.select_editnum_mac.value == '')
{
alert(qos_mac_apply);
return false;
}

if(cf.dev_name.value=='')
{
alert(device_name_null);
return false;
}
cf.the_mac.value = cf.mac1.value+':'+cf.mac2.value+':'+cf.mac3.value+':'+
 cf.mac4.value+':'+cf.mac5.value+':'+cf.mac6.value;
if(maccheck(cf.the_mac.value) == false)
return false;
var def_name=cf.the_mac.value.substring(9,11)+cf.the_mac.value.substring(12,13)+cf.the_mac.value.substring(15,16);
if(cf.name.value=='')
cf.name.value= 'Pri_MAC_'+def_name;
for(i=0;i<mac_show_num;i++)
{
//var str = eval ( 'qosmac_Array' + i );
var str= attach_mac_show[i];
var each_info=str.split(' ');
if( cf.dev_name.value == each_info[2] && cf.select_editnum_mac.value!=i )
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0] && cf.select_editnum_mac.value!=i)
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase() && cf.select_editnum_mac.value!=i)
{
alert(mac_dup);
return false;
}
}
if(flag == 'add')
{
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
if( cf.name.value == each_info[0])
{
alert(qos_policy_name_dup);
return false;
}
 if( cf.the_mac.value.toLowerCase() == each_info[8].toLowerCase() )
 {
 alert(mac_dup);
 return false;
 }
}
}
if(flag == 'add')
cf.submit_flag.value="add_qos_mac";
else
cf.submit_flag.value="edit_qos_mac";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
function check_qoslist_delnum(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_del);
return false;
}
var count_select=0;
var select_num;
if( qos_array_num == 1)
{
if(cf.ruleSelect.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<qos_array_num;i++)
if(cf.ruleSelect[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
alert(select_serv_del);
return false;
}
else
{
cf.select_del.value=select_num;
cf.submit_flag.value="qos_del";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
}
function check_qoslist_delall(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_del);
return false;
}
//ask_str=qos_all_delete;

if ( !confirm(qos_deleteall))
return false;
else
{
cf.submit_flag.value="qos_del_all"
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
}
function check_qos_apply(cf)
{
if(cf.wmm_enable.checked == true)
cf.qos_endis_wmm.value=1;
else
cf.qos_endis_wmm.value=0;

if(cf.qosEnable.checked == true)
cf.qos_endis_on.value=1;
else
cf.qos_endis_on.value=0;
if(cf.turn_qos_bandwidth_on.checked == true)
cf.qos_endis_bandwidth.value=1;
else
cf.qos_endis_bandwidth.value=0;

qos_bandwith=parseInt(cf.qos_uprate_web.value);
if(cf.bw_mode[0].checked == true)
 cf.hidden_bw_mode.value=0;
 else
 cf.hidden_bw_mode.value=1;
 
 
 if (cf.qos_width.selectedIndex == 0)
{
if ( !(qos_bandwith>0&&qos_bandwith<1000001) )
{
alert(qos_bandwith1000M);
return false;
}
else
cf.qos_hidden_uprate.value = parseInt(cf.qos_uprate_web.value);
}
else
{
if ( !(qos_bandwith>0&&qos_bandwith<1001) )
{
alert(qos_bandwith1000M);
return false;
}
else
cf.qos_hidden_uprate.value = parseInt(cf.qos_uprate_web.value)*1024;
}

/*
else
{
cf.qos_hidden_uprate.value = 256;
cf.qos_width.selectedIndex = 0;
}
*/
//super user
if (cf.su_enable.checked == true)
{
cf.qos_su_enable.value=1;
cf.su_IPAddress.value=cf.su_IPAddress1.value+'.'+cf.su_IPAddress2.value+'.'+cf.su_IPAddress3.value+'.'+cf.su_IPAddress4.value;
if(checkipaddr(cf.su_IPAddress.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameIp(cf.su_IPAddress.value,lan_ip)==true)
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.su_IPAddress.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(same_subnet_ip_trusted);
return false;
}
}
else
cf.qos_su_enable.value=0;

//

cf.submit_flag.value="apply_qos";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos.html";
cf.submit();
}
function show_suip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.su_IPAddress1.value=lanip_array[0];
cf.su_IPAddress2.value=lanip_array[1];
cf.su_IPAddress3.value=lanip_array[2];
}
function checkSUIP()
{
var cf = document.forms[0];
if(!cf.su_enable.checked)
cf.su_IPAddress4.disabled = true;
else
cf.su_IPAddress4.disabled = false;
}
=======
function getObj(name)
{
 if (document.getElementById)
 {
 return document.getElementById(name);
 }
 else if (document.all)
 {
 return document.all[name];
 }
 else if (document.layers)
 {
 return document.layers[name];
 }
}
function check_qos()
{
var cf=document.forms[0];
if(cf.wmm_enable.checked == true)
cf.qos_endis_wmm.value=1;
else
cf.qos_endis_wmm.value=0;

if(cf.qosEnable.checked == true)
cf.qos_endis_on.value=1;
else
cf.qos_endis_on.value=0;
cf.submit_flag.value="apply_qos";
cf.submit();
}
function change_priority()
{
var cf=document.forms[0];
if( cf.category.selectedIndex == 0)
location.href="qos_adva_add.html";
else if( cf.category.selectedIndex == 1)
location.href="qos_online_add.html";
else if( cf.category.selectedIndex == 2)
location.href="qos_ether_add.html";
else if( cf.category.selectedIndex == 3)
location.href="qos_mac_add.html";
}
function change_serv_adva()
{
var cf=document.forms[0];
if (cf.apps.selectedIndex == 8)
{
cf.name.value='';
cf.priority.selectedIndex=0;
getObj("real_app_port").innerHTML=str_div;
}
else
{
getObj("real_app_port").innerHTML='';
var i=cf.apps.selectedIndex;
cf.name.value=serv_array[i][3];
cf.priority.selectedIndex=serv_array[i][4];
}
}
function change_serv_online()
{
var cf=document.forms[0];
if (cf.apps.selectedIndex == 7)
{
cf.name.value='';
cf.priority.selectedIndex=1;
getObj("real_app_port").innerHTML=str_div;
}
else
{
getObj("real_app_port").innerHTML='';
var i=cf.apps.selectedIndex;
if(serv_array[i][3]=="Counter-Strike")
cf.name.value="Counter Strike";
else if(serv_array[i][3]=="Age-of-Empires")
cf.name.value="Age of Empires";
else if(serv_array[i][3]=="Quake-2")
cf.name.value="Quake 2";
else if(serv_array[i][3]=="Quake-3")
cf.name.value="Quake 3";
else if(serv_array[i][3]=="Unreal-Tourment")
cf.name.value="Unreal Tourment";
else
cf.name.value=serv_array[i][3];
cf.hidden_qos_policy_name.value=serv_array[i][3];
cf.priority.selectedIndex=serv_array[i][4];
}
}
function change_name_online(name)
{
if(name=="Counter-Strike")
new_name="Counter Strike";
else if(name=="Age-of-Empires")
new_name="Age of Empires";
else if(name=="Diablo-II")
new_name="Diablo II";
else if(name=="Half-Life")
new_name="Half Life";
else if(name=="Quake-2")
new_name="Quake 2";
else if(name=="Quake-3")
new_name="Quake 3";
else if(name=="Unreal-Tourment")
new_name="Unreal Tourment";
else if(name=="Return-to-Castle-Wolfenstein")
new_name="Return to Castle Wolfenstein";
else if(name=="LAN_Port_1")
new_name="LAN Port 1";
else if(name=="LAN_Port_2")
new_name="LAN Port 2";
else if(name=="LAN_Port_3")
new_name="LAN Port 3";
else if(name=="LAN_Port_4")
new_name="LAN Port 4";
else if(name=="MSN_messenger")
new_name="MSN messenger";
else if(name=="Yahoo_Messenger")
new_name="Yahoo Messenger";
else if(name=="IP_Phone")
new_name="IP Phone";
else if(name=="Vonage_IP_Phone")
new_name="Vonage IP Phone";
else if(name=="Google_Talk")
new_name="Google Talk";
else if(name=="Netgear_EVA")
new_name="Netgear EVA";
else
new_name=name;
return new_name;
}
function change_serv_ether()
{
var cf=document.forms[0];
if(cf.name.value=="LAN Port 1" ||cf.name.value=="LAN Port 2"||cf.name.value=="LAN Port 3" || cf.name.value=="LAN Port 4" || cf.name.value=="")
{
cf.name.value="LAN Port "+cf.apps.options[cf.apps.selectedIndex].value;
cf.hidden_qos_policy_name.value="LAN_Port_"+cf.apps.options[cf.apps.selectedIndex].value;
}

}
function qosmac_data_select(num)
{
var cf=document.forms[0];
//var str = eval ( 'qosmac_Array' + num );
var str = attach_mac_show[num];
var each_info=str.split(' ');
cf.dev_name.value=each_info[2];
if(each_info[0]!='----')
cf.name.value=each_info[0];
else
cf.name.value='';
var edit_mac=each_info[3];
var mac_array=edit_mac.split(':');
cf.mac1.value=mac_array[0];
cf.mac2.value=mac_array[1];
cf.mac3.value=mac_array[2];
cf.mac4.value=mac_array[3];
cf.mac5.value=mac_array[4];
cf.mac6.value=mac_array[5];
cf.priority.value=each_info[1];
cf.select_editnum_mac.value=num;
var new_num=0;
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_qoslist_info=str.split(' ');
if( each_qoslist_info[0].toLowerCase() == each_info[0].toLowerCase())
new_num=i;
}
cf.select_qoslist_num.value=new_num;
}
function check_qoslist_editnum(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_edit);
return false;
}
var count_select=0;
var select_num;
if( qos_array_num == 1)
{
if(cf.ruleSelect.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<qos_array_num;i++)
if(cf.ruleSelect[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
alert(select_serv_edit);
return false;
}
else
{
cf.select_edit.value=select_num;
cf.submit_flag.value="qos_editnum";
var edit_str=eval('qosArray' + select_num);
var edit_each_info=edit_str.split(' ');
if(edit_each_info[1]=='0')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_adva_edit.html";
else if(edit_each_info[1]=='1')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_online_edit.html";
else if(edit_each_info[1]=='2')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_ether_edit.html";
else if(edit_each_info[1]=='3')
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_edit.html";
cf.submit();
}
}
function check_qos_port(cf)
{
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
if(parseInt(cf.portstart.value)<1||parseInt(cf.portstart.value)>65535)
{
alert(invalid_start_port);
return false;
}
if(parseInt(cf.portend.value)<1||parseInt(cf.portend.value)>65535)
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
function check_qos_adva(cf,flag)
{
if(cf.name.value == "")
{
alert(qos_policy_name_null);
return false;
}
 if (cf.apps.selectedIndex == 8)
 {
 if (check_qos_port(cf)==false)
 return false;
 }
 if(cf.apps.selectedIndex == 8)
{
var input_start_port=cf.portstart.value;
 var input_end_port=cf.portend.value;
}
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
 var startport=each_info[5];
 var endport=each_info[6];
if(flag == 'edit')
{
if(cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" && select_editnum!=i )
{
alert(qos_rule_port_conflict);
return false;
}
 if(cf.apps.selectedIndex == 8)
{
if((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i && each_info[2]=="Add")
 {
 alert(qos_port_used);
return false;
 }
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" )
 {
 alert(qos_rule_port_conflict);
 return false;
 }
 if(cf.apps.selectedIndex == 8)
 {
if(!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)) && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
}
//add new info
if (cf.apps.selectedIndex == 8)
{
cf.hidden_port_type.value=cf.port_type.options[cf.port_type.selectedIndex].value;
cf.hidden_portstart.value=cf.portstart.value
cf.hidden_portend.value=cf.portend.value;
}
else
{
var i=cf.apps.selectedIndex;
cf.hidden_port_type.value=serv_array[i][0];
cf.hidden_portstart.value=serv_array[i][1];
cf.hidden_portend.value=serv_array[i][2];
}
 var str_adva=cf.name.value;
 var str_new="";
 for(var j=0;j<=str_adva.length;j++)
 {
 if(str_adva.substr(j,1)==' ')
 str_new+='_';
 else
 str_new+=str_adva.substr(j,1);
 }
 cf.name.value=str_new; 
cf.submit();
}
function check_qos_online(cf,flag)
{
if(cf.name.value=='')
{
alert(qos_policy_name_null);
return false;
}
 
if (cf.apps.selectedIndex == 7)
 {
 if (check_qos_port(cf)==false)
 return false;
 }
if (cf.apps.selectedIndex == 7)
{
 var input_start_port=cf.portstart.value;
 var input_end_port=cf.portend.value;
}
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
 startport=each_info[5];
 endport=each_info[6];
 if(flag == 'edit')
{
if( cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" && select_editnum!=i )
{
alert(qos_rule_port_conflict);
return false;
}
 if (cf.apps.selectedIndex == 7)
 {
if((!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport))) && select_editnum!=i && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if( cf.apps.value == each_info[2] && cf.apps.value != "Add" )
 {
 alert(qos_rule_port_conflict);
 return false;
 }
 if (cf.apps.selectedIndex == 7)
 {
if(!(parseInt(endport)<parseInt(input_start_port)||parseInt(input_end_port)<parseInt(startport)) && each_info[2]=="Add")
 {
 alert(qos_port_used);
 return false;
 }
}
}
}
//add new info
if (cf.apps.selectedIndex == 7)
{
cf.hidden_port_type.value=cf.port_type.options[cf.port_type.selectedIndex].value;
cf.hidden_portstart.value=cf.portstart.value;
cf.hidden_portend.value=cf.portend.value;
}
else
{
var i=cf.apps.selectedIndex;
cf.hidden_port_type.value=serv_array[i][0];
cf.hidden_portstart.value=serv_array[i][1];
cf.hidden_portend.value=serv_array[i][2];
 }
 var str_game=cf.name.value;
var str_new="";
for(var j=0;j<=str_game.length;j++)
{
if(str_game.substr(j,1)==' ')
str_new+='-';
else
str_new+=str_game.substr(j,1);
}
 cf.hidden_qos_policy_name.value=str_new;
cf.submit();
}
function check_qos_ether(cf,flag)
{
if(cf.name.value=="LAN Port 1" ||cf.name.value=="LAN Port 2"||cf.name.value=="LAN Port 3" || cf.name.value=="LAN Port 4" || cf.name.value=="")
{
cf.name.value="LAN Port "+cf.apps.options[cf.apps.selectedIndex].value;
cf.hidden_qos_policy_name.value="LAN_Port_"+cf.apps.options[cf.apps.selectedIndex].value;
}
else
 cf.hidden_qos_policy_name.value=cf.name.value;

for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
if(flag == 'edit')
{
if( cf.name.value == change_name_online(each_info[0]) && select_editnum!=i )
{
alert(qos_policy_name_dup);
return false;
}
if(cf.apps.options[cf.apps.selectedIndex].value==each_info[2] && select_editnum!=i )
{
alert(qos_ether_port_dup);
return false;
}
}
else
{
if( cf.name.value == change_name_online(each_info[0]))
{
alert(qos_policy_name_dup);
return false;
}
if(cf.apps.options[cf.apps.selectedIndex].value==each_info[2] )
{
alert(qos_ether_port_dup);
return false;
}
}
}
var str_ether=cf.name.value;
var str_new="";
for(var j=0;j<=str_ether.length;j++)
{
if(str_ether.substr(j,1)==' ')
str_new+='_';
else
str_new+=str_ether.substr(j,1);
}
 cf.hidden_qos_policy_name.value=str_new;
cf.submit();
}
function valid_add_qosmac(cf,flag,from_page)
{
if (mac_show_num ==0 && flag == 'edit')
{
alert(no_serv_edit);
return false;
}
else if( cf.select_editnum_mac.value == '' && flag == 'edit')
{
alert(select_serv_edit);
return false;
}
if(cf.dev_name.value=='')
{
alert(device_name_null);
return false;
}
cf.the_mac.value = cf.mac1.value+':'+cf.mac2.value+':'+cf.mac3.value+':'+
 cf.mac4.value+':'+cf.mac5.value+':'+cf.mac6.value;
if(maccheck(cf.the_mac.value) == false)
return false;
for(i=0;i<mac_show_num;i++)
{
//var str = eval ( 'qosmac_Array' + i );
var str = attach_mac_show[i];
var each_info=str.split(' ');
if(flag == 'edit')
{
if( cf.dev_name.value == each_info[2] && cf.select_editnum_mac.value!=i )
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0] && cf.select_editnum_mac.value!=i)
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase() && cf.select_editnum_mac.value!=i)
{
alert(mac_dup);
return false;
}
}
else //flag==add
{
if( cf.dev_name.value == each_info[2])
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0])
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase())
{
alert(mac_dup);
return false;
}
}
}

cf.hidden_att_num.value = attach_show_num;

var def_name=cf.the_mac.value.substring(9,11)+cf.the_mac.value.substring(12,14)+cf.the_mac.value.substring(15,17);
if(cf.name.value=='')
cf.name.value='Pri_MAC_'+def_name;
if (flag == 'add')
cf.submit_flag.value="qos_addmac";
else
cf.submit_flag.value="qos_editmac";
if (from_page == "add_page")
 cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_add.html";
else
 cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_edit.html";
cf.submit();
}
function valid_delete_qosmac(cf)
{
cf.hidden_att_num.value = attach_show_num;

if (mac_show_num ==0 || cf.select_editnum_mac.value < attach_show_num)
{
alert(no_serv_del);
return false;
}
else if( cf.select_editnum_mac.value == '')
{
alert(select_serv_del);
return false;
}
else
{
cf.submit_flag.value="qos_delmac";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_mac_add.html";
cf.submit();
}
}
function check_qos_mac(cf,flag)
{
var cf=document.forms[0];
cf.hidden_att_num.value = attach_show_num;
if( cf.select_editnum_mac.value == '')
{
alert(qos_mac_apply);
return false;
}

if(cf.dev_name.value=='')
{
alert(device_name_null);
return false;
}
cf.the_mac.value = cf.mac1.value+':'+cf.mac2.value+':'+cf.mac3.value+':'+
 cf.mac4.value+':'+cf.mac5.value+':'+cf.mac6.value;
if(maccheck(cf.the_mac.value) == false)
return false;
var def_name=cf.the_mac.value.substring(9,11)+cf.the_mac.value.substring(12,13)+cf.the_mac.value.substring(15,16);
if(cf.name.value=='')
cf.name.value= 'Pri_MAC_'+def_name;
for(i=0;i<mac_show_num;i++)
{
//var str = eval ( 'qosmac_Array' + i );
var str= attach_mac_show[i];
var each_info=str.split(' ');
if( cf.dev_name.value == each_info[2] && cf.select_editnum_mac.value!=i )
{
alert(device_name_dup);
return false;
}
if( cf.name.value == each_info[0] && cf.select_editnum_mac.value!=i)
{
alert(qos_policy_name_dup);
return false;
}
if( cf.the_mac.value.toLowerCase() == each_info[3].toLowerCase() && cf.select_editnum_mac.value!=i)
{
alert(mac_dup);
return false;
}
}
if(flag == 'add')
{
for(i=1;i<=qos_array_num;i++)
{
var str = eval ( 'qosArray' + i );
var each_info=str.split(' ');
if( cf.name.value == each_info[0])
{
alert(qos_policy_name_dup);
return false;
}
 if( cf.the_mac.value.toLowerCase() == each_info[8].toLowerCase() )
 {
 alert(mac_dup);
 return false;
 }
}
}
if(flag == 'add')
cf.submit_flag.value="add_qos_mac";
else
cf.submit_flag.value="edit_qos_mac";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
function check_qoslist_delnum(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_del);
return false;
}
var count_select=0;
var select_num;
if( qos_array_num == 1)
{
if(cf.ruleSelect.checked == true)
{
count_select++;
select_num=1;
}
}
else for(i=0;i<qos_array_num;i++)
if(cf.ruleSelect[i].checked == true)
{
count_select++;
select_num=i+1;
}
if(count_select==0)
{
alert(select_serv_del);
return false;
}
else
{
cf.select_del.value=select_num;
cf.submit_flag.value="qos_del";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
}
function check_qoslist_delall(cf)
{
if( qos_array_num == 0 )
{
alert(no_serv_del);
return false;
}
//ask_str=qos_all_delete;

if ( !confirm(qos_deleteall))
return false;
else
{
cf.submit_flag.value="qos_del_all"
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos_rule.html";
cf.submit();
}
}
function check_qos_apply(cf)
{
if(cf.wmm_enable.checked == true)
cf.qos_endis_wmm.value=1;
else
cf.qos_endis_wmm.value=0;

if(cf.qosEnable.checked == true)
cf.qos_endis_on.value=1;
else
cf.qos_endis_on.value=0;
if(cf.turn_qos_bandwidth_on.checked == true)
cf.qos_endis_bandwidth.value=1;
else
cf.qos_endis_bandwidth.value=0;

qos_bandwith=parseInt(cf.qos_uprate_web.value);
if(cf.bw_mode[0].checked == true)
 cf.hidden_bw_mode.value=0;
 else
 cf.hidden_bw_mode.value=1;
 
 
 if (cf.qos_width.selectedIndex == 0)
{
if ( !(qos_bandwith>0&&qos_bandwith<1000001) )
{
alert(qos_bandwith1000M);
return false;
}
else
cf.qos_hidden_uprate.value = parseInt(cf.qos_uprate_web.value);
}
else
{
if ( !(qos_bandwith>0&&qos_bandwith<1001) )
{
alert(qos_bandwith1000M);
return false;
}
else
cf.qos_hidden_uprate.value = parseInt(cf.qos_uprate_web.value)*1024;
}

/*
else
{
cf.qos_hidden_uprate.value = 256;
cf.qos_width.selectedIndex = 0;
}
*/
//super user
if (cf.su_enable.checked == true)
{
cf.qos_su_enable.value=1;
cf.su_IPAddress.value=cf.su_IPAddress1.value+'.'+cf.su_IPAddress2.value+'.'+cf.su_IPAddress3.value+'.'+cf.su_IPAddress4.value;
if(checkipaddr(cf.su_IPAddress.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameIp(cf.su_IPAddress.value,lan_ip)==true)
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.su_IPAddress.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(same_subnet_ip_trusted);
return false;
}
}
else
cf.qos_su_enable.value=0;

//

cf.submit_flag.value="apply_qos";
cf.action="setobject.cgi@_2Fcgi-bin_2Fqos.html";
cf.submit();
}
function show_suip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.su_IPAddress1.value=lanip_array[0];
cf.su_IPAddress2.value=lanip_array[1];
cf.su_IPAddress3.value=lanip_array[2];
}
function checkSUIP()
{
var cf = document.forms[0];
if(!cf.su_enable.checked)
cf.su_IPAddress4.disabled = true;
else
cf.su_IPAddress4.disabled = false;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
