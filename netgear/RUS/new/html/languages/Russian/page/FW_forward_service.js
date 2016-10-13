﻿var data_language = {innerHTML : {'lang_Internal_startport' : 'Внутренний начальный порт', 'lang_Internal_endport' : 'Внутренний конечный порт', 'lang_same_portRange' : 'Использовать тот же диапазон портов для внутреннего порта','lang_device' : '<b>Или</b> выбрать из текущих подключенных устройств','td_Clients_head1' : 'IP-адрес', 'td_Clients_head2' : 'Имя устройства','lang_custum_service' : 'Порты - собственные службы','lang_servicename' : 'Имя службы','lang_Region' : 'Протокол','lang_startport' : 'Внешний начальный порт','lang_endport' : 'Внешний конечный порт','lang_ipaddress' : 'IP-адрес сервера','lang_help' : '<body bgcolor=#0099cc ><P><font size=4><B> Справка по переадресации порта / инициированию порта </B></font></P><p>Инициирование порта &#150; расширенная функция, которая может использоваться для игр и других Интернет-приложений. Переадресация порта имеет похожие функции, но она статична и имеет некоторые ограничения. </p><p>Инициирование порта временно открывает входной порт и не требует от Интернет-сервера запись вашего IP-адреса, если он, например, был изменен DHCP. </p><p>Инициирование порта отслеживает исходящий трафик. Если маршрутизатор обнаруживает трафик в определенном исходящем порте, он запоминает IP-адрес компьютера, посылающего данные и &quot;инициирует&quot; входящих порт. Входящий трафик на инициируемом порте переадресовывается на инициируемый компьютер.</p><p><a name=select></a>С помощью страницы <B>Переадресация порта / инициирование порта</B> можно сделать локальные компьютеры или серверы доступными для различных Интернет-служб (например, FTP или HTTP), для игр в Интернете (например, Quake III) или для использования Интернет-приложений (например, CUseeMe).</p><p>Переадресация порта разработана для FTP, веб-сервера или других услуг на основе сервера. Как только переадресация порта установлена, запросы из Интернета будут переадресовываться на необходимый сервер. </p><p>Инициирование порта разрешает запросы из Интернета только после того, как указанный порт инициирован\'. Инициирование порта применяется к чату и Интернет-играм.</p><hr><p><B>Переадресация порта</B></p><p>Для услуг, приложений или игр, которые уже присутствуют в раскрывающемся списке необходимо указать только IP-адрес компьютера. Если их нет в списке, необходимо указывать номер порта и IP-адрес компьютера для каждой службы, игры или приложения при помощи кнопки <B>Добавить собственную службу</B>. </p><p><B> Присваивание порта </B></p><p>Можно осуществлять до 20 различных присваиваний для Интернет-служб, приложений или игр. В списке &quot;Имя службы&quot; можно выбрать службу, приложение или игру. Если элемент, который вы хотите добавить, отсутствует в списках, уточните у разработчика программного обеспечения или игр соответствующий порт.</P><p><B> Работа с Интернет-службами </B></p><p> Перед началом работы необходимо определить тип предоставляемых служб и IP-адрес компьютера, предоставляющего эти службы. Наиболее распространенные службы предоставляют веб (HTTP) -сервер или FTP-сервер.</p><a name=setup></a><p>Для настройки доступа к Интернету или Интернет-службам компьютера или сервера выполните следующее:<ol> <li> в списке &quot;Имя службы&quot; выберите Интернет-службу, которую необходимо использовать. </li> <li> Введите IP-адрес компьютера в поле <B>IP-адрес сервера</B>. </li> <li> Щелкните <B>Добавить</B>. </li></ol></P><p> <B> Примечание.</B> Можно иметь одиночныйкомпьютер или сервер, доступный для более чем для одного типа службы. Для этого выберите другую службу и введите тот же IP-адрес, что и для компьютера или сервера.</p><p><B> Работа с Интернет-играми и приложениями </B></p><p> Перед началом работы необходимо узнать, какую службу, приложение или игру необходимо настроить. Также необходимо иметь IP-адрес компьютера, который будет использоваться.</p><p> Чтобы настроить компьютер для игр в Интернете или для использования Интернет-приложений, выполните следующее:<ol> <li> Выберите Интернет-приложение или игру, которую необходимо использовать из соответствующих списков. <BR>Заполните поля &quot;Начальный порт&quot; и &quot;Конечный порт&quot;. <BR><B>Примечание. </B>Если необходимую игру или приложение не удается найти ни в одном из списков, щелкните кнопку <B>Добавить собственную службу</B> и введите информацию в поля <B>Имя службы</B>, <B>Начальный порт</B>, <B>Конечный порт</B> и <B>IP-адрес сервера</B>. </li> <li> Введите IP-адрес компьютера в поле <B>IP-адрессервера</B>. </li> <li> Щелкните <B>Добавить</B>. </li></ol></P><p> Чтобы настроить еще один компьютер для игры, например в Hexen II или KALI, выполните следующее:<ol> <li> Щелкните кнопку <B>Добавить собственную службу</B>. </li> <li> Введите имя службы в поле<B> Имя службы</B>. </li> <li> Введите номер начального порта в поле <B>Начальный порт</B>. <BR> Для данных игр используйте номер, предоставляемый в списке по умолчанию, и прибавьте +1 для каждого дополнительного компьютера. Например, если один компьютер уже настроен для игры в Hexen II и использует порт 26900, номер порта второго компьютера будет 26901, третьего &#151; 26902. </li> <li> Введите тот же номер порта в поле <B>Конечный порт</B>. </li> <li> Введите IP-адрес компьютера в поле <B>IP-адрес сервера</B>. </li> <li> Нажмите <B>Применить</B>. </li></ol></P><p>Чтобы редактировать запись службы, выполните следующее:<ol> <li> Щелкните переключатель записи в таблице. </li> <li> Щелкните <B>Редактировать службу</B> </li> <li> Измените информацию в полях <B>Имя службы</B>, <B>Начальный порт</B>, <B>Конечный порт</B> и <B>IP-адрес сервера</B>. </li> <li> Нажмите <B>Применить</B>. </li></ol></P><p>Чтобы удалить запись службы, выполните следующее:<ol> <li> Щелкните переключатель записи в таблице. </li> <li> Щелкните<B> Удалить службу</B>. </li></ol></body>'},value : {'Apply' : 'Применить','Cancel' : 'Отмена'}};
