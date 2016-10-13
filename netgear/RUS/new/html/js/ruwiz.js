var product_id='';
var welcome_wan_type;
//static
var static_ip="";
var static_subnet="";
var static_gateway="";
var static_dns1="";
var static_dns2="";
//dhcp
var account_name;
if(product_id == "JWNR2000T")
account_name="JWNR2000T";
else
account_name="JWNR2000v2";
var domain_name="";
var wan_assign="0";
//pppoe
var pppoe_username="";
var pppoe_password="";
var pppoe_server="";
var pppoe_idle=5;
var pppoe_wan_assign="0";
var pppoe_static_ip="";
var pppoe_dns_assign="0";
var pppoe_dns1="";
var pppoe_dns2="";
var pppoe_eth_ip="";
var pppoe_eth_netmask="";
var pppoe_eth_gateway="";
var pppoe_dual_assign="0";
var dual_access="";
//pptp
var pptp_username="";
var pptp_password="";
var pptp_idle_time=5;
var pptp_local_ipaddr="";
var pptp_local_netmask="";
var pptp_local_gateway="";
var pptp_dns_assign="0";
var pptp_dns1="";
var pptp_dns2="";
var pptp_server_ipaddr="";
var pptp_connect_id="";
var pptp_wan_assign=0;
var pptp_server_FQDN=0;
//l2tp
var l2tp_username="";
var l2tp_password="";
var l2tp_idle_time=5;
var l2tp_local_ipaddr="";
var l2tp_local_netmask="";
var l2tp_local_gateway="";
var l2tp_dns_assign="0";
var l2tp_dns1="";
var l2tp_dns2="";
var l2tp_server_ipaddr="";
var l2tp_connect_id="";
var l2tp_wan_assign=0;
var l2tp_server_FQDN=0;
//bpa
var telstra_bigpond_user_name="";
var telstra_bigpond_password="";
var telstra_idletime=5;
var telstra_bigpond_ip="";
var wl0_ssid="NETGEAR";
var wl_country="7"
var wl0_sec_mode="none";
var wl0_pskkey="";
var wl0_wpaenc="";
var temp_password="";
var wirelessMode=2;
//for ca_10_EnterWEP_Key.cgi
var wl0_key1="";
var wl0_keylength="40";
var wl0_txkey="";
var w10_keystr="";
//for RU CD-less intallation
var browser_lang="Russian";
var conflict_wanlan="0";
var isp_type="0";
var mac_spoof="0";
var Spoofmac="";
var STATIC_DNS="0";
var RU_manual_flag="0";
var manual_ppp_type="0";
var need_auth="";
var vpn_server="";
var connection_id="";
