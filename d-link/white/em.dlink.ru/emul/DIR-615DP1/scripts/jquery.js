! function(a, b) {
    function cy(a) {
        return f.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    function cu(a) {
        if (!cj[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove(), ("none" === e || "" === e) && (ck || (ck = c.createElement("iframe"), ck.frameBorder = ck.width = ck.height = 0), b.appendChild(ck), cl && ck.createElement || (cl = (ck.contentWindow || ck.contentDocument).document, cl.write((f.support.boxModel ? "<!doctype html>" : "") + "<html><body>"), cl.close()), d = cl.createElement(a), cl.body.appendChild(d), e = f.css(d, "display"), b.removeChild(ck)), cj[a] = e
        }
        return cj[a]
    }

    function ct(a, b) {
        var c = {};
        return f.each(cp.concat.apply([], cp.slice(0, b)), function() {
            c[this] = a
        }), c
    }

    function cs() {
        cq = b
    }

    function cr() {
        return setTimeout(cs, 0), cq = f.now()
    }

    function ci() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        }
        catch (b) {}
    }

    function ch() {
        try {
            return new a.XMLHttpRequest
        }
        catch (b) {}
    }

    function cb(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var g, h, j, l, m, n, o, p, d = a.dataTypes,
            e = {},
            i = d.length,
            k = d[0];
        for (g = 1; i > g; g++) {
            if (1 === g)
                for (h in a.converters) "string" == typeof h && (e[h.toLowerCase()] = a.converters[h]);
            if (l = k, k = d[g], "*" === k) k = l;
            else if ("*" !== l && l !== k) {
                if (m = l + " " + k, n = e[m] || e["* " + k], !n) {
                    p = b;
                    for (o in e)
                        if (j = o.split(" "), (j[0] === l || "*" === j[0]) && (p = e[j[1] + " " + k])) {
                            o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                            break
                        }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ca(a, c, d) {
        var h, i, j, k, e = a.contents,
            f = a.dataTypes,
            g = a.responseFields;
        for (i in g) i in d && (c[g[i]] = d[i]);
        for (;
            "*" === f[0];) f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        }
        return j ? (j !== f[0] && f.unshift(j), d[j]) : void 0
    }

    function b_(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || bD.test(a) ? d(a, e) : b_(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== f.type(b)) d(a, b);
        else
            for (var e in b) b_(a + "[" + e + "]", b[e], c, d)
    }

    function b$(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function bZ(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        for (var l, h = a[f], i = 0, j = h ? h.length : 0, k = a === bS; j > i && (k || !l); i++) l = h[i](c, d, e), "string" == typeof l && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = bZ(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = bZ(a, c, d, e, "*", g)), l
    }

    function bY(a) {
        return function(b, c) {
            if ("string" != typeof b && (c = b, b = "*"), f.isFunction(c))
                for (var h, i, j, d = b.toLowerCase().split(bO), e = 0, g = d.length; g > e; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
        }
    }

    function bB(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight,
            e = "width" === b ? 1 : 0,
            g = 4;
        if (d > 0) {
            if ("border" !== c)
                for (; g > e; e += 2) c || (d -= parseFloat(f.css(a, "padding" + bx[e])) || 0), "margin" === c ? d += parseFloat(f.css(a, c + bx[e])) || 0 : d -= parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0;
            return d + "px"
        }
        if (d = by(a, b), (0 > d || null == d) && (d = a.style[b]), bt.test(d)) return d;
        if (d = parseFloat(d) || 0, c)
            for (; g > e; e += 2) d += parseFloat(f.css(a, "padding" + bx[e])) || 0, "padding" !== c && (d += parseFloat(f.css(a, "border" + bx[e] + "Width")) || 0), "margin" === c && (d += parseFloat(f.css(a, c + bx[e])) || 0);
        return d + "px"
    }

    function bo(a) {
        var b = c.createElement("div");
        return bh.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
    }

    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        "input" === b ? bm(a) : "script" !== b && "undefined" != typeof a.getElementsByTagName && f.grep(a.getElementsByTagName("input"), bm)
    }

    function bm(a) {
        ("checkbox" === a.type || "radio" === a.type) && (a.defaultChecked = a.checked)
    }

    function bl(a) {
        return "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function bk(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), "object" === c ? b.outerHTML = a.outerHTML : "input" !== c || "checkbox" !== a.type && "radio" !== a.type ? "option" === c ? b.selected = a.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = a.defaultValue : "script" === c && b.text !== a.text && (b.text = a.text) : (a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value)), b.removeAttribute(f.expando), b.removeAttribute("_submit_attached"), b.removeAttribute("_change_attached"))
    }

    function bj(a, b) {
        if (1 === b.nodeType && f.hasData(a)) {
            var c, d, e, g = f._data(a),
                h = f._data(b, g),
                i = g.events;
            if (i) {
                delete h.handle, h.events = {};
                for (c in i)
                    for (d = 0, e = i[c].length; e > d; d++) f.event.add(b, c, i[c][d])
            }
            h.data && (h.data = f.extend({}, h.data))
        }
    }

    function bi(a) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;) c.createElement(b.pop());
        return c
    }

    function T(a, b, c) {
        if (b = b || 0, f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function(a) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = f.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function(a) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function S(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function K() {
        return !0
    }

    function J() {
        return !1
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        !(!h || "queue" !== c && f._data(a, e) || "mark" !== c && f._data(a, g) || !setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0))
    }

    function m(a) {
        for (var b in a)
            if (("data" !== b || !f.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function l(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : f.isNumeric(d) ? +d : j.test(d) ? f.parseJSON(d) : d
                }
                catch (g) {}
                f.data(a, c, d)
            }
            else d = b
        }
        return d
    }

    function h(a) {
        var c, d, b = g[a] = {};
        for (a = a.split(/\s+/), c = 0, d = a.length; d > c; c++) b[a[c]] = !0;
        return b
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function() {
            function J() {
                if (!e.isReady) {
                    try {
                        c.documentElement.doScroll("left")
                    }
                    catch (a) {
                        return void setTimeout(J, 1)
                    }
                    e.ready()
                }
            }
            var h, z, A, B, e = function(a, b) {
                    return new e.fn.init(a, b, h)
                },
                f = a.jQuery,
                g = a.$,
                i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/gi,
                w = /^-ms-/,
                x = function(a, b) {
                    return (b + "").toUpperCase()
                },
                y = d.userAgent,
                C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            return e.fn = e.prototype = {
                constructor: e,
                init: function(a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                    if ("body" === a && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                    if ("string" == typeof a) {
                        if (g = "<" !== a.charAt(0) || ">" !== a.charAt(a.length - 1) || a.length < 3 ? i.exec(a) : [null, a, null], g && (g[1] || !d)) {
                            if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                            if (h = c.getElementById(g[2]), h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            return this.context = c, this.selector = a, this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this))
                },
                selector: "",
                jquery: "1.7.2",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return F.call(this, 0)
                },
                get: function(a) {
                    return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
                },
                pushStack: function(a, b, c) {
                    var d = this.constructor();
                    return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
                },
                each: function(a, b) {
                    return e.each(this, a, b)
                },
                ready: function(a) {
                    return e.bindReady(), A.add(a), this
                },
                eq: function(a) {
                    return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function(a) {
                    return this.pushStack(e.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
                var a, c, d, f, g, h, i = arguments[0] || {},
                    j = 1,
                    k = arguments.length,
                    l = !1;
                for ("boolean" == typeof i && (l = i, i = arguments[1] || {}, j = 2), "object" != typeof i && !e.isFunction(i) && (i = {}), k === j && (i = this, --j); k > j; j++)
                    if (null != (a = arguments[j]))
                        for (c in a) d = i[c], f = a[c], i !== f && (l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f));
                return i
            }, e.extend({
                noConflict: function(b) {
                    return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        if (e.isReady = !0, a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function() {
                    if (!A) {
                        if (A = e.Callbacks("once memory"), "complete" === c.readyState) return setTimeout(e.ready, 1);
                        if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                        else if (c.attachEvent) {
                            c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                            var b = !1;
                            try {
                                b = null == a.frameElement
                            }
                            catch (d) {}
                            c.documentElement.doScroll && b && J()
                        }
                    }
                },
                isFunction: function(a) {
                    return "function" === e.type(a)
                },
                isArray: Array.isArray || function(a) {
                    return "array" === e.type(a)
                },
                isWindow: function(a) {
                    return null != a && a == a.window
                },
                isNumeric: function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function(a) {
                    return null == a ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function(a) {
                    if (!a || "object" !== e.type(a) || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    }
                    catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function(a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function(a) {
                    throw new Error(a)
                },
                parseJSON: function(b) {
                    return "string" == typeof b && b ? (b = e.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : n.test(b.replace(o, "@").replace(p, "]").replace(q, "")) ? new Function("return " + b)() : void e.error("Invalid JSON: " + b)) : null
                },
                parseXML: function(c) {
                    if ("string" != typeof c || !c) return null;
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    }
                    catch (g) {
                        d = b
                    }
                    return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d
                },
                noop: function() {},
                globalEval: function(b) {
                    b && j.test(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function(a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function(a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d)
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        }
                        else
                            for (; h > g && c.apply(a[g++], d) !== !1;);
                    else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    }
                    else
                        for (; h > g && c.call(a[g], g, a[g++]) !== !1;);
                    return a
                },
                trim: G ? function(a) {
                    return null == a ? "" : G.call(a)
                } : function(a) {
                    return null == a ? "" : (a + "").replace(k, "").replace(l, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    if (null != a) {
                        var d = e.type(a);
                        null == a.length || "string" === d || "function" === d || "regexp" === d || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function(a, c) {
                    var d = a.length,
                        e = 0;
                    if ("number" == typeof c.length)
                        for (var f = c.length; f > e; e++) a[d++] = c[e];
                    else
                        for (; c[e] !== b;) a[d++] = c[e++];
                    return a.length = d, a
                },
                grep: function(a, b, c) {
                    var e, d = [];
                    c = !!c;
                    for (var f = 0, g = a.length; g > f; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function(a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && "number" == typeof j && (j > 0 && a[0] && a[j - 1] || 0 === j || e.isArray(a));
                    if (k)
                        for (; j > i; i++) f = c(a[i], i, d), null != f && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), null != f && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function(a, c) {
                    if ("string" == typeof c) {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function() {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    return g.guid = a.guid = a.guid || g.guid || e.guid++, g
                },
                access: function(a, c, d, f, g, h, i) {
                    var j, k = null == d,
                        l = 0,
                        m = a.length;
                    if (d && "object" == typeof d) {
                        for (l in d) e.access(a, c, l, d[l], 1, h, f);
                        g = 1
                    }
                    else if (f !== b) {
                        if (j = i === b && e.isFunction(f), k && (j ? (j = c, c = function(a, b, c) {
                                return j.call(e(a), c)
                            }) : (c.call(a, f), c = null)), c)
                            for (; m > l; l++) c(a[l], d, j ? f.call(a[l], l, c(a[l], d)) : f, i);
                        g = 1
                    }
                    return g ? a : k ? c.call(a) : m ? c(a[0], d) : h
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
                        return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function() {
                "complete" === c.readyState && (c.detachEvent("onreadystatechange", B), e.ready())
            }), e
        }(),
        g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var e, i, j, k, l, m, c = [],
            d = [],
            n = function(b) {
                var d, e, g, h;
                for (d = 0, e = b.length; e > d; d++) g = b[d], h = f.type(g), "array" === h ? n(g) : "function" === h && (!a.unique || !p.has(g)) && c.push(g)
            },
            o = function(b, f) {
                for (f = f || [], e = !a.memory || [b, f], i = !0, j = !0, m = k || 0, k = 0, l = c.length; c && l > m; m++)
                    if (c[m].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                j = !1, c && (a.once ? e === !0 ? p.disable() : c = [] : d && d.length && (e = d.shift(), p.fireWith(e[0], e[1])))
            },
            p = {
                add: function() {
                    if (c) {
                        var a = c.length;
                        n(arguments), j ? l = c.length : e && e !== !0 && (k = a, o(e[0], e[1]))
                    }
                    return this
                },
                remove: function() {
                    if (c)
                        for (var b = arguments, d = 0, e = b.length; e > d; d++)
                            for (var f = 0; f < c.length && (b[d] !== c[f] || (j && l >= f && (l--, m >= f && m--), c.splice(f--, 1), !a.unique)); f++);
                    return this
                },
                has: function(a) {
                    if (c)
                        for (var b = 0, d = c.length; d > b; b++)
                            if (a === c[b]) return !0;
                    return !1
                },
                empty: function() {
                    return c = [], this
                },
                disable: function() {
                    return c = d = e = b, this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return d = b, (!e || e === !0) && p.disable(), this
                },
                locked: function() {
                    return !d
                },
                fireWith: function(b, c) {
                    return d && (j ? a.once || d.push([b, c]) : (!a.once || !e) && o(b, c)), this
                },
                fire: function() {
                    return p.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!i
                }
            };
        return p
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var j, b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                },
                h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function() {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function(a, b, c) {
                        return i.done(a).fail(b).progress(c), this
                    },
                    always: function() {
                        return i.done.apply(i, arguments).fail.apply(i, arguments), this
                    },
                    pipe: function(a, b, c) {
                        return f.Deferred(function(d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function(a, b) {
                                var g, c = b[0],
                                    e = b[1];
                                i[a](f.isFunction(c) ? function() {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                } : d[e])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (null == a) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                },
                i = h.promise({});
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function() {
                e = "resolved"
            }, c.disable, d.lock).fail(function() {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i), i
        },
        when: function(a) {
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }

            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = Array(d),
                g = d,
                j = 1 >= d && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; d > c; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            }
            else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function() {
        {
            var b, d, e, g, h, i, j, k, m, n, o, p = c.createElement("div");
            c.documentElement
        }
        if (p.setAttribute("className", "t"), p.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = p.getElementsByTagName("*"), e = p.getElementsByTagName("a")[0], !d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = p.getElementsByTagName("input")[0], b = {
            leadingWhitespace: 3 === p.firstChild.nodeType,
            tbody: !p.getElementsByTagName("tbody").length,
            htmlSerialize: !!p.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: "/a" === e.getAttribute("href"),
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: "on" === i.value,
            optSelected: h.selected,
            getSetAttribute: "t" !== p.className,
            enctype: !!c.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== c.createElement("nav").cloneNode(!0).outerHTML,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            pixelMargin: !0
        }, f.boxModel = b.boxModel = "CSS1Compat" === c.compatMode, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete p.test
        }
        catch (r) {
            b.deleteExpando = !1
        }
        if (!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", function() {
                b.noCloneEvent = !1
            }), p.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = "t" === i.value, i.setAttribute("checked", "checked"), i.setAttribute("name", "t"), p.appendChild(i), j = c.createDocumentFragment(), j.appendChild(p.lastChild), b.checkClone = j.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, j.removeChild(i), j.appendChild(p), p.attachEvent)
            for (n in {
                    submit: 1,
                    change: 1,
                    focusin: 1
                }) m = "on" + n, o = m in p, o || (p.setAttribute(m, "return;"), o = "function" == typeof p[m]), b[n + "Bubbles"] = o;
        return j.removeChild(p), j = g = h = p = i = null, f(function() {
            var d, e, g, i, j, l, m, n, q, r, s, t, u = c.getElementsByTagName("body")[0];
            !u || (m = 1, t = "padding:0;margin:0;border:", r = "position:absolute;top:0;left:0;width:1px;height:1px;", s = t + "0;visibility:hidden;", n = "style='" + r + t + "5px solid #000;", q = "<div " + n + "display:block;'><div style='" + t + "0;display:block;overflow:hidden;'></div></div><table " + n + "' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>", d = c.createElement("div"), d.style.cssText = s + "width:0;height:0;position:static;top:0;margin-top:" + m + "px", u.insertBefore(d, u.firstChild), p = c.createElement("div"), d.appendChild(p), p.innerHTML = "<table><tr><td style='" + t + "0;display:none'></td><td>t</td></tr></table>", k = p.getElementsByTagName("td"), o = 0 === k[0].offsetHeight, k[0].style.display = "", k[1].style.display = "none", b.reliableHiddenOffsets = o && 0 === k[0].offsetHeight, a.getComputedStyle && (p.innerHTML = "", l = c.createElement("div"), l.style.width = "0", l.style.marginRight = "0", p.style.width = "2px", p.appendChild(l), b.reliableMarginRight = 0 === (parseInt((a.getComputedStyle(l, null) || {
                marginRight: 0
            }).marginRight, 10) || 0)), "undefined" != typeof p.style.zoom && (p.innerHTML = "", p.style.width = p.style.padding = "1px", p.style.border = 0, p.style.overflow = "hidden", p.style.display = "inline", p.style.zoom = 1, b.inlineBlockNeedsLayout = 3 === p.offsetWidth, p.style.display = "block", p.style.overflow = "visible", p.innerHTML = "<div style='width:5px;'></div>", b.shrinkWrapBlocks = 3 !== p.offsetWidth), p.style.cssText = r + s, p.innerHTML = q, e = p.firstChild, g = e.firstChild, i = e.nextSibling.firstChild.firstChild, j = {
                doesNotAddBorder: 5 !== g.offsetTop,
                doesAddBorderForTableAndCells: 5 === i.offsetTop
            }, g.style.position = "fixed", g.style.top = "20px", j.fixedPosition = 20 === g.offsetTop || 15 === g.offsetTop, g.style.position = g.style.top = "", e.style.overflow = "hidden", e.style.position = "relative", j.subtractsBorderForOverflowNotVisible = -5 === g.offsetTop, j.doesNotIncludeMarginInBodyOffset = u.offsetTop !== m, a.getComputedStyle && (p.style.marginTop = "1%", b.pixelMargin = "1%" !== (a.getComputedStyle(p, null) || {
                marginTop: 0
            }).marginTop), "undefined" != typeof d.style.zoom && (d.style.zoom = 1), u.removeChild(d), l = p = d = null, f.extend(b, j))
        }), b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !!a && !m(a)
        },
        data: function(a, c, d, e) {
            if (f.acceptData(a)) {
                var g, h, i, j = f.expando,
                    k = "string" == typeof c,
                    l = a.nodeType,
                    m = l ? f.cache : a,
                    n = l ? a[j] : a[j] && j,
                    o = "events" === c;
                if (!(n && m[n] && (o || e || m[n].data) || !k || d !== b)) return;
                return n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop)), ("object" == typeof c || "function" == typeof c) && (e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c)), g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], null == i && (i = h[f.camelCase(c)])) : i = h, i)
            }
        },
        removeData: function(a, b, c) {
            if (f.acceptData(a)) {
                var d, e, g, h = f.expando,
                    i = a.nodeType,
                    j = i ? f.cache : a,
                    k = i ? a[h] : h;
                if (!j[k]) return;
                if (b && (d = c ? j[k] : j[k].data)) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b = b in d ? [b] : b.split(" ")));
                    for (e = 0, g = b.length; g > e; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return
                }
                if (!c && (delete j[k].data, !m(j[k]))) return;
                f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
            }
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h, i, j = this[0],
                k = 0,
                m = null;
            if (a === b) {
                if (this.length && (m = f.data(j), 1 === j.nodeType && !f._data(j, "parsedAttrs"))) {
                    for (g = j.attributes, i = g.length; i > k; k++) h = g[k].name, 0 === h.indexOf("data-") && (h = f.camelCase(h.substring(5)), l(j, h, m[h]));
                    f._data(j, "parsedAttrs", !0)
                }
                return m
            }
            return "object" == typeof a ? this.each(function() {
                f.data(this, a)
            }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", f.access(this, function(c) {
                return c === b ? (m = this.triggerHandler("getData" + e, [d[0]]), m === b && j && (m = f.data(j, a), m = l(j, a, m)), m === b && d[1] ? this.data(d[0]) : m) : (d[1] = c, void this.each(function() {
                    var b = f(this);
                    b.triggerHandler("setData" + e, d), f.data(this, a, c), b.triggerHandler("changeData" + e, d)
                }))
            }, null, c, arguments.length > 1, null, !1))
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, c) {
            if (a !== !0 && (c = b, b = a, a = !1), b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            "inprogress" === d && (d = c.shift()), d && ("fx" === b && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function(a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? f.queue(this[0], a) : c === b ? this : this.each(function() {
                var b = f.queue(this, a, c);
                "fx" === a && "inprogress" !== b[0] && f.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            "string" != typeof a && (c = a, a = b), a = a || "fx";
            for (var l, d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark"; g--;)(l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) && (h++, l.add(m));
            return m(), d.promise(c)
        }
    });
    var w, x, y, o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, f.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return f.access(this, f.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = f.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                }
                catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a)
                for (b = a.split(p), c = 0, d = this.length; d > c; c++)
                    if (e = this[c], 1 === e.nodeType)
                        if (e.className || 1 !== b.length) {
                            for (g = " " + e.className + " ", h = 0, i = b.length; i > h; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                        else e.className = a;
            return this
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a || a === b)
                for (c = (a || "").split(p), d = 0, e = this.length; e > d; d++)
                    if (g = this[d], 1 === g.nodeType && g.className)
                        if (a) {
                            for (h = (" " + g.className + " ").replace(o, " "), i = 0, j = c.length; j > i; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        }
                        else g.className = "";
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                d = "boolean" == typeof b;
            return this.each(f.isFunction(a) ? function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c)
                    for (var e, g = 0, h = f(this), i = b, j = a.split(p); e = j[g++];) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
                else("undefined" === c || "boolean" === c) && (this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, g = this[0];
            return arguments.length ? (e = f.isFunction(a), this.each(function(d) {
                var h, g = f(this);
                1 === this.nodeType && (h = e ? a.call(this, d, g.val()) : a, null == h ? h = "" : "number" == typeof h ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                    return null == a ? "" : a + ""
                })), c = f.valHooks[this.type] || f.valHooks[this.nodeName.toLowerCase()], c && "set" in c && c.set(this, h, "value") !== b || (this.value = h))
            })) : g ? (c = f.valHooks[g.type] || f.valHooks[g.nodeName.toLowerCase()], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, "string" == typeof d ? d.replace(q, "") : null == d ? "" : d)) : void 0
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = "select-one" === a.type;
                    if (0 > g) return null;
                    for (c = j ? g : 0, d = j ? g + 1 : i.length; d > c; c++)
                        if (e = i[c], !(!e.selected || (f.support.optDisabled ? e.disabled : null !== e.getAttribute("disabled")) || e.parentNode.disabled && f.nodeName(e.parentNode, "optgroup"))) {
                            if (b = f(e).val(), j) return b;
                            h.push(b)
                        }
                    return j && !h.length && i.length ? f(i[g]).val() : h
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            return a && 3 !== j && 8 !== j && 2 !== j ? e && c in f.attrFn ? f(a)[c](d) : "undefined" == typeof a.getAttribute ? f.prop(a, c, d) : (i = 1 !== j || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w)), d !== b ? null === d ? void f.removeAttr(a, c) : h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d) : h && "get" in h && i && null !== (g = h.get(a, c)) ? g : (g = a.getAttribute(c), null === g ? b : g)) : void 0
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h, i = 0;
            if (b && 1 === a.nodeType)
                for (d = b.toLowerCase().split(p), g = d.length; g > i; i++) e = d[i], e && (c = f.propFix[e] || e, h = u.test(e), h || f.attr(a, e, ""), a.removeAttribute(v ? e : c), h && c in a && (a[c] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && "radio" === b && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, c) {
                    return w && f.nodeName(a, "button") ? w.set(a, b, c) : void(a.value = b)
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            return a && 3 !== i && 8 !== i && 2 !== i ? (h = 1 !== i || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && null !== (e = g.get(a, c)) ? e : a[c]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, v || (y = {
        name: !0,
        id: !0,
        coords: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? "" !== d.nodeValue : d.specified) ? d.nodeValue : b
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            "" === b && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return null === d ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                return f.isArray(b) ? a.checked = f.inArray(f(a).val(), b) >= 0 : void 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /(?:^|\s)hover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function(a) {
            var b = F.exec(a);
            return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
        },
        H = function(a, b) {
            var c = a.attributes || {};
            return !(b[1] && a.nodeName.toLowerCase() !== b[1] || b[2] && (c.id || {}).value !== b[2] || b[3] && !b[3].test((c["class"] || {}).value))
        },
        I = function(a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
            add: function(a, c, d, e, g) {
                var h, i, j, k, l, m, n, o, p, r, s;
                if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (h = f._data(a))) {
                    for (d.handler && (p = d, d = p.handler, g = p.selector), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                            return "undefined" == typeof f || a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments)
                        }, i.elem = a), c = f.trim(I(c)).split(" "), k = 0; k < c.length; k++) l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                        type: m,
                        origType: l[1],
                        data: e,
                        handler: d,
                        guid: d.guid,
                        selector: g,
                        quick: g && G(g),
                        namespace: n.join(".")
                    }, p), r = j[m], r || (r = j[m] = [], r.delegateCount = 0, s.setup && s.setup.call(a, e, n, i) !== !1 || (a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i))), s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
                    a = null
                }
            },
            global: {},
            remove: function(a, b, c, d, e) {
                var h, i, j, k, l, m, n, o, p, q, r, s, g = f.hasData(a) && f._data(a);
                if (g && (o = g.events)) {
                    for (b = f.trim(I(b || "")).split(" "), h = 0; h < b.length; h++)
                        if (i = A.exec(b[h]) || [], j = k = i[1], l = i[2], j) {
                            for (p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null, n = 0; n < r.length; n++) s = r[n], !(!e && k !== s.origType || c && c.guid !== s.guid || l && !l.test(s.namespace) || d && d !== s.selector && ("**" !== d || !s.selector) || (r.splice(n--, 1), s.selector && r.delegateCount--, !p.remove || !p.remove.call(a, s)));
                            0 === r.length && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
                        }
                        else
                            for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
                }
            },
            customEvent: {
                getData: !0,
                setData: !0,
                changeData: !0
            },
            trigger: function(c, d, e, g) {
                if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                    var j, k, l, m, n, o, p, q, r, s, h = c.type || c,
                        i = [];
                    if (E.test(h + f.event.triggered)) return;
                    if (h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort()), (!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                    if (c = "object" == typeof c ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "", !e) {
                        j = f.cache;
                        for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                        return
                    }
                    if (c.result = b, c.target || (c.target = e), d = null != d ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {}, p.trigger && p.trigger.apply(e, d) === !1) return;
                    if (r = [
                            [e, p.bindType || h]
                        ], !g && !p.noBubble && !f.isWindow(e)) {
                        for (s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null; m; m = m.parentNode) r.push([m, s]), n = m;
                        n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                    }
                    for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                    return c.type = h, !(g || c.isDefaultPrevented() || p._default && p._default.apply(e.ownerDocument, d) !== !1 || "click" === h && f.nodeName(e, "a") || !f.acceptData(e) || !o || !e[h] || ("focus" === h || "blur" === h) && 0 === c.target.offsetWidth || f.isWindow(e) || (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, !n || !(e[o] = n))), c.result
                }
            },
            dispatch: function(c) {
                c = f.event.fix(c || a.event);
                var k, l, m, n, o, p, q, r, s, t, d = (f._data(this, "events") || {})[c.type] || [],
                    e = d.delegateCount,
                    g = [].slice.call(arguments, 0),
                    h = !c.exclusive && !c.namespace,
                    i = f.event.special[c.type] || {},
                    j = [];
                if (g[0] = c, c.delegateTarget = this, !i.preDispatch || i.preDispatch.call(this, c) !== !1) {
                    if (e && (!c.button || "click" !== c.type))
                        for (n = f(this), n.context = this.ownerDocument || this, m = c.target; m != this; m = m.parentNode || this)
                            if (m.disabled !== !0) {
                                for (p = {}, r = [], n[0] = m, k = 0; e > k; k++) s = d[k], t = s.selector, p[t] === b && (p[t] = s.quick ? H(m, s.quick) : n.is(t)), p[t] && r.push(s);
                                r.length && j.push({
                                    elem: m,
                                    matches: r
                                })
                            }
                    for (d.length > e && j.push({
                            elem: this,
                            matches: d.slice(e)
                        }), k = 0; k < j.length && !c.isPropagationStopped(); k++)
                        for (q = j[k], c.currentTarget = q.elem, l = 0; l < q.matches.length && !c.isImmediatePropagationStopped(); l++) s = q.matches[l], (h || !c.namespace && !s.namespace || c.namespace_re && c.namespace_re.test(s.namespace)) && (c.data = s.data, c.handleObj = s, o = ((f.event.special[s.origType] || {}).handle || s.handler).apply(q.elem, g), o !== b && (c.result = o, o === !1 && (c.preventDefault(), c.stopPropagation())));
                    return i.postDispatch && i.postDispatch.call(this, c), c.result
                }
            },
            props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
            fixHooks: {},
            keyHooks: {
                props: "char charCode key keyCode".split(" "),
                filter: function(a, b) {
                    return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
                }
            },
            mouseHooks: {
                props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                filter: function(a, d) {
                    var e, f, g, h = d.button,
                        i = d.fromElement;
                    return null == a.pageX && null != d.clientX && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = 1 & h ? 1 : 2 & h ? 3 : 4 & h ? 2 : 0), a
                }
            },
            fix: function(a) {
                if (a[f.expando]) return a;
                var d, e, g = a,
                    h = f.event.fixHooks[a.type] || {},
                    i = h.props ? this.props.concat(h.props) : this.props;
                for (a = f.Event(g), d = i.length; d;) e = i[--d], a[e] = g[e];
                return a.target || (a.target = g.srcElement || c), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a
            },
            special: {
                ready: {
                    setup: f.bindReady
                },
                load: {
                    noBubble: !0
                },
                focus: {
                    delegateType: "focusin"
                },
                blur: {
                    delegateType: "focusout"
                },
                beforeunload: {
                    setup: function(a, b, c) {
                        f.isWindow(this) && (this.onbeforeunload = c)
                    },
                    teardown: function(a, b) {
                        this.onbeforeunload === b && (this.onbeforeunload = null)
                    }
                }
            },
            simulate: function(a, b, c, d) {
                var e = f.extend(new f.Event, c, {
                    type: a,
                    isSimulated: !0,
                    originalEvent: {}
                });
                d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
            }
        }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
            a.removeEventListener && a.removeEventListener(b, c, !1)
        } : function(a, b, c) {
            a.detachEvent && a.detachEvent("on" + b, c)
        }, f.Event = function(a, b) {
            return this instanceof f.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0, void 0) : new f.Event(a, b)
        }, f.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = K;
                var a = this.originalEvent;
                !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
            },
            stopPropagation: function() {
                this.isPropagationStopped = K;
                var a = this.originalEvent;
                !a || (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = K, this.stopPropagation()
            },
            isDefaultPrevented: J,
            isPropagationStopped: J,
            isImmediatePropagationStopped: J
        }, f.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(a, b) {
            f.event.special[a] = {
                delegateType: b,
                bindType: b,
                handle: function(a) {
                    {
                        var h, c = this,
                            d = a.relatedTarget,
                            e = a.handleObj;
                        e.selector
                    }
                    return (!d || d !== c && !f.contains(c, d)) && (a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b), h
                }
            }
        }), f.support.submitBubbles || (f.event.special.submit = {
            setup: function() {
                return f.nodeName(this, "form") ? !1 : void f.event.add(this, "click._submit keypress._submit", function(a) {
                    var c = a.target,
                        d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                    d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                        a._submit_bubble = !0
                    }), d._submit_attached = !0)
                })
            },
            postDispatch: function(a) {
                a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0))
            },
            teardown: function() {
                return f.nodeName(this, "form") ? !1 : void f.event.remove(this, "._submit")
            }
        }), f.support.changeBubbles || (f.event.special.change = {
            setup: function() {
                return z.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (f.event.add(this, "propertychange._change", function(a) {
                    "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                })), !1) : void f.event.add(this, "beforeactivate._change", function(a) {
                    var b = a.target;
                    z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                        this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                    }), b._change_attached = !0)
                })
            },
            handle: function(a) {
                var b = a.target;
                return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
            },
            teardown: function() {
                return f.event.remove(this, "._change"), z.test(this.nodeName)
            }
        }), f.support.focusinBubbles || f.each({
            focus: "focusin",
            blur: "focusout"
        }, function(a, b) {
            var d = 0,
                e = function(a) {
                    f.event.simulate(b, a.target, f.event.fix(a), !0)
                };
            f.event.special[b] = {
                setup: function() {
                    0 === d++ && c.addEventListener(a, e, !0)
                },
                teardown: function() {
                    0 === --d && c.removeEventListener(a, e, !0)
                }
            }
        }), f.fn.extend({
            on: function(a, c, d, e, g) {
                var h, i;
                if ("object" == typeof a) {
                    "string" != typeof c && (d = d || c, c = b);
                    for (i in a) this.on(i, c, d, a[i], g);
                    return this
                }
                if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = J;
                else if (!e) return this;
                return 1 === g && (h = e, e = function(a) {
                    return f().off(a), h.apply(this, arguments)
                }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function() {
                    f.event.add(this, a, e, d, c)
                })
            },
            one: function(a, b, c, d) {
                return this.on(a, b, c, d, 1)
            },
            off: function(a, c, d) {
                if (a && a.preventDefault && a.handleObj) {
                    var e = a.handleObj;
                    return f(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this
                }
                if ("object" == typeof a) {
                    for (var g in a) this.off(g, c, a[g]);
                    return this
                }
                return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = J), this.each(function() {
                    f.event.remove(this, a, d, c)
                })
            },
            bind: function(a, b, c) {
                return this.on(a, null, b, c)
            },
            unbind: function(a, b) {
                return this.off(a, null, b)
            },
            live: function(a, b, c) {
                return f(this.context).on(a, this.selector, b, c), this
            },
            die: function(a, b) {
                return f(this.context).off(a, this.selector || "**", b), this
            },
            delegate: function(a, b, c, d) {
                return this.on(b, a, c, d)
            },
            undelegate: function(a, b, c) {
                return 1 == arguments.length ? this.off(a, "**") : this.off(b, a, c)
            },
            trigger: function(a, b) {
                return this.each(function() {
                    f.event.trigger(a, b, this)
                })
            },
            triggerHandler: function(a, b) {
                return this[0] ? f.event.trigger(a, b, this[0], !0) : void 0
            },
            toggle: function(a) {
                var b = arguments,
                    c = a.guid || f.guid++,
                    d = 0,
                    e = function(c) {
                        var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                        return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                    };
                for (e.guid = c; d < b.length;) b[d++].guid = c;
                return this.click(e)
            },
            hover: function(a, b) {
                return this.mouseenter(a).mouseleave(b || a)
            }
        }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
            f.fn[b] = function(a, c) {
                return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
            }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
        }),
        function() {
            function x(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; i > h; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        for (j = j[a]; j;) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            if (1 === j.nodeType)
                                if (g || (j[d] = c, j.sizset = h), "string" != typeof b) {
                                    if (j === b) {
                                        k = !0;
                                        break
                                    }
                                }
                                else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }

            function w(a, b, c, e, f, g) {
                for (var h = 0, i = e.length; i > h; h++) {
                    var j = e[h];
                    if (j) {
                        var k = !1;
                        for (j = j[a]; j;) {
                            if (j[d] === c) {
                                k = e[j.sizset];
                                break
                            }
                            if (1 === j.nodeType && !g && (j[d] = c, j.sizset = h), j.nodeName.toLowerCase() === b) {
                                k = j;
                                break
                            }
                            j = j[a]
                        }
                        e[h] = k
                    }
                }
            }
            var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                d = "sizcache" + (Math.random() + "").replace(".", ""),
                e = 0,
                g = Object.prototype.toString,
                h = !1,
                i = !0,
                j = /\\/g,
                k = /\r\n/g,
                l = /\W/;
            [0, 0].sort(function() {
                return i = !1, 0
            });
            var m = function(b, d, e, f) {
                e = e || [], d = d || c;
                var h = d;
                if (1 !== d.nodeType && 9 !== d.nodeType) return [];
                if (!b || "string" != typeof b) return e;
                var i, j, k, l, n, q, r, t, u = !0,
                    v = m.isXML(d),
                    w = [],
                    x = b;
                do
                    if (a.exec(""), i = a.exec(x), i && (x = i[3], w.push(i[1]), i[2])) {
                        l = i[3];
                        break
                    }
                while (i);
                if (w.length > 1 && p.exec(b))
                    if (2 === w.length && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                    else
                        for (j = o.relative[w[0]] ? [d] : m(w.shift(), d); w.length;) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
                else if (!f && w.length > 1 && 9 === d.nodeType && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]), d)
                    for (n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), 1 !== w.length || "~" !== w[0] && "+" !== w[0] || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1; w.length;) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", null == r && (r = d), o.relative[q](k, r, v);
                else k = w = [];
                if (k || (k = j), k || m.error(q || b), "[object Array]" === g.call(k))
                    if (u)
                        if (d && 1 === d.nodeType)
                            for (t = 0; null != k[t]; t++) k[t] && (k[t] === !0 || 1 === k[t].nodeType && m.contains(d, k[t])) && e.push(j[t]);
                        else
                            for (t = 0; null != k[t]; t++) k[t] && 1 === k[t].nodeType && e.push(j[t]);
                else e.push.apply(e, k);
                else s(k, e);
                return l && (m(l, h, e, f), m.uniqueSort(e)), e
            };
            m.uniqueSort = function(a) {
                if (u && (h = i, a.sort(u), h))
                    for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
                return a
            }, m.matches = function(a, b) {
                return m(a, null, null, b)
            }, m.matchesSelector = function(a, b) {
                return m(b, null, null, [a]).length > 0
            }, m.find = function(a, b, c) {
                var d, e, f, g, h, i;
                if (!a) return [];
                for (e = 0, f = o.order.length; f > e; e++)
                    if (h = o.order[e], (g = o.leftMatch[h].exec(a)) && (i = g[1], g.splice(1, 1), "\\" !== i.substr(i.length - 1) && (g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c), null != d))) {
                        a = a.replace(o.match[h], "");
                        break
                    }
                return d || (d = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName("*") : []), {
                    set: d,
                    expr: a
                }
            }, m.filter = function(a, c, d, e) {
                for (var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]); a && c.length;) {
                    for (h in o.filter)
                        if (null != (f = o.leftMatch[h].exec(a)) && f[2]) {
                            if (k = o.filter[h], l = f[1], g = !1, f.splice(1, 1), "\\" === l.substr(l.length - 1)) continue;
                            if (s === r && (r = []), o.preFilter[h])
                                if (f = o.preFilter[h](f, s, d, r, e, t)) {
                                    if (f === !0) continue
                                }
                                else g = i = !0;
                            if (f)
                                for (n = 0; null != (j = s[n]); n++) j && (i = k(j, f, n, s), p = e ^ i, d && null != i ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                            if (i !== b) {
                                if (d || (s = r), a = a.replace(o.match[h], ""), !g) return [];
                                break
                            }
                        }
                    if (a === q) {
                        if (null != g) break;
                        m.error(a)
                    }
                    q = a
                }
                return s
            }, m.error = function(a) {
                throw new Error("Syntax error, unrecognized expression: " + a)
            };
            var n = m.getText = function(a) {
                    var b, c, d = a.nodeType,
                        e = "";
                    if (d) {
                        if (1 === d || 9 === d || 11 === d) {
                            if ("string" == typeof a.textContent) return a.textContent;
                            if ("string" == typeof a.innerText) return a.innerText.replace(k, "");
                            for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                        }
                        else if (3 === d || 4 === d) return a.nodeValue
                    }
                    else
                        for (b = 0; c = a[b]; b++) 8 !== c.nodeType && (e += n(c));
                    return e
                },
                o = m.selectors = {
                    order: ["ID", "NAME", "TAG"],
                    match: {
                        ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                        NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                        ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                        TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                        PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                    },
                    leftMatch: {},
                    attrMap: {
                        "class": "className",
                        "for": "htmlFor"
                    },
                    attrHandle: {
                        href: function(a) {
                            return a.getAttribute("href")
                        },
                        type: function(a) {
                            return a.getAttribute("type")
                        }
                    },
                    relative: {
                        "+": function(a, b) {
                            var c = "string" == typeof b,
                                d = c && !l.test(b),
                                e = c && !d;
                            d && (b = b.toLowerCase());
                            for (var h, f = 0, g = a.length; g > f; f++)
                                if (h = a[f]) {
                                    for (;
                                        (h = h.previousSibling) && 1 !== h.nodeType;);
                                    a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                                }
                            e && m.filter(b, a, !0)
                        },
                        ">": function(a, b) {
                            var c, d = "string" == typeof b,
                                e = 0,
                                f = a.length;
                            if (d && !l.test(b)) {
                                for (b = b.toLowerCase(); f > e; e++)
                                    if (c = a[e]) {
                                        var g = c.parentNode;
                                        a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                    }
                            }
                            else {
                                for (; f > e; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                                d && m.filter(b, a, !0)
                            }
                        },
                        "": function(a, b, c) {
                            var d, f = e++,
                                g = x;
                            "string" == typeof b && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                        },
                        "~": function(a, b, c) {
                            var d, f = e++,
                                g = x;
                            "string" == typeof b && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                        }
                    },
                    find: {
                        ID: function(a, b, c) {
                            if ("undefined" != typeof b.getElementById && !c) {
                                var d = b.getElementById(a[1]);
                                return d && d.parentNode ? [d] : []
                            }
                        },
                        NAME: function(a, b) {
                            if ("undefined" != typeof b.getElementsByName) {
                                for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; f > e; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                                return 0 === c.length ? null : c
                            }
                        },
                        TAG: function(a, b) {
                            return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a[1]) : void 0
                        }
                    },
                    preFilter: {
                        CLASS: function(a, b, c, d, e, f) {
                            if (a = " " + a[1].replace(j, "") + " ", f) return a;
                            for (var h, g = 0; null != (h = b[g]); g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                            return !1
                        },
                        ID: function(a) {
                            return a[1].replace(j, "")
                        },
                        TAG: function(a) {
                            return a[1].replace(j, "").toLowerCase()
                        },
                        CHILD: function(a) {
                            if ("nth" === a[1]) {
                                a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                                var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                                a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                            }
                            else a[2] && m.error(a[0]);
                            return a[0] = e++, a
                        },
                        ATTR: function(a, b, c, d, e, f) {
                            var g = a[1] = a[1].replace(j, "");
                            return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), "~=" === a[2] && (a[4] = " " + a[4] + " "), a
                        },
                        PSEUDO: function(b, c, d, e, f) {
                            if ("not" === b[1]) {
                                if (!((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))) {
                                    var g = m.filter(b[3], c, d, !0 ^ f);
                                    return d || e.push.apply(e, g), !1
                                }
                                b[3] = m(b[3], null, null, c)
                            }
                            else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                            return b
                        },
                        POS: function(a) {
                            return a.unshift(!0), a
                        }
                    },
                    filters: {
                        enabled: function(a) {
                            return a.disabled === !1 && "hidden" !== a.type
                        },
                        disabled: function(a) {
                            return a.disabled === !0
                        },
                        checked: function(a) {
                            return a.checked === !0
                        },
                        selected: function(a) {
                            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                        },
                        parent: function(a) {
                            return !!a.firstChild
                        },
                        empty: function(a) {
                            return !a.firstChild
                        },
                        has: function(a, b, c) {
                            return !!m(c[3], a).length
                        },
                        header: function(a) {
                            return /h\d/i.test(a.nodeName)
                        },
                        text: function(a) {
                            var b = a.getAttribute("type"),
                                c = a.type;
                            return "input" === a.nodeName.toLowerCase() && "text" === c && (b === c || null === b)
                        },
                        radio: function(a) {
                            return "input" === a.nodeName.toLowerCase() && "radio" === a.type
                        },
                        checkbox: function(a) {
                            return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type
                        },
                        file: function(a) {
                            return "input" === a.nodeName.toLowerCase() && "file" === a.type
                        },
                        password: function(a) {
                            return "input" === a.nodeName.toLowerCase() && "password" === a.type
                        },
                        submit: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return ("input" === b || "button" === b) && "submit" === a.type
                        },
                        image: function(a) {
                            return "input" === a.nodeName.toLowerCase() && "image" === a.type
                        },
                        reset: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return ("input" === b || "button" === b) && "reset" === a.type
                        },
                        button: function(a) {
                            var b = a.nodeName.toLowerCase();
                            return "input" === b && "button" === a.type || "button" === b
                        },
                        input: function(a) {
                            return /input|select|textarea|button/i.test(a.nodeName)
                        },
                        focus: function(a) {
                            return a === a.ownerDocument.activeElement
                        }
                    },
                    setFilters: {
                        first: function(a, b) {
                            return 0 === b
                        },
                        last: function(a, b, c, d) {
                            return b === d.length - 1
                        },
                        even: function(a, b) {
                            return b % 2 === 0
                        },
                        odd: function(a, b) {
                            return b % 2 === 1
                        },
                        lt: function(a, b, c) {
                            return b < c[3] - 0
                        },
                        gt: function(a, b, c) {
                            return b > c[3] - 0
                        },
                        nth: function(a, b, c) {
                            return c[3] - 0 === b
                        },
                        eq: function(a, b, c) {
                            return c[3] - 0 === b
                        }
                    },
                    filter: {
                        PSEUDO: function(a, b, c, d) {
                            var e = b[1],
                                f = o.filters[e];
                            if (f) return f(a, c, b, d);
                            if ("contains" === e) return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                            if ("not" === e) {
                                for (var g = b[3], h = 0, i = g.length; i > h; h++)
                                    if (g[h] === a) return !1;
                                return !0
                            }
                            m.error(e)
                        },
                        CHILD: function(a, b) {
                            var c, e, f, g, i, j, k = b[1],
                                l = a;
                            switch (k) {
                                case "only":
                                case "first":
                                    for (; l = l.previousSibling;)
                                        if (1 === l.nodeType) return !1;
                                    if ("first" === k) return !0;
                                    l = a;
                                case "last":
                                    for (; l = l.nextSibling;)
                                        if (1 === l.nodeType) return !1;
                                    return !0;
                                case "nth":
                                    if (c = b[2], e = b[3], 1 === c && 0 === e) return !0;
                                    if (f = b[0], g = a.parentNode, g && (g[d] !== f || !a.nodeIndex)) {
                                        for (i = 0, l = g.firstChild; l; l = l.nextSibling) 1 === l.nodeType && (l.nodeIndex = ++i);
                                        g[d] = f
                                    }
                                    return j = a.nodeIndex - e, 0 === c ? 0 === j : j % c === 0 && j / c >= 0
                            }
                        },
                        ID: function(a, b) {
                            return 1 === a.nodeType && a.getAttribute("id") === b
                        },
                        TAG: function(a, b) {
                            return "*" === b && 1 === a.nodeType || !!a.nodeName && a.nodeName.toLowerCase() === b
                        },
                        CLASS: function(a, b) {
                            return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                        },
                        ATTR: function(a, b) {
                            var c = b[1],
                                d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c),
                                e = d + "",
                                f = b[2],
                                g = b[4];
                            return null == d ? "!=" === f : !f && m.attr ? null != d : "=" === f ? e === g : "*=" === f ? e.indexOf(g) >= 0 : "~=" === f ? (" " + e + " ").indexOf(g) >= 0 : g ? "!=" === f ? e !== g : "^=" === f ? 0 === e.indexOf(g) : "$=" === f ? e.substr(e.length - g.length) === g : "|=" === f ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                        },
                        POS: function(a, b, c, d) {
                            var e = b[2],
                                f = o.setFilters[e];
                            return f ? f(a, c, b, d) : void 0
                        }
                    }
                },
                p = o.match.POS,
                q = function(a, b) {
                    return "\\" + (b - 0 + 1)
                };
            for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
            o.match.globalPOS = p;
            var s = function(a, b) {
                return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
            };
            try {
                Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
            }
            catch (t) {
                s = function(a, b) {
                    var c = 0,
                        d = b || [];
                    if ("[object Array]" === g.call(a)) Array.prototype.push.apply(d, a);
                    else if ("number" == typeof a.length)
                        for (var e = a.length; e > c; c++) d.push(a[c]);
                    else
                        for (; a[c]; c++) d.push(a[c]);
                    return d
                }
            }
            var u, v;
            c.documentElement.compareDocumentPosition ? u = function(a, b) {
                    return a === b ? (h = !0, 0) : a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
                } : (u = function(a, b) {
                    if (a === b) return h = !0, 0;
                    if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
                    var c, d, e = [],
                        f = [],
                        g = a.parentNode,
                        i = b.parentNode,
                        j = g;
                    if (g === i) return v(a, b);
                    if (!g) return -1;
                    if (!i) return 1;
                    for (; j;) e.unshift(j), j = j.parentNode;
                    for (j = i; j;) f.unshift(j), j = j.parentNode;
                    c = e.length, d = f.length;
                    for (var k = 0; c > k && d > k; k++)
                        if (e[k] !== f[k]) return v(e[k], f[k]);
                    return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
                }, v = function(a, b, c) {
                    if (a === b) return c;
                    for (var d = a.nextSibling; d;) {
                        if (d === b) return -1;
                        d = d.nextSibling
                    }
                    return 1
                }),
                function() {
                    var a = c.createElement("div"),
                        d = "script" + (new Date).getTime(),
                        e = c.documentElement;
                    a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                        if ("undefined" != typeof c.getElementById && !d) {
                            var e = c.getElementById(a[1]);
                            return e ? e.id === a[1] || "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                        }
                    }, o.filter.ID = function(a, b) {
                        var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                        return 1 === a.nodeType && c && c.nodeValue === b
                    }), e.removeChild(a), e = a = null
                }(),
                function() {
                    var a = c.createElement("div");
                    a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                        var c = b.getElementsByTagName(a[1]);
                        if ("*" === a[1]) {
                            for (var d = [], e = 0; c[e]; e++) 1 === c[e].nodeType && d.push(c[e]);
                            c = d
                        }
                        return c
                    }), a.innerHTML = "<a href='#'></a>", a.firstChild && "undefined" != typeof a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (o.attrHandle.href = function(a) {
                        return a.getAttribute("href", 2)
                    }), a = null
                }(), c.querySelectorAll && function() {
                    var a = m,
                        b = c.createElement("div"),
                        d = "__sizzle__";
                    if (b.innerHTML = "<p class='TEST'></p>", !b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
                        m = function(b, e, f, g) {
                            if (e = e || c, !g && !m.isXML(e)) {
                                var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                                if (h && (1 === e.nodeType || 9 === e.nodeType)) {
                                    if (h[1]) return s(e.getElementsByTagName(b), f);
                                    if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                                }
                                if (9 === e.nodeType) {
                                    if ("body" === b && e.body) return s([e.body], f);
                                    if (h && h[3]) {
                                        var i = e.getElementById(h[3]);
                                        if (!i || !i.parentNode) return s([], f);
                                        if (i.id === h[3]) return s([i], f)
                                    }
                                    try {
                                        return s(e.querySelectorAll(b), f)
                                    }
                                    catch (j) {}
                                }
                                else if (1 === e.nodeType && "object" !== e.nodeName.toLowerCase()) {
                                    var k = e,
                                        l = e.getAttribute("id"),
                                        n = l || d,
                                        p = e.parentNode,
                                        q = /^\s*[+~]/.test(b);
                                    l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                                    try {
                                        if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                                    }
                                    catch (r) {}
                                    finally {
                                        l || k.removeAttribute("id")
                                    }
                                }
                            }
                            return a(b, e, f, g)
                        };
                        for (var e in a) m[e] = a[e];
                        b = null
                    }
                }(),
                function() {
                    var a = c.documentElement,
                        b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
                    if (b) {
                        var d = !b.call(c.createElement("div"), "div"),
                            e = !1;
                        try {
                            b.call(c.documentElement, "[test!='']:sizzle")
                        }
                        catch (f) {
                            e = !0
                        }
                        m.matchesSelector = function(a, c) {
                            if (c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !m.isXML(a)) try {
                                if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                                    var f = b.call(a, c);
                                    if (f || !d || a.document && 11 !== a.document.nodeType) return f
                                }
                            }
                            catch (g) {}
                            return m(c, null, null, [a]).length > 0
                        }
                    }
                }(),
                function() {
                    var a = c.createElement("div");
                    if (a.innerHTML = "<div class='test e'></div><div class='test'></div>", a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length) {
                        if (a.lastChild.className = "e", 1 === a.getElementsByClassName("e").length) return;
                        o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                            return "undefined" == typeof b.getElementsByClassName || c ? void 0 : b.getElementsByClassName(a[1])
                        }, a = null
                    }
                }(), m.contains = c.documentElement.contains ? function(a, b) {
                    return a !== b && (a.contains ? a.contains(b) : !0)
                } : c.documentElement.compareDocumentPosition ? function(a, b) {
                    return !!(16 & a.compareDocumentPosition(b))
                } : function() {
                    return !1
                }, m.isXML = function(a) {
                    var b = (a ? a.ownerDocument || a : 0).documentElement;
                    return b ? "HTML" !== b.nodeName : !1
                };
            var y = function(a, b, c) {
                for (var d, e = [], f = "", g = b.nodeType ? [b] : b; d = o.match.PSEUDO.exec(a);) f += d[0], a = a.replace(o.match.PSEUDO, "");
                a = o.relative[a] ? a + "*" : a;
                for (var h = 0, i = g.length; i > h; h++) m(a, g[h], e, c);
                return m.filter(f, e)
            };
            m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
        }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.globalPOS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function(a) {
            var c, d, b = this;
            if ("string" != typeof a) return f(a).filter(function() {
                for (c = 0, d = b.length; d > c; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var g, h, i, e = this.pushStack("", "find", a);
            for (c = 0, d = this.length; d > c; c++)
                if (g = e.length, f.find(a, this[c], e), c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; g > i; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            return e
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; c > a; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var d, e, c = [],
                g = this[0];
            if (f.isArray(a)) {
                for (var h = 1; g && g.ownerDocument && g !== b;) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || "string" != typeof a ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; e > d; d++)
                for (g = this[d]; g;) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    if (g = g.parentNode, !g || !g.ownerDocument || g === b || 11 === g.nodeType) break
                }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, b) {
            var c = "string" == typeof a ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return f.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return f.sibling(a.firstChild)
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && "string" == typeof d && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), 1 === b.length ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function(a, c, d) {
            for (var e = [], g = a[c]; g && 9 !== g.nodeType && (d === b || 1 !== g.nodeType || !f(g).is(d));) 1 === g.nodeType && e.push(g), g = g[c];
            return e
        },
        nth: function(a, b, c) {
            b = b || 1;
            for (var e = 0; a && (1 !== a.nodeType || ++e !== b); a = a[c]);
            return a
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ba = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        bc = new RegExp("<(?:" + V + ")[\\s/>]", "i"),
        bd = /checked\s*(?:[^=]|=\s*.checked.)/i,
        be = /\/(java|ecma)script/i,
        bf = /^\s*<!(?:\[CDATA\[|\-\-)/,
        bg = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        },
        bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function(a) {
            return f.access(this, function(a) {
                return a === b ? f.text(this) : this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a))
            }, null, a, arguments.length)
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(f.isFunction(a) ? function(b) {
                f(this).wrapInner(a.call(this, b))
            } : function() {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                1 === this.nodeType && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                1 === this.nodeType && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a
            }
        },
        remove: function(a, b) {
            for (var d, c = 0; null != (d = this[c]); c++)(!a || f.filter(a, [d]).length) && (!b && 1 === d.nodeType && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d));
            return this
        },
        empty: function() {
            for (var b, a = 0; null != (b = this[a]); a++)
                for (1 === b.nodeType && f.cleanData(b.getElementsByTagName("*")); b.firstChild;) b.removeChild(b.firstChild);
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return f.clone(this, a, b)
            })
        },
        html: function(a) {
            return f.access(this, function(a) {
                var c = this[0] || {},
                    d = 0,
                    e = this.length;
                if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(W, "") : null;
                if (!("string" != typeof a || ba.test(a) || !f.support.leadingWhitespace && X.test(a) || bg[(Z.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Y, "<$1></$2>");
                    try {
                        for (; e > d; d++) c = this[d] || {}, 1 === c.nodeType && (f.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                        c = 0
                    }
                    catch (g) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function(a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function(b) {
                var c = f(this),
                    d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : ("string" != typeof a && (a = f(a).detach()), this.each(function() {
                var b = this.nextSibling,
                    c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && 3 === arguments.length && "string" == typeof j && bd.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                if (i = j && j.parentNode, e = f.support.parentNode && i && 11 === i.nodeType && i.childNodes.length === this.length ? {
                        fragment: i
                    } : f.buildFragment(a, this, k), h = e.fragment, g = 1 === h.childNodes.length ? h = h.firstChild : h.firstChild, g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; m > l; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && n > l ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, function(a, b) {
                    b.src ? f.ajax({
                        type: "GET",
                        global: !1,
                        url: b.src,
                        async: !1,
                        dataType: "script"
                    }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
                })
            }
            return this
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), 1 === a.length && "string" == typeof j && j.length < 512 && i === c && "<" === j.charAt(0) && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && 1 !== h && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [],
                e = f(c),
                g = 1 === this.length && this[0].parentNode;
            if (g && 11 === g.nodeType && 1 === g.childNodes.length && 1 === e.length) return e[b](this[0]), this;
            for (var h = 0, i = e.length; i > h; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || f.isXMLDoc(a) || !bc.test("<" + a.nodeName + ">") ? a.cloneNode(!0) : bo(a);
            if (!(f.support.noCloneEvent && f.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || f.isXMLDoc(a)))
                for (bk(a, h), d = bl(a), e = bl(h), g = 0; d[g]; ++g) e[g] && bk(d[g], e[g]);
            if (b && (bj(a, h), c))
                for (d = bl(a), e = bl(h), g = 0; d[g]; ++g) bj(d[g], e[g]);
            return d = e = null, h
        },
        clean: function(a, b, d, e) {
            var g, h, i, j = [];
            b = b || c, "undefined" == typeof b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            for (var l, k = 0; null != (l = a[k]); k++)
                if ("number" == typeof l && (l += ""), l) {
                    if ("string" == typeof l)
                        if (_.test(l)) {
                            l = l.replace(Y, "<$1></$2>");
                            var r, m = (Z.exec(l) || ["", ""])[1].toLowerCase(),
                                n = bg[m] || bg._default,
                                o = n[0],
                                p = b.createElement("div"),
                                q = bh.childNodes;
                            for (b === c ? bh.appendChild(p) : U(b).appendChild(p), p.innerHTML = n[1] + l + n[2]; o--;) p = p.lastChild;
                            if (!f.support.tbody) {
                                var s = $.test(l),
                                    t = "table" !== m || s ? "<table>" !== n[1] || s ? [] : p.childNodes : p.firstChild && p.firstChild.childNodes;
                                for (i = t.length - 1; i >= 0; --i) f.nodeName(t[i], "tbody") && !t[i].childNodes.length && t[i].parentNode.removeChild(t[i])
                            }!f.support.leadingWhitespace && X.test(l) && p.insertBefore(b.createTextNode(X.exec(l)[0]), p.firstChild), l = p.childNodes, p && (p.parentNode.removeChild(p), q.length > 0 && (r = q[q.length - 1], r && r.parentNode && r.parentNode.removeChild(r)))
                        }
                        else l = b.createTextNode(l);
                    var u;
                    if (!f.support.appendChecked)
                        if (l[0] && "number" == typeof(u = l.length))
                            for (i = 0; u > i; i++) bn(l[i]);
                        else bn(l);
                    l.nodeType ? j.push(l) : j = f.merge(j, l)
                }
            if (d)
                for (g = function(a) {
                        return !a.type || be.test(a.type)
                    }, k = 0; j[k]; k++)
                    if (h = j[k], e && f.nodeName(h, "script") && (!h.type || be.test(h.type))) e.push(h.parentNode ? h.parentNode.removeChild(h) : h);
                    else {
                        if (1 === h.nodeType) {
                            var v = f.grep(h.getElementsByTagName("script"), g);
                            j.splice.apply(j, [k + 1, 0].concat(v))
                        }
                        d.appendChild(h)
                    }
            return j
        },
        cleanData: function(a) {
            for (var b, c, i, d = f.cache, e = f.event.special, g = f.support.deleteExpando, h = 0; null != (i = a[h]); h++)
                if ((!i.nodeName || !f.noData[i.nodeName.toLowerCase()]) && (c = i[f.expando])) {
                    if (b = d[c], b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
        }
    });
    var by, bz, bA, bp = /alpha\([^)]*\)/i,
        bq = /opacity=([^)]*)/,
        br = /([A-Z]|^ms)/g,
        bs = /^[\-+]?(?:\d*\.)?\d+$/i,
        bt = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        bu = /^([\-+])=([\-+.\de]+)/,
        bv = /^margin/,
        bw = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        bx = ["Top", "Right", "Bottom", "Left"];
    f.fn.css = function(a, c) {
        return f.access(this, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        }, a, c, arguments.length > 1)
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = by(a, "opacity");
                        return "" === c ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var g, h, i = f.camelCase(c),
                    j = a.style,
                    k = f.cssHooks[i];
                if (c = f.cssProps[i] || i, d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
                if (h = typeof d, "string" === h && (g = bu.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number"), null == d || "number" === h && isNaN(d)) return;
                if ("number" === h && !f.cssNumber[i] && (d += "px"), !(k && "set" in k && (d = k.set(a, d)) === b)) try {
                    j[c] = d
                }
                catch (l) {}
            }
        },
        css: function(a, c, d) {
            var e, g;
            return c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, "cssFloat" === c && (c = "float"), g && "get" in g && (e = g.get(a, !0, d)) !== b ? e : by ? by(a, c) : void 0
        },
        swap: function(a, b, c) {
            var e, f, d = {};
            for (f in b) d[f] = a.style[f], a.style[f] = b[f];
            e = c.call(a);
            for (f in b) a.style[f] = d[f];
            return e
        }
    }), f.curCSS = f.css, c.defaultView && c.defaultView.getComputedStyle && (bz = function(a, b) {
        var c, d, e, g, h = a.style;
        return b = b.replace(br, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), "" === c && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), !f.support.pixelMargin && e && bv.test(b) && bt.test(c) && (g = h.width, h.width = c, c = e.width, h.width = g), c
    }), c.documentElement.currentStyle && (bA = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return null == f && g && (e = g[b]) && (f = e), bt.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = "fontSize" === b ? "1em" : f, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), "" === f ? "auto" : f
    }), by = bz || bA, f.each(["height", "width"], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? 0 !== a.offsetWidth ? bB(a, b, d) : f.swap(a, bw, function() {
                    return bB(a, b, d)
                }) : void 0
            },
            set: function(a, b) {
                return bs.test(b) ? b + "px" : b
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return bq.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1, b >= 1 && "" === f.trim(g.replace(bp, "")) && (c.removeAttribute("filter"), d && !d.filter) || (c.filter = bp.test(g) ? g.replace(bp, e) : g + " " + e)
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                return f.swap(a, {
                    display: "inline-block"
                }, function() {
                    return b ? by(a, "margin-right") : a.style.marginRight
                })
            }
        })
    }), f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return 0 === b && 0 === c || !f.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || f.css(a, "display"))
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a)
    }), f.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        f.cssHooks[a + b] = {
            expand: function(c) {
                var d, e = "string" == typeof c ? c.split(" ") : [c],
                    f = {};
                for (d = 0; 4 > d; d++) f[a + bx[d] + b] = e[d] || e[d - 2] || e[0];
                return f
            }
        }
    });
    var bU, bV, bC = /%20/g,
        bD = /\[\]$/,
        bE = /\r?\n/g,
        bF = /#.*$/,
        bG = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        bH = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        bI = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        bJ = /^(?:GET|HEAD)$/,
        bK = /^\/\//,
        bL = /\?/,
        bM = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bN = /^(?:select|textarea)/i,
        bO = /\s+/,
        bP = /([?&])_=[^&]*/,
        bQ = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        bR = f.fn.load,
        bS = {},
        bT = {},
        bW = ["*/"] + ["*"];
    try {
        bU = e.href
    }
    catch (bX) {
        bU = c.createElement("a"), bU.href = "", bU = bU.href
    }
    bV = bQ.exec(bU.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if ("string" != typeof a && bR) return bR.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : "object" == typeof c && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(bM, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            }), this
        },
        serialize: function() {
            return f.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bN.test(this.nodeName) || bH.test(this.type))
            }).map(function(a, b) {
                var c = f(this).val();
                return null == c ? null : f.isArray(c) ? f.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(bE, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(bE, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function(a, c) {
        f[c] = function(a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? b$(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b$(a, b), a
        },
        ajaxSettings: {
            url: bU,
            isLocal: bI.test(bV[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bW
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bY(bS),
        ajaxTransport: bY(bT),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (2 !== s) {
                    s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                    var o, r, u, y, z, w = c,
                        x = l ? ca(d, v, l) : b;
                    if (a >= 200 && 300 > a || 304 === a)
                        if (d.ifModified && ((y = v.getResponseHeader("Last-Modified")) && (f.lastModified[k] = y), (z = v.getResponseHeader("Etag")) && (f.etag[k] = z)), 304 === a) w = "notmodified", o = !0;
                        else try {
                            r = cb(d, x), w = "success", o = !0
                        }
                        catch (A) {
                            w = "parsererror", u = A
                        }
                    else u = w, (!w || a) && (w = "error", 0 > a && (a = 0));
                    v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (c = a, a = b), c = c || {};
            var k, n, o, p, q, r, t, u, d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {},
                l = {},
                m = {},
                s = 0,
                v = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === s ? n : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (2 === s) {
                            if (!o)
                                for (o = {}; c = bG.exec(n);) o[c[1].toLowerCase()] = c[2];
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        return s || (d.mimeType = a), this
                    },
                    abort: function(a) {
                        return a = a || "abort", p && p.abort(a), w(0, a), this
                    }
                };
            if (h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                    if (a) {
                        var b;
                        if (2 > s)
                            for (b in a) j[b] = [j[b], a[b]];
                        else b = a[v.status], v.then(b, b)
                    }
                    return this
                }, d.url = ((a || d.url) + "").replace(bF, "").replace(bK, bV[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bO), null == d.crossDomain && (r = bQ.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bV[1] && r[2] == bV[2] && (r[3] || ("http:" === r[1] ? 80 : 443)) == (bV[3] || ("http:" === bV[1] ? 80 : 443)))), d.data && d.processData && "string" != typeof d.data && (d.data = f.param(d.data, d.traditional)), bZ(bS, d, c, v), 2 === s) return !1;
            if (t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bJ.test(d.type), t && 0 === f.active++ && f.event.trigger("ajaxStart"), !d.hasContent && (d.data && (d.url += (bL.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url, d.cache === !1)) {
                var x = f.now(),
                    y = d.url.replace(bP, "$1_=" + x);
                d.url = y + (y === d.url ? (bL.test(d.url) ? "&" : "?") + "_=" + x : "")
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + bW + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (d.beforeSend && (d.beforeSend.call(e, v, d) === !1 || 2 === s)) return v.abort(), !1;
            for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
            if (p = bZ(bT, d, c, v)) {
                v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                    v.abort("timeout")
                }, d.timeout));
                try {
                    s = 1, p.send(l, w)
                }
                catch (z) {
                    if (!(2 > s)) throw z;
                    w(-1, z)
                }
            }
            else w(-1, "No Transport");
            return v
        },
        param: function(a, c) {
            var d = [],
                e = function(a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            if (c === b && (c = f.ajaxSettings.traditional), f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (var g in a) b_(g, a[g], c, e);
            return d.join("&").replace(bC, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cc = f.now(),
        cd = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cc++
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = "string" == typeof b.data && /^application\/x\-www\-form\-urlencoded/.test(b.contentType);
        if ("jsonp" === b.dataTypes[0] || b.jsonp !== !1 && (cd.test(b.url) || e && cd.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(cd, l), b.url === j && (e && (k = k.replace(cd, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [a]
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function() {
                return g || f.error(h + " was not called"), g[0]
            }, b.dataTypes[0] = "json", "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return f.globalEval(a), a
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        (c || !d.readyState || /loaded|complete/.test(d.readyState)) && (d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success"))
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var cg, ce = a.ActiveXObject ? function() {
            for (var a in cg) cg[a](0, 1)
        } : !1,
        cf = 0;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
            return !this.isLocal && ch() || ci()
        } : ch,
        function(a) {
            f.extend(f.support, {
                ajax: !!a,
                cors: !!a && "withCredentials" in a
            })
        }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
            if (!c.crossDomain || f.support.cors) {
                var d;
                return {
                    send: function(e, g) {
                        var i, j, h = c.xhr();
                        if (c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async), c.xhrFields)
                            for (j in c.xhrFields) h[j] = c.xhrFields[j];
                        c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (j in e) h.setRequestHeader(j, e[j])
                        }
                        catch (k) {}
                        h.send(c.hasContent && c.data || null), d = function(a, e) {
                            var j, k, l, m, n;
                            try {
                                if (d && (e || 4 === h.readyState))
                                    if (d = b, i && (h.onreadystatechange = f.noop, ce && delete cg[i]), e) 4 !== h.readyState && h.abort();
                                    else {
                                        j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n);
                                        try {
                                            m.text = h.responseText
                                        }
                                        catch (a) {}
                                        try {
                                            k = h.statusText
                                        }
                                        catch (o) {
                                            k = ""
                                        }
                                        j || !c.isLocal || c.crossDomain ? 1223 === j && (j = 204) : j = m.text ? 200 : 404
                                    }
                            }
                            catch (p) {
                                e || g(-1, p)
                            }
                            m && g(j, k, m, l)
                        }, c.async && 4 !== h.readyState ? (i = ++cf, ce && (cg || (cg = {}, f(a).unload(ce)), cg[i] = d), h.onreadystatechange = d) : d()
                    },
                    abort: function() {
                        d && d(0, 1)
                    }
                }
            }
        });
    var ck, cl, co, cq, cj = {},
        cm = /^(?:toggle|show|hide)$/,
        cn = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        cp = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || 0 === a) return this.animate(ct("show", 3), a, b, c);
            for (var g = 0, h = this.length; h > g; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && "none" === e && (e = d.style.display = ""), ("" === e && "none" === f.css(d, "display") || !f.contains(d.ownerDocument.documentElement, d)) && f._data(d, "olddisplay", cu(d.nodeName)));
            for (g = 0; h > g; g++) d = this[g], d.style && (e = d.style.display, ("" === e || "none" === e) && (d.style.display = f._data(d, "olddisplay") || ""));
            return this
        },
        hide: function(a, b, c) {
            if (a || 0 === a) return this.animate(ct("hide", 3), a, b, c);
            for (var d, e, g = 0, h = this.length; h > g; g++) d = this[g], d.style && (e = f.css(d, "display"), "none" !== e && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; h > g; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = "boolean" == typeof a;
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(ct("toggle", 3), a, b, c), this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var g, h, i, j, k, l, m, n, o, p, q, b = f.extend({}, e),
                    c = 1 === this.nodeType,
                    d = c && f(this).is(":hidden");
                b.animatedProperties = {};
                for (i in a)
                    if (g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), (k = f.cssHooks[g]) && "expand" in k) {
                        l = k.expand(a[g]), delete a[g];
                        for (i in l) i in a || (a[i] = l[i])
                    }
                for (g in a) {
                    if (h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing", "hide" === h && d || "show" === h && !d) return b.complete.call(this);
                    c && ("height" === g || "width" === g) && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], "inline" === f.css(this, "display") && "none" === f.css(this, "float") && (f.support.inlineBlockNeedsLayout && "inline" !== cu(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
                }
                null != b.overflow && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cm.test(h) ? (q = f._data(this, "toggle" + i) || ("toggle" === h ? d ? "show" : "hide" : 0), q ? (f._data(this, "toggle" + i, "show" === q ? "hide" : "show"), j[q]()) : j[h]()) : (m = cn.exec(h), n = j.cur(), m ? (o = parseFloat(m[2]), p = m[3] || (f.cssNumber[i] ? "" : "px"), "px" !== p && (f.style(this, i, (o || 1) + p), n = (o || 1) / j.cur() * n, f.style(this, i, n + p)), m[1] && (o = ("-=" === m[1] ? -1 : 1) * o + n), j.custom(n, o, p)) : j.custom(n, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [!1]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g))
        },
        stop: function(a, c, d) {
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                if (d || f._unmark(!0, this), null == a)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (null == a || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: ct("show", 1),
        slideUp: ct("hide", 1),
        slideToggle: ct("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && "object" == typeof a ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            return d.duration = f.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            }, d
        },
        easing: {
            linear: function(a) {
                return a
            },
            swing: function(a) {
                return -Math.cos(a * Math.PI) / 2 + .5
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function() {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
            var a, b = f.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b : 0 : a
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = cq || cr(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
                f._data(e.elem, "fxshow" + e.prop) === b && (e.options.hide ? f._data(e.elem, "fxshow" + e.prop, e.start) : e.options.show && f._data(e.elem, "fxshow" + e.prop, e.end))
            }, h() && f.timers.push(h) && !co && (co = setInterval(g.tick, g.interval))
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, c, d, e = cq || cr(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    if (null != i.overflow && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
                            h.style["overflow" + b] = i.overflow[a]
                        }), i.hide && f(h).hide(), i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            return 1 / 0 == i.duration ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, f.extend(f.fx, {
        tick: function() {
            for (var a, b = f.timers, c = 0; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(co), co = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(cp.concat.apply([], cp), function(a, b) {
        b.indexOf("margin") && (f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        })
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem
        }).length
    });
    var cv, cw = /^t(?:able|d|h)$/i,
        cx = /^(?:body|html)$/i;
    cv = "getBoundingClientRect" in c.documentElement ? function(a, b, c, d) {
        try {
            d = a.getBoundingClientRect()
        }
        catch (e) {}
        if (!d || !f.contains(c, a)) return d ? {
            top: d.top,
            left: d.left
        } : {
            top: 0,
            left: 0
        };
        var g = b.body,
            h = cy(b),
            i = c.clientTop || g.clientTop || 0,
            j = c.clientLeft || g.clientLeft || 0,
            k = h.pageYOffset || f.support.boxModel && c.scrollTop || g.scrollTop,
            l = h.pageXOffset || f.support.boxModel && c.scrollLeft || g.scrollLeft,
            m = d.top + k - i,
            n = d.left + l - j;
        return {
            top: m,
            left: n
        }
    } : function(a, b, c) {
        for (var d, e = a.offsetParent, g = a, h = b.body, i = b.defaultView, j = i ? i.getComputedStyle(a, null) : a.currentStyle, k = a.offsetTop, l = a.offsetLeft;
            (a = a.parentNode) && a !== h && a !== c && (!f.support.fixedPosition || "fixed" !== j.position);) d = i ? i.getComputedStyle(a, null) : a.currentStyle, k -= a.scrollTop, l -= a.scrollLeft, a === e && (k += a.offsetTop, l += a.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(a.nodeName)) && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), g = e, e = a.offsetParent), f.support.subtractsBorderForOverflowNotVisible && "visible" !== d.overflow && (k += parseFloat(d.borderTopWidth) || 0, l += parseFloat(d.borderLeftWidth) || 0), j = d;
        return ("relative" === j.position || "static" === j.position) && (k += h.offsetTop, l += h.offsetLeft), f.support.fixedPosition && "fixed" === j.position && (k += Math.max(c.scrollTop, h.scrollTop), l += Math.max(c.scrollLeft, h.scrollLeft)), {
            top: k,
            left: l
        }
    }, f.fn.offset = function(a) {
        if (arguments.length) return a === b ? this : this.each(function(b) {
            f.offset.setOffset(this, a, b)
        });
        var c = this[0],
            d = c && c.ownerDocument;
        return d ? c === d.body ? f.offset.bodyOffset(c) : cv(c, d, d.documentElement) : null
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var m, n, e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = ("absolute" === d || "fixed" === d) && f.inArray("auto", [h, i]) > -1,
                k = {},
                l = {};
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), null != b.top && (k.top = b.top - g.top + m), null != b.left && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = cx.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || c.body; a && !cx.test(a.nodeName) && "static" === f.css(a, "position");) a = a.offsetParent;
                return a
            })
        }
    }), f.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, c) {
        var d = /Y/.test(c);
        f.fn[a] = function(e) {
            return f.access(this, function(a, e, g) {
                var h = cy(a);
                return g === b ? h ? c in h ? h[c] : f.support.boxModel && h.document.documentElement[e] || h.document.body[e] : a[e] : void(h ? h.scrollTo(d ? f(h).scrollLeft() : g, d ? g : f(h).scrollTop()) : a[e] = g)
            }, a, e, arguments.length, null)
        }
    }), f.each({
        Height: "height",
        Width: "width"
    }, function(a, c) {
        var d = "client" + a,
            e = "scroll" + a,
            g = "offset" + a;
        f.fn["inner" + a] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, c, "padding")) : this[c]() : null
        }, f.fn["outer" + a] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, c, a ? "margin" : "border")) : this[c]() : null
        }, f.fn[c] = function(a) {
            return f.access(this, function(a, c, h) {
                var i, j, k, l;
                return f.isWindow(a) ? (i = a.document, j = i.documentElement[d], f.support.boxModel && j || i.body && i.body[d] || j) : 9 === a.nodeType ? (i = a.documentElement, i[d] >= i[e] ? i[d] : Math.max(a.body[e], i[e], a.body[g], i[g])) : h === b ? (k = f.css(a, c), l = parseFloat(k), f.isNumeric(l) ? l : k) : void f(a).css(c, h)
            }, c, a, arguments.length, null)
        }
    }), a.jQuery = a.$ = f, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f
    })
}(window);