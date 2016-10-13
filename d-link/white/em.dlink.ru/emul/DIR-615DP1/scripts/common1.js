function gridActionConverter(rm, ch, nw) {
    function extract_index($rows) {
        for (var temp = new Array, i = 0; i < $rows.length; i++) temp.push($rows.eq(i).irow());
        return temp
    }

    function real_index(value) {
        for (var offset = 0, i = 0; i < rm.length; i++) {
            var temp = rm[i];
            if (!(value > temp)) break;
            offset++
        }
        return value - offset
    }
    if (1 == arguments.length) {
        var grid = arguments[0];
        rm = grid.selection(), ch = grid.changedRows(), nw = grid.newRows()
    }
    rm = extract_index(rm), ch = extract_index(ch), nw = extract_index(nw);
    for (var temp_rm = new Array, i = 0; i < rm.length; i++) {
        var row = rm[i],
            index_ch = $.inArray(row, ch),
            index_nw = $.inArray(row, nw);
        index_ch > -1 && ch.splice(index_ch, 1), index_nw > -1 ? nw.splice(index_nw, 1) : temp_rm.push(row)
    }
    rm = temp_rm;
    for (var temp_ch = new Array, i = 0; i < ch.length; i++) {
        var row = ch[i]; - 1 == $.inArray(row, nw) && temp_ch.push(row)
    }
    ch = temp_ch;
    for (var real_ch = new Array, i = 0; i < ch.length; i++) real_ch.push(real_index(ch[i]));
    for (var real_nw = new Array, i = 0; i < nw.length; i++) real_nw.push(real_index(nw[i]));
    return {
        deleted: rm.sort().reverse(),
        changed: ch,
        added: nw,
        r_changed: real_ch,
        r_added: real_nw,
        count: rm.length + ch.length + nw.length
    }
}

function jsWindowController() {
    jsWindowController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsWindowClientView
    }
}

function jsWindowClientView(ctrl, viewInx, options) {
    jsWindowClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsWindowClientView.prototype.show = function() {
        rootCtrl.getChild("startInfo").event("stoprefreshrq");
        var win = $(this.myBoxSel);
        if ($(win).is(":hidden")) {
            var topOffset = $(win).parent().offset().top - $(win).parent().position().top,
                leftOffset = $(win).parent().offset().left - $(win).parent().position().left;
            $(win).css({
                left: $(window).width() / 2 - $(win).width() / 2 - leftOffset,
                top: $(window).height() / 2 - $(win).height() / 2 - topOffset
            }), this.showModalOverlay(), $(win).fadeIn("slow"), this.ctrl.event("showpopupdlg", this, !0)
        }
    }, jsWindowClientView.prototype.hide = function() {
        var win = $(this.myBoxSel);
        $(win).is(":visible") && ($(win).fadeOut("slow"), this.hideModalOverlay(), this.ctrl.event("hidepopupdlg", this, !0), "0" == $("#modalOverlayBox input").val() && $("#wrapperNavigator>a:eq(0)").hasClass("selected") && !$("#slideboard").is(":visible") && window.rootCtrl.getChild("startInfo").event("startrefreshrq"))
    }, this.bounce = function() {
        $(this.myBoxSel).animate({
            left: "-=24px"
        }, 100).animate({
            left: "+=48px"
        }, 100).animate({
            left: "-=40px"
        }, 100).animate({
            left: "+=32px"
        }, 100).animate({
            left: "-=16px"
        }, 100)
    }, jsWindowClientView.prototype.drawView = function() {
        var child, htmlToDraw = "",
            options = this.options,
            uid = getUID(),
            children = this.ctrl.children;
        this.myBoxSel = "#window" + uid, this.viewBoxSel = options.viewBoxSel, this.childBoxSel = this.myBoxSel + ">.windowContent", this.preloader = this.myBoxSel + ">.windowCaption>.windowPreloader", this.closer = this.myBoxSel + ">.windowCaption>.windowCloser", no(options.title.name) || (options.title = options.title.name), htmlToDraw = "<div class='window' id='window" + uid + "' style='display: none'>", htmlToDraw += "<div class='windowCaption unselectable'>", htmlToDraw += "<div class='windowTitle' unselectable='on'>" + lng(options.title) + "</div>", htmlToDraw += "<div class='windowPreloader' unselectable='on'><img src='' /></div>", htmlToDraw += "<div class='windowCloser' unselectable='on'><img src='image/closer.gif' /></div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "<div class='windowContent'>";
        for (var i = 0; i < children.length; i++) htmlToDraw += i != children.length - 1 && children.length > 1 ? '<div class="windowSpacer"></div>' : "<div></div>", child = this.getChild(i), child.options.viewBoxSel = this.childBoxSel + ">div:eq(" + i + ")", child.viewBoxSel = child.options.viewBoxSel;
        if (htmlToDraw += "</div>", htmlToDraw += "<div class='windowAction unselectable'></div>", htmlToDraw += "<div class='windowOverlay'></div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), no(options.notCloser) ? $(this.viewBoxSel + " .windowCloser>img").click(context(this).callback(function() {
                this.hide(), this.ctrl.event("dialogclosed", this, !0)
            })) : $(this.viewBoxSel + " .windowCloser>img").hide(), no(options.width) || $(this.viewBoxSel + " .windowContent").css("width", options.width), no(options.height) || $(this.viewBoxSel + " .windowContent").css("height", options.height), !no(options.buttons)) {
            options.action = [];
            for (var i = 0; i < options.buttons.length; i++) options.action.push({
                name: options.buttons[i].value,
                func: options.buttons[i].handler
            })
        }
        if (!no(options.action))
            for (var i = 0; i < options.action.length; i++) {
                var a = $("<a href='#' unselectable='on'>" + lng(options.action[i].name) + "</a>");
                $(this.myBoxSel + ">.windowAction").append($(a)), $(a).bind("click", context(this).callback(options.action[i].func))
            }
        var caption = $(this.myBoxSel + ">.windowCaption");
        $(caption).mousedown(context(this).callback(this.startWindowDrag)), $(caption).mouseup(context(this).callback(this.stopWindowDrag)), $("body").bind("mousemove", context(this).callback(this.moveWindow)), $("body").bind("mouseup", function() {
            $(caption).mouseup()
        }), $(this.preloader).bind("ajaxStart", function() {
            $(this).find(">img").attr("src", "image/preloader.gif"), $(this).show()
        }).bind("ajaxError", function() {
            $(this).find(">img").attr("src", "image/errormarker.gif"), $(this).show()
        }).bind("ajaxStop", function() {
            $(this).hide()
        }), $(this.closer).bind("ajaxStart", function() {
            $(this).hide()
        }).bind("ajaxError", function() {
            $(this).hide()
        }).bind("ajaxStop", function() {
            $(this).show()
        }), $(this.myBoxSel).bind("ajaxStart", function() {
            $(this).find(">.windowOverlay").fadeTo(200, .7)
        }).bind("ajaxStop", function() {
            $(this).find(">.windowOverlay").fadeTo(600, 0, function() {
                $(this).hide()
            })
        }), jsWindowClientView.superclass.drawView.call(this)
    }, this.getActionIndex = function(name) {
        for (var i = 0; i < options.action.length; i++)
            if (options.action[i].name == name) return i;
        return -1
    }, jsWindowClientView.prototype.hideAction = function(name) {
        var index = this.getActionIndex(name);
        index >= 0 && $(this.myBoxSel + ">.windowAction>a:eq(" + index + ")").hide()
    }, jsWindowClientView.prototype.showAction = function(name) {
        var index = this.getActionIndex(name);
        index >= 0 && $(this.myBoxSel + ">.windowAction>a:eq(" + index + ")").show()
    }, jsWindowClientView.prototype.disableAction = function(name) {
        var index = this.getActionIndex(name);
        index >= 0 && $(this.myBoxSel + ">.windowAction>a:eq(" + index + ")").addClass("disable").unbind("click")
    }, jsWindowClientView.prototype.enableAction = function(name) {
        var index = this.getActionIndex(name);
        index >= 0 && $(this.myBoxSel + ">.windowAction>a:eq(" + index + ")").removeClass("disable").bind("click", context(this).callback(options.action[index].func))
    }, jsWindowClientView.prototype.hideButton = this.hideAction, jsWindowClientView.prototype.showButton = this.showAction, jsWindowClientView.prototype.disableButton = this.disableAction, jsWindowClientView.prototype.enableButton = this.enableAction, this.startWindowDrag = function(e) {
        var zindex = 0;
        return $(".window").each(function() {
            $(this).css("z-index") > zindex && (zindex = $(this).css("z-index"))
        }), zindex++, $(this.myBoxSel).css("z-index", zindex), this.dragInfo.isDragging = !0, this.dragInfo.oldLeft = e.pageX - getPosX(this.myBoxSel), this.dragInfo.oldTop = e.pageY - getPosY(this.myBoxSel), $("body").css("cursor", "move"), !1
    }, this.moveWindow = function(e) {
        if (this.dragInfo.isDragging) {
            var x = e.pageX - getPosX(this.myBoxSel),
                y = e.pageY - getPosY(this.myBoxSel);
            return $(this.myBoxSel).css({
                left: getPosX(this.myBoxSel) + x - this.dragInfo.oldLeft,
                top: getPosY(this.myBoxSel) + y - this.dragInfo.oldTop
            }), !1
        }
    }, this.stopWindowDrag = function() {
        return this.dragInfo.isDragging = !1, $("body").css("cursor", "default"), !1
    }, this.dragInfo = {
        isDragging: !1,
        oldLeft: 0,
        oldTop: 0
    }, this.showModal = this.show, this.isWin = !0
}

function jsFieldSetController() {
    jsFieldSetController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsFieldSetClientView
    }, this.ifaceTypes.server = {
        type: jsSSideView
    }
}

function jsFieldSetClientView(ctrl, viewInx, options) {
    if (options) {
        var title = options.title,
            tabs = options.tabs,
            wizard = options.wizard,
            buttons = options.buttons;
        options.title = "", options.tabs = !1, options.wizard = !1, options.buttons = null
    }
    jsFieldSetClientView.superclass.constructor.call(this, ctrl, viewInx, options), options && (this.options.title = title, this.options.tabs = tabs, this.options.wizard = wizard, this.options.buttons = buttons), jsFieldSetClientView.prototype.drawView = function() {
        var childCtrls = this.ctrl.children,
            options = this.options,
            title = options.title ? options.title : "&nbsp;",
            obj = null,
            htmlToDraw = "";
        options.slider && (htmlToDraw += options.nocollapse ? "<div class='fieldSetSlider fieldSetSliderNoCollapse'>" : options.collapsed ? "<div class='fieldSetSlider fieldSetSliderCollapsed'>" : "<div class='fieldSetSlider fieldSetSliderExpanded'>", htmlToDraw += "<div>", options.title && (htmlToDraw += lng(options.title)), htmlToDraw += "</div></div>", htmlToDraw += options.descClass ? "<div class='" + options.descClass + "'>" : "<div class='fieldSetSliderBottom'>", htmlToDraw += "<div>", options.descText && (htmlToDraw += lng(options.descText)), htmlToDraw += "</div></div>"), options.slider || options.nothing ? (htmlToDraw += options.slider && options.collapsed && !options.nocollapse ? "<div style='display:none'></div>" : "<div></div><div class='buttonsInline'></div>", $(this.viewBoxSel).html(htmlToDraw), options.slider ? this.childBoxSel = this.viewBoxSel + ">div:eq(2)" : (this.childBoxSel = this.viewBoxSel + ">div:eq(0)", options.buttonsInline && (this.buttonBarSel = this.viewBoxSel + ">div.buttonsInline")), this.options.childBoxSel = this.childBoxSel, options.slider && !options.nocollapse && $(this.viewBoxSel + ">div.fieldSetSlider").bind("click", context(this).callback(this.toggleSlider))) : options.simple ? (htmlToDraw += "<div><fieldset></fieldset><div class='buttonsInline'></div></div>", $(this.viewBoxSel).html(htmlToDraw), this.childBoxSel = this.viewBoxSel + ">div>fieldset", this.options.childBoxSel = this.childBoxSel, options.buttonsInline && (this.buttonBarSel = this.viewBoxSel + ">div>div.buttonsInline")) : (title = options.title ? "link" == options.title.type ? "<font class='fieldSetTitleLink'>" + lng(options.title.name) + "</font>" : "<font class='fieldSetTitleText'>" + lng(options.title.name) + "</font>" : "&nbsp;", htmlToDraw = "<div class='fieldSetMainPath'><div style='display: inline; vertical-align: middle;'></div><div style='margin-left: 4px; display: inline;'>" + title + "</div></div><div class='fieldSetMainContentContainer'>", htmlToDraw += "<div class='fieldSetMainContent'><div class='fieldSetGeneral' style='display: block;'></div></div></div><div class='buttonsInline'></div>", $(this.viewBoxSel).html(htmlToDraw), options.title && "link" == options.title.type && $(this.viewBoxSel + ">div.fieldSetMainPath>div>font").bind("click", {}, context(this).callback(options.title.handler)), this.childBoxSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent>div.fieldSetGeneral", this.options.childBoxSel = this.childBoxSel, options.buttonsInline && (this.buttonBarSel = this.viewBoxSel + ">div.buttonsInline")), options.wizard && childCtrls.length > 1 && this.switchChild(this.activeTab), childCtrls.length && $(this.childBoxSel).html("");
        var htmlToAppend = "",
            j = 0;
        if (childCtrls.length > 1) {
            for (var i in childCtrls) htmlToAppend += "<div class='marginTop3'></div>", obj = this.getChild(i), obj instanceof jsCSideView && (options.tabs || options.pages || options.wizard ? obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j + ")" : (htmlToAppend += "<div class='fieldSetSpacer'></div>", obj.viewBoxSel = this.childBoxSel + ">div:eq(" + 2 * j + ")"), obj.options.viewBoxSel = obj.viewBoxSel, no(obj.options.buttonsInline) && (obj.options.buttonsInline = options.buttons ? options.buttons.length > 0 : !0), j++);
            if (options.tabs || options.pages || options.wizard) {
                for (var i = 0; i < this.ctrl.children.length; i++) obj = this.getChild(i), obj instanceof jsCSideView && (obj.options.hide = !0);
                this.getChild(this.activeTab).options.hide = !1
            }
            $(this.childBoxSel).append(htmlToAppend)
        }
        else childCtrls.length && (obj = this.getChild(0), obj instanceof jsCSideView && (obj.viewBoxSel = this.childBoxSel, obj.options.viewBoxSel = obj.viewBoxSel));
        this.drawTabBar(), this.drawButtons(), this.drawPageBar(), jsFieldSetClientView.superclass.drawView.call(this)
    }, this.toggleSlider = function(time) {
        var options = this.options,
            obj = $(options.viewBoxSel + ">div.fieldSetSlider");
        return time || (time = "slow"), options.collapsed ? (obj.removeClass("fieldSetSliderCollapsed"), obj.addClass("fieldSetSliderExpanded"), $(options.childBoxSel).slideDown(time), options.collapsed = !1) : (obj.removeClass("fieldSetSliderExpanded"), obj.addClass("fieldSetSliderCollapsed"), $(options.childBoxSel).slideUp(time), options.collapsed = !0), !1
    }, jsFieldSetClientView.prototype.hideButton = function(name) {
        this.buttons && name in this.buttons && $(this.buttons[name].sel).css("display", "none")
    }, jsFieldSetClientView.prototype.showButton = function(name) {
        this.buttons && name in this.buttons && $(this.buttons[name].sel).css("display", "")
    }, jsFieldSetClientView.prototype.disableButton = function(name) {
        this.buttons && name in this.buttons && ($(this.buttons[name].sel).removeClass("normal push").addClass("disable"), this.unsetButtonClick(name))
    }, jsFieldSetClientView.prototype.enableButton = function(name) {
        this.buttons && name in this.buttons && ($(this.buttons[name].sel).removeClass("disable").addClass("normal"), this.unsetButtonClick(name), this.setButtonClick(name))
    }, jsFieldSetClientView.prototype.updateButtons = function() {
        this.options.buttons && this.drawButtons()
    }, jsFieldSetClientView.prototype.showTab = function(tabInx) {
        $(this.tabBarSel + ">.pageTab:eq(" + tabInx + ")").addClass("active"), this.getChild(tabInx).show(), this.getChild(tabInx) instanceof jsFieldSetClientView && (this.getChild(tabInx).drawButtons(), this.getChild(tabInx).drawPageBar())
    }, jsFieldSetClientView.prototype.hideTab = function(tabInx) {
        $(this.tabBarSel + ">.pageTab:eq(" + tabInx + ")").removeClass("active"), this.getChild(tabInx).hide()
    }, jsFieldSetClientView.prototype.switchTab = function(tabInx) {
        this.activeTab != tabInx && (this.hideTab(this.activeTab), this.showTab(tabInx), this.activeTab = tabInx)
    }, jsFieldSetClientView.prototype.switchPage = function(pageInx) {
        $(this.pageBarSel + ">.pageLink:eq(" + this.activeTab + ")").removeClass("active"), $(this.pageBarSel + ">.pageLink:eq(" + pageInx + ")").addClass("active"), this.switchChild(pageInx)
    }, jsFieldSetClientView.prototype.switchChild = function(childId) {
        this.getChild(this.activeTab).hide();
        var child = this.getChild(childId);
        child.show(), this.activeTab = child.ctrl.thisInx
    }, jsFieldSetClientView.prototype.drawTabBar = function() {
        var children = this.ctrl.children,
            options = this.options,
            htmlToDraw = "";
        if (!options.ishidden && this.isPage()) {
            if (options.tabs && children.length > 1) {
                $("#pageTitle>.pageTitle>span").show();
                for (var i = 0; i < children.length; i++) htmlToDraw += "<div class='pageTab'><a href='#' langkey=\"" + this.getChild(i).options.title + '">' + lng(this.getChild(i).options.title) + "</a></div>"
            }
            else {
                if (no(options.pageTitle)) return;
                htmlToDraw += "<div class='pageTab'><a href='#' langkey=\"" + options.pageTitle + '">' + lng(options.pageTitle) + "</a></div>"
            }
            htmlToDraw += "<div class='clear'></div>", $(this.tabBarSel).html(htmlToDraw), $(this.tabBarSel).find(">.pageTab:eq(" + this.activeTab + ")").addClass("active"), this.setTabClicks()
        }
    }, jsFieldSetClientView.prototype.drawPageBar = function() {
        var children = this.ctrl.children,
            options = this.options,
            htmlToDraw = "";
        if (!options.ishidden)
            if (options.pages) {
                $("#pageGeneral").addClass("frameStyle"), $("#pageScrollShadowTop").hide(), $("#pageScrollShadowBottom").hide();
                for (var i = 0; i < children.length; i++) htmlToDraw += "<a href='#' class='pageLink'>", htmlToDraw += "<img src='image/coner_master.png' />", htmlToDraw += "<span>" + (i + 1) + "</span>", htmlToDraw += "</a>";
                $(this.pageBarSel).html(htmlToDraw), this.setPageClicks(), this.switchPage(this.activeTab)
            }
            else {
                $("#pageGeneral").removeClass("frameStyle"), $("#pageScrollShadowTop").show(), $("#pageScrollShadowBottom").show(), $(this.pageBarSel).html("");
                for (var obj, i = 0; i < children.length; i++) obj = this.getChild(i), obj instanceof jsFieldSetClientView && obj.drawPageBar()
            }
    }, this.drawButtons = function() {
        var button, options = (this.ctrl.children, this.options),
            htmlToDraw = "",
            dop_class = "";
        if ((!options.ishidden && !options.hide || options.buttonsInline) && options.buttons && options.buttons.length > 0) {
            for (var i = 0; i < options.buttons.length; i++) button = options.buttons[i], button && (dop_class = "", window.buttonsDopStyle && ~window.buttonsDopStyle.indexOf(button.name) && (dop_class = "dop-class"), htmlToDraw += "<div class='buttoner normal " + dop_class + " unselectable' style='margin: 7px 0 0 8px;'>", htmlToDraw += "<input name='" + button.name + "' value='" + lng(button.value) + "' type='hidden'>", htmlToDraw += "<div class='title' unselectable='on'>" + lng(button.value) + "</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>");
            $(this.buttonBarSel).html(htmlToDraw), $(this.buttonBarSel + ">.buttoner").mouseenter(function() {
                $(this).not(".disable").addClass("hover")
            }).mouseleave(function() {
                $(this).not(".disable").removeClass("hover")
            }).mousedown(function() {
                $(this).not(".disable").addClass("push")
            }).mouseup(function() {
                $(this).not(".disable").removeClass("push")
            }), this.setButtonClicks()
        }
    }, this.cleanButtons = function() {
        $(this.buttonBarSel).html("")
    }, jsFieldSetClientView.prototype.ontabclick = function(event) {
        for (var i = 0; i < this.ctrl.children.length; i++) {
            var tab = this.getChild(i);
            tab instanceof jsCSideView && (no(tab.ctrl.activeRecordInx) || (tab.ctrl.activeRecordInx = -1), tab.constructor(tab.ctrl, tab.viewInx, tab.options), tab.drawView(), tab.ctrl.event("updaterq"))
        }
        return this.switchTab(event.data.tabInx), !1
    }, jsFieldSetClientView.prototype.onpageclick = function(event) {
        return this.switchPage(event.data.pageInx), !1
    }, jsFieldSetClientView.prototype.setTabClicks = function() {
        var ontabclick = context(this).callback(this.ontabclick);
        $(this.tabBarSel + ">.pageTab").each(function(index) {
            $(this).bind("click", {
                tabInx: index
            }, ontabclick)
        })
    }, jsFieldSetClientView.prototype.setPageClicks = function() {
        for (var i = 0; i < this.ctrl.children.length; i++) $(this.pageBarSel + ">.pageLink:eq(" + i + ")").bind("click", {
            pageInx: i
        }, context(this).callback(this.onpageclick))
    }, jsFieldSetClientView.prototype.setButtonClicks = function() {
        var options = this.options;
        if (options.buttons && options.buttons.length > 0) {
            var buttonSel;
            this.buttons = {};
            for (var i = 0; i < options.buttons.length; i++) {
                var button = options.buttons[i];
                button && (buttonSel = this.buttonBarSel + ">.buttoner:eq(" + i + ")", this.buttons[button.name] = {
                    sel: buttonSel,
                    handler: button.handler
                }, $(buttonSel).bind("click", {}, context(this).callback(button.handler)))
            }
        }
    }, jsFieldSetClientView.prototype.setButtonClick = function(name) {
        this.buttons && $(this.buttons[name].sel).bind("click", {}, context(this).callback(this.buttons[name].handler))
    }, jsFieldSetClientView.prototype.unsetButtonClick = function(name) {
        this.buttons && $(this.buttons[name].sel).unbind("click")
    }, jsFieldSetClientView.prototype.onerrstat = function() {
        var options = this.options;
        return options.slider && options.collapsed && this.toggleSlider(), !0
    }, jsFieldSetClientView.prototype.isPage = function() {
        return !(this.getParent() instanceof jsFieldSetClientView)
    }, this.activeTab = this.options.activeTab ? this.options.activeTab : 0, this.tabBarSel = "#pageTabs", this.pageBarSel = "#pageToolbarMisc", this.buttonBarSel = this.options.buttonBarSel ? this.options.buttonBarSel : "#pageToolbarButtons", this.bind("errstat", this.onerrstat)
}

function js3GSettingsModel(ifnode, service) {
    js3GSettingsModel.superclass.constructor.call(this), this.ifnode = ifnode, this.service = service
}

function js3GSettingsController(ifnode, isadding, service) {
    js3GSettingsController.superclass.constructor.call(this), this.changeModel(new js3GSettingsModel(ifnode, service)), this.ifaceTypes.client = {
        type: js3GSettingsClientView
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: js3GSettingsClientView
    }, this.ifaceTypes.summary.options = {}, this.addChild(new jsInputController(ifnode.mode), "mode"), this.addChild(new jsInputController(service.apn), "apn"), this.addChild(new jsInputController(service.login && "" != service.login || service.password && "" != service.password), "manLteLoginPass");
    var divLogin = this.addChild(new jsFieldSetController, "divLogin");
    divLogin.addChild(new jsInputController(service.login), "lteLogin"), divLogin.addChild(new jsInputController(service.password), "ltePass")
}

function js3GSettingsClientView(ctrl, viewInx, options) {
    function getBitField(n) {
        for (var f = Number(n).toString(2), n = f.length, i = 0; 8 - n > i; i++) f = "0" + f;
        return f
    }

    function checkField(i, n) {
        var f = getBitField(i);
        return "1" == f[8 - n] ? !0 : !1
    }
    options = options ? options : {}, this.saveUSBSettings = function() {
        var box = this,
            service = {},
            manLogin = box.getChild("manLteLoginPass").ctrl.model.value,
            divLogin = box.getChild("divLogin");
        return service.apn = box.getChild("apn").ctrl.model.value, manLogin ? (service.login = divLogin.getChild("lteLogin").ctrl.model.value, service.password = divLogin.getChild("ltePass").ctrl.model.value) : (service.login = "", service.password = ""), service
    }, this.updateModel = function() {
        var res = js3GSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var ifnode = this.ctrl.model.ifnode;
            ifnode.mode = this.getChild("mode").ctrl.model.toString();
            var service = this.ctrl.model.service;
            if ("lte" == ifnode.type || "lte" == ifnode.contype) $.extend(!0, service, this.saveUSBSettings()), "" == service.apn && (service = _.omit(service, "apn")), "" == service.login && (service = _.omit(service, "login")), "" == service.password && (service = _.omit(service, "password"));
            else {
                var apnVal = this.getChild("apn").ctrl.model.toString();
                "" != apnVal && (service.apn = apnVal)
            }
        }
        for (var serv in this.ctrl.model.ifnode.services) $.extend(!0, this.ctrl.model.ifnode.services[serv], service);
        return res
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias,
            divlogin = this.getChild("divLogin");
        switch (alias) {
            case "manLteLoginPass":
                obj.value ? divlogin.show() : divlogin.hide()
        }
    }, this.onmodeswitch = function() {
        return this.options.brief ? this.hide() : this.show(), !1
    };
    var obj, ifnode = ctrl.model.ifnode;
    obj = ctrl.getChild("apn"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "APN",
        optional: !0,
        hide: !("lte" == ifnode.contype || "lte" == ifnode.type || ifnode.dongle_type && 2 == ifnode.dongle_type)
    }, obj = ctrl.getChild("manLteLoginPass"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanSetUserNamePassw",
        optional: !0,
        valset: {
            on: !0,
            off: !1
        },
        hide: !("lte" == ifnode.contype || "lte" == ifnode.type || ifnode.dongle_type && 2 == ifnode.dongle_type)
    }, manLteLoginPass = obj.model.value;
    var divLogin = ctrl.getChild("divLogin");
    if (divLogin.nextIface = "client", divLogin.ifaceTypes.client.options = {
            nothing: !0
        }, divLogin.ifaceTypes.client.options.hide = !manLteLoginPass, obj = divLogin.getChild("lteLogin"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
            humanName: "wanUserName",
            optional: !0,
            hide: !("lte" == ifnode.contype || "lte" == ifnode.type || ifnode.dongle_type && 2 == ifnode.dongle_type)
        }, obj = divLogin.getChild("ltePass"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
            humanName: "wanPassword",
            optional: !0,
            hide: !("lte" == ifnode.contype || "lte" == ifnode.type || ifnode.dongle_type && 2 == ifnode.dongle_type)
        }, obj = ctrl.getChild("mode"), obj.nextIface = "select", "3g" == ifnode.type) obj.ifaceTypes.select.options = {
        humanName: "g3_actual_mode",
        valset: {
            auto: "32",
            "3g": "3",
            "2g": "2"
        }
    };
    else if ("usb" == ifnode.type) {
        var modes = {},
            available_modes = ifnode.available_modes,
            all_modes = [
                ["Auto", "0x000"],
                ["2G only", "0x001"],
                ["3G only", "0x002"],
                ["LTE only", "0x004"],
                ["Auto 2G->3G", "0x008"],
                ["Auto 3G->2G", "0x010"],
                ["Auto 2G->3G->LTE", "0x020"],
                ["Auto 3G->LTE", "0x080"],
                ["Auto LTE->3G", "0x100"]
            ];
        modes.Auto = "0x000";
        for (var i = 0; 7 >= i; i++) checkField(available_modes, i + 1) && (modes[all_modes[i][0]] = all_modes[i][1]);
        obj.ifaceTypes.select.options = {
            humanName: "g3_actual_mode",
            valset: modes
        }, obj.model.value = ifnode.mode
    }
    else obj.ifaceTypes.select.options = {
        humanName: "g3_actual_mode",
        valset: {
            auto: "0",
            "4g": "4",
            "3g": "3",
            "2g": "2"
        }
    };
    js3GSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), this.bind("modeswitch", this.onmodeswitch), ifnode.wizard ? (options.nothing = !0, options.hide = this.options.brief) : (options.slider = !0, options.title = "menu_usbmodem", options.collapsed = !1, options.nocollapse = !0)
}

function pageActiveSessions() {
    pageActiveSessions.superclass.constructor.call(this), this.refreshTime = 1e4, this.rqId = -1, this.firstStart = !0, this.refreshId = null, this.$grid = null, this.activeSessions = null, this.add(new nodeCaption("routingLabel", "routingDescText")).add(new node, "grid"), this.updateView = function(phase) {
        if (pageActiveSessions.superclass.updateView.apply(this, arguments), "back" == phase) {
            if (this.$grid = this.$box.html("			<div class='grid'></div>				").find(".grid").lightUIGrid([{
                    index: "protocol",
                    name: "protocol"
                }, {
                    index: "source_ip",
                    name: "activeSessionsSourceIp"
                }, {
                    index: "source_port",
                    name: "activeSessionsSourcePort"
                }, {
                    index: "dest_ip",
                    name: "activeSessionsDestIp"
                }, {
                    index: "dest_port",
                    name: "activeSessionsDestPort"
                }], 0), this.activeSessions)
                for (var session, i = 0; i < this.activeSessions.length; i++) {
                    var session = this.activeSessions[i],
                        tcp = session.protocols.tcp,
                        udp = session.protocols.udp;
                    if (tcp)
                        for (var j = 0; j < tcp.length; j++) {
                            var $row = this.$grid.addRow().row("last");
                            $row.col("protocol").html("TCP"), $row.col("source_ip").html(session.source_ip), $row.col("source_port").html(tcp[j].source_port), $row.col("dest_ip").html(tcp[j].dest_ip), $row.col("dest_port").html(tcp[j].dest_port)
                        }
                    if (udp)
                        for (var j = 0; j < udp.length; j++) {
                            var $row = this.$grid.addRow().row("last");
                            $row.col("protocol").html("UDP"), $row.col("source_ip").html(session.source_ip), $row.col("source_port").html(udp[j].source_port), $row.col("dest_ip").html(udp[j].dest_ip), $row.col("dest_port").html(udp[j].dest_port)
                        }
                }
            this.cleanButtonBar().addButton("refresh").getButton("refresh").bind("click.button", callback(this, function() {
                this.update()
            }))
        }
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.update = function() {
        this.firstStart && rootView.showModalOverlay(), this.rqId = device.config.read(180, callback(this, function(data) {
            this.activeSessions = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay(), this.firstStart = !1
        })), this.firstStart = !1
    }, this.bind("updaterq", function() {
        this.startRefresh(0)
    })
}

function jsSubNetAddrWithLANController(bits, addr, radix, delim, expandZero, omitFullMask) {
    jsSubNetAddrWithLANController.superclass.constructor.call(this, bits, addr, radix, delim, expandZero, omitFullMask), this.getChild("field").ifaceTypes.client = {
        type: jsSubNetAddrWithLANClientView,
        options: {}
    }
}

function jsSubNetAddrWithLANClientView(ctrl, viewInx, options) {
    jsSubNetAddrWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSubNetAddrWithLANClientView.prototype.drawView = function() {
        jsSubNetAddrWithLANClientView.superclass.drawView.call(this);
        var htmlToDraw, options = this.options,
            lanValset = options.lanValset;
        if (lanValset) {
            var elemID = this.$input.attr("id");
            htmlToDraw = "<select id='lanCli" + elemID + "' ><option value='0' >&lt;" + lng("statLanClientsSel") + "&gt;</option>";
            for (var i in lanValset)(128 == this.ctrl.model.bits && lanValset[i].match(/:/) || 32 == this.ctrl.model.bits && !lanValset[i].match(/:/)) && (htmlToDraw += "<option value='" + lanValset[i] + "' >" + i + "</option>");
            htmlToDraw += "</select>", this.$input.after(htmlToDraw), options.disabled && this.disable();
            var addition = "";
            this.ctrl instanceof jsSubNetIPWithLANController && 8 != this.partCount && (addition = "/32"), $("#lanCli" + elemID).bind("change", function() {
                var value = $(this).val();
                "0" != value && $("#" + elemID).val(value + addition).trigger("change")
            })
        }
    }, this.disenList = function() {
        128 == this.ctrl.model.bits ? $(this.options.viewBoxSel + " select").attr("disabled", !0) : $(this.options.viewBoxSel + " select").attr("disabled", !1)
    }
}

function jsMACWithLANClientView(ctrl, viewInx, options) {
    jsMACWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsMACWithLANClientView.prototype.drawView = function() {
        jsMACWithLANClientView.superclass.drawView.call(this);
        var htmlToDraw, options = this.options,
            lanValset = options.lanValset;
        if (lanValset) {
            var elemID = this.$input.attr("id");
            htmlToDraw = "<select id='lanCli" + elemID + "' ><option value='0' >&lt;" + lng("statLanClientsSel") + "&gt;</option>";
            for (var i in lanValset)(4 == this.partCount && -1 != lanValset[i].search(/\./) || 4 != this.partCount && -1 != lanValset[i].search(/:/)) && (htmlToDraw += "<option value='" + lanValset[i] + "' >" + i + "</option>");
            htmlToDraw += "</select>", this.$input.after(htmlToDraw), options.disabled && this.disable();
            var addition = "";
            this.ctrl instanceof jsSubNetIPWithLANController && 8 != this.partCount && (addition = "/32"), $("#lanCli" + elemID).bind("change", function() {
                var value = $(this).val();
                "0" != value && $("#" + elemID).val(value + addition).trigger("change")
            })
        }
    }
}

function jsNetAddrWithLANController(bits, addr, radix, delim, expandZero) {
    jsNetAddrWithLANController.superclass.constructor.call(this, bits, addr, radix, delim, expandZero), this.getChild("field").ifaceTypes.client = {
        type: jsSubNetAddrWithLANClientView,
        options: {}
    }
}

function jsSubNetIPWithLANController(addr, version, omitFullMask) {
    jsSubNetIPWithLANController.superclass.constructor.call(this, addr, version, omitFullMask), this.getChild("field").ifaceTypes.client = {
        type: jsSubNetIPWithLANClientView,
        options: {}
    }
}

function jsSubNetIPWithLANClientView(ctrl, viewInx, options) {
    jsSubNetIPWithLANClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSubNetIPWithLANClientView.prototype.validate = function() {
        this.statusCode = null;
        var arr, value = this.$input.attr("value");
        if (this.options.ishidden || this.options.disabled) return jsSubNetAddrWithLANClientView.superclass.validate.call(this);
        if (value.match(/^$/)) return this.statusCode = "netAddrEmpty", jsSubNetAddrWithLANClientView.superclass.validate.call(this);
        if (128 == this.ctrl.model.bits) {
            if (this.ctrl.model.partBitCount = 16, value.match(/::/)) {
                if (!(value.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/) || (value.match(/^\s*$/) && (this.statusCode = "netAddrEmpty"), value.match(/^::$/) || value.match(/^::[0:]*$/) || value.match(/^[0:]*::$/)))) {
                    var parts = this.ctrl.model.parseShortNotation(value);
                    if ((no(parts[0]) || no(parts[1]) || no(parts[2]) || no(parts[3]) || no(parts[4]) || no(parts[5]) || no(parts[6]) || no(parts[7])) && (this.statusCode = "netAddrInvalid"), !this.statusCode) {
                        var arr = value.split("/");
                        arr instanceof Array && arr[1] && (this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10), this.statusCode && (this.statusCode = "netAddr" + this.statusCode))
                    }
                }
                return jsSubNetAddrWithLANClientView.superclass.validate.call(this)
            }
            return arr = value.split(":"), 8 == arr.length ? jsSubNetIPWithLANClientView.superclass.validate.call(this) : (this.statusCode = "netAddrInvalid", jsSubNetAddrWithLANClientView.superclass.validate.call(this))
        }
        return this.ctrl.model.partBitCount = 8, arr = value.split("."), 4 == arr.length ? jsSubNetIPWithLANClientView.superclass.validate.call(this) : (this.statusCode = "netAddrInvalid", jsSubNetAddrWithLANClientView.superclass.validate.call(this))
    }
}

function jsSubNetIPv4WithLANController(addr) {
    jsSubNetIPv4WithLANController.superclass.constructor.call(this, addr, 4)
}

function jsSubNetIPv6WithLANController(addr) {
    jsSubNetIPv6WithLANController.superclass.constructor.call(this, addr, 6)
}

function jsIPWithLANController(addr, version, subIPController) {
    jsIPWithLANController.superclass.constructor.call(this, addr, version, subIPController), this.getChild("field").ifaceTypes.client = {
        type: jsSubNetIPWithLANClientView,
        options: {}
    }
}

function jsIPv4WithLANController(addr) {
    jsIPv4WithLANController.superclass.constructor.call(this, addr, 4)
}

function jsIPv6WithLANController(addr) {
    jsIPv6WithLANController.superclass.constructor.call(this, addr, 6)
}

function jsMACWithLANController(addr) {
    addr || (addr = [null, null, null, null, null, null]), jsMACWithLANController.superclass.constructor.call(this, 48, addr, 16, ":", !0), this.getChild("field").ifaceTypes.client = {
        type: jsMACWithLANClientView,
        options: {
            delim: ":",
            radix: 16
        }
    }
}

function makeLANClientsValset(lanClients, field, additField) {
    var valset = null;
    if (lanClients && lanClients.length) {
        valset = {};
        var additionText = "";
        for (var i in lanClients) additionText = "", lanClients[i].hostname && (additionText = lanClients[i].hostname), additField && ("" != additionText && (additionText += ", "), additionText += lanClients[i][additField]), "" != additionText && (additionText = " (" + additionText + ")"), valset[lanClients[i][field] + additionText] = lanClients[i][field]
    }
    return valset
}

function jsComboModel(addr) {
    jsComboModel.superclass.constructor.call(this.addr), this.setParts = function(addr) {
        this.value = addr
    }, this.setParts(addr)
}

function jsMACComboController(addr, LANClients, clone, devicemac) {
    jsMACComboController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsMACComboView,
        options: {}
    }, this.LANClients = LANClients, this.clone = clone, this.devicemac = devicemac, this.changeModel(new jsComboModel(addr))
}

function jsComboView(ctrl, viewInx, options) {
    jsComboView.superclass.constructor.call(this, ctrl, viewInx, options), this.val = function(value) {
        return is.set(value) && this.pluginCombo.fieldval(value), this.pluginCombo.fieldval()
    }, this.disable = function() {
        this.pluginEdit.disable()
    }, this.enable = function() {
        this.pluginEdit.enable()
    }, this.setError = function(statusCode) {
        this.pluginEdit.setError(statusCode)
    }, this.cleanError = function() {
        this.pluginEdit.cleanError()
    }, this.setMandatory = function() {
        this.pluginCombo.flags.mandatory = !0
    }, this.clearMandatory = function() {
        this.pluginCombo.flags.mandatory = !1
    }, this.updateModel = function() {
        return this.statusCode = this.pluginCombo.validate(), is.unset(this.statusCode) ? (this.ctrl.model.value = this.val(), !0) : (this.pluginEdit.setError(this.statusCode), !1)
    }, this.updateView = function() {
        this.val(this.ctrl.model.value)
    }, this.onfieldchangejq = function(event) {
        return this.ctrl.modified = !0, this.ctrl.event("fieldchange", {
            view: this,
            value: this.val()
        }, !0), event.stopPropagation(), !0
    }, jsComboView.prototype.bindEvents = function() {
        this.options, this.pluginCombo.bind("unfocus.input enter.input tab.input", context(this).callback(function(event) {
            return this.pluginEdit.cleanError(), this.ctrl.modified = !0, this.ctrl.event("fieldchange", {
                view: this,
                value: this.val()
            }, !0), event.stopPropagation(), !0
        })), this.pluginCombo.bind("onfocus.input", context(this).callback(function() {
            this.cleanError()
        })), this.pluginCombo.bind("error.input", context(this).callback(function(event, errorCode) {
            if (this.pluginCombo.is(":hidden") && this.getParent() instanceof jsFieldSetClientView && this.getParent().options && this.getParent().options.collapsed && this.getParent().toggleSlider(0), isInputIntoView(this.pluginCombo)) {
                this.pluginCombo.find(".select").css("height", this.pluginCombo.find(".field").parent().height());
                var $input = this.pluginCombo.find("input"),
                    $arrow = this.pluginCombo.find(".arrow"),
                    $icon = this.pluginCombo.find(".icon"),
                    $iconReset = this.pluginCombo.find(".iconReset"),
                    arrowLeft = $arrow.css("left"),
                    iconLeft = $icon.css("left");
                $arrow.css({
                    left: $input.width() + 4,
                    position: "absolute"
                }), $icon.css({
                    left: $input.width() + 30,
                    position: "absolute"
                }), $iconReset.css({
                    left: $input.width() + 30,
                    position: "absolute"
                }), $input.css({
                    left: $input.position().left,
                    top: $input.position().top,
                    position: "absolute"
                }).effect("bounce", {
                    times: 3,
                    direction: "left",
                    distance: 8
                }, 300, context(this).callback(function() {
                    $arrow.css({
                        left: arrowLeft,
                        position: "relative"
                    }), $icon.css({
                        left: iconLeft,
                        position: "relative"
                    }), $iconReset.css({
                        left: iconLeft,
                        position: "relative"
                    }), $input.css({
                        left: "",
                        top: "",
                        position: "static"
                    }), this.pluginEdit.setError(errorCode)
                }))
            }
            else scrollToVisible(this.pluginCombo), this.pluginEdit.setError(errorCode)
        }))
    }
}

function jsMACComboView(ctrl, viewInx, options) {
    jsMACComboView.superclass.constructor.call(this, ctrl, viewInx, options), this.disable = function() {
        this.pluginEdit.disable(), this.ctrl.clone && (this.pluginEdit.find(".icon").hide(), this.pluginEdit.find(".iconReset").hide())
    }, this.enable = function() {
        this.pluginEdit.enable(), this.ctrl.clone && (this.pluginEdit.find(".icon").show(), this.pluginEdit.find(".iconReset").show())
    }, this.drawView = function() {
        jsMACComboView.superclass.drawView.call(this);
        var options = this.options;
        if (this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {
                inputPadding: options.inputPadding,
                mandatory: options.mandatory,
                isWan: options.isWan
            }), options.summary) this.pluginCombo = this.pluginEdit.find(".input").lightUIStatic();
        else {
            var header = [{
                index: "mac",
                name: "MAC"
            }, {
                index: "ip",
                name: "IP"
            }, {
                index: "host",
                name: "Host"
            }];
            this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {
                combobox: {
                    type: "mac",
                    index: "mac",
                    flags: {
                        mandatory: options.mandatory,
                        isWan: options.isWan
                    }
                }
            }), this.pluginCombo.fieldval(this.ctrl.model.value);
            var $row, obj, LANClients = this.ctrl.LANClients;
            for (var i in LANClients) obj = LANClients[i], $row = this.pluginCombo.addRow().row("last"), $row.col("mac").html(obj.mac), $row.col("ip").html(obj.ip), $row.col("host").html(obj.hostname);
            if (this.bindEvents(), this.ctrl.clone) {
                this.pluginCombo.find(".iconReset").css("display", "block");
                var LANClients = this.ctrl.LANClients,
                    userIP = getCookie("user_ip");
                if (is.string(userIP))
                    for (var i in LANClients) {
                        var isCorrectIp = !1,
                            pos_of_slash = -1;
                        if (pos_of_slash = LANClients[i].ip.indexOf("/"), pos_of_slash > -1 ? isCorrectIp = LANClients[i].ip.indexOf(userIP) > -1 : (userIP = userIP.replace(/\[/, ""), userIP = userIP.replace(/\::ffff:/, ""), userIP = userIP.replace(/\]/, ""), isCorrectIp = LANClients[i].ip == userIP), isCorrectIp) {
                            this.ctrl.userMAC = LANClients[i].mac;
                            break
                        }
                    }
                this.pluginCombo.bind("iconclick.grid", context(this).callback(function() {
                    var userMAC = this.ctrl.userMAC;
                    is.string(userMAC) && (window.hasChanges = !0, this.pluginCombo.fieldval(userMAC).find("input").blur())
                })).find(".icon").attr("title", lng("cloneMACTip")), this.pluginCombo.bind("iconResetclick.grid", context(this).callback(function() {
                    var defaultMAC = this.ctrl.devicemac;
                    is.string(defaultMAC) && (window.hasChanges = !0, this.pluginCombo.fieldval(defaultMAC).find("input").blur())
                })).find(".iconReset").attr("title", lng("cloneMACReset")), this.pluginEdit.find(".error").css({
                    width: "190px",
                    marginLeft: "45px"
                })
            }
            else this.pluginCombo.find(".icon").css("display", "none"), this.pluginCombo.find(".iconReset").css("display", "none");
            this.ctrl.devicemac || this.pluginCombo.find(".iconReset").css("display", "none")
        }
    }
}

function jsIPComboController(addr, LANClients, version) {
    jsIPComboController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsIPComboView,
        options: {}
    }, this.changeModel(new jsComboModel(addr)), this.version = version, this.LANClients = LANClients, this.setVersion = function(version) {
        this.version = version
    }
}

function jsIPComboView(ctrl, viewInx, options) {
    jsIPComboView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsIPComboView.superclass.drawView.call(this);
        var options = this.options,
            version = this.ctrl.version;
        if (this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {
                inputPadding: options.inputPadding,
                mandatory: options.mandatory
            }), options.summary) this.pluginCombo = this.pluginEdit.find(".input").lightUIStatic();
        else {
            var header = [{
                index: "ip",
                name: "IP"
            }, {
                index: "mac",
                name: "MAC"
            }, {
                index: "host",
                name: "Host"
            }];
            this.pluginCombo = version && 6 == version ? this.pluginEdit.find(".input").lightUIGrid(header, 0, {
                combobox: {
                    type: "ipv6",
                    index: "ip",
                    flags: {
                        mandatory: options.mandatory
                    }
                }
            }) : this.pluginEdit.find(".input").lightUIGrid(header, 0, {
                combobox: {
                    type: "ipv4",
                    index: "ip",
                    flags: {
                        mandatory: options.mandatory
                    }
                }
            }), this.pluginCombo.fieldval(this.ctrl.model.value);
            var $row, obj, LANClients = this.ctrl.LANClients;
            for (var i in LANClients) obj = LANClients[i], $row = this.pluginCombo.addRow().row("last"), $row.col("mac").html(obj.mac), $row.col("ip").html(obj.ip), $row.col("host").html(obj.hostname);
            this.pluginCombo.find(".icon").css("display", "none"), this.pluginCombo.find(".iconReset").css("display", "none"), this.bindEvents()
        }
    }
}

function jsMACRuleController(LANClients) {
    jsMACRuleController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsMACRuleView,
        options: {}
    }, this.LANClients = LANClients
}

function jsMACRuleView(ctrl, viewInx, options) {
    jsMACRuleView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsMACRuleView.superclass.drawView.call(this);
        var options = this.options;
        this.pluginEdit = $(options.viewBoxSel).lightUIEdit(options.humanName, null, {
            inputPadding: options.inputPadding
        });
        var header = [{
            index: "ip",
            name: "IP"
        }, {
            index: "mac",
            name: "MAC"
        }, {
            index: "host",
            name: "Host"
        }];
        this.pluginCombo = this.pluginEdit.find(".input").lightUIGrid(header, 0, {
            combobox: {
                type: "text",
                blank: "dhcpMacClientsSel2",
                flags: {
                    size: lng("dhcpMacClientsSel2").length + 4
                }
            },
            editable: !1
        }), this.pluginCombo.find(".icon").css("display", "none"), this.pluginCombo.find(".iconReset").css("display", "none"), this.pluginCombo.find("input").css({
            width: "auto",
            "text-align": "left"
        }), ("ara" == window.curlang || "fas" == window.curlang) && this.pluginCombo.find("input").css("text-align", "right");
        var $row, obj, LANClients = this.ctrl.LANClients;
        for (var i in LANClients) obj = LANClients[i], $row = this.pluginCombo.addRow().row("last"), $row.col("mac").html(obj.MACAddress ? obj.MACAddress : obj.mac), $row.col("ip").html(obj.ip), $row.col("host").html("*" != obj.hostname ? obj.hostname : "");
        this.pluginCombo.bind("rowclick.grid", context(this).callback(function(event, $row) {
            this.ctrl.event("ruleselect", $row, !0)
        }))
    }
}

function jsInputExModel(value) {
    jsInputExModel.superclass.constructor.call(this), this.value = value, jsInputExModel.prototype.toString = function() {
        return no(this.value) ? "" : this.value
    }
}

function jsInputExController(value) {
    jsInputExController.superclass.constructor.call(this), this.ifaceTypes.switcher = {
        type: jsSwitcherClientView
    }, this.ifaceTypes.progresser = {
        type: jsProgresserClientView
    }, this.ifaceTypes.lister = {
        type: jsListerClientView
    }, this.ifaceTypes.buttoner = {
        type: jsButtonerClientView
    }, this.ifaceTypes.inputer = {
        type: jsInputerClientView
    }, this.ifaceTypes.texter = {
        type: jsTexterClientView,
        def: !0
    }, this.ifaceTypes.textboxer = {
        type: jsTextboxerClientView
    }, this.changeModel(new jsInputExModel(value))
}

function jsSwitcherClientView(ctrl, viewInx, options) {
    jsSwitcherClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsSwitcherClientView.prototype.drawView = function() {
        jsSwitcherClientView.superclass.drawView.call(this);
        var htmlToDraw, options = (this.ctrl.model.value, this.options),
            uid = getUID();
        this.myBoxSel = "#switcher" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='switcher normal unselectable' id='switcher" + uid + "'>", htmlToDraw += "<div class='slider'></div>", htmlToDraw += "<div class='text' unselectable='on'></div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), no(options.widgetStyle) || $(this.myBoxSel).addClass("widgetStyle"), no(options.title) || $(this.myBoxSel).attr("title", lng(options.title)), this.updateView(), $(this.myBoxSel).bind("click", context(this).callback(this.onslide)), options.disabled && this.disable()
    }, this.onslide = function() {
        if (!$(this.myBoxSel).is(".disable")) {
            var on, off, slider = $(this.myBoxSel + ">.slider"),
                text = $(this.myBoxSel + ">.text");
            return $(slider).is(".on") ? (off = $(text).html(), on = $(slider).html(), $(slider).removeClass("on"), $(slider).addClass("off"), $(slider).html(off), $(text).html(on)) : (on = $(text).html(), off = $(slider).html(), $(slider).removeClass("off"), $(slider).addClass("on"), $(slider).html(on), $(text).html(off)), this.ctrl.event("fieldchange", {
                view: this,
                value: this.getValue()
            }, !0), !1
        }
    }, this.disable = function() {
        this.options.disabled = !0, $(this.myBoxSel).removeClass("normal").addClass("disable")
    }, this.enable = function() {
        this.options.disabled = !1, $(this.myBoxSel).removeClass("disable").addClass("normal")
    }, this.getValue = function() {
        return $(this.myBoxSel + ">.slider").is(".on") ? options.valset.on : options.valset.off
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.getValue(), jsSwitcherClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        var on, off, align, n, value = this.ctrl.model.value,
            options = this.options,
            slider = $(this.myBoxSel + ">.slider"),
            text = $(this.myBoxSel + ">.text");
        off = lng(options.short_off ? options.short_off : "short_off"), on = lng(options.short_on ? options.short_on : "short_on"), n = Math.abs(((on.length - off.length) / 2).toFixed()), align = "";
        for (var i = 0; n > i; i++) align += "&nbsp;";
        on.length > off.length ? (2 * n + off.length > on.length && (on = "&nbsp;" + on), off = align + off + align) : (2 * n + on.length > off.length && (off = "&nbsp;" + off), on = align + on + align), off = "<tt>" + off + "</tt>", on = "<tt>" + on + "</tt>", value == options.valset.on ? ($(slider).removeClass("off"), $(slider).addClass("on"), $(slider).html(off), $(text).html(on)) : ($(slider).removeClass("on"), $(slider).addClass("off"), $(slider).html(on), $(text).html(off)), jsSwitcherClientView.superclass.updateView.call(this)
    }
}

function jsProgresserClientView(ctrl, viewInx, options) {
    jsProgresserClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsProgresserClientView.prototype.drawView = function() {
        this.stopWait(), jsProgresserClientView.superclass.drawView.call(this);
        var htmlToDraw, value = "" == this.ctrl.model.value ? "0" : this.ctrl.model.value,
            options = this.options,
            uid = getUID();
        this.isWaitStyle = !no(options.waitStyle), this.myBoxSel = "#progresser" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='progresser unselectable' id='progresser" + uid + "'>", htmlToDraw += "<div class='underHeadway'></div>", htmlToDraw += "<div class='headway'></div>", htmlToDraw += "<div class='percent'></div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), $(this.myBoxSel + ">.underHeadway").css("opacity", "0.2"), this.isWaitStyle ? ($(this.myBoxSel).addClass("waitStyle"), $(this.myBoxSel + ">.percent").text(lng(options.waitTitle))) : this.setProgress(value)
    }, this.updateModel = function() {
        return !1
    }, this.updateView = function() {
        return !1
    }, this.headwayBounce = function() {
        if (this.isWaiting) {
            var pos = 0,
                progresser = $(this.myBoxSel),
                headway = $(this.myBoxSel + ">.headway"),
                headwayBounce = context(this).callback(this.headwayBounce);
            0 == $(headway).position().left && (pos = $(progresser).width() - $(headway).width()), pos += "px", $(headway).animate({
                left: pos
            }, 500, function() {
                headwayBounce()
            })
        }
    }, this.startWait = function(waitTitle) {
        no(waitTitle) || $(this.myBoxSel + ">.percent").text(waitTitle), this.isWaitStyle && (this.isWaiting = !0, $(this.myBoxSel + ">.headway").css({
            width: .3 * $(this.myBoxSel).width() + "px",
            left: "0px"
        }), this.headwayBounce()), $(this.myBoxSel + ">.underHeadway").css({
            width: "0%"
        })
    }, this.stopWait = function() {
        this.isWaiting = !1
    }, this.getProgress = function() {
        return this.isWaitStyle ? void 0 : this.ctrl.model.value
    }, this.setProgress = function(value) {
        this.isWaitStyle || (this.ctrl.model.value = value, $(this.myBoxSel + ">.headway").css("width", value + "%"), $(this.myBoxSel + ">.percent").text(value + "%"))
    }, this.isWaiting = !1
}

function jsListerClientView(ctrl, viewInx, options) {
    jsListerClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.selectItem = function(elem) {
        $(this.childBoxSel + ">div.item:eq(" + this.currentIndex + ")").removeClass("selected"), $(elem.currentTarget).addClass("selected"), this.currentIndex = $(elem.currentTarget).index()
    }, this.fastSelectItem = function(elem) {
        this.selectItem(elem), this.getParent().ctrl.event("doubleclick", this.getChild(this.currentIndex))
    }, jsListerClientView.prototype.drawView = function() {
        var htmlToDraw, child, value = this.ctrl.model.value,
            options = this.options,
            uid = getUID(),
            children = this.ctrl.children;
        this.myBoxSel = "#lister" + uid, this.viewBoxSel = options.viewBoxSel, this.childBoxSel = this.myBoxSel + ">.list", htmlToDraw = "<div class='lister' id='lister" + uid + "'>", htmlToDraw += "<div class='caption unselectable'>", htmlToDraw += "<div class='title'>" + lng(options.humanName) + "</div>", htmlToDraw += "<div class='tip'></div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "<div class='list'>";
        for (var i = 0; i < children.length; i++) htmlToDraw += "<div class='item'></div>", child = this.getChild(i), child.options.viewBoxSel = this.childBoxSel + ">div.item:eq(" + i + ")", child.viewBoxSel = child.options.viewBoxSel, child.ctrl.model.value == value && (this.currentIndex = i);
        htmlToDraw += "</div>", htmlToDraw += "<div class='info unselectable'>.: " + children.length + " :.</div>", htmlToDraw += "<div class='overlay'></div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), options.disabled && this.disable(), no(options.height) || $(this.myBoxSel + ">.list").css("height", options.height), no(options.width) || $(this.myBoxSel + ">.list").css("width", options.width), jsListerClientView.superclass.drawView.call(this), $(this.childBoxSel + ">div.item").click(context(this).callback(this.selectItem)), $(this.childBoxSel + ">div.item").dblclick(context(this).callback(this.fastSelectItem)), $(this.childBoxSel + ">div.item:eq(" + this.currentIndex + ")").click()
    }, this.disable = function() {
        $(this.myBoxSel + ">.overlay").fadeTo(200, .2)
    }, this.enable = function() {
        $(this.myBoxSel + ">.overlay").fadeTo(600, 0, function() {
            $(this).hide()
        })
    }, this.updateModel = function() {
        var child = this.getChild(this.currentIndex);
        return this.ctrl.model.value = child.ctrl.model.value, jsListerClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        var child, value = this.ctrl.model.value,
            children = this.ctrl.children;
        this.currentIndex = 0;
        for (var i = 0; i < children.length; i++) child = this.getChild(i), child.ctrl.model.value == value && (this.currentIndex = i);
        $(this.childBoxSel + ">div.item:eq(" + this.currentIndex + ")").click(), jsListerClientView.superclass.updateView.call(this)
    }, this.currentIndex = 0
}

function jsButtonerClientView(ctrl, viewInx, options) {
    jsButtonerClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.click = function() {
        $(this.myBoxSel).is(".disable") || this.getParent().ctrl.event("click", this)
    }, jsButtonerClientView.prototype.drawView = function() {
        var htmlToDraw, options = this.options,
            uid = getUID();
        this.myBoxSel = "#buttoner" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='buttoner normal unselectable' id='buttoner" + uid + "'>", no(options.icon) || (htmlToDraw += "<div class='icon'>", htmlToDraw += "<img src='" + options.icon + "' />", htmlToDraw += "</div>"), htmlToDraw += "<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), options.disabled && this.disable(), no(options.iconRightSide) || $(this.myBoxSel + ">.icon").css("float", "right"), $(this.myBoxSel).mouseenter(function() {
            $(this).not(".disable").addClass("hover")
        }).mouseleave(function() {
            $(this).not(".disable").removeClass("hover")
        }).mousedown(function() {
            $(this).not(".disable").addClass("push")
        }).mouseup(function() {
            $(this).not(".disable").removeClass("push")
        }).click(context(this).callback(this.click)), jsButtonerClientView.superclass.drawView.call(this)
    }, jsButtonerClientView.prototype.disable = function() {
        $(this.myBoxSel).removeClass("normal push").addClass("disable")
    }, jsButtonerClientView.prototype.enable = function() {
        $(this.myBoxSel).removeClass("disable").addClass("normal")
    }, this.changeTitle = function(humanName) {
        $(this.myBoxSel + ">.title").text(lng(humanName))
    }, this.updateModel = function() {
        return !1
    }, this.updateView = function() {
        return !1
    }
}

function jsInputerClientView(ctrl, viewInx, options) {
    jsInputerClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsInputerClientView.prototype.drawView = function() {
        jsInputerClientView.superclass.drawView.call(this);
        var htmlToDraw, value = no(this.ctrl.model.value) ? "" : this.ctrl.model.value,
            options = this.options,
            uid = getUID(),
            type = no(options.passwd) ? "text" : "password",
            maxLength = no(options.maxLength) ? "" : ' maxlength="' + options.maxLength + '" ';
        this.myBoxSel = "#inputer" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='inputer normal' id='inputer" + uid + "'>", htmlToDraw += "<div class='top unselectable'>", htmlToDraw += "<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>", htmlToDraw += "<div class='caps' unselectable='on'>[Caps Lock]</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "<div class='bottom'>", htmlToDraw += "<div class='data'>", htmlToDraw += "<input type='" + type + "' value='" + value + "'" + maxLength + "/>", htmlToDraw += "</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), this.$controlSel = $(this.myBoxSel + " input"), options.disabled && this.disable(), $(this.$controlSel).bind("keypress", context(this).callback(this.checkCapsLock)), $(this.myBoxSel + " .caps").bind("click", context(this).callback(this.switchCase))
    }, this.checkCapsLock = function(e) {
        var c = String.fromCharCode(e.which),
            isShiftKey = e.shiftKey,
            isCapsLock = !1;
        if (c.toLowerCase() != c.toUpperCase()) {
            (c.toUpperCase() == c && !isShiftKey || c.toLowerCase() == c && isShiftKey) && (isCapsLock = !0);
            var caps = $(this.myBoxSel + " .caps");
            isCapsLock ? $(caps).fadeIn("fast") : $(caps).fadeOut("fast")
        }
        return !0
    }, this.switchCase = function() {
        for (var text = $(this.$controlSel).val(), newText = "", i = 0; i < text.length; i++) newText += text[i].toLowerCase() == text[i] ? text[i].toUpperCase() : text[i].toLowerCase();
        $(this.$controlSel).val(newText)
    }, this.disable = function() {
        $(this.$controlSel).attr("disabled", "disabled")
    }, this.enable = function() {
        $(this.$controlSel).attr("disabled", null)
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.$controlSel.val(), jsInputerClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        if (this.$controlSel) {
            var value = this.ctrl.model.value;
            this.$controlSel.val(no(value) ? "" : value)
        }
        jsInputerClientView.superclass.updateView.call(this)
    }
}

function jsTexterClientView(ctrl, viewInx, options) {
    jsTexterClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsTexterClientView.prototype.drawView = function() {
        jsTexterClientView.superclass.drawView.call(this);
        var htmlToDraw, value = no(this.ctrl.model.value) ? "" : this.ctrl.model.value,
            options = this.options,
            uid = getUID();
        this.myBoxSel = "#texter" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='texter unselectable' id='texter" + uid + "'>", htmlToDraw += "<span>" + lng(options.humanName) + "</span>", htmlToDraw += "<span class='somethingValue'>" + lng(value) + "</span>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), this.$controlSel = $(this.myBoxSel + ">span.somethingValue"), "" == value && $(this.$controlSel).hide()
    }, this.updateModel = function() {}, this.updateView = function() {
        if (this.$controlSel) {
            var value = this.ctrl.model.value;
            this.$controlSel.html(no(value) ? "" : value), "" == value ? $(this.$controlSel).hide() : $(this.$controlSel).show()
        }
        jsTexterClientView.superclass.updateView.call(this)
    }
}

function jsTextboxerClientView(ctrl, viewInx, options) {
    jsTextboxerClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsTextboxerClientView.prototype.drawView = function() {
        jsTextboxerClientView.superclass.drawView.call(this);
        var htmlToDraw, value = no(this.ctrl.model.value) ? "" : this.ctrl.model.value,
            options = this.options,
            uid = getUID();
        this.myBoxSel = "#textboxer" + uid, this.viewBoxSel = options.viewBoxSel, htmlToDraw = "<div class='textboxer normal' id='textboxer" + uid + "'>", htmlToDraw += "<div class='top unselected'>", htmlToDraw += "<div class='title' unselectable='on'>" + lng(options.humanName) + "</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "<div class='bottom'>", htmlToDraw += "<div class='data'>", htmlToDraw += "<textarea rows='3'>" + value + "</textarea>", htmlToDraw += "</div>", htmlToDraw += "<div class='clear'></div>", htmlToDraw += "</div>", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), this.$controlSel = $(this.myBoxSel + " textarea"), options.disabled && this.disable()
    }, this.disable = function() {
        $(this.$controlSel).attr("disabled", "disabled")
    }, this.enable = function() {
        $(this.$controlSel).attr("disabled", null)
    }, this.updateModel = function() {
        return this.ctrl.model.value = this.$controlSel.val(), jsTextboxerClientView.superclass.updateModel.call(this)
    }, this.updateView = function() {
        if (this.$controlSel) {
            var value = this.ctrl.model.value;
            this.$controlSel.val(no(value) ? "" : value)
        }
        jsTextboxerClientView.superclass.updateView.call(this)
    }
}

function jsATMSettingsModel(ifnode) {
    jsATMSettingsModel.superclass.constructor.call(this), this.ifnode = ifnode, this.iftree = null
}

function jsATMSettingsController(ifnode, isadding) {
    jsATMSettingsController.superclass.constructor.call(this), this.changeModel(new jsATMSettingsModel(ifnode)), this.ifaceTypes.client = {
        type: jsATMSettingsClientView,
        def: !0
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsATMSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.vpi : 0), "vpi"), this.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.vci : 0), "vci");
    var advanced = this.addChild(new jsFieldSetController, "advanced");
    advanced.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.encap : 0), "encap"), advanced.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.qos : 0), "qos");
    var qos = advanced.addChild(new jsFieldSetController, "divQos");
    qos.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.pcr : 0), "pcr"), qos.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.scr : 0), "scr"), qos.addChild(new jsInputController(ifnode.pvc_settings ? ifnode.pvc_settings.mbs : 0), "mbs"), this.isadding = isadding
}

function jsATMSettingsClientView(ctrl, viewInx, options) {
    this.updateModel = function() {
        var vpi = this.getChild("vpi"),
            vci = this.getChild("vci");
        vpi.statusCode = null, vci.statusCode = null;
        var res = jsATMSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var pvcSettings, ifnode = this.ctrl.model.ifnode,
                advanced = this.getChild("advanced");
            ifnode.pvc_settings.vpi = vpi.ctrl.model.value, ifnode.pvc_settings.vci = vci.ctrl.model.value, ifnode.pvc_settings.encap = advanced.getChild("encap").ctrl.model.value, ifnode.pvc_settings.qos = advanced.getChild("qos").ctrl.model.value;
            var divQos = advanced.getChild("divQos"),
                pcr = divQos.getChild("pcr").ctrl.model.value,
                scr = divQos.getChild("scr").ctrl.model.value,
                mbs = divQos.getChild("mbs").ctrl.model.value;
            switch (ifnode.pvc_settings.qos) {
                case "ubr_pcr":
                case "cbr":
                    ifnode.pvc_settings.pcr = pcr;
                    break;
                case "nrtvbr":
                case "rtvbr":
                    ifnode.pvc_settings.pcr = pcr, ifnode.pvc_settings.scr = scr, ifnode.pvc_settings.mbs = mbs
            }
            if (this.ctrl.isadding && "create" == ifnode.ifname) {
                var iftree = this.ctrl.model.iftree;
                for (var i in iftree)
                    if ("atm" == iftree[i].type && (pvcSettings = iftree[i].pvc_settings, pvcSettings.vpi == vpi.ctrl.model.value && pvcSettings.vci == vci.ctrl.model.value)) {
                        vpi.statusCode = "wanPvcBusy", vci.statusCode = "wanPvcBusy", res = !1;
                        break
                    }
            }
        }
        return vpi.setError(), vci.setError(), res
    }, this.onportchange = function(value) {
        return "create" == value ? (this.getChild("vpi").enable(), this.getChild("vci").enable()) : (this.getChild("vpi").disable(), this.getChild("vci").disable()), !1
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias;
        switch (alias) {
            case "qos":
                var divQos = this.getChild("advanced", "divQos");
                switch (obj.value) {
                    case "ubr":
                        divQos.getChild("pcr").hide(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                        break;
                    case "ubr_pcr":
                        divQos.getChild("pcr").show(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                        break;
                    case "cbr":
                        divQos.getChild("pcr").show(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                        break;
                    case "nrtvbr":
                        divQos.getChild("pcr").show(), divQos.getChild("scr").show(), divQos.getChild("mbs").show();
                        break;
                    case "rtvbr":
                        divQos.getChild("pcr").show(), divQos.getChild("scr").show(), divQos.getChild("mbs").show()
                }
                break;
            case "vpi":
            case "vci":
                var vpi = this.getChild("vpi"),
                    vci = this.getChild("vci");
                vpi.updateModel(), vci.updateModel();
                var pvcSettings = this.ctrl.model.ifnode.pvc_settings;
                pvcSettings.vpi = vpi.ctrl.model.value, pvcSettings.vci = vci.ctrl.model.value
        }
        return !0
    }, this.onmodeswitch = function() {
        return this.options.brief ? (this.getChild("advanced").hide(), this.getChild("desc").hide()) : (this.getChild("advanced").show(), this.getChild("desc").show()), !1
    }, this.drawView = function() {
        jsATMSettingsClientView.superclass.drawView.call(this), this.onmodeswitch()
    };
    var obj, opt, ifnode = ctrl.model.ifnode;
    options.disabled = !ctrl.isadding, obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "ATM"
    }, obj.ifaceTypes.separator.options.hide = ifnode.blocks, obj = ctrl.getChild("vpi"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanVpi",
        minval: 0,
        maxval: 255
    }, opt = obj.ifaceTypes.number.options, opt.disabled = !ctrl.isadding || "create" != ifnode.ifname, obj = ctrl.getChild("vci"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanVci",
        minval: 0,
        maxval: 65535
    }, opt = obj.ifaceTypes.number.options, opt.disabled = !ctrl.isadding || "create" != ifnode.ifname;
    var advanced = ctrl.getChild("advanced");
    advanced.nextIface = "client", obj = advanced.getChild("encap"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
        humanName: "wanEncap",
        valset: {
            LLC: "llc",
            VC: "vcmux"
        }
    }, obj = advanced.getChild("qos"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
        humanName: "wanQos",
        valset: {
            UBR: "ubr",
            "UBR with PCR": "ubr_pcr",
            CBR: "cbr",
            "Non Realtime VBR": "nrtvbr",
            "Realtime VBR": "rtvbr"
        }
    };
    var qos = obj.model.value,
        divQos = advanced.getChild("divQos");
    divQos.nextIface = "client", divQos.ifaceTypes.client.options = {
        nothing: !0,
        slider: !1
    }, obj = divQos.getChild("pcr"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanPcr",
        minval: 1,
        maxval: 255e3
    }, obj.ifaceTypes.number.options.hide = "ubr" == qos, obj = divQos.getChild("scr"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanScr",
        minval: 1,
        maxval: 255e3
    }, obj.ifaceTypes.number.options.hide = "ubr" == qos || "ubr_pcr" == qos || "cbr" == qos, obj = divQos.getChild("mbs"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanMbs",
        minval: 1,
        maxval: 1e6
    }, obj.ifaceTypes.number.options.hide = "ubr" == qos || "ubr_pcr" == qos || "cbr" == qos, this.brief = ifnode.wizard, jsATMSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), this.bind("portchange", this.onportchange), this.bind("modeswitch", this.onmodeswitch)
}

function jsATMSettingsSummaryView(ctrl, viewInx, options) {
    jsATMSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        this.getChild("advanced", "encap").options.hide = !0, this.getChild("advanced").options.slider = !1, jsATMSettingsSummaryView.superclass.drawView.call(this)
    }, this.bind("modeswitch", function() {
        return !1
    })
}

function device_not_avail(avail) {
    if (!avail)
        if (getCookie("user_interface") && "WLAN" == getCookie("user_interface")) {
            var msg = $("<div></div>");
            $(msg).append("<div class='caption'></div><div class='text'></div>"), $(msg).find(".caption").append(lng("wifiCheckIf")), getCookie("ssid") && $(msg).find(".text").append(lng("SSID") + (getCookie("ssid_5g") ? " 2,4" + lng("ghz") : "") + ": <span>" + getCookie("ssid") + "</span><br/>"), getCookie("ssid_5g") && $(msg).find(".text").append(lng("SSID") + " 5" + lng("ghz") + ": <span>" + getCookie("ssid_5g") + "</span><br/>"), $(msg).append("<a class='button' href='#'>" + lng("airSafemodeContinue") + "</a>"), $(msg).find("a").bind("click", callback(this, function() {
                return rootView.hideModalOverlay(), !1
            })), debug("user_interface: " + getCookie("user_interface")), rootView.showWaitScreen(msg)
        }
        else device.lock(!0), window.SAVEME && SAVEME.lock(), $("body").errorBlock(lng("notAvailTitle"), lng("notAvailDesc"), "", lng("refresh"), function() {
            location.reload(!0)
        })
}

function checkInRebootCmdList(id) {
    for (var i = 0; i < rebootCmdList.length; i++)
        if (id == rebootCmdList[i]) return !0;
    return !1
}

function checkInRebootConfigList(id) {
    for (var i = 0; i < rebootConfigList.length; i++)
        if (id == rebootConfigList[i]) return !0;
    return !1
}

function jsBCMVlanSettingsModel(service) {
    jsBCMVlanSettingsModel.superclass.constructor.call(this), this.service = service
}

function jsBCMVlanSettingsController(service, isadding) {
    jsBCMVlanSettingsController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsBCMVlanSettingsClientView
    }, this.ifaceTypes.client.options = {}, this.changeModel(new jsBCMVlanSettingsModel(service)), this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController(service.vlan.usempvc), "usempvc"), this.addChild(new jsInputController(service.vlan.usevlan), "usevlan"), this.addChild(new jsInputController(service.vlan.vlanid), "vlanid"), this.addChild(new jsInputController(service.vlan.vlanpr), "vlanpr"), this.isadding = isadding
}

function jsBCMVlanSettingsClientView(ctrl, viewInx, options) {
    var obj, opt, service = ctrl.model.service;
    service.vlan || (service.vlan = {}), obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "VLAN"
    }, obj.ifaceTypes.separator.options.hide = service.blocks, obj = ctrl.getChild("usempvc"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanUseMultiPVC",
        valset: {
            on: !0,
            off: !1
        }
    }, opt = obj.ifaceTypes.checkbox.options, opt.disabled = !ctrl.isadding || service.vlan.usempvcro, obj = ctrl.getChild("usevlan"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanUseVlan",
        valset: {
            on: !0,
            off: !1
        }
    };
    var usevlan = obj.model.value;
    opt = obj.ifaceTypes.checkbox.options, opt.disabled = !ctrl.isadding || service.vlan.usevlanro, obj = ctrl.getChild("vlanpr"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanVlanPr",
        minval: -1,
        maxval: 7
    }, opt = obj.ifaceTypes.number.options, opt.optional = !0, opt.hide = !usevlan, obj = ctrl.getChild("vlanid"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanVlanId",
        minval: -1,
        maxval: 4095
    }, opt = obj.ifaceTypes.number.options, opt.optional = !0, opt.hide = !usevlan, this.updateModel = function() {
        var res = jsBCMVlanSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var service = this.ctrl.model.service;
            service.vlan && delete service.vlan, this.getChild("usempvc").ctrl.model.value && (service.vlan = {}, this.getChild("usevlan").ctrl.model.value && (service.vlan.vlanid = this.getChild("vlanid").ctrl.model.value, service.vlan.vlanpr = this.getChild("vlanpr").ctrl.model.value))
        }
        return res
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias;
        switch (alias) {
            case "usevlan":
                var usempvc = this.getChild("usempvc");
                usempvc.ctrl.model.value = !0, usempvc.updateView(), obj.value ? (usempvc.disable(), this.getChild("vlanid").show(), this.getChild("vlanpr").show()) : (this.ctrl.model.service.vlan.usempvcro || usempvc.enable(), this.getChild("vlanid").hide(), this.getChild("vlanpr").hide())
        }
        return !1
    }, this.onmodeswitch = function() {
        return this.options.brief ? this.hide() : this.show(), !1
    }, this.drawView = function() {
        jsBCMVlanSettingsClientView.superclass.drawView.call(this), this.onmodeswitch()
    }, this.brief = service.wizard, jsBCMVlanSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), this.bind("modeswitch", this.onmodeswitch)
}

function jsBubblerController() {
    jsBubblerController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsBubblerClientView,
        def: !0
    }
}

function jsBubblerClientView(ctrl, viewInx, options) {
    jsBubblerClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsBubblerClientView.prototype.drawView = function() {
        var htmlToDraw = "",
            options = this.options,
            uid = getUID(),
            bubblerHtml = "";
        this.myBoxSel = "#bubbler" + uid, this.viewBoxSel = options.viewBoxSel, no(options.content) || (bubblerHtml = options.content), no(options.flow) || (this.flowBoxSel = options.flow instanceof jsCSideView ? options.flow.viewBoxSel : options.flow), no(options.delay) || (this.timerDelay = options.delay), no(options.direction) || (this.direction = options.direction), htmlToDraw = "<div class='bubbler' id='bubbler" + uid + "'>", htmlToDraw += "<div class='bone'>", htmlToDraw += "<div class='help unselectable' unselectable='on'>" + lng(bubblerHtml) + "</div>", htmlToDraw += "</div>", htmlToDraw += "<img src='' class='arrow' />", htmlToDraw += "</div>", $(this.viewBoxSel).html(htmlToDraw), options.manual || ($(this.flowBoxSel).mouseenter(context(this).callback(this.autoShow)), $(this.myBoxSel).mouseenter(context(this).callback(this.stopHide))), $(this.flowBoxSel).mouseleave(context(this).callback(this.startHide)), $(this.myBoxSel).mouseleave(context(this).callback(this.startHide)), jsBubblerClientView.superclass.drawView.call(this)
    }, this.startHide = function() {
        this.timerID = setTimeout(context(this).callback(this.autoHide), this.timerDelay)
    }, this.stopHide = function() {
        clearTimeout(this.timerID)
    }, this.autoShow = function() {
        function show(img, aL, aT, bL, bT, originL, originT) {
            var offsetL = $(bubbler).parent().position().left - $(bubbler).parent().offset().left,
                offsetT = $(bubbler).parent().position().top - $(bubbler).parent().offset().top;
            $(arrow).css({
                left: aL,
                top: aT
            }).attr("src", img), $(bubbler).css({
                left: bL + offsetL + "px",
                top: bT + offsetT + "px"
            }), $(bubbler).stop(!1, !0).animate({
                left: originL + offsetL,
                top: originT + offsetT,
                opacity: "show"
            }, 400)
        }
        this.stopHide();
        var L, T, bubbler = $(this.myBoxSel),
            arrow = $(bubbler).find(">.arrow"),
            flowElem = $(this.flowBoxSel),
            bubblerShift = this.bubblerShift,
            direction = this.direction;
        switch (direction) {
            case "right":
                L = $(flowElem).offset().left + $(flowElem).width() + $(arrow).width(), T = $(flowElem).offset().top + ($(flowElem).height() - $(bubbler).height()) / 2, show("image/bubbler_arrow_right.png", 0 - $(arrow).width(), ($(bubbler).height() - $(arrow).height()) / 2, L - bubblerShift, T, L, T);
                break;
            case "left":
                L = $(flowElem).offset().left - $(bubbler).width() - $(arrow).width(), T = $(flowElem).offset().top + ($(flowElem).height() - $(bubbler).height()) / 2, show("image/bubbler_arrow_left.png", $(bubbler).width(), ($(bubbler).height() - $(arrow).height()) / 2, L + bubblerShift, T, L, T);
                break;
            case "top":
                L = $(flowElem).offset().left + ($(flowElem).width() - $(bubbler).width()) / 2, T = $(flowElem).offset().top - $(bubbler).height() - $(arrow).height(), show("image/bubbler_arrow_top.png", ($(bubbler).width() - $(arrow).width()) / 2, $(bubbler).height(), L, T + bubblerShift, L, T);
                break;
            case "bottom":
                L = $(flowElem).offset().left + ($(flowElem).width() - $(bubbler).width()) / 2, T = $(flowElem).offset().top + $(flowElem).height() + $(arrow).height(), show("image/bubbler_arrow_bottom.png", ($(bubbler).width() - $(arrow).width()) / 2, 0 - $(arrow).height(), L, T - bubblerShift, L, T)
        }
    }, this.autoHide = function() {
        function hide(bL, bT) {
            var offsetL = $(bubbler).parent().position().left - $(bubbler).parent().offset().left,
                offsetT = $(bubbler).parent().position().top - $(bubbler).parent().offset().top;
            $(bubbler).stop(!1, !0).animate({
                left: bL + offsetL,
                top: bT + offsetT,
                opacity: "hide"
            }, 400)
        }
        var bubbler = $(this.myBoxSel),
            bubblerShift = this.bubblerShift,
            direction = this.direction;
        switch (direction) {
            case "right":
                hide($(bubbler).offset().left + bubblerShift, "+=0");
                break;
            case "left":
                hide($(bubbler).offset().left - bubblerShift, "+=0");
                break;
            case "top":
                hide("+=0", $(bubbler).offset().top - bubblerShift);
                break;
            case "bottom":
                hide("+=0", $(bubbler).offset().top + bubblerShift)
        }
    }, this.bubblerShift = 20, this.flowBoxSel = null, this.direction = "top", this.timerDelay = 0, this.timerID = null
}

function jsCheckWANController(wan) {
    jsCheckWANController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsCheckWANView,
        options: {}
    }, this.ifaceTypes.server = {
        type: jsCheckWANServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.nextIface = "server", this.addIface(), this.nextIface = "client", this.addChild(new jsInputController, "host"), this.addChild(new jsInputController, "hostv4"), this.addChild(new jsInputController, "hostv6"), this.addChild(new jsFieldSetController, "out"), this.getWAN = function() {
        var wan = this.wan;
        if (wan)
            if (wan.ifname) this.ifnode = this.iftree[wan.ifname];
            else if (!no(wan.vpi) && !no(wan.vci)) {
            var ifnode;
            for (var i in this.iftree)
                if (ifnode = this.iftree[i], "atm" == ifnode.type && ifnode.pvc_settings.vpi == wan.vpi && ifnode.pvc_settings.vci == wan.vci) {
                    this.ifnode = ifnode;
                    break
                }
        }
        if (this.ifnode) {
            this.service = null, this.tunnel = null;
            var services = this.ifnode.services;
            for (var i in services)
                if (services[i].name == wan.serviceName) {
                    if (this.service = services[i], this.event("settodelete", i, !0), wan.tunnelName) {
                        var tunnels = services[i].tunnels;
                        for (var j in tunnels) tunnels[j].name == wan.tunnelName && (this.tunnel = tunnels[j])
                    }
                    break
                }
            if (wan.serviceName2)
                for (var i in services)
                    if (services[i].name == wan.serviceName2) {
                        this.service = services[i], this.event("settodelete", i, !0);
                        break
                    }
        }
    }, this.wan = wan, this.ifnode = null, this.service = null, this.tunnel = null, this.iftree = null, this.isCablePluged = null, this.ping = null
}

function jsCheckWANView(ctrl, viewInx, options) {
    this.drawView = function() {
        jsCheckWANView.superclass.drawView.call(this), $(this.getChild("out").options.childBoxSel).addClass("checkwan")
    }, this.onstartcheckrq = function() {
        return rootView.showModalOverlay(), this.ctrl.getChild("host").model.value || (this.ctrl.getChild("host").model.value = this.ctrl.wan.contype.indexOf("v6") + 1 ? "ipv6.google.com" : "google.com", this.ctrl.wan.contype.indexOf("pppoedual") + 1 ? (this.getChild("hostv4").show(), this.getChild("hostv4").ctrl.model.value = "google.com", this.getChild("hostv6").show(), this.getChild("hostv6").ctrl.model.value = "ipv6.google.com", this.getChild("host").hide()) : this.getChild("host").show(), this.updateView()), this.ctrl.event("disablebuttons", !0, !0), setTimeout(callback(this, function() {
            this.updateModel();
            var out = this.getChild("out");
            $(out.options.childBoxSel).html(""), this.addOutItem("3g" == this.ctrl.wan.L2Type ? lng("checkusb") + char1 : lng("checkcable") + char1), this.ctrl.event("checkcablerq"), rootView.hideModalOverlay()
        }), 1e4), !1
    }, this.oncableready = function() {
        if (this.ctrl.getWAN(), this.ctrl.isCablePluged) {
            this.$curout.css("color", "green"), this.$curout.html("3g" == this.ctrl.wan.L2Type ? lng("g3_connection_success") + char2 : lng("cableplugged") + char2), this.addOutItem(lng("connstat") + char1);
            var isConnected, isIpv6;
            null != this.ctrl.tunnel ? (isConnected = this.getStatus(this.ctrl.tunnel), isIpv6 = this.isIPv6Type(this.ctrl.tunnel)) : (isConnected = this.getStatus(this.ctrl.service), isIpv6 = this.isIPv6Type(this.ctrl.service)), isConnected ? (this.addOutItem(lng("hostaccess") + char1), this.ctrl.event(this.ctrl.wan.contype.indexOf("pppoedual") + 1 ? "pingdualrq" : isIpv6 ? "pingv6rq" : "pingrq")) : this.ctrl.event("enablebuttons", null, !0)
        }
        else this.$curout.css("color", "red"), no(this.ctrl.wan.vpi) && no(this.ctrl.wan.vci) && "ptm" != this.ctrl.wan.L2Type ? "3g" == this.ctrl.wan.L2Type ? (this.$curout.html(lng("g3_connection_error") + char2), alert(lng("g3_connection_error")), this.addDescription(lng("wanNoUsbModemAvail"))) : "fiber" == this.ctrl.wan.medium ? (this.$curout.html(lng("cablenotplugged") + char2), alert(lng("quickInfoFiber1")), this.addDescription(lng("quickInfoFiber1"))) : (this.$curout.html(lng("cablenotplugged") + char2), alert(lng("quickInfoEth1")), this.addDescription(lng("quickInfoEth1"))) : (this.$curout.html(lng("cablenotplugged") + char2), alert(lng("quickInfoDSL1")), this.addDescription(lng("quickInfoDSL1")), this.addDescription(lng("quickInfoDSL3"))), this.ctrl.event("enablebuttons", null, !0);
        return !1
    }, this.onpingready = function(status) {
        if (this.getChild("out"), status) {
            var ping = this.ctrl.ping[0];
            ping && ping.transmited > 0 && ping.transmited == ping.received ? (this.$curout.css("color", "green"), this.$curout.html(lng("accessible") + char2), alert(lng("inetok")), this.addResume(lng("inetok"), !0)) : (this.$curout.css("color", "red"), this.$curout.html(lng("unaccessible") + char2), this.describeInetFail())
        }
        else this.$curout.css("color", "red"), this.$curout.html(lng("unaccessible") + char2), this.describeInetFail();
        return this.ctrl.event("enablebuttons", null, !0), !1
    }, this.describeInetFail = function() {
        alert(lng("inetfail")), this.addResume(lng("inetfail")), this.addDescription(lng(this.ctrl.wan.isTunnel || "bridge" != this.ctrl.service.type ? "pingfail" : "pingfailbridge"))
    }, this.addResume = function(text, res) {
        var outSel = this.getChild("out").childBoxSel;
        $(outSel).append("<div class='resume'>" + text + "</div>");
        var $resume = $(outSel + " div.resume");
        $resume.addClass(res ? "inetok" : "inetfail")
    }, this.addDescription = function(text) {
        var outSel = this.getChild("out").childBoxSel;
        $(outSel).append("<div class='description'>" + text + "</div>")
    }, this.addOutItem = function(text) {
        var id = "out" + getUID(),
            htmlToDraw = "<div id='" + id + "' class='out'><div class='edit'><div class='label' ";
        this.options.inputPadding && (htmlToDraw += "style='width: " + this.options.inputPadding + "'"), htmlToDraw += "><span>" + text + "</span></div>", htmlToDraw += "<div class='input'><img src='image/wait.gif' /></div></div></div><div style='clear:both'></div>";
        var out = this.getChild("out");
        $(out.options.childBoxSel).append(htmlToDraw), this.$curout = $("#" + id + " div.input")
    }, this.getStatus = function(obj) {
        return obj ? obj.enable ? obj && obj.connection_status ? "Connected" == obj.connection_status ? (this.$curout.css("color", "green"), this.$curout.html(lng("statWanUp") + char2), !0) : "Disconnected" == obj.connection_status ? (this.$curout.css("color", "red"), this.$curout.html(lng("statWanDown") + char2), alert(lng("wandownmes")), this.addResume(lng("wandownmes")), this.addDescription(lng("wanconnectingmes2")), !1) : (this.$curout.css("color", "#FF8800"), this.$curout.html(lng(obj.connection_status) + char2), alert(lng("wanconnectingmes")), this.addResume(lng("wanconnectingmes")), this.addDescription(lng("wanconnectingmes2")), !1) : (this.$curout.css("color", "red"), this.$curout.html(lng("statWanDown") + char2), alert(lng("wandownmes")), this.addResume(lng("wandownmes")), this.addDescription(lng("wanconnectingmes2")), !1) : (this.$curout.css("color", "red"), this.$curout.html(lng("disable") + char2), alert(lng("wandismes")), this.addResume(lng("wandismes")), !1) : (this.$curout.css("color", "red"), this.$curout.html(lng("wanStatusNotCreated")), alert(lng("wancreatefailure") + char2), this.addResume(lng("wancreatefailure") + "."), !1)
    }, this.isIPv6Type = function(obj) {
        var type = obj && obj.type ? obj.type : "",
            re = /v6$/;
        return re.test(type) ? !0 : !1
    };
    var obj = ctrl.getChild("host");
    obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "checkwanhost"
    };
    var obj = ctrl.getChild("hostv4");
    obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "checkwanhostv4",
        hide: !0
    };
    var obj = ctrl.getChild("hostv6");
    obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "checkwanhostv6",
        hide: !0
    }, obj = ctrl.getChild("out"), obj.nextIface = "client", obj.ifaceTypes.client.options = {
        slider: !0,
        nocollapse: !0,
        title: "checkwanresult",
        descText: ""
    }, options.slider = !0, options.nocollapse = !0, options.title = lng("checkwantitle"), options.descText = "";
    var char1 = ":",
        char2 = ".";
    jsCheckWANView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("startcheckrq", this.onstartcheckrq), this.bind("cableready", this.oncableready), this.bind("pingready", this.onpingready)
}

function jsCheckWANServerView(ctrl, viewInx, options) {
    jsCheckWANServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        function checkEthWAN() {
            var rq = data.rq[1];
            if (isConnect = !1, 20 == rq.status && rq.resident) {
                var port, obj, ifnode;
                for (var p in rq.resident)
                    if (port = p, obj = rq.resident[p], ifnode = this.ctrl.iftree[obj.iface], obj.is_wan || ifnode && ifnode.is_wan) break;
                isConnect = no(rq.resident[port].status) ? rq.resident[port] : rq.resident[port].status
            }
            return isConnect
        }
        var data = this.options.sender.responseData;
        switch (this.mode) {
            case "cable":
                if (data && !data.baddata && data.rq && data.rq[0] && data.rq[0].resident) {
                    this.ctrl.iftree = data.rq[0].resident.iface_names;
                    var wan = this.ctrl.wan;
                    if ("3g" == wan.L2Type) {
                        var rq = data.rq[2];
                        this.ctrl.isCablePluged = 20 == rq.status && rq.resident.status && rq.resident
                    }
                    else this.ctrl.isCablePluged = checkEthWAN.call(this);
                    this.ctrl.event("cableready")
                }
                break;
            case "ping":
                data && !data.baddata && data.resident ? (this.ctrl.ping = data.resident, this.ctrl.event("pingready", !0)) : this.ctrl.event("pingready", !1);
                break;
            case "pingv6":
                data && !data.baddata && data.resident ? (this.ctrl.ping = data.resident, this.ctrl.event("pingready", !0)) : this.ctrl.event("pingready", !1);
                break;
            case "pingdual":
                is.RPC_SUCCESS(data.rq[0]) && data.rq[0].resident ? (this.ctrl.ping = data.rq[0].resident, this.ctrl.event("pingready", !0)) : is.RPC_SUCCESS(data.rq[1]) && data.rq[1].resident ? (this.ctrl.ping = data.rq[1].resident, this.ctrl.event("pingready", !0)) : this.ctrl.event("pingready", !1)
        }
    }, this.prepareData = function() {
        var obj;
        switch (this.mode) {
            case "cable":
                var obj = {
                        v2: "y",
                        rq: 2,
                        res_json0: "y",
                        res_config_action0: 1,
                        res_config_id0: 1,
                        res_struct_size0: 1,
                        res_json1: "y",
                        res_config_action1: 1,
                        res_struct_size1: 1,
                        res_config_id1: 129
                    },
                    rqInx = 2;
                "3g" == this.ctrl.wan.L2Type && (obj["res_json" + rqInx] = "y", obj["res_config_action" + rqInx] = 1, obj["res_struct_size" + rqInx] = 1, obj["res_config_id" + rqInx] = 134, obj.rq = ++rqInx);
                break;
            case "ping":
                var host = this.ctrl.getChild("host").model.value;
                obj = {
                    v2: "y",
                    rq: "y",
                    res_data_type: "json",
                    res_json: "y",
                    res_config_action: 3,
                    res_config_id: 145,
                    res_struct_size: 1,
                    res_buf: $.toJSON({
                        ping_host: host,
                        ping_count: 1
                    })
                };
                break;
            case "pingv6":
                var host = this.ctrl.getChild("host").model.value;
                obj = {
                    v2: "y",
                    rq: "y",
                    res_data_type: "json",
                    res_json: "y",
                    res_config_action: 3,
                    res_config_id: 216,
                    res_struct_size: 1,
                    res_buf: $.toJSON({
                        host: host,
                        count: 1,
                        is_ipv6: !0
                    })
                };
                break;
            case "pingdual":
                var hostv4 = this.ctrl.getChild("hostv4").model.value,
                    hostv6 = this.ctrl.getChild("hostv6").model.value;
                obj = {
                    v2: "y",
                    rq: 2,
                    res_data_type0: "json",
                    res_json0: "y",
                    res_config_action0: 3,
                    res_config_id0: 145,
                    res_struct_size0: 1,
                    res_buf0: $.toJSON({
                        ping_host: hostv4,
                        count: 1
                    }),
                    res_data_type1: "json",
                    res_json1: "y",
                    res_config_action1: 3,
                    res_config_id1: 216,
                    res_struct_size1: 1,
                    res_buf1: $.toJSON({
                        host: hostv6,
                        count: 1,
                        is_ipv6: !0
                    })
                }
        }
        this.addToRequest(obj)
    }, this.mode = "cable", this.oncheckcablerq = function() {
        this.mode = "cable", this.updateView()
    }, this.onpingrq = function() {
        this.mode = "ping", this.updateView()
    }, this.onpingv6rq = function() {
        this.mode = "pingv6", this.updateView()
    }, this.onpingdualrq = function() {
        this.mode = "pingdual", this.updateView()
    }, this.bind("checkcablerq", this.oncheckcablerq), this.bind("pingrq", this.onpingrq), this.bind("pingv6rq", this.onpingv6rq), this.bind("pingdualrq", this.onpingdualrq)
}

function pageConfiguration() {
    pageConfiguration.superclass.constructor.call(this), this.add(new nodestatic("comment_save_current_config"), "current_config_save").add(new nodestatic("comment_reboot"), "config_reboot").add(new nodestatic("comment_factory_config"), "factory_config_save").add(new nodestatic("comment_download_config"), "config_download").add(new nodeUpload("comment_upload_config", "index.cgi", "file_config", {
        mandatory: !0,
        browse: "button_browse",
        cancel: "button_cancel"
    }), "upload_config").add(new nodestatic("comment_logout"), "config_logout"), hideFlag(9) && this.get("factory_config_save").hide(), hideFlag(11) && this.get("upload_config").hide(), hideFlag(12) && this.get("config_download").hide(), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        pageConfiguration.superclass.updateView.apply(this, arguments), "back" == phase && (this.child("current_config_save").val($("				<div></div>			").lightUIButton("button_conf_save").bind("click.button", callback(this, this.save))), this.child("config_reboot").val($("				<div></div>			").lightUIButton("button_reboot").bind("click.button", callback(this, this.reboot))), this.child("factory_config_save").val($("				<div></div>			").lightUIButton("button_factory").bind("click.button", callback(this, this.reset))), this.child("config_download").val($("				<div></div>			").lightUIButton("button_config_download").bind("click.button", callback(this, this.backup))), this.child("config_logout").val($("				<div></div>			").lightUIButton("logout").bind("click.button", callback(this, this.logout))), disableFlag("12") && this.get("config_download").hide(), disableFlag("10") && this.get("factory_config_save").hide(), disableFlag("11") && this.get("upload_config").hide())
    }, this.save = function() {
        rootView.showModalOverlay(), device.system.save(callback(this, function() {
            rootView.hideModalOverlay(), alert(lng("save_config_success"))
        }))
    }, this.reset = function() {
        rootCtrl.event("resetrebootrq")
    }, this.reboot = function() {
        rootCtrl.event("rebootrq")
    }, this.backup = function() {
        window.SAVEME && SAVEME.lock(), device.system.backup(function() {
            window.SAVEME && SAVEME.unlock()
        })
    }, this.logout = function() {
        device.system.auth("", "", function() {
            location.reload(!0)
        })
    }, this.bind("updaterq", function() {
        this.deep.updateView()
    }), this.bind("fieldchange", function(status) {
        switch (status.target.getAlias()) {
            case "upload_config":
        }
    }), this.bind("uploading", function() {}), this.bind("uploaded", function(status, value, data) {
        is.RPC_SUCCESS(data) ? rootCtrl.event("rebootrq") : alert(lng("lng_config_upload_failed"))
    }), this.bind("cancel", function() {})
}

function jsConnsMainTabModel(iftree, lanClients, dhcpClients, routes) {
    jsConnsMainTabModel.superclass.constructor.call(this), this.iftree = iftree, this.lanClients = lanClients, this.dhcpClients = dhcpClients, this.routes = routes
}

function jsConnsMainTabController(iftree, ifname, srvname, tnlname, lanClients, dhcpClients, routes, devicemac) {
    if (jsConnsMainTabController.superclass.constructor.call(this), ifname && iftree[ifname]) {
        var ifnode = iftree[ifname];
        if (srvname && ifnode.services && ifnode.services[srvname]) {
            var service = ifnode.services[srvname];
            tnlname && service.tunnels && service.tunnels[tnlname] || (tnlname = null)
        }
        else ifname = null, srvname = null, tnlname = null
    }
    else ifname = null, srvname = null, tnlname = null;
    this.onblankchange = function() {
        var general = this.getChild("general"),
            ifnode = general.model.ifnode,
            service = general.model.service,
            srvname = general.model.srvname,
            tunnel = general.model.tunnel,
            tnlname = general.model.tnlname,
            other = (general.model.ifname, this.getChild("other")),
            isadding = "create" == srvname || "create" == tnlname,
            wizard = this.model.iftree.wizard,
            L2L3 = other.getChild("L2L3"),
            blocks = this.model.blocks,
            wansIGMP = getWansIGMP(iftree, _.union(ifnode.needDelete, [service.ifname, tunnel ? tunnel.ifname : null]));
        switch (ifnode.wizard = wizard, ifnode.blocks = blocks, ifnode.type) {
            case "atm":
                blocks ? L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController, "L2") : (L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsATMSettingsController(ifnode, isadding), "L2"), L2L3.getChild("L2").model.iftree = this.model.iftree);
                break;
            case "ethernet":
            case "ptm":
            case "bridge":
                ifnode.is_wan || !blocks ? (L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsEthSettingsController(ifnode, isadding, devicemac), "L2"), L2L3.getChild("L2").model.lanClients = this.model.lanClients) : L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController, "L2");
                break;
            case "3g":
            case "lte":
            case "usb":
                L2L3.changeChild(L2L3.getChild("L2").thisInx, new js3GSettingsController(ifnode, isadding, service), "L2");
                break;
            case "auto":
                L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController, "L2")
        }
        service.contype = ifnode.contype ? ifnode.contype : getConnType(ifnode, service, tunnel), service.is_wan = !0, service.level = 3, service.wizard = wizard, service.blocks = blocks, this.contype = service.contype;
        var miscL3 = new jsMiscSettingsController(service, isadding, wansIGMP);
        switch (wizard && !tunnel ? L2L3.changeChild(L2L3.getChild("name").thisInx, new jsInputController(service.name), "name") : L2L3.changeChild(L2L3.getChild("name").thisInx, new jsController, "name"), String(service.type)) {
            case "ppp":
            case "pppv6":
            case "pppdual":
            case "3g":
                blocks ? L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3") : (new jsMiscSettingsController(service, isadding, wansIGMP), L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3")), L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsPPPSettingsController(service, isadding), "L3");
                break;
            case "ipv6":
                switch (service.contype) {
                    case "staticv6":
                        blocks ? L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3") : L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsStatIPv6SettingsController(service, isadding), "L3"), blocks ? L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3") : L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
                        break;
                    case "dynamicv6":
                        blocks ? L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3") : L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsDinIPv6SettingsController(service, isadding), "L3"), blocks ? L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3") : L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3")
                }
                break;
            case "ip":
                switch (service.contype) {
                    case "static":
                    case "statpptp":
                    case "statl2tp":
                    case "statpppoe":
                    case "statpptpv6":
                    case "statl2tpv6":
                    case "ipoa":
                    case "statkab":
                        blocks ? L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3") : L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsStatIPSettingsController(service, isadding), "L3"), ifnode.is_wan || (blocks ? service && service.dhcpd && (service.dhcpd.blocks = service.blocks, other.changeChild(other.getChild("DHCP").thisInx, new jsController, "DHCP"), other.changeChild(other.getChild("statDHCP").thisInx, new jsController, "statDHCP")) : service && service.dhcpd && (other.changeChild(other.getChild("DHCP").thisInx, new jsDhcpServerController(service.dhcpd), "DHCP"), other.changeChild(other.getChild("statDHCP").thisInx, new jsDhcpServerMacController(service.dhcpd, this.model.lanClients, this.model.dhcpClients), "statDHCP"))), L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3");
                        break;
                    case "dynamic":
                    case "dynpptp":
                    case "dynpppoe":
                    case "dynl2tp":
                    case "dynpptpv6":
                    case "dynl2tpv6":
                    case "lte":
                    case "dynkab":
                        blocks ? L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3") : L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsDinIPSettingsController(service, isadding), "L3"), blocks ? L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3") : L2L3.changeChild(L2L3.getChild("miscL3").thisInx, miscL3, "miscL3")
                }
                break;
            case "bridge":
            case "auto":
                L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3"), L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3");
                break;
            case "notype":
                L2L3.changeChild(L2L3.getChild("L3").thisInx, new jsController, "L3"), L2L3.changeChild(L2L3.getChild("L2").thisInx, new jsController, "L2"), L2L3.changeChild(L2L3.getChild("miscL3").thisInx, new jsController, "miscL3"), L2L3.changeChild(L2L3.getChild("VLAN").thisInx, new jsController(service, isadding), "VLAN")
        }
        if ("notype" != service.contype && (service.vlan && getObjectLength(service.vlan) ? L2L3.changeChild(L2L3.getChild("VLAN").thisInx, new jsBCMVlanSettingsController(service, isadding), "VLAN") : L2L3.changeChild(L2L3.getChild("VLAN").thisInx, new jsController(service, isadding), "VLAN")), tunnel) {
            tunnel.contype = service.contype, tunnel.is_wan = !0, tunnel.level = 4, tunnel.wizard = wizard, tunnel.blocks = blocks;
            var VPN = other.changeChild(other.getChild("VPN").thisInx, new jsFieldSetController, "VPN");
            switch (wizard && VPN.addChild(new jsInputController(tunnel.name), "name"), tunnel.type) {
                case "ppp":
                    tunnel.level = 3, VPN.addChild(new jsPPPSettingsController(tunnel, isadding), "PPP");
                    break;
                case "pptp":
                case "l2tp":
                case "ppp":
                    VPN.addChild(new jsPPPSettingsController(tunnel, isadding), "PPP");
                    break;
                case "624":
            }
            var miscVPN = new jsMiscSettingsController(tunnel, isadding, wansIGMP);
            blocks || VPN.addChild(miscVPN, "misc")
        }
        else other.changeChild(other.getChild("VPN").thisInx, new jsController, "VPN");
        return !0
    }, this.getIfaceByName = function(ifname) {
        return this.model.iftree[ifname]
    }, this.changeModel(new jsConnsMainTabModel(iftree, lanClients, dhcpClients, routes)), this.isadding = !ifname;
    var wizard = this.model.iftree.wizard;
    wizard && this.addChild(new jsCableStatController, "cable"), this.addChild(new jsGeneralSettingsController(iftree, ifname, srvname, tnlname, "services"), "general");
    var other = this.addChild(new jsFieldSetController, "other"),
        L2L3 = other.addChild(new jsFieldSetController, "L2L3");
    L2L3.addChild(new jsController, "name"), L2L3.addChild(new jsController, "L2"), L2L3.addChild(new jsController, "L3"), L2L3.addChild(new jsController, "miscL3"), L2L3.addChild(new jsController, "VLAN"), other.addChild(new jsController, "DHCP"), other.addChild(new jsController, "statDHCP"), other.addChild(new jsController, "VPN"), this.addChild(new jsFieldSetController, "summary"), wizard && this.addChild(new jsCheckWANController, "checkwan"), window.engine && window.engine.candyBlack && this.addChild(new jsBubblerController, "tip"), this.addEventHandler("blankchange", this.onblankchange), this.ifaceTypes.client = {
        type: jsConnsMainTabClientView
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsConnsMainTabSummaryView
    }, this.ifaceTypes.summary.options = {
        nothing: !0,
        inputPadding: "200px",
        summary: !0
    }, wizard && (this.nextIface = "summary", this.addIface(), this.nextIface = "client"), this.contype = null
}

function jsConnsMainTabClientView(ctrl, viewInx, options) {
    var obj, iftree = (ctrl.model.ifnode, ctrl.model.service, ctrl.model.tunnel, ctrl.model.iftree);
    ctrl.model.isadding, this.onmodeswitch = function(value) {
        var L2L3 = this.ctrl.getChild("other", "L2L3");
        L2L3.getChild("L2").event("modeswitch", value), L2L3.getChild("L3").event("modeswitch", value), L2L3.getChild("miscL3").event("modeswitch", value), L2L3.getChild("VLAN").event("modeswitch", value);
        var VPN = this.ctrl.getChild("other", "VPN");
        for (var i in VPN.children) VPN.children[i].event("modeswitch", value);
        return this.setOption("brief", value), !1
    }, this.drawView = function() {
        this.options.nooverlay || this.showModalOverlay("wanBuildForm"), setTimeout(context(this).callback(function() {
            var general = this.getChild("general");
            if (general.options.hide = !general.ctrl.model.ifnode.is_wan, jsConnsMainTabClientView.superclass.drawView.call(this), "notype" == this.getChild("general").getChild("type").ctrl.model.value ? this.disableButton("save") : this.enableButton("save"), this.ctrl.event("drawsummaryrq", this.getChild("summary").options.viewBoxSel), this.ctrl.model.iftree.wizard || this.ctrl.event("blankchange"), this.ctrl.model.iftree.wizard && this.goFirstStep(), disableFlag("ifaces.wan")) {
                var service = this.ctrl.getChild("general").model.service,
                    tunnel = this.ctrl.getChild("general").model.tunnel;
                if (tunnel) var contype = tunnel.contype;
                else var contype = service.contype;
                for (var buttons = this.options.buttons, i = 0; i < buttons.length; i++)("save" == buttons[i].name && "pppoe" != contype || "del" == buttons[i].name) && (this.disableButton(buttons[i].name), function disableFields() {
                    for (var child, i = 0; i < this.ctrl.children.length; i++)
                        if (child = this.getChild(i), child && is.func(child.disable)) {
                            var alias = child.ctrl.alias;
                            if ("userName" == alias || "noAuth" == alias || "password" == alias || "confirm" == alias) continue;
                            child.disable()
                        }
                        else child instanceof jsCSideView && disableFields.call(child)
                }.call(this))
            }
            this.hideModalOverlay(), window.engine && window.engine.candyBlack && this.getChild("tip").show()
        }), 10)
    }, jsConnsMainTabClientView.prototype.onblankchange = function() {
        var other = this.getChild("other"),
            general = this.getChild("general");
        "notype" == general.getChild("type").ctrl.model.value ? this.disableButton("save") : this.enableButton("save");
        var name = other.ctrl.getChild("L2L3", "name");
        name instanceof jsInputController && (name.nextIface = "input", name.ifaceTypes.input.options = {
            humanName: "wanNameWiz",
            mandatory: !0
        });
        var VPN = other.ctrl.getChild("VPN");
        if (VPN instanceof jsFieldSetController && (VPN.nextIface = "client", VPN.ifaceTypes.client.options = {
                nothing: !0
            }, this.ctrl.model.iftree.wizard && (name = VPN.getChild("name"), name.nextIface = "input", name.ifaceTypes.input.options = {
                humanName: "wanNameWiz",
                mandatory: !0
            })), other.options.wizard = !1, general.options.wizard = !1, other.options.inwizard = this.options.wizard, other.options.brief = this.options.brief, other.options.buttonsInline = !0, other.constructor(other.ctrl, other.viewInx, other.options ? other.options : {}), other.options.wizard = this.options.wizard, general.options.wizard = this.options.wizard, other.activeTab = 0, other.drawView(), this.ctrl.model.iftree.needPIN, "3g" == this.getChild("general").ctrl.model.ifnode.type && this.ctrl.model.iftree.needPIN) {
            var needPINDialog = this.getChild("needPINDialog");
            needPINDialog instanceof jsFieldSetClientView && needPINDialog.show()
        }
        return !0
    }, this.onshowneedpindialogrq = function() {
        if ("3g" == this.getChild("general").ctrl.model.ifnode.type && this.ctrl.model.iftree.needPIN) {
            var needPINDialog = this.getChild("needPINDialog");
            needPINDialog instanceof jsFieldSetClientView && needPINDialog.show()
        }
        return !1
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias;
        switch (alias) {
            case "useipv6":
                var DHCP = this.getChild("other", "DHCP");
                DHCP instanceof jsDhcpServerClientView && obj.value;
                break;
            case "vpi":
            case "vci":
                this.getChild("general").autoname(), this.getChild("general").updateModel();
                break;
            case "port":
                this.getChild("L2L3", "L2").event("portchange", obj.value)
        }
        return !1
    }, this.updateModel = function() {
        var res = jsConnsMainTabClientView.superclass.updateModel.call(this),
            general = this.getChild("general"),
            model = general.ctrl.model;
        if (model.service.dhcpd) {
            var DHCP = this.getChild("other", "DHCP"),
                updateModelDHCP = DHCP.updateModel;
            DHCP.updateModel = function() {
                return !0
            }
        }
        if (res && model.service.dhcpd) {
            if (!model.ifnode.is_wan && model.service.dhcpd) {
                var begin, end, IP = this.getChild("other", "L2L3", "L3"),
                    DHCP = this.getChild("other", "DHCP");
                DHCP.getChild("mode").updateModel();
                var dhcpdmode = DHCP.getChild("mode").ctrl.model.value;
                if ("en" == dhcpdmode && IP.ctrl.isIpOrMaskChanged && DHCP.correctDHCP(IP.getChild("ip").ctrl.model, IP.getChild("mask").ctrl.model)) {
                    var divMain = DHCP.getChild("divMain");
                    begin = divMain.getChild("begin"), end = divMain.getChild("end"), confirm(lng("dhcpCorrectReq") + " " + lng("dhcpNewPool") + " " + begin.ctrl.model.toString() + " ... " + end.ctrl.model.toString()) ? (begin.updateView(), end.updateView()) : res &= !1, IP.ctrl.isIpOrMaskChanged = !1
                }
            }
            DHCP.updateModel = updateModelDHCP, res &= DHCP.updateModel()
        }
        return res
    }, this.del = function() {
        this.showModalOverlay(), this.ctrl.getParent(1).event("deleterq")
    }, this.ondisablebuttons = function() {
        var buttons = this.options.buttons;
        for (var i in buttons) this.disableButton(buttons[i].name);
        return !1
    }, this.onenablebuttons = function() {
        var buttons = this.options.buttons;
        for (var i in buttons) this.enableButton(buttons[i].name);
        return !1
    }, this.modeswitchshow = function() {
        window.engine && window.engine.simpleAir && rootCtrl.event("modeswitchshowrq"), window.engine && window.engine.candyBlack && (rootCtrl.event("modeswitchshowrq"), this.getChild("tip").autoShow(), this.getChild("tip").startHide())
    }, this.modeswitchhide = function() {
        window.engine && window.engine.simpleAir && rootCtrl.event("modeswitchhiderq"), window.engine && window.engine.candyBlack && (rootCtrl.event("modeswitchhiderq"), this.getChild("tip").autoHide())
    }, this.setSummaryButtons = function() {
        var buttons = this.options.buttons = [];
        buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.summaryPrev
        }), buttons.push({
            name: "save",
            value: "button_save",
            handler: this.save
        }), this.ctrl.event("updatesummaryrq")
    }, this.setVPNButtons = function() {
        var buttons = this.options.buttons;
        buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.VPNPrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.VPNNext
        })
    }, this.goFirstStep = function() {
        this.options.buttons = [{
            name: "next",
            value: "button_next",
            handler: this.cableNext
        }], this.switchChild("cable"), this.updateButtons()
    }, this.cableNext = function() {
        this.ctrl.event("checkcable", null, !0)
    }, this.oncableready = function(ready) {
        if (ready || confirm(lng("wancablewarn"))) {
            var buttons = [];
            if (this.options.buttons = buttons, this.ctrl.isadding) {
                var general = this.getChild("general");
                getObjectLength(provList) < 2 ? (buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.typePrev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.typeNext
                }), general.switchChild("type")) : (buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.provPrev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.provNext
                }), general.switchChild("provstep")), this.switchChild("general"), this.updateButtons(), this.modeswitchhide()
            }
            else switch (this.ctrl.contype) {
                case "pptp":
                case "l2tp":
                case "624":
                    var other = this.getChild("other");
                    buttons.push({
                        name: "next",
                        value: "button_next",
                        handler: this.L2L3Next
                    }), other.activeTab = other.getChild("L2L3").ctrl.thisInx, this.switchChild("other"), this.updateButtons(), this.modeswitchshow()
            }
            return getObjectLength(provList) < 2 && (this.updateButtons(), "notype1" == general.ctrl.model.ifnode.contype ? this.disableButton("next") : this.enableButton("next")), !1
        }
    }, this.provNext = function() {
        var general = this.getChild("general"),
            buttons = [];
        this.options.buttons = buttons;
        var provname = general.ctrl.model.templates.provname;
        if (provname && "man" != provname) {
            if (this.getChild("general").updateModel()) {
                this.ctrl.event("blankchange"), buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.L2L3Prev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.L2L3Next
                });
                var other = this.getChild("other");
                other.ctrl.activeTab = other.ctrl.getChild("L2L3").thisInx, this.switchChild("other"), this.modeswitchshow()
            }
        }
        else buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.typePrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.typeNext
        }), general.switchChild("type"), this.modeswitchhide();
        this.updateButtons(), "notype" == general.ctrl.model.ifnode.contype ? this.disableButton("next") : this.enableButton("next")
    }, this.provPrev = function() {
        this.options.buttons = [{
            name: "next",
            value: "button_next",
            handler: this.cableNext
        }], this.switchChild("cable"), this.updateButtons()
    }, this.typeNext = function() {
        var buttons = [];
        this.options.buttons = buttons;
        var general = this.getChild("general"),
            model = general.ctrl.model;
        if (getObjectLength(model.templates[model.ifnode.contype]) > 1) buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.portPrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.portNext
        }), general.switchChild("port"), this.modeswitchhide();
        else if (general.updateModel()) {
            this.ctrl.event("blankchange");
            var other = this.getChild("other");
            switch (this.ctrl.contype) {
                case "pptp":
                case "l2tp":
                case "624":
                    this.setVPNButtons(), other.switchChild("VPN");
                    break;
                default:
                    buttons.push({
                        name: "prev",
                        value: "button_prev",
                        handler: this.L2L3Prev
                    }), buttons.push({
                        name: "next",
                        value: "button_next",
                        handler: this.L2L3Next
                    }), other.switchChild("L2L3")
            }
            this.switchChild("other"), this.modeswitchshow()
        }
        this.updateButtons()
    }, this.typePrev = function() {
        var buttons = [];
        this.options.buttons = buttons, getObjectLength(provList) < 2 ? (buttons.push({
            name: "next",
            value: "button_next",
            handler: this.cableNext
        }), this.switchChild("cable")) : (buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.provPrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.provNext
        }), this.getChild("general").switchChild("provstep")), this.updateButtons()
    }, this.portNext = function() {
        var general = this.getChild("general"),
            other = this.getChild("other");
        if (general.updateModel()) {
            this.ctrl.event("blankchange");
            var buttons = [];
            switch (this.options.buttons = buttons, this.ctrl.contype) {
                case "pppoe":
                case "pppoev6":
                case "pppoedual":
                case "pppoa":
                case "static":
                case "dynamic":
                case "staticv6":
                case "dynamicv6":
                case "ipoa":
                case "3g":
                case "lte":
                case "bridge":
                case "statpptp":
                case "statpppoe":
                case "statl2tp":
                case "statpptpv6":
                case "statl2tpv6":
                case "dynpptp":
                case "dynpppoe":
                case "dynl2tp":
                case "dynpptpv6":
                case "dynl2tpv6":
                case "dynkab":
                case "statkab":
                    buttons.push({
                        name: "prev",
                        value: "button_prev",
                        handler: this.L2L3Prev
                    }), buttons.push({
                        name: "next",
                        value: "button_next",
                        handler: this.L2L3Next
                    }), other.ctrl.activeTab = other.ctrl.getChild("L2L3").thisInx;
                    break;
                case "pptp":
                case "l2tp":
                case "624":
                    buttons.push({
                        name: "prev",
                        value: "button_prev",
                        handler: this.VPNPrev
                    }), buttons.push({
                        name: "next",
                        value: "button_next",
                        handler: this.VPNNext
                    }), other.ctrl.activeTab = other.ctrl.getChild("VPN").thisInx
            }
            this.switchChild("other"), this.updateButtons(), this.modeswitchshow()
        }
    }, this.portPrev = function() {
        var buttons = [];
        this.options.buttons = buttons, getObjectLength(provList) > 1 && buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.typePrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.typeNext
        }), this.getChild("general").switchChild("type"), this.updateButtons()
    }, this.L2L3Next = function() {
        var L2L3 = this.getChild("other", "L2L3");
        if (L2L3.updateModel()) {
            var general = this.getChild("general"),
                model = general.ctrl.model;
            if (model.tunnel) "auto" == model.service.type || model.service.name || (model.service.name = general.ctrl.autoname(getConnType(model.ifnode, model.service)));
            else {
                var name = L2L3.getChild("name"),
                    value = name.ctrl.model.value;
                "" == value ? name.statusCode = "wanNameEmpty" : (name.statusCode = null, general.ctrl.model.service.name = value, general.ctrl.event("updatenamerq"), general.updateView()), name.setError()
            }
            var buttons = [];
            switch (this.options.buttons = buttons, this.ctrl.contype) {
                case "pppoe":
                case "pppoev6":
                case "pppoedual":
                case "pppoa":
                case "static":
                case "dynamic":
                case "staticv6":
                case "dynamicv6":
                case "ipoa":
                case "3g":
                case "lte":
                case "bridge":
                case "dynkab":
                case "statkab":
                    this.setSummaryButtons(), this.switchChild("summary"), this.modeswitchhide();
                    break;
                case "dynpptp":
                case "dynpppoe":
                case "dynl2tp":
                case "dynpptpv6":
                case "dynl2tpv6":
                case "statpptp":
                case "statpppoe":
                case "statl2tp":
                case "statpptpv6":
                case "statl2tpv6":
                    buttons.push({
                        name: "prev",
                        value: "button_prev",
                        handler: this.VPNPrev
                    }), buttons.push({
                        name: "next",
                        value: "button_next",
                        handler: this.VPNNext
                    }), this.getChild("other").switchChild("VPN"), this.modeswitchshow()
            }
            this.updateButtons()
        }
        else alert(lng("wanErrorMes"))
    }, this.L2L3Prev = function() {
        var buttons = [];
        this.options.buttons = buttons;
        var general = this.getChild("general"),
            model = general.ctrl.model;
        getObjectLength(model.templates[model.ifnode.contype]) > 1 ? (buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.portPrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.portNext
        }), general.switchChild("port")) : (getObjectLength(provList) > 1 && buttons.push({
            name: "prev",
            value: "button_prev",
            handler: this.typePrev
        }), buttons.push({
            name: "next",
            value: "button_next",
            handler: this.typeNext
        }), general.switchChild("type")), this.switchChild("general"), this.updateButtons(), this.modeswitchhide()
    }, this.VPNNext = function() {
        var VPN = this.getChild("other", "VPN");
        if (VPN.updateModel()) {
            var general = this.getChild("general"),
                name = VPN.getChild("name"),
                value = name.ctrl.model.value;
            "" == value ? name.statusCode = "wanNameEmpty" : (name.statusCode = null, general.ctrl.model.tunnel.name = value, general.ctrl.event("updatenamerq"), general.updateView()), name.setError();
            var buttons = [];
            this.options.buttons = buttons, this.setSummaryButtons(), this.switchChild("summary"), this.updateButtons(), this.modeswitchhide()
        }
    }, this.VPNPrev = function() {
        var buttons = (this.getChild("other", "VPN"), []);
        switch (this.options.buttons = buttons, this.ctrl.contype) {
            case "statpptp":
            case "statpppoe":
            case "statl2tp":
            case "statpptpv6":
            case "statl2tpv6":
            case "dynpptp":
            case "dynpppoe":
            case "dynl2tp":
            case "dynpptpv6":
            case "dynl2tpv6":
                buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.L2L3Prev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.L2L3Next
                }), this.getChild("other").switchChild("L2L3"), this.updateButtons(), this.modeswitchshow();
                break;
            case "pptp":
            case "l2tp":
            case "624":
                getObjectLength(provList) > 1 && buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.typePrev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.typeNext
                });
                var general = this.getChild("general");
                general.ctrl.activeTab = general.ctrl.getChild("type").thisInx, this.switchChild("general"), this.updateButtons(), this.modeswitchhide()
        }
    }, this.summaryPrev = function() {
        var other = this.getChild("other"),
            buttons = [];
        switch (this.options.buttons = buttons, this.ctrl.contype) {
            case "statpptp":
            case "statpppoe":
            case "statl2tp":
            case "statpptpv6":
            case "statl2tpv6":
            case "dynpptp":
            case "dynpppoe":
            case "dynl2tp":
            case "dynpptpv6":
            case "dynl2tpv6":
            case "pptp":
            case "l2tp":
            case "624":
                buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.VPNPrev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.VPNNext
                }), other.switchChild("VPN");
                break;
            case "pppoe":
            case "pppoev6":
            case "pppoedual":
            case "pppoa":
            case "static":
            case "dynamic":
            case "staticv6":
            case "dynamicv6":
            case "ipoa":
            case "3g":
            case "lte":
            case "bridge":
            case "dynkab":
            case "statkab":
                buttons.push({
                    name: "prev",
                    value: "button_prev",
                    handler: this.L2L3Prev
                }), buttons.push({
                    name: "next",
                    value: "button_next",
                    handler: this.L2L3Next
                }), other.switchChild("L2L3")
        }
        this.switchChild("other"), this.updateButtons(), this.modeswitchshow()
    }, this.save = function() {
        var res = this.updateModel();
        if (res) {
            var general = this.getChild("general"),
                model = general.ctrl.model;
            !this.ctrl.model.enIGMPGlobal && (model.service.igmp || model.tunnel && model.tunnel.igmp) && this.ctrl.model.jsonIGMP && !this.ctrl.model.jsonIGMP.enable && confirm(lng("wanEnIGMPMes")) && (this.ctrl.model.enIGMPGlobal = !0);
            var wansIGMP = getWansIGMP(iftree, _.union(model.ifnode.needDelete, [model.service.ifname, model.tunnel ? model.tunnel.ifname : null]));
            if (wansIGMP.length && model.service.igmp && "ppp" != model.service.type) return void alert(lng("wanIGMPErr"));
            if (model.ifnode.connection_mode && "VlanDefMode" == model.ifnode.connection_mode && is.object(model.service.vlan) && is.number(model.service.vlan.vlanid) && delete model.ifnode.needDelete, model.ifnode.needDelete && !confirm(lng("wandelwarn"))) return;
            this.showModalOverlay(), clearJSON(model.blankConn), this.ctrl.getParent().event("saverq")
        }
    }, this.onsavecomplete = function() {
        var wan = {},
            model = this.ctrl.getChild("general").model;
        wan.L2Type = model.ifnode.type, wan.medium = model.ifnode.medium, wan.contype = model.service.contype, "atm" == wan.L2Type ? (wan.vpi = model.ifnode.pvc_settings.vpi, wan.vci = model.ifnode.pvc_settings.vci) : wan.ifname = model.ifname, wan.serviceName = model.service.name, !no(model.tunnel) && getObjectLength(model.tunnel) > 0 && ("statpppoe" == model.ifnode.contype || "dynpppoe" == model.ifnode.contype ? wan.serviceName2 = model.tunnel.name : wan.tunnelName = model.tunnel.name), this.ctrl.getChild("checkwan").wan = wan, this.switchChild("checkwan"), this.options.buttons = [{
            name: "checkwan",
            value: "button_recheck",
            handler: function() {
                this.ctrl.getChild("checkwan").event("startcheckrq")
            }
        }, {
            name: "prev",
            value: "button_prev",
            handler: this.checkWANPrev
        }], this.options.buttons.push({
            name: "next",
            value: "button_next",
            handler: function() {
                this.ctrl.event("wanready", null, !0)
            }
        }), this.updateButtons(), this.ctrl.getChild("checkwan").event("startcheckrq")
    }, this.checkWANPrev = function() {
        this.setSummaryButtons(), this.switchChild("summary"), this.updateButtons()
    }, this.onnophyiface = function() {
        return this.disableButton("next"), !1
    }, this.onphyifacepresent = function() {
        return this.enableButton("next"), !1
    }, this.onnotype = function() {
        return this.disableButton("next"), !1
    }, this.viewInx = viewInx, this.ctrl = ctrl, this.options = options ? options : {}, this.blocks = ctrl.model.blocks, this.wizard = ctrl.model.iftree.wizard, this.options.brief = this.wizard, this.rejectDel = ctrl.model.rejectDel;
    var generalOpt = ctrl.getChild("general").ifaceTypes.client.options;
    generalOpt.wizard = this.wizard, generalOpt.hide = this.blocks, options.title = "wanMain", options.nothing = !0, window.engine && window.engine.candyBlack && (obj = ctrl.getChild("tip"), obj.ifaceTypes.client.options = {
        flow: "#pageToolbarModeSwitch",
        delay: 5e3,
        direction: "right",
        manual: !0,
        content: "modeswitchtip"
    }), jsConnsMainTabClientView.superclass.constructor.call(this, ctrl, viewInx, options), obj = ctrl.getChild("summary"), obj.nextIface = "client", this.bind("fieldchange", this.onfieldchange), this.bind("blankchange", this.onblankchange), this.bind("showneedpindialogrq", this.onshowneedpindialogrq), this.bind("nophyiface", this.onnophyiface), this.bind("phyifacepresent", this.onphyifacepresent), this.bind("notypedisablenext", this.onnotype), this.bind("modeswitch", this.onmodeswitch), this.bind("cableready", this.oncableready), this.bind("disablebuttons", this.ondisablebuttons), this.bind("enablebuttons", this.onenablebuttons), this.bind("savecomplete", this.onsavecomplete), this.options.buttons = [], this.wizard || this.blocks || this.options.buttons.push({
        name: "save",
        value: "button_save",
        handler: this.save
    }), ctrl.isadding || !ctrl.getChild("general").model.ifnode.is_wan || this.blocks || hideFlag("wan_button_del") || this.options.buttons.push({
        name: "del",
        value: "button_del",
        handler: this.del
    }), this.wizard && (this.options.wizard = !0, this.options.buttons.push({
        name: "next",
        value: "button_next",
        handler: this.firstStep
    }))
}

function jsConnsMainTabSummaryView(ctrl, viewInx, options) {
    ctrl.getChild("general").nextIface = "summary", ctrl.getChild("needPINDialog").nextIface = "stop", ctrl.getChild("cable").nextIface = "stop", ctrl.getChild("checkwan").nextIface = "stop", jsConnsMainTabSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsFieldSetClientView.prototype.drawView.call(this)
    }, this.ondrawsummaryrq = function(viewBoxSel) {
        return this.options.viewBoxSel = viewBoxSel, this.viewBoxSel = viewBoxSel, this.drawView(), !1
    }, this.onupdatesummaryrq = function() {
        this.updateView()
    }, this.onblankchange = function() {
        var other = this.getChild("other");
        for (var i in other.ctrl.children) other.ctrl.children[i].nextIface = "summary";
        var L2L3 = other.getChild("L2L3");
        L2L3.ctrl.nextIface = "client", L2L3.ctrl.getChild("L2").nextIface = "summary", L2L3.ctrl.getChild("L3").nextIface = "summary";
        var VPN = other.ctrl.getChild("VPN");
        VPN instanceof jsFieldSetController && (VPN.nextIface = "client", VPN.getChild("PPP").nextIface = "summary", VPN.getChild("misc").nextIface = "summary"), jsConnsMainTabSummaryView.superclass.onblankchange.call(this);
        var general = this.getChild("general");
        general.ctrl.model.tunnel ? other.getChild("VPN").getChild("name").hide() : L2L3.getChild("name").hide()
    }, this.bind("drawsummaryrq", this.ondrawsummaryrq), this.bind("updatesummaryrq", this.onupdatesummaryrq), this.bind("blankchange", this.onblankchange), this.bind("fieldchange", function() {
        return !1
    }), this.bind("cableready", function() {
        return !1
    }), this.bind("savecomplete", function() {
        return !1
    }), this.wizard = !1, this.options.wizard = !1, this.options.buttons = null
}

function jsCableStatController() {
    jsCableStatController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsCableStatClientView,
        options: {}
    }
}


function jsCableStatClientView(ctrl, viewInx, options){
	jsCableStatClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	this.drawView = function() {
		jsCableStatClientView.superclass.drawView.call(this);
		var img = 'image/master_ethernet.gif';
		var text = lng('quickInfoEth1');
		var text2 = lng('quickInfoEth2');
		$(this.viewBoxSel).html('<div class="picable"><img src="' + img + '" /></div><div class="picableInfo1">' + text + '</div><div class="picableInfo2">' + text2 + '</div><div class="clear"></div>');
	}
	
}

function pageDDNS() {
    pageDDNS.superclass.constructor.call(this), this._rules_limit = 1, this.ddns = null, this.ifacelist = null, this.usifacelist = null, this.$grid = null, this.services = [], this.services = _.union(this.services, [{
        service: "dlinkddns.com",
        system: "dyndns@dyndns.org",
        name: "DLinkDDNS"
    }, {
        service: "dyndns.com",
        system: "dyndns@dyndns.org",
        name: "DynDNS.com"
    }, {
        service: "ddns.net",
        system: "default@no-ip.com",
        name: "NoIP"
    }]), this.updateModel = function(status) {
        status.error |= !this.$grid.cleanErrors().checkMandatory(!0), this.status = status
    }, this.updateView = function(phase) {
        if (pageDDNS.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var header = [{
                index: "service",
                name: "ddnsService"
            }, {
                index: "host_name_all",
                name: "ddnsFullHostName"
            }, {
                index: "usr_name",
                name: "ddnsUserName"
            }, {
                index: "password",
                name: "ddnsUserPass"
            }, {
                index: "period",
                name: "ddnsPeriod"
            }];
            this.$grid = this.$box.html("				<div class='grid rm'></div>			").find(".grid").lightUIGrid(header, 0, {
                selectable: !0,
                clickable: !0
            }), this.usifacelist = [], _.invert(this.ifacelist);
            for (var index in this.ddns) {
                var rule = this.ddns[index];
                if (rule.service) var s = _.findWhere(this.services, {
                    service: rule.service
                });
                else {
                    var s = _.findWhere(this.services, {
                        system: rule.system
                    }) || {};
                    rule.service = s.service
                }
                var $row = this.$grid.addRow().row("last");
                $row.col("service").fieldval(s ? s.name || s.service : " - "), $row.col("host_name_all").fieldval(rule.host_name), $row.col("usr_name").fieldval(rule.usr_name), $row.col("password").fieldval(rule.pass), $row.col("period").fieldval(rule.period), $row.data("index", index)
            }
            this.cleanButtonBar().addButton("add").getButton("add").unbind("click.button").bind("click.button", callback(this, function() {
                this.edit()
            })), this.addButton("button_del").getButton("button_del").unbind("click.button").bind("click.button", callback(this, function() {
                this.remove()
            })), this.updateButtons(), this.$grid.bind("selection.grid", callback(this, function() {
                this.updateButtons()
            })), this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                this.edit($row.irow())
            }))
        }
    }, this.updateButtons = function() {
        var countIfacelist = _.difference(this.ifacelist, this.usifacelist).length;
        !countIfacelist || this._rules_limit && this.ddns.length > this._rules_limit - 1 || disableFlag(6) ? this.getButton("add").disable() : this.getButton("add").enable(), this.$grid.selection().length || disableFlag(6) ? this.getButton("button_del").enable() : this.getButton("button_del").disable()
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read([6, 120], callback(this, function(data) {
            this.ddns = is.RPC_SUCCESS(data.rq) ? data.rq.resident.ddns : null, this.ifacelist = CreateIfacesValset(is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, !0), this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.remove = function(index) {
        var rm_list = [];
        if (_.isNumber(index)) rm_list.push([6, this.ddns[index], index]);
        else
            for (var rm_rows = this.$grid.selection(), i = rm_rows.length; i > 0; i--) {
                var index = rm_rows.eq(i - 1).irow();
                rm_list.push([6, this.ddns[index], index])
            }
        rm_list.length && (rootView.showModalOverlay(), device.config.remove(rm_list, callback(this, function() {
            this.emit("updaterq")
        })))
    }, this.edit = function(index) {
        this.$box.unbind();
        var ruleNode = new ruleDDNS(index, this.ddns[index]);
        ruleNode.services = this.services, ruleNode.ifacelist = this.ifacelist, ruleNode.usifacelist = this.usifacelist, ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox), ruleNode.cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), ruleNode.addButton("button_del").getButton("button_del").bind("click.button", context(this).callback(function() {
            this.remove(ruleNode.index)
        })), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            ruleNode.deep.updateModel(), ruleNode.status.error || (rootView.showModalOverlay(), device.config.write(6, ruleNode.rule, ruleNode.index, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            })))
        })), disableFlag(6) && (ruleNode.getButton("button_save").disable(), ruleNode.getButton("button_del").disable()), _.isNumber(index) || ruleNode.getButton("button_del").hide()
    }, this.bind("updaterq", this.update)
}

function ruleDDNS(index, rule) {
    ruleDDNS.superclass.constructor.call(this), this.rule = rule || {}, this.index = _.isNumber(index) ? index : -1, this.add(new nodeDomainName("ddnsFullHostName", null, {
        mandatory: !0
    }), "host"), this.add(new nodeSelect("ddnsService", null, {
        mandatory: !0
    }), "service").add(new nodetext("ddnsUserName", null, {
        mandatory: !0
    }), "usr_name").add(new nodetext("ddnsUserPass", null, {
        mandatory: !0
    }), "password"), this.add(new nodenum("ddnsPeriod", null, {
        mandatory: !0
    }), "period"), this.updateView = function(phase) {
        if (ruleDDNS.superclass.updateView.apply(this, arguments), "back" == phase) {
            var rule = this.rule;
            this.child("host").val(rule.host_name), this.child("service").val(rule.service), this.child("service").cleanOptions();
            for (var i in this.services) this.child("service").addOption(this.services[i].name || this.services[i].service, this.services[i].service);
            this.child("usr_name").val(rule.usr_name), this.child("password").val(rule.pass), this.child("period").val(rule.period)
        }
    }, this.updateModel = function(status) {
        this.rule = {};
        var s = _.findWhere(this.services, {
            service: this.child("service").val()
        }) || {};
        this.rule.system = s.system, this.rule.host_name = this.child("host").val(), this.rule.service = this.child("service").val(), this.rule.period = this.child("period").val(), this.rule.usr_name = this.child("usr_name").val(), this.rule.pass = this.child("password").val(), this.status = status
    }
}

function pageDeviceInfo() {
    pageDeviceInfo.superclass.constructor.call(this), this.info = null, this.add(new nodestatic("devInfoName"), "name").add(new nodestatic("devInfoVersion"), "version").add(new nodestatic("devInfoBuildTime"), "buildtime").add(new nodestatic("devInfoVendor"), "vendor").add(new nodestatic("devInfoBugs"), "bugs").add(new nodestatic("devInfoSummary"), "summary").add(new nodestatic("devInfoBoardId", "", {
        hidden: !0
    }), "boardid"), this.add(new nodestatic("devInfoSoftRev"), "softrev"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function() {
        pageDeviceInfo.superclass.updateView.apply(this, arguments)
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(67, callback(this, function(data) {
            this.deep.updateView();
            var info = this.info = is.RPC_SUCCESS(data) ? data.resident : null;
            info && (info.fw_bugs = info.fw_bugs.replace("<", "").replace(">", ""), this.child("name").val(info.fw_name), this.child("version").val("<a onclick=\"window.location.hash='#system/firmware';return false;\" href='#'>" + info.fw_version + "</a>"), this.child("buildtime").val(info.fw_date), this.child("vendor").val(info.fw_vendor), this.child("bugs").val("<a href='mailto:" + info.fw_bugs + "'>" + info.fw_bugs + "</a>"), this.child("summary").val(info.fw_summary)), this.child("softrev").val("8fe7b335bdd79cf7044c4fd76628fe5e54d34b19"), rootView.hideModalOverlay()
        }))
    })
}

function jsDhcpServerModel(service, ifaceslist) {
    jsDhcpServerModel.superclass.constructor.call(this), this.service = service, this.dhcpd = service.dhcpd || {}, this.ifaceslist = ifaceslist
}

function jsDhcpServerController(dhcpd, ifaceslist) {
    jsDhcpServerController.superclass.constructor.call(this), this.initForm = function() {
        var service = this.model.service,
            dhcpd = this.model.dhcpd;
        if (dhcpd.enable && !dhcpd.relay ? this.getChild("mode").model.value = "en" : dhcpd.enable && dhcpd.relay ? (this.getChild("mode").model.value = "relay", this.getChild("divRelay", "ip").model.setParts(dhcpd.relay.ip)) : this.getChild("mode").model.value = "dis", modeAP() || (divMain.getChild("dnsRelay").model.value = dhcpd.dns_relay), divMain = this.getChild("divMain"), divMain.getChild("tftp_ip").model.setParts(dhcpd.tftp_ip), is.unset(dhcpd.start_ip) && service.ip) {
            var arrIp = service.ip.split(".");
            arrIp[3] = "255" == arrIp[3] ? "1" : parseFloat(arrIp[3]) + 1;
            var tempIp = arrIp[0] + "." + arrIp[1] + "." + arrIp[2] + "." + arrIp[3];
            dhcpd.start_ip = tempIp
        }
        if (divMain.getChild("begin").model.setParts(dhcpd.start_ip), is.unset(dhcpd.end_ip) && service.ip) {
            var arrIp = service.ip.split(".");
            arrIp[3] = "255" == arrIp[3] ? "100" : parseFloat(arrIp[3]) < 155 ? parseFloat(arrIp[3]) + 99 : "255";
            var tempIp = arrIp[0] + "." + arrIp[1] + "." + arrIp[2] + "." + arrIp[3];
            dhcpd.end_ip = tempIp
        }
        divMain.getChild("end").model.setParts(dhcpd.end_ip), divMain.getChild("lease").model.value = dhcpd.lease && "NaN" != parseInt(dhcpd.lease, 10) ? dhcpd.lease / 60 : "1440", divMain.getChild("gwip").model.setParts(dhcpd.gwip), divMain.getChild("dns_prim").model.setParts(dhcpd.dns_prim), divMain.getChild("dns_sec").model.setParts(dhcpd.dns_sec)
    }, this.changeModel(new jsDhcpServerModel(dhcpd, ifaceslist)), this.ifaceTypes.client = {
        type: jsDhcpServerClientView
    }, this.ifaceTypes.client.options = {
        nothing: !0
    }, this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController, "mode");
    var divRelay = this.addChild(new jsFieldSetController, "divRelay");
    divRelay.addChild(new jsIPv4Controller, "ip");
    var divMain = this.addChild(new jsFieldSetController, "divMain");
    modeAP() || divMain.addChild(new jsInputController, "dnsRelay"), divMain.addChild(new jsIPv4Controller, "tftp_ip"), divMain.addChild(new jsIPv4Controller, "begin"), divMain.addChild(new jsIPv4Controller, "end"), divMain.addChild(new jsIPv4Controller, "gwip"), divMain.addChild(new jsIPv4Controller, "dns_prim"), divMain.addChild(new jsIPv4Controller, "dns_sec"), divMain.addChild(new jsInputController, "lease"), this.initForm()
}

function jsDhcpServerClientView(ctrl, viewInx, options) {
    var obj;
    this.drawView = function() {
        jsDhcpServerClientView.superclass.drawView.call(this), this.ctrl.event("drawn")
    }, this.ondrawn = function() {
        return this.adaptForm(), !1
    }, this.onfieldchange = function(obj) {
        return obj.view.ctrl.alias, this.getChild("mode").updateModel(), this.adaptForm(), !1
    }, this.adaptForm = function() {
        switch (this.ctrl.getChild("mode").model.value) {
            case "en":
                this.getChild("divRelay").hide(), this.getChild("divMain").show();
                break;
            case "dis":
                this.getChild("divRelay").hide(), this.getChild("divMain").hide();
                break;
            case "relay":
                this.getChild("divRelay").show(), this.getChild("divMain").hide()
        }
    }, this.correctDHCP = function(ipref, maskref, div) {
        var ip, mode, res = !1;
        if (div && "divIPv6Params" == div.ctrl.alias);
        else if (mode = this.getChild("mode"), !mode.updateModel()) return res;
        if (ipref instanceof jsSubNetIPModel && (ip = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero)), maskref) {
            var i, n, mask = new jsSubNetIPModel(maskref.bits, maskref.toString(), maskref.radix, maskref.delim, maskref.expandZero),
                subnet = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero),
                startPartInx = null,
                partMask = Math.pow(2, mask.partBitCount) - 1;
            for (i = subnet.parts.length - 1; i >= 0; i--)
                if (subnet.parts[i] = ip.parts[i] & mask.parts[i], n = Math.log((partMask & ~mask.parts[i]) + 1) / Math.LN2, n.toFixed(0) != n) return void alert(lng("dhcpMaskHoleRidden"))
        }
        else {
            var subnet = new jsSubNetIPModel(ipref.bits, ipref.toString(), ipref.radix, ipref.delim, ipref.expandZero);
            subnet.applyMask();
            var mask = new jsSubNetIPModel(ipref.bits, ipref.toString()),
                m = mask.getMaskParts();
            mask.parts = m, mask.bimask = mask.bits;
            var startPartInx = null,
                partMask = Math.pow(2, mask.partBitCount) - 1
        }
        var rangeStart = new jsSubNetIPModel(subnet.bits, subnet.toString(), subnet.radix, subnet.delim, subnet.expandZero),
            rangeEnd = new jsSubNetIPModel(subnet.bits, subnet.toString(), subnet.radix, subnet.delim, subnet.expandZero);
        for (i in mask.parts) rangeEnd.parts[i] = partMask & ~mask.parts[i] | subnet.parts[i], no(startPartInx) && mask.parts[i] < partMask && (startPartInx = i);
        if (rangeEnd.parts[rangeEnd.parts.length - 1]--, rangeStart.parts[rangeStart.parts.length - 1]++, rangeEnd.parts[rangeEnd.parts.length - 1] > rangeStart.parts[rangeStart.parts.length - 1]) {
            var divMain = div ? div : this.getChild("divMain"),
                begin = divMain.ctrl.getChild("begin").model,
                end = divMain.ctrl.getChild("end").model;
            if (ip.parts[startPartInx] - rangeStart.parts[startPartInx] > rangeEnd.parts[startPartInx] - ip.parts[startPartInx]) {
                for (i in begin.parts) begin.parts[i] = rangeStart.parts[i], end.parts[i] = ip.parts[i];
                end.parts[ip.parts.length - 1]--
            }
            else {
                for (i in begin.parts) begin.parts[i] = ip.parts[i], end.parts[i] = rangeEnd.parts[i];
                begin.parts[ip.parts.length - 1]++
            }
            res = !0
        }
        else alert(lng("dhcpCorrectImpos"));
        return res
    }, this.updateModel = function(needCorrect) {
        var res = jsDhcpServerClientView.superclass.updateModel.call(this);
        if (res) {
            var dhcpd = this.ctrl.model.dhcpd,
                dhmode = this.getChild("mode").ctrl.model.value;
            if ("dis" != dhmode && (dhcpd.relay = null, dhcpd.start_ip = null, dhcpd.end_ip = null, dhcpd.lease = null), modeAP() || (dhcpd.dnsRelay = null), dhcpd.enable = "en" == dhmode || "relay" == dhmode, "relay" == dhmode) dhcpd.relay = {
                ip: this.getChild("divRelay", "ip").ctrl.model.toString()
            };
            else if ("en" == dhmode) {
                var dhcpdDivMain = this.getChild("divMain");
                dhcpd.tftp_ip = dhcpdDivMain.getChild("tftp_ip").ctrl.model.toString(), dhcpd.start_ip = dhcpdDivMain.getChild("begin").ctrl.model.toString(), dhcpd.end_ip = dhcpdDivMain.getChild("end").ctrl.model.toString(), dhcpd.lease = dhcpdDivMain.getChild("lease").ctrl.model.value, dhcpd.lease && (dhcpd.lease = 60 * dhcpd.lease), modeAP() || (dhcpd.dns_relay = dhcpdDivMain.getChild("dnsRelay").ctrl.model.value), dhcpd.gwip = dhcpdDivMain.getChild("gwip").ctrl.model.toString(), dhcpd.dns_prim = dhcpdDivMain.getChild("dns_prim").ctrl.model.toString(), dhcpd.dns_sec = dhcpdDivMain.getChild("dns_sec").ctrl.model.toString()
            }
            if (needCorrect) {
                var dhcpdDivMain = this.getChild("divMain");
                dhcpd.start_ip = dhcpdDivMain.getChild("begin").ctrl.model.toString(), dhcpd.end_ip = dhcpdDivMain.getChild("end").ctrl.model.toString()
            }
        }
        return res
    }, this.blocks = ctrl.model.dhcpd.blocks, this.ifaceslist = ctrl.model.ifaceslist, options.title = lng("dhcpMain"), obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "dhcpMain"
    }, this.blocks && (obj.ifaceTypes.separator.options.hide = !0);
    var modeList = {};
    modeList.dhcpModeEn = "en", modeList.dhcpModeDis = "dis", modeAP() || (modeList.dhcpModeRelay = "relay"), obj = ctrl.getChild("mode"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
        humanName: "dhcpMode",
        valset: modeList
    }, this.blocks && (obj.ifaceTypes.select.options.humanName = "dhcpModeBlock");
    var divRelay = ctrl.getChild("divRelay");
    divRelay.nextIface = "client", divRelay.ifaceTypes.client.options = {
        nothing: !0
    }, obj = divRelay.getChild("ip"), opt = obj.ifaceTypes.client.options, opt.humanName = "dhcpExtIp";
    var divMain = ctrl.getChild("divMain");
    divMain.nextIface = "client", divMain.ifaceTypes.client.options = {
        nothing: !0
    }, modeAP() || (obj = divMain.getChild("dnsRelay"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "dnsRelay",
        valset: {
            on: !0,
            off: !1
        }
    }), obj = divMain.getChild("tftp_ip"), opt = obj.ifaceTypes.client.options, opt.humanName = "tftp_ip", opt.optional = !0, opt.hide = !0, obj = divMain.getChild("begin"), opt = obj.ifaceTypes.client.options, opt.humanName = "dhcpBegin", obj = divMain.getChild("end"), opt = obj.ifaceTypes.client.options, opt.humanName = "dhcpEnd", obj = divMain.getChild("gwip"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanGwIp", opt.optional = !0, modeAP() || (opt.hide = !0), obj = divMain.getChild("dns_prim"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanPrimDns", opt.optional = !0, modeAP() || (opt.hide = !0), obj = divMain.getChild("dns_sec"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanSecDns", opt.optional = !0, modeAP() || (opt.hide = !0), obj = divMain.getChild("lease"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "dhcpLease",
        minval: 2
    }, jsDhcpServerClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("drawn", this.ondrawn), this.bind("fieldchange", this.onfieldchange)
}

function jsDhcpServerMacModel(dhcpd, lanClients, dhcpClients) {
    jsDhcpServerMacModel.superclass.constructor.call(this), this.dhcpd = dhcpd, this.lanClients = lanClients, this.dhcpClients = dhcpClients
}

function jsDhcpServerMacController(dhcpd, lanClients, dhcpClients) {
    jsDhcpServerMacController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsDhcpServerMacClientView
    }, this.ifaceTypes.client.options = {
        inputPadding: "200px",
        simple: !0
    }, this.changeModel(new jsDhcpServerMacModel(dhcpd, lanClients, dhcpClients)), this.addChild(new jsDecorController, "desc"), this.addChild(new jsMACRuleController, "clients")
}

function jsDhcpServerMacClientView(ctrl, viewInx, options) {
    this.onruleselect = function($obj) {
        var $row = $grid.addRow().row("last");
        return $row.col("ip").html($obj.col("ip").html()), $row.col("mac").html($obj.col("mac").html()), $row.col("host").html($obj.col("host").html()).click(), !1
    }, this.drawView = function() {
        jsDhcpServerMacClientView.superclass.drawView.call(this), this.updateView()
    }, this.updateView = function() {
        var reserved = [],
            dhcpd = this.ctrl.model.dhcpd;
        is.object(dhcpd) && is.array(dhcpd.reserved) && (reserved = dhcpd.reserved);
        var gridID = gID.get();
        $(this.options.childBoxSel).append("<div id='" + gridID + "' class='dhcpd' ></div>");
        var header = [{
            index: "ip",
            name: "IP"
        }, {
            index: "mac",
            name: "MAC"
        }, {
            index: "host",
            name: "Host"
        }];
        $grid = $("#" + gridID).lightUIGrid(header, reserved.length, {
            selectable: !0
        }), $grid.colEditable("ip", "ipv4", {
            mandatory: !0
        }), $grid.colEditable("mac", "mac"), $grid.colEditable("host", "text"), $grid.bind("selection.grid", context(this).callback(this.updateRuleButtons)), $grid.bind("stopEditing.grid", context(this).callback(this.updateRuleButtons)), $grid.bind("startEditing.grid", context(this).callback(function() {
            this.disableButton("delRule"), this.disableButton("addRule")
        })), this.disableButton("delRule");
        for (var $row, obj, i = 0; i < reserved.length; i++) obj = reserved[i], $row = $grid.row(i), $row.col("ip").html(obj.ip), $row.col("mac").html(obj.mac), $row.col("host").html(obj.host)
    }, this.updateModel = function() {
        this.statusCode = null;
        var res = jsDhcpServerMacClientView.superclass.updateModel.call(this);
        if (res) {
            res = this.checkRule();
            var dhcpd = this.ctrl.model.dhcpd;
            if (res && is.object(dhcpd)) {
                dhcpd.reserved = [];
                for (var $row, obj, i = 0; i < $grid.nrow(); i++) obj = {}, $row = $grid.row(i), obj.ip = $row.col("ip").html(), obj.mac = $row.col("mac").html(), obj.host = $row.col("host").html(), dhcpd.reserved.push(obj)
            }
        }
        return res
    }, this.updateRuleButtons = function() {
        $grid.selection().length ? this.enableButton("delRule") : this.disableButton("delRule"), this.enableButton("addRule")
    }, this.validHostname = function(str) {
        var re = new RegExp("^[a-zA-Z0-9-]+$"),
            result = str.match(re);
        return result
    }, this.checkRule = function() {
        for (var $row, $ip, $mac, $host, i = 0; i < $grid.nrow(); i++) {
            if ($row = $grid.row(i), $ip = $row.col("ip"), $mac = $row.col("mac"), $host = $row.col("host"), "" == $ip.html()) return this.statusCode = "dhcpMacHasEmpty", alert(lng(this.statusCode)), $ip.click(), !1;
            if ("" == $mac.html() && "" == $host.html()) return this.statusCode = "dhcpMacHasEmpty", alert(lng(this.statusCode)), $mac.click(), !1;
            if (!this.validHostname($host.html()) && "" != $host.html()) return this.statusCode = "dhcpMacWrongHost", alert(lng(this.statusCode)), $host.click(), !1
        }
        return this.statusCode = null, !0
    }, this.addRule = function() {
        this.checkRule() && $grid.addRow().row("last").col("ip").click()
    }, this.delRule = function() {
        $grid.selection().remove(), this.updateRuleButtons();
        var obj = this.getChild("clients", "field");
        obj.lastValue = "blank", obj.$input && obj.$input.val("blank")
    }, options.buttonsInline = !0, options.buttons = [{
        name: "delRule",
        value: "dhcpMacDelRule",
        handler: this.delRule
    }, {
        name: "addRule",
        value: "dhcpMacAddRule",
        handler: this.addRule
    }];
    var $grid, obj;
    this.ctrl = ctrl, obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "dhcpMac"
    }, obj = ctrl.getChild("clients"), obj.nextIface = "client", obj.ifaceTypes.client.options = {
        humanName: "dhcpMacClients"
    }, obj.LANClients = $.extend(!0, {}, ctrl.model.lanClients), jsDhcpServerMacClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("ruleselect", this.onruleselect)
}

function jsDHCPOptPageController() {
    jsDHCPOptPageController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsDHCPOptPageClientView,
        options: {
            nothing: !0
        }
    }, this.ifaceTypes.server = {
        type: jsDHCPOptPageServerView,
        options: {
            action: "index.cgi",
            plainIface: !0
        }
    }, this.addChild(new jsController, "dhopt"), this.ondataready = function() {
        return this.changeChild(this.getChild("dhopt").thisInx, new jsDHCPOptMgrController(this.iftree.br0.services.br0.dhcpd.DHCPConditionalServingPool), "dhopt"), !1
    }, this.iftree = null, this.onceauth = !1, this.nextIface = "server", this.addIface(), this.addEventHandler("dataready", this.ondataready)
}

function jsDHCPOptPageClientView(ctrl, viewInx, options) {
    jsDHCPOptPageClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.onautherror = function() {
        return this.getChild("passwd").authError(), !1
    }, this.ondataready = function() {
        return this.getChild("passwd").hide(), this.constructor(this.ctrl, this.viewInx, this.options ? this.options : {}), this.drawView(), !1
    }, this.save = function() {
        this.updateModel(), this.ctrl.event("saverq")
    }, options.buttons = [{
        name: "save",
        value: "button_save",
        handler: this.save
    }], this.bind("dataready", this.ondataready), this.bind("autherror", this.onautherror)
}

function jsDHCPOptPageServerView(ctrl, viewInx, options) {
    jsDHCPOptPageServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        this.ctrl.iftree = {}, data && !data.baddata && data.resident && data.resident.iface_names && (this.ctrl.iftree = data.resident.iface_names, this.ctrl.iftree || (this.ctrl.iftree = {})), this.ctrl.event(this.mode && "update" != this.mode ? "updaterq" : 58 == data.status ? "autherror" : "dataready")
    }, this.prepareData = function() {
        var obj, ctrl = this.ctrl;
        switch (this.mode) {
            case "save":
                var obj = this.requestObj;
                obj.res_config_action = 3, obj.res_pos = 0;
                var jsonOutObj = {
                    br0: ctrl.iftree.br0
                };
                obj.res_buf = $.toJSON(jsonOutObj), obj.res_buf = obj.res_buf.replace(/%/g, "%25"), obj.res_buf = obj.res_buf.replace(/#/g, "%23"), obj.res_buf = obj.res_buf.replace(/&/g, "%26"), this.addToRequest(obj);
                break;
            case "update":
                var obj = this.requestObj;
                obj.res_config_action = 1, this.addToRequest(obj)
        }
    }, this.onsaverq = function() {
        this.mode = "save", this.updateView()
    }, this.onupdaterq = function() {
        return this.mode = "update", this.updateView(), !1
    }, this.bind("updaterq", this.onupdaterq), this.mode = "update", this.requestObj = {
        v2: "y",
        rq: "y",
        res_json: "y",
        res_config_id: 161,
        res_struct_size: 36
    }, this.bind("saverq", this.onsaverq)
}

function jsDHCPOptMgrController(json) {
    jsDHCPOptMgrController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsDHCPOptMgrView,
        options: {
            slider: !0,
            title: "Опции DHCP",
            nocollapse: !0
        }
    }, this.addChild(new jsRootVendorController(json), "root")
}

function jsDHCPOptMgrView(ctrl, viewInx, options) {
    var leftSideID = "left" + getUID(),
        rightSideID = "right" + getUID();
    ctrl.getChild("root").nextIface = "tree", options.formViewSel = "#" + rightSideID, jsDHCPOptMgrView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        var htmlToDraw = "<div class='dhcpopt'>";
        htmlToDraw += "<div class='leftside' id='" + leftSideID + "'></div>", htmlToDraw += "<div class='rightside' id='" + rightSideID + "'></div>", htmlToDraw += "<div class='bottom'></div></div>";
        var options = this.options;
        $(options.viewBoxSel).html(htmlToDraw), options.myBoxSel = options.viewBoxSel;
        var root = this.getChild("root");
        root.options.viewBoxSel = "#" + leftSideID, root.viewBoxSel = "#" + leftSideID, options.childBoxSel = root.options.viewBoxSel, jsDHCPOptMgrView.superclass.drawView.call(this)
    }
}

function jsRootVendorController(json) {
    jsRootVendorController.superclass.constructor.call(this), this.ifaceTypes.tree = {
        type: jsRootVendorTreeView,
        options: {
            noPath: !0
        }
    }, this.buildTree = function() {
        var vclassid;
        for (var i in this.json) vclassid = this.json[i].VendorClassID, no(vclassid) || this.addChild(new jsVendorClassController(this.json[i]), vclassid);
        this.addChild(new jsVendorClassController($.extend(!0, {}, classTemplate)))
    }, this.onaddclass = function(obj) {
        return delete obj.isNew, this.maxInstance++, this.json[this.maxInstance] = obj, this.getChild(this.children.length - 1).json = this.json[this.maxInstance], this.activateToBottom = !1, this.addChild(new jsVendorClassController($.extend(!0, {}, classTemplate))), !1
    }, this.maxInstance = json.max_instance, delete json.max_instance, this.json = json;
    var classTemplate = {
        isNew: !0,
        Enable: !0,
        DHCPOption: {
            max_instance: 0
        }
    };
    this.activateToBottom = !1, this.buildTree(), this.addEventHandler("addclass", this.onaddclass)
}

function jsRootVendorTreeView(ctrl, viewInx, options) {
    for (var i in ctrl.children) ctrl.getChild(i).nextIface = "tree";
    jsRootVendorTreeView.superclass.constructor.call(this, ctrl, viewInx, options), this.onaddclass = function() {
        var child = this.ctrl.getChild(this.ctrl.children.length - 1);
        return child.nextIface = "tree", child.changeIface(this.viewInx, this, this.options), this.drawView(), !1
    }, this.updateModel = function() {
        jsRootVendorTreeView.superclass.updateModel.call(this);
        var ctrl = this.ctrl,
            json = ctrl.json;
        for (var i in json)(json[i].isNew || json[i].deleted) && delete json[i];
        return json.max_instance = this.ctrl.maxInstance, !0
    }, this.bind("addclass", this.onaddclass)
}

function jsVendorClassController(json) {
    jsVendorClassController.superclass.constructor.call(this), this.ifaceTypes.tree = {
        type: jsVendorClassTreeView,
        options: {}
    }, this.ifaceTypes.list = {
        type: jsVendorClassListView,
        options: {
            plainIface: !0
        }
    }, this.buildTree = function() {
        for (var i in this.json.DHCPOption) this.addChild(new jsDHCPOptController(this.json.DHCPOption[i]));
        this.addChild(new jsDHCPOptController($.extend(!0, {}, optTemplate)))
    }, this.onaddopt = function(obj) {
        return delete obj.isNew, this.maxInstance++, this.json.DHCPOption[this.maxInstance] = obj, this.getChild(this.children.length - 1).json = this.json.DHCPOption[this.maxInstance], this.addChild(new jsDHCPOptController($.extend(!0, {}, optTemplate))), !1
    }, json || (json = {
        max_instance: 0
    }), this.maxInstance = json.DHCPOption.max_instance, delete json.DHCPOption.max_instance, this.json = json;
    var optTemplate = {
        isNew: !0,
        Enable: !0
    };
    this.buildTree(), this.addEventHandler("addopt", this.onaddopt)
}

function jsVendorClassTreeView(ctrl, viewInx, options) {
    for (var i in ctrl.children) ctrl.getChild(i).nextIface = "tree";
    jsVendorClassTreeView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = this.updateView = function() {
        this.ctrl.json.isNew && this.getChild(0).setOption("hide", !0), jsVendorClassTreeView.superclass.drawView.call(this);
        var htmlToDraw;
        htmlToDraw = this.ctrl.json.isNew ? lng("dhoptAddNewClass") : this.ctrl.json.VendorClassID, $(this.myBoxSel).html(htmlToDraw), $(this.viewBoxSel).addClass(this.ctrl.json.isNew ? "folder_new" : this.ctrl.active ? "folder_open" : "folder_close")
    }, this.onblurjq = function(event) {
        var id = $(event.target).val();
        if ("" != id) {
            var json = this.ctrl.json;
            delete json.isNew, json.VendorClassID = id, this.ctrl.event("addclass", json, !0), this.getChild(0).show()
        }
        else this.getChild(0).setOption("hide", !0), this.drawView()
    }, this.onactivate = function() {
        if (this.ctrl.json.isNew) {
            var htmlToDraw = "<input value='' type='text'/>";
            $(this.myBoxSel).html(htmlToDraw);
            var $input = $(this.myBoxSel + ">input");
            $input.focus(), $input.blur(context(this).callback(this.onblurjq)), $input.keypress(context(this).callback(this.onkeypressjq)), ($.browser.msie || $.browser.webkit) && $input.keydown(context(this).callback(this.onkeypressjq))
        }
        return this.ctrl.nextIface = "list", this.ctrl.ifaceTypes.list.options.viewBoxSel = this.options.formViewSel, this.ctrl.addIface(), this.ctrl.event("drawlist"), this.ctrl.json.isNew || ($(this.viewBoxSel).addClass("folder_open"), $(this.viewBoxSel).removeClass("folder_close")), this.onrevdel(), jsVendorClassTreeView.superclass.onactivate.call(this)
    }, this.ondeactivate = function() {
        return $(this.viewBoxSel).addClass("folder_close"), $(this.viewBoxSel).removeClass("folder_open"), this.onrevdel(), jsVendorClassTreeView.superclass.ondeactivate.call(this)
    }, this.onaddopt = function() {
        var child = this.ctrl.getChild(this.ctrl.children.length - 1);
        return child.nextIface = "tree", child.changeIface(this.viewInx, this, this.options), this.drawView(), !1
    }, this.onkeypressjq = function(event) {
        return 13 == event.keyCode ? $(event.target).blur() : 27 == event.keyCode && ($(event.target).val(""), $(event.target).blur()), !0
    }, this.updateModel = function() {
        var ctrl = this.ctrl,
            json = ctrl.json;
        for (var i in json.DHCPOption)(json.DHCPOption[i].isNew || json.DHCPOption[i].deleted) && delete json.DHCPOption[i];
        return json.DHCPOption.max_instance = this.ctrl.maxInstance, !0
    }, this.onrevdel = function() {
        return this.ctrl.json.deleted ? ($(this.viewBoxSel).removeClass("folder_open"), $(this.viewBoxSel).removeClass("folder_close"), $(this.viewBoxSel).addClass("folder_deleted")) : ($(this.viewBoxSel).removeClass("folder_deleted"), $(this.viewBoxSel).addClass(this.ctrl.active ? "folder_open" : "folder_close")), !1
    }, this.bind("activate", this.onactivate), this.bind("deactivate", this.ondeactivate), this.bind("addopt", this.onaddopt), this.bind("revdel", this.onrevdel)
}

function jsVendorClassListView(ctrl, viewInx, options) {
    for (var i in ctrl.children) ctrl.getChild(i).nextIface = "list";
    jsVendorClassListView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = this.updateView = function() {
        jsVendorClassListView.superclass.drawView.call(this);
        var ownerView = $(this.options.viewBoxSel).attr("ownerView");
        if (!ownerView || "list" == ownerView) {
            var children = this.ctrl.children;
            htmlToDraw = "";
            var json;
            htmlToDraw = "<table class='gridTable'>", htmlToDraw += drawHeader();
            var trSel, j = 1,
                odd = 1;
            for (var i in children) json = children[i].json, json.isNew || (htmlToDraw += "<tr class='gridRow" + odd + "'><td>" + json.Tag + "</td><td>" + json.Value + "</td><td><input type='checkbox' ", htmlToDraw += json.Enable ? "checked" : "", htmlToDraw += "/></td><td><input type='checkbox' ", htmlToDraw += json.deleted ? "checked" : "", htmlToDraw += "/></td></tr>", trSel = this.options.viewBoxSel + " tr:eq(" + j + ")", $(trSel).live("click", {
                childInx: i
            }, context(this).callback(this.onrowclickjq)), $(trSel + " td:eq(2) input").live("change", {
                childInx: i
            }, context(this).callback(this.onchangeenablejq)), $(trSel + " td:eq(3) input").live("change", {
                childInx: i
            }, context(this).callback(this.onchangedeletedjq)), j++), odd %= 2, odd++;
            htmlToDraw += "</table>", $(this.options.viewBoxSel + " .fieldSetGeneral").html(htmlToDraw), $(".dhcpopt .buttonsInline").addClass("buttonsVendorClass"), $(".dhcpopt .buttonsInline").removeClass("buttonsInline"), this.buttonBarSel = ".dhcpopt .buttonsVendorClass", this.changeState()
        }
    }, this.onrowclickjq = function(event) {
        var patt = /(input|INPUT)/;
        patt.test(event.target.tagName) || this.ctrl.getChild(event.data.childInx).activate()
    }, this.onchangeenablejq = function(event) {
        this.ctrl.getChild(event.data.childInx).json.Enable = $(event.target).attr("checked")
    }, this.onchangedeletedjq = function(event) {
        var child = this.ctrl.getChild(event.data.childInx);
        child.json.deleted = $(event.target).attr("checked"), child.event("updateview")
    }, this.onaddopt = function() {
        var child = this.ctrl.getChild(this.ctrl.children.length - 1);
        return child.nextIface = "list", child.changeIface(this.viewInx, this, this.options), !1
    };
    var drawHeader = function() {
        var htmlToDraw = "<tr class='gridHeader'><td>" + lng("dhoptTag") + "</td><td>" + lng("dhoptValue") + "</td><td>" + lng("dhoptEnable") + "</td><td>" + lng("dhoptDelete") + "</td></tr>";
        return htmlToDraw
    };
    this.ondrawlist = function() {
        return $(this.options.viewBoxSel).attr("ownerView", "list"), this.drawView(), !1
    }, this.del = function() {
        this.ctrl.json.deleted = !0, this.changeState()
    }, this.revert = function() {
        this.ctrl.json.deleted = !1, this.changeState()
    }, this.disable = function() {
        this.ctrl.json.Enable = !1, this.changeState()
    }, this.enable = function() {
        this.ctrl.json.Enable = !0, this.changeState()
    }, this.changeState = function() {
        this.ctrl.json.deleted ? (this.options.buttons[0] = {
            name: "revert",
            value: "button_revert",
            handler: this.revert
        }, this.ctrl.event("revdel")) : (this.options.buttons[0] = {
            name: "del",
            value: "button_del",
            handler: this.del
        }, this.ctrl.event("revdel")), $(this.buttonBarSel).html(this.drawButtons()), this.ctrl.json.Enable ? (this.options.buttons[1] = {
            name: "disable",
            value: "button_disable",
            handler: this.disable
        }, $(this.buttonBarSel).html(this.drawButtons())) : (this.options.buttons[1] = {
            name: "enable",
            value: "button_enable",
            handler: this.enable
        }, $(this.buttonBarSel).html(this.drawButtons()))
    }, options.buttonsInline = !0, options.buttons = [], this.options = options, this.bind("drawlist", this.ondrawlist), this.bind("addopt", this.onaddopt)
}

function jsDHCPOptController(json) {
    jsDHCPOptController.superclass.constructor.call(this), this.ifaceTypes.tree = {
        type: jsDHCPOptIconView,
        options: {
            plainIface: !0
        }
    }, this.ifaceTypes.form = {
        type: jsDHCPOptFormView,
        options: {
            inputPadding: "100px"
        }
    }, this.describe([{
        name: "dhoptEnable",
        type: "checkbox",
        alias: "enable"
    }, {
        name: "dhoptTag",
        type: "number",
        alias: "tag"
    }, {
        name: "dhoptValue",
        type: "input",
        alias: "value"
    }]), this.json = json
}

function jsDHCPOptIconView(ctrl, viewInx, options) {
    jsDHCPOptIconView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsDHCPOptIconView.superclass.drawView.call(this), this.updateView()
    }, this.updateView = function() {
        var htmlToDraw = "";
        htmlToDraw += this.ctrl.json.isNew ? lng("dhoptAddNewOpt") : this.ctrl.json.Tag, $(this.myBoxSel).html(htmlToDraw), this.ctrl.json.isNew ? $(this.viewBoxSel).addClass("file_new") : this.ctrl.json.deleted ? $(this.viewBoxSel).addClass("file_deleted") : ($(this.viewBoxSel).addClass("file"), $(this.viewBoxSel).removeClass("file_deleted"))
    }, this.onactivate = function() {
        return formCreated || (this.ctrl.nextIface = "form", this.ctrl.ifaceTypes.form.options.viewBoxSel = this.options.formViewSel, this.ctrl.addIface(), formCreated = !0), this.ctrl.event("drawform"), jsDHCPOptIconView.superclass.onactivate.call(this)
    };
    var formCreated = !1;
    this.bind("activate", this.onactivate), this.bind("updateview", this.updateView)
}

function jsDHCPOptFormView(ctrl, viewInx, options) {
    jsDHCPOptFormView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = this.updateView = function() {
        var ownerView = $(this.options.viewBoxSel).attr("ownerView");
        if (!ownerView || "form" == ownerView) {
            this.options.buttonsInline = !0, this.options.buttons = this.ctrl.json.isNew ? [{
                name: "save",
                value: "button_save",
                handler: save
            }] : [{
                name: "del",
                value: "button_del",
                handler: del
            }, {
                name: "revert",
                value: "button_revert",
                handler: revert
            }];
            var enable = this.getChild("enable"),
                tag = this.getChild("tag"),
                value = this.getChild("value"),
                json = this.ctrl.json;
            enable.ctrl.model.value = json.Enable, tag.ctrl.model.value = json.Tag, value.ctrl.model.value = json.Value, jsDHCPOptFormView.superclass.drawView.call(this), this.ctrl.json.deleted ? (enable.disable(), tag.disable(), value.disable(), json.isNew || (this.disableButton("del"), this.enableButton("revert"))) : (enable.enable(), tag.enable(), value.enable(), json.isNew || (this.enableButton("del"), this.disableButton("revert")))
        }
    }, this.updateModel = function() {
        var res = jsDHCPOptFormView.superclass.updateModel.call(this);
        if (res) {
            var json = this.ctrl.json;
            json.Enable = this.getChild("enable").ctrl.model.value, json.Tag = this.getChild("tag").ctrl.model.value, json.Value = this.getChild("value").ctrl.model.value
        }
        return res
    };
    var del = function() {
            this.ctrl.json.deleted = !0, this.ctrl.event("updateview")
        },
        save = function() {
            var res = this.updateModel();
            if (res) {
                var ctrl = this.ctrl;
                ctrl.event("addopt", ctrl.json, !0)
            }
        },
        revert = function() {
            delete this.ctrl.json.deleted, this.ctrl.event("updateview")
        };
    this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias,
            json = this.ctrl.json;
        if (obj.view.updateModel()) {
            var val = obj.view.ctrl.model.value;
            switch (alias) {
                case "enable":
                    json.Enable = val;
                    break;
                case "tag":
                    json.Tag = val;
                    break;
                case "value":
                    json.Value = val
            }
        }
        return !1
    }, this.ondrawform = function() {
        return $(this.options.viewBoxSel).attr("ownerView", "form"), this.drawView(), !1
    }, this.bind("drawform", this.ondrawform), this.bind("updateview", this.updateView), this.bind("fieldchange", this.onfieldchange), this.boxBusy = !0
}

function jsDialogSetController() {
    jsDialogSetController.superclass.constructor.call(this)
}

function jsDialogSetClientView() {
    jsDialogSetClientView.superclass.constructor.call(this)
}

function jsDinIPSettingsModel(service) {
    jsDinIPSettingsModel.superclass.constructor.call(this), this.service = service
}

function jsDinIPSettingsController(service) {
    jsDinIPSettingsController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsDinIPSettingsClientView
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsDinIPSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.changeModel(new jsDinIPSettingsModel(service)), this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController(service.dns_from_dhcp), "dnsFromDhcp");
    var divDhcp = this.addChild(new jsFieldSetController, "divDhcp");
    divDhcp.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns"), divDhcp.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns");
    var advanced = this.addChild(new jsFieldSetController, "advanced");
    advanced.addChild(new jsInputController(service.vendor_id), "vendorID"), advanced.addChild(new jsInputController(service.hostname), "hostname")
}

function jsDinIPSettingsClientView(ctrl, viewInx, options) {
    var obj, service = ctrl.model.service;
    this.saveIP = function(v6) {
        var postfix = "",
            box = this,
            service = {},
            advanced = this.getChild("advanced");
        if (v6 ? (postfix = "v6", box = advanced.getChild("ipv6box", "divIPv6"), service["gwip" + postfix] = box.getChild("gwip").ctrl.model.toString()) : (service.vendor_id = box.getChild("advanced", "vendorID").ctrl.model.value, service.hostname = box.getChild("advanced", "hostname").ctrl.model.value), service["dns_from_dhcp" + postfix] = box.getChild("dnsFromDhcp").ctrl.model.value, !service["dns_from_dhcp" + postfix]) {
            var divDhcp = box.getChild("divDhcp");
            service["dns_prim" + postfix] = divDhcp.getChild("primaryDns").ctrl.model.toString(), service["dns_sec" + postfix] = divDhcp.getChild("secondaryDns").ctrl.model.toString()
        }
        return service
    }, this.updateModel = function() {
        var res = jsDinIPSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var service = this.ctrl.model.service;
            service.type = "ip", $.extend(!0, service, this.saveIP(!1))
        }
        return res
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias,
            advanced = this.getChild("advanced");
        switch (alias) {
            case "dnsFromDhcp":
                if ("divIPv6" == obj.view.ctrl.parent.alias) var divIPv6 = advanced.getChild("ipv6box", "divIPv6"),
                    divDhcp = divIPv6.getChild("divDhcp");
                else var divDhcp = this.getChild("divDhcp");
                obj.value ? divDhcp.hide() : divDhcp.show()
        }
        return !1
    }, this.onmodeswitch = function() {
        return this.options.brief ? (this.getChild("desc").hide(), this.getChild("advanced").hide()) : (this.getChild("desc").show(), this.getChild("advanced").show()), !1
    }, this.drawView = function() {
        jsDinIPSettingsClientView.superclass.drawView.call(this), this.onmodeswitch()
    }, obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "IP"
    }, obj.ifaceTypes.separator.options.hide = service.blocks, obj = ctrl.getChild("dnsFromDhcp"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanDnsFromDhcp",
        valset: {
            on: !0,
            off: !1
        }
    }, dnsFromDhcp = obj.model.value, obj.ifaceTypes.checkbox.options.hide = hideFlag("ifaces.__template.dynamic.dns_from_dhcp");
    var divDhcp = ctrl.getChild("divDhcp");
    divDhcp.nextIface = "client", divDhcp.ifaceTypes.client.options = {
        nothing: !0
    }, divDhcp.ifaceTypes.client.options.hide = dnsFromDhcp, obj = divDhcp.getChild("primaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanPrimDns", opt.hide = hideFlag("ifaces.__template.dynamic.dns_prim"), obj = divDhcp.getChild("secondaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanSecDns", opt.hide = hideFlag("ifaces.__template.dynamic.dns_sec"), opt.optional = !0;
    var advanced = ctrl.getChild("advanced");
    advanced.nextIface = "client", obj = advanced.getChild("vendorID"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanVendorID",
        optional: !0
    }, obj = advanced.getChild("hostname"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "statDhcpHost",
        optional: !0
    }, opt = obj.ifaceTypes.input.options, jsDinIPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), this.bind("modeswitch", this.onmodeswitch)
}

function jsDinIPSettingsSummaryView(ctrl, viewInx, options) {
    jsDinIPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        var advanced = this.getChild("advanced");
        advanced.options.slider = !1, advanced.getChild("vendorID").options.hide = !0, advanced.getChild("hostname").options.hide = !0, jsDinIPSettingsSummaryView.superclass.drawView.call(this)
    }, this.updateView = function() {
        jsDinIPSettingsSummaryView.superclass.updateView.call(this);
        var vendorID = this.getChild("advanced", "vendorID");
        vendorID.ctrl.modified && vendorID.show();
        var hostname = this.getChild("advanced", "hostname");
        hostname.ctrl.modified && hostname.show()
    }, this.bind("modeswitch", function() {
        return !1
    })
}

function validate_domain_name(host) {
    var host = host || "",
        regArea = /^[а-яА-Яa-zA-Z]{2,6}$/,
        regDomain = /^[а-яА-Яa-zA-Z0-9]+([\-]?[а-яА-Яa-zA-Z0-9])*$/;
    if (host = host.replace(/(^\s+|\s+$)/g, ""), host.length > 255) return !1;
    var domains = host.split(".");
    if (domains.length < 2 || !regArea.test(domains[domains.length - 1])) return !1;
    for (var i in domains)
        if (domains[i].length < 1 || domains[i] > 63 || !regDomain.test(domains[i])) return !1;
    return !0
}

function validate_host(n) {
    return validate_ip_address(n) || validate_domain_name(n)
}

function validate_ip_address(ip_address) {
    var digits, i, address = ip_address.match("^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$");
    if (null == address) return !1;
    for (digits = address[0].split("."), i = 0; 4 > i; i++)
        if (Number(digits[i]) > 255 || Number(digits[i]) < 0 || Number(digits[0]) > 223) return !1;
    return !0
}

function validate_mac_address(mac_address) {
    var address = mac_address.match("^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$");
    return null == address ? !1 : !0
}

function validate_ip_port(ip_port) {
    var port = ip_port.match("^[0-9]{1,5}$");
    return null == port ? !1 : Number(port) > 65535 || Number(port) < 1 ? !1 : !0
}

function validate_ip_port_range(ports) {
    if (result = !0, ports)
        if (ranges = ports.split(","), ranges.length)
            for (i = 0; i < ranges.length && (range = ranges[i].split(":"), range ? 2 == range.length ? (left = verifyInteger2(range[0]), right = verifyInteger2(range[1]), left && right && validate_ip_port(new String(range[0])) && validate_ip_port(new String(range[1])) ? parseInt(left) >= parseInt(right) && (result = !1) : result = !1) : 1 == range.length ? (port = verifyInteger2(range), port && validate_ip_port(new String(range)) || (result = !1)) : result = !1 : result = !1, result); i++);
        else result = !1;
    else result = !1;
    return result
}

function validate_mask(ip_mask) {
    var mask = ip_mask.match("^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}$");
    return null == mask ? !1 : (mask = new String(mask), mask_array = mask.split("."), bmask = sprintf("0x%.2x%.2x%.2x%.2x", parseInt(mask_array[0], 10), parseInt(mask_array[1], 10), parseInt(mask_array[2], 10), parseInt(mask_array[3], 10)), n = Math.log(~bmask + 1) / Math.LN2, n.toFixed(0) != n ? !1 : !0)
}

function verifyInteger2(input_str) {
    var pattern, str;
    return pattern = /^\s*(\d+)\s*$/g, str = new String(input_str), str.match(pattern)
}

function setCookie(name, value, expires, measure) {
    var today;
    if (today = new Date, expires) switch (measure) {
        case "min":
            expires = 1e3 * expires * 60;
            break;
        case "hour":
            expires = 1e3 * expires * 3600;
            break;
        default:
            expires = 1e3 * expires * 3600 * 24
    }
    document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + new Date(today.getTime() + expires).toGMTString() : "")
}

function deleteCookie(name) {
    setCookie(name, "", -30)
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    for (var i in cookies) deleteCookie($.trim(cookies[i].split("=")[0]))
}

function getCookie(name) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(name + "="), -1 != c_start) ? (c_start = c_start + name.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
}

function validate_net_addr(addr) {
    return check_res = !1, addr && (strings = addr.split("/"), 2 == strings.length && validate_ip_address(strings[0]) && (bits = verifyInteger2(strings[1]), bits && 32 >= bits && bits > 0 ? check_res = !0 : validate_mask(strings[1]) && (check_res = !0))), check_res
}

function validate_password(password) {
    return words = password.split(" "), words && 1 == words.length && "" != words[0] ? !0 : !1
}

function modal_overlay() {
    var innerHeightsize = 0;
    "number" == typeof window.innerHeight ? innerHeightsize = window.innerHeight : document.documentElement && document.documentElement.clientHeight ? innerHeightsize = document.documentElement.clientHeight : document.body && document.body.clientHeight && (innerHeightsize = document.body.clientHeight), document.getElementById("uiOverlayModal").style.height = document.body.clientHeight > innerHeightsize ? document.body.clientHeight + "px" : innerHeightsize + "px", document.getElementById("uiOverlayModal").style.display = ""
}

function goto_page(url, noajax) {
    "" != url && (noajax ? (window.SAVEME && SAVEME.lock(), document.location.href = url, window.SAVEME && SAVEME.unlock()) : $("#uiContentBody").load(url, "xml_http_request=yes", onPageLoad))
}

function getObjectLength(obj) {
    var objLength = 0;
    for (var i in obj) objLength++;
    return objLength
}

function getObjectFirstChild(obj) {
    var child = null;
    for (var i in obj) {
        child = obj[i];
        break
    }
    return child
}

function getObjectFirstKey(obj) {
    var key = null;
    for (var i in obj) {
        key = i;
        break
    }
    return key
}

function calcMaskByBits(bits) {
    for (var res, bitsBinary = [], i = 0; 32 > i; i++) bitsBinary[i] = 0;
    for (var i = 0; bits > i; i++) bitsBinary[i] = 1;
    for (var firstPeace = 0, secondPeace = 0, thirdPeace = 0, fourPeace = 0, i = 7; i >= 0; i--) firstPeace += bitsBinary[i] * Math.pow(2, 7 - i);
    for (var i = 15; i >= 8; i--) secondPeace += bitsBinary[i] * Math.pow(2, 15 - i);
    for (var i = 23; i >= 16; i--) thirdPeace += bitsBinary[i] * Math.pow(2, 23 - i);
    for (var i = 31; i >= 24; i--) fourPeace += bitsBinary[i] * Math.pow(2, 31 - i);
    return res = firstPeace + "." + secondPeace + "." + thirdPeace + "." + fourPeace
}

function calcBitsByMask(mask) {
    var firstPeace, secondPeace, thirdPeace, fourPeace, res = 0;
    if (no(mask)) return res;
    maskSpl = mask.split("."), firstPeace = maskSpl[0], secondPeace = maskSpl[1], thirdPeace = maskSpl[2], fourPeace = maskSpl[3], num = parseInt(firstPeace), firstPeace = num.toString(2), num = parseInt(secondPeace), secondPeace = num.toString(2), num = parseInt(thirdPeace), thirdPeace = num.toString(2), num = parseInt(fourPeace), fourPeace = num.toString(2);
    var maskBinary = firstPeace + "" + secondPeace + thirdPeace + fourPeace;
    for (var i in maskBinary) 1 == maskBinary[i] && (res += 1);
    return res
}

function getKeyCode(evt) {
    var code;
    try {
        code = event.keyCode
    }
    catch (e) {
        try {
            if (void 0 == evt) throw "error";
            code = evt.which
        }
        catch (e) {
            code = -1
        }
    }
    return code
}

function controlCSS(cssURL, styleID, action) {
    var styleElem = "head>style#" + styleID;
    switch (action) {
        case "add":
            $(styleElem).html() || $.get(cssURL, function(data) {
                var style = document.createElement("style");
                style.type = "text/css", style.id = styleID, style.styleSheet ? style.styleSheet.cssText = data : style.appendChild(document.createTextNode(data)), $("head")[0].appendChild(style)
            });
            break;
        case "del":
            $(styleElem).html() && $(styleElem).remove()
    }
}

function clearJSON(obj) {
    var patt = /^__.*__$/;
    for (var i in obj) patt.test(i) || void 0 == obj[i] ? delete obj[i] : !(obj[i] instanceof Object) || obj[i] instanceof Array || obj[i] instanceof Boolean || obj[i] instanceof Date || obj[i] instanceof Number || obj[i] instanceof String || obj[i] instanceof RegExp || clearJSON(obj[i])
}

function ISO8601Date(dateTime) {
    return is.string(dateTime) && dateTime.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d/g) ? new Date(dateTime.substr(0, 4), dateTime.substr(5, 2) - 1, dateTime.substr(8, 2), dateTime.substr(11, 2), dateTime.substr(14, 2), dateTime.substr(17, 2)) : null
}

function getConnArray(tree) {
    var ifnode, srvnode, tnlnode, arr = [];
    for (var i in tree)
        if (ifnode = tree[i], ifnode.ifname = i, ifnode.services)
            for (var j in ifnode.services)
                if (srvnode = ifnode.services[j], srvnode.L2 = ifnode, srvnode.ifname = j, "auto" != srvnode.type && arr.push(srvnode), srvnode.tunnels)
                    for (var k in srvnode.tunnels) tnlnode = srvnode.tunnels[k], tnlnode.L3 = srvnode, tnlnode.L2 = ifnode, tnlnode.ifname = k, arr.push(tnlnode);
    return arr
}

function getWanConn(tree, ipv6) {
    var ifnode, srvnode, tnlnode, ipv6 = is.set(ipv6) ? ipv6 : !1,
        arrCandidates = [];
    for (var i in tree)
        if (ifnode = tree[i], ifnode.is_wan && ifnode.services && getObjectLength(ifnode.services) > 0)
            for (var j in ifnode.services)
                if (srvnode = ifnode.services[j], srvnode["gwif" + (ipv6 ? "v6" : "")] && (srvnode.L2 = ifnode, srvnode.ifname = i, srvnode.srvname = j, srvnode.metric || (srvnode.metric = 1, srvnode.delMetric = !0), arrCandidates.push(srvnode)), srvnode.tunnels && getObjectLength(srvnode.tunnels) > 0)
                    for (var k in srvnode.tunnels) tnlnode = srvnode.tunnels[k], tnlnode["gwif" + (ipv6 ? "v6" : "")] && (tnlnode.L3 = srvnode, tnlnode.L2 = ifnode, tnlnode.ifname = i, tnlnode.srvname = j, tnlnode.tnlname = k, tnlnode.metric || (tnlnode.metric = srvnode.metric - 1, tnlnode.delMetric = !0), arrCandidates.push(tnlnode));
    for (var candidate, metric = 100500, wanConn = null, i = 0; i < arrCandidates.length; i++) candidate = arrCandidates[i], candidate.metric && candidate.metric <= metric && (metric = candidate.metric, candidate.delMetric && (delete candidate.delMetric, delete candidate.metric), wanConn = candidate);
    return wanConn
}

function GLOBAL_VAR(name) {
    return function(value) {
        window[name] = value
    }
}

function modeAP() {
    var cookieMode = getCookie("device_mode_emul");
    return cookieMode ? "ap" == cookieMode : "_ap" == window.menu_postfix
}

function copyObject(obj) {
    return is.array(obj) ? $.extend(!0, [], obj) : is.object(obj) ? $.extend(!0, {}, obj) : obj
}

function maskObj(__obj, __mask) {
    var obj = _.clone(__obj),
        objKeys = _.keys(obj),
        maskKeys = _.keys(__mask);
    return _.isArray(obj) ? obj = obj.slice(0, __mask.length) : _.each(_.difference(objKeys, maskKeys), function(__key) {
        delete obj[__key]
    }), _.each(_.intersection(objKeys, maskKeys), function(__key) {
        var m = __mask[__key],
            o = obj[__key];
        (is("Object", m) && is("Object", o) || is("Array", m) && is("Array", o)) && (obj[__key] = maskObj(o, m))
    }), obj
}

function diffObj(__obj1, __obj2) {
    function compare(d, isArray) {
        var karr = _.union(_.keys(__obj1), _.keys(__obj2));
        return _.each(karr, function(__key) {
            var __value = diffObj(__obj1[__key], __obj2[__key]);
            isArray ? d[__key] = _.isUndefined(__value) ? null : __value : _.isUndefined(__value) || (d[__key] = __value)
        }), d
    }
    return _.isEqual(__obj1, __obj2) ? void 0 : is("Object", __obj1) && is("Object", __obj2) ? compare({}) : is("Array", __obj1) && is("Array", __obj2) ? compare([], !0) : copyObject(__obj2)
}

function _deepClone(__obj) {
    var o, obj = _.clone(__obj);
    for (var i in obj) o = obj[i], _.isObject(o) && (obj[i] = _deepClone(o));
    return obj
}

function makeValidJSONString(text) {
    return text.replace(/[\\"]/g, "\\$&")
}

function choiceInterfaceClient() {
    var user_ip = getCookie("user_ip"),
        user_ip_temp = user_ip.split(":");
    user_ip = user_ip_temp ? user_ip_temp[user_ip_temp.length - 1] : null, device.config.read(187, callback(this, function(data) {
        if (data && 20 == data.status) {
            data.rpcWiFi && (data.rpcWiFi.mbssid ? setCookie("ssid", data.rpcWiFi.mbssid[0].SSID) : deleteCookie("ssid"), data.rpcWiFi["5G_mbssid"] ? setCookie("ssid_5g", data.rpcWiFi["5G_mbssid"][0].SSID) : deleteCookie("ssid_5g"));
            for (var lanClients = data.resident, k = 0; lanClients[k]; k++)
                if (lanClients[k].ip == user_ip) return setCookie("user_interface", lanClients[k].name), lanClients[k].name
        }
        return !1
    }))
}

function getWansIGMP(data, exclude) {
    var exclude = exclude || [];
    _.isArray(exclude) || (exclude = [exclude]);
    var res = {
        arr: [],
        igmp: !1
    };
    for (var i in data)
        if (_.isObject(data[i])) {
            var _res = getWansIGMP(data[i], exclude, !0);
            res.arr = _.union(res.arr, _res.arr), _res.igmp && !~exclude.indexOf(i) && "ppp" != data[i].type && res.arr.push({
                ifname: i,
                name: data[i].name
            })
        }
        else "igmp" == i && 1 == data[i] && (res.igmp = !0);
    return arguments[2] ? res : res.arr
}

function validCustomIP(ip, mask, gw) {
    for (var arrip = ip.split("."), arrgw = gw.split("."), arrmask = mask.split("."), res = !0, i = 0; i < arrip.length; i++)(arrip[i] & arrmask[i]) != arrgw[i] && (res = !1);
    return res
}

function validSubnetMask(mask) {
    for (var arr = [0, 128, 192, 224, 240, 248, 252, 254, 255], arrmask = mask.split("."), i = 0; 4 > i; i++) arrmask[i] = parseInt(arrmask[i]);
    return -1 != _.indexOf(arr, arrmask[0]) && 0 == arrmask[1] && 0 == arrmask[2] && 0 == arrmask[3] ? !0 : 255 == arrmask[0] && -1 != _.indexOf(arr, arrmask[1]) && 0 == arrmask[2] && 0 == arrmask[3] ? !0 : 255 == arrmask[0] && 255 == arrmask[1] && -1 != _.indexOf(arr, arrmask[2]) && 0 == arrmask[3] ? !0 : 255 == arrmask[0] && 255 == arrmask[1] && 255 == arrmask[2] && -1 != _.indexOf(arr, arrmask[3]) ? !0 : !1
}

function validNetIpMask(netip, mask) {
    if (mask.length < 4) var bits = parseInt(mask.substr(1)),
        full_mask = calcMaskByBits(bits);
    else full_mask = mask;
    for (var marr = full_mask.split("."), iarr = netip.split("."), new_arr = [], i = 0; 4 > i; i++)
        if (new_arr[i] = parseInt(iarr[i]) & parseInt(marr[i]), parseInt(iarr[i]) != new_arr[i]) return !1;
    return !0
}

function getWanMac(rpcWAN, num) {
    var wanMac, lanMac = rpcWAN.iface_names.br0.mac,
        arrMac = lanMac.split(":"),
        hexMac = arrMac.join(""),
        decMac = parseInt(hexMac, 16);
    wanMac = decMac - 1, wanMac = wanMac.toString(16);
    var result = wanMac.substring(wanMac.length - num);
    return result
}

function getDuration(duration, showSeconds) {
    var days, hours, minutes, seconds, ost, strDuration = "";
    return days = Math.floor(duration / 86400) > 0 ? Math.floor(duration / 86400) + " " + lng("D") + " " : "", ost = Math.floor(duration / 86400) > 0 ? duration % 86400 : duration, hours = Math.floor(ost / 3600) > 0 ? Math.floor(ost / 3600) + " " + lng("H") + " " : "", ost = Math.floor(ost / 3600) > 0 ? ost % 3600 : ost, minutes = Math.floor(ost / 60) > 0 ? Math.floor(ost / 60) + " " + lng("min") + " " : "", ost = Math.floor(ost / 60) > 0 ? ost % 60 : ost, seconds = ost + " " + lng("S"), strDuration += showSeconds ? days + hours + minutes + seconds : days + hours + minutes
}

function validateDomain(str) {
    var host = str || "",
        regArea = /^[а-яА-Яa-zA-Z]{2,6}$/,
        regDomain = /^[а-яА-Яa-zA-Z0-9]+([\-]?[а-яА-Яa-zA-Z0-9])*$/;
    if (host = host.replace(/(^\s+|\s+$)/g, ""), host.length > 255) return !1;
    var domains = host.split(".");
    if (domains.length < 2 || !regArea.test(domains[domains.length - 1])) return !1;
    for (var i in domains)
        if (domains[i].length < 1 || domains[i].length > 63 || !regDomain.test(domains[i])) return !1;
    return !0
}

function validateIPv4(str) {
    var patt = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (str.length) {
        if (str = str.match(/\S+/)[0], str.length > 18) return "netAddrInvalid";
        if (!patt.test(str)) return "netAddrInvalid";
        var arr = str.split(".");
        for (var i in arr)
            if (arr[i] > 255) return "netAddrInvalid"
    }
    return null
}

function validateIPv6(str, flags) {
    if (str.match(/^::ffff:/)) return validateIPv4(str.replace(/^::ffff:/, ""), flags);
    var re = new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/);
    return re.test(str) ? null : "netAddrInvalid"
}

function pageDMZ() {
    pageDMZ.superclass.constructor.call(this), this.dmz = null, this.lanClients = new Array, this.add(new nodeCaption("dmzLabel")), this.add(new nodeCheckBox("enable", !1), "enable").add(new nodeCheckBox("vserversEnableSnat", !1), "snat").add(new nodeComboIP("ip_address", "", {
        header: [{
            index: "ip",
            name: "IP"
        }, {
            index: "mac",
            name: "MAC"
        }, {
            index: "host",
            name: "Host"
        }],
        index: "ip",
        version: 4,
        mandatory: !0,
        disabled: !0
    }), "ip"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageDMZ.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel(), this.status.error || this.save(this.child("enable").val(), this.child("ip").val(), this.child("snat").val())
            })), "back" == phase)
            for (var ip = this.child("ip").cleanRows(), i = 0; i < this.lanClients.length; i++) is.IPv4(this.lanClients[i].ip) && ip.addRow(this.lanClients[i].ip, this.lanClients[i].mac, this.lanClients[i].hostname)
    }, this.dmz_on_off = function(val) {
        val ? (this.child("ip").enable(), this.child("snat").enable()) : (this.child("ip").disable(), this.child("snat").disable())
    }, this.save = function(enable, ip, snat) {
        rootView.showModalOverlay(), this.dmz = {
            enable: enable,
            ip: enable ? ip : this.dmz.ip,
            enable_snat: enable ? snat : this.dmz.enable_snat
        }, device.config.write(23, this.dmz, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([23, 187], callback(this, function(data) {
            is.RPC_SUCCESS(data.rq) && (this.lanClients = data.rq.resident), this.deep.updateView(), is.RPC_SUCCESS(data.rq) && (this.dmz = data.rq.resident.dmz ? data.rq.resident.dmz : data.rq.resident, this.child("enable").val(this.dmz.enable), this.child("snat").val(this.dmz.enable_snat), this.child("ip").val(this.dmz.ip), this.dmz_on_off(this.dmz.enable)), rootView.hideModalOverlay()
        }))
    }), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                this.dmz_on_off(value)
        }
    })
}

function jsEthSettingsModel(ifnode) {
    jsEthSettingsModel.superclass.constructor.call(this), this.ifnode = ifnode, this.lanClients = null
}

function jsEthSettingsController(ifnode, isadding, devicemac) {
    jsEthSettingsController.superclass.constructor.call(this), this.changeModel(new jsEthSettingsModel(ifnode)), this.ifaceTypes.client = {
        type: jsEthSettingsClientView,
        def: !0
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsEthSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.oldMAC = ifnode.mac, this.addChild(new jsInputController(ifnode.mtu), "mtu"), this.addChild(new jsMACComboController(ifnode.mac, this.model.lanClients, !0, devicemac), "mac")
}

function jsEthSettingsClientView(ctrl, viewInx, options) {
    this.getmacs = function() {
        this.ctrl.event("getmacsrq")
    }, this.updateModel = function() {
        var res = jsEthSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var ifnode = this.ctrl.model.ifnode,
                macCtrl = this.getChild("mac").ctrl;
            ifnode.mtu = this.getChild("mtu").ctrl.model.value, ifnode.mac = macCtrl.model.toString(), delete ifnode.mac_cloned, this.ctrl.oldMAC == ifnode.mac ? delete ifnode.mac : macCtrl.userMAC && ifnode.mac.toLowerCase() == macCtrl.userMAC.toLowerCase() && (ifnode.mac_cloned = !0)
        }
        return res
    }, this.onupdmodel = function() {
        return this.getChild("mac").updateView(), !1
    }, this.onmodeswitch = function() {
        return this.options.brief ? this.hide() : this.show(), !1
    }, this.drawView = function() {
        jsEthSettingsClientView.superclass.drawView.call(this), this.onmodeswitch(), "ptm" == this.ctrl.model.ifnode.type && (this.getChild("mac").disable(), this.getChild("mtu").disable())
    };
    var obj, opt;
    ctrl.model.ifnode, this.blocks = ctrl.model.ifnode.blocks, obj = ctrl.getChild("mtu"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanMtu",
        minval: 0
    }, opt = ctrl.getChild("mac").ifaceTypes.client.options, opt.humanName = "wanMac", opt.isWan = !0, ctrl.getChild("mac").LANClients = ctrl.model.lanClients, jsEthSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("updmodel", this.onupdmodel), this.bind("modeswitch", this.onmodeswitch), ctrl.model.ifnode.wizard, this.blocks ? options.nothing = !0 : (options.slider = !0, options.collapsed = !1, options.nocollapse = !0, options.title = "ptm" == this.ctrl.model.ifnode.type ? "" : "Ethernet")
}

function jsEthSettingsSummaryView(ctrl, viewInx, options) {
    jsEthSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        var options = this.options;
        options.nocollapse = !0, this.getChild("mtu").options.hide = !0, this.getChild("mac").options.hide = !0, jsEthSettingsSummaryView.superclass.drawView.call(this)
    }, this.updateView = function() {
        jsEthSettingsSummaryView.superclass.updateView.call(this);
        var mtu = this.getChild("mtu");
        mtu.ctrl.modified && mtu.show();
        var mac = this.getChild("mac");
        mac.ctrl.modified && mac.show(), mtu.ctrl.modified || mac.ctrl.modified || this.hide()
    }, this.bind("modeswitch", function() {
        return !1
    })
}

function pageEthControl() {
    function parseData(eths) {
        var outObj = [];
        for (var key in eths) {
            var interface = _.clone(eths[key]);
            interface.port = key, outObj.push(interface)
        }
        return outObj.sort(function(a, b) {
            return "WAN" == a.port ? -1 : "WAN" == b.port ? 1 : a.port < b.port ? -1 : 1
        }), outObj
    }
    pageEthControl.superclass.constructor.call(this), this.ethControl = null, this.showParams = function(interface, $row) {
        var isActivePort = "Up" == interface.status ? !0 : !1,
            params = {};
        params.interface = interface.port, params.autonegotiation = lng(interface.autonegotiation ? "lanControlOn" : "lanControlOff"), isActivePort ? (params.status = lng("lanControlUp") + " <img src='image/ledgreen.gif'/>", params.speed = interface.speed, params.flow = "Off" == interface["flow-control"] ? lng("lanControlOff") : interface["flow-control"]) : (params.status = lng("lanControlDown") + " <img src='image/ledred.gif'/>", params.speed = "-", params.flow = "-"), _.each(params, function(value, param) {
            $row.col(param).html(value)
        }), $row.data("port", interface.port)
    }, this.add(new node, "grid"), this.updateModel = function(status) {
        return this.status = status, !status.error
    }, this.updateView = function(phase) {
        if (pageEthControl.superclass.updateView.apply(this, arguments), "back" == phase) {
            var header = [];
            header.push([{
                index: "interface",
                name: "port"
            }, {
                index: "status",
                name: "status"
            }, {
                index: "autonegotiation",
                name: "lanControlAutonegotiation"
            }, {
                index: "speed",
                name: "lanControlSpeed"
            }, {
                index: "flow",
                name: "lanControlFlow"
            }]), this.$grid = this.get("grid").$box.lightUIGrid(header, 0, {
                clickable: !0
            });
            var ethControl = parseData(this.ethControl);
            for (var index in ethControl) {
                var interface = ethControl[index],
                    $row = this.$grid.addRow().row("last");
                this.showParams(interface, $row)
            }
            this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                var port = $row.data("port");
                this.edit(port)
            }))
        }
    }, this.edit = function(pos) {
        clearTimeouts(), device.stop(), this.$box.unbind();
        var ruleNode = new ruleEthControl(this.ethControl, pos);
        ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            if (ruleNode.deep.updateModel(), !ruleNode.status.error) {
                rootView.showModalOverlay();
                var rule = {};
                rule[pos] = ruleNode.rule, device.config.write(175, rule, context(this).callback(function() {
                    rootView.hideModalOverlay(), this.emit("updaterq")
                }))
            }
        })), disableFlag(175) && ruleNode.getButton("button_save").children("div").addClass("disable")
    }, this.readData = function(handler) {
        if (!is.func(handler)) return !1;
        try {
            device.config.read(175, callback(this, function(data) {
                this.ethControl = is.RPC_SUCCESS(data) ? data.resident : null, handler(this.ethControl)
            }))
        }
        catch (e) {
            this.deep.updateView().$box.errorBlock(lng("error"), e.message)
        }
        return !0
    }, this.updateStatus = function() {
        this.readData(callback(this, function() {
            if (this.ethControl) {
                for (var nrow = this.$grid.nrow(), i = 0; nrow > i; i++) {
                    var $row = this.$grid.row(i),
                        port = $row.data("port"),
                        interface = this.ethControl[port];
                    interface && this.showParams(interface, $row)
                }
                setTimeout(callback(this, this.updateStatus), 3e3)
            }
        }))
    }, this.update = function() {
        rootView.showModalOverlay(), this.cleanButtonBar(), this.readData(callback(this, function() {
            this.deep.updateView(), setTimeout(callback(this, this.updateStatus), 3e3), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        this.update()
    })
}

function ruleEthControl(ethControl, port) {
    ruleEthControl.superclass.constructor.call(this), this.rule = _.clone(ethControl[port]), this.isAuto = !1, this.useAdvertisement = [], this.add(new nodeCaption(lng("port") + " " + port), "caption").add(new nodeSelect("lanControlSpeed"), "speed").add(new node, "autoMode").add(new node, "flow"), this.child("speed").addOption("Auto", "Auto").addOption("10M-Half", "10M-Half").addOption("10M-Full", "10M-Full").addOption("100M-Half", "100M-Half").addOption("100M-Full", "100M-Full"), this.child("autoMode").add(new nodeCaption("lanControlAutoMode")).add(new nodeCheckBox("10M-Half", null, {
        hidden: !0
    }), "10M-Half").add(new nodeCheckBox("10M-Full", null, {
        hidden: !0
    }), "10M-Full").add(new nodeCheckBox("100M-Half", null, {
        hidden: !0
    }), "100M-Half").add(new nodeCheckBox("100M-Full", null, {
        hidden: !0
    }), "100M-Full").add(new nodeCheckBox("1000M-Full", null, {
        hidden: !0
    }), "1000M-Full"), this.child("flow").add(new nodeCaption("lanControlFlow")).add(new nodeCheckBox("lanControlFlowSymmetric"), "flowSymmetric"), this.child("speed").bind("fieldchange", callback(this, function(status, value) {
        this.isAuto = "Auto" == value ? !0 : !1, this.isAuto ? (this.child("flow").show(), this.child("autoMode").show()) : (this.child("flow").hide(), this.child("autoMode").hide())
    })), this.updateView = function(phase) {
        if (ruleEthControl.superclass.updateView.apply(this, arguments), "back" == phase) {
            var rule = this.rule;
            this.isAuto = rule.autonegotiation, this.child("speed").val(this.isAuto ? "Auto" : rule.speed), this.child("speed").fieldchange(), this.child("flow").child("flowSymmetric").val(rule.pause), _.each(rule.advertisement, function(value, state) {
                var $advertise = this.child("autoMode").child(state);
                $advertise.val(value), $advertise.show(), this.useAdvertisement.push(state)
            }, this)
        }
    }, this.updateModel = function(status) {
        var self = this;
        this.rule = {}, this.isAuto ? (this.rule.autonegotiation = !0, this.rule.pause = this.child("flow").child("flowSymmetric").val(), this.rule.advertisement = {}, _.each(this.useAdvertisement, function(state) {
            var value = self.child("autoMode").child(state).val();
            this.rule.advertisement[state] = value
        }, this)) : (this.rule.autonegotiation = !1, this.rule.speed = this.child("speed").val()), this.status = status
    }
}

function formLocalFwUpdate() {
    formLocalFwUpdate.superclass.constructor.call(this), this.updateView = function(phase) {
        formLocalFwUpdate.superclass.updateView.apply(this, arguments), "forward" == phase && (this.startForm().add(new nodeUpload("firmwareUpload", "fwupdate.cgi", "firmware", {
            mandatory: !0,
            auto: !1,
            browse: "button_browse",
            cancel: "button_cancel"
        }), "firmware_upload_form"), this.endForm(), this.cleanButtonBar().addButton("button_upload").getButton("button_upload").bind("click.button", callback(this, function() {
            this.deep.updateModel() && this.get("firmware_upload_form").upload()
        })))
    }, this.bind("uploading", function() {
        this.getButton("button_upload").disable(), rootView.showModalOverlay()
    }), this.bind("uploaded", function() {
        device.system.fwupdate({
            complite: callback(this, function() {
                rootCtrl.event("muterq"), rootCtrl.event("startfwupdate")
            }),
            cancel: callback(this, function() {
                rootView.hideModalOverlay(), this.getButton("button_upload").enable()
            }),
            error: callback(this, function(data) {
                1 == data.error ? (rootView.hideModalOverlay(), rootCtrl.event("badfwrq"), this.getButton("button_upload").enable()) : 5 == data.error ? (rootView.hideModalOverlay(), rootCtrl.event("badfwrq"), this.getButton("button_upload").enable()) : 3 == data.error && reload()
            })
        })
    }), this.bind("cancel", function() {
        this.getButton("button_upload").enable()
    })
}

function formRemoteFwUpdate() {
    formRemoteFwUpdate.superclass.constructor.call(this), this.updateView = function(phase) {
        if (formRemoteFwUpdate.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var autoupd = this.autoupd;
            this.startForm().add(new nodeCheckBox("enable_auto_check", autoupd.enable), "enable").add(new nodetext("remote_server_url", autoupd.server), "server"), autoupd.need_update && this.addButton("button_upload_remote").getButton("button_upload_remote").bind("button.click", function() {
                rootCtrl.event("autoupdaterq")
            }), this.addButton("check_updates").getButton("check_updates").bind("button.click", callback(this, function() {
                confirm(lng("check_wait_warn")) && (rootView.showWaitScreen(lng("fw_update_checking"), 3e4, callback(this, function() {
                    alert(lng("update_check_error"))
                })), device.config.write(178, {
                    check_updates: !0,
                    enable: this.get("enable").val(),
                    server: this.get("server").val()
                }, callback(this, this.ondataready)), this.isManual = !0)
            })), this.addButton("apply_fw_settings").getButton("apply_fw_settings").bind("button.click", callback(this, callback(this, function() {
                function __apply_settings() {
                    this.deep.updateModel() && (rootView.showModalOverlay(), device.config.write(178, {
                        enable: enable.val(),
                        server: server.val()
                    }, callback(this, this.ondataready)))
                }
                var server = this.get("server"),
                    enable = this.get("enable");
                server.deep.isModified() || enable.deep.isModified() && enable.val() ? confirm(lng("check_wait_warn")) && (rootView.showWaitScreen(lng("fw_update_checking"), 3e4, callback(this, function() {
                    alert(lng("update_check_error"))
                })), __apply_settings.call(this)) : __apply_settings.call(this)
            }))), this.endForm()
        }
        else {
            var autoupd = this.autoupd;
            switch (debug("status = ", autoupd.status), autoupd.status) {
                case "update_available":
                    this.get("server").setComment("<span langkey='autoupdNewVersion'>" + lng("autoupdNewVersion") + "</span> (" + autoupd.version + ")").pluginEdit.find(".comment").css("color", "green"), confirm(lng("update_avail_part1") + autoupd.version + lng("update_avail_part2")) && rootCtrl.event("autoupdaterq", !0);
                    break;
                case "device_is_not_supported":
                    this.get("server").setComment("autoupdFileAbsent").pluginEdit.find(".comment").css("color", "red");
                    break;
                case "latest_fw_version":
                    this.get("server").setComment("new_version_unavailable").pluginEdit.find(".comment").css("color", "gray");
                    break;
                case "update_not_checked":
                    this.get("server").cleanComment();
                    break;
                default:
                    this.get("server").cleanComment(), this.isManual && (this.isManual = !1, alert(lng("autoupdUnknownError"))), autoupd.enable && this.get("server").setComment("autoupdUnknownError").pluginEdit.find(".comment").css("color", "red")
            }
        }
    }, this.ondataready = function(data) {
        is.RPC_SUCCESS(data) && (this.autoupd = data.resident), rootView.hideWaitScreen(), rootView.hideModalOverlay(), this.deep.updateView()
    }
}

function warningRemoteFwUpdate() {
    warningRemoteFwUpdate.superclass.constructor.call(this), this.updateView = function(phase) {
        if (warningRemoteFwUpdate.superclass.updateView.apply(this, arguments), "forward" == phase) this.startForm().add(new nodeComment(""), "autoUpdateWarning"), this.endForm();
        else {
            var autoupd = this.autoupd;
            if (autoupd.status && "update_available" == autoupd.status) {
                if (autoupd.version) var comment = lng("autoupdNewVersion") + " (" + autoupd.version + ")";
                else var comment = lng("autoupdNewVersion");
                this.parent.show(), this.get("autoUpdateWarning").show(), this.get("autoUpdateWarning").pluginTextComment.html(comment), this.get("autoUpdateWarning").pluginTextComment.css("color", "green")
            }
            else this.parent.hide(), this.get("autoUpdateWarning").hide()
        }
    }
}

function pageFirmware() {
    pageFirmware.superclass.constructor.call(this), this.startForm().add(new nodeCaption("local_update"), "local_update").get("local_update").add(new formLocalFwUpdate, "form").get(".."), hideFlag("remote_update") ? this.add(new nodeCaption(""), "remote_update").get("remote_update").add(new warningRemoteFwUpdate, "form") : this.add(new nodeCaption("remote_update"), "remote_update").get("remote_update").add(new formRemoteFwUpdate, "form"), this.endForm(), this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(178, callback(this, function(data) {
            is.RPC_SUCCESS(data) && (this.get("remote_update/form").autoupd = data.resident, rootView.hideWaitScreen(), rootView.hideModalOverlay(), this.deep.updateView())
        }))
    })
}

function nodeButton(name, value) {
    nodeButton.superclass.constructor.apply(this, arguments), this.updateView = function(phase) {
        if (nodeButton.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {
                mandatory: options.mandatory
            }), this.pluginButton = this.pluginEdit.find(".input").lightUIButton(this.val()), options.disabled && this.disable(), this.handler && this.buttonClick(this.handler)
        }
        return this
    }, this.val = function(value) {
        return is.set(value) ? (this.value = value, this.pluginButton && this.pluginButton.title(value), this) : this.value
    }, this.disable = function() {
        return this.options.disabled = !0, this.pluginEdit && this.pluginButton && (this.pluginEdit.disable(), this.pluginButton.disable()), this
    }, this.enable = function() {
        return this.options.disabled = !1, this.pluginEdit && this.pluginButton && (this.pluginEdit.enable(), this.pluginButton.enable()), this
    }, this.buttonClick = function(handler) {
        this.pluginButton && this.pluginButton.bind("button.click", handler), this.handler = handler
    }, this.validate = function() {
        return null
    }, this.val(value)
}

function pageFirmwareRemoteConfig() {
    pageFirmwareRemoteConfig.superclass.constructor.call(this), this.auto_update = null, this.add(new nodetext("firmwareConfigUrl", "", {
        mandatory: !0
    }), "update_url"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        pageFirmwareRemoteConfig.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            this.deep.updateModel(), this.status.error || this.save(this.child("update_url").val())
        }))
    }, this.save = function(url) {
        rootView.showModalOverlay(), this.auto_update = {
            url: url,
            enable: !0,
            fw_update: !1
        }, device.config.write(165, {
            auto_update: this.auto_update
        }, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(165, callback(this, function(data) {
            this.deep.updateView(), is.RPC_SUCCESS(data) && (this.auto_update = data.resident.auto_update, this.child("update_url").val(this.auto_update.url)), rootView.hideModalOverlay()
        }))
    })
}

function jsGeneralSettingsModel(iftree, ifname, srvname, tnlname, srvsname) {
    jsGeneralSettingsModel.superclass.constructor.call(this), this.iftree = iftree, this.templates = null, this.blankConn = null, this.isadding = !ifname, this.availIfaces = {}, this.ifnode, this.ifname, this.service, this.srvname = srvname, this.tunnel, this.tnlname = tnlname, this.connum = 0, this.selectTemplates = function(templates) {
        this.templates = $.extend(!0, {}, provList.man, templates)
    }, this.fillInfoFields = function() {
        this.ifnode = null, this.ifname = null, this.ifnode = getObjectFirstChild(this.blankConn), this.ifname = getObjectFirstKey(this.blankConn), this.ifnode.services && (this.service = getObjectFirstChild(this.ifnode.services), this.srvname = getObjectFirstKey(this.ifnode.services)), this.tunnel = null, this.tnlname ? this.service.tunnels && (this.tunnel = this.service.tunnels[this.tnlname]) : this.service.tunnels && (this.tunnel = getObjectFirstChild(this.service.tunnels), this.tnlname = getObjectFirstKey(this.service.tunnels));
        var ifnode, service;
        this.connum = 0;
        for (var i in this.iftree)
            if (ifnode = this.iftree[i], ifnode && ifnode.services)
                for (var j in ifnode.services)
                    if (service = ifnode.services[j], this.connum++, service.tunnels)
                        for (var k in service.tunnels) this.connum++
    }, this.expandTemplates = function() {
        var template, ifnode, service, isTunnel, key, templates = (this.iftree, this.templates);
        for (var t in templates)
            if ("pppoe" == t || "pppoev6" == t || "pppoedual" == t || "pppoa" == t || "static" == t || "statkab" == t || "dynamic" == t || "dynkab" == t || "staticv6" == t || "dynamicv6" == t || "ipoa" == t || "statpptp" == t || "statl2tp" == t || "dynpptp" == t || "dynl2tp" == t || "statpppoe" == t || "dynpppoe" == t || "statpptpv6" == t || "statl2tpv6" == t || "dynpptpv6" == t || "dynl2tpv6" == t || "3g" == t || "lte" == t || "3glte" == t || "bridge" == t || "pptp" == t || "l2tp" == t || "624" == t || "pptpv6" == t || "l2tpv6" == t || "notype" == t) {
                template = templates[t], this.getAvailIfNames(t);
                for (var i in template) switch (i) {
                    case "any":
                        template.any.contype = t;
                        for (var j in this.availIfaces) {
                            if (template[j] = $.extend(!0, {}, this.availIfaces[j]), ifnode = template[j], ifnode.contype = t, this.setL2HumanName(ifnode), service = getObjectFirstChild(template.any.services), isTunnel = service.tunnels || getObjectLength(service.tunnels), isTunnel && ifnode.services && getObjectLength(ifnode.services)) {
                                service = null;
                                for (var k in ifnode.services) no(service) && "ip" == ifnode.services[k].type ? service = ifnode.services[k] : delete ifnode.services[k];
                                service ? (service.tunnels = {}, key = getObjectFirstKey(template.any.services), service.tunnels = $.extend(!0, service.tunnels, template.any.services[key].tunnels)) : (ifnode.services = {}, ifnode.services = $.extend(!0, ifnode.services, template.any.services), service = getObjectFirstChild(ifnode.services)), service.dhcp = "dynpppoe" == t || "dynpptp" == t || "dynl2tp" == t || "dynpptpv6" == t || "dynl2tpv6" == t
                            }
                            else if (ifnode.services = {}, "3glte" == t) {
                                ifnode.services = $.extend(!0, ifnode.services, template.any.services);
                                var __k = getObjectFirstKey(ifnode.services);
                                switch (ifnode.services[__k] = {
                                    __macro__: ifnode.services[__k].__macro__
                                }, ifnode.dongle_type) {
                                    case 0:
                                    case 1:
                                        ifnode.services[__k] = $.extend(!0, {}, ifnode.services[__k].__macro__.ppp), $.extend(!0, ifnode.services[__k], template.any.services.create);
                                        break;
                                    case 2:
                                        ifnode.services[__k] = $.extend(!0, {}, ifnode.services[__k].__macro__.ip)
                                }
                            }
                            else ifnode.services = $.extend(!0, ifnode.services, template.any.services);
                            service = getObjectFirstChild(ifnode.services), "pppoa" == t ? (ifnode.link_type = "MDMVS_PPPOA", ifnode.pvc_settings.encap = "vcmux") : "ipoa" == t ? ifnode.link_type = "MDMVS_IPOA" : ("atm" == ifnode.type && (ifnode.link_type = "MDMVS_EOA"), service.vlan = {}, this.setVLAN(ifnode, service))
                        }
                        getObjectLength(template) > 1 && delete template.any
                }
            }
    }, this.setVLAN = function(ifnode, service) {
        if (ifnode.connection_mode) switch (ifnode.connection_mode) {
            case "VlanDefMode":
                service.vlan.usempvcro = !0, service.vlan.usempvc = !this.isadding, service.vlan.usevlanro = !1, service.vlan.usevlan = !no(service.vlan) && !no(service.vlan.vlanid) && service.vlan.vlanid >= 0;
                break;
            case "VlanMuxMode":
                service.vlan.usempvcro = !0, service.vlan.usempvc = !0, service.vlan.usevlanro = !1, service.vlan.usevlan = !no(service.vlan) && !no(service.vlan.vlanid) && service.vlan.vlanid >= 0;
                break;
            case "NewMode":
                service.vlan.usempvcro = !1, service.vlan.usempvc = !1, service.vlan.usevlanro = !1, service.vlan.usevlan = !1;
                break;
            case "DefaultMode":
                delete service.vlan
        }
    }, this.setL2HumanName = function(ifnode) {
        no(ifnode) && (ifnode = this.ifnode), ifnode.__humanName__ = "atm" == ifnode.type ? "create" == ifnode.ifname ? ifnode.port ? ifnode.port + "(" + lng("new_") + ")" : "DSL(" + lng("new_") + ")" : ifnode.ifname + "(" + ifnode.pvc_settings.vpi + "/" + ifnode.pvc_settings.vci + ")" : ifnode.port ? ifnode.port : ifnode.ifname, ifnode.__humanName__ = ifnode.__humanName__.replace("Ports:5", lng("port5"))
    }, this.getAvailIfNames = function(contype) {
        var iface, condition, services, serviceLength, srv, tree = (this.tunnel, this.service, this.ifnode, this.iftree),
            j = 0;
        this.availIfaces = {};
        var useless, multmode, needDelete, c;
        if (contype || (contype = getConnType(this.ifnode, this.service)), "ipsec" != contype) {
            if (!this.isadding) return this.availIfaces[this.ifname] = $.extend(!0, {}, this.ifnode), void this.setL2HumanName(this.availIfaces[this.ifname]);
            for (var i in tree)
                if (needDelete = [], iface = tree[i], iface.is_wan) {
                    switch (condition = !1, useless = !1, services = iface.services ? iface.services : [], serviceLength = getObjectLength(services), checkContype = !0, multmode = iface.connection_mode && ("VlanMuxMode" == iface.connection_mode || "MultipleServiceMode" == iface.connection_mode), contype) {
                        case "3glte":
                            useless = "usb" != iface.type, condition = !0;
                            for (var i in services)("ppp" == services[i].type || "ip" == services[i].type) && (condition = !1, needDelete.push(i));
                            break;
                        case "3g":
                            if (useless = "3g" != iface.type, condition = !useless && !serviceLength, !condition)
                                for (var i in services) needDelete.push(i);
                            break;
                        case "lte":
                            if (useless = "lte" != iface.type, condition = !useless && !serviceLength, !condition)
                                for (var i in services) needDelete.push(i);
                            break;
                        case "pppoe":
                        case "pppoev6":
                        case "pppoedual":
                            useless = !0, iface.is_wan && ("atm" == iface.type && "MDMVS_EOA" == iface.link_type ? (useless = !1, condition = !0) : ("ethernet" == iface.type || "ptm" == iface.type || "bridge" == iface.type) && (useless = !1, condition = !0));
                            break;
                        case "pppoa":
                            if (useless = "atm" != iface.type && "MDMVS_PPPOA" != iface.link_type, condition = !useless && !serviceLength, !condition)
                                for (var i in services) needDelete.push(i);
                            break;
                        case "static":
                        case "statkab":
                        case "dynamic":
                        case "dynkab":
                        case "notype":
                            if (useless = !("atm" == iface.type && "MDMVS_EOA" == iface.link_type || "ethernet" == iface.type || "ptm" == iface.type || "bridge" == iface.type), condition = !0, !multmode)
                                for (var i in services) iface.connection_mode && "VlanDefMode" == iface.connection_mode && "ip" == services[i].type && "dynamic" == contype ? (condition = !1, is.object(services[i].vlan) && is.number(services[i].vlan.vlanid) || needDelete.push(i)) : "ppp" != services[i].type && "pppv6" != services[i].type && "pppdual" != services[i].type && "ipv6" != services[i].type && (condition = !1, needDelete.push(i));
                            break;
                        case "staticv6":
                        case "dynamicv6":
                            if (useless = !("atm" == iface.type && "MDMVS_EOA" == iface.link_type || "ethernet" == iface.type || "ptm" == iface.type || "bridge" == iface.type), condition = !0, !multmode)
                                for (var i in services) "ipv6" == services[i].type && services[i].dhcp && "dynamicv6" == contype && (iface.connection_mode && "VlanDefMode" == iface.connection_mode ? (condition = !1, is.object(services[i].vlan) && is.number(services[i].vlan.vlanid) || needDelete.push(i)) : (condition = !1, needDelete.push(i)));
                            break;
                        case "statpppoe":
                        case "dynpppoe":
                            iface.is_wan && ("auto" == iface.type || "lte" == iface.type || "3g" == iface.type) && (useless = !0, condition = !0);
                            break;
                        case "statpptp":
                        case "dynpptp":
                        case "statl2tp":
                        case "dynl2tp":
                        case "statpptpv6":
                        case "dynpptpv6":
                        case "statl2tpv6":
                        case "dynl2tpv6":
                            useless = !("ethernet" == iface.type), condition = !0, c = 0;
                            for (var i in services) {
                                if (srv = services[i], c > 0 && "ip" == srv.type && (condition = !1, needDelete.push(i)), !c && srv.tunnels && getObjectLength(srv.tunnels)) {
                                    condition = !1;
                                    for (var j in srv.tunnels) needDelete.push(j)
                                }
                                "ip" == srv.type && c++
                            }
                            break;
                        case "pptp":
                        case "l2tp":
                        case "pptpv6":
                        case "l2tpv6":
                        case "624":
                            useless = "auto" == iface.type ? !1 : !0, condition = useless;
                            break;
                        case "ipoa":
                            if (useless = "atm" != iface.type && "MDMVS_IPOA" != iface.link_type, condition = !useless && !serviceLength, !condition)
                                for (var i in services) needDelete.push(i);
                            break;
                        case "bridge":
                            if (useless = !("atm" == iface.type && "MDMVS_EOA" == iface.link_type || "ethernet" == iface.type || "ptm" == iface.type || "bridge" == iface.type), condition = iface.is_wan, !multmode)
                                for (var i in services) "ppp" != services[i].type && "pppv6" != services[i].type && "pppdual" != services[i].type && (condition = !1, needDelete.push(i))
                    }
                    iface.ifname && !useless && (this.availIfaces[iface.ifname] = $.extend(!0, {}, iface), this.setL2HumanName(this.availIfaces[iface.ifname]), this.availIfaces[iface.ifname].needDelete = needDelete.length ? needDelete : null)
                }
            var L2 = this.templates.L2;
            for (var i in L2) switch (i) {
                case "atm":
                    "3glte" == contype || "3g" == contype || "lte" == contype || contype.match(/pptp|l2tp/) || (this.availIfaces.create = L2[i], this.availIfaces.create.ifname = "create", this.setL2HumanName(this.availIfaces.create))
            }
        }
    }, this.updateTemplates = function() {
        this.expandTemplates();
        var templatesOfType = this.templates[this.templates.deftype],
            ifname = getObjectFirstKey(templatesOfType);
        this.blankConn = {}, this.blankConn[ifname] = templatesOfType[ifname], this.fillInfoFields()
    }, this.selectTemplates({});
    var blankConn, srvname;
    if (ifname) {
        var blankConn = {};
        blankConn[ifname] = $.extend(!0, {}, iftree[ifname]);
        var services = srvsname ? blankConn[ifname][srvsname] : blankConn[ifname].services;
        if (services) {
            var service = blankConn[ifname].services[srvname];
            for (var i in services) services[i].ifname != srvname && delete services[i];
            var tunnels = services[srvname].tunnels;
            if (tunnels)
                for (var i in tunnels) tunnels[i].ifname != tnlname && delete tunnels[i];
            var vlan = service.vlan;
            vlan && this.setVLAN(blankConn[ifname], service)
        }
        this.blankConn = blankConn, this.fillInfoFields()
    }
    else this.updateTemplates()
}

function jsGeneralSettingsController(iftree, ifname, srvname, tnlname, srvipv6) {
    jsGeneralSettingsController.superclass.constructor.call(this), this.changeModel(new jsGeneralSettingsModel(iftree, ifname, srvname, tnlname, srvipv6));
    var model = this.model,
        contype = getConnType(model.ifnode, model.service, model.tunnel);
    contype = contype ? contype : model.ifnode.contype, this.autoname = function(contype, ifname) {
        function buildName(contype, L2, inx) {
            var res_str = "";
            return is.set(contype) && (res_str += contype), is.set(L2) && (res_str += ("" == res_str ? "" : "_") + L2), is.set(inx) && (res_str += ("" == res_str ? "" : "_") + inx), res_str
        }
        var ifnode = this.model.ifnode;
        ifname && "create" != ifname ? ifnode = this.model.iftree[ifname] : ifname = this.model.ifname, contype || (contype = this.model.ifnode.contype), contype = replaceCustom(contype);
        var L2, inx = this.model.connum;
        switch (ifnode.type) {
            case "atm":
                L2 = ifnode.pvc_settings.vpi + "_" + ifnode.pvc_settings.vci;
                break;
            case "ethernet":
            case "ptm":
            case "bridge":
            case "3g":
            case "lte":
            case "usb":
                L2 = ifnode.port ? ifnode.port : ifname;
                break;
            case "auto":
                return buildName(contype, null, inx)
        }
        return "statpppoe" == contype || "dynpppoe" == contype ? buildName("pppoe", L2, inx) : buildName(contype, L2, inx)
    }, this.initProvList = function(ctrl, obj) {
        var child;
        for (var i in obj) obj[i].deftype ? (obj[i].provname = i, ctrl.addChild(new jsProvListItemController({
            name: i,
            value: obj[i]
        }), i)) : (child = ctrl.addChild(new jsProvListItemController({
            name: i
        }), i), this.initProvList(child, obj[i]))
    }, this.isadding = "create" == model.srvname || "create" == model.tnlname;
    var provstep = this.addChild(new jsFieldSetController, "provstep");
    provstep.addChild(new jsDecorController, "desc");
    var provs = provstep.addChild(new jsProvListController(provList.man), "provs");
    this.initProvList(provs.addItem(new jsProvListItemController, "rootprov"), provList);
    var name = model.tunnel ? model.tunnel.name : model.service.name ? model.service.name : this.autoname(),
        enable = model.tunnel ? model.tunnel.enable : model.service.enable,
        gwif = model.tunnel ? model.tunnel.gwif : model.service.gwif;
    this.addChild(new jsInputController(contype), "type"), this.addChild(new jsInputController(model.ifname), "port");
    var namestep = this.addChild(new jsFieldSetController, "namestep");
    namestep.addChild(new jsInputController(name), "name"), namestep.addChild(new jsInputController(enable), "enable"), namestep.addChild(new jsInputController(gwif), "gwif"), namestep.addChild(new jsInputController(model.ifnode.is_wan || this.isadding ? "WAN" : "LAN"), "direction"), this.ifaceTypes.client = {
        type: jsGeneralSettingsClientView,
        def: !0,
        options: {}
    }, this.ifaceTypes.summary = {
        type: jsGeneralSettingsSummaryView
    }
}

function jsGeneralSettingsClientView(ctrl, viewInx, options) {
    this.drawView = function() {
        jsGeneralSettingsClientView.superclass.drawView.call(this)
    }, this.updateView = function() {
        var model = this.ctrl.model,
            name = model.tunnel ? model.tunnel.name : model.service.name ? model.service.name : this.autoname();
        this.getChild("namestep", "name").ctrl.model.value = name, this.getChild("type").ctrl.model.value = model.ifnode.contype, this.getChild("port").ctrl.model.value = model.ifname, this.getChild("namestep", "enable").ctrl.model.value = model.service.enable, this.getChild("namestep", "gwif").ctrl.model.value = model.service.gwif, this.getChild("namestep", "direction").ctrl.model.value = model.ifnode.is_wan || this.ctrl.isadding ? "WAN" : "LAN", jsGeneralSettingsClientView.superclass.updateView.call(this)
    }, this.updateModel = function() {
        var nameObj = this.getChild("namestep", "name");
        nameObj.statusCode = null;
        var res = nameObj.updateModel(),
            enObj = this.getChild("namestep", "enable");
        if (enObj.updateModel(), !res) return !1;
        var name = nameObj.ctrl.model.toString();
        if ("" == name && (nameObj.statusCode = "wanNameEmpty", res = !1), nameObj.setError(), !res) return !1;
        var model = this.ctrl.model;
        model.tunnel ? (model.tunnel.name = nameObj.ctrl.model.value, model.tunnel.enable = enObj.ctrl.model.value) : (model.service.name = nameObj.ctrl.model.value, model.service.enable = enObj.ctrl.model.value);
        var port = this.getChild("port");
        if (port.updateModel(), no(port.ctrl.model.value)) {
            res = !1;
            var type = this.getChild("type");
            switch (type.updateModel(), type.ctrl.model.value) {
                case "3g":
                case "lte":
                case "3glte":
                    port.statusCode = "wanNoUsbModemAvail";
                    break;
                default:
                    port.statusCode = null;
            }
            port.setError()
        }
        if (!res) return !1;
        var model = this.ctrl.model,
            obj = model.tunnel ? model.tunnel : model.service;
        return obj.name = name, obj.enable = this.getChild("namestep", "enable").ctrl.model.value, !0
    }, this.updateBlank = function() {
        this.getChild("type").updateModel(), this.getChild("port").updateModel();
        var type = this.getChild("type").ctrl.model.toString(),
            ifname = this.getChild("port").ctrl.model.value,
            model = this.ctrl.model;
        model.blankConn = {}, no(ifname) && (ifname = getObjectFirstKey(model.templates[type])), model.blankConn[ifname] = model.templates[type][ifname], model.fillInfoFields(), model.ifnode.contype = type, "notype" == type && "type" == this.getChild(this.activeTab).ctrl.alias && this.disableButton("next")
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias,
            wizard = this.ctrl.model.iftree.wizard;
        switch (alias) {
            case "type":
                if (this.initPortValset(obj.value), this.getChild("type"), "notype" == obj.value) this.wizard || (this.updateButtons(), this.disableButton("save"), this.getChild("port").hide(), this.getChild("namestep").hide());
                else if (!this.wizard) {
                    this.getChild("type").ctrl.model.value, this.getChild("type").updateModel();
                    var typeValset = this.getChild("type").options.valset;
                    for (var key in typeValset)
                        if ("notype" == typeValset[key]) {
                            delete typeValset[key];
                            break
                        }
                    this.getChild("type").setOption("valset", typeValset), this.getChild("type").drawView(), this.getChild("port").show(), this.getChild("namestep").show()
                }
                var port = this.getChild("port"),
                    portfield = port.ctrl.getChild();
                // if (portfield && portfield.views && (portfield.views[this.viewInx].lastValue = null), port.drawView(), this.updateBlank(), wizard ? (port.drawView(), port.updateModel(), no(port.ctrl.model.value) ? (this.ctrl.event("nophyiface", null, !0), alert(lng("3glte" == obj.value || "3g" == obj.value || "lte" == obj.value ? "wanNoUsbModemAvail" : "wanNoPhyIfaceAvail"))) : "notype" == obj.value ? this.ctrl.event("notypedisablenext", null, !0) : this.ctrl.event("phyifacepresent", null, !0)) : (this.getChild("provstep").ctrl.getChild("provs").model.value = provdlink, this.updateView(), this.ctrl.getParent().event("blankchange")), this.autoname(obj.value), "dynpptp" == obj.value || "dynl2tp" == obj.value || "dynpppoe" == obj.value ? this.ctrl.model.service.name = this.ctrl.autoname("dynamic") : ("statl2tp" == obj.value || "statpptp" == obj.value || "statpppoe" == obj.value) && (this.ctrl.model.service.name = this.ctrl.autoname("static")), this.ctrl.event("showneedpindialogrq", null, !0), "3glte" == obj.value) {
                //     var prov = this.getChild("provstep", "provs");
                //     ("3g" == prov.ctrl.model.value.deftype || "3glte" == prov.ctrl.model.value.deftype) && this.onfieldchange(prov)
                // }
                break;
            case "port":
                this.updateBlank(), wizard || this.ctrl.getParent().event("blankchange"), this.autoname(null, obj.value), this.getChild("type").updateModel(), this.getChild("type").ctrl.model.value, "dynpptp" == obj.value || "dynl2tp" == obj.value || "dynpppoe" == obj.value ? this.ctrl.model.service.name = this.ctrl.autoname("dynamic", obj.value) : ("statpptp" == obj.value || "statl2tp" == obj.value || "statpppoe" == obj.value) && (this.ctrl.model.service.name = this.ctrl.autoname("static", obj.value));
                break;
            case "provs":
                obj.view.updateModel();
                var model = this.ctrl.model;
                "man" == obj.value.provname && "notype" == obj.value.deftype ? this.wizard || (this.getChild("port").hide(), this.getChild("namestep").hide()) : this.wizard || (this.getChild("port").show(), this.getChild("namestep").show()), this.ctrl.model.selectTemplates(obj.value), this.ctrl.model.updateTemplates(), this.initPortValset(model.ifnode.contype), this.getChild("port").drawView();
                for (var i in this.ctrl.children) "provstep" != this.ctrl.children[i].alias && this.getChild(i).drawView();
                this.updateView(), wizard || this.ctrl.getParent().event("blankchange"), this.autoname()
        }
        return !1
    }, this.initPortValset = function(contype) {
        no(contype) && (contype = getConnType(this.ctrl.model.ifnode, this.ctrl.model.service));
        var valset = {},
            t = this.ctrl.model.templates[contype];
        for (var i in t)
            if ("any" != i)
                if (this.wizard && this.ctrl.isadding && !options.summary) {
                    valset[i] = {
                        value: t[i].__humanName__
                    };
                    var obj = valset[i];
                    if ("WiFiClient" != t[i].port) switch (t[i].type) {
                        case "ethernet":
                            obj.desc = lng("wanEthPort");
                            break;
                        case "ptm":
                            obj.desc = lng("wanPtmPort");
                            break;
                        case "atm":
                            obj.desc = "create" == i ? lng("wanAddNew") + " " + lng("wanATMPort") : lng("wanATMPort");
                            break;
                        case "3g":
                        case "lte":
                            obj.desc = lng("wan3GPort") + " (" + t[i].type.toUpperCase() + ")";
                            break;
                        case "auto":
                            obj.desc = lng("wanAutoPort")
                    }
                    else obj.desc = lng("wanWireless")
                }
                else valset[t[i].__humanName__] = i;
        var port = this.getChild("port");
        port.setOption("valset", valset);
        var firstValue = getObjectFirstChild(valset);
        port.ctrl.model.value = firstValue
    }, this.autoname = function(contype, ifname) {
        var name = this.getChild("namestep", "name");
        name.ctrl.modified || (name.ctrl.model.value = this.ctrl.autoname(contype, ifname), name.updateView())
    }, this.drawView = function() {
        var ctrl = this.ctrl,
            valset = {};
        if (ctrl.isadding ? this.initPortValset() : (ctrl.model.setL2HumanName(), valset[ctrl.model.ifnode.__humanName__] = ctrl.model.ifname, this.getChild("port").options.valset = valset), "notype" == this.getChild("type").ctrl.model.value) this.wizard || (this.disableButton("save"), this.getChild("port").hide(), this.getChild("namestep").hide(), this.getChild("provstep").show(), this.getChild("type").show());
        else {
            var typeValset = this.getChild("type").options.valset;
            if (this.wizard) {
                for (var key in typeValset)
                    if ("notype" == key) {
                        delete typeValset[key];
                        break
                    }
            }
            else {
                for (var key in typeValset)
                    if ("notype" == typeValset[key]) {
                        delete typeValset[key];
                        break
                    }
                this.getChild("port").show(), this.getChild("namestep").show()
            }
            this.getChild("type").setOption("valset", typeValset)
        }
        jsGeneralSettingsClientView.superclass.drawView.call(this)
    };
    var obj, opt;
    if (this.wizard = ctrl.model.iftree.wizard, obj = ctrl.getChild("provstep"), obj.nextIface = "client", obj.ifaceTypes.client.options = {
            nothing: !0
        }, obj = ctrl.getChild("provstep", "provs"), obj.nextIface = "selectex", obj.ifaceTypes.selectex.options = {
            humanName: "wanProv",
            editable: !1
        }, obj.ifaceTypes.selectex.options.hide = !ctrl.isadding || getObjectLength(provList) < 2, obj = ctrl.getChild("namestep"), obj.nextIface = "client", obj.ifaceTypes.client.options = this.wizard ? {
            nothing: !0,
            slider: !0,
            title: "wanNameWiz",
            descText: "wanNameDesc",
            nocollapse: !0
        } : {
            nothing: !0
        }, obj = ctrl.getChild("namestep", "name"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
            humanName: "wanName",
            mandatory: !0
        }, obj.ifaceTypes.input.options.disabled = !ctrl.isadding, this.wizard && ctrl.isadding && !options.summary ? (obj = ctrl.getChild("type"), obj.nextIface = "radio2", obj.ifaceTypes.radio2.options = {
            humanName: "wanTypeWiz"
        }, opt = obj.ifaceTypes.radio2.options, opt.valset = {}, opt.valset.notype = {
            value: lng("contypeNotSelected"),
            desc: ""
        }, opt.valset.pppoe = {
            value: "PPPoE",
            desc: lng("pppoedesc")
        }, opt.valset.static = {
            value: lng("static"),
            desc: lng("staticdesc")
        }, opt.valset.dynamic = {
            value: lng("dynamic"),
            desc: lng("dynamicdesc")
        }, opt.valset.statpptp = {
            value: lng("statpptp"),
            desc: lng("statpptpdesc")
        }, opt.valset.dynpptp = {
            value: lng("dynpptp"),
            desc: lng("dynpptpdesc")
        }, opt.valset.statpppoe = {
            value: lng("statpppoe"),
            desc: lng("statpppoedesc")
        }, opt.valset.dynpppoe = {
            value: lng("dynpppoe"),
            desc: lng("dynpppoedesc")
        }, opt.valset.statl2tp = {
            value: lng("statl2tp"),
            desc: lng("statpptpdesc")
        }, opt.valset.dynl2tp = {
            value: lng("dynl2tp"),
            desc: lng("dynpptpdesc")
        }) : (obj = ctrl.getChild("type"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
            humanName: "wanType"
        }, opt = obj.ifaceTypes.select.options, ctrl.model.ifnode.is_wan || ctrl.isadding ? (opt.valset = {}, opt.valset[lng("contypeNeedSelect")] = "notype", opt.valset.PPPoE = "pppoe", opt.valset[lng("static")] = "static", opt.valset[lng("dynamic")] = "dynamic", opt.valset[lng("statpptp")] = "statpptp", opt.valset[lng("dynpptp")] = "dynpptp", opt.valset[lng("statpppoe")] = "statpppoe", opt.valset[lng("dynpppoe")] = "dynpppoe", opt.valset.PPTP = "pptp", opt.valset[lng("statl2tp")] = "statl2tp", opt.valset[lng("dynl2tp")] = "dynl2tp", opt.valset.L2TP = "l2tp") : opt.valset = {
            "Static IP": "static"
        }), ctrl.isadding || (opt.disabled = !0), obj = ctrl.getChild("provstep", "desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
            label: "wanGenSect"
        }, this.wizard && (obj.ifaceTypes.separator.options.label = "wanProvSect", obj.ifaceTypes.separator.options.descText = "wanProvDesc"), obj = ctrl.getChild("port"), this.wizard && ctrl.isadding && !options.summary ? (obj.nextIface = "radio2", obj.ifaceTypes.radio2.options = {
            humanName: "wanPortWiz"
        }, opt = obj.ifaceTypes.radio2.options) : (obj.nextIface = "select", obj.ifaceTypes.select.options = {
            humanName: "wanPort"
        }, opt = obj.ifaceTypes.select.options), ctrl.isadding || (opt.disabled = !0), obj = ctrl.getChild("namestep", "enable"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
            humanName: "wanEnable",
            valset: {
                on: !0,
                off: !1
            }
        }, obj.ifaceTypes.checkbox.options.hide = !ctrl.model.ifnode.is_wan || this.wizard, obj = ctrl.getChild("namestep", "gwif"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
            humanName: "wanGwIf",
            valset: {
                on: !0,
                off: !1
            },
            hide: !0
        }, obj = ctrl.getChild("namestep", "direction"), obj.nextIface = "text", obj.ifaceTypes.text.options = {
            humanName: "wanDirection"
        }, obj.ifaceTypes.text.options.hide = this.wizard, jsGeneralSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), ctrl.isadding) this.initPortValset();
    else {
        ctrl.model.setL2HumanName();
        var port = this.getChild("port");
        port.options.valset = {};
        var valset = {};
        valset[ctrl.model.ifnode.__humanName__] = ctrl.model.ifname, this.getChild("port").setOption("valset", valset)
    }
    this.bind("fieldchange", this.onfieldchange)
}

function jsGeneralSettingsSummaryView(ctrl, viewInx, options) {
    jsGeneralSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.onupdatenamerq = function() {
        return this.getChild("namestep", "name").updateView(), !1
    }, this.drawView = function() {
        var namestep = this.getChild("namestep");
        namestep.options.nothing = !0, namestep.options.slider = !1;
        var desc = this.getChild("provstep", "desc");
        desc.options.hide = !1, desc.options.label = "wanGenSect", desc.options.descText = null, jsGeneralSettingsSummaryView.superclass.drawView.call(this)
    }, this.bind("fieldchange", function() {}), this.bind("updatenamerq", this.onupdatenamerq)
}

function jsProvListItemController(itemInfo, options) {
    jsProvListItemController.superclass.constructor.call(this, itemInfo, options), void 0 == itemInfo && (itemInfo = {}), this.changeModel(new jsSelectExItemModel(itemInfo)), this.ifaceTypes.tree = {
        type: jsProvListItemView,
        def: !0,
        options: {
            style: null,
            open: !1,
            noPath: !0
        }
    }
}

function jsProvListItemView(ctrl, viewInx, options) {
    jsProvListItemView.superclass.constructor.call(this, ctrl, viewInx, options), jsProvListItemView.prototype.drawView = function() {
        if (jsProvListItemView.superclass.drawView.call(this), !this.ctrl.root) {
            var noimage = !1;
            switch (this.ctrl.model.itemName) {
                case "russia":
                    img = "ru.gif";
                    break;
                case "ukraine":
                    img = "ua.gif";
                    break;
                case "kazakhstan":
                    img = "kz.gif";
                    break;
                case "azerbaijan":
                    img = "az.gif";
                    break;
                case "latvia":
                    img = "lv.gif";
                    break;
                case "estonia":
                    img = "ee.gif";
                    break;
                case "lithuania":
                    img = "lt.gif";
                    break;
                case "moldova":
                    img = "md.gif";
                    break;
                case "belarus":
                    img = "be.gif";
                    break;
                case "man":
                case "azercell":
                case "bakcell":
                case "etk":
                case "kcell":
                case "life":
                case "matrixmobile":
                case "narmobile":
                case "ncc":
                case "neo":
                case "pathword":
                case "simtravel":
                case "smarts":
                case "tambovgsm":
                case "tatincomncc":
                case "umc":
                case "utel":
                case "altaysviaz":
                case "bwc":
                case "kyivstar":
                case "megafon":
                case "motiv":
                case "mts":
                case "stekgsm":
                case "tele2":
                case "ulgsm":
                case "diex":
                case "uucn":
                case "djuice":
                case "beeline":
                case "moldcell":
                case "orange":
                case "unite":
                case "be_hivelcom":
                case "be_life":
                case "be_velcom":
                    img = this.ctrl.model.itemName + ".gif";
                    break;
                case "skylink":
                    img = "skylink.png";
                    break;
                case "jeans":
                    img = "mts.gif";
                    break;
                case "abkyivstar":
                case "abkyivstar_lte":
                    img = "kyivstar.gif";
                    break;
                default:
                    noimage = !0
            }
            noimage || $(this.myBoxSel).css("background", "url(/image/" + img + ") no-repeat")
        }
    }
}

function jsProvListController(value) {
    jsProvListController.superclass.constructor.call(this, value), this.getChild("field").ifaceTypes.selectex = {
        type: jsProvListView
    }
}

function jsProvListView(ctrl, viewInx, options) {
    jsProvListView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function jsHelpModel(key_page) {
    jsHelpModel.superclass.constructor.call(this), this.key_page = key_page
}

function jsHelpController(key_page) {
    jsHelpController.superclass.constructor.call(this), this.changeModel(new jsHelpModel(key_page)), this.model.key_page = key_page, this.addChild(new jsHelpDialogController(key_page), "myDialog"), this.ifaceTypes.client = {
        type: jsHelpClientView
    }, this.ifaceTypes.client.options = {}
}

function jsHelpClientView(ctrl, viewInx, options) {
    options.simple = !1, options.nothing = !1, options.title = {
        name: "helpLabel",
        type: "text"
    }, this.onreadmore = function() {
        this.getChild("myDialog").show()
    }, this.dialogClose = function() {
        this.getChild("myDialog").hide()
    };
    var myDialog = ctrl.getChild("myDialog");
    myDialog.ifaceTypes.client.options = {
        title: {
            name: "helpLabel"
        },
        width: "600px",
        height: "400px"
    }, myDialog.ifaceTypes.client.options.buttons = [{
        name: "close",
        value: "helpExtendedClose",
        handler: context(this).callback(this.dialogClose)
    }], this.hideAll = !1, jsHelpClientView.prototype.drawView = function() {
        return jsHelpClientView.superclass.drawView.call(this), $("#uiContentBody").css("width", "79%"), $("#uiContentBody").css("float", "left"), $(".inmainblock").css("padding", "8px 0 30px 30px"), $("#showerHelp").is(":visible") || $("#showerHelp").css("display", "none"), $("#showHelpLink").html(lng("helpLabel") + "<img src=../image/show_help.gif>"), $(this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent").html("<div id='helptext'></div>" + $(this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent").html()), $(this.viewBoxSel + ">div.fieldSetMainPath>div>font").html(lng("helpLabel")), $(this.viewBoxSel + ">div.fieldSetMainPath").append("<a href='#' id='closerHelp'> <img src='../image/closer.gif'/></a>"), this.updateView(), $("#closerHelp").click(function() {
            $("#contentHelp").fadeOut("fast"), $("#uiContentBody").delay(500).animate({
                width: "88%"
            }, 600, function() {}), $("#showerHelp").delay(1250).fadeIn("slow")
        }), $("#showHelpLink").click(function() {
            $("#showerHelp").fadeOut("fast"), $("#uiContentBody").delay(500).animate({
                width: "79%"
            }, 600, function() {}), $("#contentHelp").delay(1e3).fadeIn("fast")
        }), !1
    }, jsHelpClientView.prototype.updateView = function() {
        jsHelpClientView.superclass.updateView.call(this);
        var key_page = ctrl.model.key_page;
        return key_page && lng("help_" + key_page) == "help_" + key_page ? (this.hideAll = !0, $("#contentHelp").css("display", "none"), $("#showerHelp").css("display", "none"), $(".inmainblock").css("padding", "8px 30px 30px 30px"), $("#uiContentBody").css("width", "100%")) : ($("#uiContentBody").css("float", "left"), $(".inmainblock").css("padding", "8px 0 30px 30px"), $("#showerHelp").is(":visible") ? $("#uiContentBody").css("width", "88%") : ($("#uiContentBody").css("width", "79%"), $("#contentHelp").fadeIn()), $(this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent>div#helptext").html(lng("help_" + key_page) + "<br><a href='#' id='read_more'>" + lng("read_more") + "</a>"), $("#read_more").click(context(this).callback(this.onreadmore)), this.getChild("myDialog").ctrl.model.key_page = key_page, this.getChild("myDialog").drawView()), !1
    }, this.onupdateHelp = function() {
        $("#showerHelp").is(":visible") ? (this.updateView(), this.hideAll || $("#showerHelp").fadeIn("fast")) : this.updateView()
    }, this.ondrawHelp = function() {
        $("#showerHelp").is(":visible") ? (this.drawView(), $("#showerHelp").fadeIn("fast")) : this.drawView()
    }, this.hide = function() {
        $("#contentHelp").css("display", "none"), $("#uiContentBody").css("width", "100%")
    }, this.show = function() {
        $("#contentHelp").css("display", "block"), $("#uiContentBody").css("width", "79%")
    }, jsHelpClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("updateHelp", this.onupdateHelp), this.bind("drawHelp", this.ondrawHelp)
}

function jsHelpDialogModel(key_page) {
    jsHelpDialogModel.superclass.constructor.call(this), this.key_page = key_page
}

function jsHelpDialogController(key_page) {
    jsHelpDialogController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsHelpDialogClientView
    }, this.nextIface = "client", this.changeModel(new jsHelpDialogModel(key_page)), this.model.key_page = key_page
}

function jsHelpDialogClientView(ctrl, viewInx, options) {
    jsHelpDialogClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsHelpDialogClientView.prototype.drawView = function() {
        jsHelpDialogClientView.superclass.drawView.call(this);
        var key_page = ctrl.model.key_page;
        return $(this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent").html(lng("help_ex_" + key_page)), $(this.viewBoxSel + ">div.fieldSetMainPath>div>font").html(lng("helpLabel")), !1
    }
}

function jsIfListModel(json, value) {
    jsIfListModel.superclass.constructor.call(this, value), this.json = json
}

function jsIfListController(json, value) {
    jsIfListController.superclass.constructor.call(this), this.createValSet = function() {
        var services = null,
            tunnels = null,
            json = this.model.json,
            valset = {};
        for (var i in json)
            if ((!this.filter.onlyWANs || json[i].is_wan) && (services = json[i].services))
                for (var j in services) {
                    if (tunnels = services[j].tunnels)
                        for (var k in tunnels) valset[tunnels[k].name] = k;
                    valset[services[j].name] = j
                }
            return this.filter.drawAutoIface && (valset["&lt;" + lng("type_start_auto") + "&gt;"] = "auto"), this.ifaceTypes.select.options.valset = valset, this.ifaceTypes.radio.options.valset = valset, valset
    }, this.ifaceTypes.select = {
        type: jsInputSlotView,
        options: {}
    }, this.ifaceTypes.radio = {
        type: jsInputSlotView,
        options: {}
    }, this.addChild(new jsInputFieldController(value), "field").changeModel(new jsIfListModel(json, value)), this.changeModel(this.getChild("field").model), this.filter = {
        onlyWANs: !0
    }, this.createValSet()
}

function pageMisc() {
    pageMisc.superclass.constructor.call(this), this.updateView = function(phase) {
        if (pageMisc.superclass.updateView.apply(this, arguments), "forward" == phase) {
            try {
                this.startForm();
                var answerIgmp = this.rq[this.inxIgmp];
                if (is.RPC_SUCCESS(answerIgmp)) {
                    var jsonIgmp = this.jsonIgmp = $.extend(!0, {}, answerIgmp.resident),
                        version = jsonIgmp.enable ? jsonIgmp.version : "off";
                    this.add(new nodeSelect("IGMP", version, {
                        optionArray: [{
                            name: "IGMPv3",
                            value: 3
                        }, {
                            name: "IGMPv2",
                            value: 2
                        }, {
                            name: "igmpOff",
                            value: "off"
                        }]
                    }), "igmp"), _.isBoolean(jsonIgmp.zeroSrcAddr) && this.add(new nodeCheckBox("setZeroIGMPSrcAddr", jsonIgmp.zeroSrcAddr), "zeroSrcAddr")
                }
                var answerNetFilter = this.rq[this.inxNetFilter];
                if (is.RPC_SUCCESS(answerNetFilter)) {
                    var jsonNetFilter = this.jsonNetFilter = $.extend(!0, {}, answerNetFilter.resident.netfilter);
                    this.add(new nodeCheckBox("SIP", jsonNetFilter.sip, {
                        comment: "needReboot"
                    }), "sip").add(new nodeCheckBox("RTSP", jsonNetFilter.rtsp, {
                        comment: "needReboot"
                    }), "rtsp")
                }
                var answerPppPassThrough = this.rq[this.inxPppPassThrough];
                if (is.RPC_SUCCESS(answerPppPassThrough)) {
                    var jsonPppPassThrough = this.jsonPppPassThrough = $.extend(!0, {}, answerPppPassThrough.resident);
                    this.add(new nodeCheckBox("wanPppoePassThrough", jsonPppPassThrough.enabled), "pppPassThrough"), this.add(new nodeCheckBox("wanPptpPassThrough", jsonPppPassThrough.pptp, {
                        comment: "wanPptpPassThroughDecription"
                    }), "pptpPassThrough"), this.add(new nodeCheckBox("wanL2tpPassThrough", jsonPppPassThrough.l2tp), "l2tpPassThrough"), this.add(new nodeCheckBox("wanIPSecPassThrough", jsonPppPassThrough.ipsec), "ipsecPassThrough")
                }
                var answerDruFiltering = this.rq[this.inxDruFiltering];
                if (is.RPC_SUCCESS(answerDruFiltering)) {
                    var jsonDruFiltering = this.jsonDruFiltering = $.extend(!0, {}, answerDruFiltering.resident);
                    this.add(new nodeCheckBox("druFiltering", jsonDruFiltering.enabled), "druFiltering")
                }
                this.get("druFiltering").setComment("druFilteringComment");
                var answerStorage = this.rq[this.inxStorage];
                if (is.RPC_SUCCESS(answerStorage)) {
                    var storage = answerStorage.resident.usb_storage;
                    storage && _.size(storage) > 0 ? !0 : !1
                }
                var answerUdpxy = this.rq[this.inxUdpxy];
                if (is.RPC_SUCCESS(answerUdpxy)) {
                    var jsonUdpxy = this.jsonUdpxy = $.extend(!0, {}, answerUdpxy.resident.udpxy),
                        static_href_1_udpxy = document.location.protocol + "//" + document.location.hostname + ":",
                        static_href_2_udpxy = "/status' target='_blank'>" + static_href_1_udpxy + jsonUdpxy.port + "/status";
                    this.add(new nodeCaption("UDPXY", "UDPXYcomment"), "udpxyCap"), this.add(new nodeComment("UDPXYIgmpWarning")), this.add(new nodeCheckBox("UDPXYenable", jsonUdpxy.enabled), "udpxy").add(new nodeport("UDPXYport", jsonUdpxy.port ? jsonUdpxy.port : "4022", {
                        mandatory: !0
                    }), "portUDPXY").add(new nodestatic("UDPXYservice", ""), "linkUDPXY").add(new nodenum("UDPXYsocbuf", jsonUdpxy.socbuf ? jsonUdpxy.socbuf : 131071, {
                        minval: 4096,
                        maxval: 1048576,
                        mandatory: !0
                    }), "socbufUDPXY").add(new nodenum("UDPXYbufcli", jsonUdpxy.bufcli ? jsonUdpxy.bufcli : 32768, {
                        minval: 4096,
                        maxval: 1048576,
                        mandatory: !0
                    }), "bufcliUDPXY").add(new nodenum("UDPXYmaxcli", jsonUdpxy.maxcli ? jsonUdpxy.maxcli : 3, {
                        minval: 1,
                        maxval: 10,
                        mandatory: !0
                    }), "maxcliUDPXY"), this.child("linkUDPXY").val("<a href='" + static_href_1_udpxy + jsonUdpxy.port + static_href_2_udpxy + "</a>"), jsonUdpxy.enabled ? (this.child("linkUDPXY").show(), this.child("portUDPXY").show(), this.child("socbufUDPXY").show(), this.child("bufcliUDPXY").show(), this.child("maxcliUDPXY").show()) : (this.child("linkUDPXY").hide(), this.child("portUDPXY").hide(), this.child("socbufUDPXY").hide(), this.child("bufcliUDPXY").hide(), this.child("maxcliUDPXY").hide()), jsonUdpxy.constraints && jsonUdpxy.constraints.Available_ifaces, this.child("portUDPXY").$box.data("previous_value", this.jsonUdpxy.port ? this.jsonUdpxy.port.toString() : "4022"), this.listen("udpxy", "fieldchange", callback(this, function(status, value) {
                        this.jsonUdpxy.enabled = value, answerUdpxy.resident.udpxy.enabled = value;
                        var query = [];
                        query.push([203, {
                            udpxy: _.omit(this.jsonUdpxy, "constraints")
                        }]), this.deep.updateView()
                    }))
                }
                this.endForm(), this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                    if (this.deep.updateModel()) {
                        var query = [];
                        this.inxIgmp = query.length, query.push([68, this.jsonIgmp]), this.jsonNetFilter && (this.inxNetFilter = query.length, query.push([183, {
                            netfilter: this.jsonNetFilter
                        }])), this.jsonPppPassThrough && (this.inxPppPassThrough = query.length, query.push([188, {
                            enabled: this.get("pppPassThrough").val(),
                            pptp: this.get("pptpPassThrough").val(),
                            l2tp: this.get("l2tpPassThrough").val(),
                            ipsec: this.get("ipsecPassThrough").val()
                        }])), this.jsonUdpxy && query.push([203, {
                            udpxy: _.omit(this.jsonUdpxy, "constraints")
                        }]), this.jsonDruFiltering && query.push([215, this.jsonDruFiltering]), rootView.showModalOverlay(), device.config.write(query, callback(this, function() {
                            rootView.hideModalOverlay(), this.emit("updaterq")
                        }))
                    }
                }))
            }
            catch (e) {
                this.$box.errorBlock(lng("error"), e.message, null, lng("refresh"), callback(this, function() {
                    this.emit("updaterq")
                }))
            }
            rootView.hideModalOverlay()
        }
    }, this.updateModel = function(status) {
        if (!status.error) {
            var jsonIgmp = this.jsonIgmp,
                igmp = this.get("igmp").val();
            jsonIgmp.enable = "off" == igmp ? !1 : !0, jsonIgmp.enable && (jsonIgmp.version = parseInt(igmp));
            var zeroSrcAddr = this.get("zeroSrcAddr");
            zeroSrcAddr && (jsonIgmp.zeroSrcAddr = zeroSrcAddr.val());
            var jsonNetFilter = this.jsonNetFilter;
            jsonNetFilter && (jsonNetFilter.rtsp = this.get("rtsp").val(), jsonNetFilter.sip = this.get("sip").val());
            var jsonUdpxy = this.jsonUdpxy;
            jsonUdpxy && (jsonUdpxy.enabled = this.get("udpxy").val(), jsonUdpxy.port = this.get("portUDPXY").val(), jsonUdpxy.socbuf = this.get("socbufUDPXY").val().toString(), jsonUdpxy.bufcli = this.get("bufcliUDPXY").val().toString(), jsonUdpxy.maxcli = this.get("maxcliUDPXY").val().toString());
            var jsonDruFiltering = this.jsonDruFiltering;
            jsonDruFiltering && (jsonDruFiltering.enabled = this.get("druFiltering").val())
        }
    }, this.bind("fieldchange", function(status) {
        switch (status.target.getAlias()) {
            case "pppPassThrough":
        }
    }), this.bind("updaterq", function() {
        rootView.showModalOverlay();
        var RPC_LIST = [];
        this.inxIgmp = RPC_LIST.length, RPC_LIST.push(68), this.inxNetFilter = RPC_LIST.length, RPC_LIST.push(183), this.inxPppPassThrough = RPC_LIST.length, RPC_LIST.push(188), this.inxStorage = RPC_LIST.length, RPC_LIST.push(82), this.inxUdpxy = RPC_LIST.length, RPC_LIST.push(203), this.inxDruFiltering = RPC_LIST.length, RPC_LIST.push(215), device.config.read(RPC_LIST, callback(this, function(data) {
            this.rq = data.rq, this.deep.updateView()
        }))
    })
}

function gridIPFilters(rules, v6) {
    function checkIPv6(ip) {
        var ipbuf = ip.split(":");
        if (ipbuf.length > 4) {
            for (var j = 0, ipstart = ""; j < ipbuf.length - 1; j++) ipstart += ":" != ipbuf[j] ? ipbuf[j] + ":" : ":", 3 == j && (ipstart += "</br>");
            ipstart += ipbuf[ipbuf.length - 1], ip = ipstart
        }
        return ip
    }
    gridIPFilters.superclass.constructor.call(this), this.ipfltProtoNames = ["TCP/UDP", "TCP", "UDP", "ICMP", "all_"], this.ipfltActions = ["ipfAccept", "ipfDrop"], this.rules = rules, this.$grid = null, v6 && (this.$gridv6 = null), this.updateView = function(phase) {
        if (gridIPFilters.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var all = lng("ipfltAll");
            if (v6) {
                var headerv6 = [];
                headerv6.push([{
                    name: "",
                    colspan: 2
                }, {
                    name: "ipfltIpv6Port",
                    colspan: 2
                }, {
                    name: "",
                    colspan: 2
                }]), headerv6.push([{
                    index: "id",
                    name: "ruleID"
                }, {
                    index: "proto",
                    name: "protocol"
                }, {
                    index: "ipsrc",
                    name: "ipfltSource"
                }, {
                    index: "ipdst",
                    name: "destination"
                }, {
                    index: "action",
                    name: "ipfltAction"
                }, {
                    index: "state",
                    name: "Status"
                }]), this.$gridv6 = this.$box.lightUIGrid(headerv6, 0, {
                    clickable: !0,
                    selectable: !0,
                    id: "v6"
                })
            }
            else {
                var header = [];
                header.push([{
                    name: "",
                    colspan: 2
                }, {
                    name: "ipfltIpv4Port",
                    colspan: 2
                }, {
                    name: "",
                    colspan: 2
                }]), header.push([{
                    index: "id",
                    name: "ruleID"
                }, {
                    index: "proto",
                    name: "protocol"
                }, {
                    index: "ipsrc",
                    name: "ipfltSource"
                }, {
                    index: "ipdst",
                    name: "destination"
                }, {
                    index: "action",
                    name: "ipfltAction"
                }, {
                    index: "state",
                    name: "Status"
                }]), this.$grid = this.$box.lightUIGrid(header, 0, {
                    clickable: !0,
                    selectable: !0,
                    id: "v4"
                })
            }
            var $row, rule, arr, arrp;
            for (var i in this.rules)
                if (rule = this.rules[i], null != rule.ips) {
                    $row = v6 ? this.$gridv6.addRow().row("last") : this.$grid.addRow().row("last"), $row.data("pos", this.rules[i].pos), $row.col("id").html(rule.id).data("id", rule.id), $row.col("proto").html(lng(this.ipfltProtoNames[rule.proto])).data("proto", rule.proto).attr("langkey", this.ipfltProtoNames[rule.proto]);
                    var strips = "";
                    v6 ? (arr = rule.ips.split("-"), strips = arr[1] ? "[" + checkIPv6(arr[0]) + "<br>-<br>" + checkIPv6(arr[1]) + "]" : "" != rule.ips && "::" != rule.ips ? "[" + checkIPv6(rule.ips) + "]" : "[" + all + "]") : strips = "" != rule.ips && "0.0.0.0/0" != rule.ips ? rule.ips : all;
                    var strps = "";
                    rule.ports && "" != rule.ports ? (arrp = rule.ports.split(":"), strps = arrp[1] ? arrp[0] + "-" + arrp[1] : arrp[0]) : strps = all, strips = strips.length + strps.length > 21 ? strips + "<br>:" + strps : strips + ":" + strps, ("" == rule.ips && "" == rule.ports || "0.0.0.0/0" == rule.ips && ("" == rule.ports || !rule.ports) || "::" == rule.ips && ("" == rule.ports || !rule.ports)) && (strips = v6 ? "[" + all + "]:" + all : all + ":" + all), $row.col("ipsrc").html(strips);
                    var stripd = "";
                    v6 ? (arr = rule.ipd.split("-"), stripd = arr[1] ? "[" + checkIPv6(arr[0]) + "<br>-<br>" + checkIPv6(arr[1]) + "]" : "" != rule.ipd && "::" != rule.ipd ? "[" + checkIPv6(rule.ipd) + "]" : "[" + all + "]") : stripd = "" != rule.ipd && "0.0.0.0/0" != rule.ipd ? rule.ipd : all;
                    var strpd = "";
                    rule.portd && "" != rule.portd ? (arrp = rule.portd.split(":"), strpd = arrp[1] ? arrp[0] + "-" + arrp[1] : arrp[0]) : strpd = all, stripd = stripd.length + strpd.length > 21 ? stripd + "<br>:" + strpd : stripd + ":" + strpd, ("" == rule.ipd && "" == rule.portd || "0.0.0.0/0" == rule.ipd && ("" == rule.portd || !rule.portd) || "::" == rule.ipd && ("" == rule.portd || !rule.portd)) && (stripd = v6 ? "[" + all + "]:" + all : all + ":" + all), $row.col("ipdst").html(stripd), $row.col("action").html(lng(this.ipfltActions[rule.action])).data("action", rule.action).attr("langkey", this.ipfltActions[rule.action]), $row.col("state").html(lng(rule.state ? "ipfltOn" : "ipfltOff")).data("state", rule.state)
                }
            v6 ? this.$gridv6.bind("selection.grid", callback(this, function() {
                this.parent.updateRuleButtons()
            })) : this.$grid.bind("selection.grid", callback(this, function() {
                this.parent.updateRuleButtons()
            })), v6 ? this.$gridv6.bind("rowclick.grid", context(this).callback(function(event, $row) {
                var ips, ipd, ports, portd, pos;
                if (this.rules)
                    for (i in this.rules) this.rules[i].id == $row.col("id").data("id") && (ips = this.rules[i].ips, ipd = this.rules[i].ipd, ports = this.rules[i].ports, portd = this.rules[i].portd, pos = this.rules[i].pos);
                var rule = {
                    id: $row.col("id").data("id"),
                    proto: $row.col("proto").data("proto"),
                    is_ipv6: !0,
                    ips: ips,
                    ipd: ipd,
                    ports: ports,
                    portd: portd,
                    pos: pos,
                    action: $row.col("action").data("action"),
                    state: $row.col("state").data("state")
                };
                this.parent.edit(rule, pos)
            })) : this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                var ips, ipd, ports, portd, pos;
                if (this.rules)
                    for (i in this.rules) this.rules[i].id == $row.col("id").data("id") && (ips = this.rules[i].ips, ipd = this.rules[i].ipd, ports = this.rules[i].ports, portd = this.rules[i].portd, pos = this.rules[i].pos);
                var rule = {
                    id: $row.col("id").data("id"),
                    proto: $row.col("proto").data("proto"),
                    ips: ips,
                    ipd: ipd,
                    ports: ports,
                    portd: portd,
                    pos: pos,
                    action: $row.col("action").data("action"),
                    state: $row.col("state").data("state")
                };
                this.parent.edit(rule, pos)
            }))
        }
    }, this.bind("updaterq", function() {
        this.deep.updateView()
    })
}

function pageIPFilters() {
    pageIPFilters.superclass.constructor.call(this), this.glRule = {
        ipv4: null,
        ipv6: null
    }, this.grid = new gridIPFilters(this.json, !1), this.updateView = function(phase) {
        if (pageIPFilters.superclass.updateView.apply(this, arguments), "forward" == phase) {
            this.startForm().add(this.grid);
            var json = this.json;
            this.updateRuleButtons = function() {
                this.grid.$grid.selection().not(":hidden").length ? this.getButton("button_del").enable() : this.getButton("button_del").disable()
            }, this.cleanButtonBar().addButton("add").getButton("add").bind("click.button", context(this).callback(function() {
                this.edit()
            })), this.addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function() {
                for (var rmlist = new Array, i = this.grid.$grid.nrow(); i >= 0; i--)
                    if (this.grid.$grid.row(i).hasClass("selected")) {
                        var pos = this.grid.$grid.row(i).data().pos;
                        rmlist.push([88, this.json[pos], pos])
                    }
                rmlist = _.sortBy(rmlist, function(array) {
                    return Math.min(array[2])
                }).reverse(), rmlist.length && (rootView.showModalOverlay(), device.config.remove(rmlist, callback(this, function() {
                    this.emit("updaterq")
                })))
            }, json)), disableFlag(88) && (this.getButton("add").children("div").addClass("disable"), this.getButton("button_del").children("div").addClass("disable"))
        }
    }, this.clearFilter = function(ruleall, grid) {
        for (var rmlist = new Array, i = grid.nrow(); i >= 0; i--) grid.row(i).hasClass("selected") && rmlist.push([88, ruleall[i], grid.row(i).data().pos]);
        rmlist.length && (rootView.showModalOverlay(), device.config.remove(rmlist, callback(this, function() {
            this.emit("updaterq")
        })))
    }, this.edit = function(rule, pos) {
        this.$box.unbind();
        var ruleNode = new ruleIPFilters(this.iftree, this.lanClients, this.json, this.grid.ipfltProtoNames, this.grid.ipfltActions, rule, pos);
        ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), is.object(rule) && (ruleNode.addButton("button_del").getButton("button_del").bind("click.button", context(this).callback(function() {
            rootView.showModalOverlay(), device.config.remove(88, rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            }))
        })), disableFlag(88) && ruleNode.getButton("button_del").children("div").addClass("disable")), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            ruleNode.deep.updateModel(), ruleNode.status.error || (rootView.showModalOverlay(), device.config.write(88, ruleNode.rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            })))
        })), disableFlag(88) && ruleNode.getButton("button_save").children("div").addClass("disable")
    }, this.onupdaterq = function() {
        rootView.showModalOverlay(), device.config.read([88, 1, 187], context(this).callback(function(data) {
            if (rootView.hideModalOverlay(), is.RPC_SUCCESS(data.rq)) {
                this.json = data.rq[0].resident.ipfilter;
                var i, biggestId = 0;
                for (i in this.json) this.json[i].id && this.json[i].id > biggestId && (biggestId = this.json[i].id);
                needUpdate = !1;
                for (i in this.json)
                    if (null == this.json[i].ips && (this.glRule[this.json[i].is_ipv6 ? "ipv6" : "ipv4"] = {
                            pos: parseInt(i),
                            rule: {
                                id: this.json[i].id,
                                ips: null,
                                ipd: "-",
                                action: this.json[i].action
                            }
                        }), void 0 == this.json[i].id) {
                        needUpdate = !0, biggestId++;
                        var rule = {
                            id: biggestId,
                            proto: this.json[i].proto,
                            ips: this.json[i].ips,
                            ipd: this.json[i].ipd,
                            ports: this.json[i].ports,
                            portd: this.json[i].portd,
                            action: this.json[i].action,
                            state: !0
                        };
                        device.config.write(88, rule, parseInt(i), callback(this, function() {}))
                    }
                needUpdate && this.emit("updaterq")
            }
            else this.json = [];
            this.json_bufpos = [];
            for (var i = 0; this.json && i < this.json.length; i++) {
                var ipf = this.json[i];
                ipf.pos = i, this.json_bufpos.push(ipf)
            }
            this.grid.rules = this.json_bufpos, this.iftree = is.RPC_SUCCESS(data.rq) ? data.rq.resident : {}, this.lanClients = is.RPC_SUCCESS(data.rq) ? data.rq.resident : [], this.deep.updateView()
        }))
    }, this.bind("updaterq", this.onupdaterq)
}

function ruleIPFilters(iftree, lanClients, rules, ipfltProtoNames, ipfltActions, rule, pos) {
    ruleIPFilters.superclass.constructor.call(this), is.unset(rule) && (this.isadding = !0, rule = {}, pos = -1), this.updateView = function(phase) {
        if (ruleIPFilters.superclass.updateView.apply(this, arguments), "forward" == phase);
        else {
            var proto = this.child("general/proto");
            proto.cleanOptions();
            for (var i in ipfltProtoNames) proto.addOption(ipfltProtoNames[i], i);
            var action = this.child("general/action");
            action.cleanOptions();
            for (var i in ipfltActions) action.addOption(ipfltActions[i], i);
            var ipsrc = this.child("ip/ipsrc"),
                ipdst = this.child("ip/ipdst");
            this.addIPRows(ipsrc), this.addIPRows(ipdst), this.child("general/proto").fieldchange(), ipsrc.pluginDst.isEmpty() ? this.child("ip/range").val(!1).fieldchange() : this.child("ip/range").val(!0).fieldchange(), this.jQuery("ip/range").hide()
        }
    }, this.addIPRows = function(control) {
        var version = 4;
        control.cleanRows();
        for (var i = 0; i < lanClients.length; i++) obj = lanClients[i], 4 == version ? is.IPv4(obj.ip) && control.addRow(obj.ip, obj.mac, obj.hostname) : is.IPv4(obj.ip) || control.addRow(obj.ip, obj.mac, obj.hostname);
        return this
    }, this.updateModel = function(status) {
        this.checkIPRange = function(rangeString) {
            if (rangeString) {
                var arr = rangeString.split("-");
                if (arr[1]) {
                    if (arr[0] == arr[1]) return arr[0];
                    var rangeCorrect = !0,
                        firstIP = arr[0].split("."),
                        lastIP = arr[1].split(".");
                    for (var i in firstIP)
                        if (parseInt(firstIP[i]) > parseInt(lastIP[i])) {
                            rangeCorrect = !1;
                            break
                        }
                    return rangeCorrect ? arr[0] + "-" + arr[1] : arr[1] + "-" + arr[0]
                }
                return arr[0]
            }
            return ""
        };
        try {
            if (!status.error) {
                var general = this.child("general"),
                    ip = this.child("ip"),
                    ports = this.child("ports");
                portsrc = ports.child("portsrc"), portdst = ports.child("portdst");
                var patt = /^\d+:\d+$/;
                if (portsrc.pluginInput.isEmpty() || portdst.pluginInput.isEmpty()) {
                    if (-1 != portsrc.val().indexOf(" ") || -1 != portdst.val().indexOf(" ")) throw new Error("ipfltWrongPortOrRange");
                    if (!portsrc.pluginInput.isEmpty())
                        for (var srcArr2, srcArr = portsrc.val().split(","), i = 0; i < srcArr.length; i++)
                            if (patt.test(srcArr[i])) {
                                srcArr2 = srcArr[i].split(":");
                                for (var j = 0; j < srcArr2.length; j++)
                                    if (!is.port(srcArr2[j])) throw new Error("ipfltWrongPortOrRange3")
                            }
                            else if (!is.port(srcArr[i])) throw new Error("ipfltWrongPortOrRange3");
                    if (!portdst.pluginInput.isEmpty())
                        for (var dstArr2, dstArr = portdst.val().split(","), i = 0; i < dstArr.length; i++)
                            if (patt.test(dstArr[i])) {
                                dstArr2 = dstArr[i].split(":");
                                for (var j = 0; j < dstArr2.length; j++)
                                    if (!is.port(dstArr2[j])) throw new Error("ipfltWrongPortOrRange3")
                            }
                            else if (!is.port(dstArr[i])) throw new Error("ipfltWrongPortOrRange3")
                }
                else {
                    var srcArr2, dstArr2, srcArr = portsrc.val().split(","),
                        dstArr = portdst.val().split(",");
                    if (-1 != portsrc.val().indexOf(" ") || -1 != portdst.val().indexOf(" ")) throw new Error("ipfltWrongPortOrRange");
                    if (srcArr.length != dstArr.length) throw new Error("ipfltWrongPortOrRange2");
                    for (var i = 0; i < srcArr.length; i++)
                        if (patt.test(srcArr[i])) {
                            if (!patt.test(dstArr[i])) throw new Error("ipfltWrongPortOrRange2");
                            srcArr2 = srcArr[i].split(":"), dstArr2 = dstArr[i].split(":");
                            for (var j = 0; j < srcArr2.length; j++)
                                if (!is.port(srcArr2[j]) || !is.port(dstArr2[j])) throw new Error("ipfltWrongPortOrRange3")
                        }
                        else {
                            if (patt.test(dstArr[i])) throw new Error("ipfltWrongPortOrRange2");
                            if (!is.port(srcArr[i]) || !is.port(dstArr[i])) throw new Error("ipfltWrongPortOrRange3")
                        }
                }
                if (this.child("ip/ipsrc").isRange() && is.set(this.child("ip/ipsrc").val().split("/")[1])) throw new Error("ipfltWrongStartIP");
                if (this.child("ip/ipdst").isRange() && is.set(this.child("ip/ipdst").val().split("/")[1])) throw new Error("ipfltWrongStartIP");
                checkIpLanAddr(ip, iftree) || confirm(lng("ipfltIpLocalWarning")) || (status.error = !0, status.nodes.push(this));
                var idnum = null;
                idnum = this.isadding ? rules.length ? _.last(rules).id + 1 : 1 : rule.id, this.rule = {
                    id: idnum,
                    proto: new Number(general.child("proto").val()).valueOf(),
                    ips: this.checkIPRange(this.child("ip/ipsrc").val()),
                    ipd: this.checkIPRange(this.child("ip/ipdst").val()),
                    ports: ports.child("portsrc").val(),
                    portd: ports.child("portdst").val(),
                    action: new Number(general.child("action").val()).valueOf(),
                    state: general.child("state").val()
                };
                for (i in rules)
                    if (this.rule.id != rules[i].id && this.rule.proto == rules[i].proto && this.rule.ips == rules[i].ips && this.rule.ipd == rules[i].ipd && this.rule.ports == rules[i].ports && this.rule.portd == rules[i].portd) throw new Error(lng("ipfltRuleExists") + rules[i].id + ".");
                    "" == this.child("ip/ipsrc").val() && "" == this.child("ip/ipdst").val() && "" == ports.child("portsrc").val() && "" == ports.child("portdst").val() && "0" == general.child("action").val() && (alert(lng("ipfltErrorNotParam")), status.error = !0)
            }
        }
        catch (e) {
            status.error = !0, status.nodes.push(this), alert(lng(e.message))
        }
        this.status = status
    }, this.onfieldchange = function(status, value) {
        switch (status.target.getAlias()) {
            case "proto":
                switch (value) {
                    case "3":
                    case "4":
                        this.child("ports/portsrc").disable(), this.child("ports/portdst").disable();
                        break;
                    default:
                        this.child("ports/portsrc").enable(), this.child("ports/portdst").enable()
                }
                break;
            case "range":
        }
    };
    var comboHeader = [{
        index: "ip",
        name: "IP"
    }, {
        index: "mac",
        name: "MAC"
    }, {
        index: "host",
        name: "Host"
    }];
    this.add(new node, "general").add(new node, "ip").add(new node, "ports"), this.child("general").add(new nodeCaption("ipfltGenSect")).add(new nodeSelect("protocol", rule.proto), "proto").add(new nodeSelect("ipfltAction", rule.action), "action"), this.child("general").add(new nodeCheckBox("ipfltActivateNow", this.isadding || rule.state !== !1 ? !0 : !1), "state"), this.child("ip").add(new nodeCaption("ipfltSectIP", "ipfltSectIPDesc2")).add(new nodeCheckBox("ipfltIPRange2", !1), "range").add(new nodeComboIPRange("ipsrc", rule.ips, {
        header: comboHeader
    }), "ipsrc").add(new nodeComboIPRange("ipdst", rule.ipd, {
        header: comboHeader
    }), "ipdst"), this.child("ports").add(new nodeCaption("ipfltSectPort", "ipfltSectPortDesc2")).add(new nodeportold("portsrc", rule.ports, {
        isRange: !0,
        isSeveral: !0
    }), "portsrc").add(new nodeportold("portdst", rule.portd, {
        isRange: !0,
        isSeveral: !0
    }), "portdst"), this.bind("fieldchange", this.onfieldchange)
}

function nodeComboIPRange(name, range, options) {
    nodeComboIPRange.superclass.constructor.apply(this, arguments), this.options = options ? options : {}, this.updateView = function(phase) {
        if (nodeComboIPRange.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var options = this.options;
            this.pluginEdit = this.$box.lightUIEdit(name, options.comment, {
                mandatory: options.mandatory
            });
            var $input = this.pluginEdit.find(".input");
            $input.addClass("range").html("<div class='src'></div><div class='minus unselectable' unselectable='on'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div class='dst'></div>");
            var onchange = function(event) {
                    return $(event.target).find("input").removeClass("validate"), this.fieldchange(), event.stopPropagation(), !0
                },
                onerror = function(event) {
                    $(event.target).find("input").addClass("validate")
                },
                onfocus = function(event) {
                    $(event.target).find("input").removeClass("validate")
                },
                type = options.type || "ipv4",
                flags = {
                    header: options.header,
                    type: type,
                    index: options.index,
                    blank: options.blank,
                    optionArray: options.optionArray,
                    flags: {
                        maxLength: options.maxLength,
                        mandatory: options.mandatory,
                        re: options.re
                    }
                };
            this.pluginSrc = $input.find(".src").lightUIComboGrid(flags), this.pluginSrc.find(".icon").css("display", "none"), this.pluginSrc.bind("enter.input tab.input rowclick.grid", context(this).callback(onchange)), this.pluginSrc.bind("error.input", onerror), this.pluginSrc.bind("onfocus.input", onfocus), this.pluginDst = "ipv6" == type ? $input.find(".dst").lightUIIPv6({
                mandatory: options.mandatory,
                maxLength: 43
            }) : $input.find(".dst").lightUIIPv4({
                mandatory: options.mandatory,
                maxLength: 18
            }), this.pluginDst.bind("enter.input tab.input", context(this).callback(onchange)), this.pluginDst.bind("error.input", onerror), this.pluginDst.bind("onfocus.input", onfocus), this.val(range), is.set(range) && range.split("-")[1] ? this.enableRange() : this.disableRange(), options.rangeLocked ? this.lockRange() : this.unlockRange(), this.pluginEdit.find(".minus").click(context(this).callback(function() {
                this.options.rangeLocked || (this.pluginDst.find("input").attr("disabled") ? this.enableRange() : this.disableRange())
            }))
        }
        return this
    }, this.val = function(value) {
        if (is.set(value)) {
            this.applyAttrs(value);
            var arr = value.split("-");
            return this.range = value, this.pluginSrc && this.pluginDst && (this.pluginSrc.fieldval(arr[0]), this.pluginDst.fieldval(arr[1])), this
        }
        if (this.pluginSrc && this.pluginDst) {
            if (this.options.rangeLocked) return this.pluginSrc.fieldval();
            var src = this.pluginSrc.fieldval(),
                dst = this.pluginDst.fieldval();
            return !this.pluginDst.find("input").attr("disabled") && is.set(dst) && "" != dst ? src + "-" + dst : src
        }
        return this.range
    }, this.addRow = function() {
        var options = this.options;
        return options.optionArray.push(arguments), this.pluginSrc && this.pluginSrc.addOption.apply(this.pluginSrc, arguments), this
    }, this.cleanRows = function() {
        return this.options.optionArray = [], this.pluginSrc.cleanOptions(), this
    }, this.updateModel = function(status) {
        return this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden") ? void 0 : this.options.mandatory && this.pluginSrc.isEmpty() ? (this.pluginSrc.find("input").addClass("validate"), alert(lng("srcEmpty")), status.error = !0, void status.nodes.push(this)) : (this.pluginSrc.validate() ? (this.pluginSrc.find("input").addClass("validate"), status.error = !0, status.nodes.push(this)) : this.pluginDst.validate() && (this.pluginDst.find("input").addClass("validate"), status.error = !0, status.nodes.push(this)), this)
    }, this.fieldchange = function() {
        return this.emit("fieldchange", this.val()), this
    }, this.setVersion = function(version) {
        return options.type = 6 == version ? "ipv6" : "ipv4", range = this.val(), this.updateView("forward"), this
    }, this.disableRange = function() {
        return this.$box.isRendered() && (this.$box.find(".minus").addClass("break"), this.pluginDst.disable()), this
    }, this.enableRange = function() {
        return this.$box.isRendered() && (this.$box.find(".minus").removeClass("break"), this.pluginDst.enable()), this
    }, this.lockRange = function() {
        this.options.rangeLocked = !0, this.$box.isRendered() && (this.$box.find(".minus").removeClass("break").addClass("lock"), this.pluginDst.disable())
    }, this.unlockRange = function() {
        if (this.options.rangeLocked = !1, this.$box.isRendered()) {
            var $minus = this.$box.find(".minus");
            $minus.hasClass("lock") && $minus.removeClass("lock").addClass("break")
        }
    }, this.changeRangeStatus = function(enable) {
        return enable ? this.enableRange() : this.disableRange(), this
    }, this.validate = function() {
        return this.pluginSrc.validate() && this.pluginSrc.find("input").addClass("validate"), this.pluginDst.validate() && this.pluginDst.find("input").addClass("validate"), this
    }, this.isRange = function() {
        return !this.$box.find(".minus").hasClass("break")
    }
}

function checkIpLanAddr(ipField, iftree) {
    for (var netip, lan = iftree.iface_names.br0.services.br0, ipsrc = ipField.child("ipsrc").val(), ipdst = ipField.child("ipdst").val(), ip_arr = lan.ip.split("."), mask_arr = lan.mask.split("."), net_arr = [], i = 0; i < ip_arr.length; i++) net_arr[i] = ip_arr[i] & mask_arr[i];
    if (netip = net_arr.join("."), "" != ipsrc && "" != ipdst) {
        var flag_src = !1,
            flag_dst = !1;
        if (ipField.child("ipsrc").isRange()) {
            var ipsrc_arr = [];
            ipsrc_arr = ipsrc.split("-"), validCustomIP(ipsrc_arr[0], lan.mask, netip) && (flag_src = !0), validCustomIP(ipsrc_arr[1], lan.mask, netip) && (flag_src = !0)
        }
        else {
            var arr_src = ipsrc.split("/");
            "0.0.0.0" != arr_src[0] && (arr_src[1] ? (validCustomIP(netip, calcMaskByBits(arr_src[1]), arr_src[0]) && (flag_src = !0), validCustomIP(arr_src[0], lan.mask, netip) && (flag_src = !0)) : ipsrc != lan.ip && validCustomIP(ipsrc, lan.mask, netip) && (flag_src = !0))
        }
        if (ipField.child("ipdst").isRange()) {
            var ipdst_arr = [];
            ipdst_arr = ipdst.split("-"), validCustomIP(ipdst_arr[0], lan.mask, netip) && (flag_dst = !0), validCustomIP(ipdst_arr[1], lan.mask, netip) && (flag_dst = !0)
        }
        else {
            var arr_dst = ipdst.split("/");
            "0.0.0.0" != arr_dst[0] && (arr_dst[1] ? (validCustomIP(netip, calcMaskByBits(arr_dst[1]), arr_dst[0]) && (flag_dst = !0), validCustomIP(arr_dst[0], lan.mask, netip) && (flag_dst = !0)) : ipdst != lan.ip && validCustomIP(ipdst, lan.mask, netip) && (flag_dst = !0))
        }
        return ipsrc == lan.ip && ipdst == lan.ip && (flag_src = !0, flag_dst = !0), !(flag_src && flag_dst)
    }
    return !0
}

function pageIPTV(wizard) {
    pageIPTV.superclass.constructor.call(this), this.add(new nodetext("VLAN ID", 1, {
        mandatory: !0
    }), "vid"), this.add(new PortViewCtrl(!1), "ctrl"), this.bind("updaterq", function() {
        wizard || rootView.showModalOverlay(), devu.iptv.pull(callback(this, function() {
            wizard || rootView.hideModalOverlay(), this.deep.updateView()
        }), callback(this, function() {
            wizard || rootView.hideModalOverlay(), node.prototype.updateView.call(this, "forward"), this.$box.errorBlock(lng("error"), lng("rpcReadError"), null, lng("refresh"), callback(this, function() {
                this.emit("updaterq")
            }))
        }))
    }), this.updateView = function(__phase) {
        if (pageIPTV.superclass.updateView.apply(this, arguments), "forward" == __phase) {
            this.get("vid").hide(), this.get("ctrl").setPorts(devu.iptv.getPortMap());
            var htmlToDraw = '<div id="uiSTBPortComment">' + lng("iptv_master_comment") + "</div>";
            this.$box.append(htmlToDraw), this.cleanButtonBar(), wizard || this.addButton("save").getButton("save").bind("click.button", callback(this, function() {
                function onApply() {
                    clearTimeout(tt), rootView.hideWaitScreen(), alert(lng("wzIPTVSaveOk")), document.location.hash = "", location.reload(!0)
                }
                if (this.deep.updateModel(), !this.status.error) {
                    rootView.showWaitScreen(lng("pleaseWait"), 3e4);
                    var tt = (setTimeout(context(this).callback(function() {
                        device.stop()
                    }), 5e3), setTimeout(callback(this, onApply), 2e4));
                    devu.iptv.push(callback(this, onApply), callback(this, function(status) {
                        status || alert(lng("rpcWriteError")), this.emit("updaterq")
                    }))
                }
            }))
        }
    }, this.updateModel = function(__status) {
        this.status = __status, devu.iptv.setPortMap(this.get("ctrl").getPorts())
    }
}

function PortViewCtrl(vid_show) {
    function getPortStatus(__$box) {
        return __$box.is(".on")
    }
    PortViewCtrl.superclass.constructor.call(this);
    var pmap = [];
    this.setPorts = function(__pmap) {
        pmap = __pmap
    }, this.getPorts = function() {
        return pmap
    }, this.updateView = function(__phase) {
        function setPortStatus(__$box, __checked) {
            __checked === !0 ? (__$box.find("input").attr("checked", "checked"), __$box.removeClass("off").removeClass("dis").addClass("on")) : __checked === !1 ? (__$box.find("input").removeAttr("checked"), __$box.removeClass("on").removeClass("dis").addClass("off")) : null === __checked && __$box.removeClass("on").removeClass("off").addClass("dis")
        }
        if (PortViewCtrl.superclass.updateView.apply(this, arguments), "forward" == __phase) {
            var htmlToDraw = '<div id="uiSTBPort" style="text-align:center; margin-bottom: 35px; margin-top: 35px;"></div><div id="uiSTBPortSign"></div>';
            this.$box.append(htmlToDraw);
            var port, i = 0;
            for (var port in pmap) {
                if (i++, htmlToDraw = '<span class="customCheckbox ' + (port.toLowerCase().indexOf("wifi") + 1 ? " wifi " : "") + ' off" style="position:relative" id=ui_iptv_' + port + ' data-port="' + port + '"><input type="checkbox" value=' + port + "></input>", port.match(/wifi/)) htmlToDraw += '<div style="position: absolute; bottom: -16px; width: 100%;">' + port + "</div>";
                else {
                    var portNumber = port.match(/\d+$/);
                    htmlToDraw += '<div style="position: absolute; bottom: -16px; width: 100%;">LAN' + (portNumber.length ? portNumber[0] : i) + "</div>"
                }
                htmlToDraw += "</span>", $("#uiSTBPort").append(htmlToDraw), _.include(devu.iptv.getFreePorts(vid_show), port) || (pmap[port] = null), setPortStatus($("#ui_iptv_" + port), pmap[port])
            }
            $("#uiSTBPort>.customCheckbox").click(function() {
                if (!$(this).is(".dis")) {
                    change = !0;
                    var ps = !getPortStatus($(this));
                    setPortStatus($(this), ps), pmap[$(this).data("port")] = ps
                }
            })
        }
    }
}

function jsLanModel(iftree) {
    jsLanModel.superclass.constructor.call(this), this.iftree = iftree
}

function jsLanController(blocks) {
    jsLanController.superclass.constructor.call(this), this.changeModel(new jsLanModel), this.ifaceTypes.client = {
        type: jsLanClientView
    }, this.ifaceTypes.client.options = {
        nothing: !0
    }, this.ifaceTypes.server = {
        type: jsLanServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.nextIface = "server", this.addIface(), this.ondataready = function() {
        var iftree = this.model.iftree,
            c = 0;
        for (var i in iftree) !iftree[i].is_wan && iftree[i].services && (_.size(iftree[i].services) && (this.ifname = i, this.srvname = getObjectFirstKey(iftree[i].services), iftree[i].ifname = this.ifname, getObjectFirstChild(iftree[i].services).ifname = this.srvname), c++);
        return this.multyLAN = c > 1, this.multyLAN || this.event("lanselect"), !1
    }, this.onlanselect = function() {
        if (is.string(this.ifname) && is.string(this.srvname)) {
            var mainTab = this.changeChild(this.getChild("mainTab").thisInx, new jsLanSettingsController(this.model.iftree, this.ifname, this.srvname, this.model.lanClients, this.model.dhcpClients, this.model.vlans), "mainTab");
            mainTab.blocks = this.blocks
        }
        return !1
    }, this.addChild(new jsController, "mainTab"), this.blocks = blocks, this.addEventHandler("dataready", this.ondataready), this.addEventHandler("lanselect", this.onlanselect)
}

function jsLanClientView(ctrl, viewInx, options) {
    jsLanClientView.superclass.constructor.call(this, ctrl, viewInx, options), options.inputPadding || (options.inputPadding = "200px"), this.ondataready = function() {
        var iftree = this.ctrl.model.iftree;
        if (this.ctrl.multyLAN) {
            this.options.buttons = [{
                name: "add",
                value: "add",
                handler: this.add
            }], this.drawView();
            var header = [{
                index: "name",
                name: "wanName"
            }, {
                index: "ip",
                name: "IP"
            }, {
                index: "mask",
                name: "wanMask"
            }];
            $grid = $(this.options.childBoxSel).lightUIGrid(header, 0, {
                clickable: !0
            });
            var $row, service = null,
                srvname = null,
                freeInterface = 0;
            for (var i in iftree) !iftree[i].is_wan && iftree[i].services && (_.size(iftree[i].services) ? (srvname = getObjectFirstKey(iftree[i].services), service = getObjectFirstChild(iftree[i].services), is.object(service) && ($row = $grid.addRow().row("last"), $row.col("name").html(service.name), $row.col("ip").html(service.ip), $row.col("mask").html(service.mask), $row.data("ifname", i).data("srvname", srvname))) : freeInterface++);
            freeInterface || this.disableButton(this.options.buttons[0].name), is.string(srvname) && $grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                this.ctrl.ifname = $row.data("ifname"), this.ctrl.srvname = $row.data("srvname"), this.ctrl.event("lanselect")
            }))
        }
        return !1
    }, this.add = function() {
        this.ctrl.ifname = "new", this.ctrl.srvname = "create", this.ctrl.event("lanselect")
    }, this.isAccessFromWAN = function(ifaces) {
        var iface = null;
        if (!ifaces || !ifaces.iface_names) return !1;
        for (var if_name in ifaces.iface_names)
            if (ifaces.iface_names[if_name].is_wan && !$.isEmptyObject(ifaces.iface_names[if_name].services)) {
                iface = ifaces.iface_names[if_name];
                for (var srv_name in iface.services)
                    if (iface.services[srv_name].ip == document.location.hostname || "dlink-router" == document.location.host) return !0
            }
        return !1
    }, this.changeServerUrl = function(url) {
        this.serverUrl = this.accessFromWAN ? document.location.host : url, document.location.host = this.serverUrl
    }, this.onredirectrq = function() {
        var root = this.getParent(-1);
        root.changeServerUrl(getCookie("lan_ip")), root.showModalOverlay()
    }, this.save = function() {
        var res = this.updateModel();
        if (res) {
            this.showModalOverlay();
            var iftree = this.ctrl.model.iftree;
            for (var key in iftree) clearJSON(this.ctrl.model.iftree[key]);
            this.cleanButtons(), this.ctrl.event("saverq")
        }
    }, this.remove = function() {
        this.showModalOverlay(), this.cleanButtons(), this.ctrl.event("removerq")
    }, this.onlanselect = function() {
        if (this.ctrl.ifname && this.ctrl.srvname && (this.constructor(this.ctrl, this.viewInx, this.options ? this.options : {}), this.options.buttons = [], this.options.buttons.push({
                name: "save",
                value: "button_save",
                handler: this.save
            }), this.drawView(), disableFlag("ifaces.lan")))
            for (var buttons = this.options.buttons, i = 0; i < buttons.length; i++)
                if ("save" == buttons[i].name) {
                    this.disableButton(buttons[i].name);
                    break
                }
        return !1
    }, this.bind("dataready", this.ondataready), this.bind("redirectrq", this.onredirectrq), this.bind("lanselect", this.onlanselect)
}

function jsLanServerView(ctrl, viewInx, options) {
    jsLanServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        if (this.ctrl.model.iftree = {}, data && !data.baddata && data.rq) {
            var numRPC = 0;
            data.rq[numRPC] && data.rq[numRPC].resident && data.rq[numRPC].resident.iface_names && (this.ctrl.model.iftree = data.rq[numRPC].resident.iface_names, this.ctrl.model.iftree || (this.ctrl.model.iftree = {})), numRPC++, data.rq[numRPC] && data.rq[numRPC].resident && (this.ctrl.model.lanClients = data.rq[numRPC].resident), numRPC++, data.rq[numRPC] && data.rq[numRPC].resident && (this.ctrl.model.dhcpClients = data.rq[numRPC].resident), numRPC++
        }
        this.ctrl.event("update" == this.mode ? "dataready" : "updaterq")
    }, this.prepareData = function() {
        var obj, ctrl = this.ctrl;
        switch (this.mode) {
            case "remove":
                obj = {
                    v2: "y",
                    rq: 0
                }, obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 2, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_buf" + obj.rq] = $.toJSON([ctrl.srvname]), obj["res_pos" + obj.rq] = 0, obj.rq++, this.addToRequest(obj);
                break;
            case "save":
                obj = {
                    v2: "y",
                    rq: 0
                };
                var ifnode = ctrl.model.iftree[ctrl.ifname],
                    service = ifnode.services[ctrl.srvname],
                    ifname = service.ifname ? service.ifname : service.iface;
                "new" == ctrl.ifname ? (ctrl.ifname = ifname, ifnode.ifname = ifname) : ifname && ctrl.ifname != ifname && (obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 2, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_buf" + obj.rq] = $.toJSON([ctrl.srvname]), obj["res_pos" + obj.rq] = 0, obj.rq++, ctrl.srvname = "create", delete service.ifname, ctrl.ifname = ifname, ifnode = ctrl.model.iftree[ctrl.ifname], ifnode.ifname = ctrl.ifname, ifnode.services = {}, ifnode.services[ctrl.srvname] = service);
                var jsonOutObj = {};
                jsonOutObj[ctrl.ifname] = ifnode;
                var ip = jsonOutObj[ctrl.ifname].services[ctrl.srvname].ip;
                setCookie("lan_ip", ip), obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 3, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_buf" + obj.rq] = $.toJSON(jsonOutObj), obj["res_buf" + obj.rq] = obj["res_buf" + obj.rq].replace(/%/g, "%25"), obj["res_buf" + obj.rq] = obj["res_buf" + obj.rq].replace(/#/g, "%23"), obj["res_pos" + obj.rq] = 0, obj.rq++, this.addToRequest(obj);
                break;
            case "update":
                obj = {
                    v2: "y",
                    rq: 1,
                    res_json0: "y",
                    res_config_action0: 1,
                    res_config_id0: 1,
                    res_struct_size0: 36
                }, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 187, obj["res_struct_size" + obj.rq] = 0, obj.rq++, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 34, obj["res_struct_size" + obj.rq] = 0, obj.rq++, this.addToRequest(obj)
        }
    }, this.onupdaterq = function() {
        window.hasChanges = null, rootView.showModalOverlay(), this.mode = "update", this.updateView()
    }, this.onsaverq = function() {
        this.mode = "save", this.updateView()
    }, this.onremoverq = function() {
        this.mode = "remove", this.updateView()
    }, this.mode = "update", this.bind("updaterq", this.onupdaterq), this.bind("saverq", this.onsaverq), this.bind("removerq", this.onremoverq)
}

function jsLanSettingsController(iftree, ifname, srvname, LANClients, DHCPClients) {
    jsLanSettingsController.superclass.constructor.call(this), this.ifname = ifname, this.srvname = srvname, this.iftree = iftree, this.ifnode = "create" == this.srvname ? iftree[this.ifname] = {
        enable: !0,
        type: "bridge",
        services: {
            create: {
                dhcpd: {}
            }
        }
    } : iftree[this.ifname] || {}, this.service = this.ifnode.services[this.srvname] || {}, this.dhcpd = this.service.dhcpd || {}, setCookie("lan_ip", this.service.ip), setCookie("lan_mask", this.service.mask), this.ifaceTypes.client = {
        type: jsLanSettingsView,
        options: {}
    }, this.addChild(new jsInputController(this.service.name), "name"), this.addChild(new jsStatIPSettingsController(this.service), "statip"), this.addChild(new jsDhcpServerController(this.service, this.iftree), "dhcpd"), this.addChild(new jsDhcpServerMacController(this.dhcpd, LANClients, DHCPClients), "macs")
}

function jsLanSettingsView(ctrl, viewInx, options) {
    this.updateModel = function() {
        getCookie("lan_ip_older") || setCookie("lan_ip_older", this.ctrl.service.ip), setCookie("lan_mask_older", this.ctrl.service.mask);
        var IP = this.getChild("statip"),
            DHCP = this.getChild("dhcpd"),
            divMain = DHCP.getChild("divMain"),
            begin = divMain.getChild("begin"),
            end = divMain.getChild("end"),
            oldIp = this.ctrl.service ? this.ctrl.service.ip : null,
            oldMask = this.ctrl.service ? this.ctrl.service.mask : null,
            oldStartIp = this.ctrl.service.dhcpd ? this.ctrl.service.dhcpd.start_ip : null,
            oldEndIp = this.ctrl.service.dhcpd ? this.ctrl.service.dhcpd.end_ip : null;
        "dhcpBeginOutOfRange" == begin.statusCode && (begin.statusCode = null), "dhcpEndOutOfRange" == end.statusCode && (end.statusCode = null);
        var res = jsLanSettingsView.superclass.updateModel.call(this);
        if (res) {
            var strIp = IP.getChild("ip").ctrl.model.toString(),
                strMask = IP.getChild("mask").ctrl.model.toString();
            if (new IPv4(strIp, strMask).reserved()) return alert(lng("lanIpReserved")), !1;
            DHCP.getChild("mode").updateModel();
            var dhcpdmode = DHCP.getChild("mode").ctrl.model.value;
            if ("en" == dhcpdmode) {
                IP.ctrl.isIpOrMaskChanged &= oldIp != strIp || oldMask != strMask, IP.ctrl.isIpOrMaskChanged && begin.ctrl.model.toString() == oldStartIp && end.ctrl.model.toString() == oldEndIp && DHCP.correctDHCP(IP.getChild("ip").ctrl.model, IP.getChild("mask").ctrl.model) && (confirm(lng("dhcpCorrectReq") + " " + lng("dhcpNewPool") + " " + begin.ctrl.model.toString() + " ... " + end.ctrl.model.toString()) ? (begin.updateView(), end.updateView(), DHCP.updateModel()) : res &= !1, IP.ctrl.isIpOrMaskChanged = !1);
                var bitmask = calcBitsByMask(IP.getChild("mask").ctrl.model.toString()),
                    tmpBeginModel = begin.ctrl.model,
                    tmpEndModel = end.ctrl.model,
                    tmpIPModel = IP.getChild("ip").ctrl.model;
                tmpBeginModel.bitmask = bitmask, tmpEndModel.bitmask = bitmask, tmpIPModel.bitmask = bitmask, tmpBeginModel.applyMask(), tmpEndModel.applyMask(), tmpIPModel.applyMask(), modeAP() || (tmpBeginModel.toString() != tmpIPModel.toString() && (begin.statusCode = "dhcpBeginOutOfRange", begin.setError(), res &= !1), tmpEndModel.toString() != tmpIPModel.toString() && (end.statusCode = "dhcpEndOutOfRange", end.setError(), res &= !1))
            }
            else DHCP.correctDHCP(IP.getChild("ip").ctrl.model, IP.getChild("mask").ctrl.model) && (begin.updateView(), end.updateView(), DHCP.updateModel(!0))
        }
        return res
    }, ctrl.service.is_wan = ctrl.ifnode.is_wan;
    var c = 0;
    for (var i in ctrl.iftree) ctrl.iftree[i].is_wan || c++;
    var multyLAN = c > 1;
    obj = ctrl.getChild("name"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanName",
        disabled: !0,
        hide: !multyLAN
    }, jsLanSettingsView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function jsLangModel(lng) {
    jsLangModel.superclass.constructor.call(this), this.lng = lng, this.langs = window.langs, this.rtlLangs = [], this.rtlLangs = "ara,fas,heb".split(",")
}

function jsLangController(lng, frame) {
    jsLangController.superclass.constructor.call(this), this.rtlViewSwitch = function() {
        var action = "";
        getCookie("cookie_lang"), action = -1 != $.inArray(this.model.lng, this.model.rtlLangs) ? "add" : "del", controlCSS("rtl_view_patch.css", "idrtl_view", action)
    };
    var cookieLng = getCookie("cookie_lang");
    "" != cookieLng ? this.changeModel(new jsLangModel(cookieLng)) : (this.changeModel(new jsLangModel(lng)), setCookie("cookie_lang", this.model.lng)), this.rtlViewSwitch(), this.ifaceTypes.menuTitle = {
        type: jsLangView,
        options: {
            style: "fastmenu"
        }
    }, this.ifaceTypes.switchLang = {
        type: jsSwitchLangView,
        options: {
            action: "will_change_run_time"
        }
    }, this.ifaceTypes.listLang = {
        type: jsListLangView,
        options: {
            action: "index.cgi?v2=y&res_config_id=" + CONFIG_ID_LANG_LIST + "&res_struct_size=1"
        }
    }, this.onmenuchange = function(menuCtrl) {
        return this.model.lng = menuCtrl.contentOptions.lng, this.event("changelang", this.model.lng), !1
    }, this.onchangelangs = function() {
        var obj;
        this.children = new Array;
        for (var i in this.model.langs) obj = this.addChild(new jsMenuController(i, {
            frame: this,
            contentOptions: {
                lng: i
            }
        }));
        return !1
    }, this.addEventHandler("menuchange", this.onmenuchange), this.addEventHandler("changelangs", this.onchangelangs), this.frame = frame
}

function jsLangView(ctrl, viewInx, options) {
    jsLangView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsLangView.superclass.drawView.call(this), $(this.myBoxSel).html(lng("lang"))
    }, this.onchangelangs = function() {
        this.drawView()
    }, this.bind("changelangs", this.onchangelangs)
}

function jsSwitchLangView(ctrl, viewInx, options) {
    jsSwitchLangView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        data && "update" == this.mode && (lang = data, this.ctrl.frame.event("changelang", this.ctrl.model.lng), this.onsaverq())
    }, this.prepareData = function() {
        switch (this.mode) {
            case "save":
                var obj = {
                    v2: "y",
                    rq: "y",
                    res_json: "y",
                    res_data_type: "json",
                    res_config_action: 3,
                    res_config_id: 67,
                    res_struct_size: 0
                };
                jsonOutObj = {
                    lang: this.ctrl.model.lng
                }, obj.res_buf = $.toJSON(jsonOutObj), this.addToRequest(obj)
        }
    }, this.onchangelang = function(lng) {
        return this.action = lng && "string" == typeof lng ? "scripts/" + lng + ".lng.js" : "scripts/" + this.ctrl.model.lng + ".lng.js", this.ctrl.rtlViewSwitch(), this.mode = "update", this.updateView(), !1
    }, this.onsaverq = function() {
        this.action = "../../index.cgi", this.mode = "save", this.updateView()
    }, this.mode = "update", this.bind("changelang", this.onchangelang), this.bind("savelang", this.onsaverq)
}

function jsListLangView(ctrl, viewInx, options) {
    jsListLangView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        if (data) {
            for (langs = new Array, i = 0; i < data.length; i++) langs[i] = data[i].val0;
            this.model.langs = langs, this.ctrl.event("changelangs", langs)
        }
    }
}

function jsIfacesInputController(value) {
    jsIfacesInputController.superclass.constructor.call(this), this.ifaceTypes.select = {
        type: jsIfacesInputSlotView,
        options: {}
    }, this.ifaceTypes.radio = {
        type: jsIfacesInputSlotView,
        options: {}
    }, this.ifaceTypes.server = {
        type: jsIfacesInputServerView,
        options: {
            plainIface: !0
        }
    }, this.addChild(new jsInputFieldController(value), "field"), this.changeModel(this.getChild("field").model), this.IfacesReady = function(obj) {
        var valset = CreateIfacesValset(obj.ifaces, obj.onlyWans, obj.drawAutoIface, obj.serviceTypes);
        return $.extend(this.ifaceTypes.select.options.valset, valset), $.extend(this.ifaceTypes.radio.options.valset, valset), this.event("updateValset", valset), this.parent.event("IfacesReady", obj.ifaces), !1
    }, this.addEventHandler("IfacesReady", this.IfacesReady)
}

function jsIfacesInputSlotView(ctrl, viewInx, options) {
    ctrl.getChild("field").nextIface = ctrl.lastIface, jsIfacesInputSlotView.superclass.constructor.call(this, ctrl, viewInx, options), this.updateValset = function(obj) {
        return this.setOption("valset", obj), this.drawView(), !1
    }, this.bind("updateValset", this.updateValset)
}

function jsIfacesInputServerView(ctrl, viewInx, options) {
    jsIfacesInputServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        data && !data.baddata && data.resident && data.resident.iface_names ? this.ctrl.event("IfacesReady", {
            ifaces: data.resident.iface_names,
            onlyWans: this.options.onlyWans,
            drawAutoIface: this.options.drawAutoIface,
            serviceTypes: this.options.serviceTypes
        }) : this.ctrl.event("IfacesReady", {
            ifaces: null,
            onlyWans: this.options.onlyWans,
            drawAutoIface: this.options.drawAutoIface,
            serviceTypes: this.options.serviceTypes
        })
    }, this.prepareData = function() {
        var obj;
        obj = {
            v2: "y",
            rq: "y",
            res_json: "y",
            res_config_action: 1,
            res_struct_size: 0
        }, obj.res_config_id = 120, this.addToRequest(obj)
    }, this.updaterq = function() {
        return this.updateView(), !1
    }, this.bind("updaterq", this.updaterq)
}

function jsIfacesListModel() {
    jsIfacesListModel.superclass.constructor.call(this), this.InterfacesListAsIs = null, this.InterfacesValset = null
}

function jsIfacesListServerView(ctrl, viewInx, options) {
    jsIfacesListServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        this.ctrl.model.InterfacesListAsIs = data && !data.baddata && data.resident && data.resident.iface_names ? data.resident.iface_names : null, this.ctrl.model.InterfacesValset = CreateIfacesValset(this.ctrl.model.InterfacesListAsIs, this.options.onlyWans, this.options.drawAutoIface, this.options.serviceTypes), this.ctrl.event("IfacesListReady")
    }, this.prepareData = function() {
        var obj;
        obj = {
            v2: "y",
            rq: "y",
            res_json: "y",
            res_config_action: 1,
            res_struct_size: 0
        }, obj.res_config_id = 120, this.addToRequest(obj)
    }, this.updaterq = function() {
        return this.updateView(), !1
    }, this.bind("updaterq", this.updaterq)
}

function CreateIfacesValset(IfacesList, onlyWans, drawAutoIface, serviceTypes, getType) {
    var valset = {};
    drawAutoIface && (valset["&lt;" + lng("type_start_auto") + "&gt;"] = "auto");
    for (var i in IfacesList)(!onlyWans || IfacesList[i].is_wan) && (valset[IfacesList[i].name] = getType ? {
        iface: IfacesList[i].iface,
        type: IfacesList[i].type,
        contag: IfacesList[i].contag,
        gwif: IfacesList[i].gwif,
        gwifv6: IfacesList[i].gwifv6
    } : IfacesList[i].iface);
    return valset
}

function jsListBoxModel(list) {
    jsListBoxModel.superclass.constructor.call(this), this.list = list
}

function jsListBoxController(list) {
    jsListBoxController.superclass.constructor.call(this), this.ifaceTypes.changebox = {
        type: jsInputSlotView
    }, this.addChild(new jsListBoxFieldController(list), "field"), this.changeModel(this.getChild("field").model)
}

function jsListBoxFieldController(list) {
    jsListBoxFieldController.superclass.constructor.call(this), this.ifaceTypes.changebox = {
        type: jsChangeBoxClientView
    }, this.changeModel(new jsListBoxModel(list))
}

function jsChangeBoxClientView(ctrl, viewInx, options) {
    jsChangeBoxClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsChangeBoxClientView.superclass.drawView.call(this);
        var options = this.options;
        if (options.valset)
            for (var i in options.valset) this.ivalset[options.valset[i]] = i;
        this.srcBoxSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(0)>select", this.dstBoxSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(2)>select", this.rightArrowSel = options.viewBoxSel + ">table>tbody>tr:eq(0)>td:eq(1)>a", this.leftArrowSel = options.viewBoxSel + ">table>tbody>tr:eq(1)>td:eq(0)>a";
        var htmlToDraw = "";
        htmlToDraw += "<table border='0'><tr><td rowspan='2'>", htmlToDraw = this.drawBox(htmlToDraw), htmlToDraw += "</td><td class='changeBoxRight' unselectable='on'><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></td><td rowspan='2'>", htmlToDraw = this.drawBox(htmlToDraw), htmlToDraw += "</td></tr><tr><td class='changeBoxLeft' unselectable='on'><a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></td></tr></table>", $(options.viewBoxSel).html(htmlToDraw), this.updateView(), options.disabled && this.disable(), $(this.srcBoxSel).addClass("changeBoxSrc").get(0).selectedIndex = 0, $(this.dstBoxSel).addClass("changeBoxDst").get(0).selectedIndex = 0, $(this.rightArrowSel).bind("click", context(this).callback(this.onrightclickjq)), $(this.leftArrowSel).bind("click", context(this).callback(this.onleftclickjq))
    }, this.drawBox = function(htmlToDraw) {
        return htmlToDraw += '<select size="' + options.size + '"></select>'
    }, this.updateModel = function() {
        this.ctrl.model.list = this.prepareModel()
    }, this.updateView = function() {
        var htmlToDraw = "",
            valsetTotal = this.options.valset,
            valset = {};
        for (var i in valsetTotal) valset[i] = valsetTotal[i];
        var list = this.ctrl.model.list;
        for (var i in list) delete valset[this.ivalset[list[i]]], htmlToDraw += "<option value='" + list[i] + "'>" + this.ivalset[list[i]] + "</option>";
        $(this.dstBoxSel).html(htmlToDraw), htmlToDraw = "";
        for (var i in valset) htmlToDraw += "<option value='" + valset[i] + "'>" + i + "</option>";
        $(this.srcBoxSel).html(htmlToDraw)
    }, this.onrightclickjq = function(event) {
        var selectedIndex = $(this.srcBoxSel).get(0).selectedIndex;
        if (selectedIndex >= 0) {
            var selectedSel = this.srcBoxSel + ">option:eq(" + selectedIndex + ")";
            $(this.dstBoxSel).append("<option value=" + $(selectedSel).get(0).value + ">" + $(selectedSel).html() + "</option>"), this.ctrl.event("additem", {
                view: this,
                value: $(selectedSel).get(0).value
            }), $(selectedSel).remove();
            var srcBoxLength = $(this.srcBoxSel + ">option").length;
            srcBoxLength > selectedIndex ? $(this.srcBoxSel).get(0).selectedIndex = selectedIndex : srcBoxLength > 0 && ($(this.srcBoxSel).get(0).selectedIndex = srcBoxLength - 1), $(this.dstBoxSel).get(0).selectedIndex = $(this.dstBoxSel + ">option").length - 1
        }
        event.stopPropagation()
    }, this.prepareModel = function() {
        for (var list = [], i = 0; i < $(this.dstBoxSel + ">option").length; i++) list.push($(this.dstBoxSel + ">option").get(i).value);
        return list
    }, this.onleftclickjq = function(event) {
        var selectedIndex = $(this.dstBoxSel).get(0).selectedIndex;
        if (selectedIndex >= 0) {
            var selectedSel = this.dstBoxSel + ">option:eq(" + selectedIndex + ")";
            $(this.srcBoxSel).append("<option value=" + $(selectedSel).get(0).value + ">" + $(selectedSel).html() + "</option>"), this.ctrl.event("removeitem", {
                view: this,
                value: $(selectedSel).get(0).value
            }), $(selectedSel).remove();
            var dstBoxLength = $(this.dstBoxSel + ">option").length;
            dstBoxLength > selectedIndex ? $(this.dstBoxSel).get(0).selectedIndex = selectedIndex : dstBoxLength > 0 && ($(this.dstBoxSel).get(0).selectedIndex = dstBoxLength - 1), $(this.srcBoxSel).get(0).selectedIndex = $(this.srcBoxSel + ">option").length - 1
        }
        event.stopPropagation()
    }, this.onremoveitem = function() {
        return !0
    }, this.onadditem = function() {
        return !0
    }, this.dstBoxSel = null, this.rightArrowSel = null, this.leftArrowSel = null, this.ivalset = {}, this.bind("additem", this.onadditem), this.bind("removeitem", this.onremoveitem)
}

function jsLocalResController(service, routes, ipver) {
    jsLocalResController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsLocalResView,
        options: {
            slider: !0,
            nocollapse: !0,
            title: "localres",
            descText: "localresDesc"
        }
    }, this.service = service, this.routes = routes, this.newRoutes = [];
    var alias, arr = [];
    this.n = 10;
    for (var i = 0; i < this.n; i++) alias = "ip" + i, arr.push({
        alias: alias,
        name: lng("ipaddr") + " " + (i + 1),
        type: "ip",
        version: ipver,
        options: {
            optional: !0
        }
    }), this.newRoutes.push({
        ip: "",
        netmask: service.mask,
        gw: "",
        iface: service.iface,
        pos: -1
    });
    for (var r, j = 0, i = 0; i < routes.length && (r = routes[i], r.iface == service.iface && r.netmask == service.mask && (arr[j].value = r.ip, this.newRoutes[j].ip = r.ip, this.newRoutes[j].pos = i, j++), j != this.n); i++);
    this.describe(arr)
}

function jsLocalResView(ctrl, viewInx, options) {
    jsLocalResView.superclass.constructor.call(this, ctrl, viewInx, options), this.updateModel = function() {
        var res = jsLocalResView.superclass.updateModel.call(this);
        if (res)
            for (var child, i = 0; i < this.ctrl.n; i++) child = this.getChild("ip" + i), this.ctrl.newRoutes[i].ip = child.ctrl.model.toString();
        return res
    }
}

function pageSyslog() {
    pageSyslog.superclass.constructor.call(this), this.loglist = null, this.add(new node, "log"), this.updateModel = function(status) {
        this.status = status
    }, this.exportlog = function() {
        device.system.log()
    }, this.updateView = function(phase) {
        if (pageSyslog.superclass.updateView.apply(this, arguments), "back" == phase) {
            this.cleanButtonBar().addButton("refresh").getButton("refresh").bind("click.button", callback(this, function() {
                this.update()
            })), null != this.loglist ? this.addButton("button_export").getButton("button_export").bind("click.button", callback(this, function() {
                this.exportlog()
            })) : this.loglist = "Log not found!";
            var log = this.child("log");
            log.$box.html($("				<div class='console syslog'>					<pre>" + this.loglist + "</pre>				</div>			"))
        }
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read(130, callback(this, function(data) {
            this.loglist = is.RPC_SUCCESS(data) ? data.resident.list : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update)
}

function gridMACFilters(rules, protoName, direction, ifaces) {
    gridMACFilters.superclass.constructor.call(this), this.rules = rules, this.ifaces = ifaces, this.updateView = function(phase) {
        if (gridMACFilters.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var header = [];
            header.push([{
                index: "id",
                name: "ruleID"
            }, {
                index: "mac",
                name: "hwaddr"
            }, {
                index: "enable",
                name: "action"
            }, {
                index: "state",
                name: "status"
            }]), this.$grid = this.$box.lightUIGrid(header, 0, {
                clickable: !0,
                selectable: !0
            });
            var j = 0;
            for (var i in this.rules) rule = this.rules[i], rule.mac && ($row = this.$grid.addRow().row("last"), $row.col("mac").html(rule.mac).data("mac", rule.mac), $row.col("id").html(rule.id).data("id", rule.id), $row.col("enable").html(lng("ACCEPT" == rule.enable ? "macfAccept" : "macfDrop")).data("enable", rule.enable), is.unset(rule.state) && (rule.state = 1), $row.col("state").html(lng(rule.state ? "on" : "off")).data("state", rule.state), $row.data("pos", j)), j++;
            this.$grid.bind("selection.grid", callback(this, function() {
                this.parent.updateRuleButtons()
            })), this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                var rule = {
                        id: $row.col("id").data("id"),
                        mac: $row.col("mac").data("mac"),
                        enable: $row.col("enable").data("enable"),
                        state: $row.col("state").data("state")
                    },
                    pos = $row.data("pos");
                this.parent.edit(rule, pos)
            }))
        }
    }, this.bind("updaterq", function() {
        this.deep.updateView()
    })
}

function pageMACFilter() {
    pageMACFilter.superclass.constructor.call(this), this.glRule = {}, this.add(new nodeCaption("macfDefaultMode")).add(new nodeSelect("", 0, {
        optionArray: [{
            name: "macfAccept",
            value: 0
        }, {
            name: "macfDrop",
            value: 1
        }]
    }), "g_drop"), this.add(new nodeComment("")), this.grid = new gridMACFilters(this.json), this.updateView = function(phase) {
        if (pageMACFilter.superclass.updateView.apply(this, arguments), "forward" == phase) {
            this.add(this.grid);
            var json = this.json;
            this.child("g_drop").unbind("fieldchange").bind("fieldchange", context(this).callback(function(obj, value) {
                rootView.showModalOverlay(), is.unset(this.glRule.rule) && (needUpdate = !0, this.glRule = {
                    pos: -1,
                    rule: {
                        id: 0,
                        state: !1,
                        mac: null,
                        enable: "DROP"
                    }
                }), this.glRule.rule.state = 1 == value, device.config.write(74, this.glRule.rule, this.glRule.pos, context(this).callback(function() {
                    this.deep.updateModel(), rootView.hideModalOverlay()
                }))
            })), this.updateRuleButtons = function() {
                this.grid.$grid.selection().not(":hidden").length ? this.getButton("button_del").enable() : this.getButton("button_del").disable()
            }, this.cleanButtonBar().addButton("add").getButton("add").bind("click.button", context(this).callback(function() {
                this.edit()
            })), this.addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function(json) {
                this.clearFilter(json, this.grid.$grid)
            }, json)), disableFlag(74) && (this.getButton("add").children("div").addClass("disable"), this.getButton("button_del").children("div").addClass("disable"))
        }
    }, this.clearFilter = function(ruleall, grid) {
        for (var rmlist = new Array, i = grid.nrow(); i >= 0; i--)
            if (grid.row(i).hasClass("selected")) {
                var pos = i < this.glRule.pos ? i : parseFloat(i) + 1;
                rmlist.push([74, ruleall[i], pos])
            }
        rmlist.length && (rootView.showModalOverlay(), device.config.remove(rmlist, callback(this, function() {
            this.emit("updaterq")
        })))
    }, this.edit = function(rule, pos) {
        this.$box.unbind();
        var ruleNode = new ruleMACFilters(this.lanClients, this.json, this.macfltProtoNames, this.macfltDirections, this.macfltIfaces, rule);
        ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), is.object(rule) && (ruleNode.addButton("button_del").getButton("button_del").bind("click.button", context(this).callback(function() {
            rootView.showModalOverlay(), device.config.remove(74, rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            }))
        })), disableFlag(74) && ruleNode.getButton("button_del").children("div").addClass("disable")), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            ruleNode.deep.updateModel(), ruleNode.status.error || (rootView.showModalOverlay(), is.unset(this.glRule.rule) && (needUpdate = !0, this.glRule = {
                pos: -1,
                rule: {
                    id: 0,
                    state: !1,
                    mac: null,
                    enable: "DROP"
                }
            }, device.config.write(74, this.glRule.rule, this.glRule.pos)), device.config.write(74, ruleNode.rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            })))
        })), disableFlag(74) && ruleNode.getButton("button_save").children("div").addClass("disable")
    }, this.onupdaterq = function() {
        rootView.showModalOverlay(), device.config.read([74, 187], context(this).callback(function(data) {
            if (rootView.hideModalOverlay(), is.RPC_SUCCESS(data.rq)) {
                this.json = data.rq[0].resident.macfilter;
                var i, needUpdate = !1,
                    biggestId = 0;
                for (i in this.json) this.json[i].id && this.json[i].id > biggestId && (biggestId = this.json[i].id);
                for (i in this.json)
                    if (null == this.json[i].mac) this.glRule = {
                        pos: parseFloat(i),
                        rule: this.json[i]
                    }, this.child("g_drop").val(this.glRule.rule.state ? 1 : 0);
                    else if (void 0 == this.json[i].id) {
                    needUpdate = !0, biggestId++;
                    var rule = {
                        id: biggestId,
                        mac: this.json[i].mac,
                        enable: this.json[i].enable,
                        state: !0
                    };
                    device.config.write(74, rule, parseInt(i))
                }
                needUpdate && this.emit("updaterq")
            }
            else this.json = [];
            this.grid.rules = this.json, this.lanClients = is.RPC_SUCCESS(data.rq) ? data.rq[1].resident : [], this.deep.updateView()
        }))
    }, this.bind("updaterq", this.onupdaterq)
}

function ruleMACFilters(lanClients, rules, macfltProtoNames, macfltDirections, macfltIfaces, rule) {
    ruleMACFilters.superclass.constructor.call(this), is.unset(rule) && (this.isadding = !0, rule = {}), this.updateView = function(phase) {
        if (ruleMACFilters.superclass.updateView.apply(this, arguments), "back" == phase) {
            var mac = this.child("mac");
            mac.cleanRows();
            for (var i in lanClients) {
                var recentlySelected = !1;
                for (var j in rules)
                    if (lanClients[i].mac == rules[j].mac) {
                        recentlySelected = !0;
                        break
                    }
                recentlySelected || mac.addRow(lanClients[i].ip, lanClients[i].mac, lanClients[i].hostname)
            }
            var enable = this.child("enable");
            enable.cleanOptions(), enable.addOption("macfAccept", "ACCEPT"), enable.addOption("macfDrop", "DROP")
        }
    }, this.updateModel = function(status) {
        try {
            if (!status.error) {
                var mac = this.child("mac").val(),
                    patt = /^[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}:[0-9a-fA-F]{2}$/;
                if (!patt.test(mac)) throw new Error("macfltInvalidAddress");
                var idnum = null;
                idnum = this.isadding ? rules.length ? _.last(rules).id + 1 : 1 : rule.id, this.rule = {
                    id: idnum,
                    mac: this.child("mac").val(),
                    enable: this.child("enable").val(),
                    state: this.child("state").val()
                };
                for (var i in rules)
                    if (this.rule.id != rules[i].id && this.rule.mac == rules[i].mac) throw new Error(lng("ipfltRuleExists") + rules[i].id + ".")
            }
        }
        catch (e) {
            status.error = !0, status.nodes.push(this), alert(lng(e.message))
        }
        this.status = status
    };
    var comboHeader = [{
        index: "ip",
        name: "IP"
    }, {
        index: "mac",
        name: "MAC"
    }, {
        index: "host",
        name: "Host"
    }];
    this.add(new nodeComboText("hwaddr", rule.mac, {
        header: comboHeader,
        index: "mac",
        mandatory: !0
    }), "mac").add(new nodeSelect("action", rule.enable), "enable").add(new nodeCheckBox("ipfltActivateNow", this.isadding || rule.state !== !1 ? !0 : !1), "state")
}

function jsQCMIPTVController() {
    jsQCMIPTVController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsQCMIPTVClientView,
        options: {}
    }, this.addChild(new jsIptvMasterController(!1, !0), "iptv"), this.addChild(new jsInputController, "status")
}

function jsQCMIPTVClientView(ctrl, viewInx, options) {
    var obj;
    options.nothing = !0, options.simple = !0, options.wizard = !1, obj = ctrl.getChild("status"), obj.nextIface = "text", obj.ifaceTypes.text.options = {
        humanName: "quickIPTVSave",
        hide: !0,
        inputPadding: "250px"
    }, obj.model.value = "<img src='image/wait.gif' style='vertical-align:top' />", jsQCMIPTVClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsQCMIPTVClientView.superclass.drawView.call(this), 0 == $(this.childBoxSel).find("div.description").length && $(this.childBoxSel).append("<div class='description' style='margin-top: 30px;'></div>"), $(this.childBoxSel).find("div.description").html("<h4>" + lng("quickDescIPtv") + "</h4>")
    }
}

function jsIptvMasterController() {
    jsIptvMasterController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsIptvMasterClientView
    }, this.addIface(), this.nextIface = "client"
}

function jsIptvMasterClientView(ctrl, viewInx, options) {
    this.drawView = function() {
        jsIptvMasterClientView.superclass.drawView.call(this);
        var wizard = !0,
            page = this.page = new pageIPTV(wizard);
        page.locate(this.viewBoxSel), page.$buttonBar = $("#pageToolbarButtons"), page.emit("updaterq")
    }, jsIptvMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function jsQCMFinishController() {
    jsQCMFinishController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsQCMFinishClientView,
        options: {}
    }, this.addChild(new jsInputController, "status")
}

function jsQCMFinishClientView(ctrl, viewInx, options) {
    var obj;
    options.nothing = !0, options.simple = !0, options.wizard = !1, obj = ctrl.getChild("status"), obj.nextIface = "text", obj.ifaceTypes.text.options = {
        humanName: "quickCompleting"
    }, obj.model.value = lng("quickSaveConfirm"), jsQCMFinishClientView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function jsQCMWifiController() {
    jsQCMWifiController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsQCMWifiClientView,
        options: {}
    }
}

function jsQCMWifiClientView(ctrl, viewInx, options) {
    jsQCMWifiClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsQCMWifiClientView.superclass.drawView.call(this);
        var wizard = window.wifiWizard = new pageWiFiWizard(!0);
        wizard.locate(this.options.viewBoxSel).$buttonBar = $("#pageToolbarButtons")
    }
}

function jsQuickConfigMasterController() {
    jsQuickConfigMasterController.superclass.constructor.call(this), this.changeModel(new jsModel), this.ifaceTypes.client = {
        type: jsQuickConfigMasterClientView,
        options: {}
    }, this.ifaceTypes.server = {
        type: jsQuickConfigMasterServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.nextIface = "server", this.addIface(), this.nextIface = "client", this.onupdaterq = function() {
        return this.getChild("inet").event("updaterq"), !1
    }, this.onmodeswitch = function(value) {
        return this.getChild("inet").event("modeswitch", value), !1
    }, this.addChild(new jsPreMasterController, "inet"), this.addChild(new jsQCMWifiController, "wifi"), this.addChild(new jsQCMIPTVController, "iptv"), this.addChild(new jsQCMFinishController, "finish"), this.addEventHandler("updaterq", this.onupdaterq), this.addEventHandler("modeswitch", this.onmodeswitch)
}

function jsQuickConfigMasterClientView(ctrl, viewInx, options) {
    options.nothing = !0, options.simple = !0, options.wizard = !0, ctrl.getChild("inet").ifaceTypes.client.options.buttonsInline = !1, jsQuickConfigMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsQuickConfigMasterClientView.prototype.ontabclick = null, this.drawView = function() {
        this.viewBoxSel || (this.viewBoxSel = this.options.viewBoxSel), jsQuickConfigMasterClientView.superclass.drawView.call(this), this.hideButton("prev"), this.hideButton("skip"), this.hideButton("next"), this.hideButton("save")
    }, this.enableButtons = function(on) {
        on ? (this.enableButton("prev"), this.enableButton("next"), this.enableButton("skip")) : (this.disableButton("prev"), this.disableButton("next"), this.disableButton("skip"))
    }, this.beforeLogic = function() {
        function onApply() {
            clearTimeout(tt), rootView.hideWaitScreen(), this.ctrl.event("iptvSaved"), this.ctrl.event("iptvready", null, !0)
        }
        if ("skip_iptv" == arguments[0]) this.ctrl.event("iptvSaved"), this.ctrl.event("iptvready", null, !0);
        else switch (this.showModalOverlay(), this.enableButtons(!1), this.getChild(this.activeTab).ctrl.alias) {
            case "iptv":
                this.getChild("iptv", "iptv").page.updateModel(), rootView.showWaitScreen(lng("pleaseWait"), 3e4);
                var tt = (setTimeout(context(this).callback(function() {
                    device.stop()
                }), 5e3), setTimeout(callback(this, onApply), 2e4));
                devu.iptv.push(callback(this, onApply))
        }
    }, this.afterLogic = function() {
        var lastInx = this.ctrl.children.length - 1;
        switch (this.enableButtons(!0), this.activeTab == lastInx ? (this.hideButton("next"), this.hideButton("skip"), this.hideButton("prev"), this.showButton("save")) : (this.showButton("next"), this.showButton("skip"), this.hideButton("save"), this.hideButton("prev")), 1 == this.activeTab ? this.hideButton("prev") : "iptv" != this.getChild(this.activeTab).ctrl.alias && this.showButton("prev"), this.getChild(this.activeTab).ctrl.alias) {
            case "iptv":
                this.getChild("iptv", "iptv").options.ishidden || (rootView.showModalOverlay(), devu.iptv.pull(callback(this, function() {
                    rootView.hideModalOverlay(), this.updateView()
                }), callback(this, function() {
                    rootView.hideModalOverlay(), node.prototype.updateView.call(this, "forward"), this.$box.errorBlock(lng("error"), lng("rpcReadError"), null, lng("refresh"), callback(this, function() {
                        this.emit("updaterq")
                    }))
                })), this.getChild("iptv", "iptv").page.updateModel(), this.getChild("iptv", "iptv").page.updateView()), this.getChild("iptv", "iptv").show(), this.getChild("iptv", "status").hide();
                break;
            case "finish":
                this.getChild("iptv", "status").show()
        }
    }, this.goNext = function() {
        this.switchChild(this.activeTab + 1), this.afterLogic()
    }, this.goPrev = function() {
        this.switchChild(this.activeTab - 1), this.afterLogic()
    }, this.goSkip = function() {
        switch (this.getChild(this.activeTab).ctrl.alias) {
            case "iptv":
                $("#uiSTBPort>.customCheckbox>input").removeAttr("checked"), this.beforeLogic("skip_iptv")
        }
    }, this.goSave = function() {
        this.showModalOverlay(), this.ctrl.event("saverq")
    }, this.options.buttons = [{
        name: "prev",
        value: "button_prev",
        handler: this.goPrev
    }, {
        name: "next",
        value: "button_next",
        handler: this.beforeLogic
    }, {
        name: "skip",
        value: "button_skip",
        handler: this.goSkip
    }, {
        name: "save",
        value: "button_save",
        handler: this.goSave
    }], this.onupdaterq = function() {
        return this.showModalOverlay(), !0
    }, this.onupdmodel = function() {
        return this.hideModalOverlay(), !0
    }, this.onwanready = function() {
        return window.wifiWizard.emit("updaterq"), window.wifiWizard.quickMasterCtrl = this.ctrl, this.switchChild(1), this.ctrl.event("updaterq2"), this.drawButtons(), this.switchChild(1), this.hideButton("prev"), this.hideButton("save"), !1
    }, this.onwifiready = function() {
        hideFlag(119) ? (this.drawButtons(), this.switchChild("finish"), this.hideButton("prev"), this.hideButton("next"), this.hideButton("skip")) : (this.ctrl.event("updaterq2"), this.drawButtons(), this.switchChild("iptv"), this.hideButton("prev"), this.hideButton("save"))
    }, this.oniptvready = function() {
        this.drawButtons(), this.switchChild("finish"), this.hideButton("next"), this.hideButton("skip")
    }, this.onyandexready = function() {}, this.activeTab = 0, this.bind("updaterq", this.onupdaterq), this.bind("updaterq2", this.onupdaterq), this.bind("updmodel", this.onupdmodel), this.bind("wanready", this.onwanready), this.bind("wifiready", this.onwifiready), this.bind("iptvready", this.oniptvready), this.bind("yandexready", this.onyandexready)
}

function jsQuickConfigMasterServerView(ctrl, viewInx, options) {
    jsQuickConfigMasterServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        data && !data.baddata && ("update" == this.mode && data.rq || "save" == this.mode && (alert(lng("quickComplite")), document.location.hash = "", location.reload(!0)))
    }, this.prepareData = function() {
        var obj;
        switch (this.ctrl, this.mode) {
            case "update":
                var index = 0,
                    i = 0;
                index += 3, index += 1, obj = {
                    v2: "y",
                    rq: index
                }, obj["res_json" + i] = "y", obj["res_config_action" + i] = 1, obj["res_config_id" + i] = 35, obj["res_struct_size" + i] = 0, i++, obj["res_json" + i] = "y", obj["res_config_action" + i] = 1, obj["res_config_id" + i] = 38, obj["res_struct_size" + i] = 0, i++, obj["res_json" + i] = "y", obj["res_config_action" + i] = 1, obj["res_config_id" + i] = 37, obj["res_struct_size" + i] = 0, i++, obj["res_json" + i] = "y", obj["res_config_action" + i] = 1, obj["res_config_id" + i] = 119, obj["res_struct_size" + i] = 0, this.addToRequest(obj);
                break;
            case "save":
                obj = {
                    v2: "y",
                    rq: "y",
                    res_cmd: 20,
                    res_buf: null,
                    res_cmd_type: "bl"
                }, this.addToRequest(obj)
        }
    }, this.onupdaterq = function() {
        this.mode = "update", this.updateView()
    }, this.onsaverq = function() {
        this.mode = "save", this.updateView()
    }, this.onwifirq = function() {
        this.mode = "wifi", this.updateView()
    }, this.mode = "update", this.bind("updaterq2", this.onupdaterq), this.bind("saverq", this.onsaverq), this.bind("wifirq", this.onwifirq)
}

function jsMainMenuController(nodeName, options) {
    jsMainMenuController.superclass.constructor.call(this, nodeName, options), this.ifaceTypes.tree = {
        type: jsMainMenuView,
        options: {
            hide: options && options.hide ? !0 : !1
        }
    }
}

function jsMainMenuView(ctrl, viewInx, options) {
    jsMainMenuView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsMainMenuView.superclass.drawView.call(this);
        var parent = this.getParent();
        parent instanceof jsMenuView && parent.root && this.ctrl.thisInx == parent.ctrl.children.length - 1 && $(this.viewBoxSel).addClass("last")
    }
}

function jsMiscSettingsModel(service) {
    jsMiscSettingsModel.superclass.constructor.call(this), this.service = service
}

function jsMiscSettingsController(service, isadding, wansIGMP) {
    jsMiscSettingsController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsMiscSettingsClientView
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsMiscSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.changeModel(new jsMiscSettingsModel(service)), this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController(service.table_alt), "table_alt"), this.addChild(new jsInputController(service.rip), "rip"), this.addChild(new jsWANIGMPController(service, isadding, wansIGMP), "igmp"), this.addChild(new jsInputController(service.nat), "nat"), this.addChild(new jsInputController(service.firewall), "firewall"), this.addChild(new jsInputController(service.ping_respond), "ping"), this.getChild("igmp").nextIface = "client"
}

function jsMiscSettingsClientView(ctrl, viewInx, options) {
    var obj, opt, service = ctrl.model.service;
    ctrl.model.service.level, obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {}, opt = obj.ifaceTypes.separator.options, opt.label = "wanMiscSect", opt.hide = service.blocks || !service.is_wan || !options.inwizard && (service.contype.match(/l2tp/) || service.contype.match(/pptp/));
    var alt_contypes = ["dynamic", "dynamicv6", "static", "staticv6", "pppoe", "pppoev6", "pppoedual", "pptp", "pptpv6", "statpptp", "statpptpv6", "dynpptp", "dynpptpv6", "l2tp", "l2tpv6", "dynl2tp", "dynl2tpv6", "statl2tp", "statl2tpv6", "statpppoe", "dynpppoe"];
    obj = ctrl.getChild("table_alt"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanIsolation",
        valset: {
            on: !0,
            off: !1
        },
        hide: -1 == alt_contypes.indexOf(service.contype)
    }, obj = ctrl.getChild("igmp"), obj.ifaceTypes.client.options = {
        valset: {
            on: !0,
            off: !1
        }
    }, opt = obj.ifaceTypes.client.options, opt.hide = "3g" == service.contype || "pppv6" == service.type || "ipv6" == service.type || "ppp" == service.type || 4 == service.level, obj = ctrl.getChild("rip"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanRip",
        valset: {
            on: !0,
            off: !1
        },
        hide: !service.is_wan
    }, obj.ifaceTypes.checkbox.options.hide |= "3g" == service.contype || "lte" == service.contype || "624" == service.contype, obj.ifaceTypes.checkbox.options.hide |= !0, obj = ctrl.getChild("nat"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanNat",
        valset: {
            on: !0,
            off: !1
        },
        hide: !service.is_wan
    }, obj.ifaceTypes.checkbox.options.hide |= "624" == service.contype || "pppv6" == service.type || "ipv6" == service.type, obj = ctrl.getChild("firewall"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanFirewall",
        valset: {
            on: !0,
            off: !1
        },
        hide: !service.is_wan
    }, obj = ctrl.getChild("ping"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanPingRespond",
        valset: {
            on: !0,
            off: !1
        },
        hide: !service.is_wan
    }, this.updateModel = function() {
        var res = jsMiscSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var service = this.ctrl.model.service;
            service.rip = this.getChild("rip").ctrl.model.value, service.table_alt = this.getChild("table_alt").ctrl.model.value, service.nat = this.getChild("nat").ctrl.model.value, service.firewall = this.getChild("firewall").ctrl.model.value, service.ping_respond = this.getChild("ping").ctrl.model.value
        }
        return res
    }, this.onmodeswitch = function() {
        return this.options.brief ? this.hide() : this.show(), !1
    }, this.drawView = function() {
        jsMiscSettingsClientView.superclass.drawView.call(this), this.onmodeswitch()
    }, this.brief = service.wizard, jsMiscSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("modeswitch", this.onmodeswitch)
}

function jsMiscSettingsSummaryView(ctrl, viewInx, options) {
    var obj = ctrl.getChild("igmp");
    obj.nextIface = "summary", obj.ifaceTypes.summary.options = {
        valset: {
            on: !0,
            off: !1
        }
    };
    var service = ctrl.model.service;
    ctrl.model.service.level, obj.ifaceTypes.summary.options.hide = "3g" == service.contype || "pppv6" == service.type || "ipv6" == service.type || 4 == service.level, jsMiscSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        this.getChild("desc").options.hide = !0, jsMiscSettingsSummaryView.superclass.drawView.call(this)
    }, this.updateView = function() {
        jsMiscSettingsSummaryView.superclass.updateView.call(this), this.getChild("desc").hide()
    }, this.bind("modeswitch", function() {
        return !1
    })
}

function pageNetStat() {
    pageNetStat.superclass.constructor.call(this), this.netlist = null, this.resolf_conf = null, this.rqId = -1, this.virgin = !0, this.refreshTime = 3e3, this.refreshId = null, this.$grid = null, this.updateView = function(phase) {
        function checkIPv6(ip) {
            var ipbuf = ip.split(":");
            if (ipbuf.length > 4) {
                for (var j = 0, ipstart = ""; j < ipbuf.length - 1; j++) ipstart += ":" != ipbuf[j] ? ipbuf[j] + ":" : ":", 3 == j && (ipstart += "</br>");
                ipstart += ipbuf[ipbuf.length - 1], ip = ipstart
            }
            return ip
        }
        if (pageNetStat.superclass.updateView.apply(this, arguments), "forward" == phase && (this.startForm().add(new node, "grid"), this.endForm()), "back" == phase) {
            var ipgwColumnName = lng("nstIp") + "<br>-<br>" + lng("nstGw"),
                header = [{
                    index: "name",
                    name: "nstName"
                }, {
                    index: "ipgw",
                    name: ipgwColumnName
                }, {
                    index: "mac",
                    name: "nstMac"
                }, {
                    index: "rxtx",
                    name: "nstRxTx"
                }, {
                    index: "dur",
                    name: "nstDuration"
                }, {
                    index: "arrow",
                    name: ""
                }],
                list = this.netlist;
            this.$grid = this.get("grid").$box.lightUIGrid(header, 0, {
                clickable: !0
            });
            var count = 0;
            if (list)
                for (i in list) {
                    var iface = list[i],
                        row = this.$grid.addRow().row(count);
                    count += 1;
                    var stateStr, stateImg, stateColor, rxtx = "-",
                        empty = "-",
                        name = "-";
                    if (name = iface.name ? iface.name : iface.port ? iface.port : i, is.string(iface.mask) && is.string(iface.ip) && !iface.ip.match(/:/)) {
                        var ipv4 = new IPv4(iface.ip, iface.mask);
                        ip = ipv4.toString(!0)
                    }
                    else ip = iface.ip ? checkIPv6(iface.ip) : empty;
                    iface.state && "down" != iface.state ? "up" == iface.state ? (stateStr = lng("nstStateUp"), stateImg = '<img src="image/ledgreen.gif" />', stateColor = "green", rxtx = lookSize(iface.rx).toString() + " / <br>" + lookSize(iface.tx).toString()) : (stateStr = iface.state, stateImg = '<img src="image/ledyellow.gif" />', stateColor = "yellow") : (stateStr = lng("nstStateDown"), stateImg = '<img src="image/ledred.gif" />', stateColor = "red");
                    var shortName = name;
                    if (is.string(name) && name.length > 15 && (shortName = name.substr(0, 13) + ".."), is.string(iface.mask) && is.string(iface.ip) && !iface.ip.match(/:/)) {
                        var ipv4 = new IPv4(iface.ip, iface.mask);
                        ip = ipv4.toString(!0)
                    }
                    else ip = iface.ip ? checkIPv6(iface.ip) : empty;
                    var gw = "";
                    gw = iface.gw ? checkIPv6(iface.gw) : empty;
                    var ipgw = ip + "<br>-<br>" + gw;
                    ip == empty && gw == empty && (ipgw = empty), iface.ipv6 && (ipgw == empty ? ipgw = "" : ipgw += "<br/>", ip = iface.ip ? checkIPv6(iface.ipv6) : empty, gw = iface.gwv6 ? checkIPv6(iface.gwv6) : empty, ipgw += ip + "<br>-<br>" + gw), row.col("name").fieldval(name).css("color", stateColor).attr("title", shortName + " (" + stateStr + ")").css("cursor", "default"), row.col("ipgw").fieldval(ipgw).css("cursor", "default"), row.col("mac").fieldval(iface.mac ? iface.mac.toUpperCase() : empty).css("cursor", "default"), row.col("rxtx").fieldval(rxtx).css("cursor", "default"), row.col("dur").fieldval(iface.duration_s ? getDuration(iface.duration_s) : empty).css("cursor", "default"), row.col("arrow").fieldval('<img src="image/markermoreinfo.png" />').attr("title", lng("nstMoreInfo")).css("cursor", "pointer").data("iface", i), ("ara" == window.curlang || "fas" == window.curlang) && row.col("arrow").css("transform", "scaleX(-1)")
                }
            this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row, $cell) {
                if ("arrow" == $cell.getColAlias()) {
                    var ip, gw, mtu, rxtx, name = $row.col("name").fieldval(),
                        iface = $row.col("arrow").data("iface");
                    if (this.netlist)
                        for (i in this.netlist) i == iface && (mtu = no(this.netlist[i].mtu) ? empty : this.netlist[i].mtu.toString(), rxtx = $row.col("rxtx").fieldval() != empty ? lookSize(this.netlist[i].rx).toString() + " / " + lookSize(this.netlist[i].tx).toString() : empty + " / " + empty, ip = no(this.netlist[i].ip) ? empty : this.netlist[i].ip.toString(), gw = no(this.netlist[i].gw) ? empty : this.netlist[i].gw.toString(), ipv6 = no(this.netlist[i].ipv6) ? empty : this.netlist[i].ipv6.toString(), gwv6 = no(this.netlist[i].gwv6) ? empty : this.netlist[i].gwv6.toString());
                    var rule = {
                        name: name,
                        mac: $row.col("mac").fieldval(),
                        dur: $row.col("dur").fieldval(),
                        mtu: mtu,
                        rxtx: rxtx,
                        ip: ip,
                        gw: gw,
                        ipv6: ipv6,
                        gwv6: gwv6
                    };
                    this.showMore(rule)
                }
            }))
        }
    }, this.showMore = function(rule) {
        this.stopRefresh(), this.$box.unbind();
        var showAll = new showMoreInfo(rule, this.netlist, this.resolf_conf);
        showAll.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            this.emit("updaterq"), showAll.cleanButtonBar(), showAll.stopRefr()
        }))
    }, this.update = function() {
        this.virgin && rootView.showModalOverlay(), this.rqId = device.config.read([104], callback(this, function(data) {
            this.netlist = is.RPC_SUCCESS(data) ? data.rq[0].resident : null, this.deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.virgin = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this.virgin = !0, this
    }, this.bind("updaterq", function() {
        this.stopRefresh().startRefresh(0)
    }), this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    }), window.engine && window.engine.candyBlack || (this.onupdaterq = function() {
        this.updateView()
    }, this.bind("updaterq", this.onupdaterq))
}

function showMoreInfo(rule, netlist, resolf_conf) {
    showMoreInfo.superclass.constructor.call(this), this.netlist = netlist, this.resolf_conf = resolf_conf, this.rqId = -1, this.refreshTime = 3e3, this.refreshId = null, this.rule = rule;
    var empty = "-";
    this.add(new nodestatic("nstName", rule.name)).add(new nodestatic("nstIp", rule.ip), "ip").add(new nodestatic("nstGw", rule.gw), "gw").add(new nodestatic("IPv6", rule.ipv6), "ipv6").add(new nodestatic("wanIPv6GwSect", rule.gwv6), "gwv6").add(new nodestatic("nstMac", rule.mac)).add(new nodestatic("nstMtu", rule.mtu)).add(new nodestatic("nstDnsPrim", rule.dns_prim), "dns_prim").add(new nodestatic("nstDnsSec", rule.dns_sec), "dns_sec").add(new nodestatic("nstVpnServiceName", rule.servicename), "servicename").add(new nodestatic("nstRxTx", rule.rxtx), "rxtx").add(new nodestatic("nstDuration", rule.dur), "dur").add(new nodestatic("nstLeaseBegin", ""), "leaseBegin").add(new nodestatic("nstLeaseLastRenew", ""), "leaseRenew").add(new nodestatic("nstLease", ""), "lease"), this.updateView = function(phase) {
        if (showMoreInfo.superclass.updateView.apply(this, arguments), "back" == phase && (this.startRefr(this.refreshTime), this.netlist))
            for (i in this.netlist)
                if (this.netlist[i].name == this.rule.name) {
                    if ("up" == this.netlist[i].state) var rxtx = lookSize(this.netlist[i].rx).toString() + " / " + lookSize(this.netlist[i].tx).toString();
                    this.netlist[i].ip ? this.child("ip").val(this.netlist[i].ip) : this.child("ip").hide(), this.netlist[i].gwv6 ? this.child("gw").val(this.netlist[i].gw) : this.child("gw").hide(), this.netlist[i].ipv6 ? this.child("ipv6").val(this.netlist[i].ipv6) : this.child("ipv6").hide(), this.netlist[i].gwv6 ? this.child("gwv6").val(this.netlist[i].gwv6) : this.child("gwv6").hide(), this.netlist[i].dns_prim ? this.child("dns_prim").val(this.netlist[i].dns_prim) : this.child("dns_prim").hide(), this.netlist[i].dns_sec ? this.child("dns_sec").val(this.netlist[i].dns_sec) : this.child("dns_sec").hide(), this.netlist[i].servicename ? this.child("servicename").val(this.netlist[i].servicename) : this.child("servicename").hide(), this.child("rxtx").val(rxtx);
                    var beginTime = null;
                    this.netlist[i].duration_s ? (this.child("dur").val(getDuration(this.netlist[i].duration_s)), beginTime = new Date(1e3 * (parseInt((new Date).getTime() / 1e3) - this.netlist[i].duration_s))) : this.child("dur").hide();
                    var renewTime = null;
                    this.netlist[i].current_lease ? renewTime = new Date(1e3 * (parseInt((new Date).getTime() / 1e3) - this.netlist[i].current_lease)) : (this.child("leaseBegin").hide(), this.child("leaseRenew").hide()), beginTime = null != beginTime ? beginTime.toString().substring(0, beginTime.toString().lastIndexOf("GMT")) : empty, renewTime = null != renewTime ? renewTime.toString().substring(0, renewTime.toString().lastIndexOf("GMT")) : empty, this.child("leaseBegin").val(beginTime), this.child("leaseRenew").val(renewTime), this.netlist[i].leasetime ? this.child("lease").val(this.netlist[i].leasetime ? this.netlist[i].leasetime : empty) : this.child("lease").hide()
                }
    }, this.update = function() {
        this.rqId = device.config.read([104], callback(this, function(data) {
            this.netlist = is.RPC_SUCCESS(data) ? data.rq[0].resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.startRefr = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefr = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this
    }, this.bind("updaterq", function() {
        this.stopRefr().startRefr(0)
    }), this.bind("stoprefreshrq", function() {
        this.stopRefr()
    }), window.engine && window.engine.candyBlack || (this.onupdaterq = function() {
        this.updateView()
    }, this.bind("updaterq", this.onupdaterq))
}

function jsNotifierModel() {
    jsNotifierModel.superclass.constructor.call(this), this.getConfigStatus = 20, this.newSmsStatus = 75
}

function jsNotifierController(frame) {
    jsNotifierController.superclass.constructor.call(this), this.changeModel(new jsNotifierModel), this.ifaceTypes.cside = {
        type: jsNotifierView
    }, this.ifaceTypes.getinfo = {
        type: jsNotifierGetInfoView,
        options: {
            action: "index.cgi"
        }
    }, this.frame = frame
}

function jsNotifierView(ctrl, viewInx, options) {
    jsNotifierView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        if (jsNotifierView.superclass.drawView.call(this), $(this.myBoxSel).html(""), void 0 != this.ctrl.model.getConfigStatus && 20 != this.ctrl.model.getConfigStatus) {
            var message = lng("save");
            switch (this.ctrl.model.getConfigStatus) {
                case 12:
                    message = lng("button_save_reboot");
                    break;
                case 13:
                    message = lng("save")
            }
            $(this.myBoxSel).append("<div><span>" + lng("conf_change_warning") + "</span><button id='uiNtfSaveConfig' type='button'>" + message + "</button></div>"), $("#uiNtfSaveConfig").bind("click", {}, context(this).callback(this.onapllyclick))
        }
        void 0 != this.ctrl.model.newSmsStatus && 20 == this.ctrl.model.newSmsStatus && ($(this.myBoxSel).append("<div><span>" + lng("g3_sms_have_new") + "</span><button id='uiNtfNewSms' type='button'>" + lng("smsGotoInbox") + "</button></div>"), $("#uiNtfNewSms").bind("click", {}, context(this).callback(this.onnewsmsclick))), "" != $(this.myBoxSel).html() ? $(this.myBoxSel).css("display", "") : $(this.myBoxSel).css("display", "none")
    }, this.onupdmodel = function() {
        this.drawView()
    }, this.onapllyclick = function() {
        var getConfigStatus = this.ctrl.model.getConfigStatus;
        return 12 == getConfigStatus ? this.ctrl.frame.event("cfgsaverebootrq") : 13 == getConfigStatus && this.ctrl.frame.event("cfgsaverq"), !1
    }, this.onnewsmsclick = function() {
        return this.ctrl.model.newSmsStatus, this.ctrl.frame.event("readsmsrq"), !1
    }, this.bind("updmodel", this.onupdmodel)
}

function jsNotifierGetInfoView(ctrl, viewInx, options) {
    jsNotifierGetInfoView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        this.ctrl.model.getConfigStatus = this.options.sender.responseData.status
    }, this.prepareData = function() {
        var obj = new Object;
        obj.res_cmd = 19, obj.res_cmd_type = "bl", obj.v2 = "y", obj.rq = "y", this.addToRequest(obj)
    }, this.onmuterq = function() {
        return this.stopRefresh(), !1
    }, this.bind("muterq", this.onmuterq)
}

function pageNTP() {
    function timeFormat(time) {
        return (time.tm_hour.toString().length < 2 ? "0" : "") + time.tm_hour + ":" + (time.tm_min.toString().length < 2 ? "0" : "") + time.tm_min
    }

    function dateFormat(time) {
        return (time.tm_mday.toString().length < 2 ? "0" : "") + time.tm_mday + "." + (time.tm_mon.toString().length < 2 ? "0" : "") + time.tm_mon + "." + time.tm_year
    }
    pageNTP.superclass.constructor.call(this), this.ntp = null;
    for (var timezone = {}, i = 12; i >= -12; i--) switch (timezone[i > 0 ? "ntpTzMinus" + i : "ntpTz" + Math.abs(i)] = i, i) {
        case 5:
        case 4:
            timezone["ntpTzMinus" + (i - 1) + "30"] = i - 1 + ":30";
            break;
        case -3:
        case -4:
        case -5:
        case -6:
        case -9:
            timezone["ntpTz" + Math.abs(i) + "30"] = i + ":30", -5 == i && (timezone["ntpTz" + Math.abs(i) + "45"] = i + ":45")
    }
    this.add(new nodestatic("systemDate", ""), "date"), this.add(new nodestatic("systemTime", ""), "time"), this.add(new nodeSelect("ntpMode"), "mode");
    var auto = this.add(new node, "auto").child("auto").add(new nodeSelect("ntpTz", ""), "hour").add(new nodeCheckBox("ntpDaylightSavingTime"), "saving_time").add(new nodeTextArea("ntpServers", "ntp1.dlink.com", {
        rows: 5,
        mandatory: !0,
        re: [callback(this, function(value) {
            for (var err = null, list = new Array, errlist = new Array, tmplist = value.replace(/(,|;|\ )/g, "\n").split("\n"), i = 0; i < tmplist.length; i++) {
                var addr = $.trim(tmplist[i]);
                "" != addr && (validate_host(addr) ? list.push(addr) : (err = !0, errlist.push(addr)))
            }
            return err ? err = lng("ntpAddressWrong") + " " + errlist.join(", ") : auto.child("servers").val(list.join("\n")), err
        })]
    }), "servers");
    auto.add(new nodeCheckBox("ntpUseDhcp"), "use_dhcp");
    var manual = this.add(new node({
        hidden: !0
    }), "manual").child("manual").add(new nodeSelect("ntpMonth"), "month").add(new nodeSelect("ntpDay"), "day").add(new nodeSelect("ntpYear"), "year").add(new nodeSelect("ntpHour"), "hour").add(new nodeSelect("ntpMinute"), "minute");
    this.listen("mode", "endform fieldchange", function(status, value) {
        var detectTZ = this.getButton("ntpDetectTZ");
        "auto" == value ? (auto.show(), manual.hide(), detectTZ.show()) : (auto.hide(), manual.show(), detectTZ.hide())
    }), this.child("manual").listen("month", "endform fieldchange", function(status, value) {
        for (var count = new Date((new Date).getFullYear(), value, 0).getDate(), mday = manual.child("day").cleanOptions(), i = 1; count >= i; i++) mday.addOption(i, i)
    }), auto.listen("use_dhcp", "endform fieldchange", function(status, value) {
        var servers = auto.child("servers");
        value ? servers.disable() : servers.enable()
    }), this.stime = function(time) {
        var time = time || null,
            interval = 5e3;
        time ? (this.child("time").val(timeFormat(time)), this.child("date").val(dateFormat(time)), this.child("time").show(), this.child("date").show(), time.tm_min > this.ntp.time.tm_min && (interval = 6e4)) : (this.child("time").hide(), this.child("date").hide()), setTimeout(callback(this, function() {
            this.emit("updatetimerq")
        }), interval)
    }, this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        pageNTP.superclass.updateView.apply(this, arguments);
        var auto = this.child("auto"),
            manual = this.child("manual");
        if ("forward" == phase && (this.cleanButtonBar().addButton("ntpDetectTZ").getButton("ntpDetectTZ").bind("click.button", callback(this, function() {
                auto.child("hour").val((new Date).getTimezoneOffset() / 60)
            })), disableFlag(65) && this.getButton("ntpDetectTZ").children("div").addClass("disable"), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel(), this.status.error || this.save()
            })), disableFlag(65) && this.getButton("button_save").children("div").addClass("disable")), "back" == phase) {
            var ahour = (this.child("mode").cleanOptions().addOption("ntpModeAuto", "auto").addOption("ntpModeManual", "manual"), auto.child("hour").cleanOptions());
            for (var tz in timezone) ahour.addOption(lng(tz), timezone[tz]);
            for (var mmonth = manual.child("month").cleanOptions(), mday = manual.child("day").cleanOptions(), i = 1; 13 > i; i++) mmonth.addOption(lng("ntpMonth" + i), i);
            for (var myear = manual.child("year").cleanOptions(), i = 2012; 2038 > i; i++) myear.addOption(i, i);
            for (var mhour = manual.child("hour").cleanOptions(), i = 0; 24 > i; i++) mhour.addOption(i.toString(), i);
            for (var mminute = manual.child("minute").cleanOptions(), i = 0; 60 > i; i++) mminute.addOption(i.toString(), i);
            var date = new Date;
            if (mmonth.val(date.getMonth() + 1), mday.val(date.getDate()), myear.val(date.getFullYear()), mhour.val(date.getHours()), mminute.val(date.getMinutes()), this.ntp) {
                if (auto.child("hour").val(this.ntp.hour), auto.child("servers").val(this.ntp.servers.join("\n")), this.child("mode").val(this.ntp.enable ? "auto" : "manual"), this.ntp.time) {
                    var time = this.ntp.time;
                    manual.child("month").val(time.tm_mon), manual.child("day").val(time.tm_mday), manual.child("year").val(time.tm_year), manual.child("hour").val(time.tm_hour), manual.child("minute").val(time.tm_min), time.tm_hour + ":" + time.tm_min, time.tm_mday + "." + time.tm_mon + "." + time.tm_year, this.stime(time)
                }
                auto.child("use_dhcp").val(this.ntp.use_dhcp || !1).fieldchange(), auto.child("saving_time").val(this.ntp.dst ? !0 : !1)
            }
            this.endForm(), manual.endForm(), auto.endForm()
        }
    }, this.child("auto/use_dhcp").bind("fieldchange", callback(this, function(e, value) {
        var auto = this.child("auto");
        auto.child("servers").val(value ? this.ntp["dhcp-servers"] ? this.ntp["dhcp-servers"].join("\n") : "" : this.ntp.servers ? this.ntp.servers.join("\n") : "")
    })), this.save = function() {
        rootView.showModalOverlay();
        var enable = "auto" == this.child("mode").val(),
            auto = this.child("auto"),
            manual = this.child("manual");
        this.ntp.enable = enable, this.ntp.hour = enable ? auto.child("hour").val() : this.ntp.hour, this.ntp.use_dhcp = enable ? auto.child("use_dhcp").val() : this.ntp.use_dhcp, this.ntp.dst = enable ? auto.child("saving_time").val() : this.ntp.saving_time, this.ntp.servers = enable && !this.ntp.use_dhcp ? auto.child("servers").val().split("\n") : this.ntp.servers, this.ntp.time = {}, this.ntp.time.tm_mon = parseInt(manual.child("month").val()), this.ntp.time.tm_mday = parseInt(manual.child("day").val()), this.ntp.time.tm_year = parseInt(manual.child("year").val()), this.ntp.time.tm_hour = parseInt(manual.child("hour").val()), this.ntp.time.tm_min = parseInt(manual.child("minute").val()), device.config.write(65, this.ntp, callback(this, function() {
            this.emit("updaterq"), rootView.hideModalOverlay()
        }))
    }, this.bind("updatetimerq", function() {
        device.config.read(65, callback(this, function(data) {
            try {
                if (is.RPC_SUCCESS(data)) {
                    var time = data.resident.ntpclient.time || null;
                    this.stime(time)
                }
            }
            catch (e) {
                this.deep.updateView().$box.errorBlock(lng("error"), e.message)
            }
        }))
    }), this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(65, callback(this, function(data) {
            try {
                is.RPC_SUCCESS(data) && (this.ntp = data.resident.ntpclient, this.deep.updateView(), rootView.hideModalOverlay())
            }
            catch (e) {
                this.deep.updateView().$box.errorBlock(lng("error"), e.message)
            }
        }))
    })
}

function pagePasswd(defpass) {
    pagePasswd.superclass.constructor.call(this), this.defpassmode = defpass, this.add(new nodeCaption("adminPassword", "passwDescText")).add(new nodeSelect("passwLogin"), "login").add(new nodestatic("passwLogin", null, {
        hiden: !0
    }), "login_stat").add(new nodetext("passwPassword", "", {
        password: !0,
        mandatory: !0,
        maxLength: 31,
        re: [function(value) {
            return new RegExp("[А-яЁё]+", "g").test(value) ? "passwConfirmCirill" : null
        }, function(value) {
            return new RegExp("[<>%]+", "g").test(value) ? "illegalCharacters" : null
        }]
    }), "password").add(new nodetext("passwConfirm", "", {
        password: !0,
        mandatory: !0,
        maxLength: 31,
        re: [callback(this, function(value) {
            return this.child("password").val() == value ? null : "passwConfirmMismatch"
        })]
    }), "confirm"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pagePasswd.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, this.trysave)), "back" == phase) {
            var login = this.get("login").cleanOptions();
            getCookie("current_login"), login.addOption("admin", "admin"), 1 == _.size(login.options.options) ? (login.hide(), this.get("login_stat").val(login.val()).show()) : (login.show(), this.get("login_stat").hide()), this.$box.find(":input[type=password]").bind("keypress", callback(this, function(e) {
                return 13 == e.keyCode ? (this.trysave(), !1) : void 0
            }))
        }
    }, this.trysave = function() {
        this.deep.updateModel(), this.status.error || this.save(this.child("login").val(), this.child("password").val())
    }, this.save = function(login, passwd) {
        rootView.showModalOverlay(), login != getCookie("client_login") || passwd != getCookie("client_password"), outArr = [], outArr = [
            [69, {
                login: login,
                pass: passwd
            }]
        ], device.config.write(outArr, callback(this, function(data) {
            rootView.showModalOverlay(), 52 == data.rq[0].status ? (rootView.hideModalOverlay(), alert(lng("passwInvalidLogin"))) : is.RPC_SUCCESS(data) && device.system.auth(login, passwd, callback(this, function(answer) {
                rootView.hideModalOverlay(), 1 != answer.is_auth ? location.reload(!0) : this.emit("updaterq"), alert(lng("passChanged"))
            }))
        }))
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read(69, callback(this, function() {
            this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update)
}

function pagePing() {
    pagePing.superclass.constructor.call(this), this.updateView = function(phase) {
        if (pagePing.superclass.updateView.apply(this, arguments), "forward" == phase) {
            this.cleanButtonBar().addButton("button_start").getButton("button_start").bind("click.button", callback(this, function() {
                this.deep.updateModel(), this.status && !this.status.error && this.ping()
            }));
            var options = {
                1: 1,
                2: 2,
                3: 3,
                4: 4,
                5: 5
            };
            this.startForm().add(new nodeDomainName("ping_host", "", {
                mandatory: !0,
                isip: !0
            }), "pingHost"), this.add(new nodeSelect("ping_count"), "pingCount"), this.add(new node, "pingLog").endForm();
            var pingCount = this.child("pingCount").cleanOptions();
            for (var i in options) pingCount.addOption(i, options[i])
        }
    }, this.updateModel = function(status) {
        this.status = status
    }, this.ping = function() {
        rootView.showModalOverlay();
        var outObj = {
            host: this.child("pingHost").val(),
            count: parseInt(this.child("pingCount").val(), 10)
        };
        window.DISABLE_NOTIFIER = !0, device.config.write(18, outObj, callback(this, function(answer) {
            if (answer.resident) {
                rootView.hideModalOverlay();
                var textLog = null;
                answer.resident.ping && (textLog = answer.resident.ping);
                var log = this.child("pingLog");
                log.$box.html($("					<div class='console syslog'>						<pre>" + textLog + "</pre>					</div>				"))
            }
            device.system.save(), window.rootCtrl.getChild("fastmenu", "notifier").event("cancelshowalways"), window.DISABLE_NOTIFIER = !1
        }))
    }, this.bind("fieldchange", function(status, value) {
        this.child("pingHost").val(), "pingV6" == status.target.getAlias() && (this.child("pingHost").options.ipv6 = value ? !0 : !1, this.deep.updateModel(), this.child("pingHost").deep.updateView())
    }), this.bind("updaterq", function() {
        this.deep.updateView()
    })
}

function jsPopupmenuModel(itemState) {
    jsPopupmenuModel.superclass.constructor.call(this), this.itemName = itemState ? itemState.name : "", this.itemImage = null, this.itemType = null, this.itemIndex = 0, this.itemSelected = !1, this.itemDisabled = !1, null != itemState && (itemState.img && (this.itemImage = itemState.img), itemState.type && (this.itemType = "radio" == itemState.type ? "radio" : "check"), itemState.index && (this.itemIndex = itemState.index), itemState.selected && (this.itemSelected = itemState.selected), itemState.disabled && (this.itemDisabled = itemState.disabled))
}

function jsPopupmenuController(itemState, options) {
    jsPopupmenuController.superclass.constructor.call(this), this.changeModel(new jsPopupmenuModel(itemState)), this.ifaceTypes.tree = {
        type: jsPopupmenuView,
        def: !0,
        options: {
            style: null,
            open: !0,
            noPath: !0
        }
    }, this.integrate = function(childInx, parent) {
        jsPopupmenuController.superclass.integrate.call(this, childInx, parent)
    }, options && (this.frame = options.frame, this.popupmenuCtrl = options.target, this.rootItem = this)
}

function jsPopupmenuView(ctrl, viewInx, options) {
    jsPopupmenuView.superclass.constructor.call(this, ctrl, viewInx, options), this.click = function() {
        if (this.ctrl.model.itemDisabled) return !1;
        var info = this.ctrl.model,
            isNeedHide = !0,
            rootItem = this.ctrl.rootItem;
        if (info.itemType) {
            if ("check" == info.itemType) {
                info.itemSelected = !info.itemSelected;
                var state = info.itemSelected ? "full" : "empty";
                $(this.viewBoxSel + ">img").attr("src", "../image/checkbox_" + state + ".png")
            }
            else if (!info.itemSelected) {
                var items = this.ctrl.getParent().children;
                for (var i in items) "radio" == items[i].model.itemType && items[i].model.itemIndex == info.itemIndex && (items[i].model.itemSelected = !1);
                info.itemSelected = !0, $(this.viewBoxSel).parent().find("img.index_" + info.itemIndex).attr("src", "../image/radiobtn_empty.png"), $(this.viewBoxSel + ">img").attr("src", "../image/radiobtn_full.png")
            }
            isNeedHide = !1
        }
        return rootItem.frame.event("clickpopupmenu", {
            item: this,
            target: rootItem.target
        }), isNeedHide && $("body").click(), !1
    }, this.showPopupmenu = function(e) {
        var popupmenu = $(this.viewBoxSel + ">ul.popupmenu");
        $(popupmenu).is(":visible") && ($(popupmenu).find("ul.popupmenu").hide(), $(popupmenu).hide(), this.ctrl.frame.event("hidepopupmenu", this.ctrl.rootItem.target)), this.ctrl.rootItem.target = e.target, this.findSubmenu($(popupmenu));
        var topOffset = $(popupmenu).parent().offset().top - $(popupmenu).parent().position().top,
            leftOffset = $(popupmenu).parent().offset().left - $(popupmenu).parent().position().left;
        return $(popupmenu).css({
            left: e.pageX - leftOffset + "px",
            top: e.pageY - topOffset + "px"
        }), $(popupmenu).fadeIn("slow"), this.ctrl.frame.event("showpopupmenu", e.target), !1
    }, this.hidePopupmenu = function() {
        var popupmenu = $(this.viewBoxSel + ">ul.popupmenu");
        $(popupmenu).find("ul.popupmenu").hide(), this.ctrl.frame.event("hidepopupmenu", this.ctrl.rootItem.target), $(popupmenu).fadeOut("fast")
    }, this.findSubmenu = function(popupmenu) {
        var findSubmenu = this.findSubmenu;
        $(popupmenu).find(">li>ul.popupmenu").each(function() {
            var item = $(this).parent(),
                submenu = $(this);
            $(item).mouseenter(function() {
                return $(this).find(">a").hasClass("disabled") ? !0 : ($(submenu).css({
                    left: ($(this).width() + parseInt($(this).css("padding-left")) + parseInt($(this).css("padding-right"))).toString() + "px",
                    top: ($(this).offset().top - $(this).parent().offset().top).toString() + "px"
                }), findSubmenu($(submenu)), $(this).parent().find("ul.popupmenu").hide(), void $(submenu).show("fast"))
            }), $(item).mouseleave(function() {
                return $(this).find(">a").hasClass("disabled") ? !0 : ($(submenu).find("ul.popupmenu").hide(), void $(submenu).hide())
            })
        })
    }, jsPopupmenuView.prototype.drawView = function() {
        if (this.ctrl.rootItem || (this.ctrl.rootItem = this.getParent().ctrl.rootItem), jsPopupmenuView.superclass.drawView.call(this), $(this.myBoxSel).html(lng(this.ctrl.model.itemName)), this.ctrl.root) {
            var popupmenuCtrl = this.ctrl.popupmenuCtrl;
            for (var i in popupmenuCtrl.views) $(popupmenuCtrl.views[i].viewBoxSel).bind("contextmenu", context(this).callback(this.showPopupmenu));
            $("body").bind("click", context(this).callback(this.hidePopupmenu)), $("html").bind("click", context(this).callback(this.hidePopupmenu))
        }
        else {
            var info = this.ctrl.model;
            if ($(this.viewBoxSel).parent().addClass("popupmenu").css("z-index", 999999), "-" != info.itemName) {
                $(this.viewBoxSel).addClass("item");
                var img = $("<img width='16px' height='16px' src='' />").css({
                    display: "inline-block"
                });
                if (info.itemImage && $(img).attr("src", info.itemImage), info.itemType) {
                    var type = "check" == info.itemType ? "checkbox" : "radiobtn",
                        state = info.itemSelected ? "full" : "empty";
                    $(img).attr("src", "../image/" + type + "_" + state + ".png"), $(img).addClass("index_" + info.itemIndex)
                }
                $(this.viewBoxSel).prepend(img), info.itemDisabled ? ($(this.viewBoxSel + ">img").css("opacity", .3), $(this.viewBoxSel + ">a").addClass("disabled")) : $(this.viewBoxSel).bind("click", context(this).callback(this.click))
            }
            else $(this.viewBoxSel).addClass("separator"), $(this.viewBoxSel).html("")
        }
    }, this.disable = function() {
        this.ctrl.model.itemDisabled = !0, this.drawView()
    }, this.enable = function() {
        this.ctrl.model.itemDisabled = !1, this.drawView()
    }, jsPopupmenuView.prototype.onactivate = function() {
        return !1
    }, jsPopupmenuView.prototype.ondeactivate = function() {
        return !1
    }, this.bind("activate", this.onactivate), this.bind("deactivate", this.ondeactivate)
}

function jsPPPSettingsModel(service) {
    jsPPPSettingsModel.superclass.constructor.call(this), this.service = service
}

function jsPPPSettingsController(service) {
    jsPPPSettingsController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsPPPSettingsClientView,
        def: !0
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsPPPSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.changeModel(new jsPPPSettingsModel(service)), this.addChild(new jsDecorController, "desc"), this.addChild(new jsInputController(service.auto), "auto"), this.addChild(new jsInputController(service.username), "userName"), this.addChild(new jsInputController(service.noauth), "noAuth"), this.addChild(new jsInputController("dlink"), "password"), this.addChild(new jsInputController("dlink"), "confirm"), this.addChild(new jsInputController(service.apn), "apn"), this.addChild(new jsInputController(service.dial_num ? service.dial_num.replace(/\^/g, "#") : service.dial_num), "dialNumber"), this.addChild(new jsInputController(service.servicename), "serviceName");
    var advanced = this.addChild(new jsFieldSetController, "advanced");
    advanced.addChild(new jsInputController(service.servicename), "serviceNamePPPoE"), advanced.addChild(new jsInputController(service.encrypt), "encrypt"), advanced.addChild(new jsInputController(service.auth), "auth"), advanced.addChild(new jsInputController(service.mtu), "mtu"), advanced.addChild(new jsInputController(service.keep_alive && service.keep_alive.interval ? !0 : !1), "keepAlive"), advanced.addChild(new jsInputController(service.keep_alive ? service.keep_alive.interval : 30), "lcpInterval"), advanced.addChild(new jsInputController(service.keep_alive ? service.keep_alive.fails : 3), "lcpFails"), advanced.addChild(new jsInputController(service.extra_options ? service.extra_options : ""), "extraOptions"), advanced.addChild(new jsInputController(service.ondemand > 0 ? !0 : !1), "onDemand"), advanced.addChild(new jsInputController(service.ondemand), "idleTimeout"), advanced.addChild(new jsInputController(service.ppp_ip_ext), "pppIpExt"), advanced.addChild(new jsIPv4Controller(service.static_ip), "pppStaticIp"), advanced.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns"), advanced.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns"), advanced.addChild(new jsInputController(service.ppp_debug), "pppDebug"), advanced.addChild(new jsInputController(service.ip), "ip")
}

function jsPPPSettingsClientView(ctrl, viewInx, options) {
    var obj, opt, contype = ctrl.model.service.contype,
        service = (ctrl.model.ifnode, ctrl.model.service),
        level = (ctrl.model.iftree, ctrl.model.service.level);
    obj = ctrl.getChild("desc"), obj.nextIface = "separator", obj.ifaceTypes.separator.options = {
        label: "PPP"
    }, 4 == level && (obj.ifaceTypes.separator.options.label = "VPN"), obj.ifaceTypes.separator.options.hide = service.blocks, obj = ctrl.getChild("auto"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanPPTPAuto",
        valset: {
            on: !0,
            off: !1
        }
    }, obj.ifaceTypes.checkbox.options.hide = 3 == level || service.blocks;
    var advanced = ctrl.getChild("advanced");
    advanced.nextIface = "client", obj = ctrl.getChild("serviceName"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanPPTPSName",
        mandatory: !0
    }, obj.ifaceTypes.input.options.hide = 3 == level || service.blocks, obj = ctrl.getChild("userName"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanUserName",
        mandatory: !0
    }, obj = ctrl.getChild("noAuth"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanNoAuth",
        valset: {
            on: !0,
            off: !1
        }
    };
    var noauth = obj.model.value;
    obj = ctrl.getChild("password"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        password: !0,
        humanName: "wanPassword",
        mandatory: !0
    }, obj.ifaceTypes.input.options.disabled = noauth, obj = ctrl.getChild("confirm"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        password: !0,
        humanName: "wanConfirm",
        comment: "wanHidePassAttention",
        mandatory: !0
    }, obj.ifaceTypes.input.options.disabled = noauth, obj = advanced.getChild("serviceNamePPPoE"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanPPPoESName"
    }, obj.ifaceTypes.input.options.hide = "pppoe" != contype && "pppoev6" != contype && "pppoedual" != contype && "dynpppoe" != contype && "statpppoe" != contype || service.blocks, obj = ctrl.getChild("apn"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanApn",
        optional: !0
    }, obj.ifaceTypes.input.options.hide = "3g" != contype || service.blocks, obj = ctrl.getChild("dialNumber"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanDialNumber",
        mandatory: !0
    }, obj.ifaceTypes.input.options.hide = "3g" != contype || service.blocks, obj = advanced.getChild("encrypt"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
        humanName: "pptp_encr",
        valset: {
            no_encrypt: "0",
            mppe_40_128: "1",
            mppe_40: "2",
            mppe_128: "3"
        }
    }, obj.ifaceTypes.select.options.hide = 3 == level || service.blocks, obj = advanced.getChild("auth"), obj.nextIface = "select", obj.ifaceTypes.select.options = {
        humanName: "wanAuth",
        valset: {
            AUTO: "0",
            PAP: "1",
            CHAP: "2",
            "MS-CHAP": "3",
            "MS-CHAP-V2": "4"
        }
    }, obj.ifaceTypes.select.options.hide = service.blocks, obj = advanced.getChild("mtu"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanMtu",
        minval: 0
    }, obj.ifaceTypes.number.options.hide = service.blocks, obj = advanced.getChild("keepAlive"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanKeepAlive",
        valset: {
            on: !0,
            off: !1
        }
    };
    var keepAlive = obj.model.value;
    obj.ifaceTypes.checkbox.options.hide = service.blocks, obj = advanced.getChild("lcpInterval"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanLcpInterval",
        minval: 0
    }, obj.ifaceTypes.number.options.hide = !keepAlive || service.blocks, obj = advanced.getChild("lcpFails"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanLcpFails",
        minval: 0,
        maxval: 255
    }, obj.ifaceTypes.number.options.hide = !keepAlive || service.blocks, obj = advanced.getChild("extraOptions"), obj.nextIface = "input", obj.ifaceTypes.input.options = {
        humanName: "wanExtraOptions"
    }, obj.ifaceTypes.input.options.hide = "3g" != contype && 3 == level || service.blocks, obj = advanced.getChild("onDemand"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanOnDemand",
        valset: {
            on: !0,
            off: !1
        }
    }, obj.ifaceTypes.checkbox.options.hide = service.blocks;
    var ondemand = obj.model.value;
    obj = advanced.getChild("idleTimeout"), obj.nextIface = "number", obj.ifaceTypes.number.options = {
        humanName: "wanIdleTimeout",
        minval: 0
    }, obj.ifaceTypes.number.options.hide = !ondemand || service.blocks, obj = advanced.getChild("pppIpExt"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanPppIpExt",
        valset: {
            on: !0,
            off: !1
        }
    }, obj.ifaceTypes.checkbox.options.hide = "3g" == contype || 4 == level || service.blocks, obj = advanced.getChild("pppStaticIp"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanPppStaticIp", opt.optional = !0, opt.hide = "pppv6" == service.type || "3g" == service.contype, opt.hide |= service.blocks, obj = advanced.getChild("primaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanPrimDns", opt.optional = !0, opt.hide = !0, obj = advanced.getChild("secondaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanSecDns", opt.optional = !0, opt.hide = !0, obj = advanced.getChild("pppDebug"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
        humanName: "wanPppDebug",
        valset: {
            on: !0,
            off: !1
        }
    }, obj.ifaceTypes.checkbox.options.hide = service.blocks, obj = advanced.getChild("ip"), obj.nextIface = "text", obj.ifaceTypes.text.options = {
        humanName: "wanPPTPIp"
    }, opt = obj.ifaceTypes.text.options, opt.hide = 3 == level || service.blocks, jsPPPSettingsClientView.prototype.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias,
            advanced = this.getChild("advanced"),
            blocks = this.ctrl.model.service.blocks;
        switch (alias) {
            case "dnsFromDhcp":
                obj.value ? (advanced.getChild("pppStaticPrimDnsv6").disable(), advanced.getChild("pppStaticSecDnsv6").disable()) : (advanced.getChild("pppStaticPrimDnsv6").enable(), advanced.getChild("pppStaticSecDnsv6").enable());
                break;
            case "noAuth":
                obj.value ? (this.getChild("password").disable(), this.getChild("confirm").disable(), this.getChild("userName").clearMandatory()) : (this.getChild("password").enable(), this.getChild("confirm").enable(), this.getChild("userName").setMandatory()), this.getChild("noAuth").updateModel();
                break;
            case "onDemand":
                obj.value ? blocks || advanced.getChild("idleTimeout").show() : advanced.getChild("idleTimeout").hide(), advanced.getChild("onDemand").updateModel();
                break;
            case "keepAlive":
                obj.value ? blocks || (advanced.getChild("lcpInterval").show(), advanced.getChild("lcpFails").show()) : (advanced.getChild("lcpInterval").hide(), advanced.getChild("lcpFails").hide()), advanced.getChild("keepAlive").updateModel();
                break;
            case "type":
                switch (obj.value) {
                    case "3g":
                        this.getChild("apn").show(), this.getChild("dialNumber").show();
                        break;
                    case "pppoe":
                    case "pppoa":
                        this.getChild("apn").hide(), this.getChild("dialNumber").hide()
                }
                break;
            case "slaac":
        }
    }, this.updateModel = function() {
        var password, confirm_, noauth, conf = this.getChild("confirm"),
            passw = this.getChild("password"),
            user = this.getChild("userName"),
            apn = this.getChild("apn"),
            dialNumber = this.getChild("dialNumber"),
            advanced = this.getChild("advanced"),
            serviceName = this.getChild("serviceName");
        conf.statusCode = null, passw.statusCode = null, user.statusCode = null, apn.statusCode = null, dialNumber.statusCode = null, serviceName.statusCode = null, serviceName.setError(), passw.ctrl.modified || (passw.ctrl.model.value = this.ctrl.model.service.password, conf.ctrl.model.value = this.ctrl.model.service.password, passw.updateView(), conf.updateView());
        var res = jsPPPSettingsClientView.superclass.updateModel.call(this);
        if (res) {
            var patt2 = /[АаБбВвГгДдЕеЁёЖжЗзИиЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЪъЫыЬьЭэЮюЯя]+/g;
            if (user.ctrl.model.value.match(patt2) && (user.statusCode = "wanUserNameError2", res = !1), noauth = this.getChild("noAuth").ctrl.model.value, noauth ? (passw.ctrl.model.value = "", conf.ctrl.model.value = "") : (password = passw.ctrl.model.value, "" == user.ctrl.model.value && (user.statusCode = "wanUserNameEmpty", res = !1), "" != password ? (confirm_ = conf.ctrl.model.value, confirm_ != password && (conf.statusCode = "wanConfirmMismatch", res = !1), passw.ctrl.model.value.match(patt2) && (passw.statusCode = "wanPasswError2", conf.statusCode = "", res = !1)) : (passw.statusCode = "wanPasswordEmpty", res = !1)), conf.setError(conf.statusCode), passw.setError(passw.statusCode), user.setError(user.statusCode), "3g" == this.ctrl.model.service.contype && "" == dialNumber.ctrl.model.toString() && (dialNumber.statusCode = "wanDialNumberEmpty", dialNumber.setError(), res = !1), res) {
                var service = this.ctrl.model.service;
                service.auto = this.getChild("auto").ctrl.model.value, service.noauth = noauth, service.username = this.getChild("userName").ctrl.model.toString(), service.password = this.getChild("password").ctrl.model.toString(), service.encrypt = advanced.getChild("encrypt").ctrl.model.toString(), service.auth = advanced.getChild("auth").ctrl.model.value, 3 == service.level ? service.servicename = advanced.getChild("serviceNamePPPoE").ctrl.model.toString() : validate_host(serviceName.ctrl.model.value) ? service.servicename = this.getChild("serviceName").ctrl.model.toString() : (serviceName.statusCode = "netAddrOrDomainInvalid", serviceName.setError(), res = !1), service.apn = this.getChild("apn").ctrl.model.toString(), service.dial_num = this.getChild("dialNumber").ctrl.model.toString().replace(/#/g, "^"), advanced.getChild("onDemand").ctrl.model.value ? service.ondemand = advanced.getChild("idleTimeout").ctrl.model.toString() : no(service.ondemand) || delete service.ondemand, service.mtu = advanced.getChild("mtu").ctrl.model.value, service.ppp_ip_ext = advanced.getChild("pppIpExt").ctrl.model.value, service.keep_alive = advanced.getChild("keepAlive").ctrl.model.value ? {
                    interval: advanced.getChild("lcpInterval").ctrl.model.value,
                    fails: advanced.getChild("lcpFails").ctrl.model.value
                } : null, service.extra_options = advanced.getChild("extraOptions").ctrl.model.toString(), service.static_ip = advanced.getChild("pppStaticIp").ctrl.model.toString(), service.dns_prim = advanced.getChild("primaryDns").ctrl.model.toString(), service.dns_sec = advanced.getChild("secondaryDns").ctrl.model.toString(), service.ppp_debug = advanced.getChild("pppDebug").ctrl.model.value
            }
        }
        else passw.ctrl.model.value = "", conf.ctrl.model.value = "", passw.updateView(), conf.updateView();
        return res
    }, this.drawView = function() {
        jsPPPSettingsClientView.superclass.drawView.call(this), this.onmodeswitch()
    }, this.onmodeswitch = function() {
        return this.options.brief ? (this.getChild("auto").hide(), this.getChild("noAuth").hide(), this.getChild("advanced").hide(), this.getChild("desc").hide()) : (4 == this.ctrl.model.service.level && this.getChild("auto").show(), this.getChild("noAuth").show(), this.getChild("advanced").show(), this.getChild("desc").show()), !1
    }, jsPPPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), this.bind("modeswitch", this.onmodeswitch)
}

function jsPPPSettingsSummaryView(ctrl, viewInx, options) {
    jsPPPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.onfieldchange = function(obj) {
        jsPPPSettingsSummaryView.superclass.onfieldchange.call(this, obj);
        var alias = obj.view.ctrl.alias;
        switch (alias) {
            case "noAuth":
                obj.value ? (this.getChild("password").hide(), this.getChild("confirm").hide()) : (this.getChild("password").show(), this.getChild("confirm").show())
        }
    }, this.drawView = function() {
        var advanced = this.getChild("advanced");
        advanced.options.slider = !1, this.getChild("password").options.hide = !0, this.getChild("confirm").options.hide = !0, advanced.getChild("auth").options.hide = !0, advanced.getChild("onDemand").options.hide = !0, this.getChild("serviceName").options.hide = !0, this.getChild("auto").options.hide = !0, advanced.getChild("encrypt").options.hide = !0, advanced.getChild("mtu").options.hide = !0, advanced.getChild("pppIpExt").options.hide = !0, advanced.getChild("keepAlive").options.hide = !0, advanced.getChild("extraOptions").options.hide = !0, advanced.getChild("ip").options.hide = !0, advanced.getChild("pppStaticIp").options.hide = !0, advanced.getChild("pppDebug").options.hide = !0, advanced.getChild("serviceNamePPPoE").options.hide = !0, jsPPPSettingsSummaryView.superclass.drawView.call(this)
    }, this.updateView = function() {
        jsPPPSettingsSummaryView.superclass.updateView.call(this);
        var advanced = this.getChild("advanced"),
            service = this.ctrl.model.service,
            auto = this.getChild("auto");
        auto.ctrl.modified && auto.show();
        var encrypt = advanced.getChild("encrypt");
        encrypt.ctrl.modified && encrypt.show();
        var auth = advanced.getChild("auth");
        auth.ctrl.modified && auth.show();
        var onDemand = advanced.getChild("onDemand");
        (service.ondemand > 0 || onDemand.ctrl.modified) && onDemand.show();
        var mtu = advanced.getChild("mtu");
        mtu.ctrl.modified && mtu.show();
        var pppIpExt = advanced.getChild("pppIpExt");
        pppIpExt.ctrl.modified && pppIpExt.show();
        var keepAlive = advanced.getChild("keepAlive");
        (service.keep_alive && service.keep_alive.interval > 0 || keepAlive.ctrl.modified) && keepAlive.show();
        var extraOptions = advanced.getChild("extraOptions");
        extraOptions.ctrl.modified && extraOptions.show();
        var pppStaticIp = advanced.getChild("pppStaticIp");
        pppStaticIp.ctrl.modified && pppStaticIp.show();
        var pppDebug = advanced.getChild("pppDebug");
        pppDebug.ctrl.modified && pppDebug.show();
        var serviceNamePPPoE = advanced.getChild("serviceNamePPPoE");
        serviceNamePPPoE.ctrl.modified && serviceNamePPPoE.show()
    }, this.bind("fieldchange", this.onfieldchange), this.bind("modeswitch", function() {
        return !1
    })
}

function jsPreMasterModel(iftree) {
    jsPreMasterModel.superclass.constructor.call(this), this.iftree = iftree
}

function jsPreMasterController() {
    jsPreMasterController.superclass.constructor.call(this), this.changeModel(new jsPreMasterModel), this.ifaceTypes.client = {
        type: jsPreMasterClientView
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.server = {
        type: jsPreMasterServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.nextIface = "server", this.addIface(), this.ondataready = function() {
        var services, tunnels, iftree = this.model.iftree;
        for (var i in iftree)
            if (iftree[i].ifname = i, services = iftree[i].services)
                for (var j in services)
                    if (services[j].ifname = j, tunnels = services[j].tunnels)
                        for (var k in tunnels) tunnels[k].ifname = k;
        var mainTab = this.addChild(new jsConnsMainTabController(this.model.iftree, null, null, null, this.model.lanClients, null, this.model.routes, "cc:7b:35:b1:f5:6d"), "mainTab");
        return mainTab.model.lanClients = this.model.lanClients, mainTab.model.jsonIGMP = this.model.jsonIGMP, mainTab.model.deviceInfo = this.model.deviceInfo, !1
    }, this.onedit = function(obj) {
        return this.changeChild(this.getChild("mainTab").thisInx, new jsConnsMainTabController(this.model.iftree, obj.ifname, obj.srvname, obj.tnlname, this.model.lanClients, null, this.model.routes), "mainTab"), !1
    }, this.onmodeswitch = function(value) {
        return this.getChild("mainTab").event("modeswitch", value), !1
    }, this.addEventHandler("dataready", this.ondataready), this.addEventHandler("edit", this.onedit), this.addEventHandler("modeswitch", this.onmodeswitch)
}

function jsPreMasterClientView(ctrl, viewInx, options) {
    jsPreMasterClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.options.nothing = !0, this.ondataready = function() {
        return this.constructor(this.ctrl, this.viewInx, this.options ? this.options : {}), this.drawView(), !1
    }, this.drawView = function() {
        jsPreMasterClientView.superclass.drawView.call(this)
    }, this.bind("dataready", this.ondataready), this.bind("edit", this.ondataready)
}

function jsPreMasterServerView(ctrl, viewInx, options) {
    jsPreMasterServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        if ("update" == this.mode) {
            if (this.ctrl.model.iftree = {}, data && !data.baddata && data.rq) {
                data.rq[0] && data.rq[0].resident && data.rq[0].resident.iface_names && (this.ctrl.model.iftree = data.rq[0].resident.iface_names, this.ctrl.model.iftree || (this.ctrl.model.iftree = {}));
                var n = 1;
                data.rq[n] && data.rq[n].resident && (this.ctrl.model.lanClients = data.rq[n].resident), n++, data.rq[n] && data.rq[n].resident && data.rq[n].resident.route && (this.ctrl.model.routes = data.rq[n].resident.route), n++, data.rq[n] && data.rq[n].resident && (this.ctrl.model.jsonIGMP = data.rq[n].resident), n++, data.rq[n] && data.rq[n].resident && (this.ctrl.model.deviceInfo = data.rq[n].resident), n++
            }
            this.ctrl.model.iftree.wizard = !0, this.ctrl.event("dataready")
        }
        else if ("checkcable" == this.mode) {
            var isConnect;
            if (isConnect = !1, 20 == data.status && data.resident) {
                var port, obj, ifnode;
                for (var p in data.resident)
                    if (port = p, obj = data.resident[p], ifnode = this.ctrl.model.iftree[obj.iface], obj.is_wan || ifnode && ifnode.is_wan) break;
                isConnect = no(data.resident[port].status) ? data.resident[port] : data.resident[port].status
            }
            this.ctrl.getChild("mainTab").event("cableready", isConnect)
        }
        else delete this.ctrl.getChild("mainTab", "general").model.ifnode.needDelete, this.ctrl.getChild("mainTab").event("savecomplete")
    }, this.prepareData = function() {
        var obj, ctrl = this.ctrl,
            needDelete = [];
        switch (this.mode) {
            case "add":
            case "save":
                var general = ctrl.getChild("mainTab", "general"),
                    model = general.model,
                    contype = general.model.ifnode.contype;
                obj = {
                    v2: "y",
                    rq: 0
                };
                var res_pos;
                if (res_pos = "add" == this.mode ? -1 : 0, this.needDelete || model.ifnode.needDelete) {
                    if (obj.rq++, obj.res_config_id0 = 1, obj.res_config_action0 = 2, obj.res_json0 = "y", obj.res_data_type0 = "json", obj.res_struct_size0 = 1, model.ifnode.needDelete instanceof Array)
                        for (var i in model.ifnode.needDelete) needDelete.push(model.ifnode.needDelete[i]);
                    if (this.needDelete instanceof Array)
                        for (var i in this.needDelete) needDelete.push(this.needDelete[i]);
                    obj.res_buf0 = $.toJSON(needDelete)
                }
                if ("statpppoe" == contype || "dynpppoe" == contype) {
                    var blankConn1 = $.extend(!0, {}, model.blankConn),
                        ifnode1 = getObjectFirstChild(blankConn1),
                        service1 = getObjectFirstChild(ifnode1.services);
                    delete service1.tunnels;
                    var service2 = $.extend(!0, {}, getObjectFirstChild(model.service.tunnels)),
                        srvname2 = getObjectFirstKey(model.service.tunnels),
                        blankConn2 = $.extend(!0, {}, model.blankConn),
                        services = getObjectFirstChild(blankConn2).services = {};
                    services[srvname2] = service2;
                    var jsonOutStr = $.toJSON(blankConn1);
                    jsonOutStr = jsonOutStr.replace(/%/g, "%25"), jsonOutStr = jsonOutStr.replace(/#/g, "%23")
                }
                else {
                    var jsonOutStr = $.toJSON(model.blankConn);
                    jsonOutStr = jsonOutStr.replace(/%/g, "%25"), jsonOutStr = jsonOutStr.replace(/#/g, "%23")
                }
                if (obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 3, obj["res_json" + obj.rq] = "y", obj["res_struct_size" + obj.rq] = 1, obj["res_buf" + obj.rq] = jsonOutStr, obj["res_pos" + obj.rq] = res_pos, obj.rq++, is.object(blankConn2)) {
                    obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 3, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_pos" + obj.rq] = res_pos;
                    var res_buf = $.toJSON(blankConn2);
                    res_buf = res_buf.replace(/%/g, "%25"), res_buf = res_buf.replace(/#/g, "%23"), res_buf = res_buf.replace(/&/g, "%26"), obj["res_buf" + obj.rq] = res_buf, obj.rq++
                }
                if ("statpptp" == contype || "statl2tp" == contype || "statpppoe" == contype || "statpptpv6" == contype || "statl2tpv6" == contype) {
                    var newRoutes = ctrl.getChild("mainTab", "other", "routing").newRoutes,
                        j = obj.rq;
                    for (var i in newRoutes) newRoutes[i].ip && (obj["res_config_id" + j] = 17, obj["res_config_action" + j] = 3, obj["res_json" + j] = "y", obj["res_data_type" + j] = "json", obj["res_struct_size" + j] = 1, obj["res_buf" + j] = $.toJSON(newRoutes[i]), j++);
                    obj.rq = j
                }
                this.needDelete = [], this.ctrl.getChild("mainTab").model.enIGMPGlobal && (obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_config_action" + obj.rq] = 3, obj["res_config_id" + obj.rq] = 68, obj["res_struct_size" + obj.rq] = 0, obj["res_buf" + obj.rq] = $.toJSON({
                    enable: !0,
                    version: 2
                }), obj.rq++), this.addToRequest(obj);
                break;
            case "update":
                obj = {
                    v2: "y",
                    rq: 1,
                    res_json0: "y",
                    res_config_action0: 1,
                    res_config_id0: 1,
                    res_struct_size0: 36
                };
                var n = 1;
                obj.rq = n + 1, obj["res_json" + n] = "y", obj["res_config_action" + n] = 1, obj["res_config_id" + n] = 187, obj["res_struct_size" + n] = 0, n++, obj.rq = n + 1, obj["res_json" + n] = "y", obj["res_config_action" + n] = 1, obj["res_config_id" + n] = 17, obj["res_struct_size" + n] = 0, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 68, obj["res_struct_size" + obj.rq] = 0, obj.rq++, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 67, obj["res_struct_size" + obj.rq] = 0, obj.rq++, this.addToRequest(obj);
                break;
            case "delete":
                obj = {
                    v2: "y",
                    rq: "y",
                    res_config_id: 1,
                    res_config_action: 2,
                    res_json: "y",
                    res_struct_size: 36,
                    res_delex: "y",
                    res_data_type: "json"
                }, jsonOutObj = [];
                var general = ctrl.getChild("mainTab", "general");
                general.model.tnlname ? jsonOutObj.push(general.model.tnlname) : general.model.srvname && jsonOutObj.push(general.model.srvname), obj.res_buf = $.toJSON(jsonOutObj), this.addToRequest(obj);
                break;
            case "checkcable":
                obj = {
                    v2: "y",
                    rq: "y",
                    res_json: "y",
                    res_config_action: 1,
                    res_config_id: 129,
                    res_struct_size: 1
                }, this.addToRequest(obj)
        }
    }, this.onupdaterq = function() {
        this.mode = "update", this.updateView()
    }, this.onsaverq = function() {
        this.mode = "save", this.updateView()
    }, this.onaddrq = function() {
        this.mode = "add", this.updateView()
    }, this.oncheckcable = function() {
        this.mode = "checkcable", this.updateView()
    }, this.ondeleterq = function() {
        this.mode = "delete", this.updateView()
    }, this.onsettodelete = function(ifname) {
        return this.needDelete.push(ifname), !1
    }, this.mode = "update", this.bind("updaterq", this.onupdaterq), this.bind("saverq", this.onsaverq), this.bind("addrq", this.onaddrq), this.bind("deleterq", this.ondeleterq), this.bind("checkcable", this.oncheckcable), this.bind("settodelete", this.onsettodelete)
}

function jsInetFirstStepController(iftree) {
    jsInetFirstStepController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsInetFirstStepClientView
    }, this.ifaceTypes.client.options = {}, this.iftree = iftree
}

function jsInetFirstStepClientView(ctrl, viewInx, options) {
    jsInetFirstStepClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.getwans = function() {
        var iface, port, wans = [],
            iftree = this.ctrl.iftree;
        for (var i in iftree) iface = iftree[i], iface.is_wan && ("atm" == iface.type ? port = lng("onpvc") + " " + iface.pvc_settings.vpi + "/" + iface.pvc_settings.vci : "ethernet" == iface.type || "ptm" == iface.type || "3g" == iface.type || "lte" == iface.type || "bridge" == iface.type ? port = iface.port ? lng("onport") + " " + iface.port : lng("oniface") + " " + iface.port : "auto" == iface.type && (port = lng("wanAuto")), this.addServices(wans, iface, "services", port));
        return wans
    }, this.addServices = function(wans, iface, srvsname, port) {
        var service, tunnel, services = iface[srvsname];
        if (services)
            for (var j in services)
                if (service = services[j], service.tunnels && getObjectLength(service.tunnels))
                    for (var k in service.tunnels) tunnel = service.tunnels[k], wans.push({
                        ifname: iface.ifname,
                        srvname: service.ifname,
                        tnlname: k,
                        name: tunnel.name ? tunnel.name : tunnel.ifname,
                        type: getConnType(iface, service, tunnel),
                        port: port,
                        srvsname: srvsname
                    });
                else wans.push({
                    ifname: iface.ifname,
                    srvname: j,
                    name: service.name ? service.name : service.ifname,
                    type: getConnType(iface, service),
                    port: port,
                    srvsname: srvsname
                })
    }, this.drawView = function() {
        jsInetFirstStepClientView.superclass.drawView.call(this);
        var obj, id, wans = this.getwans(),
            htmlToDraw = lng("inetwizphrase1") + "<br>";
        if (wans.length) {
            htmlToDraw += lng("inetwizphrase2"), htmlToDraw += "<ul>";
            for (var i in wans) htmlToDraw += "<li>", obj = wans[i], id = obj.ifname + "_" + obj.srvname, obj.tnlname && (id += "_" + obj.tnlname), id = id.replace(/\./g, "_"), id = id.replace(/,/g, "_"), obj.id = id, htmlToDraw += "<a href='#' id='" + id + "'>" + obj.name + " (" + connTypeValSet[obj.type] + " " + obj.port + ")</a>", htmlToDraw += "</li>";
            htmlToDraw += "</ul>", htmlToDraw += lng("inetwizphrase3") + " <a href='#' id='addnew'>" + lng("inetwizphrase4") + "</a>."
        }
        else htmlToDraw += lng("inetwizphrase8") + " <a href='#' id='addnew'>" + lng("inetwizphrase9") + "</a> " + lng("inetwizphrase10");
        htmlToDraw += "<br><br>" + lng("inetwizphrase5") + " <a href='/index.cgi'>" + lng("inetwizphrase6") + "</a> " + lng("inetwizphrase7"), $(this.viewBoxSel).html(htmlToDraw);
        var id;
        for (var i in wans) obj = wans[i], $("#" + obj.id).bind("click", {
            ifname: obj.ifname,
            srvname: obj.srvname,
            tnlname: obj.tnlname,
            srvsname: obj.srvsname
        }, context(this).callback(this.oneditjq));
        $("#addnew").bind("click", {}, context(this).callback(this.oneditjq))
    }, this.oneditjq = function(event) {
        return this.ctrl.event("edit", event.data, !0), !1
    }
}

function pageRedirect() {
    pageRedirect.superclass.constructor.call(this), this.redirect = null, this.add(new nodeCheckBox("redirectEnable", !1), "enable").add(new nodeCaption("redirectCauses"), "causes").add(new nodeCheckBox("redirectModCable", !1), "cable").add(new nodeCheckBox("redirectModFactory", !1), "factory").add(new nodeCheckBox("redirectModConnections", !1), "connections").add(new nodeCheckBox("redirectModFlashing", !1), "flashing").add(new nodeCheckBox("redirectConfiguring", !1), "configuring"), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                value ? (this.get("cable").enable(), this.get("factory").enable(), this.get("connections").enable(), this.get("flashing").enable(), this.get("configuring").enable()) : (this.get("cable").disable(), this.get("factory").disable(), this.get("connections").disable(), this.get("flashing").disable(), this.get("configuring").disable())
        }
    }), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        pageRedirect.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            this.deep.updateModel() && this.save()
        })), "back" == phase && (this.child("enable").val(this.redirect), this.child("enable").fieldchange())
    }, this.save = function() {
        var modules = is.set(this.redirect.modules) ? this.redirect.modules : {};
        this.redirect.enable = this.child("enable").val(), is.set(modules.cable) && (modules.cable.enable = this.child("cable").val()), is.set(modules.factory) && (modules.factory.enable = this.child("factory").val()), is.set(modules.connections) && (modules.connections.enable = this.child("connections").val()), is.set(modules.flashing) && (modules.flashing.enable = this.child("flashing").val()), is.set(modules.configuring) && (modules.configuring.enable = this.child("configuring").val()), rootView.showModalOverlay(), device.config.write(162, this.redirect, callback(this, function() {
            this.emit("updaterq"), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(162, callback(this, function(data) {
            var redirect = this.redirect = is.RPC_SUCCESS(data) ? data.resident : null;
            if (redirect) {
                var modules = is.set(redirect.modules) ? redirect.modules : {};
                is.set(modules.cable) ? this.child("cable").val(modules.cable.enable) : this.child("cable").hide(), is.set(modules.factory) ? this.child("factory").val(modules.factory.enable) : this.child("factory").hide(), is.set(modules.connections) ? this.child("connections").val(modules.connections.enable) : this.child("connections").hide(), is.set(modules.flashing) ? this.child("flashing").val(modules.flashing.enable) : this.child("flashing").hide(), is.set(modules.configuring) ? this.child("configuring").val(modules.configuring.enable) : this.child("configuring").hide()
            }
            _.size(modules) ? this.child("causes").show() : this.child("causes").hide(), this.deep.updateView(), rootView.hideModalOverlay()
        }))
    })
}

function gridRemoteAccess(isSelectable, isClickable) {
    gridRemoteAccess.superclass.constructor.call(this), this.protoNames = {
        80: "HTTP"
    }, this.rules = null, this.$grid = null;
    var empty = "-";
    this.updateView = function(phase) {
        if (gridRemoteAccess.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var header = [];
            header.push([{
                index: "ips",
                name: "ip_address"
            }, {
                index: "source_mask",
                name: "masq"
            }, {
                index: "sport",
                name: "rmtAccessPortS"
            }, {
                index: "dport",
                name: "protocol"
            }]), this.$grid = this.$box.lightUIGrid(header, 0, {
                clickable: isClickable && !disableFlag(16) ? !0 : !1,
                selectable: isSelectable && !disableFlag(16) ? !0 : !1
            }), this.rules = !0;
            for (var i in this.rules) rule = this.rules[i], hideFlag("remote_access.hidden_rules") && rule.hide || ($row = this.$grid.addRow().row("last"), $row.data("hide", rule.hide ? !0 : !1), $row.data("index", i), $row.col("ips").html(rule.ips.toString()).data("ips", rule.ips.toString()).data("ipv6", rule.ipv6 ? !0 : !1), $row.col("source_mask").html(rule.ipv6 ? empty : rule.source_mask.toString()).data("source_mask", rule.ipv6 ? "" : rule.source_mask.toString()), $row.col("sport").html(rule.ipv6 ? empty : rule.sport.toString()).data("sport", rule.ipv6 ? "" : rule.sport.toString()), $row.col("dport").html(this.protoNames[rule.dport.toString()]).data("dport", rule.dport.toString()));
            isSelectable && !disableFlag(16) && this.$grid.bind("selection.grid", callback(this, function() {
                this.parent.updateRuleButtons()
            })), isClickable && !disableFlag(16) && this.$grid.bind("rowclick.grid", context(this).callback(function(event, $row) {
                var rule = {
                    ips: $row.col("ips").data("ips"),
                    ipv6: $row.col("ips").data("ipv6"),
                    source_mask: $row.col("source_mask").data("source_mask"),
                    sport: $row.col("sport").data("sport"),
                    dport: $row.col("dport").data("dport"),
                    hide: $row.data("hide")
                };
                this.parent.edit(rule, parseInt($row.data("index")))
            }))
        }
    }, this.bind("updaterq", function() {
        this.deep.updateView()
    }), this.updateSrc = function(rules) {
        this.rules = rules
    }
}

function pageRemoteAccess() {
    pageRemoteAccess.superclass.constructor.call(this), this.grid = new gridRemoteAccess(!0, !0), this.portsWarning = new nodeCaption(""), this.comment_ports = null, this.updateView = function(phase) {
        if (pageRemoteAccess.superclass.updateView.apply(this, arguments), "forward" == phase) {
            this.add(this.grid), this.use_ports_vs[0] && (this.portsWarning.comment = this.comment_ports, this.add(this.portsWarning));
            var json = this.json;
            this.updateRuleButtons = function() {
                this.grid.$grid.selection().not(":hidden").length ? this.getButton("button_del").enable() : this.getButton("button_del").disable()
            }, this.cleanButtonBar().addButton("add").getButton("add").bind("click.button", context(this).callback(function() {
                this.edit()
            })), this.addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function(json) {
                this.clearFilter(json, this.grid.$grid)
            }, json)), disableFlag(16) && (this.getButton("add").children("div").addClass("disable"), this.getButton("button_del").children("div").addClass("disable"))
        }
    }, this.clearFilter = function(ruleall, grid) {
        for (var rmlist = new Array, i = grid.nrow(); i >= 0; i--)
            if (grid.row(i).hasClass("selected")) {
                var index = grid.row(i).data("index");
                rmlist.push([16, ruleall[index], parseInt(index)])
            }
        rmlist.length && (rootView.showModalOverlay(), device.config.remove(rmlist, callback(this, function() {
            this.emit("updaterq")
        })))
    }, this.edit = function(rule, pos) {
        is.unset(pos) && (pos = -1), this.$box.unbind();
        var ruleNode = new ruleRemoteAccess(this.json, this.grid.protoNames, this.use_ports_vs, this.comment_ports, rule, pos);
        ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), is.object(rule) && (ruleNode.addButton("button_del").getButton("button_del").bind("click.button", context(this).callback(function() {
            rootView.showModalOverlay(), device.config.remove(16, rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            }))
        })), disableFlag(16) && ruleNode.getButton("button_del").children("div").addClass("disable")), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            ruleNode.deep.updateModel(), ruleNode.status.error || (rootView.showModalOverlay(), device.config.write(16, ruleNode.rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            })))
        })), disableFlag(16) && ruleNode.getButton("button_save").children("div").addClass("disable")
    }, this.onupdaterq = function() {
        rootView.showModalOverlay(), device.config.read([16, 10, 152], context(this).callback(function(data) {
            if (rootView.hideModalOverlay(), this.json = is.RPC_SUCCESS(data.rq) ? data.rq.resident.httpaccess : null, this.use_ports_vs = [], is.RPC_SUCCESS(data.rq)) {
                var vservers = data.rq[1].resident.vserver;
                for (var i in vservers) "udp" != vservers[i].proto && (vservers[i].ports_end ? this.use_ports_vs = _.union(this.use_ports_vs, _.range(parseInt(vservers[i].ports_begin), parseInt(vservers[i].ports_end) + 1)) : this.use_ports_vs.push(parseInt(vservers[i].ports_begin)))
            }
            if (is.RPC_SUCCESS(data.rq) && data.rq.resident && data.rq.resident.telnet && data.rq.resident.telnet.port) {
                var iProtoNames = _.invert(this.grid.protoNames);
                iProtoNames && iProtoNames.TELNET && (iProtoNames.TELNET = data.rq[2].resident.telnet.port, this.grid.protoNames = _.invert(iProtoNames))
            }
            if (this.comment_ports = "", this.use_ports_vs[0]) {
                for (var i in this.use_ports_vs) this.comment_ports = this.comment_ports ? this.comment_ports + ", " + this.use_ports_vs[i].toString() : this.use_ports_vs[i].toString();
                this.comment_ports = "<i>" + lng(this.comment_ports.split(",")[1] ? "CommentRmtAccess1" : "CommentRmtAccess3") + " <b>" + this.comment_ports + " </b>" + lng(this.comment_ports.split(",")[1] ? "CommentRmtAccess2" : "CommentRmtAccess4") + "</i>"
            }
            this.grid.updateSrc(this.json), this.deep.updateView()
        }))
    }, this.bind("updaterq", this.onupdaterq)
}

function ruleRemoteAccess(rules, protoNames, use_ports_vs, comment_ports, rule, pos) {
    ruleRemoteAccess.superclass.constructor.call(this), is.unset(rule) && (this.isadding = !0, rule = {});
    var ipv6 = rule.ipv6,
        previous_ip = rule.ips ? rule.ips : "",
        sport = rule.sport ? rule.sport : "";
    this.checkIPVersion = function(address) {
        var version = !1;
        if (address) {
            version = 6;
            var groups = address.split("."),
                isinrange = !0;
            for (var i in groups)
                if ("" === groups[i] || groups[i] < 0 || groups[i] > 255) {
                    isinrange = !1;
                    break
                }
            4 == groups.length && isinrange && (version = 4)
        }
        return version
    }, this.updateView = function(phase) {
        if (ruleRemoteAccess.superclass.updateView.apply(this, arguments), "back" == phase) {
            var dport = this.child("dport");
            dport.cleanOptions();
            for (var i in protoNames) dport.addOption(protoNames[i], i)
        }
    }, this.updateModel = function(status) {
        try {
            if (!status.error) {
                for (var i in use_ports_vs)
                    if (this.child("sport").val() == use_ports_vs[i]) throw new Error(lng("port") + " " + this.child("sport").val() + " " + lng("portUsedInVS"));
                this.rule = {
                    ips: this.child("ips").val(),
                    ipv6: ipv6,
                    source_mask: this.child("source_mask").val(),
                    sport: this.child("sport").val(),
                    dport: this.child("dport").val()
                }, this.rule.hide = rule.hide ? !0 : !1;
                for (var i in rules)
                    if (pos != i && this.rule.ips == rules[i].ips && this.rule.source_mask == rules[i].source_mask && this.rule.sport == rules[i].sport && this.rule.dport == rules[i].dport) throw new Error(lng("rmtAccessRExist"))
            }
        }
        catch (e) {
            status.error = !0, status.nodes.push(this), alert(lng(e.message))
        }
        this.status = status
    }, this.onfieldchange = function(status, value) {
        switch (status.target.getAlias()) {
            case "ips":
                if (value != previous_ip)
                    if (previous_ip = value.split("/")[0], sport = this.child("sport").val(), 6 == this.checkIPVersion(previous_ip)) ipv6 = !0, this.child("source_mask").val(""), this.child("source_mask").disable(), this.child("source_mask").hide(), this.child("sport").val(""), this.child("sport").disable(), this.child("sport").hide(), this.child("ips").setComment("remAccIPV6Comment");
                    else {
                        this.child("ips").cleanComment("remAccIPV6Comment"), ipv6 = !1, this.child("source_mask").enable(), this.child("source_mask").show();
                        var source_mask = "",
                            mask = value.split("/")[1];
                        if (mask)
                            for (var group = "", i = 0; 32 > i; i++) group = group.concat(mask > i ? "1" : "0"), 8 == group.length && (source_mask && (source_mask = source_mask.concat(".")), source_mask = source_mask.concat(parseInt(group, 2)), group = "");
                        else {
                            for (var classes = parseInt(value.split(".")[0]).toString(2), i = classes.length; 8 > i; i++) classes = "0" + classes;
                            "0" == classes.substring(0, 1) ? source_mask = "255.0.0.0" : "0" == classes.substring(1, 2) ? source_mask = "255.255.0.0" : "0" == classes.substring(2, 3) && (source_mask = "255.255.255.0"), "0.0.0.0" == this.child("ips").val() && (source_mask = "0.0.0.0")
                        }
                        this.child("source_mask").val(source_mask), this.child("ips").val(previous_ip), this.child("sport").enable(), this.child("sport").val(sport), this.child("sport").show()
                    }
                break;
            case "enableAll":
                value ? (this.child("ips").val("0.0.0.0"), this.child("source_mask").val("0.0.0.0"), this.child("source_mask").show(), this.child("ips").disable(), this.child("source_mask").disable()) : (this.child("ips").enable(), this.child("ips").val(""), this.child("source_mask").val(""), ipv6 || this.child("source_mask").enable());
                break;
            case "dport":
        }
    }, this.bind("fieldchange", this.onfieldchange), this.add(new nodeCheckBox("rmtAccessEnableAll", "0.0.0.0" == rule.ips && "0.0.0.0" == rule.source_mask || "::" == rule.ips ? !0 : !1), "enableAll").add(new nodeip("ip_address", rule.ips, {
        mandatory: !0,
        version: 4
    }), "ips").add(new nodeip("masq", rule.source_mask, {
        mandatory: !0,
        version: 4,
        disabled: rule.ipv6 || this.child("enableAll").val(),
        hidden: rule.ipv6
    }), "source_mask").add(new nodeportold("rmtAccessPortS", rule.sport, {
        mandatory: !0,
        hidden: rule.ipv6
    }), "sport").add(new nodeSelect("protocol", rule.dport ? rule.dport : "80"), "dport"), this.child("enableAll").val() ? this.child("ips").disable() : this.child("ips").enable(), rule.ipv6 ? (this.child("source_mask").disable(), this.child("sport").disable()) : (this.child("enableAll").val() && "0.0.0.0" == rule.ips && this.child("source_mask").disable(), this.child("sport").enable()), comment_ports && this.add(new nodeCaption("", comment_ports))
}

function pageDNS() {
    function sortIfacesByVersion(ifacelist) {
        function isIpv4(type) {
            var onlyIpv6Types = ["ipv6", "pppv6"];
            return !_.contains(onlyIpv6Types, type)
        }

        function isIpv6(type) {
            var ipv6Types = ["ipv6", "pppv6", "pppdual"];
            return _.contains(ipv6Types, type)
        }
        var v4 = {},
            v6 = {};
        return _.each(ifacelist, function(connection, name) {
            isIpv4(connection.type) && (v4[name] = connection), isIpv6(connection.type) && (v6[name] = connection)
        }), {
            v4: v4,
            v6: v6
        }
    }

    function findIfacesByParam(ifacelist, params) {
        return _.find(ifacelist, function(iface) {
            return _.every(params, function(value, name) {
                return iface[name] == value
            })
        })
    }

    function findContag(ifaces, ifname) {
        if (_.isEmpty(ifaces)) return null;
        var iface = _.find(ifaces, function(elem) {
            return elem.iface == ifname
        });
        return iface ? iface.contag : ifaces[_.keys(ifaces)[0]].contag
    }
    pageDNS.superclass.constructor.call(this), this.ifacelist = null, this.dns = null, this.add(new nodeCaption("dnsLabel")), this.add(new nodeCheckBox("manual", modeAP() ? !0 : !1, {}), "manual"), this.add(new nodeCheckBox("dnsDefRoute", !0, {}), "defroute"), this.add(new nodeSelect("iface", "", {
        disabled: !0
    }), "iface"), this.add(new nodeTextArea("dnsServers", "", {
        rows: 5,
        disabled: !0,
        mandatory: !0,
        re: [callback(this, function(value) {
            for (var err = null, list = new Array, errlist = new Array, tmplist = value.replace(/(,|;|\ )/g, "\n").split("\n"), i = 0; i < tmplist.length; i++) {
                var addr = $.trim(tmplist[i]);
                if ("" != addr) {
                    var valid = this.v6 ? is.IPv6(addr) : is.IPv4(addr);
                    valid ? list.push(addr) : (err = !0, errlist.push(addr))
                }
            }
            return err ? err = lng("dnsAddressWrong") + " " + errlist.join(", ") : this.child("servers").val(list.join("\n")), err
        })]
    }), "servers"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageDNS.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel();
                var version = this.v6 ? "v6" : "v4",
                    manual = this.child("manual").val(),
                    servers = this.convertIP(this.child("servers").val().split("\n"), !0).split("\n"),
                    contag = this.child("iface").val(),
                    ifaceInfo = findIfacesByParam(this.ifaceVersionList[version], {
                        contag: contag
                    }),
                    iface = ifaceInfo && ifaceInfo.iface ? ifaceInfo.iface : "",
                    defroute = this.child("defroute").val();
                this.status.error || this.save(manual, servers, iface, defroute, parseInt(contag))
            })), "back" == phase && this.dns) {
            this.child("servers").val(this.dns.servers ? this.convertIP(this.dns.servers.replace(/\|/g, "\n").split("\n")) : this.v6 ? "2001:4860:4860::8888" : "8.8.8.8"), modeAP() ? (this.child("manual").val(!0).fieldchange(), this.child("manual").hide(), this.child("defroute").hide(), this.child("iface").hide()) : (this.child("manual").val(this.dns.manual || !1).fieldchange(), this.child("defroute").val(this.dns.defroute || !1).fieldchange(), this.dns.ifname && "" != this.dns.ifname && this.child("iface").val(this.dns.ifname));
            var iface = this.child("iface").cleanOptions(),
                version = this.v6 ? "v6" : "v4",
                currentIfaceList = this.ifaceVersionList[version];
            if (_.each(currentIfaceList, function(connection, name) {
                    iface.addOption(name, connection.contag)
                }), this.dns.defroute) {
                var findParams = this.v6 ? {
                        gwifv6: !0
                    } : {
                        gwif: !0
                    },
                    gwifIface = findIfacesByParam(currentIfaceList, findParams);
                if (gwifIface) var contag = gwifIface.contag
            }
            else var contag = this.dns.contag;
            contag = contag ? contag : findContag(currentIfaceList, this.dns.ifname), iface.val(contag)
        }
        return !1
    }, this.onupdmodel = function() {
        return this.updateView(), !1
    }, this.save = function(manual, servers, ifname, defroute, contag) {
        rootView.showModalOverlay(), this.dns = {
            manual: manual,
            servers: manual ? servers.join("|") : this.dns.servers,
            defroute: defroute,
            ifname: defroute ? this.dns.ifname : ifname,
            contag: defroute ? this.dns.contag : contag
        }, device.config.write(this.v6 ? 132 : 7, this.dns, callback(this, function() {
            rootView.hideModalOverlay(), this.emit("updaterq")
        }))
    }, this.convertIP = function(rows, noMappedIPv4) {
        if (this.v6) {
            var temp = new Array;
            for (var i in rows) rows[i].match(/^\n*$/) || temp.push(new jsSubNetIPModel(128, rows[i], 16, ":", !1, !0).toString(noMappedIPv4));
            rows = temp
        }
        return rows.join("\n")
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([120, this.v6 ? 132 : 7], callback(this, function(data) {
            this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {};
            var ifaceList = CreateIfacesValset(this.ifacelist, !0, !1, null, !0, !0);
            this.ifaceVersionList = sortIfacesByVersion(ifaceList), is.RPC_SUCCESS(data.rq) && (this.dns = data.rq.resident.dns ? data.rq.resident.dns : data.rq.resident), this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "typeproto":
                break;
            case "manual":
                var defroute = this.child("defroute"),
                    iface = this.child("iface"),
                    servers = this.child("servers");
                value ? (defroute.disable(), iface.disable(), servers.enable()) : (servers.disable(), iface.enable(), defroute.enable().fieldchange());
                break;
            case "defroute":
                var iface = this.child("iface"),
                    manual = this.child("manual");
                if (value || manual.val() ? iface.disable() : iface.enable(), value) {
                    var version = this.v6 ? "v6" : "v4",
                        currentIfaceList = this.ifaceVersionList[version],
                        findParams = this.v6 ? {
                            gwifv6: !0
                        } : {
                            gwif: !0
                        },
                        gwifIface = findIfacesByParam(currentIfaceList, findParams);
                    gwifIface && iface.val(gwifIface.contag)
                }
        }
    })
}

function pageRouting(v6) {
    pageRouting.superclass.constructor.call(this), this.route = null, this.ifacelist = null, this.$grid = null, this.routetable = null, this.rqId = -1, this.refreshTime = 1e4, this.refreshId = null, this.add(new nodeCaption("routingLabel", v6 ? "routingDescTextv6" : "routingDescText")).add(new node, "grid_route").add(new nodeComment("")).add(new nodeCaption("menu_statRoute")).add(new routeStateTable(this.routetable, v6), "state_rout"), this.updateModel = function(status) {
        var showError = !1;
        status.error |= !this.$grid.cleanErrors().checkMandatory(!0);
        for (var k = 0; k < this.$grid.nrow(); k++) {
            for (var krow = this.$grid.row(k), j = 0; j < this.$grid.nrow(); j++)
                if (j != k) {
                    var jrow = this.$grid.row(j);
                    if (!jrow.selected() && !krow.selected() && jrow.col("net_dest").fieldval().split("/")[0] == krow.col("net_dest").fieldval().split("/")[0] && jrow.col("net_dest_mask").fieldval() == krow.col("net_dest_mask").fieldval()) {
                        showError = !0;
                        break
                    }
                }
                "auto" == krow.col("iface").fieldval() && "" == krow.col("gateway").fieldval() ? (krow.col("gateway").addClass("error"), status.error |= !0) : krow.col("gateway").removeClass("error")
        }
        showError && (status.error |= !0, alert(lng("routingAlreadyExistsSave"))), this.status = status
    }, this.getIfaceName = function(ifname) {
        var ifaces = this.ifacelist ? this.ifacelist : {};
        for (var i in ifaces)
            if (ifaces[i] && ifaces[i].iface == ifname) return ifaces[i].name;
        return null
    }, this.isLanSubnet = function(ipv4obj) {
        return _.some(this.lanSubnets, function(lan) {
            return _.isEqual(lan.subnet(), ipv4obj.subnet())
        })
    }, this.updateView = function(phase) {
        pageRouting.superclass.updateView.apply(this, arguments);
        try {
            if ("back" == phase) {
                for (var isIPv6, route = this.route = [], r = this.routeAll, i = 0; i < r.length; i++) isIPv6 = r[i].ip.match(/:/), r[i].pos = i, (v6 && isIPv6 || !v6 && !isIPv6) && route.push(r[i]);
                var header = [];
                v6 ? header.push({
                    index: "net_dest",
                    name: "routingNetDestv6"
                }) : (header.push({
                    index: "net_dest",
                    name: "routingNetDest"
                }), header.push({
                    index: "net_dest_mask",
                    name: "routingNetDestMask"
                })), header.push({
                    index: "gateway",
                    name: "routingGateway"
                }), header.push({
                    index: "metric",
                    name: "metric"
                }), header.push({
                    index: "iface",
                    name: "routingViaIface"
                }), header.push({
                    index: "notavail",
                    name: "routingAvail"
                }), this.cleanButtonBar().child("grid_route").$box.empty(), this.$grid = this.child("grid_route").$box.html("					<div class='grid rm'></div>					<div class='buttonsInline'>						<div class='button add'></div>					</div>				").find(".grid").lightUIGrid(header, 0, {
                    selectable: !0
                }), this.$grid.bind("startEditing.grid", callback(this, function(event, $cell) {
                    var alias = $cell.getColAlias();
                    v6 || "net_dest" == alias && ($cell._oldfieldval = $cell.fieldval())
                })), this.$grid.bind("stopEditing.grid", callback(this, function(event, $cell) {
                    this.$grid.cleanErrors();
                    var row = this.$grid.row($cell.irow()),
                        alias = $cell.getColAlias();
                    if (!v6) {
                        if ("net_dest" == alias && "" != $cell.fieldval()) {
                            var __ipv4 = new IPv4($cell.fieldval());
                            if (this.isLanSubnet(__ipv4)) alert(lng("subnetUseInLan")), $cell.fieldval($cell._oldfieldval);
                            else {
                                $cell.fieldval(new IPv4(__ipv4, 32).network().toString());
                                var __mask = __ipv4.netmask(!0).toString();
                                row.col("net_dest_mask").fieldval("0.0.0.0" == __mask ? "255.255.255.255" : __mask)
                            }
                        }
                        if ("net_dest_mask" == alias && "" != $cell.fieldval() && "" != row.col("net_dest").fieldval())
                            if (validSubnetMask(row.col("net_dest_mask").fieldval())) {
                                var __ipv4 = new IPv4(row.col("net_dest").fieldval()),
                                    __mask = new IPv4(row.col("net_dest_mask").fieldval()),
                                    mask = $cell.fieldval(),
                                    netip = row.col("net_dest").fieldval();
                                validNetIpMask(netip, mask) || (confirm(lng("maskNotConform") + "." + lng("edit_or_esc")) ? row.col("net_dest_mask").click() : row.col("net_dest_mask").fieldval(__ipv4.netmask(!0).toString()))
                            }
                            else alert(lng("subnetMaskIncorrect")), row.col("net_dest_mask").click()
                    }
                    if (!v6)
                        for (var j = 0; j < this.$grid.nrow(); j++)
                            if (j != $cell.irow()) {
                                var jrow = this.$grid.row(j);
                                if (jrow.col("net_dest").fieldval().split("/")[0] == row.col("net_dest").fieldval().split("/")[0] && jrow.col("net_dest_mask").fieldval() == row.col("net_dest_mask").fieldval()) {
                                    alert(lng("routingAlreadyExists"));
                                    break
                                }
                            }
                })), v6 ? this.$grid.colEditable("net_dest", "ipv6", {
                    mandatory: !0
                }).colEditable("gateway", "ipv6", {
                    mandatory: !1
                }) : this.$grid.colEditable("gateway", "ipv4", {
                    mandatory: !1
                }).colEditable("net_dest", "ipv4", {
                    mandatory: !0
                }).colEditable("net_dest_mask", "ipv4", {
                    mandatory: !0
                }), this.$grid.colEditable("metric", "number");
                var iface_options_list = {};
                iface_options_list = this.ifacelist, this.$grid.colEditable("iface", "select", {
                    options: CreateIfacesValset(iface_options_list, !0, !0)
                }), this.get("grid_route").addButton("add").getButton("add").bind("click.button", callback(this, function() {
                    this.$grid.find("thead tr td.selectable input").attr("checked", !1), this.$grid.addRow().row("last").col("net_dest").trigger("click")
                })), this.get("grid_route").addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function() {
                    this.$grid.find("thead tr td.selectable input").attr("checked", !1), this.$grid.selection().hide(), this.updateRuleButtons()
                }));
                for (var i = 0; this.route && i < this.route.length; i++) {
                    var route = this.route[i],
                        $row = this.$grid.addRow().row("last"),
                        led = route.notavail ? "ledred.gif" : "ledgreen.gif";
                    v6 ? $row.col("net_dest").fieldval(route.ip.match(/:/) ? route.ip : route.ip + "/" + calcBitsByMask(route.netmask)) : ($row.col("net_dest").fieldval(route.ip), $row.col("net_dest_mask").fieldval(route.netmask)), $row.col("gateway").fieldval(route.gw), $row.col("metric").fieldval(route.met), $row.col("iface").fieldval(route.iface), $row.col("notavail").fieldval("<img src='image/" + led + "' width='6' height='6' alt='' />"), $row.data("pos", route.pos)
                }
                this.$grid.resetAll(), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                    this.deep.updateModel(), this.status.error || (this.save(gridActionConverter(this.$grid)), this.$grid.selection().removeRow())
                })), this.$grid.bind("selection.grid", callback(this, function() {
                    this.updateRuleButtons()
                })), this.updateRuleButtons = function() {
                    this.$grid.selection().not(":hidden").length ? this.get("grid_route").getButton("button_del").enable() : this.get("grid_route").getButton("button_del").disable()
                }, disableFlag(17) && (this.getButton("button_save").disable(), this.get("grid_route").getButton("add").disable(), this.get("grid_route").getButton("button_del").disable())
            }
        }
        catch (e) {
            this.$box.errorBlock(lng("error"), e.message, null, lng("refresh"), callback(this, function() {
                this.emit("updaterq")
            }))
        }
    }, this.save = function(actions) {
        if (actions.count) {
            rootView.showModalOverlay();
            var query = {
                    remove: [],
                    write: []
                },
                nrow = this.$grid.nrow(),
                deletePos = [];
            if (actions.deleted.length) {
                for (var index = nrow - 1; index >= 0; index--)
                    if (_.indexOf(actions.deleted, index) + 1) {
                        var row = this.$grid.row(index),
                            pos = row.data("pos");
                        deletePos.push(pos), query.remove.push([17, this.route[pos], pos])
                    }
                deletePos = deletePos.sort()
            }
            for (var json, metric, temp = actions.changed.concat(actions.added), i = (actions.r_changed.concat(actions.r_added), 0); i < temp.length; i++) {
                var $row = this.$grid.row(temp[i]),
                    json = {
                        ip: $row.col("net_dest").fieldval(),
                        gw: $row.col("gateway").fieldval(),
                        iface: $row.col("iface").fieldval()
                    };
                v6 || (json.netmask = $row.col("net_dest_mask").fieldval());
                var metric = $row.col("metric").fieldval();
                metric && (json.met = parseInt(metric));
                var pos = $row.isNew() ? -1 : $row.data("pos");
                if (-1 != pos && deletePos.length) {
                    var start_pos = _.clone(pos);
                    _.each(deletePos, function(index) {
                        start_pos > index && pos--
                    })
                }
                query.write.push([17, json, pos])
            }
            device.config.multi(query, callback(this, function() {
                this.update()
            }))
        }
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read([120, 17, 33], callback(this, function(data) {
            this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.routeAll = is.RPC_SUCCESS(data.rq) ? data.rq.resident.route : null, this.routetable = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.child("state_rout").routetable = this.routetable, this.lanSubnets = _.map(data.rpcWAN, function(lan) {
                return new IPv4(lan.ip)
            }), this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.updateStateTable = function() {
        this.rqId = device.config.read([33], callback(this, function(data) {
            this.routetable = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.child("state_rout").routetable = this.routetable, this.child("state_rout").deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        }))
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.updateStateTable), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this
    }, this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    }), this.bind("updaterq", function() {
        this.update(), this.stopRefresh().startRefresh(0)
    })
}

function pageRoutingIPv6() {
    pageRoutingIPv6.superclass.constructor.call(this, !0)
}

function routeStateTable(routetable, v6) {
    function checkIPv6(ip) {
        var ipbuf = ip.split(":");
        if (ipbuf.length > 4) {
            for (var j = 0, ipstart = ""; j < ipbuf.length - 1; j++) ipstart += ":" != ipbuf[j] ? ipbuf[j] + ":" : ":", 3 == j && (ipstart += "</br>");
            ipstart += ipbuf[ipbuf.length - 1], ip = ipstart
        }
        return ip
    }
    routeStateTable.superclass.constructor.call(this), this.routetable = routetable, this.updateView = function(phase) {
        if (routeStateTable.superclass.updateView.apply(this, arguments), "back" == phase && (this.$grid = this.$box.html("				<div class='grid'></div>			").find(".grid").lightUIGrid([{
                index: "iface",
                name: "iface"
            }, {
                index: "dest",
                name: "destination"
            }, {
                index: "gw",
                name: "statRouteGateway"
            }, {
                index: "mask",
                name: "masq"
            }, {
                index: "flags",
                name: "statRouteFlags"
            }, {
                index: "metric",
                name: "metric"
            }], 0), this.routetable))
            for (var i = 0; i < this.routetable.length; i++) {
                if (v6 && "ipv6" == this.routetable[i].type) var rule = this.routetable[i];
                else {
                    if (v6 || "ip" != this.routetable[i].type) continue;
                    var rule = this.routetable[i]
                }
                var $row = this.$grid.addRow().row("last");
                $row.col("iface").html(rule.name), $row.col("dest").html(checkIPv6(rule.dest)), $row.col("gw").html(checkIPv6(rule.gw)), $row.col("mask").html(rule.mask), $row.col("flags").html(rule.flags), $row.col("metric").html(rule.metric)
            }
    }, this.onupdaterq = function() {
        this.deep.updateView()
    }, this.bind("updaterq", this.onupdaterq)
}

function jsStartModel(json) {
    jsStartModel.superclass.constructor.call(this), this.json = json
}

function jsStartController() {
    jsStartController.superclass.constructor.call(this), this.changeModel(new jsStartModel(null)), this.ifaceTypes.client = {
        type: jsStartClientView
    }, this.ifaceTypes.server = {
        type: jsStartServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.nextIface = "server", this.addIface()
}

function jsStartClientView(ctrl, viewInx, options) {
    jsStartClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.showModalOverlay(), this.info = {
        devInfoName: null,
        devInfoVersion: null,
        devInfoBuildTime: null,
        devInfoVendor: null,
        devInfoSummary: null,
        devInfoBugs: null
    }, this.info = {
        devInfoVendor: null,
        devInfoName: null,
        devInfoVersion: null,
        devInfoBuildTime: null,
        devInfoSummary: null,
        devInfoSoftRev: null,
        devInfoBugs: null
    }, this.params = {}, _.extend(this.params, {
        devInfoLanIp: null,
        devInfoLanMac: null
    }), _.extend(this.params, {
        wifistatus: null,
        ssid: null,
        securityWifi: null
    }), "_ap" != window.menu_postfix && _.extend(this.params, {
        devInfoWanStatus: null
    }), _.extend(this.params, {
        devInfoWanBrConflict: null
    }), jsStartClientView.prototype.drawView = function() {
        function createItem(name, value) {
			return $("<div class='editCell'><div class='name'>" + lng(name) + ":</div><div class='value'>" + value + "</div><div class='clear'></div></div>")
		}
		
		$(this.viewBoxSel).html('<div id="devinfo"></div>');
		$(this.viewBoxSel).find('#devinfo').html('<h2 class="titlePage">' + lng('startSepDevInfo') + '</h2>');
		var abc = ['D-Link Russia', "DIR-615", '<a href="#">emulator</a>', "Today", "Device emulator", "8fe7b335bdd79cf7044c4fd76628fe5e54d34b19", '8-800-700-5465<br><a href="mailto:support@dlink.ru">support@dlink.ru</a>'];
		var n = 0;
		for (var i in this.info) {
			this.info[i] = createItem(i, abc[n]);
			n++;
			$(this.viewBoxSel).find('#devinfo').append(this.info[i]);
		}
		
		var abc = ['<a href="#">192.168.0.1</a>', '<a href="#">c4:a8:1d:5c:c8:74</a>', '<img src="image/ledgreen.gif"><span lankey="on">On</span>' ,'<a href="#">DIR-615</a>', '<a href="#">WPA2-PSK</a><img src="image/lock.png">', '<img class="wan-status-img" src="image/icons/inet_off.png " title="Ethernet">WAN type: Dynamic IP',"none"];
        var n = 0;
		$(this.viewBoxSel).find('#devinfo').append('<h2 class="titlePage">' + lng('netInfo') + '</h2>');
		for (var i in this.params) {
			this.params[i] = createItem(i, abc[n]);
			n++;
			$(this.viewBoxSel).find('#devinfo').append(this.params[i]);
		}
    }, this.onupdmodel = function() {
        function wanStatusImg(status) {
            return "<img class='wan-status-img' src=\"image/icons/" + iconPrefix + "_" + status + '.png " title="' + iconTitle + '"/>'
        }

        function wifiSecStatusImg() {
            return "<img src='image/lock.png'></img>"
        }

        function wifiEnableStatus(radio) {
            return radio ? "<img src='image/ledgreen.gif'></img><span langkey='on'>" + lng("on") + "</span>" : "<img src='image/ledred.gif'></img><span langkey='on'>" + lng("off") + "</span>"
        }
        var jsonrpc = (this.ctrl.model.json, this.ctrl.model.jsonRPC);
        if (this.rqInx = 0, jsonrpc) {
            if (jsonrpc[67] && jsonrpc[67].resident) {
                var devinfo = jsonrpc[67].resident;
                if (this.info.devInfoName.find(".value").html(devinfo.fw_name), hideFlag(14)) this.info.devInfoVersion.find(".value").html(devinfo.fw_version);
                else {
                    var fw_version = devinfo.fw_version;
                    this.info.devInfoVersion.find(".value").html(hideFlag(165) ? fw_version : $("<a href='#'>" + fw_version + "</a>")), this.info.devInfoVersion.find(".value>a").click(context(this).callback(function() {
                        onClickInfoVersionOnStart(this)
                    }))
                }
                if (devinfo.fw_date ? this.info.devInfoBuildTime.find(".value").html(devinfo.fw_date) : this.info.devInfoBuildTime.hide(), devinfo.fw_vendor ? this.info.devInfoVendor.find(".value").html(devinfo.fw_vendor) : this.info.devInfoVendor.hide(), devinfo.fw_bugs || devinfo.fw_tel) {
                    var mail = devinfo.fw_bugs ? devinfo.fw_bugs.replace("<", "").replace(">", "") : "";
                    mail = "<a href='mailto:" + mail + "'>" + mail + "</a>";
                    var tel = devinfo.fw_tel || "";
                    this.info.devInfoBugs.find(".value").html(("" != tel ? tel + "<br/>" : "") + mail)
                }
                else this.info.devInfoBugs.hide();
                devinfo.fw_summary ? this.info.devInfoSummary.find(".value").html(lng(devinfo.fw_summary)) : this.info.devInfoSummary.hide(), this.info.devInfoSoftRev.find(".value").html("8fe7b335bdd79cf7044c4fd76628fe5e54d34b19")
            }
            if (this.rqInx++, jsonrpc[1] && jsonrpc[1].resident && jsonrpc[1].resident.iface_names) {
                var ifaces = jsonrpc[1].resident.iface_names;
                if (this.params.devInfoLanIp.find(".value").html($("<a href='#'>" + ifaces.br0.services.br0.ip + "</a>").click(context(this).callback(function() {
                        setCookie("editLAN", '"+json.ifaces.br0.services.br0.ip+"'), onClickEditLanOnStart(this)
                    }))), this.params.devInfoLanMac.find(".value").html($("<a href='#'>" + ifaces.br0.mac + "</a>").click(context(this).callback(function() {
                        setCookie("editLAN", '"+json.ifaces.br0.services.br0.ip+"'), onClickEditLanOnStart(this)
                    }))), "_ap" != window.menu_postfix) {
                    var status, wanIpV = "",
                        isWan = !1,
                        wanip = null,
                        ipv6lla = null,
                        wanOn = !1,
                        conType = null,
                        wanLanPortOn = !1,
                        wanStatus = "",
                        portOn = !1,
                        ports = jsonrpc[129].resident,
                        wanConn = getWanConn(ifaces, "_v6" == wanIpV);
                    if (wanConn) {
                        wanOn = "Connected" == wanConn.connection_status, conType = wanConn.L3 ? getConnType(wanConn.L2, wanConn.L3, wanConn) : getConnType(wanConn.L2, wanConn);
                        var iconTitle, ifname = wanConn.ifname,
                            iconPrefix = "inet";
                        if (iconTitle = "Ethernet", "WiFiClient" == wanConn.L2.port) iconPrefix = "wifi", iconTitle = "Wi-Fi", portOn = wanOn;
                        else if ("USB" == wanConn.L2.port) "3g" == wanConn.L2.type && (iconTitle = "3G"), "lte" == wanConn.L2.type && (iconTitle = "LTE"), iconPrefix = "3g", portOn = wanOn;
                        else if ("USB-WIMAX" == wanConn.L2.port) iconPrefix = "3g", portOn = wanOn, iconTitle = "WiMax";
                        else {
                            for (var port in ports) {
                                if (ports[port].iface) var iface = ifname.substr(0, ports[port].iface.length);
                                if (ports[port].iface && iface == ports[port].iface && (status = ports[port].status, isWan = ports[port].is_wan, status)) {
                                    portOn = !0;
                                    break
                                }
                            }
                            if (!portOn) {
                                var vlanPorts;
                                strVlanPorts = wanConn.L2.port.substr(6);
                                var vlanPorts;
                                if (vlanPorts = strVlanPorts.split(","), vlanPorts.length && vlanPorts.length > 1) {
                                    for (var portsWan = [], i = 0; i < vlanPorts.length; i++) "5" != vlanPorts[i] && (portsWan[portsWan.length] = "port" + vlanPorts[i]);
                                    for (var i = 0; i < portsWan.length; i++)
                                        if (ports[portsWan[i]].status) {
                                            wanLanPortOn = !0;
                                            break
                                        }
                                }
                            }
                            portOn || "Connected" != wanConn.connection_status || (portOn = !0)
                        }
                        if (wanip = wanConn["ip" + ("_v6" == wanIpV ? "v6" : "")], "_v6" == wanIpV && is.set(wanConn.ipv6lla) && (ipv6lla = wanConn.ipv6lla), portOn || "pppoe" == conType || "ip" != conType && "ipv6" != conType)
                            if ("_ap" == menu_postfix) wanStatus += wanStatusImg("on");
                            else if (wanOn && portOn) wanStatus += wanStatusImg("on"), wanip && (wanStatus += " " + wanip + ";"), conType && (wanStatus += " " + lng("devInfoWanType") + ": " + lng(conType) + "; ");
                        else {
                            wanStatus += wanStatusImg("off"), conType && (wanStatus += lng("devInfoWanType") + ": " + lng(conType));
                            var wanCauseDown = this.causeWanDown(conType, wanConn, wanLanPortOn);
                            wanCauseDown && (wanStatus += "; " + lng(wanCauseDown) + "; ")
                        }
                        else wanStatus += "_ap" == menu_postfix ? wanStatusImg("off") : wanStatusImg("off") + " ; " + lng("wanStatuscableDisconnect") + ";";
                        is.set(ipv6lla) && (wanStatus += " LLA: " + ipv6lla + "; ")
                    }
                    else wanStatus = lng("wanStatusNotCreated");
                    wanStatus ? this.params["devInfoWanStatus" + wanIpV].find(".value").html(wanStatus) : this.params["devInfoWanStatus" + wanIpV].hide()
                }
                var flag_br_conflict = !1;
                for (var iface in ifaces)
                    if (ifaces[iface].services) {
                        var services = ifaces[iface].services;
                        for (var key in services) services[key].br_conflict && (flag_br_conflict = !0)
                    }
                flag_br_conflict ? (this.params.devInfoWanBrConflict.find(".value").html(lng("wanBrConflict")), this.params.devInfoWanBrConflict.find(".name").css("color", "red"), this.params.devInfoWanBrConflict.find(".value").css("color", "red"), this.params.devInfoWanBrConflict.show()) : this.params.devInfoWanBrConflict.hide()
            }
            this.rqInx = this.rqInx + 2;
            var statusName = "wifistatus",
                ssidName = "ssid",
                secName = "securityWifi";
            if (jsonrpc[35] && jsonrpc[35].resident) {
                var wifi_info = jsonrpc[35].resident;
                if (wifi_info) {
                    var authAvailable = {};
                    for (var ia in wifi_info.AuthAvailable) authAvailable[wifi_info.AuthAvailable[ia].Id] = wifi_info.AuthAvailable[ia].Name;
                    if (wifi_info.mbssid && wifi_info.mbssid[0]) {
                        var mbssidItem = wifi_info.mbssid[0],
                            fgShowWifiInfo = !0;
                        if (is.set(mbssidItem.WifiBroadcast) ? fgShowWifiInfo = mbssidItem.WifiBroadcast : is.set(wifi_info.WifiBroadcast) && (fgShowWifiInfo = wifi_info.WifiBroadcast), fgShowWifiInfo = wifi_info.Radio && fgShowWifiInfo && void 0 != mbssidItem.SSID, this.params[statusName].find(".value").html(wifiEnableStatus(fgShowWifiInfo)), fgShowWifiInfo) {
                            if (hideFlag("wifi.mbssid_all.SSID")) this.params[ssidName].find(".value").html(mbssidItem.SSID), this.params[secName].find(".value").html(authAvailable[mbssidItem.AuthMode]);
                            else {
                                this.params[ssidName].find(".value").html($("<a href='#'>" + mbssidItem.SSID + "</a>").click(context(this).callback(function() {
                                    onClickEditWifiOnStart(this, 0)
                                })));
                                var wifiSecStatus = "<a href='#'>" + authAvailable[mbssidItem.AuthMode] + "</a>";
                                ("OPEN" != mbssidItem.AuthMode || "WEP" == mbssidItem.EncrypType) && (wifiSecStatus += wifiSecStatusImg()), this.params[secName].find(".value").html($(wifiSecStatus).click(context(this).callback(function() {
                                    onClickEditWifiSecOnStart(this, 0)
                                }))), "OPEN" == mbssidItem.AuthMode && "WEP" != mbssidItem.EncrypType ? this.params[secName].find(".value>a").addClass("error") : this.params[secName].find(".value>a").removeClass("error")
                            }
                            this.params[ssidName].show(), this.params[secName].show()
                        }
                        else this.params[ssidName].hide(), this.params[secName].hide()
                    }
                }
            }
            this.rqInx++
        }
        return window.engine && window.engine.candyBlack || this.hideModalOverlay(), window.engine.candyBlack && ($("#workbenchScrollShadowTop").hide(), setScrollbarPos(), setScrollbarSize()), !1
    }, this.causeWanDown = function(contype, wanConn, wanLanPortOn) {
        var ports = this.ctrl.model.jsonRPC[129].resident,
            result = null,
            service = wanConn.L2.services[wanConn.srvname];
        if (wanConn.L2 && wanConn.L2.services && getObjectLength(wanConn.L2.services) < 1) return "wanStatusNotCreated";
        var status = "wanStatusNotCreated";
        for (var port in ports) {
            var wan_iface;
            if (wan_iface = -1 != _.indexOf(wanConn.ifname, ".") ? wanConn.ifname.substr(0, _.indexOf(wanConn.ifname, ".")) : wanConn.ifname, wan_iface == ports[port].iface) {
                if (status = ports[port].status)
                    if (wanConn.enable) {
                        var con_status = null;
                        switch (contype) {
                            case "static":
                            case "dinamic":
                            case "statkab":
                            case "dinkab":
                                con_status = null;
                                break;
                            case "pppoe":
                            case "pppoa":
                                service && (con_status = service.ppp_state);
                                break;
                            case "dynpptp":
                            case "dynl2tp":
                            case "statpptp":
                            case "statl2tp":
                                con_status = wanConn.ppp_state
                        }
                        if (con_status) switch (con_status) {
                            case -1:
                            case 0:
                                result = "wanStatusUnknown";
                                break;
                            case 1:
                                result = "wanStatusServerNotAvailable";
                                break;
                            case 2:
                                result = "wanStatusPeerNegotiationFailed";
                                break;
                            case 3:
                                result = "wanStatusPeerNotResponding";
                                break;
                            case 4:
                                result = "wanStatusAuthFailed";
                                break;
                            case 100:
                                result = "wanStatusRtNotSameNet"
                        }
                        else result = "wanStatusUnknown"
                    }
                    else result = "disable";
                else wanLanPortOn || (result = "wanStatuscableDisconnect");
                break
            }
        }
        return result
    }, this.bind("updmodel", this.onupdmodel)
}

function jsStartServerView(ctrl, viewInx, options) {
    jsStartServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.rpcList = [], this.rpcList.push(67), this.rpcList.push(1), this.rpcList.push(129), this.rpcList.push(35), this.pickData = function() {
        var $winDefPass = "#winDefPass";
        $($winDefPass).is(":visible") && this.stopRefresh();
        var data = this.options.sender.responseData;
        if (data && data.rq) {
            this.ctrl.model.json = data.rq, this.ctrl.model.jsonRPC = {};
            for (var i in this.rpcList) this.ctrl.model.jsonRPC[this.rpcList[i]] = data.rq[i]
        }
    }, this.prepareData = function() {
        var obj = {
            v2: "y",
            rq: 0
        };
        for (var i in this.rpcList) obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = this.rpcList[i], obj["res_struct_size" + obj.rq] = 1, obj.rq++;
        this.addToRequest(obj)
    }, this.startRefresh(0, 3e3), this.bind("stoprefreshrq", function() {
        return this.stopRefresh(), !1
    }), this.bind("startrefreshrq", function() {
        return this.startRefresh(0, 3e3), !1
    }), window.engine && window.engine.candyBlack || (this.onupdaterq = function() {
        this.updateView()
    }, this.bind("updaterq", this.onupdaterq))
}

function onClickInfoVersionOnStart() {
    "mobile2" == getCookie("viewmode") ? MENU.open(menuSystem.alias + "/" + pFirmware.alias) : __FIRMWARE.show()
}

function onClickEditLanOnStart() {
    MENU.open(menuNet.alias + "/" + pageLAN.alias)
}

function onClickEditWifiOnStart(obj, i) {
    MENU.open(i ? menuWifi.alias + "/" + pWiFiBasic.alias + "/" + pWiFiBasic.tabs[i].alias : menuWifi.alias + "/" + pWiFiBasic.alias)
}

function onClickEditWifiSecOnStart(obj, i) {
    MENU.open(i ? menuWifi.alias + "/" + pWifiSec.alias + "/" + pWifiSec.tabs[i].alias : menuWifi.alias + "/" + pWifiSec.alias)
}

function pageDHCPStat() {
    pageDHCPStat.superclass.constructor.call(this), this.leases = null, this.rqId = -1, this.virgin = !0, this.refreshTime = 1e4, this.refreshId = null, this.updateView = function(phase) {
        if (pageDHCPStat.superclass.updateView.apply(this, arguments), "back" == phase && (this.$grid = this.$box.html("				<div class='grid'></div>			").find(".grid").lightUIGrid([{
                index: "host",
                name: "statDhcpHost"
            }, {
                index: "ip",
                name: "ip_address"
            }, {
                index: "mac",
                name: "hwaddr"
            }, {
                index: "lease",
                name: "statDhcpExpires"
            }], 0), this.leases))
            for (var i = 0; i < this.leases.length; i++) {
                var $row = this.$grid.addRow().row("last"),
                    lease = this.leases[i];
                $row.col("host").html("" != lease.hostname ? lease.hostname : "<center>-</center>"), $row.col("ip").html(lease.ip), $row.col("mac").html(lease.MACAddress), $row.col("lease").html("" == lease.lease ? lng("statDhcpExpired") : lookTime(lease.lease).toString())
            }
    }, this.update = function() {
        this.virgin && rootView.showModalOverlay(), this.rqId = device.config.read([34, 193], callback(this, function(data) {
            this.leases = [], is.RPC_SUCCESS(data.rq) && (this.leases = this.leases.concat(data.rq.resident)), is.RPC_SUCCESS(data.rq) && (this.leases = this.leases.concat(data.rq.resident)), this.deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.virgin = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this.virgin = !0, this
    }, this.bind("updaterq", function() {
        this.stopRefresh().startRefresh(0)
    }), this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    })
}

function igmpGrid(ipVersion) {
    igmpGrid.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1)), this.$grid = null;
    var header = [{
        index: "address",
        name: 4 == ipVersion ? "IPv4" : "IPv6"
    }, {
        index: "iface",
        name: "iface"
    }];
    this.updateModel = function(status) {
        status.error &= !this.$grid.cleanErrors().checkMandatory(), this.status = status
    }, this.addRowWithData = function(ifacedata, addressdata) {
        $row = this.$grid.addRow().row("last"), $row.col("address").fieldval(addressdata), $row.col("iface").fieldval(ifacedata)
    }, this.updateView = function(phase) {
        igmpGrid.superclass.updateView.apply(this, arguments), "back" == phase && (this.$grid = this.$box.lightUIGrid(header, this.settings ? this.settings.length : 0, {
            id: "grid" + ipVersion
        }), this.$grid.css("margin-bottom", "20px"), this.$grid.find("table td:first-child").css("width", "70%"))
    }, this.update = function() {
        this.deep.updateView()
    }
}

function pageMulticastGroups() {
    pageMulticastGroups.superclass.constructor.call(this), this.refreshTime = 1e4, this.refreshId = null, this.rqId = -1, this.firstStart = !0, this.groups = [], this.add(new igmpGrid(4), "gridv4"), this.updateView = function(phase) {
        if (pageMulticastGroups.superclass.updateView.apply(this, arguments), "back" == phase)
            for (var count = 0; count < this.groups.length; count++) this.child("gridv4").addRowWithData(this.groups[count].name, this.groups[count].maddr)
    }, this.update = function() {
        rootView.showModalOverlay(), this.rqId = device.config.read(206, callback(this, function(data) {
            if (is.RPC_SUCCESS(data) && (this.groups.length = 0, data.resident.igmp))
                for (var i = 0; i < data.resident.igmp.length; i++) {
                    this.groups[i] = [], this.groups[i].name = "", this.groups[i].name += data.resident.igmp[i].name, this.groups[i].maddr = "";
                    for (var j = 0; j < data.resident.igmp[i].maddr.length; j++) this.groups[i].maddr += "" == this.groups[i].maddr ? data.resident.igmp[i].maddr[j] : "<br>" + data.resident.igmp[i].maddr[j]
                }
            this.deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.firstStart = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.bind("updaterq", function() {
        this.startRefresh(0)
    })
}

function pageLANClientsStat() {
    pageLANClientsStat.superclass.constructor.call(this), this.arplist = null, this.ifacelist = null, this.rqId = -1, this.virgin = !0, this.refreshTime = 1e4, this.refreshId = null, this.updateView = function(phase) {
        if (pageLANClientsStat.superclass.updateView.apply(this, arguments), "back" == phase) {
            var header = [{
                index: "ip",
                name: "ip_address"
            }, {
                index: "flags",
                name: "statLanClientsFlags"
            }, {
                index: "mac",
                name: "hwaddr"
            }, {
                index: "iface",
                name: "iface"
            }];
            if (this.$grid = this.$box.html("				<div class='grid'></div>			").find(".grid").lightUIGrid(header, 0), this.arplist)
                for (var i = 0; i < this.arplist.length; i++) {
                    var $row = this.$grid.addRow().row("last"),
                        iface_name = null,
                        client = this.arplist[i];
                    if (client.name) iface_name = client.name;
                    else
                        for (var iface in this.ifacelist)
                            if (this.ifacelist[iface].iface == client.iface) {
                                iface_name = this.ifacelist[iface].name;
                                break
                            }
                    $row.col("ip").html(client.ip), $row.col("flags").html(client.flags), $row.col("mac").html(client.mac), $row.col("iface").html(iface_name ? iface_name : client.iface)
                }
        }
    }, this.update = function() {
        this.virgin && rootView.showModalOverlay(), this.rqId = device.config.read([120, 187], callback(this, function(data) {
            this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.arplist = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.virgin = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this.virgin = !0, this
    }, this.clealAll = function() {
        device.config.write(187, {
            clear_all: !0
        }, context(this).callback(function() {
            rootView.hideModalOverlay(), this.emit("updaterq")
        }))
    }, this.bind("updaterq", function() {
        this.stopRefresh().startRefresh(0)
    }), this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    })
}

function pageRouteStat() {
    function checkIPv6(ip) {
        var ipbuf = ip.split(":");
        if (ipbuf.length > 4) {
            for (var j = 0, ipstart = ""; j < ipbuf.length - 1; j++) ipstart += ":" != ipbuf[j] ? ipbuf[j] + ":" : ":", 3 == j && (ipstart += "</br>");
            ipstart += ipbuf[ipbuf.length - 1], ip = ipstart
        }
        return ip
    }
    pageRouteStat.superclass.constructor.call(this), this.routetable = null, this.rqId = -1, this.virgin = !0, this.refreshTime = 1e4, this.refreshId = null, this.updateView = function(phase) {
        if (pageRouteStat.superclass.updateView.apply(this, arguments), "back" == phase && (this.$grid = this.$box.html("				<div class='grid'></div>			").find(".grid").lightUIGrid([{
                index: "iface",
                name: "iface"
            }, {
                index: "dest",
                name: "destination"
            }, {
                index: "gw",
                name: "statRouteGateway"
            }, {
                index: "mask",
                name: "masq"
            }, {
                index: "flags",
                name: "statRouteFlags"
            }, {
                index: "metric",
                name: "metric"
            }], 0), this.routetable))
            for (var i = 0; i < this.routetable.length; i++) {
                var $row = this.$grid.addRow().row("last"),
                    rule = this.routetable[i];
                $row.col("iface").html(rule.name), $row.col("dest").html(checkIPv6(rule.dest)), $row.col("gw").html(checkIPv6(rule.gw)), $row.col("mask").html(rule.mask), $row.col("flags").html(rule.flags), $row.col("metric").html(rule.metric)
            }
    }, this.update = function() {
        this.virgin && rootView.showModalOverlay(), this.rqId = device.config.read([33], callback(this, function(data) {
            this.routetable = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.deep.updateView(), rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.virgin = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this.virgin = !0, this
    }, this.bind("updaterq", function() {
        this.stopRefresh().startRefresh(0)
    }), this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    })
}

function jsStatIPSettingsModel(service) {
    jsStatIPSettingsModel.superclass.constructor.call(this), this.service = service
}

function jsStatIPSettingsController(service) {
    jsStatIPSettingsController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsStatIPSettingsClientView,
        def: !0
    }, this.ifaceTypes.client.options = {}, this.ifaceTypes.summary = {
        type: jsStatIPSettingsSummaryView
    }, this.ifaceTypes.summary.options = {}, this.changeModel(new jsStatIPSettingsModel(service)), this.isIpOrMaskChanged = !1, this.isIpOrMaskv6Changed = !1, this.addChild(new jsDecorController, "desc");
    var mask = new jsIPv4Controller(service.mask);
    this.addChild(new jsIPv4Controller(service.ip, mask), "ip"), this.addChild(mask, "mask"), this.addChild(new jsIPv4Controller(service.gwip), "gwip"), this.addChild(new jsIPv4Controller(service.dns_prim), "primaryDns"), this.addChild(new jsIPv4Controller(service.dns_sec), "secondaryDns")
}

function jsStatIPSettingsClientView(ctrl, viewInx, options) {
    var obj, service = ctrl.model.service;
    this.saveIP = function() {
        var box = this,
            service = {};
        return service.ip = box.getChild("ip").ctrl.model.toString(), service.mask = box.getChild("mask").ctrl.model.toString(), service.gwip = box.getChild("gwip").ctrl.model.toString(), service.dns_prim = box.getChild("primaryDns").ctrl.model.toString(), service.dns_sec = box.getChild("secondaryDns").ctrl.model.toString(), service
    }, this.updateModel = function() {
        var mask = this.getChild("mask"),
            validMaskFlag = !0;
        mask.statusCode = null;
        var gwip = this.getChild("gwip");
        gwip.statusCode = null;
        var res = jsStatIPSettingsClientView.superclass.updateModel.call(this);
        if (validSubnetMask(mask.ctrl.model.toString()) || (mask.statusCode = "subnetMaskIncorrect", mask.setError(), validMaskFlag = !1), this.ctrl.model.service.is_wan && (res &= this.checkGateway()), res && validMaskFlag) {
            var service = this.ctrl.model.service;
            service.type = "ip", $.extend(!0, service, this.saveIP())
        }
        else res = !1;
        return res
    }, this.checkGateway = function(v6) {
        var box = this,
            res = !0,
            doCheck = !1,
            gwip = box.getChild("gwip"),
            ip = box.getChild("ip"),
            mask = box.getChild("mask");
        if (doCheck = !ip.statusCode && !gwip.statusCode, v6 || (doCheck &= !mask.statusCode), doCheck) {
            var ipModel = ip.ctrl.model,
                tmpIPModel = new jsSubNetIPModel(ipModel.bits, ipModel.toString(), ipModel.radix, ipModel.delim, ipModel.expandZero, ipModel.omitFullMask),
                gwipModel = gwip.ctrl.model,
                tmpGwipModel = new jsSubNetIPModel(gwipModel.bits, gwipModel.toString(), gwipModel.radix, gwipModel.delim, gwipModel.expandZero, gwipModel.omitFullMask);
            if (!v6) {
                var bitmask = calcBitsByMask(mask.ctrl.model.toString());
                tmpIPModel.bitmask = bitmask, tmpGwipModel.bitmask = bitmask
            }
            tmpGwipModel.bitmask = tmpIPModel.bitmask, tmpIPModel.applyMask(), tmpGwipModel.applyMask(), res = tmpIPModel.toString() == tmpGwipModel.toString(), res || (gwip.statusCode = "wanWrongGwip", gwip.setError())
        }
        return res
    }, this.onfieldchange = function(obj) {
        var alias = obj.view.ctrl.alias;
        switch (alias) {
            case "ip":
            case "mask":
                this.ctrl.isIpOrMaskChanged = !0;
                break;
            case "ipv6":
                this.ctrl.isIpOrMaskv6Changed = !0
        }
        return !0
    }, this.onmodeswitch = function() {
        return this.options.brief ? (this.getChild("desc").hide(), this.getChild("secondaryDns").hide()) : (this.getChild("desc").show(), this.getChild("secondaryDns").show()), !1
    }, this.drawView = function() {
        jsStatIPSettingsClientView.superclass.drawView.call(this), this.ctrl.event("modeswitch")
    }, this.blocks = service.blocks, obj = ctrl.getChild("desc"), obj.ifaceTypes.separator.options = {}, opt = obj.ifaceTypes.separator.options, opt.label = service.is_wan ? "IP" : null, opt.hide = this.blocks || !service.is_wan, obj = ctrl.getChild("ip"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanIp", obj = ctrl.getChild("mask"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanMask", obj = ctrl.getChild("gwip"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanGwIp", modeAP() && (opt.optional = !0), "_ap" != window.menu_postfix && (opt.hide |= !service.is_wan), obj = ctrl.getChild("primaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanPrimDns", opt.hide = !service.is_wan, obj = ctrl.getChild("secondaryDns"), opt = obj.ifaceTypes.client.options, opt.humanName = "wanSecDns", opt.optional = !0, opt.hide = !service.is_wan, jsStatIPSettingsClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.bind("fieldchange", this.onfieldchange), service.wizard && this.bind("modeswitch", this.onmodeswitch)
}

function jsStatIPSettingsSummaryView(ctrl, viewInx, options) {
    jsStatIPSettingsSummaryView.superclass.constructor.call(this, ctrl, viewInx, options), this.updateView = function() {
        this.getChild("desc").show(), jsStatIPSettingsSummaryView.superclass.drawView.call(this)
    }
}

function jsSysComModel(cmd) {
    jsSysComModel.superclass.constructor.call(this), this.cmd = cmd, this.buf = null, this.nonblocking = !1
}

function jsSysComController(frame, cmd) {
    jsSysComController.superclass.constructor.call(this), this.changeModel(new jsSysComModel(cmd)), this.addChild(new jsMenuController("button_reboot", {
        frame: this,
        contentOptions: {
            cmd: 6
        }
    })), this.addChild(new jsMenuController("button_save_reboot", {
        frame: this,
        contentOptions: {
            cmd: 8
        }
    })), this.addChild(new jsMenuController("button_conf_save", {
        frame: this,
        contentOptions: {
            cmd: 20
        }
    })), this.addChild(new jsMenuController("button_config_download", {
        frame: this,
        contentOptions: {
            cmd: 12
        }
    })), this.addChild(new jsMenuController("button_factory", {
        frame: this,
        contentOptions: {
            cmd: 10
        }
    })), this.addChild(new jsMenuController("logout", {
        frame: this,
        contentOptions: {
            cmd: "logout"
        }
    })), this.ifaceTypes.menuTitle = {
        type: jsSysComView,
        options: {
            style: "fastmenu"
        }
    }, this.ifaceTypes.apply = {
        type: jsSysComApplyView,
        options: {
            action: "index.cgi"
        }
    }, this.onmenuchange = function(menuCtrl) {
        switch (menuCtrl.contentOptions.cmd) {
            case "logout":
                this.fillModel(null), this.frame.event("logoutrq");
                break;
            case 6:
                this.fillModel(menuCtrl), this.frame.event("rebootrq");
                break;
            case 10:
                this.fillModel(menuCtrl), this.frame.event("resetrebootrq");
                break;
            default:
                this.fillModel(menuCtrl)
        }
        return !1
    }, this.fillModel = function(menuCtrl) {
        menuCtrl ? (this.model.cmd = menuCtrl.contentOptions.cmd, this.model.buf = menuCtrl.contentOptions.buf, this.model.nonblocking = menuCtrl.contentOptions.nonblocking) : (this.model.cmd = null, this.model.buf = null, this.model.nonblocking = !1)
    }, this.addEventHandler("menuchange", this.onmenuchange), this.frame = frame
}

function jsSysComView(ctrl, viewInx, options) {
    jsSysComView.superclass.constructor.call(this, ctrl, viewInx, options), this.drawView = function() {
        jsSysComView.superclass.drawView.call(this), $(this.myBoxSel).html(lng("menu_system"))
    }
}

function jsSysComApplyView(ctrl, viewInx, options) {
    jsSysComApplyView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var frame = this.ctrl.frame,
            status = this.options.sender.responseData.status;
        if (20 == status || 12 == status) switch (this.ctrl.model.cmd) {
            case 6:
                break;
            case 8:
                break;
            case 20:
                frame.event("save");
                break;
            case 14:
                break;
            case 11:
                frame.event("cfgrestoreok", status);
                break;
            case 12:
                goto_page("index.cgi?v2_action=givemeconfig", !0);
                break;
            case 10:
                break;
            case 38:
                break;
            default:
                frame.event("syscmdcomplete", status)
        }
        else switch (this.ctrl.model.cmd) {
            case 6:
                break;
            case 8:
                break;
            case 14:
                break;
            case 11:
                break;
            case 10:
                break;
            default:
                frame.event("syscmdcomplete", status)
        }
    }, this.prepareData = function() {
        var obj = new Object,
            frame = this.ctrl.frame,
            model = this.ctrl.model;
        switch (obj.res_cmd = model.cmd, obj.res_buf = model.buf, obj.res_cmd_type = model.nonblocking ? "nbl" : "bl", obj.v2 = "y", obj.rq = "y", this.addToRequest(obj), this.ctrl.model.cmd) {
            case 6:
                frame.event("startreboot");
                break;
            case 8:
                frame.event("startsavereboot");
                break;
            case 10:
                frame.event("startresetreboot");
                break;
            case 14:
                frame.event("startfwupdate")
        }
    }, this.onmenuchange = function(menuCtrl) {
        switch (menuCtrl.contentOptions.cmd) {
            case "logout":
                break;
            case 6:
                break;
            case 10:
                break;
            default:
                this.updateView()
        }
        return !1
    }, this.oncmdcfm = function() {
        return this.updateView(), !1
    }, this.bind("menuchange", this.onmenuchange), this.bind("cmdcfm", this.oncmdcfm)
}

function pageSyslogConf() {
    pageSyslogConf.superclass.constructor.call(this), this.conf = null;
    var types = {
            slLocal: "local",
            slRemote: "remote",
            slBoth: "both"
        },
        levels = {
            slLevel0: 0,
            slLevel1: 1,
            slLevel2: 2,
            slLevel3: 3,
            slLevel4: 4,
            slLevel5: 5,
            slLevel6: 6,
            slLevel7: 7
        };
    this.add(new nodeCheckBox("slLogging", !1), "enable").add(new node({
        hidden: !0
    }), "settings").child("settings").add(new nodeSelect("slType", "local"), "type").add(new nodeSelect("slLevel", 0), "level").add(new nodetext("slServer", "", {
        mandatory: !0,
        hidden: !0,
        re: [function(value) {
            return new RegExp("^([a-z][a-z0-9-]+(.|-*.))+[a-z]{2,6}$").test(value) || validate_ip_address(value) ? null : "slServerWrong"
        }]
    }), "server").add(new nodenum("port", 514, {
        minval: 1,
        maxval: 65535,
        mandatory: !0,
        hidden: !0
    }), "port");
    var settings = this.child("settings");
    this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageSyslogConf.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel() && this.save(this.child("enable").val(), settings.child("type").val(), parseInt(settings.child("level").val()), null, settings.child("server").val(), settings.child("port").val())
            })), "back" == phase) {
            var type = this.child("settings/type").cleanOptions();
            for (var t in types) t && type.addOption(t, types[t]);
            var level = this.child("settings/level").cleanOptions();
            for (var l in levels) l && level.addOption(l, levels[l])
        }
    }, this.save = function(enable, type, level, rlevel, server, port) {
        rootView.showModalOverlay(), this.conf = {
            enable: enable,
            type: enable ? type : this.conf.type,
            level: enable ? level : this.conf.level,
            server: enable && "local" != type ? server : this.conf.server,
            port: enable && "local" != type ? port : this.conf.port
        }, device.config.write(63, this.conf, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([63], callback(this, function(data) {
            this.deep.updateView(), this.conf = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.conf && (this.child("enable").val(this.conf.enable).fieldchange(), settings.child("level").val(this.conf.level), settings.child("type").val(this.conf.type).fieldchange(), settings.child("server").val(this.conf.server), settings.child("port").val(this.conf.port)), rootView.hideModalOverlay()
        }))
    }), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                value ? settings.show() : settings.hide();
                break;
            case "type":
                switch (value) {
                    case "local":
                        settings.child("level").enable(), settings.child("server").hide(), settings.child("port").hide();
                        break;
                    case "remote":
                        settings.child("server").show(), settings.child("port").show(), settings.child("level").enable();
                        break;
                    case "both":
                        settings.child("level").enable(), settings.child("server").show(), settings.child("port").show()
                }
        }
    })
}

function pageTelnet() {
    pageTelnet.superclass.constructor.call(this), this.json = null, this.CONFIG_ID = 152, this.updateModel = function(status) {
        return this.status = status, status.error || (this.json = {
            enable: this.get("enable").val()
        }, this.json.port = parseInt(this.child("port").val())), this.jsonOutObj = 218 == this.CONFIG_ID ? {
            ssh: this.json
        } : {
            telnet: this.json
        }, !status.error
    }, this.updateView = function(phase) {
        pageTelnet.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            this.deep.updateModel(), this.status.error || this.save(this.child("enable").val(), parseInt(this.child("port").val()))
        }))
    }, this.save = function() {
        if (this.deep.updateModel()) {
            var query = this.query = {
                write: []
            };
            query.write.push([this.CONFIG_ID, this.jsonOutObj]), rootView.showModalOverlay(), device.config.multi(query, callback(this, function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            }))
        }
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay();
        var query = [this.CONFIG_ID];
        device.config.read(query, callback(this, function(data) {
            try {
                this.json = 218 == this.CONFIG_ID ? data.rq[0].resident.ssh : data.rq[0].resident.telnet, this.startForm().add(new nodeCaption("telnetLabel", "telnetDescText")).add(new nodeCheckBox("telnetOn", this.json.enable), "enable"), this.add(new nodenum("telnetPort", this.json.port, {
                    minval: 1,
                    maxval: 65535,
                    disabled: !0,
                    mandatory: !0
                }), "port"), this.listen("enable", "endform fieldchange", function(status, value) {
                    var port = this.child("port");
                    value ? port.enable() : port.disable()
                }), this.endForm(), this.deep.updateView(), rootView.hideModalOverlay()
            }
            catch (e) {
                this.deep.updateView().$box.errorBlock(lng("error"), e.message)
            }
        }))
    })
}

function jsTextareaController(value) {
    jsTextareaController.superclass.constructor.call(this), this.ifaceTypes.textarea = {
        type: jsInputSlotView
    }, this.addChild(new jsTextareaFieldController(value), "field"), this.changeModel(this.getChild("field").model)
}

function jsTextareaFieldController(value) {
    jsTextareaFieldController.superclass.constructor.call(this), this.ifaceTypes.textarea = {
        type: jsTextareaClientView
    }, this.changeModel(new jsInputModel(value)), this.modified = !1, this.setModified = function() {
        return this.modified = !0, !0
    }, this.addEventHandler("fieldchange", this.setModified)
}

function jsTextareaClientView(ctrl, viewInx, options) {
    jsTextareaClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsTextareaClientView.prototype.drawView = function() {
        jsTextareaClientView.superclass.drawView.call(this);
        var htmlToDraw = "",
            options = this.options;
        options.summary ? (this.inputSel = options.viewBoxSel, delete this.inputId) : (no(this.inputId) && (this.inputId = "elemId" + getUID()), this.inputSel = "#" + this.inputId, htmlToDraw = "<textarea id='" + this.inputId + "' type='", htmlToDraw += options.password ? "password" : "text", htmlToDraw += "'/>"), this.html(htmlToDraw), this.$input.bind("keyup", context(this).callback(this.onfieldchangejq))
    }, jsTextareaClientView.prototype.updateModel = function() {
        return this.ctrl.model.value = this.val(), jsTextareaClientView.superclass.updateModel.call(this)
    }, jsTextareaClientView.prototype.updateView = function() {
        this.val(this.ctrl.model.value), jsTextareaClientView.superclass.updateView.call(this)
    }
}

function pageTR69() {
    pageTR69.superclass.constructor.call(this), this.tr69 = null, this.ifacelist = null, this.conns = {}, this.add(new nodeCaption("TR69Label", "TR69DescText"));
    var settings = this.add(new node({}), "settings").child("settings");
    settings.add(new nodeSelect("iface", null, {
        disabled: disableFlag("tr69")
    }), "iface"), settings.add(new nodeCheckBox("tr69OnOff"), "onoff"), settings.add(new nodeCaption("tr69LabelInform")).add(new nodeCheckBox("tr69Enable"), "enable").add(new nodenum("tr69Interval", 86400, {
        disabled: disableFlag("tr69")
    }), "interval"), settings.add(new nodeCaption("tr69LabelAcs")).add(new nodetext("tr69URL"), "acs_url"), settings.add(new nodetext("tr69UserName"), "acs_user").add(new nodetext("tr69Password", "", {
        password: !0
    }), "acs_password").add(new nodeCaption("tr69LabelConn")).add(new nodetext("tr69UserName"), "conn_user").add(new nodetext("tr69Password", "", {
        password: !0
    }), "conn_password"), settings.add(new nodenum("tr69ConnReqPort", "", {
        minval: 1,
        maxval: 65535,
        disabled: disableFlag("tr69")
    }), "conn_port").add(new nodetext("tr69ConnReqPath", "", {}), "conn_path"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageTR69.superclass.updateView.apply(this, arguments), "back" == phase) {
            var obj, iface = this.child("settings/iface").cleanOptions(),
                connArr = getConnArray(this.ifacelist);
            iface.addOption("wanAuto", "ANY_WAN");
            for (var i in connArr) obj = connArr[i], iface.addOption(obj.name, obj.iface + "," + obj.ifname), this.conns[obj.iface + "," + obj.ifname] = obj;
            var tr69 = this.tr69;
            tr69 && (settings.child("iface").val(tr69.iface && tr69.l3_key ? tr69.iface + "," + tr69.l3_key : "ANY_WAN"), settings.child("acs_url").val(tr69.AcsURL), settings.child("onoff").val(tr69.Enable), settings.child("enable").val(tr69.InformEnable), settings.child("interval").val(tr69.InformInterval), settings.child("acs_user").val(tr69.AcsUser), settings.child("acs_password").val(tr69.AcsPwd), settings.child("conn_user").val(tr69.ConnReqUser), settings.child("conn_password").val(tr69.ConnReqPwd), settings.child("conn_port").val(tr69.ConnReqPort), settings.child("conn_path").val(tr69.ConnReqPath)), this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel() && this.save()
            })), disableFlag("tr69") && this.getButton("button_save").disable()
        }
    }, this.save = function() {
        rootView.showModalOverlay(), this.tr69 = {
            Enable: settings.child("onoff").val(),
            InformEnable: settings.child("enable").val(),
            InformInterval: settings.child("interval").val().toString(),
            AcsURL: settings.child("acs_url").val(),
            AcsUser: settings.child("acs_user").val(),
            AcsPwd: settings.child("acs_password").val(),
            ConnReqUser: settings.child("conn_user").val(),
            ConnReqPwd: settings.child("conn_password").val(),
            ConnReqPort: settings.child("conn_port").val(),
            ConnReqPath: settings.child("conn_path").val()
        };
        var ifaceAndIfname = settings.child("iface").val(),
            iface = ifaceAndIfname.split(",")[0],
            conn = this.conns[ifaceAndIfname];
        this.tr69.iface = iface, conn && (this.tr69.l2_key = conn.L2.ifname, this.tr69.l3_key = conn.L3 ? conn.L3.ifname : conn.ifname), device.config.write(70, this.tr69, callback(this, function() {
            rootView.hideModalOverlay(), this.emit("updaterq")
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(1, callback(this, function(data) {
            this.ifacelist = is.RPC_SUCCESS(data) ? data.resident.iface_names : {}
        })), device.config.read(70, callback(this, function(data) {
            this.tr69 = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    })
}

function pageTraceroute() {
    pageTraceroute.superclass.constructor.call(this), this.updateView = function(phase) {
        pageTraceroute.superclass.updateView.apply(this, arguments), "forward" == phase && (this.cleanButtonBar().addButton("button_start").getButton("button_start").bind("click.button", callback(this, function() {
            this.deep.updateModel(), this.status && !this.status.error && this.traceroute()
        })), this.startForm().add(new nodeCaption("tracerouteLabel", "tracerouteDescText")).add(new nodeDomainName("troHost", "", {
            mandatory: !0,
            isip: !0
        }), "troHost"), this.add(new node, "troLog").endForm())
    }, this.updateModel = function(status) {
        this.status = status
    }, this.traceroute = function() {
        rootView.showModalOverlay();
        var outObj = {
            host: this.child("troHost").val().trim()
        };
        device.config.write(166, outObj, callback(this, function(answer) {
            if (answer.resident) {
                rootView.hideModalOverlay();
                var textLog = null;
                answer.resident.traceroute && (textLog = answer.resident.traceroute);
                var log = this.child("troLog");
                log.$box.html($("					<div class='console syslog'>						<pre>" + textLog + "</pre>					</div>				"))
            }
        }))
    }, this.bind("fieldchange", function(status, value) {
        "troV6" == status.target.getAlias() && (this.child("troHost").options.ipv6 = value ? !0 : !1, this.deep.updateModel(), this.child("troHost").deep.updateView())
    }), this.bind("updaterq", function() {
        this.deep.updateView()
    })
}

function jsTunnelModel(tunnel, service, ifnode, isadding, iftree) {
    jsTunnelModel.superclass.constructor.call(this), this.tunnel = tunnel, this.service = service, this.ifnode = ifnode, this.iftree = iftree, this.isadding = isadding
}

function jsTunnelController(tunnel, service, ifnode, isadding, iftree) {
    jsTunnelController.superclass.constructor.call(this), this.changeModel(new jsTunnelModel(tunnel, service, ifnode, isadding, iftree));
    var divTunnel = this.addChild(new jsFieldSetController, "divTunnel");
    divTunnel.addChild(new jsPPPController(tunnel, service, ifnode, iftree, isadding), "PPP"), this.ifaceTypes.client = {
        type: jsTunnelClientView
    }, this.ifaceTypes.client.options = {
        inputPadding: "200px"
    }
}

function jsTunnelClientView(ctrl, viewInx, options) {
    var obj, type, service = (ctrl.model.ifnode, ctrl.model.service),
        tunnel = ctrl.model.tunnel;
    ctrl.model.iftree, type = tunnel ? tunnel.type : ctrl.model.service.contype;
    var divTunnel = ctrl.getChild("divTunnel");
    divTunnel.nextIface = "client", divTunnel.ifaceTypes.client.options = {
        nothing: !0
    }, divTunnel.ifaceTypes.client.options.hide = "pptp" == type || "l2tp" == type ? !1 : !0, obj = divTunnel.getChild("PPP"), obj.nextIface = "client", opt = obj.ifaceTypes.client.options, this.updateView = function() {
        "l2tp" == service.contype || "pptp" == service.contype ? this.getChild("divTunnel").show() : this.getChild("divTunnel").hide(), jsTunnelClientView.superclass.updateView.call(this)
    }, this.updateModel = function() {
        return ctrl.model.service = ctrl.getChild("divTunnel").getChild("PPP").model.service, 1
    }, jsTunnelClientView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function pageUPnP() {
    pageUPnP.superclass.constructor.call(this), this.upnp = null, this.iftree = null, this.ports = null, this.$grid = null, this.updateView = function(phase) {
        if (pageUPnP.superclass.updateView.apply(this, arguments), "back" == phase && this.upnp) {
            var header = [];
            header.push({
                index: "protocol",
                name: "protocol"
            }), header.push({
                index: "ip",
                name: "IP"
            }), header.push({
                index: "port",
                name: "vserversPortDst"
            }), header.push({
                index: "ext_port",
                name: "vserversPortFw"
            }), header.push({
                index: "comment",
                name: "comment"
            }), this.$grid = this.child("grid").$box.html("					<div class='grid rm'></div>					").find(".grid").lightUIGrid(header, 0, {
                selectable: !1
            });
            for (var i in this.ports) {
                var $row = this.$grid.addRow().row("last");
                $row.col("protocol").fieldval(this.ports[i].protocol), $row.col("ip").fieldval(this.ports[i].addr), $row.col("port").fieldval(this.ports[i].port), $row.col("ext_port").fieldval(this.ports[i].ext_port), $row.col("comment").fieldval(this.ports[i].descr)
            }
        }
        if ("forward" == phase) {
            var upnp = this.upnp;
            this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                if (this.deep.updateModel()) {
                    var enable = this.get("enable").val();
                    this.upnp = {
                        enable: enable
                    }, rootView.showModalOverlay(), device.config.write(66, this.upnp, callback(this, function() {
                        this.upnp = null, rootView.hideModalOverlay(), this.emit("updaterq")
                    }))
                }
            })), this.startForm().add(new nodeCheckBox("enable", upnp), "enable").add(new nodeCaption("IPv4 IGD", "")).add(new node, "grid"), this.endForm()
        }
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([66, 194], callback(this, function(data) {
            is.RPC_SUCCESS(data.rq) && (this.upnp = data.rq.resident.upnp ? data.rq.resident.upnp : data.rq.resident), is.RPC_SUCCESS(data.rq) && (this.ports = data.rq.resident), this.deep.updateView(), rootView.hideModalOverlay()
        }))
    })
}

function pageURLFilterConfig() {
    pageURLFilterConfig.superclass.constructor.call(this), this.settings = null;
    var types = {
        urlfConfTypeExc: "Exclude",
        urlfConfTypeInc: "Include"
    };
    this.add(new nodeCaption("urlfConfLabel"), "url_caption").add(new nodeCheckBox("urlfConfEnable", !1), "url_enable").add(new nodeSelect("urlfConfType", "", {
        disabled: !0
    }), "url_type"), this.updateView = function(phase) {
        if (pageURLFilterConfig.superclass.updateView.apply(this, arguments), "forward" == phase && (this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.save(this.child("url_enable").val(), this.child("url_type").val())
            })), disableFlag(71) && this.getButton("button_save").disable()), "back" == phase) {
            var url_type = this.child("url_type").cleanOptions();
            for (var t in types) t && url_type.addOption(t, types[t])
        }
    }, this.save = function(enable, type) {
        rootView.showModalOverlay(), this.deep.updateModel(), this.settings = {
            enable: enable,
            type: enable ? type : this.settings.type
        }, device.config.write(71, this.settings, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(71, callback(this, function(data) {
            this.deep.updateView(), this.settings = null, is.RPC_SUCCESS(data) && (this.settings = data.resident.urlsetting ? data.resident.urlsetting : data.resident), this.settings && (this.child("url_enable").val(this.settings.enable), this.settings.enable ? this.child("url_type").enable() : this.child("url_type").disable(), this.child("url_type").val(this.settings.type)), rootView.hideModalOverlay()
        }))
    }), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "url_enable":
                var url_type = (this.child("url_enable"), this.child("url_type"));
                value ? url_type.enable() : url_type.disable()
        }
    })
}

function pageURLFilter() {
    pageURLFilter.superclass.constructor.call(this), this.urlist = null, this.config = null, this.$grid = null, this.add(new nodeCaption("urlfAddrLabel", "urlfAddrDescText")).add(new node, "grid"), this.add(new nodeCaption("", "urlfHTTPSWarning")), this.updateModel = function(status) {
        status.error |= !this.$grid.cleanErrors().checkMandatory(!0), this.status = status
    }, this.updateView = function(phase) {
        if (pageURLFilter.superclass.updateView.apply(this, arguments), "forward" == phase && (this.cleanButtonBar().$box.empty(), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel(), this.status.error || (this.save(gridActionConverter(this.$grid)), this.$grid.selection().removeRow())
            }))), "back" == phase) {
            this.$grid = this.child("grid").$box.html("				<div class='grid rm'></div>				<div class='buttonsInline'>					<div class='button add'></div>				</div>			").find(".grid").lightUIGrid([{
                index: "address",
                name: "urlfAddress"
            }, {
                index: "favicon",
                name: ""
            }], 0, {
                selectable: !0
            }), this.$grid.bind("selection.grid", callback(this, function() {
                this.updateRuleButtons()
            })), this.$grid.bind("stopEditing.grid", callback(this, function() {
                this.$grid.cleanErrors()
            })), this.$grid.bind("cellChange.grid", callback(this, function(event, $cell) {
                this.$grid.row($cell.irow()).col("favicon").css({
                    background: "url('" + document.location.protocol + "//" + $cell.fieldval() + "/favicon.ico') no-repeat center center"
                })
            })), this.$grid.colEditable("address", "text", {
                mandatory: !0,
                unique: "soft",
                re: function(value) {
                    return "http" == value.substr(0, 4) ? "urlfSchemaError" : null
                }
            }), this.get("grid").addButton("add").getButton("add").bind("click.button", callback(this, function() {
                this.$grid.find("thead tr td.selectable input").attr("checked", !1);
                var $row = this.$grid.addRow().row("last");
                $row.col("address").trigger("click")
            })), this.get("grid").addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function() {
                this.$grid.find("thead tr td.selectable input").attr("checked", !1), this.$grid.selection().hide(), this.updateRuleButtons()
            }));
            for (var i = 0; this.urlist && i < this.urlist.length; i++) {
                var $row = this.$grid.addRow().row("last"),
                    ufilter = this.urlist[i];
                $row.col("address").fieldval(ufilter.url), $row.col("favicon").css({
                    background: "url('" + document.location.protocol + "//" + ufilter.url + "/favicon.ico') no-repeat center center"
                })
            }
            this.$grid.resetAll(), this.updateRuleButtons = function() {
                this.$grid.selection().not(":hidden").length ? this.get("grid").getButton("button_del").enable() : this.get("grid").getButton("button_del").disable()
            }, disableFlag(72) && (this.get("grid").getButton("add").disable(), this.get("grid").getButton("button_del").disable(), this.getButton("button_save").disable())
        }
    }, this.save = function(actions) {
        if (actions.count) {
            rootView.showModalOverlay();
            for (var urlist = this.urlist, arrUrl = {}, iul = 0; iul < urlist.length; iul++) arrUrl[urlist[iul].url.toLowerCase()] = 1;
            var query = {
                remove: [],
                write: []
            };
            if (actions.deleted.length && actions.deleted.length == this.$grid.nrow() - this.$grid.newRows().length) query.remove.push([72, {
                clear: !0
            }]);
            else
                for (var i = 0; i < actions.deleted.length; i++) query.remove.push([72, this.urlist[actions.deleted[i]], actions.deleted[i]]), arrUrl[this.urlist[actions.deleted[i]].url] = 0;
            for (var temp = actions.changed.concat(actions.added), r_temp = actions.r_changed.concat(actions.r_added), i = 0; i < temp.length; i++) {
                var $row = this.$grid.row(temp[i]),
                    arr = $row.col("address").fieldval().toLowerCase().split("."),
                    urlstr = [],
                    fgwww = !1;
                urlstr.push(arr[arr.length - 1]), urlstr.push(arr[arr.length - 1]);
                for (var ia = arr.length - 2; ia >= 0; ia--) urlstr[0] = arr[ia] + "." + urlstr[0], "www" == arr[ia] ? fgwww = !0 : urlstr[1] = arr[ia] + "." + urlstr[1];
                fgwww || (urlstr[0] = "www." + urlstr[0]);
                for (var ia = 0; ia < urlstr.length; ia++) arrUrl[urlstr[ia]] || (arrUrl[urlstr[ia]] = 1, query.write.push([72, {
                    url: urlstr[ia]
                }, $row.isNew() ? -1 : r_temp[i]]))
            }
            this.config && 0 == this.config.enable && alert(lng("urlfOff")), device.config.multi(query, callback(this, function() {
                this.update()
            }))
        }
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read([72, 71], callback(this, function(data) {
            this.urlist = is.RPC_SUCCESS(data) ? data.rq[0].resident : null, this.config = is.RPC_SUCCESS(data) ? data.rq[1].resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update)
}

function pageVirtServ() {
    function isRmAccessHide() {
        var acr = window.access_rights;
        return acr && !_.isUndefined(acr.httpaccess) && 0 == acr.httpaccess
    }
    pageVirtServ.superclass.constructor.call(this), this.add(new nodeCaption("vserversCapt")), this.add(new node, "grid"), isRmAccessHide() || (this.add(new nodeCaption("rmtAccessLabel")), this.add(new node, "grid_rmacc")), this.updateView = function(phase) {
        function getConnName(name_iface) {
            var connection = iflist[name_iface];
            for (var i in connections)
                if (connections[i].name == name_iface) return connections[i].name;
            return connection ? connection.name : iface
        }

        function isIpv6Connection(connection) {
            var types = ["ipv6", "pppv6", "pppdual"];
            return _.contains(types, connection.type)
        }
        if (pageVirtServ.superclass.updateView.apply(this, arguments), "forward" == phase);
        else {
            var header = [{
                index: "name",
                name: "vserversName"
            }, {
                index: "iface",
                name: "vserversIface"
            }, {
                index: "protocol",
                name: "vserversProtocol"
            }, {
                index: "port_fw",
                name: "vserversPortFw"
            }, {
                index: "port_dst",
                name: "vserversPortDst"
            }, {
                index: "ip_dst",
                name: "vserversIPDst"
            }, {
                index: "remote_ip",
                name: "vserversRemoteIp"
            }];
            if (header.push({
                    index: "enable_snat",
                    name: "vserversStatusSnat"
                }), !isRmAccessHide()) var header_rmacc = [{
                index: "ips",
                name: "ip_address"
            }, {
                index: "source_mask",
                name: "masq"
            }, {
                index: "sport",
                name: "rmtAccessPortS"
            }, {
                index: "dport",
                name: "vserversPortDst"
            }];
            var $grid = this.get("grid").$box.lightUIGrid(header, 0, {
                clickable: !0,
                selectable: !0,
                id: "grid1"
            });
            if (this.cleanButtonBar().addButton("add").getButton("add").unbind("click.button").bind("click.button", context(this).callback(function() {
                    this.edit(this.iftree, this.lanClients)
                })), !isRmAccessHide()) var $grid_rmacc = this.get("grid_rmacc").$box.lightUIGrid(header_rmacc, 0, {
                clickable: !0,
                selectable: !1,
                id: "mac",
                hide: !0
            });
            var $row, rule, iface, name_iface, json = this.json,
                connections = (this.rmaccess, this.use_ports, getConnArray(this.iftree)),
                iflist = {};
            _.each(connections, function(connection) {
                isIpv6Connection(connection) || (iface = connection.iface, name_iface = connection.name, iface && (iflist[iface] = connection))
            });
            for (var i in json) {
                if (rule = json[i], $row = $grid.addRow().row("last"), $row.col("name").html(rule.name), "all" == rule.source_iface ? $row.col("iface").html(lng("all_")).attr("langkey", "all_").data("iface", "all") : $row.col("iface").html(getConnName(rule.source_iface)).data("iface", rule.source_iface), "ipsec" == rule.type) $row.col("protocol").html("UDP,UDP").data("proto", "udp"), $row.col("port_fw").html("500,4500"), $row.col("port_dst").html("500,4500");
                else if ("sftp" == rule.type) $row.col("protocol").html("TCP,TCP"), $row.col("port_fw").html("22,115"), $row.col("port_dst").html("22,115");
                else if ("pcanywhere" == rule.type) $row.col("protocol").html("TCP,UDP"), $row.col("port_fw").html("5631,5632"), $row.col("port_dst").html("5631,5632");
                else {
                    $row.col("protocol").html(vservProtoNames[rule.proto]).data("proto", rule.proto);
                    var sign = rule.ports_end ? ":" : "";
                    $row.col("port_fw").html(rule.ports_begin + sign + rule.ports_end), sign = rule.portd_end ? ":" : "", $row.col("port_dst").html(rule.portd_begin + sign + rule.portd_end)
                }
                $row.col("ip_dst").html(rule.ipd), $row.col("remote_ip").html(rule.remote_ip), $row.col("enable_snat").html(rule.enable_snat ? '<img src="image/ledgreen.gif">' : '<img src="image/ledred.gif">')
            }
            if (!isRmAccessHide()) {
                for (var i in this.rmaccess) {
                    var access = this.rmaccess[i],
                        $row_rmacc = $grid_rmacc.addRow().row("last");
                    $row_rmacc.col("ips").fieldval(access.ips), $row_rmacc.col("source_mask").fieldval("" == access.source_mask ? "-" : access.source_mask), $row_rmacc.col("sport").fieldval("" == access.sport ? "-" : access.sport), $row_rmacc.col("dport").fieldval(access.dport)
                }
                $grid_rmacc.bind("click", callback(this, function() {
                    confirm(lng("GoToRemAcc")) && (window.location.hash = "#advanced/remoteaccess")
                }))
            }
            $grid.bind("selection.grid", callback(this, function() {
                this.updateRuleButtons()
            })), this.cleanButtonBar(), this.get("grid").addButton("add").getButton("add").unbind("click.button").bind("click.button", context(this).callback(function() {
                this.edit(this.iftree, this.lanClients, null, null, this.use_ports)
            })), this.get("grid").addButton("button_del").getButton("button_del").disable().bind("click.button", callback(this, function() {
                this.clearServer(json, $grid)
            })), this.get("grid").addButton("clearall").getButton("clearall").bind("click.button", context(this).callback(function() {
                this.clear()
            })), this.updateRuleButtons = function() {
                $grid.selection().not(":hidden").length ? this.get("grid").getButton("button_del").enable() : this.get("grid").getButton("button_del").disable(), json && json.length || this.getButton("clearall").hide()
            }, $grid.unbind("rowclick.grid").bind("rowclick.grid", context(this).callback(function(event, $row) {
                var rule = {
                    name: $row.col("name").html(),
                    source_iface: $row.col("iface").data("iface"),
                    proto: $row.col("protocol").data("proto"),
                    ports_begin: $row.col("port_fw").html().split(":")[0],
                    ports_end: $row.col("port_fw").html().split(":")[1],
                    portd_begin: $row.col("port_dst").html().split(":")[0],
                    portd_end: $row.col("port_dst").html().split(":")[1],
                    ipd: $row.col("ip_dst").html(),
                    remote_ip: $row.col("remote_ip").html(),
                    type: this.json[$row.irow()].type ? this.json[$row.irow()].type : "",
                    enable_snat: this.json[$row.irow()].enable_snat ? this.json[$row.irow()].enable_snat : !1
                };
                this.edit(this.iftree, this.lanClients, rule, $row.irow(), this.use_ports)
            }))
        }
    }, this.clearServer = function(ruleall, grid) {
        for (var rmlist = new Array, i = grid.nrow(); i >= 0; i--) grid.row(i).hasClass("selected") && rmlist.push([10, ruleall[i], i]);
        rmlist.length && (rootView.showModalOverlay(), device.config.remove(rmlist, callback(this, function() {
            this.onupdaterq()
        })))
    }, this.clear = function() {
        confirm(lng("vserversClear")) && (rootView.showModalOverlay(), device.config.remove(10, {
            clear: !0
        }, context(this).callback(function() {
            this.onupdaterq()
        })))
    }, this.edit = function(iftree, lanClients, rule, pos, use_ports) {
        this.use_ports = use_ports, is.unset(pos) && (pos = -1), this.$box.unbind();
        var ruleNode = new ruleVirtServ(iftree, lanClients, rule, null, null, use_ports);
        ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", context(this).callback(function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), is.object(rule) && ruleNode.addButton("button_del").getButton("button_del").bind("click.button", context(this).callback(function() {
            device.config.remove(10, ruleNode.rule, pos, context(this).callback(function() {
                this.emit("updaterq")
            }))
        })), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", context(this).callback(function() {
            ruleNode.deep.updateModel();
            for (var newRulePorts = {
                    begin: parseInt(ruleNode.rule.ports_begin),
                    end: parseInt(ruleNode.rule.ports_end)
                }, i = ({
                    begin: parseInt(ruleNode.rule.ports_begin),
                    end: parseInt(_.isEmpty(ruleNode.rule.ports_end) ? ruleNode.rule.ports_begin : ruleNode.rule.ports_end)
                }, 0); i < this.json.length; i++)
                if (pos != i && !("all" != this.json[i].source_iface && this.json[i].source_iface != ruleNode.rule.source_iface && "all" != ruleNode.rule.source_iface || "tcp/udp" != this.json[i].proto && this.json[i].proto != ruleNode.rule.proto && "tcp/udp" != ruleNode.rule.proto)) {
                    var exRulePorts = {
                        begin: parseInt(this.json[i].ports_begin),
                        end: parseInt(this.json[i].ports_end)
                    };
                    if (exRulePorts.end) {
                        if (newRulePorts.end) {
                            if (newRulePorts.begin > exRulePorts.begin - 1 && newRulePorts.begin < exRulePorts.end + 1 || newRulePorts.end > exRulePorts.begin - 1 && newRulePorts.end < exRulePorts.end + 1 || exRulePorts.begin > newRulePorts.begin - 1 && exRulePorts.begin < newRulePorts.end + 1 || exRulePorts.end > newRulePorts.begin - 1 && exRulePorts.end < newRulePorts.end + 1) {
                                alert(lng("PortsInUse")), ruleNode.status.error = !0;
                                break
                            }
                        }
                        else if (newRulePorts.begin > exRulePorts.begin - 1 && newRulePorts.begin < exRulePorts.end + 1) {
                            alert(lng("PortInUse")), ruleNode.status.error = !0;
                            break
                        }
                    }
                    else if (newRulePorts.end) {
                        if (exRulePorts.begin > newRulePorts.begin - 1 && exRulePorts.begin < newRulePorts.end + 1) {
                            alert(lng("PortsInUse")), ruleNode.status.error = !0;
                            break
                        }
                    }
                    else if (newRulePorts.begin == exRulePorts.begin) {
                        alert(lng("PortInUse")), ruleNode.status.error = !0;
                        break
                    }
                }
            var flattenPorts = _.flatten(_.values(this.use_ports));
            if ("" != ruleNode.rule.ports_end) {
                for (var ports_array = [], i = 0; i < parseInt(ruleNode.rule.ports_end) - parseInt(ruleNode.rule.ports_begin); i++) ports_array[i] = parseInt(ruleNode.rule.ports_begin) + i;
                for (var j = 0; j < flattenPorts.length; j++)
                    if (-1 != _.indexOf(ports_array, flattenPorts[j], !0)) {
                        alert(lng("MessagePortUsed")), ruleNode.status.error = !0;
                        break
                    }
            }(parseInt(ruleNode.rule.ports_end) < parseInt(ruleNode.rule.ports_begin) || parseInt(ruleNode.rule.portd_end) < parseInt(ruleNode.rule.portd_begin)) && (alert(lng("checkOutRange")), ruleNode.status.error = !0), ruleNode.status.error || (rootView.showModalOverlay(), device.config.write(10, ruleNode.rule, pos, context(this).callback(function() {
                rootView.hideModalOverlay(), this.emit("updaterq")
            })))
        }))
    }, this.onupdaterq = function() {
        rootView.showModalOverlay(), device.config.read([10, 1, 187, 16, null], context(this).callback(function(data) {
            rootView.hideModalOverlay(), this.json = is.RPC_SUCCESS(data.rq) ? data.rq.resident.vserver : [], this.iftree = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.lanClients = is.RPC_SUCCESS(data.rq) ? data.rq.resident : [], this.rmaccess = is.RPC_SUCCESS(data.rq) ? data.rq.resident.httpaccess : null, this.use_ports = {
                voip: [],
                fax: [],
                rmaccess: []
            };
            for (var i = 0; this.rmaccess && i < this.rmaccess.length; i++) this.use_ports.rmaccess[i] = parseInt(this.rmaccess[i].sport);
            this.use_ports.rmaccess = _.uniq(this.use_ports.rmaccess), this.deep.updateView()
        }))
    }, this.bind("updaterq", this.onupdaterq)
}

function wizardVirtServ() {
    wizardVirtServ.superclass.constructor.call(this), this.updateView = function(phase) {
        if (pageVirtServ.superclass.updateView.apply(this, arguments), "forward" == phase) {
            var ruleNode = new ruleVirtServ(this.iftree, this.lanClients, null, null, null, this.use_ports);
            ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox).cleanButtonBar().addButton("apply").getButton("apply").bind("click.button", context(this).callback(function() {
                ruleNode.deep.updateModel(), this.use_ports_vs = [], this.use_ports_vs_buf = [];
                for (var i = 0; i < this.json.length; i++)("all" == this.json[i].source_iface || this.json[i].source_iface == ruleNode.rule.source_iface || "all" == ruleNode.rule.source_iface) && ("tcp/udp" == this.json[i].proto || this.json[i].proto == ruleNode.rule.proto || "tcp/udp" == ruleNode.rule.proto) && ("" == this.json[i].ports_end ? this.use_ports_vs[this.use_ports_vs.length] = parseInt(this.json[i].ports_begin) : (this.use_ports_vs_buf = _.range(parseInt(this.json[i].ports_begin), parseInt(this.json[i].ports_end) + 1), this.use_ports_vs = _.union(this.use_ports_vs, this.use_ports_vs_buf)));
                if ("" == ruleNode.rule.ports_end) - 1 != _.indexOf(this.use_ports_vs, parseInt(ruleNode.rule.ports_begin)) && (alert(lng("PortInUse")), ruleNode.status.error = !0);
                else
                    for (var j = parseInt(ruleNode.rule.ports_begin); j < parseInt(ruleNode.rule.ports_end) + 1; j++)
                        if (-1 != _.indexOf(this.use_ports_vs, j)) {
                            alert(lng("PortsInUse")), ruleNode.status.error = !0;
                            break
                        } if ("" != ruleNode.rule.ports_end) {
                    for (var ports_array = [], i = 0; i < parseInt(ruleNode.rule.ports_end) - parseInt(ruleNode.rule.ports_begin); i++) ports_array[i] = parseInt(ruleNode.rule.ports_begin) + i;
                    for (var j = 0; j < this.use_ports.length; j++)
                        if (-1 != _.indexOf(ports_array, this.use_ports[j], !0)) {
                            alert(lng("MessagePortUsed")), ruleNode.status.error = !0;
                            break
                        }
                }(parseInt(ruleNode.rule.ports_end) < parseInt(ruleNode.rule.ports_begin) || parseInt(ruleNode.rule.portd_end) < parseInt(ruleNode.rule.portd_begin)) && (alert(lng("checkOutRange")), ruleNode.status.error = !0), ruleNode.status.error || (rootView.showModalOverlay(), device.config.write(10, ruleNode.rule, -1, context(this).callback(function() {
                    rootView.hideModalOverlay(), confirm(lng("wzVSSaveOk") + " " + lng("addOtherRules") + "\n" + lng("clickOKCancel")) ? (window.hasChanges = null, document.location.hash = "#firewall/vservers", location.reload(!0)) : (window.hasChanges = null, document.location.hash = "", location.reload(!0))
                })))
            }))
        }
    }
}

function ruleVirtServ(iftree, lanClients, rule, pos, shortForm, use_ports) {
    if (ruleVirtServ.superclass.constructor.call(this), is.unset(rule) && (rule = {}, this.adding = !0), this.iftree = iftree, this.lanClients = lanClients, this.rule = rule, this.pos = pos, this.shortForm = shortForm, this.use_ports = use_ports, this.updateView = function(phase) {
            function isWan(connection) {
                return connection.L2.is_wan
            }

            function isIpv6Connection(connection) {
                var types = ["ipv6", "pppv6", "pppdual"];
                return _.contains(types, connection.type)
            }
            if (ruleVirtServ.superclass.updateView.apply(this, arguments), "back" == phase) {
                var lanClients = (this.rule, this.lanClients),
                    iftree = this.iftree;
                this.use_ports, this.child("template").cleanOptions();
                for (var i = 0; i < templateList.length; i++) this.child("template").addOption(templateList[i].name, i);
                this.adding ? this.applyTemplate(templateList[this.child("template").val()], this.child("protocol").val()) : this.child("template").disable();
                var ifarray = getConnArray(iftree),
                    iface = this.child("iface");
                iface.cleanOptions().addOption("all_", "all"), _.each(ifarray, function(connection) {
                    isWan(connection) && !isIpv6Connection(connection) && iface.addOption(connection.name, connection.iface)
                }), this.child("protocol").cleanOptions();
                for (var i in vservProtoNames) this.child("protocol").addOption(vservProtoNames[i], i);
                for (var obj, ipd = this.child("ipd"), i = 0; i < lanClients.length; i++) obj = lanClients[i], is.IPv4(obj.ip) && ipd.addRow(obj.ip, obj.mac, obj.hostname);
                shortForm && this.get("protocol").hide()
            }
        }, this.updateModel = function(status) {
            if (!status.error) {
                var type = templateList[this.child("template").val()].type ? templateList[this.child("template").val()].type : "";
                portfwb = this.child("portfwb").val(), portfwe = this.child("portfwe").val(), portdstb = this.child("portdstb").val(), portdste = this.child("portdste").val(), portfwb == portfwe && (portfwe = ""), portdstb == portdste && (portdste = ""), this.rule = {
                    name: this.child("name").val(),
                    source_iface: this.child("iface").val(),
                    proto: this.child("protocol").val(),
                    ports_begin: portfwb.toString(),
                    ports_end: portfwe.toString(),
                    portd_begin: portdstb.toString(),
                    portd_end: portdste.toString(),
                    ipd: this.child("ipd").val(),
                    remote_ip: this.child("ipr").val(),
                    type: type,
                    enable_snat: this.child("snat").val()
                }
            }
            this.status = status
        }, this.onfieldchange = function(status, value) {
            switch (status.target.getAlias()) {
                case "portfwe":
                case "portdste":
                    0 == value && $(status.target.$box).find("input").val("");
                    break;
                case "template":
                    this.applyTemplate(templateList[value]), this.applyProtocol(templateList[value].protocol.split(",")[0]);
                    break;
                case "protocol":
                    this.applyProtocol(value)
            }
        }, this.applyTemplate = function(template) {
            if ("Custom" != template.name) {
                this.child("protocol").val(template.protocol), this.child("protocol").cleanOptions();
                for (var i in vservProtoNames) - 1 != template.protocol.split(",").indexOf(i) && this.child("protocol").addOption(vservProtoNames[i], i)
            }
            else {
                this.child("protocol").cleanOptions();
                for (var i in vservProtoNames) this.child("protocol").addOption(vservProtoNames[i], i)
            }
        }, this.portsVisible = function(visible) {
            visible ? (this.get("protocol").hide(), this.get("portfwb").hide(), this.get("portfwe").hide(), this.get("portdstb").hide(), this.get("portdste").hide()) : (this.shortForm || this.child("protocol").show(), this.get("portfwb").show(), this.get("portfwe").show(), this.get("portdstb").show(), this.get("portdste").show())
        }, this.applyProtocol = function(protocol) {
            var template = templateList[this.child("template").val()];
            $(this.child("portfwb").$box).find("input").val(""), $(this.child("portfwe").$box).find("input").val(""), $(this.child("portdstb").$box).find("input").val(""), $(this.child("portdste").$box).find("input").val(""), "Custom" != template.name && "undefined" != typeof template.ports[protocol] && (this.child("portfwb").val(template.ports[protocol].port_fw.split(":")[0]), this.child("portfwe").val(template.ports[protocol].port_fw.split(":")[1]), this.child("portdstb").val(template.ports[protocol].port_dst.split(":")[0]), this.child("portdste").val(template.ports[protocol].port_dst.split(":")[1])), this.portsVisible(template.hide_ports)
        }, shortForm) value = 0;
    else {
        var obj, value = 0;
        for (var i in templateList)
            if (obj = templateList[i], obj.protocol == rule.proto && obj.ports.port_fw == rule.ports_begin && obj.ports.port_dst == rule.portd_begin || obj.type == rule.type) {
                value = i;
                break
            }
    }
    var flattenPorts = _.flatten(_.values(this.use_ports));
    this.add(new nodeSelect("vserversTemplate", value), "template").add(new nodetext("vserversName", rule.name, {
        mandatory: !0
    }), "name").add(new nodeSelect("vserversIface", rule.source_iface), "iface").add(new nodeSelect("vserversProtocol", rule.proto), "protocol").add(new nodeport("vserversPortFwB", rule.ports_begin, {
        mandatory: !0,
        use_ports: flattenPorts
    }), "portfwb").add(new nodeport("vserversPortFwE", rule.ports_end, {
        use_ports: flattenPorts
    }), "portfwe").add(new nodeportold("vserversPortDstB", rule.portd_begin, {
        mandatory: !0
    }), "portdstb").add(new nodeportold("vserversPortDstE", rule.portd_end), "portdste").add(new nodeComboIP("vserversIPDst", rule.ipd, {
        header: [{
            index: "ip",
            name: "IP"
        }, {
            index: "mac",
            name: "MAC"
        }, {
            index: "host",
            name: "Host"
        }],
        index: "ip",
        version: 4,
        mandatory: !0
    }), "ipd").add(new nodeip("vserversRemoteIp", rule.remote_ip), "ipr").add(new nodeCheckBox("vserversEnableSnat", rule.enable_snat), "snat");
    var count = 0;
    if (use_ports && 0 != use_ports.rmaccess.length) {
        var comment_ports = "",
            first = !0;
        for (i = 0; i < use_ports.rmaccess.length; i++) void 0 != use_ports.rmaccess[i] && (first ? (comment_ports += use_ports.rmaccess[i], first = !1, count += 1) : (comment_ports = comment_ports + ", " + use_ports.rmaccess[i], count += 1));
        if (count > 1) {
            this.add(new nodeCaption(""), "setting");
            var comment = this.get("setting");
            comment.comment = "<i>" + lng("CommentVirtServ1") + " <b>" + comment_ports + " </b>" + lng("CommentVirtServ2") + "</i>"
        }
        else {
            this.add(new nodeCaption(""), "setting");
            var comment = this.get("setting");
            comment.comment = "<i>" + lng("CommentVirtServ3") + " <b>" + comment_ports + " </b>" + lng("CommentVirtServ4") + "</i>"
        }
    }
    this.adding || this.get("template").disable();
    for (var i in templateList)
        if (templateList[i].type == rule.type) {
            this.portsVisible(templateList[i].hide_ports);
            break
        }
    this.bind("fieldchange", this.onfieldchange)
}

function formVlan(__vlan, __pos) {
    formVlan.superclass.constructor.call(this), this.startForm().add(new nodetext("vlanName", __vlan.name, {
        mandatory: !0
    }), "name").add(new nodeCheckBox("vlanEnable", __vlan.en, {
        hidden: "lan" == __vlan.type
    }), "enable").add(new nodeSelect("vlanType", __vlan.type), "type").add(new node, "body"), this.get("type").addOption("vlan_wanu", "wanu").addOption("vlan_want", "want").addOption("vlan_bridge", "bridge"), is.set(__pos) && (this.get("type").disable(), this.get("type").addOption("vlan_lan", "lanu")), this.listen("type", "endform fieldchange", function(__status, __value) {
        switch (__value) {
            case "lanu":
            case "wanu":
                this.replace("body", new formVlanWanU(__vlan, __value));
                break;
            case "lant":
                this.replace("body", new formVlanLanT(__vlan));
                break;
            case "want":
                this.replace("body", new formVlanWanT(__vlan));
                break;
            case "bridge":
                this.replace("body", new formVlanBridge(__vlan))
        }
    }), this.endForm(), this.updateModel = function(__status) {
        return __status.error ? !1 : (__vlan.name = this.get("name").val(), __vlan.en = this.get("enable").val(), void(__vlan.type = this.get("type").val()))
    }
}

function formVlanBridge(__vlan) {
    if (formVlanBridge.superclass.constructor.call(this), this.startForm().add(new nodenum("vlanVid", __vlan.vid, {
            minval: 1,
            maxval: 4094,
            mandatory: !0
        }), "vid").add(new nodeCheckBox("vlanMulticast", __vlan.for_stb, {
            hidden: !0
        }), "multicast"), !hideFlag("vlanqos")) {
        this.add(new nodeSelect("vlanQos", __vlan.qos), "qos");
        for (var i = 0; 8 > i; i++) this.get("qos").addOption(i)
    }
    var freePorts = devu.vlan.getFreePortsU();
    if (freePorts.length) {
        this.add(new nodeCaption("vlanPortsU", ""), "portsCap"), this.add(new nodeOptions(""), "ports");
        for (var p, ports = __vlan.ports, i = 0; i < freePorts.length; i++) p = freePorts[i], this.get("ports").addOption(p, p, _.indexOf(ports, p) >= 0)
    }
    else this.add(new nodestatic("vlanPortsU", "vlanNoFreePortsU", {
        translate: !0
    }), "ports");
    var availPorts = devu.vlan.getFreePortsT("bridge");
    if (availPorts.length) {
        this.add(new nodeCaption("vlanPortsT", "")), this.add(new nodeOptions(""), "portsTag");
        for (var p, portsTag = __vlan.portsTag, i = 0; i < availPorts.length; i++) p = availPorts[i], this.get("portsTag").addOption(p, p, _.indexOf(portsTag, p) >= 0)
    }
    else this.add(new nodestatic("vlanPortsT", "vlanNoFreePortsT", {
        translate: !0
    }), "portsTag");
    this.endForm(), this.updateModel = function(__status) {
        if (__status.error) return !1;
        __vlan.vid = this.get("vid").val();
        var ports = [];
        freePorts.length && !__vlan.vid_range_end && this.get("ports").each(callback(this, function(__inx, __child) {
            __child.val() && ports.push(__child.getAlias())
        }));
        var portsTag = [];
        return availPorts.length && this.get("portsTag").each(callback(this, function(__inx, __child) {
            __child.val() && portsTag.push(__child.getAlias())
        })), portsTag.length ? ports.length + portsTag.length < 2 ? (__status.error = "vlanErrNoPorts2", void alert(lng(__status.error))) : (__vlan.portsTag = portsTag, __vlan.ports = ports, void(hideFlag("vlanqos") || (__vlan.qos = parseInt(this.get("qos").val())))) : (__status.error = "vlanErrNoTagPorts", void alert(lng(__status.error)))
    }, this.bind("fieldchange", function(status) {
        var parentAlias = status.target.parent.getAlias(),
            alias = status.target.getAlias();
        "portsTag" == parentAlias && this.child("ports/" + alias) && this.child("ports/" + alias).val(!1), "ports" == parentAlias && this.child("portsTag/" + alias) && this.child("portsTag/" + alias).val(!1)
    })
}

function formVlanWanT(__vlan) {
    if (formVlanWanT.superclass.constructor.call(this), this.startForm().add(new nodenum("vlanVid", __vlan.vid, {
            minval: 1,
            maxval: 4094,
            mandatory: !0
        }), "vid"), !hideFlag("vlanqos")) {
        this.add(new nodeSelect("vlanQos", __vlan.qos), "qos");
        for (var i = 0; 8 > i; i++) this.get("qos").addOption(i)
    }
    this.add(new nodeSelect("vlanPortT", __vlan.port), "port");
    for (var freePorts = devu.vlan.getWanPorts(), i = 0; i < freePorts.length; i++) this.get("port").addOption(freePorts[i]);
    this.endForm(), this.updateModel = function(__status) {
        return __status.error ? !1 : (__vlan.port = this.get("port").val(), __vlan.vid = this.get("vid").val(), void(hideFlag("vlanqos") || (__vlan.qos = parseInt(this.get("qos").val()))))
    }
}

function formVlanLanT(__vlan) {
    formVlanLanT.superclass.constructor.call(this), this.startForm().add(new nodenum("vlanVid", __vlan.vid, {
        minval: 1,
        maxval: 4094,
        mandatory: !0
    }), "vid");
    var availPorts = devu.vlan.getLanPorts(/wifi/i);
    if (availPorts.length) {
        this.add(new nodeCaption("vlanPortsT", "")), this.add(new nodeOptions(""), "portsTag");
        for (var p, portsTag = __vlan.portsTag, i = 0; i < availPorts.length; i++) p = availPorts[i], this.get("portsTag").addOption(p, p, _.indexOf(portsTag, p) >= 0)
    }
    else this.add(new nodestatic("vlanPortsT", "vlanNoFreePortsT", {
        translate: !0
    }), "portsTag");
    this.endForm(), this.updateModel = function(__status) {
        if (__status.error) return !1;
        var portsTag = [];
        return availPorts.length && this.get("portsTag").each(callback(this, function(__inx, __child) {
            __child.val() && portsTag.push(__child.getAlias())
        })), portsTag.length ? (__vlan.portsTag = portsTag, void(__vlan.vid = this.get("vid").val())) : (__status.error = "vlanErrNoTagPorts", void alert(lng(__status.error)))
    }
}

function formVlanWanU(__vlan) {
    formVlanWanU.superclass.constructor.call(this), this.startForm().add(new nodeCheckBox("vlanMulticast", __vlan.for_stb, {
        hidden: !0
    }), "multicast");
    var freePorts = devu.vlan.getFreePortsU();
    if (this.add(new nodeCaption("vlanPortsU", "")), freePorts.length) {
        this.add(new nodeOptions(""), "ports");
        for (var p, ports = __vlan.ports, i = 0; i < freePorts.length; i++) p = freePorts[i], this.get("ports").addOption(p, p, _.indexOf(ports, p) >= 0);
        if ("wanu" == __vlan.type) {
            var wanPorts = _.filter(freePorts, function(value) {
                return value.match(/internet/) || value.match(/wifi/)
            });
            if (1 == wanPorts.length) {
                var childrens = this.get("ports").children;
                for (var child in childrens) childrens[child].options && childrens[child].options.optionName == wanPorts[0] && (childrens[child].value = !0, childrens[child].options.disabled = !0)
            }
        }
    }
    else this.add(new nodestatic("", "vlanNoFreePortsU", {
        translate: !0
    }), "ports");
    this.endForm(), this.updateModel = function(__status) {
        if (__status.error) return !1;
        var ports = [];
        freePorts.length && this.get("ports").each(callback(this, function(__inx, __child) {
            __child.val() && ports.push(__child.getAlias())
        })), ports.length || (__status.error = "vlanErrNoPorts", alert(lng(__status.error))), __vlan.ports = ports
    }
}

function pageVlan() {
    pageVlan.superclass.constructor.call(this), this.add(new node, "grid"), this.bind("updaterq", function() {
        rootView.showModalOverlay(), devu.vlan.pull(callback(this, function() {
            rootView.hideWaitScreen(), rootView.hideModalOverlay(), this.deep.updateView()
        }), callback(this, function() {
            rootView.hideModalOverlay(), node.prototype.updateView.call(this, "forward"), this.$box.errorBlock(lng("error"), lng("rpcReadError"), null, lng("refresh"), callback(this, function() {
                this.emit("updaterq")
            }))
        }))
    }), this.updateView = function(__phase) {
        function addButtonsToForm(__form, __v, __pos) {
            function onApply() {
                this.emit("updaterq")
            }

            function applyVlan() {
                rootView.showWaitScreen(lng("pleaseWait"), 3e4), setTimeout(context(this).callback(function() {
                    device.stop()
                }), 5e3), setTimeout(callback(this, onApply), 2e4), devu.vlan.push(callback(this, onApply), callback(this, function(status) {
                    status || alert(lng("rpcWriteError")), this.emit("updaterq")
                }))
            }

            function getNames(services) {
                return _.map(services, function(__value) {
                    return __value.tunnels && _.size(__value.tunnels) ? _.values(__value.tunnels)[0].name : __value.name
                })
            }
            if (this.cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", callback(this, function() {
                    (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
                })), is.set(__pos)) {
                this.addButton("button_del");
                var services = devu.vlan.hasServices(__v);
                services && _.size(services) ? /^(lant|lanu)$/i.test(__v.type) ? this.getButton("button_del").bind("click.button", callback(this, function() {
                    alert(lng("vlanKillAllLan") + " " + getNames(services).toString() + ".")
                })) : this.getButton("button_del").bind("click.button", callback(this, function() {
                    alert(lng("vlanKillAllConns3") + " " + getNames(services).toString() + ".")
                })) : this.getButton("button_del").bind("click.button", callback(this, function() {
                    confirm(lng("vlanDelConfirm")) && applyVlan.call(this)
                }))
            }
            "lanu" == __v.type && this.getButton("button_del").disable(), devu.vlan.__NOT_DELETE_WAN && "wanu" == __v.type && this.getButton("button_del").disable(), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                if (__form.deep.updateModel()) {
                    if (is.set(__pos)) var err = devu.vlan.set(__pos, __v);
                    else var err = devu.vlan.add(__v);
                    if (err) switch (err) {
                        case "vlanLimitWanU":
                            alert(lng(err) + " " + devu.vlan.__VLAN_WANU_LIMIT + ".");
                            break;
                        case "vlanLimitWanT":
                            alert(lng(err) + " " + devu.vlan.__VLAN_WANT_LIMIT + ".");
                            break;
                        case "vlanLimitWan":
                            alert(lng(err) + " " + devu.vlan.__VLAN_WAN_LIMIT + ".");
                            break;
                        case "vlanLimitGroup":
                            alert(lng(err) + " " + devu.vlan.__VLAN_LIMIT + ".");
                            break;
                        default:
                            alert(lng(err))
                    }
                    else debug(devu.vlan.commit()), applyVlan.call(this)
                }
            }))
        }
        if (pageVlan.superclass.updateView.apply(this, arguments), "back" == __phase) {
            for (var wc = devu.vlan.show(), header = [{
                    index: "name",
                    name: "vlanName"
                }, {
                    index: "type",
                    name: "vlanType"
                }, {
                    index: "portsU",
                    name: "vlanPortsU"
                }, {
                    index: "portT",
                    name: "vlanPortsT"
                }, {
                    index: "vid",
                    name: "vlanVid"
                }, {
                    index: "enable",
                    name: "vlanEnable"
                }], $grid0 = this.cleanButtonBar().child("grid").$box.html("				<div class='grid rm' style=''></div>				<div class='buttonsInline'>				<div class='button add'></div>                                </div>			").find(".grid").lightUIGrid(header, 0, {
                    clickable: !0
                }), i = 0; i < wc.length; i++) {
                var $row = $grid0.addRow().row("last"),
                    v = wc[i],
                    en = v.en ? "yes" : "no",
                    type = "vlan_" + v.type;
                "vlan_lanu" == type && (type = "vlan_lan"), $row.col("name").html(v.name), $row.col("type").html(lng(type)).attr("langkey", v.type);
                var ports = {
                    tag: "",
                    untag: ""
                };
                ports.untag = v.ports ? v.ports.toString() : "", ports.tag = v.portsTag && v.portsTag.length > 0 ? v.portsTag.toString() : v.port ? v.port : "", ports.untag = ports.untag.replace("port5", lng("port5")), ports.tag = ports.tag.replace("port5", lng("port5")), $row.col("portsU").html(ports.untag), $row.col("portT").html(ports.tag), $row.col("vid").html((v.vid || "") + (v.vid_range_end ? "-" + v.vid_range_end : "")), $row.col("enable").html(lng(en)).attr("langkey", en), $row.data("pos", v.pos)
            }
            $grid0.bind("rowclick.grid", callback(this, function(__event, __$row) {
                var pos = __$row.data("pos"),
                    v = devu.vlan.cut(pos),
                    form = new formVlan(v, pos);
                addButtonsToForm.call(this, form, v, pos), form.deep.updateView(this.$box)
            })), this.cleanButtonBar().addButton("add").getButton("add").bind("click.button", callback(this, function() {
                var v = {
                        type: "want",
                        en: !0
                    },
                    form = new formVlan(v);
                addButtonsToForm.call(this, form, v), form.deep.updateView(this.$box)
            }))
        }
    }
}

function getLockers(iftree, ifname) {
    for (var i in iftree) {
        var services = iftree[i].services;
        if (services) {
            if (!iftree[i].is_wan) continue;
            for (var j in services) {
                var service = services[j],
                    tunnels = service.tunnels;
                if (tunnels && getObjectLength(tunnels))
                    for (var t in tunnels)
                        if (t == ifname) {
                            var lock = service.lock;
                            if (lock) return lock
                        }
                if (j == ifname) {
                    var lock = service.lock;
                    if (lock) return lock
                }
            }
        }
    }
}

function getLockersConnMsg(lockers) {
    var msg = lng("rejectDelAttention") + "\n";
    for (var lock in lockers)
        for (var menu = getMenuName(lock), i = 0; i < lockers[lock].length; i++) msg += lng("rejectDelConnection") + " " + lockers[lock][i].name + " " + lng("rejectDelAssign") + " " + menu + ".\n";
    return msg
}

function getConnName(iftree, ifname) {
    for (var i in iftree)
        if (iftree[i].is_wan && iftree[i].services) {
            var services = iftree[i].services;
            for (var j in services) {
                if (j == ifname) return services[j].name;
                if (services[j].tunnels) {
                    var tunnels = services[j].tunnels;
                    for (var t in tunnels)
                        if (t == ifname) return tunnels[t].name
                }
            }
        }
    return null
}

function getMenuName(lock) {
    switch (lock) {
        case "voip":
            return lng("menu_voice");
        case "tr":
            return lng("menu_tr69");
        case "ddns":
            return lng("menu_ddns");
        case "firewall.zones":
            return lng("menu_firewall_zone");
        case "firewall.rules":
            return lng("menu_firewall_rules");
        case "firewall.masquerade":
            return lng("menu_firewall_masquerade")
    }
}

function getMenuPath(lock) {
    switch (lock) {
        case "voip":
            return "voice/voip_basic";
        case "tr":
            return "advanced/tr69";
        case "ddns":
            return "advanced/ddns"
    }
}

function jsWANIGMPModel(service, isadding, wansIGMP) {
    jsWANIGMPModel.superclass.constructor.call(this), this.service = service, this.isadding = isadding, this.wansIGMP = wansIGMP
}

function jsWANIGMPController(service, isadding, wansIGMP) {
    jsWANIGMPController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsWANIGMPClientView
    }, this.ifaceTypes.summary = {
        type: jsWANIGMPSummaryView
    }, this.changeModel(new jsWANIGMPModel(service, isadding, wansIGMP)), service.snoop ? service.snoop_mode : "off", service.is_wan && this.addChild(new jsInputController(service.igmp), "igmp")
}

function jsWANIGMPClientView(ctrl, viewInx, options) {
    var service = ctrl.model.service,
        isadding = ctrl.model.isadding,
        wansIGMP = ctrl.model.wansIGMP;
    if (service.is_wan) {
        hide = !1;
        var visib = !0;
        if (visib) {
            if (obj = ctrl.getChild("igmp"), obj.nextIface = "checkbox", obj.ifaceTypes.checkbox.options = {
                    humanName: "wanIgmp",
                    valset: {
                        on: !0,
                        off: !1
                    },
                    hide: hide
                }, service.tunnels)
                for (var key in service.tunnels) var ifname = service.tunnels[key].ifname;
            else var ifname = service.ifname;
            if (wansIGMP && wansIGMP.length) {
                var str_wans = "";
                for (var index in wansIGMP) str_wans += ("" != str_wans ? ", " : "") + wansIGMP[index].name;
                wansIGMP[index].ifname != ifname && (obj.ifaceTypes.checkbox.options.comment = lng("wanIGMPbanned") + " ( " + str_wans + " )"), (isadding || !service.igmp) && (obj.ifaceTypes.checkbox.options.disabled = !0, obj.model.value = !1)
            }
        }
    }
    jsWANIGMPClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.updateModel = function() {
        var res = jsWANIGMPClientView.superclass.updateModel.call(this);
        if (res) {
            var service = this.ctrl.model.service;
            service.is_wan && (service.igmp = this.getChild("igmp").ctrl.model.value)
        }
        return res
    }
}

function jsWANIGMPSummaryView(ctrl, viewInx, options) {
    var visib = !0;
    if (visib) {
        var obj = ctrl.getChild("igmp");
        obj.nextIface = "checkbox";
        var opt = obj.ifaceTypes.checkbox.options = {
                humanName: "wanIgmp",
                hide: hide
            },
            service = ctrl.model.service;
        opt.hide = "3g" == service.contype || "lte" == service.type || "pppv6" == service.type || "ipv6" == service.type || 4 == service.level
    }
    jsWANIGMPSummaryView.superclass.constructor.call(this, ctrl, viewInx, options)
}

function jsWansController() {
    jsWansController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsWansClientView
    }, this.ifaceTypes.client.options = {
        inputPadding: "200px"
    }, this.addChild(new jsWanSetController, "wanset"), this.onupdaterq = function() {
        window.hasChanges = null, this.getChild("wanset").event("updaterq")
    }, this.addEventHandler("updaterq", this.onupdaterq)
}

function jsWansClientView(ctrl, viewInx, options) {
    jsWansClientView.superclass.constructor.call(this, ctrl, viewInx, options), this.options.title = {
        name: "menu_ethernet",
        type: "text"
    }, this.options.nothing = !0, this.onrecselect = function(recordInx) {
        return this.isadding = 0 > recordInx, this.getChild("wanset").options.editBoxSel = this.viewBoxSel, this.getChild("wanset").drawView(), !1
    }, this.onupdmodel = function() {
        if (this.options.buttons = hideFlag("wan_button_del") ? [{
                name: "add",
                value: "add",
                handler: this.add
            }] : [{
                name: "button_del",
                value: "button_del",
                handler: this.del
            }, {
                name: "add",
                value: "add",
                handler: this.add
            }], this.drawView(), disableFlag("ifaces.wan"))
            for (var buttons = this.options.buttons, i = 0; i < buttons.length; i++)("add" == buttons[i].name || "button_del" == buttons[i].name) && this.disableButton(buttons[i].name);
        return this.hideModalOverlay(), !1
    }, this.del = function() {
        var table = $(this.viewBoxSel).find("table tr"),
            massdel = [],
            data = [];
        if (table.each(function(index) {
                $(this).find("td:eq(0) input").prop("checked") && 0 != index && massdel.push(index - 1)
            }), massdel.length)
            for (var i = 0; i < massdel.length; i++) data.push(this.ctrl.getChild("wanset").model.recordSet[massdel[i]].ifaceL3);
        data.length && (this.ctrl.getChild("wanset").data = data, this.ctrl.getChild("wanset").event("deleterulerq"))
    }, this.add = function() {
        this.disableButton("add"), this.ctrl.getChild("wanset").event("recselect", -1)
    }, this.disgw = function() {
        this.ctrl.getChild("wanset").event("disgw")
    }, this.bind("recselect", this.onrecselect), this.bind("updmodel", this.onupdmodel)
}

function jsWanSetController() {
    jsWanSetController.superclass.constructor.call(this), this.ifaceTypes.client = {
        type: jsWanSetClientView
    };
    var header = [];
    hideFlag("wan_button_del") || header.push({
        key: "remove",
        name: ""
    }), header.push({
        key: "name",
        name: "wanName"
    }), header.push({
        key: "srvType",
        name: "wanType"
    }), header.push({
        key: "l2Param",
        name: "wanPort"
    }), header.push({
        key: "statusText",
        name: "wanStatus"
    }), header.push({
        key: "direction",
        name: "wanDirection"
    }), header.push({
        key: "gwif",
        name: "wanGwIf"
    }), this.ifaceTypes.client.options = {
        header: header
    }, this.ifaceTypes.server = {
        type: jsWanSetServerView
    }, this.ifaceTypes.server.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.ifaceTypes.serverGwif = {
        type: jsWanSetGwifServerView
    }, this.ifaceTypes.serverGwif.options = {
        action: "index.cgi",
        plainIface: !0
    }, this.changeModel(new jsRecordSetModel), this.nextIface = "server", this.addIface(), this.nextIface = "serverGwif", this.addIface(), this.addServices = function(ifnode, srvsname) {
        var jj, service, obj, contype, contypeTab, patt, typeisv6, services = ifnode[srvsname];
        if (services)
            for (var j in services)
                if (service = services[j], service.ifname = "create" == j ? "" : j, "br0" == service.ifname && setCookie("lan_ip", service.ip), ifnode.is_wan) {
                    var tunnels = service.tunnels;
                    if (tunnels && getObjectLength(tunnels))
                        for (var t in tunnels) tunnel = tunnels[t], tunnel.ifname = "create" == t ? "" : t, jj = this.model.recordSet.length, this.model.recordSet.push({}), obj = this.model.recordSet[jj], obj.name = tunnel.name ? tunnel.name : tunnel.ifname, obj.typeL2 = service.type, obj.ifaceL2 = service.ifname, contypeTab = contype = getConnType(ifnode, service, tunnel), obj.srvType = replaceCustom(connTypeValSet[contypeTab]), obj.enableText = lng(tunnel.enable ? "yes" : "no"), "pptp" != contype && "l2tp" != contype && "624" != contype && (obj.gwif = {
                            value: tunnel.gwif || service.gwif,
                            type: "radio",
                            extrattrs: {}
                        }), obj.l2Param = this.getL2Param(ifnode), obj.ifaceL3 = tunnel.ifname, obj.ifnode = ifnode, obj.srvnode = service, obj.tnlnode = tunnel, obj.statusText = this.getConnectionStatus(service, tunnel), obj.direction = ifnode.is_wan ? "WAN" : "LAN";
                    else "auto" != service.type && (jj = this.model.recordSet.length, this.model.recordSet.push({}), obj = this.model.recordSet[jj], obj.srvsname = srvsname, obj.name = (service.name ? service.name : service.ifname).toString(), obj.typeL2 = ifnode.type, obj.srvType = replaceCustom(connTypeValSet[getConnType(ifnode, service)]), obj.enableText = lng(service.enable ? "yes" : "no"), patt = /.*v6$/, typeisv6 = patt.test(service.type), typeisv6 || (obj.gwif = {
                        value: service.gwif,
                        type: "radio",
                        extrattrs: {}
                    }, "bridge" == service.type && (obj.gwif.extrattrs.disabled = !0)), "bridge" != this.model.recordSet[jj].srvType && ifnode.is_wan || (obj.gwif.extrattrs.disabled = ""), obj.ifaceL2 = ifnode.ifname, obj.l2Param = this.getL2Param(ifnode), obj.ifaceL3 = service.ifname, obj.ifnode = ifnode, obj.srvnode = service, obj.statusText = this.getConnectionStatus(service, {}), obj.direction = ifnode.is_wan ? "WAN" : "LAN");
                    obj && this.no_gwif && (obj.gwif && obj.gwif.value || obj.gwifv6 && obj.gwifv6.value) && (this.no_gwif = !1)
                }
    }, this.addRecord = function(obj) {
        this.addServices(obj, "services")
    }, this.getL2Param = function(ifnode) {
        var l2Param = "";
        if ("atm" == ifnode.type) l2Param = ifnode.ifname + "(" + ifnode.pvc_settings.vpi + "/" + ifnode.pvc_settings.vci + ")";
        else if ("ethernet" == ifnode.type || "ptm" == ifnode.type || "3g" == ifnode.type || "lte" == ifnode.type) l2Param = ifnode.port ? ifnode.port : "";
        else if ("bridge" == ifnode.type)
            if (ifnode.port) l2Param = ifnode.port;
            else if (ifnode.members) {
            l2Param = "";
            for (var memberNode, desc, i = 0; i < ifnode.members.length - 1; i++) memberNode = this.getIfaceByName(ifnode.members[i]), desc = memberNode && memberNode.port ? memberNode.port : ifnode.members[i], l2Param += desc + ",";
            memberNode = this.getIfaceByName(ifnode.members[ifnode.members.length - 1]), desc = memberNode && memberNode.port ? memberNode.port : ifnode.members[ifnode.members.length - 1], l2Param += desc
        }
        else l2Param = ifnode.ifname;
        else "auto" == ifnode.type && (l2Param = lng("wanAuto"));
        return l2Param = l2Param.replace("Ports:5", lng("port5"))
    }, this.prepareRecordSet = function() {
        var memberNode, obj = this.model.ifTree;
        if (this.model.recordSet = new Array, !obj.baddata) {
            this.no_gwif = !0;
            for (var i in obj)
                if (obj[i]) {
                    if (obj[i].ifname = "create" == i ? "" : i, "bridge" == obj[i].type)
                        for (var j in obj[i].members) memberNode = this.getIfaceByName(obj[i].members[j]), memberNode && (memberNode.inbridge = !0);
                    this.addRecord(obj[i])
                }
            this.updateTable()
        }
    }, this.onrecselect = function(recordInx) {
        var ifname = null,
            srvname = null,
            tnlname = null,
            srvsname = null;
        if (0 > recordInx) recordInx = this.activeRecordInx = 9999;
        else {
            var record = this.model.recordSet[recordInx];
            ifname = record.ifnode.ifname, srvname = record.srvnode.ifname, srvsname = record.srvsname, record.ifnode.ismyiface = !0, record.srvnode.ismyiface = !0, record.tnlnode && (tnlname = record.tnlnode.ifname, record.tnlnode.ismyiface = !0), this.recordInx = recordInx
        }
        this.children = [], this.children_refs = {}, this.childActiveInx = -1;
        var mainTab = this.addChild(new jsConnsMainTabController(this.model.ifTree, ifname, srvname, tnlname, null, null, null, this.model.deviceInfo.factory_wan_mac), "mainTab");
        return mainTab.model.lanClients = this.model.lanClients, mainTab.model.jsonIGMP = this.model.jsonIGMP, mainTab.model.deviceInfo = this.model.deviceInfo, jsWanSetController.superclass.onrecselect.call(this, recordInx)
    }, this.getIfaceByName = function(ifname) {
        return this.model.ifTree[ifname]
    }, this.addEventHandler("recselect", this.onrecselect), this.getConnectionStatus = function(service, tunnel) {
        function getConnection(service, tunnel) {
            return tunnel.gwif && service.gwif ? tunnel.metric && tunnel.metric > service.metric ? service : tunnel : tunnel.gwif || "auto" == service.type ? tunnel : service
        }

        function getStatus(connection) {
            return connection.enable ? connection && connection.connection_status ? "Connected" == connection.connection_status ? lng("statWanUp") + "<img src='image/ledgreen.gif'/>" : "Disconnected" == connection.connection_status ? lng("statWanDown") + "<img src='image/ledred.gif'/>" : lng(connection.connection_status) + "<img src='image/ledyellow.gif'/>" : lng("statWanDown") + "<img src='image/ledred.gif'/>" : lng("disable") + "<img src='image/ledgrey.gif'/>"
        }
        var connection = getConnection(service, tunnel);
        return getStatus(connection)
    }, this.updateTable = function() {
        clearTimeout(window.WAN_LIST_UPDATE), device.config.read([1], callback(this, function(data) {
            obj = data.rq.resident.iface_names;
            for (var i in obj)
                if (obj[i].services)
                    for (var j in obj[i].services) {
                        var service = obj[i].services[j],
                            tunnels = service.tunnels;
                        if (tunnels && !_.isEmpty(tunnels)) var tunnelKey = _.keys(tunnels)[0],
                            tunnel = tunnels[tunnelKey],
                            name = tunnel.name ? tunnel.name : tunnel.ifname;
                        else var tunnel = {},
                            name = service.name ? service.name : service.ifname;
                        var $trs = $(".gridTable tbody tr"),
                            self = this;
                        $trs.each(function(index, elem) {
                            var $elem = $(elem),
                                $name = $elem.find('td[cell-name="Name"]'),
                                $status = $elem.find('td[cell-name="Status"]');
                            $name.text() == name && $status.html(self.getConnectionStatus(service, tunnel))
                        })
                    }
                window.WAN_LIST_UPDATE = setTimeout(context(this).callback(this.updateTable), 3e3)
        }))
    }
}

function jsWanSetClientView(ctrl, viewInx, options) {
    jsWanSetClientView.superclass.constructor.call(this, ctrl, viewInx, options), jsWanSetClientView.prototype.onupdmodel = function() {
        return this.drawView(), !1
    }, jsWanSetClientView.prototype.onupdmodel = function() {
        return this.drawView(), !1
    }, this.drawView = function() {
        jsRecordSetClientView.prototype.drawView.call(this);
        var table = $(this.myBoxSel + ">table");
        hideFlag("wan_button_del") || table.find("tbody tr:not(.disable)").each(function() {
            0 == $(this).find("td:eq(0) input").length && $(this).find("td:eq(0)").append('<input type="checkbox" /> ')
        }), 0 == $(".wanGwifErr").length && $(".gridTable").parent("div").append('<div class="wanGwifErr"></div>'), ctrl.no_gwif && ctrl.model.recordSet.length > 0 ? $(".wanGwifErr").html(lng("wanGwifErr")) : $(".wanGwifErr").empty();
        var flag_br_conflict = !1;
        if (ctrl.model.ifTree) {
            var ifaces = ctrl.model.ifTree;
            for (var iface in ifaces)
                if (ifaces[iface] && ifaces[iface].services) {
                    var services = ifaces[iface].services;
                    for (var key in services) services[key].br_conflict && (flag_br_conflict = !0)
                }
            0 == $(".wanBrConflict").length && $(".gridTable").parent("div").append('<div class="wanBrConflict"></div>'), flag_br_conflict ? $(".wanBrConflict").html(lng("wanBrConflict")) : $(".wanBrConflict").empty()
        }
    }, jsWanSetClientView.prototype.onrowclick = function(event) {
        var target = $(event.target);
        "checkbox" == event.target.type || target.children().is("input:checkbox") || this.ctrl.event("recselect", event.data.recordInx)
    }, this.checkQos = function(qos) {
        var divQos = this.getChild("divQos");
        switch (qos) {
            case "ubr":
                divQos.getChild("pcr").hide(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                break;
            case "ubr_pcr":
                divQos.getChild("pcr").show(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                break;
            case "cbr":
                divQos.getChild("pcr").show(), divQos.getChild("scr").hide(), divQos.getChild("mbs").hide();
                break;
            case "nrtvbr":
                divQos.getChild("pcr").show(), divQos.getChild("scr").show(), divQos.getChild("mbs").show();
                break;
            case "rtvbr":
                divQos.getChild("pcr").show(), divQos.getChild("scr").show(), divQos.getChild("mbs").show()
        }
    }, this.onupdmodel = function() {
        return !0
    }, this.onrecselect = function(recordInx) {
        var isadding = !1;
        return 0 > recordInx && (isadding = !0), this.ctrl.getChild("mainTab").ifaceTypes.client.options = {
            nothing: !0
        }, jsWanSetClientView.superclass.onrecselect.call(this, recordInx)
    }, this.bind("updmodel", this.onupdmodel), this.bind("recselect", this.onrecselect)
}

function jsWanSetServerView(ctrl, viewInx, options) {
    jsWanSetServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        var data = this.options.sender.responseData;
        if (this.ctrl.model.ifTree = {}, data && !data.baddata && data.rq) {
            var i = 0;
            data.rq[i] && data.rq[i].resident && data.rq[i].resident.iface_names && (this.ctrl.model.ifTree = data.rq[i].resident.iface_names, this.ctrl.model.ifTree || (this.ctrl.model.ifTree = {})), i++, data.rq[i] && data.rq[i].resident && (this.ctrl.model.lanClients = data.rq[i].resident), i++, data.rq[i] && data.rq[i].resident && (this.ctrl.model.jsonIGMP = data.rq[i].resident), i++, data.rq[i] && data.rq[i].resident && (this.ctrl.model.deviceInfo = data.rq[i].resident), i++
        }
        if (this.mode && "update" != this.mode) this.ctrl.event("updaterq");
        else {
            this.ctrl.prepareRecordSet();
            var editLan = getCookie("editLAN");
            if ("" != editLan) {
                deleteCookie("editLAN");
                var recs = this.ctrl.model.recordSet;
                for (var i in recs)
                    if ("br0" == recs[i].ifaceL2 && recs[i].srvnode.ip == editLan) {
                        this.ctrl.event("recselect", i);
                        break
                    }
            }
        }
    }, this.prepareData = function() {
        var obj, ctrl = this.ctrl;
        switch (this.mode) {
            case "add":
            case "save":
                var res_buf, res_pos, general = ctrl.getChild("mainTab", "general"),
                    model = general.model;
                res_pos = "add" == this.mode ? -1 : 0, obj = {
                    v2: "y",
                    rq: 0
                }, model.ifnode.needDelete instanceof Array && (obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 2, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_buf" + obj.rq] = $.toJSON(model.ifnode.needDelete), obj.rq++, delete model.ifnode.needDelete);
                var contype = model.ifnode.contype;
                if ("statpppoe" == contype || "dynpppoe" == contype) {
                    var service2 = $.extend(!0, {}, getObjectFirstChild(model.service.tunnels)),
                        srvname2 = getObjectFirstKey(model.service.tunnels);
                    delete model.service.tunnels;
                    var blankConn2 = $.extend(!0, {}, model.blankConn),
                        services = getObjectFirstChild(blankConn2).services = {};
                    services[srvname2] = service2
                }
                obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 3, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_pos" + obj.rq] = res_pos, res_buf = $.toJSON(general.model.blankConn), res_buf = res_buf.replace(/%/g, "%25"), res_buf = res_buf.replace(/#/g, "%23"), res_buf = res_buf.replace(/&/g, "%26"), obj["res_buf" + obj.rq] = res_buf, obj.rq++, is.object(blankConn2) && (obj["res_config_id" + obj.rq] = 1, obj["res_config_action" + obj.rq] = 3, obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_struct_size" + obj.rq] = 36, obj["res_pos" + obj.rq] = res_pos, res_buf = $.toJSON(blankConn2), res_buf = res_buf.replace(/%/g, "%25"), res_buf = res_buf.replace(/#/g, "%23"), res_buf = res_buf.replace(/&/g, "%26"), obj["res_buf" + obj.rq] = res_buf, obj.rq++), this.ctrl.getChild("mainTab").model.enIGMPGlobal && (obj["res_json" + obj.rq] = "y", obj["res_data_type" + obj.rq] = "json", obj["res_config_action" + obj.rq] = 3, obj["res_config_id" + obj.rq] = 68, obj["res_struct_size" + obj.rq] = 0, obj["res_buf" + obj.rq] = $.toJSON({
                    enable: !0,
                    version: 2
                }), obj.rq++), this.addToRequest(obj);
                break;
            case "update":
                obj = {
                    v2: "y",
                    rq: 1,
                    res_json0: "y",
                    res_config_action0: 1,
                    res_config_id0: 1,
                    res_struct_size0: 36,
                    res_config_deviceinfo0: 1
                }, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 187, obj["res_struct_size" + obj.rq] = 0, obj.rq++, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 68, obj["res_struct_size" + obj.rq] = 0, obj.rq++, obj["res_json" + obj.rq] = "y", obj["res_config_action" + obj.rq] = 1, obj["res_config_id" + obj.rq] = 67, obj["res_struct_size" + obj.rq] = 0, obj.rq++, this.addToRequest(obj);
                break;
            case "delete":
                obj = {
                    v2: "y",
                    rq: "y",
                    res_config_id: 1,
                    res_config_action: 2,
                    res_json: "y",
                    res_struct_size: 36,
                    res_delex: "y",
                    res_data_type: "json"
                }, jsonOutObj = [];
                var general = ctrl.getChild("mainTab", "general");
                general.model.tnlname ? jsonOutObj.push(general.model.tnlname) : general.model.srvname && jsonOutObj.push(general.model.srvname), obj.res_buf = $.toJSON(jsonOutObj), this.addToRequest(obj);
                break;
            case "deleterule":
                obj = {
                    v2: "y",
                    rq: "y",
                    res_config_id: 1,
                    res_config_action: 2,
                    res_json: "y",
                    res_struct_size: 36,
                    res_delex: "y",
                    res_data_type: "json"
                }, obj.res_buf = $.toJSON(this.ctrl.data), this.addToRequest(obj)
        }
    }, this.onupdaterq = function() {
        rootView.showModalOverlay(), this.ctrl.activeRecordInx = -1, this.mode = "update", this.updateView()
    }, this.onsaverq = function() {
        rootView.showModalOverlay(), this.ctrl.activeRecordInx = -1, this.mode = "save", this.updateView()
    }, this.onaddrq = function() {
        rootView.showModalOverlay(), this.ctrl.activeRecordInx = -1, this.mode = "add", this.updateView()
    }, this.ondeleterq = function() {
        rootView.showModalOverlay(), this.ctrl.activeRecordInx = -1, this.mode = "delete", this.updateView()
    }, this.ondeleterulerq = function() {
        rootView.showModalOverlay(), this.ctrl.activeRecordInx = -1, this.mode = "deleterule", this.updateView()
    }, this.mode = "update", this.bind("updaterq", this.onupdaterq), this.bind("saverq", this.onsaverq), this.bind("addrq", this.onaddrq), this.bind("deleterq", this.ondeleterq), this.bind("deleterulerq", this.ondeleterulerq)
}

function jsWanSetGwifServerView(ctrl, viewInx, options) {
    jsWanSetGwifServerView.superclass.constructor.call(this, ctrl, viewInx, options), this.pickData = function() {
        this.ctrl.event("updaterq")
    }, this.delaiedrq = function() {
        this.ctrl.event("updaterq")
    }, this.prepareData = function() {
        var obj;
        this.ctrl, obj = {
            v2: "y",
            rq: "y",
            res_config_id: this.rpc,
            res_config_action: 3,
            res_json: "y",
            res_struct_size: 36,
            res_pos: 0,
            res_data_type: "json"
        }, jsonOutObj = [], jsonOutObj.push(is.set(this.ifname) ? this.ifname : "nogwiface"), obj.res_buf = $.toJSON(jsonOutObj), rootView.showModalOverlay(), this.addToRequest(obj)
    }, this.oncellselect = function(obj) {
        6 == obj.cell && (this.ifname = this.ctrl.model.recordSet[obj.row].ifaceL3, this.rpc = 62, this.updateView())
    }, this.ondisgw = function() {
        return delete this.ifname, this.rpc = 62, this.updateView(), !1
    }, this.rpc = 62, this.bind("cellselect", this.oncellselect), this.bind("disgw", this.ondisgw)
}

function getConnType(ifnode, service, tunnel) {
    var userType = null;
    if (!service.type && "usb" == ifnode.type) return "ip";
    switch (service.type.valueOf()) {
        case "ppp":
            switch (ifnode.type.valueOf()) {
                case "atm":
                    switch (ifnode.link_type) {
                        case "MDMVS_EOA":
                            userType = "pppoe";
                            break;
                        case "MDMVS_PPPOA":
                            userType = "pppoa";
                            break;
                        default:
                            userType = "pppoe"
                    }
                    break;
                case "ethernet":
                case "ptm":
                    userType = "pppoe";
                    break;
                case "3g":
                    userType = "3g";
                    break;
                case "usb":
                    userType = "3g"
            }
            break;
        case "pppv6":
            userType = "pppoev6";
            break;
        case "pppdual":
            userType = "pppoedual";
            break;
        case "ip":
        case "ipv6":
            switch (ifnode.type.valueOf()) {
                case "atm":
                    switch (ifnode.link_type) {
                        case "MDMVS_EOA":
                            userType = getIPType(service, tunnel);
                            break;
                        case "MDMVS_IPOA":
                            userType = "ipoa";
                            break;
                        default:
                            userType = "static"
                    }
                    break;
                case "lte":
                    userType = "lte";
                    break;
                case "usb":
                    userType = "lte";
                    break;
                default:
                    userType = getIPType(service, tunnel)
            }
            break;
        case "bridge":
            userType = "bridge";
            break;
        case "auto":
            userType = tunnel ? tunnel.type : service.type;
            break;
        case "notype":
            userType = "notype";
            break;
        default:
            userType = "bridge"
    }
    return userType
}

function getIPType(service, tunnel) {
    var userType = null;
    if (service.contype && ("dynamicv6" == service.contype || "staticv6" == service.contype)) return userType = service.contype;
    if (service.dhcp) {
        if (userType = "ipv6" == service.type ? "dynamicv6" : service.kabinet ? "dynkab" : "dynamic", tunnel) switch (tunnel.type) {
            case "pptp":
                userType = tunnel.useipv6 ? "dynpptpv6" : "dynpptp";
                break;
            case "l2tp":
                userType = tunnel.useipv6 ? "dynl2tpv6" : "dynl2tp"
        }
    }
    else if (userType = "ipv6" == service.type ? "staticv6" : service.kabinet ? "statkab" : "static", tunnel) switch (tunnel.type) {
        case "pptp":
            userType = tunnel.useipv6 ? "statpptpv6" : "statpptp";
            break;
        case "l2tp":
            userType = tunnel.useipv6 ? "statl2tpv6" : "statl2tp"
    }
    return userType
}

function pageWebPanelConfig() {
    pageWebPanelConfig.superclass.constructor.call(this), this.info = null, this.add(new nodeSelect("webConfigLang"), "system_lang"), this.add(new nodenum("webConfigLogoutTime", null, {
        minval: .05,
        hidden: hideFlag("device_info.logout_time"),
        disabled: disableFlag("device_info.logout_time")
    }), "logout_time"), this.updateModel = function(status) {
        this.status = status;
        var newlang = this.get("system_lang").val();
        return this.fgReload = newlang != this.info.lang, this.info = {
            lang: this.get("system_lang").val(),
            logout_time: Math.round(6e4 * parseFloat(this.get("logout_time").val()))
        }, this.info.logout_time <= 3e3 && (this.info.logout_time = 3e3), !status.error
    }, this.updateView = function(phase) {
        if (pageWebPanelConfig.superclass.updateView.apply(this, arguments), "back" == phase) {
            var langs = window.langs;
            this.get("system_lang").cleanOptions(), debug(langs);
            for (var key in langs) this.get("system_lang").addOption(langs[key], key);
            this.get("system_lang").val(this.info.lang), this.get("logout_time").val(Math.round(this.info.logout_time / 6e4) || 1), this.cleanButtonBar().addButton("save").getButton("save").bind("click.button", callback(this, function() {
                this.save()
            }))
        }
    }, this.update = function() {
        rootView.showModalOverlay();
        try {
            device.config.read(67, callback(this, function(data) {
                this.info = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay()
            }))
        }
        catch (e) {
            this.deep.updateView().$box.errorBlock(lng("error"), e.message)
        }
    }, this.save = function() {
        this.deep.updateModel(), this.status.error || (rootView.showModalOverlay(), device.config.write(67, this.info, null, callback(this, function() {
            this.fgReload ? rootCtrl.event("changelang", {
                lang: this.info.lang
            }) : ($(window).trigger("slacker_update"), this.emit("updaterq"))
        })))
    }, this.bind("updaterq", this.update)
}

function jsWiFiModel() {
    jsWiFiModel.superclass.constructor.call(this), this.WiFiData = null, this.WiFiAdditData = null, this.mbssidSelectedObj = 0
}

function check_wifi_key(str, hexKeys) {
    var multiplier = 1;
    return hexKeys && (multiplier = 2), str.length != 5 * multiplier && str.length != 13 * multiplier ? !1 : !0
}

function check_wifi_key_ex(str, hexKeys, bit) {
    var passlen = 5;
    64 == bit ? passlen = 5 : 128 == bit && (passlen = 13);
    var multiplier = 1;
    return hexKeys && (multiplier = 2), str.length == passlen * multiplier ? !0 : !1
}

function check_wifi_key_hex(str) {
    var pat = /^[0-9a-fA-F]+$/;
    return pat.test(str) ? !0 : !1
}

function check_wifi_keypsk(str) {
    return 0 != str.length && (str.length < 8 || str.length > 63) ? !1 : !0
}

function pageWiFiAdvanced(GHz) {
    pageWiFiAdvanced.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1)), this.wifi = null, this.GHz = is.set(GHz) ? GHz : "";
    var bg_prots = {
            Auto: 0,
            "Always On": 1,
            "Always Off": 2
        },
        short_gis = {
            Enable: "enable",
            Disable: "disable"
        };
    this.add(new nodetext("addonKeepAlive", 0, {
        mandatory: !0,
        re: [function(value) {
            if (value.length) {
                if (value = value.match(/\S+/)[0], !new RegExp("^-*[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
                if (0 > value || value > 65535) return "addonKeepAliveValid"
            }
            return null
        }]
    }), "keep_alive"), this.add(new nodetext("addonBeacon", 20, {
        mandatory: !0,
        hide: hideFlag("BeaconPeriod"),
        re: [function(value) {
            if (value.length) {
                if (value = value.match(/\S+/)[0], !new RegExp("^-*[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
                if (20 > value || value > 1024) return "addonBeaconValid"
            }
            return null
        }]
    }), "beacon").add(new nodetext("addonRts", 0, {
        mandatory: !0,
        hide: hideFlag("RTSThreshold"),
        re: [function(value) {
            if (value.length) {
                if (value = value.match(/\S+/)[0], !new RegExp("^-*[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
                if (0 > value || value > 2347) return "addonRTSValid"
            }
            return null
        }]
    }), "rts").add(new nodetext("addonFrag", 0, {
        mandatory: !0,
        hide: hideFlag("FragThreshold"),
        re: [function(value) {
            if (value.length) {
                if (value = value.match(/\S+/)[0], !new RegExp("^-*[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
                if (0 > value || value > 2346) return "addonFragValid"
            }
            return null
        }]
    }), "frag").add(new nodetext("addonDtim", 1, {
        mandatory: !0,
        hide: hideFlag("DtimPeriod"),
        re: [function(value) {
            if (value.length) {
                if (value = value.match(/\S+/)[0], !new RegExp("^-*[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
                if (1 > value || value > 255) return "addonDtimValid"
            }
            return null
        }]
    }), "dtim"), this.add(new nodeCheckBox("addonIgmpDrop"), "igmpdrop"), this.add(new nodeSelect("addonBgProt"), "bg_prot"), this.add(new nodeSelect("addonBand"), "band"), this.add(new nodeSelect("addonShortGI"), "short_gi"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageWiFiAdvanced.superclass.updateView.apply(this, arguments), "back" == phase) {
            var bg_prot = this.child("bg_prot").cleanOptions();
            for (var prot in bg_prots) bg_prot.addOption(prot, bg_prots[prot]);
            var short_gi = this.child("short_gi").cleanOptions();
            for (var gi in short_gis) short_gi.addOption(gi, short_gis[gi]);
            var settings = this.wifi;
            if (settings) {
                this.child("keep_alive").val(settings.StationKeepAlive), bg_prot.val(settings.BGProtection), this.child("beacon").val(settings.BeaconPeriod), this.child("rts").val(settings.RTSThreshold), this.child("frag").val(settings.FragThreshold), this.child("dtim").val(settings.DtimPeriod), this.child("igmpdrop").val(settings.igmpdrop);
                for (var band = this.child("band").cleanOptions(), bandlist = this.wifi[this.GHz + "BandwidthAvailable"], i = 0; i < bandlist.length; i++) band.addOption(bandlist[i].Name, bandlist[i].Id);
                var bw = parseInt(settings.BandWidth) || 0;
                band.val(bw), this.child("short_gi").val(settings.HTGI)
            }
            this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                this.deep.updateModel() && this.save()
            }))
        }
    }, this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "tx_pwr":
                var txpwr_input = this.child("tx_pwr").$box.find(".input select");
                "Maximum" == this.child("tx_pwr").val() || parseInt(this.child("tx_pwr").val()) > 100 ? txpwr_input.css("color", "red") : txpwr_input.css("color", "black"), "Maximum" == value || parseInt(value) > 100 ? this.child("tx_pwr").setComment("addonHighPowerWarning") : this.child("tx_pwr").cleanComment()
        }
    }), this.save = function() {
        rootView.showModalOverlay();
        var data = {
            BeaconPeriod: this.child("beacon").val(),
            RTSThreshold: this.child("rts").val(),
            FragThreshold: this.child("frag").val(),
            DtimPeriod: this.child("dtim").val(),
            igmpdrop: this.child("igmpdrop").val(),
            StationKeepAlive: this.child("keep_alive").val(),
            BGProtection: this.child("bg_prot").val().toString(),
            BandWidth: this.child("band").val().toString(),
            HTGI: this.child("short_gi").val()
        };
        $.extend(this.wifi[this.GHz + "addon_settings"], data);
        var data_GHz = {};
        data_GHz[this.GHz + "addon_settings"] = data, device.config.write(105, data_GHz, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read(35, callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    })
}

function bestWirelessMode(ModeAvailable, flag_5G) {
    function find(value) {
        for (var i = ModeAvailable.length; i > 0; i--) {
            var mode = ModeAvailable[i - 1];
            if (mode.Name.toUpperCase().search(value.toUpperCase()) >= 0) return mode.Id
        }
        return null
    }
    if (flag_5G) var bestlist = ["AC/A/N", "AC/N", "AC", "A/N", "A", "N", "mixed"];
    else var bestlist = ["B/G/N", "G/N", "B/G", "mixed"];
    for (var i = 0; i < bestlist.length; i++) {
        var id = find(bestlist[i]);
        if (is.set(id)) return id
    }
    return ModeAvailable[ModeAvailable.length - 1].Id
}

function wifiBasicForm(GHz) {
    wifiBasicForm.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1)), this.wifi = null, this.countries = null, this.channels = null, this.GHz = is.set(GHz) ? GHz : "", this.add(new nodeCheckBox("commonEnableWiFi"), "enable"), this.add(new nodeCheckBox("commonEnableBroadcast", ""), "wifi_broadcast"), this.child("wifi_broadcast").setComment("broadcastComment"), this.add(new node, "advanced").child("advanced").add(new nodeSelect("MBSSID", "", {
        disabled: !0
    }), "mbssid").add(new nodeBSSID("BSSID", "", {
        GHz: this.GHz,
        autosave: !1,
        disabled: !0
    }), "bssid"), this.add(new nodeCheckBox("basicHideAP", "", {
        comment: "hiddenNetworkComment"
    }), "hideap").add(new nodetext("ssid", "", {
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? null : "ssidCyrillicError"
        }]
    }), "ssid"), this.add(new nodeSelect("basicCountry", "", {
        hidden: !1
    }), "country"), "5G_" == this.GHz ? this.add(new nodeSelect("basicChannel"), "channel") : this.add(new nodeLevelGrid("basicChannel", this.GHz), "channel"), this.add(new nodeSelect("basicMode", ""), "wl_mode"), this.add(new nodenum("basicClientMax", 0, {
        mandatory: !0,
        comment: "basicClientMaxTitle",
        re: [function(value) {
            if (0 != value) {
                if (0 > value) return "maxCliLessNullError";
                if (value > 20) return "maxCliMoreError"
            }
            return null
        }]
    }), "max_clients"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (wifiBasicForm.superclass.updateView.apply(this, arguments), "back" == phase) {
            if (this.GHz || (this.child("wl_mode").options.comment = "basicModeComment"), this.wifi) {
                var wifi = this.wifi,
                    mbssidCurItem = wifi[this.GHz + "mbssid"][wifi[this.GHz + "mbssidCur"] - 1],
                    modes = this.wifi[this.GHz + "ModeAvailable"],
                    country = this.child("country").cleanOptions(),
                    channel = this.child("channel").cleanOptions();
                this.child("enable").val(wifi[this.GHz + "Radio"]).fieldchange(), this.child("wifi_broadcast").val(is.set(wifi[this.GHz + "mbssid"][wifi[this.GHz + "mbssidCur"] - 1].WifiBroadcast) ? 1 == wifi[this.GHz + "mbssid"][wifi[this.GHz + "mbssidCur"] - 1].WifiBroadcast : 1 == wifi[this.GHz + "WifiBroadcast"]);
                var mbssid = this.child("advanced/mbssid").cleanOptions();
                mbssid.addOption("wifiCommonOff", 1);
                for (var startMbssid = 2, i = startMbssid; is.number(wifi[this.GHz + "mbssidMax"]) && i <= wifi[this.GHz + "mbssidMax"]; i++) mbssid.addOption(i, i);
                mbssid.val(wifi[this.GHz + "mbssidNum"]).fieldchange();
                var bssid = this.child("advanced/bssid");
                bssid.setData(wifi), bssid.val(wifi[this.GHz + "mbssidCur"]);
                for (var i = 0; i < this.countries.length; i++) country.addOption(this.countries[i].name, this.countries[i].code);
                if ("5G_" == this.GHz)
                    for (var i = 0; i < this.channels.length; i++) channel.addOption(this.channels[i]);
                for (var wl_mode = this.child("wl_mode").cleanOptions(), i = 0; i < modes.length; i++) wl_mode.addOption(modes[i].Name, modes[i].Id);
                this.child("hideap").val(wifi[this.GHz + "HideSSID"]), this.child("ssid").val(mbssidCurItem ? mbssidCurItem.SSID : ""), this.child("country").val(wifi.CountryCode), this.child("channel").val(wifi[this.GHz + "Channel"]), wifi[this.GHz + "Auto_channel"] ? "auto" == this.child("channel").val() && this.child("channel").setComment(lng("wifiAutoChannelComment") + " " + wifi[this.GHz + "Auto_channel"]) : (delete this.child("channel").options.comment, this.child("channel").deep.updateView()), this.child("wl_mode").val(wifi[this.GHz + "WirelessMode"]), this.child("max_clients").val(mbssidCurItem.MaxStaNum ? mbssidCurItem.MaxStaNum : 0)
            }
            if ("5G_" != this.GHz) {
                var rpcName, rID;
                rpcName = 199, this.get("channel").$box.find(".arrow").click(callback(this, function() {
                    is.set(rID) || (this.get("channel").cleanOptions(), rID = device.config.read(rpcName, callback(this, function(data) {
                        this.get("channel").waiter(!1);
                        for (var i in this.channels) {
                            var n = data.resident ? data.resident[this.channels[i]] : null;
                            is.set(n) ? (10 >= n && (n = 10), this.get("channel").addOption(this.channels[i], n)) : this.get("channel").addOption(this.channels[i], 0)
                        }
                    })))
                }))
            }
        }
    }, this.save = function(cb) {
        var enable = this.child("enable").val(),
            data_c = {};
        if (data_c[this.GHz + "Radio"] = enable, enable && !disableFlag("wifi.mbssid.1")) {
            var mbssidNum = parseInt(this.child("advanced/mbssid").val());
            mbssidNum && mbssidNum > this.wifi[this.GHz + "mbssidNum"] && alert(lng("securityAuthNewModeWarningOpen")), data_c[this.GHz + "mbssidNum"] = mbssidNum, this.child("advanced/bssid").val() && (data_c[this.GHz + "mbssidCur"] = parseInt(this.child("advanced/bssid").val()))
        }
        var data_b = {
            CountryCode: this.child("country").val()
        };
        data_b[this.GHz + "Channel"] = this.child("channel").val(), data_b[this.GHz + "mbssid"] = [{}], data_b[this.GHz + "mbssid"][0].SSID = makeValidJSONString(this.child("ssid").val()), setCookie(this.GHz ? "ssid5g" : "ssid", this.child("ssid").val()), data_b[this.GHz + "WirelessMode"] = this.child("wl_mode").val(), data_b[this.GHz + "mbssid"][0].MaxStaNum = this.child("max_clients").val().toString(), data_b[this.GHz + "HideSSID"] = this.child("hideap").val(), is.set(this.wifi[this.GHz + "mbssid"][this.wifi[this.GHz + "mbssidCur"] - 1].WifiBroadcast) ? data_b[this.GHz + "mbssid"][0].WifiBroadcast = this.child("wifi_broadcast").val() ? !0 : !1 : data_b[this.GHz + "WifiBroadcast"] = this.child("wifi_broadcast").val() ? !0 : !1, $.extend(this.wifi, data_c, data_b), device.config.write([
            [35, data_b],
            [39, data_c]
        ], cb)
    }, this.autosave = function(autoupdate) {
        this.deep.updateModel(), this.status.error || (rootView.showModalOverlay(), this.save(callback(this, function(autoupdate) {
            rootView.hideModalOverlay(), autoupdate && this.update()
        }, autoupdate)))
    }, this.update = function(wifi, countries, channels) {
        window.hasChanges = null, wifi && countries && channels ? (this.wifi = wifi, this.countries = countries, this.channels = channels, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read([35, 38, 37], callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.countries = is.RPC_SUCCESS(data.rq) ? data.rq.resident.CountryList : [], this.channels = is.RPC_SUCCESS(data.rq) ? data.rq.resident[this.GHz + "ChannelList"] : [], this.deep.updateView(), this.GHz ? rootCtrl.event("changewifi5G", this.wifi[this.GHz + "Radio"]) : rootCtrl.event("changewifi", this.wifi), rootView.hideModalOverlay()
        })))
    }, this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                if (!disableFlag("wifi.mbssid.1")) {
                    var mbssid = this.child("advanced/mbssid"),
                        bssid = this.child("advanced/bssid");
                    value ? (mbssid.enable(), bssid.enable()) : (mbssid.disable(), bssid.disable())
                }
                break;
            case "country":
                this.autosave(!0);
                break;
            case "bssid":
                this.child("advanced/bssid").save(callback(this, this.update))
        }
    })
}

function pageWiFiBasic(GHz) {
    pageWiFiBasic.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
    var basic = this.add(new wifiBasicForm(GHz), "basic").child("basic");
    this.updateView = function(phase) {
        pageWiFiBasic.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            basic.autosave(!0)
        }))
    }, this.bind("updaterq", function() {
        this.deep.updateView(), basic.update()
    })
}

function nodeLevelGrid(name) {
    function calculateColor(n) {
        var colorArray = ["Lime", "LawnGreen", "yellow", "Gold", "Orange", "DarkOrange", "OrangeRed", "OrangeRed", "red", "red"],
            __k__ = Math.floor(colorArray.length / 100 * n);
        return colorArray[parseInt(__k__) - 1]
    }
    var header = [];
    header.push({
        index: "chanel",
        name: "basicChannel"
    }), header.push({
        index: "level",
        name: "basicChannelWorkload"
    });
    var options = {
        type: "text",
        index: "chanel",
        header: header
    };
    nodeLevelGrid.superclass.constructor.call(this, name, "", options), this.cleanOptions = function() {
        return this.cleanRows(), this
    }, this.addOption = function(i, n) {
        var row = {
            chanel: i
        };
        return row.level = "<div>&nbsp;</div>", this.addRow(row), this.changeOption(i, n), this
    }, this.changeOption = function(i, n) {
        this.$box.find("table tbody tr td").each(function() {
            var lkey = $(this).parent().find("td:eq(0)").attr("langkey");
            lkey == i && $(this).parent().find("td:eq(1) div").css({
                backgroundColor: calculateColor(n),
                width: n + "%"
            })
        }), this.$box.find("table tr").show()
    }, this.waiter = function(enable) {
        enable ? this.$box.find(".options").find(".wifiRadarWaiter").show() : this.$box.find(".options").find(".wifiRadarWaiter").hide()
    }, this.updateView = function(phase) {
        nodeLevelGrid.superclass.updateView.apply(this, arguments), "forward" == phase && (this.$box.find("table").addClass("wifiRadar"), this.$box.find(".field>input").prop("readonly", "readonly"), this.$box.find(".field>input").css("cursor", "default"), this.$box.find(".field>input").focus(function() {
            $(this).blur()
        }), 1 == header.length && this.$box.find("table thead").hide()), "back" == phase && this.$box.find(".options").append("<img class='wifiRadarWaiter' src='image/wait.gif'>")
    }
}

function nodeBSSID(name, value, options) {
    nodeBSSID.superclass.constructor.apply(this, arguments);
    var options = options || {};
    this.wifi = null, this.GHz = options.GHz || "", this.add(new nodeSelect("BSSID", value, options), "_bssid"), this.updateView = function(phase) {
        if (nodeBSSID.superclass.updateView.apply(this, arguments), "back" == phase) {
            var bssid = this.get("_bssid");
            if (this.wifi) {
                var mbssids = this.wifi[this.GHz + "mbssid"];
                bssid.cleanOptions();
                for (var i in mbssids) mbssids[i].BSSID && bssid.addOption(mbssids[i].BSSID, parseInt(i) + 1);
                bssid.val(this.wifi[this.GHz + "mbssidCur"])
            }
        }
        return this
    }, nodeBSSID.prototype.isModified = function(status) {
        return status.modified = !1, !1
    }, this.child("_bssid").bind("fieldchange", callback(this, function() {
        options.autosave && this.save(), this.fieldchange()
    })), this.disable = function() {
        return this.get("_bssid").disable(), this
    }, this.enable = function() {
        return this.get("_bssid").enable(), this
    }, this.val = function(value) {
        return value ? (this.get("_bssid").val(value), this) : this.get("_bssid").val()
    }, this.setData = function(wifi) {
        return this.wifi = wifi || {}, this.deep.updateView(), this
    }, this.fieldchange = function() {
        return this.emit("fieldchange", this.child("_bssid").val()), this
    }, this.save = function(_complite) {
        if (!checkChanges() || confirm(lng("updatePageMes"))) {
            rootView.showModalOverlay();
            var save_data = {};
            save_data[this.GHz + "mbssidCur"] = parseInt(this.get("_bssid").val()), device.config.write(39, save_data, callback(this, function(data) {
                rootView.hideModalOverlay(), _.isFunction(_complite) && _complite(data), this.emit("complite_save", data)
            }))
        }
        else this.deep.updateView();
        return !1
    }, this.updateModel = function(status) {
        this.status = status
    }
}

function wifiHotspotList(GHz) {
    wifiHotspotList.superclass.constructor.apply(this, arguments), this.hlist = null, this.apcli = null, this.wifi = null, this.$grid = null;
    var $selrow = null,
        siglist = ["g3_1.gif", "g3_2.gif", "g3_3.gif", "g3_4.gif", "g3_5.gif"];
    this.GHz = is.set(GHz) ? GHz : "", this.updateView = function(phase) {
        if (wifiHotspotList.superclass.updateView.apply(this, arguments), "forward" == phase) {
            $selrow = null, this.cleanButtonBar().$box.empty(), this.$grid = this.$box.html("				<div class='grid'></div>			").find(".grid").lightUIGrid([{
                index: "ssid",
                name: "SSID"
            }, {
                index: "bssid",
                name: "BSSID"
            }, {
                index: "wmode",
                name: "clientWMode"
            }, {
                index: "channel",
                name: "clientChannel"
            }, {
                index: "sec",
                name: "clientAuthMode"
            }, {
                index: "sig",
                name: "clientSignal"
            }], this.hlist ? this.hlist.length : 0, {
                clickable: !0,
                id: "grid" + this.GHz
            }), this.$grid.bind("rowclick.grid", callback(this, function(event, $row) {
                $selrow && $selrow.unselectRow(), $selrow = $row.selectRow(), this.emit("hotspotchange", this.hlist[$selrow.irow()], GHz ? GHz : "")
            }));
            for (var i = 0; this.hlist && i < this.hlist.length; i++) {
                var hotspot = this.hlist[i],
                    $row = this.$grid.row(i),
                    ssid = "<span>" + hotspot.ssid + " </span>";
                if ("" != this.apcli.ApCliBssid && this.apcli.ApCliBssid.toUpperCase() == hotspot.bssid.toUpperCase() && ("2.4 GHz" == this.apcli.ApCliRangeFreq && "" == this.GHz || "5 GHz" == this.apcli.ApCliRangeFreq && "5G_" == this.GHz) && (ssid += _.isUndefined(this.apcli.ApCliConnect) ? "<img src='image/ledgreen.gif' />" : this.apcli.ApCliConnect ? "<img src='image/ledgreen.gif' />" : "<img src='image/ledyellow.gif' />", $selrow = $row.selectRow()), "" != this.apcli.ApCliSsid && "" == this.apcli.ApCliBssid) {
                    var curssid = this.apcli.ApCliSsid,
                        ssidnames = _.filter(this.hlist, function(elem) {
                            return elem.ssid == curssid ? elem : void 0
                        }),
                        onessid = _.max(ssidnames, function(ssidnames) {
                            return ssidnames.sig
                        });
                    onessid.ssid == hotspot.ssid && onessid.sig == hotspot.sig && (ssid += "<img src='image/ledyellow.gif' />", $selrow = $row.selectRow())
                }
                if ($row.col("ssid").fieldval(ssid), $row.col("wmode").fieldval("802." + hotspot.wmode), $row.col("channel").fieldval(hotspot.channel), $row.col("bssid").fieldval(hotspot.bssid.toUpperCase()), hotspot.sig) {
                    for (var sigval = Math.ceil(parseInt(hotspot.sig) / 20), imgs = "", j = 0; sigval > j; j++) imgs += "<img src='image/" + siglist[j] + "' style='margin:0' />";
                    $row.col("sig").fieldval(imgs + "<span> (" + hotspot.sig + "%)</span>")
                }
                else $row.col("sig").fieldval("[" + lng("clientDataUnknown") + "]");
                hotspot.security = hotspot.sec ? hotspot.sec.split("/") : ["UNKNOWN"], "WPA1PSKWPA2PSK" == hotspot.security[0] && (hotspot.security[0] = "WPAPSKWPA2PSK");
                var secstr = "[" + hotspot.security[0] + "]";
                switch (hotspot.security[0]) {
                    case "NONE":
                    case "OPEN":
                        secstr = "[" + lng("clientSecureOpen") + "]";
                        break;
                    case "WEP":
                    case "SHARED":
                        secstr = "[" + lng("clientSecureOpen") + "] [WEP]";
                        break;
                    case "WPAPSK":
                        secstr = "[WPA-PSK]";
                        break;
                    case "WPA2PSK":
                        secstr = "[WPA2-PSK]";
                        break;
                    case "WPAPSKWPA2PSK":
                        secstr = "[WPA-PSK/WPA2-PSK mixed]"
                }
                if (hotspot.security[1]) switch (hotspot.security[1]) {
                    case "TKIPAES":
                        secstr += " [TKIP+AES]";
                        break;
                    default:
                        secstr += " [" + hotspot.security[1] + "]"
                }
                $row.col("sec").fieldval(secstr)
            }
            this.addButton("clientScanBtn").getButton("clientScanBtn").bind("click.button", callback(this, function() {
                this.update()
            }))
        }
    }, this.getActive = function() {
        return $selrow ? this.hlist[$selrow.irow()] : null
    }, this.turn_on = function() {
        rootView.showModalOverlay();
        var create = {
                common: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var obj = {};
                    return obj[GHz + "mbssidNum"] = 1, obj[GHz + "mbssidCur"] = 1, obj[GHz + "Radio"] = !0, obj
                }
            },
            data = create.common(GHz);
        $.extend(this.wifi, data), device.config.write(39, data, callback(this, function() {
            rootView.hideModalOverlay(), this.update()
        }))
    }, this.update = function(wifi, hlist, wz) {
        hlist ? (this.wifi = wifi, this.hlist = hlist, this.apcli = wifi && wifi.apcli ? wifi.apcli : null, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read([35, "5G_" == this.GHz ? 185 : 133], callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.hlist = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.hlist && this.hlist.sort(sortSigDesc("sig")), this.apcli = this.wifi && this.wifi.apcli ? this.wifi.apcli : {}, this.deep.updateView(), wz || rootView.hideModalOverlay(), this.apcli && this.apcli.ApCliEnable && !is.RPC_SUCCESS(data.rq[1]) && alert(lng("clientListNotAvail"));
            var lngradio = lng("clientConfTurnOn") + "?";
            "5G_" != this.GHz && this.wifi && !this.wifi.Radio && confirm(lngradio) && this.turn_on()
        })))
    }
}

function pageWiFiClient(GHz) {
    pageWiFiClient.superclass.constructor.apply(this, arguments), this.wifi = null, this.hotspot = null, this.GHz = is.set(GHz) ? GHz : "", this.rqId = -1, this.virgin = !0, this.refreshTime = 5e3, this.refreshId = null, "fas" != window.curlang && "ara" != window.curlang ? this.add(new nodeComment("clientFAQ", {
        icon: "url('../image/marker.gif') no-repeat left"
    }), "commentFAQ") : this.add(new nodeComment("clientFAQ", {
        icon: "url('../image/marker-rtl.gif') no-repeat right"
    }), "commentFAQ");
    var net_auths = {
            Open: "OPEN",
            Shared: "SHARED",
            "WPA-PSK": "WPAPSK",
            "WPA2-PSK": "WPA2PSK",
            "WPA-PSK/WPA2-PSK mixed": "WPAPSKWPA2PSK"
        },
        scan = this.add(new nodeCheckBox("clientEnable", !1), "enable").add(new node({
            hidden: !0
        }), "scan").child("scan");
    this.child("scan").add(new nodeCheckBox("commonEnableBroadcast"), "wifi_broadcast"), this.child("scan").add(new nodeCaption("clientMasterSectScanData")).add(new wifiHotspotList, "hlist"), this.child("scan").add(new nodeCaption("clientSectParams")).add(new nodetext("ssid", "", {
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? null : "ssidCyrillicError"
        }]
    }), "ssid").add(new nodemac("BSSID", "", {
        mandatory: !1
    }), "bssid").add(new nodeSelect("clientAuthMode"), "netauth").add(new nodetext("clientKeyPSK", "", {
        mandatory: !0,
        hidden: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? check_wifi_keypsk(value) ? null : "wifiPSKKeyWrong" : "wifiPSKCyrillicError"
        }]
    }), "key_psk").add(new wifiWEPForm, "wep").add(new wifiWPAForm({
        hidden: !0
    }), "wpa");
    var hlist = scan.child("hlist"),
        wep = scan.child("wep"),
        wpa = scan.child("wpa"),
        keys = wep.child("keys");
    this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageWiFiClient.superclass.updateView.apply(this, arguments), "back" == phase) {
            var netauth = scan.child("netauth").cleanOptions();
            for (var auth in net_auths) netauth.addOption(auth, net_auths[auth]);
            if (wpa.child("wpa_ren").hide(), this.wifi) {
                var apcli = this.wifi.apcli,
                    wds = this.wifi.wds,
                    wep_encr = wep.child("wep_encr");
                !wds || wds && "0" == wds.WdsEnable ? (this.child("commentFAQ").show(), this.child("enable").val(apcli.ApCliEnable).fieldchange().enable(), this.child("enable").cleanComment()) : (this.child("commentFAQ").hide(), this.child("enable").val(!1).fieldchange().disable(), this.child("enable").setComment("clientWDSComment")), window.engine && window.engine.candyBlack && this.child("commentFAQ").hide(), this.child("scan").child("wifi_broadcast").val(is.set(this.wifi.mbssid[this.wifi.mbssidCur - 1].WifiBroadcast) ? this.wifi.mbssid[this.wifi.mbssidCur - 1].WifiBroadcast : this.wifi.WifiBroadcast), scan.child("ssid").val(apcli.ApCliSsid), scan.child("bssid").val(apcli.ApCliBssid), scan.child("netauth").val(apcli.ApCliAuthMode).fieldchange(), scan.child("key_psk").val(apcli.ApCliWPAPSK), "WEP" == apcli.ApCliEncrypType || "SHARED" == apcli.ApCliAuthMode ? wep_encr.val(!0).fieldchange() : (wep_encr.val(!1).fieldchange(), ("TKIP" == apcli.ApCliEncrypType || "AES" == apcli.ApCliEncrypType) && wpa.child("wpa_enc").val(apcli.ApCliEncrypType)), keys.child("key_id").val("" == apcli.ApCliDefaultKeyId ? "0" : (parseInt(apcli.ApCliDefaultKeyId) - 1).toString()), keys.child("key_type").val("" != apcli.Key1Type ? "0" == apcli.ApCliKey1Type : !1), keys.child("key1").val(apcli.ApCliKey1Str), keys.child("key2").val(apcli.ApCliKey2Str), keys.child("key3").val(apcli.ApCliKey3Str), keys.child("key4").val(apcli.ApCliKey4Str);
                var multipler = 1;
                keys.child("key_type").val() && (multipler = 2);
                var keylen = keys.child("key1").val().length;
                keys.child("key_bit").val(keylen >= 6 * multipler ? 128 : 64)
            }
            this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                if (this.deep.updateModel()) {
                    var channel = null,
                        nt = null;
                    if (is.set(this.hotspot) && this.wifi[this.GHz + "Channel"] != this.hotspot.channel) {
                        if (!confirm(lng("confirm_change_channel"))) return;
                        channel = this.hotspot.channel, nt = this.hotspot.nt
                    }
                    this.save(channel, nt)
                }
            })), this.child("commentFAQ").$box.bind("click", function() {
                window.open("http://dlink.ru/ru/faq/302/1356.html", "_blank")
            }), this.child("commentFAQ").$innerBox.find(".title").css("cursor", "pointer"), this.child("commentFAQ").$innerBox.find(".title").css("cursor", "pointer"), this.child("commentFAQ").$innerBox.find(".title").attr("title", lng("clientFAQTitle"))
        }
    }, this.save = function(channel, nt) {
        rootView.showModalOverlay();
        var query = new Array,
            apCliEnable = this.child("enable").val(),
            key_type = keys.child("key_type").val() ? "0" : "1",
            wpa_encr = wpa.child("wpa_enc").val(),
            wep_encr = wep.child("wep_encr").val(),
            auth = scan.child("netauth").val(),
            data1 = {},
            client_data = {
                ApCliEnable: apCliEnable,
                ApCliSsid: scan.child("ssid").val(),
                ApCliBssid: scan.child("bssid").val(),
                ApCliAuthMode: auth,
                ApCliKey1Type: key_type,
                ApCliKey2Type: key_type,
                ApCliKey3Type: key_type,
                ApCliKey4Type: key_type,
                ApCliKey1Str: keys.child("key1").val(),
                ApCliKey2Str: keys.child("key2").val(),
                ApCliKey3Str: keys.child("key3").val(),
                ApCliKey4Str: keys.child("key4").val(),
                ApCliDefaultKeyId: (parseInt(keys.child("key_id").val()) + 1).toString(),
                ApCliWPAPSK: scan.child("key_psk").val(),
                ApCliEncrypType: "OPEN" != auth && "SHARED" != auth ? wpa_encr : wep_encr ? "WEP" : "NONE"
            };
        data1.apcli = {}, data1.apcli = client_data, $.extend(this.wifi, data1), query.push(["5G_" == this.GHz ? 186 : 110, data1]);
        var data2 = {},
            wifiBroadcast = scan.child("wifi_broadcast").val();
        if (this.brcst_flag_24 != wifiBroadcast)
            if (is.set(this.wifi.mbssid[this.wifi.mbssidCur - 1].WifiBroadcast)) {
                var tempObj = {
                    mbssid: [{
                        WifiBroadcast: wifiBroadcast ? !0 : !1
                    }]
                };
                _.extend(data2, tempObj)
            }
            else data2.WifiBroadcast = wifiBroadcast ? !0 : !1;
        channel && (data2[this.GHz + "Channel"] = channel), Object.keys(data2).length > 0 && ($.extend(this.wifi, data2), query.push([35, data2]));
        var data3 = {};
        if (nt) {
            var bandwidth;
            switch (nt) {
                case "NONE":
                    bandwidth = "0";
                    break;
                case "BELOW":
                    bandwidth = "1";
                    break;
                case "ABOVE":
                    bandwidth = "2";
                    break;
                default:
                    bandwidth = "3"
            }
            var addon = {
                BandWidth: bandwidth
            };
            data3[this.GHz + "addon_settings"] = addon
        }
        Object.keys(data3).length > 0 && ($.extend(this.addon_settings, data3), query.push([105, data3])), device.config.write(query, callback(this, function() {
            rootView.hideModalOverlay(), this.emit("updaterq")
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay();
        var rpc_list = [];
        rpc_list[rpc_list.length] = "35", rpc_list[rpc_list.length] = "133", device.config.read(rpc_list, callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.brcst_flag_24 = is.set(this.wifi) ? this.wifi.mbssid[this.wifi.mbssidCur - 1].WifiBroadcast : this.wifi, this.addon_settings = this.wifi ? this.wifi.addon_settings : null, this.deep.updateView();
            var list = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null;
            list && (list.sort(sortSigDesc("sig")), hlist.update(this.wifi, list)), this.hotspot = hlist.getActive(), rootView.hideModalOverlay(), this.stopRefresh().startRefresh(0)
        }))
    }), this.bind("hotspotchange", function(status, hotspot, GHz) {
        window.hasChanges = "page", this.hotspot = hotspot, scan.child("ssid").val("< HIDDEN >" != hotspot.ssid ? hotspot.ssid : ""), scan.child("bssid").val(hotspot.bssid.toUpperCase()), scan.child("netauth").val("NONE" == hotspot.security[0] || "WEP" == hotspot.security[0] ? "OPEN" : hotspot.security[0]).fieldchange(), hotspot.security[1] && wpa.child("wpa_enc").val(hotspot.security[1]), this.GHz = GHz, this.hotspot.GHz = GHz
    }), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                value ? scan.show() : scan.hide();
                break;
            case "netauth":
                var wep_encr = wep.child("wep_encr"),
                    key_psk = scan.child("key_psk");
                switch (wep.hide(), wpa.hide(), key_psk.hide(), keys.hide(), value) {
                    case "OPEN":
                        wep_encr.enable().val(!1), wep.show();
                        break;
                    case "SHARED":
                        wep_encr.disable().val(!0), keys.show(), wep.show();
                        break;
                    case "WPAPSK":
                    case "WPA2PSK":
                    case "WPAPSKWPA2PSK":
                        key_psk.show(), wpa.show()
                }
        }
    }), this.update = function() {
        this.virgin && rootView.showModalOverlay(), this.rqId = device.config.read([35], callback(this, function(data) {
            if (this.wifi_refr = is.RPC_SUCCESS(data.rq[0]) ? data.rq[0].resident : null, this.wifi_refr && this.wifi.apcli && this.wifi_refr.apcli) {
                var apcli_old = this.wifi.apcli,
                    apcli_new = this.wifi_refr.apcli;
                _.isEqual(apcli_old, apcli_new) || this.emit("updaterq")
            }
            rootView.hideModalOverlay(), this.startRefresh(this.refreshTime)
        })), this.virgin = !1
    }, this.startRefresh = function(period) {
        return this.refreshId = setTimeout(callback(this, this.update), period), this
    }, this.stopRefresh = function() {
        return device.stop(this.rqId), clearTimeout(this.refreshId), this.virgin = !0, this
    }, this.bind("stoprefreshrq", function() {
        this.stopRefresh()
    })
}

function sortSigDesc(field) {
    return function(x, y) {
        return parseInt(x[field]) < parseInt(y[field])
    }
}

function pageWMF(GHz) {
    pageWMF.superclass.constructor.call(this), this.GHz = GHz || "", this.wifi = null, this.filter = null, this.lanClients = null;
    var modes = {
        wifiMacModeDis: 0,
        wifiMacModeAlw: 1,
        wifiMacModeDen: 2
    };
    this.add(new nodeSelect("wifiMacMode"), "mode"), this.add(new nodeComment), this.add(new node, "grid"), this.updateView = function(phase) {
        if (pageWMF.superclass.updateView.apply(this, arguments), "back" == phase) {
            var mode = this.child("mode").cleanOptions();
            for (var m in modes) m && mode.addOption(m, modes[m]);
            var filter = this.filter;
            if (filter) {
                this.get("mode").val(parseInt(filter[this.GHz + "AccessPolicy"])), this.get("mode").unbind("fieldchange").bind("fieldchange", callback(this, function() {
                    this.save(parseInt(this.child("mode").val()))
                })), this.$grid = this.child("grid").$box.lightUIGrid([{
                    index: "mac",
                    name: "hwaddr"
                }, {
                    index: "hostname",
                    name: "statDhcpHost"
                }, {
                    index: "status",
                    name: "status"
                }], 0, {
                    selectable: !0,
                    clickable: !0
                }), this.maclist = filter[this.GHz + "MacFilterList"] || {};
                for (var i in this.maclist)
                    if ("max_instance" != i) {
                        var $row = this.$grid.addRow().row("last");
                        $row.col("mac").fieldval(this.maclist[i].mac), $row.col("hostname").fieldval(this.maclist[i].hostname), $row.col("status").fieldval(this.maclist[i].active ? "<img src='image/ledgreen.gif'/> " + lng("on") : "<img src='image/ledred.gif'/> " + lng("off")), $row.data("id", i)
                    }
                this.$grid.bind("selection.grid", callback(this, function() {
                    this.updateButtons()
                })), this.$grid.bind("rowclick.grid", callback(this, function(event, $row) {
                    this.edit($row.data("id"))
                })), this.cleanButtonBar().addButton("add").getButton("add").unbind("click.button").bind("click.button", callback(this, function() {
                    this.edit()
                })), this.addButton("button_del").getButton("button_del").unbind("click.button").bind("click.button", callback(this, function() {
                    this.remove()
                })), this.updateButtons()
            }
        }
    }, this.updateButtons = function() {
        var disabledAdd = !1;
        disabledAdd || disableFlag(42) ? this.getButton("add").disable() : this.getButton("add").enable(), this.$grid.selection().length || disableFlag(42) ? this.getButton("button_del").enable() : this.getButton("button_del").disable()
    }, this.save = function(mode) {
        rootView.showModalOverlay(), this.deep.updateModel();
        var data = {};
        data[this.GHz + "AccessPolicy"] = mode, $.extend(this.filter, data), device.config.write(42, data, null, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([42, 187, 35], callback(this, function(data) {
            this.filter = is.RPC_SUCCESS(data) ? data.rq[0].resident : null, this.lanClients = is.RPC_SUCCESS(data) ? data.rq[1].resident : null, this.wifi = is.RPC_SUCCESS(data) ? data.rq[2].resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }), this.edit = function(id) {
        var id = id || null;
        this.$box.unbind();
        var MacFilterRule = this.filter[this.GHz + "MacFilterList"] ? this.filter[this.GHz + "MacFilterList"][id] || {} : {},
            ruleNode = new editWMFRule(MacFilterRule);
        ruleNode.lanClients = this.lanClients, ruleNode.maclist = this.maclist, ruleNode.buttonBar(this.buttonBar()).deep.updateView(this.$outerBox), ruleNode.cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", callback(this, function() {
            (!checkChanges() || confirm(lng("leavePageMes"))) && this.emit("updaterq")
        })), ruleNode.addButton("button_del").getButton("button_del").bind("click.button", callback(this, function() {
            this.remove(id)
        })), ruleNode.addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            if (ruleNode.deep.updateModel(), !ruleNode.status.error) {
                rootView.showModalOverlay();
                var sendData = {};
                sendData[this.GHz + "MacFilterList"] = ruleNode.rule, device.config.write(42, sendData, id ? parseInt(id) : -1, callback(this, function() {
                    rootView.hideModalOverlay(), this.emit("updaterq")
                }))
            }
        })), disableFlag(42) && (ruleNode.getButton("button_save").disable(), ruleNode.getButton("button_del").disable()), id || ruleNode.getButton("button_del").hide()
    }, this.remove = function(id) {
        rootView.showModalOverlay();
        var rParams = [];
        if (id > 0) {
            var rData = {};
            rData[this.GHz + "MacFilterList"] = this.filter[this.GHz + "MacFilterList"][id], rParams.push([42, rData, parseInt(id)])
        }
        else
            for (var rData = {}, rows = this.$grid.selection(), i = rows.length; i > 0; i--) {
                var id = rows.eq(i - 1).data("id");
                rData = {}, rData[this.GHz + "MacFilterList"] = this.filter[this.GHz + "MacFilterList"][id], rParams.push([42, rData, parseInt(id)])
            }
        device.config.remove(rParams, callback(this, function() {
            rootView.hideModalOverlay(), this.emit("updaterq")
        }))
    }
}

function editWMFRule(rule) {
    editWMFRule.superclass.constructor.call(this), this.rule = rule, this.lanClients = [];
    var comboHeader = [{
        index: "ip",
        name: "IP"
    }, {
        index: "mac",
        name: "MAC"
    }];
    this.add(new nodeComboText("hwaddr", rule.mac, {
        header: comboHeader,
        index: "mac",
        mandatory: !0
    }), "mac"), this.add(new nodetext("statDhcpHost", rule.hostname, {
        maxLength: 20
    }), "host"), this.add(new nodeCheckBox("full_on", rule.active ? !0 : !1), "active"), this.updateView = function(phase) {
        if (editWMFRule.superclass.updateView.apply(this, arguments), "back" == phase) {
            var mac = this.get("mac");
            mac.cleanRows();
            for (var i = 0; i < this.lanClients.length; i++) {
                var obj = this.lanClients[i];
                "WLAN" == obj.name && mac.addRow(obj.ip, obj.mac.toUpperCase())
            }
            mac.val(this.rule.mac || "")
        }
    }, this.updateModel = function(status) {
        var mac = this.child("mac").val();
        if (validate_mac_address(mac)) {
            if (mac != this.rule.mac)
                for (var i in this.maclist)
                    if (this.maclist[i].mac == mac) {
                        this.get("mac").setError("wifiMacFilterRuleExert"), status.error = !0;
                        break
                    }
        }
        else this.get("mac").setError("macfltInvalidAddress"), status.error = !0;
        status.error || (this.rule = {}, this.rule.mac = this.child("mac").val(), this.rule.hostname = this.child("host").val(), this.rule.active = this.child("active").val()), this.status = status
    }
}

function _doSaveReboot() {
    confirm(lng("wzwifiSaveOk") + "\n" + lng("wzwifiNeedReboot") + "\n" + lng("wzwifiRebooting") + "\n" + lng("wzwifiReboot")) && (device.system.reboot(!0), rootView.showWaitScreen(lng("rebooting"), 9e4, function() {
        rootView.hideWaitScreen()
    }))
}

function wizardWiFiRouter() {
    wizardWiFiRouter.superclass.constructor.apply(this, arguments), this.wifi = null, this.ifacelist = null, this.step = null, this.GHz = "", this.add(new node, "basic").child("basic").add(new nodeCaption("wzwifiDescSSID")).add(new nodetext("ssid", "", {
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? null : "ssidCyrillicError"
        }]
    }), "ssid"), this.add(new node, "security").child("security").add(new nodeCaption("wzwifiDescSecurity")), this.child("security").add(new nodeSelect("securityAuthMode"), "authmode").add(new nodetext("clientMasterSecurityKey", "", {
        disabled: !0,
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? check_wifi_keypsk(value) ? null : "wifiPSKKeyWrong" : "wifiPSKCyrillicError"
        }]
    }), "key"), this.add(new node, "finish").child("finish").add(new nodeCaption("clientMasterSectSummary")).add(new nodestatic("wzwifiMode"), "mode").add(new nodestatic("ssid"), "ssid").add(new nodestatic("securityAuthMode"), "authmode").add(new nodestatic("clientMasterSecurityKey"), "key"), this.updateModel = function(status) {
        this.status = status
    }, this.checkNext = function() {
        return !this.pluginWizard.isStepLast(this.getActiveIndex())
    }, this.checkPrevious = function() {
        return !this.pluginWizard.isStepFirst(this.getActiveIndex())
    }, this.checkSave = function() {
        return this.pluginWizard.isStepLast(this.getActiveIndex())
    }, this.next = function() {
        this.checkNext() && this.step.deep.updateModel() && this.do_before() && (this.switchStep("next"), this.do_after())
    }, this.previous = function() {
        this.checkPrevious() && (this.switchStep("prev"), this.do_after())
    }, this.do_before = function() {
        return !0
    }, this.do_after = function() {
        if (this.step = this.getActiveStep(), "finish" == this.step.getAlias()) {
            var stat = this.child("finish");
            stat.child("mode").val(lng("wzwifiRouter")), stat.child("ssid").val(this.child("basic/ssid").val()), stat.child("authmode").val(lng("OPEN" == this.child("security/authmode").val() ? "wzwifiOpen" : "wzwifiClose")), stat.child("key").val("OPEN" == this.child("security/authmode").val() ? lng("wzwifiNo") : this.child("security/key").val())
        }
    }, this.save = function() {
        rootView.showModalOverlay();
        var query = [],
            wifi = this.wifi,
            auth = bestAuthMode(wifi.AuthAvailable),
            fielddata = {},
            senddata = {};
        fielddata.basic = {}, fielddata.basic.SSID = makeValidJSONString(this.child("basic/ssid").val()), fielddata.basic.key = "OPEN" != this.child("security/authmode").val() ? this.child("security/key").val() : null;
        var create = {
            basic: function(type, GHz, mbssidCur) {
                var type = type || "basic",
                    GHz = GHz || "",
                    data = fielddata[GHz + type] || {},
                    mbssidCur = mbssidCur || wifi[GHz + "mbssidCur"],
                    obj = {};
                return obj.CountryCode = wifi.CountryCode, obj[GHz + "Channel"] = "auto", obj[GHz + "HideSSID"] = !1, obj[GHz + "mbssid"] = [{
                    SSID: data.SSID || ""
                }], obj[GHz + "WirelessMode"] = bestWirelessMode(wifi[GHz + "ModeAvailable"], "5G_" != GHz ? !1 : !0), obj
            },
            security: function(type, GHz, mbssidCur) {
                var mbssidItem = null,
                    type = type || "basic",
                    GHz = GHz || "",
                    data = fielddata[GHz + type] || {},
                    mbssidCur = mbssidCur || wifi[GHz + "mbssidCur"],
                    mbssid = wifi[GHz + "mbssid"] || {},
                    obj = {};
                obj[GHz + "mbssid"] = [];
                for (var index in mbssid) mbssidItem = mbssid[index], obj[GHz + "mbssid"].push({
                    PreAuth: mbssidItem.PreAuth,
                    EncrypType: mbssidItem.EncrypType,
                    AuthMode: mbssidItem.AuthMode,
                    WPAPSK: mbssidItem.WPAPSK,
                    Key1Str: mbssidItem.Key1Str,
                    Key1Type: mbssidItem.Key1Type,
                    Key2Str: mbssidItem.Key2Str,
                    Key2Type: mbssidItem.Key1Type,
                    Key3Str: mbssidItem.Key3Str,
                    Key3Type: mbssidItem.Key1Type,
                    Key4Str: mbssidItem.Key4Str,
                    Key4Type: mbssidItem.Key1Type,
                    DefaultKeyID: mbssidItem.DefaultKeyID
                });
                return mbssidCur > wifi[GHz + "mbssidNum"] && obj[GHz + "mbssid"].push(_.clone(obj[GHz + "mbssid"][0])), obj[GHz + "mbssid"][mbssidCur - 1].AuthMode = data.key ? auth : "OPEN", obj[GHz + "mbssid"][mbssidCur - 1].WPAPSK = data.key || "", obj[GHz + "mbssid"][mbssidCur - 1].EncrypType = data.key ? "AES" : "NONE", obj[GHz + "RekeyInterval"] = 3600, obj[GHz + "RADIUS_Server"] = wifi[GHz + "RADIUS_Server"], obj[GHz + "RADIUS_Port"] = wifi[GHz + "RADIUS_Port"], obj[GHz + "RADIUS_Key"] = wifi[GHz + "RADIUS_Key"], obj
            },
            common: function(GHz) {
                var GHz = GHz || "",
                    obj = {};
                return obj[GHz + "Radio"] = !0, obj[GHz + "mbssidNum"] = 1, obj[GHz + "mbssidCur"] = 1, obj
            }
        };
        senddata.common = {}, senddata.basic = {}, senddata.security = {}, wifi.Radio || (senddata.common = _.extend(senddata.common, create.common())), senddata.common = _.extend(senddata.common, {
            mbssidCur: 1
        }), senddata.basic = _.extend(senddata.basic, create.basic("basic")), senddata.security = _.extend(senddata.security, create.security("basic")), wifi = _.extend(wifi, senddata.common), _.size(senddata.common) && query.push([39, senddata.common]), _.size(senddata.basic) && query.push([35, senddata.basic]), _.size(senddata.guestcommon1) && query.push([39, senddata.guestcommon1]), _.size(senddata.guestcommon2) && query.push([39, senddata.guestcommon2]), _.size(senddata.guestbasic) && query.push([35, senddata.guestbasic]), _.size(senddata.security) && query.push([36, senddata.security]), _.size(senddata.guestcommon3) && query.push([39, senddata.guestcommon3]);
        var msg = $("<div></div>");
        $(msg).append("<div class='caption'></div><div class='text'></div>"), $(msg).find(".caption").append(lng("clientInWifiMasterSaved")), $(msg).find(".text").append(lng("SSID") + ": <span>" + fielddata.basic.SSID + "</span><br/>"), $(msg).find(".text").append(lng("clientMasterSecurityKey") + ": <span>" + fielddata.basic.key || lng("wzwifiNo") + "</span><br/>"), $(msg).append("<a class='button' href='#'>" + lng("airSafemodeContinue") + "</a>"), $(msg).find("a").bind("click", callback(this, function() {
            return window.wifiWizard && wifiWizard.quickMasterCtrl ? wifiWizard.quickMasterCtrl.event("wifiready") : this.emit("wzsaved.wifi", !0), rootView.hideModalOverlay(), !1
        })), debug("user_interface: " + getCookie("user_interface")), getCookie("user_interface") && "WLAN" == getCookie("user_interface") && (setTimeout(context(this).callback(function() {
            device.stop()
        }), 1e3), setTimeout(context(this).callback(function() {
            rootView.showWaitScreen(msg)
        }), 5e3)), device.config.write(query, callback(this, function(answer) {
            window.wifiWizard && wifiWizard.quickMasterCtrl ? wifiWizard.quickMasterCtrl.event("wifiready") : this.emit("wzsaved.wifi", answer.rq[0] && 12 == answer.rq[0].status), rootView.hideModalOverlay()
        }))
    }, this.updateView = function(phase) {
        if (wizardWiFiRouter.superclass.updateView.apply(this, arguments), "back" == phase) {
            if (this.child("security/authmode").cleanOptions().addOption("wzwifiClose", "CLOSE").addOption("wzwifiOpen", "OPEN").fieldchange(), this.wifi) {
                var mbssid = this.wifi.mbssid,
                    mbssidCur = this.wifi.mbssidCur = 1;
                this.get("basic/ssid").val(mbssid[mbssidCur - 1].SSID)
            }
            this.do_after()
        }
    }, this.update = function(wifi, ifacelist) {
        wifi && ifacelist ? (this.wifi = wifi, this.ifacelist = ifacelist, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read([35, 1], callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.deep.updateView(), rootView.hideModalOverlay()
        })))
    }, this.bind("fieldchange", callback(this, function(status, value) {
        switch (status.target.getAlias()) {
            case "authmode":
                var key = this.child("security/key");
                "OPEN" != value ? key.enable() : key.disable()
        }
    }))
}

function wizardWiFiClient() {
    wizardWiFiClient.superclass.constructor.apply(this, arguments), this.wifi = null, this.step = null, this.hotspot = null, this.ifacelist = null;
    var wz = !0,
        auth_to_encrypt = {
            WPAPSK: "AES",
            WPA2PSK: "AES",
            WPAPSKWPA2PSK: "AES"
        };
    this.add(new node, "scanner").child("scanner").add(new nodeCaption("clientMasterSectScanData")).add(new wifiHotspotList, "hlist"), this.add(new node, "hotspot_ssid").child("hotspot_ssid").add(new nodeCaption("ssid")).add(new nodetext("ssid", "", {
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? null : "ssidCyrillicError"
        }]
    }), "h_ssid"), this.add(new node, "security").child("security").add(new nodeCaption("clientMasterSectAccessKey")).add(new nodetext("clientMasterSecurityKey", "", {
        mandatory: !0,
        re: [callback(this, function(value) {
            return "WEP" == this.hotspot.security[0] || "SHARED" == this.hotspot.security[0] ? check_wifi_key(value) ? null : "wifiWEPKeyWrong" : "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? check_wifi_keypsk(value) ? null : "wifiPSKKeyWrong" : "wifiPSKCyrillicError"
        })]
    }), "key_for_access"), this.add(new node, "broadcast").child("broadcast").add(new nodeCaption("clientWirelessSettings")).add(new nodeCheckBox("wifiBroadcastEnable", !0), "enable").add(new nodetext("ssid", "", {
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? null : "ssidCyrillicError"
        }]
    }), "ssid").add(new node, "security").add(new nodeSelect("securityAuthMode"), "broadcastauthmode").add(new nodetext("clientMasterSecurityKey", "", {
        disabled: !0,
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? check_wifi_keypsk(value) ? null : "wifiPSKKeyWrong" : "wifiPSKCyrillicError"
        }]
    }), "broadcastkey"), this.add(new node, "finish").child("finish").add(new nodeCaption("clientMasterSectSummary")).add(new nodestatic("wzwifiMode"), "mode").add(new nodeCaption("cliSettings"), "cliSettings").add(new nodestatic("wzwifiHotspot"), "hotspot").add(new nodestatic("basicChannel"), "channel").add(new nodestatic("securityAuthMode"), "authmode").add(new nodestatic("clientMasterSecurityKey"), "key").add(new nodestatic("securityWPAEnc"), "encrypt").add(new nodeCaption("broadcastSettings"), "broadcastSettings").add(new nodestatic("clientMasterBroadcast"), "broadcast").add(new nodestatic("ssid"), "ssid").add(new nodestatic("securityAuthMode"), "broadcastauthmode").add(new nodestatic("clientMasterSecurityKey"), "broadcastkey"), (!window.menu_postfix || window.menu_postfix && "_ap" != window.menu_postfix) && this.add(new nodeCaption("wzwifiAtt", "wzwifiAttWAN")), this.updateModel = function(status) {
        this.status = status
    }, this.checkNext = function() {
        return this.getActiveIndex() < this.children.length - 1
    }, this.checkPrevious = function() {
        return this.getActiveIndex() > 0
    }, this.checkSave = function() {
        return this.getActiveIndex() == this.children.length - 1
    }, this.next = function() {
        this.checkNext() && this.step.deep.updateModel() && this.do_before() && (nodeWizard.prototype.next.call(this), this.do_after())
    }, this.previous = function() {
        this.checkPrevious() && (nodeWizard.prototype.previous.call(this), this.do_after())
    }, this.do_before = function() {
        var alias = this.step.getAlias();
        if ("hotspot_ssid" == alias && (this.hotspot.ssid = this.child("hotspot_ssid/h_ssid").val()), "scanner" == alias) {
            var hlist = this.step.child("hlist"),
                hotspot = this.hotspot = hlist.getActive();
            if (this.child("security/key_for_access"), !hotspot) return alert(lng("clientMasterClientNotSelected")), !1;
            "< HIDDEN >" != hotspot.ssid && "" != hotspot.ssid ? (this.skipStepOn("hotspot_ssid"), this.child("hotspot_ssid/h_ssid").val(hotspot.ssid)) : (this.skipStepOff("hotspot_ssid"), this.child("hotspot_ssid/h_ssid").val("")), "NONE" == hotspot.security[0] || "OPEN" == hotspot.security[0] ? (this.skipStepOn("security"), this.child("security/key_for_access").val("")) : (this.skipStepOff("security"), this.child("security/key_for_access").val(""))
        }
        return !0
    }, this.do_after = function() {
        this.step = this.getActiveStep();
        var alias = this.step.getAlias();
        if ("finish" == alias) {
            var is_open = "NONE" == this.hotspot.security[0],
                stat = this.child("finish");
            stat.child("mode").val(lng("wzwifiClient")), stat.child("hotspot").val(this.hotspot.ssid + " [" + this.hotspot.bssid + "]"), stat.child("broadcast").val(lng(this.child("broadcast/enable").val() ? "yes" : "no")), stat.child("ssid").val(this.child("broadcast/ssid").val()), stat.child("broadcastauthmode").val(lng("OPEN" == this.child("broadcast/broadcastauthmode").val() ? "wzwifiOpen" : "wzwifiClose")), stat.child("broadcastkey").val("OPEN" == this.child("broadcast/broadcastauthmode").val() ? lng("wzwifiNo") : this.child("broadcast/broadcastkey").val()), stat.child("authmode").val(lng(is_open ? "wzwifiOpen" : "wzwifiClose")), stat.child("key").val(is_open ? lng("wzwifiNo") : this.child("security/key_for_access").val()), stat.child("channel").val(this.hotspot.channel), stat.child("encrypt").val(lng(this.hotspot.security[1] ? "wzwifiYes" : "wzwifiNo"))
        }
        if ("scanner" == alias && (this.step.child("hlist_cap"), this.step.child("hlist")), "security" == alias && ("NONE" == this.hotspot.security[0] || "OPEN" == this.hotspot.security[0])) {
            if ("broadcast" == this.pa || "finish" == this.pa) return this.previous(), void(this.pa = "scanner");
            if ("scanner" == this.pa) return this.switchStep(2), this.do_after(), void(this.pa = "finish")
        }
        this.pa = alias
    }, this.save = function() {
        rootView.showModalOverlay();
        var query = new Array,
            wifi = this.wifi;
        this.hotspot.ssid = this.child("hotspot_ssid/h_ssid").val();
        var hotspot = this.hotspot,
            nt = (this.addon_settings, this.hotspot.nt),
            accesskey = (hotspot.security[0], this.child("security/key_for_access").val()),
            ssid = makeValidJSONString(this.child("broadcast/ssid").val()),
            authmode = this.child("broadcast/broadcastauthmode").val(),
            key = "OPEN" != authmode ? this.child("broadcast/broadcastkey").val() : null,
            br_auth = bestAuthMode(wifi.AuthAvailable),
            bcast = this.child("broadcast/enable").val(),
            create = {
                basic: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var obj = {
                        CountryCode: wifi.CountryCode
                    };
                    return obj[GHz + "mbssid"] = [{
                        SSID: ssid,
                        WifiBroadcast: bcast
                    }], obj[GHz + "Channel"] = "auto", obj[GHz + "WirelessMode"] = bestWirelessMode(wifi[GHz + "ModeAvailable"], "5G_" != GHz ? !1 : !0), obj[GHz + "MaxStaNum"] = "0", obj[GHz + "HideSSID"] = !1, obj
                },
                security: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var mbssid = wifi[GHz + "mbssid"][wifi[GHz + "mbssidCur"] - 1],
                        obj = {};
                    return obj[GHz + "mbssid"] = [{
                        AuthMode: key ? br_auth : "OPEN" == authmode ? "OPEN" : mbssid.AuthMode,
                        WPAPSK: key ? key : mbssid.WPAPSK,
                        Key1Str: mbssid.Key1Str,
                        Key1Type: mbssid.Key1Type,
                        Key2Str: mbssid.Key2Str,
                        Key2Type: mbssid.Key1Type,
                        Key3Str: mbssid.Key3Str,
                        Key3Type: mbssid.Key1Type,
                        Key4Str: mbssid.Key4Str,
                        Key4Type: mbssid.Key1Type,
                        DefaultKeyID: mbssid.DefaultKeyID,
                        PreAuth: !1,
                        EncrypType: key ? auth_to_encrypt[br_auth] : "OPEN" == authmode ? "NONE" : mbssid.EncrypType
                    }], obj[GHz + "RADIUS_Server"] = wifi[GHz + "RADIUS_Server"], obj[GHz + "RADIUS_Port"] = wifi[GHz + "RADIUS_Port"], obj[GHz + "RADIUS_Key"] = wifi[GHz + "RADIUS_Key"], obj[GHz + "RekeyInterval"] = 3600, obj
                },
                common: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var obj = {};
                    return obj[GHz + "mbssidNum"] = 1, obj[GHz + "mbssidCur"] = 1, obj[GHz + "Radio"] = !0, obj
                }
            },
            data_basic = create.basic(),
            data_security = create.security(),
            dhcpd = this.ifacelist.br0.services.br0.dhcpd;
        "_ap" == window.menu_postfix || dhcpd.enable || (dhcpd.enable = !0, query.push([1, {
            br0: this.ifacelist.br0
        }]));
        var data_apcli = {
            apcli: {
                ApCliEnable: !0,
                ApCliSsid: hotspot.ssid,
                ApCliBssid: hotspot.bssid,
                ApCliDefaultKeyId: "1",
                ApCliWPAPSK: "",
                ApCliKey1Str: "",
                ApCliKey2Str: "",
                ApCliKey3Str: "",
                ApCliKey4Str: ""
            }
        };
        if ($.extend(this.wifi, data_basic, data_security), 0 == wifi.Radio) {
            var data_common = create.common();
            query.push([39, data_common]), $.extend(this.wifi, data_common)
        }
        switch (data_apcli.apcli.ApCliAuthMode = "NONE" == hotspot.security[0] || "WEP" == hotspot.security[0] ? "OPEN" : hotspot.security[0], data_apcli.apcli.ApCliEncrypType = hotspot.security[1] ? hotspot.security[1] : "NONE", hotspot.security[0]) {
            case "WEP":
                data_apcli.apcli.ApCliKey1Str = data_apcli.apcli.ApCliKey2Str = data_apcli.apcli.ApCliKey3Str = data_apcli.apcli.ApCliKey4Str = accesskey;
                break;
            case "NONE":
                break;
            default:
                data_apcli.apcli.ApCliWPAPSK = accesskey
        }
        var dhcpd = this.ifacelist.br0.services.br0.dhcpd;
        "_ap" == window.menu_postfix ? dhcpd.enable && (dhcpd.enable = !1, query.push([1, {
            br0: this.ifacelist.br0
        }])) : dhcpd.enable || (dhcpd.enable = !0, query.push([1, {
            br0: this.ifacelist.br0
        }])), $.extend(this.wifi, data_apcli);
        var cli_channel = {},
            cur_Ghz = "5G" == this.GHz_cli ? "5G_Channel" : "Channel";
        cli_channel[cur_Ghz] = hotspot.channel, $.extend(data_basic, cli_channel), $.extend(this.wifi, data_basic);
        var data3 = {};
        if (nt) {
            var bandwidth;
            switch (nt) {
                case "NONE":
                    bandwidth = "0";
                    break;
                case "BELOW":
                    bandwidth = "1";
                    break;
                case "ABOVE":
                    bandwidth = "2";
                    break;
                default:
                    bandwidth = "3"
            }
            var addon = {
                BandWidth: bandwidth
            };
            data3[("5G" == this.GHz_cli ? "5G_" : "") + "addon_settings"] = addon
        }
        $.extend(this.addon_settings, data3), query.push([105, data3]), query.push([36, data_security]), query.push([35, data_basic]), query.push(["5G" == this.GHz_cli ? 186 : 110, data_apcli]), device.config.write(query, callback(this, function() {
            this.emit("wzsaved.wifi"), rootView.hideModalOverlay()
        }))
    }, this.updateView = function(phase) {
        wizardWiFiClient.superclass.updateView.apply(this, arguments), "back" == phase && (this.child("broadcast/broadcastauthmode").cleanOptions().addOption("wzwifiClose", "CLOSE").addOption("wzwifiOpen", "OPEN").fieldchange(), this.wifi && this.get("broadcast/ssid").val(this.wifi.mbssid[0].SSID), this.do_after())
    }, this.bind("fieldchange", function(status, value) {
        var ssid = this.child("broadcast/ssid"),
            auth = this.child("broadcast/broadcastauthmode"),
            key = this.child("broadcast/broadcastkey"),
            ssid_finish = this.child("finish/ssid"),
            mode_finish = this.child("finish/broadcastauthmode"),
            key_finish = this.child("finish/broadcastkey"),
            flag_enable = this.child("broadcast/enable").val();
        switch (status.target.getAlias()) {
            case "broadcastauthmode":
                var key = this.child("broadcast/broadcastkey");
                "OPEN" != value ? key.enable() : (this.child("broadcast/broadcastkey").val(""), key.disable())
        }
        flag_enable ? (ssid.show(), auth.show(), key.show(), "OPEN" == this.child("broadcast/broadcastauthmode").value && (key.disable(), key.value = ""), ssid_finish.show(), mode_finish.show(), key_finish.show()) : (ssid.hide(), auth.hide(), key.hide(), ssid_finish.hide(), mode_finish.hide(), key_finish.hide())
    }), this.update = function(wifi, ifacelist) {
        var hlist = this.step.child("hlist");
        hlist.update(null, null, wz), wifi && ifacelist ? (this.ifacelist = ifacelist, this.wifi = wifi, this.addon_settings = wifi.addon_settings, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read([1, 35], callback(this, function(data) {
            this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : null, this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.addon_settings = this.wifi ? this.wifi.addon_settings : null, this.deep.updateView(), rootView.hideModalOverlay()
        })))
    }
}

function wizardWiFiDisabler() {
    wizardWiFiDisabler.superclass.constructor.apply(this, arguments), this.wifi = null, this.step = null, this.add(new node, "finish").child("finish").add(new nodeCaption("clientMasterSectSummary")).add(new nodestatic("wzwifiMode"), "mode"), this.updateModel = function(status) {
        this.status = status
    }, this.checkNext = function() {
        return this.getActiveIndex() < this.children.length - 1
    }, this.checkPrevious = function() {
        return this.getActiveIndex() > 0
    }, this.checkSave = function() {
        return this.getActiveIndex() == this.children.length - 1
    }, this.next = function() {
        this.checkNext() && this.step.deep.updateModel() && this.do_before() && (this.switchStep(this.getActiveIndex() + 1), this.do_after())
    }, this.previous = function() {
        this.checkPrevious() && (this.switchStep(this.getActiveIndex() - 1), this.do_after())
    }, this.do_before = function() {
        return !0
    }, this.do_after = function() {
        this.step = this.getActiveStep(), "finish" == this.step.getAlias() && this.child("finish/mode").val(lng("wzwifiDisableWiFi"))
    }, this.save = function() {
        var create = (this.wifi, {
            common: function() {
                var obj = {};
                return obj.mbssidNum = 1, obj.mbssidCur = 1, obj.Radio = !1, obj
            }
        });
        rootView.showModalOverlay();
        var query = new Array,
            data_common = create.common();
        query.push([39, data_common]), $.extend(this.wifi, data_common), device.config.write(query, callback(this, function() {
            this.emit("wzsaved.wifi"), rootView.hideModalOverlay()
        }))
    }, this.updateView = function(phase) {
        wizardWiFiDisabler.superclass.updateView.apply(this, arguments), "back" == phase && this.do_after()
    }, this.update = function(wifi) {
        wifi ? (this.wifi = wifi, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read(35, callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        })))
    }
}

function wizardWiFiMulti(quick) {
    wizardWiFiMulti.superclass.constructor.apply(this, arguments), this.wifi = null, this.ifacelist = null, this.step = null, this.subwz = null, this.add(new node, "mode").child("mode").add(new nodeCaption("wzwifiGenMode"));
    var radioOpt = [];
    radioOpt.push({
        name: "wzwifiRouter",
        value: "router",
        comment: "wzwifiDescRouter",
        checked: !0
    }), hideFlag(110) || quick || radioOpt.push({
        name: "wzwifiClient",
        value: "client",
        comment: "wzwifiDescClient"
    }), hideFlag("wifi.Radio") || radioOpt.push({
        name: "wzwifiDisable",
        value: "off",
        comment: "wzwifiDescDisable"
    }), this.child("mode").add(new nodeOptionsRadio("wzwifiMode", "", {
        options: radioOpt
    }), "mode"), this.add(new wizardWiFiRouter, "router"), quick || this.add(new wizardWiFiClient, "client"), this.add(new wizardWiFiDisabler, "off"), this.updateModel = function(status) {
        this.status = status
    }, this.checkNext = function() {
        return this.step.checkNext ? this.step.checkNext() : this.getActiveIndex() < this.children.length - 1
    }, this.checkPrevious = function() {
        return this.getActiveIndex() > 0
    }, this.checkSave = function() {
        return this.step.checkSave && this.step.checkSave()
    }, this.next = function() {
        this.checkNext() && this.do_before() && ("mode" == this.step.getAlias() ? (this.subwz = this.child("mode/mode").val(), this.switchStep(this.subwz), this.child(this.subwz).update(this.wifi, this.ifacelist)) : this.step.next(), this.do_after())
    }, this.previous = function() {
        this.checkPrevious() && (this.step instanceof nodeWizard ? this.step.checkPrevious() ? this.step.previous() : this.switchStep("mode") : this.switchStep(this.subwz), this.do_after())
    }, this.do_before = function() {
        return !0
    }, this.do_after = function() {
        this.step = this.getActiveStep()
    }, this.save = function() {
        this.checkSave() && this.step.save()
    }, this.updateView = function(phase) {
        wizardWiFiMulti.superclass.updateView.apply(this, arguments), "back" == phase && this.do_after()
    }, this.update = function(wifi, ifacelist) {
        wifi && ifacelist ? (this.wifi = wifi, this.ifacelist = ifacelist, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read([35, 1], callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.deep.updateView(), rootView.hideModalOverlay()
        })))
    }, this.bind("wzsaved.wifi", function() {})
}

function pageWiFiWizard(quick) {
    pageWiFiWizard.superclass.constructor.apply(this, arguments), this.wifi = null, this.ifacelist = null;
    var wizard = this.add(new wizardWiFiMulti(quick), "wizard").child("wizard");
    this.updateModel = function(status) {
        this.status = status
    }, this.do_logic = function() {
        wizard.checkPrevious() ? this.getButton("button_prev").show() : this.getButton("button_prev").hide(), wizard.checkNext() ? this.getButton("button_next").show() : this.getButton("button_next").hide(), wizard.checkSave() ? this.getButton("button_save").show() : this.getButton("button_save").hide()
    }, this.next = function() {
        wizard.next(), this.do_logic()
    }, this.previous = function() {
        wizard.previous(), this.do_logic()
    }, this.save = function() {
        wizard.save()
    }, this.reboot = function() {
        rootCtrl.event("cfgsaverebootrq")
    }, this.updateView = function(phase) {
        pageWiFiWizard.superclass.updateView.apply(this, arguments);
        for (var radio = wizard.child("mode").child(1), radioOptions = radio.options.options, i = 0; i < radioOptions.length; i++)
            if ("client" == radioOptions[i].value) {
                this.wifi && this.wifi.wds && "0" != this.wifi.wds.WdsEnable ? (radio.child(i).disable(), radio.child(i).setComment("clientWDSComment")) : (radio.child(i).enable(), radio.child(i).setComment("wzwifiDescClient"));
                break
            }
            "back" == phase && (this.cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", callback(this, this.previous)).hide(), this.addButton("button_next").getButton("button_next").bind("click.button", callback(this, this.next)).hide(), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, this.save)).hide(), this.do_logic())
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([35, 1], callback(this, function(data) {
           this.wifi = is.RPC_SUCCESS(data.rq) ? data.rq.resident : null, this.ifacelist = is.RPC_SUCCESS(data.rq) ? data.rq.resident.iface_names : {}, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }), this.bind("wzsaved.wifi", function(e, needreboot) {
        window.wifiWizard && wifiWizard.quickMasterCtrl ? wifiWizard.quickMasterCtrl.event("wifiready") : (this.getButton("button_prev").hide(), this.getButton("button_next").hide(), this.getButton("button_save").hide(), needreboot || (alert(lng("wzwifiSaveOk")), document.location.hash = "", location.reload(!0)))
    })
}

function pageWiFiRepeaterWizard() {
    pageWiFiRepeaterWizard.superclass.constructor.apply(this, arguments), this.wifi = null, this.ifacelist = null;
    var wizard = this.add(new wizardWiFiRepeater, "wizard").child("wizard");
    this.updateModel = function(status) {
        this.status = status
    }, this.do_logic = function() {
        wizard.checkPrevious() ? (this.getButton("button_prev").show(), this.getButton("button_cancel").hide()) : (this.getButton("button_prev").hide(), this.getButton("button_cancel").show()), wizard.checkNext() ? this.getButton("button_next").show() : this.getButton("button_next").hide(), wizard.checkSave() ? this.getButton("button_save").show() : this.getButton("button_save").hide()
    }, this.next = function() {
        wizard.next(), this.do_logic()
    }, this.previous = function() {
        wizard.previous(), this.do_logic()
    }, this.save = function() {
        wizard.save()
    }, this.reboot = function() {
        rootCtrl.event("cfgsaverebootrq")
    }, this.updateView = function(phase) {
        pageWiFiRepeaterWizard.superclass.updateView.apply(this, arguments), "back" == phase && (this.cleanButtonBar().addButton("button_prev").getButton("button_prev").bind("click.button", callback(this, this.previous)).hide(), this.addButton("button_next").getButton("button_next").bind("click.button", callback(this, this.next)).hide(), this.addButton("button_cancel").getButton("button_cancel").bind("click.button", callback(this, function() {
            document.location.hash = "", location.reload(!0)
        })).hide(), this.addButton("button_save").getButton("button_save").bind("click.button", callback(this, this.save)).hide(), this.do_logic())
    }, this.bind("updaterq", function() {
        rootView.showModalOverlay(), device.config.read([35, 1], callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data.rq[0]) ? data.rq[0].resident : null, this.ifacelist = is.RPC_SUCCESS(data.rq[1]) ? data.rq[1].resident.iface_names : {}, this.deep.updateView(), wizard.update(this.wifi, this.ifacelist), rootView.hideModalOverlay()
        }))
    }), this.bind("wzsaved.wifi", function(e, needreboot) {
        window.wifiWizard && wifiWizard.quickMasterCtrl ? wifiWizard.quickMasterCtrl.event("wifiready") : (this.getButton("button_prev").hide(), this.getButton("button_next").hide(), this.getButton("button_save").hide(), needreboot || (alert(lng("wzwifiSaveOk")), document.location.hash = "", location.reload(!0)))
    })
}

function bestAuthMode(AuthAvailable) {
    function find(value) {
        for (var i = AuthAvailable.length; i > 0; i--) {
            var auth = AuthAvailable[i - 1];
            if (auth.Id.toUpperCase().search(value.toUpperCase()) >= 0) return auth.Id
        }
        return null
    }
    for (var bestlist = ["WPAPSKWPA2PSK", "WPA2PSK", "WPAPSK"], i = 0; i < bestlist.length; i++) {
        var id = find(bestlist[i]);
        if (is.set(id)) return id
    }
    return "WPAPSK"
}

function wifiWEPForm() {
    wifiWEPForm.superclass.constructor.apply(this, arguments);
    var wep_keys = {
            1: "0",
            2: "1",
            3: "2",
            4: "3"
        },
        checkWEP = callback(this, function(value) {
            var hexKeys = keys.child("key_type").val(),
                status = null,
                wepBit = keys.child("key_bit").val(),
                wepCheck = check_wifi_key_ex(value, hexKeys, wepBit);
            return wepCheck || (status = hexKeys ? "wifiWEPKeyWrongHEXSize" + wepBit : "wifiWEPKeyWrong" + wepBit), (!status && hexKeys && !check_wifi_key_hex(value) || value.match(/\s/)) && (status = "wifiWEPKeyWrongHEX"), status
        });
    this.add(new nodeCaption("securitySectWEP")).add(new nodeCheckBox("securityWEP", !1), "wep_encr").add(new node({
        hidden: !0
    }), "keys");
    var keys = this.child("keys").add(new nodeSelect("securityWEPKeyID"), "key_id").add(new nodeCheckBox("securityWEPKeyHEX", !1), "key_type").add(new nodeSelect("securityWEPKeyLength"), "key_bit").add(new nodetext(lng("securityWEPKey") + " (1)", "", {
        mandatory: !0,
        re: [checkWEP]
    }), "key1");
    keys.child("key_bit").addOption("64bit", 64), keys.child("key_bit").addOption("128bit", 128);
    for (var i = 2; 4 >= i; i++) keys.add(new nodetext(lng("securityWEPKey") + " (" + i + ")", "", {
        mandatory: !0,
        re: [checkWEP]
    }), "key" + i);
    this.updateView = function(phase) {
        if (wifiWEPForm.superclass.updateView.apply(this, arguments), "back" == phase) {
            var key_id = keys.child("key_id").cleanOptions();
            for (var i in wep_keys) key_id.addOption(i, wep_keys[i])
        }
    }, this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "wep_encr":
                value ? keys.show() : keys.hide()
        }
    })
}

function wifiWPAForm() {
    wifiWPAForm.superclass.constructor.apply(this, arguments);
    var wpa_encrypts = {
        TKIP: "TKIP",
        AES: "AES",
        "TKIP+AES": "TKIPAES"
    };
    this.add(new nodeCaption("securitySectWPA")).add(new nodeSelect("securityWPAEnc"), "wpa_enc").add(new nodenum("securityWPARen", 3600, {
        minval: 0,
        maxval: 1e6,
        mandatory: !0
    }), "wpa_ren"), this.setEncryption = function(exceptions) {
        is.array(exceptions) || (exceptions = new Array);
        var wpa_enc = this.child("wpa_enc").cleanOptions();
        for (var i in wpa_encrypts) - 1 == $.inArray(i, exceptions) && wpa_enc.addOption(i, wpa_encrypts[i]);
        wpa_enc.correctValue()
    }, this.updateView = function(phase) {
        wifiWPAForm.superclass.updateView.apply(this, arguments), "back" == phase && this.setEncryption()
    }
}

function wifiSecurityForm(GHz) {
    wifiSecurityForm.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1)), this.wifi = null, this.mbssidIndex = null, this.modeN = !1, this.GHz = is.set(GHz) ? GHz : "", this.add(new nodeSelect("securityAuthMode", "OPEN"), "netaut").add(new nodetext("securityKeyPSK", "", {
        hidden: !0,
        mandatory: !0,
        re: [function(value) {
            return "" == value || new RegExp("^[^а-яА-ЯёЁ]+$").test(value) ? check_wifi_keypsk(value) ? null : "wifiPSKKeyWrong" : "wifiPSKCyrillicError"
        }]
    }), "key_psk").add(new nodeCheckBox("securityPreAuth", !1, {
        hidden: !0
    }), "pre_auth").add(new wifiWEPForm({
        hidden: !0
    }), "wep");
    var wep = this.child("wep"),
        keys = wep.child("keys"),
        radius = this.add(new node({
            hidden: !0
        }), "radius").child("radius").add(new nodeCaption("securitySectRadius")).add(new nodeip("ip_address", "192.168.0.254", {
            mandatory: !0
        }), "rad_ip").add(new nodenum("port", 1812, {
            minval: 1,
            maxval: 65535,
            mandatory: !0
        }), "rad_port").add(new nodetext("securityRadiusKey", "dlink", {
            mandatory: !0
        }), "rad_key"),
        wpa = this.add(new wifiWPAForm({
            hidden: !0
        }), "wpa").child("wpa");
    this.updateModel = function(status) {
        this.status = status
    }, this.updateWPAEncryption = function() {
        var auth = this.child("netaut").val(),
            exceptions = new Array,
            modeNMixed = 9 == parseInt(this.wifi[this.GHz + "WirelessMode"]) || 12 == parseInt(this.wifi[this.GHz + "WirelessMode"]) ? !0 : !1;
        switch (this.modeN && (exceptions = modeNMixed ? ["TKIP"] : ["TKIP+AES", "TKIP"]), auth) {
            case "WPA":
                this.modeN || (exceptions = ["TKIP+AES", "AES"]);
                break;
            case "WPA2":
            case "WPA1WPA2":
                this.modeN || "WPA2" != auth || (exceptions = ["TKIP+AES", "TKIP"]), "WPA1WPA2" == auth && (exceptions = ["AES", "TKIP"]);
                break;
            case "WPAPSKWPA2PSK":
            case "WPA2PSK":
                "WPAPSKWPA2PSK" == auth && (exceptions = ["AES", "TKIP"])
        }
        wpa.setEncryption(exceptions)
    }, this.updateView = function(phase) {
        if (wifiSecurityForm.superclass.updateView.apply(this, arguments), "back" == phase && this.wifi) {
            var wifi = this.wifi,
                mbssidIndex = this.mbssidIndex ? this.mbssidIndex : wifi[this.GHz + "mbssidCur"] - 1,
                mbssid = this.wifi[this.GHz + "mbssid"][mbssidIndex];
            this.wifi[this.GHz + "mbssid"][mbssidIndex] = mbssid;
            var wep_encr = wep.child("wep_encr"),
                wpa_enc = wpa.child("wpa_enc");
            wifi[this.GHz + "WirelessMode"] && parseInt(wifi[this.GHz + "WirelessMode"]) >= 6 ? (this.modeN = !0, wep_encr.val(!1), ("OPEN-IEEE8021X" == mbssid.AuthMode || "SHARED" == mbssid.AuthMode || "WEPAUTO" == mbssid.AuthMode) && (mbssid.AuthMode = "OPEN")) : this.modeN = !1;
            var netaut = this.child("netaut").cleanOptions(),
                exceptions = this.modeN ? ["Open-IEEE8021X", "Shared", "WEPAUTO"] : [];
            for (var i in wifi.AuthAvailable) - 1 == $.inArray(wifi.AuthAvailable[i].Name, exceptions) && netaut.addOption(wifi.AuthAvailable[i].Name, wifi.AuthAvailable[i].Id);
            netaut.val(mbssid.AuthMode).fieldchange(), this.updateWPAEncryption(), "WEP" == mbssid.EncrypType || "SHARED" == mbssid.AuthMode || "WEPAUTO" == mbssid.AuthMode ? wep_encr.val(!0).fieldchange() : (wep_encr.val(!1).fieldchange(), ("TKIP" == mbssid.EncrypType || "AES" == mbssid.EncrypType || "TKIPAES" == mbssid.EncrypType) && wpa_enc.val(mbssid.EncrypType).correctValue()), this.modeN && wep.hide(), keys.child("key_type").val("" != mbssid.Key1Type ? "0" == mbssid.Key1Type : !1), keys.child("key1").val(mbssid.Key1Str);
            var multipler = 1;
            keys.child("key_type").val() && (multipler = 2);
            var keylen = keys.child("key1").val().length;
            keys.child("key_bit").val(keylen >= 6 * multipler ? 128 : 64), keys.child("key2").val(mbssid.Key2Str), keys.child("key3").val(mbssid.Key3Str), keys.child("key4").val(mbssid.Key4Str), keys.child("key_id").val(mbssid.DefaultKeyID), radius.child("rad_ip").val(wifi[this.GHz + "RADIUS_Server"]), radius.child("rad_port").val(wifi[this.GHz + "RADIUS_Port"]), radius.child("rad_key").val(wifi[this.GHz + "RADIUS_Key"]), this.child("key_psk").val(mbssid.WPAPSK), this.child("pre_auth").val(mbssid.PreAuth), wpa.child("wpa_ren").val(wifi[this.GHz + "RekeyInterval"])
        }
    }, this.save = function(cb) {
        var mbssidIndex = this.mbssidIndex ? this.mbssidIndex : this.wifi[this.GHz + "mbssidCur"] - 1,
            auth = this.child("netaut").val(),
            key_type = keys.child("key_type").val() ? "0" : "1",
            data = {};
        data[this.GHz + "mbssid"] = this.wifi[this.GHz + "mbssid"], data[this.GHz + "mbssid"][mbssidIndex] = {
            AuthMode: auth,
            WPAPSK: this.child("key_psk").val(),
            Key1Str: keys.child("key1").val(),
            Key1Type: key_type,
            Key2Str: keys.child("key2").val(),
            Key2Type: key_type,
            Key3Str: keys.child("key3").val(),
            Key3Type: key_type,
            Key4Str: keys.child("key4").val(),
            Key4Type: key_type,
            DefaultKeyID: keys.child("key_id").val(),
            PreAuth: this.child("pre_auth").val(),
            EncrypType: "OPEN" != auth && "OPEN-IEEE8021X" != auth && "SHARED" != auth && "WEPAUTO" != auth ? wpa.child("wpa_enc").val() : wep.child("wep_encr").val() ? "WEP" : "NONE"
        }, data[this.GHz + "RADIUS_Server"] = radius.child("rad_ip").val(), data[this.GHz + "RADIUS_Port"] = radius.child("rad_port").val().toString(), data[this.GHz + "RADIUS_Key"] = radius.child("rad_key").val(), data[this.GHz + "RekeyInterval"] = wpa.child("wpa_ren").val().toString(), $.extend(this.wifi, data), "OPEN" == auth && "NONE" == data[this.GHz + "mbssid"][mbssidIndex].EncrypType && alert(lng("securityAuthModeWarningOpen")), device.config.write(36, data, cb)
    }, this.autosave = function(autoupdate) {
        this.deep.updateModel() && (rootView.showModalOverlay(), this.save(callback(this, function(autoupdate) {
            rootView.hideModalOverlay(), autoupdate && this.update()
        }, autoupdate)))
    }, this.update = function(wifi) {
        wifi ? (this.wifi = wifi, this.deep.updateView()) : (rootView.showModalOverlay(), device.config.read(35, callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), rootView.hideModalOverlay()
        })))
    }, this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "netaut":
                wep.hide(), wpa.hide();
                var key_psk = this.child("key_psk").hide(),
                    pre_auth = this.child("pre_auth").hide(),
                    wep_encr = wep.child("wep_encr");
                switch (radius.hide(), value) {
                    case "OPEN":
                        this.modeN || (wep_encr.enable().val(!1).fieldchange(), wep.show());
                        break;
                    case "OPEN-IEEE8021X":
                        wep_encr.enable(), wep.show(), radius.show();
                        break;
                    case "SHARED":
                    case "WEPAUTO":
                        wep_encr.disable().val(!0).fieldchange(), wep.show();
                        break;
                    case "WPA":
                        radius.show(), wpa.show();
                        break;
                    case "WPA2":
                    case "WPA1WPA2":
                        radius.show(), pre_auth.show(), wpa.show();
                        break;
                    case "WPAPSKWPA2PSK":
                    case "WPA2PSK":
                        key_psk.show(), wpa.show(), pre_auth.hide();
                        break;
                    case "WPAPSK":
                        key_psk.show(), wpa.show()
                }
                this.updateWPAEncryption()
        }
    })
}

function pageWiFiSecurity(GHz) {
    pageWiFiSecurity.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1));
    var basic = this.add(new wifiSecurityForm(GHz), "basic").child("basic");
    this.updateView = function(phase) {
        pageWiFiSecurity.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            basic.autosave(!0)
        }))
    }, this.bind("updaterq", function() {
        this.deep.updateView(), basic.update()
    })
}

function pageWiFiStationList() {
    pageWiFiStationList.superclass.constructor.call(this), this.wifi = null, this.stations = null, this.$grid = null, this.updateView = function(phase) {
        if (pageWiFiStationList.superclass.updateView.apply(this, arguments), "forward" == phase) {
            this.cleanButtonBar().$box.empty();
            for (var table = [], params = this.wifi, i = 0; i < params; i++) table.push({
                index: params[i],
                name: "staList" + params[i]
            });
            this.$grid = this.$box.html("					<div class='grid rm'></div>				").find(".grid").lightUIGrid(table, this.stations ? this.stations.length : -1, {
                selectable: !0
            });
            for (var i = 0; this.stations && i < this.stations.length; i++)
                for (var station = this.stations[i], $row = this.$grid.row(i), j = 0; j < params.length; j++) {
                    var param = params[j];
                    switch (param) {
                        case "online":
                            value = is.set(station[param]) ? station[param] < 60 ? getDuration(station[param], !0) : getDuration(station[param]) : "-";
                            break;
                        case "tx_bytes":
                        case "rx_bytes":
                            value = is.set(station[param]) ? lookSize(station[param]).toString() : "-";
                            break;
                        case "lastTxRate":
                            value = is.set(station[param]) ? lookSpeed(1024 * station[param] * 1024 / 8).toString() : "-";
                            break;
                        case "rssi":
                            value = is.set(station[param]) ? station[param].toString() + "%" : "-";
                            break;
                        default:
                            value = is.set(station[param]) ? station[param].toString() : "-"
                    }
                    $row.col(params[j]).fieldval(value)
                }
            this.addButton("stalstDisas").getButton("stalstDisas").bind("click.button", callback(this, function() {
                var selection = this.$grid.selection();
                if (selection.length) {
                    for (var maclist = new Array, i = 0; i < this.$grid.nrow(); i++) {
                        var $row = this.$grid.row(i);
                        $row.selected() && $row.col("mac") && maclist.push($row.col("mac").fieldval())
                    }
                    selection.moveTo(), this.disconnect(maclist)
                }
                else alert(lng("staListForDelEmpty"))
            })), this.addButton("refresh").getButton("refresh").bind("click.button", callback(this, function() {
                this.update()
            }))
        }
    }, this.disconnect = function(maclist) {
        rootView.showModalOverlay(), device.config.write(108, maclist, callback(this, function() {
            rootView.hideModalOverlay()
        }))
    }, this.turn_on = function() {
        rootView.showModalOverlay();
        var create = {
                common: function() {
                    var obj = {};
                    return obj.mbssidNum = 1, obj.mbssidCur = 1, obj.Radio = !0, obj
                }
            },
            data = create.common();
        $.extend(this.wifi, data), device.config.write(39, data, callback(this, function() {
            rootView.hideModalOverlay(), this.update()
        }))
    }, this.updateList = function() {
        device.config.read(64, callback(this, function(data) {
            return this.stations = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), this.stations
        }))
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read(35, callback(this, function(data) {
            this.wifi = is.RPC_SUCCESS(data) ? data.resident : null;
            var wifiOff;
            if (this.wifi || (wifiOff = !0), wifiOff) {
                this.stations = null;
                var lngradio = lng("clientListConfTurnOn") + "?";
                confirm(lngradio) ? this.turn_on() : this.deep.updateView()
            }
            else this.stations = this.updateList();
            rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update)
}

function wifiWMMGrid(mode) {
    wifiWMMGrid.superclass.constructor.apply(this, Array.prototype.slice.call(arguments, 1)), this.settings = null, this.$grid = null, this.mode = mode;
    var valset1_2 = {
            1: 1,
            3: 2
        },
        valset1_3 = {
            1: 1,
            3: 2,
            7: 3
        },
        valset1_4 = {
            1: 1,
            3: 2,
            7: 3,
            15: 4
        },
        valset1_6 = {
            1: 1,
            3: 2,
            7: 3,
            15: 4,
            31: 5,
            63: 6
        },
        valset1_10 = {
            1: 1,
            3: 2,
            7: 3,
            15: 4,
            31: 5,
            63: 6,
            127: 7,
            255: 8,
            511: 9,
            1023: 10
        },
        header = [{
            index: "ac",
            name: "AC"
        }, {
            index: "aifsn",
            name: "Aifsn (1~15)"
        }, {
            index: "cwmin",
            name: "CWMin"
        }, {
            index: "cwmax",
            name: "CWMax"
        }, {
            index: "txop",
            name: "Txop"
        }, {
            index: "acm",
            name: "ACM"
        }];
    "ap" == this.mode && header.push({
        index: "ack",
        name: "Ack"
    }), this.updateModel = function(status) {
        status.error &= !this.$grid.cleanErrors().checkMandatory(), this.status = status
    }, this.updateView = function(phase) {
        if (wifiWMMGrid.superclass.updateView.apply(this, arguments), "back" == phase) {
            this.$grid = this.$box.empty().html("				<div class='grid'></div>			").find(".grid").lightUIGrid(header, this.settings ? this.settings.length : 0, {
                id: "grid" + mode
            }), this.$box.find("tr").css("direction", "ltr"), this.$grid.colEditable("aifsn", "number", {
                mandatory: !0,
                minval: 1,
                maxval: 15
            }).colEditable("txop", "number", {
                mandatory: !0,
                minval: 0,
                maxval: 9999
            }).colEditable("acm", "select", {
                options: {
                    wmmOff: "0",
                    wmmOn: "1"
                }
            }), "ap" == this.mode && this.$grid.colEditable("ack", "select", {
                options: {
                    wmmOff: "0",
                    wmmOn: "1"
                }
            });
            for (var i = 0; this.settings && i < this.settings.length; i++) {
                var settings = this.settings[i],
                    $row = this.$grid.row(i);
                switch (i) {
                    case 0:
                        $row.col("ac").fieldval("AC_BK"), $row.col("cwmin").editable("select", {
                            options: valset1_4
                        }), $row.col("cwmax").editable("select", {
                            options: valset1_10
                        });
                        break;
                    case 1:
                        $row.col("ac").fieldval("AC_BE"), $row.col("cwmin").editable("select", {
                            options: valset1_4
                        }), $row.col("cwmax").editable("select", {
                            options: "ap" == this.mode ? valset1_6 : valset1_10
                        });
                        break;
                    case 2:
                        $row.col("ac").fieldval("AC_VI"), $row.col("cwmin").editable("select", {
                            options: valset1_3
                        }), $row.col("cwmax").editable("select", {
                            options: valset1_4
                        });
                        break;
                    case 3:
                        $row.col("ac").fieldval("AC_VO"), $row.col("cwmin").editable("select", {
                            options: valset1_2
                        }), $row.col("cwmax").editable("select", {
                            options: valset1_3
                        })
                }
                $row.col("aifsn").fieldval(settings.aifsn), $row.col("cwmin").fieldval(settings.cwmin), $row.col("cwmax").fieldval(settings.cwmax), $row.col("txop").fieldval(settings.txop), $row.col("acm").fieldval(settings.acm), "ap" == this.mode && $row.col("ack").fieldval(settings.ack)
            }
        }
    }, this.data = function() {
        if (this.deep.updateModel(), !this.status.error) {
            for (var settings = new Array, i = 0; i < this.$grid.nrow(); i++) {
                var $row = this.$grid.row(i),
                    obj = {
                        aifsn: $row.col("aifsn").fieldval(),
                        cwmin: $row.col("cwmin").fieldval(),
                        cwmax: $row.col("cwmax").fieldval(),
                        txop: $row.col("txop").fieldval(),
                        acm: $row.col("acm").fieldval()
                    };
                "ap" == this.mode && (obj.ack = $row.col("ack").fieldval()), settings.push(obj)
            }
            return settings
        }
        return null
    }, this.update = function(settings) {
        this.settings = settings, this.deep.updateView()
    }
}

function pageWiFiWMM() {
    pageWiFiWMM.superclass.constructor.call(this), this.wmm = null, this.add(new nodeCheckBox("wmmEnable", !1), "enable").add(new node({
        hidden: !0
    }), "settings").child("settings").add(new nodeCaption("wmmSectAP")).add(new wifiWMMGrid("ap"), "ap").add(new nodeCaption("wmmSectSta")).add(new wifiWMMGrid("sta"), "sta"), this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        pageWiFiWMM.superclass.updateView.apply(this, arguments), "forward" == phase && this.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
            var ap = this.child("settings/ap").data(),
                sta = this.child("settings/sta").data();
            ap && sta && this.save(this.child("enable").val(), ap, sta)
        }))
    }, this.save = function(enable, ap, sta) {
        rootView.showModalOverlay(), this.wmm = {
            WmmCapable: enable,
            ap: enable ? ap : this.wmm.ap,
            sta: enable ? sta : this.wmm.sta
        }, device.config.write(111, this.wmm, callback(this, function() {
            this.update()
        }))
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read(111, callback(this, function(data) {
            this.wmm = is.RPC_SUCCESS(data) ? data.resident : null, this.deep.updateView(), this.wmm && (this.child("enable").val(this.wmm.WmmCapable).fieldchange(), this.child("settings/ap").update(this.wmm.ap), this.child("settings/sta").update(this.wmm.sta)), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "enable":
                var settings = this.child("settings");
                value ? settings.show() : settings.hide()
        }
    })
}

function pageWiFiWPS(GHz) {
    pageWiFiWPS.superclass.constructor.call(this), this.wps = null, this.GHz = is.set(GHz) ? GHz : "";
    var methods = ["PBC"];
    methods.push("PIN"), this.add(new nodeComment("wpsWarning"), "warning"), this.add(new nodeComment("wpsWarningWifiOff"), "warningWifiOff"), this.add(new nodeComment("wpsWarningBroadcastOff"), "warningBroadcast");
    var general = this.add(new node, "general").child("general").add(new nodeCaption("wpsSectEnable")).add(new nodeCheckBox("wpsEnable", !1), "enable"),
        info = this.add(new node({
            hidden: !0
        }), "info").child("info").add(new nodeCaption("wpsSectInfo")).add(new nodestatic("wpsPinDefault", "", {}), "def_pin").add(new nodestatic("wpsStatus"), "status").add(new nodestatic("ssid"), "ssid").add(new nodestatic("wpsAuth"), "auth").add(new nodestatic("wpsEncr"), "encr").add(new nodestatic("wpsEncrKey"), "encr_key"),
        connect = this.add(new node({
            hidden: !0
        }), "connect").child("connect").add(new nodeCaption("wpsSectConnect"));
    connect.add(new nodeSelect("wpsMethod"), "method").add(new nodetext("wpsPin", "", {
        hidden: !0,
        mandatory: !0,
        re: [function(value) {
            if (value = value.replace(/(\-|\ )/g, ""), !new RegExp("^[0-9]+(.?[0-9]+|[0-9]*)$").test(value)) return "numNaN";
            if (4 != value.length && 8 != value.length) return "wpsPinError";
            if (8 == value.length) {
                var pin = parseInt(value, 10),
                    accum = 0;
                if (accum += 3 * (parseInt(pin / 1e7) % 10), accum += 1 * (parseInt(pin / 1e6) % 10), accum += 3 * (parseInt(pin / 1e5) % 10), accum += 1 * (parseInt(pin / 1e4) % 10), accum += 3 * (parseInt(pin / 1e3) % 10), accum += 1 * (parseInt(pin / 100) % 10), accum += 3 * (parseInt(pin / 10) % 10), accum += 1 * (parseInt(pin / 1) % 10), accum % 10 != 0) return "wpsPinError"
            }
            return null
        }]
    }), "pin"), this.wps_on_off = function(value) {
        value ? (info.show(), connect.show()) : (info.hide(), connect.hide())
    }, this.turn_on = function() {
        rootView.showModalOverlay();
        var create = {
                common: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var obj = {};
                    return obj[GHz + "mbssidNum"] = 1, obj[GHz + "mbssidCur"] = 1, obj[GHz + "Radio"] = !0, obj
                }
            },
            data = create.common(GHz);
        $.extend(this.wifi, data), device.config.write(39, data, callback(this, function() {
            rootView.hideModalOverlay(), this.update()
        }))
    }, this.turn_on_broadcast = function() {
        rootView.showModalOverlay();
        var create = {
                common: function(GHz) {
                    GHz = is.set(GHz) ? GHz : "";
                    var obj = {};
                    return obj[GHz + "WifiBroadcast"] = !0, obj
                }
            },
            data = create.common(GHz);
        $.extend(this.wifi, data), device.config.write(35, data, callback(this, function() {
            rootView.hideModalOverlay(), this.update()
        }))
    }, this.updateModel = function(status) {
        this.status = status
    }, this.updateView = function(phase) {
        if (pageWiFiWPS.superclass.updateView.apply(this, arguments), "back" == phase) {
            if (general.cleanButtonBar().addButton("button_save").getButton("button_save").bind("click.button", callback(this, function() {
                    this.enable(this.child("general/enable").val())
                })), general.addButton("button_enable_wifi").getButton("button_enable_wifi").bind("click.button", callback(this, function() {
                    this.turn_on()
                })), general.addButton("button_enable_broadcast").getButton("button_enable_broadcast").bind("click.button", callback(this, function() {
                    this.turn_on_broadcast()
                })), info.cleanButtonBar().addButton("refresh").getButton("refresh").bind("click.button", callback(this, function() {
                    this.update()
                })), info.addButton("wpsReset").getButton("wpsReset").bind("click.button", callback(this, function() {
                    this.reset()
                })), connect.cleanButtonBar().addButton("wpsConnect").getButton("wpsConnect").bind("click.button", callback(this, function() {
                    this.deep.updateModel() && this.connect(connect.child("method").val(), connect.child("pin").val())
                })), methods.length > 1) {
                var method = connect.child("method").cleanOptions();
                for (var i in methods) method.addOption(methods[i])
            }
            else this.replace("connect/method", new nodestatic("wpsMethod", methods[0]));
            var wps = null,
                wds = null,
                data = this.data;
            if (is.set(this.data) && is.set(this.data.resident[this.GHz + "wps"]) && (wps = this.data.resident[this.GHz + "wps"]), is.set(this.data) && is.set(this.data.resident[this.GHz + "wds"]) && (wds = this.data.resident[this.GHz + "wds"]), wps && !wps.WscCheck ? this.child("warning").show() : this.child("warning").hide(), wps && (this.wps_on_off(wps.WscEnable), general.child("enable").val(wps.WscEnable && wps.WscCheck), wps.WscEnable)) {
                info.child("status").val(lng(wps.WscConfigured ? "wpsConf" : "wpsUnconf")), info.child("ssid").val(is.set(wps.WscSSID) ? wps.WscSSID : data.resident[this.GHz + "mbssid"][0].SSID), info.child("def_pin").val(wps.WscDefaultPin);
                for (var authAvailableCache = [], i = 0; i < data.resident.AuthAvailable.length; i++) authAvailableCache[data.resident.AuthAvailable[i].Id] = data.resident.AuthAvailable[i].Name;
                if (is.set(wps.WscAuth)) info.child("auth").val(wps.WscAuth);
                else
                    for (var i = 0; i < data.resident.AuthAvailable.length; i++)
                        if (data.resident.AuthAvailable[i].Id == data.resident[this.GHz + "mbssid"][0].AuthMode) {
                            wps.WscAuth = data.resident.AuthAvailable[i].Name, info.child("auth").val(wps.WscAuth);
                            break
                        } var wpa_encrypts = {
                    TKIP: "TKIP",
                    AES: "AES",
                    TKIPAES: "TKIP+AES"
                };
                info.child("encr").val(is.set(wps.WscEncrypType) ? wps.WscEncrypType : "NONE" != data.resident[this.GHz + "mbssid"][0].EncrypType ? wpa_encrypts[data.resident[this.GHz + "mbssid"][0].EncrypType] : lng("not_appointed")), is.set(wps.WscAuth) && "OPEN" == wps.WscAuth ? info.child("encr_key").hide() : is.set(wps.WscEncKey) ? (info.child("encr_key").show(), info.child("encr_key").val(wps.WscEncKey)) : info.child("encr_key").val("NONE" != data.resident[this.GHz + "mbssid"][0].EncrypType ? data.resident[this.GHz + "mbssid"][0].WPAPSK : lng("not_appointed"))
            }
            var disableAll_flag = !1;
            wds && "2" == wds.WdsEnable || wps && !wps.WscCheck ? (disableAll_flag = !0, wds && "2" == wds.WdsEnable && general.child("enable").setComment("wpsWDSBrigeWarning")) : (general.child("enable").cleanComment(), disableAll_flag = disableAll_flag ? disableAll_flag : !1), this.data ? (this.child("warningWifiOff").hide(), general.getButton("button_enable_wifi").hide(), disableAll_flag = disableAll_flag ? disableAll_flag : !1) : (this.child("warningWifiOff").show(), general.getButton("button_enable_wifi").show(), disableAll_flag = !0);
            var brcst;
            is.set(this.data) && (is.set(this.data.resident[this.GHz + "WifiBroadcast"]) || is.set(this.data.resident[this.GHz + "mbssid"][0].WifiBroadcast)) && (brcst = this.data.resident[this.GHz + "mbssid"][0].WifiBroadcast ? this.data.resident[this.GHz + "mbssid"][0].WifiBroadcast : this.data.resident[this.GHz + "WifiBroadcast"]), _.isUndefined(brcst) || brcst ? (this.child("warningBroadcast").hide(), general.getButton("button_enable_broadcast").hide(), disableAll_flag = disableAll_flag ? disableAll_flag : !1) : (this.child("warningBroadcast").show(), general.getButton("button_enable_broadcast").show(), disableAll_flag = !0), disableAll_flag ? (general.child("enable").disable(), general.getButton("button_save").hide()) : (general.child("enable").enable(), general.getButton("button_save").show())
        }
    }, this.reset = function() {
        rootView.showModalOverlay();
        var data = {};
        data[this.GHz + "wps"] = {
            WscEnable: !0,
            WscConfigured: !1
        }, device.config.write(106, data, callback(this, function() {
            this.update()
        }))
    }, this.enable = function(enable) {
        rootView.showModalOverlay();
        var data = {};
        data[this.GHz + "wps"] = {
            WscEnable: enable
        }, device.config.write(106, data, callback(this, function() {
            this.update()
        }))
    }, this.connect = function(method, pin) {
        rootView.showModalOverlay();
        var data = {};
        data[this.GHz + "wps"] = {
            WscEnable: !0,
            WscMethod: method
        }, "PIN" == method && (data[this.GHz + "wps"].WscPin = pin), device.config.write(107, data, callback(this, function() {
            this.update()
        }))
    }, this.update = function() {
        rootView.showModalOverlay(), device.config.read(35, callback(this, function(data) {
            this.data = is.RPC_SUCCESS(data) ? data : null, this.data = this.data, this.data = this.data, this.data = this.data, this.deep.updateView(), rootView.hideModalOverlay()
        }))
    }, this.bind("updaterq", this.update), this.bind("fieldchange", function(status, value) {
        switch (status.target.getAlias()) {
            case "method":
                var pin = connect.child("pin");
                "PIN" == value ? pin.show() : pin.hide()
        }
    })
}
extend(jsWindowController, jsController), extend(jsWindowClientView, jsCSideView), jsFieldSetPopUpClientView = jsWindowClientView, extend(jsFieldSetController, jsController), extend(jsFieldSetClientView, jsCSideView), extend(js3GSettingsModel, jsModel), extend(js3GSettingsController, jsController), extend(js3GSettingsClientView, jsFieldSetClientView), window.provs3g = {};
var bindEvents = function($obj) {
        this.bind({
            "click.input": callback($obj, function() {
                var value = !this.fieldval();
                return this.fieldval(value), this.flags.change.call(this, value), value ? this.flags.on.apply(this) : this.flags.off.apply(this), !1
            })
        })
    },
    fieldval = function(value) {
        var $switcher = $(this).find(".SWITCHER"),
            $input = $switcher.find(">input");
        return is.set(value) ? ($input.val(value ? "1" : "0"), value ? $switcher.removeClass("OFF") : $switcher.addClass("OFF"), this) : "1" == $input.val()
    },
    initPlugin = function(flags) {
        $("			<div class='SWITCHER OFF'>				<input type='hidden' value='0' />				<div class='SLIDER'>			</div>		</div>").appendTo(this).addClass(flags.vertical ? "V" : "").attr("id", gID.get())
    };
jQuery.fn.lightUISwitcher = function(flags) {
    flags = $.extend({
        on: function() {},
        off: function() {},
        change: function() {},
        vertical: !1
    }, flags), initPlugin.call(this, flags);
    var plugin = jQuery.sub();
    plugin.fn.extend({
        fieldval: fieldval,
        flags: flags
    });
    var $obj = plugin(this);
    return bindEvents.call(this, $obj), $obj
};
var client_login = getCookie("current_login"),
    __rpc_index = {};
if (__rpc_index[35] = "wifi", __rpc_index[111] = "wifi.wmm", __rpc_index[110] = "wifi.apcli", __rpc_index[1] = "ifaces", __rpc_index[58] = "urlfilter.list", __rpc_index[71] = "urlfilter.settings", __rpc_index[72] = "urlfilter.url_list", __rpc_index[74] = "macfilter", __rpc_index[23] = "dmz", __rpc_index[88] = "ipfilter", __rpc_index[66] = "upnp", __rpc_index[17] = "route", __rpc_index[16] = "httpaccess", __rpc_index[197] = "users", __rpc_index[129] = "129", __rpc_index[145] = "145", __rpc_index[166] = "166", __rpc_index[130] = "130", __rpc_index[133] = "133", __rpc_index[9] = "9", __rpc_index[11] = "11", __rpc_index[12] = "12", __rpc_index[63] = "syslog", __rpc_index[130] = "syslog_read", __rpc_index[6] = "ddns", __rpc_index[8] = "nat", __rpc_index[65] = "ntp", __rpc_index[69] = "password", __rpc_index[70] = "tr69", __rpc_index[165] = "firmware_remote_update", __rpc_index[152] = "telnet", __rpc_index[162] = "redirect", __rpc_index[189] = "qos", __rpc_index[201] = "qos_tr", __rpc_index[119] = "vlan", __rpc_index[179] = "yandexdns", __rpc_index[76] = "voip", __rpc_index[16] = "remote_access", __rpc_index[175] = "eth_control", __rpc_index[230] = "bandwidth_control", __rpc_index[7] = "dns", __rpc_index[112] = "device_mode", __rpc_index[67] = "device_info", window.access_rights) {
    var putInto = function(path, data) {
            if (path) {
                for (var arr = path.split("."), subObj = obj = {}, i = 0; i < arr.length - 1; i++) subObj = subObj[arr[i]] = {};
                return subObj[arr[arr.length - 1]] = data, obj
            }
            return data
        },
        setObjAttrs = function(data, attrs, baseMode) {
            function body(key) {
                if (value = data[key], !is.unset(value)) {
                    try {
                        valueAttrs = attrs[key], mode = is.number(valueAttrs) ? valueAttrs : is.set(valueAttrs.__mode) ? valueAttrs.__mode : baseMode
                    }
                    catch (e) {
                        mode = baseMode
                    }
                    if (is.object(value)) setObjAttrs(value, valueAttrs, mode);
                    else if (6 != mode) {
                        var valueWithAttrs;
                        switch (typeof value) {
                            case "number":
                                valueWithAttrs = data[key] = new Number(value);
                                break;
                            case "string":
                                valueWithAttrs = data[key] = new String(value);
                                break;
                            case "boolean":
                                valueWithAttrs = data[key] = new Boolean(value)
                        }
                        valueWithAttrs.__attrs__ = {
                            mode: mode
                        }
                    }
                }
            }
            var value, valueAttrs, mode;
            if (6 == baseMode) {
                if (is.object(attrs))
                    for (var key in attrs) body(key)
            }
            else if (is.array(data))
                for (var i = 0; i < data.length; i++) body(i);
            else
                for (var key in data) body(key)
        },
        setRPCAttrs = function(data, id) {
            var path = access_rights.__rpc_index[id],
                baseMode = is.set(access_rights.__mode) ? access_rights.__mode : 6;
            setObjAttrs(putInto(path, data), access_rights, baseMode)
        },
        hideFlag = function(rpc) {
            return disableFlag(rpc, 0)
        },
        disableFlag = function(rpc, m) {
            is.unset(m) && (m = 4);
            try {
                if (is.string(rpc)) {
                    var key = rpc,
                        baseMode = is.set(access_rights.__mode) ? access_rights.__mode : 6,
                        data = {
                            __all: "__all"
                        };
                    setObjAttrs(putInto(key, data), access_rights, baseMode);
                    var mode = data.__all.__attrs__.mode;
                    return is.set(mode) && m >= mode
                }
                var data = {
                    __all: "__all"
                };
                setRPCAttrs(data, rpc);
                var mode = data.__all.__attrs__.mode;
                return is.set(mode) && m >= mode
            }
            catch (e) {
                return !1
            }
        };
    device.hook(device.signal.PROCESS, function(state, jqXHR) {
        try {
            if (!state && jqXHR.answer) {
                var reArr = [];
                jqXHR.answer.resident ? reArr = [jqXHR.answer] : jqXHR.answer.rq && (reArr = jqXHR.answer.rq);
                for (var re, i = 0; i < reArr.length; i++)(re = reArr[i]) && setRPCAttrs(re.resident, re.config_id);
                var mbssidRights = window.access_rights[__rpc_index[35]].mbssid;
                if (mbssidRights) {
                    for (var re = null, i = 0; i < reArr.length; i++)
                        if (reArr[i] && 35 == reArr[i].config_id) {
                            re = reArr[i];
                            break
                        }
                    if (re) {
                        for (var obj, mode, json = re.resident, mbssid = (json.mbssidNum, json.mbssidCur, json.mbssid), mbssidNew = [], i = 0, j = 0; i < mbssid.length; i++) obj = mbssidRights[i], mode = is.number(obj) ? obj : is.object(obj) && is.number(obj.__mode) ? obj.__mode : 6, 0 != mode && mbssidNew.push(mbssid[j++]);
                        mbssid.length > mbssidNew.length && (json.mbssidNum = mbssidNew.length, json.mbssidCur = 1, json.mbssid = mbssidNew)
                    }
                }
            }
        }
        catch (e) {
            debug(e.message)
        }
    })
}
else var hideFlag = function() {
        return !1
    },
    disableFlag = function() {
        return !1
    };
extend(pageActiveSessions, node), extend(jsSubNetAddrWithLANController, jsSubNetAddrController), extend(jsSubNetAddrWithLANClientView, jsSubNetIPClientView), extend(jsMACWithLANClientView, jsSubNetAddrClientView), extend(jsNetAddrWithLANController, jsNetAddrController), extend(jsSubNetIPWithLANController, jsSubNetIPController), extend(jsSubNetIPWithLANClientView, jsSubNetAddrWithLANClientView), extend(jsSubNetIPv4WithLANController, jsSubNetIPWithLANController), extend(jsSubNetIPv6WithLANController, jsSubNetIPWithLANController), extend(jsIPWithLANController, jsIPController), extend(jsIPv4WithLANController, jsIPWithLANController), extend(jsIPv6WithLANController, jsIPWithLANController), extend(jsMACWithLANController, jsNetAddrWithLANController), extend(jsComboModel, jsInputModel), extend(jsMACComboController, jsController), extend(jsComboView, jsCSideView), extend(jsMACComboView, jsComboView), extend(jsIPComboController, jsController), extend(jsIPComboView, jsComboView), extend(jsMACRuleController, jsController), extend(jsMACRuleView, jsCSideView), extend(jsInputExModel, jsModel), extend(jsInputExController, jsController), extend(jsSwitcherClientView, jsCSideView), extend(jsProgresserClientView, jsCSideView), extend(jsListerClientView, jsCSideView), extend(jsButtonerClientView, jsCSideView), extend(jsInputerClientView, jsCSideView), extend(jsTexterClientView, jsCSideView), extend(jsTextboxerClientView, jsCSideView), extend(jsATMSettingsModel, jsModel), extend(jsATMSettingsController, jsController), extend(jsATMSettingsClientView, jsFieldSetClientView), extend(jsATMSettingsSummaryView, jsATMSettingsClientView);
var is_not_avail_hooking = !1;
$(window).bind({
    beforeunload: function() {
        device.unhook(device.signal.AVAILABLE, device_not_avail), is_not_avail_hooking = !1
    }
}), device.hook(device.signal.PROCESS, function(status) {
    status && !is_not_avail_hooking && (is_not_avail_hooking = !0, device.hook(device.signal.AVAILABLE, device_not_avail))
});
var rebootCmdList = [6, 8, 9, 10, 11],
    rebootConfigList = [];
rebootConfigList.push(178), $.ajaxPrefilter(function(options) {
    var data = options.data;
    if (is.string(data)) {
        var arr = data.match(/res_cmd\d*=\d+/g);
        if (is.array(arr))
            for (var i = 0; i < arr.length; i++)
                if (arr[i] = arr[i].replace(/res_cmd\d*=/, ""), checkInRebootCmdList(arr[i])) return void device.unhook(device.signal.AVAILABLE, device_not_avail);
        var arr = data.match(/res_config_id\d*=\d+/g);
        if (is.array(arr))
            for (var i = 0; i < arr.length; i++)
                if (arr[i] = arr[i].replace(/res_config_id\d*=/, ""), checkInRebootConfigList(arr[i])) return void device.unhook(device.signal.AVAILABLE, device_not_avail)
    }
}), extend(jsBCMVlanSettingsModel, jsModel), extend(jsBCMVlanSettingsController, jsFieldSetController), extend(jsBCMVlanSettingsClientView, jsFieldSetClientView), extend(jsBubblerController, jsController), extend(jsBubblerClientView, jsCSideView), extend(jsCheckWANController, jsController), extend(jsCheckWANView, jsFieldSetClientView), extend(jsCheckWANServerView, jsSSideView), extend(pageConfiguration, node), extend(jsConnsMainTabModel, jsModel), extend(jsConnsMainTabController, jsFieldSetController), extend(jsConnsMainTabClientView, jsFieldSetClientView), extend(jsConnsMainTabSummaryView, jsConnsMainTabClientView), extend(jsCableStatController, jsController), extend(jsCableStatClientView, jsCSideView), extend(pageDDNS, node), extend(ruleDDNS, node), extend(pageDeviceInfo, node), $.extend(!0, devu.ifaces.__helper, new function() {
    function getConnsInfo(ifaces, options) {
        var root = options.root || "",
            paths = getConnsPaths(ifaces, options);
        return _.map(paths, function(path) {
            var relativePath = path.replace(root, "");
            return {
                path: path,
                name: getConnName(ifaces, relativePath)
            }
        })
    }

    function getConnName(ifaces, path) {
        var conn = funcs.fetchBranch(ifaces, path + ".");
        return conn ? conn.name || "" : ""
    }

    function getConnsPaths(ifaces, options) {
        function isVersion(conn) {
            var versions = __getConnVersions(conn);
            return _.contains(versions, version)
        }

        function isType(conn) {
            switch (type) {
                case "lan":
                    return "bridge" == conn.ifaceType;
                case "wan":
                    return "bridge" != conn.ifaceType;
                default:
                    return !0
            }
        }

        function getPath(conn) {
            return root + conn.path
        }

        function getAllConns(ifaces) {
            function isUniqConn(conns, conn) {
                return !_.some(conns, function(elem) {
                    return _.isEqual(elem, conn)
                })
            }

            function isAutoConn(conn) {
                return "auto" == conn.serviceType && !conn.isTunnel
            }
            var conns = [],
                ifacesTree = funcs.splitTree(ifaces);
            return _.each(ifacesTree, function(elem) {
                var re = /(\w+)\.\d+\.services\.(\w+)\.\d+\.(tunnels\.\d+\.)?/,
                    matcher = re.exec(elem.Name);
                if (matcher) {
                    var conn = {
                        path: matcher[0],
                        ifaceType: matcher[1],
                        serviceType: matcher[2],
                        isTunnel: !_.isUndefined(matcher[3])
                    };
                    isUniqConn(conns, conn) && !isAutoConn(conn) && conns.push(conn)
                }
            }), conns
        }
        var version = options.version || "ipv4",
            type = options.type || "all",
            root = options.root || "",
            allConns = getAllConns(ifaces);
        return _.chain(allConns).filter(isVersion).filter(isType).map(getPath).value()
    }

    function __getConnVersions(conn) {
        function isIPv4(conn) {
            switch (conn.serviceType) {
                case "ipv6":
                case "pppv6":
                    return !1;
                default:
                    return !0
            }
        }

        function isIPv6(params) {
            switch (params.serviceType) {
                case "ipv6":
                case "pppv6":
                case "pppdual":
                    return !0;
                default:
                    return !1
            }
        }
        var result = [];
        return isIPv4(conn) && result.push("ipv4"), isIPv6(conn) && result.push("ipv6"), result
    }
    var funcs = device.funcs;
    return {
        getConnsInfo: getConnsInfo,
        getConnName: getConnName,
        getConnsPaths: getConnsPaths
    }
}), $.extend(!0, devu.iptv, new function() {
    this.pull = function(__success, __fail) {
        return devu.vlan.pull(__success, __fail), this
    }, this.push = function(__success, __fail) {
        return devu.vlan.push(__success, __fail), this
    }, this.getPortMap = function(__vid) {
        return this.getPortMapEx({
            vid: __vid
        })
    }, this.getPortMapEx = function(__options) {
        var parr, portMap = makeLanPortMap.call(this),
            pwan = devu.vlan.getWanPorts()[0];
        if (__options.vid) {
            var v = selectBridge(__options.vid, __options.name);
            v && (parr = pickLanPorts.call(this, pickFitPorts(v.ports)), _.each(parr, function(__p) {
                portMap[__p] = !0
            }))
        }
        else {
            var wanu = devu.vlan.groupByType().wanu;
            if (wanu && wanu.length) {
                var v = _.find(wanu, function(__v) {
                    return _.find(__v.ports, function(__p) {
                        return __p == pwan
                    })
                });
                v && (parr = pickLanPorts.call(this, pickFitPorts(v.ports)), _.each(parr, function(__p) {
                    portMap[__p] = !0
                }))
            }
        }
        return portMap
    }, this.setPortMap = function(__portMap, __vid) {
        return this.setPortMapEx(__portMap, {
            vid: __vid
        })
    }, this.setPortMapEx = function(__portMap, __options) {
        var portArrSelected = splitPortMap(__portMap, function(__value, __key) {
            return __value ? __key : ""
        });
        if (portArrSelected.length)
            for (var i = 0; i <= portArrSelected.length; i++)
                if (_.indexOf(makeBusyPortMap(__options), portArrSelected[i]) + 1) return "iptvPortsInUse";
        var portArrUnselected = splitPortMap(__portMap, function(__value, __key) {
            return __value ? "" : __key
        });
        if (__options.vid) {
            var portArrWanToLan = cutFromBridge(portArrUnselected, __options);
            cutFromLan(portArrSelected), addToLan(portArrWanToLan), addToBridge(portArrSelected, __options)
        }
        else {
            var portArrWanToLan = cutFromWan(portArrUnselected);
            cutFromLan(portArrSelected), addToLan(portArrWanToLan), addToWan(portArrSelected, __options)
        }
        return null
    }, this.getFreePorts = function(__vid) {
        return this.getFreePortsEx({
            vid: __vid
        })
    }, this.getFreePortsEx = function(__options) {
        var pmap = _.keys(makeLanPortMap.call(this)),
            pvlfree = devu.vlan.getFreePorts(),
            plan = vlan.groupByType().lanu[0].ports,
            pfree = plan.concat(pvlfree);
        if (__options.vid) {
            var v = selectBridge(__options.vid, __options.name);
            if (v) {
                var pbridge = v.ports;
                pfree = pbridge.concat(pfree)
            }
        }
        else {
            var wanu = vlan.groupByType().wanu;
            if (wanu) {
                var pwan = wanu[0].ports;
                pfree = pwan.concat(pfree)
            }
        }
        return pfree = _.intersection(pmap, pfree), _.sortBy(pfree, function(num) {
            return num
        })
    };
    var pickFitPorts = function(__parr) {
            return _.filter(__parr, function(__p) {
                return __p.match(/port\d+/) ? !0 : !1
            })
        },
        pickLanPorts = function(__parr) {
            return _.filter(__parr, function(__p) {
                return !devu.vlan.isWan(__p)
            }, this)
        },
        makeLanPortMap = function() {
            var pmap = {},
                parr = devu.vlan.PORTS.sort();
            return _.each(parr, function(__value) {
                __value.match(/port\d+/) && !devu.vlan.isWan(__value) && (pmap[__value] = !1)
            }, this), pmap
        },
        splitPortMap = function(__portMap, __iter) {
            return _.filter(_.map(__portMap, __iter), function(__p) {
                return __p
            })
        },
        cutFromWan = function(__parr) {
            var pos, v, wanu = devu.vlan.groupByType().wanu,
                parr = [];
            if (wanu)
                for (var i = 0; i < wanu.length; i++) pos = wanu[i].pos, v = devu.vlan.cut(pos), parr = parr.concat(_.intersection(v.ports, __parr)), v.ports = _.difference(v.ports, __parr), devu.vlan.set(pos, v);
            return parr
        },
        cutFromLan = function(__parr) {
            var pos, v, pos = devu.vlan.groupByType().lanu[0].pos;
            v = devu.vlan.cut(pos), v.ports = _.difference(v.ports, __parr), devu.vlan.set(pos, v)
        },
        addToLan = function(__parr) {
            var pos, v, pos = devu.vlan.groupByType().lanu[0].pos;
            v = devu.vlan.cut(pos), v.ports = _.uniq(v.ports.concat(__parr)), devu.vlan.set(pos, v)
        },
        addToWan = function(__parr, __options) {
            var pos, v, wanu = devu.vlan.groupByType().wanu,
                pwan = devu.vlan.getWanPorts()[0];
            wanu && wanu.length ? (pos = wanu[0].pos, v = devu.vlan.cut(pos), v.ports.push(pwan), v.ports = _.uniq(v.ports.concat(__parr)), __options.name && (v.name = __options.name), devu.vlan.set(pos, v)) : (v = {
                name: "wan_auto_" + gID.get(),
                type: "wanu",
                en: !0,
                ports: _.uniq(__parr)
            }, v.ports.push(pwan), __options.name && (v.name = __options.name), devu.vlan.add(v))
        },
        cutFromBridge = function(__parr, __options) {
            var parr = [],
                v = selectBridge(__options.vid, __options.name);
            if (v) {
                var pos = v.pos;
                v = devu.vlan.cut(pos), parr = parr.concat(_.intersection(v.ports, __parr)), v.ports = _.difference(v.ports, __parr), devu.vlan.set(pos, v)
            }
            return parr
        },
        addToBridge = function(__parr, __options) {
            function setOptions() {
                __options.name && (v.name = __options.name), __options.qos && (v.qos = __options.qos), __options.vid && (v.vid = __options.vid)
            }
            var pwan = devu.vlan.getWanPorts()[0],
                v = selectBridge(__options.vid, __options.name);
            if (v) {
                var pos = v.pos;
                v = devu.vlan.cut(pos), v.port = pwan, v.ports = _.uniq(v.ports.concat(__parr)), __options && setOptions(), devu.vlan.set(pos, v)
            }
            else v = {
                name: "wan_auto_" + gID.get(),
                type: "bridge",
                en: !0,
                port: pwan,
                ports: _.uniq(__parr)
            }, __options && setOptions(), devu.vlan.add(v)
        },
        selectBridge = function(__vid, __name) {
            var bridge = devu.vlan.groupByType().bridge,
                v = null;
            return bridge && (v = _.find(bridge, function(__v) {
                return __v.vid == __vid
            }), !v && __name && (v = _.find(bridge, function(__v) {
                return __v.name == __name
            }))), v
        },
        makeBusyPortMap = function(vid) {
            var pmap = _.keys(makeLanPortMap.call(this));
            return _.difference(pmap, devu.iptv.getFreePorts(vid.vid))
        }
}), iptv = devu.iptv, devu.vlan.__VLAN_LIMIT = 16, devu.vlan.__VLAN_WANU_LIMIT = 1, devu.vlan.__MENU_VLAN_NO_DB_TAG = !0, $.extend(!0, devu.vlan, new function() {
    this.pull = function(__success, __fail) {
        return device.config.read([119, 129], callback(this, function(data) {
            return is.RPC_SUCCESS(data) ? (this.RAW_DATA = data.rq[0].resident, this.DATA = twfAll(this.RAW_DATA.vlans), this.PORTS = this.RAW_DATA.avail_ports, this.PORT_STATUS = data.rq[1].resident, this.IFACE_NAMES = data.rpcWAN.iface_names, this.resetAll(), debug("vlan.pull: Data received"), void(is.func(__success) && __success())) : (is.func(__fail) && __fail(), this)
        })), this
    }, this.push = function(__success, __fail) {
        var actions = this.commit();
        return actions.write || actions.remove ? device.config.multi(actions, callback(this, function(data) {
            is.RPC_SUCCESS(data) ? (debug("vlan.push: Data sent"), is.func(__success) && __success()) : (debug("vlan.push: Sending error"), is.func(__fail) && __fail())
        })) : (debug("vlan.push: Nothing to push"), is.func(__success) && __success()), this
    }, this.commit = function() {
        var v, actions = {},
            groups = this.status(),
            rpc = 119,
            vlansRaw = this.RAW_DATA.vlans;
        if (this.RAW_DATA.version >= 1) {
            if (groups.edited || groups.added || groups.removed) {
                for (var v, vraw, vrawOut, vlansRawOut = [], vlans = devu.vlan.show(), i = 0, j = 0; i < vlans.length; i++) v = vlans[i], "removed" != v.status && (vraw = vlansRaw[v.pos], vrawOut = vraw ? $.extend(!1, vraw, trfAny(v)) : $.extend(!1, {}, trfAny(v)), vrawOut.pos = j++, vlansRawOut.push(vrawOut));
                actions.write = [
                    [rpc, {
                        vlans: vlansRawOut
                    }]
                ]
            }
        }
        else {
            if (groups.edited || groups.added) {
                if (actions.write = [], groups.edited)
                    for (var i = 0; i < groups.edited.length; i++) v = groups.edited[i], actions.write.push([rpc, $.extend(!1, vlansRaw[v.pos], trfAny(v)), v.pos]);
                if (groups.added)
                    for (var i = 0; i < groups.added.length; i++) v = groups.added[i], actions.write.push([rpc, trfAny(v), v.pos])
            }
            if (groups.removed) {
                actions.remove = [];
                for (var i = 0; i < groups.removed.length; i++) v = groups.removed[i], actions.remove.push([rpc, {
                    pos: v.pos
                }, v.pos])
            }
        }
        return actions
    }, this.resetAll = function() {
        return this.WORK_COPY = _deepClone(this.DATA), this
    }, this.cut = function(inx) {
        var vlan = this.WORK_COPY[inx],
            vlanCopy = _deepClone(vlan);
        return delete vlanCopy.status, delete vlanCopy.pos, vlan.status = "removed", vlanCopy
    }, this.set = function(inx, __v) {
        var vold = this.WORK_COPY[inx];
        if (vold && "removed" != vold.status) return "vlanCutFirst";
        var v = _deepClone(__v);
        v.pos = inx;
        var error = valAny.call(this, v);
        return error || (this.WORK_COPY[inx] = v), error
    }, this.add = function(__v) {
        return this.set(this.WORK_COPY.length, __v)
    }, this.factory = function() {
        var wports = this.getWanPorts(),
            lports = this.getLanPorts();
        varr = this.show();
        for (var i = 0; i < varr.length; i++) this.cut(i);
        return this.set(0, {
            en: !0,
            name: "lan",
            ports: lports,
            type: "lanu"
        }), this.set(1, {
            en: !0,
            name: "wan",
            ports: wports,
            type: "wanu"
        }), this
    }, this.testTransforms = function() {
        var vbefore = this.RAW_DATA.vlans,
            vafter = trfAll(twfAll(this.RAW_DATA.vlans));
        if (vbefore.length != vafter.length) return !1;
        for (var i = 0; i < vbefore.length; i++) delete vafter[i].pos, vafter[i] = $.extend(!0, {}, vbefore[i], vafter[i]);
        return _.isEqual(vbefore, vafter)
    }, this.getFreePorts = function() {
        return _.difference(this.PORTS, pickPorts(this.WORK_COPY))
    }, this.getFreePortsU = function(__type) {
        var parr = this.getFreePorts();
        return "bridge" == __type ? parr = devu.vlan.__MENU_VLAN_NO_DB_TAG ? _.filter(parr, function(__value) {
            return !devu.vlan.isWan(__value) && !__value.match(/wifi/)
        }) : _.filter(parr, function(__value) {
            return !devu.vlan.isWan(__value)
        }) : "lan" == __type && (parr = _.filter(parr, function(__value) {
            return !devu.vlan.isWan(__value)
        })), parr
    }, this.getFreePortsT = function(__type) {
        var parr = this.getAvailPorts();
        return "bridge" == __type && (parr = _.filter(parr, function(__value) {
            return !__value.match(/wifi/)
        })), parr
    }, this.getWanPorts = function() {
        return _.filter(this.PORTS, function(__p) {
            return devu.vlan.isWan(__p)
        })
    }, this.getLanPorts = function(re) {
        return _.filter(this.PORTS, function(__p) {
            return !devu.vlan.isWan(__p) && (re ? !re.test(__p) : !0)
        })
    }, this.getAvailPorts = function() {
        return _deepClone(this.PORTS)
    }, this.status = function() {
        return this.RAW_DATA.version || (debug("vlan.status: The guaranteed safe actions for device.utils.vlan in a single push request is: 1 editing or 1 removing or several adding."), debug("vlan.status: Check for the status to avoid collisions!")), _.groupBy(this.WORK_COPY, callback(this, function(__v, inx) {
            return __v.pos >= this.DATA.length ? "removed" == __v.status ? "refused" : "added" : "removed" == __v.status ? __v.status : _.isEqual(__v, this.DATA[inx]) ? "unchanged" : "edited"
        }))
    }, this.show = function() {
        return this.WORK_COPY
    }, this.groupByType = function() {
        return _.groupBy(this.WORK_COPY, callback(this, function(__v) {
            return __v.type
        }))
    }, this.isWan = function(__p) {
        return _.find(this.PORT_STATUS, function(__value, __key) {
            return __key == __p && __value.is_wan
        }) ? !0 : !1
    }, this.hasServices = function(__v) {
        if (__v.ifname) {
            var L2 = this.IFACE_NAMES[__v.ifname];
            if (L2 && L2.services) return L2.services
        }
        return null
    };
    var twfWanT = function(__v) {
            var v = {
                    name: __v.name,
                    type: "want",
                    vid: __v.vid,
                    vid_range_end: __v.vid_range_end,
                    lan_subnet: __v.lan_subnet,
                    en: __v.en
                },
                ports = __v.ports;
            for (var i in ports) {
                v.port = i, v.qos = ports[i].qos;
                break
            }
            return v
        },
        twfWanU = function(__v) {
            var v = {
                    name: __v.name,
                    type: "wanu",
                    en: __v.en,
                    ports: []
                },
                ports = __v.ports;
            for (var i in ports) v.ports.push(i);
            return v
        },
        twfLanU = function(__v) {
            var v = twfWanU(__v);
            return v.type = "lanu", v.routing = __v.routing, v
        },
        twfLanT = function(__v) {
            var v = {
                    name: __v.name,
                    type: "lant",
                    vid: __v.vid,
                    vid_range_end: __v.vid_range_end,
                    en: __v.en,
                    portsTag: [],
                    routing: __v.routing
                },
                ports = __v.ports;
            for (var i in ports) v.port = i, v.portsTag.push(i);
            return v
        },
        twfBridge = function(__v) {
            var v = {
                    name: __v.name,
                    type: "bridge",
                    vid: __v.vid,
                    vid_range_end: __v.vid_range_end,
                    en: __v.en,
                    ports: [],
                    portsTag: []
                },
                ports = __v.ports;
            for (var i in ports) ports[i].tag ? (v.port = i, v.qos = ports[i].qos, v.portsTag.push(i)) : v.ports.push(i);
            return v
        },
        twfAny = function(__v) {
            var v;
            switch (__v.dest) {
                case "wan":
                    for (var i in __v.ports) v = __v.ports[i].tag ? twfWanT(__v) : twfWanU(__v);
                    break;
                case "bridge":
                    v = twfBridge(__v);
                    break;
                case "lan":
                    for (var i in __v.ports) v = __v.ports[i].tag ? twfLanT(__v) : twfLanU(__v)
            }
            return __v.ifname && (v.ifname = __v.ifname), v
        },
        twfAll = function(__arr) {
            for (var v, arr = [], i = 0; i < __arr.length; i++) v = twfAny(__arr[i]), v.pos = i, v && arr.push(v);
            return arr
        },
        trfWanT = function(__v) {
            var v = {
                name: __v.name,
                dest: "wan",
                vid: __v.vid,
                vid_range_end: __v.vid_range_end,
                en: __v.en,
                pos: __v.pos,
                lan_subnet: __v.lan_subnet,
                not_delete: !0,
                ports: {}
            };
            if (is.array(__v.portsTag))
                for (var i = 0; i < __v.portsTag.length; i++) v.ports[__v.portsTag[i]] = {
                    tag: !0,
                    qos: __v.qos
                };
            else v.ports[__v.port] = {
                tag: !0,
                qos: __v.qos
            };
            return v
        },
        trfWanU = function(__v) {
            for (var v = {
                    name: __v.name,
                    dest: "wan",
                    en: __v.en,
                    pos: __v.pos,
                    not_delete: !0,
                    ports: {}
                }, i = 0; i < __v.ports.length; i++) v.ports[__v.ports[i]] = {
                tag: !1
            };
            return v
        },
        trfLanU = function(__v) {
            var v = trfWanU(__v);
            return delete v.not_delete, v.dest = "lan", v.routing = __v.routing, v
        },
        trfLanT = function(__v) {
            var v = {
                name: __v.name,
                dest: "lan",
                vid: __v.vid,
                vid_range_end: __v.vid_range_end,
                en: __v.en,
                pos: __v.pos,
                routing: __v.routing,
                ports: {}
            };
            if (is.array(__v.portsTag))
                for (var i = 0; i < __v.portsTag.length; i++) v.ports[__v.portsTag[i]] = {
                    tag: !0
                };
            else v.ports[__v.port] = {
                tag: !0
            };
            return v
        },
        trfBridge = function(__v) {
            var v = {
                name: __v.name,
                dest: "bridge",
                vid: __v.vid,
                vid_range_end: __v.vid_range_end,
                en: __v.en,
                pos: __v.pos,
                ports: {}
            };
            if (is.array(__v.portsTag))
                for (var i = 0; i < __v.portsTag.length; i++) v.ports[__v.portsTag[i]] = {
                    tag: !0,
                    qos: __v.qos
                };
            else v.ports[__v.port] = {
                tag: !0,
                qos: __v.qos
            };
            for (var i = 0; i < __v.ports.length; i++) v.ports[__v.ports[i]] = {
                tag: !1,
                qos: __v.qos
            };
            return v
        },
        trfAny = function(__v) {
            switch (__v.type) {
                case "wanu":
                    return trfWanU(__v);
                case "want":
                    return trfWanT(__v);
                case "bridge":
                    return trfBridge(__v);
                case "lanu":
                    return trfLanU(__v);
                case "lant":
                    return trfLanT(__v)
            }
            return null
        },
        trfAll = function(__arr) {
            for (var v, arr = [], i = 0; i < __arr.length; i++) v = trfAny(__arr[i]), v && arr.push(v);
            return arr
        },
        pickPorts = function(__varr) {
            for (var ports, v, parr = [], i = 0; i < __varr.length; i++) v = __varr[i], ports = v.ports, "removed" != v.status && _.isArray(ports) && (parr = parr.concat(ports));
            return _.uniq(parr)
        },
        isUniqVid = function(__vid, __varr) {
            function inToRange(vid, start, end) {
                if (!vid || vid.length < 1 || !start) return null;
                if (!_.isArray(vid)) var vid = [vid];
                if (!end) var end = start;
                return vid[0] >= start && vid[0] <= end ? !0 : vid[1] >= start && vid[1] <= end ? !0 : vid[0] <= start && vid[1] >= end ? !0 : !1
            }
            for (var v, i = 0; i < __varr.length; i++)
                if (v = __varr[i], "removed" != v.status && inToRange(__vid, v.vid, v.vid_range_end)) return !1;
            return !0
        },
        isUniqName = function(__name, __varr) {
            for (var v, i = 0; i < __varr.length; i++)
                if (v = __varr[i], "removed" != v.status && v.name == __name) return !1;
            return !0
        },
        valWanT = function(__v) {
            var varr = this.WORK_COPY;
            return isUniqVid([__v.vid, __v.vid_range_end], varr) ? isUniqName(__v.name, varr) ? null : "vlanNameBusy" : "vlanVidBusy"
        },
        valWanU = function(__v) {
            var varr = this.WORK_COPY,
                wanu = _.filter(this.groupByType().wanu, function(__value) {
                    return "removed" != __value.status
                }),
                wanuCount = wanu ? wanu.length : 0;
            return wanuCount >= this.__VLAN_WANU_LIMIT ? "vlanLimitWanU" : isUniqName(__v.name, varr) ? devu.vlan.__MENU_VLAN_NO_DB_TAG && !_.filter(__v.ports, function(__value) {
                return devu.vlan.isWan(__value) || __value.match(/wifi/)
            }).length ? "vlanNatRulesNoDbTag" : null : "vlanNameBusy"
        },
        valBridge = function(__v) {
            var varr = this.WORK_COPY;
            return isUniqVid([__v.vid, __v.vid_range_end], varr) ? isUniqName(__v.name, varr) ? null : "vlanNameBusy" : "vlanVidBusy"
        },
        valLan = function(__v) {
            var varr = this.WORK_COPY;
            return isUniqName(__v.name, varr) ? null : "vlanNameBusy"
        },
        valAny = function(__v) {
            function isNotRemoved(__value) {
                return "removed" != __value.status
            }
            var errorCode = (this.WORK_COPY, null);
            switch (__v.type) {
                case "want":
                    errorCode = valWanT.call(this, __v);
                    break;
                case "wanu":
                    errorCode = valWanU.call(this, __v);
                    break;
                case "bridge":
                    errorCode = valBridge.call(this, __v);
                    break;
                case "lanu":
                case "lant":
                    errorCode = valLan.call(this, __v);
                    break;
                default:
                    errorCode = "vlanUnknownType"
            }
            if (!errorCode) {
                var groupCount = 0;
                for (var g in this.groupByType()) {
                    var gr = _.filter(this.groupByType()[g], isNotRemoved);
                    groupCount += gr.length
                }
                groupCount >= this.__VLAN_LIMIT && (errorCode = "vlanLimitGroup")
            }
            return errorCode
        }
}), vlan = devu.vlan, extend(jsDhcpServerModel, jsModel), extend(jsDhcpServerController, jsFieldSetController), extend(jsDhcpServerClientView, jsFieldSetClientView), extend(jsDhcpServerMacModel, jsModel), extend(jsDhcpServerMacController, jsFieldSetController), extend(jsDhcpServerMacClientView, jsFieldSetClientView), extend(jsDHCPOptPageController, jsController), extend(jsDHCPOptPageClientView, jsFieldSetClientView), extend(jsDHCPOptPageServerView, jsSSideView), extend(jsDHCPOptMgrController, jsController), extend(jsDHCPOptMgrView, jsCSideView), extend(jsRootVendorController, jsController), extend(jsRootVendorTreeView, jsViewTree), extend(jsVendorClassController, jsController), extend(jsVendorClassTreeView, jsViewTree), extend(jsVendorClassListView, jsFieldSetClientView), extend(jsDHCPOptController, jsController), extend(jsDHCPOptIconView, jsViewTree), extend(jsDHCPOptFormView, jsFieldSetClientView), extend(jsDialogSetController, jsFieldSetController), extend(jsDialogSetClientView, jsCSideView), extend(jsDinIPSettingsModel, jsModel), extend(jsDinIPSettingsController, jsFieldSetController), extend(jsDinIPSettingsClientView, jsFieldSetClientView), extend(jsDinIPSettingsSummaryView, jsDinIPSettingsClientView);
var refreshId;
is.RPC_SUCCESS = function(__res) {
    function success(__r) {
        return __r ? 20 == __r.status || 13 == __r.status || 12 == __r.status : !0
    }
    return is.number(__res) || is.string(__res) ? success({
        status: __res
    }) : is.set(__res) ? __res.rq ? _.all(__res.rq, success) : success(__res) : !1
}, is.PERMISSION_DENIED = function(response) {
    return 58 != response.status && response.auth ? !1 : !0
};
var DRAGGER = new function() {
    var $$ = {
        list: new Array,
        drag: null
    };
    this.add = function(obj) {
        if (is.jquery(obj))
            for (var i = 0; i < obj.length; i++) - 1 == indexOf($$.list, obj.get(i)) && $$.list.push(obj.get(i));
        return this
    }, this.remove = function(obj) {
        if (is.jquery(obj))
            for (var i = 0; i < obj.length; i++) {
                var index = indexOf($$.list, obj.get(i));
                index >= 0 && $$.list.splice(index, 1)
            }
        return this
    }, $(document).bind("mousedown.dragger", callback(this, function(e) {
        if (e.isPropagationStopped()) return !0;
        for (var i = 0; i < $$.list.length; i++)
            if ($$.list[i] == e.target || $($$.list[i]).has(e.target).length) {
                var target = $($$.list[i]),
                    tPos = target.offset(),
                    pPos = target.parent().offset();
                return $$.drag = {
                    index: i,
                    target: target,
                    offsetX: pPos.left + e.pageX - tPos.left,
                    offsetY: pPos.top + e.pageY - tPos.top,
                    cursor: $("body").css("cursor")
                }, $("body").css({
                    cursor: target.css("cursor")
                }), target.trigger("down.dragger", {
                    event: e.originalEvent,
                    left: $$.drag.offsetX,
                    top: $$.drag.offsetY
                }), !1
            }
    })).bind("mouseup.dragger", callback(this, function(e) {
        return $$.drag ? ($("body").css({
            cursor: $$.drag.cursor
        }), $$.drag.target.trigger("up.dragger", {
            event: e.originalEvent,
            left: e.pageX - $$.drag.offsetX,
            top: e.pageY - $$.drag.offsetY
        }), $$.drag = null, !1) : void 0
    })).bind("mousemove.dragger", callback(this, function(e) {
        return $$.drag ? ($$.drag.target.trigger("move.dragger", {
            event: e.originalEvent,
            left: e.pageX - $$.drag.offsetX,
            top: e.pageY - $$.drag.offsetY
        }), !1) : void 0
    })).bind("mouseleave", function() {
        $(document).trigger("mouseup")
    })
};
device.filter(function() {
    return window.hasChanges = null, !0
}), extend(pageDMZ, node), ! function() {
    jQuery.fn.errorBlock = function(title, shortDesc, longDesc, buttonTitle, callback) {
        var pattern = "";
        if ("body" == this.selector && window.engine && window.engine.simpleAir && (pattern += '<div id="sky" class="unselectable"></div><div id="grass" class="unselectable"></div>'), pattern += "<div class='error-block'><div class='title'><h2 langkey='" + title + "'>" + lng(title) + "</h2></div><div class='content'><div class='short-desc'></div><div class='long-desc'><ul></ul></div><div class='tryagain' style='display: none'><button langkey='" + buttonTitle + "'>" + lng(buttonTitle) + "</button></div></div></div>", this.html(pattern), shortDesc.match(/<|>/) ? this.find(".short-desc").html(shortDesc) : this.find(".short-desc").attr("langkey", shortDesc).html(lng(shortDesc)), is.array(longDesc))
            for (var $longDesc = this.find(".long-desc>ul"), i = 0; i < longDesc.length; i++) $longDesc.append("<li>" + lng(longDesc[i]) + "</li>").find("li:last").attr("langkey", longDesc[i]);
        else is.string(longDesc) && this.find(".long-desc").html(longDesc);
        return is.func(callback) && this.find(".tryagain").show().find("button").click(callback), this
    }
}(), extend(jsEthSettingsModel, jsModel), extend(jsEthSettingsController, jsController), extend(jsEthSettingsClientView, jsFieldSetClientView), extend(jsEthSettingsSummaryView, jsEthSettingsClientView), extend(pageEthControl, node), extend(ruleEthControl, node);
var FAST_ACCESS = new function() {
        var $panelBox = ".fastaccess",
            $panelButton = "#fastbutton",
            $panelList = {},
            $label = {},
            $icons = {
                obj: {},
                endNumber: 0
            };
        this.labelShow = function(id) {
            $label.html($("#" + id).find(".caption").html());
            var top = $("#" + id).position().top + 71,
                left = $("#" + id).position().left + Math.round($("#" + id).width() / 2) - Math.round($label.width() / 2);
            $label.css({
                top: top,
                left: left
            }), $label.show()
        }, this.labelHide = function() {
            $label.hide(), $label.html()
        }, this.setIcon = function(obj) {
            var fg = !0;
            if (fg) {
                var id = "icon_" + ++$icons.endNumber;
                $icons.obj[$icons.endNumber] = obj, $panelList.append('<li class="item" id="' + id + '"></li>')
            }
            return this.draw(id, obj), this
        }, this.getIcon = function(id) {
            return $icons.obj[id]
        }, this.delIcon = function(id) {
            delete $icons.obj[id], $panelList.empty(), this.draw()
        }, this.draw = function(id, obj) {
            $("#" + id).empty();
            var a = $("#" + id).append('<a href="#" class="aIcon"></a>').find("a");
            a.append('<span class="icon"></span>'), a.append('<span class="caption"></span>'), a.append('<span class="loading"></span>'), a.bind("mouseover", callback(this, function() {
                this.labelShow(id)
            })), a.bind("mouseout", callback(this, function() {
                this.labelHide()
            })), obj.draw(id)
        }, this.drawAll = function() {
            for (var key in $icons.obj) this.setIcon($icons.obj[key])
        }, this.clear = function() {
            $icons.obj = {}, $icons.endNumber = 0, $panelList.empty()
        }, this.start = function() {
            $panelList = $panelBox.append('<ul id="fastaccess"></ul>').find("ul"), $label = $panelBox.append('<div class="labelIcon"></div>').find(".labelIcon"), this.setIcon(new SW_SAVE), this.setIcon(new SW_REBOOT("5")), disableFlag("sysconf.backup") || this.setIcon(new SW_BACKUP), disableFlag("sysconf.restore") || this.setIcon(new SW_RESTORE), this.setIcon(new SW_FACTORY), disableFlag("firmware_remote_update") || this.setIcon(new SW_FIRMWARE), disableFlag("wifi.Radio") || this.setIcon(new SW_WIFI), this.setIcon(new SW_LOGOUT)
        }, this.upd = function() {
            this.getIcon("9").update()
        }, this.update = function() {
            for (var key in $icons.obj) this.getIcon(key).update()
        }, $(document).bind("ready", callback(this, function() {
            $panelButton = $($panelButton), $panelBox = $($panelBox), $panelButton.bind("mouseover", callback(this, function() {
                this.update(), $panelBox.addClass("on")
            })), $panelButton.bind("mouseout", callback(this, function(e) {
                var $target = $(e.relatedTarget);
                $target.attr("id") != $panelBox.attr("id") && $target.attr("class") != $panelBox.attr("class") && $panelBox.removeClass("on")
            })), $panelBox.bind("mouseleave", callback(this, function() {
                $panelBox.removeClass("on")
            })), this.start()
        }))
    },
    SW_FLASH = function() {
        var updFlag = 1,
            $icon = "",
            $usbList = {};
        this.updateSetting = function() {
            var flag = 0;
            for (key in $usbList) flag = 1;
            flag ? ($icon.removeClass("disable"), $icon.find("a").unbind("click"), $icon.find("a").bind("click", callback(this, function() {
                return confirm(lng("storInfoUnmountConfirm")) && device.config.write(154, {
                    name: "usball"
                }, callback(this, function() {
                    this.update()
                })), !1
            }))) : ($icon.find("a").unbind("click"), $icon.find("a").bind("click", callback(this, function() {
                return !1
            })), $icon.addClass("disable"))
        }, this.update = function() {
            return updFlag && (updFlag = 0, device.config.read(82, callback(this, function(data) {
                this.usb = $usbList = {}, data && data.resident && (this.usb = $usbList = data.resident.usb_storage, this.updateSetting(), updFlag = 1)
            }))), this
        }, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_flash"), $icon.find("a"), $icon.find(".caption").attr("langkey", "airUmount"), this.update()
        }
    },
    SW_REBOOT = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_reboot"), $icon.find(".caption").attr("langkey", "airMenuReboot"), $icon.find("a").bind("click", callback(this, function() {
                return __SYSTEM.reboot(!0), !1
            }))
        }
    },
    SW_SAVE = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_save"), $icon.find(".caption").attr("langkey", "airSave"), $icon.find("a").bind("click", callback(this, function() {
                return WAITER.start(), device.system.save(function() {
                    WAITER.stop(), alert(lng("save_config_success"))
                }), !1
            }))
        }
    },
    SW_BACKUP = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_backup"), $icon.find(".caption").attr("langkey", "airMenuBackup"), $icon.find("a").bind("click", callback(this, function() {
                return SAVEME.lock(), device.system.backup(function() {
                    SAVEME.unlock()
                }), !1
            }))
        }
    },
    SW_FACTORY = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_factory"), $icon.find(".caption").attr("langkey", "airMenuFactory"), $icon.find("a").bind("click", callback(this, function() {
                return confirm(lng("resetconfigAlarm") + " 95 " + lng("second") + ", " + lng("resetconfigContinue")) && (LOGIC.stop(), WAITER.start("airReseting", 95e3, function() {
                    reload("192.168.0.1")
                }), device.stop().system.reset(), device.lock(!0)), this
            }))
        }
    },
    SW_RESTORE = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_restore"), $icon.find(".caption").attr("langkey", "airMenuRestore"), $icon.find("a").bind("click", callback(this, function() {
                MENU.open("system/sysconf"), MSWITCH.settings()
            }))
        }
    },
    SW_FIRMWARE = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_firmware"), $icon.find(".caption").attr("langkey", "airMenuFirmware"), $icon.find("a").bind("click", callback(this, function() {
                __FIRMWARE.show()
            }))
        }
    },
    SW_LOGOUT = function() {
        var $icon = "";
        this.update = function() {}, this.draw = function(id) {
            $icon = $("#" + id), $icon.addClass("sw_logout"), $icon.find(".caption").attr("langkey", "airMenuLogout"), $icon.find("a").bind("click", callback(this, function() {
                device.system.auth("", "", function() {
                    reload()
                })
            }))
        }
    },
    SW_WIFI = function(GHz) {
        function loading(flag) {
            $$.icon.removeClass("loading"), 1 == flag && $$.icon.addClass("loading")
        }

        function updateState() {
            if ($$.backup.wifi) {
                var enable = $$.backup.wifi[$$.GHz + "Radio"];
                $$.icon.removeClass("off"), 1 != enable && $$.icon.addClass("off")
            }
        }
        var $$ = {
                icon: {},
                backup: {},
                enable: !1,
                GHz: is.set(GHz) ? GHz : ""
            },
            updFlag = 1;
        this.enable = function(enable) {
            if (loading(!0), !is.set(enable)) return $$.backup.wifi[$$.GHz + "Radio"];
            $$.backup.wifi[$$.GHz + "Radio"] = 1 == enable;
            var data = {};
            return data[$$.GHz + "Radio"] = $$.backup.wifi[$$.GHz + "Radio"], device.config.write(39, data, callback(this, function() {
                this.update(), loading(!1)
            })), this
        }, this.update = function() {
            return updFlag && (updFlag = 0, device.config.read(35, callback(this, function(data) {
                $$.backup.wifi = data.resident, updateState(), updFlag = 1
            }))), this
        }, this.draw = function(id) {
            $$.icon = $("#" + id), "5G_" == $$.GHz ? $$.icon.find(".caption").attr("langkey", "airWifiIcon5GHz") : $$.icon.find(".caption").attr("langkey", "menu_wifi"), $$.icon.addClass("sw_wifi"), $$.icon.find("a").bind("click", callback(this, function() {
                return this.enable(!$$.backup.wifi[$$.GHz + "Radio"]), !1
            })), this.update()
        }
    };
extend(formLocalFwUpdate, node), extend(formRemoteFwUpdate, node), extend(warningRemoteFwUpdate, node), extend(pageFirmware, node), extend(nodeButton, nodeInputBase), extend(pageFirmwareRemoteConfig, node), extend(jsGeneralSettingsModel, jsModel), extend(jsGeneralSettingsController, jsFieldSetController), extend(jsGeneralSettingsClientView, jsFieldSetClientView), extend(jsGeneralSettingsSummaryView, jsGeneralSettingsClientView), extend(jsProvListItemController, jsController), extend(jsProvListItemView, jsSelectExItemView), extend(jsProvListController, jsInputController), extend(jsProvListView, jsSelectExClientView), extend(jsHelpModel, jsModel), extend(jsHelpController, jsFieldSetController), extend(jsHelpClientView, jsFieldSetClientView), extend(jsHelpDialogModel, jsModel), extend(jsHelpDialogController, jsDialogSetController), extend(jsHelpDialogClientView, jsDialogSetClientView), extend(jsIfListModel, jsInputModel), extend(jsIfListController, jsEditController), extend(pageMisc, node), extend(gridIPFilters, node), extend(pageIPFilters, node), extend(ruleIPFilters, node), extend(nodeComboIPRange, nodeInputBase), extend(pageIPTV, node), extend(PortViewCtrl, node), extend(jsLanModel, jsModel), extend(jsLanController, jsFieldSetController), extend(jsLanClientView, jsFieldSetClientView), extend(jsLanServerView, jsSSideView), extend(jsLanSettingsController, jsFieldSetController), extend(jsLanSettingsView, jsFieldSetClientView);
var CONFIG_ID_LANG_LIST = 73;
extend(jsLangModel, jsModel), extend(jsLangController, jsController), extend(jsLangView, jsViewTree), extend(jsSwitchLangView, jsSSideView), extend(jsListLangView, jsSSideView), extend(jsIfacesInputController, jsEditController), extend(jsIfacesInputSlotView, jsEditClientView), extend(jsIfacesInputServerView, jsSSideView), extend(jsIfacesListModel, jsModel), extend(jsIfacesListServerView, jsSSideView), extend(jsListBoxModel, jsModel), extend(jsListBoxController, jsController), extend(jsListBoxFieldController, jsController), extend(jsChangeBoxClientView, jsEditClientView), extend(jsLocalResController, jsFieldSetController), extend(jsLocalResView, jsFieldSetClientView), extend(pageSyslog, node), extend(gridMACFilters, node), extend(pageMACFilter, node), extend(ruleMACFilters, node), extend(jsQCMIPTVController, jsFieldSetController), extend(jsQCMIPTVClientView, jsFieldSetClientView), extend(jsIptvMasterController, jsFieldSetController), extend(jsIptvMasterClientView, jsFieldSetClientView), extend(jsQCMFinishController, jsFieldSetController), extend(jsQCMFinishClientView, jsFieldSetClientView), extend(jsQCMWifiController, jsFieldSetController), extend(jsQCMWifiClientView, jsFieldSetClientView), extend(jsQuickConfigMasterController, jsFieldSetController), extend(jsQuickConfigMasterClientView, jsFieldSetClientView), extend(jsQuickConfigMasterServerView, jsSSideView), extend(jsMainMenuController, jsMenuController), extend(jsMainMenuView, jsMenuView), extend(jsMiscSettingsModel, jsModel), extend(jsMiscSettingsController, jsFieldSetController), extend(jsMiscSettingsClientView, jsFieldSetClientView), extend(jsMiscSettingsSummaryView, jsMiscSettingsClientView), $(document).bind("ready", callback(this, function() {
    modeAP() || $("#menu>.monitor").append("<ul class='menu'>									<li class='menu'>										<a href='#' class='menu MONITORING' langkey='airMonitoring'></a>										<ul class='submenu'></ul>									</li>								</ul>")
})), extend(pageNetStat, node), extend(showMoreInfo, node), extend(jsNotifierModel, jsModel), extend(jsNotifierController, jsController), extend(jsNotifierView, jsCSideView), extend(jsNotifierGetInfoView, jsSSideView), extend(pageNTP, node), extend(pagePasswd, node), extend(pagePing, node), extend(jsPopupmenuModel, jsModel), extend(jsPopupmenuController, jsController), extend(jsPopupmenuView, jsViewTree), extend(jsPPPSettingsModel, jsModel), extend(jsPPPSettingsController, jsFieldSetController), extend(jsPPPSettingsClientView, jsFieldSetClientView), extend(jsPPPSettingsSummaryView, jsPPPSettingsClientView), extend(jsPreMasterModel, jsModel), extend(jsPreMasterController, jsFieldSetController), extend(jsPreMasterClientView, jsFieldSetClientView), extend(jsPreMasterServerView, jsSSideView), extend(jsInetFirstStepController, jsController), extend(jsInetFirstStepClientView, jsFieldSetClientView), window["prov_list_dir.js"] = {
    man: {
        name: "wanProvMan",
        deftype: "notype",
        L2: {},
        notype: {
            any: {
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        type: "notype",
                        igmp: !0,
                        dns_from_dhcp: !0
                    }
                }
            }
        },
        pppoe: {
            any: {
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "ppp",
                        servicename: "",
                        username: "",
                        password: "",
                        mtu: 1492,
                        nat: !0,
                        firewall: !0,
                        igmp: !1,
                        keep_alive: {
                            interval: 30,
                            fails: 3
                        },
                        gwif: !1,
                        ondemand: 0
                    }
                }
            }
        },
        pppoev6: {
            any: {
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "pppv6",
                        servicename: "",
                        username: "",
                        password: "",
                        mtu: 1492,
                        nat: !0,
                        firewall: !0,
                        igmp: !1,
                        keep_alive: {
                            interval: 30,
                            fails: 3
                        },
                        gwif: !1,
                        gwifv6: !1,
                        ipv6_by_slaac: !1,
                        ipv6_by_dhcpv6: !1,
                        ipv6_auto: !0,
                        slaac: !0,
                        ondemand: 0
                    }
                }
            }
        },
        pppoedual: {
            any: {
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "pppdual",
                        servicename: "",
                        username: "",
                        password: "",
                        mtu: 1492,
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        keep_alive: {
                            interval: 30,
                            fails: 3
                        },
                        gwif: !1,
                        gwifv6: !1,
                        ipv6_by_dhcpv6: !1,
                        ipv6_auto: !0,
                        slaac: !0,
                        ondemand: 0
                    }
                }
            }
        },
        "static": {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        type: "ip"
                    }
                }
            }
        },
        statkab: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        type: "ip",
                        kabinet: {
                            enable: !0
                        }
                    }
                }
            }
        },
        dynamic: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        type: "ip",
                        dhcp: !0,
                        igmp: !0,
                        dns_from_dhcp: !0
                    }
                }
            }
        },
        dynkab: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        type: "ip",
                        dhcp: !0,
                        igmp: !0,
                        dns_from_dhcp: !0,
                        kabinet: {
                            enable: !0
                        }
                    }
                }
            }
        },
        staticv6: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        firewall: !0,
                        igmp: !1,
                        type: "ipv6"
                    }
                }
            }
        },
        dynamicv6: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        firewall: !0,
                        type: "ipv6",
                        dhcp: !0,
                        igmp: !1,
                        ipv6_by_slaac: !1,
                        ipv6_by_dhcpv6: !1,
                        ipv6_auto: !0,
                        slaac: !0,
                        dns_from_dhcp: !0
                    }
                }
            }
        },
        pptp: {
            any: {
                is_wan: !0,
                services: {
                    auto: {
                        type: "auto",
                        tunnels: {
                            create: {
                                enable: !0,
                                auto: !0,
                                type: "pptp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1456,
                                nat: !0,
                                firewall: !0,
                                igmp: !1,
                                gwif: !1,
                                keep_alive: {
                                    interval: 30,
                                    fails: 3
                                },
                                ondemand: 0
                            }
                        }
                    }
                }
            }
        },
        624: {
            any: {
                is_wan: !0,
                services: {
                    auto: {
                        type: "auto",
                        tunnels: {
                            create: {
                                enable: !0,
                                auto: !0,
                                type: "624"
                            }
                        }
                    }
                }
            }
        },
        statpptp: {
            any: {
                type: "ethernet",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "ip",
                        nat: !0,
                        firewall: !0,
                        gwif: !1,
                        igmp: !0,
                        tunnels: {
                            create: {
                                enable: !0,
                                auto: !0,
                                type: "pptp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1456,
                                nat: !0,
                                firewall: !0,
                                gwif: !1,
                                igmp: !0,
                                keep_alive: {
                                    interval: 30,
                                    fails: 3
                                },
                                ondemand: 0
                            }
                        }
                    }
                }
            }
        },
        dynpptp: {
            any: {
                type: "ethernet",
                port: "auto",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "ip",
                        dhcp: !0,
                        dns_from_dhcp: !0,
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        gwif: !1,
                        tunnels: {
                            create: {
                                enable: !0,
                                auto: !0,
                                type: "pptp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1456,
                                nat: !0,
                                firewall: !0,
                                gwif: !1,
                                keep_alive: {
                                    interval: 30,
                                    fails: 3
                                },
                                ondemand: 0
                            }
                        }
                    }
                }
            }
        },
        statpppoe: {
            any: {
                type: "ethernet",
                services: {
                    create: {
                        enable: !0,
                        type: "ip",
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        tunnels: {
                            create: {
                                enable: !0,
                                type: "ppp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1492,
                                nat: !0,
                                firewall: !0,
                                igmp: !1,
                                keep_alive: {
                                    interval: 30,
                                    fails: 3
                                },
                                gwif: !0,
                                ondemand: 0
                            }
                        }
                    }
                }
            }
        },
        dynpppoe: {
            any: {
                type: "ethernet",
                port: "auto",
                services: {
                    create: {
                        enable: !0,
                        type: "ip",
                        dhcp: !0,
                        dns_from_dhcp: !0,
                        nat: !0,
                        firewall: !0,
                        igmp: !0,
                        tunnels: {
                            create: {
                                enable: !0,
                                type: "ppp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1492,
                                nat: !0,
                                firewall: !0,
                                igmp: !1,
                                keep_alive: {
                                    interval: 30,
                                    fails: 3
                                },
                                gwif: !0,
                                ondemand: 0
                            }
                        }
                    }
                }
            }
        },
        "3g": {
            any: {
                type: "3g",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        type: "ppp",
                        servicename: "",
                        username: "",
                        password: "",
                        mtu: 1370,
                        nat: !0,
                        firewall: !0,
                        igmp: !1,
                        keep_alive: {
                            interval: 20,
                            fails: 10
                        },
                        gwif: !1,
                        ondemand: 0
                    }
                }
            }
        },
        lte: {
            any: {
                type: "lte",
                is_wan: !0,
                services: {
                    create: {
                        enable: !0,
                        nat: !0,
                        firewall: !0,
                        type: "ip",
                        dhcp: !0,
                        igmp: !1,
                        dns_from_dhcp: !0,
                        gwif: !1
                    }
                }
            }
        },
        "3glte": {
            any: {
                type: "usb",
                is_wan: !0,
                services: {
                    create: {
                        __macro__: {
                            ppp: {
                                enable: !0,
                                type: "ppp",
                                servicename: "",
                                username: "",
                                password: "",
                                mtu: 1370,
                                nat: !0,
                                firewall: !0,
                                igmp: !1,
                                keep_alive: {
                                    interval: 20,
                                    fails: 10
                                },
                                gwif: !1,
                                ondemand: 0
                            },
                            ip: {
                                enable: !0,
                                nat: !0,
                                firewall: !0,
                                type: "ip",
                                dhcp: !0,
                                igmp: !0,
                                dns_from_dhcp: !0,
                                gwif: !1
                            }
                        }
                    }
                }
            }
        }
    }
}, window["prov_list_dir.js"] = $.extend(!0, window["prov_list_dir.js"], window.provs3g);
var provdlink = window["prov_list_dir.js"].man;
provdlink.l2tp = $.extend(!0, {}, provdlink.pptp), provdlink.l2tp.any.services.auto.tunnels.create.type = "l2tp", provdlink.statl2tp = $.extend(!0, {}, provdlink.statpptp), provdlink.statl2tp.any.services.create.tunnels.create.type = "l2tp", provdlink.dynl2tp = $.extend(!0, {}, provdlink.dynpptp), provdlink.dynl2tp.any.services.create.tunnels.create.type = "l2tp", provdlink.statpptpv6 = $.extend(!0, {}, provdlink.statpptp), tunnel = provdlink.statpptpv6.any.services.create.tunnels.create, tunnel.useipv6 = !0, provdlink.dynpptpv6 = $.extend(!0, {}, provdlink.dynpptp), tunnel = provdlink.dynpptpv6.any.services.create.tunnels.create, tunnel.useipv6 = !0, provdlink.statl2tpv6 = $.extend(!0, {}, provdlink.statl2tp), tunnel = provdlink.statl2tpv6.any.services.create.tunnels.create, tunnel.useipv6 = !0, provdlink.dynl2tpv6 = $.extend(!0, {}, provdlink.dynl2tp), tunnel = provdlink.dynl2tpv6.any.services.create.tunnels.create, tunnel.useipv6 = !0, provdlink.l2tpv6 = $.extend(!0, {}, provdlink.l2tp), tunnel = provdlink.l2tpv6.any.services.auto.tunnels.create, tunnel.useipv6 = !0, provdlink.pptpv6 = $.extend(!0, {}, provdlink.pptp), tunnel = provdlink.pptpv6.any.services.auto.tunnels.create, tunnel.useipv6 = !0, extend(pageRedirect, node), extend(gridRemoteAccess, node), extend(pageRemoteAccess, node), extend(ruleRemoteAccess, node), extend(pageDNS, node), extend(pageRouting, node), extend(pageRoutingIPv6, pageRouting), extend(routeStateTable, node);
var slacker = new function() {
    this.params = {
        wait: 18e5
    };
    var timer = window.oldSetTimeout || setTimeout;
    this.idTimer = null;
    var private = {};
    this.update = function() {
        device.config.read(67, callback(this, function(data) {
            data && data.resident && data.resident.logout_time && (this.params.wait = data.resident.logout_time)
        }))
    }, this.init = function() {
        this.update(), $("body").bind("keydown click contextmenu", function() {
            slacker.restartTimer()
        }), $(document).bind("scroll", function() {
            slacker.restartTimer()
        }), private.cursorX = 0, private.cursorY = 0, $("body").bind("mousemove", callback(this, function(event) {
            (Math.abs(private.cursorX - event.pageX) > 50 || Math.abs(private.cursorY - event.pageY) > 50) && (private.cursorX = event.pageX, private.cursorY = event.pageY, slacker.restartTimer())
        })), slacker.restartTimer(), $(window).bind("slacker_update", callback(this, function() {
            this.update()
        }))
    }, this.restartTimer = function() {
        clearTimeout(this.idTimer), this.params.wait && (this.idTimer = timer(callback(this, function() {
            this.idTimer == getCookie("idTimeSlacker") && device.system.auth("", "", function() {
                reload()
            })
        }), this.params.wait), setCookie("idTimeSlacker", this.idTimer))
    }, $(document).ready(function() {
        slacker.init()
    })
};
extend(jsStartModel, jsModel), extend(jsStartController, jsController), extend(jsStartClientView, jsCSideView), extend(jsStartServerView, jsSSideView), extend(pageDHCPStat, node), extend(igmpGrid, node), extend(pageMulticastGroups, node), extend(pageLANClientsStat, node), extend(pageRouteStat, node), extend(jsStatIPSettingsModel, jsModel), extend(jsStatIPSettingsController, jsFieldSetController), extend(jsStatIPSettingsClientView, jsFieldSetClientView), extend(jsStatIPSettingsSummaryView, jsStatIPSettingsClientView), extend(jsSysComModel, jsModel), extend(jsSysComController, jsController), extend(jsSysComView, jsViewTree), extend(jsSysComApplyView, jsSSideView), extend(pageSyslogConf, node), extend(pageTelnet, node), extend(jsTextareaController, jsEditController), extend(jsTextareaFieldController, jsController), extend(jsTextareaClientView, jsBaseInputView), extend(pageTR69, node), extend(pageTraceroute, node), extend(jsTunnelModel, jsModel), extend(jsTunnelController, jsFieldSetController), extend(jsTunnelClientView, jsFieldSetClientView),
    function() {
        var n = this,
            t = n._,
            r = Array.prototype,
            e = Object.prototype,
            u = Function.prototype,
            i = r.push,
            a = r.slice,
            o = r.concat,
            l = e.toString,
            c = e.hasOwnProperty,
            f = Array.isArray,
            s = Object.keys,
            p = u.bind,
            h = function(n) {
                return n instanceof h ? n : this instanceof h ? void(this._wrapped = n) : new h(n)
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = h), exports._ = h) : n._ = h, h.VERSION = "1.7.0";
        var g = function(n, t, r) {
            if (void 0 === t) return n;
            switch (null == r ? 3 : r) {
                case 1:
                    return function(r) {
                        return n.call(t, r)
                    };
                case 2:
                    return function(r, e) {
                        return n.call(t, r, e)
                    };
                case 3:
                    return function(r, e, u) {
                        return n.call(t, r, e, u)
                    };
                case 4:
                    return function(r, e, u, i) {
                        return n.call(t, r, e, u, i)
                    }
            }
            return function() {
                return n.apply(t, arguments)
            }
        };
        h.iteratee = function(n, t, r) {
            return null == n ? h.identity : h.isFunction(n) ? g(n, t, r) : h.isObject(n) ? h.matches(n) : h.property(n)
        }, h.each = h.forEach = function(n, t, r) {
            if (null == n) return n;
            t = g(t, r);
            var e, u = n.length;
            if (u === +u)
                for (e = 0; u > e; e++) t(n[e], e, n);
            else {
                var i = h.keys(n);
                for (e = 0, u = i.length; u > e; e++) t(n[i[e]], i[e], n)
            }
            return n
        }, h.map = h.collect = function(n, t, r) {
            if (null == n) return [];
            t = h.iteratee(t, r);
            for (var e, u = n.length !== +n.length && h.keys(n), i = (u || n).length, a = Array(i), o = 0; i > o; o++) e = u ? u[o] : o, a[o] = t(n[e], e, n);
            return a
        };
        var v = "Reduce of empty array with no initial value";
        h.reduce = h.foldl = h.inject = function(n, t, r, e) {
            null == n && (n = []), t = g(t, e, 4);
            var u, i = n.length !== +n.length && h.keys(n),
                a = (i || n).length,
                o = 0;
            if (arguments.length < 3) {
                if (!a) throw new TypeError(v);
                r = n[i ? i[o++] : o++]
            }
            for (; a > o; o++) u = i ? i[o] : o, r = t(r, n[u], u, n);
            return r
        }, h.reduceRight = h.foldr = function(n, t, r, e) {
            null == n && (n = []), t = g(t, e, 4);
            var u, i = n.length !== +n.length && h.keys(n),
                a = (i || n).length;
            if (arguments.length < 3) {
                if (!a) throw new TypeError(v);
                r = n[i ? i[--a] : --a]
            }
            for (; a--;) u = i ? i[a] : a, r = t(r, n[u], u, n);
            return r
        }, h.find = h.detect = function(n, t, r) {
            var e;
            return t = h.iteratee(t, r), h.some(n, function(n, r, u) {
                return t(n, r, u) ? (e = n, !0) : void 0
            }), e
        }, h.filter = h.select = function(n, t, r) {
            var e = [];
            return null == n ? e : (t = h.iteratee(t, r), h.each(n, function(n, r, u) {
                t(n, r, u) && e.push(n)
            }), e)
        }, h.reject = function(n, t, r) {
            return h.filter(n, h.negate(h.iteratee(t)), r)
        }, h.every = h.all = function(n, t, r) {
            if (null == n) return !0;
            t = h.iteratee(t, r);
            var e, u, i = n.length !== +n.length && h.keys(n),
                a = (i || n).length;
            for (e = 0; a > e; e++)
                if (u = i ? i[e] : e, !t(n[u], u, n)) return !1;
            return !0
        }, h.some = h.any = function(n, t, r) {
            if (null == n) return !1;
            t = h.iteratee(t, r);
            var e, u, i = n.length !== +n.length && h.keys(n),
                a = (i || n).length;
            for (e = 0; a > e; e++)
                if (u = i ? i[e] : e, t(n[u], u, n)) return !0;
            return !1
        }, h.contains = h.include = function(n, t) {
            return null == n ? !1 : (n.length !== +n.length && (n = h.values(n)), h.indexOf(n, t) >= 0)
        }, h.invoke = function(n, t) {
            var r = a.call(arguments, 2),
                e = h.isFunction(t);
            return h.map(n, function(n) {
                return (e ? t : n[t]).apply(n, r)
            })
        }, h.pluck = function(n, t) {
            return h.map(n, h.property(t))
        }, h.where = function(n, t) {
            return h.filter(n, h.matches(t))
        }, h.findWhere = function(n, t) {
            return h.find(n, h.matches(t))
        }, h.max = function(n, t, r) {
            var e, u, i = -1 / 0,
                a = -1 / 0;
            if (null == t && null != n) {
                n = n.length === +n.length ? n : h.values(n);
                for (var o = 0, l = n.length; l > o; o++) e = n[o], e > i && (i = e)
            }
            else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
                u = t(n, r, e), (u > a || u === -1 / 0 && i === -1 / 0) && (i = n, a = u)
            });
            return i
        }, h.min = function(n, t, r) {
            var e, u, i = 1 / 0,
                a = 1 / 0;
            if (null == t && null != n) {
                n = n.length === +n.length ? n : h.values(n);
                for (var o = 0, l = n.length; l > o; o++) e = n[o], i > e && (i = e)
            }
            else t = h.iteratee(t, r), h.each(n, function(n, r, e) {
                u = t(n, r, e), (a > u || 1 / 0 === u && 1 / 0 === i) && (i = n, a = u)
            });
            return i
        }, h.shuffle = function(n) {
            for (var t, r = n && n.length === +n.length ? n : h.values(n), e = r.length, u = Array(e), i = 0; e > i; i++) t = h.random(0, i), t !== i && (u[i] = u[t]), u[t] = r[i];
            return u
        }, h.sample = function(n, t, r) {
            return null == t || r ? (n.length !== +n.length && (n = h.values(n)), n[h.random(n.length - 1)]) : h.shuffle(n).slice(0, Math.max(0, t))
        }, h.sortBy = function(n, t, r) {
            return t = h.iteratee(t, r), h.pluck(h.map(n, function(n, r, e) {
                return {
                    value: n,
                    index: r,
                    criteria: t(n, r, e)
                }
            }).sort(function(n, t) {
                var r = n.criteria,
                    e = t.criteria;
                if (r !== e) {
                    if (r > e || void 0 === r) return 1;
                    if (e > r || void 0 === e) return -1
                }
                return n.index - t.index
            }), "value")
        };
        var m = function(n) {
            return function(t, r, e) {
                var u = {};
                return r = h.iteratee(r, e), h.each(t, function(e, i) {
                    var a = r(e, i, t);
                    n(u, e, a)
                }), u
            }
        };
        h.groupBy = m(function(n, t, r) {
            h.has(n, r) ? n[r].push(t) : n[r] = [t]
        }), h.indexBy = m(function(n, t, r) {
            n[r] = t
        }), h.countBy = m(function(n, t, r) {
            h.has(n, r) ? n[r]++ : n[r] = 1
        }), h.sortedIndex = function(n, t, r, e) {
            r = h.iteratee(r, e, 1);
            for (var u = r(t), i = 0, a = n.length; a > i;) {
                var o = i + a >>> 1;
                r(n[o]) < u ? i = o + 1 : a = o
            }
            return i
        }, h.toArray = function(n) {
            return n ? h.isArray(n) ? a.call(n) : n.length === +n.length ? h.map(n, h.identity) : h.values(n) : []
        }, h.size = function(n) {
            return null == n ? 0 : n.length === +n.length ? n.length : h.keys(n).length
        }, h.partition = function(n, t, r) {
            t = h.iteratee(t, r);
            var e = [],
                u = [];
            return h.each(n, function(n, r, i) {
                (t(n, r, i) ? e : u).push(n)
            }), [e, u]
        }, h.first = h.head = h.take = function(n, t, r) {
            return null == n ? void 0 : null == t || r ? n[0] : 0 > t ? [] : a.call(n, 0, t)
        }, h.initial = function(n, t, r) {
            return a.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
        }, h.last = function(n, t, r) {
            return null == n ? void 0 : null == t || r ? n[n.length - 1] : a.call(n, Math.max(n.length - t, 0))
        }, h.rest = h.tail = h.drop = function(n, t, r) {
            return a.call(n, null == t || r ? 1 : t)
        }, h.compact = function(n) {
            return h.filter(n, h.identity)
        };
        var y = function(n, t, r, e) {
            if (t && h.every(n, h.isArray)) return o.apply(e, n);
            for (var u = 0, a = n.length; a > u; u++) {
                var l = n[u];
                h.isArray(l) || h.isArguments(l) ? t ? i.apply(e, l) : y(l, t, r, e) : r || e.push(l)
            }
            return e
        };
        h.flatten = function(n, t) {
            return y(n, t, !1, [])
        }, h.without = function(n) {
            return h.difference(n, a.call(arguments, 1))
        }, h.uniq = h.unique = function(n, t, r, e) {
            if (null == n) return [];
            h.isBoolean(t) || (e = r, r = t, t = !1), null != r && (r = h.iteratee(r, e));
            for (var u = [], i = [], a = 0, o = n.length; o > a; a++) {
                var l = n[a];
                if (t) a && i === l || u.push(l), i = l;
                else if (r) {
                    var c = r(l, a, n);
                    h.indexOf(i, c) < 0 && (i.push(c), u.push(l))
                }
                else h.indexOf(u, l) < 0 && u.push(l)
            }
            return u
        }, h.union = function() {
            return h.uniq(y(arguments, !0, !0, []))
        }, h.intersection = function(n) {
            if (null == n) return [];
            for (var t = [], r = arguments.length, e = 0, u = n.length; u > e; e++) {
                var i = n[e];
                if (!h.contains(t, i)) {
                    for (var a = 1; r > a && h.contains(arguments[a], i); a++);
                    a === r && t.push(i)
                }
            }
            return t
        }, h.difference = function(n) {
            var t = y(a.call(arguments, 1), !0, !0, []);
            return h.filter(n, function(n) {
                return !h.contains(t, n)
            })
        }, h.zip = function(n) {
            if (null == n) return [];
            for (var t = h.max(arguments, "length").length, r = Array(t), e = 0; t > e; e++) r[e] = h.pluck(arguments, e);
            return r
        }, h.object = function(n, t) {
            if (null == n) return {};
            for (var r = {}, e = 0, u = n.length; u > e; e++) t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
            return r
        }, h.indexOf = function(n, t, r) {
            if (null == n) return -1;
            var e = 0,
                u = n.length;
            if (r) {
                if ("number" != typeof r) return e = h.sortedIndex(n, t), n[e] === t ? e : -1;
                e = 0 > r ? Math.max(0, u + r) : r
            }
            for (; u > e; e++)
                if (n[e] === t) return e;
            return -1
        }, h.lastIndexOf = function(n, t, r) {
            if (null == n) return -1;
            var e = n.length;
            for ("number" == typeof r && (e = 0 > r ? e + r + 1 : Math.min(e, r + 1)); --e >= 0;)
                if (n[e] === t) return e;
            return -1
        }, h.range = function(n, t, r) {
            arguments.length <= 1 && (t = n || 0, n = 0), r = r || 1;
            for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++, n += r) u[i] = n;
            return u
        };
        var d = function() {};
        h.bind = function(n, t) {
            var r, e;
            if (p && n.bind === p) return p.apply(n, a.call(arguments, 1));
            if (!h.isFunction(n)) throw new TypeError("Bind must be called on a function");
            return r = a.call(arguments, 2), e = function() {
                if (!(this instanceof e)) return n.apply(t, r.concat(a.call(arguments)));
                d.prototype = n.prototype;
                var u = new d;
                d.prototype = null;
                var i = n.apply(u, r.concat(a.call(arguments)));
                return h.isObject(i) ? i : u
            }
        }, h.partial = function(n) {
            var t = a.call(arguments, 1);
            return function() {
                for (var r = 0, e = t.slice(), u = 0, i = e.length; i > u; u++) e[u] === h && (e[u] = arguments[r++]);
                for (; r < arguments.length;) e.push(arguments[r++]);
                return n.apply(this, e)
            }
        }, h.bindAll = function(n) {
            var t, r, e = arguments.length;
            if (1 >= e) throw new Error("bindAll must be passed function names");
            for (t = 1; e > t; t++) r = arguments[t], n[r] = h.bind(n[r], n);
            return n
        }, h.memoize = function(n, t) {
            var r = function(e) {
                var u = r.cache,
                    i = t ? t.apply(this, arguments) : e;
                return h.has(u, i) || (u[i] = n.apply(this, arguments)), u[i]
            };
            return r.cache = {}, r
        }, h.delay = function(n, t) {
            var r = a.call(arguments, 2);
            return setTimeout(function() {
                return n.apply(null, r)
            }, t)
        }, h.defer = function(n) {
            return h.delay.apply(h, [n, 1].concat(a.call(arguments, 1)))
        }, h.throttle = function(n, t, r) {
            var e, u, i, a = null,
                o = 0;
            r || (r = {});
            var l = function() {
                o = r.leading === !1 ? 0 : h.now(), a = null, i = n.apply(e, u), a || (e = u = null)
            };
            return function() {
                var c = h.now();
                o || r.leading !== !1 || (o = c);
                var f = t - (c - o);
                return e = this, u = arguments, 0 >= f || f > t ? (clearTimeout(a), a = null, o = c, i = n.apply(e, u), a || (e = u = null)) : a || r.trailing === !1 || (a = setTimeout(l, f)), i
            }
        }, h.debounce = function(n, t, r) {
            var e, u, i, a, o, l = function() {
                var c = h.now() - a;
                t > c && c > 0 ? e = setTimeout(l, t - c) : (e = null, r || (o = n.apply(i, u), e || (i = u = null)))
            };
            return function() {
                i = this, u = arguments, a = h.now();
                var c = r && !e;
                return e || (e = setTimeout(l, t)), c && (o = n.apply(i, u), i = u = null), o
            }
        }, h.wrap = function(n, t) {
            return h.partial(t, n)
        }, h.negate = function(n) {
            return function() {
                return !n.apply(this, arguments)
            }
        }, h.compose = function() {
            var n = arguments,
                t = n.length - 1;
            return function() {
                for (var r = t, e = n[t].apply(this, arguments); r--;) e = n[r].call(this, e);
                return e
            }
        }, h.after = function(n, t) {
            return function() {
                return --n < 1 ? t.apply(this, arguments) : void 0
            }
        }, h.before = function(n, t) {
            var r;
            return function() {
                return --n > 0 ? r = t.apply(this, arguments) : t = null, r
            }
        }, h.once = h.partial(h.before, 2), h.keys = function(n) {
            if (!h.isObject(n)) return [];
            if (s) return s(n);
            var t = [];
            for (var r in n) h.has(n, r) && t.push(r);
            return t
        }, h.values = function(n) {
            for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = n[t[u]];
            return e
        }, h.pairs = function(n) {
            for (var t = h.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++) e[u] = [t[u], n[t[u]]];
            return e
        }, h.invert = function(n) {
            for (var t = {}, r = h.keys(n), e = 0, u = r.length; u > e; e++) t[n[r[e]]] = r[e];
            return t
        }, h.functions = h.methods = function(n) {
            var t = [];
            for (var r in n) h.isFunction(n[r]) && t.push(r);
            return t.sort()
        }, h.extend = function(n) {
            if (!h.isObject(n)) return n;
            for (var t, r, e = 1, u = arguments.length; u > e; e++) {
                t = arguments[e];
                for (r in t) c.call(t, r) && (n[r] = t[r])
            }
            return n
        }, h.pick = function(n, t, r) {
            var e, u = {};
            if (null == n) return u;
            if (h.isFunction(t)) {
                t = g(t, r);
                for (e in n) {
                    var i = n[e];
                    t(i, e, n) && (u[e] = i)
                }
            }
            else {
                var l = o.apply([], a.call(arguments, 1));
                n = new Object(n);
                for (var c = 0, f = l.length; f > c; c++) e = l[c], e in n && (u[e] = n[e])
            }
            return u
        }, h.omit = function(n, t, r) {
            if (h.isFunction(t)) t = h.negate(t);
            else {
                var e = h.map(o.apply([], a.call(arguments, 1)), String);
                t = function(n, t) {
                    return !h.contains(e, t)
                }
            }
            return h.pick(n, t, r)
        }, h.defaults = function(n) {
            if (!h.isObject(n)) return n;
            for (var t = 1, r = arguments.length; r > t; t++) {
                var e = arguments[t];
                for (var u in e) void 0 === n[u] && (n[u] = e[u])
            }
            return n
        }, h.clone = function(n) {
            return h.isObject(n) ? h.isArray(n) ? n.slice() : h.extend({}, n) : n
        }, h.tap = function(n, t) {
            return t(n), n
        };
        var b = function(n, t, r, e) {
            if (n === t) return 0 !== n || 1 / n === 1 / t;
            if (null == n || null == t) return n === t;
            n instanceof h && (n = n._wrapped), t instanceof h && (t = t._wrapped);
            var u = l.call(n);
            if (u !== l.call(t)) return !1;
            switch (u) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + n == "" + t;
                case "[object Number]":
                    return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
                case "[object Date]":
                case "[object Boolean]":
                    return +n === +t
            }
            if ("object" != typeof n || "object" != typeof t) return !1;
            for (var i = r.length; i--;)
                if (r[i] === n) return e[i] === t;
            var a = n.constructor,
                o = t.constructor;
            if (a !== o && "constructor" in n && "constructor" in t && !(h.isFunction(a) && a instanceof a && h.isFunction(o) && o instanceof o)) return !1;
            r.push(n), e.push(t);
            var c, f;
            if ("[object Array]" === u) {
                if (c = n.length, f = c === t.length)
                    for (; c-- && (f = b(n[c], t[c], r, e)););
            }
            else {
                var s, p = h.keys(n);
                if (c = p.length, f = h.keys(t).length === c)
                    for (; c-- && (s = p[c], f = h.has(t, s) && b(n[s], t[s], r, e)););
            }
            return r.pop(), e.pop(), f
        };
        h.isEqual = function(n, t) {
            return b(n, t, [], [])
        }, h.isEmpty = function(n) {
            if (null == n) return !0;
            if (h.isArray(n) || h.isString(n) || h.isArguments(n)) return 0 === n.length;
            for (var t in n)
                if (h.has(n, t)) return !1;
            return !0
        }, h.isElement = function(n) {
            return !(!n || 1 !== n.nodeType)
        }, h.isArray = f || function(n) {
            return "[object Array]" === l.call(n)
        }, h.isObject = function(n) {
            var t = typeof n;
            return "function" === t || "object" === t && !!n
        }, h.each(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function(n) {
            h["is" + n] = function(t) {
                return l.call(t) === "[object " + n + "]"
            }
        }), h.isArguments(arguments) || (h.isArguments = function(n) {
            return h.has(n, "callee")
        }), "function" != typeof /./ && (h.isFunction = function(n) {
            return "function" == typeof n || !1
        }), h.isFinite = function(n) {
            return isFinite(n) && !isNaN(parseFloat(n))
        }, h.isNaN = function(n) {
            return h.isNumber(n) && n !== +n
        }, h.isBoolean = function(n) {
            return n === !0 || n === !1 || "[object Boolean]" === l.call(n)
        }, h.isNull = function(n) {
            return null === n
        }, h.isUndefined = function(n) {
            return void 0 === n
        }, h.has = function(n, t) {
            return null != n && c.call(n, t)
        }, h.noConflict = function() {
            return n._ = t, this
        }, h.identity = function(n) {
            return n
        }, h.constant = function(n) {
            return function() {
                return n
            }
        }, h.noop = function() {}, h.property = function(n) {
            return function(t) {
                return t[n]
            }
        }, h.matches = function(n) {
            var t = h.pairs(n),
                r = t.length;
            return function(n) {
                if (null == n) return !r;
                n = new Object(n);
                for (var e = 0; r > e; e++) {
                    var u = t[e],
                        i = u[0];
                    if (u[1] !== n[i] || !(i in n)) return !1
                }
                return !0
            }
        }, h.times = function(n, t, r) {
            var e = Array(Math.max(0, n));
            t = g(t, r, 1);
            for (var u = 0; n > u; u++) e[u] = t(u);
            return e
        }, h.random = function(n, t) {
            return null == t && (t = n, n = 0), n + Math.floor(Math.random() * (t - n + 1))
        }, h.now = Date.now || function() {
            return (new Date).getTime()
        };
        var _ = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            w = h.invert(_),
            j = function(n) {
                var t = function(t) {
                        return n[t]
                    },
                    r = "(?:" + h.keys(n).join("|") + ")",
                    e = RegExp(r),
                    u = RegExp(r, "g");
                return function(n) {
                    return n = null == n ? "" : "" + n, e.test(n) ? n.replace(u, t) : n
                }
            };
        h.escape = j(_), h.unescape = j(w), h.result = function(n, t) {
            if (null == n) return void 0;
            var r = n[t];
            return h.isFunction(r) ? n[t]() : r
        };
        var x = 0;
        h.uniqueId = function(n) {
            var t = ++x + "";
            return n ? n + t : t
        }, h.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var A = /(.)^/,
            k = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                ".": "u2028",
                ".": "u2029"
            },
            O = /\\|'|\r|\n|\u2028|\u2029/g,
            F = function(n) {
                return "\\" + k[n]
            };
        h.template = function(n, t, r) {
            !t && r && (t = r), t = h.defaults({}, t, h.templateSettings);
            var e = RegExp([(t.escape || A).source, (t.interpolate || A).source, (t.evaluate || A).source].join("|") + "|$", "g"),
                u = 0,
                i = "__p+='";
            n.replace(e, function(t, r, e, a, o) {
                return i += n.slice(u, o).replace(O, F), u = o + t.length, r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : a && (i += "';\n" + a + "\n__p+='"), t
            }), i += "';\n", t.variable || (i = "with(obj||{}){\n" + i + "}\n"), i = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
            try {
                var a = new Function(t.variable || "obj", "_", i)
            }
            catch (o) {
                throw o.source = i, o
            }
            var l = function(n) {
                    return a.call(this, n, h)
                },
                c = t.variable || "obj";
            return l.source = "function(" + c + "){\n" + i + "}", l
        }, h.chain = function(n) {
            var t = h(n);
            return t._chain = !0, t
        };
        var E = function(n) {
            return this._chain ? h(n).chain() : n
        };
        h.mixin = function(n) {
            h.each(h.functions(n), function(t) {
                var r = h[t] = n[t];
                h.prototype[t] = function() {
                    var n = [this._wrapped];
                    return i.apply(n, arguments), E.call(this, r.apply(h, n))
                }
            })
        }, h.mixin(h), h.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
            var t = r[n];
            h.prototype[n] = function() {
                var r = this._wrapped;
                return t.apply(r, arguments), "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0], E.call(this, r)
            }
        }), h.each(["concat", "join", "slice"], function(n) {
            var t = r[n];
            h.prototype[n] = function() {
                return E.call(this, t.apply(this._wrapped, arguments))
            }
        }), h.prototype.value = function() {
            return this._wrapped
        }, "function" == typeof define && define.amd && define("underscore", [], function() {
            return h
        })
    }.call(this), extend(pageUPnP, node), extend(pageURLFilterConfig, node), extend(pageURLFilter, node), extend(pageVirtServ, node), extend(wizardVirtServ, pageVirtServ), extend(ruleVirtServ, node);
var vservProtoNames = {
    tcp: "TCP",
    udp: "UDP",
    "tcp/udp": "TCP/UDP"
};
window.templateList = [{
    name: "Custom",
    protocol: "",
    type: "custom",
    ports: {}
}, {
    name: "Virtual Server HTTP",
    protocol: "tcp",
    type: "http",
    ports: {
        tcp: {
            port_fw: "80",
            port_dst: "80"
        }
    }
}, {
    name: "Virtual Server HTTPS",
    protocol: "tcp",
    type: "https",
    ports: {
        tcp: {
            port_fw: "443",
            port_dst: "443"
        }
    }
}, {
    name: "Virtual Server DNS",
    protocol: "udp",
    type: "dns",
    ports: {
        udp: {
            port_fw: "53",
            port_dst: "53"
        }
    }
}, {
    name: "Virtual Server SMTP",
    protocol: "tcp",
    type: "smtp",
    ports: {
        tcp: {
            port_fw: "25",
            port_dst: "25"
        }
    }
}, {
    name: "Virtual Server POP3",
    protocol: "tcp",
    type: "pop3",
    ports: {
        tcp: {
            port_fw: "110",
            port_dst: "110"
        }
    }
}, {
    name: "Virtual Server SSH",
    protocol: "tcp",
    type: "ssh",
    ports: {
        tcp: {
            port_fw: "22",
            port_dst: "22"
        }
    }
}, {
    name: "Virtual Server IPSec",
    protocol: "udp",
    type: "ipsec",
    hide_ports: !0,
    ports: {}
}, {
    name: "Virtual Server FTP",
    protocol: "tcp",
    type: "ftp",
    ports: {
        tcp: {
            port_fw: "20:21",
            port_dst: "20:21"
        }
    }
}, {
    name: "Virtual Server SFTP",
    protocol: "tcp",
    type: "sftp",
    hide_ports: !0,
    ports: {}
}, {
    name: "Virtual Server Telnet",
    protocol: "tcp,udp,tcp/udp",
    type: "telnet",
    ports: {
        tcp: {
            port_fw: "23",
            port_dst: "23"
        },
        udp: {
            port_fw: "23",
            port_dst: "23"
        },
        "tcp/udp": {
            port_fw: "23",
            port_dst: "23"
        }
    }
}, {
    name: "Virtual Server PPTP",
    protocol: "tcp,udp,tcp/udp",
    type: "pptp",
    ports: {
        tcp: {
            port_fw: "1723",
            port_dst: "1723"
        },
        udp: {
            port_fw: "1723",
            port_dst: "1723"
        },
        "tcp/udp": {
            port_fw: "1723",
            port_dst: "1723"
        }
    }
}, {
    name: "Virtual Server PCAnyWhere",
    protocol: "tcp/udp",
    type: "pcanywhere",
    hide_ports: !0,
    ports: {}
}, {
    name: "Virtual Server VNC",
    protocol: "tcp,udp,tcp/udp",
    type: "vnc",
    ports: {
        tcp: {
            port_fw: "5900",
            port_dst: "5900"
        },
        udp: {
            port_fw: "5900",
            port_dst: "5900"
        },
        "tcp/udp": {
            port_fw: "5900",
            port_dst: "5900"
        }
    }
}, {
    name: "Virtual Server TFTP",
    protocol: "udp",
    type: "tftp",
    ports: {
        udp: {
            port_fw: "69",
            port_dst: "69"
        }
    }
}, {
    name: "Virtual Server RDP",
    protocol: "tcp,udp,tcp/udp",
    type: "rdp",
    ports: {
        tcp: {
            port_fw: "3389",
            port_dst: "3389"
        },
        udp: {
            port_fw: "3389",
            port_dst: "3389"
        },
        "tcp/udp": {
            port_fw: "3389",
            port_dst: "3389"
        }
    }
}], extend(formVlan, node), extend(formVlanBridge, node), extend(formVlanWanT, node), extend(formVlanLanT, node), extend(formVlanWanU, node), extend(pageVlan, node), device.hook(device.signal.PROCESS, function(state, jqXHR) {
    state || jqXHR.answer && jqXHR.answer.rpcWAN && (window.rpcWanAnswer = jqXHR.answer.rpcWAN.iface_names)
}), device.filter(function(url, type, data) {
    var locker, lockByIface = {};
    if (data)
        if ("string" == typeof data) {
            for (var str = data, arrForJson = str.split("&"), jsonFromStr = {}, i = 0; i < arrForJson.length; i++) {
                var pair = arrForJson[i].split("=");
                jsonFromStr[pair[0]] = pair[1]
            }
            var iface = "",
                res_buf = "";
            if (jsonFromStr.res_config_id && 1 == jsonFromStr.res_config_id && 2 == jsonFromStr.res_config_action) {
                res_buf = jsonFromStr.res_buf;
                var re = /.*(?=\"\])/;
                iface = re.exec(res_buf.substring(2))[0], locker = getLockers(window.rpcWanAnswer, iface), locker && (lockByIface[iface] = locker)
            }
            else {
                var lock;
                for (var i in jsonFromStr)
                    if (-1 != i.indexOf("res_config_id") && 1 == jsonFromStr[i]) {
                        var id = i.substring(13, i.length);
                        if (2 == jsonFromStr["res_config_action" + id]) {
                            res_buf = jsonFromStr["res_buf" + id];
                            var re = /.*(?=\"\])/;
                            iface = re.exec(res_buf.substring(2))[0], locker = getLockers(window.rpcWanAnswer, iface), locker && (lockByIface[iface] = locker);
                            break
                        }
                    }
            }
        }
        else if ("object" == typeof data)
        if (jsonFromJqXHR = data, jsonFromJqXHR.res_config_id && 1 == jsonFromJqXHR.res_config_id && 2 == jsonFromJqXHR.res_config_action) {
            if (res_buf = jsonFromJqXHR.res_buf, is.string(res_buf)) {
                var re = /.*(?=\"\])/;
                iface = re.exec(res_buf.substring(2))[0], locker = getLockers(window.rpcWanAnswer, iface), locker && (lockByIface[iface] = locker)
            }
        }
        else
            for (var i in jsonFromJqXHR)
                if (-1 != i.indexOf("res_config_id") && 1 == jsonFromJqXHR[i]) {
                    var id = i.substring(13, i.length);
                    if (2 == jsonFromJqXHR["res_config_action" + id] && (res_buf = jsonFromJqXHR["res_buf" + id], is.string(res_buf))) {
                        var re = /.*(?=\"\])/;
                        iface = re.exec(res_buf.substring(2))[0], locker = getLockers(window.rpcWanAnswer, iface), locker && (lockByIface[iface] = locker)
                    }
                }
    var lockers = {};
    for (var ifname in lockByIface)
        for (var lock = lockByIface[ifname], j = 0; j < lock.length; j++) lockers[lock[j]] || (lockers[lock[j]] = []), lockers[lock[j]].push({
            ifname: ifname,
            name: getConnName(window.rpcWanAnswer, ifname)
        });
    var allLockers = _.omit(lockers, "firewall.zones", "firewall.rules", "firewall.masquerade"),
        firewallLockers = _.pick(lockers, "firewall.zones", "firewall.rules", "firewall.masquerade");
    if (_.size(firewallLockers)) {
        var msg = getLockersConnMsg(firewallLockers);
        return alert(msg + lng("rejectDelCon4") + ".\n"), rootView.hideModalOverlay(), !1
    }
    if (_.size(allLockers)) {
        var msg = getLockersConnMsg(allLockers);
        if (_.size(allLockers) > 1) alert(msg + lng("rejectDelCon2") + ".\n");
        else if (confirm(msg + lng("rejectDelCon2") + ". " + lng("rejectDelCon3"))) {
            var lock = getObjectFirstKey(allLockers);
            window.location.hash = getMenuPath(lock)
        }
        return rootView.hideModalOverlay(), !1
    }
    return !0
}), extend(jsWANIGMPModel, jsModel), extend(jsWANIGMPController, jsFieldSetController), extend(jsWANIGMPClientView, jsFieldSetClientView), extend(jsWANIGMPSummaryView, jsWANIGMPClientView), extend(jsWansController, jsFieldSetController), extend(jsWansClientView, jsFieldSetClientView), extend(jsWanSetController, jsRecordSetController), extend(jsWanSetClientView, jsRecordSetClientView), extend(jsWanSetServerView, jsSSideView), extend(jsWanSetGwifServerView, jsSSideView);
var connTypeValSet = {
    pppoe: "PPPoE",
    pppoev6: "IPv6 PPPoE",
    pppoedual: "PPPoE Dual Stack",
    bridge: "Bridge",
    pppoa: "PPPoA",
    "static": lng("static"),
    dynamic: lng("dynamic"),
    statkab: lng("statkab"),
    dynkab: lng("dynkab"),
    staticv6: lng("staticv6"),
    dynamicv6: lng("dynamicv6"),
    ipoa: "IPoA",
    "3g": "3G",
    lte: "LTE",
    "3glte": "3G/LTE",
    pptp: "PPTP",
    l2tp: "L2TP",
    statpptp: lng("statpptp"),
    statpppoe: lng("statpppoe"),
    dynpptp: lng("dynpptp"),
    dynpppoe: lng("dynpppoe"),
    statl2tp: lng("statl2tp"),
    dynl2tp: lng("dynl2tp"),
    pptpv6: lng("pptpv6"),
    l2tpv6: lng("l2tpv6"),
    statpptpv6: lng("statpptpv6"),
    dynpptpv6: lng("dynpptpv6"),
    statl2tpv6: lng("statl2tpv6"),
    dynl2tpv6: lng("dynl2tpv6"),
    624: lng("624")
};
extend(pageWebPanelConfig, node), extend(jsWiFiModel, jsModel), extend(pageWiFiAdvanced, node), extend(wifiBasicForm, node), extend(pageWiFiBasic, node), extend(nodeLevelGrid, nodeComboGrid), extend(nodeBSSID, node), extend(wifiHotspotList, node), extend(pageWiFiClient, node), extend(pageWMF, node), extend(editWMFRule, node), extend(wizardWiFiRouter, nodeWizard), extend(wizardWiFiClient, nodeWizard), extend(wizardWiFiDisabler, nodeWizard), extend(wizardWiFiMulti, nodeWizard), extend(pageWiFiWizard, node), extend(pageWiFiRepeaterWizard, node), extend(wifiWEPForm, node), extend(wifiWPAForm, node), extend(wifiSecurityForm, node), extend(pageWiFiSecurity, node), extend(pageWiFiStationList, node), extend(wifiWMMGrid, node), extend(pageWiFiWMM, node), extend(pageWiFiWPS, node), window.words_to_replace = [];