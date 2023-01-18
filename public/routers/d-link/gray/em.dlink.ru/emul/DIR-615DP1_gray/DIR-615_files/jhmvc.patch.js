document.validateTemp = {'anim': 0, 'elem': null};

function isInputIntoView(elem) {
	var $obj;
	if(elem.jquery){
		$obj = elem;
	}
	else{
		$obj = $(elem);
	}
	return ($obj.position().top > 40 && $obj.position().top < $('#pageGeneral').height());
}

function scrollToVisible(elem) {
	if (!$('#pageGeneral').is(':visible') || !$(elem).is(':visible')) return false;
	if (document.validateTemp.anim == 0) {
		$('#pageGeneral').animate({
			'scrollTop': $(elem).position().top
		}, 1200);
	} else {
		document.validateTemp.elem = elem;
	}
}

function jsEditClientViewPatch(ctrl, viewInx, options){
	jsEditClientViewPatch.superclass.constructor.call(this, ctrl, viewInx, options);
	
	jsEditClientViewPatch.prototype.drawView = function() {
		jsEditClientViewPatch.superclass.drawView.call(this);
		$(this.viewBoxSel).bind('focusin', function(){
			$(this).addClass('focus');
		}).bind('focusout', function(){
			$(this).removeClass('focus');
		});
	}

	jsEditClientViewPatch.prototype.setError = function(statusCode){
		
		var child = this.getChild(0);
		statusCode = statusCode?statusCode:(child.statusCode?child.statusCode:this.statusCode);
		
		$(this.errorSel).hide();
		if(statusCode){
			if ($(this.inputSel).is(':hidden')) {
				if (this.getParent() instanceof jsFieldSetClientView) {
					if (this.getParent().options && this.getParent().options.collapsed) {
						this.getParent().toggleSlider(0);
					}
				}
			}
			$(this.errorSel).html(lng(statusCode));
			var errorSel = this.errorSel;
			if (!no(this.inputSel)){
				$(this.inputSel).addClass('validate');
				if (isInputIntoView(this.inputSel)) {
					$(this.inputSel).parent().css('height', $(this.inputSel).parent().height());
					/* Закоментил т.к. поля в air-monitoring > WAN при валидации "прыгали" в верх.
					$(this.inputSel).css({
						'left': $(this.inputSel).position().left,
						'top':  $(this.inputSel).position().top,
						'position': 'absolute'
					});
					*/
					document.validateTemp.anim++;
					$(this.inputSel).effect("bounce", { times:3, direction:'left', distance:8 }, 300, function(){
						$(this).css({
							'left': '',
							'top': '',
							'position': 'static'
						});
						$(errorSel).fadeIn('slow');
						document.validateTemp.anim--;
						scrollToVisible(document.validateTemp.elem);
					});
				} else {
					$(this.errorSel).fadeIn('slow');
					scrollToVisible(this.errorSel);
				}
			} else {
				$(this.errorSel).fadeIn('slow');
				scrollToVisible(this.errorSel);
			}
			this.ctrl.event("errstat", null, true);
		}
		else{
			$(this.errorSel).fadeOut('fast');
			if (!no(this.inputSel)) $(this.inputSel).removeClass('validate');
		}
		return false;
	}

}
extend(jsEditClientViewPatch, jsEditClientView);
extend(jsInputSlotView, jsEditClientViewPatch);
extend(jsSubNetAddrSlotView, jsEditClientViewPatch);

//---------------------------------------------------------------------------------

function nodeInputPatch(name, val, options){
	nodeInputPatch.superclass.constructor.apply(this, arguments);

	this.options = options?options:{};

	this.bindEvents = function(){
			this.pluginInput.bind("unfocus.input enter.input tab.input", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.emit("fieldchange", this.pluginInput.fieldval());
				event.stopPropagation();
				return true;
			}));
			this.pluginInput.bind("error.input", context(this).callback(function(event, errorCode){
				if(!isInputIntoView(this.$box)){
					scrollToVisible(this.$box);
				}
				this.pluginEdit.setError(errorCode);
			}));
			this.pluginInput.bind("onfocus.input", context(this).callback(function(event){
				this.pluginEdit.cleanError();
			}));
			return this;
	}
	
	this.updateModel = function(status){


		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")){
			return;
		}

		var errorCode;
		if(this.options.mandatory){
			errorCode = this.pluginInput.isEmpty()?"fieldEmpty":null;
		}
		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			if(!isInputIntoView(this.$box)){
				scrollToVisible(this.$box);
			}
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}
		else{
			this.value = this.val();
		}
		return this;
	}
}
extend(nodeInputPatch, nodeInput);

extend(nodeip, nodeInputPatch);
extend(nodemac, nodeInputPatch);
extend(nodeDomainName, nodeInputPatch);
extend(nodetext, nodeInputPatch);
extend(nodenum, nodeInputPatch);

function nodeComboGridPatch(name, value, options){
	nodeComboGridPatch.superclass.constructor.apply(this, arguments);

	this.bindEvents = function(){
		if(is.string(this.options.blank)){
			this.pluginCombo.bind("unfocus.input enter.input tab.input", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));
			this.pluginCombo.bind("rowclick.grid", context(this).callback(function(event, $row){
				this.pluginEdit.cleanError();
				this.emit("ruleselect", $row);
				event.stopPropagation();
				return true;
			}));
		}
		else{
			this.pluginCombo.bind("unfocus.input enter.input tab.input rowclick.grid", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));
		}
		this.pluginCombo.bind("error.input", context(this).callback(function(event, errorCode){
			if(!isInputIntoView(this.$box)){
				scrollToVisible(this.$box);
			}
			this.pluginEdit.setError(errorCode);
		}));
		this.pluginCombo.bind("onfocus.input", context(this).callback(function(event){
			this.pluginEdit.cleanError();
		}));
		return this;
	}

	this.updateModel = function(status){

		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")) return;

		var errorCode;
		if(this.options.mandatory){
			errorCode = this.pluginCombo.isEmpty()?"fieldEmpty":null;
		}
		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			if(!isInputIntoView(this.$box)){
				scrollToVisible(this.$box);
			}
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}
		else{
			this.value = this.val();
		}
		return this;
	}
}
extend(nodeComboGridPatch, nodeComboGrid);

extend(nodeComboIP, nodeComboGridPatch);
extend(nodeComboMAC, nodeComboGridPatch);
extend(nodeComboHost, nodeComboGridPatch);
extend(nodeComboText, nodeComboGridPatch);
