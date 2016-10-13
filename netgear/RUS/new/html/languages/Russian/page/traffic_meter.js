﻿var data_language = {innerHTML : {'lang_Traffic_Meter' : 'Счетчик трафика','lang_mbyte1':'МБайт','lang_mbyte2':'МБайт','lang_Internet_Traffic_Meter' : 'Статистика Интернет-трафика','lang_enable_traffmeter' : 'Включить счетчик трафика','lang_TrffcVlmCtl' : 'Контроль трафика','lang_Nolimit' : 'Не ограничено','lang_Downloadonly' : 'Только загрузка','lang_Bothdirections' : 'Оба направления','lang_monthly_limit1' : 'Месячное ограничение','lang_round_up' : 'Округление объема данных для каждого подключения до','lang_CnnTimeCtl' : 'Контроль времени соединения','lang_monthly_limit2' : 'Месячное ограничение','lang_hours' : 'часы','lang_Traffic_Counter' : 'Счетчик трафика','lang_restart_traffcounter' : 'Сбросить счетчик трафика в','lang_per_month' : 'на','lang_day' : 'Дни','lang_Traffic_Control' : 'Контроль трафика','lang_popup_warning' : 'Отображать предупреждения','lang_mlimit_remaimd1' : '','lang_mlimit_remaimd2' : 'МБайт/мин. до достижения месячного ограничения','lang_reach_limit' : 'При достижении месячного ограничения','lang_TrffcCtlDiscnn' : 'разорвать соединение с Интернетом','lang_Internet_Traffic_Statistics' : 'Статистика Интернет-трафика','lang_StartDataAndTime' : 'Дата и время начала: ','lang_CurrDataAndTime' : 'Текущие дата и время: ','lang_CountingPeriod' : 'Период подсчета','lang_TrafficVolume1':'Отдача/среднее значение','lang_TrafficVolume2':'Загрузка/среднее значение','lang_TrafficVolume3':'Всего/среднее значение','lang_ConnectionTime' : 'Время подключения<br>(чч:мм)','lang_TrafficVolume' : 'Объем трафика (МБайт)','lang_Today' : 'Сегодня','lang_Yesterday' : 'Вчера','lang_Thisweek' : 'За неделю','lang_Thismonth' : 'За текущий месяц','lang_Lastmonth' : 'За прошедший месяц','lang_help' : '<body bgcolor=#0099cc><P><font size=4><B> Справка по счетчику трафика </B></font></P><A name=internet></A><H2 class=helpfile> Счетчик интернет-трафика </H2><A name=meter></A><P><B> Включить счетчик трафика </B> <BR> Установите этот флажок, если вы хотите, чтобы маршрутизатор подсчитывал объем интернет-трафика, проходящего через интернет-порт. <P><B> Режим контроля объема трафика </B> <BR> Выберите этот параметр, если вы хотите, чтобы маршрутизатор подсчитывал и ограничивал объем интернет-трафика, проходящего через интернет-порт.<UL><LI> Не ограничен – Если выбрана эта опция, то указанное ограничение не будет применяться при достижении заданного предела трафика.<LI> Только загрузка – Если выбрана эта опция, то указанное ограничение будет применяться только для входящего трафика. <LI> Оба направления – Если выбрана эта опция, то указанное ограничение будет применяться и для входящего, и для исходящего трафика</UL><P><B> Контроль времени соединения</B> <BR> Выберите эту опцию, если вы хотите, чтобы маршрутизатор контролировал и ограничивал время использования интернет-соединения. Эта опция доступна только для соединений по протоколам PPPoE, PPTP и L2TP.<P><B> Месячное ограничение </B><BR> Введите месячное ограничение объема трафика или ограничение времени соединения.<P><B> Округление объема данных для каждого подключения до</B> <BR> Некоторые провайдеры начисляют плату за определенный дополнительный объем данных при установлении пользователями нового соединения. В таком случае в этом поле следует ввести значение дополнительного объема этих данных.<A name=counter></A><H2 class=helpfile> Счетчик трафика</H2><P><B> Сброс счетчика трафика</B><BR> Этот параметр определяет время перезапуска счетчика трафика. Выберите требуемое время и день месяца.<P><B> Сбросить счетчик сейчас</B> <BR> При нажатии этой кнопки выполняется немедленный перезапуск счетчика трафика.<A name=reached></A><H2 class=helpfile> Контроль трафика</H2><P><B> Отображать предупреждения</B><BR> Если в этом поле введено ненулевое значение, то после достижения заданной величины маршрутизатор выведет предупреждающее сообщение, когда будет достигнут месячный предел для объема данных/времени соединения. Всплывающее сообщение может отображаться только в том случае, если открыто окно "Состояние трафика".<P><B> При достижении месячного ограничения</B><BR><P> Выберите требуемое действие (действия):<UL> <LI> Включить мигание индикатора интернет-порта зеленым и желтым – индикатор интернет-соединения будет попеременно загораться зеленым и желтым цветом. <LI> Разорвать соединение с Интернетом – будет заблокирован весь доступ к Интернету. </UL><A name=statistics></A><H2 class=helpfile> Статистика интернет-трафика</H2><P> Отображается статистика по интернет-трафику, проходящему через интернет-порт. <BR> Если счетчик трафика не включен, эта статистика не предоставляется. <P><B> Состояние трафика</B> <BR><BR> При нажатии этой кнопки выводится текущая обновленная информация о состоянии использования интернет-трафика.<P></P></body>'},value : {'restartCounter' : 'Сбросить счетчик сейчас','refresh' : 'Обновить','traffic_status' : 'Состояние трафика','Apply' : 'Применить','Cancel' : 'Отмена'}};
var lang_traffmeter_week = ['Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'];
var lang_traffmeter_vlmtime_left = ['Объем оставшегося трафика: ','Не ограничено','Приблизительное оставшееся время'];
