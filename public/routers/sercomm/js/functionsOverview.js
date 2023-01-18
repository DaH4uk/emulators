//$('#indicator').css('left', '224px');
function showNHide(e1, e2) {
	$(e1).hide();
	$(e2).show();
}



var x = 0;
function showIndicator () {
	//$('.whiteLayer').css('display', 'block');
	//$('#indicator').css('display', 'block');
	//$('#indicator').delay(940).animate({ left: '208px' }, 200);
}
function showMenuAnimated (linkElement, cat) {
	var list = $('.navigation-' + cat);
	list.css('display', '');
	var wT = 0;
	var l = $('.navigation-' + cat + ' > li').length;
	$('.navigation-' + cat + ' li').each(function () {
		wT += 100;
		var element = this;
		window.setTimeout(function () { doAnimation(element, l, linkElement); }, wT);
	});
}
function doAnimation (element, l, linkElement) {
	$(element).animate({ marginLeft: '0px', opacity: '1' }, 600, 'easeInOutQuart', function () {
		x++;
		if (x == l) {
			var link = linkElement.attr('href');
			window.location = link;
		}
	});
}




$(function () {
	
	$('#normalWifiClosed').live('click', function () {
		  $('#normalWifiList').animate({ height: 'show' });
		  showNHide("#normalWifiClosed", "#normalWifiExpanded");
	});
	$('#normalWifiExpanded, #normalWifiList').live('click', function () {
		  $('#normalWifiList').animate({ height: 'hide' });
		  showNHide("#normalWifiExpanded", "#normalWifiClosed");
	});
	
	
	$('#guestWifiClosed').live('click', function () {
		  $('#guestWifiList').animate({ height: 'show' });
		  showNHide("#guestWifiClosed", "#guestWifiExpanded");
	});
	$('#guestWifiExpanded, #guestWifiList').live('click', function () {
		  $('#guestWifiList').animate({ height: 'hide' });
		  showNHide("#guestWifiExpanded", "#guestWifiClosed");
	});
	//
	$('#header nav a').click(function () {
		//justin add 20130726
		if($(this).closest('li#overview').length){
			page_data_load("overview");
			return false;
		}
		//justin add end 20130726
		
		var ul = $('nav > ul');
		var element = $(this);
	
		$('#overviewContent').fadeOut();
	
		$('#header .active').removeClass('active');
		$(this).addClass('active');
		
		var cat = $(this).parent('li').attr('id');
		$('article, #langAndFirmware').animate({ width: '734px' }, 800, 'easeInOutQuint', function () {
			$('#navigation').show();
			$('#navigation li').css('opacity', '0');
		});
		showIndicator();
		$('#inner-wrap article#overview img').delay(100).fadeOut(300);
		
		var ul = $('nav > ul');
		ul.removeClass();
		
		//justin modify 20130718
		var nav_number = $('nav ul li').length;
		if(nav_number == '7'){
			ul.removeClass().addClass('clearfix seven ' + cat + 'Menu');
		}else if(nav_number == '6'){
			ul.removeClass().addClass('clearfix six ' + cat + 'Menu');
		}else if(nav_number == '5'){

			ul.removeClass().addClass('clearfix five ' + cat + 'Menu');
		}else if(nav_number == '4'){

			ul.removeClass().addClass('clearfix four ' + cat + 'Menu');
		}
		/*
		if (messagesCat) {
			ul.addClass('clearfix seven ' + cat + 'Menu');
		} else {
			ul.addClass('clearfix ' + cat + 'Menu');
		}
		*/
		//justin modify 20130718 end
		
		window.setTimeout(function () { showMenuAnimated(element, cat); }, 250);
		return false;
	});
});