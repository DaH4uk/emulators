if (!$.paramsloaded)
{
	var menulist=new Array( "menu.htm","status.htm","quicksetup.htm","qsDiag.htm","qsIsp.htm","qsDsl.htm","qsEwan.htm","qsWl.htm","qsEnd.htm","networkMap.htm","sysMode.htm","wanBasic.htm","ethWan.htm","wan.htm","lan.htm","lanEdit.htm","ipv6.htm","dslcfg.htm","macClone.htm","div.htm","dsl.htm","pppoe.htm","pppoa.htm","ipoa.htm","dynamicIp.htm","staticIp.htm","group.htm","groupAdd.htm","lan6.htm","dhcp.htm","dhcpEdit.htm","dhcpServer.htm","dhcpStaticEdit.htm","dhcpCondEdit.htm","sysconf.htm","wirelessBasic.htm","guestBasic.htm","wps.htm","wlScan_2G.htm","wlScan_5G.htm","wlScan.htm","wlGuestDulBandBasic.htm","wlGuestDulBandAdv.htm","wirelessSettings.htm","guestNetwork.htm","macFilter.htm","wirelessStat.htm","wirelessSchedule.htm","printSrv.htm","usbManage.htm","diskSettings.htm","folderSharing.htm","iptv.htm","route.htm","trafficCtrl.htm","ddns.htm","alg.htm","virtualServer.htm","portTrigger.htm","dmz.htm","upnp.htm","parentCtrl.htm","ddos.htm","accessControl.htm","trafficCtrl.htm","arpBind.htm","log.htm","logConf.htm","time.htm","diagnostic.htm","manageCtrl.htm","backNRestore.htm","softup.htm","snmp.htm","cwmp.htm","restart.htm","stat.htm","ipsec.htm","");
	$.paramsloaded = true;
	if (!$.find)
		$.find =  function( container, query ) {
			if (query === undefined) {
				query = container;
				container = $.d;
			}
			if ((container.nodeType && container.nodeType == 1 || container == $.d) && typeof query === "string") {
				query = " " + query;
				var qs = query.match(/\s*[#\.]?\w+/g);
				var ql;
				var ret = (container instanceof Array) ? container : [container];

				var contains = $.d.compareDocumentPosition ? function(a, b){
					return !!(a.compareDocumentPosition(b) & 16);
				} : function(a, b){
					return a !== b && (a.contains ? a.contains(b) : true);
				};
				
				while(ql = qs.shift()){
					var newRet = [];
					var exp = ql.match(/(\s*)([#\.]?)(\w+)/);
					if (exp)
						switch (exp[2]) {
						case '#':
							var obj = $.d.getElementById(exp[3]);

							if (obj && ((exp[1] && !$.each(ret, function(arg){if (contains(this, arg)) return false}, obj))
								|| (!exp[1] && $.inArray(obj, ret))))
								newRet = [obj];
							else
								return null;
							break;
						case '.':
							$.each(ret, function(){
								if (exp[1])
									$.surf(this, function(){if ($.hasClass(this, exp[3]) && !$.inArray(this, newRet)) newRet.push(this)});
								else if ($.hasClass(this, exp[3]) && !$.inArray(this, newRet))
									newRet.push(this);
							});
							break;
						default:
							$.each(ret, function(){$.merge(newRet, $.d.getElementsByTagName(exp[3]))});
							break;
						}
					if (newRet.length) {
						ret = newRet; 
						newRet = null;
					}
					else
						return null;
				}
				return ret;
			}
		};	
}

if($.curPage)
{
	switch(/(\w+).htm$/.exec($.curPage)[1])
	{
	case "demorpm":
		var testarg = "好的\"\\\'";
		break;
	case "softup":
		var _ret = 0;
		break;
	case "brdemo":
		var vlan = 1;
		var brlist = ["br0", "br1"];
		var filterlist = ["br0", "br1", "br0", "br1", "br0"];
		var iflist = ["eth0", "eth0.1", "eth0.2", "eth0.3", "eth0.4"];
		break;
	case "status":
		var swVer = "0.9.9 Build 101111 Rel.12345";
		var hwVer = "1.0.0";
		var lanArg = ["00-11-22-33-44-55", "192.168.0.1", "255.255.255.0"];
		var wanArg = ["00-11-22-33-44-56", "172.31.70.120", "255.255.0.0", "172.31.70.1", "172.31.70.1,0.0.0.0"];
		var wlArg = ["Enabled", "TPLINK_334455", "6", "11n", "600Mbps", "00-11-22-33-44-55"];
		var staArg = ["7453689", "1022303", "21232", "3821"];
		$.ret = 0;
		break;
	case "bnr":
		$.ret = 0;
		break;
	case "voice_usbmail":
		var usbMailString = null;
		var usbMailCapAvail = null;
		break;
	case "voice_calllog":
		var callLogString = null;
		break
	}
}
/****************************************************************************************/
if ($.local || $.sim)
{
	lanMacs = [];
	lanMacs[0] = "00:11:22:33:44:55";
	lanMacs[1] = "11:22:33:44:55:66";
	clientMac = "EC:88:8F:EA:F4:68";
	clientIp = "192.168.0.100";
	userType = "Admin";
	curName = "Admin";
	clientLocal = 80;
	bSecured = 80;
}
 /****************************************************************************************/ 