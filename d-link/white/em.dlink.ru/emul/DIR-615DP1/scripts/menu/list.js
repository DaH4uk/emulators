var pFirmware = {
        item: "menu_system_firmware",
        tabs: [{
            subitem: "menu_system_firmware",
            page: new pageFirmware,
            alias: "upload",
            description: ""
        }],
        description: "help_menu_system_firmware",
        alias: "firmware",
        menu: "menu_system"
    },
    pageLAN = {
        item: "LAN",
        page: jsLanController,
        alias: "lan",
        menu: "menu_net"
    },
    MENULIST = document.menuDefinitions = [],
    menuHome = {
        name: "menu_sw_home",
        description: "help_menu_start",
        alias: "start",
        list: [{
            item: "menu_storInfo",
            page: jsStartController,
            description: "help_menu_start",
            alias: "storInfo"
        }]
    };
hideFlag("ifaces.wan") || modeAP() || menuHome.list.push({
    item: "Click'n'Connect",
    page: jsQuickConfigMasterController,
    description: "",
    hide: hideFlag("cnc"),
    alias: "quick"
}), hideFlag(35) || hideFlag("wifi_wizard") || menuHome.list.push({
    item: "title_wifi",
    alias: "wifi",
    icon: "image/icons/wifi.png",
    tabs: [{
        subitem: "title_wifi",
        page: new pageWiFiWizard,
        description: "",
        alias: "wifi"
    }]
}), hideFlag(10) || modeAP() || menuHome.list.push({
    item: "title_virtual",
    page: new wizardVirtServ,
    description: "",
    alias: "vservers"
}), hideFlag(119) || modeAP() || menuHome.list.push({
    item: "title_iptv",
    page: new pageIPTV,
    description: "",
    alias: "iptv"
}), menuHome.list.length && MENULIST.push(menuHome);
var menuStatus = {
    name: "menu_status",
    alias: "status",
    icon: "image/icons/status.png",
    list: []
};
hideFlag(104) || menuStatus.list.push({
    item: "menu_stat",
    page: new pageNetStat,
    description: "help_menu_stat",
    alias: "network"
}), hideFlag(34) || menuStatus.list.push({
    item: "menu_statDhcp",
    page: new pageDHCPStat,
    alias: "dhcp"
}), hideFlag(33) || modeAP() || menuStatus.list.push({
    item: "menu_statRoute",
    page: new pageRouteStat,
    alias: "route"
}), hideFlag(46) || menuStatus.list.push({
    item: "menu_statClients",
    page: new pageLANClientsStat,
    alias: "clients"
}), hideFlag(180) || modeAP() || menuStatus.list.push({
    item: "menu_activeSessions",
    page: new pageActiveSessions,
    description: "help_menu_activeSessions",
    alias: "sessions"
}), menuStatus.list.push({
    item: "menu_IGMPStat",
    page: new pageMulticastGroups,
    description: "help_menu_multicastGroups",
    alias: "igmpstat"
}), menuStatus.list.length && MENULIST.push(menuStatus);
var menuNet = {
    name: "menu_net",
    alias: "network",
    icon: "image/icons/network.png",
    list: []
};
hideFlag("ifaces.wan") || modeAP() || menuNet.list.push({
    item: "WAN",
    page: jsWansController,
    alias: "wan"
}), hideFlag("ifaces.lan") || menuNet.list.push(pageLAN), menuNet.list.length && MENULIST.push(menuNet);
var menuWifi = {
    name: "menu_wifi",
    alias: "wifi",
    icon: "image/icons/wifi.png",
    list: []
};
if (hideFlag(35) || (menuWifi.freakBar = jsQuickWiFiController), !hideFlag(35)) {
    var pWiFiBasic = {
        item: "menu_wifi_basic",
        description: "help_menu_wifi_basic",
        alias: "basic"
    };
    pWiFiBasic.page = new pageWiFiBasic, menuWifi.list.push(pWiFiBasic)
}
if (!hideFlag("wifi.mbssid_all.AuthMode")) {
    var pWifiSec = {
        item: "menu_wifi_security",
        description: "help_menu_wifi_security",
        alias: "security"
    };
    pWifiSec.page = new pageWiFiSecurity, menuWifi.list.push(pWifiSec)
}
if (!hideFlag("wifi.mbssid_all.AccessControlList")) {
    var pWiFiMac = {
        item: "menu_wifi_mac",
        description: "help_menu_wifi_mac",
        alias: "mac"
    };
    pWiFiMac.page = new pageWMF, menuWifi.list.push(pWiFiMac)
}
if (hideFlag("wifi.StaListParamsAvailable") || menuWifi.list.push({
        item: "menu_wifi_station_list",
        page: new pageWiFiStationList,
        description: "help_menu_wifi_station_list",
        alias: "stations"
    }), !hideFlag("wifi.wps")) {
    var pWifiWps = {
        item: "menu_wifi_wps",
        description: "help_menu_wifi_wps",
        alias: "wps"
    };
    pWifiWps.page = new pageWiFiWPS, menuWifi.list.push(pWifiWps)
}
if (!hideFlag("wifi.addon_settings")) {
    var pWifiAddon = {
        item: "menu_wifi_addon",
        description: "menu_wifi_addon",
        alias: "addons"
    };
    pWifiAddon.page = new pageWiFiAdvanced, menuWifi.list.push(pWifiAddon)
}
hideFlag(111) || menuWifi.list.push({
    item: "menu_wifi_wmm",
    page: new pageWiFiWMM,
    description: "help_menu_wifi_wmm",
    alias: "wmm"
}), hideFlag(133) || menuWifi.list.push({
    item: "menu_wifi_client",
    page: new pageWiFiClient,
    description: "help_menu_wifi_client",
    alias: "client"
}), menuWifi.list.length && MENULIST.push(menuWifi);
var menuAdv = {
    name: "menu_dsl_advanced",
    alias: "advanced",
    icon: "image/icons/extra.png",
    list: []
};
if (hideFlag(119) || modeAP() || menuAdv.list.push({
        item: "menu_vlan",
        page: new pageVlan,
        description: "help_menu_vlan",
        alias: "vlan"
    }), hideFlag(66) || modeAP() || menuAdv.list.push({
        item: "menu_upnp",
        page: new pageUPnP,
        description: "help_menu_upnp",
        alias: "upnp"
    }), hideFlag(175) || modeAP() || menuAdv.list.push({
        item: "menu_eth_control",
        page: new pageEthControl,
        alias: "eth_control"
    }), hideFlag(162) || modeAP() || menuAdv.list.push({
        item: "menu_redirect",
        page: new pageRedirect,
        description: "help_menu_redirect",
        alias: "redirect"
    }), hideFlag(6) || modeAP() || menuAdv.list.push({
        item: "menu_ddns",
        page: new pageDDNS,
        description: "help_menu_ddns",
        alias: "ddns"
    }), hideFlag(7) || menuAdv.list.push({
        item: "menu_dns",
        page: new pageDNS,
        description: "help_menu_dns",
        alias: "dns"
    }), hideFlag(17) || modeAP() || menuAdv.list.push({
        item: "menu_routing",
        page: new pageRouting,
        description: "help_menu_routing",
        alias: "routing"
    }), hideFlag(16) || modeAP() || menuAdv.list.push({
        item: "menu_rmtAccess",
        page: new pageRemoteAccess,
        description: "help_menu_rmtAccess",
        alias: "remoteaccess"
    }), !hideFlag(68) && !modeAP()) {
    var pMisc = {
        page: new pageMisc,
        alias: "misc"
    };
    pMisc.item = "menu_misc", menuAdv.list.push(pMisc)
}
if (!hideFlag(70) && !modeAP()) {
    var pTR69 = {
        item: "menu_tr69",
        page: new pageTR69,
        description: "help_menu_tr69_air",
        alias: "tr69"
    };
    menuAdv.list.push(pTR69)
}
menuAdv.list.length && MENULIST.push(menuAdv);
var menuFire = {
    name: "menu_firewall",
    alias: "firewall",
    icon: "image/icons/firewall.png",
    list: []
};
if (hideFlag(88) || modeAP() || menuFire.list.push({
        item: "menuIPFilter",
        page: new pageIPFilters,
        description: "help_menuIPFilter",
        alias: "ipfilter"
    }), hideFlag(10) || modeAP() || menuFire.list.push({
        item: "vserversMenu",
        page: new pageVirtServ,
        description: "help_vserversMenu",
        alias: "vservers"
    }), hideFlag(23) || modeAP() || menuFire.list.push({
        item: "menu_dmz",
        page: new pageDMZ,
        description: "help_menu_dmz",
        alias: "dmz"
    }), !hideFlag(74)) {
    var pMacFilter = {
        item: "menu_macfilter",
        tabs: [],
        description: "help_menu_macfilter",
        alias: "macfilter"
    };
    pMacFilter.tabs.push({
        subitem: "macfAddrTab",
        page: new pageMACFilter,
        description: "",
        alias: "filter"
    }), menuFire.list.push(pMacFilter)
}
if (menuFire.list.length && !modeAP() && MENULIST.push(menuFire), !modeAP()) {
    var menu3g = {
        alias: "3g",
        icon: "image/icons/sim_card.png",
        list: []
    };
    menu3g.name = "menu_g3", menu3g.list.length && MENULIST.push(menu3g)
}
var menuWimax = {
    name: "menu_wimax",
    alias: "wimax",
    icon: "image/icons/wimax.png",
    list: []
};
menuWimax.list.length && MENULIST.push(menuWimax);
var menuControl = {
        name: "menu_control",
        alias: "control",
        icon: "image/icons/control.png",
        list: []
    },
    pUrlFilter = {
        item: "menu_urlfilter",
        tabs: [],
        description: "help_menu_urlfilter",
        alias: "urlfilter"
    };
hideFlag(71) || pUrlFilter.tabs.push({
    subitem: "urlfConfigTab",
    page: new pageURLFilterConfig,
    alias: "config"
}), hideFlag(58) || pUrlFilter.tabs.push({
    subitem: "urlfAddrTab",
    page: new pageURLFilter,
    alias: "filter"
}), menuControl.list.push(pUrlFilter), menuControl.list.length && !modeAP() && MENULIST.push(menuControl), !hideFlag(179) && !modeAP();
var menuSystem = {
        name: "menu_system",
        alias: "system",
        icon: "image/icons/system.png",
        list: []
    },
    pSysPass = {
        page: new pagePasswd,
        description: "help_menu_system_passw",
        alias: "password"
    };
if (hideFlag(69) || (pSysPass.item = "menu_system_passw", menuSystem.list.push(pSysPass)), menuSystem.list.push({
        item: "menu_system_config",
        page: new pageConfiguration,
        description: "help_menu_system_config",
        alias: "sysconf"
    }), !hideFlag(130)) {
    var pSysLog = {
        item: "menu_system_log",
        tabs: [{
            subitem: "slConfigTab",
            page: new pageSyslogConf,
            alias: "config",
            description: ""
        }],
        description: "help_menu_system_log",
        alias: "syslog"
    };
    pSysLog.tabs.push({
        subitem: "slLogTab",
        page: new pageSyslog,
        alias: "log"
    }), menuSystem.list.push(pSysLog)
}
hideFlag(165) || menuSystem.list.push(pFirmware), hideFlag(65) || menuSystem.list.push({
    item: "menu_ntp",
    page: new pageNTP,
    description: "help_menu_ntp",
    alias: "ntp"
}), hideFlag(145) || menuSystem.list.push({
    item: "menu_ping",
    page: new pagePing,
    description: "help_menu_ping_air",
    alias: "ping"
}), hideFlag(166) || menuSystem.list.push({
    item: "menu_traceroute",
    page: new pageTraceroute,
    description: "help_menu_traceroute_air",
    alias: "traceroute"
}), hideFlag(152) || menuSystem.list.push({
    item: "menu_telnet",
    page: new pageTelnet,
    description: "help_menu_telnet_air",
    alias: "telnet"
}), menuSystem.list.push({
    item: "menu_web_panel_config",
    page: new pageWebPanelConfig,
    alias: "webpanelconfig"
}), menuSystem.list.length && MENULIST.push(menuSystem);