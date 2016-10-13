﻿var alertErrorCode = [['WLG_ScheduleSameRules','Невозможно добавить одно правило дважды.'],['WLG_W_ScheduleListMaxNum','Маршрутизатор поддерживает только до 21 периода.'],['DhcpplusValueBlank','Имя пользователя не может быть пустым!'],['DhcpplusPsdBlank','Введите пароль!'],['WLG_wirelesswepchange','ВАЖНАЯ ИНФОРМАЦИЯ: WEP может функционировать только со скоростью передачи данных "До 54 Мбит/с", а не со скоростью режима N.Для обеспечения поддержки режима N (полная скорость передачи данных) компания NETGEAR рекомендует использовать WPA2-PSK [AES].'],['WLG_wirelesswpachange','ВАЖНАЯ ИНФОРМАЦИЯ: WPA-PSK [TKIP] может функционировать только со скоростью передачи данных "До 54 Мбит/с", а не со скоростью режима N.Для обеспечения поддержки режима N (полная скорость передачи данных) компания NETGEAR рекомендует использовать WPA2-PSK [AES].'],['Areyousureyouwanttodeleteall','Эти значения будут удалены. Вы действительно хотите удалить их?'],['CheckServieMaxNum','Маршрутизатор поддерживает только 20 правил служб!'],['BlankGateway',"Недопустимый IP-адрес шлюза. Повторите попытку!"],['FW_Checkiprang','Недопустимый диапазон IP-адресов.'],['FW_Checksameip','Нельзя, чтобы IP-адрес для удаленного управления совпадал с IP-адресом Интернет-порта или включал его в указанном диапазоне.'],['FW_Checksubnet','IP-адрес не может быть в подсети локальной сети'],['FW_scheduleBlankDay' , 'Отметьте по крайней мере один день для блокировки!'],['CheckTimeOut','Значение времени ожидания инициирования порта не может быть неопределенным!'],['BKS_InvalidRts','Значение длины фрагментации выходит за пределы диапазона [256 - 2346].'],['BKS_InvalidFrag','Предельное значение CTS/RTS выходит за пределы диапазона [1 - 2347].'],['FW_scheduleInvalueTime','Недопустимый ввод времени.'],['STR_routesMetricWrong','Недопустимая метрика!'],['WLG_wdsBlankRepeaterMac','Введите MAC-адрес ретранслятора!'],['WLG_wirelessPassphraseWrongLength8','Недостаточная длина фразы-пароля. Пароль должен содержать минимум 8 символов.'],['WLG_wirelessPassphraseWrongLength63','Фраза-пароль состоит из 8-63 ASCII символов, либо ровно из 64 шестнадцатеричных цифр. К шестнадцатеричным относятся следующие символы: 0, 1, 2, ..., 8, 9, A, B, C, D, E, и F.'],['lanIpPoolStartWrong','Недопустимый начальный IP-адрес DHCP. Повторите попытку.\n'],['lanIpPoolEndWrong','Недопустимый конечный IP-адрес DHCP. Повторите попытку.\n'],['SelectUploadFile','Значение имени файла не было задано. Найдите и выберите файл обновления на жестком диске!'],['InvPriDNSServer','Недопустимый предпочитаемый DNS-адрес. Повторите попытку!\n'],['InvSecDNSServer','Недопустимый альтернативный DNS-адрес. Повторите попытку!\n'], ['InvDNSServerBlank','Необходимо указать адрес DNS'],['CheckServicPortRange','Значение конечного порта должно быть больше или равно значению начального порта.'],['EmailPassword','User name cannot be blank!'], ['CheckPortValue','Недопустимое значение начального/конечного порта.'], ['CheckPortStart','Недопустимое значение начального порта'], ['CheckPortEnd','Недопустимое значение конечного порта'], ['CheckPortStartEnd','Значение конечного порта должно быть больше или равно значению начального порта.'],['CheckPortBlank','Инициирование порта необходимо заполнить'],['CheckPortIdValue','Недопустимое Инициирование порта, должно быть в диапазоне 1-65535, исключая 80.'], ['CheckStartPortBlank','Начальный порт необходимо заполнить'],['CheckStartPortValue','Недопустимое Начальный порт, должно быть в диапазоне 1-65535, исключая 80'],['CheckEndPortValue','Недопустимое Конечный порт, должно быть в диапазоне 1-65535, исключая 80'], ['CheckEndPortBlank','Конечный порт необходимо заполнить'],['BKS_InvalidPoolRange','Недопустимый диапазон IP-адресов.'],['BKS_InvalidIP','Недопустимый IP-адрес. Повторите попытку!'],['BKS_Invalidkeyword','Недопустимый символ в ключевом слове'],['BKS_keywordInvalidIP','Недопустимый IP-адрес. Повторите попытку!'],['STR_routesGatewayWrong','Недопустимый IP-адрес шлюза. Повторите попытку!'],['STR_routesSubmaskWrong','Недопустимая маска сети. Повторите попытку!\n'],['STR_routesIpWrong','Недопустимый IP-адрес назначения. Повторите попытку.'],['STR_routesNameWrong','В имени маршрута недопустимо использование символов'],['STR_routesBlankWrong','Введите имя маршрута!'],['EmailMailServe','Ошибка: недопустимый адрес сервера SMTP'],['EmailSendToEmailAddress','Ошибка. Недопустимый адрес электронной почты!'],['DNSHostBlank','Введите имя хоста!'],['DNSUserBlank','Имя пользователя не может быть пустым!'],['DNSPasswordBlank','Введите пароль!'],['DNSHostWrong','Character is not allowed in Host name.'],['DNSUserWrong','Введите имя пользователя!'],['DNSPasswordWrong','Недопустимый пароль'],['Lan_lanIPConflitReverIP','Modify the IP address same with the IP saved in the reserved address. Modify or delete the conflicted IP address in the reserved address before change the IP address.'],['Lan_lanInvalidNameNull','Недопустимое имя устройства!'],['Lan_lanInvalidName','Недопустимое имя устройства!'],['Lan_lanInvalidMAC','Недопустимый MAC-адрес'],['Lan_lanInvalidIP','Недопустимый IP-адрес. Повторите попытку!'],['Lan_lanAlertOverwrite','Текущая запись дублирует введенные данные, \nперезаписать'],['WLG_wirelessWpsWarnKeyShare','Система безопасности WEP при настройке аутентификации \"Общий\" ключ не может работать с WPS. WPS будет недоступен. Продолжить?'],['WLG_wdsNotAuto','Функция беспроводной ретрансляции не может использоваться с каналом \"Авто\".Измените настройки канала перед включением функции беспроводной ретрансляции.'],['WLG_wdsWrongMac','Недопустимый MAC-адрес'],['WLG_wdsBlankBaseMac','Введите MAC-адрес базовой станции!'],['WLG_wdsWrongIp','_25D0_2594_25D0_25BB_25D1_258F _25D0_25BE_25D0_25B1_25D0_25B5_25D1_2581_25D0_25BF_25D0_25B5_25D1_2580F7076D82A'],['WLG_wirelessSsidBlankWarn','Заполните имя SSID!'],['WLG_wirelessSsidWrongWord','Недопустимый для SSID символ!'],['WLG_wirelessClacWithRepeater','Функция беспроводной ретрансляции не может использоваться с каналом \"Авто\".\nИзмените настройки канала перед включением функции беспроводной ретрансляции. '],['WLG_wirelessmsg_key64_type','Недопустимый ключ.\n\nКлючи должны состоять из 10 шестнадцатеричных символов (0~9 и A~F)'],['WLG_wirelessmsg_key128_type','Недопустимый ключ.\n\nКлючи должны состоять из 26 шестнадцатеричных символов (0~9 и A~F)'],['WLG_wirelessmsg_key152_type','Недопустимый ключ.\n\nКлючи должны состоять из 32 шестнадцатеричных символов (0~9 и A~F)'],['WLG_wirelessPassphraseWrongLength8','Недопустимый символ для фразы-пароля'],['WLG_wirelessPassphraseWrongLength63','Недопустимый символ для фразы-пароля'],['WLG_wirelessPassphraseWrong','Недопустимый символ для фразы-пароля'],['WLG_wirelessWrongRegionBlank','Выберите правильный регион вашего местонахождения'],['WLG_wirelesspassphraseStrBlankWarn','Введите пароль!'],['ipNotBetween','The IP is exceed the scope of DHCP pool.'],['lanIPInPoolWrong','The ip address can not within the address pool.'],['lanIpValueWromg','Недопустимый IP-адрес. Повторите попытку!'],['lanMaskValueWromg','Недопустимая маска сети. Повторите попытку!\n'],['lanIpPoolStartEndWrong','Недопустимый конечный и начальный IP-адрес DHCP. Повторите попытку!\n'],['lanEditBlankWarn','There is no address reservation item to edit.'],['pleasechooseanitemedit','Выберите элемент для правки.'],['pleasechooseanitemedelete','Выберите элемент для удаления.'],['WebIdleTimeOut','Web Idle Time Out:5~30 minutes.'],['WebIdleTimeOutInvalid','Web Idle Time Out must be integer.'],['NewAndConfirmPasswdNotSame','Введенные пароли не совпадают, повторите попытку:'],['NewPasswordTooLong','Maximum password length is 32 characters.'],['VerifyPasswdNotSame','Password and verify Password are not the same!'],['SelectWANFirst','Please select a WAN interface at first.'],['NoServiceSelected','No service is selected!'],['NotSupportSelection','Not support selection'],['EnterAName','Please enter a rule name.'],['NoApplicationSelected','No application is selected.'],['RequirePortsRange','Please enter a range of triggering/open ports.(From/To)'],['OutOfRules','Out of max rules.'],['RefreshTimeError','Refresh time is too short or too long.'],['InvImgFile','Выберите надлежащий файл настроек.'],['Areyousureyouwanttodeletethisitem','Are you sure you want to delete this item?'],['InvDNSServer','Недопустимый предпочитаемый DNS-адрес. Повторите попытку!\n'],['InvPortNumber','Недопустимый номер порта. Он должен быть в диапазоне [1024-65534]. '],['CheckServicStartPort','Недопустимое значение начального/конечного порта.'],['CheckServicEndPort','Недопустимое значение начального/конечного порта.'],['InvUPnPPeriod','Недопустимое значение периода объявления. Данное значение должно быть в диапазоне 1-1440!'],['InvUPnPTTL','Недопустимое значение начального порта'],['ConfirmRevert','You need revert to factory default settings?'],['ConfirmReboot','Вы хотите, чтобы приложение NETGEAR Genie перезагрузило маршрутизатор?'],['ChangeLanIP','You should release and renew PC\'s IP address before click"Apply'],['ChangeLanIPMakeSure','Do you want to change your LAN IP address?'],['StaticRouteNullName','Введите имя маршрута!'],['OverLimitRate','Пропускная способность для Qos в Мбит/с должна составлять 1 до 100. '],['OverLimitRate2','Пропускная способность для Qos в Мбит/с должна составлять 1 до 100. '],['EmailMailServe','Ошибка: недопустимый адрес сервера SMTP'],['EmailSendToEmailAddress','Ошибка. Недопустимый адрес электронной почты!'],['EmailYourEmailAddress','Your e-mail address can not be blank!'],['EmailUserNamePassword','The name and the password of login the e-mail server both can not be blank!!'],['EmailPassword','Введите пароль!'],['TraffMeterMonLimBlank','Недопустимое числовое значение для месячного ограничения.\n'],['TraffMeterRoundVolBlank','Недопустимое значение для округления объема данных.'],['TraffMeterLeftVolBlank','Недопустимое числовое значение для &quot;водяного знака&quot; в контроле трафика.\n'],['TraffMeterMonLimZero','Monthly limit cannot be 0.'],['TraffMeterRoundVolSmaller','Округленное значение должно быть меньше месячного ограничения.\n'],['TraffMeterLeftVolSmaller','Значение &quot;водяного знака&quot; должно быть меньше месячного ограничения.\n'],['TraffMeterTimeInput','Недопустимый ввод времени.'],['TraffMeterTimeInputNoNum','Недопустимый ввод времени.'],['PolicyNullName','Введите имя политики QoS!'],['OverLimitRate','Пропускная способность для Qos в Мбит/с должна составлять 1 до 100. '],['OverLimitRate2','Пропускная способность для Qos в Мбит/с должна составлять 1 до 100. '],['WlreNotAuto','Wireless repeating function cannot be used with Auto channel and wireless security options WPA-PSK[TKIP], WPA2-PSK[AES] and WPA-PSK[TKIP]+WPA2-PSK[AES].Please change your channel setting and security option before you enable Wireless Repeating Function.'],['WlreWpsOffWarn','Функция беспроводной ретрансляции не может работать с WPS, WPS в диапазоне a/n становится недоступной. Продолжить?'],['WlreRepeaterBlankWarn','Введите MAC-адрес ретранслятора!'],['WlreBasicBlankWarn','Введите MAC-адрес базовой станции!'],['PinInputWrongBlank','A PIN can\'t be blank.'],['PinInputWrongNoNum','PIN-код представляет собой последовательность из 4 или 8 цифр.'],['PinInputWrongInvalid','Неверный PIN-код. Проверьте PIN-код еще раз.\n'],['DhcpLeaseTimeWrongWarn','Only input positive integer(1~160).'],['CheckServicTypeBlank1','Недопустимый тип определенной пользователем службы.'],['CheckServicTypeBlank2','Service type can not contain one or more space characters,space characters of the string will be ignored.'],['CheckBlank','White space at the end of the string will be ignored.White space at the beginning of the string will be ignored.'],['CheckSecurityPwd2','Insufficient passphrase length, should be minimum of 8 characters long.'],['CheckServicNameBlank1','Недопустимое имя службы!'],['CheckPassphrase','Enter the PassPhrase can not contain "\","|","`" special characters.'],['CheckSecurityKey1','Invalid key.Keys length should be 10 Hex [0-9] or [a-f] or [A-F] chars.'],['CheckSecurityKey2','Invalid key.Keys length should be 26 Hex [0-9] or [a-f] or [A-F] chars.'],['CheckSSID','SSID value only contain [0-9] or [a-f] or [A-F], underscore (_) or the dash (-).'],['CheckDvNameBlank1','Имя устройства не может быть пустым'],['CheckDvNameBlank2','Device name can not contain one or more space characters,space characters of the string will be ignored.'],['CheckIpValue1','Недопустимый IP-адрес. Повторите попытку!'],['CheckIpValue2','It should be a [0-9] number.'],['CheckIpValue3','Недопустимый IP-адрес. Повторите попытку!'],['CheckIpValue4','Недопустимый IP-адрес. Повторите попытку!'],['CheckIpValue5','Недопустимый IP-адрес. Повторите попытку!'],['CheckIpValue6','Недопустимый IP-адрес. Повторите попытку!'],['CheckIpValue7','Недопустимый IP-адрес. Повторите попытку!'],['pfCheckIp','Недопустимый IP-адрес. Повторите попытку!'],['CheckServicNameBlank2','Имя службы не могут содержать один или несколько символов пространство, пространство символов строки будут проигнорированы.'],['RestartCounter','Сбросить счетчик?'],['URLBlankDetected','A space detected in your keyword.'], ['WAN_MtuInvalid','Invalid MTU size. Please enter a positive integer.'],['WAN_MtuDhcpValid','Недопустимое значение MTU, допустимый диапазон 616 – 1500'],['WAN_MtuPPPoEValid','Недопустимое значение MTU, допустимый диапазон 616 – 1492'],['WAN_MtuPPTPValid','Недопустимое значение MTU, допустимый диапазон 616 – 1436'],['WAN_MtuL2TPValid','Недопустимое значение MTU, допустимый диапазон 616 – 1428'],['MyIpSameAsServerIp','Мой IP-адрес не должен совпадать с адресом сервера!'],['WLG_wdsMacSameWirlessMac1','MAC-адрес базовой станции не должен совпадать с MAC-адресом маршрутизатора'],['WLG_wdsMacSameWirlessMac2','MAC-адрес ретранслятора не должен совпадать с MAC-адресом маршрутизатора'],['DmzpfCheckIp','IP-адрес DMZ не должен совпадать с IP-адресом LAN!'],['BlankIdletime','Введите продолжительность паузы.'],['Theseitemswillbealldeleted','Эти значения будут удалены. Вы действительно хотите удалить их?'],['BlankImgFile','Имя для беспроводной сети.'],['Downlanguagefail','Маршрутизатору не удается загрузить требующуюся таблицу языков, повторите попытку позже.'],['NoInternet','Нет подключения к Интернету.'],['DmzIPfalse','Данный IP-адрес должен находится в одной подсети с IP-адресом локальной сети LAN.']];
