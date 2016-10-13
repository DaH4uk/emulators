
/* get url parameters */
function getHashVars()
{
    var vars = [], hash;
    if(self.document.location.hash.length == 0)
    {
        if(self.document.location.href.indexOf('#') >= 0)
            self.document.location.hash = self.document.location.href.indexOf('#');
        else
            self.document.location.hash = "#" + self.document.location.href.slice(self.document.location.href.indexOf('%23') + 3);
    }

    if(self.document.location.hash.indexOf('#') >= 0)
    {
        var hashes = self.document.location.hash.slice(self.document.location.hash.indexOf('#') + 1).split('&');
    }
    else
    {
        var hashes = self.document.location.hash.slice(self.document.location.hash.indexOf('%23') + 3).split('&');
    }
    /////////////console.log(hashes);
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function getUrlVarsString() {
	var tmp = window.location.href.split('?');
	if (tmp.length > 1) {
		tmp = tmp[1];
		tmp = tmp.split('#');
		tmp = tmp[0];
	}
	return tmp;
}
/* get url parameters */

function hideSubSubMenu () {
	$('.subMenu').animate({ height: '0px' }, function () {
		//$(this).animate({ width: 'hide' });
		$(this).css('border-bottom', '');
	});
}

/*###################################
	SHOW AND HIDE POPUP
###################################*/
function showPopUp () {
	$('.popup, .blackBackground').fadeIn();
}
function hidePopUp () {
	$('.popup, .blackBackground').fadeOut();
}


/*###################################
	HELP AND RESET
###################################*/
function hideBsr () {
	$('#helpB').css('display', 'none');
	$('#resetB').css('display', 'none');
	/*if ($('#indicator').position().top < '100') {
		$('#indicator').css('left', '207px');
	}*/
}
function showBs () {
	$('#helpB').css('display', '');
	$('#resetB').css('display', '');
	//$('#indicator').css('left', '208px');
}
function addFadeOutClassToSubMenu (e) {
	if(chkUserDataModification()) return false;
	
	if (!e.parent().hasClass('active'))
		$('#navigation').addClass('fadeOut');
		
	var id = e.parent().attr('id');
	var ul = $('nav > ul');
	ul.removeClass();
	
	//justin modify 20130718
	var nav_number = $('nav ul li').length;

	if(nav_number == '7'){
		ul.removeClass().addClass('clearfix seven ' + id + 'Menu');
	}else if(nav_number == '6'){
		ul.removeClass().addClass('clearfix six ' + id + 'Menu');
	}else if(nav_number == '5'){
		ul.removeClass().addClass('clearfix five ' + id + 'Menu');
	}else if(nav_number == '4'){
		ul.removeClass().addClass('clearfix four ' + id + 'Menu');
	}
	/*
	if (messagesCat) {
		ul.addClass('clearfix seven ' + id + 'Menu');
	} else {
		ul.addClass('clearfix ' + id + 'Menu');
	}
	*/
	//justin modify 20130718 end
	
}


/*
 * function for textfields
 * to have a placeholder
 * which is only visible if
 * textfield is "empty"
 */
function tglInput (obj, value) {
	if (obj.hasClass('active')) {
		if (obj.val() == '') {
			obj.val(value);
			obj.toggleClass('active');
		}
	} else {
		if (obj.val() == value) {
			obj.val('');
			obj.toggleClass('active');
		}
	}
}


$(function () {
	
	$('#navigation').fadeIn();
	
	/*###################################
		HELP AND RESET
	###################################*/
	$('#resetB').live('click', function () {
		$('#r').css('display', '');
		$('#h').css('display', 'none');
		$('#helpBar').animate({ height: 'show' }, 200);
		hideBsr();
		$('.helpButtons').fadeOut();
	});
	$('#resetR').live('click', function () {
		$('#helpBar').animate({ height: 'hide' }, 200, function () {
			$('.helpButtons').fadeIn();
		});
		showBs();
	});
	$('#cancelR').live('click', function () {
		$('#helpBar').animate({ height: 'hide' }, 200, function () {
			$('.helpButtons').fadeIn();
		});
		showBs();
	});
	$('#closeH').live('click', function () {
		$('#helpBar').animate({ height: 'hide' }, 300, function () {
			$('.helpButtons').fadeIn();
		});
		showBs();
	});
	
	
	/*###################################
		SWITCH GENERAL
	###################################*/
	
	
	
	
	
	
	$(window).hashchange(function () {
		if(chkUserDataModification()) return false;
		
		// get submenu and subsubmenu
		gets	= getHashVars();
		sub		= gets['sub'];
		subSub	= gets['subSub'];
		load	= ''; // content to load
		
		// change the href of the language links
		//justin modify
		/*
		$('.language-links').each(function () {
			var e = $(this);
			e.attr('href', e.attr('href').split('#')[0] + '#sub=' + sub)
		});
		*/
		//justin modify end
		//add the new link to the basic / expert switcher
		//var basic = $('.selectBasic').attr('href').split("#");
		//var expert = $('.selectExpert').attr('href').split("#");
		if ($('.globalMessages').length > 0) {
			var globalMessages = $('.globalMessages').attr('href').split("#");
			$('.globalMessages').attr('href', globalMessages[0] + '#sub=' + sub);
		}
		//$('.selectBasic').attr('href', basic[0] + '#sub=' + defaultSub);
		
		//$('.selectExpert').attr('href', expert[0] + '#sub=' + sub);
		// if you try to access a submenu item
		if (sub != undefined) {
		
			// update content to load
			load = sub;
			
			// p is the position of the indicator
			var p = $('#' + sub).index();
			p = 27 + p*40;
				
			// if there is a subsubmenu item change indicator position
			if (subSub != undefined) {
				//justin add
				sys_pageid = "sub="+sub+"&subSub="+subSub;
				//justin add end
				// update content to load
				load = subSub;
				
				var subP = $('#' + subSub).index();
				p = p + ((1 + subP) * 40);
				
				
			}else{
				//justin add
				sys_pageid = "sub="+sub;
				//justin add end
			}
			
			var subMenuHeights = new Array('0px', '39px', '79px', '119px', '159px', '199px', '239px');
			
			if ($('#' + sub).children().hasClass('subMenu') && subSub == undefined) {
			
				if (oldCat != sub) {
					$('#' + oldCat + ' .subMenu').animate({ height: '0px' }, function () {
						$(this).animate({ width: 'hide' });
						$(this).removeClass('border');
					});
				}
			
				var subMenu = $('#'+ sub +' .subMenu');
				var subMenuItem = $('#'+ sub +' .subMenuItem');
				
				//subMenu.css('border-bottom','1px solid #bebebe'); //justin add IE8 issue 20130918.
				
				/*subMenu.animate({ width: 'show' }, function () {
					$(this).addClass('border subMenu' + subMenuItem.length);
					subMenu.animate({ height: subMenuHeights[subMenuItem.length] }, function(){
					});
				});*/
				
				//20140217 Thomas fix menu animate
				subMenu.show();
				subMenu.addClass('border subMenu' + subMenuItem.length);
				subMenu.animate({ height: subMenuHeights[subMenuItem.length] }, function(){
				});
				
				oldCat = sub;
			} else if (/*oldCat == 'value' && */subSub != undefined) {
				var subMenu = $('#' + sub + ' .subMenu');
				var subMenuItem = $('#'+ sub +' .subMenuItem');
				subMenu.show().addClass('border subMenu' + subMenuItem.length);
				subMenu.animate({ height: subMenuHeights[subMenuItem.length] });
			}
			
			// add pixels to the number
			p = p + "px";
			
			// selected menu item
			var next = $('#' + load);
			$('#navigation .active').removeClass('active');
			next.addClass('active');
			
			//20140217 Thomas fix for parent menu still active
			if(next.parents("li").hasClass("sub"))
				next.parents("li").addClass("active");
			
			// change window title
			//document.title = next.children('a').text();
			
			if (!next.hasClass('sub')) {
				$('.subMenu').animate('',function () {
					$(this).animate({ height: 'hide' });
					$(this).css('border-bottom', '');
				});
			}
			$('#content').removeClass().addClass('sub'+load);
			// load content
			//justin modify
			/*
			if (task_counter > 0) {
				var query = getUrlVarsString();
				var query_task = query.split("&");
				var new_query = '';
				for (var i = 0; i < query_task.length; i++) {
					if (query_task[i].substr(0, 4) != 'task') {
						new_query += query_task[i] + '&';
					}
				}
				new_query = new_query.substr(0, (new_query.length-1));
				window.location = 'index.php?'+new_query+'#sub='+load;
			} else {
				// check reset button
				$.ajax
				({
					type:	"GET",
					url:	'ajax.php?'+getUrlVarsString(),
					data:	{
						hasReset: true,
						sub: load
					},
					cache:	false
				})
				.done
				(
					function (data) {
						var response = parseInt(data);
						if (response == 1) {
							$('#helpButtonsShort').fadeIn();
						} else {
							$('#helpButtonsShort').fadeOut();
						}
					}
				);
				$('#content').load('ajax.php?'+getUrlVarsString()+'&sub='+load, function () {
					var l = $('#content .apply-cancel').not('.popup .apply-cancel').length;
					if (l == 0) {
						$('#content').addClass('no-apply-cancel');
					} else {
						$('#content').removeClass('no-apply-cancel');
					}
				});
			}
			if (task) {
				task_counter++;
			}
			*/
			//justin modify end
			// indicating arrow
			/*$('#indicator').css('left', '208px');
			if (p == '-13px') {
				$('#indicator').hide();
			} else {
				$('#indicator').show().animate({ top: p });
			}*/
		}
	});
	
	//var task_counter = 0;
	$(window).hashchange();
	
	
	
	
	
	
	
	

	
	$('nav a').bind('mousedown', function () {
		addFadeOutClassToSubMenu($(this));
	});
	$('#overview').click(function () {
		if(chkUserDataModification()) return false;
		
		//$('#indicator').fadeOut();
		$('#navigation').fadeOut();
		$('#content').fadeOut();
		$('#help').fadeOut();
		$('article').css('background', '#fff');
		$('#header .active').removeClass('active');
		$(this).addClass('active');
		
		$('article').delay(200).animate({ width: '958px' }, 800, 'easeInOutQuint', function () {
			window.location = $('#overview').find('a').attr('href');
		});
		return false;
	});
	
	
	/*
	 * #general
	 * checkboxes
	 */
	$('.checkbox-checked:not(.select-all, .not), .checkbox-unchecked:not(.select-all, .not)').live('click', function () {
		$(this).toggleClass('checkbox-checked checkbox-unchecked');
	});
	
	/*
	 * #general
	 * popup cancel
	 */
	$('.popup-cancel').live('click', function () {
		$('.popup, .blackBackground').fadeOut();
	});
	$(window).keyup(function (e) {
		if (e.keyCode == 27) {
			$('.popup, .blackBackground').fadeOut();
		}
	});
	/*
	 * #general
	 * on-off switch
	 * on-off action
	 */
	 $('.button-on:not(.disabled)').live('click', function () {
	 	var e = $(this);
 		if (!$(this).hasClass('no-action')) {
		 	var id = e.attr('id');
		 	var dir = 'hide';
		 	if (e.hasClass('reverse'))
		 		dir = 'show';
		 	$('.' + id).animate({ height: dir });
		}
	 	e.toggleClass('button-on button-off');
	 });
	 $('.button-off:not(.disabled)').live('click', function () {
	 	var e = $(this);
 		if (!$(this).hasClass('no-action')) {
		 	var id = e.attr('id');
		 	var dir = 'show';
		 	if (e.hasClass('reverse'))
		 		dir = 'hide';
		 	$('.' + id).animate({ height: dir });
		}
	 	e.toggleClass('button-on button-off');
	 });	
	 
	 
	 /*
	  * #general
	  * radioboxes
	  */
	  /*
	$('.ip').live('keydown', function (e) {
		return checkLength($(this), 3, e);
	});
	$('.ip').live('keyup', function () {
		return focusNext($(this), 3);
	});
	*/
	$('.radio-unchecked:not(.not)').live('click', function () {
		$('.radio-checked').removeClass('radio-checked').addClass('radio-unchecked');
		$(this).removeClass('radio-unchecked').addClass('radio-checked');
	});
		
		
		
		/*
		 * #general
		 * download a testfile
		 */
	$('input.downloadStuff').live('click', function () {
		window.location = 'test.zip';
	});
	
	
	/*
	 * #general
	 * 
	 */
	$('.sharing-table .button-delete').live('click', function () {
		$(this).closest('.row').fadeOut(function () {
			$(this).remove();
		});
	});
	
	
	
	/*
	 * #general
	 * password popup
	 */
	$('.change-pw').live('click', function () {
		var di = $(this).attr('data-id');
		$('body, html').animate({ scrollTop: '0px' });
		$('.password-popup' + di).fadeIn();
		$('.blackBackground').fadeIn();
	});
	$('.show-hide-pw').live('click', function () {
		var di = $(this).attr('data-id');
		if ($(this).hasClass('checkbox-unchecked')) {
			$('#pw' + di).show();
			$('#pwt' + di).hide();
		} else {
			$('#pw' + di).hide();
			$('#pwt' + di).show();
		}
	});
	
	//justin add 20130726
	$('nav li').each(function () {
		if($(this).hasClass('active')){
			$(this).click(function () {
				if(chkUserDataModification()) return false;
				
				var menuid = $(this).attr('id');
				window.parent.location = menuid+'.html'; //justin modify 20130828
				//page_data_load(menuid);
			});
		}else{
			$(this).click(function () {
				if(chkUserDataModification()) return false;
				
				return true;
			});
		}
	});
	//justin add end 20130726
});

/*
 * #general
 * add a class to the #content if the content doesn't contain any apply-cancel button
 */
 function countAndAdd() {
 	var l = $('#content .apply-cancel').not('.popup .apply-cancel').length;
 	if (l == 0) {
 		$('#content').addClass('no-apply-cancel');
 	} else {
 		$('#content').removeClass('no-apply-cancel');
 	}
 }
 
 
 
 
/*
 *
 * #general
 * password functions
 */
function checkAscii(str) {
	return str >= 32 && str < 127;
}
function isAscii(str) {
	if (str == undefined) {
		return false;
	}
	for (var i = 0; i < str.length; i++) {
		if (!checkAscii(str.charCodeAt(i))) {
			return false;
		}
	}
	return true;
}





/*
 * 
 *
 */
function checkLength(o, l, e) {
	if (e.keyCode != 8) {
		if (o.val().length >= l) {
			return false;
		}
	}
}
function focusNext(o, l) {
	if (o.val().length == l) {
		o.next().focus();
	}
}


//justin add
$('.max2').live('keyup', function (e) {
	var code = e.keyCode || e.which;
	
	if (code != '9') { //not tab key
		if($(this).val().length >= 2){
			$(this).val($(this).val().slice(0, 2));
			$(this).next().focus().select();
		}
	}
});

$('.max3').live('keyup', function (e) {
	var code = e.keyCode || e.which;
	
	if (code != '9') { //not tab key
		if($(this).val().length >= 3){
			$(this).val($(this).val().slice(0, 3));
			$(this).next().focus().select();
		}
	}
});

$('.max4').live('keyup', function (e) {
	var code = e.keyCode || e.which;
	
	if (code != '9') { //not tab key
		if($(this).val().length >= 4){
			$(this).val($(this).val().slice(0, 4));
			$(this).next().focus().select();
		}
	}
});

$('.max5').live('keyup', function (e) {
	var code = e.keyCode || e.which;
	
	if (code != '9') { //not tab key
		if($(this).val().length >= 5){
			$(this).val($(this).val().slice(0, 5));
			$(this).next().focus().select();
		}
	}
});
//add end

//hide indicator
$(function(){
$("#indicator").hide();
})