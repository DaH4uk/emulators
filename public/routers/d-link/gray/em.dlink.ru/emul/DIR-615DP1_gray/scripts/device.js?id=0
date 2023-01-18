



















var CGI_URL = document.location.protocol + "//" + document.location.host + document.location.pathname;
var mode_emul = true;

var device = new function() {
	
	var self = this;
	var $$ = {};
	var UINT_MAX = 4294967295;
	
	$$.state = {					// Состояние устройства
		hold: false,				// Блокировка
		available: true,			// Доступность
		stripping: false			// Отсеивание дубликатов
	};
	$$.tasks = {					// Запросы
		list: new Array(),			// Список активных запросов
		queue: new Array(),			// Список запросов находящихся в очереди
		limit: UINT_MAX				// Макс. кол-во активных запросов
	};
	$$.subscribers = new Array();	// Подписчики на сигналы
	$$.filters = new Array();		// Список фильтрующий функций
	$$.ID = {
		__N: 0,
		get: function(){
			return ++this.__N;
		}
	};
	$$.authData = {
		/* Индивидуальные авторизационные данные RPC.
		 * Устанавливаются методом setAuthData.
		 * Очищаются методом clearAuthData.
		 * Применяются методом $$.prepareData.
		 * В групповых запросах не работают из-за ограничений на серверной стороне.
		<RPC ID>: {
				login: <login>,
				password: <password>
			}
		*/
	};				
	
	this.signal = $$.signal = {
		SUCCESS: 's_success',
		PROCESS: 's_process',
		ERROR: 's_error',
		LOCK: 's_lock',
		AVAILABLE: 's_available',
		ABORT: 's_abort'
	};
	this.notify = $$.notify = {
		AUTH: 'n_auth',
		PASSWD: 'n_passwd',
		REBOOT: 'n_reboot',
		SAVE: 'n_save',
		RESET: 'n_reset',
		PIN: 'n_pin',
		SMS: 'n_sms',
		MODE: 'n_mode',
		UPDATE: 'n_update',
		MOUNT: 'n_mount',
		WIFI: 'n_wifi',
		LTESTATUS: 'n_ltestatus',
		WIFI: 'n_wifi'
	};
	
	/* Заблокировать/Разблокировать устройство
	 * */
	this.lock = function(__lock) {
		if (is.bool(__lock)) {
			$$.state.hold = __lock;
			$$.emit(this.signal.LOCK, __lock);
			return this;
		}
		return $$.state.hold;
	}
	
	/* Смена режима отсеивание дубликатов
	 * */
	this.strip = function(__stripping) {
		if (is.bool(__stripping)) {
			$$.state.stripping = __stripping;
			return this;
		}
		return $$.state.stripping;
	}
	
	/* Текущее состояние доступности устройства
	 * */
	this.available = function() {
		return $$.state.available;
	}
	
	/* Общее кол-во запросов на данный момент
	 * */
	this.count = function() {
		return $$.tasks.list.length + $$.tasks.queue.length;
	}
	
	/* Задать макс. кол-во активных запросов
	 * */
	this.limit = function(__length) {
		if (is.number(__length)) {
			$$.tasks.limit = (__length > 0) ? __length : UINT_MAX;
			return this;
		}
		return ($$.tasks.limit == UINT_MAX) ? 0 : $$.tasks.limit;
	}
	/* Вычисляет контрольную сумму для токена(защита от CSRF)
	 * */
	this.tokenget = function() {
		var pass = getCookie("client_password");
		var token = null;
		if(pass) {
			for (var i = 0; i<pass.length; i++) {
				token += pass[i].charCodeAt();
			}
			return token.toString();
		}
		return null;
	}
	
	/* Protected
	 * Преобразовать принятые данные
	 * */
	$$.parseData = function(__data) {
		var answer = null;
		if (is.set(__data)) {
			try {
				eval('answer = ' + __data);
				// Генерация сигналов (событий)
				if (is.object(answer) && is.set(answer.deviceResponse)) {
					// В данном контексте this это $$
					
					this.emit(this.notify.AUTH, is.bool(answer.auth) && answer.auth == true);
					this.emit(this.notify.PASSWD, is.number(answer.passwStatus) && answer.passwStatus == 15);
					this.emit(this.notify.REBOOT, is.number(answer.getConfigStatus) && answer.getConfigStatus == 12);
					this.emit(this.notify.SAVE, is.number(answer.getConfigStatus) && answer.getConfigStatus == 13);
					this.emit(this.notify.RESET, is.number(answer.needReset) && answer.needReset == 13);
					this.emit(this.notify.PIN, is.number(answer.pinstatus) && answer.pinstatus > 0 && answer.pinstatus < 5, answer.pinstatus);
					this.emit(this.notify.SMS, is.number(answer.newSmsStatus) && answer.newSmsStatus == 20);
					this.emit(this.notify.MODE, is.set(answer.deviceModeChange));
					this.emit(this.notify.UPDATE, is.object(answer.autoupdate) && answer.autoupdate.enable && answer.autoupdate.available, answer.autoupdate);

					if (is.number(answer.lteStatus) && answer.lteStatus == 76) {
						var ltestatus = answer.lteStatus;
						var ltesubnet = null;
						if (is.object(answer.lte_subnet) && answer.lte_subnet.lte_intersected_subnet) {
							ltesubnet = answer.lte_subnet.lte_intersected_subnet;
						};
						this.emit(this.notify.LTESTATUS, ltestatus, ltesubnet);
					}
					if (answer.rpcWiFi) {
						var wifiopen = '';
						if (is.object(answer.rpcWiFi) && answer.rpcWiFi.Radio && (answer.rpcWiFi.mbssid[0].AuthMode == 'OPEN' && answer.rpcWiFi.mbssid[0].EncrypType != 'WEP')) {
							wifiopen += '2.4G';
						}
						if (!!answer.rpcWiFi["5G_mbssid"] && is.object(answer.rpcWiFi["5G_mbssid"][0]) && !!answer.rpcWiFi["5G_Radio"] && answer.rpcWiFi["5G_mbssid"][0].AuthMode == 'OPEN' && answer.rpcWiFi["5G_mbssid"][0].EncrypType != 'WEP') {
							wifiopen += '5G';
						}
						if(answer.rpcWiFi.apcli && is.object(answer.rpcWiFi.apcli) && answer.rpcWiFi.apcli.ApCliEnable){
							wifiopen = '';
						}
						if (wifiopen != '') {
							this.emit(this.notify.WIFI, true, wifiopen);
						} else {
							this.emit(this.notify.WIFI, false, wifiopen);
						}
					}
					var mounted = false;
					if(answer.usb_volume && answer.usb_volume.usb_storage){
						for(var i in answer.usb_volume.usb_storage){
							mounted = true;
							break;
						}
					}
					if(this.mounted != mounted){
						this.mounted = mounted;
						this.emit(this.notify.MOUNT, mounted, mounted?answer.usb_volume.usb_storage:{});
					}
				}
			}
			catch(e) {
				answer = { baddata: true };
			}
		}
		return answer;
	}
	
	/* Protected
	 * Подготовка данных для отправки запроса
	 * */
	$$.prepareData = function(__data) {
		var data = '';
		if (is.object(__data)) {
			//Ищем индивидуальные данные авторизации RPC.
			//В групповых запросах не работают из-за ограничений на серверной стороне.
			var auth = $$.authData[__data.res_config_id];
			if (auth) {
				data	+=	"onceauth=y"
						+	"&login=" + auth.login
						+	"&password=" + auth.password
						+	"&";
			}
			var value;
			for(var key in __data) {
				if (is.string(__data[key])) {
					value = escape(__data[key]);
				} else if (is.object(__data[key])) {
					value = $.toJSON(escape(__data[key]));
				} else {
					value = __data[key]/*.toString()*/;
				}
				data += key + '=' + value + '&';
			}
		} else if (is.string(__data)) {
			data = __data;
		}
		return data;
	}
	
	/* Запрос
	 * */
	this.request = function(__url, __type, __data, __callback, __id) {
		// Защита от CSRF
		$.ajaxSetup({ headers: {'X-Csrf-Token':'token'}});
		if (device.tokenget()) {
			if(__data) {
				if(typeof(__data) == 'string') {
					__data += '&tokenget=' + device.tokenget();
				} 
				else {
					if(typeof(__data) == 'object') __data['tokenget'] = device.tokenget();
				}
			}
		}
		if (!$$.state.hold && $$.filtering(__url, __type, __data, __callback)) {
			if ($$.state.stripping) {
				// Ищем дубликаты в активных запросах
				var __dataTemp = $.toJSON(__data);
				for (var i = 0; i < $$.tasks.list.length; i++) {
					if ($$.tasks.list[i].stamp[3] === __callback && 
						$.toJSON($$.tasks.list[i].stamp[2]) == __dataTemp) {
							return $$.tasks.list[i].stamp[4];
					}
				}
				// Ищем дубликаты в очереди
				for (var i = 0; i < $$.tasks.queue.length; i++) {
					if ($$.tasks.queue[i][3] === __callback && 
						$.toJSON($$.tasks.queue.list[i][2]) == __dataTemp) {
							return $$.tasks.queue[i][4];
					}
				}
			}
			var argv = Array.prototype.slice.call(arguments);
			if (is.unset(__id)) {
				__id = argv[4] = $$.ID.get();	// Генерируем ID
			}
			
	
	
		   var __timeout = 180000; 
		   var __preparedData = $$.prepareData(__data);
			   
			
			// Запрос
			if ($$.tasks.list.length < $$.tasks.limit) {
				var xhr = $.ajax({
					url: __url,
					type: __type,
					data: __preparedData,
					cache: false,
					timeout: __timeout,
					context: this,
					global: false, /* Отключаем глобальные события ajaxStart, ajaxStop и т.д. */
					beforeSend: function(jqXHR, settings){
						jqXHR.stamp = argv;		// Слепок исходных данных запроса
						jqXHR.callback = __callback;
						$$.tasks.list.push(jqXHR);
						$$.emit(this.signal.PROCESS, true, jqXHR);
					},
					success: function(data, textStatus, jqXHR){
						jqXHR.answer = $$.parseData(data);
					},
					error: function(jqXHR, textStatus, errorThrown){
						jqXHR.answer = null;
					},
					complete: function(jqXHR, textStatus) {
						$$.tasks.list.splice(indexOf($$.tasks.list, jqXHR), 1);
						// Проверяем доступность устройства
						$$.state.available = !(textStatus == 'error' && jqXHR.readyState == 0 && jqXHR.status == 0);
						$$.emit(this.signal.PROCESS, false, jqXHR);
						$$.emit(this.signal.AVAILABLE, $$.state.available);
						$$.emit(this.signal.ERROR, textStatus == 'error');
						$$.emit(this.signal.ABORT, textStatus == 'abort');
						// Обрабатываем очередь
						while ($$.tasks.queue.length > 0 && $$.tasks.list.length < $$.tasks.limit) {
							this.request.apply(this, $$.tasks.queue.shift());
						}
						// Разбор полетов
						switch (textStatus) {
							case 'success':
								$$.emit(this.signal.SUCCESS, jqXHR.answer);
								if (is.func(jqXHR.callback)) jqXHR.callback(jqXHR.answer);
								break;
							case 'error':
								// dummy
								break;
							case 'timeout':
								// dummy
								break;
							case 'abort':
								// dummy
								break;
							case 'parsererror':
								// dummy
								break;
							case 'notmodified':
								// dummy
								break;
						}
					}
				});
			} else {
				$$.tasks.queue.push(argv);
			}
			return __id;
		}
		return null;
	}
	
	/* Остановить запрос
	 * */
	this.stop = function(__id) {
		if (is.set(__id)) {
			for (var i = 0; i < $$.tasks.queue.length; ) {
				if ($$.tasks.queue[i][4] === __id) {
					$$.tasks.queue[i].splice(i, 1);
				} else i++;
			}
			for (var i = 0; i < $$.tasks.list.length; ) {
				if ($$.tasks.list[i].stamp[4] === __id) {
					$$.tasks.list[i].abort();
				} else i++;
			}
		} else { // stop all
			$$.tasks.queue = new Array();
			while ($$.tasks.list.length) {
				$$.tasks.list[0].abort();
			}
		}
		return this;
	}
	
	/* Подписаться на сигнал
	 * */
	this.hook = function(event, func) {
		if (is.string(event) && is.func(func)) {
			if (is.unset($$.subscribers[event])) $$.subscribers[event] = new Array();
			$$.subscribers[event].push(func);
		}
		return this;
	}
	
	/* Снять подписку на сигнал
	 * */
	this.unhook = function(event, func) {
		if (is.string(event)) {
			if (is.set($$.subscribers[event])) {
				if (is.set(func)) {
					for (var i = 0; i < $$.subscribers[event].length; ) {
						if ($$.subscribers[event][i] === func) {
							$$.subscribers[event].splice(i, 1);
						} else i++;
					}
				} else {
					delete $$.subscribers[event];
				}
			}
		}
		return this;
	}
	
	/* Добавить функцию фильтрации данных
	 * */
	this.filter = function(func){
		if (is.set(func)) {
			$$.filters.push(func);
		}
		return this;
	}
	
	/* Удалить функцию фильтрации данных
	 * */
	this.unfilter = function(func){
		if (is.set(func)) {
			for (var i = 0; i < $$.filters.length; ) {
				if ($$.filters[i] === func) {
					$$.filters.splice(i, 1);
				} else i++;
			}
		}
		return this;
	}
	
	/* Установить индивидуальные данные авторизации для RPC
	 * */
	this.setAuthData = function(__id, __login, __password) {
		$$.authData[__id] = {login: __login, password: __password};
		return this;
	}

	/* Очистить индивидуальные данные авторизации для RPC
	 * */
	this.clearAuthData = function(__id, __login, __password) {
		delete $$.authData[__id];
		return this;
	}

	/* Protected
	 * Послать сигнал
	 * */
	$$.emit = function(event) {
		if (is.string(event)) {
			if (is.set($$.subscribers[event])) {
				for (var i = 0; i < $$.subscribers[event].length; i++) {
					$$.subscribers[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		}
		return this;
	}
	
	/* Protected
	 * Фильтрация данных
	 * */
	$$.filtering = function(/*url, type, data, cb*/) {
		var flag = true;
		for (var i = 0; i < $$.filters.length; i++) {
			flag = flag && $$.filters[i].apply(this, arguments);
		}
		return flag;
	}
	
	/* Системные команды
	 * */
	this.system = {
		// Перезагрузка (с возможностью сохранения)
		reboot: callback(this, function(save, __callback){
			var cmd = (save == true) ? 8 : 6;
			if (is.func(arguments[0])) {
				__callback = arguments[0];
			}
			return this.request(CGI_URL, 'get', {
				res_cmd: cmd,
				res_cmd_type: 'nbl',
				rq:	'y',
				v2:	'y',
				proxy: 'y'
			}, __callback);
		}),
		// Сохранение конфигурации
		save: callback(this, function(__callback){
			return this.request(CGI_URL, 'get', {
				res_cmd: 20,
				res_cmd_type: 'bl',
				rq:	'y',
				v2:	'y',
				proxy: 'y'
			}, __callback);
		}),
		// Сброс к заводским настройкам
		reset: callback(this, function(__callback){
			return this.request(CGI_URL, 'get', {
				res_cmd: 10,
				res_cmd_type: 'bl',
				rq:	'y',
				v2:	'y',
				proxy: 'y'
			}, __callback);
		}),
		// Резервная копия данных
		backup: callback(this, function(__callback){
			return this.request(CGI_URL, 'get', {
				res_cmd: 12,
				res_cmd_type: 'bl',
				rq:	'y',
				v2:	'y',
				proxy: 'y'
			}, callback(window, function(__callback){
				document.location.href = CGI_URL + '?v2_action=givemeconfig&proxy=y&tokenget=' + device.tokenget();
				if (is.func(__callback)) __callback.call(window);
			}, __callback));
		}),
		log: callback(this, function(mail, __callback){
			if (mail == true) {
			} else {
				document.location.href = CGI_URL + '?v2_action=exportlog&proxy=y&tokenget=' + device.tokenget();
			}
			return self;
		}),
		// Восстановление конфигурации из резервной копии
		restore: callback(this, function(){
			// dummy
			/*return this.request(CGI_URL, 'get', {
				res_cmd: 11,
				res_cmd_type: 'bl',
				rq:	'y',
				v2:	'y',
				proxy: 'y'
			}, null);*/
		})
	};
	
	/* Действия с конфигурацией
	 * */
	this.config = {
		// Чтение данных
		read: callback(this, function(){
			var index = '';
			var Q = { v2: 'y', proxy: 'y' };
			var args = new argSchema(arguments);
			if (args.checkin('array __id', 'opt function __callback')) {
				index = 0;
				var __id = args.__id;
				Q.rq = __id.length;
			} else if (args.checkin('number __id', 'opt function __callback')) {
				var __id = [ args.__id ];
				Q.rq = 'y';
			}
			for (var i = 0; i < __id.length; i++) {
				Q['res_json' + index] = 'y';
				Q['res_config_action' + index] = 1;
				Q['res_config_id' + index] = __id[i];
				Q['res_struct_size' + index] = 0;
				index += 1;
			}
			return this.request(CGI_URL, 'get', Q, args.__callback);
		}),
		// Запись данных
		write: callback(this, function(){
			var index = '';
			var Q = { v2: 'y', proxy: 'y' };
			var args = new argSchema(arguments);
			if (args.checkin('array __id', 'opt bool __save', 'opt function __callback')) {
				index = 0;
				var __id = args.__id;
				Q.rq = __id.length;
			} else if (args.checkin('number __id', 'object __data', 'opt number __pos', 'opt bool __save', 'opt function __callback')) {
				var __id = [[ args.__id, args.__data, args.__pos ]];
				Q.rq = 'y';
			}
			for (var i = 0; i < __id.length; i++) {
				Q['res_json' + index] = 'y';
				Q['res_data_type' + index] = 'json';
				Q['res_config_action' + index] = 3;
				Q['res_config_id' + index] = __id[i][0];	// __id
				Q['res_buf' + index] = __id[i][1],			// __data
				Q['res_struct_size' + index] = 0;
				Q['res_pos' + index] = (is.number(__id[i][2]))?__id[i][2]:-1;		// __pos
				index += 1;
			}
			if(args.__save) Q.res_save = 'y';
			return this.request(CGI_URL, 'get', Q, args.__callback);
		}),
		// Удаление данных
		remove: callback(this, function(){
			var index = '';
			var Q = { v2: 'y', proxy: 'y' };
			var args = new argSchema(arguments);
			if (args.checkin('array __id', 'opt bool __save', 'opt function __callback')) {
				index = 0;
				var __id = args.__id;
				Q.rq = __id.length;
			} else if (args.checkin('number __id', 'object __data', 'opt number __pos', 'opt bool __save', 'opt function __callback')) {
				var __id = [[ args.__id, args.__data, args.__pos ]];
				Q.rq = 'y';
			}
			for (var i = 0; i < __id.length; i++) {
				Q['res_json' + index] = 'y';
				Q['res_data_type' + index] = 'json';
				Q['res_delex' + index] = 'y';
				Q['res_config_action' + index] = 2;
				Q['res_config_id' + index] = __id[i][0];	// __id
				Q['res_buf' + index] = __id[i][1],			// __data
				Q['res_struct_size' + index] = 0;
				Q['res_pos' + index] = (is.number(__id[i][2]))?__id[i][2]:-1;		// __pos
				index += 1;
			}
			if(args.__save) Q.res_save = 'y';
			return this.request(CGI_URL, 'get', Q, args.__callback);
		}),
		multi: callback(this, function(__list, __callback){
			var index = 0;
			var Q = { v2: 'y', proxy: 'y', rq: 0 };
			if ('remove' in __list){
				for (var i = 0; i < __list.remove.length; i++) {
					Q['res_json' + index] = 'y';
					Q['res_data_type' + index] = 'json';
					Q['res_delex' + index] = 'y';
					Q['res_config_action' + index] = 2;
					Q['res_config_id' + index] = __list.remove[i][0];	// __id
					Q['res_buf' + index] = __list.remove[i][1],			// __data
					Q['res_struct_size' + index] = 0;
					Q['res_pos' + index] = (is.number(__list.remove[i][2]))?__list.remove[i][2]:-1;		// __pos
					index += 1;
				}
				Q.rq += __list.remove.length;
			}
			if ('write' in __list){
				for (var i = 0; i < __list.write.length; i++) {
					Q['res_json' + index] = 'y';
					Q['res_data_type' + index] = 'json';
					Q['res_config_action' + index] = 3;
					Q['res_config_id' + index] = __list.write[i][0];	// __id
					Q['res_buf' + index] = __list.write[i][1],			// __data
					Q['res_struct_size' + index] = 0;
					Q['res_pos' + index] = (is.number(__list.write[i][2]))?__list.write[i][2]:-1;		// __pos
					index += 1;
				}
				Q.rq += __list.write.length;
			}
			if ('read' in __list){
				for (var i = 0; i < __list.read.length; i++) {
					Q['res_json' + index] = 'y';
					Q['res_config_action' + index] = 1;
					Q['res_config_id' + index] = __list.read[i];
					Q['res_struct_size' + index] = 0;
					index += 1;
				}
				Q.rq += __list.read.length;
			}
			return this.request(CGI_URL, 'get', Q, __callback);
		}),
		// Произвольные действия с данными
		manual: callback(this, function(__query, __callback){
			return this.request(CGI_URL, 'get', __query, __callback);
		})
	};
	
	this.config.write.and = {
		save: callback(this, function(){
			var args = new argSchema(arguments);
			if(args.checkin('array __id', 'opt bool __save', 'opt function __callback')){
				return this.config.write(args.__id, true, args.__callback);
			}
			else if(args.checkin('number __id', 'object __data', 'opt number __pos', 'opt bool __save', 'opt function __callback')){
				return this.config.write(args.__id, args.__data, args.__pos, true, args.__callback);
			}
		})
	};

	this.config.remove.and = {
		save: callback(this, function(){
			var args = new argSchema(arguments);
			if(args.checkin('array __id', 'opt bool __save', 'opt function __callback')){
				return this.config.remove(args.__id, true, args.__callback);
			}
			else if(args.checkin('number __id', 'object __data', 'opt number __pos', 'opt bool __save', 'opt function __callback')){
				return this.config.remove(args.__id, args.__data, args.__pos, true, args.__callback);
			}
		})
	};

	/* Утилиты для настройки устройства
	 * Определения находятся в отдельных файлах (в морде)
	 * */
	this.utils = {
		vlan: {},
		iptv: {},
		wan: {
			byContype: {}			
		},
		wifi: {},
		grouping: {},
		snmp: {},
		qos: {},
		pmirror: {},
		roaming: {},
		sheduler: {},
		reservation: {}
	};
};

$(window).bind('keydown', function(e){
	if (e.keyCode == 27) e.preventDefault();
});

devu = device.utils;
devc = device.config;
devsys = device.system;
