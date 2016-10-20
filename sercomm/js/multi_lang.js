<<<<<<< HEAD
var multi_lang_array;

function getHTMLString(stringID){
	if(isNaN(stringID)) return;
	if(stringID == "") return;
	if(!(multi_lang_array instanceof Array)) return;
	
	// get the string length
	stringID = stringID.toString();
	var category_id;
	if(stringID.length == 6){
		// get the first char
		category_id = stringID.substring(0, 1);
	} else {
		// get the first two chars
		category_id = stringID.substring(0, 2);
	}
	
	if(multi_lang_array[category_id] == undefined){
		alert(stringID);
	}	
	
	if(multi_lang_array[category_id].length == 0){
		// it means the array is not loaded yet, load its data
		loadLangArray(category_id);
	}
	
	var lang_ary = multi_lang_array[category_id];
	var lang_code = sys_lang_code;
	if(lang_code == ''){
		if(usermode == 'admin') lang_code = 'en';
		else lang_code = 'ru';
	}
	
	for(var i=0; i<lang_ary.length; i++){
    	var line = lang_ary[i].toString();
    	var entries = line.split("|");
        var entry_id = entries[0];
        if(entry_id == stringID){
        	if(lang_code == "en"){ //English
        		return entries[1];
        	} else if(lang_code == "sp"){ //Spanish
        		return entries[2];
        	} else if(lang_code == "ru"){ //Russian
        		return entries[3];
        	} else {
        		// default language
        		return entries[1];
        	}
        }
    }
	return "not found";
}

function loadLangArray(category_id){
	var temp_array = new Array();
	var file_name = 'lang/Cat' + category_id + '.csv?_=' + new Date().getTime();
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", file_name, false);
	txtFile.send();
	
	if (txtFile.readyState === 4) {
  		if (txtFile.status === 200) {
  			allText = txtFile.responseText;
    	    lines = txtFile.responseText.split("\n");
    	    
    	    for(var j=0; j<lines.length; j++){
    	    	temp_array.push(lines[j]);
    	    }	    	        	
    	} 
  	}
	
	multi_lang_array[category_id] = temp_array;
}

function transHTMLString(){
	var i = 0;
	var elements = $("span, a, input");
	elements.each(function() {
		var element = $(this);
		var title = element.attr('title');
		if(title != undefined){
			var val_in = getHTMLString(title);
			var val = element.attr('value');
			if(val != undefined){
				element.attr('value', val_in);
			}else{
				element.html(val_in);
			}
			
			//element.attr('title', val_in);
			element.removeAttr('title');
		}
		i++;
	});
}

function load_multi_lang_data(){
	multi_lang_array = new Array();
	for(var i=0; i<14; i++){
		var cat_ary = new Array();
		multi_lang_array.push(cat_ary);
	}
}

function lang_change(str){
	setUserData('lang_code', str);
}

function not_login_lang_change(str){
	setUserLang('lang_code', str);
}
=======
var multi_lang_array;

function getHTMLString(stringID){
	if(isNaN(stringID)) return;
	if(stringID == "") return;
	if(!(multi_lang_array instanceof Array)) return;
	
	// get the string length
	stringID = stringID.toString();
	var category_id;
	if(stringID.length == 6){
		// get the first char
		category_id = stringID.substring(0, 1);
	} else {
		// get the first two chars
		category_id = stringID.substring(0, 2);
	}
	
	if(multi_lang_array[category_id] == undefined){
		alert(stringID);
	}	
	
	if(multi_lang_array[category_id].length == 0){
		// it means the array is not loaded yet, load its data
		loadLangArray(category_id);
	}
	
	var lang_ary = multi_lang_array[category_id];
	var lang_code = sys_lang_code;
	if(lang_code == ''){
		if(usermode == 'admin') lang_code = 'en';
		else lang_code = 'ru';
	}
	
	for(var i=0; i<lang_ary.length; i++){
    	var line = lang_ary[i].toString();
    	var entries = line.split("|");
        var entry_id = entries[0];
        if(entry_id == stringID){
        	if(lang_code == "en"){ //English
        		return entries[1];
        	} else if(lang_code == "sp"){ //Spanish
        		return entries[2];
        	} else if(lang_code == "ru"){ //Russian
        		return entries[3];
        	} else {
        		// default language
        		return entries[1];
        	}
        }
    }
	return "not found";
}

function loadLangArray(category_id){
	var temp_array = new Array();
	var file_name = 'lang/Cat' + category_id + '.csv?_=' + new Date().getTime();
	var txtFile = new XMLHttpRequest();
	txtFile.open("GET", file_name, false);
	txtFile.send();
	
	if (txtFile.readyState === 4) {
  		if (txtFile.status === 200) {
  			allText = txtFile.responseText;
    	    lines = txtFile.responseText.split("\n");
    	    
    	    for(var j=0; j<lines.length; j++){
    	    	temp_array.push(lines[j]);
    	    }	    	        	
    	} 
  	}
	
	multi_lang_array[category_id] = temp_array;
}

function transHTMLString(){
	var i = 0;
	var elements = $("span, a, input");
	elements.each(function() {
		var element = $(this);
		var title = element.attr('title');
		if(title != undefined){
			var val_in = getHTMLString(title);
			var val = element.attr('value');
			if(val != undefined){
				element.attr('value', val_in);
			}else{
				element.html(val_in);
			}
			
			//element.attr('title', val_in);
			element.removeAttr('title');
		}
		i++;
	});
}

function load_multi_lang_data(){
	multi_lang_array = new Array();
	for(var i=0; i<14; i++){
		var cat_ary = new Array();
		multi_lang_array.push(cat_ary);
	}
}

function lang_change(str){
	setUserData('lang_code', str);
}

function not_login_lang_change(str){
	setUserLang('lang_code', str);
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
