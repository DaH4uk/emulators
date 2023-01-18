function indexOf(arr, obj, from) {
    for (is.number(from) || (from = 0), 0 > from && (from += arr.length); from < arr.length; from++)
        if (from in arr && arr[from] === obj) return from;
    return -1
}

function debug() {
    window.console && console.log && console.log.apply && console.log.apply(console, arguments)
}

function context(__context) {
    var co = {
        callback: function(method) {
            var cb = function() {
                return method.apply(__context, arguments)
            };
            return method ? cb : null
        }
    };
    return co
}

function callback(context, callback) {
    var argv = Array.prototype.slice.call(arguments, 2),
        cb = function() {
            return callback.apply(context, argv.length ? argv : arguments)
        };
    return callback ? cb : null
}

function callbackEx(context, callback) {
    var argv = Array.prototype.slice.call(arguments, 2),
        cb = function() {
            return callback.apply(context, Array.prototype.slice.call(arguments).concat(argv))
        };
    return callback ? cb : null
}

function extend(child, parent) {
    var F = function() {};
    F.prototype = parent.prototype, child.prototype = new F, child.prototype.constructor = child, child.superclass = parent.prototype, child.prototype.getAncestry = function() {
        var arr = child.superclass.getAncestry();
        return arr.push(child), arr
    }, parent.superclass || (parent.prototype.getAncestry = function() {
        return [parent]
    })
}

function copy(obj) {
    return is.array(obj) ? $.extend(!0, [], obj) : $.extend(!0, {}, obj)
}

function diff(__old, __new) {
    var __diff = copy(__new);
    for (var attr in __diff)
        if (__old.hasOwnProperty(attr) && typeof __diff[attr] == typeof __old[attr])
            if (is.object(__diff[attr])) {
                if (is.array(__diff[attr]) && is.array(__diff[attr])) {
                    is.equal(__diff[attr], __old[attr]) && delete __diff[attr];
                    continue
                }
                __diff[attr] = arguments.callee.call(this, __old[attr], __new[attr]), is.empty(__diff[attr]) && delete __diff[attr]
            }
            else __diff[attr] === __old[attr] && delete __diff[attr];
    return __diff
}

function escape(obj) {
    function ESCAPE(str) {
        return encodeURIComponent(str).replace(/\'/g, "%27")
    }
    if (is.string(obj)) return ESCAPE(obj);
    if (is.set(obj) && is.object(obj)) {
        var temp = copy(obj);
        for (var key in temp) key && (temp[key] = arguments.callee.call(this, temp[key]));
        return temp
    }
    return obj
}

function setCookie(name, value, expires, measure) {
    if (expires) switch (measure) {
        case "min":
            expires = 1e3 * expires * 60;
            break;
        case "hour":
            expires = 1e3 * expires * 3600;
            break;
        default:
            expires = 1e3 * expires * 3600 * 24
    }
    document.cookie = name + "=" + escape(value) + (expires ? ";expires=" + new Date((new Date).getTime() + expires).toGMTString() : "")
}

function deleteCookie(name) {
    setCookie(name, "", -30)
}

function getCookie(name) {
    return document.cookie.length > 0 && (c_start = document.cookie.indexOf(name + "="), -1 != c_start) ? (c_start = c_start + name.length + 1, c_end = document.cookie.indexOf(";", c_start), -1 == c_end && (c_end = document.cookie.length), unescape(document.cookie.substring(c_start, c_end))) : ""
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

function replaceCustom(text) {
    var text = text ? text.toString() : "",
        arrReg = window.words_to_replace || [];
    for (var i in arrReg) text = text.replace(arrReg[i].regexp, arrReg[i].newstr);
    return text
}

function lng(key) {
    var lang = window.lang || {},
        baselang = window.baselang || {},
        text = lang[key] || baselang[key] || (key ? key.toString() : "");
    return replaceCustom(text)
}

function translate(parent) {
    is.unset(parent) && (parent = "body"), is.jquery(parent) || (parent = $(parent)), parent.find("[langkey]").each(function(index, elem) {
        var term = lng($(elem).attr("langkey"));
        is.set($(elem).attr("tip")) ? $(elem).attr("tip", term) : $(elem).is(":input") ? $(elem).attr("value", term) : $(elem).html(term)
    })
}

function basename(path) {
    return path.replace(/\\/g, "/").replace(new RegExp(".*/", "g"), "")
}

function dirname(path) {
    return path.replace(/\\/g, "/").replace(new RegExp("/[^/]*$", "g"), "")
}

function lookSize(size) {
    var metric = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = 0;
    for (size = new Number(size); size >= 1024 && i < metric.length - 1;) size /= 1024, i++;
    return {
        value: size > 0 ? size.toFixed(2) : "0.00",
        metric: size > 0 ? metric[i] : metric[0],
        toString: function() {
            return this.value + " " + lng(this.metric)
        }
    }
}

function lookSpeed(speed) {
    var metric = ["b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"],
        i = 0;
    for (speed = new Number(speed), speed *= 8; speed >= 1024 && i < metric.length - 1;) speed /= 1024, i++;
    return {
        value: speed > 0 ? speed.toFixed(2) : "0.00",
        metric: speed > 0 ? metric[i] : metric[0],
        toString: function() {
            return this.value + " " + lng(this.metric) + "/" + lng("S")
        }
    }
}

function lookTime(time) {
    var t = {
        D: null,
        H: null,
        M: null,
        S: time,
        toString: function() {
            var r = "";
            return this.D && (r += this.D + lng("D") + " "), this.H && (r += this.H + lng("H") + " "), this.M && (r += this.M + lng("M") + " "), this.S >= 0 && (r += this.S + lng("S")), r
        }
    };
    return t.S >= 60 && (t.M = Math.floor(t.S / 60), t.S = t.S - 60 * t.M), t.M >= 60 && (t.H = Math.floor(t.M / 60), t.M = t.M - 60 * t.H), t.H >= 24 && (t.D = Math.floor(t.H / 24), t.H = t.H - 24 * t.D), t
}

function argSchema(argArr) {
    this.checkin = function() {
        function check(type, arg) {
            if (is.unset(arg)) return !0;
            switch (type) {
                case "string":
                    if (!is.string(arg)) return !1;
                    this[name] = arg;
                    break;
                case "number":
                    if (!is.number(arg)) return !1;
                    this[name] = arg;
                    break;
                case "bool":
                    if (!is.bool(arg)) return !1;
                    this[name] = arg;
                    break;
                case "object":
                    if (!is.object(arg)) return !1;
                    this[name] = arg;
                    break;
                case "function":
                    if (!is.func(arg)) return !1;
                    this[name] = arg;
                    break;
                case "array":
                    if (!is.array(arg)) return !1;
                    this[name] = arg
            }
            return !0
        }
        for (var arr, qual, type, name, i = 0, j = 0; i < arguments.length; i++)
            if (arr = arguments[i].split(" "), qual = type = name = null, 3 == arr.length ? (qual = arr[0], type = arr[1], name = arr[2]) : 2 == arr.length && (type = arr[0], name = arr[1]), delete this[name], "opt" == qual) check.call(this, type, argArr[j]) && j++;
            else {
                if (!check.call(this, type, argArr[j])) return !1;
                j++
            }
        return !0
    }
}
window.INIT_SCRIPT = !0, Object.keys || (Object.keys = function(obj) {
    var keys = new Array;
    for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && keys.push(key);
    return keys
});
var is = function(type, obj) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]"
};
is.set = function(obj) {
    return void 0 != obj && null != obj
}, is.unset = function(obj) {
    return !this.set(obj)
}, is.string = function(obj) {
    return "string" == typeof obj || obj instanceof String
}, is.number = function(obj) {
    return "number" == typeof obj || obj instanceof Number
}, is.bool = function(obj) {
    return "boolean" == typeof obj || obj instanceof Boolean
}, is.object = function(obj) {
    return "object" == typeof obj
}, is.array = function(obj) {
    return obj instanceof Array
}, is.func = function(obj) {
    return obj instanceof Function
}, is.empty = function(obj) {
    return this.set(obj) && 0 === Object.keys(obj).length
}, is.equal = function(obj1, obj2) {
    return !(obj2 > obj1 || obj1 > obj2)
}, is.jquery = function(obj) {
    return obj instanceof jQuery
}, is.IPv4 = function(obj) {
    var re = new RegExp("^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\.([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");
    return re.test(obj)
}, is.IPv6 = function(obj) {
    var re = new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/);
    return re.test(obj)
}, is.domain = function(obj) {
    var host = obj;
    if (host.length) {
        host = host.replace(/(^\s+|\s+$)/g, "");
        var dot = host.lastIndexOf("."),
            dname = host.substring(0, dot),
            ext = host.substring(dot + 1, host.length);
        if (ext.length - 1 < 1 || ext.length > 6) return !1;
        if (2 > dot || dot > 63) return !1;
        var ln = dname.length - 1;
        if ("-" == dname[0] || "-" == dname[ln]) return !1;
        for (var labels = dname.split("."), pat = /^[\wа-яА-Я-]+$/, j = 0; j < labels.length; j++)
            if (!pat.test(labels[j])) return !1;
        var pat_ext = /^[\wа-яА-Я][^0-9-]+$/;
        if (!pat_ext.test(ext)) return !1
    }
    return !0
}, is.cross = function(obj1, obj2) {
    return obj1 = $(obj1), obj2 = $(obj2), obj1.is(":visible") && obj2.is(":visible") && obj1.offset().left > obj2.offset().left && obj1.offset().top > obj2.offset().top && obj1.offset().left < obj2.offset().left + obj2.width() && obj1.offset().top < obj2.offset().top + obj2.height()
}, is.port = function(val) {
    var patt = /^[0-9]*$/;
    if (val = val.match(/\S+/)[0], !patt.test(val)) return !1;
    var num = new Number(val);
    return 1 > num ? !1 : num > 65535 ? !1 : !0
}, is.mac = function(mac) {
    var re = /^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/;
    return re.test(mac)
}, String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}, window.gID = new function() {
    var N = 0;
    this.get = function() {
        return "object" + N++
    }
};
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i)
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i)
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i)
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i)
    },
    any: function() {
        return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()
    }
};
jQuery.fn.isRendered = function() {
    var id = this.attr("id");
    if (is.set(id) && id.length) return $("#" + id).length ? !0 : !1;
    this.attr("id", gID.get());
    var res = $("#" + this.attr("id")).length ? !0 : !1;
    return this.attr("id", ""), res
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
        for (var target = null, i = 0; !target && i < $$.list.length; i++) $$.list[i] == e.target && (target = $($$.list[i]));
        for (var i = 0; !target && i < $$.list.length; i++) $($$.list[i]).has(e.target).length && (target = $($$.list[i]));
        if (target) {
            var tPos = target.offset(),
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