




















function gridActionConverter(rm, ch, nw){
	
	function extract_index($rows){
		var temp = new Array();
		for (var i = 0; i < $rows.length; i++){
			temp.push($rows.eq(i).irow());
		}
		return temp;
	}
	
	if (arguments.length == 1) {
		var grid = arguments[0];
		rm = grid.selection();
		ch = grid.changedRows();
		nw = grid.newRows();
	}
	
	rm = extract_index(rm);
	ch = extract_index(ch);
	nw = extract_index(nw);
	
	var temp_rm = new Array();
	for (var i = 0; i < rm.length; i++) {
		var row = rm[i];
		var index_ch = $.inArray(row, ch);
		var index_nw = $.inArray(row, nw);
		if (index_ch > -1) {
			ch.splice(index_ch, 1);
		}
		if (index_nw > -1) {
			nw.splice(index_nw, 1);
		} else {
			temp_rm.push(row);
		}
	}
	rm = temp_rm;
	
	var temp_ch = new Array();
	for (var i = 0; i < ch.length; i++) {
		var row = ch[i];
		if ($.inArray(row, nw) == -1) {
			temp_ch.push(row);
		}
	}
	ch = temp_ch;
	
	function real_index(value){
		var offset = 0;
		for (var i = 0; i < rm.length; i++){
			var temp = rm[i];
			if (temp < value) {
				offset++;
			} else break;
		}
		return value - offset;
	}
	
	var real_ch = new Array();
	for (var i = 0; i < ch.length; i++) {
		real_ch.push(real_index(ch[i]));
	}
	
	var real_nw = new Array();
	for (var i = 0; i < nw.length; i++) {
		real_nw.push(real_index(nw[i]));
	}
	
	return {
		'deleted': rm.sort().reverse(),
		'changed': ch,
		'added': nw,
		'r_changed': real_ch,
		'r_added': real_nw,
		'count': rm.length + ch.length + nw.length
	};
}


























function jsWindowController(){
	jsWindowController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsWindowClientView};
}
extend(jsWindowController, jsController);




function jsWindowClientView(ctrl, viewInx, options){
	jsWindowClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsWindowClientView.prototype.show = function() {
		rootCtrl.getChild('startInfo').event('stoprefreshrq');
		var win = $(this.myBoxSel);
		if ($(win).is(':hidden')) {
			var topOffset = $(win).parent().offset().top - $(win).parent().position().top;
			var leftOffset = $(win).parent().offset().left - $(win).parent().position().left;
			$(win).css({
				'left':  $(window).width()/2-$(win).width()/2 - leftOffset,
				'top':  $(window).height()/2-$(win).height()/2 - topOffset
			});
			this.showModalOverlay();

			$(win).fadeIn('slow');
			this.ctrl.event("showpopupdlg", this, true);
		}
	}
	
	jsWindowClientView.prototype.hide = function() {
		var win = $(this.myBoxSel);
		if ($(win).is(':visible')) {
			$(win).fadeOut('slow');
			this.hideModalOverlay();			
			this.ctrl.event("hidepopupdlg", this, true);
			if ($('#modalOverlayBox input').val() == '0' && $('#wrapperNavigator>a:eq(0)').hasClass('selected') && !$('#slideboard').is(':visible')) {
				window.rootCtrl.getChild('startInfo').event('startrefreshrq');
			}
		}
	}
	
	/**Мотание окна
	 */
	this.bounce = function() {
		$(this.myBoxSel).animate({left:"-=24px"},100).animate({left:"+=48px"},100).animate({left:"-=40px"},100).animate({left:"+=32px"},100).animate({left:"-=16px"},100);
	}

	jsWindowClientView.prototype.drawView = function(){
		var htmlToDraw = '';
		var options = this.options;
		var uid = getUID();
		var children = this.ctrl.children;
		var child;
		
		this.myBoxSel = '#window' + uid;
		this.viewBoxSel = options.viewBoxSel;
		this.childBoxSel = this.myBoxSel+'>.windowContent';
		this.preloader = this.myBoxSel+'>.windowCaption>.windowPreloader';
		this.closer = this.myBoxSel+'>.windowCaption>.windowCloser';
	};
		
		if (!no(options.title.name)) options.title = options.title.name;
		
		htmlToDraw		=	"<div class='window' id='window" + uid + "' style='display: none'>";
		htmlToDraw		+=	"<div class='windowCaption unselectable'>";
		htmlToDraw		+=	"<div class='windowTitle' unselectable='on'>" + lng(options.title) +"</div>";
		htmlToDraw		+=	"<div class='windowPreloader' unselectable='on'><img src='' /></div>";
		htmlToDraw		+=	"<div class='windowCloser' unselectable='on'><img src='image/closer.gif' /></div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='windowContent'>";
		
		for (var i = 0; i < children.length; i++) {
			if (i != children.length-1 && children.length > 1) {
				htmlToDraw		+=	'<div class="windowSpacer"></div>';
			} else {
				htmlToDraw	+=	'<div></div>';
			}
			child = this.getChild(i);
			child.options.viewBoxSel = this.childBoxSel+">div:eq(" + i + ")";
			child.viewBoxSel = child.options.viewBoxSel;
		}
		
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='windowAction unselectable'></div>";
		htmlToDraw		+=	"<div class='windowOverlay'></div>";	
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		
		if (!no(options.notCloser)) {
			$(this.viewBoxSel+' .windowCloser>img').hide();
		} else {
			$(this.viewBoxSel+' .windowCloser>img').click(context(this).callback(function(){
				this.hide();
				this.ctrl.event('dialogclosed', this, true);
			}));
		}
		
		if (!no(options.width)) {
			$(this.viewBoxSel+' .windowContent').css('width', options.width);
		}
		if (!no(options.height)) {
			$(this.viewBoxSel+' .windowContent').css('height', options.height);
		}
		
		if (!no(options.buttons)) {
			options.action = [];
			for (var i = 0; i < options.buttons.length; i++) {
				options.action.push({'name': options.buttons[i].value, 'func': options.buttons[i].handler});
			}
		}
		
		if (!no(options.action)) {
			for (var i = 0; i < options.action.length ; i++) {
				var a = $("<a href='#' unselectable='on'>" + lng(options.action[i].name) +"</a>");
				$(this.myBoxSel+'>.windowAction').append($(a));
				$(a).bind('click', context(this).callback(options.action[i].func));
			}
		}
		
		if (!no(options.draggable) || true) {
			var caption = $(this.myBoxSel+'>.windowCaption');
			$(caption).mousedown(context(this).callback(this.startWindowDrag));	
			$(caption).mouseup(context(this).callback(this.stopWindowDrag));
		
			$('body').bind('mousemove', context(this).callback(this.moveWindow));
			$('body').bind('mouseup', function(e){
				$(caption).mouseup();
			});
		}
		
		$(this.preloader).bind("ajaxStart", function(){
			$(this).find('>img').attr('src', 'image/preloader.gif');
			$(this).show();
		}).bind('ajaxError', function(){
			$(this).find('>img').attr('src', 'image/errormarker.gif');
			$(this).show();
		}).bind('ajaxStop', function(){
			$(this).hide();
		});
		
		$(this.closer).bind("ajaxStart", function(){
			$(this).hide();
		}).bind('ajaxError', function(){
			$(this).hide();
		}).bind('ajaxStop', function(){
			$(this).show();
		});
		
		$(this.myBoxSel).bind("ajaxStart", function(){
			$(this).find('>.windowOverlay').fadeTo(200, 0.7);
		}).bind('ajaxStop', function(){
			$(this).find('>.windowOverlay').fadeTo(600, 0, function(){
				$(this).hide();
			});
		});
		
		jsWindowClientView.superclass.drawView.call(this);
	}
	
	this.getActionIndex = function(name) {
		for (var i = 0; i < options.action.length ; i++) {
			if (options.action[i].name == name) {
				return i
			}
		}
		return -1;
	}

	jsWindowClientView.prototype.hideAction = function(name){
		var index = this.getActionIndex(name);
		if (index >= 0) {
			$(this.myBoxSel+'>.windowAction>a:eq(' + index + ')').hide();
		}
	}

	jsWindowClientView.prototype.showAction = function(name){
		var index = this.getActionIndex(name);
		if (index >= 0) {
			$(this.myBoxSel+'>.windowAction>a:eq(' + index + ')').show();
		}
	}
	
	jsWindowClientView.prototype.disableAction = function(name){
		var index = this.getActionIndex(name);
		if (index >= 0) {
			$(this.myBoxSel+'>.windowAction>a:eq(' + index + ')').addClass('disable').unbind('click');
		}
	}

	jsWindowClientView.prototype.enableAction = function(name){
		var index = this.getActionIndex(name);
		if (index >= 0) {
			$(this.myBoxSel+'>.windowAction>a:eq(' + index + ')').removeClass('disable').bind('click', context(this).callback(options.action[index].func));
		}
	}
	
	jsWindowClientView.prototype.hideButton = this.hideAction;
	jsWindowClientView.prototype.showButton = this.showAction;
	jsWindowClientView.prototype.disableButton = this.disableAction;
	jsWindowClientView.prototype.enableButton = this.enableAction;
	
	this.startWindowDrag = function(e){
		// Go window to top layer
		var zindex = 0;
		$('.window').each(function(){
			if ($(this).css('z-index') > zindex) {
				zindex = $(this).css('z-index');
			}
		});
		zindex++;
		$(this.myBoxSel).css('z-index', zindex);
		// ------------------------
		this.dragInfo.isDragging = true;
		this.dragInfo.oldLeft = e.pageX -  getPosX(this.myBoxSel);
		this.dragInfo.oldTop = e.pageY - getPosY(this.myBoxSel);
		$('body').css('cursor', 'move');
		return false;
	}
	
	this.moveWindow = function(e) {
		if (this.dragInfo.isDragging) {
			var x = e.pageX - getPosX(this.myBoxSel);
			var y = e.pageY - getPosY(this.myBoxSel);
			$(this.myBoxSel).css({
				'left': getPosX(this.myBoxSel) + x - this.dragInfo.oldLeft,
				'top': getPosY(this.myBoxSel) + y - this.dragInfo.oldTop
			});
			return false;
		}
	}
	
	this.stopWindowDrag = function(){
		this.dragInfo.isDragging = false;
		$('body').css('cursor', 'default');
		return false;
	}
	
	this.dragInfo = {
		isDragging: false,
		oldLeft: 0,
		oldTop: 0
	};
	
	this.showModal = this.show;
	this.isWin = true;

extend(jsWindowClientView, jsCSideView);


jsFieldSetPopUpClientView = jsWindowClientView;





















 
function jsFieldSetController(){
	jsFieldSetController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsFieldSetClientView};
	this.ifaceTypes.server = {type: jsSSideView};
}
extend(jsFieldSetController, jsController);



function jsFieldSetClientView(ctrl, viewInx, options){
	if(options){
		//Копия опции title. Сама опция обнуляется что-бы пресечь наследование.
		//Копирование опций не требующих наследования. Сама опция обнуляется что-бы пресечь наследование.
		var title = options.title;
		var tabs  = options.tabs;
		var wizard  = options.wizard;
		var buttons = options.buttons;
		options.title = "";
		options.tabs = false;
		options.wizard = false;
		options.buttons = null;
	}
	jsFieldSetClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	if(options){
		//Восстановить опцию title
		//Восстановить опции не требующих наследования
		this.options.title = title;
		this.options.tabs = tabs;
		this.options.wizard = wizard;
		this.options.buttons = buttons;
	}
		
	/**Отрисовка fieldset.
	 * Метод производного класса должен вызывать его в начале.
	 */
	jsFieldSetClientView.prototype.drawView = function(){
		var childCtrls = this.ctrl.children;
		var options = this.options;
		var title = options.title?options.title:"&nbsp;";
		var obj = null;
		var	htmlToDraw = "";
		
		if(options.slider){
			if(options.nocollapse){
				htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderNoCollapse'>";
			}
			else{
				if(options.collapsed){
					htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderCollapsed'>";
				}
				else{
					htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderExpanded'>";
				}
			}
			htmlToDraw		+= 	"<div>";

			if(options.title){
				htmlToDraw	+=	lng(options.title);
			}
			htmlToDraw		+=	"</div></div>";		//конец fieldSetSlider
			if(options.descClass){
				htmlToDraw	+=	"<div class='" + options.descClass + "'>";
			}
			else{
				htmlToDraw	+=	"<div class='fieldSetSliderBottom'>";
			}
			htmlToDraw		+= 	"<div>";
			if(options.descText){
				htmlToDraw	+=	lng(options.descText);
			}
			htmlToDraw		+=	"</div></div>";		//конец fieldSetSliderBottom
	
		}
		if(options.slider || options.nothing){
			if(options.slider && options.collapsed && !options.nocollapse){
				htmlToDraw	+=	"<div style='display:none'></div>";
			}
			else{
				htmlToDraw	+=	"<div></div><div class='buttonsInline'></div>";
			}

			$(this.viewBoxSel).html(htmlToDraw);

			if(options.slider){
				this.childBoxSel = this.viewBoxSel + ">div:eq(2)";
			}
			else{
				this.childBoxSel = this.viewBoxSel + ">div:eq(0)";
				if (options.buttonsInline) {
					this.buttonBarSel = this.viewBoxSel + ">div.buttonsInline";
				}
			}
			
			this.options.childBoxSel = this.childBoxSel;
			
			if(options.slider && !options.nocollapse){
				$(this.viewBoxSel + ">div.fieldSetSlider").bind("click", context(this).callback(this.toggleSlider));
			}
		}
		else if(options.simple){
			htmlToDraw += "<div><fieldset></fieldset><div class='buttonsInline'></div></div>";
			
			$(this.viewBoxSel).html(htmlToDraw);
			
			this.childBoxSel = this.viewBoxSel + ">div>fieldset";
			this.options.childBoxSel = this.childBoxSel;
			if (options.buttonsInline) {
				this.buttonBarSel = this.viewBoxSel + ">div>div.buttonsInline";
			}
		}
		else{
			if(options.title){
				if(options.title.type == "link"){
					title = "<font class='fieldSetTitleLink'>" + lng(options.title.name) + "</font>"
				}
				else{
					title = "<font class='fieldSetTitleText'>" + lng(options.title.name) + "</font>"
				}
			}
			else{
				title = "&nbsp;";
			}
	
			//раскладка viewBoxSel
			htmlToDraw 	= 			"<div class='fieldSetMainPath'><div style='display: inline; vertical-align: middle;'></div>"
						+ 			"<div style='margin-left: 4px; display: inline;'>"
	//					+ 			"<font class='fieldSetTitle'>"
						+ 			title
	//					+ 			"</font>"
						+ 			"</div></div>"
						+ 			"<div class='fieldSetMainContentContainer'>";
			htmlToDraw  +=			"<div class='fieldSetMainContent'>"
						+ 			"<div class='fieldSetGeneral' style='display: block;'>"
						+ 			"</div></div></div><div class='buttonsInline'></div>";

			$(this.viewBoxSel).html(htmlToDraw);
			
			if(options.title && options.title.type == "link"){
				$(this.viewBoxSel + ">div.fieldSetMainPath>div>font").bind("click", 
																				{},
																				context(this).callback(options.title.handler));
			}
			
			this.childBoxSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent>div.fieldSetGeneral";
			this.options.childBoxSel = this.childBoxSel;
			if (options.buttonsInline) {
				this.buttonBarSel = this.viewBoxSel + ">div.buttonsInline";
			}
		}

		/*if(options.pages && childCtrls.length > 1){
			this.switchPage(this.activeTab);
		}*/
		if(options.wizard && childCtrls.length > 1){
			this.switchChild(this.activeTab);
		}

		//раскладка childBoxSel
		if(childCtrls.length)	$(this.childBoxSel).html("");
		var htmlToAppend = "";
		var j = 0;
		if(childCtrls.length > 1){
			for(var i in childCtrls){
				htmlToAppend += "<div class='marginTop3'></div>";
				obj = this.getChild(i);
				if(!(obj instanceof jsCSideView)) continue;
				if(options.tabs || options.pages || options.wizard){
					obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j + ")";
				}
				else{
					htmlToAppend += "<div class='fieldSetSpacer'></div>";
					obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j*2 + ")";
				}
				obj.options.viewBoxSel = obj.viewBoxSel;
				if (no(obj.options.buttonsInline)) {
					if (options.buttons) {
						obj.options.buttonsInline = (options.buttons.length > 0);
					} else {
						obj.options.buttonsInline = true;
					}
				}
				j++;
			}

			if(options.tabs || options.pages || options.wizard){
				for(var i=0;i<this.ctrl.children.length;i++){
					obj = this.getChild(i);
					if(obj instanceof jsCSideView){
						obj.options.hide = true;
					}
				}
				this.getChild(this.activeTab).options.hide = false;
			}

			$(this.childBoxSel).append(htmlToAppend);
		}
		else if(childCtrls.length){
			obj = this.getChild(0);
			if(obj instanceof jsCSideView){
				obj.viewBoxSel = this.childBoxSel;
				obj.options.viewBoxSel = obj.viewBoxSel;
			}
		}
		
		this.drawTabBar();
		this.drawButtons();
		this.drawPageBar();
		
		jsFieldSetClientView.superclass.drawView.call(this);
	}
	
	/**Переключить состояние слайдера.*/
	this.toggleSlider = function(time){
		var options = this.options;
		var obj = $(options.viewBoxSel + ">div.fieldSetSlider");
		if (!time) {
			time = 'slow';
		}
		if(options.collapsed){
			obj.removeClass("fieldSetSliderCollapsed");
			obj.addClass("fieldSetSliderExpanded");
			$(options.childBoxSel).slideDown(time);
			options.collapsed = false;
		}
		else{
			obj.removeClass("fieldSetSliderExpanded");
			obj.addClass("fieldSetSliderCollapsed");
			$(options.childBoxSel).slideUp(time);
			options.collapsed = true;
		}
		return false;
	}
	
	/*jsFieldSetClientView.prototype.show = function(){
		this.drawButtons();
		jsFieldSetClientView.superclass.show.call(this);
	}*/
	
	/**Скрыть кнопку
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.hideButton = function(name){
		if(this.buttons && name in this.buttons){
			$(this.buttons[name].sel).css("display", "none");
		}			
	}

	/**Показать кнопку.
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.showButton = function(name){
		if(this.buttons && name in this.buttons){
			$(this.buttons[name].sel).css("display", "");
		}			
	}
	
	/**Запретить кнопку
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.disableButton = function(name){
		if(this.buttons && name in this.buttons){
			$(this.buttons[name].sel).removeClass('normal push').addClass('disable');
			this.unsetButtonClick(name);
		}			
	}

	/**Разрешить кнопку.
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.enableButton = function(name){
		if(this.buttons && name in this.buttons){
			$(this.buttons[name].sel).removeClass('disable').addClass('normal');
			this.unsetButtonClick(name);
			this.setButtonClick(name);
		}			
	}
	
	/**Обновить кнопки.
	 */
	jsFieldSetClientView.prototype.updateButtons = function(){
		if(this.options.buttons){
			this.drawButtons();
		}				
	}
	
	/**Показать вкладку.
	 * Подсвечивает вкладку и показывает её содержимое.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.showTab = function(tabInx){
		$(this.tabBarSel+'>.pageTab:eq(' + tabInx + ')').addClass('active');
		this.getChild(tabInx).show();
		if (this.getChild(tabInx) instanceof jsFieldSetClientView) {
			this.getChild(tabInx).drawButtons();
			this.getChild(tabInx).drawPageBar();
		}
	}
	
	/**Cкрыть  вкладку.
	 * Приглушает вкладку и скрывает её содержимое.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.hideTab = function(tabInx){
		$(this.tabBarSel+'>.pageTab:eq('+tabInx+')').removeClass('active');
		this.getChild(tabInx).hide();
	}
	
	/**Переключиться на вкладку.
	 * Переключается на новую вкладку.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.switchTab = function(tabInx){
		if (this.activeTab != tabInx) {
			this.hideTab(this.activeTab);
			this.showTab(tabInx);
			this.activeTab = tabInx;
		}
	}
	
	/**Переключиться на страницу.
	 * @param	{int}		pageInx		Индекс страницы.
	 */
	jsFieldSetClientView.prototype.switchPage = function(pageInx){
		$(this.pageBarSel+'>.pageLink:eq(' + this.activeTab + ')').removeClass('active');
		$(this.pageBarSel+'>.pageLink:eq(' + pageInx + ')').addClass('active');
		this.switchChild(pageInx);
	}
	
	/**Изменить видимого потомка.
	 * @param	childId		Индекс или алиас потомка.
	 */
	jsFieldSetClientView.prototype.switchChild = function(childId){
		this.getChild(this.activeTab).hide();
		var child = this.getChild(childId);
		child.show();
		this.activeTab = child.ctrl.thisInx;
	}
	
	/**Сгенерировать HTML код панели вкладок.
	 * @return	HTML код панели вкладок.
	 */
	jsFieldSetClientView.prototype.drawTabBar = function(){
		var children = this.ctrl.children;
		var options = this.options;
		var htmlToDraw = '';
		
		if (options.ishidden) return ;
		
		if (this.isPage()) {
			if (options.tabs && children.length > 1) {
				/**/ $('#pageTitle>.pageTitle>span').show(); /**/
				for (var i = 0; i < children.length; i++) {
					htmlToDraw	+=	"<div class='pageTab'><a href='#' langkey=\"" + this.getChild(i).options.title + "\">" + lng(this.getChild(i).options.title) + "</a></div>";
				}
			} else if (!no(options.pageTitle)) {
				htmlToDraw	+=	"<div class='pageTab'><a href='#' langkey=\"" + options.pageTitle + "\">" + lng(options.pageTitle) + "</a></div>";
			} else {
				return ;
			}
			htmlToDraw	+=	"<div class='clear'></div>";
			$(this.tabBarSel).html(htmlToDraw);
			$(this.tabBarSel).find('>.pageTab:eq(' + this.activeTab + ')').addClass('active');
			this.setTabClicks();
		}
	}
	
	/**Сгенерировать HTML код панели переключения страниц.
	 * @return	HTML код панели вкладок.
	 */
	jsFieldSetClientView.prototype.drawPageBar = function(){
		var children = this.ctrl.children;
		var options = this.options;
		var	htmlToDraw = '';
		
		if (options.ishidden) return ;
		
		if (options.pages) {
			//-------------------------------------------
			$('#pageGeneral').addClass('frameStyle');
			$('#pageScrollShadowTop').hide();
			$('#pageScrollShadowBottom').hide();
			//-------------------------------------------
			for (var i = 0; i < children.length; i++) {
				htmlToDraw	+= "<a href='#' class='pageLink'>";
				htmlToDraw	+= "<img src='image/coner_master.png' />";
				htmlToDraw	+= "<span>" + (i+1) + "</span>";
				htmlToDraw	+= "</a>";
			}
			$(this.pageBarSel).html(htmlToDraw);
			this.setPageClicks();
			this.switchPage(this.activeTab);
		} else {
			//-------------------------------------------
			$('#pageGeneral').removeClass('frameStyle');
			$('#pageScrollShadowTop').show();
			$('#pageScrollShadowBottom').show();
			//-------------------------------------------
			$(this.pageBarSel).html('');
			var obj;
			for (var i = 0; i < children.length; i++) {
				obj = this.getChild(i);
				if (obj instanceof jsFieldSetClientView) obj.drawPageBar();
			}
		}
	}
	
	/*Нарисовать кнопки*/
	this.drawButtons = function(){
		var children = this.ctrl.children;
		var options = this.options;
		var htmlToDraw = "";
		var button;
		
		if ((options.ishidden || options.hide) && !options.buttonsInline) return ;
		
		if (options.buttons && options.buttons.length > 0) {
			for(var i = 0; i < options.buttons.length; i++){
				button = options.buttons[i];
				if(button){		//защита для IE от массива с запятой в конце [1,2,3,] 
					htmlToDraw	+=	"<div class='buttoner normal unselectable' style='margin: 7px 0 0 8px;'>";
					htmlToDraw 	+=  "<input name='" + button.name + "' value='" + lng(button.value) + "' type='hidden'>";
					htmlToDraw	+=	"<div class='title' unselectable='on'>" + lng(button.value) + "</div>";
					htmlToDraw	+=	"<div class='clear'></div>";
					htmlToDraw	+=	"</div>";
				}
			}
			$(this.buttonBarSel).html(htmlToDraw);
			
			$(this.buttonBarSel+'>.buttoner').mouseenter(function(){
				$(this).not('.disable').addClass('hover');
			}).mouseleave(function(){
				$(this).not('.disable').removeClass('hover');
			}).mousedown(function(){
				$(this).not('.disable').addClass('push');
				}).mouseup(function(){
				$(this).not('.disable').removeClass('push');
			});
			this.setButtonClicks();
		} /*else {
			var obj;
			for (var i = 0; i < children.length; i++) {
				obj = this.getChild(i);
				if (obj instanceof jsFieldSetClientView) obj.drawButtons();
			}
		}*/
	}
	
	this.cleanButtons = function(){
		$(this.buttonBarSel).html("");
	}

	/**Обработчик DOM события от клика на ссылке вкладки.
	 * В event.data.tabInx приходит индекс вкладки.
	 * @param	event
	 */
	jsFieldSetClientView.prototype.ontabclick = function(event){
		for (var i = 0; i < this.ctrl.children.length; i++) {
			var tab = this.getChild(i);

			if(tab instanceof jsCSideView){
				if (!no(tab.ctrl.activeRecordInx)) {
					tab.ctrl.activeRecordInx = -1;
				}
				tab.constructor(tab.ctrl, tab.viewInx, tab.options);
				tab.drawView();
				tab.ctrl.event("updaterq");
			}
		}
		this.switchTab(event.data.tabInx);
		return false;
	}	

	/**Обработчик DOM события от клика на ссылке страницы.
	 * В event.data.pageInx приходит индекс вкладки.
	 * @param	event
	 */
	jsFieldSetClientView.prototype.onpageclick = function(event){
		this.switchPage(event.data.pageInx);
		return false;
	}	

	/**Проставляет обработчики события "click" на вкладках.
	 */
	jsFieldSetClientView.prototype.setTabClicks = function(){
		var ontabclick = context(this).callback(this.ontabclick);
		$(this.tabBarSel+'>.pageTab').each(function(index){
			$(this).bind("click", {tabInx:index}, ontabclick);
		});
	}

	/**Проставляет обработчики события "click" на панели переключения страниц.
	 */
	jsFieldSetClientView.prototype.setPageClicks = function(){
		for(var i = 0; i < this.ctrl.children.length; i++){
			$(this.pageBarSel + ">.pageLink:eq(" + i + ")").bind("click", {pageInx:i}, context(this).callback(this.onpageclick));
		}
	}

	/**Проставляет обработчики события "click" на кнопках.
	 */
	jsFieldSetClientView.prototype.setButtonClicks = function(){
			var options = this.options;
			//проставить onclick'и
			if(options.buttons && options.buttons.length > 0){
				var buttonSel;
				this.buttons = {};
				for(var i=0;i<options.buttons.length;i++){
					var button = options.buttons[i];
					if(button){		//защита для IE от массива с запятой в конце [1,2,3,] 
						buttonSel = this.buttonBarSel + ">.buttoner:eq(" + i + ")";
						this.buttons[button.name] = {sel: buttonSel, handler: button.handler};
						$(buttonSel).bind("click", {}, context(this).callback(button.handler));
					}
				}
			}
	}
	
	/**Проставляет обработчик события "click" на кнопке.
	 */
	jsFieldSetClientView.prototype.setButtonClick = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).bind("click", {}, context(this).callback(this.buttons[name].handler));
		}
	}
	
	/**Снимает обработчик события "click" на кнопке.
	 */
	jsFieldSetClientView.prototype.unsetButtonClick = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).unbind('click');
		}
	}
	
	/**Проставляет обработчики события "click" на кнопках.
	 */
	jsFieldSetClientView.prototype.onerrstat = function(){
		var options = this.options;
		if(options.slider && options.collapsed){
			this.toggleSlider();
		}
		return true;
	}
	
	jsFieldSetClientView.prototype.isPage = function(){
		return !(this.getParent() instanceof jsFieldSetClientView);
	}
	
	/**Номер активной вкладки или страницы.
	 * Инициализируется из одноимённой опции и изменяется методами switchTab и switchPage.
	 * @see		#showTab
	 * @see		#hideTab
	 * @type	int
	 */
	this.activeTab = this.options.activeTab?this.options.activeTab:0;
	/**Селектор панели вкладок.
	 * @see		#drawView
	 * @type	String
	 */
	this.tabBarSel = '#pageTabs';
	/**Селектор панели переключения страниц.
	 * @see		#drawView
	 * @type	String
	 */
	this.pageBarSel = '#pageToolbarMisc';
	this.buttonBarSel = (this.options.buttonBarSel ? this.options.buttonBarSel : "#pageToolbarButtons");
	
	this.bind("errstat", this.onerrstat)
}
extend(jsFieldSetClientView, jsCSideView);






















 /**Создаёт новый экземпляр класса js3GsettingsModel.
 * @class						Модель настроек АТМ.
 * @param	{Object}	ifnode	Узел интерфейса.	
 * @constructor
 */
 
function js3GSettingsModel(ifnode, service) {
	js3GSettingsModel.superclass.constructor.call(this);

	/**Узел L2 интерфейса.
	 * @type	Object
	 */
	this.ifnode = ifnode;
	this.service = service;	

}
extend(js3GSettingsModel, jsModel);


 
function js3GSettingsController(ifnode, isadding, service) {
	 js3GSettingsController.superclass.constructor.call(this);
	 
	this.changeModel(new js3GSettingsModel(ifnode, service));

	this.ifaceTypes.client = {type: js3GSettingsClientView};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: js3GSettingsClientView};
	this.ifaceTypes.summary.options = {};

	this.addChild(new jsInputController(ifnode.mode), "mode");
	this.addChild(new jsInputController(service.apn), "apn");
}
extend(js3GSettingsController, jsController);



function js3GSettingsClientView(ctrl, viewInx, options) {
	options = options?options:{};

	/**Обновить модель.
	 * Правит поля, касающиеся 3G, в model.ifnode.
	 * Так как ifnode это ссылка, то правится один и тот же узел во всех контролах.
	 */
	this.updateModel = function(){
		var res = js3GSettingsClientView.superclass.updateModel.call(this);
		if(res){
			
			var ifnode = this.ctrl.model.ifnode;
			ifnode.mode = this.getChild("mode").ctrl.model.toString();
			
			var service = this.ctrl.model.service;			
			var apnVal = this.getChild("apn").ctrl.model.toString();
			if ( apnVal != "" ) {
				service.apn = apnVal;
			}		
			
		}
		return res;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.hide();
		}
		else{
			//подробно
			this.show();
		}
		return false;
	}
	
	/* конвертирует dec в bin и дополняет нулями до 8 символов */
	function getBitField(n) {
		var f = Number(n).toString(2);    
		var n = f.length;
		for ( var i = 0; i < 8 - n; i++ ) {
			f = '0' + f;
		}
		return f;
	}
	
	function checkField(i, n) {
		var f = getBitField(i);
		if ( f[ 8 - n ] == '1' ) {
			return true;
		}
		return false;
	}
	
	var obj;
	var ifnode = ctrl.model.ifnode;

	obj = ctrl.getChild("apn");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "APN",
		optional: true,
		hide: !(ifnode.contype == "lte" || ifnode.type == "lte" || ( ifnode.dongle_type && ifnode.dongle_type == 2 ))
	};
	
	obj = ctrl.getChild("mode");
	obj.nextIface = "select";
	if(ifnode.type == "3g"){
		obj.ifaceTypes.select.options = {
			humanName : "g3_actual_mode",
			valset: {"auto":"32","3g":"3","2g":"2"}
		};
	}
	else if(ifnode.type == "usb"){	
		var modes = {};			
		var available_modes = ifnode.available_modes; 		
		var all_modes = [
			["Auto", "0x000"],
			["2G only", "0x001"],
			["3G only", "0x002"],
			["LTE only", "0x004"],
			["Auto 2G->3G", "0x008"],
			["Auto 3G->2G", "0x010"],
			["Auto 2G->3G->LTE", "0x020"],
			["Auto 3G->LTE", "0x080"],
			["Auto LTE->3G", "0x100"]
		];
		
		//показывается всегда
		modes['Auto'] = '0x000';
		
		for ( var i = 0; i <= 7; i++ ) {
			if (checkField(available_modes, i + 1)){
				modes[ all_modes[i][0] ] = all_modes[i][1];
			}
		}
		
		obj.ifaceTypes.select.options = {
			humanName : "g3_actual_mode",
			valset: modes
		};
	
		obj.model.value = ifnode.mode;
		
	} 
	else{
		obj.ifaceTypes.select.options = {
			humanName : "g3_actual_mode",
			valset: {"auto":"0","4g":"4","3g":"3","2g":"2"}
		};
	}
	
	js3GSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("modeswitch", this.onmodeswitch);

	if(ifnode.wizard){
		options.nothing = true;
		options.hide = this.options.brief;
	}
	else{
		options.slider = true;
		options.title = "menu_usbmodem";
		options.collapsed = false;
		options.nocollapse = true;
	}
}
extend(js3GSettingsClientView, jsFieldSetClientView);

window.provs3g = {}




















var client_login = getCookie("client_login");

var __rpc_index = {};
__rpc_index[ 35] = "wifi";
__rpc_index[ 111] = "wifi.wmm";
__rpc_index[ 110] = "wifi.apcli";
__rpc_index[ 1] = "ifaces";
__rpc_index[ 58] = "urlfilter.list";
__rpc_index[ 71] = "urlfilter.settings";
__rpc_index[ 72] = "urlfilter.url_list";
__rpc_index[ 74] = "macfilter";
__rpc_index[ 23] = "dmz";
__rpc_index[ 88] = "ipfilter";
__rpc_index[ 66] = "upnp";
__rpc_index[ 17] = "route";
__rpc_index[ 16] = "httpaccess";
__rpc_index[ 197] = "users";
__rpc_index[ 129] = "129";
__rpc_index[ 145] = "145";
__rpc_index[ 166] = "166";
__rpc_index[ 130] = "130";
__rpc_index[ 133] = "133";
__rpc_index[ 9] = "9";
__rpc_index[ 11] = "11";
__rpc_index[ 12] = "12";
__rpc_index[ 63] = "syslog";

__rpc_index[ 130] = "syslog_read";
__rpc_index[ 6] = "ddns";
__rpc_index[ 8] = "nat";
__rpc_index[ 65] = "ntp";
__rpc_index[ 69] = "password";
__rpc_index[ 70] = "tr69";
__rpc_index[ 165] = "firmware_remote_update";
__rpc_index[ 152] = "telnet";
__rpc_index[ 162] = "redirect";




debug('111');
debug(window.access_rights);
if(window.access_rights){            
debug('222');

	var putInto = function(path, data){
		if(path){
		    var arr = path.split(".");
		    var subObj = obj = {};
		    for(var i=0; i<arr.length - 1; i++){
			    subObj = subObj[arr[i]] = {}
		    }
		    subObj[arr[arr.length - 1]] = data;
			return obj;
		}
		else{
			return data;
		}
	}
	
	var setObjAttrs = function(data, attrs, baseMode){
		var value, valueAttrs, mode;
		
		function body(key){
			value = data[key];
			
			if(is.unset(value)) return;
			
			try{
				valueAttrs = attrs[key];
				if(is.number(valueAttrs)){
					mode = valueAttrs;
				}
				else if(is.set(valueAttrs.__mode)){
					mode = valueAttrs.__mode;
				}
				else{
					mode = baseMode;
				}
			}
			catch(e){
				mode = baseMode;
			}

			if(is.object(value)){
				setObjAttrs(value, valueAttrs, mode);
			}
			else if(mode != 6){
				var valueWithAttrs; 
				switch(typeof value){
					case "number":						
						valueWithAttrs = data[key] = new Number(value);
					break;
					case "string":
						valueWithAttrs = data[key] = new String(value);
					break;
					case "boolean":
						valueWithAttrs = data[key] = new Boolean(value);
					break;
				}
				valueWithAttrs.__attrs__ = {mode: mode};
			}
		}
		
		if(baseMode == 6){
			if(is.object(attrs)){
				for(var key in attrs){
					body(key);
				}
			}
		}
		else{
			if(is.array(data)){
				for(var i=0; i<data.length; i++){
					body(i);
				}
			}
			else{
				for(var key in data){
					body(key);
				}
			}
		}
	}

	var setRPCAttrs = function(data, id){
		var path = access_rights.__rpc_index[id];
		var baseMode = is.set(access_rights.__mode)?access_rights.__mode:6;
		setObjAttrs(putInto(path, data), access_rights, baseMode);
		//debug(data);
	}

	var hideFlag = function(rpc){
		return disableFlag(rpc, 0);
	}
	
	var disableFlag = function(rpc, m){
		if(is.unset(m)) m = 4;
	    try{
			if(is.string(rpc)){
				var key = rpc;
				var baseMode = is.set(access_rights.__mode)?access_rights.__mode:6;
				var data = {__all: "__all"};
				setObjAttrs(putInto(key, data), access_rights, baseMode);
				var mode = data.__all.__attrs__.mode;
				return (is.set(mode) && mode <= m);
			}
			else{
				var data = {__all: "__all"};
				setRPCAttrs(data, rpc);
				var mode = data.__all.__attrs__.mode;
				return (is.set(mode) && mode <= m);
			}
	        
	    }
	    catch(e){
	        return false;
	    }                    
	};


	device.hook(device.signal.PROCESS, function(state, jqXHR){
		try{
			if(!state && jqXHR.answer){
				var reArr = [];
				if(jqXHR.answer.resident)	reArr = [jqXHR.answer];
				else if(jqXHR.answer.rq)	reArr = jqXHR.answer.rq;
				
				var re;
				for(var i=0; i<reArr.length; i++){
					if(re = reArr[i]) setRPCAttrs(re.resident, re.config_id);
				}
				
				//Выдёргиваю из массивы mbssid (wifi), элементы с нулевым доступом
				//Не очень красивое решение, но оно продиктовано не очень красивой реализацией wifi в морде
				var mbssidRights = window.access_rights[__rpc_index[ 35]].mbssid;
				if(mbssidRights){
					var re = null;
					for(var i=0; i<reArr.length; i++){
						if(reArr[i] && reArr[i].config_id ==  35){
							re = reArr[i];
							break;
						}
					}
					if(re){
						var json = re.resident;
						var mbssidNum = json.mbssidNum;
						var mbssidCur = json.mbssidCur;
						var mbssid = json.mbssid;
						
						var mbssidNew = [];
						var obj, mode;
						for(var i=0, j=0; i<mbssid.length; i++){
							obj = mbssidRights[i];
							if(is.number(obj)) mode = obj;
							else if(is.object(obj) && is.number(obj.__mode)) mode = obj.__mode;
							else mode = 6;
							if(mode != 0) mbssidNew.push(mbssid[j++]);
						}
						if(mbssid.length > mbssidNew.length){
							json.mbssidNum = mbssidNew.length;
							json.mbssidCur = 1;
							json.mbssid = mbssidNew;
						}
					}
				}		
			}
		}
		catch(e){
			debug(e.message);
		}
	});
}
else{
debug('333');
	var hideFlag  = function(){return false};
	var disableFlag = function(){return false};
}





















function pageActiveSessions(){
	pageActiveSessions.superclass.constructor.call(this);
	
	this.refreshTime = 10000;
	this.rqId = -1;
	this.firstStart = true;
	this.refreshId = null;
	this.$grid = null;
	this.activeSessions = null;
	
	
	this.add(new nodeCaption("routingLabel", "routingDescText"))
		.add(new node(), "grid");
	
	
	
	this.updateView = function(phase){
		pageActiveSessions.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.$grid = this.$box.html("\
			<div class='grid'></div>\
				").find('.grid').lightUIGrid([
				{ index: "protocol", name: "protocol" },
				{ index: "source_ip", name: "activeSessionsSourceIp" },
				{ index: "source_port", name: "activeSessionsSourcePort" },
				{ index: "dest_ip", name: "activeSessionsDestIp" },
				{ index: "dest_port", name: "activeSessionsDestPort" }
			], 0);
			
			if (this.activeSessions){
				var session;
				for (var i = 0; i<this.activeSessions.length; i++){
					var session = this.activeSessions[i];
					var tcp = session.protocols.tcp;
					var udp = session.protocols.udp;
					
					if (tcp) for (var j = 0; j<tcp.length; j++){
						var $row = this.$grid.addRow().row("last");
						$row.col("protocol").html("TCP");
						$row.col("source_ip").html(session.source_ip);
						$row.col("source_port").html(tcp[j].source_port);
						$row.col("dest_ip").html(tcp[j].dest_ip);
						$row.col("dest_port").html(tcp[j].dest_port);
					}
					if (udp) for (var j = 0; j<udp.length; j++){
						var $row = this.$grid.addRow().row("last");
						$row.col("protocol").html("UDP");
						$row.col("source_ip").html(session.source_ip);
						$row.col("source_port").html(udp[j].source_port);
						$row.col("dest_ip").html(udp[j].dest_ip);
						$row.col("dest_port").html(udp[j].dest_port);
					}
				}
			}
		}
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}
	
	this.update = function(){
		if (this.firstStart) rootView.showModalOverlay();
			this.rqId = device.config.read( 180, callback(this, function(data){
			this.activeSessions = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.firstStart = false;
			this.startRefresh(this.refreshTime);
		}));
		this.firstStart = false;
	}
	
	this.bind("updaterq", function(){
		this.startRefresh(0);
	});
}
extend(pageActiveSessions,node);





















 
function jsSubNetAddrWithLANController(bits, addr, radix, delim, expandZero, omitFullMask){
	jsSubNetAddrWithLANController.superclass.constructor.call(this, bits, addr, radix, delim, expandZero, omitFullMask);
	this.getChild("field").ifaceTypes.client = {type: jsSubNetAddrWithLANClientView, options:{}};
}
extend(jsSubNetAddrWithLANController, jsSubNetAddrController);

 
function jsSubNetAddrWithLANClientView(ctrl, viewInx, options){
	jsSubNetAddrWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Отрисовка поля ввода сетевого адреса.*/
	jsSubNetAddrWithLANClientView.prototype.drawView = function(){
		jsSubNetAddrWithLANClientView.superclass.drawView.call(this);

		var options = this.options;
		var lanValset = options.lanValset;
		var htmlToDraw;

		if(lanValset){
			var elemID = this.$input.attr("id");
			htmlToDraw		=	"<select id='lanCli"+elemID+"' ><option value='0' >&lt;"+lng("statLanClientsSel")+"&gt;</option>";
			for(var i in lanValset){
				if ( (this.ctrl.model.bits == 128 && lanValset[i].match(/:/)) || (this.ctrl.model.bits == 32 && !lanValset[i].match(/:/)) ) {
					htmlToDraw	+= 	"<option value='"+lanValset[i]+"' >" + i + "</option>";
				}
					//~ htmlToDraw	+= 	"<option value='"+lanValset[i]+"' >" + i + "</option>";
			}
			htmlToDraw		+=	"</select>";
			this.$input.after(htmlToDraw);

			if (options.disabled)
				this.disable();

			var addition = "";
			if (this.ctrl instanceof jsSubNetIPWithLANController && this.partCount != 8) {
				addition = "/32";
			}
			$("#lanCli" + elemID).bind("change", function(){ var value = $(this).val(); if (value != "0") $("#" + elemID).val(value+addition).trigger('change'); });
		}
		//~ this.disenList();
	}

	this.disenList = function(){
		if(this.ctrl.model.bits == 128){
			$(this.options.viewBoxSel + " select").attr("disabled", true);
		}
		else{
			$(this.options.viewBoxSel + " select").attr("disabled", false);
		}
	}
}
extend(jsSubNetAddrWithLANClientView, jsSubNetIPClientView);

 
function jsMACWithLANClientView(ctrl, viewInx, options){
	jsMACWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Отрисовка поля ввода сетевого адреса.*/
	jsMACWithLANClientView.prototype.drawView = function(){
		jsMACWithLANClientView.superclass.drawView.call(this);

		var options = this.options;
		var lanValset = options.lanValset;
		var htmlToDraw;

		if(lanValset){
			var elemID = this.$input.attr("id");
			htmlToDraw		=	"<select id='lanCli"+elemID+"' ><option value='0' >&lt;"+lng("statLanClientsSel")+"&gt;</option>";
			for(var i in lanValset){
				if ((this.partCount == 4 && lanValset[i].search(/\./) != -1) || (this.partCount != 4 && lanValset[i].search(/:/) != -1)) {
					htmlToDraw	+= 	"<option value='"+lanValset[i]+"' >" + i + "</option>";
				}
			}
			htmlToDraw		+=	"</select>";
			this.$input.after(htmlToDraw);

			if (options.disabled)
				this.disable();

			var addition = "";
			if (this.ctrl instanceof jsSubNetIPWithLANController && this.partCount != 8) {
				addition = "/32";
			}
			$("#lanCli" + elemID).bind("change", function(){ var value = $(this).val(); if (value != "0") $("#" + elemID).val(value+addition).trigger('change'); });
		}
	}

}
extend(jsMACWithLANClientView, jsSubNetAddrClientView);


 
function jsNetAddrWithLANController(bits, addr, radix, delim, expandZero){
	jsNetAddrWithLANController.superclass.constructor.call(this, bits, addr, radix, delim, expandZero);

	this.getChild("field").ifaceTypes.client = {type: jsSubNetAddrWithLANClientView, options:{}};

}
extend(jsNetAddrWithLANController, jsNetAddrController);


 
function jsSubNetIPWithLANController(addr, version, omitFullMask){
	jsSubNetIPWithLANController.superclass.constructor.call(this, addr, version, omitFullMask);

	this.getChild("field").ifaceTypes.client = {type: jsSubNetIPWithLANClientView, options:{}};
}
extend(jsSubNetIPWithLANController, jsSubNetIPController);


 
function jsSubNetIPWithLANClientView(ctrl, viewInx, options){
	jsSubNetIPWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Проверить введённый сетевой адрес.
	 * statusCode может принимать следующие значения:<br>
	 * <span>&nbsp;&nbsp;</span>subNetMaskEmpty			-	пользователь оставил поле пустым.
	 * <span>&nbsp;&nbsp;</span>subNetMaskNaN			-	пользователь ввёл не число.
	 * <span>&nbsp;&nbsp;</span>subNetMaskOutOfScope	-	Одна из частей адреса вышла за допустимые пределы.
	 * Если при скрытом или запрещённом представлении валидатор находит ошибку, то устанавливает значение undefined
	 * в поле ввода и сбрасывает код ошибки.
	 * @type	bool
	 * @return	Код возврата метода базового класса.
	 */
	jsSubNetIPWithLANClientView.prototype.validate = function(){
		this.statusCode = null;
		var value = this.$input.attr("value");
		var arr;
		if(this.options.ishidden || this.options.disabled) return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
		
		if(value.match(/^$/)){
			this.statusCode = "netAddrEmpty";
			return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
		}
		
		if(this.ctrl.model.bits == 128){
			this.ctrl.model.partBitCount = 16;
			if(value.match(/::/)){
				//специальная нотация
				if(!value.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)){
					//сокращённая нотация
					if(value.match(/^\s*$/)){
						this.statusCode = "netAddrEmpty";
					}
					if(!value.match(/^::$/) && !value.match(/^::[0:]*$/)  && !value.match(/^[0:]*::$/)){
						var parts = this.ctrl.model.parseShortNotation(value);
						if(no(parts[0])
							|| no(parts[1])
							|| no(parts[2])
							|| no(parts[3])
							|| no(parts[4])
							|| no(parts[5])
							|| no(parts[6])
							|| no(parts[7])){
							this.statusCode = "netAddrInvalid";
						}
						if(!this.statusCode){
							var arr = value.split("/");
							if(arr instanceof Array && arr[1]){
								this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10);
								if(this.statusCode){
									this.statusCode = "netAddr" + this.statusCode;
								}
							}
						}
					}
				}
				return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
			}
			else{
				//общая нотация
				arr = value.split(":");
				if(arr.length == 8){
					return jsSubNetIPWithLANClientView.superclass.validate.call(this);
				}
				else{
					this.statusCode = "netAddrInvalid";
					return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
				}

			}
		}
		else{
			this.ctrl.model.partBitCount = 8;
			arr = value.split(".");
			if(arr.length == 4){
				return jsSubNetIPWithLANClientView.superclass.validate.call(this);
			}
			else{
				this.statusCode = "netAddrInvalid";
				return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
			}
		}
	}
}
extend(jsSubNetIPWithLANClientView, jsSubNetAddrWithLANClientView);


 
function jsSubNetIPv4WithLANController(addr){
	jsSubNetIPv4WithLANController.superclass.constructor.call(this, addr, 4);
}
extend(jsSubNetIPv4WithLANController, jsSubNetIPWithLANController);

 
function jsSubNetIPv6WithLANController(addr){
	jsSubNetIPv6WithLANController.superclass.constructor.call(this, addr, 6);
}
extend(jsSubNetIPv6WithLANController, jsSubNetIPWithLANController);


 
function jsIPWithLANController(addr, version, subIPController){
	jsIPWithLANController.superclass.constructor.call(this, addr, version, subIPController);

	this.getChild("field").ifaceTypes.client = {type: jsSubNetIPWithLANClientView, options:{}};

}
extend(jsIPWithLANController, jsIPController);


 
function jsIPv4WithLANController(addr){
	jsIPv4WithLANController.superclass.constructor.call(this, addr, 4);
}
extend(jsIPv4WithLANController, jsIPWithLANController);

 
function jsIPv6WithLANController(addr){
	jsIPv6WithLANController.superclass.constructor.call(this, addr, 6);
}
extend(jsIPv6WithLANController, jsIPWithLANController);


 
function jsMACWithLANController(addr){
	if(!addr) addr = [null, null, null, null, null, null];
	jsMACWithLANController.superclass.constructor.call(this, 48, addr, 16, ":", true);
	
	this.getChild("field").ifaceTypes.client = {type: jsMACWithLANClientView, options:{delim: ":", radix: 16}};
}
extend(jsMACWithLANController, jsNetAddrWithLANController);


function makeLANClientsValset(lanClients, field, additField) {
	var valset = null;
	if (lanClients && lanClients.length) {
		valset = {};
		var additionText = "";
		for (var i in lanClients) {
			additionText = "";
			if (lanClients[i].hostname) {
				additionText = lanClients[i].hostname;
			}
			if (additField) {
				if (additionText != "")
					additionText += ", ";
				additionText += lanClients[i][additField];
			}
			if (additionText != "") {
				additionText = " (" + additionText + ")";
			}
			valset[lanClients[i][field]+additionText] = lanClients[i][field];
		}
	}
	return valset;
}



function jsComboModel(addr){
	jsComboModel.superclass.constructor.call(this. addr);
	
	this.setParts = function(addr){
		this.value = addr;
	}
	
	this.setParts(addr);
}
extend(jsComboModel, jsInputModel);

function jsMACComboController(addr, LANClients, clone, devicemac){
	jsMACComboController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsMACComboView, options:{}};
	this.LANClients = LANClients;
	this.clone = clone;
	this.devicemac = devicemac;
	this.changeModel(new jsComboModel(addr));

}
extend(jsMACComboController, jsController);

function jsComboView(ctrl, viewInx, options){
	jsComboView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.val = function(value){
		if(is.set(value)){
			this.pluginCombo.fieldval(value);
		}
		return this.pluginCombo.fieldval();
	}
	
	this.disable = function(){
		this.pluginEdit.disable();
	}
	
	this.enable = function(){
		this.pluginEdit.enable();
	}
	
	this.setError = function(statusCode){
		this.pluginEdit.setError(statusCode);
	}
	
	this.cleanError = function(){
		this.pluginEdit.cleanError();
	}
	
	this.setMandatory = function(){
		this.pluginCombo.flags.mandatory = true;
	}
	
	this.clearMandatory = function(){
		this.pluginCombo.flags.mandatory = false;
	}
	
	this.updateModel = function(){
		this.statusCode = this.pluginCombo.validate();
		if(is.unset(this.statusCode)){
			this.ctrl.model.value = this.val();
			return true;
		}
		else{
			this.pluginEdit.setError(this.statusCode);
		}
		return false;
	}
	
	this.updateView = function(){
		this.val(this.ctrl.model.value);
	}
	
	this.onfieldchangejq = function(event){
		this.ctrl.modified = true;
		this.ctrl.event("fieldchange", {view:this, value:this.val()}, true);
		event.stopPropagation();
		return true;
	}
	
	jsComboView.prototype.bindEvents = function(){
		
		var options = this.options;
		
		this.pluginCombo.bind("unfocus.input enter.input tab.input", context(this).callback(function(event){
			this.pluginEdit.cleanError();
			this.ctrl.modified = true;
			this.ctrl.event("fieldchange", {view:this, value:this.val()}, true);
			event.stopPropagation();
			return true;
		}));
		this.pluginCombo.bind("onfocus.input", context(this).callback(function(event){
			this.cleanError();
		}));
		this.pluginCombo.bind("error.input", context(this).callback(function(event, errorCode){
			if(this.pluginCombo.is(':hidden')){
				if (this.getParent() instanceof jsFieldSetClientView) {
					if (this.getParent().options && this.getParent().options.collapsed) {
						this.getParent().toggleSlider(0);
					}
				}
			}
			if(isInputIntoView(this.pluginCombo)){
				this.pluginCombo.find(".select").css('height', this.pluginCombo.find(".field").parent().height());
				var $input = this.pluginCombo.find("input");
				var $arrow = this.pluginCombo.find(".arrow");
				var $icon = this.pluginCombo.find(".icon");
				var $iconReset = this.pluginCombo.find(".iconReset");
				var arrowLeft = $arrow.css('left');
				var iconLeft = $icon.css('left');
				$arrow.css({
					'left': $input.width() + 4,
					'position': 'absolute'
				});
				$icon.css({
					'left': $input.width() + 30,
					'position': 'absolute'
				});
				$iconReset.css({
					'left': $input.width() + 30,
					'position': 'absolute'
				});
				$input.css({
					'left': $input.position().left,
					'top':  $input.position().top,
					'position': 'absolute'
				}).effect("bounce", { times:3, direction:'left', distance:8 }, 300, context(this).callback(function(){
					$arrow.css({
						'left': arrowLeft,
						'position': 'relative'
					});
					$icon.css({
						'left': iconLeft,
						'position': 'relative'
					});
					$iconReset.css({
						'left': iconLeft,
						'position': 'relative'
					});
					$input.css({
						'left': '',
						'top': '',
						'position': 'static'
					});
					this.pluginEdit.setError(errorCode);
				}));
			}
			else{
				scrollToVisible(this.pluginCombo);
				this.pluginEdit.setError(errorCode);
			}
		}));
	}
}
extend(jsComboView, jsCSideView);

function jsMACComboView(ctrl, viewInx, options){
	jsMACComboView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.disable = function(){
		this.pluginEdit.disable();
		if(this.ctrl.clone){
			this.pluginEdit.find(".icon").hide();
			this.pluginEdit.find(".iconReset").hide();
		}
	}
	
	
	this.enable = function(){
		this.pluginEdit.enable();
		if(this.ctrl.clone){
			this.pluginEdit.find(".icon").show();
			this.pluginEdit.find(".iconReset").show();
		}
	}

	this.drawView = function(){
		jsMACComboView.superclass.drawView.call(this);

		var options = this.options;
		this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {inputPadding: options.inputPadding, mandatory: options.mandatory});

		if(options.summary){
			this.pluginCombo = this.pluginEdit.find(".input").lightUIStatic();
		}
		else{
			var header = [
					{index: "mac", name: "MAC"}
				,	{index: "ip", name: "IP"}
				,	{index: "host", name: "Host"}
			];
			this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {combobox: {type: "mac", index: "mac", flags: {mandatory: options.mandatory}}});
			this.pluginCombo.fieldval(this.ctrl.model.value);
			var LANClients = this.ctrl.LANClients;
			var $row;
			var obj;
			for(var i in LANClients){
				obj = LANClients[i];
				$row = this.pluginCombo.addRow().row("last");
				$row.col("mac").html(obj.mac);
				$row.col("ip").html(obj.ip);
				$row.col("host").html(obj.hostname);
			}
			
			this.bindEvents();
			
			if(this.ctrl.clone){

				this.pluginCombo.find(".iconReset").css("display", "block");
				var LANClients = this.ctrl.LANClients;
				var userIP = getCookie("user_ip");
				if(is.string(userIP)){
					for(var i in LANClients){
						var isCorrectIp = false;
						var pos_of_slash = -1;					
						pos_of_slash = LANClients[i].ip.indexOf("/");
						if (pos_of_slash > -1){
							isCorrectIp = (LANClients[i].ip.indexOf(userIP)>-1);
						}
						else{
							userIP = userIP.replace(/\[/, '');
							userIP = userIP.replace(/\::ffff:/, '');
							userIP = userIP.replace(/\]/, '');
							isCorrectIp = (LANClients[i].ip == userIP);
						}
						if(isCorrectIp){
							this.ctrl.userMAC = LANClients[i].mac;
							break;
						}
						
					}
				}

				this.pluginCombo.bind("iconclick.grid", context(this).callback(function(){
					var userMAC = this.ctrl.userMAC;
					if(is.string(userMAC)){
						window.hasChanges = true;
						this.pluginCombo.fieldval(userMAC).find("input").blur();
					}
				})).find(".icon").attr("title", lng("cloneMACTip"));

				this.pluginCombo.bind("iconResetclick.grid", context(this).callback(function(){
					var defaultMAC = this.ctrl.devicemac;
					if(is.string(defaultMAC)){
						window.hasChanges = true;
						this.pluginCombo.fieldval(defaultMAC).find("input").blur();
					}
				})).find(".iconReset").attr("title", lng("cloneMACReset"));
			}
			else{
				this.pluginCombo.find(".icon").css("display", "none");
				this.pluginCombo.find(".iconReset").css("display", "none");
			}
		}
		
	}
}
extend(jsMACComboView, jsComboView);


function jsIPComboController(addr, LANClients, version){
	jsIPComboController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsIPComboView, options:{}};
	this.changeModel(new jsComboModel(addr));
	this.version = version;
	this.LANClients = LANClients;
	
	this.setVersion = function(version){
		this.version = version;
	}

}
extend(jsIPComboController, jsController);


function jsIPComboView(ctrl, viewInx, options){
	jsIPComboView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		jsIPComboView.superclass.drawView.call(this);

		var options = this.options;
		var version = this.ctrl.version;
		this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {inputPadding: options.inputPadding, mandatory: options.mandatory});

		if(options.summary){
			this.pluginCombo = this.pluginEdit.find(".input").lightUIStatic();
		}
		else{
			var header = [
					{index: "ip", name: "IP"}
				,	{index: "mac", name: "MAC"}
				,	{index: "host", name: "Host"}
			];
			if(version && version == 6){
				this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {combobox: {type: "ipv6", index: "ip", flags: {mandatory: options.mandatory}}});
			}
			else{
				this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {combobox: {type: "ipv4", index: "ip", flags: {mandatory: options.mandatory}}});
			}
			this.pluginCombo.fieldval(this.ctrl.model.value);
			var LANClients = this.ctrl.LANClients;
			var $row;
			var obj;
			for(var i in LANClients){
				obj = LANClients[i];
				$row = this.pluginCombo.addRow().row("last");
				$row.col("mac").html(obj.mac);
				$row.col("ip").html(obj.ip);
				$row.col("host").html(obj.hostname);
			}
	
			this.pluginCombo.find(".icon").css("display", "none");
			this.pluginCombo.find(".iconReset").css("display", "none");
			this.bindEvents();
		}
	}
}
extend(jsIPComboView, jsComboView);



function jsMACRuleController(LANClients){
	jsMACRuleController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsMACRuleView, options:{}};
	this.LANClients = LANClients;
	
}
extend(jsMACRuleController, jsController);

function jsMACRuleView(ctrl, viewInx, options){
	jsMACRuleView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		jsMACRuleView.superclass.drawView.call(this);

		var options = this.options;
		this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {inputPadding: options.inputPadding});

		var header = [
				{index: "ip", name: "IP"}
			,	{index: "mac", name: "MAC"}
			,	{index: "host", name: "Host"}
		];

		this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {combobox: {type: "text", blank: "dhcpMacClientsSel2", flags: {size: lng("dhcpMacClientsSel2").length+4}}});
		this.pluginCombo.find(".icon").css("display", "none");
		this.pluginCombo.find(".iconReset").css("display", "none");
		this.pluginCombo.find("input").css({
			"width": "auto",
			"text-align": "left"
		});

		var LANClients = this.ctrl.LANClients;
		var $row;
		var obj;

		for(var i in LANClients){
			obj = LANClients[i];
			$row = this.pluginCombo.addRow().row("last");
			$row.col("mac").html(obj.MACAddress?obj.MACAddress:obj.mac);
			$row.col("ip").html(obj.ip);
			$row.col("host").html((obj.hostname != '*')?obj.hostname:'');
		}

		this.pluginCombo.bind("rowclick.grid", context(this).callback(function(event, $row){
			this.ctrl.event("ruleselect", $row, true);
		}));
	}
}
extend(jsMACRuleView, jsCSideView);










































function jsInputExModel(value){
	jsInputExModel.superclass.constructor.call(this);
	
	this.value = value;
	
	jsInputExModel.prototype.toString = function(){
		if (no(this.value)) {
			return  '';
		} else {
			return this.value;
		}
	}
}
extend(jsInputExModel, jsModel);



function jsInputExController(value){
	jsInputExController.superclass.constructor.call(this);
	
	this.ifaceTypes.switcher = {type: jsSwitcherClientView};
	this.ifaceTypes.progresser = {type: jsProgresserClientView};
	this.ifaceTypes.lister = {type: jsListerClientView};
	this.ifaceTypes.buttoner = {type: jsButtonerClientView};
	this.ifaceTypes.inputer = {type: jsInputerClientView};
	this.ifaceTypes.texter = {type: jsTexterClientView, def: true};
	this.ifaceTypes.textboxer = {type: jsTextboxerClientView};
	this.changeModel(new jsInputExModel(value));
}
extend(jsInputExController, jsController);



function jsSwitcherClientView(ctrl, viewInx, options){
	jsSwitcherClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsSwitcherClientView.prototype.drawView = function(){
		jsSwitcherClientView.superclass.drawView.call(this);

		var htmlToDraw;
		var value = this.ctrl.model.value;		
		var options = this.options;
		var uid = getUID();
		
		this.myBoxSel = '#switcher' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw		=	"<div class='switcher normal unselectable' id='switcher" + uid + "'>";
		htmlToDraw		+=	"<div class='slider'></div>";
		htmlToDraw		+=	"<div class='text' unselectable='on'></div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		
		if (!no(options.widgetStyle)) {
			$(this.myBoxSel).addClass('widgetStyle');
		}
		
		if (!no(options.title)) {
			$(this.myBoxSel).attr('title', lng(options.title));
		}
		
		this.updateView();
		
		$(this.myBoxSel).bind("click", context(this).callback(this.onslide));
		if(options.disabled) this.disable();
	}
	
	this.onslide = function() {
		if ($(this.myBoxSel).is('.disable')) return ;
		var slider = $(this.myBoxSel+'>.slider');
		var text = $(this.myBoxSel+'>.text');
		var on;
		var off;
		
		if ($(slider).is('.on')) {
			off = $(text).html();
			on = $(slider).html();
			$(slider).removeClass('on');
			$(slider).addClass('off');
			$(slider).html(off);
			$(text).html(on);
		} else {
			on = $(text).html();
			off = $(slider).html();
			$(slider).removeClass('off');
			$(slider).addClass('on');
			$(slider).html(on);
			$(text).html(off);
		}
		this.ctrl.event("fieldchange", {view:this, value:this.getValue()}, true);
		return false;
	}
	
	this.disable = function() {
		this.options.disabled = true;
		$(this.myBoxSel).removeClass('normal').addClass('disable');
	}
	
	this.enable = function() {
		this.options.disabled = false;
		$(this.myBoxSel).removeClass('disable').addClass('normal');
	}
	
	this.getValue = function() {
		if ($(this.myBoxSel+'>.slider').is('.on')){
			return options.valset.on;
		} else {
			return options.valset.off;
		}
	}
	
	this.updateModel = function(){
		this.ctrl.model.value = this.getValue();
		return jsSwitcherClientView.superclass.updateModel.call(this);
	}
	
	this.updateView = function(){
		var value = this.ctrl.model.value;		
		var options = this.options;
		var on;
		var off;
		var align;
		var n;
		var slider = $(this.myBoxSel+'>.slider');
		var text = $(this.myBoxSel+'>.text');

		off = options.short_off?lng(options.short_off):lng('short_off');
		on = options.short_on?lng(options.short_on):lng('short_on');
		n = Math.abs(((on.length - off.length)/2).toFixed());
		align = "";
		for(var i=0; i<n; i++) align += "&nbsp;";
		if(on.length > off.length){
			if(n*2 + off.length > on.length) on = "&nbsp;" + on;
			off = align + off + align;
		}
		else{
			if(n*2 + on.length > off.length) off = "&nbsp;" + off;
			on = align + on + align;
		}
		off = "<tt>" + off + "</tt>";
		on = "<tt>" + on + "</tt>";
		
		if (value == options.valset.on) {
			$(slider).removeClass('off');
			$(slider).addClass('on');
			$(slider).html(off);
			$(text).html(on);
		} else {
			$(slider).removeClass('on');
			$(slider).addClass('off');
			$(slider).html(on);
			$(text).html(off);
		}

		jsSwitcherClientView.superclass.updateView.call(this);
	}
	
}
extend(jsSwitcherClientView, jsCSideView);



function jsProgresserClientView(ctrl, viewInx, options){
	jsProgresserClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsProgresserClientView.prototype.drawView = function(){
		this.stopWait();
		jsProgresserClientView.superclass.drawView.call(this);
		
		var htmlToDraw;
		var value = (this.ctrl.model.value == '')?'0':this.ctrl.model.value;
		var options = this.options;
		var uid = getUID();
		
		this.isWaitStyle = !no(options.waitStyle);
		this.myBoxSel = '#progresser' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw		=	"<div class='progresser unselectable' id='progresser" + uid + "'>";
		htmlToDraw		+=	"<div class='underHeadway'></div>";
		htmlToDraw		+=	"<div class='headway'></div>";
		htmlToDraw		+=	"<div class='percent'></div>";
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		$(this.myBoxSel+'>.underHeadway').css('opacity', '0.2');
		
		if (this.isWaitStyle) {
			$(this.myBoxSel).addClass('waitStyle');
			$(this.myBoxSel+'>.percent').text(lng(options.waitTitle));
		} else {
			this.setProgress(value);
		}
	}
	
	this.updateModel = function(){
		return false;
	}
	
	this.updateView = function(){
		return false;
	}
	
	this.headwayBounce = function() {
		if (this.isWaiting) {
			var	pos = 0;
			var progresser = $(this.myBoxSel);
			var headway = $(this.myBoxSel+'>.headway');
			var headwayBounce = context(this).callback(this.headwayBounce);
			
			if ($(headway).position().left == 0) {
				pos = $(progresser).width() - $(headway).width();
			}		
			pos += "px";
			$(headway).animate({
				'left': pos
			}, 500, function(){
				headwayBounce();
			});
		}
	}
	
	this.startWait = function(waitTitle) {
		if (!no(waitTitle)) {
				$(this.myBoxSel+'>.percent').text(waitTitle);
			}
		if (this.isWaitStyle) {
			this.isWaiting = true;
			$(this.myBoxSel+'>.headway').css({
				'width': (0.3*$(this.myBoxSel).width()) + 'px',
				'left': '0px'
			});
			this.headwayBounce();
		}
		$(this.myBoxSel+'>.underHeadway').css({
			'width': '0%'
		});
	}
	
	this.stopWait = function() {
		this.isWaiting = false;
	}
	
	this.getProgress = function(){
		if (!this.isWaitStyle) {
			return this.ctrl.model.value;
		}
	}
	
	this.setProgress = function(value){	/* updateModel+updateView */
		if (!this.isWaitStyle) {
			this.ctrl.model.value = value;
			$(this.myBoxSel+'>.headway').css('width', value+'%');
			$(this.myBoxSel+'>.percent').text(value+'%');
		}
	}
	
	/*this.setUnderProgress = function(value){
		$(this.myBoxSel+'>.underHeadway').css('width', value+'%');
	}
	
	this.getUnderProgress = function(){
		return parseInt($(this.myBoxSel+'>.underHeadway').css('width'));
	}*/
	
	this.isWaiting = false;
}
extend(jsProgresserClientView, jsCSideView);



function jsListerClientView(ctrl, viewInx, options){
	jsListerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.selectItem = function(elem) {
		//$(this.childBoxSel+'>div.item').removeClass('selected');
		$(this.childBoxSel+'>div.item:eq(' + this.currentIndex + ')').removeClass('selected');
		$(elem.currentTarget).addClass('selected');
		this.currentIndex = $(elem.currentTarget).index();
	}
	
	this.fastSelectItem = function(elem) {
		this.selectItem(elem);
		this.getParent().ctrl.event('doubleclick', this.getChild(this.currentIndex));
	}

	jsListerClientView.prototype.drawView = function(){		
		var htmlToDraw;
		var value = this.ctrl.model.value;		
		var options = this.options;
		var uid = getUID();
		var children = this.ctrl.children;
		var child;
		
		this.myBoxSel = '#lister' + uid;
		this.viewBoxSel = options.viewBoxSel;
		this.childBoxSel = this.myBoxSel+'>.list';
		
		htmlToDraw		=	"<div class='lister' id='lister" + uid + "'>";
		htmlToDraw		+=	"<div class='caption unselectable'>";
		htmlToDraw		+=	"<div class='title'>" + lng(options.humanName) + "</div>";
		htmlToDraw		+=	"<div class='tip'></div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='list'>";
		
		for (var i = 0; i < children.length; i++) {
			htmlToDraw		+=	"<div class='item'></div>";
			child = this.getChild(i);
			child.options.viewBoxSel = this.childBoxSel+">div.item:eq(" + i + ")";
			child.viewBoxSel = child.options.viewBoxSel;
			if (child.ctrl.model.value == value) {
				this.currentIndex = i;
			}
		}
		
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='info unselectable'>.: " + children.length + " :.</div>";
		htmlToDraw		+=	"<div class='overlay'></div>";
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		if(options.disabled) this.disable();
		
		if (!no(options.height)) {
			$(this.myBoxSel+'>.list').css('height', options.height);
		}
		if (!no(options.width)) {
			$(this.myBoxSel+'>.list').css('width', options.width);
		}
		
		jsListerClientView.superclass.drawView.call(this);
		
		$(this.childBoxSel+'>div.item').click(context(this).callback(this.selectItem));
		$(this.childBoxSel+'>div.item').dblclick(context(this).callback(this.fastSelectItem));
		$(this.childBoxSel+'>div.item:eq(' + this.currentIndex +')').click();
	}
	
	this.disable = function() {
		$(this.myBoxSel+'>.overlay').fadeTo(200, 0.2)
	}
	
	this.enable = function() {
		$(this.myBoxSel+'>.overlay').fadeTo(600, 0, function(){
			$(this).hide();
		});
	}
	
	this.updateModel = function(){
		var child = this.getChild(this.currentIndex);
		this.ctrl.model.value = child.ctrl.model.value;
		return jsListerClientView.superclass.updateModel.call(this);
	}
	
	this.updateView = function(){
		var value = this.ctrl.model.value;
		var children = this.ctrl.children;
		var child;
		this.currentIndex = 0;
		
		for (var i = 0; i < children.length; i++) {
			child = this.getChild(i);
			if (child.ctrl.model.value == value) {
				this.currentIndex = i;
			}
		}
		$(this.childBoxSel+'>div.item:eq(' + this.currentIndex +')').click();
		jsListerClientView.superclass.updateView.call(this);
	}
	
	this.currentIndex = 0;
}
extend(jsListerClientView, jsCSideView);




function jsButtonerClientView(ctrl, viewInx, options){
	jsButtonerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.click = function() {
		if (!$(this.myBoxSel).is('.disable')) {
			this.getParent().ctrl.event('click', this);
		}
	}

	jsButtonerClientView.prototype.drawView = function(){		
		var htmlToDraw;	
		var options = this.options;
		var uid = getUID();
		
		this.myBoxSel = '#buttoner' + uid;
		this.viewBoxSel = options.viewBoxSel;
			
		htmlToDraw		=	"<div class='buttoner normal unselectable' id='buttoner" + uid + "'>";
		
		if (!no(options.icon)) {
			htmlToDraw		+=	"<div class='icon'>";
			htmlToDraw		+=	"<img src='" + options.icon + "' />";
			htmlToDraw		+=	"</div>";
		}
		
		htmlToDraw		+=	"<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		if(options.disabled) this.disable();
		
		if (!no(options.iconRightSide)) {
			$(this.myBoxSel+'>.icon').css('float', 'right');
		}
		$(this.myBoxSel).mouseenter(function(){
			$(this).not('.disable').addClass('hover');
		}).mouseleave(function(){
			$(this).not('.disable').removeClass('hover');
		}).mousedown(function(){
			$(this).not('.disable').addClass('push');
		}).mouseup(function(){
			$(this).not('.disable').removeClass('push');
		}).click(context(this).callback(this.click));	
		
		jsButtonerClientView.superclass.drawView.call(this);
	}
	
	jsButtonerClientView.prototype.disable = function(){
		$(this.myBoxSel).removeClass('normal push').addClass('disable');
	}
	
	jsButtonerClientView.prototype.enable = function(){
		$(this.myBoxSel).removeClass('disable').addClass('normal');
	}
	
	this.changeTitle = function(humanName) {
		$(this.myBoxSel+'>.title').text(lng(humanName));
	}
	
	this.updateModel = function(){
		return false;
	}
	
	this.updateView = function(){
		return false;
	}
}
extend(jsButtonerClientView, jsCSideView);


function jsInputerClientView(ctrl, viewInx, options){
	jsInputerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsInputerClientView.prototype.drawView = function(){
		jsInputerClientView.superclass.drawView.call(this);
		
		var htmlToDraw;
		var value = no(this.ctrl.model.value)?'':this.ctrl.model.value;		
		var options = this.options;
		var uid = getUID();
		var type = (no(options.passwd))?'text':'password';
		var maxLength = (no(options.maxLength))?'':' maxlength="'+options.maxLength+'" ';
		
		this.myBoxSel = '#inputer' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw	= 	"<div class='inputer normal' id='inputer" + uid + "'>";
		htmlToDraw	+= 	"<div class='top unselectable'>";
		htmlToDraw	+= 	"<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>";
		htmlToDraw	+= 	"<div class='caps' unselectable='on'>[Caps Lock]</div>";
		htmlToDraw	+= 	"<div class='clear'></div>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"<div class='bottom'>";
		htmlToDraw	+= 	"<div class='data'>";
		htmlToDraw	+= 	"<input type='" + type + "' value='" + value + "'" + maxLength + "/>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"<div class='clear'></div>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		
		this.$controlSel = $(this.myBoxSel+' input');
		if(options.disabled) this.disable();
		
		$(this.$controlSel).bind('keypress', context(this).callback(this.checkCapsLock));
		$(this.myBoxSel+' .caps').bind('click', context(this).callback(this.switchCase));
	}
	
	this.checkCapsLock = function(e) {
		var c = String.fromCharCode(e.which);
		var isShiftKey = e.shiftKey;
		var isCapsLock = false;
		
		if (c.toLowerCase() != c.toUpperCase()) {
			if ((c.toUpperCase() == c && !isShiftKey) || (c.toLowerCase() == c && isShiftKey)) {
				isCapsLock = true;
			}
			var caps = $(this.myBoxSel+' .caps');
			if (isCapsLock) {
				$(caps).fadeIn('fast');
			} else {
				$(caps).fadeOut('fast');
			}
		}
		return true;
	}
	
	this.switchCase = function(e) {
		var text = $(this.$controlSel).val();
		var newText = '';
		
		for (var i = 0; i < text.length; i++) {
			if (text[i].toLowerCase() == text[i]) {
				newText += text[i].toUpperCase();
			} else {
				newText += text[i].toLowerCase();
			}
		}
		$(this.$controlSel).val(newText);
	}
	
	this.disable = function() {
		$(this.$controlSel).attr('disabled', 'disabled');
	}
	
	this.enable = function() {
		$(this.$controlSel).attr('disabled', null);
	}
	
	this.updateModel = function(){
		this.ctrl.model.value = this.$controlSel.val();
		return jsInputerClientView.superclass.updateModel.call(this);
	}
	
	this.updateView = function(){
		if (this.$controlSel) {
			var value = this.ctrl.model.value;
			this.$controlSel.val(no(value)?'':value);
		}
		jsInputerClientView.superclass.updateView.call(this);
	}
	
}
extend(jsInputerClientView, jsCSideView);


function jsTexterClientView(ctrl, viewInx, options){
	jsTexterClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsTexterClientView.prototype.drawView = function(){
		jsTexterClientView.superclass.drawView.call(this);
		
		var htmlToDraw;
		var value = no(this.ctrl.model.value)?'':this.ctrl.model.value;		
		var options = this.options;
		var uid = getUID();
		
		this.myBoxSel = '#texter' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw	= 	"<div class='texter unselectable' id='texter" + uid + "'>";
		htmlToDraw	+= 	"<span>" + lng(options.humanName) + "</span>";
		htmlToDraw	+= 	"<span class='somethingValue'>" + lng(value) + "</span>";
		htmlToDraw	+= 	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		this.$controlSel = $(this.myBoxSel+'>span.somethingValue');
		if (value == '') {
			$(this.$controlSel).hide();
		}
	}
	
	this.updateModel = function(){		
		//return jsTexterClientView.superclass.updateModel.call(this);
	}
	
	this.updateView = function(){
		if (this.$controlSel) {
			var value = this.ctrl.model.value;
			this.$controlSel.html(no(value)?'':value);
			if (value == '') {
				$(this.$controlSel).hide();
			} else {
				$(this.$controlSel).show();
			}
		}
		jsTexterClientView.superclass.updateView.call(this);
	}
	
}
extend(jsTexterClientView, jsCSideView);


function jsTextboxerClientView(ctrl, viewInx, options){
	jsTextboxerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsTextboxerClientView.prototype.drawView = function(){
		jsTextboxerClientView.superclass.drawView.call(this);
		
		var htmlToDraw;
		var value = no(this.ctrl.model.value)?'':this.ctrl.model.value;		
		var options = this.options;
		var uid = getUID();
		
		this.myBoxSel = '#textboxer' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw	=	"<div class='textboxer normal' id='textboxer" + uid + "'>";
		htmlToDraw	+= 	"<div class='top unselected'>";
		htmlToDraw	+= 	"<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>";
		htmlToDraw	+= 	"<div class='clear'></div>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"<div class='bottom'>";
		htmlToDraw	+= 	"<div class='data'>";
		htmlToDraw	+= 	"<textarea rows='3'>" + value + "</textarea>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"<div class='clear'></div>";
		htmlToDraw	+= 	"</div>";
		htmlToDraw	+= 	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		
		this.$controlSel = $(this.myBoxSel+' textarea');
		if(options.disabled) this.disable();
	}
	
	this.disable = function() {
		$(this.$controlSel).attr('disabled', 'disabled');
	}
	
	this.enable = function() {
		$(this.$controlSel).attr('disabled', null);
	}
	
	this.updateModel = function(){
		this.ctrl.model.value = this.$controlSel.val();
		return jsTextboxerClientView.superclass.updateModel.call(this);
	}
	
	this.updateView = function(){
		if (this.$controlSel) {
			var value = this.ctrl.model.value;
			this.$controlSel.val(no(value)?'':value);
		}
		jsTextboxerClientView.superclass.updateView.call(this);
	}
	
}
extend(jsTextboxerClientView, jsCSideView);






















 /**Создаёт новый экземпляр класса jsATMsettingsModel.
 * @class						Модель настроек АТМ.
 * @param	{Object}	ifnode	Узел интерфейса.	
 * @constructor
 */
 
function jsATMSettingsModel(ifnode) {
	jsATMSettingsModel.superclass.constructor.call(this);

	/**Узел L2 интерфейса.
	 * @type	Object
	 */
	this.ifnode = ifnode;

	/**Дерево интерфейсов.
	 * Устанавливается из вне чтобы не плодить аргументы конструктора.
	 * @type	Object
	 */
	this.iftree = null;
	
}
extend(jsATMSettingsModel, jsModel);


 
function jsATMSettingsController(ifnode, isadding) {
	 jsATMSettingsController.superclass.constructor.call(this);
	 
	this.changeModel(new jsATMSettingsModel(ifnode));

	this.ifaceTypes.client = {type: jsATMSettingsClientView, def:true};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsATMSettingsSummaryView};
	this.ifaceTypes.summary.options = {};
	 
	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.vpi:0), "vpi");
	this.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.vci:0), "vci");
	//Запихиваем часть настроек под слайдер
	var advanced = this.addChild(new jsFieldSetController(), "advanced");
	advanced.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.encap:0), "encap");
	advanced.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.qos:0), "qos");
	var qos = advanced.addChild(new jsFieldSetController(), "divQos");
	qos.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.pcr:0), "pcr");
	qos.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.scr:0), "scr");
	qos.addChild(new jsInputController(ifnode.pvc_settings?ifnode.pvc_settings.mbs:0), "mbs");

	/**Признак добавление нового соединения.
	 * @type	bool
	 */
	this.isadding = isadding;
}
extend(jsATMSettingsController, jsController);



function jsATMSettingsClientView(ctrl, viewInx, options) {

	/**Обновить модель.
	 * Правит поля, касающиеся ATM, в model.ifnode.
	 * Так как ifnode это ссылка, то правится один и тот же узел во всех контролах.
	 */
	this.updateModel = function(){
		var vpi = this.getChild("vpi");
		var vci = this.getChild("vci");
		vpi.statusCode = null;
		vci.statusCode = null;
		var res = jsATMSettingsClientView.superclass.updateModel.call(this);
		if(res){
			var ifnode = this.ctrl.model.ifnode;
			var advanced = this.getChild("advanced");
			var pvcSettings;
			ifnode.pvc_settings.vpi = vpi.ctrl.model.value;
			ifnode.pvc_settings.vci = vci.ctrl.model.value;
			ifnode.pvc_settings.encap = advanced.getChild("encap").ctrl.model.value;
			ifnode.pvc_settings.qos = advanced.getChild("qos").ctrl.model.value;
			var divQos = advanced.getChild("divQos");
			
			var pcr = divQos.getChild("pcr").ctrl.model.value;
			var scr = divQos.getChild("scr").ctrl.model.value;
			var mbs = divQos.getChild("mbs").ctrl.model.value;

			switch(ifnode.pvc_settings.qos){
				case "ubr_pcr":
				case "cbr":
					ifnode.pvc_settings.pcr = pcr;
				break;
				case "nrtvbr":
				case "rtvbr":
					ifnode.pvc_settings.pcr = pcr;
					ifnode.pvc_settings.scr = scr;
					ifnode.pvc_settings.mbs = mbs;
				break;
			}
			
			if(this.ctrl.isadding && ifnode.ifname == "create"){
				var iftree = this.ctrl.model.iftree;
				for(var i in iftree){
					if(iftree[i].type == "atm"){
						pvcSettings = iftree[i].pvc_settings;
						if(pvcSettings.vpi == vpi.ctrl.model.value && pvcSettings.vci == vci.ctrl.model.value){
							vpi.statusCode = "wanPvcBusy";
							vci.statusCode = "wanPvcBusy";
							res = false;
							break;
						}
					}
				}
			}
		}
		vpi.setError();
		vci.setError();
		return res;
	}
	
	this.onportchange = function(value){
		if(value == "create"){
			this.getChild("vpi").enable();
			this.getChild("vci").enable();
		}
		else{
			this.getChild("vpi").disable();
			this.getChild("vci").disable();
		}
		return false;
	}

	/**Обработчик события изменения полей.
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;
		switch(alias){
			case "qos":
				var divQos = this.getChild("advanced", "divQos");
				switch(obj.value){
					case "ubr":
						divQos.getChild("pcr").hide();
						divQos.getChild("scr").hide();
						divQos.getChild("mbs").hide();
					break;
					case "ubr_pcr":
						divQos.getChild("pcr").show();
						divQos.getChild("scr").hide();
						divQos.getChild("mbs").hide();
					break;
					case "cbr":
						divQos.getChild("pcr").show();
						divQos.getChild("scr").hide();
						divQos.getChild("mbs").hide();
					break;
					case "nrtvbr":
						divQos.getChild("pcr").show();
						divQos.getChild("scr").show();
						divQos.getChild("mbs").show();
					break;
					case "rtvbr":
						divQos.getChild("pcr").show();
						divQos.getChild("scr").show();
						divQos.getChild("mbs").show();
					break;
				}
			break;
			case "vpi":
			case "vci":
				var vpi = this.getChild("vpi");
				var vci = this.getChild("vci");
				vpi.updateModel()
				vci.updateModel()
				var pvcSettings = this.ctrl.model.ifnode.pvc_settings;
				pvcSettings.vpi = vpi.ctrl.model.value;
				pvcSettings.vci = vci.ctrl.model.value;
			break;
		}
		return true;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.getChild("advanced").hide();
			this.getChild("desc").hide();
		}
		else{
			//подробно
			this.getChild("advanced").show();
			this.getChild("desc").show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsATMSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
	}
	
	var obj;
	var opt;
	var ifnode = ctrl.model.ifnode;
	
	options.disabled = !ctrl.isadding;

	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "ATM"
	};
	obj.ifaceTypes.separator.options.hide = ifnode.blocks;
	
	obj = ctrl.getChild("vpi");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanVpi",
		minval: 0,
		maxval: 255
	};
	opt = obj.ifaceTypes.number.options;
	opt.disabled = !ctrl.isadding || ifnode.ifname != "create";
	
	
	obj = ctrl.getChild("vci");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanVci",
		minval: 0,
		maxval: 65535
	};
	opt = obj.ifaceTypes.number.options;
	opt.disabled = !ctrl.isadding || ifnode.ifname != "create";
	
	var advanced = ctrl.getChild("advanced");
	advanced.nextIface = "client";
	
	obj = advanced.getChild("encap");
	obj.nextIface = "select";
	obj.ifaceTypes.select.options = {
		humanName: "wanEncap",
		valset: {LLC:"llc", VC:"vcmux"}
	};

	obj = advanced.getChild("qos");
	obj.nextIface = "select";
	obj.ifaceTypes.select.options = {
		humanName: "wanQos",
		valset: {UBR:"ubr", "UBR with PCR":"ubr_pcr", "CBR":"cbr", "Non Realtime VBR":"nrtvbr", "Realtime VBR":"rtvbr"}
	};
	var qos = obj.model.value;


	var divQos = advanced.getChild("divQos");
	divQos.nextIface = "client";
	divQos.ifaceTypes.client.options = {nothing: true, slider: false};

	obj = divQos.getChild("pcr");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanPcr",
		minval: 1,
		maxval: 255000
	};
	obj.ifaceTypes.number.options.hide = (qos == "ubr");

	obj = divQos.getChild("scr");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanScr",
		minval: 1,
		maxval: 255000
	};
	obj.ifaceTypes.number.options.hide = (qos == "ubr" || qos == "ubr_pcr" || qos == "cbr");

	obj = divQos.getChild("mbs");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanMbs",
		minval: 1,
		maxval: 1000000
	};
	obj.ifaceTypes.number.options.hide = (qos == "ubr" || qos == "ubr_pcr" || qos == "cbr");	
	
	this.brief = ifnode.wizard;
	
	jsATMSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("fieldchange", this.onfieldchange);
	this.bind("portchange", this.onportchange);
	this.bind("modeswitch", this.onmodeswitch);
}
extend(jsATMSettingsClientView, jsFieldSetClientView);


function jsATMSettingsSummaryView(ctrl, viewInx, options){
	jsATMSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		this.getChild("advanced", "encap").options.hide = true;
		this.getChild("advanced").options.slider = false;
		jsATMSettingsSummaryView.superclass.drawView.call(this);
	}

	this.bind("modeswitch", function(){return false;});
}
extend(jsATMSettingsSummaryView, jsATMSettingsClientView);





















var is_not_avail_hooking = false;

function device_not_avail(avail){
	if (!avail) {
		device.lock(true);
		if (window.SAVEME) SAVEME.lock();
		$("body").errorBlock(
			lng("notAvailTitle"),
			lng("notAvailDesc"),
			"",
			lng("refresh"), 
			function(){
				location.reload(true)
			}
		);
	}
}

$(window).bind({
	'beforeunload': function(){
		device.unhook(device.signal.AVAILABLE, device_not_avail);
		is_not_avail_hooking = false;
	}
});

device.hook(device.signal.PROCESS, function(status){
	if (status && !is_not_avail_hooking) {
		is_not_avail_hooking = true;
		device.hook(device.signal.AVAILABLE, device_not_avail);
	}
});

var rebootCmdList = [ 6
					,  8
					,  9
					,  10
					,  11];
function checkInRebootCmdList(id){
	for(var i=0; i<rebootCmdList.length; i++){
		if(id == rebootCmdList[i]) return true;
	}
	return false;
}

var rebootConfigList = []
	rebootConfigList.push( 178);
function checkInRebootConfigList(id){
	for(var i=0; i<rebootConfigList.length; i++){
		if(id == rebootConfigList[i]) return true;
	}
	return false;
}

$.ajaxPrefilter( function( options ) {
	var data = options.data;
	if(is.string(data)){
		var arr = data.match(/res_cmd\d*=\d+/g);
		if(is.array(arr)){
			for(var i=0; i<arr.length; i++){
				arr[i] = arr[i].replace(/res_cmd\d*=/, "");
				if(checkInRebootCmdList(arr[i])){
					device.unhook(device.signal.AVAILABLE, device_not_avail);
					return;
				}
			}
		}
		var arr = data.match(/res_config_id\d*=\d+/g);
		if(is.array(arr)){
			for(var i=0; i<arr.length; i++){
				arr[i] = arr[i].replace(/res_config_id\d*=/, "");
				if(checkInRebootConfigList(arr[i])){
					device.unhook(device.signal.AVAILABLE, device_not_avail);
					return;
				}
			}
		}
	}
});






















 
 /**Создаёт новый экземпляр класса jsBCMVlanSettingsModel.
 * @class			Секция "разное" настроек соединения.
 * @constructor
 */
function jsBCMVlanSettingsModel(service) {
	jsBCMVlanSettingsModel.superclass.constructor.call(this);

	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;
}
extend(jsBCMVlanSettingsModel, jsModel);


function jsBCMVlanSettingsController(service, isadding) {
	jsBCMVlanSettingsController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsBCMVlanSettingsClientView};
	this.ifaceTypes.client.options = {};

	this.changeModel(new jsBCMVlanSettingsModel(service));

	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(service.vlan.usempvc), "usempvc");
	this.addChild(new jsInputController(service.vlan.usevlan), "usevlan");
	this.addChild(new jsInputController(service.vlan.vlanid), "vlanid");
	this.addChild(new jsInputController(service.vlan.vlanpr), "vlanpr");


	/**Признак добавление нового соединения.
	 * @type	bool
	 */
	this.isadding = isadding;
}
extend(jsBCMVlanSettingsController, jsFieldSetController);


function jsBCMVlanSettingsClientView(ctrl, viewInx, options) {
	var obj;
	var service = ctrl.model.service;
	var opt;
	
	if (!service.vlan) service.vlan = {};

	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "VLAN"
	};
	obj.ifaceTypes.separator.options.hide = service.blocks;

	obj = ctrl.getChild("usempvc");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanUseMultiPVC",
		valset: {on:true, off:false}
	};
	opt = obj.ifaceTypes.checkbox.options;
	opt.disabled = !ctrl.isadding || service.vlan.usempvcro;


	obj = ctrl.getChild("usevlan");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanUseVlan",
		valset: {on:true, off:false}
	};
	var usevlan = obj.model.value;
	opt = obj.ifaceTypes.checkbox.options;
	opt.disabled = !ctrl.isadding || service.vlan.usevlanro;
	
	obj = ctrl.getChild("vlanpr");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanVlanPr",
		minval: -1,
		maxval: 7
	};
	opt = obj.ifaceTypes.number.options;
	opt.optional = true;
	opt.hide = !usevlan;

	obj = ctrl.getChild("vlanid");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanVlanId",
		minval: -1,
		maxval: 4095
	};
	opt = obj.ifaceTypes.number.options;
	opt.optional = true;
	opt.hide = !usevlan;
		
	this.updateModel = function(){
		var res = jsBCMVlanSettingsClientView.superclass.updateModel.call(this);
		if(res){
			var service = this.ctrl.model.service;
			if(service.vlan) delete service.vlan;
			if(this.getChild("usempvc").ctrl.model.value){
				service.vlan = {};
				if(this.getChild("usevlan").ctrl.model.value){
					service.vlan.vlanid = this.getChild("vlanid").ctrl.model.value;
					service.vlan.vlanpr = this.getChild("vlanpr").ctrl.model.value;
				}
			}
		}
		return res;
	}
	
	/**Обработка события "change" тега input события дочернего контроллера
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;	//индекс контроллера в массиве children

		switch(alias){
			case "usevlan":
				var usempvc = this.getChild("usempvc");
				usempvc.ctrl.model.value = true;
				usempvc.updateView();
				if(obj.value){
					usempvc.disable();
					this.getChild("vlanid").show();
					this.getChild("vlanpr").show();
				}
				else{
					if(!this.ctrl.model.service.vlan.usempvcro){
						usempvc.enable();
					}
					this.getChild("vlanid").hide();
					this.getChild("vlanpr").hide();
				}
			break;
		}
		return false;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.hide();
		}
		else{
			//подробно
			this.show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsBCMVlanSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
	}
	 
	this.brief = service.wizard;
	 
	
	jsBCMVlanSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("fieldchange", this.onfieldchange);
	this.bind("modeswitch", this.onmodeswitch);
}
extend(jsBCMVlanSettingsClientView, jsFieldSetClientView);
























function jsBubblerController(){
	jsBubblerController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsBubblerClientView, def: true};
}
extend(jsBubblerController, jsController);




function jsBubblerClientView(ctrl, viewInx, options){
	jsBubblerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsBubblerClientView.prototype.drawView = function(){
		var htmlToDraw = '';
		var options = this.options;
		var uid = getUID();
		var bubblerHtml = '';
		
		this.myBoxSel = '#bubbler' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		if (!no(options.content)) {
			bubblerHtml = options.content;
		}
		if (!no(options.flow)) {
			if (options.flow instanceof jsCSideView) {
				this.flowBoxSel = options.flow.viewBoxSel;
			} else {
				this.flowBoxSel = options.flow;
			}
		}
		if (!no(options.delay)) {
			this.timerDelay = options.delay;
		}
		if (!no(options.direction)) {
			this.direction = options.direction;
		}
		
		htmlToDraw		=	"<div class='bubbler' id='bubbler" + uid + "'>";
		htmlToDraw		+=	"<div class='bone'>";
		htmlToDraw		+=	"<div class='help unselectable' unselectable='on'>" + lng(bubblerHtml) + "</div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<img src='' class='arrow' />";
		htmlToDraw		+=	"</div>";
		
		$(this.viewBoxSel).html(htmlToDraw);
		
		if(!options.manual){
			$(this.flowBoxSel).mouseenter(context(this).callback(this.autoShow));
			$(this.myBoxSel).mouseenter(context(this).callback(this.stopHide));
		}
		$(this.flowBoxSel).mouseleave(context(this).callback(this.startHide));
		$(this.myBoxSel).mouseleave(context(this).callback(this.startHide));
		
		jsBubblerClientView.superclass.drawView.call(this);
	}
	
	this.startHide = function(delay) {
		this.timerID = setTimeout(context(this).callback(this.autoHide), this.timerDelay);
	}
	
	this.stopHide = function() {
		clearTimeout(this.timerID);
	}
	
	this.autoShow = function() {
		this.stopHide();
		
		var bubbler = $(this.myBoxSel);
		var arrow = $(bubbler).find('>.arrow');
		var flowElem = $(this.flowBoxSel);
		var bubblerShift = this.bubblerShift;
		var direction = this.direction;
		var L, T;
		
		function show(img, aL, aT, bL, bT, originL, originT) {
			var offsetL = $(bubbler).parent().position().left - $(bubbler).parent().offset().left;
			var offsetT = $(bubbler).parent().position().top - $(bubbler).parent().offset().top;
			
			$(arrow).css({
				'left': aL,
				'top': aT
			}).attr('src', img);
			
			$(bubbler).css({
				'left': bL + offsetL + 'px',
				'top': bT + offsetT + 'px'
			});
			
			$(bubbler).stop(false, true).animate({
				'left': originL + offsetL,
				'top': originT + offsetT,
				'opacity': 'show'
			}, 400);
		}
		
		switch (direction) {
			case 'right':
				L = $(flowElem).offset().left + $(flowElem).width() + $(arrow).width();
				T = $(flowElem).offset().top + ($(flowElem).height() - $(bubbler).height())/2;
				show('image/bubbler_arrow_right.png', 0 - $(arrow).width(), ($(bubbler).height() - $(arrow).height())/2, L - bubblerShift, T, L, T);
				break;
			case 'left':
				L = $(flowElem).offset().left - $(bubbler).width() - $(arrow).width();
				T = $(flowElem).offset().top + ($(flowElem).height() - $(bubbler).height())/2;
				show('image/bubbler_arrow_left.png', $(bubbler).width(), ($(bubbler).height() - $(arrow).height())/2, L + bubblerShift, T, L, T);
				break;
			case 'top':
				L = $(flowElem).offset().left + ($(flowElem).width() - $(bubbler).width())/2;
				T = $(flowElem).offset().top - $(bubbler).height() - $(arrow).height();
				show('image/bubbler_arrow_top.png', ($(bubbler).width() - $(arrow).width())/2, $(bubbler).height(), L, T + bubblerShift, L, T);	
				break;
			case 'bottom':
				L = $(flowElem).offset().left + ($(flowElem).width() - $(bubbler).width())/2;
				T = $(flowElem).offset().top + $(flowElem).height() + $(arrow).height();
				show('image/bubbler_arrow_bottom.png', ($(bubbler).width() - $(arrow).width())/2, 0 - $(arrow).height(), L, T - bubblerShift, L, T);
				break;
		}
	}
	
	this.autoHide = function() {
		var bubbler = $(this.myBoxSel);
		var bubblerShift = this.bubblerShift;
		var direction = this.direction;
					
		function hide(bL, bT) {
			var offsetL = $(bubbler).parent().position().left - $(bubbler).parent().offset().left;
			var offsetT = $(bubbler).parent().position().top - $(bubbler).parent().offset().top;
			
			$(bubbler).stop(false, true).animate({
				'left': bL + offsetL,
				'top': bT + offsetT,
				'opacity': 'hide'
			}, 400);
		}

					
		switch (direction) {
			case 'right':
				hide($(bubbler).offset().left + bubblerShift, '+=0');
				break;
			case 'left':
				hide($(bubbler).offset().left - bubblerShift, '+=0');
				break;
			case 'top':
				hide('+=0', $(bubbler).offset().top - bubblerShift);
				break;
			case 'bottom':
				hide('+=0', $(bubbler).offset().top + bubblerShift);
				break;
		}
	}
	
	this.bubblerShift = 20;
	this.flowBoxSel = null;
	this.direction = 'top';
	this.timerDelay = 0;
	this.timerID = null;
}
extend(jsBubblerClientView, jsCSideView);





















function jsCheckWANController(wan){
	jsCheckWANController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsCheckWANView, options:{}};
	this.ifaceTypes.server = {type: jsCheckWANServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};

	this.nextIface = "server";
	this.addIface();
	this.nextIface = "client";

	this.addChild(new jsInputController("google.com"), "host");
	this.addChild(new jsFieldSetController(), "out");
	
	this.getWAN = function(){
		var wan = this.wan;
		if(wan){
			if(wan.ifname){
				this.ifnode = this.iftree[wan.ifname];
			}
			else if(!no(wan.vpi) && !no(wan.vci)){
				var ifnode;
				for(var i in this.iftree){
					ifnode = this.iftree[i];
					if(ifnode.type == "atm"
						&& ifnode.pvc_settings.vpi == wan.vpi
						&& ifnode.pvc_settings.vci == wan.vci){
						this.ifnode = ifnode;						
						break;
					}
				}
			}
		}
		if(this.ifnode){
			this.service = null;
			this.tunnel = null;
			var services = this.ifnode.services;
			for(var i in services){
				if(services[i].name == wan.serviceName){
					this.service = services[i];
					this.event("settodelete", i,  true);
					if(wan.tunnelName){
						var tunnels = services[i].tunnels;
						for(var j in tunnels){
							if(tunnels[j].name == wan.tunnelName){
								this.tunnel = tunnels[j];
							}
						}
					}
					break;
				}
			}
			if(wan.serviceName2){
				for(var i in services){
					if(services[i].name == wan.serviceName2){
						this.service = services[i];
						this.event("settodelete", i,  true);
						break;
					}
				}
			}

		}

	}
	
	this.wan = wan;
	this.ifnode = null;
	this.service = null;
	this.tunnel = null;
	this.iftree = null;
	this.isCablePluged = null;
	this.ping = null;
}
extend(jsCheckWANController, jsController);

function jsCheckWANView(ctrl, viewInx, options){
	
	this.drawView = function(){
		jsCheckWANView.superclass.drawView.call(this);
		$(this.getChild("out").options.childBoxSel).addClass("checkwan");
	}

	this.onstartcheckrq = function(){
		rootView.showModalOverlay();
		this.ctrl.event("disablebuttons", true, true);
		setTimeout(callback(this, function(){
			this.updateModel();
			var out = this.getChild("out");
			$(out.options.childBoxSel).html("");
			if(this.ctrl.wan.L2Type == "3g"){
				this.addOutItem(lng("checkusb") + char1);
			}
			else{
				this.addOutItem(lng("checkcable") + char1);
			}
			this.ctrl.event("checkcablerq");
			rootView.hideModalOverlay();
		}), 5000);
		return false;
	}
	
	this.oncableready = function(){		

		this.ctrl.getWAN();
		if(this.ctrl.isCablePluged){
			this.$curout.css("color", "green");
			if(this.ctrl.wan.L2Type == "3g"){
				this.$curout.html(lng("g3_connection_success") + char2);
			}
			else{
				this.$curout.html(lng("cableplugged") + char2);
			}

			this.addOutItem(lng("connstat") + char1);
			var isConnected;
			if(this.ctrl.wan.isTunnel){
				isConnected = this.getStatus(this.ctrl.tunnel);
			}
			else{
				isConnected = this.getStatus(this.ctrl.service);
			}
			if(isConnected){
				//Пинг
				this.addOutItem(lng("hostaccess") + char1);
				this.ctrl.event("pingrq");
			}
			else{
				this.ctrl.event("enablebuttons", null, true);
			}
		}
		else{
			this.$curout.css("color", "red");
			if(!no(this.ctrl.wan.vpi) || !no(this.ctrl.wan.vci) || this.ctrl.wan.L2Type == "ptm"){
				this.$curout.html(lng("cablenotplugged") + char2);
				alert(lng("quickInfoDSL1"));
				this.addDescription(lng("quickInfoDSL1"));
				this.addDescription(lng("quickInfoDSL3"));
			}
			else{
				if(this.ctrl.wan.L2Type == "3g"){
				this.$curout.html(lng("g3_connection_error") + char2);
					alert(lng("g3_connection_error"));
					this.addDescription(lng("wanNoUsbModemAvail"));
					
				}
				else if(this.ctrl.wan.medium == "fiber"){
					this.$curout.html(lng("cablenotplugged") + char2);
					alert(lng("quickInfoFiber1"));
					this.addDescription(lng("quickInfoFiber1"));
				}
				else{
					this.$curout.html(lng("cablenotplugged") + char2);
					alert(lng("quickInfoEth1"));
					this.addDescription(lng("quickInfoEth1"));
				}
			}
			this.ctrl.event("enablebuttons", null, true);
		}
		return false;
	}

	this.onpingready = function(status){
		var out = this.getChild("out");
		if(status){
			var ping = this.ctrl.ping[0];
			if(ping && ping.transmited > 0 && (ping.transmited == ping.received)){
				this.$curout.css("color", "green");
				this.$curout.html(lng("accessible") + char2);
				alert(lng("inetok"));
				this.addResume(lng("inetok"), true);
			}
			else{
				this.$curout.css("color", "red");
				this.$curout.html(lng("unaccessible") + char2);
				this.describeInetFail();
			}
		}
		else{
			this.$curout.css("color", "red");
			this.$curout.html(lng("unaccessible") + char2);
			this.describeInetFail();
		}
		this.ctrl.event("enablebuttons", null, true);
		return false;
	}

	this.describeInetFail = function(){
		alert(lng("inetfail"));
		this.addResume(lng("inetfail"));
		if(!this.ctrl.wan.isTunnel && this.ctrl.service.type == "bridge"){
			this.addDescription(lng("pingfailbridge"));
		}
		else{
			this.addDescription(lng("pingfail"));
		}
	}
	
	this.addResume = function(text, res){
		var outSel = this.getChild("out").childBoxSel;
		$(outSel).append("<div class='resume'>" + text + "</div>");
		var $resume = $(outSel + " div.resume");
		if(res){
			$resume.addClass("inetok");
		}
		else{
			$resume.addClass("inetfail");
		}
	}

	this.addDescription = function(text){
		var outSel = this.getChild("out").childBoxSel;
		$(outSel).append("<div class='description'>" + text + "</div>");
	}
	
	this.addOutItem = function(text){
		var id = "out" + getUID();
		var htmlToDraw = "<div id='" + id + "' class='out'><div class='edit'><div class='label' ";
		if(this.options.inputPadding){
			htmlToDraw += "style='width: " + this.options.inputPadding + "'";
		}
		htmlToDraw += "><span>" + text + "</span></div>";
		htmlToDraw += "<div class='input'><img src='image/wait.gif' /></div></div></div><div style='clear:both'></div>";
		var out = this.getChild("out");
		$(out.options.childBoxSel).append(htmlToDraw);
		this.$curout = $("#" + id + " div.input");
	}

	
	this.getStatus = function(obj){
		if(obj){
			if(obj.enable){
				if(obj && obj.connection_status){
					if(obj.connection_status == "Connected"){
						this.$curout.css("color", "green");
						this.$curout.html(lng("statWanUp") + char2);
						return true;
					}
					else if(obj.connection_status == "Disconnected"){
						this.$curout.css("color", "red");
						this.$curout.html(lng("statWanDown") + char2);
						alert(lng("wandownmes"));
						this.addResume(lng("wandownmes"));
						this.addDescription(lng("wanconnectingmes2"));						
						return false;
					}
					else{
						this.$curout.css("color", "#FF8800");
						this.$curout.html(lng(obj.connection_status) + char2);
						alert(lng("wanconnectingmes"));
						this.addResume(lng("wanconnectingmes"));
						this.addDescription(lng("wanconnectingmes2"));
						return false;
					}
				}
				else{
					this.$curout.css("color", "red");
					this.$curout.html(lng("statWanDown") + char2);
					alert(lng("wandownmes"));
					this.addResume(lng("wandownmes"));
					this.addDescription(lng("wanconnectingmes2"));						
					return false;
				}
			}
			else{
				this.$curout.css("color", "red");
				this.$curout.html(lng("disable") + char2);
				alert(lng("wandismes"));
				this.addResume(lng("wandismes"));
				return false;
			}
		}
		else{
			this.$curout.css("color", "red");
			this.$curout.html(lng("wanStatusNotCreated"));
			alert(lng("wancreatefailure") + char2);
			this.addResume(lng("wancreatefailure") + ".");
			return false;
		}
	}
	
	var obj = ctrl.getChild("host");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "checkwanhost"
	};
	
	obj = ctrl.getChild("out");
	obj.nextIface = "client";
	obj.ifaceTypes.client.options = {
		slider: true,
		nocollapse: true,
		title: "checkwanresult",
		descText: ""
	};
	
	options.slider = true;
	options.nocollapse = true;
	options.title = lng("checkwantitle");
	options.descText = "";
	
	var char1 = ":";
	var char2 = ".";
	
	jsCheckWANView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("startcheckrq", this.onstartcheckrq);
	this.bind("cableready", this.oncableready);
	this.bind("pingready", this.onpingready);
}
extend(jsCheckWANView, jsFieldSetClientView);

function jsCheckWANServerView(ctrl, viewInx, options){
	jsCheckWANServerView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.pickData = function(){
		var data = this.options.sender.responseData;
		switch(this.mode){
			case "cable":
				if(data && !data.baddata && data.rq){
					if(data.rq[0] && data.rq[0].resident){
						this.ctrl.iftree = data.rq[0].resident.iface_names;

						function checkEthWAN(){
							var rq = data.rq[1];
							isConnect = false;
							if (rq.status == 20 && rq.resident) {
								var port;
								var obj;
								var ifnode;
								for (var p in rq.resident){
									port = p;
									obj = rq.resident[p];
									ifnode = this.ctrl.iftree[obj.iface];
									if(obj.is_wan || (ifnode && ifnode.is_wan)){
										break;
									}
								}
	
								if (!no(rq.resident[port].status)) {
									isConnect = rq.resident[port].status;
								} else {
									isConnect = rq.resident[port];
								}
							}
							return isConnect;
						}

						var wan = this.ctrl.wan;
						if(wan.L2Type == "3g"){
							var rq = data.rq[2];
							this.ctrl.isCablePluged = rq.status == 20 && rq.resident;
						}
						else{
							this.ctrl.isCablePluged = checkEthWAN.call(this);
						}												
						this.ctrl.event("cableready");
					}
					
				}		
			break;
			case "ping":
				if(data && !data.baddata && data.resident) {
					this.ctrl.ping = data.resident;
					this.ctrl.event("pingready", true);
				}
				else{
					this.ctrl.event("pingready", false);
				}					
			break;
		}
	}

	this.prepareData = function(){
		var obj;
		switch(this.mode){
			case "cable":
				var obj = {
					v2: "y",
					rq: 2,
					res_json0: "y",
					res_config_action0: 1,
					res_config_id0: 1,
					res_struct_size0: 1,
					res_json1: "y",
					res_config_action1:  1,
					res_struct_size1: 1,
					res_config_id1:  129
				};
				var rqInx = 2;
				if(this.ctrl.wan.L2Type == "3g"){
					obj["res_json" + rqInx] = "y";
					obj["res_config_action" + rqInx] =  1;
					obj["res_struct_size" + rqInx] = 1;
					obj["res_config_id" + rqInx] =  134;
					obj.rq = ++rqInx;
				}
			break;
			case "ping":
				var host = this.ctrl.getChild("host").model.value;
				obj = {
					v2: "y",
					rq: "y",
					res_data_type: "json",
					res_json: "y",
					res_config_action:  3,
					res_config_id:  145,
					res_struct_size: 1,
					res_buf: $.toJSON({ping_host: host, ping_count: 1})
				};
			break;
		}
		this.addToRequest(obj);
	}
	
	this.mode = "cable";
	
	this.oncheckcablerq = function(){
		this.mode = "cable";
		this.updateView();
	}
	
	this.onpingrq = function(){
		this.mode = "ping";
		this.updateView();
	}
	
	this.bind("checkcablerq", this.oncheckcablerq);
	this.bind("pingrq", this.onpingrq);
}
extend(jsCheckWANServerView, jsSSideView);





















window.configParams = {
 mainMenuStyle: "side"
};























function pageConfiguration(){
	pageConfiguration.superclass.constructor.call(this);
	
	this.add(new nodestatic("comment_save_current_config"), "current_config_save")
		.add(new nodestatic("comment_reboot"), "config_reboot")
		.add(new nodestatic("comment_factory_config"), "factory_config_save")
		.add(new nodestatic("comment_download_config"), "config_download")
		.add(new nodeUpload("comment_upload_config", 'index.cgi', 'file_config', {
			mandatory: true,
			browse: 'button_browse',
			cancel: 'button_cancel'
		}), "upload_config")
		.add(new nodestatic("comment_logout"), "config_logout");
		
	if(hideFlag( 9)) this.get("factory_config_save").hide();
	if(hideFlag( 11)) this.get("upload_config").hide();
	if(hideFlag( 12)) this.get("config_download").hide();

	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageConfiguration.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			
		}
		if (phase == "back") {
			this.child("current_config_save").val($("\
				<div></div>\
			").lightUIButton("button_conf_save").bind('click.button', callback(this, this.save)));
			this.child("config_reboot").val($("\
				<div></div>\
			").lightUIButton("button_reboot").bind('click.button', callback(this, this.reboot)));
			this.child("factory_config_save").val($("\
				<div></div>\
			").lightUIButton("button_factory").bind('click.button', callback(this, this.reset)));
			this.child("config_download").val($("\
				<div></div>\
			").lightUIButton("button_config_download").bind('click.button', callback(this, this.backup)));
			this.child("config_logout").val($("\
				<div></div>\
			").lightUIButton("logout").bind('click.button', callback(this, this.logout)));

			if(disableFlag("12")){
				this.get("config_download").hide();
			}
			if(disableFlag("10")){
				this.get("factory_config_save").hide();
			}
			if(disableFlag("11")){
				this.get("upload_config").hide();
			}
		}
	}
	
	this.save = function() {
		rootView.showModalOverlay();
		device.system.save(callback(this, function(){
			rootView.hideModalOverlay();
			alert(lng("save_config_success"));
		}));
	}
	
	this.reset = function() {
		rootCtrl.event("resetrebootrq");
	}
 
	this.reboot = function() {
		rootCtrl.event("rebootrq");
	}
	
	this.backup = function() {
		if (window.SAVEME) SAVEME.lock();
		device.system.backup(function(){
			if (window.SAVEME) SAVEME.unlock();
		});
	}
	
	this.logout = function() {
		deleteCookie("client_login");
		deleteCookie("client_password");
		location.reload(true);
	}
	
	this.bind("updaterq", function(){
		this.deep.updateView();
	});

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "upload_config":
				// Выбрали файл
			break;
		}
	});
	this.bind("uploading", function(status, value){
		// Началась загрузка
	});
	this.bind("uploaded", function(status, value, data){
		// Загрузка завершилась
		if(is.RPC_SUCCESS(data)){
			rootCtrl.event("rebootrq");
		}
		else{
			alert(lng("lng_config_upload_failed"));
		}
	});
	this.bind("cancel", function(status, value){
		// Прервали загрузку
	});

}
extend(pageConfiguration, node);























 
function jsConnsMainTabModel(iftree, lanClients, dhcpClients, routes){
	jsConnsMainTabModel.superclass.constructor.call(this);

	/**Дерево интерфейсов.
	 * @type	Object
	 */
	this.iftree = iftree;
	
	/**LAN и DHCP клиенты для выбора поля mac.
	 * Устанавливается из вне чтобы не плодить аргументы конструктора.
	 * @type	Object
	 */
	this.lanClients = lanClients;
	this.dhcpClients = dhcpClients;
	this.routes = routes;
}
extend(jsConnsMainTabModel, jsModel);


function jsConnsMainTabController(iftree, ifname, srvname, tnlname, lanClients, dhcpClients, routes, devicemac){
	jsConnsMainTabController.superclass.constructor.call(this);


	//Защита. Отсутвие интерфейсы в дереве интерпретируется как добавление.
	
	if(ifname && iftree[ifname]){
		var ifnode = iftree[ifname];
		if(srvname && ifnode.services && ifnode.services[srvname]){
			var service = ifnode.services[srvname];
			if(!tnlname || !service.tunnels || !service.tunnels[tnlname]){
				tnlname = null;
			}
		}
		else{
			ifname = null;
			srvname = null;
			tnlname = null;
		}
	}
	else{
		ifname = null;
		srvname = null;
		tnlname = null;
	}

	
	/**Обработка события изменение костыля соединения.
	 */
	this.onblankchange = function(){
		var general = this.getChild("general");
		var ifnode = general.model.ifnode;
		var service = general.model.service;
		var srvname = general.model.srvname;
		var tunnel = general.model.tunnel;
		var tnlname = general.model.tnlname;
		var ifname = general.model.ifname;
		var other = this.getChild("other");
		var isadding = (srvname == "create" ||tnlname == "create");
		var wizard = this.model.iftree.wizard;
		var L2L3 = other.getChild("L2L3");
		var blocks = this.model.blocks;

		ifnode.wizard = wizard;
		ifnode.blocks = blocks;
		switch(ifnode.type){
			case "atm":
				if(!blocks){
					L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsATMSettingsController(ifnode, isadding), "L2");
					L2L3.getChild("L2").model.iftree = this.model.iftree;
				}
				else{
					L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController(), "L2");
				}
			break;
			case "ethernet":
			case "ptm":
			case "bridge":
				if(ifnode.is_wan || !blocks){
					L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsEthSettingsController(ifnode, isadding, devicemac), "L2");
					L2L3.getChild("L2").model.lanClients = this.model.lanClients;
				}
				else{
					L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController(), "L2");
				}
			break;
			case "3g":
			case "lte":
			case "usb":
				L2L3.changeChild(L2L3.getChild("L2").thisInx, new js3GSettingsController(ifnode, isadding, service), "L2");
			break;
			case "auto":
				L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController(), "L2");
			break;
		}
		service.contype = ifnode.contype?ifnode.contype:getConnType(ifnode, service, tunnel);
		service.is_wan = true;
		service.level = 3;
		service.wizard = wizard;
		service.blocks = blocks;
		this.contype = service.contype;
		var miscL3 = new jsMiscSettingsController(service, true);

		other.changeChild(other.getChild("routing").thisInx, new jsController(), "routing");
		
		if(wizard && !tunnel){
			//Вставить дубликат имени для мастера
			L2L3.changeChild(L2L3.getChild("name").thisInx, new jsInputController(service.name), "name");
		}
		else{
			//Убрать дубликат имени для мастера
			L2L3.changeChild(L2L3.getChild("name").thisInx, new jsController(), "name");
		}

		switch(String(service.type)){
			case "ppp":
			case "pppv6":
			case "pppdual":
			case "3g":
				if(!blocks){
					var misc = new jsMiscSettingsController(service, true);
					L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
				}
				else{
					L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3");
				}
				L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsPPPSettingsController(service, isadding), "L3");
			break;
			case "ipv6":
				switch(service.contype){
					case "staticv6":
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsStatIPv6SettingsController(service, isadding), "L3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController(), "L3");
						}
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController(), "miscL3");
						}
					break;
					case "dynamicv6":
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsDinIPv6SettingsController(service, isadding), "L3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController(), "L3");
						}
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController(), "miscL3");
						}
					break;
				}
			break;
			case "ip":
				switch(service.contype){
					case "static":
					case "statpptp":
					case "statl2tp":
					case "statpppoe":
					case "statpptpv6":
					case "statl2tpv6":
					case "ipoa":
					case "statkab":
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsStatIPSettingsController(service, isadding), "L3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController(), "L3");
						}
						if(wizard && (service.contype == "statpptp"
							|| service.contype == "statl2tp"
							|| service.contype == "statpppoe"
							|| service.contype == "statpptpv6"
							|| service.contype == "statl2tpv6")){
							other.changeChild(other.getChild("routing").thisInx, new jsLocalResController(service, this.model.routes, 4), "routing");
						}
						if(!ifnode.is_wan){
							if(blocks){
								if(service && service.dhcpd){
									service.dhcpd.blocks = service.blocks;
						
									other.changeChild(other.getChild("DHCP").thisInx, new jsController(), "DHCP");
								
									other.changeChild(other.getChild("statDHCP").thisInx, new jsController(), "statDHCP");
									
								}
							}
							else{
								if(service && service.dhcpd){
									other.changeChild(other.getChild("DHCP").thisInx, new jsDhcpServerController(service.dhcpd), "DHCP");
									other.changeChild(other.getChild("statDHCP").thisInx, new jsDhcpServerMacController(service.dhcpd, this.model.lanClients, this.model.dhcpClients), "statDHCP");
								}
							}
						}

						L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");

					break;
					case "dynamic":
					case "dynpptp":
					case "dynpppoe":
					case "dynl2tp":
					case "dynpptpv6":
					case "dynl2tpv6":
					case "lte":
					case "dynkab":
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsDinIPSettingsController(service, isadding), "L3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController(), "L3");
						}
						if(!blocks){
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
						}
						else{
							L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController(), "miscL3");
						}
					break;
				}
			break;
			case "bridge":
			case "auto":
				L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController(), "L3");				
				L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController(), "miscL3");
			break;
		}

		if(service.vlan && getObjectLength(service.vlan)){
			   L2L3.changeChild(L2L3.getChild("VLAN").thisInx, new jsBCMVlanSettingsController(service, isadding), "VLAN");                                    
		}
		else{
			   L2L3.changeChild(L2L3.getChild("VLAN").thisInx, new jsController(service, isadding), "VLAN");                                   
		}
	
	

		if(tunnel){
			tunnel.contype = service.contype;
			tunnel.is_wan = true;
			tunnel.level = 4;
			tunnel.wizard = wizard;
			tunnel.blocks = blocks;
			var VPN = other.changeChild(other.getChild("VPN").thisInx, new jsFieldSetController(), "VPN");
			if(wizard){
				//Дубликат имени соединения для мастера
				VPN.addChild(new jsInputController(tunnel.name), "name");
			}
			switch(tunnel.type){
				case "ppp":
					tunnel.level = 3;
					VPN.addChild(new jsPPPSettingsController(tunnel, isadding), "PPP");
				break;
				case "pptp":
				case "l2tp":
				case "ppp":
					VPN.addChild(new jsPPPSettingsController(tunnel, isadding), "PPP");
				break;
				case "624":
				break;
			}                  
			var miscVPN = new jsMiscSettingsController(tunnel, true);
			if(!blocks){
				VPN.addChild(miscVPN, "misc");
			}
			
		}
		else{
			other.changeChild(other.getChild("VPN").thisInx, new jsController(), "VPN");
		}
		return true;
	}

	/**Получить узел в дереве интерфейсов по имени интерфейса.
	 * @param	{String}	ifname	Имя интерфейса.
	 */
	this.getIfaceByName = function(ifname, layer){
		return this.model.iftree[ifname];
	}
	
	this.changeModel(new jsConnsMainTabModel(iftree, lanClients, dhcpClients, routes));
		
	/**Признак добавления нового соединения*/
	this.isadding = !ifname;
	
	var wizard = this.model.iftree.wizard;
	
	if(wizard){
		//Шаг проверки кабеля на ване
		this.addChild(new jsCableStatController(), "cable");
	}
	
	//general settings
	this.addChild(new jsGeneralSettingsController(iftree, ifname, srvname, tnlname, "services"), "general");

	//*************** Костыль страницы. Конкретные контролы вставляются при изменении костыля соединения. ******************

	var other = this.addChild(new jsFieldSetController(), "other");
	var L2L3 = other.addChild(new jsFieldSetController(), "L2L3");
	
	//Дубликат имени соединения для мастера
	L2L3.addChild(new jsController(), "name");

	//L2 settings
	L2L3.addChild(new jsController(), "L2");

	//L3 settings
	L2L3.addChild(new jsController(), "L3");
	L2L3.addChild(new jsController(), "miscL3");
	L2L3.addChild(new jsController(), "VLAN");

	other.addChild(new jsController(), "routing");
	
	//DHCP server
	other.addChild(new jsController(), "DHCP");
	other.addChild(new jsController(), "statDHCP");

	//VPN settings
	var VPN = other.addChild(new jsController(), "VPN");

	this.addChild(new jsFieldSetController(), "summary");
	if(wizard){
		this.addChild(new jsCheckWANController(), "checkwan");
	}
	if (window.engine && window.engine.candyBlack) {
		this.addChild(new jsBubblerController(), "tip");
	}
	
	this.addEventHandler("blankchange", this.onblankchange);

	this.ifaceTypes.client = {type: jsConnsMainTabClientView};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsConnsMainTabSummaryView};
	this.ifaceTypes.summary.options = {nothing: true, inputPadding: "200px", summary: true};

	if(wizard){
		this.nextIface = "summary";
		this.addIface();
		this.nextIface = "client";
	}
	
	this.contype = null;
}
extend(jsConnsMainTabController, jsFieldSetController);



function jsConnsMainTabClientView(ctrl, viewInx, options){
	var obj;
	var opt;
	var ifnode = ctrl.model.ifnode;
	var service = ctrl.model.service;
	var tunnel = ctrl.model.tunnel;
	var iftree = ctrl.model.iftree;
	var isadding = ctrl.model.isadding;
	
	this.onmodeswitch = function(value){
		var L2L3 = this.ctrl.getChild("other", "L2L3");
		L2L3.getChild("L2").event("modeswitch", value);
		L2L3.getChild("L3").event("modeswitch", value);
		L2L3.getChild("miscL3").event("modeswitch", value);
		L2L3.getChild("VLAN").event("modeswitch", value);
		var VPN = this.ctrl.getChild("other", "VPN");
		for(var i in VPN.children){
			VPN.children[i].event("modeswitch", value);
		}
		this.setOption("brief", value);
		return false;
	}

	this.drawView = function(){
		if(!this.options.nooverlay){
			this.showModalOverlay("wanBuildForm");
		}

		setTimeout(context(this).callback(
			function(){
				var general = this.getChild("general");
				general.options.hide = !general.ctrl.model.ifnode.is_wan;
				jsConnsMainTabClientView.superclass.drawView.call(this);
				this.ctrl.event("drawsummaryrq", this.getChild("summary").options.viewBoxSel);
				if(!this.ctrl.model.iftree.wizard){
					this.ctrl.event("blankchange");
				}
				if(this.ctrl.model.iftree.wizard){
					this.goFirstStep();
				}
			
				//Проверка прав на рпц
				if(disableFlag(1)){
					var service = this.ctrl.getChild("general").model.service;
					var tunnel = this.ctrl.getChild("general").model.tunnel;
					if(tunnel){
						var contype = tunnel.contype;
					}
					else{
						var contype = service.contype;
					}
					var buttons = this.options.buttons;
					//ацкий костыль
					for(var i=0; i<buttons.length; i++){
						if((buttons[i].name == "save" && contype != "pppoe") || buttons[i].name == "del"){
							this.disableButton(buttons[i].name);

							(function disableFields(){
								var child;
								for(var i=0; i<this.ctrl.children.length; i++){
									child = this.getChild(i);
									if(child && is.func(child.disable)){
										var alias = child.ctrl.alias;
										if(alias == "userName" || alias == "noAuth" || alias == "password" || alias == "confirm"){
											continue;
										}
										else{
											child.disable();
										}
									}
									else if(child instanceof jsCSideView){
										disableFields.call(child);
									}
								}
							}).call(this);
						}
					}
				}

				this.hideModalOverlay();
				if (window.engine && window.engine.candyBlack) {
					this.getChild("tip").show();
				}
		}), 0);
	}
	
	/**Обработка события изменение костыля соединения.
	 */
	jsConnsMainTabClientView.prototype.onblankchange = function(){
		var other = this.getChild("other");
		var general = this.getChild("general");
		
		var name = other.ctrl.getChild("L2L3", "name");
		if(name instanceof jsInputController){
			name.nextIface = "input";
			name.ifaceTypes.input.options = {
				humanName: "wanNameWiz",
				mandatory: true
			}
		}
		var VPN = other.ctrl.getChild("VPN");
		if(VPN instanceof jsFieldSetController){
			VPN.nextIface = "client";
			VPN.ifaceTypes.client.options = {
				nothing: true
			}
			if(this.ctrl.model.iftree.wizard){
				name = VPN.getChild("name");
				name.nextIface = "input";
				name.ifaceTypes.input.options = {
					humanName: "wanNameWiz",
					mandatory: true
				}
			}
		}
		
		//Подстраиваем интерфейс под изменившуюся раскладку
		other.options.wizard  = false;	//чтобы не допустить наследования опции wizard
		general.options.wizard  = false;	//чтобы не допустить наследования опции wizard
		other.options.inwizard = this.options.wizard;	//Чтобы классы знали что они фунциклируют под визардом. Опция wizard служит другой цели - она подстраивает внешний вид
														//для навигации по мастеру и она должна быть установлена только у other. Детали по опции wizard в jhmvc.		
		other.options.brief = this.options.brief;
		other.options.buttonsInline = true;
		other.constructor(other.ctrl, other.viewInx, other.options?other.options:{});
		other.options.wizard = this.options.wizard;	//возвращаем прежнее значение
		general.options.wizard = this.options.wizard;	//возвращаем прежнее значение
		other.activeTab = 0;
		
		other.drawView();
		
	this.ctrl.model.iftree.needPIN	
	
		//Проверить не заблокирован ли USB-модем перед созданием 3G соединения
		//TODO: Запретить кнопку сохранить
		
		if(this.getChild("general").ctrl.model.ifnode.type == "3g" && this.ctrl.model.iftree.needPIN){
			var needPINDialog = this.getChild("needPINDialog");
			if(needPINDialog instanceof jsFieldSetClientView){
				needPINDialog.show();
			}
		}

		return true;
	}

	this.onshowneedpindialogrq = function(){
		if(this.getChild("general").ctrl.model.ifnode.type == "3g" && this.ctrl.model.iftree.needPIN){
			var needPINDialog = this.getChild("needPINDialog");
			if(needPINDialog instanceof jsFieldSetClientView){
				needPINDialog.show();
			}
		}
		return false;
	}
	
	/**Обработчик событий изменений полей формы
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;	//индекс контроллера в массиве children
		switch(alias){
			case "useipv6":
				var DHCP = this.getChild("other", "DHCP");
				if(DHCP instanceof jsDhcpServerClientView){
					if(obj.value){
				//		this.getChild("other", "DHCP").enableIPv6();
					}
					else{
					//	this.getChild("other", "DHCP").disableIPv6();
					}
				}
			break;
			case "vpi":
			case "vci":
				this.getChild("general").autoname();
				this.getChild("general").updateModel();
			break;
			case "port":
				this.getChild("L2L3", "L2").event("portchange", obj.value);
			break;
		}
			
		return false; //прервать всплытие события
	}
	
	this.updateModel = function(){
		var res = jsConnsMainTabClientView.superclass.updateModel.call(this);
		var general = this.getChild("general");
		var model = general.ctrl.model;
		
		
		if(model.service.dhcpd){
			//Занулить DHCPшный updateModel чтобы не обновлялась раньше времени.
			//Обновим после корректировки пула.
			var DHCP = this.getChild("other", "DHCP");
			var updateModelDHCP = DHCP.updateModel;
			DHCP.updateModel = function(){return true};
		}
		if(res && model.service.dhcpd){
			//корретировка пула
			if(!model.ifnode.is_wan && model.service.dhcpd){
				var IP = this.getChild("other", "L2L3", "L3");
				var DHCP = this.getChild("other", "DHCP");
				var begin;
				var end;
				DHCP.getChild("mode").updateModel();
				var dhcpdmode = DHCP.getChild("mode").ctrl.model.value;
				if(dhcpdmode == "en" && IP.ctrl.isIpOrMaskChanged){
					if(DHCP.correctDHCP(IP.getChild("ip").ctrl.model, IP.getChild("mask").ctrl.model)){
						var divMain = DHCP.getChild("divMain");
						begin = divMain.getChild("begin");
						end = divMain.getChild("end");
						if(confirm(lng("dhcpCorrectReq") + " " + lng("dhcpNewPool") + " " + begin.ctrl.model.toString() + " ... " + end.ctrl.model.toString())){
							begin.updateView();
							end.updateView();
						}
						IP.ctrl.isIpOrMaskChanged = false;
					}
				}
				

			}
			DHCP.updateModel = updateModelDHCP;
			res &= DHCP.updateModel();

		}
		
		return res;
	}
	
	/**Обработчик нажатия на кнопку delete.*/
	this.del = function(){
			this.showModalOverlay();
			this.ctrl.getParent(1).event("deleterq");
	}
	
	this.ondisablebuttons = function(){
		var buttons = this.options.buttons;
		for(var i in buttons){
			this.disableButton(buttons[i].name);
		}
		return false;
	}
	
	this.onenablebuttons = function(){
		var buttons = this.options.buttons;
		for(var i in buttons){
			this.enableButton(buttons[i].name);
		}
		return false;
	}
	
	this.modeswitchshow = function(){
		
		if (window.engine && window.engine.simpleAir) {
			rootCtrl.event("modeswitchshowrq");
		};
		
		if (window.engine && window.engine.candyBlack) {			
			rootCtrl.event("modeswitchshowrq");
			this.getChild("tip").autoShow();
			this.getChild("tip").startHide();
		}
	}
	
	this.modeswitchhide = function(){
		
		if (window.engine && window.engine.simpleAir) {			
			rootCtrl.event("modeswitchhiderq");
		};
		
		if (window.engine && window.engine.candyBlack) {			
			rootCtrl.event("modeswitchhiderq");
			this.getChild("tip").autoHide();
		}
	}
	
	//Навигация по визарду		

	this.setSummaryButtons = function(){
		var buttons = this.options.buttons = [];
		buttons.push({name:"prev", value:"button_prev", handler:this.summaryPrev});
		buttons.push({name:"save", value:"button_save", handler:this.save});
		this.ctrl.event("updatesummaryrq");
	}

	this.setVPNButtons = function(){
		var buttons = this.options.buttons;
		buttons.push({name:"prev", value:"button_prev", handler:this.VPNPrev});
		buttons.push({name:"next", value:"button_next", handler:this.VPNNext});
	}
	
	this.goFirstStep = function(){
		this.options.buttons = [{name:"next", value:"button_next", handler:this.cableNext}];
		this.switchChild("cable");
		this.updateButtons();
	}

	this.cableNext = function(){
		this.ctrl.event("checkcable", null, true);
	}

	this.oncableready = function(ready){
		if(!ready){
			if(!confirm(lng("wancablewarn"))){
				return;
			}
		}
		var buttons = [];
		this.options.buttons = buttons;
		if(this.ctrl.isadding){
			var general = this.getChild("general");
			if(getObjectLength(provList) < 2){
				//на тип
				buttons.push({name:"prev", value:"button_prev", handler:this.typePrev});
				buttons.push({name:"next", value:"button_next", handler:this.typeNext});
				general.switchChild("type");
			}
			else{
				//на прова
				buttons.push({name:"prev", value:"button_prev", handler:this.provPrev});
				buttons.push({name:"next", value:"button_next", handler:this.provNext});
				general.switchChild("provstep");
			}
			this.switchChild("general");
			this.updateButtons();
			this.modeswitchhide();
		}
		else{
			switch(this.ctrl.contype){
				case "pptp":
				case "l2tp":
				case "624":
					//на L2L3
					var other = this.getChild("other");
					buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
					other.activeTab = other.getChild("L2L3").ctrl.thisInx;
					this.switchChild("other");
					this.updateButtons();
					this.modeswitchshow();
				break;
			}
		}
		return false;
	}
	
	this.provNext = function(){
		//на L2L3 или тип
		var general = this.getChild("general");
		var buttons = [];
		this.options.buttons = buttons;
		var provname = general.ctrl.model.templates.provname;
		if(!provname || provname == "man"){
			//на тип
			buttons.push({name:"prev", value:"button_prev", handler:this.typePrev});
			buttons.push({name:"next", value:"button_next", handler:this.typeNext});
			general.switchChild("type");
			this.modeswitchhide();
		}
		else{
			//на L2L3
			if(this.getChild("general").updateModel()){
				this.ctrl.event("blankchange");
				buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
				buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
				var other = this.getChild("other");
				other.ctrl.activeTab = other.ctrl.getChild("L2L3").thisInx;
				this.switchChild("other");
				this.modeswitchshow();
			}
		}
		this.updateButtons();
	}
	
	this.provPrev = function(){
		this.options.buttons = [{name:"next", value:"button_next", handler:this.cableNext}];
		this.switchChild("cable");
		this.updateButtons();
	}
	
	this.typeNext = function(){
		//на порт или L2L3
		var buttons = [];
		this.options.buttons = buttons;
		var general = this.getChild("general");
		var model = general.ctrl.model;
		if(getObjectLength(model.templates[model.ifnode.contype]) > 1){
			//на порт
			buttons.push({name:"prev", value:"button_prev", handler:this.portPrev});
			buttons.push({name:"next", value:"button_next", handler:this.portNext});
			general.switchChild("port");
			this.modeswitchhide();
		}
		else{
			//на L2L3
			if(general.updateModel()){
				this.ctrl.event("blankchange");
				var other = this.getChild("other");
				switch(this.ctrl.contype){
					case "pptp":
					case "l2tp":
					case "624":
						this.setVPNButtons();
						other.switchChild("VPN");
					break;
					default:
						buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
						buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
						other.switchChild("L2L3");
					break;
				}
				this.switchChild("other");
				this.modeswitchshow();
			}
		}
		this.updateButtons();
	}

	this.typePrev = function(){
		//на прова
		var buttons = [];
		this.options.buttons = buttons;
		if(getObjectLength(provList) < 2){
			//на кабель
			buttons.push({name:"next", value:"button_next", handler:this.cableNext});
			this.switchChild("cable");
		}
		else{
			//на прова
			buttons.push({name:"prev", value:"button_prev", handler:this.provPrev});
			buttons.push({name:"next", value:"button_next", handler:this.provNext});
			this.getChild("general").switchChild("provstep");
		}
		this.updateButtons();
	}
	
	this.portNext = function(){
		var general = this.getChild("general");
		var other = this.getChild("other");
		if(general.updateModel()){
			this.ctrl.event("blankchange");
			var buttons = [];
			this.options.buttons = buttons;
			switch(this.ctrl.contype){
				case "pppoe":
				case "pppoev6":
				case "pppoedual":
				case "pppoa":
				case "static":
				case "dynamic":
				case "staticv6":
				case "dynamicv6":
				case "ipoa":
				case "3g":
				case "lte":
				case "bridge":
				case "statpptp":
				case "statpppoe":
				case "statl2tp":
				case "statpptpv6":
				case "statl2tpv6":
				case "dynpptp":
				case "dynpppoe":
				case "dynl2tp":
				case "dynpptpv6":
				case "dynl2tpv6":
				case "dynkab":
				case "statkab":
					//на L2L3
					buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
					buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
					other.ctrl.activeTab = other.ctrl.getChild("L2L3").thisInx;
				break;
				case "pptp":
				case "l2tp":
				case "624":
					//на VPN
					buttons.push({name:"prev", value:"button_prev", handler:this.VPNPrev});
					buttons.push({name:"next", value:"button_next", handler:this.VPNNext});
					other.ctrl.activeTab = other.ctrl.getChild("VPN").thisInx;
				break;
			}
			this.switchChild("other");
			this.updateButtons();
			this.modeswitchshow();
		}
	}
	
	this.portPrev = function(){
		//на type
		var buttons = [];
		this.options.buttons = buttons;
		if(getObjectLength(provList) > 1){
			buttons.push({name:"prev", value:"button_prev", handler:this.typePrev});
		}
		buttons.push({name:"next", value:"button_next", handler:this.typeNext});
		this.getChild("general").switchChild("type");
		this.updateButtons();
	}

	this.L2L3Next = function(){
		var L2L3 = this.getChild("other", "L2L3");
		if(L2L3.updateModel()){
			var general = this.getChild("general");
			var model = general.ctrl.model;
			if(model.tunnel){
				if(model.service.type != "auto" && !model.service.name){
					//Заполнить имя сервиса автоматически, т.к. в данном случае пользователь выбирает только имя тоннеля.
					model.service.name = general.ctrl.autoname(getConnType(model.ifnode, model.service));
				}
			}
			else{
				var name = L2L3.getChild("name");
				var value = name.ctrl.model.value;
				if(value == ""){
					name.statusCode = "wanNameEmpty";
				}
				else{
					name.statusCode = null;
					general.ctrl.model.service.name = value;
					general.ctrl.event("updatenamerq");
					general.updateView();
				}
				name.setError();
			}
			var buttons = [];
			this.options.buttons = buttons;
			switch(this.ctrl.contype){
				case "pppoe":
				case "pppoev6":
				case "pppoedual":
				case "pppoa":
				case "static":
				case "dynamic":
				case "staticv6":
				case "dynamicv6":
				case "ipoa":
				case "3g":
				case "lte":
				case "bridge":
				case "dynkab":
				case "statkab":
					//на summary
					this.setSummaryButtons();
					this.switchChild("summary");
					this.modeswitchhide();
				break;
				case "statpptp":
				case "statpppoe":
				case "statl2tp":
				case "statpptpv6":
				case "statl2tpv6":
					//на routing
					buttons.push({name:"prev", value:"button_prev", handler:this.routingPrev});
					buttons.push({name:"next", value:"button_next", handler:this.routingNext});
					this.getChild("other").switchChild("routing");
					this.modeswitchhide();
				break;
				case "dynpptp":
				case "dynpppoe":
				case "dynl2tp":
				case "dynpptpv6":
				case "dynl2tpv6":
					//на VPN
					buttons.push({name:"prev", value:"button_prev", handler:this.VPNPrev});
					buttons.push({name:"next", value:"button_next", handler:this.VPNNext});
					this.getChild("other").switchChild("VPN");
					this.modeswitchshow();
				break;
			}
			this.updateButtons();
		}
		else{
			alert(lng("wanErrorMes"));
		}
	}

	this.L2L3Prev = function(){
		//на порт или тип
		var buttons = [];
		this.options.buttons = buttons;
		var general = this.getChild("general");
		var model = general.ctrl.model;
		if(getObjectLength(model.templates[model.ifnode.contype]) > 1){
			//на порт
			buttons.push({name:"prev", value:"button_prev", handler:this.portPrev});
			buttons.push({name:"next", value:"button_next", handler:this.portNext});
			general.switchChild("port");
		}
		else{
			//на тип
			if(getObjectLength(provList) > 1){
				buttons.push({name:"prev", value:"button_prev", handler:this.typePrev});
			}
			buttons.push({name:"next", value:"button_next", handler:this.typeNext});
			general.switchChild("type");
		}
		this.switchChild("general");
		this.updateButtons();
		this.modeswitchhide();
	}

	this.routingNext = function(){
		var routing = this.getChild("other", "routing");
		if(routing.updateModel()){
			var buttons = [];
			this.options.buttons = buttons;
			buttons.push({name:"prev", value:"button_prev", handler:this.VPNPrev});
			buttons.push({name:"next", value:"button_next", handler:this.VPNNext});
			this.getChild("other").switchChild("VPN");
			this.updateButtons();
			this.modeswitchshow();
		}
	}

	this.routingPrev = function(){
		//на L2L3
		var routing = this.getChild("other", "routing");
		if(routing.updateModel()){
			var buttons = [];
			this.options.buttons = buttons;
			buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
			buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
			this.getChild("other").switchChild("L2L3");
			this.updateButtons();
			this.modeswitchshow();
		}
	}
	
	this.VPNNext = function(){
		//на summary
		var VPN = this.getChild("other", "VPN");
		if(VPN.updateModel()){

			var general = this.getChild("general");
			var name = VPN.getChild("name");
			var value = name.ctrl.model.value;
			if(value == ""){
				name.statusCode = "wanNameEmpty";
			}
			else{
				name.statusCode = null;
				general.ctrl.model.tunnel.name = value;
				general.ctrl.event("updatenamerq");
				general.updateView();
			}
			name.setError();

			var buttons = [];
			this.options.buttons = buttons;
			this.setSummaryButtons();
			this.switchChild("summary");
			this.updateButtons();
			this.modeswitchhide();
		}
	}
	
	this.VPNPrev = function(){
		var VPN = this.getChild("other", "VPN");
		var buttons = [];
		this.options.buttons = buttons;
		switch(this.ctrl.contype){
			case "statpptp":
			case "statpppoe":
			case "statl2tp":
			case "statpptpv6":
			case "statl2tpv6":
				//на routing
				buttons.push({name:"prev", value:"button_prev", handler:this.routingPrev});
				buttons.push({name:"next", value:"button_next", handler:this.routingNext});
				this.getChild("other").switchChild("routing");
				this.updateButtons();
				this.modeswitchhide();
			break;
			case "dynpptp":
			case "dynpppoe":
			case "dynl2tp":
			case "dynpptpv6":
			case "dynl2tpv6":
				//на L2L3
				buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
				buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
				this.getChild("other").switchChild("L2L3");
				this.updateButtons();
				this.modeswitchshow();
			break;
			case "pptp":
			case "l2tp":
			case "624":
				//на тип
				if(getObjectLength(provList) > 1){
					buttons.push({name:"prev", value:"button_prev", handler:this.typePrev});
				}
				buttons.push({name:"next", value:"button_next", handler:this.typeNext});
				var general = this.getChild("general");
				general.ctrl.activeTab = general.ctrl.getChild("type").thisInx;
				this.switchChild("general");
				this.updateButtons();
				this.modeswitchhide();
			break;
		}
	}
	
	this.summaryPrev = function(){
		var other = this.getChild("other");
		var buttons = [];
		this.options.buttons = buttons;
		switch(this.ctrl.contype){
			case "statpptp":
			case "statpppoe":
			case "statl2tp":
			case "statpptpv6":
			case "statl2tpv6":
			case "dynpptp":
			case "dynpppoe":
			case "dynl2tp":
			case "dynpptpv6":
			case "dynl2tpv6":
			case "pptp":
			case "l2tp":
			case "624":
				//на VPN
				buttons.push({name:"prev", value:"button_prev", handler:this.VPNPrev});
				buttons.push({name:"next", value:"button_next", handler:this.VPNNext});
				other.switchChild("VPN");
			break;
			case "pppoe":
			case "pppoev6":
			case "pppoedual":
			case "pppoa":
			case "static":
			case "dynamic":
			case "staticv6":
			case "dynamicv6":
			case "ipoa":
			case "3g":
			case "lte":
			case "bridge":
			case "dynkab":
			case "statkab":
				//на L2L3
				buttons.push({name:"prev", value:"button_prev", handler:this.L2L3Prev});
				buttons.push({name:"next", value:"button_next", handler:this.L2L3Next});
				other.switchChild("L2L3");
			break;
		}
		this.switchChild("other");
		this.updateButtons();
		this.modeswitchshow();
	}
	
	/**Обработчик нажатия на кнопку save.
	 * Т.к. в jhmvc, пока, не предусмотрено запуска события (через метод jsController.event),
	 * то запускаем его здесь. Событие всплывёт к родительскому представлению и там будет
	 * обработано. Сохранение/добавление пока остаётся в родителе.
	 * TODO: разнести чтение и сохранение/добавление.
	 */
	this.save = function(){
		var res = this.updateModel();

		if(res){
			var general = this.getChild("general");
			var model = general.ctrl.model;
			
			if ( model.ifnode.connection_mode && 
				 model.ifnode.connection_mode == "VlanDefMode" &&
				 is.object(model.service.vlan) && is.number(model.service.vlan.vlanid) ) {				
				delete model.ifnode.needDelete;				
			}
			
			if(model.ifnode.needDelete){
				if(!confirm(lng("wandelwarn"))){
					return;
				}
			}
			

			this.showModalOverlay();
			clearJSON(model.blankConn);
			
			//Для отладки лочек
			
			this.ctrl.getParent().event("saverq");
		}
	}
	
	this.onsavecomplete = function(){
		var wan = {};
		var model = this.ctrl.getChild("general").model;
		wan.L2Type = model.ifnode.type;
		wan.medium = model.ifnode.medium;
		if(wan.L2Type == "atm"){
			wan.vpi = model.ifnode.pvc_settings.vpi;
			wan.vci = model.ifnode.pvc_settings.vci;
		}
		else{
			wan.ifname = model.ifname;
		}

		wan.serviceName = model.service.name;
		if(!no(model.tunnel) && getObjectLength(model.tunnel) > 0){
			if(model.ifnode.contype == "statpppoe" || model.ifnode.contype == "dynpppoe"){
				wan.serviceName2 = model.tunnel.name;
			}
			else{
				wan.tunnelName = model.tunnel.name;
			}
		}

		this.ctrl.getChild("checkwan").wan = wan;
		this.switchChild("checkwan");
		this.options.buttons = [
			{name:"checkwan", value:"button_recheck", handler:function(){this.ctrl.getChild("checkwan").event("startcheckrq")}},
			{name:"prev", value:"button_prev", handler:this.checkWANPrev}
		];
	this.options.buttons.push({name:"next", value:"button_next", handler:function(){this.ctrl.event("wanready", null, true)}});
		
		this.updateButtons();
		this.ctrl.getChild("checkwan").event("startcheckrq");		
	}
	
	this.checkWANPrev = function(){
		this.setSummaryButtons();
		this.switchChild("summary");
		this.updateButtons();
	}
	

	this.onnophyiface = function(){
		this.disableButton("next");
		return false;
	}
	
	this.onphyifacepresent = function(){
		this.enableButton("next");
		return false;
	}

	/**Индекс интерфейса, к которому будет принадлежать представление.
	 * Обычно устанавливается базовым классом jsView, но здесь нужен раньше.
	 */
	this.viewInx = viewInx;
	/**Ссылка на контроллер.
	 * Обычно устанавливается базовым классом jsView, но здесь нужен раньше.
	 */
	this.ctrl = ctrl;
	/**Опции представления.
	 * Обычно устанавливается базовым классом jsView, но здесь нужен раньше.
	 */
	this.options = options?options:{};
	
	
	this.blocks = ctrl.model.blocks;
	this.wizard = ctrl.model.iftree.wizard;
	this.options.brief = this.wizard;
	this.rejectDel = ctrl.model.rejectDel;
	
	
	var generalOpt = ctrl.getChild("general").ifaceTypes.client.options;
	generalOpt.wizard = this.wizard;
	//В блоке general не отображаем
	generalOpt.hide = this.blocks;
	
	options.title = "wanMain";
	options.nothing = true;
	


	if (window.engine && window.engine.candyBlack) {
		obj = ctrl.getChild("tip");
		obj.ifaceTypes.client.options = {
			flow: '#pageToolbarModeSwitch',
			delay: 5000,
			direction: 'right',
			manual: true,
			content: 'modeswitchtip'
		};
	}
	
	jsConnsMainTabClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	obj = ctrl.getChild("summary");
	obj.nextIface = "client";

	this.bind("fieldchange", this.onfieldchange);
	this.bind("blankchange", this.onblankchange);
	this.bind("showneedpindialogrq", this.onshowneedpindialogrq);
	this.bind("nophyiface", this.onnophyiface);
	this.bind("phyifacepresent", this.onphyifacepresent);
	this.bind("modeswitch", this.onmodeswitch);
	this.bind("cableready", this.oncableready);
	this.bind("disablebuttons", this.ondisablebuttons);
	this.bind("enablebuttons", this.onenablebuttons);
	this.bind("savecomplete", this.onsavecomplete);
	
	this.options.buttons = 	[];
	

	if(!this.wizard && !this.blocks){
		this.options.buttons.push({name:"save", value:"button_save", handler:this.save});
	}
	if(!ctrl.isadding && ctrl.getChild("general").model.ifnode.is_wan && !this.blocks){
		this.options.buttons.push({name:"del", value:"button_del", handler:this.del});
	}

	if(this.wizard){
		this.options.wizard = true;
		this.options.buttons.push({name:"next", value:"button_next", handler:this.firstStep});
	}
}
extend(jsConnsMainTabClientView, jsFieldSetClientView);


function jsConnsMainTabSummaryView(ctrl, viewInx, options){
	ctrl.getChild("general").nextIface = "summary";
	ctrl.getChild("needPINDialog").nextIface = "stop";	//указываем несуществующий интерфейс чтобы прервать его создание
	ctrl.getChild("cable").nextIface = "stop";	//указываем несуществующий интерфейс чтобы прервать его создание
	ctrl.getChild("checkwan").nextIface = "stop";	//указываем несуществующий интерфейс чтобы прервать его создание
	jsConnsMainTabSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Переопределённая отрисовка представления.
	 * Смысл в том, чтобы не войти в бесконечный цикл.
	 */
	this.drawView = function(){
		jsFieldSetClientView.prototype.drawView.call(this);
	}
	
	/**Обработчик запроса отрисовки представления.
	 * Запрос приходит когда готов view box.
	 */
	this.ondrawsummaryrq = function(viewBoxSel){
		this.options.viewBoxSel = viewBoxSel;
		this.viewBoxSel = viewBoxSel;
		this.drawView();
		return false;
	}

	/**Обработчик запроса обновления представления.*/
	this.onupdatesummaryrq = function(){
		this.updateView();
	}
	
	/**Обработка события изменение костыля соединения.
	 */
	this.onblankchange = function(){
		//Проставить правильный следующий интерфейс потомкам other, т.к. other не имеет специального представления для summary
		var other = this.getChild("other");
		for(var i in other.ctrl.children){
			other.ctrl.children[i].nextIface = "summary";
		}
		//Проставить правильный следующий интерфейс потомкам L2L3, т.к. L2L3 не имеет специального представления для summary
		var L2L3 = other.getChild("L2L3");
		L2L3.ctrl.nextIface = "client";
		L2L3.ctrl.getChild("L2").nextIface = "summary";
		L2L3.ctrl.getChild("L3").nextIface = "summary";
		var VPN = other.ctrl.getChild("VPN");
		if(VPN instanceof jsFieldSetController){
			VPN.nextIface = "client";
			VPN.getChild("PPP").nextIface = "summary";
			VPN.getChild("misc").nextIface = "summary";
		}
		
		jsConnsMainTabSummaryView.superclass.onblankchange.call(this);
		var general = this.getChild("general");
		if(general.ctrl.model.tunnel){
			other.getChild("VPN").getChild("name").hide();
		}
		else{
			L2L3.getChild("name").hide();
		}
	}

	this.bind("drawsummaryrq", this.ondrawsummaryrq);
	this.bind("updatesummaryrq", this.onupdatesummaryrq);
	this.bind("blankchange", this.onblankchange);
	this.bind("fieldchange", function(){return false;});
	this.bind("cableready", function(){return false;});
	this.bind("savecomplete", function(){return false;});
	
	this.wizard = false;
	this.options.wizard = false;
	this.options.buttons = null;
}
extend(jsConnsMainTabSummaryView, jsConnsMainTabClientView);



function jsCableStatController(){
	jsCableStatController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsCableStatClientView, options:{}};

}
extend(jsCableStatController, jsController);

function jsCableStatClientView(ctrl, viewInx, options){
	jsCableStatClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function() {
		jsCableStatClientView.superclass.drawView.call(this);
		var img = 'image/master_ethernet.gif';
		var text = lng('quickInfoEth1');
		var text2 = lng('quickInfoEth2');
		$(this.viewBoxSel).html('<div class="picable"><img src="' + img + '" /></div><div class="picableInfo1">' + text + '</div><div class="picableInfo2">' + text2 + '</div><div class="clear"></div>');
	}
	
}
extend(jsCableStatClientView, jsCSideView);






















function pageDDNS(){
	pageDDNS.superclass.constructor.call(this);
	
	this.ddns = null;
	this.ifacelist = null;
	this.$grid = null;
	
	this.updateModel = function(status){
		status.error |= !this.$grid.cleanErrors().checkMandatory(true);
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageDDNS.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){
			this.cleanButtonBar().$box.empty();
			this.$grid = this.$box.html("\
				<div class='grid rm'></div>\
				<div class='buttonsInline'>\
					<div class='button add'></div>\
					<div class='button del'></div>\
				</div>\
			").find('.grid').lightUIGrid([
				{ index: "host_name", name: "ddnsHost" },
				{ index: "service", name: "ddnsService" },
				{ index: "host_name_all", name: "ddnsFullHostName" },
				{ index: "usr_name", name: "ddnsUserName" },
				{ index: "password", name: "ddnsUserPass" }
				,{ index: "iface", name: "iface" }
				,{index: "period", name: "ddnsPeriod"}
			], 0, {
				selectable: true
			});
			this.$grid.bind("selection.grid", callback(this, function(){
				this.updateRuleButtons();
			}));
			this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell){
				this.$grid.cleanErrors();
				var row = this.$grid.row($cell.irow());
				var alias = $cell.getColAlias();
				if (alias == 'host_name'){
					var buf_host_name = row.col('host_name').fieldval();
					buf_host_name_split = buf_host_name.split('.')[0]; 
					if (!(_.isEqual(buf_host_name, buf_host_name_split)))
					{
						alert(lng('ddnsWrongHostName'));
						row.col('host_name').trigger("click");
					}
				var buf_host = row.col('host_name').fieldval() + '.' + row.col('service').fieldval();
					row.col('host_name_all').fieldval(buf_host);
				}
			}));
			this.$grid.colEditable("service", "select", {
					options: { 'DLinkDDNS': 'dlinkddns.com', 'DynDNS.com': 'dyndns.com'}
				});
			this.$grid.colEditable("host_name", "text", {
					mandatory: true
				})
				.colEditable("usr_name", "text", {
					mandatory: true
				})
				.colEditable("password", "text", {
					mandatory: true
				})
				.colEditable("period", "number", {
					mandatory: true
				})
				.colEditable("iface", "select", {
					mandatory: true,
					options: CreateIfacesValset(this.ifacelist, true)
				});
			this.$box.find('.add')
				.lightUIButton("add")
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.addRow().row("last").col("host_name").trigger("click");
					this.updateRuleButtons();
				}));
			this.$box.find('.del')
				.lightUIButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.selection().hide();
					this.updateRuleButtons();
				}));
			for(var i = 0; this.ddns && i < this.ddns.length; i++){
				var rule = this.ddns[i];
				var $row = this.$grid.addRow().row("last");
				$row.col("service").fieldval(rule.service);
				$row.col("iface").fieldval(rule.iface);
				$row.col("host_name").fieldval(rule.host_name.split('.')[0]);
				$row.col('host_name_all').fieldval($row.col("host_name").fieldval() + '.' + $row.col("service").fieldval());
				$row.col("usr_name").fieldval(rule.usr_name);
				$row.col("password").fieldval(rule.pass);
				$row.col("period").fieldval(rule.period);
			}
			this.$grid.resetAll();
			this.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(gridActionConverter(this.$grid));
						this.$grid.selection().removeRow();
					}
				}));
				
			this.updateRuleButtons();

		}
	}
	
	this.updateRuleButtons = function(){
		
		var all = this.$grid.nrow();
		var hid = this.$grid.find("tbody tr").filter(':hidden').length;
		if(all > 0) {
			this.$box.find('.add').lightUIButton("add").disable();		
		} else {
			this.$box.find('.add').lightUIButton("add").enable();
		}	  
		  
		if((all - hid) < 1) {
			this.$box.find('.add').lightUIButton("add").enable();
		} else {
			this.$box.find('.add').lightUIButton("add").disable();
		}
		
		if(this.$grid.selection().not(":hidden").length) {
			this.$box.find('.del').lightUIButton("button_del").enable();
		} else{
			this.$box.find('.del').lightUIButton("button_del").disable();			
		}
		
	}	
	
	this.save = function(actions){
		if (actions.count) {
			rootView.showModalOverlay();
			var query = { remove: [], write: [] };
			//if (actions.deleted.length && actions.deleted.length == this.$grid.nrow() - this.$grid.newRows().length) {
			//	query.remove.push([ 6, { clear: true }]);
			//} else {
				for (var i = 0; i < actions.deleted.length; i++) {
					query.remove.push([ 6, this.ddns[actions.deleted[i]], actions.deleted[i]]);
				}
			//}
			var temp = actions.changed.concat(actions.added);
			var r_temp = actions.r_changed.concat(actions.r_added);
			for (var i = 0; i < temp.length; i++) {
				var $row = this.$grid.row(temp[i]);
				query.write.push([ 6, {
					"service": $row.col("service").fieldval(),
					"host_name": $row.col("host_name_all").fieldval(),
				//	"host_name_all": $row.col("host_name_all").fieldval(),
					"usr_name": $row.col("usr_name").fieldval(),
					"pass": $row.col("password").fieldval()
					
					,"period": $row.col("period").fieldval()
					,"iface": $row.col("iface").fieldval()
				}, $row.isNew()?-1:r_temp[i]]);
			}
			device.config.multi(query, callback(this, function(data){
				rootView.hideModalOverlay();
				this.update();
			}));
		}
	}
	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read([
			 6,
			 120,
		], callback(this, function(data){
			this.ddns = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.ddns:null;
			this.ifacelist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.iface_names:{};
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
	
}
extend(pageDDNS, node);





















 
function jsDefPassController(){
	jsDefPassController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsDefPassClientView};
	this.ifaceTypes.server = {type: jsDefPassServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.nextIface = "server";
	this.addIface();
	
	this.addChild(new jsInputExController(), "hint");
	this.addChild(new jsInputExController(), "password");
	this.addChild(new jsInputExController(), "confirm");
	
	/**Обработчик события updaterq.
	 * Переправляет запрос на обновление своему потомку, которому оно реально нужно.
	 */
	this.onupdaterq = function(){
		return true;
	}
	
	this.onupdmodel = function() {
		return true;
	}
	
	this.addEventHandler("updaterq", this.onupdaterq);
	this.addEventHandler("updmodel", this.onupdmodel);
}
extend(jsDefPassController, jsWindowController);

 
function jsDefPassClientView(ctrl, viewInx, options){	
	var obj;
	
	obj = ctrl.getChild('hint');
	obj.nextIface = 'texter';
	obj.ifaceTypes.texter.options = {
		humanName: 'passwDesc'
	};
	
	obj = ctrl.getChild('password');
	obj.nextIface = 'inputer';
	obj.ifaceTypes.inputer.options = {
		humanName: 'passwPassword',
		passwd: true,
		maxLength: 31
	};
	
	obj = ctrl.getChild('confirm');
	obj.nextIface = 'inputer';
	obj.ifaceTypes.inputer.options = {
		humanName: 'passwConfirm',
		passwd: true,
		maxLength: 31
	};
	
	this.save = function(){
		var res = true;
		//this.showModalOverlay();
		this.disableAction("button_conf_save");

		this.updateModel();
		
		var conf = this.getChild("confirm");
		var passw = this.getChild("password");
		var password = passw.ctrl.model.toString();
		var confirm = conf.ctrl.model.toString();
		var re = new RegExp("[А-яЁё]+", "g");
		if (re.test(password)||re.test(confirm))
			{
				conf.statusCode = "passwConfirmCirill";
				passw.statusCode = "passwConfirmCirill";
				res = false;
			}
		if(password != ''){
			if(confirm != password){
				conf.statusCode = "passwConfirmMismatch";
				passw.statusCode = "passwConfirmMismatch";
				res = false;
			}
		}
		else{
			passw.statusCode = "passwPasswordEmpty";
			res = false;
		}
		//conf.setError();
		//passw.setError();
		
		if(res){
			this.ctrl.event("saverq");
			this.hide();
			if ( $('#blockFastmenu') ) {
				$('#blockFastmenu').css('position', 'static');
			}
		}
		else{
			this.bounce();
			this.enableAction("button_conf_save");
			//this.hideModalOverlay();
			//alert(lng("passwErrors"));
		}
	}
	
	this.cancel = function(){
		this.hide();
	}
	
	options.title = 'menu_system_passw';
	options.draggable = true;
	options.action = [ { name: 'button_save', func: this.save}, {name: 'dialogClose', func: this.cancel}];
	
	/**Конец запроса к серверу*/
	this.onendrequest = function(){
		this.enableAction("save");
	}
	
	jsDefPassClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function() {
		jsDefPassClientView.superclass.drawView.call(this);
		$(this.viewBoxSel+' input').keypress(context(this).callback(function(event){
			if (event.which == 13) {
				this.save();
			}
		}));
	}
	
	this.bind("endrequest", this.onendrequest);
}
extend(jsDefPassClientView, jsWindowClientView);

 
function jsDefPassServerView(ctrl, viewInx, options){
	jsDefPassServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	 /**Действия по приходу ответа от сервера*/
	this.pickData = function() {
		this.ctrl.event("endrequest");
		var data = this.options.sender.responseData;
		if(data && !data.baddata) {
			if ( data.rq[0].status ==  52 ) {
				alert(lng('passwInvalidLogin'));
			} else {
				if(this.options.defpassw){
					location.reload(true);
				}
			}
		}
	}

	/**Подготовить данные для запроса к серверу*/
	this.prepareData = function(){
		var obj;
		//var delim = "|";
		var ctrl = this.ctrl;

		obj = {
			v2: "y",
			rq: 2,
			res_json0:"y",
			res_data_type0: "json",
			res_config_action0:  3,
			res_config_id0:  69,
			res_struct_size0: 1,
			res_cmd1: 20,
			res_buf1: null,
			res_cmd_type1: "bl"
		};
		
		var login;
		var cookie_login = getCookie("client_login");
		login = cookie_login || "admin";		
		jsonOutObj = {
					login:	login,
					pass: 	ctrl.getChild("password").model.value
		};
		obj.res_buf0 = $.toJSON(jsonOutObj);
		this.addToRequest(obj);
	}
	
	/**Запрос на посылку данных*/
	this.onsaverq = function(){
		this.updateView();
	}
	
	this.bind("saverq", this.onsaverq);
}
extend(jsDefPassServerView, jsSSideView);






















function pageDeviceInfo(){
	pageDeviceInfo.superclass.constructor.call(this);
	
	this.info = null;
	
	this.add(new nodestatic("devInfoName"), "name")
		.add(new nodestatic("devInfoVersion"), "version")
		.add(new nodestatic("devInfoBuildTime"), "buildtime")
		.add(new nodestatic("devInfoVendor"), "vendor")
		.add(new nodestatic("devInfoBugs"), "bugs")
		.add(new nodestatic("devInfoSummary"), "summary")
		.add(new nodestatic("devInfoBoardId", '', {
			hidden: true
		}), "boardid");
	this.add(new nodestatic("devInfoSoftRev"), "softrev");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageDeviceInfo.superclass.updateView.apply(this, arguments);
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 67, callback(this, function(data){
			this.deep.updateView();
			var info = this.info = (is.RPC_SUCCESS(data))?data.resident:null;
			if (info) {
				info.fw_bugs = info.fw_bugs.replace('<', '').replace('>', '');
				this.child("name").val(info.fw_name);
				this.child("version").val("<a onclick=\"window.location.hash='#system/firmware';return false;\" href='#'>" + info.fw_version + "</a>");
				this.child("buildtime").val(info.fw_date);
				this.child("vendor").val(info.fw_vendor);
				this.child("bugs").val("<a href='mailto:" + info.fw_bugs + "'>" + info.fw_bugs + "</a>");
				this.child("summary").val(info.fw_summary);
			}
				this.child("softrev").val( "2a7840c8ee18badaca3f6abcfd539ed559547d94");
			rootView.hideModalOverlay();
		}));
	});
}
extend(pageDeviceInfo, node);





















$.extend( true, devu.iptv, new function(){
		
	this.pull = function(__success, __fail){
		devu.vlan.pull(__success, __fail);
		return this;
	};
	
	this.push = function(__success, __fail){
		devu.vlan.push(__success, __fail);
		return this;
	}
	
	this.getPortMap = function( __vid ){

		return this.getPortMapEx({ vid: __vid });
	}
	
	this.getPortMapEx = function( __options ){
		var portMap = makeLanPortMap.call( this );
		var parr;
		var pwan = devu.vlan.getWanPorts()[ 0 ];
		
		if( __options.vid ){
			
			var v = selectBridge( __options.vid, __options.name );
				
			if( v ){
				
				parr = pickLanPorts.call( this, pickFitPorts( v.ports ) );
				_.each( parr , function( __p ){ portMap[ __p ] = true });
			}
		}
		else{
			
			var wanu = devu.vlan.groupByType().wanu;
			
			if( wanu && wanu.length ){

				var v = _.find( wanu, function( __v ){ return _.find( __v.ports, function( __p ){ return __p == pwan })});

				if( v ){

					parr = pickLanPorts.call( this, pickFitPorts( v.ports ) );
					_.each( parr , function( __p ){ portMap[ __p ] = true });
				}
			}
		}

		return portMap;
	}

	this.setPortMap = function( __portMap, __vid ){

		return this.setPortMapEx( __portMap, { vid: __vid });
	}
	
	this.setPortMapEx = function( __portMap, __options ){
						
		var portArrSelected = splitPortMap( __portMap, function( __value, __key ){ return __value ? __key : '' } );
		
		if (portArrSelected.length) {
			for (var i = 0; i <= portArrSelected.length; i++) {
				if(_.indexOf(makeBusyPortMap(__options), portArrSelected[i]) + 1) {
					return "iptvPortsInUse";
				}
			}
		}
		
		
			
			
		
		var portArrUnselected = splitPortMap( __portMap, function( __value, __key ){ return __value ? '' : __key } );
		
		if( __options.vid ){

			var portArrWanToLan = cutFromBridge( portArrUnselected, __options );
			cutFromLan( portArrSelected );
			addToLan( portArrWanToLan );
			addToBridge( portArrSelected, __options );
		}
		else{
			
			var portArrWanToLan = cutFromWan( portArrUnselected );
			cutFromLan( portArrSelected );
			addToLan( portArrWanToLan );
			addToWan( portArrSelected, __options );
		}
		
		return null;
	}
	
	this.getFreePorts = function( __vid ){

		return this.getFreePortsEx({ vid: __vid });
	}
	
	this.getFreePortsEx = function( __options ){
		
		var pmap = _.keys(makeLanPortMap.call( this ));
		var pvlfree = devu.vlan.getFreePorts();
		var plan = vlan.groupByType().lan[0].ports;
		var pfree = plan.concat(pvlfree);
				
		if( __options.vid ){
			
			var v = selectBridge( __options.vid, __options.name );
			if (v) {
				var pbridge = v.ports;
				pfree = pbridge.concat(pfree); 				
			}
			
		}
		else{	
			var wanu = vlan.groupByType().wanu[0];
			if (wanu) {
				var pwan = wanu.ports;
				pfree = pwan.concat(pfree);
			} 
		}
		pfree = _.intersection(pmap, pfree);
		return _.sortBy(pfree, function(num) {return num;});
	}
	
	//Helper functions
	
	var pickFitPorts = function(__parr){
		return _.filter(__parr, function(__p){ return __p.match(/port\d+/) ? true : false });
	}
	
	var pickLanPorts = function(__parr){

		return _.filter(__parr, function(__p){ return !devu.vlan.isWan( __p )}, this );

	}
	
	var makeLanPortMap = function(){
		var pmap = {};
		
		var parr = devu.vlan.PORTS.sort();
		
		_.each( parr, function( __value ){
			if( __value.match( /port\d+/ ) && !devu.vlan.isWan( __value )){
				pmap[ __value ] = false;
			}
		}, this );
		
		return pmap;
	}
		
	var splitPortMap = function( __portMap, __iter ){ return _.filter( _.map( __portMap, __iter ), function( __p ){ return __p } ) };
		
	var cutFromWan = function( __parr ){
		var wanu = devu.vlan.groupByType().wanu;
		var pos, v, parr = [];
		
		if( wanu ){
			for( var i=0; i<wanu.length; i++ ){
				pos = wanu[ i ].pos;
				v = devu.vlan.cut( pos );
				parr = parr.concat( _.intersection( v.ports, __parr ) );
				v.ports = _.difference( v.ports, __parr );;
				devu.vlan.set( pos, v );
			}
		}
		
		return parr;
	}

	var cutFromLan = function( __parr ){
		var pos = devu.vlan.groupByType().lan[ 0 ].pos;
		var pos, v;
		
		v = devu.vlan.cut( pos );
		v.ports = _.difference( v.ports, __parr );
		devu.vlan.set( pos, v );
	}
				
	var addToLan = function( __parr ){
		var pos = devu.vlan.groupByType().lan[ 0 ].pos;
		var pos, v;
		
		v = devu.vlan.cut( pos );
		v.ports = _.uniq( v.ports.concat( __parr ) );
		devu.vlan.set( pos, v );
	}
		
	var addToWan = function( __parr, __options ){
		var wanu = devu.vlan.groupByType().wanu;
		var pos, v;
		var pwan = devu.vlan.getWanPorts()[ 0 ];
		
		if( wanu && wanu.length ){
			pos = wanu[ 0 ].pos;
			v = devu.vlan.cut( pos );
			v.ports.push( pwan );
			v.ports = _.uniq( v.ports.concat( __parr ) );

			if( __options.name ) v.name = __options.name;

			devu.vlan.set( pos, v );
		}
		else{
			v = {
				name: "wan_auto_" + gID.get(),
				type: "wanu",
				en: true,
				ports: _.uniq( __parr )
			}

			v.ports.push( pwan );

			if( __options.name ) v.name = __options.name;

			devu.vlan.add( v );
		}
	}
		
	var cutFromBridge = function( __parr, __options ){
		
		var parr = [];
		var v = selectBridge( __options.vid, __options.name );

		if( v ){
			
			var pos = v.pos;
			v = devu.vlan.cut( pos );	//теперь это копия v
			parr = parr.concat( _.intersection( v.ports, __parr ) );
			v.ports = _.difference( v.ports, __parr );;
			devu.vlan.set( pos, v );
		}
		
		return parr;
	}
		
	var addToBridge = function( __parr, __options ){

		var pwan = devu.vlan.getWanPorts()[ 0 ];
		var v = selectBridge( __options.vid, __options.name );		

		if( v ){

			var pos = v.pos;
			v = devu.vlan.cut( pos ); //теперь это копия v
			v.port = pwan;
			v.ports = _.uniq( v.ports.concat( __parr ) );

			if( __options ) setOptions();

			devu.vlan.set( pos, v );
		}
		else{

			v = {
				name: "wan_auto_" + gID.get(),
				type: "bridge",
				en: true,
				port: pwan,
				ports: _.uniq( __parr )
			}
			
			if( __options ) setOptions();
			
			devu.vlan.add( v );
		}

		function setOptions(){
			
			if( __options.name ) v.name = __options.name;
			if( __options.qos ) v.qos = __options.qos;
			if( __options.vid ) v.vid = __options.vid;
		}
	}
	
	var selectBridge = function( __vid, __name ){
	
		var bridge = devu.vlan.groupByType().bridge;		
		var v = null;
		
		if( bridge ){
			
			v = _.find( bridge, function( __v ){ return __v.vid == __vid });
			
			if( !v && __name ) v = _.find( bridge, function( __v ){ return __v.name == __name });
		}
		
		return v;
	}

	var makeFreePortMap = function(vid){
		return devu.iptv.getFreePorts(vid.vid);
	} 
 
	var makeBusyPortMap = function(vid){
		var pmap = _.keys(makeLanPortMap.call( this ));
		return _.difference(pmap, devu.iptv.getFreePorts(vid.vid));
	} 

} );

iptv = devu.iptv;























devu.vlan.__VLAN_WANU_LIMIT = 1;



		devu.vlan.__MENU_VLAN_NO_DB_TAG = true;


$.extend( true, devu.vlan, new function(){
		
	this.pull = function(__success, __fail){
		device.config.read([  119,  129 ], callback(this, function(data){
			if(!is.RPC_SUCCESS(data)){
				if(is.func(__fail)) __fail();
				return this;
			}

			this.RAW_DATA = data.rq[ 0 ].resident;
			this.DATA = twfAll(this.RAW_DATA.vlans);
			this.PORTS = this.RAW_DATA.avail_ports;
			this.PORT_STATUS = data.rq[ 1 ].resident;
			this.IFACE_NAMES = data.rpcWAN.iface_names;

			this.resetAll();
			debug("vlan.pull: Data received");

			if(is.func(__success)) __success();
		}));

		return this;
	};
	
	this.push = function(__success, __fail){
		var actions = this.commit();
		
		if(actions.write || actions.remove){
			device.config.multi(actions, callback(this, function(data){
				if(is.RPC_SUCCESS(data)){
					debug("vlan.push: Data sent");
					if(is.func(__success)) __success();
				}
				else{
					debug("vlan.push: Sending error");
					if(is.func(__fail)) __fail();
				}
					
			}));
		}
		else{
			debug("vlan.push: Nothing to push");
			if(is.func(__success)) __success();
		}
		
		return this;
	};

	this.commit = function(){
		var actions = {}
		var groups = this.status();
		var rpc =  119;
		var vlansRaw = this.RAW_DATA.vlans;
		var v;
		
		if(this.RAW_DATA.version >= 1){
			
			if(groups.edited || groups.added || groups.removed){
				
				var vlansRawOut = [];
				var vlans = devu.vlan.show();
				var v, vraw, vrawOut;
				
				for(var i=0, j=0; i<vlans.length; i++){
					
					v = vlans[i];
					
					if(v.status != 'removed'){
						
						vraw = vlansRaw[v.pos];
						
						if(vraw){

							vrawOut = $.extend(false, vraw, trfAny(v))
						}
						else{
							
							vrawOut = $.extend(false, {}, trfAny(v));
						}
						
						vrawOut.pos = j++;
						vlansRawOut.push(vrawOut);
					}
				}
				
				actions.write = [[rpc, {vlans: vlansRawOut}]];
			}
		}
		else{
		
			if(groups.edited || groups.added){
				actions.write = [];
				
				if(groups.edited){
					for(var i=0; i<groups.edited.length; i++){
						v = groups.edited[i];
						actions.write.push([rpc, $.extend(false, vlansRaw[v.pos], trfAny(v)), v.pos])
					}
				}
	
				if(groups.added){
					for(var i=0; i<groups.added.length; i++){
						v = groups.added[i];
						actions.write.push([rpc, trfAny(v), v.pos])
					}
				}
	
			}
			
			if(groups.removed){
				actions.remove = [];
	
				for(var i=0; i<groups.removed.length; i++){
					v = groups.removed[i];
					actions.remove.push([rpc, { pos: v.pos }, v.pos])
				}
			}
		}
		
		return actions;
	};

	this.resetAll = function(){
		this.WORK_COPY = _deepClone(this.DATA); 
		return this;
	};
	
	this.cut = function(inx){
		var vlan = this.WORK_COPY[inx];
		var vlanCopy = _deepClone(vlan);
		delete vlanCopy.status;
		delete vlanCopy.pos;
		vlan.status = 'removed';
		return vlanCopy;
	};
	
	this.set = function(inx, __v){
		var vold = this.WORK_COPY[inx];
		if(vold && vold.status != 'removed') return 'vlanCutFirst';

		var v = _deepClone(__v);

		v.pos = inx;

		var error = valAny.call(this, v);		
		if(!error) this.WORK_COPY[inx] = v;
			
		return error;
	};

	this.add = function(__v){
		return this.set(this.WORK_COPY.length, __v);
	};
	
	this.factory = function(){
		
		var wports = this.getWanPorts();
		var lports = this.getLanPorts();
		
		varr = this.show();
		
		for( var i=0; i < varr.length; i++ ){ this.cut( i ) };
			
		this.set( 0, {
			en: true,
			name: 'lan',
			ports: lports,
			type: 'lan'
		});
		
		this.set( 1, {
			en: true,
			name: 'wan',
			ports: wports,
			type: 'wanu'
		});
		
		return this;
	}


	this.testTransforms = function(){
		var vbefore = this.RAW_DATA.vlans;
		var vafter = trfAll(twfAll(this.RAW_DATA.vlans));
		
		if(vbefore.length != vafter.length) return false;
		
		//восстановить мусор
		for(var i=0; i<vbefore.length; i++){
			delete vafter[i].pos; //Её нет во входных данных но, она нужна в выходных
			vafter[i] = $.extend(true, {}, vbefore[i], vafter[i]);
		}

		return _.isEqual(vbefore, vafter);
	}
	
	this.getFreePorts = function(__type){
		return _.difference(this.PORTS, pickPorts(this.WORK_COPY));
	}
	
	this.getFreePortsU = function(__type){
		var parr = this.getFreePorts();
		if((__type == 'bridge') && devu.vlan.__MENU_VLAN_NO_DB_TAG){
			parr = _.filter(parr, function(__value){ return !devu.vlan.isWan(__value) && !__value.match(/wifi/) });
		}
		
		return parr;
	}
	
	this.getFreePortsT = function(__type){
		var parr = this.getAvailPorts();
		
		if(__type == 'bridge'){
			if (devu.vlan.__MENU_VLAN_NO_DB_TAG) {
				parr = _.filter(parr, function(__value){ return devu.vlan.isWan(__value) || __value.match(/wifi/) });
			};
			if (devu.vlan.__VLAN_WANT_BRIDGE_NOT_WIFI) {
				parr = _.filter(parr, function(__value){ return devu.vlan.isWan(__value)});
			}
		}
		
		return parr;
	}
	
	this.getWanPorts = function(){
		
		return _.filter(this.PORTS, function(__p){ return devu.vlan.isWan(__p) });
	}
	
	this.getLanPorts = function(){
		
		return _.filter(this.PORTS, function(__p){ return !devu.vlan.isWan(__p) });
	}
	
	this.getAvailPorts = function(){
		return _deepClone(this.PORTS);
	}
	
	this.status = function(){
		
		if( !this.RAW_DATA.version ){
			debug("vlan.status: The guaranteed safe actions for device.utils.vlan in a single push request is: 1 editing or 1 removing or several adding.");
			debug("vlan.status: Check for the status to avoid collisions!");
		}
		
		return _.groupBy(this.WORK_COPY, callback(this, function(__v, inx){
			if(__v.pos >= this.DATA.length){
				return __v.status == 'removed' ? 'refused' : 'added';
			}
			else if(__v.status == 'removed'){
				return __v.status;
			}
			else if(!_.isEqual(__v, this.DATA[inx])){
				return 'edited';
			}

			return 'unchanged';
		}));
	}
	
	this.show = function(){
		return this.WORK_COPY;
	}
	
	this.groupByType = function(){
		return _.groupBy(this.WORK_COPY, callback(this, function(__v){ return __v.type; }));
	}
	
	this.isWan = function( __p ){
		
		return _.find( this.PORT_STATUS, function( __value, __key ){ return __key == __p && __value.is_wan }) ? true : false;

	}
	
	this.hasServices = function( __v ){
		
		if( __v.ifname ){
			
			var L2 = this.IFACE_NAMES[ __v.ifname ];
			
			if( L2 && L2.is_wan && L2.services ) return L2.services;
		}
		
		return null
	}
	
	//Helper functions

	var twfWanT = function(__v){
		var v = {
			name: __v.name,
			type: "want",
			vid: __v.vid,
			en: __v.en
		};
		
		var ports = __v.ports;
		
		for(var i in ports){
			v.port = i;
			v.qos = ports[i].qos;
			break;
		}
		
		return v;
	};

	var twfWanU = function(__v){
		var v = {
			name: __v.name,
			type: "wanu",
			en: __v.en,

			ports: []
		};

		
		var ports = __v.ports;
		
		for(var i in ports){
			v.ports.push(i);
		}
		
		return v;
	};
	
	var twfLan = function(__v){
		var v = twfWanU(__v);
		v.type = "lan";
		
		return v;
	}

	var twfBridge = function(__v){
		var v = {
			name: __v.name,
			type: "bridge",
			vid: __v.vid,
			en: __v.en,
			ports: []
		};
		

		var ports = __v.ports;
		
		for(var i in ports){
			if(ports[i].tag){
				v.port = i;
				v.qos = ports[i].qos;
			}
			else{
				v.ports.push(i);
			}
		}
		
		return v;
	};
	
	var twfAny = function(__v){
		var v;
		
		switch(__v.dest){
			case "wan":
				for(var i in __v.ports){
					if(__v.ports[i].tag) v = twfWanT(__v);
					else v = twfWanU(__v);
				}
			break;
			case "bridge":
				v = twfBridge(__v);
			break;
			case "lan":
				v = twfLan(__v);
			break
		}
		
		if(__v.ifname) v.ifname = __v.ifname;
		
		return v;
	};
	
	var twfAll = function(__arr){
		var arr = [], v;
		
		for(var i=0; i<__arr.length; i++){
			v = twfAny(__arr[i]);
			v.pos = i;
			if(v) arr.push(v);
		}
		
		return arr;
	};
	
	var trfWanT = function(__v){
		var v = {
			name: __v.name,
			dest: "wan",
			vid: __v.vid,
			en: __v.en,
			pos: __v.pos,
			not_delete: true,
			ports: {}
		};

		v.ports[__v.port] = {
			tag: true,
			qos: __v.qos
		};
		
		return v;
	};
	
	var trfWanU = function(__v){
		var v = {
			name: __v.name,
			dest: "wan",
			en: __v.en,
			pos: __v.pos,
			not_delete: true,
			ports: {}
		};
		

		for(var i=0; i<__v.ports.length; i++){
			v.ports[__v.ports[i]] = {
				tag: false
			};
		};
		
		return v;
	};

	var trfLan = function(__v){
		var v = trfWanU(__v);
		delete v.not_delete;
		v.dest = "lan";
		
		return v;
	}
	
	var trfBridge = function(__v){
		var v = {
			name: __v.name,
			dest: "bridge",
			vid: __v.vid,
			en: __v.en,
			pos: __v.pos,
			ports: {}
		};


		v.ports[__v.port] = {
			tag: true,
			qos: __v.qos
		};
		
		for(var i=0; i<__v.ports.length; i++){
			v.ports[__v.ports[i]] = {
				tag: false,
				qos: __v.qos
			};
		};
		
		return v;		
	};

	var trfAny = function(__v){
		switch(__v.type){
			case "wanu":
				return trfWanU(__v);
			case "want":
				return trfWanT(__v);
			case "bridge":
				return trfBridge(__v);
			case "lan":
				return trfLan(__v);
		}
		
		return null;
	};

	var trfAll = function(__arr){
		var arr = [], v;
		
		for(var i=0; i<__arr.length; i++){
			v = trfAny(__arr[i]);
			if(v) arr.push(v);
		}
		
		return arr;			
	};

	var pickPorts = function(__varr){
		var parr = [], ports, v;

		for(var i=0; i<__varr.length; i++){
			v = __varr[i];
			ports = v.ports;
			
			if(v.status == 'removed' || !_.isArray(ports)) continue;
			
			parr = parr.concat(ports);
		}
		
		return _.uniq(parr);
	}

	var isUniqVid = function(__vid, __varr){
		var v;
				
		for(var i=0; i<__varr.length; i++){
			v = __varr[i];
			if(v.status != 'removed' && v.vid == __vid) return false;
		}
		
		return true;
	}

	var isUniqName = function(__name, __varr){
		var v;
				
		for(var i=0; i<__varr.length; i++){
			v = __varr[i];
			if(v.status != 'removed' && v.name == __name) return false;
		}
		
		return true;
	}
		
	var valWanT = function(__v){
		var varr = this.WORK_COPY;
		
		if(!isUniqVid(__v.vid, varr)) return 'vlanVidBusy';
		if(!isUniqName(__v.name, varr)) return 'vlanNameBusy';

		return null
	}

	var valWanU = function(__v){
		var varr = this.WORK_COPY;

		if(!isUniqName(__v.name, varr)) return 'vlanNameBusy';

		if (devu.vlan.__MENU_VLAN_NO_DB_TAG) {
			if(!_.filter(__v.ports, function(__value){ return devu.vlan.isWan(__value) || __value.match(/wifi/)}).length ){
				return 'vlanNatRulesNoDbTag';
			}
		}

		var wanu = _.filter(this.groupByType().wanu, function(__value){ return __value.status != 'removed' });
		var wanuCount = wanu ? wanu.length : 0;
		
		if(wanuCount >= this.__VLAN_WANU_LIMIT) return 'vlanLimitWanU';
		return null
	}

	var valBridge = function(__v){
		var varr = this.WORK_COPY;

		if(!isUniqVid(__v.vid, varr)) return 'vlanVidBusy';
		if(!isUniqName(__v.name, varr)) return 'vlanNameBusy';

		return null
	}

	var valLan = function(__v){
		var varr = this.WORK_COPY;

		if(!isUniqName(__v.name, varr)) return 'vlanNameBusy';
		
		return null
	}

	var valAny = function(__v){
		var varr = this.WORK_COPY;
		var errorCode = null;

		switch(__v.type){
			case 'want':
				errorCode = valWanT.call(this, __v); break;
			case 'wanu':
				errorCode = valWanU.call(this, __v); break;
			case 'bridge':
				errorCode = valBridge.call(this, __v); break;
			case 'lan':
				errorCode = valLan.call(this, __v); break;
			default:
				errorCode = 'vlanUnknownType';
		}
		
		return errorCode;
	}

} );

vlan = devu.vlan;






















 
function jsDhcpServerModel(service){
	jsDhcpServerModel.superclass.constructor.call(this);
	
	/**узел DHCP сервера.
	 * @type	Object
	 */
	this.service = service;
	this.dhcpd = service.dhcpd;

}
extend(jsDhcpServerModel, jsModel);


function jsDhcpServerController(dhcpd){
	jsDhcpServerController.superclass.constructor.call(this);

	/**Инициализация формы*/
	this.initForm = function(){
		var service = this.model.service;
		var dhcpd = this.model.dhcpd;
		if(dhcpd.enable && !dhcpd.relay){
			this.getChild("mode").model.value = "en";
		}
		else if(dhcpd.enable && dhcpd.relay){
			this.getChild("mode").model.value = "relay";
			//external ip
			this.getChild("divRelay", "ip").model.setParts(dhcpd.relay.ip);
		}
		else{
			this.getChild("mode").model.value = "dis";
		}
	if (!modeAP()){
		divMain.getChild("dnsRelay").model.value = dhcpd.dns_relay;
	}
		divMain = this.getChild("divMain");
		//tftp_ip
		
		divMain.getChild("tftp_ip").model.setParts(dhcpd.tftp_ip);
		//start_ip
		if (is.unset(dhcpd.start_ip)){
			var arrIp = service.ip.split(".");
			if (arrIp[3] == "255"){
				arrIp[3] = "1";
			}else{
				arrIp[3] = parseFloat(arrIp[3]) + 1;
			}
			var tempIp = arrIp[0] + "." + arrIp[1] + "." + arrIp[2] + "." + arrIp[3];
			dhcpd.start_ip = tempIp;
		};
		divMain.getChild("begin").model.setParts(dhcpd.start_ip);
		//end_ip
		if (is.unset(dhcpd.end_ip)){
			var arrIp = service.ip.split(".");
			if (arrIp[3] == "255"){
				arrIp[3] = "100";
			}else if (parseFloat(arrIp[3]) < 155){
				arrIp[3] = parseFloat(arrIp[3]) + 99;
			}else{
				arrIp[3] = "255";
			}
			var tempIp = arrIp[0] + "." + arrIp[1] + "." + arrIp[2] + "." + arrIp[3];
			dhcpd.end_ip = tempIp;			
		};
		divMain.getChild("end").model.setParts(dhcpd.end_ip);
		//lease
		if(dhcpd.lease && parseInt(dhcpd.lease, 10) != "NaN"){
			divMain.getChild("lease").model.value = dhcpd.lease/60;
		}else{
			divMain.getChild("lease").model.value = "1440";
		}
		//gwip
		divMain.getChild("gwip").model.setParts(dhcpd.gwip);
		//dns_prim
		divMain.getChild("dns_prim").model.setParts(dhcpd.dns_prim);
		//dns_sec
		divMain.getChild("dns_sec").model.setParts(dhcpd.dns_sec);
		
	}
	
	this.changeModel(new jsDhcpServerModel(dhcpd));
	this.ifaceTypes.client = {type: jsDhcpServerClientView};
	this.ifaceTypes.client.options = {nothing:true};
	
	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(), "mode");

	var divRelay = this.addChild(new jsFieldSetController(), "divRelay");
	divRelay.addChild(new jsIPv4Controller(), "ip");

	var divMain = this.addChild(new jsFieldSetController(), "divMain");
if (!modeAP()){
	divMain.addChild(new jsInputController(), "dnsRelay");
}
	divMain.addChild(new jsIPv4Controller(), "tftp_ip");
	divMain.addChild(new jsIPv4Controller(), "begin");
	divMain.addChild(new jsIPv4Controller(), "end");
	divMain.addChild(new jsIPv4Controller(), "gwip");
	divMain.addChild(new jsIPv4Controller(), "dns_prim");
	divMain.addChild(new jsIPv4Controller(), "dns_sec");
	divMain.addChild(new jsInputController(), "lease");
	
	
	this.initForm();
}
extend(jsDhcpServerController, jsFieldSetController);



function jsDhcpServerClientView(ctrl, viewInx, options){
	var obj;
	
	/**Выставляет событие по завершению отрисовки HTML*/
	this.drawView = function(){
		jsDhcpServerClientView.superclass.drawView.call(this);
		this.ctrl.event("drawn");
	}
	
	/**Обработчик события drawn*/
	this.ondrawn = function(){
		this.adaptForm();
		return false;
	}
	
	
	/**Обработчик события fieldchange*/
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;
		this.getChild("mode").updateModel();
		this.adaptForm();
		
		
		return false;
	}
	
	/**Настроить форму в соотв. с установленными полями.*/
	this.adaptForm = function(){
		switch(this.ctrl.getChild("mode").model.value){
			case "en":
				this.getChild("divRelay").hide();
				this.getChild("divMain").show();
				break;
			case "dis":
				this.getChild("divRelay").hide();
				this.getChild("divMain").hide();
				break
			case "relay":
				this.getChild("divRelay").show();
				this.getChild("divMain").hide();
				break;
		}		
	}
	
	/**Откорректировать DHCP пул в соотв. с IP адресом и маской LAN
	 * @param	jsSubNetIPModel			ipref		IP адрес LAN
	 * @param	jsSubNetIPModel			maskref		Маска LAN
	 * @param	jsFieldSetClientView	div			Где менять диапазон адресов. Если не установлен, то меняем IPv4 адреса в divMain
	 */
	this.correctDHCP = function(ipref, maskref, div){
		var res = false;
		var ip;
		var mode;
		
		if(div && div.ctrl.alias == "divIPv6Params"){
		}
		else{
			mode = this.getChild("mode");
			if(!mode.updateModel() || mode.ctrl.model.toString() != "en"){
				return res;
			}
		}
		
		
		if((ipref instanceof jsSubNetIPModel)){
			ip = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero);
		}

		if(maskref){
			var mask = new jsSubNetIPModel(maskref.bits, maskref.toString(), maskref.radix, maskref.delim, maskref.expandZero);
			var subnet = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero);
			var startPartInx = null;
			var i;
			var n;
			var partMask = Math.pow(2, mask.partBitCount) - 1;
	
			for(i=subnet.parts.length-1;i>=0;i--){
				subnet.parts[i] = ip.parts[i] & mask.parts[i];
				n = Math.log((partMask & ~(mask.parts[i])) + 1)/Math.LN2;
				if(n.toFixed(0) != n){
					alert(lng("dhcpMaskHoleRidden"));
					return;
				}
			}
		}
		else{
			var subnet = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero);
			subnet.applyMask();
			var mask = new jsSubNetIPModel(ipref.bits, ipref.toString());
			var m = mask.getMaskParts();
			mask.parts = m;
			mask.bimask = mask.bits;
			var startPartInx = null;
			var partMask = Math.pow(2, mask.partBitCount) - 1;
		}

		var rangeStart = new jsSubNetIPModel(subnet.bits, subnet.toString(), subnet.radix, subnet.delim, subnet.expandZero);
		var rangeEnd = new jsSubNetIPModel(subnet.bits, subnet.toString(), subnet.radix, subnet.delim, subnet.expandZero);
		for(i in mask.parts){
			rangeEnd.parts[i] = (partMask & ~(mask.parts[i])) | subnet.parts[i];
			if(no(startPartInx) && (mask.parts[i] < partMask)){
				startPartInx = i;
			}
		}
		rangeEnd.parts[rangeEnd.parts.length - 1]--;
		rangeStart.parts[rangeStart.parts.length - 1]++;
		
		if(rangeEnd.parts[rangeEnd.parts.length - 1] > rangeStart.parts[rangeStart.parts.length - 1]){
				var divMain = div?div:this.getChild("divMain");
				var begin = divMain.ctrl.getChild("begin").model;
				var end = divMain.ctrl.getChild("end").model;
				if((ip.parts[startPartInx]-rangeStart.parts[startPartInx]) > (rangeEnd.parts[startPartInx] - ip.parts[startPartInx])){
					for(i in begin.parts){
						begin.parts[i] = rangeStart.parts[i];
						end.parts[i] = ip.parts[i];
					}
					end.parts[ip.parts.length - 1]--;
				}
				else{
					for(i in begin.parts){
						begin.parts[i] = ip.parts[i];
						end.parts[i] = rangeEnd.parts[i];
					}
					begin.parts[ip.parts.length - 1]++;
				}
				res = true;
		}
		else{
			alert(lng("dhcpCorrectImpos"));
		}

		return res;
	}
	
	/**Обновить модель.
	 */
	this.updateModel = function(){
		var res = jsDhcpServerClientView.superclass.updateModel.call(this);
		if(res){
			var dhcpd = this.ctrl.model.dhcpd;

			//Обнулить
			dhcpd.relay = null;
			dhcpd.start_ip = null;
			dhcpd.end_ip = null;
			dhcpd.lease = null;
		if (!modeAP()){
			dhcpd.dnsRelay = null;
		}

			var dhmode = this.getChild("mode").ctrl.model.value;
			dhcpd.enable = (dhmode == "en" || dhmode == "relay");
			if(dhmode == "relay"){
				dhcpd.relay = {ip: this.getChild("divRelay", "ip").ctrl.model.toString()};
			}
			else if(dhmode == "en"){
				var dhcpdDivMain = this.getChild("divMain");
				dhcpd.tftp_ip = dhcpdDivMain.getChild("tftp_ip").ctrl.model.toString();
				dhcpd.start_ip = dhcpdDivMain.getChild("begin").ctrl.model.toString();
				dhcpd.end_ip = dhcpdDivMain.getChild("end").ctrl.model.toString();
				dhcpd.lease = dhcpdDivMain.getChild("lease").ctrl.model.value;
				if(dhcpd.lease){
					dhcpd.lease = dhcpd.lease*60;
				}
			if (!modeAP()){
				dhcpd.dns_relay = dhcpdDivMain.getChild("dnsRelay").ctrl.model.value;
			}
				dhcpd.gwip = dhcpdDivMain.getChild("gwip").ctrl.model.toString();
				dhcpd.dns_prim = dhcpdDivMain.getChild("dns_prim").ctrl.model.toString();
				dhcpd.dns_sec = dhcpdDivMain.getChild("dns_sec").ctrl.model.toString();
			}
			
		}
		
		return res;
	}
	
	this.blocks = ctrl.model.dhcpd.blocks;

	options.title = lng("dhcpMain");
	
	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "dhcpMain"
	};
	if(this.blocks){
		obj.ifaceTypes.separator.options.hide = true;
	}


	var modeList = { };
	modeList["dhcpModeEn"] = "en";
	modeList["dhcpModeDis"] = "dis";
	if (!modeAP()){
		modeList["dhcpModeRelay"] = "relay";
	};

	obj = ctrl.getChild("mode");
	obj.nextIface = "select";
	obj.ifaceTypes.select.options = {
		humanName: "dhcpMode",
		valset: modeList
	};
	if(this.blocks){
		obj.ifaceTypes.select.options.humanName = "dhcpModeBlock";
	}

	var divRelay = ctrl.getChild("divRelay");
	divRelay.nextIface = "client";
	divRelay.ifaceTypes.client.options = {nothing: true};

	obj = divRelay.getChild("ip");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "dhcpExtIp";

	var divMain = ctrl.getChild("divMain");
	divMain.nextIface = "client";
	divMain.ifaceTypes.client.options = {nothing: true};
	
if (!modeAP()){
	obj = divMain.getChild("dnsRelay");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "dnsRelay",
		valset: {on:true, off:false}
	};
};

	obj = divMain.getChild("tftp_ip");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "tftp_ip";
	opt.optional = true;
	opt.hide = true;
	obj = divMain.getChild("begin");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "dhcpBegin";

	obj = divMain.getChild("end");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "dhcpEnd";

	obj = divMain.getChild("gwip");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanGwIp";
	opt.optional = true;
	opt.hide = true;

	obj = divMain.getChild("dns_prim");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanPrimDns";
	opt.optional = true;
	opt.hide = true;

	obj = divMain.getChild("dns_sec");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanSecDns";
	opt.optional = true;
	opt.hide = true;

	obj = divMain.getChild("lease");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "dhcpLease",
		minval: 2
	};
	

	jsDhcpServerClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.bind("drawn", this.ondrawn);
	this.bind("fieldchange", this.onfieldchange);
}
extend(jsDhcpServerClientView, jsFieldSetClientView);






















function jsDhcpServerMacModel(dhcpd, lanClients, dhcpClients){
	jsDhcpServerMacModel.superclass.constructor.call(this);
	
	this.dhcpd = dhcpd;
	this.lanClients = lanClients;
	this.dhcpClients = dhcpClients;
}
extend(jsDhcpServerMacModel, jsModel);

function jsDhcpServerMacController(dhcpd, lanClients, dhcpClients){
	jsDhcpServerMacController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsDhcpServerMacClientView};
	this.ifaceTypes.client.options = {inputPadding: "200px", simple:true};
	
	this.changeModel(new jsDhcpServerMacModel(dhcpd, lanClients, dhcpClients));

	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsMACRuleController(), "clients");
}
extend(jsDhcpServerMacController, jsFieldSetController);

function jsDhcpServerMacClientView(ctrl, viewInx, options){
	
	this.onruleselect = function($obj){
		var $row = $grid.addRow().row("last");
		$row.col("ip").html($obj.col("ip").html());
		$row.col("mac").html($obj.col("mac").html());
		$row.col("host").html($obj.col("host").html())
						.click();

		return false;
	}
	
	this.drawView = function(){
		jsDhcpServerMacClientView.superclass.drawView.call(this);
		this.updateView();
		
	}
	
	this.updateView = function(){
		var reserved = [];
		var dhcpd = this.ctrl.model.dhcpd;
		if(is.object(dhcpd) && is.array(dhcpd.reserved)){
			reserved = dhcpd.reserved;
		}

		
		var gridID = gID.get();
		$(this.options.childBoxSel).append("<div id='" + gridID + "' class='dhcpd' style='padding: 15px 0pt 15px 0px;'></div>");
		var header = [{index: "ip", name: "IP"}, {index: "mac", name: "MAC"}, {index: "host", name: "Host"}];
		$grid = $("#" + gridID).lightUIGrid(header, reserved.length, {selectable: true});
		$grid.colEditable("ip", "ipv4", {mandatory: true});
		$grid.colEditable("mac", "mac");
		$grid.colEditable("host", "text");
		$grid.bind("selection.grid", context(this).callback(this.updateRuleButtons));
		$grid.bind("stopEditing.grid", context(this).callback(this.updateRuleButtons));
		$grid.bind("startEditing.grid", context(this).callback(function(){
			this.disableButton("delRule");
			this.disableButton("addRule");
		}));
		this.disableButton("delRule");

		var $row;
		var obj;
		for(var i=0; i<reserved.length; i++){
			obj = reserved[i];
			$row = $grid.row(i);
			$row.col("ip").html(obj.ip);
			$row.col("mac").html(obj.mac);
			$row.col("host").html(obj.host);
		}
	}

	this.updateModel = function(){
		 this.statusCode = null;
		 var res = jsDhcpServerMacClientView.superclass.updateModel.call(this);
		 if(res){
			res = this.checkRule();			 
			var dhcpd = this.ctrl.model.dhcpd;
			if(res && is.object(dhcpd)){
				dhcpd.reserved = [];
				var $row;
				var obj;
				for(var i=0; i<$grid.nrow(); i++){
					obj = {};
					$row = $grid.row(i);
					obj.ip = $row.col("ip").html();
					obj.mac = $row.col("mac").html();
					obj.host = $row.col("host").html();
					dhcpd.reserved.push(obj);
				}
			}
		 }
		 return res;
	}
	
	
	this.updateRuleButtons = function(){
		if($grid.selection().length){
			this.enableButton("delRule");
		}
		else{
			this.disableButton("delRule");
		}
		this.enableButton("addRule");
	}
	
	this.checkRule = function(){
		var $row;
		var $ip;
		var $mac;
		var $host;
		for(var i=0; i<$grid.nrow(); i++){
			$row = $grid.row(i);
			$ip = $row.col("ip");
			$mac = $row.col("mac");
			$host = $row.col("host");
			if($ip.html() == ""){
				this.statusCode = "dhcpMacHasEmpty";
				alert(lng(this.statusCode));
				$ip.click();
				return false;
			}
			else if($mac.html() == "" && $host.html() == ""){
				this.statusCode = "dhcpMacHasEmpty";
				alert(lng(this.statusCode));
				$mac.click();
				return false;
			}
		}
		this.statusCode = null;
		return true;
	}

	this.addRule = function(){
		if(!this.checkRule()){
			return;
		}
		$grid.addRow()
			.row("last")
			.col("ip")
			.click();
	}
	
	this.delRule = function(){
		$grid.selection().remove();
		this.updateRuleButtons();
		var obj = this.getChild("clients", "field");
		obj.lastValue = "blank";
		if ( obj.$input ) {
			obj.$input.val("blank");
		}
	}

	options.buttonsInline = true;
	options.buttons = 	[
							{name:"delRule", value:"dhcpMacDelRule", handler:this.delRule},
							{name:"addRule", value:"dhcpMacAddRule", handler:this.addRule}
						];
	
	var $grid;
	var obj;

	/**Ссылка на контроллер.
	 * Обычно устанавливается базовым классом jsView, но здесь нужен раньше.
	 */
	this.ctrl = ctrl;

	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {label: "dhcpMac"};

	obj = ctrl.getChild("clients");
	obj.nextIface = "client";
	obj.ifaceTypes.client.options = {
		humanName: "dhcpMacClients"
	};
	obj.LANClients = $.extend(true, {}, ctrl.model.lanClients);





	jsDhcpServerMacClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.bind("ruleselect", this.onruleselect);
}
extend(jsDhcpServerMacClientView, jsFieldSetClientView);






















function jsDHCPOptPageController(){
	jsDHCPOptPageController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsDHCPOptPageClientView, options:{nothing: true}};
	this.ifaceTypes.server = {type: jsDHCPOptPageServerView, options:{action: "index.cgi", plainIface:true}};

	this.addChild(new jsController(), "dhopt");

	this.ondataready = function(){
		this.changeChild(this.getChild("dhopt").thisInx, new jsDHCPOptMgrController(this.iftree.br0.services.br0.dhcpd.DHCPConditionalServingPool), "dhopt");
		return false;
	}

	this.iftree = null;
	this.onceauth = false;

	this.nextIface = "server";
	this.addIface();
	
	this.addEventHandler("dataready", this.ondataready);
}
extend(jsDHCPOptPageController, jsController);

function jsDHCPOptPageClientView(ctrl, viewInx, options){

	jsDHCPOptPageClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.onautherror = function(){
		this.getChild("passwd").authError();
		return false;
	}
	
	this.ondataready = function(){
		this.getChild("passwd").hide();
		this.constructor(this.ctrl, this.viewInx, this.options?this.options:{});
		this.drawView();
		return false;
	}
	
	this.save = function(){
		this.updateModel();
		this.ctrl.event("saverq");
	}
	options.buttons = 	[{name:"save", value:"button_save", handler:this.save}];
	


	this.bind("dataready", this.ondataready);
	this.bind("autherror", this.onautherror);
}
extend(jsDHCPOptPageClientView, jsFieldSetClientView);

function jsDHCPOptPageServerView(ctrl, viewInx, options){
	jsDHCPOptPageServerView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.pickData = function(){
		var data = this.options.sender.responseData;
		this.ctrl.iftree = {};
		if(data){
			if(!data.baddata && data.resident && data.resident.iface_names){
				this.ctrl.iftree = data.resident.iface_names;
				if(!this.ctrl.iftree) this.ctrl.iftree = {};
			}
		}
		if(this.mode && this.mode != "update"){
			this.ctrl.event("updaterq");
		}
		else{
			if(data.status ==  58){
				this.ctrl.event("autherror");
			}
			else{
				this.ctrl.event("dataready");
			}
		}
	}

	this.prepareData = function(){
		var obj;
		var ctrl = this.ctrl;

		switch(this.mode){
			case "save":

				
				var obj = this.requestObj;
				obj.res_config_action = 3;
				obj.res_pos = 0;
				
				var jsonOutObj = {br0: ctrl.iftree.br0};
				
				obj.res_buf = $.toJSON(jsonOutObj);
				obj.res_buf = obj.res_buf.replace(/%/g,"%25");
				obj.res_buf = obj.res_buf.replace(/#/g,"%23");
				obj.res_buf = obj.res_buf.replace(/&/g,"%26");

				this.addToRequest(obj);
			break;
			case "update":

				var obj = this.requestObj;
				obj.res_config_action = 1;

				this.addToRequest(obj);
			break;
		}
	}
	
	this.onsaverq = function(){
		this.mode = "save";
		this.updateView();
	}
		
	this.onupdaterq = function(){
		this.mode = "update";
		this.updateView();
		return false;
	}
	this.bind("updaterq", this.onupdaterq);
	
	this.mode = "update";			//"save"/"update"/
	
	this.requestObj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_id:  161,
					res_struct_size: 36
				};
				
	this.bind("saverq", this.onsaverq);
}
extend(jsDHCPOptPageServerView, jsSSideView);


function jsDHCPOptMgrController(json){
	jsDHCPOptMgrController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsDHCPOptMgrView, options:{slider: true, title: "Опции DHCP", nocollapse: true}};
	
	this.addChild(new jsRootVendorController(json), "root");
}
extend(jsDHCPOptMgrController, jsController);

function jsDHCPOptMgrView(ctrl, viewInx, options){
	var leftSideID = "left" + getUID();
	var rightSideID = "right" + getUID();
	ctrl.getChild("root").nextIface = "tree";
	options.formViewSel = "#" + rightSideID;		//на будующее. при��одится при создании 2го представления.
	jsDHCPOptMgrView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		
		var htmlToDraw = "<div class='dhcpopt'>";
		htmlToDraw += "<div class='leftside' id='" + leftSideID + "'></div>";
		htmlToDraw += "<div class='rightside' id='" + rightSideID + "'></div>";
		htmlToDraw += "<div class='bottom'></div></div>";
		
		var options = this.options;
		$(options.viewBoxSel).html(htmlToDraw);
		
		options.myBoxSel = options.viewBoxSel;

		//Выдать селектор потомку
		var root = this.getChild("root");
		root.options.viewBoxSel = "#" + leftSideID;
		root.viewBoxSel = "#" + leftSideID;
		options.childBoxSel = root.options.viewBoxSel;

		jsDHCPOptMgrView.superclass.drawView.call(this);
	}
}
extend(jsDHCPOptMgrView, jsCSideView);


function jsRootVendorController(json){
	jsRootVendorController.superclass.constructor.call(this);

	this.ifaceTypes.tree = {type: jsRootVendorTreeView, options: {noPath: true}};
	
	this.buildTree = function(){
		var vclassid;
		for(var i in this.json){
			vclassid = this.json[i].VendorClassID;
			if(!no(vclassid)){
				this.addChild(new jsVendorClassController(this.json[i]), vclassid);
			}
		}
		this.addChild(new jsVendorClassController($.extend(true, {}, classTemplate)));
	}
	
	
	this.onaddclass = function(obj){
		delete obj.isNew;
		
		this.maxInstance++;
		this.json[this.maxInstance] = obj;
		this.getChild(this.children.length - 1).json = this.json[this.maxInstance];
		this.activateToBottom = false;	//С какого-то хера сбрасывается
		this.addChild(new jsVendorClassController($.extend(true, {}, classTemplate)));
		return false;
	}

	this.maxInstance = json.max_instance;
	delete json.max_instance;
	this.json = json;	//Обойдёмся без модели
	
	var classTemplate = {
		isNew: true,
		Enable: true,
		DHCPOption:{
			max_instance: 0
		}
	};
	
	this.activateToBottom = false;
	this.buildTree();
	this.addEventHandler("addclass", this.onaddclass);
}
extend(jsRootVendorController, jsController);

function jsRootVendorTreeView(ctrl, viewInx, options){
	for(var i in ctrl.children){
		ctrl.getChild(i).nextIface = "tree";
	}
	jsRootVendorTreeView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.onaddclass = function(){
		var child = this.ctrl.getChild(this.ctrl.children.length - 1);
		child.nextIface = "tree";
		child.changeIface(this.viewInx, this, this.options);
		this.drawView();
		return false;
	}
	
	this.updateModel = function(){
		jsRootVendorTreeView.superclass.updateModel.call(this);
		//Почистить json от вспомогательных переменных, помеченных для удаления опций и установить max_instance
		var ctrl = this.ctrl
		var json = ctrl.json;
		for(var i in json){
			if(json[i].isNew || json[i].deleted){
				delete json[i];
			}
		}
		json.max_instance = this.ctrl.maxInstance;
		return true;
	}

	this.bind("addclass", this.onaddclass);
}
extend(jsRootVendorTreeView, jsViewTree);


function jsVendorClassController(json){
	jsVendorClassController.superclass.constructor.call(this);

	this.ifaceTypes.tree = {type: jsVendorClassTreeView, options: {}};
	this.ifaceTypes.list = {type: jsVendorClassListView, options: {plainIface: true}};
	
	this.buildTree = function(){
		for(var i in this.json.DHCPOption){
			this.addChild(new jsDHCPOptController(this.json.DHCPOption[i]));
		}		
		this.addChild(new jsDHCPOptController($.extend(true, {}, optTemplate)));
	}
	
	this.onaddopt = function(obj){
		delete obj.isNew;
		this.maxInstance++;
		this.json.DHCPOption[this.maxInstance] = obj;
		this.getChild(this.children.length - 1).json = this.json.DHCPOption[this.maxInstance];
		this.addChild(new jsDHCPOptController($.extend(true, {}, optTemplate)));
		return false;
	}
	
	if(!json){
		json = {max_instance: 0};
	}
	this.maxInstance = json.DHCPOption.max_instance;
	delete json.DHCPOption.max_instance;
	this.json = json;	//Обойдёмся без модели
		
	var optTemplate = {
		isNew: true,
		Enable: true
	};

	this.buildTree();
	this.addEventHandler("addopt", this.onaddopt);
}
extend(jsVendorClassController, jsController);

function jsVendorClassTreeView(ctrl, viewInx, options){
	for(var i in ctrl.children){
		ctrl.getChild(i).nextIface = "tree";
	}
	jsVendorClassTreeView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = this.updateView = function(){
		if(this.ctrl.json.isNew){
			this.getChild(0).setOption("hide", true);
		}
		jsVendorClassTreeView.superclass.drawView.call(this);
		var htmlToDraw;
		if(this.ctrl.json.isNew){
			htmlToDraw = lng("dhoptAddNewClass");
		}
		else{
			htmlToDraw = this.ctrl.json.VendorClassID;
		}
		$(this.myBoxSel).html(htmlToDraw);
		if(this.ctrl.json.isNew){
			$(this.viewBoxSel).addClass("folder_new");
		}
		else if(this.ctrl.active){
			$(this.viewBoxSel).addClass("folder_open");
		}
		else{
			$(this.viewBoxSel).addClass("folder_close");
		}
	}
	
	this.onblurjq = function(event){
		var id = $(event.target).val();
		if(id != ""){
			var json = this.ctrl.json;
			delete json.isNew
			json.VendorClassID = id;
			this.ctrl.event("addclass", json, true);
			this.getChild(0).show();
		}
		else{
			this.getChild(0).setOption("hide", true);
			this.drawView();
		}
	}
	
	this.onactivate = function(){
		if(this.ctrl.json.isNew){
			var htmlToDraw = "<input value='' type='text'/>";
			$(this.myBoxSel).html(htmlToDraw);
			var $input = $(this.myBoxSel + ">input");
			$input.focus();
			$input.blur(context(this).callback(this.onblurjq));
			$input.keypress(context(this).callback(this.onkeypressjq));
			// Потому что webkit-подобные и ie решили пойти своим путем :D
			if($.browser.msie || $.browser.webkit){
				$input.keydown(context(this).callback(this.onkeypressjq));
			}
		}
			//Добавить интерфейс правого бокса
			this.ctrl.nextIface = "list";
			this.ctrl.ifaceTypes.list.options.viewBoxSel = this.options.formViewSel
			this.ctrl.addIface();
			this.ctrl.event("drawlist");
			if(!this.ctrl.json.isNew){
				$(this.viewBoxSel).addClass("folder_open");
				$(this.viewBoxSel).removeClass("folder_close");
			}
		this.onrevdel();
		return jsVendorClassTreeView.superclass.onactivate.call(this);
	}

	this.ondeactivate = function(){
		$(this.viewBoxSel).addClass("folder_close");
		$(this.viewBoxSel).removeClass("folder_open");		
		this.onrevdel();
		return jsVendorClassTreeView.superclass.ondeactivate.call(this);
	}

	this.onaddopt = function(){
		var child = this.ctrl.getChild(this.ctrl.children.length - 1);
		child.nextIface = "tree";
		child.changeIface(this.viewInx, this, this.options);
		this.drawView();
		return false;
	}

	/**Обработка нажатие клавиши (для webkit & ie)*/

	
	this.onkeypressjq = function(event){
		if(event.keyCode == 13){
			$(event.target).blur();
		}
		else if(event.keyCode == 27){
			$(event.target).val("");
			$(event.target).blur();
		}
		return true;
	}

	this.updateModel = function(){
		//Почистить json от вспомогательных переменных и установить max_instance
		var ctrl = this.ctrl
		var json = ctrl.json;
		for(var i in json.DHCPOption){
			if(json.DHCPOption[i].isNew || json.DHCPOption[i].deleted){
				delete json.DHCPOption[i];
			}
		}
		json.DHCPOption.max_instance = this.ctrl.maxInstance;
		return true;
	}

	this.onrevdel = function(){
		if(this.ctrl.json.deleted){
			$(this.viewBoxSel).removeClass("folder_open");
			$(this.viewBoxSel).removeClass("folder_close");
			$(this.viewBoxSel).addClass("folder_deleted");
		}
		else{
			$(this.viewBoxSel).removeClass("folder_deleted");
			if(this.ctrl.active){
				$(this.viewBoxSel).addClass("folder_open");
			}
			else{
				$(this.viewBoxSel).addClass("folder_close");
			}
		}
		return false;
	}
	
	this.bind("activate", this.onactivate);
	this.bind("deactivate", this.ondeactivate);
	this.bind("addopt", this.onaddopt);
	this.bind("revdel", this.onrevdel);
}
extend(jsVendorClassTreeView, jsViewTree);

function jsVendorClassListView(ctrl, viewInx, options){
	for(var i in ctrl.children){
		ctrl.getChild(i).nextIface = "list";
	}
	jsVendorClassListView.superclass.constructor.call(this, ctrl, viewInx, options);
		
	this.drawView = this.updateView = function(){
		jsVendorClassListView.superclass.drawView.call(this);

		var ownerView = $(this.options.viewBoxSel).attr("ownerView");
		if(ownerView && ownerView != "list") return;

		var children = this.ctrl.children;
		htmlToDraw = "";
		var json;
		
		htmlToDraw = "<table class='gridTable'>";
		htmlToDraw += drawHeader();
		var j = 1;
		var trSel;
		var odd = 1;
		for(var i in children){
			json = children[i].json;
			if(!json.isNew){
				htmlToDraw += "<tr class='gridRow" + odd + "'>"
						+ "<td>" + json.Tag + "</td>"
						+ "<td>" + json.Value + "</td>"
						+ "<td><input type='checkbox' ";
				htmlToDraw += json.Enable?"checked":"";
				htmlToDraw += "/></td>"
						+ "<td><input type='checkbox' ";
				htmlToDraw += json.deleted?"checked":"";
				htmlToDraw += "/></td>"
						+ "</tr>";
				trSel = this.options.viewBoxSel + " tr:eq(" + j + ")";
				$(trSel).live("click", {childInx: i}, context(this).callback(this.onrowclickjq));
				$(trSel + " td:eq(2) input").live("change", {childInx: i}, context(this).callback(this.onchangeenablejq));
				$(trSel + " td:eq(3) input").live("change", {childInx: i}, context(this).callback(this.onchangedeletedjq));
				j++;
			}
			odd = odd%2 ;
			odd++;
		}
		
		htmlToDraw += "</table>";
		$(this.options.viewBoxSel + " .fieldSetGeneral").html(htmlToDraw);
		$(".dhcpopt .buttonsInline").addClass("buttonsVendorClass");
		$(".dhcpopt .buttonsInline").removeClass("buttonsInline");
		this.buttonBarSel = ".dhcpopt .buttonsVendorClass";
		this.changeState();
	}

	this.onrowclickjq  = function(event){
		var patt = /(input|INPUT)/;
		if(!patt.test(event.target.tagName)){
			this.ctrl.getChild(event.data.childInx).activate();
		}
	}
	
	this.onchangeenablejq = function(event){
		this.ctrl.getChild(event.data.childInx).json.Enable = $(event.target).attr("checked");
	}
	
	this.onchangedeletedjq = function(event){
		var child = this.ctrl.getChild(event.data.childInx);
		child.json.deleted = $(event.target).attr("checked");
		child.event("updateview");
	}

	this.onaddopt = function(){
		var child = this.ctrl.getChild(this.ctrl.children.length - 1);
		child.nextIface = "list";
		child.changeIface(this.viewInx, this, this.options);
		return false;
	}

	var drawHeader = function(){
		var htmlToDraw = "<tr class='gridHeader'>"
					+ "<td>" + lng("dhoptTag") + "</td>"
					+ "<td>" + lng("dhoptValue") + "</td>"
					+ "<td>" + lng("dhoptEnable") + "</td>"
					+ "<td>" + lng("dhoptDelete") + "</td>"
					+ "</tr>";

		return htmlToDraw;
	}
	
	this.ondrawlist = function(){
		$(this.options.viewBoxSel).attr("ownerView", "list");
		this.drawView();
		return false;
	}
	
	this.del = function(){
		this.ctrl.json.deleted = true;
		this.changeState();
	}
	
	this.revert = function(){
		this.ctrl.json.deleted = false;
		this.changeState();
	}
	
	this.disable = function(){
		this.ctrl.json.Enable = false;
		this.changeState();
	}
	
	this.enable = function(){
		this.ctrl.json.Enable = true;
		this.changeState();
	}

	this.changeState = function(){
		if(this.ctrl.json.deleted){
			this.options.buttons[0] = {name:"revert", value:"button_revert", handler:this.revert};
			this.ctrl.event("revdel");
		}
		else{
			this.options.buttons[0] = {name:"del", value:"button_del", handler:this.del};
			this.ctrl.event("revdel");
		}		
		$(this.buttonBarSel).html(this.drawButtons());
		
		if(this.ctrl.json.Enable){
			this.options.buttons[1] = {name:"disable", value:"button_disable", handler:this.disable};
			$(this.buttonBarSel).html(this.drawButtons());
		}
		else{
			this.options.buttons[1] = {name:"enable", value:"button_enable", handler:this.enable};
			$(this.buttonBarSel).html(this.drawButtons());
		}
	}
	
	options.buttonsInline = true;
	options.buttons = [];
	this.options = options;
	
	this.bind("drawlist", this.ondrawlist);
	this.bind("addopt", this.onaddopt);
}
extend(jsVendorClassListView, jsFieldSetClientView);


function jsDHCPOptController(json){
	jsDHCPOptController.superclass.constructor.call(this);

	this.ifaceTypes.tree = {type: jsDHCPOptIconView, options: {plainIface: true}};
	this.ifaceTypes.form = {type: jsDHCPOptFormView, options: {inputPadding: "100px"}};
	
	this.describe([
		{
			name: "dhoptEnable",
			type: "checkbox",
			alias: "enable"
		},
		{
			name: "dhoptTag",
			type: "number",
			alias: "tag"
		},
		{
			name: "dhoptValue",
			type: "input",
			alias: "value"
		}
	]);

	this.json = json;	//Обойдёмся без модели
}
extend(jsDHCPOptController, jsController);

function jsDHCPOptIconView(ctrl, viewInx, options){
	jsDHCPOptIconView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		jsDHCPOptIconView.superclass.drawView.call(this);
		this.updateView();
	}
	
	this.updateView = function(){
		var htmlToDraw = "";
		if(this.ctrl.json.isNew){
			htmlToDraw += lng("dhoptAddNewOpt");
		}
		else{
			htmlToDraw += this.ctrl.json.Tag;
		}
		$(this.myBoxSel).html(htmlToDraw);
		if(this.ctrl.json.isNew){
			$(this.viewBoxSel).addClass("file_new");
		}
		else if(this.ctrl.json.deleted){
			$(this.viewBoxSel).addClass("file_deleted");
		}
		else{
			$(this.viewBoxSel).addClass("file");
			$(this.viewBoxSel).removeClass("file_deleted");
		}
	}
	
	this.onactivate = function(){
		if(!formCreated){
			//Добавить интерфейс правого бокса
			this.ctrl.nextIface = "form";
			this.ctrl.ifaceTypes.form.options.viewBoxSel = this.options.formViewSel
			this.ctrl.addIface();
			formCreated = true;
		}
		this.ctrl.event("drawform");

		return jsDHCPOptIconView.superclass.onactivate.call(this);
	}
	
	var formCreated = false;
	
	this.bind("activate", this.onactivate);
	this.bind("updateview", this.updateView);
}
extend(jsDHCPOptIconView, jsViewTree);

function jsDHCPOptFormView(ctrl, viewInx, options){
	jsDHCPOptFormView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.drawView = this.updateView = function(){
	
		var ownerView = $(this.options.viewBoxSel).attr("ownerView");
		if(ownerView && ownerView != "form") return;
		
		this.options.buttonsInline = true;
		if(this.ctrl.json.isNew){
			this.options.buttons = [
				{name:"save", value:"button_save", handler:save}
			];
		}
		else{
			this.options.buttons = [
				{name:"del", value:"button_del", handler:del},
				{name:"revert", value:"button_revert", handler:revert}
			];
		}
		
		var enable = this.getChild("enable");
		var tag = this.getChild("tag");
		var value = this.getChild("value");
		var json = this.ctrl.json;
		enable.ctrl.model.value = json.Enable;
		tag.ctrl.model.value = json.Tag;
		value.ctrl.model.value = json.Value;

		jsDHCPOptFormView.superclass.drawView.call(this);
		if(this.ctrl.json.deleted){
			enable.disable();
			tag.disable();
			value.disable();
			if(!json.isNew){
				this.disableButton("del");
				this.enableButton("revert");
			}
		}
		else{
			enable.enable();
			tag.enable();
			value.enable();
			if(!json.isNew){
				this.enableButton("del");
				this.disableButton("revert");
			}
		}
	}
	
	this.updateModel = function(){
		var res = jsDHCPOptFormView.superclass.updateModel.call(this);
		if(res){
			var json = this.ctrl.json;
			json.Enable = this.getChild("enable").ctrl.model.value;
			json.Tag = this.getChild("tag").ctrl.model.value;
			json.Value = this.getChild("value").ctrl.model.value;
		}
		return res;
	}
	
	var del = function(){
		//Пометить для удаления.
		//Фактически удаление произойдёт в updateModel класса вендора.
		this.ctrl.json.deleted = true;
		this.ctrl.event("updateview");
	}
	
	var save = function(){
		var res = this.updateModel();
		if(res){
			var ctrl = this.ctrl;
			ctrl.event("addopt", ctrl.json, true);
		}
	}
	
	var revert = function(){
		delete this.ctrl.json.deleted;
		this.ctrl.event("updateview");
	}
	
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;	//индекс контроллера в массиве children
		var json = this.ctrl.json;

		if(obj.view.updateModel()){
			var val = obj.view.ctrl.model.value;
			switch(alias){
				case "enable":
					json.Enable = val;
				break;
				case "tag":
					json.Tag = val;
				break;
				case "value":
					json.Value = val;
				break;
			}
		}
		return false;
	}

	this.ondrawform = function(){
		$(this.options.viewBoxSel).attr("ownerView", "form");
		this.drawView();
		return false;
	}
	
	this.bind("drawform", this.ondrawform);
	this.bind("updateview", this.updateView);
	this.bind("fieldchange", this.onfieldchange);
	
	this.boxBusy = true;
}
extend(jsDHCPOptFormView, jsFieldSetClientView);




















function jsDialogSetController(){
	jsDialogSetController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsWindowClientView};
	this.ifaceTypes.server = {type: jsSSideView};
}
extend(jsDialogSetController, jsFieldSetController);






















 
function jsDinIPSettingsModel(service){
	jsDinIPSettingsModel.superclass.constructor.call(this);
	
	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;

}
extend(jsDinIPSettingsModel, jsModel);


function jsDinIPSettingsController(service, isadding){
	jsDinIPSettingsController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsDinIPSettingsClientView};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsDinIPSettingsSummaryView};
	this.ifaceTypes.summary.options = {};
	
	this.changeModel(new jsDinIPSettingsModel(service));
	
	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(service.dns_from_dhcp), "dnsFromDhcp");

	var divDhcp = this.addChild(new jsFieldSetController(), "divDhcp");
	divDhcp.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns");
	divDhcp.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns");

	var advanced = this.addChild(new jsFieldSetController(), "advanced");
	advanced.addChild(new jsInputController(service.vendor_id), "vendorID");
	advanced.addChild(new jsInputController(service.hostname), "hostname");
}
extend(jsDinIPSettingsController, jsFieldSetController);



function jsDinIPSettingsClientView(ctrl, viewInx, options){
	var obj;
	var service = ctrl.model.service;
	
	/**Сохранить настройки IPv4 или IPv6.
	 * @param	bool	v6	Признак IPv6
	 */
	this.saveIP = function(v6){
		var postfix = "";
		var box = this;
		var service = {};
		var advanced = this.getChild("advanced");
		if(v6){
			postfix = "v6";
			box = advanced.getChild("ipv6box", "divIPv6");
			service["gwip" + postfix] = box.getChild("gwip").ctrl.model.toString();
		}
		else{
			service["vendor_id"] = box.getChild("advanced", "vendorID").ctrl.model.value;
			service["hostname"] = box.getChild("advanced", "hostname").ctrl.model.value;
		}

		service["dns_from_dhcp" + postfix] = box.getChild("dnsFromDhcp").ctrl.model.value;

		if(!service["dns_from_dhcp" + postfix]){
			var divDhcp = box.getChild("divDhcp");
			service["dns_prim" + postfix] = divDhcp.getChild("primaryDns").ctrl.model.toString();
			service["dns_sec" + postfix] = divDhcp.getChild("secondaryDns").ctrl.model.toString();
		}

		return service;
	}

	/**Обновить модель.*/
	this.updateModel = function(){
		var res = jsDinIPSettingsClientView.superclass.updateModel.call(this);
		if(res){
			var service = this.ctrl.model.service;
			service.type = "ip"
			$.extend(true, service, this.saveIP(false));
		}
		return res;
	}
	
	/**Обработчик события изменения полей.
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;
		var advanced = this.getChild("advanced");
		switch(alias){
			case "dnsFromDhcp":
				if(obj.view.ctrl.parent.alias == "divIPv6"){
					var divIPv6 = advanced.getChild("ipv6box", "divIPv6");
					var divDhcp = divIPv6.getChild("divDhcp");
				}
				else{
					var divDhcp = this.getChild("divDhcp");
				}
				if(obj.value){
					divDhcp.hide();
				}
				else{
					divDhcp.show();
				}
			break;

		}
		return false;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.getChild("desc").hide();
			this.getChild("advanced").hide();
		}
		else{
			//подробно
			this.getChild("desc").show();
			this.getChild("advanced").show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsDinIPSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
	}
	
	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "IP"
	};
	obj.ifaceTypes.separator.options.hide = service.blocks;


	obj = ctrl.getChild("dnsFromDhcp");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanDnsFromDhcp",
		valset: {on:true, off:false}
	};
	dnsFromDhcp = obj.model.value;

	var divDhcp = ctrl.getChild("divDhcp");
	divDhcp.nextIface = "client";
	divDhcp.ifaceTypes.client.options = {nothing: true};
	divDhcp.ifaceTypes.client.options.hide = dnsFromDhcp;

	obj = divDhcp.getChild("primaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanPrimDns";

	obj = divDhcp.getChild("secondaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanSecDns";
	opt.optional = true;

	var advanced = ctrl.getChild("advanced");
	advanced.nextIface = "client";

	obj = advanced.getChild("vendorID");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanVendorID",
		optional: true
	};
	obj = advanced.getChild("hostname");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "statDhcpHost",
		optional: true
	};
	opt = obj.ifaceTypes.input.options;

	jsDinIPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("fieldchange", this.onfieldchange);
	this.bind("modeswitch", this.onmodeswitch);
}
extend(jsDinIPSettingsClientView, jsFieldSetClientView);
	
	

function jsDinIPSettingsSummaryView(ctrl, viewInx, options){
	jsDinIPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.drawView = function(){
		//Скрываем второстепенные поля. Большиство из них будут показаны только если пользователь внёс в них изменения.
		var advanced = this.getChild("advanced");
		advanced.options.slider = false;
		advanced.getChild("vendorID").options.hide = true;
		advanced.getChild("hostname").options.hide = true;
		jsDinIPSettingsSummaryView.superclass.drawView.call(this);
	}

	this.updateView = function(){
		jsDinIPSettingsSummaryView.superclass.updateView.call(this);

		var vendorID = this.getChild("advanced", "vendorID");
		if(vendorID.ctrl.modified) vendorID.show();
		
		var hostname = this.getChild("advanced", "hostname");
		if(hostname.ctrl.modified) hostname.show();
	}
	
	this.bind("modeswitch", function(){return false;});
}
extend(jsDinIPSettingsSummaryView, jsDinIPSettingsClientView);

































var refreshId;
























function validate_domain_name(host){
	var pat = /^[a-z0-9][a-z0-9-]*$/;
	var labels = host.split(".");

	for(var i=0; i<labels.length; i++) {
		if (!pat.test(labels[i]))
			return false;
	}
	return true;
}








function validate_host(n) {
	return validate_ip_address(n) || validate_domain_name(n);
}
























function validate_ip_address(ip_address){
	var address = ip_address.match("^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$");
	var digits;
	var i;

	if(address == null) { 
		return false;
	}else{
		digits = address[0].split(".");
		for(i = 0; i < 4; i++){
			if((Number(digits[i]) > 255 ) || (Number(digits[i]) < 0 ) || (Number(digits[0]) > 223)) {
				return false;
			}
		}
	}
	return true;
}








function validate_mac_address(mac_address){
	var address = mac_address.match("^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$");
	var digits;
	var i;

	if(address == null) { 
		return false;
	}
	return true;
}








function validate_ip_port(ip_port){
	var port = ip_port.match("^[0-9]{1,5}$");
	if(port == null) { 
		return false;
	}else{
		if((Number(port) > 65535 ) || (Number(port) < 1 )) {
			return false;
		}
	}
	return true;
}








function validate_ip_port_range(ports){
	result = true;

	if(ports){
		ranges = ports.split(",");
		if(ranges.length){
			for(i=0;i<ranges.length;i++){
				range = ranges[i].split(":");
				if(range){
					if(range.length == 2){
						// это диапазон
						left = verifyInteger2(range[0]);
						right = verifyInteger2(range[1]);
						if(left && right && validate_ip_port(new String(range[0])) && validate_ip_port(new String(range[1]))){
							if(parseInt(left) >= parseInt(right)){
								result = false;
							}
						}
						else{
							result = false;
						}
					}
					else{
						if(range.length == 1){
							// это одиночный порт
							port = verifyInteger2(range);
							if(!port || !validate_ip_port(new String(range))){
								result = false;
							}
						}
						else{
							result = false;
						}
					}
				}
				else{
					result = false;
				}
				if(!result) break;
			}
		}
		else{
			result = false;
		}
	}
	else{
		result = false;
	}

	return result;
}








function validate_mask(ip_mask){
	var mask = ip_mask.match("^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$");

	if(mask == null){ 
		return false;
	}else{
		mask = new String(mask);
		mask_array=mask.split('.');
		bmask = sprintf("0x%.2x%.2x%.2x%.2x", parseInt(mask_array[0], 10), parseInt(mask_array[1], 10), parseInt(mask_array[2], 10), parseInt(mask_array[3], 10));
		// проверка на дырявость
		n = Math.log(~bmask + 1)/Math.LN2;
		if(n.toFixed(0) != n) return false;
	}
	return true;
}
















function verifyInteger2(input_str){
	var pattern;
	var str;

	pattern = /^\s*(\d+)\s*$/g;
	str = new String(input_str);

	return str.match(pattern);
}
























































function setCookie(name, value, expires, measure){
    var today;

	today = new Date();

    if(expires){
		switch (measure) {
			case "min":
				expires = expires * 1000 * 60;
				break;
			case "hour":
				expires = expires * 1000 * 3600;
				break;
			default: //по умолчанию в днях
				expires = expires * 1000 * 3600 * 24;
		}
    }

    document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + new Date(today.getTime() + expires).toGMTString() : '');
}








function deleteCookie(name){
    setCookie(name, '', -30);
} 








function deleteAllCookies(){
    var cookies = document.cookie.split(";");

    for (var i in cookies) {
		deleteCookie($.trim(cookies[i].split("=")[0]));
	}
} 








function getCookie(name){
	if(document.cookie.length > 0){
		c_start = document.cookie.indexOf(name + "=");
		if(c_start != -1){ 
			c_start = c_start + name.length + 1; 
			c_end = document.cookie.indexOf(";", c_start);
			if(c_end == -1){
				c_end = document.cookie.length;
			}

			return unescape(document.cookie.substring(c_start, c_end));
		} 
	}

	return "";
}























































function validate_net_addr(addr){

	check_res = false;

	if(addr){
		strings = addr.split("/");
		if(strings.length == 2){
			if(validate_ip_address(strings[0])){
				bits = verifyInteger2(strings[1]);
				if(bits && (bits<=32) && (bits>0)){
					check_res = true;
				}
				else{
					if(validate_mask(strings[1])){
						check_res = true;
					}
				}
			}
		}
	}

	return check_res;

}
























function validate_password(password){
	words = password.split(" ");
	if(words && words.length == 1 && words[0] != ""){
		return true;
	}
	return false;
}
































function modal_overlay(){
	var innerHeightsize = 0;
	if (typeof(window.innerHeight) == 'number') {
		innerHeightsize = window.innerHeight;
	}
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
		innerHeightsize = document.documentElement.clientHeight;
		}
		else {
			if (document.body && document.body.clientHeight) {
				innerHeightsize = document.body.clientHeight;
			}
		}
	}
	if (document.body.clientHeight > innerHeightsize)
		document.getElementById("uiOverlayModal").style.height = document.body.clientHeight + "px";
	else
		document.getElementById("uiOverlayModal").style.height = innerHeightsize + "px";
	document.getElementById("uiOverlayModal").style['display'] = "";
}








function goto_page(url, noajax){

	if (url == "")
		return;
	if(noajax){
		if (window.SAVEME) SAVEME.lock();
		document.location.href = url;
		if (window.SAVEME) SAVEME.unlock();
	}
	else{
		$("#uiContentBody").load(url, "xml_http_request=yes", onPageLoad);
	}
}















































function getObjectLength(obj){
	var objLength = 0;
	for(var i in obj) objLength++;
	return objLength;
}
function getObjectFirstChild(obj){
	var child = null;
	for(var i in obj){
		child = obj[i];
		break;
	}
	return child;
}
function getObjectFirstKey(obj){
	var key = null;
	for(var i in obj){
		key = i;
		break;
	}
	return key;
}








function calcMaskByBits(bits) {
		var bitsBinary = [];
		var res;
		for (var i=0; i<32; i++){
				bitsBinary[i]=0;
			}
		for (var i=0; i<bits; i++ ){
				bitsBinary[i]=1;
			 }	
			var firstPeace=0;
			var secondPeace=0;
			var thirdPeace=0;
			var fourPeace=0;
		for (var i=7; i>=0; i--){
				firstPeace +=bitsBinary[i]*(Math.pow(2,7-i)); 
			}
		for (var i=15; i>=8; i--){
				secondPeace +=bitsBinary[i]*(Math.pow(2,(15-i)));
			}
		for (var i=23; i>=16; i--){
				thirdPeace +=bitsBinary[i]*(Math.pow(2,(23-i)));
			}
		for (var i=31; i>=24; i--){
				fourPeace +=bitsBinary[i]*(Math.pow(2,(31-i)));
			}
		res =firstPeace+'.'+secondPeace+'.'+thirdPeace+'.'+fourPeace; 
		return res;
}








	 
function calcBitsByMask(mask){
	var res = 0;
	var firstPeace;
	var secondPeace;
	var thirdPeace;
	var fourPeace;
	if(no(mask)) return res;
	maskSpl=mask.split(".");
	firstPeace=maskSpl[0];
	secondPeace=maskSpl[1];
	thirdPeace=maskSpl[2];
	fourPeace=maskSpl[3];
	num = parseInt(firstPeace);
	firstPeace=num.toString(2);
	num = parseInt(secondPeace);
	secondPeace=num.toString(2);
	num = parseInt(thirdPeace);
	thirdPeace=num.toString(2);
	num = parseInt(fourPeace);
	fourPeace=num.toString(2);
	var maskBinary=firstPeace+''+secondPeace+''+thirdPeace+''+fourPeace;
	for (var i in maskBinary){
		if (maskBinary[i]==1) res+=1;
		}
	return res;
}








function getKeyCode(evt){
	var code;

	try{
		code = event.keyCode;
	}
	catch(e){
		try{
			if(evt == undefined){
				throw "error";
			}
			
			code = evt.which;
		}
		catch(e){
			code = -1;
		}
	}
	
	return code;
}





function controlCSS(cssURL, styleID, action) {
	var styleElem = "head>style#" + styleID;
	switch (action) {
		case "add":
			if (!$(styleElem).html()) {
				$.get(cssURL, function(data){
					var style = document.createElement('style');
					style.type = 'text/css';
					style.id = styleID;
					if (style.styleSheet)
						style.styleSheet.cssText = data;
					else
						style.appendChild(document.createTextNode(data));
					$("head")[0].appendChild(style);
				});
			}
		break;
		case "del":
			if ($(styleElem).html()) {
				$(styleElem).remove();
			}
		break;
	}
}

function clearJSON(obj){
	var patt = /^__.*__$/;
	for(var i in obj){
		if(patt.test(i) || obj[i] == undefined){
			delete obj[i];
		}
		else if(obj[i] instanceof Object
			&& !(obj[i] instanceof Array)
			&& !(obj[i] instanceof Boolean)
			&& !(obj[i] instanceof Date)
			&& !(obj[i] instanceof Number)
			&& !(obj[i] instanceof String)
			&& !(obj[i] instanceof RegExp)){
			clearJSON(obj[i]);
		}
	}
}

function ISO8601Date(dateTime){
	//Пока поддерживается только формат с разделителями и без часового пояса и долей секунд
	if(is.string(dateTime)){
		if(dateTime.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d/g)){
			return new Date(
				dateTime.substr(0, 4),		//год
				dateTime.substr(5, 2) - 1,	//месяц
				dateTime.substr(8, 2),		//день
				dateTime.substr(11, 2),		//час
				dateTime.substr(14, 2),		//минута
				dateTime.substr(17, 2)		//секунда
			);
		} 
	}
	return null;
}


function getConnArray(tree){
	var ifnode;
	var srvnode;
	var tnlnode;
	var arr = [];
	for(var i in tree){
		ifnode = tree[i];
		ifnode.ifname = i;
		if(ifnode.services){
			for(var j in ifnode.services){
				srvnode = ifnode.services[j];
				srvnode.L2 = ifnode;
				srvnode.ifname = j;
				if(srvnode.type != "auto"){
					arr.push(srvnode);
				}
				if(srvnode.tunnels){
					for(var k in srvnode.tunnels){
						tnlnode = srvnode.tunnels[k];
						tnlnode.L3 = srvnode;
						tnlnode.L2 = ifnode;
						tnlnode.ifname = k;
						arr.push(tnlnode);
					}
				}
			}
		}
	}
	return arr;
}








function getWanConn(tree, ipv6){
	var ipv6 = is.set(ipv6)?ipv6:false;
	var ifnode;
	var srvnode;
	var tnlnode;
	var arrCandidates = [];
	
	for (var i in tree){
		ifnode = tree[i];
		if (ifnode.is_wan && ifnode.services && getObjectLength(ifnode.services) > 0){
				for (var j in ifnode.services){
				srvnode = ifnode.services[j];				
				if (srvnode['gwif'+(ipv6?'v6':'')]){
					srvnode.L2 = ifnode;
					srvnode.ifname = i;
					srvnode.srvname = j;
					if (!srvnode.metric){
						srvnode.metric = 1;
						srvnode.delMetric = true;
					}
					arrCandidates.push(srvnode);
				}
				if (srvnode.tunnels && getObjectLength(srvnode.tunnels) > 0){
					for(var k in srvnode.tunnels){
						tnlnode = srvnode.tunnels[k];
						if (tnlnode['gwif'+(ipv6?'v6':'')]){
							tnlnode.L3 = srvnode;
							tnlnode.L2 = ifnode;
							tnlnode.ifname = i;
							tnlnode.srvname = j;
							tnlnode.tnlname = k;
							if (!tnlnode.metric){ 
								tnlnode.metric = srvnode.metric - 1;
								tnlnode.delMetric = true;
							}
							arrCandidates.push(tnlnode);
						}
					}
				}
			}
		}
	}
	var metric = 100500;
	var candidate;
	var wanConn = null;
	for (var i = 0; i < arrCandidates.length; i++){
		candidate = arrCandidates[i];
		if (candidate.metric && candidate.metric <= metric){
				metric = candidate.metric;
				if (candidate.delMetric){
					delete candidate.delMetric;
					delete candidate.metric;
				}				
				wanConn = candidate;
		}
	}
	return wanConn;
}


is.RPC_SUCCESS = function(__res){
	function success( __r ){
		if( !__r ) return true;
		return	__r.status ==  20 ||
				__r.status ==  13 ||
				__r.status ==  12;
	}
	
	if( is.number( __res ) || is.string( __res ) ){
		return success( { status: __res } );
	}
	else{
		if( __res.rq ){
			return _.all( __res.rq, success );
		}
		else{
			return success( __res );
		}
	}
}

is.PERMISSION_DENIED = function(response){
	if(response.status ==  58 || !response.auth){
		return true;
	}
	else{
		return false;
	}
}

var DRAGGER = new function(){
	
	var self = this;
	var $$ = {
		list: new Array(),
		drag: null
	};
	
	this.add = function(obj){
		if (is.jquery(obj)) {
			for (var i = 0; i < obj.length; i++) {
				if (indexOf($$.list, obj.get(i)) == -1) {
					$$.list.push(obj.get(i));
				}
			}
		}
		return this;
	}
	
	this.remove = function(obj){
		if (is.jquery(obj)) {
			for (var i = 0; i < obj.length; i++) {
				var index = indexOf($$.list, obj.get(i));
				if (index >= 0) {
					$$.list.splice(index, 1);
				}
			}
		}
		return this;
	}
	
	// Init
	$(document).bind('mousedown.dragger', callback(this, function(e){
		if (e.isPropagationStopped()){
			return true;
		}
		for (var i = 0; i < $$.list.length; i++) {
			if ($$.list[i] == e.target || $($$.list[i]).has(e.target).length) {
				var target = $($$.list[i]);
				var tPos = target.offset();
				var pPos = target.parent().offset();
				$$.drag = {
					index: i,
					target: target,
					offsetX: pPos.left + e.pageX - tPos.left,
					offsetY: pPos.top + e.pageY - tPos.top,
					cursor: $('body').css('cursor')
				};
				$('body').css({'cursor': target.css('cursor')});
				target.trigger('down.dragger', {
					event: e.originalEvent,
					left: $$.drag.offsetX,
					top: $$.drag.offsetY
				});
				return false;
			}
		}
	})).bind('mouseup.dragger', callback(this, function(e){
		if ($$.drag) {
			$('body').css({'cursor': $$.drag.cursor});
			$$.drag.target.trigger('up.dragger', {
				event: e.originalEvent,
				left: e.pageX - $$.drag.offsetX,
				top: e.pageY - $$.drag.offsetY
			});
			$$.drag = null;
			return false;
		}
	})).bind('mousemove.dragger', callback(this, function(e){
		if ($$.drag) {
			$$.drag.target.trigger('move.dragger', {
				event: e.originalEvent,
				left: e.pageX - $$.drag.offsetX,
				top: e.pageY - $$.drag.offsetY
			});
			return false;
		}
	})).bind('mouseleave', function(){
		$(document).trigger('mouseup');
	});
};

function GLOBAL_VAR(name){
	return function(value){
		window[name] = value;
	}
}
device.filter(function(url, type, data, cb){
	window.hasChanges = null;
	return true;
});
function modeAP(){
	var cookieMode = getCookie("device_mode_emul");
	if (cookieMode) {
		return cookieMode == "ap";
	}
	return window.menu_postfix == "_ap";
}
function copyObject(obj){
	if(is.array(obj)){
		return $.extend(true, [], obj);
	}
	else if(is.object(obj)){
		return $.extend(true, {}, obj);
	}
	
	return obj;
}
	

function maskObj( __obj, __mask ){

	var obj = _.clone( __obj );
	var objKeys = _.keys( obj ), maskKeys = _.keys( __mask );
	
	if( _.isArray( obj ) ) obj = obj.slice( 0, __mask.length );
	else _.each( _.difference( objKeys, maskKeys ), function( __key ){ delete obj[ __key ] } );
	
	_.each( _.intersection( objKeys, maskKeys ), function( __key ){
		var m = __mask[ __key ];
		var o = obj[ __key ];
		
		if( ( is( 'Object', m ) && is( 'Object', o ) ) || 
			( is( 'Array', m ) && is( 'Array', o ) ) ) obj[ __key ] = maskObj( o, m )
	} );
	
	return obj;
	
}

function diffObj( __obj1, __obj2 ){
	
	if( _.isEqual( __obj1, __obj2 ) ) return;

	function compare( d, isArray ){

		var karr = _.union( _.keys( __obj1 ), _.keys( __obj2 ) );
		
		_.each( karr, function( __key ){

			var __value = diffObj( __obj1[ __key ], __obj2[ __key ] );
			
			if( isArray ) d[ __key ] = _.isUndefined( __value ) ? null : __value;
			else if( !_.isUndefined( __value ) ) d[ __key ] = __value;

		} );
		
		return d;

	}
	
	if( is( 'Object', __obj1 ) && is( 'Object', __obj2 ) ) return compare( {} );
	else if( is( 'Array', __obj1 ) && is( 'Array', __obj2 ) ) return compare( [], true );
	else return copyObject( __obj2 );

}

function _deepClone( __obj ){
	
	var obj = _.clone( __obj );
	var o;
	
	for( var i in obj ){
		
		o = obj[ i ];
		
		if( _.isObject( o )) obj[ i ] = _deepClone( o );
	}
	
	return obj;
}

function makeValidJSONString(text) {
	return text.replace(/[\\"]/g, "\\$&");
}



























function pageDMZ(wizard){
	pageDMZ.superclass.constructor.call(this);
	
	this.dmz = null;
	this.lanClients = new Array();

	this.add(new nodeCaption("dmzLabel"));
	this.add(new nodeCheckBox("enable", false), "enable")
		//~ .add(new nodeCheckBox("vserversEnableSnat", false), "snat")
		.add(new nodeComboIP("ip_address", '', {
				header: 
					[
						{index: "ip", name: "IP"},
						{index: "mac", name: "MAC"},
						{index: "host", name: "Host"}
					],
				index: 'ip',
				version: 4,
				mandatory: true,
				disabled: true
			}), "ip");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageDMZ.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(this.child("enable").val(), this.child("ip").val(), null);
						
					}
				}));
		}
		if (phase == "back") {
			var ip = this.child("ip").cleanRows();
			for(var i = 0; i < this.lanClients.length; i++){
				if (is.IPv4(this.lanClients[i].ip)) {
					ip.addRow(this.lanClients[i].ip, this.lanClients[i].mac, this.lanClients[i].hostname);
				}
			}
		}
	}
	
	this.dmz_on_off = function(val) {
		if (val) {
			this.child('ip').enable();
			//~ this.child('snat').enable();
		} else {
			this.child('ip').disable();
			//~ this.child('snat').disable();
		}
	}
	
	this.save = function(enable, ip, snat) {
		rootView.showModalOverlay();
		this.dmz = {
			'enable': enable,
			'ip': (enable)?ip:this.dmz.ip
			//~ ,'enable_snat': (enable)?snat:this.dmz.enable_snat
		};
		device.config.write( 23, this.dmz, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([ 23,  187], callback(this, function(data){
			if(is.RPC_SUCCESS(data.rq[1])){
				this.lanClients = data.rq[1].resident;
			}
			this.deep.updateView();
			if (is.RPC_SUCCESS(data.rq[0])) {
				if(data.rq[0].resident.dmz){
					this.dmz = data.rq[0].resident.dmz;
				}
				else{
					this.dmz = data.rq[0].resident;
				}
				this.child("enable").val(this.dmz.enable);
				//~ this.child("snat").val(this.dmz.enable_snat);
				this.child("ip").val(this.dmz.ip);
				this.dmz_on_off(this.dmz.enable);
			}
			rootView.hideModalOverlay();
		}));
	});
	
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				this.dmz_on_off(value);
			break;
		}
	});
}
extend(pageDMZ, node);





















(function(){

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.errorBlock = function(title, shortDesc, longDesc, buttonTitle, callback){
		
		var pattern = "";
		
		if (this.selector == 'body' && window.engine && window.engine.simpleAir){
			pattern += '<div id="sky" class="unselectable"></div><div id="grass" class="unselectable"></div>';
		}
		
		pattern			+=	"<div class='error-block'>"
						+	"<div class='title'><h2 langkey='" + title + "'>" + lng(title) + "</h2></div>"
						+	"<div class='content'>"
						+	"<div class='short-desc'></div>"
						+	"<div class='long-desc'><ul></ul></div>"
						+	"<div class='tryagain' style='display: none'><button langkey='" + buttonTitle + "'>" + lng(buttonTitle) + "</button></div>"
						+	"</div></div>";

		this.html(pattern);

		if(shortDesc.match(/<|>/)){
			this.find(".short-desc").html(shortDesc);
		}
		else{
			this.find(".short-desc").attr("langkey", shortDesc).html(lng(shortDesc));
		}
		if(is.array(longDesc)){
			var $longDesc = this.find(".long-desc>ul");
			for(var i=0;i<longDesc.length;i++){
				$longDesc.append("<li>" + lng(longDesc[i]) + "</li>")
						.find("li:last")
						.attr("langkey", longDesc[i]);
			}
		}
		else if(is.string(longDesc)){
			this.find(".long-desc").html(longDesc);
		}
		if(is.func(callback)){
			this.find(".tryagain")
				.show()
				.find("button")
				.click(callback);
		}

		return this;
	}
	
})();























 /**Создаёт новый экземпляр класса jsEthSettingsModel.
 * @class						Модель настроек АТМ.
 * @param	{Object}	ifnode	Узел интерфейса.	
 * @constructor
 */
 
function jsEthSettingsModel(ifnode) {
	jsEthSettingsModel.superclass.constructor.call(this);

	/**Узел L2 интерфейса.
	 * @type	Object
	 */
	this.ifnode = ifnode;

	/**LAN клиенты для выбора поля mac.
	 * Устанавливается из вне чтобы не плодить аргументы конструктора.
	 * @type	Object
	 */
	this.lanClients = null;
}
extend(jsEthSettingsModel, jsModel);


 
function jsEthSettingsController(ifnode, isadding, devicemac) {
	 jsEthSettingsController.superclass.constructor.call(this);

	this.changeModel(new jsEthSettingsModel(ifnode));

	this.ifaceTypes.client = {type: jsEthSettingsClientView, def:true};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsEthSettingsSummaryView};
	this.ifaceTypes.summary.options = {};
	
	this.oldMAC = ifnode.mac;
	
	this.addChild(new jsInputController(ifnode.mtu), "mtu");
	this.addChild(new jsMACComboController(ifnode.mac, this.model.lanClients, true, devicemac), "mac");
}
extend(jsEthSettingsController, jsController);



function jsEthSettingsClientView(ctrl, viewInx, options) {

	/**Обработчик клика на кнопку "Клонировать".*/
	this.getmacs = function(){
		this.ctrl.event("getmacsrq");
	}

	/**Обновить модель.
	 * Правит поля, касающиеся Eth, в model.ifnode.
	 * Так как ifnode это ссылка, то правится один и тот же узел во всех контролах.
	 */
	this.updateModel = function(){
		var res = jsEthSettingsClientView.superclass.updateModel.call(this);
		if(res){
			var ifnode = this.ctrl.model.ifnode;
			var macCtrl = this.getChild("mac").ctrl;
			ifnode.mtu = this.getChild("mtu").ctrl.model.value;
			ifnode.mac = macCtrl.model.toString();
			delete ifnode.mac_cloned;
			if(this.ctrl.oldMAC == ifnode.mac){
				delete ifnode.mac;
			}
			else if(macCtrl.userMAC){
				if(ifnode.mac.toLowerCase() == macCtrl.userMAC.toLowerCase()){
					ifnode.mac_cloned = true;
				}
			}
		}
		return res;
	}
	
	/**Обработчик события updaterq (обновление).
	 */
	this.onupdmodel = function() {
		this.getChild("mac").updateView();
		return false;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.hide();
		}
		else{
			//подробно
			this.show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsEthSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
		if(this.ctrl.model.ifnode.type == "ptm"){
			this.getChild("mac").disable();
			this.getChild("mtu").disable();
		}
	}
	
	var obj;
	var opt;
	var ifnode = ctrl.model.ifnode;
	
	this.blocks = ctrl.model.ifnode.blocks;
	
	obj = ctrl.getChild("mtu");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanMtu",
		minval: 0
	};

	opt = ctrl.getChild("mac").ifaceTypes.client.options;
	opt.humanName = "wanMac";
	ctrl.getChild("mac").LANClients = ctrl.model.lanClients;


	

	
	jsEthSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("updmodel", this.onupdmodel);
	this.bind("modeswitch", this.onmodeswitch);
	var wizard = ctrl.model.ifnode.wizard;
	if(this.blocks){
		options.nothing = true;
	}
	else{
		options.slider = true;
		options.collapsed = false;
		options.nocollapse = true;
		if(this.ctrl.model.ifnode.type == "ptm"){
			options.title = "";
		}
		else{
			options.title = "Ethernet";
		}
	}
}
extend(jsEthSettingsClientView, jsFieldSetClientView);


function jsEthSettingsSummaryView(ctrl, viewInx, options){
	jsEthSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		var options = this.options;
		options.nocollapse = true;
		this.getChild("mtu").options.hide = true;
		this.getChild("mac").options.hide = true;
		jsEthSettingsSummaryView.superclass.drawView.call(this);
	}

	/**Обновить представление.
	 * Всё сводится к тому, чтобы скрыть ненужное в режиме сводки.
	 */
	this.updateView = function(){
		jsEthSettingsSummaryView.superclass.updateView.call(this);

		var mtu = this.getChild("mtu");
		if(mtu.ctrl.modified) mtu.show();

		var mac = this.getChild("mac");
		if(mac.ctrl.modified) mac.show();
		
		if(!mtu.ctrl.modified && !mac.ctrl.modified) this.hide();
	}	

	this.bind("modeswitch", function(){return false;});
}
extend(jsEthSettingsSummaryView, jsEthSettingsClientView);





















function jsFastmenuModel(nodeInfo){
	jsFastmenuModel.superclass.constructor.call(this);
	
	if (no(nodeInfo)) {
		var nodeInfo = {name: null, image: null};
	}
	
	this.nodeName = nodeInfo.name;
	this.nodeImg = nodeInfo.image;
}
extend(jsFastmenuModel, jsModel);

function jsFastmenuController(nodeInfo, options){
	jsFastmenuController.superclass.constructor.call(this);

	if(!options) options = {};
	
	if(!this.contentOptions) this.contentOptions = {};
	if(options.contentOptions) this.contentOptions = options.contentOptions;
	
	this.changeModel(new jsFastmenuModel(nodeInfo));
	this.ifaceTypes.tree = {type: jsFastmenuView/*, def:true*/};

	this.integrate = function(childInx, parent){
		jsFastmenuController.superclass.integrate.call(this, childInx, parent);
		if (!this.frame) {
			this.frame = this.getParent(1).frame;
		}
		parent = this.getParent(1);
		if (parent instanceof jsFastmenuController && parent.level >= 0) {
			this.level = this.getParent(1).level + 1;
		}
	}

	this.level = 0;
	if (options.frame) {
		this.frame = options.frame;
	}
}
extend(jsFastmenuController, jsController);

function jsFastmenuView(ctrl, viewInx, options){
	jsFastmenuView.superclass.constructor.call(this, ctrl, viewInx, options);

	if(!options) options = {};
	
	this.slideDown = function() {
		$(this.childBoxSel).stop(false, true).slideDown(200);
	}
	
	this.slideUp = function() {
		$(this.childBoxSel).stop(false, true).slideUp(200);
	}
	
	this.clickItem = function() {
		this.ctrl.frame.event("menuchange", this);
		$(this.viewBoxSel).parent().stop(false, true);
		$(this.viewBoxSel).parent().slideUp(200);
		return false;
	}
	
	jsFastmenuView.prototype.drawView = function(){
		var children = this.ctrl.children;
		var child;
		var model = this.ctrl.model;

		if(!(this.getParent(1) instanceof jsFastmenuView)){
			this.ctrl.root = true;
		}
		
		this.childBoxSel = null;
		
		if (this.ctrl.root) {
			$(this.viewBoxSel).html("<ul class='fastmenu' />");
			this.myBoxSel = this.viewBoxSel + ">ul";
			this.childBoxSel = this.myBoxSel;
		} else {
			if (this.ctrl.level == 1) {
				$(this.viewBoxSel).addClass('fastmenu');
				$(this.viewBoxSel).html("<a href='#' class='fastmenu'>" + lng(model.nodeName) + "</a>");
				this.myBoxSel = this.viewBoxSel + ">a";
				if (children.length > 0) {
					$(this.viewBoxSel).append("<div class='temp'><ul class='fastmenuItem'></ul></div>");
				}
				this.childBoxSel = this.viewBoxSel + '>.temp>ul';
				$(this.viewBoxSel).unbind('mouseenter');
				$(this.viewBoxSel).unbind('mouseleave');
				$(this.viewBoxSel).mouseenter(context(this).callback(this.slideDown));
				$(this.viewBoxSel).mouseleave(context(this).callback(this.slideUp));
			} else {
				$(this.viewBoxSel).addClass('fastmenuItem');
				$(this.viewBoxSel).html("<a href='#' />");
				this.myBoxSel = this.viewBoxSel + ">a";
				var img = '';
				if (model.nodeImg) {
					img = model.nodeImg;
					$(this.myBoxSel).html("<img src='" + img + "' /> " + lng(model.nodeName));
				}else{
					$(this.myBoxSel).html(lng(model.nodeName));
				}
				$(this.myBoxSel).click(context(this).callback(this.clickItem));
			}
		}
		
		for (var i = 0; i < children.length; i++){
			$(this.childBoxSel).append("<li />");
			child = this.getChild(i);
			child.options.viewBoxSel = this.childBoxSel+">li:eq(" + i + ")";
			child.viewBoxSel = this.childBoxSel+">li:eq(" + i + ")";
			if (this.ctrl.level == 0) {
				if (children.length == 1) {
					$(child.viewBoxSel).addClass('single');
				} else {
					if (i == 0) $(child.viewBoxSel).addClass('first');
					if (i == children.length-1) $(child.viewBoxSel).addClass('last');
				}
			}
		}
		
		jsFastmenuView.superclass.drawView.call(this);
	}
}
extend(jsFastmenuView, jsCSideView);























function formLocalFwUpdate(){
	formLocalFwUpdate.superclass.constructor.call(this);

	this.updateView = function(phase){
		formLocalFwUpdate.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){
			//Инициализация полей формы
			this.startForm()
				.add(new nodeUpload("firmwareUpload", 'fwupdate.cgi', 'firmware', {
					mandatory: true,
					auto: false,
					browse: 'button_browse',
					cancel: 'button_cancel'
				}), "firmware_upload_form");
			this.endForm();

			//Инициализация кнопок
			this.cleanButtonBar()
				.addButton("button_upload")
				.getButton("button_upload")
				.bind("click.button", callback(this, function(){
					if(this.deep.updateModel()){
						this.get("firmware_upload_form").upload();
					}
				}));
		}
	}
	
	this.bind("uploading", function(status, value){
		// Началась загрузка
		this.getButton("button_upload").disable();
		rootCtrl.event("muterq"); // Из старой морды
		rootCtrl.event("startfwupdate"); // Из старой морды
	});
	
	this.bind("uploaded", function(status, value, data){
		// Загрузка завершилась
		if (data.indexOf("error") >= 0) {
			rootCtrl.event("badfwrq");
			this.getButton("button_upload").enable();
		}
	});

	this.bind("cancel", function(status, value){
		// Прервали загрузку
		this.getButton("button_upload").enable();
	});
}
extend(formLocalFwUpdate, node);

function formRemoteFwUpdate(){
	formRemoteFwUpdate.superclass.constructor.call(this);

	this.updateView = function(phase){
		formRemoteFwUpdate.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){

			var autoupd = this.autoupd;

			//Инициализация полей формы
			this.startForm()
				.add(new nodeCheckBox("enable_auto_check", autoupd.enable), "enable")
				.add(new nodetext("remote_server_url", autoupd.server), "server");
			
			//Инициализация кнопок
			if(autoupd.need_update){
				this.addButton("button_upload_remote")
					.getButton("button_upload_remote")
					.bind("button.click", function(event){
						rootCtrl.event("autoupdaterq");
					});
			}

			this.addButton("check_updates")
				.getButton("check_updates")
				.bind("button.click", callback(this, function(){
					if(confirm(lng("check_wait_warn"))){
						rootView.showWaitScreen(lng("fw_update_checking"), 30000, callback(this, function(){
							alert(lng("update_check_error"));
						}));
						device.config.write( 178, {
								check_updates: true,
								enable: this.get("enable").val(),
								server: this.get("server").val()
							}, callback(this, this.ondataready));
						this.isManual = true;
					}
				}));			
			
			this.addButton("apply_fw_settings")
				.getButton("apply_fw_settings")
				.bind("button.click", callback(this, callback(this, function(event){

					var server = this.get("server");
					var enable = this.get("enable");

					function __apply_settings(){
						if(this.deep.updateModel()){
							rootView.showModalOverlay();
							device.config.write( 178
								,{
									enable: enable.val(),
									server: server.val()
								}
								,callback(this, this.ondataready));
						}
					}

					if(server.deep.isModified() || (enable.deep.isModified() && enable.val())){
						if(confirm(lng("check_wait_warn"))){
							rootView.showWaitScreen(lng("fw_update_checking"), 30000, callback(this, function(){
								alert(lng("update_check_error"));
							}));
							__apply_settings.call(this);
						}
					}
					else{
						__apply_settings.call(this);
					}

				})));

			this.endForm();
		}
		else{
			var autoupd = this.autoupd;
			debug("status = ", autoupd.status);
			
			switch(autoupd.status){
				case "update_available":
					this.get("server")
						.setComment("<span langkey='autoupdNewVersion'>" + lng("autoupdNewVersion") + "</span> (" + autoupd.version + ")")
						.pluginEdit.find(".comment").css("color", "green");
					if(confirm(lng("update_avail_part1") + autoupd.version + lng("update_avail_part2"))){
						rootCtrl.event("autoupdaterq", true);
					}
				break
				case "device_is_not_supported":
					this.get("server")
						.setComment("autoupdFileAbsent")
						.pluginEdit.find(".comment").css("color", "red");
				break
				case "latest_fw_version":
					this.get("server")
						.setComment("new_version_unavailable")
						.pluginEdit.find(".comment").css("color", "gray");
				break
				case "update_not_checked":
					this.get("server")
						.cleanComment();
				break
				default:
					this.get("server")
						.cleanComment();

					if(this.isManual){
						this.isManual = false;
						alert(lng("autoupdUnknownError"));
					}

					if(autoupd.enable){
						this.get("server")
							.setComment("autoupdUnknownError")
							.pluginEdit.find(".comment").css("color", "red");
					}
			}
		}
	}
	
	this.ondataready = function(data){
		if (is.RPC_SUCCESS(data)) {
			this.autoupd = data.resident;
		}
		rootView.hideWaitScreen();
		rootView.hideModalOverlay();
		this.deep.updateView();
	}
}
extend(formRemoteFwUpdate, node);

function pageFirmware(){
	pageFirmware.superclass.constructor.call(this);

	this.startForm()
		.add(new nodeCaption("local_update"), "local_update").get("local_update")
			.add(new formLocalFwUpdate(), "form").get("..")
		.add(new nodeCaption("remote_update"), "remote_update").get("remote_update")
			.add(new formRemoteFwUpdate(), "form");
	this.endForm();

	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 178, callback(this, function(data){
			if (is.RPC_SUCCESS(data)) {
				this.get("remote_update/form").autoupd = data.resident;
				rootView.hideWaitScreen();
				rootView.hideModalOverlay();
				this.deep.updateView();
			}			
		}));
	});


}
extend(pageFirmware, node);

function nodeButton(name, value, options){
	nodeButton.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodeButton.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginButton = this.pluginEdit.find(".input").lightUIButton(this.val());
			if(options.disabled) this.disable();
			if(this.handler){
				this.buttonClick(this.handler);
			}
		}
		
		return this;
	}

	this.val = function(value){
		if(is.set(value)){
			this.value = value;
			if(this.pluginButton){
				this.pluginButton.title(value);
			}
			return this;
		}
		else{
			return this.value;
		}
	}
	
	this.disable = function(){
		this.options.disabled = true;
		if(this.pluginEdit && this.pluginButton){
			this.pluginEdit.disable();
			this.pluginButton.disable();
		}
		return this;
	}

	this.enable = function(){
		this.options.disabled = false;
		if(this.pluginEdit && this.pluginButton){
			this.pluginEdit.enable();
			this.pluginButton.enable();
		}
		return this;
	}

	this.buttonClick = function(handler){
		if(this.pluginButton){
			this.pluginButton.bind("button.click", handler);
		}
		this.handler = handler;
	}
	
	this.validate = function(){
		return null;
	}
	
	this.val(value);
	
	
}
extend(nodeButton, nodeInputBase);






















function pageFirmwareRemoteConfig(){
	pageFirmwareRemoteConfig.superclass.constructor.call(this);
	
	this.auto_update = null;
	
	this.add(new nodetext("firmwareConfigUrl", '', {
		mandatory: true
	}), "update_url");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageFirmwareRemoteConfig.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(this.child("update_url").val());
					}
				}));
		}
	}
	
	this.save = function(url) {
		rootView.showModalOverlay();
		this.auto_update = {
			'url': url,
			'enable': true,
			'fw_update': false
		};
		device.config.write( 165, {
			'auto_update': this.auto_update
		}, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 165, callback(this, function(data){
			this.deep.updateView();
			if(is.RPC_SUCCESS(data)){
				this.auto_update = data.resident.auto_update;
				this.child("update_url").val(this.auto_update.url);
			}
			rootView.hideModalOverlay();
		}));
	});
}
extend(pageFirmwareRemoteConfig, node);























function pageFlowControl(){
	pageFlowControl.superclass.constructor.call(this);
	
	this.json = null;
	
	this.add(new nodeCaption("menu_flow_control", "menu_flow_control_desc"));
	this.add(new nodeCheckBox("enable"), "enable");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageFlowControl.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			var json = this.json;
			if (json) {
				this.child("enable").val(json.enabled);
			}
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()){
						this.save();
					}
				}));
		}
	}
	
	this.save = function() {
		rootView.showModalOverlay();
		this.json = {
			'enabled': this.child("enable").val()
		};
		device.config.write( 176, this.json, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 176, callback(this, function(data){
			this.json = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	});
}
extend(pageFlowControl, node);






















 /**Создаёт новый экземпляр класса jsGeneralModel.
 * @class							Модель информации о wimax.
 * @param	{Object}	iftree		Дерево интерфейсов.
 * @param	{String}	ifname		Имя L2 интерфейса.
 * @param	{String}	srvname		Имя L3 интерфейса.
 * @param	{String}	tnlname		Имя L4 интерфейса.
 * @constructor
 */
function jsGeneralSettingsModel(iftree, ifname, srvname, tnlname, srvsname) {
	jsGeneralSettingsModel.superclass.constructor.call(this);

	/**Дерево интерфейсов.
	 * @type	Object
	 */
	this.iftree = iftree;

	/**Шаблоны соединений.
	 */
	this.templates = null;
	
	/**Заготовка соединения.
	 * @type	Object
	 */
	this.blankConn = null;
		

	this.isadding = !ifname;

	
	/**Список, доступных для данного типа соединения, узлов интерфейсов.
	 * @type	Object
	 */
	this.availIfaces = {};
	
	/**Узел интерфейса из blankConn. Вспомогательная инфа.
	 * @type	Object
	 */
	this.ifnode;
	
	/**Имя интерфейса из blankConn. Вспомогательная инфа.
	 * @type	String
	 */
	this.ifname;
	
	/**Узел сервиса из blankConn. Вспомогательная инфа.
	 * @type	Object
	 */
	this.service;
	
	/**Имя сервиса из blankConn. Вспомогательная инфа.
	 * @type	String
	 */
	this.srvname = srvname;

	/**Узел тонеля из blankConn. Вспомогательная инфа.
	 * @type	Object
	 */
	this.tunnel;
	
	/**Имя тонеля из blankConn. Вспомогательная инфа.
	 * @type	String
	 */
	this.tnlname = tnlname;
	
	/**Количество существующих соединений.
	 * @type	int
	 */
	this.connum = 0;

	this.selectTemplates = function(templates){
		this.templates = $.extend(true, {}, provList.man, templates);
	}
	
	/**Заполнить информационные поля основываясь на обязательных.*/
	this.fillInfoFields = function(){
		this.ifnode = null;
		this.ifname = null;
		this.ifnode = getObjectFirstChild(this.blankConn);
		this.ifname = getObjectFirstKey(this.blankConn);
		if(this.ifnode.services){
			this.service = getObjectFirstChild(this.ifnode.services);
			this.srvname = getObjectFirstKey(this.ifnode.services);
		}

		this.tunnel = null;
		if(!this.tnlname){
			if(this.service.tunnels){
				this.tunnel = getObjectFirstChild(this.service.tunnels);
				this.tnlname = getObjectFirstKey(this.service.tunnels);
			}
		}
		else if(this.service.tunnels){
			this.tunnel = this.service.tunnels[this.tnlname];
		}
		var ifnode;
		var service;
		this.connum = 0;
		for(var i in this.iftree){
			ifnode = this.iftree[i];
			if(ifnode.services){
				for(var j in ifnode.services){
					service = ifnode.services[j];
					this.connum++;
					if(service.tunnels){
						for(var k in service.tunnels){
							this.connum++;
						}
					}
				}
			}
		}
	}

	this.expandTemplates = function(){
		var iftree = this.iftree;
		var templates = this.templates;
		var template;
		var services;
		var ifnode;
		var service;
		var tunnel;
		var ifname;
		var isTunnel;
		var key;
		for(var t in templates){
			if(t != "pppoe"
				&& t != "pppoev6"
				&& t != "pppoedual"
				&& t != "pppoa"
				&& t != "static"
				&& t != "statkab"
				&& t != "dynamic"
				&& t != "dynkab"
				&& t != "staticv6"
				&& t != "dynamicv6"
				&& t != "ipoa"
				&& t != "statpptp"
				&& t != "statl2tp"
				&& t != "dynpptp"
				&& t != "dynl2tp"
				&& t != "statpppoe"
				&& t != "dynpppoe"
				&& t != "statpptpv6"
				&& t != "statl2tpv6"
				&& t != "dynpptpv6"
				&& t != "dynl2tpv6"
				&& t != "3g"
				&& t != "lte"
				&& t != "3glte"
				&& t != "bridge"
				&& t != "pptp"
				&& t != "l2tp"
				&& t != "624"
				&& t != "pptpv6"
				&& t != "l2tpv6") continue;
					
			template = templates[t];

			this.getAvailIfNames(t);
			for(var i in template){
				switch(i){
					case "any":						
						template.any.contype = t;
						for(var j in this.availIfaces){
							template[j] = $.extend(true, {}, this.availIfaces[j]);							
							ifnode = template[j];
							ifnode.contype = t;
							this.setL2HumanName(ifnode);
							service = getObjectFirstChild(template.any.services);
							isTunnel = (service.tunnels || getObjectLength(service.tunnels));
							if(isTunnel && ifnode.services && getObjectLength(ifnode.services)){
								service = null;
								for(var k in ifnode.services){
									if(no(service) && ifnode.services[k].type == "ip"){
										service = ifnode.services[k];
									}
									else{
										delete ifnode.services[k];
									}
								}
								
								if(service){
									service.tunnels = {};									
									key = getObjectFirstKey(template.any.services);
									service.tunnels = $.extend(true, service.tunnels, template.any.services[key].tunnels);									
								}
								else{
									ifnode.services = {};
									ifnode.services = $.extend(true, ifnode.services, template.any.services);
									service = getObjectFirstChild(ifnode.services);
								}
								service.dhcp = (t == "dynpppoe" || t == "dynpptp" || t == "dynl2tp" || t == "dynpptpv6" || t == "dynl2tpv6");
							}
							else{
								ifnode.services = {};
								if ( t == '3glte' ) {
									ifnode.services = $.extend(true, ifnode.services, template.any.services);
									var __k = getObjectFirstKey(ifnode.services);	
									
									ifnode.services[__k] = {
										__macro__: ifnode.services[__k].__macro__
									};
																
									switch( ifnode.dongle_type ) {
										case 0:
										case 1:
											/* 3G */											
											ifnode.services[__k] = $.extend(true, {}, ifnode.services[__k].__macro__['ppp']);											
											$.extend(true, ifnode.services[__k], template.any.services.create);							
										break;
										case 2:
											/* LTE */
											ifnode.services[__k] = $.extend(true, {}, ifnode.services[__k].__macro__['ip']);
										break;
									}
								} else {
									ifnode.services = $.extend(true, ifnode.services, template.any.services);
								}
							}
							service = getObjectFirstChild(ifnode.services);
								//Установить правильный link_type
								if(t == "pppoa"){
									ifnode.link_type = "MDMVS_PPPOA";
									ifnode.pvc_settings.encap = "vcmux";
								}
								else if(t == "ipoa"){
									ifnode.link_type = "MDMVS_IPOA";
								}
								else{
									if (ifnode.type == "atm") ifnode.link_type = "MDMVS_EOA";
									service.vlan = {};
									//Инициализировать секцию vlan
									this.setVLAN(ifnode, service);
								}
							var obj;
						}
						if(getObjectLength(template) > 1){
							delete template.any;
						}
					break;
				}
			}
		}
		
	}
	
	this.setVLAN = function(ifnode, service){
		if(ifnode.connection_mode){
			//Контрол VLAN использует дополнительные (не для передачи на сервер) поля для инициализации формы.
			//Для того, чтобы создать сервис типа ip или bridge на PVC на котором уже есть сервисы
			//необходимо установить эти дополнительные поля.
			//usempvc - использовать multi PVC
			//usempvcro - поле usempvc только для чтения
			//usevlan - использовать тегированный VLAN
			//usevlanro - поле usevlan только для чтения
			switch (ifnode.connection_mode) {
				case "VlanDefMode":
					service.vlan.usempvcro = true;
					service.vlan.usempvc = !this.isadding;
					service.vlan.usevlanro = false;
					service.vlan.usevlan = !no(service.vlan) && !no(service.vlan.vlanid) && service.vlan.vlanid >= 0;
				break;
				case "VlanMuxMode":
					service.vlan.usempvcro = true;
					service.vlan.usempvc = true;
					service.vlan.usevlanro = false;
					service.vlan.usevlan = !no(service.vlan) && !no(service.vlan.vlanid) && service.vlan.vlanid >= 0;
				break;
				case "NewMode":
					service.vlan.usempvcro = false;
					service.vlan.usempvc = false;
					service.vlan.usevlanro = false;
					service.vlan.usevlan = false;
				break;
				case "DefaultMode":
					delete service.vlan;
				break;
			}
		}
	}
	
	this.setL2HumanName = function(ifnode){
		if(no(ifnode)) ifnode = this.ifnode;
		if(ifnode.type == "atm"){
			if(ifnode.ifname == "create"){
				if(ifnode.port){
					ifnode.__humanName__ = ifnode.port + "(" + lng("new_") + ")";
				}
				else{
					ifnode.__humanName__ = "DSL(" + lng("new_") + ")";
				}
			}
			else{
				ifnode.__humanName__ = ifnode.ifname + "(" + ifnode.pvc_settings.vpi + "/" + ifnode.pvc_settings.vci + ")";
			}

		}
		else{
			ifnode.__humanName__ = ifnode.port?ifnode.port:ifnode.ifname;
		}
	}
	
	/**Получить имена доступных L2 интерфейсов для сервиса заданного типа.
	 * @param	contype	Тип соединения (не сервиса или туннеля, а именно соединения). Если не указан вычисляется из модели.
	 */		
	this.getAvailIfNames = function(contype){
		var iface;
		var tunnel = this.tunnel;
		var service = this.service;
		var ifnode = this.ifnode;
		var tree = this.iftree;
		var j = 0;
		var condition;
		var services;
		var serviceLength;
		var srv;
		var tunnels;
		this.availIfaces = {};
		var useless;
		var multmode;
		var needDelete;
		var c;

		if(!contype){
			contype = getConnType(this.ifnode, this.service);
		}
		
		if(contype == "ipsec") return;
		
		if(!this.isadding){
			this.availIfaces[this.ifname] = $.extend(true, {}, this.ifnode);
			this.setL2HumanName(this.availIfaces[this.ifname]);
			return;
		}

		for(var i in tree){
			needDelete = [];
			iface = tree[i];
			if(!iface.is_wan) continue;
			
			condition = false;
			useless = false;
			services = iface.services?iface.services:[];
			serviceLength = getObjectLength(services);
			checkContype = true;
			multmode = iface.connection_mode && (iface.connection_mode == "VlanMuxMode" || iface.connection_mode == "MultipleServiceMode");
			//При отбрасывании не учитываем текущий (редактируемый) интерфейс и сервис "create" (ifname = ""), которого ещё нет
				switch(contype){					
					case "3glte":
						useless = (iface.type != "usb")						
						condition = true;
						for(var i in services){
							if(services[i].type == "ppp" || services[i].type == "ip"){
								condition = false;
								needDelete.push(i);
							}
						}
					break;						
					case "3g":
						useless = (iface.type != "3g")
						condition = !useless && !serviceLength;
						if(!condition){
							for(var i in services){
								needDelete.push(i);
							}
						}
					break;
					case "lte":
						useless = (iface.type != "lte")
						condition = !useless && !serviceLength;
						if(!condition){
							for(var i in services){
								needDelete.push(i);
							}
						}
					break;
					case "pppoe":
					case "pppoev6":
					case "pppoedual":						
						useless = true;												
						if(iface.is_wan){							
							
							if(iface.type == "atm" && iface.link_type == "MDMVS_EOA"){
								useless = false;
								condition = true;								
								
							}else if(iface.type == "ethernet" || iface.type == "ptm" || iface.type == "bridge"){
								useless = false;
								condition = true;
							}
						}
					break;
					case "pppoa":
						useless = (iface.type != "atm" && iface.link_type != "MDMVS_PPPOA");
						condition = !useless && !serviceLength;
						if(!condition){
							for(var i in services){
								needDelete.push(i);
							}
						}
					break;
					case "static":
					case "statkab":
					case "dynamic":
					case "dynkab":
						useless = !((iface.type == "atm" && iface.link_type == "MDMVS_EOA") || iface.type == "ethernet" || iface.type == "ptm" || iface.type == "bridge");
						condition = true;
						if(!multmode){
							for(var i in services){								
								if (iface.connection_mode && iface.connection_mode == "VlanDefMode" && services[i].type == "ip" && contype == "dynamic") {
									condition = false;										
									if ( !is.object(services[i].vlan) || !is.number(services[i].vlan.vlanid) ) {
										needDelete.push(i);
									}											
								} else {								
									if(services[i].type != "ppp" && services[i].type != "pppv6" && services[i].type != "pppdual" && services[i].type != "ipv6"){
										condition = false;
										needDelete.push(i);
									}
								}
							}
						}
					break;
					case "staticv6":
					case "dynamicv6":						
						useless = !((iface.type == "atm" && iface.link_type == "MDMVS_EOA") || iface.type == "ethernet" || iface.type == "ptm" || iface.type == "bridge");
						condition = true;
						if(!multmode){
							for(var i in services){
								if(services[i].type == "ipv6" && services[i].dhcp && contype == "dynamicv6"){
									if ( iface.connection_mode && iface.connection_mode == "VlanDefMode" ) {
										condition = false;										
										if ( !is.object(services[i].vlan) || !is.number(services[i].vlan.vlanid) ) {
											needDelete.push(i);
										}										
									} else {
										condition = false;
										needDelete.push(i);
									}									
								}
							}
						}
					break;
					case "statpppoe":
					case "dynpppoe":
						if(iface.is_wan){
							if((iface.type == "auto") || (iface.type == "lte") || (iface.type == "3g")){
								useless = true;
								condition = true;
							}
						}
					break;
					case "statpptp":
					case "dynpptp":
					case "statl2tp":
					case "dynl2tp":
					case "statpptpv6":
					case "dynpptpv6":
					case "statl2tpv6":
					case "dynl2tpv6":
						useless = !(iface.type == "ethernet");
						condition = true;
						c = 0;
						for(var i in services){
							srv = services[i];
							if(c > 0 && srv.type == "ip"){
								condition = false;
								needDelete.push(i);
							}
							if(!c && (srv.tunnels && getObjectLength(srv.tunnels))){
								condition = false;
								for(var j in srv.tunnels){
									needDelete.push(j);
								}
							}
							if(srv.type == "ip") c++;
						}
					break;
					case "pptp":
					case "l2tp":
					case "pptpv6":
					case "l2tpv6":
					case "624":
						if(iface.type == "auto"){
							useless = false;
						}
						else{
							useless = true;
						}
						condition = useless;
					break;
					case "ipoa":
						useless = (iface.type != "atm" && iface.link_type != "MDMVS_IPOA");
						condition = !useless && !serviceLength;
						if(!condition){
							for(var i in services){
								needDelete.push(i);
							}
						}
					break;
					case "bridge":
						useless = !((iface.type == "atm" && iface.link_type == "MDMVS_EOA") || iface.type == "ethernet" || iface.type == "ptm" || iface.type == "bridge");
						condition = iface.is_wan;
						if(!multmode){
							for(var i in services){
								if(services[i].type != "ppp" && services[i].type != "pppv6" && services[i].type != "pppdual"){
									condition = false;
									needDelete.push(i);
								}
							}
						}
					break;
				}



			if(iface.ifname && !useless){
				this.availIfaces[iface.ifname] = $.extend(true, {}, iface);
				this.setL2HumanName(this.availIfaces[iface.ifname]);
				//Поставить признак необходимости удалить уже существующие сервисы или тонели
				this.availIfaces[iface.ifname].needDelete = needDelete.length?needDelete:null;
			}
		}

		//Добавить шаблоны содаваемых L2 интерфейсов
		var L2 = this.templates.L2;
		for(var i in L2){
			switch(i){
				case "atm":
					if(contype != "3glte" && contype != "3g" && contype != "lte" && !contype.match(/pptp|l2tp/)){
						this.availIfaces.create = L2[i];
						this.availIfaces.create.ifname = "create"
						this.setL2HumanName(this.availIfaces.create);
					}
				break;
			}
		}
	}
	
	this.updateTemplates = function(){
		this.expandTemplates();
		var templatesOfType = this.templates[this.templates.deftype];
		var ifname = getObjectFirstKey(templatesOfType);
		this.blankConn = {};
		this.blankConn[ifname] = templatesOfType[ifname];
		this.fillInfoFields();
	}
	
	this.selectTemplates({});
	
	var blankConn;
	var srvnode;
	var srvname;
	if(!ifname){
		//Если имя интерфейса отсутвует - обновляем шаблоны и добавляем костыль для создания нового соединения дефолтного типа.
		this.updateTemplates();
	}
	else{
		//ifname существует, т.е. работаем в режиме редактирования.
		var blankConn = {};
		blankConn[ifname] = $.extend(true, {}, iftree[ifname]);
		//чистка
		var services = srvsname?blankConn[ifname][srvsname]:blankConn[ifname].services;
		if(services){
			var service = blankConn[ifname].services[srvname];
			for(var i in services){
				if(services[i].ifname != srvname){
					delete services[i];
				}
			}
			var tunnels = services[srvname].tunnels;
			if(tunnels){
				for(var i in tunnels){
					if(tunnels[i].ifname != tnlname){
						delete tunnels[i];
					}
				}
			}
			var vlan = service.vlan;
			if(vlan){
				this.setVLAN(blankConn[ifname], service);
			}
		}
		this.blankConn = blankConn;
		this.fillInfoFields();
	}
	
}
extend(jsGeneralSettingsModel, jsModel);


function jsGeneralSettingsController(iftree, ifname, srvname, tnlname, srvipv6) {
	jsGeneralSettingsController.superclass.constructor.call(this);
	
	this.changeModel(new jsGeneralSettingsModel(iftree, ifname, srvname, tnlname, srvipv6));
	
	var model = this.model;
	var contype = getConnType(model.ifnode, model.service, model.tunnel);
	contype = contype?contype:model.ifnode.contype;

	/**Автоименование соединений*/
	this.autoname = function(contype, ifname){
		var ifnode = this.model.ifnode;
		if(ifname && ifname != "create"){
			ifnode = this.model.iftree[ifname];
		}
		else{
			ifname = this.model.ifname;
		}
		if(!contype){
			contype = this.model.ifnode.contype;
		}
		var L2;
		var inx = this.model.connum;
		switch(ifnode.type){
			case "atm":
				L2 = ifnode.pvc_settings.vpi + "_" + ifnode.pvc_settings.vci;
			break;
			case "ethernet":
			case "ptm":
			case "bridge":
			case "3g":
			case "lte":
			case "usb":
				L2 = ifnode.port?ifnode.port:ifname;
			break;
			case "auto":
				return contype + "_" + inx;
		}
		if(contype == "statpppoe" || contype == "dynpppoe"){
			return "pppoe_" + L2 + "_" + inx;
		}
		return contype + "_" + L2 + "_" + inx;
	}

	this.initProvList = function(ctrl, obj){
		var child;
		for(var i in obj){
			if(obj[i].deftype){
				obj[i].provname = i;
				ctrl.addChild(new jsProvListItemController({name: i, value: obj[i]}), i);
			}
			else{
				child = ctrl.addChild(new jsProvListItemController({name: i}), i);
				this.initProvList(child, obj[i]);
			}
		}
	}
	
	/**Признак добавление нового соединения.
	 * @type	bool
	 */
	this.isadding = (model.srvname == "create" || model.tnlname == "create");	
	
	var provstep = this.addChild(new jsFieldSetController(), "provstep");
	provstep.addChild(new jsDecorController(), "desc");
	var provs = provstep.addChild(new jsProvListController(provList.man), "provs");
		this.initProvList(provs.addItem(new jsProvListItemController(), "rootprov"), provList);
	var name = model.tunnel?model.tunnel.name:model.service.name?model.service.name:this.autoname();
	var enable = model.tunnel?model.tunnel.enable:model.service.enable;
	var gwif = model.tunnel?model.tunnel.gwif:model.service.gwif;

	this.addChild(new jsInputController(contype), "type");
	this.addChild(new jsInputController(model.ifname), "port");
	var namestep = this.addChild(new jsFieldSetController(), "namestep");
	namestep.addChild(new jsInputController(name), "name");
	namestep.addChild(new jsInputController(enable), "enable");
	namestep.addChild(new jsInputController(gwif), "gwif");
	//В случае добавления нового соединения всегда считаем это WAN 
	//поскольку в реальности список доступных L2 может быть пуст и мы не сможем определить реальное направление
	namestep.addChild(new jsInputController((model.ifnode.is_wan || this.isadding)?"WAN":"LAN"), "direction");
	
	this.ifaceTypes.client = {type: jsGeneralSettingsClientView, def:true, options:{}};
	this.ifaceTypes.summary = {type: jsGeneralSettingsSummaryView};
}
extend(jsGeneralSettingsController, jsFieldSetController);



function jsGeneralSettingsClientView(ctrl, viewInx, options) {
	
	this.drawView = function(){
		jsGeneralSettingsClientView.superclass.drawView.call(this);
	}
	
	/**Обновить представление.
	 */
	this.updateView = function(){
		var model = this.ctrl.model;
		var name = model.tunnel?model.tunnel.name:model.service.name?model.service.name:this.autoname();
		this.getChild("namestep", "name").ctrl.model.value = name;
		this.getChild("type").ctrl.model.value = model.ifnode.contype;
		this.getChild("port").ctrl.model.value = model.ifname;
		this.getChild("namestep", "enable").ctrl.model.value = model.service.enable;
		this.getChild("namestep", "gwif").ctrl.model.value = model.service.gwif;
		this.getChild("namestep", "direction").ctrl.model.value = (model.ifnode.is_wan || this.ctrl.isadding)?"WAN":"LAN";
		jsGeneralSettingsClientView.superclass.updateView.call(this);
	}
	
	/**Обновить модель.
	 * Не меняет костыль. Обновляет поля не меняющие костыль.
	 * Все валидаторы здесь.
	 */
	this.updateModel = function(){
		var nameObj = this.getChild("namestep", "name");
		nameObj.statusCode = null;
		var res = nameObj.updateModel();
		var enObj = this.getChild("namestep", "enable");
		enObj.updateModel();

		if(!res) return false;

		var name = nameObj.ctrl.model.toString();
		if(name == ""){
			nameObj.statusCode = "wanNameEmpty";
			res = false;
		}
		nameObj.setError();

		if(!res) return false;

		var model = this.ctrl.model;
		if(model.tunnel){
			model.tunnel.name = nameObj.ctrl.model.value;
			model.tunnel.enable = enObj.ctrl.model.value;
		}
		else{
			model.service.name = nameObj.ctrl.model.value;
			model.service.enable = enObj.ctrl.model.value;
		}

		var port = this.getChild("port");
		port.updateModel();
		if(no(port.ctrl.model.value)){
			res = false;
			var type = this.getChild("type");
			type.updateModel();
			switch(type.ctrl.model.value){
				case "3g":
				case "lte":
				case "3glte":
					port.statusCode = "wanNoUsbModemAvail";
				break;
				default:
					port.statusCode = "wanNoPhyIfaceAvail";
			}
			port.setError();
		}

		if(!res) return false;

		var model = this.ctrl.model;
		var obj = model.tunnel?model.tunnel:model.service;
		obj.name = name;
		obj.enable = this.getChild("namestep", "enable").ctrl.model.value;
		
		return true;
	}
	
	/**Обновить костыль соединения в модели.
	 */
	this.updateBlank = function(){
		this.getChild("type").updateModel();
		this.getChild("port").updateModel();
		var type = this.getChild("type").ctrl.model.toString();
		var ifname = this.getChild("port").ctrl.model.value;
		var model = this.ctrl.model;
		model.blankConn = {};

		if(no(ifname)){
			ifname = getObjectFirstKey(model.templates[type]);
		}
		model.blankConn[ifname] = model.templates[type][ifname];
	
		model.fillInfoFields();
		model.ifnode.contype = type;
	}
	
	/**Действия при изменении полей.
	 * @see jsInputClientView#onfieldchangejq
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;	//индекс контроллера в массиве children
		var wizard = this.ctrl.model.iftree.wizard;
		
		switch(alias){
			case "type":
				this.initPortValset(obj.value);
				var port = this.getChild("port");
			//нужно чтобы при переключении ConectionType, поле выбора для Interface сбрасывало свое последнее значение
				var portfield = port.ctrl.getChild();
				if (portfield && portfield.views) {
					portfield.views[this.viewInx].lastValue = null;
				}
				port.drawView();
				this.updateBlank();
				if(wizard){
					port.drawView();
					port.updateModel();
					if(no(port.ctrl.model.value)){
						this.ctrl.event("nophyiface", null, true);
						if(obj.value == "3glte" || obj.value == "3g" || obj.value == "lte"){
							alert(lng("wanNoUsbModemAvail"));
						}
						else{
							alert(lng("wanNoPhyIfaceAvail"));
						}
					}
					else{
						this.ctrl.event("phyifacepresent", null, true);
					}
				}
				else{
					this.ctrl.getParent().event("blankchange");
				}
				this.autoname(obj.value);
				if(obj.value == "dynpptp"
					|| obj.value == "dynl2tp"
					|| obj.value == "dynpppoe"){
					this.ctrl.model.service.name = this.ctrl.autoname("dynamic");
				}
				else if(obj.value == "statl2tp"
					|| obj.value == "statpptp"
					|| obj.value == "statpppoe"){
					this.ctrl.model.service.name = this.ctrl.autoname("static");
				}
				this.ctrl.event("showneedpindialogrq", null, true);
				if ( obj.value == '3glte' ) {
					var prov = this.getChild("provstep", "provs");										
					if ( prov.ctrl.model.value.deftype == '3g' || prov.ctrl.model.value.deftype == '3glte' ) {
						this.onfieldchange( prov );					
					}					
				}				
			break;
			case "port":
				this.updateBlank();
				if(!wizard){
					this.ctrl.getParent().event("blankchange");
				}
				this.autoname(null, obj.value);
				this.getChild("type").updateModel();
				var contype = this.getChild("type").ctrl.model.value;
				if(obj.value == "dynpptp"
					|| obj.value == "dynl2tp"
					|| obj.value == "dynpppoe"){
					this.ctrl.model.service.name = this.ctrl.autoname("dynamic", obj.value);
				}
				else if(obj.value == "statpptp"
					|| obj.value == "statl2tp"
					|| obj.value == "statpppoe"){
					this.ctrl.model.service.name = this.ctrl.autoname("static", obj.value);
				}
			break;
			case "provs":
				obj.view.updateModel();
				var model = this.ctrl.model;			
				this.ctrl.model.selectTemplates(obj.value);
				this.ctrl.model.updateTemplates();				
				this.initPortValset(model.ifnode.contype);
				this.getChild("port").drawView();

				for(var i in this.ctrl.children){
					if(this.ctrl.children[i].alias != "provstep"){
						this.getChild(i).drawView();
					}
				}

				this.updateView();
				if(!wizard){
					this.ctrl.getParent().event("blankchange");
				}
				this.autoname();
			break;
		}
		return false;
	}
	
	this.initPortValset = function(contype){
		if(no(contype)){
			contype = getConnType(this.ctrl.model.ifnode, this.ctrl.model.service);
		}
		
		var valset = {};
		var t = this.ctrl.model.templates[contype];
		for(var i in t){
			if(i != "any"){
				if(this.wizard && this.ctrl.isadding && !options.summary){
					valset[i] = {
						value: t[i].__humanName__
					};
					var obj = valset[i];
					switch(t[i].type){
						case "ethernet":
							obj.desc = lng("wanEthPort");
						break;
						case "ptm":
							obj.desc = lng("wanPtmPort");
						break;
						case "atm":
							if(i == "create"){
								obj.desc = lng("wanAddNew") + " " + lng("wanATMPort");
							}
							else{
								obj.desc = lng("wanATMPort");
							}
						break;
						case "3g":
						case "lte":
							obj.desc = lng("wan3GPort")+' ('+t[i].type.toUpperCase()+')';
						break;
						case "auto":
							obj.desc = lng("wanAutoPort");
						break;
					}
				}
				else{
					valset[t[i].__humanName__] = i;
				}
			}
		}
		var port = this.getChild("port");
		port.setOption("valset", valset);

		var firstValue = getObjectFirstChild(valset);
		port.ctrl.model.value = firstValue;
		
	}
	/**Автоименование соединений*/
	this.autoname = function(contype, ifname){
		var name = this.getChild("namestep", "name");
		if(!name.ctrl.modified){
			name.ctrl.model.value = this.ctrl.autoname(contype, ifname);
			name.updateView();
		}
	}

	this.drawView = function(){
		var ctrl = this.ctrl;
		var valset = {};
		if(ctrl.isadding){
			this.initPortValset();
		}
		else{
			ctrl.model.setL2HumanName();
			valset[ctrl.model.ifnode.__humanName__] = ctrl.model.ifname;
			this.getChild("port").options.valset = valset;
		}

		jsGeneralSettingsClientView.superclass.drawView.call(this);
	}
	
	var obj;
	var opt;

	//Признак фунциклирования в мастере
	this.wizard = ctrl.model.iftree.wizard;
	
	
	obj = ctrl.getChild("provstep");
	obj.nextIface = "client";
	obj.ifaceTypes.client.options = {
		nothing: true
	};

	obj = ctrl.getChild("provstep", "provs");
	obj.nextIface = "selectex";
	obj.ifaceTypes.selectex.options = {
		humanName: "wanProv",
		editable: true
	};
	obj.ifaceTypes.selectex.options.hide = !ctrl.isadding || getObjectLength(provList) < 2;
	
	obj = ctrl.getChild("namestep");
	obj.nextIface = "client";
	if(this.wizard){
		obj.ifaceTypes.client.options = {
			nothing: true,
			slider: true,
			title: "wanNameWiz",
			descText: "wanNameDesc",
			nocollapse: true
		};
	}
	else{
		obj.ifaceTypes.client.options = {
			nothing: true
		};
	}
	
	obj = ctrl.getChild("namestep", "name");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanName",
		mandatory: true
	};
	obj.ifaceTypes.input.options.disabled = !ctrl.isadding;
	
	if(this.wizard && ctrl.isadding && !options.summary){
		obj = ctrl.getChild("type");
		obj.nextIface = "radio2";
		obj.ifaceTypes.radio2.options = {
			humanName: "wanTypeWiz"
		};
		opt = obj.ifaceTypes.radio2.options;
		opt.valset = {
		};
		opt.valset.pppoe = {
			value: "PPPoE",
			desc: lng("pppoedesc")
		};
		opt.valset.static = {
			value: lng("static"),
			desc: lng("staticdesc")
		};
		opt.valset.dynamic = {
			value: lng("dynamic"),
			desc: lng("dynamicdesc")
		};
		opt.valset.statpptp = {
			value: lng("statpptp"),
			desc: lng("statpptpdesc")
		};
		opt.valset.dynpptp = {
			value: lng("dynpptp"),
			desc: lng("dynpptpdesc")
		};
		opt.valset.statpppoe = {
			value: lng("statpppoe"),
			desc: lng("statpppoedesc")
		};
		opt.valset.dynpppoe = {
			value: lng("dynpppoe"),
			desc: lng("dynpppoedesc")
		};
		opt.valset.pptp = {
			value: "PPTP",
			desc: lng("pptpdesc")
		};
		opt.valset.statl2tp = {
			value: lng("statl2tp"),
			desc: lng("statpptpdesc")
		}
		opt.valset.dynl2tp = {
			value: lng("dynl2tp"),
			desc: lng("dynpptpdesc")
		};
		opt.valset.l2tp = {
			value: lng("L2TP"),
			desc: lng("pptpdesc")
		};
	}
	else{
		obj = ctrl.getChild("type");
		obj.nextIface = "select";
		obj.ifaceTypes.select.options = {
			humanName: "wanType"
		};
		opt = obj.ifaceTypes.select.options;
		if(ctrl.model.ifnode.is_wan || ctrl.isadding){
		opt.valset = {
		};
		opt.valset["PPPoE"] = "pppoe";
		opt.valset[lng("static")] = "static";
		opt.valset[lng("dynamic")] = "dynamic";
		opt.valset[lng("statpptp")] = "statpptp";
		opt.valset[lng("dynpptp")] = "dynpptp";
		opt.valset[lng("statpppoe")] = "statpppoe";
		opt.valset[lng("dynpppoe")] = "dynpppoe";
		opt.valset["PPTP"] = "pptp";
		opt.valset[lng("statl2tp")] = "statl2tp";
		opt.valset[lng("dynl2tp")] = "dynl2tp";
		opt.valset["L2TP"] = "l2tp";
  		}
		else{
			opt.valset = {
				"Static IP":"static"
			};
		}
	}

	if(!ctrl.isadding){
		opt.disabled = true;
	}	
	
	obj = ctrl.getChild("provstep", "desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "wanGenSect"
	};
	if(this.wizard){
		obj.ifaceTypes.separator.options.label = "wanProvSect";
		obj.ifaceTypes.separator.options.descText = "wanProvDesc";
	}

	obj = ctrl.getChild("port");
	
	if(this.wizard && ctrl.isadding && !options.summary){
		obj.nextIface = "radio2";
		obj.ifaceTypes.radio2.options = {
			humanName: "wanPortWiz"
		};
		opt = obj.ifaceTypes.radio2.options;
	}
	else{
		obj.nextIface = "select";
		obj.ifaceTypes.select.options = {
			humanName: "wanPort"
		};
		opt = obj.ifaceTypes.select.options;
	}
	if(!ctrl.isadding){
		opt.disabled = true;
	}

	obj = ctrl.getChild("namestep", "enable");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanEnable",
		valset: {on:true, off:false}
	};
	obj.ifaceTypes.checkbox.options.hide = !ctrl.model.ifnode.is_wan || this.wizard;

	obj = ctrl.getChild("namestep", "gwif");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanGwIf",
		valset: {on:true, off:false},
		hide: true	//!!!система не суппортит!!!
	};

	obj = ctrl.getChild("namestep", "direction");
	obj.nextIface = "text";
	obj.ifaceTypes.text.options = {
		humanName: "wanDirection"
	};
	obj.ifaceTypes.text.options.hide = this.wizard;
	
	jsGeneralSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	if(ctrl.isadding){
		this.initPortValset();
	}
	else{
		ctrl.model.setL2HumanName();
		var port = this.getChild("port");
		port.options.valset = {};
		var valset = {};
		valset[ctrl.model.ifnode.__humanName__] = ctrl.model.ifname;
		//Из-за 2х уровневого контрола после вызова базового конструктора опцию выставляем не простым присваиванием, а вызовом setOption
		this.getChild("port").setOption("valset", valset);
	}
	
	this.bind("fieldchange", this.onfieldchange);
}
extend(jsGeneralSettingsClientView, jsFieldSetClientView);


function jsGeneralSettingsSummaryView(ctrl, viewInx, options) {
	jsGeneralSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.onupdatenamerq = function(){
		this.getChild("namestep", "name").updateView();
		return false;
	}
	
	/**Отрисовка представления.
	 * Скрываем лишние поля.
	 */
	this.drawView = function(){
		var namestep = this.getChild("namestep");
		namestep.options.nothing = true;
		namestep.options.slider = false;
		var desc = this.getChild("provstep", "desc");
		desc.options.hide = false;
		desc.options.label = "wanGenSect";
		desc.options.descText = null;
		jsGeneralSettingsSummaryView.superclass.drawView.call(this);
	}
	this.bind("fieldchange", function(){});
	this.bind("updatenamerq", this.onupdatenamerq);
}
extend(jsGeneralSettingsSummaryView, jsGeneralSettingsClientView);


function jsProvListItemController(itemInfo, options){
	jsProvListItemController.superclass.constructor.call(this, itemInfo, options);

	if (itemInfo == undefined) {
		itemInfo = {};
	}

	this.changeModel(new jsSelectExItemModel(itemInfo));	
	this.ifaceTypes.tree = {type: jsProvListItemView, def:true, options: {style:null,open:false,noPath:true}};
}
extend(jsProvListItemController, jsController);

 
function jsProvListItemView(ctrl, viewInx, options){
	jsProvListItemView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsProvListItemView.prototype.drawView = function(){
		jsProvListItemView.superclass.drawView.call(this);

		if (!this.ctrl.root) {
			var noimage = false;
			switch(this.ctrl.model.itemName){
				case "russia":
					img = "ru.gif";
				break;
				case "ukraine":
					img = "ua.gif";
				break;
				case "kazakhstan":
					img = "kz.gif";
				break;
				case "azerbaijan":
					img = "az.gif";
				break;
				case "latvia":
					img = "lv.gif";
				break;
				case "estonia":
					img = "ee.gif";
				break;
				case "lithuania":
					img = "lt.gif";
				break;
				case "man":
				case "azercell":
				case "bakcell":
				case "etk":
				case "kcell":
				case "life":
				case "matrixmobile":
				case "narmobile":
				case "ncc":
				case "neo":
				case "pathword":
				case "simtravel":
				case "smarts":
				case "tambovgsm":
				case "tatincomncc":
				case "umc":
				case "utel":
				case "altaysviaz":
				case "bwc":
				case "kyivstar":
				case "megafon":
				case "motiv":
				case "mts":
				case "stekgsm":
				case "tele2":
				case "ulgsm":
				case "diex":
				case "uucn":
				case "djuice":
				case "beeline":
					img = this.ctrl.model.itemName + ".gif";
				break;
				case "skylink":
					img = "skylink.png";
				break;
				case "jeans":
					img = "mts.gif";
				break;
				case "abkyivstar":
					img = "kyivstar.gif";
				break;
				default:
					noimage = true;
				break;
			}
			
			if(!noimage){
				$(this.myBoxSel).css("background", "url(/image/" + img + ") no-repeat");
				$(this.myBoxSel).css("font-size", "14px");
			}


		}

	}


	
}
extend(jsProvListItemView, jsSelectExItemView);

function jsProvListController(value){
	jsProvListController.superclass.constructor.call(this, value);

	this.getChild("field").ifaceTypes.selectex = {type: jsProvListView};
}
extend(jsProvListController, jsInputController);

 
function jsProvListView(ctrl, viewInx, options){
	jsProvListView.superclass.constructor.call(this, ctrl, viewInx, options);
	

}
extend(jsProvListView, jsSelectExClientView);






















 /**Создаёт новый экземпляр класса jsHelpController.
 * @class Контроллер модуля помощи.
 * @param	{string}	Ключ страницы. 
 * @constructor
 */
 
function jsHelpModel(key_page){
	jsHelpModel.superclass.constructor.call(this);
	
	this.key_page = key_page;
}
extend(jsHelpModel, jsModel);



function jsHelpController(key_page){		
	jsHelpController.superclass.constructor.call(this);
	
	this.changeModel(new jsHelpModel(key_page));
	this.ifaceTypes.client = {type: jsHelpClientView, def: true};
}
extend(jsHelpController, jsController);



function jsHelpClientView(ctrl, viewInx, options){
	jsHelpClientView.superclass.constructor.call(this, ctrl, viewInx, options);
				
	this.onhelplink = function(){
		/*var speedContent = 400;
		var speedHelp = 600;
		
		if (!$(this.pageContent).is(':visible')) {
			speedContent = 600;
			speedHelp = 400;
		}
		
		$(this.pageContent).animate({
			'width': 'toggle'
		}, speedContent);
		
		$(this.pageHelpFull).animate({
			'width': 'toggle'
		}, speedHelp, context(this).callback(this.setLinkText));*/
		$(this.pageContent).animate({
			'opacity': 'toggle'
		}, 200);
		
		$(this.pageHelpFull).animate({
			'opacity': 'toggle',
			'width': 'toggle'
		}, 400, context(this).callback(this.setLinkText));
		return false;
	}
	
	this.setLinkText = function() {
		var text = lng("read_more");
		
		if ($(this.pageHelpFull).css('display') != 'none') {
			text = lng('back_to_settings');
		}
		$(this.viewBoxSel+'>.shortHelpBlock>.helpMore>a').text(text);
	}
	
	jsHelpClientView.prototype.drawView = function(){
		var key_page = this.ctrl.model.key_page;
		var htmlToDraw = '';
		
		$(this.viewBoxSel).html('');
		
		if ( key_page && lng("help_"+key_page) != "help_"+key_page ){
			
			htmlToDraw	=	"<div class='shortHelpBlock unselectable'>";
			htmlToDraw	+=	"<div class='helpIcon'><img src='image/helpme.png' /></div>";
			htmlToDraw	+=	"<div class='helpText'>" + lng("help_"+key_page) + "</div>";
			htmlToDraw	+=	"<div class='helpMore'><a href='#'></a></div>";
			htmlToDraw	+=	"</div>";
			$(this.viewBoxSel).html(htmlToDraw);
			this.setLinkText();
			$(this.viewBoxSel+'>.shortHelpBlock>.helpMore>a').click(context(this).callback(this.onhelplink));
			//----------------------------------------------------------
			htmlToDraw	=	"<div>" + lng("help_ex_"+key_page) +"</div>";
			$(this.pageHelpFull+'>#helpGeneral').html(htmlToDraw);
		} else {
			htmlToDraw	=	"<div class='shortHelpBlock unselectable'>";
			htmlToDraw	+=	"<div class='helpIcon'><img src='image/helpme.png' /></div>";
			htmlToDraw	+=	"<div class='helpText' style='color:#AAA'>" + lng("help_none") + "</div>";
			htmlToDraw	+=	"</div>";
			$(this.viewBoxSel).html(htmlToDraw);
			$(this.pageHelpFull+'>#helpGeneral').html('');
		}
		
		$('#pageHelpFull').css('display', 'none');
		$('#pageContent').css('display', 'block');		
		
		jsHelpClientView.superclass.drawView.call(this);
	}

	this.pageContent = '#pageContent';
	this.pageHelpFull = '#pageHelpFull';
	
	this.bind("updateHelp", this.drawView);
}
extend(jsHelpClientView, jsCSideView);




















function jsIfListModel(json, value){
	jsIfListModel.superclass.constructor.call(this, value);
	
	this.json = json;
	
}
extend(jsIfListModel, jsInputModel);

function jsIfListController(json, value){
	jsIfListController.superclass.constructor.call(this);
	
	this.createValSet = function(){
		var services = null;
		var tunnels = null;
		var json = this.model.json;
		var valset = {};
		for(var i in json){
			if(this.filter.onlyWANs && !json[i].is_wan) continue;
			services = json[i].services;
			if(services){
				for(var j in services){
					tunnels = services[j].tunnels;
					if(tunnels){
						for(var k in tunnels){
							valset[tunnels[k].name] = k;
						}
					}
					valset[services[j].name] = j;
				}
			}
		}
		if(this.filter.drawAutoIface) valset["&lt;"+lng("type_start_auto")+"&gt;"] = "auto";
		this.ifaceTypes.select.options.valset = valset;
		this.ifaceTypes.radio.options.valset = valset;
		return valset;
	}

	this.ifaceTypes.select = {type: jsInputSlotView, options: {}};
	this.ifaceTypes.radio = {type: jsInputSlotView, options: {}};

	this.addChild(new jsInputFieldController(value), "field").changeModel(new jsIfListModel(json, value));
	this.changeModel(this.getChild("field").model);
	
	this.filter = {onlyWANs: true};
	
	this.createValSet();
}
extend(jsIfListController, jsEditController);






















function pageMisc(){
	pageMisc.superclass.constructor.call(this);
	
	this.updateView = function(phase){
		pageMisc.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			try{
				this.startForm();
				var answerNetFilter = this.rq[this.inxNetFilter];
				if(is.RPC_SUCCESS(answerNetFilter)){
					var jsonNetFilter = this.jsonNetFilter = $.extend(true, {}, answerNetFilter.resident.netfilter);
					this.add(new nodeCheckBox("SIP", jsonNetFilter.sip), "sip")
						.add(new nodeCheckBox("RTSP", jsonNetFilter.rtsp), "rtsp");
				}
				var answerPppPassThrow = this.rq[this.inxPppPassThrow];
				if(is.RPC_SUCCESS(answerPppPassThrow)){
					var jsonPppPassThrow = this.jsonPppPassThrow = $.extend(true, {}, answerPppPassThrow.resident);
					this.add(new nodeCheckBox("wanPppoePassThrough", jsonPppPassThrow.enabled), "pppPassThrow");
				}


				this.endForm();
				
				this.cleanButtonBar()
					.addButton("button_save")
					.getButton("button_save")
					.bind("click.button", callback(this, function(){
						if(this.deep.updateModel()){
							var query = [];
							if(this.jsonNetFilter){
								this.inxNetFilter = query.length;
								query.push([ 183, {netfilter: this.jsonNetFilter}]);
							}
							if(this.jsonPppPassThrow){
								this.inxPppPassThrow = query.length;
								query.push([ 188, {enabled: this.get("pppPassThrow").val() }]);
							}

							rootView.showModalOverlay();
							device.config.write(query, callback(this, function(data){
								rootView.hideModalOverlay();
								this.emit("updaterq");
							}));
						}
					}));
			}
			catch(e){
				this.$box.errorBlock(lng("error"), e.message, null, lng("refresh"), callback(this, function(){
					this.emit("updaterq");
				}));
			}
			rootView.hideModalOverlay();
		}
	}
	
	this.updateModel = function(status){
		if(status.error) return;
		var jsonNetFilter = this.jsonNetFilter;
		if(jsonNetFilter){
			jsonNetFilter.rtsp = this.get("rtsp").val();
			jsonNetFilter.sip = this.get("sip").val();
		}
		

	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		
		var RPC_LIST = [];
		this.inxNetFilter = RPC_LIST.length;
		RPC_LIST.push( 183);
		this.inxPppPassThrow = RPC_LIST.length;
		RPC_LIST.push( 188 );

	
		device.config.read(RPC_LIST, callback(this, function(data){
			this.rq = data.rq;
			this.deep.updateView();
		}));
	});
}
extend(pageMisc, node);





















function gridIPFilters(rules) {
	gridIPFilters.superclass.constructor.call(this);

	this.ipfltProtoNames = ["TCP/UDP", "TCP", "UDP", "ICMP", "all_"];
	this.ipfltActions = ["macfAccept", "macfDrop"];

	this.rules = rules;
	this.$grid = null;

	var firstLaunch = true;

	function checkIPv6(ip) {
		var ipbuf = ip.split(':');
		if (ipbuf.length > 4) {
			for (var j = 0, ipstart = ""; j < (ipbuf.length - 1); j++) {
				ipstart += (ipbuf[j] != ":")?(ipbuf[j] + ":"):":";
				if (j == 2) {
					ipstart += "</br>";
				}
				if (j == 5) {
					ipstart += "</br>";
				}
			}
			ipstart += ipbuf[ipbuf.length - 1];
			ip = ipstart;
		}
		return ip;
	}

	this.updateView = function(phase){
		pageIPFilters.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var header = [];
			header.push([
					{name: "", colspan: 2}
				,	{name: "ip_address", colspan: 2}
				,	{name: "ipfltPort", colspan: 2}
				,	{name: "", colspan: 2}
			]);
			header.push([
					{index: "id", name: "ruleID"}
				,	{index: "proto", name: "protocol"}
				,	{index: "ipsrc", name: "ipfltSource"}
				,	{index: "ipdst", name: "destination"}
				,	{index: "portsrc", name: "ipfltSource"}
				,	{index: "portdst", name: "destination"}
				,	{index: "action", name: "ipfltAction"}
				,	{index: "state", name: "status"}
			]);

			this.$grid = this.$box.lightUIGrid(header, 0, {clickable: true, selectable: true});

			function setParam($row, param, name, value){
				if(param){
					if(is.unset(value)) value = param;
					$row.col(name).html(value).data("value", param);
				}
				else{
					$row.col(name).html(lng("all_")).attr("langkey", "all");
				}
			}

			var $row;
			var rule;
			var arr;
			var str;
			for(var i in this.rules){
				rule = this.rules[i];
				$row = this.$grid.addRow().row("last");
				$row.col("id").html(rule.id).data("id", rule.id);
				$row.col("proto").html(lng(this.ipfltProtoNames[rule.proto]))
									.data("proto", rule.proto)
									.attr("langkey", this.ipfltProtoNames[rule.proto]);
				if(rule.ips){
					arr = rule.ips.split("-");
					if(arr[1]){
						str = arr[0] + "<br>-<br>" + arr[1]
					}
					else{
						str = rule.ips;
					}
				}
				setParam($row, rule.ips, "ipsrc", str);

				if(is.string(rule.ips) && !rule.ips.match(/:/)){
					var ipv4 = new IPv4(rule.ips);
						ip = ipv4.toString(true);
				}
				else{
						ip = rule.ips?checkIPv6(rule.ips):empty;
				}
				if(rule.ips != "") {
					$row.col("ipsrc").html(ip);
				}

				if(rule.ipd){
					arr = rule.ipd.split("-");
					if(arr[1]){
						str = arr[0] + "<br>-<br>" + arr[1]
					}
					else{
						str = rule.ipd;
					}
				}
				setParam($row, rule.ipd, "ipdst", str);

				if(is.string(rule.ipd) && !rule.ipd.match(/:/)){
					var ipv4 = new IPv4(rule.ipd);
						ip = ipv4.toString(true);
				}
				else{
						ip = rule.ipd?checkIPv6(rule.ipd):empty;
				}
				if(rule.ipd != "") {
					$row.col("ipdst").html(ip);
				}

				setParam($row, rule.ports, "portsrc");
				setParam($row, rule.portd, "portdst");

				$row.col("action").html(lng(this.ipfltActions[rule.action]))
									.data("action", rule.action)
									.attr("langkey", this.ipfltActions[rule.action]);
				$row.col("state").html(rule.state?lng("on"):lng("off")).data("state", rule.state);
			}

			this.$grid.bind("selection.grid", callback(this, function(){
				this.parent.updateRuleButtons();
			}));

			this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row){
				var rule = {
					id:				$row.col("id").data("id"),
					proto:			$row.col("proto").data("proto"),
					ips:			$row.col("ipsrc").data("value"),
					ipd:			$row.col("ipdst").data("value"),
					ports:			$row.col("portsrc").data("value"),
					portd:			$row.col("portdst").data("value"),
					action:			$row.col("action").data("action")
				,	state:			$row.col("state").data("state")
				}
				this.parent.edit(rule, $row.irow());
			}));
		}

	}

	this.bind("updaterq", function(){
		this.deep.updateView();
	});

}
extend(gridIPFilters, node);

function pageIPFilters(){
	pageIPFilters.superclass.constructor.call(this);

	this.grid = new gridIPFilters(this.json);

	this.updateView = function(phase){
		pageIPFilters.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){

			this.add(this.grid);
 			var json = this.json;

			this.updateRuleButtons = function(){
				if(this.grid.$grid.selection().not(":hidden").length) {
					this.getButton("button_del").enable();
				} else{
					this.getButton("button_del").disable();			
				}
			}

			this.cleanButtonBar()
				.addButton("add")
				.getButton("add")
				.bind("click.button", context(this).callback(function(){
					this.edit();
				}));
			this.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(json){
					this.clearFilter(json, this.grid.$grid);
				}, json));
			if ( disableFlag(88) )  {                     
				this.getButton("add").children('div').addClass('disable');
				this.getButton("button_del").children('div').addClass('disable');
			}
		}
	}
	
	
	this.clearFilter = function(ruleall, grid){
		var rmlist = new Array();
		for (var i = grid.nrow(); i >= 0; i--) {
			if(grid.row(i).hasClass('selected')) {
				rmlist.push([ 88, ruleall[i], i]);
			}
		}
		if (rmlist.length) {
			rootView.showModalOverlay();
			device.config.remove(rmlist, callback(this, function(data){
				this.emit("updaterq");
			}));
		}
	}

	this.edit = function(rule, pos){
		this.$box.unbind();
		var ruleNode = new ruleIPFilters(this.iftree, this.lanClients, this.json, this.grid.ipfltProtoNames, this.grid.ipfltActions, rule, pos);
		ruleNode.buttonBar(this.buttonBar())
				.deep.updateView(this.$outerBox)
				.cleanButtonBar()
				.addButton("button_prev")
				.getButton("button_prev")
				.bind("click.button", context(this).callback(function(){
					if(!checkChanges() || confirm(lng("leavePageMes"))){
						this.emit("updaterq");
					}
				}));
		if(is.object(rule)){
			ruleNode.addButton("button_del")
					.getButton("button_del")
					.bind("click.button", context(this).callback(function(){
						rootView.showModalOverlay();
						device.config.remove( 88, rule, pos,  context(this).callback(function(){
							rootView.hideModalOverlay();
							this.emit("updaterq");
						}));
					}));
                       if ( disableFlag( 88) )                        
                        ruleNode.getButton("button_del").children('div').addClass('disable');
		}
		ruleNode.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", context(this).callback(function(){
					ruleNode.deep.updateModel();
					if(ruleNode.status.error){
					}
					else{
						rootView.showModalOverlay();
						
						//~ function addIpMask(ipval){
							//~ var ipval = ipval;
							//~ if(ipval.split("-").length < 2) {
								//~ if(!is.set(ipval.split("/")[1])){
									//~ var iparr = ipval.split(".");
									//~ if (iparr[3] == "0"){
										//~ if (iparr[2] == "0"){
											//~ if (iparr[1] == "0"){
												//~ ipval += "/8";
											//~ }else{
												//~ ipval += "/16";
											//~ }
										//~ }else{
											//~ ipval += "/24";
										//~ }
									//~ }else{
										//~ ipval += "/32";
									//~ }
								//~ }
							//~ }
							//~ return ipval;
						//~ };
						//~ 
						//~ ruleNode.rule.ips = addIpMask(ruleNode.rule.ips);
						//~ ruleNode.rule.ipd = addIpMask(ruleNode.rule.ipd);						
						

						device.config.write(88, ruleNode.rule, pos,  context(this).callback(function(){
							rootView.hideModalOverlay();
							this.emit("updaterq");
						}));
					}
				}));
              if ( disableFlag( 88) )                        
                        ruleNode.getButton("button_save").children('div').addClass('disable');
	}
	
	this.onupdaterq = function(){
		rootView.showModalOverlay();
		device.config.read([ 88,  1,  187], context(this).callback(function(data){
			rootView.hideModalOverlay();
			if(is.RPC_SUCCESS(data.rq[0])){
				this.json = data.rq[0].resident.ipfilter;
				this.grid.rules = this.json;
				var i;
				//проверка формата
				//вычисляем старший id
 				var biggestId = 0;
				for (i in this.json) {
					if ((this.json[i].id) && (this.json[i].id > biggestId)) {
						biggestId = this.json[i].id
					}
				}
 				//Исправляем "неформатные" элементы
				needUpdate = false;
				for (i in this.json) {
					if (this.json[i].id == undefined) {
						needUpdate = true;
 						biggestId++;
						var rule = {
							id:				biggestId,
							proto:			this.json[i].proto,
							ips:			this.json[i].ips,
							ipd:			this.json[i].ipd,
							ports:			this.json[i].ports,
							portd:			this.json[i].portd,
							action:			this.json[i].action,
							state:			true
						}
						device.config.write(88, rule, parseInt(i), callback(this, function(data){}));
					}		
				}
 				if (needUpdate) this.emit("updaterq");
 			}
			else{
				this.json = [];
			}

			this.iftree = (is.RPC_SUCCESS(data.rq[1])) ? data.rq[1].resident : {};
			this.lanClients = (is.RPC_SUCCESS(data.rq[2])) ? data.rq[2].resident : [];
			
			
			this.deep.updateView();
		}));
	}

	this.bind("updaterq", this.onupdaterq);
}
extend(pageIPFilters, node);

function ruleIPFilters(iftree, lanClients, rules, ipfltProtoNames, ipfltActions, rule, pos){
	ruleIPFilters.superclass.constructor.call(this);

	if(is.unset(rule)){
		this.isadding = true;
		rule = {};
		pos = -1;
	}

	this.updateView = function(phase){
		ruleIPFilters.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){
			
		}
		else{
			//protocol
			var proto = this.child("general/proto");
			proto.cleanOptions();
			for(var i in ipfltProtoNames){
				proto.addOption(ipfltProtoNames[i], i);
			}
			//action
			var action = this.child("general/action");
			action.cleanOptions();
			for(var i in ipfltActions){
				action.addOption(ipfltActions[i], i);
			}
			var obj;
			//ipsrc
			var ipsrc = this.child("ip/ipsrc");
			//ipdst
			var ipdst = this.child("ip/ipdst");
			this.addIPRows(ipsrc);
			this.addIPRows(ipdst);
			//запретительно-скрывательная логика
			this.child("general/proto").fieldchange();
			if(ipsrc.pluginDst.isEmpty()){
				this.child("ip/range").val(false).fieldchange();
			}
			else{
				this.child("ip/range").val(true).fieldchange();
			}

			this.jQuery("ip/range").hide();
		}
	}

	this.addIPRows = function(control){
		var version = 4;
		control.cleanRows();
		for(var i=0; i<lanClients.length; i++){
			obj = lanClients[i];
			if(version == 4){
				if(is.IPv4(obj.ip)){
					control.addRow(obj.ip, obj.mac, obj.hostname);
				}
			}
			else{
				if(!is.IPv4(obj.ip)){
					control.addRow(obj.ip, obj.mac, obj.hostname);
				}
			}
		}
		return this;
	}

	this.updateModel = function(status){

		this.checkIPRange = function(rangeString) {
			if (rangeString) {
				//не пустая строка
				var arr = rangeString.split("-");
				if (arr[1]) {
					if (arr[0] == arr[1]) {
						//диапазон из одного IP
						return arr[0];
					} else {
						//диапазон из нескольких значений
						var rangeCorrect = true;
						var firstIP = arr[0].split(".");
						var lastIP = arr[1].split(".");
						for (var i in firstIP) {
							if (firstIP[i]>lastIP[i]) {
								rangeCorrect = false;
								break;
							}
						}
						return (rangeCorrect) ? arr[0]+"-"+arr[1] : arr[1]+"-"+arr[0];
					}
				} else {
					//не диапазон
					return arr[0];
				}
			} else {
				//пустая строка
				return "";
			}
		}

		try{
			if(!status.error){
				var general = this.child("general");
				var ip = this.child("ip");
				var ports = this.child("ports");
				
				//валидация портов
				portsrc = ports.child("portsrc");
				portdst = ports.child("portdst");
				
				var patt = /^\d+:\d+$/;
				
				if(!portsrc.pluginInput.isEmpty() && !portdst.pluginInput.isEmpty()){					
					var srcArr = portsrc.val().split(",");
					var dstArr = portdst.val().split(",");
					var srcArr2, dstArr2;
					if ( portsrc.val().indexOf(' ') != -1 || portdst.val().indexOf(' ') != -1 ) {
						throw new Error("ipfltWrongPortOrRange");
					}					
					if(srcArr.length != dstArr.length){
						//разное количество элементов перечисления
						throw new Error("ipfltWrongPortOrRange2");
					}
					for(var i=0;i<srcArr.length;i++){
						if(patt.test(srcArr[i])){
							//диапазон
							if(!patt.test(dstArr[i])){
								//в портах назначения не диапазон
								throw new Error("ipfltWrongPortOrRange2");
							}
							else{
								//в портах назначения диапазон
								srcArr2 = srcArr[i].split(":");
								dstArr2 = dstArr[i].split(":");
								for(var j=0;j<srcArr2.length;j++){
									if(!is.port(srcArr2[j]) || !is.port(dstArr2[j])){
										//не порт
										throw new Error("ipfltWrongPortOrRange3");
									}
								}
							}
						}
						else{
							//одиночный порт
							if(patt.test(dstArr[i])){
								//в портах назначения диапазон
								throw new Error("ipfltWrongPortOrRange2");
							}
							if(!is.port(srcArr[i]) || !is.port(dstArr[i])){
								throw new Error("ipfltWrongPortOrRange3");
							}
						}
					}															
					
				}
				else{
					
					if ( portsrc.val().indexOf(' ') != -1 || portdst.val().indexOf(' ') != -1 ) {
						throw new Error("ipfltWrongPortOrRange");
					}	
						
					if(!portsrc.pluginInput.isEmpty()){
						var srcArr = portsrc.val().split(",");
						
						var srcArr2;
						
						for(var i=0;i<srcArr.length;i++){
							
							if(patt.test(srcArr[i])){
								//диапазон							
	
								srcArr2 = srcArr[i].split(":");
	
								for(var j=0;j<srcArr2.length;j++){
									if(!is.port(srcArr2[j])){
										//не порт
										throw new Error("ipfltWrongPortOrRange3");
									}
								}							
								
							}else{
								//одиночный порт							
								if(!is.port(srcArr[i])){
									throw new Error("ipfltWrongPortOrRange3");
								}
							}
						}
					}
					
					if(!portdst.pluginInput.isEmpty()){
						var dstArr = portdst.val().split(",");
						
						var dstArr2;
						
						for(var i=0;i<dstArr.length;i++){
							
							if(patt.test(dstArr[i])){
								//диапазон							
	
								dstArr2 = dstArr[i].split(":");
	
								for(var j=0;j<dstArr2.length;j++){
									if(!is.port(dstArr2[j])){
										//не порт
										throw new Error("ipfltWrongPortOrRange3");
									}
								}							
								
							}else{
								//одиночный порт							
								if(!is.port(dstArr[i])){
									throw new Error("ipfltWrongPortOrRange3");
								}
							}
						}
					}
				}

				//довалидация IP
				if(this.child("ip/ipsrc").isRange()){
					if(is.set(this.child("ip/ipsrc").val().split("/")[1])){
						throw new Error("ipfltWrongStartIP");
					}
				}
				if(this.child("ip/ipdst").isRange()){
					if(is.set(this.child("ip/ipdst").val().split("/")[1])){
						throw new Error("ipfltWrongStartIP");
					}
				}

				var idnum = null;
				if (!this.isadding) {
					idnum = rule.id;
				} else {
					idnum = (rules.length) ? _.last(rules).id+1 : 1;
				}
				//заполнение правила
				this.rule = {
					id:				idnum,
					proto:			(new Number(general.child("proto").val())).valueOf(),
					ips:			this.checkIPRange(this.child("ip/ipsrc").val()),
					ipd:			this.checkIPRange(this.child("ip/ipdst").val()),
					ports:			ports.child("portsrc").val(),
					portd:			ports.child("portdst").val(),
					action:			(new Number(general.child("action").val())).valueOf()
				,	state:			general.child("state").val()
				}

				//проверка на уникальность правила
				for (i in rules) {
					if (	
							(this.rule.id != rules[i].id)
						&&	(this.rule.proto == rules[i].proto)
						&&	(this.rule.ips == rules[i].ips)
						&&	(this.rule.ipd == rules[i].ipd)
						&&	(this.rule.ports == rules[i].ports)
						&&	(this.rule.portd == rules[i].portd)
					) {
						throw new Error(lng("ipfltRuleExists")+rules[i].id+".");
						this.rule = {};
						break;
					}
				}
			}
		}
		catch(e){
			status.error = true;
			status.nodes.push(this);
			alert(lng(e.message));
		}

		this.status = status;
	}

	this.onfieldchange = function(status, value){
		switch(status.target.getAlias()){
			case "proto":
				switch(value){
					case "3":
					case "4":
						this.child("ports/portsrc").disable();
						this.child("ports/portdst").disable();
					break;
					default:
						this.child("ports/portsrc").enable();
						this.child("ports/portdst").enable();
					break;
				}
			break;
			case "range":
				//~ if(value){
					//~ this.child("ip/ipsrc").enableRange();
					//~ this.child("ip/ipdst").enableRange();
				//~ }
				//~ else{
					//~ this.child("ip/ipsrc").disableRange();
					//~ this.child("ip/ipdst").disableRange();
				//~ }
			break;
			case "ipvers":
			break;
		}
	}
	
	//~ this.onenrange = function(status, enable){
		//~ this.child("ip/range").val(enable);
		//~ var ipsrc = this.child("ip/ipsrc");
		//~ var ipdst = this.child("ip/ipdst");
		//~ if(ipsrc.isRange() != enable) ipsrc.changeRangeStatus(enable);
		//~ if(ipdst.isRange() != enable) ipdst.changeRangeStatus(enable);
	//~ }

	var comboHeader = [
		{index: "ip", name: "IP"},
		{index: "mac", name: "MAC"},
		{index: "host", name: "Host"}
	];
	this.add(new node(), "general")
		.add(new node(), "ip")
		.add(new node(), "ports");
	this.child("general")
		.add(new nodeCaption("ipfltGenSect"))
		.add(new nodeSelect("protocol", rule.proto), "proto")
		.add(new nodeSelect("ipfltAction", rule.action), "action");
	this.child("general").add(new nodeCheckBox("ipfltActivateNow", (!this.isadding && rule.state === false) ? false : true), "state");
	this.child("ip")
		.add(new nodeCaption("ipfltSectIP", "ipfltSectIPDesc2"))
		.add(new nodeCheckBox("ipfltIPRange2", false), "range")
		.add(new nodeComboIPRange("ipsrc", rule.ips, {header: comboHeader}), "ipsrc")
		.add(new nodeComboIPRange("ipdst", rule.ipd, {header: comboHeader/*, comment: "ipfltSectIPDesc2"*/}), "ipdst");
	this.child("ports")
		.add(new nodeCaption("ipfltSectPort", "ipfltSectPortDesc2"))
		.add(new nodeportold("portsrc", rule.ports, {isRange: true, isSeveral: true}), "portsrc")
		.add(new nodeportold("portdst", rule.portd, {isRange: true, isSeveral: true}), "portdst")
		
	this.bind("fieldchange", this.onfieldchange)
		//~ .bind("enrange", this.onenrange);
}
extend(ruleIPFilters, node);

function nodeComboIPRange(name, range, options){
	nodeComboIPRange.superclass.constructor.apply(this, arguments);
	
	this.options = options?options:{};
	
	this.updateView = function(phase){
		nodeComboIPRange.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){

			var options = this.options;
			
			this.pluginEdit = this.$box.lightUIEdit(name, options.comment, {mandatory: options.mandatory});

			var $input = this.pluginEdit.find(".input");

			$input.addClass("range")
				.html("<div class='src'></div><div class='minus unselectable' unselectable='on'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='dst'></div>");

			var onchange = function(event){
				$(event.target).find("input").removeClass("validate");
				this.fieldchange();
				event.stopPropagation();
				return true;
			}
			
			var onerror = function(event, errorCode){
				$(event.target).find("input").addClass("validate");
			}
			
			var onfocus = function(event){
				$(event.target).find("input").removeClass("validate");
			}

			var type = options.type || "ipv4";


			var flags = {header: options.header, type: type, index: options.index, blank: options.blank,
							flags: {maxLength: options.maxLength, mandatory: options.mandatory, re: options.re}};
			this.pluginSrc = $input.find(".src").lightUIComboGrid(flags);

			this.pluginSrc.find(".icon").css("display", "none");
			this.pluginSrc.bind("enter.input tab.input rowclick.grid", context(this).callback(onchange));
			this.pluginSrc.bind("error.input", onerror);
			this.pluginSrc.bind("onfocus.input", onfocus);

			if(type == "ipv6"){
				this.pluginDst = $input.find(".dst").lightUIIPv6({mandatory: options.mandatory, maxLength: 43});
			}
			else{
				this.pluginDst = $input.find(".dst").lightUIIPv4({mandatory: options.mandatory, maxLength: 18});
			}
			this.pluginDst.bind("enter.input tab.input", context(this).callback(onchange));
			this.pluginDst.bind("error.input", onerror);
			this.pluginDst.bind("onfocus.input", onfocus);

			this.val(range);

			if(is.set(range) && range.split("-")[1]){
				this.enableRange();
			}
			else{
				this.disableRange();
			}
			
			if(options.rangeLocked) this.lockRange();
			else this.unlockRange();
			
			this.pluginEdit.find(".minus").click(context(this).callback(function(){
				if(this.options.rangeLocked) return;
				if(this.pluginDst.find("input").attr("disabled")){
					this.enableRange();
					//~ this.emit("enrange", true);
				}
				else{
					this.disableRange();
					//~ this.emit("enrange", false);
				}
			}));

		}
		
		return this;
	}

	/* Диапазон src - dst.
	 */
	this.val = function(value){
		if(is.set(value)){
			
			this.applyAttrs(value);
			var arr = value.split("-");
			
			this.range = value;
			if(this.pluginSrc && this.pluginDst){
				this.pluginSrc.fieldval(arr[0]);
				this.pluginDst.fieldval(arr[1]);
			}
			return this;
		}
		else{

			if(this.pluginSrc && this.pluginDst){
				if(this.options.rangeLocked){
					return this.pluginSrc.fieldval();
				}
				else{
					var src = this.pluginSrc.fieldval();
					var dst = this.pluginDst.fieldval();
					if(!this.pluginDst.find("input").attr("disabled") && is.set(dst) && dst != ""){
						return src + "-" + dst;
					}
					else{
						return src;
					}
				}
			}
			else{
				return this.range;
			}
		}
	}

	
	this.addRow = function(){
		var options = this.options;
		options.optionArray.push(arguments);

		if(this.pluginSrc){
			this.pluginSrc.addOption.apply(this.pluginSrc, arguments);
		}

		return this;
	}
	
	this.cleanRows = function(){
		this.options.optionArray = [];
		this.pluginSrc.cleanOptions();
		return this;
	}
	
	this.updateModel = function(status){
		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")){
			return;
		}
		if(this.options.mandatory && this.pluginSrc.isEmpty()){
			this.pluginSrc.find("input").addClass("validate");
			alert(lng("srcEmpty"));
			status.error = true;
			status.nodes.push(this);
			return;
		}
		else if(this.pluginSrc.validate()){
			this.pluginSrc.find("input").addClass("validate");
			status.error = true;
			status.nodes.push(this);
		}
		else if(this.pluginDst.validate()){
			this.pluginDst.find("input").addClass("validate");
			status.error = true;
			status.nodes.push(this);
		}
		return this;
	}
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.val());
		return this;
	}
	
	this.setVersion = function(version){
		if(version == 6){
			options.type = "ipv6";
		}
		else{
			options.type = "ipv4";
		}
		range = this.val();
		this.updateView("forward");
		return this;
	}

	this.disableRange = function(){
		if(this.$box.isRendered()){
			this.$box.find(".minus").addClass("break");
			this.pluginDst.disable();
		}
		return this;
	}
	
	this.enableRange = function(){
		if(this.$box.isRendered()){
			this.$box.find(".minus").removeClass("break");
			this.pluginDst.enable();
		}
		return this;
	}

	this.lockRange = function(){
		this.options.rangeLocked = true;

		if(this.$box.isRendered()){
			this.$box.find(".minus").removeClass("break").addClass("lock");
			this.pluginDst.disable();
		}
	}

	this.unlockRange = function(){
		this.options.rangeLocked = false;

		if(this.$box.isRendered()){
			var $minus = this.$box.find(".minus");
			if($minus.hasClass("lock")){
				$minus.removeClass("lock").addClass("break");
			}
		}
	}
		
	this.changeRangeStatus = function(enable){
		if(enable){
			this.enableRange();
		}
		else{
			this.disableRange();
		}
		return this;
	}
	
	this.validate = function(){
		if(this.pluginSrc.validate()){
			this.pluginSrc.find("input").addClass("validate");
		}
		if(this.pluginDst.validate()){
			this.pluginDst.find("input").addClass("validate");
		}
		return this;
	}
	
	this.isRange = function(){
		return !this.$box.find(".minus").hasClass("break");
	}
		
}
extend(nodeComboIPRange, nodeInputBase);





















function pageIPTV(wizard){
	pageIPTV.superclass.constructor.call(this);
		
	this.add(new nodetext('VLAN ID', 1, {
		mandatory: true
	}), 'vid');
		
	this.add( new PortViewCtrl(false), "ctrl");
		
	this.bind( 'updaterq', function(){
		devu.iptv.pull( callback( this, function(){
			this.deep.updateView();			
		}), callback( this, function(){
			node.prototype.updateView.call( this, 'forward' );
			this.$box.errorBlock( lng( 'error' ), lng( 'rpcReadError' ), null, lng( 'refresh' ), callback( this, function(){ this.emit( 'updaterq' )}));
		}));
	});
		
	this.updateView = function( __phase ){
		pageIPTV.superclass.updateView.apply( this, arguments );		
		
		if( __phase == 'forward' ){
			
			this.get('vid').hide();
	
			this.get('ctrl').setPorts( devu.iptv.getPortMap() );
			var htmlToDraw	=	'<div id="uiSTBPortComment">' + lng( 'iptv_master_comment' ) + '</div>';	
			this.$box.append( htmlToDraw );
			
			this.cleanButtonBar();
			if(!wizard) {
			this.addButton( 'save' )
				.getButton( 'save' )
				.bind( 'click.button', callback( this, function(){

					this.deep.updateModel();
											
					function onApply(){	
						
						clearTimeout( tt );
						rootView.hideWaitScreen();
						//this.emit( 'updaterq' );
						alert(lng('wzIPTVSaveOk'));
						//~ document.location.href = "index.cgi";
						document.location.hash = "";
						location.reload(true);
						
					}
					
					if (!this.status.error) {
						// Можно сказать что костыль, timer1 - рубим запрос не дожидаясь ответа, timer2 - обновляем страницу
						rootView.showWaitScreen( lng( "pleaseWait" ),  10000*3 );
						var timer1 = setTimeout(context(this).callback(function(){ device.stop(); }), 10000/2);
						var tt = setTimeout( callback( this, onApply ),  10000*2 );

						devu.iptv.push( callback(this, onApply ), callback( this, function(){
							
							alert( lng( 'rpcWriteError' ));
							this.emit( 'updaterq' );
						}));
					}					
				}));
			}
		}
		
	}
	
	this.updateModel = function( __status ){
		
		this.status = __status;	
		devu.iptv.setPortMap( this.get('ctrl').getPorts() );
		
	}	
	
}
extend( pageIPTV, node );


function PortViewCtrl(vid_show){
	PortViewCtrl.superclass.constructor.call(this);
	
	var pmap = [];
	
	this.setPorts = function(__pmap) {
		pmap = __pmap;
	}
		
	this.getPorts = function() {
		return pmap;
	}
	
	this.updateView = function( __phase ){
		PortViewCtrl.superclass.updateView.apply( this, arguments );
		
		if( __phase == 'forward' ){
		
			var htmlToDraw	=	'<div id="uiSTBPort" style="text-align:center; margin-bottom: 35px; margin-top: 35px;"></div>'
							+	'<div id="uiSTBPortSign"></div>';
			
			this.$box.append( htmlToDraw );
		
			var port, i = 0;
			
			function setPortStatus( __$box, __checked ){
				if( __checked === true ) {					
					__$box.find( 'input' ).attr( 'checked', 'checked' );
					__$box.removeClass( 'off' ).removeClass( 'dis' ).addClass( 'on' );
				}
				else if ( __checked === false ) {					
					__$box.find( 'input' ).removeAttr( 'checked' );
					__$box.removeClass( 'on' ).removeClass( 'dis' ).addClass( 'off' );
				} 
				else if ( __checked === null ) {
					__$box.removeClass( 'on' ).removeClass( 'off' ).addClass( 'dis' );
				}
			}

			for( var port in  pmap ){
				
				i++;
		
				htmlToDraw	=	'<span class="customCheckbox ' + (port.toLowerCase().indexOf('wifi')+1?' wifi ':'') + ' off" style="position:relative" id=ui_iptv_' + port + ' data-port="'+port+'">'
							+	'<input type="checkbox" value=' + port + '></input>';
							
				if( port.match( /wifi/ )){

					htmlToDraw	+=	'<div style="position: absolute; bottom: -16px; width: 100%;">' + port + '</div>';
				}
				else{
					
					htmlToDraw	+=	'<div style="position: absolute; bottom: -16px; width: 100%;">LAN' + i + '</div>';
				}
					
				htmlToDraw	+=	'</span>';
									
				$('#uiSTBPort').append( htmlToDraw );
	
				if(!_.include(devu.iptv.getFreePorts(vid_show), port)) {
					pmap[ port ] = null;
				}	

				setPortStatus( $( '#ui_iptv_' + port ), pmap[ port ]);
			}
			
			$( '#uiSTBPort>.customCheckbox' ).click( function(){
				if ( !$(this).is('.dis') ) {
					change = true;
					var ps = !getPortStatus($( this ));
					setPortStatus( $( this ), ps);
					pmap[$(this).data('port')] = ps;
				}
			});					
			
			
		}
	}
	
	function getPortStatus( __$box ){ return __$box.is( '.on' )}
}
extend(PortViewCtrl, node );























function jsLanModel(iftree){
	jsLanModel.superclass.constructor.call(this);
	
	this.iftree = iftree;
}
extend(jsLanModel, jsModel);

function jsLanController(blocks){
	jsLanController.superclass.constructor.call(this);

	this.changeModel(new jsLanModel());

	this.ifaceTypes.client = {type: jsLanClientView};
	this.ifaceTypes.client.options = {nothing: true};
	
	this.ifaceTypes.server = {type: jsLanServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};

	this.nextIface = "server";
	this.addIface();

	this.ondataready = function(){

		
		var iftree = this.model.iftree;
		var c = 0;
		for(var i in iftree){
			if(!iftree[i].is_wan && iftree[i].services && getObjectLength(iftree[i].services)){
				this.ifname = i;
				this.srvname = getObjectFirstKey(iftree[i].services);
				iftree[i].ifname = this.ifname;
				getObjectFirstChild(iftree[i].services).ifname = this.srvname;
				c++;
			}
		}
		this.multyLAN = c > 1;
		if(!this.multyLAN){
			this.event("lanselect");
		}
		return false;
	}
	
	this.onlanselect = function(){
		//Проставить ifname, т.к. это надо для работы
		if(is.string(this.ifname) && is.string(this.srvname)){
			var mainTab = this.changeChild(this.getChild("mainTab").thisInx, new jsLanSettingsController(this.model.iftree, this.ifname, this.srvname, this.model.lanClients, this.model.dhcpClients), "mainTab");
			//Передаём признак работы в блоке
			mainTab.blocks = this.blocks;
		}
		return false;
	}
	
	this.addChild(new jsController(), "mainTab");
	
	this.blocks = blocks;
	
	this.addEventHandler("dataready", this.ondataready);
	this.addEventHandler("lanselect", this.onlanselect);
}
extend(jsLanController, jsFieldSetController);

function jsLanClientView(ctrl, viewInx, options){
	jsLanClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	if(!options.inputPadding) options.inputPadding = "200px";

	this.ondataready = function(){
		var iftree = this.ctrl.model.iftree;
		if(this.ctrl.multyLAN){
			var header = [{index: "name", name: "wanName"}, {index: "ip", name: "IP"}, {index: "mask", name: "wanMask"}];
			$grid = $(this.options.childBoxSel).lightUIGrid(header, 0, {clickable: true});
			var $row;
			var service = null;
			var srvname = null;
			for(var i in iftree){
				if(!iftree[i].is_wan && iftree[i].services && getObjectLength(iftree[i].services)){
					srvname = getObjectFirstKey(iftree[i].services);;
					service = getObjectFirstChild(iftree[i].services);
					if(is.object(service)){
						$row = $grid.addRow().row("last");
						$row.col("name").html(service.name);
						$row.col("ip").html(service.ip);
						$row.col("mask").html(service.mask);
						$row.data("ifname", i)
							.data("srvname", srvname);
					}
				}
			}
			if(is.string(srvname)){
				$grid.bind("rowclick.grid", context(this).callback(function(event, $row){
						this.ctrl.ifname = $row.data("ifname");
						this.ctrl.srvname = $row.data("srvname");
						this.ctrl.event("lanselect");
				}));
			}
			
		}
		return false;
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
		document.location.host = this.serverUrl;
	}

	this.onredirectrq = function(){
		var root = this.getParent(-1);
		root.changeServerUrl(getCookie("lan_ip"));
		root.showModalOverlay();
	}

	this.save = function(){
		var res = this.updateModel();
		if(res){
			this.showModalOverlay();
			var iftree = this.ctrl.model.iftree;
			for (var key in iftree) {
				clearJSON(this.ctrl.model.iftree[key]);
			}
			this.cleanButtons();
			this.ctrl.event("saverq");
		}
	}
	
	this.onlanselect = function(){
		if(this.ctrl.ifname && this.ctrl.srvname){
			this.constructor(this.ctrl, this.viewInx, this.options?this.options:{});
			this.options.buttons = [{name:"save", value:"button_save", handler:this.save}];
			this.drawView();

			//Проверка прав на рпц
			if(disableFlag( 1)){
				var buttons = this.options.buttons;
				for(var i=0; i<buttons.length; i++){
					if(buttons[i].name == "save"){
						this.disableButton(buttons[i].name);
						break;
					}
				}
			}
		
		}
		return false;
	}

	this.bind("dataready", this.ondataready);
	this.bind("redirectrq", this.onredirectrq);
	this.bind("lanselect", this.onlanselect);
}
extend(jsLanClientView, jsFieldSetClientView);

function jsLanServerView(ctrl, viewInx, options){
	jsLanServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.pickData = function(){
		var data = this.options.sender.responseData;
		this.ctrl.model.iftree = {};
		if(data){
			if(!data.baddata  && data.rq){
				if(data.rq[0] && data.rq[0].resident && data.rq[0].resident.iface_names){
					this.ctrl.model.iftree = data.rq[0].resident.iface_names;
					if(!this.ctrl.model.iftree) this.ctrl.model.iftree = {};
				}
				if(data.rq[1] && data.rq[1].resident) {
					this.ctrl.model.lanClients = data.rq[1].resident;
				}
				if(data.rq[2] && data.rq[2].resident) {
					this.ctrl.model.dhcpClients = data.rq[2].resident;
				}
			}
		}

		if(this.mode == "update"){
			this.ctrl.event("dataready");
		}
		else{
			this.ctrl.event("updaterq");
		}
	}

	this.prepareData = function(){
		var obj;
		var delim = "|";
		var ctrl = this.ctrl;

		switch(this.mode){
			case "save":
				obj = {
					v2: "y",
					rq: "y",
					res_config_id: 1,
					res_config_action: 3,
					res_json: "y",
					res_data_type: "json",
					res_struct_size: 36
				};
				var jsonOutObj = {};
				jsonOutObj[ctrl.ifname] = ctrl.model.iftree[ctrl.ifname];
				var ip = jsonOutObj[ctrl.ifname].services[ctrl.srvname].ip;
				setCookie("lan_ip", ip);
				obj.res_buf = $.toJSON(jsonOutObj);
				obj.res_buf = obj.res_buf.replace(/%/g,"%25");
				obj.res_buf = obj.res_buf.replace(/#/g,"%23");
				obj.res_pos = 0;
				this.addToRequest(obj);
			break;
			case "update":
				obj = {
					v2: "y",
					rq: 1,
					res_json0: "y",
					res_config_action0: 1,
					res_config_id0: 1,
					res_struct_size0: 36
				};
				obj["res_json"+obj.rq] = "y";
				obj["res_config_action"+obj.rq] =  1;
				obj["res_config_id"+obj.rq] =  187;
				obj["res_struct_size"+obj.rq] = 0;
				obj.rq++;
				obj["res_json"+obj.rq] = "y";
				obj["res_config_action"+obj.rq] =  1;
				obj["res_config_id"+obj.rq] =  34;
				obj["res_struct_size"+obj.rq] = 0;
				obj.rq++;
				this.addToRequest(obj);
			break;
		}
	}
	
	this.onupdaterq = function(){
		window.hasChanges = null;
		this.mode = "update";
		this.updateView();
	}
	
	this.onsaverq = function(){
		this.mode = "save";
		this.updateView();
	}
	this.mode = "update";			//"save"/"delete"/"update"/"add"
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
}
extend(jsLanServerView, jsSSideView);


function jsLanSettingsController(iftree, ifname, srvname, LANClients, DHCPClients){
	jsLanSettingsController.superclass.constructor.call(this);
	
	this.iftree = iftree;
	this.ifnode = iftree[ifname];
	this.service = this.ifnode.services[srvname];
	this.dhcpd = this.service.dhcpd;

	setCookie("lan_ip", this.service.ip);	
	
	this.ifaceTypes.client = {type: jsLanSettingsView, options: {}};

	this.addChild(new jsInputController(this.service.name), "name");
	this.addChild(new jsStatIPSettingsController(this.service), "statip");
	this.addChild(new jsDhcpServerController(this.service), "dhcpd");
    this.addChild(new jsDhcpServerMacController(this.dhcpd, LANClients, DHCPClients), "macs");
}
extend(jsLanSettingsController, jsFieldSetController);

function jsLanSettingsView(ctrl, viewInx, options){

	this.updateModel = function(){
		
		setCookie("lan_ip_older", this.ctrl.service.ip);
		
		var IP = this.getChild("statip");
		var DHCP = this.getChild("dhcpd");
		var divMain = DHCP.getChild("divMain");
		var begin = divMain.getChild("begin");
		var end = divMain.getChild("end");
		var oldStartIp = this.ctrl.service.dhcpd.start_ip;
		var oldEndIp = this.ctrl.service.dhcpd.end_ip;
		if (begin.statusCode == "dhcpBeginOutOfRange") begin.statusCode = null;
		if (end.statusCode == "dhcpEndOutOfRange") end.statusCode = null;
		var res = jsLanSettingsView.superclass.updateModel.call(this);
		if(res){
			var strIp = IP.getChild("ip").ctrl.model.toString();
			var strMask = IP.getChild("mask").ctrl.model.toString();
			if((new IPv4(strIp, strMask)).reserved()){
				alert(lng("lanIpReserved"));
				return false;
			}
			
			//корретировка пула
			
			DHCP.getChild("mode").updateModel();
			var dhcpdmode = DHCP.getChild("mode").ctrl.model.value;
			if(dhcpdmode == "en" ){
				if (IP.ctrl.isIpOrMaskChanged && begin.ctrl.model.toString() == oldStartIp && end.ctrl.model.toString() == oldEndIp){
					if(DHCP.correctDHCP(IP.getChild("ip").ctrl.model, IP.getChild("mask").ctrl.model)){
						if(confirm(lng("dhcpCorrectReq") + " " + lng("dhcpNewPool") + " " + begin.ctrl.model.toString() + " ... " + end.ctrl.model.toString())){
							begin.updateView();
							end.updateView();
							DHCP.updateModel();
						}
						
						IP.ctrl.isIpOrMaskChanged = false;
					}
				}
				var bitmask = calcBitsByMask(IP.getChild("mask").ctrl.model.toString());
				var tmpBeginModel = begin.ctrl.model;
				var tmpEndModel = end.ctrl.model;
				var tmpIPModel = IP.getChild("ip").ctrl.model;
				tmpBeginModel.bitmask = bitmask;
				tmpEndModel.bitmask = bitmask;
				tmpIPModel.bitmask = bitmask;
				tmpBeginModel.applyMask();
				tmpEndModel.applyMask();
				tmpIPModel.applyMask();
				
				if (tmpBeginModel.toString() != tmpIPModel.toString()){
					begin.statusCode = "dhcpBeginOutOfRange";
					begin.setError();
					res&=false;
				}
				if (tmpEndModel.toString() != tmpIPModel.toString()){
					end.statusCode = "dhcpEndOutOfRange";
					end.setError();
					res&=false;
				}
			}
		}
		return res;
	}
	
	ctrl.service.is_wan = ctrl.ifnode.is_wan;
	var c = 0;
	for(var i in ctrl.iftree){
		if(!ctrl.iftree[i].is_wan) c++;
	}
	var multyLAN = c > 1;
	
	obj = ctrl.getChild("name");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanName",
		disabled: true,
		hide: !multyLAN
	};

	jsLanSettingsView.superclass.constructor.call(this, ctrl, viewInx, options);
}
extend(jsLanSettingsView, jsFieldSetClientView);





















var CONFIG_ID_LANG_LIST = 73;

function jsLangController(nodeInfo, frame){
	jsLangController.superclass.constructor.call(this, nodeInfo, {});

	var cookieLng = getCookie('cookie_lang');
	this.model.langs = window.langs;
	if (cookieLng != '') {
		this.model.lng = cookieLng;
	}
	else {
		this.model.lng = window.curlang;
		setCookie("cookie_lang", this.model.lng);
	}

	this.ifaceTypes.switchLang = {type: jsSwitchLangView, options: {action: "will_change_run_time"}};
	this.ifaceTypes.listLang = {type: jsListLangView, options: {action: "index.cgi?v2=y&res_config_id=" + CONFIG_ID_LANG_LIST + "&res_struct_size=1"}};
	
	this.onmenuchange = function(menuItem){
		if (this.model.lng != menuItem.ctrl.contentOptions.lng) {
			this.model.lng = menuItem.ctrl.contentOptions.lng;
			switchDirection(this.model.lng);
			this.event("changelang", this.model.lng);
		}
		return false;
	}
	
	this.onchangelangs = function(langs){
		this.children = new Array();
		for(var i in this.model.langs){
			this.addChild(new jsFastmenuController({name: i, image: 'image/flags/lang_' + i + '.png'}, {frame: this, contentOptions:{lng:i}}));
		}
		return false;
	}

	this.frame = frame;
	this.addEventHandler("menuchange", this.onmenuchange);
	this.addEventHandler("changelangs", this.onchangelangs);
}
extend(jsLangController, jsFastmenuController);

function jsSwitchLangView(ctrl, viewInx, options){
	jsSwitchLangView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.pickData = function(){
		var data = this.options.sender.responseData;
		if (data) {
			if (this.mode == 'update') {
				if ( !data.baddata ) {
					lang = data;
				}				
				this.ctrl.frame.event("changelang", this.ctrl.model.lng);
				this.onsaverq();
			}
		}
	}	
	this.prepareData = function() {
		switch (this.mode) {
			case "save":
				var obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_data_type: "json",
					res_config_action:  3,
					res_config_id: 67,
					res_struct_size: 0
				}
				jsonOutObj = {
					lang: 	this.ctrl.model.lng
				};
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
		}
	}
	
	this.onchangelang = function(lng) {
		if (lng) {
			this.action = "scripts/" + lng + ".lng.js";
		}
		else{
			this.action = "scripts/" + this.ctrl.model.lng + ".lng.js";
		}
		this.mode = 'update';
		this.updateView();
		return false;
	}
	
	this.onsaverq = function(){
		this.action = "../../index.cgi";
		this.mode = "save";
		this.updateView();
	}
	
	this.mode = "update";
	this.bind("changelang", this.onchangelang);
	this.bind("savelang",this.onsaverq);
}
extend(jsSwitchLangView, jsSSideView);

function jsListLangView(ctrl, viewInx, options){
	jsListLangView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.pickData = function(){
		var data = this.options.sender.responseData;
		if (data){
			var langs = new Array();
			for(i = 0; i < data.length; i++){
				langs[i] = data[i].val0;
			}
			this.model.langs = langs;
			this.ctrl.event("changelangs", langs);
		}
	}	

}
extend(jsListLangView, jsSSideView);
























 
function jsIfacesInputController(value) {
	jsIfacesInputController.superclass.constructor.call(this);

	this.ifaceTypes.select = {type: jsIfacesInputSlotView, options: {}};
	this.ifaceTypes.radio = {type: jsIfacesInputSlotView, options: {}};
	this.ifaceTypes.server = {type: jsIfacesInputServerView, options: {plainIface: true}};


	this.addChild(new jsInputFieldController(value), "field");
	this.changeModel(this.getChild("field").model);

	/**Обработчик события IfacesReady.
	 * Данное событие вызывается в серверной части после получения данных от демона.
	 * @param	{Object}	obj		Объект: {ifaces:<object>, onlyWans:<bool>, drawAutoIface:<bool>, serviceTypes:<object>}.
	 */
	this.IfacesReady = function(obj) {
		var valset = CreateIfacesValset(obj.ifaces, obj.onlyWans, obj.drawAutoIface, obj.serviceTypes);
		$.extend(this.ifaceTypes.select.options.valset, valset);
		$.extend(this.ifaceTypes.radio.options.valset, valset);
		this.event("updateValset", valset);
		this.parent.event("IfacesReady", obj.ifaces);
		return false;
	}

	this.addEventHandler("IfacesReady", this.IfacesReady);

}
extend(jsIfacesInputController, jsEditController);

function jsIfacesInputSlotView(ctrl, viewInx, options) {
	ctrl.getChild("field").nextIface = ctrl.lastIface;
	jsIfacesInputSlotView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Обработчик события updateValset.
	 * Данное событие вызывается в контроллере после обработки интерфейсов для их отрисовки.
	 * @param	{Object}	obj		Объект содержащий "обработанные" интерфейсы.
	 */
	this.updateValset = function(obj){
		this.setOption("valset", obj);
		this.drawView();
		return false;
	}

	this.bind("updateValset", this.updateValset);
}
extend(jsIfacesInputSlotView, jsEditClientView);

 
function jsIfacesInputServerView(ctrl, viewInx, options) {
	jsIfacesInputServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 * После получения данных вызывает событие IfacesReady в контроллере для дальнейшей обработки.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		if(data && !data.baddata && data.resident && data.resident.iface_names) {
			this.ctrl.event("IfacesReady", {ifaces:data.resident.iface_names, onlyWans:this.options.onlyWans, drawAutoIface:this.options.drawAutoIface, serviceTypes:this.options.serviceTypes});
		} else
			this.ctrl.event("IfacesReady", {ifaces:null, onlyWans:this.options.onlyWans, drawAutoIface:this.options.drawAutoIface, serviceTypes:this.options.serviceTypes});
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;

		obj = {
			v2: "y",
			rq: "y",
			res_json: "y",
			res_config_action:  1,
			res_struct_size: 0
		};
		obj.res_config_id =  120;

		this.addToRequest(obj);
	}

	 /**Обработчик события updaterq (обновление).
	  */
	this.updaterq = function() {
		this.updateView();
		return false;
	}

	this.bind("updaterq", this.updaterq);
}
extend(jsIfacesInputServerView, jsSSideView);



function jsIfacesListModel() {
	jsIfacesListModel.superclass.constructor.call(this);

	/**Объект содержащий полный список полученных интерфейсов "как есть".
	 * @type	Object
	 */
	this.InterfacesListAsIs = null;

	/**Объект содержащий обработанный список полученных интерфейсов.
	 * @type	Object
	 */
	this.InterfacesValset = null;
}
extend(jsIfacesListModel, jsModel);

 
function jsIfacesListServerView(ctrl, viewInx, options) {
	jsIfacesListServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 * После получения данных обрабатывает их и вызывает событие IfacesListReady в контроллере.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		if(data && !data.baddata && data.resident && data.resident.iface_names)
			this.ctrl.model.InterfacesListAsIs = data.resident.iface_names;
		else
			this.ctrl.model.InterfacesListAsIs = null;

		this.ctrl.model.InterfacesValset = CreateIfacesValset(this.ctrl.model.InterfacesListAsIs, this.options.onlyWans, this.options.drawAutoIface, this.options.serviceTypes);

		this.ctrl.event("IfacesListReady");
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;

		obj = {
			v2: "y",
			rq: "y",
			res_json: "y",
			res_config_action:  1,
			res_struct_size: 0
		};
		obj.res_config_id =  120;

		this.addToRequest(obj);
	}

	/**Обработчик события updaterq (обновление).
	 */
	this.updaterq = function() {
		this.updateView();
		return false;
	}

	this.bind("updaterq", this.updaterq);
}
extend(jsIfacesListServerView, jsSSideView);



function CreateIfacesValset (IfacesList, onlyWans, drawAutoIface, serviceTypes, getType) {
	var valset = {};
	var serviceFound = false;

	if (drawAutoIface)
		valset["&lt;"+lng("type_start_auto")+"&gt;"] = "auto";

	for(var i in IfacesList) {
		if (onlyWans && !IfacesList[i].is_wan)
			continue;
		else
			if (!getType) {
				valset[IfacesList[i].name] = IfacesList[i].iface;
			} else {
				valset[IfacesList[i].name] = {
					"iface": IfacesList[i].iface,
					"type": IfacesList[i].type
				};
			}
	}
	return valset;
}




















 
function jsListBoxModel(list){
	jsListBoxModel.superclass.constructor.call(this);
	
	/**Значение модели*/
	this.list = list;
		
}
extend(jsListBoxModel, jsModel);

 
function jsListBoxController(list){
	jsListBoxController.superclass.constructor.call(this);
	
	this.ifaceTypes.changebox = {type: jsInputSlotView};

	this.addChild(new jsListBoxFieldController(list), "field");
	this.changeModel(this.getChild("field").model);

}
extend(jsListBoxController, jsController);

function jsListBoxFieldController(list){
	jsListBoxFieldController.superclass.constructor.call(this);

	this.ifaceTypes.changebox = {type: jsChangeBoxClientView};
	this.changeModel(new jsListBoxModel(list));
}
extend(jsListBoxFieldController, jsController);

 
function jsChangeBoxClientView(ctrl, viewInx, options){
	jsChangeBoxClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Нарисовать 2 бокса со стрелками*/
	this.drawView = function(){
		jsChangeBoxClientView.superclass.drawView.call(this);

		var options = this.options;
		if(options.valset){
			for(var i in options.valset){
				this.ivalset[options.valset[i]] = i;
			}
		}

		this.srcBoxSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(0)>select";
		this.dstBoxSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(2)>select";
		this.rightArrowSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(1)>a";
		this.leftArrowSel = options.viewBoxSel + ">table>tbody>tr:eq(1)>td:eq(0)>a";

		var htmlToDraw = "";
		htmlToDraw += "<table border='0'><tr><td rowspan='2'>";
		htmlToDraw = this.drawBox(htmlToDraw);
		htmlToDraw += "</td><td class='changeBoxRight' unselectable='on'><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></td><td rowspan='2'>";
		htmlToDraw = this.drawBox(htmlToDraw);
		htmlToDraw += "</td></tr><tr><td class='changeBoxLeft' unselectable='on'><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></td></tr></table>";

		$(options.viewBoxSel).html(htmlToDraw);
		this.updateView();

		if(options.disabled) this.disable();

		$(this.srcBoxSel).addClass("changeBoxSrc").get(0).selectedIndex = 0;
		$(this.dstBoxSel).addClass("changeBoxDst").get(0).selectedIndex = 0;
		//привязать обработчики событий
		$(this.rightArrowSel).bind("click", context(this).callback(this.onrightclickjq));
		$(this.leftArrowSel).bind("click", context(this).callback(this.onleftclickjq));
	}

	/**Нарисовать бокс-приёмник или бокс-источник*/
	this.drawBox = function(htmlToDraw){
		htmlToDraw += "<select size=\"" + options.size + "\"></select>";
		return htmlToDraw;
	}
	
	/**Обновить модель*/
	this.updateModel = function(){
		this.ctrl.model.list = this.prepareModel();
	}
	
	/**Обновить представление*/
	this.updateView = function(){
		var htmlToDraw = "";
		var valsetTotal = this.options.valset;
		var valset = {};
		for(var i in valsetTotal){
			valset[i] = valsetTotal[i];
		}
		var list = this.ctrl.model.list;
		for(var i in list){
			delete valset[this.ivalset[list[i]]];
			htmlToDraw += "<option value='" + list[i] + "'>" + this.ivalset[list[i]] + "</option>";
		}
		$(this.dstBoxSel).html(htmlToDraw);
		htmlToDraw = "";
		for(var i in valset){
			htmlToDraw += "<option value='" + valset[i] + "'>" + i + "</option>";
		}
		$(this.srcBoxSel).html(htmlToDraw);
	}
	
	/**Обработчик события jquery 'click' на стрелке вправо, т.е. добавление*/
	this.onrightclickjq = function(event){
		var selectedIndex = $(this.srcBoxSel).get(0).selectedIndex;
		if(selectedIndex >= 0){
			var selectedSel = this.srcBoxSel + ">option:eq(" + selectedIndex + ")";
			$(this.dstBoxSel).append("<option value=" + $(selectedSel).get(0).value + ">" + $(selectedSel).html() + "</option>");
			this.ctrl.event("additem", {view:this, value:$(selectedSel).get(0).value});
			$(selectedSel).remove();
			var srcBoxLength = $(this.srcBoxSel + ">option").length;
			if(selectedIndex < srcBoxLength){
				$(this.srcBoxSel).get(0).selectedIndex = selectedIndex;
			}
			else{
				if(srcBoxLength > 0){
					$(this.srcBoxSel).get(0).selectedIndex = srcBoxLength - 1;
				}
			}
			$(this.dstBoxSel).get(0).selectedIndex = $(this.dstBoxSel + ">option").length - 1;
		}
		event.stopPropagation();
	}
	
	/**Подготовить список для модели
	 * @return	Array	Список выбранных элементов.
	 */
	this.prepareModel = function(){
		var list = [];
		for(var i=0;i<$(this.dstBoxSel + ">option").length;i++){
			list.push($(this.dstBoxSel + ">option").get(i).value);
		}
		return list;
	}
	
	/**Обработчик события jquery 'click' на стрелке влево, т.е. удаление*/
	this.onleftclickjq = function(event){
		var selectedIndex = $(this.dstBoxSel).get(0).selectedIndex;
		if(selectedIndex >= 0){
			var selectedSel = this.dstBoxSel + ">option:eq(" + selectedIndex + ")";
			$(this.srcBoxSel).append("<option value=" + $(selectedSel).get(0).value + ">" + $(selectedSel).html() + "</option>");
			this.ctrl.event("removeitem", {view:this, value:$(selectedSel).get(0).value});
			$(selectedSel).remove();
			var dstBoxLength = $(this.dstBoxSel + ">option").length;
			if(selectedIndex < dstBoxLength){
				$(this.dstBoxSel).get(0).selectedIndex = selectedIndex;
			}
			else{
				if(dstBoxLength > 0){
					$(this.dstBoxSel).get(0).selectedIndex = dstBoxLength - 1;
				}
			}
			$(this.srcBoxSel).get(0).selectedIndex = $(this.srcBoxSel + ">option").length - 1;
		}
		event.stopPropagation();
	}
	
	/**Закрывает багу в jhmvc позволяя событию всплывать*/
	this.onremoveitem = function(obj){
		return true;
	}
	
	/**Закрывает багу в jhmvc позволяя событию всплывать*/
	this.onadditem = function(obj){
		return true;
	}

	/**Селектор бокса-приёмника.
	 * Устанавливается методом drawView.
	 * @type	String
	 */
	this.dstBoxSel = null;

	/**Селектор правой стрелки.
	 * Устанавливается методом drawView.
	 * @type	String
	 */
	this.rightArrowSel = null;

	/**Селектор левой стрелки.
	 * Устанавливается методом drawView.
	 * @type	String
	 */
	this.leftArrowSel = null;
	
	/**Набор значений, в котором ключ и значение поменяны местами.
	 * Ибо меня переклинило и в jsSelectClientView сделал наоборот и менять теперь поздно.
	 * Надо всё делать аналогично.
	 * Создётся в drawView.
	 * @type Object
	 */
	 this.ivalset = {};

	this.bind("additem", this.onadditem);
	this.bind("removeitem", this.onremoveitem);

}
extend(jsChangeBoxClientView, jsEditClientView);





















function jsLocalResController(service, routes, ipver){
	jsLocalResController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsLocalResView, options: {slider: true, nocollapse: true, title: "localres", descText: "localresDesc"}};

	this.service = service;
	this.routes = routes;
	this.newRoutes = [];
	
	var arr = [];
	var alias;
	this.n = 10;
	for(var i=0; i<this.n; i++){
		alias = "ip" + i;
		arr.push({
			alias: alias,
			name: lng("ipaddr") + " " + (i+1),
			type: "ip",
			version: ipver,
			options: {optional: true}
		});
		this.newRoutes.push({ip: "", netmask: service.mask, gw: "", iface: service.iface, pos: -1});
	}

	var r;
	var j = 0;
	for(var i=0; i<routes.length; i++){
		r = routes[i];
		if(r.iface == service.iface && r.netmask == service.mask){
			arr[j].value = r.ip;
			this.newRoutes[j].ip = r.ip;
			this.newRoutes[j].pos = i;
			j++
		}
		if(j == this.n) break;				
	}
		
	this.describe(arr);
}
extend(jsLocalResController, jsFieldSetController);

function jsLocalResView(ctrl, viewInx, options) {
	jsLocalResView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.updateModel = function(){
		var res = jsLocalResView.superclass.updateModel.call(this);
		if(res){
			//прописать роуты для добавления
			var child;
			var value;
			for(var i=0; i<this.ctrl.n; i++){
				child = this.getChild("ip" + i);
				this.ctrl.newRoutes[i].ip = child.ctrl.model.toString();
			}
		}
		return res;
	}
}
extend(jsLocalResView, jsFieldSetClientView);






















function pageSyslog(){
	pageSyslog.superclass.constructor.call(this);
	
	this.loglist = null;

	this.add(new node(), "log");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.exportlog = function(){
		device.system.log();
	}
	
	this.updateView = function(phase){
		pageSyslog.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.cleanButtonBar()
				.addButton("refresh")
				.getButton("refresh")
				.bind("click.button", callback(this, function(){
					this.update();
				}));
			if (this.loglist != null) {
				this.addButton("button_export")
					.getButton("button_export")
					.bind("click.button", callback(this, function(){
						this.exportlog();
					}));
			} else {
				this.loglist = 'Log not found!';
			}
			var log = this.child("log");
			log.$box.html($("\
				<div class='console syslog'>\
					<pre>" + this.loglist + "</pre>\
				</div>\
			"));
		}
	}

	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read( 130, callback(this, function(data){
			this.loglist = (is.RPC_SUCCESS(data))?data.resident.list:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
	
}
extend(pageSyslog, node);
























function gridMACFilters(rules, protoName, direction, ifaces) {
	gridMACFilters.superclass.constructor.call(this);

	this.rules = rules;
	this.ifaces = ifaces;
	this.updateView = function(phase) {
		gridMACFilters.superclass.updateView.apply(this, arguments);
		
		if (phase == "forward") {
			var header = [];
			header.push([
				{ index: "id", name: "ruleID"},
				{ index: "mac", name: "hwaddr" },
				{ index: "enable", name: "action" },
				{ index: "state", name: "status"}
			]);

			this.$grid = this.$box.lightUIGrid(header, 0, {clickable: true, selectable: true});
			
			var j = 0;
			for (var i in this.rules) {
				rule = this.rules[i];
				if (rule.mac){
					$row = this.$grid.addRow().row("last");

					$row.col("mac").html(rule.mac).data("mac", rule.mac);
					$row.col("id").html(rule.id).data("id", rule.id);
					$row.col("enable").html( (rule.enable == "ACCEPT") ? lng("macfAccept") : lng("macfDrop") ).data("enable", rule.enable);
					if (is.unset(rule.state)) {rule.state = 1};
					$row.col("state").html(rule.state ? lng("on") : lng("off")).data("state", rule.state);
					$row.data("pos", j);
				}
				j++;
			}

			this.$grid.bind("selection.grid", callback(this, function(){
				this.parent.updateRuleButtons();
			}));

			this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row){
				var rule = {
					id:			$row.col("id").data("id"),
					mac:		$row.col("mac").data("mac"),
					enable:		$row.col("enable").data("enable"),
					state:		$row.col("state").data("state")
				}
				var pos = $row.data("pos");
				this.parent.edit(rule, pos);
			}));
		}
	}

	this.bind("updaterq", function(){
		this.deep.updateView();
	});
}
extend(gridMACFilters, node);

function pageMACFilter() {
	pageMACFilter.superclass.constructor.call(this);

	this.glRule = {};

	this.add(new nodeCaption("otherMacCaption"))
		.add(new nodeSelect("", 0, {
			optionArray: [
				{name: "macfAccept", value: 0},
				{name: "macfDrop", value: 1}
			]
		}), "g_drop")

	this.grid = new gridMACFilters(this.json);
	this.updateView = function(phase) {
		pageMACFilter.superclass.updateView.apply(this, arguments);

		if (phase == "forward") {
			this.add(this.grid);
 			var json = this.json;
			
			this.child("g_drop").unbind("fieldchange").bind("fieldchange", context(this).callback(function(obj, value){
				this.glRule.rule.state = value == 1;
				rootView.showModalOverlay();
				device.config.write(74, this.glRule.rule, this.glRule.pos, context(this).callback(function() {
					rootView.hideModalOverlay();
				}));
			}));

			this.updateRuleButtons = function(){
				if (this.grid.$grid.selection().not(":hidden").length) {
					this.getButton("button_del").enable();
				} else{
					this.getButton("button_del").disable();			
				}
			}

			this.cleanButtonBar()
				.addButton("add")
				.getButton("add")
				.bind("click.button", context(this).callback(function(){
					this.edit();
				}));
			this.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(json){
					this.clearFilter(json, this.grid.$grid);
				}, json));
			if ( disableFlag(74) )  {                     
				this.getButton("add").children('div').addClass('disable');
				this.getButton("button_del").children('div').addClass('disable');
			}
		}
	}



	this.clearFilter = function(ruleall, grid){
		var rmlist = new Array();
		for (var i = grid.nrow(); i >= 0; i--) {
			if (grid.row(i).hasClass('selected')) {
				var pos = (i < this.glRule.pos) ? i : (parseFloat(i) + 1);
				rmlist.push([74, ruleall[i], pos]);
			}
		}
		if (rmlist.length) {
			rootView.showModalOverlay();
			device.config.remove(rmlist, callback(this, function(data){
				this.emit("updaterq");
			}));
		}
	}

	this.edit = function(rule, pos) {
		if (is.set(pos)){
			var pos = pos < this.glRule.pos ? pos : parseFloat(pos) + 1;
		}
		this.$box.unbind();
		var ruleNode = new ruleMACFilters(this.lanClients, this.json, this.macfltProtoNames, this.macfltDirections, this.macfltIfaces, rule);
		ruleNode.buttonBar(this.buttonBar())
				.deep.updateView(this.$outerBox)
				.cleanButtonBar()
				.addButton("button_prev")
				.getButton("button_prev")
				.bind("click.button", context(this).callback(function() {
					if (!checkChanges() || confirm(lng("leavePageMes"))) {
						this.emit("updaterq");
					}
				}));
		if (is.object(rule)) {
			ruleNode.addButton("button_del")
					.getButton("button_del")
					.bind("click.button", context(this).callback(function() {
						rootView.showModalOverlay();
						device.config.remove(74, rule, pos,  context(this).callback(function() {
							rootView.hideModalOverlay();
							this.emit("updaterq");
						}));
					}));
			if ( disableFlag(74) ) {
				ruleNode.getButton("button_del").children('div').addClass('disable');
			}
		}
		ruleNode.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", context(this).callback(function() {
					ruleNode.deep.updateModel();
					if (!ruleNode.status.error) {
						rootView.showModalOverlay();
						device.config.write(74, ruleNode.rule, pos, context(this).callback(function() {
							rootView.hideModalOverlay();
							this.emit("updaterq");
						}));
					}
				}));
				if ( disableFlag(74) ) {
					ruleNode.getButton("button_save").children('div').addClass('disable');
				}
	}

	this.onupdaterq = function(){
		rootView.showModalOverlay();
		device.config.read([
			74
			, 187
		], context(this).callback(function(data){
			rootView.hideModalOverlay();
			if (is.RPC_SUCCESS(data.rq[0])){
				this.json = data.rq[0].resident.macfilter;
				//Проверяем необходимые параметры
				var needUpdate = false;
				var i;
				//Проверка формата
				//Вычисляем старший id
 				var biggestId = 0;
				for (i in this.json) {
					if ((this.json[i].id) && (this.json[i].id > biggestId)) {
						biggestId = this.json[i].id
					}
				}

				for (i in this.json) {
					if (this.json[i].mac == null) {
						//Главное правило
						this.glRule = {
							"pos": parseFloat(i),
							"rule": this.json[i]
						};
						this.child("g_drop").val(this.glRule.rule.state ? 1 : 0);
					} else if (this.json[i].id == undefined) {
						//Правила без id
						needUpdate = true;
 						biggestId++;
						var rule = {
							id:			biggestId,
							mac:		this.json[i].mac,
							enable:		this.json[i].enable,
							state:		true
						}
						device.config.write(74, rule, parseInt(i));
					}		
				};
				if (is.unset(this.glRule.rule)) {
					needUpdate = true;
					this.glRule = {
						"pos": -1,
						"rule":
							{
								"id": 0,
								"state": false,
								"mac": null,
								"enable": "DROP"
							}
					};
					
					device.config.write(74, this.glRule.rule, this.glRule.pos);
				}
 				
 				if (needUpdate) this.emit("updaterq");
			} else {
				this.json = [];
			}
			this.grid.rules = this.json;
			this.lanClients = (is.RPC_SUCCESS(data.rq[1])) ? data.rq[1].resident : [];
			this.deep.updateView();
		}));
	}

	this.bind("updaterq", this.onupdaterq);
}
extend(pageMACFilter, node);

function ruleMACFilters(lanClients, rules, macfltProtoNames, macfltDirections, macfltIfaces, rule) {
	ruleMACFilters.superclass.constructor.call(this);

	if (is.unset(rule)) {
		this.isadding = true;
		rule = {};
	}

	this.updateView = function(phase) {
		ruleMACFilters.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			//mac
			var mac = this.child("mac");
			mac.cleanRows();
			for (var i in lanClients) {
				var recentlySelected = false;
				for (var j in rules) {
					if (lanClients[i].mac == rules[j].mac) {
						recentlySelected = true;
						break;
					}
				}
				if (!recentlySelected) mac.addRow(lanClients[i].ip, lanClients[i].mac, lanClients[i].hostname);
			}
			//enable
			var enable = this.child("enable");
			enable.cleanOptions();
			enable.addOption("macfAccept", "ACCEPT");
			enable.addOption("macfDrop", "DROP");
		}
	}

	this.updateModel = function(status) {

		try {
			if (!status.error) {

				//Валидация MAC-фильтра
				var mac = this.child("mac").val();
				var patt = /^[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}$/;
				if (!patt.test(mac)) {
					throw new Error("macfltInvalidAddress");
				} 
				//Заполнение правила
				var idnum = null;
				if (!this.isadding) {
					idnum = rule.id;
				} else {
					idnum = (rules.length) ? _.last(rules).id+1 : 1;
				}
				this.rule = {

					id:		idnum,
					mac:	this.child("mac").val(),
					enable:	this.child("enable").val(),
					state:	this.child("state").val()
				}

				//Проверка на уникальность правила
				for (var i in rules) {
					if (	(this.rule.id != rules[i].id)
						&&	(this.rule.mac == rules[i].mac)
					) {
						throw new Error(lng("ipfltRuleExists")+rules[i].id+".");
						this.rule = {};
						break;
					}
				}

			}
		} catch(e) {
			status.error = true;
			status.nodes.push(this);
			alert(lng(e.message));
		}

		this.status = status;

	}

	var comboHeader = [
		{index: "ip", name: "IP"},
		{index: "mac", name: "MAC"},
		{index: "host", name: "Host"}
	];

	this.add(new nodeComboText("hwaddr", rule.mac, {
														header:	comboHeader,
														index:	"mac",
														mandatory:	true
													}), "mac")
		.add(new nodeSelect("action", rule.enable), "enable")
		.add(new nodeCheckBox("ipfltActivateNow", (!this.isadding && rule.state === false) ? false : true), "state");

}
extend(ruleMACFilters, node);






















function jsQCMIPTVController(){
	jsQCMIPTVController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsQCMIPTVClientView, options:{}};
	this.addChild(new jsIptvMasterController(false, true), 'iptv');
	this.addChild(new jsInputController(), 'status');
}
extend(jsQCMIPTVController, jsFieldSetController);

function jsQCMIPTVClientView(ctrl, viewInx, options){
	var obj;
	
	options.nothing = true;
	options.simple = true;
	options.wizard = false;
	
	obj = ctrl.getChild("status");
	obj.nextIface = "text";
	obj.ifaceTypes.text.options = {
		humanName: "quickIPTVSave",
		hide: true,
		inputPadding: "250px"
	};
	obj.model.value = "<img src='image/wait.gif' style='vertical-align:top' />";
	
	jsQCMIPTVClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function() {
		jsQCMIPTVClientView.superclass.drawView.call(this);
		if ($(this.childBoxSel).find('div.description').length == 0) {
			$(this.childBoxSel).append("<div class='description' style='margin-top: 30px;'></div>");
		}
		$(this.childBoxSel).find('div.description').html("<h4>" + lng('quickDescIPtv') + "</h4>");
	}
}
extend(jsQCMIPTVClientView, jsFieldSetClientView);

function jsIptvMasterController(blockView, wizardView){
	jsIptvMasterController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsIptvMasterClientView};
	this.addIface();
	this.nextIface = "client";
}
extend(jsIptvMasterController,jsFieldSetController);

function jsIptvMasterClientView(ctrl, viewInx, options){

	this.drawView = function (){
		jsIptvMasterClientView.superclass.drawView.call(this);
		
		var wizard = true;
		var page = this.page = new pageIPTV(wizard);
		
		page.locate( this.viewBoxSel );
		page.$buttonBar = $( '#pageToolbarButtons' );
		page.emit( 'updaterq' )
	}

	jsIptvMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options);	
}
extend(jsIptvMasterClientView,jsFieldSetClientView);



function jsQCMFinishController(){
	jsQCMFinishController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsQCMFinishClientView, options:{}};
	this.addChild(new jsInputController(), 'status');
}
extend(jsQCMFinishController, jsFieldSetController);

function jsQCMFinishClientView(ctrl, viewInx, options){
	var obj;
	
	options.nothing = true;
	options.simple = true;
	options.wizard = false;
	
	obj = ctrl.getChild("status");
	obj.nextIface = "text";
	obj.ifaceTypes.text.options = {
		humanName: "quickCompleting"
	};
	obj.model.value = lng('quickSaveConfirm');
	
	jsQCMFinishClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
}
extend(jsQCMFinishClientView, jsFieldSetClientView);



function jsQCMWifiController(){
	jsQCMWifiController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsQCMWifiClientView, options:{}};
}
extend(jsQCMWifiController, jsFieldSetController);

function jsQCMWifiClientView(ctrl, viewInx, options){
	jsQCMWifiClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function(){
		jsQCMWifiClientView.superclass.drawView.call(this);
		var wizard = window.wifiWizard = new pageWiFiWizard(true);
		wizard.locate(this.options.viewBoxSel).$buttonBar = $("#pageToolbarButtons");
	}	
}
extend(jsQCMWifiClientView, jsFieldSetClientView);


function jsQuickConfigMasterController(){
	jsQuickConfigMasterController.superclass.constructor.call(this);

	this.changeModel(new jsModel());

	this.ifaceTypes.client = {type: jsQuickConfigMasterClientView, options:{}};
	this.ifaceTypes.server = {type: jsQuickConfigMasterServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface: true};
	
	this.nextIface = "server";
	this.addIface();
	this.nextIface = "client";
	
	this.onupdaterq = function(){
		this.getChild("inet").event("updaterq");
		return false;
	}
	
	this.onmodeswitch = function(value){
		this.getChild("inet").event("modeswitch", value);
		return false;
	}

	this.addChild(new jsPreMasterController(), 'inet');
	this.addChild(new jsQCMWifiController(), 'wifi');
	this.addChild(new jsQCMIPTVController(), 'iptv');
	this.addChild(new jsQCMFinishController(), 'finish'); 
	
	this.addEventHandler("updaterq", this.onupdaterq);
	this.addEventHandler("modeswitch", this.onmodeswitch);
}
extend(jsQuickConfigMasterController, jsFieldSetController);

function jsQuickConfigMasterClientView(ctrl, viewInx, options){
	var obj;
	
	options.nothing = true;
	options.simple = true;
	options.wizard = true;
	
	ctrl.getChild("inet").ifaceTypes.client.options.buttonsInline = false;
	
	jsQuickConfigMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* fix */
	jsQuickConfigMasterClientView.prototype.ontabclick = null;
	
	this.drawView = function() {
		if (!this.viewBoxSel) {
			this.viewBoxSel = this.options.viewBoxSel;
		}
		jsQuickConfigMasterClientView.superclass.drawView.call(this);
		/* fix */
		this.hideButton('prev');
		this.hideButton('skip');
		this.hideButton('next');
		this.hideButton('save');
	}
	
	this.enableButtons = function(on){
		if (on) {
			this.enableButton('prev');
			this.enableButton('next');
			this.enableButton('skip');
		} else {
			this.disableButton('prev');
			this.disableButton('next');
			this.disableButton('skip');
		}
	}

	this.beforeLogic = function() {
		if (arguments[0] == "skip_iptv") {
			this.ctrl.event("iptvSaved");
			this.ctrl.event("iptvready", null, true);	//Для Click'n'Connect
		} else {
			this.showModalOverlay();
			this.enableButtons(false);
			switch (this.getChild(this.activeTab).ctrl.alias) {
				case 'iptv':
	/*
					this.getChild('iptv', 'iptv').updateModel();
					this.getChild('iptv', 'iptv').hide();
					this.getChild('iptv', 'status').show();
					if (this.getChild('iptv', 'iptv').updateModel()) {
						setTimeout(callback(this, function(){
							rootView.hideWaitScreen();
							this.ctrl.event("iptvSaved");
							this.ctrl.event("iptvready", null, true);	//Для Click'n'Connect
						}),  10000*2);
						rootView.showWaitScreen(lng("pleaseWait"),  10000*2,5);
						this.getChild('iptv', 'iptv').ctrl.event("saverq");
					}
	*/
					function onApply(){

						clearTimeout( tt );
						rootView.hideWaitScreen();
						this.ctrl.event("iptvSaved");
						this.ctrl.event("iptvready", null, true);	//Для Click'n'Connect
					}

					this.getChild('iptv', 'iptv').page.updateModel();
					
					// Можно сказать что костыль, timer1 - рубим запрос не дожидаясь ответа, tt - обновляем страницу
					rootView.showWaitScreen( lng( "pleaseWait" ),  10000*3 );
					var timer1 = setTimeout(context(this).callback(function(){ device.stop(); }), 10000/2);				
					var tt = setTimeout( callback( this, onApply ),  10000*2 );

					devu.iptv.push( callback(this, onApply ));

					break;
			}
		}
	}

	this.afterLogic = function(){
		var lastInx = this.ctrl.children.length - 1;
		this.enableButtons(true);
		if(this.activeTab == lastInx){
			this.hideButton("next");
			this.hideButton("skip");
			this.showButton("save");
		} else {
			this.showButton("next");
			this.showButton("skip");
			this.hideButton("save");
		}
		if (this.activeTab == 1) {
			this.hideButton("prev");
		} else {
			this.showButton("prev");
		}
		switch (this.getChild(this.activeTab).ctrl.alias) {
			case 'iptv':
				if (!this.getChild('iptv', 'iptv').options.ishidden) {
					$('#uiSTBPort>.customCheckbox>input').removeAttr('checked');
					$('#uiSTBPort>.customCheckbox').removeClass("on").addClass("off");
				}
				this.getChild('iptv', 'iptv').show();
				this.getChild('iptv', 'status').hide();
				break;
			case 'finish':
				this.getChild('iptv', 'status').show();
				break;
		}
	}

	this.goNext = function(){
		this.switchChild(this.activeTab + 1);
		this.afterLogic();
	}
	
	this.goPrev = function(){
		this.switchChild(this.activeTab - 1);
		this.afterLogic();
	}
	
	this.goSkip = function(){
		switch (this.getChild(this.activeTab).ctrl.alias) {
			case 'iptv':
				$('#uiSTBPort>.customCheckbox>input').removeAttr('checked');
				this.beforeLogic("skip_iptv");
			break;
		}
	}
	
	this.goSave = function(){
		this.showModalOverlay();
		this.ctrl.event('saverq');
	}

	this.options.buttons = 	[
								{name:"prev", value:"button_prev", handler:this.goPrev},
								{name:"next", value:"button_next", handler:this.beforeLogic},
								{name:"skip", value:"button_skip", handler:this.goSkip},
								{name:"save", value:"button_save", handler:this.goSave}
							];
	
	this.onupdaterq = function() {
		this.showModalOverlay();
		return true;
	}
	
	this.onupdmodel = function() {
		this.hideModalOverlay();
		return true;
	}
	
	this.onwanready = function(){
		window.wifiWizard.emit("updaterq");
		window.wifiWizard.quickMasterCtrl = this.ctrl;
		this.switchChild(1);		
		return false;
	}

	this.onwifiready = function(){
		if(!hideFlag( 119)){
			this.ctrl.event('updaterq2');
			this.drawButtons();
			this.switchChild("iptv");
			this.hideButton('prev');
			this.hideButton('save');
		}
		else{
			this.drawButtons();
			this.switchChild("finish");
			this.hideButton('prev');
			this.hideButton('next');
			this.hideButton('skip');
		}
	}
	
	this.oniptvready = function(){
		this.drawButtons();
		this.switchChild("finish");
		this.hideButton('prev');
		this.hideButton('next');
		this.hideButton('skip');
	}
	
	this.onyandexready = function(){
		//
	}
	
	this.activeTab = 0;
	this.bind("updaterq", this.onupdaterq);
	this.bind("updaterq2", this.onupdaterq);
	this.bind("updmodel", this.onupdmodel);
	this.bind("wanready", this.onwanready);
	this.bind("wifiready", this.onwifiready);
	this.bind("iptvready", this.oniptvready);
	this.bind("yandexready", this.onyandexready);	
	//~ this.getChild('iptv', 'iptv').bind("iptvSaved", context(this).callback(this.goNext));
}
extend(jsQuickConfigMasterClientView, jsFieldSetClientView);

function jsQuickConfigMasterServerView(ctrl, viewInx, options) {
	jsQuickConfigMasterServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		
		if(data && !data.baddata) {
			if (this.mode == "update" && data.rq) {

			} else if (this.mode == "save") {
				alert(lng('quickComplite'));
				//~ document.location.href = "index.cgi";
				document.location.hash = "";
				location.reload(true);
			}
		}
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;
		var jsonOutObj;
		var ctrl = this.ctrl;

		switch (this.mode) {
			case "update":
				var index = 0;
				var i = 0;
				index += 3;
				index += 1;
				obj = {
					v2: "y",
					rq: index
				};
				obj['res_json'+i] = 'y';
				obj['res_config_action'+i] =  1;
				obj['res_config_id'+i] =  35;
				obj['res_struct_size'+i] = 0;
				i++;
				obj['res_json'+i] = 'y';
				obj['res_config_action'+i] =  1;
				obj['res_config_id'+i] =  38;
				obj['res_struct_size'+i] = 0;
				i++;
				obj['res_json'+i] = 'y';
				obj['res_config_action'+i] =  1;
				obj['res_config_id'+i] =  37;
				obj['res_struct_size'+i] = 0;
				i++;
				obj['res_json'+i] = 'y';
				obj['res_config_action'+i] =  1;
				obj['res_config_id'+i] =  119;
				obj['res_struct_size'+i] = 0;
				this.addToRequest(obj);
			break;
			case "save":
				obj = {
					v2: "y",
					rq: "y",
					res_cmd: 20,
					res_buf: null,
					res_cmd_type: "bl"
				};
				this.addToRequest(obj);
			break;
		}
	}

	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		this.mode = "update";
		this.updateView();
	}
	
	this.onsaverq = function() {
		this.mode = "save";
		this.updateView();
	}

	this.onwifirq = function() {
		this.mode = "wifi";
		this.updateView();
	}

	/**Режим работы представления.
	 * @type	String
	 */
	this.mode = "update";			//"save"
	this.bind("updaterq2", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
	this.bind("wifirq", this.onwifirq);
}
extend(jsQuickConfigMasterServerView, jsSSideView);





















function jsMainMenuController(nodeName, options){
	jsMainMenuController.superclass.constructor.call(this, nodeName, options);

	this.ifaceTypes.tree = {type: jsMainMenuView, options:{hide: (options && options.hide)?true:false}};
}
extend(jsMainMenuController, jsMenuController);

 
function jsMainMenuView(ctrl, viewInx, options){
	jsMainMenuView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Добавляет class last к последнему меню*/
	this.drawView = function(){
		jsMainMenuView.superclass.drawView.call(this);
		var parent = this.getParent();
		if(parent instanceof jsMenuView && parent.root && this.ctrl.thisInx == (parent.ctrl.children.length - 1)){
			$(this.viewBoxSel).addClass("last");
		}
	}
}
extend(jsMainMenuView, jsMenuView);






















 
function pageDLNA(){
	pageDLNA.superclass.constructor.call(this);

	this.updateView = function(phase, status){
		pageDLNA.superclass.updateView.apply(this, arguments);
		
		try{
			
			if(this.noStorage && !this.ignoreStorage){
				if(phase == "forward"){
					this.$box.errorBlock(
								"mountError"
								, "<input id='ignoreStorage' type='checkbox'> <span langkey='dlna_ignore_storage'>" + lng("dlna_ignore_storage") + ".</span>"
								, [lng("mountErrorDesc1")]
								, lng("updatePage")
								, callback(this, function(){
									if($("#ignoreStorage").attr("checked")){
										this.ignoreStorage = true;
									}
									this.emit("updaterq");
								})
					);
					status.stop = true;
					return this;
				}
			}

			if(phase == "forward"){	
					var json = this.json;
					this.startForm()
						.add(new nodeCaption("dlnaLabel", "dlnaDescText"))
						.add(new nodeCaption("dlna_main"), "main").get("main")
							.add(new nodeCheckBox("enable", json.enabled), "enabled")
							.add(new nodenum("dlna_interval", json.interval, {minval: 60, maxval: 36000}), "interval")
							.add(new nodetext("dlna_name", json.name), "name").get("..")
						.add(new nodeCaption("dlna_media_dirs"), "media_dirs").get("media_dirs")
							.add(new node(), "media_dir_table");
					this.endForm();
					
					this.cleanButtonBar()
						.addButton("button_reset")
						.getButton("button_reset")
						.bind("click.button", callback(this, function(event){							
							if(confirm(lng("reset_fields_rq"))){
								this.deep.updateView();
							}
						}));
	
					this.addButton("button_save")
						.getButton("button_save")
						.bind("click.button", callback(this, function(event){							
							if(this.deep.updateModel()){
								device.config.write( 182, {dlna: this.json}, callback(this, function(data){
									rootView.hideModalOverlay();
									if(is.RPC_SUCCESS(data)){
										this.json = data.resident.dlna;
									}
									
									this.deep.updateView();
								}));
							}
						}));
			}
			else{
	/*			this.$box.append("<div class='storage-path-box'></div>")
					.find(".storage-path-box")
					.storagePath();*/
					
				var media_dirs = this.json.media_dirs;

				var media_dir = this.get("media_dirs/media_dir_table");
				var $grid = this.$grid = media_dir.$box.lightUIGrid([
					{ index: "path", name: "dlna_media_dir" },
					{ index: "type", name: "dlan_media_type" }
				], media_dirs.length, {
					selectable: true
				}).addClass("rm");
				
				$grid.colEditable("path", $.fn.storagePath, {mandatory: true})
					.colEditable("type", "select", {
						optionArray: [
							{name: "dlna_all", value: "ALL"},
							{name: "dlna_audio", value: "A"},
							{name: "dlna_video", value: "V"},
							{name: "dlna_pictures", value: "P"}
						]
					});
					
				var $row;
				for(var i=0; i<media_dirs.length; i++){
					$row = $grid.row(i);
					$row.col("path").fieldval(media_dirs[i].path);
					$row.col("type").fieldval(media_dirs[i].type);
				}
					
				this.get("media_dirs/media_dir_table")
					.addButton("add")
					.getButton("add")
					.bind("click.button", callback(this, function(){
						var $row = this.$grid.addRow().row("last");
						$row.col("type").fieldval("V");
						$row.col("path").trigger("click");
					}));		
			}
		}
		catch(e){
			this.$box.errorBlock(lng("error"), e.message);
		}
	}

	this.updateModel = function(status){
		if(!status.error){
			var json = this.json;
			var main = this.get("main");
			json.enabled = main.get("enabled").val();
			json.interval = main.get("interval").val();
			json.name = main.get("name").val();
			
			var $grid = this.$grid;
			
			if($grid.checkMandatory(true)){
				var $row;
				json.media_dirs = [];
				for(var i=0, j=0; i<$grid.nrow(); i++){
					$row = $grid.row(i);
					if(!$row.selected()){
						json.media_dirs[j++] = {
							path: $row.col("path").fieldval(),
							type: $row.col("type").fieldval()
						};
					}
				}
			}
			else{
				status.error = true;
			}
		}
	}

	this.onupdaterq = function(){
		rootView.showModalOverlay();
		device.config.read([ 182,  82], callback(this, function(data){
			rootView.hideModalOverlay();
			if(is.RPC_SUCCESS(data.rq[0])){
				this.json = data.rq[0].resident.dlna;
			}
			if(!is.RPC_SUCCESS(data.rq[1])
				|| !data.rq[1].resident
				|| !data.rq[1].resident.usb_storage
				|| !getObjectLength(data.rq[1].resident.usb_storage)){
				this.noStorage = true;
			}
			else{
				this.noStorage = false;
			}
			
			this.deep.updateView();
		}));
	}

	this.bind("updaterq", this.onupdaterq);


}
extend(pageDLNA, node);























 /**Создаёт новый экземпляр класса jsMiscSettingsModel.
 * @class				Хранит сервис интерфейса.
 * @param	service		Узел L3 интерфейса.
 * @constructor
 */
function jsMiscSettingsModel(service) {
	jsMiscSettingsModel.superclass.constructor.call(this);

	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;
}
extend(jsMiscSettingsModel, jsModel);


function jsMiscSettingsController(service, isadding) {
	jsMiscSettingsController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsMiscSettingsClientView};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsMiscSettingsSummaryView};
	this.ifaceTypes.summary.options = {};

	this.changeModel(new jsMiscSettingsModel(service));

	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(service.table_alt), "table_alt");
	this.addChild(new jsInputController(service.rip), "rip");
	this.addChild(new jsWANIGMPController(service), "igmp");
	this.addChild(new jsInputController(service.nat), "nat");
	this.addChild(new jsInputController(service.firewall), "firewall");
	this.addChild(new jsInputController(service.ping_respond), "ping");

	this.getChild("igmp").nextIface = "client";	
}
extend(jsMiscSettingsController, jsFieldSetController);


function jsMiscSettingsClientView(ctrl, viewInx, options) {
	var obj;
	var service = ctrl.model.service;
	var level = ctrl.model.service.level;
	var opt;
	
	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {};
	opt = obj.ifaceTypes.separator.options;
	opt.label = "wanMiscSect";
	opt.hide = service.blocks || !service.is_wan || (!options.inwizard && (service.contype.match(/l2tp/) || service.contype.match(/pptp/)));

	var alt_contypes = ['dynamic', 'dynamicv6', 'static','staticv6','pppoe','pppoev6','pppoedual',
						 'pptp', 'pptpv6', 'statpptp', 'statpptpv6', 'dynpptp', 'dynpptpv6', 'l2tp', 
						 'l2tpv6', 'dynl2tp', 'dynl2tpv6', 'statl2tp', 'statl2tpv6', 'statpppoe', 'dynpppoe'
					   ];
	obj = ctrl.getChild("table_alt");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanIsolation",
		valset: {on:true, off:false},
		hide: ( alt_contypes.indexOf(service.contype) == -1 )
	};
	
	obj = ctrl.getChild("igmp");
	obj.ifaceTypes.client.options = {
		valset: {on:true, off:false}
	};
	opt = obj.ifaceTypes.client.options;
	opt.hide = (service.contype == "3g"
		|| service.contype == "lte"
		|| service.type == "pppv6"
		|| service.type == "ipv6"
		|| service.level == 4);


	obj = ctrl.getChild("rip");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanRip",
		valset: {on:true, off:false},
		hide: !service.is_wan
	};
	obj.ifaceTypes.checkbox.options.hide |= (service.contype == "3g" || service.contype == "lte" || service.contype == "624");

	obj.ifaceTypes.checkbox.options.hide |= true;
	
	obj = ctrl.getChild("nat");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanNat",
		valset: {on:true, off:false},
		hide: !service.is_wan
	};
	obj.ifaceTypes.checkbox.options.hide |= (service.contype == "624"
		|| service.type == "pppv6"
		|| service.type == "ipv6");
	
	obj = ctrl.getChild("firewall");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanFirewall",
		valset: {on:true, off:false},
		hide: !service.is_wan
	};
	
	obj = ctrl.getChild("ping");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanPingRespond",
		valset: {on:true, off:false},
		hide: !service.is_wan
	};
	
	/**Обновить модель.*/
	this.updateModel = function(){
		var res = jsMiscSettingsClientView.superclass.updateModel.call(this);
		if(res){
			var service = this.ctrl.model.service;
			service.rip = this.getChild("rip").ctrl.model.value;
			service.table_alt = this.getChild("table_alt").ctrl.model.value;			
			service.nat = this.getChild("nat").ctrl.model.value;
			service.firewall = this.getChild("firewall").ctrl.model.value;
			service.ping_respond = this.getChild("ping").ctrl.model.value;
		}
		return res;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.hide();
		}
		else{
			//подробно
			this.show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsMiscSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
	}
	 
	this.brief = service.wizard;
	
	jsMiscSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("modeswitch", this.onmodeswitch);
}
extend(jsMiscSettingsClientView, jsFieldSetClientView);



function jsMiscSettingsSummaryView(ctrl, viewInx, options){
	var obj = ctrl.getChild("igmp");
	obj.nextIface = "summary";
	obj.ifaceTypes.summary.options = {
		valset: {on:true, off:false}
	};
	var service = ctrl.model.service;
	var level = ctrl.model.service.level;
	obj.ifaceTypes.summary.options.hide = (service.contype == "3g"
		|| service.contype == "lte"
		|| service.type == "pppv6"
		|| service.type == "ipv6"
		|| service.level == 4);
	jsMiscSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.drawView = function(){
		this.getChild("desc").options.hide = true;
		jsMiscSettingsSummaryView.superclass.drawView.call(this);
	}

	this.updateView = function(){
		jsMiscSettingsSummaryView.superclass.updateView.call(this);
		this.getChild("desc").hide();
	}	

	this.bind("modeswitch", function(){return false;});
}
extend(jsMiscSettingsSummaryView, jsMiscSettingsClientView);





















 /**Создаёт новый экземпляр класса jsg3InfoModel.
 * @class			модель информации о wimax.
 * @constructor
 */
function jsNeedPinModel() {
	jsNeedPinModel.superclass.constructor.call(this);

	this.pinInfo = null;
}
extend(jsNeedPinModel, jsModel);

 
function jsNeedPinController(){
	jsNeedPinController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsNeedPinClientView};
	this.ifaceTypes.server = {type: jsNeedPinServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.changeModel(new jsNeedPinModel());
	
	this.nextIface = "server";
	this.addIface();
	
	this.addChild(new jsInputExController(), "hint");
	this.addChild(new jsInputExController(), "pin");
	this.addChild(new jsInputExController(), "new_pin");
	
	/**Обработчик события updaterq.
	 * Переправляет запрос на обновление своему потомку, которому оно реально нужно.
	 */
	this.onupdaterq = function(){
		return true;
	}
	
	this.onupdmodel = function() {
		return true;
	}
	
	this.firstSave = false;
	
	this.addEventHandler("updaterq", this.onupdaterq);
	this.addEventHandler("updmodel", this.onupdmodel);
}
extend(jsNeedPinController, jsWindowController);

 
function jsNeedPinClientView(ctrl, viewInx, options){	
	var obj;
	
	obj = ctrl.getChild('hint');
	obj.nextIface = 'texter';
	obj.ifaceTypes.texter.options = {
		humanName: 'g3_pin_puk_attempt',
		hide: true
	};
	
	obj = ctrl.getChild('pin');
	obj.nextIface = 'inputer';
	obj.ifaceTypes.inputer.options = {
		humanName: 'PIN-код'
	};
	
	obj = ctrl.getChild('new_pin');
	obj.nextIface = 'inputer';
	obj.ifaceTypes.inputer.options = {
		humanName: 'g3_pin_code_new',
		hide:true
	};
	
	this.enter = function(){
		var pinInfo = this.ctrl.model.pinInfo;
		var rePin = new RegExp('^[0-9]{4}$', 'g');
		var rePuk = new RegExp('^[0-9]{8}$', 'g');
		
		this.getChild("pin").updateModel();
		this.getChild("new_pin").updateModel();
		var pin = this.getChild("pin").ctrl.model.value;
		var new_pin = this.getChild("new_pin").ctrl.model.value;
		
		if ((pinInfo.pinstatus == 1 && rePin.test(pin)) || (pinInfo.pinstatus > 1 && rePuk.test(pin) && rePin.test(new_pin))) {
			this.ctrl.event("saverq");
			this.hide();
		} else {
			this.bounce();
		}
	}
	
	this.cancel = function(){
		this.hide();
	}
	
	this.showMessage = function(s, text){
		$(s).html(lng(text));
		$(s).fadeIn(1000, function(){
				setTimeout(function(){
					$(s).fadeOut(10000);
				}, 10000);
			});
	}

	this.showError = function(text){
		this.showMessage("#pincodeError", text);
	}
	
	this.showSuccess = function(text){
		this.showMessage("#pincodeSuccess", text);
	}
	
	options.title = 'menu_g3pin_';
	options.draggable = true;
	options.action = [ { name: 'button_input', func: this.enter}, {name: 'Отмена', func: this.cancel}];
	
	jsNeedPinClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	 /**Обработка события updmodel.
	  * @param	model	Модель.
	  */
	this.onupdmodel = function(model){
		var pinInfo = this.ctrl.model.pinInfo;
		if (pinInfo && !no(pinInfo.pin_off)) {
			var code = '';
			var att_total;
			var att_left;
			var text = null
			switch (pinInfo.pinstatus) {
				case 1:
					code = 'g3_pin_code';
					att_total = 3;
					att_left = pinInfo.pin_att_left;
					if(is.set(att_total) && is.set(att_left)){
						text = "g3PinWrongPin";
					}
					else{
						text = "g3PinNeedPin";
					}
					this.show();
					break;
				case 2:
					code = 'g3_puk';
					att_total = pinInfo.puk_att_total;
					att_left = pinInfo.puk_att_left;
					this.getChild("new_pin").show();
					if(is.set(att_total) && is.set(att_left)){
						if(att_left == att_total){
							text = "g3PinWrongPin";
						}
						else{
							text = "g3PinWrongPuk";
						}
					}
					else{
						text = "g3PinNeedPuk";
					}
					this.show();
					break;
				case 4:
					code = 'g3_puk2';
					att_total = pinInfo.puk2_att_total;
					att_left = pinInfo.puk2_att_left;
					if(is.set(att_total) && is.set(att_left)){
						text = "g3PinWrongPuk2";
					}
					else{
						text = "g3PinNeedPuk2";
					}
					this.show();
					break;
				case -1:
					alert(lng("g3_pin_modem_not_accessible"));
					
					this.disableAction('button_input');
					return false;
					break;
			}
			if(this.ctrl.firstSave){
				if(text){
					this.showError(text);
				}
				else{
					this.showSuccess("g3PinSuccess");
				}
			}
			
			var hint = this.getChild('hint');
			if(is.set(att_total)){
				hint.show();
				hint.ctrl.model.value = att_left+'/'+att_total;
				hint.updateView();
			}
			else{
				hint.hide();
			}
			this.getChild('pin').options.humanName = code;
			this.getChild('pin').drawView();
		}
		return false;
	}
	
	this.bind("updmodel", this.onupdmodel);
}
extend(jsNeedPinClientView, jsWindowClientView);

 
function jsNeedPinServerView(ctrl, viewInx, options){
	jsNeedPinServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		this.ctrl.model.pinInfo = null;
		
		if (data && !data.baddata && data.resident) {
			this.ctrl.model.pinInfo = data.resident;
		}
			
		if (this.mode && this.mode != "update") {
			this.ctrl.event("updaterq");
		}
	}
	
	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;
		var jsonOutObj;
		var ctrl = this.ctrl;
		
		switch(this.mode) {
			case "save":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_data_type: "json",
					res_config_action:  3,
					res_config_id:  135,
					res_struct_size: 0
				};
				var newpin = '';
				if (ctrl.model.pinInfo.pinstatus==2){
					newpin = ctrl.getChild("new_pin").model.value;
				}
				ctrl.firstSave = true;
				jsonOutObj = {
					pin:		ctrl.getChild("pin").model.value,
					newpin:		newpin,
					pinoff: 	ctrl.model.pinInfo.pin_off
				
				};
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
				
			case "update":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_action:  1,
					res_config_id:  135,
					res_struct_size: 0
				};
				this.addToRequest(obj);
			break;
		}
	}

	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		this.mode = "update";
		this.updateView();
	}

	/**Обработчик события onsaverq (изменение пина).
	 */
	this.onsaverq = function() {
		this.mode = "save";
		this.updateView();
	}
	
	/**Режим работы представления.
	 * @type	String
	 */
	
	this.mode = "update";			
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
}
extend(jsNeedPinServerView, jsSSideView);




















function pageNetStat(){
	pageNetStat.superclass.constructor.call(this);
	
	this.netlist = null;
	this.rqId = -1;
	this.virgin = true;
	this.refreshTime = 3000;
	this.refreshId = null;

	this.updateView = function(phase){
		pageNetStat.superclass.updateView.apply(this, arguments);
		if (phase == 'back') {
			this.$grid = this.$box.html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid([
				{ index: "name", name: "nstName" },
				{ index: "ip", name: "nstIp" },
				{ index: "gw", name: "nstGw" },
				{ index: "mac", name: "nstMac" },
				{ index: "mtu", name: "nstMtu" },
				{ index: "rxtx", name: "nstRxTx" }
			], 0);
			if (this.netlist) {
				for(var i in this.netlist){				
					var stateStr, stateImg, stateColor, rxtx = '-', empty = '-', name = '-';
					var iface = this.netlist[i];
					
					name = iface.name?iface.name:iface.port?iface.port:i;
					
					if(!iface.state || iface.state == "down"){
						stateStr = lng("nstStateDown");
						stateImg = "<img src=\"image/ledred.gif\" />";
						stateColor = "red";
					}
					else if(iface.state == "up"){
						stateStr = lng("nstStateUp");
						stateImg = "<img src=\"image/ledgreen.gif\" />";
						stateColor = "green";
						rxtx = lookSize(iface.rx).toString() + " / " + lookSize(iface.tx).toString();
					}
					else{
						stateStr = iface.state;
						stateImg = "<img src=\"image/ledyellow.gif\" />";
						stateColor = "yellow";
					}
					
					var shortName = name;
					if(is.string(name)){					
						if(name.length > 15){
							shortName = name.substr(0,13) + "..";
						}
					}

					if(is.string(iface.mask) && is.string(iface.ip) && !iface.ip.match(/:/)){
						var ipv4 = new IPv4(iface.ip, iface.mask);
						ip = ipv4.toString(true);
					}
					else{
						ip = iface.ip?checkIPv6(iface.ip):empty;
					}
					
					var $row = this.$grid.addRow().row("last");
					$row.col("name").attr("title", name + " (" + stateStr + ")")
									.html("<span>" + shortName + "</span>")
									.find("span")
									.css("color", stateColor);
					$row.col("ip").html(ip);
					$row.col("gw").html(iface.gw?iface.gw:empty);
					$row.col("mac").html(iface.mac?(iface.mac.toUpperCase()):empty);
					$row.col("mtu").html(no(iface.mtu)?empty:iface.mtu.toString());
					$row.col("rxtx").html(rxtx);

				}
			}
		}
	}
	
	this.update = function(){
		if (this.virgin) rootView.showModalOverlay();
		this.rqId = device.config.read( 104, callback(this, function(data){
			this.netlist = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.startRefresh(this.refreshTime);
		}));
		this.virgin = false;
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}

	this.stopRefresh = function(){
		device.stop(this.rqId);
		clearTimeout(this.refreshId);
		this.virgin = true;
		return this;
	}
	
	this.bind("updaterq", function(){
		this.stopRefresh().startRefresh(0);
	});
	this.bind("stoprefreshrq", function(){
		this.stopRefresh();
	});

	/**Обработчик события updaterq (обновление).
	 */
	if (!window.engine || !window.engine.candyBlack) {
		this.onupdaterq = function() {
			this.updateView();
		}

		this.bind("updaterq", this.onupdaterq);
	}
	
	function checkIPv6(ip) {
		var ipbuf = ip.split(':');
		if (ipbuf.length > 4) {
			for (var j = 0, ipstart = ""; j < (ipbuf.length - 1); j++) {
				ipstart += (ipbuf[j] != ":")?(ipbuf[j] + ":"):":";
				if (j == 3) {
					ipstart += "</br>";
				}
			}
			ipstart += ipbuf[ipbuf.length - 1];
			ip = ipstart;
		}
		return ip;
	}
}
extend(pageNetStat, node);
























function jsNotifierModel(){
	jsNotifierModel.superclass.constructor.call(this);
	
	this.list = [];
	
	this.isMSGExist = function(notifierInfo) {
		for (var i = 0; i < this.list.length; i++) {
			if (this.list[i].msg == notifierInfo.msg && this.list[i].event == notifierInfo.event) {
				return true;
			}
		}
		return false;
	}
	
	this.remove = function(from, to) {
		var rest = this.list.slice((to || from) + 1 || this.list.length);
		this.list.length = from < 0 ? this.list.length + from : from;
		return this.list.push.apply(this.list, rest);
	}
}
extend(jsNotifierModel, jsModel);


function jsNotifierController(){
	jsNotifierController.superclass.constructor.call(this, null, {});
	
	this.ifaceTypes.tree = {type: jsNotifierView, options: {}};
	this.ifaceTypes.getinfo = {type: jsNotifierGetInfoView, options: {action: "index.cgi"}};
	this.changeModel(new jsNotifierModel());
	
	this.addMsg = function(notifierInfo, name) {
		if ( window.DISABLE_NOTIFIER ) return;
		if (!this.model.isMSGExist(notifierInfo)) {
			this.model.list.push(notifierInfo);
			this.addChild(new jsNotifierItemController(notifierInfo, {frame: this}), name);
		}
	}
	
	this.removeMsg = function(name){
		this.event("deleteitem", this.getInxByAlias(name));
	}
}
extend(jsNotifierController, jsFastmenuController);




function jsNotifierView(ctrl, viewInx, options){
	jsNotifierView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.collapseAll = function() {
		var drawParentView = context(this).callback(this.drawParentView);
		
		$(this.viewBoxSel).unbind('mouseleave'); /* for looking effect */
		$(this.viewBoxSel+' ul.fastmenuItem>li.notifierItem').fadeOut(400, function() {
			if ($(this).is('.last')) {
				drawParentView();
			} else {
				$(this).remove();
			}
		});
		this.rolledUp = true;
		return false;
	}
	
	this.ondeleteitem = function(index) {
		var drawParentView = context(this).callback(this.drawParentView);
		this.ctrl.unlinkChild(index);
		this.ctrl.model.remove(index);

		$(this.viewBoxSel).unbind('mouseleave'); /* for looking effect */
		$(this.viewBoxSel+' ul.fastmenuItem>li.notifierItem:eq(' + index + ')').fadeOut('slow', function(){
			drawParentView();
		});
	}
	
	this.blink = function() {
		if ($(this.myBoxSel+'>img').attr('src').indexOf('off') >= 0) {
			$(this.myBoxSel+'>img').attr('src', 'image/light_on.png')
		} else {
			$(this.myBoxSel+'>img').attr('src', 'image/light_off.png')
		}
	}
	
	this.startBlink = function() {
		this.intervalID = setInterval(context(this).callback(this.blink), 250);
	}
	
	this.stopBlink = function() {
		clearInterval(this.intervalID);
		this.intervalID = null;
	}
	
	jsNotifierView.prototype.drawView = function(){
		this.stopBlink();
		this.constructor(this.ctrl, this.viewInx, this.options?this.options:{});
		jsNotifierView.superclass.drawView.call(this);

		if (this.ctrl.level == 1) {
			$(this.viewBoxSel).addClass('notifier');
			$(this.myBoxSel).html("<img src='image/light_off.png' />&nbsp;");
			
			var lastItem = $("<li class='notifierItem last' />");
			
			if (this.ctrl.children.length > 0) {
				this.startBlink();
				
				var span = $("<span class='msgCount'>" + this.ctrl.children.length + "</span>");
				$(this.viewBoxSel+'>.temp').append($(span));
					
				var a = $("<a href='#'>" + lng('rollup_notifications') +"</a>");
				$(this.viewBoxSel+' ul.fastmenuItem').append($(lastItem).append($(a)));
				$(a).click(context(this).callback(this.collapseAll));
			} else {
				$(this.viewBoxSel).append("<div class='temp'><ul class='fastmenuItem'></ul></div>")
				var span = $("<span>" + lng('empty_notifications') +"</span>");
				$(this.viewBoxSel+' ul.fastmenuItem').append($(lastItem).append($(span)));
			}

			$(this.myBoxSel).bind("mouseenter", callback(this, function(){
				this.rolledUp = false;
			}));
				
			if(this.showAlways && !this.rolledUp){
				$(this.viewBoxSel).trigger("mouseenter");
				$(this.viewBoxSel).off("mouseleave");
			}else{
				$(this.viewBoxSel).mouseenter(function(){
					$(this).addClass('selected');
				}).mouseleave(function(){
					$(this).removeClass('selected');
				}).click(function(){
					$(this).find('.action>a').click();
				});
			}
		}
	}
	
	this.onshowalways = function(){
		$(this.viewBoxSel).trigger("mouseenter");
		$(this.viewBoxSel).off("mouseleave");
		this.showAlways = true;
		this.rolledUp = false;
		return false;
	}
	
	this.oncancelshowalways = function(){
		$(this.viewBoxSel).mouseleave(function(){
			$(this).removeClass('selected');
		});
		
		this.showAlways = false;
		
		this.drawParentView();
		return false;
	}
	
	/* Name:		onupdmodel
	* Description: 	обработчик события updmodel
	* Arguments:	model - модель, которая обновилась                                                                                                              
	* Return value:	true - всплывает, false - не всплывает
	* Notes:		
	*/
	this.onupdmodel = function(model){
		this.drawView();
	}
	
	this.ondeleteall = function(){
		$(this).remove();
	}
	
	this.drawParentView = function() {
		this.stopBlink();
		this.getParent().drawView();
	}
	
	this.intervalID = null;
	this.bind("deleteitem",this.ondeleteitem);
	this.bind("updmodel", this.onupdmodel);
	this.bind("showalways", this.onshowalways);
	this.bind("cancelshowalways", this.oncancelshowalways);
	this.bind("deleteall", this.ondeleteall);
}
extend(jsNotifierView, jsFastmenuView);


function jsNotifierGetInfoView(ctrl, viewInx, options){
	jsNotifierGetInfoView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		var id = this.options.sender.responseData.status;
		switch (id) {
			case 12:
				this.ctrl.addMsg({
					icon: '../image/notifiers/reboot.png',
					event: "cfgsaverebootrq",
					msg: 'conf_change_warning',
					time: new Date(),
					action: {
						name: 'button_save_reboot',
						func: function() { rootCtrl.event("cfgsaverebootrq"); }
					}
				});
				break;
			case 13:
				this.ctrl.addMsg({
					icon: '../image/notifiers/save.png',
					msg: 'conf_change_warning_save',
					event: "cfgsaverq",
					time: new Date(),
					action: {
						name: 'button_deflang_save',
						func: function() { rootCtrl.event("cfgsaverq"); }
					}
				});
				break;
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

	
	/* Name:		onmuterq
	* Description: 	обработчик события muterq (остановить всё общение с сервером)
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.onmuterq = function(){
		this.stopRefresh();
		return false;
	}

	this.bind("muterq", this.onmuterq);
}
extend(jsNotifierGetInfoView, jsSSideView);




function jsNotifierItemModel(notifierInfo){
	jsNotifierItemModel.superclass.constructor.call(this);

	this.notifierInfo = notifierInfo;
}
extend(jsNotifierItemModel, jsModel);




function jsNotifierItemController(notifierInfo, options){
	jsNotifierItemController.superclass.constructor.call(this);
	
	this.changeModel(new jsNotifierItemModel(notifierInfo));
	this.ifaceTypes.tree = {type: jsNotifierItemView};
}
extend(jsNotifierItemController, jsController);




function jsNotifierItemView(ctrl, viewInx, options){
	jsNotifierItemView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.clickItem = function(elem) {
		var index = $(this.viewBoxSel).index();
		this.ctrl.getParent().event('deleteitem', index);
		return false;
	}
	
	this.doAction = function(action) {
		action.data();
		return false;
	}
	
	jsNotifierItemView.prototype.drawView = function(){
		var notifierInfo = this.ctrl.model.notifierInfo;
		var time = notifierInfo.time.getHours() + ':' + notifierInfo.time.getMinutes() + ':' + notifierInfo.time.getSeconds();
		var htmlToDraw = '';
		
		htmlToDraw		=	"<div class='icon'><img src=" + notifierInfo.icon + " /></div>";
		htmlToDraw		+=	"<div class='info'>";
		htmlToDraw		+=	"<div class='caption'>";
		htmlToDraw		+=	"<div class='action'><a href='#'>" + lng(notifierInfo.action.name) + "</a></div>";
		htmlToDraw		+=	"<div class='time'>(" + time + ")</div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='message'>" + lng(notifierInfo.msg) + "</div>";
		htmlToDraw		+=	"</div><div class='clear'></div>";
		
		$(this.viewBoxSel).addClass('notifierItem');
		$(this.viewBoxSel).html(htmlToDraw);
		$(this.viewBoxSel+' .action>a').bind('click', notifierInfo.action.func, context(this).callback(this.doAction));
		$(this.viewBoxSel+' .action>a').bind('click', context(this).callback(this.clickItem));
		
		jsNotifierItemView.superclass.drawView.call(this);
	}
}
extend(jsNotifierItemView, jsCSideView);























function pageNTP(){
	pageNTP.superclass.constructor.call(this);
	
	this.ntp = null;
	var timezone = {};             
        

    for (var i = 12; i >= -12; i--) {
                
		timezone[((i>0)?"ntpTzMinus"+i:"ntpTz" + Math.abs(i))] = i;
                
                switch (i){
                    case 5:
                    case 4:
                        timezone["ntpTzMinus" + (i-1) + "30"] = (i-1) + ":30";
                    break;
                    case -3:
                    case -4:
                    case -5:
                    case -6:
                    case -9:
                        timezone["ntpTz" + Math.abs(i) + "30"] = i + ":30";
                        if (i == -5) timezone["ntpTz" + Math.abs(i) + "45"] = i + ":45";
                    break;
                    default:
                    break;
                }
                       
                
	}
	
	this.add(new nodeSelect("ntpMode"), "mode");
	var auto = this.add(new node(), "auto")
		.child("auto")
		.add(new nodeSelect("ntpTz", ''), "hour")
		.add(new nodeTextArea("ntpServers", 'ntp1.dlink.com', {
			rows: 5,
			mandatory: true,
			re: [
				callback(this, function(value){
					var err = null;
					var list = new Array();
					var errlist = new Array();
					var tmplist = value.replace(/(,|;|\ )/g, '\n').split('\n');
					for (var i = 0; i < tmplist.length; i++) {
						var addr = $.trim(tmplist[i]);
						if (addr != '') {
							if (validate_domain_name(addr)) {
								list.push(addr);
							} else {
								err = true;
								errlist.push(addr);
							}
						}
					}
					if (err) {
						err = lng("ntpAddressWrong") + " " + errlist.join(", ");
					} else {
						auto.child("servers").val(list.join('\n'));
					}
					return err;
				})
			]
		}), "servers");
	auto.add(new nodeCheckBox("ntpUseDhcp"),"use_dhcp");
	var manual = this.add(new node({
		hidden: true
	}), "manual")
		.child("manual")
		.add(new nodeSelect("ntpMonth"), "month")
		.add(new nodeSelect("ntpDay"), "day")
		.add(new nodeSelect("ntpYear"), "year")
		.add(new nodeSelect("ntpHour"), "hour")
		.add(new nodeSelect("ntpMinute"), "minute");
		
		
	this.listen("mode", "endform fieldchange", function(status, value){
		var detectTZ = this.getButton("ntpDetectTZ");
		if (value == 'auto') {
			auto.show();
			manual.hide();
			detectTZ.show();
		} else {
			auto.hide();
			manual.show();
			detectTZ.hide();
		}
	});
	
	this.child("manual").listen("month", "endform fieldchange", function(status, value){
		var count = new Date(new Date().getFullYear(), value, 0).getDate();
		var mday = manual.child("day").cleanOptions();
		for (var i = 1; i <= count; i++) {
			mday.addOption(i, i);
		}
	});
	
	auto.listen("use_dhcp", "endform fieldchange", function(status, value){
		var servers = auto.child("servers");
		if (value)
			servers.disable();
		else
			servers.enable();
	});
	
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageNTP.superclass.updateView.apply(this, arguments);
		var auto = this.child("auto");
		var manual = this.child("manual");
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("ntpDetectTZ")
				.getButton("ntpDetectTZ")
				.bind("click.button", callback(this, function(){
					auto.child("hour").val(new Date().getTimezoneOffset()/60);
				}));
				
                        if ( disableFlag( 65) )                        
                            this.getButton("ntpDetectTZ").children('div').addClass('disable');
			
                        this.addButton("button_save")
				.getButton("button_save")                                
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save();
					}
				}));
                        if ( disableFlag( 65) )
                            this.getButton("button_save").children('div').addClass('disable');
		}
		if (phase == "back") {
			var mode = this.child("mode").cleanOptions().addOption("ntpModeAuto", "auto").addOption("ntpModeManual", "manual");
			var ahour = auto.child("hour").cleanOptions();
			for (var tz in timezone){
				ahour.addOption(lng(tz), timezone[tz]);
			}
			var mmonth = manual.child("month").cleanOptions();
			var mday = manual.child("day").cleanOptions();
			for (var i = 1; i < 13; i++) {
				mmonth.addOption(lng("ntpMonth" + i), i);
			}
			var myear = manual.child("year").cleanOptions();
			for (var i = 2012; i < 2038; i++) {
				myear.addOption(i, i);
			}
			var mhour = manual.child("hour").cleanOptions();
			for (var i = 0; i < 24; i++) {
				mhour.addOption(i, i);
			}
			var mminute = manual.child("minute").cleanOptions();
			for (var i = 0; i < 60; i++) {
				mminute.addOption(i, i);
			}
			var date = new Date();
			
			mmonth.val(date.getMonth() + 1)
			mday.val(date.getDate());
			myear.val(date.getFullYear());
			mhour.val(date.getHours());
			mminute.val(date.getMinutes());
			
			if (this.ntp){
				auto.child("hour").val(this.ntp.hour);
				auto.child("servers").val(this.ntp.servers.join("\n"));
				this.child("mode").val((this.ntp.enable)?"auto":"manual");
				if (this.ntp.time) {
					var time = this.ntp.time;
					manual.child("month").val(time.tm_mon);
					manual.child("day").val(time.tm_mday);
					manual.child("year").val(time.tm_year);
					manual.child("hour").val(time.tm_hour);
					manual.child("minute").val(time.tm_min);
				}
				auto.child("use_dhcp").val(this.ntp.use_dhcp);
				
			}
			
			this.endForm();
			manual.endForm();
			auto.endForm();
			
		}
	}
	
	this.save = function() {
		rootView.showModalOverlay();
		var enable = (this.child("mode").val() == "auto");
		var auto = this.child("auto");
		var manual = this.child("manual");
		
		this.ntp.enable = enable;
		this.ntp.hour = (enable)?auto.child("hour").val():this.ntp.hour;
		this.ntp.servers = (enable)?auto.child("servers").val().split('\n'):this.ntp.servers;
		this.ntp.time = {};
		this.ntp.time.tm_mon = parseInt(manual.child("month").val());
		this.ntp.time.tm_mday = parseInt(manual.child("day").val());
		this.ntp.time.tm_year = parseInt(manual.child("year").val());
		this.ntp.time.tm_hour = parseInt(manual.child("hour").val());
		this.ntp.time.tm_min = parseInt(manual.child("minute").val());
		this.ntp.use_dhcp = (enable)?auto.child("use_dhcp").val():this.ntp.use_dhcp;
		device.config.write( 65, this.ntp, callback(this, function(){
			this.emit("updaterq");
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 65, callback(this, function(data){
			try{
				if (is.RPC_SUCCESS(data)) {
					this.ntp = data.resident.ntpclient;
					this.deep.updateView();
					rootView.hideModalOverlay();
				}
			}
			catch(e){
				this.deep.updateView().$box.errorBlock(lng("error"), e.message);
			}

		}));
	});

	
	
}
extend(pageNTP, node);





















function pagePasswd(defpass){
	pagePasswd.superclass.constructor.call(this);
	
	this.defpassmode = defpass;
	
	this.add(new nodeCaption("adminPassword", "passwDescText"))
		.add(new nodeSelect("passwLogin"), "login")
		.add(new nodetext("passwPassword", '', {
			password: true,
			mandatory: true,
			maxLength: 31,
			re: [
				function(value){
					return (new RegExp("[А-яЁё]+", "g").test(value))?'passwConfirmCirill':null;
				}
			]
		}), "password")
		.add(new nodetext("passwConfirm", '', {
			password: true,
			mandatory: true,
			maxLength: 31,
			re: [
				callback(this, function(value){
					return (this.child("password").val()==value)?null:'passwConfirmMismatch';
				})
			]
		}), "confirm");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pagePasswd.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, this.trysave));
		}
		if (phase == "back") {
						
			var login = this.get("login").cleanOptions();

			login.addOption('admin', 'admin');			

			if ( _.size(login.options.options) == 1 ) {
				this.replace("login", new nodestatic("passwLogin", login.val()));
			}			

			this.$box.find(':input[type=password]').bind('keypress', callback(this, function(e){
				if (e.keyCode == 13) {
					this.trysave();
					return false;
				}
			}));
		}
	}
	
	this.trysave = function(){
		this.deep.updateModel();
		if (!this.status.error) {
			this.save(this.child("login").val(), this.child("password").val());
		}
	}
	
	this.save = function(login, passwd, autologin) {	
		rootView.showModalOverlay();
		
		var needLogout = (login != getCookie("client_login") || passwd != getCookie("client_password"));		
				
		outArr = [];
		outArr = [[ 69, {
			'login': login,
			'pass': passwd
		}]];
		
		device.config.write(outArr, callback(this, function(data){					
			rootView.hideModalOverlay();
			if ( data.rq[0].status ==  52 ) {
				alert(lng('passwInvalidLogin'));
			} else {
				setCookie("client_password", passwd);
				if (is.RPC_SUCCESS(data)) {
					alert(lng('passChanged'));
				}
				if (this.defpassmode) {
					if (window.SAVEME) SAVEME.lock();
					//~ document.location.href = "index.cgi";
					location.reload(true);
					if (window.SAVEME) SAVEME.unlock();
				} else if ( needLogout ) {
					//~ document.location.href = "index.cgi";
					location.reload(true);
				}
			}
		}));
	}

	this.bind("updaterq", function(){
		this.deep.updateView();
	});
}
extend(pagePasswd, node);























function pagePing(){
	pagePing.superclass.constructor.call(this);
	
	this.updateView = function(phase){
		pagePing.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_start")
				.getButton("button_start")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (this.status && !this.status.error) {
						this.ping();
					}
				}));
			var options = {1:1,2:2,3:3,4:4,5:5};
			
			this.startForm()
				.add(new nodeDomainName("ping_host","", {
						mandatory: true,
						isip: true
					}),"pingHost")
			this.add(new nodeSelect("ping_count"), "pingCount");
			this.add(new node(), "pingLog")
				.endForm();		
			var pingCount = this.child("pingCount").cleanOptions();
			for (var i in options) {
				pingCount.addOption(i, options[i]);
			}
		}
	}
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.ping = function(){
		rootView.showModalOverlay();
		var outObj = {
			host: this.child('pingHost').val(),
			count: parseInt(this.child('pingCount').val(), 10)
		};

		window.DISABLE_NOTIFIER = true;		
		device.config.write( 18, outObj, callback(this,function(answer){
			
			if (answer.resident){
				rootView.hideModalOverlay();
				var textLog = null;
				if (answer.resident.ping)
					textLog = answer.resident.ping;
				var log = this.child("pingLog");
				log.$box.html($("\
					<div class='console syslog'>\
						<pre>" + textLog + "</pre>\
					</div>\
				"));
			}	
			device.system.save();
			window.rootCtrl.getChild('fastmenu', 'notifier').event('cancelshowalways');
			window.DISABLE_NOTIFIER = false;					
		}));
	}
	
	this.bind("fieldchange", function(status, value){
		var host = this.child('pingHost').val();
		if (status.target.getAlias()=="pingV6") {
			if (value) {
				this.child("pingHost").options.ipv6 = true;	
			} 
			else {
				this.child("pingHost").options.ipv6 = false;	
			}
			this.deep.updateModel();
			this.child('pingHost').deep.updateView();
		} 
	});
	
	this.bind("updaterq", function(){
		this.deep.updateView();
	});
}
extend(pagePing, node);




















(function(){		

	var plugin = jQuery.sub();
			
	jQuery.fn.storagePath = function(flags){
		var pluginInstance = this.data("storagePath");
		if(pluginInstance) return pluginInstance;
		pluginInstance = plugin(this);
		this.data("storagePath", pluginInstance);

		if(is.unset(flags)) flags = {};
		if(is.unset(flags.options)) flags.options = {};
	
		var $input = this.html("<div class='storage-path'><div class='field'></div><button>...</button></div>")
						.find(".field").lightUIText();

		this.data("$input", $input);

		this.find("button").click(callback(this, function(event){
			this.data("focusLock", true);
			$("body").storagePathDialog({
						title: "File browser",
						buttons: [
							{name: "Open", handler: callback(this, function(){
								var $input = this.data("$input");
								var $dialog = $("body").storagePathDialog();
								var path = $dialog.content().fileBrowser().getSelectedPath();
								$input.fieldval(path.slice(5));
								$dialog.close();
								this.data("focusLock", false);
							})},
							{name: "Cancel", handler: callback(this, function(){
								$("body").storagePathDialog().close();
								this.data("focusLock", false);
							})}
						]
					})
					.open();
			$("body").storagePathDialog()
					.content()
					.fileBrowser({onlyFolders: true});
		}));
		
		
		$input.bind("unfocus.input", function(event){
			event.stopImmediatePropagation();
		});
		
		function checkUnfocus(event){
			var $target = $(event.target);
			var storagePath = event.data.storagePath;
			if(!storagePath.data("focusLock") && !$target.closest(".storage-path").length){
				storagePath.trigger("unfocus.input");
			}
		}
		
		$(document).unbind("click", checkUnfocus)
					.bind("click", {storagePath: pluginInstance}, checkUnfocus);
		
		plugin.fn.extend({
			validate: $input.validate,
			fieldval: $input.fieldval,
			isEmpty: $input.isEmpty,
			enable: $input.enable,
			disable: $input.disable,
			isDisabled: $input.isDisabled,
			flags: $input.flags,
			clean: $input.clean,
			show: $input.show,
			__show__: this.show
		})

		return pluginInstance;
	};

})();




















(function(){

	var plugin = jQuery.sub();

	jQuery.fn.storagePathDialog = function(flags){

		if(is.unset(flags)) flags = {};
		if(is.unset(flags.options)) flags.options = {};
	
		plugin.fn.extend({
			open: function(){
				var $overlay = $("body").lightUIOverlay()
						.show()
						.append("<div class='storage-path-dialog'>\
									<div class='header'></div>\
									<div class='content'></div>\
									<div class='footer'></div>\
								</div>");
								
				$("body").data("$overlay", $overlay);
				
				$(".storage-path-dialog").css({
							left: ($(window).width() - 640)/2,
							top: ($(window).height() - 480)/2
						});
						
				var buttons = flags.buttons;
				if(buttons){
					var $buttonBox = $(".storage-path-dialog>.footer");
					var obj;
					for(var i=0; i<buttons.length; i++){
						obj = buttons[i];
						$("<button langkey='" + obj.name + "'>" + lng(obj.name) + "</button>")
							.click(obj.handler)
							.appendTo($buttonBox);
					}
				}
				
				var title = flags.title;
				if(title){
					$(".storage-path-dialog>.header").html(title);
				}
		
				return this;
			},
			close: function(){
				$(".storage-path-dialog").remove();
				$("body").lightUIOverlay().hide();
				return this;
			},
			content: function(){
				return $(".storage-path-dialog>.content");
			}
		});
		
		pluginInstance = plugin(this);
		this.data("storagePathDialog", pluginInstance);
		return pluginInstance;
	};

})();






















 
function jsPopupmenuModel(itemState){
	jsPopupmenuModel.superclass.constructor.call(this);
	
	this.itemName = (itemState)?itemState.name:'';		// Отображаемый текст
	this.itemImage = null;								// Иконка (отображается слева)
	this.itemType = null;								// Тип пункта меню (null, 'check' или 'radio')
	this.itemIndex = 0;									// Если индекс групп принадлежности для itemType == 'radio'
	this.itemSelected = false;							// Установлен ли флажок (для itemType == 'radio' и itemType == 'check')
	this.itemDisabled = false;							// Доступность пункта меню
	
	if (itemState == null) return;
	
	if (itemState.img) {
		this.itemImage = itemState.img;
	}	
	if (itemState.type) {
		this.itemType = (itemState.type == 'radio')?'radio':'check';
	}
	if (itemState.index) {
		this.itemIndex = itemState.index;
	}
	if (itemState.selected) {
		this.itemSelected = itemState.selected;
	}
	if (itemState.disabled) {
		this.itemDisabled = itemState.disabled;
	}
}
extend(jsPopupmenuModel, jsModel);


function jsPopupmenuController(itemState, options){
	jsPopupmenuController.superclass.constructor.call(this);

	this.changeModel(new jsPopupmenuModel(itemState));	
	this.ifaceTypes.tree = {type: jsPopupmenuView, def:true, options: {style:null,open:true,noPath:true}};
	
	this.integrate = function(childInx, parent){
		jsPopupmenuController.superclass.integrate.call(this, childInx, parent);
	}
	
	if (options) {
		this.frame = options.frame;
		this.popupmenuCtrl = options.target
		this.rootItem = this;
	}
}
extend(jsPopupmenuController, jsController);

 
function jsPopupmenuView(ctrl, viewInx, options){
	jsPopupmenuView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/*
	 * Обработчик клика по пункту меню
	 * */
	this.click = function(e) {
		if (this.ctrl.model.itemDisabled) return false;
		var info = this.ctrl.model;
		var isNeedHide = true;
		var rootItem = this.ctrl.rootItem;
		if (info.itemType) {
			if (info.itemType == 'check') {
				info.itemSelected = !info.itemSelected;
				var state = (info.itemSelected)?'full':'empty';
				$(this.viewBoxSel + '>img').attr('src', '../image/checkbox_' + state + '.png');
			} else {
				if (!info.itemSelected) {
					var items = this.ctrl.getParent().children;
					for (var i in items) { 
						if (items[i].model.itemType == 'radio' && items[i].model.itemIndex == info.itemIndex) {
							items[i].model.itemSelected = false;
						}
					}
					info.itemSelected = true;
					$(this.viewBoxSel).parent().find('img.index_' + info.itemIndex).attr('src', '../image/radiobtn_empty.png');
					$(this.viewBoxSel + '>img').attr('src', '../image/radiobtn_full.png');
				}
			}
			isNeedHide = false;
		}
		rootItem.frame.event("clickpopupmenu", { item: this, target: rootItem.target});
		if (isNeedHide) {
			$('body').click();
		}
		return false;
	}
	
	this.showPopupmenu = function(e) {
		var popupmenu = $(this.viewBoxSel + '>ul.popupmenu');
		if ($(popupmenu).is(':visible')) {
			$(popupmenu).find('ul.popupmenu').hide();
			$(popupmenu).hide();
			this.ctrl.frame.event("hidepopupmenu", this.ctrl.rootItem.target);
		}
		this.ctrl.rootItem.target = e.target;
		this.findSubmenu($(popupmenu));
		var topOffset = $(popupmenu).parent().offset().top - $(popupmenu).parent().position().top;
		var leftOffset = $(popupmenu).parent().offset().left - $(popupmenu).parent().position().left;
		$(popupmenu).css({
			'left': (e.pageX-leftOffset) + 'px',
			'top': (e.pageY-topOffset) + 'px'
		});
		$(popupmenu).fadeIn("slow");
		this.ctrl.frame.event("showpopupmenu", e.target);
		return false;
	}
	
	this.hidePopupmenu = function(e) {
		var popupmenu = $(this.viewBoxSel + '>ul.popupmenu');
		$(popupmenu).find('ul.popupmenu').hide();
		this.ctrl.frame.event("hidepopupmenu", this.ctrl.rootItem.target);
		$(popupmenu).fadeOut("fast");
	}
	
	/*
	 * Поиск подменю, для настройки его последующего отображения
	 * */
	this.findSubmenu = function(popupmenu) {
		var findSubmenu = this.findSubmenu;
		$(popupmenu).find('>li>ul.popupmenu').each(function(index){
			var item = $(this).parent();
			var submenu = $(this);
			
			$(item).mouseenter(function(){
				if ($(this).find('>a').hasClass('disabled')) return true;
				$(submenu).css({
					'left': ($(this).width() + parseInt($(this).css('padding-left')) + parseInt($(this).css('padding-right'))).toString() + 'px',
					'top': ($(this).offset().top - $(this).parent().offset().top).toString() + 'px'
				});
				findSubmenu($(submenu));
				$(this).parent().find('ul.popupmenu').hide();
				$(submenu).show('fast');
			});
			$(item).mouseleave(function(){
				if ($(this).find('>a').hasClass('disabled')) return true;
				$(submenu).find('ul.popupmenu').hide();
				$(submenu).hide();
			});
		});
	}
	
	/*
	 * Переопределение drawView
	 * */
	jsPopupmenuView.prototype.drawView = function(){
		if(!this.ctrl.rootItem) this.ctrl.rootItem = this.getParent().ctrl.rootItem;
		jsPopupmenuView.superclass.drawView.call(this);
		$(this.myBoxSel).html(lng(this.ctrl.model.itemName));
		if (!this.ctrl.root) {
			var info = this.ctrl.model;
			$(this.viewBoxSel).parent().addClass('popupmenu').css('z-index', 999999);
			if (info.itemName != '-') { // Рисуем обычный пункт меню
				$(this.viewBoxSel).addClass('item');
				var img = $("<img width='16px' height='16px' src='' />").css({
					'display': 'inline-block'
				});
				if (info.itemImage) {
					$(img).attr('src', info.itemImage);
				}
				if (info.itemType) {
					var type = (info.itemType == 'check')?'checkbox':'radiobtn';
					var state = (info.itemSelected)?'full':'empty';
					$(img).attr('src', '../image/' + type + '_' + state + '.png');
					$(img).addClass('index_' + info.itemIndex);
				}
				$(this.viewBoxSel).prepend(img);
				if (!info.itemDisabled) {
					$(this.viewBoxSel).bind('click', context(this).callback(this.click));
					/*$(this.viewBoxSel+'>a').bind('click', function(){
						$(this).parent().click();
					});*/
				} else {
					$(this.viewBoxSel+'>img').css('opacity', 0.3);
					$(this.viewBoxSel+'>a').addClass('disabled');
				}
			} else { // Рисуем сепаратор
				$(this.viewBoxSel).addClass('separator');
				$(this.viewBoxSel).html('');
			}
		} else {
			var popupmenuCtrl = this.ctrl.popupmenuCtrl;
			for (var i in popupmenuCtrl.views) {
				$(popupmenuCtrl.views[i].viewBoxSel).bind("contextmenu", context(this).callback(this.showPopupmenu));
			}
			$('body').bind('click', context(this).callback(this.hidePopupmenu));
			$('html').bind('click', context(this).callback(this.hidePopupmenu));
		}
	}
	
	this.disable = function() {
		this.ctrl.model.itemDisabled = true;
		this.drawView();
		//$(this.viewBoxSel).unbind('click');
	}
	
	this.enable = function() {
		this.ctrl.model.itemDisabled = false;
		this.drawView();
		//$(this.viewBoxSel).bind('click', context(this).callback(this.click));
	}

	/*
	 * Активации пункта меню
	 * */
	jsPopupmenuView.prototype.onactivate = function(){
		//jsPopupmenuView.superclass.onactivate.call(this);
		return false; // прервать всплытие события
	}
	
	/*
	 * Деактивации пункта меню
	 * */
	jsPopupmenuView.prototype.ondeactivate = function(){
		//jsPopupmenuView.superclass.ondeactivate.call(this);
		return false; // прервать всплытие события
	}

	this.bind("activate", this.onactivate);
	this.bind("deactivate", this.ondeactivate);
}
extend(jsPopupmenuView, jsViewTree);





















 
 /**Создаёт новый экземпляр класса jsPPPSettingsModel.
 * @class			модель информации о настройках ppp.
 * @constructor
 */
function jsPPPSettingsModel(service) {
	jsPPPSettingsModel.superclass.constructor.call(this);
	
	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;

}
extend(jsPPPSettingsModel, jsModel);


function jsPPPSettingsController(service, isadding) {
	jsPPPSettingsController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsPPPSettingsClientView, def:true};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsPPPSettingsSummaryView};
	this.ifaceTypes.summary.options = {};

	this.changeModel(new jsPPPSettingsModel(service));
	
	this.addChild(new jsDecorController(), "desc");
	this.addChild(new jsInputController(service.auto), "auto");
	this.addChild(new jsInputController(service.username), "userName");
	this.addChild(new jsInputController(service.noauth), "noAuth");
	this.addChild(new jsInputController("dlink"), "password");
	this.addChild(new jsInputController("dlink"), "confirm");
	this.addChild(new jsInputController(service.apn), "apn");
	this.addChild(new jsInputController(service.dial_num?service.dial_num.replace(/\^/g, "#"):service.dial_num), "dialNumber");
	this.addChild(new jsInputController(service.servicename), "serviceName");
	
	//Запихиваем основную часть настроек под слайдер
	var advanced = this.addChild(new jsFieldSetController(), "advanced");
	advanced.addChild(new jsInputController(service.servicename), "serviceNamePPPoE");
	advanced.addChild(new jsInputController(service.encrypt), "encrypt");
	advanced.addChild(new jsInputController(service.auth), "auth");
	advanced.addChild(new jsInputController(service.mtu), "mtu");
	advanced.addChild(new jsInputController((service.keep_alive && service.keep_alive.interval)?true:false), "keepAlive");
	advanced.addChild(new jsInputController(service.keep_alive?service.keep_alive.interval:30), "lcpInterval");
	advanced.addChild(new jsInputController(service.keep_alive?service.keep_alive.fails:3), "lcpFails");
	advanced.addChild(new jsInputController(service.extra_options?service.extra_options:""), "extraOptions");
	advanced.addChild(new jsInputController((service.ondemand>0)?true:false), "onDemand");
	advanced.addChild(new jsInputController(service.ondemand), "idleTimeout");
	advanced.addChild(new jsInputController(service.ppp_ip_ext), "pppIpExt");
	advanced.addChild(new jsIPv4Controller(service.static_ip), "pppStaticIp");
	advanced.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns");
	advanced.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns");
	advanced.addChild(new jsInputController(service.ppp_debug), "pppDebug");
	advanced.addChild(new jsInputController(service.ip), "ip");
}
extend(jsPPPSettingsController, jsFieldSetController);


function jsPPPSettingsClientView(ctrl, viewInx, options) {
	var obj;
	var opt;
	var contype = ctrl.model.service.contype;
	var ifnode = ctrl.model.ifnode;
	var service = ctrl.model.service;
	var tree = ctrl.model.iftree;					
	var level = ctrl.model.service.level;
	var dnsFromDhcp;
	
	obj = ctrl.getChild("desc");
	obj.nextIface = "separator";
	obj.ifaceTypes.separator.options = {
		label: "PPP"
	};
	if(level == 4){
		obj.ifaceTypes.separator.options.label = "VPN";
	}
	obj.ifaceTypes.separator.options.hide = service.blocks;

	obj = ctrl.getChild("auto");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanPPTPAuto",
		valset: {on:true, off:false}
	};
	obj.ifaceTypes.checkbox.options.hide = (level == 3) || service.blocks;
	
	var advanced = ctrl.getChild("advanced");
	advanced.nextIface = "client";
	
	obj = ctrl.getChild("serviceName");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanPPTPSName",
		mandatory: true
	}
	obj.ifaceTypes.input.options.hide = (level == 3) || service.blocks;
		
	obj = ctrl.getChild("userName");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanUserName",
		mandatory: true
	};
	
	obj = ctrl.getChild("noAuth");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanNoAuth",
		valset: {on:true, off:false}
	};
	var noauth = obj.model.value;

	obj = ctrl.getChild("password");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		password: true,
		humanName: "wanPassword",
		mandatory: true
	};
	obj.ifaceTypes.input.options.disabled = noauth;

	obj = ctrl.getChild("confirm");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		password: true,
		humanName: "wanConfirm",
		mandatory: true
	};
	obj.ifaceTypes.input.options.disabled = noauth;

	obj = advanced.getChild("serviceNamePPPoE");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanPPPoESName"
	};
	obj.ifaceTypes.input.options.hide = (contype != "pppoe" && contype != "pppoev6" && contype != "pppoedual" && contype != "dynpppoe" && contype != "statpppoe" ) || service.blocks;

	obj = ctrl.getChild("apn");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanApn",
		optional: true
	};
	obj.ifaceTypes.input.options.hide = (contype != "3g") || service.blocks;

	obj = ctrl.getChild("dialNumber");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanDialNumber",
		mandatory: true
	};
	obj.ifaceTypes.input.options.hide = (contype != "3g") || service.blocks;
	
	obj = advanced.getChild("encrypt");
	obj.nextIface = "select";
	obj.ifaceTypes.select.options = {
		humanName: "pptp_encr",
		valset: {no_encrypt:"0",mppe_40_128:"1",mppe_40:"2",mppe_128:"3"}
	};
	obj.ifaceTypes.select.options.hide = (level == 3) || service.blocks;
	
	obj = advanced.getChild("auth");
	obj.nextIface = "select";
	obj.ifaceTypes.select.options = {
		humanName: "wanAuth",
		valset: {AUTO:"0", PAP:"1", CHAP:"2", "MS-CHAP":"3", "MS-CHAP-V2":"4"}
	};
	obj.ifaceTypes.select.options.hide = service.blocks;

	obj = advanced.getChild("mtu");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanMtu",
		minval: 0
	};
	obj.ifaceTypes.number.options.hide = service.blocks;
	
	obj = advanced.getChild("keepAlive");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanKeepAlive",
		valset: {on:true, off:false}
	};
	var keepAlive = obj.model.value;
	obj.ifaceTypes.checkbox.options.hide = service.blocks;

	obj = advanced.getChild("lcpInterval");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanLcpInterval",
		minval: 0
	};
	obj.ifaceTypes.number.options.hide = !keepAlive || service.blocks;

	obj = advanced.getChild("lcpFails");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanLcpFails",
		minval: 0,
		maxval: 255
	};
	obj.ifaceTypes.number.options.hide = !keepAlive || service.blocks;
	
	obj = advanced.getChild("extraOptions");
	obj.nextIface = "input";
	obj.ifaceTypes.input.options = {
		humanName: "wanExtraOptions"
	};
	obj.ifaceTypes.input.options.hide = (contype != "3g" && (level == 3)) || service.blocks;
	
	obj = advanced.getChild("onDemand");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanOnDemand",
		valset: {on:true, off:false}
	};
	obj.ifaceTypes.checkbox.options.hide = service.blocks;
	var ondemand = obj.model.value;

	obj = advanced.getChild("idleTimeout");
	obj.nextIface = "number";
	obj.ifaceTypes.number.options = {
		humanName: "wanIdleTimeout",
		minval: 0
	};
	obj.ifaceTypes.number.options.hide = !ondemand || service.blocks;
	
	obj = advanced.getChild("pppIpExt");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanPppIpExt",
		valset: {on:true, off:false}
	};
	obj.ifaceTypes.checkbox.options.hide = (contype == "3g" || (level == 4)) || service.blocks;
	
	obj = advanced.getChild("pppStaticIp");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanPppStaticIp";
	opt.optional = true;
	opt.hide = service.type == "pppv6" || service.contype == "3g"
	opt.hide |= service.blocks;
	
	obj = advanced.getChild("primaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanPrimDns";
	opt.optional = true;
	opt.hide = true;


	obj = advanced.getChild("secondaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanSecDns";
	opt.optional = true;
	opt.hide = true;

	
	obj = advanced.getChild("pppDebug");
	obj.nextIface = "checkbox";
	obj.ifaceTypes.checkbox.options = {
		humanName: "wanPppDebug",
		valset: {on:true, off:false}
	};
	obj.ifaceTypes.checkbox.options.hide = service.blocks;
	obj = advanced.getChild("ip");
	obj.nextIface = "text";
	obj.ifaceTypes.text.options = {
		humanName: "wanPPTPIp"
	}
	opt = obj.ifaceTypes.text.options;
	opt.hide = (level == 3) || service.blocks;
	
	/* Обработка событий чекбоксов */
	jsPPPSettingsClientView.prototype.onfieldchange = function(obj) {
		var alias = obj.view.ctrl.alias;
		var advanced = this.getChild("advanced");
		var blocks = this.ctrl.model.service.blocks;

		switch (alias) {
			case "dnsFromDhcp":				
				if(obj.value){
					advanced.getChild("pppStaticPrimDnsv6").disable();	
					advanced.getChild("pppStaticSecDnsv6").disable();
				}
				else{
					advanced.getChild("pppStaticPrimDnsv6").enable();	
					advanced.getChild("pppStaticSecDnsv6").enable();
				}
			break;
			case "noAuth":
				if(obj.value){
					this.getChild("password").disable();
					this.getChild("confirm").disable();
					this.getChild("userName").clearMandatory();
				}
				else{
					this.getChild("password").enable();
					this.getChild("confirm").enable();
					this.getChild("userName").setMandatory();
				}
				this.getChild("noAuth").updateModel();
				break;
			case "onDemand":
				if(obj.value){
					if(blocks){

					}
					else{						
						advanced.getChild("idleTimeout").show();
					}
				}
				else{
					advanced.getChild("idleTimeout").hide();
				}
				advanced.getChild("onDemand").updateModel();
				break;
			case "keepAlive":
				if(obj.value){
					if(blocks){

					}
					else{
						advanced.getChild("lcpInterval").show();
						advanced.getChild("lcpFails").show();
					}
				}
				else{
					advanced.getChild("lcpInterval").hide();
					advanced.getChild("lcpFails").hide();
				}
				advanced.getChild("keepAlive").updateModel();
				break;
				case "type":
					switch(obj.value){
						case "3g":
							this.getChild("apn").show();
							this.getChild("dialNumber").show();
						break;
						case "pppoe":
						case "pppoa":
							this.getChild("apn").hide();
							this.getChild("dialNumber").hide();
						break;
					}
				break;
				case "slaac":
				break;
		}
	}
	
	/**Обновить модель*/
	this.updateModel = function(){
		/* ---------- Для валидирования ---------- */
		var conf = this.getChild("confirm");
		var passw = this.getChild("password");
		var user = this.getChild("userName");
		var password;
		var confirm_;
		var noauth;
		var apn = this.getChild("apn");
		var dialNumber = this.getChild("dialNumber");
		var advanced = this.getChild("advanced");
		var serviceName = this.getChild("serviceName");
		
		conf.statusCode = null;
		passw.statusCode = null;
		user.statusCode = null;
		apn.statusCode = null;
		dialNumber.statusCode = null;
		serviceName.statusCode = null;

		serviceName.setError();
		
		if(!passw.ctrl.modified){
			passw.ctrl.model.value = this.ctrl.model.service.password;
			conf.ctrl.model.value = this.ctrl.model.service.password;
			passw.updateView();
			conf.updateView();
		}
		var res = jsPPPSettingsClientView.superclass.updateModel.call(this);
		if (res) {			
			// ---------- Валидируем ---------- 
			noauth = this.getChild("noAuth").ctrl.model.value;
			if(noauth) {
				passw.ctrl.model.value = "";
				conf.ctrl.model.value = "";
			}
			else {
				password = passw.ctrl.model.value;
				if (user.ctrl.model.value == "") {
					user.statusCode = "wanUserNameEmpty";
					res = false;
				}
				if(password != ""){
					confirm_ = conf.ctrl.model.value;
					if(confirm_ != password){
						conf.statusCode = "wanConfirmMismatch";
						res = false;
					}
				}
				else{
					passw.statusCode = "wanPasswordEmpty";
					res = false;
				}
			}
			
			conf.setError();
			passw.setError();
			user.setError();
			
			if (this.ctrl.model.service.contype == "3g") {
				if(dialNumber.ctrl.model.toString() == "") {
					dialNumber.statusCode = "wanDialNumberEmpty";
					dialNumber.setError();
					res = false;
				}
			}
			if(res){
				var service = this.ctrl.model.service;
				service.auto = this.getChild("auto").ctrl.model.value;
				service.noauth = noauth;
				service.username = this.getChild("userName").ctrl.model.toString();
				service.password = this.getChild("password").ctrl.model.toString();
				service.encrypt = advanced.getChild("encrypt").ctrl.model.toString();
				service.auth = advanced.getChild("auth").ctrl.model.value;
				if(service.level == 3){
					service.servicename = advanced.getChild("serviceNamePPPoE").ctrl.model.toString();
				}
				else{
					if(validate_host(serviceName.ctrl.model.value)){
						service.servicename = this.getChild("serviceName").ctrl.model.toString();
					}
					else{
						serviceName.statusCode = "netAddrOrDomainInvalid";
						serviceName.setError();
						res = false;
					}
				}
				service.apn = this.getChild("apn").ctrl.model.toString();
				service.dial_num = this.getChild("dialNumber").ctrl.model.toString().replace(/#/g, "^");
				if(advanced.getChild("onDemand").ctrl.model.value){
					service.ondemand = advanced.getChild("idleTimeout").ctrl.model.toString();
				}
				else if(!no(service.ondemand)){
					delete service.ondemand;
				}
				service.mtu = advanced.getChild("mtu").ctrl.model.value;
				service.ppp_ip_ext = advanced.getChild("pppIpExt").ctrl.model.value;
				if(advanced.getChild("keepAlive").ctrl.model.value){
					service.keep_alive = {
						interval: advanced.getChild("lcpInterval").ctrl.model.value,
						fails: advanced.getChild("lcpFails").ctrl.model.value
					}
				}
				else{
					service.keep_alive = null;
				}
				service.extra_options = advanced.getChild("extraOptions").ctrl.model.toString();
				service.static_ip = advanced.getChild("pppStaticIp").ctrl.model.toString();
				service.dns_prim = advanced.getChild("primaryDns").ctrl.model.toString();
				service.dns_sec = advanced.getChild("secondaryDns").ctrl.model.toString();
				service.ppp_debug = advanced.getChild("pppDebug").ctrl.model.value;
			}

		}
		else{
			passw.ctrl.model.value = "";
			conf.ctrl.model.value = "";
			passw.updateView();
			conf.updateView();
		}
		return res;
	}

	
	this.drawView = function(){
		jsPPPSettingsClientView.superclass.drawView.call(this);
		this.onmodeswitch();
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.getChild("auto").hide();
			this.getChild("noAuth").hide();
			this.getChild("advanced").hide();
			this.getChild("desc").hide();
		}
		else{
			//подробно
			if(this.ctrl.model.service.level == 4){
				this.getChild("auto").show();
			}
			this.getChild("noAuth").show();
			this.getChild("advanced").show();
			this.getChild("desc").show();
		}
		return false;
	}

	jsPPPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("fieldchange", this.onfieldchange);
	this.bind("modeswitch", this.onmodeswitch);
}
extend(jsPPPSettingsClientView, jsFieldSetClientView);



function jsPPPSettingsSummaryView(ctrl, viewInx, options){
	jsPPPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Обработка событий чекбоксов */
	this.onfieldchange = function(obj) {
		jsPPPSettingsSummaryView.superclass.onfieldchange.call(this, obj);
		var alias = obj.view.ctrl.alias;
		
		switch (alias) {
			case "noAuth":
				if(obj.value){
					this.getChild("password").hide();
					this.getChild("confirm").hide();
				}
				else{
					this.getChild("password").show();
					this.getChild("confirm").show();
				}
				break;
			}
	}

	/**Отрисовка представления.
	 * Всё сводится к тому, чтобы скрыть ненужное в режиме сводки.
	 */
	this.drawView = function(){
		var advanced = this.getChild("advanced");
		advanced.options.slider = false;
		//Скрываем второстепенные поля. Большиство из них будут показаны только если пользователь внёс в них изменения.
		this.getChild("password").options.hide = true;
		this.getChild("confirm").options.hide = true;
		advanced.getChild("auth").options.hide = true;
		advanced.getChild("onDemand").options.hide = true;
		this.getChild("serviceName").options.hide = true;
		this.getChild("auto").options.hide = true;
		advanced.getChild("encrypt").options.hide = true;
		advanced.getChild("mtu").options.hide = true;
		advanced.getChild("pppIpExt").options.hide = true;
		advanced.getChild("keepAlive").options.hide = true;
		advanced.getChild("extraOptions").options.hide = true;;
		advanced.getChild("ip").options.hide = true;
		advanced.getChild("pppStaticIp").options.hide = true;
		advanced.getChild("pppDebug").options.hide = true;
		advanced.getChild("serviceNamePPPoE").options.hide = true;

		jsPPPSettingsSummaryView.superclass.drawView.call(this);
	}

	/**Обновить представление.
	 * Всё сводится к тому, чтобы скрыть ненужное в режиме сводки.
	 */
	this.updateView = function(){
		jsPPPSettingsSummaryView.superclass.updateView.call(this);

		var advanced = this.getChild("advanced");
		var service = this.ctrl.model.service;

		var auto = this.getChild("auto");
		if(auto.ctrl.modified) auto.show();

		var encrypt = advanced.getChild("encrypt");
		if(encrypt.ctrl.modified) encrypt.show();
		
		var auth = advanced.getChild("auth");
		if(auth.ctrl.modified) auth.show();

		var onDemand = advanced.getChild("onDemand");
		if(service.ondemand > 0 || onDemand.ctrl.modified){
			onDemand.show();
		}

		var mtu = advanced.getChild("mtu");
		if(mtu.ctrl.modified) mtu.show();

		var pppIpExt = advanced.getChild("pppIpExt");
		if(pppIpExt.ctrl.modified) pppIpExt.show();

		var keepAlive = advanced.getChild("keepAlive");
		if((service.keep_alive && service.keep_alive.interval > 0) || keepAlive.ctrl.modified){
			keepAlive.show();
		}

		var extraOptions = advanced.getChild("extraOptions");
		if(extraOptions.ctrl.modified) extraOptions.show();

		var pppStaticIp = advanced.getChild("pppStaticIp");
		if(pppStaticIp.ctrl.modified) pppStaticIp.show();
		var pppDebug = advanced.getChild("pppDebug");
		if(pppDebug.ctrl.modified) pppDebug.show();
		var serviceNamePPPoE = advanced.getChild("serviceNamePPPoE");
		if(serviceNamePPPoE.ctrl.modified) serviceNamePPPoE.show();
	}
	
	this.bind("fieldchange", this.onfieldchange);
	this.bind("modeswitch", function(){return false;});
}
extend(jsPPPSettingsSummaryView, jsPPPSettingsClientView);





















function jsPreMasterModel(iftree){
	jsPreMasterModel.superclass.constructor.call(this);
	
	this.iftree = iftree;
}
extend(jsPreMasterModel, jsModel);

function jsPreMasterController(){
	jsPreMasterController.superclass.constructor.call(this);

	this.changeModel(new jsPreMasterModel());


	
	this.ifaceTypes.client = {type: jsPreMasterClientView};
	this.ifaceTypes.client.options = {};
	
	this.ifaceTypes.server = {type: jsPreMasterServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};

	this.nextIface = "server";
	this.addIface();

	this.ondataready = function(){
		//Проставить ifname, т.к. это надо для работы
		var services;
		var tunnels;
		var iftree = this.model.iftree;
		for(var i in iftree){
			iftree[i].ifname = i;
			services = iftree[i].services;
			if(services){
				for(var j in services){
					services[j].ifname = j;
					tunnels = services[j].tunnels;
					if(tunnels){
						for(var k in tunnels){
							tunnels[k].ifname = k;
						}
					}
				}
			}
		}
		var mainTab = this.addChild(new jsConnsMainTabController(this.model.iftree, null, null, null, this.model.lanClients, null, this.model.routes, this.model.deviceInfo.factory_wan_mac), "mainTab");
		mainTab.model.lanClients = this.model.lanClients;
		mainTab.model.jsonIGMP = this.model.jsonIGMP;
		mainTab.model.deviceInfo = this.model.deviceInfo;
		return false;
	}
	
	this.onedit = function(obj){
		var mainTab = this.changeChild(this.getChild("mainTab").thisInx, new jsConnsMainTabController(this.model.iftree, obj.ifname, obj.srvname, obj.tnlname, this.model.lanClients, null, this.model.routes), "mainTab");
		return false;
	}
	
	this.onmodeswitch = function(value){
		this.getChild("mainTab").event("modeswitch", value);
		return false;
	}
	
	this.addEventHandler("dataready", this.ondataready);
	this.addEventHandler("edit", this.onedit);
	this.addEventHandler("modeswitch", this.onmodeswitch);
}
extend(jsPreMasterController, jsFieldSetController);

function jsPreMasterClientView(ctrl, viewInx, options){
	jsPreMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.options.nothing = true;	
	
	this.ondataready = function(){
		this.constructor(this.ctrl, this.viewInx, this.options?this.options:{});
		this.drawView();
		return false;
	}

	this.drawView = function(){
		jsPreMasterClientView.superclass.drawView.call(this);
	}
	
	this.bind("dataready", this.ondataready);
	this.bind("edit", this.ondataready);

}
extend(jsPreMasterClientView, jsFieldSetClientView);

function jsPreMasterServerView(ctrl, viewInx, options){
	jsPreMasterServerView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		var data = this.options.sender.responseData;
		if(this.mode == "update"){
			this.ctrl.model.iftree = {};
			if(data){
				if(!data.baddata  && data.rq){
					if(data.rq[0] && data.rq[0].resident && data.rq[0].resident.iface_names){
						this.ctrl.model.iftree = data.rq[0].resident.iface_names;
						if(!this.ctrl.model.iftree) this.ctrl.model.iftree = {};
					}
					var n = 1;
					if(data.rq[n] && data.rq[n].resident) {
						this.ctrl.model.lanClients = data.rq[n].resident;
					}
					n++;
					if(data.rq[n] && data.rq[n].resident && data.rq[n].resident.route) {
						this.ctrl.model.routes = data.rq[n].resident.route;
					}
					n++;

					if(data.rq[n] && data.rq[n].resident) {
						this.ctrl.model.jsonIGMP = data.rq[n].resident;
					}
					n++;

					if(data.rq[n] && data.rq[n].resident) {
						this.ctrl.model.deviceInfo = data.rq[n].resident;
					}
					n++;
				}
			}
	
			this.ctrl.model.iftree.wizard = true;	//Признак настройки соединения в режиме мастера
			this.ctrl.event("dataready");
		}
		else if(this.mode == "checkcable"){
			var isConnect;
			isConnect = false;
			if (data.status == 20 && data.resident) {
				var port;
				var obj;
				var ifnode;
				for (var p in data.resident){
					port = p;
					obj = data.resident[p];
					ifnode = this.ctrl.model.iftree[obj.iface];
					if(obj.is_wan || (ifnode && ifnode.is_wan)){
						break;
					}
				}
				if (!no(data.resident[port].status)) {
					isConnect = data.resident[port].status;
				} else {
					isConnect = data.resident[port];
				}
			}
			this.ctrl.getChild("mainTab").event('cableready', isConnect);
		}
		else{
			delete this.ctrl.getChild("mainTab", "general").model.ifnode.needDelete;
			this.ctrl.getChild("mainTab").event('savecomplete');
		}
		
	}
	
	this.prepareData = function(){
		var obj;
		var delim = "|";
		var ctrl = this.ctrl;
		var needDelete = [];

		switch(this.mode){
			case "add":
			case "save":
				var general = ctrl.getChild("mainTab", "general");
				var model = general.model;
				var contype = general.model.ifnode.contype;
				
				obj = {v2: "y", rq: 0};

				var res_pos;
				if(this.mode == "add"){
					res_pos = -1;
				}
				else{
					res_pos = 0;
				}
				
				if(this.needDelete || model.ifnode.needDelete){
					obj.rq++;
					obj.res_config_id0 =  1;
					obj.res_config_action0 =  2,
					obj.res_json0 = "y";
					obj.res_data_type0 = "json";
					obj.res_struct_size0 = 1;
					
					if(model.ifnode.needDelete instanceof Array){
						for(var i in model.ifnode.needDelete){
							needDelete.push(model.ifnode.needDelete[i]);
						}
					}
					if(this.needDelete instanceof Array){
						for(var i in this.needDelete){
							needDelete.push(this.needDelete[i]);
						}
					}
					
					obj.res_buf0 = $.toJSON(needDelete);
				}
				
				if(contype == "statpppoe" || contype == "dynpppoe"){
					var blankConn1 = $.extend(true, {}, model.blankConn);
					var ifnode1 = getObjectFirstChild(blankConn1);
					var service1 = getObjectFirstChild(ifnode1.services);
					delete service1.tunnels;
					var service2 = $.extend(true, {}, getObjectFirstChild(model.service.tunnels));
					var srvname2 = getObjectFirstKey(model.service.tunnels);
					var blankConn2 = $.extend(true, {}, model.blankConn);
					var services = getObjectFirstChild(blankConn2).services = {};
					services[srvname2] = service2;

					var jsonOutStr = $.toJSON(blankConn1);
					jsonOutStr = jsonOutStr.replace(/%/g,"%25");
					jsonOutStr = jsonOutStr.replace(/#/g,"%23");
				}
				else{
					var jsonOutStr = $.toJSON(model.blankConn);
					jsonOutStr = jsonOutStr.replace(/%/g,"%25");
					jsonOutStr = jsonOutStr.replace(/#/g,"%23");
				}


				obj["res_config_id" + obj.rq] =  1;
				obj["res_config_action" + obj.rq] =  3;
				obj["res_json" + obj.rq] = "y";
				obj["res_struct_size" + obj.rq] = 1;
				obj["res_buf" + obj.rq] = jsonOutStr;
				obj["res_pos" + obj.rq] = res_pos;

				obj.rq++;
				
				if(is.object(blankConn2)){
					obj["res_config_id" + obj.rq] = 1;
					obj["res_config_action" + obj.rq] = 3;
					obj["res_json" + obj.rq] = "y";
					obj["res_data_type" + obj.rq] = "json";
					obj["res_struct_size" + obj.rq] = 36;
					obj["res_pos" + obj.rq] = res_pos;
	
					var res_buf = $.toJSON(blankConn2);
					res_buf = res_buf.replace(/%/g,"%25");
					res_buf = res_buf.replace(/#/g,"%23");
					res_buf = res_buf.replace(/&/g,"%26");
	
					obj["res_buf" + obj.rq] = res_buf;
	
					obj.rq++;
				}

				if(contype == "statpptp" 
					|| contype == "statl2tp"
					|| contype == "statpppoe"
					|| contype == "statpptpv6"
					|| contype == "statl2tpv6"){
					var newRoutes = ctrl.getChild("mainTab", "other", "routing").newRoutes;
					var j = obj.rq;
					for(var i in newRoutes){
						if(newRoutes[i].ip){
							obj["res_config_id" + j] =  17;
							obj["res_config_action" + j] =  3;
							obj["res_json" + j] = "y";
							obj["res_data_type" + j] = "json";
							obj["res_struct_size" + j] = 1;
							obj["res_buf" + j] = $.toJSON(newRoutes[i]);
							j++;
						}
					}
					obj.rq = j;
				}
				this.needDelete = [];

				if(this.ctrl.getChild("mainTab").model.enIGMPGlobal){
					obj["res_json" + obj.rq] = "y";
					obj["res_data_type" + obj.rq] = "json";
					obj["res_config_action" + obj.rq] =  3;
					obj["res_config_id" + obj.rq] =  68;
					obj["res_struct_size" + obj.rq] = 0;
					obj["res_buf" + obj.rq] = $.toJSON({enable: true, version: 2});
					obj.rq++;
				}

				this.addToRequest(obj);
			break;
			case "update":
				obj = {
					v2: "y",
					rq: 1,
					res_json0: "y",
					res_config_action0: 1,
					res_config_id0: 1,
					res_struct_size0: 36
				};
				var n = 1;
				obj.rq = n + 1;
				obj['res_json' + n] = "y";
				obj['res_config_action' + n] =  1;
				obj['res_config_id' + n] =  187;
				obj['res_struct_size' + n] = 0;
				n++;
				obj.rq = n + 1;
				obj['res_json' + n] = "y";
				obj['res_config_action' + n] =  1;
				obj['res_config_id' + n] =  17;
				obj['res_struct_size' + n] = 0;

				obj["res_json" + obj.rq] = "y";
				obj["res_config_action" + obj.rq] =  1;
				obj["res_config_id" + obj.rq] =  68;
				obj["res_struct_size" + obj.rq] = 0;
				obj.rq++;

				obj["res_json" + obj.rq] = "y";
				obj["res_config_action" + obj.rq] =  1;
				obj["res_config_id" + obj.rq] =  67;
				obj["res_struct_size" + obj.rq] = 0;
				obj.rq++;

				this.addToRequest(obj);
			break;
			case "delete":				
				obj = {
					v2: "y",
					rq: "y",
					res_config_id: 1,
					res_config_action: 2,
					res_json: "y",
					res_struct_size: 36,
					res_delex: "y",
					res_data_type: "json"
				};
				jsonOutObj = [];
				var general = ctrl.getChild("mainTab", "general");
				if(general.model.tnlname){
					jsonOutObj.push(general.model.tnlname);
				}
				else if(general.model.srvname){
					jsonOutObj.push(general.model.srvname);
				}
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
			case "checkcable":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_action:  1,
					res_config_id:  129,
					res_struct_size: 1
				};
				this.addToRequest(obj);
			break;
		}
	}
	
	this.onupdaterq = function(){
		this.mode = "update";
		this.updateView();
	}
	
	this.onsaverq = function(){
		this.mode = "save";
		this.updateView();
	}
	
	this.onaddrq = function(){
		this.mode = "add";
		this.updateView();
	}
	
	this.oncheckcable = function(){
		this.mode = "checkcable";
		this.updateView();
	}
	
	this.ondeleterq = function(){
		this.mode = "delete";
		this.updateView();
	}
	
	this.onsettodelete = function(ifname){
		this.needDelete.push(ifname);
		return false;
	}
	
	this.mode = "update";			//"save"/"delete"/"update"/"add"
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
	this.bind("addrq", this.onaddrq);
	this.bind("deleterq", this.ondeleterq);
	this.bind("checkcable", this.oncheckcable);
	this.bind("settodelete", this.onsettodelete);
}
extend(jsPreMasterServerView, jsSSideView);

function jsInetFirstStepController(iftree){
	jsInetFirstStepController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsInetFirstStepClientView};
	this.ifaceTypes.client.options = {};
	
	this.iftree = iftree;
	
	
}
extend(jsInetFirstStepController, jsController);

function jsInetFirstStepClientView(ctrl, viewInx, options){
	jsInetFirstStepClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.getwans = function(){
		var iface;
		var service;
		var tunnel;
		var wans = [];
		var port;
		var obj;
		var iftree = this.ctrl.iftree;
		var services;
		
		for(var i in iftree){
			iface = iftree[i];
			if(!iface.is_wan) continue;
			//Описание порта
			if(iface.type == "atm"){
				port = lng("onpvc") + " " + iface.pvc_settings.vpi+"/"+iface.pvc_settings.vci;
			}
			else if(iface.type == "ethernet" || iface.type == "ptm" || iface.type == "3g" || iface.type == "lte" || iface.type == "bridge"){
				if(iface.port){
					port = lng("onport") + " " + iface.port;
				}
				else{
					port = lng("oniface") + " " + iface.port;
				}
			}
			else if(iface.type == "auto"){
				port = lng("wanAuto");
			}

			this.addServices(wans, iface, "services", port);
		}
		return wans;
	}

	this.addServices = function(wans, iface, srvsname, port){
		var service;
		var services = iface[srvsname];
		var tunnel;
		
		if(services){
			for(var j in services){
				service = services[j];
				if(service.tunnels && getObjectLength(service.tunnels)){
					for(var k in service.tunnels){
						tunnel = service.tunnels[k];
						wans.push({
							ifname: iface.ifname,
							srvname: service.ifname,
							tnlname: k,
							name: tunnel.name?tunnel.name:tunnel.ifname,
							type: getConnType(iface, service, tunnel),
							port: port,
							srvsname: srvsname
						});
					}
				}
				else{
					wans.push({
						ifname: iface.ifname,
						srvname: j,
						name: service.name?service.name:service.ifname,
						type: getConnType(iface, service),
						port: port,
						srvsname: srvsname
					});
				}
			}
		}
	}
	
	this.drawView = function(){
		jsInetFirstStepClientView.superclass.drawView.call(this);
		var wans = this.getwans();
		var obj;
		var id;
		var htmlToDraw = lng("inetwizphrase1") + "<br>";
		if(wans.length){
			htmlToDraw += lng("inetwizphrase2");
			htmlToDraw += "<ul>";
			for(var i in wans){
				htmlToDraw += "<li>";
				obj = wans[i];
				id = obj.ifname + "_" + obj.srvname ;
				if(obj.tnlname){
					id += "_" + obj.tnlname;
				}
				id = id.replace(/\./g,"_");
				id = id.replace(/,/g,"_");
				obj.id = id;
				htmlToDraw += "<a href='#' id='" + id + "'>" + obj.name + " (" + connTypeValSet[obj.type] + " " + obj.port + ")</a>"; 
				htmlToDraw += "</li>"
			}
			htmlToDraw += "</ul>";
			htmlToDraw += lng("inetwizphrase3") + " <a href='#' id='addnew'>" + lng("inetwizphrase4") + "</a>."
		}
		else{
			htmlToDraw += lng("inetwizphrase8") + " <a href='#' id='addnew'>" + lng("inetwizphrase9") + "</a> " + lng("inetwizphrase10");
		}
		htmlToDraw += "<br><br>" + lng("inetwizphrase5") + " <a href='/index.cgi'>" + lng("inetwizphrase6") + "</a> " + lng("inetwizphrase7");
		$(this.viewBoxSel).html(htmlToDraw);
		
		//Проставить клики
		var id;
		for(var i in wans){
			obj = wans[i];
			$("#" + obj.id).bind("click", {ifname: obj.ifname, srvname: obj.srvname, tnlname: obj.tnlname, srvsname: obj.srvsname}, context(this).callback(this.oneditjq));
		}		
		$("#addnew").bind("click", {}, context(this).callback(this.oneditjq));
	}
	
	this.oneditjq = function(event){
		this.ctrl.event("edit", event.data, true);
		return false;
	}
}
extend(jsInetFirstStepClientView, jsFieldSetClientView);





















function pagePrintServer(){
	pagePrintServer.superclass.constructor.call(this);
	
	this.settings = null;
	
	this.add(new nodeCaption("printServerSect"))
		.add(new nodeCheckBox("printServerStatus", false, {comment: "printServerWarning"}), "enable")
		.add(new nodetext("printServerName", '', {
			mandatory: true,
			disabled: true,
			hidden: true
		}), "name")
		.add(new nodetext("printServerMake", '', {
			mandatory: true,
			disabled: true,
			hidden: true
		}), "make");

	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pagePrintServer.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()) {
						this.save();
					}
				}));
		}
	}
	
	this.save = function() {
		rootView.showModalOverlay();
		this.settings = {
			'enable': this.child("enable").val(),
			'name': this.child("name").val(),
			'make': this.child("make").val()
		};
		device.config.write( 101, this.settings, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 101, callback(this, function(data){
			var settings = this.settings = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			if (settings) {
				this.child("enable").val(settings.enable).fieldchange();
				this.child("name").val(settings.name);
				this.child("make").val(settings.make);
			}
			rootView.hideModalOverlay();
		}));
	});

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				var name = this.child("name");
				var make = this.child("make");
				if (value) {
					name.enable();
					make.enable();
				} else {
					name.disable();
					make.disable();
				}
			break;
		}
	});

	/* Name:			onupdaterq
	 * Description: 	обработчик события updaterq (обновление)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onupdaterq = function() {
		window.hasChanges = null;
		this.mode = "update";
		this.updateView();
	}

	/* Name:			onsaverq
	 * Description: 	обработчик события saverq (сохранение)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onsaverq = function() {
		this.mode = "save";
		this.updateView();
	}

	this.mode = "update";			//"save"
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
}
extend(pagePrintServer, node);





















window["prov_list_dir.js"] =	{
					man:{
							name: "wanProvMan",
							deftype: "pppoe",
							L2: {
							},
							pppoe: {
								any: {
									is_wan: true,
									services: {
											create:{
												enable:true,
												type:"ppp",
												servicename:"",
												username:"",
												password:"",
												mtu:1492,
												nat:true,
												firewall:true,
												igmp:false,
												keep_alive:{
																interval:30,
																fails:3
															},
												gwif:false,
												ondemand:0
											}
									}
								}
								
							},
							pppoev6: {
								any: {
									is_wan: true,
									services: {
											create:{
												enable:true,
												type:"pppv6",
												servicename:"",
												username:"",
												password:"",
												mtu:1492,
												nat:true,
												firewall:true,
												igmp:false,
												keep_alive:{
																interval:30,
																fails:3
															},
												gwif:false,
												gwifv6:false,
												ipv6_by_slaac: false,
												ipv6_by_dhcpv6: false,
												ipv6_auto: true,
												slaac: true,
												ondemand:0
											}
									}
								}
								
							},
							pppoedual: {
								any: {
									is_wan: true,
									services: {
											create:{
												enable:true,
												type:"pppdual",
												servicename:"",
												username:"",
												password:"",
												mtu:1492,
												nat:true,
												firewall:true,
												igmp:true,
												keep_alive:{
																interval:30,
																fails:3
															},
												gwif:false,
												gwifv6:false,
											ipv6_by_dhcpv6: false,
											ipv6_auto: true,
												slaac: true,
												ondemand:0
											}
									}
								}
								
							},
							static: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											nat: true,
											firewall: true,
											igmp: true,
											type: "ip"
										}
									}
								}
							},
							statkab: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											nat: true,
											firewall: true,
											igmp: true,
											type: "ip",
											kabinet:{
												enable: true
											}
										}
									}
								}
							},
							dynamic: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											nat: true,
											firewall: true,
											type: "ip",
											dhcp: true,
											igmp: true,
											dns_from_dhcp: true
										}
									}
								}
							},
							dynkab: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											nat: true,
											firewall: true,
											type: "ip",
											dhcp: true,
											igmp: true,
											dns_from_dhcp: true,
											kabinet:{
												enable: true
											}
										}
									}
								}
							},
							staticv6: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											firewall: true,
											igmp: false,
											type: "ipv6"
										}
									}
								}
							},
							dynamicv6: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											firewall: true,
											type: "ipv6",
											dhcp: true,
											igmp: false,
											ipv6_by_slaac: false,
											ipv6_by_dhcpv6: false,
											ipv6_auto: true,
											slaac: true,
											dns_from_dhcp: true
										}
									}
								}
							},
							pptp: {
								any: {
									is_wan: true,
									services: {
										auto: {
											type: "auto",
											tunnels: {
												create: {
													enable:true,
													auto: true,
													type:"pptp",
													servicename:"",
													username:"",
													password:"",
													mtu:1456,
													nat:true,
													firewall:true,
													igmp:false,
													gwif:false,
													keep_alive:{
														interval:30,
														fails:3
													},
													ondemand:0
												}
											}
										}
									}
								}
							},
							"624": {
								any: {
									is_wan: true,
									services: {
										auto: {
											type: "auto",
											tunnels: {
												create: {
													enable:true,
													auto: true,
													type:"624"
												}
											}
										}
									}
								}
							},
							statpptp: {
								any: {
									type: "ethernet",
									is_wan: true,
									services: {
										create: {
											enable: true,
											type: "ip",
											nat: true,
											firewall: true,
											tunnels: {
												create: {
													enable:true,
													auto: true,
													type:"pptp",
													servicename:"",
													username:"",
													password:"",
													mtu:1456,
													nat:true,
													firewall:true,
													igmp:true,
													keep_alive:{
														interval:30,
														fails:3
													},
													ondemand:0
												}
											}
										}
									}
								}
							},
							dynpptp: {
								any: {
									type: "ethernet",
									port: "auto",
									is_wan: true,
									services: {
										create: {
											enable: true,
											type: "ip",
											dhcp: true,
											dns_from_dhcp: true,
											nat: true,
											firewall: true,
											tunnels: {
												create: {
													enable:true,
													auto: true,
													type:"pptp",
													servicename:"",
													username:"",
													password:"",
													mtu:1456,
													nat:true,
													firewall:true,
													gwif:false,
													keep_alive:{
														interval:30,
														fails:3
													},
													ondemand:0
												}
											}
										}
									}
								}
							},
							statpppoe: {
								any: {
									type: "ethernet",
									services: {
										create: {
											enable: true,
											type: "ip",
											nat: true,
											firewall: true,
											tunnels: {
												create: {
													enable:true,
													type:"ppp",
													servicename:"",
													username:"",
													password:"",
													mtu:1492,
													nat:true,
													firewall:true,
													igmp:false,
													keep_alive:{
																	interval:30,
																	fails:3
																},
													gwif:false,
													ondemand:0
												}
											}
										}
									}
								}
							},
							dynpppoe: {
								any: {
									type: "ethernet",
									port: "auto",
									services: {
										create: {
											enable: true,
											type: "ip",
											dhcp: true,
											dns_from_dhcp: true,
											nat: true,
											firewall: true,
											tunnels: {
												create: {
													enable:true,
													type:"ppp",
													servicename:"",
													username:"",
													password:"",
													mtu:1492,
													nat:true,
													firewall:true,
													igmp:false,
													keep_alive:{
																	interval:30,
																	fails:3
																},
													gwif:false,
													ondemand:0
												}
											}
										}
									}
								}
							},
							'3g': {
								any: {
									type: "3g",
									is_wan: true,
									services: {
										create: {
											enable:true,
											type:"ppp",
											servicename:"",
											username:"",
											password:"",
											mtu:1370,
											nat:true,
											firewall:true,
											igmp:false,
											keep_alive:{
															interval:20,
															fails:10
														},
											gwif:false,
											ondemand:0
										}
									}
								}
							},
							'lte': {
								any: {
									type: "lte",
									is_wan: true,
									services: {
										create: {
											enable: true,
											nat: true,
											firewall: true,
											type: "ip",
											dhcp: true,
											igmp: true,
											dns_from_dhcp: true,
											gwif: false
										}
									}
								}
							},
							'3glte': {
								any: {
									type: "usb",
									is_wan: true,
									services: {
										create: {											
											__macro__: {
												'ppp': {
													enable:true,
													type:"ppp",
													servicename:"",
													username:"",
													password:"",
													mtu:1370,
													nat:true,
													firewall:true,
													igmp:false,
													keep_alive:{
														interval:20,
														fails:10
													},
													gwif:false,
													ondemand:0										
												},
												'ip': {
													enable: true,
													nat: true,
													firewall: true,
													type: "ip",
													dhcp: true,
													igmp: true,
													dns_from_dhcp: true,
													gwif: false	
												}
											}				
										}
									}									
								}
							}
						}
				};

window["prov_list_dir.js"] = $.extend(true, window["prov_list_dir.js"], window.provs3g);

var provdlink = window["prov_list_dir.js"].man;
provdlink.l2tp = $.extend(true, {}, provdlink.pptp);
provdlink.l2tp.any.services.auto.tunnels.create.type = "l2tp";

provdlink.statl2tp = $.extend(true, {}, provdlink.statpptp);
provdlink.statl2tp.any.services.create.tunnels.create.type = "l2tp";

provdlink.dynl2tp = $.extend(true, {}, provdlink.dynpptp);
provdlink.dynl2tp.any.services.create.tunnels.create.type = "l2tp";

provdlink.statpptpv6 = $.extend(true, {}, provdlink.statpptp);
tunnel = provdlink.statpptpv6.any.services.create.tunnels.create;
tunnel.useipv6 = true;

provdlink.dynpptpv6 = $.extend(true, {}, provdlink.dynpptp);
tunnel = provdlink.dynpptpv6.any.services.create.tunnels.create;
tunnel.useipv6 = true;

provdlink.statl2tpv6 = $.extend(true, {}, provdlink.statl2tp);
tunnel = provdlink.statl2tpv6.any.services.create.tunnels.create;
tunnel.useipv6 = true;

provdlink.dynl2tpv6 = $.extend(true, {}, provdlink.dynl2tp);
tunnel = provdlink.dynl2tpv6.any.services.create.tunnels.create;
tunnel.useipv6 = true;

provdlink.l2tpv6 = $.extend(true, {}, provdlink.l2tp);
tunnel = provdlink.l2tpv6.any.services.auto.tunnels.create;
tunnel.useipv6 = true;

provdlink.pptpv6 = $.extend(true, {}, provdlink.pptp);
tunnel = provdlink.pptpv6.any.services.auto.tunnels.create;
tunnel.useipv6 = true






















function jsQuickTransmissionSettingsController(value){
	jsQuickTransmissionSettingsController.superclass.constructor.call(this);
	
	this.changeModel(new jsInputExModel(value));
	this.model.Settings = null;
	
	this.ifaceTypes.client = {type: jsQuickTransmissionSettingsClientView, def: true};
	this.ifaceTypes.server = {type: jsQuickTransmissionSettingsServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.nextIface = "server";
	this.addIface();
}
extend(jsQuickTransmissionSettingsController, jsController);



function jsQuickTransmissionSettingsClientView(ctrl, viewInx, options){
	options.valset = {on:true,off:false};
	options.widgetStyle = true;
	options.title = 'switch_transmission';
	jsQuickTransmissionSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsQuickTransmissionSettingsClientView.prototype.drawView = function(){
		jsQuickTransmissionSettingsClientView.superclass.drawView.call(this);
		$(this.viewBoxSel).append("<img src='image/preloader.gif' class='preloader' />");
		this.ctrl.event('updaterq');
	}
	
	this.onfieldchange = function(inf) {		
		this.ctrl.model.value = inf.value;
		device.config.read([ 82], callback(this, function(data){
			if (!_.isEmpty(data.rq[0].resident.usb_storage)) {
				this.ctrl.event('saverq');
			} else {
				alert("Конфигурация не применена, вставьте USB-устройство.");
			}
		}));
	}
	
	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		$(this.myBoxSel).hide();
		$(this.viewBoxSel+'>img').show();
	}
	
	/**Обработка события updmodel.
	  * @param	model	Модель.
	  */
	this.onupdmodel = function(model){
		var Settings = this.ctrl.model.Settings;
		$(this.myBoxSel).show();
		$(this.viewBoxSel+'>img').hide();
		
		if (Settings && !no(Settings.enable)) {
			this.ctrl.model.value = Settings.enable;
			this.updateView();
			this.enable();
			$(this.myBoxSel).css('cursor', 'pointer');
			$("a[href='\\#transmission\\/webiface']").attr("href", document.location.protocol + "//" + document.location.host + ":" + Settings["rpc-port"]).attr("target", "_blank");
			$("a[href='\\#transmission\\/webiface']").show();
		} else {
			this.disable();
			$(this.myBoxSel).css('cursor', 'default');
			$("a[href='\\#transmission\\/webiface']").hide();
		}
		return false;
	}
	
	this.bind("fieldchange", this.onfieldchange);
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onupdaterq);
	this.bind("updmodel", this.onupdmodel);
}
extend(jsQuickTransmissionSettingsClientView, jsSwitcherClientView);

 
function jsQuickTransmissionSettingsServerView(ctrl, viewInx, options){
	jsQuickTransmissionSettingsServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;

		if(data && !data.baddata && data.resident) {
			if (data.resident.transmission)
				this.ctrl.model.Settings = data.resident.transmission;
			else 
				this.ctrl.model.Settings = data.resident;
		} else
			this.ctrl.model.Settings = null;

		if (this.mode && this.mode != "update") {
			this.ctrl.event("updaterq");
		}
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;
		var jsonOutObj;
		var ctrl = this.ctrl;

		switch(this.mode) {
			case "save":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_data_type: "json",
					res_config_action:  3,
					res_config_id:  177,
					res_struct_size: 0
				};
				jsonOutObj = ctrl.model.Settings;
				jsonOutObj.enable = ctrl.model.value;
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
			case "update":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_action:  1,
					res_config_id:  177,
					res_struct_size: 0
				};
				this.addToRequest(obj);
			break;
		}
	}

	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		this.mode = "update";
		this.updateView();
	}

	/**Обработчик события saverq (сохранение).
	 */
	this.onsaverq = function() {
		this.mode = "save";
		this.updateView();
	}

	/**Режим работы представления.
	 * @type	String
	 */
	this.mode = "update";			//"save"

	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
}
extend(jsQuickTransmissionSettingsServerView, jsSSideView);





















function jsQuickWiFiController(value, fiveG){
	jsQuickWiFiController.superclass.constructor.call(this);
	
	this.fiveG = fiveG;
	
	this.changeModel(new jsInputExModel(value));
	this.model.WiFiData = null;
	
	this.ifaceTypes.client = {type: jsQuickWiFiClientView, def: true};
	this.ifaceTypes.server = {type: jsQuickWiFiServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.nextIface = "server";
	this.addIface();
}
extend(jsQuickWiFiController, jsController);


function jsQuickWiFi5GController(value){
	jsQuickWiFi5GController.superclass.constructor.call(this, value, true);
}
extend(jsQuickWiFi5GController, jsQuickWiFiController);


function jsQuickWiFiClientView(ctrl, viewInx, options){
	options.valset = {on:true,off:false};
	options.widgetStyle = true;
	options.title = 'switch_wifi';
	jsQuickWiFiClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsQuickWiFiClientView.prototype.drawView = function(){
		jsQuickWiFiClientView.superclass.drawView.call(this);
		$(this.viewBoxSel).append("<img src='image/preloader.gif' class='preloader' />");
		this.ctrl.event('updaterq');
	}
	
	this.onfieldchange = function(inf) {		
		this.ctrl.model.value = inf.value;
		this.ctrl.event('saverq');
	}
	
	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		$(this.myBoxSel).hide();
		$(this.viewBoxSel+'>img').show();
	}
	
	/**Обработка события updmodel.
	  * @param	model	Модель.
	  */
	this.onupdmodel = function(model){
		var wifiData = this.ctrl.model.WiFiData;
		$(this.myBoxSel).show();
		$(this.viewBoxSel+'>img').hide();
		
		if (wifiData && (!no(wifiData.Radio) || !no(wifiData['5G_Radio']))) {
			if(ctrl.fiveG){
				this.ctrl.model.value = wifiData['5G_Radio'];
			}
			else{
				this.ctrl.model.value = wifiData.Radio;
			}
			this.updateView();
			this.enable();
			$(this.myBoxSel).css('cursor', 'pointer');
		} else {
			this.disable();
			$(this.myBoxSel).css('cursor', 'default');
		};
                try{
                var key = window.access_rights.__rpc_index[ 35];
                var value = window.access_rights[key].Radio;
                }catch(e){
                    var value = 6;
                }  
                if (is.set(value) && value!=6){                
                        this.disable();
			$(this.myBoxSel).css('cursor', 'default');
                };
		return false;
	}
	
	this.bind("fieldchange", this.onfieldchange);
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onupdaterq);
	this.bind("updmodel", this.onupdmodel);
}
extend(jsQuickWiFiClientView, jsSwitcherClientView);

 
function jsQuickWiFiServerView(ctrl, viewInx, options){
	jsQuickWiFiServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;

		if(data && !data.baddata && data.resident) {
			this.ctrl.model.WiFiData = data.resident;
		} else
			this.ctrl.model.WiFiData = null;

		if (this.mode && this.mode != "update") {
			this.ctrl.event("updaterq");
		}
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var obj;
		var jsonOutObj;
		var ctrl = this.ctrl;

		switch(this.mode) {
			case "save":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_data_type: "json",
					res_config_action:  3,
					res_config_id:  39,
					res_struct_size: 0
				};
				if(this.ctrl.fiveG){
					jsonOutObj = {'5G_Radio': ctrl.model.value};
				}
				else{
					jsonOutObj = {Radio: ctrl.model.value};
				}
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
			case "update":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_action:  1,
					res_config_id:  35,
					res_struct_size: 0
				};
				this.addToRequest(obj);
			break;
		}
	}

	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		this.mode = "update";
		this.updateView();
	}

	/**Обработчик события saverq (сохранение).
	 */
	this.onsaverq = function() {
		this.mode = "save";
		this.updateView();
	}

	/**Режим работы представления.
	 * @type	String
	 */
	this.mode = "update";			//"save"

	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
}
extend(jsQuickWiFiServerView, jsSSideView);






















function pageRemoteAccess(){
	pageRemoteAccess.superclass.constructor.call(this);
	
	this.bind("updaterq", function(){
		try{
			rootView.showModalOverlay();
			device.config.read([
				 187,
				 16,
				 10
			], callback(this, function(data){
				this.lanClients = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:[];
				this.rmaccess = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.httpaccess:null;
				if(is.RPC_SUCCESS(data.rq[2])){
					this.vservers = data.rq[2].resident.vserver;
				}
				else{
					this.vservers = [];
				}

				// формируем массив занятых портов
				this.use_ports_vs = [];
				this.use_ports_vs_buf = [];
				for (var i = 0; i < this.vservers.length; i++) {
					if (this.vservers[i].proto != "udp") {
						if (this.vservers[i].ports_end == "") {
							this.use_ports_vs[this.use_ports_vs.length] = parseInt(this.vservers[i].ports_begin);
						} else {
							this.use_ports_vs_buf = _.range(parseInt(this.vservers[i].ports_begin), parseInt(this.vservers[i].ports_end)+1);
							this.use_ports_vs = _.union(this.use_ports_vs, this.use_ports_vs_buf);
						}
					}
				}

				this.rmaccess_ipv4 = [];
				this.rmaccess_ipv6 = [];
				
				for(var i = 0; this.rmaccess && i < this.rmaccess.length; i++){
					this.rmaccess[i].pos = i;
				}

				this.startForm()
					.add(new formRemoteAccess(this.rmaccess, this.lanClients, this.ifacelist, false, this.use_ports_vs), "form")
					.endForm();

				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
		catch(e){
			this.deep.updateView().$box.errorBlock(lng("error"), e.message);
		}
	});
	
	this.updateView = function(phase){
		pageRemoteAccess.superclass.updateView.apply(this, arguments);
		if(phase == "back"){
			this.cleanButtonBar()	
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if(this.deep.updateModel()){
						var query_all = this.get("form").query;
						if(query_all && query_all.write.length){
							rootView.showModalOverlay();
							device.config.multi(query_all, callback(this, function(data){
								this.emit("updaterq");
							}));
						}

						if(query_all && query_all.remove.length){
							rootView.showModalOverlay();
							device.config.multi(query_all, callback(this, function(data){
								this.emit("updaterq");
							}));
						}
					}
				}));
			if(disableFlag( 17)){
				this.getButton("button_save").disable();
			}
		}
	}
}
extend(pageRemoteAccess, node);

function formRemoteAccess(rmaccess, lanClients, ifacelist, v6, use_ports_vs){
	formRemoteAccess.superclass.constructor.call(this);
	this.rmaccess = rmaccess;
	this.ifacelist = ifacelist;
	this.lanClients = lanClients;
	this.use_ports_vs = use_ports_vs;
	var flag_error = false;
	this.$grid = null;
	this.pPort = "80";  
	

	/*
	this.add(new nodeComboText("raccessIpList", null, 
			{
				header: 
					[
						{ index: "ip", name: "IP" }
					],
				index: "ip",
				blank: "raccessIpListSel"
			}), "ip")
	*/

		this.add(new nodeCaption("rmtAccessLabel"));
		
	this.add(new node(), "grid");

	this.updateModel = function(status){
		status.error |= !this.$grid.cleanErrors().checkMandatory(true);
		this.status = status;
		if(!flag_error){
			if(!status.error){
				var query = this.query = { remove: [], write: [] };
				var actions = gridActionConverter(this.$grid);

				if (actions.count) {
					//if (actions.deleted.length && actions.deleted.length == this.$grid.nrow() - this.$grid.newRows().length) {
					//	query.remove.push([ 16, { clear: true }]);
					//} else {
						for (var i = 0; i < actions.deleted.length; i++) { 
							query.remove.push([ 16, this.rmaccess[actions.deleted[i]], this.rmaccess[actions.deleted[i]].pos]);
						}

					var temp = actions.changed.concat(actions.added);
					var r_temp = actions.r_changed.concat(actions.r_added);
					for (var i = 0; i < temp.length; i++) {
						var $row = this.$grid.row(temp[i]);
						var ips = $row.col("ips").fieldval().split("/");
						var json = {};
							json.dport = $row.col("dport").fieldval();
						if(!v6) {
							json.ips = ips[0];
							json.source_mask = $row.col("source_mask").fieldval();
							json.ipv6 = false;
						}
						else {
							json.ips = $row.col("ips").fieldval();
							json.ipv6 = true;
						}
						if(!v6) {					
							json.sport = parseInt($row.col("sport").fieldval());
						}
						query.write.push([16, json, $row.isNew()?-1:this.rmaccess[r_temp[i]].pos]);
					}
				}
			}
			return !status.error;
		}
	}

	this.updateView = function(phase){
		formRemoteAccess.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
		this.cleanButtonBar().child("grid").$box.empty();
			
			var header = [];
			header.push({ index: "ips", name: "ip_address" });
			if (!v6) {
				header.push({ index: "source_mask", name: "masq" });
				header.push({ index: "sport", name: "rmtAccessPortS" });
			}
			header.push({ index: "dport", name: "protocol" });
			
			this.$grid = this.child("grid").$box.html("\
				<div class='grid rm'></div>\
				<div class='buttonsInline'>\
					<div class='button add'></div>\
				</div>\
			").find('.grid').lightUIGrid(header, 0, { selectable: true });
				
			this.$grid.bind("selection.grid", callback(this, function(){
				this.updateRuleButtons();
			}));

			this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell){
				this.$grid.cleanErrors();
				var row = this.$grid.row($cell.irow());
				flag_error = false;
				var str_number = $cell.irow();
				var alias = $cell.getColAlias();
				var buf = {};
				buf.ips = row.col("ips").fieldval();
				buf.dport = row.col("dport").fieldval();
				if (!v6) {
					buf.source_mask = row.col("source_mask").fieldval();
					buf.sport = row.col("sport").fieldval();
				}

				// проверка строк на уникальность
				for (var i = 0; i < this.$grid.nrow(); i++) {
					if ((this.$grid.row(i).col("ips").fieldval() == buf.ips) && (this.$grid.row(i).col("dport").fieldval() == buf.dport) && str_number != i) {
						if (!v6 && ((this.$grid.row(i).col("source_mask").fieldval() == buf.source_mask) && (this.$grid.row(i).col("sport").fieldval() == buf.sport))) {
							flag_error = true;
							if (confirm(lng("rmtAccessExistRule"))) {
								row.col(alias).trigger("click");
							}
							else {
								row.col(alias).fieldval("");
								row.col(alias).trigger("click");
							}
						}
					}
				}

				// проверка на совпадение с портами из виртуальных серверов
				if (alias == "sport") {
					if (_.indexOf(this.use_ports_vs, parseInt(buf.sport)) != -1) {
						flag_error = true;
						alert(lng("port") + " " + buf.sport + " " + lng("portUsedInVS"));
						row.col(alias).trigger("click");
					}
				}

				if (!v6 && ($cell.getColAlias() == 'ips') && ($cell.fieldval() != '')) {
					row.col("source_mask").fieldval(new IPv4($cell.fieldval()).netmask().toString());
				}

			}));
			
			if (!v6) {
				this.$grid.colEditable("ips", "ipv4", {mandatory: true})
				this.$grid.colEditable("source_mask", "ipv4", {mandatory: true});
			} else {
				this.$grid.colEditable("ips", "ipv6", {mandatory: true})
			}
			
			if (!v6) {
				this.$grid.colEditable("sport", "number", {
					mandatory: true,
					minval: 1,
					maxval: 65535
				})
			}

				this.$grid.colEditable("dport", "select", {
					options: {
						"HTTP": this.pPort
					}
				});

			
			this.get("grid")
				.addButton("add")
				.getButton("add")
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.addRow();
					var $row = this.$grid.row("last");

					$row.col("dport").fieldval(this.pPort);//.disable();
					$row.col("ips").trigger("click");
				}));
				
			this.get("grid")
				.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.selection().hide();
					this.updateRuleButtons();
				}));
			
			for(var i = 0; this.rmaccess && i < this.rmaccess.length; i++){
				var access = this.rmaccess[i];
				var $row = this.$grid.addRow().row("last");
				if (!v6) {
					$row.col("ips").fieldval(access.ips);
					$row.col("source_mask").fieldval(access.source_mask);
					$row.col("sport").fieldval(access.sport);
				}
				else {
					$row.col("ips").fieldval(access.ips);//(access.ips.match(/:/))?access.ips:access.ips+"/"+calcBitsByMask(access.source_mask));
				}
				
				$row.col("dport").fieldval(access.dport);//.disable();
			}
					
			this.$grid.resetAll();
			
			if(disableFlag( 17)){
				this.get("grid").getButton("add").disable();
				this.get("grid").getButton("button_del").disable();
			}

			this.updateRuleButtons = function(){
				if(this.$grid.selection().not(":hidden").length) {
					this.get("grid").getButton("button_del").enable();
				}
				else{
					this.get("grid").getButton("button_del").disable();			
				}
			}
		}
	}

	this.bind("ruleselect", function(status, value){
		switch(status.target.getAlias()){
		
		}
	});
	
}
extend(formRemoteAccess, node);
























function pageDNS(){
	pageDNS.superclass.constructor.call(this);
	
	this.ifacelist = null;
	this.dns = null;
	this.add(new nodeCaption("dnsLabel"));
	this.add(new nodeCheckBox("manual", modeAP() ? true : false), "manual");
		this.add(new nodeCheckBox("dnsDefRoute", true), "defroute");
		this.add(new nodeSelect("iface", '', {
			disabled: true
		}), "iface");
		this.add(new nodeTextArea("dnsServers", '', {
			rows: 5,
			disabled: true,
			mandatory: true,
			re: [
				callback(this, function(value){
					var err = null;
					var list = new Array();
					var errlist = new Array();
					var tmplist = value.replace(/(,|;|\ )/g, '\n').split('\n');
					for (var i = 0; i < tmplist.length; i++) {
						var addr = $.trim(tmplist[i]);
						if (addr != '') {
							var valid = (!this.v6)?is.IPv4(addr):is.IPv6(addr);
							if (valid) {
								list.push(addr);
							} else {
								err = true;
								errlist.push(addr);
							}
						}
					}
					if (err) {
						err = lng("dnsAddressWrong") + " " + errlist.join(", ");
					} else {
						this.child("servers").val(list.join('\n'));
					}
					return err;
				})
			]
		}), "servers");

	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageDNS.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(
							this.child("manual").val(),
							this.child("defroute").val(),
							this.child("iface").val(),
							this.convertIP(this.child("servers").val().split('\n'), true).split('\n')
						);
					}
				}));
		}
		if (phase == "back") {
			if (this.dns) {
				if (this.dns.servers) {
					this.child("servers").val(this.convertIP(this.dns.servers.replace(/\|/g, '\n').split('\n')));
				} else {
					if (!this.v6) {
						this.child("servers").val("8.8.8.8");
					} else {
						this.child("servers").val("2001:4860:4860::8888");
					}
				}
				if (modeAP()){
					this.child("manual").val(true).fieldchange();
					this.child("manual").hide();
					this.child("defroute").hide();
					this.child("iface").hide();
				} else {
					this.child("manual").val(this.dns.manual || false).fieldchange();
					this.child("defroute").val(this.dns.defroute || false).fieldchange();
					if (this.dns.ifname && this.dns.ifname != "")
						this.child("iface").val(this.dns.ifname);
				}
			
				var iface = this.child("iface").cleanOptions();
				var ifacelist = CreateIfacesValset(this.ifacelist, true, false, null, true);
				for (var i in ifacelist){
					if (i) {
						iface.addOption(i, ifacelist[i].iface);
					}
				}
			}
		}
		return false; //прервать всплытие события
	}

	/**Обработка события updmodel.
	 */
	this.onupdmodel = function() {
		window.hasChanges = null;
		this.updateView();
		return false; //прервать всплытие события
	}
	
	this.save = function(manual, defroute, ifname, servers) {
		rootView.showModalOverlay();
		this.dns = {
			'manual': manual,
			'defroute': defroute,
			'ifname': (defroute)?ifname:this.dns.ifname,
			'servers': (manual)?servers.join('|'):this.dns.servers
		};
		device.config.write((!this.v6)? 7: 132, this.dns, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.convertIP = function(rows, noMappedIPv4){
		if(this.v6){
			var temp = new Array();
			for(var i in rows){
				if(!rows[i].match(/^\n*$/)){
					temp.push(new jsSubNetIPModel(128, rows[i], 16, ":", false, true).toString(noMappedIPv4));
				}
			}
			rows = temp;
		}
		return rows.join('\n');
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([
			 120,
			(!this.v6)? 7: 132
		], callback(this, function(data){
			this.ifacelist = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.iface_names:{};
			if (is.RPC_SUCCESS(data.rq[1])) {
				if (data.rq[1].resident.dns) {
					this.dns = data.rq[1].resident.dns;
				} else {
					this.dns = data.rq[1].resident;
				}
			}
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	});

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "typeproto":
			break;
			case "manual":				
				var defroute = this.child("defroute");				
				var iface = this.child("iface");
				var servers = this.child("servers");
				if (value) {
					defroute.disable();
					iface.disable();
					servers.enable();
				} else {
					servers.disable();
					iface.enable();
					defroute.enable().fieldchange();
				}
			break;
			case "defroute":
				var iface = this.child("iface");
				var manual = this.child("manual");
				debug(value);
				debug(manual.val());
				if (value || manual.val()) iface.disable(); else iface.enable();
			break;
		}
	});
}
extend(pageDNS, node);





















function pageRouting(v6){
	pageRouting.superclass.constructor.call(this);

	this.route = null;
	this.ifacelist = null;
	this.$grid = null;

	this.add(new nodeCaption("routingLabel", "routingDescText"))
		.add(new node(), "grid");

	this.updateModel = function(status){
		var showError = false;
		for ( var k = 0; k < this.$grid.nrow(); k++ ) {
			var krow = this.$grid.row(k);
			for ( var j = 0; j < this.$grid.nrow(); j++ ) {
				if ( j == k ) continue;
				var jrow = this.$grid.row(j);
				if ( jrow.selected() || krow.selected() ) {
					continue;
				}
				if ( jrow.col('net_dest').fieldval().split('/')[0] == krow.col('net_dest').fieldval().split('/')[0] &&
					 jrow.col('net_dest_mask').fieldval() == krow.col('net_dest_mask').fieldval() ) {
					showError = true;
					break;
				}
			}
		}
		if ( showError ) {
			status.error |= true;
			alert(lng('routingAlreadyExistsSave'));
		}

		status.error |= !this.$grid.cleanErrors().checkMandatory(true);
		this.status = status;
	}

	this.getIfaceName = function(ifname){
		var ifaces = (this.ifacelist)?this.ifacelist:{};
		for(var i in ifaces){
			if(ifaces[i] && ifaces[i].iface == ifname) return ifaces[i].name;
		}
		return null;
	}

	this.updateView = function(phase){
		pageRouting.superclass.updateView.apply(this, arguments);
		try{
			if(phase == "back"){
				//фильтрация входных данных
				var route = this.route = [];
				var r = this.routeAll;
				var isIPv6;
				for(var i=0; i<r.length; i++){
					isIPv6 = r[i].ip.match(/:/);
					if((v6 && isIPv6) || (!v6 && !isIPv6)){
						route.push(r[i]);
					}
				}

				//отрисовка страницы
				var header = [];
				if(v6){
					header.push({ index: "net_dest", name: "routingNetDestv6" });
				}
				else{
					header.push({ index: "net_dest", name: "routingNetDest" });
					header.push({ index: "net_dest_mask", name: "routingNetDestMask" });
				}
				header.push({ index: "gateway", name: "routingGateway" });
				header.push({ index: "metric", name: "metric" });
				header.push({ index: "iface", name: "routingViaIface" });
				header.push({ index: "notavail", name: "routingAvail" });

				this.cleanButtonBar().child("grid").$box.empty();
				this.$grid = this.child("grid").$box.html("\
					<div class='grid rm'></div>\
					<div class='buttonsInline'>\
						<div class='button add'></div>\
					</div>\
				").find('.grid').lightUIGrid(header, 0, {
					selectable: true
				});
				this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell){
					this.$grid.cleanErrors();
					var row = this.$grid.row($cell.irow());
					var alias = $cell.getColAlias()
					if(!v6){
						if (alias == 'net_dest' && $cell.fieldval() != '') {
							var __ipv4 = new IPv4($cell.fieldval());
							if ( !__ipv4.mask() && __ipv4.ip()[3] != '0' ) {
								row.col("net_dest_mask").fieldval( (new IPv4(__ipv4, 32)).netmask().toString());
							} else {
								row.col("net_dest_mask").fieldval( __ipv4.netmask().toString());
							}
							$cell.fieldval( (new IPv4(__ipv4)).toString() );
							row.col("gateway").fieldval( new IPv4($cell.fieldval()).hostmin().toString());
						}
					}
					if (alias == 'iface' || alias == 'net_dest') {
						if (row.col("iface").fieldval() != 'auto') {
							row.col("gateway").fieldval('').disable();
						} else {
							row.col("gateway").enable();
						}
					}
					if(!v6){
						for ( var j = 0; j < this.$grid.nrow(); j++ ) {
							if ( j == $cell.irow() ) continue;
							var jrow = this.$grid.row(j);
							if ( jrow.col('net_dest').fieldval().split('/')[0] == row.col('net_dest').fieldval().split('/')[0] &&
								 jrow.col('net_dest_mask').fieldval() == row.col('net_dest_mask').fieldval() ) {

								alert(lng('routingAlreadyExists'));
								break;
							}
						}
					}

				}));
				if(v6){
					this.$grid
						.colEditable("net_dest", "ipv6", {mandatory: true})
						.colEditable("gateway", "ipv6", {mandatory: true});
				}
				else{
					this.$grid
						.colEditable("gateway", "ipv4", {mandatory: true})
						.colEditable("net_dest", "ipv4", {mandatory: true})
						.colEditable("net_dest_mask", "ipv4", {mandatory: true});
				}
				this.$grid
					.colEditable("metric", "number");

				var iface_options_list = {};
				iface_options_list = this.ifacelist;

				this.$grid
					.colEditable("iface", "select", {
						options: CreateIfacesValset(iface_options_list, true, true)
					});

				this.get("grid")
					.addButton("add")
					.getButton("add")
					.bind("click.button", callback(this, function(){
						this.$grid.find('thead tr td.selectable input').attr("checked", false);
						this.$grid.addRow().row("last").col("net_dest").trigger("click");
					}));
				this.get("grid")
					.addButton("button_del")
					.getButton("button_del")
					.disable()
					.bind("click.button", callback(this, function(){
						this.$grid.find('thead tr td.selectable input').attr("checked", false);
						this.$grid.selection().hide();
						this.updateRuleButtons();
					}));
				for(var i = 0; this.route && i < this.route.length; i++){
					var route = this.route[i];
					var $row = this.$grid.addRow().row("last");
					var led = (route.notavail)?"ledred.gif":"ledgreen.gif";
					if(v6){
						$row.col("net_dest").fieldval((route.ip.match(/:/))?route.ip:route.ip+"/"+calcBitsByMask(route.netmask));
					}
					else{
						$row.col("net_dest").fieldval(route.ip);
						$row.col("net_dest_mask").fieldval(route.netmask);
					}
					if (route.iface == 'auto') {
						$row.col("gateway").fieldval(route.gw);
					} else {
						$row.col("gateway").disable();
					}
					$row.col("metric").fieldval(route.met);
					$row.col("iface").fieldval(route.iface);
					$row.col("notavail").fieldval("<img src='image/" + led + "' width='6' height='6' alt='' />");
				}
				this.$grid.resetAll();
				this.addButton("button_save")
					.getButton("button_save")
					.bind("click.button", callback(this, function(){

						this.deep.updateModel();
						if (!this.status.error) {
							this.save(gridActionConverter(this.$grid));
							this.$grid.selection().removeRow();
						}
					}));
				this.$grid.bind("selection.grid", callback(this, function(){
					this.updateRuleButtons();
				}));
				this.updateRuleButtons = function(){
					if(this.$grid.selection().not(":hidden").length) {
						this.get("grid").getButton("button_del").enable();
					}
					else{
						this.get("grid").getButton("button_del").disable();
					}
				}
				if(disableFlag( 17)){
					this.getButton("button_save").disable();
					this.get("grid").getButton("add").disable();
					this.get("grid").getButton("button_del").disable();
				}
			}
		}
		catch(e){
			this.$box.errorBlock(
				lng("error")
				, e.message
				, null
				, lng("refresh")
				, callback(this, function(){this.emit("updaterq")})
			);
		}
	}

	this.save = function(actions){
		if (actions.count) {
			rootView.showModalOverlay();
			var query = { remove: [], write: [] };
			//if (actions.deleted.length && actions.deleted.length == this.$grid.nrow() - this.$grid.newRows().length) {
			//	query.remove.push([ 17, { clear: true }]);
			//} else {
				for (var i = 0; i < actions.deleted.length; i++) {
					query.remove.push([ 17, this.route[actions.deleted[i]], actions.deleted[i]]);
				}
			//}
			var temp = actions.changed.concat(actions.added);
			var r_temp = actions.r_changed.concat(actions.r_added);
			var json, met;

			for (var i = 0; i < temp.length; i++) {
				var $row = this.$grid.row(temp[i]);

				var json = {
					'ip': $row.col("net_dest").fieldval(),
					'gw': $row.col("gateway").fieldval(),
					'iface': $row.col("iface").fieldval()
				};
				if(!v6){
					json.netmask = $row.col("net_dest_mask").fieldval();
				}
				var met = $row.col("metric").fieldval(); parseInt();
				if(met) json.met = parseInt(met);

				query.write.push([ 17, json, $row.isNew()?-1:r_temp[i]]);
			}
			device.config.multi(query, callback(this, function(data){
				//rootView.hideModalOverlay();
				this.update();
			}));
		}
	}

	this.update = function(){
		rootView.showModalOverlay();
		device.config.read([
			 120,
			 17
		], callback(this, function(data){
			this.ifacelist = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.iface_names:{};
			this.routeAll = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.route:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}

	this.bind("updaterq", this.update);
}
extend(pageRouting, node);

function pageRoutingIPv6(){
	pageRoutingIPv6.superclass.constructor.call(this, true);
}
extend(pageRoutingIPv6, pageRouting);





















function jsSearcherModel(defenitions){
	jsSearcherModel.superclass.constructor.call(this);
	
	this.defenitions = defenitions;
}
extend(jsSearcherModel, jsModel);



function jsSearcherController(defenitions){
	jsSearcherController.superclass.constructor.call(this);
	
	this.changeModel(new jsSearcherModel(defenitions));
	this.ifaceTypes.client = {type: jsSearcherClientView, def: true};
}
extend(jsSearcherController, jsController);



function jsSearcherClientView(ctrl, viewInx, options){
	jsSearcherClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.click = function(a) {
		this.ctrl.event('selectpage', {
			item: a.data,
			tab: null
		}, true);
		//return false;
	}

	/*isCharCode = function(c) {
		return (c.toLowerCase() != c.toUpperCase());
	}

	isEnterCode = function(e) {
		return (e.keyCode == 13);
	}*/
	
	this.onkeyup = function(e) {
		var str = $(this.viewInputSel).val();
		if (str.toLowerCase() != this.prevStr/*isEnterCode(e) || isCharCode(String.fromCharCode(e.which))*/) {
			this.findResults(str);
			this.prevStr = str.toLowerCase();
		}
	}
	
	this.findResults = function(str) {
		var defenitions = this.ctrl.model.defenitions;
		var resultList = [];
		str = str.toLowerCase();
		
		if (str == '') {
			$(this.viewBoxSel+'>h2').html('');
			this.deleteResults();
			return ;
		}
		
		function createResultBone() {
			var htmlToDraw = '';
			htmlToDraw 	= 	"<div class='searchItem'>";
			htmlToDraw 	+=	"<div class='caption'>";
			htmlToDraw 	+=	"<a href='#'></a>";
			htmlToDraw 	+=	"<span class='group'></span>"
			htmlToDraw 	+=	"</div>";
			htmlToDraw 	+=	"<div class='description'></div>";
			htmlToDraw 	+=	"<div class='separator'></div>";
			htmlToDraw 	+=	"</div>";
			return $(htmlToDraw).css('display', 'none');
		}
		
		// Step 1
		for (var i = 0; i < defenitions.length; i++) {
			var list = defenitions[i].list;
			var group = defenitions[i].name;
			
			if (no(list)) continue;
			
			for (var j = 0; j < list.length; j++) {	// search using lng!!
				if (isObjEmpty(list[j]) || list[j].hide) continue;
				var description = list[j].description || '';
				if (lng(list[j].item).toLowerCase().search(str) >= 0 || lng(description).toLowerCase().search(str) >= 0) {
					resultList[resultList.length] = {'group': group, 'list': list[j]};
				}
			}
		}
		
		this.deleteResults();
		
		$(this.viewBoxSel+'>h2').html(lng('search_results') + ' <i>"' + str + '"</i>');
		
		for (var i = 0; i < resultList.length; i++) {
			var searchItem = createResultBone();
			var description = resultList[i].list.description || '';
			$(searchItem).find('a').attr('href', '#'+resultList[i].list.path).text(lng(resultList[i].list.item));
			$(searchItem).find('span.group').text('(' + lng(resultList[i].group) + ')');
			$(searchItem).find('.description').html(lng(description).replace(new RegExp(str, "gi"), "<span class='searchMark'>" + str + "</span>"));
			$(this.viewBoxSel).append($(searchItem));
			$(searchItem).find('a').bind('click', resultList[i].list, context(this).callback(this.click));
			
			if (i != resultList.length-1) {
				$(searchItem).fadeIn(200);
			} else {
				$(searchItem).fadeIn(200, function(){
					setTimeout(function(){	// Ждем-с чуток
						setScrollbarSize(); /* from workbench.ui.js */
					}, 200);
				});
			}
		}
		
		if (resultList.length == 0) {
			var searchItem = createResultBone();
			$(searchItem).find('span.group').text(lng('search_empty'));
			$(this.viewBoxSel).append($(searchItem));
			$(searchItem).fadeIn(200, function(){
				setScrollbarSize(); /* from workbench.ui.js */
			});
		}
	}
	
	this.deleteResults = function() {
		$(this.viewBoxSel+'>.searchItem').animate({
			'opacity': 0,
			'height': 0
		}, 200, function(){
			$(this).remove();
		});
	}

	/*
	 * На самом деле ничего не рисуем - просто назначаем события
	 * */
	jsSearcherClientView.prototype.drawView = function(){
		var options = this.options;
		
		this.myBoxSel = options.viewBoxSel;
		this.viewBoxSel = options.viewBoxSel;
		this.viewInputSel = options.viewInputSel;
		
		$(this.viewBoxSel).html("<h2></h2>");
		$(this.viewInputSel).bind('keyup', context(this).callback(this.onkeyup));
		
		jsSearcherClientView.superclass.drawView.call(this);
	}	
	
	this.prevStr = '';
}
extend(jsSearcherClientView, jsCSideView);























 
function jsStartModel(json){
	jsStartModel.superclass.constructor.call(this);
	/**JSON из демона*/
	this.json = json;
}
extend(jsStartModel, jsModel);


function jsStartController(){
	jsStartController.superclass.constructor.call(this);

	this.changeModel(new jsStartModel(null));
	
	this.ifaceTypes.client =  {type: jsStartClientView};
	this.ifaceTypes.server = {type: jsStartServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.nextIface = "server";
	this.addIface();
}
extend(jsStartController, jsController);


function jsStartClientView(ctrl, viewInx, options) {
	jsStartClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.info = { 
		'devInfoName': null,
		'devInfoVersion': null,
		'devInfoBuildTime': null,
		'devInfoVendor': null,
		'devInfoSummary': null,
		'devInfoBugs': null 
	};
	
			this.info = {
			'devInfoVendor': null,
			'devInfoName': null,
			'devInfoVersion': null,
			'devInfoBuildTime': null,
			'devInfoSummary': null,
			'devInfoSoftRev': null,
			'devInfoBugs': null
		};	
	


	this.params = {};
	
	_.extend(this.params, {'devInfoLanIp': null, /*'WAN IP': null,'devInfoWanType':null, 'devInfoWanDisconnectCause':null,*/ 'devInfoLanMac': null});
	_.extend(this.params, {'SSID': null, 'Security': null});

	if(window.menu_postfix != "_ap"){
		_.extend(this.params, {'devInfoWanStatus': null});
	}
	
	
	jsStartClientView.prototype.drawView = function(){
		jsStartClientView.superclass.drawView.call(this);
		
		function createItem(name, value) {
			return $("<div class='editCell'><div class='name'>" + lng(name) + ":</div><div class='value'>" + value + "</div><div class='clear'></div></div>")
		}
		
		$(this.viewBoxSel).html('<div id="devinfo"></div>');
		$(this.viewBoxSel).find('#devinfo').html('<h2 class="titlePage">' + lng('startSepDevInfo') + '</h2>');
		for (var i in this.info) {
			this.info[i] = createItem(i, '');
			$(this.viewBoxSel).find('#devinfo').append(this.info[i]);
		}
                
		$(this.viewBoxSel).find('#devinfo').append('<h2 class="titlePage">' + lng('netInfo') + '</h2>');
		for (var i in this.params) {
			this.params[i] = createItem(i, '');
			$(this.viewBoxSel).find('#devinfo').append(this.params[i]);
		}

	}
	
	/**Запустить updateView*/
	this.onupdmodel = function(model){
		var json = this.ctrl.model.json;
		this.rqInx = 0;
		if (json) {
	
			if(json[this.rqInx] && json[this.rqInx].resident){
				var devinfo = json[this.rqInx].resident;
				this.info['devInfoName'].find('.value').html(devinfo.fw_name);
				if(!hideFlag( 14)){
					var fw_version = devinfo.fw_version;
					this.info['devInfoVersion'].find('.value').html($("<a href='#'>"+fw_version+"</a>"));
					this.info['devInfoVersion'].find('.value>a').click(context(this).callback(function(){
						onClickInfoVersionOnStart(this);
					}));
				}
				else{
					this.info['devInfoVersion'].find('.value').html(devinfo.fw_version);
				}
				if (!devinfo.fw_date){
					this.info["devInfoBuildTime"].hide();
				}
				else{
					this.info["devInfoBuildTime"].find('.value').html(devinfo.fw_date);
				}
				if (!devinfo.fw_vendor){
					this.info["devInfoVendor"].hide();
				}
				else {
					this.info["devInfoVendor"].find('.value').html(devinfo.fw_vendor);
				}
				if(!devinfo.fw_bugs && !devinfo.fw_tel){
					this.info["devInfoBugs"].hide();
				}else{
					var mail = devinfo.fw_bugs ? devinfo.fw_bugs.replace("<","").replace(">","") : "";
					mail = "<a href='mailto:"+mail+"'>"+mail+"</a>";
					var tel = devinfo.fw_tel || "";
					this.info["devInfoBugs"].find('.value').html((tel != "" ? tel + "<br/>" : "") + mail);
				}
				if (!devinfo.fw_summary ){
						this.info["devInfoSummary"].hide();
				}
				else{
					this.info["devInfoSummary"].find('.value').html(lng(devinfo.fw_summary));
				}
		this.info["devInfoSoftRev"].find('.value').html( "2a7840c8ee18badaca3f6abcfd539ed559547d94");	
			}
                        
			this.rqInx++;
			if(json[this.rqInx] && json[this.rqInx].resident && json[this.rqInx].resident.iface_names){
				var ifaces = json[this.rqInx].resident.iface_names;

				this.params["devInfoLanIp"].find('.value').html($("<a href='#'>"+ifaces.br0.services.br0.ip+"</a>").click(context(this).callback(function(){
					setCookie('editLAN', '"+json.ifaces.br0.services.br0.ip+"');
					onClickEditLanOnStart(this);
				})));
				this.params["devInfoLanMac"].find('.value').html($("<a href='#'>"+ifaces.br0.mac+"</a>").click(context(this).callback(function(){
					setCookie('editLAN', '"+json.ifaces.br0.services.br0.ip+"');
					onClickEditLanOnStart(this);
				})));
				
				
				/*
				*/	
				
				if(window.menu_postfix != "_ap"){
					var wanIpV = ''
						var isWan = false;
						var wanip = null;
						var ipv6lla = null;
						var wanOn = false;
						var conType = null;
						var ifTunnel = false;
						var wanStatus = '';
						var status;
						var portOn = false;
						var ports = this.ctrl.model.json[2].resident;


						var wanConn = getWanConn(ifaces, wanIpV == '_v6');
				
						if (wanConn){
							wanOn = (wanConn.connection_status == "Connected");
							if (wanConn.L3)
								conType = getConnType(wanConn.L2, wanConn.L3, wanConn);
							else
								conType = getConnType(wanConn.L2, wanConn);

							var ifname = wanConn.iface;
							var iconPrefix = "inet";
							var iconTitle;
							iconTitle = "Ethernet";
							if (wanConn.L2.port == "WiFiClient"){
								iconPrefix = "wifi";
								iconTitle = "Wi-Fi";
								portOn = wanOn;
							}else if (wanConn.L2.port == "USB"){
								if (wanConn.L2.type == "3g") iconTitle = "3G";
								if (wanConn.L2.type == "lte") iconTitle = "LTE";
								iconPrefix = "3g";
								portOn = wanOn;
							}
							else if (wanConn.L2.port == "USB-WIMAX"){
								iconPrefix = "3g";
								portOn = wanOn;
								iconTitle = "WiMax"
							}
							else{
								for(port in ports){
									if (ports[port].iface && ifname == ports[port].iface){
										status = ports[port].status;
										isWan = ports[port].is_wan;
										if (status){
											portOn = true;
											break;
										}				
									}
								}
							}
							function wanStatusImg(status){
								return "<img class='wan-status-img' src=\"image/icons/" + iconPrefix + "_" + status + ".png \" title=\"" + iconTitle + "\"/>";
							}

							wanip = wanConn['ip'+(wanIpV == "_v6"?'v6':'')];
							
							if (wanIpV == "_v6" && is.set(wanConn.ipv6lla)){
								ipv6lla = wanConn.ipv6lla;
							}
		// используем разную логику для диров и модемов

							if (!portOn && conType != "pppoe" && (conType == "ip" || conType == "ipv6")){
								if(menu_postfix == "_ap"){
									wanStatus+=wanStatusImg("off");
								}
								else{
									wanStatus+=wanStatusImg("off") + " ; " + lng("wanStatuscableDisconnect") + ";";
								}

							}else{
								if(menu_postfix == "_ap"){
									wanStatus+=wanStatusImg("on");
								}
								else{

									if (wanOn){
											wanStatus+=wanStatusImg("on");
												if (wanip) {
													wanStatus+=" "+wanip+";";
												}
												if (conType) {
													wanStatus+=" "+lng("devInfoWanType")+": "+lng(conType)+"; ";
												}
										
											}else{
												wanStatus+=wanStatusImg("off");
												if (conType) {
													wanStatus+=lng("devInfoWanType")+": "+lng(conType);
												}
												var wanCauseDown = this.causeWanDown(conType, wanConn);
												if (wanCauseDown){
													wanStatus+="; "+lng(wanCauseDown)+"; ";
												}
											}
								}
																																				
								
								
							}

						if (is.set(ipv6lla)){
							wanStatus += ' LLA: ' + ipv6lla + "; ";
						} 			
						}else
							wanStatus = lng("wanStatusNotCreated");						
						
						if (wanStatus){							
							this.params["devInfoWanStatus" + wanIpV].find('.value').html(wanStatus);
						}else{
							this.params["devInfoWanStatus" + wanIpV].hide();
						}
				
				}		
			}
			this.rqInx = this.rqInx+2;
			
			var ssidName = "SSID";
			var secName = "Security";
			function wifiSecStatusImg(){
				return "<img src='image/lock.png'></img>"
			}
			if(json[this.rqInx] && json[this.rqInx].resident){
				var wifi_info = json[this.rqInx].resident;
				if (wifi_info){
					var mbssidCur = wifi_info.mbssidCur-1;
					if (wifi_info.mbssid && wifi_info.mbssid[mbssidCur]) {
						if (wifi_info.mbssid[mbssidCur].SSID != undefined)
							if(hideFlag("wifi.mbssid_all.SSID")){
								this.params[ssidName].find('.value').html(wifi_info.mbssid[mbssidCur].SSID);
								this.params[secName].find('.value').html(wifi_info.mbssid[mbssidCur].AuthMode);
							}
							else{
								this.params[ssidName].find('.value').html($("<a href='#'>"+wifi_info.mbssid[mbssidCur].SSID+"</a>").click(context(this).callback(function(){
									onClickEditWifiOnStart(this, 0);
								})));
								var wifiSecStatus = "<a href='#'>"+ wifi_info.mbssid[mbssidCur].AuthMode +"</a>";
								if((wifi_info.mbssid[mbssidCur].AuthMode != 'OPEN') || (wifi_info.mbssid[mbssidCur].EncrypType == 'WEP')) {
									wifiSecStatus += wifiSecStatusImg();
								}
								this.params[secName].find('.value').html($(wifiSecStatus).click(context(this).callback(function(){
									onClickEditWifiSecOnStart(this, 0)
								})));

								if((wifi_info.mbssid[mbssidCur].AuthMode == 'OPEN') && (wifi_info.mbssid[mbssidCur].EncrypType != 'WEP')) {
									this.params[secName].find('.value>a').addClass("error");			
								} else {
									this.params[secName].find('.value>a').removeClass("error");
								}
							}
					}
					
				}
			}

			this.rqInx++;



		}
		if (!window.engine || !window.engine.candyBlack) {
			this.hideModalOverlay();
		}
		if ( window.engine.candyBlack ) {
			$('#workbenchScrollShadowTop').hide();
			setScrollbarPos();
			setScrollbarSize();			
		}
		return false;
	}
	
	
	this.causeWanDown = function(contype, wanConn){
		var ports = this.ctrl.model.json[2].resident;
		var result = null;
		var service = wanConn.L2.services[wanConn.srvname];
		if (wanConn.L2 && wanConn.L2.services && getObjectLength(wanConn.L2.services)<1){
			return "wanStatusNotCreated";
		}else{
			var status = "wanStatusNotCreated";
			for (var port in ports){
				if (wanConn.ifname == ports[port].iface){
					status = ports[port].status;
					if (status){
						if(wanConn.enable){
							//Соединение разрешено
							var con_status = null;
							switch (contype){
							case	"static":
							case	"dinamic":
							case	"statkab":
							case	"dinkab":
									con_status = null;
							break;
							case	"pppoe":
							case	"pppoa":
									if (service){
										con_status = service.ppp_state;
									}
							break;
							case	"dynpptp":
							case	"dynl2tp":
							case	"statpptp":
							case	"statl2tp":
									con_status = wanConn.ppp_state;
							break;
							}
		
						if (con_status)
							switch(con_status){
								case -1:
								case 0:
										result = "wanStatusUnknown";
								break;
								case 1:
										result = "wanStatusServerNotAvailable";
								break;
								case 2:
										result = "wanStatusPeerNegotiationFailed";
								break;
								case 3:
										result = "wanStatusPeerNotResponding";
								break;
								case 4:
										result = "wanStatusAuthFailed";
								break;
								case 100:
										result = "wanStatusRtNotSameNet";
								break;
								/*case 0:
										result = "wanStatusUserRequest";
								break;
								case 1:
										result = "wanStatusPeerNotResponding";
								break;
								case 2:
										result = "wanStatusPeerRefused";
								break;
								case 3:
										result = "wanStatusNoNetworkProtocols";
								break;
								case 4:
										result = "wanStatusAuthFailed";
								break;
								case 5:
										result = "wanStatusFailedToAuth";
								break;
								case 6:
										result = "wanStatusMppeDisabledByPeer";
								break;
								case 7:
										result = "wanStatusMppeReqButPeerNogotiationFailed";
								break;
								case 8:
										result = "wanStatusMppeReqButNotAvail";
								break;
								case 9:
										result = "wanStatusMppeReqButNotAvailInKernel";
								break;
								case 10:
										result = "wanStatusMppeReqButCannotNegotiate";
								break;
								case 11:
										result = "wanStatusCannotNegotiateMppe";
								break;
								case 12:
										result = "wanStatusCannotAdjustMtu";
								break;
								case 13:
										result = "wanStatusTooManyMppeErrors";
								break;
								case 14:
										result = "wanStatusMppeDisabled";
								break;
								case 15:
										result = "wanStatusTrafficLimit";
								break;
								case 16:
										result = "wanStatusLinkInactive";
								break;
								case 17:
										result = "wanStatusConnectTimeExpired";
								break;
								case 18:
										result = "wanStatusLoginFailed";
								break;
								case 19:
										result = "wanStatusMultilinkReq";
								break;
								case 20:
										result = "wanStatusLoopbackDetected";
								break;
								case 21:
										result = "wanStatusCallMeBack";
								break;
								case 22:
										result = "";
								break;
								case 23:
										result = "wanStatusCodeRej";
								break;*/
								
							}
							else result="wanStatusUnknown";
						}
						else{
							//Соединение запрещено
							result="disable";
						}
					}
					else{
						result="wanStatuscableDisconnect";
					}
					break;
				}
			}
		}
		
		return result;
	}


	this.bind("updmodel", this.onupdmodel);
}
extend(jsStartClientView, jsCSideView);

 
function jsStartServerView(ctrl, viewInx, options) {
	jsStartServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Выбрать свои данные из responseData.
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		var j = 1;
		if(data && data.rq){
			this.ctrl.model.json = data.rq;
		}
	}

	/**Подготовить данные для отправки на сервер.
	 */
	this.prepareData = function() {
		var rqInx = 3;
		var obj = {
			v2: "y",
			rq: rqInx,
			res_json0: "y",
			res_config_action0:  1,
			res_config_id0:  67,
			res_struct_size0: 1,
			res_json1: "y",
			res_config_action1:  1,
			res_config_id1:  1,
			res_struct_size1: 36,
			res_json2: "y",
			res_config_action2:  1,
			res_config_id2:  129,
			res_struct_size2: 1,
			res_json3: "y",
			res_config_action3:  179,
			res_config_id3:  179,
			res_struct_size3: 1,
			res_json4: "y",
			res_config_action4:  1,
			res_config_id4:  187,
			res_struct_size4: 1
		};
		obj.rq = rqInx+1;
		obj["res_json"+rqInx] = "y";
		obj["res_config_action"+rqInx] =  1;
		obj["res_config_id"+rqInx] =  35;
		obj["res_struct_size"+rqInx] = 1;
		rqInx++;
		this.addToRequest(obj);
	}
	
	this.startRefresh(0, 3000);

	this.bind("stoprefreshrq", function() {
		this.stopRefresh();
		return false;
	});
	this.bind("startrefreshrq", function(){
		this.startRefresh(0, 3000);
		return false;
	});

	/**Обработчик события updaterq (обновление).
	 */
	if (!window.engine || !window.engine.candyBlack) {
		this.onupdaterq = function() {
			this.updateView();
		}

		this.bind("updaterq", this.onupdaterq);
	}
}
extend(jsStartServerView, jsSSideView);





















	function onClickInfoVersionOnStart(obj){
		rootCtrl.event('selectpage', pFirmware);
	}
	function onClickEditLanOnStart(obj){
		rootCtrl.event('selectpage', pageLAN);
	}
	function onClickEditWifiOnStart(obj, i){
		if(i) {
			pWiFiBasic.tabInx = i;
		} else {
			pWiFiBasic.tabInx = 0;
		}
		rootCtrl.event('selectpage', pWiFiBasic);
	}
	function onClickEditWifiSecOnStart(obj, i){
		if(i) {
			pWifiSec.tabInx = i;
		} else {
			pWifiSec.tabInx = 0;
		}
		rootCtrl.event('selectpage', pWifiSec);
	}





















function pageDHCPStat(){
	pageDHCPStat.superclass.constructor.call(this);
	
	this.leases = null;
	this.rqId = -1;
	this.virgin = true;
	this.refreshTime = 10000;
	this.refreshId = null;
	
	this.updateView = function(phase){
		pageDHCPStat.superclass.updateView.apply(this, arguments);
		if (phase == 'back') {
			this.$grid = this.$box.html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid([
				{ index: "host", name: "statDhcpHost" },
				{ index: "ip", name: "ip_address" },
				{ index: "mac", name: "hwaddr" },
				{ index: "lease", name: "statDhcpExpires" }
			], 0);
			if (this.leases) {
				for(var i = 0; i < this.leases.length; i++){
					var $row = this.$grid.addRow().row("last");
					var lease = this.leases[i];
					$row.col("host").html((lease.hostname!='')?lease.hostname:"<center>-</center>");
					$row.col("ip").html(lease.ip);
					$row.col("mac").html(lease.MACAddress);
					$row.col("lease").html((lease.lease=='')?lng("statDhcpExpired"):lookTime(lease.lease).toString());
				}
			}
		}
	}
	
	this.update = function(){
		if (this.virgin) rootView.showModalOverlay();
		this.rqId = device.config.read([ 34,  193], callback(this, function(data){			
			this.leases = [];			
			//v4
			if (is.RPC_SUCCESS(data.rq[0])) {
				this.leases = this.leases.concat(data.rq[0].resident);				
			}			
			//v6
			if (is.RPC_SUCCESS(data.rq[1])) {
				this.leases = this.leases.concat(data.rq[1].resident);				
			}			
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.startRefresh(this.refreshTime);
		}));
		this.virgin = false;
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}

	this.stopRefresh = function(){
		device.stop(this.rqId);
		clearTimeout(this.refreshId);
		this.virgin = true;
		return this;
	}
	
	this.bind("updaterq", function(){
		this.stopRefresh().startRefresh(0);
	});
	this.bind("stoprefreshrq", function(){
		this.stopRefresh();
	});

}
extend(pageDHCPStat, node);






















function igmpGrid(ipVersion) {
	igmpGrid.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	this.$grid = null;
	
	//Заголовок таблицы
	var header =
				[{index: "address", name: ipVersion == 4 ? 'IPv4' : 'IPv6'}
				,{index: "iface", name: "iface"}];
				
	this.updateModel = function(status){
		status.error &= !this.$grid.cleanErrors().checkMandatory();
		this.status = status;
	}
	
	this.addRowWithData = function(ifacedata, addressdata) {
		$row = this.$grid.addRow().row("last");
		$row.col("address").fieldval(addressdata);
		$row.col("iface").fieldval(ifacedata);
	}
	
	this.updateView = function(phase){
		igmpGrid.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.$grid = this.$box.lightUIGrid(header, this.settings?this.settings.length:0);
			this.$grid.css("margin-bottom", "20px");
			this.$grid.find('table td:first-child').css("width", "70%");
		}
	}
	
	this.update = function(){
		this.deep.updateView();
	}
}
extend(igmpGrid, node);	

function pageMulticastGroups() {
	
	//Конструктор страницы
	pageMulticastGroups.superclass.constructor.call(this);
	
	this.refreshTime = 10000;	//Таймаут
	this.refreshId = null;
	this.rqId = -1;
	this.firstStart = true;		//Индикатор первой загрузки
	this.groups = [];				//Данные по IPv4
		
	//Ветка IPv4
	this.add(new igmpGrid(4), "gridv4");

	//Ветка IPv6
		
	//Обновление вида
	this.updateView = function(phase){
		pageMulticastGroups.superclass.updateView.apply(this, arguments);	
		if (phase == "forward") {}	//Изменяется при загрузке страницы
		if (phase == "back") { 		//Изменяется как-то ещё, сюда пихать изменения кнопок, таблиц и т.д.
			for (var count = 0; count < this.groups.length; count++) this.child("gridv4").addRowWithData(this.groups[count].name, this.groups[count].maddr);
					}
	}
	
	this.update = function() {
		rootView.showModalOverlay();
		this.rqId = device.config.read(206, callback(this, function(data) {
			if (is.RPC_SUCCESS(data)) {
				this.groups.length = 0;
				if (data.resident.igmp) {
					for (var i = 0; i < data.resident.igmp.length; i++) {
						//~ console.log(data.resident.igmp[i]);
						//~ this.groups[i] = _.omit(data.resident.igmp[i], "iface");
						this.groups[i]=[];
						this.groups[i].name = "";
						this.groups[i].name += data.resident.igmp[i].name;
						this.groups[i].maddr = "";
						for (var j = 0; j < data.resident.igmp[i].maddr.length; j++) {
							if (this.groups[i].maddr=="") this.groups[i].maddr += data.resident.igmp[i].maddr[j]
							else this.groups[i].maddr += "<br>"+data.resident.igmp[i].maddr[j];
						}
					}
				}
							}
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.startRefresh(this.refreshTime);
		}));
		this.firstStart = false;
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}

	this.bind("updaterq", function(){
		this.startRefresh(0);
	});
	
}
extend(pageMulticastGroups, node);





















function pageLANClientsStat(){
	pageLANClientsStat.superclass.constructor.call(this);
	
	this.arplist = null;
	this.ifacelist = null;
	this.rqId = -1;
	this.virgin = true;
	this.refreshTime = 10000;
	this.refreshId = null;
	
	this.updateView = function(phase){
		pageLANClientsStat.superclass.updateView.apply(this, arguments);
		if (phase == 'forward'){
		}
		if (phase == 'back') {			
			var header = [
				{ index: "ip", name: "ip_address" },
				{ index: "flags", name: "statLanClientsFlags" },
				{ index: "mac", name: "hwaddr" },
				{ index: "iface", name: "iface" }
			];
			this.$grid = this.$box.html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid(header, 0);
			if (this.arplist) {
				for(var i = 0; i < this.arplist.length; i++){
					var $row = this.$grid.addRow().row("last");
					var iface_name = null;
					var client = this.arplist[i];

					if(client.name){
						iface_name = client.name;
					}
					else{
						for (var iface in this.ifacelist) {
							if (this.ifacelist[iface].iface == client.iface) {
								iface_name = this.ifacelist[iface].name;
								break;
							}
						}
					}
					
					$row.col("ip").html(client.ip);
					$row.col("flags").html(client.flags);
					$row.col("mac").html(client.mac);
					$row.col("iface").html((iface_name)?iface_name:client.iface);
				}
			}
		}
	}
	
	this.update = function(){
		if (this.virgin) rootView.showModalOverlay();
		this.rqId = device.config.read([ 120,  187], callback(this, function(data){
			this.ifacelist = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.iface_names:{};
			this.arplist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.startRefresh(this.refreshTime);
		}));
		this.virgin = false;
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}

	this.stopRefresh = function(){
		device.stop(this.rqId);
		clearTimeout(this.refreshId);
		this.virgin = true;
		return this;
	}
	
	this.clealAll = function(){
		device.config.write( 187, {clear_all:true}, context(this).callback(function(data){
			rootView.hideModalOverlay();
			this.emit("updaterq");
		}));
	}
	
	
	this.bind("updaterq", function(){
		this.stopRefresh().startRefresh(0);
	});
	this.bind("stoprefreshrq", function(){
		this.stopRefresh();
	});

}
extend(pageLANClientsStat, node);





















function pageRouteStat(){
	pageRouteStat.superclass.constructor.call(this);
	
	this.routetable = null;
	this.ifacelist = null;
	this.rqId = -1;
	this.virgin = true;
	this.refreshTime = 10000;
	this.refreshId = null;
	
	this.updateView = function(phase){
		pageRouteStat.superclass.updateView.apply(this, arguments);
		if (phase == 'back') {
			this.$grid = this.$box.html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid([
				{ index: "iface", name: "iface" },
				{ index: "dest", name: "destination" },
				{ index: "gw", name: "statRouteGateway" },
				{ index: "mask", name: "masq" },
				{ index: "flags", name: "statRouteFlags" },
				{ index: "metric", name: "metric" }
			], 0);
			if (this.routetable) {
				for(var i = 0; i < this.routetable.length; i++){
					var $row = this.$grid.addRow().row("last");
					var iface_name = null;
					var rule = this.routetable[i];
					
					for (var iface in this.ifacelist) {
						if (this.ifacelist[iface].iface == rule.iface) {
							iface_name = this.ifacelist[iface].name;
							break;
						}
					}
					
					$row.col("iface").html((iface_name)?iface_name:rule.iface);
					$row.col("dest").html(checkIPv6(rule.dest));
					$row.col("gw").html(checkIPv6(rule.gw));
					$row.col("mask").html(rule.mask);
					$row.col("flags").html(rule.flags);
					$row.col("metric").html(rule.metric);
					//~ $row.col("dest").html(rule.dest);
				}
			}
		}
	}
	
	this.update = function(){
		if (this.virgin) rootView.showModalOverlay();
		this.rqId = device.config.read([ 120,  33], callback(this, function(data){
			this.ifacelist = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.iface_names:{};
			this.routetable = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
			this.startRefresh(this.refreshTime);
		}));
		this.virgin = false;
	}
	
	this.startRefresh = function(period){
		this.refreshId = setTimeout(callback(this, this.update), period);
		return this;
	}

	this.stopRefresh = function(){
		device.stop(this.rqId);
		clearTimeout(this.refreshId);
		this.virgin = true;
		return this;
	}
	
	this.bind("updaterq", function(){
		this.stopRefresh().startRefresh(0);
	});
	this.bind("stoprefreshrq", function(){
		this.stopRefresh();
	});
	
	function checkIPv6(ip) {
		var ipbuf = ip.split(':');
		if (ipbuf.length > 4) {
			for (var j = 0, ipstart = ""; j < (ipbuf.length - 1); j++) {
				ipstart += (ipbuf[j] != ":")?(ipbuf[j] + ":"):":";
				if (j == 3) {
					ipstart += "</br>";
				}
			}
			ipstart += ipbuf[ipbuf.length - 1];
			ip = ipstart;
		}
		return ip;
	}

}
extend(pageRouteStat, node);






















 
function jsStatIPSettingsModel(service){
	jsStatIPSettingsModel.superclass.constructor.call(this);
	
	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;

}
extend(jsStatIPSettingsModel, jsModel);


function jsStatIPSettingsController(service, isadding, disabled){
	jsStatIPSettingsController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsStatIPSettingsClientView, def:true};
	this.ifaceTypes.client.options = {};
	this.ifaceTypes.summary = {type: jsStatIPSettingsSummaryView};
	this.ifaceTypes.summary.options = {};
	
	this.changeModel(new jsStatIPSettingsModel(service));

	/**Признак того, что изменился IP или маска ipoe.
	 * Используется для принятия решения о корректировке пула DHCP сервера.
	 * @type bool
	 */
	this.isIpOrMaskChanged = false;
	/**Признак того, что изменился IPv6 или маска v6 ipoe.
	 * Используется для принятия решения о корректировке пула DHCP сервера.
	 * @type bool
	 */
	this.isIpOrMaskv6Changed = false;
	
	this.addChild(new jsDecorController(), "desc");
	var mask = new jsIPv4Controller(service.mask);
	this.addChild(new jsIPv4Controller(service.ip, mask), "ip");
	this.addChild(mask, "mask");
	this.addChild(new jsIPv4Controller(service.gwip), "gwip");
	this.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns");
	this.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns");
}
extend(jsStatIPSettingsController, jsFieldSetController);



function jsStatIPSettingsClientView(ctrl, viewInx, options){
	var obj;
	var service = ctrl.model.service;
	
	this.saveIP = function(){
		var postfix = "";
		var box = this;
		var service = {};
		service.ip = box.getChild("ip").ctrl.model.toString();
		service.mask = box.getChild("mask").ctrl.model.toString();
		service.gwip = box.getChild("gwip").ctrl.model.toString();
		service.dns_prim = box.getChild("primaryDns").ctrl.model.toString();
		service.dns_sec = box.getChild("secondaryDns").ctrl.model.toString();
		return service;
	}

	/**Обновить модель.*/
	this.updateModel = function(){
		var res = jsStatIPSettingsClientView.superclass.updateModel.call(this);

		if(this.ctrl.model.service.is_wan){
			res &= this.checkGateway();
		}
		if(res){
			var service = this.ctrl.model.service;
			service.type = "ip";
			$.extend(true, service, this.saveIP());
		}
		return res;
	}
	
	/**Проверить что шлюз принадлежит той-же подсети что и IP.
	 * @param	{bool}	Признак IPv6
	 * @type	bool
	 */
	this.checkGateway = function(v6){
		var postfix = "";
		var box = this;
		var res = true;
		var doCheck = false;

		var gwip = box.getChild("gwip");
		var ip = box.getChild("ip");
		var mask = box.getChild("mask");

		if(gwip.statusCode == "wanWrongGwip"){
			//Сбросить statusCode, если он был установлен этим методом
			gwip.statusCode = null;
		}
		
		doCheck = !ip.statusCode && !gwip.statusCode;
		if(!v6){
			doCheck &= !mask.statusCode;
		}

		if(doCheck){
			var ipModel = ip.ctrl.model;
			var tmpIPModel = new jsSubNetIPModel(ipModel.bits, ipModel.toString(), ipModel.radix, ipModel.delim, ipModel.expandZero, ipModel.omitFullMask);
			var gwipModel = gwip.ctrl.model;
			var tmpGwipModel = new jsSubNetIPModel(gwipModel.bits, gwipModel.toString(), gwipModel.radix, gwipModel.delim, gwipModel.expandZero, gwipModel.omitFullMask);
			if(!v6){
				var bitmask = calcBitsByMask(mask.ctrl.model.toString());
				tmpIPModel.bitmask = bitmask;
				tmpGwipModel.bitmask = bitmask;
			}
			tmpGwipModel.bitmask = tmpIPModel.bitmask;
			
			tmpIPModel.applyMask();
			tmpGwipModel.applyMask();
			res = (tmpIPModel.toString() == tmpGwipModel.toString());
			if(!res){
				gwip.statusCode = "wanWrongGwip";
				gwip.setError();
			}
		}
		return res;
	}

	/**Обработчик события изменения полей.
	 */
	this.onfieldchange = function(obj){
		var alias = obj.view.ctrl.alias;
		switch(alias){
			case "ip":
			case "mask":
				this.ctrl.isIpOrMaskChanged = true;
			break;
			case "ipv6":
				this.ctrl.isIpOrMaskv6Changed = true;
			break;
		}
		return true;
	}
	
	this.onmodeswitch = function(value){
		if(this.options.brief){
			//кратко
			this.getChild("desc").hide();
			this.getChild("secondaryDns").hide();
		}
		else{
			//подробно
			this.getChild("desc").show();
			this.getChild("secondaryDns").show();
		}
		return false;
	}
	
	this.drawView = function(){
		jsStatIPSettingsClientView.superclass.drawView.call(this);
		this.ctrl.event("modeswitch");
	}
	 
	this.blocks = service.blocks;
	
	obj = ctrl.getChild("desc");
	obj.ifaceTypes.separator.options = {};
	opt = obj.ifaceTypes.separator.options;
	opt.label = service.is_wan?"IP":null;
	opt.hide = this.blocks || !service.is_wan;

	obj = ctrl.getChild("ip");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanIp";

	obj = ctrl.getChild("mask");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanMask";




	obj = ctrl.getChild("gwip");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanGwIp";
	if (modeAP()){
		opt.optional = true;
	};

	if(window.menu_postfix != "_ap"){
		opt.hide |= !service.is_wan;
	}

	obj = ctrl.getChild("primaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanPrimDns";
	opt.hide = !service.is_wan;

	obj = ctrl.getChild("secondaryDns");
	opt = obj.ifaceTypes.client.options;
	opt.humanName = "wanSecDns";
	opt.optional = true;
	opt.hide = !service.is_wan;

	jsStatIPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	this.bind("fieldchange", this.onfieldchange);
	if(service.wizard){
		this.bind("modeswitch", this.onmodeswitch);
	}
}
extend(jsStatIPSettingsClientView, jsFieldSetClientView);

function jsStatIPSettingsSummaryView(ctrl, viewInx, options){
	jsStatIPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.updateView = function(){
		this.getChild("desc").show();
		jsStatIPSettingsSummaryView.superclass.drawView.call(this);
	}
	
}
extend(jsStatIPSettingsSummaryView, jsStatIPSettingsClientView);





























function jsSysComController(nodeInfo, frame){
	jsSysComController.superclass.constructor.call(this, nodeInfo, {});
	
	/*this.changeModel(new jsSysComModel());*/
	this.model.cmd = '';				//номер RPC
	this.model.buf = null;			//входная строка RPC
	this.model.nonblocking = false;	//тип вызова RPC (блокирующий/неблокирующий)
	this.ifaceTypes.apply = {type: jsSysComApplyView, options: {action: "index.cgi"}};

	this.onbuildsyscmd = function(){
		this.children = new Array();
		this.addChild(new jsFastmenuController({name: 'button_reboot', image: null}, {frame: this, contentOptions:{cmd:6}}));
		this.addChild(new jsFastmenuController({name: 'button_save_reboot', image: null}, {frame: this, contentOptions:{cmd:8}}));
		this.addChild(new jsFastmenuController({name: 'button_conf_save', image: null}, {frame: this, contentOptions:{cmd:20}}));
		if(!disableFlag("11")){
			this.addChild(new jsFastmenuController({name: 'button_config_download', image: null}, {frame: this, contentOptions:{cmd:12}}));
		}
		if(!disableFlag("10")){
			this.addChild(new jsFastmenuController({name: 'button_factory', image: null}, {frame: this, contentOptions:{cmd:10}}));
		}
		this.addChild(new jsFastmenuController({name: 'logout', image: null}, {frame: this, contentOptions:{cmd:'logout'}}));
		return false;
	}
	
	this.onmenuchange = function(menuCtrl){
		switch(menuCtrl.ctrl.contentOptions.cmd){
			case "logout":
				this.fillModel(null);
				this.frame.event("logoutrq");
				break;
			case 6:
				this.fillModel(menuCtrl);
				this.frame.event("rebootrq");
				break;
			case 10:
				this.fillModel(menuCtrl);
				this.frame.event("resetrebootrq");
				break;			
			default:
				this.fillModel(menuCtrl);
				break;
		}
		return false;
	}

	/* Name:		fillModel
	* Description: 	заполнить модель на основе выбранного меню
	* Arguments:	menuCtrl - ссылка на контроллер активного меню                                                                                       
	* Return value:	нет
	* Notes:		
	*/
	this.fillModel = function(menuCtrl){
		if(menuCtrl){
			this.model.cmd = menuCtrl.ctrl.contentOptions.cmd;
			this.model.buf = menuCtrl.ctrl.contentOptions.buf;
			this.model.nonblocking = menuCtrl.ctrl.contentOptions.nonblocking;
		}
		else{
			this.model.cmd = null;
			this.model.buf = null;
			this.model.nonblocking = false;
		}
	}
	
	this.frame = frame;
	this.addEventHandler("menuchange", this.onmenuchange);
	this.addEventHandler("buildsyscmd", this.onbuildsyscmd);
}
extend(jsSysComController, jsFastmenuController);


function jsSysComApplyView(ctrl, viewInx, options){
	jsSysComApplyView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		var frame = this.ctrl.frame;
		var status = this.options.sender.responseData.status;
		if(status == 20 || status == 12){
			switch(this.ctrl.model.cmd){
				case 6:		//6
					break;
				case 8:		//8
					break;
				case 20:	//20
					frame.event("save");
					break;
				case 14:	//14
					//логика работы нарушена, пока нет своего элемента для аплоада файлов
					//инициирует перешивку главный фрейм через jsSysComController, подменяя реальный menuCtrl на {contentOptions:{cmd:14}}
					//игнорируем завершение RPC, как и в прочих командах с ребутом
					break;
				case 11:	//11
					frame.event("cfgrestoreok", status);
					break;
				case 12:	//12
					//отдать юзеру конфигурационный файл
					goto_page("index.cgi?v2_action=givemeconfig&tokenget=" + device.tokenget(), true);
					break;
				case 10:	//10
					break;
				case  38:
					break;
				default:
					frame.event("syscmdcomplete", status);
					break;
			}
		}
		else{
			switch(this.ctrl.model.cmd){
				case 6:		//6
					break;
				case 8:		//8
					break;
				case 14:	//14
					//логика работы нарушена, пока нет своего элемента для аплоада файлов
					//инициирует перешивку главный фрейм через jsSysComController, подменяя реальный menuCtrl на {contentOptions:{cmd:14}}
					//игнорируем завершение RPC, как и в прочих командах с ребутом
					break;
				case 11:	//11
					break;
				case 10:	//10
					break;
				default:
					frame.event("syscmdcomplete", status);
					break;
			}
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
		var frame = this.ctrl.frame;
		var model = this.ctrl.model;

		obj["res_cmd"] = model.cmd;
		obj["res_buf"] = model.buf;
		obj["res_cmd_type"] = model.nonblocking?"nbl":"bl";
		obj["v2"] = "y";
		obj["rq"] = "y";
		this.addToRequest(obj);

		switch(this.ctrl.model.cmd){
			case 6:
				frame.event("startreboot");
				break;				
			case 8:
				frame.event("startsavereboot");
				break;				
			case 10:
				frame.event("startresetreboot");
				break;				
			case 14:
				frame.event("startfwupdate");
				break;				
		}
	}
	

	/* Name:		onmenuchange
	* Description: 	обработчик события menuchange
	* Arguments:	menuCtrl - ссылка на контроллер активного меню                                                                                       
	* Return value:	true - всплывает, false - не всплывает
	* Notes:		запускается всякий раз, когда активируется menuCtrl
	*/
	this.onmenuchange = function(menuCtrl){
		switch(menuCtrl.ctrl.contentOptions.cmd){
			case "logout":			//игнорируем т.к. не нужен запрос к серверу
				break;
			case 6:					//игнорируем т.к. нужен запрос к юзеру
				break;
			case 10:				//игнорируем т.к. нужен запрос к юзеру
				break;
			case 8:
				if(confirm(lng("confirm_savereboot"))){
					this.updateView();
				}
				break;
			default:
				this.updateView();	//выполняем без подтверждения
				break;
		}
		return false;
	}

	/* Name:		oncmdcfm
	* Description: 	обработчик события rebootcfm (command confirm)
	* Arguments:	нет                                                                                       
	* Return value:	true - всплывает, false - не всплывает
	* Notes:		запускается всякий раз, когда приходит подтверждение на выполнение команды
	* 				модель к этому моменту должнабыть актуальной
	*/
	this.oncmdcfm = function(){
		this.updateView();
		return false;
	}

	this.bind("menuchange", this.onmenuchange);	
	this.bind("cmdcfm", this.oncmdcfm);	
}
extend(jsSysComApplyView, jsSSideView);






















function pageSyslogConf(){
	pageSyslogConf.superclass.constructor.call(this);
	
	this.conf = null;
	var types = { slLocal: "local", slRemote: "remote", slBoth: "both" };
	var levels = { "slLevel0": 0 , "slLevel1": 1, "slLevel2": 2, "slLevel3": 3, "slLevel4": 4, "slLevel5": 5, "slLevel6": 6, "slLevel7": 7 };

	this.add(new nodeCheckBox("slLogging", false), "enable")
		.add(new node({
			hidden: true
		}), "settings")
		.child("settings")
		.add(new nodeSelect("slType", "local"), "type")
		.add(new nodeSelect("slLevel", 0), "level")
		.add(new nodetext("slServer", "", {
			mandatory: true,
			hidden: true,
			re: [
				function(value){
					return (new RegExp("^([a-z][a-z0-9\-]+(\.|\-*\.))+[a-z]{2,6}$").test(value) || validate_ip_address(value))?null:'slServerWrong';
				}
			]
		}), "server")
		.add(new nodenum("port", 514, {
			minval: 1,
			maxval: 65535,
			mandatory: true,
			hidden: true
		}), "port");
	
	var settings = this.child("settings");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageSyslogConf.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()) {
						this.save(
							this.child("enable").val(),
							settings.child("type").val(),
							parseInt(settings.child("level").val()),
							null,
							settings.child("server").val(),
							settings.child("port").val()
						);
					}
				}));
		}
		if (phase == "back") {
			var type = this.child("settings/type").cleanOptions();
			for(var t in types){
				if (t) type.addOption(t, types[t]);
			}
			var level = this.child("settings/level").cleanOptions();
			for(var l in levels){
				if (l) level.addOption(l, levels[l]);
			}
		}
	}
	
	this.save = function(enable, type, level, rlevel, server, port) {
		rootView.showModalOverlay();
		this.conf = {
			'enable': enable,
			'type': (enable)?type:this.conf.type,
			'level': (enable)?level:this.conf.level,
			'server': (enable&&type!='local')?server:this.conf.server,
			'port': (enable&&type!='local')?port:this.conf.port
		};
		device.config.write( 63, this.conf, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 63, callback(this, function(data){
			this.deep.updateView();
			this.conf = (is.RPC_SUCCESS(data))?data.resident:null;
			if (this.conf) {
				this.child("enable").val(this.conf.enable).fieldchange();
				settings.child("level").val(this.conf.level);
				settings.child("type").val(this.conf.type).fieldchange();
				settings.child("server").val(this.conf.server);
				settings.child("port").val(this.conf.port);
			}
			rootView.hideModalOverlay();
		}));
	});
	
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				if (value) settings.show(); else settings.hide();
			break;
			case "type":
				switch (value){
					case 'local':
						settings.child("level").enable();
						settings.child("server").hide();
						settings.child("port").hide();
					break;
					case 'remote':
						settings.child("server").show();
						settings.child("port").show();
						settings.child("level").enable();
					break;
					case 'both':
						settings.child("level").enable();
						settings.child("server").show();
						settings.child("port").show();
					break;
				}
			break;
		}
	});
}
extend(pageSyslogConf, node);























function pageTelnet(){
	pageTelnet.superclass.constructor.call(this);
	
	this.json = null;
	this.CONFIG_ID =  152;
	
	this.updateModel = function(status){
		this.status = status;
		if(!status.error){
			this.json = {
				'enable': this.get("enable").val()
			};
			this.json.port = parseInt(this.child("port").val());
		}
		this.jsonOutObj = { telnet: this.json };
		return !status.error;
	}
	
	this.updateView = function(phase){
		pageTelnet.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(
							this.child("enable").val()
							,parseInt(this.child("port").val())
						);
					}
				}));
		}
	}
	
	this.save = function(enable, port) {
		if(this.deep.updateModel()){
			var query = this.query = { write: [] };
			query.write.push([this.CONFIG_ID, this.jsonOutObj]);

			rootView.showModalOverlay();
			device.config.multi(query, callback(this, function(data){
				rootView.hideModalOverlay();
				this.emit("updaterq");
			}));
		}
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();

			var query = [this.CONFIG_ID];

			device.config.read(query, callback(this, function(data){
				try{
					this.json = data.rq[0].resident.telnet;
	
					this.startForm()
						.add(new nodeCaption("telnetLabel","telnetDescText"))
						.add(new nodeCheckBox("telnetOn", this.json.enable), "enable");
					this.add(new nodenum("telnetPort", this.json.port, {
							minval: 1,
							maxval: 65535,
							disabled: true,
							mandatory: true
						}), "port");
	
					this.listen("enable", "endform fieldchange", function(status, value){
						var port = this.child("port");
						if (value) port.enable(); else port.disable();
					});
						
					this.endForm();
	
					this.deep.updateView();
					rootView.hideModalOverlay();
				}
				catch(e){
					this.deep.updateView().$box.errorBlock(lng("error"), e.message);
				}
			}));

	});

}
extend(pageTelnet, node);






















 
function jsTextareaController(value){
	jsTextareaController.superclass.constructor.call(this);

	this.ifaceTypes.textarea = {type: jsInputSlotView};
	
	this.addChild(new jsTextareaFieldController(value), "field");
	this.changeModel(this.getChild("field").model);
	
}
extend(jsTextareaController, jsEditController);

function jsTextareaFieldController(value){
	jsTextareaFieldController.superclass.constructor.call(this);
	
	this.ifaceTypes.textarea = {type: jsTextareaClientView};
	
	this.changeModel(new jsInputModel(value));

	
	/**Признак того, что хотя бы в одном из представлений поле было изменено.
	 * @type	bool
	 */
	this.modified = false;
	
	/**Обработчик "fieldchange".
	 * Устанавливает признак того, что хотя бы в одном из представлений поле было изменено.
	 */
	this.setModified = function(obj){
		this.modified = true;
		return true;
	}

	this.addEventHandler("fieldchange", this.setModified);
}
extend(jsTextareaFieldController, jsController);

 
function jsTextareaClientView(ctrl, viewInx, options){
	jsTextareaClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsTextareaClientView.prototype.drawView = function(){
		jsTextareaClientView.superclass.drawView.call(this);
		
		var htmlToDraw = "";
		var options = this.options;
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
			htmlToDraw  = "<textarea id='" + this.inputId + "' type='";
			htmlToDraw += options.password?"password":"text";
			htmlToDraw += "'/>";
		}

		this.html(htmlToDraw);

		this.$input.bind("keyup", context(this).callback(this.onfieldchangejq));
	}

	jsTextareaClientView.prototype.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsTextareaClientView.superclass.updateModel.call(this);
	}

	jsTextareaClientView.prototype.updateView = function(){
		this.val(this.ctrl.model.value);
		jsTextareaClientView.superclass.updateView.call(this);
	}
}
extend(jsTextareaClientView, jsBaseInputView);






















 



function pageTR69(){
	pageTR69.superclass.constructor.call(this);
	
	this.tr69 = null;
	this.ifacelist = null;
	this.conns = {};
		this.add(new nodeCaption("TR69Label","TR69DescText"));
	
	var settings = this.add(new node({
	}), "settings").child("settings");
	settings.add(new nodeSelect("iface"), "iface");

	settings.add(new nodeCheckBox("tr69OnOff"), "onoff");
	
	settings.add(new nodeCaption("tr69LabelInform"))
		.add(new nodeCheckBox("tr69Enable"), "enable")
		.add(new nodenum("tr69Interval", 86400), "interval");
	settings.add(new nodeCaption("tr69LabelAcs"))
		.add(new nodetext("tr69URL"), "acs_url");
	settings.add(new nodetext("tr69UserName"), "acs_user")
		.add(new nodetext("tr69Password", '', {
			password: true
		}), "acs_password")
		.add(new nodeCaption("tr69LabelConn"))
		.add(new nodetext("tr69UserName"), "conn_user")
		.add(new nodetext("tr69Password", '', {
			password: true
		}), "conn_password")		
		.add(new nodenum("tr69ConnReqPort", "", {minval: 1, maxval: 65535}), "conn_port")
		.add(new nodetext("tr69ConnReqPath", "", 
			{
			}
		), "conn_path");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageTR69.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			var iface = this.child("settings/iface").cleanOptions();
			var connArr = getConnArray(this.ifacelist);
			var obj;
			iface.addOption("wanAuto", "ANY_WAN")
			for (var i in connArr){
				obj = connArr[i];
				iface.addOption(obj.name, obj.iface);
				this.conns[obj.iface] = obj;
			}
			var tr69 = this.tr69;
			if (tr69) {
				settings.child("iface").val(tr69.iface);
				settings.child("acs_url").val(tr69.AcsURL);
				settings.child("onoff").val(tr69.Enable);
				settings.child("enable").val(tr69.InformEnable);
				settings.child("interval").val(tr69.InformInterval);
				settings.child("acs_user").val(tr69.AcsUser);
				settings.child("acs_password").val(tr69.AcsPwd);
				settings.child("conn_user").val(tr69.ConnReqUser);
				settings.child("conn_password").val(tr69.ConnReqPwd);
				settings.child("conn_port").val(tr69.ConnReqPort);
				settings.child("conn_path").val(tr69.ConnReqPath);				
			}
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()){
						this.save();
					}
				}));
		}
	}

	this.save = function() {
		rootView.showModalOverlay();
		this.tr69 = {
			'Enable': settings.child("onoff").val(),
			'InformEnable': settings.child("enable").val(),
			'InformInterval': settings.child("interval").val().toString(),
			'AcsURL': settings.child("acs_url").val(),
			'AcsUser': settings.child("acs_user").val(),
			'AcsPwd': settings.child("acs_password").val(),
			'ConnReqUser': settings.child("conn_user").val(),
			'ConnReqPwd': settings.child("conn_password").val(),
			'ConnReqPort': settings.child("conn_port").val(),
			'ConnReqPath': settings.child("conn_path").val()			
		};
		var iface = settings.child("iface").val()
		this.tr69.iface = iface;
		//вспомогательные ключи для удобства системы
		var conn = this.conns[iface];
		if(conn){
			this.tr69.l2_key = conn.L2.ifname;
			if(conn.L3)
				this.tr69.l3_key = conn.L3.ifname;
			else
				this.tr69.l3_key = conn.ifname;
		}
		device.config.write( 70, this.tr69, callback(this, function(){
			rootView.hideModalOverlay();
			this.emit("updaterq");
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		//В одном запросе нельзя дёргать обе рпц из-за невозможности применить разовую авторизацию
		device.config.read( 1, callback(this, function(data){
			this.ifacelist = (is.RPC_SUCCESS(data))?data.resident.iface_names:{};
		}));
		device.config.read( 70, callback(this, function(data){
			this.tr69 = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	});
}
extend(pageTR69, node);























function pageTraceroute(){
	pageTraceroute.superclass.constructor.call(this);
	
	this.updateView = function(phase){
		pageTraceroute.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_start")
				.getButton("button_start")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (this.status && !this.status.error) {
						this.traceroute();
					}
				}));
			
			this.startForm()
				.add(new nodeCaption("tracerouteLabel", "tracerouteDescText"))
				.add(new nodetext("troHost","", {
						mandatory: true
					}),"troHost")
			this.add(new node(), "troLog")
				.endForm();		
		}
	}
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.traceroute = function(){
		rootView.showModalOverlay();
		var outObj = {
			host: this.child('troHost').val()
		};
		device.config.write( 166, outObj, callback(this,function(answer){
			if (answer.resident){
				rootView.hideModalOverlay();
				var textLog = null;
				if (answer.resident.traceroute)
					textLog = answer.resident.traceroute;
				var log = this.child("troLog");
				log.$box.html($("\
					<div class='console syslog'>\
						<pre>" + textLog + "</pre>\
					</div>\
				"));
			}	
		}));
	}
	
	this.bind("updaterq", function(){
		this.deep.updateView();
	});
}
extend(pageTraceroute, node);























function pageTransmissionSettings(){
	pageTransmissionSettings.superclass.constructor.call(this);

	this.ifacelist = null;
	this.settings = null;
	
	this.add(new nodeCaption("transetLabel","transetDescText"))

	this.add(new node(), "setting")
		.child("setting")
		//~ .add(new nodeCaption("transetLabel","transetDescText"))
		.add(new nodeCheckBox("enable", false), "enable")

		.add(new nodenum("port", 52666, {minval: 1, maxval: 65535, mandatory: true}), "peer_port")

		.add(new nodetext("transetMainDir", "torrents", {mandatory: true}), "main_dir")
		.add(new nodeSelect("transetDeviceDir", {mandatory: true}), "device_dir")

		.add(new nodenum("transetRpcPort", 9091, {minval: 1, maxval: 65535, mandatory: true}), "rpc_port")
		.add(new nodenum("transetOpenFilesLimit", 1, {minval: 1, maxval: 65535, mandatory: true}), "open_files_limit")
		.add(new nodenum("transetPeerLimit", 10, {minval: 1, maxval: 65535, mandatory: true}), "peer_limit")

		.add(new nodeCheckBox("authTitle", false), "using_auth")
		.add(new nodetext("transetUser", "", {mandatory: true}), "user")
		.add(new nodetext("passw", "", {mandatory: true}), "pass")
		.add(new nodestatic("transetWebIface", ""), "link");
	this.add(new node({ hidden: true }), "error")
		.child("error")
		.add(new nodestatic("usbStorage", ''), "desc");
		
	this.updateModel = function(status){
		this.status = status;
	}

	this.updateView = function(phase){
		pageTransmissionSettings.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save([
							this.child("setting/enable").val(),
							this.child("setting/peer_port").val(),
							this.child("setting/main_dir").val(),
							this.child("setting/device_dir").val(),
							this.child("setting/rpc_port").val(),
							this.child("setting/open_files_limit").val(),
							this.child("setting/peer_limit").val(),
							this.child("setting/using_auth").val(),
							this.child("setting/user").val(),
							this.child("setting/pass").val()
							]
						);
					}
				}));
		}
	}

	this.save = function(params) {
		rootView.showModalOverlay();
		this.settings = {
			"enable":		params[0],
			"peer-port":	params[0]?params[1]:this.settings["peer-port"],
			"main-dir":		params[0]?params[2]:this.settings["main-dir"],
			"device-dir":	params[0]?params[3]:this.settings["device-dir"],
			"rpc-port":		params[0]?params[4]:this.settings["rpc-port"],
			"open-files-limit":	params[0]?params[5]:this.settings["open-files-limit"],
			"peer-limit":	params[0]?params[6]:this.settings["peer-limit"],
			"using-auth":	params[0]?params[7]:this.settings["using-auth"],
			"user":			(params[0] && params[7])?params[8]:this.settings["user"],
			"pass":			(params[0] && params[7])?params[9]:this.settings["pass"]
		};
		device.config.write( 177, this.settings, callback(this, function(){
			rootView.hideModalOverlay();
			this.emit("updaterq");
		}));
	}


	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([ 177, 82], callback(this, function(data){
			this.deep.updateView();
			
			this.settings = null;
			if (is.RPC_SUCCESS(data.rq[0])) {
				if (data.rq[0].resident && data.rq[0].resident.transmission) {
					this.settings = data.rq[0].resident.transmission;
				} else {
					this.settings = data.rq[0].resident;
				}
			} else {
				this.settings = null;
			}
			
			if (is.RPC_SUCCESS(data.rq[1])) {					
				this.child("setting/device_dir").cleanOptions();
				if ( Object.keys(data.rq[1].resident.usb_storage).length > 0 ) {
					for ( var usb in data.rq[1].resident.usb_storage ) {
						this.child("setting/device_dir").addOption(usb,"/tmp/mnt/"+usb);
					}
				} else {
					this.child("setting/device_dir").$box.find(".input").html(lng("transetNoDevice"));
				}				
			}

			if (!data.rq[1].resident) {
				this.child("setting").hide();
				this.cleanButtonBar();
				this.child("error/desc").val("<img src='image/ledred.gif' /> <span langkey='usb_not_exist'>" + lng("usb_not_exist") + "</span>");
				this.child("error").show();  
			} else {
				if (_.isEmpty(data.rq[1].resident.usb_storage)) {
					this.child("setting").hide();
					this.cleanButtonBar();
					this.child("error/desc").val("<img src='image/ledred.gif' /> <span langkey='usb_disconnected'>" + lng("usb_disconnected") + "</span>");
					this.child("error").show();  
				} else {
					this.child("error").hide();
					this.child("setting").show();
					
					if (this.settings) {
						this.child("setting/enable").val(this.settings.enable);
						this.child("setting/enable").fieldchange();

						this.child("setting/peer_port").val(this.settings["peer-port"]);
						this.child("setting/main_dir").val(this.settings["main-dir"]);
						
						this.child("setting/device_dir").val(this.settings["device-dir"]);
						this.child("setting/device_dir").correctValue();

						this.child("setting/rpc_port").val(this.settings["rpc-port"]);
						this.child("setting/open_files_limit").val(this.settings["open-files-limit"]);
						this.child("setting/peer_limit").val(this.settings["peer-limit"]);

						this.child("setting/using_auth").val(this.settings["using-auth"]);
						this.child("setting/using_auth").fieldchange();

						this.child("setting/user").val(this.settings["user"]);
						this.child("setting/pass").val(this.settings["pass"]);
						this.child("setting/link").val("<a href='" + document.location.protocol + "//" + document.location.hostname + ":" + this.settings["rpc-port"] + "' target='_blank'>" + document.location.protocol + "//" + document.location.hostname + ":" + this.settings["rpc-port"] + "</a>");
					}
				}
				if (!window.engine.simpleAir){
					var freakBar = rootCtrl.getChild("widgetgrid", "transmission", "freakBar");
					freakBar.model.Settings = this.settings;
					freakBar.event("updmodel");
				}
			}
			rootView.hideModalOverlay();
		}));
	});

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				if (value) {
					this.child("setting/peer_port").show();
					this.child("setting/main_dir").show();
					this.child("setting/device_dir").show();
					this.child("setting/rpc_port").show();
					this.child("setting/open_files_limit").show();
					this.child("setting/peer_limit").show();
					this.child("setting/using_auth").show();
					this.child("setting/user").show();
					this.child("setting/pass").show();
					this.child("setting/link").show();
				} else {
					this.child("setting/peer_port").hide();
					this.child("setting/main_dir").hide();
					this.child("setting/device_dir").hide();
					this.child("setting/rpc_port").hide();
					this.child("setting/open_files_limit").hide();
					this.child("setting/peer_limit").hide();
					this.child("setting/using_auth").hide();
					this.child("setting/user").hide();
					this.child("setting/pass").hide();
					this.child("setting/link").hide();
				}
			break;
			case "using_auth":
				var iface = this.child("setting/iface");
				if (value) {
					this.child("setting/user").enable();
					this.child("setting/pass").enable();
				} else {
					this.child("setting/user").disable();
					this.child("setting/pass").disable();
				}
			break;
		}
	});
}
extend(pageTransmissionSettings, node);





















 
function jsTunnelModel(tunnel, service, ifnode, isadding, iftree){
	jsTunnelModel.superclass.constructor.call(this);
	
	/**узел интерфейса тоннеля.
	 * @type	Object
	 */
	this.tunnel = tunnel;
	
	/**узел L3 интерфейса.
	 * @type	Object
	 */
	this.service = service;

	/**Узел L2 интерфейса.
	 * @type	Object
	 */
	this.ifnode = ifnode;

	/**Дерево интерфейсов.
	 * @type	Object
	 */
	this.iftree = iftree;
	this.isadding = isadding;
}
extend(jsTunnelModel, jsModel);


function jsTunnelController(tunnel ,service, ifnode, isadding,iftree) {	
	jsTunnelController.superclass.constructor.call(this);
	this.changeModel(new jsTunnelModel(tunnel ,service, ifnode, isadding,iftree));
		var divTunnel = this.addChild(new jsFieldSetController(), "divTunnel");
		divTunnel.addChild(new jsPPPController(tunnel, service, ifnode, iftree, isadding), "PPP");
	
	this.ifaceTypes.client = {type: jsTunnelClientView};
	this.ifaceTypes.client.options = {inputPadding: "200px"};
}
extend(jsTunnelController, jsFieldSetController);

function jsTunnelClientView(ctrl, viewInx, options){
	var obj;
	//var opt;
	var ifnode = ctrl.model.ifnode;
	var service = ctrl.model.service;
	var tunnel = ctrl.model.tunnel;
	var tree = ctrl.model.iftree;
	var type;
	if (tunnel) type = tunnel.type; else type = ctrl.model.service.contype; 

	//---------PPP settings
	var divTunnel = ctrl.getChild("divTunnel");
	divTunnel.nextIface = "client";
	divTunnel.ifaceTypes.client.options = {nothing: true};
	if (type == "pptp" || type == "l2tp") divTunnel.ifaceTypes.client.options.hide = false; else divTunnel.ifaceTypes.client.options.hide = true; 
	
	obj = divTunnel.getChild("PPP");
	obj.nextIface = "client";
	opt = obj.ifaceTypes.client.options;
	
	this.updateView = function() {
		if (service.contype=="l2tp" || service.contype=="pptp") this.getChild("divTunnel").show();
		else this.getChild("divTunnel").hide();
		jsTunnelClientView.superclass.updateView.call(this);
		}
	
	this.updateModel = function() {
		ctrl.model.service=ctrl.getChild("divTunnel").getChild("PPP").model.service;
		return 1;
		}
		
jsTunnelClientView.superclass.constructor.call(this, ctrl, viewInx, options);
}
extend(jsTunnelClientView, jsFieldSetClientView);





















function jsUMountController(){
	jsUMountController.superclass.constructor.call(this);
	
	this.model = {
		'devList': []
	};
	
	this.ifaceTypes.client = {type: jsUMountClientView, def: true};
	this.ifaceTypes.server = {type: jsUMountServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.nextIface = "server";
	this.addIface();
}
extend(jsUMountController, jsController);



function jsUMountClientView(ctrl, viewInx, options){
	jsUMountClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.eject = function() {
		if (this.ctrl.model.devList.length || this.mounted) {
			if (confirm(lng("storInfoUnmountConfirm"))){
				this.ctrl.event("umountrq");
			}
		}
	}

	jsUMountClientView.prototype.drawView = function(){
		jsUMountClientView.superclass.drawView.call(this);
		
		var htmlToDraw = '';
		var options = this.options;
		this.myBoxSel = this.viewBoxSel+'>img:eq(0)';
		this.preloaderSel = this.viewBoxSel+'>img:eq(1)';
		
		htmlToDraw	=	"<img src='image/eject.gif' title='" + lng('umount_usb') + "' class='umount unselectable' />";
		htmlToDraw	+=	"<img src='image/preloader.gif' class='preloader' />";
		
		$(this.viewBoxSel).html(htmlToDraw);
		this.ctrl.event('updaterq');
	}
	
	this.setEjectAction = function() {
		$(this.myBoxSel).fadeTo(0, 1);
		$(this.myBoxSel).css('cursor', 'pointer');
		$(this.myBoxSel).unbind('click');
		$(this.myBoxSel).bind('click', context(this).callback(this.eject));
	}
	
	this.unsetEjectAction = function() {
		$(this.myBoxSel).fadeTo(0, 0.2);
		$(this.myBoxSel).css('cursor', 'default');
		$(this.myBoxSel).unbind('click');
	}
	
	/**Обработчик события updaterq (обновление).
	 */
	this.onupdaterq = function() {
		$(this.myBoxSel).hide();
		$(this.preloaderSel).show();
	}
	
	/**Обработка события updmodel.
	  * @param	model	Модель.
	  */
	this.onupdmodel = function(model){

		var devList = this.ctrl.model.devList = [];
		var usb_storage = this.ctrl.model.usb_storage;
		if(usb_storage){
			for (var dev in usb_storage) {
				devList.push(dev);
			}
		}

		$(this.preloaderSel).hide();
		$(this.myBoxSel).show();
		
		if (this.ctrl.model.devList.length) {
			this.setEjectAction();
		} else {
			this.unsetEjectAction();
		}
		return false;
	}
	
	this.onsetaction = function(mounted){
		if (mounted) {
			this.mounted = true;
			this.setEjectAction();
		} else {
			this.mounted = false;
			this.unsetEjectAction();
		}
		return false;
	}
	
	this.bind("updaterq", this.onupdaterq);
	this.bind("umountrq", this.onupdaterq);
	this.bind("updmodel", this.onupdmodel);
	this.bind("setaction", this.onsetaction);
}
extend(jsUMountClientView, jsCSideView);

 
function jsUMountServerView(ctrl, viewInx, options){
	jsUMountServerView.superclass.constructor.call(this, ctrl, viewInx, options);

	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function() {
		var data = this.options.sender.responseData;
		this.ctrl.model.StorageData = [];
		delete this.ctrl.model.usb_storage;
		if(data && !data.baddata && data.resident){
			this.ctrl.model.usb_storage = data.resident.usb_storage;
		}
		if (this.mode && this.mode != "update") {
			this.ctrl.event("updaterq");
		}
	}

	/* Name:			prepareData
	 * Description: 	подготовить данные для отправки на сервер
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.prepareData = function() {
		var obj;
		var jsonOutObj;

		switch(this.mode){
			case "update":
				obj = {
					v2: "y",
					rq: "y",
					res_json: "y",
					res_config_action:  1,
					res_config_id:  82,
					res_struct_size: 0
				};
				this.addToRequest(obj);
			break;
			case "umount":
				var devList = this.ctrl.model.devList;
				obj = {
					v2: "y",
					rq: devList.length/*,
					res_data_type: "json",*/
				};
				for (var i = 0; i < devList.length; i++) {
					obj['res_json'+i] = 'y';
					obj['res_config_action'+i] =  3;
					obj['res_config_id'+i] =  154;
					obj['res_struct_size'+i] = 1;
					obj['res_buf'+i] = $.toJSON({
						name: devList[i]
					});
				}
				this.addToRequest(obj);
			break;
		}
	}

	/* Name:			onupdaterq
	 * Description: 	обработчик события updaterq (обновление)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onupdaterq = function() {
		this.mode = "update";
		this.updateView();
	}

	/**Обработчик события umountrq (размонтирование).
	 */
	this.onumountrq = function() {
		this.mode = "umount";
		this.updateView();
	}

	this.mode = "update";			//"save"
	this.bind("updaterq", this.onupdaterq);
	this.bind("umountrq", this.onumountrq);
}
extend(jsUMountServerView, jsSSideView);

//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r={},e=Array.prototype,u=Object.prototype,i=Function.prototype,a=e.push,o=e.slice,c=e.concat,l=u.toString,f=u.hasOwnProperty,s=e.forEach,p=e.map,h=e.reduce,v=e.reduceRight,g=e.filter,d=e.every,m=e.some,y=e.indexOf,b=e.lastIndexOf,x=Array.isArray,w=Object.keys,_=i.bind,j=function(n){return n instanceof j?n:this instanceof j?void(this._wrapped=n):new j(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=j),exports._=j):n._=j,j.VERSION="1.6.0";var A=j.each=j.forEach=function(n,t,e){if(null==n)return n;if(s&&n.forEach===s)n.forEach(t,e);else if(n.length===+n.length){for(var u=0,i=n.length;i>u;u++)if(t.call(e,n[u],u,n)===r)return}else for(var a=j.keys(n),u=0,i=a.length;i>u;u++)if(t.call(e,n[a[u]],a[u],n)===r)return;return n};j.map=j.collect=function(n,t,r){var e=[];return null==n?e:p&&n.map===p?n.map(t,r):(A(n,function(n,u,i){e.push(t.call(r,n,u,i))}),e)};var O="Reduce of empty array with no initial value";j.reduce=j.foldl=j.inject=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),h&&n.reduce===h)return e&&(t=j.bind(t,e)),u?n.reduce(t,r):n.reduce(t);if(A(n,function(n,i,a){u?r=t.call(e,r,n,i,a):(r=n,u=!0)}),!u)throw new TypeError(O);return r},j.reduceRight=j.foldr=function(n,t,r,e){var u=arguments.length>2;if(null==n&&(n=[]),v&&n.reduceRight===v)return e&&(t=j.bind(t,e)),u?n.reduceRight(t,r):n.reduceRight(t);var i=n.length;if(i!==+i){var a=j.keys(n);i=a.length}if(A(n,function(o,c,l){c=a?a[--i]:--i,u?r=t.call(e,r,n[c],c,l):(r=n[c],u=!0)}),!u)throw new TypeError(O);return r},j.find=j.detect=function(n,t,r){var e;return k(n,function(n,u,i){return t.call(r,n,u,i)?(e=n,!0):void 0}),e},j.filter=j.select=function(n,t,r){var e=[];return null==n?e:g&&n.filter===g?n.filter(t,r):(A(n,function(n,u,i){t.call(r,n,u,i)&&e.push(n)}),e)},j.reject=function(n,t,r){return j.filter(n,function(n,e,u){return!t.call(r,n,e,u)},r)},j.every=j.all=function(n,t,e){t||(t=j.identity);var u=!0;return null==n?u:d&&n.every===d?n.every(t,e):(A(n,function(n,i,a){return(u=u&&t.call(e,n,i,a))?void 0:r}),!!u)};var k=j.some=j.any=function(n,t,e){t||(t=j.identity);var u=!1;return null==n?u:m&&n.some===m?n.some(t,e):(A(n,function(n,i,a){return u||(u=t.call(e,n,i,a))?r:void 0}),!!u)};j.contains=j.include=function(n,t){return null==n?!1:y&&n.indexOf===y?n.indexOf(t)!=-1:k(n,function(n){return n===t})},j.invoke=function(n,t){var r=o.call(arguments,2),e=j.isFunction(t);return j.map(n,function(n){return(e?t:n[t]).apply(n,r)})},j.pluck=function(n,t){return j.map(n,j.property(t))},j.where=function(n,t){return j.filter(n,j.matches(t))},j.findWhere=function(n,t){return j.find(n,j.matches(t))},j.max=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.max.apply(Math,n);var e=-1/0,u=-1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;o>u&&(e=n,u=o)}),e},j.min=function(n,t,r){if(!t&&j.isArray(n)&&n[0]===+n[0]&&n.length<65535)return Math.min.apply(Math,n);var e=1/0,u=1/0;return A(n,function(n,i,a){var o=t?t.call(r,n,i,a):n;u>o&&(e=n,u=o)}),e},j.shuffle=function(n){var t,r=0,e=[];return A(n,function(n){t=j.random(r++),e[r-1]=e[t],e[t]=n}),e},j.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=j.values(n)),n[j.random(n.length-1)]):j.shuffle(n).slice(0,Math.max(0,t))};var E=function(n){return null==n?j.identity:j.isFunction(n)?n:j.property(n)};j.sortBy=function(n,t,r){return t=E(t),j.pluck(j.map(n,function(n,e,u){return{value:n,index:e,criteria:t.call(r,n,e,u)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=E(r),A(t,function(i,a){var o=r.call(e,i,a,t);n(u,o,i)}),u}};j.groupBy=F(function(n,t,r){j.has(n,t)?n[t].push(r):n[t]=[r]}),j.indexBy=F(function(n,t,r){n[t]=r}),j.countBy=F(function(n,t){j.has(n,t)?n[t]++:n[t]=1}),j.sortedIndex=function(n,t,r,e){r=E(r);for(var u=r.call(e,t),i=0,a=n.length;a>i;){var o=i+a>>>1;r.call(e,n[o])<u?i=o+1:a=o}return i},j.toArray=function(n){return n?j.isArray(n)?o.call(n):n.length===+n.length?j.map(n,j.identity):j.values(n):[]},j.size=function(n){return null==n?0:n.length===+n.length?n.length:j.keys(n).length},j.first=j.head=j.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:o.call(n,0,t)},j.initial=function(n,t,r){return o.call(n,0,n.length-(null==t||r?1:t))},j.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:o.call(n,Math.max(n.length-t,0))},j.rest=j.tail=j.drop=function(n,t,r){return o.call(n,null==t||r?1:t)},j.compact=function(n){return j.filter(n,j.identity)};var M=function(n,t,r){return t&&j.every(n,j.isArray)?c.apply(r,n):(A(n,function(n){j.isArray(n)||j.isArguments(n)?t?a.apply(r,n):M(n,t,r):r.push(n)}),r)};j.flatten=function(n,t){return M(n,t,[])},j.without=function(n){return j.difference(n,o.call(arguments,1))},j.partition=function(n,t){var r=[],e=[];return A(n,function(n){(t(n)?r:e).push(n)}),[r,e]},j.uniq=j.unique=function(n,t,r,e){j.isFunction(t)&&(e=r,r=t,t=!1);var u=r?j.map(n,r,e):n,i=[],a=[];return A(u,function(r,e){(t?e&&a[a.length-1]===r:j.contains(a,r))||(a.push(r),i.push(n[e]))}),i},j.union=function(){return j.uniq(j.flatten(arguments,!0))},j.intersection=function(n){var t=o.call(arguments,1);return j.filter(j.uniq(n),function(n){return j.every(t,function(t){return j.contains(t,n)})})},j.difference=function(n){var t=c.apply(e,o.call(arguments,1));return j.filter(n,function(n){return!j.contains(t,n)})},j.zip=function(){for(var n=j.max(j.pluck(arguments,"length").concat(0)),t=new Array(n),r=0;n>r;r++)t[r]=j.pluck(arguments,""+r);return t},j.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},j.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=j.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}if(y&&n.indexOf===y)return n.indexOf(t,r);for(;u>e;e++)if(n[e]===t)return e;return-1},j.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=null!=r;if(b&&n.lastIndexOf===b)return e?n.lastIndexOf(t,r):n.lastIndexOf(t);for(var u=e?r:n.length;u--;)if(n[u]===t)return u;return-1},j.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=arguments[2]||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=0,i=new Array(e);e>u;)i[u++]=n,n+=r;return i};var R=function(){};j.bind=function(n,t){var r,e;if(_&&n.bind===_)return _.apply(n,o.call(arguments,1));if(!j.isFunction(n))throw new TypeError;return r=o.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(o.call(arguments)));R.prototype=n.prototype;var u=new R;R.prototype=null;var i=n.apply(u,r.concat(o.call(arguments)));return Object(i)===i?i:u}},j.partial=function(n){var t=o.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===j&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},j.bindAll=function(n){var t=o.call(arguments,1);if(0===t.length)throw new Error("bindAll must be passed function names");return A(t,function(t){n[t]=j.bind(n[t],n)}),n},j.memoize=function(n,t){var r={};return t||(t=j.identity),function(){var e=t.apply(this,arguments);return j.has(r,e)?r[e]:r[e]=n.apply(this,arguments)}},j.delay=function(n,t){var r=o.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},j.defer=function(n){return j.delay.apply(j,[n,1].concat(o.call(arguments,1)))},j.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var c=function(){o=r.leading===!1?0:j.now(),a=null,i=n.apply(e,u),e=u=null};return function(){var l=j.now();o||r.leading!==!1||(o=l);var f=t-(l-o);return e=this,u=arguments,0>=f?(clearTimeout(a),a=null,o=l,i=n.apply(e,u),e=u=null):a||r.trailing===!1||(a=setTimeout(c,f)),i}},j.debounce=function(n,t,r){var e,u,i,a,o,c=function(){var l=j.now()-a;t>l?e=setTimeout(c,t-l):(e=null,r||(o=n.apply(i,u),i=u=null))};return function(){i=this,u=arguments,a=j.now();var l=r&&!e;return e||(e=setTimeout(c,t)),l&&(o=n.apply(i,u),i=u=null),o}},j.once=function(n){var t,r=!1;return function(){return r?t:(r=!0,t=n.apply(this,arguments),n=null,t)}},j.wrap=function(n,t){return j.partial(t,n)},j.compose=function(){var n=arguments;return function(){for(var t=arguments,r=n.length-1;r>=0;r--)t=[n[r].apply(this,t)];return t[0]}},j.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},j.keys=function(n){if(!j.isObject(n))return[];if(w)return w(n);var t=[];for(var r in n)j.has(n,r)&&t.push(r);return t},j.values=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},j.pairs=function(n){for(var t=j.keys(n),r=t.length,e=new Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},j.invert=function(n){for(var t={},r=j.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},j.functions=j.methods=function(n){var t=[];for(var r in n)j.isFunction(n[r])&&t.push(r);return t.sort()},j.extend=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]=t[r]}),n},j.pick=function(n){var t={},r=c.apply(e,o.call(arguments,1));return A(r,function(r){r in n&&(t[r]=n[r])}),t},j.omit=function(n){var t={},r=c.apply(e,o.call(arguments,1));for(var u in n)j.contains(r,u)||(t[u]=n[u]);return t},j.defaults=function(n){return A(o.call(arguments,1),function(t){if(t)for(var r in t)n[r]===void 0&&(n[r]=t[r])}),n},j.clone=function(n){return j.isObject(n)?j.isArray(n)?n.slice():j.extend({},n):n},j.tap=function(n,t){return t(n),n};var S=function(n,t,r,e){if(n===t)return 0!==n||1/n==1/t;if(null==n||null==t)return n===t;n instanceof j&&(n=n._wrapped),t instanceof j&&(t=t._wrapped);var u=l.call(n);if(u!=l.call(t))return!1;switch(u){case"[object String]":return n==String(t);case"[object Number]":return n!=+n?t!=+t:0==n?1/n==1/t:n==+t;case"[object Date]":case"[object Boolean]":return+n==+t;case"[object RegExp]":return n.source==t.source&&n.global==t.global&&n.multiline==t.multiline&&n.ignoreCase==t.ignoreCase}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]==n)return e[i]==t;var a=n.constructor,o=t.constructor;if(a!==o&&!(j.isFunction(a)&&a instanceof a&&j.isFunction(o)&&o instanceof o)&&"constructor"in n&&"constructor"in t)return!1;r.push(n),e.push(t);var c=0,f=!0;if("[object Array]"==u){if(c=n.length,f=c==t.length)for(;c--&&(f=S(n[c],t[c],r,e)););}else{for(var s in n)if(j.has(n,s)&&(c++,!(f=j.has(t,s)&&S(n[s],t[s],r,e))))break;if(f){for(s in t)if(j.has(t,s)&&!c--)break;f=!c}}return r.pop(),e.pop(),f};j.isEqual=function(n,t){return S(n,t,[],[])},j.isEmpty=function(n){if(null==n)return!0;if(j.isArray(n)||j.isString(n))return 0===n.length;for(var t in n)if(j.has(n,t))return!1;return!0},j.isElement=function(n){return!(!n||1!==n.nodeType)},j.isArray=x||function(n){return"[object Array]"==l.call(n)},j.isObject=function(n){return n===Object(n)},A(["Arguments","Function","String","Number","Date","RegExp"],function(n){j["is"+n]=function(t){return l.call(t)=="[object "+n+"]"}}),j.isArguments(arguments)||(j.isArguments=function(n){return!(!n||!j.has(n,"callee"))}),"function"!=typeof/./&&(j.isFunction=function(n){return"function"==typeof n}),j.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},j.isNaN=function(n){return j.isNumber(n)&&n!=+n},j.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"==l.call(n)},j.isNull=function(n){return null===n},j.isUndefined=function(n){return n===void 0},j.has=function(n,t){return f.call(n,t)},j.noConflict=function(){return n._=t,this},j.identity=function(n){return n},j.constant=function(n){return function(){return n}},j.property=function(n){return function(t){return t[n]}},j.matches=function(n){return function(t){if(t===n)return!0;for(var r in n)if(n[r]!==t[r])return!1;return!0}},j.times=function(n,t,r){for(var e=Array(Math.max(0,n)),u=0;n>u;u++)e[u]=t.call(r,u);return e},j.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},j.now=Date.now||function(){return(new Date).getTime()};var T={escape:{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;"}};T.unescape=j.invert(T.escape);var I={escape:new RegExp("["+j.keys(T.escape).join("")+"]","g"),unescape:new RegExp("("+j.keys(T.unescape).join("|")+")","g")};j.each(["escape","unescape"],function(n){j[n]=function(t){return null==t?"":(""+t).replace(I[n],function(t){return T[n][t]})}}),j.result=function(n,t){if(null==n)return void 0;var r=n[t];return j.isFunction(r)?r.call(n):r},j.mixin=function(n){A(j.functions(n),function(t){var r=j[t]=n[t];j.prototype[t]=function(){var n=[this._wrapped];return a.apply(n,arguments),z.call(this,r.apply(j,n))}})};var N=0;j.uniqueId=function(n){var t=++N+"";return n?n+t:t},j.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var q=/(.)^/,B={"'":"'","\\":"\\","\r":"r","\n":"n","	":"t","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\t|\u2028|\u2029/g;j.template=function(n,t,r){var e;r=j.defaults({},r,j.templateSettings);var u=new RegExp([(r.escape||q).source,(r.interpolate||q).source,(r.evaluate||q).source].join("|")+"|$","g"),i=0,a="__p+='";n.replace(u,function(t,r,e,u,o){return a+=n.slice(i,o).replace(D,function(n){return"\\"+B[n]}),r&&(a+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'"),e&&(a+="'+\n((__t=("+e+"))==null?'':__t)+\n'"),u&&(a+="';\n"+u+"\n__p+='"),i=o+t.length,t}),a+="';\n",r.variable||(a="with(obj||{}){\n"+a+"}\n"),a="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+a+"return __p;\n";try{e=new Function(r.variable||"obj","_",a)}catch(o){throw o.source=a,o}if(t)return e(t,j);var c=function(n){return e.call(this,n,j)};return c.source="function("+(r.variable||"obj")+"){\n"+a+"}",c},j.chain=function(n){return j(n).chain()};var z=function(n){return this._chain?j(n).chain():n};j.mixin(j),A(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=e[n];j.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!=n&&"splice"!=n||0!==r.length||delete r[0],z.call(this,r)}}),A(["concat","join","slice"],function(n){var t=e[n];j.prototype[n]=function(){return z.call(this,t.apply(this._wrapped,arguments))}}),j.extend(j.prototype,{chain:function(){return this._chain=!0,this},value:function(){return this._wrapped}}),"function"==typeof define&&define.amd&&define("underscore",[],function(){return j})}).call(this);
// sourceMappingURL=underscore-min.map





















function pageUPnP(){
	pageUPnP.superclass.constructor.call(this);
	
	this.upnp = null;
	this.iftree = null;
	this.ports = null;
	
	this.$grid = null;
	
	
	this.updateView = function(phase){
		pageUPnP.superclass.updateView.apply(this, arguments);
	
		if(phase == "back") {

			if ( this.upnp.enable ) {

				var header = [];
				header.push({ index: "protocol", name: "protocol" });
				header.push({ index: "ip", name: "IP" });
				header.push({ index: "port", name: "vserversPortDst" });
				header.push({ index: "ext_port", name: "vserversPortFw" });
				header.push({ index: "comment", name: "comment" });
				
				
				this.$grid = this.child("grid").$box.html("\
					<div class='grid rm'></div>\
					").find('.grid').lightUIGrid(header, 0, {
					selectable: false
				});			
				
				for ( var i in this.ports ) { 
					var $row = this.$grid.addRow().row("last");
					$row.col("protocol").fieldval( this.ports[i].protocol );	
					$row.col("ip").fieldval( this.ports[i].addr );
					$row.col("port").fieldval( this.ports[i].port );
					$row.col("ext_port").fieldval( this.ports[i].ext_port );
					$row.col("comment").fieldval( this.ports[i].descr );											
				}
			}
		}
		
		if (phase == "forward") {
			var upnp = this.upnp;


			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if(this.deep.updateModel()){
						var enable = this.get("enable").val();
						
						this.upnp = {
							enable: enable
						}

						rootView.showModalOverlay();
						device.config.write( 66, this.upnp, callback(this, function(){
							this.upnp = null;
							rootView.hideModalOverlay();
							this.emit("updaterq");
						}));
					}
				}));

		
				this.startForm()
				.add(new nodeCheckBox("enable", upnp.enable), "enable")
				.add(new nodeCaption("IPv4 IGD", ""))
				.add(new node(), "grid");
				

			this.endForm();

		}

	}
	


	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([66,
							194
							], callback(this, function(data){
			if(is.RPC_SUCCESS(data.rq[0])){


				if(data.rq[0].resident.upnp){
					this.upnp = data.rq[0].resident.upnp;
				}
				else{
					this.upnp = data.rq[0].resident;
				}
					
			}

			if(is.RPC_SUCCESS(data.rq[1])){
				this.ports = data.rq[1].resident;				
			}
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));

	});


}
extend(pageUPnP, node);























function pageURLFilterConfig(){
	pageURLFilterConfig.superclass.constructor.call(this);

	this.settings = null;
	var types = { "urlfConfTypeExc": "Exclude", "urlfConfTypeInc": "Include" };
	this.add(new nodeCaption("urlfConfLabel"), "url_caption")
		.add(new nodeCheckBox("urlfConfEnable", false), "url_enable")
		.add(new nodeSelect("urlfConfType", '', {
			disabled: true
		}), "url_type");
	this.updateView = function(phase){
		pageURLFilterConfig.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.save(this.child("url_enable").val(), this.child("url_type").val());
				}));

			if(disableFlag( 71)){
				this.getButton("button_save").disable();
			}
		}
		if (phase == "back") {
			var url_type = this.child("url_type").cleanOptions();
			for(var t in types){
				if (t) url_type.addOption(t, types[t]);
			}
		}
	}

	this.save = function(enable, type) {
		rootView.showModalOverlay();

		this.deep.updateModel();	//Вызывается только для сброса isModified

		this.settings = {
			'enable': enable,
			'type': (enable)?type:this.settings.type
		};
		device.config.write( 71, this.settings, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}

	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 71, callback(this, function(data){
			this.deep.updateView();
			this.settings = null;
			if (is.RPC_SUCCESS(data)) {
				this.settings = (data.resident.urlsetting)?data.resident.urlsetting:data.resident;
			}
			if (this.settings) {
				this.child("url_enable").val(this.settings.enable);
				if(this.settings.enable) {
					this.child("url_type").enable();
				} else {
					this.child("url_type").disable();
				}
				this.child("url_type").val(this.settings.type);
			}
			rootView.hideModalOverlay();
		}));
	});

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "url_enable":
				var url_enable = this.child("url_enable");
				var url_type = this.child("url_type");
				if (value) url_type.enable(); else url_type.disable();
			break;
		}
	});
}
extend(pageURLFilterConfig, node);

function pageURLFilter(){
	pageURLFilter.superclass.constructor.call(this);

	this.urlist = null;
	this.config = null;
	this.$grid = null;

	this.add(new nodeCaption("urlfAddrLabel", "urlfAddrDescText"))
		.add(new node(), "grid");
	this.add(new nodeCaption("","urlfHTTPSWarning"));

	this.updateModel = function(status){
		status.error |= !this.$grid.cleanErrors().checkMandatory(true);
		this.status = status;
	}

	this.updateView = function(phase){
		pageURLFilter.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar().$box.empty();
			this.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(gridActionConverter(this.$grid));
						this.$grid.selection().removeRow();
					}
				}));
		}
		if (phase == 'back') {
			this.$grid = this.child("grid").$box.html("\
				<div class='grid rm'></div>\
				<div class='buttonsInline'>\
					<div class='button add'></div>\
				</div>\
			").find('.grid').lightUIGrid([
				{ index: "address", name: "urlfAddress" },
				{ index: "favicon", name: "" }
			], 0, {
				selectable: true
			});
   			this.$grid.bind("selection.grid", callback(this, function(){
				this.updateRuleButtons();
			}));
			this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell){
				this.$grid.cleanErrors();
			}));
			this.$grid.bind("cellChange.grid", callback(this, function(event, $cell){
				this.$grid.row($cell.irow()).col("favicon").css({
					'background': "url('" + document.location.protocol + "//" + $cell.fieldval() + "favicon.ico') no-repeat center center"
				});
			}));
			this.$grid.colEditable("address", "text", {
				mandatory: true,
				unique: 'soft',
				re: function(value){
					if (value.substr(0, 4) == 'http'){
						return "urlfSchemaError";
					};
					return null;
				}
			});
			this.get("grid")
				.addButton("add")
				.getButton("add")
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					var $row = this.$grid.addRow().row("last");
					$row.col("address").trigger("click");
				}));
			this.get("grid")
				.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.selection().hide();
					this.updateRuleButtons();
			}));
			for(var i = 0; this.urlist && i < this.urlist.length; i++){
				var $row = this.$grid.addRow().row("last");
				var ufilter = this.urlist[i];
				$row.col("address").fieldval(ufilter.url);
				$row.col("favicon").css({
					'background': "url('" + document.location.protocol + "//" + ufilter.url + "favicon.ico') no-repeat center center"
				});
			}
			this.$grid.resetAll();
		   	this.updateRuleButtons = function(){
				if(this.$grid.selection().not(":hidden").length) {
					this.get("grid").getButton("button_del").enable();
				}
				else{
					this.get("grid").getButton("button_del").disable();
				}
			};
			if(disableFlag( 72)){
				this.get("grid").getButton("add").disable();
				this.get("grid").getButton("button_del").disable();
				this.getButton("button_save").disable();
			}
		}
	}

	this.save = function(actions){
		if (actions.count) {
			rootView.showModalOverlay();

			var urlist = this.urlist;
			var arrUrl = {};
			for (var iul = 0; iul < urlist.length; iul++) {
				arrUrl[urlist[iul].url.toLowerCase()] = 1;
			};

			var query = { remove: [], write: [] };
			if (actions.deleted.length && actions.deleted.length == this.$grid.nrow() - this.$grid.newRows().length) {
				query.remove.push([ 72, { clear: true }]);
			} else {
				for (var i = 0; i < actions.deleted.length; i++) {
					query.remove.push([ 72, this.urlist[actions.deleted[i]], actions.deleted[i]]);
					arrUrl[this.urlist[actions.deleted[i]].url] = 0;
				}
			}
			
			var temp = actions.changed.concat(actions.added);
			var r_temp = actions.r_changed.concat(actions.r_added);

			for (var i = 0; i < temp.length; i++) {
				var $row = this.$grid.row(temp[i]);
				var arr = $row.col("address").fieldval().toLowerCase().split(".");
				var urlstr = [];
				var fgwww = false;

				urlstr.push(arr[arr.length - 1]);
				urlstr.push(arr[arr.length - 1]);

				for(var ia = arr.length - 2; ia >= 0 ; ia--){
					urlstr[0] = arr[ia] + "." + urlstr[0];
					
					if (arr[ia] == "www"){
						fgwww = true;
					}else{
						urlstr[1] = arr[ia] + "."  + urlstr[1];
					};
				};
				if (!fgwww){
					urlstr[0] = "www." + urlstr[0];
				};

				//~ debug(urlstr);

				for (var ia = 0; ia < urlstr.length; ia++){
					if (!arrUrl[urlstr[ia]]){
						arrUrl[urlstr[ia]] = 1;
						query.write.push([ 72, {
							'url': urlstr[ia]
						},
								$row.isNew()?-1:r_temp[i]
						]);
					};
				};
			};
			if (this.config && (this.config.enable == false)) {
				alert(lng("urlfOff"));
			} 
			device.config.multi(query, callback(this, function(data){
				//rootView.hideModalOverlay();
				this.update();
			}));
		}
	}

	this.update = function(){
		rootView.showModalOverlay();
		device.config.read([ 72,  71], callback(this, function(data){
			this.urlist = (is.RPC_SUCCESS(data))?data.rq[0].resident:null;
			this.config = (is.RPC_SUCCESS(data))?data.rq[1].resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}

	this.bind("updaterq", this.update);

}
extend(pageURLFilter, node);
























function pageVirtServ(){
	pageVirtServ.superclass.constructor.call(this);

	this.add(new nodeCaption("Виртуальные серверы"));
	this.add(new node(), "grid");
	this.add(new nodeCaption("rmtAccessLabel"));
	this.add(new node(), "grid_rmacc");

	this.updateView = function(phase){

		pageVirtServ.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){
		} else {
			var header =
				[{index: "name", name: "vserversName"}
				,{index: "iface", name: "vserversIface"}
				,{index: "protocol", name: "vserversProtocol"}
				,{index: "port_fw", name: "vserversPortFw"}
				,{index: "port_dst", name: "vserversPortDst"}
				,{index: "ip_dst", name: "vserversIPDst"}
				,{index: "remote_ip", name: "vserversRemoteIp"}];
			//~ header.push({index: "enable_snat", name: "vserversStatusSnat"})

			var header_rmacc = [
				{ index: "ips", name: "ip_address" }
				,{ index: "source_mask", name: "masq" }
				,{ index: "sport", name: "rmtAccessPortS" }
				,{ index: "dport", name: "vserversPortDst" }];

			var $grid = this.get("grid").$box.lightUIGrid(header, 0, {clickable: true, selectable: true });
			this.cleanButtonBar()
				.addButton("add")
				.getButton("add")
				.unbind("click.button")
				.bind("click.button", context(this).callback(function(){
					this.edit(this.iftree, this.lanClients);
				}));
			var $grid_rmacc = this.get("grid_rmacc").$box.lightUIGrid(header_rmacc, 0, {clickable: true, selectable: false });
			var $row;
			var rule;
			var json = this.json;
			var rmaccess = this.rmaccess;
			var use_ports = this.use_ports;
			var connections = getConnArray(this.iftree);
			var iflist = {};
			var iface;
			var name_iface;


			for (var i=0; i< connections.length; i++){
				iface = connections[i].iface;
				name_iface = connections[i].name;
				if(iface) iflist[iface] = connections[i];
			}

			function getConnName(name_iface){
				var connection = iflist[name_iface];
				for (var i in connections) {
					if (connections[i].name == name_iface) {
						return connections[i].name;
					}
				}
				return connection?connection.name:iface;
			}

			for(var i in json){
				rule = json[i];
				$row = $grid.addRow().row("last");

				$row.col("name").html(rule.name);
				if(rule.source_iface == "all"){
					$row.col("iface")
						.html(lng("all_"))
						.attr("langkey", "all_")
						.data("iface", "all");
				}
				else{
					$row.col("iface")
						.html(getConnName(rule.source_iface))
						.data("iface", rule.source_iface);
				}
				
				
				if ( rule.type == "ipsec" ) {
					$row.col("protocol").html("UDP,UDP").data("proto", "udp");
					$row.col("port_fw").html("500,4500");
					$row.col("port_dst").html("500,4500");
				} else if ( rule.type == "sftp" ) {
					$row.col("protocol").html("TCP,TCP");
					$row.col("port_fw").html("22,115");
					$row.col("port_dst").html("22,115");
				} else if ( rule.type == "pcanywhere" ) {
					$row.col("protocol").html("TCP,UDP");
					$row.col("port_fw").html("5631,5632");
					$row.col("port_dst").html("5631,5632");
				} else {
					$row.col("protocol").html(vservProtoNames[rule.proto])
										.data("proto", rule.proto);
					var sign = rule.ports_end?":":"";
					$row.col("port_fw").html(rule.ports_begin + sign + rule.ports_end);
					sign = rule.portd_end?":":"";
					$row.col("port_dst").html(rule.portd_begin + sign + rule.portd_end);
				}
				$row.col("ip_dst").html(rule.ipd);
				$row.col("remote_ip").html(rule.remote_ip);
				//~ if (rule.enable_snat) {
					//~ $row.col("enable_snat").html('<img src="image/ledgreen.gif">');
				//~ } else {
					//~ $row.col("enable_snat").html('<img src="image/ledred.gif">');
				//~ }
			}
			
			for(var i = 0; this.rmaccess && i < this.rmaccess.length; i++){
				var access = this.rmaccess[i];
				var $row_rmacc = $grid_rmacc.addRow().row("last");
					$row_rmacc.col("ips").fieldval(access.ips);
					if (access.ipv6 == false) {
						$row_rmacc.col("source_mask").fieldval(access.source_mask);
					}
					$row_rmacc.col("sport").fieldval(access.sport);
					$row_rmacc.col("dport").fieldval(access.dport);
				}

			$grid_rmacc.bind("click", callback(this, function(){
				if (confirm(lng("GoToRemAcc"))){
					window.location.hash = '#advanced/remoteaccess';
				}
			}));

			$grid.bind("selection.grid", callback(this, function(){
				this.updateRuleButtons();
			}));

			this.cleanButtonBar();
			this.get("grid")
				.addButton("add")
				.getButton("add")
				.unbind("click.button")
				.bind("click.button", context(this).callback(function(){
					this.edit(this.iftree, this.lanClients, null, null, this.use_ports);
				}));
			this.get("grid")
				.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(){
					this.clearServer(json, $grid);
				}));
			this.get("grid")
				.addButton("clearall")
				.getButton("clearall")
				.bind("click.button", context(this).callback(function(){
					this.clear();
				}));

			this.updateRuleButtons = function(){
				if($grid.selection().not(":hidden").length) {
					this.get("grid").getButton("button_del").enable();
				} else{
					this.get("grid").getButton("button_del").disable();
				}
				if (!json || !json.length) this.getButton("clearall").hide();
			}


			$grid.unbind("rowclick.grid")
				.bind("rowclick.grid", context(this).callback(function(event, $row){
					
			var rule = {
					name:			$row.col("name").html(),
					source_iface:	$row.col("iface").data("iface"),
					proto:			$row.col("protocol").data("proto"),
					ports_begin:	$row.col("port_fw").html().split(":")[0],
					ports_end:		$row.col("port_fw").html().split(":")[1],
					portd_begin:	$row.col("port_dst").html().split(":")[0],
					portd_end:		$row.col("port_dst").html().split(":")[1],
					ipd:			$row.col("ip_dst").html(),
					remote_ip:		$row.col("remote_ip").html(),
					type:			this.json[$row.irow()].type?this.json[$row.irow()].type:""
					//~ ,enable_snat:	this.json[$row.irow()].enable_snat?this.json[$row.irow()].enable_snat:false
				}

				this.edit(this.iftree, this.lanClients, rule, $row.irow(), this.use_ports);
			}));
		}
}
	
	this.clearServer = function(ruleall, grid){
		var rmlist = new Array();
		for (var i = grid.nrow(); i >= 0; i--) {
			if(grid.row(i).hasClass('selected')) {
				rmlist.push([ 10, ruleall[i], i]);
			}
		}
		if (rmlist.length) {
			rootView.showModalOverlay();
			device.config.remove(rmlist, callback(this, function(data){
				this.onupdaterq();
			}));
		}
	}
	
	this.clear = function(){
		if(confirm(lng("vserversClear"))){
			rootView.showModalOverlay();
			device.config.remove( 10, {
				clear: true
			}, context(this).callback(function(data){
				this.onupdaterq();
			}));
		}
	}
	
	this.edit = function(iftree, lanClients, rule, pos, use_ports){
		this.use_ports = use_ports;
		if(is.unset(pos)) pos = -1;
		this.$box.unbind();
		var ruleNode = new ruleVirtServ(iftree, lanClients, rule, null, null, use_ports);
		ruleNode.buttonBar(this.buttonBar())
				.deep.updateView(this.$outerBox)
				.cleanButtonBar()
				.addButton("button_prev")
				.getButton("button_prev")
				.bind("click.button", context(this).callback(function(){
					if(!checkChanges() || confirm(lng("leavePageMes"))){
						this.emit("updaterq");
					}
				}));
		if(is.object(rule)){
			ruleNode.addButton("button_del")
					.getButton("button_del")
					.bind("click.button", context(this).callback(function(){
						device.config.remove( 10, ruleNode.rule, pos,  context(this).callback(function(){
							this.emit("updaterq");
						}));
					}));
		}
		ruleNode.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", context(this).callback(function(){
					ruleNode.deep.updateModel();

		// --------------------------------------------------------------------------//
		// проверяем уникальность правил по полям интерфейс, протокол и внешний порт //
		// --------------------------------------------------------------------------//

		this.use_ports_vs = [];
		this.use_ports_vs_buf = [];

			this.portExist = function( ports_begin, ports_end, use_ports_vs, pos ) {
				if (ports_end == ""){ // если задан один внешний порт (начальный)
					if ( _.indexOf(use_ports_vs, parseInt(ports_begin)) != -1 && pos != i ) {
						alert(lng("PortInUse"));
						return true;
					}
				} else { // если задан диапазон внешних портов
					for( var j = parseInt(ports_begin); j < parseInt(ports_end)+1; j++) {
						if ( _.indexOf(use_ports_vs, j) != -1 && pos != i ) {
							alert(lng("PortsInUse"));
							return true;
							break;
						}
					}
				}
			}
			// формируем массив занятых портов
			for (var i = 0; i < this.json.length; i++) {
				if ( pos != i ) {
					if (this.json[i].source_iface == "all" || this.json[i].source_iface == ruleNode.rule.source_iface || ruleNode.rule.source_iface == "all") {
						if (this.json[i].proto == "tcp/udp" || this.json[i].proto == ruleNode.rule.proto || ruleNode.rule.proto == "tcp/udp") {					
							if (this.json[i].ports_end == "") {
								this.use_ports_vs[this.use_ports_vs.length] = parseInt(this.json[i].ports_begin);	
							} else {
								this.use_ports_vs_buf = _.range(parseInt(this.json[i].ports_begin), parseInt(this.json[i].ports_end)+1);
								this.use_ports_vs = _.union(this.use_ports_vs, this.use_ports_vs_buf);
							}
						}
					}
				}
			}
			if (this.portExist(ruleNode.rule.ports_begin, ruleNode.rule.ports_end, this.use_ports_vs, pos)) ruleNode.status.error = true;
		// --------------------------------------------------------------------------- //

			// проверяем чтобы не использовались порты из удаленного доступа
			if (ruleNode.rule.ports_end != ""){
				var ports_array = [];
				for (var i = 0; i < (parseInt(ruleNode.rule.ports_end) - parseInt(ruleNode.rule.ports_begin)); i++) {
					ports_array[i] = parseInt(ruleNode.rule.ports_begin) + i;
				}
				for (var j =0; j<this.use_ports.length; j++) {
					if (_.indexOf(ports_array, this.use_ports[j], true) != -1) {
						alert(lng("MessagePortUsed"));
						ruleNode.status.error = true;
						break;
					}
				}
			}

			// проверяем чтобы начальный порт был меньше конечного
			if (parseInt(ruleNode.rule.ports_end) < parseInt(ruleNode.rule.ports_begin) || parseInt(ruleNode.rule.portd_end) < parseInt(ruleNode.rule.portd_begin)){
				alert(lng("checkOutRange"));
				ruleNode.status.error = true;
			}

			if(ruleNode.status.error){
				//alert("ошибки");
			} else {
				rootView.showModalOverlay();
				device.config.write( 10, ruleNode.rule, pos, context(this).callback(function(){
					rootView.hideModalOverlay();
					this.emit("updaterq");
				}));
			}
		}));
	}

	this.onupdaterq = function(){
		rootView.showModalOverlay();
		device.config.read([10,
				1,
				187,
				16
		 ], context(this).callback(function(data){
			rootView.hideModalOverlay();
			if(is.RPC_SUCCESS(data.rq[0])){
				this.json = data.rq[0].resident.vserver;
			}
			else{
				this.json = [];
			}
			if(is.RPC_SUCCESS(data.rq[1])){
				this.iftree = data.rq[1].resident.iface_names;
			}
			else{
				this.iftree = {};
			}
			if(is.RPC_SUCCESS(data.rq[2])){
				this.lanClients = data.rq[2].resident;
			}
			else{
				this.lanClients = [];
			}
			this.rmaccess = (is.RPC_SUCCESS(data.rq[3]))?data.rq[3].resident.httpaccess:null;
			// формируем массив портов, которые используются в удаленном доступе
			this.use_ports = [];

			for(var i = 0; this.rmaccess && i < this.rmaccess.length; i++){
				this.use_ports[i] = this.rmaccess[i].sport;
			}
			this.use_ports = _.uniq(this.use_ports);

			this.deep.updateView();
		}));
	}

	this.bind("updaterq", this.onupdaterq);
}
extend(pageVirtServ, node);

function wizardVirtServ(){
	wizardVirtServ.superclass.constructor.call(this);

	this.updateView = function(phase){
		pageVirtServ.superclass.updateView.apply(this, arguments);
		if(phase == "forward"){
			
			var ruleNode = new ruleVirtServ(this.iftree, this.lanClients, null, null, null, this.use_ports);
			ruleNode.buttonBar(this.buttonBar())
					.deep.updateView(this.$outerBox)
					.cleanButtonBar()
					.addButton("apply")
					.getButton("apply")
					.bind("click.button", context(this).callback(function(){
						ruleNode.deep.updateModel();

		// --------------------------------------------------------------------------//
		// проверяем уникальность правил по полям интерфейс, протокол и внешний порт //
		// --------------------------------------------------------------------------//

			this.use_ports_vs = [];
			this.use_ports_vs_buf = [];

			// формируем массив занятых портов
			for (var i = 0; i < this.json.length; i++) {
				if (this.json[i].source_iface == "all" || this.json[i].source_iface == ruleNode.rule.source_iface || ruleNode.rule.source_iface == "all") {
					if (this.json[i].proto == "tcp/udp" || this.json[i].proto == ruleNode.rule.proto || ruleNode.rule.proto == "tcp/udp") {					
						if (this.json[i].ports_end == "") {
							this.use_ports_vs[this.use_ports_vs.length] = parseInt(this.json[i].ports_begin);	
						} else {
							this.use_ports_vs_buf = _.range(parseInt(this.json[i].ports_begin), parseInt(this.json[i].ports_end)+1);
							this.use_ports_vs = _.union(this.use_ports_vs, this.use_ports_vs_buf);
						}
					}
				}
			}
			if (ruleNode.rule.ports_end == ""){ // если задан один внешний порт (начальный)
				if ( _.indexOf(this.use_ports_vs, parseInt(ruleNode.rule.ports_begin)) != -1) {
					alert(lng("PortInUse"));
					ruleNode.status.error = true;
				}
			} else { // если задан диапазон внешних портов
				for( var j = parseInt(ruleNode.rule.ports_begin); j < parseInt(ruleNode.rule.ports_end)+1; j++) {
					if ( _.indexOf(this.use_ports_vs, j) != -1) {
						alert(lng("PortsInUse"));
						ruleNode.status.error = true;
						break;
					}
				}
			}
		// --------------------------------------------------------------------------- //

			// проверяем чтобы не использовались порты из удаленного доступа
			if (ruleNode.rule.ports_end != ""){
				var ports_array = [];
				for (var i = 0; i < (parseInt(ruleNode.rule.ports_end) - parseInt(ruleNode.rule.ports_begin)); i++) {
					ports_array[i] = parseInt(ruleNode.rule.ports_begin) + i;
				}
				for (var j =0; j<this.use_ports.length; j++) {
					if (_.indexOf(ports_array, this.use_ports[j], true) != -1) {
						alert(lng("MessagePortUsed"));
						ruleNode.status.error = true;
						break;
					}
				}
			}

			// проверяем чтобы начальный порт был меньше конечного
			if (parseInt(ruleNode.rule.ports_end) < parseInt(ruleNode.rule.ports_begin) || parseInt(ruleNode.rule.portd_end) < parseInt(ruleNode.rule.portd_begin)){
				alert(lng("checkOutRange"));
				ruleNode.status.error = true;
			}

			if(ruleNode.status.error){
				//alert("ошибки");
			} else {
				rootView.showModalOverlay();
				device.config.write( 10, ruleNode.rule, -1,  context(this).callback(function(){
					rootView.hideModalOverlay();
					if (confirm(lng("wzVSSaveOk") + ' ' + lng("addOtherRules") + '\n' + lng("clickOKCancel"))) {
						window.hasChanges = null;
						document.location.hash = "#firewall/vservers";
						location.reload(true);
					} else {
						window.hasChanges = null;
						document.location.hash = "";
						location.reload(true);
					}
				}));
				}
			}));
		}
	}
}
extend(wizardVirtServ, pageVirtServ);

function ruleVirtServ(iftree, lanClients, rule, pos, shortForm, use_ports){
	ruleVirtServ.superclass.constructor.call(this);
	if(is.unset(rule)){
		rule = {};
		this.adding = true;
	}
	this.iftree = iftree;
	this.lanClients = lanClients;
	this.rule = rule;
	this.pos = pos;
	this.shortForm = shortForm;
	this.use_ports = use_ports;

	this.updateView = function(phase){
		ruleVirtServ.superclass.updateView.apply(this, arguments);
		if(phase == "back"){
			var rule = this.rule;
			var lanClients = this.lanClients;
			var iftree = this.iftree;
			var use_ports = this.use_ports;

			//template
			this.child("template").cleanOptions();
			for(var i=0; i<templateList.length; i++){
				this.child("template").addOption(templateList[i].name, i);

			}
			if(this.adding){
				this.applyTemplate(templateList[this.child("template").val()], this.child("protocol").val());
			}
			else{				
				this.child("template").disable();
			}
	
			
			//iface
			var ifarrey = getConnArray(iftree);
			var iface = this.child("iface");
			iface.cleanOptions()
				.addOption("all_", "all");
			var obj;
			for(var i=0; i<ifarrey.length; i++){
				obj = ifarrey[i];
				if(obj.L2.is_wan && !(obj.type == "ipv6" || is.set(obj.gwifv6))){
					iface.addOption(obj.name, obj.iface);
				}
			}
			//protocol
			this.child("protocol").cleanOptions();
			for(var i in vservProtoNames){
				this.child("protocol").addOption(vservProtoNames[i], i);
			}
			//ipd
			var ipd = this.child("ipd");
			var obj;
			for(var i=0; i<lanClients.length; i++){
				obj = lanClients[i];
				if (is.IPv4(obj.ip)) {
					ipd.addRow(obj.ip, obj.mac, obj.hostname);
				}
			}
			if(shortForm){
				this.get("protocol").hide();
				//~ this.get("portfwb").hide();
				//~ this.get("portfwe").hide();
				//~ this.get("portdstb").hide();
				//~ this.get("portdste").hide();
			}
		}
	}

	this.updateModel = function(status){
		if(!status.error){
			var type = templateList[this.child("template").val()].type?templateList[this.child("template").val()].type:"";   ///////////////////!!!!!
			portfwb = this.child("portfwb").val();
			portfwe = this.child("portfwe").val();
			portdstb = this.child("portdstb").val();
			portdste = this.child("portdste").val();
			if(portfwb == portfwe) portfwe = "";
			if(portdstb == portdste) portdste = "";
			this.rule = {
				name:			this.child("name").val(),
				source_iface:	this.child("iface").val(),
				proto:			this.child("protocol").val(),
				ports_begin:	portfwb.toString(),
				ports_end:		portfwe.toString(),
				portd_begin:	portdstb.toString(),
				portd_end:		portdste.toString(),
				ipd:			this.child("ipd").val(),
				remote_ip:		this.child("ipr").val(),
				type:			type
				//~ ,enable_snat:		this.child("snat").val()
			}
		}

		this.status = status;
	}

	this.onfieldchange = function(status, value){
		switch(status.target.getAlias()){
			case "portfwe":
			case "portdste":
				if ( value == 0 ) {
					$(status.target.$box).find('input').val('');
				}
			break;			
			case "template":
				this.applyTemplate(templateList[value]);
				this.applyProtocol((templateList[value].protocol).split(',')[0]);
			break;
			case "protocol":
				this.applyProtocol(value);
			break;
		}
	}

	

	this.applyTemplate = function(template) {
		
		
		if(template.name != "Custom"){
			this.child("protocol").val(template.protocol);
			
			this.child("protocol").cleanOptions();
			for(var i in vservProtoNames){
				if ( (template.protocol.split(',')).indexOf(i) != -1 ) {
					this.child("protocol").addOption(vservProtoNames[i], i);
				}
			}
				
			//this.applyProtocol(template.protocol);
						
		} else {
			this.child("protocol").cleanOptions();
			for(var i in vservProtoNames){
				this.child("protocol").addOption(vservProtoNames[i], i);				
			}			
		}
		
	}

	this.portsVisible = function( visible ) {
		if ( visible ) {
			this.get("protocol").hide();
			this.get("portfwb").hide();
			this.get("portfwe").hide();
			this.get("portdstb").hide();
			this.get("portdste").hide();
		} else {
			if (!this.shortForm) {
				this.child("protocol").show();
			}
			this.get("portfwb").show();
			this.get("portfwe").show();
			this.get("portdstb").show();
			this.get("portdste").show();
		}
	}

	this.applyProtocol = function(protocol) {
			
		var template = templateList[this.child("template").val()];
					
		$(this.child("portfwb").$box).find('input').val('');
		$(this.child("portfwe").$box).find('input').val('');
		$(this.child("portdstb").$box).find('input').val('');
		$(this.child("portdste").$box).find('input').val('');
					
		if(template.name != "Custom") {	
			if ( typeof template.ports[protocol] != "undefined" ) {
				
				this.child("portfwb").val( template.ports[protocol].port_fw.split(":")[0]  );
				this.child("portfwe").val( template.ports[protocol].port_fw.split(":")[1]  );
				this.child("portdstb").val( template.ports[protocol].port_dst.split(":")[0] );
				this.child("portdste").val( template.ports[protocol].port_dst.split(":")[1] );							
				
			}
		}		

		this.portsVisible(template.hide_ports);
	
	}
	

	if(shortForm){
		value = 0;
	}
	else{
		var obj;
		var value = 0;
		for(var i in templateList) {
			obj = templateList[i]
			if(		obj.protocol == rule.proto
				&&	obj.ports.port_fw == rule.ports_begin
				&&	obj.ports.port_dst == rule.portd_begin || obj.type == rule.type){
				value = i;
				break;
			}
		}
	}

	this.add(new nodeSelect("vserversTemplate", value), "template")
		.add(new nodetext("vserversName", rule.name, {mandatory: true}), "name")
		.add(new nodeSelect("vserversIface", rule.source_iface), "iface")
		.add(new nodeSelect("vserversProtocol", rule.proto), "protocol")
		.add(new nodeport("vserversPortFwB", rule.ports_begin, {mandatory: true, use_ports: use_ports} ), "portfwb")
		.add(new nodeport("vserversPortFwE", rule.ports_end, {use_ports: use_ports}), "portfwe")
		.add(new nodeportold("vserversPortDstB", rule.portd_begin, {mandatory: true}), "portdstb")
		.add(new nodeportold("vserversPortDstE", rule.portd_end), "portdste")
		.add(new nodeComboIP("vserversIPDst", rule.ipd,
			{
				header: 
					[
						{index: "ip", name: "IP"},
						{index: "mac", name: "MAC"},
						{index: "host", name: "Host"}
					],
				index: 'ip',
				version: 4,
				mandatory: true
			}), "ipd")
		.add(new nodeip("vserversRemoteIp", rule.remote_ip), "ipr")
		//~ .add(new nodeCheckBox("vserversEnableSnat", rule.enable_snat), "snat")
	var count = 0;
	if(use_ports && use_ports.length !=0) {
		var comment_ports = "";
		var first = true;
		for (i = 0; i<use_ports.length; i++) {
			if (use_ports[i] != undefined) {
				if (first) {
					comment_ports = comment_ports + use_ports[i];
					first = false;
					count = count + 1;
				}
				else {
					comment_ports = comment_ports + ", " + use_ports[i];
					count = count + 1;
				}
			}
		}

		if (count > 1) {
			this.add(new nodeCaption(""), "setting");
			var comment = this.get("setting");
			comment.comment = "<i>" + lng("CommentVirtServ1") + " <b>" + comment_ports + " </b>" + lng("CommentVirtServ2") + "</i>";
		}
		else {
			this.add(new nodeCaption(""), "setting");
			var comment = this.get("setting");
			comment.comment = "<i>" + lng("CommentVirtServ3") + " <b>" + comment_ports + " </b>" + lng("CommentVirtServ4") + "</i>";
		}
	}


	if(!this.adding) this.get("template").disable();

	for(var i in templateList) {
		if ( templateList[i].type == rule.type ) {
			this.portsVisible( templateList[i].hide_ports );
			break;
		}
	}

	this.bind("fieldchange", this.onfieldchange);
}
extend(ruleVirtServ, node);

var vservProtoNames = {tcp: "TCP", udp: "UDP", "tcp/udp": "TCP/UDP"};




















window.templateList =	[
						{
							name:"Custom",
							protocol:"",
							type: "custom",
							ports:  { }
						},
						{
							name:"Virtual Server HTTP",
							protocol:"tcp",
							type: "http",
							ports:  {
								"tcp": {
										port_fw:"80",
										port_dst:"80"
									}
								}
						},
						{
							name:"Virtual Server HTTPS",
							protocol:"tcp",
							type: "https",
							ports:  {
								"tcp": {
										port_fw:"443",
										port_dst:"443"
									}
								}
						},
						{
							name:"Virtual Server DNS",
							protocol:"udp",
							type: "dns",
							ports:  {
								"udp": {
										port_fw:"53",
										port_dst:"53"
									}
								}
						},
						{
							name:"Virtual Server SMTP",
							protocol:"tcp",
							type: "smtp",
							ports:  {
								"tcp": {
										port_fw:"25",
										port_dst:"25"
									}
								}
						},
						{
							name:"Virtual Server POP3",
							protocol:"tcp",
							type: "pop3",
							ports:  {
								"tcp": {
										port_fw:"110",
										port_dst:"110"
									}
								}
						},
						{
							name:"Virtual Server SSH",
							protocol:"tcp",
							type: "ssh",
							ports: {
								"tcp": {
										port_fw:"22",
										port_dst:"22"
								}
							}
						},
						{
							name:"Virtual Server IPSec",
							protocol:"udp",
							type: "ipsec",
							hide_ports: true,														
							ports: {}
						},														
						{
							name: "Virtual Server FTP",
							protocol: "tcp",
							type: "ftp",
							ports: {
								"tcp": {
										port_fw:"20:21",
										port_dst:"20:21"
								}
							}
						},		
						{
							name: "Virtual Server SFTP",
							protocol: "tcp",
							type: "sftp",
							hide_ports: true,
							ports: { }
						},												
						{
							name: "Virtual Server Telnet",
							protocol: "tcp,udp,tcp/udp",
							type: "telnet",
							ports: {
								"tcp": {
										port_fw:"23",
										port_dst:"23"
								},
								"udp": {
										port_fw:"23",
										port_dst:"23"
								},
								"tcp/udp": {
										port_fw:"23",
										port_dst:"23"
								}
							}
						},
						{
							name: "Virtual Server PPTP",
							protocol: "tcp,udp,tcp/udp",
							type: "pptp",
							ports: {
								"tcp": {
										port_fw:"1723",
										port_dst:"1723"
								},
								"udp": {
										port_fw:"1723",
										port_dst:"1723"
								},
								"tcp/udp": {
										port_fw:"1723",
										port_dst:"1723"
								}
							}
						},						
						{
							name: "Virtual Server PCAnyWhere",
							protocol: "tcp/udp",
							type: "pcanywhere", 
							hide_ports: true,
							ports: { }
						},													
						{
							name: "Virtual Server VNC",
							protocol: "tcp,udp,tcp/udp",
							type: "vnc",
							ports: {
								"tcp": {
										port_fw:"5900",
										port_dst:"5900"
								},
								"udp": {
										port_fw:"5900",
										port_dst:"5900"
								},
								"tcp/udp": {
										port_fw:"5900",
										port_dst:"5900"
								}
							}
						},							
						{
							name: "Virtual Server TFTP",
							protocol: "udp",
							type: "tftp",
							ports: {
								"udp": {
										port_fw:"69",
										port_dst:"69"
								}
							}
						},						
						{
							name: "Virtual Server RDP",
							protocol: "tcp,udp,tcp/udp",
							type: "rdp",
							ports: {
								"tcp": {
										port_fw:"3389",
										port_dst:"3389"
								},			
								"udp": {
										port_fw:"3389",
										port_dst:"3389"
								},	
								"tcp/udp": {
										port_fw:"3389",
										port_dst:"3389"
								}						
							}
						}
						
					]





















function formVlan( __vlan, __pos ){
	formVlan.superclass.constructor.call( this );
	
	this.startForm()
		.add( new nodetext( 'vlanName', __vlan.name, { mandatory: true }), "name" )
		.add( new nodeCheckBox( 'vlanEnable', __vlan.en ), "enable" )
		.add( new nodeSelect( 'vlanType', __vlan.type ), "type" )
		.add( new node(), "body" );
		
	this.get( "type" )
		.addOption( 'vlan_wanu',		"wanu"		)
		.addOption( 'vlan_want',		"want"		)
		.addOption( 'vlan_bridge',		"bridge"	);
		
	if( is.set( __pos )) this.get( "type" ).disable().addOption( 'vlan_lan', "lan" );
		
	this.listen( "type", 'endform fieldchange', function( __status, __value ){
		
		switch( __value ){
			
			case 'lan':
			case 'wanu':
				 this.replace( "body", new formVlanWanU( __vlan ));
			break
			
			case 'want': this.replace( "body", new formVlanWanT( __vlan ));
			break
			
			case 'bridge': this.replace( "body", new formVlanBridge( __vlan ));
			break
		}
	});
	
	this.endForm();
	
	this.updateModel = function( __status ){

		if( __status.error ) return false;
		
		__vlan.name = this.get( "name" ).val(); 
		__vlan.en = this.get( "enable" ).val(); 
		__vlan.type = this.get( "type" ).val(); 
	}
		
}
extend( formVlan, node );





















function formVlanBridge( __vlan ){
	formVlanBridge.superclass.constructor.call( this );
	
	this.startForm()
		.add( new nodenum( 'vlanVid', __vlan.vid, { minval: 1, maxval: 4094, mandatory: true }), "vid" )
		.add( new nodeCheckBox( 'vlanMulticast', __vlan.for_stb, { hidden: true }), "multicast" )
		.add( new nodeSelect( 'vlanQos', __vlan.qos ), "qos" )
		.add( new nodeSelect( 'vlanPortsT', __vlan.port ), "port" );
		
	for( var i = 0; i < 8; i++ ) this.get( "qos" ).addOption( i );
	
	var availPorts = devu.vlan.getFreePortsT( 'bridge' );	
	var freePorts = devu.vlan.getFreePortsU( 'bridge' );

	if( freePorts.length ){

		this.add( new nodeOptions( 'vlanPortsU' ), "ports" );
		
		var ports = __vlan.ports;
		var p;
		
		for( var i = 0; i < freePorts.length; i++ ){
			
			p = freePorts[ i ];
			this.get( "ports" ).addOption( p, p, _.indexOf( ports, p ) >= 0 );
		}
	}
	else{

		this.add( new nodestatic( 'vlanPortsU', 'vlanNoFreePortsU', { translate: true }), "ports" );
	}
	
	for( var i = 0; i < availPorts.length; i++ ) this.get( "port" ).addOption( availPorts[ i ]);


	this.endForm();
	
	this.updateModel = function( __status ){

		if( __status.error ) return false;
	
		var ports = [];
		
		if( freePorts.length ){

			this.get( "ports" ).each( callback( this, function( __inx, __child ){
				
				if( __child.val()) ports.push( __child.getAlias());
			}));
		}
		
		var port = this.get( "port" ).val();

		if( _.indexOf( ports, port ) >= 0 ){
			
			__status.error = 'vlanErrPortsT'; alert( lng( __status.error )); return;
		}
			
		if( !ports.length ){
			
			__status.error = 'vlanErrNoPorts'; alert( lng( __status.error )); return;
		}	
		
		__vlan.ports = ports
		__vlan.port = port;
		__vlan.vid = this.get( "vid" ).val();
		__vlan.qos = parseInt( this.get( "qos" ).val());


	}
		
}
extend( formVlanBridge, node );





















function formVlanWanT( __vlan ){
	formVlanWanT.superclass.constructor.call( this );
	
	this.startForm()
		.add( new nodenum( 'vlanVid', __vlan.vid, { minval: 1, maxval: 4094, mandatory: true }), "vid" )
		.add( new nodeSelect( 'vlanQos', __vlan.qos ), "qos" )
		.add( new nodeSelect( 'vlanPortsT', __vlan.port ), "port" );
		
	for( var i = 0; i < 8; i++ ) this.get( "qos" ).addOption( i );

	var availPorts = devu.vlan.getAvailPorts();
	
	for( var i = 0; i < availPorts.length; i++ ) this.get( "port" ).addOption( availPorts[ i ]);
	
	this.endForm();
	
	this.updateModel = function( __status ){

		if( __status.error ) return false;

		__vlan.port = this.get( "port" ).val();
		__vlan.vid = this.get( "vid" ).val();
		__vlan.qos = parseInt( this.get( "qos" ).val());
	}
		
}
extend( formVlanWanT, node );





















function formVlanWanU( __vlan ){
	formVlanWanU.superclass.constructor.call( this );
	
	this.startForm()
		.add( new nodeCheckBox( 'vlanMulticast', __vlan.for_stb, { hidden: true }), "multicast" );
		
	var freePorts = devu.vlan.getFreePortsU();

	if( freePorts.length ){

		this.add( new nodeOptions( 'vlanPortsU' ), "ports" );
		
		var ports = __vlan.ports;
		var p;
		
		for( var i = 0; i < freePorts.length; i++ ){
			
			p = freePorts[ i ];
			this.get( "ports" ).addOption( p, p, _.indexOf( ports, p ) >= 0 );
		}
	}
	else{

		this.add( new nodestatic( 'vlanPortsU', 'vlanNoFreePortsU', { translate: true }), "ports" );
	}
	

	this.endForm();
	
	this.updateModel = function( __status ){

		if( __status.error ) return false;
	
		var ports = [];
		
		if( freePorts.length ){

			this.get( "ports" ).each( callback( this, function( __inx, __child ){
				
				if( __child.val()) ports.push( __child.getAlias());
			}));
		}
		
		if( !ports.length ){
			
			__status.error = 'vlanErrNoPorts'; alert( lng( __status.error ));
		}
		
		__vlan.ports = ports;


	}
		
}
extend( formVlanWanU, node );





















function pageVlan(){
	pageVlan.superclass.constructor.call(this);
	
	this.add(new node(), "grid");
	
	
	this.bind( 'updaterq', function(){
		
		rootView.showModalOverlay();
		devu.vlan.pull( callback( this, function(){
			
			rootView.hideWaitScreen();
			rootView.hideModalOverlay();
			this.deep.updateView();
			
		}), callback( this, function(){
			
			rootView.hideModalOverlay();
			node.prototype.updateView.call( this, 'forward' );

			this.$box.errorBlock( lng( 'error' ), lng( 'rpcReadError' ), null, lng( 'refresh' ), callback( this, function(){ this.emit( 'updaterq' )}));
		}));
	});

	this.updateView = function( __phase ){
		pageVlan.superclass.updateView.apply( this, arguments );

		if( __phase == 'back' ){
		
			var wc = devu.vlan.show();
			
			var header = [
				{ index: 'name',	name: "vlanName"	},
				{ index: 'type',	name: "vlanType"	},
				{ index: 'portsU',	name: "vlanPortsU"	},
				{ index: 'portT',	name: "vlanPortT"	},
				{ index: 'vid',		name: "vlanVid"		},
				{ index: 'enable',	name: "vlanEnable"	}];
	
			//var $grid0 = this.$box.lightUIGrid( header, wc.length, { clickable: true});
			
            var $grid0 = this.cleanButtonBar().child("grid").$box.html("\
				<div class='grid rm' style=''></div>\
				<div class='buttonsInline'>\
				<div class='button add'></div>\
                                </div>\
			").find('.grid').lightUIGrid(header, wc.length, {
				clickable:true
			});			
					
			for( var i = 0; i < wc.length; i++ ){
				
				var $row = $grid0.row( i );
				var v = wc[ i ];
				
				var en = v.en ? 'yes' : 'no';
				var type = 'vlan_' + v.type;
				
				$row.col( 'name' )	.html( v.name );
				$row.col( 'type' )	.html( lng( type )).attr( 'langkey', v.type );
				$row.col( 'portsU' ).html( v.ports ? v.ports.toString() : '' );
				$row.col( 'portT' )	.html( v.port ? v.port : '' );
				$row.col( 'vid' )	.html( v.vid || '' );
				$row.col( 'enable' ).html( lng( en )).attr( 'langkey', en );
				
				$row.data( 'pos', v.pos );				
			}
				
			$grid0.bind( 'rowclick.grid', callback( this, function( __event, __$row ){

				var pos = __$row.data( 'pos' );
				var v = devu.vlan.cut( pos );
				

					
				var form = new formVlan( v, pos );

				addButtonsToForm.call( this, form, v, pos );
										
				form.deep.updateView( this.$box );
			}));
			
			this.cleanButtonBar()
				.addButton( 'add' )
				.getButton( 'add' )
				.bind( 'click.button', callback( this, function(){

					var v = { type: 'want', en: true };
					var form = new formVlan( v );

					addButtonsToForm.call( this, form, v );

					form.deep.updateView( this.$box );
				}));

			function addButtonsToForm( __form, __v, __pos ){
				
				function onApply(){
					
					this.emit( 'updaterq' );
				}

				function applyVlan(){

					// Можно сказать что костыль, timer1 - рубим запрос не дожидаясь ответа, timer2 - обновляем страницу
					rootView.showWaitScreen( lng( "pleaseWait" ),  10000*3 );
					var timer1 = setTimeout(context(this).callback(function(){ device.stop(); }), 10000/2);
					var timer2 = setTimeout( callback( this, onApply ),  10000*2 );
					
					devu.vlan.push( callback( this, onApply), callback( this, function(){
						
						alert( lng( 'rpcWriteError' ));
						this.emit( 'updaterq' );
					}));
				}
				
				this.cleanButtonBar()
					.addButton( 'button_prev' )
					.getButton( 'button_prev' )
					.bind( 'click.button', callback( this, function(){
						
						if( !checkChanges() || confirm( lng( 'leavePageMes' ))) this.emit( 'updaterq' );
					}));

				if( is.set( __pos)){
					
					this.addButton( 'button_del' );
										
					var services = devu.vlan.hasServices( __v );					
					if( services && _.size( services )){

						function getNames( services ){

							return _.map( services, function( __value ){

								if( __value.tunnels && _.size( __value.tunnels )){

									return _.values( __value.tunnels )[ 0 ].name;
								}
								else return __value.name;
							});
						}
						
						this.getButton( 'button_del' )
							.bind( 'click.button', callback( this, function(){
								alert( lng( 'vlanKillAllConns3' ) + ' ' + getNames( services ).toString() + '.' );
							}));
					
					}else{
						this.getButton( 'button_del' )
							.bind( 'click.button', callback( this, function(){
								if( confirm( lng( 'vlanDelConfirm' ))){

									applyVlan.call( this );
								}		
							}));
					}
				}
					
													
				if( __v.type == 'lan' ){
					
					this.getButton( 'button_del' ).disable();
				}

				this.addButton( 'save' )
					.getButton( 'save' )
					.bind( 'click.button', callback( this, function(){
						
						if( __form.deep.updateModel()){
							
							if( is.set( __pos)){
							
								var err = devu.vlan.set( __pos, __v );
							}
							else{

							
								var err = devu.vlan.add( __v );
							}

								
							if( err ){
								
								switch( err ){
									
									case 'vlanLimitWanU': alert( lng( err ) + ' ' + devu.vlan.__VLAN_WANU_LIMIT + '.' );
									break;
									case 'vlanLimitWanT': alert( lng( err ) + ' ' + devu.vlan.__VLAN_WANT_LIMIT + '.' );
									break;
									case 'vlanLimitWan': alert( lng( err ) + ' ' + devu.vlan.__VLAN_WAN_LIMIT + '.' );
									break;
									default: alert( lng( err ));
								}
							}
							else{
								
								debug( devu.vlan.commit());
								
								applyVlan.call( this );
							}
						}
					}));
			}		
					
								
		}
	}
}
extend( pageVlan, node );





















device.hook(device.signal.PROCESS, function(state, jqXHR){
		if(!state){
			if (jqXHR.answer && jqXHR.answer.rpcWAN){
					window.rpcWanAnswer = jqXHR.answer.rpcWAN.iface_names;
			}
		}
	});
device.filter(function(url, type, data, cb){
		var lockByIface = {};
		var locker;
		if (data)
			if (typeof(data) == 'string'){
				var str = data;
				
				var arrForJson = str.split("&");
				var jsonFromStr = {};
				for (var i = 0; i< arrForJson.length; i++){
					var pair = arrForJson[i].split("=");
					jsonFromStr[pair[0]] = pair[1];
				}
				var iface = '';
				var res_buf = '';
				if (jsonFromStr["res_config_id"] && 
					jsonFromStr["res_config_id"] ==  1 && 
					jsonFromStr["res_config_action"] ==  2){
					res_buf = jsonFromStr["res_buf"];
					var re = /.*(?=\"\])/;
					iface = re.exec(res_buf.substring(2))[0];
					locker = getLockers(window.rpcWanAnswer,iface);
					if(locker) lockByIface[iface] = locker;
				}else{
					var lock;
					for (var i in jsonFromStr){
						if (i.indexOf("res_config_id")!=-1 && jsonFromStr[i] == 1){
							var id = i.substring(13,i.length);
							if (jsonFromStr["res_config_action"+id] ==  2){
								res_buf = jsonFromStr["res_buf"+id];
								var re = /.*(?=\"\])/;
								iface = re.exec(res_buf.substring(2))[0];
								locker = getLockers(window.rpcWanAnswer,iface);
								if(locker) lockByIface[iface] = locker;
								break;
							}
						}
					}
				}

			}else if (typeof(data) == 'object'){
				jsonFromJqXHR = data;
				if (jsonFromJqXHR["res_config_id"] && 
					jsonFromJqXHR["res_config_id"] ==  1 && 
					jsonFromJqXHR["res_config_action"] ==  2){
					res_buf = jsonFromJqXHR["res_buf"];
					if( is.string(res_buf) ){
						var re = /.*(?=\"\])/;
						iface = re.exec(res_buf.substring(2))[0];
						locker = getLockers(window.rpcWanAnswer,iface);
						if(locker) lockByIface[iface] = locker;
					}
				}else{
					for (var i in jsonFromJqXHR){
						if (i.indexOf("res_config_id")!=-1 && jsonFromJqXHR[i] == 1){
							var id = i.substring(13,i.length);
							if (jsonFromJqXHR["res_config_action"+id] ==  2){
								res_buf = jsonFromJqXHR["res_buf"+id];
								if( is.string(res_buf) ){
									var re = /.*(?=\"\])/;
									iface = re.exec(res_buf.substring(2))[0];			
									locker = getLockers(window.rpcWanAnswer,iface);
									if(locker) lockByIface[iface] = locker;
								}
							}
						}
					}
				}
			}
	//Объединить лочки от всех интерфейсов и устранить дубликаты
	var lockers = {};
	var lock;
	for(var ii in lockByIface){
		lock = lockByIface[ii];
		for(var j=0; j<lock.length; j++){
			lockers[lock[j]] = true;
		}
	}

	var lockersLength = getObjectLength(lockers);
	if(lockersLength){
		//Сформировать список меню
		var menus = "";
		var locker, menu;
		for(var i in lockers){
			switch(i){
				case "voip":
					lockers[i] = "voice/voip_basic";
					menus += " " + lng("menu_voice") + ",";
				break;
				case "tr":
					lockers[i] = "advanced/tr69";
					menus += " " + lng("menu_tr69") + ",";
				break;
			}
		}
		menus = menus.substr(0, menus.length - 1);
		
		if(lockersLength > 1){
			alert(lng("rejectDelCon0")
					+ "\n"
					+ menus
					+ "."
					+ "\n"
					+ " " + lng("rejectDelCon2") + ".");
		}
		else{
			if(confirm(lng("rejectDelCon0")
						+ "\n"
						+ menus
						+ "."
						+ "\n"
						+ " " + lng("rejectDelCon2") + "."
						+ " " + lng("rejectDelCon3"))){
				window.location.hash = getObjectFirstChild(lockers);
			}						
		}
		
		rootView.hideModalOverlay();
		return false;
	}
		
	return true;
});
	
function getLockers(iftree, ifname){
	for (var i in iftree){
		var services = iftree[i].services;
		if (services){
			if(!iftree[i].is_wan) continue;
			for (var j in services){
				var service = services[j];
				var tunnels = service.tunnels
				if(tunnels && getObjectLength(tunnels)){
					for(var t in tunnels){
						if (t == ifname){
							var lock = service.lock;
							if(lock) return lock;
						}
					}
				}
				if (j == ifname){
					var lock = service.lock;
					if(lock) return lock;
				}
			}
		}
	}
}






















function jsWANIGMPModel(service) {
	jsWANIGMPModel.superclass.constructor.call(this);

	this.service = service;
}
extend(jsWANIGMPModel, jsModel);

function jsWANIGMPController(service) {
	jsWANIGMPController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsWANIGMPClientView};
	this.ifaceTypes.summary = {type: jsWANIGMPSummaryView};

	this.changeModel(new jsWANIGMPModel(service));

	var snoopmode = service.snoop?service.snoop_mode:"off";
	var obj = [];
	var hide;
	
	if(service.is_wan){
		this.addChild(new jsInputController(service.igmp), "igmp");
	}
	else{
	}


	
}
extend(jsWANIGMPController, jsFieldSetController);

function jsWANIGMPClientView(ctrl, viewInx, options) {
	var service = ctrl.model.service;
	
	if(service.is_wan){

		hide = false;

		obj = ctrl.getChild("igmp");
		obj.nextIface = "checkbox";
		obj.ifaceTypes.checkbox.options = {
			humanName: "wanIgmp",
			valset: {on:true, off:false},
			hide: hide
		};
	}
	else{
	}

	jsWANIGMPClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	

	this.updateModel = function(){
		var res = jsWANIGMPClientView.superclass.updateModel.call(this);
		if(res){
			var service = this.ctrl.model.service;
			if(service.is_wan){
				service.igmp = this.getChild("igmp").ctrl.model.value;
			}
			else{
			}
		}
		return res;
	}
	
}
extend(jsWANIGMPClientView, jsFieldSetClientView);

function jsWANIGMPSummaryView(ctrl, viewInx, options) {
	var obj = ctrl.getChild("igmp");
	obj.nextIface = "checkbox";
	var opt = obj.ifaceTypes.checkbox.options = {
		humanName: "wanIgmp"
	}
	var service = ctrl.model.service;
	opt.hide = (service.contype == "3g"
		|| service.type == "lte"
		|| service.type == "pppv6"
		|| service.type == "ipv6"
		|| service.level == 4);
	jsWANIGMPSummaryView.superclass.constructor.call(this, ctrl, viewInx, options);
}
extend(jsWANIGMPSummaryView, jsWANIGMPClientView);






















function jsWansController(){
	jsWansController.superclass.constructor.call(this);
	this.ifaceTypes.client = {type: jsWansClientView};
	this.ifaceTypes.client.options = {inputPadding: "200px"};
	
	this.addChild(new jsWanSetController(), "wanset");
	
	/* Name:		onupdaterq
	* Description: 	обработчик события updaterq
	* 				переправляет запрос на обновление своему потомку, которому оно реально нужно
	* Arguments:	                                                                            
	* Return value:	нет
	* Notes:		
	*/
	this.onupdaterq = function(){
		window.hasChanges = null;
		this.getChild("wanset").event("updaterq");
	}
	
	this.addEventHandler("updaterq", this.onupdaterq);
}
extend(jsWansController, jsFieldSetController);


function jsWansClientView(ctrl, viewInx, options){
	jsWansClientView.superclass.constructor.call(this, ctrl, viewInx, options);


	this.options.title = {name:"menu_ethernet", type:"text" /*type:"link"*/}
	this.options.nothing = true;

	
	/* Name:		onrecselect
	* Description: 	обработчик события recselect
	* Arguments:	recordInx - индекс записи в модели jsRecordSetModel                                                                            
	* Return value:	нет
	* Notes:		
	*/
	this.onrecselect = function(recordInx){
	
		this.isadding = (recordInx < 0);

		this.getChild("wanset").options.editBoxSel = this.viewBoxSel;
		this.getChild("wanset").drawView();

		return false;
	}
	

	/* Name:			onupdmodel
	 * Description: 	обработка события updmodel
	 * Arguments:		model - модель
	 * Return value:	нет
	 * Compatibility:	
	 * Notes:
	 */
	this.onupdmodel = function(model){
		this.options.buttons = 	[
									{name:"button_del", value:"button_del", handler:this.del},
									{name:"add", value:"add", handler:this.add}
								];


		
		this.drawView()

		//Проверка прав на рпц
		if(disableFlag(1)){
			var buttons = this.options.buttons;
			for(var i=0; i<buttons.length; i++){
				if(buttons[i].name == "add" || buttons[i].name == "button_del"){
					this.disableButton(buttons[i].name);
				}
			}
		}
		
		this.hideModalOverlay();
		return false;
	}

	/* Name:		add
	* Description: 	обработчик нажатия на кнопку add
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	
	this.del = function(){
		var table = $(this.viewBoxSel).find('table tr');
		var massdel = [];
		var data = [];
		table.each(function(index) {
			if ( $(this).find('td:eq(0) input').prop('checked') && index != 0) {
				massdel.push(index - 1);
			}
		});
		if(massdel.length) {
			for (var i = 0; i < massdel.length; i++) {
				data.push(this.ctrl.getChild("wanset").model.recordSet[massdel[i]].ifaceL3)
			}
		}
		if(data.length) {
			this.ctrl.getChild("wanset").data = data;
			this.ctrl.getChild("wanset").event("deleterulerq");
		}
	}
	
	this.add = function(){
		this.disableButton("add");
		this.ctrl.getChild("wanset").event("recselect", -1);
	}
	
	this.disgw = function(){
		this.ctrl.getChild("wanset").event("disgw");
	}
	this.bind("recselect", this.onrecselect);
	this.bind("updmodel", this.onupdmodel);

}
extend(jsWansClientView, jsFieldSetClientView);



function jsWanSetController(){
	jsWanSetController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsWanSetClientView};
	this.ifaceTypes.client.options = {
										header:
											[
												{key:"remove", name:""},
												{key:"name", name:"wanName"},
												{key:"srvType", name:"wanType"},
												{key:"l2Param", name:"wanPort"},
												{key:"statusText", name:"wanStatus"},
												{key:"direction", name:"wanDirection"},
												{key:"gwif", name:"wanGwIf"}
											]
									};


	this.ifaceTypes.server = {type: jsWanSetServerView};
	this.ifaceTypes.server.options = {action: "index.cgi", plainIface:true};
	
	this.ifaceTypes.serverGwif = {type: jsWanSetGwifServerView};
	this.ifaceTypes.serverGwif.options = {action: "index.cgi", plainIface:true};
	
	this.changeModel(new jsRecordSetModel());
	
	this.nextIface = "server";
	this.addIface();
	this.nextIface = "serverGwif";
	this.addIface();

	
	this.addServices = function(ifnode, srvsname){
		var jj;
		var service;
		var services = ifnode[srvsname];
		var obj;
		var contype;
		var contypeTab;
		var patt;
		var typeisv6;

		if(services){
			for(var j in services){				
				service = services[j];
				service.ifname = j=="create"?"":j;
				
				
				if(service.ifname == "br0"){
					setCookie("lan_ip", service.ip);
				}
				if(!ifnode.is_wan) continue;
	
				var tunnels = service.tunnels;
				if(tunnels && getObjectLength(tunnels)){
					for(var t in tunnels){
						tunnel = tunnels[t];
						tunnel.ifname = t=="create"?"":t;
	
						jj = this.model.recordSet.length;
						this.model.recordSet.push({});
						obj = this.model.recordSet[jj];
						
						obj.name = tunnel.name?tunnel.name:tunnel.ifname;
						obj.typeL2 = service.type;
						obj.ifaceL2 = service.ifname;
						contypeTab = contype = getConnType(ifnode, service, tunnel);
						
						obj.srvType = connTypeValSet[contypeTab];
						obj.enableText = tunnel.enable?lng("yes"):lng("no");
						if(contype != "pptp"
							&& contype != "l2tp"
							&& contype != "624"){
							obj.gwif = {value: (tunnel.gwif || service.gwif), type:"radio", extrattrs:{}};
						}
						obj.l2Param = this.getL2Param(ifnode);
						obj.ifaceL3 = tunnel.ifname;
						//ссылки на узлы дерева
						obj.ifnode = ifnode;
						obj.srvnode = service;
						obj.tnlnode = tunnel;
						
						if ( tunnel.gwif && service.gwif ) {							
							if (tunnel.metric && tunnel.metric > service.metric ) {
								obj.statusText = this.getStatus(service);
							} else {
								obj.statusText = this.getStatus(tunnel);
							}						
						} else {
							if ( tunnel.gwif || service.type == "auto") {
								obj.statusText = this.getStatus(tunnel);
							} else {
								obj.statusText = this.getStatus(service);
							}
						}
												
						obj.direction = ifnode.is_wan?"WAN":"LAN";
					}
				}
				else if(service.type != "auto"){
				
					jj = this.model.recordSet.length;
					this.model.recordSet.push({});
					obj = this.model.recordSet[jj];
					obj.srvsname = srvsname;
					obj.name = (service.name?service.name:service.ifname).toString();
					obj.typeL2 = ifnode.type;
					//выбор srvType по комбинации по типу сервиса и типа L2 интерфейса
					obj.srvType = connTypeValSet[getConnType(ifnode, service)];
					obj.enableText = service.enable?lng("yes"):lng("no");
					patt = /.*v6$/;
					typeisv6 = patt.test(service.type);
					if(!typeisv6){
						obj.gwif = {value:service.gwif, type:"radio", extrattrs:{}};
						if(service.type == "bridge"){
							obj.gwif.extrattrs.disabled = true;
						}
					}
					if(this.model.recordSet[jj].srvType == "bridge" || !ifnode.is_wan){
						obj.gwif.extrattrs.disabled = "";
					}
					//#### L2 settings
					obj.ifaceL2 = ifnode.ifname;
					obj.l2Param = this.getL2Param(ifnode);
					//#### L3 settings
					obj.ifaceL3 = service.ifname;
					//ссылки на узлы дерева
					obj.ifnode = ifnode;
					obj.srvnode = service;
					obj.statusText = this.getStatus(service);
					obj.direction = ifnode.is_wan?"WAN":"LAN";
				}
				
				if ( obj && this.no_gwif ) {
					if (( obj.gwif && obj.gwif.value ) || ( obj.gwifv6 && obj.gwifv6.value )) {
						this.no_gwif = false;
					}
				}
			}
		}
	}
	
	/* Name:		addRecord
	* Description: 	добавить запись
	* Arguments:	obj - узел интерфейса
	* Return value:	нет
	* Notes:		
	*/
	this.addRecord = function(obj){
		/* костыль к access_rights ( для скрытия подключений ) */		
		this.addServices(obj, "services");		
	}

	/**Сгенерировать описание интерфейса уровня L2 для таблицы.
	 * @param	{Object}	ifnode	Узел интерфейса.
	 * @return	{String}			Описание интерфейса уровня L2.
	 */
	this.getL2Param = function(ifnode){
		var l2Param = "";
		
		if(ifnode.type == "atm"){
			l2Param = ifnode.ifname + "(" + ifnode.pvc_settings.vpi+"/"+ifnode.pvc_settings.vci + ")";
		}
		else if(ifnode.type == "ethernet" || ifnode.type == "ptm" || ifnode.type == "3g" || ifnode.type == "lte"){
			l2Param = ifnode.port?ifnode.port:"";
		}
		else if(ifnode.type == "bridge"){
			if(ifnode.port){
				l2Param = ifnode.port;
			}
			else if(ifnode.members){
				l2Param = "";
				var memberNode;
				var desc;
				for(var i=0;i<ifnode.members.length-1;i++){
					memberNode = this.getIfaceByName(ifnode.members[i]);
					desc = (memberNode && memberNode.port)?memberNode.port:ifnode.members[i];
					l2Param += desc + ",";
				}
				memberNode = this.getIfaceByName(ifnode.members[ifnode.members.length-1]);
				desc = (memberNode && memberNode.port)?memberNode.port:ifnode.members[ifnode.members.length-1];
				l2Param += desc;
			}
			else{
				l2Param = ifnode.ifname;
			}
		}
		else if(ifnode.type == "auto"){
			l2Param = lng("wanAuto");
		}
		return l2Param;
	}
	
	/**Сгенерировать описание статуса соединения.
	 * @param	{Object}	obj	Сервис или туннель.
	 * @return	{String}		Описание статуса соединения с ледом.
	 */
	this.getStatus = function(obj){
		var statusText = "";
		if(obj.enable){
			if(obj && obj.connection_status){
				if(obj.connection_status == "Connected"){
					statusText = lng("statWanUp") + "<img src='image/ledgreen.gif'/>";
				}
				else if(obj.connection_status == "Disconnected"){
					statusText = lng("statWanDown") + "<img src='image/ledred.gif'/>";
				}
				else{
					statusText = lng(obj.connection_status) + "<img src='image/ledyellow.gif'/>";
				}
			}
			else{
				statusText = lng("statWanDown") + "<img src='image/ledred.gif'/>";
			}
		}
		else{
			statusText = lng("disable") + "<img src='image/ledgrey.gif'/>";
		}
		return statusText;
	}
	
	/* Name:		prepareRecordSet
	* Description: 	подготовить model.recordSet по model.
	* Arguments:	нет
	* Return value:	нет
	* Notes:		
	*/
	this.prepareRecordSet = function(){
		var service;
		var services;
		var jj = 0;
		var obj = this.model.ifTree;
		var memberNode;
		this.model.recordSet = new Array();
		
		if(obj.baddata) return;
	
		this.no_gwif = true;
		for(var i in obj){
			obj[i].ifname = i=="create"?"":i;
			if(obj[i].type == "bridge"){
				for(var j in obj[i].members){
					memberNode = this.getIfaceByName(obj[i].members[j]);
					if(memberNode) memberNode.inbridge = true;
				}
			}
			this.addRecord(obj[i]);
		}
	}
	
	/* Name:		onrecselect
	* Description: 	обработчик события recselect
	* Arguments:	recordInx - индекс записи в модели jsRecordSetModel                                                                            
	* Return value:	нет
	* Notes:		
	*/
	this.onrecselect = function(recordInx){
		var isadding = false;
		var ifnode;
		var ifname = null;
		var srvname = null;
		var tnlname = null;
		var srvsname = null;
		
		if(recordInx < 0){
			//Изменить индекс активной записи
			recordInx = this.activeRecordInx = 9999;
		}
		else{
			var record = this.model.recordSet[recordInx];
			ifname = record.ifnode.ifname;
			srvname = record.srvnode.ifname;
			srvsname = record.srvsname;
			record.ifnode.ismyiface = true;
			record.srvnode.ismyiface = true;
			if(record.tnlnode){
				tnlname = record.tnlnode.ifname;
				record.tnlnode.ismyiface = true;
			}
			this.recordInx = recordInx;
		}

		//удалить всех детей

		this.children = [];
		this.children_refs = {};
		this.childActiveInx = -1;
		
		//tabs container
		var mainTab = this.addChild(new jsConnsMainTabController(this.model.ifTree, ifname, srvname, tnlname, null, null, null, this.model.deviceInfo.factory_wan_mac), "mainTab");

		mainTab.model.lanClients = this.model.lanClients;
		mainTab.model.jsonIGMP = this.model.jsonIGMP;
		mainTab.model.deviceInfo = this.model.deviceInfo;
		return jsWanSetController.superclass.onrecselect.call(this, recordInx);
	}
		
	/* Name:		getIfaceByName
	* Description: 	получить узел в дереве интерфейсов по имени интерфейса
	* Arguments:	ifname - имя интерфейса
	* Return value:	нет
	* Notes:		
	*/
	this.getIfaceByName = function(ifname){
		return this.model.ifTree[ifname];
	}
		
	this.addEventHandler("recselect", this.onrecselect);

	
	this.updateTable = function() {	

			device.config.read([1], callback(this, function(data){
				obj = data.rq[0].resident.iface_names;				
				for(var i in obj){
					if(obj[i].services){			
						for(var j in obj[i].services){
							var name = obj[i].services[j].name;
							var status_object = obj[i].services[j];										
							var tunels = obj[i].services[j].tunnels;
							
							for ( var t in tunels ) {
								name = tunels[t].name;
								if ( tunels[t].gwif ) {
									status_object = tunels[t];
									break;
								}						
							}

							var self = this;							
							$('.gridTable tbody tr').each(function() {
								if ( $(this).find('td:eq(1)').text() == name ) {
									$(this).find('td:eq(4)').html( self.getStatus(status_object) );
								}
							});		
							
						}
					}				
				}
				
			
			}));
	}	
	if ( !window.WAN_LIST_UPDATE ) {
		window.WAN_LIST_UPDATE = setInterval(context(this).callback(this.updateTable),5000); 
	}

}
extend(jsWanSetController, jsRecordSetController);



function jsWanSetClientView(ctrl, viewInx, options){
	var opt;
	
	jsWanSetClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	jsWanSetClientView.prototype.onupdmodel = function(model){
		this.drawView();
		return false;
	}

	jsWanSetClientView.prototype.onupdmodel = function(model){
		this.drawView();
		return false;
	}

	this.drawView = function(){
		jsRecordSetClientView.prototype.drawView.call(this);
		var table = $(this.myBoxSel+'>table');
		table.find('tbody tr').each(function(index) {
			if ( ($(this).find('td:eq(0) input').length == 0)) {
				$(this).find('td:eq(0)').append('<input type="checkbox" /> ')
			}
		});
		
		if($(".wanGwifErr").length == 0) {
			$('.gridTable').parent("div").append("<div class=\"wanGwifErr\"></div>");
		}	
		if( ctrl.no_gwif && ctrl.model.recordSet.length > 0 ) {			
			$(".wanGwifErr").html(lng("wanGwifErr"));								
		} else {
			$(".wanGwifErr").empty();
		}
	}

 
	jsWanSetClientView.prototype.onrowclick = function(event){
		var target = $(event.target);
		if((event.target.type != 'checkbox') && !(target.children().is("input:checkbox"))) {
			this.ctrl.event("recselect", event.data.recordInx);
		}
	}

	/* Name:			checkQos
	 * Description: 	Настроить секцию QoS
	 * Arguments:		qos - класс обслуживания
	 * Return value:	нет
	 * Compatibility:	
	 * Notes:
	 */
	this.checkQos = function(qos){
		var divQos = this.getChild("divQos");
		switch(qos){
			case "ubr":
				divQos.getChild("pcr").hide();
				divQos.getChild("scr").hide();
				divQos.getChild("mbs").hide();
			break;
			case "ubr_pcr":
				divQos.getChild("pcr").show();
				divQos.getChild("scr").hide();
				divQos.getChild("mbs").hide();
			break;
			case "cbr":
				divQos.getChild("pcr").show();
				divQos.getChild("scr").hide();
				divQos.getChild("mbs").hide();
			break;
			case "nrtvbr":
				divQos.getChild("pcr").show();
				divQos.getChild("scr").show();
				divQos.getChild("mbs").show();
			break;
			case "rtvbr":
				divQos.getChild("pcr").show();
				divQos.getChild("scr").show();
				divQos.getChild("mbs").show();
			break;
		}
	}

	/* Name:			onupdmodel
	 * Description: 	обработка события updmodel
	 * Arguments:		model - модель
	 * Return value:	нет
	 * Compatibility:	
	 * Notes:
	 */
	this.onupdmodel = function(model){
		return true;
	}

	/* Name:		onrecselect
	* Description: 	обработчик события recselect
	* Arguments:	recordInx - индекс записи в модели jsRecordSetModel                                                                            
	* Return value:	нет
	* Notes:		
	*/
	this.onrecselect = function(recordInx){
		var isadding = false;
		if(recordInx < 0){ 
			isadding = true;
		}

		//tabs container
		this.ctrl.getChild("mainTab").ifaceTypes.client.options = {nothing: true};
		return jsWanSetClientView.superclass.onrecselect.call(this, recordInx);
	}

	this.bind("updmodel", this.onupdmodel);
	this.bind("recselect", this.onrecselect);
}
extend(jsWanSetClientView, jsRecordSetClientView);




function jsWanSetServerView(ctrl, viewInx, options){
	jsWanSetServerView.superclass.constructor.call(this, ctrl, viewInx, options);
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		var data = this.options.sender.responseData;
		this.ctrl.model.ifTree = {};
		if(data){
			if(!data.baddata  && data.rq){
				var i = 0;
				if(data.rq[i] && data.rq[i].resident && data.rq[i].resident.iface_names){
					this.ctrl.model.ifTree = data.rq[i].resident.iface_names;
					if(!this.ctrl.model.ifTree) this.ctrl.model.ifTree = {};
				}
				i++;
				if(data.rq[i] && data.rq[i].resident) {
					this.ctrl.model.lanClients = data.rq[i].resident;
				}
				i++;
				if(data.rq[i] && data.rq[i].resident) {
					this.ctrl.model.jsonIGMP = data.rq[i].resident;
				}
				i++;

				if(data.rq[i] && data.rq[i].resident) {
					this.ctrl.model.deviceInfo = data.rq[i].resident;;
				}
				i++;
			}
		}
		if(this.mode && this.mode != "update"){
			this.ctrl.event("updaterq");			
		}
		else{
				this.ctrl.prepareRecordSet();
				var editLan = getCookie("editLAN");
				if (editLan != "") {
					deleteCookie("editLAN");
					var recs = this.ctrl.model.recordSet;
					for (var i in recs) {
						if (recs[i].ifaceL2 == "br0" && recs[i].srvnode.ip == editLan) {
							this.ctrl.event("recselect", i);						
							break;
						}
					}
				}
		}
	}
	
	/* Name:			prepareData
	 * Description: 	подготовить данные для отправки на сервер
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.prepareData = function(){
		var obj;
		var delim = "|";
		var ctrl = this.ctrl;

		switch(this.mode){
			case "add":
			case "save":
				var general = ctrl.getChild("mainTab", "general");
				var model = general.model;
				var res_buf;
				
				var res_pos;
				if(this.mode == "add"){
					res_pos = -1;
				}
				else{
					res_pos = 0;
				}

				obj = {
					v2: "y",
					rq: 0
				}

				if(model.ifnode.needDelete instanceof Array){
					obj["res_config_id" + obj.rq] = 1;
					obj["res_config_action" + obj.rq] = 2;
					obj["res_json" + obj.rq] = "y";
					obj["res_data_type" + obj.rq] = "json";
					obj["res_struct_size" + obj.rq] = 36;
					obj["res_buf" + obj.rq] = $.toJSON(model.ifnode.needDelete);
					obj.rq++;

					delete model.ifnode.needDelete;
				}

				var contype = model.ifnode.contype;
				if(contype == "statpppoe" || contype == "dynpppoe"){
					var service2 = $.extend(true, {}, getObjectFirstChild(model.service.tunnels));
					var srvname2 = getObjectFirstKey(model.service.tunnels);
					delete model.service.tunnels;
					var blankConn2 = $.extend(true, {}, model.blankConn);
					var services = getObjectFirstChild(blankConn2).services = {};
					services[srvname2] = service2;
				}

				obj["res_config_id" + obj.rq] = 1;
				obj["res_config_action" + obj.rq] = 3;
				obj["res_json" + obj.rq] = "y";
				obj["res_data_type" + obj.rq] = "json";
				obj["res_struct_size" + obj.rq] = 36;
				obj["res_pos" + obj.rq] = res_pos;

				res_buf = $.toJSON(general.model.blankConn);
				res_buf = res_buf.replace(/%/g,"%25");
				res_buf = res_buf.replace(/#/g,"%23");
				res_buf = res_buf.replace(/&/g,"%26");

				obj["res_buf" + obj.rq] = res_buf;

				obj.rq++;

				if(is.object(blankConn2)){
					obj["res_config_id" + obj.rq] = 1;
					obj["res_config_action" + obj.rq] = 3;
					obj["res_json" + obj.rq] = "y";
					obj["res_data_type" + obj.rq] = "json";
					obj["res_struct_size" + obj.rq] = 36;
					obj["res_pos" + obj.rq] = res_pos;
	
					res_buf = $.toJSON(blankConn2);
					res_buf = res_buf.replace(/%/g,"%25");
					res_buf = res_buf.replace(/#/g,"%23");
					res_buf = res_buf.replace(/&/g,"%26");
	
					obj["res_buf" + obj.rq] = res_buf;
	
					obj.rq++;
				}

				if(this.ctrl.getChild("mainTab").model.enIGMPGlobal){
					obj["res_json" + obj.rq] = "y";
					obj["res_data_type" + obj.rq] = "json";
					obj["res_config_action" + obj.rq] = 3;
					obj["res_config_id" + obj.rq] = 68;
					obj["res_struct_size" + obj.rq] = 0;
					obj["res_buf" + obj.rq] = $.toJSON({enable: true, version: 2});
					obj.rq++;
				}
				
				this.addToRequest(obj);
			break;
			case "update":
				obj = {
					v2: "y",
					rq: 1,
					res_json0: "y",
					res_config_action0: 1,
					res_config_id0: 1,
					res_struct_size0: 36,
					res_config_deviceinfo0: 1
				};
				obj["res_json"+obj.rq] = "y";
				obj["res_config_action"+obj.rq] = 1;
				obj["res_config_id"+obj.rq] = 187;
				obj["res_struct_size"+obj.rq] = 0;
				obj.rq++;

				obj["res_json" + obj.rq] = "y";
				obj["res_config_action" + obj.rq] = 1;
				obj["res_config_id" + obj.rq] = 68;
				obj["res_struct_size" + obj.rq] = 0;
				obj.rq++;
				
				obj["res_json" + obj.rq] = "y";
				obj["res_config_action" + obj.rq] = 1;
				obj["res_config_id" + obj.rq] = 67;
				obj["res_struct_size" + obj.rq] = 0;
				obj.rq++;

				this.addToRequest(obj);
			break;
			case "delete":				
				obj = {
					v2: "y",
					rq: "y",
					res_config_id: 1,
					res_config_action: 2,
					res_json: "y",
					res_struct_size: 36,
					res_delex: "y",
					res_data_type: "json"
				};
				jsonOutObj = [];
				var general = ctrl.getChild("mainTab", "general");
				if(general.model.tnlname){
					jsonOutObj.push(general.model.tnlname);
				}
				else if(general.model.srvname){
					jsonOutObj.push(general.model.srvname);
				}
				obj.res_buf = $.toJSON(jsonOutObj);
				this.addToRequest(obj);
			break;
			case "deleterule":
				obj = {
					v2: "y",
					rq: "y",
					res_config_id: 1,
					res_config_action: 2,
					res_json: "y",
					res_struct_size: 36,
					res_delex: "y",
					res_data_type: "json"
				};
				obj.res_buf = $.toJSON(this.ctrl.data);
				this.addToRequest(obj);
			break;
		}
	}
	
	/* Name:			onupdaterq
	 * Description: 	обработчик события updaterq (обновление)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onupdaterq = function(){
		rootView.showModalOverlay();
		this.ctrl.activeRecordInx = -1;
		this.mode = "update";
		this.updateView();
	}
	
	/* Name:			onsaverq
	 * Description: 	обработчик события saverq (сохранение)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onsaverq = function(){
		rootView.showModalOverlay();
		this.ctrl.activeRecordInx = -1;
		this.mode = "save";
		this.updateView();
	}
	
	/* Name:			onaddrq
	 * Description: 	обработчик события addrq (добавление)
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.onaddrq = function(){
		rootView.showModalOverlay();
		this.ctrl.activeRecordInx = -1;
		this.mode = "add";
		this.updateView();
	}
	
	/* Name:			deleterq
	 * Description: 	обработчик запроса удаления соединения
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.ondeleterq = function(){
		rootView.showModalOverlay();
		this.ctrl.activeRecordInx = -1;
		this.mode = "delete";
		this.updateView();
	}
	
	this.ondeleterulerq = function(i){
		rootView.showModalOverlay();
		this.ctrl.activeRecordInx = -1;
		this.mode = "deleterule";
		this.updateView();
	}
 
	
	this.mode = "update";			//"save"/"delete"/"update"/"add"
	this.bind("updaterq", this.onupdaterq);
	this.bind("saverq", this.onsaverq);
	this.bind("addrq", this.onaddrq);
	this.bind("deleterq", this.ondeleterq);
	this.bind("deleterulerq", this.ondeleterulerq);
}
extend(jsWanSetServerView, jsSSideView);



function jsWanSetGwifServerView(ctrl, viewInx, options){
	jsWanSetGwifServerView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/* Name:			pickData
	 * Description: 	выбрать свои данные из responseData
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.pickData = function(){
		if(0 > 0){		
			setTimeout(context(this).callback(this.delaiedrq), 0);
		}
		else{
			this.ctrl.event("updaterq");
		}
	}
	
	this.delaiedrq = function(){
		this.ctrl.event("updaterq");
	}

	/* Name:			prepareData
	 * Description: 	подготовить данные для отправки на сервер
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.prepareData = function(){
		var obj;
		var delim = "|";
		var ctrl = this.ctrl;

		obj = {
			v2: "y",
			rq: "y",
			res_config_id: this.rpc,
			res_config_action: 3,
			res_json: "y",
			res_struct_size: 36,
			res_pos: 0,
			res_data_type: "json"
		};

		jsonOutObj = [];
		if(is.set(this.ifname)){
			jsonOutObj.push(this.ifname);
		}
		else{
			jsonOutObj.push("nogwiface");
		}
		obj.res_buf = $.toJSON(jsonOutObj);
		this.addToRequest(obj);
	}
	
	/* Name:			oncellselect
	 * Description: 	обработчик события cellselect
	 * 					запускает updateView
	 * Arguments:		нет
	 * Return value:	нет
	 * Notes:
	 */
	this.oncellselect = function(obj){
		if(obj.cell == 6){
			this.ifname = this.ctrl.model.recordSet[obj.row].ifaceL3;
			this.rpc = 62;
			this.updateView();
		}
	}

	this.ondisgw = function(){
		delete this.ifname;
		this.rpc = 62;
		this.updateView();
		return false;
	}
	
	/**Номер RPC. Различается для IPv4 и IPv6
	 * @type	int
	 */
	this.rpc = 62;
	
	this.bind("cellselect", this.oncellselect);
	this.bind("disgw", this.ondisgw);
}
extend(jsWanSetGwifServerView, jsSSideView);



function getConnType(ifnode, service, tunnel){
	var userType = null;
	
	if ( !service.type && ifnode.type == 'usb' ) {
		return 'ip';
	}

	switch(service.type.valueOf()){	
		case "ppp":
			switch(ifnode.type.valueOf()){
				case "atm":
					switch(ifnode.link_type){
						case "MDMVS_EOA":
							userType = "pppoe";
							break;
						case "MDMVS_PPPOA":
							userType = "pppoa";
							break;
						default:
							userType = "pppoe";
					}
					break;
				case "ethernet":
				case "ptm":
					userType = "pppoe";
					break;
				case "3g":
					userType = "3g";
					break;
				case "usb":
					userType = "3g";
					break;
			}
			break;
		case "pppv6":
			userType = "pppoev6";
			break;
		case "pppdual":
			userType = "pppoedual";
			break;
		case "ip":
		case "ipv6":
			switch(ifnode.type.valueOf()){
				case "atm":
					switch(ifnode.link_type){
						case "MDMVS_EOA":
							userType = getIPType(service, tunnel);
							break;
						case "MDMVS_IPOA":
							userType = "ipoa";
							break;
						default:
							userType = "static";
					}
				break;
				case "lte":
					userType = "lte";
				break;
				case "usb":
					userType = "lte";
					break;				
				default:
					userType = getIPType(service, tunnel);
			}
			break;
		case "bridge":
			userType = "bridge";
			break;
		case "auto":
			userType = tunnel?tunnel.type:service.type;
			break;
		default:
			userType = "bridge";
	}

	return userType;
}


function getIPType(service, tunnel){
	var userType = null;

	if (service.contype && ((service.contype == "dynamicv6") || (service.contype == "staticv6"))) {
		userType = service.contype;
		return userType;
	}

	if(service.dhcp){
		if(service.type == "ipv6"){
			userType = "dynamicv6";
		}
		else{
			userType = service.kabinet?"dynkab":"dynamic";
		}
		if(tunnel){
			switch(tunnel.type){
				case "pptp":
					userType = tunnel.useipv6?"dynpptpv6":"dynpptp";
				break;
				case "l2tp":
					userType = tunnel.useipv6?"dynl2tpv6":"dynl2tp";
				break;
			}
		}
	}
	else{
		if(service.type == "ipv6"){
			userType = "staticv6";
		}
		else{
			userType = service.kabinet?"statkab":"static";
		}
		if(tunnel){
			switch(tunnel.type){
				case "pptp":
					userType = tunnel.useipv6?"statpptpv6":"statpptp";
				break;
				case "l2tp":
					userType = tunnel.useipv6?"statl2tpv6":"statl2tp";
				break;
			}
		}
	}
	
	return userType;
}

var connTypeValSet = {
			pppoe:"PPPoE",
			pppoev6:"IPv6 PPPoE",
			pppoedual:"PPPoE Dual Stack",
			bridge:"Bridge",
			pppoa:"PPPoA",
			static:lng("static"),
			dynamic:lng("dynamic"),
			statkab:lng("statkab"),
			dynkab:lng("dynkab"),
			staticv6:lng("staticv6"),
			dynamicv6:lng("dynamicv6"),
			ipoa:"IPoA",
			"3g":"3G",
			"lte":"LTE",
			"3glte": "3G/LTE",
			pptp:"PPTP",
			l2tp:"L2TP",
			statpptp:lng("statpptp"),
			statpppoe:lng("statpppoe"),
			dynpptp:lng("dynpptp"),
			dynpppoe:lng("dynpppoe"),
			statl2tp:lng("statl2tp"),
			dynl2tp:lng("dynl2tp"),
			pptpv6:lng("pptpv6"),
			l2tpv6:lng("l2tpv6"),
			statpptpv6:lng("statpptpv6"),
			dynpptpv6:lng("dynpptpv6"),
			statl2tpv6:lng("statl2tpv6"),
			dynl2tpv6:lng("dynl2tpv6"),
			"624": lng("624")
};





















function jsWidgetModel(pattern){
	jsWidgetModel.superclass.constructor.call(this);
	
	if (isObjEmpty(pattern.list[pattern.list.length-1])) {
		pattern.list.pop();
	}
	if (no(pattern.extraBar)) {
		pattern.extraBar = null;
	}
	if (no(pattern.freakBar)) {
		pattern.freakBar = null;
	}
	if (no(pattern.freakBar2)) {
		pattern.freakBar2 = null;
	}
	this.pattern = pattern;
}
extend(jsWidgetModel, jsModel);



function jsWidgetController(pattern){
	jsWidgetController.superclass.constructor.call(this);
	
	this.changeModel(new jsWidgetModel(pattern));
	this.ifaceTypes.client = {type: jsWidgetClientView, def: true};
	
	if (this.model.pattern.extraBar) {
		this.addChild(new pattern.extraBar(), "extraBar");
	}
	if (this.model.pattern.freakBar) {
		this.addChild(new pattern.freakBar(), "freakBar");
	}
	if (this.model.pattern.freakBar2) {
		this.addChild(new pattern.freakBar2(), "freakBar2");
	}
}
extend(jsWidgetController, jsController);



function jsWidgetClientView(ctrl, viewInx, options){
	jsWidgetClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	this.click = function(a) {
		this.ctrl.event('selectpage', a.data, true);
		//return false;
	}

	this.nextList = function() {
		var currentList = $(this.viewBoxSel+' .lists>.list:visible');
		var nextList;
					
		if ($(currentList).next().length) {
			nextList = $(currentList).next();
		} else {
			nextList = $(this.viewBoxSel+' .lists>.list:first');
		}
					
		nextList.css({
			'left': $(currentList).width(),
			'top': 0,
			'display': 'block',
			'opacity': 0
		});
					
		$(this.viewBoxSel+' .menu>.panel').addClass('sliding');
				
		$(currentList).animate({
			left: 0 - $(currentList).width(),
			opacity: 0
		}, 500, function(){
			$(currentList).css('display', 'none');
		});
		$(nextList).animate({
			left: 0,
			opacity: 1
		}, 600, function(){
			$(this).parents('.panel').removeClass('sliding');
		});
		return false;
	}

	jsWidgetClientView.prototype.drawView = function(isHideDraw){
		var rowCount = 3;
		var htmlToDraw = '';
		var options = this.options;
		var uid = getUID();
		var pattern = this.ctrl.model.pattern;
		var child;
		var style = "style='display: none'";
		
		this.myBoxSel = '#widget' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		if (!no(isHideDraw)) {
			if (!isHideDraw) {
				style = '';
			}
		}
		
		htmlToDraw		=	"<div class='widget unselectable' id='widget" + uid +"' " + style + ">";
		htmlToDraw		+=	"<div class='grand'>";
		htmlToDraw		+=	"<div class='icon'><img src='" + pattern.icon +"' /></div>"
		htmlToDraw		+=	"<div class='content'>";
		htmlToDraw		+=	"<div class='caption'>";
		htmlToDraw		+=	"<div class='title' unselectable='on'>" + lng(pattern.name) +"</div>";
		if (pattern.freakBar) {
			htmlToDraw		+=	"<div class='freak'></div>";
		}
		if (pattern.freakBar2) {
			htmlToDraw		+=	"<div class='freak'></div>";
		}
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='menu'>";
		htmlToDraw		+=	"<div class='panel'><div class='lists'></div></div>";
		htmlToDraw		+=	"<div class='next'>";
		if (pattern.list.length > rowCount ) {
			htmlToDraw		+=	"<span unselectable='on'>»</span>";
		}
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='clear'></div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"</div>";
		htmlToDraw		+=	"<div class='clear'></div>"
		htmlToDraw		+=	"</div>";
		if (pattern.extraBar) {
			htmlToDraw		+=	"<div class='extra'></div>";
		}
		htmlToDraw		+=	"</div>";
		$(this.viewBoxSel).html(htmlToDraw);
		
		var lists = $(this.viewBoxSel+' .panel>.lists');
		for (var i = 0; i < Math.ceil(pattern.list.length/rowCount); i++) {
			var list = $("<div class='list' />");
			if ( i != 0) $(list).css('display', 'none');
			$(lists).append(list);
			for (var index = i*rowCount; index < i*rowCount+rowCount && index < pattern.list.length; index++) {
                            if (pattern.list[index].alias.substr(0,4) == 'http') {
                                var a = $("<a href='" + pattern.list[index].alias + "'>" + lng(pattern.list[index].item) + "</a>");
                                $(list).append(a);
                            }else{                                                                        
                                var a = $("<a href='#" + pattern.alias + '/' + pattern.list[index].alias + "'>" + lng(pattern.list[index].item) + "</a>");
                                $(list).append(a);
                                var item = pattern.list[index];
                                item['menu'] = pattern.name;
                                item['path'] = pattern.alias + '/' + item.alias;

								var tabs = item.tabs;
								if(tabs){
									for (var t=0; t<tabs.length; t++) {
										tabs[t].path = pattern.alias + '/' + item.alias + '/' + tabs[t].alias;
									}
								}

                                $(a).bind('click', item, context(this).callback(this.click));
                                if (pattern.list[index].hide) {
                                        $(a).remove();
                                        continue;
                                }
                            }

			}
			if ($(list).find('a').length == 0) $(list).remove();
		}
		$(this.myBoxSel+' .next').click(context(this).callback(this.nextList));
		
		if (pattern.freakBar) {
			child = this.getChild('freakBar');
			child.viewBoxSel = this.viewBoxSel+' .freak:eq(0)';
			child.options.viewBoxSel = child.viewBoxSel;
		}
		
		if (pattern.freakBar2) {
			child = this.getChild('freakBar2');
			child.viewBoxSel = this.viewBoxSel+' .freak:eq(1)';
			child.options.viewBoxSel = child.viewBoxSel;
		}

		if (pattern.extraBar) {
			$(this.myBoxSel).addClass('extraStyle')
			child = this.getChild('extraBar');
			child.viewBoxSel = this.myBoxSel+' .extra';
			child.options.viewBoxSel = child.viewBoxSel;
		} else {
			$(this.myBoxSel).addClass('standartStyle')
		}
		
		/*$(this.myBoxSel).not(':animated').mouseenter(function(){
			$(this).animate({'width': '+=10px', 'height': '+=10px'}, 250);
			$(this).parent().animate({'paddingLeft': '-=5px', 'paddingRight': '-=5px', 'paddingTop': '-=5px', 'paddingBottom': '-=5px'}, 250);
			$(this).find('.grand').animate({'marginTop': '+=5px', 'marginLeft': '+=5px'}, 250);
		});
		
		$(this.myBoxSel).not(':animated').mouseleave(function(){
			$(this).animate({'width': '-=10px', 'height': '-=10px'}, 250);
			$(this).parent().animate({'paddingLeft': '+=5px', 'paddingRight': '+=5px', 'paddingTop': '+=5px', 'paddingBottom': '+=5px'}, 250);
			$(this).find('.grand').animate({'marginTop': '-=5px', 'marginLeft': '-=5px'}, 250);
		});*/
		
		$(this.myBoxSel+' .title').attr('draggable', 'true').bind(
			'dragstart',
			context(this).callback(this.dragStart)
		).bind(
			'dragend',
			context(this).callback(function(){
				$(this.myBoxSel).fadeTo(600, 1);
			})
		);
		$(this.myBoxSel).bind(
			'dragenter',
			context(this).callback(this.dragEnter)
		).bind(
			'dragleave',
			context(this).callback(this.dragLeave)
		).bind(
			'dragover',
			context(this).callback(this.dragOver)
		).bind(
			'drop',
			context(this).callback(this.drop)
		);	
		
		jsWidgetClientView.superclass.drawView.call(this);
	}
	
	this.dragStart = function(event) {
		$(this.myBoxSel).fadeTo(600, 0.2);
		event.originalEvent.dataTransfer.setData('text/plain', this.myBoxSel);
		event.originalEvent.dataTransfer.effectAllowed = 'move';
		/*var dragIcon = document.createElement('img');
		dragIcon.src = 'http://wwwmaikaru.ru/picture/futbolka/3604/outline.jpg';
		event.originalEvent.dataTransfer.setDragImage(dragIcon, -10, -10);*/
		return true;
	}
	
	this.dragEnter = function(event) {
		return false;
	}
	
	this.dragLeave = function(event) {
		var widget = event.originalEvent.dataTransfer.getData('text/plain');
		if (this.myBoxSel != widget) {
			//$(this.myBoxSel).removeClass('drop');
		}
		return false;
	}
	
	this.dragOver = function(event) {
		var widget = event.originalEvent.dataTransfer.getData('text/plain');
		if (this.myBoxSel != widget) {
			//$(this.myBoxSel).addClass('drop');
		}
		return false;
	}
	
	this.drop = function(event) {
		var widget = event.originalEvent.dataTransfer.getData('text/plain');
		if (this.myBoxSel != widget) {
			this.getParent().ctrl.event('drag&drop', {src: widget, dst: this});
		}
		return false;
	}

}
extend(jsWidgetClientView, jsCSideView);





















function jsWidgetGridModel(definitions){
	jsWidgetGridModel.superclass.constructor.call(this);
	
	this.definitions = definitions;
}
extend(jsWidgetGridModel, jsModel);



function jsWidgetGridController(definitions){
	jsWidgetGridController.superclass.constructor.call(this);
	
	this.changeModel(new jsWidgetGridModel(definitions));
	this.ifaceTypes.client = {type: jsWidgetGridClientView, def: true};
	
	for (var i = 0; i < definitions.length; i++) {
		if (!isObjEmpty(definitions[i])) {
			if (!definitions[i].hide) {
				this.addChild(new jsWidgetController(definitions[i]), definitions[i].alias);
			} else{
				for (var l in definitions[i].list) {
					definitions[i].list[l]['menu'] = definitions[i].name;
					definitions[i].list[l]['path'] = definitions[i].alias + '/' + definitions[i].list[l].alias;
					var tabs = definitions[i].list[l].tabs;
					if(tabs){
						for (var t=0; t<tabs.length; t++) {
							tabs[t].path = definitions[i].alias + '/' + definitions[i].list[l].alias + '/' + tabs[t].alias;
						}
					}
				}
			}
		}
	}
	
}
extend(jsWidgetGridController, jsController);



function jsWidgetGridClientView(ctrl, viewInx, options){
	jsWidgetGridClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsWidgetGridClientView.prototype.drawView = function(){
		var rowCount = 3;
		var htmlToDraw = '';
		var grid;
		var options = this.options;
		var uid = getUID();
		var childCtrls = this.ctrl.children;
		var child;
		
		this.myBoxSel = '#widgetGrid' + uid;
		this.viewBoxSel = options.viewBoxSel;
		
		htmlToDraw		=	"<center><table class='widgetGrid unselectable' id='widgetGrid" + uid + "' unselectable='on'></table></center>";
		$(this.viewBoxSel).html(htmlToDraw);
		grid = $(this.viewBoxSel+'>center>table');
		
		for (var i = 0; i < Math.ceil(childCtrls.length/rowCount); i++) {
			var tr = $("<tr />");
			$(grid).append($(tr));
			for (var index = i*rowCount; index < i*rowCount+rowCount && index < childCtrls.length; index++) {
				var td = $("<td />");
				$(tr).append($(td));
				
				if (i == 0) {
					$(td).css('padding-top', '0');
				} else if (i == Math.ceil(childCtrls.length/rowCount)-1) {
					$(td).css('padding-bottom', '0');
				}
				if (index == i*rowCount) {
					$(td).css('padding-left', '0');
				} else if (index == i*rowCount+rowCount-1) {
					$(td).css('padding-right', '0');
				}
				
				child = this.getChild(index);
				child.viewBoxSel = this.myBoxSel + ' tr:eq(' + i + ')>td:eq(' + (index%rowCount) + ')';
				child.options.viewBoxSel = child.viewBoxSel;
			}
		}

		jsWidgetGridClientView.superclass.drawView.call(this);
		
		var speed = 700;
		if ($.browser.mozilla) speed = 0;
		$(grid).find('.widget').show(speed, function(){
			setScrollbarSize(); /* from workbench.ui.js */
		});
	}
	
	this.ondragdrop = function(info) {
		var dst = info.dst;
		var src;
		var child;
		
		for (var i = 0; i < this.ctrl.children.length; i++) {
			child = this.getChild(i);
			if (child.myBoxSel == info.src) {
				src = child;
				break;
			}
		}
		
		var srcL = $(src.myBoxSel).position().left;
		var srcT = $(src.myBoxSel).position().top;
		var dstL = $(dst.myBoxSel).position().left;
		var dstT = $(dst.myBoxSel).position().top;
		
		$(src.myBoxSel).css({
			'position': 'absolute',
			'left': srcL,
			'top': srcT
		});	
		$(dst.myBoxSel).css({
			'position': 'absolute',
			'left': dstL,
			'top': dstT
		});
		
		$(src.myBoxSel).fadeTo(0, 1);
		
		$(src.myBoxSel).animate({
			'left': dstL,
			'top': dstT
		}, 400);
		$(dst.myBoxSel).animate({
			'left': srcL,
			'top': srcT
		}, 400);
		
		var tempPattern = src.ctrl.model.pattern;
		src.ctrl.model.pattern = dst.ctrl.model.pattern;
		dst.ctrl.model.pattern = tempPattern;
		
		setTimeout(context(this).callback(function(){
			src.drawView(false);
			dst.drawView(false);
		}), 500);
	}
	
	this.bind("drag&drop", this.ondragdrop);	
}
extend(jsWidgetGridClientView, jsCSideView);























function jsWiFiModel() {
	jsWiFiModel.superclass.constructor.call(this);

	/**Объект содержащий данные о настройках WiFi.
	 * @type	Object
	 */
	this.WiFiData = null;

	/**Объект содержащий дополнительные данные о настройках WiFi.
	 * @type	Object
	 */
	this.WiFiAdditData = null;

	/**Хранит текущий выбранный MBSSID.
	 * @type	Object
	 */
	this.mbssidSelectedObj = 0;
}
extend(jsWiFiModel, jsModel);


function check_wifi_key(str, hexKeys) {
	var multiplier = 1;

	if (hexKeys)
		multiplier = 2;
	if (str.length != 5*multiplier && str.length != 13*multiplier)
		return false;
	return true;
}

function check_wifi_key_ex(str, hexKeys, bit) {
 var passlen = 5; 
 if ( bit == 64 ){
  passlen = 5;
 } else if ( bit == 128 ) {
  passlen = 13
 }
 var multiplier = 1;
 if (hexKeys)
  multiplier = 2;
 if (str.length == passlen*multiplier)
  return true;
 return false;
}

function check_wifi_key_hex(str) {
	var pat = /^[0-9a-fA-F]+$/;
	if (!pat.test(str))
		return false;
	return true;
}

function check_wifi_keypsk(str){
	if(str.length <8 || str.length > 63)
		return false;
	return true;
}























function pageWiFiAdvanced(GHz){
	pageWiFiAdvanced.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	this.wifi = null;
	this.GHz = is.set(GHz)?GHz:'';
	var short_gis = {"Enable":"enable", "Disable":"disable"};
	
	
	this.add(new nodenum("addonKeepAlive", 0, {
		mandatory: true
	}), "keep_alive");
	this.add(new nodenum("addonBeacon", 0, {
			mandatory: true
		}), "beacon")
		.add(new nodenum("addonRts", 0, {
			mandatory: true
		}), "rts")
		.add(new nodenum("addonFrag", 0, {
			mandatory: true
		}), "frag")
		.add(new nodenum("addonDtim", 0, {
			mandatory: true
		}), "dtim")
		.add(new nodenum("addonTxPwr", 0, {
			mandatory: true,
			minval: 0,
			maxval: 100
		}), "tx_pwr");
		
	this.add(new nodeCheckBox("addonIgmpDrop"), "igmpdrop");

	this.add(new nodeSelect("addonBand"), "band");
	this.add(new nodeSelect("addonShortGI"), "short_gi");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageWiFiAdvanced.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
	
			var short_gi = this.child("short_gi").cleanOptions();
			for (var gi in short_gis) {
				short_gi.addOption(gi, short_gis[gi]);
			}
			var settings = this.wifi[this.GHz + 'addon_settings'];
			if (settings) {
				this.child("keep_alive").val(settings.StationKeepAlive);
				this.child("beacon").val(settings.BeaconPeriod);
				this.child("rts").val(settings.RTSThreshold);
				this.child("frag").val(settings.FragThreshold);
				this.child("dtim").val(settings.DtimPeriod);
				this.child("tx_pwr").val(settings.TxPower);
				this.child("igmpdrop").val(settings.igmpdrop);
				
				var band = this.child("band").cleanOptions();
				var bandlist = this.wifi[this.GHz + 'BandwidthAvailable'];
				for (var i = 0; i < bandlist.length; i++) {
					band.addOption(bandlist[i].Name, bandlist[i].Id);
				}
				var bw = parseInt(settings.BandWidth) || 0; 
				band.val(bw);
				this.child("short_gi").val(settings.HTGI);
			}
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()) {
						this.save();
					}
				}));
		}
	}
	
	this.save = function() {
		rootView.showModalOverlay();
		var data = {
			'BeaconPeriod':	this.child("beacon").val().toString(),
			'RTSThreshold': this.child("rts").val().toString(),
			'FragThreshold': this.child("frag").val().toString(),
			'DtimPeriod': this.child("dtim").val().toString(),
			'TxPower': this.child("tx_pwr").val().toString(),
			'igmpdrop': this.child("igmpdrop").val(),
			'StationKeepAlive': this.child("keep_alive").val().toString(),
			'BandWidth': this.child("band").val().toString(),
			'HTGI': this.child("short_gi").val()
		};
		$.extend(this.wifi[this.GHz + 'addon_settings'], data);
		var data_GHz = {};
		data_GHz[this.GHz + 'addon_settings'] = data;
		device.config.write( 105, data_GHz, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 35, callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	});
}
extend(pageWiFiAdvanced, node);























function bestWirelessMode(ModeAvailable,flag_5G) {
	if(flag_5G){
		var bestlist = [ "AC/A/N", "AC/N", "AC", "A/N", "A", "N", "mixed" ];
		}
	else {
		var bestlist = [ "B/G/N", "G/N", "B/G", "mixed" ];
		}
	function find(value) {
		for (var i = ModeAvailable.length; i > 0; i--){
			var mode = ModeAvailable[i - 1];
			if (mode.Name.toUpperCase().search(value.toUpperCase()) >= 0) {
				return mode.Id;
			}
		}
		return null;
	}
	
	for (var i = 0; i < bestlist.length; i++) {
		var id = find(bestlist[i]);
		if (is.set(id)) {
			return id;
		}
	}
	return ModeAvailable[ModeAvailable.length-1].Id;	// Хоть что-нибудь
}



function wifiBasicForm(GHz){
	wifiBasicForm.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	this.wifi = null;
	this.countries = null;
	this.channels = null;
	this.GHz = is.set(GHz)?GHz:'';
	
	this.add(new nodeCheckBox("commonEnableWiFi"), "enable");	
	this.add(new nodeCheckBox("commonEnableWds",'', {comment: "broadcastComment"}), "wifi_broadcast");
	this.add(new node(), "advanced")
		.child("advanced")
		.add(new nodeSelect("MBSSID", '', {
			disabled: true
		}), "mbssid")
		.add(new nodeSelect("BSSID", '', {
			disabled: true
		}), "bssid");
	this.add(new nodeCheckBox("basicHideAP", '', {comment: "hiddenNetworkComment"}), "hideap")
		.add(new nodetext("SSID", '', {
			mandatory: true
		}), "ssid");

	this.add(new nodeSelect("basicCountry", '', {
		hidden: false,
		disabled: false
	}), "country");
	this.add(new nodeLevelGrid("basicChannel", this.GHz), "channel");
	this.add(new nodeSelect("basicMode", ''), "wl_mode")
		.add(new nodenum("basicClientMax", 0, {
			mandatory: true,
			comment: "basicClientMaxTitle"
		}), "max_clients");
	
	
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		wifiBasicForm.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			if (!this.GHz) {
				this.child("wl_mode").options.comment = 'basicModeComment';	     
			}
			if (this.wifi) {
				var wifi = this.wifi;
				var mbssidCurItem = wifi[this.GHz + 'mbssid'][wifi.mbssidCur - 1];
				var modes = this.wifi[this.GHz + 'ModeAvailable'];
				var country = this.child("country").cleanOptions();
				var channel = this.child("channel").cleanOptions();
				this.child("enable").val(wifi[this.GHz + 'Radio']).fieldchange();
				this.child("wifi_broadcast").val( wifi[this.GHz + "WifiBroadcast"] == 1);
				var mbssid = this.child("advanced/mbssid").cleanOptions();
				var bssid = this.child("advanced/bssid").cleanOptions();
				mbssid.addOption('wifiCommonOff', 1);

				var startMbssid = 2;
				
				for (var i = startMbssid; is.number(wifi[this.GHz + 'mbssidMax']) && i <= wifi[this.GHz + 'mbssidMax']; i++) {
					mbssid.addOption(i, i);
				}
				for (var i = 0; is.number(wifi[this.GHz + 'mbssidNum']) && i < wifi[this.GHz + 'mbssidNum']; i++) {
					if (wifi[this.GHz + 'mbssid'][i])
						bssid.addOption(wifi[this.GHz + 'mbssid'][i].BSSID, i+1);
				}
				mbssid.val(wifi[this.GHz + 'mbssidNum']).fieldchange();
				bssid.val(wifi[this.GHz + 'mbssidCur']);
				for (var i = 0; i < this.countries.length; i++) {
					country.addOption(this.countries[i].name, this.countries[i].code);
				}
				if ( this.GHz == "5G_" ) {
					this.get("channel").waiter(false);
					for (var i = 0; i < this.channels.length; i++) {
						channel.addOption(this.channels[i], this.channels[i]);
					}					
				}
				var wl_mode = this.child("wl_mode").cleanOptions();
				for (var i = 0; i < modes.length; i++) {
					wl_mode.addOption(modes[i].Name, modes[i].Id);
				}
				this.child("hideap").val(wifi[this.GHz + 'HideSSID']);
				this.child("ssid").val(mbssidCurItem?mbssidCurItem.SSID:'');
				this.child("country").val(wifi.CountryCode);
				this.child("channel").val(wifi[this.GHz + 'Channel']);
				this.child("wl_mode").val(wifi[this.GHz + 'WirelessMode']);
				this.child("max_clients").val(wifi[this.GHz + 'MaxStaNum']);
			}
			if ( this.GHz != "5G_" ) {
				var rID;
				this.get("channel").$box.find(".arrow").click( callback(this, function() {
					if (is.set(rID)) return;
					rID = device.config.read( 199, callback(this, function(data) {						
						this.get("channel").waiter(false);				
						this.get("channel").cleanOptions();												
						for ( var i in this.channels ) {
							var n = data.resident[this.channels[i]];
							if (is.set(n)) {
								if ( n <= 10 ) {
									n = 10;
								}
								this.get("channel").addOption(this.channels[i], n);								
							} else {
								this.get("channel").addOption(this.channels[i], 0);
							}
						}
					}));
				}));
			}
		}
	}
	
	this.save = function(cb) {
		var enable = this.child("enable").val();
		var data_c = {};
		data_c[this.GHz + 'Radio'] = enable;
		if (enable){
			data_c[this.GHz + 'mbssidNum'] = (enable)?parseInt(this.child("advanced/mbssid").val()):this.wifi[this.GHz + 'mbssidNum'];
			data_c[this.GHz + 'mbssidCur'] = (enable)?parseInt(this.child("advanced/bssid").val()):this.wifi[this.GHz + 'mbssidCur'];
		}
		var data_b = {
			'CountryCode': this.child("country").val()					
		};
		data_b[this.GHz + 'Channel'] = this.child("channel").val();
		data_b[this.GHz + 'mbssid'] = [{}];
		data_b[this.GHz + 'mbssid'][0]['SSID'] = makeValidJSONString(this.child("ssid").val());
		data_b[this.GHz + 'WirelessMode'] = this.child("wl_mode").val();
		data_b[this.GHz + 'MaxStaNum'] = this.child("max_clients").val().toString();
		data_b[this.GHz + 'HideSSID'] = this.child("hideap").val();
		
		var data_d = { };	
		data_b[this.GHz + "WifiBroadcast"] = this.child("wifi_broadcast").val()?true:false;		
		
		$.extend(this.wifi, data_c, data_b);
		device.config.write([
			[ 35, data_b],
			[ 39, data_c],
		], cb);
	}
	
	this.autosave = function(autoupdate){
		this.deep.updateModel();
		if (!this.status.error) {
			rootView.showModalOverlay();
			this.save(callback(this, function(autoupdate){
				rootView.hideModalOverlay();
				if (autoupdate) this.update();
			}, autoupdate));
		}
	}
	
	this.update = function(wifi, countries, channels){
		window.hasChanges = null;
		if (wifi && countries && channels) {
			this.wifi = wifi;
			this.countries = countries;
			this.channels = channels;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read([
				 35,
				 38,
				 37
			], callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
				this.countries = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.CountryList:[];
				this.channels = (is.RPC_SUCCESS(data.rq[2]))?data.rq[2].resident[this.GHz + 'ChannelList']:[];
				this.deep.updateView();
				if(this.GHz){
					rootCtrl.event("changewifi5G", this.wifi[this.GHz + 'Radio']);
				}
				else{
					rootCtrl.event("changewifi", this.wifi.Radio);
				}
				rootView.hideModalOverlay();
			}));
		}
	}
	
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				var mbssid = this.child("advanced/mbssid");
				var bssid = this.child("advanced/bssid");
				if (value) {
					mbssid.enable();
					bssid.enable();		
				} else {
					mbssid.disable();
					bssid.disable();
				}
			break;
			case "country":
			case "bssid":
				this.autosave(true);
			break;
		}
	});
}
extend(wifiBasicForm, node);



function pageWiFiBasic(GHz){
	pageWiFiBasic.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	var basic = this.add(new wifiBasicForm(GHz), "basic").child("basic");
	
	this.updateView = function(phase){
		pageWiFiBasic.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					basic.autosave(true);
				}));
		}
	}
	
	this.bind("updaterq", function(){
		this.deep.updateView();
		basic.update();
	});
}
extend(pageWiFiBasic, node);

function nodeLevelGrid(name, ghz) {

	var header = [];
	header.push({ index: "chanel", name: "basicChannel" });
	if ( ghz != "5G_" ) {
		header.push({ index: "level", name: "basicChannelWorkload" });		
	}
	var options = {
		type: "text",
		index: "chanel",
		header: header
	};
	nodeLevelGrid.superclass.constructor.call(this, name, "", options);	
	
	this.cleanOptions = function() {
		this.cleanRows();
		return this;
	}
	
	this.addOption = function(i, n) {		
		var row = {
			chanel: i
		}
		if (ghz != "5G_") {
			row['level'] = "<div>&nbsp;</div>";
		}
		this.addRow(row);
		this.changeOption(i, n);				
		return this;
	}
	
	function calculateColor(n) {
		var colorArray = [ "Lime", "LawnGreen", "yellow", "Gold", "Orange", "DarkOrange", "OrangeRed", "OrangeRed", "red", "red" ];		
		var __k__ = Math.floor(colorArray.length/100 * n );
		return colorArray[ parseInt( __k__ ) - 1 ];		
	}
			
	this.changeOption = function(i, n) {
		this.$box.find("table tbody tr td").each(function() {
			var lkey = $(this).parent().find('td:eq(0)').attr("langkey");
			if ( lkey == i ) {		
				$(this).parent().find('td:eq(1) div').css({
					'backgroundColor': calculateColor(n ),
					'width': n+'%'
				});				
			}
		});
		this.$box.find("table tr").show();
	}
	
	this.waiter = function(enable) {
		if ( enable ) {
			this.$box.find(".options").find(".wifiRadarWaiter").show();
		} else {
			this.$box.find(".options").find(".wifiRadarWaiter").hide();		
		}
	}

	this.updateView = function(phase) {
		nodeLevelGrid.superclass.updateView.apply(this, arguments);		
		if ( phase == "forward" ) {			
			this.$box.find("table").addClass('wifiRadar');
			this.$box.find(".field>input").prop('readonly', "readonly");
			this.$box.find(".field>input").css('cursor', "default");
			this.$box.find(".field>input").focus(function(event){
				$(this).blur();
			});
			if (header.length == 1) {
				this.$box.find("table thead").hide();
			}
		}
		if ( phase == "back" ) {
			this.$box.find(".options").append("<img class='wifiRadarWaiter' src='image/wait.gif'>");
		}
	}
	
}
extend(nodeLevelGrid, nodeComboGrid);























function wifiHotspotList(GHz){
	wifiHotspotList.superclass.constructor.apply(this, arguments);
	
	this.hlist = null;
	this.apcli = null;
	this.wifi = null;
	this.$grid = null;
	var $selrow = null;
	var siglist = [ 'g3_1.gif', 'g3_2.gif', 'g3_3.gif', 'g3_4.gif', 'g3_5.gif' ];
	var secure_list = [ "NONE", "WEP", "OPEN", "SHARED", "WPAPSK", "WPA2PSK", "WPA1PSKWPA2PSK", "WPAPSKWPA2PSK" ];
	
	this.GHz = is.set(GHz)?GHz:'';
	
	this.updateView = function(phase){
		wifiHotspotList.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			$selrow = null;
			this.cleanButtonBar().$box.empty();
			this.$grid = this.$box.html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid([
				{ index: "ssid", name: "SSID" },
				{ index: "bssid", name: "BSSID" },
				{ index: "wmode", name: "clientWMode" },
				{ index: "channel", name: "clientChannel" },
				{ index: "sec", name: "clientAuthMode" },
				{ index: "sig", name: "clientSignal" }
			], this.hlist?this.hlist.length:0, {
				clickable: true
			});
			this.$grid.bind("rowclick.grid", callback(this, function(event, $row){
				if ($selrow) $selrow.unselectRow();
				$selrow = $row.selectRow();
				this.emit('hotspotchange', this.hlist[$selrow.irow()], GHz?GHz:'');
			}));
			for(var i = 0; this.hlist && i < this.hlist.length; i++){
				var hotspot = this.hlist[i];
				var $row = this.$grid.row(i);
				var ssid = "<span>" + hotspot.ssid + " </span>";
				if (this.apcli.ApCliBssid != '' && this.apcli.ApCliBssid.toUpperCase() == hotspot.bssid.toUpperCase()) {
					ssid += "<img src='image/ledgreen.gif' />";
					$selrow = $row.selectRow();
				}
				$row.col("ssid").fieldval(ssid);
				$row.col("wmode").fieldval("802." + hotspot.wmode);
				$row.col("channel").fieldval(hotspot.channel);
				$row.col("bssid").fieldval(hotspot.bssid.toUpperCase());
				if (hotspot.sig) {
					var sigval = Math.ceil(parseInt(hotspot.sig)/20), imgs = '';
					for (var j = 0; j < sigval; j++) {
						imgs += "<img src='image/" + siglist[j] + "' style='margin:0' />";
					}
					$row.col("sig").fieldval(imgs + "<span> (" + hotspot.sig + "%)</span>");
				} else {
					$row.col("sig").fieldval("["+lng("clientDataUnknown")+"]");
				}
				hotspot.security = (hotspot.sec)?hotspot.sec.split("/"):["UNKNOWN"];
				if (hotspot.security[0] == "WPA1PSKWPA2PSK") {
					hotspot.security[0] = "WPAPSKWPA2PSK";
				}
				var secstr = "[" + hotspot.security[0] + "]";
				switch (hotspot.security[0]) {
					case "NONE":
					case "OPEN":
						secstr = "[" + lng("clientSecureOpen") + "]";
					break;
					case "WEP":
					case "SHARED":
						secstr = "[" + lng("clientSecureOpen") + "]" + " " + "[WEP]";
					break;
					case "WPAPSK":
						secstr = "[WPA-PSK]";
					break;
					case "WPA2PSK":
						secstr = "[WPA2-PSK]";
					break;
					case "WPAPSKWPA2PSK":
						secstr = "[WPA-PSK/WPA2-PSK mixed]";
					break;
				}
				if (hotspot.security[1]) {
					switch (hotspot.security[1]) {
						case "TKIPAES":
							secstr += " [TKIP+AES]";
						break;
						default:
							secstr += " [" + hotspot.security[1] + "]";
					}
				}
				$row.col("sec").fieldval(secstr);
			}
			this.addButton("clientScanBtn")
				.getButton("clientScanBtn")
				.bind("click.button", callback(this, function(){
					this.update();
				}));
		}
	}
	
	this.getActive = function(){
		if ($selrow) {
			return this.hlist[$selrow.irow()];
		}
		return null;
	}
	
	this.turn_on = function(){
		rootView.showModalOverlay();
		var create = {
			common: function(GHz){
				GHz = is.set(GHz) ? GHz : '';
				var obj = {};
				obj[GHz + 'mbssidNum'] = 1;
				obj[GHz + 'mbssidCur'] = 1;
				obj[GHz + 'Radio'] = true;
				return obj;
			}
		};
		var data = create.common(GHz)
		$.extend(this.wifi, data);
		device.config.write( 39, data, callback(this, function(){
			rootView.hideModalOverlay();
			this.update();
		}));
	}
	
	this.update = function(wifi, hlist){
		if (hlist) {
			this.wifi = wifi;
			this.hlist = hlist;
			this.apcli = (wifi&&wifi.apcli)?wifi.apcli:null;
			this.deep.updateView();
		} else {
			device.config.read([
				 35,
				(this.GHz=='5G_'? 185: 133)
			], callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
				this.hlist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:null;
				this.apcli = (this.wifi&&this.wifi.apcli)?this.wifi.apcli:{};
				this.deep.updateView();

				if (this.apcli && this.apcli.ApCliEnable && !is.RPC_SUCCESS(data.rq[1])) alert(lng("clientListNotAvail"));
				var lngradio = lng("clientConfTurnOn") + '?';
				if ((this.GHz != '5G_')) {
					if (this.wifi && !this.wifi.Radio) {
						if (confirm(lngradio)) {
							this.turn_on();
						}
					}
				} else {
				}
			}));
		}
	}
}
extend(wifiHotspotList, node);



function pageWiFiClient(){
	pageWiFiClient.superclass.constructor.apply(this, arguments);
	
	this.wifi = null;
	this.hotspot = null;
	
	var net_auths = { "Open": "OPEN", "Shared": "SHARED", "WPA-PSK": "WPAPSK", "WPA2-PSK": "WPA2PSK", "WPA-PSK/WPA2-PSK mixed": "WPAPSKWPA2PSK" };
	var scan = this.add(new nodeCheckBox("clientEnable", false), "enable")
		.add(new node({
			hidden: true
		}), "scan")
		.child("scan")
		.add(new nodeCheckBox("commonEnableWds"), "wifi_broadcast")
		.add(new nodeCaption("clientMasterSectScanData"))
		.add(new wifiHotspotList(), "hlist")
		.add(new nodeCaption("clientSectParams"))
		.add(new nodetext("SSID"), "ssid")
		.add(new nodemac("BSSID", '', {
			mandatory: false
		}), "bssid")
		.add(new nodeSelect("clientAuthMode"), "netauth")
		.add(new nodetext("clientKeyPSK", '', {
			mandatory: true,
			hidden: true,
			re: [
				callback(this, function(value){
					return check_wifi_keypsk(value)?null:"wifiPSKKeyWrong";
				})
			]
		}), "key_psk")
		.add(new wifiWEPForm(), "wep")
		.add(new wifiWPAForm({
			hidden: true
		}), "wpa");

	var hlist = scan.child("hlist");
	var wep = scan.child("wep");
	var wpa = scan.child("wpa");
	var keys = wep.child("keys");
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageWiFiClient.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			var netauth = scan.child("netauth").cleanOptions();
			for (var auth in net_auths) {
				netauth.addOption(auth, net_auths[auth]);
			}
			//----------------------------------------------------------
			wpa.child("wpa_ren").hide();
			//----------------------------------------------------------
			if (this.wifi) {
				var apcli = this.wifi.apcli;
				var wep_encr = wep.child("wep_encr");
				this.child("enable").val(apcli.ApCliEnable).fieldchange();
				this.child("scan").child("wifi_broadcast").val( this.wifi["WifiBroadcast"] );
				scan.child("ssid").val(apcli.ApCliSsid);
				scan.child("bssid").val(apcli.ApCliBssid);
				scan.child("netauth").val((apcli.ApCliAuthMode=="AUTO")?"OPEN":apcli.ApCliAuthMode).fieldchange();
				scan.child("key_psk").val(apcli.ApCliWPAPSK);
				if (apcli.ApCliEncrypType == "WEP" || apcli.ApCliAuthMode == "SHARED") {
					wep_encr.val(true).fieldchange();
				} else {
					wep_encr.val(false).fieldchange();
					if (apcli.ApCliEncrypType == "TKIP" || apcli.ApCliEncrypType == "AES")
						wpa.child("wpa_enc").val(apcli.ApCliEncrypType)
				}
				keys.child("key_id").val((apcli.ApCliDefaultKeyId=="")?"0":(parseInt(apcli.ApCliDefaultKeyId)-1).toString());
				keys.child("key_type").val((apcli.Key1Type!="")?apcli.ApCliKey1Type=="0":false);												
				keys.child("key1").val(apcli.ApCliKey1Str);
				keys.child("key2").val(apcli.ApCliKey2Str);
				keys.child("key3").val(apcli.ApCliKey3Str);
				keys.child("key4").val(apcli.ApCliKey4Str);
				
				var multipler = 1;
				if ( keys.child("key_type").val() ) {
					multipler = 2;
				}
				var keylen = keys.child('key1').val().length;								
				if ( keylen >= 6*multipler ) {
					keys.child('key_bit').val(128);
				} else {
					keys.child('key_bit').val(64);
				}
				
				
			}
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()){
						var channel = null;
						var nt = null;
						if (is.set(this.hotspot) && this.wifi.Channel != this.hotspot.channel) {
							if (!confirm(lng("confirm_change_channel"))) return ;
							channel = this.hotspot.channel;
							nt = this.hotspot.nt;
						}
						this.save(channel, nt);
					}
				}));
		}
	}
	
	this.save = function(channel, nt){
		rootView.showModalOverlay();
		var query = new Array();
		var key_type = (keys.child("key_type").val())?"0":"1";
		var wpa_encr = wpa.child("wpa_enc").val();
		var wep_encr = wep.child("wep_encr").val();
		var auth = scan.child("netauth").val();
		var data1 = {
			'apcli': {
				'ApCliEnable': this.child("enable").val(),
				'ApCliSsid': scan.child("ssid").val(),
				'ApCliBssid': scan.child("bssid").val(),
				'ApCliAuthMode': auth,
				'ApCliKey1Type': key_type,
				'ApCliKey2Type': key_type,
				'ApCliKey3Type': key_type,
				'ApCliKey4Type': key_type,
				'ApCliKey1Str':	keys.child("key1").val(),
				'ApCliKey2Str': keys.child("key2").val(),
				'ApCliKey3Str': keys.child("key3").val(),
				'ApCliKey4Str': keys.child("key4").val(),
				'ApCliDefaultKeyId': (parseInt(keys.child("key_id").val())+1).toString(),
				'ApCliWPAPSK': scan.child("key_psk").val(),
				'ApCliEncrypType': (auth!="OPEN"&&auth!="SHARED")?wpa_encr:(wep_encr)?"WEP":"NONE"
			}
		};
		$.extend(this.wifi, data1);
		query.push([(this.GHz=='5G_'? 186: 110), data1]);
		var data2 = { };
				if(!scan.child("wifi_broadcast").val()){
					 data2["WifiBroadcast"] = false;
				}
				else {
					 data2["WifiBroadcast"] = true;
				}
		if (channel) {
			data2[this.GHz + 'Channel'] = channel;
		}
		
		if ( Object.keys(data2).length > 0 ) {
			$.extend(this.wifi, data2);		
			query.push([ 35, data2]);
		}
		
		var data3 = {};
		if (nt) {
			var bandwidth;
			switch(nt) {
				case "NONE":
					bandwidth = "0";
				break;
				case "BELOW":
					bandwidth = "1";
				break;
				case "ABOVE":
					bandwidth = "2";
				break;
				default:
					bandwidth = "3";
				break;
			}
			
			var addon = {
				'BandWidth': bandwidth,
			};
			data3[this.GHz + 'addon_settings'] = addon;
		}
		
		if ( Object.keys(data3).length > 0 ) {
			$.extend(this.addon_settings, data3);		
			query.push([ 105, data3]);
		}
		
		
		device.config.write(query, callback(this, function(){
			this.emit("updaterq");
		}));
	}
	
	this.bind("updaterq", function(){		
		rootView.showModalOverlay();
		device.config.read([
			 35,
			 133
		], callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
			this.addon_settings = (this.wifi)?this.wifi.addon_settings:null;
			this.deep.updateView();
			hlist.update(
				this.wifi,
				(is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:null
			);
			this.hotspot = hlist.getActive();
			rootView.hideModalOverlay();
		}));
	});
	this.bind("hotspotchange", function(status, hotspot, GHz){
		window.hasChanges = "page";
		this.hotspot = hotspot;
		scan.child("ssid").val(hotspot.ssid);
		scan.child("bssid").val(hotspot.bssid.toUpperCase());
		scan.child("netauth").val((hotspot.security[0]=="NONE"||hotspot.security[0]=="WEP")?"OPEN":hotspot.security[0]).fieldchange();
		if (hotspot.security[1]) {
			wpa.child("wpa_enc").val(hotspot.security[1]);
		}
		this.GHz = GHz;
	});
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				if (value) scan.show(); else scan.hide();
			break;
			case "netauth":
				var wep_encr = wep.child("wep_encr");
				var key_psk = scan.child("key_psk");
				wep.hide();
				wpa.hide();
				key_psk.hide();
				keys.hide();
				switch (value) {
					case "OPEN":
						wep_encr.enable().val(false);
						wep.show();
					break;
					case "SHARED":
						wep_encr.disable().val(true);
						keys.show();
						wep.show();
					break;
					case "WPAPSK":
					case "WPA2PSK":
					case "WPAPSKWPA2PSK":
						key_psk.show();
						wpa.show();
					break;
				}
			break;
		}
	});

}
extend(pageWiFiClient, node);






















function pageWiFiMACFilterMode(){
	pageWiFiMACFilterMode.superclass.constructor.call(this);
	
	this.wifi = null;
	var modes = { "wifiMacModeDis": 0, "wifiMacModeAlw": 1, "wifiMacModeDen": 2 };

	this.add(new nodeSelect("wifiMacMode"), "mode");
	
	this.updateView = function(phase){
		pageWiFiMACFilterMode.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			var mode = this.child("mode").cleanOptions();
			for(var m in modes){
				if (m) mode.addOption(m, modes[m]);
			}
			var wifi = this.wifi;
			if (wifi) {
				this.child("mode").val(Number(wifi.mbssid[wifi.mbssidCur-1].AccessPolicy));
			}
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.save(parseInt(this.child("mode").val()));
				}));
		}
	}
	
	this.save = function(mode) {
		rootView.showModalOverlay();
		this.deep.updateModel(); //Вызываю только для того, чтобы перевести изменения в статус сохранённых
		var data = {
			'mbssid': [{
				'AccessPolicy': mode
			}]
		};
		$.extend(this.wifi, data);
		device.config.write( 40, data, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read( 35, callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	});
	
}
extend(pageWiFiMACFilterMode, node);



function pageWiFiMACFilter(){
	pageWiFiMACFilter.superclass.constructor.call(this);
	
	this.wifi = null;
	this.lanClients = null;
	this.maclist = [];
	this.$grid = null;

	this.add(new nodeCaption("wifiMacViewLabel","macfDescText"))
		.add(new nodeComboText("dhcpMacClients", null,
			{
				header: 
					[
						{ index: "ip", name: "IP" },
						{ index: "mac", name: "MAC" },
						{ index: "host", name: "Host" }
					],
				index: "mac",
				blank: "dhcpMacClientsSel2"
			}), "mac")
		.add(new node(), "grid");
	
	this.updateModel = function(status){
		status.error |= !this.$grid.cleanErrors().checkMandatory(true);
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageWiFiMACFilter.superclass.updateView.apply(this, arguments);
		if (phase == 'back') {
			this.$grid = this.child("grid").$box.empty().html("\
				<div class='grid rm'></div>\
				<div class='buttonsInline'>\
					<div class='button add'></div>\
				</div>\
			").find('.grid').lightUIGrid([
				{ index: "mac", name: "hwaddr" }
			], 0, {
				selectable: true
			});
			this.$grid.bind("selection.grid", callback(this, function(){
				this.updateRuleButtons();
			}));
			this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell){
				this.$grid.cleanErrors();
			}));
			this.$grid.colEditable("mac", "mac", {
				mandatory: true,
				unique: 'soft'
			});
			this.$grid.bind("cellChange.grid", callback(this, function(event, $cell){
				$cell.fieldval($cell.fieldval().toUpperCase());
			}));
			this.get("grid")
				.addButton("add")
				.getButton("add")
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					var $row = this.$grid.addRow().row("last");
					$row.col("mac").trigger("click");
				}));
			this.get("grid")
				.addButton("button_del")
				.getButton("button_del")
				.disable()
				.bind("click.button", callback(this, function(){
					this.$grid.find('thead tr td.selectable input').attr("checked", false);
					this.$grid.selection().hide();
					this.updateRuleButtons();
				}));	
			this.maclist = (this.wifi)?this.wifi.mbssid[this.wifi.mbssidCur-1].AccessControlList:[];
			for(var i = 0; i < this.maclist.length; i++){
				var $row = this.$grid.addRow().row("last");
				$row.col("mac").fieldval(this.maclist[i]);
			}
			this.$grid.resetAll();
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.deep.updateModel();
					if (!this.status.error) {
						this.save(gridActionConverter(this.$grid));
						this.$grid.selection().removeRow();
					}
				}));
			this.updateRuleButtons = function(){
				if(this.$grid.selection().not(":hidden").length) {
					this.get("grid").getButton("button_del").enable();
				}
				else{
					this.get("grid").getButton("button_del").disable();			
				}
			};
			var mac = this.child('mac').cleanRows();
			for(var i = 0; i < this.lanClients.length; i++){
				var obj = this.lanClients[i];
				if (obj.name == 'WLAN') {
					mac.addRow(obj.ip, obj.mac.toUpperCase(), obj.hostname);
				}
			}
		}
	}
	
	this.save = function(actions){
		if (actions.count) {
			rootView.showModalOverlay();
			var query = new Array();
			var rmlist = new Array();
			var addlist = new Array();
			var temp = actions.deleted.concat(actions.changed);
			for (var i = 0; i < temp.length; i++) {
				rmlist.push(this.maclist[temp[i]]);
			}
			if (rmlist.length) {
				query.push([ 44, rmlist]);
			}
			temp = actions.changed.concat(actions.added);
			for (var i = 0; i < temp.length; i++) {
				var $row = this.$grid.row(temp[i]);
				addlist.push($row.col("mac").fieldval());
			}
			if (addlist.length) {
				query.push([ 41, addlist]);
			}
			device.config.write(query, callback(this, function(data){
				//rootView.hideModalOverlay();
				this.update();
			}));
		}
	}
	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read([
			 35,
			 187
		], callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
			this.lanClients = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:[];
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
	this.bind("ruleselect", function(status, value){
		switch(status.target.getAlias()){
			case "mac":
				var rule = value;
				if ( this.$grid.find("td:contains('"+rule.col("mac").fieldval()+"')").length == 0 ) {
					var $row = this.$grid.addRow().row("last");
					$row.col("mac").fieldval(rule.col("mac").fieldval());
				} else {
					alert(lng('dup'));
				}
			break;
		}
	});
	
}
extend(pageWiFiMACFilter, node);
























function _doSaveReboot(){
	if (confirm(lng("wzwifiSaveOk") + '\n' + lng("wzwifiNeedReboot") + '\n'+ lng("wzwifiRebooting") + '\n' + lng("wzwifiReboot"))) {
		device.system.reboot(true);
		rootView.showWaitScreen(lng("rebooting"),  90000, function(){
			rootView.hideWaitScreen();
		});
	}
}

function wizardWiFiRouter(){
	wizardWiFiRouter.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.ifacelist = null;
	this.step = null;

	var auth_to_encrypt = {
		'WPAPSK': 'AES',
		'WPA2PSK': 'AES',
		'WPAPSKWPA2PSK': 'AES'
	};

	this.add(new node(), 'basic')
		.child("basic")
		.add(new nodeCaption("wzwifiDescSSID"))
		.add(new nodetext("SSID", '', {
			mandatory: true
		}), "ssid");

	this.add(new node(), 'security')
		.child("security")
		.add(new nodeCaption("wzwifiDescSecurity"))
		.add(new nodeSelect("securityAuthMode"), "authmode")
		.add(new nodetext("clientMasterSecurityKey", '', {
			disabled: true,
			mandatory: true,
			re: [
				function(value){
					return check_wifi_keypsk(value)?null:"wifiPSKKeyWrong";
				}
			]
		}), "key");
	this.add(new node(), 'finish')
		.child("finish")
		.add(new nodeCaption("clientMasterSectSummary"))
		.add(new nodestatic("wzwifiMode"), "mode")
		.add(new nodestatic("SSID"), "ssid")
		.add(new nodestatic("securityAuthMode"), "authmode")
		.add(new nodestatic("clientMasterSecurityKey"), "key")

	this.updateModel = function(status){
		this.status = status;
	}

	this.checkNext = function(){
		return !this.pluginWizard.isStepLast(this.getActiveIndex());
	}

	this.checkPrevious = function(){
		return !this.pluginWizard.isStepFirst(this.getActiveIndex());
	}

	this.checkSave = function(){
		return this.pluginWizard.isStepLast(this.getActiveIndex());
	}

	this.next = function(){
		if (this.checkNext() && this.step.deep.updateModel() && this.do_before()) {
			this.switchStep("next");
			this.do_after();
		}
	}

	this.previous = function(){
		if (this.checkPrevious()) {
			this.switchStep("prev");
			this.do_after();
		}
	}

	this.do_before = function(){
		return true;
	}

	this.do_after = function(){
		this.step = this.getActiveStep();
		if (this.step.getAlias() == 'finish') {
			var stat = this.child("finish");
			stat.child("mode").val(lng("wzwifiRouter"));

			stat.child("ssid").val(this.child("basic/ssid").val());
			stat.child("authmode").val((this.child("security/authmode").val()=='OPEN')?lng("wzwifiOpen"):lng("wzwifiClose"));
			stat.child("key").val((this.child("security/authmode").val()=='OPEN')?lng("wzwifiNo"):this.child("security/key").val());

		}
	}

	this.save = function(){
		rootView.showModalOverlay();
		var ssid = makeValidJSONString(this.child("basic/ssid").val());
		var key = (this.child("security/authmode").val()!='OPEN')?this.child("security/key").val():null;
		var query = new Array();
		var wifi = this.wifi;
		var auth = bestAuthMode(wifi.AuthAvailable);
		
		var create = {
			basic: function(GHz){
				GHz = is.set(GHz) ? GHz : '';
				var obj = {
					'CountryCode': wifi.CountryCode
				};
				obj[GHz + 'mbssid'] = [{
					'SSID': (GHz.length ? ssid_5g : ssid)
				}];
				obj[GHz + 'Channel'] = 'auto';
				obj[GHz + 'WirelessMode'] = bestWirelessMode(wifi[GHz + 'ModeAvailable'],(GHz!="5G_")?false:true);
				obj[GHz + 'MaxStaNum'] = "0";
				obj[GHz + 'HideSSID'] = false;
				return obj;
			},
			security: function(GHz){
				GHz = is.set(GHz) ? GHz : '';
				var mbssid = wifi[GHz + 'mbssid'][wifi[GHz + 'mbssidCur']-1];
				var k = (GHz.length ? key_5g : key);
				var obj = {};
				obj[GHz + 'mbssid'] = [{
					'AuthMode': (k)?auth:'OPEN',
					'WPAPSK': (k)?k:mbssid.WPAPSK,
					'Key1Str': mbssid.Key1Str,
					'Key1Type': mbssid.Key1Type,
					'Key2Str': mbssid.Key2Str,
					'Key2Type': mbssid.Key1Type,
					'Key3Str': mbssid.Key3Str,
					'Key3Type': mbssid.Key1Type,
					'Key4Str': mbssid.Key4Str,
					'Key4Type': mbssid.Key1Type,
					'DefaultKeyID': mbssid.DefaultKeyID,
					'PreAuth': false,
					'EncrypType': (k)?auth_to_encrypt[auth]:'NONE'
				}];
				obj[GHz + 'RADIUS_Server'] = wifi[GHz + 'RADIUS_Server'];
				obj[GHz + 'RADIUS_Port'] = wifi[GHz + 'RADIUS_Port'];
				obj[GHz + 'RADIUS_Key'] = wifi[GHz + 'RADIUS_Key'];
				obj[GHz + 'RekeyInterval'] = 3600;
				return obj;
			},
			common: function(GHz){
				GHz = is.set(GHz) ? GHz : '';
				var obj = {};

				obj[GHz + 'mbssidNum'] = 1;
				obj[GHz + 'mbssidCur'] = 1;
				obj[GHz + 'Radio'] = true;
				return obj;
			}
		};
		// basic
		var data_basic = create.basic();
		// security
		var data_security = create.security();
		// DHCP
		var dhcpd = this.ifacelist.br0.services.br0.dhcpd;
		if (window.menu_postfix != "_ap" && !dhcpd.enable) {
			dhcpd.enable = true;
			query.push([ 1, {
				'br0': this.ifacelist.br0
			}]);
		}
		if (wifi.apcli && wifi.apcli.ApCliEnable == true
		) {
			wifi.apcli.ApCliEnable = false;
			query.push([ 110, {
				'apcli': wifi.apcli
			}]);
		}
		query.push([ 36, data_security]);
		query.push([ 35, data_basic]);
		$.extend(this.wifi, data_basic, data_security);
		// common
		if (wifi.Radio == false) {
			var data_common = create.common();
			query.push([ 39, data_common]);
			$.extend(this.wifi, data_common);
		}
		device.config.write(query, callback(this, function(answer){
			//Долбаный костыль из за сомещения несовместимого
			if(window.wifiWizard && wifiWizard.quickMasterCtrl){
				wifiWizard.quickMasterCtrl.event("wifiready");
			}
			else{
				this.emit("wzsaved.wifi", answer.rq[0] && answer.rq[0].status ==  12);
			}
			rootView.hideModalOverlay();
		}));
	}

	this.updateView = function(phase){
		wizardWiFiRouter.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.child("security/authmode")
				.cleanOptions()
				.addOption('wzwifiClose', 'CLOSE')
				.addOption('wzwifiOpen', 'OPEN')
				.fieldchange();
			if (this.wifi) {
				this.get("basic/ssid").val(this.wifi.mbssid[0].SSID);
			}

			this.do_after();
		}
	}

	this.update = function(wifi, ifacelist){
		if (wifi && ifacelist) {
			this.wifi = wifi;
			this.ifacelist = ifacelist;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read([
				 35,
				 1
			], callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
				this.ifacelist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.iface_names:{};
				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
	}

	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "authmode":
				var key = this.child("security/key");
				if (value != 'OPEN') key.enable(); else key.disable();
			break;
		}
	});
}
extend(wizardWiFiRouter, nodeWizard);


function wizardWiFiClient(){
	wizardWiFiClient.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.step = null;
	this.hotspot = null;
	this.ifacelist = null;
	
	var auth_to_encrypt = {
			'WPAPSK': 'AES',
			'WPA2PSK': 'AES',
			'WPAPSKWPA2PSK': 'AES'
		};

	this.add(new node(), 'scanner')
		.child("scanner")
		.add(new nodeCaption("clientMasterSectScanData"))
		.add(new wifiHotspotList(), "hlist");
	this.add(new node(), 'security')
		.child("security")
		.add(new nodeCaption("clientMasterSectAccessKey"))
		.add(new nodetext("clientMasterSecurityKey", '', {
			mandatory: true,
			disabled: true,
			re: [
				callback(this, function(value){
					if (this.hotspot.security[0] == 'WEP' || this.hotspot.security[0] == 'SHARED') {
						return check_wifi_key(value)?null:"wifiWEPKeyWrong";
					}
					return check_wifi_keypsk(value)?null:"wifiPSKKeyWrong";
				})
			]
		}), "key_for_access");
	this.add(new node(), 'broadcast')
		.child("broadcast")
		.add(new nodeCaption("clientMasterBroadcast"))
		.add(new nodeCheckBox("wifiBroadcastEnable", true), "enable")
		.add(new nodetext("SSID", '', {
			mandatory: true
		}), "ssid")
		.add(new node(), 'security')
		.add(new nodeCaption("wzwifiDescSecurity"), "broadcastDescSecurity")
		.add(new nodeSelect("securityAuthMode"), "broadcastauthmode")
		.add(new nodetext("clientMasterSecurityKey", '', {
			disabled: true,
			mandatory: true,
			re: [
				function(value){
					return check_wifi_keypsk(value)?null:"wifiPSKKeyWrong";
				}
			]
		}), "broadcastkey");
     /* Надписи на шаге финиш  */
	this.add(new node(), 'finish')
		.child("finish")
		.add(new nodeCaption("clientMasterSectSummary"))
		.add(new nodestatic("wzwifiMode"), "mode")
		.add(new nodeCaption("cliSettings"), "cliSettings")
		.add(new nodestatic("wzwifiHotspot"), "hotspot")
		.add(new nodestatic("basicChannel"), "channel")
		.add(new nodestatic("securityAuthMode"), "authmode")
		.add(new nodestatic("clientMasterSecurityKey"), "key")
		.add(new nodestatic("securityWPAEnc"), "encrypt")
		.add(new nodeCaption("broadcastSettings"), "broadcastSettings")
		.add(new nodestatic("clientMasterBroadcast"), "broadcast")
		.add(new nodestatic("SSID"), "ssid")
		.add(new nodestatic("securityAuthMode"), "broadcastauthmode")
		.add(new nodestatic("clientMasterSecurityKey"), "broadcastkey")
;

	if(!window.menu_postfix || window.menu_postfix && window.menu_postfix != "_ap")
		this.add(new nodeCaption("wzwifiAtt", "wzwifiAttWAN"));

	this.updateModel = function(status){
		this.status = status;
	}

	this.checkNext = function(){
		return (this.getActiveIndex() < this.children.length - 1);
	}

	this.checkPrevious = function(){
		return (this.getActiveIndex() > 0);
	}

	this.checkSave = function(){
		return (this.getActiveIndex() == this.children.length - 1);
	}

	this.next = function(){
		if (this.checkNext() && this.step.deep.updateModel() && this.do_before()) {
			this.switchStep(this.getActiveIndex() + 1);
			this.do_after();
		}
	}

	this.previous = function(){
		if (this.checkPrevious()) {
			this.switchStep(this.getActiveIndex() - 1);
			this.do_after();
		}
	}

	this.do_before = function(){
		var alias = this.step.getAlias();
		if (alias == 'scanner') {
			var hlist = this.step.child("hlist");
			var key_for_access = this.child("security/key_for_access");

			var hotspot = this.hotspot = hlist.getActive();
			var key_for_access = this.child("security/key_for_access");

			if (!hotspot) {
				alert(lng("clientMasterClientNotSelected"));
				return false;
			} else {
				if (hotspot.security[0] == "NONE" || hotspot.security[0] == "OPEN") {
					key_for_access.disable().val('');
				} else {
					key_for_access.enable();
				}
			}
		}
		return true;
	}

	/* шаги мастера */
	this.do_after = function(){
		this.step = this.getActiveStep();
		var alias = this.step.getAlias();
		/* шаг общая информация */
		if (alias == 'finish') {
			var is_open = this.hotspot.security[0] == 'NONE';
			var stat = this.child("finish");
			stat.child("mode").val(lng("wzwifiClient"));
			stat.child("hotspot").val(this.hotspot.ssid + ' [' + this.hotspot.bssid + ']');
			stat.child("broadcast").val(this.child("broadcast/enable").val()?lng('yes'):lng('no'));
			stat.child("ssid").val(this.child("broadcast/ssid").val());
			stat.child("broadcastauthmode").val((this.child("broadcast/broadcastauthmode").val()=='OPEN')?lng("wzwifiOpen"):lng("wzwifiClose"));
			stat.child("broadcastkey").val((this.child("broadcast/broadcastauthmode").val()=='OPEN')?lng("wzwifiNo"):this.child("broadcast/broadcastkey").val());
			stat.child("authmode").val((is_open)?lng("wzwifiOpen"):lng("wzwifiClose"));
			stat.child("key").val((is_open)?lng("wzwifiNo"):this.child("security/key_for_access").val());
			stat.child("channel").val(this.hotspot.channel);
			stat.child("encrypt").val((this.hotspot.security[1])?lng("wzwifiYes"):lng("wzwifiNo"));
		}
		/* Шаг поиск сетей*/
		if (alias == 'scanner') {
			var hlistcap = this.step.child("hlist_cap");
			var hlist = this.step.child("hlist");
		}

		/* пропуск шага ввода пароля от сети */
		if (alias == 'security') {
			if (this.hotspot.security[0] == "NONE" || this.hotspot.security[0] == "OPEN") {
				if (this.pa == 'broadcast' || this.pa == 'finish') {
					this.previous();
					this.pa = 'scanner';
					return;
				}
				if (this.pa == 'scanner') {
					this.switchStep(2);
					this.do_after();
					this.pa = 'finish';
					return;
				}
			}
		}
		this.pa = alias;

	}

	this.save = function(){
		rootView.showModalOverlay();
		var query = new Array();
		var wifi = this.wifi;
		var hotspot = this.hotspot;
		var addon_settings = this.addon_settings;
		var nt = this.hotspot.nt;
		var auth = hotspot.security[0];
		var accesskey = this.child("security/key_for_access").val();
		var ssid = makeValidJSONString(this.child("broadcast/ssid").val());
 		var key = (this.child("broadcast/broadcastauthmode").val()!='OPEN')?this.child("broadcast/broadcastkey").val():null;
 		var br_auth = bestAuthMode(wifi.AuthAvailable);
 		
 		var create = {
 			basic: function(GHz){
 				GHz = is.set(GHz) ? GHz : '';
 				var obj = {
 					'CountryCode': wifi.CountryCode
 				};
 				obj[GHz + 'mbssid'] = [{
 					'SSID': ssid
 				}];
 				obj[GHz + 'Channel'] = 'auto';
 				obj[GHz + 'WirelessMode'] = bestWirelessMode(wifi[GHz + 'ModeAvailable'],(GHz!="5G_")?false:true);
 				obj[GHz + 'MaxStaNum'] = "0";
 				obj[GHz + 'HideSSID'] = false;
 				if (GHz.length) {
 					obj[GHz + 'mbssid'][0]['SSID'] += '_5GHz';
 				}
 				return obj;
 			},
 			security: function(GHz){
 				GHz = is.set(GHz) ? GHz : '';
 				var mbssid = wifi[GHz + 'mbssid'][wifi[GHz + 'mbssidCur']-1];
 				var obj = {};
 				obj[GHz + 'mbssid'] = [{
 					'AuthMode': (key)?br_auth:'OPEN',
 					'WPAPSK': (key)?key:mbssid.WPAPSK,
 					'Key1Str': mbssid.Key1Str,
 					'Key1Type': mbssid.Key1Type,
 					'Key2Str': mbssid.Key2Str,
 					'Key2Type': mbssid.Key1Type,
 					'Key3Str': mbssid.Key3Str,
 					'Key3Type': mbssid.Key1Type,
 					'Key4Str': mbssid.Key4Str,
 					'Key4Type': mbssid.Key1Type,
 					'DefaultKeyID': mbssid.DefaultKeyID,
 					'PreAuth': false,
 					'EncrypType': (key)?auth_to_encrypt[br_auth]:'NONE'
 				}];
 				obj[GHz + 'RADIUS_Server'] = wifi[GHz + 'RADIUS_Server'];
 				obj[GHz + 'RADIUS_Port'] = wifi[GHz + 'RADIUS_Port'];
 				obj[GHz + 'RADIUS_Key'] = wifi[GHz + 'RADIUS_Key'];
 				obj[GHz + 'RekeyInterval'] = 3600;
 				return obj;
 			},
 			common: function(GHz){
 				GHz = is.set(GHz) ? GHz : '';
 				var obj = {};
 				obj[GHz + 'mbssidNum'] = 1;
 				obj[GHz + 'mbssidCur'] = 1;
 				obj[GHz + 'Radio'] = true;
 				return obj;
 			}
		};
 		// basic
 		var data_basic = create.basic();
 		// security
 		var data_security = create.security();
 		// DHCP
 		var dhcpd = this.ifacelist.br0.services.br0.dhcpd;
 		if (window.menu_postfix != "_ap" && !dhcpd.enable) {
 			dhcpd.enable = true;
 			query.push([1, {
 				'br0': this.ifacelist.br0
 			}]);
 		}
		var data_apcli = {
			'apcli': {
				'ApCliEnable': true,
				'ApCliSsid': hotspot.ssid,
				'ApCliBssid': hotspot.bssid,
				'ApCliDefaultKeyId':  "1",
				'ApCliWPAPSK': '',
				'ApCliKey1Str': '',
				'ApCliKey2Str': '',
				'ApCliKey3Str': '',
				'ApCliKey4Str': ''
			}
		};

 		query.push([36, data_security]);
 		query.push([35, data_basic]);
 		$.extend(this.wifi, data_basic, data_security);
 		// common
 		if (wifi.Radio == false) {
 			var data_common = create.common();
 			query.push([39, data_common]);
			$.extend(this.wifi, data_common);
 		}
		data_apcli.apcli.ApCliAuthMode = (hotspot.security[0]=="NONE")?"OPEN":(hotspot.security[0]=="WEP")?"AUTO":hotspot.security[0],
		data_apcli.apcli.ApCliEncrypType = (hotspot.security[1])?hotspot.security[1]:(hotspot.security[0]=="WEP")?"WEP":"NONE";
		switch (hotspot.security[0]) {
			case "WEP":
				data_apcli.apcli.ApCliKey1Str = data_apcli.apcli.ApCliKey2Str = data_apcli.apcli.ApCliKey3Str = data_apcli.apcli.ApCliKey4Str = accesskey;
			break;
			case "NONE":
			break;
			default:
				data_apcli.apcli.ApCliWPAPSK = accesskey;
			break;
		}


		var dhcpd = this.ifacelist.br0.services.br0.dhcpd;

		if (window.menu_postfix == "_ap" ) {
			if ( dhcpd.enable ) {
				dhcpd.enable = false;
				query.push([ 1, {
					'br0': this.ifacelist.br0
				}]);
			}
		} else {
			if ( !dhcpd.enable ) {
				dhcpd.enable = true;
				query.push([ 1, {
					'br0': this.ifacelist.br0
				}]);
			}
		}
		query.push([((this.GHz_cli == "5G")? 186: 110), data_apcli]);
		//~ query.push([ 110, data_apcli]);
		$.extend(this.wifi, data_apcli);
		//if (wifi.Channel != hotspot.channel) {
			var data_basic = {};
				//data_basic[(this.GHz_cli == "5G"?"5G_":"") + "WifiBroadcast"] = this.child("broadcast/enable").val();
				/*если в клиенте отключаем вещание своей сети, то снимаем и галку в настройках */
				if(!this.child("broadcast/enable").val()){
					 data_basic["WifiBroadcast"] = false;
				}
				else {
					 data_basic["WifiBroadcast"] = true;
				}
			var cur_Ghz = (this.GHz_cli == "5G")?"5G_Channel":"Channel";
			data_basic[cur_Ghz] = hotspot.channel;
			$.extend(this.wifi, data_basic);
			query.push([ 35, data_basic]);
		//}
		
		var data3 = {};
		if (nt) {
			var bandwidth;
			switch(nt) {
				case "NONE":
					bandwidth = "0";
				break;
				case "BELOW":
					bandwidth = "1";
				break;
				case "ABOVE":
					bandwidth = "2";
				break;
				default:
					bandwidth = "3";
				break;
			}
			
			var addon = {
				'BandWidth': bandwidth,
			};
			
			data3[(this.GHz_cli == "5G"?"5G_":"") + 'addon_settings'] = addon;
		}
		
		$.extend(this.addon_settings, data3);		
		query.push([ 105, data3]);
		
		device.config.write(query, callback(this, function(){
			this.emit("wzsaved.wifi");
			rootView.hideModalOverlay();
		}));
	}

	this.updateView = function(phase){
		wizardWiFiClient.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.child("broadcast/broadcastauthmode")
				.cleanOptions()
				.addOption('wzwifiClose', 'CLOSE')
				.addOption('wzwifiOpen', 'OPEN')
				.fieldchange();
			if (this.wifi) {
				this.get("broadcast/ssid").val(this.wifi.mbssid[0].SSID);
			}
			this.do_after();
		}
	}
	this.bind("fieldchange", function(status, value){
		var ssid = this.child("broadcast/ssid");
		var auth = this.child("broadcast/broadcastauthmode");
		var key = this.child("broadcast/broadcastkey");
		var capt = this.child("broadcast/broadcastDescSecurity");
		var ssid_finish = this.child("finish/ssid");
		var mode_finish = this.child("finish/broadcastauthmode");
		var key_finish = this.child("finish/broadcastkey");
		var flag_enable = true;
		switch(status.target.getAlias()){
			/* скрываем или показываем поля если вкл/выкл вещание сети*/
			case "enable":
			if(!this.child("broadcast/enable").val()){
			flag_enable = false;
			//break;
			}
			if(!flag_enable){
				ssid.hide();
				auth.hide();
				key.hide();
				capt.hide();
				ssid_finish.hide();
				mode_finish.hide();
				key_finish.hide();
			}
			else {
				ssid.show();
				auth.show();
				key.show();
				if (this.child("broadcast/broadcastauthmode").value == 'OPEN') { 
					key.disable();
					key.value = "";
				}
				capt.show();
				ssid_finish.show();
				mode_finish.show();
				key_finish.show();
			}
			break;
			
			case "broadcastauthmode":
				var key = this.child("broadcast/broadcastkey");
				if (value != 'OPEN') {
					key.enable();
				}
				else {
					this.child("broadcast/broadcastkey").val("");
					key.disable();
				}
			break;
		}	
	});

	this.update = function(wifi, ifacelist){
			var hlist = this.step.child("hlist");
			hlist.update();
		if (wifi && ifacelist) {
			this.ifacelist = ifacelist;
			this.wifi = wifi;
			this.addon_settings = wifi.addon_settings;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read([
				 1,
				 35
			], callback(this, function(data){
				this.ifacelist = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident.iface_names:null;
				this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[1].resident:null;
				this.addon_settings = (this.wifi)?this.wifi.addon_settings:null;
				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
	}
}
extend(wizardWiFiClient, nodeWizard);




function wizardWiFiDisabler(){
	wizardWiFiDisabler.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.step = null;

	this.add(new node(), 'finish')
		.child("finish")
		.add(new nodeCaption("clientMasterSectSummary"))
		.add(new nodestatic("wzwifiMode"), "mode");

	this.updateModel = function(status){
		this.status = status;
	}

	this.checkNext = function(){
		return (this.getActiveIndex() < this.children.length - 1);
	}

	this.checkPrevious = function(){
		return (this.getActiveIndex() > 0);
	}

	this.checkSave = function(){
		return (this.getActiveIndex() == this.children.length - 1);
	}

	this.next = function(){
		if (this.checkNext() && this.step.deep.updateModel() && this.do_before()) {
			this.switchStep(this.getActiveIndex() + 1);
			this.do_after();
		}
	}

	this.previous = function(){
		if (this.checkPrevious()) {
			this.switchStep(this.getActiveIndex() - 1);
			this.do_after();
		}
	}

	this.do_before = function(){
		return true;
	}

	this.do_after = function(){
		this.step = this.getActiveStep();
	}

	this.save = function(){
		var wifi = this.wifi;

		var create = {
			common: function(GHz){
				GHz = is.set(GHz) ? GHz : '';
				var obj = {};
				obj[GHz + 'mbssidNum'] = 1;
				obj[GHz + 'mbssidCur'] = 1;
				obj[GHz + 'Radio'] = false;
				return obj;
			}
		};

		if (wifi.Radio || parseInt(wifi.mbssidCur) != 1) {
			rootView.showModalOverlay();
			var query = new Array();
			var data_common = create.common();
			query.push([ 39, data_common]);
			$.extend(this.wifi, data_common);
			device.config.write(query, callback(this, function(){
				this.emit("wzsaved.wifi");
				rootView.hideModalOverlay();
			}));
		} else {
			this.emit("wzsaved.wifi");
		}
	}

	this.updateView = function(phase){
		wizardWiFiDisabler.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.child("finish/mode").val(lng("wzwifiDisableWiFi"));
			this.do_after();
		}
	}

	this.update = function(wifi){
		if (wifi) {
			this.wifi = wifi;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read( 35, callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data))?data.resident:null;
				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
	}
}
extend(wizardWiFiDisabler, nodeWizard);





function wizardWiFiMulti(quick){
	wizardWiFiMulti.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.ifacelist = null;
	this.step = null;
	this.subwz = null;

	this.add(new node(), "mode")
		.child("mode")
		.add(new nodeCaption("wzwifiGenMode"));

	var radioOpt = [];

		radioOpt.push({ name: "wzwifiRouter", value: "router", comment: "wzwifiDescRouter", checked: true });
	if(!hideFlag( 110) && !quick){
		radioOpt.push({ name: "wzwifiClient", value: "client", comment: "wzwifiDescClient" });
	}
	if(!hideFlag("wifi.Radio")){
		radioOpt.push({ name: "wzwifiDisable", value: "off", comment: "wzwifiDescDisable" });
	}


	this.child("mode").add(new nodeOptionsRadio("wzwifiMode", "", {
			options: radioOpt
		}), "mode");

		this.add(new wizardWiFiRouter(), "router");
if (!quick) {
	this.add(new wizardWiFiClient(), "client");
}
	this.add(new wizardWiFiDisabler(), "off");

	this.updateModel = function(status){
		this.status = status;
	}

	this.checkNext = function(){
		return (this.step.checkNext)?this.step.checkNext():this.getActiveIndex() < this.children.length - 1;
	}

	this.checkPrevious = function(){
		return (this.getActiveIndex() > 0);
	}

	this.checkSave = function(){
		return (this.step.checkSave && this.step.checkSave());
	}

	this.next = function(){
		if (this.checkNext() && this.do_before()) {
			if (this.step.getAlias() == 'mode') {
				this.subwz = this.child("mode/mode").val();
				this.switchStep(this.subwz);
				this.child(this.subwz).update(this.wifi, this.ifacelist);
			} else {
				this.step.next();
			}
			this.do_after();
		}
	}

	this.previous = function(){
		if (this.checkPrevious()) {
			if (this.step instanceof nodeWizard) {
				if (this.step.checkPrevious()) {
					this.step.previous();
				} else {
					this.switchStep('mode');
				}
			} else {	// Finish
				this.switchStep(this.subwz);
			}
			this.do_after();
		}
	}

	this.do_before = function(){
		return true;
	}

	this.do_after = function(){
		this.step = this.getActiveStep();
	}

	this.save = function(){
		if (this.checkSave()) this.step.save();
	}

	this.updateView = function(phase){
		wizardWiFiMulti.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.do_after();
		}
	}

	this.update = function(wifi, ifacelist){
		if (wifi && ifacelist) {
			this.wifi = wifi;
			this.ifacelist = ifacelist;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read([
				 35,
				 1
			], callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
				this.ifacelist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.iface_names:{};
				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
	}

	this.bind("wzsaved.wifi", function(e, needreboot){

	});
}
extend(wizardWiFiMulti, nodeWizard);

function pageWiFiWizard(quick){
	pageWiFiWizard.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.ifacelist = null;

	var wizard = this.add(new wizardWiFiMulti(quick), "wizard").child("wizard");

	this.updateModel = function(status){
		this.status = status;
	}

	this.do_logic = function(){
		if (wizard.checkPrevious()) {
			this.getButton("button_prev").show();
		} else {
			this.getButton("button_prev").hide();
		}
		if (wizard.checkNext()) {
			this.getButton("button_next").show();
		} else {
			this.getButton("button_next").hide();
		}
		if (wizard.checkSave()) {
			this.getButton("button_save").show();
		} else {
			this.getButton("button_save").hide();
		}
	}

	this.next = function(){
		wizard.next();
		this.do_logic();
	}

	this.previous = function(){
		wizard.previous();
		this.do_logic();
	}

	this.save = function(){
		wizard.save();
	}

	this.reboot = function(){
		rootCtrl.event("cfgsaverebootrq");
	}

	this.updateView = function(phase){
		pageWiFiWizard.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.cleanButtonBar()
				.addButton("button_prev")
				.getButton("button_prev")
				.bind("click.button", callback(this, this.previous)).hide();
			this.addButton("button_next")
				.getButton("button_next")
				.bind("click.button", callback(this, this.next)).hide();
			this.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, this.save)).hide();
			this.do_logic();
		}
	}

	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([
			 35,
			 1
		], callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
			this.ifacelist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.iface_names:{};
			this.deep.updateView();
			//~ wizard.update(this.wifi, this.ifacelist);
			rootView.hideModalOverlay();
		}));
	});
	this.bind("wzsaved.wifi", function(e, needreboot){
		//Долбаный костыль из за сомещения несовместимого
		if(window.wifiWizard && wifiWizard.quickMasterCtrl){
			wifiWizard.quickMasterCtrl.event("wifiready");
		}
		else{
			this.getButton("button_prev").hide();
			this.getButton("button_next").hide();
			this.getButton("button_save").hide();
			if (needreboot) {
			//	_doSaveReboot();
			} else {
				alert(lng("wzwifiSaveOk"));
				//~ document.location.href = "index.cgi";
				document.location.hash = "";
				location.reload(true);
			}
		}
	});
}
extend(pageWiFiWizard, node);

function pageWiFiRepeaterWizard(){
	pageWiFiRepeaterWizard.superclass.constructor.apply(this, arguments);

	this.wifi = null;
	this.ifacelist = null;

	var wizard = this.add(new wizardWiFiRepeater(), "wizard").child("wizard");

	this.updateModel = function(status){
		this.status = status;
	}

	this.do_logic = function(){
		if (wizard.checkPrevious()) {
			this.getButton("button_prev").show();
			this.getButton("button_cancel").hide();
		} else {
			this.getButton("button_prev").hide();
			this.getButton("button_cancel").show();
		}
		if (wizard.checkNext()) {
			this.getButton("button_next").show();
		} else {
			this.getButton("button_next").hide();
		}
		if (wizard.checkSave()) {
			this.getButton("button_save").show();
		} else {
			this.getButton("button_save").hide();
		}
	}

	this.next = function(){
		wizard.next();
		this.do_logic();
	}

	this.previous = function(){
		wizard.previous();
		this.do_logic();
	}

	this.save = function(){
		wizard.save();
	}

	this.reboot = function(){
		rootCtrl.event("cfgsaverebootrq");
	}

	this.updateView = function(phase){
		pageWiFiRepeaterWizard.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.cleanButtonBar()
				.addButton("button_prev")
				.getButton("button_prev")
				.bind("click.button", callback(this, this.previous)).hide();
			this.addButton("button_next")
				.getButton("button_next")
				.bind("click.button", callback(this, this.next)).hide();
			this.addButton("button_cancel")
				.getButton("button_cancel")
				.bind("click.button", callback(this, function(){document.location.hash = ""; location.reload(true);})).hide();
			this.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, this.save)).hide();

			this.do_logic();

		}
	}

	this.bind("updaterq", function(){
		rootView.showModalOverlay();
		device.config.read([
			 35,
			 1
		], callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
			this.ifacelist = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident.iface_names:{};
			this.deep.updateView();
			wizard.update(this.wifi, this.ifacelist);
			rootView.hideModalOverlay();
		}));
	});
	this.bind("wzsaved.wifi", function(e, needreboot){
		//Долбаный костыль из за сомещения несовместимого
		if(window.wifiWizard && wifiWizard.quickMasterCtrl){
			wifiWizard.quickMasterCtrl.event("wifiready");
		}
		else{
			this.getButton("button_prev").hide();
			this.getButton("button_next").hide();
			this.getButton("button_save").hide();
			if (needreboot) {
				//_doSaveReboot();
			} else {
				alert(lng("wzwifiSaveOk"));
				document.location.hash = "";
				location.reload(true);
			}
		}
	});
}
extend(pageWiFiRepeaterWizard, node);
























function bestAuthMode(AuthAvailable){
	
	function find(value) {
		for (var i = AuthAvailable.length; i > 0; i--){
			var auth = AuthAvailable[i - 1];
			if (auth.Id.toUpperCase().search(value.toUpperCase()) >= 0) {
				return auth.Id;
			}
		}
		return null;
	}
	
	var bestlist = [ 'WPAPSKWPA2PSK', 'WPA2PSK', 'WPAPSK' ];
	
	for (var i = 0; i < bestlist.length; i++) {
		var id = find(bestlist[i]);
		if (is.set(id)) {
			return id;
		}
	}
	
	return 'WPAPSK';	// Хоть что-нибудь
}



function wifiWEPForm(){
	wifiWEPForm.superclass.constructor.apply(this, arguments);
	
	var wep_keys = { "1":"0", "2":"1", "3":"2", "4":"3" };

	var checkWEP = callback(this, function(value){
		var hexKeys = keys.child("key_type").val();
		var status = null;
		var wepBit = keys.child("key_bit").val();
		var wepCheck = check_wifi_key_ex(value, hexKeys, wepBit);
		if (!wepCheck) {
			if (hexKeys) {
				status = "wifiWEPKeyWrongHEXSize"+wepBit;
			} else {
				status = "wifiWEPKeyWrong"+wepBit;
			}
		}
		if ((!status && hexKeys && !check_wifi_key_hex(value)) || value.match(/\s/)) {
			status = "wifiWEPKeyWrongHEX";
		}
		return status;
	});
	
	this.add(new nodeCaption("securitySectWEP"))
		.add(new nodeCheckBox("securityWEP", false), "wep_encr")
		.add(new node({
			hidden: true
		}), "keys");
	var keys = this.child("keys")
		.add(new nodeSelect("securityWEPKeyID"), "key_id")
		.add(new nodeCheckBox("securityWEPKeyHEX", false), "key_type")
		.add(new nodeSelect("securityWEPKeyLength"), "key_bit")		
		.add(new nodetext(lng("securityWEPKey") + " (1)", '', {
			mandatory: true,
			re: [ checkWEP ]
		}), "key1");


	keys.child("key_bit").addOption('64bit', 64);
	keys.child("key_bit").addOption('128bit', 128);	

	for (var i = 2; i <= 4; i++){
		keys.add(new nodetext(lng("securityWEPKey") + " (" + i + ")", '', {
			mandatory: true,
			re: [ checkWEP ]
		}), "key" + i);
	}
	
	this.updateView = function(phase){
		wifiWEPForm.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			var key_id = keys.child("key_id").cleanOptions();
			for (var i in wep_keys) {
				key_id.addOption(i, wep_keys[i]);
			}

		}
		
	}
	
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "wep_encr":
				if (value) keys.show(); else keys.hide();
			break;
		}
	});

}
extend(wifiWEPForm, node);



function wifiWPAForm(){
	wifiWPAForm.superclass.constructor.apply(this, arguments);
	
	var wpa_encrypts = { "TKIP":"TKIP", "AES":"AES", "TKIP+AES":"TKIPAES" };
	
	this.add(new nodeCaption("securitySectWPA"))
		.add(new nodeSelect("securityWPAEnc"), "wpa_enc")
		.add(new nodenum("securityWPARen", 3600, {
			minval: 0,
			maxval: 1000000,
			mandatory: true
		}), "wpa_ren");
	
	this.setEncryption = function(exceptions){
		if (!is.array(exceptions)) exceptions = new Array();
		var wpa_enc = this.child("wpa_enc").cleanOptions();
		for (var i in wpa_encrypts) {
			if ($.inArray(i, exceptions) == -1)
				wpa_enc.addOption(i, wpa_encrypts[i]);
		}
		wpa_enc.correctValue();
		//wpa_enc.deep.updateView();
	}
	
	this.updateView = function(phase){
		wifiWPAForm.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.setEncryption();
		}
	}

}
extend(wifiWPAForm, node);

function wifiSecurityForm(GHz){
	wifiSecurityForm.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	this.wifi = null;
	this.mbssidIndex = null;
	this.modeN = false;
	this.GHz = is.set(GHz)?GHz:'';
	
	this.add(new nodeSelect("securityAuthMode", 'OPEN'), "netaut")
		.add(new nodetext("securityKeyPSK", '', {
			hidden: true,
			mandatory: true,
			re: [
				callback(this, function(value){
					return check_wifi_keypsk(value)?null:"wifiPSKKeyWrong";
				})
			]
		}), "key_psk")
		.add(new nodeCheckBox("securityPreAuth", false, {
			hidden: true
		}), "pre_auth")
		.add(new wifiWEPForm({
			hidden: true
		}), "wep");
	var wep = this.child("wep");
	var keys = wep.child("keys");
	var radius = this.add(new node({
		hidden: true
	}), "radius")
		.child("radius")
		.add(new nodeCaption("securitySectRadius"))
		.add(new nodeip("ip_address", '192.168.0.254', {
			mandatory: true
		}), "rad_ip")
		.add(new nodenum("port", 1812, {
			minval: 1,
			maxval: 65535,
			mandatory: true
		}), "rad_port")
		.add(new nodetext("securityRadiusKey", 'dlink', {
			mandatory: true
		}), "rad_key")
	var wpa = this.add(new wifiWPAForm({
		hidden: true
	}), "wpa").child("wpa");

	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateWPAEncryption = function(){
		var auth = this.child("netaut").val();
		var exceptions = new Array();
		if (this.modeN) {
			exceptions = ["TKIP+AES","TKIP"];
		}
		switch (auth) {
			case "WPA":
				if (!this.modeN) exceptions = ["TKIP+AES","AES"];
			break;
			case "WPA2":
			case "WPA1WPA2":
				if (!this.modeN && auth == "WPA2") exceptions = ["TKIP+AES","TKIP"];
			break;
			case "WPAPSKWPA2PSK":
			case "WPA2PSK":
			break;
		}
		wpa.setEncryption(exceptions);
	}
	
	this.updateView = function(phase){
		wifiSecurityForm.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			if (this.wifi) {
				var wifi = this.wifi;
				var mbssidIndex = (this.mbssidIndex)?this.mbssidIndex:wifi[this.GHz + 'mbssidCur'] - 1;
				var mbssid = this.wifi[this.GHz + 'mbssid'][mbssidIndex];
				//this.wifi[this.GHz + 'mbssid'] = new Array();
				this.wifi[this.GHz + 'mbssid'][mbssidIndex] = mbssid;
				
				var wep_encr = wep.child("wep_encr");
				var wpa_enc = wpa.child("wpa_enc");
				
				if (wifi[this.GHz + 'WirelessMode'] && parseInt(wifi[this.GHz + 'WirelessMode']) >= 6) {
					this.modeN = true;
					wep_encr.val(false);
					if (mbssid.AuthMode == "OPEN-IEEE8021X" || mbssid.AuthMode == "SHARED" || mbssid.AuthMode == "WEPAUTO") {
						mbssid.AuthMode = "OPEN";
					} else {
					}
				} else {
					this.modeN = false;
				}		
				var netaut = this.child("netaut").cleanOptions();
				var exceptions = (this.modeN)?["Open-IEEE8021X","Shared","WEPAUTO"]:[];
				for (var i in wifi.AuthAvailable) {
					if ($.inArray(wifi.AuthAvailable[i].Name, exceptions) == -1)
						netaut.addOption(wifi.AuthAvailable[i].Name, wifi.AuthAvailable[i].Id);
				}
				netaut.val(mbssid.AuthMode).fieldchange();
				
				this.updateWPAEncryption();
				
				if (mbssid.EncrypType == "WEP" || (mbssid.AuthMode == "SHARED" || mbssid.AuthMode == "WEPAUTO")) {
					wep_encr.val(true).fieldchange();
				} else {
					wep_encr.val(false).fieldchange();
					if (mbssid.EncrypType == "TKIP" || mbssid.EncrypType == "AES" || mbssid.EncrypType == "TKIPAES") {						
						wpa_enc.val(mbssid.EncrypType).correctValue();
					}
				}
				if (this.modeN) wep.hide();
				
				keys.child("key_type").val((mbssid.Key1Type!="")?mbssid.Key1Type=="0":false);
				
				//keys.child("key_type").
				//mbssid.Key1Str
				
				keys.child("key1").val(mbssid.Key1Str);	
				var multipler = 1;
				if ( keys.child("key_type").val() ) {
					multipler = 2;
				}
				var keylen = keys.child('key1').val().length;
				if ( keylen >= 6*multipler ) {
					keys.child('key_bit').val(128);
				} else {
					keys.child('key_bit').val(64);
				}
			
				
							
				keys.child("key2").val(mbssid.Key2Str);
				keys.child("key3").val(mbssid.Key3Str);
				keys.child("key4").val(mbssid.Key4Str);
				keys.child("key_id").val(mbssid.DefaultKeyID);

				radius.child("rad_ip").val(wifi[this.GHz + 'RADIUS_Server']);
				radius.child("rad_port").val(wifi[this.GHz + 'RADIUS_Port']);
				radius.child("rad_key").val(wifi[this.GHz + 'RADIUS_Key']);
				this.child("key_psk").val(mbssid.WPAPSK);
				this.child("pre_auth").val(mbssid.PreAuth);
				wpa.child("wpa_ren").val(wifi[this.GHz + 'RekeyInterval']);
			}
		}
	}
	
	this.save = function(cb){
		var mbssidIndex = (this.mbssidIndex)?this.mbssidIndex:this.wifi[this.GHz + 'mbssidCur'] - 1;
		var auth = this.child("netaut").val();
		var key_type = (keys.child("key_type").val())?"0":"1";
		var data = {};
		data[this.GHz + 'mbssid'] = this.wifi[this.GHz + 'mbssid'];
		data[this.GHz + 'mbssid'][mbssidIndex] = {
			'AuthMode': auth,
			'WPAPSK': this.child("key_psk").val(),
			'Key1Str': keys.child("key1").val(),
			'Key1Type': key_type,
			'Key2Str': keys.child("key2").val(),
			'Key2Type': key_type,
			'Key3Str': keys.child("key3").val(),
			'Key3Type': key_type,
			'Key4Str': keys.child("key4").val(),
			'Key4Type': key_type,
			'DefaultKeyID': keys.child("key_id").val(),
			'PreAuth': this.child("pre_auth").val(),
			'EncrypType': (auth!="OPEN"&&auth!="OPEN-IEEE8021X"&&auth!="SHARED"&&auth!="WEPAUTO")?wpa.child("wpa_enc").val():(wep.child("wep_encr").val())?"WEP":"NONE"
		};
		data[this.GHz + 'RADIUS_Server'] = radius.child("rad_ip").val();
		data[this.GHz + 'RADIUS_Port'] = radius.child("rad_port").val().toString();
		data[this.GHz + 'RADIUS_Key'] = radius.child("rad_key").val();
		data[this.GHz + 'RekeyInterval'] = wpa.child("wpa_ren").val().toString();
		$.extend(this.wifi, data);
		if (auth == "OPEN" && data[this.GHz + 'mbssid'][mbssidIndex].EncrypType == "NONE") {
			alert(lng('securityAuthModeWarningOpen'));
		}
		device.config.write( 36, data, cb);
	}
	
	this.autosave = function(autoupdate){
		if (this.deep.updateModel()) {
			rootView.showModalOverlay();
			this.save(callback(this, function(autoupdate){
				rootView.hideModalOverlay();
				if (autoupdate) this.update();
			}, autoupdate));
		}
	}
	
	this.update = function(wifi){
		if (wifi) {
			this.wifi = wifi;
			this.deep.updateView();
		} else {
			rootView.showModalOverlay();
			device.config.read( 35, callback(this, function(data){
				this.wifi = (is.RPC_SUCCESS(data))?data.resident:null;
				this.deep.updateView();
				rootView.hideModalOverlay();
			}));
		}
	}
	
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "netaut":
				wep.hide();
				wpa.hide();
				var key_psk = this.child("key_psk").hide();
				var pre_auth = this.child("pre_auth").hide();
				var wep_encr = wep.child("wep_encr");
				radius.hide();
				switch (value) {
					case "OPEN":
						if (!this.modeN) {                                                        
							wep_encr.enable().val(false).fieldchange();
							wep.show();
						}
					break;
                                        
					case "OPEN-IEEE8021X":
						wep_encr.enable();
						wep.show();
						radius.show();
					break;
					case "SHARED":
					case "WEPAUTO":
						wep_encr.disable().val(true).fieldchange();
						wep.show();
					break;
					case "WPA":
						radius.show();
						wpa.show();
					break;
					case "WPA2":
					case "WPA1WPA2":
						radius.show();
						pre_auth.show();
						wpa.show();
					break;
					case "WPAPSKWPA2PSK":
					case "WPA2PSK":
						key_psk.show();
						pre_auth.show();
						wpa.show();
					break;
					case "WPAPSK":
						key_psk.show();
						wpa.show();
					break;
				}
				this.updateWPAEncryption();
			break;
		}
	});
}
extend(wifiSecurityForm, node);



function pageWiFiSecurity(GHz){
	pageWiFiSecurity.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	var basic = this.add(new wifiSecurityForm(GHz), "basic").child("basic");
	
	this.updateView = function(phase){
		pageWiFiSecurity.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					basic.autosave(true);
				}));
		}
	}
	
	this.bind("updaterq", function(){
		this.deep.updateView();
		basic.update();
	});
}
extend(pageWiFiSecurity, node);

























function pageWiFiStationList(){
	pageWiFiStationList.superclass.constructor.call(this);
	
	this.wifi = null;
	this.stations = null;
	this.$grid = null;
	
	this.updateView = function(phase){
		pageWiFiStationList.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar().$box.empty();
			var table = [];
			//Костыль чтобы убрать поле Скорость передачи
			var params = _.without(this.wifi.StaListParamsAvailable, "lastTxRate");
			
			for (var i = 0; i<params.length; i++){
				table.push({index: params[i], name: "staList" + params[i]});
			}
			this.$grid = this.$box.html("\
				<div class='grid rm'></div>\
			").find('.grid').lightUIGrid(table, this.stations.length, {
				selectable: true
			});

			for(var i = 0; this.stations && i < this.stations.length; i++){
				for (var j = 0; j<params.length; j++){
					var $row = this.$grid.row(i);
					$row.col(params[j]).fieldval(this.stations[i][params[j]].toString());
				}
			}
			this.addButton("stalstDisas")
				.getButton("stalstDisas")
				.bind("click.button", callback(this, function(){
					var selection = this.$grid.selection();
					if (selection.length){
						var maclist = new Array();
						for (var i = 0; i < selection.length; i++) {
							var $row = this.$grid.row(i);
						if ($row.col("mac"))
							maclist.push($row.col("mac").fieldval());
						}
						selection.moveTo();
						this.disconnect(maclist);
					} else {
						alert(lng("staListForDelEmpty"));
					}
				}));
			this.addButton("refresh")
				.getButton("refresh")
				.bind("click.button", callback(this, function(){
					this.update();
				}));
		}
	}
	
	this.disconnect = function(maclist){
		rootView.showModalOverlay();
		device.config.write( 108, maclist, callback(this, function(){
			rootView.hideModalOverlay();
		}));
	}
	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read([ 35,  64], callback(this, function(data){
			this.wifi = (is.RPC_SUCCESS(data.rq[0]))?data.rq[0].resident:null;
			this.stations = (is.RPC_SUCCESS(data.rq[1]))?data.rq[1].resident:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
}
extend(pageWiFiStationList, node);
























function wifiWMMGrid(mode){
	wifiWMMGrid.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
	
	this.settings = null;
	this.$grid = null;
	this.mode = mode;
	
	var valset1_2 = {"1":1, "3":2};
	var valset1_3 = {"1":1, "3":2, "7":3};
	var valset1_4 = {"1":1, "3":2, "7":3, "15":4};
	var valset1_6 = {"1":1, "3":2, "7":3, "15":4, "31":5, "63":6};
	var valset1_10 = {"1":1, "3":2, "7":3, "15":4, "31":5, "63":6, "127":7, "255":8, "511":9, "1023":10};
	
	var header = [
		{ index: "ac", name: "AC" },
		{ index: "aifsn", name: "Aifsn (1~15)" },
		{ index: "cwmin", name: "CWMin" },
		{ index: "cwmax", name: "CWMax" },
		{ index: "txop", name: "Txop" },
		{ index: "acm", name: "ACM" }
	];
	
	if (this.mode == 'ap') {
		header.push({ index: "ack", name: "Ack" });
	}
	
	this.updateModel = function(status){
		status.error &= !this.$grid.cleanErrors().checkMandatory();
		this.status = status;
	}
	
	this.updateView = function(phase){
		wifiWMMGrid.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			this.$grid = this.$box.empty().html("\
				<div class='grid'></div>\
			").find('.grid').lightUIGrid(header, this.settings?this.settings.length:0);
			this.$grid.colEditable("aifsn", "number", {
					mandatory: true,
					minval: 1,
					maxval: 15
				})
				.colEditable("txop", "number", {
					mandatory: true,
					minval: 0,
					maxval: 9999
				})
				.colEditable("acm", "select", {
					options: { 'wmmOff': "0", 'wmmOn': "1" }
				});
			if (this.mode == 'ap') {
				this.$grid.colEditable("ack", "select", {
					options: { 'wmmOff': "0", 'wmmOn': "1" }
				});
			}
			for(var i = 0; this.settings && i < this.settings.length; i++){
				var settings = this.settings[i];
				var $row = this.$grid.row(i);			
				switch (i) {
					case 0:
						$row.col("ac").fieldval("AC_BK");
						$row.col("cwmin").editable("select", {options: valset1_4});
						$row.col("cwmax").editable("select", {options: valset1_10});
					break;
					case 1:
						$row.col("ac").fieldval("AC_BE");
						$row.col("cwmin").editable("select", {options: valset1_4});
						$row.col("cwmax").editable("select", {options: (this.mode=='ap')?valset1_6:valset1_10});
					break;
					case 2:
						$row.col("ac").fieldval("AC_VI");
						$row.col("cwmin").editable("select", {options: valset1_3});
						$row.col("cwmax").editable("select", {options: valset1_4});
					break;
					case 3:
						$row.col("ac").fieldval("AC_VO");
						$row.col("cwmin").editable("select", {options: valset1_2});
						$row.col("cwmax").editable("select", {options: valset1_3});
					break;
				}
				$row.col("aifsn").fieldval(settings.aifsn);
				$row.col("cwmin").fieldval(settings.cwmin);
				$row.col("cwmax").fieldval(settings.cwmax);
				$row.col("txop").fieldval(settings.txop);
				$row.col("acm").fieldval(settings.acm);
				if (this.mode == 'ap') {
					$row.col("ack").fieldval(settings.ack);
				}	
			}
		}
	}
	
	this.data = function(){
		this.deep.updateModel();
		if (!this.status.error) {
			var settings = new Array();
			for (var i = 0; i < this.$grid.nrow(); i++) {
				var $row = this.$grid.row(i);
				var obj = {
					'aifsn': $row.col("aifsn").fieldval(),
					'cwmin': $row.col("cwmin").fieldval(),
					'cwmax': $row.col("cwmax").fieldval(),
					'txop': $row.col("txop").fieldval(),
					'acm': $row.col("acm").fieldval()
				};
				if (this.mode == 'ap') {
					obj['ack'] = $row.col("ack").fieldval();
				}
				settings.push(obj);
			}
			return settings;
		}
		return null;
	}
	
	this.update = function(settings){
		this.settings = settings;
		this.deep.updateView();
	}

}
extend(wifiWMMGrid, node);



function pageWiFiWMM(){
	pageWiFiWMM.superclass.constructor.call(this);
	
	this.wmm = null;
	
	this.add(new nodeCheckBox("wmmEnable", false), "enable")
		.add(new node({
			hidden: true
		}), "settings")
		.child("settings")
		.add(new nodeCaption("wmmSectAP"))
		.add(new wifiWMMGrid("ap"), "ap")
		.add(new nodeCaption("wmmSectSta"))
		.add(new wifiWMMGrid("sta"), "sta")
	
	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageWiFiWMM.superclass.updateView.apply(this, arguments);
		if (phase == "forward") {
			this.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					var ap = this.child("settings/ap").data();
					var sta = this.child("settings/sta").data();
					if (ap && sta) {
						this.save(this.child("enable").val(), ap, sta);
					}
				}));
		}
	}
	
	this.save = function(enable, ap, sta){
		rootView.showModalOverlay();
		this.wmm = {
			'WmmCapable': enable,
			'ap': (enable)?ap:this.wmm.ap,
			'sta': (enable)?sta:this.wmm.sta
		};
		device.config.write( 111, this.wmm, callback(this, function(){
			//rootView.hideModalOverlay();
			this.update();
		}));
	}
	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read( 111, callback(this, function(data){
			this.wmm = (is.RPC_SUCCESS(data))?data.resident:null;
			this.deep.updateView();
			if (this.wmm) {
				this.child("enable").val(this.wmm.WmmCapable).fieldchange();
				this.child("settings/ap").update(this.wmm.ap);
				this.child("settings/sta").update(this.wmm.sta);
			}
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "enable":
				var settings = this.child("settings");
				if (value) settings.show(); else settings.hide();
			break;
		}
	});
}
extend(pageWiFiWMM, node);
























function pageWiFiWPS(GHz){
	pageWiFiWPS.superclass.constructor.call(this);
	
	this.wps = null;
	this.GHz = is.set(GHz)?GHz:'';
	
	var methods = { "PBC": "PBC", "PIN": "PIN" };
	
	this.add(new nodeComment("wpsWarning"), "warning");
	var general = this.add(new node(), "general")
		.child("general")
		.add(new nodeCaption("wpsSectEnable"))
		.add(new nodeCheckBox("wpsEnable", false), "enable");
	var info = this.add(new node({
			hidden: true
		}), "info")
		.child("info")
		.add(new nodeCaption("wpsSectInfo"))
		.add(new nodestatic("wpsPinDefault", '', {
		}), "def_pin")
		.add(new nodestatic("wpsStatus"), "status")
		.add(new nodestatic("SSID"), "ssid")
		.add(new nodestatic("wpsAuth"), "auth")
		.add(new nodestatic("wpsEncr"), "encr")
		.add(new nodestatic("wpsEncrKey"), "encr_key");
	var connect = this.add(new node({
			hidden: true
		}), "connect")
		.child("connect")
		.add(new nodeCaption("wpsSectConnect"));
	connect.add(new nodeSelect("wpsMethod"), "method")	//wps.WscMethod - юзается только для отправки данных
		.add(new nodetext("wpsPin", '', {				//wps.WscPin - юзается только для отправки данных
			hidden: true,
			mandatory: true,
			re: [
				function(value){
					value = value.replace(/(\-|\ )/g, '');
					if (!(new RegExp("^[0-9]+(\.?[0-9]+|[0-9]*)$").test(value))) return "numNaN";
					if (value.length != 4 && value.length != 8) return "wpsPinError";
					if (value.length == 8) {
						var pin = parseInt(value);
						var accum = 0;
						accum += 3 * (parseInt(pin / 10000000) % 10);
						accum += 1 * (parseInt(pin / 1000000) % 10);
						accum += 3 * (parseInt(pin / 100000) % 10);
						accum += 1 * (parseInt(pin / 10000) % 10);
						accum += 3 * (parseInt(pin / 1000) % 10);
						accum += 1 * (parseInt(pin / 100) % 10);
						accum += 3 * (parseInt(pin / 10) % 10);
						accum += 1 * (parseInt(pin / 1) % 10);
						if ((accum % 10) != 0) return "wpsPinError";
					}
					return null;
				}
			]
		}), "pin");

	this.wps_on_off = function(value){
		if (value) {
			info.show();
			connect.show();
		} else {
			info.hide();
			connect.hide();
		}
	}

	this.updateModel = function(status){
		this.status = status;
	}
	
	this.updateView = function(phase){
		pageWiFiWPS.superclass.updateView.apply(this, arguments);
		if (phase == "back") {
			general.cleanButtonBar()
				.addButton("button_save")
				.getButton("button_save")
				.bind("click.button", callback(this, function(){
					this.enable(this.child("general/enable").val());
				}));
			info.cleanButtonBar()
				.addButton("refresh")
				.getButton("refresh")
				.bind("click.button", callback(this, function(){
					this.update();
				}));
			info.addButton("wpsReset")
				.getButton("wpsReset")
				.bind("click.button", callback(this, function(){
					this.reset();
				}));
			connect.cleanButtonBar()
				.addButton("wpsConnect")
				.getButton("wpsConnect")
				.bind("click.button", callback(this, function(){
					if (this.deep.updateModel()) {
						this.connect(connect.child("method").val(), connect.child("pin").val());
					}
				}));
			var method = connect.child("method").cleanOptions();
			for (var i in methods) {
				method.addOption(i, methods[i]);
			}
			
			
			var wps = null;
			var wds = null;
			var data = this.data;

			if ( is.set(this.data) && is.set(this.data.resident[this.GHz + 'wps']) ) {
				wps = this.data.resident[this.GHz + 'wps'];
			}
			if ( is.set(this.data) && is.set(this.data.resident[this.GHz + 'wds']) ) {
				wds = this.data.resident[this.GHz + 'wds'];
			}
			
			if (!wps.WscCheck) {
				this.child("warning").show();
			} else {
				this.child("warning").hide();
			}

			if (wps) {
				this.wps_on_off(wps.WscEnable);
				general.child("enable").val(wps.WscEnable && wps.WscCheck);
				if (wps.WscEnable) {
					info.child("status").val(wps.WscConfigured?lng("wpsConf"):lng("wpsUnconf"));
					
					if ( is.set(wps.WscSSID) ) {
						info.child("ssid").val(wps.WscSSID);
					} else {
						info.child("ssid").val(data.resident[this.GHz + 'mbssid'][0].SSID);
					}

					info.child("def_pin").val(wps.WscDefaultPin);
					
					//AuthAvailable cache
					var authAvailableCache = [];
					for ( var i = 0; i < data.resident.AuthAvailable.length; i++ ) {
						authAvailableCache[data.resident.AuthAvailable[i].Id] = data.resident.AuthAvailable[i].Name; 
					}
					
					if ( is.set(wps.WscAuth) ) {				
						info.child("auth").val(wps.WscAuth);						
					} else {
						for ( var i = 0; i < data.resident.AuthAvailable.length; i++ ) {
							if ( data.resident.AuthAvailable[i].Id == data.resident[this.GHz + 'mbssid'][0].AuthMode ) {
								wps.WscAuth = data.resident.AuthAvailable[i].Name;
								info.child("auth").val(wps.WscAuth);
								break;
							 }
						}					
					}
										
					var wpa_encrypts = { "TKIP": "TKIP", "AES": "AES", "TKIPAES": "TKIP+AES" };										
					if ( is.set(wps.WscEncrypType) ) {				
						info.child("encr").val(wps.WscEncrypType);						
					} else {						
						if ( data.resident[this.GHz + 'mbssid'][0].EncrypType != "NONE" ) {
							info.child("encr").val( wpa_encrypts[data.resident[this.GHz + 'mbssid'][0].EncrypType] );
						} else {
							info.child("encr").val( lng('not_appointed') );
						}
					}
								
					if (is.set(wps.WscAuth) && wps.WscAuth == "OPEN"){
						info.child("encr_key").hide();					
					} else if ( is.set(wps.WscEncKey) ) {	
						info.child("encr_key").show();			
						info.child("encr_key").val( wps.WscEncKey );						
					} else {
						if ( data.resident[this.GHz + 'mbssid'][0].EncrypType != "NONE" ) {
							info.child("encr_key").val( data.resident[this.GHz + 'mbssid'][0].WPAPSK );
						} else {
							info.child("encr_key").val( lng('not_appointed') );						
						}
					}															
				}
			}
			if ( (wds && wds.WdsEnable != "0") || (wps && !wps.WscCheck) ) {
				general.child("enable").disable();
				general.getButton("button_save").disable();
			} else {
				general.child("enable").enable();
				general.getButton("button_save").enable();
			}
		}
	}
	
	this.reset = function() {
		rootView.showModalOverlay();
		var data = {};
		data[this.GHz + 'wps'] = {
			'WscEnable': true,
			'WscConfigured': false
		};
		device.config.write( 106, data, callback(this, function(){
			//rootView.hideModalOverlay();
			this.update();
		}));
	}

	
	this.enable = function(enable) {
		rootView.showModalOverlay();
		var data = {};
		data[this.GHz + 'wps'] = {
			'WscEnable': enable //,'WscConfigured': this.data.resident[this.GHz + 'wps']
		};
		device.config.write( 106, data, callback(this, function(){
			//rootView.hideModalOverlay();
			this.update();
		}));
	}
	
	this.connect = function(method, pin){
		rootView.showModalOverlay();
		var data = {};
		data[this.GHz + 'wps'] = {
			'WscEnable': true,
			'WscMethod': method
		};
		if (method == 'PIN') {
			data[this.GHz + 'wps'].WscPin = pin;
		}
		device.config.write( 107, data, callback(this, function(){
			//rootView.hideModalOverlay();
			this.update();
		}));
	}
	
	this.update = function(){
		rootView.showModalOverlay();
		device.config.read( 35, callback(this, function(data){
			this.data = (is.RPC_SUCCESS(data))?data:null;
			this.deep.updateView();
			rootView.hideModalOverlay();
		}));
	}
	
	this.bind("updaterq", this.update);
	this.bind("fieldchange", function(status, value){
		switch(status.target.getAlias()){
			case "method":
				var pin = connect.child("pin");
				if (value == 'PIN') pin.show(); else pin.hide();
			break;
		}
	});
}
extend(pageWiFiWPS, node);



