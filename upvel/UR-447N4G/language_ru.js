
var language_sel='язык';
var language_en='English';
var language_ru='русский';
var language_sc='简体中文';

var reboot_confirm="Вы действительно хотите, чтобы перезагрузить маршрутизатор?";
var page_title='Wi-Fi роутер';
var save_changes='Сохранить изменения';
var ghz_ghz='ГГц';
var refresh_refresh = ' Обновить ';

var msg_invalid_ip='Некорректный IP-адрес!';
var msg_no_css_err='Ошибка! Включите поддержку CSS в вашем браузере!';

var ipaddr = 'IP-адрес';
var macaddr = 'MAC-адрес';
var leasetime = 'Оставшееся время аренды (сек.)';
var save_ch = 'Сохранить изменения';
var apply = 'Применить';
var reset = 'Сбросить';
var enable = 'Активировать';
var disable = 'Отключить';
var mbps = 'МБит/с';
var numberchar = '№';
var on = 'Вкл.';
var off = 'Выкл.';
var speedrate = 'Скорость';


/*****************dhcptbl.htm************************/
var dhcptbl_clients = 'DHCP-клиенты';
var dhcptbl_tbl = 'Все DHCP-клиенты вашего роутера отображены в этой таблице.';


/*****************syscmd.htm************************/
var syscmd_header = 'Системные команды';
var syscmd_explain = ' На этой странице вы можете запускать системные команды.';
var syscmd_command = 'Системная команда:';
var syscmd_apply = 'Запустить';
var syscmd_refresh = 'Обновить';
var syscmd_alert1 = 'Пожалуйста, введите "-c num" в команду ping';
var syscmd_alert2 = 'Поле не может быть пустым';



/***********	wlstatbl.htm	************/
var wlstatbl_tbl_name = 'Список подключенных устройств';
var wlstatbl_explain = ' Данная таблица отображает информацию о каждом активном беспроводном клиенте: MAC-адрес, количество принятых и переданных пакетов и тип шифрования.';
var wlstatbl_mac = 'MAC-адрес';
var wlstatbl_mode = 'Режим';
var wlstatbl_tx = 'Отправленные пакеты';
var wlstatbl_rx = 'Принятые пакеты';
var wlstatbl_tx_rate ='Скорость соединения (Мбит/с)';
var wlstatbl_ps = 'Энергосбережение';
var wlstatbl_expired_time = 'Оставшееся время аренды (сек.)';
var wlstatbl_refresh = 'Обновить';
var wlstatbl_close = 'Закрыть';


/****************msg.htm**************************/
var save_set_ok = 'Настройки успешно сохранены!';
var reboot_router = 'Изменения были сохранены. Перезагрузите роутер, чтобы настройки вступили в силу.';
var reboot_later = 'Вы можете перезагрузить роутер позже, если вы хотите внести дальнейшие изменения прямо сейчас.';
var back_button = '<< Назад';


/*******************countdownpage.htm*****************************/
var change_set_ok = 'Готово!';
var not_turn_off = 'Не выключайте и не перезагружайте устройство.';
var please_wait = 'Пожалуйста, подождите ';
var second = 'сек.';
var countdownpage_wait = 'Пожалуйста, подождите немного и откройте страницу заново, чтобы настроить ваш роутер.';


/***********	password.htm	************/
var password_header = 'Задание пароля';
var password_header_explain = ' На этой странице вы можете изменить имя пользователя и пароль доступа к веб-интерфейсу роутера. Если вы хотите отключить защиту, оставьте поля логина и пароля пустыми и нажмите <b>Сохранить Изменения</b>.';
var password_user_name = 'Имя пользователя:';
var password_user_passwd = 'Новый пароль:';
var password_user_passwd_confm = 'Подтверждение пароля:';
var password_apply = 'Сохранить изменения';
var password_user_empty = 'Имя пользователя не задано.\nВы действительно хотите отключить защиту паролем?';
var password_passwd_unmatched = 'Пароли не совпадают. Пожалуйста, введите новый пароль ещё раз.';
var password_passwd_empty = 'Поле пароля не может быть пустым. Пожалуйста, попробуйте ещё раз';
var password_user_invalid = 'К сожалению, пробел - недопустимый символ для имени пользователя. Попробуйте ещё раз.';
var password_passwd_invalid = 'К сожалению, пробел - недопустимый символ для пароля. Попробуйте ещё раз.';
var password_reset = '  Отмена  ';



/***********	saveconf.htm	************/
var saveconf_header = 'Сохранение/Загрузка настроек';
var saveconf_header_explain = ' На этой странице вы можете сохранить текущие настройки в файл или загрузить сохранённые ранее. Вы также можете сбросить все настройки и установить заводские.';
var saveconf_save_to_file = '<b>Сохранить в файл:</b>';
var saveconf_save = 'Сохранить...';
var saveconf_load_from_file = '<b>Загрузить из файла:</b>';
var saveconf_load = 'Загрузить';
var saveconf_reset_to_default = '<b>Установить настройки по умолчанию:</b>';
var saveconf_reset = 'Reset';
var saveconf_load_from_file_empty = 'Пожалуйста, выберите файл!';
var saveconf_reset_to_default_confm = 'Вы действительно хотите сбросить ваши настройки и установить заводские?';


/***********	upload.htm	************/
var upload_header = 'Обновление микропрограммного обеспечения';
var upload_header_explain = ' На данной странице вы можете обновить микропрограммное обеспечение (прошивку) вашего роутера. ПРЕДУПРЕЖДЕНИЕ: не выключайте устройство во время обновления, это может привести к выходу роутера из строя.';
var upload_version = 'Версия прошивки:';
var upload_file_select = 'Выбрать файл:';
var upload_send = 'Обновить';
var upload_reset = 'Отмена';
var upload_up_failed = 'Не удалось обновить прошивку!';
var upload_send_file_empty = 'Имя файла не может быть пустым!';



/***********	firewall	************/
var firewall_proto = 'Протокол:';
var firewall_proto_both = 'Оба';
var firewall_proto_tcp = 'TCP';
var firewall_proto_udp = 'UDP';
var firewall_add_rule = 'Add rule';
var firewall_apply = 'Сохранить изменения';
var firewall_reset = 'Отмена';
var firewall_filtertbl = 'Текущий фильтр таблицы:';
var firewall_delete_select = 'Удалить выделенные';
var firewall_delete_all = 'Удалить все';

var firewall_delete_selectconfm = 'Вы действительно хотите удалить выделенные пункты?';
var firewall_delete_allconfm = 'Вы действительно хотите удалить все пункты?';
var firewall_ipaddr_invalid = 'Неверное значение IP-адреса';
var firewall_port_notdecimal = 'Неверный номер порта! Пожалуйста, укажите десятичное число.';
var firewall_port_toobig = 'Неверный номер порта! Пожалуйста, укажите значение от 1 до 65535.';
var firewall_port_rangeinvalid = 'Неверный диапазон портов! Номер первого порта должен быть меньше, чем номер второго.';



var firewall_local_ipaddr = 'Локальный IP-адрес:';
var firewall_port_range = 'Диапазон портов: ';
var firewall_comm = 'Комментарий:';

var firewall_tbl_proto = 'Протокол';
var firewall_tbl_comm = 'Комментарий';
var firewall_tbl_select = 'Выбрать';
var firewall_tbl_localipaddr = 'Локальный IP-адрес';
var firewall_portrange = 'Порт (Диапазон портов)';

/***********	portfilter.htm	************/
var portfilter_header = 'Фильтрация по номерам портов';
var portfilter_header_explain = ' Данная функция блокирует передачу из Вашей локальной сети в Интернет только тех пакетов, заголовок которых содержит номер порта, указанный в таблице фильтрации. ';
var portfiletr_enable = 'Включить фильтр портов';
var portfilter_noport = 'Сначала вам необходимо указать диапазон портов.';


/***********	ipfilter.htm	************/
var ipfilter_header = 'Фильтрация по IP-адресам';
var ipfilter_header_explain = ' На этой странице вы можете блокировать доступ по IP-адресам.';
var ipfilter_enable = 'Включить фильтрацию по IP';
var ipfilter_ipv4_enable = 'Включить IPv4';
var ipfilter_ipv6_enable = 'Включить IPv6';
var ipfilter_local_ipv4 = 'Локальный IPv4-адрес:';
var ipfilter_local_ipv6 = 'Локальный IPv6-адрес:';
var ipfilter_ipv6 = 'IPv6-адрес:';

/***********	Macfilter.htm	************/
var macfilter_header = 'Фильтрация по MAC-адресам';
var macfilter_header_explain =  ' На этой странице вы можете блокировать доступ по MAC-адресам.';
var macfilter_enable = 'Включить фильтрацию по MAC-адресам';
var macfilter_macaddr = 'MAC-адрес';
var macfilter_macaddr_nocomplete = 'MAC-адрес введён не полностью. Он должен представлять собой 12 шестнадцатеричных цифр.';
var macfilter_macaddr_nohex = 'Некорректный MAC-адрес. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).';
var macfilter_filterlist_macaddr = 'MAC-адрес';

/***********	Portfw.htm	************/
var portfw_header = 'Перенаправление портов';
var portfw_header_explain = 'Данная функция автоматически перенаправляет запросы определенных сервисов из Интернета на соответствующий хост Вашей локальной сети, находящийся за межсетевым экраном роутера. Использовать данную функцию следует в том случае, если Вы хотите создать в локальной сети за межсетевым экраном роутера какой-либо сервер (например, Web-сервер или почтовый сервер).';//need xiugai
var portfw_enable = 'Включить перенаправление портов';
var portfw_ipaddr = 'IP-адрес:';
var portfw_apply_port_empty = 'Диапазон портов не может быть пустым! Пожалуйста, укажите значение между 1 и 65535.';
var portfw_tbl = 'Таблица перенаправления портов:';

/***********	urlfilter.htm	************/
var urlfilter_header = 'Фильтрация по URL';
var urlfilter_header_explain = ' На этой странице вы можете запретить доступ к определённым URL.';
var urlfilter_enable = 'Включить фильтрацию по URL';
var urlfilter_urladdr = 'URL-адрес';
var urlfilter_apply_error = 'Недопустимый символ: \";\"';
var urlfilter_filterlist_yrladdr = 'URL Address';
var urlfilter_white = 'Белый список (запрещать все, кроме указанных)';
var urlfilter_black = 'Чёрный список (разрешать все, кроме указанных)';

/***********	dmz.htm	************/
var dmz_header = 'DMZ';
var dmz_header_explain = 'DMZ (демилитаризованная зона) позволяет открыть неограниченный доступ из Интернета к серверу локальной сети, но при этом ограничить доступ через данный сервер к основным сегментам локальной сети с помощью межсетевого экрана. Как правило, хост в DMZ включает в себя устройства, принимающие трафик из Интернета, такие как Web-серверы (HTTP), FTP-серверы, SMTP-серверы (электронная почта) и DNS-серверы.';
var dmz_enable = 'Включить DMZ';
var dmz_host_ipaddr = 'IP-адрес хоста в DMZ:';


/***********	dos.htm	************/
var dos_header = 'Защита от DoS-атак';
var dos_header_explain = ' DoS-атака (Denial of Service, отказ в обслуживании) направлена на затруднение или блокирование доступа к предоставляемым системой ресурсам.';
var dos_enable = 'Включить защиту от DoS-атак';
var dos_packet_sec = ' Пакетов в секунду';
var dos_sysflood_syn = 'Whole System Flood: SYN';
var dos_sysflood_fin = 'Whole System Flood: FIN';
var dos_sysflood_udp = 'Whole System Flood: UDP';
var dos_sysflood_icmp = 'Whole System Flood: ICMP';
var dos_ipflood_syn = 'Per-Source IP Flood: SYN';
var dos_ipflood_fin = 'Per-Source IP Flood: FIN';
var dos_ipflood_udp = 'Per-Source IP Flood: UDP';
var dos_ipflood_icmp = 'Per-Source IP Flood: ICMP';
var dos_portscan = 'TCP/UDP PortScan';
var dos_portscan_low = 'Low';
var dos_portscan_high = 'High';
var dos_portscan_sensitivity = ' Чувствительность';
var dos_icmp_smurf = 'ICMP Smurf';
var dos_ip_land = 'IP Land';
var dos_ip_spoof = 'IP Spoof';
var dos_ip_teardrop = 'IP TearDrop';
var dos_pingofdeath = 'PingOfDeath';
var dos_tcp_scan = 'TCP Scan';
var dos_tcp_synwithdata = 'TCP SynWithData';
var dos_udp_bomb = 'UDP Bomb';
var dos_udp_echochargen = 'UDP EchoChargen';
var dos_select_all = ' Выбрать всё ';
var dos_clear_all = ' Очистить всё ';
var dos_enable_srcipblocking = 'Включить блокирование IP-адресов источников';
var dos_block_time = 'Продолжительность блокировки (сек.)';
var dos_apply = 'Сохранить изменения';



/***********	route.htm ************/
var route_header = 'Настройки маршрутизации';
var route_header_explain = 'На этой странице вы можете настроить динамический протокол маршрутизации либо добавить или отредактировать записи статических маршрутов.';
var route_enable = 'Включить';
var route_disable = 'Отключить';
var route_apply = 'Сохранить изменения';
var route_reset = 'Сбросить';

var route_dynamic = 'Включить динамическую маршрутизацию';
var route_nat = 'NAT:';
var route_nat_enable = 'Вкл';
var route_nat_disable = 'Выкл';
var route_transmit = 'Передача';
var route_receive = 'Приём';
var route_rip = 'Выкл';
var route_rip1 = 'RIP 1';
var route_rip2 = 'RIP 2';
var route_static = 'Включить статическую маршрутизацию';
var route_ipaddr = 'IP-адрес:';
var route_mask = 'Маска подсети:';
var route_gateway = 'Шлюз:';
var route_metric = 'Метрика:';
var route_interface = 'Интерфейс:';
var route_lan = 'LAN';
var route_wan = 'WAN';
var route_showtbl = 'Показать таблицу маршрутов';

var route_static_tbl = 'Таблица статических маршрутов';

var route_tbl_destip = 'IP-адрес назначения';
var route_tbl_mask = 'Маска ';
var route_tbl_gateway = 'Шлюз ';
var route_tbl_metric = 'Метрика ';
var route_tbl_inter = 'Интерфейс ';
var route_tbl_select = 'Выбрать';

var route_deletechick_warn = 'Вы действительно хотите удалить выбранные пункты?';
var route_deleteall_warn = 'Вы действительно хотите удалить все пункты?';
var route_deletechick = 'Удалить выбранные';
var route_deleteall = 'Удалить все';

var route_addchick0 = 'Неверное значение IP-адреса! ';
var route_addchick1 = 'Неверное значение IP-адреса! ';
var route_addchick2 = 'Неверный адрес шлюза! ';
var route_addchick3 = 'Неверное значение метрики! Укажите значение от 1 до 15.';
var route_checkip1 = 'Поле IP-адреса не может быть пустым. Он должен состоять из четырёх десятичных чисел (вида xxx.xxx.xxx.xxx).';
var route_checkip2 = ' значение. Пожалуйста, укажите десятичное число.';
var route_checkip3 = ' диапазон в первом числе. Укажите число в диапазоне от 1 до 223.';
var route_checkip4 = ' диапазон во втором числе. Укажите число в диапазоне от 0 до 255.';
var route_checkip5 = ' диапазон в третьем числе. Укажите число в диапазоне от 0 до 255.';
var route_checkip6 = ' диапазон в четвёртом числе. Укажите число в диапазоне от 0 до 255.';
var route_validnum = 'Неверное значение. Пожалуйста, укажите десятичное число.';
var route_setrip = 'Вы не можете отключать NAT, используя PPP!';

/***********	routetbl.htm ************/
var routetbl_header = 'Таблица маршрутов ';
var routetbl_header_explain = ' В данной таблице показаны все записи маршрутов .';
var routetbl_refresh = 'Обновить';
var routetbl_close = ' Закрыть ';
var routetbl_dst = 'IP-адрес назначения';
var routetbl_gw = 'Шлюз';
var routetbl_mask = 'Маска подсети';
var routetbl_flag = 'Flags';
var routetbl_iface = 'Интерфейс';
var routetbl_type = 'Тип';


/***********	util_gw.htm ************/
var util_gw_wps_warn1 = 'SSID было сконфигурировано при помощи WPS. Любые изменения настроек ';
var util_gw_wps_warn2 = 'Режим точки доступа был сконфигурирован при помощи WPS. Любые изменения настроек ';
var util_gw_wps_warn3 = 'Настройки безопасности были сконфигурированы при помощи WPS. Любые изменения настроек ' ;
var util_gw_wps_warn4 = 'Корпоративная аутентификация WPA (RADIUS) не поддерживается WPS. ';
var util_gw_wps_warn5 = 'Метод аутентификации 802.1x не поддерживается WPS. ';
var util_gw_wps_warn6 = 'Режим WDS не поддерживается WPS. ';
var util_gw_wps_warn7 = 'Специальный Клиент не поддерживается WPS. ';
var util_gw_wps_cause_disconn = 'могут привести к разъединению. ';
var util_gw_wps_want_to = 'Вы уверены, что хотите продолжить работу с новыми настройками?';
var util_gw_wps_cause_disabled = 'При использовании данной конфигурации функция WPS будет недоступна. ';
var util_gw_wps_ecrypt_11n = 'Неверный тип шифрования! Для стандарта 802.11n должен использоваться метод шифрования WPA или WPA2, с набором шифров AES.';
var util_gw_wps_ecrypt_basic = 'Метод шифрования не подходит для стандарта 802.11n. Пожалуйста, измените настройки WLAN.';
var util_gw_wps_ecrypt_confirm = 'Вы уверены, что хотите применить данный тип шифрования для стандарта 802.11n? Это может привести к снижению производительности беспроводной сети.';
var util_gw_ssid_hidden_alert = "При скрытом SSID режим WPS2.0 будет недоступен";
var util_gw_ssid_empty = 'SSID не может быть пустым!';
var util_gw_preshared_key_length_alert =  'Значение Pre-Shared Key должно стостоять из 64 символов.';
var util_gw_preshared_key_alert = "Некорректное значение Pre-Shared Key. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).";
var util_gw_preshared_key_min_alert = 'Pre-Shared Key должен содержать восемь символов или больше.';
var util_gw_preshared_key_max_alert = 'Pre-Shared Key должен содержать меньше 64 символов.';
var util_gw_decimal_rang = 'Он должен представлять собой десятичное число от 1 до 65535.';
var util_gw_invalid_radius_port = 'Некорректный номер порта сервера RADIUS! ';
var util_gw_empty_radius_port = "Номер порта сервера RADIUS не может быть пустым! ";
var util_gw_invalid_radius_ip = 'Некорректный IP-адрес сервера RADIUS!';
var util_gw_mask_empty = 'Маска подсети не может быть пустой! ';
var util_gw_ip_format = 'Он должен представлять собой четыре числовых значения следующего вида: xxx.xxx.xxx.xxx.';
var util_gw_mask_rang = '\nОно должно представлять собой одно из чисел: 0, 128, 192, 224, 240, 248, 252 or 254';
var util_gw_mask_invalid1 = 'Первое число в маске подсети введено неверно.';
var util_gw_mask_invalid2 = 'Второе число в маске подсети введено неверно.';
var util_gw_mask_invalid3 = 'Третье число в маске подсети введено неверно.';
var util_gw_mask_invalid4 = 'Четвёртое число в маске подсети введено неверно.';
var util_gw_mask_invalid = ' Некорретное значение маски подсети. ';
var util_gw_decimal_value_rang = "Оно должно состоять из десятичных цифр (0-9).";
var util_gw_invalid_degw_ip = 'Неверный адрес шлюза по-умолчанию';
var util_gw_invalid_gw_ip = 'Неверный адрес шлюза!';
var util_gw_locat_subnet = '\nОн должен принадлежать к той же подсети, что и текущий IP-адрес.';
var util_gw_mac_complete = 'MAC-адрес введён не полностью. ';
var util_gw_12hex = 'Он должен представлять собой 12 шестнадцатеричных символов (0-9 и a-f).';
var util_gw_invalid_mac = 'Некорректный MAC-адрес. ';
var util_gw_hex_rang = 'Он должен состоять из шестнадцатеричных символов (0-9 и a-f).';
var util_gw_ip_empty = 'IP-адрес не может быть пустым! ';
var util_gw_invalid_value = ' значение. ';
var util_gw_should_be = 'Оно должно представлять собой число от  ';
var util_gw_check_ppp_rang1 = ' диапазон в первом числе. ';
var util_gw_check_ppp_rang2 = ' диапазон во втором числе. ';
var util_gw_check_ppp_rang3 = ' диапазон в третьем числе. ';
var util_gw_check_ppp_rang4 = ' диапазон в третьем числе. ';
var util_gw_check_ppp_rang5 = ' диапазон в пятом числе. ';
var util_gw_invalid_key_length = 'Некорректная длина ';
var util_gw_char = ' символов.';
var util_gw_invalid_wep_key_value = 'Некорректная длина значения WEP-ключа. Он должен составлять ';
var util_gw_invalid_key_value = 'Неверное значение ключа. ';
var util_gw_invalid_ip = 'Некорректный IP-адрес';
var util_gw_ipaddr_empty = 'IP-адрес не может быть пустым! Он должен представлять собой четыре числовых значения следующего вида: xxx.xxx.xxx.xxx.';
var util_gw_ipaddr_nodecimal = '. Оно должно представлять собой четыре десятичных числа следующего вида: xxx.xxx.xxx.xxx.';
var util_gw_ipaddr_1strange = ' диапазон в первом числе. Оно должно представлять собой число от 0 до 255.';
var util_gw_ipaddr_2ndrange = ' диапазон во втором числе. Оно должно представлять собой число от 0 до 255.';
var util_gw_ipaddr_3rdrange = ' диапазон в третьем числе. Оно должно представлять собой число от 0 до 255.';
var util_gw_ipaddr_4thrange = ' диапазон в четвёртом числе. Оно должно представлять собой число от 1 до 254.';

var util_gw_array0 = "(GMT-12:00)Эниветок, Кваджалейн";
var util_gw_array1 = "(GMT-11:00)Мидуэй, Самоа";
var util_gw_array2 = "(GMT-10:00)Гавайи";
var util_gw_array3 = "(GMT-09:00)Аляска";
var util_gw_array4 = "(GMT-08:00)Тихоокеанское время (США и Канада), Тихуана";
var util_gw_array5 = "(GMT-07:00)Аризона";
var util_gw_array6 = "(GMT-07:00)Горное время (США и Канада)";
var util_gw_array7 = "(GMT-06:00)Центральное время (США и Канада)";
var util_gw_array8 = "(GMT-06:00)Мехико, Тегусигальпа";
var util_gw_array9 = "(GMT-06:00)Саскачеван";
var util_gw_array10 = "(GMT-05:00)Богота, Лима, Кито";
var util_gw_array11 = "(GMT-05:00)Восточное время (США и Канада)";
var util_gw_array12 = "(GMT-05:00)Индиана";
var util_gw_array13 = "(GMT-04:00)Атлантическое время (Канада)";
var util_gw_array14 = "(GMT-04:00)Каракас, Ла-Пас";
var util_gw_array15 = "(GMT-04:00)Сантьяго";
var util_gw_array16 = "(GMT-03:30)Ньюфаундленд";
var util_gw_array17 = "(GMT-03:00)Бразилиа";
var util_gw_array18 = "(GMT-03:00)Буэнос-Айрес, Джорджтаун";
var util_gw_array19 = "(GMT-02:00)Среднеатлантическое время";
var util_gw_array20 = "(GMT-01:00)Азорские о-ва, Кабо-Верде";
var util_gw_array21 = "(GMT)Касабланка, Монровия";
var util_gw_array22 = "(GMT)Дублин, Эдинбург, Лиссабон, Лондон";
var util_gw_array23 = "(GMT+01:00)Амстердам, Берлин, Берн, Рим, Стокгольм, Вена";
var util_gw_array24 = "(GMT+01:00)Белград, Братислава, Будапешт, Люблюна, Прага";
var util_gw_array25 = "(GMT+01:00)Барселона, Мадрид";
var util_gw_array26 = "(GMT+01:00)Брюссель, Копенгаген, Вильнюс";
var util_gw_array27 = "(GMT+01:00)Париж";
var util_gw_array28 = "(GMT+01:00)Сараево, Скопье, София, Врашава, Загреб";
var util_gw_array29 = "(GMT+02:00)Афины, Стамбул, Минск";
var util_gw_array30 = "(GMT+02:00)Бухарест";
var util_gw_array31 = "(GMT+02:00)Каир";
var util_gw_array32 = "(GMT+02:00)Хараре, Претория";
var util_gw_array33 = "(GMT+02:00)Хельсинки, Рига, Таллин";
var util_gw_array34 = "(GMT+02:00)Иерусалим";
var util_gw_array35 = "(GMT+03:00)Багдад, Кувейт, Эр-Рияд";
var util_gw_array36 = "(GMT+03:00)Калининград";
var util_gw_array37 = "(GMT+03:00)Найроби";
var util_gw_array38 = "(GMT+03:30)Тегеран";
var util_gw_array39 = "(GMT+04:00)Абу-Даби, Маскат";
var util_gw_array40 = "(GMT+04:00)Москва, Баку";
var util_gw_array41 = "(GMT+04:30)Кабул";
var util_gw_array42 = "(GMT+05:00)Ташкент";
var util_gw_array43 = "(GMT+05:00)Исламабад, Карачи";
var util_gw_array44 = "(GMT+05:30)Бомбей, Калькутта, Дели";
var util_gw_array45 = "(GMT+06:00)Астана, Екатеринбург, Дакка";
var util_gw_array46 = "(GMT+06:00)Коломбо";
var util_gw_array47 = "(GMT+07:00)Бангкок, Ханой, Джакарта";
var util_gw_array48 = "(GMT+08:00)Пекин, Чунцин, Гонконг, Урумчи";
var util_gw_array49 = "(GMT+08:00)Перт";
var util_gw_array50 = "(GMT+08:00)Сингапур";
var util_gw_array52 = "(GMT+09:00)Осака, Саппоро";
var util_gw_array53 = "(GMT+09:00)Сеул";
var util_gw_array54 = "(GMT+09:00)Токио";
var util_gw_array55 = "(GMT+09:30)Аделаида";
var util_gw_array56 = "(GMT+09:30)Дарвин";
var util_gw_array57 = "(GMT+10:00)Якутск";
var util_gw_array58 = "(GMT+10:00)Мельбурн, Сидней";
var util_gw_array59 = "(GMT+10:00)Гуам";
var util_gw_array60 = "(GMT+10:00)Хобарт";
var util_gw_array61 = "(GMT+10:00)Канберра";
var util_gw_array62 = "(GMT+11:00)Владивосток, Соломоновы острова";
var util_gw_array63 = "(GMT+12:00)Окленд, Веллингтон, Магадан";
var util_gw_array64 = "(GMT+12:00)Фиджи";

var util_gw_chanauto = 'Авто';
var uyi_gw_chan_dfsauto = 'Авто(DFS)';


/***********	wlwps.htm	************/
var wlwps_header = 'WPS';
var wlwps_header_explain = 'На этой странице вы можете изменить настройки функции WPS (Wi-Fi Protected Setup). Она поможет вам быстро подключиться к сети вашего роутера, автоматически синхронизировав сетевые настройки.';
var wlwps_wps_disable = 'Запретить WPS';
var wlwps_wps_save = 'Сохранить изменения';
var wlwps_wps_reset = 'Reset';
var wlwps_status = 'Состояние WPS:';
var wlwps_status_conn = 'Настроен';
var wlwps_status_unconn = 'Ненастроен';
var wlwps_status_reset = 'Сбросить настройки';
var wlwps_lockdown_state = 'Автоматическая блокировка при нерабочем состоянии (???)';
var wlwps_self_pinnum = 'Собственный PIN:';
var wlwps_unlockautolockdown = 'Разблокировать';
var wlwps_lockdown_state_locked = 'Заблокировано';
var wlwps_lockdown_state_unlocked = 'Разблокировано';
var wlwps_pbc_title = 'Конфигурация при нажатии кнопки:';
var wlwps_pbc_start_button = 'Запуск PBC';
var wlwps_stopwsc_title = 'Прервать WSC';
var wlwps_stopwsc_button = 'Прервать';
var wlwps_pin_number_title = 'PIN клиента:';
var wlwps_pin_start_button = 'Установить PIN';
var wlwps_keyinfo = 'Текущая информация о кнопке:';
var wlwps_authentication = 'Аутентификация';
var wlwps_authentication_open = 'Open';
var wlwps_authentication_wpa_psk = 'WPA PSK';
var wlwps_authentication_wep_share = 'WEP Shared';
var wlwps_authentication_wpa_enterprise = 'WPA Enterprise';
var wlwps_authentication_wpa2_enterprise = 'WPA2 Enterprise';
var wlwps_authentication_wpa2_psk = 'WPA2 PSK';
var wlwps_authentication_wpa2mixed_psk = 'WPA2-Mixed PSK';
var wlwps_encryption = 'Шифрование';
var wlwps_encryption_none= 'Нет';
var wlwps_encryption_wep = 'WEP';
var wlwps_encryption_tkip = 'TKIP';
var wlwps_encryption_aes = 'AES';
var wlwps_encryption_tkip_aes = 'TKIP+AES';
var wlwps_key = 'Ключ';
var wlwps_pin_conn = 'Конфигурация PIN:';
var wlwps_assign_ssid = 'Присвоить SSID регистратора:';
var wlsps_assign_mac = 'Присвоить MAC-адрес регистратора:';
var wlwps_wpa_save_pininvalid = 'Invalid PIN length! The device PIN is usually four or eight digits long.';
var wlwps_wpa_save_pinnum = 'Invalid PIN! The device PIN must be numeric digits.';
var wlwps_wpa_save_pinchecksum = 'Invalid PIN! Checksum error.';
var wlwps_pinstart_pinlen = 'Некорректная длина PIN! Обычно его значение составляет 8 или 4 цифры.';
var wlwps_pinstart_pinnum = 'Некорректный PIN! Он должен состоять из цифр.';
var wlwps_pinstart_pinchecksum = 'Контрольные суммы не совпадают! Всё равно использовать PIN? ';

var warn_msg1='Функция WPS недоступна, потому что выбран несовместимый режим работы беспроводной сети. ' + 'Обратитесь к Базовым настройкам Wi-Fi и измените их, чтобы воспользоваться WPS.';
var warn_msg2='Функция WPS была отключена автоматически из-за несовместимости с аутентификацией RADIUS. ' + 'Обратитесь к Базовым настройкам Wi-Fi и измените их, чтобы воспользоваться WPS.';
var warn_msg3="PIN сгенерирован. Нажмите Сохранить изменения, чтобы настройки вступили в силу.";




/***********	wlactrl.htm	************/
var wlactrl_onelan_header = 'Управление доступом</p>';
var wlactrl_morelan_header = 'Управление доступом ';
var wlactrl_header_explain = 'Данная функция блокирует (если выбран черный список) или разрешает (если выбран белый список) доступ в Интернет только тем клиентам Вашей локальной сети, MAC-адреса которых внесены в таблицу фильтрации.';
var wlactrl_accmode = 'Контроль доступа по Wi-Fi:';
var wlactrl_accmode_diable = 'Отключить';
var wlactrl_accmode_allowlist = 'Белый список';
var wlactrl_accmode_denylist = 'Чёрный список';
var wlactrl_macaddr = 'MAC-адрес:';
var wlactrl_comment = 'Комментарий:';
var wlactrl_apply = 'Сохранить изменения';
var wlactrl_reset = 'Сброс';
var wlactrl_accctrl_list = 'Текущая таблица контроля доступа';
var wlactrl_delete_select_btn = 'Удалить выбранные';
var wlactrl_delete_all_btn = 'Удалить все';
var wlactrl_fmwlan_macaddr = 'MAC-адрес';
var wlactrl_fmwlan_select = 'Выбрать';
var wlactrl_fmwlan_comment = 'Комментарий';
var wlactrl_apply_explain = 'Если активировать список управления доступом, WPS2.0 будет отключен';
var wlactrl_apply_mac_short = 'MAC-адрес введён не полностью. Он должен представлять собой 12 шестнадцатеричных цифр.';
var wlactrl_apply_mac_invalid = 'Некорректный MAC-адрес. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).';
var wlactrl_delete_result = 'Удаление всех пунктов запретит доступ к роутеру для всех клиентов. Вы уверены?';
var wlactrl_delete_select = 'Вы действительно хотите удалить все записи?';
var wlactrl_delete_all = 'Вы действительно хотите удалить все записи?';




/***********	wladvanced.htm	************/
var wladv_vallid_num_alert = 'Неверное значение. Пожалуйста, введите десятичное число (0-9).';
var wladv_fragment_thre_alert = 'Некорректное значение порога фрагментации. Введите значение в диапазоне 256-2346.';
var wladv_rts_thre_alert = 'Некорректное значение порога RTS. Введите десятичное число в диапазоне 0-2347.';
var wladv_beacon_alert = 'Неверное значение сигнального интервала. Введите десятичное число в диапазоне 20-1024.';
var wladv_header = 'Дополнительные настройки Wi-Fi';
var wladv_explain = ' Данные настройки предусмотрены для пользователей, которые хорошо знают принцип работы Wi-Fi сети. Эти настройки не следует изменять, если вы не знаете, как это отразится на работе устройства.';
var wladv_frg_thre = 'Порог фрагментации:';
var wladv_rts_thre = 'Порог RTS:';
var wladv_beacon_interval = 'Сигнальный интервал:';
var wladv_preamble_type = 'Тип преамбулы:';
var wladv_preamble_long = 'Длинная преамбула';
var wladv_preamble_short = 'Короткая преамбула';
var wladv_iapp = 'IAPP:';
var wladv_iapp_enabled = 'Вкл';
var wladv_iapp_disabled = 'Выкл';
var wladv_protection = 'Защита:';
var wladv_protection_enabled = 'Вкл';
var wladv_protection_disabled = 'Выкл';
var wladv_aggregation = 'Агрегирование:';
var wladv_aggregation_enabled = 'Вкл';
var wladv_aggregation_disabled = 'Выкл';
var wladv_short_gi = 'Короткий защитный интервал:';
var wladv_short_gi_enabled = 'Вкл';
var wladv_short_gi_disabled = 'Выкл';
var wladv_wlan_partition = 'Изоляция беспроводных клиентов:';
var wladv_wlan_partition_enabled = 'Вкл';
var wladv_wlan_partition_disabled = 'Выкл';
var wladv_stbc = 'STBC:';
var wladv_stbc_enabled = 'Вкл';
var wladv_stbc_disabled = 'Выкл';
var wladv_coexist = 'Совместная работа 20/40MHz:';
var wladv_coexist_enabled = 'Вкл';
var wladv_coexist_disabled = 'Выкл';
var wladv_tx_beamform = 'Формирование луча трансмиттера:';
var wladv_tx_beamform_enabled = 'Вкл';
var wladv_tx_beamform_disabled = 'Выкл';
var wladv_rf_power = 'Выходная радиочастотная мощность:';
var wladv_apply = 'Сохранить изменения';
var wladv_reset = ' Сброс ';


/***********	wlwdstbl.htm ************/
var wlwdstbl_header = 'WDS AP Table';
var wlwdstbl_wlan = " wlan";
var wlwdstbl_explain = ' На этой таблице отображена информация по всем подключенным точкам доступа в режиме WDS: MAC-адрес, количество переданных и принятых пакетов, состояние.';
var wlwdstbl_mac = 'MAC-адрес';
var wlwdstbl_tx_pkt = 'Переданные пакеты';
var wlwdstbl_tx_err = 'Ошибки передачи';
var wlwdstbl_tx_rate = 'Скорость передачи (Мбит/с)';
var wlwdstbl_rx_pkt = 'Принятые пакеты';
var wlwdstbl_refresh = 'Обновить';
var wlwdstbl_close = 'Закрыть';
/***********	wlwdsenp.htm ************/
var wlwdsenp_hex = 'Hex';
var wlwdsenp_char = 'символов';
var wlwdsenp_header = 'Настройки безопасности WDS';
var wlwdsenp_wlan = ' -wlan';
var wlwdsenp_explain = 'Здесь вы можете настроить тип защиты WDS. После активации этой функции убедитесь, что каждое WDS-устройство поддерживает один и тот же алгоритм шифрования и ключ.';
var wlwdsenp_wep_key_format = 'Формат ключа WEP:';
var wlwdsenp_encrypt = 'Шифрование:';
var wlwdsenp_wep_key = 'Ключ WEP:';
var wlwdsenp_prekey_format = 'Формат Pre-Shared Key:';
var wlwdsenp_prekey = 'Pre-Shared Key:';
var wlwdsenp_none = 'Нет';
var wlwdsenp_pass = 'Пароль';
var wlwdsenp_bits = 'bits';
var wlwdsenp_apply = "Сохранить изменения";
var wlwdsenp_reset = 'Отменить';



/***********	wlwds.htm	************/
var wlwds_onelan_header = 'Настройки WDS</p>';
var wlwds_morelan_header = 'Настройки WDS ';
var wlwds_header_explain = 'Система WDS (Wireless Distribution System) устанавливает беспроводные соединения с другими точками доступа и объединяет их в единую сеть, что позволяет увеличить зону покрытия Wi-Fi сети. Для этого следует настроить точки доступа на один канал, внести в соответствующую таблицу MAC-адреса точек доступа, с которыми необходимо установить соединение, и включить WDS.';
var wlwds_enable = 'Включить WDS';
var wlwds_mac_addr = 'MAC-адрес';
var wlwds_data_rate = 'Скорость передачи данных:';
var wlwds_rate_auto = 'Авто';
var wlwds_comment = 'Комментарий:';
var wlwds_apply = 'Сохранить изменения"';
var wlwds_reset = 'Сбросить';
var wlwds_set_secu = 'Настройки безопасности';
var wlwd_show_stat = 'Показать статистику';
var wlwds_wdsap_list = 'Current WDS AP List:';
var wlwds_delete_select = 'Удалить выбранные';
var wlwds_delete_all = 'Удалить все';
var wlwds_fmwlan_macaddr ='MAC-адрес';
var wlwds_fmwlan_txrate = 'Скорость передачи (Мбит/с)';
var wlwds_fmwlan_select = 'Выбрать';
var wlwds_fmwlan_comment = 'Комментарий';
var wlwds_macaddr_nocomplete = 'МАС-адрес введён не польностью. Он должен состоять из 12 шестнадцатеричных цифр.';
var wlwds_macaddr_invalid = 'Некорректный MAC-адрес. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).';
var wlwds_delete_chick = 'Вы действительно хотите удалить выбранные пункты?';
var wlwds_delete_allchick = 'Вы действительно хотите удалить все пункты?';


/***********	wlsurvey.htm	************/
var wlsurvey_onewlan_header = 'Поиск Wi-Fi сетей</p>';
var wlsurvey_morewlan_header = 'Поиск Wi-Fi сетей ';
var wlsurvey_header_explain = 'Здесь вы сможете выполнить поиск доступных беспроводных сетей и присоединиться к одной из них, если ваш роутер настроен в режим Wi-Fi клиента.';
var wlsurvey_site_survey = 'Поиск';
var wlsurvey_chan_next = '<input type="button" value="  Next>>" id="next" onClick="saveClickSSID()">';
var wlsurvey_encryption = 'Шифрование:&nbsp;:';
var wlsurvey_encryption_no = 'Нет';
var wlsurvey_encryption_wep = 'WEP';
var wlsurvey_encryption_wpa = 'WPA';
var wlsurvey_encryption_wpa2= 'WPA2';

var wlsurvey_keytype = 'Тип ключа:';
var wlsurvey_keytype_open = 'Открытый';
var wlsurvey_keytype_shared = 'Общедоступный';
var wlsurvey_keytype_both = 'Оба';

var wlsurvey_keylen = 'Длина ключа:';
var wlsurvey_keylen_64 = '64-bit';
var wlsurvey_keylen_128 = '128-bit';

var wlsurvey_keyfmt = 'Формат ключа:';
var wlsurvey_keyfmt_ascii = 'ASCII';
var wlsurvey_keyfmt_hex = 'HEX (64 символов)';

var wlsurvey_keyset = 'Настройки ключа';

var wlsurvey_authmode = 'Режим аутентификации:';
var wlsurvey_authmode_enter_radius = 'Корпоративный (RADIUS)';
var wlsurvey_authmode_enter_server = 'Enterprise (AS Server)';
var wlsurvey_authmode_personal = 'Частный (Pre-Shared Key)';

var wlsurvey_wpacip = 'Набор шифров WPA:';
var wlsurvey_wpacip_tkip = 'TKIP';
var wlsurvey_wpacip_aes = 'AES';
var wlsurvey_wp2chip = 'Набор шифров WPA2:';
var wlsurvey_wp2chip_tkip = 'TKIP';
var wlsurvey_wp2chip_aes = 'AES';

var wlsurvey_preshared_keyfmt = 'Формат&nbsp;Pre-Shared&nbsp;Key:';
var wlsurvey_preshared_keyfmt_passphrase = 'Пароль';
var wlsurvey_preshared_keyfmt_hex = 'HEX (64 символов)';
var wlsurvey_preshared_key = 'Pre-Shared Key:';

var wlsurvey_eaptype = 'EAP Type:';
var wlsurvey_eaptype_md5 = 'MD5';
var wlsurvey_eaptype_tls = 'TLS';
var wlsurvey_eaptype_peap = 'PEAP';

var wlsurvey_intunn_type = 'Тип внутреннего туннеля:';
var wlsurvey_intunn_type_MSCHAPV2 = 'MSCHAPV2';

var wlsurvey_eap_userid = 'EAP User ID:';
var wlsurvey_radius_passwd = 'Пароль RADIUS:';
var wlsurvey_radius_name = 'Имя пользователя RADIUS:';
var wlsurvey_user_keypasswd = 'Пользовательский ключ (если таковой имеется):';


var wlsurvey_use_as_server = 'Использовать локальный AS-сервер:';
var wlsurvey_as_ser_ipaddr = 'IP-адрес AS-сервера:';
var wlsurvey_back_button = '<<Назад';
var wlsurvey_conn_button = 'Подключиться';
var wlsurvey_wait_explain = 'Пожалуйста, подождите...';
var wlsurvey_inside_nosupport = 'This inside type is not supported.';
var wlsurvey_eap_nosupport = 'This EAP type is not supported.';
var wlsurvey_wrong_method = 'wrong method!';
var wlsurvey_nosupport_method = 'Ошибка: не поддерживаемый ';
var wlsurvey_nosupport_wpa2 = 'Ошибка: не поддерживаемый WPA2 набор шифров ';
var wlsurvey_nosupport_wpasuit = 'Ошибка: не поддерживаемый WPA набор шифров ';
var wlsurvey_nosupport_encry = 'Ошибка: не поддерживаемое шифрование ';

var wlsurvey_tbl_ssid = 'SSID';
var wlsurvey_tbl_bssid = 'BSSID';
var wlsurvey_tbl_chan = 'Канал';
var wlsurvey_tbl_type = 'Тип';
var wlsurvey_tbl_ency = 'Шифрование';
var wlsurvey_tbl_signal = 'Сигнал';
var wlsurvey_tbl_select = 'Выбрать';
var wlsurvey_tbl_macaddr = 'MAC-адреса';
var wlsurvey_tbl_meshid = 'Mesh ID';
var wlsurvey_tbl_none = 'Нет';

var wlsurvey_read_site_error = 'Read site-survey status failed!';
var wlsurvey_get_modemib_error = 'Get MIB_WLAN_MODE MIB failed!';
var wlsurvey_get_bssinfo_error = 'Get bssinfo failed!';


/***********	wlsecutity.htm wlsecutity_all.htm	************/
var wlsec_validate_note = "Обратите внимание: если вы выберите [Enterprise (AS Server)] и примените изменения на этой странице, ваш Wi-Fi-интерфейс (как и относящиеся к нему виртуальные Wi-Fi-интерфейсы) будет использовать эти настройки. Вы действительно хотите продолжить?'";
var wlsec_header = 'Настройки безопасности Wi-Fi';
var wlsec_explain = 'Здесь вы можете изменить настройки безопасности вашей беспроводной сети. Воспользуйтесь алгоритмами защиты WEP или WPA,чтобы предотвратить несанкционированный доступ к ресурсам вашей сети.';
var wlsec_select_ssid = 'Select SSID:';
var wlsec_psk= 'PSK';
var wlsec_pre_shared = 'Pre-Shared Key';
var wlsec_tkip = 'TKIP';
var wlsec_aes = 'AES';
var wlsec_apply = 'Apply Changes';
var wlsec_reset = 'Reset';
var wlsec_inside_type_alert = "Данный тип не поддерживается.";
var wlsec_eap_alert = 'Данный тип EAP не поддерживается.';
var wlsec_wapi_remote_ca_install_alert = "Пожалуйста, убедитесь, что сертификаты WAPI удалённого AS установлены в webpae [WAPI] -> [Certificate Install].";
var wlsec_wapi_local_ca_install_alert = "Пожалуйста, убедитесь, что сертификаты WAPI удалённого AS установлены в webpae [WAPI] -> [Certificate Install].";
var wlsec_wapi_wrong_select_alert = "Wrong wapi cert selected index.";
var wlsec_wapi_key_length_alert = "Ключ WAPI должен быть не меньше 8 символов и не больше 32";
var wlsec_wapi_key_hex_alert = "Шестнадцатеричный ключ WAPI должен составлять 64 шестнадцатеричных цифры";
var wlsec_wapi_invalid_key_alert = "Некорректный ключ. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).";
var wlsec_encryption_none ="шифрование отключено";
var wlsec_802_1x_none = 'Данный тип 802.1x EAP не поддерживается!';
var wlsec_wep_confirm = "при включении WEP будет недоступна функция WPS2.0";
var wlsec_wpa_confirm = "при работе WPA или TKIP будет отключена служба WPS2";
var wlsec_wpa2_empty_alert = "Набор шифров WPA2 не может быть пустым.";
var wlsec_wpa_empty_alert = "Набор шифров WPA не может быть пустым..";
var wlsec_tkip_confirm = "при выборе исключительно TKIP функция WPS2.0 будет недоступнаd";
var wlsec_encryption =  'Шифрование:';
var wlsec_disabled = 'Отключить';
var wlsec_wpa_mix = 'WPA-Mixed';
var wlsec_802_1x = 'Аутентификация 802.1x:';
var wlsec_auth = 'Аутентификация:';
var wlsec_auth_open_sys = 'Open System';
var wlsec_auth_shared_key = 'Shared Key';
var wlsec_auth_auto = 'Автоматическая';
var wlsec_key_length = 'Длина ключа:';
var wlsec_key_hex = 'Шестнадцатеричный';
var wlsec_key_ascii = 'ASCII';
var wlsec_encryption_key = 'Ключ шифрования:';
var wlsec_auth_mode = 'Режим аутентификация:';
var wlsec_auth_enterprise_mode = 'Корпоративный (RADIUS)';
var wlsec_auth_enterprise_ap_mode = 'Enterprise (AS Server)';
var wlsec_auth_personal_mode = 'Частный (Pre-Shared Key)';
var wlsec_wpa_suite = 'Набор шифров WPA:';
var wlsec_wpa2_suite = 'Набор шифров WPA2:';
var wlsec_wep_key_format = 'Формат ключа:';
var wlsec_pre_key_format = 'Формат Pre-Shared Key:';
var wlsec_pre_key = 'Pre-Shared Key:';
var wlsec_passpharse = 'Пароль';
var wlsec_key_hex64 = 'Шестнадцатеричный ключ (64 символа)';
var wlsec_key_64bit = '64 бит';
var wlsec_key_128bit = '128 бит';
var wlsec_key_ascii5 = 'ASCII (5 символов)';
var wlsec_key_hex10 = 'Hex (10 символов)';
var wlsec_key_ascii13 = 'ASCII (13 символов)';
var wlsec_key_hex25 = 'Hex (25 символов)';
var wlsec_radius_server_ip = "IP-адрес&nbsp;RADIUS-сервера";
var wlsec_radius_server_port = 'порт&nbsp;RADIUS-сервера:';
var wlsec_radius_server_password = 'пароль&nbsp;RADIUS-сервера:';
var wlsec_eap_type = 'Тип EAP:';
var wlsec_inside_tunnel_type = 'Тип внутреннего туннеля:';
var wlsec_eap_user_id = 'EAP User ID:';
var wlsec_radius_user = 'Имя пользователя RADIUS:';
var wlsec_radius_user_password = 'Пароль RADIUS:';
var wlsec_user_key_password = 'Пользовательский ключ (если таковой имеется):';
var wlsec_use_local_as = 'Использовать локальный AS-сервер:';
var wlsec_as_ip = 'IP-адрес&nbsp;AS-сервера:';
var wlsec_select_wapi_ca = 'Выбрать сертификат WAPI:';
var wlsec_use_ca_from_as = 'Использовать удалённый AS-сертификат';


/***********	wlbasic.htm	************/
var wlbasic_header='Основные настройки Wi-Fi';
var wlbasic_explain = 'Здесь вы можете настроить параметры подключения беспроводных клиентов к вашей Wi-Fi сети. Здесь вы можете изменить настройки шифрования и другие параметры.';
var wlbasic_explain1 = 'Здесь вы можете настроить различные параметры вашей сети Wi-Fi.'; //для 447
var wlbasic_network_type = 'Тип сети:';
var wlbasic_ssid = 'SSID:';
var wlbasic_disabled = 'Отключить интерфейс Wi-Fi';
var wlbasic_country = 'Страна:';
var wlbasic_band= 'Диапазон:';
var wlbasic_bandb = '2.4 ГГц (B)';
var wlbasic_bandg = '2.4 ГГц (G)';
var wlbasic_bandbg = '2.4 ГГц (B+G)';
var wlbasic_bandgn = '2.4 ГГц (G+N)';
var wlbasic_bandbgn = '2.4 ГГц (B+G+N)';
var wlbasic_banda = '5 ГГц (A)';
var wlbasic_bandn ='5 ГГц (N)';
var wlbasic_bandan = '5 ГГц (A+N)';
var wlbasic_bandabgn = '2.4ГГц + 5 ГГц (A+B+G+N)';
var wlbasic_wlan_phyband ='5ГГц';
var wlbasic_infrastructure = "Infrastructure";
var wlbasic_adhoc = "Adhoc";
var wlbasic_addprofile = 'Добавить в профиль';
var wlbasic_channelwidth = 'Ширина канала:';
var wlbasic_channelwidth0 = '20МГц';
var wlbasic_channelwidth1 = '40МГц';
var wlbasic_mhz = 'МГц';
var wlbasic_ctlsideband = 'Дополнительный канал:';
var wlbasic_ctlsideautomode = 'Авто';
var wlbasic_ctlsidelowermode = 'Ниже';
var wlbasic_ctlsideuppermode = 'Выше';
var wlbasic_chnnelnum = 'Номер канала:';
var wlbasic_broadcastssid= 'Трансляция SSID:';
var wlbasic_brossid_enabled = 'Вкл';
var wlbasic_brossid_disabled = 'Выкл';
var wlbasic_wmm ='WMM:';
var wlbasic_wmm_disabled = 	'Выкл';
var wlbasic_wmm_enabled = 	'Вкл';
var wlbasic_data_rate = 'Скорость передачи данных:';
var wlbasic_data_rate_auto = "Auto";
var wlbasic_associated_clients = 'Подключенные клиенты:';
var wlbasic_show_associated_clients = 'Показать активных клиентов';
var wlbasic_enable_mac_clone = 'Клонировать MAC-адрес (Один Ethernet-клиент)';
var wlbasic_enable_repeater_mode = 'Включить режим повторителя и задать SSID';
var wlbasic_extended_ssid = 'SSID расширенного интерфейса:';
var wlbasic_ssid_note = 'Примечание: Если вы хотите поменять настройки режима работы и SSID, сначала отключите EasyConfig.';
var wlbasic_enable_wl_profile = 'Включить профиль Wi-Fi';
var wlbasic_wl_profile_list = 'Список профилей Wi-Fi:';
var wlbasic_apply = 'Сохранить изменения';
var wlbasic_reset = 'Сбросить';
var wlbasic_delete_select = 'Удалить выделенные';
var wlbasic_delete_all = 'Удалить все';
var wlbasic_enable_wire = 'Хотите ли вы также активировать профиль Wi-Fi?';

var wlbasic_multap = 'Дополнительные SSID';
var wlbasic_mode = 'Режим работы:';
var wlbasic_client = 'Клиент';
var wlbasic_gotosurvey ='Поиск Wi-Fi сетей';
var wlbasic_networktype = 'Тип сети';
var wlbasic_txrcv = 'Ограничение передачи';
var wlbasic_rxrcv = 'Ограничение приёма';
var wlbasic_norest = 'снять ограничение';


/***********	wlmultipleap.htm  ************/
var wlmap_alert_txr_empty = 'Введите значение ограничения передачи.';
var wlmap_alert_txr_0100 = 'Введите значение от 0 до 100';
var wlmap_alert_rxr_empty = 'Введите значение ограничения приёма.';
var wlmap_show = 'Показать';
var wlmap_multssid_head = 'Дополнительные SSID';
var wlmap_multssid_explain = 'Здесь вы можете включить и настроить дополнительные сети Wi-Fi (Multi SSID).';
var wlmap_broadcast_ssid = 'Транслировать SSID';
var wlmap_access = 'Доступ';
var wlmap_txrest = 'Ограничение приёма (Мб/с)';
var wlmap_rxrest = 'Ограничение передачи (Мб/с)';
var wlmap_clientlist = 'Список активных клиентов';
var wlmap_ap = 'AP';
var wlmap_apply = 'Применить';
var wlmap_reset = 'Отмена';



/***********	wlsch.htm  ************/
var wlsch_head = 'Расписание работы беспроводной сети';


/***********	wlsecurity.htm, wlsecurity_all.htm	******/
var wlsecurity_head = 'Настройки безопасности Wi-Fi';
var wlsecurity_alert_as = 'Обратите внимание: если вы выберите [Enterprise (AS Server)] и примените изменения на этой странице, ваш Wi-Fi-интерфейс (как и относящиеся к нему виртуальные Wi-Fi-интерфейсы) будет использовать эти настройки. Вы действительно хотите продолжить?';
var wlsecurity_alert_type = 'Данный тип не поддерживается!';
var wlsecurity_alert_encr_off = 'Шифрование отключено.';
var wlsecurity_alert_wep_wps = 'Использование WEP несовместимо с WPS 2.0.';
var wlsecurity_alert_ch_suite = 'Пожалуйста, выберите набор шифров.';
var wlsecurity_alert_wpa_tkip = 'При использовании только WPA или только TKIP служба WPS 2.0 будет отключена.';
var wlsecurity_alert_tkip_wps = 'При использовании только TKIP служба WPS 2.0 будет отключена.';
var wlsecurity_intro = 'Здесь вы можете изменить настройки безопасности вашей беспроводной сети. Воспользуйтесь алгоритмами защиты WEP или WPA,чтобы предотвратить несанкционированный доступ к ресурсам вашей сети.';
var wlsecurity_select = 'Выберите SSID'; 
var wlsecurity_8021x = 'Аутентификация 802.1x';
var wlsecurity_auth = 'Аутентификация';
var wlsecurity_open = 'Открытая сеть';
var wlsecurity_auto = 'Авто';
var wlsecurity_kl = 'Длина ключа';
var wlsecurity_kf = 'Формат ключа';
var wlsecurity_ek = 'Ключ';
var wlsecurity_am = 'Режим аутентификации';
var wlsecurity_radius = 'Корпоративный (RADIUS)';
var wlsecurity_as = 'Корпоративный (cервер AS)';
var wlsecurity_psk = 'Частный (Pre-Shared Key)';
var wlsecurity_wpa_cs = 'Набор шифров WPA';
var wlsecurity_wpa2_cs = 'Набор шифров WPA2';
var wlsecurity_psk_f = 'Формат ключа (Pre-Shared Key)';
var wlsecurity_pass = 'Пароль';
var wlsecurity_hex = 'HEX (64 символа)';
var wlsecurity_radius_ip = 'IP-адрес сервера RADIUS';
var wlsecurity_radius_port = 'Порт сервера RADIUS';
var wlsecurity_radius_pass = 'Пароль сервера RADIUS';
var wlsecurity_ap_type = 'Тип EAP';
var wlsecurity_radius_usrname = 'Имя пользователя на сервере RADIUS';
var wlsecurity_radius_usrpass = 'Пароль пользователя на сервере RADIUS';
var wlsecurity_itt = 'Тип внутреннего туннеля';
var wlsecurity_if_any = '(при наличии такового)';
var wlsecurity_use_local_as = 'Использовать локальный AS-сервер';
var wlsecurity_local_as_ip = 'IP-адрес AS-сервера';
var wlsecurity_select_wapi = 'Выбрать сертификат WAPI';
var wlsecurity_remote_as = 'Использовать сертификат удалённого AS-сервера';
var wlsec_psk = 'PSK';
var wlsec_pre_shared = 'Pre-Shared Key';
var wlsec_tkip = 'TKIP';
var wlsec_aes = 'AES';
var wlsec_eap_alert = 'Данный тип EAP не поддерживается.';
var wlsec_wapi_invalid_key_alert = "Некорректный ключ. Он должн состоять из шестнадцатеричных символов (0-9 и a-f).";
var wlsec_wpa2_empty_alert = "Выберите хотя бы один набор шифров WPA2!";
var wlsec_wpa_empty_alert = "Выберите хотя бы один набор шифров WPA!";
var wlsec_encryption =  'Шифрование:';
// var wlsec_disabled = 'Отключить'; - cм. var disabled = 'Отключить'
var wlsec_wapi_remote_ca_install_alert = "Пожалуйста, убедитесь, что сертификаты WAPI удалённого AS установлены в webpae [WAPI] -> [Certificate Install].";
var wlsec_wapi_local_ca_install_alert = "Пожалуйста, убедитесь, что сертификаты WAPI удалённого AS установлены в webpae [WAPI] -> [Certificate Install].";
var wlsec_wapi_key_length_alert = "Ключ WAPI должен быть не меньше 8 символов и не больше 32";
var wlsec_wapi_key_hex_alert = "Шестнадцатеричный ключ WAPI должен составлять 64 шестнадцатеричных цифры";
var wlsec_wapi_invalid_key_alert = "Некорректный ключ. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).";
var wlsec_encryption_none ="шифрование отключено";
var wlsec_802_1x_none = 'Данный тип 802.1x EAP не поддерживается!';
var wlsec_key_hex = 'Шестнадцатеричный';
var wlsec_key_ascii = 'ASCII';
var wlsec_encryption_key = 'Ключ шифрования:';
var wlsec_pre_key = 'Pre-Shared Key:';
var wlsec_key_64bit = '64 бит';
var wlsec_key_128bit = '128 бит';
var wlsec_eap_user_id = 'EAP User ID:';
var wlsec_radius_user = 'Имя пользователя RADIUS:';
var wlsec_radius_user_password = 'Пароль RADIUS:';
var wlsec_user_key_password = 'Пользовательский ключ (если таковой имеется):';

/**************	wlsеtatbl.htm	****************/
var wlsеtatbl_m = 'Режим';
var wlsеtatbl_rx = 'Получено пакетов';
var wlsеtatbl_tx = 'Отправлено пакетов';
var wlsеtatbl_powers = 'Энегросбережение';
var wlsеtatbl_exp = 'Оставшееся время аренды (сек.)';
var wlsеtatbl_rate = 'Скорость передачи данных (МБит/с)';





/***********	tcpipwan.htm  tcpiplan.htm************/
var tcpip_check_ip_msg = 'Неверный IP-адрес!';
var tcpip_check_server_ip_msg = 'Invalid server IP address';
var tcpip_check_dns_ip_msg1 = 'Invalid DNS1 address';
var tcpip_check_dns_ip_msg2 = 'Invalid DNS2 address';
var tcpip_check_dns_ip_msg3 = 'Invalid DNS3 address';
var tcpip_check_size_msg = 'Invalid MTU size! You should set a value between';
var tcpip_check_user_name_msg = 'Имя пользователя не может быть пустым';
var tcpip_check_password_msg = "Пароль не может быть пустым";
var tcpip_check_invalid_time_msg = "Invalid idle time value! You should set a value between ";
var tcpip_pppoecontype_alert = "wrong pppoeConnType";
var tcpip_pptpontype_alert = "wrong pptpConnType";
var tcpip_l2tpcontype_alert = "wrong l2tpConnType";
var tcpip_pppcontype_alert = "wrong pppConnType";
var tcpip_browser_alert = 'Ошибка! Пожалуйста, включите поддержку CSS в вашем браузере';
var tcpip_wan_header = 'Настройка интерфейса WAN';
var tcpip_wan_explain = 'На этой странице вы можете настроить параметры интерфейса WAN для выхода в Интернет. Здесь вы можете выбрать нужный вам тип подключения (статический IP, DHCP, PPPoE, PPTP, или L2TP).';
var tcpip_wan_auto_dns = 'Определить DNS автоматически';
var tcpip_wan_dns =  'Настройки DNS';
var tcpip_wan_manually_dns =  'Настроить DNS вручную';
var tcpip_wan_conn_time = '&nbsp;(1-1000 минут)';
var tcpip_wan_max_mtu_size = 'байт';
var tcpip_wan_conn = 'Connect';
var tcpip_wan_disconn = 'Disconnect';
var tcpip_wan_continuous = 'Continuous';
var tcpip_wan_on_demand = 'Connect on Demand';
var tcpip_wan_manual = 'Manual';
var tcpip_wan_access_type = 'Тип соединения WAN';
var tcpip_wan_type_static_ip = 'Статический IP';
var tcpip_wan_type_client = "DHCP-клиент";
var tcpip_wan_ip = "IP-адрес:";
var tcpip_wan_mask = 'Маска подсети:';
var tcpip_wan_default_gateway = 'Шлюз:';
var tcpip_wan_mtu_size = 'MTU Size:';
var tcpip_wan_host = 'Хост';
var tcpip_wan_user = 'Имя пользователя';
var tcpip_wan_password = 'Пароль:';
var tcpip_wan_server_ac = 'Имя службы (AC):';
var tcpip_wan_conn_type = 'Тип подключения';
var tcpip_wan_idle_time = 'Время простоя';
var tcpip_wan_server_ip = 'IP-адрес(или доменное имя) сервера';
var tcpip_wan_addition = 'Дополнительные настройки';
var tcpip_wan_clone_mac = 'Клонировать MAC-адрес';
var tcpip_wan_enable_upnp = 'Разрешить uPNP';
var tcpip_wan_enable_igmp_proxy = 'Разрешить IGMP-прокси';
var tcpip_wan_enable_ping = 'Разрешить эхо-запросы через WAN';
var tcpip_wan_enable_webserver = 'Разрешить доступ к веб-интерфейсу через WAN';
var tcpip_wan_enable_ipsec = 'Разрешить IPsec по VPN-соединению';
var tcpip_wan_enable_pptp = 'Разрешить PPTP по VPN-соединению';
var tcpip_wan_enable_l2tp = 'Разрешить L2TP по VPN-соединению';
var tcpip_wan_enable_ipv6 = 'Разрешить IPv6 по VPN-соединению';
var tcpip_apply = 'Применить изменения';
var tcpip_reset = 'Сброс';
var tcpip_lan_wrong_dhcp_field = "wrong dhcp field!";
var tcpip_lan_start_ip = 'Некорректный стартовый адрес DHCP-клиента!';
var tcpip_lan_end_ip = 'Некорректный конечный адрес DHCP-клиента!';
var tcpip_lan_ip_alert = '\nОн должен принадлежать к той же подсети, что и текущий IP-адрес.';
var tcpip_lan_invalid_rang = 'Некорректный диапазон адресов DHCP-клиентов!\nЗначение второго адреса должно быть больше, чем значение первого';
var tcpip_lan_invalid_rang_value = "Неверное значение. Укажите число от 1 до 10080.";
var tcpip_lan_invalid_dhcp_type = "Load invalid dhcp type!";
var tcpip_lan_header = 'Настройка интерфейса LAN';
var tcpip_lan_explain = 'На данной странице вы можете настроить параметры интерфейса LAN';
var tcpip_lan_ip = "IP-адрес";
var tcpip_lan_mask = 'Маска подсети';
var tcpip_lan_default_gateway = 'Шлюз';
var tcpip_lan_dhcp = 'DHCP:';
var tcpip_lan_dhcp_disabled = 'Disabled';
var tcpip_lan_dhcp_client = 'Client';
var tcpip_lan_dhcp_server = 'Server';
var tcpip_lan_dhcp_auto = 'Auto';
var tcpip_lan_dhcp_rang = 'Диапазон адресов DHCP-клиентов';
var tcpip_lan_dhcp_time = 'Срок аренды DHCP';
var tcpip_minutes = 'minutes';
var tcpip_lan_staicdhcp = 'DHCP-резервирование';
var tcpip_staticdhcp = "Настроить DHCP-резервирование";
var tcpip_domain = "Доменное имя:";
var tcpip_802_1d = "802.1d Spanning Tree:";
var tcpip_802_1d_enable = 'Выключить';
var tcpip_802_1d_disabled = 'Включить';
var tcpip_show_client = 'Список клиентов';
var tcpip_gw_invalid_gw_ip = 'Некорректный адрес шлюза!';

var tcpip_wan_phy_dhcp_type='Тип DHCP';
var tcpip_wan_phy_org_pppoe='нормальная PPPoE';
var tcpip_wan_pppoe_constant='Постоянное';
var tcpip_wan_pppoe_auto='Соединение по запросу';
var tcpip_wan_pppoe_manually='Соединение вручную';
var tcpip_wan_need_mppe='Запрос шифрования MPPE';
var tcpip_wan_need_mppc='Запрос сжатия MPPC';
var tcpip_dns_type='Тип DNS';
var tcpip_alert_gateway ='Некорректный IP-адрес шлюза! Он должен принадлежать к той же подсети, что и локальный IP-адрес.';
var tcpip_head ='Настройка интерфейса WAN';
var tcpip_pppoe1 ='PPPoE 1';
var tcpip_on ='Подключить';
var tcpip_off ='Отключить';
var tcpip_attain ='Обратиться к серверу по IP-адресу';
var tcpip_domname ='Доменное имя';
var tcpip_dial ='Набрать номер';
var tcpip_dns_set ='Настройки DNS';
var tcpip_dns_auto ='Получить адрес DNS-сервера автоматически';
var tcpip_dns_auto ='Ввести адрес DNS-сервера вручную';
var tcpip_additional ='Дополнительные настройки';


/***********	tcpip_staticdhcp.htm ************/
var tcpip_dhcp_del_select = 'Вы действительно хотите удалить выбранные пункты??';
var tcpip_dhcp_del_all = 'Вы действительно хотите удалить все пункты?';
var tcpip_dhcp_header = 'Настройка DHCP-резервирования';
var tcpip_dhcp_explain = 'На этой странице вы можете зарезервировать определённый IP адрес для конкретного устройства вашей сети. При появлении в сети устройства с определённым MAC-адресом, роутер будет всякий раз присваивать ему указанный вами IP-адрес. Данная функция позволяет сочетать преимущества DHCP и статического назначения IP-адресов';
var tcpip_dhcp_st_enabled = 'Включить DHCP-резервирование';
var tcpip_dhcp_comment = 'Комментарий:';
var tcpip_dhcp_list = 'Список зарезервированных IP-адресов';
//var tcpip_dhcp_apply = "Apply Changes";
//var tcpip_dhcp_reset = 'Reset';
var tcpip_dhcp_delsel = 'Удалить выбранные';
var tcpip_dhcp_delall = 'Удалить все';
var tcpip_dhcp_select = 'Выбрать';

/***********	dhcptbl.htm ************/
var dhcp_header = 'DHCP-клиенты:';
//var dhcp_explain = ' This table shows the assigned IP address, MAC address and time expired for each DHCP leased client.';
var dhcp_ip = 'IP-адрес';
var dhcp_mac = 'MAC-адрес';
var dhcp_time = 'Оставшееся время аренды (в секундах)';
//var dhcp_refresh = 'Refresh';
//var dhcp_close = 'Close';


/***********	wizard.htm ************/
var wizard_header = 'Мастер настройки';
var wizard_header_explain = 'Мастер настройки поможет вам быстро и легко подготовить ваш роутер к работе. Пожалуйста, следуйте инструкциям шаг за шагом';
//var wizard_welcome = 'Welcome to Setup Wizard.';
//var wizard_content_explain = 'The Wizard will guide you the through following steps. Begin by clicking on  Next.';
var wizard_content1 = 'Выберите режим работы';
var wizard_content2 = 'Выберите временную зону';
var wizard_content3 = 'Настройте интерфейс LAN';
var wizard_content4 = 'Настройте интерфейс WAN';
var wizard_content5 = 'Выберите диапазон Wi-Fi';
var wizard_explain5 = 'Здесь вы можете настроить диапазон Wi-Fi.';
var wizard_content6 = 'Настройте Wireless LAN';
var wizard_content7 = 'Настройте защиту Wi-Fi-сети';
var wizard_next_btn = '  Далее>>';
var wizard_back_btn = '<<Назад  ';
var wizard_cancel_btn = '  Отмена  ';
var wizard_finish_btn = 'Готово';
var wizard_number = 'Набираемый номер:';


var wizard_opmode_invalid = 'Invalid opmode value ';
var wizard_chanset_wrong = 'wrong field input!';
var wizard_wantypeselect = 'Ошибка! Ваш браузер должен поддерживать CSS.';
var wizard_weplen_error = 'invalid mib value length0';

var wizard_content5_explain = 'Выберите диапазон Wi-Fi';
var wizard_wire_band = 'Диапазон Wi-Fi:';

var wizard_basic_header_explain = ' На этой странице вы можете настроить параметры подключения для клиентских устройств, подключаемых к вашей точку доступа. ';
var wizard_wlan1_div0_mode = 'Режим:';
var wizard_chan_auto = 'Авто';
var wizard_client = 'Клиент';

var wizard_wpa_tkip = 'WPA (TKIP)';
var wizard_wpa2_aes = 'WPA2(AES)';
var wizard_wpa2_mixed = 'WPA2 Mixed';
var wizard_use_cert_from_remote_as0 = ' Use Cert from Remote AS0 ';
var wizard_use_cert_from_remote_as1 = ' Use Cert from Remote AS1 ';

var wizard_5G_basic = 'Базовые настройки Wi-Fi 5 ГГц';
var wizard_5G_sec = 'Настройки защиты Wi-Fi 5 ГГц';
var wizard_2G_basic = 'Базовые настройки Wi-Fi 2.4 ГГц';
var wizard_2G_sec = 'Настройки защиты Wi-Fi 2.4 ГГц';


/***********	ntp.htm	************/
var ntp_header = 'Настройка часового пояса';
var ntp_header_explain = 'Вы можете синхронизировать системное время с сервером точного времени в Интернете';
var ntp_curr_time = ' Текущее время ';
var ntp_year = 'Год';
var ntp_month = 'Мес.';
var ntp_day = 'День';
var ntp_hour = 'Час';
var ntp_minute = 'Мин.';
var ntp_second = 'Сек.';
var ntp_copy_comptime = 'Синхронизировать с компьютером';
var ntp_time_zone = 'Часовой пояс';
var ntp_enable_clientup = 'Разрешить обновление NTP-клиента ';
var ntp_adjust_daylight = 'Автоматически переходить на летнее время и обратно';
var ntp_server = 'NTP-сервер';
//var ntp_server_north_america1 = '198.123.30.132    - North America';
//var ntp_server_north_america2 = '209.249.181.22   - North America';
//var ntp_server_Europe1 = '85.12.35.12  - Europe';
//var ntp_server_Europe2 = '217.144.143.91   - Europe';
//var ntp_server_Australia = '223.27.18.137  - Australia';
//var ntp_server_asia1 = '133.100.11.8 - Asia Pacific';
//var ntp_server_asia2 = '210.72.145.44 - Asia Pacific';
var ntp_server_americal=' - Северная Америка';
var ntp_server_Europe = ' - Европа';
var ntp_server_Australia = ' - Австралия';
var ntp_server_asia = ' - Азиатско-Тихоокеанский регион';
var ntp_manu_ipset = 'Ручной ввод IP-адреса ';
//var ntp_apply = 'Apply Change';
//var ntp_reset = 'Reset';
//var ntp_refresh = 'Refresh';
var ntp_month_invalid = 'Неверный номер месяца. Укажите месяц в виде десятичного числа';
var ntp_time_invalid = 'Время задано неверно!';
var ntp_ip_invalid = 'Некорректный IP-адрес!';
var ntp_servip_invalid = 'Некорректный IP-адрес NTP-сервера! Он не может быть пустым';
//var ntp_field_check = ' field can\'t be empty\n';
var ntp_invalid = 'недействительный ';
var ntp_num_check = ' число. Ожидается десятичное число (0-9)';


/***********	syslog.htm	************/
var syslog_header = 'Системный журнал';
var syslog_header_explain = 'На этой странице вы можете настроить системный журнал, ведущийся в том числе и на удалённом сервере';
var syslog_enable = 'Включить журнал';
var syslog_sys_enable = 'Все события';
var syslog_wireless_enable = 'Wi-Fi';
var syslog_dos_enable = 'DoS';
var syslog_11s_enable = '11s';
var syslog_rtlog_enable = 'Активировать удалённый журнал';
var syslog_local_ipaddr = 'IP-адрес сервера';
var syslog_clear = ' Очистить ';


/***********	stats.htm ************/
var stats_header = 'Статистика';
var stats_explain = 'На этой статистике вы можете посмотреть статистику  пакетов, полученных и отправленных через интерфейсы LAN и Wi-Fi';
var stats_lan = ' LAN';
var stats_send = 'Отправлено пакетов';
var stats_recv = 'Принято пакетов';
var stats_repeater = 'повторитель';
var stats_eth = 'Ethernet';
var stats_wifi = 'Сеть Wi-Fi ';
var stats_wan = ' WAN';


/***********	ddns.htm	************/
var ddns_header = 'Настройка Dynamic DNS';
var ddns_header_explain = 'Служба Dynamic DNS (Domain Name Service) позволяет привязать доменное имя к динамическому IP-адресу, что очень удобно для организации за NAT роутера FTP-сервера или сайта. Для использования данной функции необходимо предварительно подписаться на получение услуг DDNS-провайдера и получить имя пользователя и пароль';
var ddns_enable = 'Включить DDNS';
var ddns_serv_provider = 'Провайдер';
var ddns_domain_name = 'Доменное имя';
var ddns_user_name = 'Имя пользователя/Email';
var ddns_passwd = 'Пароль';
var ddns_domain_name_empty = 'Доменное имя не может быть пустым';
var ddns_user_name_empty = 'Имя пользователя/Email не может быть пустым';
var ddns_passwd_empty = 'Пароль/Ключ не может быть пустым';


/***********	opmode.htm	************/
var opmode_explain='Вы можете выбрать разные режимы работы для NAT и функции моста';
var opmode_radio_gw='Шлюз';
var opmode_radio_gw_explain='Выберите этот режим, если ваш роутер подключается к Интернету напрямую либо через ADSL/кабельный модем. NAT включен, устройства сети для выхода в Интернет используют IP-адрес, назначенный интерфейсу WAN. Доступные типы подключения: PPPoE, DHCP-клиент либо статический IP';
var opmode_radio_br='Мост';
var opmode_radio_br_explain='В этом режиме все LAN-порты и Wi-Fi интерфейс сопряжены друг с другом. NAT отключен, связанные с WAN функции и файрвол не поддерживаются';
var opmode_radio_wisp='Беспроводное WAN-подключение';
var opmode_radio_wisp_explain='В этом режиме все LAN-порты сопряжены, соединение с Интернетом осуществляется через Wi-Fi интерфейс, подключаемый к беспроводной точке доступа. NAT включен, устройства сети, подключенные к портам LAN, используют один IP-адрес для выхода в Интернет. Вам необходимо перевести беспроводной интерфейс роутера в режим "Wi-Fi клиент" и установить соединение с точкой доступа провайдера на странице "Поиск беспроводных сетей". Доступные типы подключения: PPPoE, DHCP-клиент либо статический IP';
var opmode_radio_wisp_wanif='WAN-интерфейса';

/***********	menu.htm	************/
var menu_reboot="Перезагрузить";
var menu_status='Состояние';
var menu_system_status='Состояние системы';
var menu_statistics='Статистика';
var menu_log='Журнал событий';
var menu_tcpip='Настройки';
var menu_lan='Интерфейс LAN';
var menu_wan='Интерфейс WAN';
var menu_vlan='Настройка VLAN';
var menu_timeZone='Дата и время';
var menu_wireless='Wi-Fi сеть';
var menu_wireless1='Wi-Fi сеть 2';
var menu_basic='Основные настройки';
var menu_security='Безопасность';
var menu_siteSurvey='Поиск Wi-Fi сетей';
var menu_wds='WDS';
var menu_advance='Дополнительные настройки';
var menu_accessControl='Управление доступом';
var menu_wps='WPS';
var menu_routeSetup='Маршрутизация';
var menu_staticRoute='Создание маршрутов';
var menu_routeTbl = 'Таблица маршрутов';
var menu_fireWall='Межсетевой экран';
var menu_portFilter='Фильтрация по номерам портов';
var menu_ipFilter='Фильтрация по IP-адресам';
var menu_macFilter='Фильтрация по MAC-адресам';
var menu_portFw='Перенаправление портов';
var menu_urlFilter='Фильтрация по URL';
var menu_dmz='DMZ';
var menu_dos='Защита от DoS-атак';
var menu_management='Сервис';
var menu_updateFm='Обновление прошивки';
var menu_settings='Настройки';
var menu_pwd='Пароль';
var menu_adv='Доп. настройки';
var menu_ddns='DDNS';
var menu_qos='QOS';
var menu_opmode ='Режим работы';
var menu_sysCmd ='Системные команды';
var menu_sshServer ='SSH-сервер';
var menu_wizard = 'Мастер настройки';
var menu_usb_settings = 'Настройка';

/************** ssh.htm *******************/
var ssh_page_info='Протокол SSH позволяет удаленно управлять роутером и туннелировать TCP-соединения. ';
var ssh_enabled='Включить SSH';
var ssh_user='Имя пользователя';
var ssh_passwd='Пароль';

/********** status.htm *****************/
//var menu_status='Состояние';
var status_need_reboot = "Перезагрузите роутер, чтобы изменения вступили в силу";
var status_lan_config = "Настройки LAN";
var status_sys = 'Система';
var status_wan_config = "Настройки WAN";
var status_connect_type = 'IP-протокол';
var status_ip = 'IP-адрес';
//var status_subnet_mask = 'Subnet Mask';
//var status_default_gw = 'Шлюз';
var status_mac = 'MAC-адрес';
var status_dhcp_server = 'DHCP-сервер';
var status_disabled = 'Выкл';
var status_enabled = 'Вкл';
var status_auto = 'Авто';
var status_reboot = "Перезагрузить роутер";
var status_system = 'Система';
var status_uptime = 'Продолжительность работы';
var status_fw_ver = 'Версия прошивки';
var status_build_time = 'Время создания';
var status_wifi = 'Wi-Fi';
var status_config = 'Настройки';
var status_wifi_config = 'Настройки Wi-Fi';
var status_wifi_mode = "Режим работы";
var status_client_mode_inf = "Клиент Инфраструктуры";
var status_client_mode_adhoc = "клиент ad-hoc";
var status_ap = 'Точка доступа';
var status_wds = 'WDS';
var status_ap_wds = 'Точка доступа+WDS';
var status_mesh = 'MESH';
var status_ap_mesh = 'AP+MESH';
var status_mpp = 'MPP';
var status_ap_mpp = 'AP+MPP';
var status_map = 'MAP';
var status_mp = 'MP';
var status_band = 'Диапазон';
var status_ch_num = 'Номер канала';
var status_encrypt = 'Шифрование';
var status_vap  = 'Виртуальная точка доступа ';
var status_repeater = "репитера";
var status_mode = "Режим";
var status_connected_clients = 'Подключенные клиенты';
var status_wl = 'Беспроводной';















/***************************************************************************************************************************************************************/
/***************************************************************************************************************************************************************/
/***************************************************************************************************************************************************************/
/***************************************************************************************************************************************************************/
/***************************************************************************************************************************************************************/
/***********	status.htm ************/
var status_attain_ip = 'Протокол';
var status_ipv6_global_ip = 'Global Address';
var status_ipv6_ll = 'LL Address';
var status_ipv6_link = 'Link Type';
var status_ipv6_conn = 'Connection Type';
var status_header = 'Состояние';
var status_explain = ' Эта страница отображает текущее состояние и некоторые базовые настройки устройства.';

var status_ipv6_lan = 'LAN IPv6 Configuration';
var status_ipv6_wan = 'WAN IPv6 Configuration';

var status_bssid = 'BSSID';
var status_assoc_cli = 'Клиентские устройства';
var status_tcpip_config = 'Конфигурация TCP/IP';
var status_unknown = 'Неизвестно';
var status_dhcp_get_ip = 'Получение IP-адреса от DHCP-сервера...';
var status_conn = 'Подключено';
var status_disconn = 'Отключено';
var status_fixed = 'Фиксированный IP ';
var status_start = 'Started';
var status_idle = 'Idle';
var status_wait_key = 'Ожидание ключа';
var status_scan = 'Сканируется';

/********** end status.htm *****************/






var menu_8021xCert='802.1x Cert Install';
var menu_mesh='Mesh settings';
var menu_schedule='Schedule';
var menu_logout='Logout';


/***********	wlan_schedule.htm	************/
var wlan_schedule_header = 'Расписание работы сети Wi-Fi';
var wlan_schedule_explain = 'На этой странице вы можете настроить расписание работы вашей сети Wi-Fi. Для корректной работы этой функции не забудьте настроить системное время!';
var wlan_schedule_enable = 'Включить расписание';
var wlan_schedule_everyday = 'Каждый день';
var wlan_schedule_sun = 'Вск';
var wlan_schedule_mon = 'Пнд';
var wlan_schedule_tue= 'Втр';
var wlan_schedule_wed = 'Срд';
var wlan_schedule_thu = 'Чтв';
var wlan_schedule_fri = 'Птн';
var wlan_schedule_sat = 'Суб';
var wlan_schedule_24Hours = '24 часа';
var wlan_schedule_from = 'С';
var wlan_schedule_to = 'До';
var wlan_schedule_save = 'Применить изменения';
var wlan_schedule_reset = 'Сбросить';
var wlan_schedule_days = 'Дни';
var wlan_schedule_time = 'Время';
var wlan_schedule_time_check = 'Пожалуйста, настройте дни!';



/***********	logout.htm	************/
var logout_header = 'Выйти';
var logout_header_explain = 'Здесь вы можете закончить текущую сессию.';
var logout_confm = 'Вы действительно хотите выйти?';
var logout_apply = 'Применить изменения';



/***********	ip_qos.htm	************/
var ip_qos_header = 'QoS';
var ip_qos_level = 'Уровень 7';
var ip_qos_header_explain = 'На данной странице можно задать правила, в соответствии с которыми роутер будет распределять пропускную способность соединения между различными клиентами локальной сети.';
var ip_qos_enable = 'Включить QoS';
var ip_qos_auto_upspeed = 'Автоматическая скорость выгрузки';
var ip_qos_manu_upspeed = 'Задать скорость выгрузки вручную (Кбит/сек):';
var ip_qos_auto_downspeed = 'Автоматическая скорость загрузки';
var ip_qos_manu_downspeed = 'Задать скорость загрузки вручную (Кбит/сек):';
var ip_qos_rule_set = 'Настройки правила QoS:';
var ip_qos_addrtype = 'Тип адреса:';
var ip_qos_addrtype_ip = 'IP';
var ip_qos_addrtype_mac = 'MAC';
var ip_qos_local_ipaddr = 'Локальный IP-адрес:';
var ip_qos_proto = 'Протокол:';
var ip_qos_proto_udp = 'udp';
var ip_qos_proto_tcp = 'tcp';
var ip_qos_proto_both = 'оба';
var ip_qos_local_port = 'Локальный порт:(1~65535)';
var ip_qos_macaddr = 'MAC-адрес:';
var ip_qos_mode = 'Режим:';

var ip_qos_upband = 'Полоса пропускания на выгрузку (Кбит/с):';
var ip_qos_downband = 'Полоса пропускания на загрузку (Кбит/с):';
var ip_qos_apply = 'Сохранить изменения';
var ip_qos_reset = 'Сбросить';
var ip_qos_curr_qos = 'Существующие правила QoS:';
var ip_qos_delete_select_btn = 'Удалить выбранные';
var ip_qos_delete_all_btn = 'Удалить все';

var ip_qos_upspeed_empty = 'Значение исходящей скорости  не может быть пустым либо меньше 100.';
var ip_qos_downspeed_empty = 'Установленое вручную значение входящей скорости не может быть пустым или меньше 100, если выключена Автоматическая скорость загрузки.';
var ip_qos_ip_invalid = 'Некорректный IP-адрес';
var ip_qos_startip_invalid = 'Некорректный IP-адрес! Он должен принадлежать текущей подсети.';
var ip_qos_portrange_invalid = 'Некорректный диапазон портов! Он должен быть 1~65535.';
var ip_qos_macaddr_notcomplete = 'MAC-адрес введён не полностью. Он должен представлять собой 12 шестнадцатеричных цифр.';
var ip_qos_macaddr_invalid = 'Некорректный MAC-адрес. Он должен состоять из шестнадцатеричных цифр (0-9 и a-f).';
var ip_qos_band_empty = 'Значение входящей и искходящей скорости не может быть пустым.';
var ip_qos_band_invalid = 'Ошибка! Пожалуйста, введите десятичное число (0-9).';
var ip_qos_delete_select = 'Вы действительно хотите удалить выбранные пункты?';
var ip_qos_delete_all = 'Вы действительно хотите удалить все пункты?';

var ip_qos_tbl_localaddr = 'Локальный IP-адрес';
var ip_qos_tbl_macaddr = 'MAC-адрес';
var ip_qos_tbl_mode = 'Режим';
var ip_qos_tbl_upband = 'Исходящая скорость';
var ip_qos_tbl_downband = 'Входящая скорость';
var ip_qos_tbl_select = 'Выбрать';
var ip_qos_restrict_maxband = "Возможный максимум";
var ip_qos_quarant_minband = "Гарантированный минимум";




/***********	tcpip_staticdhcp.htm ************/
var tcpip_dhcp_del_select = 'Вы действительно хотите удалиь выбранные записи?';
var tcpip_dhcp_del_all = 'Вы действительно хотите удалиь все записи?';
var tcpip_dhcp_header = 'Настройка Static DHCP';
var tcpip_dhcp_explain = 'На этой странице вы можете зарезервировать определённые IP-адреса за определёнными устройствами в вашей локальной сети. ';
var tcpip_dhcp_st_enabled = 'Включить Static DHCP';
var tcpip_dhcp_comment = 'Комментарий';
var tcpip_dhcp_list = 'Список Static DHCP:';
var tcpip_dhcp_apply = "Применить изменения";
var tcpip_dhcp_reset = 'Сброс';
var tcpip_dhcp_delsel = 'Удалить выбранные';
var tcpip_dhcp_delall = 'Удалить все';
var tcpip_dhcp_select = 'Выбрать';




/***********	vlan.htm ************/
var vlan_header = 'Настройки VLAN';
var vlan_header_explain = 'На этой странице вы можете настроить VLAN (виртуальные локальные сети). VLAN позволяет осуществить сегментацию сети, обычно осуществляемую отдельными роутерами. Данная функция помогает обеспечить расширяемость и высокий уровень безопасности вашей сети.';
var vlan_apply = 'Сохранить изменения';
var vlan_reset = 'Перезагрузить';

var vlan_enable = 'Активировать VLAN';
var vlan_id = 'VLAN ID:';
var vlan_tagtbl = 'Таблица тэгов';
var vlan_tagtbl_interface = 'Интерфейс';
var vlan_tagtbl_taged = 'Отмечено';
var vlan_tagtbl_untaged = 'Неотмечено';
var vlan_tagtbl_notin = 'не в этой VLAN';

var vlan_settbl = 'Таблица текущих настроек VLAN';
var vlan_settbl_id = 'VlanID';
var vlan_settbl_taged = 'Отмеченный интерфейс';
var vlan_settbl_untaged = 'Неотмеченный интерфейс';
var vlan_settbl_modify = 'Изменить';
var vlan_settbl_select = 'Выбрать';
var vlan_deletechick = 'Удалить выбранные';
var vlan_deleteall = 'Удалить все';

var vlan_nettbl = 'Таблица текущих настроек сетевых интерфейсов';
var vlan_nettbl_name = 'Интерфейс';
var vlan_nettbl_pvid = 'Pvid';
var vlan_nettbl_defprio = 'Приоритет по умолчанию';
var vlan_nettbl_defcfi = 'default Cfi';

var vlan_checkadd1 = 'Неверный vlan id, ожидается значение 1-4094';
var vlan_checkadd2 = 'Как минимум, один интерфейс должен быть привязан к данной VLAN!!';
var vlan_deletesel = 'Вы действительно хотите удалиь выбранные записи?';
var vlan_deleteall_conf = 'Вы действительно хотите удалиь вcе записи?';
var vlan_tbl_enable ='Включить';
var vlan_tbl_eth_wire ='Ethernet/Wi-Fi';
var vlan_tbl_wan_lan = 'WAN/LAN';
var vlan_tbl_tag = 'Тэг';
var vlan_tbl_priority = 'Приоритет';
var vlan_tbl_cfi = 'CFI';
var vlan_tbl_vid ='VID';

/***********	ipv6_wan.htm ************/
var alert_usrname_empty = 'Пожалуйста, введите имя пользователя.';
var alert_passwd_empty = 'Пожалуйста, введите пароль.';
var alert_no_css_support = 'Ошибка! Ваш браузер должен поддерживать CSS.';
var ipv6wan_intro = 'На этой странице вы можете настроить параметры подключения к Интернету. Выберите тип подключения, и введите необходимые настройки.';
var ipv6wan_origin_type = 'Тип источника:';
var ipv6wan_wan_link_type = 'Тип соединения:';
var ipv6wan_usrname = 'Имя пользователя';
var ipv6wan_passwd = 'Пароль';
var ipv6wan_connecttype = 'Тип подключения:';
var ipv6wan_connecttype_cont = 'Постоянное';
var ipv6wan_connecttype_ondem = 'По запросу';
var ipv6wan_connecttype_man = 'Вручную';
var ipv6wan_connect_on = 'Подключить';
var ipv6wan_connect_on = 'Отключить';
var ipv6wan_idletime ='Бездействие:';
var ipv6wan_min = ' минут';
var ipv6wan_oct = ' байт';
var ipv6wan_staticip = 'Статический IP';
var ipv6wan_staticip_ip = 'IP-адрес:';
var ipv6wan_staticip_pref = 'Длина префикса:';
var ipv6wan_staticip_defgw = 'Шлюз по умолчанию:';
var ipv6wan_staticip_defgw = 'Шлюз по умолчанию:';


/***********	OK_MSG ************/
var okmsg_explain = "<body><blockquote><h4>Изменения настроек прошли успешно!</h4>Изменения были сохранены. Чтобы они вступили в силу, необходимо перезагрузить роутер.<br>Вы можете перезагрузиться сейчас - или же продолжить настройки и перезагрузиться после. \n";
var okmsg_reboot_now = 'Перезагрузиться сейчас';
var okmsg_reboot_later = 'Перезагрузиться позже';

var okmsg_btn = '  OK  ';

var okmsg_fw_saveconf = 'Роутер заргужается.<br>Не выключайте и не перезагружайте устройство.<br>';
var okmsg_fw_opmode = 'Режим работы успешно изменён!';
var okmsg_fw_passwd = 'Изменения настроек прошли успешно!<br><br>Не выключайте и не перезагружайте устройство.';
/***************************************************************************************************************************************************************/
var status_root_ap = 'Root AP';


/**************** tunnel6.htm *******************/
var tunnel6_header = "Настройкка  туннеля 6to4";
var tunnel6_help = "Для настройки туннеля 6to4 вам необходимо установить статический IP-адрес для интерфейса WAN.";


var menu_usb = "USB";

/****************  tr069config.htm *******************/
var tr069_alert_empty = "ACS URL не может быть пустым!";
var tr069_alert_username = "Некорректное имя пользователя!";
var tr069_alert_userpass = 'Неверный пароль!';
var tr069_alert_interval =  "Пожалуйста, введите опредлённый временной интервал.";
var tr069_alert_interval09 = 'Интервал должен быть записан десятичными числами (0-9).';
var tr069_alert_patch = 'Неверный путь !';
var tr069_alert_port_number = "Пожалуйста, введите номер порта для запроса соединения.";
var tr069_alert_port_number2 = "Некорректный номер порта для запроса соединения. Введите номер порта в диапазоне от 1 до 65535.";
var tr069_title = "Настройка TR-069";
var tr069_info = "На этой странице вы можете настроить TR-069 CPE. Здесь вы можете поменять настройки ACS.";
var tr069_username = 'Имя пользователя:';
var tr069_userpass = 'Пароль:';
var tr069_periodic_inform = 'Включить периодическое информирование:';
var tr069_periodic_inform2 = 'Интервал периодического информирования:';
var tr069_request = "Запрос соеднинения:";
var tr069_path = "Путь:";
var tr069_port = "Порт:";
var tr069_apply = "Сохранить изменения";


/****************  usb_switch.htm *******************/
var usb_switch_title = 'Настройки USB';
var usb_switch_ftp = 'FTP-сервер:';
var usb_switch_samba = 'Samba-сервер:';
var usb_switch_dlna = 'DLNA/UPnP A/V сервер:';

/****************  dnsv6.htm *******************/
var ddnsv6_menu_title = 'Установки DNSv6';
var ddnsv6_title = 'Настройка DNSv6';
var ddnsv6_enbl = 'Включить DNSv6';
var ddnsv6_r_name = 'Имя роутера';

function dw(str)
{
	document.write(str);
}



