var ACT_GET = 1;
var ACT_SET = 2;
var ACT_ADD = 3;
var ACT_DEL = 4;
var ACT_GL = 5;
var ACT_GS = 6;
var ACT_OP = 7;
var ACT_CGI = 8;

var ACT_OP_REBOOT = "ACT_REBOOT";
var ACT_OP_FACTORY_RESET = "ACT_FACTORY_RESET";
var ACT_OP_DHCP_RENEW = "ACT_DHCP_RENEW";
var ACT_OP_DHCP_RELEASE = "ACT_DHCP_RELEASE";
var ACT_OP_PPP_CONN = "ACT_PPP_CONN";
var ACT_OP_PPP_DISCONN = "ACT_PPP_DISCONN";
var ACT_OP_DUAL_ACCESS_RENEW = "ACT_DUAL_ACCESS_RENEW";
var ACT_OP_DUAL_ACCESS_RELEASE = "ACT_DUAL_ACCESS_RELEASE";
var ACT_OP_WLAN_GET_NEW_PIN = "ACT_WLAN_GET_NEW_PIN";
var ACT_OP_WLAN_RESTORE_PIN = "ACT_WLAN_RESTORE_PIN";
var ACT_OP_WLAN_UPDATE_ASSOC = "ACT_WLAN_UPDATE_ASSOC";
var ACT_OP_WLAN_WPS_PBC = "ACT_WLAN_WPS_PBC";
var ACT_OP_WLAN_WPS_PIN = "ACT_WLAN_WPS_PIN";
var ACT_OP_WLAN_SCAN = "ACT_WLAN_SCAN";
var ACT_OP_NTP_REQUEST = "ACT_NTP_REQUEST";
var ACT_OP_DLNA_MANUAL_SCAN = "ACT_DLNA_MANUAL_SCAN";
var ACT_OP_L2TP_CONN = "ACT_L2TP_CONN";
var ACT_OP_L2TP_DISCONN = "ACT_L2TP_DISCONN";
var ACT_OP_PPTP_CONN = "ACT_PPTP_CONN";
var ACT_OP_PPTP_DISCONN = "ACT_PPTP_DISCONN";
var ACT_OP_DIAG_STARTDIAG = "ACT_DIAG_STARTDIAG";
var ACT_OP_DIAG_DNSDIAG = "ACT_DIAG_DNSDIAG";
var ACT_OP_DO_WAN_DETECT = "ACT_DO_WAN_DETECT"
var ACT_DECT_ALLOW_REGISTER = "ACT_DECT_ALLOW_REGISTER";
var ACT_DECT_HANDSET_PAGING = "ACT_DECT_HANDSET_PAGING";
var ACT_DECT_HANDSET_DATETIME_SYNC = "ACT_DECT_HANDSET_DATETIME_SYNC";
var ACT_DECT_HANDSET_UNREGISTER = "ACT_DECT_HANDSET_UNREGISTER";
var ACT_DECT_HANDSET_START_TEST = "ACT_DECT_HANDSET_START_TEST";
var ACT_DECT_HANDSET_STOP_TEST = "ACT_DECT_HANDSET_STOP_TEST";
var ACT_OP_IPPING = "ACT_OP_IPPING";
var ACT_OP_TRACERT = "ACT_OP_TRACERT";
	
$.extend({
	w: window,
	d: document,
	c: function (obj) {
		return document.createElement(obj);
	},
	head: document.getElementsByTagName("head")[0],
	div: document.createElement("div"),
	bak: document.createElement("div"),
	ret: 0,
	
	sim: true,
	params: "./js/local.js",
	cn: false,
	qss: false,
	sysMode:"DSL",
	guageInterval:700,
	
	magic: "0y8nc5094yeyrnoq",
	local: location.protocol == "file:",
	flag: navigator.appVersion.match(/MSIE/) ? parseInt(navigator.appVersion.match(/MSIE\s(\d)/)[1]) : 0,
		
	curPage: undefined,
	mainParam: undefined,
	diagParam: undefined,
	coverParam: undefined,
	accStack: [],
	
	model: "",	
	desc: "",	
	ports: 4,	
	itv: 2, 	
	isFD: 0,

    /****************************************************************************************/
	userxmlDoc: {},
	defaultDoc: {},
	localparams: "./js/local_fun.js",
	ff: 0,
	/****************************************************************************************/
/*	each: function (elems, handle, argument) {
		var l = elems.length;
		if (l === undefined) {
			for (var obj in elems)
				if (handle.call(elems[obj], argument, obj) === false)
					return false;
		}
		else
			for (var i = 0; i < l; i++) {
				if (handle.call(elems[i], argument, i) === false)
					return false;
			}
		return true;
	},
*/
	chgChd: function(childs, handle)
	{
		var tmp = $.mkArr(childs);
		$.each(tmp, function(){if (this.nodeType == 1) return handle.call(this);});
		tmp = null;
	},
	
	id: function (id) {
		return $.d.getElementById(id);
	},
	
/*	merge: function (arr1, arr2) {
		for (var i = 0, l = arr2.length; i < l; i++)
			if (!$.inArray(arr2[i], arr1))
				arr1.push(arr2[i]);
	},
*/	
	mkArr: function(array) {
		if (!array) return [];
		var ret = [];
		for (var i = 0, l = array.length; i < l; i++)
			ret[i] = array[i];
		return ret;
	},
	
	inArray: function(elem, elems) {
		for ( var i = 0, l = elems.length; i < l; i++)
			if (elems[i] === elem)
				return true;
		return false;
	},
	
	realLen: function(str) {
		var len = 0;
		for (var i = 0, l = str.length; i < l; i++) {
			len += str.charCodeAt(i) > 127 ? ($.cn ? 2 : 3) : 1;
		}
		return len;
	},
	
	attach: function(elem, type, data, handler) {
		var tmp;
		if (handler)
			tmp = data;
		else 
			handler = data;
		var handle = function (e) {
			var event = event || e;
			var ret = handler.call(elem, event, tmp);
			return ret;
		};
		if (elem.addEventListener)
			elem.addEventListener(type, handle, false);
		else if (elem.attachEvent)
			elem.attachEvent("on" + type, handle);
	},
	
	hasElemClass: function(elem, className) {
		return elem && $.inArray(className, (elem.className ? elem.className : "").split(/\s+/));
	},
	
	addElemClass: function (elem, className) {
		if (elem && elem.nodeType == 1 && !$.hasElemClass(elem, className))
			elem.className += (elem.className ? " " : "") + className;
	},
	
	removeElemClass: function (elem, className) {
		if (elem && elem.nodeType == 1 && $.hasElemClass(elem, className)) {
			elem.className = elem.className.replace(className, "");
			elem.className = elem.className.replace(/\s+/, " ");
		}
	}, 

	cssFloat: function(elem, type) {
		var floattype = (elem.style.cssFloat === undefined ? "styleFloat" : "cssFloat");
		if (type == "left" || type == "right" || type == "none")
			elem.style[floattype] = type;
		else
			return elem.style[floattype];
	},

	opacity: function(elem, opacity) {
		if (!opacity)
			opacity = 0;
		if (elem.style.opacity === undefined)	
		{
			elem.zoom = 1;
			elem.style.filter = (elem.style.filter || "").replace( /alpha\([^)]*\)/, "" ) +
								(parseInt(opacity) + '' == "NaN" ? "" : "alpha(opacity=" + opacity * 100 + ")");
		}
		else
			elem.style["opacity"] = opacity;
	},
	
	h: function(elem, value) {
		if (elem && elem.innerHTML !== undefined){
			if (value === undefined)
				return elem.innerHTML;
			else
				elem.innerHTML = value;
		}
		return null;
	},
	
	dhtml: function(str, hook, midhook) {
		$.div.innerHTML = "div" + str;
		$.div.removeChild($.div.firstChild);
		var scripts = [];
		$.chgChd($.div.childNodes, function() {
			if (this.nodeName && this.nodeName.toLowerCase() === "script")
				scripts.push(this);
			else {
				$.trans($(this));
				hook.call($(this).get(0));
			}
		});
		if (midhook) midhook();
		$.each(scripts, function() {$.script(this.text || this.textContent || this.innerHTML || "")});
		$.emptyElem($.div);
	},
	
	appendElem: function(elem, value, midhook) {
		if (elem && elem.nodeType == 1 && typeof value === "string")
			$.dhtml(value, function (){elem.appendChild(this)}, midhook);
	}, 
	
	removeElem: function(elem) {
		if (elem && elem.parentNode)
			elem.parentNode.removeChild(elem);
	},
	
	emptyElem: function(elem) {
		while (elem && elem.firstChild)
			elem.removeChild(elem.firstChild);
	},
	
	script: function(data) {
		if (data && /\S/.test(data)) {
			var script = $.d.createElement("script");

			script.type = "text/javascript";
			if (script.text === undefined)
				script.appendChild($.d.createTextNode(data));
			else
				script.text = data;

			$.head.insertBefore(script, $.head.firstChild);

			$.head.removeChild(script);
		}
	}, 
	
	tpAjax: function(s) {
		if (s.type)
			s.type = s.type.toUpperCase();
		else
			s.type = "GET";
		
		if (s.data && typeof s.data !== "string")
			return false;

		if (s.type == "GET")
			s.url += (s.url.match(/\?/) ? "&" : "?") + "_=" + (+new Date());
			
		var requestDone = false;
			
		var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		
		try {
			xhr.open(s.type, s.url, s.async);
		} catch(e) {
			if (s.error) s.error(ERR_EXIT);
			return false;
		}
		xhr.setRequestHeader("Content-Type", "text/plain");
		var onreadystatechange = function(){
			if (xhr.readyState == 0) {
				if (ival) {
					clearInterval(ival);
					ival = null;
				}
			} else if (!requestDone && xhr && xhr.readyState == 4) {
				requestDone = true;

				if (ival) {
					clearInterval(ival);
					ival = null;
				}

				if ($.ajok(xhr)) {
					if (s.bScript)
						$.script(xhr.responseText);
					
					if (s.success)
						s.success(s.bScript ? 0 : xhr.responseText);
				}
				else if (s.error) {
					s.error(typeof xhr.status !== "number" ? ERR_INTERNAL : (xhr.status + ERR_INTERNAL));
				}

				if ( s.async )
					xhr = null;
			}
		};
		
		if ( s.async ) {
			var ival = setInterval(onreadystatechange, 13);
		}

		try {
			xhr.send(s.data);
		} catch(e) {
			if (s.error) s.error(ERR_NONE_FILE);
		}

		if ( !s.async )
			onreadystatechange();
	}, 

	ajok: function(xhr) {
		try {
			return !xhr.status && $.local ||
				( xhr.status >= 200 && xhr.status < 300 ) || xhr.status == 304 || xhr.status === 0;
		} catch(e){}
		return false;
	},
	
	asyncId: 1,
	asyncStack: {},

	getAsync: function() {
		var id = $.asyncId;
		$.asyncStack[id] = true;
		$.asyncId ++;
		return id;
	},
	
	checkAsync: function(id) {
		return $.asyncStack[id];
	},
	
	clearAsync: function() {
		for (var i in $.asyncStack) delete $.asyncStack[i];
	},
			
	deleteCookie: function(name) { 
		var LargeExpDate = new Date ();
		document.cookie = name + "=; expires=" +LargeExpDate.toGMTString(); 
	},
	
	io: function(path, bScript, hook, data, noquit, unerr) {
		var ret = 0; 
		var async = !!hook;
		hook = typeof hook === "function" ? hook : null;
		var id;
		if (hook && !noquit) id = $.getAsync();
		$.tpAjax(
		{
			type: data ? "POST" : "",
			url: path,
			bScript: bScript,
			async: async,
			data: data ? data : null,
			success:function(data)
			{
				if (hook) {
					if ($.checkAsync(id) || noquit) hook(data);
				}
				else
					ret = data;
			},
			error:function(errno)
			{
				if(errno == ERR_NOT_ACCEPTED)
				{
					$.deleteCookie("Authorization");
					window.location.reload(true);				
				}
				else
				{
					if (errno > ERR_NETWORK) errno = ERR_NETWORK;
					$.err("io", errno, unerr);
				}
				
				if (hook) {
					if ($.checkAsync(id) || noquit) hook(data);
				}
				else
					ret = errno;
			}
		});
		return ret;
	},
	
	stkPop: function(stack, times)
	{
		times = times ? times : 1;
		if (stack instanceof Array) stack = stack.join(",");
		stack = stack.split(",");
		for (var i = 1, l = stack.length; i < l; i++) {
			if (stack[i] == 0) break;
		}
		for (i--; times > 0; i--, times--)
			stack[i] = 0;
		return stack.join(",");
	},
	
	arr2obj: function(arr, param) {
		var ret = {};
		if (param === undefined) return ret;
		for (var i = 0, l = arr.length; i < l; i++) {
			if (arr[i][param]) ret[arr[i][param]] = arr[i];
		}
		return ret;
	},
	
	obj2str: function(obj, sign1, sign2, tailing) {
		var ret = "";
		for (var i in obj)
			ret += i + (obj[i] || obj[i] === 0 || obj[i] === "" ? sign1 + obj[i] : "") + sign2;
		if (tailing)
			return ret;
		else
			return ret.substr(0, ret.length - sign2.length);
	},
	
	toStr: function(data, sign1, sign2, tailing) {
		return data ? (typeof data === "string" && data || data instanceof Array && data.join(sign2) + (tailing ? sign2 : "") || $.obj2str(data, sign1, sign2, tailing)) : "";
	},
	
	cgi: function(path, arg, hook, noquit, unerr) {
		var expr = /(^|\/)(\w+)\.htm$/;
		if ($.local || $.sim) path = $.params;
		else path = (path ? path : $.curPage.replace(/\.htm$/, ".cgi")) + (arg ? "?" + $.toStr(arg, "=", "&") : "");
		$.ret = 0;
		var func = hook ? function(ret) {if (!ret && (ret = $.ret)) $.err("cgi", $.ret, unerr); if (typeof hook === "function") hook(ret);} : null;
		var ret =  $.io(path, true, func, null, noquit, unerr);
		
		if (!ret && (ret = $.ret))
			$.err("cgi", $.ret, unerr);
		return ret;
	},
	
	backup: function(id) {
		$.emptyElem($.bak);
		// IE will lost checked info after appendElem
		if ($.flag) {
			var con = $.id(id);
			var checks  = [];
			var inputs = $.mkArr(con.getElementsByTagName("input"));
			$.each(inputs, function(arg, index){ if (this.checked) checks[index] = true;});
		}
		$.chgChd($.id(id).childNodes, function(){$.bak.appendChild(this)});
		if ($.flag) $.each(checks, function(arg, index){ if (this == true) {inputs[index].checked = true;}});
	},
	
	restore: function(id) {
		$.emptyElem($.id(id));
		if ($.flag) {
			var checks  = [];
			var inputs = $.mkArr($.bak.getElementsByTagName("input"));
			$.each(inputs, function(arg, index){ if (this.checked) checks[index] = true;});
		}
		$.chgChd($.bak.childNodes, function(){$.id(id).appendChild(this)});
		if ($.flag) $.each(checks, function(arg, index){ if (this == true) {inputs[index].checked = true;}});
	},
	
	err: function(src, errno, unerr) {
		if (unerr) return errno;
		$.clearAsync();
        $.alertAsnyc(errno);
	},
	
	/* back to previous "dir" page */
	errBack: function(errno, dir) {
		$.clearAsync();
		$.alertAsnyc(errno)
	},
	
	tpLoad: function(html, id, resize, hook1, hook2, midhook) {
		var con = $.id(id);
		if (html.indexOf("<") < 0) {
			$.io(html, false, function(ret) {
				if (typeof ret !== "number")
					$.fill(con, ret, hook1, hook2, resize, midhook);
				else
					$.err(id, ret);
			}, null, id == "ban" || id == "menu" || id == "help" || id == "bot" || id == "top");
		}
		else
			$.fill(con, html, hook1, hook2, resize, midhook);
	},
	
	fill: function(container, content, hook1, hook2, resize, midhook) {
		if (hook1) hook1();
		$.emptyElem(container);
		$.appendElem(container, content, midhook);
		if (hook2) hook2();
		if (resize) $.resize();
	},
	
	loadBot: function(path) {
		$.tpLoad(path, "bot", false);
	},

	loadBanner: function(path) {
		$.tpLoad(path, "top", false);
	},
	
	loadMenu: function(path) {
		$.tpLoad(path, "menu", false, null, function(){
			$("#menu a:first").trigger("click")});
	},

	loadPage: function(id, path, hook1, hook2) {
		var bFile = (path.indexOf("<") < 0);
		$.tpLoad(
			bFile ? "./main/" + path : path,
			id, true, hook1,
			function(){/*if (bFile) {*/$.upStyle(); /*$.trans();*//*} */if (hook2) hook2();}
		);
	},
	
	loadMain: function(path, arg) { 
	    $("table").tpTable("destroy");
	    $("input[type='checkbox']").tpCheckbox("destroy");
	    $("input[type='radio']").tpRadio("destroy");
	    $("div.button-group-container").tpBtnGroup("destroy");
		$('#main').empty();
		$('#quicksetup').empty();

		if (!path) path = $.curPage;
		var bFile = (path.indexOf("<") < 0);
		if (bFile) {
			$.emptyElem($.bak);
			$.clearAsync();
		}
		$.loadPage(
			"main",
			path,
			function() {
				if (bFile) {
					$.curPage = path;
					$.accStack.push(path);
				}
				$.mainParam = arg;
				while($.as.length) $.as.pop();
				while($.ds.length) $.ds.pop();
				while($.ansiarg.length) $.ansiarg.pop();
				$.addElemClass($.id("main"), "nv");
				$.unlock();
			},
			function(){$.removeElemClass($.id("main"), "nv");}
		);
	},
	
	loadCover: function(path, opacity, arg) {
		$.tpLoad(path, "cover", false, function(){
			$.diagParam = arg;
			$.removeElemClass($.id("cover"), "nd");
			$.opacity($.id("cover"), opacity);
		});
	},
	
	reload: function(arg) {
		$.loadMain(null, arg);
	},
	
	refresh: function(domain, port, frame, page) {
		if ($.local) location.reload(true);
		else {
			var ret = location.href.match(/(https?):\/\/([^:\/]+)(:\d+)?\/?([^?]*)/);
			location.href = ret[1] + "://" + (domain ? domain : ret[2]) + (port ? ":" + port : (ret[3] ? ret[3] : "")) + "/" + (frame ? frame : (ret[4] ? ret[4] : "")) + (page ? "#__" + page.match(/\w+\.htm$/) : "");
		}
	},

	resize: function(){
		$("#scroll").height(document.documentElement.clientHeight - 90);
		var max = Math.max($("#scroll").height() - 56, $("#main").height() + 30, $("#menu").height() + 21);
		$("#main").height('auto');
		$("#menu").height('auto');
		$.mainScroll();
	}, 

	mainScroll: function()	{ 
		if($("#bot").position().top > $(document).height() + 11) {
            $("#menu").css({
            bottom:"11px"
            });
        } else { 
            $("#menu").css({
            	bottom: $(document).height() + 11 - $("#bot").position().top + "px"
            });
        }
    },

	fixTbl: function() {
		$.each(document.getElementsByTagName("div"), function(){
			if (this.offsetWidth != 0 && ($.hasElemClass(this, "thead") || $.hasElemClass(this, "tbody")))
				this.getElementsByTagName("table")[0].style["width"] = this.offsetWidth - 20 + "px";
		});
	},
	
	//If the table list could not be edited, show the whole string. 
	resizeStrList: function(val, num)
	{
		var tmpStr = "";
		var index = 0;
		while(val.length > index)
		{
			if(val.length > (index+num))
			{
				tmpStr += val.slice(index, index+num);
				tmpStr += "<br/>";
				index += num;
			}
			else
			{
				tmpStr += val.slice(index,val.length);
				break;
			}	
		}		
		return tmpStr;
	},
	
	//If the table list could be edited,  show the string with ellipsis. 
	resizeStr: function(val, num)
	{
		var tmpStr = "";
		if (val.length > num)
		{
			for (var i = 0; i < num; i++)
				tmpStr += val.charAt(i);
			tmpStr += "...";
		}
		else
			tmpStr = val;
	
		return tmpStr;
	},
	
	resizeTlb: function(tlb, rows, rowLines) {
		var div = tlb.parentNode;
		if (tlb.rows.length > rows) {
			div.style["height"] = ((rowLines ? rowLines : 1) * 22 + 3) * rows + "px";
			$.addElemClass(div, "scroll");
		}
		else {
			div.style["height"] = "auto";
			$.removeElemClass(div, "scroll");
		}
	},
	
	lock: function() {
		$.removeElemClass($.id("cover"), "nd");
		$.opacity($.id("cover"), 0);
	},
	
	unlock: function() {
		$.addElemClass($.id("cover"), "nd");
	},

	locked: function() {
		return $.hasElemClass($.id("cover"), "nd") ? false : true;
	},
	
	addLoading: function(object, interval, hook, isNoCover) {
        $.lock();
        obj = $(object);
        if (obj.hasClass('button-group-button')) {
            $("<div style='display: inline-block; vertical-align: text-top;'><span class='load'></span></div>").appendTo(obj.closest("div.button-group-container"));
        }
        else {
            $("<div style='display: inline-block; vertical-align: text-top;'><span class='load'></span></div>").insertAfter(obj);
        }
        if (interval) {
            $.timeout(function() {
                if (!hook || hook() !== false) $.removeLoading();
            }, interval);
        }
        $.showLoading(obj, isNoCover);
    },

    showLoading: function(obj, isNoCover) {
    	if (obj.hasClass('button-group-button')) {
    		obj.closest("div.button-group-container").find('.load').show();
    	} else {
    		obj.next('div').find('.load').show();
    	}
    	if (isNoCover === 1) {
    		return;
    	}
        var tmp = $("span.load");
        if (tmp.length > 0) {
            $.showCover();
        }
    },

    hideLoading: function() {
        $.hideCover();
        $("span.load").not('.wpsload').hide();
    },

    removeLoading: function() {
        $("span.load").closest('div').remove();
        $.unlock();
        $.hideCover();
    },	
	
	timeout: function(hook, interval) {
		var id = $.getAsync();
		return setTimeout(function(){if ($.checkAsync(id) && hook) hook();}, interval);
	},
	
	auto_interval:0,
	auto: function(handle, interval, imediate, args, hook, id) {
		$.auto_interval = interval;

		if (id) {
			if (!$.checkAsync(id)) return;
		}
		else
			id = $.getAsync();
		if (imediate) {
			if (handle(args) === false) {
				if (hook) hook(args);
				return;
			}
		}

		return setTimeout(function(){
			$.auto(handle, $.auto_interval, 1, args, hook, id);
		}, $.auto_interval);
	},
	
	guage: function(strs, step, interval, hook, start, end, diag) {
	    var progressBarMaxLength = 450;
	    var str = "<div class='con2'><p class='center'>" + strs[1] + "</p><div style='width:" + progressBarMaxLength + "px;background-color:#eee;display:inline-block;'><div class='gbar' id='_gbar'></div></div><b class='gitem' id='gitem'></b></div></div>";

	    if (diag) $.loadCover(str, 1);
	    else $.progressBar(str);
		var completed = false;
		var count = 0;
		var count_max = 5000/interval;
		var retTmp = false;

		$.auto(function(args){
	        if (!completed) {
	            if (args[2] >= (args[3] / 2)) {
	                if (count++ > count_max) {
						count = 0;
						type = "GET";
						url = "/main/status.htm?_=" + (+new Date());
						var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
						xhr.open(type, url, true);
						xhr.setRequestHeader("Content-Type", "text/plain");
	                    xhr.onreadystatechange = function() {
	                        if (xhr.readyState == 4 && xhr.status == 200) {
								completed = true;
						}
	                    }
						xhr.send(null);
					}
				}
	        } else {
				$.auto_interval = 5000/step;	
			}
			var percent = Math.floor(args[2] * 100 / args[3]);
			$(args[0]).html(percent + "%");
	        $(args[1]).animate({
	            width: progressBarMaxLength / 100 * percent
	        }, $.auto_interval);
			if (args[2] >= args[3])
				return false;
			args[2]++;
	    }, interval, true, [$.id("gitem"), $.id("_gbar"), start ? start : 0, step, end ? end : step], function(args) {
	        $('#_gbar').animate({
	            width: progressBarMaxLength
	        }, $.auto_interval, hook);
	    });
	},
	
	ansiarg: [],
	
	ansi: function(str) {
		var arr = str.split("\r\n");
		for (var i = 0, l = arr.length; i < l; i++) {
			var ret = arr[i].split('=');
			ret = [ret.shift(), ret.join("=")];
			if (ret[1] && $.asc(ret[1], true)) {
				arr[i] = "\\" + ret[0];
				$.ansiarg.push(ret);
			}
		}
		return arr.join("\r\n");
	},
	
	as: [],		
	ds: [],		
	
	act: function(type, oid, stack, pStack, attrs) {
		if (!type || !oid)
			return false;
		stack = stack ? stack : "0,0,0,0,0,0";
		pStack = pStack ? pStack : "0,0,0,0,0,0";
		attrs = $.toStr(attrs, "=", "\r\n", true);
		attrs = attrs.replace(/__stack=[0-9,]*\r\n/, "");
		var ret = null;
		switch (type) {
			case ACT_ADD:		
				if ($.cn) attrs = $.ansi(attrs);
			case ACT_GET:		
				ret = {};
				break;
			case ACT_GL:		
			case ACT_GS:		
				ret = [];
				break;
			case ACT_SET:		
			case ACT_CGI:
			case ACT_DEL:	
				oid = oid ? oid : $.curPage.replace(/\.htm$/, ".cgi");
				if ($.cn) attrs = $.ansi(attrs);
			case ACT_OP:
				break;
			default: 
				return false;
		}
		$.as.push([type, null, oid, stack, pStack, attrs, attrs ? attrs.match(/\r\n/g).length : 0]);
		$.ds.push(ret);
		return ret;
	},
	
	exe: function(hook, unerr) {
		var url = "/cgi?";
		var data = "";
		var index = 0;
		var obj;
		var bAnsi = false;
		
		if ($.as.length == 0 || $.local || $.sim) {
			if (hook && typeof hook === "function") $.timeout(hook, 200);
			while($.as.pop() !== undefined);
			while($.ds.pop() !== undefined);
			return 0;
		}
		
		$.emptyElem($.id("ansiform"));
		while ($.ansiarg.length) {
			obj = $.ansiarg.shift();
			$.appendElem($.id("ansiform"), "<input type='hidden' name='"+obj[0]+"' value='"+obj[1].replace(/\&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&apos;")+"' />");
			bAnsi = true;
		}
		
		while(obj = $.as.shift()){
			url += obj[0] + (obj[1] ? "=" + obj[1] : "") + "&";
			data += "[" + obj[2] + "#" + obj[3] + "#" + obj[4] + "]" + index + "," + obj[6] + "\r\n" + obj[5];
			index++;
		}			
		url = url.substr(0, url.length - 1);
		
		if (hook) {
			var tmpds = $.mkArr($.ds);
			while($.ds.length) $.ds.pop();	
		}
		
		var resolve = function(ret, ds) {
			if (typeof ret !== "number") {
				var lines = ret.split('\n');
				ret = 0;
				$.ret = 0;
				var scripts = "";
				
				for (var i = 0, l = lines.length; i < l; i++) {
					if (lines[i] == "") continue;
					if (lines[i].charAt(0) == "[") {
						if (scripts != "") {
							$.script(scripts);
							if ($.ret) {
								ret = $.ret;
								$.err("cgi", ret, unerr);
								break;
							}
							scripts = "";
						}
						var n = lines[i].indexOf("]");
						var j = parseInt(lines[i].substr(n+1), 10);
						var stack = lines[i].substr(1, n-1);
						var instance;
						if (stack == "error") {
							if (j) {
								ret = j;
								if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) $.err("exe", ret, unerr);
								break;
							}
						}
						else if (ds[j] instanceof Array) {
							instance = {__stack: stack};
							ds[j].push(instance);
						}
						else if (ds[j] != null) {
							instance  = ds[j];
							instance.__stack = stack;
						}
					}
					else {
						if (stack == "cgi") {
							scripts += lines[i] + '\n';
						}
						else {
							var attr = lines[i].split("=");
							instance[attr[0]] = attr.slice(1).join('=');
						}
					}
				}
			}
			while(ds.length) ds.pop();
			return ret;
		}
		
		if (bAnsi) {
			var formObj = $.d.forms[0];	
			try {
				formObj.target = "up_frame";
				formObj.action = "/cgi/ansi";
				formObj.submit();
			}catch(e){}
		}
		
		if (hook) {
            var resolve2 = function() {
                $.io(url, false, function(ret) {
                    ret = resolve(ret, tmpds);
                    if (typeof hook === "function") hook(ret);
                }, data, false, unerr)
            };
			if (bAnsi) $.timeout(resolve2, 100);
			else resolve2();
			return 0;
		}
		else {
			while(ret = $.io(url, false, null, data, false, unerr)) {
				ret = resolve(ret, $.ds);
				if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) return ret;
				count++;
				if (count > 3) return $.err("exe", ERR_HTTP_ERR_CGI_INVALID_ANSI, unerr);
			}
		}
	},

	turnqss: function(str) {
		if ($.qss) return str.replace(/\bWPS\b/g, "QSS");
		else return str.replace(/\bQSS\b/g, "WPS");
	},

	num: function() {
		var l = arguments.length - 1;
		var unalert = arguments[l];
		if (unalert !== true) { l++; unalert = false; }
		var val = arguments[0];
		if (typeof val === "string" && val.match(/\D/))
			return $.alert(ERR_NUM_INVAD, unalert);
		var val = parseInt(val, 10);
		if (isNaN(val)) return $.alert(ERR_NUM_INVAD, unalert);
		if (l == 1) return 0;
		for (var i = 1; i < l; i++) {
			if (val >= arguments[i][0] && val <= arguments[i][1] || val === arguments[i])
				return 0;
		}
		return $.alert(ERR_NUM_OUTRANGE, unalert);
	},
	
	step: function(num, step) {
		return Math.round(parseInt(num,10)/step)*step;
	},
	
	asc: function(str, unalert) {
		for (var i = 0, l = str.length; i < l; i++)
			if (str.charCodeAt(i) > 127) return $.alert(90201, unalert);
		return 0;
	},
	
	ip2num: function(ip) {
		if (typeof ip === "number") return ip;
		var ret, val;
		if (!(ret = ip.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/))) return false;
		for (var i = 1, val = 0; i <= 4; i++) {
			if (parseInt(ret[i], 10) > 255) return false;
			val = (val << 8) + parseInt(ret[i], 10);
		}
		return val;
	},
	
	num2ip: function(num) {
		if (typeof num !== "number") return false;
		return "" + ((num >> 24) + 256) % 256 + "." + (num >> 16 & 0xff) + "." + (num >> 8 & 0xff) + "." + (num & 0xff);
	},
	
	ifip: function(ip, unalert) {
		if ((ip = $.ip2num(ip)) === false) return $.alert(ERR_IP_FORMAT, unalert);
		if (ip == -1) return $.alert(ERR_IP_BROADCAST, unalert);
		var net = ip >> 24;
		if (net == 0) return $.alert(ERR_IP_SUBNETA_NET_0, unalert);
		if (net == 127) return $.alert(ERR_IP_LOOPBACK, unalert);
		if (net >= -32 && net < -16) return $.alert(ERR_IP_MULTICAST, unalert);
		if (net >= -16 && net < 0) return $.alert(ERR_IP_PRESERVED, unalert);
		return 0;
	},
	
	mask: function(mask, unalert) {
		if ((mask = $.ip2num(mask)) >= 0) return $.alert(ERR_MASK_INVAD, unalert);
		for (var i = 32; i > 0; i--, mask = mask >> 1)
			if (mask % 2) return mask == -1 ? 0 : $.alert(ERR_MASK_INVAD, unalert);
	},
	
	ipmask: function(ip, mask, unalert) {
		var temp;
		ip  = $.ip2num(ip);
		mask = $.ip2num(mask);
		if ((ip & mask) == mask || (ip & mask) == 0) return $.alert(ERR_IPMASK_SUBNET_INVAD, unalert);
		if ((ip & ~mask) == ~mask || (ip & ~mask) == 0) return $.alert(ERR_IPMASK_HOST_INVAD, unalert);
		return 0;
	},
	
	ipmaskgw: function(ip, mask, gw, unalert) {
		ip  = $.ip2num(ip);
		mask = $.ip2num(mask);
		gw = $.ip2num(gw);
		if ((ip & mask) != (gw & mask)) return $.alert(ERR_IPGW_NOT_SAME_SUBNET, unalert);
		return 0;
	},
	
	mac: function(mac, unalert) {
		if (!(ret = mac.match(/^([0-9a-fA-F]{2})(:[0-9a-fA-F]{2}){5}$/))) return $.alert(ERR_MAC_FORMAT, unalert);
		if (mac== "00:00:00:00:00:00") return $.alert(ERR_MAC_ZERO, unalert);
		if (mac.match(/^[fF]{2}(:[fF]{2}){5}$/)) return $.alert(ERR_MAC_BROADCAST, unalert);
		if (parseInt(ret[1], 16) % 2) return $.alert(ERR_MAC_MULTICAST, unalert);
		return 0;
	},

	ip2ip: function (ip)
	{
		var ipParts = ip.split(".");
		for (var i = 0; i < 4; i++)
		{
			ipParts[i] = parseInt(ipParts[i], 10);
		}
		var ipStr = ipParts[0] + "." + ipParts[1] + "." + ipParts[2] + "." + ipParts[3];
		return ipStr;
	},

	isname:function(pName){
		return pName.length && (pName.match(/[\\\/\"\:\*\?\<\>\|\&]|\s$/) == null ? true : false);
	},

	isdomain: function(domain){
		var c; 
		var gotDot = false;
		var ch = "-.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		if ((domain.charAt(0) == ".")
				|| (domain.charAt(0) == "-")
				|| ((domain.charAt(domain.length - 1) == "."))
				|| ((domain.charAt(domain.length - 1) == "-")))
			return false;
		for (var i = 0; i < domain.length; i++)
		{
			c = domain.charAt(i);
			if (ch.indexOf(c) == -1)
				return false; 
			if ((c == "-") && (gotDot == true))
				return false;
			if ((c == ".") && (gotDot == true))
				return false;
			if ((c == ".") && (gotDot == false))
				gotDot = true;
			if ((c == "-") && (gotDot == false))
				gotDot = true;
			if ((c != ".") && (c != "-") && (gotDot == true))
				gotDot = false;
		} 
		return true; 
	},
	
	isnum:function(num_string){
		var c;
		var ch = "0123456789";
		for (var i = 0; i < num_string.length; i++)
		{
			c = num_string.charAt(i); 
			if (ch.indexOf(c) == -1) 
			return false; 
		}
		return true; 
	},

	isSameLan:function (lan1Ip, lan1Mask, lan2Ip, lan2Mask) {
	    var count = 0;
	    lan1a = lan1Ip.split('.');
	    lan1m = lan1Mask.split('.');
	    lan2a = lan2Ip.split('.');
	    lan2m = lan2Mask.split('.');
	    for (i = 0; i < 4; i++) {
	        l1a_n = parseInt(lan1a[i]);
	        l1m_n = parseInt(lan1m[i]);
	        l2a_n = parseInt(lan2a[i]);
	        l2m_n = parseInt(lan2m[i]);
	        if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
	            count++;
	    }
	    if (count == 4) {
	        var testIp = $.ip2num(lan1Ip);
	        var lanMask = $.ip2num(lan1Mask);
	        if (((testIp & (~lanMask)) == 0) || ((testIp & (~lanMask)) == (~lanMask)))
	            return false;
	        else
	            return true;
	    } else
	        return false;
	},

	charCompareA:function (szname, en_limit, cn_limit) {
	    var c;
	    var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
	    if (szname.length > en_limit) {
	        return false;
	    }
	    for (var i = 0; i < szname.length; i++) {
	        c = szname.charAt(i);
	        if (ch.indexOf(c) == -1) {
	            if (szname.length > cn_limit) {
	                return false;
	            }
	        }
	    }
	    return true;
	},
	
	getrightfirstonebitpos: function(num){
		var i;
		var pos = 0;
		var numArr = [1, 2, 4, 8, 16, 32, 64, 128];
		for ( i = 0; i < 8; i++ )
		{
			if ( ((num & numArr[i]) >> i) == 0 )
				pos++;
		}
		return pos;
	},
	
	getmaskbit: function(mask){
		var i, j;
		var pos = 0;
		var numArr = [1, 2, 4, 8, 16, 32, 64, 128];
		var maskPart = mask.split(".");
		for ( i = 3; i >= 0; i--)
		{
			for ( j = 0; j < 8; j++ )
			{
				if ( ((maskPart[i] & numArr[j]) >> j) == 0 )
					pos++;
			}
		}
		return pos;
	},
	
	isOrderIp: function(ip1, ip2){
		var ipS = ip1.split(".");
		var ipE = ip2.split(".");
		for (var i = 0; i < 4; i++)
		{
			if (parseInt(ipS[i], 10) < parseInt(ipE[i], 10))
				return true;
			else if (parseInt(ipS[i], 10) > parseInt(ipE[i], 10))
				return false;
		}
		return true;
	},

	reverseStr: function(str){
		var newStr="";
		for(var i = 0; i < str.length; i++ )
		{
			newStr += str.substring(str.length-1-i, str.length-i);
		}
		return newStr;
	},
	
	formatNum:function(num){
		var numNew = $.reverseStr(num.toString());
		if(numNew.length > 3)
		{
			numNew = numNew.replace(/(\d\d\d)/g, function($0,$1){return $1+","});
		}
		numNew = (numNew.charAt(numNew.length-1) == ',')? numNew.substring(0, numNew.length-1):numNew;
		return $.reverseStr(numNew);
	},

	getWl24gMask:function(modeValue, chwidthValue){
		var mask = 0x0;
		if ((modeValue == "n-only")||(modeValue == "n") || modeValue == "gn") //11n-only,11bgn,11gn
		{
			if(chwidthValue == "20M")//HT20
				mask = (1<<IEEE80211_MODE_11NG_HT20);
			else if(chwidthValue == "40M")//HT40
				mask = (1<<IEEE80211_MODE_11NG_HT40);
			else if(chwidthValue == "Auto")//Auto
				mask = (1<<IEEE80211_MODE_11NG_HT40)|(1<<IEEE80211_MODE_11NG_HT20);
		}
		else
			$.alert(ERR_WLAN_MODE_INVALID);
		
		return mask;
	},

	getWl5gMask:function(modeValue, chwidthValue){
		var mask = 0x0;
		if ((modeValue == "n-only")||(modeValue == "an")||(modeValue=="ac")||(modeValue=="ac-only")||(modeValue=="nac")) //11na, 11n-only,11ac,11ac-only,11ac/n
		{
			if(chwidthValue == "20M")//HT20
				mask = (1<<IEEE80211_MODE_11NA_HT20);
			else if(chwidthValue == "40M" || chwidthValue == "80M")//HT40
				mask = (1<<IEEE80211_MODE_11NA_HT40);
			else if(chwidthValue == "Auto")//Auto
				mask = (1<<IEEE80211_MODE_11NA_HT40);//|(1<<IEEE80211_MODE_11NA_HT20)
		}
		else if(modeValue == "a")//11a
			mask = (1<<IEEE80211_MODE_11A);
		else
			$.alert(ERR_WLAN_MODE_INVALID);
			
		return mask;
	},
	
	is5GSupportRegion: function(standardArg, bandwidthArg, indexArg)
	{
		var flag = false;
		var enDFS = 0;
		var regionIndex = indexArg * region_chan_table_shift;
		var dfsMask = (1 << IEEE80211_CHAN_REQUIRED_DFS);
		var mask = $.getWl5gMask(standardArg, bandwidthArg);
		
		for(i = 1; i <= TOTAL_CHANNEL; i++)
		{
			if(Region_chan_table[regionIndex+i] & mask)
			{
				if (((Region_chan_table[regionIndex+i] & dfsMask) == 0) || ((Region_chan_table[regionIndex+i] & dfsMask) && (enDFS == 1)))
				{
					flag = true;
					break;
				}
			}
		}	
		return flag;
	},

	chgElem: function(elem, val) {
		if (elem && elem.nodeName) {
			val = $.turnqss(val);
			switch (elem.nodeName.toLowerCase())
			{
				case "input":
					elem.value = val;
					break;
				case "option":
					elem.text = val;
					break;
				default:
					if ($.hasElemClass(elem, "item")) val = val.replace(/:?\s*$/, ":");
					$(elem).html(val);
					break;
			}
			//for localization
			//$.removeElemClass(elem, "T");
		}
	},
	
	upStyle: function() { 
		$("h3").each(function() {
			if ($(this).parent('div').hasClass('header-container')) {
				return;
			} else {
	        var str = "<div class='header-container'><h3><span class='T " + $(this).attr('class') + "'>" + $(this).html() + "</span></h3></div>";
	        $(this).replaceWith(str);
			}
	    });
        var helpstr = '<div class="help-container">' +
            '<div class="help-btn-container">' +
            '<a class="btn-help" href="javascript:void(0)"></a>' +
            '</div>' +
            '<div class="help-content-container">' +
            '<div class="position-top-left"></div>' +
            '<div class="position-top-center"></div>' +
            '<div class="position-top-right"></div>' +
            '<div class="position-center-left">' +
            '<div class="position-center-right">' +
            '<span class="help-content-delta"></span>' +
            '<div class="help-content-container-wrap">' +
            '<div class="help-content"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="position-bottom-left"></div>' +
            '<div class="position-bottom-center"></div>' +
            '<div class="position-bottom-right"></div>' +
            '</div>' +
            '</div>';
        if($('.help-container').length < 1 && $("h3:first span:not(.no-help)").length > 0) {
            $("h3:first").after(helpstr);
        } else {
            $("#main").append(helpstr);
        }
        var $helpContainer = $('div.help-container');
        var $helpContent = $('.help-content-container');
        $('div.help-btn-container').on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if ($helpContainer.hasClass('clicked')) {
                $helpContainer.removeClass('clicked');
                $helpContent.slideUp('fast');
            } else {
                $helpContainer.addClass('clicked');
                $helpContent.slideDown('fast');
                $.loadHelp($.curPage.replace(/\.htm$/, ''));
            }
        });
        $('div.help-btn-container').on('mouseenter.helpBtn', function(e) {
            $(this).find('a.btn-help').addClass('hover');
        });
        $('div.help-btn-container').on('mouseleave.helpBtn', function(e) {
            $(this).find('a.btn-help').removeClass('hover');
        });
        $helpContent.on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $(document).click(function() {
            if ($helpContainer.hasClass('clicked')) {
                $helpContainer.removeClass('clicked');
                $helpContent.slideUp('fast');
                $.closeHelp();
            }
        });
        $("tr.editor-container").children("td").find("div.help-container").remove();
		$("div.mode-change").tpModeSelect();

	    $("input[type='text']").each(function() {
	    	var divTmp = $(this).parent('div');
	    	var bTmp = $(divTmp).find('b');
	    	$(this).addClass('tp-input-text');
	    	if($(bTmp).attr('class') == undefined) {
	    		$(bTmp).replaceWith("<label class='label-title'>" + $(bTmp).html() + "</label>");
	    	}
	    	else {
	    	$(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "'>" + $(bTmp).html() + "</label>");
	    	}
	    	$(divTmp).addClass('pure-control-group');
	    	$(this).keydown(function (e) {
	    		if (e.keyCode == 0xD) {
	    			e.preventDefault();
	    		}
	    	});
	    });

	    $("input[type='password']").each(function() {
	    	var divTmp = $(this).parent('div');
	    	var bTmp = $(divTmp).find('b');
	    	$(this).addClass('tp-input-text');
	    	if($(bTmp).attr('class') == undefined) {
	    	$(bTmp).replaceWith("<label class='label-title'>" + $(bTmp).html() + "</label>");
	    	}
	    	else {
	    		$(bTmp).replaceWith("<label class='label-title" + " " + $(bTmp).attr('class') + "'>" + $(bTmp).html() + "</label>");
	    	}
	    	$(divTmp).addClass('pure-control-group');
	    	$(this).keydown(function (e) {
	    		if (e.keyCode == 0xD) {
	    			e.preventDefault();
	    		}
	    	});
	    });

	    $("div.steps").each(function() {
	    	$(this).children("h5").addClass("title");
	    	$(this).find("span[id*='step']").addClass("step");
	    });
	    		    	
	    $("button[type='submit']").not(".button-group-button").each(function() {
	    	var tag;
	    	if ($(this).hasClass("tp-btn-custom")) {
	    		return;
	    	}
	    	$(this).addClass("pure-button tp-btn-custom"); 
	    	nameTmp = $(this).html();
	    	if ((tag = this.className.match(/\b(T_|t_)(\w+)\b/) != null)) {
	    		tag = tag[0];
	    	}
	    	$(this).html('<span class="' + tag + '">' + nameTmp + '</span>');
	    	var str = "<div class='button-container'></div>";
	        $(this).wrap(str);

	    	if ($(this).hasClass('inline')) {
	    		$(this).parent().addClass('inline');
	    	} 
	    	if ($(this).hasClass('left')) {
	    		$(this).parent().addClass('left');
	    		$(this).removeClass('left'); // in chrome we should remove 'left', or the text will align left.
	    	}
	        str = "<form class='pure-form'></form>";
	        $(this).wrap(str);
	    });
	    $("button[type='submit']").click(function(e) {
	    	e.preventDefault();
	    });
	},

	loadHelp: function(name) {
	    help = this;
        index = 1;
	    var render = function(contentObj) {
	        var htmlStr = "";
	        if (contentObj.TITLE) {
	            htmlStr += "<h4 class=\"title\">" + contentObj.TITLE + "</h4>";
	        }
            var objContent = contentObj.CONTENT;
			/*
            if (name == 'wanBasic') {
                if ($.sysMode.toUpperCase() == 'ETH') {
                    objContent = contentObj.CONTENT_ETH;
                } else if ($.sysMode.toUpperCase() == 'DSL'){
                    objContent = contentObj.CONTENT_DSL;
                }
            }*/
            if (objContent) {
                $(objContent).each(function(index, element) {
	                htmlStr += contentRender(element);
	            })
	        }

	        return htmlStr;
	    };
	    var contentRender = function(obj) {
            if (obj.hasOwnProperty('display') && obj.display != 1) return '';
	        var htmlStr = "";
	        var type = obj.type;
	        var connector = obj.connector || " - ";
	        switch (type) {
	            case "title":
                    htmlStr += "<div class=\"title-container\">";
                    if (!!obj.title) {
                        htmlStr += "<h5 class=\"title title-title\">" + obj.title + "</h5>";
                        if (!!obj.content) {
                            htmlStr += "<p>" + obj.content + "</p>";
                        }
                    } else {
	                htmlStr += "<h5 class=\"title title-title\">" + obj.content + "</h5>";
                    }
                    break;
                case "title2":
                    htmlStr += "<div class=\"title-container\">";
                    htmlStr += "<h5 class=\"title title-title2\">" + obj.content + "</h5>";
	                break;
	            case "name":
                    if (index >= 2) {
                        var level = index;
                        htmlStr += "<div class=\"name-container" + level + "\">";
                        htmlStr += "<h5 class=\"title name-title" + level + "\">" + obj.title + "</h5>";
	                htmlStr += "<span class=\"connector\">" + connector + "</span>";
	                htmlStr += "<span>" + obj.content + "</span>";

                    } else {
                        htmlStr += "<div class=\"name-container\">";
                        htmlStr += "<h5 class=\"title name-title\">" + obj.title + "<span class=\"help-arrow\"></span></h5>";
                        htmlStr += "<div class=\"nd\"><p>" + obj.content + "</p>";
                    }

	                break;
	            case "paragraph":
	                htmlStr += "<div class=\"paragraph-container\">";

	                if (obj.title) {
	                    htmlStr += "<h5 class=\"title paragraph-title\">" + obj.title + "</h5>";
	                };

	                htmlStr += "<p class=\"paragraph\">" + obj.content + "</p>";
	                break;
	            case "note":
	                htmlStr += "<div class=\"note-container\">";
	                htmlStr += "<h5 class=\"title note-title\">" + obj.title + "</h5>";
	                htmlStr += "<ol class=\"note\">";
	                $(obj.content).each(function(index, note) {
	                    htmlStr += "<li>" + note + "</li>";
	                });
	                htmlStr += "</ol>";
	                break;

	        };

	        if (obj.children) {
                index++;
	            htmlStr += "<div class=\"container sub-container  sub-container-" + index + "\">";
	            $(obj.children).each(function(index, child) {
	                htmlStr += contentRender(child);
	            });
	            htmlStr += "</div>";
                index--;
	        };
            if (obj.type == 'name' && index == 1) {
                htmlStr += "</div>";
            }
            htmlStr += "</div>";
	        return htmlStr;
	    }

	    var contentObj = $.helpContent[name];
	    var htmlStr = "";
	    htmlStr = render(contentObj);
	    var content = $("div.help-content");
	    content.html($(htmlStr));

        $('div.name-container h5.name-title').each(function() {
            var self = $(this);
            $(this).parent().on('click.help', function() {
                var tempDiv = self.next('div');
                var tempSpan = self.find('span');
                if (tempDiv.hasClass('nd')) {
                    self.addClass('h5-opened');
                    tempDiv.slideDown('fast', function() {
                        tempDiv.removeClass('nd');

                    });
                } else {
                    self.removeClass('h5-opened');
                    tempDiv.slideUp('fast', function() {
                        tempDiv.addClass('nd');
                    });
                }
            });
        });

	    var wrap = $("div.help-content-container-wrap");
	    var wh = $(window).height();
        wrap.css("max-height", wh - 260);
	    wrap.scrollTop(0);
	},

	closeHelp: function() {
	    var htmlStr = "";
	    var content = $("div.help-content");
	    content.html($(htmlStr));
	},
	
	pwdIntensityCheck: function(div, val) {
		div.slideDown();
		div.find("span[class^=level]").addClass("ori").removeClass("green yellow red");
	    if (!val) {
	        return;
	    }
		var upperRe = /[A-Z]/;
        var lowerRe = /[a-z]/;
        var digitRe = /\d/;
        var otherRe = /(.[^a-zA-Z0-9])/;

        var hasUpper = 0;
        var hasLower = 0;
        var hasDigit = 0;
        var hasOther = 0;
        var largeLength = 0;

        var level = 0;

        if (upperRe.test(val)) {
            hasUpper = 1;
        } else {
            hasUpper = 0;
        }

        if (lowerRe.test(val)) {
            hasLower = 1;
        } else {
            hasLower = 0;
        }

        if (digitRe.test(val)) {
            hasDigit = 1;
        } else {
            hasDigit = 0;
		}

        if (otherRe.test(val)) {
            hasOther = 1;
        } else {
            hasOther = 0;
        } 

        if (val.length > 10) {
            largeLength = 1;
        } else {
            largeLength = 0;
		}

        level = hasUpper + hasLower + hasDigit + largeLength + hasOther;

        if (val.length <= 5) {
	        if (level <= 2) {
			div.find("span.level1").addClass("red");
	        } else if (level == 3 || level == 4) {
			div.find("span.level2").addClass("yellow");
		}
        } else {
	        if (level <= 1) {
				div.find("span.level1").addClass("red");
	        } else if (level == 2 || level == 3) {
				div.find("span.level2").addClass("yellow");
	        } else if (level >= 4) {
	        	div.find("span.level3").addClass("green");
	        }
        }
	},

	isValidGLUIP6Addr: function(ip6Addr) {
		var flag;
		var regExp = /^(:|[a-f]|[A-F]|[0-9]){1,39}$/;
		if (regExp.test(ip6Addr))
		{
			flag = true;
		}
		else
		{
			flag = false;
		}
		
		regExp = /::/;
		if (flag)
		{
			if (regExp.test(ip6Addr))
			{
				regExp = /^([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
				else
				{
					var index = ip6Addr.indexOf("::");
					var len = ip6Addr.length;
					var substr1 = ip6Addr.substr(0, index);
					var substr2 = ip6Addr.substr(index+2, len - index - 2);
					regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){0,6}([a-f]|[A-F]|[0-9]){1,4}$/;
					var num = 0;
								
					if ("" == substr1 && "" == substr2)
					{
						return true;
					}
					else if ("" == substr2)
					{
						if (!regExp.test(substr1))
						{
							flag = false;
						}
					}
					else if ("" == substr1)
					{
					
						if (!regExp.test(substr2))
						{
							flag = false;
						}
					}
					else if (!regExp.test(substr1) || !regExp.test(substr2))
					{
						flag = false;
					}
					else if (regExp.test(substr1) && regExp.test(substr2))
					{
						for (var i = 0; i < substr1.length; i++)
						{
							if (substr1.charAt(i) == ":")
							{
								num += 1;
							}
						}
						
						for (var i = 0; i < substr2.length; i++)
						{
							if (substr1.charAt(i) == ":")
							{
								num += 1;
							}
						}
				
						if (num > 5)
						{	
							flag = false;
						}	
					}
				}
			}
			else
			{
				regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){7}([a-f]|[A-F]|[0-9]){1,4}$/;
				if (!regExp.test(ip6Addr))
				{
					flag = false;
				}
			}
		}
		
		if (flag)
		{
			var index;
			index = ip6Addr.indexOf(":");
			var substr = ip6Addr.substr(0,index);
			if (0 == index || parseInt(substr,16) == 0)
			{
				regExp = /^((0{0,4})|::|:)*$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
				
				regExp = /^(((0){0,4})|::|:)*((0){0,3}(1))$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
			}
			else if (parseInt(substr,16) >= 65280)
			{
				flag = false;
			}
			else if (parseInt(substr,16) >= 65152 && parseInt(substr,16) <= 65215)
			{
				flag = true;
			}
			else
			{
				if (parseInt(substr,16) >= 8192 && parseInt(substr,16) <= 16383)
				{
					flag = true;
				}
			}
		}
		
		return flag;
	},
	isValidGLUIP6AddrStrict: function(ip6Addr)
	{
		var flag;
		var regExp = /^(:|[a-f]|[A-F]|[0-9]){1,39}$/;
		if (regExp.test(ip6Addr))
		{
			flag = true;
		}
		else
		{
			flag = false;
		}
		
		regExp = /::/;
		if (flag)
		{
			if (regExp.test(ip6Addr))
			{	
				regExp = /^([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*(::)([a-f]|[A-F]|[0-9])*$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
				else
				{
					var index = ip6Addr.indexOf("::");
					var len = ip6Addr.length;
					var substr1 = ip6Addr.substr(0, index);
					var substr2 = ip6Addr.substr(index+2, len - index - 2);
					regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){0,6}([a-f]|[A-F]|[0-9]){1,4}$/;
					var num = 0;
								
					if ("" == substr1 && "" == substr2)
					{
						flag = false;
					}
					else if ("" == substr2)
					{
						flag = false;	
					}
					else if ("" == substr1)
					{
						if (!regExp.test(substr2))
						{
							flag = false;
						}
					}
					else if (!regExp.test(substr1) || !regExp.test(substr2))
					{
						flag = false;
					}
					else if (regExp.test(substr1) && regExp.test(substr2))
					{
						for (var i = 0; i < substr1.length; i++)
						{
							if (substr1.charAt(i) == ":")
							{
								num += 1;
							}
						}
						
						for (var i = 0; i < substr2.length; i++)
						{
							if (substr1.charAt(i) == ":")
							{
								num += 1;
							}
						}
				
						if (num > 5)
						{	
							flag = false;
						}	
					}
				}
			}
			else
			{
				regExp = /^(([a-f]|[A-F]|[0-9]){1,4}(:)){7}([a-f]|[A-F]|[0-9]){1,4}$/;
				if (!regExp.test(ip6Addr))
				{
					flag = false;
				}
			}
		}
		
		if (flag)
		{
			var index;
			index = ip6Addr.indexOf(":");
			var substr = ip6Addr.substr(0,index);
			if (0 == index || parseInt(substr,16) == 0)
			{
				regExp = /^((0{0,4})|::|:)*$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
				
				regExp = /^(((0){0,4})|::|:)*((0){0,3}(1))$/;
				if (regExp.test(ip6Addr))
				{
					flag = false;
				}
			}
			else if (parseInt(substr,16) >= 65280)
			{
				flag = false;
			}
			else if (parseInt(substr,16) >= 65152 && parseInt(substr,16) <= 65215)
			{
				flag = true;
			}
			else
			{
				if (parseInt(substr,16) >= 8192 && parseInt(substr,16) <= 16383)
				{
					flag = true;
				}
			}
		}
		
		return flag;
	},

	isTimeVaild: function(time) {
	    regExp = /^[0-9]{2}:[0-9]{2}$/;
	    if(!regExp.test(time))
	    {
	        return false;
	    }
	    var timePart = time.split(":");
	    if(timePart[0] > 23 || timePart[1] > 59)
	    {
	        return false;
	    }
	    return true;
	},
	
	getDefaultHostname: function() {
		var c;
		var ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";
		var i = 0;
		var hostname = "";
		var hostnameLen = 0;
		
		for (i = 0; i < $.model.length; i++) {
			c = $.model.charAt(i);
			if (ch.indexOf(c) == -1) {
				if (hostnameLen == 0 || (hostnameLen > 0 && hostname.charAt(hostnameLen - 1) == "_"))
					continue;
				else {
					hostname += "_";
					hostnameLen++;
				}	
			}	
			else {
				hostname += c;
				hostnameLen++;
			}	
		}
		
		return ((hostnameLen > 0 && hostname.charAt(hostnameLen - 1) == "_") ? hostname.substr(0, hostnameLen - 1) : hostname);
	},

	trans: function(obj) {
		var elems = ["input", "option", "span", "td", "th", "b", "p", "label", "h3", "h5", "button", "a"];
		var strs = $.curPage ? n_str[$.curPage.match(/(\w+)\.htm$/)[1]] : [];
		for (var i in strs) {
			if (obj.prop('id') == i) {
				$.chgElem(obj.get(0), strs[i]);
			} else {
				$.chgElem(obj.find('#' + i).get(0), strs[i]);
			}
		}

		$.each(elems, function(){
			if (obj.is('' + this)) {
				var tag;
				tag = obj.prop('class').match(/\bT_(\w+)\b/);
				if (tag && tag[1]) {
					if (s_str[tag[1]] !== undefined) {
						$.chgElem(obj.get(0), s_str[tag[1]]);
					} else if(m_str[tag[1]] !== undefined) {
						$.chgElem(obj.get(0), m_str[tag[1]]);
					} else if (strs[tag[1]] !== undefined) {
						$.chgElem(obj.get(0), strs[tag[1]]);
					}
				}		
			}
			$.each(obj.find('' + this), function() {
				var tag;
				tag = $(this).prop('class').match(/\bT_(\w+)\b/);
				if (tag && tag[1]) {
					if (s_str[tag[1]] !== undefined) {
						$.chgElem($(this).get(0), s_str[tag[1]]);
					} else if(m_str[tag[1]] !== undefined) {
						 $.chgElem($(this).get(0), m_str[tag[1]]);
					} else if (strs[tag[1]] !== undefined) {
						$.chgElem($(this).get(0), strs[tag[1]]);
					}
				}
			});
		});
	},

	randomId : function(type){
		return type+"-"+parseInt(Math.random()*1000*1000*1000*10, 10).toString();
	},

	setCentralPosition: function(me) {
	    var me = me || this;

	    var posX = parseInt(($(window).width() - me.width()) / 2, 10);
	    var posY = parseInt(($(window).height() - me.height()) / 2, 10);

	    me.css({
	        left: posX,
	        top: posY
	    });

	    return {
	        x: posX,
	        y: posY
	    }
	},

	setFixedCentral: function (me) {
		var me = me || this;
		 
		var posX = parseInt(($(window).width() - me.width()) / 2, 10);
		var posY = parseInt(($(window).height() - me.height()) / 2, 10);
		 
		me.css({
	        left: posX,
	        top: posY,
	        bottom:"auto",
	        right:"auto",
	        position: "fixed"
	    });
	 
	    var changeSize = function() {
	        posX = parseInt(($(window).width() - me.width()) / 2, 10);
	        posY = parseInt(($(window).height() - me.height()) / 2, 10);
	 
	        me.css({
	        left: posX,
		        top: posY
	     });
	    };
	 
	    $(window).off("resize.setfixed");
	    $("body").off("resize.setfixed");
	    $(window).on("resize.setfixed", changeSize);
	    $("body").on("resize.setfixed", changeSize);
	},

	initCover: function() {
	    var tmp = $("div.mask#mask").length == 0 ? $("<div id=\"mask\" class=\"mask page-cover\"><div id=\"cover-loading\"></div></div>").appendTo($("body")) : $("div.mask#mask");
	    var height;
	    var width;

	    height = $(window).height() > $(document).height() ? $(window).height() : $(document).height();
	    width = $(window).width() > $(document).width() ? $(window).width() : $(document).width();
	    tmp.width(width).height(height);

	    var changeSize = function() {
	        height = $(window).height() > $(document).height() ? $(window).height() : $(document).height();
	        width = $(window).width() > $(document).width() ? $(window).width() : $(document).width();

	        tmp.width(width).height(height);

	    };

	    $(window).on("resize", changeSize);
	    $("body").resize(changeSize);
	},

	showCover: function() {
	    var tmp = $("div.mask#mask").length == 0 ? $("<div id=\"mask\" class=\"mask\"><div id=\"cover-loading\"></div></div>").appendTo($("body")) : $("div.mask#mask");
	    tmp.fadeIn(200, function() {
	        $(this).css("display", "block");
	        if ($.browser.msie) {
            	$(this).css("filter", "alpha(opacity=70)");
	        }
	    });
	},

	hideCover: function() {
	    var tmp = $("div.mask#mask").length == 0 ? $("<div id=\"mask\" class=\"mask\"><div id=\"cover-loading\"></div></div>").appendTo($("body")) : $("div.mask#mask");

	    tmp.fadeOut(200, function() {
	        $(this).css("display", "none");
	    })
	},

	showWaiting: function() {
		var	detBox = $("#cover-loading"),
			width = 0,
			height = 0,
			con = $("#mask"),
			docWidth = document.documentElement.clientWidth,
			docHeight = document.documentElement.clientHeight;

		detBox.css("display", "block");
		var width = detBox.get(0).offsetWidth;
		var height = detBox.get(0).offsetHeight;
		var marginX = docWidth > width ? -(width/2) : 0;
	    var marginY = docHeight > height ? -(height/2) : 0;
		var left = marginX == 0 ? 0 : '50%';
	    var top = marginY == 0 ? 0 : '50%';
		detBox.css({left: left, top: top});
	},

	initTpAlert: function() {
	    var tmp = $("div.alert-container").length == 0 ? $("<div id=\"alert-container\" class=\"alert-container\"></div>").appendTo($("body")) : $("div.alert-container");
	    tmp.tpAlert();
	},

	initTpConfirm: function() {
	    var tmp = $("div.confirm-container").length == 0 ? $("<div id=\"confirm-container\" class=\"confirm-container\"></div>").appendTo($("body")) : $("div.confirm-container");
	    tmp.tpConfirm();
	},

	/**
	* The base implementation of `_.indexOf` without support for binary searches
	* or `fromIndex` constraints.
	*
	* @private
	* @param {Array} array The array to search.
	* @param {*} value The value to search for.
	* @param {number} [fromIndex=0] The index to search from.
	* @returns {number} Returns the index of the matched value or `-1`.
	*/
	baseIndexOf: function(array, value, fromIndex) {
		var index = (fromIndex || 0) - 1,
		length = array ? array.length : 0;

		while (++index < length) {
			if (array[index] === value) {
				return index;
			}
		}
		return -1;
	},

	errorTip: function(id, content) {
		var str;
        var errno = content;
        if ($.isNumeric(errno)) {
	        if (e_str[errno]) {
	            str = e_str[errno];
	        } else { 
	            str = e_str[ERR_UNKOWN];
	        }
	    } else {
	    	str = content;
	    }
	    str += '&nbsp;<i>' + s_str.clickhide + '</i>';
		$('#' + id + '_tips').show('fast');
		$('#' + id + '_tips_content').html(str);
	}

});


        /****************************************************************************************/
		if ($.local || $.sim)
		{
			$.io($.params, true);
			$.io($.localparams, true);
			$.io("./js/oid_path.js", true);
			loadXml();
			$.exe = localexe;	
		}	
		/****************************************************************************************/	

(function ($) {
	$.fn.divmask = function () {
		$(this).parent().append('<div class="div-mask"> </div>');
	}

	$.fn.unmask = function () {
		$(this).parent().find(".div-mask").remove();
	}
})(jQuery); 

$(document).ready(function(){
	//$.h = $.html;
	$.unloadCover = $.unlock;
	$.initCover();
	$.initTpAlert();
	$.initTpConfirm();
	try{document.execCommand('BackgroundImageCache', false, true);}catch(e){};
	
	var newcss = function() {
		var link = $.c("link");
		link.rel = "Stylesheet";
		link.type = "text/css";
		return link;
	}
	var css = newcss();
	if ($.browser.msie) {
		switch(parseInt($.browser.version, 10)) {
	case 8:
		case 9:
		case 10:
			css.href = "./css/ie.file.css"; 
			break;
	default:
			break;
	}
	}

	
	$.head.insertBefore(css, $.head.firstChild);
	
	$.w.onresize=$.resize;
	
	$.attach(document.documentElement, "keydown", function(e){
		var key = e.keyCode ? e.keyCode : e.charCode;
		if (key == 116) {
			$.refresh();
			if (document.all) {
				e.keyCode = 0;
				e.returnValue = false;
			}
			else {
				e.cancelBubble = true;
				e.preventDefault();
			}
		}
	});
	
	if ($.local)
		$.io($.params, true);

	var infoobj = $.act(ACT_GET, IGD_DEV_INFO, null, null, ["modelName", "description", "X_TP_IsFD"]);
	var ethobj = $.act(ACT_GET, ETH_SWITCH, null, null, ["numberOfVirtualPorts"]);
	var sysmodeobj;
	if (INCLUDE_WAN_MODE)
		sysmodeobj = $.act(ACT_GET, SYS_MODE, null, null, ["mode"]);

	$.act(ACT_CGI, "/cgi/info");
	
	$.exe();
	if ($.local) {
		infoobj = {modelName: "TD-W89741N", description: "ADSL+ Router"};
		ethobj = {numberOfVirtualPorts: 4};
		sysmodeobj = {mode:"DSL"};
	}

	if ($.sim) {
		infoobj = {modelName: "Archer C3200", description: "Wireless Tri-Band Gigabit Router"};
	}
	
	$.model = infoobj.modelName;
	$.desc = infoobj.description;
	$.ports = parseInt(ethobj.numberOfVirtualPorts, 10);
	
	if (INCLUDE_WAN_MODE)
		$.sysMode = sysmodeobj.mode;
	
	try { if ($.model) document.title = $.model; } catch(e) {}
	$.isFD = infoobj.X_TP_IsFD;

    /*preload image*/
    var img = new Image();
	img.src = '/img/loading.gif';
    delete img;

    document.getElementById("scroll").onscroll = $.mainScroll;

    $(function() {
        if (typeof Object.getPrototypeOf !== 'function') {
            if (typeof 'test'.__proto__ === 'object') {
                Object.getPrototypeOf = function(object) {
                    return object.__proto__;
                };
            } else {
                Object.getPrototypeOf = function(object) {
                    return object.constructor.prototype;
                };
            };
        };
    });
});