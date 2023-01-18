


















function onHashChanged (objEvent, newHash) {
	if (newHash == undefined) {
		newHash = window.location.hash;
	}
	newHash = newHash.substring(1, newHash.length);
	
	if(newHash == getCookie("url_hash")) return;
	
	var curMenuPath = '';
	if (window.rootCtrl.curMenuCtrl) {
		curMenuPath = window.rootCtrl.curMenuCtrl.path;
	}

	if (newHash != curMenuPath) {
		if (newHash == curMenuPath.substring(0, curMenuPath.lastIndexOf("/")) && window.rootCtrl.curMenuCtrl.thisInx == 0) {
		} else {
			window.activateMenuFromPath(newHash);
		}
	}
}

(function($) {
		if ("onhashchange" in window) {
			window.onhashchange = onHashChanged;
		} else {
			var strHash = window.location.hash;
			setInterval(function() {
					if (strHash != window.location.hash) {
						strHash = window.location.hash;
						$(window.location).trigger("change", strHash);
					}
				}, 100);
			$(window.location).bind("change", onHashChanged);
		}
	}
)(jQuery);
