



















window.webadmin = new function(){	

	if(!hideFlag( 69)){
		device.hook(device.notify.PASSWD, function(flag){
			if(flag){
				rootCtrl.event("chpasswrq");
			}
		});
	}

	device.hook(device.notify.RESET, function(flag){
		if(flag){
			rootCtrl.event("needresetrq");
		}
	}).hook(device.notify.MODE, function(flag){
		if(!hideFlag( 112)){
			if(flag){
				rootCtrl.event("devicemoderq");
			}
		}
	}).hook(device.notify.PIN, function(flag, pinstatus){
	}).hook(device.notify.UPDATE, function(flag, autoupdate){
		if(!hideFlag( 14)){
			if(flag){
				rootCtrl.event("notifyAutoUpdate", autoupdate.version);
			}
		}
		else{
			rootCtrl.event("notifyAutoUpdate");
		}
	}).hook(device.notify.SMS, function(flag){
		if(!hideFlag( 137)){
			if(flag){
				rootCtrl.event("notifySMS");
			}
		}
	}).hook(device.notify.SAVE, function(flag){
		if(flag){
			rootCtrl.event("notifySave");
		}
	}).hook(device.notify.REBOOT, function(flag){
		if(flag){
			rootCtrl.event("notifySaveReboot");
		}
	}).hook(device.notify.AUTH, function(flag){
		if(!flag){
			rootCtrl.event("logoutrq");
		}
	}).hook(device.notify.MOUNT, function(flag, usb_storage){
	})
}();
