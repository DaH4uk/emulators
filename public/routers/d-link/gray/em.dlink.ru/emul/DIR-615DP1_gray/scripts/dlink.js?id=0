



















function detectLanguage() {
	var langAttachments = {
		'ru': 'rus',
		'en': 'eng',
		'uk': 'ukr',
		'tr': 'tur',
		'fr': 'fra',
		'ar': 'ara',
		'fa': 'fas'
	};
	var browserLang = (navigator.language)?navigator.language:navigator.userLanguage;
	browserLang = browserLang.toLowerCase().substr(0, 2);
				
	if (browserLang in langAttachments) {
		return langAttachments[browserLang];
	} else {
		return 'eng'
	}
}
			
function getInternetExplorerVersion()
{
	var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	if (re.exec(navigator.userAgent) != null) {
		return parseFloat(RegExp.$1);
	}
}

function getPosX(elem) {
	if ($(elem).position().left != $(elem).offset().left) {
		return $(elem).position().left;
	} else {
		return $(elem).offset().left;
	}
}

function getPosY(elem) {
	if ($(elem).position().top != $(elem).offset().top) {
		return $(elem).position().top;
	} else {
		return $(elem).offset().top;
	}
}

function switchDirection(lang) {
	var rtlLangs = [];
	rtlLangs = "ara,fas,heb".split(",");
	
	if ($.inArray(lang, rtlLangs) != -1) {
		$('body').addClass('rtlDirection');
	} else {
		$('body').removeClass('rtlDirection');
	}
}
window.HELPER = new function(){
	
	var self = this;
	var $$ = {
		timerID: null,
		tip: null
	};
	
	function unsetHiding(){
		clearTimeout($$.timerID);
	}
	
	function setHiding(){
		$$.timerID = setTimeout(callback(self, self.hide), 600);
	}

	this.hide = function(){
		$$.tip.find('>.tip_content').html('');
		$$.tip.hide().removeClass('top bottom left right').appendTo('body');
	}

	// Init
	$(document).bind('ready', callback(this, function(){
		
		$$.tip = $("\
			<div id='tip' class='unselectable'>\
				<div class='tip_content' unselectable='on'></div>\
				<div class='tip_arrow'></div>\
			</div>\
		").appendTo('body').bind({
			'mouseleave': callback(this, setHiding),
			'mouseenter': callback(this, unsetHiding)
		});
		
		$('body').bind('mouseover', callback(this, function(e){
			var target = $(e.target);
			var tipcontent = (target.find('>.tip').length)?target.find('>.tip>*'):target.attr('tip');
			if (tipcontent) {
				unsetHiding();
				var parent = target.parents().filter(function(index){
					return ($(this).css('overflow') == 'hidden');
				});
				var direction = 'top';
				if (target.attr('direct')) {
					direction = target.attr('direct');
				} else if (target.find('>.tip').attr('direct')) {
					direction = target.find('>.tip').attr('direct');
				}
				var pos = target.position();
				var postype = target.css('position');
				var left, top;
				$$.tip.find('>.tip_content').html((is.string(tipcontent))?tipcontent:$(tipcontent).clone(true)).bind({
					'click': function(){
						return false;
					},
					'mousedown': function(){
						return false;
					}
				});
				$$.tip.removeClass('top bottom left right').appendTo(target);
				// Select direction (now only top!!!)
				//if (pos.top - $$.tip.height() - $$.tip.find('>.tip_arrow').height()) {
					//direction = 'top';
				//}
				switch (direction) {
					case 'top':
						top = /*pos.top - */0 - $$.tip.height() - $$.tip.find('>.tip_arrow').height();
						left = /*pos.left + */target.width()/2 - $$.tip.width()/2;
						break;
					case 'bottom':
						top = target.height() + $$.tip.find('>.tip_arrow').height();
						left = target.width()/2 - $$.tip.width()/2;
						break;
					case 'left':
						top = target.height()/2 - $$.tip.height()/2;
						left = 0 - $$.tip.width() - $$.tip.find('>.tip_arrow').width();
						break;
					case 'right':
						top = target.height()/2 - $$.tip.height()/2;
						left = target.width() + $$.tip.find('>.tip_arrow').width();
						break;
				}
				if (postype == 'static') {
					top = pos.top + top;
					left = pos.left + left;
				}
				$$.tip.css({
					'left': left,
					'top': top,
					'z-index': 9999999999
				}).addClass(direction).show();
			}
			return true;
		})).bind('mouseout', callback(this, function(e){
			var target = $(e.target);
			var tipcontent = (target.find('>.tip').length)?target.find('>.tip'):target.attr('tip');
			if (tipcontent) {
				setHiding();
			}
			return true;
		}));

	}));

};


function checkChanges(){
	debug("checkChanges: start");
	if(is.set(rootView) && rootView.pageNode && window.hasChanges != "page"){
		//Страница нового образца
		debug("checkChanges: pageNode defined");
		window.hasChanges = $("#pageGeneral").isModified();
	}
	if(!window.hasChanges){
		//Если пока изменений не найдено проверяем таблицы
		var $grids = $("#pageGeneral div.grid");
		for(var i=0; i<$grids.length; i++){
			$grid = $grids.eq(i).data("light_ui_grid");
			if($grid.find("tbody td.editable").length && gridActionConverter($grid).count){
				window.hasChanges = "grid";
				break;
			}
		}
	}
	debug("checkChanges: return ", window.hasChanges);
	return window.hasChanges;
}

function mayGo(){
	var title = $("#pageTabs div.active a").attr("langkey");
	if(		title != "title_wifi" 
		&&	title != "Click'n'Connect"
		&&	title != "menu_ping"
		&&	title != "menu_traceroute"
		&&	checkChanges()){
			return false;
	}
	window.hasChanges = null;
	return true;
}
