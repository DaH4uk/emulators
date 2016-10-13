timers = new Array();

function resetTimeouts() {
	timers = new Array();
}

function clearTimeouts() {
	for (var i = 0; i < timers.length; i++) {
		clearTimeout(timers[i]);
	}
	resetTimeouts();
}

var oldSetTimeout = window.setTimeout;
window.setTimeout = function(code, interval) {
	var timerId = oldSetTimeout(code, interval);
	timers.push(timerId);
	return timerId;
}

function setDate(d) {
	var $obj = $("#wrapperDate");
	var curDate = new Date();
	var serverDate;
	if (d instanceof Date) {
		$obj.data("serverDate", d);
		$obj.data("clientDate", curDate);
	}
	else {
		var clientDate = $obj.data("clientDate");
		if (clientDate instanceof Date) {
			serverDate = $obj.data("serverDate");
			var delta = curDate.getTime() - clientDate.getTime();
			serverDate.setTime(serverDate.getTime() + delta);
			$obj.data("clientDate", curDate);
		}
	}
	serverDate = $obj.data("serverDate");
	if (serverDate instanceof Date) {
		var arr = serverDate.toLocaleString().split(":");
		var outString = arr[0] + ":" + arr[1];
		$obj.html(outString);
	}
}



function setScrollbarSize() {
	var list = $('#' + document.slippy.substr(5).toLowerCase() + 'List');
	var wrapperLayer = $('#wrapperLayers');
	var scrollbar = $('#scrollbar');

	if ($(wrapperLayer).height() < $(list).height()) {
		var scrollSize = $(wrapperLayer).height() * 100 / ($(list).height() + 20);
		$(scrollbar).css('height', scrollSize + '%');
		if (!$(scrollbar).parent().is(':visible')) {
			$(scrollbar).parent().fadeTo("slow", 0.2);
		}
		//$('#workbenchScrollShadowBottom').show();
	}
	else {
		$(scrollbar).css('height', '0%');
		$(scrollbar).parent().fadeOut('slow');
		$('#workbenchScrollShadowBottom').hide();
	}
}

function setScrollbarPos() {
	var list = $('#' + document.slippy.substr(5).toLowerCase() + 'List');
	var wrapperLayer = $('#wrapperLayers');
	var scrollbar = $('#scrollbar');

	var t = (-1 * parseInt($(list).css('margin-top')) * ($(wrapperLayer).height() - 4) / $(list).height() + 2);
	$(scrollbar).animate({
		'top': t
	}, 200);

	if (t > 2) $('#workbenchScrollShadowTop').show();
	else $('#workbenchScrollShadowTop').hide();
}

function setLayerPos() {
	var list = $('#' + document.slippy.substr(5).toLowerCase() + 'List');
	var wrapperLayer = $('#wrapperLayers');
	var scrollbar = $('#scrollbar');

	var t = ($(scrollbar).position().top - 2) / ($(wrapperLayer).height() - 4) * $(list).height();
	$(list).css('margin-top', -1 * t);
	$(list).find('#searchIcon>img').css('margin-top', t); /* CSS'ом чёт никак было :D */

	if (t > 2) $('#workbenchScrollShadowTop').show();
	else $('#workbenchScrollShadowTop').hide();
}

function showSlideboard(ie67) {
	var searcher = $('#searcher');
	var workbench = $('#workbench');
	var slideboard = $('#slideboard');
	var arrowScrollLeft = $('#arrowScrollLeft');
	var widgetList = $('#widgetList');
	var searchList = $('#searchList');
	var pageTitle = $('#pageTitle');
	var pageScrollShadowTop = $('#pageScrollShadowTop');
	var pageScrollShadowBottom = $('#pageScrollShadowBottom');
	var pageBody = $('#page>div');
	var navigator = $('#wrapperNavigator>div,#wrapperNavigator>a');

	$(searcher).hide();
	$(pageBody).hide();
	$(navigator).hide();

	if ($(widgetList).is(':visible')) {
		var widgets = $(widgetList).find('.widget');
		$(widgets).hide( /*200*/ );
	}
	else {
		$(searchList).fadeOut(200);
	}

	$(slideboard).css({
		'left': $(workbench).offset().left + $('#layerScrollLeft').width(),
		'top': $(workbench).offset().top + parseInt($('#wrapperSearcher').css('margin-top'))
	});
	$(slideboard).show("slide", {
		direction: "right"
	}, 400, function() {
		$(pageBody).fadeIn(400);
		if (ie67) {
			$(pageScrollShadowTop).hide();
			$(pageScrollShadowBottom).hide();
		}
		else {
			$(pageScrollShadowTop).show();
			$(pageScrollShadowBottom).show();
		}
		$(arrowScrollLeft).fadeIn('slow');
		$(pageTitle).find('>.pageTitle').animate({
			'width': 'toggle'
		}, 800);
	});
}

function hideSlideboard() {
	var searcher = $('#searcher');
	var slideboard = $('#slideboard');
	var arrowScrollLeft = $('#arrowScrollLeft');
	var widgetList = $('#widgetList');
	var searchList = $('#searchList');
	var pageTitle = $('#pageTitle');
	var pageScrollShadowTop = $('#pageScrollShadowTop');
	var pageScrollShadowBottom = $('#pageScrollShadowBottom');
	var navigator = $('#wrapperNavigator>div,#wrapperNavigator>a');

	$('#pageToolbarButtons').html('');
	$('#pageToolbarModeSwitch').hide();
	window.rootCtrl.event("modeswitchsetrq", true);

	$(pageTitle).find('>.pageTitle').stop().animate({
		'width': 'toggle'
	}, 200, function() {
		$(this).hide();
		$(pageScrollShadowTop).hide();
		$(pageScrollShadowBottom).hide();
		$(slideboard).hide("slide", {
			direction: "right"
		}, 400, function() {
			$(searcher).show();
			$(navigator).show();
		});
	});

	if ($(widgetList).is(':visible')) {
		var widgets = $(widgetList).find('.widget');

		$(arrowScrollLeft).fadeOut('fast');
		$(widgets).show( /*700*/ );
	}
	else {
		$(searchList).fadeIn(1000);
	}

	setCookie('url_hash', '');
}

$(document).bind('ready', function() {
	var wrapperScrollbar = $('#wrapperScrollbar');
	var arrowScrollLeft = $('#arrowScrollLeft');
	var searcher = $('#searcher');
	var workbenchScrollShadowTop = $('#workbenchScrollShadowTop');
	var workbenchScrollShadowBottom = $('#workbenchScrollShadowBottom');

	//$(workbenchScrollShadowTop).show();
	//$(workbenchScrollShadowBottom).show();

	document.scrollbarInfo = {
		'top': 0,
		'isDragging': false
	};
	document.slippyPrev = null;
	document.slippy = null;

	$(wrapperScrollbar).css({
		'opacity': 0.2
	});

	$(searcher).find(':input').bind('keyup', function() {
		if ($(this).val() != '') {
			if (document.slippy != '#nav_Search') $('#nav_Search').click();
		}
		else {
			$(document.slippyPrev).click();
		}
		return true;
	});

	$(wrapperScrollbar).mousedown(function(e) {
		document.scrollbarInfo = {
			'hotPoint': e.pageY,
			'hotPos': $('#scrollbar').position().top,
			'isDragging': true
		};
		$(this).css('opacity', 0.3);
		return false;
	});

	$(wrapperScrollbar).mouseup(function(e) {
		document.scrollbarInfo = {
			'hotPoint': 0,
			'hotPos': 0,
			'isDragging': false
		};
		$(this).css('opacity', 0.2);
		return false;
	});

	$('body').bind('mouseup', function(e) {
		if (document.scrollbarInfo.isDragging) {
			$(wrapperScrollbar).mouseup();
			return false;
		}
	});

	$('body').bind('mousemove', function(e) {
		var info = document.scrollbarInfo;
		if (info.isDragging) {
			var scrollbar = $('#scrollbar');
			var offset = info.hotPos + e.pageY - info.hotPoint;
			if (offset < 2) {
				offset = 2;
			}
			if (offset > $(wrapperScrollbar).height() - $(scrollbar).height() - 2) {
				offset = $(wrapperScrollbar).height() - $(scrollbar).height() - 2;
			}
			$(scrollbar).css({
				'top': offset
			});
			setLayerPos();
			return false;
		}
	});

	$(arrowScrollLeft).bind('click', function() {
		window.location.replace("./");
	});

	$(applyNigga).bind('click', function() {
		window.location.replace("./");
	});


	$(linkReturner).bind('click', function() {
		window.location.replace("./");
	});


	if (window.location.href == "http://emulators-dah4uk.c9users.io/d-link/gray/em.dlink.ru/emul/DIR-615DP1_gray/macfilter.html" ||
		window.location.href == "https://emulators-dah4uk.c9users.io/d-link/gray/em.dlink.ru/emul/DIR-615DP1_gray/macfilter.html" ) {
		$(dobavit).bind('click', function() {
			window.location.replace("./addMac.html");
		});
	}


	if (window.location.href == "http://emulators-dah4uk.c9users.io/d-link/gray/em.dlink.ru/emul/DIR-615DP1_gray/addMac.html" ||
		window.location.href == "https://emulators-dah4uk.c9users.io/d-link/gray/em.dlink.ru/emul/DIR-615DP1_gray/addMac.html") {
		$(closeShit).bind('click', function() {
			window.location.replace("./macfilter.html")
		})
	}


	$(window).bind('close.page', function() {
		$(arrowScrollLeft).trigger("click");
	});

	$('#pageTabs>.pageTab').click(function() {
		$(this).parent().find('>.pageTab').removeClass('active');
		$(this).addClass('active');
	});

	$(window).bind('resize', function() {
		$('#slideboard').css({
			'left': $('#workbench').offset().left + $('#layerScrollLeft').width(),
			'top': $('#workbench').offset().top + parseInt($('#wrapperSearcher').css('margin-top'))
		});
	});

	$('#wrapperNavigator>a').bind('click', function() {
		$(this).parent().find('a.selected').removeClass('selected');
		$(this).addClass('selected');

		$('#slippy').animate({
			'width': $(this).width(),
			'height': $(this).height(),
			'left': $(this).position().left,
			'top': $(this).position().top
		}, 500);

		document.slippyPrev = document.slippy;
		document.slippy = '#' + $(this).attr('id');

		function correctScrollBar() {
			setScrollbarSize();
			setScrollbarPos();
		}



		switch (document.slippy) {
			case '#nav_Quick':
				$('#quickList').animate({
					'marginLeft': 0
				}, 400);
				$('#widgetList').animate({
					'marginLeft': 0
				}, 400, correctScrollBar);
				break;
			case '#nav_Widget':
				$('#quickList').animate({
					'marginLeft': -920
				}, 400);
				$('#widgetList').animate({
					'marginLeft': 0
				}, 400, correctScrollBar);
				break;
			case '#nav_Search':
				$('#quickList').animate({
					'marginLeft': -1840
				}, 400);
				$('#widgetList').animate({
					'marginLeft': -920
				}, 400, correctScrollBar);
				$('#searcher input').focus();
				break;
		}
		return false;
	});

	$(document).bind('contextmenu', function(e) {
		return $(e.target).is(':input');
	});

	$('#pageGeneral,#helpGeneral').bind('mouseenter', function() {
		$(this).css('overflow', 'auto');
	}).bind('mouseleave', function() {
		$(this).css('overflow', 'hidden');
	});

});

window.onbeforeunload = function() {
	return mayGo() ? undefined : lng("leavePageMes");
}
