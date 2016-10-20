<<<<<<< HEAD
﻿var str_menu =   new Object()

str_menu.status							=  "Состояние";				
str_menu.wizard							=  "Быстрая настройка"; 
//added by zqq,07.11.22
str_menu.wpsCfg                        	=   "WPS";
	
//end	
str_menu.band							= "Выбор рабочей частоты";
str_menu.ntwMain						=  "Сеть";
str_menu.ntwConnMode					=  "Выход в Интернет"; 
str_menu.ntwMobile						=  "3G";
str_menu.ntwWan							=  "WAN";
str_menu.ntwIptv						=	"IPTV";
str_menu.ntwService						=  "Определение сетевой службы";  											
str_menu.ntwMacClone					=  "Клонирование МАС-адреса";
str_menu.ntwLan							=  "LAN"; 
//added by kuangguiming 24Oct13
str_menu.ntwRussiaVlan					=	"IPTV"; 
//end add by kuangguiming 24Oct13		 
str_menu.ntwFlowBalace					=  "Распределение потока нагрузки";		
str_menu.ntwBandWidth					=  "Пропускная способность"; 		
str_menu.ntwVlan						=  "VLAN"; 			
str_menu.ntwPrtMonitor					=  "Зеркалирование порта";		
str_menu.ntwPrtPara						=  "Параметры порта WAN";				
str_menu.wlanMain						=  "Беспроводной режим";
//add by zhanglipeng 2010-01-06
str_menu.workingModeRpm					=  "Рабочий режим";
//end add 2010-01-06
str_menu.wlanNetwork					=  "Настройки беспроводного режима";
str_menu.wlanMacFlt						=  "Фильтрация МАС-адресов";
//added by zqq,07.11.22
str_menu.wlanAdvCfg                     =  "Расширенные настройки";
//end
str_menu.wlanStation					=  "Статистика беспроводного режима";
str_menu.wlanSecurityRpm                =  "Защита беспроводного режима";
                                         		
//add by Rugemeng 20120903
//str_menu.guestNetwork					=  "Гостевая сеть";
//end add        

//add for Guest_Network
str_menu.guestNetCfg					=  "Гостевая сеть";
str_menu.guestNetWirelessCfg			=  "Настройки беспроводного режима";
str_menu.guestNetUsbCfg					=  "Совместный доступ к устройству хранения данных";
//end for add

str_menu.dhcpServerMain					=  "DHCP";				
str_menu.dhcpServer						=  "Настройки DHCP";	
str_menu.dhcpList						=  "Список клиентов DHCP";
str_menu.dhcpFixMap						=  "Резервирование адресов";  

/* added by kuangguiming 26Sep12 for WR842ND2.0 VPN */
str_menu.vpnMain						=  "VPN";
str_menu.vpnIke							=  "IKE";
str_menu.vpnIpsec						=  "IPsec";
str_menu.vpnSaList						=  "Список Security Alliance";
/* end add by kuangguiming 26Sep12 */

// modified by HouXB
str_menu.nasMain						=	"Настройки USB";
str_menu.nasCfg							= 	"Общий доступ к устройству хранения данных";
//added by Zhao C.F.
str_menu.nasFtpCfg						=	"FTP-сервер";
str_menu.nasUserCfg						= 	"Учетные записи пользователей";
                                         
/* add media server menu by HouXB, 16Sep10 */
str_menu.nasMediaSvCfg					=	"Медиа-сервер";
/* end add by HouXB, 16Sep10 */

/* added by tf, 110421 */
str_menu.nasPrintSvCfg					=	"Принт-сервер";
/* end added */                                     

//added by hwz,2010-11-22 
str_menu.nat							=	"NAT";

str_menu.frwVrtMain						=  "Переадресация"; 			
str_menu.frwVrtServer					=  "Виртуальные серверы";	
str_menu.frwSpcApp						=  "Port Triggering"; 
str_menu.frwDMZ							=  "DMZ";
/* for Smart DMZ */
str_menu.frwSmartDMZ					=  "DMZ/Smart DMZ";                                	                        
str_menu.frwUpnp						=  "UPnP";	
                                         	
// Added by WSY
str_menu.securityMain					=	"Безопасность";
str_menu.basicSecurity					=	"Настройки базовой защиты";
str_menu.localManageControl				=	"Локальное управление";	
                                         	
str_menu.scrWzdFrwMain					=  "Безопасность";		
str_menu.scrWzdFrw						=  "Мастер настройки межсетевого экрана"; 
str_menu.scrFrwMain                     =  "Безопасность"; 			
str_menu.scrFrw							=  "Межсетевой экран";
str_menu.scrWanIpFlt					=  "Фильтрация по IP-адресам";
str_menu.scrDomainFlt					=  "Фильтрация по доменным именам"		
str_menu.scrmacFlt						=  "Фильтрация по MAC-адресам";
str_menu.scrMagControl					=  "Удаленное управление";			
str_menu.scrScreen						=  "Экран"; 	
str_menu.scrAdvScr						=  "Расширенные настройки защиты";
str_menu.scrPing						=  "Ping"; 		                       		                  
str_menu.scrWanPing						=  "WANPingN";	
                                         		
//add by caishaoji, 08.11.31
str_menu.parentCtrl						=	"Родительский контроль";

str_menu.accCtrlMain					=	"Контроль доступа";
str_menu.accCtrlHost					=	"Узел";
str_menu.accCtrlTarget					=	"Цель";
str_menu.accCtrlTime					=	"Расписание";
str_menu.accCtrlMan						=	"Правило";
//add end	
                                         		
str_menu.staRoute						=  "Расширенные настройки маршрутизации";
str_menu.staRouteTable                  =   "Список статических маршрутов";
str_menu.sysRouteTable					=   "Таблица маршрутизации";
                                         	
str_menu.sessionMain					=  "Ограничение сессии";	
str_menu.sessionLimit					=  "Ограничение сессии";
str_menu.sessionList					=  "Список сессий"; 
   
str_menu.QosCfgMain						=  "Контроль пропускной способности";	
str_menu.QosCfg							=  "Параметры контроля";	
str_menu.QosRuleList					=  "Список правил";
      
str_menu.lanArpMain						=  "Привязка IP- и MAC-адресов";		
str_menu.lanArpBind						=  "Параметры привязки"; 	
str_menu.lanArpList						=  "Таблица ARP"; 		
         
str_menu.ddnsAddMain					=  "Динамический DNS";
   
                                         	
str_menu.swtMain						=  "Параметры коммутатора"; 	
str_menu.swtPortSta						=  "Статистика порта"; 	
str_menu.swtPortMirror					=  "Зеркалирование порта"; 		
str_menu.swtPortRateSet					=  "Настройки пропускной способности порта";
str_menu.swtPortPara					=  "Настройки порта";		
str_menu.swtPortStatus					=  "Состояние порта";		
     
str_menu.swtPortBaseVlan				=  "Порт VLAN";
        
str_menu.ipv6Conf						=	"Поддержка IPv6";
str_menu.ipv6Lan						=	"Состояние IPv6";
str_menu.ipv6Wan						=	"Настройка IPv6";
		
str_menu.systoolMain					=  "Системные инструменты";	
str_menu.sysTime						=  "Настройка времени";			
str_menu.sysDiagnostic					=  "Диагностика";
str_menu.sysSoftUpgrade					=  "Обновление встроенного ПО";
str_menu.sysRstDefault					=  "Заводские настройки";
                                         
str_menu.sysBackupRst					=  "Резервная копия и восстановление";
                                        		
str_menu.sysReboot						=  "Перезагрузка";
str_menu.tr069Settings					=  "TR069";
str_menu.sysPassword					=  "Пароль";
str_menu.sysLog							=  "Системный журнал";
str_menu.sysWatchDog				=  "Ping Watch Dog";
str_menu.snmp							= "SNMP";
                                         
str_menu.sysLogSet						=  "Параметры Системного журнала";
str_menu.sessionRefresh                 =   "Обновить сессию";
                                         
str_menu.sysManageCnt					=  "Удаленное управление";
                                         
str_menu.sysSta							=  "Статистика";

str_menu.wanSpdDet						= "Определение скорости WAN";

str_menu.natShow						=  "Показать NAT";

str_menu.natSrcPortSetting				= "Настройка порта NAT";
                                       
str_menu.ProductMain					=  "Продукт";

str_menu.wanBalancePolicy				= "Параметры распределения нагрузки";

=======
﻿var str_menu =   new Object()

str_menu.status							=  "Состояние";				
str_menu.wizard							=  "Быстрая настройка"; 
//added by zqq,07.11.22
str_menu.wpsCfg                        	=   "WPS";
	
//end	
str_menu.band							= "Выбор рабочей частоты";
str_menu.ntwMain						=  "Сеть";
str_menu.ntwConnMode					=  "Выход в Интернет"; 
str_menu.ntwMobile						=  "3G";
str_menu.ntwWan							=  "WAN";
str_menu.ntwIptv						=	"IPTV";
str_menu.ntwService						=  "Определение сетевой службы";  											
str_menu.ntwMacClone					=  "Клонирование МАС-адреса";
str_menu.ntwLan							=  "LAN"; 
//added by kuangguiming 24Oct13
str_menu.ntwRussiaVlan					=	"IPTV"; 
//end add by kuangguiming 24Oct13		 
str_menu.ntwFlowBalace					=  "Распределение потока нагрузки";		
str_menu.ntwBandWidth					=  "Пропускная способность"; 		
str_menu.ntwVlan						=  "VLAN"; 			
str_menu.ntwPrtMonitor					=  "Зеркалирование порта";		
str_menu.ntwPrtPara						=  "Параметры порта WAN";				
str_menu.wlanMain						=  "Беспроводной режим";
//add by zhanglipeng 2010-01-06
str_menu.workingModeRpm					=  "Рабочий режим";
//end add 2010-01-06
str_menu.wlanNetwork					=  "Настройки беспроводного режима";
str_menu.wlanMacFlt						=  "Фильтрация МАС-адресов";
//added by zqq,07.11.22
str_menu.wlanAdvCfg                     =  "Расширенные настройки";
//end
str_menu.wlanStation					=  "Статистика беспроводного режима";
str_menu.wlanSecurityRpm                =  "Защита беспроводного режима";
                                         		
//add by Rugemeng 20120903
//str_menu.guestNetwork					=  "Гостевая сеть";
//end add        

//add for Guest_Network
str_menu.guestNetCfg					=  "Гостевая сеть";
str_menu.guestNetWirelessCfg			=  "Настройки беспроводного режима";
str_menu.guestNetUsbCfg					=  "Совместный доступ к устройству хранения данных";
//end for add

str_menu.dhcpServerMain					=  "DHCP";				
str_menu.dhcpServer						=  "Настройки DHCP";	
str_menu.dhcpList						=  "Список клиентов DHCP";
str_menu.dhcpFixMap						=  "Резервирование адресов";  

/* added by kuangguiming 26Sep12 for WR842ND2.0 VPN */
str_menu.vpnMain						=  "VPN";
str_menu.vpnIke							=  "IKE";
str_menu.vpnIpsec						=  "IPsec";
str_menu.vpnSaList						=  "Список Security Alliance";
/* end add by kuangguiming 26Sep12 */

// modified by HouXB
str_menu.nasMain						=	"Настройки USB";
str_menu.nasCfg							= 	"Общий доступ к устройству хранения данных";
//added by Zhao C.F.
str_menu.nasFtpCfg						=	"FTP-сервер";
str_menu.nasUserCfg						= 	"Учетные записи пользователей";
                                         
/* add media server menu by HouXB, 16Sep10 */
str_menu.nasMediaSvCfg					=	"Медиа-сервер";
/* end add by HouXB, 16Sep10 */

/* added by tf, 110421 */
str_menu.nasPrintSvCfg					=	"Принт-сервер";
/* end added */                                     

//added by hwz,2010-11-22 
str_menu.nat							=	"NAT";

str_menu.frwVrtMain						=  "Переадресация"; 			
str_menu.frwVrtServer					=  "Виртуальные серверы";	
str_menu.frwSpcApp						=  "Port Triggering"; 
str_menu.frwDMZ							=  "DMZ";
/* for Smart DMZ */
str_menu.frwSmartDMZ					=  "DMZ/Smart DMZ";                                	                        
str_menu.frwUpnp						=  "UPnP";	
                                         	
// Added by WSY
str_menu.securityMain					=	"Безопасность";
str_menu.basicSecurity					=	"Настройки базовой защиты";
str_menu.localManageControl				=	"Локальное управление";	
                                         	
str_menu.scrWzdFrwMain					=  "Безопасность";		
str_menu.scrWzdFrw						=  "Мастер настройки межсетевого экрана"; 
str_menu.scrFrwMain                     =  "Безопасность"; 			
str_menu.scrFrw							=  "Межсетевой экран";
str_menu.scrWanIpFlt					=  "Фильтрация по IP-адресам";
str_menu.scrDomainFlt					=  "Фильтрация по доменным именам"		
str_menu.scrmacFlt						=  "Фильтрация по MAC-адресам";
str_menu.scrMagControl					=  "Удаленное управление";			
str_menu.scrScreen						=  "Экран"; 	
str_menu.scrAdvScr						=  "Расширенные настройки защиты";
str_menu.scrPing						=  "Ping"; 		                       		                  
str_menu.scrWanPing						=  "WANPingN";	
                                         		
//add by caishaoji, 08.11.31
str_menu.parentCtrl						=	"Родительский контроль";

str_menu.accCtrlMain					=	"Контроль доступа";
str_menu.accCtrlHost					=	"Узел";
str_menu.accCtrlTarget					=	"Цель";
str_menu.accCtrlTime					=	"Расписание";
str_menu.accCtrlMan						=	"Правило";
//add end	
                                         		
str_menu.staRoute						=  "Расширенные настройки маршрутизации";
str_menu.staRouteTable                  =   "Список статических маршрутов";
str_menu.sysRouteTable					=   "Таблица маршрутизации";
                                         	
str_menu.sessionMain					=  "Ограничение сессии";	
str_menu.sessionLimit					=  "Ограничение сессии";
str_menu.sessionList					=  "Список сессий"; 
   
str_menu.QosCfgMain						=  "Контроль пропускной способности";	
str_menu.QosCfg							=  "Параметры контроля";	
str_menu.QosRuleList					=  "Список правил";
      
str_menu.lanArpMain						=  "Привязка IP- и MAC-адресов";		
str_menu.lanArpBind						=  "Параметры привязки"; 	
str_menu.lanArpList						=  "Таблица ARP"; 		
         
str_menu.ddnsAddMain					=  "Динамический DNS";
   
                                         	
str_menu.swtMain						=  "Параметры коммутатора"; 	
str_menu.swtPortSta						=  "Статистика порта"; 	
str_menu.swtPortMirror					=  "Зеркалирование порта"; 		
str_menu.swtPortRateSet					=  "Настройки пропускной способности порта";
str_menu.swtPortPara					=  "Настройки порта";		
str_menu.swtPortStatus					=  "Состояние порта";		
     
str_menu.swtPortBaseVlan				=  "Порт VLAN";
        
str_menu.ipv6Conf						=	"Поддержка IPv6";
str_menu.ipv6Lan						=	"Состояние IPv6";
str_menu.ipv6Wan						=	"Настройка IPv6";
		
str_menu.systoolMain					=  "Системные инструменты";	
str_menu.sysTime						=  "Настройка времени";			
str_menu.sysDiagnostic					=  "Диагностика";
str_menu.sysSoftUpgrade					=  "Обновление встроенного ПО";
str_menu.sysRstDefault					=  "Заводские настройки";
                                         
str_menu.sysBackupRst					=  "Резервная копия и восстановление";
                                        		
str_menu.sysReboot						=  "Перезагрузка";
str_menu.tr069Settings					=  "TR069";
str_menu.sysPassword					=  "Пароль";
str_menu.sysLog							=  "Системный журнал";
str_menu.sysWatchDog				=  "Ping Watch Dog";
str_menu.snmp							= "SNMP";
                                         
str_menu.sysLogSet						=  "Параметры Системного журнала";
str_menu.sessionRefresh                 =   "Обновить сессию";
                                         
str_menu.sysManageCnt					=  "Удаленное управление";
                                         
str_menu.sysSta							=  "Статистика";

str_menu.wanSpdDet						= "Определение скорости WAN";

str_menu.natShow						=  "Показать NAT";

str_menu.natSrcPortSetting				= "Настройка порта NAT";
                                       
str_menu.ProductMain					=  "Продукт";

str_menu.wanBalancePolicy				= "Параметры распределения нагрузки";

>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
str_menu.logout							=   "Выход";