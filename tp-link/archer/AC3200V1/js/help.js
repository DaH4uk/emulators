// JavaScript Document
(function($) {
    $.helpContent = {
		trafficCtrl: {
            TITLE: "Bandwidth Control",
            CONTENT: [
                {
                    type: "paragraph",
                    content: "Bandwidth Control allows you to configure the Upstream Bandwidth and Downstream Bandwidth of the network. The values you configure should be less than 1000000Kbps. For optimal control of the bandwidth, please select the right Line Type and consult your ISP for the total bandwidth of the egress and ingress."
                },
                {
                    type: "name",
                    title: "Enable",
                    content: "Select the checkbox to enable Bandwidth Control feature."
                },
                {
                    type: "name",
                    title: "Total Upstream Bandwidth ",
                    content: "Enter the upload speed through the WAN port."
                },
                {
                    type: "name",
                    title: "Total Downstream Bandwidth",
                    content: "Enter the download speed through the WAN port."
                },
                /*{
                    type: "name",
                    title: "IPTV Bandwidth Guarantee",
                    content: "Select the checkbox to enable IPTV Bandwidth Guarantee.",
                    children: [
                        {
                            type: "name",
                            title: "Upstream Bandwidth Guarantee",
                            content: "Enter a value to guarantee IPTV upstream bandwidth."
                        },
                        {
                            type: "name",
                            title: "Downstream Bandwidth Guarantee",
                            content: "Enter a value to guarantee IPTV downstream bandwidth."
                        }
                    ]
                },*/
			/*
                 {
                 type: "name",
                 title: "VoIP Bandwidth Guarantee",
                 content: ""
                 },
			*/
                {
                    type: "title",
                    content: "Controlling Rules"
                },
                {
                    type: "name",
                    title: "Description",
                    content: "Displays the information about the rules such as address range."
                },
                {
                    type: "name",
                    title: "Priority",
                    content: "The priority of Bandwidth Control rules. '1' stands for the highest priority while '8' stands for the lowest priority. The total Upstream/ Downstream Bandwidth is first allocated to guarantee all the Min Rate of Bandwidth Control rules. If there is any bandwidth left, it is first allocated to the rule with the highest priority, then to the rule with the second highest priority, and so on."
                },
                {
                    type: "name",
                    title: "Up (min/max) ",
                    content: "Displays the minimal and maximal upload bandwidth through the WAN port."
                },
                {
                    type: "name",
                    title: "Down (min/max)",
                    content: "Displays the minimal and maximal download bandwidth through the WAN port."
                },
                {
                    type: "name",
                    title: "Enable",
                    content: "Click the Bulb icon to enable or disable the entry."
                },
                {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Modify or Delete the corresponding rule."
                },
                {
                    type: "name",
                    title: "Add",
                    content: "Click to add a new entry."
                },
                {
                    type: "name",
                    title: "IP Range",
                    content: "Enter the range of IP addresses to be controlled."
                },
                {
                    type: "name",
                    title: "Port Range",
                    content: "Enter the range of port numbers to be controlled."
                },
                {
                    type: "name",
                    title: "Protocol",
                    content: "Select the protocol for the entry."
                },
                {
                    type: "name",
                    title: "Upstream",
                    content: "Enter the minimal and maximal upload bandwidth through the WAN port."
                },
                {
                    type: "name",
                    title: "Downstream",
                    content: "Enter the minimal and maximal download bandwidth through the WAN port."
                },
                {
                    type: "name",
                    title: "Enable this entry",
                    content: "Select the checkbox to enable this entry."
                },
                {
                    type: "paragraph",
                    content: "To delete multiple entries, select the checkboxes before all the entries you want to delete and click Delete above the table."
                }
            ]
        },
        "status": {
            "TITLE": "Internet",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Displays the current status of the Internet (WAN) port."
            }, {
                "type": "title2",
                "content": "IPv4"
            }, {
                type: "name",
                title: "Name",
                content: "Displays the name of the Internet (WAN) port of the router."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The unique physical address assigned to the Internet (WAN) port of the router."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP address assigned to the Internet (WAN) port of the router. If the IP address is shown as 0.0.0.0, this indicates no Internet access."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "This parameter determines the network portion and the host portion of an IP address. "
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": " The IP address used to connect the router to the network."
            }, {
                "type": "name",
                "title": "Primary DNS/Secondary DNS",
                "content": "The Domain Name System (DNS) translates host names and internet domains to IP addresses. The information of these DNS servers is assigned by the Internet Service Provider (ISP)."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": " The current connection type of the Internet (WAN) port."
            }, {
                "type": "title2",
                "content": "IPv6"
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The unique physical address assigned to the Internet (WAN) port of the router."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": " The IPv6 address assigned to the Internet (WAN) port of the router."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": " The IP address used to connect the router to the network."
            }, {
                "type": "name",
                "title": "Primary DNS/Secondary DNS",
                "content": "The Domain Name System (DNS) translates host names and internet domains to IP addresses. The information of these DNS servers is assigned by the Internet Service Provider (ISP)."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "The current connection type of the Internet (WAN) port."
            }, {
                "type": "title",
                "title": "Wireless 2.4G | 5G-1 | 5G-2",
                "content": "Displays relevant information about the Wireless Network."
            }, {
                "type": "name",
                "title": "Network Name",
                "content": "The wireless network name, also known as SSID (Service Set Identifier)."
            }, {
                "type": "name",
                "title": "Wireless Radio",
                "content": "The current status (On or Off) of the wireless network."
            }, {
                "type": "name",
                "title": "Mode",
                "content": "The current wireless mode."
            }, {
                "type": "name",
                "title": "Channel Width",
                "content": "The channel bandwidth of the wireless network."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "The current wireless channel."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of the wireless network radio on the router."
            }, {
                "type": "title",
                "title": "LAN",
                "content": "Displays information about the Ethernet (LAN) ports."
            }, {
                "type": "title2",
                "content": "IPv4"
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The unique physical address assigned to the Ethernet (LAN) port of the router."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IPv4 address assigned to the Ethernet (LAN) port of the router."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": " This parameter determines the network portion and the host portion of an IP address."
            }, {
                "type": "name",
                "title": "DHCP",
                "content": "Displays whether the routerâ€™s built-in DHCP server is active for devices on the LAN ports or not."
            }, {
                "type": "title2",
                "content": "IPv6"
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The unique physical address assigned to the Internet (WAN) port of the router."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IPv6 address assigned to the Internet (LAN) port of the router."
            }, {
                type: "name",
                title: "Prefix Length",
                content: "The length of IPv6 address prefix."
            }, {
                "type": "name",
                "title": "Assigned Type",
                "content": "The type of IPv6 address for the LAN interface."
            }, {
                "type": "title",
                "title": "Guest Network 2.4G | 5G-1 | 5G-2",
                "content": "Displays information about the wireless network for guests."
            }, {
                "type": "name",
                "title": "Network Name",
                "content": " The wireless network name (SSID) of your Guest Network."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "Displays whether the wireless network name (SSID) of the Guest Network is hidden or not."
            }, {
                "type": "name",
                "title": "Wireless Radio",
                "content": "The current status (On or Off) of the Guest Network."
            }, {
                "type": "name",
                "title": "See each other",
                "content": "Displays whether all devices on the Guest Network are allowed to communicate with each other or not."
            }]
        },
        "INTERNET_DYNAMIC": {
            "TITLE": "Dynamic IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>Dynamic IP</strong>"
            }, {
                "type": "paragraph",
                "content": "If your ISP is running on DHCP server, please select <strong>Dynamic IP</strong>."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP address is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "The Subnet Mask is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "The Default Gateway is automatically assigned by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Renew</strong> button to automatically renew the IP parameters assigned by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Release</strong> button to erase the IP parameters assigned by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "you will lose Internet connection until you click on the Renew button again."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "If your ISP provides the DNS IP address, select <strong>Use the Following DNS</strong> Address and enter the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> Server IP Addresses manually. Otherwise, the DNS Servers will be assigned automatically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Note: If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "name",
                "title": "MTU Size (in bytes)",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs you need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Host",
                "content": "This option specifies the Host Name of the Router."
            }, {
                "type": "name",
                "title": "Get IP using Unicast DHCP",
                "content": "A few ISPs' DHCP servers do not support the broadcast applications. If you can't get the IP Address normally, you can choose Unicast. (You generally need not to check this option)."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_STATIC": {
            "TITLE": "Static IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>Static IP</strong>"
            }, {
                "type": "paragraph",
                "content": "<strong>If your ISP provides a Static IP Address, Subnet Mask, Gateway and DNS Settings, please select Static IP.</strong>."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP Address provided by your ISP. "
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP. "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_PPPOE": {
            "TITLE": "PPPoE Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>PPPoE</strong>"
            }, {
                "type": "paragraph",
                "content": "<strong>If your ISP provides a PPPoE connection, please select PPPoE.</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "The DNS IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Another DNS IP address assigned dynamically by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Advanced</strong> to set up the advanced options."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "It's available only for PPPoE Connection. If your ISP provides an extra Connection type such as Dynamic/Static IP to connect to a local area network, then you can check the radio button of Dynamic/Static IP to activate this secondary connection."
            }, {
                "type": "name",
                "title": "None",
                "content": "The Secondary Connection is disabled by default, so there is PPPoE connection only. This is recommended."
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Use dynamic IP address to connect to the local area network provided by your ISP. "
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP address assigned dynamically by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "The subnet mask assigned dynamically by your ISP. You can click the Renew button to <strong>renew</strong> the IP parameters from your ISP, or click the <strong>Release</strong> button to release them."
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Use static IP address to connect to the local area network provided by your ISP. "
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP address provided by your ISP for the secondary connection. This address is used only for accessing the local area network of the secondary connection. "
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the subnet mask provided by your ISP for the secondary connection."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The default MTU (Maximum Transmission Unit) size is 1480 bytes, which is usually fine. For some ISPs, you need modify the MTU. This should not be done unless you are sure it is necessary for your ISP."
            }, {
                "type": "name",
                "title": "Service Name/Access Concentrator Name",
                "content": "The service name and AC (Access Concentrator) name should not be done unless you are sure it is necessary for your ISP."
            }, {
                "type": "name",
                "title": "Detect Online Interval",
                "content": "The default value is 0, you can input the value between 0 and 120. The Router will detect Access Concentrator online every interval seconds. If the value is 0, it means no detection."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "If your ISP provides the IP address, select \"Use the Following IP Address\" and enter the IP Addresses manually. Otherwise, the IP address will be assigned automatically."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "If your ISP specifies a DNS server IP address for you, click the \"Use the Following DNS Addresses\", and fill the Primary DNS and Secondary DNS blanks below. The Secondary DNS is optional. Otherwise, the DNS address will be assigned dynamically from ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Time Based",
                    "content": "You can configure the Router to connect or disconnect based on time. Select the start time and end time in the Period of Time fields."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "note",
                "title": "Note",
                "content": ["1. Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background.", "2. Only when you have set the system time on <strong>System Tools -> Time Settings</strong> page, the Time-based function can take effect."]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_BIGPOND": {
            "TITLE": "BigPond Cable Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>BigPond Cable</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive. Auth Server - Enter the authenticating server IP address or host name."
            }, {
                "type": "name",
                "title": "Auth Domain",
                "content": "Type in the domain suffix server name based on your location, e.g."
            }, {
                "type": "name",
                "title": "NSW / ACT",
                "content": "nsw.bigpond.net.au"
            }, {
                "type": "name",
                "title": "VIC / TAS / WA / SA / NT",
                "content": "vic.bigpond.net.au"
            }, {
                "type": "name",
                "title": "QLD",
                "content": "qld.bigpond.net.au"
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_L2TP": {
            "TITLE": "L2TP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>L2TP</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive. Internet IP Address - The IP address assigned by your L2TP server."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned by your L2TP server."
            }, {
                "type": "name",
                "title": "Internet Primary DNS",
                "content": "The DNS IP address assigned by L2TP server."
            }, {
                "type": "name",
                "title": "Internet Secondary DNS",
                "content": "Another DNS IP address assigned by L2TP server."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "Select Static IP if IP address, subnet mask, gateway and DNS server address have been provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP address used for dial-up. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the subnet mask provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "Enter gateway provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "(Optional) Enter the DNS IP address in dotted-decimal notation provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter another DNS IP address in dotted-decimal notation provided by your ISP. (Only can be configured when Static IP is selected)"
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected. "
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_PPTP": {
            "TITLE": "PPTP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Internet Connection Type",
                "content": "<strong>PPTP</strong>"
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Internet IP Address",
                "content": "The IP address assigned by your PPTP server."
            }, {
                "type": "name",
                "title": "Internet Primary DNS",
                "content": "The DNS IP address assigned by PPTP server."
            }, {
                "type": "name",
                "title": "Internet Secondary DNS",
                "content": "Another DNS IP address assigned by PPTP server."
            }, {
                "type": "name",
                "title": "Secondary Connection",
                "content": "Select Static IP if IP address, subnet mask, gateway and DNS server address have been provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmit Unit) value for most Ethernet networks is 1500 bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "name",
                "title": "Connection Mode",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Auto",
                    "content": "Connect automatically after the Router is disconnected."
                }, {
                    "type": "name",
                    "title": "On Demand",
                    "content": "You can configure the Router to disconnect your Internet connection after a specified period of the Internet connectivity (Max Idle Time). If your Internet connection has been terminated due to inactivity, On Demand enables the Router to automatically re-establish your connection when you attempt to access the Internet again. If you wish to activate Connect on Demand, put a check mark in the circle. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field."
                }, {
                    "type": "name",
                    "title": "Manually",
                    "content": "You can configure the Router to connect or disconnect manually. After a specified period of inactivity (Max Idle Time), the Router will disconnect your Internet connection, and not be able to re-establish your connection automatically when you attempt to access the Internet again. If you want your Internet connection to remain active all the times, enter 0 in the Max Idle Time field. Otherwise, enter the number in minutes that you wish to have the Internet connecting last unless a new link requested."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "Sometimes the connection cannot be disconnected although you specify a Max Idle Time (0~99 mins) because some applications are visiting the Internet continually in the background."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_DYNAMIC": {
            "TITLE": "IPv6 Dynamic IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Connections which use dynamic IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "The DNS address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Another DNS address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Renew</strong> button to renew the IPv6 parameters from your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Release</strong> button to release the IPv6 parameters from your ISP."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "Get non-temporary IPv6 address",
                "content": "Get a non-temporary IPv6 address from the ISP."
            }, {
                "type": "name",
                "title": "Get IPv6 prefix delegation",
                "content": " Get a temporary IPv6 address and an IPv6 prefix from the ISP, the temporary IPv6 address is set to the WAN port, and the LAN port advertises the IPv6 address prefix by RADVD."
            }, {
                "type": "paragraph",
                "content": "If your ISP gives you one or two DNS IPv6 addresses, select Use Following DNS Address and enter the Primary DNS and Secondary DNS into the correct fields. Otherwise, the DNS servers will be assigned from ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_STATIC": {
            "TITLE": "IPv6 Static IP Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Connections which use static IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "Enter the IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the default gateway in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "MTU Size",
                "content": "The normal MTU (Maximum Transmission Unit) value for most Ethernet networks is 1500 Bytes. For some ISPs, you may need to modify the MTU. But this is rarely required, and should not be done unless you are sure it is necessary for your ISP connection."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_PPPOE": {
            "TITLE": "IPv6 PPPoE Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "PPPoE",
                "content": "Connections which use PPPoEv6 that requires a user name and password."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "IPv6 Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "name",
                "title": "Get IPv6 Address Way",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Non-temporary",
                    "content": " Get a non-temporary IPv6 address by DHCPv6 from the ISP."
                }, {
                    "type": "name",
                    "title": "Prefix delegation",
                    "content": "Get a prefix delegation IPv6 address by DHCPv6 from the ISP, and the clients in LAN create IPv6 address with the delegation."
                }, {
                    "type": "name",
                    "title": "Specified by ISP",
                    "content": "Input a static IPv6 address from the ISP."
                }]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "INTERNET_IPV6_6TO4": {
            "TITLE": "IPv6 Tunnel 6to4 Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Enable or disable the IPv6 feature."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Choosing the correct connection type based on your ISP network topology."
            }, {
                "type": "name",
                "title": "Tunnel 6to4",
                "content": "Connections which use 6to4 address assignment."
            }, {
                "type": "name",
                "title": "IPv4 Address",
                "content": "The IPv4 address assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "IPv4 Subnet Mask",
                "content": "The IPv4 subnet mask assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "IPv4 Default Gateway",
                "content": "The IPv4 gateway assigned by your ISP dynamically."
            }, {
                "type": "name",
                "title": "Tunnel Address",
                "content": "The IPv6 address assigned by your ISP dynamically."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Advanced</strong> button to set up the advanced options."
            }, {
                "type": "paragraph",
                "content": "If your ISP gives you one or two DNS IPv6 addresses, select <strong>Use Following DNS Address</strong> and enter the <strong>Primary DNS</strong> and <strong>Secondary DNS</strong> into the correct fields. Otherwise, the DNS servers will be assigned from ISP dynamically."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter another DNS IPv6 address in colon-hexadecimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you get Address not found error when you access a Web site, it is likely that your DNS servers are set up improperly. You should contact your ISP to get DNS server addresses."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Connect</strong> to connect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Disconnect</strong> to disconnect immediately."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "LAN_IPV4": {
            "TITLE": "You can configure the IP parameters of LAN on this page.",
            "CONTENT": [{
                "type": "note",
                "title": "Note",
                "content": ["1. If you change the LAN IP address, you must use the new IP address to login to the Router.", "2. If the new LAN IP address you set is not in the same subnet with the previous one, the IP Address pool in the DHCP server will be configured automatically, but the Virtual Server and DMZ Host will not take effect until they are re-configured."]
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "LAN_IPV6": {
            "TITLE": "LAN IPv6 Help",
            "CONTENT": [{
                "type": "name",
                "title": "Assign Type",
                "content": "The way how the router assign IPv6 address for PC in LAN, SLAAC(Stateless address autoconfiguration) and DHCPv6 (Dynamic Host Configuration Protocol for IPv6) Server."
            }, {
                "type": "name",
                "title": "Address Prefix",
                "content": "The LAN global IPv6 address of the Router"
            }, {
                "type": "name",
                "title": "Release Time",
                "content": "The release time of (Only can be configured when DHCPv6 is selected)"
            }, {
                "type": "name",
                "title": "Address",
                "content": "The physical address of the LAN port."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "DHCP_SERVER": {
            "TITLE": "Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This device is set up by default as a DHCP (Dynamic Host Configuration Protocol) server, which provides the TCP/IP configuration for all the PCs that connected to this device in the LAN.",
                "children": [{
                    "type": "name",
                    "title": "DHCP Server",
                    "content": "Enable or Disable the server. If you disable the Server, you must have another DHCP server within your network or else you must configure the IP address of the computer manually."
                }, {
                    "type": "name",
                    "title": "IP Address Pool",
                    "content": "This field specifies the start and end IP Address that may be leased to clients. 192.168.0.100 is the default start IP address. 192.168.0.199 is the default end IP address."
                }, {
                    "type": "name",
                    "title": "Address Lease Time",
                    "content": "The Address Lease Time is the length of time a network user will be allowed to keep connecting to this device with the current DHCP Address. Enter the amount of time, in minutes, that the DHCP address will be \"leased\". The time range is 1~2880 minutes. The default value is 120 minutes."
                }, {
                    "type": "name",
                    "title": "Default Gateway",
                    "content": " (Optional) Suggest to input the IP Address of the LAN port of this device. The default value is 192.168.0.1."
                }, {
                    "type": "name",
                    "title": "Default Domain",
                    "content": "(Optional) Input the domain name of your network."
                }, {
                    "type": "name",
                    "title": "Primary DNS",
                    "content": "(Optional) Input the DNS IP address provided by your ISP. "
                }, {
                    "type": "name",
                    "title": "Secondary DNS",
                    "content": "(Optional) You can input the IP Address of another DNS server if your ISP provides two DNS servers."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "content": "To use the DHCP server function of this device, you should configure all computers in the LAN as \"Obtain an IP Address automatically\" mode. This function will take effect until this device reboots."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save the changes."
            }, {
                "type": "title",
                "content": "Client List"
            }, {
                "type": "paragraph",
                "content": "This page shows Client Name, MAC Address, Assigned IP Address and Lease Time of each DHCP Client connected to this device.",
                "children": [{
                    "type": "name",
                    "title": "Client Name",
                    "content": "The name of the DHCP client."
                }, {
                    "type": "name",
                    "title": "MAC Address",
                    "content": "The MAC address of the DHCP client."
                }, {
                    "type": "name",
                    "title": "Assigned IP Address",
                    "content": "The IP address this device has allocated to the DHCP client."
                }, {
                    "type": "name",
                    "title": "Lease Time",
                    "content": "The time of the DHCP client leased."
                }]
            }, {
                "type": "paragraph",
                "content": "You cannot change any of the values on this form. To update this form and to show the current connected devices, click on the <strong>Refresh</strong> button."
            }, {
                "type": "title",
                "content": "Address Reservation"
            }, {
                "type": "paragraph",
                "content": "When you specify a reserved IP address for a PC in the LAN, that PC will always receive the same IP address each time when it accesses the DHCP server. Reserved IP addresses could be assigned to servers that require permanent IP settings.",
                "children": [{
                    "type": "name",
                    "title": "MAC Address",
                    "content": "The MAC Address of the PC that you want to reserve an IP address for."
                }, {
                    "type": "name",
                    "title": "Reserved IP Address",
                    "content": "The IP address this device reserved."
                }, {
                    "type": "name",
                    "title": "Description",
                    "content": "The description for the reservation address."
                }, {
                    "type": "name",
                    "title": "Enable",
                    "content": "It shows whether the entry is enabled or not."
                }, {
                    "type": "name",
                    "title": "Modify",
                    "content": "To modify or delete an existing entry."
                }]
            }, {
                "type": "note",
                "title": "To Reserve IP Addresses, you can follow these steps:",
                "content": ["1. Enter the MAC Address (The format for the MAC Address is XX-XX-XX-XX-XX-XX) and the IP address in dotted-decimal notation of the computer you wish to add. Add description for your adding item which is optional. Select or not enable this entry.", "2. Click the OK button."]
            }, {
                "type": "note",
                "title": "To modify a Reserved IP Address, you can follow these steps:",
                "content": ["1. Select the reserved address entry as you desired, modify it. If you wish to delete the entry, click the Delete link of the entry.", "2. Click the Save button."]
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Add</strong> button to add a new Address Reservation entry."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Delete</strong> button to delete the selected entries in the table."
            }, {
                "type": "paragraph",
                "content": "Click the <strong>Next</strong> button to go to the next page, or click the Previous button return to the previous page."
            }]
        },
        "ADVANCED_ROUTING": {
            "TITLE": "Static Routing",
            "CONTENT": [{
                "type": "paragraph",
                "content": "A static route is a pre-determined path that network information must follow to reach a specific host or network. Use the Static Routing page to add or delete a route."
            }, {
                "type": "note",
                "title": "To add static routing entries:",
                "content": ["1. Click the Add button.", "2. Enter the following data:"]
            }, {
                "type": "paragraph",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Destination Network",
                    "content": "The Destination IP Address is the address of the network or host that you want to assign to a static route."
                }, {
                    "type": "name",
                    "title": "Subnet Mask",
                    "content": "The Subnet Mask determines which portion of an IP address is the network portion, and which portion is the host portion."
                }, {
                    "type": "name",
                    "title": "Default Gateway",
                    "content": "This is the IP address of the default gateway device that allows for the contact between the Router and the network or host."
                }, {
                    "type": "name",
                    "title": "Description",
                    "content": "This is the description for you adding entry."
                }]
            }, {
                "type": "note",
                "title": "",
                "content": ["3. Click the <strong>checkbox</strong> to Enable the entry.", "4. Click the <strong>OK</strong> button to save the changes."]
            }, {
                "type": "note",
                "title": "To modify or delete an existing entry:",
                "content": ["1. Find the desired entry in the table.", "2. Click <strong>Modify</strong> or <strong>Delete</strong> as desired on the Modify column."]
            }, {
                "type": "title",
                "content": "System Routing Table"
            }, {
                "type": "paragraph",
                "content": "System routing table views all of the valid route entries in use. The Destination IP address, Subnet Mask, Gateway, and Interface will be displayed for each entry. Click the Refresh button to refresh the data displayed.",
                "children": [{
                    "type": "name",
                    "title": "Destination Network",
                    "content": "The Destination Network is the address of the network or host to which the static route is assigned."
                }, {
                    "type": "name",
                    "title": "Subnet Mask",
                    "content": "The Subnet Mask determines which portion of an IP address is the network portion, and which portion is the host portion."
                }, {
                    "type": "name",
                    "title": "Gateway",
                    "content": "This is the IP address of the gateway device that allows for contact between the Router and the network or host."
                }, {
                    "type": "name",
                    "title": "Interface",
                    "content": "This interface tells you whether the Destination IP Address is on the LAN & WLAN (internal wired and wireless networks), the WAN (Internet)."
                }]
            }]
        },
        "alg": {
            "TITLE": "Application Layer Gateway(ALG)",
            "CONTENT": [{
                "type": "paragraph",
                "content": "ALG allows customized Network Address Translation (NAT) traversal filters to be plugged into the gateway to support address and port translation for certain application layer \"control/data\" protocols: FTP, TFTP, H323 etc. "
            }, {
                "type": "name",
                "title": "PPTP Pass-through",
                "content": "If selected, it allows Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                "type": "name",
                "title": "L2TP Pass-through",
                "content": "If selected, it allows Layer 2 Point-to-Point sessions to be tunneled through an IP network and passed through the router."
            }, {
                "type": "name",
                "title": "IPSec Pass-through",
                "content": "If selected, it allows Internet Protocol security (IPSec) to be tunneled through an IP network and passed through the router. IPSec uses crytographic security services to ensure private and secure communications over IP networks."
            }, {
                "type": "name",
                "title": "FTP ALG",
                "content": "If selected, it allows FTP (File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
                "type": "name",
                "title": "TFTP ALG",
                "content": "If selected, it allows TFTP (Trivial File Transfer Protocol) clients and servers to transfer data via NAT."
            }, {
                "type": "name",
                "title": "RTSP ALG",
                "content": "If selected, it allows media player clients to communicate with streaming media servers via NAT."
            }, {
                "type": "name",
                "title": "H323 ALG",
                "content": "If selected, it allows Microsoft NetMeeting clients to communicate via NAT."
            }, {
                "type": "name",
                "title": "SIP ALG",
                "content": "Select the checkbox to enable SIP ALG feature. If selected, it allows SIP clients and servers to transfer data across NAT."

            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "virtualServer": {
            "TITLE": "Virtual Servers",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Virtual Servers are used to set up public services on your local network. A virtual server is defined as an external port, and all requests from the Internet to this external port will be redirected to a designated computer, which must be configured with a static or reserved IP address."
            }, {
                "type": "name",
                "title": "Service Type",
                "content": " Displays the name of your virtual server."
            }, {
                "type": "name",
                "title": "External Port",
                "content": "Displays the port number or a range of ports used by the virtual server. "
            }, {
                "type": "name",
                "title": "Internal IP",
                "content": "Displays the IP address of the computer running the service application."
            }, {
                "type": "name",
                "title": "Internal Port",
                "content": "Displays the port number of computer running the service application."
            }, {
                "type": "name",
                "title": "Protocol",
                "content": "Displays the protocol used for the service application: TCP, UDP, or All (All protocols supported by the router)."
            }, {
                "type": "name",
                "title": "Status",
                "content": "Displays the current status (enabled or disabled) of the specific filtering rule."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify or Delete the corresponding rule."
            }, {
                "type": "note",
                "title": "<strong>To set up a Virtual Server rule</strong>",
                "content": ["Click Add.", "Click View Existing Applications to select a service from the list to automatically populate the appropriate port number in the External Port and Internal Port fields. If the service is not listed, enter the external port number (e.g. 21) or a range of ports (e.g. 21-25). Leave the Internal Port blank if it is the same as the External Port or enter a specific port number (e.g. 21) if the External Port is a single port. Enter the IP address of the computer running the service application in the dotted decimal format into the Internal IP field.", "Select a protocol for the service application: TCP, UDP, or All from the Protocol drop-down list.", "Select Enable this Entry.", "Click OK."]
            }, {
                "type": "paragraph",
                "content": "<strong>To modify or delete a Virtual Server rule</strong><br>In the table, click the Edit icon or the Trash icon that corresponds to the rule that you wish to modify or delete."
            }, {
                "type": "paragraph",
                "content": "<strong>To delete multiple rules</strong><br>Select all the rules that you wish to delete, click Delete above the table."
            }, {
                "type": "paragraph",
                "content": "<strong>Note:</strong><br>If your local host device is hosting more than one type of available services, you need to create a rule for each service."
            }]
        },
        "portTrigger": {
            "TITLE": "Port Triggering",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Port Triggering is used to forward traffic on a certain port to specific server on the network.  "
            }, {
                "type": "name",
                "title": "Application",
                "content": "Displays the name of the application."
            }, {
                "type": "name",
                "title": "Triggering Port",
                "content": "Displays the outgoing traffic port used to trigger a filtering rule of an outgoing connection."
            }, {
                "type": "name",
                "title": "Trigger Protocol",
                "content": "Displays the protocol used for Triggering Port. TCP, UDP, or All (All protocols supported by the router)."
            }, {
                "type": "name",
                "title": "External Port",
                "content": "Displays the port or port range used by the remote system. A response using one of these ports will be forwarded to the PC which triggers this rule. You can input at most 5 groups of ports (or port sections). Every group of ports must be separated with \",\"(commas), for example, 2000-2038, 2046, 2050-2051, 2085, 3010-3030."
            }, {
                "type": "name",
                "title": "External Protocol",
                "content": "Displays the protocol used for Incoming Port: TCP, UDP, or ALL (all protocols supported by the router)."
            }, {
                "type": "name",
                "title": "Status",
                "content": "Displays the current status (enabled or disabled) of the specific filtering rule."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify or Delete the corresponding rule."
            }, {
                "type": "note",
                "title": "<strong>To set up a Port Triggering rule</strong><br><strong>Note: </strong><font color='black'>Each rule can only be used by one host at a time.</font>",
                "content": ["Click Add.", "Click View Existing Applications to select an application from the list to automatically populate the default values into the appropriate fields. If you want to add an unlisted application, manually enter the Application, Triggering Port, Triggering Protocol, External Port and External Protocol.<br><strong>Note: </strong> Rules cannot have any port ranges overlap each other (e.g. Rule 1 has the port range 4200-4205, which means Rule 2 cannot have port range from 4203-4206).", "Select Enable this Entry.", "Click OK."]
            }, {
                "type": "paragraph",
                "content": "<strong>To modify or delete a Port Triggering rule</strong><br>In the table, click the Edit icon or the Trash icon that corresponds to the rule that you wish to modify or delete."
            }, {
                "type": "paragraph",
                "content": "<strong>To delete multiple Port Triggering rules</strong><br>In the table, select all rules that you wish to delete, click Delete above the table."
            }]
        },
        "dmz": {
            "TITLE": "DMZ",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The DMZ (Demilitarized Zone) host feature allows a local host to be exposed to the Internet for a special-purpose service, such as Internet gaming or video conferencing. Basically, the DMZ allows a single computer on your LAN to open all its ports. This computer needs to be configured with a static IP address and have its DHCP client function disabled."
            }, {
                "type": "note",
                "title": "<strong>To assign a computer or server to be a DMZ server</strong>",
                "content": ["Select Enable DMZ.", "In the DMZ Host IP Address field, enter the IP Address of a local computer to set up as the DMZ host.", "Click Save."]
            }]
        },
        "upnp": {
            "TITLE": "UPnP",
            "CONTENT": [{
                "type": "paragraph",
                "content": "By default, the Universal Plug-and-Play (UPnP) feature is enabled to allow devices, such as computers and Internet appliances to automatically discover and communicate with each other on the local network."
            }, {
                "type": "name",
                "title": "UPnP",
                "content": "UPnP can be enabled or disabled by clicking On or Off button. This feature is enabled by default."
            }, {
                "type": "title",
                "content": "UPnP Service List"
            }, {
                "type": "paragraph",
                "content": "The UPnP Service List displays the UPnP device information."
            }, {
                "type": "name",
                "title": "Service Description",
                "content": "Displays a brief description of the local host that initiates the UPnP request."
            }, {
                "type": "name",
                "title": "External Port",
                "content": "Displays the external port that is opened by the local host."
            }, {
                "type": "name",
                "title": "Protocol",
                "content": "Displays the network protocol type that is used by the local host."
            }, {
                "type": "name",
                "title": "Internal IP Address",
                "content": "Displays the IP address of the local host."
            }, {
                "type": "name",
                "title": "Internal Port",
                "content": "Displays the internal port that is opened by the local host."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Refresh</strong> to update the UPnP Server List."
            }]
        },
        networkMap: {
            TITLE: "Internet",
            CONTENT:[
                {
                    type: 'name',
                    title: 'Internet Status',
                    content: 'Displays the current status of the Internet Connection of the router.'

                },
                {
                    type: 'name',
                    title: 'Connection Type',
                    content: 'Displays the type of Internet connection. '
                },
                {
                    type: 'name',
                    title: 'Internet IP Address',
                    content: 'Displays the current Internet IP address assigned to the router.'
                },
                {
                    type: 'name',
                    title: 'DNS Server',
                    content: 'Displays the IP addresses of the primary and secondary DNS servers.'
                },
                {
                    type: 'name',
                    title: 'Gateway',
                    content: 'Displays the IP address of the Gateway.'
                },
                {
                    type: 'title',
                    title: 'Router'
                },
                {
                    type: 'title2',
                    content: 'Wireless 2.4G | 5G-1 | 5G-2'
                },
                {
                    type: 'name',
                    title: 'Status',
                    content: 'Displays whether the wireless 2.4G | 5G-1 | 5G-2 is on (enabled) or off (disabled).'
                },
                {
                    type: 'name',
                    title: 'SSID',
                    content: 'Displays the current wireless network name of the 2.4G | 5G-1 | 5G-2 band frequency.'
                },
                {
                    type: 'name',
                    title: 'Channel',
                    content: 'Displays the channel of which the wireless 2.4G | 5G-1 | 5G-2 network broadcasts.'
                },
                {
                    type: 'name',
                    title: 'MAC',
                    content: 'Displays the current MAC address of the wireless 2.4G | 5G-1 | 5G-2.'
                },
                {
                    type: 'title2',
                    content: 'Guest Network 2.4G | 5G-1 | 5G-2'
                },
                {
                    type: 'name',
                    title: 'Status',
                    content: 'Displays whether the wireless Guest Network 2.4G | 5G-1 | 5G-2 is on (enabled) or off (disabled).'
                },
                {
                    type: 'name',
                    title: 'SSID',
                    content: 'Displays the wireless network name of Guest Network.'
                },
                {
                    type: 'title',
                    title: 'Wireless/Wired Clients'
                },
                {
                    type: 'name',
                    title: 'Name',
                    content: ' Displays the name of the client connected to the router. '
                },
                {
                    type: 'name',
                    title: 'IP Address',
                    content: 'Displays the assigned IP address of the client.'
                },
                {
                    type: 'name',
                    title: 'MAC Address',
                    content: 'Displays the MAC address of the client.'
                },
                /*{
                    type: 'title',
                    title: 'Phone'
                },
                {
                    type: 'name',
                    title: 'Phone Name',
                    content: 'Displays the name of your phone.'
                },
                {
                    type: 'name',
                    title: 'Incoming Call Numbers',
                    content: 'Displays the numbers used by your telephony devices to receive incoming calls through your router. '
                },
                {
                    type: 'name',
                    title: 'Internal Number',
                    content: 'Displays phone numbers that are used to make calls between telephony devices connected to the same router. It is preset and could not be changed.'
                },
                {
                    type: 'name',
                    title: 'Number of Outgoing',
                    content: 'Displays the numbers used by your telephony devices to make outgoing calls through your router. The default is Auto, which means the router will select an available number to be the Number of Outgoing. You can change it on VoIP page.'
                },*/
                {
                    type: 'title',
                    title: 'Printer'
                },
                {
                    type: 'name',
                    title: 'Name',
                    content: 'Displays the name of the printer connected to the router via USB port. '
                },

                {
                    type: 'title',
                    title: 'USB Disk'
                },
                {
                    type: 'name',
                    title: 'Brand',
                    content: 'Displays the brand of the USB disk connected to the router.'
                },
                {
                    type: 'name',
                    title: 'Total',
                    content: 'Displays the total volume of the USB disk.'
                },
                {
                    type: 'name',
                    title: 'Available',
                    content: 'Displays the available space of the USB disk.'
                }

            ]
        },
        "STREAM_BOOST_NETWORK": {
            "TITLE": "Arrow Indicators to/from Internet:",
            "CONTENT": [{
                "type": "title",
                "content": "Arrow indicators to/from Router",
                "children": [{
                    "type": "name",
                    "title": "Towards devices",
                    "content": "Bandwidth being used by indicated devices(download bandwidth)."
                }, {
                    "type": "name",
                    "title": "Towards router",
                    "content": "Bandwidth being sent by indicated devices(upload bandwidth)."
                }]
            }, {
                "type": "title",
                "content": "Click on Router Image to see more details about applications running on all active devices."
            }, {
                "type": "title",
                "content": "Operating system type icon",
                "children": [{
                    "type": "paragraph",
                    "content": "The number on operating system type icon indicates how many of this type of machine units are. Click the icon, and it will show the detailed information of this type of machine."
                }]
            }]
        },
        "STREAM_BOOST_ROUTER": {
            "TITLE": "Network Router Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "All Active devices are listed"
            }, {
                "type": "title",
                "content": "Devices can be selected to show its active applications",
                "children": [{
                    "type": "paragraph",
                    "content": "The corresponding progress bar of the device shows the currently occupied up/down bandwith by this device."
                }]
            }, {
                "type": "title",
                "content": "Up/Down Bandwidth Graphs",
                "children": [{
                    "type": "paragraph",
                    "content": "Graphs show bandwidth usage to and from devices over the last minute."
                }]
            }]
        },
        "STREAM_BOOST_DEVICES": {
            "TITLE": "Application Icons",
            "CONTENT": [{
                "type": "title",
                "content": "Bandwidth Indication",
                "children": [{
                    "type": "paragraph",
                    "content": "Top gray indicator is bandwidth being sent from the associated application"
                }, {
                    "type": "paragraph",
                    "content": "Bottom blue indicator is bandwidth being used by the associated application"
                }]
            }, {
                "type": "title",
                "content": "Experience Indicator",
                "children": [{
                    "type": "name",
                    "title": "Green Circle",
                    "content": "Application running with fully allocated optimal policy. Applications should perform as expected."
                }, {
                    "type": "name",
                    "title": "Blue Circle",
                    "content": "Application performance protected, but constrained due to limited total bandwidth. Application performance will perform well, may see lower than expected resolutions."
                }, {
                    "type": "name",
                    "title": "Orange Circle",
                    "content": "Application operating unprotected due to insufficient bandwidth may experience interruptions or slow service."
                }]
            }, {
                "type": "title",
                "content": "Up/Down Bandwidth Graphs",
                "children": [{
                    "type": "paragraph",
                    "content": "Graphs show bandwidth usage to and from devices over the last minute."
                }]
            }]
        },
        "STREAM_BOOST_BANDWIDTH": {
            "TITLE": "Enable StreamBoost Bandwidth Control",
            "CONTENT": [{
                "type": "title",
                "content": "Enable Auto Bandwidth Estimation",
                "children": [{
                    "type": "paragraph",
                    "content": "Checking this box allows StreamBoost to accurately measure available bandwidth on your network. Auto bandwidth measurements drives internet usage, so this may not be the best solution if under bandwidth usage restrictions."
                }, {
                    "type": "paragraph",
                    "content": "If not selected, you can manually enter bandwidth (speed) values. See instructions below."
                }]
            }, {
                "type": "title",
                "content": "Entering Download/Upload Speed using the Test button",
                "children": [{
                    "type": "paragraph",
                    "content": "Uncheck Enable Auto Bandwidth Estimation"
                }, {
                    "type": "paragraph",
                    "content": "You can use the Test button to measure the bandwidth. Be sure that all devices are not active on the network for an accurate measurement."
                }, {
                    "type": "paragraph",
                    "content": "If the value returns an acceptable value, save the entry."
                }]
            }, {
                "type": "title",
                "content": "Manually entering Download/Upload Speed",
                "children": [{
                    "type": "paragraph",
                    "content": "Uncheck Enable Auto Bandwidth Estimation"
                }, {
                    "type": "paragraph",
                    "content": "Manually enter the values in the dialog boxes. Any setting entered here must not exceed the actual BW allocated to your home or StreamBoost will not operate optimally."
                }]
            }]
        },
        "STREAM_BOOST_PRIORITY": {
            "TITLE": "Changing Device Priority",
            "CONTENT": [{
                "type": "title",
                "content": "What is device priority used for?",
                "children": [{
                    "type": "paragraph",
                    "content": "Device priorities are used when active applications require more bandwidth than is currently available. In this condition, lower priority devices may have bandwidth taken from them in order to ensure the appropriate amount of bandwidth is going to the higher priority devices"
                }]
            }, {
                "type": "title",
                "content": "Device Priority FAQâ€™s",
                "children": [{
                    "type": "name",
                    "title": "Will a download from a higher priority device affect a movie , game or VoIP call on a lower priority device",
                    "content": "No, experience-based applications are traffic shaped so that data transfer and general browsing applications do not disturb their experience."
                }, {
                    "type": "name",
                    "title": "When should I change the priority of a device?",
                    "content": "Changing the priority of a device should only be necessary if the device is experiencing streaming or real-time application performance issues when other devices are running the same application types. Changing device priority will then favor the higher priority device when running similar applications."
                }]
            }]
        },
        "STREAM_BOOST_STATISTICS_UPTIME": {
            "TITLE": "Graph",
            "CONTENT": [{
                "type": "name",
                "title": "Time Range",
                "content": "What time period do want to examine?",
                "children": [{
                    "type": "name",
                    "title": "Last Day",
                    "content": "Traffic from the last day"
                }, {
                    "type": "name",
                    "title": "Last Week",
                    "content": "Traffic from the last week"
                }, {
                    "type": "name",
                    "title": "Last Month",
                    "content": "Traffic from the last month"
                }]
            }, {
                "type": "name",
                "title": "Devices",
                "content": "What device/devices network traffic do you want to examine?",
                "children": [{
                    "type": "name",
                    "title": "All LAN Hosts",
                    "content": "Every device that is on your network"
                }, {
                    "type": "name",
                    "title": "Specific device",
                    "content": "Dispay just applicitions from the selected device"
                }]
            }]
        },
        "STREAM_BOOST_STATISTICS_DOWNLOADS": {
            "TITLE": "Graph",
            "CONTENT": []
        },
        "BASIC_NETWORK": {
            "TITLE": "Network Map Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The <strong>Network Map</strong> section indicates your router's current settings and configuration status."
            }, {
                "type": "name",
                "title": "Internet",
                "content": "The following parameters apply to the WAN ports of the Router."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The physical address of the WAN/Internet port."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP parameter used by the router to access the Internet. If the IP Address is 0.0.0.0, it means no Internet connection is established."
            }, {
                "type": "name",
                "title": "Gateway",
                "content": "The IP parameter used by the router to access the Internet."
            }, {
                "type": "name",
                "title": "Wireless/Wired Clients",
                "content": "The wireless/wired clients currently connected to the router."
            }, {
                "type": "name",
                "title": "ID",
                "content": "The ID number of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "Name",
                "content": "The Name of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The IP Address of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC Address of the connected wireless/wired device(s)."
            }, {
                "type": "name",
                "title": "Wireless 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The current settings of the Wireless Network. You may proceed to configuration in the <strong>Wireless</strong> section."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "The SSID of the Router."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "The wireless channel that's currently in use."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The physical address of the WLAN/Internet port."
            }, {
                "type": "name",
                "title": "Guest Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The current settings of the Guest Network. You may proceed to configuration in the <strong>Guest Network</strong> section."
            }, {
                "type": "name",
                "title": "Status",
                "content": "It indicates whether the Guest Network is enabled or disabled."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "The SSID of the Guest Network."
            }, {
                "type": "name",
                "title": "USB",
                "content": "The current settings of the USB device. You may proceed to configuration in the <strong>USB Settings</strong> section."
            }, {
                "type": "name",
                "title": "Name",
                "content": "The name of the printer."
            }, {
                "type": "name",
                "title": "Total",
                "content": "The storage capacity of the USB device."
            }, {
                "type": "name",
                "title": "Available",
                "content": "The available space of the USB device."
            }]
        },
        "BASIC_INTERNET_DYNAMIC": {
            "TITLE": "Internet Dynamic IP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP is running on DHCP server, please select <strong>Dynamic IP</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "paragraph",
                "content": "If your ISP provides a cable modem, please proceed the router configuration on wired connection with your main computer, so that you can have the Internet access when directly connected to the ISP's modem."
            }, {
                "type": "paragraph",
                "content": "Why do I need to Clone MAC Address?"
            }, {
                "type": "paragraph",
                "content": "Some ISPs may register the MAC address of your computer which firstly connects to their service, and would not allow the Internet connection for any new computer or router. In this case, you need to clone the MAC address of the computer to the router."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "BASIC_INTERNET_STATIC": {
            "TITLE": "Internet Static IP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a Static IP Address, Subnet Mask, Gateway and DNS Settings, please select <strong>Static IP</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Enter the IP Address in dotted-decimal notation provided by your ISP."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP. "
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP."
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "Enter the Secondary DNS Server IP Address provided by your ISP."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_PPPOE": {
            "TITLE": "Internet PPPoE Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a PPPoE connection, please select <strong>PPPoE</strong>."
            }, {
                "type": "name",
                "title": "Note",
                "content": "If you are not sure what your <strong>Internet Connection Type</strong> is, click the <strong>Detect</strong> button to automatically identify it. You may also contact your Internet Service Provider (ISP) to verify it. The major types of Internet connections are as follows:",
                "children": [{
                    "type": "name",
                    "title": "PPPoE",
                    "content": "Connection that requires a user name and password."
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Connection that assigns a dynamic IP address."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Connection that assigns a static IP address."
                }]
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_L2TP": {
            "TITLE": "Internet L2TP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a L2TP connection, please select <strong>L2TP</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Dynamic IP/Static IP",
                "content": "Select Static IP if the IP Address, Subnet Mask, Gateway and DNS Server Address are provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "BASIC_INTERNET_PPTP": {
            "TITLE": "Internet PPTP Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "If your ISP provides a PPTP connection, please select <strong>PPTP</strong>."
            }, {
                "type": "name",
                "title": "User Name/Password",
                "content": "Enter the User Name and Password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Dynamic IP/Static IP",
                "content": "Select Static IP if the IP Address, Subnet Mask, Gateway and DNS Server Address are provided by your ISP. Otherwise, please select Dynamic IP."
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the VPN Server IP Address or Domain Name provided by your ISP."
            }, {
                "type": "name",
                "title": "IP address",
                "content": "Enter the IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Enter the Subnet Mask provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the Default Gateway provided by your ISP (only if Static IP is selected). "
            }, {
                "type": "name",
                "title": "Primary DNS",
                "content": "Enter the Primary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "Secondary DNS",
                "content": "(Optional) Enter the Secondary DNS Server IP Address provided by your ISP. (Only can be configured when <strong>Static IP</strong> is selected)"
            }, {
                "type": "name",
                "title": "DNS",
                "content": "Enter the DNS Server IP Address provided by your ISP (only if Static IP is selected)."
            }, {
                "type": "paragraph",
                "content": "Click Save to save all your settings."
            }]
        },
        "MAC_FITLERING": {
            "TITLE": "MAC Filtering Help",
            "CONTENT": [{
                "type": "name",
                "title": "Enable MAC Filtering",
                "content": "Enable or disable the MAC Filtering."
            }, {
                "type": "name",
                "title": "Select the Filtering Rule",
                "content": "The device in black list can not access this router.Only the device in white list can access this router."
            }, {
                "type": "name",
                "title": "Devices in Black List",
                "content": "You can add or delete an entry.",
                "children": [{
                    "type": "name",
                    "title": "Add",
                    "content": "To add a wireless MAC Address filtering entry, click the Add, following these instructions:"
                }, {
                    "type": "note",
                    "title": "",
                    "content": [" 1. click <strong>View Existing Devices</strong>, and choose one entry, fill <strong>MAC Address field automatically.", " 2. Enter a simple description of the wireless station in the <strong>Description</strong> field. ", " 3. Select <strong>Enable this entry</strong> or not. ", " 4. Click the <strong>OK</strong> button to save this entry or <strong>Cancel</strong> button to cancel your operation. "]
                }, {
                    "type": "name",
                    "title": "Delete",
                    "content": "Select existing entries to be deleted, and click the Delete."
                }, {
                    "type": "paragraph",
                    "content": "Every entry in Devices in Black List has the Modify column, click  Modify to modify this entry, click  Delete to delete this entry."
                }]
            }]
        },
        "wirelessSettings": {
            "TITLE": "Settings",
            "CONTENT": [
            {
                "type": "name",
                "title": "Region",
                "content": "Select your region from the pull-down list. This field specifies the region where the wireless function of the router can be used. It may be illegal to use the wireless function of the route in a region other than one of those specified in this field. If your country or region is not listed, please contact your local goverment agency for assistance."
            }, {
                "type": "name",
                "title": "Smart Connect",
                "content": "Select this checkbox to enable smart connect . This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
            }, {
                "type": "name",
                "title": "Wireless Radio",
                "content": "Select this checkbox to enable the 2.4GHz | 5GHz-1 | 5GHz-2 wireless radio frequency."
            }, {
                "type": "name",
                "title": "Wireless Network Name (SSID)",
                "content": "You can leave the default Network Name (SSID) as it is, or enter a new name (up to 32 characters). This field is case-sensitive."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "Select this checkbox if you want to hide the 2.4GHz | 5GHz-1 | 5GHz-2 network name (SSID) from the Wi-Fi network list."
            }, {
                "type": "name",
                "title": "Security",
                "content": "Select one of the following security options:",
                "children": [{
                    "type": "name",
                    "title": "No Security",
                    "content": "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your wireless network from unauthorized access."
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Personal",
                    "content": "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. This option is recommended. If selected, configure the following.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "Select a security version for your wireless network.",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                        }, {
                            "type": "name",
                            "title": "WPA2-PSK",
                            "content": "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                    }, {
                        "type": "name",
                        "title": "Password",
                        "content": "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters into this field."
                    }]
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Enterprise",
                    "content": "Select this option to enable the more advanced authentication method using a RADIUS (Remote Authentication Dial In User Service) server. If selected, WPS function will be disabled.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "Select a security version for your wireless network.",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                        }, {
                            /*"type": "name",
                            "title": "WPA-PSK",
                            "content": " This option supports only TKIP encryption that provides a good level of security. "
                        }, {*/
                            "type": "name",
                            "title": "WPA2-PSK",
                            "content": "This option support AES encryption that provides a better level of security than WPA-PSK and is recommended."
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                    }, {
                        "type": "name",
                        "title": "RADIUS Server IP",
                        "content": "Enter the IP address of the RADIUS server."
                    }, {
                        "type": "name",
                        "title": "RADIUS Server Port",
                        "content": "Enter the port number of the RADIUS server."
                    }, {
                        "type": "name",
                        "title": "RADIUS Server Password",
                        "content": " Enter the shared password of the RADIUS server."
                    }]
                }, {
                    "type": "name",
                    "title": "WEP",
                    "content": "Select this option to enable basic authentication method if any version of your client devices can only access the wireless using WEP (Wired Equivalent Privacy).",
                    "children": [{
                        "type": "name",
                        "title": "Type",
                        "content": "Select an authentication type for your wireless network. The default is Open System."
                    }, {
                        "type": "name",
                        "title": "Key Selected",
                        "content": "Select which of the four keys will be used."
                    }, {
                        "type": "name",
                        "title": "WEP Key Format",
                        "content": "Either use ASCII format or select Hexadecimal. ASCII format is a combination of alphabetic and numeric characters. Hexadecimal format is a combination of the number (0-9) and letters (A-F, a-f)."
                    }, {
                        "type": "name",
                        "title": "Key Type",
                        "content": "Select a WEP key length.",
                        "children": [{
                            "type": "name",
                            "title": "64-bit encryption",
                            "content": "Allows you to enter 10 hexadecimal digits (0-9, A-F, a-f) or 5 ASCII characters into the WEP Value field."
                        }, {
                            "type": "name",
                            "title": "128-bit encryption",
                            "content": "Allows you to enter 26 hexadecimal digits (0-9, A-F, a-f) or 13 ASCII characters into the WEP Value field."
                        }]
                    }, {
                        "type": "name",
                        "title": "Key Value",
                        "content": "Enter one or more WEP keys into the respective fields."
                    }]
                }]
            }, {
                "type": "name",
                "title": "Mode",
                "content": "Select a transmission mixed mode."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "Select an operating channel for the 2.4GHz | 5GHz-1 | 5GHz-2 wireless network. It is recommended to leave the channel to Auto, if you are not experiencing the intermittent wireless connection issue."
            }, {
                "type": "name",
                "title": "Channel Width",
                "content": "Select a channel width (bandwidth) for the 2.4GHz | 5GHz-1 | 5GHz-2 wireless network."
            }, {
                "type": "name",
                "title": "Transmit Power",
                "content": "Select either High, Middle, or Low to specify the data transmit power. The default and recommended setting is High."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "wps": {
            "TITLE": "WPS",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Other devices can connect to this router by WPS with Router's PIN."
            }, {
                "type": "title",
                "content": "Router's PIN"
            }, {
                "type": "name",
                "title": "Enable Router's PIN",
                "content": "Toggle On to allow wireless devices to connect to the router using the Router's PIN (Personal Identification Number)."
            }, {
                "type": "name",
                "title": "Current PIN",
                "content": "Displays the Router's PIN code. The default PIN can be found on the label of the router or in the User Guide. Click Generate to generate a new PIN randomly or click Restore to restore the current PIN to the factory default PIN."
            }, {
                "type": "title",
                "content": "WPS Settings"
            }, {
                /*"type": "name",
                "title": "Enable WPS",
                "content": ""
            }, {*/
                "type": "name",
                "title": "Push Button (Recommended)",
                "content": "Select this setup method to enable the WPS feature to easily connect any WPS-enabled device to your wireless network using the WPS button or virtually using the Connect button."
            }, {
                "type": "name",
                "title": "PIN Code",
                "content": "Select this setup method to add a device manually by entering the wireless device's WPS PIN into the field and click Connect."
            }]
        },
        "wirelessStat": {
            "TITLE": "Wireless Stations Online",
            "CONTENT": [{
                "type": "name",
                "title": "ID",
                "content": "Displays the index number of the associated wireless client."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "Displays the MAC address of the associated wireless client."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Displays the wireless frequency band (2.4GHz | 5GHz-1 | 5GHz-2) of the associated wireless client."
            }, {
                "type": "name",
                "title": "Security",
                "content": "Displays the security type (None, WEP, WPA/WPA2-Personal, or WPA/WPA2-Enterprise) of the associated wireless client. "
            }, {
                "type": "name",
                "title": "Received Packets",
                "content": "Displays the number of packets received by the associated wireless client."
            }, {
                "type": "name",
                "title": "Sent Packets",
                "content": "Displays the number of packets sent by the associated wireless client."
            }, {
                "type": "name",
                "title": "Transmit Rate",
                "content": "Displays the rate of last packets received by the associated wireless client."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Refresh</strong> to update the information on this page."
            }]
        },
        "wirelessAdv": {
            "TITLE": "Advanced Settings",
            "CONTENT": [{
                "type": "name",
                "title": "Beacon Interval",
                "content": "Enter a value between 25 and 1000 in milliseconds to determine the duration between beacon packets that are broadcasted by the router to synchronize the wireless network. The default is 100 milliseconds."
            }, {
                "type": "name",
                "title": "RTS Threshold",
                "content": "Enter a value between 1 and 2346 to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request of Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
            }, {
                "type": "name",
                "title": "DTIM Interval",
                "content": "This value determines the interval of the Delivery Traffic Indication Message (DTIM). Enter a value between 1 and 15 in milliseconds. The default value is 1, indicates the DTIM Interval is the same as Beacon Interval."
            }, {
                "type": "name",
                "title": "Group Key Update Period",
                "content": "Enter the number of seconds (minimum 30) to control the time interval for the encryption key automatic renewal. The default is 0, indicating no key renewal."
            }, {
                "type": "name",
                "title": "WMM",
                "content": "The WMM function guarantees the packets with high-priority messages being transmitted preferentially. It is enabled by default and highly recommended."
            }, {
                "type": "name",
                "title": "Short GI",
                "content": "This function is enabled by default and recommended to increase the data capacity by reducing the Guard Interval (GI) time."
            }, {
                "type": "name",
                "title": "AP Isolation",
                "content": "If you want to confine and restrict all wireless devices connected to your network from interacting with each other, but still able to access the Internet, select the Enable AP Isolation checkbox."
            }, {
                "type": "name",
                "title": "WDS Bridging",
                "content": "Enable the WDS (Wireless Distribution System) Bridging feature to allow the router to bridge with another access point (AP) in a wireless local area network (WLAN). If this feature is enabled, configure the following: ",
                "children": [{
                    "type": "name",
                    "title": "Wireless Network Name (SSID)",
                    "content": "Enter the SSID of the WAP (Wireless Access Point) that the router will connect to as a client or use the Survey feature to find all available networks in the current channel."
                }, {
                    "type": "name",
                    "title": "Survey",
                    "content": "Click this button to scan and display the SSID, BSSID, signal strength, channel, and security information of all available wireless networks within range. Once you select a network, the SSID, MAC Address, and Security will automatically populate."
                }, {
                    "type": "name",
                    "title": "MAC Address (to be bridged)",
                    "content": "Enter the MAC address (BSSID) in 12 hexadecimal characters (0-9, a,-f, A-F) format separated by hyphens of the wireless access point that the router will connect to as a client. If you choose the desired AP through the Survey feature, the MAC Address field is automatically populated."
                }, {
                    "type": "name",
                    "title": "Security",
                    "content": "Select the correct security type of the selected access point, No, WPA-PSK/WPA2-PSK or WEP. If you choose the desired AP through the Survey feature, the Security field is automatically populated. ",
                    "children": [{
                        "type": "name",
                        "title": "",
                        "content": ""
                    }, {
                        "type": "name",
                        "title": "",
                        "content": ""
                    }]
                }, {
                    "type": "paragraph",
                    "content": "Click <strong>Save</strong> to save your settings."
                }]
            }]
        },
        "macFilter": {
            TITLE: "Settings",
            CONTENT: [
                {
                    type: "name",
                    title: "Enable Wireless MAC Filtering",
                    content: "Toggle On to control the wireless access by MAC address."
                },
                {
                    type: "title",
                    title: "Filtering Rules"
                },
                {
                    type: "name",
                    title: "Block wireless access from the devices in the list below.",
                    content: "Select to block wireless access from the devices in the list below."
                },
                {
                    type: "name",
                    title: "Allow wireless access only from the devices in the list below.",
                    content: "Select to allow wireless access only from the devices in the list below."
                },
                {
                    type: "title",
                    title: "Devices List"
                },
                {
                    type: "name",
                    title: "MAC Address/Description",
                    content: "Displays the MAC Address and Description of the corresponding entry."
                },
                {
                    type: "name",
                    title: "Enable",
                    content: "Click the Bulb icon to enable or disable the entry."
                },
                {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Modify or Delete the corresponding entry."
                },
                {
                    type: "note",
                    title: "<strong>To blacklist or whitelist a device</strong>",
                    content: [
                        "Click the Add icon.",
                        "Enter the Device Name.",
                        "Enter the MAC address of the device.",
                        "Click OK."
                    ]
                },
                {
                    type: "name",
                    title: "Add",
                    content: "Click to add a new entry."
                },
                {
                    type: "name",
                    title: "MAC Address",
                    content: "Enter the wireless device's MAC address that you want to filter."
                },
                {
                    type: "name",
                    title: "Description",
                    content: "Enter a simple description of the wireless device."
                },
                {
                    type: "name",
                    title: "Enable this Entry",
                    content: "Select the checkbox to enable the entry."
                },
				{
                    type: "paragraph",
                    content: "<strong>To modify or delete a device in the Black/Whitelist</strong><br>In the Black/Whitelist table, click the Edit icon or the Trash icon that corresponds to the device you wish to modify or delete."
                },
                {
                    type: "paragraph",
                    content: "<strong>To delete multiple devices in the Black/Whitelist</strong><br>In the Black/Whitelist table, select all devices that you wish to delete, click Delete above the table."
                },
                {
                    type: "title",
                    content: "Devices Online"
                },
                {
                    type: "name",
                    title: "Device Name",
                    content: "Displays the name of the connected device."
                },
                {
                    type: "name",
                    title: "IP Address",
                    content: "Displays the IP address of the connected device."
                },
                {
                    type: "name",
                    title: "MAC Address",
                    content: "Displays the MAC address of the connected device."
                },
                {
                    type: "name",
                    title: "Connection Type",
                    content: "Displays the connection type of the connected device, either wired or wireless. "
                },
                {
                    type: "paragraph",
                    content: "<strong>To block one or multiple devices</strong><br>In the Devices Online table, select the devices that you wish to block, click Block above the table. The selected devices will be automatically added to the Devices in Blacklist."
                }
            ]
        },
        wirelessSchedule: {
            TITLE: "Task Schedule",
            CONTENT: [
                {
                    type: "name",
                    title: "2.4GHz | 5GHz-1 | 5GHz-2",
                    content: "Select 2.4GHz, 5GHz-1 or 5GHz-2 to change the corresponding settings."
                },
                {
                    type: "name",
                    title: "Enable Wireless Schedule",
                    content: "Toggle On to select the period on which you need the wireless off automatically."
                },
                {
                    type: "name",
                    title: "Restore",
                    content: "Click to clear time settings."
                },
                {
                    type: "name",
                    title: "Save",
                    content: "Click to save the settings."
                }
            ]
        },
        "GUSET_NETWORK_SET": {
            "TITLE": "Guest Network Help",
            "CONTENT": [{
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "If this check box is selected, anyone who connects to the Guest Network'SSID can access each other."
            }, {
                "type": "name",
                "title": "Allow guests to access to my local network",
                "content": "If this check box is selected, anyone who connects to the Guest Network'SSID can access the Host's local network."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuration."
            }, {
                "type": "name",
                "title": "Wireless Radio 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The Guest Network wireless radio of the Router can be enabled or disabled to allow wireless stations access. If enabled, the wireless stations will be able to access the Router, otherwise, wireless stations will not be able to access the Router."
            }, {
                "type": "name",
                "title": "Network Name (SSID)",
                "content": "Enter a value of up to 32 characters. The same Network Name (SSID) must be assigned to all wireless devices in your Guest Network."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": " If you select the Hide SSID checkbox, the wireless router will hide its Guest Network name (SSID) on the air."
            }, {
                "type": "name",
                "title": "Password",
                "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
            }]
        },
        "GUSET_NETWORK_WIRELESS": {
            "TITLE": "Wireless",
            "CONTENT": [{
                "type": "name",
                "title": "Security",
                "content": "You can select one of the following security options. ",
                "children": [{
                    "type": "name",
                    "title": "No Security",
                    "content": "The wireless stations will connect to the Router without any encryption. It is strongly recommended to choose one of the following modes to enable security."
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Personal",
                    "content": "Select WPA based on pre-shared passphrase.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "You can select one of following versions",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select WPA-PSK or WPA2-PSK automatically based on the wireless station's capability and request."
                        }, {
                            /*"type": "name",
                            "title": "WPA-PSK",
                            "content": "Pre-shared key of WPA."
                        }, {*/
                            "type": "name",
                            "title": "WPA2-PSK",
                            "content": "Pre-shared key of WPA2."
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "You can select either Auto, TKIP or AES."
                    }, {
                        "type": "name",
                        "title": "Wireless Password",
                        "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
                    }]
                }, {
                    "type": "name",
                    "title": "WPA/WPA2-Enterprise",
                    "content": "Select WPA based on Radius Server.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "You can select one of following versions",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select WPA or WPA2 automatically based on the wireless station's capability and request."
                        }, {
                            "type": "name",
                            "title": "WPA",
                            "content": "Wi-Fi Protected Access. "
                        }, {
                            "type": "name",
                            "title": "WPA2",
                            "content": "WPA version 2. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "You can select either Auto, TKIP or AES."
                    }, {
                        "type": "name",
                        "title": "Radius Server IP",
                        "content": "Enter the IP address of the Radius Server."
                    }, {
                        "type": "name",
                        "title": "Radius Port",
                        "content": "Enter the port that radius service used."
                    }, {
                        "type": "name",
                        "title": "Radius Password",
                        "content": "Enter the password for the Radius Server."
                    }]
                }, {
                    "type": "name",
                    "title": "WEP",
                    "content": "Select 802.11 WEP security.",
                    "children": [{
                        "type": "name",
                        "title": "Type",
                        "content": "You can select one of following types",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "Select Shared Key or Open System authentication type automatically based on the wireless station's capability and request."
                        }, {
                            "type": "name",
                            "title": "Shared Key",
                            "content": "Select 802.11 Shared Key authentication."
                        }, {
                            "type": "name",
                            "title": "Open System",
                            "content": "Select 802.11 Open System authentication. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Key Selected",
                        "content": "Select which of the four keys will be used."
                    }, {
                        "type": "name",
                        "title": "WEP Key Format",
                        "content": "You can select ASCII or Hexadecimal format. ASCII Format stands for any combination of keyboard characters in the specified length. Hexadecimal format stands for any combination of hexadecimal digits (0-9, a-f, A-F) in the specified length."
                    }, {
                        "type": "name",
                        "title": "Key Type",
                        "content": "You can select the WEP key length (64-bit, or 128-bit, or 152-bit.) for encryption. \"Disabled\" means this WEP key entry is invalid.",
                        "children": [{
                            "type": "name",
                            "title": "For 64-bit encryption",
                            "content": "You can enter 10 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 5 ASCII characters."
                        }, {
                            "type": "name",
                            "title": "For 128-bit encryption",
                            "content": "You can enter 26 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 13 ASCII characters."
                        }, {
                            "type": "name",
                            "title": "For 152-bit encryption",
                            "content": "You can enter 32 hexadecimal digits (any combination of 0-9, a-f, A-F, and null key is not permitted) or 16 ASCII characters. "
                        }]
                    }, {
                        "type": "name",
                        "title": "Key Value",
                        "content": "Enter the password for WEP."
                    }]
                }]
            }, {
                "type": "name",
                "title": "Mode",
                "content": "This field determines the wireless mode which the router works on."
            }, {
                "type": "name",
                "title": "Channel Width",
                "content": "The bandwidth of the wireless channel."
            }, {
                "type": "name",
                "title": "Channel",
                "content": "This field determines which operating frequency will be used. It is not necessary to change the wireless channel unless you notice interference problems with another nearby access point. If you select auto, then AP will choose the best channel automatically."
            }, {
                "type": "name",
                "title": "Transmit Power",
                "content": "Here you can specify the transmit power of the Router. You can select High, Middle or Low which you would like. High is the default setting and is recommended. "
            }, {
                "type": "paragraph",
                "content": "Click Save to <strong>save</strong> and apply the config."
            }]
        },
        "DISK_SETTING": {
            "TITLE": "Disk Settings Help",
            "CONTENT": [{
                "type": "name",
                "title": "Refresh",
                "content": "To update this page and to show the current connected wireless stations, click on the Refresh button. "
            }, {
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Set up your Router as the file server:\nPlug the external hard drive or USB flash drive into the router."
            }, {
                "type": "paragraph",
                "content": "Click Scan to find the connected drive."
            }, {
                "type": "paragraph",
                "content": "Click Safely Remove to eject the connected drive."
            }, {
                "type": "paragraph",
                "content": "Check the Active box to enable file sharing."
            }, {
                "type": "paragraph",
                "content": "Uncheck the Active box to disable file sharing."
            }, {
                "type": "paragraph",
                "content": "In this section, you may view the Device Settings like ID, Volume, Capacity, Free Space and Sharing Status."
            }, {
                "type": "paragraph",
                "content": "The Disk Settings page displays all the available removable storage devices and their volume information, such as volume name, capacity and free space. One table shows one removable storage device, and you can set the shared state of each volume here. "
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Click the Scan button search for the USB device that has been attached to the Router."
            }, {
                "type": "name",
                "title": "Safely Remove",
                "content": "Click the Safely Remove button to safely remove the USB storage device that is connected to USB port. This takes the devices offline. It may harm the USB device if you pull it out without clicking Safely Remove button."
            }, {
                "type": "paragraph",
                "content": "Contents in the table are as follows:"
            }, {
                "type": "name",
                "title": "volume",
                "content": "The volume name of the storage drive. Volume 1-8 is mapped to USB Port 1, Volume 9-16 is mapped to USB Port 2."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "The storage capacity of the storage drive."
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "The available space of the storage drive. The available space of the current volume. "
            }, {
                "type": "name",
                "title": "Active",
                "content": "Indicates the sharing status of each storage volume. The shared state of the current volume. Green bulb means sharing, and grey bulb means no sharing. You can change shared state by clicking the light bulb icon. "
            }, {
                "type": "note",
                "title": "Note",
                "content": ["1. The router can automatically scan for a most recent plugged-in USB device.", "2. Aftering clicking Safely Remove, you must re-plug USB device or click Scan to make it found again.", "3. If there is data interaction in the current volume, click Safely Remove may not work.", "4. The shared state of current volume will directly affect shared state settings in Folder Sharing page."]
            }]
        },
        "FOLDER_SHARE": {
            "TITLE": "Folder sharing Help",
            "CONTENT": [{
                "type": "name",
                "title": "Sharing Account:",
                "content": "You can specify the username and password for Network Neighborhood and FTP Server users on this page. Network Neighborhood users can use IE to access files on the USB device. FTP Server users can login to the FTP Server via FTP Clients."
            }, {
                "type": "name",
                "title": "Sharing Account:",
                "content": "System login account \"admin\"  is the DUT default shared account. You can also set a new user account as the shared account and at the same time the system login account cannot be used. Only one shared account could exist under DUT."
            }, {
                "type": "name",
                "title": "Use Login Account",
                "content": "When choosing Use Login Account as shared account, the text boxes below cannot be edited. The usename and the password are the same as that of the login account."
            }, {
                "type": "name",
                "title": "Use New Account",
                "content": "Create a new username and password."
            }, {
                "type": "name",
                "title": "Username",
                "content": "Type the username that you want to give access to the USB drive. The username must be composed of alphanumeric symbols not exceeding 15 characters in length. "
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter the password in the Password field. The password must be composed of alphanumeric symbols not exceeding 15 characters in length. For security purposes, the password for each user account is not displayed. "
            }, {
                "type": "name",
                "title": "Confirm Password",
                "content": "Re-enter the password here. "
            }]
        },
        "PRINT_SERVER": {
            "TITLE": "Print Server",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "Print Server",
                "content": "Indicates the current Enable/Disable status of the Print Server."
            }, {
                "type": "name",
                "title": "Printer Name",
                "content": "Name of printer connected to the router."
            }, {
                "type": "note",
                "title": "Follow the instructions below to set up your print server:",
                "content": ["Step1: Connect the USB printer to the USB port of the router with a USB printer cable.", "Step2:  Install the printer driver on your computer.", "Step3:  Install the TP-LINK USB Printer Controller on your computer. Please run the resource CD or download the TP-LINK USB Printer Controller utility from our website: www.tp-link.com."]
            }]
        },
        "parentCtrl": {
            "TITLE": "Parental Controls",
            "CONTENT": [{
                "type": "paragraph",
                "content": "With Parental Controls, you can block inappropriate, explicit and malicious websites; restrict access by certain times of day (for example, facebook or youtube during homework time); and at the same time protect every device on your home network against malware and phishing through one central control point."
            }, {
                "type": "name",
                "title": "Parental Controls",
                "content": "Toggle On to enable the Parental Control feature. "
            }, {
                "type": "title",
                "content": "Devices Under Parental Controls"
            }, {
                "type": "paragraph",
                "content": "Displays the list of devices under Parental Controls."
            }, {
                "type": "name",
                "title": "Device Name",
                "content": "Displays the name of all connected client devices that are currently under Parental Controls."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "Displays the MAC address of all connected client devices that are currently under Parental Controls."
            }, {
                "type": "name",
                "title": "Internet Access Time",
                "content": "Displays the restriction access time periods."
            }, {
                "type": "name",
                "title": "Description",
                "content": "Displays a brief description of the connected device. It is an optional setting."
            }, {
                "type": "name",
                "title": "Status",
                "content": "Displays the current status (enabled or disabled) of the Parental Controls of the corresponding device."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify or Delete the corresponding device."
            }, {
                "type": "note",
                "title": "<strong>To restrict a new client device</strong>",
                "content": ["Click Add.", "Click View Existing Devices and choose a currently connected device from the Access Devices List; or enter the Device Name and MAC Address manually to add a device that is not connected.", "Click the Internet Access Time icon to specify a time period during which the restriction applies.", "Enter a brief description into the Description field. (Optional)", "Select Enable.", "Click OK to save this entry."]
            }, {
                "type": "paragraph",
                "content": "To modify or delete Parental Controls entry, simply click the Modify icon to edit the information or the Delete icon to remove the corresponding entry."
            }, {
                "type": "paragraph",
                "content": "To delete multiple entries, select all the entries and click Delete above the table."
            }, {
                "type": "title",
                "title": "Content Restriction"
            }, {
                "type": "name",
                "title": "Blacklist",
                "content": "Contains keywords that will be used to block any website access from client devices specified in the Parental Controls list.",
                "children": [{
                    "type": "paragraph",
                    "content": "Click <strong>Add a new keyword</strong> to add a keyword to the blacklist. To delete a keyword, click the (-) icon of the keyword that you wish to delete."
                }]
            }, {
                "type": "name",
                "title": "Whitelist",
                "content": "Contains website addresses that client devices specified in the Parental Controls list are allowed to access.",
                "children": [{
                    "type": "paragraph",
                    "content": "Click <strong>Add a new keyword</strong> to add a website to the whitelist. To delete a website, click the (-) icon of the website that you wish to delete."
                }]
            }, {
                "type": "paragraph",
                "content": "<strong>Note:</strong><br>Keywords can also be domain names, for example, www.mail.google.com or www.facebook.com."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save your configuration."
            }]
        },
        "SECURITY_SETTING": {
            "TITLE": "Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "SPI Firewall",
                "content": "Stateful Packet Inspection (SPI) helps to prevent cyber attacks by tracking more state per session. It validates that the traffic passing through the session conforms to the protocol. SPI Firewall is enabled by factory default. If you want all the computers on the LAN exposed to the outside world, you can disable it. "
            }, {
                "type": "name",
                "title": "DoS Protection",
                "content": " Enable DoS protection. DoS protection is able to detect and prevent attacks from huge amounts of data in a particular IP."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the ICMP packets attacks."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the UDP packets attacks."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Attack Filtering",
                "content": "Detect and prevent from the TCP-SYN packets attacks."
            }, {
                "type": "paragraph",
                "content": "off: no protection; low: low protection, low impact on performance; middle: moderate-intensity protection, a certain impact on performance; high: high-intensity protection, a greater impact on performance."
            }, {
                "type": "name",
                "title": "Ignore Ping Packet From WAN Port",
                "content": "Select this box, and you will not ping the router from WAN port."
            }, {
                "type": "name",
                "title": "Forbid Ping Packet From LAN Port",
                "content": "Select this box, and you will not ping the router from LAN port."
            }, {
                "type": "name",
                "title": "Blocked DoS Host List",
                "content": "It lists the IP address and MAC address of the blocked DoS attack source."
            }]
        },
        "accessControl": {
            "TITLE": "Access Control",
            "CONTENT": [{
                "type": "paragraph",
				/* unable communicate with other devices is not ture*/
                "content": "Access Control is used to allow or block specific computers and other devices from accessing your network. When a device is blocked, it is able to get an IP address from the router, but unable to communicate with the router or connect to the Internet. "
            }, {
                "type": "title",
                "content": "Access Mode"
            }, {
                "type": "name",
                "title": "Blacklist",
                "content": "Only the devices on the Blacklist will be denied access to your network."
            }, {
                "type": "name",
                "title": "Whitelist",
                "content": "Only the devices on the Whitelist will be granted access to your network."
            }, {
                "type": "title",
                "content": "Devices in List"
            }, {
                "type": "note",
                "title": "<strong>To blacklist or whitelist a device</strong>",
                "content": ["Click the Add icon.", "Enter the Device Name.", "Enter the MAC address of the device.", "Click Enable.", "Click OK."]
            }, {
                "type": "paragraph",
                "content": "<strong>To modify or delete a device in the Black/Whitelist</strong><br>In the Black/Whitelist table, click the Edit icon or the Trash icon that corresponds to the device that you wish to modify or delete."
            }, {
                "type": "paragraph",
                "content": "<strong>To delete multiple devices in the Black/Whitelist</strong><br>In the Black/Whitelist table, select all devices that you wish to delete, click Delete above the list."
            }, {
                "type": "title",
                "content": "Devices Online"
            }, {
                "type": "name",
                "title": "Device Name",
                "content": "Displays the name of the connected device."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "Displays the IP address of the connected device."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "Displays the MAC address of the connected device."
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "Displays the connection type of the connected device. "
            }, {
                "type": "paragraph",
				/*notes error: click block can not add to white list, but delete from white list*/ 
                "content": "<strong>To block multiple devices</strong><br>In the Devices Online table, select all devices that you wish to block, click Block above the table. The device will be automatically added to the Devices in Blacklist or deleted from the Devices in Whitelist."
            }]
        },
        arpBind: {
            TITLE: "Settings",
            CONTENT: [
                {
                    type: "paragraph",
                    content: "IP & MAC Binding (also known as ARP Binding) is useful for controlling access of a specific computer in the LAN by binding the IP address and the MAC address of the device together. IP & MAC binding also prevents other devices from using a specific IP address."
                },
                {
                    type: "name",
                    title: "IP & MAC Binding",
                    content: "Toggle On to enable IP & MAC Binding feature."
                },
                {
                    type: "title",
                    title: "Binding List"
                },
                {
                    type: "note",
                    title: "<strong>To set up a device with ARP binding</strong>",
                    content: [
                        "Click Add.",
                        "Enter the MAC Address of the device.",
                        "Enter an IP Address that you want bind to the above MAC address.",
                        "Select Enable.",
                        "Click OK."
                    ]
                },
                {
                    type: "paragraph",
                    content: "<strong>To modify or delete an entry</strong><br>In the Binding List, click the Edit icon or the Trash icon that corresponds to the entry you wish to modify or delete."
                },
                {
                    type: "paragraph",
                    content: "<strong>To delete multiple entries</strong><br>In the Binding List, select all the entries that you wish to delete, click Delete above the table."
                },
                {
                    type: "title",
                    title: "ARP List"
                },
                {
                    type: "paragraph",
                    content: "Displays the MAC and IP addresses of the currently connected devices."
                },
                {
                    type: "name",
                    title: "Device Name",
                    content: "Displays the name of the connected device."
                },
                {
                    type: "name",
                    title: "MAC Address",
                    content: "Displays the MAC address of the connected device."
                },
                {
                    type: "name",
                    title: "IP Address",
                    content: "Displays the IP address allocated to the connected device."
                },
                {
                    type: "name",
                    title: "Bound",
                    content: "Indicates whether the MAC and IP addresses are bound or not."
                },
                {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Delete the corresponding entry from the list."
                },
                {
                    type: "paragraph",
                    content: "<strong>Note: </strong>You cannot bind the same IP address to more than one MAC address."
                },
                {
                    type: "paragraph",
                    content: "<strong>To bind multiple devices</strong><br>In the ARP List, select all the devices that you wish to bind their IP address to their MAC address, click Bind above the table."
                }
            ]
        },
        "IPMAC_BIND_SETTING": {
            "TITLE": "Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "ARP Binding is useful for controlling access of specific computers in the LAN. "
            }, {
                "type": "name",
                "title": "Enable ARP Binding",
                "content": "Turing on/off the ARP binding function."
            }]
        },
        "IPMAC_BIND_ARP": {
            "TITLE": "ARP List Help:",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can see IP addresses on the LAN and their corresponding MAC addresses by viewing the ARP list. Also, you can use the icons in Modify column to manage the list."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The assigned IP address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Bound",
                "content": "The MAC address of a controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "These icons are for binding or deleting an item.",
                "children": [{
                    "type": "name",
                    "title": "(Bind)",
                    "content": "Bind the item and Load it to the Binding list."
                }, {
                    "type": "name",
                    "title": "(Delete)",
                    "content": "Delete the item from the list."
                }]
            }, {
                "type": "name",
                "title": "Note",
                "connnector": ":",
                "content": "An item can not be bound and loaded to the Binding list if the IP address of the item has been bound before. Bind button will diabled as well."
            }]
        },
        "IPMAC_BIND_LIST": {
            "TITLE": "Binding List Help:",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can add new IP&MAC binding item, and other operation: modify, delete, enable etc."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of the controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "IP Address",
                "content": "The assigned IP address of the controlled computer in the LAN."
            }, {
                "type": "name",
                "title": "Description",
                "content": "Description of the binding item."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Click this buttonï¼ˆå›¾æ ‡ï¼‰ to enable ARP binding for a specific device or to cancel binding."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Click this buttonï¼ˆå›¾æ ‡ï¼‰ to enable ARP binding for a specific device or to cancel binding."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "To modify or delete an existing entry."
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click Add button to add a new entry to the table."
            }, {
                "type": "name",
                "title": "Example",
                "content": "If you want to use binding to assign 192.168.1.100 to PC A (MAC: 62-6C-6D-2E-07-BE) and to prevent other PCs from using this address. First, enable the \"ARP Binding\" and then add a new item in the binding table, so that the table resembles the one below."
            }, {
                "type": "paragraph",
                "content": "<table><tr><th>ID</th><th>MAC Address</th><th>IP Address</th><th>Description</th><th>Enable</th></tr>"
            }, {
                "type": "paragraph",
                "content": "<table><tr><td>1</td><td>62-6C-6D-2E-07-BE</td>td>192.168.0.100</td><td>\"example\"</td><<td>Bound</td></tr></table>"
            }]
        },
        "TIME_SETTING_TOTAL": {
            "TITLE": "Time Settings Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to set the time and the daylight saving. "
            }]
        },
        "TIME_SETTING": {
            "TITLE": "Time Settings",
            "CONTENT": [{
                "type": "note",
                "title": "To set time manually:",
                "content": ["1. Select your local time zone from this pull-down list. ", "2. Select your date.", "3. Configure your time.", "4. Click <strong>Save</strong> button."]
            }, {
                "type": "note",
                "title": "For automatic time synchronization: ",
                "content": ["1. Click <strong>Get GMT</strong> button to update the time from the Internet with the pre-defined servers.", "2. Click <strong>Save</strong> button."]
            }, {
                "type": "note",
                "title": "OR ",
                "content": ["1. Enter the IP address or domain name of your desired server in NTP Server field first.", "2. Click <strong>Get GMT</strong> button to update the time from Internet with the entered server.", "3. Click <strong>Save</strong> button."]
            }]
        },
        "TIME_SETTING_DAYLIGHT": {
            "TITLE": "Daylight Saving",
            "CONTENT": [{
                "type": "note",
                "title": "To set up daylight saving: ",
                "content": ["1. Select the Enable Daylight Saving checkbox to enable daylight saving function.", "2. Select the correct Start time and End time of daylight saving range.", "3. Click Save."]
            }, {
                "type": "note",
                "title": "Note: ",
                "content": ["1. Some time-based functions such as firewall will not work if time is not set. Therefore, it is important to configure time settings as soon as you successfully login to the Router.", "2. The time will be lost if the Router is turned off. ", "3. The Router will automatically obtain GMT from the Internet if it is configured accordingly.", "4. In daylight saving configuration, start time and end time shall be within one year and start time shall be earlier than end time."]
            }]
        },
        "DIGNOSTIC": {
            "TITLE": "Diagnostic Tools",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Router provides two diagnostic tools, ping and trace."
            }, {
                "type": "note",
                "title": "To diagnose using Ping tool:",
                "content": ["1. Check the radio button before ping.", "2. Enter the IP address or domain name.", "3. Click the drop-down icon before Advanced to display Ping Count, Ping Packet size and Ping Timeout. Keep these parameters at their default values or configure them according to your needs.", "4. Click Start button to begin the dianosing."]
            }, {
                "type": "paragraph",
                "content": "OR"
            }, {
                "type": "note",
                "title": "To diagnose using Traceroute tool:",
                "content": ["1. Check the radio button before traceroute.", "2. Enter the IP address or domain name.", "3. Click the drop-down icon before Advanced to display Traceroute Max TTL. Keep it at its default value or configure it according to your need.", "4. Click Start button to begin the dianosing."]
            }]
        },
        "FIRMWARE": {
            "TITLE": "Firmware Upgrade",
            "CONTENT": [{
                "type": "note",
                "title": "To upgrade the firmware:",
                "content": ["1. Click <strong>Browse?/strong> to locate and select the new firmware file.", "2. Click <strong>Upgrade</strong> button."]
            }, {
                "type": "paragraph",
                "content": "Note: The firmware upgrade process takes a couple of minutes. Please do not power off the router until the process finishes. "
            }]
        },
        "BACKUP": {
            "TITLE": "Backup & Restore help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to backup your current configuration, restore your configuration to a previously saved one, or reset your configuration to factory default settings."
            }, {
                "type": "paragraph",
                "content": "To backup your current settings:"
            }, {
                "type": "name",
                "title": "Restore",
                "content": "To restore your previously saved settings."
            }, {
                "type": "note",
                "content": ["1. Click the Browse?button to locate and select the file you have backuped.", "2. Click the Restore button to begin the restore process."]
            }, {
                "type": "name",
                "title": "Factory restore",
                "content": "To reset your router to its factory settings."
            }, {
                "type": "paragraph",
                "content": "Click the Factory Restore button to reset your router to its factory settings."
            }, {
                "type": "note",
                "content": ["1. Factory Restore will erase any settings that you have configured in the router.", "2. Both the backup and restore process take a couple of minutes. Please do not power off the router until the process finishes."]
            }]
        },
        "ADMIN_ACCOUNT": {
            "TITLE": "Account Management Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to change your login username and password, and set email for password recovery."
            }, {
                "type": "name",
                "title": "Old User Name",
                "content": "Type the old uer name."
            }, {
                "type": "name",
                "title": "Old Password",
                "content": "Type the old password."
            }, {
                "type": "name",
                "title": "New User Name",
                "content": "Type the new user name."
            }, {
                "type": "name",
                "title": "New Password",
                "content": "Type the new password."
            }, {
                "type": "name",
                "title": "Confirm New Password",
                "content": "Type the new password again. "
            }, {
                "type": "name",
                "title": "Enable Password Recovery",
                "content": "Password recovery helps to get back the uer name and password if they are forgotten. It is recommended that you enable password recovery if you change the user name or password for the router. "
            }, {
                "type": "name",
                "title": "From",
                "content": "Enter an email address used for sending email."
            }, {
                "type": "name",
                "title": "To",
                "content": "Enter an email address used for receiving email. "
            }, {
                "type": "name",
                "title": "SMTP Server Address",
                "content": "Enter the address of SMTP server. Through this server, the router can send the account message from the \"From\" email to the \"To\" email."
            }, {
                "type": "name",
                "title": "Enable Authenticaiton",
                "content": "If your \"From\" email requires authentication, please select the <strong>Enable Authentication</strong> check box. Fill the <strong>Username</strong> and <strong>Password</strong> fields."
            }]
        },
        "ADMIN_LOCAL": {
            "TITLE": "Local MAC Authentication Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "This page allows you to configure rules to limit devices on the LAN to access the web server"
            }, {
                "type": "name",
                "title": "Access the Web Server",
                "content": "The router provides two limit options, \"All the devices on the LAN\" and \"Only the devices in the list\". \"Only the devices in the list\"  requires you to configure the limit rule first."
            }, {
                "type": "paragraph",
                "content": "If \"Only the devices in the list\" is selected, you can see and configure the limit rule."
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click this to add a new limit rule"
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Click this to delete the rules selected."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC address of the limited device. "
            }, {
                "type": "name",
                "title": "Description",
                "content": "The description of the rule."
            }, {
                "type": "name",
                "title": "Enbale",
                "content": "means the corresponding rule is taking effect while     means the corresponding rule is taking no effect."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Allows you to modify (   ) or delete (   ) the corresponding rule."
            }, {
                "type": "note",
                "title": "To add or modify a rule:",
                "content": ["1. Click the    or    icon.", "2. Enter the MAC address or use the View Existing Devices button to select an existing one.", "3. Create a description for the rule.", "4. Select or diselect the checkbox before Enable this Entry.", "5. Click the OK button."]
            }]
        },
        "ADMIN_REMOTE": {
            "TITLE": "Remote Management Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The remote management feature lets you access your router over the Internet to view or change its settings. "
            }, {
                "type": "name",
                "title": "Web Management Port",
                "content": "Specify the port number for accessing the web management interface. Normal web browser access uses the standard HTTP service port 80. For greater security, enter a custom port number for the remote web management interface. Choose a number from 1024 to 65535, but do not use the number of any common service port. The default is 8080, which is a common alternate for HTTP."
            }, {
                "type": "name",
                "title": "Remote Management IP Address",
                "content": "specify the external IP addresses to be allowed to access the router. If \"255.255.255.255\" is entered, it means that any IP address on the Internet is allowed to access the router."
            }]
        },
        "SYSTEM_LOG": {
            "TITLE": "System Log Help",
            "CONTENT": [{
                "type": "name",
                "title": "Type",
                "content": "Select the type of the system log to display."
            }, {
                "type": "name",
                "title": "Level",
                "content": "Select the level of the system log to display."
            }, {
                "type": "name",
                "title": "Refresh",
                "content": "Click this icon to refresh the log."
            }, {
                "type": "name",
                "title": "Delete All",
                "content": "Click this icon to delete all logs."
            }, {
                "type": "name",
                "title": "Mail Settings",
                "content": "Click this button to configure the email for sending and reciving logs."
            }, {
                "type": "name",
                "title": "From",
                "content": "Enter the email for sending logs."
            }, {
                "type": "name",
                "title": "To",
                "content": "Enter the email for recving logs."
            }, {
                "type": "name",
                "title": "SMTP sever",
                "content": "Enter the address of SMTP server."
            }, {
                "type": "name",
                "title": "Enable authentication",
                "content": "Select or diselect the checkbox to enable or disable authentication."
            }, {
                "type": "name",
                "title": "User name",
                "content": "Enter the user name for logging in the SMTP server."
            }, {
                "type": "name",
                "title": "Passwrod",
                "content": "Enter the password for logging in the SMTP server."
            }, {
                "type": "name",
                "title": "Confirm password",
                "content": "Enter the password again."
            }, {
                "type": "name",
                "title": "Enable auto mail",
                "content": "If this feature is enabled, the system logs will be emailed automatically and periodically."
            }, {
                "type": "name",
                "title": "Everyday log at",
                "content": "If this feature is enabled, the system logs will be emailed automatically and periodically."
            }, {
                "type": "name",
                "title": "Log every",
                "content": "Select to automatically send email with an interval of several hours, and the range is 1-23. "
            }, {
                "type": "name",
                "title": "Mail log",
                "content": "Click this button to email the log files. "
            }, {
                "type": "name",
                "title": "Save log",
                "content": "Click this button to download the log files to your local computer."
            }]
        },
        "TRAFFIC_STATISTIC_TOTAL": {
            "TITLE": "Traffic Statistics Help",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Traffic Statistics page shows the network traffic of each PC on the LAN, including total traffic and the value of the last Packets Statistic interval in seconds."
            }]
        },
        "TRAFFIC_STATISTIC": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "Enable Traffic Statistics",
                "content": "The default value is Off. To enable it, click On button. If it is disabled, traffic statistics information will not be displayed."
            }]
        },
        "TRAFFIC_STATISTIC_LIST": {
            "TITLE": "Traffic Statistics List",
            "CONTENT": [{
                "type": "name",
                "title": "IP Address/MAC Address",
                "content": "The IP Address and MAC address are displayed with related statistics."
            }, {
                "type": "name",
                "title": "Total Packets",
                "content": "The total number of packets received and transmitted by the router."
            }, {
                "type": "name",
                "title": "Total Bytes",
                "content": "The total number of bytes received and transmitted by the router.s"
            }, {
                "type": "name",
                "title": "Current Packets",
                "content": "The total number of packets received and transmitted in the last Packets Statistics interval seconds."
            }, {
                "type": "name",
                "title": "Current Bytes",
                "content": "The total number of bytes received and transmitted in the last Packets Statistics interval seconds."
            }, {
                "type": "name",
                "title": "Current ICMP Tx",
                "content": "The number of ICMP packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Current UDP Tx",
                "content": "The number of UDP packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Current SYN Tx",
                "content": "The number of TCP SYN packets transmitted to the WAN per second at the specified Packets Statistics interval. It is shown as \"current transmitting rate / Max transmitting rate\"."
            }, {
                "type": "name",
                "title": "Modify",
                "content": ""
            }, {
                "type": "name",
                "title": "Reset",
                "content": "Reset the values of the entry to zero."
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Delete the existing entry in the table."
            }, {
                "type": "paragraph",
                "content": "Click Refresh button to refresh the page."
            }, {
                "type": "paragraph",
                "content": "Click Reset All button to reset the values of all entries to zero."
            }, {
                "type": "paragraph",
                "content": "Click Delete All button to delete all entries in the table."
            }]
        },
        "SYSTEM_PARA_WIRELESS": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "Beacon Interval",
                "content": "The beacons are the packets sent by the Router to synchronize a wireless network. Beacon Interval value determines the time interval of the beacons. You can specify a value between 40-1000 milliseconds. The default value is 100. "
            }, {
                "type": "name",
                "title": "RTS Threshold",
                "content": "Here you can specify the RTS (Request to Send) Threshold. If the packet is larger than the specified RTS Threshold size, the Router will send RTS frames to a particular receiving station and negotiate the sending of a data frame. The default value is 2346. "
            }, {
                "type": "name",
                "title": "Fragmentation Threshold",
                "content": "This value is the maximum size determining whether packets will be fragmented. Setting the Fragmentation Threshold too low may result in poor network performance because of excessive packets. 2346 is the default setting and is recommended. "
            }, {
                "type": "name",
                "title": "DTIM Interval",
                "content": "This value determines the interval of the Delivery Traffic Indication Message (DTIM). You can specify the value between 1-15 Beacon Intervals. The default value is 1, which indicates the DTIM Interval is the same as Beacon Interval."
            }, {
                "type": "name",
                "title": "Group Key Update Period",
                "content": "Specify the group key update interval in seconds. The value can be either 0 or at least 30. Enter 0 to disable the update."
            }, {
                "type": "name",
                "title": "Enable WMM",
                "content": "The beacons are the packets sent by the Router to synchronize a wireless network. Beacon Interval value determines the time interval of the beacons. You can specify a value between 40-1000 milliseconds. The default value is 100. "
            }, {
                "type": "name",
                "title": "Enable Short GI",
                "content": "This function is recommended for increasing the data capacity by reducing the guard interval time. "
            }, {
                "type": "name",
                "title": "Enable AP Isolation",
                "content": "Isolate all connected wireless stations so that wireless stations cannot access each other through WLAN. This function will be disabled if WDS/Bridge is enabled."
            }, {
                "type": "name",
                "title": "WDS Bridging",
                "content": "You can select this to enable WDS Bridging. With this function, the router can bridge two or more Wlans."
            }, {
                "type": "name",
                "title": "SSID",
                "content": "The SSID of the AP your router is going to connect to as a client. You can also use the survey function to select the SSID to join."
            }, {
                "type": "name",
                "title": "Survey",
                "content": "Click this button, and you can search the AP which runs in the current channel."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "The MAC Address of the AP your router is going to connect to as a client. You can also use the survey function to select the MAC Address to join."
            }, {
                "type": "name",
                "title": "Security",
                "content": "You can select No/ WPA/WPA2-Personal / WEP"
            }, {
                "type": "name",
                "title": "No",
                "content": "The wireless security function can be enabled or disabled. If disabled, the wireless  stations will be able to connect the Router without encryption. It is strongly recommended you that choose one of following options to enable security."
            }, {
                "type": "name",
                "title": "WPA-PSK/WPA2-PSK",
                "content": "Select WPA based on pre-shared passphrase."
            }, {
                "type": "name",
                "title": "Password",
                "content": "You can enter ASCII or Hexadecimal characters. For Hexadecimal, the length should be between 8 and 64 characters; for ASCII, the length should be between 8 and 63 characters."
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter the password for WEP."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuraion."
            }]
        },
        "SYSTEM_PARA_WPS": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "name",
                "title": "WPS",
                "content": "Enable or disable the function."
            }, {
                "type": "paragraph",
                "content": "Click Save to apply the configuration."
            }]
        },
        "wirelessBasic": {
            "TITLE": "Wireless Settings",
            "CONTENT": [
            {/*
                "type": "name",
                "title": "Smart Connect",
                "content": "Select this checkbox to enable smart connect . This function helps devices run faster by assigning them to best wireless bands based on actual conditions to balance network demands."
            }, {*/
                "type": "name",
                "title": "Wireless 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "Select this checkbox to enable the 2.4GHz | 5GHz-1 | 5GHz-2 wireless radio frequency."
            }, {
                "type": "name",
                "title": "Wireless Network Name (SSID)",
                "content": "You can leave the default wireless network name (SSID) as it is or enter a new name (up to 32 characters). This field is case-sensitive."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "Select this checkbox if you want to hide the 2.4GHz | 5GHz-1 | 5GHz-2 network name (SSID) from the Wi-Fi network list."
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter a wireless password between 8 and 63 ASCII characters, or between 8 and 64 hexadecimal characters. This field is case-sensitive."
            }]
        },
        "wlGuestDulBandAdv": {
            "TITLE": "Guest Network",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Guest Network allows you to set up a separate network with a separate wireless network name (SSID) and password that guests can use to access your wireless network."
            }, {
                "type": "title",
                "content": "Settings"
            }, {
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "Select this checkbox to allow the wireless devices on the Guest Network to see each other."
            }, {
                "type": "name",
                "title": "Allow guests to access my local network",
                "content": "Select this checkbox to allow the wireless devices on the Guest Network to access your local network shares and printers."
            }, {
               /* "type": "name",
                "title": "Allow guests to access my USB storage sharing",
                "content": ""
            }, {
                "type": "name",
                "title": "Enable guest network bandwidth control",
                "content": ""
            }, {*/
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }, {
                "type": "title",
                "content": "Wireless"
            }, {
                "type": "name",
                "title": "Enable Wireless Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "Select this checkbox to enable the  Wireless 2.4GHz | 5GHz-1 | 5GHz-2 Guest Network feature."
            }, {
                "type": "name",
                "title": "Wireless Network Name (SSID)",
                "content": "Either use the default Guest SSID or create a new name (up to 32 characters)."
            }, {
                /*"type": "name",
                "title": "Hide SSID",
                "content": "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
            }, {*/
                "type": "name",
                "title": "Security",
                "content": "When you choose never to update the password, select one of the following security options:",
                "children": [{
                    "type": "name",
                    "title": "No Security",
                    "content": "Select this option to disable the wireless security. It is highly recommended that you enable the wireless security to protect your Guest Network from unauthorized access."
                }, {
                    "type": "name",
                    "title": "WPA/WPA2 - Personal",
                    "content": "Select this option to enable the standard authentication method based on a Pre-shared Key (PSK), also called passphrase. If selected, configure the following.",
                    "children": [{
                        "type": "name",
                        "title": "Version",
                        "content": "Select a security version for your Guest Network.",
                        "children": [{
                            "type": "name",
                            "title": "Auto",
                            "content": "This option supports multiple implementation of the WPA (Wi-Fi Protected Access) standard, such as WPA and WPA2."
                        }, {
                            "type": "name",
                            "title": "WPA2-PSK",
                            "content": "This option support AES encryption that provides a better level of security than WPA2-PSK and is recommended."
                        }]
                    }, {
                        "type": "name",
                        "title": "Encryption",
                        "content": "Select a security encryption type: TKIP (Temporal Key Integrity Protocol), AES (Advanced Encryption Standard), or Auto (for both TKIP and AES). It is NOT recommended to use the TKIP encryption if the router operates in 802.11n mode, because TKIP is not supported by 802.11n specification. If TKIP is selected, WPS function will be disabled."
                    }]
                }]
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter a password between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
            }, {
                "type": "paragraph",
                "content": "Click <strong>Save</strong> to save all your settings."
            }]
        },
        "wlGuestDulBandBasic": {
            "TITLE": "Guest Network",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Guest Network allows you to set up a separate network with a separate wireless network name (SSID) and password that guests can use to access your wireless network."
            }, {
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "Select this checkbox to allow the wireless devices on the Guest Network to see each other."
            }, {
                "type": "name",
                "title": "Allow guests to access my local network",
                "content": "Select this checkbox to allow the wireless devices on the Guest Network to access your local network shares and printers."
            }, {
                "type": "name",
                "title": "Enable Wireless Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "Select this checkbox to enable the  Wireless 2.4GHz | 5GHz-1 | 5GHz-2 Guest Network feature."
            }, {
                "type": "name",
                "title": "Wireless Network Name (SSID)",
                "content": "Either use the default Guest SSID or create a new name (up to 32 characters)."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "Select this checkbox if you want to hide the Guest SSID from the Wi-Fi network list."
            }, {
                "type": "name",
                "title": "Password",
                "content": "Enter a password between 8 and 63 ASCII characters or between 8 and 64 hexadecimal characters (0-9, a-f, A-F)."
            }]
        },
        "BASIC_FILE_SHARE_DISK": {
            "TITLE": "Disk Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Configure the USB drive connected to the Router"
            }, {
                "type": "paragraph",
                "content": "Plug the external hard drive or USB flash drive into the router."
            }, {
                "type": "paragraph",
                "content": "Click Scan to find the connected drive. "
            }, {
                "type": "paragraph",
                "content": "Click Safely Remove to eject the connected drive. "
            }, {
                "type": "paragraph",
                "content": "Check the Active box to enable file sharing."
            }, {
                "type": "paragraph",
                "content": "Uncheck the Active box to disable file sharing."
            }, {
                "type": "paragraph",
                "content": "In this section, you may view the Device Settings like ID, Volume, Capacity, Free Space and Sharing Status."
            }, {
                "type": "paragraph",
                "content": "The Disk Settings page displays all the available removable storage devices  and their volume information, such as volume name, capacity and  free space. One table shows one  removable storage device, and you can set the shared state of each volume here."
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Click the Scan button search for the USB device that has been attached to the Router. Safely Remove - Click the Safely Remove button to safely remove the USB storage device that is connected to USB port. This takes the devices offline. It may harm the USB device if you pull it out without clicking Safely Remove button."
            }, {
                "type": "paragraph",
                "content": "Contents in the table are as follows:"
            }, {
                "type": "name",
                "title": "volume",
                "content": "The volume name of the storage drive. Volume 1-8 is mapped to USB Port 1, Volume 9-16 is mapped to USB Port 2."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "The storage capacity of the storage drive. "
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "The available space of the storage drive. "
            }, {
                "type": "name",
                "title": "Active",
                "content": "Indicates the sharing status of each storage volume. The shared state of the current volume. Green bulb means sharing, and grey bulb means no sharing. You can change shared state by clicking the light bulb icon. "
            }, {
                "type": "note",
                "title": "Note:",
                "content": ["1. The router can automatically scan for a most recent plugged-in USB device.", "2. Aftering clicking Safely Remove, you must re-plug USB device or click Scan to make it found again.", "3. If there is data interaction in the current volume, click Safely Remove may not work.", "4. The shared state of current volume will directly affect shared state settings in Folder Sharing page."]
            }]
        },
        "BASIC_FILE_SHARE_SETTING": {
            "TITLE": "Sharing Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Here as a shared service master switch of Network Neighborhood (samba) and FTP Server (ftp, ftp (via Internet)), you can close some shared services (like ftp service), set a new shared server name, modify the access port for some services (like FTP (Via Internet)) and etc. Please click Save to apply all the settings."
            }, {
                "type": "name",
                "title": "Network/Media Server Name",
                "content": "The name of the shared server. Modifying here will affect Network Neighborhood (samba) shared address. (Note: Network Connection is enabled by default)"
            }, {
                "type": "name",
                "title": "Sharing Mode",
                "content": "Select to share all or specific folders"
            }, {
                "type": "name",
                "title": "Share All",
                "content": "Share all active folders. Select the Login Required check box to require users to log in with a username and password."
            }, {
                "type": "name",
                "title": "Login Required",
                "content": "When Login Required is checked, users need a password to access the shared directory;  when Login Required  is not checked, no password is needed. (Note: You can create a new login in the Advanced USB Settings page. Otherwise, the username and password will be the same as your Web Management login info.)"
            }, {
                "type": "name",
                "title": "Share Selected Folders",
                "content": "You may select which folders to share on the network. "
            }, {
                "type": "title",
                "title": "Sharing Content"
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click to add a new Share Folder."
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Click to delete selected Share Folders."
            }, {
                "type": "paragraph",
                "content": "The contents of the table:"
            }, {
                "type": "name",
                "title": "Share Name",
                "content": "Name of the shared folder.  "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Path to the folder is determined by where the file is saved. The real full path of the specified folder. "
            }, {
                "type": "name",
                "title": "Media Sharing",
                "content": "Enable/disable UPnP device access to a folder. "
            }, {
                "type": "name",
                "title": "Volume",
                "content": "The label name of the volume where shared directory is put. "
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Status of this entry. Green bulb suggests taking effect, and grey bulb suggests not. You can change the status by clicking the bulb."
            }, {
                "type": "paragraph",
                "content": "To modify or delete this entry by clicking the corresponding icon. "
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Click <strong>Add</strong> or <strong>Modify</strong> icon, and a new window will pop up."
            }, {
                "type": "name",
                "title": "Volume",
                "content": "From the drop-down list, select a volume to share. "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Path to the folder is determined by where the file is saved. The real full path of the specified folder. "
            }, {
                "type": "name",
                "title": "Share Name",
                "content": "Name of the shared folder. You can customize it."
            }, {
                "type": "name",
                "title": "Allow Guest Network Access",
                "content": " Select the check box to allow the Guest Network to have access to the shared folder."
            }, {
                "type": "name",
                "title": "Login Required",
                "content": "Selecting the check box requires users to log in with a username and password. (Note: You can create a new login in the Advanced USB Settings page. Otherwise, the username and password will be the same as your Web Management login information.)"
            }, {
                "type": "name",
                "title": "Enable Write Access",
                "content": "Select the check box to allow users to make changes to the folder content."
            }, {
                "type": "name",
                "title": "Enable Media Sharing",
                "content": "Enable UPnP devices (like Digital Media Player) access to the folder."
            }, {
                "type": "note",
                "title": "Note:",
                "content": ["1. The modified settings will take effect within 5 seconds.", "2. The disabled volumes in Disk Settings page will not be shared, and related entries will not be displayed either.", "3. All the settings of shared directories will be deleted when Sharing All box is selected. Please think twice before you make a move."]
            }]
        },
        "BASIC_PRINT": {
            "TITLE": "Print Server",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can configure print server on this page."
            }, {
                "type": "name",
                "title": "Print Server",
                "content": "Indicates the current Enable/Disable status of the Print Server."
            }, {
                "type": "name",
                "title": "Printer Name",
                "content": "Name of printer connected to the router."
            }, {
                "type": "paragraph",
                "content": "Follow the instructions below to set up your print server: "
            }, {
                "type": "paragraph",
                "content": "Step1:Connect the USB printer to the USB port of the router with a USB printer cable. "
            }, {
                "type": "paragraph",
                "title": "",
                "content": "Step2:Install the printer driver on your computer. "
            }, {
                "type": "paragraph",
                "title": "",
                "content": "Step3:Install the TP-LINK USB Printer Controller on your computer. Please run the resource CD or download the TP-LINK USB Printer Controller utility from our website: www.tp-link.com."
            }]
        },
        "BASIC_PAREMTAL_CONTROL": {
            "TITLE": "Parental Controls",
            "CONTENT": [{
                "type": "paragraph",
                "content": "<strong>Parental controls</strong> provides functions of  web filtering for some specified devices. You can configure Parental Controls on this page."
            }, {
                "type": "paragraph",
                "title": "Devices Under Parental Controls:",
                "content": "Click <strong>Add</strong> button to start the configuration."
            }, {
                "type": "name",
                "title": "Device Name",
                "content": "Name the device under parental controls. You can click View Existing Device button to  view the list of equipments that currently access to the router ."
            }, {
                "type": "name",
                "title": "Mac Address",
                "content": "The unique identification for each device in a format of XX-XX-XX-XX-XX-XX."
            }, {
                "type": "name",
                "title": "Internet Access Time",
                "content": "Set the effective time for the controlled device."
            }, {
                "type": "name",
                "title": "Descrption",
                "content": "The description of the controlled device. It is optional to set."
            }, {
                "type": "name",
                "title": "Enable",
                "content": " Selecting the Enable box, the whole configuration will take effect immediately or you need to click the bulb icon to enable this entry. "
            }]
        },
        "BASIC_GUEST_NETWORK": {
            "TITLE": "Guest Network Help",
            "CONTENT": [{
                "type": "name",
                "title": "Guest Network 2.4GHz | 5GHz-1 | 5GHz-2",
                "content": "The Guest Network can be enabled or disabled to allow guest access on a separate network."
            }, {
                "type": "name",
                "title": "Allow guests to see each other",
                "content": "If this check box is selected, anyone who connects to the Guest Network can access each other."
            }, {
                "type": "name",
                "title": "Hide SSID",
                "content": "The Guest Network SSID will be hidden from the Wi-Fi network."
            }, {
                "type": "name",
                "title": "Name(SSID)",
                "content": "Create a custom name (up to 32 characters) for the Guest Network."
            }, {
                "type": "name",
                "title": "Password",
                "content": "8 to 63 characters or 64 hexadecimal digits (case sensitive). Hexadecimal digits includes 0-9, a-f, A-F."
            }]
        },
        "wanBasic": {
            "TITLE": "Internet",
            "CONTENT": [{
                "type": "name",
                "title": "Auto Detect",
                "content": "Click this button to have the router automatically detect your current Internet connection type."
            }, {
                "type": "paragraph",
                "title": "Note",
                "content": "If you are not sure which Internet connection type you have, use the Auto Detect function or contact your ISP for assistance."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Static IP"
            }, {
                "type": "name",
                "title": "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                "content": "Enter the information provided by your ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Dynamic IP"
            }, {
                "type": "name",
                "title": "DO NOT Clone MAC Address/Clone Current Computer MAC Address",
                "content": "Select whether to clone your MAC address or not, according to your ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: PPPoE"
            }, {
                "type": "name",
                "title": "Username/Password",
                "content": "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "title",
                "title": "Internet Connection Type: L2TP/PPTP"
            }, {
                "type": "name",
                "title": "Username/Password",
                "content": "Enter the username and password provided by your ISP. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Secondary Connection (Dynamic IP or Static IP)",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": "Select if the IP address and Subnet Mask are assigned automatically by the ISP."
                }, {
                    "type": "name",
                    "title": "Static IP",
                    "content": " Select if the IP address, Subnet Mask, Gateway, and DNS addresses are provided by the ISP, and enter these information into the corresponding fields."
                }]
            }, {
                "type": "name",
                "title": "VPN Server IP/Domain Name",
                "content": "Enter the VPN Server IP Address or Domain Name provided by your ISP."
            }],
            "CONTENT_DSL": [{
                "type": "title",
                "content": "DSL"
            }, {
                "type": "name",
                "title": "ISP List",
                "content": ""
            }, {
                "type": "name",
                "title": "DSL Modulation Type",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "VDSL",
                    "content": ""
                }, {
                    "type": "name",
                    "title": "ADSL",
                    "content": "",
                    "children": [{
                        "type": "name",
                        "title": "VCI",
                        "content": ""
                    }, {
                        "type": "name",
                        "title": "VPI",
                        "content": ""
                    }]
                }]
            }, {
                "type": "name",
                "title": "VLAN ID",
                "content": ""
            }, {
                "type": "name",
                "title": "Connection Type",
                "content": "",
                "children": [{
                    "type": "name",
                    "title": "Static IP",
                    "content": ""
                }, {
                    "type": "name",
                    "title": "Dynamic IP",
                    "content": ""
                }, {
                    "type": "name",
                    "title": "PPPoE",
                    "content": ""
                }, {
                    "type": "name",
                    "title": "PPPoA",
                    "content": ""
                }, {
                    "type": "name",
                    "title": "IPoA",
                    "content": ""
                }]
            }]
        },
        "usbManage": {
            "TITLE": "Device Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Device Settings page displays related information of all the USB storage device connected via the USB port."
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Usually, the router automatically detects any newly attached device. If not, click this button scan for any new connected device and refresh the page with the updated information."
            }, {
                "type": "name",
                "title": "Volume Name",
                "content": "Displays the name of the USB volume."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "Displays the total storage capacity of the USB."
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "Displays the current available free storage space."
            }, {
                "type": "name",
                "title": "Safely Remove",
                "content": "Click this button to safely unmount the USB storage device before physically disconnecting it from the router. Please note that the Safely Remove button only appears when there is a USB storage device connected to the router, and you will not be able to unmount the USB device while the current volume is busy."
            }, {
                "type": "name",
                "title": "Active",
                "content": "This bulb only appears when there is a USB storage device connected to the router. Delight the bulb to enable file sharing of the USB device."
            }, {
                "type": "title",
                "content": "Sharing Settings"
            }, {
                "type": "name",
                "title": "Network/Media Server Name",
                "content": "Displays the name used to access the connected USB storage device."
            }, {
                "type": "title",
                "content": "Folder Sharing"
            }, {
                "type": "name",
                "title": "Share All",
                "content": "Toggle On to share all the files and folders or Off to only share the selected folders."
            }, {
                "type": "name",
                "title": "Enable Authentication",
                "content": "It is strongly recommended to enable authentication to require users to enter a valid username and password to access the sharing folders."
            }, {
                "type": "name",
                "title": "Folder Name",
                "content": "Displays the name of the shared folder. "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Displays the path to the shared folder. "
            }, {
                "type": "name",
                "title": "Media Sharing",
                "content": "Indicates whether the shared folder is allowed for media sharing or not."
            }, {
                "type": "name",
                "title": "Volume Name",
                "content": "Displays the name of the shared volume."
            }, {
                "type": "name",
                "title": "Status",
                "content": "Displays the status of the shared folder by the light bulb indicator."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify and Delete the corresponding shared folder."
            }, {
                "type": "name",
                "title": "Add",
                "content": "Click this button to create a new entry."
            }, {
                "type": "name",
                "title": "Delete",
                "content": "Click this button to remove the selected entry from the table. "
            }, {
                "type": "name",
                "title": "Browse",
                "content": "Click to search for a shared folder."
            }, {
                "type": "name",
                "title": "Enable Authentication",
                "content": "Select to require users to access the shared folders with a valid username and password."
            }, {
                "type": "name",
                "title": "Enable Write Access",
                "content": "Select to allow users to make changes to the folder content."
            }, {
                "type": "name",
                "title": "Enable Media Sharing",
                "content": "Select to enable media sharing."
            }]
        },
        "printSrv": {
            "TITLE": "Print Server",
            "CONTENT": [{
                "type": "name",
                "title": "Enable Print Server",
                "content": "Toggle On to enable the print server function."
            }, {
                "type": "name",
                "title": "Printer Name",
                "content": "Displays the name of your printer connected to the router."
            }, {
                "type": "note",
                "title": "To set up a Print Server that can be used across your network",
                "content": ["Connect a USB printer to the USB port of the router via a USB cable.", "Install the printer driver on your computer. Refer to the computer manufacturerâ€™s manuals for instructions.", "Install the TP-LINK USB Printer Controller Utility either from the Resource CD (for Windows only) or download it (for both Windows and Mac OS X) from TP-LINKâ€™s official website."]
            }]
        },
        "diskSettings": {
            "TITLE": "Device Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Device Settings page displays related information of all the USB storage device connected via the USB port."
            }, {
                "type": "name",
                "title": "Scan",
                "content": "Usually, the router automatically detects any newly attached device. If not, click this button scan for any new connected device and refresh the page with the updated information."
            }, {
                "type": "name",
                "title": "Volume Name",
                "content": "Displays the name of the USB volume."
            }, {
                "type": "name",
                "title": "Capacity",
                "content": "Displays the total storage capacity of the USB."
            }, {
                "type": "name",
                "title": "Free Space",
                "content": "Displays the current available free storage space."
            }, {
                "type": "name",
                "title": "Safely Remove",
                "content": "Click this button to safely unmount the USB storage device before physically disconnecting it from the router. Please note that the Safely Remove button only appears when there is a USB storage device connected to the router, and you will not be able to unmount the USB device while the current volume is busy."
            }, {
                "type": "name",
                "title": "Active",
                "content": "This bulb only appears when there is a USB storage device connected to the router. Delight the bulb to enable file sharing of the USB device."
            }]
        },
        "folderSharing": {
            "TITLE": "Sharing Account",
            "CONTENT": [{
                "type": "name",
                "title": "Account",
                "content": "You can either select to Use Default Account to login to the shared files and folders or Use New Account and enter the following to create a new user account."
            }, {
                "type": "name",
                "title": "Username/Password",
                "content": "Enter an alphanumeric or under line string of up to 15 characters in length. The username must start with an alphabet character. These fields are case-sensitive."
            }, {
                "type": "name",
                "title": "Confirm Password",
                "content": "Re-enter the password to confirm there is no typo. This field is also case-sensitive."
            }, {
                "type": "paragraph",
                "content": "Click Save to save the new user account."
            }, {
                "type": "title",
                "content": "Sharing Settings"
            }, {
                "type": "name",
                "title": "Network/Media Server Name",
                "content": "Displays the name used to access the connected USB storage device."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Select to enable the access method."
            }, {
                "type": "name",
                "title": "Access Method",
                "content": "There are three access methods to allow access to the attached USB storage device. You can choose one or more access methods by selecting the corresponding checkbox.",
                "children": [{
                    "type": "name",
                    "title": "Media Server",
                    "content": "If enabled, users on your network can access the media files on the USB storage device via media player (e.g. Windows Media Player, XBMC, VLC media player...). "
                }, {
                    "type": "name",
                    "title": "Network Neighborhood",
                    "content": "If enabled, users on your network can access the USB storage device using an assigned IP address/domain name(e.g. \\\\192.168.0.1, \\\\tplinkwifi.net), or using the Network/Media Server Name you set (e.g. \\\\Archer_C3200)."
                }, {
                    "type": "name",
                    "title": "FTP",
                    "content": "If enabled, the FTP clients on your local network can access the USB storage device using the assigned IP address, followed by the FTP server's port number (e.g. ftp://192.168.0.1:21)."
                }, {
                    "type": "name",
                    "title": "FTP (Via Internet)",
                    "content": "If enabled, users can remotely access the USB storage drive through FTP over the Internet. This feature supports both downloading and uploading files. To change FTP server's port number, enter a port number and click Save to apply the changes."
                }]
            }, {
                "type": "name",
                "title": "Link",
                "content": "Displays the address used to access the shared USB storage device."
            }, {
                "type": "name",
                "title": "Port",
                "content": "Displays the port number of the FTP server."
            }, {
                "type": "title",
                "content": "Folder Sharing"
            }, {
                "type": "name",
                "title": "Share All",
                "content": "Toggle On to share all the files and folders or Off to only share the selected folders."
            }, {
                "type": "name",
                "title": "Enable Authentication",
                "content": "It is strongly recommended to enable authentication to require users to enter a valid username and password to access the sharing folders."
            }, {
                "type": "name",
                "title": "Folder Name",
                "content": "Displays the name of the shared folder. "
            }, {
                "type": "name",
                "title": "Folder Path",
                "content": "Displays the path to the shared folder. "
            }, {
                "type": "name",
                "title": "Media Sharing",
                "content": "Indicates whether the shared folder is allowed for media sharing or not."
            }, {
                "type": "name",
                "title": "Volume",
                "content": "Displays the name of the shared volume."
            }, {
                "type": "name",
                "title": "Status",
                "content": "Displays the status of the shared folder by the light bulb indicator."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify and Delete the corresponding shared folder."
            }, {
                "type": "name",
                "title": "Browse",
                "content": "Click to search for a shared folder."
            }, {
                "type": "name",
                "title": "Enable Authentication",
                "content": "Select to require users to access the shared folders with a valid username and password."
            }, {
                "type": "name",
                "title": "Enable Write Access",
                "content": "Select to allow users to make changes to the folder content."
            }, {
                "type": "name",
                "title": "Enable Media Sharing",
                "content": "Select to enable media sharing."
            }]
        },
        "time": {
            "TITLE": "Time Settings",
            "CONTENT": [{
                "type": "note",
                "title": "To automatically synchronize the time",
                "content": ["In the Set The Time field, select Get GMT.", "Select your local Time Zone from the drop-down menu.", "In the NTP Server I field, enter the IP address or domain name of your desired NTP Server.", "In the NTP Server II field, enter the IP address or domain name of the second NTP Server. (Optional)", "Click Obtain.", "Click Save."]
            }, {
                "type": "note",
                "title": "To manually set the date and time",
                "content": ["In the Set The Time field, select Get from PC.", "Enter the current Date.", "Select the current Time (In 24-hour clock format, e.g. 16:00:00 is 04:00PM).", "Click Save."]
            }, {
                "type": "title",
                "content": "Daylight Saving"
            }, {
                "type": "note",
                "title": "To set up Daylight Saving time",
                "content": ["Select Enable Daylight Saving.", "Select the correct Start date and time when daylight saving time starts at your local time zone.", "Select the correct End date and time when daylight saving time ends at your local time zone.", "Click Save."]
            }]
        },
        
        "diagnostic": {
            "TITLE": "Diagnostic Tools",
            "CONTENT": [	
            {
                "type": "paragraph",
                "content": "The router provides Ping and Traceroute tools to help you troubleshoot network connectivity problems. The Ping tool sends packets to a target IP Address or Domain Name and logs the results, such as the number of packets sent/received, and the round-trip time. The Traceroute tool sends packets to a target IP Address or Domain Name and displays the number of hops and time to reach the destination."
            }, {
                "type": "paragraph",
                "content": "You can ping and traceroute a local device by the IP address or a domain name, such as google.com, yahoo.com, etc."
            }, {
                "type": "note",
                "title": "To diagnose using Ping",
                "content": ["Enter the target IP Address or Domain Name.", "Click the Arrow Icon to open the Advanced menu and specify the Ping Count, and Ping Packet Size. (Optional)", "Click Start."]
            }, {
                "type": "note",
                "title": "To diagnose using Traceroute",
                "content": ["Enter the target IP Address or Domain Name.", "Click the Arrow Icon to open the Advanced menu and specify the number of hops (to be reached) in the Traceroute Max TTL (Time to Live) field. The default is 20. (Optional) ", "Click Start."]
		
            }
			]
        },
        
        "softup": {
            "TITLE": "Firmware Upgrade",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Before upgrading the firmware of the router, you will need to download the latest firmware update from the TP-LINK Support to your computer."
            }, {
                "type": "note",
                "title": "<B>IMPORTANT:</B> To prevent upgrade failure, please note the following:",
                "content": ["Make sure the latest firmware file is matched with the hardware version (as shown under the Firmware Upgrade page). ", "Make sure that you have a stable connection between the router and your computer. It is NOT recommended to upgrade the firmware wirelessly.", "Make sure you have remove all the USB storage devices connected to the router before the firmware upgrade to prevent data loss.", "Backup your router configuration.", "Do not turn off the Router during the firmware upgrade."]
            }, {
                "type": "note",
                "title": "To upgrade the routerâ€™s firmware",
                "content": ["Click Browse.", "Locate and select the downloaded firmware file.", "Click Upgrade."]
            }, {
                "type": "paragraph",
                "content": "The upgrade process takes a few minutes to complete. Please DO NOT power off the router while the upgrade is in progress."
            }]
        },
        "backNRestore": {
            "TITLE": "Backup",
            "CONTENT": [{
                "type": "paragraph",
                "content": "It is highly recommended to backup your current configurations, in case a recovery is needed to restore the system to a previous state or from the factory defaults."
            }, {
                "type": "paragraph",
                "content": "Click Backup to save your current configurations to your computer. Make sure to save the backup file to a safe location that you can retrieve and restore the Router later, if needed."
            }, {
                "type": "title",
                "content": "Restore"
            }, {
                "type": "note",
                "title": "To restore from a backup",
                "content": ["Click Browse.", "Locate and select the backup file.", "Click Restore."]
            }, {
                "type": "title",
                "content": "Factory Default Restore"
            }, {
                "type": "paragraph",
                "content": "Click Factory Restore to reset your router to its factory default settings."
            }, {
                "type": "note",
                "title": "Note:",
                "content": ["Factory Restore will erase all the settings that you have configured for the router. To re-login to the router's management page, use the default admin for both username and password.", "Please DO NOT power off the router during the backup or restore process."]
            }]
        },
        "manageCtrl": {
            "TITLE": "Account Management",
            "CONTENT": [{
                "type": "paragraph",
                "content": "You can change your login username and/or password."
            }, {
                "type": "name",
                "title": "Old User Name",
                "content": "Type in your current user name."
            }, {
                "type": "name",
                "title": "Old Password",
                "content": "Type in your current password."
			}, {
                "type": "name",
                "title": "New User Name",
                "content": "Type in your new user name."
            }, {
                "type": "name",
                "title": "New Password",
                "content": "Type in your new password."
            }, {
                "type": "name",
                "title": "Confirm New Password",
                "content": "Type in your new password again."
            }, {
                "type": "title",
                "content": "Local Management"
            }, {
                "type": "paragraph",
                "content": "You can limit the number of client devices on your LAN from accessing the router using the MAC address-based authentication."
            }, {
               type: "name",
               title: "Port",
               content: "Enter the port number, between 1024 and 65535, which is used to access the router. The default number is 80."
	         }, {
	             type: "name",
	             title: "IP/MAC Address",
	             content: "Enter a valid local IP address or MAC address to be allowed to access the router."
	         }, {
	             type: "title",
	             content: "Remote Management"
	         }, {
	             type: "paragraph",
	             content: "The Remote Management feature allows you to access and configure the router remotely from the Internet." /*?*/
	         }, {
	             type: "name",
	             title: "Remote Management",
	             content: "Select the checkbox to enable Remote Management feature."
	         }, {
	             type: "name",
	             title: "Port",
	             content: "Enter the port number, between 1024 and 65535, which is used to access the router's web management interface with greater security. Normally, the web browsers use the standard HTTP service port 80."
	         }, {
	             type: "name",
	             title: "IP/MAC Address",
	             content: "Enter a valid remote IP address or MAC address to be allowed to access the router."
	         }]
        },
        log: {
            TITLE: "System Log",
            CONTENT: [{
                type: "paragraph",
                content: "The System Log page displays a list of the most recent activities (events) of the router. You can define what types of logs and/or the level of logs you want to view. This page also has the Email feature that you can configure to automatically send the log files to a specific email address, or export the log files to a computer."
            }, {
                type: "name",
                title: "Type",
                content: "Select the type of system log to display."
            }, {
                type: "name",
                title: "Level",
                content: "Select the level of system log to display."
            }, {
                type: "name",
                title: "Refresh",
                content: "Click this icon to update the system log."
            }, {
                type: "name",
                title: "Delete All",
                content: "Click this icon to delete all system logs."
            }, {
                type: "name",
                title: "Log Settings",
                content: "Click to set the logs.",
                children: [{
                    type: "name",
                    title: "Save Locally",
                    content: "Select to save logs to your local memory.",
                    children: [{
                        type: "name",
                        title: "Minimum Level",
                        content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
                    }]
                }, {
                    type: "name",
                    title: "Save Remotely",
                    content: "Select to send logs to the specified IP address and UDP port of the remote system log server.",
                    children: [{
                        type: "name",
                        title: "Minimun Level",
                        content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
                    }, {
                        type: "name",
                        title: "Server IP",
                        content: "Specify the IP address of the remote system log server to which events will be sent."
                    }, {
                        type: "name",
                        title: "Server Port",
                        content: "Specify the port number of the remote system log server to which events will be sent."
                    }, {
                        type: "name",
                        title: "Local Facility Name",
                        content: "Select the local facility name according to your remote server's facility name."
                    }]
                }]
            }, {
                type: "name",
                title: "Save Log",
                content: "Click this button to download all system log files to your local computer."
            }]
        },
        logConf: {
            TITLE: "Log Settings",
            CONTENT: [{
                type: "paragraph",
                content: ""
            }, {
				type: "name",
				title: "Save Locally",
				content: "Select to save logs to your local memory.",
				children: [{
				    type: "name",
				    title: "Minimum Level",
				    content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
				}]
			}, {
			    type: "name",
			    title: "Save Remotely",
			    content: "Select to send logs to the specified IP address and UDP port of the remote system log server.",
			    children: [{
			        type: "name",
			        title: "Minimun Level",
			        content: "Select the Minimum level in the drop-down list, and then all logged events above or equal to the selected level will be saved."
			    }, {
			        type: "name",
			        title: "Server IP",
			        content: "Specify the IP address of the remote system log server to which events will be sent."
			    }, {
			        type: "name",
			        title: "Server Port",
			        content: "Specify the port number of the remote system log server to which events will be sent."
			    }, {
			        type: "name",
			        title: "Local Facility Name",
			        content: "Select the local facility name according to your remote server's facility name."
			    }]
            }]
        },
        "route": {
            "TITLE": "Static Routing",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Static routing is used to predetermine a fixed route for the network information packets to reach a specific host or network."
            }, {
                "type": "note",
                "title": "To set up a Static Routing",
                "content": ["Click Add.", "Destination IP - Enter an IP address to assign the static route for this entry.", "Subnet Mask - Enter a subnet mask format to determine the network portion and host portion of the IP address.", "Gateway - Enter a gateway IP address format to connect the router to the network or host.", "Interface - Select LAN or WAN to specify the type of the Destination Network.", "Select the Enable checkbox.", "Click OK."]
            }, {
                "type": "note",
                "title": "To modify or delete an existing entry",
                "content": ["In the table, click the Edit icon or the Trash icon that corresponds to the entry that you wish to modify or delete."]
            }, {
                "type": "title",
                "title": "System Routing Table"
            }, {
                "type": "paragraph",
                "content": "System Routing Table displays all valid route entries that are currently in use."
            }, {
                "type": "paragraph",
                "content": "Click Refresh to update the Routing table."
            }]
        },
        "ddns": {
            "TITLE": "Dynamic DNS Settings",
            "CONTENT": [{
                "type": "paragraph",
                "content": "Dynamic DNS allows you to assign a fixed host and domain name to a dynamic Internet IP address. It is useful when you are hosting your own website, FTP server, or another server behind the router. First, you need to sign up with a DDNS service provider such as www.dyndns.com."
            }, {
                "type": "note",
                "title": "To set up a Dynamic DNS",
                //"content": ["Select your DDNS service provider.", "Enter the Username and Password of your DDNS account.", "Enter the Domain Name you received from the DDNS service provider.", "Select your update interval from the drop-down list.", "Click Login and Save."]
                "content": ["Select your DDNS service provider.", "Enter the Username and Password of your DDNS account.", "Enter the Domain Name you received from the DDNS service provider.", "Click Login and Save."]
			}, {
                "type": "paragraph",
                "content": "To switch between accounts, you must first Logout the current account and then Login another account with the new username and password."
            }]
        },
        "dhcp": {
            "TITLE": "DHCP Server",
            "CONTENT": [{
                "type": "name",
                "title": "DHCP",
                "content": "By default, the DHCP (Dynamic Host Configuration Protocol) Server is enabled; it dynamically assigns TCP/IP parameters to client devices from the IP Address Pool. DO NOT disable the DHCP Server unless you have another DHCP server or you wish to manually assign the TCP/IP parameters to every client device on your network."
            }, {
                "type": "name",
                "title": "IP Address Pool",
                "content": "Enter the range of IP addresses that can be leased to the clients. By default, the starting IP address is 192.168.0.100 and the ending is 192.168.0.200."
            }, {
                "type": "name",
                "title": "Address Lease Time",
                "content": "Enter the time duration that an IP address is leased to the client between 1 and 2880 minutes. The default is 1440 minutes."
            }, {
                "type": "name",
                "title": "Default Gateway",
                "content": "Enter the LAN IP address. The default is 192.168.0.1. (Optional)"
            }, {
                "type": "name",
                "title": "Primary DNS/Secondary DNS",
                "content": "Enter these parameters as provided by your ISP. (Optional)",
                "children": [{
                    "type": "paragraph",
                    "title": "Note",
                    "content": "If you encounter \"Address not found\" errors after entering the DNS addresses, it is likely that your DNS servers are setup incorrectly; contact your ISP for assistance."
                }]
            }, {
                "type": "title",
                "content": "Client List"
            }, {
                "type": "name",
                "title": "Client Number",
                "content": "Displays the index number of the associated DHCP client."
            }, {
                "type": "name",
                "title": "Client Name",
                "content": "Displays the name of the DHCP client."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "Displays the MAC address."
            }, {
                "type": "name",
                "title": "Assigned IP",
                "content": "Displays the allocated IP address to the client by the DHCP server."
            }, {
                "type": "name",
                "title": "Lease Time",
                "content": "Displays the time duration of the IP address that has been leased to the client."
            }, {
                "type": "name",
                "title": "Refresh",
                "content": "Click to update the DHCP Client List."
            }, {
                "type": "title",
                "content": "Address Reservation"
            }, {
                "type": "paragraph",
                "content": "You can manually reserve an IP address for a client that is connected to the router. Once reserved, the IP address will only be assigned to the same client by the DHCP server."
            }, {
                "type": "name",
                "title": "MAC Address",
                "content": "Displays the MAC address of the client with DHCP reserved IP address."
            }, {
                "type": "name",
                "title": "Reserved IP",
                "content": "Displays the reserved IP address of the client."
            }, {
                "type": "name",
                "title": "Group",
                "content": "Displays the group of the client device."
            }, {
                "type": "name",
                "title": "Enable",
                "content": "Displays the current status (enabled or disabled) of the client device."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Modify or Delete the corresponding client."
            }, {
                "type": "note",
                "title": "To reserve an IP address",
                "content": ["Click Add.", "Enter the MAC address of your desired client.", "Enter the IP address that you want to reserve for the client.", /*"Enter a description for the client.",*/ "Select Enable.", "Click OK."]
            }, {
                "type": "note",
                "title": "To modify or delete an existing client",
                "content": ["In the table, click the Edit icon or the Trash icon that corresponds to the client that you wish to modify or delete."]
            }, {
                "type": "title",
                "content": "Condition Pool"
            }, {
                    type: "name",
                    title: "Vendor ID/Start IP Address/End IP Address/Facility/Group",
                    content: "Displays the Vender ID, Start IP Address, End IP Address, Facility and Group name of the condition pool."
                },
                {
                    type: "name",
                    title: "Status",
                    content: "Click the Bulb icon to enable or disable the entry."
                },
                {
                    type: "name",
                    title: "Modify",
                    content: "Displays options to Modify or Delete the corresponding client."
                },
                {
                    type: "name",
                    title: "Facility",
                    content: "Enter the LAN device's name."
                },
                {
                    type: "name",
                    title: "Vendor ID",
                    content: "A value to identify the vendor and functionality of a DHCP client."
                },
                {
                    type: "name",
                    title: "Start IP Address",
                    content: "Enter a value for the DHCP server to start with when issuing IP addresses."
                },
                {
                    type: "name",
                    title: "End IP Address",
                    content: "Enter a value for the DHCP server to end with when issuing IP addresses."
                },
                {
                    type: "name",
                    title: "Default Gateway",
                    content: "Enter the Default Gateway of the DHCP Server."
                },
                {
                    type: "name",
                    title: "Device Type",
                    content: "Select the device type from the drop-down list. "
                },
                {
                    type: "name",
                    title: "Add Option",
                    content: "Select the option from the drop-down list."
                },
                {
                    type: "name",
                    title: "Option Value",
                    content: "Enter the Option Value."
                },
                {
                    type: "name",
                    title: "Group",
                    content: "Select the group name from the drop-down list."
                },
                {
                    type: "name",
                    title: "Enable this entry",
                    content: "Select the checkbox to enable the entry." 
            }]
        },
  		ethWan: {
            TITLE: "WAN Interface",
            CONTENT: [
                {
                    type: "title2",
                    content: "Internet Connection Type: Dynamic IP"
                },
                {
                    type: "name",
                    title: "Dynamic IP",
                    content: "Select this type if you are provided with a DHCP server connection by the ISP (Internet Service Provider)."
                },
                /*{
                    type: "name",
                    title: "IPv4",
                    content: "Select the checkbox to enable IPv4."
                },*/
                {
                    type: "name",
                    title: "IP Address/Subnet Mask/Default Gateway",
                    content: "These parameters are automatically assigned by the DHCP server from your ISP."
                },
                {
                    "type": "name",
                    "title": "Renew/Release",
                    "content": "Click this button to renew/release the IP parameters from your ISP."
	            },
	   
                /*{
                    type: "name",
                    title: "IPv6",
                    content: "Select the checkbox to enable IPv6 feature."
                },
                {
                    type: "name",
                    title: "IPv6 Address/Prefix Length/IPv6 Default Gateway",
                    content: "These parameters are automatically assigned by the DHCP server from your ISP."
                },
                {
                    type: "name",
                    title: "Addressing Type",
                    content: "Select the connection type of IPv6 connection."
                },*/
                {
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is not recommended to change the default MTU size unless required by the ISP."
                },
                /*{
                    type: "name",
                    title: "NAT",
                    content: "This technology translates the IP addresses of a local area network to a different IP address for the Internet. If this router is hosting your network¡¯s connection to the Internet, please select the checkbox."
                },
                {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT, if not enabled, the default NAT will act."
                },
                {
                    type: "name",
                    title: "SPI Firewall",
                    content: "The SPI firewall enhances network¡¯s security. Select the checkbox to use a firewall, or else without a firewall."
                },*/
                {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration for client devices, such as the router. It is enabled by default."
                },
                {
                    type: "name",
                    title: "Get IP with Unicast DHCP",
                    content: "Select this checkbox if your ISP's DHCP server does not support broadcast applications and you cannot get the IP address dynamically."
                },
                {
                    type: "name",
                    title: "Use the following DNS Addresses",
                    content: "Select the checkbox to set DNS Server manually. The router will use this DNS Server for priority."
                },
                /*{
                    type: "name",
                    title: "Use the following IPv6 DNS Address",
                    content: "Select the checkbox to set IPv6 DNS Server manually. The router will use this IPv6 DNS Server for priority."
                },*/
                {
                    type: "name",
                    title: "Host",
                    content: "Enter a value into this field to specify the host name of the router."
                },
                {
                    type: "title2",
                    content: "Internet Connection Type: Static IP"
                },
                {
                    type: "name",
                    title: "Static IP",
                    content: "Select this type if you are provided with a specific (fixed) IP Address, Subnet Mask, Gateway, and DNS parameters by the ISP."
                },
                /*{
                    type: "name",
                    title: "IPv4",
                    content: "Select the checkbox to enable IPv4."
                },*/
                {
                    type: "name",
                    title: "IP Address/Subnet Mask/Default Gateway/Primary DNS/Secondary DNS",
                    content: "Enter these parameters according to your needs."
                },
                /*{
                    type: "name",
                    title: "IPv6",
                    content: "Select the checkbox to enable IPv6 feature."
                },
                {
                    type: "name",
                    title: "IPv6 Address/Prefix Length/IPv6 Default Gateway",
                    content: "These parameters are automatically assigned by the DHCP server from your ISP."
                },*/
                {
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is not recommended to change the default MTU size unless required by the ISP."
                },
                /*{
                    type: "name",
                    title: "NAT",
                    content: "This technology translates the IP addresses of a local area network to a different IP address for the Internet. If this router is hosting your network¡¯s connection to the Internet, please select the checkbox."
                },
                {
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT, if not enabled, the default NAT will act."
                },
                {
                    type: "name",
                    title: "SPI Firewall",
                    content: "The SPI firewall enhances network¡¯s security. Select the checkbox to use a firewall, or else without a firewall."
                },*/
                {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration for client devices, such as the router. It is enabled by default."
                },
                {
                    type: "title2",
                    content: "Internet Connection Type: PPPoE"
                },
                {
                    type: "name",
                    title: "PPPoE",
                    content: "Select this type if you are provided with a PPPoE username and password by the ISP."
                },
                {
                    type: "name",
                    title: "Username/Password/Confirm Password",
                    content: "Enter the username and password provided by your ISP. These fields are case-sensitive."
                },
                {
                	"type": "name",
                	"title": "Secondary Connection",
                	"content": "It's available only for PPPoE Connection. If your ISP provides an extra Connection type such as Dynamic/Static IP to connect to a local area network, then you can check the radio button of Dynamic/Static IP to activate this secondary connection.<br>The Secondary Connection is disabled by default, so there is PPPoE connection only. This is recommended."
				},
                {
                    type: "name",
                    title: "Connection Mode",
                    content: "",
                    children: [{
                        type: "name",
                        title: "Always on",
                        content: "The connection can be re-established automatically when it is down."
                    }, {
                        type: "name",
                        title: "Connect on demand",
                        content: "This mode is dependent on the traffic. If there is no traffic (or Idle) for a pre-specified period of time (MAX Idle Time), the connection will drop down automatically. And once there is a request for Internet connection, it will be on automatically."
                    }, {
                        type: "name",
                        title: "Connect manually",
                        content: "You can manually control the status of a connection. This mode also supports the Max Idle Time function as Connect on Demand mode. The Internet connection can be disconnected automatically after a specified inactivity period."
                        //content: "You can manually control the status of a connection. This mode also supports the Max Idle Time function as Connect on Demand mode. The Internet connection can be disconnected automatically after a specified inactivity period and re-established when you attempt to access the Internet again."
                    }, {
                        type: "name",
                        title: "Max Idle Time",
                        content: "You can decide when the network will be disconnected or reconnected by entering the time here."
                    }
                    ]
                },
                {
                    type: "name",
                    title: "Authentication Type",
                    content: "Select the Authentication Type from the drop-down list. The default method is AUTO_AUTH."
                },
            	{
                	"type": "name",
					"title": "Connect/Disconnect",
                	"content": "Click to connect/disconnect immediately."
            	},
     
                /*{
                    type: "name",
                    title: "IPv4",
                    content: "Select the checkbox to enable IPv4 feature."
                },
                {
                    type: "name",
                    title: "IPv6",
                    content: "Select the checkbox to enable IPv6 feature."
                },
                {
                    type: "name",
                    title: "Addressing Type",
                    content: "Select the connection type of IPv6 connection."
                },*/
                {
                    type: "name",
                    title: "Service Name",
                    content: "Enter the Service Name if it was provided by your ISP. Otherwise, you can leave them blank."
                },
                {
                    type: "name",
                    title: "Server Name",
                    content: "Enter the Server Name if it was provided by your ISP. Otherwise, you can leave them blank."
                },
                {
                    type: "name",
                    title: "MTU Size (in bytes)",
                    content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
                    children: [
                        {
                            type: "paragraph",
                            content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
                        }
                    ]
                },
                /*{
                    type: "name",
                    title: "Full-cone NAT",
                    content: "It is a type of NAT, if not enabled, the default NAT will act."
                },
                {
                    type: "name",
                    title: "SPI Firewall",
                    content: "The SPI firewall enhances network¡¯s security. Select the checkbox to use a firewall, or else without a firewall."
                },*/
                {
                    type: "name",
                    title: "IGMP Proxy",
                    content: "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration for client devices, such as the router. It is enabled by default."
                },
                {
                    type: "name",
                    title: "Use the IP specified by ISP",
                    content: "Select this option and enter the IP address provided by your ISP."
                },
                {
                    type: "name",
                    title: "Echo Request Interval",
                    content: "Enter a time interval value between 0 and 120 (in seconds) for which the router requests Access Concentrator to echo at every interval. The default value is 30. 0 means no detection."
                },
                {
                    type: "name",
                    title: "Use the following DNS Addresses",
                    content: "Select the checkbox to set DNS Server manually. The router will use this DNS Server for priority."
                },
                /*{
                    type: "name",
                    title: "Use the IPv6 specified by ISP",
                    content: "Select this checkbox and enter the IP address and gateway provided by your ISP."
                },
                {
                    type: "name",
                    title: "Use the following IPv6 DNS Address",
                    content: "Select the checkbox to set IPv6 DNS Server manually. The router will use this IPv6 DNS Server for priority."
                },*/
				{
                    type: "title2",
                    content: "Internet Connection Type: L2TP/PPTP"
                },
				{
               		"type": "name",
					"title": "L2TP/PPTP",
                	"content": "Select this type if you connect to an L2TP/PPTP VPN Server and are provided with a username, password, and IP Address/Domain Name of the server by the ISP."
            	}, {
                	"type": "name",
                	"title": "Username/Password",
                	"content": "Enter the username and password provided by your ISP. These fields are case-sensitive."
            	}, {
                	"type": "name",
                	"title": "IP Address/Primary DNS",
                	"content": "These parameters will be automatically assigned by the DHCP server from your ISP."
            	}, {
                	"type": "name",
                	"title": "Secondary Connection (Dynamic IP or Static IP)",
                	"content": "",
                	"children": [{
                   		"type": "name",
                    	"title": "Dynamic IP",
                    	"content": "Select if the IP address and Subnet Mask are assigned automatically by the ISP.",
                    	/*"children": [{
                        	"type": "name",
                        	"title": "Renew",
                        	"content": "Click this button to renew the IP parameters from your ISP."
	                    }, {
	                        "type": "name",
	                        "title": "Release",
	                        "content": "Click this button to release the assigned IP parameters."
	                    }]*/
	                }, {
	                    "type": "name",
	                    "title": "Static IP",
	                    "content": "Select if the IP address, Subnet Mask, Gateway, and DNS addresses are provided by the ISP, and enter these information into the corresponding fields."
	                }]
		        }, {
		        	"type": "name",
		        	"title": "VPN Server IP/Domain Name",
		        	"content": "Enter the VPN server's IP address or domain name provided by your ISP."
		        }, {
		        	"type": "name",
		        	"title": "MTU Size",
		       		"content": "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1460 Bytes(1420 for PPTP). It is NOT recommended to change the default MTU size unless required by the ISP."
		       	}, {
		        	"type": "name",
			       	"title": "Connection Mode",
			       	"content": "Select an appropriate connection mode that determines how to connect to the Internet.",
			       	"children": [{
			       	"type": "name",
			       	"title": "Always On",
			       	"content": "In this mode, the Internet connection reconnects automatically any time it gets disconnected."
		        }, {
		            "type": "name",
		            "title": "Connect on demand",
		            "content": "In this mode, the Internet connection will be terminated automatically after a specified time of inactivity (Max Idle Time) has elapsed. The connection is re-established when you attempt to access the Internet again."
		        }, {
		            "type": "name",
		            "title": "Connect manually",
		            "content": "In this mode, the Internet connection is controlled manually by clicking the Connect or Disconnect button.This mode also supports the Max Idle Time function. Enter a maximum time (in minutes) the Internet connection can be inactive before it is terminated into the Max Idle Time field. The default value is 15 minutes. If you want the Internet connection remains active at all time, enter 0 (zero)."
		        }]
		       },
					
                {
                    type: "title",
                    content: "MAC Clone"
                },
                {
                    type: "name",
                    title: "Use Default MAC Address",
                    content: "DO NOT change the default MAC address of the router, in case the ISP does not bind the assigned IP address to the MAC address."
                },
                {
                    type: "name",
                    title: "Use Current Computer MAC Address",
                    content: "Select to copy the current MAC address of the computer that is connected to the router, in case the ISP binds the assigned IP address to the computer's MAC address."
                },
                {
                    type: "name",
                    title: "Use Custom MAC Address",
                    content: "Enter the MAC address manually, in case the ISP binds the assigned IP address to the specific MAC address."
                }
            ]

        },
        "iptv": {
            "TITLE": "IPTV Settings",
            "CONTENT": [{
                "type": "name",
                "title": "IPTV",
                "content": "Select to enable the IPTV feature."
            }, {
                "type": "name",
                "title": "Mode",
                "content": "Select the appropriate mode according to your ISP. There are six supported IPTV modes:",
                "children": [{
                    "type": "name",
                    "title": "Bridge",
                    "content": " If your ISP is not listed and no other parameters are required, you can simply select this mode and configure the LAN port features of the router.",
                    "children": [{
                        "type": "name",
                        "title": "LAN 1/2/3/4",
                        "content": "Assign your LAN port whether to function as the Internet supplier or as the IPTV supplier."
                    }]
                }, {
                    "type": "name",
                    "title": "Russia",
                    "content": "Select if your ISP is from Russia and the necessary parameters are predetermined, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port features.",
                    "children": [{
                        "type": "name",
                        "title": "IPTV Multicast Vlan ID/Priority",
                        "content": "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to your ISP."
                    }]
                }, {
                    "type": "name",
                    "title": "Singapore-ExStream",
                    "content": "Select if your ISP is ExStream from Singapore and the necessary parameters are predetermined, including Internet/IPTV Vlan IDs and priority, and LAN (1/2/3/4)port features."
                }, {
                    "type": "name",
                    "title": "Malaysia-Unifi",
                    "content": "Select if your ISP is Unifi from Malaysia and the necessary parameters are predetermined, including Internet/IPTV Vlan IDs and priority, and LAN (1/2/3/4) port features."
                }, {
                    "type": "name",
                    "title": "Malaysia-Maxis",
                    "content": "Select if your ISP is Maxis from Malaysia and the necessary parameters are predetermined, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port features."
                }, {
                    "type": "name",
                    "title": "Custom",
                    "content": "Select if your ISP is not listed but provides the necessary parameters, including Internet/IP-Phone/IPTV VLAN IDs and Priority, and LAN (1/2/3/4) port features.",
                    "children": [{
                        "type": "name",
                        "title": "Internet/IP-Phone/IPTV Vlan ID/Priority",
                        "content": "Configure the VLAN IDs as provided by your ISP."
                    }, {
                        "type": "name",
                        "title": "802.11Q Tag",
                        "content": "Select whether to tag the Internet packets with 802.11Q."
                    }, {
                        "type": "name",
                        "title": "LAN 1/2/3/4",
                        "content": "Assign your LAN port to whether function as the Internet supplier or as the IPTV supplier."
                    }, {
                        "type": "name",
                        "title": "IPTV Multicast Vlan ID/Priority",
                        "content": "You can enable the IPTV multicast feature as desired, and configure the VLAN ID and Priority according to your ISP."
                    }]
                }]
            }, {
                "type": "name",
                "title": "IGMP Proxy",
                "content": "Select the IGMP (Internet Group Management Protocol) Proxy version, either V2 or V3, according to your ISP."
            }]
        },
        "lan": {
            "TITLE": "LAN",
            "CONTENT": [{
                "type": "name",
                "title": "MAC Address",
                "content": "The physical MAC address of the router."
            }, {
                "type": "name",
                "title": "LAN IPv4",
                "content": "Displays the default router's IP address (192.168.0.1), which is used to login to the router's web management page, and can be overridden."
            }, {
                "type": "name",
                "title": "Subnet Mask",
                "content": "Select an assigned identifier used by the LAN port to route Internal and External traffic from the drop-down list or enter a new subnet mask format. The default is 255.255.255.0."
            }, {
                "type": "name",
                "title": "IGMP Snooping",
                "content": "IGMP (Internet Group Management Protocol) is used to manage multicasting on TCP/IP networks. Some ISPs use IGMP to perform remote configuration for client devices, such as the router. It is enabled by default."
			}, {
                "type": "paragraph",
                "title": "Note",
                "content": "If the new LAN IP address is not in the same subnet with the old one, the IP Address Pool in the DHCP server will be automatically configured; however, the Virtual Server and DMZ Host will not take effect until they are reconfigured."
            }]
        },
		ipsec: {
            TITLE: "IPSec Settings",
            CONTENT: [{
                type: "name",
                title: "Dead Peer Detection",
                content: "Dead Peer Detection (DPD) is a method of detecting a dead Internet Key Exchange (IKE) peer. DPD is used to reclaim the lost resources in case a peer is found dead and it is also used to perform IKE peer failover. Toggle On to enable Dead Peer Detection feature."
            }, {
                type: "name",
                title: "Connection Name/Remote Gateway/Local Address/Remote Address",
                content: "Displays the Connection Name, Remote Gateway, Local Address, and Remote Address of the IPSec entry."
            }, {
                type: "name",
                title: "Status",
                content: "Displays the status of the IPSec entry. Status includes:",
                children: [{
                    type: "name",
                    title: "Disabled",
                    content: "The entry is disabled."
                }, {
                    type: "name",
                    title: "Down",
                    content: "The entry is enabled, but the connection is not made successfully."
                }, {
                    type: "name",
                    title: "Up",
                    content: "The entry is enabled and the connection is made successfully. "
                }
                ]
            }, {
                type: "name",
                title: "Enable",
                content: "Click the <b>Bulb</b> icon to enable or disable the entry."
            }, {
                type: "name",
                title: "Modify",
                content: "Displays options to <b>Modify</b> or <b>Delete</b> the corresponding entry."
            }, {
                type: "name",
                title: "Add",
                content: "Click to add a new entry."
            }, {
                type: "name",
                title: "IPSec Connection Name",
                content: "Enter a name for your VPN."
            }, {
                type: "name",
                title: "Remote IPSec Gateway (URL)",
                content: "Enter the destination gateway IP address which is the public WAN IP or Domain Name of the remote VPN server endpoint."
            }, {
                type: "name",
                title: "Tunnel access from local IP addresses",
                content: "Select Subnet Address if you want the whole LAN to join the VPN network, or else Select Single Address if you want single IP to join the VPN network."
            }, {
                type: "name",
                title: "IP Address for VPN",
                content: "Enter the IP address of your LAN. "
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Enter the subnet mask of the LAN."
            }, {
                type: "name",
                title: "Tunnel access from remote IP addresses",
                content: "Select Subnet Address if you want the whole remote LAN to join the VPN network, or select Single Address if you want a single IP to join the VPN network."
            }, {
                type: "name",
                title: "IP Address for VPN",
                content: "Enter the IP address of the remote LAN. "
            }, {
                type: "name",
                title: "Subnet Mask",
                content: "Enter the subnet mask of the remote LAN."
            }, {
                type: "name",
                title: "Key Exchange Method",
                content: "Select Auto (IKE) or Manual."
            }, {
                type: "name",
                title: "Authentication Method",
                content: "Select Pre-Shared Key (recommended)."
            }, {
                type: "name",
                title: "Pre-Shared Key",
                content: "Input the Pre-Shared key for Authentication."
            }, {
                type: "name",
                title: "Perfect Forward Secrecy",
                content: "PFS is an additional security protocol."
            }, {
                type: "name",
                title: "Advanced",
                content: "Click to configure advanced settings. We recommend you keep the default settings. If you want to change the default settings of Advanced Settings, please make sure that both VPN server endpoints use the same Encryption Algorithm, Integrity Algorithm, Diffie-Hellman Group and Key Life time in both phase1 and phase2.",
                children: [
                    {
                        type: "title2",
                        content: "==Phase 1=="
                    }, {
                        type: "name",
                        title: "Mode",
                        content: "Select Main Mode to configure the standard negotiation parameters for IKE phase1. Select Aggressive Mode to configure IKE phase1 of the VPN Tunnel to carry out negotiation in a shorter amount of time. (Not Recommended as it is less secure.)"
                    }, {
                        type: "name",
                        title: "Local Identifier Type",
                        content: "Select the local Identifier type for IKE negotiation. Local WAN IP: uses an IP address as the identifier in IKE negotiation. FQDN: uses a username as the identifier."
                    }, {
                        type: "name",
                        title: "Local Identifier",
                        content: "The local WAN IP will be inputted automatically if <b>Local WAN IP</b> is selected. If <b>FQDN</b> is selected, enter a username for the local device as the identifier in IKE negotiation."
                    }, {
                        type: "name",
                        title: "Remote Identifier Type",
                        content: "Select the remote Identifier type for IKE negotiation. Remote WAN IP: uses an IP address as the identifier in IKE negotiation. FQDN: uses a username as the identifier."
                    }, {
                        type: "name",
                        title: "Remote Identifier",
                        content: "The remote gateway IP will be inputted automatically if <b>Remote WAN IP</b> is selected. If <b>FQDN</b> is selected, enter the username of the remote peer as the identifier in IKE negotiation."
                    }, {
                        type: "name",
                        title: "Encryption Algorithm",
                        content: "Specify the encryption algorithm for IKE negotiation. Options include:",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "DES (Data Encryption Standard) encrypts a 64-bit block of plain text with a 56-bit key."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "Triple DES, encrypts a plain text with 168-bit key."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Uses the AES algorithm and 128-bit key for encryption."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Uses the AES algorithm and 192-bit key for encryption."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Uses the AES algorithm and 256-bit key for encryption."
                        }
                        ]
                    }, {
                        type: "name",
                        title: "Integrity Algorithm",
                        content: "Select the integrity algorithm for IKE negotiation. Options include:",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "MD5 (Message Digest Algorithm) takes a message of arbitrary length and generates a 128-bit message digest."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "SHA1 (Secure Hash Algorithm) takes a message less than 2^64 (the 64th power of 2) in bits and generates a 160-bit message digest."
                        }
                        ]
                    }, {
                        type: "name",
                        title: "Diffie-Hellman Group for Key Exchange",
                        content: "Select the Diffie-Hellman group to be used in key negotiation phase 1. The Diffie-Hellman Group sets the strength of the algorithm in bits."
                    }, {
                        type: "name",
                        title: "Key Life Time",
                        content: "Enter the number for the IPSec lifetime. It is the period of time to pass before establishing a new IPSec security association (SA) with the remote endpoint. The default value is 3600."
                    }, {
                        type: "title2",
                        content: "==Phase 2=="
                    }, {
                        type: "name",
                        title: "Encryption Algorithm",
                        content: "Specify the encryption algorithm for IKE negotiation. Options include:",
                        children: [{
                            type: "name",
                            title: "DES",
                            content: "DES (Data Encryption Standard) encrypts a 64-bit block of plain text with a 56-bit key."
                        }, {
                            type: "name",
                            title: "3DES",
                            content: "Triple DES, encrypts a plain text with 168-bit key."
                        }, {
                            type: "name",
                            title: "AES128",
                            content: "Uses the AES algorithm and 128-bit key for encryption."
                        }, {
                            type: "name",
                            title: "AES192",
                            content: "Uses the AES algorithm and 192-bit key for encryption."
                        }, {
                            type: "name",
                            title: "AES256",
                            content: "Uses the AES algorithm and 256-bit key for encryption."
                        }
                        ]
                    }, {
                        type: "name",
                        title: "Integrity Algorithm",
                        content: "Select the integrity algorithm for IKE negotiation. Options include:",
                        children: [{
                            type: "name",
                            title: "MD5",
                            content: "MD5 (Message Digest Algorithm) takes a message of arbitrary length and generates a 128-bit message digest."
                        }, {
                            type: "name",
                            title: "SHA1",
                            content: "SHA1 (Secure Hash Algorithm) takes a message less than 2^64 (the 64th power of 2) in bits and generates a 160-bit message digest."
                        }
                        ]
                    }, {
                        type: "name",
                        title: "Diffie-Hellman Group for Key Exchange",
                        content: "Select the Diffie-Hellman group to be used in key negotiation phase 2. The Diffie-Hellman Group sets the strength of the algorithm in bits."
                    }, {
                        type: "name",
                        title: "Key Life Time",
                        content: "Enter the number for the IPSec lifetime. It is the period of time to pass before establishing a new IPSec security association (SA) with the remote endpoint. The default value is 3600."
                    }
                ]
            }
            ]
        },	
        "ddos": {
            "TITLE": "Firewall",
            "CONTENT": [{
                "type": "name",
                "title": "SPI Firewall",
                "content": "Stateful Packet Inspection (SPI) firewall prevents cyber attacks and validates the traffic that is passing through the router based on the protocol. The SPI Firewall is enabled by default. "
            }, {
                "type": "title",
                "title": "Dos Protection"
            }, {
                "type": "name",
                "title": "DoS Protection",
                "content": "Denial of Service (DoS) protection protects your LAN against DoS attacks from flooding your network with server requests. By default, DoS Protection is disabled (Off)."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Attack Filtering",
                "content": "Enable to prevent the Internet Control Message Protocol (ICMP) flood attack."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Attack Filtering",
                "content": "Enable to prevent the User Datagram Protocol (UDP) flood attack."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Attack Filtering",
                "content": "Enable to prevent the Transmission Control Protocol-Synchronize (TCP-SYN) flood attack.",
                "children": [{
                    "type": "name",
                    "title": "Off",
                    "content": "No protection."
                }, {
                    "type": "name",
                    "title": "Low",
                    "content": "Low-level of protection and low impact on router performance."
                }, {
                    "type": "name",
                    "title": "Middle",
                    "content": "Moderate-level of protection and semi-noticeable impact on router performance."
                }, {
                    "type": "name",
                    "title": "High",
                    "content": "High-level of protection but a noticeable impact on router performance."
                }]
            }, {
                "type": "name",
                "title": "Forbid Lan Ping",
                "content": "Enable to ignore pings from LAN ports."
            }, {
                "type": "name",
                "title": "Forbid Wan Ping",
                "content": "Enable to forbid pings from WAN port."
            }, {
                "type": "title",
                "title": "Blocked DoS Host List"
            }, {
                "type": "name",
                "title": "Blocked DoS Host List",
                "content": "Lists the IP Address and MAC Address from any blocked DoS attack source."
            }, {
                "type": "name",
                "title": "To delete an entry",
                "content": "In the Host List, select the entry that you wish to delete and click Delete above the table."
            }]
        },
        "ipv6": {
            "TITLE": "IPv6 Internet",
            "CONTENT": [{
                "type": "name",
                "title": "Enable IPv6",
                "content": "Select to enable (On) or disable (Off) the IPv6 feature of the router."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Static IP"
            }, {
                "type": "name",
                "title": "Static IP",
                "content": "Select this type if your ISP uses Static IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address/IPv6 Default Gateway/IPv6 DNS Server/Secondary IPv6  DNS Server",
                "content": "Enter these parameters as provided by the ISP."
            }, {
                "type": "name",
                "title": "MTU(bytes)",
                "content": "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is NOT recommended to change the default MTU size unless required by the ISP."
            }, {
                "type": "title",
                "title": "Internet Connection Type: Dynamic IP"
            }, {
                "type": "name",
                "title": "Dynamic IP",
                "content": "Select this type if your ISP uses Dynamic IPv6 address assignment."
            }, {
                "type": "name",
                "title": "IPv6 Address/IPv6 Gateway",
                "content": "These parameters are automatically assigned by the DHCPv6 server from your ISP."
            }, {
                type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection."
           	}, {
                type: "name",
                title: "MTU(bytes)",
                content: "The default and typical MTU (Maximum Transmission Unit) size for most Ethernet networks is 1500 Bytes. It is not recommended to change the default MTU size unless required by the ISP."
            }, {
                type: "name",
                title: "Use the following IPv6 DNS Address",
                content: "Select this checkbox and enter the DNS server address(es) in dotted decimal notation provided by your ISP. This WAN interface will use the specified DNS server for priority."
            }, {
                type: "name",
                title: "Host Name",
                content: "Enter a value into this field to specify the host name of the router."
            }, {
			
                /*"type": "name",
                "title": "Renew",
                "content": "Click this button to get new IPv6 parameters from the DHCPv6 server of the ISP."
            }, {
                "type": "name",
                "title": "Release",
                "content": "Click this button to release all IPv6 addresses assigned by DHCPv6 server from the ISP."
            }, {
                "type": "name",
                "title": "Get IPv6 Address",
                "content": "Select to â€œGet non-temporary IPv6 addressâ€?or â€œGet IPv6 prefix delegationâ€? according to your ISP."
            }, {
                "type": "name",
                "title": "DNS Address",
                "content": "Select to â€œGet dynamically from ISPâ€?or â€œUse the following DNS addressâ€? If â€œUse the following DNS Addressâ€?is selected, please manually enter the DNS address provided by your ISP."
            }, {
                "type": "name",
                "title": "Primary DNS/Secondary DNS",
                "content": "Enter these parameters manually or dynamically obtain them from the ISP."
            }, {*/
                "type": "title",
                "title": "Internet Connection Type: PPPoE"
            }, {
                "type": "name",
                "title": "PPPoE",
                "content": "Select this type if your ISP uses PPPoEv6, and provides you with a username and password."
            }, {
                "type": "name",
                "title": "Username/Password/Confirm Password",
                "content": "Enter these parameters as provided by your ISP."
            }, {
				type: "name",
                title: "Addressing Type",
                content: "Select the connection type of IPv6 connection."
            }, {
                type: "name",
                title: "Service Name",
                content: "Enter the service name provided by your ISP. If not, leave blank."
            }, {
                type: "name",
                title: "Server Name",
                content: "Enter the server name provided by your ISP. If not, leave blank."
            }, {
				type: "name",
				title: "MTU Size (in bytes)",
				content: "The typical MTU (Maximum Transmission Unit) size for Ethernet networks is 1480 Bytes.",
				children: [{
				    type: "paragraph",
				    content: "<b>Note</b>: In a rare case, your ISP may require you to adjust the MTU size for better network performance. You should not change the value unless it is absolutely necessary."
				}]
			}, {
                    type: "name",
                    title: "Use the IPv6 specified by ISP",
                    content: "Select this checkbox and enter the IP address and gateway provided by your ISP."
            }, {
                /*"type": "name",
                "title": "IPv6 Address",
                "content": "It will be automatically assigned by DHCPv6 server from the ISP, after you enter the username and password and click Connect."
            }, {*/
                "type": "name",
                "title": "Use the following IPv6 DNS Address",
                "content": "Select to get dynamically from ISP, or Use the following IPv6 DNS Address. If \"Use the following IPv6 DNS Address\"is selected, please manually enter the DNS address provided by your ISP."
            }, {
               /* "type": "name",
                "title": "Get IPv6 Address",
                "content": "Select â€œNon-temporaryâ€?or â€œPrefix delegationâ€?or â€œSpecified by ISPâ€?according to your ISP. If selecting â€œSpecified by ISPâ€? you need to manually enter the IPv6 address as provided by your ISP. If you select â€œNon-temporaryâ€?or â€œPrefix delegationâ€? the IPv6 address will be automatically assigned by the DHCPv6 server from the ISP.",
                "children": [{
                    "type": "name",
                    "title": "Non-temporary",
                    "content": "Get a non-temporary IPv6 address by DHCPv6 Server from the Internet Service Provider(ISP)."
                }, {
                    "type": "name",
                    "title": "Prefix delegation",
                    "content": "Get a prefix delegation IPv6 address by DHCPv6 Server from the ISP,and the client in LAN create a IPv6 address with the delegation."
                }, {
                    "type": "name",
                    "title": "Specified by ISP",
                    "content": "Use a static IPv6 address specified by the ISP."
                }]
            }, {
                "type": "name",
                "title": "Connect",
                "content": "Click this button to get Internet connection."
            }, {
                "type": "name",
                "title": "Disconnect",
                "content": "Click this button to disconnect from the Internet."
            }, {*/
                "type": "title",
                "title": "Internet Connection Type: 6to4 Tunnel"
            }, {
                "type": "name",
                "title": "6to4 Tunnel",
                "content": "Select this type if your ISP uses 6to4 deployment for assigning address."
			}, {
                "type": "title",
                "title": "IPv6 LAN"
            }, {
                "type": "name",
                "title": "Address Type",
                "content": "Select the appropriate one according to your ISP.",
                "children": [{
	                type: "name",
	                title: "RADVD",
	                content: "Select this option to assign IPv6 addresses to the computers in your LAN via RADVD.",
	                children: [{
	                    type: "name",
	                    title: "Enable RDNSS",
	                    content: "Select the checkbox to enable the RDNSS feature."
                    }, {
	                    type: "name",
	                    title: "Enable ULA Prefix",
	                    content: "Select the checkbox to enable the ULA Prefix feature.",
	                    children: [{
	                        type: "name",
	                        title: "ULA Prefix",
	                        content: "Enter the ULA Prefix."
                    }, {
	                        type: "name",
	                        title: "ULA Prefix Length",
	                        content: "Enter the ULA Prefix Length. The default is 64."
	                    }]
                    }]
                }, {
                    "type": "name",
                    "title": "DHCPv6 Server",
                    "content": "To automatically assign IP addresses to the clients in the LAN.",
                    "children": [{
	                    type: "name",
	                    title: "Start IPv6 Address",
	                    content: "Enter the start IPv6 address."
                    }, {
	                    type: "name",
	                    title: "End IPv6 Address",
	                    content: "Enter the end IPv6 address."
                }, {
	                    type: "name",
	                    title: "Leased Time",
	                    content: "Enter the duration in which a DHCP client can lease its current dynamic IPv6 address assigned by the router. After the dynamic IPv6 address has expired, the user will be automatically assigned a new dynamic IPv6 address. The default is 86400 seconds."
                    }]
                }]		
            }, {
               type: "name",
               title: "Site Prefix Type",
               content: "Select a type to assign prefix to IPv6 addresses. Delegated and Static are provided."
            }, {
               type: "name",
               title: "Delegated",
               content: "",
               children: [
                   {
                       type: "name",
                       title: "Prefix Delegated WAN Connection",
                       content: "Select a WAN connection form the drop-down list to assign prefix."
                   }
               ]
            }, {
               type: "name",
               title: "Static",
               content: "",
               children: [
                    {
                        type: "name",
                        title: "Site Prefix",
                        content: "Enter a value for the site prefix."
                    }, {
                        type: "name",
                        title: "Site Prefix Length",
                        content: "Enter a value for the site prefix length."
                    }
                ]
			}]		
        },
        snmp: {
            TITLE: "SNMP Settings",
            CONTENT: [{
                type: "name",
                title: "SNMP Agent",
                content: "An SNMP Agent is an application running on the router that performs the operational role of receiving and processing SNMP messages, sending responses to the SNMP manager, and sending traps when an event occurs. So a router containing SNMP \"agent\" software can be monitored and/or controlled by SNMP Manager using SNMP messages. Toggle On to enable SNMP Agent feature."
            }, {
                type: "name",
                title: "Read Community",
                content: "Displays the name of the Read Community. "
            }, {
                type: "name",
                title: "Set Community",
                content: "Displays the name of the Set Community."
            }, {
                type: "name",
                title: "System Name",
                content: "Displays the administratively-assigned name for this managed device."
            }, {
                type: "name",
                title: "System Description",
                content: "Displays the textual description of the managed device.  This value should include the full name and version identification of the system's hardware type, software operating-system, and networking software."
            }, {
                type: "name",
                title: "System Location",
                content: "Displays the physical location of this device (e.g., telephone closet, 3rd floor).  "
            }, {
                type: "name",
                title: "System Contact",
                content: "Displays the textual identification of the contact person for this managed device, together with information on how to contact this person."
            }, {
                type: "name",
                title: "Trap Manager IP",
                content: "Displays the IP address of the host to receive the traps."
            }]
        },
        "stat": {
            "TITLE": "Traffic Statistics",
            "CONTENT": [{
                "type": "paragraph",
                "content": "The Traffic Statistics page displays the network traffic of the LAN, WAN, and WLAN packet send and receive."
           /* }, {
                "type": "paragraph",
                "title": "Note",
                "content": "If NAT Boost is enabled, Traffic Statistics should be disabled."*/
            }, {
                "type": "name",
                "title": "Enable Traffic Statistics",
                "content": "By default, the Traffic Statistics is Off. To display the statistic information, click On."
            }, {
                "type": "title",
                "title": "Traffic Statistics List"
            }, {
                "type": "name",
                "title": "IP Address/MAC Address",
                "content": "Displays the IP address and MAC address of the associated client device."
            }, {
                "type": "name",
                "title": "Total Packets",
                "content": "Displays the total number of packets transmitted and received by the client device since the beginning of the session or the last counter reset."
            }, {
                "type": "name",
                "title": "Total Bytes",
                "content": "Displays the total number of bytes transmitted and received by the client device since the beginning of the session or the last counter reset."
            }, {
                "type": "name",
                "title": "Current Packets",
                "content": "Displays the current number of packets transmitted and received at a specific time interval."
            }, {
                "type": "name",
                "title": "Current Bytes",
                "content": "Displays the current number of bytes transmitted and received at a specific time interval."
            }, {
                "type": "name",
                "title": "Current ICMP Tx",
                "content": "Displays the current transmission rate and the maximum transmission rate of ICMP packets transmitted through the WAN port per second."
            }, {
                "type": "name",
                "title": "Current UDP Tx",
                "content": "Displays the current transmission rate and the maximum transmission rate of UDP packets transmitted through the WAN port per second."
            }, {
                "type": "name",
                "title": "Current SYN Tx",
                "content": "Displays the current transmission rate and the maximum transmission rate of TCP SYN packets transmitted through the WAN port per second."
            }, {
                "type": "name",
                "title": "Modify",
                "content": "Displays options to Reset (to zero) and Delete the corresponding statistic from the list."
            }, {
                "type": "name",
                "title": "Refresh",
                "content": "Click to update the statistic information on the page."
            }, {
                "type": "name",
                "title": "Reset",
                "content": "Click to reset all statistic values in the list to zero."
            }, {
                "type": "name",
                "title": "Delete All",
                "content": "Click to delete all statistic information in the list."
            }]
        },
        "sysconf": {
            "TITLE": "Wireless Advanced Settings 2.4GHz | 5GHz-1 | 5GHz-2",
            "CONTENT": [{
                "type": "name",
                "title": "Beacon Interval",
                "content": "Enter a value between 25 and 1000 in milliseconds to determine the duration between beacon packets that are broadcasted by the router to synchronize the wireless network. The default is 100 milliseconds."
            }, {
                "type": "name",
                "title": "RTS Threshold",
                "content": "Enter a value between 1 and 2346 to determine the packet size of data transmission through the router. By default, the RTS (Request to Send) Threshold size is 2346. If the packet size is greater than the preset threshold, the router sends Request of Send frames to a particular receiving station and negotiates the sending of a data frame, or else the packet will be sent immediately."
            }, {
                "type": "name",
                "title": "DTIM Interval",
                "content": "This value determines the interval of the Delivery Traffic Indication Message (DTIM). Enter a value between 1 and 255 in milliseconds. The default value is 1, indicates the DTIM Interval is the same as Beacon Interval."
            }, {
                "type": "name",
                "title": "Group Key Update Period",
                "content": "Enter the number of seconds to control the time interval for the encryption key automatic renewal. The default is 0, indicating no key renewal."
            }, {
                "type": "name",
                "title": "WMM Feature",
                "content": "The WMM function guarantees the packets with high-priority messages being transmitted preferentially. It is enabled by default and highly recommended."
            }, {
                "type": "name",
                "title": "Short GI Feature",
                "content": "This function is enabled by default and recommended to increase the data capacity by reducing the Guard Interval (GI) time."
            }, {
                "type": "name",
                "title": "AP Isolation Feature",
                "content": "By default, this function is disabled. If you want to confine and restrict all wireless devices connected to your network from interacting with each other, but still able to access the Internet, select the Enable AP Isolation checkbox."
            }, {
                /*"type": "name",
                "title": "WDS Bridging",
                "content": "Enable the WDS (Wireless Distribution System) Bridging feature to allow the router to bridge with another access point (AP) in a wireless local area network (WLAN). If this feature is enabled, configure the following:",
                "children": [{
                    "type": "name",
                    "title": "SSID",
                    "content": "Enter the SSID of the WAP (Wireless Access Point) that the router will connect to as a client or use the Survey feature to find all available networks in the current channel."
                }, {
                    "type": "name",
                    "title": "Survey",
                    "content": "Click this button to scan and display the SSID, BSSID, signal strength, channel, and security information of all available wireless networks within range. Once you select a network, the SSID, MAC Address, and Security will automatically populate."
                }, {
                    "type": "name",
                    "title": "MAC Address (to be bridged)",
                    "content": "Enter the MAC address (BSSID) in 12 hexadecimal characters (0-9, a-f, A-F) format separated by hyphens of the wireless access point that the router will connect to as a client. If you choose the desired AP through the Survey feature, the MAC Address  field is automatically populated."
                }, {
                    "type": "name",
                    "title": "Security",
                    "content": "Select the correct security type of the selected access point, No, WPA-PSK/WPA2-PSK or WEP. If you choose the desired AP through the Survey feature, the Security field is automatically populated.",
                    "children": [{
                        "type": "name",
                        "title": "Password",
                        "content": "This option is available when the security type is WPA-PSK/WPA2-PSK or WEP. Enter the security password of the selected access point."
                    }, {
                        "type": "name",
                        "title": "Type",
                        "content": "This option is only available when the security type is WEP (Wired Equivalent Privacy). Select the appropriate authentication type (Open System or shared Key) used of the selected access point."
                    }, {
                        "type": "name",
                        "title": "WEP Key Format",
                        "content": "This option is only available when the security type is WEP. Select the key format (ASCII or Hexadecimal) used of the selected AP."
                    }]
                }]
            }, {*/
                type: "name",
                title: "Enable WPS",
                content: "Toggle On to enable WPS feature."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
            }, {
            /*add by wuzeyu for led */
				 "type": "title",
				 "title": "Led",
            }, {
                "type": "name",
                "title": "Night Mode",
                "content": "Click enable to use the led night mode."
            }, {
                "type": "name",
                "title": "Period of Night Time",
                "content": "The leds of the router will be turned off when the time of router is during the period of night time, if the night mode is enable."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
		    }, {
		    /*end add*/
                "type": "title",
                "title": "Dos Protection Level Settings"
            }, {
                "type": "paragraph",
                "content": "The DoS Protection Level protects the router from TCP-SYN-Flood, UDP-Flood, and ICMP-Flood attacks."
            }, {
                "type": "name",
                "title": "ICMP-FLOOD Packets Level",
                "content": "Enter a value between 5 and 3600 ICMP packets to trigger the ICMP-FLOOD protection immediately when the number of packets exceeds the preset threshold value."
            }, {
                "type": "name",
                "title": "UDP-FLOOD Packets Level",
                "content": "Enter a value between 5 and 3600 UDP packets to trigger the UDP-FLOOD protection immediately when the number of packets exceeds the preset threshold value."
            }, {
                "type": "name",
                "title": "TCP-FLOOD Packets Level",
                "content": "Enter a value between 5 and 3600 TCP-SYN packets to trigger the TCP-SYN-FLOOD protection immediately when the number of packets exceeds the preset threshold value."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
            }]
        }/*, move to sysConf
        "ledTools": {
            "TITLE": "Led",
            "CONTENT": [{
                "type": "name",
                "title": "Night Mode",
                "content": "Click enable to use the led night mode."
            }, {
                "type": "name",
                "title": "Period of Night Time",
                "content": "The leds of the router will be turned off when the time of router is in the period of night time, if the night mode is enable."
            }, {
                "type": "paragraph",
                "content": "Click Save to save your settings."
            }]
        }
        */
    };
})(jQuery);
