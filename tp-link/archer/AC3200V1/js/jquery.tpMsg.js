(function($) {
    'use strict';
    $.fn.tpAlert = function(options) {
        options = $.extend({}, options);

        var tmp = $(this);
        var inHTML = "";

        inHTML += "<div class=\"msg-wrap\">";

        inHTML += "<a class=\"widget-close msg-close\" href=\"javascript:void(0);\"></a>";
        inHTML += "<div class=\"msg-content-wrap\">";

        if (this._title) {
            inHTML += "<h3 class=\"widget-title msg-title\">";
            inHTML += "<span class=\"msg-title-container\">" + "" + "</span>";
            inHTML += "</h3>";
        }

        inHTML += "<div class=\"widget-content msg-content-container\">";
        inHTML += "<div class=\"grid-warning-msg\">";
        inHTML += "<span class=\"icon\"></span>";
        inHTML += "<span class=\"text\"></span>";
        inHTML += "</div>";
        inHTML += "</div>";
        inHTML += "</div>";
        inHTML += "</div>";

        inHTML += "<div class=\"msg-btn-container\">";
        inHTML += "<div class=\"msg-btn-wrap\">";
        inHTML += "<div class=\"button-container in-line\">";
        inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-ok btn-alert\">";
        inHTML += "<span>" + m_str.ok + "</span>";
        inHTML += "</button>";
        inHTML += "</div>";
        inHTML += "</div>";
        inHTML += "</div>";

        inHTML = '<div class="position-center-right">' + inHTML + '</div>';
        inHTML = '<div class="position-center-left">' + inHTML + '</div>';

        inHTML = '<div class="position-top-right"></div>' + inHTML;
        inHTML = '<div class="position-top-center"></div>' + inHTML;
        inHTML = '<div class="position-top-left"></div>' + inHTML;

        inHTML += '<div class="position-bottom-left"></div>';
        inHTML += '<div class="position-bottom-center"></div>';
        inHTML += '<div class="position-bottom-right"></div>';

        tmp.empty();
        tmp.append($(inHTML)).addClass("container widget-container msg-container grid-popup-msg").css({
            "z-index": "999",
            "display": "none"
        });

        tmp.delegate("a.msg-close", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        }).delegate("button.btn-msg-ok", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        })
    };

    $.fn.tpConfirm = function(options) {
        options = $.extend({}, options);

        var tmp = $(this);
        var inHTML = "";

        inHTML += "<div class=\"msg-wrap\">";

        inHTML += "<a class=\"widget-close msg-close\" href=\"javascript:void(0);\"></a>";
        inHTML += "<div class=\"msg-content-wrap\">";

        if (this._title) {
            inHTML += "<h3 class=\"widget-title msg-title\">";
            inHTML += "<span class=\"msg-title-container\">" + "" + "</span>";
            inHTML += "</h3>";
        }

        inHTML += "<div class=\"widget-content msg-content-container\">";
        inHTML += "<div class=\"grid-warning-msg\">";
        inHTML += "<span class=\"icon\"></span>";
        inHTML += "<span class=\"text\"></span>";
        inHTML += "</div>";
        inHTML += "</div>";

        inHTML += "</div>";
        inHTML += "</div>";

        inHTML += "<div class=\"msg-btn-container\">";
        inHTML += "<div class=\"msg-btn-wrap\">";
        inHTML += "<div class=\"button-container in-line\">";
        inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-no btn-confirm\">"
        inHTML += "<span></span>";
        inHTML += "</button>";
        inHTML += "</div>";
        inHTML += "<div class=\"button-container in-line\">";
        inHTML += "<button type=\"button\" class=\"button-button green pure-button btn-msg btn-msg-ok btn-confirm\">"
        inHTML += "<span></span>";
        inHTML += "</button>";
        inHTML += "</div>";
        inHTML += "</div>";
        inHTML += "</div>";

        inHTML = '<div class="position-center-right">' + inHTML + '</div>';
        inHTML = '<div class="position-center-left">' + inHTML + '</div>';

        inHTML = '<div class="position-top-right"></div>' + inHTML;
        inHTML = '<div class="position-top-center"></div>' + inHTML;
        inHTML = '<div class="position-top-left"></div>' + inHTML;

        inHTML += '<div class="position-bottom-left"></div>';
        inHTML += '<div class="position-bottom-center"></div>';
        inHTML += '<div class="position-bottom-right"></div>';

        tmp.empty();
        tmp.append($(inHTML)).addClass("container widget-container msg-container grid-popup-msg").css({
            "z-index": "999",
            "display": "none"
        });

        tmp.delegate("a.msg-close", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        }).delegate("button.btn-msg-ok", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        }).delegate("button.btn-msg-cancel", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        }).delegate("button.btn-msg-no", "click", function(e) {
            e.preventDefault();
            $.removeLoading();
            $.hideCover();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

        })
    }
})(jQuery);

jQuery.extend({

    alert: function() {
        var errno = arguments[0];
        var l = arguments.length;

        if (arguments[l - 1] === true) {
            return errno;
        }
        if (e_str[errno]) {
            var str = e_str[errno];
            for (var i = 1; i < l; i++) {
                str = str.replace("$", arguments[i]);
            }
        } else {
            var str = e_str[ERR_UNKOWN];
        }

        var tmp = $("div.alert-container");
        tmp.css("width", "auto");
        tmp.css("height","auto");
        tmp.find("span.icon").show();
        tmp.find("a.widget-close.msg-close").show();
        tmp.find("div.msg-btn-container").show();
        tmp.find("span.text").html($.turnqss(str));
        $.setCentralPosition(tmp);
        $.lock();
        $.showCover();
        tmp.fadeIn(200, function() {
            tmp.css("display", "block");
        });
        var activeObj;
        $('body').on("mousedown.focus", function(e) {
            if (activeObj === undefined) {
                activeObj = document.activeElement;
            }
        });

        $('body').on('keydown.focus', function(e) {
            return false;
        });

        tmp.delegate("button.btn-msg-ok", "click.focus", function(e) {
            activeObj.focus();
            $('body').off('mousedown.focus');
            $('body').off('keydown.focus');
            tmp.undelegate('button.btn-msg-ok', 'click.focus');
            tmp.undelegate('a.msg-close', 'click.focus');
        });

        tmp.delegate("a.msg-close", "click.focus", function(e) {
            activeObj.focus();
            $('body').off('mousedown.focus');
            $('body').off('keydown.focus');
            tmp.undelegate('button.btn-msg-ok', 'click.focus');
            tmp.undelegate('a.msg-close', 'click.focus');
        });

        return errno;
    },

    alertAsnyc: function() {
        var errno = arguments[0];
        var l = arguments.length;

        if (arguments[l - 1] === true) {
            return errno;
        }
        if (e_str[errno]) {
            var str = e_str[errno];
            for (var i = 1; i < l; i++) {
                str = str.replace("$", arguments[i]);
            }
        } else {
            var str = e_str[ERR_UNKOWN];
        }

        var tmp = $("div.alert-container");
        tmp.css("width", "auto");
        tmp.css("height","auto");
        tmp.find("span.icon").show();
        tmp.find("a.widget-close.msg-close").show();
        tmp.find("div.msg-btn-container").show();
        tmp.find("span.text").css({
            "display":"inline-block",
            "max-width": 700
        }).html($.turnqss(m_str.errno + ":"+ errno + "<br>" + str));
        $.setCentralPosition(tmp);
        $.lock();

        var showCover = function() {
            var tmp = $("<div id=\"mask-alert-asnyc\" class=\"mask\"><div id=\"cover-loading\"></div></div>").appendTo($("body"));
            tmp.fadeIn(200, function() {
                $(this).css("display", "block");
                if ($.browser.msie) {
                    $(this).css("filter", "alpha(opacity=70)");
                }
            });
        };

        var hideCover = function() {
            var tmp = $("div.mask#mask-alert-asnyc");

            tmp.fadeOut(200, function() {
                $(this).css("display", "none");
        })
        };

        showCover();
        tmp.fadeIn(200, function() {
            tmp.css("display", "block");
            tmp.find('.grid-warning-msg').css("width",tmp.find('span.text').width() + 48);
        });

        var activeObj;
        var activeObj;
        $('body').on("mousedown.focus", function(e) {
            if (activeObj === undefined) {
                activeObj = document.activeElement;
            }
        });


        $('body').on('keydown.focus', function(e) {
            return false;
        });

        tmp.delegate("button.btn-msg-ok", "click.focus", function(e) {
            activeObj.focus();
            hideCover();
            $('body').off('mousedown.focus');
            $('body').off('keydown.focus');
            tmp.undelegate('button.btn-msg-ok', 'click.focus');
            tmp.undelegate('a.msg-close', 'click.focus');
            tmp.find('.grid-warning-msg').css("width",'auto');
        });

        tmp.delegate("a.msg-close", "click.focus", function(e) {
            activeObj.focus();
            hideCover();
            $('body').off('mousedown.focus');
            $('body').off('keydown.focus');
            tmp.undelegate('button.btn-msg-ok', 'click.focus')
            tmp.undelegate('a.msg-close', 'click.focus')
            tmp.find('.grid-warning-msg').css("width",'auto');
        });

        return errno;
    },
    progressBar: function() {
        var str = arguments[0];

        var tmp = $("div.alert-container");
        tmp.css({
            width:"610px",
            height: "140px",
            overflow: "hidden",
            "box-sizing": "border-box"
            });
        tmp.find("span.text").html($.turnqss(str));
        tmp.find("span.icon").hide();
        tmp.find("a.widget-close.msg-close").hide();
        tmp.find("div.msg-btn-container").hide();
        tmp.find("span.text").css("display","inline");
        $.setCentralPosition(tmp);
        $.lock();
        $.showCover();
        tmp.fadeIn(200, function() {
            tmp.css("display", "block");
        });

        var activeObj;
        $('body').on("mousedown.focus", function(e) {
            if (activeObj === undefined) {
                activeObj = document.activeElement;
            }
        });

        $('body').on('keydown.focus', function(e) {
            return false;
        })

    },
    confirm: function(str, callbackOk, callbackNo, replaceStr, okStr, cancelStr) {
        var tmp = $("div.confirm-container");
        if (replaceStr !== undefined) {
            var str = str.replace('$', replaceStr);
        }
        tmp.find("span.text").html(str);
        if (okStr !== undefined)
            tmp.find('button.btn-msg-ok span').html(okStr);
        else
            tmp.find('button.btn-msg-ok span').html(m_str.yes);

        if (cancelStr !== undefined)
            tmp.find('button.btn-msg-no span').html(cancelStr);
        else
            tmp.find('button.btn-msg-no span').html(m_str.no);

        $.setCentralPosition(tmp);
        $.lock();
        $.showCover();
        tmp.fadeIn(200, function() {
            tmp.css("display", "block");
        });

        tmp.delegate("button.btn-msg-ok", "click.ok", function(e) {
            e.preventDefault();
            tmp.fadeOut(200, function() {
                tmp.css("display", "none");
            });

            tmp.undelegate("button.btn-msg-ok", "click.ok");
            tmp.undelegate("button.btn-msg-no", "click.no");
            tmp.undelegate(".widget-close.msg-close", "click.close");

            if ($.isFunction(callbackOk)) {
                callbackOk();
            }
        });
        tmp.delegate("button.btn-msg-no", "click.no", function(e) {
            e.preventDefault();

            tmp.undelegate("button.btn-msg-ok", "click.ok");
            tmp.undelegate("button.btn-msg-no", "click.no");
            tmp.undelegate(".widget-close.msg-close", "click.close");

            if ($.isFunction(callbackNo)) {
                callbackNo();
            }
        });
        tmp.delegate(".widget-close.msg-close", "click.close", function(e) {
            e.preventDefault();

            tmp.undelegate("button.btn-msg-ok", "click.ok");
            tmp.undelegate("button.btn-msg-no", "click.no");
            tmp.undelegate(".widget-close.msg-close", "click.close");

            if ($.isFunction(callbackNo)) {
                callbackNo();
            }
        })
    }
});
