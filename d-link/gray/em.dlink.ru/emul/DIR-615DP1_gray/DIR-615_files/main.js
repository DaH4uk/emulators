


















device.limit(1);

if (!engine) {
	var engine = {};
}
engine.candyBlack = true;

var rootCtrl = null;

function isObjEmpty(obj) {
	for (var i in obj) {
        return false;
    }
    return true;
}


function activateMenuFromPath(menuPath) {	       

        var pathArray = menuPath.split("/");                
        
        for (var p in allMenuDef) {          
		if (allMenuDef[p].list && allMenuDef[p].alias == pathArray[0]) {
			for (var i in allMenuDef[p].list) {
				if (allMenuDef[p].list[i].alias == pathArray[1]) {
					var tabs = allMenuDef[p].list[i].tabs;
					var tabInx = 0;
					if (pathArray[2] && tabs) {
						for (var t=0; t<tabs.length; t++) {
							if (tabs[t].alias == pathArray[2]) {
								tabInx = t;
								break;
							}
						}
					}
					pageInfo = $.extend(true, {}, allMenuDef[p].list[i]);
					pageInfo.tabInx = tabInx;
					window.rootCtrl.event('selectpage', pageInfo, true);
					return true;
				}
			}
		}
	}
	
	if (menuPath == '') setCookie('url_hash', '');
	return false;
}


function start(){

	//костыль проклятый
	// if(hideFlag( 14)){
	// 	var version = $("#v_firmware_value").html();
	// 	$("#v_firmware_value").replaceWith(version);
	// }
	
	//Общий механизм страницы отменяющий выход с неё
	$("#pageGeneral").bind("change", function(event){
		debug("Text input changed.");
		window.hasChanges = "text";
	}).bind("cellChange.grid", function(event){
		debug("Grid changed.");
		window.hasChanges = "grid";
	}).	bind("click", function(event){
		if(event.target.tagName == "OPTION"
			|| (event.target.tagName == "INPUT" && ($(event.target).attr("type") == "radio" || $(event.target).attr("type") == "checkbox"))){
			debug("Radio, checkbox or select changed.");
			window.hasChanges = "select";
		}
	});
	

	window.provList = window["prov_list_dir.js"];
	window.rootCtrl = new jsMainFrameController();
	revive();
	setIdleHook();	
}

function revive(){
	var langCtrl = rootCtrl.getChild('fastmenu', 'lang');
	var sysComCtrl = rootCtrl.getChild('fastmenu', 'syscmd');
	langCtrl.event("changelangs", langCtrl.model.langs);
	sysComCtrl.event("buildsyscmd");
	
	rootCtrl.nextIface = "client";
	var curViewInx = rootCtrl.addIface();
	window.rootView = rootCtrl.views[curViewInx];

	rootCtrl.nextIface = "residentProbe";
	rootCtrl.ifaceTypes.residentProbe.options.plainIface = true;
	var resProbeViewInx = rootCtrl.addIface();
	langCtrl.nextIface = "switchLang";
	langCtrl.ifaceTypes.switchLang.options.plainIface = true;
	var switchViewInx = langCtrl.addIface();

	sysComCtrl.nextIface = "apply";
	sysComCtrl.ifaceTypes.apply.options.plainIface = true;
	var sysComApplyViewInx = sysComCtrl.addIface();

	var notifierCtrl = rootCtrl.getChild('fastmenu', 'notifier');
	notifierCtrl.nextIface = "getinfo";
	notifierCtrl.ifaceTypes.getinfo.options.plainIface = true;
	notifierCtrl.addIface();
	
	rootCtrl.views[curViewInx].drawView();
	
	if (getCookie('url_hash') != '') {
		if (window.location.hash != '' && getCookie('url_hash') != window.location.hash.substring(1)) {
			window.location.hash = '#' + getCookie('url_hash');
		}
	}
	
	if (!activateMenuFromPath(window.location.hash.substring(1))) {
		//rootCtrl.activate();
	}
}


function startPassw(){
	window.rootCtrl = new jsMainFramePasswController();
}

function jsMainFrameController(){
	jsMainFrameController.superclass.constructor.call(this);

	/* Name:		onmenuchange
	* Description: 	обработчик события menuchange
	* Arguments:	menuCtrl - ссылка на контроллер активного меню                                                                                       
	* Return value:	нет
	* Notes:		запускается всякий раз, когда активируется menuCtrl
	*/
	this.onselectpage = function(pageInfo){
		if (pageInfo.page || pageInfo.tabs) {
			var helper = this.getChild("helper");
			helper.model.key_page = pageInfo.item;
			helper.event("updateHelp");
			$('#pageTitle').html("<div class='pageTitle' style='display: none'><a href='javascript:void(0)' id='linkReturner'>" + lng("settings") +"</a>" 
				+ "</span> »</div>"+"<div class='pageTitle' style='display: none'>" + lng(pageInfo.menu) + "<span style='display: none'> » " + lng(pageInfo.item) + "</span> »</div>");
			
			$("#linkReturner").bind("click", function(){
				$("#arrowScrollLeft").trigger("click");
			});
			
			var ie67 = false;
			if (getInternetExplorerVersion()<8) ie67 = true;
			showSlideboard(ie67);	/* from workbench.ui.js */

			clearTimeouts();
			this.curMenuCtrl = pageInfo;
			if (pageInfo.tabInx) {
				setCookie('url_hash', pageInfo.tabs[pageInfo.tabInx].path);
			}
			else{
				setCookie('url_hash', pageInfo.path);
			}
			
			if(pageInfo.page instanceof Function){
				var ctrl = this.getChild(this.children.length-1/*'contentCtrl'*/);
				if(ctrl instanceof jsController){
					var view;
					for(var i in ctrl.views){
						view = ctrl.views[i];
						if(view instanceof jsSSideView){
							view.stopRefresh();
						}
					}
				}
				this.changeChild(this.children.length-1/*'contentCtrl'*/, new pageInfo.page());
			}
		}
	}

	this.onchangelang = function(lng){
		setCookie("cookie_lang", lng);
		return false;
	}

	/* Name:		onlogoutrq
	* Description: 	обработчик события logoutrq (logout request)
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается при запросе на логаут
	*/
	this.onlogoutrq = function(){
		deleteCookie("client_login");
		deleteCookie("client_password");
		this.reload();
		return false;
	}

	/* Name:		ondevicemoderq
	* Description: 	обработчик события devicemoderq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается при запросе на изменение режима работы устройства
	*/
	this.ondevicemoderq = function(){
		this.reload();
		return false;
	}

	/* Name:		onchviewrq
	* Description: 	обработчик события chviewrq (change view request)
	* Arguments:	объект в виде {viewInx, nextIface}
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается при запросе на смену представления
	* 				TODO: сделать смену представления через jhmvc в виде расширяемого меню
	* 					  в которое можно будет загнать и другие пункты
	* 					  это меню должно быть доступно в любом контроллере
	*/
	this.onchviewrq = function(obj){
		this.reload();
		return false;
	}
	
	this.onreloadrq = function(){
		this.reload();
		return false;
	}

	/* Name:		onfwupdaterq
	* Description: 	обработчик события fwupdaterq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на перепрошивку от страрежимной морды
	*/
	this.onfwupdaterq = function(){
		//firmware update
		//логика работы нарушена, пока нет своего элемента для аплоада файлов
		//перешивку делаем через jsSysComController
		var syscmd = this.getChild('fastmenu', 'syscmd');
		syscmd.model.cmd = 14;
		syscmd.model.buf = null;
		syscmd.model.nonblocking = false;
		syscmd.event("cmdcfm");
		return false;
	}
	
	/* Name:		oncfgrestorerq
	* Description: 	обработчик события cfgrestorerq
	* Arguments:	filepath
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на применение загруженной конфигурации от старорежимной морды
	*/
	this.oncfgrestorerq = function(filepath){
		//config apply request
		//логика работы нарушена, пока нет своего элемента для аплоада файлов
		//Страница системной конфигурации будет полностью переведена на fastmenu "система" после
		//того, как будет сделан метод jsMainFrameView реализующий модальный диалог загрузки файла
		//применение делаем через jsSysComController
		var syscmd = this.getChild('fastmenu', 'syscmd');
		syscmd.model.cmd = 11;
		syscmd.model.buf = filepath;
		syscmd.model.nonblocking = false;
		syscmd.event("cmdcfm");
		return false;
	}
	
	/* Name:		oncfgbackuprq
	* Description: 	обработчик события cfgbackuprq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на backup конфигурации от старорежимной морды
	*/
	this.oncfgbackuprq = function(){
		//config apply request
		//логика работы нарушена, по старому работают 2 части
		//1. Сама кнопка осталась на старой странице (до перевода всей страницы на fastmenu "система")
		//2. Отдача файла файла юзеру в form_system.c
		//Страница системной конфигурации будет полностью переведена на fastmenu "система" после
		//того, как будет сделан метод jsMainFrameView реализующий модальный диалог загрузки файла
		//применение делаем через jsSysComController
		var syscmd = this.getChild('fastmenu', 'syscmd');
		syscmd.model.cmd = 12;
		syscmd.model.buf = null;
		syscmd.model.nonblocking = false;
		syscmd.event("cmdcfm");
		return false;
	}
	
	/* Name:		oncfgsaverq
	* Description: 	обработчик события cfgsaverq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на сохранение конфигурации
	*/
	this.oncfgsaverq = function(){
		//применение делаем через jsSysComController
		var syscmd = this.getChild('fastmenu', 'syscmd');
		syscmd.model.cmd = 20;
		syscmd.model.buf = null;
		syscmd.model.nonblocking = false;
		syscmd.event("cmdcfm");
		return false;
	}
	
	/* Name:		oncfgsaverebootrq
	* Description: 	обработчик события cfgsaverq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на сохранение конфигурации
	*/
	this.oncfgsaverebootrq = function(){
		//применение делаем через jsSysComController
		var syscmd = this.getChild('fastmenu', 'syscmd');
		syscmd.model.cmd = 8;
		syscmd.model.buf = null;
		syscmd.model.nonblocking = true;
		syscmd.event("cmdcfm");
		return false;
	}
	
	/* Name:		onmuterq
	* Description: 	обработчик события muterq (остановить всё общение с сервером)
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.onmuterq = function(){
		this.getChild('fastmenu', 'notifier').event("muterq");
		return false;
	}

	/* Name:		onreadsmsrq
	* Description: 	обработчик события onreadsmsrq (переход на смс-ки)
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		
	*/
	this.onreadsmsrq = function() {
		/*var smsCtrl = this.getChild("rootMenu").getChild("usbModem").getChild("sms");
		smsCtrl.contentOptions.push({selectedTab: 2});
		smsCtrl.activate();*/
		window.location.hash = '3g/sms/inbox';
		return false;
	}

	this.onautoupdaterq = function() {
		return true;
	}

	this.isAccessFromWAN = function(ifaces) {
		var iface = null;
		if (!ifaces || !ifaces.iface_names) {
			return false;
		}
		for (var if_name in ifaces.iface_names) {
			if (ifaces.iface_names[if_name].is_wan && !$.isEmptyObject(ifaces.iface_names[if_name].services)) {
				iface = ifaces.iface_names[if_name];
				for (var srv_name in iface.services) {
					if (iface.services[srv_name].ip == document.location.hostname || document.location.host == "dlink-router") {
						return true;
					}
				}
			}
		}
		return false;
	}

	this.changeServerUrl = function(url) {
		this.serverUrl = this.accessFromWAN?document.location.host:url;
	}
	/* Name:		checkServerData
	* Description: 	callback для для метода sendSuccess любого sside представления
	* Arguments:	responseData - данные с сервера
	* Return value:	true - продолжать обработку ответа сервера
	* 				false - отменить обработку ответа сервера
	* Notes:		checkServerData запускается любым sside представлением после eval'а серверных данных
	*/
	this.checkServerData = function(responseData){
		this.event("endrequest");
		if(responseData){
			if(responseData.auth == false){
				//отправить на логинную страницу
				this.event("logoutrq");
				return false;
			}
			if ( "") {
				if ((responseData.defaultConf && responseData.defaultConf ==  20 && !getCookie("defaultPageVisited"))) {
					setCookie("defaultPageVisited", true); 
					activateMenuFromPath( "");
				}
			}
			if(responseData.passwStatus && responseData.passwStatus ==  15){
				this.event("chpasswrq");
			}
			if(responseData.needReset && responseData.needReset ==  13){
				this.event("needresetrq");
			}
			if(responseData.deviceModeChange){
				this.event("devicemoderq");
				return false;
			}
			if(responseData.resident && responseData.resident.editError){
				alert(lng("errorOnEdit"));
			}

			if (responseData.newSmsStatus ==  20) this.event("notifySMS");
			if (responseData.getConfigStatus == 12) this.event("notifySaveReboot");
			if (responseData.getConfigStatus == 13) this.event("notifySave");
			if (window.SAVEME) {
				SAVEME.trigger.save(responseData.getConfigStatus ==  13);
				SAVEME.trigger.reboot(responseData.getConfigStatus ==  12);
			}
			this.accessFromWAN = this.isAccessFromWAN(responseData.rpcWAN);
		}
		return true;
	}

	this.onNotifyAutoUpdate = function(vers){
		var notifier = this.getChild('fastmenu', 'notifier');
		if(vers){
			notifier.addMsg({
				icon: '../image/notifiers/fw.png',
				event: "autoupdaterq",
				msg: lng('autoupdNewVersion')+" ("+vers+")",
				time: new Date(),
				action: {
					name: 'button_upload',
					func: function() { rootCtrl.event("autoupdaterq"); }
				}
			},
			'newfw');
			notifier.event("updmodel");
			notifier.event("showalways");
		}
		else{
			notifier.removeMsg('newfw');
		}
		return false;
	}

	this.onNotifySMS = function(){
		var notifier = this.getChild('fastmenu', 'notifier');
		notifier.addMsg({
			icon: '../image/notifiers/sms.png',
			event: "readsmsrq",
			msg: 'g3_sms_have_new',
			time: new Date(),
			action: {
				name: 'smsGotoInbox',
				func: function() { rootCtrl.event("readsmsrq"); }
			}
		});
		notifier.event("updmodel");
		return false;
	}
	
	this.onNotifySaveReboot = function(){
		var notifier = this.getChild('fastmenu', 'notifier');
		notifier.event("deleteall");
		notifier.addMsg({
			icon: '../image/notifiers/reboot.png',
			event: "cfgsaverebootrq",
			msg: 'conf_change_warning',
			time: new Date(),
			action: {
				name: "button_save_reboot",
				func: function() { rootCtrl.event("cfgsaverebootrq"); }
			}
		});
		notifier.event("updmodel");
		notifier.event("showalways");
	}
	
	this.onNotifySave = function(){
		var notifier = this.getChild('fastmenu', 'notifier');
		notifier.addMsg({
			icon: '../image/notifiers/save.png',
			event: "cfgsaverq",
			msg: 'conf_change_warning_save',
			time: new Date(),
			action: {
				name: "button_deflang_save",
				func: function() { rootCtrl.event("cfgsaverq"); }
			}
		});
		notifier.event("updmodel");
		notifier.event("showalways");
	}


	/* Name:		onlanapply
	* Description: 	обработчик события lanapply
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.onlanapply = function(hostname){
		if(hostname && hostname != location.hostname){
			this.changeServerUrl(hostname);//this.serverUrl = hostname;
			this.event("changeip");
			setTimeout(context(this).callback(this.reload),  5000);
		}
		else{
			this.reload();
		}
	}
	
	/* Name:		reload
	* Description: 	перезагрузить index.html
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.reload = function(){

		
		location.reload();
	}

	/* Name:		reload
	* Description: 	перезагрузить index.html
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.resetreload = function(){
		deleteAllCookies();
		this.reload();
	}

	this.ifaceTypes.client = {type:jsMainFrameView, options:{mainMenuStyle:"top"}, def:true};
	this.ifaceTypes.residentProbe = {type:jsMainFrameResProbeView, options:{plainIface:true,
																			action:"index.cgi",
																			residentProbeInterval:7000}};

	var searcher = this.addChild(new jsSearcherController(allMenuDef), "searcher");
	var widgetgrid = this.addChild(new jsWidgetGridController(document.menuDefinitions), "widgetgrid");
	
	var fastmenu = this.addChild(new jsFastmenuController(null, {frame:this}), "fastmenu");
	var notifier = fastmenu.addChild(new jsNotifierController(), "notifier");
	var syscmdCtrl = fastmenu.addChild(new jsSysComController({name: 'menu_system', image: null}, this), "syscmd");
	var langCtrl = fastmenu.addChild(new jsLangController({name: 'lang', image: null}, this), "lang");
	this.addChild(new jsInputExController(true), "modeswitch");
	this.addChild(new jsInputExController(), "waiter");
	this.addChild(new jsDefPassController(), 'defpassWindow');
	this.addChild(new jsHelpController(), "helper");
	this.addChild(new jsStartController(), 'startInfo');
	this.addChild(new jsWizardsController(), 'wizards');
	this.addChild(new jsController(), 'contentCtrl');
	
	syscmdCtrl.activateToBottom = false;
	langCtrl.activateToBottom = false;

	//Добавление 
	this.addEventHandler("selectpage", this.onselectpage);
	this.addEventHandler("changelang", this.onchangelang);
	this.addEventHandler("logoutrq", this.onlogoutrq);
	this.addEventHandler("devicemoderq", this.ondevicemoderq);
	this.addEventHandler("chviewrq", this.onchviewrq);
	this.addEventHandler("fwupdaterq", this.onfwupdaterq);
	this.addEventHandler("cfgrestorerq", this.oncfgrestorerq);
	this.addEventHandler("cfgbackuprq", this.oncfgbackuprq);
	this.addEventHandler("cfgsaverq", this.oncfgsaverq);
	this.addEventHandler("cfgsaverebootrq", this.oncfgsaverebootrq);
	this.addEventHandler("muterq", this.onmuterq);
	this.addEventHandler("lanapply", this.onlanapply);
	this.addEventHandler("reloadrq", this.onreloadrq);
	this.addEventHandler("readsmsrq", this.onreadsmsrq);
	this.addEventHandler("notifySave", this.onNotifySave);
	this.addEventHandler("notifySaveReboot", this.onNotifySaveReboot);
	this.addEventHandler("notifySMS", this.onNotifySMS);
	this.addEventHandler("autoupdaterq", this.onautoupdaterq);
	this.addEventHandler("notifyAutoUpdate", this.onNotifyAutoUpdate);

	this.curMenuCtrl = null;

	this.accessFromWAN = false;

	this.visitedDefaultPageRedirect = false;
	//Инициализация и добавление интерфейсов

	jsController.prototype.privilege = "admin";
	
}
extend(jsMainFrameController, jsController);


function jsMainFrameView(ctrl, viewInx, options){
	ctrl.getChild("fastmenu").ifaceTypes.tree.options = {viewBoxSel:"#blockFastmenu"};
	ctrl.getChild("widgetgrid").ifaceTypes.client.options = {viewBoxSel:"#widgetList"};
	ctrl.getChild("searcher").ifaceTypes.client.options = {viewBoxSel: '#searchResults', viewInputSel: '#searcher :input'};
	ctrl.getChild("waiter").nextIface = "progresser";
	ctrl.getChild("waiter").ifaceTypes.progresser.options = {viewBoxSel:"#progressWindow", /*waitStyle: true,*/ waitTitle: ''};
	ctrl.getChild("defpassWindow").ifaceTypes.client.options = {viewBoxSel:"#defpassWindow"};
	ctrl.getChild("helper").ifaceTypes.client.options = {viewBoxSel: "#pageHelp"};
	ctrl.getChild("startInfo").ifaceTypes.client.options = {viewBoxSel: "#devinfo"};
	ctrl.getChild("wizards").ifaceTypes.client.options = {viewBoxSel: "#wizard"};
	var obj = ctrl.getChild("modeswitch");
	obj.nextIface = "switcher";
	obj.ifaceTypes.switcher.options = {
		valset: {on: true, off: false},
		viewBoxSel: "#pageToolbarModeSwitch",
		short_on: "brief",
		short_off: "expert",
		hide: true
	}
	
	jsMainFrameView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.onmodeswitchshowrq = function(){
		this.getChild("modeswitch").show();
		return false;
	}
	
	this.onmodeswitchhiderq = function(){
		this.getChild("modeswitch").hide();
		return false;
	}
	
	this.onmodeswitchsetrq = function(value){
		var modeswitch = this.getChild("modeswitch");
		modeswitch.ctrl.model.value = value;
		modeswitch.updateView();
		return false;
	}

	/* Name:		onmenuchange
	* Description: 	обработчик события menuchange
	* Arguments:	menuCtrl - ссылка на контроллер активного меню                                                                                       
	* Return value:	нет
	* Notes:		запускается всякий раз, когда активируется menuCtrl
	*/
	this.onselectpage = function(pageInfo){
		this.getChild('startInfo').ctrl.event('stoprefreshrq');
		$("#pageGeneral").find("*").unbind().remove();
		$("#pageGeneral").html('<div class="withHelp"></div>');
		$('#pageTabs').find('*').unbind().remove();
		$('#pageToolbarButtons').show().find('*').unbind().remove();
		if(pageInfo.page instanceof Function){
			delete this.pageNode;
			this.ctrl.curMenuCtrl = pageInfo;
			contentCtrl = this.ctrl.children[this.ctrl.children.length-1/*contentCtrl*/];
			if(contentCtrl && !contentCtrl.views[this.viewInx]) contentCtrl.changeIface(this.viewInx, this);
			contentCtrl.views[this.viewInx].viewBoxSel = "#pageGeneral>div";
			contentCtrl.views[this.viewInx].options.viewBoxSel = "#pageGeneral>div";
			contentCtrl.views[this.viewInx].options.pageTitle = pageInfo.item;
			contentCtrl.views[this.viewInx].options.buttonsInline = false;
			contentCtrl.views[this.viewInx].drawView();
			contentCtrl.addEventHandler("updaterq", function(){
				window.hasChanges = null;
			});
			contentCtrl.event("updaterq");
		}		
		else {
			var tablist = new Array();
			if (pageInfo.tabs) {
				for (var i = 0; i < pageInfo.tabs.length; i++) {
					if(!pageInfo.tabs[i].hide){
						tablist.push({
							'caption': pageInfo.tabs[i].subitem,
							'page': pageInfo.tabs[i].page,
							'path': pageInfo.tabs[i].path
						});
					}
				}
			} else {
				tablist.push({
					'caption': pageInfo.item,
					'page': pageInfo.page,
					'path': pageInfo.path
				});
			}
			for (var i = 0; i < tablist.length; i++){
				var tab = tablist[i];
				var $tab = $("\
					<div class='pageTab'>\
						<a href='#' langkey='" + tab.caption + "'>" + lng(tab.caption) + "</a>\
					</div>\
				").appendTo($('#pageTabs'));
				$tab.find('a').bind('click', callback(this, function($tab, tab){
					if (!$tab.hasClass('active')) {
						//Общий механизм страницы отменяющий выход с неё
						if(checkChanges() && !confirm(lng("leavePageMes"))){
							return false;
						}
						else{
							window.hasChanges = null;
						}
						if (this.pageNode && this.pageNode.emit) {
							var status = {type: "leavepage"};
							this.pageNode.emit(status);
							if(status.isCanceled){
								return false;
							}
							this.pageNode.emit('stoprefreshrq');
						}
						$('#pageGeneral>div, #pageToolbarButtons, #pageToolbarMisc').find('*').unbind().remove();
						$('#pageGeneral>div').attr("class", "").attr("style", "");
						
						$('#pageGeneral>div').addClass("withHelp");
						this.pageNode = tab.page;
						this.pageNode.locate("#pageGeneral>div");
						this.pageNode.$buttonBar = $("#pageToolbarButtons");
						this.pageNode.bind("updaterq", function(){
							window.hasChanges = null;
						});
						this.pageNode.emit("updaterq");
						$('#pageTabs .pageTab.active').removeClass('active');
						$tab.addClass('active');
						setCookie('url_hash', tab.path);
						window.location.hash = tab.path;
					}
					return false;
				}, $tab, tab));
			}
			if (is.unset(pageInfo.tabInx)) pageInfo.tabInx = 0;
			$('#pageTabs>.pageTab:eq(' + pageInfo.tabInx + ')>a').trigger('click');
		}
		
	}
	
	/* Name:		onchangelang
	* Description: 	обработчик события changelang
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда когда изменяется глобальный объект lang
	*/
	this.onchangelang = function(){
		this.drawView();
		if (!activateMenuFromPath(window.location.hash.substring(1))) {
			//rootCtrl.activate();
		}
		return false;
	}
	
	/* Name:		onrebootrq
	* Description: 	обработчик события rebootrq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается по запросу на перезагрузку системы
	*/
	this.onrebootrq = function(){
		window.hasChanges = null;
		var syscomctrl = null;
		if(confirm(lng("confirm_reboot"))){
			//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
			syscomctrl = this.ctrl.getChild('fastmenu', 'syscmd');
			syscomctrl.model.cmd = 6;
			syscomctrl.model.buf = null;
			syscomctrl.model.nonblocking = true;
			syscomctrl.event("cmdcfm");
		}
		return false;
	}
	
	/* Name:		onresetrebootrq
	* Description: 	обработчик события resetrebootrq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запрос на применение настроек по умолчанию
	*/
	this.onresetrebootrq = function(){
		window.hasChanges = null;
		var syscomctrl = null;

		if(confirm(lng("resetconfigAlarm") + " " +  95000/1000 + " " + lng("second") + ', ' + lng("resetconfigContinue"))){
			//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
			syscomctrl = this.ctrl.getChild('fastmenu', 'syscmd');
			syscomctrl.model.cmd = 10;		//заполнение модели требуется только если запрос исходит от старой морды
			syscomctrl.model.buf = null;
			syscomctrl.model.nonblocking = false;
			syscomctrl.event("cmdcfm");
		}
		return false;
	}
	
	/* Name:		onstartresetreboot
	* Description: 	обработчик события startreboot
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда начинается применение настроек по умолчанию
	*/
	this.onstartresetreboot = function(){
		window.hasChanges = null;
		this.showWaitScreen(lng("reset_and_reboot_progress"), new Number( 95000) + 10000);
		//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
		this.ctrl.changeServerUrl( "192.168.0.1"); //this.ctrl.serverUrl =  "192.168.0.1";
		setTimeout(context(this.ctrl).callback(this.ctrl.resetreload),  95000);

		return false;
	}
	
	/* Name:		onendreboot
	* Description: 	обработчик события endreboot
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда система перезагрузилась
	* 				и доступен index.cgi и resident
	*/
	this.onendreboot = function(){
		alert(lng("reboot_is_complete"));
		this.redirectPageData();
		//~ document.location.href = 'index.cgi';
		location.reload(true);
		return false;
	}
	
	/* Name:		onstartreboot
	* Description: 	обработчик события startreboot
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается перед началом процедуры перезагрузки системы
	*/
	this.onstartreboot = function(){
		window.hasChanges = null;
		this.showWaitScreen(lng("rebooting"));
		//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
		return false;
	}
	
	/* Name:		onstartsavereboot
	* Description: 	обработчик события startsavereboot
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается перед началом процедуры сохранения/перезагрузки системы
	*/
	this.onstartsavereboot = function(){
		window.hasChanges = null;
		if (getCookie("clientMasterOnSave") == "1") {
		} else {
			alert(lng("save_and_reboot_success"));
		}
		this.ctrl.changeServerUrl(getCookie("lan_ip")); //this.ctrl.serverUrl = getCookie("lan_ip");
		this.showWaitScreen(lng("rebooting"),  90000, function(){
			//~ document.location.href = 'index.cgi'
			location.reload(true);
		});
		//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
		return false;
	}
	
	this.onshowprogress = function(params){
		this.showWaitScreen(lng(params[0]?params[0]:""), params[1], true);
		//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);
		return false;
	}
	
	/* Name:		onstartfwupdate
	* Description: 	обработчик события startfwupdate
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда стартует перепрошивка системы
	*/
	this.onstartfwupdate = function(){
		this.showWaitScreen(lng("fwupdate_progress"),  45000 +  90000 +  90000);
		//$("#preloader>img").unbind("ajaxError", this.showErrorLoader);

	
			$("<div class='warning-firmware' langkey='fwarning'>" + lng("fwarning") + "</div>")
				.appendTo("body")
				.css({
					left: ($("body").width() - $(".warning-firmware").width())/2
				})
				.slideDown("slow");

		return false;
	}

	this.onautoupdaterq = function(noConfirm){
		function onerror(answer){
			if(answer.status ==  55){
				$(".warning-firmware").slideUp("slow");
				this.hideWaitScreen();
				alert(lng("firmware_invalid"));
			}
		}
		if(noConfirm){
			this.ctrl.event("startfwupdate");
			device.config.write( 178, {"need_update": true}, callback(this, onerror));;
		}
		else{
			if (confirm(lng("dofwupdate"))) {
				this.ctrl.event("startfwupdate");
				device.config.write( 178, {"need_update": true}, callback(this, onerror));
			}
		}
		return false;
	}

	/* Name:		onuploaderror
	* Description: 	обработчик события uploaderror
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда upload файла завершился неудачей
	*/
	this.onuploaderror = function(){
		$(".warning-firmware").slideUp("slow");
		this.hideWaitScreen();
		alert(lng("file_upload_error"));
		return false;
	}
	
	
	this.onbadfwrq = function(){
		$(".warning-firmware").slideUp("slow");
		this.hideWaitScreen();
		clearTimeouts();
		this.hideWaitScreen();
		this.hideModalOverlay();
		alert(lng("file_upload_bad_fw"));
		return false;
	}
	/* Name:		onstartupload
	* Description: 	обработчик события startupload
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда стартует аплоад файла
	*/
	this.onstartupload = function(){
		this.showWaitScreen(lng("file_upload_progress"),  45000);
		return false;
	}
	
	/* Name:		onchangeip
	* Description: 	обработчик события changeip
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда меняют IP
	*/
	this.onchangeip = function(){
		this.showWaitScreen(lng("change_ip_progress"), new Number( 5000) + 2000);
		return false;
	}

	this.redirectPageData = function(){
		if (getCookie("redirected_page_finish")) {
			deleteCookie("redirected_page_finish");
			setCookie("redirected_page_finish", "ok");
		}
		
	}
	
	/* Name:		onwaitexceed
	* Description: 	callback для jquery метода animate запускаемого в showWaitScreen
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.onwaitexceed = function(){
		this.redirectPageData();
		this.ctrl.reload();
	}
	
	/* Name:		onsave
	* Description: 	обработчик события save
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда выполняется процедура сохранения конфигурации системы
	*/
	this.onsave = function(){
		this.ctrl.getChild('fastmenu', 'notifier').event('cancelshowalways');
		alert(lng("save_config_success"));
		return false;
	}
	
	/* Name:		oncfgrestoreok
	* Description: 	обработчик события cfgrestoreok
	* Arguments:	status 
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда успешно закончилась процедура восстановления конфигурации системы
	*/
	this.oncfgrestoreok = function(status){
		var syscomctrl = null;
		
		if(status == 20){
			alert(lng("config_aplly_ok"));
		}
		else if(status == 12){
			if(confirm(lng("config_aplly_ok_reboot"))){
				//логика работы нарушена, пока нет своего элемента для аплоада файлов
				//применение делаем через jsSysComController
				syscomctrl = this.ctrl.getChild('fastmenu', 'syscmd');
				syscomctrl.model.cmd = 6;
				syscomctrl.model.buf = null;
				syscomctrl.model.nonblocking = false;
				syscomctrl.event("cmdcfm");
			}
		}
		return false;
	}
	
	/* Name:		oncfgrestorerror
	* Description: 	обработчик события cfgrestorerror
	* Arguments:	status
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается всякий раз, когда с ошибкой закончилась процедура восстановления конфигурации системы
	*/
	this.oncfgrestorerror = function(status){
		var	syscomctrl = this.ctrl.getChild('fastmenu', 'syscmd');
		
		//Восстановление конфига переведено на демона не полностью! Часть функционала осталась в старой морде и неюзабельна.
		//Для полной функциональность требуется доработка RPC 11:
		//1. Режим "только удаление" с цифрой 2 перед путем к файлу
		//2. Замена RPC 11 на CONFIG_ID_RESTORE_CONFIG т.к. необходимо возвращать
		//инфу о версии конфига и имени девайса, для которого предназначен конфиг.
		switch(status){
			case 71:	//71
				alert(lng("lng_config_upload_failed"));
				syscomctrl.model.buf = "2" + syscomctrl.model.buf;	//удаление временного файла
				break;
			case 72:	//72
				alert(lng("lng_config_wrong_device"));
				syscomctrl.model.buf = "2" + syscomctrl.model.buf;	//удаление временного файла
				break;
			case 73:	//73
				alert(lng("lng_config_other_version"));
				syscomctrl.model.buf = "2" + syscomctrl.model.buf;	//удаление временного файла
				break;
			case 74:	//74
				alert(lng("lng_config_unknown_device"));
				syscomctrl.model.buf = "2" + syscomctrl.model.buf;	//удаление временного файла
				break;
			default:	//55 и т.п.
				alert(lng("lng_config_upload_failed"));
				syscomctrl.model.buf = "2" + syscomctrl.model.buf;	//удаление временного файла
				break;
		}
		syscomctrl.event("cmdcfm");

		return false;
	}
	
	/* Name:		onsyscmdcomplete
	* Description: 	обработчик события syscmdcomplete
	* Arguments:	status
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается по завершению выполнения системной команды
	*/
	this.onsyscmdcomplete = function(status){
		switch(status){
			case 20:
				alert(lng("rpcok"));
				break;
			case 12:
				alert(lng("rpcneedreboot"));
				break;
			case 55:
				alert(lng("rpcerror"));
				break;
			default:
				alert(lng("rpcerror") + "\n" + lng("rpcstatus") + " " + status);
				break;
		}
		return false;
	}
	
	/* Name:		onendrequest
	* Description: 	обработчик события endrequest
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	* Notes:		запускается по завершению выполнения запроса к серверу от любого из представлений любого уровня иерархии
	*/
	this.onendrequest = function(){
		this.hideModalOverlay();
		return false;
	}
	
	/* Name:		oneedresetrq
	* Description: 	обработчик события needresetrq
	* Arguments:	нет
	* Return value:	true - всплывает, false - нет
	*/
	this.oneedresetrq = function(){
		if(confirm(lng("needreset"))){
			this.needResetOk = true;
			this.ctrl.event("resetrebootrq");
		}
		else{
			this.needResetOk = false;
		}
		return false;
	}
	
	this.onchpasswrq = function(){
		this.getChild('defpassWindow').show();
		if ( $('#blockFastmenu') ) {
			$('#blockFastmenu').css('position', 'relative');
			$('#blockFastmenu').css('z-index', '9999');
		}
	}

	/* Name:		showErrorLoader
	* Description: 	показать индикатор ошибки ajax загрузки
	* Arguments:	нет                                                                                                              
	* Return value:	нет
	* Notes:		Внимание!!! Эта функция должна вызываться в контексте DOM элемента, а не представления
	*/
	this.showErrorLoader = function(){
		$('#preloader>img').attr('src', 'image/errormarker.gif').show();
	}
	
	this.showPreloader = function() {
		$('#preloader>img').attr('src', 'image/preloader.gif').show();
	}
	
	this.hideErrorLoader = this.hidePreloader = function() {
		$('#preloader>img').hide();
	}

	/* Name:		hideWaitScreen
	* Description: 	скрыть экран ожидания
	* Arguments:	нет                                                                                                              
	* Return value:	нет
	* Notes:		
	*/
	this.hideWaitScreen = function(){
		var progressWindow = $('#progressWindow');
		var waiter = this.getChild('waiter');
		
		$(waiter.myBoxSel+'>.underHeadway').stop(true, false);
		waiter.stopWait();
		$(progressWindow).fadeOut(200, context(this).callback(this.hideModalOverlayEx, true));
		$('#modalOverlayBox').removeClass('dark');
	}
	
	/* Name:		showWaitScreen
	* Description: 	показать экран ожидания
	* Arguments:	нет                                                                                                              
	* Return value:	нет
	* Notes:		
	*/
	this.showWaitScreen = function(message, maxTimeout, onlyHideOnEnd){
		var waiter = this.getChild('waiter');
		
		$('#modalOverlayBox').addClass('dark');
		this.showModalOverlayEx();
		$('#modalOverlayBox').css('opacity', '0.9')
		
		var progressWindow = $('#progressWindow');
		$(progressWindow).css({
			'left': ($(window).width()-$(progressWindow).width())/2,
			'top': ($(window).height()-$(progressWindow).height())/2
		});
		$(progressWindow).fadeIn(600);
		 
		if(is.func(onlyHideOnEnd)){
			var onend = onlyHideOnEnd;
		}
		else if(onlyHideOnEnd){
			var onend = context(this).callback(this.hideWaitScreen);
		}
		else{
			var onend = context(this).callback(this.onwaitexceed);
		}
		
		waiter.startWait(message);
		
		$(waiter.myBoxSel+'>.underHeadway').animate({
				'width': '100%'
			},
			maxTimeout?maxTimeout: 90000,
			onend
		);
	}
	
	/* Name:		drawView
	* Description: 	нарисовать HTML
	* Arguments:	нет                                                                                                              
	* Return value:	нет
	* Notes:		
	*/
	this.drawView = function(){
		var browserLang = detectLanguage();
		var tempModel = this.ctrl.getChild("fastmenu", 'lang').model;

		$('#v_model').html(lng('devInfoName')+':');
		$('#v_firmware').html(lng('devInfoVersion')+':');
                
		$('#v_firmware').click(onClickInfoVersionOnStart);
		$('#v_firmware_value').click(onClickInfoVersionOnStart);

		$('#v_lang').html(lng('lang')+': '+tempModel.langs[tempModel.lng]);
		$('#adsl_status>span').text(lng('menu_status_adsl'));	
		if (tempModel.lng != browserLang) {
			$('#v_lang').append("<span> (" + lng('maybe_lang') + " <a href='#'>" + tempModel.langs[browserLang] + "</a>)</span>");
			$('#v_lang a').bind('click', browserLang, context(this).callback(function(e){
				this.ctrl.getChild("fastmenu", 'lang').model.lng = e.data;
				this.ctrl.getChild("fastmenu", 'lang').event("changelang", e.data);
				return false;
			}));
		}
		$('#searcher .title').text(lng('quick_search'));
		switchDirection(getCookie('cookie_lang'));
		$('#nav_Widget').text(lng('exSettings'));
		$('#nav_Search').text(lng('search'));
		$('#nav_Quick').text(lng('quickSettings')).click();

		//ajax load process indicator
		$('#preloader>img').hide();
		
		device.hook(device.signal.AVAILABLE, callback(this, function(avail){
			if (avail) {
				this.hideErrorLoader();
			} else {
				this.showErrorLoader();
			}
		}));
		device.hook(device.signal.PROCESS, callback(this, function(status){
			if (status) {
				this.showPreloader();
				//this.showModalOverlay();
			} else {
				//this.hideModalOverlay();
			}
			$('body').css('cursor', status?'wait':'default');
		}));
		device.hook(device.signal.SUCCESS, callback(this, function(){
			this.hidePreloader();
		}));
		
		jsMainFrameView.superclass.drawView.call(this);
		
	}

	this.startIdle = function() {
		
		/*function rotate() {
			var anim;
			var offset = Math.abs($('#modalOverlayBox').offset().left);
			
			if (!document.overlayPos && offset == 0) {
				document.overlayPos = true;
			}
			if (document.overlayPos && offset >= 500) {
				document.overlayPos = false;
			}
			if ($('#modalOverlayBox').width() - $(document).width() != offset || $('#modalOverlayBox').height() - $(document).height() != offset) {
				$('#modalOverlayBox').css({
					'width': $(document).width()+offset,
					'height': $(document).height()+offset
				})
			}
			if (document.overlayPos) {
				anim = { 'left': '-=1', 'top': '-=1', 'width': '+=1', 'height': '+=1' };
			} else {
				anim = { 'left': '+=1', 'top': '+=1', 'width': '-=1', 'height': '-=1' };
			}
			
			$('#modalOverlayBox').animate(anim, 60, function(){
				if (window.isIdle) rotate();
			});
		}*/
		
		device.lock(true);
		this.showModalOverlayEx();
		document.title = this.title + ' - ' + lng('idle') + '...';
		$('#modalOverlayBox').css('cursor', 'default');
		$('#idle').text(lng('idle')+'...').show(1000, function(){
			//document.overlayPos = true;
			//rotate();
		});
	}
	
	this.stopIdle = function() {
		device.lock(false);
		this.hideModalOverlayEx(true);
		document.title = this.title;
		$('#modalOverlayBox').css('cursor', 'wait');
		$('#idle').hide(200);
	}
	
	this.showModalOverlayEx = function(message){
		this.showModalOverlay(message);
		var winCount = new Number($('#modalOverlayBox>input').val());
		$('#modalOverlayBox>input').val(winCount+1);
	}
	
	this.hideModalOverlayEx = function(){
		var winCount = new Number($('#modalOverlayBox>input').val());
		$('#modalOverlayBox>input').val(--winCount);
		this.hideModalOverlay();
	}
	
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;
		if(alias == "modeswitch"){
			this.ctrl.getChild(this.ctrl.children.length - 1).event("modeswitch", obj.value);
		}
		
		return false;
	}
	
	this.onchangewifi = function(val){
		freakBar = this.getChild("widgetgrid", "wifi", "freakBar");
		freakBar.ctrl.model.value = val;
		freakBar.updateView();
		return false;
	}
	
	this.onchangewifi5G = function(val){
		freakBar = this.getChild("widgetgrid", "wifi", "freakBar2");
		freakBar.ctrl.model.value = val;
		freakBar.updateView();
		return false;
	}
	


	this.title = document.title;

	this.bind("selectpage", this.onselectpage);
	this.bind("changelang", this.onchangelang);
	this.bind("syscmdcomplete", this.onsyscmdcomplete);
	this.bind("rebootrq", this.onrebootrq);
	this.bind("startreboot", this.onstartreboot);
	this.bind("endreboot", this.onendreboot);
	this.bind("startsavereboot", this.onstartsavereboot);
	this.bind("save", this.onsave);
	this.bind("startfwupdate", this.onstartfwupdate);
	this.bind("startupload", this.onstartupload);
	this.bind("uploaderror", this.onuploaderror);
	this.bind("cfgrestoreok", this.oncfgrestoreok);
	this.bind("cfgrestorerror", this.oncfgrestorerror);
	this.bind("resetrebootrq", this.onresetrebootrq);
	this.bind("startresetreboot", this.onstartresetreboot);
	this.bind("changeip", this.onchangeip);
	this.bind("endrequest", this.onendrequest);
	this.bind("chpasswrq", this.onchpasswrq);
	this.bind("needresetrq", this.oneedresetrq);
	this.bind("modeswitchshowrq", this.onmodeswitchshowrq);
	this.bind("modeswitchhiderq", this.onmodeswitchhiderq);
	this.bind("modeswitchsetrq", this.onmodeswitchsetrq);
	this.bind("fieldchange", this.onfieldchange);
	this.bind("badfwrq", this.onbadfwrq);
	this.bind("changewifi", this.onchangewifi);
	this.bind("changewifi5G", this.onchangewifi5G);
	this.bind("showprogress", this.onshowprogress);
	this.bind("autoupdaterq", this.onautoupdaterq);
	$(window).bind('beginIdle', context(this).callback(this.startIdle));
	$(window).bind('endIdle', context(this).callback(this.stopIdle));
}
extend(jsMainFrameView, jsCSideView);



function jsMainFrameResProbeView(ctrl, viewInx, options){
	jsMainFrameResProbeView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		var status = this.options.sender.responseData.status;
		if(status && (status == 20 || status == 12)){
			this.stopRefresh();
			this.ctrl.event("endreboot");
		}
	}	

	/* Name:			prepareData
	 * Description: 	подготовить данные для отправки на сервер
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.prepareData = function(){
		var obj = new Object();
		obj["res_cmd"] = 19;
		obj["res_cmd_type"] = "bl";
		obj["v2"] = "y";
		obj["rq"] = "y";
		this.addToRequest(obj);
	}
	
	/* Name:			onstartreboot
	 * Description: 	обработчик события startreboot
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:			
	 */
	this.onstartreboot = function(){
		clearTimeouts();
		this.startRefresh(7000, options.residentProbeInterval);
		return false;
	}
	
	/* Name:			onstartsavereboot
	 * Description: 	обработчик события startreboot
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:			
	 */
	this.onstartsavereboot = function(){
		clearTimeouts();
		this.startRefresh(7000, options.residentProbeInterval);
		return false;
	}
	
	/* Name:			onstartfwupdate
	 * Description: 	обработчик события startfwupdate
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:			
	 */
	this.onstartfwupdate = function(){
		clearTimeouts();
		this.startRefresh( 45000 + new Number(30000), options.residentProbeInterval);
		return false;
	}

	this.bind("startreboot", this.onstartreboot);
	this.bind("startsavereboot", this.onstartsavereboot);
	this.bind("startfwupdate", this.onstartfwupdate);
}
extend(jsMainFrameResProbeView, jsSSideView);




function jsAdapterController(pageUrl, frame){
	jsAdapterController.superclass.constructor.call(this);

	this.ifaceTypes.face = {type:jsAdapterView, def:true};
	
	this.pageUrl = pageUrl;
	this.frame = frame;
}
extend(jsAdapterController, jsController);


function jsAdapterView(ctrl, viewInx, options){
	jsAdapterView.superclass.constructor.call(this, ctrl, viewInx, options);

	//только после вызова конструктора базового класса будет доступен его функционал!!!
		
	/* Name:		drawView
	* Description: 	нарисовать HTML
	* Arguments:	нет                                                                                                              
	* Return value:	нет
	* Notes:		
	*/
	this.drawView = function(){
		jsAdapterView.superclass.drawView.call(this);
		$(this.myBoxSel).unbind("click");
		$(this.viewBoxSel).load(ctrl.pageUrl, "xml_http_request=yes", onPageLoad);
	}	
}
extend(jsAdapterView, jsCSideView);
