



















function jsWizardsController(){
	jsWizardsController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsWizardsClientView, def: true};
	var wzIndex = 0;
        
	if(!hideFlag( 1) && !disableFlag( 1) && !modeAP()){
		if(!document.menuDefinitionsWZ[wzIndex].hide){
			this.addChild(new jsWidgetController(document.menuDefinitionsWZ[wzIndex]));
		}
	    wzIndex++;
	}
	if(!hideFlag( 35) || !hideFlag("wifi.mbssid_all.AuthMode")){
		if(!document.menuDefinitionsWZ[wzIndex].hide){
	        try{
	            var key = window.access_rights.__rpc_index[ 35];
	            var value = window.access_rights[key].Radio;
	        }catch(e){
	            var value = 6;
	        }  
	        if (!(is.set(value) && value!=6 && document.menuDefinitionsWZ[wzIndex].name == 'menu_wifi')){                
	           this.addChild(new jsWidgetController(document.menuDefinitionsWZ[wzIndex]));
	        }  	
		}
	    wzIndex++;
	}
	if(!hideFlag( 10) && !modeAP()){
		this.addChild(new jsWidgetController(document.menuDefinitionsWZ[wzIndex++]));
	}
	if(!hideFlag( 119) && !modeAP()){
		this.addChild(new jsWidgetController(document.menuDefinitionsWZ[wzIndex++]));
	}
}
extend(jsWizardsController, jsController);



function jsWizardsClientView(ctrl, viewInx, options){
	jsWizardsClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	jsWizardsClientView.prototype.drawView = function(){
		var child;
		var childCtrls = this.ctrl.children;
		
		$(this.viewBoxSel).html('');
		for (var i = 0; i < childCtrls.length; i++) {
			$(this.viewBoxSel).append('<div></div>');
			
			child = this.getChild(i);
			child.viewBoxSel = this.viewBoxSel + '>div:eq(' + i + ')';
			child.options.viewBoxSel = child.viewBoxSel;		
		}
		
		jsWizardsClientView.superclass.drawView.call(this);
		
		var speed = 700;
		if ($.browser.mozilla) speed = 0;
		$(this.viewBoxSel).find('.widget').show(speed, function(){
			setScrollbarSize(); /* from workbench.ui.js */
		});
	}
	
}
extend(jsWizardsClientView, jsCSideView);
