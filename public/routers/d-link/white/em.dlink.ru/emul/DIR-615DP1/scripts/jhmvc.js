function getUID() {
    return window.jhmvcUID++
}

function dummyFunc() {}

function extend(Child, Parent) {
    var F = function() {};
    F.prototype = Parent.prototype, Child.prototype = new F, Child.prototype.constructor = Child, Child.superclass = Parent.prototype, Child.prototype.getAncestry = function() {
        return arr = Child.superclass.getAncestry(), arr.push(Child), arr
    }, Parent.superclass || (Parent.prototype.getAncestry = function() {
        return [Parent]
    })
}

function no() {
    for (var i = 0; i < arguments.length; i++)
        if (val = arguments[i], void 0 == val || null == val) return !0;
    return !1
}

function sprintf() {
    var iCount, iPadLength, aMatch, bAlignLeft, sPad, iWidth, iPrecision, sType, iMatchIndex = 1,
        aArgs = sprintf.arguments;
    if (aArgs.length < 2) return "";
    for (var i, sFormat = aArgs[0], re = /%(-)?(0| |'.)?(\d+)?(\.\d*)?([bcdfosxX]{1})/; re.test(sFormat);) {
        for (aMatch = re.exec(sFormat), i = 0; i < aMatch.length; i++) aMatch[i] = aMatch[i] ? aMatch[i] : "";
        if (bAlignLeft = "-" == aMatch[1], sPad = "" == aMatch[2] ? " " : aMatch[2], "'" == sPad.substring(0, 1) && (sPad = sPad.substring(1)), sPad = "", iWidth = aMatch[3] > 0 ? parseInt(aMatch[3]) : 0, sType = aMatch[5], mArgument = null != aArgs[iMatchIndex] ? aArgs[iMatchIndex] : "", ++iMatchIndex, mArgument.toString().length) {
            switch (-1 != "fbcdoxX".indexOf(sType) && isNaN(mArgument) && (mArgument = 0), sType) {
                case "f":
                    var iPower = Math.pow(10, iPrecision);
                    mArgument = (Math.round(parseFloat(mArgument) * iPower) / iPower).toString();
                    var aFloatParts = mArgument.split(".");
                    if (iPrecision = aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 6, iPrecision > 0) {
                        for (1 == aFloatParts.length && (aFloatParts[1] = ""), iCount = aFloatParts[1].length; iPrecision > iCount; iCount++) aFloatParts[1] += "0";
                        mArgument = aFloatParts[0] + "." + aFloatParts[1]
                    }
                    else mArgument = aFloatParts[0];
                    iPadLength = aFloatParts[0].length;
                    break;
                case "b":
                    mArgument = parseInt(mArgument).toString(2), iPadLength = mArgument.length;
                    break;
                case "c":
                    mArgument = String.fromCharCode(parseInt(mArgument));
                    break;
                case "d":
                    mArgument = mArgument.toString(), iPadLength = mArgument.length;
                    break;
                case "o":
                    mArgument = parseInt(mArgument).toString(8), iPadLength = mArgument.length;
                    break;
                case "x":
                    mArgument = parseInt(mArgument).toString(16), iPadLength = mArgument.length;
                    break;
                case "X":
                    mArgument = parseInt(mArgument).toString(16).toUpperCase(), iPadLength = mArgument.length;
                    break;
                default:
                    mArgument = mArgument.toString(), iPadLength = mArgument.length
            }
            if (("b" == sType || "d" == sType || "o" == sType || "x" == sType || "X" == sType) && (iPrecision = aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 1, iPrecision > mArgument.length)) {
                for (zeros = "", i = 0; i < iPrecision - mArgument.length; i++) zeros += "0";
                mArgument = zeros + mArgument
            }
            if (-1 != "fbdoxX".indexOf(sType))
                if (bAlignLeft)
                    for (iCount = iPadLength; iWidth > iCount; iCount++) mArgument += sPad;
                else
                    for (iCount = iPadLength; iWidth > iCount; iCount++) mArgument = sPad + mArgument
        }
        sFormat = sFormat.replace(re, mArgument)
    }
    return sFormat
}

function jsModel() {
    this.ctrl = null
}

function jsView(ctrl, viewInx, options) {
    if (!no(ctrl, viewInx)) {
        if (this.viewInx = viewInx, this.ctrl = ctrl, this.options = options ? options : {}, jsView.prototype.updateModel = function() {
                var child = null,
                    children = null,
                    res = !this.statusCode;
                children = this.ctrl.children;
                for (var i in children) child = this.getChild(i), child instanceof jsView && (res &= child.updateModel());
                return this.ctrl.event("updmodel", this.ctrl.model), res
            }, jsView.prototype.updateView = function() {
                var child = null,
                    children = null;
                children = this.ctrl.children;
                for (var i in children) child = this.getChild(i), child instanceof jsView && child.updateView()
            }, jsView.prototype.bind = function(eventType, handler) {
                this.ctrl.addEventHandler(eventType, handler, this.viewInx)
            }, this.getParent = function(arg) {
                var obj = this.ctrl.getParent(arg);
                return obj.views && (obj = obj.views[this.viewInx]), obj
            }, this.getChild = function() {
                var obj = this.ctrl.getChild.apply(this.ctrl, arguments);
                return obj.views && (obj = obj.views[this.viewInx]), obj
            }, !options.plainIface) {
            var child, children = this.ctrl.children;
            for (var i in children) child = children[i], child instanceof jsController && child.changeIface(viewInx, this, this.options)
        }
        jsView.prototype.validate = function() {
            var res = !this.statusCode,
                obj = null,
                children = this.ctrl.children;
            if (children.length)
                for (var i in children) obj = this.getChild(i), obj instanceof jsView && (res &= obj.validate());
            return res
        }, jsView.prototype.setOption = function(name, value) {
            var child, children = this.ctrl.children;
            this.options[name] = value;
            for (var i = 0; i < children.length; i++) child = this.getChild(i), child instanceof jsView && child.setOption(name, value)
        }, this.statusCode = null
    }
}

function jsController() {
    this.addIface = function(parentView, parentOptions) {
        var viewInx = window.getUID();
        return this.changeIface(viewInx, parentView, parentOptions), viewInx
    }, this.unlinkIface = function(viewInx) {
        var child, children = this.children,
            handlers = this.handlers;
        for (var i in children) child = children[i], child instanceof jsController && child.unlinkIface(viewInx);
        this.views[viewInx] = null;
        for (var i in handlers) handlers[i][viewInx] = null
    }, this.changeIface = function(viewInx, parentView, parentOptions) {
        var options = new Object,
            pOptions = parentOptions ? parentOptions : {};
        if (this.nextIface) iface = this.ifaceTypes[this.nextIface], this.lastIface = this.nextIface, this.nextIface = null, iface && ($.extend(options, pOptions, iface.options ? iface.options : {}), this.views[viewInx] = new iface.type(this, viewInx, options));
        else if (this.parent) {
            ancestors1 = parentView.getAncestry(), iface = null, ifaceTypes = this.ifaceTypes;
            for (var i = ancestors1.length - 1; i >= 0; i--) {
                ancestor1 = ancestors1[i], cmin = 1e6, jj = -1;
                for (var j in ifaceTypes) ancestors2 = ifaceTypes[j].type.prototype.getAncestry(), inx = $.inArray(ancestor1, ancestors2), inx >= 0 && (ccur = ancestors2.length - 1 - inx, cmin >= ccur && (ccur == cmin ? ifaceTypes[j].def && (iface = ifaceTypes[j]) : (iface = ifaceTypes[j], cmin = ccur)));
                if (iface) break
            }
            iface && ($.extend(options, pOptions, iface.options ? iface.options : {}), this.views[viewInx] = new iface.type(this, viewInx, options))
        }
    }, this.changeChild = function(childInx, childObj, alias) {
        return this.children[childInx] = childObj, childObj.integrate(childInx, this), alias && this.children[childInx].setAlias(alias), this.active && !childInx && this.activateToBottom && childObj.activate(), childObj
    }, this.setAlias = function(alias) {
        this.alias = alias, this.parent && (this.parent.children_refs[alias] = this)
    }, this.addChild = function() {
        for (var j = -1, i = 0; i < arguments.length; i++)
            if (arguments[i] instanceof jsController) j = this.children.length, this.changeChild(j, arguments[i]);
            else if (j >= 0) {
            var obj = this.getChild(j),
                alias = arguments[i];
            obj.setAlias(alias)
        }
        return arguments[0]
    }, this.changeModel = function(modelObj) {
        this.model = modelObj, this.model.ctrl = this
    }, this.deactivateChild = function() {
        if (this.childActiveInx >= 0) {
            var child = this.children[this.childActiveInx];
            child.root || (child.event("predeactivate"), child.deactivateChild(), child.active = !1, child.activatedByIface = null, this.childActiveInx = -1, child.event("deactivate"))
        }
    }, this.unlinkChild = function(id) {
        if ("NaN" != parseInt(id, 10).toString()) {
            var alias = this.children[id].alias;
            this.children.splice(id, 1), alias && delete this.children_refs[alias], this.childActiveInx == id && (this.childActiveInx = -1)
        }
        else {
            var inx = this.getInxByAlias(id);
            this.children.splice(inx, 1), delete this.children_refs[id], this.childActiveInx == inx && (this.childActiveInx = -1)
        }
    }, this.activate = function(force) {
        this.event("preactivate"), force || this.parent && !this.root && (this.parent.active ? (this.parent.deactivateChild(), this.parent.childActiveInx = this.thisInx) : (this.parent.childActiveInx = this.thisInx, this.parent.activatedByIface = this.activatedByIface, this.parent.activate())), this.active = !0, this.event("activate"), this.childActiveInx < 0 ? this.activateToBottom && this.children.length && (this.children[0].activatedByIface = this.activatedByIface, this.children[0].activate(!0), this.childActiveInx = 0) : this.children[this.childActiveInx].active && !this.activateToBottom && this.deactivateChild()
    }, this.event = function(eventType, eventObject, bubble) {
        var handlers, parent, handler, res = !0;
        if (handlers = this.ctrlHandlers[eventType], handlers instanceof Array)
            for (var i in handlers) handler = handlers[i], handler instanceof Function && (res &= handlers[i].call(this, eventObject), bubble = !0);
        if (handlers = this.handlers[eventType])
            for (var i in handlers) handler = handlers[i], handler instanceof Function && (res &= handlers[i].call(this.views[i], eventObject), bubble = !0);
        res && bubble && (parent = this.getParent(), parent instanceof jsController && parent.event(eventType, eventObject, bubble))
    }, this.addEventHandler = function(eventType, handler, viewInx) {
        no(eventType) || no(handler) || (no(viewInx) ? (this.ctrlHandlers[eventType] instanceof Array || (this.ctrlHandlers[eventType] = []), this.ctrlHandlers[eventType].push(handler)) : (this.handlers[eventType] || (this.handlers[eventType] = new Array), this.handlers[eventType][viewInx] = handler))
    }, this.getParent = function(arg) {
        var type, i;
        if (arg instanceof Object)
            for (i = -1, type = arg, obj = this; i;) {
                if (i--, obj = obj.parent, no(obj)) {
                    obj = {};
                    break
                }
                if (type && obj instanceof type) break
            }
        else {
            for (i = no(arg) ? 1 : arg, obj = this; i && !no(obj.parent);) i--, obj = obj.parent;
            i > 0 && (obj = {})
        }
        return obj
    }, this.getChild = function() {
        var obj, j, l = arguments.length;
        if (l) {
            obj = this;
            for (var i = 0; l > i && (j = arguments[i], obj = "NaN" == parseInt(j).toString() ? obj.children_refs[j] : obj.children[j], obj); i++);
        }
        else obj = this.children[0];
        return obj || (obj = {}), obj
    }, this.getInxByAlias = function(alias) {
        var child, children = this.children,
            inx = null;
        for (var i in children)
            if (child = children[i], child instanceof jsController && child.alias == alias) {
                inx = i;
                break
            }
        return inx
    }, jsController.prototype.integrate = function(childInx, parent) {
        this.thisInx = childInx, this.parent = parent, this.activateToBottom = parent.activateToBottom
    }, jsController.prototype.describe = function(obj) {
        var child, typeParser, children, children_refs;
        for (var i in obj) {
            if (typeParser = controlTypes[obj[i].type], typeParser && typeParser(obj[i]), obj instanceof Array ? (child = this.getChild(obj[i].alias), child instanceof jsController || (child = this.addChild(obj[i].ctrl, obj[i].alias))) : (child = this.getChild(obj[i].inx), child instanceof jsController || (child = this.changeChild(obj[i].inx, obj[i].ctrl, i))), child.nextIface = obj[i].nextIface, obj[i].options && child.nextIface && child.ifaceTypes[child.nextIface]) {
                var srcOpt = child.ifaceTypes[child.nextIface].options;
                srcOpt = srcOpt ? srcOpt : {}, child.ifaceTypes[child.nextIface].options = $.extend(!0, srcOpt, obj[i].options)
            }
            if (obj[i].children_refs) {
                children_refs = obj[i].children_refs, obj[i].children = [], children = obj[i].children;
                for (var j in children_refs) children[children_refs[j].inx] = children_refs[j], children[children_refs[j].inx].alias = j
            }
            obj[i].children && this.getChild(i).describe(obj[i].children)
        }
    }, this.ifaceTypes = {}, jsController.prototype.privilege = "admin", this.children = new Array, this.children_refs = new Object, this.parent = null, this.model = null, this.views = new Array, this.serverUrl = null, this.active = !1, this.activatedByIface = null, this.childActiveInx = -1, this.thisInx = 0, this.ctrlHandlers = {}, this.handlers = new Array, this.activateToBottom = !0, this.nextIface = null, this.lastIface = null, this.totalIfaceCount = 0, this.alias = null, this.root = !1
}

function jsSSideView(ctrl, viewInx, options) {
    options = options ? options : {}, options.action ? (this.sender = this, options.sender = this, this.action = options.action, options.action = null) : this.sender = options.sender, options.method && (this.method = options.method, options.method = null), jsSSideView.superclass.constructor.call(this, ctrl, viewInx, options), this.sendSuccess = function(data) {
        this.xmlhttprequest = null;
        try {
            if (this.responseData = data ? data : {}, this.rootCtrl || (this.rootCtrl = window.rootCtrl), this.rootCtrl.checkServerData instanceof Function && !this.rootCtrl.checkServerData(this.responseData)) return
        }
        catch (e) {
            this.responseData = {
                baddata: !0
            }
        }
        this.updateModel(!0), this.refreshTime > 0 && (this.refreshId = setTimeout(context(this).callback(this.updateView), this.refreshTime))
    }, this.updateView = function() {
        this.action && (this.requestData = null), this.prepareData instanceof Function && this.prepareData(), jsSSideView.superclass.updateView.call(this), this.action && !window.isIdle && this.sendRequest()
    }, this.updateModel = function(force) {
        return (this.action && force || !this.action) && (this.cancel = !1, this.pickData instanceof Function && this.pickData(), !this.cancel) ? jsSSideView.superclass.updateModel.call(this) : !0
    }, this.sendRequest = function() {
        var url = ctrl.serverUrl ? ctrl.serverUrl : "";
        if ($(window).bind("ajaxError", context(this).callback(this.onajaxerror)), this.requestData += "&proxy=y", mode_emul) {
            var action = this.action.toString(),
                url = CGI_URL,
                patt = /index.cgi$/;
            patt.test(action) || (url = url.replace("index.cgi", ""), url += action), device.request(url, this.method, this.requestData, context(this).callback(this.sendSuccess))
        }
        else device.request(url + "/" + this.action, this.method, this.requestData, context(this).callback(this.sendSuccess))
    }, this.onajaxerror = function() {
        var isItMyError = this.xmlhttprequest && 4 == this.xmlhttprequest.readyState && 200 != this.xmlhttprequest.status;
        isItMyError && (this.xmlhttprequest = null), isItMyError && this.refreshTime > 0 && !this.stopOnAjaxError && (this.refreshId = setTimeout(context(this).callback(this.updateView), this.refreshTime))
    }, this.addToRequest = function(obj) {
        var sender = this.sender,
            splitter = "";
        if (this.options.dataType && "json" == this.options.dataType) sender.requestData = $.toJSON(obj);
        else {
            sender.requestData ? splitter = "&" : (splitter = "", sender.requestData = ""), this.rootCtrl || (this.rootCtrl = window.rootCtrl);
            for (var key in obj) this.rootCtrl.checkClientData instanceof Function && (obj[key] = this.rootCtrl.checkClientData(obj[key])), sender.requestData += splitter + key + "=" + obj[key], splitter = "&"
        }
    }, this.startRefresh = function(delay, period, stopOnAjaxError) {
        period > 0 && (this.refreshTime = period, this.stopOnAjaxError = stopOnAjaxError, delay = delay ? delay : 0, this.refreshId = setTimeout(context(this).callback(this.updateView), delay))
    }, this.stopRefresh = function() {
        clearTimeout(this.refreshId), this.refreshId = null, this.refreshTime = 0, this.stopOnAjaxError = !1
    }, this.requestData = null, this.responseData = null, this.prepareData = null, this.refreshTime = 0, this.rootCtrl = null, this.refreshId = null, this.xmlhttprequest = null, this.stopOnAjaxError = !1, this.bind("stoprefreshrq", this.stopRefresh)
}

function jsCSideView(ctrl, viewInx, options) {
    options.hide && (this.hidden = options.ishidden = options.hide, options.hide = !1), jsCSideView.superclass.constructor.call(this, ctrl, viewInx, options), jsCSideView.prototype.drawView = function() {
        var child = null,
            children = null,
            options = this.options,
            $viewbox = $(options.viewBoxSel);
        options.hide && (this.hidden = options.hide, this.setOption("ishidden", options.hide), options.hide = !1), this.bindDOMEvent("click", this.onclick), this.hidden && this.hide(), no($viewbox.attr("id")) && $viewbox.attr("id", "viewbox" + getUID()), children = this.ctrl.children;
        for (var i in children) child = this.getChild(i), child instanceof jsCSideView && child.drawView()
    }, this.correctModalOverlay = function() {
        $("#modalOverlayBox").css({
            width: $(document).width(),
            height: $(document).height()
        })
    }, jsCSideView.prototype.showModalOverlay = function(message) {
        if (0 == $("#modalOverlayBox").length && $("body").append("<div id='modalOverlayBox' class='overlay' style='display: none;' ><input type='hidden' value='0' /><div class='message'><div></div></div></div>"), this.isWin) {
            var winCount = new Number($("#modalOverlayBox>input").val());
            $("#modalOverlayBox>input").val(winCount + 1)
        }
        if ($("body").css("overflow", "hidden"), $("#modalOverlayBox").css({
                left: 0,
                top: 0,
                width: $(document).width(),
                height: $(document).height(),
                display: "block",
                opacity: .7
            }), message) {
            $("#modalOverlayBox div.message").css("display", ""), $("#modalOverlayBox div.message>div").html(lng(message));
            var width = $("#modalOverlayBox div.message").width(),
                height = $("#modalOverlayBox div.message").height();
            $("#modalOverlayBox div.message").css({
                left: $(document).width() / 2 - width / 2,
                top: $(document).height() / 2 - height / 2
            })
        }
        else $("#modalOverlayBox div.message").css("display", "none"), $("#modalOverlayBox div.message>div").html("");
        $(window).bind("resize", context(this).callback(this.correctModalOverlay)), $(window).trigger("overlay.core", {
            visible: !0,
            obj: this
        })
    }, jsCSideView.prototype.hideModalOverlay = function() {
        var winCount = new Number($("#modalOverlayBox>input").val());
        this.isWin && $("#modalOverlayBox>input").val(--winCount), $("#modalOverlayBox").is(":hidden") || winCount > 0 || ($("#modalOverlayBox").fadeOut(600, function() {
            $(this).css({
                width: "0px",
                height: "0px",
                display: "none"
            }), $("body").css("overflow", "auto")
        }), $("#modalOverlayBox div.message").css("display", "none"), $(window).unbind("resize", context(this).callback(this.correctModalOverlay)), $(window).trigger("overlay.core", {
            visible: !1,
            obj: this
        }))
    }, jsCSideView.prototype.hide = function() {
        this.hidden = !0, this.setOption("ishidden", !0), $(this.options.viewBoxSel).css("display", "none")
    }, jsCSideView.prototype.show = function() {
        this.hidden = !1, this.unSetOptionHidden(), $(this.options.viewBoxSel).css("display", "")
    }, jsCSideView.prototype.unSetOptionHidden = function() {
        for (var child, children = this.ctrl.children, i = 0; i < children.length; i++) child = this.getChild(i), child && !child.hidden && child.unSetOptionHidden();
        this.options.ishidden = !1
    }, jsCSideView.prototype.bindDOMEvent = function(eventType, handler) {
        $(this.myBoxSel).bind(eventType, {}, context(this).callback(handler))
    }, jsCSideView.prototype.onblur = dummyFunc, jsCSideView.prototype.onchange = dummyFunc, jsCSideView.prototype.onclick = function(event) {
        return event.target == event.currentTarget && (this.ctrl.activatedByIface = this.viewInx, this.ctrl.activate()), !0
    }, jsCSideView.prototype.ondblclick = dummyFunc, jsCSideView.prototype.onerror = dummyFunc, jsCSideView.prototype.onfocus = dummyFunc, jsCSideView.prototype.onfocusin = dummyFunc, jsCSideView.prototype.onfocusout = dummyFunc, jsCSideView.prototype.onhover = dummyFunc, jsCSideView.prototype.onkeydown = dummyFunc, jsCSideView.prototype.onkeypress = dummyFunc, jsCSideView.prototype.onkeyup = dummyFunc, jsCSideView.prototype.onmousedown = dummyFunc, jsCSideView.prototype.onmouseenter = dummyFunc, jsCSideView.prototype.onmouseleave = dummyFunc, jsCSideView.prototype.onmousemove = dummyFunc, jsCSideView.prototype.onmouseout = dummyFunc, jsCSideView.prototype.onmouseover = dummyFunc, jsCSideView.prototype.onmouseup = dummyFunc, jsCSideView.prototype.onresize = dummyFunc, jsCSideView.prototype.onscroll = dummyFunc, jsCSideView.prototype.onselect = dummyFunc, jsCSideView.prototype.onsubmit = dummyFunc, options.viewBoxSel || (options.viewBoxSel = null), options.myBoxSel || (options.myBoxSel = options.viewBoxSel), options.childBoxSel || (options.childBoxSel = options.viewBoxSel), this.viewBoxSel = options.viewBoxSel, this.myBoxSel = options.myBoxSel, this.childBoxSel = options.childBoxSel, this.isWin = !1
}

function jsViewTree(ctrl, viewInx, options) {
    jsViewTree.superclass.constructor.call(this, ctrl, viewInx, options), options || (options = {}), jsViewTree.prototype.drawView = function() {
        var children, lft, rgt, child, alias = this.ctrl.alias ? this.ctrl.alias : "",
            htmlToAppend = "",
            anchor_href = "";
        if (children = this.options.plainIface ? [] : this.ctrl.children, this.getParent(1) instanceof jsViewTree ? (this.path = this.getParent().path + "/" + alias, this.rootOfTree = this.getParent().rootOfTree) : (this.ctrl.root = !0, this.path = alias, this.rootOfTree = this), this.options.noPath ? (this.path = "", anchor_href = "") : anchor_href = " href='#" + this.path + "' ", "fastmenu" == this.style) {
            this.ctrl.root ? ($(this.viewBoxSel).html("<div></div>"), this.myBoxSel = this.viewBoxSel + ">div", $(this.viewBoxSel).addClass("fastmenu"), $(this.myBoxSel).css("display", "none")) : ($(this.viewBoxSel).html("<a " + anchor_href + "></a>"), this.myBoxSel = this.viewBoxSel + ">a"), children.length ? (this.childBoxSel = this.viewBoxSel + ">ul", $(this.viewBoxSel).append("<ul></ul>")) : this.childBoxSel = null, htmlToAppend = "";
            for (var i = 0; i < children.length; i++) htmlToAppend += "<li></li>", child = this.getChild(i), child.options.viewBoxSel = this.childBoxSel + ">li:eq(" + i + ")", child.viewBoxSel = this.childBoxSel + ">li:eq(" + i + ")";
            $(this.childBoxSel).append(htmlToAppend)
        }
        else {
            this.ctrl.getParent(2).root ? ($(this.viewBoxSel).html("<a " + anchor_href + "></a>"), this.myBoxSel = this.viewBoxSel + ">a") : this.ctrl.root ? ($(this.viewBoxSel).html("<div></div>"), this.myBoxSel = this.viewBoxSel + ">div", $(this.viewBoxSel).addClass("tabs1" == this.style ? "menu" : "menuvert1"), $(this.myBoxSel).css("display", "none")) : "tabs1" == this.style ? (lft = "class = 'lft'", rgt = "class = 'rgt'", $(this.viewBoxSel).html("<a " + anchor_href + "><em " + lft + "></em><b></b><em " + rgt + "></em></a>"), this.myBoxSel = this.viewBoxSel + ">a>b") : ($(this.viewBoxSel).html("<a " + anchor_href + "></a>"), this.myBoxSel = this.viewBoxSel + ">a"), children.length ? (this.childBoxSel = this.viewBoxSel + ">ul", $(this.viewBoxSel).append("<ul></ul>")) : this.childBoxSel = null, htmlToAppend = "";
            for (var i = 0; i < children.length; i++) htmlToAppend += "<li></li>", child = this.getChild(i), child.options.viewBoxSel = this.childBoxSel + ">li:eq(" + i + ")", child.viewBoxSel = this.childBoxSel + ">li:eq(" + i + ")";
            $(this.childBoxSel).append(htmlToAppend), "tabs1" != this.style && (this.ctrl.active ? this.onactivate() : this.ondeactivate()), this.ctrl.active || this.open || this.ctrl.root ? $(this.childBoxSel).css("display", "") : $(this.childBoxSel).css("display", "none")
        }
        children.length && (1 == children.length ? $(this.getChild(0).viewBoxSel).addClass("nodesingle") : ($(this.getChild(0).viewBoxSel).addClass("nodefirst"), $(this.getChild(children.length - 1).viewBoxSel).addClass("nodelast"))), jsViewTree.superclass.drawView.call(this), this.ctrl.root && "fastmenu" == this.style && $(this.viewBoxSel + " ul li").hover(function() {
            $(this).find("ul").stop(!0, !0), $(this).find("ul").slideDown("normal")
        }, function() {
            $(this).find("ul").slideUp("normal")
        })
    }, jsViewTree.prototype.onactivate = function() {
        return $(this.viewBoxSel).addClass(this.getClasses()), "fastmenu" != this.style && ("tabs1" != this.style && $(this.myBoxSel).css("font-weight", "bold"), this.open || $(this.childBoxSel).css("display", "")), !1
    }, jsViewTree.prototype.getClasses = function() {
        var classes = "",
            parent = this.ctrl.getParent();
        return parent instanceof jsController ? 1 == parent.children.length ? classes += "nodesingleactive" : this.ctrl.thisInx < parent.children.length - 1 && this.ctrl.thisInx > 0 ? classes += "nodeactive" : (0 == this.ctrl.thisInx && (classes += " nodefirstactive"), this.ctrl.thisInx == parent.children.length - 1 && (classes += " nodelastactive")) : classes += "nodesingleactive", classes
    }, jsViewTree.prototype.ondeactivate = function() {
        return $(this.viewBoxSel).removeClass(this.getClasses()), "fastmenu" != this.style && ("tabs1" != this.style && $(this.myBoxSel).css("font-weight", "normal"), this.open || $(this.childBoxSel).css("display", "none")), !1
    }, this.bind("activate", this.onactivate), this.bind("deactivate", this.ondeactivate), this.style = options.style, this.open = "tabs1" == this.style ? !0 : options.open, this.rootOfTree = null, this.path = ""
}

function jsMenuModel(nodeName) {
    jsMenuModel.superclass.constructor.call(this), this.nodeName = nodeName
}

function jsMenuController(nodeName, options) {
    no(nodeName) || (jsMenuController.superclass.constructor.call(this), options || (options = {}), this.contentOptions || (this.contentOptions = []), options.contentClass && (this.contentClass = options.contentClass), options.contentOptions && (this.contentOptions = options.contentOptions), this.changeModel(new jsMenuModel(nodeName)), this.ifaceTypes.tree = {
        type: jsMenuView,
        def: !0
    }, this.integrate = function(childInx, parent) {
        jsMenuController.superclass.integrate.call(this, childInx, parent), this.frame || (this.frame = this.getParent(1).frame), parent = this.getParent(1), parent instanceof jsMenuController && parent.level >= 0 && (this.level = this.getParent(1).level + 1)
    }, this.createContent = function() {
        return this.contentClass && (this.contentCtrl = new this.contentClass, this.contentClass.apply(this.contentCtrl, this.contentOptions)), this.contentCtrl
    }, this.onactivate = function() {
        return this.createContent(), frame = this.frame, frame && frame.event("menuchange", this), !1
    }, this.addEventHandler("activate", this.onactivate), this.level = 0, this.frame = options.frame, this.contentCtrl = null, this.selectedByView = null)
}

function jsMenuView(ctrl, viewInx, options) {
    jsMenuView.superclass.constructor.call(this, ctrl, viewInx, options), jsMenuView.prototype.drawView = function() {
        jsMenuView.superclass.drawView.call(this), $(this.myBoxSel).html(lng(this.ctrl.model.nodeName))
    }, jsMenuView.prototype.onactivate = function() {
        jsMenuView.superclass.onactivate.call(this), this.ctrl.selectedByView = this.viewInx
    }, this.bind("activate", this.onactivate)
}

function jsRecordSetModel(recordSet) {
    jsRecordSetModel.superclass.constructor.call(this), this.recordSet = recordSet ? recordSet : [], this.colsWidth = {}
}

function jsRecordSetController() {
    jsRecordSetController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsRecordSetClientView
    }, this.changeModel(new jsRecordSetModel), jsRecordSetController.prototype.onrecselect = function(recordInx) {
        return this.activeRecordInx = recordInx, !0
    }, this.addEventHandler("recselect", this.onrecselect), this.activeRecordInx = -1
}

function jsRecordSetClientView(ctrl, viewInx, options) {
    jsRecordSetClientView.superclass.constructor.call(this, ctrl, viewInx, options), void 0 == options.resizingOff && (options.resizingOff = !1), jsRecordSetClientView.prototype.drawView = function() {
        this.ctrl.activeRecordInx < 0 ? this.drawShowView() : this.drawEditView(), this.options.hide && (this.hidden = this.options.hide, this.setOption("ishidden", this.options.hide), this.options.hide = !1), this.hidden && this.hide()
    }, jsRecordSetClientView.prototype.setResizing = function() {
        var table = $(this.myBoxSel + ">table"),
            tds = $(table).find("tr:eq(0)>td"),
            colsWidth = this.ctrl.model.colsWidth,
            rtlIndex = "rtl" != $("body").css("direction") ? $(tds).length - 1 : 0;
        document.extra = {
            resizing: !1,
            oldX: 0,
            oldWidth: 0,
            currentTD: null
        }, $(tds).each(function(index) {
            if (rtlIndex != index) {
                void 0 != colsWidth[index.toString()] && $(this).css("width", colsWidth[index.toString()]);
                var thText = $(this).text(),
                    divTh = $("<div />").css({
                        width: "100%",
                        height: "100%",
                        position: "relative"
                    }),
                    resizer = $("<div />").css({
                        cursor: "col-resize",
                        height: "100%",
                        left: "100%",
                        position: "absolute",
                        top: "0px",
                        width: "5px"
                    });
                $(resizer).mousedown(function(e) {
                    return document.extra.resizing = !0, document.extra.oldX = e.pageX, document.extra.oldWidth = $(this).parents("td").width(), document.extra.currentTD = $(this).parents("td"), $("body").css("cursor", "col-resize"), $(resizer).parents("table").fadeTo("fast", .7), !1
                }), $(resizer).mouseup(function() {
                    return document.extra.resizing = !1, $("body").css("cursor", "default"), $(resizer).parents("table").fadeTo("slow", 1), colsWidth[$(document.extra.currentTD).index().toString()] = $(document.extra.currentTD).width(), !1
                }), $("body").mouseup(function() {
                    return document.extra.resizing ? ($(resizer).mouseup(), !1) : void 0
                }), $("body").mousemove(function(e) {
                    if (document.extra.resizing) {
                        var width = e.pageX - document.extra.oldX;
                        return $(document.extra.currentTD).css("width", document.extra.oldWidth + width), !1
                    }
                }), $(divTh).text(thText), $(divTh).append(resizer), $(this).html($(divTh))
            }
        })
    }, jsRecordSetClientView.prototype.drawShowView = function() {
        var idPrefix, recordSet = this.ctrl.model.recordSet,
            header = null,
            htmlToDraw = "";
        if (htmlToDraw = "<table id='oldGrid' class='gridTable' cellspacing='0' cellpadding='0'>", header = this.options.header, htmlToDraw += this.drawTh(), recordSet && recordSet.length) {
            idPrefix = "rsShow" + getUID() + "_", htmlToDraw += "<tbody>";
            for (var i = 0; i < recordSet.length; i++) htmlToDraw += this.drawTr(idPrefix, i);
            htmlToDraw += "</tbody>"
        }
        htmlToDraw += "</table>", this.options.viewBoxSel || (this.options.viewBoxSel = this.viewBoxSel), this.options.myBoxSel = this.options.viewBoxSel, this.myBoxSel = this.options.myBoxSel, this.options.childBoxSel = this.options.viewBoxSel, this.childBoxSel = this.options.childBoxSel, $(this.myBoxSel).html(htmlToDraw), this.options.resizingOff || this.setResizing();
        for (var i = 0; i < recordSet.length; i++) recordSet[i].extrattrs && recordSet[i].extrattrs.disabled ? $("#" + idPrefix + i).bind("click", {
            recordInx: i
        }, function() {
            alert(lng("wanNotBeEdited"))
        }) : $("#" + idPrefix + i).bind("click", {
            recordInx: i
        }, context(this).callback(this.onrowclick));
        for (var rowSel, cellSel, curVal, i = 0; i < recordSet.length; i++) {
            rowSel = "#" + idPrefix + i;
            for (var j in header) curVal = recordSet[i][header[j].key], curVal instanceof Object && ("radio" == curVal.type || "checkbox" == curVal.type) && (cellSel = rowSel + ">td:eq(" + j + ")>input", $(cellSel).bind("click", {
                row: i,
                cell: j
            }, context(this).callback(this.oncellclick)))
        }
        if ("mobile2" == getCookie("viewmode") && window.mobile) {
            this.scrollFg = this.options.id = this.options.id || "oldgrid", this.noResizeTr = !this.options.noResizeTr, objID = "oldGrid", is.unset(window.scrollGrid) && (window.scrollGrid = {}), is.unset(window.scrollGrid[this.options.id]) && (window.scrollGrid[this.options.id] = {
                position: 0
            }), $(this.myBoxSel).append("<div class='numpage none'></div>");
            var widthtr = "100%";
            is.set(this.noResizeTr) && ($(window).unbind("resize"), $(window).bind("resize", callback(this, function() {
                window.scrollGrid[this.options.id].nrow = $(this.myBoxSel).find("tr:visible").length, window.scrollGrid[this.options.id].position > window.scrollGrid[this.options.id].nrow && (window.scrollGrid[this.options.id].position = 0), this.trlen = this.options.trlen = $(document).width() > 1e3 ? 4 : $(document).width() > 800 ? 3 : $(document).width() > 450 ? 2 : 1, window.scrollGrid[this.scrollFg].position > window.scrollGrid[this.scrollFg].nrow && (window.scrollGrid[this.scrollFg].position = 0), widthtr = Math.round(100 / this.trlen) + "%", $(this.myBoxSel).find("#" + objID + " tbody tr").css({
                    width: widthtr
                }), $("#" + objID + " tbody tr").length > 0 && ($(this.myBoxSel).find("#" + objID + " tbody").css({
                    "margin-left": $("#" + objID + " tbody").css("margin-left", -$("#" + objID + " tr:eq(" + (window.scrollGrid[this.scrollFg].position + 1) + ")").position().left)
                }), $(this.myBoxSel).find("#" + objID).parent().find(".numpage").html(Math.ceil(window.scrollGrid[this.scrollFg].position / this.trlen) + 1 + " / " + Math.ceil(window.scrollGrid[this.scrollFg].nrow / this.trlen)))
            })).resize()), $(this.myBoxSel).find("#" + objID).parent().find(".numpage").hide(), $(this.myBoxSel).find("table").scroll(function() {
                $(this).scrollLeft(0)
            }), window.scrollGrid[this.options.id].nrow = $(this.myBoxSel).find("tr:visible").length, window.scrollGrid[this.options.id].position > window.scrollGrid[this.options.id].nrow && (window.scrollGrid[this.options.id].position = 0), $(this.myBoxSel).find("table tbody").css({
                "margin-left": -(window.scrollGrid[this.options.id].step * window.scrollGrid[this.options.id].position)
            }), $(this.myBoxSel).find("#" + objID).parent().css("position", "relative"), window.scrollGrid[this.options.id].nrow > 0 ? $(this.myBoxSel).find("#" + objID).parent().find(".numpage").html(Math.ceil(window.scrollGrid[this.options.id].position / this.options.trlen) + 1 + " / " + Math.ceil(window.scrollGrid[this.options.id].nrow / this.options.trlen)).removeClass("norecord") : $(this.myBoxSel).find("#" + objID).parent().find(".numpage").html(lng("no_record")).addClass("norecord"), $(this.myBoxSel).find("#" + objID + " tbody tr").css({
                width: widthtr
            }), $(this.myBoxSel).find("#" + objID).parent().find(".numpage").show(), window.hammerWrap && is.func(hammerWrap) && hammerWrap(objID, callback(this, function(ev) {
                switch (window.scrollGrid[this.options.id].nrow = $(this.myBoxSel).find("tr:visible").length, window.scrollGrid[this.scrollFg].step = $(this.myBoxSel).find("table tr:eq(1)").width(), ev.type) {
                    case "swiperight":
                        window.scrollGrid[this.scrollFg].position = window.scrollGrid[this.scrollFg].position - this.trlen;
                        break;
                    case "swipeleft":
                        window.scrollGrid[this.scrollFg].position = window.scrollGrid[this.scrollFg].position + this.trlen
                }
                window.scrollGrid[this.scrollFg].position < 0 ? window.scrollGrid[this.scrollFg].position = 0 : window.scrollGrid[this.scrollFg].position > window.scrollGrid[this.scrollFg].nrow - 1 && (window.scrollGrid[this.scrollFg].position -= this.trlen), $(this.myBoxSel).find("#" + objID + " tbody").animate({
                    "margin-left": -$("#" + objID + " tr:eq(" + (window.scrollGrid[this.scrollFg].position + 1) + ")").position().left
                }, 500), $(this.myBoxSel).find("#" + objID).parent().find(".numpage").html(Math.ceil(window.scrollGrid[this.scrollFg].position / this.trlen) + 1 + " / " + Math.ceil(window.scrollGrid[this.scrollFg].nrow / this.trlen))
            }))
        }
    }, jsRecordSetClientView.prototype.drawTh = function() {
        var header = this.options.header,
            htmlToDraw = "<thead><tr class='gridHeader'>";
        for (var i in header) htmlToDraw += "<td>" + lng(header[i].name) + "</td>";
        return htmlToDraw += "</tr></thead>"
    }, jsRecordSetClientView.prototype.drawTr = function(idPrefix, i) {
        var id = idPrefix + i,
            record = this.ctrl.model.recordSet[i],
            htmlToDraw = "<tr id='" + id + "'";
        if (record) {
            htmlToDraw += " class='";
            var header = this.options.header;
            htmlToDraw += i % 2 ? "gridRow2" : "gridRow1", record.extrattrs ? htmlToDraw += record.extrattrs.disabled ? " disable " : "" : record.extrattrs = {}, htmlToDraw += "'>";
            for (var j in header) htmlToDraw += this.drawTd(record, j)
        }
        return htmlToDraw += "</tr>"
    }, jsRecordSetClientView.prototype.drawTd = function(record, i) {
        var htmlToDraw, curHeader = this.options.header[i],
            curVal = record[curHeader.key];
        if (curVal instanceof Object) {
            if ("radio" == curVal.type || "checkbox" == curVal.type) {
                var checked = curVal.value ? "checked" : "",
                    disabled = curVal.disabled || record.extrattrs.disabled ? "disabled" : "";
                if (extrattrs = curVal.extrattrs, htmlToDraw = "<td  cell-name='" + lng(curHeader.name) + "' ><input " + disabled + " name='" + curHeader.key + "' value='" + curVal.value + "' type='" + curVal.type + "' " + checked, extrattrs)
                    for (var i in extrattrs) htmlToDraw += i + "='" + extrattrs[i] + "' ";
                htmlToDraw += " ></td>"
            }
        }
        else(no(curVal) || "" == curVal) && (curVal = "&nbsp;"), htmlToDraw = "<td cell-name='" + lng(curHeader.name) + "'>" + curVal + "</td>";
        return htmlToDraw
    }, jsRecordSetClientView.prototype.drawEditView = function() {
        var id, childCtrls = this.ctrl.children,
            options = {},
            header = this.options.header,
            editBoxSel = this.options.editBoxSel ? this.options.editBoxSel : this.myBoxSel;
        if ($.extend(options, this.options), childCtrls.length && $(this.myBoxSel).html(""), options.myBoxSel = null, options.childBoxSel = null, childCtrls.length > 1) {
            var htmlToAppend = "";
            for (var i in childCtrls) id = "rsEdit" + getUID(), htmlToAppend += "<div id='" + id + "'></div>", htmlToAppend += "<div class='recordSetSpacer'></div>", options.viewBoxSel = "#" + id, options.name = header[i], childCtrls[i].changeIface(this.viewInx, this, options);
            $(editBoxSel).append(htmlToAppend)
        }
        else childCtrls.length && (options.viewBoxSel = editBoxSel, options.name = header[0], childCtrls[0].changeIface(this.viewInx, this, options));
        jsRecordSetClientView.superclass.drawView.call(this)
    }, jsRecordSetClientView.prototype.onrowclick = function(event) {
        this.ctrl.event("recselect", event.data.recordInx)
    }, jsRecordSetClientView.prototype.onrecselect = function() {
        return !0
    }, jsRecordSetClientView.prototype.oncellclick = function(event) {
        return this.ctrl.event("cellselect", event.data), event.stopPropagation(), !0
    }, this.bind("recselect", this.onrecselect)
}

function jsFieldSetController() {
    jsFieldSetController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsFieldSetClientView
    }, this.ifaceTypes.popup = {
        type: jsFieldSetPopUpClientView
    }, this.ifaceTypes.server = {
        type: jsSSideView
    }
}

function jsFieldSetClientView(ctrl, viewInx, options) {
    if (options) {
        var title = options.title,
            tabs = options.tabs,
            wizard = options.wizard;
        options.title = "", options.tabs = !1, options.wizard = !1
    }
    jsFieldSetClientView.superclass.constructor.call(this, ctrl, viewInx, options), options && (this.options.title = title, this.options.tabs = tabs, this.options.wizard = wizard), jsFieldSetClientView.prototype.drawView = function() {
        var htmlToDraw, childCtrls = this.ctrl.children,
            options = this.options,
            title = options.title ? options.title : "&nbsp;",
            obj = null,
            htmlToDraw = "";
        options.slider && (htmlToDraw += options.nocollapse ? "<div class='fieldSetSlider fieldSetSliderNoCollapse'>" : options.collapsed ? "<div class='fieldSetSlider fieldSetSliderCollapsed'>" : "<div class='fieldSetSlider fieldSetSliderExpanded'>", htmlToDraw += "<div>", options.title && (htmlToDraw += lng(options.title)), htmlToDraw += "</div></div>", htmlToDraw += options.descClass ? "<div class='" + options.descClass + "'>" : "<div class='fieldSetSliderBottom'>", options.descText && (htmlToDraw += "<div>" + lng(options.descText) + "</div>"), htmlToDraw += "</div>"), options.slider || options.nothing ? (htmlToDraw += options.slider && options.collapsed && !options.nocollapse ? "<div style='display:none'></div>" : "<div></div>", options.pages && childCtrls.length > 1 && (this.pageBarSel = this.viewBoxSel + ">div.fieldSetPages", htmlToDraw += this.drawPageBar()), this.options.buttons && (this.buttonBarSel = this.viewBoxSel + ">div.fieldSetMainButtons", htmlToDraw += "<div class='fieldSetMainButtons'>", htmlToDraw += this.drawButtons(), htmlToDraw += "</div>"), $(this.viewBoxSel).html(htmlToDraw), this.childBoxSel = options.slider ? this.viewBoxSel + ">div:eq(2)" : this.viewBoxSel + ">div:eq(0)", this.options.childBoxSel = this.childBoxSel, options.pages && childCtrls.length > 1 && this.setPageClicks(), this.setButtonClicks(), options.slider && !options.nocollapse && $(this.viewBoxSel + ">div.fieldSetSlider").bind("click", {}, context(this).callback(this.toggleSlider))) : options.simple ? (options.tabs && childCtrls.length > 1 && (this.tabBarSel = this.viewBoxSel + ">div.fieldSetMainTabsSimple", htmlToDraw += "<div class='fieldSetMainTabsSimple'>", htmlToDraw += this.drawTabBar(), htmlToDraw += "</div>"), htmlToDraw += "<div><fieldset></fieldset></div><div class='fieldSetMainButtons'>", htmlToDraw += this.drawButtons(), htmlToDraw += "</div>", options.pages && childCtrls.length > 1 && (this.pageBarSel = this.viewBoxSel + ">div.fieldSetPages", htmlToDraw += this.drawPageBar()), $(this.viewBoxSel).html(htmlToDraw), this.buttonBarSel = options.tabs && childCtrls.length > 1 ? this.viewBoxSel + ">div:eq(2)" : this.viewBoxSel + ">div:eq(1)", this.setButtonClicks(), options.tabs ? this.setTabClicks() : options.pages && childCtrls.length > 1 && this.setPageClicks(), this.childBoxSel = this.viewBoxSel + ">div>fieldset", this.options.childBoxSel = this.childBoxSel) : (title = options.title ? "link" == options.title.type ? "<font class='fieldSetTitleLink'>" + lng(options.title.name) + "</font>" : "<font class='fieldSetTitleText'>" + lng(options.title.name) + "</font>" : "&nbsp;", htmlToDraw = "<div class='fieldSetMainPath'><div style='display: inline; vertical-align: middle;'></div><div style='margin-left: 4px; display: inline;'>" + title + "</div></div><div class='fieldSetMainContentContainer'>", options.tabs && childCtrls.length > 1 && (this.tabBarSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainTabs", htmlToDraw += "<div class='fieldSetMainTabs'>", htmlToDraw += this.drawTabBar(), htmlToDraw += "</div>"), htmlToDraw += "<div class='fieldSetMainContent'><div class='fieldSetGeneral' style='display: block;'></div></div><div class='fieldSetMainButtons'>", options.pages && childCtrls.length > 1 && (this.pageBarSel = this.viewBoxSel + " div.fieldSetPages", htmlToDraw += this.drawPageBar()), htmlToDraw += this.drawButtons(), htmlToDraw += "</div></div>", $(this.viewBoxSel).html(htmlToDraw), this.buttonBarSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainButtons", this.setButtonClicks(), options.title && "link" == options.title.type && $(this.viewBoxSel + ">div.fieldSetMainPath>div>font").bind("click", {}, context(this).callback(options.title.handler)), options.tabs ? this.setTabClicks() : options.pages && childCtrls.length > 1 && this.setPageClicks(), this.childBoxSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent>div.fieldSetGeneral", this.options.childBoxSel = this.childBoxSel), options.pages && childCtrls.length > 1 && this.switchPage(this.activeTab), options.wizard && childCtrls.length > 1 && this.switchChild(this.activeTab), childCtrls.length && $(this.childBoxSel).html("");
        var htmlToAppend = "",
            j = 0;
        if (childCtrls.length > 1) {
            for (var i in childCtrls) htmlToAppend += "<div></div>", obj = this.getChild(i), obj instanceof jsCSideView && (options.tabs || options.pages || options.wizard ? obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j + ")" : (htmlToAppend += "<div class='fieldSetSpacer'></div>", obj.viewBoxSel = this.childBoxSel + ">div:eq(" + 2 * j + ")"), obj.options.viewBoxSel = obj.viewBoxSel, j++);
            if (options.tabs || options.pages || options.wizard) {
                for (var i = 0; i < this.ctrl.children.length; i++) obj = this.getChild(i), obj instanceof jsCSideView && (obj.options.hide = !0);
                this.getChild(this.activeTab).options.hide = !1
            }
            $(this.childBoxSel).append(htmlToAppend)
        }
        else childCtrls.length && (obj = this.getChild(0), obj instanceof jsCSideView && (obj.viewBoxSel = this.childBoxSel, obj.options.viewBoxSel = obj.viewBoxSel));
        jsFieldSetClientView.superclass.drawView.call(this)
    }, this.toggleSlider = function() {
        var options = this.options,
            obj = $(options.viewBoxSel + ">div.fieldSetSlider");
        options.collapsed ? (obj.removeClass("fieldSetSliderCollapsed"), obj.addClass("fieldSetSliderExpanded"), $(options.childBoxSel).css("display", ""), options.collapsed = !1) : (obj.removeClass("fieldSetSliderExpanded"), obj.addClass("fieldSetSliderCollapsed"), $(options.childBoxSel).css("display", "none"), options.collapsed = !0)
    }, jsFieldSetClientView.prototype.hideButton = function(name) {
        this.buttons && $(this.buttons[name].sel).css("display", "none")
    }, jsFieldSetClientView.prototype.showButton = function(name) {
        this.buttons && $(this.buttons[name].sel).css("display", "")
    }, jsFieldSetClientView.prototype.disableButton = function(name) {
        this.buttons && $(this.buttons[name].sel).attr("disabled", !0)
    }, jsFieldSetClientView.prototype.enableButton = function(name) {
        this.buttons && $(this.buttons[name].sel).attr("disabled", !1)
    }, jsFieldSetClientView.prototype.updateButtons = function() {
        this.options.buttons ? ($(this.buttonBarSel).html(this.drawButtons()), this.setButtonClicks()) : $(this.buttonBarSel).html("")
    }, jsFieldSetClientView.prototype.showTab = function(tabInx) {
        var tabSel = this.tabBarSel + ">span:eq(" + tabInx + ")",
            prevTabInx = tabInx - 1,
            prevTabSel = this.tabBarSel + ">span:eq(" + prevTabInx + ")";
        0 == tabInx ? ($(tabSel).removeClass("tabStartOff"), $(tabSel).addClass("tabStartOn"), $(tabSel + ">span:eq(1)").removeClass("tabBgOff"), $(tabSel + ">span:eq(1)").addClass("tabBgOn"), $(tabSel + ">span:eq(2)").removeClass("tabMidOff"), $(tabSel + ">span:eq(2)").addClass("tabMidLeftOn")) : tabInx > 0 && tabInx < this.ctrl.children.length - 1 ? ($(prevTabSel + ">span:last").removeClass("tabMidRightOff"), $(prevTabSel + ">span:last").addClass("tabMidRightOn"), $(tabSel + ">span:eq(0)").removeClass("tabBgOff"), $(tabSel + ">span:eq(0)").addClass("tabBgOn"), $(tabSel + ">span:eq(1)").removeClass("tabMidOff"), $(tabSel + ">span:eq(1)").addClass("tabMidLeftOn")) : tabInx == this.ctrl.children.length - 1 && ($(prevTabSel + ">span:last").removeClass("tabMidRightOff"), $(prevTabSel + ">span:last").addClass("tabMidRightOn"), $(tabSel + ">span:eq(0)").removeClass("tabBgOff"), $(tabSel + ">span:eq(0)").addClass("tabBgOn"), $(tabSel + ">span:eq(1)").removeClass("tabEndOff"), $(tabSel + ">span:eq(1)").addClass("tabEndOn")), this.getChild(tabInx).show()
    }, jsFieldSetClientView.prototype.hideTab = function(tabInx) {
        var tabSel = this.tabBarSel + ">span:eq(" + tabInx + ")",
            prevTabInx = tabInx - 1,
            prevTabSel = this.tabBarSel + ">span:eq(" + prevTabInx + ")";
        0 == tabInx ? ($(tabSel).removeClass("tabStartOn"), $(tabSel).addClass("tabStartOff"), $(tabSel + ">span:eq(1)").removeClass("tabBgOn"), $(tabSel + ">span:eq(1)").addClass("tabBgOff"), $(tabSel + ">span:eq(2)").removeClass("tabMidLeftOn"), $(tabSel + ">span:eq(2)").addClass("tabMidOff")) : tabInx > 0 && tabInx < this.ctrl.children.length - 1 ? ($(prevTabSel + ">span:last").removeClass("tabMidRightOn"), $(prevTabSel + ">span:last").addClass("tabMidRightOff"), $(tabSel + ">span:eq(0)").removeClass("tabBgOn"), $(tabSel + ">span:eq(0)").addClass("tabBgOff"), $(tabSel + ">span:eq(1)").removeClass("tabMidLeftOn"), $(tabSel + ">span:eq(1)").addClass("tabMidOff")) : tabInx == this.ctrl.children.length - 1 && ($(prevTabSel + ">span:last").removeClass("tabMidRightOn"), $(prevTabSel + ">span:last").addClass("tabMidRightOff"), $(tabSel + ">span:eq(0)").removeClass("tabBgOn"), $(tabSel + ">span:eq(0)").addClass("tabBgOff"), $(tabSel + ">span:eq(1)").removeClass("tabEndOn"), $(tabSel + ">span:eq(1)").addClass("tabEndOff")), this.getChild(tabInx).hide()
    }, jsFieldSetClientView.prototype.switchTab = function(tabInx) {
        this.hideTab(this.activeTab), this.showTab(tabInx), this.activeTab = tabInx
    }, jsFieldSetClientView.prototype.switchPage = function(pageInx) {
        var pos = new Number(this.activeTab) + 1;
        $(this.pageBarSel + ">a:eq(" + pos + ")").removeClass("fieldSetPageActive"), pos = new Number(pageInx) + 1, $(this.pageBarSel + ">a:eq(" + new Number(pageInx + 1) + ")").addClass("fieldSetPageActive"), pos = this.ctrl.children.length + 1, 0 == pageInx ? ($(this.pageBarSel + ">a:eq(0)").css("display", "none"), $(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "")) : pageInx == this.ctrl.children.length - 1 ? ($(this.pageBarSel + ">a:eq(0)").css("display", ""), $(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "none")) : ($(this.pageBarSel + ">a:eq(0)").css("display", ""), $(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "")), this.switchChild(pageInx)
    }, jsFieldSetClientView.prototype.switchChild = function(childId) {
        this.getChild(this.activeTab).hide();
        var child = this.getChild(childId);
        child.show(), this.activeTab = child.ctrl.thisInx
    }, jsFieldSetClientView.prototype.drawTabBar = function() {
        for (var childrenLength = this.ctrl.children.length, htmlToDraw = "<span class='tabStart tabStartOn'><span></span><span class='fieldSetTabText tabBgOn'><a>" + lng(this.getChild(0).options.title) + "</a></span><span class='tabMidLeft tabMidLeftOn'></span></span>", i = 1; childrenLength - 1 > i; i++) htmlToDraw += "<span><span class='fieldSetTabText tabBgOff'><a>" + lng(this.getChild(i).options.title) + "</a></span><span class='tabMidLeft tabMidOff'></span></span>";
        return htmlToDraw += "<span><span class='fieldSetTabText tabBgOff'><a>" + lng(this.getChild(childrenLength - 1).options.title) + "</a></span><span class='tabEnd tabEndOff'></span></span>"
    }, jsFieldSetClientView.prototype.drawPageBar = function() {
        var options = (this.ctrl.children.length, this.options),
            htmlToDraw = "<div class='fieldSetPages'>";
        htmlToDraw += "<a class='fieldSetPrev'>", no(options.prev) || (htmlToDraw += lng(this.options.prev)), htmlToDraw += "</a>";
        for (var i in this.ctrl.children) htmlToDraw += "<a>" + (new Number(i) + 1) + "</a>";
        return htmlToDraw += "<a class='fieldSetNext'>", no(options.next) || (htmlToDraw += lng(this.options.next)), htmlToDraw += "</a>", htmlToDraw += "</div>"
    }, this.drawButtons = function() {
        var options = this.options,
            htmlToDraw = "";
        if (options.buttons) {
            for (var i = 0; i < options.buttons.length - 1; i++) button = options.buttons[i], button && (htmlToDraw += "<input name='" + button.name + "' value='" + lng(button.value) + "' class='fieldSetButton' type='button'>&nbsp;");
            button = options.buttons[i], button && (htmlToDraw += "<input name='" + button.name + "' value='" + lng(button.value) + "' class='fieldSetButton' type='button'>")
        }
        return htmlToDraw
    }, jsFieldSetClientView.prototype.ontabclick = function(event) {
        this.switchTab(event.data.tabInx)
    }, jsFieldSetClientView.prototype.onpageclick = function(event) {
        this.switchPage(event.data.prev ? this.activeTab - 1 : event.data.next ? this.activeTab + 1 : event.data.pageInx)
    }, jsFieldSetClientView.prototype.setTabClicks = function() {
        for (var tabLinkSel = this.tabBarSel + ">span:eq(0)>span:eq(1)>a", i = 1; i < this.ctrl.children.length; i++) $(tabLinkSel).bind("click", {
            tabInx: i - 1
        }, context(this).callback(this.ontabclick)), tabLinkSel = this.tabBarSel + ">span:eq(" + i + ")>span:eq(0)>a";
        $(tabLinkSel).bind("click", {
            tabInx: this.ctrl.children.length - 1
        }, context(this).callback(this.ontabclick))
    }, jsFieldSetClientView.prototype.setPageClicks = function() {
        var pageLinkSel, pos;
        $(this.pageBarSel + ">a.fieldSetPrev").bind("click", {
            prev: !0
        }, context(this).callback(this.onpageclick)), pos = this.ctrl.children.length + 1, $(this.pageBarSel + ">a.fieldSetNext").bind("click", {
            next: !0
        }, context(this).callback(this.onpageclick));
        for (var i = 0; i < this.ctrl.children.length; i++) pos = i + 1, pageLinkSel = this.pageBarSel + ">a:eq(" + pos + ")", $(pageLinkSel).bind("click", {
            pageInx: i
        }, context(this).callback(this.onpageclick))
    }, jsFieldSetClientView.prototype.setButtonClicks = function() {
        var options = this.options;
        if (options.buttons) {
            var buttonSel;
            this.buttons = {};
            for (var i = 0; i < options.buttons.length; i++) button = options.buttons[i], button && (buttonSel = this.buttonBarSel + ">input:eq(" + i + ")", this.buttons[button.name] = {
                sel: buttonSel
            }, $(buttonSel).bind("click", {}, context(this).callback(button.handler)))
        }
    }, jsFieldSetClientView.prototype.onerrstat = function() {
        var options = this.options;
        return options.slider && options.collapsed && this.toggleSlider(), !0
    }, this.activeTab = this.options.activeTab ? this.options.activeTab : 0, this.tabBarSel = null, this.pageBarSel = null, this.bind("errstat", this.onerrstat)
}

function jsFieldSetPopUpClientView(ctrl, viewInx, options) {
    options.simple = !1, options.nothing = !1, jsFieldSetPopUpClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsFieldSetPopUpClientView.prototype.drawView = function() {
        jsFieldSetPopUpClientView.superclass.drawView.call(this);
        var dialog = this.viewBoxSel,
            caption = this.viewBoxSel + ">div.fieldSetMainPath",
            options = this.options;
        return options.notCloser || $(caption).append("<div class='dialog_closer'></div>"), $(caption).css("cursor", "move"), $(this.viewBoxSel + ">div.fieldSetMainPath>div.dialog_closer").click(context(this).callback(this.hide)), $(this.viewBoxSel).css({
            display: "none",
            position: "absolute",
            "z-index": "9999",
            "box-shadow": "0px 0px 20px #000",
            "-moz-box-shadow": "0px 0px 20px #000",
            "-webkit-box-shadow": "0px 0px 20px #000"
        }), $(this.viewBoxSel + ">div:last>div:eq(0)").css({
            overflow: "auto",
            width: options.width,
            height: options.height
        }), document.extra = {
            dragging: !1,
            oldLeft: 0,
            oldTop: 0
        }, $(caption).mousedown(function(e) {
            return document.extra.dragging = !0, document.extra.oldLeft = e.pageX - $(this).offset().left, document.extra.oldTop = e.pageY - $(this).offset().top, $("body").css("cursor", "move"), !1
        }), $(caption).mouseup(function() {
            return document.extra.dragging = !1, $("body").css("cursor", "default"), !1
        }), $("body").mouseup(function() {
            return document.extra.dragging ? ($(caption).mouseup(), !1) : void 0
        }), $("body").mousemove(function(e) {
            if (document.extra.dragging) {
                var x = e.pageX - $(caption).offset().left,
                    y = e.pageY - $(caption).offset().top;
                return $(dialog).css({
                    left: $(dialog).offset().left + x - document.extra.oldLeft,
                    top: $(dialog).offset().top + y - document.extra.oldTop
                }), !1
            }
        }), !1
    }, this.hnd = function() {
        return !0
    }, jsFieldSetPopUpClientView.prototype.show = function() {
        this.ctrl.event("showpopupdlg", this), $(this.viewBoxSel).css("left", $(document).scrollLeft() + $(window).width() / 2 - $(this.viewBoxSel).width() / 2), $(this.viewBoxSel).css("top", $(document).scrollTop() + ($(window).height() / 2 - $(this.viewBoxSel).height() / 2)), $(this.viewBoxSel).fadeIn("slow")
    }, jsFieldSetPopUpClientView.prototype.hide = function() {
        this.ctrl.event("hidepopupdlg", this), $("body").css("overflow", "auto"), this.hideModalOverlay(), $(this.viewBoxSel).fadeOut("slow")
    }, jsFieldSetPopUpClientView.prototype.showModal = function() {
        this.ctrl.event("showpopupmodaldlg", this), $("body").css("overflow", "hidden"), this.showModalOverlay(), this.show()
    }, this.isWin = !0, this.bind("showpopupdlg", this.hnd), this.bind("showpopupmodaldlg", this.hnd), this.bind("hidepopupdlg", this.hnd)
}

function jsEditController() {
    jsEditController.superclass.constructor.call(this), this.modified = !1, this.setModified = function() {
        return this.modified = !0, !0
    }, this.addEventHandler("fieldchange", this.setModified)
}

function jsEditClientView(ctrl, viewInx, options) {
    jsEditClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsEditClientView.prototype.drawView = function() {
        var htmlToDraw, options = this.options,
            statusCode = this.ctrl.model ? this.ctrl.model.statusCode : null,
            uid = getUID(),
            errorMessage = statusCode ? lng(statusCode) : "",
            comment = options.comment ? lng(options.comment) : "",
            inputBoxId = "editInputBox" + uid;
        this.inputId = "editInput" + uid;
        var errorId = "editError" + uid,
            commentId = "editComment" + uid,
            style = options.inputPadding ? " style='width: " + options.inputPadding + "'" : "";
        this.errorSel = "#" + errorId, this.commentSel = "#" + commentId, this.inputSel = "#" + this.inputId, options.myBoxSel = null, options.childBoxSel = "#" + inputBoxId, htmlToDraw = "<div class='edit'>", htmlToDraw += "<div class='label'" + style + ">", htmlToDraw += "<label for='" + this.inputId + "'>", htmlToDraw += options.humanName ? lng(options.humanName) + ":" : "&nbsp;", htmlToDraw += "</label>", htmlToDraw += "</div>", htmlToDraw += "<div id='" + inputBoxId + "' class='input'></div>", htmlToDraw += "<div id='" + errorId + "' class='error'>" + errorMessage + "</div>", htmlToDraw += "<div style='clear: both'></div>", htmlToDraw += "<div id='" + commentId + "'class='comment'>" + comment + "</div>", htmlToDraw += "<div style='clear: both'></div></div>", htmlToDraw += "<div style='clear: both'></div>";
        var child = this.getChild(0);
        child instanceof jsCSideView && (child.options.viewBoxSel = options.childBoxSel, child.inputId = this.inputId), $(options.viewBoxSel).html(htmlToDraw), !options.mandatory || options.optional || options.summary || this.setMandatory(), comment.length || this.cleanComment(), jsEditClientView.superclass.drawView.call(this)
    }, jsEditClientView.prototype.disable = function() {
        this.setOption("disabled", !0), $(this.options.viewBoxSel).addClass("editDisabled"), this.hideError();
        var obj = this.getChild(0);
        obj.disable instanceof Function && obj.disable(), this.clearMandatory()
    }, jsEditClientView.prototype.enable = function() {
        this.setOption("disabled", !1);
        var options = this.options;
        $(options.viewBoxSel).removeClass("editDisabled");
        var obj = this.getChild(0);
        obj.statusCode && this.showError(), obj.enable instanceof Function && obj.enable(), !options.mandatory || options.optional || options.summary || this.setMandatory()
    }, jsEditClientView.prototype.onvalidate = function(view) {
        return this.viewInx == view.viewInx && this.setError(), !1
    }, jsEditClientView.prototype.setError = function(statusCode) {
        var child = this.getChild(0);
        statusCode = statusCode ? statusCode : child.statusCode ? child.statusCode : this.statusCode, statusCode ? ($(this.errorSel).html(lng(statusCode)), this.showError()) : ($(this.errorSel).html(""), this.hideError())
    }, jsEditClientView.prototype.showError = function() {
        $(this.errorSel).show(), $(this.inputSel).addClass("validate")
    }, jsEditClientView.prototype.hideError = function() {
        $(this.errorSel).hide(), $(this.inputSel).removeClass("validate")
    }, jsEditClientView.prototype.setComment = function(comment) {
        $(this.commentSel).html(lng(comment))
    }, jsEditClientView.prototype.cleanComment = function() {
        $(this.commentSel).html("").hide()
    }, jsEditClientView.prototype.onfieldchange = function(obj) {
        return this.ctrl.getParent().event("fieldchange", {
            view: this,
            value: obj.value
        }, !0), !1
    }, jsEditClientView.prototype.setMandatory = function() {
        this.clearMandatory(), $(this.options.viewBoxSel + " div.label").append("<span class='mandatory'>*</span>")
    }, jsEditClientView.prototype.clearMandatory = function() {
        $(this.options.viewBoxSel + " span.mandatory").detach()
    }, this.bind("fieldchange", this.onfieldchange), this.bind("validate", this.onvalidate), this.errorSel = null, this.commentSel = null, this.inputId = null, this.inputSel = null
}

function jsInputModel(value) {
    jsInputModel.superclass.constructor.call(this), this.value = value, jsInputModel.prototype.toString = function() {
        var value;
        return value = no(this.value) ? "" : this.value
    }
}

function jsInputController(value) {
    jsInputController.superclass.constructor.call(this), jsInputController.prototype.addItem = function() {
        return this.addChild.apply(this.getChild("field"), arguments)
    }, this.ifaceTypes.input = {
        type: jsInputSlotView
    }, this.ifaceTypes.select = {
        type: jsInputSlotView
    }, this.ifaceTypes.selectex = {
        type: jsInputSlotView
    }, this.ifaceTypes.radio = {
        type: jsInputSlotView
    }, this.ifaceTypes.radio2 = {
        type: jsRadio2SlotView
    }, this.ifaceTypes.checkbox = {
        type: jsInputSlotView
    }, this.ifaceTypes.number = {
        type: jsInputSlotView
    }, this.ifaceTypes.text = {
        type: jsInputSlotView
    }, this.addChild(new jsInputFieldController(value), "field"), this.changeModel(this.getChild("field").model)
}

function jsInputSlotView(ctrl, viewInx, options) {
    ctrl.getChild("field").nextIface = ctrl.lastIface, "number" == ctrl.lastIface && (options.mandatory = !0), jsInputSlotView.superclass.constructor.call(this, ctrl, viewInx, options), jsInputSlotView.prototype.drawView = function() {
        try {
            switch (this.ctrl.model.value.__attrs__.mode) {
                case 4:
                    this.setOption("disabled", !0);
                    break;
                case 0:
                    this.options.hide = !0
            }
        }
        catch (e) {}
        jsInputSlotView.superclass.drawView.call(this)
    }
}

function jsRadio2SlotView(ctrl, viewInx, options) {
    ctrl.getChild("field").nextIface = ctrl.lastIface, jsRadio2SlotView.superclass.constructor.call(this, ctrl, viewInx, options), jsRadio2SlotView.prototype.drawView = function() {
        try {
            switch (this.ctrl.model.value.__attrs__.mode) {
                case 4:
                    this.setOption("disabled", !0);
                    break;
                case 0:
                    this.options.hide = !0
            }
        }
        catch (e) {}
        var htmlToDraw, options = this.options,
            statusCode = this.ctrl.model ? this.ctrl.model.statusCode : null,
            uid = getUID(),
            inputBoxId = (statusCode ? lng(statusCode) : "", options.comment ? lng(options.comment) : "", "editInputBox" + uid);
        this.inputId = "editInput" + uid;
        var errorId = "editError" + uid,
            commentId = "editComment" + uid,
            style = options.inputPadding ? " style='padding-left: " + options.inputPadding + "'" : "";
        this.errorSel = "#" + errorId, this.commentSel = "#" + commentId, this.inputSel = "#" + this.inputId, options.myBoxSel = null, options.childBoxSel = "#" + inputBoxId, options.summary ? (htmlToDraw = "<div class='radio2smr'>", htmlToDraw += "<div class='name'> " + lng(options.humanName) + "</div>") : (htmlToDraw = "<div class='radio2'>", htmlToDraw += "<div class='name'> " + lng(options.humanName) + ":</div>"), htmlToDraw += "<div class='input' id='" + inputBoxId + "' " + style + "></div>", htmlToDraw += "<div style='clear: both'></div>", htmlToDraw += "</div>";
        var child = this.getChild(0);
        child instanceof jsCSideView && (child.options.viewBoxSel = options.childBoxSel, child.inputId = this.inputId), $(options.viewBoxSel).html(htmlToDraw), jsRadio2SlotView.superclass.drawView.call(this)
    }, jsRadio2SlotView.prototype.disable = function() {
        this.setOption("disabled", !0), $(this.options.viewBoxSel).addClass("radio2Disabled"), this.getChild(0).disable()
    }, jsRadio2SlotView.prototype.enable = function() {
        this.setOption("disabled", !1), $(this.options.viewBoxSel).removeClass("radio2Disabled"), this.getChild(0).enable()
    }, jsRadio2SlotView.prototype.setError = function(statusCode) {
        var child = this.getChild(0);
        statusCode = statusCode ? statusCode : child.statusCode ? child.statusCode : this.statusCode, statusCode && (alert(lng(statusCode)), this.showError())
    }, this.inputId = null, this.inputSel = null
}

function jsInputFieldController(value) {
    jsInputFieldController.superclass.constructor.call(this), this.ifaceTypes.input = {
        type: jsInputClientView
    }, this.ifaceTypes.select = {
        type: jsSelectClientView
    }, no(window.jsSelectExClientView) || (this.ifaceTypes.selectex = {
        type: jsSelectExClientView
    }), this.ifaceTypes.radio = {
        type: jsRadioClientView
    }, this.ifaceTypes.radio2 = {
        type: jsRadio2ClientView
    }, this.ifaceTypes.checkbox = {
        type: jsCheckboxClientView
    }, this.ifaceTypes.number = {
        type: jsNumberClientView
    }, this.ifaceTypes.text = {
        type: jsStaticTextClientView
    }, this.changeModel(new jsInputModel(value)), this.modified = !1, this.setModified = function() {
        return this.modified = !0, !0
    }, this.addEventHandler("fieldchange", this.setModified)
}

function jsBaseInputView(ctrl, viewInx, options) {
    jsBaseInputView.superclass.constructor.call(this, ctrl, viewInx, options), jsBaseInputView.prototype.html = function(htmlToDraw) {
        var options = this.options;
        $(options.viewBoxSel).html(htmlToDraw), this.$input = $(this.inputSel), this.updateView();
        for (var i in options.extrattrs) this.$input.attr(i, options.extrattrs[i]);
        options.title && this.$input.attr("title", lng(options.title)), options.disabled && this.disable(), this.$input.bind("blur", context(this).callback(this.onfieldchangejq))
    }, jsBaseInputView.prototype.onfieldchangejq = function(event) {
        var value = this.val();
        return this.lastValue != value && (this.ctrl.event("fieldchange", {
            view: this,
            value: value
        }, !0), event.stopPropagation(), this.validate(), this.lastValue = value), !0
    }, this.val = function(value) {
        return no(value) || (this.options.summary ? this.$input.html(value) : this.$input.val(value)), this.options.summary ? this.$input.html() : this.$input.val()
    }, jsBaseInputView.prototype.disable = function() {
        $(this.inputSel).attr("disabled", !0)
    }, jsBaseInputView.prototype.enable = function() {
        $(this.inputSel).attr("disabled", !1)
    }, jsBaseInputView.prototype.validate = function() {
        if (this.options.optional) {
            var patt = /.*Empty$/;
            patt.test(this.statusCode) && (this.statusCode = null)
        }
        return this.ctrl.event("validate", this, !0), jsBaseInputView.superclass.validate.call(this)
    }, this.$input = null, this.lastValue = null
}

function jsInputClientView(ctrl, viewInx, options) {
    jsInputClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsInputClientView.prototype.drawView = function() {
        jsInputClientView.superclass.drawView.call(this);
        var htmlToDraw = "",
            options = this.options;
        options.summary ? (this.inputSel = options.viewBoxSel, delete this.inputId) : (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId, htmlToDraw = "<input id='" + this.inputId + "' type='", htmlToDraw += options.password ? "password" : "text", htmlToDraw += "'/>"), this.html(htmlToDraw)
    }, jsInputClientView.prototype.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsInputClientView.superclass.updateModel.call(this)
    }, jsInputClientView.prototype.updateView = function() {
        this.val(this.ctrl.model.value), jsInputClientView.superclass.updateView.call(this)
    }
}

function jsSelectClientView(ctrl, viewInx, options) {
    jsSelectClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSelectClientView.prototype.drawView = function() {
        jsSelectClientView.superclass.drawView.call(this);
        var htmlToDraw = "",
            options = this.options,
            valset = (this.ctrl.model.value, options.valset);
        if (options.summary) this.inputSel = options.viewBoxSel, delete this.inputId;
        else {
            if (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId, htmlToDraw = "<select id='" + this.inputId + "'>", valset)
                for (var i in valset) htmlToDraw += "<option value='" + valset[i] + "'>" + lng(i) + "</option>";
            htmlToDraw += "</select>"
        }
        this.html(htmlToDraw), this.$input.unbind("blur"), this.$input.bind("change", context(this).callback(this.onfieldchangejq))
    }, this.val = function(value) {
        var valset = this.options.valset;
        if (this.options.summary) {
            if (!no(value)) {
                var humanValue = "";
                for (var i in valset)
                    if (value == valset[i]) {
                        humanValue = i;
                        break
                    }
                this.$input.html(lng(humanValue))
            }
            return valset[this.$input.html()]
        }
        return no(value) || this.$input.val(value), this.$input.val()
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsSelectClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        this.val(this.ctrl.model.value), jsSelectClientView.superclass.updateView.call(this)
    }
}

function jsRadioClientView(ctrl, viewInx, options) {
    jsRadioClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsRadioClientView.superclass.drawView.call(this);
        var htmlToDraw = "",
            value = this.ctrl.model.value,
            options = this.options,
            valset = options.valset;
        if (options.summary) {
            this.inputSel = options.viewBoxSel, delete this.inputId;
            var humanValue = value;
            if (valset)
                for (var i in valset)
                    if (value == valset[i]) {
                        humanValue = i;
                        break
                    }
            htmlToDraw += no(humanValue) ? "" : lng(humanValue)
        }
        else if (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = options.viewBoxSel + " input[name='" + this.inputId + "']", valset)
            for (var i in valset) htmlToDraw += "<div><label><input type='radio' name='" + this.inputId + "' value='" + valset[i] + "' ", value == valset[i] && (htmlToDraw += "checked "), htmlToDraw += "/>" + lng(i) + "</label></div>";
        this.html(htmlToDraw), this.$input.unbind("blur"), this.$input.bind("change", context(this).callback(this.onfieldchangejq))
    }, this.val = function(value) {
        var valset = this.options.valset;
        if (this.options.summary) {
            if (!no(value)) {
                var humanValue = "";
                for (var i in valset)
                    if (value == valset[i]) {
                        humanValue = i;
                        break
                    }
                this.$input.html(lng(humanValue))
            }
            return valset[this.$input.html()]
        }
        if (!no(value)) {
            var j = 0;
            for (var i in valset) value == valset[i] ? this.$input.eq(j).attr("checked", !0) : this.$input.eq(j).attr("checked", !1), j++
        }
        return this.$input.length > 0 && !this.$input.filter(":checked").length ? this.$input.filter(":eq(0)").val() : this.$input.filter(":checked").val()
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsRadioClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        this.val(this.ctrl.model.value), jsRadioClientView.superclass.updateView.call(this)
    }
}

function jsRadio2ClientView(ctrl, viewInx, options) {
    jsRadio2ClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsRadio2ClientView.superclass.drawView.call(this);
        var obj, id, htmlToDraw = "",
            options = (this.ctrl.model.value, this.options),
            valset = options.valset;
        if (options.summary) this.inputSel = options.viewBoxSel, delete this.inputId;
        else if (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = this.myBoxSel + " input[name='" + this.inputId + "']", valset) {
            htmlToDraw += "<ul class='radio2'>";
            for (var i in valset) obj = valset[i], id = this.inputId + "_" + i, htmlToDraw += '<li onclick=\'var obj = $(this).children("input"); obj.attr("checked", true); obj.change();\'>', htmlToDraw += "<input name='" + this.inputId + "' type='radio' value='" + i + "'>", htmlToDraw += obj.value ? lng(obj.value) : "", htmlToDraw += "<div>", htmlToDraw += obj.desc ? lng(obj.desc) : "", htmlToDraw += "</div>", htmlToDraw += "</li>";
            htmlToDraw += "</ul>"
        }
        this.html(htmlToDraw), this.$input.unbind("blur"), this.$input.bind("change", context(this).callback(this.onfieldchangejq))
    }, this.val = function(value) {
        var valset = this.options.valset;
        if (!this.options.summary) {
            if (!no(value)) {
                var j = 0;
                for (var i in valset) value == i ? this.$input.eq(j).attr("checked", !0) : this.$input.eq(j).attr("checked", !1), j++
            }
            return this.$input.length > 0 && !this.$input.filter(":checked").length ? this.$input.filter(":eq(0)").val() : this.$input.filter(":checked").val()
        }
        no(value) || this.$input.html(lng(valset[value].value));
        var humanValue = this.$input.html();
        for (var i in valset)
            if (humanValue == lng(valset[i])) return i
    }
}

function jsCheckboxClientView(ctrl, viewInx, options) {
    jsCheckboxClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsCheckboxClientView.superclass.drawView.call(this);
        var htmlToDraw = "",
            options = this.options;
        options.summary ? (this.inputSel = options.viewBoxSel, delete this.inputId) : (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId, htmlToDraw += "<input type='checkbox' id='" + this.inputId + "' value='unimportant'>"), this.html(htmlToDraw), this.$input.unbind("blur"), this.$input.bind("change", context(this).callback(this.onfieldchangejq))
    }, this.val = function(value) {
        var options = this.options,
            valset = options.valset;
        return options.summary ? (no(value) || this.$input.html(value == valset.on ? lng("yes") : lng("no")), this.$input.html() == lng("yes") ? valset.on : valset.off) : (no(value) || (value == options.valset.on ? this.$input.attr("checked", !0) : this.$input.attr("checked", !1)), this.$input.attr("checked") ? valset.on : valset.off)
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsCheckboxClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        this.val(this.ctrl.model.value), jsCheckboxClientView.superclass.updateView.call(this)
    }
}

function jsNumberClientView(ctrl, viewInx, options) {
    jsNumberClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsNumberClientView.superclass.drawView.call(this)
    }, this.updateView = function() {
        jsNumberClientView.superclass.updateView.call(this)
    }, this.updateModel = function() {
        var res = !1;
        if (this.validate()) {
            res = jsNumberClientView.superclass.updateModel.call(this);
            var value = this.ctrl.model.value;
            value && "" != value && (this.ctrl.model.value = parseInt(this.ctrl.model.value, 10))
        }
        return res
    }, this.validate = function() {
        var value, re = new RegExp("^[0-9]+(.?[0-9]+|[0-9]*)$"),
            options = this.options;
        return value = this.val(), this.statusCode = value.match(/^\s*$/) ? "numEmpty" : re.test(value) ? !no(options.minval) && value < options.minval ? "numLessThanMin" : !no(options.maxval) && value > options.maxval ? "numMoreThanMax" : null : "numNaN", (this.options.ishidden || this.options.disabled) && this.statusCode && (this.val(void 0), this.statusCode = null), jsNumberClientView.superclass.validate.call(this)
    }
}

function jsStaticTextClientView(ctrl, viewInx, options) {
    jsStaticTextClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsStaticTextClientView.prototype.drawView = function() {
        jsStaticTextClientView.superclass.drawView.call(this);
        var options = this.options;
        this.inputSel = options.viewBoxSel, delete this.inputId, this.html("")
    }, this.val = function(value) {
        return no(value) || this.$input.html(value), this.$input.html()
    }, jsStaticTextClientView.prototype.updateView = function() {
        this.val(this.ctrl.model.value), jsStaticTextClientView.superclass.updateView.call(this)
    }
}

function jsSelectExClientView(ctrl, viewInx, options) {
    jsSelectExClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSelectExClientView.prototype.drawView = function() {
        var obj, htmlToDraw = "",
            options = this.options,
            childCtrls = ("elemID" + getUID(), this.ctrl.children);
        options.summary ? (this.inputSel = options.viewBoxSel + ">div.selectex>div.s_ex_input", this.childBoxSel = options.viewBoxSel + ">div.selectex>div.box", this.options.childBoxSel = this.childBoxSel, childCtrls.length > 0 && (obj = this.getChild(0), obj.options.viewBoxSel = this.options.childBoxSel, obj.viewBoxSel = obj.options.viewBoxSel), htmlToDraw += "<div class='selectex'>", htmlToDraw += "<div class='s_ex_input'></div>", htmlToDraw += "<div class='box'></div>", htmlToDraw += "</div>", delete this.inputId) : (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId, this.childBoxSel = options.viewBoxSel + ">div.selectex>div.box", this.options.childBoxSel = this.childBoxSel, childCtrls.length > 0 && (obj = this.getChild(0), obj.options.viewBoxSel = this.options.childBoxSel, obj.viewBoxSel = obj.options.viewBoxSel), htmlToDraw += "<div class='selectex'>", htmlToDraw += "<div class='s_ex_input'>", htmlToDraw += "<input type='text' id='" + this.inputId + "'", options.editable || (htmlToDraw += " readonly='readonly'"), htmlToDraw += "/>", htmlToDraw += "</div>", htmlToDraw += "<div class='s_ex_btn'>&nbsp;</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "<div class='box'></div>", htmlToDraw += "</div>"), this.html(htmlToDraw), jsSelectExClientView.superclass.drawView.call(this), options.summary || (options.width && $(this.childBoxSel).css("width", options.width), options.height && $(this.childBoxSel).css("height", options.height), childCtrls.length > 0 && $(this.childBoxSel).append("<div/>"), options.disabled ? $(options.viewBoxSel + ">div.selectex>div.s_ex_btn").addClass("disabled") : (this.$input.click(context(this).callback(this.showBox)), $(options.viewBoxSel + ">div.selectex>div.s_ex_btn").click(context(this).callback(this.setDisplayBox)), this.$input.keypress(context(this).callback(this.keyPress)), ($.browser.msie || $.browser.webkit) && this.$input.keydown(context(this).callback(this.keyDown)), $(window).click(context(this).callback(this.onbodyclick)), $(options.viewBoxSel).click(context(this).callback(this.onviewboxclick))), this.getChild(0).setItemSelected(this.ctrl.model.value))
    }, this.onbodyclick = function() {
        return this.infocus || this.hideBox(this.getChild(0).selectedSelectExItem.length), this.infocus = !1, !0
    }, this.onviewboxclick = function() {
        this.infocus = !0
    }, this.setDisplayBox = function(e) {
        return this.$input.focus(), $(this.childBoxSel).is(":visible") ? this.hideBox(!1) : this.showBox(), this.onviewboxclick(e), $(window).click(), !1
    }, this.showBox = function() {
        $(this.childBoxSel).show()
    }, this.hideBox = function(isSelected) {
        isSelected || this.updateView(), $(this.childBoxSel).hide()
    }, this.keyDown = function(event) {
        return 9 == event.keyCode || 38 == event.keyCode || 40 == event.keyCode ? (this.keyPress(event), !1) : void 0
    }, this.keyPress = function(event) {
        var item, name, rootOfList = this.getChild(0);
        if (13 == event.keyCode)
            if ($(this.childBoxSel).is(":visible")) {
                if (rootOfList.currentSelectExItem) {
                    rootOfList.currentSelectExItem.getName() && this.onselectitem(rootOfList.currentSelectExItem);
                    var i = this.$input.val().length;
                    this.$input.caret(i, i)
                }
            }
            else $(this.childBoxSel).is(":visible") || this.showBox();
        if (!isCharCode(event.which) && 9 != event.keyCode && 38 != event.keyCode && 40 != event.keyCode) return !0;
        if ($(this.childBoxSel).is(":visible") || this.showBox(), 38 == event.keyCode) return rootOfList.currentSelectExItem.ctrl.thisInx > 0 && (item = rootOfList.currentSelectExItem.getParent().getChild(rootOfList.currentSelectExItem.ctrl.thisInx - 1).setItemSelected(), name = item.getName(), name && this.$input.val(lng(name))), !0;
        if (40 == event.keyCode) return rootOfList.currentSelectExItem.ctrl.thisInx < rootOfList.currentSelectExItem.ctrl.getParent().children.length - 1 && (item = rootOfList.currentSelectExItem.getParent().getChild(rootOfList.currentSelectExItem.ctrl.thisInx + 1).setItemSelected(), name = item.getName(), name && this.$input.val(lng(name))), !0;
        var nchar = "",
            offset = 0;
        9 != event.keyCode && 38 != event.keyCode && 40 != event.keyCode && (rootOfList.clearVisited(), nchar = String.fromCharCode(event.which), offset = 1);
        var caret = $(event.target).caret(),
            leftText = this.$input.val().substring(0, caret.start) + nchar,
            rightText = rootOfList.searchItem(leftText);
        return rootOfList.selectedSelectExItem.length > 0 && null == rightText && (rootOfList.clearVisited(), rightText = rootOfList.searchItem(leftText)), null != rightText ? (this.$input.val(rightText), this.$input.caret(caret.start + offset, rightText.length)) : this.$input.caret(caret.start, this.$input.val().length), !1
    }, isCharCode = function(x) {
        return x > 46 && 91 != x && 92 != x || 32 == x ? !0 : !1
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsSelectExClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        this.val(this.ctrl.model.value), jsSelectExClientView.superclass.updateView.call(this)
    }, this.onselectitem = function(obj) {
        var name = lng(obj.getName()),
            val = obj.ctrl.model.getValue();
        return this.tempValue = val, this.$input.val(name), obj.setItemSelected(), this.hideBox(!0), this.ctrl.event("fieldchange", {
            view: this,
            value: val
        }, !0), !1
    }, this.val = function(value) {
        if (!no(value)) {
            var name = this.getChild(0).findItemName(value);
            this.options.summary ? this.$input.html(lng(name)) : this.$input.val(lng(name)), this.tempValue = value
        }
        return this.tempValue
    }, this.bind("selectitem", this.onselectitem), this.tempValue = this.ctrl.model.value, this.infocus = !1
}

function jsSelectExItemModel(itemInfo) {
    jsSelectExItemModel.superclass.constructor.call(this), this.itemName = itemInfo.name ? itemInfo.name : "", this.itemValue = itemInfo.value ? itemInfo.value : null, this.getValue = function() {
        return this.ctrl.children.length ? null : this.ctrl.model.itemValue
    }
}

function jsSelectExItemController(itemInfo) {
    jsSelectExItemController.superclass.constructor.call(this), void 0 == itemInfo && (itemInfo = {}), this.changeModel(new jsSelectExItemModel(itemInfo)), this.ifaceTypes.tree = {
        type: jsSelectExItemView,
        def: !0,
        options: {
            style: null,
            open: !1,
            noPath: !0
        }
    }
}

function jsSelectExItemView(ctrl, viewInx, options) {
    jsSelectExItemView.superclass.constructor.call(this, ctrl, viewInx, options), this.getName = function() {
        return this.ctrl.children.length ? null : this.ctrl.model.itemName
    }, this.click = function() {
        return this.ctrl.event("selectitem", this, !0), !0
    }, jsSelectExItemView.prototype.drawView = function() {
        jsSelectExItemView.superclass.drawView.call(this), this.ctrl.root || ($(this.myBoxSel).html(lng(this.ctrl.model.itemName)), $(this.viewBoxSel).parent().addClass("selectexItem"), this.ctrl.children.length > 0 ? $(this.viewBoxSel).addClass("branch_close") : ($(this.viewBoxSel).addClass("leaf"), $(this.viewBoxSel + ">a").bind("click", context(this).callback(this.click))))
    }, jsSelectExItemView.prototype.onactivate = function() {
        return jsSelectExItemView.superclass.onactivate.call(this), this.ctrl.root || (this.ctrl.children.length > 0 ? ($(this.viewBoxSel).removeClass("branch_close"), $(this.viewBoxSel).addClass("branch_open")) : $(this.viewBoxSel + ">a").css("font-weight", "normal")), !1
    }, jsSelectExItemView.prototype.ondeactivate = function() {
        return jsSelectExItemView.superclass.ondeactivate.call(this), this.ctrl.root || this.ctrl.children.length > 0 && ($(this.viewBoxSel).removeClass("branch_open"), $(this.viewBoxSel).addClass("branch_close")), !1
    }, this.setItemSelected = function(value) {
        if (no(value) || value == this.ctrl.model.itemValue) return this.clearSelection(), $(this.options.viewBoxSel).addClass("marked"), this.ctrl.activate(), this.rootOfTree.currentSelectExItem = this, this.rootOfTree.selectedSelectExItem.push(this), this;
        var obj;
        for (var i in this.ctrl.children)
            if (obj = this.getChild(i).setItemSelected(value)) return obj;
        return null
    }, this.clearSelection = function() {
        $(this.rootOfTree.options.viewBoxSel + " ul.selectexItem>li.marked").removeClass("marked")
    }, this.clearVisited = function() {
        this.rootOfTree.selectedSelectExItem = []
    }, this.isNotVisited = function() {
        for (var i in this.rootOfTree.selectedSelectExItem)
            if (this.rootOfTree.selectedSelectExItem[i] == this) return !1;
        return !0
    }, this.searchItem = function(str) {
        var result = null,
            currName = lng(this.ctrl.model.itemName);
        if (this.isNotVisited() && !no(this.ctrl.model.itemValue) && currName.length >= str.length && currName.substring(0, str.length).toLowerCase() == str.toLowerCase()) return this.setItemSelected(), currName;
        for (var i in this.ctrl.children)
            if (result = this.getChild(i).searchItem(str), !no(result)) return result;
        return null
    }, this.findItemName = function(value) {
        var model = this.ctrl.model;
        if (model.itemValue == value) return model.itemName;
        var itemName;
        for (var i in this.ctrl.children)
            if (itemName = this.getChild(i).findItemName(value), !no(itemName)) return itemName;
        return null
    }, this.selectedSelectExItem = [], this.bind("activate", this.onactivate), this.bind("deactivate", this.ondeactivate)
}

function jsSubNetAddrModel(bits, addr, radix, delim, expandZero, omitFullMask) {
    jsSubNetAddrModel.superclass.constructor.call(this), jsSubNetAddrModel.prototype.getMaskParts = function() {
        for (var i = 0, partCount = this.parts.length, partMax = Math.pow(2, this.partBitCount) - 1, b = this.bitmask - this.partBitCount, maskParts = new Array; b >= 0 && partCount > i;) maskParts[i++] = partMax, b -= this.partBitCount;
        if (partCount > i)
            for (0 > b && b < Math.abs(this.partBitCount) && (maskParts[i++] = ~(Math.pow(2, Math.abs(b)) - 1) & Math.pow(2, this.partBitCount) - 1); partCount > i;) maskParts[i++] = 0;
        return maskParts
    }, jsSubNetAddrModel.prototype.applyMask = function() {
        for (var maskParts = this.getMaskParts(), i = 0; i < this.parts.length; i++) this.parts[i] = this.parts[i] & maskParts[i]
    }, jsSubNetAddrModel.prototype.setParts = function(addr, radix, delim) {
        try {
            this.attrs = addr.__attrs__
        }
        catch (e) {}
        if (!(addr instanceof Array)) {
            var addrArray = new String(addr).split("/");
            addr = addrArray[0], this.bitmask = addrArray.length > 1 ? addrArray[1] : this.bits
        }
        if (this.radix = no(radix) ? this.radix : radix, this.delim = no(delim) ? this.delim : delim, !addr && this.parts instanceof Array)
            for (var i in this.parts) this.parts[i] = null;
        else if (addr)
            if (addr instanceof Array) this.parts = addr;
            else if (this.radix && this.delim) {
            var strParts = addr.split(this.delim);
            this.partBitCount = this.bits / strParts.length;
            for (var i in strParts) this.parts[i] = this.parsePart(strParts[i], this.radix)
        }
        this.partBitCount = this.bits / this.parts.length, this.digitCount = Math.ceil(Math.log(Math.pow(2, this.partBitCount)) / Math.log(this.radix))
    }, jsSubNetAddrModel.prototype.parsePart = function(part, radix) {
        var res = null;
        return this.checkPart(part, Math.pow(2, this.partBitCount) - 1) || (res = parseInt(part, radix)), res
    }, this.checkPart = function(part, maxval, radix) {
        var res = null,
            empty = no(part) || part.toString().match(/^\s*$/),
            isString = part instanceof String || "string" == typeof part,
            radix = radix ? radix : this.radix;
        if (empty) res = "Empty";
        else {
            if (isString) {
                var p = parseInt(part, radix).toString(radix);
                part.match(/^0+$/) || "NaN" != p && p.length == part.replace(/^0*/, "").length ? part = parseInt(part, radix) : res = "NaN"
            }
            res || (0 > part ? res = "OutOfScope" : part > maxval && (res = "OutOfScope"))
        }
        return res
    }, jsSubNetAddrModel.prototype.toString = function() {
        var part, parts = this.parts,
            addr = "",
            clear = !1,
            format = "%." + this.digitCount;
        switch (this.radix) {
            case 2:
                format += "b";
                break;
            case 8:
                format += "o";
                break;
            case 10:
                format += "d";
                break;
            case 16:
                format += "X";
                break;
            default:
                format += "d"
        }
        if (parts.length) {
            for (var noPart, i = 0; i < parts.length - 1; i++) {
                if (part = parts[i], noPart = no(part) && !this.optionalParts, noPart || this.checkPart(part, Math.pow(2, this.partBitCount) - 1)) {
                    clear = !0;
                    break
                }
                no(part) && (part = 0), addr += this.expandZero ? sprintf(format, part) + this.delim : part.toString(this.radix) + this.delim
            }
            part = parts[parts.length - 1], noPart = no(part) && !this.optionalParts, noPart || clear ? addr = "" : (no(part) && (part = 0), addr += this.expandZero ? sprintf(format, part) : part.toString(this.radix))
        }
        return this.omitFullMask ? "" != addr && this.bitmask && this.bitmask < this.bits && (addr += "/" + this.bitmask) : "" != addr && this.bitmask && (addr += "/" + this.bitmask), addr
    }, this.bitmask = bits, this.omitFullMask = omitFullMask, this.parts = [], this.bits = bits, this.radix = radix, this.delim = delim, this.partBitCount = null, this.digitCount = null, addr instanceof Object && (this.attrs = addr.__attrs__), this.setParts(addr, radix, delim), this.expandZero = expandZero
}

function jsSubNetAddrController(bits, addr, radix, delim, expandZero, omitFullMask) {
    jsSubNetAddrController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsSubNetAddrSlotView,
        options: {}
    }, this.addChild(new jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, omitFullMask), "field"), this.changeModel(this.getChild("field").model)
}

function jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, omitFullMask) {
    jsSubNetAddrFieldController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsSubNetAddrClientView,
        options: {}
    }, this.changeModel(new jsSubNetAddrModel(bits, addr, radix, delim, expandZero, omitFullMask))
}

function jsSubNetAddrSlotView(ctrl, viewInx, options) {
    ctrl.getChild("field").nextIface = ctrl.lastIface, options.mandatory = !0, jsSubNetAddrSlotView.superclass.constructor.call(this, ctrl, viewInx, options), jsSubNetAddrSlotView.prototype.drawView = function() {
        try {
            switch (this.ctrl.model.attrs.mode) {
                case 4:
                    this.setOption("disabled", !0);
                    break;
                case 0:
                    this.options.hide = !0
            }
        }
        catch (e) {}
        jsSubNetAddrSlotView.superclass.drawView.call(this)
    }
}

function jsSubNetAddrClientView(ctrl, viewInx, options) {
    jsSubNetAddrClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSubNetAddrClientView.prototype.drawView = function() {
        jsSubNetAddrClientView.superclass.drawView.call(this);
        var htmlToDraw, model = this.ctrl.model,
            options = this.options;
        if (options.summary) this.inputSel = options.viewBoxSel, delete this.inputId;
        else {
            no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId;
            var size = model.digitCount * model.parts.length + model.parts.length - 1;
            htmlToDraw = "<input id='" + this.inputId + "' type='", htmlToDraw += options.password ? "password" : "text", htmlToDraw += "' maxlength='" + size + "'", htmlToDraw += "' size='" + size + "'", htmlToDraw += "/>"
        }
        if (this.html(htmlToDraw), !options.summary && (model.bitmask < model.bits || !model.omitFullMask)) {
            var size = parseInt(this.$input.attr("size"));
            this.bitmaskDigitCount = Math.ceil(Math.log(this.ctrl.model.bits) / Math.log(10)), size += this.bitmaskDigitCount + 1, this.$input.attr("size", size).attr("maxlength", size)
        }
    }, jsSubNetAddrClientView.prototype.validate = function() {
        this.statusCode = null;
        var notEmpty;
        value = this.val();
        var realtek = this.options.isRealtek;
        value.match(/^\s*$/) && (this.statusCode = "netAddrEmpty"), value = value.split("/")[0];
        for (var parts = value.split(this.ctrl.model.delim), i = 0; i < parts.length; i++)
            if (value = parts[i], no(value) || value.toString().match(/^\s*$/) || (notEmpty = !0), this.statusCode = this.ctrl.model.checkPart(value, Math.pow(2, this.partBitCount) - 1), (this.options.ishidden || this.options.disabled) && this.statusCode && (this.val(void 0), this.statusCode = null), this.statusCode) {
                "Empty" == this.statusCode && (this.statusCode = "Invalid"), this.statusCode = "netAddr" + this.statusCode;
                break
            }
        if (realtek && "LAN" == options.pageTitle && (255 != parts[0] || 255 != parts[1] || 255 != parts[2]) && (this.statusCode = "NetmaskErrorRealtek"), this.options.ishidden || this.options.disabled || notEmpty || (this.statusCode = "netAddrEmpty"), !this.statusCode) {
            var arr = value.split("/");
            arr instanceof Array && arr[1] && (this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10), this.statusCode && (this.statusCode = "netAddr" + this.statusCode))
        }
        return jsSubNetAddrClientView.superclass.validate.call(this)
    }, jsSubNetAddrClientView.prototype.updateModel = function() {
        return this.validate() ? (this.ctrl.model.setParts(this.val()), jsSubNetAddrClientView.superclass.updateModel.call(this)) : !1
    }, jsSubNetAddrClientView.prototype.updateView = function() {
        this.val(this.ctrl.model.toString()), jsSubNetAddrClientView.superclass.updateView.call(this)
    }, jsSubNetAddrClientView.prototype.onfieldchange = function(obj) {
        return this.ctrl.subIPController && this.ctrl.subIPController.getChild(0).event("guessmask", obj.value), !0
    }, this.onguessmask = function(ip) {
        function guessMask(ip) {
            if (ip.indexOf(".") > 0) {
                if (options.isRealtek && "LAN" == options.pageTitle) return "255.255.255.0";
                var classX = parseInt(ip.substring(0, ip.indexOf(".")));
                return classX >= 1 && 126 >= classX ? "255.0.0.0" : classX >= 128 && 191 >= classX ? "255.255.0.0" : classX >= 192 && 223 >= classX ? "255.255.255.0" : "255.255.255.0"
            }
            return null
        }
        var mask = guessMask(ip);
        return mask && (this.ctrl.model.setParts(mask), this.updateView()), !0
    }, this.partCount = this.ctrl.model.parts.length, this.partBitCount = this.ctrl.model.bits / this.partCount, this.bitmaskDigitCount = Math.ceil(Math.log(this.ctrl.model.bits) / Math.log(10)), this.bind("fieldchange", this.onfieldchange), this.bind("guessmask", this.onguessmask)
}

function jsNetAddrController(bits, addr, radix, delim, expandZero) {
    jsNetAddrController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsSubNetAddrSlotView,
        options: {}
    }, this.addChild(new jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, !0), "field"), this.changeModel(this.getChild("field").model)
}

function jsMAController(addr) {
    addr || (addr = [null, null, null, null, null, null]), jsMAController.superclass.constructor.call(this, 48, addr, 16, ":", !0), this.ifaceTypes.client.options = {
        delim: ":",
        radix: 16
    }
}

function jsSubNetIPModel(bits, addr, radix, delim, expandZero, omitFullMask) {
    jsSubNetIPModel.prototype.setParts = function(addr, radix, delim, ipmapped) {
        if (32 == this.bits) jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim);
        else if (!addr || addr instanceof Array) jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim);
        else {
            this.radix = no(radix) ? this.radix : radix, this.delim = no(delim) ? this.delim : delim, this.partBitCount = 16;
            var bitmask = addr.split("/")[1];
            this.bitmask = no(bitmask) ? this.bits : parseInt(bitmask), addr.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/) ? this.parts = this.parseIPv4MappedIPv6(addr) : addr.match(/::/) || addr.match(/^0+:0+/) || addr.match(/0+:0+$/) ? this.parts = this.parseShortNotation(addr) : jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim), this.partBitCount = this.bits / this.parts.length, this.digitCount = Math.ceil(Math.log(Math.pow(2, this.partBitCount)) / Math.log(this.radix)), this.ipmapped = ipmapped
        }
    }, this.parseShortNotation = function(addr) {
        addr = addr.split(/\//)[0], addr = addr.replace(/^::/, "z:"), addr = addr.replace(/::$/, ":z"), addr = addr.replace(/^0:0/, "z:"), addr = addr.replace(/0:0$/, ":z"), addr = addr.replace(/::/, ":z:");
        var arr = addr.split(/:/),
            parts = [0, 0, 0, 0, 0, 0, 0, 0],
            j = 0;
        for (var i in arr) {
            if ("z" == arr[i]) break;
            parts[j++] = this.parsePart(arr[i], this.radix)
        }
        j = parts.length - 1;
        for (var i = arr.length - 1; i >= 0 && "z" != arr[i]; i--) parts[j--] = this.parsePart(arr[i], this.radix);
        return parts
    }, this.parseIPv4MappedIPv6 = function(addr) {
        var parts = [0, 0, 0, 0, 0, 65535, 0, 0],
            ipv4 = addr.match(/[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)[0],
            arr = ipv4.split("."),
            part7 = sprintf("%.2X%.2X", parseInt(arr[0], 10), parseInt(arr[1], 10));
        parts[6] = this.parsePart(part7, this.radix);
        var part8 = sprintf("%.2X%.2X", parseInt(arr[2], 10), parseInt(arr[3], 10));
        return parts[7] = this.parsePart(part8, this.radix), parts
    }, jsSubNetIPModel.prototype.toString = function(noMappedIPv4) {
        if (32 == this.bits) return jsSubNetIPModel.superclass.toString.call(this);
        var addr = "",
            parts = this.parts,
            ipmapped = _.isUndefined(noMappedIPv4) ? !this.ipmapped : !noMappedIPv4;
        if (ipmapped || 0 != parts[0] || 0 != parts[1] || 0 != parts[2] || 0 != parts[3] || 0 != parts[4] || 65535 != parts[5]) {
            for (var z = 0, clear = !1, part = null, i = 0; i < parts.length - 1; i++) {
                if (part = parts[i], no(part) || this.checkPart(part, Math.pow(2, this.partBitCount) - 1)) {
                    clear = !0;
                    break
                }
                part || z > 0 && i >= z ? addr += part.toString(this.radix) : z++, addr += this.delim
            }
            no(parts[parts.length - 1]) || clear ? addr = "" : (parts[parts.length - 1] || z > 0 && i >= z) && (addr += parts[parts.length - 1].toString(this.radix)), addr = addr.replace(/:[0:]+/, "::"), addr = addr.replace(/::[0:]+/, "::"), addr = addr.replace(/:::+/, "::"), clear || !(this.bitmask < this.bits) && this.omitFullMask || (addr += "/" + this.bitmask)
        }
        else no(parts[6]) || no(parts[7]) || (addr = sprintf("::ffff:%d.%d.%d.%d", (65280 & parts[6]) >>> 8, 255 & parts[6], (65280 & parts[7]) >>> 8, 255 & parts[7]), (this.bitmask < this.bits || !this.omitFullMask) && (addr += "/" + this.bitmask));
        return addr
    }, jsSubNetIPModel.superclass.constructor.call(this, bits, addr, radix, delim, expandZero, omitFullMask)
}

function jsSubNetIPController(addr, version, omitFullMask) {
    jsSubNetIPController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsSubNetAddrSlotView,
        options: {}
    }, this.addChild(new jsSubNetIPFieldController(addr, version, omitFullMask), "field"), this.changeModel(this.getChild("field").model), this.setVersion = function(version) {
        this.getChild("field").setVersion(version)
    }
}

function jsSubNetIPFieldController(addr, version, omitFullMask) {
    jsSubNetIPFieldController.superclass.constructor.call(this);
    var radix = 10,
        delim = ".",
        bits = 32;
    version && 6 == version ? (addr || (addr = [null, null, null, null, null, null, null, null]), radix = 16, delim = ":", bits = 128) : addr || (addr = [null, null, null, null]), this.ifaceTypes.client = {
        type: jsSubNetIPClientView,
        options: {}
    }, this.changeModel(new jsSubNetIPModel(bits, addr, radix, delim, !1, omitFullMask)), this.setVersion = function(version) {
        var model = this.model;
        version && 6 == version ? (model.bits = 128, model.radix = 16, model.delim = ":", model.setParts([null, null, null, null, null, null, null, null])) : (model.bits = 32, model.radix = 10, model.delim = ".", model.setParts([null, null, null, null])), model.bitmask = model.bits, model.partBitCount = model.bits / model.parts.length, model.digitCount = Math.ceil(Math.log(Math.pow(2, model.partBitCount)) / Math.log(model.radix))
    }
}

function jsSubNetIPv4Controller(addr) {
    jsSubNetIPv4Controller.superclass.constructor.call(this, addr, 4)
}

function jsSubNetIPv6Controller(addr) {
    jsSubNetIPv6Controller.superclass.constructor.call(this, addr, 6, !1)
}

function jsSubNetIPClientView(ctrl, viewInx, options) {
    jsSubNetIPClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSubNetIPClientView.prototype.validate = function() {
        this.statusCode = null;
        var arr, value = this.val();
        if (this.options.ishidden || this.options.disabled) return jsSubNetAddrClientView.superclass.validate.call(this);
        if (value.match(/^$/)) return this.statusCode = "netAddrEmpty", jsSubNetAddrClientView.superclass.validate.call(this);
        if (128 == this.ctrl.model.bits) {
            if (this.ctrl.model.partBitCount = 16, value.match(/::/) || value.match(/^0+:0+/) || value.match(/0+:0+$/)) {
                if (!(value.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/) || (value.match(/^\s*$/) && (this.statusCode = "netAddrEmpty"), value.match(/^::$/) || value.match(/^::[0:]*$/) || value.match(/^[0:]*::$/)))) {
                    var parts = this.ctrl.model.parseShortNotation(value);
                    if ((no(parts[0]) || no(parts[1]) || no(parts[2]) || no(parts[3]) || no(parts[4]) || no(parts[5]) || no(parts[6]) || no(parts[7])) && (this.statusCode = "netAddrInvalid"), !this.statusCode) {
                        var arr = value.split("/");
                        arr instanceof Array && arr[1] && (this.options.noPrefix ? this.statusCode = "netAddrInvalidNoPrefix" : (this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10), this.statusCode && (this.statusCode = "netAddr" + this.statusCode)))
                    }
                }
                return jsSubNetAddrClientView.superclass.validate.call(this)
            }
            return arr = value.split(":"), 8 == arr.length ? jsSubNetIPClientView.superclass.validate.call(this) : (this.statusCode = "netAddrInvalid", jsSubNetAddrClientView.superclass.validate.call(this))
        }
        return this.ctrl.model.partBitCount = 8, arr = value.split("."), 4 == arr.length ? jsSubNetIPClientView.superclass.validate.call(this) : (this.statusCode = "netAddrInvalid", jsSubNetAddrClientView.superclass.validate.call(this))
    }
}

function jsIPController(addr, version, subIPController, realtek) {
    jsIPController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsSubNetAddrSlotView,
        options: {}
    }, this.addChild(new jsIPFieldController(addr, version, subIPController, realtek), "field"), this.changeModel(this.getChild("field").model), this.setVersion = function(version) {
        this.getChild("field").setVersion(version)
    }
}

function jsIPFieldController(addr, version, subIPController, realtek) {
    jsIPFieldController.superclass.constructor.call(this), this.subIPController = subIPController ? subIPController : null;
    var radix = 10,
        delim = ".",
        bits = 32;
    version && 6 == version ? (addr || (addr = [null, null, null, null, null, null, null, null]), radix = 16, delim = ":", bits = 128) : addr || (addr = [null, null, null, null]), this.changeModel(new jsSubNetIPModel(bits, addr, radix, delim, !1, !0)), this.ifaceTypes.client = {
        type: jsSubNetIPClientView,
        options: {
            isRealtek: realtek
        }
    }, this.setVersion = function(version) {
        var model = this.model;
        version && 6 == version ? (model.bits = 128, model.radix = 16, model.delim = ":", model.setParts([null, null, null, null, null, null, null, null])) : (model.bits = 32, model.radix = 10, model.delim = ".", model.setParts([null, null, null, null])), model.bitmask = model.bits, model.partBitCount = model.bits / model.parts.length, model.digitCount = Math.ceil(Math.log(Math.pow(2, model.partBitCount)) / Math.log(model.radix))
    }
}

function jsIPv4Controller(addr, subIPv4Controller, realtek) {
    jsIPv4Controller.superclass.constructor.call(this, addr, 4, subIPv4Controller, realtek)
}

function jsIPv6Controller(addr) {
    jsIPv6Controller.superclass.constructor.call(this, addr, 6, null)
}

function jsDecorController() {
    jsDecorController.superclass.constructor.call(this), this.ifaceTypes.separator = {
        type: jsSeparatorView
    }
}

function jsSeparatorView(ctrl, viewInx, options) {
    jsSeparatorView.superclass.constructor.call(this, ctrl, viewInx, options), jsSeparatorView.prototype.drawView = function() {
        jsSeparatorView.superclass.drawView.call(this);
        var htmlToDraw, options = this.options ? this.options : {};
        htmlToDraw = "<div class='decorSeparator'><div class='decorLabelImage'></div><div class='decorLabelText'>", options.label && (htmlToDraw += "<font>&nbsp;&nbsp;" + lng(options.label) + "</font>"), htmlToDraw += "</font></div><div class='decorEndUpImage'></div></div>", htmlToDraw += "<div class='decorSection'><div class='decorDescImage'></div>", htmlToDraw += "</div>", options.descText && (htmlToDraw += "<div class='decorDescText'>" + lng(options.descText) + "</div>"), htmlToDraw += "<div class='decorSpacer'></div>", $(options.viewBoxSel).html(htmlToDraw)
    }
}

function node(options) {
    this.options = options ? options : {}, node.prototype.add = function(obj, alias, arg3) {
        return this.children.push(obj), obj.parent = this, obj.root = this.root, alias && (this.childrenRefs[alias] = obj), is.set(arg3) && this.locate(this.children.length - 1, arg3), this
    }, node.prototype.child = function(i) {
        if (is.number(i)) return getChild.call(this, i);
        if (is.string(i)) {
            var arr = i.split("/"),
                begin = 0,
                obj = this;
            arr[0].length || (begin = 1, obj = this.root);
            for (var num, item, ii = begin; ii < arr.length; ii++) item = arr[ii], num = Number(item), obj = num.toString() == arr[ii] ? getChild.call(obj, num) : ".." == item ? obj.parent : getChild.call(obj, arr[ii]);
            return obj
        }
        return null
    }, node.prototype.get = node.prototype.child, node.prototype.setAlias = function(i, alias) {
        return this.childrenRefs[alias] = this.child(i), this
    }, node.prototype.getAlias = function() {
        var brothers = this.parent.childrenRefs;
        for (var i in brothers)
            if (brothers[i] === this) return i;
        return null
    }, node.prototype.replace = function(i, obj) {
        if (is.number(i)) {
            var child = this.children[i],
                parent = this;
            for (var j in this.childrenRefs)
                if (this.childrenRefs[j] == child) {
                    this.childrenRefs[j] = obj;
                    break
                }
            this.children[i] = obj
        }
        else if (is.string(i)) {
            var child = this.get(i),
                parent = child.get(".."),
                alias = child.getAlias();
            for (var j in parent.children)
                if (child == parent.children[j]) {
                    parent.children[j] = obj;
                    break
                }
            parent.childrenRefs[alias] = obj
        }
        return obj instanceof node && child instanceof node && (obj.parent = parent, obj.boxid = child.boxid, child.$box.isRendered() && obj.locate(child.$outerBox).deep.updateView()), this
    }, node.prototype.set = function(obj, i, arg3) {
        return is.set(this.get(i)) ? this.replace(i, obj) : is.string(i) && this.add(obj, i, arg3), this
    }, node.prototype.index = function() {
        for (var arr = this.parent.children, i = 0; i < arr.length; i++)
            if (arr[i] == this) return i;
        return -1
    }, node.prototype.emit = function(arg) {
        if (is.object(arg)) {
            var status = arg;
            status.target = this;
            var type = status.type
        }
        else var type = arg,
            status = {
                target: this,
                type: type,
                bubbling: !0
            };
        if (is.set(type)) {
            var args = (this.events[type], [status]);
            args = args.concat(Array.prototype.slice.call(arguments, 1)), callHandlers.apply(this, args)
        }
        return this
    }, node.prototype.bind = function(typeList, handler) {
        if (is.unset(typeList)) return this;
        for (var arr = typeList.split(" "), i = 0; i < arr.length; i++) {
            var type = arr[i];
            if (!is.object(this.events[type])) {
                var event = this.events[type] = {};
                event.handlers = []
            }
            this.events[type].handlers.push(handler)
        }
        return this
    }, node.prototype.unbind = function(type, handler) {
        if (is.string(type))
            if (is.func(handler)) {
                var event = this.events[type];
                for (var i in event.handlers)
                    if (event.handlers[i] == handler) {
                        event.handlers[i] = null;
                        break
                    }
            }
            else delete this.events[type];
        else this.events = {};
        return this
    }, node.prototype.listen = function(path, type, handler) {
        var callback = context(this).callback(handler);
        return this.listeners.push({
            handler: handler,
            callback: callback
        }), this.get(path).bind(type, callback), this
    }, node.prototype.unbindListener = function(path, type, handler) {
        var obj, listeners = this.listeners;
        for (var i in listeners)
            if (obj = listeners[i], is.set(obj) && obj.handler == handler) {
                this.get(path).unbind(type, obj.callback), delete obj;
                break
            }
    }, node.prototype.updateView = function(phase) {
        if ("forward" == phase) {
            if (!this.$outerBox.isRendered()) {
                if (this.parent && this.parent.$box.length) var $pbox = this.parent.$box;
                else var $pbox = $("body");
                this.$outerBox = $pbox.append("<div class='nodebox'></div>").find("div.nodebox:last")
            }
            var id = this.$outerBox.attr("id");
            is.set(id) && id.length ? this.boxid = this.$outerBox.attr("id") : this.$outerBox.attr("id", this.id), this.$outerBox.html("<div class='nodecontent'></div>"), this.$buttonBar.isRendered() || (this.$outerBox.append("<div class='buttonbar' id='" + this.boxid + "ButtonBar'></div>"), this.$buttonBar = $("#" + this.boxid + "ButtonBar")), this.parent || this.$outerBox.data("rootNode", this).attr("rootNode", "yes"), this.$box = this.$innerBox = this.$outerBox.find(">.nodecontent"), this.options.hidden && this.hide()
        }
        return this
    }, node.prototype.toHTML = function() {
        return this.$box.isRendered() || this.deep.updateView(), "<div class='nodebox'>" + this.$outerBox.html() + "</div>"
    }, node.prototype.jQuery = function(i) {
        return is.set(i) ? this.child(i).$box : this.$box
    }, node.prototype.locate = function(arg1, arg2) {
        if (is.set(arg2)) {
            if (is.number(arg1) || is.string(arg1)) is.jquery(arg2) ? this.child(arg1).$outerBox = arg2 : is.string(arg2) && (this.child(arg1).$outerBox = this.$box.find(arg2));
            else if (is.object(arg1))
                for (var i in arg1) is.jquery(arg2) ? this.child(i).$outerBox = arg1[i] : is.string(arg2) && (this.child(i).$outerBox = this.$box.find(arg1[i]))
        }
        else is.jquery(arg1) ? this.$outerBox = arg1 : is.string(arg1) && (this.$outerBox = $(arg1));
        return this
    }, node.prototype.addButton = function(name, options) {
        var $buttonBar = this.$buttonBar;
        return is.jquery($buttonBar) && (this.buttons[name] = $buttonBar.append("<div class='buttonbox'></div>").find("div.buttonbox:last").lightUIButton(name, options)), this
    }, node.prototype.getButton = function(name) {
        return this.buttons[name]
    }, node.prototype.cleanButtonBar = function() {
        return this.buttons = [], this.$buttonBar.find("*").remove(), this
    }, node.prototype.initForm = function() {
        return this.children = [], this.childrenRefs = {}, this
    }, node.prototype.startForm = node.prototype.initForm, node.prototype.endForm = function() {
        for (var child, i = 0; i < this.children.length; i++) child = this.get(i), child.emit({
            type: "endform",
            bubbling: !1
        }, child.val());
        return this
    }, node.prototype.buttonBar = function($obj) {
        return is.jquery($obj) ? (this.$buttonBar = $obj, this) : this.$buttonBar
    }, node.prototype.hide = function() {
        return this.options.hidden = !0, this.$outerBox.hide(), this
    }, node.prototype.show = function() {
        return this.options.hidden = !1, this.$outerBox.show(), this
    }, node.prototype.nchild = function() {
        return this.children.length
    }, node.prototype.self = this, node.prototype.val = function() {}, this.jq = null, this.model = {}, this.s = null, this.parent = null, this.events = {}, this.listeners = [], this.bubbling = !0, this.$box = this.$outerBox = this.$innerBox = $(), this.boxid = gID.get(), this.id = this.boxid, this.buttons = {}, this.$buttonBar = $(), this.root = this, this.initForm();
    var callHandlers = function(status) {
            var event = this.events[status.type];
            if (is.object(event))
                for (var i in event.handlers) is.func(event.handlers[i]) && event.handlers[i].apply(this, arguments);
            status.bubbling && this.parent instanceof node && callHandlers.apply(this.parent, arguments)
        },
        getChild = function(i) {
            return is.number(i) ? this.children[i] : is.string(i) ? this.childrenRefs[i] : null
        };
    this.deep = function(methodName, arg1) {
        var method = this[methodName];
        if (method = is.func(method) ? method : function() {}, is.object(arg1)) var status = arg1,
            phase = status.phase ? status.phase : "back";
        else if (is.string(arg1)) var phase = arg1,
            status = arg1 = {
                phase: phase
            };
        else var phase = "back",
            status = arg1 = {
                phase: phase
            };
        var methodArgs = Array.prototype.slice.call(arguments, 2).concat([status]);
        switch (phase) {
            case "both":
                method.apply(this, ["forward"].concat(methodArgs)), status.stop || (this.deepInner.apply(this, arguments), method.apply(this, ["back"].concat(methodArgs)));
                break;
            case "forward":
                method.apply(this, methodArgs), status.stop || this.deepInner.apply(this, arguments);
                break;
            case "back":
                this.deepInner.apply(this, arguments), method.apply(this, methodArgs)
        }
        return this
    }, this.deepInner = function() {
        var args = arguments;
        return this.each(function(i, child) {
            child.deep.apply(child, args)
        }), this
    }, this.each = function(c) {
        if (is.func(c))
            for (var i in this.children) c(i, this.child(i));
        else if (is.string(c)) {
            var child, method, methodArgs = Array.prototype.slice.call(arguments, 1);
            for (var i in this.children) child = this.child(i), method = child[c], is.func(method) && method.apply(child, methodArgs)
        }
        return this
    };
    var ext = node.extensions;
    for (var i in ext)
        for (var j in ext[i]) this[i][j] = ext[i][j], this[i].self = this
}

function nodeInputBase(name, value, options) {
    this.value = value, this.name = name, nodeInputBase.superclass.constructor.call(this, options), this.enable = function() {
        var options = this.options;
        return (is.unset(options.accessMode) || 4 != options.accessMode) && (options.disabled = !1, this.pluginEdit && this.pluginEdit.enable()), this
    }, this.disable = function() {
        return this.options.disabled = !0, this.pluginEdit && this.pluginEdit.disable(), this
    }, this.show = function() {
        var options = this.options;
        return (is.unset(options.accessMode) || 0 != options.accessMode) && nodeInputBase.superclass.show.call(this), this
    }, this.isDisabled = function() {
        return this.pluginEdit.isDisabled()
    }, this.setError = function(message) {
        return this.pluginEdit.setError(message), this
    }, this.cleanError = function() {
        return this.pluginEdit.cleanError(), this
    }, this.setComment = function(message) {
        return this.options.comment = message, this.$box.isRendered() && this.pluginEdit.setComment(message), this
    }, this.cleanComment = function() {
        return delete this.options.comment, this.$box.isRendered() && this.pluginEdit.cleanComment(), this
    }, this.label = function(name) {
        return is.set(name) ? (this.$box.isRendered() ? this.pluginEdit.label(name) : this.name = name, this) : this.$box.isRendered() ? this.pluginEdit.label() : this.name
    }, this.bind("fieldchange", function() {
        this.modified = this.value != this.val()
    }), this.fieldchange = function() {
        return this.emit("fieldchange", this.val()), this
    }, this.mandatory = function(value) {
        return is.set(value) ? (this.pluginEdit && this.pluginEdit.mandatory(value), this.options.mandatory = value, this) : this.options.mandatory
    }, nodeInputBase.prototype.toString = function() {
        var value = this.val();
        return this.isDisabled() ? "[<span langkey='notreq'>" + lng("notreq") + "</span>]" : is.string(value) && "" != value || !is.string(value) && is.set(value) ? value : "[<span langkey='notspec'>" + lng("notspec") + "</span>]"
    }, nodeInputBase.prototype.getSummary = function($box) {
        var $summary = $(),
            options = this.options,
            disabled = this.isDisabled();
        if ((!$box || options.forceSummary || this.modified && !this.options.password && !disabled && !options.hidden) && !options.skipSummary) {
            var $obj = $("<div></div>").html(this.toHTML());
            $obj.find(".edit").removeClass("editDisabled"); {
                var value = this.toString();
                $obj.find(".input").addClass("static").html(value)
            }
            $obj.find(".mandatory").remove(), $obj.find(".comment").hide(), $summary = $obj, is.jquery($box) && $box.append($summary)
        }
        return $summary
    }, nodeInputBase.prototype.applyAttrs = function(value) {
        function toDefaultMode() {
            delete this.options.accessMode, this.options.disabled || this.enable(), this.options.hidden || this.show()
        }
        try {
            var mode = this.options.accessMode = value.__attrs__.mode;
            switch (mode) {
                case 4:
                    this.pluginEdit && this.pluginEdit.disable();
                    break;
                case 0:
                    this.$outerBox.hide();
                    break;
                default:
                    toDefaultMode.call(this)
            }
        }
        catch (e) {
            toDefaultMode.call(this)
        }
    }, nodeInputBase.prototype.isModified = function(status) {
        this.$box.isRendered() && !this.isDisabled() && this.$box.is(":visible") && !this.isEqual(this.value, this.val()) && (status.modified = !0, status.nodes.push(this))
    }, nodeInputBase.prototype.isEqual = function(value1, value2) {
        return is.number(value1) && (value1 = value1.toString()), is.number(value2) && (value2 = value2.toString()), (is.unset(value1) || "" == value1) && (value1 = null), (is.unset(value2) || "" == value2) && (value2 = null), value1 == value2
    }
}

function nodeInput(name, value, options) {
    nodeInput.superclass.constructor.call(this, name, value, options), this.bindEvents = function() {
        return this.pluginInput.find("input").bind("change", context(this).callback(function(event) {
            return this.pluginEdit.cleanError(), this.fieldchange(), event.stopPropagation(), !0
        })), this.pluginInput.bind("error.input", context(this).callback(function(event, errorCode) {
            this.pluginEdit.setError(errorCode)
        })), this.pluginInput.bind("onfocus.input", context(this).callback(function() {
            this.pluginEdit.cleanError()
        })), this
    }, nodeInput.prototype.val = function(value) {
        return is.set(value) ? (this.applyAttrs(value), this.pluginInput && this.pluginInput.fieldval(value), this.value = value, this) : this.pluginInput ? this.pluginInput.fieldval() : this.value
    }, this.updateModel = function(status) {
        if (!this.pluginEdit.isDisabled() && !this.pluginEdit.is(":hidden")) {
            var errorCode;
            return this.options.mandatory && (errorCode = this.pluginInput.isEmpty() ? "fieldEmpty" : null), is.unset(errorCode) && (errorCode = this.validate()), is.set(errorCode) ? (this.pluginEdit.setError(errorCode), status.error = !0, status.nodes.push(this)) : this.value = this.val(), this
        }
    }, this.validate = function() {
        this.pluginInput.flags().re = this.options.re;
        var errorCode = this.pluginInput.validate();
        return errorCode ? this.pluginEdit.setError(errorCode) : this.pluginEdit.cleanError(), errorCode
    }
}

function nodeip(name, value) {
    nodeip.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodeip.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            });
            var version = options.version;
            switch (version) {
                case 46:
                    this.pluginInput = this.pluginEdit.find(".input").lightUIIPv4IPv6({
                        mandatory: options.mandatory,
                        maxLength: 43,
                        re: options.re
                    });
                    break;
                case 6:
                    this.pluginInput = this.pluginEdit.find(".input").lightUIIPv6({
                        mandatory: options.mandatory,
                        maxLength: 43,
                        re: options.re
                    });
                    break;
                case 4:
                default:
                    this.pluginInput = this.pluginEdit.find(".input").lightUIIPv4({
                        mandatory: options.mandatory,
                        maxLength: 18,
                        re: options.re
                    })
            }
            this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }, this.setVersion = function(version) {
        return this.options.version = version, value = this.val(), this.updateView("forward"), this
    }
}

function nodemac() {
    nodemac.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodemac.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIMAC({
                mandatory: options.mandatory,
                maxLength: 17,
                re: options.re
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }
}

function nodeDomainName() {
    nodeDomainName.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodeDomainName.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIDomainName({
                mandatory: options.mandatory,
                re: options.re,
                isip: options.isip,
                ipv6: options.ipv6
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }
}

function nodetext() {
    nodetext.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodetext.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIText({
                mandatory: options.mandatory,
                password: options.password,
                re: options.re,
                maxLength: options.maxLength
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }
}

function nodestatic() {
    nodestatic.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodestatic.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory,
                re: options.re
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIStatic(), options.translate ? this.pluginEdit.find(".input").html(lng(this.value)).attr("langkey", this.value) : this.pluginEdit.find(".input").html(this.value), options.disabled && this.disable()
        }
        return this
    }, this.isModified = function() {}
}

function nodenum() {
    nodenum.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodenum.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUINumber({
                mandatory: options.mandatory,
                minval: options.minval,
                maxval: options.maxval,
                re: options.re
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? nodenum.superclass.val.call(this, new Number(value).valueOf()) : nodenum.superclass.val.call(this)
    }, this.minval = function(value) {
        return is.set(value) ? (this.options.minval = value, this.$box.isRendered() && (this.pluginInput.flags().minval = value), this) : this.options.minval
    }, this.maxval = function(value) {
        return is.set(value) ? (this.options.maxval = value, this.$box.isRendered() && (this.pluginInput.flags().maxval = value), this) : this.options.maxval
    }
}

function nodeport() {
    nodeport.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodemac.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIPort({
                mandatory: options.mandatory,
                re: options.re,
                isRange: options.isRange,
                isSeveral: options.isSeveral,
                use_ports: options.use_ports
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }
}

function nodeportold() {
    nodeport.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodemac.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUIPortOld({
                mandatory: options.mandatory,
                re: options.re,
                isRange: options.isRange,
                isSeveral: options.isSeveral
            }), this.val(this.value), this.bindEvents(), options.disabled && this.disable()
        }
        return this
    }
}

function nodeCheckBox(name, value, options) {
    nodeCheckBox.superclass.constructor.call(this, name, value, options), this.updateView = function(phase) {
        if (nodeCheckBox.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory,
                altname: options.optionName
            }), this.pluginInput = this.pluginEdit.find(".input").lightUICheckbox(), this.pluginInput.bind("change", context(this).callback(function(event) {
                return this.pluginEdit.cleanError(), this.fieldchange(), event.stopPropagation(), !0
            })), this.val(this.value), options.optionValue && (this.optionValue = options.optionValue), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? (this.applyAttrs(value), this.pluginInput && this.pluginInput.fieldval(value), this.value = value, this) : this.pluginInput ? this.pluginInput.fieldval() : this.value
    }, this.getValue = function() {
        return this.optionValue
    }, this.toString = function() {
        return this.val() ? "[<span langkey='yes'>" + lng("yes") + "</span>]" : "[<span langkey='no'>" + lng("no") + "</span>]"
    }, this.updateModel = function() {
        this.value = this.val()
    }
}

function nodeComboGrid(name, value, options) {
    nodeComboGrid.superclass.constructor.call(this, name, value, options), this.bindEvents = function() {
        return is.string(this.options.blank) ? (this.pluginCombo.find("input").bind("change", context(this).callback(function(event) {
            return this.pluginEdit.cleanError(), this.fieldchange(), event.stopPropagation(), !0
        })), this.pluginCombo.bind("rowclick.grid", context(this).callback(function(event, $row) {
            return this.pluginEdit.cleanError(), this.emit("ruleselect", $row), event.stopPropagation(), !0
        }))) : this.pluginCombo.find("input").bind("change", context(this).callback(function(event) {
            return this.pluginEdit.cleanError(), this.fieldchange(), event.stopPropagation(), !0
        })), this.pluginCombo.bind("error.input", context(this).callback(function(event, errorCode) {
            this.pluginEdit.setError(errorCode)
        })), this.pluginCombo.bind("onfocus.input", context(this).callback(function() {
            this.pluginEdit.cleanError()
        })), this
    }, nodeComboGrid.prototype.updateView = function(phase) {
        if (nodeComboGrid.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            });
            var $input = this.pluginEdit.find(".input"),
                flags = {
                    header: options.header,
                    type: options.type,
                    index: options.index,
                    blank: options.blank,
                    optionArray: options.optionArray,
                    flags: {
                        maxLength: options.maxLength,
                        mandatory: options.mandatory,
                        re: options.re
                    }
                };
            this.pluginCombo = $input.lightUIComboGrid(flags), this.pluginCombo.find(".icon").css("display", "none"), this.bindEvents(), this.val(this.value), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? (this.applyAttrs(value), this.pluginCombo && this.pluginCombo.fieldval(value), this.value = value, this) : this.pluginCombo ? this.pluginCombo.fieldval() : this.value
    }, nodeComboGrid.prototype.addRow = function(header) {
        var options = this.options;
        return is("Object", header) && options.optionArray.push(header), this.pluginCombo && this.pluginCombo.addOption.apply(this.pluginCombo, arguments), this
    }, nodeComboGrid.prototype.cleanRows = function() {
        return this.pluginCombo.cleanTable(), this
    }, nodeComboGrid.prototype.updateModel = function(status) {
        if (!this.pluginEdit.isDisabled() && !this.pluginEdit.is(":hidden")) {
            var errorCode;
            return this.options.mandatory && (errorCode = this.pluginCombo.isEmpty() ? "fieldEmpty" : null), is.unset(errorCode) && (errorCode = this.validate()), is.set(errorCode) ? (this.pluginEdit.setError(errorCode), status.error = !0, status.nodes.push(this)) : this.value = this.val(), this
        }
    }, this.fieldchange = function() {
        return this.emit("fieldchange", this.pluginCombo.fieldval()), this
    }, this.validate = function() {
        this.pluginCombo.flags().re = this.options.re;
        var errorCode = this.pluginCombo.validate();
        return errorCode ? this.pluginEdit.setError(errorCode) : this.pluginEdit.cleanError(), errorCode
    }, this.isModified = function() {
        this.options.blank || nodeComboGrid.superclass.isModified.apply(this, arguments)
    }, options.optionArray || (options.optionArray = [])
}

function nodeComboIP(name, value, options) {
    if (this.setVersion = function(version) {
            if (version) {
                var ver = new String(version);
                options.type = "";
                for (var i = 0; i < ver.length; i++) options.type = options.type + "ipv" + ver.charAt(i)
            }
            else options.type = "ipv4";
            return value = this.val(), this.updateView("forward"), this
        }, is.unset(options) && (options = {}), options.version) {
        var ver = new String(options.version);
        options.type = "";
        for (var i = 0; i < ver.length; i++) options.type = options.type + "ipv" + ver.charAt(i)
    }
    else options.type = "ipv4";
    delete options.version, options.index = "ip", nodeComboIP.superclass.constructor.call(this, name, value, options)
}

function nodeComboMAC(name, value, options) {
    is.unset(options) && (options = {}), options.type = "mac", options.index = "mac", nodeComboMAC.superclass.constructor.call(this, name, value, options), nodeComboMAC.prototype.updateView = function(phase) {
        if (nodeComboMAC.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var userip = this.options.userip;
            is.set(userip) && (this.pluginCombo.addClass("node-combo-mac").bind("iconclick.grid", context(this).callback(function() {
                for (var $row, $grid = this.pluginCombo, userip = this.options.userip, i = 0; i < $grid.nrow(); i++)
                    if ($row = $grid.row(i), $row.col("ip").html() == userip) {
                        this.val($row.col("mac").html());
                        break
                    }
            })).find(".icon").show().html("<span></span>").find("span").html(lng("clonemac")).attr("langkey", "clonemac"), this.pluginCombo.bind("iconResetclick.grid", context(this).callback(function() {
                for (var $row, $grid = this.pluginCombo, userip = this.options.userip, i = 0; i < $grid.nrow(); i++)
                    if ($row = $grid.row(i), $row.col("ip").html() == userip) {
                        this.val($row.col("mac").html());
                        break
                    }
            })).find(".iconReset").show().html("<span></span>").find("span").html(lng("cloneMACReset")).attr("langkey", "cloneMACReset"))
        }
        return this
    }, this.addRow = function() {
        if (nodeComboMAC.superclass.addRow.apply(this, arguments), this.pluginCombo) {
            var $grid = this.pluginCombo.getGrid(),
                $span = $grid.find(".icon span");
            $span.is(":hidden") && $grid.row("last").col("ip").html() == this.options.userip && $span.show()
        }
        return this
    }, this.cleanRows = function() {
        return nodeComboMAC.superclass.cleanRows.apply(this, arguments), this.pluginCombo.find(".icon span").hide(), this
    }
}

function nodeComboHost(name, value, options) {
    is.unset(options) && (options = {}), options.type = "host", options.index = "host", nodeComboHost.superclass.constructor.call(this, name, value, options)
}

function nodeComboText(name, value, options) {
    is.unset(options) && (options = {}), options.type = "text", nodeComboText.superclass.constructor.call(this, name, value, options)
}

function nodeSelect(name, value, options) {
    nodeSelect.superclass.constructor.call(this, name, value, options), nodeSelect.prototype.updateView = function(phase) {
        if (nodeSelect.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginInput = this.pluginEdit.find(".input").lightUISelect({
                size: options.size,
                multiple: options.multiple,
                optionArray: options.optionArray,
                options: options.options,
                manualCorrection: options.manualCorrection
            }), this.pluginInput.bind("change", context(this).callback(function(event) {
                return this.pluginEdit.cleanError(), this.fieldchange(), event.stopPropagation(), !0
            })), this.correctValue(), this.val(this.value), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? (this.applyAttrs(value), this.pluginInput && this.pluginInput.fieldval(value), this.value = value, this) : this.pluginInput ? this.pluginInput.fieldval() : this.value
    }, this.toString = function() {
        var value = this.val(),
            alias = value,
            options = this.options.options;
        if (options)
            for (var i in options)
                if (options[i] == value) {
                    alias = i;
                    break
                }
        return "<span langkey='" + alias + "'>" + lng(alias) + "</span>"
    }, this.addOption = function(name, value) {
        is.unset(value) && (value = name), is.unset(this.value) && (this.value = value);
        var options = this.options;
        return options.options[name] = value, options.optionArray.push({
            name: name,
            value: value
        }), this.pluginInput && this.pluginInput.addOption(name, value), this
    }, this.cleanOptions = function() {
        return this.options.options = {}, this.options.optionArray = [], this.pluginInput && this.pluginInput.cleanOptions(), this
    }, this.correctValue = function() {
        var defValue, options = this.options,
            isInList = !1,
            optionArray = options.optionArray,
            optionObject = options.options,
            value = this.value;
        if (optionArray && optionArray.length) {
            defValue = optionArray[0].value;
            for (var i = 0; i < optionArray.length; i++)
                if (value == optionArray[i].value) {
                    isInList = !0;
                    break
                }
        }
        else if (optionObject) {
            var j = 0;
            for (var i in optionObject)
                if (j++ || (defValue = optionObject[i]), value == optionObject[i]) {
                    isInList = !0;
                    break
                }
        }
        return !isInList && is.set(defValue) && this.val(defValue), this
    }, this.updateModel = function() {
        this.value = this.val()
    }, this.isModified = function(status) {
        if (this.$box.isRendered() && !this.isDisabled() && this.$box.is(":visible"))
            for (var optionArray = this.options.optionArray, i = 0; i < optionArray.length; i++)
                if (this.isEqual(this.value, optionArray[i].value)) return void(this.isEqual(this.value, this.val()) || (status.modified = !0, status.nodes.push(this)))
    }, this.bind("fieldchange", this.onfieldchange);
    var opt, options = this.options;
    if (options.options || (options.options = {}), options.optionArray)
        for (var i = 0; i < options.optionArray.length; i++) opt = options.optionArray[i], options.options[opt.name] = opt.value ? opt.value : opt.name;
    else {
        options.optionArray = [];
        for (var i in options.options) opt = options.options[i], options.optionArray.push({
            name: opt.name,
            value: opt.value ? opt.value : opt.name
        })
    }
}

function nodemask(name, value, options) {
    is.unset(options) && (options = {}), options.manualCorrection = !0, nodemask.superclass.constructor.apply(this, arguments), this.bind("endform", function() {
        var ipath = this.options.bind;
        this.listen(ipath, "fieldchange", function(status, value) {
            function getClass(ip) {
                if (is.unset(ip)) return null;
                if (ip.indexOf(".") > 0) {
                    var classX = parseInt(ip.substring(0, ip.indexOf(".")));
                    return classX >= 1 && 126 >= classX ? "A" : classX >= 128 && 191 >= classX ? "B" : classX >= 192 && 223 >= classX ? "C" : classX >= 224 && 239 >= classX ? "D" : classX >= 240 && 247 >= classX ? "E" : null
                }
            }
            var version = status.target.options.version;
            is.set(version) && 4 != version || this.setClass(getClass(value))
        }).get(ipath).fieldchange()
    }), this.setClass = function(ipClass) {
        var oldValue = this.val();
        switch (ipClass) {
            case "A":
                this.cleanMasks().addClass("A"), $.browser.msie && this.pluginInput && this.pluginInput.updateSelect(), this.val(this.checkMask(oldValue) ? oldValue : "255.0.0.0");
                break;
            case "B":
                this.cleanMasks().addClass("B"), $.browser.msie && this.pluginInput && this.pluginInput.updateSelect(), this.val(this.checkMask(oldValue) ? oldValue : "255.255.0.0");
                break;
            case "C":
                this.cleanMasks().addClass("C"), $.browser.msie && this.pluginInput && this.pluginInput.updateSelect(), this.val(this.checkMask(oldValue) ? oldValue : "255.255.255.0");
                break;
            default:
                this.cleanMasks().addClass("A").addClass("B").addClass("C"), $.browser.msie && this.pluginInput && this.pluginInput.updateSelect(), this.val(this.checkMask(oldValue) ? oldValue : "255.255.255.0")
        }
        return this.ipClass = ipClass, this
    }, this.addMask = function(mask) {
        return this.addOption(mask), this.maskCheckList[mask] = !0, this
    }, this.cleanMasks = function() {
        return this.maskCheckList = {}, this.cleanOptions(), this
    }, this.addClass = function(ipClass) {
        switch (ipClass) {
            case "A":
                this.addMask("255.0.0.0").addMask("254.0.0.0").addMask("252.0.0.0").addMask("248.0.0.0").addMask("240.0.0.0").addMask("224.0.0.0").addMask("192.0.0.0").addMask("128.0.0.0");
                break;
            case "B":
                this.addMask("255.255.0.0").addMask("255.254.0.0").addMask("255.252.0.0").addMask("255.248.0.0").addMask("255.240.0.0").addMask("255.224.0.0").addMask("255.192.0.0").addMask("255.128.0.0");
                break;
            case "C":
                this.addMask("255.255.255.255").addMask("255.255.255.254").addMask("255.255.255.252").addMask("255.255.255.248").addMask("255.255.255.240").addMask("255.255.255.224").addMask("255.255.255.192").addMask("255.255.255.128").addMask("255.255.255.0").addMask("255.255.254.0").addMask("255.255.252.0").addMask("255.255.248.0").addMask("255.255.240.0").addMask("255.255.224.0").addMask("255.255.192.0").addMask("255.255.128.0")
        }
        return this
    }, this.checkMask = function(value) {
        return this.maskCheckList[value]
    }, this.maskCheckList = {}
}

function nodeTextArea(name, value, options) {
    nodeTextArea.superclass.constructor.call(this, name, value, options), this.updateView = function(phase) {
        if (nodeTextArea.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            });
            var $textarea = this.pluginEdit.find(".input").html("<textarea></textarea>").find("textarea");
            is.set(options.cols) && $textarea.attr("cols", options.cols), is.set(options.rows) && $textarea.attr("rows", options.rows), is.set(options.readonly) && $textarea.attr("readonly", options.readonly), $textarea.bind("change", context(this).callback(function(event) {
                var errorCode = this.validate();
                return errorCode ? this.pluginEdit.setError(errorCode) : (this.pluginEdit.cleanError(), this.fieldchange()), event.stopPropagation(), !0
            })), this.val(this.value), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        var $textarea = this.$box.find("textarea");
        return is.set(value) ? (this.applyAttrs(value), $textarea.length && $textarea.val(value), this.value = value, this) : this.pluginEdit ? $textarea.val() : this.value
    }, this.isEmpty = function() {
        return !this.val().length
    }, this.validate = function() {
        var validater, errorCode = null,
            re = this.options.re,
            value = this.val();
        if (is.array(re))
            for (var i = 0; i < re.length && (validater = re[i], !is.func(validater) || !(errorCode = validater(value))); i++);
        else is.func(re) && (errorCode = re(value));
        return errorCode ? this.pluginEdit.setError(errorCode) : this.pluginEdit.cleanError(errorCode), errorCode
    }, this.updateModel = function(status) {
        if (!this.pluginEdit.isDisabled() && !this.pluginEdit.is(":hidden")) {
            var errorCode = this.options.mandatory && this.isEmpty() ? "fieldEmpty" : null;
            return is.unset(errorCode) && (errorCode = this.validate()), is.set(errorCode) ? (this.pluginEdit.setError(errorCode), status.error = !0, status.nodes.push(this)) : this.value = this.val(), this
        }
    }, this.toString = function() {
        var value = this.val();
        return is.set(value) ? value.replace("\n", ",") : nodeTextArea.superclass.toString.call(this)
    }
}

function nodeCaption(name, comment, hideObj) {
    this.name = name, this.comment = comment, nodeCaption.superclass.constructor.call(this), this.updateView = function(phase) {
        return nodeCaption.superclass.updateView.apply(this, arguments), "forward" == phase && (this.pluginSection = this.$innerBox.lightUISection(this.name, this.comment), this.$box = this.pluginSection.find(".content"), is.set(hideObj) && (this.pluginSection.css("cursor", "pointer"), this.pluginSection.css("cursor", "hand"), this.pluginSection.bind("click", function() {
            hideObj.options.hidden ? hideObj.show() : hideObj.hide()
        }))), this
    }, this.setName = function(name) {
        return this.name = name, this.pluginSection && this.pluginSection.setName(name), this
    }, this.setContent = function(value) {
        return this.pluginSection && this.pluginSection.setContent(value), this
    }, this.setComment = function(value) {
        return this.comment = value, this.pluginSection && this.pluginSection.setComment(value), this
    }
}

function nodeComment(textComment, options) {
    this.textComment = textComment, nodeComment.superclass.constructor.call(this), this.updateView = function(phase) {
        return nodeComment.superclass.updateView.apply(this, arguments), "forward" == phase && (this.pluginTextComment = this.$innerBox.lightUITextComment(this.textComment, options)), this
    }, this.setTextComment = function(textComment, options) {
        return this.textComment = textComment, this.pluginTextComment && this.pluginTextComment.setTextComment(textComment, options), this
    }
}

function nodeUpload(name, action, filename, options) {
    is.unset(options) && (options = {}), this.name = name, this.action = action, this.filename = filename, this.options = options, nodeUpload.superclass.constructor.call(this, options), this.$upload = null, this.updateView = function(phase) {
        if (nodeUpload.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.$upload = this.pluginEdit.find(".input").lightUIUpload(this.action, this.filename, options).bind({
                "begin.upload": callback(this, function() {
                    this.emit("uploading", this.val())
                }),
                "end.upload": callback(this, function(e, data) {
                    this.emit("uploaded", this.val(), data)
                }),
                "change.upload": callback(this, function(e, files) {
                    this.fieldchange(files)
                }),
                "break.upload": callback(this, function() {
                    this.emit("cancel", this.val())
                })
            }), options.disabled && this.disable()
        }
        return this
    }, this.val = function() {
        return this.$upload ? this.$upload.find("form input[type='file']").val() : ""
    }, this.isEmpty = function() {
        return !this.val().length
    }, this.validate = function() {
        var validater, errorCode = null,
            re = this.options.re,
            value = this.val();
        if (is.array(re))
            for (var i = 0; i < re.length && (validater = re[i], !is.func(validater) || !(errorCode = validater(value))); i++);
        else is.func(re) && (errorCode = re(value));
        return errorCode ? this.pluginEdit.setError(errorCode) : this.pluginEdit.cleanError(errorCode), errorCode
    }, this.updateModel = function(status) {
        if (!this.pluginEdit.isDisabled() && !this.pluginEdit.is(":hidden")) {
            var errorCode = this.options.mandatory && this.isEmpty() ? "fieldEmpty" : null;
            return is.unset(errorCode) && (errorCode = this.validate()), is.set(errorCode) && (this.pluginEdit.setError(errorCode), status.error = !0, status.nodes.push(this)), this
        }
    }, this.fieldchange = function(files) {
        return this.emit("fieldchange", this.val(), files), this
    }, this.upload = function() {
        return this.$upload.upload(), this
    }, this.cancel = function() {
        return this.$upload.cancel(), this
    }, this.clear = function() {
        return this.$upload.clear(), this
    }, this.enable = function() {
        return this.options.disabled = !1, this.pluginEdit && this.pluginEdit.enable(), this.$upload && this.$upload.enable(), this
    }, this.disable = function() {
        return this.options.disabled = !0, this.pluginEdit && this.pluginEdit.disable(), this.$upload && this.$upload.disable(), this
    }, this.isDisabled = function() {
        return this.pluginEdit.isDisabled()
    }, this.setError = function(message) {
        return this.pluginEdit.setError(message), this
    }, this.cleanError = function() {
        return this.pluginEdit.cleanError(), this
    }, this.setComment = function(message) {
        return this.options.comment = message, this.pluginEdit.setComment(message), this
    }, this.cleanComment = function() {
        return delete this.options.comment, this.pluginEdit.cleanComment(), this
    }, this.label = function(name) {
        return is.set(name) && (this.name = name), this.pluginEdit.label(name)
    }, this.onfieldchange = function() {
        this.modified = !0
    }, this.mandatory = function(value) {
        return is.set(value) ? (this.pluginEdit && this.pluginEdit.mandatory(value), this.options.mandatory = value, this) : this.options.mandatory
    }, this.bind("fieldchange", this.onfieldchange)
}

function nodeRadioBox(name, value, options) {
    nodeRadioBox.superclass.constructor.call(this, name, value, options), this.updateView = function(phase) {
        if (nodeRadioBox.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory,
                altname: options.optionName
            });
            var $input = this.pluginEdit.find(".input").html("<input type='radio' name='" + options.groupName + "' value='" + options.optionValue + "'/>").find("input");
            $input.bind("change", context(this).callback(function(event) {
                return this.pluginEdit.cleanError(), this.emit("fieldchange", this.val()), event.stopPropagation(), !0
            })), this.val(this.value), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        var $input = this.$box.find("input");
        return is.bool(value) ? (this.applyAttrs(value), $input.length && $input.attr("checked", value), this.value = value, this) : this.pluginEdit ? $input.attr("checked") ? !0 : !1 : this.value
    }, this.optionValue = function(value) {
        var $input = this.$box.find("input");
        return is.set(value) ? ($input.attr("value", value), this) : this.pluginEdit && $input.attr("value") ? $input.attr("value") : this.options.optionValue
    }, this.updateModel = function() {
        this.value = this.val()
    }
}

function nodeOptionsBase(name, options) {
    nodeOptionsBase.superclass.constructor.call(this, name, null, options), this.options.options || (this.options.options = {}), options = this.options, this.updateView = function(phase) {
        nodeOptionsBase.superclass.updateView.call(this, phase), "forward" == phase && this.$box.addClass("node-options")
    }, this.cleanOptions = function() {
        return this.initForm(), this.$box.isRendered() && this.deep.updateView(), this
    }, this.enable = function() {
        for (var i = 0; i < this.nchild(); i++) this.child(i).enable();
        return this
    }, this.disable = function() {
        for (var i = 0; i < this.nchild(); i++) this.child(i).disable();
        return this
    }, this.isDisabled = function() {
        var child0 = this.child(0);
        return child0 ? child0.isDisabled() : !1
    }, this.setError = function() {
        return this
    }, this.cleanError = function() {
        return this
    }, this.setComment = function() {
        return this
    }, this.cleanComment = function() {
        return this
    }, this.label = function(name) {
        var child0 = this.child(0);
        return child0 && child0.label(name), this
    }, delete this.isModified, this.name = name, this.options = options;
    var arr = options.options;
    if (is.array(arr))
        for (var i = 0; i < arr.length; i++) this.addOption(arr[i].name, arr[i].value, arr[i].checked, arr[i].comment, arr[i].skipSummary)
}

function nodeOptions(name) {
    if (this.addOption = function(name, value, checked, comment) {
            var label = null;
            if (!this.nchild()) var label = this.name;
            return this.add(new nodeCheckBox(label, checked, {
                optionName: name,
                optionValue: value,
                comment: comment
            }), name), this.$box.isRendered() && this.child(this.nchild() - 1).deep.updateView(), this
        }, is.array(arguments[1])) var options = {
        options: arguments[1]
    };
    else if (is.object(arguments[1])) var options = arguments[1];
    else if (is.object(arguments[2])) var options = arguments[2];
    nodeOptions.superclass.constructor.call(this, name, options), this.val = function(value) {
        return is.set(value) ? this : null
    }, this.toString = function() {
        for (var child, name, str = "", delim = "", i = 0; i < this.children.length; i++) child = this.get(i), name = child.options.optionName, child.val() && (str += delim + "<span langkey='" + name + "'>" + lng(name) + "</span>", delim = ",");
        return str
    }
}

function nodeOptionsRadio(name, value, options) {
    this.addOption = function(name, value, checked, comment, skipSummary) {
        var label = null;
        if (!this.nchild()) {
            var label = this.name;
            is.unset(this.value) && (this.value = value, checked = !0)
        }
        return checked ? this.value = value : this.value == value && (checked = !0), this.add(new nodeRadioBox(label, checked, {
            optionName: name,
            groupName: this.groupName,
            optionValue: value,
            comment: comment,
            skipSummary: skipSummary
        }), value), this.listen(value, "fieldchange", function(status) {
            status.bubbling = !1, this.emit("fieldchange", status.target.options.optionValue)
        }), this.$box.isRendered() && this.child(this.nchild() - 1).deep.updateView(), this
    }, this.groupName = name ? name : gID.get(), nodeOptionsRadio.superclass.constructor.call(this, name, options), this.val = function(value) {
        if (is.set(value)) {
            this.applyAttrs(value);
            for (var child, i = 0; i < this.nchild(); i++) child = this.child(i), child.optionValue() == value ? (this.value = value, child.val(!0)) : child.val(!1);
            return this
        }
        for (var child, i = 0; i < this.nchild(); i++)
            if (child = this.child(i), child.val()) return child.optionValue();
        return null
    }, this.toString = function() {
        for (var child, i = 0; i < this.children.length; i++) {
            var child = this.get(i),
                name = child.options.optionName;
            if (child.val()) return "<span langkey='" + name + "'>" + lng(name) + "</span>"
        }
        return ""
    }, this.updateModel = function() {
        this.value = this.val()
    }, this.value = value
}

function nodeStepWizard() {
    function __next(stepDone, inx, __return) {
        function __stepUp(__return) {
            this.switchStep("next"), is.func(this.doAfter) ? this.doAfter(this.getActiveStep(), callbackEx(this, __return, !0)) : __return(!0)
        }
        return is.func(__return) || (__return = function() {}), stepDone || this.isStepLast(inx) ? is.func(__return) && __return(stepDone) : is.func(this.doBefore) ? this.doBefore(this.getActiveStep(), callbackEx(this, __stepUp, __return)) : __stepUp.call(this, __return), this
    }

    function __previous(stepDone, inx, __return) {
        return is.func(__return) || (__return = function() {}), stepDone || this.isStepFirst(inx) ? __return(stepDone) : (this.switchStep("prev"), is.func(this.doAfter) ? this.doAfter(this.getActiveStep(), callbackEx(this, __return, !0)) : __return(!0)), this
    }

    function __doStep(method, __return) {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return step instanceof nodeStepWizard ? __doStep.call(step, method, callbackEx(this, method, inx, __return)) : method.call(this, !1, inx, __return), this
    }
    nodeStepWizard.superclass.constructor.call(this), nodeStepWizard.prototype.updateView = function(phase, status) {
        return nodeStepWizard.superclass.updateView.apply(this, arguments), "forward" == phase && (status.stop = !0, this.switchStep(is.set(this.lastActiveInx) ? this.lastActiveInx : "first")), this
    }, nodeStepWizard.prototype.addStep = function(obj, alias) {
        return this.add(obj, alias), this
    }, nodeStepWizard.prototype.removeStep = function(arg) {
        return this.skipStepOn(arg), this
    }, nodeStepWizard.prototype.switchStep = function(arg) {
        var step = this.getStep(arg);
        return step && step.deep.updateView(this.$box), this
    }, nodeStepWizard.prototype.getStep = function(arg) {
        function seekForward(inx) {
            do step = this.get(inx++); while (step && step.options.skip);
            return step
        }

        function seekBackward(inx) {
            do step = this.get(inx--); while (step && step.options.skip);
            return step
        }
        var step;
        return "next" == arg ? seekForward.call(this, this.getActiveIndex() + 1) : "prev" == arg ? seekBackward.call(this, this.getActiveIndex() - 1) : "last" == arg ? seekBackward.call(this, this.children.length - 1) : "first" == arg ? seekForward.call(this, 0) : "active" == arg || is.unset(arg) ? this.getActiveStep() : is.string(arg) || is.number(arg) ? this.get(arg) : null
    }, nodeStepWizard.prototype.getActiveIndex = function() {
        for (var i, i = 0; i < this.children.length && !this.get(i).$box.isRendered(); i++);
        return this.lastActiveInx = i, i
    }, nodeStepWizard.prototype.getActiveStep = function() {
        return this.get(this.getActiveIndex())
    }, nodeStepWizard.prototype.skipStepOn = function(arg) {
        return this.getStep(arg).options.skip = !0, this
    }, nodeStepWizard.prototype.skipStepOff = function(arg) {
        return delete this.getStep(arg).options.skip, this
    }, nodeStepWizard.prototype.isStepFirst = function(inx) {
        return this.getStep("first") == this.getStep(inx)
    }, nodeStepWizard.prototype.isStepLast = function(inx) {
        return this.getStep("last") == this.getStep(inx)
    }, nodeStepWizard.prototype.next = function(__return) {
        return __doStep.call(this, __next, __return)
    }, nodeStepWizard.prototype.previous = function(__return) {
        return __doStep.call(this, __previous, __return)
    }, nodeStepWizard.prototype.checkNext = function() {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return this.isStepLast(inx) ? step instanceof nodeStepWizard ? step.checkNext() : !1 : !0
    }, nodeStepWizard.prototype.checkPrevious = function() {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return this.isStepFirst(inx) ? step instanceof nodeStepWizard ? step.checkPrevious() : !1 : !0
    }, this.activeIndex = 0
}

function nodeWizard() {
    function __next(stepDone, inx, __return) {
        function __stepUp(__return) {
            this.switchStep("next"), is.func(this.doAfter) ? this.doAfter(this.getActiveStep(), callbackEx(this, __return, !0)) : __return(!0)
        }
        return is.func(__return) || (__return = function() {}), stepDone || this.pluginWizard.isStepLast(inx) ? is.func(__return) && __return(stepDone) : is.func(this.doBefore) ? this.doBefore(this.getActiveStep(), callbackEx(this, __stepUp, __return)) : __stepUp.call(this, __return), this
    }

    function __previous(stepDone, inx, __return) {
        return is.func(__return) || (__return = function() {}), stepDone || this.pluginWizard.isStepFirst(inx) ? __return(stepDone) : (this.switchStep("prev"), is.func(this.doAfter) ? this.doAfter(this.getActiveStep(), callbackEx(this, __return, !0)) : __return(!0)), this
    }

    function __doStep(method, __return) {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return step instanceof nodeWizard ? __doStep.call(step, method, callbackEx(this, method, inx, __return)) : method.call(this, !1, inx, __return), this
    }
    nodeWizard.superclass.constructor.call(this), nodeWizard.prototype.updateView = function(phase) {
        if (nodeWizard.superclass.updateView.apply(this, arguments), "forward" == phase) {
            {
                var child;
                this.options
            }
            this.pluginWizard = this.$box.lightUIWizard();
            for (var i = 0; i < this.children.length; i++) child = this.child(i), child.$outerBox = this.pluginWizard.addStep(this.child(i).getAlias()).getStep(i), child.options.skip && this.pluginWizard.skipStepOn(i)
        }
        return this
    }, nodeWizard.prototype.addStep = function(obj, alias) {
        if (this.add(obj, alias), is.jquery(this.pluginWizard)) {
            var $obj = this.pluginWizard.addStep(alias).getStep(alias);
            is.set(alias) ? (this.child(alias).$outerBox = $obj, this.child(alias).deep.updateView()) : (this.child(this.children.length - 1).$outerBox = $obj, this.child(this.children.length - 1).deep.updateView())
        }
        return this
    }, nodeWizard.prototype.removeStep = function(arg) {
        this.pluginWizard.removeStep(arg);
        for (var i = 0; i < this.children.length; i++) this.jQuery(i).length || this.replace(i);
        return this
    }, nodeWizard.prototype.switchStep = function(arg) {
        return this.pluginWizard.switchStep(arg), this
    }, nodeWizard.prototype.getActiveIndex = function() {
        return this.pluginWizard.getActiveIndex()
    }, nodeWizard.prototype.getActiveStep = function() {
        var inx = this.getActiveIndex();
        return this.get(inx)
    }, nodeWizard.prototype.skipStepOn = function(arg) {
        var step = this.get(arg),
            index = step.index();
        return step.options.skip = !0, is.jquery(this.pluginWizard) && this.pluginWizard.skipStepOn(index), this
    }, nodeWizard.prototype.skipStepOff = function(arg) {
        var step = this.get(arg),
            index = step.index();
        return delete step.options.skip, is.jquery(this.pluginWizard) && this.pluginWizard.skipStepOff(index), this
    }, nodeWizard.prototype.next = function(__return) {
        return __doStep.call(this, __next, __return)
    }, nodeWizard.prototype.previous = function(__return) {
        return __doStep.call(this, __previous, __return)
    }, nodeWizard.prototype.checkNext = function() {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return this.pluginWizard.isStepLast(inx) ? step instanceof nodeWizard ? step.checkNext() : !1 : !0
    }, nodeWizard.prototype.checkPrevious = function() {
        var inx = this.getActiveIndex(),
            step = this.get(inx);
        return this.pluginWizard.isStepFirst(inx) ? step instanceof nodeWizard ? step.checkPrevious() : !1 : !0
    }, this.activeIndex = 0
}

function nodeTrackbar(name, value, options) {
    is.unset(options) && (options = {}), this.name = name, this.options = options, nodeTrackbar.superclass.constructor.call(this, options), this.$trackbar = null, this.updateView = function(phase) {
        if (nodeTrackbar.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.$trackbar = this.pluginEdit.find(".input").lightUITrackbar(value, options).bind({
                "change.trackbar": callback(this, function() {
                    this.fieldchange()
                })
            }), options.disabled && this.disable()
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? (this.applyAttrs(value), this.$trackbar.fieldval(value), this) : this.$trackbar.fieldval()
    }, this.updateModel = function() {
        return this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden") ? void 0 : this
    }, this.fieldchange = function() {
        return this.emit("fieldchange", this.val()), this
    }, this.enable = function() {
        return this.options.disabled = !1, this.pluginEdit && this.pluginEdit.enable(), this.$trackbar && this.$trackbar.enable(), this
    }, this.disable = function() {
        return this.options.disabled = !0, this.pluginEdit && this.pluginEdit.disable(), this.$trackbar && this.$trackbar.disable(), this
    }, this.isDisabled = function() {
        return this.pluginEdit.isDisabled()
    }, this.setComment = function(message) {
        return this.options.comment = message, this.pluginEdit.setComment(message), this
    }, this.cleanComment = function() {
        return delete this.options.comment, this.pluginEdit.cleanComment(), this
    }, this.label = function(name) {
        return is.set(name) && (this.name = name), this.pluginEdit.label(name)
    }, this.onfieldchange = function() {
        this.modified = !0
    }, this.bind("fieldchange", this.onfieldchange)
}

function nodeStoragePath(name) {
    this.name = name, nodeStoragePath.superclass.constructor.call(this), this.updateView = function(phase) {
        if (nodeStoragePath.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.$storagePath = this.pluginEdit.find(".input").storagePath(options)
        }
        return this
    }, this.label = function(name) {
        return is.set(name) && (this.name = name), this.pluginEdit.label(name)
    }
}
window.INIT_SCRIPT || $("head").prepend("<script src='scripts/init.js'></script>");
var jhmvcUID = 0;
controlTypes = {}, extend(jsSSideView, jsView), extend(jsCSideView, jsView), jsCSideViewOptions = {
        rtl: !1,
        pda: !1,
        lng: "rus"
    }, extend(jsViewTree, jsCSideView), extend(jsMenuModel, jsModel), extend(jsMenuController, jsController), extend(jsMenuView, jsViewTree), extend(jsRecordSetModel, jsModel), extend(jsRecordSetController, jsController), extend(jsRecordSetClientView, jsCSideView), extend(jsFieldSetController, jsController), extend(jsFieldSetClientView, jsCSideView), extend(jsFieldSetPopUpClientView, jsFieldSetClientView), extend(jsEditController, jsController), extend(jsEditClientView, jsCSideView), extend(jsInputModel, jsModel), extend(jsInputController, jsEditController), extend(jsInputSlotView, jsEditClientView), extend(jsRadio2SlotView, jsCSideView), extend(jsInputFieldController, jsController), extend(jsBaseInputView, jsCSideView), extend(jsInputClientView, jsBaseInputView), extend(jsSelectClientView, jsBaseInputView), extend(jsRadioClientView, jsBaseInputView), extend(jsRadio2ClientView, jsRadioClientView), extend(jsCheckboxClientView, jsBaseInputView), extend(jsNumberClientView, jsInputClientView), extend(jsStaticTextClientView, jsBaseInputView), controlTypes.input = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "input", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.password = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "input", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.password = !0
    }, controlTypes.select = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "select", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.valset = obj.valset
    }, controlTypes.radio = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "radio", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.valset = obj.valset
    }, controlTypes.checkbox = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "checkbox", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.valset = obj.valset ? obj.valset : {
            on: !0,
            off: !1
        }
    }, controlTypes.number = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "number", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.minval = obj.minval, opt.maxval = obj.maxval
    }, controlTypes.text = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "text", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.selectex = function(obj) {
        obj.ctrl = new jsInputController(obj.value), obj.nextIface = "selectex", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name, opt.editable = obj.editable, opt.width = obj.width, opt.height = obj.height
    }, extend(jsSelectExClientView, jsBaseInputView), extend(jsSelectExItemModel, jsModel), extend(jsSelectExItemController, jsController), extend(jsSelectExItemView, jsViewTree), extend(jsSubNetAddrModel, jsModel), extend(jsSubNetAddrController, jsEditController), extend(jsSubNetAddrFieldController, jsController), extend(jsSubNetAddrSlotView, jsEditClientView), extend(jsSubNetAddrClientView, jsBaseInputView), controlTypes.mac = function(obj) {
        obj.ctrl = new jsMAController(obj.value), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, extend(jsNetAddrController, jsEditController), extend(jsMAController, jsNetAddrController), controlTypes.ipsubnet = function(obj) {
        obj.ctrl = new jsSubNetIPController(obj.value, obj.version), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.ipv4subnet = function(obj) {
        obj.ctrl = new jsSubNetIPv4Controller(obj.value), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.ipv6subnet = function(obj) {
        obj.ctrl = new jsSubNetIPv6Controller(obj.value), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, extend(jsSubNetIPModel, jsSubNetAddrModel), extend(jsSubNetIPController, jsEditController), extend(jsSubNetIPFieldController, jsController), extend(jsSubNetIPv4Controller, jsSubNetIPController), extend(jsSubNetIPv6Controller, jsSubNetIPController), extend(jsSubNetIPClientView, jsSubNetAddrClientView), controlTypes.ip = function(obj) {
        obj.ctrl = new jsIPController(obj.value, obj.version), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.ipv4 = function(obj) {
        obj.ctrl = new jsIPv4Controller(obj.value), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, controlTypes.ipv6 = function(obj) {
        obj.ctrl = new jsIPv6Controller(obj.value), obj.nextIface = "client", obj.options || (obj.options = {});
        var opt = obj.options;
        opt.humanName = obj.name
    }, extend(jsIPController, jsEditController), extend(jsIPFieldController, jsController), extend(jsIPv4Controller, jsIPController), extend(jsIPv6Controller, jsIPController), extend(jsDecorController, jsController), extend(jsSeparatorView, jsCSideView),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUIOverlay = function() {
            var $overlay = this.find(">.lightUI>.overlay");
            return $overlay.length || (this.append("<div class='lightUI'><div class='overlay' style='display: none'></div></div>"), this.css("position", "relative")), plugin.fn.extend({
                show: function() {
                    if (this.is(":visible")) {
                        {
                            this.find(">.lightUI>.overlay"), this.get(0).nodeName
                        }
                        this.find(">.lightUI>.overlay").css("display", "")
                    }
                    return this
                },
                hide: function() {
                    return this.find(">.lightUI>.overlay").css("display", "none"), this
                }
            }), plugin(this)
        }
    }(),
    function() {
        var plugin = jQuery.sub(),
            rowPlugin = jQuery.sub(),
            colPlugin = jQuery.sub(),
            cellPlugin = jQuery.sub(),
            lockEditing = !1,
            checkUniqueFlag = function(index, flags) {
                if (is.unset(flags) && (flags = {}), !is.unset(flags.unique)) {
                    if (is.unset(flags.re)) flags.re = [];
                    else if (is.func(flags.re)) {
                        var foo = flags.re;
                        flags.re = [foo]
                    }
                    flags.re.push(callbackEx(this, function(value, alias, index, matchCase) {
                        var $cell, $col = this.col(index);
                        if (matchCase) {
                            for (var val, i = 0; i < $col.length; i++)
                                if ($cell = $col.row(i), val = $cell.html(), is.unset($cell.data("$input")) && "" != val && alias == val) return "dup"
                        }
                        else
                            for (var val, alias = alias.toLowerCase(), i = 0; i < $col.length; i++)
                                if ($cell = $col.row(i), val = $cell.html(), is.unset($cell.data("$input")) && "" != val && alias == val.toLowerCase()) return "dup"; return null
                    }, index, "hard" == flags.unique ? !0 : !1))
                }
            },
            getRowPattern = function() {
                for (var colspan, pattern = "<tr>", header = this.data("header"), i = 0; i < header.length; i++) pattern += "<td", pattern += " cell-name='" + lng(header[i].name) + "'", colspan = header[i].colspan, is.set(colspan) && colspan > 1 && (pattern += " colspan=" + colspan), pattern += "></td>";
                return pattern += "</tr>"
            },
            getHeadRow = function(header) {
                for (var pattern = "<tr>", i = 0; i < header.length; i++) pattern += "<td", header[i].colspan && (pattern += " colspan='" + header[i].colspan + "'"), header[i].rowspan && (pattern += " rowspan='" + header[i].rowspan + "'"), is.set(header[i].name) ? header[i].notranslate ? pattern += ">" + header[i].name : (pattern += " langkey='" + header[i].name + "'>", pattern += lng(header[i].name)) : pattern += ">", pattern += "</td>";
                return pattern += "</tr>"
            },
            getHeadPattern = function(header) {
                var pattern = "<thead>";
                if (is.array(header[0]))
                    for (var i = 0; i < header.length; i++) pattern += getHeadRow(header[i]);
                else pattern += getHeadRow(header);
                return pattern += "</thead>"
            },
            getColInx = function(index) {
                if (is.string(index)) {
                    var namedColumns = this.data("namedColumns");
                    return is.unset(namedColumns) && (namedColumns = this.data("plugin").data("namedColumns")), namedColumns[index].inx
                }
                return index
            },
            zebra = function($grid) {
                $grid.find("tbody tr:even").addClass("even").removeClass("odd"), $grid.find("tbody tr:odd").removeClass("even").addClass("odd")
            },
            selectAll = function() {
                $(this).closest("table").find(" tbody td.selectable>input").attr("checked", is.set($(this).attr("checked")) ? $(this).attr("checked") : !1).trigger("change")
            },
            selectRow = function() {
                var $row = rowPlugin($(this).parent());
                $(this).find("input").attr("checked") ? $row.selectRow() : $row.unselectRow()
            },
            insSelCol = function() {
                var pattern = "<td class='selectable'  cell-name='" + lng("dialogSelect") + "' rowspan='" + this.data("headerHeight") + "'><input type='checkbox'/></td>";
                this.find("thead tr:first").find("td:first").before(pattern), this.find("thead tr:first td:first input").change(selectAll), this.find("tbody tr").find("td:first").before("<td class='selectable'  cell-name='" + lng("dialogSelect") + "' ><input type='checkbox'/></td>").prev().change(selectRow)
            },
            insDragCol = function() {
                this.find("thead tr:first").find("td:last").after("<td rowspan='" + this.data("headerHeight") + "'>&nbsp;</td>"), this.find("thead tr:first td:last").addClass("draggable"), this.find("tbody tr").find("td:last").after("<td class='draggable'>&nbsp;</td>")
            },
            createInput = function($inputBox, type, flags) {
                var inputFlags, $input = null;
                switch (type) {
                    case "ipv4":
                        inputFlags = $.extend(!0, {
                            maxLength: 18
                        }, flags), $input = $inputBox.lightUIIPv4(inputFlags);
                        break;
                    case "ipv6":
                        inputFlags = $.extend(!0, {
                            maxLength: 43
                        }, flags), $input = $inputBox.lightUIIPv6(inputFlags);
                        break;
                    case "ipv4ipv6":
                        inputFlags = $.extend(!0, {
                            maxLength: 43
                        }, flags), $input = $inputBox.lightUIIPv4IPv6(inputFlags);
                        break;
                    case "mac":
                        inputFlags = $.extend(!0, {
                            maxLength: 17
                        }, flags), $input = $inputBox.lightUIMAC(inputFlags);
                        break;
                    case "port":
                        $input = $inputBox.lightUIPort(flags);
                        break;
                    case "host":
                        $input = $inputBox.lightUIDomainName(flags);
                        break;
                    case "select":
                        $input = $inputBox.lightUISelect(flags);
                        break;
                    case "combogrid":
                        $input = $inputBox.lightUIComboGrid(flags);
                        break;
                    case "number":
                        $input = $inputBox.lightUINumber(flags);
                        break;
                    case "checkbox":
                        $input = $inputBox.lightUICheckbox(flags);
                        break;
                    case "text":
                    default:
                        $input = is.func(type) ? type.call($inputBox, flags) : $inputBox.lightUIText(flags)
                }
                return $input
            },
            onedit = function() {
                if (!lockEditing) {
                    var $cell = cellPlugin(this),
                        $grid = $cell.data("plugin"),
                        $activeCell = $grid.data("$activeCell");
                    is.set($activeCell) && $activeCell.stopEditing(), $cell.startEditing();
                    var $input = $cell.data("$input");
                    if (is.jquery($input)) {
                        var data = {
                            $cell: $cell,
                            $input: $input
                        };
                        $input.bind("error.input", data, onerror).bind("esc.input", data, onescape).find("input, select").bind("keydown", function() {
                            $(this).removeClass("error")
                        }), $input.find("select").length ? ($input.find("select").bind("change", data, onenter), $input.bind("enter.input", function() {
                            $input.find("select").trigger("change")
                        }).bind("unfocus.input", function() {
                            $input.find("select").trigger("change")
                        })) : $input.bind("enter.input", data, onenter), isMobile.any() || $input.bind("unfocus.input", data, onenter), "checkbox" == $cell.data("type") && navigator.userAgent.match(/Chrome|Safari/) && ($input.unbind("unfocus.input"), $(window).bind("click", data, function(event) {
                            "INPUT" != event.target.tagName && onenter(event)
                        }))
                    }
                    var $buttonAdd = $grid.data("$buttonAdd");
                    return $buttonAdd && $buttonAdd.disable(), $grid.data("$activeCell", $cell), this
                }
            };
        onedittimer = function() {
            setTimeout(callback(this, onedit), 1)
        };
        var onerror = function(event, errorCode) {
                lockEditing = !0, $(this).addClass("error"), confirm(lng(errorCode) + ". " + lng("edit_or_esc")) ? setTimeout("$('#" + event.data.$input.find("input, select").attr("id") + "').focus()", 1) : onescape.call(this, event)
            },
            onenter = function(event) {
                lockEditing = !1, $cell = event.data.$cell, $grid = $cell.data("plugin"), $cell.applyEditing().stopEditing(), $grid.data("editing", !1);
                var $buttonAdd = $grid.data("$buttonAdd");
                $buttonAdd && $buttonAdd.enable()
            },
            onescape = function(event) {
                lockEditing = !1, $cell = event.data.$cell, $grid = $cell.data("plugin"), $cell.stopEditing(), $grid.data("editing", !1);
                var $buttonAdd = $grid.data("$buttonAdd");
                $buttonAdd && $buttonAdd.enable()
            },
            toggle = function() {
                var $options = $(this).parents(".lightUI:eq(0)").find(".options");
                $options.is(":visible") ? $options.css("display", "none") : $options.css("display", "block")
            },
            clickWin = function(event) {
                var $gridBox = $("#" + event.data.id).closest(".lightUI");
                if ($gridBox.length && ($(event.target).closest("input, .options, .select .arrow").length || $gridBox.find(".options").css("display", "none"), !$(event.target).closest(".combo").length && ($input = $gridBox.data("fieldPlugin"), is.set($input)))) {
                    var errorCode = $input.validate();
                    is.string(errorCode) ? $gridBox.trigger("error.input", errorCode) : $gridBox.trigger("unfocus.input")
                }
            },
            selectOption = function(event, $row) {
                var flags = $(this).data("flags");
                is.string(flags.combobox.blank) || $(this).data("fieldPlugin").fieldval($row.col(flags.combobox.index).html()).find("input").focus(), $(this).find(".options").css("display", "none")
            },
            onrowclick = function() {
                var $this = $(this),
                    $grid = $this.data("plugin"),
                    $row = rowPlugin($this.parent()),
                    $cell = cellPlugin($this);
                $row.data("editing") || $grid.trigger("rowclick.grid", [$row, $cell])
            },
            ondragstart = function(event) {
                event.preventDefault(), event.stopImmediatePropagation();
                var $target = $(event.target),
                    $rows = ($target.closest(".lightUI"), $target.closest("tbody").find("tr"));
                $rows.mouseover(ondragstep), $("body").bind("mouseup", {
                    $grid: $target.data("plugin")
                }, ondragstop), $(event.target).data("row").startDragging()
            },
            ondragstop = function(event) {
                event.preventDefault(), event.stopImmediatePropagation();
                var $grid = event.data.$grid;
                if ($grid.data("dragging")) {
                    var $rows = $grid.find("tbody tr");
                    $rows.unbind("mouseover", ondragstep), $("body").unbind("mouseup", ondragstop), event.data.$grid.stopDragging()
                }
            },
            ondragstep = function(event) {
                event.preventDefault(), event.stopImmediatePropagation();
                var $row = $(event.target).closest("table").find("tbody tr.draggable");
                $row.length && rowPlugin($row).moveTo(rowPlugin(this).irow())
            },
            applyAttrs = function(value) {
                try {
                    this.data("flags").accessMode = value.__attrs__.mode
                }
                catch (e) {}
            },
            scrollGridToPos = function(flags, pos) {
                var pos = pos || 0,
                    flags = flags || {},
                    scrollGrid = window.scrollGrid[flags.id],
                    objID = scrollGrid.objID;
                return scrollGrid.nrow = $("#" + objID + " tbody tr:visible").length, scrollGrid.step = $("#" + objID + " tbody tr:eq(0)").width(), scrollGrid.position > scrollGrid.nrow && (scrollGrid.position = scrollGrid.nrow - scrollGrid.trlen), scrollGrid.position = "-1p" == pos ? scrollGrid.position - scrollGrid.trlen : "+1p" == pos ? scrollGrid.position + scrollGrid.trlen : pos, scrollGrid.position < 0 ? scrollGrid.position = 0 : scrollGrid.position > scrollGrid.nrow - 1 && (scrollGrid.position -= scrollGrid.trlen), $("#" + objID + " tbody").stop().animate({
                    "margin-left": -$("#" + objID + " tbody tr:visible:eq(" + scrollGrid.position + ")").position().left
                }, 500), $("#" + objID).parent().find(".numpage").html(Math.ceil(scrollGrid.position / scrollGrid.trlen) + 1 + " / " + Math.ceil(scrollGrid.nrow / scrollGrid.trlen)), $(".editable").trigger("enter.input"), window.scrollGrid[flags.id] = scrollGrid, !0
            };
        jQuery.fn.lightUIGrid = function(header, nrow, flags) {
            if (!is.array(header)) {
                var $grid = this.data("light_ui_grid");
                return $grid ? $grid : this
            }
            is.object(flags) || (flags = {});
            var $this = plugin(this),
                colBegin = flags.selectable ? 1 : 0,
                _header = $.extend(!0, [], header);
            if (is.array(_header[0])) {
                for (var i = 0; i < _header.length - 1; i++)
                    for (var h = _header[i], j = 0, c = 0; j < h.length; j++) {
                        var h0 = h[j];
                        if (is.set(h0.rowspan)) {
                            var rowspan = h0.rowspan;
                            delete h0.rowspan, h0.spaned = {
                                irow: i,
                                icol: j + colBegin
                            };
                            for (var k = 1; rowspan >= k && !is.unset(_header[i + k]); k++) _header[i + k].splice(c, 0, h0)
                        }
                        c += is.set(h0.colspan) ? h0.colspan : 1
                    }
                var header0 = _header[_header.length - 1]
            }
            else var header0 = _header;
            var namedColumns = {};
            for (var i in header0) {
                var h = header0[i];
                is.object(h) && is.string(h.index) && (namedColumns[h.index] = {
                    inx: colBegin + Number(i),
                    name: h.name,
                    header: h
                })
            }
            this.data("namedColumns", namedColumns).data("header", header0).data("headerHeight", is.array(header[0]) ? header.length : 1).data("light_ui_grid", $this);
            var objID = gID.get(),
                pattern = "<table cellspacing='0' cellpadding='0'>" + getHeadPattern(header) + "<tbody>";
            if (pattern += "</tbody></table><div class='grid-footer'><div class='grid-footer-left'></div><div class='grid-footer-right'></div></div>", is.object(flags.combobox)) {
                flags.clickable = !0, is.unset(flags.combobox.index) && (flags.combobox.index = 0), pattern = "<div class='combo'><div class='select'><div class='field'></div><div class='arrow'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='icon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='iconReset'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style='clear: both'></div></div><div class='options'>" + pattern + "</div></div></div>", this.html(pattern).find(".arrow").click(toggle), $(document).bind("click", {
                    id: objID
                }, clickWin), this.bind("rowclick.grid", selectOption), this.find(".select .icon").bind("click", function(event) {
                    $(event.target).closest(".lightUI").trigger("iconclick.grid")
                }), this.find(".select .iconReset").bind("click", function(event) {
                    $(event.target).closest(".lightUI").trigger("iconResetclick.grid")
                });
                var $field = this.find(".select .field"),
                    validType = !1;
                switch (flags.combobox.type) {
                    case "ipv4":
                        var inputFlags = $.extend(!0, {
                            maxLength: 18
                        }, flags.combobox.flags);
                        this.data("fieldPlugin", $field.lightUIIPv4(inputFlags)), validType = !0;
                        break;
                    case "ipv6":
                        var inputFlags = $.extend(!0, {
                            maxLength: 43
                        }, flags.combobox.flags);
                        this.data("fieldPlugin", $field.lightUIIPv6(inputFlags)), validType = !0;
                        break;
                    case "ipv4ipv6":
                        var inputFlags = $.extend(!0, {
                            maxLength: 43
                        }, flags.combobox.flags);
                        this.data("fieldPlugin", $field.lightUIIPv4IPv6(inputFlags)), validType = !0;
                        break;
                    case "mac":
                        var inputFlags = $.extend(!0, {
                            maxLength: 17
                        }, flags.combobox.flags);
                        this.data("fieldPlugin", $field.lightUIMAC(inputFlags)), validType = !0;
                        break;
                    case "host":
                        this.data("fieldPlugin", $field.lightUIDomainName(flags.combobox.flags)), validType = !0;
                        break;
                    case "port":
                        this.data("fieldPlugin", $field.lightUIPort(inputFlags)), validType = !0;
                        break;
                    case "text":
                    default:
                        this.data("fieldPlugin", $field.lightUIText(flags.combobox.flags)), validType = !0
                }
                if (flags.editable === !1 && $field.find("input").attr("readonly", "readonly"), validType) {
                    var blank = flags.combobox.blank;
                    is.string(blank) && this.find(".field input").val(lng(blank)).attr("langkey", blank).css("cursor", "pointer").css("text-align", "center").click(toggle).unbind("keypress").unbind("keydown").bind("keypress", function(event) {
                        event.preventDefault()
                    }).bind("keydown", function(event) {
                        event.preventDefault()
                    }), this.data("fieldPlugin").bind("unfocus.input", function(event) {
                        event.stopPropagation()
                    }).bind("onfocus.input", function(event) {
                        event.stopPropagation(), setTimeout(callback(this, function() {
                            $(this).closest(".lightUI").trigger("onfocus.input")
                        }), 1)
                    }).bind("error.input", function(event, errorCode, keyCode) {
                        event.stopPropagation(), is.set(keyCode) && setTimeout(callback(this, function() {
                            $(this).closest(".lightUI").trigger("error.input", errorCode)
                        }), 1)
                    })
                }
                plugin.fn.extend({
                    validate: function() {
                        return this.data("fieldPlugin").validate()
                    },
                    fieldval: function(value) {
                        return this.data("fieldPlugin").fieldval(value)
                    },
                    isEmpty: function() {
                        return this.data("fieldPlugin").isEmpty()
                    },
                    clean: function() {
                        this.data("fieldPlugin").clean()
                    },
                    flags: function() {
                        return this.data("flags")
                    }
                })
            }
            else this.html(pattern);
            if (this.addClass("lightUI grid").data("flags", flags).find("table").attr("id", objID).find("tbody tr").data("plugin", $this).find("td").data("plugin", $this), zebra(this), flags.selectable && insSelCol.call(this), flags.clickable) {
                var $rows = $("#" + objID + " tbody tr");
                $rows.addClass("clickable"), $rows.find("td:not(.draggable,.selectable)").bind("click", onrowclick)
            }
            if (flags.draggable) {
                insDragCol.call(this);
                var $rows = this.find("tbody tr"),
                    $dragCol = $rows.find("td:last");
                $dragCol.bind("mousedown", ondragstart)
            }
            if (flags.addable) {
                var $footerLeft = this.find(".grid-footer-left").append("<div></div>");
                this.data("$buttonAdd", $footerLeft.find(">div:last").lightUIButton("add").bind("button.click", callback($this, function() {
                    this.addRow()
                })))
            }
            if ("mobile2" == getCookie("viewmode") && !is.object(flags.combobox) && window.mobile) {
                this.scrollFg = flags.id = flags.id || "grid1", this.noResizeTr = !flags.noResizeTr, is.unset(window.scrollGrid) && (window.scrollGrid = {}), is.unset(window.scrollGrid[flags.id]) && (window.scrollGrid[flags.id] = {
                    position: 0
                }), this.append("<div class='numpage none'></div>"), this.append("<div class='arrow-table arrow-table-left'></div><div class='arrow-table arrow-table-right'></div>"), this.find(".arrow-table-left").unbind("click").bind("click", function() {
                    scrollGridToPos(flags, "-1p")
                }), this.find(".arrow-table-right").unbind("click").bind("click", function() {
                    scrollGridToPos(flags, "+1p")
                });
                var widthtr = "100%";
                is.set(this.noResizeTr) && (window.scrollGrid[this.scrollFg].objID = objID, $(window).unbind("resize"), $(window).bind("resize", callback(this, function() {
                    this.trlen = flags.trlen = $(document).width() > 1e3 ? 4 : $(document).width() > 800 ? 3 : $(document).width() > 450 ? 2 : 1;
                    var grids = window.scrollGrid;
                    for (var key in grids) grids[key].nrow = $("#" + grids[key].objID).find("tbody tr:visible").length, grids[key].trlen = this.trlen, grids[key].position > grids[key].nrow && grids[key].nrow > 0 && (grids[key].position = 0), widthtr = Math.round(100 / this.trlen) + "%", $("#" + grids[key].objID + " tbody tr").css({
                        width: widthtr
                    }), $("#" + grids[key].objID + " tbody tr").length > 0 && ($("#" + grids[key].objID + " tbody").css({
                        "margin-left": -$("#" + grids[key].objID + " tbody tr:eq(" + grids[key].position + ")").position().left
                    }), $("#" + grids[key].objID).parent().find(".numpage").html(Math.ceil(grids[key].position / this.trlen) + 1 + " / " + Math.ceil(grids[key].nrow / this.trlen)))
                })).resize()), this.find("#" + objID).parent().find(".numpage").hide(), $(this).find("table").scroll(function() {
                    $(this).scrollLeft(0)
                }), window.hammerWrap && is.func(hammerWrap) && hammerWrap(objID, callback(this, function(ev) {
                    switch (ev.type) {
                        case "swiperight":
                            scrollGridToPos(flags, "-1p");
                            break;
                        case "swipeleft":
                            scrollGridToPos(flags, "+1p")
                    }
                }))
            }
            return plugin.fn.extend({
                scrollToPos: function(pos) {
                    scrollGridToPos(flags, pos)
                },
                scrollToBegin: function() {
                    return window.scrollGrid[flags.id].position = 0, this.find("table tbody").stop().animate({
                        "margin-left": 0
                    }, 500), window.scrollGrid[flags.id].nrow = this.find("#" + objID + " tbody tr:visible").length, window.scrollGrid[flags.id].nrow > 0 ? (this.find("#" + objID).parent().find(".numpage").html("1 / " + Math.ceil(window.scrollGrid[flags.id].nrow / flags.trlen)).removeClass("norecord"), this.find("#" + objID).parent().find(".arrow-table").show()) : (this.find("#" + objID).parent().find(".numpage").html(lng("no_record")).addClass("norecord"), this.find("#" + objID).parent().find(".arrow-table").hide()), this
                },
                row: function(i) {
                    "last" == i ? i = this.nrow() - 1 : "first" == i && (i = 0);
                    var $row = rowPlugin(this.find("tbody tr:eq(" + i + ")"));
                    return $row
                },
                col: function(index) {
                    var icol = getColInx.call(this, index),
                        $col = colPlugin(this.find("tbody tr").find("td:eq(" + icol + ")"));
                    return $col
                },
                colEditable: function(index, type, inputFlags) {
                    if (is.unset(index) || is.unset(type)) return this;
                    is.unset(inputFlags) && (inputFlags = {});
                    var flags = this.data("flags"),
                        namedColumns = (this.find("table tbody"), this.data("namedColumns")),
                        header = namedColumns[index].header,
                        inx = namedColumns[index].inx;
                    if (header.editable = {
                            type: type,
                            flags: inputFlags
                        }, header.spaned) var $obj = this.find("thead tr").eq(header.spaned.irow).find("td").eq(header.spaned.icol);
                    else var $obj = this.find("thead tr:last td").eq(inx);
                    var $col = this.col(index);
                    if ($col.addClass("editable"), $col.data("type", type).data("flags", inputFlags), inputFlags.mandatory && ($obj.append("<span class='mandatory'>*</span>").addClass("mandatory"), $col.addClass("mandatory")), "select" == type && inputFlags.options) {
                        for (var i in inputFlags.options) {
                            var def = i;
                            break
                        }
                        var $cell;
                        if (is.set(def))
                            for (var i = 0; i < $col.length; i++) $cell = $col.row(i), $cell.html().length || $cell.html(lng(def)).attr("langkey", def)
                    }
                    return checkUniqueFlag.call(this, index, inputFlags), flags.clickable ? this.data("hasEditable", !0) : $col.bind("click", isMobile.any() && !is.func(type) ? onedit : onedittimer), this
                },
                addRow: function(n) {
                    is.unset(n) && (n = 1);
                    for (var flags = this.data("flags"), header = this.data("header"), k = 0; n > k; k++) {
                        {
                            this.nrow()
                        }
                        this.find("table").append(getRowPattern.call(this));
                        var $lastRow = this.row("last"),
                            colBegin = 0;
                        flags.selectable && ($lastRow.find("td:first").before("<td  class='selectable'  cell-name='" + lng("dialogSelect") + "' ><input type='checkbox'/></td>").prev().change(selectRow), this.find("table thead tr:last td.selectable input").attr("checked") && $lastRow.find("td.selectable input").attr("checked", !0).change(), colBegin = 1), flags.clickable && ($lastRow.addClass("clickable"), $lastRow.find("td:not(.draggable,.selectable)").bind("click", {
                            $gridBox: this
                        }, onrowclick)), flags.draggable && ($lastRow.find("td:last").after("<td class='draggable'>&nbsp;</td>").next().mousedown(ondragstart), $lastRow.mouseover(ondragstep)), $lastRow.addClass("new").data("plugin", this).find("td").data("plugin", this).data("row", $lastRow);
                        for (var i = 0; i < header.length; i++) {
                            var editable = header[i].editable;
                            is.set(editable) && $lastRow.col(colBegin + i).editable(editable.type, editable.flags)
                        }
                    }
                    if (zebra(this), this.trigger("addrow.grid", n), "mobile2" == getCookie("viewmode") && flags.id && window.mobile) {
                        var objID = window.scrollGrid[flags.id].objID;
                        if (window.scrollGrid[flags.id].nrow = this.nrow(), window.scrollGrid[flags.id].position > window.scrollGrid[flags.id].nrow) var sgposition = 0;
                        else var sgposition = window.scrollGrid[flags.id].position;
                        this.find("table tbody").css({
                            "margin-left": -(window.scrollGrid[flags.id].step * sgposition)
                        }), window.scrollGrid[flags.id].nrow > 0 ? (this.find("#" + objID).parent().find(".numpage").html(Math.ceil(sgposition / flags.trlen) + 1 + " / " + Math.ceil(window.scrollGrid[flags.id].nrow / flags.trlen)).removeClass("norecord"), this.find("#" + objID).parent().find(".arrow-table").show()) : (this.find("#" + objID).parent().find(".numpage").html(lng("no_record")).addClass("norecord"), this.find("#" + objID).parent().find(".arrow-table").hide()), this.find("#" + objID + " tbody tr").css({
                            width: widthtr
                        }), this.find("#" + objID).parent().find(".numpage").show()
                    }
                    return this
                },
                cleanTable: function() {
                    return this.find("table tbody tr").remove(), this
                },
                selection: function() {
                    return rowPlugin(this.find("tbody tr.selected"))
                },
                nrow: function() {
                    return this.find("tbody tr").length
                },
                ncol: function() {
                    return this.data("header").length
                },
                checkMandatory: function(checkSelected) {
                    var res = !0;
                    if (checkSelected) var $cellSet = this.find("tbody tr").not(".selected").find("td.mandatory").not(".disabled");
                    else var $cellSet = this.find("tbody td.mandatory").not(".disabled");
                    return $cellSet.each(function(index, elem) {
                        var $cell = cellPlugin($(elem)),
                            $input = createInput($("<div></div>"), $cell.data("type"), $cell.data("flags")).fieldval($cell.html());
                        $input.isEmpty() && (res = !1, $cell.addClass("error"))
                    }), this.find("thead tr:last td").each(function(index, elem) {
                        $(elem).hasClass("mandatory") && $(this).parents("table").find("tbody tr").find("td:eq(" + index + ")").filter(".error").length && $(elem).addClass("error")
                    }), res
                },
                cleanErrors: function() {
                    return this.find("td.error").removeClass("error"), this
                },
                changedRows: function() {
                    return rowPlugin(this.find("tr.changed"))
                },
                newRows: function() {
                    return rowPlugin(this.find("tr.new"))
                },
                resetNew: function() {
                    return this.find("tr.new").removeClass("new"), this
                },
                resetChanged: function() {
                    return this.find("tr.changed").removeClass("changed"), this
                },
                resetAll: function() {
                    return this.find("tr.changed, tr.new").removeClass("changed").removeClass("new"), this
                },
                stopDragging: function() {
                    var $table = this.find(">table");
                    $table.removeClass("unselectable").find("tbody tr.draggable td").attr("unselectable", !1);
                    var $buttonAdd = this.data("$buttonAdd");
                    $buttonAdd && $buttonAdd.enable();
                    var $row = rowPlugin($table.find("tr.draggable"));
                    return $row.removeClass("draggable"), this.data("dragging", !1).trigger("dragstop.grid", [$row]), this
                }
            }), rowPlugin.fn.extend({
                col: function(index) {
                    var icol = getColInx.call(this, index),
                        $cell = cellPlugin(this.find("td:eq(" + icol + ")"));
                    return $cell
                },
                moveTo: function(i) {
                    if (!this.length) return this;
                    var src = this.irow(),
                        dst = i;
                    if (is.set(i)) {
                        var $parent = this.parent();
                        "last" == i ? i = $parent.find("tr").length - 1 : "first" == i && (i = 0);
                        var irow = this.irow();
                        i != irow && (this.detach(), i > irow ? $parent.find("tr:eq(" + (i - 1) + ")").after(this) : $parent.find("tr:eq(" + i + ")").before(this), zebra(this.data("plugin")))
                    }
                    else this.detach();
                    return this.data("plugin").trigger("moverow.grid", [src, dst]), this
                },
                removeRow: function() {
                    return this.moveTo()
                },
                selectRow: function() {
                    this.addClass("selected");
                    var plugin = this.data("plugin");
                    return plugin.data("flags").selectable && this.find("td.selectable input").attr("checked", !0), plugin.trigger("selection.grid"), this
                },
                unselectRow: function() {
                    this.removeClass("selected");
                    var plugin = this.data("plugin");
                    return plugin.data("flags").selectable && (this.find("td.selectable input").attr("checked", !1), this.parents(".lightUI:eq(0)").find("table thead tr:last td.selectable input").attr("checked", !1)), plugin.trigger("selection.grid"), this
                },
                selected: function() {
                    return this.hasClass("selected")
                },
                changed: function() {
                    return this.hasClass("changed")
                },
                isNew: function() {
                    return this.hasClass("new")
                },
                irow: function() {
                    return this.parent().find("tr").index(this)
                },
                startEditing: function() {
                    var $grid = this.data("plugin"),
                        $buttonAdd = $grid.data("$buttonAdd");
                    $buttonAdd && $buttonAdd.disable();
                    for (var $col, flags = $grid.data("flags"), colBegin = flags.selectable ? 1 : 0, i = colBegin; i < colBegin + $grid.ncol(); i++)
                        if ($col = this.col(i), $col.hasClass("editable")) {
                            $col.startEditing();
                            var editing = !0
                        }
                    return editing && (this.data("editing", !0), $grid.data("editing", !0)), this
                },
                stopEditing: function() {
                    for (var $col, $grid = this.data("plugin"), flags = $grid.data("flags"), colBegin = flags.selectable ? 1 : 0, editing = this.data("editing"), i = colBegin; i < colBegin + $grid.ncol(); i++) $col = this.col(i), $col.hasClass("editable") && ($col.stopEditing(), editing = !1);
                    return this.data("editing", editing), this
                },
                applyEditing: function() {
                    for (var $col, $grid = this.data("plugin"), flags = $grid.data("flags"), colBegin = flags.selectable ? 1 : 0, editing = this.data("editing"), i = colBegin; i < colBegin + $grid.ncol(); i++) $col = this.col(i), $col.applyEditing(), editing = !1;
                    return this.data("editing", editing), this
                },
                startDragging: function() {
                    var $grid = this.data("plugin"),
                        $table = $grid.find(">table");
                    if (!$grid.data("editing")) {
                        this.addClass("draggable"), $table.addClass("unselectable"), this.find("td").attr("unselectable", !0);
                        var $buttonAdd = $grid.data("$buttonAdd");
                        return $buttonAdd && $buttonAdd.disable(), $grid.data("dragging", !0).trigger("dragstart.grid", [this]), this
                    }
                }
            }), colPlugin.fn.extend({
                row: function(i) {
                    var $cell = cellPlugin(this.filter("td:eq(" + i + ")"));
                    return $cell
                },
                icol: function() {
                    return this.eq(0).parent().find("td").index(this.eq(0))
                }
            }), cellPlugin.fn.extend({
                irow: function() {
                    return $(this.parents()[1]).find("tr").index(this.parent())
                },
                icol: function() {
                    return this.parent().find("td").index(this)
                },
                getColAlias: function() {
                    var icol = this.icol(),
                        namedColumns = this.parents(".lightUI:eq(0)").data("namedColumns");
                    for (var i in namedColumns)
                        if (namedColumns[i].inx == icol) return i;
                    return null
                },
                editable: function(type, inputFlags) {
                    var $row = this.parent();
                    if (this.addClass("editable"), is.unset(inputFlags) && (inputFlags = {}), inputFlags.mandatory && this.addClass("mandatory"), this.data("type", type).data("flags", inputFlags), "select" == type && inputFlags && inputFlags.options) {
                        for (var i in inputFlags.options) {
                            var def = i;
                            break
                        }
                        is.set(def) && !this.html().length && this.html(lng(def)).attr("langkey", def)
                    }
                    return inputFlags.disabled ? this.disable() : this.enable(), $row.hasClass("clickable") ? this.data("plugin").data("hasEditable", !0) : this.bind("click", isMobile.any() && !is.func(type) ? onedit : onedittimer), this
                },
                startEditing: function() {
                    var flags = this.data("flags");
                    if (!flags.disabled && 4 != flags.accessMode && 0 != flags.accessMode) {
                        var $table = this.closest("table"),
                            $grid = this.data("plugin"),
                            grFlags = $grid.data("flags"),
                            type = this.data("type"),
                            objID = $table.attr("id"),
                            inputID = objID + "_edit_" + this.irow() + "_" + this.icol();
                        $("#" + inputID).length || $grid.append("<div id='" + inputID + "' class='lightUI editable'></div>");
                        var $inputBox = $("#" + inputID),
                            $input = createInput($inputBox, type, flags);
                        if (is.jquery($input)) {
                            var $this = $(this),
                                width = $this.width(),
                                innerWidth = $this.innerWidth(),
                                height = $this.height(),
                                innerHeight = $this.innerHeight(),
                                outerHeight = $this.outerHeight(),
                                borderTop = (new Number($this.css("border-left-width").match(/\d*/)[0]).valueOf(), new Number($this.css("border-top-width").match(/\d*/)[0]).valueOf()),
                                $field = $input.find("input,select"),
                                paddingLeft = new Number($field.css("padding-left").match(/\d*/)[0]).valueOf(),
                                paddingRight = new Number($field.css("padding-right").match(/\d*/)[0]).valueOf(),
                                paddingTop = new Number($field.css("padding-top").match(/\d*/)[0]).valueOf();
                            if ("checkbox" == type) {
                                if (navigator.userAgent.match(/Chrome|Safari/)) $input.css({
                                    position: "absolute",
                                    left: $(this).position().left,
                                    top: $(this).position().top,
                                    width: "21px",
                                    height: "21px"
                                });
                                else {
                                    var fieldHeight = ($field.width(), $field.height());
                                    $input.css({
                                        position: "absolute",
                                        left: $(this).position().left,
                                        top: $(this).position().top + (innerHeight - fieldHeight - 1) / 2 + borderTop
                                    })
                                }
                                $field.focus().select();
                                var langkey = $this.attr("langkey");
                                $input.fieldval("yes" == langkey ? !0 : !1), $this.html("")
                            }
                            else "mobile2" == getCookie("viewmode") && window.mobile ? (window.scrollGrid[grFlags.id].position = Math.floor(this.irow() / grFlags.trlen) * grFlags.trlen, $table.find("tbody").css("margin-left", -$table.find("tbody tr:eq(" + window.scrollGrid[grFlags.id].position + ")").position().left), $input.css({
                                position: "absolute",
                                left: $table.find("tbody tr:eq(" + this.irow() + ")").offset().left,
                                top: $(this).position().top + (innerHeight - height) / 2
                            }), $field.width($this.width() - paddingLeft)) : ($input.css({
                                position: "absolute",
                                left: $(this).position().left + (innerWidth - width) / 2 - 6,
                                top: $(this).position().top + (innerHeight - height) / 2 + borderTop - 6,
                                height: outerHeight - 2 * paddingTop + 4
                            }), $field.width(innerWidth - paddingLeft - paddingRight + 4)), $field.focus().select(), is.func($input.fieldalias) ? $input.fieldalias($(this).attr("langkey")) : $input.fieldval($(this).html());
                            $table.parent().trigger("startEditing.grid", [this, $input]), this.data("$input", $input), $input.data("$cell", this), this.data("editing", !0), $grid.data("editing", !0)
                        }
                        return this
                    }
                },
                stopEditing: function() {
                    var $input = this.data("$input");
                    if ($input) {
                        var $grid = this.data("plugin");
                        if ($grid.trigger("stopEditing.grid", [this, $input]), $input.remove(), this.data("$input", null), this.removeClass("error").attr("title", ""), "checkbox" == this.data("type")) {
                            var langkey = this.attr("langkey");
                            langkey && this.html(lng(langkey))
                        }
                    }
                    return this.data("editing", !1), this
                },
                applyEditing: function() {
                    var $input = this.data("$input");
                    if ($input) {
                        var isDataChanged = !1;
                        if (is.func($input.fieldalias)) {
                            var alias = $input.fieldalias(),
                                lngAlias = lng(alias),
                                oldLngAlias = this.html();
                            isDataChanged = lngAlias != oldLngAlias, this.html(lngAlias), this.attr("langkey", alias)
                        }
                        else {
                            var value = $input.fieldval();
                            "checkbox" == this.data("type") ? value ? (isDataChanged = "yes" != this.attr("langkey"), this.attr("langkey", "yes").html(lng("yes"))) : (isDataChanged = "no" != this.attr("langkey"), this.attr("langkey", "no").html(lng("no"))) : (isDataChanged = this.html() != value, this.html(value))
                        }
                        if (isDataChanged) {
                            var $row = this.parent();
                            $row.addClass("changed"), this.data("plugin").trigger("cellChange.grid", [this, $input])
                        }
                    }
                    return this
                },
                enable: function() {
                    var flags = $.extend(!0, {}, this.data("flags"));
                    return (is.unset(flags.accessMode) || 4 != flags.accessMode) && (this.removeClass("disabled"), flags.disabled = !1, this.data("flags", flags)), this
                },
                disable: function() {
                    this.addClass("disabled");
                    var flags = $.extend(!0, {}, this.data("flags"));
                    return flags.disabled = !0, this.data("flags", flags), this
                },
                fieldval: function(value) {
                    if (this.hasClass("editable")) {
                        if (is.set(value)) {
                            applyAttrs.call(this, value);
                            var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
                            if (is.func($input.fieldalias)) {
                                $input.fieldval(value);
                                var alias = $input.fieldalias();
                                this.html(lng(alias)), this.attr("langkey", alias)
                            }
                            else "checkbox" == this.data("type") ? value ? (isDataChanged = "yes" != this.attr("langkey"), this.attr("langkey", "yes").html(lng("yes"))) : (isDataChanged = "no" != this.attr("langkey"), this.attr("langkey", "no").html(lng("no"))) : this.html(value);
                            return this
                        }
                        var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
                        return is.func($input.fieldalias) ? ($input.fieldalias(this.attr("langkey")), $input.fieldval()) : "checkbox" == this.data("type") ? "yes" == this.attr("langkey") ? !0 : !1 : this.html()
                    }
                    return is.set(value) ? this.html(value) : this.html()
                },
                __html__: this.html,
                html: function(value) {
                    return value instanceof String && (arguments[0] = value.valueOf()), this.__html__.apply(this, arguments)
                },
                validate: function() {
                    if (this.hasClass("editable")) {
                        var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
                        return $input.validate()
                    }
                    return null
                }
            }), $this.addRow(nrow), $this.find("tbody tr.new").removeClass("new"), $this
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUIEdit = function(name, comment, flags) {
            is.unset(flags) && (flags = {});
            var applyArgs = function() {
                    if (is.string(comment) && this.find(".comment").html(lng(comment)).attr("langkey", comment), is.string(flags.inputPadding) && this.find(".label").css("width", flags.inputPadding), is.string(name) && name.length) {
                        name.match(/[\.,;:?!]/) && this.find(".label>span:eq(0)").html("&nbsp;");
                        var $label = this.find(".label>label");
                        $label.html(lng(name)), $label.attr("langkey", name)
                    }
                    else this.find(".label>span:eq(0)").html("&nbsp;");
                    is.string(flags.altname) && this.find(".altname").html(lng(flags.altname)).attr("langkey", flags.altname), this.data("flags", flags)
                },
                pattern = ("$" + this.find(".edit").attr("id"), "<div class='edit'>");
            pattern += "<div class='label'><label></label><span>:</span></div>", pattern += "<div class='input'></div>", pattern += "<div class='altname'></div>", pattern += "<div class='error'></div>", pattern += "<div class='clear'>&nbsp;</div>", pattern += "<div class='comment'></div>", pattern += "<div class='clear'>&nbsp;</div></div>", pattern += "<div class='clear'>&nbsp;</div>", this.html(pattern), flags.mandatory && this.find(".label").append("<span class='mandatory'>*</span>"), this.find(".error").css("display", "none");
            var $input = this.find("input");
            is.unset(comment) && this.find(".comment").css("display", "none"), $input.live("focusin", function() {
                $(this).addClass("focus")
            }).live("focusout", function() {
                $(this).removeClass("focus")
            });
            var objID = gID.get();
            return this.find(".edit").attr("id", objID), this.addClass("lightUI"), plugin.fn.extend({
                enable: function() {
                    return this.find(".edit").removeClass("editDisabled"), this.find("input").hasClass("validate") && this.find(".error").css("display", ""), this.find("input,select,textarea").attr("disabled", !1), this.find(".label .mandatory").html("*"), this
                },
                disable: function() {
                    return this.find(".edit").addClass("editDisabled"), this.find(".error").css("display", "none"), this.find("input,select,textarea").attr("disabled", !0), this.find(".label .mandatory").html(""), this
                },
                isDisabled: function() {
                    return this.find(".edit").hasClass("editDisabled")
                },
                setError: function(message) {
                    if (is.unset(message)) this.cleanError();
                    else {
                        var $error = this.find(".error");
                        $error.css("display", "block"), this.find("input").addClass("validate"), $error.fadeIn("slow"), $error.attr("langkey", message), $error.html(lng(message))
                    }
                },
                cleanError: function() {
                    var $error = this.find(".error");
                    this.find("input").removeClass("validate"), $error.css("display", "none"), $error.attr("langkey", ""), this.find(".error").html("")
                },
                setComment: function(message) {
                    comment = message, this.find(".comment").show().html(lng(comment)).attr("langkey", comment)
                },
                cleanComment: function() {
                    this.find(".comment").hide()
                },
                label: function(name) {
                    var $label = this.find(".label>label");
                    return is.string(name) ? ($label.html(lng(name)), $label.attr("langkey", name), this.find(".label>span").html(":"), this) : $label.html(lng(name))
                },
                altname: function(name) {
                    var $altname = this.find(".altname");
                    return is.string(name) ? ($altname.html(lng(name)), $altname.attr("langkey", name), this) : $altname.html(lng(name))
                },
                mandatory: function(value) {
                    if (is.set(value)) {
                        if (value) {
                            var $manda = this.find(".label .mandatory");
                            $manda.length ? $manda.html("*") : this.find(".label").append("<span class='mandatory'>*</span>"), this.flags().mandatory = !0
                        }
                        else this.find(".label .mandatory").remove(), this.flags().mandatory = !1;
                        return this
                    }
                    return this.flags().mandatory
                },
                flags: function() {
                    return this.data("flags")
                }
            }), applyArgs.call(this), plugin(this)
        }
    }(),
    function() {
        var pluginDomainName = jQuery.sub(),
            pluginIPv4 = jQuery.sub(),
            pluginIPv6 = jQuery.sub(),
            pluginIPv4IPv6 = jQuery.sub(),
            pluginMAC = jQuery.sub(),
            pluginText = jQuery.sub(),
            pluginPort = jQuery.sub(),
            pluginPortOld = jQuery.sub(),
            pluginNumber = jQuery.sub(),
            pluginSelect = jQuery.sub(),
            pluginStatic = jQuery.sub(),
            pluginCheckbox = jQuery.sub(),
            keyDown = function(event) {
                return 27 == event.keyCode ? ($.browser.opera || keyPress.call(this, event), !1) : void 0
            },
            keyPress = function(event) {
                if (!navigator.userAgent.match("/Iceweasel/") || 9 != event.keyCode) {
                    if (13 == event.keyCode || 9 == event.keyCode) {
                        this.data("noblur", !0), setTimeout(context(this).callback(function() {
                            this.data("noblur", !1)
                        }), 1);
                        var errorCode = (this.find("input"), this.validate());
                        if (is.string(errorCode)) return this.trigger("error.input", [errorCode, event.keyCode]), !1;
                        var obj = {
                            13: "enter",
                            9: "tab"
                        };
                        this.trigger(obj[event.keyCode] + ".input")
                    }
                    else if (27 == event.keyCode) {
                        {
                            this.find("input")
                        }
                        this.trigger("esc.input")
                    }
                    return !0
                }
            },
            onblur = function(event) {
                if (!this.data("noblur")) {
                    var errorCode = this.validate();
                    if (is.string(errorCode)) {
                        {
                            this.find("input")
                        }
                        this.trigger("error.input", errorCode)
                    }
                    else this.trigger("unfocus.input");
                    event.stopPropagation()
                }
            },
            onfocus = function(event) {
                this.trigger("onfocus.input"), event.stopPropagation()
            },
            bindEvents = function($obj) {
                var $input = this.find("input, select");
                ($.browser.opera || $.browser.webkit || $.browser.msie) && $input.keydown(context($obj).callback(keyDown)), $input.keypress(context($obj).callback(keyPress)), this.focusout(context($obj).callback(onblur)), this.focusin(context($obj).callback(onfocus))
            },
            fieldval = function(value) {
                return is.set(value) ? (applyAttrs.call(this, value), this.find("input").val(value), this) : this.find("input").val()
            },
            checkRe = function(errorCode) {
                if (!errorCode) {
                    var validater, re = this.flags().re,
                        value = this.fieldval(),
                        alias = value;
                    if (is.func(this.fieldalias) && (alias = this.fieldalias()), is.array(re))
                        for (var i = 0; i < re.length && (validater = re[i], !is.func(validater) || !(errorCode = validater(value, alias))); i++);
                    else is.func(re) && (errorCode = re(value, alias))
                }
                return errorCode
            },
            clean = function() {
                return this.fieldval(""), this
            },
            initPlugin = function(flags) {
                this.append(flags.password ? "<input type='password'/>" : "<input type='text'/>");
                var $input = this.find("input");
                objID = gID.get(), $input.attr("id", objID), is.number(flags.size) && $input.attr("size", flags.size), is.number(flags.maxLength) && $input.attr("maxLength", flags.maxLength), flags.disabled && $input.attr("disabled", !0), this.data("flags", flags)
            },
            validateIPv4 = function(str) {
                var patt = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
                if (str.length) {
                    if (str = str.match(/\S+/)[0], str.length > 18) return "netAddrInvalid";
                    if (!patt.test(str)) return "netAddrInvalid";
                    var arr = str.split(".");
                    for (var i in arr)
                        if (arr[i] > 255) return "netAddrInvalid"
                }
                return null
            },
            validateIPv6 = function(str, flags) {
                if (str.match(/^::ffff:/)) return validateIPv4(str.replace(/^::ffff:/, ""), flags);
                var re = new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/);
                return re.test(str) ? null : "netAddrInvalid"
            },
            validateDomain = function(str) {
                var host = str || "",
                    regArea = /^[а-яА-Яa-zA-Z]{2,6}$/,
                    regDomain = /^[а-яА-Яa-zA-Z0-9]+([\-]?[а-яА-Яa-zA-Z0-9])*$/;
                if (host = host.replace(/(^\s+|\s+$)/g, ""), host.length > 255) return !1;
                var domains = host.split(".");
                if (domains.length < 2 || !regArea.test(domains[domains.length - 1])) return !1;
                for (var i in domains)
                    if (domains[i].length < 1 || domains[i].length > 63 || !regDomain.test(domains[i])) return !1;
                return !0
            },
            checkMask = function(mask, type) {
                if (is.string(mask)) {
                    var arr = mask.split("."),
                        len = arr.length;
                    switch (len) {
                        case 1:
                            var endrange = "ipv4" == type ? 32 : 128;
                            if (checkMaskRange(arr[0], 0, endrange)) return "InvalidMask";
                            break;
                        case 4:
                            if (!is.IPv4(mask)) return "InvalidMask";
                            for (var bits = "", i = 0; 4 > i; i++) {
                                var octet = parseInt(arr[i]);
                                bits += 0 == octet ? "00000000" : octet.toString(2)
                            }
                            if (32 != bits.length) return "InvalidMask";
                            var flagmask;
                            flagmask = "1" == bits.charAt(0) ? !1 : !0;
                            for (var j = 1; j <= bits.length; j++)
                                if (0 == bits.charAt(j) && (flagmask = !0), 1 == bits.charAt(j) && flagmask) return "InvalidMask";
                            break;
                        default:
                            return "InvalidMask"
                    }
                    return null
                }
            },
            checkMaskRange = function(val, start_range, end_range) {
                return "NaN" == parseInt(val) || parseInt(val) < start_range || parseInt(val) > end_range ? !0 : !1
            },
            checkPort = function(port, range, several, use_ports) {
                var arrport = [],
                    isrange = !1,
                    isseveral = !1,
                    use_ports = use_ports;
                if (range && (arrport = port.split(":"), arrport.length > 1)) {
                    if (isrange = !0, arrport.length > 2) return "InvalidPort";
                    for (var i = 0; i < arrport.length; i++)
                        if (!isPort(arrport[i])) return "InvalidPort";
                    if (parseInt(arrport[0]) >= parseInt(arrport[1])) return "InvalidPort"
                }
                if (several && (arrport = port.split(","), arrport.length > 1)) {
                    if (isseveral = !0, isrange) return "InvalidPort";
                    for (var i = 0; i < arrport.length; i++)
                        if (!isPort(arrport[i])) return "InvalidPort"
                }
                return isrange || isseveral || isPort(port) ? use_ports && -1 != _.indexOf(use_ports, parseInt(port)) ? "InvalidPortExist" : null : "InvalidPort"
            },
            isPort = function(val) {
                var patt = /^[0-9]*$/;
                if (val = val.match(/\S+/)[0], !patt.test(val)) return !1;
                var num = new Number(val);
                return 1 > num ? !1 : num > 65535 ? !1 : !0
            },
            isEmpty = function() {
                return !this.find("input").val().length
            },
            enable = function() {
                var flags = this.data("flags");
                return (is.unset(flags.accessMode) || 4 != flags.accessMode) && this.find("input, select").attr("disabled", !1), this
            },
            show = function() {
                var flags = this.data("flags");
                return (is.unset(flags.accessMode) || 0 != flags.accessMode) && this.__show__(), this
            },
            isDisabled = function() {
                return this.find("input, select").attr("disabled")
            },
            disable = function() {
                this.find("input, select").attr("disabled", !0)
            },
            applyAttrs = function() {};
        jQuery.fn.lightUIDomainName = function(flags) {
            if (is.unset(flags) && (flags = {}), is.set(flags)) var isip = flags.isip,
                ipv6 = flags.ipv6;
            initPlugin.call(this, flags), pluginDomainName.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var host = this.find("input").val();
                        if (host.length) {
                            if (host.trim().split(" ").length > 1) return "domainNameInvalid";
                            if (isip) {
                                if (1 == ipv6) {
                                    if (!validateDomain(host) && null != validateIPv4(host) && null != validateIPv6(host)) return "domainNameInvalid"
                                }
                                else if (!validateDomain(host) && null != validateIPv4(host)) return "domainNameInvalid"
                            }
                            else if (!validateDomain(host)) return "domainNameInvalid"
                        }
                        return checkRe.call(this)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginDomainName(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIIPv4 = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginIPv4.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var str = this.find("input").val(),
                            arr = str.split("/"),
                            errorCode = null,
                            bitmask = arr[1];
                        return is.string(bitmask) && ("NaN" == parseInt(bitmask).toString() || bitmask > 32 || 0 > bitmask) ? "netAddrInvalid" : (errorCode = validateIPv4(arr[0], flags), checkRe.call(this, errorCode))
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginIPv4(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIIPv6 = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginIPv6.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var str = this.find("input").val(),
                            errorCode = null;
                        if (str.length) {
                            str = str.match(/\S+/)[0];
                            var arr = str.split("/"),
                                bitmask = arr[1];
                            if (str = arr[0], is.string(bitmask) && ("NaN" == parseInt(bitmask).toString() || bitmask > 128 || 0 > bitmask)) return "netAddrInvalid";
                            errorCode = validateIPv6(str)
                        }
                        return checkRe.call(this, errorCode)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginIPv6(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIIPv4IPv6 = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginIPv4IPv6.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        {
                            var str = this.find("input").val(),
                                arr = str.split("/"),
                                errorCode = null;
                            arr[1]
                        }
                        return errorCode = validateIPv4(arr[0]), errorCode ? (errorCode = validateIPv6(arr[0]), errorCode || (errorCode = checkMask(arr[1], "ipv6"))) : errorCode = checkMask(arr[1], "ipv4"), checkRe.call(this, errorCode)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginIPv4IPv6(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIMAC = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginMAC.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        if (flags.isRange) var patt = /^[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}$/;
                        else var patt = /^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/;
                        var pattNullMac = /^[0]{1,2}:[0]{1,2}:[0]{1,2}:[0]{1,2}:[0]{1,2}:[0]{1,2}$/,
                            pattMultiCast = /^[0-9a-fA-F]?[13579BbDdFf]:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/,
                            str = this.find("input").val();
                        if (str.length) {
                            if (str = str.match(/\S+/)[0], !patt.test(str)) return "macfltInvalidAddress";
                            if (flags.isWan && (pattNullMac.test(str) || pattMultiCast.test(str))) return "invalidAddr";
                            var arr = str.split(".");
                            for (var i in arr)
                                if (arr[i] > 255) return "macfltInvalidAddress"
                        }
                        return checkRe.call(this)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginMAC(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIPort = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginPort.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var errorCode = null,
                            isRange = flags.isRange ? !0 : !1,
                            isSeveral = flags.isSeveral ? !0 : !1,
                            use_ports = flags.use_ports ? flags.use_ports : !1,
                            str = this.find("input").val();
                        if (str.length) {
                            if (str.trim().split(" ").length > 1) return "InvalidPort";
                            errorCode = checkPort(str, isRange, isSeveral, use_ports)
                        }
                        return checkRe.call(this, errorCode)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginPort(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIPortOld = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginPortOld.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var errorCode = null,
                            isRange = flags.isRange ? !0 : !1,
                            isSeveral = flags.isSeveral ? !0 : !1,
                            str = this.find("input").val();
                        return str.length && (errorCode = checkPort(str, isRange, isSeveral)), checkRe.call(this, errorCode)
                    }
                    return null
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginPortOld(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIText = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginText.fn.extend({
                validate: function() {
                    return this.find("input").attr("disabled") ? null : checkRe.call(this)
                },
                fieldval: fieldval,
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginText(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUIStatic = function() {
            this.data("flags", {}), this.addClass("static"), pluginStatic.fn.extend({
                validate: function() {
                    return null
                },
                fieldval: function(value) {
                    return applyAttrs.call(this, value), is.set(value) ? this.html(value.valueOf()) : this.html()
                },
                isEmpty: function() {
                    return !this.html().length
                },
                enable: function() {
                    return this
                },
                disable: function() {
                    return this
                },
                isDisabled: function() {
                    return !1
                },
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginStatic(this);
            return this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUINumber = function(flags) {
            is.unset(flags) && (flags = {});
            initPlugin.call(this, flags), pluginNumber.fn.extend({
                validate: function() {
                    if (!this.find("input").attr("disabled")) {
                        var str = this.find("input").val(),
                            flags = this.flags();
                        if (str.length) {
                            str = str.match(/\S+/)[0];
                            var patt = /^-*[0-9]+(\.?[0-9]+|[0-9]*)$/;
                            if (!patt.test(str)) return "numNaN";
                            var num = new Number(str);
                            if (is.number(flags.minval) && num < flags.minval) return "numLessThanMin";
                            if (is.number(flags.maxval) && num > flags.maxval) return "numMoreThanMax"
                        }
                        return checkRe.call(this)
                    }
                    return null
                },
                fieldval: function(value) {
                    if (is.set(value)) return applyAttrs.call(this, value), this.find("input").val(value), this;
                    var val = this.find("input").val();
                    return val.length ? new Number(this.find("input").val()).valueOf() : val
                },
                isEmpty: isEmpty,
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: clean,
                show: show,
                __show__: this.show
            });
            var $obj = pluginNumber(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUISelect = function(flags) {
            is.unset(flags) && (flags = {}), is.unset(flags.options) && (flags.options = {});
            var $input = this.append("<select></select").find("select");
            flags.disabled && $input.attr("disabled", !0);
            var options = flags.options,
                optionArray = flags.optionArray;
            if (is.array(optionArray)) {
                var opt;
                flags.options = {}, options = flags.options;
                for (var i = 0; i < optionArray.length; i++) opt = optionArray[i], options[opt.name] = opt.value, $input.append("<option value='" + opt.value + "'>" + lng(opt.name) + "</option>").find("option:last").attr("langkey", opt.name)
            }
            else if (is.object(options))
                for (var i in options) $input.append("<option value='" + options[i] + "'>" + lng(i) + "</option>").find("option:last").attr("langkey", i);
            if (options.length) {
                var value = this.find("option:eq(0)").attr(value);
                $input.val(value).data("value", value)
            }
            $input.attr("id", gID.get()), is.number(flags.size) && $input.attr("size", flags.size), is.set(flags.multiple) && $input.attr("multiple", flags.multiple), is.func(flags.fb) && $input.bind("change", flags.fb), this.data("flags", flags), pluginSelect.fn.extend({
                validate: function() {
                    return this.find("select").attr("disabled") ? null : checkRe.call(this)
                },
                fieldval: function(value) {
                    var $select = this.find("select");
                    return is.set(value) ? (applyAttrs.call(this, value), $select.val(value.valueOf()).data("value", value.valueOf()), this) : $select.val()
                },
                fieldalias: function(alias) {
                    this.find("select"), this.flags().options;
                    if (is.set(alias)) {
                        for (var $option = this.find("option"), i = 0; i < $option.length; i++)
                            if ($option.eq(i).attr("langkey") == alias) {
                                this.fieldval($option.eq(i).attr("value"));
                                break
                            }
                        return this
                    }
                    return this.find("select option:selected").attr("langkey")
                },
                addOption: function(__name, __value) {
                    var $select = this.find("select"),
                        value = $select.data("value");
                    if ($select.append("<option value='" + __value + "'>" + lng(__name) + "</option>").find("option:last").attr("langkey", __name), !this.data("flags").manualCorrection) {
                        var value = $select.data("value");
                        (is.unset(value) || value == __value) && this.fieldval(__value)
                    }
                    return this
                },
                correctValue: function() {
                    for (var $options = this.find("select option"), value = this.find("select").data("value"), i = 0; i < $options.length; i++)
                        if ($options.eq(i).attr("value") == value) return this.fieldval(value), this;
                    return this
                },
                cleanOptions: function() {
                    this.find("select").html("")
                },
                updateSelect: function() {
                    return this.html(this.html()), this
                },
                isEmpty: function() {
                    return !1
                },
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: function() {
                    return this
                },
                show: show,
                __show__: this.show
            });
            var $obj = pluginSelect(this);
            return bindEvents.call(this, $obj), this.data("light_ui_input", $obj), $obj
        }, jQuery.fn.lightUICheckbox = function(flags) {
            is.unset(flags) && (flags = {}), is.unset(flags.options) && (flags.options = {});
            var $input = this.append("<input type='checkbox'></checkbox").find("input");
            flags.disabled && $input.attr("disabled", !0), $input.attr("id", gID.get()), this.data("flags", flags), pluginCheckbox.fn.extend({
                validate: function() {
                    return null
                },
                fieldval: function(value) {
                    var $input = this.find("input");
                    return is.set(value) ? (applyAttrs.call(this, value), $input.attr("checked", value ? !0 : !1), this) : $input.attr("checked") ? !0 : !1
                },
                isEmpty: function() {
                    return !1
                },
                enable: enable,
                disable: disable,
                isDisabled: isDisabled,
                flags: function() {
                    return this.data("flags")
                },
                clean: function() {
                    return this
                },
                show: show,
                __show__: this.show
            });
            var $obj = pluginCheckbox(this);
            return bindEvents.call(this, $obj), $obj
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUIUpload = function(action, filename, options) {
            this.iframename = gID.get(), options = $.extend({
                auto: !0,
                method: "post",
                browse: "Browse",
                cancel: "Cancel"
            }, options), action = action.indexOf("?") >= 0 ? action + "&proxy=y" : action + "?proxy=y";
            var $pattern = $("			<div class='upload normal'>				<div class='ustatus'></div>				<div class='ufile'>					<input type='text' class='path' readonly='readonly' value='' />				</div>				<div class='ubutton'>					<input type='button' class='browse' langkey='" + options.browse + "' value='" + lng(options.browse) + "' />					<input type='button' class='cancel' langkey='" + options.cancel + "' value='" + lng(options.cancel) + "' />				</div>				<div class='clear'></div>				<form action='" + action + "' id='" + gID.get() + "' enctype='multipart/form-data' target='" + this.iframename + "' method='" + options.method + "'>					<input type='file' name='" + filename + "' />					<input type='reset' />				</form>				<iframe frameborder='0' scrolling='no' name='" + this.iframename + "' id='" + this.iframename + "'></iframe>			</div>		");
            this.html($pattern), this.addClass("lightUI"), this.uploading = !1, this.auto = options.auto, this.find(">.upload input.browse").bind("click", callback(this, function() {
                return this.find(">.upload input[type=file]").trigger("click"), !1
            })), this.find(">.upload input.cancel").bind("click", callback(this, function() {
                if (this.uploading) {
                    for (var i = 0; i < window.frames.length; i++) window.frames[i].name == this.iframename && (jQuery.browser.msie ? window.frames[i].document.execCommand("Stop") : window.frames[i].stop());
                    this.find(">.upload").removeClass("uploading").trigger("clear"), this.uploading = !1, this.trigger("break.upload")
                }
                return !1
            })), this.find(">.upload iframe").bind("load", callback(this, function(e) {
                return this.uploading && (this.find(">.upload").removeClass("uploading"), this.uploading = !1, this.trigger("end.upload", $(e.target).contents().find("body").html())), !1
            })), this.find(">.upload input[type=file]").bind("change", callback(this, function(e) {
                var path = basename($(e.target).val());
                return this.find(">.upload input.path").val(path), this.auto && this.find(">.upload").trigger("upload"), this.trigger("change.upload", e.target.files), !1
            })), this.find(">.upload").bind({
                upload: callback(this, function() {
                    return this.uploading || "" == this.find(">.upload input[type=file]").val() || (this.uploading = !0, this.find(">.upload").addClass("uploading").find("form").submit(), this.trigger("begin.upload")), !1
                }),
                clear: callback(this, function() {
                    return this.find(">.upload input.path").val(""), this.find(">.upload input[type=reset]").trigger("click"), this.find(">.upload form").get(0).reset(), !1
                })
            });
            try {
                var ieversion = navigator.appVersion.match(/MSIE\s+\d+/)[0].replace("MSIE", "");
                ieversion && 9 >= ieversion && this.find(">.upload").addClass("upload-ie")
            }
            catch (e) {}
            return plugin.fn.extend({
                enable: function() {
                    return this.find(">.upload").removeClass("disable").addClass("normal"), this.find(">.upload :input").removeAttr("disabled"), this
                },
                disable: function() {
                    return this.find(">.upload").removeClass("normal").addClass("disable"), this.find(">.upload :input").attr("disabled", "disabled"), this
                },
                upload: function() {
                    return this.find(">.upload").trigger("upload"), this
                },
                cancel: function() {
                    return this.find(">.upload input.cancel").trigger("click"), this
                },
                clear: function() {
                    return this.find(">.upload").trigger("clear"), this
                }
            }), plugin(this)
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUITrackbar = function(value, flags) {
            var objID = gID.get();
            flags = $.extend({
                minval: 0,
                maxval: 100,
                suffix: "%",
                direct: "horizontal"
            }, flags), this.data("flags", flags);
            var $pattern = $("			<div class='trackbar unselectable'>				<div class='shell'>					<div class='rail'>						<div class='tail'></div>						<div class='toddler'></div>					</div>					<div class='value' unselectable='unselectable'></div>				</div>			</div>		");
            this.html($pattern), this.addClass("lightUI"), this.find(">.trackbar").attr("id", objID).addClass("horizontal" == flags.direct ? "horizontal" : "vertical"), DRAGGER.add(this.find(".toddler").bind({
                "up.dragger": callback(this, function() {
                    return this.trigger("change.trackbar"), !1
                }),
                "down.dragger": callback(this, function() {
                    return !1
                }),
                "move.dragger": callback(this, function(e, info) {
                    var flags = this.data("flags"),
                        $trackbar = this.find(">.trackbar"),
                        $rail = $trackbar.find(".rail"),
                        $tail = $rail.find(">.tail"),
                        $toddler = $rail.find(">.toddler"),
                        $value = $trackbar.find(".value");
                    if ("horizontal" == flags.direct) {
                        if (info.left >= 0 && info.left < $rail.width()) {
                            var offset = 100 * info.left / $rail.width();
                            $toddler.css({
                                left: offset + "%"
                            }), $tail.width(offset + "%"), $value.text(Math.ceil(offset * (flags.maxval - flags.minval) / 100 + flags.minval) + flags.suffix)
                        }
                    }
                    else if (info.top >= 0 && info.top < $rail.height()) {
                        info.bottom = $rail.height() - info.top - 1;
                        var offset = 100 * info.bottom / $rail.height();
                        $toddler.css({
                            bottom: offset + "%"
                        }), $tail.height(offset + "%"), $value.text(Math.ceil(offset * (flags.maxval - flags.minval) / 100 + flags.minval) + flags.suffix)
                    }
                    return !1
                })
            }));
            var fieldval = function(value) {
                var flags = this.data("flags"),
                    $trackbar = this.find(">.trackbar"),
                    $rail = $trackbar.find(".rail"),
                    $tail = $rail.find(">.tail"),
                    $toddler = $rail.find(">.toddler"),
                    $value = $trackbar.find(".value"),
                    offset = null;
                return is.set(value) ? (value < flags.minval && (value = flags.minval), value > flags.maxval && (value = flags.maxval), offset = 100 * (value - flags.minval) / (flags.maxval - flags.minval), "horizontal" == flags.direct ? ($toddler.css({
                    left: offset + "%"
                }), $tail.width(offset + "%")) : ($toddler.css({
                    bottom: offset + "%"
                }), $tail.height(offset + "%")), $value.text(value + flags.suffix), this) : (offset = "horizontal" == flags.direct ? 100 * $toddler.position().left / $rail.width() : 100 * $toddler.position().bottom / $rail.height(), Math.ceil(offset * (flags.maxval - flags.minval) / 100 + flags.minval))
            };
            return fieldval.call(this, is.number(value) ? value : flags.minval), plugin.fn.extend({
                fieldval: fieldval,
                flags: function() {
                    return this.data("flags")
                },
                enable: function() {
                    return this.find(">.trackbar").removeClass("disable"), DRAGGER.add(this.find(".toddler")), this
                },
                disable: function() {
                    return this.find(">.trackbar").addClass("disable"), DRAGGER.remove(this.find(".toddler")), this
                }
            }), plugin(this)
        }
    }(),
    function() {
        var pluginComboGrid = jQuery.sub();
        jQuery.fn.lightUIComboGrid = function(flags) {
            is.unset(flags) && (flags = {}), pluginComboGrid.fn.extend({
                validate: function() {
                    return this.getGrid().validate()
                },
                fieldval: function(value) {
                    return this.getGrid().fieldval(value)
                },
                addOption: function(obj) {
                    var $row = this.getGrid().addRow().row("last");
                    if (is("Object", obj))
                        for (var i in obj) $row.col(i).html(lng(obj[i])).attr("langkey", obj[i]);
                    else
                        for (var i = 0; i < arguments.length; i++) $col = $row.col(i), $col.length && (value = arguments[i], is.unset(value) && (value = ""), $col.html(lng(value)).attr("langkey", value));
                    return this
                },
                cleanOptions: function() {
                    return this.getGrid().cleanTable(), this
                },
                cleanTable: function() {
                    return this.getGrid().cleanTable(), this
                },
                isEmpty: function() {
                    return !this.find("input").val().length
                },
                isDisabled: function() {
                    return this.find("input").attr("disabled")
                },
                flags: function() {
                    return this.data("flags")
                },
                clean: function() {
                    return this.fieldval(""), this
                },
                getGrid: function() {
                    return this.data("grid")
                }
            });
            var $grid = this.lightUIGrid(flags.header, 0, {
                combobox: {
                    type: flags.type,
                    index: flags.index,
                    blank: flags.blank,
                    flags: {
                        maxLength: flags.maxLength,
                        mandatory: flags.mandatory,
                        re: flags.re
                    }
                }
            });
            this.data("grid", $grid);
            var $obj = pluginComboGrid(this);
            this.data("light_ui_input", $obj);
            var optionArray = flags.optionArray;
            if (is.array(optionArray))
                for (var i = 0; i < optionArray.length; i++) {
                    var opt = optionArray[i];
                    is.array(opt) ? $obj.addOption.apply($obj, opt) : $obj.addOption(opt)
                }
            return $obj
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUITextComment = function(textComment, options) {
            var pattern = "<div class='title'><div class='name'><div></div></div></div>";
            return this.addClass("lightUI textComment"), this.html(pattern), this.find(".name>div").attr("langkey", textComment), plugin.fn.extend({
                setTextComment: function(textComment, options) {
                    return is.string(textComment) && this.find(".title>.name>div").html(lng(textComment)).attr("langkey", textComment), is.set(options) && options.icon && this.find(".title").css("background", options.icon), this
                }
            }), plugin(this).setTextComment(textComment, options)
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.storagePath = function(flags) {
            function checkUnfocus(event) {
                var $target = $(event.target),
                    storagePath = event.data.storagePath;
                storagePath.data("focusLock") || $target.closest(".storage-path").length || storagePath.trigger("unfocus.input")
            }
            var pluginInstance = this.data("storagePath");
            if (pluginInstance) return pluginInstance;
            pluginInstance = plugin(this), this.data("storagePath", pluginInstance), is.unset(flags) && (flags = {}), is.unset(flags.options) && (flags.options = {});
            var $input = this.html("<div class='storage-path'><div class='field'></div><button>...</button></div>").find(".field").lightUIText();
            return this.data("$input", $input), this.find("button").click(callback(this, function() {
                this.data("focusLock", !0), $("body").storagePathDialog({
                    title: "File browser",
                    buttons: [{
                        name: "Open",
                        handler: callback(this, function() {
                            var $input = this.data("$input"),
                                $dialog = $("body").storagePathDialog(),
                                path = $dialog.content().fileBrowser().getSelectedPath();
                            $input.fieldval(path.slice(5)), $dialog.close(), this.data("focusLock", !1)
                        })
                    }, {
                        name: "Cancel",
                        handler: callback(this, function() {
                            $("body").storagePathDialog().close(), this.data("focusLock", !1)
                        })
                    }]
                }).open(), $("body").storagePathDialog().content().fileBrowser({
                    onlyFolders: !0
                })
            })), $input.bind("unfocus.input", function(event) {
                event.stopImmediatePropagation()
            }), $(document).unbind("click", checkUnfocus).bind("click", {
                storagePath: pluginInstance
            }, checkUnfocus), plugin.fn.extend({
                validate: $input.validate,
                fieldval: $input.fieldval,
                isEmpty: $input.isEmpty,
                enable: $input.enable,
                disable: $input.disable,
                isDisabled: $input.isDisabled,
                flags: $input.flags,
                clean: $input.clean,
                show: $input.show,
                __show__: this.show
            }), pluginInstance
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.storagePathDialog = function(flags) {
            return is.unset(flags) && (flags = {}), is.unset(flags.options) && (flags.options = {}), plugin.fn.extend({
                open: function() {
                    var $overlay = $("body").lightUIOverlay().show().append("<div class='storage-path-dialog'>									<div class='header'></div>									<div class='content'></div>									<div class='footer'></div>								</div>");
                    $("body").data("$overlay", $overlay), "mobile2" != getCookie("viewmode") && $(".storage-path-dialog").css({
                        left: ($(window).width() - 640) / 2,
                        top: ($(window).height() - 480) / 2
                    });
                    var buttons = flags.buttons;
                    if (buttons)
                        for (var obj, $buttonBox = $(".storage-path-dialog>.footer"), i = 0; i < buttons.length; i++) obj = buttons[i], $("<button langkey='" + obj.name + "'>" + lng(obj.name) + "</button>").click(obj.handler).appendTo($buttonBox);
                    var title = flags.title;
                    return title && $(".storage-path-dialog>.header").html(title), this
                },
                close: function() {
                    return $(".storage-path-dialog").remove(), $("body").lightUIOverlay().hide(), this
                },
                content: function() {
                    return $(".storage-path-dialog>.content")
                }
            }), pluginInstance = plugin(this), this.data("storagePathDialog", pluginInstance), pluginInstance
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUIButton = function(name, options) {
            is.unset(options) && (options = {});
            var dop_class = "";
            window.buttonsDopStyle && ~window.buttonsDopStyle.indexOf(name) && (dop_class = "dop-class");
            var pattern = "<div class='button normal " + dop_class + " unselectable'>";
            return is.set(options.icon) && (pattern += "<div class='icon'>", pattern += "<img src='" + options.icon + "' />", pattern += "</div>"), pattern += "<div class='title' unselectable='on' langkey='" + name + "'>" + lng(name) + "</div>", pattern += "<div class='clear'></div>", pattern += "</div>", this.html(pattern), this.addClass("lightUI"), is.set(options.iconRightSide) && this.find(".icon").css("float", "right"), this.find(".button").mouseenter(function() {
                $(this).not(".disable").addClass("hover")
            }).mouseleave(function() {
                $(this).not(".disable").removeClass("hover")
            }).mousedown(function() {
                $(this).not(".disable").addClass("push")
            }).mouseup(function() {
                $(this).not(".disable").removeClass("push")
            }).click(function(event) {
                $(this).hasClass("disable") || ($(this).trigger("click.button"), $(this).trigger("button.click")), event.stopPropagation()
            }), plugin.fn.extend({
                enable: function() {
                    return this.find(".button").removeClass("disable").addClass("normal"), this
                },
                disable: function() {
                    return this.find(".button").removeClass("normal push").addClass("disable"), this
                },
                title: function(name) {
                    return is.string(name) ? (this.find(".title").text(lng(name)), this) : this.find(".title").text()
                },
                click: function() {
                    return this.find(".button").trigger("click"), this
                }
            }), plugin(this)
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUISection = function(name, comment) {
            var pattern = "<div class='title'><div class='name'><div></div></div><div class='comment' style='display: none'><div></div></div></div><div class='content'></div>";
            return this.addClass("lightUI section"), this.html(pattern), comment && this.find(".comment").show(), this.find(".name>div").attr("langkey", name), this.find(".comment>div").attr("langkey", comment), plugin.fn.extend({
                setName: function(name) {
                    return is.string(name) && this.find(".title>.name>div").html(lng(name)).attr("langkey", name), this
                },
                setComment: function(comment) {
                    return is.string(comment) && (this.find(".title>.comment>div").html(lng(comment)).attr("langkey", comment), this.find(".title>.comment").show()), this
                },
                setContent: function(content) {
                    return is.string(content) && this.find(".content").html(content), this
                }
            }), plugin(this).setName(name).setComment(comment)
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        plugin.fn.extend({
            addItem: function(name, html) {
                if (is.unset(html) && (html = ""), name.match(/^[0-9a-zA-Z]+$/)) var nameClass = "__iam__" + name;
                else {
                    var id = gID.get(),
                        nameClass = "__iam__" + id;
                    this.data("__iam__" + name, "__iam__" + id)
                }
                var isEmpty = !this.find("li:last").removeClass("last").length;
                return isEmpty ? (this.append("<ul><li>" + html + "</li></ul>"), this.is("li") ? (this.prepend("<div class='hitarea'></div>").addClass("collapsed").find(">ul").hide(), this.find(">.hitarea").bind("click", function(event) {
                    event.target == this && $(this).trigger("li.toggle")
                }), this.bind("li.toggle", function(event) {
                    event.stopPropagation(), $(this).lightUIList().toggleList()
                })) : this.addClass("expanded"), this.find("li:last").addClass("last").addClass(nameClass).data("options", this.data("options"))) : this.find("ul").append("<li>" + html + "</li>").find("li:last").addClass("last").addClass(nameClass).data("options", this.data("options")), this
            },
            childItem: function(name) {
                for (var nameClass, arr = name.split("/"), s = "", i = 0; i < arr.length; i++) nameClass = "__iam__" + arr[i], arr[i].match(/^[0-9a-zA-Z]+$/) || (nameClass = this.data("__iam__" + arr[i])), s += ">ul>li." + nameClass;
                return this.find(s).lightUIList()
            },
            parentItem: function() {
                return this.is("li") ? this.parents("ul").eq(0).parent().lightUIList() : $()
            },
            expandedItem: function() {
                return this.find(">ul>li.expanded").lightUIList()
            },
            collapsedItem: function() {
                return $parent.find(">ul>li.collapsed").lightUIList()
            },
            expandList: function() {
                var $parent = this.parentItem();
                return $parent.length && this.listOptions().unique && $parent.expandedItem().collapseList(), this.find(">ul").show(this.listOptions().speed), this.removeClass("collapsed").addClass("expanded"), this
            },
            collapseList: function() {
                return this.find(">ul").hide(this.listOptions().speed), this.removeClass("expanded").addClass("collapsed"), this
            },
            toggleList: function() {
                return this.hasClass("expanded") ? this.collapseList() : this.expandList(), this
            },
            listOptions: function(options) {
                if (is.set(options)) return this.data("options", options), this;
                var options = this.data("options");
                return options ? options : {}
            },
            cleanList: function() {
                return this.unbind("li.toggle"), this.find(".hitarea").remove(), this.find("ul").eq(0).remove(), this
            }
        }), jQuery.fn.lightUIList = function(options) {
            var pluginInstance = this.data("lightUIList");
            return pluginInstance ? pluginInstance : (this.is("li") || (this.addClass("lightUI list"), is.set(options) && this.data("options", options)), this.bind("click", function(event) {
                if (event.target == this) {
                    var event0 = jQuery.Event("li.click");
                    event0.collapseMenu = function() {
                        $(this.target).parents(".lightUI").eq(0).hide("fast")
                    }, event0.menuTarget = function() {
                        return $(this.target).parents(".lightUI").data("menuTarget")
                    }, $(this).trigger(event0)
                }
            }), pluginInstance = plugin(this), this.data("lightUIList", pluginInstance), pluginInstance)
        }, jQuery.fn.contextMenu = function(name) {
            var $list = this.data("contextMenu");
            if (!is.jquery($list) && is.unset(name)) {
                var id = "context_menu_" + gID.get();
                $("body").append("<div id='" + id + "'></div>"), $list = $("#" + id).lightUIList({
                    unique: !0
                }).addClass("context").hide(), $list.live("mouseleave", function(event) {
                    event.stopPropagation(), $(this).find(">li").lightUIList().collapseList()
                }).live("contextmenu", function(event) {
                    return event.preventDefault(), event.stopImmediatePropagation(), !1
                }).bind("click", function(event) {
                    event.stopPropagation()
                }).find("li").live("mouseenter", function(event) {
                    event.stopPropagation(), $(this).is(".collapsed") && $(this).lightUIList().expandList().find(">ul").css("left", $(this).parents("ul").eq(0).width() - 20 + "px")
                }).live("mouseleave", function() {
                    $(this).is(".expanded") && $(this).lightUIList().collapseList()
                }), this.bind("contextmenu", function(event) {
                    event.preventDefault(), event.stopImmediatePropagation();
                    var $menu = $(this).data("contextMenu");
                    return $menu.is(":hidden") ? ($menu.show("fast").offset({
                        top: event.pageY,
                        left: event.pageX
                    }).data("menuTarget", event.target), window.contextMenuActive = $menu) : ($menu.hide("fast"), window.contextMenuActive = null), !1
                }).data("contextMenu", $list), $("body").click(function() {
                    is.set(window.contextMenuActive) && (window.contextMenuActive.hide("fast"), window.contextMenuActive = null)
                }).bind("contextmenu", function() {
                    is.set(window.contextMenuActive) && (window.contextMenuActive.hide("fast"), window.contextMenuActive = null)
                })
            }
            else is.set(name) && ($list = is.jquery($list) ? $list.childItem(name) : $());
            return $list
        }
    }(),
    function() {
        var plugin = jQuery.sub();
        jQuery.fn.lightUIWizard = function(inx, n) {
            var addStep = function(arg) {
                    if (is.string(arg))
                        for (var arr = arg.split(" "), i = 0; i < arr.length; i++) this.append(pattern).find("div:last").addClass(nameClass + arr[i]);
                    else this.append(pattern);
                    return this
                },
                addFirstStep = function(arg) {
                    return addStep.call(this, arg), this.getActiveStep().length || this.switchStep("first"), this.addStep = addStep, this
                };
            plugin.fn.extend({
                addStep: addStep = function(arg) {
                    if (is.string(arg))
                        for (var arr = arg.split(" "), i = 0; i < arr.length; i++) this.append(pattern).find("div:last").addClass(nameClass + arr[i]);
                    else this.append(pattern);
                    return this.getActiveStep().length || this.switchStep("first"), this
                },
                switchStep: function(arg, effect) {
                    var $next, $cur = this.find(">div.active");
                    return "next" == arg ? $next = this.getStep("next") : "prev" == arg ? $next = this.getStep("prev") : "last" == arg || is.unset(arg) ? $next = this.getStep("last") : "first" == arg ? $next = this.getStep("first") : is.string(arg) ? $next = this.find("." + nameClass + arg) : is.number(arg) && ($next = this.find(">div").eq(arg)), is.jquery($next) && $next.length && (is.func(effect) ? effect.call(this, $cur, $next) : ($cur.hide().removeClass("active"), $next.show().addClass("active"))), this
                },
                removeStep: function(arg) {
                    return "next" == arg ? this.getStep("next").remove() : "prev" == arg ? this.getStep("prev").remove() : "last" == arg || is.unset(arg) ? this.getStep("last").remove() : "first" == arg ? this.getStep("first").remove() : is.string(arg) ? this.find("." + nameClass + arg).remove() : is.number(arg) && this.find(">div").eq(arg).remove(), this.find(">div").length || (this.addStep = addFirstStep), this
                },
                getStep: function(arg) {
                    if ("next" == arg) {
                        for (var $step = this.find(">div.active").next(); $step.hasClass("skiped");) $step = $step.next();
                        return $step
                    }
                    if ("prev" == arg) {
                        for (var $step = this.find(">div.active").prev(); $step.hasClass("skiped");) $step = $step.prev();
                        return $step
                    }
                    return "last" == arg || is.unset(arg) ? this.find(">div:not(.skiped):last") : "first" == arg ? this.find(">div:not(.skiped):first") : is.string(arg) ? this.find("." + nameClass + arg) : is.number(arg) ? this.find(">div").eq(arg) : $()
                },
                getStepIndex: function(arg) {
                    return this.getStep(arg).index()
                },
                getActiveIndex: function() {
                    return this.getActiveStep().index()
                },
                getActiveStep: function() {
                    return this.find(">div.active")
                },
                skipStepOn: function(arg) {
                    return this.getStep(arg).addClass("skiped").removeClass("active").hide(), this
                },
                skipStepOff: function(arg) {
                    return this.getStep(arg).removeClass("skiped"), this
                },
                isStepLast: function(arg) {
                    for (var $step = this.getStep(arg).next(); $step.hasClass("skiped");) $step = $step.next();
                    return !$step.length
                },
                isStepFirst: function(arg) {
                    for (var $step = this.getStep(arg).prev(); $step.hasClass("skiped");) $step = $step.prev();
                    return !$step.length
                }
            });
            var $plugin = plugin(this),
                pattern = "<div style='display: none'></div>",
                nameClass = "__iam__";
            if (is.number(n)) {
                var n0 = this.find(">div").length;
                if (n > n0)
                    for (var i = 0; n - n0 > i; i++) $plugin.addStep()
            }
            return is.set(inx) ? $plugin.switchStep(inx) : $plugin.getActiveStep().length || $plugin.switchStep("first"), $plugin
        }
    }(), node.extensions = {}, node.extendMethod = function(methodName, extName, extension) {
        var ext = node.extensions;
        is.object(ext[methodName]) || (ext[methodName] = {}), ext[methodName][extName] = extension
    }, node.extendMethod("deep", "updateModel", function(status) {
        var status = {
            error: !1,
            nodes: []
        };
        return this.self.deep("updateModel", "back", status), !status.error
    }), node.extendMethod("deep", "updateView", function($box) {
        return is.jquery($box) && (this.self.$outerBox = $box), this.self.deep("updateView", "both")
    }), extend(nodeInputBase, node), node.extendMethod("deep", "isModified", function(status) {
        var status = {
            modified: !1,
            nodes: []
        };
        return this.self.deep("isModified", "back", status), status.modified
    }), extend(nodeInput, nodeInputBase), extend(nodeip, nodeInput), extend(nodemac, nodeInput), extend(nodeDomainName, nodeInput), extend(nodetext, nodeInput), extend(nodestatic, nodeInput), extend(nodenum, nodeInput), extend(nodeport, nodeInput), extend(nodeportold, nodeInput),
    function() {
        return jQuery.fn.isModified = function() {
            for (var $obj = this.find("[rootnode]"), modified = !1, i = 0; i < $obj.length; i++)
                if ($obj.eq(i).data("rootNode").deep.isModified()) {
                    modified = !0;
                    break
                }
            return modified
        }, this
    }(), extend(nodeCheckBox, nodeInputBase), extend(nodeComboGrid, nodeInputBase), extend(nodeComboIP, nodeComboGrid), extend(nodeComboMAC, nodeComboGrid), extend(nodeComboHost, nodeComboGrid), extend(nodeComboText, nodeComboGrid), extend(nodeSelect, nodeInputBase), extend(nodemask, nodeSelect), extend(nodeTextArea, nodeInputBase), extend(nodeCaption, node), extend(nodeComment, node), extend(nodeUpload, node), extend(nodeRadioBox, nodeInputBase), extend(nodeOptionsBase, nodeInputBase), extend(nodeOptions, nodeOptionsBase), extend(nodeOptionsRadio, nodeOptionsBase), extend(nodeStepWizard, node), extend(nodeWizard, node), extend(nodeTrackbar, nodeInputBase), extend(nodeStoragePath, node);