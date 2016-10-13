		//init page
		function page_init(){
			$('div#wrap').focus();
			
			load_multi_lang_data();
			
			var html = '';
			html += '<img alt="" src="img/entrylevel-frontcut.png" />';
			$('div#leftContent').html(html);
			
			html = '';
			html += '<div class="row">';
			html += '<div class="left Speech_Bubbles">';
			html += '<span id="lang809016">'+getHTMLString(809016)+'</span>';
			html += '</div>';
			html += '</div>';
			
			html += '<div class="row pl_35">';
			html += '<div class="login_box">';
			html += '<div class="login_text">ID</div><input type="text" class="input-example" value="Username" onblur="javascript:tglInput($(this), \'Username\');" onfocus="javascript:tglInput($(this), \'Username\');" tabindex="1">';
			html += '</div>';
			html += '<div class="login_box">';
			html += '<div class="login_text">PW</div><input type="password" class="input-example" value="Password" onblur="javascript:tglInput($(this), \'Password\');" onfocus="javascript:tglInput($(this), \'Password\');" tabindex="2">';
			html += '</div>';
            html += '</div>';
			
			html += '<div class="row pl_65">';
			html += '<div class="left pr_5">';
			html += '<input type="button" class="button button-apply button-apply-wide" id="start" value="'+getHTMLString(809005)+'" tabindex="3"/>';
			html += '</div>';
			html += '</div>';
			$('div#rightContent').html(html);
			
			$('#start').click(function(){
				var tmp_disabled = $(this).attr('disabled');
				if(tmp_disabled != true){
					var user_name = encodeURIComponent($('input.input-example[type="text"]').val());
					var hash1_pass = hex_hmac_sha256('$1$SERCOMM$', unescape(encodeURIComponent($('input.input-example[type="password"]').val())));
					var user_password = hex_hmac_sha256(sys_encryption_key, hash1_pass);
					var data_format = [
						{nameObj : remoteAccessLoginName, value : user_name},
						{nameObj : new Scalar("remoteAccessSEK","remoteAccessSEK"), value : sys_encryption_key},
						{nameObj : remoteAccessLoginPassword, value : user_password},
					];
                    setCookie("login_uid", Math.random(), 1);
					dataBatchSend(data_format, remoteAccessLoginPasswordRet, "remote_access");
				}
				
				function remoteAccessLoginPasswordRet(data, textStatus, jqXHR){
					$('div#message').remove();
					
					var status = data.slice(0,3);
					if((status == '"1"') || (status == '1')){
						window.location.href = "overview.html";
					}else if(status == '"2"'){
						var html = '';
						html += '<div id="message">';
						html += '<div class="buttonsDivider"></div>';
						html += '<div class="row"></div>';
						html += '<div class="message message-info"><span id="lang809017">'+getHTMLString(809017)+'</span></div>'; //A user is logged into the device.
						html += '</div>';
						
						var row_length = $('div#rightContent .row').length;
						$('div#rightContent .row').each(function(key, val){
							if(key == (row_length-1)) $(this).after(html);
						});
					}else if(status == '"3"'){
						var html = '';
						html += '<div id="message">';
						html += '<div class="buttonsDivider"></div>';
						html += '<div class="row"></div>';
						html += '<div class="message message-error"><span id="lang700096">'+getHTMLString(700096)+'</span></div>'; //Incorrect password. Please try again.
						html += '</div>';
						
						var row_length = $('div#rightContent .row').length;
						$('div#rightContent .row').each(function(key, val){
							if(key == (row_length-1)) $(this).after(html);
						});
					}else if(status == '"4"'){
						var html = '';
						html += '<div id="message">';
						html += '<div class="buttonsDivider"></div>';
						html += '<div class="row"></div>';
						html += '<div class="message message-error"><span id="lang700228">'+getHTMLString(700228)+'</span></div>'; //Incorrect username. Please try again.
						html += '</div>';
						
						var row_length = $('div#rightContent .row').length;
						$('div#rightContent .row').each(function(key, val){
							if(key == (row_length-1)) $(this).after(html);
						});
					
					}else if(status == '"5"' || (status == '5')){
						$.ajax({  
							type : 'get',
							dataType: "json",
							url : './data/user_lang.json?_=' + new Date().getTime(),
							async : false,
							success : function(data){
								sys_delay_time = getUserData('delay_time', data);
								sys_encryption_key = getUserData('encryption_key', data);
								processDelayTime();
							}
						});							
					
					}else{
						var html = '';
						html += '<div id="message">';
						html += '<div class="buttonsDivider"></div>';
						html += '<div class="row"></div>';
						html += '<div class="message message-error"><span id="lang802036">'+getHTMLString(802036)+'</span></div>'; //The passwords you entered do not match.
						html += '</div>';
						
						var row_length = $('div#rightContent .row').length;
						$('div#rightContent .row').each(function(key, val){
							if(key == (row_length-1)) $(this).after(html);
						});
					}
				}
			});
			
			html = '';
			html += '<a href="javascript:not_login_lang_change(\'en\');" class="language-links line">English</a>';
			html += '<a href="javascript:not_login_lang_change(\'ru\');" class="language-links">Русский</a>';
			$('div#langSelector').html(html);
			
			//browser support
			if(!isBrowserDetectSupport()){
				window.parent.location = 'nbrow.html';
				/*
				var html = '';
				html += '<p class="title" style="text-align: left;"><span id="lang809014">'+getHTMLString(809014)+'</span></p>';
				html += '<div class="right">';
				html += '<input class="button button-apply" value="'+getHTMLString(700039)+'" type="button" onclick="popupClose();">';
				html += '</div>';
				
				document.getElementById('popup').innerHTML = html;
				document.getElementById('popup').style.display="";
				document.getElementById('blackBackground').style.display="";
				
				$('#start, .forgotten-password').attr('disabled',true);
				*/
			}
			
			var laenge = $('h1:not(.not) span').text().length;
			
			if (laenge >= 27) {
				$('h1').addClass('twoLines');
			};
			
			$('.popup .button-cancel').click(function () {
				$(".popup, .blackBackground").fadeOut();
			});
			$('.checkbox').click(function () {
				$(this).toggleClass('checkbox-checked checkbox-unchecked');
			});
			
		  $(document).keydown(function(event){   
		   if(event.keyCode==13){
		   	$('#start').trigger('click');
		   }
		   if(event.keyCode==9){ //tab key
		   	
		   }
		  });
		  
			transHTMLString();
			
			setTimeout(function(){window.document.body.focus();}, 200);
			processDelayTime();
		}
			
		function processDelayTime(){
				if(logMessage && window.console) console.log("processDelayTime(): " + sys_delay_time + " " + sys_lang_code);
				if (sys_delay_time > 0){
					if(logMessage && window.console) console.log("delay " + sys_delay_time);
					
					$('#start').attr('disabled', 'disabled');

					//set image
					var t2 =new Image();
					t2.src = "img/icon-thinking.gif";
					t2.id = "progress-bar-thinking-icon";
					//
					$('body, html').animate({ scrollTop: '0px' });
		
					$('.popup').html(page_login_delay_time_HTMLstr());
					document.getElementById("progress-bar-thinking-box").appendChild(t2);

					$('.popup, .blackBackground').fadeIn();

					setTimeout(
						function(){
								if(logMessage && window.console) console.log("delay end");
							  $('.popup, .blackBackground').fadeOut();
								$('#start').removeAttr('disabled');
						}
						,	sys_delay_time * 1000
						);
				}
		}

		function page_login_delay_time_HTMLstr(){
			var html = '';
			html += '<p class="title"><span id="lang700119">'+getHTMLString(700119)+'</span></p>'; //Diagnosis in Progress
			html += '<div class="row">';
			html += '<div id="progress-bar-thinking-box">';
			//html += '<img id="progress-bar-thinking-icon" src="img/icon-thinking.gif">';
			html += '</div>';
			html += '</div>';
	
			return html;
		}	
		
		function popupClose(){
			document.getElementById('popup').style.display="none";
			document.getElementById('blackBackground').style.display="none";
		}
		//init page end
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
		
		$(document).ready(function(){
			if(!isBrowserDetectSupport()){ top.location.href = "nbrow.html"; }
			
			$.ajax({  
				type : 'get',
				dataType: "json",
				url : './data/user_lang.json?_=' + new Date().getTime(),
				async : false,
				success : function(data){
					//Invalid filter
					data = filterInvalidString(data);
					
					usermode = getUserData('usermode', data);
					sys_phone_service = getUserData('phone_service', data);
					sys_username = getUserData('username', data);
					sys_dropDownBasExp = getUserData('dropDownBasExp', data);
					sys_pageid = getUserData('pageid', data);
					sys_lang_code = getUserData('lang_code', data);
					sys_delay_time = getUserData('delay_time', data);
					sys_encryption_key = getUserData('encryption_key', data);

					
					if(sys_lang_code == ''){
						if(usermode == 'admin'){
							sys_lang_code = 'en';
						}else{
							sys_lang_code = 'ru';
						}
					}
					
					page_init();
				}
			});
		});
