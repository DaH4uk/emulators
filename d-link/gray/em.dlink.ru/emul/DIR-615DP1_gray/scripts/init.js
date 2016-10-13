
window.INIT_SCRIPT = true;	// For core

// IE Fix
if (!Object.keys) {
	Object.keys = function (obj){
		var keys = new Array();
		for (var key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)){
				keys.push(key);
			}
		}
		return keys;
	};
}



var is = function( type, obj ) {
	return Object.prototype.toString.call( obj ) === "[object "+ type +"]";
}
is.set = function(obj){
	return (obj != undefined && obj != null);
}
is.unset = function(obj){
	return !this.set(obj);
}
is['string'] = function(obj){
	return (typeof obj == 'string' || obj instanceof String);
}
is.number = function(obj){
	return (typeof obj == 'number' || obj instanceof Number);
}
is.bool = function(obj){
	return (typeof obj == 'boolean' || obj instanceof Boolean);
}
is.object = function(obj){
	return (typeof obj == 'object');
}
is.array = function(obj){
	return (obj instanceof Array);
}
is.func = function(obj){
	return (obj instanceof Function);
}
is.empty = function(obj){
	return this.set(obj) && Object.keys(obj).length === 0;
}
is.equal = function(obj1, obj2){
	return !(obj1 < obj2 || obj2 < obj1);
}
is.jquery = function(obj){
	return (obj instanceof jQuery);
}
is.IPv4 = function(obj){
	var re = new RegExp('^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$');
	return re.test(obj);
}
is.IPv6 = function(obj){
	var re = new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/);
	return re.test(obj);
}
is.domain = function(obj) {
	var host = obj;
	if(host.length){
		host = host.replace(/(^\s+|\s+$)/g,''); // удаляем пробелы в начале и в конце

		var dot = host.lastIndexOf("."); 
		var dname = host.substring(0,dot);
		var ext = host.substring(dot+1,host.length); //после последней точки

		if(((ext.length-1) < 1) || ((ext.length) > 6)) {
			return false;
		}
		//host = host.replace(/(^\s+|\s+$)/g,''); // удаляем пробелы в начале и в конце
		if ((dot < 2) || (dot > 63)) { // доменное имя от 2 до 63 символов
			return false;
		}
		var ln = dname.length-1
		if ((dname[0] =='-' || dname[ln]=='-')) { //не содержит "-" в начале и в конце
			return false;
		}
		var labels = dname.split("."); 
		var pat = /^[\wа-яА-Я-]+$/;
		for(var j=0; j<labels.length; j++) {
			if (!pat.test(labels[j])) {
				return false;
			}
		}
		var pat_ext = /^[\wа-яА-Я][^0-9-]+$/; // после последней точки только буквы
		if (!pat_ext.test(ext)) {
			return false;
		}
	}
	return true;
}
is.cross = function(obj1, obj2){		// Нужно улучшить геометрию
	obj1 = $(obj1);
	obj2 = $(obj2);
	return (obj1.is(':visible') &&
			obj2.is(':visible') &&
			obj1.offset().left > obj2.offset().left &&
			obj1.offset().top > obj2.offset().top &&
			obj1.offset().left < obj2.offset().left + obj2.width() &&
			obj1.offset().top < obj2.offset().top+ obj2.height());
}

is.port = function(val){
	var patt = /^[0-9]*$/;;
	val = val.match(/\S+/)[0];
	if(!patt.test(val)) return false;
	var num  = new Number(val);
	if(num < 1) return false;
	if(num > 65535) return false;
	return true;
}

is.mac = function(mac) {
	var re = /^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/;
	return re.test(mac);
}

/*
Array.prototype.indexOf = function(obj, from){
	if (!is.number(from)) {
		from = 0;
	}
	if (from < 0) from += this.length;
		for (; from < this.length; from++) {
		if (from in this && this[from] === obj) return from;
	}
	return -1;
}
*/
function indexOf(arr, obj, from){
	if (!is.number(from)) {
		from = 0;
	}
	if (from < 0) from += arr.length;
	for (; from < arr.length; from++) {
		if (from in arr && arr[from] === obj) return from;
	}
	return -1;
}



function debug(){
	if (window.console && console.log && console.log.apply) {
		console.log.apply(console, arguments);
	}
}



String.prototype.capitalize = function() {
	return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}



function context(__context){
	var co = {
		callback: function(method){
			var cb = function(){
				return method.apply(__context, arguments);
			}
			return method?cb:null;
		}
	};
	return co;
}



// Если переданы пользовательские аргументы, то они заменяют системные
function callback(context, callback){
	var argv = Array.prototype.slice.call(arguments, 2);
	var cb = function(){
        return callback.apply(context, (argv.length)?argv:arguments);
    }
    return callback?cb:null;
}



// Объединяет пользовательские и системные аргументы
function callbackEx(context, callback){
	var argv = Array.prototype.slice.call(arguments, 2);
	var cb = function(){
        return callback.apply(context, Array.prototype.slice.call(arguments).concat(argv));
    }
    return callback?cb:null;
}


function extend(child, parent){
	var F = function(){};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.superclass = parent.prototype;
	child.prototype.getAncestry = function(){
		var arr = child.superclass.getAncestry();
		arr.push(child);
		return arr;
	}
	if(!parent.superclass) parent.prototype.getAncestry = function(){return [parent];}
}



function copy(obj){
	if (is.array(obj)) {
		return $.extend(true, [], obj);
	} else {
		return $.extend(true, {}, obj);
	}
}



function diff(__old, __new){
	var __diff = copy(__new);
	for (var attr in __diff) {
		if (__old.hasOwnProperty(attr)) {
			if (typeof(__diff[attr]) == typeof(__old[attr])) {
				if (!is.object(__diff[attr])) {	// string, number or bool
					if (__diff[attr] === __old[attr]) delete __diff[attr];
				} else { // object or array
					 if (is.array(__diff[attr]) && is.array(__diff[attr])) {
						 if (is.equal(__diff[attr], __old[attr])) delete __diff[attr];
						 continue ;
					 }
					 __diff[attr] = arguments.callee.call(this, __old[attr], __new[attr]);
					if (is.empty(__diff[attr])) delete __diff[attr];
				}
			}
		}
	}
	return __diff;
}


function escape(obj){
	// Экранирование спец. символов
	function ESCAPE(str) {
		return encodeURIComponent(str).replace(/\'/g,'%27');
	}
	if (is.string(obj)) {
		return ESCAPE(obj);
	}
	if (is.set(obj) && is.object(obj)) {
		var temp = copy(obj);
		for (var key in temp) {
			if (key) {
				temp[key] = arguments.callee.call(this, temp[key]);
			}
		}
		return temp;
	}
	return obj;
}



function setCookie(name, value, expires, measure){
    if(expires){
		switch (measure) {
			case 'min':
				expires = expires * 1000 * 60;
				break;
			case 'hour':
				expires = expires * 1000 * 3600;
				break;
			default: //по умолчанию в днях
				expires = expires * 1000 * 3600 * 24;
		}
    }
    document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + new Date(new Date().getTime() + expires).toGMTString() : '');
}



function deleteCookie(name){
    setCookie(name, '', -30);
} 



function getCookie(name){
	if(document.cookie.length > 0){
		c_start = document.cookie.indexOf(name + '=');
		if(c_start != -1){ 
			c_start = c_start + name.length + 1; 
			c_end = document.cookie.indexOf(';', c_start);
			if(c_end == -1){
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		} 
	}
	return '';
}



function sprintf(){
	var iCount, iPadLength, aMatch, iMatchIndex = 1;
	var bAlignLeft, sPad, iWidth, iPrecision, sType;
	var aArgs = sprintf.arguments;
	if (aArgs.length < 2) return '';
	var sFormat = aArgs[0];
	var re = /%(-)?(0| |'.)?(\d+)?(\.\d*)?([bcdfosxX]{1})/;
	var i;

	while (re.test(sFormat)) {
		aMatch = re.exec(sFormat);
		for (i = 0; i < aMatch.length; i++) {
			aMatch[i] = aMatch[i] ? aMatch[i] : "";
		}
		bAlignLeft = (aMatch[1] == '-');
		sPad = (aMatch[2] == '' ? ' ' : aMatch[2]);
		if (sPad.substring(0, 1) == "'") sPad = sPad.substring(1);
		sPad = "";
		iWidth = (aMatch[3] > 0 ? parseInt(aMatch[3]) : 0);
		sType = aMatch[5];
		mArgument = (aArgs[iMatchIndex] != null ? aArgs[iMatchIndex] : '');
		++iMatchIndex;
		if (mArgument.toString().length) {
			if ('fbcdoxX'.indexOf(sType) != -1 && isNaN(mArgument)) mArgument = 0;
			switch (sType) {
			case 'f':
				// floats
				var iPower = Math.pow(10, iPrecision);
				mArgument = (Math.round(parseFloat(mArgument) * iPower) / iPower).toString();
				var aFloatParts = mArgument.split('.');
				iPrecision = (aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 6);
				if (iPrecision > 0) {
					if (aFloatParts.length == 1) aFloatParts[1] = '';
					// pad with zeroes to precision
					for (iCount = aFloatParts[1].length; iCount < iPrecision; iCount++)
					aFloatParts[1] += '0';
					mArgument = aFloatParts[0] + '.' + aFloatParts[1];
				} else mArgument = aFloatParts[0];
				iPadLength = aFloatParts[0].length;
				break;
			case 'b':
				// binary
				mArgument = parseInt(mArgument).toString(2);
				iPadLength = mArgument.length;
				break;
			case 'c':
				// character
				mArgument = String.fromCharCode(parseInt(mArgument));
				break;
			case 'd':
				// decimal
				mArgument = mArgument.toString();
				iPadLength = mArgument.length;
				break;
			case 'o':
				// octal
				mArgument = parseInt(mArgument).toString(8);
				iPadLength = mArgument.length;
				break;
			case 'x':
				// hexadecimal (lowercase)
				mArgument = parseInt(mArgument).toString(16);
				iPadLength = mArgument.length;
				break;
			case 'X':
				// hexadecimal (uppercase)
				mArgument = parseInt(mArgument).toString(16).toUpperCase();
				iPadLength = mArgument.length;
				break;
			default:
				// strings
				mArgument = mArgument.toString();
				iPadLength = mArgument.length;
			}
			if (sType == 'b' || sType == 'd' || sType == 'o' || sType == 'x' || sType == 'X') {
				iPrecision = (aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 1);
				if (iPrecision > mArgument.length) {
					zeros = "";
					for (i = 0; i < (iPrecision - mArgument.length); i++) {
						zeros += "0";
					}
					mArgument = zeros + mArgument;
				}
			}
			if ('fbdoxX'.indexOf(sType) != -1) {
				// pad with padding-char to width
				if (bAlignLeft) for (iCount = iPadLength; iCount < iWidth; iCount++)
				mArgument += sPad;
				else for (iCount = iPadLength; iCount < iWidth; iCount++)
				mArgument = sPad + mArgument;
			}
		}
		sFormat = sFormat.replace(re, mArgument);
	}

	return sFormat;
}



window.gID = new function(){
	var N = 0;
	this.get = function() {
		return 'object' + (N++);
	}
};



function lng(key){
	var lang = window.lang;
	var baselang = window.baselang;
	if (lang && lang[key]){
		return lang[key];
	}
	if(baselang && baselang[key]){
		return baselang[key];
	}
	return key;
}


function translate(parent){
	if (is.unset(parent)) {
		parent = 'body';
	}
	if (!is.jquery(parent)) {
		parent = $(parent);
	}
	parent.find('[langkey]').each(function(index, elem){
		var term = lng($(elem).attr('langkey'));
		if (is.set($(elem).attr('tip'))) {
			$(elem).attr('tip', term);
		} else if (!$(elem).is(':input')) {
			$(elem).html(term);
		} else {
			$(elem).attr('value', term);
		}
	});
}



function basename(path) {
	return path.replace(/\\/g, '/').replace(new RegExp(".*\/", 'g'), '');
}



function dirname(path) {
	return path.replace(/\\/g, '/').replace(new RegExp("\/[^\/]*$", 'g'), '');
}



function lookSize(size){	// Byte
	var metric = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
	var i = 0;
	size = new Number(size);
	while (size >= 1024 && i < metric.length - 1) {
		size /= 1024; i++;
	}
	return {
		'value': (size>0)?size.toFixed(2):'0.00',
		'metric': (size>0)?metric[i]:metric[0],
		'toString': function(){
			return this.value + ' ' + lng(this.metric);
		}
	};
}



function lookSpeed(speed){	// Byte
	var metric = [ 'b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb' ];
	var i = 0;
	speed = new Number(speed);
	speed *= 8;
	while (speed >= 1024 && i < metric.length - 1) {
		speed /= 1024; i++;
	}
	return {
		'value': (speed>0)?speed.toFixed(2):'0.00',
		'metric': (speed>0)?metric[i]:metric[0],
		'toString': function(){
			return this.value + ' ' + lng(this.metric) + '/' + lng('S');
		}
	};
}



function lookTime(time){
	var t = { 'D':null, 'H':null, 'M':null, 'S':time, 'toString': function(){
		var r = '';
		if (this.D) r += this.D + lng('D') + ' ';
		if (this.H) r += this.H + lng('H') + ' ';
		if (this.M) r += this.M + lng('M') + ' ';
		if (this.S >= 0) r += this.S + lng('S');
		return r;
	} };
	
	if (t.S >= 60) {
		t.M = Math.floor(t.S/60);
		t.S = t.S - t.M*60;
	}
	if (t.M >= 60) {
		t.H = Math.floor(t.M/60);
		t.M = t.M - t.H*60;
	}
	if (t.H >= 24) {
		t.D = Math.floor(t.H/24);
		t.H = t.H - t.D*24;
	}
	
	return t;
}

jQuery.fn.isRendered = function(){
	var id = this.attr("id");
	if(is.set(id) && id.length){
		return $("#" + id).length?true:false;
	}
	else{
		this.attr("id", gID.get());
		var res = $("#" + this.attr("id")).length?true:false;
		this.attr("id", "");
		return res;
	}
}



var DRAGGER = new function(){
	
	var self = this;
	var $$ = {
		list: new Array(),
		drag: null
	};
	
	this.add = function(obj){
		if (is.jquery(obj)) {
			for (var i = 0; i < obj.length; i++) {
				if (indexOf($$.list, obj.get(i)) == -1) {
					$$.list.push(obj.get(i));
				}
			}
		}
		return this;
	}
	
	this.remove = function(obj){
		if (is.jquery(obj)) {
			for (var i = 0; i < obj.length; i++) {
				var index = indexOf($$.list, obj.get(i));
				if (index >= 0) {
					$$.list.splice(index, 1);
				}
			}
		}
		return this;
	}
	
	// Init
	$(document).bind('mousedown.dragger', callback(this, function(e){
		if (e.isPropagationStopped()){
			return true;
		}
		var target = null;
		for (var i = 0; !target && i < $$.list.length; i++) {
			if ($$.list[i] == e.target) {
				target = $($$.list[i]);
			}
		}
		for (var i = 0; !target && i < $$.list.length; i++) {
			if ($($$.list[i]).has(e.target).length) {
				target = $($$.list[i]);
			}
		}
		if (target) {
			var tPos = target.offset();
			var pPos = target.parent().offset();
			$$.drag = {
				index: i,
				target: target,
				offsetX: pPos.left + e.pageX - tPos.left,
				offsetY: pPos.top + e.pageY - tPos.top,
				cursor: $('body').css('cursor')
			};
			$('body').css({'cursor': target.css('cursor')});
			target.trigger('down.dragger', {
				event: e.originalEvent,
				left: $$.drag.offsetX,
				top: $$.drag.offsetY
			});
			return false;
		}
	})).bind('mouseup.dragger', callback(this, function(e){
		if ($$.drag) {
			$('body').css({'cursor': $$.drag.cursor});
			$$.drag.target.trigger('up.dragger', {
				event: e.originalEvent,
				left: e.pageX - $$.drag.offsetX,
				top: e.pageY - $$.drag.offsetY
			});
			$$.drag = null;
			return false;
		}
	})).bind('mousemove.dragger', callback(this, function(e){
		if ($$.drag) {
			$$.drag.target.trigger('move.dragger', {
				event: e.originalEvent,
				left: e.pageX - $$.drag.offsetX,
				top: e.pageY - $$.drag.offsetY
			});
			return false;
		}
	})).bind('mouseleave', function(){
		$(document).trigger('mouseup');
	});
};

//Контрольный пример: args.checkin('string a', 'number b', 'opt bool c', 'object d', 'array e', 'opt function f')
function argSchema(argArr){
    this.checkin = function(){
        var arr, qual, type, name;

		function check(type, arg){
			if(is.unset(arg)) return true;
			switch(type){
				case 'string':
					if(is.string(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'number':
					if(is.number(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'bool':
					if(is.bool(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'object':
					if(is.object(arg)){
						this[name] = arg;
					}
					else return false;
                    break;
				case 'function':
					if(is.func(arg)){
						this[name] = arg;
					}
					else return false;
					break;
				case 'array':
					if(is.array(arg)){
						this[name] = arg;
					}
					else return false;
					break;
			}
			return true;
		}
		
        for(var i=0, j=0; i<arguments.length; i++){
            arr = arguments[i].split(' ');
            qual = type = name = null;
            if(arr.length == 3){
                qual = arr[0];
                type = arr[1];
                name = arr[2];
            }
            else if(arr.length == 2){
                type = arr[0];
                name = arr[1];
            }
			delete this[name];
			if(qual == 'opt'){
				if(check.call(this, type, argArr[j])){
					j++;
				}
            }
            else{
				if(!check.call(this, type, argArr[j])) return false;
                j++;
            }
        }
        
        return true;
    }
}


