function menuIn() {
    $("#menu>div.name").css("display", "none"), $("#menu").css("width", "285px"), $("#menu>ul.menu").css("opacity", "1"), $("#menu>ul.menu").css("display", "block"), $("#menu").css("height", "auto")
}

function menuOut() {
    $("#menu>div.name").css("display", "block"), $("#menu").css("height", "90px"), $("#menu").css("width", "20px"), $("#menu>ul.menu").css("display", "none")
}

function menuResizeOnOff() {
    $(window).width() < 1360 ? (menuOut(), $("#menu").bind("mouseenter", function() {
        menuIn()
    }), $("#menu").bind("mouseleave", function() {
        menuOut()
    })) : (menuIn(), $("#menu").unbind("mouseenter"), $("#menu").unbind("mouseleave"))
}

function delMailto(href) {
    return /@/i.test(href) ? void 0 : (window.open(href.replace(/mailto:/gi, "http://"), "_blank"), !1)
}
var TITLE = document.title,
    DATA = null,
    REFRESH = new function() {
        function read() {
            var stamp = (new Date).getTime();
            return device.config.read([1, 10, 34, 187, 64, 74, 35, 104, 129, 119, 175, 71, 72, 88, 187, null, null, null, null, null, 16, null, 67, null, 42, null, null], function(data) {
                update(data, stamp)
            })
        }
        var self = this,
            $$ = {
                catchCount: 0,
                refreshID: null,
                rID: null,
                cb_list: []
            };
        this.waitActualUpdate = function(__cb) {
            var __stamp = (new Date).getTime();
            $$.cb_list.push({
                stamp: __stamp,
                cb: __cb
            })
        };
        var update = callback(self, function(answer, stamp) {
            try {
                with(answer) {
                    DATA = {
                        iftree: rq[0].resident.iface_names,
                        vserver: is.set(rq[1].resident) ? rq[1].resident.vserver : new Array,
                        dhcpleases: is.set(rq[2].resident) ? rq[2].resident : new Array,
                        arp: is.set(rq[3].resident) ? rq[3].resident : new Array,
                        wifilist: is.set(rq[4].resident) ? rq[4].resident : new Array,
                        macfilter: is.set(rq[5].resident) ? rq[5].resident.macfilter : new Array,
                        wifilter: is.set(rq[24].resident) ? rq[24].resident.MacFilterList : {},
                        wifilteracc: is.set(rq[24].resident) ? rq[24].resident.AccessPolicy : new String,
                        wifi: rq[6].resident,
                        netstat: rq[7].resident,
                        portstatus: is.set(rq[8].resident) ? rq[8].resident : {},
                        vlanset: is.set(rq[9].resident) ? rq[9].resident : {},
                        portinfo: rq[10].resident,
                        urlfilter: {
                            config: rq[11].resident,
                            list: rq[12].resident
                        },
                        ipfilter: rq[13].resident.ipfilter,
                        neighbour: rq[14].resident,
                        rmaccess: is.set(rq[20].resident) ? rq[20].resident.httpaccess : null,
                        devinfo: is.set(rq[22].resident) ? rq[22].resident : null,
                        dsl_status: is.set(rq[23].resident) ? rq[23].resident : null
                    };
                    var data = DATA
                }
                DHCP.updateSettings(data.iftree.br0), CLIENTLIST.updateSettings(data.iftree.br0, data.vserver, data.dhcpleases, data.arp, data.wifilist, data.macfilter, data.wifilter, data.wifilteracc, data.dhcpleasesv6, data["5G_wifilter"] ? data["5G_wifilter"] : null, data["5G_wifilteracc"] ? data["5G_wifilteracc"] : null, data.rmaccess, data.use_ports, data.urlfilter), __CONNECTOR.updateSettings(data.iftree, data.netstat, data.portstatus, data.dsl_status, data.arp, data.devinfo), __FIREWALL.updateSettings(data.ipfilter), __URLFILTER.updateSettings(data.urlfilter), __VSERVERS.updateSettings(data.vserver), MACFILTER.updateSettings(data.macfilter), __WIRELESS.updateSettings(data.wifi);
                var prefix = __WIRELESS.getPrefix();
                __WIFILTER.updateSettings(DATA[prefix + "wifilter"], DATA[prefix + "wifilteracc"]);
                for (var i in $$.cb_list) $$.cb_list[i].stamp < stamp && ($$.cb_list[i].cb(), delete $$.cb_list[i]);
                $$.catchCount = 0
            }
            catch (error) {
                $$.catchCount++, 5 == $$.catchCount
            }
            finally {
                $("#overlaybox").fadeOut(400), $$.refreshID = setTimeout(callback(self, function() {
                    $$.rID = read()
                }), 5e3)
            }
        });
        this.start = function() {
            return $$.rID = read(), this
        }, this.stop = function() {
            return clearTimeout($$.refreshID), is.set($$.rID) && device.stop($$.rID), this
        }
    },
    MSWITCH = new function() {
        this.init = function() {
            $("#pageMonitor").hide(), $("#hatbox").addClass("hide"), $("#pageSetting").show(), $("#menu .MONITORING").bind("click", this.monitor), $("#switcher>.item.SETTINGS").bind("click", this.settings)
        }, this.monitor = function() {
            LOGIC.start(), $("#pageSetting").hide(), $("#switcher>.item.MONITORING").hide(), $("#pageMonitor").show(), $("#switcher>.item.SETTINGS").show(), $("#hatbox").removeClass("hide")
        }, this.settings = function() {
            LOGIC.stop(), $("#pageSetting").show(), $("#switcher>.item.MONITORING").show(), $("#pageMonitor").hide(), $("#switcher>.item.SETTINGS").hide(), $("#hatbox").addClass("hide")
        }
    };
device.limit(1), device.strip(!0), window.provList = window["prov_list_dir.js"], window.pageHeight = 0, $(document).bind("ready", function() {
    choiceInterfaceClient();
    var hash = window.location.hash.substring(1);
    MENU.open(hash) || (location.href = $("#menu>.spisok>ul.menu.osn>li.menu:eq(0)>ul.submenu>li.submenu:eq(0)>a").attr("href")), MSWITCH.init(), $("#_button_save").bind("click", function() {
        return rootView.showModalOverlay(), device.system.save(function() {
            rootView.hideModalOverlay(), alert(lng("save_config_success"))
        }), !1
    }), $("#_button_reboot").bind("click", function() {
        return confirm(lng("confirm_reboot")) && rootCtrl.event("cfgsaverebootrq"), !1
    }), translate($("#message"))
});