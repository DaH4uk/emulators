
var cwmphideflag=0;
cwmphideflag=1;



var superprivilege=0;
var superprivilege = 0;


var __GLOBAL__ = {
    pageRoot: ''
};
function generateNav() {
    var navs = {
        active: 0,
        items: [
            {
                name: 'Статус',
                sub: 0
            },
            {
                name: 'Сеть',
                sub: 2
            },
            {
                name: 'Дополнительно',
                sub: 3
            },
            {
                name: 'Сервисы',
                sub: 4
            },
            {
                name: 'Межсетевой экран',
                sub: 5
            },
   {
                name: 'Обслуживание',
                sub: 6
            }
  ,
  {
                name: 'Выход',
                sub: 7
            }
        ]
    };
    return navs;
}
function renderNav() {
    var nav = generateNav();
    var tpl = $('#nav-tmpl').html();
    var html = juicer(tpl, nav);
    $('#nav').html(html);
}
function generateSide() {
    var side = [];
    var sub0, sub1, sub2, sub3, sub4, sub5, sub6, sub7;
    var pageRoot = __GLOBAL__.pageRoot;
    sub0 = {
        key: 0,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Система',
                items: [
                    {
                        name: 'Система',
                        href: pageRoot + 'status.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Статистика',
                items: [
                    {
                        name: 'Статистика',
                        href: pageRoot + 'stats.htm'
                    }
                ]
            }
        ]
    };
 sub1 = {
        key: 1,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Мастер настройки',
                items: [
   {
                        name: 'Мастер настройки',
                        href: pageRoot + 'wizard_menu.htm'
                    }
                ]
            }
        ]
    };
    sub2 = {
        key: 2,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'WAN',
                items: [
   {
                        name: 'WAN',
                        href: pageRoot + 'wan.htm'
          }
                ]
            },
            {
                collapsed: true,
                name: 'LAN',
                items: [
     {
                        name: 'LAN',
                        href: pageRoot + 'tcpiplan.htm'
                    },
     {
                        name: 'DHCP',
                        href: pageRoot + 'dhcpd.htm'
                    },
                    {
                        name: 'Статический DHCP',
                        href: pageRoot + 'dhcpip.htm'
                    },
                    {
                        name: 'LAN IPv6',
                        href: pageRoot + 'lan_ipv6.htm'
                    },
                    {
                        name: 'Резервирование DHCPv6',
                        href: pageRoot + 'dhcpv6_reserv.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'WLAN',
                items: [
                    {
                        name: 'Базовые настройки',
                        href: pageRoot + 'wlbasic.htm'
                    },
     {
                        name: 'Безопасность',
                        href: pageRoot + 'wlwpa.htm'
                    },
                    {
                        name: 'Доп. SSID',
                        href: pageRoot + 'wlmbssid.htm'
                    },
                    {
                        name: 'Список контроля доступа',
                        href: pageRoot + 'wlactrl.htm'
                    },
                    {
                        name: 'Дополнительно',
                        href: pageRoot + 'wladvanced.htm'
     },
                    {
                        name: 'WPS',
                        href: pageRoot + 'wlwps.htm'
   },
   {
    name: 'Wi-Fi Сканер',
                         href: pageRoot + 'wlscan.htm'
                    }
                ]
        }
     ]
  };
    sub3 = {
        key: 3,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Маршрутизация',
                items: [
                    {
                        name: 'Статический маршрут',
                        href: pageRoot + 'routing.htm'
                    },
                    {
                        name: 'Статический маршрут IPv6',
                        href: pageRoot + 'routing_v6.htm'
                    },
                    {
                        name: 'RIP',
                        href: pageRoot + 'rip.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'NAT',
                items: [
                    {
                        name: 'DMZ',
                        href: pageRoot + 'fw-dmz.htm'
                    },
                    {
                        name: 'Виртуальный сервер',
                        href: pageRoot + 'virtualSrv.htm'
                    },
                    {
                        name: 'ALG',
                        href: pageRoot + 'fw-natpass.htm'
                    },
                    {
                        name: 'Триггер портов',
                        href: pageRoot + 'nat_portrigger.htm'
                    },
                    {
                        name: 'Порт FTP ALG',
                        href: pageRoot + 'nat_ftpalg.htm'
                    },
                    {
                        name: 'Привязка NAT IP',
                        href: pageRoot + 'fw-natmapping.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'QoS',
                items: [
                    {
                        name: 'QoS',
                        href: pageRoot + 'ipqos.htm'
                    },
   {
                        name: 'Формирование трафика',
                        href: pageRoot + 'ipqostc.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'TR-069 (CWMP)',
                items: [
                    {
                        name: 'TR-069 (CWMP)',
                        href: pageRoot + 'tr069.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Группировка интерфейсов',
                items: [
                    {
                        name: 'Группировка интерфейсов',
                        href: pageRoot + 'portmap.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Прочее',
                items: [
                    {
                        name: 'Мост (Bridge)',
                        href: pageRoot + 'bridging.htm'
                    },
                    {
                        name: 'Ограничение клиентов',
                        href: pageRoot + 'clientlimit.htm'
                    }
                ]
            }
        ]
        };
 var QoSSpliceIndex = 2;
 var CWMPSpliceIndex = 3;
 var PortmapSpliceIndex = 4;
 if (cwmphideflag == 1)
 {
         sub3.items.splice(CWMPSpliceIndex, 1);
  PortmapSpliceIndex--;
     }
    sub4 = {
        key: 4,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'IGMP',
                items: [
                    {
                        name: 'IGMP Proxy',
                        href: pageRoot + 'igmproxy.htm'
                    },
                    {
                        name: 'MLD',
                        href: pageRoot + 'mld.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'UPnP',
                items: [
                    {
                        name: 'UPnP',
                        href: pageRoot + 'upnp.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'DNS',
                items: [
                    {
                        name: 'DNS',
                        href: pageRoot + 'dns.htm'
                    },
                    {
                        name: 'IPv6 DNS',
                        href: pageRoot + 'dns_v6.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'DDNS',
                items: [
                    {
                        name: 'DDNS',
                        href: pageRoot + 'ddns.htm'
                    }
                ]
            }
        ]
        };
    sub5 = {
        key: 5,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Фильтрация MAC',
                items: [
                    {
                        name: 'Фильтрация MAC',
                        href: pageRoot + 'fw-macfilter.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Фильтр IP/Port',
                items: [
                    {
                        name: 'Фильтр IP/Port',
                        href: pageRoot + 'fw-ipportfilter_adv.htm'
                    },
                    {
                        name: 'Фильтр IPv6/Port',
                        href: pageRoot + 'fw-ipportfilter_adv_v6.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Фильтр URL',
                items: [
                    {
                        name: 'Фильтр URL',
                        href: pageRoot + 'url_nokeyword.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'ACL',
                items: [
                    {
                        name: 'ACL',
                        href: pageRoot + 'acl.htm'
                    },
                    {
                        name: 'IPv6 ACL',
                        href: pageRoot + 'acl_v6.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'DoS',
                items: [
                    {
                        name: 'DoS',
                        href: pageRoot + 'dos.htm'
                    }
                ]
            },
   {
                collapsed: true,
                name: 'Родительский контроль',
                items: [
                    {
                        name: 'Родительский контроль',
                        href: pageRoot + 'family.htm'
                    }
                ]
            }
        ]
        };
    sub6 = {
        key: 6,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Пароль',
                items: [
                    {
                        name: 'Пароль',
                        href: pageRoot + 'userconfig.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Обновление',
                items: [
                    {
                        name: 'Обновление ПО',
                        href: pageRoot + 'upload.htm'
                    },
                    {
                        name: 'Сохранение/Восстановление',
                        href: pageRoot + 'saveconf.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Перезагрузка',
                items: [
                    {
                        name: 'Перезагрузка',
                        href: pageRoot + 'reboot.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Время',
                items: [
                    {
                        name: 'Время',
                        href: pageRoot + 'time.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Журнал',
                items: [
                    {
                        name: 'Журнал',
                        href: pageRoot + 'logging.htm'
                    }
                ]
            },
            {
                collapsed: true,
                name: 'Диагностика',
                items: [
                    {
                        name: 'Ping',
                        href: pageRoot + 'ping.htm'
                    },
                    {
                        name: 'Ping6',
                        href: pageRoot + 'ping_v6.htm'
                    },
                    {
                        name: 'Traceroute',
                        href: pageRoot + 'traceroute.htm'
                    },
                    {
                        name: 'Traceroute6',
                        href: pageRoot + 'traceroute_v6.htm'
                    },
                    {
                        name: 'Диагностический тест',
                        href: pageRoot + 'diag-test.htm'
                    }
                ]
            }
        ]
        };
    sub7 = {
        key: 7,
        active: '0-0',
        items: [
            {
                collapsed: false,
                name: 'Выход',
                items: [
                    {
                        name: 'Выход',
                        href: pageRoot + 'weblogout.htm'
                    }
                ]
            }
        ]
    };
    side.push(sub0);
    side.push(sub1);
    side.push(sub2);
    side.push(sub3);
    side.push(sub4);
    side.push(sub5);
    side.push(sub6);
    side.push(sub7);
    return side;
}
function adaptNav(side, key) {
    key = (key - 0)
        || 0;
    var sideObj = {};
    for (var i = 0; i < side.length; i++) {
        if (side[i] && side[i].key === key) {
            sideObj.active = side[i].active;
            sideObj.items = side[i].items;
            for (var j = 0; j < sideObj.items.length; j++) {
                sideObj.items[j].index = j;
            }
            return sideObj;
        }
    }
}
function renderSide(key) {
    var side = adaptNav(generateSide(), key);
    var tpl = $('#side-tmpl').html();
    var html = juicer(tpl, side);
    $('#side').html(html);
}
function setActive(items, current) {
    $(items).removeClass('active');
    $(current).addClass('active');
}
function setAccordion(item) {
    var $item = $(item);
    var className = 'collapsed';
    var $currentLi = $item.parents('li');
    var $allLi = $item.parents('#side').children('li');
    var $currentContent = $currentLi.children('ul');
    $allLi.addClass(className);
    $currentLi.removeClass(className);
}


