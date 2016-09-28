// JavaScript Document

var dm_dir = new Array(); 
var Download_path = 'Download2';
var WH_INT=0,Floder_WH_INT=0,General_WH_INT=0;
var BASE_PATH;
var initial_array = new Array();
var folderlist = new Array();
var DM_port_tmp;
var PATH_tmp;
var Enable_time_tmp;
var Start_hour_tmp;
var End_hour_tmp;
var Start_minute_tmp;
var End_minute_tmp;
var Day_tmp;
var DM_Misc_http_x_tmp;
/*function callBackNZB(id){
	if(id == "yes")
	$j("#Setting_NZB_form").submit();
	}*/
function aMuleapplyRuleCon(IP,Port){
	var action_mode = "DM_ED2K_CON";
	var url = "dm_apply.cgi?action_mode="+action_mode+"&ED2K_SERVER_IP="+IP+"&ED2K_SERVER_PORT="+Port+"&t="+Math.random();
	$j.get(url,function(data){showLoading(3);});
	}
	
function aMuleapplyRuleDiscon(IP,Port){
	var action_mode = "DM_ED2K_DISCON";
	var url = "dm_apply.cgi?action_mode="+action_mode+"&ED2K_SERVER_IP="+IP+"&ED2K_SERVER_PORT="+Port+"&t="+Math.random();
	$j.get(url,function(data){showLoading(3);});
	}
	
function initial_amule_status(data){
	var initial_array = new Array();
	eval("initial_array="+data);
	$j("#aMuleServerIP").attr("value",initial_array[0]);
	$j("#aMuleServerPort").attr("value",initial_array[1]);
	}
	
function initial_amule(){
	var url = "dm_apply.cgi";
	var action_mode = "initial";
	var type = "ED2K";
	url += "?action_mode=" + action_mode + "&download_type=" +type+ "&t=" +Math.random();
	$j.get(url,function(data){initial_amule_status(data);});
	}

function NZBapplyRule(){
	var digit = /^\d*$/
	var port = $j("#serverPort").attr("value");
	var downSpeed = $j("#downloadSpeed_limit").attr("value");
	var connections = $j("#Number_of_connections").attr("value");
	if(!digit.test(port) || port > 65535 || port < 0 || port == 9092 || port == 6789 || port == 3490 || port == 80)
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][46]+"between 0-65535 except:9092,6789,3490 and 80!");
	else if(!digit.test(downSpeed))
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][47]);
	else if(!digit.test(connections))
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][48]);
	else{
		showLoading(3);
		$j("#Setting_NZB_form").submit();
		//Ext.MessageBox.confirm("message","Are you sure to apply?",callBackNZB);
		}
	
	}


/*
function HTTPapplyRule(){
	$j("#Setting_HTTP_form").submit();
	}



function FTPapplyRule(){
	$j("#Setting_FTP_form").submit();
	}
*/

/*function callBackBT(id){
	if(id == "yes")
	$j("#Setting_BT_form").submit();
	}*/

function BTapplyRule(){
	digit = /^\d*$/
	var port = $j("#Incoming_port").attr("value");
	var downSpeed = $j("#download_speed_limit").attr("value");
	var upSpeed = $j("#upload_speed_limit").attr("value");
	var maxPeer = $j("#Max_peer").attr("value");
	if(!digit.test(port) || port > 65535 || port < 0 || port == 9092 || port == 6789 || port == 3490 || port == 80)
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][49]+"between 0-65535 except:9092,6789,3490 and 80!");
	else if(port == location.host.split(":")[1])
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],"Incoming port must different from DM port:"+port);
	else if(!digit.test(downSpeed))
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][47]);
	else if(!digit.test(upSpeed))
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][50]);
	else if(!digit.test(maxPeer))
	Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][51]);
	else{
			showLoading(3);
			$j("#Setting_BT_form").submit();
		}
	//Ext.MessageBox.confirm("message","Are you sure to apply?",callBackBT);
	}
	
	
function callBackGeneral(enableTime,hour1,minute1,hour2,minute2){
	if(document.getElementById("DM_port").value){
	var url = "dm_apply.cgi";
	var action_mode = "DM_APPLY";
	var type = "General";
	var Lan_ip = document.getElementById("Lan_ip").value;
	var Base_path = document.getElementById("Base_path").value;
	var Download_dir = document.getElementById("PATH").value;
	var Refresh_rate = document.getElementById("Refresh_rate").value;
	var Misc_http_x = document.getElementById("Misc_http_x").value;
	var DM_port =document.getElementById("DM_port").value;
	var lang_tmp = document.getElementById("DM_language").value;
	var MISCR_HTTP_X = document.getElementById("MISCR_HTTP_X").value;
	var MISCR_HTTPPORT_X = document.getElementById("MISCR_HTTPPORT_X").value;
	var Day = document.getElementById("on_day").value;
	var Productid = document.getElementById("Productid").value;
	var APPS_DEV = document.getElementById("APPS_DEV").value;
	var WAN_IP = $j("#WAN_IP").attr("value");
	var DDNS_ENABLE_X = $j("#DDNS_ENABLE_X").attr("value");
	var DDNS_HOSTNAME_X = $j("#DDNS_HOSTNAME_X").attr("value");
	var MAX_ON_HEAVY = $j("#MAX_ON_HEAVY").attr("value");
	var MAX_QUEUES = $j("#MAX_QUEUES").attr("value");
	var MAX_ON_ED2K = $j("#MAX_ON_ED2K").attr("value");
	var RFW_ENABLE_X = $j("#RFW_ENABLE_X").attr("value");
	var DM_port_renew;
	var Download_dir_renew;
	var Enable_time_renew;
	if(enableTime == 0 && Enable_time_tmp == 0){
		Enable_time_renew = 0;
		}
	else if(enableTime == 1 && Enable_time_tmp == 1){
		if(Day == Day_tmp && Start_hour_tmp == hour1 && Start_minute_tmp == minute1 && End_hour_tmp == hour2 && End_minute_tmp == minute2){
			Enable_time_renew = 0;
			}
		else{
			Enable_time_renew = 1;
			}
		}
	else if(enableTime != Enable_time_tmp){
		Enable_time_renew = 1;
		}
	if(DM_port == DM_port_tmp){
		DM_port_renew = 0;
		}
	else{
		DM_port_renew = 1;
		}
	if(Download_dir == PATH_tmp){
		Download_dir_renew = 0;
		}
	else{
		Download_dir_renew = 1;
		}
	var task_code = multiLanguage_setting_array[multi_INT][54]+ ' ' +DM_port + multiLanguage_setting_array[multi_INT][55]+'<br /><br />';
	$("drword").innerHTML = task_code;
	url += "?action_mode=" + action_mode + "&download_type=" +type+  "&Base_path=" +Base_path+  "&Download_dir=" +Download_dir+  "&DM_dir_renew="+Download_dir_renew+"&Refresh_rate=" +Refresh_rate+  "&Misc_http_x=" +Misc_http_x+  "&Lan_ip=" +Lan_ip+ "&DM_port="+ DM_port +"&DM_port_renew="+DM_port_renew+"&Start_hour="+hour1+"&End_hour="+hour2+ "&Start_minute="+minute1+"&End_minute="+minute2+"&Enable_time="+enableTime+"&DM_language="+lang_tmp+"&Miscr_http_x="+MISCR_HTTP_X+"&Miscr_httpport_x="+MISCR_HTTPPORT_X+"&Day="+Day+"&Enable_time_renew="+Enable_time_renew+ "&Productid="+Productid+"&APPS_DEV="+APPS_DEV+"&WAN_IP="+WAN_IP+"&DDNS_ENABLE_X="+DDNS_ENABLE_X+"&DDNS_HOSTNAME_X="+DDNS_HOSTNAME_X+"&MAX_ON_HEAVY="+MAX_ON_HEAVY+"&MAX_QUEUES="+MAX_QUEUES+"&MAX_ON_ED2K="+MAX_ON_ED2K+"&RFW_ENABLE_X="+RFW_ENABLE_X+"&t=" +Math.random();
	if(MISCR_HTTPPORT_X == DM_port){
		Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][52]);
		}
	else if(DM_port>65535 || DM_port<2 || DM_port == 9092 || DM_port == 6789 || DM_port == 3490 || DM_port == 80){
		Ext.MessageBox.alert(multiLanguage_setting_array[multi_INT][39],multiLanguage_setting_array[multi_INT][53]+"except:9092,6789,3490 and 80!");
		}
	else{
		$j.get(url,function(data){
							Enable_time_tmp = enableTime;
							Day_tmp = Day;
							Start_hour_tmp = hour1;
							Start_minute_tmp = minute1;
							End_hour_tmp = hour2;
							End_minute_tmp = minute2;
							});
		if(document.getElementById("DM_port").value != DM_port_tmp){
			showLoading(4,'waiting');
			setTimeout('show_port_panel()',5000);
			setTimeout('redirect()',9000);
		}
		else if(document.getElementById("Misc_http_x").value != DM_Misc_http_x_tmp){
			showLoading(4);
			setTimeout('redirect()',4300);
		}
		else{
			showLoading(4);
			}
	}
	}
	}

function GeneralapplyRule(){
	var digit = /^\d*$/
	var hour1 = parseInt($j("#from_hour").attr("value"));
	var minute1 = parseInt($j("#from_minute").attr("value"));
	var hour2 = parseInt($j("#to_hour").attr("value"));
	var minute2 = parseInt($j("#to_minute").attr("value"));
	
	//var path = $j("#PATH").attr("value",Download_path);
	var rate = $j("#Refresh_rate").attr("value");
	//var basepath = $j("#Base_path").attr("value",initial_array[8]);
	var type = document.getElementById("from_hour").disabled;
	var enableTime;
	if(!digit.test(rate))
	Ext.MessageBox.alert("notice!","please input the right \"Refresh rate!\"");
	else{
		if(type == false){
			enableTime = 1;
			if(hour1 < hour2 || (hour1 == hour2 && minute1 < minute2)){
				callBackGeneral(enableTime,hour1,minute1,hour2,minute2);
				}
			else{
				Ext.MessageBox.alert("Notice!","Please select the right time!");
				}		
			}
			else{
				enableTime = 0;
				callBackGeneral(enableTime,hour1,minute1,hour2,minute2);
				}
			}
		//else
			//Ext.MessageBox.confirm("message","Are you sure to apply?",callBackGeneral);
}

function redirect(){
	location.href = 'http://'+ location.host.split(":")[0] + ":" + document.getElementById("DM_port").value + "/Setting_General.html";
	}

function show_port_panel(){
		$("Loading").style.visibility = "hidden";
		dr_advise();
	}

function initial_general_status(data){
	eval("initial_array="+data);
	if(initial_array[0]!=null && initial_array[0]!="")
	{
		if(initial_array[0] == 0){
			Enable_time_tmp = 0;
			$j("#Enable_time0").attr("checked","checked");
			Download_Schedule(0);
			}
		if(initial_array[0] == 1){
			Enable_time_tmp = 1;
			$j("#Enable_time1").attr("checked","checked");
			Download_Schedule(1);
			}
		}
		
	if(initial_array[1]!=null && initial_array[1]!=""){
		$j("#from_hour"+initial_array[1]).attr("selected","selected");
		Start_hour_tmp = initial_array[1];
		}
	if(initial_array[2]!=null && initial_array[2]!=""){
		$j("#from_minute"+initial_array[2]).attr("selected","selected");
		Start_minute_tmp = initial_array[2];
		}
	if(initial_array[3]!=null && initial_array[3]!=""){
		$j("#to_hour"+initial_array[3]).attr("selected","selected");
		End_hour_tmp = initial_array[3];
		}
	if(initial_array[4]!=null && initial_array[4]!=""){
		$j("#to_minute"+initial_array[4]).attr("selected","selected");
		End_minute_tmp = initial_array[4];
		}
	if(initial_array[5]!=null && initial_array[5]!=""){
		$j("#on_day"+initial_array[5]).attr("selected","selected");
		Day_tmp = initial_array[5];
		}
	if(initial_array[6]!=null && initial_array[6]!=""){
		$j("#PATH").attr("value",initial_array[6]);
		PATH_tmp = initial_array[6];
		}
	//document.getElementById("helpAddress").href = "http://"+initial_array[10]+":8081/help.asp";
	document.getElementById("helpAddress").href = "http://"+ location.host +"/help.asp";
	if(initial_array[7]!=null && initial_array[7]!=""){
		$j("#Refresh_rate").attr("value",initial_array[7]);
		}
	if(initial_array[10]!=null && initial_array[10]!=""){
		$j("#Lan_ip").attr("value",initial_array[10]);
		}
	if(initial_array[8]!=null && initial_array[8]!=""){
		$j("#Base_path").attr("value",initial_array[8]);
		}
	BASE_PATH = initial_array[8];
	if(initial_array[9]!=null && initial_array[9]!="" && initial_array[23] == 1){
		$j("#Misc_http_x").attr("value",initial_array[9]);
		DM_Misc_http_x_tmp = initial_array[9];
		$j("#misc_http_x_1").iphoneSwitch($j("#Misc_http_x").attr("value"), 
							 function() {
								$j("#Misc_http_x").attr("value","1");
							 },
							 function() {
								$j("#Misc_http_x").attr("value","0");
							 },
							 {
								//switch_on_container_path: '/plugin/iphone_switch_container_off.png'
							 }
						);
		}
		else if(initial_array[9]!=null && initial_array[9]!="" && initial_array[23] == 0){
		$j("#Misc_http_x").attr("value","");
		DM_Misc_http_x_tmp = initial_array[9];
		if(initial_array[9] == 0)
		$j("#misc_http_x_1").attr("class","switch_disable_off");
		else
		$j("#misc_http_x_1").attr("class","switch_disable_on");
		}
		if(initial_array[11]!=null && initial_array[11]!=""){
		$j("#MISCR_HTTPPORT_X").attr("value",initial_array[11]);
		}
		if(initial_array[12]!=null && initial_array[12]!=""){
			$j("#MISCR_HTTP_X").attr("value",initial_array[12]);
			}
		if(initial_array[13]!=null && initial_array[13]!=""){
		$j("#DM_port").attr("value",initial_array[13]);
		DM_port_tmp = initial_array[13];
		$("DMport").innerHTML = initial_array[13];
		}
		if(initial_array[14]!=null && initial_array[14]!=""){
			$j("#DM_language").attr("value",initial_array[14]);
			}
		if(initial_array[15]!=null && initial_array[15]!=""){
			$j("#Productid").attr("value",initial_array[15]);
			}
		if(initial_array[16]!=null && initial_array[16]!=""){
			$j("#APPS_DEV").attr("value",initial_array[16]);
			}
		if(initial_array[17]!=null && initial_array[17]!=""){
			$j("#WAN_IP").attr("value",initial_array[17]);
			}
		if(initial_array[18]!=null && initial_array[18]!=""){
			$j("#DDNS_ENABLE_X").attr("value",initial_array[18]);
			}
		if(initial_array[19]!=null && initial_array[19]!=""){
			$j("#DDNS_HOSTNAME_X").attr("value",initial_array[19]);
			}
		if(initial_array[20]!=null && initial_array[20]!=""){
			$j("#MAX_ON_HEAVY").attr("value",initial_array[20]);
			}
		if(initial_array[21]!=null && initial_array[21]!=""){
			$j("#MAX_QUEUES").attr("value",initial_array[21]);
			}
		if(initial_array[22]!=null && initial_array[22]!=""){
			$j("#MAX_ON_ED2K").attr("value",initial_array[22]);
			}

		if(location.host.split(":")[0] != initial_array[10]){
			if(initial_array[12] == 1){
				document.getElementById("to_DDNS").href = "http://" + location.host.split(":")[0] + ":" + initial_array[11] + "/Advanced_ASUSDDNS_Content.asp";
				}
			}
		else{
			document.getElementById("to_DDNS").href = "http://" + location.host.split(":")[0] + "/Advanced_ASUSDDNS_Content.asp";
			}
		if(initial_array[18] == 1)
			$("DDNSname").innerHTML = initial_array[19];
		else
			$("DDNSname").innerHTML = initial_array[17];
		if(initial_array[18] == 1)
			document.getElementById("WANforDM").href = "http://" + initial_array[19] +":"+initial_array[13];
		else
			document.getElementById("WANforDM").href = "http://" + initial_array[17] +":"+initial_array[13];
		if((initial_array[9] == 1 && initial_array[17] != "0.0.0.0") ||(initial_array[17] != "0.0.0.0" && initial_array[23] ==0)){
			$j("#WAN_explain_1").show();
			if(initial_array[12] == 1 || location.host.split(":")[0] == initial_array[10])
				$j("#WAN_explain_2").show();
			else
				$j("#WAN_explain_2").hide();
			}
		else{
			$j("#WAN_explain_1").hide();
			$j("#WAN_explain_2").hide();
			}
	}
/*function initial_general(){
	var url = "dm_apply.cgi";
	var action_mode = "initial";
	var type = "General";
	url += "?action_mode=" + action_mode + "&download_type=" +type+ "&t=" +Math.random();
	$j.get(url,function(data){initial_general_status(data);});
	}*/

function initial_bt_status(data){
	var initial_array = new Array();
	eval("initial_array="+data);
	if(initial_array[0]!=null && initial_array[0]!=""){
		if(initial_array[0] == 51413){
			$j("#Select_port1").attr("checked","checked");
			$j("#Incoming_port").attr("value",initial_array[0]);
			select_port(0);
			}
		else{
			$j("#Select_port2").attr("checked","checked");
			$j("#Incoming_port").attr("value",initial_array[0]);
			select_port(1);
			}
		}
	if(initial_array[1]!=null && initial_array[1]!=""){
		$j("#Auth_type"+initial_array[1]).attr("selected","selected");
		}
	if(initial_array[2]!=null && initial_array[2]!=""){
		$j("#Max_torrent_peer").attr("value",initial_array[2]);
		}
	if(initial_array[3]!=null && initial_array[3]!=""){
		$j("#Max_peer").attr("value",initial_array[3]);
		}
	if(initial_array[4]!=null && initial_array[4]!=""){
		$j("#Enable_dht").attr("value",initial_array[4]);
		if(initial_array[4] == 0)
		$j("#radio_wl2_closed").attr("title","off");
		else
		$j("#radio_wl2_closed").attr("title","on");
		$j('#radio_wl2_closed').iphoneSwitch($j("#Enable_dht").attr("value"), 
							 function() {
								$j("#Enable_dht").attr("value","1");
								$j("#radio_wl2_closed").attr("title","on");
							 },
							 function() {
								$j("#Enable_dht").attr("value","0");
								$j("#radio_wl2_closed").attr("title","off");
							 },
							 {
								//switch_on_container_path: '/plugin/iphone_switch_container_off.png'
							 }
						);
		}
	if(initial_array[5]!=null && initial_array[5]!=""){
		$j("#download_speed_limit").attr("value",initial_array[6]);
		if(initial_array[5] == 0){
			$j("#Down_limit").attr("value","0");
			//document.getElementById("Down_limit_checkbox").checked = true;
			document.getElementById('Down_limit_checkbox').checked = true;
			$j("#download_speed_limit").hide();
			$j("#download_speed_span").hide();
			}
		else{
			$j("#Down_limit").attr("value","1");
			//document.getElementById("Down_limit_checkbox").checked = false;
			document.getElementById('Down_limit_checkbox').checked = false;
			$j("#download_speed_limit").show();
			$j("#download_speed_span").show();
			}
		//Maximum_download_speed();
		}
	if(initial_array[7]!=null && initial_array[7]!=""){
		$j("#upload_speed_limit").attr("value",initial_array[8]);
		if(initial_array[7] == 0){
			$j("#Up_limit").attr("value","0");
			//document.getElementById("Up_limit_checkbox").checked = true;
			document.getElementById('Up_limit_checkbox').checked = true;
			$j("#upload_speed_limit").hide();
			$j("#upload_speed_span").hide();
			}
		else{
			$j("#Up_limit").attr("value","1");
			//document.getElementById("Up_limit_checkbox").checked = false;
			document.getElementById('Up_limit_checkbox').checked = false;
			$j("#upload_speed_limit").show();
			$j("#upload_speed_span").show();
			}
		//Maximum_upload_speed();
		}

	if(initial_array[9]!=null && initial_array[9]!=""){
		$j("#Enable_pex").attr("value",initial_array[9]);
		if(initial_array[9] == 0)
		$j("#radio_pex_closed").attr("title","off");
		else
		$j("#radio_pex_closed").attr("title","on");
		$j('#radio_pex_closed').iphoneSwitch($j("#Enable_dht").attr("value"), 
							 function() {
								$j("#Enable_pex").attr("value","1");
								$j("#radio_pex_closed").attr("title","on");
							 },
							 function() {
								$j("#Enable_pex").attr("value","0");
								$j("#radio_pex_closed").attr("title","off");
							 },
							 {
								//switch_on_container_path: '/plugin/iphone_switch_container_off.png'
							 }
						);
		}
	}	
	
function initial_bt(){
	var url = "dm_apply.cgi";
	var action_mode = "initial";
	var type = "BT";
	url += "?action_mode=" + action_mode + "&download_type=" +type+ "&t=" +Math.random();
	$j.get(url,function(data){initial_bt_status(data);});
	}
function initial_nzb_status(data){
	var initial_array = new Array();
	var SSLvalue = 0;
	eval("initial_array="+data);
	$j("#Server1Host").attr("value",initial_array[0]);
	$j("#serverPort").attr("value",initial_array[1]);
	if(initial_array[2]=="yes"){
		SSLvalue=1;
		$j("#Encryption").attr("value","yes");
		$j("#radio_ddns_enable_x").attr("title","on");
		}
	else if(initial_array[2]=="no"){
		SSLvalue=0;
		$j("#Encryption").attr("value","no");
		$j("#radio_ddns_enable_x").attr("title","off");
		}
	$j('#radio_ddns_enable_x').iphoneSwitch(SSLvalue, 
							 function() {
								 $j("#Encryption").attr("value","yes");
								 $j("#radio_ddns_enable_x").attr("title","on");
								//document.form.ddns_enable_x.value = "1";
								//return change_common_radio(document.form.ddns_enable_x, 'LANHostConfig', 'ddns_enable_x', '1')
							 },
							 function() {
								$j("#Encryption").attr("value","no");
								$j("#radio_ddns_enable_x").attr("title","off");
								//document.form.ddns_enable_x.value = "0";
								//return change_common_radio(document.form.ddns_enable_x, 'LANHostConfig', 'ddns_enable_x', '1')
							 },
							 {
								switch_on_container_path: 'plugin/iphone_switch_container_off.png'
							 }
						);
	$j("#User_name").attr("value",initial_array[3]);
	$j("#Password").attr("value",initial_array[4]);
	$j("#Confirm_Password").attr("value",initial_array[4]);
	$j("#Number_of_connections").attr("value",initial_array[5]);
	$j("#downloadSpeed_limit").attr("value",initial_array[6]);
	if(initial_array[6] == 0){
		$j("#NZBDown_limit_checkbox").attr("value",1);
		document.getElementById("NZBDown_limit_checkbox").checked = true;
		$j("#downloadSpeed_limit").hide();
		$j("#NZBdownload_speed_span").hide();
	}
	else{
		$j("#NZBDown_limit_checkbox").attr("value",0);
		document.getElementById("NZBDown_limit_checkbox").checked = false;
	}
	}

function initial_nzb(){
	var url = "dm_apply.cgi";
	var action_mode = "initial";
	var type = "NZB";
	url += "?action_mode=" + action_mode + "&download_type=" +type+ "&t=" +Math.random();
	$j.get(url,function(data){initial_nzb_status(data);});
	
	}
	
function create_tree(){
	var rootNode = new Ext.tree.TreeNode({ text:'Download2', id:'0'});
	var rootNodechild = new Ext.tree.TreeNode({ text:'', id:'0t'});
	rootNode.appendChild(rootNodechild);
	var tree = new Ext.tree.TreePanel({
			tbar:[{text:multiLanguage_setting_array[multi_INT][2],handler:function(){$j("#PATH").attr("value",Download_path);hidePanel();}},
				 {text:multiLanguage_setting_array[multi_INT][63],handler:function(){
					while(rootNode.firstChild)
						rootNode.removeChild(rootNode.firstChild);
					rootNode.appendChild(rootNodechild);
				}},
				{text:multiLanguage_setting_array[multi_INT][64],handler:function(){
					show_AddFloder();
					}},
				'->',{text:'X',handler:function(){hidePanel();}}
			],
			title:multiLanguage_setting_array[multi_INT][62],
			applyTo:'tree',
			root:rootNode,
			height:300,
			autoScroll:true
	});
	tree.on('expandnode',function(node){
		//alert('展开');
		var allParentNodes = getAllParentNodes(node);
		var path='';
		for(var j=0; j<allParentNodes.length; j++){
		path = allParentNodes[j].text + '/' +path;
		}
		path = BASE_PATH + '/' + path;
		initial_dir(path,node);
	});
	tree.on('collapsenode',function(node){
		while(node.firstChild){
			node.removeChild(node.firstChild);
		}
		var childNode = new Ext.tree.TreeNode({ text:'', id:'0t'});
		node.appendChild(childNode);
	});
	tree.on('click',function(node){
	//	alert('单击');
		var allParentNodes = getAllParentNodes(node);
		var path='';
		for(var j=0; j<allParentNodes.length; j++){
		path = allParentNodes[j].text + '/' +path;
		}
		//alert(path);
		Download_path = path;
		path = BASE_PATH + '/' + path;
		var url = "dm_disk_info.cgi";
		var type = "General";
		url += "?action_mode=" +path+ "&t=" +Math.random();
		$j.get(url,function(data){initial_folderlist(data);});
	});
	//tree.on('dblclick',function(node){
	//	//alert('双击');
	//	var allParentNodes = getAllParentNodes(node);
	//	var path='';
	//	for(var j=0; j<allParentNodes.length; j++){
	//	path = allParentNodes[j].text + '/' +path;
	//	}
	//	initial_dir(path,node);
	//});
}
function getAllParentNodes(node) {
	var parentNodes = [];
	parentNodes.push(node);
	while (node.parentNode) {
		parentNodes = parentNodes.concat(node.parentNode);
		node = node.parentNode;
		}
	return parentNodes;
	};

function initial_dir_status(data,node){
	dm_dir.length = 0;
	if(data == "/" || (data != null && data != "")){
		eval("dm_dir=[" + data +"]");	
		while(node.lastChild &&(node.lastChild !=node.firstChild)) {
    			node.removeChild(node.lastChild);
		}
		for(var i=0; i<dm_dir.length; i++){
			var childNodeId = node.id +i;
			var childnode = new Ext.tree.TreeNode({id:childNodeId,text:dm_dir[i]});
			node.appendChild(childnode);
			var childnodeT = new Ext.tree.TreeNode({id:childNodeId+'t',text:''});
			childnode.appendChild(childnodeT);
		}
		node.removeChild(node.firstChild);
	}
	else{
		while(node.firstChild){
			node.removeChild(node.firstChild);
		}
	}
}

function initial_dir(path,node){
	var url = "dm_disk_info.cgi";
	var type = "General";
	url += "?action_mode=" +path+ "&t=" +Math.random();
	$j.get(url,function(data){initial_dir_status(data,node);});
	}
	
function getWH(){
	var winWidth;
	var winHeight;
	winWidth = document.documentElement.scrollWidth;
	if(document.documentElement.clientHeight > document.documentElement.scrollHeight)
	winHeight = document.documentElement.clientHeight;
	else
	winHeight = document.documentElement.scrollHeight;
	$("DM_mask").style.width = winWidth+"px";
	$("DM_mask").style.height = winHeight+"px";
	}	

function showPanel(){
	WH_INT = setInterval("getWH();",1000);
   	$j("#DM_mask").fadeIn(1000);
    $j("#panel_add").show(1000);
	create_tree();
	}
function hidePanel(){
	($j("#tree").children()).remove();
	clearInterval(WH_INT);
	$j("#DM_mask").fadeOut('fast');
	$j("#panel_add").hide('fast');
	}
function getFloderWH(){
	var winWidth;
	var winHeight;
	winWidth = document.documentElement.scrollWidth;
	if(document.documentElement.clientHeight > document.documentElement.scrollHeight)
	winHeight = document.documentElement.clientHeight;
	else
	winHeight = document.documentElement.scrollHeight;
	$("DM_mask_floder").style.width = winWidth+"px";
	$("DM_mask_floder").style.height = winHeight+"px";
	}
function show_AddFloder(){
	Floder_WH_INT = setInterval("getFloderWH();",1000);
	$j("#DM_mask_floder").fadeIn(1000);
	$j("#panel_addFloder").show(1000);
	}
function hide_AddFloder(){
	clearInterval(Floder_WH_INT);
	$j("#DM_mask_floder").fadeOut('fast');
	$j("#panel_addFloder").hide('fast');
	$j("#newFloder").attr("value","");
	}
function AddFloderName(){
	var url;
	var action_mode = "DM_ADD_FLODER";
	var new_floder_name = document.getElementById("newFloder").value;
	var path = BASE_PATH + '/' + Download_path;
	url = "dm_apply.cgi?action_mode=" +action_mode+"&new_floder_name="+ new_floder_name+"&path="+path+"&t=" +Math.random();
	var judgment = validForm();
	if(judgment){
		$j.get(url,function(data){
							($j("#tree").children()).remove();
							create_tree();
							Download_path = 'Download2';
							hide_AddFloder();})
		}
	}
function validForm(){
	$("newFloder").value = trim($("newFloder").value);
	
	// share name
	if($("newFloder").value.length == 0){
		alert(multiLanguage_setting_array[multi_INT][56]);
		$("newFloder").focus();
		return false;
	}
	
	var re = new RegExp("[^a-zA-Z0-9 _-]+", "gi");
	if(re.test($("newFloder").value)){
		alert(multiLanguage_setting_array[multi_INT][57]);
		$("newFloder").focus();
		return false;
	}
	
	if(checkDuplicateName($("newFloder").value, folderlist)){
		alert(multiLanguage_setting_array[multi_INT][58]+"\n"+multiLanguage_setting_array[multi_INT][59]);
		$("newFloder").focus();
		return false;
	}
	
	if(trim($("newFloder").value).length > 12)
		if (!(confirm(multiLanguage_setting_array[multi_INT][60]+"\n"+multiLanguage_setting_array[multi_INT][61])))
			return false;
	
	return true;
}
function checkDuplicateName(newname, teststr){
	var existing_string = teststr.join(',');
	existing_string = "," + existing_string + ",";
	var newstr = "," + trim(newname) + ","; 

	var re = new RegExp(newstr,"gi")
	var matchArray =  existing_string.match(re);
	if (matchArray != null)
		return true;
	else
		return false;
}
function initial_folderlist(data){
	eval("folderlist=["+data+"]");
	}
