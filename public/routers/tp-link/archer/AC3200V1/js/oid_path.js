/*  Copyright(c) 2009-2011 Shenzhen TP-LINK Technologies Co.Ltd.
 *
 * file		oid_path.js
 * brief	Define object full path for web.	
 * details	
 *
 * author	Wu Zhiqin
 * version	1.0.0
 * date		16Jul15

 *
 * history 	\arg	
 */

/*
 * This file is automatically generated from the data-model spreadsheet.
 * Do not modify this file directly - You will lose all your changes the
 * next time this file is generated!
 */


/*! file oid_path.js 
 * brief Automatically generated header file oid_path.js
 */


/*
 * brief Define object full path for web.
 */
var oid_str = {
/*   1 */ "IGD" : "InternetGatewayDevice.",
/*   2 */ "IGD_DEV_INFO" : "InternetGatewayDevice.DeviceInfo.",
/*   3 */ "SYSLOG_CFG" : "InternetGatewayDevice.DeviceInfo.X_TP_LogCfg.",
/*   4 */ "MANAGEMENT_SERVER" : "InternetGatewayDevice.ManagementServer.",
/*   5 */ "ETH_SWITCH" : "InternetGatewayDevice.X_TP_EthSwitch.",
/*   6 */ "SYS_CFG" : "InternetGatewayDevice.X_TP_SysCfg.",
/*   7 */ "NET_CFG" : "InternetGatewayDevice.X_TP_NetCfg.",
/*   8 */ "USER_CFG" : "InternetGatewayDevice.X_TP_UserCfg.",
/*   9 */ "APP_CFG" : "InternetGatewayDevice.X_TP_AppCfg.",
/*  10 */ "HTTP_CFG" : "InternetGatewayDevice.X_TP_AppCfg.HttpCfg.",
/*  11 */ "PH_DDNS_CFG" : "InternetGatewayDevice.X_TP_AppCfg.PhDDNSCfg.{i}.",
/*  12 */ "PH_RT_DATA" : "InternetGatewayDevice.X_TP_AppCfg.PhDDNSCfg.{i}.PhRTData.",
/*  13 */ "DYN_DNS_CFG" : "InternetGatewayDevice.X_TP_AppCfg.DynDnsCfg.",
/*  14 */ "UPNP_CFG" : "InternetGatewayDevice.X_TP_AppCfg.UPnPCfg.",
/*  15 */ "UPNP_PORTMAPPING" : "InternetGatewayDevice.X_TP_AppCfg.UPnPCfg.PortMapping.{i}.",
/*  16 */ "DIAG_TOOL" : "InternetGatewayDevice.X_TP_AppCfg.DiagnosticTool.",
/*  17 */ "CWMP_CFG" : "InternetGatewayDevice.X_TP_AppCfg.CwmpCfg.",
/*  18 */ "SNMP_CFG" : "InternetGatewayDevice.X_TP_AppCfg.SnmpCfg.",
/*  19 */ "NOIP_DNS_CFG" : "InternetGatewayDevice.X_TP_AppCfg.NoipDnsCfg.",
/*  20 */ "ACL_CFG" : "InternetGatewayDevice.X_TP_AppCfg.ACL.{i}.",
/*  21 */ "DMZ_HOST_CFG" : "InternetGatewayDevice.X_TP_DmzHostCfg.",
/*  22 */ "TIME" : "InternetGatewayDevice.Time.",
/*  23 */ "HOUR" : "InternetGatewayDevice.Time.X_TP_Hour.",
/*  24 */ "L3_FORWARDING" : "InternetGatewayDevice.Layer3Forwarding.",
/*  25 */ "L3_FORWARDING_ENTRY" : "InternetGatewayDevice.Layer3Forwarding.Forwarding.{i}.",
/*  26 */ "L3_IP6_FORWARDING" : "InternetGatewayDevice.X_TP_Layer3IPv6Forwarding.",
/*  27 */ "L3_IP6_FORWARDING_ENTRY" : "InternetGatewayDevice.X_TP_Layer3IPv6Forwarding.IPv6Forwarding.{i}.",
/*  28 */ "L2_BRIDGING" : "InternetGatewayDevice.Layer2Bridging.",
/*  29 */ "L2_BRIDGING_ENTRY" : "InternetGatewayDevice.Layer2Bridging.Bridge.{i}.",
/*  30 */ "L2_BRIDGING_FILTER" : "InternetGatewayDevice.Layer2Bridging.Filter.{i}.",
/*  31 */ "L2_BRIDGING_INTF" : "InternetGatewayDevice.Layer2Bridging.AvailableInterface.{i}.",
/*  32 */ "LAN_DEV" : "InternetGatewayDevice.LANDevice.{i}.",
/*  33 */ "LAN_HOST_CFG" : "InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.",
/*  34 */ "LAN_IP_INTF" : "InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.IPInterface.{i}.",
/*  35 */ "LAN_DHCP_STATIC_ADDR" : "InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.DHCPStaticAddress.{i}.",
/*  36 */ "LAN_DHCP_COND_SRV_POOL" : "InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.DHCPConditionalServingPool.{i}.",
/*  37 */ "LAN_DHCP_COND_SRV_POOL_OPT" : "InternetGatewayDevice.LANDevice.{i}.LANHostConfigManagement.DHCPConditionalServingPool.{i}.DHCPOption.{i}.",
/*  38 */ "LAN_IP6_HOST_CFG" : "InternetGatewayDevice.LANDevice.{i}.X_TP_LANIPv6HostConfigManagement.",
/*  39 */ "LAN_IP6_INTF" : "InternetGatewayDevice.LANDevice.{i}.X_TP_LANIPv6HostConfigManagement.IPv6Interface.{i}.",
/*  40 */ "LAN_ETH_INTF" : "InternetGatewayDevice.LANDevice.{i}.LANEthernetInterfaceConfig.{i}.",
/*  41 */ "LAN_HOSTS" : "InternetGatewayDevice.LANDevice.{i}.Hosts.",
/*  42 */ "LAN_HOST_ENTRY" : "InternetGatewayDevice.LANDevice.{i}.Hosts.Host.{i}.",
/*  43 */ "LAN_WLAN" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.",
/*  44 */ "LAN_WLAN_WPS" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.WPS.",
/*  45 */ "LAN_WLAN_MACTABLEENTRY" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_MACTableEntry.{i}.",
/*  46 */ "LAN_WLAN_ASSOC_DEV" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.AssociatedDevice.{i}.",
/*  47 */ "LAN_WLAN_BSSDESC_ENTRY" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_BSSDescEntry.{i}.",
/*  48 */ "LAN_WLAN_WEPKEY" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.WEPKey.{i}.",
/*  49 */ "LAN_WLAN_WDSBRIDGE" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_WDSBridge.",
/*  50 */ "LAN_WLAN_MULTISSID" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_MultiSSID.",
/*  51 */ "LAN_WLAN_MSSIDENTRY" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_MultiSSID.MultiSSIDEntry.{i}.",
/*  52 */ "LAN_WLAN_MSSIDWEPKEY" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_MultiSSID.MultiSSIDEntry.{i}.WEPKey.{i}.",
/*  53 */ "LAN_WLAN_WLBRNAME" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_WlBrName.{i}.",
/*  54 */ "LAN_WLAN_TASK_SCHEDULE" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_TaskSchedule.",
/*  55 */ "LAN_WLAN_GUESTNET" : "InternetGatewayDevice.LANDevice.{i}.WLANConfiguration.{i}.X_TP_GuestNetwork.",
/*  56 */ "LAN_IGMP_SNOOP" : "InternetGatewayDevice.LANDevice.{i}.X_TP_LANIGMPSnoopConfig.",
/*  57 */ "WAN_DEV" : "InternetGatewayDevice.WANDevice.{i}.",
/*  58 */ "WAN_COMMON_INTF_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANCommonInterfaceConfig.",
/*  59 */ "WAN_DSL_INTF_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANDSLInterfaceConfig.",
/*  60 */ "WAN_DSL_INTF_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANDSLInterfaceConfig.Stats.",
/*  61 */ "WAN_DSL_INTF_STATS_TOTAL" : "InternetGatewayDevice.WANDevice.{i}.WANDSLInterfaceConfig.Stats.Total.",
/*  62 */ "WAN_ETH_INTF" : "InternetGatewayDevice.WANDevice.{i}.WANEthernetInterfaceConfig.",
/*  63 */ "WAN_ETH_INTF_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANEthernetInterfaceConfig.Stats.",
/*  64 */ "WAN_PON" : "InternetGatewayDevice.WANDevice.{i}.X_TP_WANPonConfig.",
/*  65 */ "WAN_EPON_INTF" : "InternetGatewayDevice.WANDevice.{i}.WANEponInterafceConfig.",
/*  66 */ "WAN_EPON_INTF_OAM_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANEponInterafceConfig.OAMStats.",
/*  67 */ "WAN_EPON_INTF_MPCP_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANEponInterafceConfig.MPCPStats.",
/*  68 */ "WAN_EPON_INTF_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANEponInterafceConfig.Stats.",
/*  69 */ "WAN_EPON_INTF_OPTICAL_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANEponInterafceConfig.EponOpticalStats.",
/*  70 */ "WAN_GPON_INTF" : "InternetGatewayDevice.WANDevice.{i}.WANGponInterafceConfig.",
/*  71 */ "WAN_GPON_INTF_OMCI_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANGponInterafceConfig.OMCIStats.",
/*  72 */ "WAN_GPON_INTF_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANGponInterafceConfig.Stats.",
/*  73 */ "WAN_GPON_INTF_OPTICAL_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANGponInterafceConfig.GponOpticalStats.",
/*  74 */ "WAN_CONN_DEVICE" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.",
/*  75 */ "WAN_DSL_LINK_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANDSLLinkConfig.",
/*  76 */ "WAN_PTM_LINK_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPTMLinkConfig.",
/*  77 */ "WAN_PTM_LINK_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPTMLinkConfig.Stats.",
/*  78 */ "WAN_PON_LINK_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_WANPonLinkConfig.",
/*  79 */ "WAN_ETH_LINK_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANEthernetLinkConfig.",
/*  80 */ "WAN_USB_3G_LINK_CFG" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_WANUSB3gLinkConfig.",
/*  81 */ "USB_MODEM_PARAM" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_WANUSB3gLinkConfig.UsbModemParam.{i}.",
/*  82 */ "WAN_L2TP_CONN" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_L2TP_Connection.",
/*  83 */ "WAN_L2TP_CONN_PORTMAPPING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_L2TP_Connection.PortMapping.{i}.",
/*  84 */ "L2TP_CONN_PORTTRIGGERING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_L2TP_Connection.PortTriggering.{i}.",
/*  85 */ "WAN_L2TP_CONN_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_L2TP_Connection.Stats.",
/*  86 */ "WAN_PPTP_CONN" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_PPTP_Connection.",
/*  87 */ "WAN_PPTP_CONN_PORTMAPPING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_PPTP_Connection.PortMapping.{i}.",
/*  88 */ "PPTP_CONN_PORTTRIGGERING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_PPTP_Connection.PortTriggering.{i}.",
/*  89 */ "WAN_PPTP_CONN_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.X_TP_PPTP_Connection.Stats.",
/*  90 */ "WAN_IP_CONN" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANIPConnection.{i}.",
/*  91 */ "WAN_IP_CONN_PORTMAPPING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANIPConnection.{i}.PortMapping.{i}.",
/*  92 */ "IP_CONN_PORTTRIGGERING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANIPConnection.{i}.X_TP_PortTriggering.{i}.",
/*  93 */ "WAN_PPP_CONN" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPPPConnection.{i}.",
/*  94 */ "WAN_PPP_CONN_PORTMAPPING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPPPConnection.{i}.PortMapping.{i}.",
/*  95 */ "PPP_CONN_PORTTRIGGERING" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPPPConnection.{i}.X_TP_PortTriggering.{i}.",
/*  96 */ "WAN_PPP_CONN_STATS" : "InternetGatewayDevice.WANDevice.{i}.WANConnectionDevice.{i}.WANPPPConnection.{i}.Stats.",
/*  97 */ "STAT_CFG" : "InternetGatewayDevice.X_TP_StatCfg.",
/*  98 */ "STAT_ENTRY" : "InternetGatewayDevice.X_TP_StatCfg.X_TP_StatEntry.{i}.",
/*  99 */ "DDOS_CFG" : "InternetGatewayDevice.X_TP_StatCfg.X_TP_DdosCfg.",
/* 100 */ "DOS_HOST" : "InternetGatewayDevice.X_TP_StatCfg.X_TP_DdosCfg.X_TP_Thwarter.{i}.",
/* 101 */ "ARP" : "InternetGatewayDevice.X_TP_ARP.",
/* 102 */ "ARP_ENTRY" : "InternetGatewayDevice.X_TP_ARP.ArpEntry.{i}.",
/* 103 */ "ARP_BIND" : "InternetGatewayDevice.X_TP_ARP.ArpBindTbl.",
/* 104 */ "ARP_BIND_ENTRY" : "InternetGatewayDevice.X_TP_ARP.ArpBindTbl.ArpBindEntry.{i}.",
/* 105 */ "QUEUE_MANAGEMENT" : "InternetGatewayDevice.QueueManagement.",
/* 106 */ "CLASSIFICATION" : "InternetGatewayDevice.QueueManagement.Classification.{i}.",
/* 107 */ "QOS_APP" : "InternetGatewayDevice.QueueManagement.X_TP_App.{i}.",
/* 108 */ "QOS_INTF" : "InternetGatewayDevice.QueueManagement.X_TP_Interface.{i}.",
/* 109 */ "QOS_QUEUE" : "InternetGatewayDevice.QueueManagement.X_TP_Interface.{i}.Queue.{i}.",
/* 110 */ "TC" : "InternetGatewayDevice.X_TP_TrafficControl.",
/* 111 */ "TC_RULE" : "InternetGatewayDevice.X_TP_TrafficControl.TCRule.{i}.",
/* 112 */ "ALG_CFG" : "InternetGatewayDevice.X_TP_AlgCfg.",
/* 113 */ "IPTV" : "InternetGatewayDevice.X_TP_IPTV.",
/* 114 */ "DSL_IPTV_CFG" : "InternetGatewayDevice.X_TP_IPTV.DslIptvCfg.",
/* 115 */ "ETH_IPTV_CFG" : "InternetGatewayDevice.X_TP_IPTV.EthIptvCfg.",
/* 116 */ "FIREWALL" : "InternetGatewayDevice.X_TP_Firewall.",
/* 117 */ "INTERNAL_HOST" : "InternetGatewayDevice.X_TP_Firewall.InternalHost.{i}.",
/* 118 */ "EXTERNAL_HOST" : "InternetGatewayDevice.X_TP_Firewall.ExternalHost.{i}.",
/* 119 */ "TASK_SCHEDULE" : "InternetGatewayDevice.X_TP_Firewall.TaskSchedule.{i}.",
/* 120 */ "RULE" : "InternetGatewayDevice.X_TP_Firewall.Rule.{i}.",
/* 121 */ "URL_LIST" : "InternetGatewayDevice.X_TP_Firewall.UrlList.",
/* 122 */ "URL_CFG" : "InternetGatewayDevice.X_TP_Firewall.UrlList.UrlCfg.{i}.",
/* 123 */ "IP6_FIREWALL" : "InternetGatewayDevice.X_TP_IPv6Firewall.",
/* 124 */ "IP6_INTERNAL_HOST" : "InternetGatewayDevice.X_TP_IPv6Firewall.InternalHost.{i}.",
/* 125 */ "IP6_EXTERNAL_HOST" : "InternetGatewayDevice.X_TP_IPv6Firewall.ExternalHost.{i}.",
/* 126 */ "IP6_TASK_SCHEDULE" : "InternetGatewayDevice.X_TP_IPv6Firewall.TaskSchedule.{i}.",
/* 127 */ "IP6_RULE" : "InternetGatewayDevice.X_TP_IPv6Firewall.Rule.{i}.",
/* 128 */ "IP6_TUNNEL" : "InternetGatewayDevice.X_TP_IPv6Tunnel.",
/* 129 */ "DSLITE" : "InternetGatewayDevice.X_TP_IPv6Tunnel.DSLite.",
/* 130 */ "SIT_6RD" : "InternetGatewayDevice.X_TP_IPv6Tunnel.Sit6RD.",
/* 131 */ "SERVICES" : "InternetGatewayDevice.Services.",
/* 132 */ "VOICE" : "InternetGatewayDevice.Services.VoiceService.{i}.",
/* 133 */ "XTP_VOICE_PROCESS_STS" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_VoiceProcessSts.",
/* 134 */ "XTP_VOICE_PROCESS" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_VoiceProcess.",
/* 135 */ "VOICE_CAP" : "InternetGatewayDevice.Services.VoiceService.{i}.Capabilities.",
/* 136 */ "VOICE_CAP_SIP" : "InternetGatewayDevice.Services.VoiceService.{i}.Capabilities.SIP.",
/* 137 */ "VOICE_CAP_MGCP" : "InternetGatewayDevice.Services.VoiceService.{i}.Capabilities.MGCP.",
/* 138 */ "VOICE_CAP_CODECS" : "InternetGatewayDevice.Services.VoiceService.{i}.Capabilities.Codecs.{i}.",
/* 139 */ "VOICE_PROF" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.",
/* 140 */ "VOICE_PROF_PROVIDER" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.ServiceProviderInfo.",
/* 141 */ "VOICE_PROF_SIP" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.SIP.",
/* 142 */ "VOICE_PROF_SIP_EVTSUBSCRIBE" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.SIP.EventSubscribe.{i}.",
/* 143 */ "VOICE_PROF_MGCP" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.MGCP.",
/* 144 */ "VOICE_PROF_RTP" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.RTP.",
/* 145 */ "VOICE_PROF_FAXT38" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.FaxT38.",
/* 146 */ "XTP_USB_VOICEMAIL_PUBLICCFG" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.X_TP_UsbVoiceMail.",
/* 147 */ "XTP_MULTI_ISP" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.X_TP_MultiIsp.{i}.",
/* 148 */ "XTP_MULTIISP_CODEC" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.X_TP_MultiIsp.{i}.Codec.",
/* 149 */ "XTP_MULTIISP_CODEC_LIST" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.X_TP_MultiIsp.{i}.Codec.List.{i}.",
/* 150 */ "VOICE_PROF_LINE" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.",
/* 151 */ "VOICE_PROF_LINE_SIP" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.SIP.",
/* 152 */ "XTP_DECT_HANDSET_INFO" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.X_TP_DectHandsetInfo.",
/* 153 */ "VOICE_PROF_LINE_XTPUSBVM" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.X_TP_UsbVoiceMail.",
/* 154 */ "VOICE_PROF_LINE_CALLFEAT" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.CallingFeatures.",
/* 155 */ "VOICE_PROF_LINE_PROC" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.VoiceProcessing.",
/* 156 */ "VOICE_PROF_LINE_CODEC" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.Codec.",
/* 157 */ "VOICE_PROF_LINE_CODEC_LIST" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.Codec.List.{i}.",
/* 158 */ "VOICE_PROF_LINE_STATS" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.Stats.",
/* 159 */ "XTP_INCOMING_CALL" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.X_TP_IncomingCall.{i}.",
/* 160 */ "XTP_OUTGOING_CALL" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.Line.{i}.X_TP_OutgoingCall.{i}.",
/* 161 */ "XTP_FEATURE_CODE" : "InternetGatewayDevice.Services.VoiceService.{i}.VoiceProfile.{i}.X_TP_FeatureCode.{i}.",
/* 162 */ "VOICE_PHY_INTERFACE" : "InternetGatewayDevice.Services.VoiceService.{i}.PhyInterface.{i}.",
/* 163 */ "VOICE_PHYINTERFACE_TESTS" : "InternetGatewayDevice.Services.VoiceService.{i}.PhyInterface.{i}.Tests.",
/* 164 */ "XTP_VOICE_MULTI_ISPDIALPLAN" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_MultiIspDialPlan.",
/* 165 */ "XTP_VOICE_PSTN" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_PSTN.{i}.",
/* 166 */ "XTP_DECT_BASE_STATION" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_DectBaseStation.",
/* 167 */ "XTP_TELE_CONTACT" : "InternetGatewayDevice.Services.VoiceService.{i}.X_TP_TelephoneContact.{i}.",
/* 168 */ "STORAGE_SERVICE" : "InternetGatewayDevice.Services.StorageService.",
/* 169 */ "CAPABLE" : "InternetGatewayDevice.Services.StorageService.Capabilities.",
/* 170 */ "USER_ACCOUNT" : "InternetGatewayDevice.Services.StorageService.UserAccount.{i}.",
/* 171 */ "USB_DEVICE" : "InternetGatewayDevice.Services.StorageService.X_TP_UsbDevice.{i}.",
/* 172 */ "LOGICAL_VOLUME" : "InternetGatewayDevice.Services.StorageService.X_TP_UsbDevice.{i}.LogicalVolume.{i}.",
/* 173 */ "FOLDER_BROWSE" : "InternetGatewayDevice.Services.StorageService.X_TP_FolderBrowse.",
/* 174 */ "FOLDER_NODE" : "InternetGatewayDevice.Services.StorageService.X_TP_FolderBrowse.FolderNode.{i}.",
/* 175 */ "DLNA_MEDIA_SERVER" : "InternetGatewayDevice.Services.StorageService.X_TP_DLNAMediaServer.",
/* 176 */ "DLNA_MEDIA_SERVER_FOLDER" : "InternetGatewayDevice.Services.StorageService.X_TP_DLNAMediaServer.DLNA_FOLDER.{i}.",
/* 177 */ "SMB_SERVICE" : "InternetGatewayDevice.Services.StorageService.X_TP_SMBService.",
/* 178 */ "SMB_SERVICE_FOLDER" : "InternetGatewayDevice.Services.StorageService.X_TP_SMBService.SMB_FOLDER.{i}.",
/* 179 */ "SMB_USER_ACCESS" : "InternetGatewayDevice.Services.StorageService.X_TP_SMBService.SMB_FOLDER.{i}.SMB_USER_ACCESS.{i}.",
/* 180 */ "FTP_SERVER" : "InternetGatewayDevice.Services.StorageService.FTPServer.",
/* 181 */ "FTP_SERVER_FOLDER" : "InternetGatewayDevice.Services.StorageService.FTPServer.FTP_FOLDER.{i}.",
/* 182 */ "FTP_USER_ACCESS" : "InternetGatewayDevice.Services.StorageService.FTPServer.FTP_FOLDER.{i}.FTP_USER_ACCESS.{i}.",
/* 183 */ "XTP_PRINT_SERVICE" : "InternetGatewayDevice.Services.X_TP_PrintService.",
/* 184 */ "XTP_VOICE_DND" : "InternetGatewayDevice.X_TP_VoiceDND.",
/* 185 */ "XTP_CALL_FWD" : "InternetGatewayDevice.X_TP_CallForward.",
/* 186 */ "XTP_CALL_FWD_LIST" : "InternetGatewayDevice.X_TP_CallForward.List.{i}.",
/* 187 */ "XTP_CALL_THROUGH" : "InternetGatewayDevice.X_TP_CallThrough.",
/* 188 */ "XTP_CALLTHROUGH_NUM" : "InternetGatewayDevice.X_TP_CallThrough.AllowedCallerNum.{i}.",
/* 189 */ "XTP_IGD_CALL_FIREWALL_CFG" : "InternetGatewayDevice.X_TP_CallFireWallCfg.",
/* 190 */ "XTP_IGD_SPEED_DIAL_CFG" : "InternetGatewayDevice.X_TP_SpeedDialCfg.",
/* 191 */ "XTP_IGD_MULTI_ISP_DIAL_PLAN" : "InternetGatewayDevice.X_TP_MultiIspDialPlan.",
/* 192 */ "XTP_IGD_MULTIISPDP_LIST" : "InternetGatewayDevice.X_TP_MultiIspDialPlan.List.{i}.",
/* 193 */ "XTP_CALLLOGCFG" : "InternetGatewayDevice.X_TP_CallLogCfg.",
/* 194 */ "IPSEC" : "InternetGatewayDevice.X_TP_IPSec.",
/* 195 */ "IPSEC_CFG" : "InternetGatewayDevice.X_TP_IPSec.IPSecCFG.{i}.",
/* 196 */ "SYS_MODE" : "InternetGatewayDevice.X_TP_SysMode.",
/* 197 */ "EWAN" : "InternetGatewayDevice.X_TP_EWAN.",
/* 198 */ "USER_INFO" : "InternetGatewayDevice.X_TP_UserInfo.",
/* 199 */ "GPON_USER_INFO" : "InternetGatewayDevice.X_TP_GponUserInfo.",
/* 200 */ "GPON_AUTH_CTC" : "InternetGatewayDevice.X_TP_GponUserInfo.GponAuthCtc.",
/* 201 */ "GPON_AUTH_SN" : "InternetGatewayDevice.X_TP_GponUserInfo.GponAuthSn.",
/* 202 */ "GPON_AUTH_PWD" : "InternetGatewayDevice.X_TP_GponUserInfo.GponAuthPwd.",
/* 203 */ "GPON_MAC_INFO" : "InternetGatewayDevice.X_TP_GponMacInfo.",
/* 204 */ "GPON_FWD_RULE" : "InternetGatewayDevice.X_TP_GponMacInfo.FwdRule.",
/* 205 */ "GPON_LOCAL_RULE_ENTRY" : "InternetGatewayDevice.X_TP_GponMacInfo.FwdRule.LocalRuleEntry.{i}.",
/* 206 */ "GPON_REMOTE_RULE_ENTRY" : "InternetGatewayDevice.X_TP_GponMacInfo.FwdRule.RemoteRuleEntry.{i}.",
/* 207 */ "GPON_OMCI_IOT" : "InternetGatewayDevice.X_TP_GponMacInfo.OmciIot.",
/* 208 */ "GPON_OMCI_IOT_ENTRY" : "InternetGatewayDevice.X_TP_GponMacInfo.OmciIot.OmciIotEntry.{i}.",
/* 209 */ "GPON_OMCI_ME_ATTR" : "InternetGatewayDevice.X_TP_GponMacInfo.OmciIot.OmciIotEntry.{i}.MeAttr.{i}.",
/* 210 */ "IPPING_DIAG" : "InternetGatewayDevice.IPPingDiagnostics.",
/* 211 */ "TRACEROUTE_DIAG" : "InternetGatewayDevice.TraceRouteDiagnostics.",
/* 212 */ "LOCAL" : "InternetGatewayDevice.X_TP_Local.",
/* 213 */ "WAN_DETECT" : "InternetGatewayDevice.X_TP_WANDETECT.",
/* 214 */ "WAN_DSL_AUTO_PVC_PAIR" : "InternetGatewayDevice.X_TP_WANDETECT.PVCPair.{i}.",
/* 215 */ "LED_NIGHTMODE" : "InternetGatewayDevice.X_TP_LEDNightMode."
};
