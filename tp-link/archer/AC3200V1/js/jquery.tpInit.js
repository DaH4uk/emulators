<<<<<<< HEAD
(function($) {
	// Calling the initiation function. Be careful the order.
    $.tpInit = function(callback) { 
        $("input[type='checkbox']").tpCheckbox();
        $("input[type='radio']").tpRadio();
        $("div.button-group-container").tpBtnGroup();
    	if (callback !== undefined) {
        callback();
    	}
        $('select').tpSelect();
        $("input[type='checkbox']").tpCheckbox();
        $("input[type='radio']").tpRadio();	
        $("div.button-group-container").tpBtnGroup();	
        $("div.file-container").tpFile();
        $("span.advanced-icon").off('.tpAdvIcon');
        $("span.advanced-icon").siblings("span").off('.tpAdvIcon');
        $("span.advanced-icon").on('click.tpAdvIcon', function(e) {
	    	if ($(this).hasClass("advanced-hide-icon")) {
	    		$(this).removeClass("advanced-hide-icon").addClass("advanced-show-icon");
            } else {
	    		$(this).removeClass("advanced-show-icon").addClass("advanced-hide-icon");
	    	}
	    });
        $("span.advanced-icon").siblings("span").on("click.tpAdvIcon", function(){ 
           $(this).prev("span.advanced-icon").trigger("click");
        });
        $("[id$='_tips']").click(function(e) {
            e.stopPropagation();
            $(this).hide('fast');
            return false;
        });
    }

})(jQuery);
=======
(function($) {
	// Calling the initiation function. Be careful the order.
    $.tpInit = function(callback) { 
        $("input[type='checkbox']").tpCheckbox();
        $("input[type='radio']").tpRadio();
        $("div.button-group-container").tpBtnGroup();
    	if (callback !== undefined) {
        callback();
    	}
        $('select').tpSelect();
        $("input[type='checkbox']").tpCheckbox();
        $("input[type='radio']").tpRadio();	
        $("div.button-group-container").tpBtnGroup();	
        $("div.file-container").tpFile();
        $("span.advanced-icon").off('.tpAdvIcon');
        $("span.advanced-icon").siblings("span").off('.tpAdvIcon');
        $("span.advanced-icon").on('click.tpAdvIcon', function(e) {
	    	if ($(this).hasClass("advanced-hide-icon")) {
	    		$(this).removeClass("advanced-hide-icon").addClass("advanced-show-icon");
            } else {
	    		$(this).removeClass("advanced-show-icon").addClass("advanced-hide-icon");
	    	}
	    });
        $("span.advanced-icon").siblings("span").on("click.tpAdvIcon", function(){ 
           $(this).prev("span.advanced-icon").trigger("click");
        });
        $("[id$='_tips']").click(function(e) {
            e.stopPropagation();
            $(this).hide('fast');
            return false;
        });
    }

})(jQuery);
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
