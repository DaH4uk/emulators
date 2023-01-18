// jsmin

var sysmap = null;
var addons = {};
var mapAttrs = {};
var generics = {};
var sysres = {};
var relogin = false;
var hidePasswords = true;
var hidePasswordsLstn = new Listeners();
var skin = {};
var skinMode = null;
var pool = [];
var prevURLs = [];
var currentURL;
var current = null;
var urlCheker;
var ticker;
var session;
var autonomous = false;
var OP_CONTAIN = 0;
var OP_CONTAIN_NOT = 1;
var OP_IS = 2;
var OP_IS_NOT = 3;
var OP_IN = 4;
var OP_IN_NOT = 5;
var OP_LS = 6;
var OP_LEQ = 7;
var OP_GT = 8;
var OP_GEQ = 9;

function inherit(t) {
    function C() {}
    C.prototype = t;
    return new C();
}

function getfirst(l) {
    for (var i in l) {
        return i;
    }
    return null;
}

function isempty(l) {
    return getfirst(l) == null;
}

function hasall(a, v) {
    for (i in a) {
        if (a[i] != v) return false;
    }
    return true;
}

function byte2str(b) {
    b &= 0xff;
    return String.fromCharCode(b ? b : 256);
}

function word2str(w) {
    return byte2str(w >> 24) + byte2str(w >> 16) +
        byte2str(w >> 8) + byte2str(w);
}

function str2byte(s, off) {
    return s.charCodeAt(off) & 0xff;
}

function str2word(s, off) {
    return (str2byte(s, off) << 24) | (str2byte(s, off + 1) << 16) | (str2byte(s, off + 2) << 8) | str2byte(s, off + 3);
}

function str2a(s) {
    var res = [];
    for (var i = 0; i < s.length; ++i) res.push(s.charCodeAt(i));
    return res;
}

function a2str(a) {
    var x = [];
    for (var i = 0; i < a.length; ++i) x.push(byte2str(a[i]));
    return x.join('');
}

function ustr2a(s) {
    var res = [];
    for (var i = 0; i < s.length; ++i) {
        res.push(s.charCodeAt(i) & 0xff);
        res.push(s.charCodeAt(i) >> 8);
    }
    return res;
}

function rrotate(v, r) {
    return (v >>> r) | (v << (32 - r));
}

function unpackbe(a, off) {
    var v = 0;
    for (var i = 0; i < 4; ++i) {
        v |= a[off + i] << (24 - (i * 8));
    }
    return v;
}

function packbe(a, off, v) {
    for (var i = 0; i < 4; ++i) {
        a[off + i] = (v >> (24 - i * 8)) & 0xff;
    }
}

function unpackle(a, off) {
    var v = 0;
    for (var i = 0; i < 4; ++i) {
        v |= a[off + i] << (i * 8);
    }
    return v;
}

function packle(a, off, v) {
    for (var i = 0; i < 4; ++i) {
        a[off + i] = (v >> (i * 8)) & 0xff;
    }
}

function decodeZeros(str) {
    var r = '';
    for (var i = 0; i < str.length; ++i) {
        r += String.fromCharCode(str.charCodeAt(i) & 0xff);
    }
    return r;
}

function get(id) {
    return document.getElementById(id);
}

function RC4(key) {
    this.S = [];
}
RC4.prototype.setKey = function(key) {
    var S = this.S;
    for (var i = 0; i < 256; ++i) S[i] = i;
    var j = 0;
    for (var i = 0; i < 256; ++i) {
        j = (j + key[i % key.length] + S[i]) & 255;
        var t = S[i];
        S[i] = S[j];
        S[j] = t;
    }
    this.i = 0;
    this.j = 0;
    for (var i = 0; i < 768; ++i) this.gen();
};
RC4.prototype.gen = function() {
    var S = this.S;
    var i = this.i = (this.i + 1) & 255;
    var j = this.j = (this.j + S[i]) & 255;
    var t = S[i];
    S[i] = S[j];
    S[j] = t;
    return S[(S[i] + S[j]) & 255];
};
RC4.prototype.skip = function(n) {
    for (var i = 0; i < n; ++i) this.gen();
};
RC4.prototype.encrypt = function(str) {
    var a = new Array(str.length);
    for (var i = 0; i < str.length; ++i) {
        var c = str.charCodeAt(i) ^ this.gen();
        if (c == 0) c = 256;
        a[i] = String.fromCharCode(c);
    }
    return a.join('');
};
RC4.prototype.decrypt = function(str, off) {
    off = off || 0;
    var a = new Array(str.length);
    for (var i = 0; i < str.length - off; ++i) {
        a[i] = String.fromCharCode((str.charCodeAt(i + off) & 0xff) ^ this.gen());
    }
    return a.join('');
};

function des(inp, key) {
    function permute(v, count, p) {
        var r = 0;
        for (var i = 0; i < count; ++i) {
            r = (r << 1) | ((v >> p[i]) & 1);
        }
        return r;
    }

    function bpermute(v, count, p) {
        var r = 0;
        for (var i = 0; i < count; ++i) {
            r = (r << 1) | ((v[p[i] >> 3] >> (7 - (p[i] & 7))) & 1);
        }
        return r;
    }

    function rrotate28(v, r) {
        return ((v >> r) | (v << (28 - r))) & 0x0fffffff;
    }
    if (!des.FP) {
        des.FP = [
            [],
            []
        ];
        for (var j = 0; j < 2; ++j) {
            for (var i = 0; i < 32; ++i) {
                var x = des.IP[j][i];
                des.FP[x >> 5][x & 31] = i + (j << 5);
            }
        }
    }
    var c = bpermute(key, 28, des.PC1[0]);
    var d = bpermute(key, 28, des.PC1[1]);
    var l = rrotate(bpermute(inp, 32, des.IP[0]), 31);
    var r = rrotate(bpermute(inp, 32, des.IP[1]), 31);
    var rot = 1;
    for (var i = 0; i < 16; ++i) {
        var k = [permute(rrotate28(c, rot), 24, des.PC2[1]), permute(rrotate28(d, rot), 24, des.PC2[0])];
        for (var j = 0; j < 8; ++j) {
            var x = k[j >> 2] >> (j & 3) * 6;
            var b = (rrotate(r, j * 4) ^ x) & 0x3f;
            var s = (des.S[j][b >> 3] >> ((b & 7) * 4)) & 0xf;
            l ^= rrotate(permute(s << j * 4, 32, des.P), 31);
        }
        var t = l;
        l = r;
        r = t;
        ++rot;
        if (i != 0 && i != 7 && i != 14) ++rot;
    }
    var v = [];
    packbe(v, 0, rrotate(r, 1));
    packbe(v, 4, rrotate(l, 1));
    l = bpermute(v, 32, des.FP[0]);
    r = bpermute(v, 32, des.FP[1]);
    var out = [];
    packbe(out, 0, l);
    packbe(out, 4, r);
    return out;
};
des.PC1 = [
    [3, 11, 19, 27, 4, 12, 20, 28, 36, 44, 52, 60, 5, 13, 21, 29, 37, 45, 53, 61, 6, 14, 22, 30, 38, 46, 54, 62],
    [35, 43, 51, 59, 2, 10, 18, 26, 34, 42, 50, 58, 1, 9, 17, 25, 33, 41, 49, 57, 0, 8, 16, 24, 32, 40, 48, 56]
];
des.PC2 = [
    [13, 16, 10, 23, 0, 4, 2, 27, 14, 5, 20, 9, 22, 18, 11, 3, 25, 7, 15, 6, 26, 19, 12, 1],
    [12, 23, 2, 8, 18, 26, 1, 11, 22, 16, 4, 19, 15, 20, 10, 27, 5, 24, 17, 13, 21, 7, 0, 3]
];
des.IP = [
    [57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7],
    [56, 48, 40, 32, 24, 16, 8, 0, 58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46, 38, 30, 22, 14, 6]
];
des.P = [16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22, 30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7];
des.S = [
    [0x84d8f21d, 0x417b3fa6, 0xbe6359ca, 0x279ce005, 0x71e41b27, 0xd28eac49, 0x0d9ac6f0, 0xb865533f],
    [0x7eb20bd4, 0xad18904f, 0xc7593ce3, 0x6186fa25, 0x8ddbb461, 0x7ea7431c, 0xf8065f9a, 0xc23925e0],
    [0x2f4af1ac, 0x5896c279, 0xe4d31d60, 0x8b35b70e, 0xc52f3e49, 0xa3fc5892, 0x7a14e0b7, 0xd68b0d61],
    [0xc124bce2, 0x16db7a47, 0xaff30558, 0x698e903d, 0x7bc182b4, 0xd827ed1a, 0x950cf96f, 0x3e5043a6],
    [0x53be8dd7, 0x3a09f660, 0xc5287241, 0x9fe4ac1b, 0x6009f63a, 0x8dd71bac, 0xbe53419f, 0xe42872c5],
    [0x9e0970da, 0xa56f4336, 0xe75c8d21, 0x18f2b4cb, 0x09d4a61d, 0x70839f68, 0x3ce2f14b, 0xc72e5ab5],
    [0x7e48d13f, 0xe4832bf6, 0xad1207c9, 0x5ab5906c, 0x1ba78ed0, 0x214df43a, 0xc67c68b5, 0x9fe25309],
    [0x417df40e, 0x18db2fe2, 0xbcc66aa3, 0x87305995, 0x288ec1f4, 0x7b12964d, 0xe739bc5f, 0xd0650aa3]
];

function md4(msg) {
    var len = msg.length;
    var totalLen = len + 9;
    totalLen = (totalLen + 63) & -64;
    var padding = [0x80];
    for (var i = len + 1; i < totalLen; ++i) padding.push(0);
    msg = msg.concat(padding);
    packle(msg, totalLen - 8, len * 8);
    var h0 = 0x67452301;
    var h1 = 0xefcdab89;
    var h2 = 0x98badcfe;
    var h3 = 0x10325476;
    var w = [];
    for (var j = 0; j < msg.length; j += 64) {
        for (var i = 0; i < 16; ++i) w[i] = unpackle(msg, j + i * 4);
        var a = h0;
        var b = h1;
        var c = h2;
        var d = h3;
        for (var i = 0; i < 48; ++i) {
            var r = i >> 4;
            var f;
            switch (r) {
                case 0:
                    f = ((c ^ d) & b) ^ d;
                    break;
                case 1:
                    f = (b & c) | (b & d) | (c & d);
                    break;
                case 2:
                    f = b ^ c ^ d;
                    break;
            }
            var t = rrotate(a + w[md4.lut[r][i & 0xf]] + md4.k[r] + f, md4.s[r][i & 3]);
            a = d;
            d = c;
            c = b;
            b = t;
        }
        h0 = (h0 + a) << 0;
        h1 = (h1 + b) << 0;
        h2 = (h2 + c) << 0;
        h3 = (h3 + d) << 0;
    }
    var res = [];
    packle(res, 0, h0);
    packle(res, 4, h1);
    packle(res, 8, h2);
    packle(res, 12, h3);
    return res;
}
md4.k = [0, 0x5a827999, 0x6Ed9Eba1];
md4.s = [
    [29, 25, 21, 13],
    [29, 27, 23, 19],
    [29, 23, 21, 17]
];
md4.lut = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15],
    [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]
];

function sha1(msg) {
    var len = msg.length;
    var totalLen = len + 9;
    totalLen = (totalLen + 63) & -64;
    var padding = [0x80];
    for (var i = len + 1; i < totalLen; ++i) padding.push(0);
    msg = msg.concat(padding);
    packbe(msg, totalLen - 4, len * 8);
    var h0 = 0x67452301;
    var h1 = 0xEFCDAB89;
    var h2 = 0x98BADCFE;
    var h3 = 0x10325476;
    var h4 = 0xC3D2E1F0;
    var w = [];
    for (var j = 0; j < msg.length; j += 64) {
        for (var i = 0; i < 16; ++i) w[i] = unpackbe(msg, j + i * 4);
        for (var i = 16; i < 80; ++i) {
            w[i] = rrotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 31);
        }
        var a = h0;
        var b = h1;
        var c = h2;
        var d = h3;
        var e = h4;
        var f;
        var k;
        for (var i = 0; i < 80; ++i) {
            if (i < 20) {
                f = (b & c) | (~b & d);
                k = 0x5A827999;
            }
            else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            }
            else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            }
            else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }
            var t = rrotate(a, 27) + f + e + k + w[i];
            e = d;
            d = c;
            c = rrotate(b, 2);
            b = a;
            a = t << 0;
        }
        h0 = (h0 + a) << 0;
        h1 = (h1 + b) << 0;
        h2 = (h2 + c) << 0;
        h3 = (h3 + d) << 0;
        h4 = (h4 + e) << 0;
    }
    var res = [];
    packbe(res, 0, h0);
    packbe(res, 4, h1);
    packbe(res, 8, h2);
    packbe(res, 12, h3);
    packbe(res, 16, h4);
    return res;
}

function Session(id) {
    this.id = id;
    this.txseq = 0;
    this.txEnc = new RC4();
    this.rxseq = 0;
    this.rxEnc = new RC4();
    this.queue = {};
    this.padding = '        ';
}
Session.prototype.encrypt = function(str) {
    var seq = this.txseq;
    this.txseq += str.length + 8;
    return (word2str(this.id) + word2str(seq)) +
        this.txEnc.encrypt(str) + this.txEnc.encrypt(this.padding);
};
Session.prototype.encryptURI = function(uri) {
    return encodeURIComponent(decodeZeros(this.encrypt(uri)));
};
Session.prototype.decrypt = function(data, cb) {
    if (data.length < 8 + 8) return false;
    var id = str2word(data, 0);
    var seq = str2word(data, 4);
    if (id != this.id) return false;
    if (seq != this.rxseq) {
        this.queue[seq] = {
            data: data,
            cb: cb
        };
        return true;
    }
    this.rxseq += data.length - 8;
    var msg = this.rxEnc.decrypt(data, 8);
    if (msg.substr(msg.length - 8) != this.padding) return false;
    if (cb) cb(eval(' (' + msg + ') '));
    return true;
};
Session.prototype.dequeue = function() {
    while (1) {
        var i = this.queue[this.rxseq];
        if (!i) break;
        delete this.queue[this.rxseq];
        this.decrypt(i.data, i.cb);
    }
};
Session.prototype.makeResponse = function(user, pwd, r) {
    var magic = "This is the MPPE Master Key";
    var magic1 = "Magic server to client signing constant";
    var magic2 = "Pad to make it do more than one iteration";
    this.txseq = 1;
    this.rxseq = 1;
    var rchallenge = str2a(r.substr(8));
    var lchallenge = [0x21, 0x40, 0x23, 0x24, 0x25, 0x5E, 0x26, 0x2A, 0x28, 0x29, 0x5F, 0x2B, 0x3A, 0x33, 0x7C, 0x7E];
    var chlgHash = sha1(lchallenge.concat(rchallenge).concat(str2a(user))).slice(0, 8);
    var pwdHash = md4(ustr2a(pwd.substr(0, 256)));
    var pwdHashHash = md4(pwdHash);
    var response = [];
    for (var j = 0; j < 3 * 56; j += 56) {
        var key = [];
        for (var i = j; i < j + 56; i += 7) {
            var w = (pwdHash[i >> 3] << 8) | (pwdHash[(i >> 3) + 1] << 0);
            key.push((w >> (8 - (i & 7))) & 0xfe);
        }
        response = response.concat(des(chlgHash, key));
    }
    var masterKey = sha1(pwdHashHash.concat(response).concat(str2a(magic))).slice(0, 16);
    this.rxEnc.setKey(this.makeKey(masterKey, false, false));
    this.txEnc.setKey(this.makeKey(masterKey, true, false));
    var reserved = [0, 0, 0, 0, 0, 0, 0, 0];
    var msg = ([0, 0]).concat(lchallenge).concat(reserved).concat(response);
    return word2str(this.id) + word2str(0) +
        a2str(rchallenge) + a2str(msg) + user;
};
Session.prototype.makeKey = function(masterKey, isSend, isServer) {
    var magic2 = "On the client side, this is the send key; on the server side, it is the receive key.";
    var magic3 = "On the client side, this is the receive key; on the server side, it is the send key.";
    var v = masterKey.concat([]);
    for (var i = 0; i < 40; ++i) v.push(0);
    if (isSend == isServer) {
        v = v.concat(str2a(magic3));
    }
    else {
        v = v.concat(str2a(magic2));
    }
    for (var i = 0; i < 40; ++i) v.push(0xf2);
    return sha1(v).slice(0, 16);
}

function itxt(doc, parent, content) {
    var e = doc.createTextNode(content);
    if (parent != null) parent.appendChild(e);
    return e;
}

function iel(doc, parent, type, content) {
    var e = doc.createElement(type);
    if (content) itxt(doc, e, content);
    if (parent != null) parent.appendChild(e);
    return e;
}

function ielc(doc, parent, type, className) {
    var e = iel(doc, parent, type);
    if (className) e.className = className;
    return e;
}

function txt(parent, content) {
    return itxt(document, parent, content);
}

function el(parent, type, content) {
    return iel(document, parent, type, content);
}

function elc(parent, type, className) {
    return ielc(document, parent, type, className);
}

function input(parent, type) {
    var ctrl = el(parent, 'input');
    ctrl.type = type != null ? type : 'text';
    return ctrl;
}

function tableList(parent) {
    var table = elc(parent, 'table', 'list');
    table.cellSpacing = 0;
    table.cellPadding = 0;
    return table;
}

function addClass(n, className) {
    var c = n.className;
    if (c.indexOf(className) != -1) return;
    n.className = c + ' ' + className;
}

function removeClass(n, className) {
    if (n.className != '') {
        n.className = trim(n.className.replace(className, ''));
    }
}

function hasClass(n, className) {
    return n.className.indexOf(className) != -1;
}

function toggleClass(n, className) {
    if (hasClass(n, className)) {
        removeClass(n, className);
    }
    else {
        addClass(n, className);
    }
}

function isSkinEvent(e) {
    return getEventSrc(e).nodeName == 'INPUT';
}

function createButton(tb, title, cfg, href) {
    if (!title) {
        elc(tb, 'li', 'sep');
        return null;
    }
    var b = elc(el(tb, 'li'), 'a', 'button');
    b.draggable = 0;
    b.ondragstart = function() {
        return false;
    };
    b.appendChild(viewLabel(cfg, title));
    if (href) {
        b.onclick = function(e) {
            if (!isSkinEvent(e)) {
                openContent(href);
                return false;
            }
            return true;
        };
    }
    return b;
}
var currentTitle;

function setDocumentTitle(title) {
    if (title) {
        currentTitle = title;
    }
    else {
        if (!currentTitle) return;
        title = currentTitle;
    }
    document.title = sysres.identity + ' - ' +
        title + ' at ' + sysres.user + '@' + location.host + ' - Webfig v' + sysres.version + ' on ' + sysres.displayname + ' (' + sysres.arch + ')';
}

function imgbtn(parent, src) {
    var b = el(parent, 'a');
    var img = el(b, 'img');
    if (src) img.src = src;
    b.className = 'sbtn';
    b.draggable = 0;
    b.ondragstart = function() {
        return false;
    };
    return b;
}

function tbtn(parent, t) {
    var b = el(parent, 'a', t);
    b.className = 'tbtn';
    return b;
}

function clearNodes(node) {
    if (node) {
        while (node.hasChildNodes())
            node.removeChild(node.firstChild);
    }
}

function getElementPos(el) {
    if (el.offsetParent == undefined) {
        if (el.x == undefined) return {
            x: 0,
            y: 0
        };
        return {
            x: el.x,
            y: el.y
        };
    }
    var x = 0;
    var y = 0;
    for (; el.offsetParent; el = el.offsetParent) {
        x += el.offsetLeft;
        y += el.offsetTop;
    }
    return {
        x: x,
        y: y
    };
}

function getScrollPos() {
    if (window.pageYOffset != undefined) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    }
    if (document.body.scrollTop || document.body.scrollLeft) {
        return {
            x: document.body.scrollLeft,
            y: document.body.scrollTop
        };
    }
    return {
        x: document.documentElement.scrollLeft,
        y: document.documentElement.scrollTop
    };
}

function getWindowSize() {
    var w = window.innerWidth || 0;
    var h = window.innerHeight || 0;
    var bw = document.body.clientWidth;
    var hw = document.documentElement.clientWidth;
    var bh = document.body.clientHeight;
    var hh = document.documentElement.clientHeight;
    if (bh == 0 || bw > hw || bh > hh) {
        bw = hw;
        bh = hh;
    }
    if (h == 0 || bw < w || bh < h) return {
        x: bw,
        y: bh
    };
    return {
        x: w,
        y: h
    };
}

function getEventSrc(e) {
    e = e || event;
    return e.srcElement || e.target;
}

function getPos(e, box) {
    e = e || window.event;
    var clientX;
    var clientY;
    var x = e.pageX;
    if (x == null) {
        clientX = e.clientX;
        x = clientX +
            (document.documentElement.scrollLeft || document.body.scrollLeft);
    }
    else {
        clientX = x - window.pageXOffset;
    }
    var y = e.pageY;
    if (y == null) {
        clientY = e.clientY;
        y = clientY +
            (document.documentElement.scrollTop || document.body.scrollTop);
    }
    else {
        clientY = y - window.pageYOffset;
    }
    if (box) {
        x -= box.offsetLeft;
        y -= box.offsetTop;
    }
    return {
        x: x,
        y: y,
        clientX: clientX,
        clientY: clientY
    };
}

function replaceText(node, str) {
    if (node.hasChildNodes()) {
        var n = node.firstChild;
        if (n.nodeName == '#text' && n.nodeValue == str) return;
        node.removeChild(n);
    }
    txt(node, str);
}

function show(id) {
    document.getElementById(id).style.display = 'block';
}

function hide(id) {
    document.getElementById(id).style.display = 'none';
}

function SVGPoly(line) {
    this.line = line;
};
SVGPoly.prototype.reset = function() {
    this.points = '';
};
SVGPoly.prototype.add = function(x, y) {
    this.points += ' ' + x + ',' + y;
};
SVGPoly.prototype.draw = function() {
    this.line.setAttribute('points', this.points);
};

function SVGText(el) {
    this.el = el;
}
SVGText.prototype.text = function(t) {
    replaceText(this.el, t);
};

function SVG(doc, canvas, width, height, vWidth, vHeight, className) {
    this.doc = doc;
    this.strokeOpacity = 1;
    this.strokeColor = 'black';
    this.strokeWidth = 1;
    this.fillOpacity = 1;
    this.fillColor = 'white';
    if (!canvas) {
        canvas = this.el('svg', {
            version: '1.1',
            viewBox: '0 0 ' + width + ' ' + height,
            width: vWidth,
            height: (vHeight < height ? '100%' : vHeight),
            preserveAspectRatio: 'xMaxYMax slice'
        });
        if (!canvas || !canvas.viewBox) return;
        if (className) canvas.className.baseVal = className;
    }
    this.canvas = canvas;
    this.current = canvas;
    if (SVG.firefox) ++width;
    this.viewBox = {
        width: width,
        height: height
    };
    if (vWidth < width) this.canvas.style.width = '100%';
}
SVG.firefox = navigator.userAgent.search("Firefox") != -1;
SVG.prototype.line = function(x1, y1, x2, y2) {
    var line = this.el('line', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
    });
    line.setAttribute('shape-rendering', 'crispEdges');
    this.setAttrs(line);
    this.current.appendChild(line);
};
SVG.prototype.text = function(x, y, sz, rightAlign) {
    var text = this.el('text', {
        x: x,
        y: y + sz,
        'font-size': sz
    });
    if (rightAlign) text.setAttribute('text-anchor', 'end');
    this.current.appendChild(text);
    return new SVGText(text);
};
SVG.prototype.polyline = function() {
    var l = this.el('polyline');
    this.setAttrs(l);
    this.current.appendChild(l);
    return new SVGPoly(l);
};
SVG.prototype.polygon = function() {
    var p = this.el('polygon');
    this.setAttrs(p);
    this.current.appendChild(p);
    return new SVGPoly(p);
};
SVG.prototype.el = function(type, attrs) {
    if (!this.doc.createElementNS) return null;
    var el = this.doc.createElementNS('http://www.w3.org/2000/svg', type);
    if (!attrs) return el;
    for (var i in attrs) {
        el.setAttribute(i, attrs[i]);
    }
    return el;
};
SVG.prototype.setAttrs = function(el) {
    el.setAttribute('fill', this.fillColor);
    el.setAttribute('fill-opacity', this.fillOpacity);
    el.setAttribute('stroke-opacity', this.strokeOpacity);
    el.setAttribute('stroke', this.strokeColor);
    el.setAttribute('stroke-width', this.strokeWidth);
};

function createGraphic(doc, el, width, height, vWidth, vHeight, className) {
    var g = new SVG(doc, el, width, height, vWidth, vHeight, className);
    if (g.canvas) return g;
    return null;
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

function hasPrefix(prefix, str) {
    if (prefix[prefix.length - 1] == '$') {
        return prefix.substr(0, prefix.length - 1) == str;
    }
    return prefix == str.substr(0, prefix.length);
}

function hasPrefixIn(prefix, map) {
    for (var i in map) {
        if (hasPrefix(prefix, map[i].toString())) return true;
    }
    return false;
}

function hasOneOfPrefixes(prefixes, str) {
    for (var i in prefixes) {
        if (hasPrefix(prefixes[i], str)) return true;
    }
    return false;
}

function fitsRangeLimit(n, limit) {
    if (limit && limit.ranges) {
        var ranges = limit.ranges;
        for (var i = 0; i < ranges.length; i += 2) {
            if (minmax(n, ranges[i], ranges[i + 1])) return true;
        }
        return false;
    }
    return true;
}

function string2int(str, radix) {
    if (str.length == 0) return null;
    for (var i = 0; i < str.length; ++i) {
        var c = str.substr(i, 1);
        if ((c == '-' || c == '+') && i == 0) continue;
        if (isNaN(parseInt(c, radix || 10))) return null;
    }
    return parseInt(str, radix || 10);
}

function fraction2string(num, scale) {
    var len = scale.toString().length - 1;
    var str = (num % scale).toString();
    while (str.length < len) str = '0' + str;
    return str;
}

function string2fraction(str, scale) {
    var i = string2int(str);
    if (i == null || i < 0) return null;
    var n = parseFloat('0.' + str);
    if (isNaN(n)) return null;
    return Math.floor(n * scale);
}

function ipaddr2string(ip) {
    var r = '';
    for (var i = 0; i < 4; ++i) {
        if (i > 0) r += '.';
        r += (ip & 0xff).toString();
        ip >>= 8;
    }
    return r;
}

function string2ipaddr(str) {
    var a = str.split('.', 4);
    if (a.length == 1) return null;
    if (a.length != 4) {
        if (a.length <= 2) a.splice(a.length - 1, 0, '0');
        if (a.length <= 3) a.splice(2, 0, '0');
    }
    var addr = [];
    for (var i in a) {
        var n = string2int(a[i], 10);
        if (n == null || n < 0 || n > 255) return null;
        addr[i] = n;
    }
    return (addr[3] << 24) | (addr[2] << 16) | (addr[1] << 8) | addr[0];
}

function ntohl(v) {
    return ((v & 0xff) << 24) | (((v >> 8) & 0xff) << 16) | (((v >> 16) & 0xff) << 8) | ((v >> 24) & 0xff);
}

function netmask2len(ip) {
    if (!ip) return 0;
    var len = 0;
    for (var i = 0; i < 4; ++i, len += 8, ip >>= 8) {
        var x = ip & 0xff;
        if (x == 255) continue;
        for (var j = 128; j > 0; j >>= 1, ++len) {
            if (!(x & j)) return len;
        }
    }
    return len;
}

function len2netmask(len) {
    var mask = 0;
    for (var i = 0; i < (len & 7); ++i) {
        mask = (mask >> 1) | 0x80;
    }
    for (var i = 8; i <= len; i += 8) {
        mask = (mask << 8) | 0xff;
    }
    return mask;
}

function string2ip6addr(str) {
    var p = str.split(':');
    var skip;
    var addr = [];
    for (var i = 0; i < p.length; ++i) {
        if (p[i].length == 0) {
            if (i > 0 && i + 1 < p.length) {
                if (skip) return null;
                skip = addr.length;
                continue;
            }
            addr.push(0);
            addr.push(0);
            continue;
        }
        if (i + 1 == p.length) {
            var a = string2ipaddr(p[i]);
            if (a != null) {
                addr.push(a & 0xff);
                addr.push((a >> 8) & 0xff);
                addr.push((a >> 16) & 0xff);
                addr.push((a >> 24) & 0xff);
                break;
            }
        }
        var n = string2int(p[i], 16);
        if (n == null || n < 0 | n > 0xffff) return null;
        addr.push(n >> 8);
        addr.push(n & 0xff);
    }
    if (skip) {
        while (addr.length < 16) addr.splice(skip, 0, 0);
    }
    if (addr.length != 16) return null;
    return addr;
}

function ip6addr2string(addr) {
    function find2Zeros(addr, pos) {
        for (; pos < 16; pos += 2) {
            if (addr[pos] == 0 && addr[pos + 1] == 0) return pos;
        }
        return 16;
    }

    function findNonZeros(addr, pos) {
        for (; pos < 16; pos += 2) {
            if (addr[pos] != 0 || addr[pos + 1] != 0) return pos;
        }
        return 16;
    }
    var str = '';
    var zerosStart = -1;
    var zerosLen = 2;
    for (var start = 0; start < 16;) {
        start = find2Zeros(addr, start);
        if (start != 16) {
            var end = findNonZeros(addr, start + 2);
            var len = end - start;
            if (len > zerosLen) {
                zerosLen = len;
                zerosStart = start;
            }
            start = end + 2;
        }
    }
    if (zerosStart == 0) {
        var ip = addr[12] | (addr[13] << 8) | (addr[14] << 16) | (addr[15] << 24);
        if (zerosLen == 12) {
            return '::' + ipaddr2string(ip);
        }
        else if (i == 10) {
            var word = (addr[i] << 8) + addr[i + 1];
            if (word == 0xffff) {
                return '::ffff:' + ipaddr2string(ip);
            }
        }
    }
    for (var i = 0; i < 16;) {
        if (i == zerosStart) {
            str += ':';
            i += zerosLen;
            if (i == 16) str += ':';
            continue;
        }
        var word = (addr[i] << 8) + addr[i + 1];
        if (i > 0) str += ':';
        str += word.toString(16);
        i += 2;
    }
    return str;
}

function ip6addr2ipaddr(addr) {
    for (var i = 0; i < 10; ++i) {
        if (addr[i] != 0) return null;
    }
    for (var i = 10; i < 12; ++i) {
        if (addr[i] != 0xff) return null;
    }
    return (addr[15] << 24) | (addr[14] << 16) | (addr[13] << 8) | addr[12];
}

function ipaddr2ip6addr(addr) {
    return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0xff, 0xff, addr & 0xff, (addr >> 8) & 0xff, (addr >> 16) & 0xff, (addr >> 24) & 0xff, ];
}

function string2version(str) {
    var state = 0x66;
    var fix = 0;
    str = str.split(' ')[0];
    var n = str.split('.');
    if (n.length < 2) return null;
    var major = string2int(n[0]);
    if (major == null) return null;
    var minor = string2int(n[1]);
    if (minor == null) {
        var vv = {
            alpha: 0x61,
            beta: 0x62,
            rc: 0x63,
            'final': 0x66,
            'test': 0x67
        };
        for (var i in vv) {
            var x = n[1].split(i);
            if (x.length == 2) {
                minor = string2int(x[0]);
                if (minor == null) return null;
                state = vv[i];
                fix = string2int(x[1]);
                if (fix == null) return null;
                break;
            }
        }
    }
    else if (n.length >= 3) {
        fix = string2int(n[2]);
        if (fix == null) return null;
    }
    return (major << 24) | (minor << 16) | (state << 8) | fix;
}

function num2int(v) {
    return v >= 0x80000000 ? v - 0x100000000 : v;
}

function int2num(v) {
    return v < 0 ? 0x100000000 + v : v;
}

function toarray(m) {
    var a = [];
    for (var i in m) a[i] = m[i];
    return a.length == 1 ? a[0] : a;
}

function fromarray(a) {
    if (a instanceof Array) {
        var r = {};
        for (var i in a) r[i] = a[i];
        return r;
    }
    return {
        0: a
    };
}

function fillarray(f, sz) {
    var res = new Array(sz);
    for (var i = 0; i < sz; ++i) res[i] = f;
    return res;
}

function getTime(v) {
    return v % (3600 * 24);
}

function getDate(v) {
    return v - getTime(v);
}

function setDate(v, d) {
    return d + getTime(v);
}

function getNow() {
    return Math.floor(new Date().getTime() / 1000);
}

function getTZOffset() {
    return (new Date()).getTimezoneOffset() * 60;
}
var seconds = [24, 60, 60];
var fullday = 24 * 60 * 60;

function doubledigit(v) {
    return v < 10 ? '0' + v : v.toString();
}

function interval2string(val, scale) {
    var rem = 0;
    if (scale > 1) {
        rem = val % scale;
        val = Math.floor(val / scale);
    }
    var str = '';
    var days = 0;
    if (val >= fullday) {
        days = Math.floor(val / fullday);
        val = val % fullday;
    }
    if (days) str += days + 'd ';
    var h = Math.floor(val / 3600);
    var m = Math.floor(val / 60) % 60;
    var s = val % 60;
    str += doubledigit(h) + ':' + doubledigit(m) + ':' + doubledigit(s);
    if (rem > 0) str += '.' + fraction2string(rem, scale);
    return str;
}

function string2interval(str, scale) {
    scale = scale || 1;
    var v = 0;
    var d = str.split('d ');
    if (d.length > 1) {
        if (d.length > 2) return null;
        v = string2int(d[0]);
        if (v == null || v < 0) return null;
        str = d[1];
    }
    var fr = str.split('.');
    if (fr.length > 2) return null;
    var x = fr[0].split(':');
    if (x.length != 3) return null;
    for (var i in x) {
        v *= seconds[i];
        var n = string2int(x[i]);
        if (n == null || n < 0 || n >= seconds[i]) return null;
        v += n;
    }
    if (scale > 1) {
        v *= scale;
        if (fr.length == 2) v += string2fraction(fr[1], scale);
    }
    else {
        if (fr.length == 2) return null;
    }
    return v;
}
var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
var dayMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function toMonth(str) {
    str = str.toLowerCase();
    for (var i in months) {
        if (months[i] == str) return parseInt(i);
    }
    return null;
}

function date2string(val) {
    var d = new Date(val * 1000);
    var str = months[d.getUTCMonth()] + "/" + doubledigit(d.getUTCDate()) +
        "/" + d.getUTCFullYear();
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function string2date(str) {
    var a = str.split('/');
    if (a.length != 3) return null;
    var mn = toMonth(a[0]);
    if (mn == null) return null;
    var day = string2int(a[1]);
    if (day == null || day < 1 || day >= 32) return null;
    var yr = string2int(a[2]);
    if (yr == null || yr < 1970 || yr >= 2030) return null;
    var leap = yr % 4 == 0;
    var days = (yr - 1970) * 365 + Math.floor((yr - 1969) / 4);
    for (var i = 0; i < mn; ++i) {
        days += dayMonth[i];
        if (leap && i == 1) ++days;
    }
    return (days + day - 1) * (3600 * 24);
}

function timezone2string(val) {
    var sign = '+';
    if (val < 0) {
        sign = '-';
        val = -val;
    }
    val = Math.floor(val / 60);
    return sign +
        doubledigit(Math.floor(val / 60)) + ':' + doubledigit(val % 60);
}

function string2timezone(str) {
    var x = str.split(':');
    if (x.length != 2) return null;
    var hr = string2int(x[0]);
    if (hr == null) return null;
    var mn = string2int(x[1]);
    if (mn == null || mn < 0 || mn >= 60) return null;
    return (hr * 60 + mn) * 60;
}

function dateAndTime2string(date, time, allwaysWithTime, dontShowToday, local) {
    var s = date2string(date);
    if (dontShowToday && s == date2string(Date.now() / 1000)) {
        return interval2string(time);
    }
    if (!allwaysWithTime && time == 0) return s;
    return s + ' ' + interval2string(time);
}

function string2enum(values, str) {
    if (!values) return null;
    var type = enm[values.type];
    var map = type ? type.getMap(values) : {};
    for (var i in map) {
        if (str == map[i]) return parseInt(i);
    }
    return null;
}

function enum2string(values, val) {
    if (!values) return null;
    return enm[values.type].toString(int2num(val), values);
}

function lossyenum_fromstr(attrs, str, fromstr) {
    if (!attrs.values) return fromstr(attrs, str);
    var idx = str.indexOf('(');
    if (idx != -1) return fromstr(attrs, trim(str.substr(0, idx)));
    var map = enm[attrs.values.type].getMap(attrs.values);
    for (var i in map) {
        if (str == map[i]) return parseInt(i, 10);
    }
    return fromstr(attrs, str);
}

function lossyenum_tostr(attrs, val, str) {
    if (!attrs.values) return str;
    var type = enm[attrs.values.type];
    var map = type ? type.getMap(attrs.values) : {};
    var n = map[val];
    if (n == undefined) return str;
    return str + ' ' + '(' + n + ')';
}

function parseLimit(ranges, str, deflow, defhigh, fromstr) {
    var range = str.split('..');
    if (range.length > 2) return false;
    var low = deflow;
    if (range[0] != '') low = fromstr(range[0]);
    if (low == null) return false;
    var high = low;
    if (range.length == 2) {
        high = range[1] != '' ? fromstr(range[1]) : defhigh;
        if (high == null) return false;
    }
    ranges.push(low);
    ranges.push(high);
    return true;
};

function minmax(val, min, max) {
    if (min != null && val < min) return false;
    if (max != null && val > max) return false;
    return true;
}

function iminmax(val, min, max) {
    if (min != null && val < num2int(min)) return false;
    if (max != null && val > num2int(max)) return false;
    return true;
}

function update(obj, data) {
    for (var i in obj) {
        var c = i.charAt(0);
        if (c == 'm') {
            update(obj[i], {});
        }
        else if (c != '_') {
            delete obj[i];
        }
    }
    for (var i in data) {
        var c = i.charAt(0);
        if (c == 'm' && obj[i]) {
            update(obj[i], data[i]);
        }
        else if (c != '_') {
            obj[i] = data[i];
        }
    }
    return obj;
}

function tostr(attr, val) {
    if (attr.opt) {
        if (val == null || !ftype(attr).hasValue(attr, val)) return '';
    }
    return ftype(attr).tostr(attr, val);
}

function toString(attr, obj) {
    return tostr(attr, ftype(attr).get(attr, obj));
}

function getNow() {
    return Math.floor((new Date()).getTime() / 1000);
}

function getUptime() {
    return getNow() + sysres.uptimediff;
}

function createIcon(parent, iconnr) {
    var icon = elc(parent, 'div', 'icon');
    icon.style.backgroundPosition = ((iconnr & 31) * -16) + 'px ' + ((iconnr >> 5) * -16) + 'px';
    return icon;
}

function PopupMenu(getOptions, getOptionCfg) {
    this.menu = elc(document.body, 'ul', 'popup');
    this.menu.style.display = 'none';
    this.dropDown = false;
    this.getOptions = getOptions;
    this.getOptionCfg = getOptionCfg;
}
PopupMenu.prototype.add = function(id, text, cfg) {
    var item = el(el(this.menu, 'li'), 'a');
    var lbl = el(item, 'span', text);
    if (cfg) new SkinCntrl(item, cfg, lbl);
    var me = this;
    item.onclick = function() {
        me.show(false);
        me.onclick(parseInt(id));
        return false;
    };
};
PopupMenu.prototype.show = function(dropDown, x, y) {
    if (this.dropDown == dropDown) return;
    var menu = this.menu;
    if (dropDown) {
        clearNodes(this.menu);
        var options = this.getOptions();
        for (var i in options) {
            this.add(i, options[i], this.getOptionCfg ? this.getOptionCfg(options[i]) : null);
        }
        menu.style.display = '';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        var pos = getElementPos(menu);
        var size = getWindowSize();
        var spos = getScrollPos();
        if (pos.y + menu.offsetHeight > spos.y + size.y) {
            window.scrollTo(spos.x, pos.y + menu.offsetHeight - size.y);
        }
        else if (pos.y < spos.y) {
            window.scrollTo(spos.x, pos.y);
        }
        if (document.onclick) document.onclick();
        var me = this;
        setTimeout(function() {
            document.onclick = function(e) {
                me.show(false);
                return true;
            };
        }, 1);
    }
    else {
        document.onclick = null;
        menu.style.display = 'none';
    }
    this.dropDown = dropDown;
    if (this.onshow) this.onshow(dropDown);
};
PopupMenu.prototype.destroy = function() {
    this.menu.parentNode.removeChild(this.menu);
};

function MenuButton(parent, title, cfg, getOptions, getOptionCfg) {
    this.bttn = createButton(parent, title, cfg);
    var img = el(this.bttn, 'img');
    img.src = 'down-arrow.png';
    img.style.verticalAlign = 'bottom';
    img.style.marginLeft = '1em';
    var me = this;
    this.bttn.onclick = function() {
        var pos = getElementPos(me.bttn.parentNode);
        me.menu.show(!me.dropDown, pos.x, pos.y + me.bttn.offsetHeight - 4);
    };
    this.menu = new PopupMenu(getOptions, getOptionCfg);
    this.menu.onshow = function(show) {
        if (show) {
            addClass(me.bttn, 'pressed');
        }
        else {
            removeClass(me.bttn, 'pressed');
        }
    };
    this.menu.onclick = function(id) {
        me.onclick(id);
    };
}
MenuButton.prototype.destroy = function() {
    this.menu.destroy();
};

function Checkbox(parent) {
    var chk = elc(parent, 'img', 'checkbox');
    chk.src = 'unchecked.png';
    chk.style.border = 'none';
    chk.style.padding = '0 3px 0 0';
    chk.style.verticalAlign = '-1px';
    this.ctrl = chk;
    this.checked = false;
    var me = this;
    chk.onclick = function(e) {
        if (!me.onclick) return true;
        e = e || event;
        if (e.stopPropagation) e.stopPropagation();
        me.setChecked(!me.checked);
        me.onclick();
        return false;
    };
}
Checkbox.prototype.getElement = function() {
    return this.ctrl;
};
Checkbox.prototype.isChecked = function() {
    return this.checked;
};
Checkbox.prototype.setChecked = function(c) {
    this.checked = c;
    this.ctrl.src = c ? 'checked.png' : 'unchecked.png';
};

function TextInput(ctrl) {
    this.setElement(ctrl);
}
TextInput.prototype.getElement = function() {
    return this.ctrl;
};
TextInput.prototype.setElement = function(ctrl) {
    if (this.ctrl) {
        this.ctrl.onkeydown = null;
        this.ctrl.oncut = null;
        this.ctrl.onpaste = null;
        this.ctrl.ondrop = null;
        this.ctrl.oninput = null;
    }
    this.ctrl = ctrl;
    var me = this;
    ctrl.onkeydown = function(e) {
        if (me.onkeydown) me.onkeydown(e || event);
        setTimeout(function() {
            if (me.text != me.ctrl.value) {
                me.text = me.ctrl.value;
                me.changed(me.text);
            }
        }, 1);
    };
    ctrl.oncut = function() {
        me.text = me.ctrl.value;
        me.changed(me.text);
    };
    ctrl.onpaste = function() {
        me.text = me.ctrl.value;
        me.changed(me.text);
    };
    ctrl.ondrop = function() {
        me.text = me.ctrl.value;
        me.changed(me.text);
    };
    ctrl.oninput = function() {
        me.text = me.ctrl.value;
        me.changed(me.text);
    };
};
TextInput.prototype.focus = function() {
    this.ctrl.focus();
};
TextInput.prototype.setEnabled = function(en) {
    this.ctrl.disabled = !en;
};
TextInput.prototype.getValue = function() {
    return this.ctrl.value;
};
TextInput.prototype.setValue = function(value) {
    this.text = value;
    this.ctrl.value = value;
};
TextInput.prototype.changed = function(value) {
    if (this.onchange) this.onchange(value);
};

function TextArea(parent) {
    TextInput.call(this, el(parent, 'textarea'));
    this.ctrl.rows = 1;
}
TextArea.prototype = inherit(TextInput.prototype);
TextArea.prototype.setValue = function(value) {
    TextInput.prototype.setValue.call(this, value);
    this.changed(value);
};
TextArea.prototype.changed = function(value) {
    var lines = this.ctrl.value.split('\n');
    this.ctrl.rows = lines.length;
    if (this.onchange) {
        var ok = this.onchange(value);
        if (this.label) {
            if (!ok) {
                addClass(this.label, 'error');
            }
            else {
                removeClass(this.label, 'error');
            }
        }
    }
};

function viewLabel(cfg, name, propname) {
    if (!propname) propname = 'name';
    if (skinMode && cfg) {
        var lbl = input(null);
        var fld = new TextInput(lbl);
        fld.setValue(cfg[propname] || name);
        fld.onchange = function(value) {
            cfg[propname] = value;
        };
        fld.onkeydown = function(event) {
            if (event.keyCode == 27) {
                fld.setValue(name);
            }
            else if (event.keyCode == 13) {
                fld.getElement().parentNode.focus();
            }
        };
        return lbl;
    }
    return el(null, 'span', cfg && cfg[propname] ? cfg[propname] : name);
}

function getStatusContainer() {
    var idx = 0;
    while (sysmap[idx].name != 'Status') ++idx;
    return sysmap[idx].c[0];
}

function isStatusPageEmpty() {
    if (skin.Status == null || skin.Status.Status == null) return true;
    var cfg = getContainerProp(getStatusContainer());
    for (var i in cfg) {
        if (isNaN(parseInt(i))) continue;
        if (cfg[i] == 0 || cfg[i]._hide) continue;
        return false;
    }
    return true;
}

function addToStatusPage(path) {
    var cfg = getContainerProp(getStatusContainer());
    var showStatus = isStatusPageEmpty();
    var i = 0;
    for (var j in cfg) {
        if (j >= i) i = parseInt(j) + 1;
    }
    cfg[i] = {
        alias: path
    };
    if (showStatus) generateMenu();
}

function SkinCntrl(parent, cfg, label) {
    this.parent = parent;
    this.cfg = cfg;
    this.label = label;
    this.chk = new Checkbox(null);
    var me = this;
    this.chk.onclick = function() {
        me.cfg._hide = me.chk.isChecked() ? 0 : 1;
        me.setValue(cfg._hide);
        if (me.onclick) me.onclick(me.cfg._hide);
        return false;
    };
    parent.insertBefore(this.chk.getElement(), parent.firstChild);
    var hide = this.cfg._hide;
    if (hide == null && this.cfg._def) hide = this.cfg._def._hide;
    this.setValue(hide);
}
SkinCntrl.prototype.setValue = function(val) {
    this.chk.setChecked(!val);
    if (this.label) {
        if (val) {
            addClass(this.label, 'strikeout');
        }
        else {
            removeClass(this.label, 'strikeout');
        }
    }
};
SkinCntrl.prototype.getValue = function() {
    return !this.chk.isChecked();
};
SkinCntrl.prototype.setDefault = function(val) {
    if (this.cfg._hide == null) this.setValue(val);
};

function shouldHide(cfg) {
    if (skinMode) return false;
    if (cfg._hide) return true;
    if (cfg._hide != null) return false;
    if (cfg._def) return !!cfg._def._hide;
    return false;
}

function ViewController(cfg, status) {
    this.lstns = [];
    this.views = [];
    this.allConds = [];
    this.conds = {};
    this.tabs = {};
    this.needsSeparator = false;
    this.insertPlace = 0;
    this.cfg = cfg;
    this.status = status;
}
ViewController.prototype.addAllViews = function(obj, type, views) {
    if (!type) type = obj._type;
    if (!this.mainType) this.mainType = type;
    for (var i in type.c) {
        var c = type.c[i];
        if (c.type != 'cond') continue;
        var cd = new Condition(c, this.conds, obj);
        this.conds[c.name] = cd;
        this.allConds.push(cd);
    }
    var ro = isROObj(obj, type);
    this.listenOn(obj);
    for (var i in type.c) {
        var v = this.createView(obj, null, type.c[i], ro);
        if (v && views) views.push(v);
    }
};
ViewController.prototype.listenOn = function(obj) {
    if (!obj._owner) return;
    var me = this;
    var lstn = function(o) {
        if (obj.ufe0001 == o.ufe0001) me.update(obj);
    };
    obj._owner.listen(lstn, true);
    this.lstns.push({
        obj: obj,
        lstn: lstn
    });
};
ViewController.prototype.destroy = function() {
    for (var i in this.lstns) {
        var l = this.lstns[i];
        l.obj._owner.unlisten(l.lstn, true);
    }
    for (var i in this.views) {
        var v = this.views[i];
        if (v.info.owner) continue;
        v.destroy();
    }
};
ViewController.prototype.getMainObject = function() {
    if (this.lstns.length > 0) return this.lstns[0].obj;
    return null;
};
ViewController.prototype.createGrid = function() {
    if (!this.hasGrid) {
        this.hasGrid = true;
    }
    else {
        var rows = 0;
        for (var i in this.views) {
            if (this.views[i].hasRow()) ++rows;
        }
        this.rows = rows;
    }
};
ViewController.prototype.create = function(table) {
    if (this.hasGrid) {
        var view = new CustomView({}, false, function(viewCtrl) {
            viewCtrl.createGridCell();
        });
        view.info.newColumn = true;
        this.addView(null, null, null, view, view.attrs, {
            order: 0
        }, true);
        var idx = this.cfg.rows != null ? this.cfg.rows : (this.rows || 10000);
        var view = new CustomView({}, false, function(viewCtrl) {
            viewCtrl.createGridCell();
        });
        view.info.newColumn = true;
        this.addView(null, null, null, view, view.attrs, {
            order: idx
        }, true);
    }
    this.reorderViews();
    this.table = table;
    for (var i in this.views) {
        var view = this.views[i];
        var v = view.info;
        this.current = view;
        view.createRow(this, v.cfg, v.obj);
        if (v.row && !view.isVisible()) addClass(v.row, 'hidden');
    }
    this.addDefaultSkinLine();
    if (skinMode) {
        this.bottom = el(this.table, 'tbody');
        var td = elc(el(this.bottom, 'tr'), 'td', 'value');
        td.colSpan = 21;
        txt(td, ' ');
    }
    this.fixLabelWidth();
    this.readdTabs();
    this.load();
    for (var i in this.allConds) this.allConds[i].init(this);
};
ViewController.prototype.fixLabelWidth = function() {
    var width = 0;
    for (var i in this.views) {
        var v = this.views[i].info;
        if (!v.row) continue;
        var row = v.row.firstChild;
        if (row.childNodes.length == 1) continue;
        var label = row.firstChild;
        var w = label.clientWidth;
        if (w > width) width = w;
    }
    width = width + 'px';
    for (var i in this.views) {
        var v = this.views[i].info;
        if (!v.row) continue;
        var row = v.row.firstChild;
        var label = row.firstChild;
        label.style.minWidth = width;
    }
};
ViewController.prototype.reorderViews = function() {
    var ordered = [];
    var idx = 0;
    for (var i = 0; i < this.views.length; ++i) {
        var v = this.views[i];
        if (v.hasRow()) v.info.orignalIdx = idx++;
        if (v.info.cfg.order != null) {
            ordered.push(v);
            this.views.splice(i, 1);
            --i;
        }
    }
    if (ordered.length == 0) return;
    ordered.sort(function(a, b) {
        if (a.info.cfg.order < b.info.cfg.order) return -1;
        if (a.info.cfg.order > b.info.cfg.order) return 1;
        if (a.info.newColumn) return -1;
        if (b.info.newColumn) return 1;
        return 0;
    });
    var idx = 0;
    var j = 0;
    for (var i in ordered) {
        var v = ordered[i];
        while (idx < v.info.cfg.order && j < this.views.length) {
            if (this.views[j++].hasRow()) ++idx;
        }
        this.views.splice(j, 0, v);
        ++j;
        if (v.hasRow()) ++idx;
    }
};
ViewController.prototype.renumViews = function() {
    var idx = 0;
    for (var i in this.views) {
        var v = this.views[i].info;
        if (v.newColumn) {
            if (i == 0) continue;
            if (this.rows ? idx == this.rows : i == this.views.length - 1) {
                delete this.cfg.rows;
            }
            else {
                this.cfg.rows = idx;
            }
            continue;
        }
        if (!this.views[i].hasRow()) continue;
        if (v.cfg.order != null) {
            if (v.orignalIdx == idx) {
                delete v.cfg.order;
            }
            else {
                v.cfg.order = idx;
            }
        }
        ++idx;
    }
};
ViewController.prototype.update = function(obj) {
    for (var i in this.views) {
        var v = this.views[i];
        if (v.info.owner) continue;
        if (obj && v.info.obj != obj) continue;
        if (!v.isChanged()) v.load(v.info.obj);
    }
};
ViewController.prototype.load = function() {
    for (var i in this.views) {
        var v = this.views[i];
        if (v.info.owner) continue;
        v.load(v.info.obj);
    }
};
ViewController.prototype.save = function() {
    for (var i in this.views) {
        var v = this.views[i];
        if (v.info.owner || v.info.ro) continue;
        if (!v.isVisible() || !v.isEnabled()) continue;
        var err = v.save(v.info.obj);
        if (err != null) {
            alert(err);
            return false;
        }
    }
    return true;
};
ViewController.prototype.isChanged = function() {
    for (var i in this.views) {
        var v = this.views[i];
        if (v.info.owner || v.info.ro) continue;
        if (!v.isVisible() || !v.isEnabled()) continue;
        if (v.isChanged()) return true;
    }
    return false;
};
ViewController.prototype.readdTabs = function() {
    var needSep = null;
    var needTab = null;

    function cleanupTab(v) {
        if (v && v.tab) {
            v.tab.parentNode.removeChild(v.tab);
            v.tab = null;
        }
        return null;
    }

    function cleanupSep(v) {
        if (v && v.sep) {
            v.sep.parentNode.removeChild(v.sep);
            v.sep = null;
        }
        return null;
    }
    var currentGroup = null;
    for (var i = 0; i < this.views.length; ++i) {
        var view = this.views[i];
        var v = view.info;
        if (!v.row) continue;
        var hideSep = v.cfg.separator && v.cfg.separator._hide;
        if (typeof v.cfg.tab == 'string') {
            v.cfg.tab = {
                name: v.cfg.tab
            };
        }
        if ((v.group && currentGroup != v.group) || (v.cfg.tab && (v.cfg.tab._hide == 0 || v.cfg.tab.name))) {
            if (v.group && currentGroup != v.group) v.tabByDefault = true;
            currentGroup = v.group;
            needTab = cleanupTab(needTab);
            needSep = cleanupSep(needSep);
            var tab = v.cfg.tab ? v.cfg.tab : (v.group ? v.group.cfg : null);
            if (!tab || tab._hide != 1) needTab = v;
        }
        else if (!needTab && !hideSep && (v.separator || v.cfg.separator)) {
            cleanupSep(needSep);
            needSep = v;
        }
        cleanupTab(v);
        cleanupSep(v);
        if (!view.isVisible()) continue;
        if (v.group == null && !v.cfg.tab) needTab = null;
        if (needTab && !needTab.tab) {
            needTab.tab = this.createTab(needTab);
        }
        else if (needSep && !needSep.sep) {
            needSep.sep = this.createSeparator(needSep);
        }
        needTab = null;
        needSep = null;
    }
    cleanupTab(needTab);
    cleanupSep(needSep);
    if (this.hasGrid) {
        var cells = this.mainTable.firstChild.firstChild;
        var first = cells.firstChild;
        var second = first.nextSibling;
        var visible = 0;
        var list = first.firstChild;
        for (var i = 0; i < list.children.length; ++i) {
            if (!hasClass(list.children[i], 'hidden')) {
                ++visible;
                break;
            }
        }
        if (visible > 0) {
            if (first.style.width != '50%') {
                first.style.width = '50%';
                second.style.width = '50%';
            }
        }
        else {
            if (first.style.width != '0') {
                first.style.width = '0';
                second.style.width = '100%';
            }
        }
    }
};
ViewController.prototype.newView = function(obj, attrs, hide, ro) {
    if (attrs.nonpublic || hide) {
        return new HiddenView(attrs);
    }
    var c = attrs.on ? this.conds[attrs.on] : null;
    if (c && c.shouldHide(obj)) return null;
    if (!ro && c && c.shouldMakeRO(obj)) ro = true;
    var view = ftype(attrs).view(attrs, ro || attrs.ro);
    if (view && c) c.addView(view);
    return view;
};
ViewController.prototype.createView = function(obj, owner, attrs, ro) {
    var group = owner;
    if (owner) {
        if (owner.getTabName() == null) {
            group = owner.info.group;
        }
        else {
            if (!owner.cfg) owner.cfg = getProp(owner.info.cfg, 'tab');
        }
    }
    if (!group && attrs.owner && attrs.owner.name && (attrs.owner.type == 'tab' || attrs.owner.type == 'gridcell')) {
        function Tab(attrs) {
            this.attrs = attrs;
        }
        Tab.prototype.getTabName = function() {
            return this.attrs.name;
        };
        Tab.prototype.getVisualClass = function() {
            return null;
        };
        group = this.tabs[attrs.owner.name];
        if (!group) {
            group = this.tabs[attrs.owner.name] = new Tab(attrs.owner);
            group.cfg = getProp(getAttrProp(obj, attrs.owner), 'tab');
        }
    }
    var cfg = ftype(attrs).cfg(attrs, obj);
    var view = this.newView(obj, attrs, shouldHide(cfg), ro || (!skinMode && cfg.ro));
    if (!view) return null;
    return this.addView(obj, owner, group, view, attrs, cfg, ro);
};
ViewController.prototype.addView = function(obj, owner, group, view, attrs, cfg, ro) {
    var v = view.info;
    v.obj = obj;
    v.attrs = attrs;
    v.ro = ro || view.isRO();
    v.cfg = cfg;
    v.owner = owner;
    v.group = group;
    if (this.needsSeparator && view.hasRow()) {
        v.separator = true;
        this.needsSeparator = false;
    }
    var idx = this.insertPlace++;
    if (attrs.order != null) {
        idx = attrs.order;
        if (idx < 0) {
            idx = this.views.length + idx + 1;
            if (idx < 0) idx = 0;
            --this.insertPlace;
        }
        else if (idx > this.views.length) {
            idx = this.views.length;
        }
    }
    this.views.splice(idx, 0, view);
    view.attach(this, obj);
    if (cfg.limit) {
        var limit = ftype(attrs).limit(attrs, cfg.limit);
        if (limit != null) view.setLimit(limit);
    }
    if (view.getTabName() != null) v.group = view;
    return view;
};
ViewController.prototype.showView = function(view, show) {
    var v = view.info;
    if (v.row) {
        if (show) {
            removeClass(v.row, 'hidden');
            this.readdTabs();
        }
        else {
            addClass(v.row, 'hidden');
            this.readdTabs();
        }
    }
};
ViewController.prototype.getTBody = function() {
    var v = this.current.info;
    if (!v.row) {
        v.row = el(this.table, 'tbody');
        if (v.owner) {
            var cls = v.owner.getVisualClass();
            if (cls != null) addClass(v.row, cls);
        }
    }
    return v.row;
}
ViewController.prototype.createRow = function(label, extra) {
    var tr = el(this.getTBody(), 'tr');
    if (skinMode) elc(tr, 'td', 'ctrl');
    var lbl = elc(tr, 'td', 'label');
    if (label) lbl.appendChild(label);
    if (extra != -1) {
        var extr = elc(tr, 'td', 'extra');
        if (extra) extr.appendChild(extra);
    }
    return tr;
};
ViewController.prototype.createSingleItemRow = function() {
    var tr = el(this.getTBody(), 'tr');
    var td = elc(tr, 'td', 'value');
    td.colSpan = 20;
    return td;
};
ViewController.prototype.addRow = function(label, extra, views, sep) {
    if (!(views instanceof Array)) views = [views];
    var ctrl = views[0].create(this, label);
    if (!ctrl) return;
    var labelNode = label ? label.getNode() : null;
    var tr = this.createRow(labelNode, extra);
    this.createSkinCntrl(this.current, tr.firstChild, labelNode);
    for (var i = 1; true; ++i) {
        var td = el(tr, 'td');
        td.appendChild(ctrl);
        var postfix = views[i - 1].getPostfix();
        if (postfix) txt(td, postfix);
        views[i - 1].realized();
        if (i == views.length) {
            td.className = 'value';
            td.colSpan = 20 - i * 2 + (extra == -1 ? 1 : 0);
            break;
        }
        td.className = 'tvalue';
        var td = elc(tr, 'td', 'tvalue');
        td.style.minWidth = '0';
        txt(td, sep);
        ctrl = views[i].create(this, label ? label.clone() : null);
    }
    if (!skinMode && this.current.info.cfg.note) {
        tr.firstChild.rowSpan = 2;
        tr.firstChild.nextSibling.rowSpan = 2;
        var tr = el(tr.parentNode, 'tr');
        var v = elc(tr, 'td', 'fvalue');
        v.colSpan = 18;
        v.innerHTML = this.current.info.cfg.note;
    }
    return tr.parentNode;
};
ViewController.prototype.createSkinCntrl = function(view, parent, label, noextra) {
    var v = view.info;
    if (!skinMode || !v.attrs.name) return;
    var extra = null;
    if (!noextra) {
        extra = el(null, 'img');
        extra.src = 'minimenu.png';
        extra.style.border = 'none';
        extra.style.padding = '0 3px 0 0';
        extra.style.verticalAlign = '-1px';
        parent.insertBefore(extra, parent.firstChild);
    }
    v.ctrl = new SkinCntrl(parent, v.cfg, label);
    if (!extra) return;

    function getActions() {
        var actions = {};
        if (!v.ro) {
            actions[1] = !v.cfg.ro ? 'Make Read Only' : 'Make Read/Write';
        }
        if (v.row) {
            actions[2] = v.cfg.note == null ? 'Add Note' : 'Remove Note';
        }
        if (!v.ro && ftype(v.attrs).deflimit(v.attrs) != null) {
            actions[3] = v.cfg.limit == null ? 'Add Limit' : 'Remove Limit';
        }
        if (v.obj && !me.status) {
            v.alias = me.getViewAliasPath(view);
            if (v.alias) actions[4] = 'Add To Status Page';
        }
        if (v.row) {
            if (!v.tab) actions[5] = 'Add Tab';
            if (!v.tab && !v.tab) actions[6] = 'Add Separator';
        }
        return actions;
    }
    var me = this;
    var onmouseup = function() {
        document.onmouseup = null;
        extra.src = 'minimenu.png';
        var menu = new PopupMenu(getActions);
        menu.onclick = function(id) {
            me.skinMenu(view, id);
        };
        menu.onshow = function(drop) {
            if (!drop) setTimeout(function() {
                menu.destroy();
            }, 1);
        };
        var pos = getElementPos(extra);
        menu.show(true, pos.x, pos.y + extra.offsetHeight);
        return false;
    };
    extra.onmousedown = function() {
        extra.src = 'minimenu-pressed.png';
        document.onmouseup = onmouseup;
        return false;
    };
    if (!v.row) return;
    v.noteChanged = function(value) {
        v.cfg.note = value;
        return true;
    };
    v.limitChanged = function(value) {
        var limit = ftype(v.attrs).limit(v.attrs, value);
        if (limit == null) return false;
        v.cfg.limit = value;
        view.setLimit(limit);
        return true;
    };
    if (v.cfg.ro) {
        view.makeRO(true);
    }
    if (v.cfg.note != null) {
        v.note = this.addSkinEntry(view, v.cfg.note, 'Note', v.noteChanged);
    }
    if (ftype(v.attrs).deflimit(v.attrs) != null && v.cfg.limit != null) {
        v.limit = this.addSkinEntry(view, v.cfg.limit, 'Limit', v.limitChanged);
    }
    var ondrag = function(e) {
        if (me.dragTimer) {
            clearTimeout(me.dragTimer);
            me.dragTimer = null;
            me.drag.style.display = 'block';
        }
        if (!me.dragging) {
            me.dragging = true;
            me.drag = el(null, 'table');
            me.drag.className = 'skindrag';
            me.drag.appendChild(v.row.cloneNode(true));
            document.body.appendChild(me.drag);
        }
        var pos = getPos(e);
        me.drag.style.left = (pos.x + 8) + 'px';
        me.drag.style.top = (pos.y + 8) + 'px';
        var rowHeight = v.row.offsetHeight;
        var height = window.innerHeight || document.documentElement.clientHeight;
        var y = pos.clientY;
        var dy = y < 0 ? y : (y > height ? y - height : 0);
        var row = null;
        var idx = -1;
        if (dy == 0) {
            var row = getEventSrc(e);
            while (row) {
                if (row.nodeName == 'TBODY' && hasClass(row.parentNode, 'list')) break;
                row = row.parentNode;
            }
            var src = null;
            for (var i in me.views) {
                var vi = me.views[i].info;
                if (vi.tab == row || vi.sep == row || vi.row == row) {
                    src = me.views[i];
                    idx = i;
                    break;
                }
            }
            if (src != null) {
                if (src == view) row = null;
                else if (src.info.tab) row = src.info.tab;
                else if (src.info.sep) row = src.info.sep;
            }
            else if (row == me.bottom) {
                idx = me.views.length;
            }
            else {
                row = null;
            }
        }
        if (me.dropTarget != row) {
            if (me.dropTarget) removeClass(me.dropTarget, 'droptarget');
            me.dropTarget = row;
            me.dropIndex = idx;
            if (me.dropTarget) addClass(me.dropTarget, 'droptarget');
        }
        if (dy != 0) {
            var scroll = function() {
                window.scrollBy(0, dy * 2);
                me.dragTimer = setTimeout(scroll, 100);
            };
            me.drag.style.display = 'none';
            me.dragTimer = setTimeout(scroll, 1);
        }
        return false;
    };
    var ondragover = function(e) {
        document.onmousemove = null;
        document.onmouseup = null;
        if (me.drag) {
            document.body.removeChild(me.drag);
            me.drag = null;
        }
        if (me.dropTarget) {
            removeClass(me.dropTarget, 'droptarget');
            var src = null;
            for (var i in me.views) {
                if (me.views[i] == view) {
                    src = i;
                    break;
                }
            }
            if (src != null) {
                v.row.parentNode.removeChild(v.row);
                me.dropTarget.parentNode.insertBefore(v.row, me.dropTarget);
                v.cfg.order = 0;
                if (src < me.dropIndex) --me.dropIndex;
                me.views.splice(src, 1);
                me.views.splice(me.dropIndex, 0, view);
                me.renumViews();
                me.readdTabs();
            }
            me.dropTarget = null;
        }
        me.dragging = false;
        return false;
    };
    v.row.onmousedown = function(e) {
        var src = getEventSrc(e);
        if (src.nodeName != 'TD' && src.nodeName != 'DIV') return true;
        document.onmousemove = ondrag;
        document.onmouseup = ondragover;
        return false;
    }
};
ViewController.prototype.getViewAliasPath = function(view) {
    var v = view.info;
    if (!v.attrs.name) return null;
    var obj = v.obj;
    var type = obj._type;
    while (type.owner) type = type.owner;
    var service = type.service;
    if (!service) return null;
    var path = '';
    if (service.group) path = service.group + ':';
    path += service.name + ':';
    path += type.title + ':';
    if (obj.ufe0001 != null) path += '*' + obj.ufe0001 + ':';
    if (v.group) path += v.group.getTabName() + ':';
    path += v.attrs.name;
    return path;
};
ViewController.prototype.skinMenu = function(view, id) {
    var v = view.info;
    switch (id) {
        case 1:
            v.cfg.ro = !v.cfg.ro;
            view.makeRO(v.cfg.ro);
            break;
        case 2:
            if (v.cfg.note == null) {
                v.cfg.note = '';
                v.note = this.addSkinEntry(view, '', 'Note', v.noteChanged);
            }
            else {
                if (v.note) v.note.parentNode.removeChild(v.note);
                v.note = null;
                v.cfg.note = null;
            }
            break;
        case 3:
            if (v.cfg.limit == null) {
                v.cfg.limit = '';
                v.limit = this.addSkinEntry(view, ftype(v.attrs).deflimit(v.attrs), 'Limit', v.limitChanged);
            }
            else {
                if (v.limit) v.limit.parentNode.removeChild(v.limit);
                v.limit = null;
                v.cfg.limit = null;
            }
            break;
        case 4:
            addToStatusPage(v.alias);
            break;
        case 5:
            if (v.tabByDefault) {
                delete v.cfg.tab;
                v.group.cfg._hide = 0;
            }
            else {
                getProp(v.cfg, 'tab')._hide = 0;
                v.cfg.tab.name = 'New Tab';
            }
            delete v.cfg.separator;
            this.readdTabs();
            break;
        case 6:
            if (v.separator) {
                delete v.cfg.separator;
            }
            else {
                getProp(v.cfg, 'separator')._hide = 0;
            }
            this.readdTabs();
            break;
    }
};
ViewController.prototype.addSkinEntry = function(view, value, title, cb) {
    if (!view.info.row) return;
    var tr = view.info.row.firstChild;
    var row = el(null, 'tr');
    elc(row, 'td', 'ctrl');
    var label = el(elc(row, 'td', 'flabel'), 'span', title);
    elc(row, 'td', 'fextra');
    var v = elc(row, 'td', 'fvalue');
    v.colSpan = 18;
    var entry = new TextArea(v, label);
    entry.setValue(value);
    var me = this;
    entry.onchange = cb;
    tr.parentNode.insertBefore(row, tr.nextSibling);
    entry.focus();
    return row;
};
ViewController.prototype.addDefaultSkinLine = function() {
    if (!skinMode || !this.mainType) return;
    var table = this.mainTable ? this.mainTable : this.table;
    var tbody = el(null, 'tbody');
    table.insertBefore(tbody, table.firstChild);
    var td = elc(el(tbody, 'tr'), 'td', 'value');
    td.colSpan = 21;
    td.style.padding = '4px 0';
    var cfg = getContainerProp(this.mainType);
    var bydef = new SkinCntrl(td, getProp(cfg, '*'), el(td, 'span', 'Show By Default'));
    var me = this;
    bydef.onclick = function(val) {
        var v = me.views;
        for (var i in v) {
            if (v[i].info.ctrl) v[i].info.ctrl.setDefault(val);
        }
    };
};
ViewController.prototype.createLine = function(n, before) {
    var table = before ? before.parentNode : this.table;
    var tbody = el(null, 'tbody');
    var tr = el(tbody, 'tr');
    if (skinMode) elc(tr, 'td', 'ctrl');
    var td = el(tr, 'td');
    td.colSpan = skinMode ? 19 : 20;
    td.className = 'sep';
    td.appendChild(n);
    table.insertBefore(tbody, before);
    return tbody;
}
ViewController.prototype.addSeparatorForNext = function() {
    this.needsSeparator = true;
};
ViewController.prototype.createSeparator = function(v) {
    var tbody = this.createLine(el(null, 'hr'), v.row);
    if (skinMode) {
        var rem = tbtn(tbody.firstChild.firstChild, '-');
        rem.parentNode.style.textAlign = 'right';
        rem.style.marginRight = '2px';
        rem.title = 'Remove';
        var me = this;
        rem.onclick = function(e) {
            v.sep.parentNode.removeChild(v.sep);
            v.sep = null;
            if (v.separator) {
                getProp(v.cfg, 'separator')._hide = 1;
            }
            else {
                delete v.cfg.separator;
            }
        };
    }
    return tbody;
};
ViewController.prototype.createTab = function(v) {
    if (typeof v.cfg.tab == 'string') {
        v.cfg.tab = {
            name: v.cfg.tab
        };
    }
    var tabcfg = v.cfg.tab;
    if (!tabcfg && v.group) tabcfg = v.group.cfg;
    if (!tabcfg) tabcfg = getProp(v.cfg, 'tab');
    var h = el(null, 'h2');
    var tbody = this.createLine(h, v.row);
    var name = v.group ? v.group.getTabName() : 'unknown';
    h.appendChild(viewLabel(tabcfg, name));
    if (skinMode) {
        var rem = tbtn(tbody.firstChild.firstChild, '-');
        rem.parentNode.style.textAlign = 'right';
        rem.style.marginRight = '2px';
        rem.title = 'Remove';
        var me = this;
        rem.onclick = function(e) {
            if (v.tabByDefault) {
                v.group.cfg._hide = 1;
            }
            else {
                delete v.cfg.tab;
            }
            me.readdTabs();
        };
    }
    return tbody;
};
ViewController.prototype.createGridCell = function() {
    var first = !this.mainTable;
    var tr;
    if (!this.mainTable) {
        this.mainTable = this.table;
        tr = el(el(this.table, 'tbody'), 'tr');
    }
    else {
        tr = this.table.parentNode.parentNode;
    }
    var td = el(tr, 'td');
    td.style.verticalAlign = 'top';
    td.style.width = '50%';
    this.table = elc(td, 'table', 'list');
    if (!first) td.style.paddingLeft = '2em';
    this.table.cellSpacing = 0;
    this.table.cellPadding = 0;
};
ViewController.prototype.getView = function(name, obj) {
    var best = null;
    for (var i in this.views) {
        var v = this.views[i].getView(name);
        if (v) {
            if (!best) best = v;
            if (!obj || this.views[i].info.obj == obj) return v;
        }
    }
    return best;
};
ViewController.prototype.getCondition = function(name) {
    return this.conds[name];
};
ViewController.prototype.getTable = function() {
    return this.table;
};

function SetupController(cfg) {
    ViewController.call(this, cfg);
    this.active = 0;
}
SetupController.prototype = inherit(ViewController.prototype);
SetupController.prototype.createPanes = function() {
    var views = [];
    var group = null;
    this.panes = [];
    for (var i in this.views) {
        var view = this.views[i];
        var v = view.info;
        if (!group) {
            group = v.group;
        }
        else if (v.group != group) {
            this.panes.push(views);
            views = [];
            group = v.group;
        }
        views.push(view);
        if (this.panes.length > 0) view.hide();
    }
    this.panes.push(views);
};
SetupController.prototype.show = function(idx) {
    if (this.active != idx) {
        var views = this.panes[this.active];
        for (var i in views) views[i].hide();
        var views = this.panes[idx];
        for (var i in views) views[i].show();
        this.active = idx;
    }
};
SetupController.prototype.save = function() {
    var views = this.panes[this.active];
    for (var i in views) {
        var v = views[i];
        if (!v.isVisible() || !v.isEnabled()) continue;
        var err = v.save(v.info.obj);
        if (err != null) {
            alert(err);
            return false;
        }
    }
    return true;
};

function LabelHolder(node) {
    this.node = node;
    this.states = [];
    this.lastClass = '';
}
LabelHolder.prototype.add = function(s) {
    this.states.push(s);
};
LabelHolder.prototype.destroy = function(s) {
    for (var i in this.states) {
        if (this.states[i] == s) {
            this.states.splice(i, 1);
            this.changed();
            break;
        }
    }
};
LabelHolder.prototype.changed = function() {
    var changed = false;
    var error = false;
    var disabled = 0;
    for (var i in this.states) {
        if (!this.states[i].isEnabled()) {
            ++disabled;
        }
        else {
            if (this.states[i].isError()) error = true;
            if (this.states[i].isChanged()) changed = true;
        }
    }
    var cls = '';
    if (disabled == this.states.length) {
        cls = 'disabled';
    }
    else if (error) {
        cls = 'error';
    }
    else if (changed) {
        cls = 'changed';
    }
    if (this.lastClass != cls) {
        if (this.lastClass != '') removeClass(this.node, this.lastClass);
        if (cls != '') addClass(this.node, cls);
        this.lastClass = cls;
    }
};
LabelHolder.prototype.getNode = function() {
    return this.node;
};

function Label(node, holder) {
    if (node) holder = new LabelHolder(node);
    this.label = holder;
    this.changed = false;
    this.error = false;
    this.enabled = true;
    this.label.add(this);
}
Label.prototype.clone = function() {
    return new Label(null, this.label);
};
Label.prototype.destroy = function() {
    this.label.destroy(this);
};
Label.prototype.enable = function(en) {
    if (this.enabled != en) {
        this.enabled = en;
        this.label.changed();
    }
};
Label.prototype.setOriginal = function() {
    this.changed = false;
    this.error = false;
    this.label.changed();
};
Label.prototype.setChanged = function() {
    this.changed = true;
    this.error = false;
    this.label.changed();
};
Label.prototype.setError = function() {
    this.changed = true;
    this.error = true;
    this.label.changed();
};
Label.prototype.setOriginalError = function() {
    this.changed = false;
    this.error = true;
    this.label.changed();
};
Label.prototype.isChanged = function() {
    return this.changed;
};
Label.prototype.isError = function() {
    return this.error;
};
Label.prototype.isEnabled = function() {
    return this.enabled;
};
Label.prototype.getNode = function() {
    return this.label.getNode();
};

function Listeners() {
    this.lstns = [];
}
Listeners.prototype.listen = function(l) {
    this.lstns.push(l);
    return this.lstns.length == 1;
};
Listeners.prototype.unlisten = function(l) {
    for (var i in this.lstns) {
        if (this.lstns[i] == l) {
            this.lstns.splice(i, 1);
            return this.lstns.length == 0;
        }
    }
    return false;
};
Listeners.prototype.notify = function(arg, arg2) {
    for (var i in this.lstns) {
        this.lstns[i](arg, arg2);
    }
};

function Ticker() {
    Listeners.call(this);
    var me = this;
    setInterval(function() {
        me.notify();
    }, 1000);
};
Ticker.prototype = inherit(Listeners.prototype);
var UndefinedLimit = {};

function View(attrs, ctrl) {
    this.attrs = attrs;
    this.ctrl = ctrl;
    this.visible = 1;
    this.limit = UndefinedLimit;
    this.info = {};
}
View.prototype.createRow = function(viewCtrl, cfg, obj) {
    var label = new Label(new viewLabel(cfg, this.attrs.title ? this.attrs.title : this.attrs.name));
    viewCtrl.addRow(label, null, this);
};
View.prototype.create = function(viewCtrl, label) {
    this.label = label;
    return this.ctrl;
};
View.prototype.realized = function() {};
View.prototype.getPostfix = function() {
    return this.attrs.postfix;
};
View.prototype.load = function(obj) {};
View.prototype.save = function(obj) {
    return null;
};
View.prototype.isChanged = function() {
    return this.isVisible() && this.label && this.label.isChanged();
};
View.prototype.getView = function(name) {
    if (this.attrs.secondname == name) return this;
    return this.attrs.name == name ? this : null;
};
View.prototype.getName = function() {
    return this.attrs.name;
};
View.prototype.getAttrs = function() {
    return this.attrs;
};
View.prototype.enable = function(en) {};
View.prototype.makeRO = function(ro) {};
View.prototype.setLimit = function(limit) {
    this.limit = limit;
};
View.prototype.findLimit = function(obj) {
    if (this.limit == UndefinedLimit) {
        this.limit = null;
        if (ftype(this.attrs).deflimit(this.attrs) != null) {
            var limitstr = ftype(this.attrs).cfg(this.attrs, obj).limit;
            if (limitstr) {
                this.limit = ftype(this.attrs).limit(this.attrs, limitstr);
            }
        }
    }
};
View.prototype.isEnabled = function() {
    return !this.label || this.label.isEnabled();
};
View.prototype.show = function() {
    if (++this.visible != 1) return;
    if (this.viewCtrl) this.viewCtrl.showView(this, true);
};
View.prototype.hide = function() {
    if (--this.visible != 0) return;
    if (this.viewCtrl) this.viewCtrl.showView(this, false);
};
View.prototype.readdTabs = function() {
    if (this.viewCtrl) this.viewCtrl.readdTabs();
};
View.prototype.isVisible = function() {
    return this.visible > 0;
};
View.prototype.hasRow = function() {
    return true;
};
View.prototype.getTabName = function() {
    return null;
};
View.prototype.getVisualClass = function() {
    return null;
};
View.prototype.isRO = function() {
    return false;
};
View.prototype.attach = function(viewCtrl, obj) {
    this.viewCtrl = viewCtrl;
}
View.prototype.destroy = function() {};
View.prototype.listen = function(l) {
    if (!this.lstns) this.lstns = new Listeners();
    this.lstns.listen(l);
};
View.prototype.unlisten = function(l) {
    this.lstns.unlisten(l);
};
View.prototype.notify = function() {
    if (this.lstns) this.lstns.notify();
};

function HiddenView(attrs) {
    View.call(this, attrs);
};
HiddenView.prototype = inherit(View.prototype);
HiddenView.prototype.createRow = function(viewCtrl, cfg) {};
HiddenView.prototype.load = function(obj) {
    this.value = ftype(this.attrs).get(this.attrs, obj);
    if (this.value == null) {
        var str = ftype(this.attrs).tostr(this.attrs, null);
        this.value = ftype(this.attrs).fromstr(this.attrs, str);
    }
    this.notify();
};
HiddenView.prototype.getValue = function() {
    return this.value;
};
HiddenView.prototype.isVisible = function() {
    return false;
};
HiddenView.prototype.hasRow = function() {
    return false;
};

function CustomView(attrs, onAttach, cb) {
    View.call(this, attrs);
    this.cb = cb;
    this.onAttach = onAttach;
    this.disabled = false;
    this.visible = 1;
}
CustomView.prototype = inherit(View.prototype);
CustomView.prototype.attach = function(viewCtrl, obj) {
    if (this.onAttach) this.ctrl = this.cb(viewCtrl, obj);
};
CustomView.prototype.createRow = function(viewCtrl, cfg, obj) {
    if (!this.onAttach) this.ctrl = this.cb(viewCtrl, cfg, obj);
}
CustomView.prototype.isVisible = function() {
    return this.visible > 0;
};
CustomView.prototype.show = function() {
    if (++this.visible != 1) return;
    if (this.ctrl) removeClass(this.ctrl, 'hidden');
};
CustomView.prototype.hide = function() {
    if (--this.visible != 0) return;
    if (this.ctrl) addClass(this.ctrl, 'hidden');
};
CustomView.prototype.getView = function(name) {
    return null;
};
CustomView.prototype.hasRow = function() {
    return false;
};

function AutoSetView(attrs, ro) {
    View.call(this, attrs);
    var me = this;
    this.cb = function() {
        if (me.loading) return;
        if (!me.view.isChanged()) return;
        if (me.attrs.confirm && !confirm(me.attrs.confirm)) {
            me.loading = true;
            me.view.load(me.obj);
            me.loading = false;
            return;
        }
        if (me.view.save(me.obj) == null) {
            me.loading = true;
            me.view.load(me.obj);
            me.obj._owner.setObject(me.obj);
            me.loading = false;
        }
    };
    this.view = ftype(attrs.c[0]).view(attrs.c[0], ro);
    this.view.listen(this.cb);
}
AutoSetView.prototype = inherit(View.prototype);
AutoSetView.prototype.createRow = function(viewCtrl, cfg, obj) {
    this.obj = obj;
    this.view.createRow(viewCtrl, cfg, this.obj);
};
AutoSetView.prototype.load = function(obj) {
    if (this.loading) return;
    this.loading = true;
    this.view.load(obj);
    this.loading = false;
};
AutoSetView.prototype.destroy = function() {
    this.view.unlisten(this.cb);
    this.view.destroy();
};
AutoSetView.prototype.getView = function(name) {
    if (this.attrs.name == name) return this.view;
    return this.view.getView(name);
};

function ContextButtonView(attrs) {
    View.call(this, attrs);
    this.owned = false;
    if (!attrs.doset) {
        this.cont = findContainer(attrs.group, normalize(attrs.open), attrs.tab ? normalize(attrs.tab) : null);
        if (attrs.link.length == 0) this.path = getPath(this.cont);
    }
}
ContextButtonView.prototype = inherit(View.prototype);
ContextButtonView.prototype.createRow = function(viewCtrl, cfg, obj) {
    this.obj = obj;
    this.cfg = cfg;
    if (this.attrs.doset) {
        current.hideToolbar();
    }
    else if (this.cont == null) {
        return;
    }
    if (this.owned) return;
    if (this.attrs.link.length == 0) {
        var type = obj._type;
        while (type.owner) type = type.owner;
        if (type.type == 'map') return;
    }
    this.ctrl = current.addButton(this.attrs.name, cfg, this.path);
    this.attachHandler(this.ctrl);
    viewCtrl.createSkinCntrl(this, this.ctrl, this.ctrl.firstChild, true);
};
ContextButtonView.prototype.create = function(viewCtrl, label) {
    if (this.cont == null && !this.attrs.doset) return null;
    var b = createButton(null, this.attrs.name, this.cfg, this.path);
    b.parentNode.style.cssFloat = 'right';
    this.attachHandler(b);
    this.ctrl = b.parentNode;
    return this.ctrl;
};
ContextButtonView.prototype.owner = function() {
    this.owned = true;
};
ContextButtonView.prototype.attachHandler = function(b) {
    if (this.attrs.doset) {
        var me = this;
        b.onclick = function(e) {
            if (me.disabled || isSkinEvent(e)) return true;
            if (me.viewCtrl.save()) {
                me.obj._owner.setObject(me.obj);
                me.viewCtrl.load();
            }
        };
        return;
    }
    if (this.path && !this.attrs.autostart) return;
    var me = this;

    function confirmOpenContent(path) {
        if (me.viewCtrl.isChanged()) {
            var res = confirm('There are pending changes, is it OK to apply them?');
            if (res) {
                if (me.viewCtrl.save()) {
                    me.obj._owner.setObject(me.obj);
                }
            }
        }
        openContent(path);
    }
    b.onclick = function(e) {
        if (me.disabled || isSkinEvent(e)) return true;
        var attrs = me.attrs;
        var obj = me.obj;
        var c = getContainer(me.cont);
        if (!attrs.tab || (attrs.id == null && attrs.link.length == 0)) {
            confirmOpenContent(c.getPath());
            return;
        }
        var dst;
        if (attrs.id) {
            var id = getAttr(obj._type, attrs.id);
            dst = c.getObject(ftype(id).get(id, obj));
            if (!dst) return;
        }
        else {
            dst = c.getObject();
        }
        if (!convert(attrs.link, obj, dst, me.viewCtrl)) return;
        if (attrs.autostart) {
            if (c.autostart(dst)) {
                if (attrs.autoclose) {
                    var type = obj._type;
                    while (type.owner) type = type.owner;
                    confirmOpenContent(getPath(type.service));
                }
                return;
            }
        }
        var path = c.getPath(dst);
        if (path != null) confirmOpenContent(path);
    };
};
ContextButtonView.prototype.enable = function(en) {
    if (this.disabled == !en) return;
    var b = this.ctrl.firstChild;
    if (en) {
        removeClass(b, 'disabled');
    }
    else {
        addClass(b, 'disabled');
    }
    this.disabled = !en;
};
ContextButtonView.prototype.show = function() {
    if (++this.visible != 1) return;
    this.ctrl.style.display = 'inline';
};
ContextButtonView.prototype.hide = function() {
    if (--this.visible != 0) return;
    this.ctrl.style.display = 'none';
};
ContextButtonView.prototype.getView = function(name) {
    return null;
};
ContextButtonView.prototype.hasRow = function() {
    return false;
};

function ToolbarView(attrs) {
    View.call(this, attrs);
    this.buttons = [];
}
ToolbarView.prototype = inherit(View.prototype);
ToolbarView.prototype.attach = function(viewCtrl, obj) {
    View.prototype.attach.call(this, viewCtrl, obj);
    for (var i in this.attrs.c) {
        var v = viewCtrl.createView(obj, this, this.attrs.c[i], true);
        v.owner(this);
        this.buttons.push(v);
    }
};
ToolbarView.prototype.createRow = function(viewCtrl, cfg, obj) {
    viewCtrl.addRow(null, null, this);
};
ToolbarView.prototype.create = function(viewCtrl, label) {
    this.ctrl = elc(null, 'ul', 'toolbar');
    for (var i = this.buttons.length - 1; i >= 0; --i) {
        var b = this.buttons[i].create(viewCtrl, null);
        if (b) this.ctrl.appendChild(b);
    }
    return this.ctrl;
};
ToolbarView.prototype.getView = function(name) {
    return null;
};
ToolbarView.prototype.hasRow = function() {
    return true;
};

function TextView(attrs, ctrl, inp) {
    if (!ctrl) ctrl = input(null);
    if (!inp) inp = new TextInput(ctrl);
    View.call(this, attrs, ctrl);
    this.inp = inp;
    this.disabled = false;
    var me = this;
    this.inp.onchange = function(value) {
        me.changed(value);
    };
}
TextView.prototype = inherit(View.prototype);
TextView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    var me = this;
    this.lstn = function() {
        me.update();
    };
    ftype(this.attrs).listen(this.attrs, this.lstn);
    if (this.disabled) this.inp.setEnabled(!this.disabled);
    return this.ctrl;
};
TextView.prototype.destroy = function() {
    ftype(this.attrs).unlisten(this.attrs, this.lstn);
};
TextView.prototype.load = function(obj) {
    this.findLimit(obj);
    this.value = ftype(this.attrs).get(this.attrs, obj);
    this.label.setOriginal();
    this.update();
    this.notify();
};
TextView.prototype.save = function(obj) {
    var val = ftype(this.attrs).fromstr(this.attrs, this.inp.getValue(), this.limit);
    if (val == null) return "Invalid value in " + this.getName();
    ftype(this.attrs).put(this.attrs, obj, val);
    return null;
};
TextView.prototype.getValue = function() {
    return ftype(this.attrs).fromstr(this.attrs, this.inp.getValue());
};
TextView.prototype.enable = function(en) {
    this.label.enable(en);
    this.inp.setEnabled(en && !this.disabled);
};
TextView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    if (this.inp) this.enable(this.isEnabled());
};
TextView.prototype.setLimit = function(limit) {
    this.limit = limit;
    if (this.label && this.label.isChanged()) {
        this.changed(this.inp.getValue());
    }
    else if (this.value != null) {
        this.update();
    }
};
TextView.prototype.update = function() {
    if (!this.label.isChanged()) {
        var str = ftype(this.attrs).tostr(this.attrs, this.value);
        if (this.inp.getValue() != str) this.inp.setValue(str);
        this.text = str;
        if (ftype(this.attrs).fromstr(this.attrs, str, this.limit) == null) {
            this.label.setOriginalError();
        }
        else {
            this.label.setOriginal();
        }
    }
};
TextView.prototype.changed = function(value) {
    if (ftype(this.attrs).fromstr(this.attrs, value, this.limit) != null) {
        this.label.setChanged();
    }
    else {
        this.label.setError();
    }
    this.notify();
};

function TextAreaView(attrs) {
    var inp = new TextArea();
    TextView.call(this, attrs, inp.getElement(), inp);
}
TextAreaView.prototype = inherit(TextView.prototype);

function SecretView(attrs) {
    var hide = !attrs.private && hidePasswords;
    TextView.call(this, attrs, input(null, hide ? 'password' : 'text'));
    this.prefs = getPrefs(attrs._type);
}
SecretView.prototype = inherit(TextView.prototype);
SecretView.prototype.create = function(viewCtrl, label) {
    var me = this;
    this.onHide = function() {
        var parent = me.ctrl.parentNode;
        var next = me.ctrl.nextSibling;
        var value = me.inp.getValue();
        TextView.prototype.destroy.call(me);
        parent.removeChild(me.ctrl);
        var hide = me.hideBox ? me.hideBox.checked : hidePasswords;
        me.ctrl = input(null, hide ? 'password' : 'text');
        me.inp.setElement(me.ctrl);
        TextView.prototype.create.call(me, viewCtrl, me.label);
        if (next) {
            parent.insertBefore(me.ctrl, next);
        }
        else {
            parent.appendChild(me.ctrl);
        }
        me.inp.setValue(value);
        me.prefs[me.attrs.id] = hide ? '1' : '';
        setPrefs(me.prefs);
    };
    var field = TextView.prototype.create.call(this, viewCtrl, label);
    if (this.attrs.private) {
        var pane = el(null, 'span');
        pane.appendChild(field);
        pane.appendChild(txt(null, " "));
        var box = el(pane, 'span');
        box.className = 'checkbox';
        this.hideBox = el(null, 'input');
        this.hideBox.type = 'checkbox';
        box.appendChild(this.hideBox);
        var hideLabel = el(null, 'span', 'Hide');
        box.appendChild(hideLabel);
        var me = this;
        hideLabel.onclick = function() {
            me.hideBox.checked = !me.hideBox.checked;
            me.onHide();
        };
        this.hideBox.onchange = function() {
            me.onHide();
        };
        if (this.prefs[this.attrs.id]) {
            this.hideBox.checked = 1;
            this.onHide();
        }
        return pane;
    }
    hidePasswordsLstn.listen(this.onHide);
    return field;
};
SecretView.prototype.destroy = function() {
    hidePasswordsLstn.unlisten(this.onHide);
    return TextView.prototype.destroy.call(this);
};

function ROTextView(attrs, rows) {
    View.call(this, attrs, elc(null, 'span', 'rovalue'));
    this.rows = rows;
}
ROTextView.prototype = inherit(View.prototype);
ROTextView.prototype.createRow = function(viewCtrl, cfg) {
    if (this.attrs.name) {
        return View.prototype.createRow.call(this, viewCtrl, cfg);
    }
    var td = viewCtrl.createSingleItemRow();
    td.appendChild(this.create(viewCtrl));
};
ROTextView.prototype.create = function(viewCtrl, label) {
    var me = this;
    this.lstn = function() {
        me.update();
    }
    ftype(this.attrs).listen(this.attrs, this.lstn);
    return View.prototype.create.call(this, viewCtrl, label);
};
ROTextView.prototype.destroy = function() {
    ftype(this.attrs).unlisten(this.attrs, this.lstn);
};
ROTextView.prototype.getPostfix = function() {
    return null;
};
ROTextView.prototype.getValue = function() {
    return this.value;
};
ROTextView.prototype.load = function(obj) {
    this.value = ftype(this.attrs).get(this.attrs, obj);
    this.update();
    this.notify();
};
ROTextView.prototype.save = function(obj) {
    return null;
};
ROTextView.prototype.isChanged = function() {
    return false;
};
ROTextView.prototype.enable = function(en) {};
ROTextView.prototype.update = function() {
    if (this.value == null && this.attrs.hold) return;
    var str = ftype(this.attrs).tostr(this.attrs, this.value);
    if (str == null) str = '';
    if (str != '' && this.attrs.postfix) str += ' ' + this.attrs.postfix;
    if (str == '') str = ' ';
    if (this.rows == null) {
        replaceText(this.ctrl, str);
    }
    else {
        var lines = str.split('\n');
        if (lines.length <= 1 && !this.multiline) {
            replaceText(this.ctrl, str);
        }
        else {
            clearNodes(this.ctrl);
            for (var i in lines) {
                var l = lines[i];
                if (l == '') l = ' ';
                el(this.ctrl, 'div', l);
            }
            this.multiline = true;
        }
    }
};
ROTextView.prototype.isRO = function() {
    return true;
};

function ROSecretView(attrs) {
    ROTextView.call(this, attrs);
}
ROSecretView.prototype = inherit(ROTextView.prototype);
ROSecretView.prototype.create = function(viewCtrl, label) {
    var me = this;
    this.onHide = function() {
        me.update();
    };
    hidePasswordsLstn.listen(this.onHide);
    return ROTextView.prototype.create.call(this, viewCtrl, label);
};
ROSecretView.prototype.destroy = function() {
    hidePasswordsLstn.unlisten(this.onHide);
    return ROTextView.prototype.destroy.call(this);
};
ROSecretView.prototype.update = function() {
    var v = this.value;
    if (hidePasswords && v) v = v.replace(/./g, '*');
    if (v && v.length > 0) {
        replaceText(this.ctrl, v);
    }
    else {
        replaceText(this.ctrl, ' ');
    }
};

function ROPreTextView(attrs) {
    ROTextView.call(this, attrs, 1);
    this.ctrl.className = 'roprevalue';
}
ROPreTextView.prototype = inherit(ROTextView.prototype);

function ROOptTextView(attrs) {
    ROTextView.call(this, attrs);
}
ROOptTextView.prototype = inherit(ROTextView.prototype);
ROOptTextView.prototype.update = function() {
    if (this.value && ftype(this.attrs).hasValue(this.attrs, this.value)) {
        var str = ftype(this.attrs).tostr(this.attrs, this.value);
        if (str != '' && this.attrs.postfix) str += ' ' + this.attrs.postfix;
        replaceText(this.ctrl, str);
    }
    else {
        replaceText(this.ctrl, ' ');
    }
};

function OptView(attrs, view) {
    View.call(this, attrs);
    if (!view) view = new TextView(attrs);
    this.view = view;
    this.opt = true;
}
OptView.prototype = inherit(View.prototype);
OptView.prototype.createRow = function(viewCtrl, cfg, obj) {
    var label = new Label(viewLabel(cfg, this.attrs.name));
    viewCtrl.addRow(label, this.createButton(), this);
};
OptView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    var c = el(null, 'div');
    c.style.position = 'relative';
    c.style.left = '0';
    c.style.top = '0';
    this.inp = this.view.create(viewCtrl, label.clone());
    c.appendChild(this.inp);
    if (this.attrs.postfix) {
        txt(c, this.attrs.postfix);
    }
    else if (this.attrs.c && this.attrs.c[0].postfix) {
        txt(c, this.attrs.c[0].postfix);
    }
    if (this.attrs.showdef) {
        this.curtain = el(c, 'div');
        this.curtain.className = 'curtain';
        this.curtain.style.zIndex = '2';
        this.defval = elc(this.curtain, 'span', 'defval');
    }
    this.ctrl = c;
    if (this.bttn == null) {
        c.style.display = 'inline';
        var r = el(null, 'span');
        r.appendChild(this.createButton());
        r.appendChild(c);
        return r;
    }
    return c;
};
OptView.prototype.createButton = function() {
    this.bttn = imgbtn(null);
    var me = this;
    this.bttn.onclick = function() {
        if (me.label.isEnabled()) {
            me.showCurtain(!me.opt, true);
            me.label.setChanged();
        }
    };
    return this.bttn;
};
OptView.prototype.realized = function() {
    this.view.realized();
};
OptView.prototype.getPostfix = function() {
    return null;
};
OptView.prototype.getView = function(name) {
    if (this.attrs.name == name) return this;
    return this.view.getView(name);
};
OptView.prototype.load = function(obj) {
    var t = ftype(this.attrs);
    var val = t.get(this.attrs, obj);
    if (this.limit == undefined) {
        this.limit = null;
        if (t.deflimit(this.attrs) != null) {
            var limitstr = ftype(this.attrs).cfg(this.attrs, obj).limit;
            if (limitstr) this.limit = t.limit(this.attrs, limitstr);
        }
    }
    if (val != null && t.hasValue(this.attrs, val)) {
        this.view.load(obj);
        this.showCurtain(false, false);
    }
    else {
        this.view.load({
            _type: obj._type
        });
        if (this.attrs.showdef && obj._type.def) {
            var str = '';
            var d = obj[obj._type.def];
            if (d) {
                var val = t.get(this.attrs, d);
                if (val) str = t.tostr(this.attrs, val);
            }
            replaceText(this.defval, str);
        }
        this.showCurtain(true, false);
    }
    this.label.setOriginal();
};
OptView.prototype.save = function(obj) {
    if (this.attrs.type == 'opt') {
        ftype(this.attrs).put(this.attrs, obj, this.opt ? null : types.opt.VALUE);
    }
    else if (this.opt) {
        ftype(this.attrs).put(this.attrs, obj, null);
    }
    if (!this.opt) return this.view.save(obj);
    return null;
};
OptView.prototype.getValue = function() {
    if (this.attrs.type == 'opt') return !this.opt;
    return this.view.getValue();
};
OptView.prototype.show = function() {
    this.view.show();
    View.prototype.show.call(this);
};
OptView.prototype.hide = function() {
    this.view.hide();
    View.prototype.hide.call(this);
};
OptView.prototype.enable = function(en) {
    if (!this.opt) this.view.enable(en);
    this.label.enable(en);
    this.bttn.firstChild.src = this.getButtonImg();
    this.bttn.className = en ? 'sbtn' : 'sbtn_disabled';
};
OptView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    this.view.makeRO(ro);
    this.enable(this.isEnabled());
};
OptView.prototype.setLimit = function(limit) {
    this.limit = limit;
    if (!this.opt) this.view.setLimit(limit);
};
OptView.prototype.isChanged = function() {
    if (!this.opt && this.view.isChanged()) return true;
    return View.prototype.isChanged.call(this);
};
OptView.prototype.showCurtain = function(opt, focus) {
    if (opt) {
        this.view.enable(false);
        if (this.curtain) this.curtain.style.visibility = 'visible';
        this.inp.style.visibility = 'hidden';
        if (this.curtain && this.curtain.parentNode.offsetHeight) {
            this.curtain.style.height = this.defval.style.lineHeight = (this.curtain.parentNode.offsetHeight + 2) + 'px';
        }
        this.view.setLimit(null);
    }
    else {
        this.view.enable(this.label.isEnabled());
        if (this.curtain) this.curtain.style.visibility = 'hidden';
        this.inp.style.visibility = 'visible';
        if (focus) this.inp.focus();
        this.view.setLimit(this.limit);
    }
    this.opt = opt;
    this.bttn.firstChild.src = this.getButtonImg();
    this.notify();
};
OptView.prototype.getButtonImg = function() {
    if (this.label.isEnabled() && !this.disabled) {
        return this.opt ? 'down.png' : 'up.png';
    }
    return this.opt ? 'down-gray.png' : 'up-gray.png';
};
OptView.prototype.destroy = function() {
    this.view.destroy();
};

function getOptionIndex(ctrl, id) {
    for (var i = 0; i < ctrl.options.length; ++i) {
        if (ctrl.options[i].value == id) return i;
    }
    return -1;
}

function binarySearch(a, val, lessCmp) {
    var len = a.length;
    var first = 0;
    while (len > 0) {
        var half = len >> 1;
        var middle = first + half;
        if (lessCmp(a[middle], val)) {
            first = middle + 1;
            len = len - half - 1;
        }
        else {
            len = half;
        }
    }
    return first;
}

function fillOptions(ctrl, values, sort, obj, viewCtrl, filter, cb) {
    var type = enm[values.type];
    var newOpt = function(id) {
        var opt = el(null, 'option');
        opt.value = id;
        opt.text = type.toString(id, values, obj);
        var color = type.getColor(values, id);
        if (color != null) opt.style.color = color;
        var idx = ctrl.options.length;
        if (sort) {
            idx = binarySearch(ctrl.options, opt, function(a, b) {
                return a.text < b.text;
            });
        }
        try {
            var next = idx < ctrl.options.length ? ctrl.options[idx] : null;
            ctrl.add(opt, next);
        }
        catch (e) {
            ctrl.add(opt, idx);
        }
        return idx;
    };
    var lstn = function(obj, more) {
        var id = obj.ufe0001;
        var idx = getOptionIndex(ctrl, id);
        if (obj.ufe0013) {
            if (idx != -1) ctrl.removeChild(ctrl.options[idx]);
        }
        else if (idx != -1) {
            var str = type.toString(id, values, obj);
            if (filter && !filter(str)) {
                ctrl.removeChild(ctrl.options[idx]);
            }
            else {
                ctrl.options[idx].text = str;
            }
        }
        else {
            if (filter) {
                if (!filter(type.toString(id, values, obj))) return;
            }
            var idx = newOpt(id);
            if (cb) cb(id, idx, more);
        }
    };
    type.listen(values, lstn, viewCtrl, obj);
    var map = type.getMap(values, obj);
    for (var i in map) {
        if (map[i] != '' && (!filter || filter(map[i]))) newOpt(i);
    }
    return lstn;
}

function refillOptions(lstn, values, obj) {
    var type = enm[values.type];
    var map = type.getMap(values, obj);
    for (var i in map) {
        if (map[i] != '') lstn({
            ufe0001: i
        });
    }
}

function RadioView(attrs) {
    View.call(this, attrs);
    this.id = 'radio' + (++RadioView.prototype.count);
}
RadioView.prototype = inherit(View.prototype);
RadioView.prototype.count = 0;
RadioView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    this.ctrl = el(null, 'span');
    return this.ctrl;
};
RadioView.prototype.load = function(obj) {
    this.findLimit(obj);
    if (this.radios == null) this.addButtons();
    var oldValue = this.value;
    this.value = ftype(this.attrs).get(this.attrs, obj);
    if (this.value == null) this.value = this.attrs.def || 0;
    if (!this.radios[this.value]) this.value = getfirst(this.radios);
    if (this.value != null) {
        this.radios[this.value].checked = 1;
        this.label.setOriginal();
    }
    if (oldValue != this.value) this.notify();
};
RadioView.prototype.save = function(obj) {
    ftype(this.attrs).put(this.attrs, obj, this.getValue());
};
RadioView.prototype.enable = function(en) {
    this.label.enable(en);
    var disabled = !en || this.disabled;
    for (var i in this.radios) this.radios.disabled = disabled;
};
RadioView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    if (this.ctrl) this.enable(this.isEnabled());
};
RadioView.prototype.setLimit = function(limit) {
    this.limit = limit;
    clearNodes(this.ctrl);
    this.addButtons();
    if (this.radios[this.value]) {
        this.radios[this.value].checked = 1;
    }
};
RadioView.prototype.getValue = function() {
    return this.value;
};
RadioView.prototype.updateValue = function() {
    this.updating = true;
    for (var i in this.radios) {
        if (this.radios[i].checked) {
            this.value = parseInt(i);
            break;
        }
    }
    this.updating = false;
};
RadioView.prototype.addButtons = function() {
    var values = this.attrs.values;
    this.radios = {};
    var map = enm[values.type].getMap(values, null);
    for (var i in map) {
        if (map[i] == '') continue;
        this.addButton(i, map[i]);
    }
};
RadioView.prototype.addButton = function(id, name) {
    if (this.limit && this.limit.prefixes && !(hasOneOfPrefixes(this.limit.prefixes, name) ^ this.limit.invert)) {
        return;
    }
    var e = elc(this.ctrl, 'span', 'radio');
    var btn = input(null, 'radio');
    e.appendChild(btn);
    btn.name = this.id;
    txt(e, name);
    var me = this;
    btn.onchange = function() {
        if (!me.updating) {
            me.label.setChanged();
            me.updateValue();
            me.notify();
        }
    };
    e.onclick = function() {
        btn.checked = 1;
        me.label.setChanged();
        me.updateValue();
        me.notify();
    };
    this.radios[id] = btn;
};

function EnumView(attrs) {
    View.call(this, attrs);
    this.disabled = false;
}
EnumView.prototype = inherit(View.prototype);
EnumView.prototype.createRow = function(viewCtrl, cfg, obj) {
    function isbigger(l, sz) {
        for (var i in l) {
            if (--sz < 0) return false;
        }
        return true;
    }
    if (this.attrs.selector) {
        var values = this.attrs.values;
        var label = new Label(new viewLabel(cfg, this.attrs.name));
        var c = null;
        var map = enm[values.type].getMap(values, obj);
        if (isbigger(map, 1)) {
            c = txt(null, enm[values.type].toString(getfirst(map), values, obj));
        }
        else {
            c = this.create(viewCtrl, label);
        }
        current.setCustomTitle(c, this.attrs.postfix || '');
    }
    else {
        View.prototype.createRow.call(this, viewCtrl, cfg, obj);
    }
};
EnumView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    this.viewCtrl = viewCtrl;
    this.ctrl = el(elc(null, 'span', 'select'), 'select');
    this.ctrl.size = 1;
    var me = this;
    this.ctrl.onchange = function(e) {
        me.value = null;
        me.autoSelected = false;
        me.label.setChanged();
        me.notify();
    };
    if (this.disabled) this.ctrl.disabled = true;
    return this.ctrl.parentNode;
};
EnumView.prototype.load = function(obj) {
    this.findLimit(obj);
    if (this.ctrl && !this.lstn) {
        var me = this;
        var filter = function(str) {
            if (!me.limit || !me.limit.prefixes) return true;
            return !!(hasOneOfPrefixes(me.limit.prefixes, str) ^ me.limit.invert);
        };
        this.obj = obj;
        this.lstn = fillOptions(this.ctrl, this.attrs.values, !this.attrs.sortbyvalue, obj, this.viewCtrl, filter, function(id, idx, more) {
            me.fillingIn = more;
            if (me.value == id) {
                me.autoSelected = true;
                me.ctrl.selectedIndex = idx;
                me.notify();
            }
            else if (me.value != null && !me.autoSelected && !more) {
                me.autoSelected = true;
                me.ctrl.selectedIndex = 0;
                me.notify();
            }
        });
    }
    var oldValue = this.value;
    this.value = ftype(this.attrs).get(this.attrs, obj);
    if (this.value == null) this.value = this.attrs.def || 0;
    if (this.ctrl) {
        var idx = getOptionIndex(this.ctrl, this.value);
        if (this.ctrl.selectedIndex != idx && idx != -1) {
            this.ctrl.selectedIndex = idx;
            oldValue = this.value;
            this.notify();
        }
        if (idx != -1) {
            this.label.setOriginal();
            this.autoSelected = true;
        }
        else if (this.ctrl.options.length > 0 && !this.fillingIn) {
            this.autoSelected = true;
            this.ctrl.selectedIndex = 0;
            oldValue = this.value;
            this.notify();
        }
    }
    if (oldValue != this.value) this.notify();
};
EnumView.prototype.save = function(obj) {
    if (!this.ctrl) return null;
    var idx = this.ctrl.selectedIndex;
    if (idx != -1) {
        ftype(this.attrs).put(this.attrs, obj, parseInt(this.ctrl.options[idx].value));
        return null;
    }
    return "Invalid value in " + this.getName();
};
EnumView.prototype.enable = function(en) {
    if (this.ctrl) {
        this.label.enable(en);
        this.ctrl.disabled = !en || this.disabled;
    }
};
EnumView.prototype.makeRO = function(ro) {
    if (this.ctrl) {
        this.disabled = ro;
        if (this.ctrl) this.enable(this.isEnabled());
    }
};
EnumView.prototype.setLimit = function(limit) {
    this.limit = limit;
    if (this.lstn) refillOptions(this.lstn, this.attrs.values, this.obj);
};
EnumView.prototype.getValue = function() {
    if (!this.ctrl) return this.value;
    var idx = this.ctrl.selectedIndex;
    if (idx == -1) return 0;
    return parseInt(this.ctrl.options[idx].value);
};
EnumView.prototype.destroy = function() {
    if (this.lstn) {
        enm[this.attrs.values.type].unlisten(this.attrs.values, this.lstn, this.obj);
    }
};

function ComboView(attrs) {
    var ctrl = elc(null, 'span', 'cbox');
    this.slc = el(ctrl, 'select');
    this.slc.size = 1;
    this.slc.tabindex = 0;
    this.fld = input(ctrl);
    TextView.call(this, attrs, ctrl, new TextInput(this.fld));
}
ComboView.prototype = inherit(TextView.prototype);
ComboView.prototype.isFirefox = navigator.userAgent.search("Firefox") != -1;
ComboView.prototype.realized = function() {
    var extra = this.isFirefox ? 3 : 0;
    this.fld.style.width = (this.slc.offsetWidth - this.slc.offsetHeight - 2) + extra + 'px';
    this.fld.style.height = (this.slc.offsetHeight - 4) + 'px';
};
ComboView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    this.viewCtrl = viewCtrl;
    var me = this;
    this.slc.onchange = function(e) {
        var values = me.attrs.values;
        var val = enm[values.type].toString(me.slc.value, values);
        me.inp.setValue(val);
        me.changed(val.toString());
        me.fld.focus();
    };
    this.slc.onfocus = function(e) {
        me.slc.selectedIndex = -1;
        if (!me.blocked) me.fld.focus();
    };
    this.slc.onmousedown = function(e) {
        document.onmouseup = function() {
            document.onmouseup = null;
            me.blocked = false;
            return false;
        };
        me.blocked = true;
        return true;
    };
    this.slc.onmouseup = function(e) {
        document.onmouseup = null;
        me.blocked = false;
        return false;
    };
    if (this.disabled) this.enable(false);
    return this.ctrl;
};
ComboView.prototype.load = function(obj) {
    if (!this.lstn) {
        this.obj = obj;
        var me = this;
        var filter = function(str) {
            if (!me.limit) return true;
            return ftype(me.attrs).fromstr(me.attrs, str, me.limit) != null;
        };
        var cb = function(id, idx) {
            me.update();
        };
        this.lstn = fillOptions(this.slc, this.attrs.values, !this.attrs.sortbyvalue, obj, this.viewCtrl, filter, cb);
    }
    this.slc.selectedIndex = -1;
    TextView.prototype.load.call(this, obj);
};
ComboView.prototype.enable = function(en) {
    TextView.prototype.enable.call(this, en);
    this.slc.disabled = !en;
};
ComboView.prototype.destroy = function() {
    if (this.lstn) {
        enm[this.attrs.values.type].unlisten(this.attrs.values, this.lstn);
    }
};
ComboView.prototype.setLimit = function(limit) {
    TextView.prototype.setLimit.call(this, limit);
    if (this.lstn) refillOptions(this.lstn, this.attrs.values, this.obj);
};
ComboView.prototype.changed = function(value) {
    TextView.prototype.changed.call(this, value);
    this.slc.selectedIndex = -1;
};

function SetView(attrs, ro) {
    View.call(this, attrs);
    this.boxes = {};
    this.items = 0;
    this.disabled = ro;
}
SetView.prototype = inherit(View.prototype);
SetView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    this.viewCtrl = viewCtrl;
    this.ctrl = elc(null, 'table', 'checkbox');
    return this.ctrl;
};
SetView.prototype.getValue = function() {
    var set = 0;
    for (var i in this.boxes) {
        if (this.boxes[i].checked) set |= 1 << parseInt(i);
    }
    return set;
};
SetView.prototype.load = function(obj) {
    this.findLimit(obj);
    this.obj = obj;
    if (!this.lstn) {
        var values = this.attrs.values;
        var type = enm[values.type];
        var me = this;
        this.lstn = function(obj) {
            var id = obj.ufe0001;
            if (!me.boxes[id]) me.addItem(id, obj);
        };
        type.listen(values, this.lstn, this.viewCtrl);
        var map = type.getMap(values, obj);
        for (var i in map) {
            if (map[i] != '') this.addItem(i, obj);
        }
    }
    this.value = ftype(this.attrs).get(this.attrs, obj);
    if (this.value == null && this.attrs.def) {
        this.value = [this.attrs.def];
    }
    if (this.value) {
        for (var i in this.boxes) {
            this.boxes[i].checked = (this.value[0] & (1 << parseInt(i))) != 0;
        }
    }
    this.label.setOriginal();
    this.notify();
};
SetView.prototype.save = function(obj) {
    var set = 0;
    var unset = 0;
    for (var i in this.boxes) {
        if (this.boxes[i].checked) {
            set |= 1 << parseInt(i);
        }
        else {
            unset |= 1 << parseInt(i);
        }
    }
    ftype(this.attrs).put(this.attrs, obj, [set, unset]);
    return null;
};
SetView.prototype.enable = function(en) {
    for (var i in this.boxes) this.boxes[i].disabled = !en || this.disabled;
    this.label.enable(en);
};
SetView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    this.enable(this.isEnabled());
};
SetView.prototype.setLimit = function(limit) {
    this.limit = limit;
    if (this.value) {
        for (var i in this.boxes) {
            if (this.boxes[i].checked) this.value[0] |= 1 << parseInt(i);
            else this.value[0] &= ~(1 << parseInt(i));
        }
    }
    this.items = 0;
    clearNodes(this.ctrl);
    var values = this.attrs.values;
    var map = enm[values.type].getMap(values, this.obj);
    for (var i in map) {
        if (map[i] != '') this.addItem(i, this.obj);
    }
};
SetView.prototype.destroy = function() {
    if (this.lstn) {
        enm[this.attrs.values.type].unlisten(this.attrs.values, this.lstn);
    }
};
SetView.prototype.addItem = function(id, obj) {
    var values = this.attrs.values;
    var type = enm[values.type];
    var str = type.toString(id, values, obj);
    if (this.limit && this.limit.prefixes && !(hasOneOfPrefixes(this.limit.prefixes, str) ^ this.limit.invert)) {
        return;
    }
    var parent = this.ctrl;
    if (!this.attrs.small || this.attrs.columns) {
        if (this.items % (this.attrs.columns || 2) == 0) {
            this.lastRow = el(el(this.ctrl, 'tbody'), 'tr');
        }
    }
    else {
        if (!this.lastRow) this.lastRow = el(el(this.ctrl, 'tbody'), 'tr');
    }
    parent = el(this.lastRow, 'td');
    var box = el(null, 'input');
    box.type = 'checkbox';
    parent.appendChild(box);
    var lbl = el(parent, 'span', str + ' ');
    box.checked = this.value && ((this.value[0] & (1 << id)) != 0);
    if (this.disabled) box.disabled = true;
    var me = this;
    box.onchange = function() {
        me.label.setChanged();
        me.notify();
    };
    lbl.onclick = function() {
        box.checked = !box.checked;
        me.label.setChanged();
        me.notify();
    };
    this.boxes[id] = box;
    ++this.items;
};

function BoolView(attrs, ro) {
    View.call(this, attrs);
    this.ro = ro;
    this.disabled = false;
}
BoolView.prototype = inherit(View.prototype);
BoolView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    if (!this.ctrl) {
        this.ctrl = elc(null, 'span', 'checkbox');
        this.ctrl.className = 'checkbox';
        this.chk = el(null, 'input');
        this.chk.type = 'checkbox';
        this.ctrl.appendChild(this.chk);
        var me = this;
        this.chk.onchange = function() {
            me.label.setChanged();
            me.notify();
        };
        if (this.ro || this.disabled) this.chk.disabled = true;
    }
    if (!this.label) {
        var l = el(null, 'span', this.attrs.name);
        this.ctrl.appendChild(l);
        this.label = new Label(l);
    }
    if (!skinMode) {
        var lbl = this.label.getNode();
        var me = this;
        lbl.onclick = function() {
            if (!me.chk.disabled) {
                me.chk.checked = !me.chk.checked;
                me.label.setChanged();
                me.notify();
            }
        };
    }
    return this.ctrl;
};
BoolView.prototype.load = function(obj) {
    var val = ftype(this.attrs).get(this.attrs, obj);
    if (val == null) val = this.attrs.def;
    this.setValue(!!val);
    this.label.setOriginal();
    this.notify();
};
BoolView.prototype.save = function(obj) {
    ftype(this.attrs).put(this.attrs, obj, this.chk.checked ? 1 : 0);
    return null;
};
BoolView.prototype.enable = function(en) {
    this.chk.disabled = !en || this.disabled || this.ro;
    this.label.enable(en);
};
BoolView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    if (this.chk) this.enable(this.isEnabled());
};
BoolView.prototype.isRO = function() {
    return this.ro;
};
BoolView.prototype.getValue = function() {
    return this.chk.checked ? 1 : 0;
};
BoolView.prototype.setValue = function(val) {
    this.chk.checked = val
};

function NotView(attrs, ro, view) {
    BoolView.call(this, attrs, ro);
    this.view = view;
}
NotView.prototype = inherit(BoolView.prototype);
NotView.prototype.create = function(viewCtrl, label) {
    this.ctrl = elc(null, 'span');
    this.chk = elc(this.ctrl, 'a', 'not');
    el(this.chk, 'img');
    this.setValue(false);
    var me = this;
    this.chk.onclick = function(e) {
        if (me.chk.className == 'not') {
            me.setValue(!me.value);
            me.label.setChanged();
            me.notify();
        }
    };
    if (this.ro || this.disabled) this.chk.className = 'not_disabled';
    BoolView.prototype.create.call(this, viewCtrl, label);
    this.ctrl.appendChild(this.view.create(viewCtrl, label));
    return this.ctrl;
};
NotView.prototype.realized = function() {
    this.view.realized();
};
NotView.prototype.getView = function(name) {
    if (this.attrs.name == name) return this;
    return this.view.getView(name);
};
NotView.prototype.load = function(obj) {
    var val = ftype(this.attrs).get(this.attrs, obj);
    this.setValue(val ? val[0] : 0);
    this.label.setOriginal();
    this.view.load(obj);
    this.notify();
};
NotView.prototype.save = function(obj) {
    ftype(this.attrs).put(this.attrs, obj, this.value ? 1 : 0);
    this.view.save(obj);
    return null;
};
NotView.prototype.enable = function(en) {
    this.view.enable(en);
    var disabled = !en || this.disabled || this.ro;
    this.chk.className = disabled ? 'not_disabled' : 'not';
    this.label.enable(en);
};
NotView.prototype.makeRO = function(ro) {
    this.view.makeRO(ro);
    BoolView.prototype.makeRO.call(this, ro);
};
NotView.prototype.setLimit = function(limit) {
    this.view.setLimit(limit);
};
NotView.prototype.show = function() {
    this.view.show();
    BoolView.prototype.show.call(this);
};
NotView.prototype.hide = function() {
    this.view.hide();
    BoolView.prototype.hide.call(this);
};
NotView.prototype.destroy = function() {
    this.view.destroy();
};
NotView.prototype.getValue = function() {
    return this.value;
};
NotView.prototype.setValue = function(val) {
    this.value = val;
    this.chk.firstChild.src = val ? 'not-checked.png' : 'not.png';
};

function MultiView(attrs, ro, createView) {
    View.call(this, attrs, el(null, 'div'));
    this.ro = ro;
    this.createView = createView;
    this.values = [];
    this.rows = [];
    this.zeroRow = null;
    this.hidden = false;
    var me = this;
    this.lstn = function() {
        me.updateValue();
        me.notify();
    };
}
MultiView.prototype = inherit(View.prototype);
MultiView.prototype.createRow = function(viewCtrl, cfg, obj) {
    if (this.ro) return View.prototype.createRow.call(this, viewCtrl, cfg, obj);
    var label = new Label(new viewLabel(cfg, this.attrs.name));
    viewCtrl.addRow(label, -1, this);
};
MultiView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    this.viewCtrl = viewCtrl;
    return this.ctrl;
};
MultiView.prototype.load = function(obj) {
    this.findLimit(obj);
    var vals = ftype(this.attrs).get(this.attrs, obj);
    if (vals == null) vals = [];
    while (this.rows.length > vals.length) {
        this.removeRow(this.rows[0]);
    }
    for (var i in this.rows) {
        this.rows[i].view.load(vals[i]);
    }
    while (this.rows.length < vals.length) {
        this.addRow(null, vals[this.rows.length]);
    }
    if (this.rows.length == 0) {
        this.addZeroRow();
        if (this.attrs.hideonempty && !this.hidden) {
            this.hide();
            this.hidden = true;
        }
    }
    else {
        this.removeZeroRow();
        if (this.attrs.hideonempty && this.hidden) {
            this.show();
            this.hidden = false;
        }
    }
    this.label.setOriginal();
};
MultiView.prototype.updateValue = function() {
    for (var i in this.rows) {
        if (this.rows[i].view.save(this.values[i]) != null) {
            return "Invalid value in " + this.getName();
        }
        delete this.values[i].Uff0014;
    }
    return null;
};
MultiView.prototype.save = function(obj) {
    var err = this.updateValue();
    if (err != null) return err;
    if (this.attrs.opt && this.values.length == 0) {
        ftype(this.attrs).remove(this.attrs, obj);
    }
    else {
        ftype(this.attrs).put(this.attrs, obj, this.values);
    }
    return null;
};
MultiView.prototype.isChanged = function() {
    if (this.label.isChanged()) return true;
    for (var i in this.rows) {
        if (this.rows[i].view.isChanged()) return true;
    }
    return false;
};
MultiView.prototype.getValue = function() {
    return this.values;
};
MultiView.prototype.enable = function(en) {
    this.label.enable(en);
    var disabled = this.disabled || !en;
    var add = !disabled && this.rows.length < (this.attrs.max || 30);
    for (var i in this.rows) {
        var r = this.rows[i];
        r.view.enable(en);
        r.view.makeRO(this.disabled);
        if (r.addBtn) {
            r.addBtn.firstChild.src = add ? 'down.png' : 'down-gray.png';
            r.addBtn.className = add ? 'sbtn' : 'sbtn_disabled';
        }
        if (r.removeBtn) {
            r.removeBtn.firstChild.src = !disabled ? 'up.png' : 'up-gray.png';
            r.removeBtn.className = !disabled ? 'sbtn' : 'sbtn_disabled';
        }
    }
    if (this.zeroRow) {
        this.zeroAddBtn.firstChild.src = !disabled ? 'down.png' : 'down-gray.png';
        this.zeroAddBtn.className = !disabled ? 'sbtn' : 'sbtn_disabled';
    }
};
MultiView.prototype.makeRO = function(ro) {
    this.disabled = ro;
    this.enable(this.isEnabled());
};
MultiView.prototype.setLimit = function(limit) {
    this.limit = limit;
    for (var i in this.rows) this.rows[i].view.setLimit(limit);
};
MultiView.prototype.show = function() {
    for (var i in this.rows) {
        this.rows[i].view.show();
    }
    View.prototype.show.call(this);
};
MultiView.prototype.hide = function() {
    for (var i in this.rows) {
        this.rows[i].view.hide();
    }
    View.prototype.hide.call(this);
};
MultiView.prototype.addRow = function(before, value) {
    if (this.rows.length >= (this.attrs.max || 30)) return;
    var me = this;
    var row = {};
    row.node = el(null, 'div');
    row.label = this.label.clone();
    row.view = this.createView();
    row.node.appendChild(row.view.create(this.viewCtrl, row.label));
    row.view.setLimit(this.limit);
    if (this.attrs.c[0].postfix) txt(row.node, this.attrs.c[0].postfix);
    row.view.load(value);
    row.view.listen(this.lstn);
    if (!this.ro) {
        row.addBtn = imgbtn(null, 'down.png');
        row.addBtn.onclick = function() {
            if (me.label.isEnabled()) {
                var idx = me.findRow(row);
                me.addRow(idx + 1 < me.rows.length ? me.rows[idx + 1] : null, {});
            }
        };
        row.node.insertBefore(row.addBtn, row.node.firstChild);
        row.removeBtn = imgbtn(row.node, 'up.png');
        row.removeBtn.style.marginLeft = '0';
        row.removeBtn.onclick = function() {
            if (me.label.isEnabled()) {
                me.removeRow(row);
            }
        };
    }
    if (before) {
        this.ctrl.insertBefore(row.node, before.node);
    }
    else {
        this.ctrl.appendChild(row.node);
    }
    row.view.realized();
    var idx = before ? this.findRow(before) : this.rows.length;
    this.values.splice(idx, 0, value);
    this.rows.splice(idx, 0, row);
    this.label.setChanged();
    this.enable(this.label.isEnabled());
    this.updateValue();
    this.notify();
};
MultiView.prototype.removeRow = function(row) {
    var idx = this.findRow(row);
    row.label.destroy();
    row.view.unlisten(this.lstn);
    row.view.destroy();
    this.ctrl.removeChild(row.node);
    this.values.splice(idx, 1);
    this.rows.splice(idx, 1);
    if (this.rows.length == 0) this.addZeroRow();
    this.label.setChanged();
    this.enable(this.label.isEnabled());
    this.updateValue();
    this.notify();
};
MultiView.prototype.findRow = function(row) {
    for (var i in this.rows) {
        if (this.rows[i] == row) return parseInt(i);
    }
    return null;
};
MultiView.prototype.addZeroRow = function() {
    if (this.zeroRow || this.ro) return;
    var me = this;
    this.zeroRow = el(this.ctrl, 'div');
    this.zeroAddBtn = imgbtn(this.zeroRow, 'down.png');
    this.zeroAddBtn.onclick = function() {
        if (me.label.isEnabled()) {
            me.removeZeroRow();
            me.addRow(0, {});
        }
    };
};
MultiView.prototype.removeZeroRow = function() {
    if (this.zeroRow) {
        this.ctrl.removeChild(this.zeroRow);
        this.zeroRow = null;
    }
};
MultiView.prototype.destroy = function() {
    for (var i in this.rows) {
        this.rows[i].view.unlisten(this.lstn);
    }
};

function TupleView(attrs) {
    View.call(this, attrs);
    this.views = [];
}
TupleView.prototype = inherit(View.prototype);
TupleView.prototype.createRow = function(viewCtrl, cfg, obj) {
    for (var i in this.attrs.c) {
        var a = this.attrs.c[i];
        var view = viewCtrl.newView(obj, a, false, this.ro || a.ro);
        if (view) {
            view.attach(viewCtrl, obj);
            this.views.push(view);
        }
    }
    if (this.views.length == 0) return;
    this.label = null;
    if (this.attrs.name) {
        this.label = new Label(new viewLabel(cfg, this.attrs.name));
    }
    viewCtrl.addRow(this.label, null, this.views, this.attrs.sep ? ' ' : '/');
};
TupleView.prototype.create = function(viewCtrl, label) {
    this.label = label;
    var parent = el(null, 'span');
    var first = true;
    for (var i in this.attrs.c) {
        var a = this.attrs.c[i];
        if (!first) txt(parent, this.attrs.sep ? ' ' : '/');
        var view = viewCtrl.newView(null, a, false, this.ro || a.ro);
        if (view) {
            view.attach(viewCtrl, null);
            parent.appendChild(view.create(viewCtrl, label ? label.clone() : null));
            var postfix = view.getPostfix();
            if (postfix) txt(parent, postfix);
            this.views.push(view);
            first = false;
        }
    }
    this.ctrl = parent;
    return this.ctrl;
};
TupleView.prototype.getView = function(name) {
    for (var i in this.views) {
        var view = this.views[i].getView(name);
        if (view) return view;
    }
    return null;
};
TupleView.prototype.realized = function() {
    for (var i in this.views) this.views[i].realized();
};
TupleView.prototype.load = function(obj) {
    for (var i in this.views) this.views[i].load(obj);
};
TupleView.prototype.save = function(obj) {
    for (var i in this.views) {
        var err = this.views[i].save(obj);
        if (err != null) return err;
    }
    return null;
};
TupleView.prototype.isChanged = function(obj) {
    for (var i in this.views) {
        if (this.views[i].isChanged()) return true;
    }
    return false;
};
TupleView.prototype.enable = function(en) {
    for (var i in this.views) this.views[i].enable(en);
    this.label.enable(en);
};
TupleView.prototype.makeRO = function(ro) {
    for (var i in this.views) this.views[i].makeRO(ro);
};
TupleView.prototype.setLimit = function(limit) {
    var limits = [];
    if (limit && limit.limits) limits = limit.limits;
    for (var i in this.views) {
        this.views[i].setLimit(limits[i]);
    }
};
TupleView.prototype.show = function() {
    for (var i in this.views) this.views[i].show();
    View.prototype.show.call(this);
};
TupleView.prototype.hide = function() {
    for (var i in this.views) this.views[i].hide();
    View.prototype.hide.call(this);
};
TupleView.prototype.destroy = function() {
    for (var i in this.views) this.views[i].destroy();
};

function StatusView(attrs) {
    View.call(this, attrs);
    this.obj = {};
    this.obj._type = attrs;
    attrs.ro = 1;
}
StatusView.prototype = inherit(View.prototype);
StatusView.prototype.attach = function(viewCtrl, obj) {
    this.viewCtrl = viewCtrl;
    this.attrs.owner = obj._type;
    viewCtrl.addAllViews(this.obj);
};
StatusView.prototype.load = function(obj) {
    this.id = obj.ufe0001;
    if (this.id != null || obj._type.type == 'item') {
        this.fetch(obj._type.path);
    }
};
StatusView.prototype.destroy = function() {
    if (this.timer != null) clearTimeout(this.timer);
    this.dead = true;
};
StatusView.prototype.fetch = function(path) {
    if (this.onreply) return;
    var req = {};
    req.Uff0001 = this.attrs.path || path;
    req.uff0007 = this.attrs.cmd || 0xfe0010;
    req.ufe0001 = this.id;
    var me = this;
    this.onreply = function(rep) {
        if (me.dead) return;
        if (rep.ufe0003) {
            req.ufe0003 = rep.ufe0003;
            post(req, me.onreply);
        }
        else {
            if (me.timer == null) {
                me.timer = setTimeout(function() {
                    me.onreply = null;
                    me.timer = null;
                    me.fetch(path);
                }, me.attrs.autorefresh || 2000);
            }
        }
        update(me.obj, rep);
        me.viewCtrl.update();
    };
    post(req, this.onreply);
};
StatusView.prototype.hasRow = function() {
    return false;
};

function GroupView(attrs, ro) {
    TupleView.call(this, attrs);
    this.ro = ro;
    this.open = true;
    this.changed = false;
}
GroupView.prototype = inherit(TupleView.prototype);
GroupView.prototype.attach = function(viewCtrl, obj) {
    for (var i in this.attrs.c) {
        var view = viewCtrl.createView(obj, this, this.attrs.c[i], this.ro);
        if (view) this.views.push(view);
    }
};
GroupView.prototype.createRow = function(viewCtrl, cfg, obj) {
    this.bttn = imgbtn();
    this.bttn.firstChild.src = 'up.png';
    var me = this;
    this.bttn.onclick = function() {
        me.showGroup(!me.open);
        me.changed = true;
    };
    this.label = new Label(viewLabel(cfg, this.attrs.name));
    viewCtrl.addRow(this.label, this.bttn, this);
};
GroupView.prototype.create = function(viewCtrl, label) {
    return el(null, 'span');
};
GroupView.prototype.load = function(obj) {
    TupleView.prototype.load.call(this, obj);
    this.showGroup(ftype(this.attrs).get(this.attrs, obj));
    this.changed = false;
};
GroupView.prototype.save = function(obj) {
    ftype(this.attrs).put(this.attrs, obj, this.open ? 1 : 0);
    if (!this.open) {
        for (var i in this.views) this.views[i].load({
            _type: obj._type
        });
    }
    return TupleView.prototype.save.call(this, obj);
};
GroupView.prototype.isChanged = function() {
    if (this.changed) return true;
    return TupleView.prototype.isChanged.call(this);
};
GroupView.prototype.showGroup = function(open) {
    if (this.open == open) return;
    this.bttn.firstChild.src = open ? 'up.png' : 'down.png';
    for (var i in this.views) {
        if (open) {
            this.views[i].show();
        }
        else {
            this.views[i].hide();
        }
    }
    this.open = open;
};
GroupView.prototype.getVisualClass = function() {
    return 'group';
};

function GridView(attrs, ro) {
    TupleView.call(this, attrs);
    this.ro = ro;
}
GridView.prototype = inherit(TupleView.prototype);
GridView.prototype.createRow = function(viewCtrl, cfg) {
    var attrs = this.attrs;
    var items = 0;
    var lastRow;
    for (var i in attrs.c) {
        var view = ftype(attrs.c[i]).view(attrs.c[i], this.ro);
        this.views.push(view);
        if (items % attrs.cols == 0) {
            lastRow = viewCtrl.createRow();
        }
        var lastInRow = (items % attrs.cols) + 1 == attrs.cols;
        var d = elc(lastRow, 'td', lastInRow ? 'value' : 'tvalue');
        if (lastInRow) d.colSpan = 19 - attrs.cols;
        d.appendChild(view.create(viewCtrl));
        ++items;
    }
};
GridView.prototype.getTabName = function() {
    return this.attrs.name;
};

function GridMultiView(attrs, ro) {
    TupleView.call(this, attrs);
    this.ro = ro;
}
GridMultiView.prototype = inherit(TupleView.prototype);
GridMultiView.prototype.createRow = function(viewCtrl, cfg) {
    var attrs = this.attrs;
    var type = enm[attrs.values.type];
    var map = type ? type.getMap(attrs.values) : {};
    var views = {};
    var items = 0;
    var lastRow;
    for (var i in map) {
        var label = new Label(el(null, 'span', map[i]));
        var view = this.ro ? new ROTextView(attrs.c[0]) : new TextView(attrs.c[0]);
        var d;
        if (items % 2 == 0) {
            lastRow = viewCtrl.createRow(label.getNode());
            d = elc(lastRow, 'td', 'tvalue');
        }
        else {
            elc(lastRow, 'td', 'label').appendChild(label.getNode());
            elc(lastRow, 'td', 'extra');
            d = elc(lastRow, 'td', 'value');
            d.colSpan = 18 - 2;
        }
        d.appendChild(view.create(viewCtrl, label));
        if (attrs.c[0].postfix) txt(d, attrs.c[0].postfix);
        views[i] = view;
        ++items;
    }
    this.views = views;
};
GridMultiView.prototype.load = function(obj) {
    var val = ftype(this.attrs).get(this.attrs, obj);
    for (var i in this.views) {
        this.views[i].load({
            _type: obj._type,
            0: val[i]
        });
    }
};
GridMultiView.prototype.save = function(obj) {
    var val = {};
    for (var i in this.views) {
        var obj = {};
        var err = this.views[i].save(obj);
        if (err != null) {
            var type = enm[this.attrs.values.type];
            var map = type ? type.getMap(this.attrs.values) : {};
            return "Invalid value in " + map[i];
        }
        val[i] = obj[0];
    }
    return null;
};
GridMultiView.prototype.getTabName = function() {
    return this.attrs.name;
};

function DeckView(attrs, ro) {
    View.call(this, attrs);
    this.ro = ro;
    this.active = null;
    this.panes = [];
}
DeckView.prototype = inherit(View.prototype);
DeckView.prototype.attach = function(viewCtrl, obj) {
    View.prototype.attach.call(this, viewCtrl, obj);
    this.viewCtrl = viewCtrl;
    for (var i in this.attrs.panes) {
        this.panes.push(this.createPane(obj, this.attrs.panes[i]));
    }
};
DeckView.prototype.createPane = function(obj, pane) {
    var p = {};
    p.vals = pane.vals;
    p.on = this.viewCtrl.getCondition(pane.on);
    p.views = [];
    for (var i in pane.c) {
        var view = this.viewCtrl.createView(obj, this, pane.c[i], this.ro);
        if (view) {
            view.hide();
            p.views.push(view);
        }
    }
    return p;
};
DeckView.prototype.getView = function(name) {
    for (var p in this.panes) {
        var pane = this.panes[p];
        for (var i in pane.views) {
            var view = pane.views[i].getView(name);
            if (view) return view;
        }
    }
    return null;
};
DeckView.prototype.load = function(obj) {
    if (!this.attrs.oncommited) {
        if (!this.view) {
            this.view = this.viewCtrl.getView(this.attrs.selon);
            var me = this;
            this.lstn = function() {
                me.selectPane();
            };
            this.view.listen(this.lstn);
        }
    }
    else {
        if (this.attrs.selon) {
            this.onAttr = getAttr(obj._type, this.attrs.selon);
        }
    }
    for (var i in this.panes) {
        var pane = this.panes[i];
        for (var p in pane.views) pane.views[p].load(obj);
    }
    this.selectPane(obj);
    return this.ctrl;
};
DeckView.prototype.save = function(obj) {
    if (this.active) {
        for (var p in this.active.views) {
            var err = this.active.views[p].save(obj);
            if (err != null) return err;
        }
    }
    return null;
};
DeckView.prototype.isChanged = function() {
    if (this.active) {
        for (var p in this.active.views) {
            if (this.active.views[p].isChanged()) return true;
        }
    }
    return false;
};
DeckView.prototype.destroy = function() {
    for (var p in this.panes) {
        var pane = this.panes[p];
        for (var i in pane.views) pane.views[i].destroy();
    }
    if (this.view) this.view.unlisten(this.lstn);
};
DeckView.prototype.selectPane = function(obj) {
    var p;
    if (this.attrs.oncommited) {
        if (this.onAttr) {
            p = this.findPane(ftype(this.onAttr).get(this.onAttr, obj));
        }
        else {
            for (var i in this.panes) {
                var pane = this.panes[i];
                if (pane.on.isTrue(obj)) {
                    p = pane;
                    break;
                }
            }
        }
    }
    else {
        p = this.findPane(this.view.getValue() || 0);
    }
    if (this.active != p) {
        if (this.active) this.showPane(this.active, false);
        this.active = p;
        if (this.active) this.showPane(this.active, true);
        this.readdTabs();
    }
};
DeckView.prototype.findPane = function(val) {
    for (var i in this.panes) {
        var pane = this.panes[i];
        for (var j in pane.vals) {
            if (pane.vals[j] == val) return pane;
        }
    }
    return null;
};
DeckView.prototype.showPane = function(pane, show) {
    for (var i in pane.views) {
        var v = pane.views[i];
        if (show) {
            v.show();
        }
        else {
            v.hide();
        }
    }
};
DeckView.prototype.hasRow = function() {
    return false;
};
DeckView.prototype.getTabName = function() {
    return this.attrs.name;
};

function FlagView(attrs, hide, name) {
    View.call(this, attrs);
    this.hide = hide;
    this.name = name || attrs.name;
}
FlagView.prototype = inherit(View.prototype);
FlagView.prototype.getView = function(name) {
    if (this.attrs.secondname == name) return this;
    return this.name == name ? this : null;
};
FlagView.prototype.createRow = function(viewCtrl, cfg, obj) {
    var td = null;
    if (this.attrs.band != null) {
        td = document.getElementById(name);
    }
    if (td == null) {
        var sb = document.getElementById('statusbar');
        td = el(sb.firstChild.firstChild, 'td');
        if (this.attrs.band != null) td.id = 'flag' + this.attrs.band;
        viewCtrl.createSkinCntrl(this, td);
    }
    this.ctrl = el(td, 'span');
};
FlagView.prototype.load = function(obj) {
    this.value = ftype(this.attrs).get(this.attrs, obj);
    if (!this.ctrl) return;
    var str = ftype(this.attrs).tostr(this.attrs, this.value);
    if (!this.value && str == '') {
        if (this.hide && !skinMode) {
            this.ctrl.parentNode.style.display = 'none';
        }
        else if (this.attrs.band == null) {
            str = 'not ' + ftype(this.attrs).tostr(this.attrs, !this.value);
            this.ctrl.parentNode.className = 'disabled';
        }
    }
    else {
        this.ctrl.parentNode.className = 'enabled';
        if (this.hide && !skinMode) this.ctrl.parentNode.style.display = '';
    }
    replaceText(this.ctrl, str != '' ? str : ' ');
};
FlagView.prototype.getValue = function() {
    return this.value;
};
FlagView.prototype.hasRow = function() {
    return false;
};
FlagView.prototype.isRO = function() {
    return true;
};

function StatusBar(attrs) {
    View.call(this, attrs);
}
StatusBar.prototype = inherit(View.prototype);
StatusBar.prototype.attach = function(viewCtrl, obj) {
    for (var i in this.attrs.c) {
        var attrs = this.attrs.c[i];
        viewCtrl.addView(obj, null, null, new StatusBarView(attrs), attrs, getAttrProp(obj, attrs, attrs.name || 'statusbar'), true);
    }
};
StatusBar.prototype.createRow = function(viewCtrl, cfg, obj) {
    return null;
};
StatusBar.prototype.hasRow = function() {
    return false;
};

function StatusBarView(attrs, viewCtrl, obj) {
    View.call(this, attrs);
}
StatusBarView.prototype = inherit(View.prototype);
StatusBarView.prototype.createRow = function(viewCtrl, cfg, obj) {
    var sb = document.getElementById('statusbar');
    var td = el(sb.firstChild.firstChild, 'td');
    this.ctrl = el(td, 'span');
    this.ctrl.style.minWidth = '100px';
    if (viewCtrl) viewCtrl.createSkinCntrl(this, td);
};
StatusBarView.prototype.load = function(obj) {
    if (!this.ctrl) return;
    var attrs = this.attrs;
    var str = toString(attrs, obj);
    if (str != '') {
        if (attrs.name) str = attrs.name + ': ' + str;
        if (attrs.postfix) str += ' ' + attrs.postfix;
    }
    else {
        str = ' ';
    }
    replaceText(this.ctrl, str);
};
StatusBarView.prototype.hasRow = function() {
    return false;
};
StatusBarView.prototype.isRO = function() {
    return true;
};

function AboutView(attrs) {
    View.call(this, attrs);
}
AboutView.prototype = inherit(View.prototype);
AboutView.prototype.createRow = function(viewCtrl, cfg, obj) {};
AboutView.prototype.load = function(obj) {
    var sb = document.getElementById('statusbar');
    var val = ftype(this.attrs).get(this.attrs, obj);
    if (!val) val = [];
    var idx;
    var line = sb.firstChild.nextSibling;
    for (idx = 0; idx < val.length && line; ++idx) {
        replaceText(line.firstChild.firstChild, val[idx]);
        line = line.nextSibling;
    }
    if (idx == val.length) {
        while (line) {
            var next = line.nextSibling;
            sb.removeChild(line);
            line = next;
        }
    }
    for (; idx < val.length; ++idx) {
        var td = elc(el(el(sb, 'tbody'), 'tr'), 'td', 'about');
        td.colSpan = sb.firstChild.firstChild.cells.length;
        txt(td, val[idx]);
    }
};
AboutView.prototype.hasRow = function() {
    return false;
};
AboutView.prototype.isRO = function() {
    return true;
};

function TableView(attrs) {
    TupleView.call(this, attrs);
    this.cont = new ObjectMap({
        path: attrs.path,
        c: attrs.c
    });
}
TableView.prototype = inherit(TupleView.prototype);
TableView.prototype.attach = function(viewCtrl, obj) {
    this.viewCtrl = viewCtrl;
    if (!this.attrs.views) return;
    this.attrs.owner = obj._type;
    this.viewObj = {};
    this.viewObj._type = {
        c: this.attrs.views,
        owner: this.attrs
    };
    this.viewObj._owner = new Listeners();
    viewCtrl.addAllViews(this.viewObj, null, this.views);
};
TableView.prototype.createRow = function(viewCtrl, cfg, obj) {
    var td = viewCtrl.createSingleItemRow();
    td.style.padding = '2px 6px 0 0';
    var iframe = elc(null, 'iframe', 'table');
    iframe.style.display = 'block';
    iframe.style.height = '199px';
    iframe.style.margin = '2px 0 4px 2px';
    iframe.style.border = '1px solid #888';
    iframe.frameBorder = '0';
    var me = this;

    function onload() {
        if (me.table) return;
        me.doc = iframe.contentDocument || iframe.contentWindow.document;
        var css = iel(me.doc, me.doc.body, 'link');
        css.href = document.styleSheets[0].href;
        css.rel = 'stylesheet';
        css.type = 'text/css';
        var table = me.create(viewCtrl);
        table.width = '100%';
        table.style.border = '0';
        table.style.boxShadow = 'none';
        table.style.webkitBoxShadow = 'none';
        table.style.mozBoxShadow = 'none';
        me.doc.body.appendChild(table);
        if (me.obj) me.load(me.obj);
    }
    iframe.onload = onload;
    iframe.onpageshow = onload;
    if (iframe.attachEvent) iframe.attachEvent('onload', onload);
    td.appendChild(iframe);
};
TableView.prototype.create = function(viewCtrl) {
    if (!this.doc) this.doc = document;
    this.table = ielc(this.doc, null, 'table', 'table');
    this.table.style.background = '#ffffff';
    var me = this;
    this.cb = function cb(obj) {
        me.updateRow(obj);
    };
    if (this.isVisible()) this.cont.listen(this.cb, true);
    this.cont.foreach(function(obj) {
        me.updateRow(obj);
    });
    return this.table;
};
TableView.prototype.destroy = function() {
    if (this.cb) this.cont.unlisten(this.cb, true);
};
TableView.prototype.load = function(obj) {
    if (!this.table) {
        this.obj = obj;
        return;
    }
    this.createTable(obj);
    var objs = ftype(this.attrs).get(this.attrs, obj);
    if (!objs) return;
    this.updateTable(objs);
};
TableView.prototype.save = function(obj) {
    return null;
};
TableView.prototype.updateTable = function(objs) {
    var old = {};
    for (var i in this.rows) old[i] = 1;
    for (var i in objs) {
        var o = objs[i];
        o.ufe0001 = i;
        this.updateRow(o);
        delete old[i];
    }
    for (var i in old) {
        this.udpateRow({
            ufe0001: i,
            ufe0013: 1
        });
    }
};
TableView.prototype.createTable = function(obj) {
    if (this.rows) return;
    var type = {
        owner: obj._type
    };
    var header = iel(this.doc, iel(this.doc, this.table, 'thead'), 'tr');
    var idx = 0;
    this.columns = [];
    for (var i in this.attrs.c) {
        var a = this.attrs.c[i];
        var col = !a.nonpublic ? ftype(a).column(a, this, type) : null;
        if (col && col[1] && col[1] != 0xffffffff) {
            iel(this.doc, header, 'th', col[0]).width = col[1];
            this.columns.push(a);
        }
        else {
            this.columns.push(null);
        }
        if (!ftype(a).alias && a.id == null) a.id = idx++;
    }
    this.cols = idx;
    this.rows = {};
};
TableView.prototype.attachHandler = function(row, obj) {
    var me = this;
    row.onclick = function(e) {
        if (me.selectedRow) {
            removeClass(me.selectedRow, 'selected');
        }
        if (obj.ufe0001 == null) return;
        addClass(row, 'selected');
        me.selectedRow = row;
        me.selected = obj.ufe0001;
        me.updateViews(obj);
        return false;
    };
};
TableView.prototype.updateRow = function(obj) {
    var row = this.rows[obj.ufe0001];
    if (obj.ufe0013) {
        if (row) {
            this.table.removeChild(row.parentNode);
            delete this.rows[obj.ufe0001];
        }
        return;
    }
    if (!row) {
        row = iel(this.doc, iel(this.doc, this.table, 'tbody'), 'tr');
        this.rows[obj.ufe0001] = row;
        if (this.flags) iel(this.doc, row, 'td');
        for (var c in this.columns) {
            if (!this.columns[c]) continue;
            iel(this.doc, row, 'td');
        }
    }
    if (this.flags) {
        var flags = row.cells[0];
        clearNodes(flags);
        var bands = {};
        for (var i in this.flags) {
            var attrs = this.flags[i][0];
            var band = this.flags[i][1];
            if (band && bands[band]) continue;
            var val = ftype(attrs).get(attrs, obj);
            var f = ftype(attrs).flag(this.doc, attrs, val);
            if (f) {
                flags.appendChild(f);
                if (band) bands[band] = true;
            }
        }
    }
    var col = this.flags ? 1 : 0;
    for (var i in this.columns) {
        if (!this.columns[i]) continue;
        var a = this.attrs.c[i];
        var val = ftype(a).get(a, obj);
        var cell = row.cells[col];
        var d = ftype(a).cell(this.doc, a, obj, val, cell.firstChild);
        if (d != cell.firstChild) {
            clearNodes(cell);
            if (d) cell.appendChild(d);
        }
        ++col;
    }
    if (this.attrs.views) this.attachHandler(row.parentNode, obj);
    if (this.selected != null && this.selected == obj.ufe0001) {
        this.selectedRow = row.parentNode;
        this.updateViews(obj);
    }
};
TableView.prototype.updateViews = function(obj) {
    if (this.viewObj) {
        update(this.viewObj, obj);
        this.viewObj._owner.notify(this.viewObj);
    }
};
TableView.prototype.addFlag = function(attrs, band) {
    if (!this.flags) {
        this.flags = [];
        var header = this.table.firstChild.firstChild;
        var fc = iel(this.doc, null, 'th');
        fc.width = 20;
        iel(this.doc, fc, 'span', ' ');
        header.insertBefore(fc, header.firstChild);
    }
    this.flags.push([attrs, band]);
};
TableView.prototype.isRO = function() {
    return true;
};
TableView.prototype.show = function() {
    var wasVisible = this.isVisible();
    TupleView.prototype.show.call(this);
    if (!wasVisible && this.isVisible() && this.cb) {
        this.cont.listen(this.cb, true);
    }
};
TableView.prototype.hide = function() {
    var wasVisible = this.isVisible();
    TupleView.prototype.hide.call(this);
    if (wasVisible && !this.isVisible() && this.cb) {
        this.cont.unlisten(this.cb, true);
    }
};

function NumberTableView(attrs) {
    TableView.call(this, attrs);
}
NumberTableView.prototype = inherit(TableView.prototype);
NumberTableView.prototype.createRow = function(viewCtrl, cfg, obj) {
    viewCtrl.addRow(null, null, this);
};
NumberTableView.prototype.load = function(obj) {
    this.createTable(obj);
    var val = ftype(this.attrs).get(this.attrs, obj);
    if (!val) return;
    var objs = [];
    var idx = 0;
    while (idx < val.length) {
        var o = {};
        for (var i in this.attrs.c) {
            var a = this.attrs.c[i];
            if (a.id != null) o[a.id] = val[idx++];
        }
        objs.push(o);
    }
    this.updateTable(objs);
};
NumberTableView.getTabName = function() {
    return attrs.name;
};

function copyVals(attrs, dst, src) {
    for (var i in attrs.c) {
        var a = attrs.c[i];
        if (a.type == 'object') {
            copyVals(a, dst, src);
            continue;
        }
        var v = ftype(a).get(a, src);
        ftype(a).put(a, dst, v);
    }
}

function ObjectView(attrs) {
    View.call(this, attrs);
    this.views = [];
}
ObjectView.prototype = inherit(View.prototype);
ObjectView.prototype.attach = function(viewCtrl, obj) {
    this.mainObj = obj;
    if (this.mainObj) {
        var me = this;
        this.lstn = function(o) {
            me.load(o);
        };
        this.mainObj._owner.listen(this.lstn);
    }
    var a = inherit(this.attrs);
    a.owner = obj._type;
    this.obj = {};
    this.obj._type = {
        c: this.attrs.c,
        owner: a
    };
    this.obj._owner = new Listeners();
    var me = this;
    this.obj._owner.setObject = function(o) {
        me.setObject(o);
    }
    viewCtrl.addAllViews(this.obj, null, this.views);
};
ObjectView.prototype.destroy = function() {
    if (this.lstn) this.mainObj._owner.unlisten(this.lstn);
};
ObjectView.prototype.setObject = function(obj) {
    var o = this.attrs.id ? this.mainObj[this.attrs.id] : this.mainObj;
    if (o != null) {
        update(o, obj);
        this.mainObj._owner.setObject(this.mainObj);
    }
};
ObjectView.prototype.load = function(obj) {
    var o = this.attrs.id ? obj[this.attrs.id] : obj;
    if (o != null) copyVals(this.attrs, this.obj, o);
    this.obj._owner.notify(this.obj);
};
ObjectView.prototype.save = function(obj) {
    for (var i in this.views) {
        if (!this.views[i].isVisible() || !this.views[i].isEnabled()) continue;
        var err = this.views[i].save(this.obj);
        if (err != null) return err;
    }
    if (this.attrs.id) {
        obj = obj[this.attrs.id];
    }
    copyVals(this.attrs, obj, this.obj);
    return null;
};
ObjectView.prototype.show = function() {
    if (++this.visible != 1) return;
    for (var i in this.views) this.views[i].show();
};
ObjectView.prototype.hide = function() {
    if (--this.visible != 0) return;
    for (var i in this.views) this.views[i].hide();
};

function GraphBox(attrs) {
    TupleView.call(this, attrs);
}
GraphBox.prototype = inherit(TupleView.prototype);
GraphBox.prototype.attach = function(viewCtrl, obj) {
    for (var i in this.attrs.graphs) {
        var v = viewCtrl.createView(obj, this, this.attrs.graphs[i], true);
        this.views.push(v);
    }
};
GraphBox.prototype.createRow = function(viewCtrl, cfg) {};
GraphBox.prototype.hasRow = function() {
    return false;
};

function GraphView(attrs) {
    View.call(this, attrs);
    this.curves = [];
    for (var i in attrs.curves) {
        this.curves[i] = {
            values: []
        };
    }
}
GraphView.prototype = inherit(View.prototype);
GraphView.prototype.createRow = function(viewCtrl, cfg, obj) {
    if (this.attrs.name) {
        return View.prototype.createRow.call(this, viewCtrl, cfg, obj);
    }
    var ctrl = this.create(viewCtrl);
    if (!ctrl) return;
    var td = viewCtrl.createSingleItemRow();
    td.appendChild(ctrl);
}
GraphView.prototype.create = function() {
    var height = this.attrs.height || 144;
    var g = createGraphic(document, null, 1024, height, 340, height, 'graph');
    if (!g) return null;
    this.g = g;
    this.width = g.viewBox.width;
    this.height = g.viewBox.height;
    g.canvas.style.display = 'block';
    g.canvas.style.height = this.height;
    g.strokeColor = '#808080';
    g.strokeWidth = 1;
    var level = (this.height - 14) / 5;
    for (var i = 1; i < 6; ++i) {
        var y = level * i - 0.5;
        g.line(0, y, this.width, y);
    }
    this.xlabels = [];
    var idx = 0;
    for (var x = this.width; x > 60; x -= 120) {
        g.line(x - 0.5, 0, x - 0.5, this.height - 4);
        var label = g.text(x - 3, this.height - 14, 8, true);
        if (!this.attrs.model) {
            if (idx > 0) label.text(idx + ' min ago');
            ++idx;
        }
        this.xlabels.push(label);
    }
    this.ylabels = [];
    for (var i = 0; i < 5; ++i) {
        var y = level * i;
        this.ylabels[5 - i] = g.text(this.width - 120 - 2, y, 9, true);
    }
    g.strokeWidth = 2;
    for (var i in this.curves) {
        var c = this.curves[i];
        var idx = i + 1;
        this.curves[i].color = '#' + (idx & 2 ? 'ff' : '00') +
            (idx & 4 ? 'ff' : '00') + (idx & 1 ? 'ff' : '00');
        g.strokeColor = '#000';
        g.strokeOpacity = 0;
        g.fillOpacity = 0.3;
        g.fillColor = c.color;
        c.polygon = g.polygon();
        g.strokeColor = c.color;
        g.strokeOpacity = 0.4;
        g.fillOpacity = 0;
        c.polyline = g.polyline();
    }
    this.horizontal = [];
    var legend = el(null, 'table');
    legend.width = '100%';
    legend.cellSpacing = 0;
    legend.cellPadding = 0;
    legend.style.margin = '2px 0 0 0';
    for (var i in this.curves) {
        var c = this.curves[i];
        var row = el(el(legend, 'tbody'), 'tr');
        var line = createGraphic(document, null, 20, 2, 20, 2);
        line.strokeColor = c.color;
        line.strokeOpacity = 0.9;
        line.strokeWidth = 2;
        line.line(0, 0, 20, 0);
        line.canvas.style.verticalAlign = 'middle';
        line.canvas.style.margin = '0 4px 0 0';
        var info = el(row, 'td');
        info.appendChild(line.canvas);
        el(info, 'span', this.attrs.curves[i].name);
        c.cur = el(row, 'td', 'cur:');
        c.avg = el(row, 'td', 'avg:');
        c.max = el(row, 'td', 'max:');
    }
    var box = elc(null, 'div', 'graph');
    box.appendChild(g.canvas);
    box.appendChild(legend);
    return box;
};
GraphView.prototype.load = function(obj) {
    if (!this.g) return;
    var width = this.width / 2 + 1;
    var hasUpdate = false;
    if (this.attrs.model) {
        var offset = this.attrs.offset || 0;
        var model = this.attrs.model;
        var array = ftype(model).get(model, obj);
        if (!array) array = [];
        for (var i in this.curves) {
            this.curves[i].value = this.attrs.curves[i].value;
            this.curves[i].values = [];
        }
        var idx = 0;
        var x = [];
        while (idx < array.length) {
            x.push(array[idx++][0]);
            for (var i in this.curves) {
                var c = this.curves[i];
                var val = ftype(c.value).get(c.value, array[idx++]);
                c.values.push(val + offset);
                hasUpdate = true;
            }
        }
        this.times = [];
        for (var i = x.length - 1; i >= 0; i -= 60) {
            this.times.push(x[i]);
        }
    }
    else {
        for (var i in this.curves) {
            var c = this.curves[i];
            if (!c.value) {
                c.ovalue = getAttr(obj._type, this.attrs.curves[i].value, true);
                c.value = c.ovalue;
            }
            if (c.time == null) {
                c.time = 0;
                if (this.attrs.curves[i].time) {
                    c.time = getAttr(obj._type, this.attrs.curves[i].time, true);
                }
            }
            var val = ftype(c.ovalue).get(c.ovalue, obj);
            if (val == null) continue;
            var time;
            if (c.time) {
                var time = ftype(c.time).get(c.time, obj);
                if (time == null) continue;
            }
            else {
                time = getUptime();
            }
            if (c.lastTime != null) {
                var dt = time - c.lastTime;
                if (dt < 1) continue;
                while (dt-- > 1) c.values.push(null);
            }
            c.lastTime = time;
            if (val instanceof Array) {
                c.value = c.ovalue.c[0];
                for (var i in val) {
                    c.values.push(ftype(c.value).get(c.value, val[i]));
                    hasUpdate = true;
                }
            }
            else {
                c.values.push(val);
                hasUpdate = true;
            }
        }
    }
    for (var i in this.curves) {
        var c = this.curves[i];
        if (c.values.length > width) {
            c.values.splice(0, c.values.length - width);
        }
    }
    if (hasUpdate) this.update();
};
GraphView.prototype.update = function() {
    var tostr = function(curve, val) {
        var a = curve.value;
        var str = ftype(a).tostr(a, val);
        if (a.postfix) str += ' ' + a.postfix;
        return str.replace(' ', ' ');
    };
    var offset = this.attrs.offset || 0;
    var tmax = 10 - offset;
    for (var i in this.curves) {
        var c = this.curves[i];
        var max = 0 - offset;
        var sum = 0;
        for (var j in c.values) {
            var v = c.values[j] - offset;
            if (max < v) max = v;
            sum += v;
        }
        var avg = 0;
        var cur = 0;
        if (c.values.length > 0) {
            avg = Math.round(sum / c.values.length);
            cur = c.values[c.values.length - 1] - offset;
        }
        replaceText(c.cur, 'cur: ' + tostr(c, cur));
        replaceText(c.avg, 'avg: ' + tostr(c, avg));
        replaceText(c.max, 'max: ' + tostr(c, max));
        if (tmax < max) tmax = max;
    }
    if (this.attrs.max) {
        tmax = this.attrs.max;
    }
    else {
        tmax += offset;
        var nmax = Math.pow(10, Math.ceil(Math.log(tmax) / Math.LN10));
        tmax = nmax / 2 >= tmax ? nmax / 2 : nmax;
    }
    if (this.max != tmax) {
        this.max = tmax;
        var curve;
        for (var i in this.curves) {
            curve = this.curves[i];
            if (curve.values.length > 0) break;
        }
        var step = tmax / 5;
        for (var i = 1; i <= 5; ++i) {
            this.ylabels[i].text(tostr(curve, i * step - offset));
        }
    }
    var height = this.height - 14;
    for (var i in this.curves) {
        var c = this.curves[i];
        c.polyline.reset();
        c.polygon.reset();
        var lastX = null;
        for (var j in c.values) {
            if (c.values[j] == null) continue;
            var x = this.width - (c.values.length - 1 - j) * 2;
            var y = Math.round(height - (c.values[j] / tmax) * height);
            c.polyline.add(x, y);
            if (lastX == null) c.polygon.add(x, height);
            c.polygon.add(x, y);
            lastX = x;
        }
        if (lastX != null) {
            c.polygon.add(lastX, height);
            c.polyline.draw();
            c.polygon.draw();
        }
    }
    if (this.times) {
        for (var i in this.xlabels) {
            var str = '';
            if (this.times[i] != null) {
                var t = num2int(this.times[i]) - sysres.uptimediff - getTZOffset();
                str = dateAndTime2string(getDate(t), getTime(t), false, true);
            }
            this.xlabels[i].text(str);
        }
    }
};

function FileUploadView(attrs) {
    View.call(this, attrs);
}
FileUploadView.prototype = inherit(View.prototype);
FileUploadView.prototype.create = function(viewCtrl, label) {
    var attrs = this.attrs;
    this.ctrl = el(null, 'span');
    var frame = el(null, 'iframe');
    frame.id = 'uframe';
    frame.scrolling = 'no';
    frame.width = '270px';
    frame.height = '26px';
    frame.frameBorder = '0';
    frame.style.cssFloat = 'none';
    frame.style.display = 'inline';
    frame.style.margin = '2px';
    frame.src = 'uploader.html';
    this.ctrl.appendChild(frame);
    var status;
    if (!attrs.uploadonly) {
        var sb = document.getElementById('statusbar');
        status = el(sb.firstChild.firstChild, 'td');
    }
    else {
        status = el(this.ctrl, 'span', '');
        status.style.display = 'none';
    }
    var uploading = false;
    var onload = function() {
        var frame = document.getElementById('uframe');
        var doc = frame.contentDocument || frame.document;
        var inp = doc.getElementById('file');
        replaceText(status, uploading ? 'uploaded' : ' ');
        if (attrs.uploadonly) {
            frame.style.display = 'inline';
            status.style.display = 'none';
        }
        if (uploading) {
            if (attrs.cmd) {
                var req = {};
                req.Uff0001 = attrs.path;
                req.uff0007 = attrs.cmd;
                post(req);
            }
            uploading = false;
            inp.disabled = false;
        }
        inp.onchange = function() {
            var path = inp.value.split('\\');
            var name = path[path.length - 1];
            if (attrs.filter && !name.match(new RegExp(attrs.filter, 'i'))) {
                alert(attrs.error || 'Wrong file!');
                inp.value = '';
                return;
            }
            uploading = true;
            replaceText(status, 'uploading ' + name);
            if (attrs.uploadonly) {
                status.style.display = 'inline';
                frame.style.display = 'none';
            }
            var f = doc.getElementById('form');
            f.action = '/jsproxy/upload?' + session.encryptURI('');
            f.submit();
            inp.disabled = true;
        };
    };
    if (frame.attachEvent) {
        frame.attachEvent('onload', onload);
    }
    else {
        frame.onload = onload;
    }
    var dframe = el(null, 'iframe');
    dframe.id = 'downloader';
    dframe.style.display = 'none';
    this.ctrl.appendChild(dframe);
    return this.ctrl;
};

function ToggleView(attrs) {
    View.call(this, attrs);
    this.value = 0;
}
ToggleView.prototype = inherit(View.prototype);
ToggleView.prototype.createRow = function(viewCtrl, cfg, obj) {
    this.viewCtrl = viewCtrl;
    this.obj = obj;
    if (!skinMode && cfg._hide) {
        return el(null, 'span');
    }
    this.ctrl = current.addButton(this.attrs.modes[1], cfg);
    viewCtrl.createSkinCntrl(this, this.ctrl, this.ctrl.firstChild, true);
    var me = this;
    this.ctrl.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        me.value = me.value ? 0 : 1;
        me.update(me.obj);
        me.notify();
    };
};
ToggleView.prototype.getValue = function() {
    return this.value;
};
ToggleView.prototype.update = function(obj) {
    if (!this.ctrl) return;
    var name = this.attrs.modes[this.value ? 0 : 1];
    var cfg = getAttrProp(this.obj, this.attrs, name);
    if (!skinMode) {
        replaceText(this.ctrl.lastChild, cfg.name || name);
    }
    else {
        this.ctrl.removeChild(this.ctrl.lastChild);
        this.ctrl.appendChild(viewLabel(cfg, name));
    }
};
ToggleView.prototype.hasRow = function() {
    return false;
};

function getAttr(type, name, topLevelOnly) {
    for (var i in type.c) {
        if (ftype(type.c[i]).alias) continue;
        if (type.c[i].name == name) return type.c[i];
        if (topLevelOnly && type.c[i].type != 'tuple') continue;
        if (type.c[i].c) {
            var attr = getAttr(type.c[i], name);
            if (attr) return attr;
        }
        if (type.c[i].panes) {
            var panes = type.c[i].panes;
            for (var p in panes) {
                attr = getAttr(panes[p], name);
                if (attr) return attr;
            }
        }
    }
    if (name == 'dynamic' || name == 'enable' || name == 'default') {
        if (name == 'default') name = 'preset';
        for (var i in type.c) {
            if (type.c[i].type == name) return type.c[i];
        }
    }
    return null;
}

function AliasView(attrs, ro) {
    View.call(this, attrs);
    this.ro = ro;
}
AliasView.prototype = inherit(View.prototype);
AliasView.prototype.attach = function(viewCtrl, obj) {
    var a = getAttr(obj._type, this.attrs.name);
    if (a) {
        this.view = viewCtrl.createView(obj, null, a, this.ro);
    }
};
AliasView.prototype.load = function(obj) {
    if (this.view) this.view.load(obj);
};
AliasView.prototype.save = function(obj) {
    if (this.view) return this.view.save(obj);
    return null;
};
AliasView.prototype.isChanged = function() {
    return this.view && this.view.isChanged();
};
AliasView.prototype.show = function() {
    if (this.view) this.view.show();
};
AliasView.prototype.hide = function() {
    if (this.view) this.view.hide();
};
AliasView.prototype.hasRow = function() {
    return false;
};

function Condition(cond, conds, obj) {
    Listeners.call(this);
    this.cond = cond;
    this.on = [];
    this.views = [];
    this.value = true;
    this.obj = obj;
    if (cond.oron && conds) this.oron = conds[cond.oron];
}
Condition.prototype = inherit(Listeners.prototype);
Condition.prototype.init = function(ctrl) {
    if (!this.hasRegular()) return;
    var me = this;
    var lstn = function() {
        me.check();
        me.notify();
    };
    if (!this.cond.makero && !this.cond.hide) {
        for (var i in this.cond.c) {
            var c = this.cond.c[i];
            var view;
            if (c.on instanceof Array) {
                view = ctrl.getView(c.on[c.on.length - 1], this.obj);
            }
            else {
                view = ctrl.getView(c.on, this.obj);
            }
            this.on[i] = view;
            if (view != null) view.listen(lstn);
        }
    }
    if (this.oron) this.oron.listen(lstn);
    this.check();
};
Condition.prototype.check = function() {
    var val = (this.cond.makero || this.cond.hide) ? this.oron.isTrue() : this.isTrue();
    if (val == this.value) return;
    this.value = val;
    for (var i in this.views) {
        if (this.views[i] == null) continue;
        if (this.cond.hidedynamicly) {
            if (val) {
                this.views[i].show();
            }
            else {
                this.views[i].hide();
            }
        }
        else {
            this.views[i].enable(val);
        }
    }
};
Condition.prototype.hasRegular = function() {
    if (!this.cond.hide && !this.cond.makero) return true;
    if (this.oron) return this.oron.hasRegular();
    return false;
};
Condition.prototype.canHide = function() {
    if (this.cond.hide) return true;
    if (this.oron) return this.oron.canHide();
    return false;
};
Condition.prototype.shouldHide = function(obj) {
    if (this.cond.hide && !this.isItselfTrue(obj)) return true;
    if (this.oron) return this.oron.shouldHide(obj);
    return false;
};
Condition.prototype.shouldMakeRO = function(obj) {
    if (this.cond.makero && !this.isItselfTrue(obj)) return true;
    if (this.oron) return this.oron.shouldMakeRO(obj);
    return false;
};
Condition.prototype.isItselfTrue = function(obj) {
    for (var i in this.cond.c) {
        var c = this.cond.c[i];
        if (!c.on) {
            if (!isTrue(c.pred, null)) return false;
            continue;
        }
        if (!obj) {
            if (!this.on[i]) return true;
            if (!isTrue(c.pred, this.on[i].getValue())) return false;
        }
        else {
            if (c.on instanceof Array) {
                return true;
            }
            var attr = getAttr(obj._type, c.on);
            if (attr == null) return false;
            var val = ftype(attr).getvalue(attr, obj);
            if (!isTrue(c.pred, val)) return false;
        }
    }
    return true;
};
Condition.prototype.isTrue = function(obj) {
    if (this.isItselfTrue(obj)) return true;
    if (this.oron) return this.oron.isTrue();
    return false;
};
Condition.prototype.addView = function(view) {
    this.views.push(view);
};
var conv = {};
conv.put = function(conv, obj, val) {
    return conv.val;
};
conv.secret_str = function(conv, obj, val) {
    return val;
};
conv.u32vector_u32 = function(conv, obj, val) {
    return val && val[0] ? val[0] : 0;
};
conv.u32_network = function(conv, obj, val) {
    return [val, (val ? 0xffffffff : 0)];
};
conv.u32_vector_u32pair = function(conv, obj, val) {
    return val;
};
conv.u32_u32 = function(conv, obj, val) {
    return val;
};
conv.id_str = function(conv, obj, val) {
    return obj._owner.toString(obj);
};
conv.any_network = function(conv, obj, val) {
    for (var i in val) {
        if (val[i] instanceof Array && val[i].length == 2) return val[i];
    }
    return null;
};
conv.multi_network = function(conv, obj, val) {
    if (val != null && val[0] != null) {
        return [val[0][conv.id] || 0, val[0][conv.mid] || 0];
    }
    return null;
};

function convert(links, src, dst, viewCtrl) {
    var obj = {};
    obj._type = dst._type;
    obj._owner = dst._owner;
    for (var i in links) {
        var val;
        var sattr;
        if (links[i].src) {
            if (links[i].presave && viewCtrl) {
                var v = viewCtrl.getView(links[i].src);
                var err = v.save(src);
                if (v.isVisible() && v.isEnabled() && err != null) {
                    alert(err);
                    return false;
                }
            }
            sattr = getAttr(src._type, links[i].src);
            val = ftype(sattr).get(sattr, src);
        }
        else {
            val = src.ufe0001;
            sattr = null;
        }
        var dattr = getAttr(dst._type, links[i].dst);
        if (links[i].conv) {
            val = conv[links[i].conv](links[i], src, val);
        }
        else if (sattr) {
            var str = ftype(sattr).tostr(sattr, val);
            val = ftype(dattr).fromstr(dattr, str);
        }
        if (val != null) ftype(dattr).put(dattr, obj, val);
    }
    update(dst, obj);
    return true;
}

function defTrue(op) {
    switch (op) {
        case OP_IS_NOT:
        case OP_CONTAIN_NOT:
        case OP_IN_NOT:
            return true;
    }
    return false;
}
var id2int = {
    b: 0 << 27,
    u: 1 << 27,
    q: 2 << 27,
    a: 3 << 27,
    s: 4 << 27,
    m: 5 << 27,
    r: 6 << 27,
    B: 16 << 27,
    U: 17 << 27,
    Q: 18 << 27,
    A: 19 << 27,
    S: 20 << 27,
    M: 21 << 27,
    R: 22 << 27
};

function unset(obj, id) {
    if (id != null) {
        delete obj[id];
        if (obj.Uff0014 == null) obj.Uff0014 = [];
        obj.Uff0014.push(id2int[id.substr(0, 1)] + parseInt(id.substr(1), 16));
    }
}

function ftype(attrs) {
    return types[attrs.type] || types.def;
}
var types = {};
types.def = {};
types.def.get = function(attrs, obj) {
    return obj[attrs.id || 0];
};
types.def.getvalue = function(attrs, obj) {
    return ftype(attrs).get(attrs, obj);
};
types.def.put = function(attrs, obj, val) {
    if (val != null) obj[attrs.id || 0] = val;
};
types.def.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    unset(obj, attrs.id);
};
types.def.tostr = function(attrs, val) {
    return val;
};
types.def.fromstr = function(attrs, str) {
    return str;
};
types.def.hasValue = function(attrs, val) {
    return true;
};
types.def.isRO = function(attrs) {
    return !!attrs.ro;
};
types.def.less = function(attrs, v1, v2) {
    return v1 < v2;
};
types.def.cfg = function(attrs, obj) {
    if (obj._type == null) return {};
    return getAttrProp(obj, attrs);
};
types.def.view = function(attrs, ro) {
    if (ro) {
        if (attrs.opt) return new ROOptTextView(attrs);
        return new ROTextView(attrs);
    }
    if (attrs.values) {
        var v = new ComboView(attrs);
        if (attrs.opt) v = new OptView(attrs, v);
        return v;
    }
    if (attrs.opt) return new OptView(attrs);
    return new TextView(attrs);
};
types.def.column = function(attrs, table, type) {
    if (attrs.on && attrs.cond == null) {
        var c = getAttr(type, attrs.on);
        attrs.cond = c ? new Condition(c) : 0;
        if (attrs.cond && !(attrs.cond.canHide() || attrs.cond.hasRegular())) {
            attrs.cond = 0;
        }
    }
    if (attrs.cond && attrs.cond.shouldHide()) return;
    var cfg = getAttrProp(type, attrs);
    if (shouldHide(cfg)) return;
    var name = cfg.name || attrs.name;
    if (!attrs.inlinepostfix && attrs.postfix) {
        name += ' (' + attrs.postfix + ')';
    }
    return [name, attrs.width];
};
types.def.cell = function(doc, attrs, obj, val) {
    if (attrs.cond && !attrs.cond.isTrue(obj)) return null;
    var str = tostr(attrs, val);
    if (str == null) str = '';
    if (str.length > 0 && attrs.inlinepostfix) str += attrs.postfix;
    return str != '' ? itxt(doc, null, str) : null;
};
types.def.listen = function(attrs, cb) {
    if (attrs.values) {
        var type = enm[attrs.values.type];
        if (type && type.listen) type.listen(attrs.values, cb);
    }
    if (!attrs.c) return;
    for (var i in attrs.c) {
        var a = attrs.c[i];
        ftype(a).listen(a, cb);
    }
};
types.def.unlisten = function(attrs, cb) {
    if (attrs.values) {
        var type = enm[attrs.values.type];
        if (type && type.unlisten) type.unlisten(attrs.values, cb);
    }
    if (!attrs.c) return;
    for (var i in attrs.c) {
        var a = attrs.c[i];
        ftype(a).unlisten(a, cb);
    }
};
types.def.deflimit = function(attrs) {
    return null;
};
types.def.addlimit = function(attrs, limit, str) {
    return false;
};
types.def.limit = function(attrs, str) {
    var limit = {};
    var chunks = str.split('\n');
    for (var i in chunks) {
        if (chunks[i].length == 0) continue;
        var items = chunks[i].split(',');
        for (var j in items) {
            var str = trim(items[j]);
            if (str.length == 0) continue;
            if (!ftype(attrs).addlimit(attrs, limit, str)) return null;
        }
    }
    return limit;
};
types.def.lookup = function(attrs, owner, name) {
    if (owner && (!attrs.owner || attrs.owner.name != owner)) return null;
    if (attrs.name == name) return attrs;
    return null;
};
types.def.alias = false;
types.def.matcher = function(attr, opt, val) {
    return null;
};
types.bool = inherit(types.def);
types.bool.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    if (attrs.bit) val = val & attrs.bit ? 1 : 0;
    return attrs.inv ? (val != null ? !val : null) : val;
};
types.bool.put = function(attrs, obj, val) {
    var b = attrs.bit || 1;
    obj[attrs.id || 0] = attrs.inv ? (val ? 0 : b) : (val ? b : 0);
};
types.bool.fromstr = function(attrs, str) {
    if (str == 'yes' || str == 'true') return 1;
    if (str == 'no' || str == 'false') return 0;
    return null;
};
types.bool.tostr = function(attrs, val) {
    if (val == null) val = attrs.def || false;
    return val ? 'yes' : 'no';
};
types.bool.view = function(attrs, ro) {
    return new BoolView(attrs, ro);
};
types.bool.matcher = function(attr, opt, val) {
    val = this.fromstr(val);
    if (val == null) return null;
    if (opt == OP_IS) return function(v) {
        return v == val;
    }
    return function(v) {
        return true;
    }
};
types.bool.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    if (attr.name) return attr.name;
    return "";
};
types.number = inherit(types.def);
types.number.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    return val instanceof Array ? val[0] : val;
};
types.number.put = function(attrs, obj, val) {
    if (val == null) {
        val = attrs.optval != null ? attrs.optval : (attrs.def || 0);
    }
    obj[attrs.id || 0] = val;
};
types.number.hasValue = function(attrs, val) {
    if (attrs.optval != null) return val != attrs.optval;
    return val != (attrs.def || 0);
};
types.number.fromstr = function(attrs, str, limit) {
    var n = lossyenum_fromstr(attrs, str, function(attrs, str) {
        var n = string2int(str, attrs.radix || 10);
        if (n == null || n < 0) return null;
        if (!minmax(n, attrs.min, attrs.max)) return null;
        return n;
    });
    if (n == null || !fitsRangeLimit(n, limit)) return null;
    return n;
};
types.number.tostr = function(attrs, val) {
    if (val == null) {
        val = attrs.def || 0;
        if (!minmax(val, attrs.min, attrs.max)) val = attrs.min || 0;
    }
    return lossyenum_tostr(attrs, val, val.toString(attrs.radix || 10));
};
types.number.deflimit = function(attrs) {
    var str;
    if (attrs.values) {
        str = (attrs.min || 0).toString(attrs.radix || 10) + '..';
        if (attrs.max != null) str += attrs.max.toString(attrs.radix || 10);
        return str;
    }
    str = this.tostr(attrs, attrs.min || 0) + '..';
    if (attrs.max != null) str += this.tostr(attrs, attrs.max);
    return str;
};
types.number.addlimit = function(attrs, limit, str) {
    if (!limit.ranges) limit.ranges = [];
    return parseLimit(limit.ranges, str, attrs.min || 0, attrs.max || 0xffffffff, function(str) {
        return ftype(attrs).fromstr(attrs, str);
    });
};
types.number.matcher = function(attr, opt, val) {
    var res = ftype(attr).fromstr(attr, trim(val));
    if (res == null) return null;
    switch (opt) {
        case OP_IS:
            return function(v) {
                return v == res;
            }
        case OP_IS_NOT:
            return function(v) {
                return v != res;
            }
        case OP_LS:
            return function(v) {
                return v < res;
            }
        case OP_LEQ:
            return function(v) {
                return v <= res;
            }
        case OP_GT:
            return function(v) {
                return v > res;
            }
        case OP_GEQ:
            return function(v) {
                return v >= res;
            }
    }
    return function(v) {
        return true;
    }
};
types.number.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.bignumber = inherit(types.number);
types.bignumber.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.integer = inherit(types.number);
types.integer.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    return val != null ? num2int(val) : null;
};
types.integer.put = function(attrs, obj, val) {
    if (val == null) {
        val = attrs.optval != null ? attrs.optval : (attrs.def || 0);
    }
    obj[attrs.id || 0] = val;
};
types.integer.hasValue = function(attrs, val) {
    return val != num2int(attrs.optval || attrs.def || 0);
};
types.integer.tostr = function(attrs, val) {
    if (val == null) {
        val = num2int(attrs.def || 0);
        if (!iminmax(val, attrs.min, attrs.max)) {
            if (attrs.max && val > num2int(attrs.max)) {
                val = num2int(attrs.max);
            }
            else {
                val = num2int(attrs.min || 0);
            }
        }
    }
    return num2int(val).toString();
};
types.integer.fromstr = function(attrs, str, limit) {
    var n = string2int(str);
    if (n == null || !iminmax(n, attrs.min, attrs.max)) return null;
    if (limit && limit.ranges) {
        var ranges = limit.ranges;
        for (var i = 0; i < ranges.length; i += 2) {
            if (iminmax(n, ranges[i], ranges[i + 1])) return n;
        }
        return null;
    }
    return n;
};
types.integer.addlimit = function(attrs, limit, str) {
    if (!limit.ranges) limit.ranges = [];
    return parseLimit(limit.ranges, str, attrs.min != null ? attrs.min : num2int(0x80000000), attrs.max != null ? attrs.max : num2int(0x7fffffff), function(str) {
        return ftype(attrs).fromstr(attrs, str);
    });
};
types.integer.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.decimal = inherit(types.number);
types.decimal.tostr = function(attrs, val) {
    var str = types.integer.tostr(attrs, val);
    var res = '';
    var off = str.length % 3;
    if (off) res = str.substr(0, off);
    for (var i = off; i < str.length; i += 3) {
        if (i > 0) res = res + ' ';
        res = res + str.substr(i, 3);
    }
    return res;
};
types.bigdecimal = inherit(types.decimal);
types.bigdecimal.tostr = function(attrs, val) {
    var str = types.number.tostr(attrs, val);
    var res = '';
    var off = str.length % 3;
    if (off) res = str.substr(0, off);
    for (var i = off; i < str.length; i += 3) {
        if (i > 0) res = res + ' ';
        res = res + str.substr(i, 3);
    }
    return res;
};
types.bytes = inherit(types.number);
types.bytes.tostr = function(attrs, val) {
    if (!val) return "0 B";
    val *= attrs.scale || 1;
    if (val < 5000) return val + " B";
    if (val < 5000000) return (val / 1024).toFixed(1) + " KiB";
    if (val < 5000000000) return (val / (1024 * 1024)).toFixed(1) + " MiB";
    return (val / (1024 * 1024 * 1024)).toFixed(1) + " GiB";
};
types.bigbytes = inherit(types.bytes);
types.bitrate = inherit(types.number);
types.bitrate.tostr = function(attrs, val) {
    if (!val) return "0 bps";
    if (val < 2000 && val != 1000) {
        return val + " bps";
    }
    if (val < 2000000 && val != 1000000) {
        return (val / 1000).toFixed(1) + " kbps";
    }
    if (val < 2000000000 && val != 1000000000) {
        return (val / 1000000).toFixed(1) + " Mbps";
    }
    return (val / 1000000000).toFixed(1) + " Gbps";
};
types.bigbitrate = inherit(types.bitrate);
types.kbytes = inherit(types.number);
types.kbytes.tostr = function(attrs, val) {
    if (!val) return "0 KiB";
    if (val < 5000) return val + " KiB";
    if (val < 5000000) return (val / 1024).toFixed(1) + " MiB";
    return (val / (1024 * 1024)).toFixed(1) + " GiB";
};
types.unit = inherit(types.number);
types.unit.units = ['', 'k', 'M', 'G'];
types.unit.tostr = function(attrs, val) {
    val = val || 0;
    for (var i in this.units) {
        if (val < 1000 || val % 1000 != 0) return val + this.units[i];
        val /= 1000;
    }
    return val.toString();
};
types.unit.fromstr = function(attrs, str, limit) {
    if (str.length < 1) return null;
    var p = str.substr(str.length - 1).toLowerCase();
    var scale = 1;
    for (var i = 0; i < this.units.length; ++i) {
        if (this.units[i].toLowerCase() == p) {
            var n = string2int(str.substr(0, str.length - 1));
            if (n == null || n < 0) return null;
            n *= scale;
            if (!minmax(n, attrs.min, attrs.max)) return null;
            if (!fitsRangeLimit(n, limit)) return null;
            return n;
        }
        scale *= 1000;
    }
    return types.number.fromstr(attrs, str);
};
types.bigunit = inherit(types.unit);
types.changerate = inherit(types.def);
types.changerate.getRate = function(attrs, obj, scale) {
    if (!attrs.v) attrs.v = getAttr(obj._type, attrs.value);
    var val = ftype(attrs.v).get(attrs.v, obj);
    if (val == null) return null;
    if (!obj._timestamp) obj._timestamp = {};
    var now = (new Date()).getTime();
    var prev = obj._timestamp[attrs.value];
    var r = 0;
    if (prev) {
        var dt = now - prev[0];
        if (dt <= 900) return prev[2];
        r = Math.floor((val - prev[1]) * scale * 1000 / dt);
    }
    obj._timestamp[attrs.value] = [now, val, r];
    return r;
};
types.changerate.get = function(attrs, obj) {
    return this.getRate(attrs, obj, attrs.scale || 1);
};
types.changerate.tostr = types.decimal.tostr;
types.changerate.view = function(attrs, ro) {
    return types.def.view(attrs, 1);
};
types.bigchangerate = inherit(types.changerate);
types.bigchangerate.tostr = types.bigdecimal.tostr;
types.bigbitchangerate = inherit(types.changerate);
types.bigbitchangerate.get = function(attrs, obj) {
    return this.getRate(attrs, obj, 8);
};
types.bigbitchangerate.tostr = types.bigbitrate.tostr;
types.fixedpoint = inherit(types.number);
types.fixedpoint.tostr = function(attrs, val) {
    var scale = attrs.scale || 1;
    val = num2int(val || attrs.def || 0);
    var m = val / scale;
    var str = (val > 0 ? Math.floor(m) : Math.ceil(m)).toString() + '.' + fraction2string(Math.abs(val), scale);
    if (attrs.trimzeros) {
        for (var i = str.length - 1; i > 0; --i) {
            if (str[i] != '0') {
                if (str[i] == '.') --i;
                str = str.substr(0, i + 1);
                break;
            }
        }
    }
    return str;
};
types.fixedpoint.fromstr = function(attrs, str, limit) {
    var scale = attrs.scale || 1;
    var v = str.split('.');
    var n = string2int(v[0]);
    if (n == null || n < 0 || v.length > 2) return null;
    n *= scale;
    if (v[1]) {
        var f = string2fraction(v[1], scale);
        if (f == null) return null;
        n += f;
    }
    if (!iminmax(n, attrs.low, attrs.high)) return null;
    if (!fitsRangeLimit(n, limit)) return null;
    return n;
};
types.fixedpoint.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.integerrange = inherit(types.def);
types.integerrange.get = function(attrs, obj) {
    var low = obj[attrs.id || 0];
    var high = obj[attrs.idhigh || 1];
    return [low != null ? num2int(low) : low, high != null ? num2int(high) : high];
};
types.integerrange.put = function(attrs, obj, val) {
    if (val == null) val = [attrs.low || 0, attrs.high || 2147483647];
    obj[attrs.id || 0] = val[0];
    obj[attrs.idhigh || 1] = val[1];
};
types.integerrange.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.idhigh || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.idhigh);
};
types.integerrange.hasValue = function(attrs, val) {
    return val[0] != (attrs.low || 0) || val[1] != (attrs.high || 2147483647);
};
types.integerrange.tostr = function(attrs, val) {
    var low = val[0];
    var high = val[1];
    if (low == null) {
        low = attrs.deflow != null ? attrs.deflow : attrs.low || 0;
    }
    if (high == null) {
        high = attrs.defhigh != null ? attrs.defhigh : attrs.high || 2147483647;
    }
    if (low == high) return low.toString();
    return num2int(low).toString() + '..' + num2int(high).toString();
};
types.integerrange.fromstr = function(attrs, str, limit) {
    var v = str.split('..');
    var low = string2int(v[0]);
    if (low == null || !iminmax(low, attrs.low, attrs.high)) return null;
    if (v.length == 1) return [low, low];
    var high = string2int(v[1]);
    if (high == null || !iminmax(high, attrs.low, attrs.high)) return null;
    if (limit && limit.ranges) {
        var ranges = limit.ranges;
        for (var i = 0; i < ranges.length; i += 2) {
            if (iminmax(low, ranges[i], ranges[i + 1]) && iminmax(high, ranges[i], ranges[i + 1])) return [low, high];
        }
        return null;
    }
    return [low, high];
};
types.integerrange.deflimit = function(attrs) {
    str = '';
    if (attrs.low != null) str = num2int(attrs.low).toString();
    str += '..';
    if (attrs.high != null) str += num2int(attrs.high).toString();
    return str;
};
types.integerrange.addlimit = function(attrs, limit, str) {
    if (!limit.ranges) limit.ranges = [];
    return parseLimit(limit.ranges, str, attrs.low != null ? attrs.low : num2int(0x80000000), attrs.high != null ? attrs.high : num2int(0x7fffffff), function(str) {
        var v = string2int(str);
        if (v == null || !iminmax(v, attrs.low, attrs.high)) return null;
        return v;
    });
};
types.integerrange.matcher = function(attr, opt, val) {
    return types.numberrange.matcher(attr, opt, val);
};
types.integerrange.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.numberlist = inherit(types.def);
types.numberlist.tostr = function(attrs, val) {
    if (val == null) {
        val = [];
        if (attrs.def != null) val = attrs.def;
    }
    var str = '';
    for (var i in val) {
        if (str.length > 0) str += ',';
        str += val[i].toString(attrs.radix || 10);
    }
    return str;
};
types.numberlist.fromstr = function(attrs, str) {
    var a = [];
    if (str == '') return a;
    var vals = str.split(',');
    for (var i in vals) {
        var n = string2int(vals[i], attrs.radix);
        if (n == null || n < 0 || !minmax(n, attrs.min, attrs.max)) return null;
        a.push(n);
    }
    return a;
};
types.numberrange = inherit(types.def);
types.numberrange.get = function(attrs, obj) {
    var low = obj[attrs.id || 0];
    var high = obj[attrs.highid || 1];
    return low != null && high != null ? [low, high] : null;
};
types.numberrange.put = function(attrs, obj, val) {
    if (val == null) val = [attrs.min || 0, attrs.max || int2num(-1)];
    obj[attrs.id || 0] = val[0];
    obj[attrs.highid || 1] = val[1];
};
types.numberrange.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.highid || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.highid);
};
types.numberrange.hasValue = function(attrs, val) {
    return val[0] != (attrs.min || 0) || val[1] != (attrs.max || int2num(-1));
};
types.numberrange.tostr = function(attrs, val) {
    var low = val && val[0];
    var high = val && val[1];
    if (low == null) {
        low = attrs.deflow != null ? attrs.deflow : attrs.min || 0;
    }
    if (high == null) {
        high = attrs.defhigh != null ? attrs.defhigh : attrs.max || int2num(-1);
    }
    var radix = attrs.radix || 10;
    if (low == high) return low.toString(radix);
    return low.toString(radix) + '-' + high.toString(radix);
};
types.numberrange.fromstr = function(attrs, str, limit) {
    var v = str.split('-');
    var low = string2int(v[0], attrs.radix);
    if (low == null || !minmax(low, attrs.min, attrs.max) || low < 0) return null;
    var high = low;
    if (v.length > 1) {
        if (v.length > 2) return null;
        high = string2int(v[1], attrs.radix);
        if (high == null || !minmax(high, attrs.min, attrs.max) || high < 0) return null;
    }
    if (limit && limit.ranges) {
        var ranges = limit.ranges;
        for (var i = 0; i < ranges.length; i += 2) {
            if (minmax(low, ranges[i], ranges[i + 1]) && minmax(high, ranges[i], ranges[i + 1])) return [low, high];
        }
        return null;
    }
    return [low, high];
};
types.numberrange.deflimit = function(attrs) {
    var str = (attrs.min || 0).toString(attrs.radix || 10) + '..';
    if (attrs.max != null) str += attrs.max.toString(attrs.radix || 10);
    return str;
};
types.numberrange.addlimit = function(attrs, limit, str) {
    if (!limit.ranges) limit.ranges = [];
    return parseLimit(limit.ranges, str, attrs.min || 0, attrs.max || 0xffffffff, function(str) {
        var n = string2int(str);
        if (n == null || n < 0) return null;
        if (!minmax(n, attrs.min, attrs.max)) return null;
        return n;
    });
};
types.numberrange.matcher = function(attr, opt, val) {
    var res = ftype(attr).fromstr(attr, trim(val));
    if (res == null) return null;
    switch (opt) {
        case OP_IS:
            return function(v) {
                return v[0] == res && v[1] == res;
            }
        case OP_CONTAIN:
            return function(v) {
                return v[0] <= res && res <= v[1];
            }
        case OP_CONTAIN_NOT:
            return function(v) {
                return res < v[0] || res > v[1];
            }
        case OP_LS:
            return function(v) {
                return v[1] < res;
            }
        case OP_LEQ:
            return function(v) {
                return v[1] <= res;
            }
        case OP_GT:
            return function(v) {
                return v[0] > res;
            }
        case OP_GEQ:
            return function(v) {
                return v[0] >= res;
            }
    }
    return function(v) {
        return true;
    }
};
types.numberrange.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_CONTAIN, OP_CONTAIN_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.numberrangelist = inherit(types.def);
types.numberrangelist.hasValue = function(attrs, val) {
    return val.length > 0;
};
types.numberrangelist.fromstr = function(attrs, str, limit) {
    var v = str.split(',');
    var a = [];
    for (var i in v) {
        if (v[i] == '') continue;
        var e = string2enum(attrs.values, v[i]);
        if (e != null) {
            if (!fitsRangeLimit(e, limit)) return null;
            a.push(e);
            a.push(e);
        }
        else {
            var r = types.numberrange.fromstr(attrs, v[i], limit);
            if (r == null || r[0] > r[1]) return null;
            a.push(r[0]);
            a.push(r[1]);
        }
    }
    return a;
};
types.numberrangelist.tostr = function(attrs, val) {
    if (val == null) return '';
    var str = '';
    for (var i = 0; i < val.length; i += 2) {
        if (i > 0) str += ',';
        var v = enum2string(attrs.values, val[i]);
        if (v) {
            str = str + v;
        }
        else {
            str = str + types.numberrange.tostr(attrs, [val[i], val[i + 1]]);
        }
    }
    return str;
};
types.numberrangelist.deflimit = function(attrs) {
    return types.numberrange.deflimit(attrs);
};
types.numberrangelist.addlimit = function(attrs, limit, str) {
    return types.numberrange.addlimit(attrs, limit, str);
};
types.numbertable = inherit(types.def);
types.numbertable.view = function(attrs, ro) {
    return new NumberTableView(attrs);
};
types.table = inherit(types.def);
types.table.view = function(attrs, ro) {
    return new TableView(attrs);
};
types.object = inherit(types.def);
types.object.get = function(attrs, obj) {
    var o = obj[attrs.id];
    if (!o) o = obj[attrs.id] = {};
    if (!o._owner) {
        o._owner = new Listeners();
    }
    return o;
};
types.object.view = function(attrs, ro) {
    return new ObjectView(attrs);
};
types.interval = inherit(types.integer);
types.interval.fromstr = function(attrs, str, limit) {
    var n = string2enum(attrs.values, str);
    if (n == null) {
        n = string2interval(str, attrs.scale);
        if (n == null || !iminmax(attrs, n)) return null;
    }
    if (limit && limit.ranges) {
        var ranges = limit.ranges;
        for (var i = 0; i < ranges.length; i += 2) {
            if (iminmax(n, ranges[i], ranges[i + 1])) return n;
        }
        return null;
    }
    return n;
};
types.interval.tostr = function(attrs, val) {
    if (!val) val = attrs.def || 0;
    return enum2string(attrs.values, val) || interval2string(val, attrs.scale || 1);
};
types.interval.deflimit = function(attrs) {
    var str = this.tostr(attrs, attrs.min || 0) + '..';
    if (attrs.max != null) str += this.tostr(attrs, attrs.max);
    return str;
};
types.interval.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.age = inherit(types.def);
types.age.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    if (val == null) return null;
    if (attrs.scale) val = Math.floor(val / attrs.scale);
    return val;
};
types.age.hasValue = function(attrs, val) {
    return val != null && val != 0xffffffff;
};
types.age.tostr = function(attrs, val) {
    var str = enum2string(attrs.values, val);
    if (str != null) return str;
    if (attrs.opt && (val == null || val == 0xffffffff)) return '';
    var uptime = getUptime();
    val = Math.abs(val - uptime);
    return interval2string(val, 1);
};
types.age.listen = function(attrs, cb) {
    ticker.listen(cb);
};
types.age.unlisten = function(attrs, cb) {
    ticker.unlisten(cb);
};
types.age.matcher = function(attr, opt, val) {
    return types.number.matcher(attr, opt, val);
};
types.age.filter = function(attr, opt) {
    if (opt) return [OP_IS, OP_IS_NOT, OP_LS, OP_LEQ, OP_GT, OP_GEQ];
    if (attr.name) return attr.name;
    return "";
};
types.as = inherit(types.number);
types.as.fromstr = function(attrs, str) {
    var p = str.split('.');
    if (p.length == 2) {
        var h = string2int(p[0]);
        if (h == null || h < 0 || h >= 0x10000) return null;
        var l = string2int(p[1]);
        if (l == null || l < 0 || l >= 0x10000) return null;
        return h * 0x10000 + l;
    }
    var v = string2int(str);
    if (v == null || v < 0) return null;
    return v;
};
types.community = inherit(types.def);
types.community.values = {
    type: 'static',
    map: {
        0: 'internet',
        0xFFFFFF01: 'no export',
        0xFFFFFF02: 'no advertise',
        0xFFFFFF03: 'local as'
    }
};
types.community.get = function(attrs, obj) {
    if (obj[attrs.id || 0] == null) return null;
    return [obj[attrs.id || 0], obj[attrs.highid || 1] || 0];
};
types.community.put = function(attrs, obj, val) {
    if (val == null) val = [0, 0];
    obj[attrs.id || 0] = val[0];
    obj[attrs.highid || 1] = val[1];
};
types.community.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.highid || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.highid);
};
types.community.tostr = function(attrs, val) {
    if (val == null) val = [0, 0];
    var str = enum2string(this.values, val[0]);
    if (str) return str;
    return val[0] + ':' + val[1];
};
types.community.fromstr = function(attrs, str) {
    var val = string2enum(this.values, str);
    if (val != null) return [val, 0];
    var x = str.split(':');
    if (x.length != 2) return null;
    var p = string2int(x[0]);
    if (p == null || p < 0) return null;
    var s = string2int(x[1]);
    if (s == null || s < 0) return null;
    return [p, s];
};
types.community.view = function(attrs, ro) {
    attrs.values = types.community.values;
    return types.def.view(attrs, ro);
};
types.string = inherit(types.def);
types.string.hasValue = function(attrs, val) {
    return val.length > 0;
};
types.string.tostr = function(attrs, val) {
    if (val != null) return val;
    if (attrs.defuser) return sysres.user;
    return attrs.def || '';
};
types.string.fromstr = function(attrs, str, limit) {
    if (attrs.strict && attrs.values) {
        if (string2enum(attrs.values, str) != null) return str;
        return null;
    }
    if (!minmax(str.length, attrs.min, attrs.max)) return null;
    if (limit && limit.prefixes) {
        if (!hasOneOfPrefixes(limit.prefixes, str)) return null;
    }
    return str;
};
types.string.less = function(attrs, s1, s2) {
    function trimdigits(s) {
        for (var i = s.length - 1; i >= 0; --i) {
            var c = s.charCodeAt(i);
            if (c < 0x30 || c > 0x39) return i + 1;
        }
        return 0;
    }
    var l1 = trimdigits(s1);
    if (l1 != s1.length) {
        var l2 = trimdigits(s2);
        if (l2 != s2.length && l1 == l2) {
            var p1 = s1.slice(0, l1);
            var p2 = s2.slice(0, l2);
            if (p1 < p2) return true;
            if (p1 > p2) return false;
            return parseInt(s1.slice(l1)) < parseInt(s2.slice(l2));
        }
    }
    return s1 < s2;
};
types.string.deflimit = function(attrs) {
    return '';
};
types.string.addlimit = function(attrs, limit, str) {
    if (!limit.prefixes) limit.prefixes = [];
    limit.prefixes.push(str);
    return true;
};
types.string.matcher = function(attr, opt, val) {
    var res = ftype(arr).fromstr(attr, val);
    if (res == null) return null;
    switch (opt) {
        case OP_CONTAIN:
            return function(v) {
                return v.indexOf(res) != -1;
            }
        case OP_CONTAIN_NOT:
            return function(v) {
                return v.indexOf(res) == -1;
            }
        case OP_IS:
            return function(v) {
                return v == res;
            }
        case OP_IS_NOT:
            return function(v) {
                return v != res;
            }
    }
    return function(v) {
        return true;
    }
};
types.string.filter = function(attr, opt) {
    if (opt) return [OP_CONTAIN, OP_CONTAIN_NOT, OP_IS, OP_IS_NOT];
    if (attr.name) return attr.name;
    return "";
};
types.version = inherit(types.string);
types.version.less = function(attrs, v1, v2) {
    return string2version(v1) < string2version(v2);
};
types.secret = inherit(types.string);
types.secret.cell = function(doc, attrs, obj, val) {
    if (attrs.cond && !attrs.cond.isTrue(obj)) return null;
    var str = '';
    if (val != null || !attrs.opt) str = ftype(attrs).tostr(attrs, val);
    if (hidePasswords) {
        var x = '';
        while (x.length < str.length) x += '*';
        str = x;
    }
    return str != '' ? itxt(doc, null, str) : null;
};
types.secret.listen = function(attrs, cb) {
    hidePasswordsLstn.listen(cb);
};
types.secret.unlisten = function(attrs, cb) {
    hidePasswordsLstn.unlisten(cb);
};
types.secret.view = function(attrs, ro) {
    if (attrs.values) {
        return types.def.view(attrs, ro);
    }
    if (ro) {
        return new ROSecretView(attrs);
    }
    if (attrs.opt) {
        return new OptView(attrs, new SecretView(attrs));
    }
    return new SecretView(attrs);
};
types.script = inherit(types.string);
types.script.view = function(attrs, ro) {
    if (ro) return ROTextView(attrs, 5);
    return new TextAreaView(attrs);
};
types.packet = inherit(types.string);
types.packet.view = function(attrs, ro) {
    return new ROPreTextView(attrs);
};
types.multilinestring = inherit(types.string);
types.multilinestring.view = function(attrs, ro) {
    if (ro) return new ROTextView(attrs, attrs.lines);
    return new TextAreaView(attrs);
};
types.stringarray = inherit(types.def);
types.stringarray.tostr = function(attrs, val) {
    if (val == null) return null;
    return val.join('\n');
};
types.stringarray.view = function(attrs, ro) {
    return new ROTextView(attrs, attrs.rows);
};
types.ipaddr = inherit(types.def);
types.ipaddr.put = function(attrs, obj, val) {
    obj[attrs.id || 0] = val != null ? val : 0;
};
types.ipaddr.hasValue = function(attrs, val) {
    return val != 0;
};
types.ipaddr.tostr = function(attrs, val) {
    return ipaddr2string(val || attrs.def || 0);
};
types.ipaddr.fromstr = function(attrs, str) {
    var addr = string2ipaddr(str);
    if (addr == null) return null;
    if (attrs.zeroinvalid && (addr == 0)) return null;
    return addr;
};
types.ipaddr.less = function(attrs, v1, v2) {
    v1 = ntohl(v1);
    v2 = ntohl(v2);
    if (v1 < 0) {
        if (v2 >= 0) return false;
        return v1 < v2;
    }
    else if (v2 < 0) {
        return true;
    }
    return v1 < v2;
};
types.ipaddr.matcher = function(attr, opt, val) {
    var res = types.network.fromstr({
        range: 1
    }, val);
    if (res == null) return null;
    switch (opt) {
        case OP_IN:
            return function(v) {
                return (v >= res[1] && v <= res[0]) ^ 0;
            };
        case OP_IN_NOT:
            return function(v) {
                return (v >= res[1] && v <= res[0]) ^ 1;
            };
    }
    return function(v) {
        return true;
    };
};
types.ipaddr.filter = function(attr, opt) {
    if (opt) return [OP_IN, OP_IN_NOT];
    if (attr.name) return attr.name;
    return "";
};
types.ipaddrandport = inherit(types.def);
types.ipaddrandport.get = function(attrs, obj) {
    return [obj[attrs.id || 0], obj[attrs.portid || 1]];
};
types.ipaddrandport.put = function(attrs, obj, val) {
    if (val == null) val = [0, 0];
    obj[attrs.id || 0] = val[0];
    obj[attrs.portid || 1] = val[1];
};
types.ipaddrandport.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.portid || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.portid);
};
types.ipaddrandport.tostr = function(attrs, val) {
    var str = ipaddr2string(val[0]);
    if (val[1]) str += ':' + val[1];
    return str;
};
types.ipaddrandport.fromstr = function(attrs, str) {
    return null;
};
types.ipaddrandport.less = function(attrs, v1, v2) {
    var a1 = ntohl(v1[0]);
    var a2 = ntohl(v2[0]);
    if (a1 < a2) return true;
    if (a1 > a2) return false;
    return v1[1] < v2[2];
};
types.netmask = inherit(types.def);
types.netmask.fromstr = function(attrs, str) {
    var m = string2int(str);
    if (m != null) {
        if (m < 0 || m > 32) return null;
        return len2netmask(m);
    }
    return string2ipaddr(str);
};
types.netmask.tostr = function(attrs, val) {
    return netmask2len(val).toString();
};
types.netmask.less = function(attrs, v1, v2) {
    return ntohl(v1) < ntohl(v2);
};
types.network = inherit(types.def);
types.network.get = function(attrs, obj) {
    var addr = obj[attrs.id || 0];
    if (addr == null) return null;
    var mask = obj[attrs.maskid || 1];
    return [addr, mask];
};
types.network.put = function(attrs, obj, val) {
    if (val == null) val = [0, 0];
    obj[attrs.id || 0] = val[0];
    obj[attrs.maskid || 1] = val[1];
};
types.network.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.maskid || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.maskid);
};
types.network.tostr = function(attrs, val) {
    if (val == null) val = [0, 0];
    var addr = val[0] || 0;
    var mask = val[1];
    if (mask == undefined) mask = attrs.deflen || 0;
    var str = ipaddr2string(addr);
    if (attrs.range) {
        if (addr == mask) return str;
        for (var i = 31; i >= 0; --i) {
            var m = int2num(~len2netmask(i));
            if (int2num(addr | m) == int2num(mask) && (addr & m) == 0) {
                return str + '/' + i;
            }
        }
        return str + '-' + ipaddr2string(mask);
    }
    return str + '/' + netmask2len(mask);
};
types.network.fromstr = function(attrs, val) {
    if (attrs.range) {
        var a = val.split('-', 2);
        if (a.length == 2) {
            var addr1 = string2ipaddr(a[0]);
            var addr2 = string2ipaddr(a[1]);
            if (addr1 === null || addr2 === null) return null;
            return [addr1, addr2];
        }
    }
    var a = val.split('/', 2);
    var addr = string2ipaddr(a[0]);
    if (addr == null) return null;
    var mask = 0xffffffff;
    if (a.length == 2) {
        mask = string2ipaddr(a[1]);
        if (mask == null) {
            var len = string2int(a[1]);
            if (len == null || len > 32) return null;
            mask = len2netmask(len);
        }
    }
    if (attrs.range) return [addr & mask, addr | ~mask];
    if (!attrs.hostnonzero && (addr & ~mask) != 0) return null;
    if (attrs.zeroinvalid && (addr == 0)) return null;
    return [addr, mask];
};
types.network.less = function(attrs, v1, v2) {
    var a1 = ntohl(v1[0]);
    var a2 = ntohl(v2[0]);
    if (a1 < 0) {
        if (a2 >= 0) return false;
    }
    else if (a2 < 0) {
        return true;
    }
    if (a1 < a2) return true;
    if (a1 > a2) return false;
    return ntohl(v1[1]) < ntohl(v2[1]);
};
types.network.matcher = function(attr, opt, val) {
    var res = this.fromstr(attr, val);
    if (res == null) return null;
    if ((res[0] & ~res[1]) != 0) return null;
    var func = null;
    if (attr.range) {
        res[0] = ntohl(res[0]);
        res[1] = ntohl(res[1]);
        func = function(v) {
            var first = ntohl(v[0]);
            var last = ntohl(v[1]);
            return first >= res[0] && first <= res[1] && last <= res[1];
        };
    }
    else {
        func = function(v) {
            var first = v[0];
            var last = first | (~v[1]);
            return res[0] == (first & res[1]) && res[0] == (last & res[1]);
        };
    }
    switch (opt) {
        case OP_IS:
            return function(v) {
                return res[0] == v[0] && res[1] == v[1];
            }
        case OP_IN:
            return function(v) {
                return func(v) ^ 0;
            };
        case OP_IN_NOT:
            return function(v) {
                return func(v) ^ 1;
            };
    }
    return function(v) {
        return true;
    };
};
types.network.filter = function(attr, opt) {
    if (opt) {
        if (attr.range) return [OP_IN, OP_IN_NOT];
        return [OP_IN, OP_IS, OP_IN_NOT];
    }
    if (attr.name) return attr.name;
    return "";
};
types.ip6addr = inherit(types.def);
types.ip6addr.get = function(attrs, obj) {
    var addr = obj[attrs.id || 0];
    if (addr == null) return null;
    if (attrs.ifaceid) return [addr, obj[attrs.ifaceid] || 0];
    return addr;
};
types.ip6addr.put = function(attrs, obj, val) {
    if (attrs.ifaceid) {
        if (val == null) val = [fillarray(0, 16), 0];
        obj[attrs.id] = val[0];
        obj[attrs.ifaceid] = val[1];
    }
    else {
        obj[attrs.id || 0] = val != null ? val : fillarray(0, 16);
    }
};
types.ip6addr.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    if (attrs.ifaceid) delete obj[attrs.ifaceid];
    unset(obj, attrs.id);
    unset(obj, attrs.ifaceid);
};
types.ip6addr.tostr = function(attrs, val) {
    if (val == null) return attrs.allowipv4 ? '0.0.0.0' : '::';
    if (attrs.ifaceid) {
        if (!attrs.ifaces) {
            attrs.ifaces = {
                type: 'dynamic',
                path: [20, 0]
            };
        }
        var str = ip6addr2string(val[0]);
        if (val[1]) {
            var iface = enum2string(attrs.ifaces, val[1]) || 'unknown';
            return str + '%' + iface;
        }
        return str;
    }
    if (attrs.allowipv4) {
        var ip4 = ip6addr2ipaddr(val);
        if (ip4 != null) return ipaddr2string(ip4);
    }
    return ip6addr2string(val);
};
types.ip6addr.fromstr = function(attrs, str) {
    var zone = 0;
    if (attrs.ifaceid) {
        if (!attrs.ifaces) {
            attrs.ifaces = {
                type: 'dynamic',
                path: [20, 0]
            };
        }
        var a = str.split('%');
        if (a.length > 2) return null;
        if (a.length == 2) {
            str = a[0];
            zone = string2enum(attrs.ifaces, a[1]);
            if (zone == null) return null;
        }
    }
    var addr = null;
    if (attrs.allowipv4) {
        var ip4 = string2ipaddr(str);
        if (ip4 != null) addr = ipaddr2ip6addr(ip4);
    }
    if (addr == null) addr = string2ip6addr(str);
    if (addr == null) return null;
    if (attrs.zeroinvalid) {
        var valid = false;
        for (var i = 0; i < 16; ++i) {
            if (addr[i]) {
                valid = true;
                break;
            }
        }
        if (!valid) return null;
    }
    return attrs.ifaceid ? [addr, zone] : addr;
};
types.ip6addr.listen = function(attrs, cb) {
    if (attrs.ifaceid) {
        if (!attrs.ifaces) {
            attrs.ifaces = {
                type: 'dynamic',
                path: [20, 0]
            };
        }
        enm.dynamic.listen(attrs.ifaces, cb);
    }
    types.def.listen(attrs, cb);
};
types.ip6addr.unlisten = function(attrs, cb) {
    if (attrs.ifaceid) {
        enm.dynamic.unlisten(attrs.ifaces, cb);
    }
    types.def.unlisten(attrs, cb);
};
types.network6 = inherit(types.network);
types.network6.put = function(attrs, obj, val) {
    if (val == null) val = [fillarray(0, 16), 0];
    obj[attrs.id || 0] = val[0];
    obj[attrs.maskid || 1] = val[1];
};
types.network6.tostr = function(attrs, val) {
    if (val == null) return '::/' + (attrs.deflen || 0);
    var addr = val[0] != null ? ip6addr2string(val[0]) : "::";
    if (val[1] == 128) return addr;
    return addr + '/' + (val[1] || 0);
};
types.network6.fromstr = function(attrs, str) {
    var v = str.split('/');
    var addr = string2ip6addr(v[0]);
    if (addr == null) return null;
    var len = 128;
    if (v.length == 2) {
        len = string2int(v[1]);
        if (len == null || len < 0 || len > 128) return null;
    }
    if (!attrs.hostnonzero && len != 128) {
        var i = 15;
        for (var bits = 128; bits - 8 > len; bits -= 8) {
            if (addr[i--]) return null;
        }
        if (addr[i] & ((1 << (8 - (len & 7))) - 1)) return null;
    }
    if (attrs.zeroinvalid) {
        for (var i = 0; i < 16; ++i) {
            if (addr[i]) return [addr, len];
        }
        return null;
    }
    return [addr, len];
};
types.macaddr = inherit(types.def);
types.macaddr.put = function(attrs, obj, val) {
    if (val == null) val = [0, 0, 0, 0, 0, 0];
    obj[attrs.id || 0] = val;
};
types.macaddr.hasValue = function(attrs, val) {
    if (val == null) return false;
    for (var i = 0; i < 6; ++i) {
        if (val[i]) return true;
    }
    return false;
};
types.macaddr.tostr = function(attrs, val) {
    if (val == null || val.length == 0) {
        if (attrs.randomdef) {
            val = [];
            val.push(0x2);
            for (var i = 1; i < 6; ++i) {
                val.push(Math.floor(Math.random() * 256));
            }
        }
        else {
            var d = attrs.def || 0;
            val = [d, d, d, d, d, d];
        }
    }
    var str = '';
    for (var i = 0; i < 6; ++i) {
        if (str.length > 0) str += ':';
        if (val[i] < 16) str += '0';
        str += (val[i].toString(16)).toUpperCase();
    }
    return str;
};
types.macaddr.fromstr = function(attrs, str, limit) {
    if (limit && limit.prefixes) {
        if (!hasOneOfPrefixes(limit.prefixes, str)) return null;
    }
    var i = 0;
    var gotDigit = false;
    var addr = [];
    while (i < str.length) {
        var ch = str.substr(i, 1);
        if (!isNaN(parseInt(ch, 16))) {
            var len = 1;
            if (i + 1 < str.length) {
                if (!isNaN(parseInt(str.substr(i + 1, 1), 16))) ++len;
            }
            addr.push(parseInt(str.substr(i, len), 16));
            i += len;
            gotDigit = true;
        }
        else if (ch == ' ') {
            ++i;
        }
        else if (ch == ':' || ch == '-') {
            if (!gotDigit) return null;
            gotDigit = false;
            ++i;
        }
        else {
            return null;
        }
    }
    if (addr.length == 0) addr = [0, 0, 0, 0, 0, 0];
    if (addr.length != 6) return null;
    return addr;
};
types.macaddr.deflimit = function(attrs) {
    return '';
};
types.macaddr.addlimit = function(attrs, limit, str) {
    if (!limit.prefixes) limit.prefixes = [];
    limit.prefixes.push(str);
    return true;
}
types.macaddr.matcher = function(attr, opt, val) {
    var res = this.fromstr(attr, val);
    if (res == null) return null;
    switch (opt) {
        case OP_IN:
            return function(v) {
                if (v.length == 0) return ((res.length == 0) ^ 0);
                if (v.length != 6) return false;
                for (var i in v) {
                    if (v[i] != res[i])
                        return false;
                }
                return true;
            };
        case OP_IN_NOT:
            return function(v) {
                if (v.length == 0) return ((res.length == 0) ^ 1);
                if (v.length != 6) return false;
                for (var i in v) {
                    if (v[i] != res[i])
                        return true;
                }
                return false;
            };
    }
    return function(v) {
        return true;
    };
}
types.macaddr.filter = function(attr, opt) {
    if (opt) return [OP_IN, OP_IN_NOT];
    if (attr.name) return attr.name;
    return "";
};
types.macnetwork = inherit(types.def);
types.macnetwork.get = function(attrs, obj) {
    var addr = obj[attrs.id || 0];
    var mask = obj[attrs.maskid || 1];
    if (addr == null || mask == null) return null;
    return [addr, mask];
}
types.macnetwork.put = function(attrs, obj, val) {
    obj[attrs.id || 0] = val[0];
    obj[attrs.maskid || 1] = val[1];
};
types.macnetwork.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    delete obj[attrs.maskid || 0];
    unset(obj, attrs.id);
    unset(obj, attrs.maskid);
};
types.macnetwork.hasValue = function(attrs, val) {
    if (val == null) return false;
    for (var i = 0; i < 6; ++i) {
        if (val[0][i] || val[1][i]) return true;
    }
    return false;
};
types.macnetwork.tostr = function(attrs, val) {
    if (val == null || val[0].length == 0) {
        return types.macaddr.tostr(attrs, null);
    }
    var str = types.macaddr.tostr(attrs, val[0]);
    if (hasall(val[0], 0)) {
        if (hasall(val[1], 0)) return str;
    }
    else if (hasall(val[1], 0xff)) {
        return str;
    }
    return str + '/' + types.macaddr.tostr(attrs, val[1]);
};
types.macnetwork.fromstr = function(attrs, str, limit) {
    var vals = str.split('/');
    var addr = types.macaddr.fromstr(attrs, vals[0], limit);
    if (addr == null) return null;
    var mask;
    if (vals[1]) {
        mask = types.macaddr.fromstr(attrs, vals[1]);
        if (mask == null) return null;
    }
    else {
        if (!hasall(addr, 0)) {
            mask = [0xff, 0xff, 0xff, 0xff, 0xff, 0xff];
        }
        else {
            mask = [0, 0, 0, 0, 0, 0];
        }
    }
    return [addr, mask];
};
types.macnetwork.deflimit = function(attrs) {
    return types.macaddr.deflimit(attrs);
};
types.macnetwork.addlimit = function(attrs, limit, str) {
    return types.macaddr.addlimit(attrs, limit, str);
};
types.date = inherit(types.def);
types.date.tostr = function(attrs, val) {
    return dateAndTime2string(getDate(val), getTime(val), false);
};
types.date.fromstr = function(obj, attrs, str) {
    return null;
};
types.dateandtime = inherit(types.def);
types.dateandtime.get = function(attrs, obj) {
    if (attrs.timeid) {
        if (obj[attrs.id] == null) return null;
        return [obj[attrs.id], obj[attrs.timeid]];
    }
    var val = obj[attrs.id];
    if (val == null) return null;
    return [getDate(val), getTime(val)];
};
types.dateandtime.put = function(attrs, obj, val) {
    if (attrs.timeid) {
        obj[attrs.id] = val[0];
        obj[attrs.timeid] = val[1];
    }
    else {
        obj[attrs.id] = val[0] + val[1];
    }
};
types.dateandtime.remove = function(attrs, obj) {
    delete obj[attrs.id];
    if (attrs.timeid) delete obj[attrs.timeid];
    unset(obj, attrs.id);
    unset(obj, attrs.timeid);
};
types.dateandtime.tostr = function(attrs, val) {
    if (val == null) {
        var d = attrs.todaydef ? getDate(getNow()) : (attrs.def || 0);
        val = [d, 0];
    }
    var str = enum2string(attrs.values, val[0]);
    if (str != null) return str;
    if (attrs.relative) {
        var utc = getNow() + Math.floor((val[0] + val[1]) / 100) - getUptime();
        var d = new Date(utc * 1000);
        var s = (d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds();
        val = [utc - s, s];
    }
    return dateAndTime2string(val[0], val[1], true);
};
types.dateandtime.fromstr = function(attrs, str) {
    var v = string2enum(attrs.values, str);
    if (v != null) return [v, 0];
    var a = str.split(' ');
    var time = 0;
    if (a.length > 2) return null;
    if (a.length == 2) {
        time = string2interval(a[1]);
        if (time == null) return null;
    }
    var date = string2date(a[0]);
    if (date == null) return null;
    return [date, time];
};
types.clocktime = inherit(types.def);
types.clocktime.put = function(attrs, obj, val) {
    obj[attrs.id] = getDate(obj[attrs.id] || 0) + val;
};
types.clocktime.tostr = function(attrs, val) {
    if (val == null) val = getNow();
    return interval2string(getTime(val));
};
types.clocktime.fromstr = function(attrs, str) {
    return string2interval(str);
};
types.clockdate = inherit(types.def);
types.clockdate.put = function(attrs, obj, val) {
    obj[attrs.id] = getTime(obj[attrs.id] || 0) + val;
};
types.clockdate.tostr = function(attrs, val) {
    if (val == null) val = getNow();
    return date2string(getDate(val));
};
types.clockdate.fromstr = function(attrs, str) {
    return string2date(str);
};
types.timezone = inherit(types.def);
types.timezone.tostr = function(attrs, val) {
    return timezone2string(num2int(val) || 0);
};
types.timezone.fromstr = function(attrs, str) {
    return string2timezone(str);
};
types.enm = inherit(types.def);
types.enm.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    return val != null ? int2num(val) : null;
};
types.enm.put = function(attrs, obj, val) {
    if (val == null) val = attrs.def || 0;
    obj[attrs.id || 0] = val;
};
types.enm.tostr = function(attrs, val) {
    if (val == null) {
        if (attrs.def != null) {
            val = attrs.def;
        }
        else if (attrs.c) {
            var str = ftype(attrs.c[0]).tostr(attrs.c[0], null);
            val = ftype(attrs.c[0]).fromstr(attrs.c[0], str);
        }
        else {
            val = 0;
        }
    }
    var str = enum2string(attrs.values, val);
    if (str != null) return str;
    if (attrs.strict) {
        var type = enm[attrs.values.type];
        if (type) {
            var v = getfirst(type.getMap(attrs.values));
            if (v != null) {
                str = enum2string(attrs.values, v);
                if (str) return str;
            }
        }
    }
    if (attrs.c) {
        return ftype(attrs.c[0]).tostr(attrs.c[0], val);
    }
    if (attrs.opt) return '';
    return 'unknown';
};
types.enm.fromstr = function(attrs, str, limit) {
    if (str == '') return null;
    if (limit && limit.prefixes && !hasOneOfPrefixes(limit.prefixes, str)) return null;
    var val = string2enum(attrs.values, str);
    if (val != null) {
        if (!attrs.c || !limit || !limit.inner || ftype(attrs.c[0]).fromstr(attrs.c[0], str) == null) {
            return val;
        }
    }
    if (attrs.c) {
        var innerlimit = limit ? limit.inner : null;
        return ftype(attrs.c[0]).fromstr(attrs.c[0], str, innerlimit);
    }
    return null;
};
types.enm.less = function(attrs, v1, v2) {
    if (!attrs.sortbyvalue) return v1 < v2;
    return types.enm.tostr(attrs, v1) < types.enm.tostr(attrs, v2);
};
types.enm.hasValue = function(attrs, val) {
    if (attrs.c && ftype(attrs.c[0]).hasValue(attrs.c[0], val)) return true;
    return enum2string(attrs.values, val) != null;
};
types.enm.view = function(attrs, ro) {
    if (ro) return new ROTextView(attrs);
    var v;
    if (attrs.c) {
        v = new ComboView(attrs);
    }
    else if (attrs.radio) {
        v = new RadioView(attrs);
    }
    else {
        v = new EnumView(attrs);
    }
    if (attrs.opt) v = new OptView(attrs, v);
    return v;
};
types.enm.deflimit = function(attrs) {
    if (attrs.c) {
        var l = ftype(attrs.c[0]).deflimit(attrs.c[0]);
        if (l != null) return l;
    }
    return '';
};
types.enm.addlimit = function(attrs, limit, str) {
    var invert = false;
    if (str[0] == '!') {
        invert = true;
        str = str.substr(1);
    }
    if (limit.invert && !invert) return;
    if (!limit.invert && invert) {
        limit.prefixes = null;
        limit.invert = true;
    }
    if (!invert && attrs.c) {
        var type = enm[attrs.values.type];
        if (!type || !hasPrefixIn(str, type.getMap(attrs.values))) {
            if (!limit.inner) limit.inner = {};
            if (ftype(attrs.c[0]).addlimit(attrs.c[0], limit.inner, str)) {
                return true;
            }
        }
    }
    if (!limit.prefixes) limit.prefixes = [];
    limit.prefixes.push(str);
    return true;
};
types.enm.matcher = function(attr, opt, val) {
    var me = this;
    var idx = -1;
    var map = enm.defenum.getMap(attr);
    for (var i in map) {
        if (map[i] == val) {
            idx = i;
            break;
        }
    }
    switch (opt) {
        case OP_CONTAIN:
            return function(v) {
                return me.tostr(attr, v).indexOf(val) != -1;
            };
        case OP_CONTAIN_NOT:
            return function(v) {
                return me.tostr(attr, v).indexOf(val) == -1;
            };
        case OP_IS:
            return function(v) {
                return v == idx;
            };
        case OP_IS_NOT:
            return function(v) {
                return v == idx;
            };
    }
    return function(v) {
        return true;
    };
};
types.enm.filter = function(attr, opt) {
    if (opt) {
        if (attr.c) return ftype(attr.c[0]).filter(attr.c[0], true);
        return [OP_CONTAIN, OP_CONTAIN_NOT, OP_IS, OP_IS_NOT];
    }
    if (attr.name) return attr.name;
    return "";
};
types.set = inherit(types.def);
types.set.get = function(attrs, obj) {
    var val = obj[attrs.id || 0];
    if (val == null) return null;
    if (attrs.id && attrs.id.charAt(0) == 'U') {
        if (val.length == 0) return null;
        return [val[0], (val[1] != null ? val[1] : ~val[0])];
    }
    var ival = null;
    if (attrs.maskid) ival = obj[attrs.maskid];
    if (!attrs.id) ival = obj[1];
    return [val, (ival != null ? ival : ~val)];
};
types.set.put = function(attrs, obj, val) {
    if (val == null) return;
    if (attrs.id && attrs.id.charAt(0) == 'U') {
        obj[attrs.id] = val;
    }
    else {
        obj[attrs.id || 0] = val[0];
        if (!attrs.id || attrs.maskid) obj[attrs.maskid || 1] = val[1];
    }
};
types.set.remove = function(attrs, obj) {
    delete obj[attrs.id || 0];
    if (attrs.maskid) delete obj[attrs.maskid];
    unset(obj, attrs.id);
    unset(obj, attrs.maskid);
};
types.set.tostr = function(attrs, val) {
    if (val == null) return '';
    var values = attrs.values;
    var type = enm[values.type];
    if (!type) return "###";
    var res = '';
    for (i = 0; i < 32; ++i) {
        if (val[0] & (1 << i)) {
            var s = type.toString(i, values);
            if (s) {
                if (res != '') res += ', ';
                res += s;
            }
        }
    }
    return res;
};
types.set.less = function(attrs, v1, v2) {
    return types.set.tostr(attrs, v1) < types.set.tostr(attrs, v2);
};
types.set.listen = function(attrs, cb) {
    var type = enm[attrs.values.type];
    if (type && type.listen) type.listen(attrs.values, cb);
};
types.set.unlisten = function(attrs, cb) {
    var type = enm[attrs.values.type];
    if (type && type.unlisten) type.unlisten(attrs.values, cb);
};
types.set.view = function(attrs, ro) {
    return new SetView(attrs, ro);
};
types.set.deflimit = function(attrs) {
    return '';
};
types.set.addlimit = function(attrs, limit, str) {
    var invert = false;
    if (str[0] == '!') {
        invert = true;
        str = str.substr(1);
    }
    if (limit.invert && !invert) return;
    if (!limit.invert && invert) {
        limit.prefixes = null;
        limit.invert = true;
    }
    if (!limit.prefixes) limit.prefixes = [];
    limit.prefixes.push(str);
    return true;
};
types.set.matcher = function(attr, opt, val) {
    var map = enm.defenum.getMap(attr);
    var id = null;
    for (var i in map) {
        if (map[i] == val) {
            id = i;
            break;
        }
    }
    if (id == null) return null;
    switch (opt) {
        case OP_CONTAIN:
            return function(v) {
                return ((v[0] & (1 << id)) != 0) ^ 0;
            };
        case OP_CONTAIN_NOT:
            return function(v) {
                return ((v[0] & (1 << id)) != 0) ^ 1;
            };
    }
    return function(v) {
        return true;
    };
};
types.set.filter = function(attr, opt) {
    if (opt) return [OP_CONTAIN, OP_CONTAIN_NOT];
    if (attr.name) return attr.name;
    return "";
};
types.objtype = inherit(types.def);
types.objtype.view = function(attrs, ro) {
    return new ROTextView(attrs);
};
types.objtype.get = function(attrs, obj) {
    return obj._type ? obj._type.title : 'unknown';
};
types.objtype.matcher = function(attr, opt, val) {
    return types.string.matcher(attr, opt, val);
};
types.objtype.filter = function(attr, opt) {
    if (opt) return [OP_CONTAIN, OP_CONTAIN_NOT, OP_IS, OP_IS_NOT];
    if (attr.name) return attr.name;
    return "";
};
types.label = inherit(types.def);
types.label.get = function(attrs, obj) {
    return attrs.name;
};
types.label.put = function(attrs, obj, val) {};
types.label.view = function(attrs, ro) {
    return types.def.view(attrs, true);
};
types.tuple = inherit(types.def);
types.tuple.get = function(attrs, obj, fullData) {
    if (attrs.own) return obj;
    var val = [];
    for (var i in attrs.c) {
        var v = ftype(attrs.c[i]).get(attrs.c[i], obj);
        if (fullData && v == null) return null;
        val.push(v);
    }
    return val;
};
types.tuple.put = function(attrs, obj, val) {
    if (attrs.own) {
        obj[0] = val;
        return;
    }
    for (var i in attrs.c) {
        ftype(attrs.c[i]).put(attrs.c[i], obj, val[i]);
    };
};
types.tuple.remove = function(attrs, obj) {
    if (attrs.own) {
        delete obj[0];
        return;
    }
    for (var i in attrs.c) {
        ftype(attrs.c[i]).remove(attrs.c[i], obj);
    };
};
types.tuple.tostr = function(attrs, val) {
    var str = '';
    var sep = attrs.sep || '/';
    for (var i in val) {
        var s = tostr(attrs.c[i], val[i]);
        if (s.length > 0 && str.length > 0) str += sep;
        str += s;
    }
    return str;
};
types.tuple.fromstr = function(attrs, str) {
    var res = [];
    var vals = str.split(attrs.sep || '/');
    for (var i in attrs.c) {
        var v = ftype(attrs.c[i]).fromstr(attrs.c[i], i < vals.length ? vals[i] : '');
        if (v == null) return null;
        res.push(v);
    }
    return res;
};
types.tuple.less = function(attrs, v1, v2) {
    for (var i in attrs.c) {
        if (v1[i] == null) return v2[i] != null;
        if (v2[i] == null) return false;
        if (ftype(attrs.c[i]).less(attrs.c[i], v1[i], v2[i])) return true;
        if (ftype(attrs.c[i]).less(attrs.c[i], v2[i], v1[i])) return false;
    }
    return false;
};
types.tuple.view = function(attrs, ro) {
    if (!attrs.separate || ro) {
        return types.def.view(attrs, ro);
    }
    return new TupleView(attrs);
};
types.tuple.deflimit = function(attrs) {
    if (attrs.separate) return '';
    return null;
};
types.tuple.addlimit = function(attrs) {
    return null;
};
types.tuple.limit = function(attrs, str) {
    if (!attrs.separate) return types.def.limit(attrs, str);
    var limits = [];
    var chunks = str.split(';');
    for (var i in chunks) {
        if (chunks[i].length == 0) continue;
        if (attrs.c[i] == null) return null;
        if (attrs.c[i].ro) return null;
        var l = ftype(attrs.c[i]).limit(attrs.c[i], chunks[i]);
        if (l == null) return null;
        limits[i] = l;
    }
    if (chunks.length == 1) {
        for (var i = 1; i < attrs.c.length; ++i) limits[i] = limits[0];
    }
    return {
        limits: limits
    };
};
types.union = inherit(types.def);
types.union.get = function(attrs, obj) {
    if (attrs.id) {
        var i = obj[attrs.id] || attrs.def || 0;
        if (attrs.mapping != null) i = attrs.mapping[i] || 0;
        if (i >= attrs.c.length) return [0, null];
        var d = ftype(attrs.c[i]).get(attrs.c[i], obj, true);
        return [i, d];
    }
    else if (attrs.single) {
        for (var i in attrs.c) {
            var d = ftype(attrs.c[i]).get(attrs.c[i], obj, true);
            if (d != null) {
                return [i, d];
            }
        }
        return [(attrs.def || 0), null];
    }
    else {
        var v = [];
        for (var i in attrs.c) {
            v.push(ftype(attrs.c[i]).get(attrs.c[i], obj));
        }
        return v;
    }
};
types.union.put = function(attrs, obj, val) {
    if (attrs.single) {
        if (val == null) {
            val = [0, null];
            for (var i in attrs.c) {
                if (attrs.c[i].opt) {
                    val[0] = i;
                    break;
                }
            }
        }
        for (var i in attrs.c) {
            var a = attrs.c[i];
            if (i != val[0]) ftype(a).remove(a, obj);
        }
        var a = attrs.c[val[0]];
        ftype(a).put(a, obj, val[1]);
        if (attrs.id) {
            var v = val[0];
            if (attrs.mapping != null) {
                for (var i in attrs.mapping) {
                    if (attrs.mapping[i] == v) {
                        v = i;
                        break;
                    }
                }
            }
            obj[attrs.id] = v;
        }
    }
    else {
        if (val == null) val = [];
        for (var i in attrs.c) {
            if (val[i] != null) {
                ftype(attrs.c[i]).put(attrs.c[i], obj, val[i]);
            }
        }
    }
};
types.union.remove = function(attrs, obj) {
    for (var i in attrs.c) {
        ftype(attrs.c[i]).remove(attrs.c[i], obj);
    }
};
types.union.hasValue = function(attrs, val) {
    if (attrs.single) {
        if (val[1] == null) return false;
        var a = attrs.c[val[0]];
        return ftype(a).hasValue(a, val[1]);
    }
    for (var i in val) {
        if (val[i] != null && ftype(attrs.c[i]).hasValue(attrs.c[i], val[i])) return true;
    }
    return false;
};
types.union.tostr = function(attrs, val) {
    if (attrs.single) {
        var a = attrs.c[val[0]];
        if (attrs.strict) a.strict = 1;
        return ftype(a).tostr(a, val[1]);
    }
    else {
        for (var i in val) {
            if (val[i] != null && ftype(attrs.c[i]).hasValue(attrs.c[i], val[i])) {
                return ftype(attrs.c[i]).tostr(attrs.c[i], val[i]);
            }
        }
        return ftype(attrs.c[0]).tostr(attrs.c[0], val[0]);
    }
};
types.union.fromstr = function(attrs, str) {
    if (attrs.single) {
        for (var i in attrs.c) {
            var v = ftype(attrs.c[i]).fromstr(attrs.c[i], str);
            if (v != null) return [i, v];
        }
        return null;
    }
    else {
        var val = new Array(attrs.c.length);
        for (var i in attrs.c) {
            val[i] = ftype(attrs.c[i]).fromstr(attrs.c[i], str);
            if (val[i] != null) break;
        }
        for (var i in attrs.c) {
            if (val[i] != null) continue;
            var str = ftype(attrs.c[i]).tostr(attrs.c[i], null);
            val[i] = ftype(attrs.c[i]).fromstr(attrs.c[i], str);
        }
        return val;
    }
};
types.union.less = function(attrs, v1, v2) {
    if (attrs.single) {
        if (v1[0] < v2[0]) return true;
        if (v1[0] > v2[0]) return false;
        if (v1[1] == null) return v2[1] != null;
        if (v2[1] == null) return false;
        var a = attrs.c[v1[0]];
        return ftype(a).less(a, v1[1], v2[1]);
    }
    for (var i in v1) {
        var hasv1 = v1[i] != null && ftype(attrs.c[i]).hasValue(attrs.c[i], v1[i]);
        var hasv2 = v2[i] != null && ftype(attrs.c[i]).hasValue(attrs.c[i], v2[i]);
        if (hasv1) {
            if (!hasv2) return false;
            return ftype(attrs.c[i]).less(attrs.c[i], v1[i], v2[i]);
        }
        else {
            if (hasv2) return true;
        }
    }
    return false;
};
types.union.view = function(attrs, ro) {
    if (!attrs.values) {
        var enms = [];
        for (var i in attrs.c) {
            if (attrs.c[i].values) enms.push(attrs.c[i].values);
        }
        if (enms.length > 0) attrs.values = {
            type: 'pair',
            c: enms
        };
    }
    if (!ro && !attrs.single && attrs.c.length > 1) {
        for (var i = 0; i < attrs.c.length - 1; ++i) {
            if (!attrs.c[i].ro) return types.def.view(attrs, ro);
        }
        var last = attrs.c[attrs.c.length - 1];
        return ftype(last).view(last, ro);
    }
    return types.def.view(attrs, ro);
};
types.union.matcher = function(attr, opt, val) {
    var match = null;
    var idx = null;
    for (var i in attr.c) {
        match = ftype(attr.c[i]).matcher(attr.c[i], opt, val);
        if (match) {
            idx = i;
            break;
        }
    }
    if (idx == null) return null;
    return function(v) {
        if (attr.single) {
            if (v[0] == idx) {
                if (match(v[1])) return true;
            }
        }
        else {
            for (var i in v) {
                if (v[i][0] == idx) {
                    if (match(v[i][1])) return true;
                }
            }
        }
        return false;
    };
};
types.union.filter = function(attr, opt) {
    if (opt) return ftype(attr.c[0]).filter(attr.c[0], true);
    if (attr.name) return attr.name;
    return "";
};
types.password = inherit(types.string);
types.password.view = function(attrs, ro) {
    if (ro) return new ROTextView(attrs);
    return new TextView(attrs, input(null, 'password'));
};
types.prefix = inherit(types.def);
types.prefix.get = function(attrs, obj) {
    return ftype(attrs.c[0]).get(attrs, obj);
};
types.prefix.put = function(attrs, obj, val) {
    ftype(attrs.c[0]).put(attrs, obj, val);
};
types.prefix.remove = function(attrs, obj) {
    ftype(attrs.c[0]).remove(attrs, obj);
};
types.prefix.tostr = function(attrs, val) {
    var res = ftype(attrs.c[0]).tostr(attrs.c[0], val);
    if (res == null) return null;
    if (res != '') res = attrs.name + res;
    return res;
};
types.gridcell = inherit(types.def);
types.gridcell.view = function(attrs, ro) {
    return new CustomView(attrs, true, function(viewCtrl, obj) {
        viewCtrl.createGrid();
    });
};
types.separator = inherit(types.def);
types.separator.cfg = function(attrs, obj) {
    return {};
};
types.separator.outside = true;
types.separator.isRO = function(attrs) {
    return true;
};
types.separator.view = function(attrs, ro) {
    return new CustomView(attrs, true, function(viewCtrl, obj) {
        viewCtrl.addSeparatorForNext();
    });
};
types.separator.column = function(attrs, table, type) {
    return null;
};
types.tab = inherit(types.def);
types.tab.put = function(attrs, obj, val) {};
types.tab.column = function(attrs, table, type) {
    return null;
};
types.not = inherit(types.def);
types.not.get = function(attrs, obj) {
    return [obj[attrs.id], ftype(attrs.c[0]).get(attrs.c[0], obj)];
};
types.not.getvalue = function(attrs, obj) {
    return obj[attrs.id];
};
types.not.put = function(attrs, obj, val) {
    if (val instanceof Array) {
        obj[attrs.id] = val[0];
        ftype(attrs.c[0]).put(attrs.c[0], obj, val[1]);
    }
    else {
        obj[attrs.id] = val;
    }
};
types.not.remove = function(attrs, obj) {
    delete obj[attrs.id];
    ftype(attrs.c[0]).remove(attrs, obj);
    unset(obj, attrs.id);
};
types.not.tostr = function(attrs, val) {
    if (val == null) return ftype(attrs.c[0]).tostr(attrs.c[0], val);
    return (val[0] ? '!' : '') + ftype(attrs.c[0]).tostr(attrs.c[0], val[1]);
};
types.not.less = function(attrs, v1, v2) {
    if (v1[0] < v2[0]) return true;
    if (v1[0] > v2[0]) return false;
    return ftype(attrs.c[0]).less(attrs.c[0], v1[1], v2[1]);
};
types.not.view = function(attrs, ro) {
    return new NotView(attrs, ro, ftype(attrs.c[0]).view(attrs.c[0], ro));
};
types.not.deflimit = function(attrs) {
    return ftype(attrs.c[0]).deflimit(attrs.c[0]);
};
types.not.addlimit = function(attrs, limit, str) {
    return ftype(attrs.c[0]).addlimit(attrs.c[0], limit, str);
};
types.not.matcher = function(attr, opt, val) {
    return ftype(attr.c[0]).matcher(attr.c[0], opt, val);
};
types.not.filter = function(attr, opt) {
    if (opt) return ftype(attr.c[0]).filter(attr.c[0], true);
    if (attr.name) return attr.name;
    return "";
}
types.opt = inherit(types.def);
types.opt.VALUE = {};
types.opt.get = function(attrs, obj) {
    if (attrs.id != null) {
        if (!obj[attrs.id] ^ attrs.inv) return null;
    }
    var val = ftype(attrs.c[0]).get(attrs.c[0], obj);
    if (attrs.id == null && val != null && !ftype(attrs.c[0]).hasValue(attrs.c[0], val)) val = null;
    return val;
};
types.opt.getvalue = function(attrs, obj) {
    if (attrs.id != null) return obj[attrs.id];
    return ftype(attrs.c[0]).get(attrs.c[0], obj) != null;
};
types.opt.put = function(attrs, obj, val) {
    if (val == null) {
        if (attrs.id != null) obj[attrs.id] = !attrs.inv ? 0 : 1;
        ftype(attrs.c[0]).remove(attrs.c[0], obj);
    }
    else {
        if (attrs.id != null) obj[attrs.id] = !attrs.inv ? 1 : 0;
        if (val != types.opt.VALUE) {
            ftype(attrs.c[0]).put(attrs.c[0], obj, val);
        }
    }
};
types.opt.remove = function(attrs, obj) {
    delete obj[attrs.id];
    ftype(attrs.c[0]).remove(attrs, obj);
};
types.opt.tostr = function(attrs, val) {
    if (val == null) return '';
    return ftype(attrs.c[0]).tostr(attrs.c[0], val);
};
types.opt.fromstr = function(attrs, str) {
    if (str == '') return null;
    var val = ftype(attrs.c[0]).fromstr(attrs.c[0], str);
    return val != null && ftype(attrs.c[0]).hasValue(attrs.c[0], val) ? val : null;
};
types.opt.hasValue = function(attrs, val) {
    return val != null;
};
types.opt.less = function(attrs, v1, v2) {
    return ftype(attrs.c[0]).less(attrs.c[0], v1, v2);
};
types.opt.cell = function(doc, attrs, obj, val) {
    if (attrs.cond && !attrs.cond.isTrue(obj)) return null;
    if (ftype(attrs).get(attrs, obj) == null) {
        if (attrs.showdef && obj._type.def) {
            var d = obj[obj._type.def];
            if (d != null) {
                val = ftype(attrs).get(attrs, d);
                if (val != null) {
                    var c = ftype(attrs.c[0]).cell(doc, attrs.c[0], d, val);
                    if (c != null) {
                        var s = iel(doc, null, 'span');
                        s.style.color = 'gray';
                        s.appendChild(c);
                        return s;
                    }
                }
            }
        }
        return null;
    }
    return ftype(attrs.c[0]).cell(doc, attrs.c[0], obj, val);
};
types.opt.view = function(attrs, ro) {
    if (ro) return new ROTextView(attrs);
    return new OptView(attrs, ftype(attrs.c[0]).view(attrs.c[0], ro || attrs.c[0].ro));
};
types.opt.deflimit = function(attrs) {
    return ftype(attrs.c[0]).deflimit(attrs.c[0]);
};
types.opt.addlimit = function(attrs, limit, str) {
    return ftype(attrs.c[0]).addlimit(attrs.c[0], limit, str);
};
types.opt.matcher = function(attr, opt, val) {
    return ftype(attr.c[0]).matcher(attr.c[0], opt, val);
};
types.opt.filter = function(attr, opt) {
    if (opt) return ftype(attr.c[0]).filter(attr.c[0], true);
    if (attr.name) return attr.name;
    return "";
};
types.tristate = inherit(types.def);
types.tristate.get = function(attrs, obj) {
    return [obj[0], obj[1]];
};
types.tristate.put = function(attrs, obj, val) {
    if (val instanceof Array) {
        obj[0] = val[0];
        obj[1] = val[1];
    }
    else {
        obj[0] = val;
    }
};
types.tristate.remove = function(attrs, obj) {
    delete obj[0];
    delete obj[1];
};
types.tristate.tostr = function(attrs, val) {
    if (val == null) return '';
    return (val[0] ? '!' : '') + enum2string(attrs.values, val[1]);
};
types.tristate.less = function(attrs, v1, v2) {
    if (v1[0] < v2[0]) return true;
    if (v1[0] > v2[0]) return true;
    return types.tristate.tostr(attrs, v1) < types.tristate.tostr(attrs, v2);
};
types.tristate.view = function(attrs, ro) {
    if (!attrs.c) {
        var enm = {};
        enm.type = 'enm';
        enm.id = 1;
        enm.values = attrs.values;
        attrs.c = [enm];
    }
    return new NotView(attrs, ro, ftype(attrs.c[0]).view(attrs.c[0], ro));
};
types.tristate.deflimit = function(attrs) {
    return '';
};
types.tristate.addlimit = function(attrs, limit, str) {
    if (!attrs.c) return false;
    return ftype(attrs.c[0]).addlimit(attrs.c[0], limit, str);
};
types.multi = inherit(types.def);
types.multi.get = function(attrs, obj) {
    return obj[attrs.id];
};
types.multi.put = function(attrs, obj, val) {
    obj[attrs.id] = val;
    if (attrs.optid) obj[attrs.optid] = val.length > 0 ? 1 : 0;
};
types.multi.remove = function(attrs, obj) {
    delete obj[attrs.id];
    if (attrs.optid) delete obj[attrs.optid];
    unset(obj, attrs.id);
    unset(obj, attrs.optid);
};
types.multi.tostr = function(attrs, val) {
    var str = '';
    for (var i in val) {
        if (str.length > 0) str += ', ';
        var v = ftype(attrs.c[0]).get(attrs.c[0], val[i]);
        str += ftype(attrs.c[0]).tostr(attrs.c[0], v);
    }
    return str;
};
types.multi.less = function(attrs, v1, v2) {
    var a = attrs.c[0];
    for (var i in v1) {
        if (i == v2.length) return false;
        var val1 = ftype(attrs.c[0]).get(attrs.c[0], v1[i]);
        var val2 = ftype(attrs.c[0]).get(attrs.c[0], v2[i]);
        if (val1 == null) return val2 != null;
        if (val2 == null) return true;
        if (ftype(a).less(a, val1, val2)) return true;
        if (ftype(a).less(a, val2, val1)) return false;
    }
    return v1.length < v2.length;
};
types.multi.view = function(attrs, ro) {
    return new MultiView(attrs, ro, function() {
        return ftype(attrs.c[0]).view(attrs.c[0], ro);
    });
};
types.multi.deflimit = function(attrs) {
    return ftype(attrs.c[0]).deflimit(attrs.c[0]);
};
types.multi.addlimit = function(attrs, limit, str) {
    return ftype(attrs.c[0]).addlimit(attrs.c[0], limit, str);
};
types.multi.matcher = function(attr, opt, val) {
    var match = ftype(attr.c[0]).matcher(attr.c[0], opt, val);
    return function(v) {
        var res = defTrue(opt);
        for (var i in v) {
            res = match(ftype(attr.c[0]).get(attr.c[0], v[i]));
            if (res != null) break;
        }
        if (opt == OP_CONTAIN) {
            if (res == null) res = false;
        }
        else {
            if (res == null) res = true;
        }
        return res;
    };
};
types.multi.filter = function(attr, opt) {
    if (opt) {
        var a = attr.c[0];
        return ftype(a).filter(a, opt);
    }
    if (attr.name) return attr.name;
    return "";
};
types.multinumber = inherit(types.multi);
types.multinumber.get = function(attrs, obj) {
    if (attrs.optid != null && obj[attrs.optid] == false) return null;
    var val = obj[attrs.id];
    if (val == null) return val;
    var a = new Array(val.length);
    for (var i in val) a[i] = {
        0: val[i]
    };
    return a;
};
types.multinumber.put = function(attrs, obj, val) {
    var a = [];
    for (var i in val) {
        if (val[i][0] != null) a.push(val[i][0]);
    }
    obj[attrs.id] = a;
    if (attrs.optid != null) obj[attrs.optid] = a.length > 0 ? 1 : 0;
};
types.multinumberrange = inherit(types.multi);
types.multinumberrange.get = function(attrs, obj) {
    if (attrs.optid != null && obj[attrs.optid] == false) return null;
    var val = obj[attrs.id];
    if (val == null) return val;
    if (attrs.id2 != null) {
        var val2 = obj[attrs.id2];
        if (val2 == null) val2 = [];
        var a = new Array(val.length);
        for (var i = 0; i < val.length; ++i) {
            a[i] = {
                0: val[i],
                1: val2[i]
            };
        }
        return a;
    }
    var a = new Array(val.length / 2);
    for (var i = 0; i < val.length; i += 2) {
        a[i / 2] = {
            0: val[i],
            1: val[i + 1]
        };
    }
    return a;
};
types.multinumberrange.put = function(attrs, obj, val) {
    if (attrs.optid != null) obj[attrs.optid] = val.length > 0 ? 1 : 0;
    if (attrs.id2 != null) {
        var a = [];
        var a2 = [];
        for (var i in val) {
            a.push(val[i][0]);
            a2.push(val[i][1]);
        }
        obj[attrs.id] = a;
        obj[attrs.id2] = a2;
        return;
    }
    var a = [];
    for (var i in val) {
        if (val[i][0] != null && val[i][1] != null) {
            a.push(val[i][0]);
            a.push(val[i][1]);
        }
    }
    obj[attrs.id] = a;
};
types.multinetwork = inherit(types.multinumberrange);
types.multinetwork.get = function(attrs, obj) {
    if (attrs.maskid == null) return types.multinumberrange.get(attrs, obj);
    if (attrs.optid != null && obj[attrs.optid] == false) return null;
    var addr = obj[attrs.id];
    var mask = obj[attrs.maskid];
    if (addr == null) return null;
    var a = new Array(addr.length);
    for (var i = 0; i < addr.length; ++i) {
        a[i] = {
            0: addr[i],
            1: mask[i]
        };
    }
    return a;
};
types.multinetwork.put = function(attrs, obj, val) {
    if (attrs.maskid == null) return types.multinumberrange.put(attrs, obj, val);
    var addr = [];
    var mask = [];
    for (var i in val) {
        if (val[i][0] != null && val[i][1] != null) {
            addr.push(val[i][0]);
            mask.push(val[i][1]);
        }
    }
    obj[attrs.id] = addr;
    obj[attrs.maskid] = mask;
    if (attrs.optid != null) obj[attrs.optid] = addr.length > 0 ? 1 : 0;
};
types.multimacnetwork = inherit(types.multinetwork);
types.multibignumber = inherit(types.multinumber);
types.multiipaddr = inherit(types.multinumber);
types.multiip6addr = inherit(types.multinumber);
types.multinetwork6 = inherit(types.multinetwork);
types.multistring = inherit(types.multinumber);
types.multiraw = inherit(types.multinumber);
types.multibits = inherit(types.multi);
types.multibits.get = function(attrs, obj) {
    var val = obj[attrs.id];
    if (val == null) return null;
    var a = [];
    for (var i = 0; i < 32; ++i) {
        if (val & (1 << i)) a.push({
            0: i
        });
    }
    return a;
};
types.multibits.put = function(attrs, obj, val) {
    var bmap = 0;
    for (var i in val) {
        if (val[i][0] == null) continue;
        bmap |= 1 << val[i][0];
    }
    obj[attrs.id] = bmap;
    if (attrs.maskid) obj[attrs.maskid] = ~bmap;
};
types.multibits.remove = function(attrs, obj) {
    delete obj[attrs.id];
    if (attrs.maskid) delete obj[attrs.maskid];
    unset(obj, attrs.id);
    unset(obj, attrs.maskid);
};
types.multitristate = inherit(types.multibits);
types.multitristate.get = function(attrs, obj) {
    var val = obj[attrs.id];
    if (val == null) return val;
    var bmap = val;
    if (obj[attrs.maskid] != null) bmap |= obj[attrs.maskid];
    var a = [];
    for (var i = 0; i < 32; ++i) {
        if (bmap & (1 << i)) a.push({
            0: (val & (1 << i)) == 0,
            1: i
        });
    }
    return a;
};
types.multitristate.put = function(attrs, obj, val) {
    var bmap = 0;
    var bmask = 0;
    for (var i in val) {
        if (val[i][0] == null) continue;
        if (val[i][0] == 0) {
            bmap |= 1 << val[i][1];
        }
        else {
            bmask |= 1 << val[i][1];
        }
    }
    obj[attrs.id] = bmap;
    obj[attrs.maskid] = bmask;
};
types.multitristatearray = inherit(types.multi);
types.multitristatearray.get = function(attrs, obj) {
    var on = obj[attrs.id];
    var off = obj[attrs.oid];
    if (on == null || off == null) return null;
    var a = [];
    for (var i in on) {
        a.push({
            0: 0,
            1: on[i]
        });
    }
    for (var i in off) {
        a.push({
            0: 1,
            1: off[i]
        });
    }
    return a;
};
types.multitristatearray.put = function(attrs, obj, val) {
    var on = [];
    var off = [];
    for (var i in val) {
        if (val[i][0] == null) continue;
        if (!val[i][0]) {
            on.push(val[i][1]);
        }
        else {
            off.push(val[i][1]);
        }
    }
    obj[attrs.id] = on;
    obj[attrs.oid] = off;
};
types.multitristatearray.remove = function(attrs, obj) {
    delete obj[attrs.id];
    delete obj[attrs.oid];
    unset(obj, attrs.id);
    unset(obj, attrs.oid);
};
types.multituple = inherit(types.multi);
types.multituple.get = function(attrs, obj) {
    var v = [];
    for (var i in attrs.c) {
        var a = ftype(attrs.c[i]).get(attrs.c[i], obj);
        for (var j in a) {
            if (v[j] == null) v[j] = new Array(attrs.c.length);
            v[j][i] = toarray(a[j]);
        }
    }
    return v;
};
types.multituple.put = function(attrs, obj, val) {
    var a = new Array(attrs.c.length);
    for (var i in attrs.c) {
        a[i] = new Array(val.length);
    }
    for (var i in val) {
        if (val[i] == null) continue;
        for (var j in attrs.c) {
            a[j][i] = fromarray(val[i][j]);
        }
    }
    for (var i in attrs.c) {
        ftype(attrs.c[i]).put(attrs.c[i], obj, a[i]);
    }
};
types.multituple.remove = function(attrs, obj) {
    for (var i in attrs.c) {
        ftype(attrs.c[i]).remove(attrs.c[i], obj);
    }
};
types.multituple.tostr = function(attrs, val) {
    var a = this.attrs(attrs);
    var str = '';
    for (var i in val) {
        if (str.length > 0) str += ', ';
        ftype(a).tostr(a, val[i]);
    }
    return str;
};
types.multituple.view = function(attrs, ro) {
    var a = this.attrs(attrs);
    return new MultiView(attrs, ro, function() {
        return ftype(a).view(a, ro);
    });
};
types.multituple.attrs = function(attrs) {
    if (attrs.tuple) return attrs.tuple;
    var a = {
        type: 'tuple',
        own: 1,
        c: [],
        separate: 1
    };
    for (var i in attrs.c) {
        var ac = attrs.c[i].c[0];
        ac.id = i;
        a.c.push(ac);
    }
    return attrs.tuple = a;
};

function findAttr(attrs, name) {
    for (var i in attrs) {
        if (attrs[i].name == name) return attrs[i];
    }
    return null;
}
types.group = inherit(types.def);
types.group.get = function(attrs, obj) {
    if (attrs.id) return obj[attrs.id];
    if (!attrs.keys) {
        for (var i in attrs.c) {
            var a = attrs.c[i];
            var val = ftype(a).get(a, obj);
            if (val != null && ftype(a).hasValue(a, val)) return 1;
        }
    }
    for (var i in attrs.keys) {
        var a = findAttr(attrs.c, attrs.keys[i]);
        var val = ftype(a).get(a, obj);
        if (val != null && ftype(a).hasValue(a, val)) return 1;
    }
    return 0;
};
types.group.put = function(attrs, obj, val) {
    if (attrs.id) obj[attrs.id] = val;
};
types.group.remove = function(attrs, obj) {
    if (attrs.id) delete obj[attrs.id];
    unset(obj, attrs.id);
};
types.group.view = function(attrs, ro) {
    return new GroupView(attrs, ro);
};
types.deck = inherit(types.def);
types.deck.view = function(attrs, ro) {
    return new DeckView(attrs, ro);
};
types.deck.lookup = function(attrs, owner, name) {
    if (owner) {
        if (attrs.name) {
            if (owner != attrs.name) return null;
        }
        else {
            if (!attrs.owner || attrs.owner.name != owner) return null;
        }
    }
    for (var p in attrs.panes) {
        var pane = attrs.panes[p];
        for (var i in pane.c) {
            var a = ftype(pane.c[i]).lookup(pane.c[i], null, name);
            if (a != null) return a;
        }
    }
    return null;
};
types.grid = inherit(types.def);
types.grid.view = function(attrs, ro) {
    return new GridView(attrs, ro);
};
types.gridmultinumber = inherit(types.def);
types.gridmultinumber.get = function(attrs, obj) {
    var val = obj[attrs.id];
    if (!val) return {};
    var res = {};
    for (var i = 0; i + 1 < val.length; i += 2) {
        res[val[i]] = val[i + 1];
    }
    return res;
};
types.gridmultinumber.put = function(attrs, obj, val) {
    var a = [];
    for (var i in val) {
        a.push(i);
        a.push(val[i]);
    }
    obj[attrs.id] = a;
};
types.gridmultinumber.view = function(attrs, ro) {
    return new GridMultiView(attrs, ro);
};
types.flag = inherit(types.def);
types.flag.outside = true;
types.flag.get = function(attrs, obj) {
    var val = obj[attrs.id] || 0;
    if (attrs.val != null) val = val == attrs.val ? 1 : 0;
    return attrs.inv ? (val ? 0 : 1) : val;
};
types.flag.put = function(attrs, obj, val) {};
types.flag.tostr = function(attrs, val) {
    return val ? attrs.name : '';
};
types.flag.cfg = function(attrs, obj) {
    var name = attrs.name || ftype(attrs).tostr(attrs, true);
    if (attrs.band != null) name = 'flag' + attrs.band;
    return getAttrProp(obj, attrs, name);
};
types.flag.view = function(attrs, ro) {
    if (attrs.status) return new BoolView(attrs, true);
    return new FlagView(attrs, false);
};
types.flag.column = function(attrs, table, type) {
    var name = attrs.name || ftype(attrs).tostr(attrs, true);
    if (attrs.band != null) name = 'flag' + attrs.band;
    if (shouldHide(getAttrProp(type, attrs, name))) return null;
    table.addFlag(attrs, attrs.band);
    return null;
};
types.flag.flag = function(doc, attrs, val) {
    if (!val) return null;
    var f = iel(doc, null, 'span', attrs.hint);
    if (attrs.name) f.title = attrs.name;
    return f;
};
types.flag.lookup = function(attrs, owner, name) {
    if (types.def.lookup(attrs, owner, name) != null) {
        attrs = inherit(attrs);
        attrs.status = 1;
        attrs.order = null;
        return attrs;
    }
    return null;
};
types.flag.matcher = function(attr, opt, val) {
    return types.bool.matcher(attr, opt, val);
};
types.flag.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    if (attr.name) return attr.name;
    return "";
};
types.numflag = inherit(types.flag);
types.numflag.get = function(attrs, obj) {
    return obj[attrs.id];
};
types.numflag.tostr = function(attrs, val) {
    var v = attrs.c[val || 0];
    return v != null ? v[0] : '';
};
types.numflag.view = function(attrs, ro) {
    return new FlagView(attrs, true);
};
types.numflag.flag = function(doc, attrs, val) {
    val = attrs.c[val || attrs.def];
    if (!val) return null;
    var f = iel(doc, null, 'span', val[1]);
    f.title = val[0];
    return f;
};
types.numflag.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    if (attr.name) return attr.name;
    return "";
};
types.enable = inherit(types.flag);
types.enable.name = 'Enabled';
types.enable.secondname = 'enable';
types.enable.get = function(attrs, obj) {
    if (attrs.id) return obj[attrs.id] ? 1 : 0;
    return obj.bfe000a && !obj.bfe0007 ? 0 : 1;
};
types.enable.put = function(attrs, obj, val) {
    if (attrs.id) {
        obj[attrs.id] = val ? 1 : 0;
    }
    else {
        obj.bfe000a = val ? 0 : 1;
    }
};
types.enable.tostr = function(attrs, val) {
    return val ? 'enabled' : 'disabled';
};
types.enable.cfg = function(attrs, obj) {
    return getAttrProp(obj, attrs, 'Enabled');
};
types.enable.view = function(attrs, ro) {
    if (!attrs.status) attrs.order = 0;
    return new BoolView(attrs, ro);
};
types.enable.column = function(attrs, table, type) {
    var cfg = getAttrProp(type, attrs, 'Enabled');
    if (shouldHide(cfg)) return null;
    table.addFlag(attrs);
    if (!type.ro) table.addEnable(attrs);
    return null;
};
types.enable.flag = function(doc, attrs, val) {
    if (val) return null;
    var f = iel(doc, null, 'span', 'X');
    f.title = 'disabled';
    f.className = 'disabled';
    return f;
};
types.enable.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    return attr.name;
};
types.enable.lookup = function(attrs, owner, name) {
    return types.flag.lookup(attrs, owner, name);
};
types.invalid = inherit(types.flag);
types.invalid.name = 'Invalid';
types.invalid.secondname = 'invalid';
types.invalid.get = function(attrs, obj) {
    return obj.bfe0008 && !obj.bfe000a;
};
types.invalid.tostr = function(attrs, val) {
    return val ? 'invalid' : '';
};
types.invalid.view = function(attrs, ro) {
    return types.flag.view(attrs, ro);
};
types.invalid.flag = function(doc, attrs, val) {
    if (!val) return null;
    var f = iel(doc, null, 'span', 'I');
    f.className = 'disabled';
    f.title = 'invalid';
    return f;
};
types.invalid.lookup = function(attrs, owner, name) {
    return types.flag.lookup(attrs, owner, name);
};
types.dynamic = inherit(types.flag);
types.dynamic.name = 'Dynamic';
types.dynamic.secondname = 'dynamic';
types.dynamic.get = function(attrs, obj) {
    return obj.bfe0007;
};
types.dynamic.tostr = function(attrs, val) {
    return val ? 'dynamic' : '';
};
types.dynamic.view = function(attrs, ro) {
    if (attrs.status) return new BoolView(attrs, true);
    return new FlagView(attrs, true, 'dynamic');
};
types.dynamic.flag = function(doc, attrs, val) {
    if (!val) return null;
    var f = iel(doc, null, 'span', 'D');
    f.title = 'dynamic';
    return f;
};
types.dynamic.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    return attr.name;
};
types.dynamic.lookup = function(attrs, owner, name) {
    return types.flag.lookup(attrs, owner, name);
};
types.preset = inherit(types.flag);
types.preset.name = 'Default';
types.preset.secondname = 'default';
types.preset.get = function(attrs, obj) {
    return obj.bfe000d;
};
types.preset.tostr = function(attrs, val) {
    return val ? 'default' : '';
};
types.preset.view = function(attrs, ro) {
    if (attrs.status) return new BoolView(attrs, true);
    return new FlagView(attrs, true, 'default');
};
types.preset.flag = function(doc, attrs, val) {
    if (!val) return null;
    var f = iel(doc, null, 'span', '*');
    f.title = 'default';
    return f;
};
types.preset.filter = function(attr, opt) {
    if (opt) return [OP_IS];
    return attr.name;
};
types.preset.lookup = function(attrs, owner, name) {
    return types.flag.lookup(attrs, owner, name);
};
types.toggle = inherit(types.def);
types.toggle.outside = true;
types.toggle.cfg = function(attrs, obj) {
    var name = attrs.modes[0];
    return getAttrProp(obj, attrs, name);
};
types.toggle.view = function(attrs, ro) {
    return new ToggleView(attrs);
};
types.status = inherit(types.def);
types.status.outside = true;
types.status.view = function(attrs, ro) {
    return new StatusView(attrs);
};
types.status.lookup = function(attrs, owner, name) {
    if (owner) return null;
    for (var i in attrs.c) {
        var a = ftype(attrs.c[i]).lookup(attrs.c[i], null, name);
        if (a != null) {
            attrs = inherit(attrs);
            attrs.c = [a];
            return attrs;
        }
    }
    return null;
};
types.statusbar = inherit(types.def);
types.statusbar.outside = true;
types.statusbar.isRO = function(attrs) {
    return true;
};
types.statusbar.cfg = function(attrs, obj) {
    return getAttrProp(obj, attrs, attrs.name || 'statusbar');
};
types.statusbar.view = function(attrs) {
    if (attrs.path || attrs.cmd) return null;
    return new StatusBar(attrs);
};
types.statusbar.column = function(attrs, table, type) {
    if (!attrs.path && !attrs.cmd) return null;
    var t = {};
    t.owner = type;
    t.path = attrs.path || type.path;
    t.getcmd = attrs.cmd;
    t.c = attrs.c;
    t.ro = true;
    var holder = new ObjectHolder(t);
    var views = [];
    for (var i in attrs.c) {
        views.push(new StatusBarView(attrs.c[i], null, holder.getObject()));
    }
    var update = function() {
        for (var i in views) {
            views[i].load(holder.getObject());
        }
    };
    holder.listen(update);
    table.onDestroy(function() {
        holder.unlisten(update);
    });
    return null;
};
types.comment = inherit(types.string);
types.comment.outside = true;
types.comment.get = function(attrs, obj) {
    return obj.sfe0009;
};
types.comment.put = function(attrs, obj, val) {
    obj.sfe0009 = val;
};
types.comment.tostr = function(attrs, val) {
    return val || '';
};
types.comment.column = function(attrs, table, type) {
    var cfg = getAttrProp(type, attrs, 'Comment');
    if (shouldHide(cfg)) return null;
    table.addComment(attrs);
    return null;
};
types.comment.view = function(attrs, ro) {
    if (!attrs.name) attrs.name = 'Comment';
    if (!attrs.status) attrs.order = -1;
    if (ro) return new ROTextView(attrs, 5);
    return new TextAreaView(attrs);
};
types.comment.filter = function(attr, opt) {
    if (opt) return [OP_CONTAIN, OP_CONTAIN_NOT];
    if (attr.name) return attr.name;
    return "Comment";
};
types.comment.lookup = function(attrs, owner, name) {
    if (!attrs.name) attrs.name = 'Comment';
    if (types.def.lookup(attrs, owner, name) != null) {
        attrs = inherit(attrs);
        attrs.order = null;
        attrs.status = 1;
        return attrs;
    }
    return null;
};
types.about = inherit(types.def);
types.about.outside = true;
types.about.get = function(attrs, obj) {
    var val = obj.Sfe001c;
    if (val == null) return val;
    var i = 0;
    while (i < val.length) {
        if (val[i] == '') {
            val.splice(i, 1);
            continue;
        }
        ++i;
    }
    return val;
};
types.about.column = function(attrs, table, type) {
    table.addAboutInfo(attrs);
};
types.about.view = function(attrs, ro) {
    return new AboutView(attrs);
};
types.columnalias = inherit(types.def);
types.columnalias.alias = true;
types.columnalias.column = function(attrs, table, type) {
    if (!attrs.alias) attrs.alias = getAttr(type, attrs.name);
    if (attrs.alias) {
        var c = ftype(attrs.alias).column(attrs.alias, table, type);
        if (c) return [c[0], attrs.width];
    }
    return null;
};
types.columnalias.cell = function(doc, attrs, obj, val, cell) {
    if (attrs.alias) {
        val = ftype(attrs.alias).get(attrs.alias, obj);
        return ftype(attrs.alias).cell(doc, attrs.alias, obj, val, cell);
    }
    return null;
};
types.columnalias.listen = function(attrs, cb) {
    if (attrs.alias) ftype(attrs.alias).listen(attrs.alias, cb);
};
types.columnalias.unlisten = function(attrs, cb) {
    if (attrs.alias) ftype(attrs.alias).unlisten(attrs.alias, cb);
};
types.columnalias.view = function() {
    return null;
};
types.columnalias.lookup = function(attrs, owner, name) {
    return null;
};
types.alias = inherit(types.def);
types.alias.alias = true;
types.alias.view = function(attrs, ro) {
    return new AliasView(attrs, ro);
};
types.alias.lookup = function(attrs, owner, name) {
    return null;
};
types.graph = inherit(types.def);
types.graph.get = function(attrs, obj) {
    if (!attrs.model) return null;
    return ftype(attrs.model).get(attrs.model, obj);
};
types.graph.put = function(attrs, obj, val) {
    if (attrs.model) {
        ftype(attrs.model).put(attrs.model, obj, val);
    }
};
types.graph.view = function(attrs) {
    return new GraphView(attrs);
};
types.graph.column = function(attrs, table, type) {
    if (attrs.model && attrs.width) return types.def.column(attrs, table, type);
    return null;
};
types.graph.cell = function(doc, attrs, obj, val, canvas) {
    if (val == null) return null;
    var g = createGraphic(doc, canvas, 200, 16, 80, 16);
    if (g == null) return null;
    clearNodes(g.canvas);
    g.canvas.style.display = 'block';
    g.strokeWidth = 3;
    var idx = val.length - 1;
    var height = g.viewBox.height;
    var max = attrs.max;
    var offset = attrs.offset || 0;
    for (var x = g.viewBox.width - 1.5; x > 0 && idx >= 0; x -= 4, idx -= 2) {
        var v = num2int(val[idx][0]) + offset;
        var h = Math.floor(Math.max(v * height / max, 1));
        g.strokeColor = '#40bbef';
        if (attrs.colors) {
            for (var i in attrs.colors) {
                if (v < attrs.colors[i].level) {
                    g.strokeColor = attrs.colors[i].color;
                    break;
                }
            }
        }
        g.line(x, height, x, height - h);
    }
    return g.canvas;
};
types.graphbox = inherit(types.def);
types.graphbox.get = function(attrs, obj) {
    var r = [];
    for (var g in attrs.graphs) {
        r.push(ftype(attrs.graphs[g]).get(attrs.graphs[g], obj));
    }
    return r;
};
types.graphbox.put = function(attrs, obj, val) {
    if (val == null) return;
    for (var g in attrs.graphs) {
        if (val[g] != null) {
            ftype(attrs.graphs[g]).put(attrs.graphs[g], obj, val[g]);
        }
    }
};
types.graphbox.view = function(attrs) {
    attrs.name = 'Graph';
    return new GraphBox(attrs);
};
types.graphbox.lookup = function(attrs, owner, name) {
    if (owner && (!attrs.owner || attrs.owner.name != owner)) return null;
    for (var g in attrs.graphs) {
        if (attrs.graphs[g].name == name) return attrs.graphs[g];
    }
    return null;
};
types.file = inherit(types.def);
types.file.column = function(attrs, table, type) {
    if (attrs.uploadonly) return null;
    if (!(sysres.policy & (1 << 4))) return null;
    if (sysres.policy & (1 << 7)) {
        var tb = current.getToolbar();
        var row = elc(tb, 'li', 'custom');
        row.style.padding = '10px 0.5em 0 1em';
        var lbl = el(row, 'span', 'Upload:');
        var view = new FileUploadView(attrs);
        row = elc(tb, 'li', 'custom');
        row.appendChild(view.create());
    }
    if (!(sysres.policy & (1 << 6))) return null;
    return ['', 80];
};
types.file.cell = function(doc, attrs, obj, val) {
    if (!attrs.typeAttr) {
        attrs.typeAttr = getAttr(obj._type, 'type');
    }
    if (attrs.typeAttr) {
        var type = ftype(attrs.typeAttr).get(attrs.typeAttr, obj);
        if (type == 5 || type == 9) {
            return iel(doc, null, 'span');
        }
    }
    var b = tbtn(null, 'Download');
    b.onclick = function() {
        var path = obj._owner.toString(obj);
        var fr = document.getElementById('downloader');
        fr.src = '/jsproxy/?' + session.encryptURI(path);
        return true;
    }
    return b;
};
types.file.view = function(attrs, ro) {
    if (attrs.uploadonly) return new FileUploadView(attrs);
    return null;
};
types.custom = inherit(types.def);
types.custom.view = function() {
    return null;
};
types.filter = inherit(types.def);
types.filter.view = function() {
    return null;
};
types.filter.column = function(attrs, table, type) {
    table.addFilter(attrs);
    return null;
};
types.doit = inherit(types.def);
types.doit.outside = true;
types.doit.isRO = function(attrs) {
    return true;
};
types.doit.createButton = function(attrs, global, obj, type, view, ctrl) {
    var cfg = getAttrProp(type, attrs);
    if (shouldHide(cfg)) return;
    if (attrs.global && obj && obj._type.type == 'item') global = true;
    var b;
    if (attrs.c) {
        b = current.addButton(attrs.name, cfg, getPath(type) + '.' + normalize(attrs.name));
    }
    else if ((attrs.global || false) == global) {
        if (attrs.name == '' || attrs.name == null) {
            current.addButton();
            return;
        }
        b = current.addButton(attrs.name, cfg);
        b.onclick = function(e) {
            if (isSkinEvent(e)) return true;
            if (!attrs.confirm || confirm(attrs.confirm)) {
                var doit = new Doit(attrs, type.path);
                if (obj) doit.setID(obj.ufe0001);
                doit.doit();
            }
        };
    }
    if (b && skinMode) {
        if (ctrl) {
            ctrl.createSkinCntrl(view, b, b.firstChild, true);
        }
        else {
            new SkinCntrl(b, cfg, b.firstChild);
        }
    }
    return b ? b.parentNode : null;
};
types.doit.view = function(attrs, ro) {
    var me = this;
    var view = new CustomView(attrs, false, function(viewCtrl, cfg, obj) {
        return me.createButton(attrs, false, obj, obj._type, view, viewCtrl);
    });
    return view;
};
types.doit.column = function(attrs, table, type) {
    this.createButton(attrs, true, null, type);
    return null;
};
types.autoset = inherit(types.def);
types.autoset.get = function(attrs, obj) {
    return ftype(attrs.c[0]).get(attrs.c[0], obj);
};
types.autoset.put = function(attrs, obj, val) {
    ftype(attrs.c[0]).put(attrs.c[0], obj, val);
};
types.autoset.isRO = function(attrs) {
    return true;
};
types.autoset.view = function(attrs, ro) {
    return new AutoSetView(attrs, ro);
};
types.contextmenu = inherit(types.def);
types.contextmenu.outside = true;
types.contextmenu.view = function(attrs, ro) {
    return new ContextButtonView(attrs);
};
types.contextmenu.column = function(attrs, table, type) {
    if (attrs.link.length == 0) {
        var cfg = getAttrProp(type, attrs);
        if (shouldHide(cfg)) return null;
        var cont = findContainer(attrs.group, normalize(attrs.open), attrs.tab ? normalize(attrs.tab) : null);
        if (!cont) return null;
        b = current.addButton(attrs.name, cfg, getPath(cont));
    }
    return null;
};
types.toolbar = inherit(types.def);
types.toolbar.put = function(attrs, obj, val) {};
types.toolbar.outside = true;
types.toolbar.view = function(attrs, ro) {
    return new ToolbarView(attrs);
};
types.buttonsep = inherit(types.def);
types.buttonsep.view = function(attrs, ro) {
    return new CustomView(attrs, false, function(viewCtrl, cfg, obj) {
        current.addButton();
    });
};
types.cond = inherit(types.def);
types.cond.view = function() {
    return null;
};
types.cond.isRO = function() {
    return true;
};
types.concat = inherit(types.def);
types.concat.get = function(attrs, obj) {
    var first = attrs.first;
    if (typeof first == 'string') first = getAttr(obj._type, first);
    var second = attrs.second;
    if (typeof second == 'string') second = getAttr(obj._type, second);
    var f = toString(first, obj);
    var s = toString(second, obj);
    if (s.length == 0) return f;
    if (f.length == 0) return s;
    return f + attrs.sep + s;
};
var enm = {};
enm.def = {};
enm.def.toString = function(val, attrs, obj) {
    var str = this.getMap(attrs, obj)[val];
    return str != '' ? str : null;
};
enm.def.getColor = function(attrs, val) {
    if (attrs.values) return enm[attrs.values.type].getColor(attrs.values, val);
    return null;
};
enm.def.getMap = function(attrs, obj) {
    if (attrs.values) {
        return enm[attrs.values.type].getMap(attrs.values, obj);
    }
    return {};
};
enm.def.listen = function(attrs, cb, ctrl, obj) {
    if (attrs.values) enm[attrs.values.type].listen(attrs.values, cb, ctrl, obj);
};
enm.def.unlisten = function(attrs, cb, obj) {
    if (attrs.values) enm[attrs.values.type].unlisten(attrs.values, cb, obj);
};
enm.defenum = inherit(enm.def);
enm.defenum.getMap = function(attrs, obj) {
    var map = enm[attrs.values.type].getMap(attrs.values, obj);
    map = inherit(map);
    map[attrs.defid] = attrs.defname;
    return map;
};
enm['static'] = inherit(enm.def);
enm['static'].getMap = function(attrs) {
    return attrs.map;
};
enm['pair'] = inherit(enm.def);
enm['pair'].toString = function(val, attrs, obj) {
    for (var i in attrs.c) {
        var vals = attrs.c[i];
        var v = enm[vals.type].toString(val, vals, obj);
        if (v != null) return v;
    }
    return null;
};
enm['pair'].getMap = function(attrs, obj) {
    var res = {};
    for (var i in attrs.c) {
        var vals = attrs.c[i];
        var map = enm[vals.type].getMap(vals, obj);
        for (var j in map) {
            if (map[j] != '') res[j] = map[j];
        }
    }
    return res;
};
enm['pair'].getColor = function(attrs, val) {
    for (var i in attrs.c) {
        var vals = attrs.c[i];
        var c = enm[vals.type].getColor(vals, val);
        if (c != null) return c;
    }
    return null;
};
enm['pair'].listen = function(attrs, cb, ctrl, obj) {
    for (var i in attrs.c) {
        var vals = attrs.c[i];
        enm[vals.type].listen(vals, cb, ctrl, obj);
    }
};
enm['pair'].unlisten = function(attrs, cb, obj) {
    for (var i in attrs.c) {
        var vals = attrs.c[i];
        enm[vals.type].unlisten(vals, cb, obj);
    }
};
enm.dynamic = inherit(enm.def);
enm.dynamic.toString = function(val, attrs) {
    if (attrs.cache) {
        var str = attrs.cache[val];
        if (str != null) return str;
    }
    var map = getObjectMap(attrs.path);
    var obj = map.getObject(val);
    if (obj) return map.toString(obj);
    return null;
};
enm.dynamic.getMap = function(attrs) {
    if (attrs.cache) return attrs.cache;
    var map = getObjectMap(attrs.path);
    if (map == null) return {};
    var res = {};
    map.foreach(function(obj) {
        if (attrs.pred && !isTrue(attrs.pred, obj)) return;
        res[obj.ufe0001] = map.toString(obj);
    });
    return res;
};
enm.dynamic.listen = function(attrs, cb) {
    if (!attrs.lstns) attrs.lstns = new Listeners();
    if (attrs.lstns.listen(cb)) {
        var map = getObjectMap(attrs.path);
        if (map == null) return;
        attrs.cb = function(obj, more) {
            if (attrs.cache) {
                if (obj.ufe0013) {
                    delete attrs.cache[obj.ufe0001];
                }
                else {
                    if (attrs.pred && !isTrue(attrs.pred, obj)) return;
                    attrs.cache[obj.ufe0001] = map.toString(obj);
                }
                attrs.lstns.notify(obj, more);
            }
        };
        map.listen(attrs.cb, false);
        attrs.cache = this.getMap(attrs);
    }
};
enm.dynamic.unlisten = function(attrs, cb) {
    if (attrs.lstns && attrs.lstns.unlisten(cb)) {
        attrs.cache = null;
        getObjectMap(attrs.path).unlisten(attrs.cb, false);
    }
};
enm.enumfilter = inherit(enm.def);
enm.enumfilter.toString = function(val, attrs) {
    return enm[attrs.values.type].toString(val, attrs.values);
};
enm.enumfilter.getMap = function(attrs, obj) {
    var map = enm[attrs.values.type].getMap(attrs.values);
    var filter = {};
    for (var i in attrs.filters) {
        var a = attrs.filters[i];
        if (!a.pred || isTrue(a.pred, obj)) filter[a.id] = map[a.id];
    }
    return filter;
};
enm.enumfilter.listen = function(attrs, cb, ctrl, obj) {
    if (!obj) return;
    var lstn = function() {
        var map = enm[attrs.values.type].getMap(attrs.values);
        for (var i in attrs.filters) {
            var a = attrs.filters[i];
            var o = {
                ufe0001: a.id
            };
            if (a.pred && !isTrue(a.pred, obj)) o.ufe0013 = 1;
            cb(o);
        }
    };
    cb.lstn = lstn;
    obj._owner.listen(cb.lstn, true);
};
enm.enumfilter.unlisten = function(attrs, cb, obj) {
    if (!obj) return;
    if (cb.lstn) {
        obj._owner.unlisten(cb.lstn, true);
    }
};
enm.remapenum = inherit(enm.def);
enm.remapenum.getMap = function(attrs, obj) {
    if (!attrs.obj) {
        if (attrs.view) {
            var map = getObjectMap(attrs.path);
            attrs.obj = map.getObject(attrs.view.getValue());
        }
        if (!attrs.obj) return {};
    }
    attrs.map = enm[attrs.values.type].getMap(attrs.values, attrs.obj);
    return attrs.map;
};
enm.remapenum.listen = function(attrs, cb, ctrl, obj) {
    if (!attrs.lstns) attrs.lstns = new Listeners();
    if (attrs.lstns.listen(cb)) {
        var me = this;
        attrs.cb = function() {
            me.notify(attrs);
        };
        attrs.view = ctrl.getView(attrs.master);
        attrs.view.listen(attrs.cb);
        getObjectMap(attrs.path).listen(attrs.cb, false);
        this.notify(attrs);
    }
};
enm.remapenum.unlisten = function(attrs, cb, obj) {
    if (attrs.lstns && attrs.lstns.unlisten(cb)) {
        attrs.view.unlisten(attrs.cb);
        delete attrs.view;
        getObjectMap(attrs.path).unlisten(attrs.cb, false);
    }
};
enm.remapenum.notify = function(attrs) {
    var map = getObjectMap(attrs.path);
    var obj = map.getObject(attrs.view.getValue());
    if (attrs.obj == obj) return;
    attrs.obj = obj;
    if (!attrs.obj) return;
    var oldmap = {};
    if (attrs.map) {
        for (var i in attrs.map) oldmap[i] = attrs.map[i];
    }
    attrs.map = this.getMap(attrs);
    for (var i in attrs.map) {
        if (oldmap[i] != null) {
            delete oldmap[i];
        }
        else {
            var obj = {};
            obj.ufe0001 = i;
            attrs.lstns.notify(obj);
        }
    }
    for (var i in oldmap) {
        var obj = {};
        obj.ufe0001 = parseInt(i);
        obj.ufe0013 = 1;
        attrs.lstns.notify(obj);
    }
};
enm.slotenum = inherit(enm.def);
enm.slotenum.getMap = function(attrs, obj) {
    if (attrs.map && attrs.obj == obj) return attrs.map;
    if (!attrs.namesAttrs) {
        attrs.namesAttrs = getAttr(obj._type, attrs.names);
    }
    if (!attrs.valuesAttrs) {
        attrs.valuesAttrs = getAttr(obj._type, attrs.values);
    }
    var names = ftype(attrs.namesAttrs).get(attrs.namesAttrs, obj);
    var vals = ftype(attrs.valuesAttrs).get(attrs.valuesAttrs, obj);
    if (!names || !vals) return {};
    var map = {};
    for (var i in names) {
        map[vals[i][0]] = names[i][0];
    }
    attrs.map = map;
    attrs.obj = obj;
    return map;
};
enm.slotenum.listen = function(attrs, cb) {};
enm.slotenum.unlisten = function(attrs, cb) {};
enm.offsetenum = inherit(enm.def);
enm.offsetenum.toString = function(val, attrs, obj) {
    return enm[attrs.values.type].toString(val, attrs.values, obj);
};
enm.queryenum = inherit(enm.def);
enm.queryenum.toString = function(val, attrs, obj) {
    var map = enm.queryenum.getMap(attrs, obj);
    if (!map) return val.toString();
    var str = map[val];
    if (str) return str;
    return null;
};
enm.queryenum.getMap = function(attrs, obj) {
    if (!attrs.map || !attrs.obj) {
        if (!attrs.map) attrs.map = {};
        if (!obj) return attrs.map;
        attrs.obj = obj;
        if (attrs.obj) this.query(attrs);
    }
    return attrs.map;
};
enm.queryenum.getColor = function(attrs, val) {
    if (!attrs.bids) return null;
    for (var i in attrs.bids) {
        if (attrs.bids[i] == val) return null;
    }
    if (attrs.map[val]) return '#888';
    return null;
};
enm.queryenum.listen = function(attrs, cb, ctrl) {
    if (!ctrl) return;
    if (!attrs.lstns) attrs.lstns = new Listeners();
    if (attrs.lstns.listen(cb)) {
        var me = this;
        attrs.cb = function() {
            if (!attrs.timer && attrs.obj) {
                attrs.timer = setTimeout(function() {
                    attrs.timer = null;
                    me.query(attrs);
                }, 1);
            }
        };
        attrs.views = [];
        for (var i in attrs.params) {
            if (!attrs.params[i].name) {
                attrs.views.push(null);
                continue;
            }
            var view = ctrl.getView(attrs.params[i].name);
            view.listen(attrs.cb);
            attrs.views.push(view);
        }
        if (attrs.obj) this.query(attrs);
    }
};
enm.queryenum.unlisten = function(attrs, cb) {
    if (attrs.lstns && attrs.lstns.unlisten(cb)) {
        for (var i in attrs.views) {
            if (attrs.views[i]) attrs.views[i].unlisten(attrs.cb);
        }
        delete attrs.cb;
        delete attrs.views;
        delete attrs.map;
    }
};
enm.queryenum.query = function(attrs) {
    var req = {};
    req.Uff0001 = attrs.path;
    req.uff0007 = attrs.cmd;
    for (var i in attrs.views) {
        if (!attrs.views[i]) {
            req[attrs.params[i].id] = attrs.obj.ufe0001;
        }
        else {
            req[attrs.params[i].id] = attrs.views[i].getValue();
        }
    }
    if (!attrs.map) attrs.map = {};
    post(req, function(rep) {
        if (attrs.map == undefined) return;
        var ids = {};
        for (var i in attrs.map) ids[i] = true;
        var vals = rep[attrs.valuesid];
        attrs.bids = rep[attrs.bvaluesid];
        if (vals) {
            for (var i in vals) {
                var id = vals[i];
                attrs.map[id] = id;
                delete ids[id];
                var obj = {};
                obj.ufe0001 = id;
                attrs.lstns.notify(obj);
            }
        }
        for (var i in ids) {
            var obj = {};
            obj.ufe0001 = parseInt(i);
            obj.ufe0013 = 1;
            attrs.lstns.notify(obj);
        }
    });
};

function isTrue(attrs, val) {
    return pred[attrs.type].isTrue(attrs, val);
}
var pred = {};
pred.number = {};
pred.number.isTrue = function(attrs, val) {
    val = val || 0;
    if (val instanceof Array) val = val[0];
    for (var i in attrs.value) {
        if (attrs.value[i] == val) return true;
    }
    return false;
};
pred.string = {};
pred.string.isTrue = function(attrs, val) {
    if (val == null) val = '';
    return val == attrs.value;
};
pred.bool = {};
pred.bool.isTrue = function(attrs, val) {
    return attrs.value ? !!val : !val;
};
pred.numarrayany = {};
pred.numarrayany.isTrue = function(attrs, val) {
    if (val == null) return false;
    for (var i in val) {
        if (val[i][0] == attrs.value) return true;
    }
    return false;
};
pred.bitmap = {};
pred.bitmap.isTrue = function(attrs, val) {
    if (val instanceof Array) val = val[0];
    return (val & attrs.mask) == attrs.value;
};
pred.object = {};
pred.object.isTrue = function(attrs, val) {
    if (!attrs.map) attrs.map = getObjectMap(attrs.path);
    var obj = attrs.map[val];
    return obj && isTrue(attrs.pred, obj);
};
pred.slot = {};
pred.slot.isTrue = function(attrs, obj) {
    if (!attrs.attrs) {
        attrs.attrs = getAttr(obj._type, attrs.slot);
        if (!attrs.attrs) return false;
    }
    var val = ftype(attrs.attrs).get(attrs.attrs, obj);
    return val == null || isTrue(attrs.pred, val);
};
pred.or = {};
pred.or.isTrue = function(attrs, val) {
    for (var i in attrs.pred) {
        if (isTrue(attrs.pred[i], val)) return true;
    }
    return false;
};
pred.not = {};
pred.not.isTrue = function(attrs, val) {
    return !isTrue(attrs.pred, val);
};
pred.arch = {};
pred.arch.isTrue = function(attrs, val) {
    return attrs.value == sysres.arch;
};
pred.board = {};
pred.board.isTrue = function(attrs, val) {
    return attrs.value == sysres.board || attrs.value == sysres.boardname;
};
pred.daughterboard = {};
pred.daughterboard.isTrue = function(attrs, val) {
    return false;
};
pred.quickset = {};
pred.quickset.isTrue = function(attrs, val) {
    return !!(sysres.qscaps & (1 << attrs.bit));
};
pred.winbox = {};
pred.winbox.isTrue = function(attrs, val) {
    return false;
};
pred.addon = {};
pred.addon.isTrue = function(attrs, val) {
    return !!addons[attrs.value];
};
pred.statuspane = {};
pred.statuspane.isTrue = function(attrs, val) {
    return !isStatusPageEmpty();
};

function newRequest() {
    try {
        return new XMLHttpRequest();
    }
    catch (e) {}
    try {
        return new ActiveXObject('Msxml2.XMLHTTP');
    }
    catch (e) {}
    return new ActiveXObject('Microsoft.XMLHTTP');
}

function request(method, url, obj, cb, errCb) {
    if (!errCb) errCb = onSessionError;
    var req = newRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                cb(req.responseText);
            }
            else if (req.status >= 400 || req.status == 0) {
                if (urlCheker) clearInterval(urlCheker);
                if (req.status == 410) {
                    errCb(null);
                }
                else if (req.status == 403) {
                    errCb('Authentication failed: invalid username or password.');
                }
                else if (req.status == 0) {}
                else {
                    errCb('ERROR: ' + req.statusText);
                }
            }
            req = null;
        }
    };
    req.open(method, url, true);
    //req.send(obj);
}

function fetchFile(name, cb) {
    var url = '/jsproxy/?' + session.encryptURI(name);
    var req = newRequest();
    req.onreadystatechange = function() {
        if (req.readyState == 4) {
            if (req.status == 200) {
                cb(req.responseText);
            }
            else {
                cb(null);
            }
        }
    };
    req.open('GET', url, true);
    req.send();
}

function msg2json(msg) {
    var str = '';
    for (var r in msg) {
        var pfx = r.charAt(0);
        if (pfx == '_') continue;
        if (str.length > 0) str += ',';
        var val = msg[r];
        switch (pfx) {
            case 'b':
            case 'u':
            case 'q':
                str += r + ':' + (val || 0);
                break;
            case 's':
                if (!val) val = '';
                val = val.replace(/\\/g, '\\\\');
                val = val.replace(/\'/g, '\\\'');
                str += r + ':' + "'" + val + "'";
                break;
            case 'r':
            case 'a':
                str += r + ':' + '[' + (val ? val : '') + ']';
                break;
            case 'm':
                {
                    var s = '{}';
                    if (val) {
                        s = msg2json(val);
                        if (s == null) return null;
                    }
                    str += r + ':' + s;
                    break;
                }
            case 'U':
            case 'B':
            case 'Q':
                str += r + ':' + '[' + (val ? val : '') + ']';
                break;
            case 'S':
                str += r + ':' + '[';
                if (val) {
                    for (var i in val) {
                        if (i > 0) str += ',';
                        str += "'" + val[i].replace(/\'/g, '\\\'') + "'";
                    }
                }
                str += ']';
                break;
            case 'R':
            case 'A':
                str += r + ':' + '[';
                if (val) {
                    for (var i in val) {
                        if (i > 0) str += ',';
                        str += '[' + val[i] + ']';
                    }
                }
                str += ']';
                break;
            case 'M':
                str += r + ':' + '[';
                if (val) {
                    for (var i in val) {
                        var s = msg2json(val[i]);
                        if (s == null) return null;
                        if (i > 0) str += ',';
                        str += s;
                    }
                }
                str += ']';
                break;
            default:
                return null;
        }
    }
    return '{' + str + '}';
}

function post(req, cb) {
    request('POST', '/jsproxy', session.encrypt(msg2json(req)), function(r) {
        session.decrypt(r, cb);
        session.dequeue();
    });
}
var subscribers = {};

function receive(msg) {
    var from = msg.Uff0002;
    var lstn = subscribers[from];
    if (lstn) lstn.notify(msg);
    post({}, receive);
}

function subscribe(path, cb) {
    if (!subscribers[path]) subscribers[path] = new Listeners();
    if (subscribers[path].listen(cb)) {
        var req = {};
        req.Uff0001 = path;
        req.uff0007 = 0xfe0012;
        post(req);
    }
}

function unsubscribe(path, cb) {
    if (subscribers[path].unlisten(cb)) {
        var req = {};
        req.Uff0001 = path;
        req.uff0007 = 0xfe0013;
        post(req);
    }
}

function isError(msg) {
    return msg.uff0008 != null;
}

function getErrorDescription(errno) {
    switch (errno) {
        case 0xfe0002:
        case 0xfe0003:
            return 'feature is not implemented';
        case 0xfe0011:
        case 0xfe0004:
            return "object doesn't exist";
        case 0xfe0007:
            return 'object already exists';
        case 0xfe0009:
            return 'not permitted';
        case 0xfe0012:
            return 'busy';
        case 0xfe000d:
            return 'timeout';
        default:
            return 'action failed';
    }
};

function showError(type, msg) {
    if (!isError(msg)) return;
    var str = msg.sff0009;
    if (str == null) str = getErrorDescription(msg.uff0008);
    alert(type + ' - ' + str + ' (' + (msg.uff0008 & 0xfff) + ')');
}

function removeSysFields(msg) {
    for (var i in msg) {
        if (parseInt(i.substr(1), 16) >= 0xff0000) delete msg[i];
    }
}
var prefs = [];
var prefTimer;

function savePrefs() {
    prefTimer = null;
    post({
        Uff0001: [13, 7],
        uff0007: 0xfe000e,
        s1: sysres.user,
        M1: prefs
    });
}

function getPrefs(attrs) {
    var name = attrs ? getPath(attrs) : '';
    for (var i in prefs) {
        if (prefs[i].sfe0010 == name) return prefs[i];
    }
    return {
        sfe0010: name
    };
}

function setPrefs(p) {
    for (var i in prefs) {
        if (prefs[i] == p) {
            prefs.splice(i, 1);
            break;
        }
    }
    prefs.splice(0, 0, p);
    if (prefs.length > 100) prefs.splice(prefs.length - 1, 1);
    if (prefTimer == null) prefTimer = setTimeout(savePrefs, 60000);
}

function getProp(parent, prop) {
    var val = parent[prop];
    if (val == null) val = parent[prop] = {};
    return val;
}

function getServiceProp(service) {
    var cfg = skin;
    if (service.group) cfg = getProp(cfg, service.group);
    return getProp(cfg, service.name);
}

function getContainerProp(attrs) {
    if (attrs._type) attrs = attrs._type;
    while (attrs.owner) attrs = attrs.owner;
    var cfg;
    if (attrs.container) {
        cfg = getContainerProp(attrs.container);
    }
    else {
        cfg = getServiceProp(attrs.service);
    }
    return getProp(cfg, attrs.title);
}

function getAttrProp(type, attrs, name) {
    var cfg = getContainerProp(type);
    if (attrs && attrs.owner) cfg = getProp(cfg, attrs.owner.name);
    var prop = cfg;
    if (attrs.owner) getProp(prop, attrs.owner.name);
    prop = getProp(prop, name ? name : attrs.name);
    if (!prop._def && name != '*') prop._def = getProp(cfg, '*');
    return prop;
}

function getSysProps(type) {
    return getProp(getContainerProp(type), '&');
}

function getSysProp(type, cmd) {
    return getProp(getSysProps(type), cmd);
}

function compactSkinProps(cfg) {
    if (cfg._hide) return 0;
    var res = {};
    var nonempty = false;
    for (var i in cfg) {
        var v = cfg[i];
        if (i == '_def') continue;
        if (i == '_hide' && v == 0) {
            if (cfg._def && cfg._def._hide) nonempty = true;
            continue;
        }
        if (typeof(v) != 'object') {
            res[i] = v;
        }
        else if (v != null) {
            if (i == 'separator') {
                res[i] = v._hide ? 0 : 1;
            }
            else if (i == 'tab') {
                if (v._hide) {
                    res[i] = 0;
                }
                else if (v.name != null) {
                    res[i] = v.name;
                }
            }
            else {
                var c = compactSkinProps(v);
                if (c != null) res[i] = c;
            }
        }
    }
    if (!nonempty && isempty(res)) return null;
    return res;
}

function compactSkin(cfg) {
    cfg = compactSkinProps(cfg);
    if (cfg && cfg.Status && cfg.Status.Status) {
        var s = cfg.Status.Status;
        for (var i in s) {
            if (s[i] == 0) delete s[i];
        }
    }
    return cfg;
}

function normalizeSkin(cfg) {
    for (var i in cfg) {
        var v = cfg[i];
        if (v == 0 && i != 'order') cfg[i] = {
            _hide: 1
        };
        if (typeof(v) == 'object') {
            normalizeSkin(v);
        }
    }
}

function prop2json(cfg, oindent) {
    var str = '';
    oindent = oindent || '';
    var indent = oindent + '    ';
    var cnt = 0;
    for (var i in cfg) {
        if (str.length > 0) str += ',';
        str += '\n' + indent;
        if (i.match(/^[A-Za-z]*$/)) {
            str += i + ': ';
        }
        else {
            str += '\'' + i + '\': ';
        }
        var v = cfg[i];
        if (typeof(v) == 'string') {
            str += '\'' + v.replace(/\'/g, '\\\'') + '\'';
        }
        else if (typeof(v) != 'object') {
            str += v;
            ++cnt;
        }
        else {
            str += prop2json(v, indent);
            cnt = 100;
        }
    }
    if (cnt <= 3) {
        str = str.split('\n').join('');
        return '{' + str.replace(/\s+/g, ' ') + ' }';
    }
    return '{' + str + '\n' + oindent + '}';
}

function loadSkin(name, cb) {
    fetchFile('skins/' + name + '.json', function(resp) {
        skin = {};
        if (resp) {
            try {
                var s = eval('(' + resp + ')');
                skin = s;
            }
            catch (e) {}
        }
        normalizeSkin(skin);
        if (cb) {
            cb();
        }
        else {
            generateMenu();
            reopen();
        }
    });
}

function saveSkin(name) {
    var str = prop2json(compactSkin(skin)) + '\n';
    request('POST', '/jsproxy/put?' + session.encryptURI('skins/' + name + '.json'), str, function(rep) {});
}

function getObjectName(obj) {
    var i = obj._owner.getFullName(obj);
    var name = i.name;
    if (i.cfg && i.cfg[i.propname]) name = i.cfg[i.propname];
    if (i.postfix) name += ' ' + i.postfix;
    return name;
}

function ObjectHolder(attrs) {
    this.attrs = attrs;
    this.lstns = new Listeners();
    this.obj = {};
    this.obj._type = attrs;
    this.obj._owner = this;
    this.obj._empty = true;
    if (attrs.getcmd == null) this.obj._empty = false;
}
ObjectHolder.prototype.getNameType = function(obj) {
    return null;
};
ObjectHolder.prototype.getName = function(obj) {
    return getObjectName(obj);
};
ObjectHolder.prototype.getFullName = function(obj) {
    return {
        name: this.attrs.title,
        cfg: getSysProps(this.attrs),
        propname: 'title'
    };
};
ObjectHolder.prototype.getPath = function() {
    return getPath(this.attrs);
};
ObjectHolder.prototype.getObject = function() {
    return this.obj;
};
ObjectHolder.prototype.setObject = function(obj, cb) {
    if (this.obj == obj) {
        var req = {};
        update(req, obj);
        req.Uff0001 = this.attrs.path;
        req.uff0007 = this.attrs.setcmd || 0xfe000e;
        delete obj.Uff0014;
        var me = this;
        post(req, function(rep) {
            if (isError(rep)) {
                showError('Couldn\'t change ' + obj._owner.getName(obj), rep);
                me.fetch();
            }
            if (cb) cb(!isError(rep));
        });
        this.lstns.notify(obj);
    }
};
ObjectHolder.prototype.autostart = function(obj) {
    return false;
};
ObjectHolder.prototype.listen = function(cb) {
    if (this.lstns.listen(cb)) {
        if (this.attrs.autorefresh) {
            this.autorefresh = this.attrs.autorefresh;
            if (!this.timer) this.fetch();
        }
        else {
            var me = this;
            this.notifyLstn = function(msg) {
                var objs = msg.Mfe0002;
                if (!objs) {
                    me.fetch();
                }
                else if (objs[0]) {
                    me.obj._empty = false;
                    update(me.obj, objs[0]);
                    me.lstns.notify(me.obj);
                }
            };
            if (!(this.attrs.getcmd == null && this.attrs.setcmd != null)) {
                subscribe(this.attrs.path, this.notifyLstn);
                this.fetch();
            }
        }
    }
};
ObjectHolder.prototype.unlisten = function(cb) {
    if (this.lstns.unlisten(cb)) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.autorefresh = 0;
        if (this.notifyLstn) {
            unsubscribe(this.attrs.path, this.notifyLstn);
            this.notifyLstn = null;
        }
    }
};
ObjectHolder.prototype.fetch = function() {
    var attrs = this.attrs;
    if (attrs.getcmd == null && attrs.setcmd != null) return;
    var req = {};
    req.Uff0001 = attrs.path;
    req.uff0007 = attrs.getcmd || 0xfe000d;
    req.ufe000c = 0x5;
    if (attrs.refreshfilter) req.ufe000c |= attrs.refreshfilter;
    var me = this;
    var onreply = function(rep) {
        if (isError(rep)) return;
        update(me.obj, rep);
        me.obj._empty = false;
        me.lstns.notify(me.obj);
        if (me.autorefresh && !me.timer) {
            me.timer = setTimeout(function() {
                me.timer = null;
                me.fetch();
            }, me.autorefresh);
        }
    };
    post(req, onreply);
};

function ObjectMap(attrs, lstns) {
    this.attrs = attrs;
    this.lstns = lstns ? lstns : new Listeners();
    this.autorefresh = 0;
    this.map = {};
    this.acquired = {};
    this.objCount = null;
    this.size = 0;
}
ObjectMap.prototype.getType = function() {
    return this.attrs;
};
ObjectMap.prototype.setID = function(id) {
    this.id = id;
};
ObjectMap.prototype.getCount = function() {
    return this.objCount;
};
ObjectMap.prototype.getSize = function() {
    return this.size;
};
ObjectMap.prototype.getNameType = function(obj) {
    var attrs = obj._type;
    if (!attrs.namevalAttr) {
        if (typeof attrs.nameval == 'string') {
            attrs.namevalAttr = getAttr(attrs, attrs.nameval);
        }
        else {
            attrs.namevalAttr = this.attrs.nameval;
        }
    }
    return attrs.namevalAttr;
};
ObjectMap.prototype.toString = function(obj) {
    return toString(this.getNameType(obj), obj);
};
ObjectMap.prototype.getName = function(obj) {
    return getObjectName(obj);
};
ObjectMap.prototype.getFullName = function(obj) {
    var i = {
        name: this.attrs.name,
        cfg: getSysProps(this.attrs),
        propname: 'title'
    };
    if (obj._type.nameval) {
        if (obj.ufe0001 != null) {
            i.propname = 'name';
            i.postfix = '<' + this.toString(obj) + '>';
        }
        else {
            i.name = 'New ' + i.name;
            i.propname = 'newname';
        }
    }
    return i;
};
ObjectMap.prototype.getPath = function(obj) {
    var path = getPath(this.attrs);
    if (obj) {
        if (!obj._type.nameval && !obj._type.name) return null;
        path += obj.ufe0001 == null ? '.new' : '.' + obj.ufe0001;
    }
    return path;
};
ObjectMap.prototype.getObject = function(id, makeNew) {
    if (id == null) return this.newObject();
    return this.map[id];
};
ObjectMap.prototype.newObject = function(typeid) {
    var type = this.attrs;
    if (typeid) type = this.getSubtype(this.attrs, typeid) || this.attrs;
    var obj = {};
    obj._type = type;
    obj._owner = this;
    this.setSubtype(type, obj);
    if (typeid && !this.attrs.generic && this.attrs.filter) {
        var v = getAttr(this.attrs, this.attrs.filter.filteron);
        if (v) {
            var val = ftype(v).fromstr(v, typeid);
            if (val != null) ftype(v).put(v, obj, val);
        }
    }
    if (type.prefix) this.setUniqueName(obj);
    return obj;
};
ObjectMap.prototype.acquireObject = function(id) {
    var obj = this.acquired[id];
    if (obj) {
        ++obj._refcnt;
        return obj;
    }
    var obj = this.getObject(id);
    if (!obj) {
        obj = this.newObject();
        obj.ufe0001 = id;
    }
    obj._refcnt = 1;
    this.acquired[id] = obj;
    return obj;
};
ObjectMap.prototype.releaseObject = function(obj) {
    if (--obj._refcnt == 0) {
        delete this.acquired[obj.ufe0001];
    }
};
ObjectMap.prototype.setUniqueName = function(obj) {
    var nums = {};
    var type = obj._type;
    for (var i in this.map) {
        var name = this.toString(this.map[i]);
        if (name.substr(0, type.prefix.length) == type.prefix) {
            var n = string2int(name.substr(type.prefix.length));
            if (n != null) nums[n] = true;
        }
    }
    var i = 1;
    while (nums[i]) ++i;
    this.toString(obj);
    var a = type.namevalAttr;
    ftype(a).put(a, obj, type.prefix + i);
};
ObjectMap.prototype.setObject = function(obj, cb) {
    var newObj = obj.ufe0001 == null;
    var req = {};
    update(req, obj);
    req.Uff0001 = this.attrs.path;
    req.uff0007 = !newObj ? 0xfe0003 : 0xfe0005;
    delete obj.Uff0014;
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) {
            showError('Couldn\'t ' + (newObj ? 'add ' : 'change ') +
                me.getName(obj), rep);
            if (cb) cb(false);
            me.fetch(obj);
            return;
        }
        if (newObj) {
            ++me.size;
            if (me.objCount != null) ++me.objCount;
            obj.ufe0001 = rep.ufe0001;
            me.map[obj.ufe0001] = obj;
            if (me.attrs.ordered) me.linkBefore(obj, null);
        }
        if (me.attrs.refetchonchange) me.fetch(obj);
        if (cb) cb(true);
        me.lstns.notify(obj);
    });
};
ObjectMap.prototype.removeObject = function(obj, cb) {
    var req = {};
    req.ufe0001 = obj.ufe0001;
    req.Uff0001 = this.attrs.path;
    req.uff0007 = 0xfe0006;
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) {
            showError('Couldn\'t remove ' + me.getName(obj), rep);
            if (cb) cb(false);
            return;
        }
        me.remove(obj);
        if (cb) cb(true);
    });
};
ObjectMap.prototype.moveObjectAfter = function(obj, after) {
    var next = after != null ? after._next : this.first;
    var req = {};
    req.ufe0001 = obj.ufe0001;
    req.Uff0001 = this.attrs.path;
    req.uff0007 = 0xfe0007;
    req.ufe0005 = next != null ? next.ufe0001 : 0xffffffff;
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) {
            showError('Couldn\'t move ' + me.getName(obj), rep);
            return;
        }
        me.unlink(obj);
        me.linkBefore(obj, next);
        me.lstns.notify(obj);
    });
};
ObjectMap.prototype.remove = function(obj) {
    if (this.attrs.ordered) {
        this.unlink(obj);
    }
    obj.ufe0013 = 1;
    delete this.map[obj.ufe0001];
    --this.size;
    if (this.objCount != null) --this.objCount;
    this.lstns.notify(obj);
};
ObjectMap.prototype.getSubtypes = function() {
    if (!this.attrs.generic) return null;
    var types = [];
    if (this.getSubtypesFor(this.attrs, types)) return types;
    return null;
};
ObjectMap.prototype.getSubtypesFor = function(gen, types) {
    var subtypes = 0;
    for (var i in gen.subtypes) {
        var type = gen.subtypes[i];
        if (type.generic) subtypes += this.getSubtypesFor(type, types);
        if (type.nonaddable || (type.pred && !isTrue(type.pred))) continue;
        types.push(type.title);
        ++subtypes;
    }
    for (var i in gen.gensubtypes) {
        subtypes += this.getSubtypesFor(gen.gensubtypes[i], types);
    }
    return subtypes;
};
ObjectMap.prototype.getSubtype = function(gen, id) {
    for (var i in gen.subtypes) {
        if (gen.subtypes[i].ntitle == id) return gen.subtypes[i];
        if (gen.subtypes[i].generic) {
            var st = this.getSubtype(gen.subtypes[i], id);
            if (st) return st;
        }
    }
    for (var i in gen.gensubtypes) {
        var st = this.getSubtype(gen.gensubtypes[i], id);
        if (st) return st;
    }
    return null;
};
ObjectMap.prototype.setSubtype = function(attrs, obj, typeid) {
    if (attrs.typeon && typeid != null) {
        ftype(attrs.typeon).put(attrs.typeon, obj, typeid);
    }
    if (attrs.inherit) {
        var t = attrs.typevalue;
        if (t == null || t == 0xffffffff) t = typeid;
        this.setSubtype(attrs.inherit, obj, t);
    }
};
ObjectMap.prototype.fetch = function(obj) {
    var req = {};
    req.ufe0001 = obj.ufe0001;
    req.Uff0001 = this.attrs.path;
    req.uff0007 = 0xfe0002;
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) return;
        removeSysFields(rep);
        update(obj, rep);
        obj.ufe0001 = req.ufe0001;
        me.lstns.notify(obj);
    });
};
ObjectMap.prototype.foreach = function(cb) {
    if (this.attrs.ordered) {
        var obj = this.last;
        while (obj != null) {
            cb(obj);
            obj = obj._prev;
        }
    }
    else {
        for (var i in this.map) cb(this.map[i]);
    }
};
ObjectMap.prototype.getFirst = function() {
    return this.first;
};
ObjectMap.prototype.getNext = function(obj) {
    return obj._next;
}
ObjectMap.prototype.getNextID = function(obj) {
    return obj._next ? obj._next.ufe0001 : null;
};
ObjectMap.prototype.autostart = function(obj) {
    this.setObject(obj);
    return true;
};
ObjectMap.prototype.listen = function(cb, full) {
    if (full) {
        if (++this.autorefresh == 1 && this.attrs.autorefresh) {
            this.getall();
        }
    }
    if (!this.lstns.listen(cb, full)) return;
    var me = this;
    this.notifyLstn = function(msg) {
        if (msg.ufe0019 != null) me.objCount = msg.ufe0019;
        var objs = msg.Mfe0002;
        if (objs == null) {
            me.getall();
            return;
        }
        for (i in objs) {
            var obj = objs[i];
            var id = obj.ufe0001;
            if (id == null) continue;
            var nextid = obj.ufe0005;
            if (!obj.ufe0013) {
                var oldObj = me.map[id];
                if (!oldObj) {
                    var aobj = me.acquired[id];
                    if (aobj) {
                        update(aobj, obj);
                        obj = aobj;
                    }
                    obj._type = me.getObjType(obj);
                    obj._owner = me;
                    ++me.size;
                    me.map[id] = obj;
                }
                else {
                    update(oldObj, obj);
                    obj = oldObj;
                }
                if (me.attrs.ordered) {
                    var next = me.map[nextid];
                    if (obj._next != next || !oldObj) {
                        if (oldObj) me.unlink(obj);
                        me.linkBefore(obj, next);
                    }
                }
            }
            else {
                obj = me.map[id];
                if (!obj) continue;
                obj.ufe0013 = 1;
                --me.size;
                if (me.attrs.ordered) me.unlink(obj);
                delete me.map[id];
            }
            me.lstns.notify(obj, i < objs.length - 1);
        }
    };
    subscribe(this.attrs.path, this.notifyLstn);
    this.getall();
};
ObjectMap.prototype.unlisten = function(cb, full) {
    if (this.lstns.unlisten(cb, full)) {
        unsubscribe(this.attrs.path, this.notifyLstn);
        this.notifyLstn = null;
    }
    if (full) --this.autorefresh;
};
ObjectMap.prototype.blockGetall = function(block) {
    this.block = block;
};
ObjectMap.prototype.getall = function(cb, req) {
    var attrs = this.attrs;
    if (this.getallinprogress || this.block) return;
    if (req == null) req = {};
    req.Uff0001 = attrs.path;
    req.uff0007 = attrs.getallcmd || 0xfe0004;
    req.ufe000c = 0x5;
    req.ufe0018 = attrs.maxobjs;
    if (this.id != null) req.ufe0001 = this.id;
    if (attrs.refreshfilter) req.ufe000c |= attrs.refreshfilter;
    var oldids = {};
    for (var i in this.map) {
        oldids[i] = true;
    }
    this.getallinprogress = true;
    var prev = null;
    var me = this;
    var onreply = function(rep) {
        if (rep.ufe0019 != null) me.objCount = rep.ufe0019;
        var objs = rep.Mfe0002 || [];
        for (var i in objs) {
            var obj = objs[i];
            var oldObj = me.map[obj.ufe0001];
            if (oldObj) {
                update(oldObj, obj);
                obj = oldObj;
            }
            else {
                var aobj = me.acquired[obj.ufe0001];
                if (aobj) {
                    update(aobj, obj);
                    obj = aobj;
                }
                ++me.size;
                me.map[obj.ufe0001] = obj;
            }
            if (attrs.ordered) {
                if (obj._prev != prev || !oldObj) {
                    if (oldObj) me.unlink(obj);
                    me.linkAfter(obj, prev);
                }
                prev = obj;
            }
            obj._type = me.getObjType(obj);
            obj._owner = me;
            delete oldids[obj.ufe0001];
        }
        if (cb && !cb(rep)) {
            me.getallinprogress = false;
        }
        else if (isError(rep)) {
            if (rep.uff0008 == 16646158) {
                var cnt = document.getElementById('content');
                var node = cnt.lastChild;
                var td = el(el(el(null, 'tbody'), 'tr'), 'td', me.attrs.maxobjsmsg);
                td.colSpan = 21;
                td.className = 'tablerror';
                node.appendChild(td);
            }
            me.getallinprogress = false;
        }
        else if ((rep.ufe0003 != null || rep.mfe0015) && !me.block) {
            if (rep.ufe0003 != null) req.ufe0003 = rep.ufe0003;
            if (rep.mfe0015 != null) req.mfe0015 = rep.mfe0015;
            post(req, onreply);
        }
        else {
            for (var id in oldids) {
                var obj = me.map[id];
                if (!obj) continue;
                --me.size;
                obj.ufe0013 = 1;
                if (attrs.ordered) me.unlink(obj);
                delete me.map[id];
                me.lstns.notify(obj);
            }
            me.getallinprogress = false;
            if (!me.block && !me.timer && me.autorefresh >= 1 && attrs.autorefresh) {
                me.timer = setTimeout(function() {
                    me.timer = null;
                    if (me.autorefresh >= 1) me.getall(cb);
                }, attrs.autorefresh);
            }
        }
        for (var i in objs) {
            var obj = me.map[objs[i].ufe0001];
            me.lstns.notify(obj, me.getallinprogress || i < objs.length - 1);
        }
    };
    post(req, onreply);
};
ObjectMap.prototype.getObjType = function(obj) {
    return this.getObjSpecType(obj, this.attrs) || this.attrs;
};
ObjectMap.prototype.getObjSpecType = function(obj, attrs) {
    if (!attrs.generic) return null;
    var t = attrs.subtypes[obj[attrs.typeon.id]];
    if (t) return this.getObjSpecType(obj, t) || t;
    for (var i in attrs.gensubtypes) {
        t = this.getObjSpecType(obj, attrs.gensubtypes[i]);
        if (t) return t;
    }
    return null;
};
ObjectMap.prototype.renumurate = function(obj, skipNotify) {
    if (!obj) return;
    var num = obj._prev ? obj._prev._num + 1 : 0;
    do {
        if (obj._num == num) break;
        obj._num = num;
        if (skipNotify > 0) {
            --skipNotify;
        }
        else {
            this.lstns.notify(obj);
        }
        obj = obj._next;
        ++num;
    } while (obj);
};
ObjectMap.prototype.unlink = function(obj) {
    if (obj._next) {
        obj._next._prev = obj._prev;
        this.renumurate(obj._next, 0);
    }
    else {
        this.last = obj._prev;
        if (this.last) this.last._next = null;
    }
    if (obj._prev) {
        obj._prev._next = obj._next;
    }
    else {
        this.first = obj._next;
        if (this.first) this.first._prev = null;
    }
};
ObjectMap.prototype.linkBefore = function(obj, next) {
    if (next) {
        obj._next = next;
        obj._prev = next._prev;
        if (next._prev) {
            next._prev._next = obj;
        }
        else {
            this.first = obj;
        }
        next._prev = obj;
    }
    else {
        obj._next = null;
        obj._prev = this.last;
        if (obj._prev) {
            obj._prev._next = obj;
        }
        else {
            this.first = obj;
        }
        this.last = obj;
    }
    this.renumurate(obj, 1);
};
ObjectMap.prototype.linkAfter = function(obj, prev) {
    if (prev) {
        obj._prev = prev;
        obj._next = prev._next;
        if (prev._next) {
            prev._next._prev = obj;
        }
        else {
            this.last = obj;
        }
        prev._next = obj;
    }
    else {
        obj._prev = null;
        obj._next = this.first;
        if (obj._next) {
            obj._next._prev = obj;
        }
        else {
            this.last = obj;
        }
        this.first = obj;
    }
    this.renumurate(obj, 1);
};

function FilteredMap(map, attrs) {
    this.map = map;
    this.attrs = attrs;
    this.lstns = new Listeners();
}
FilteredMap.prototype.getType = function() {
    return this.attrs;
};
FilteredMap.prototype.toString = function(obj) {
    return this.map.toString(obj);
};
FilteredMap.prototype.getName = function(obj) {
    return this.map.getName(obj);
};
FilteredMap.prototype.getFullName = function(obj) {
    return this.map.getFullName(obj);
};
FilteredMap.prototype.getPath = function(obj) {
    var path = getPath(this.attrs);
    if (obj) {
        if (!obj._type.nameval && !obj._type.name) return null;
        path += obj.ufe0001 == null ? '.new' : '.' + obj.ufe0001;
    }
    return path;
};
FilteredMap.prototype.getCount = function() {
    return null;
};
FilteredMap.prototype.getObject = function(id) {
    return this.map.getObject(id);
};
FilteredMap.prototype.newObject = function(typeid) {
    typeid = typeid || this.attrs.ntitle;
    return this.map.newObject(typeid);
};
FilteredMap.prototype.removeObject = function(obj, cb) {
    this.map.removeObject(obj, cb);
};
FilteredMap.prototype.getSubtypes = function() {
    var types = [];
    if (this.map.getSubtypesFor(this.attrs, types)) return types;
    return null;
};
FilteredMap.prototype.getSubtype = function(gen, id) {
    return this.map.getSubtype(gen, id);
};
FilteredMap.prototype.foreach = function(cb) {
    var me = this;
    this.map.foreach(function(obj) {
        if (me.filter(obj)) cb(obj);
    });
};
FilteredMap.prototype.listen = function(cb, full) {
    if (this.lstns.listen(cb)) {
        var me = this;
        this.lstn = function(obj) {
            if (me.filter(obj)) me.lstns.notify(obj);
        };
        this.map.listen(this.lstn, true);
    }
};
FilteredMap.prototype.unlisten = function(cb, full) {
    if (this.lstns.unlisten(cb)) {
        this.map.unlisten(this.lstn, true);
    }
};
FilteredMap.prototype.filter = function(obj) {
    for (var type = obj._type; type; type = type.inherit) {
        if (type == this.attrs) return true;
    }
    return false;
};

function ObjectAction(attrs) {
    this.attrs = attrs;
    this.lstns = new Listeners();
    this.autorefresh = 0;
    this.req = {};
    this.req._type = {
        c: attrs.request,
        owner: attrs
    };
    this.req._owner = this;
    this.rep = {};
    this.rep._type = {
        ro: 1,
        c: attrs.c,
        owner: attrs
    };
    this.rep._owner = this;
}
ObjectAction.prototype.getName = function() {
    return getObjectName(this.req);
};
ObjectAction.prototype.getFullName = function() {
    return {
        name: this.attrs.title,
        cfg: getSysProps(this.attrs),
        propname: 'title',
        postfix: (this.started ? '(Running)' : '')
    };
};
ObjectAction.prototype.getPath = function() {
    return getPath(this.attrs);
};
ObjectAction.prototype.getObject = function() {
    return this.getRequest();
};
ObjectAction.prototype.getRequest = function() {
    return this.req;
};
ObjectAction.prototype.getReply = function() {
    return this.rep;
};
ObjectAction.prototype.isRunning = function() {
    return this.started;
};
ObjectAction.prototype.start = function() {
    this.stop();
    var req = {};
    update(req, this.req);
    req.Uff0001 = this.attrs.path;
    req.uff0007 = this.attrs.startcmd;
    for (var i in this.rep) {
        if (i[0] != '_') delete this.rep[i];
    }
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) {
            showError('Couldn\'t start', rep);
            return;
        }
        if (rep.ufe0001 != null) me.req.ufe0001 = rep.ufe0001;
        me.rep.ufe0001 = me.req.ufe0001;
        me.started = true;
        if (me.autorefresh) {
            me.lstns.notify(me.rep);
            me.fetch();
        }
        else {
            me.stop();
        }
    });
};
ObjectAction.prototype.stop = function() {
    if (this.started) {
        this.started = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        var req = {};
        req.Uff0001 = this.attrs.path;
        req.uff0007 = this.attrs.cancelcmd;
        if (this.req.ufe0001 != null) req.ufe0001 = this.req.ufe0001;
        var me = this;
        post(req, function(rep) {
            me.lstns.notify(me.rep);
        });
    }
};
ObjectAction.prototype.fetch = function() {
    var req = {};
    req.Uff0001 = this.attrs.path;
    req.uff0007 = this.attrs.pollcmd;
    if (this.req.ufe0001 != null) req.ufe0001 = this.req.ufe0001;
    var me = this;
    post(req, function(rep) {
        if (!me.started) return;
        if (isError(rep)) {
            showError('Couldn\'t continue', rep);
            me.stop();
            return;
        }
        update(me.rep, rep);
        me.lstns.notify(me.rep);
        if (rep.bfe000b) {
            me.stop();
        }
        else if (me.autorefresh && !me.timer) {
            me.timer = setTimeout(function() {
                me.timer = null;
                me.fetch();
            }, me.attrs.autorefresh);
        }
    });
};
ObjectAction.prototype.autostart = function(obj) {
    this.start();
    return false;
};
ObjectAction.prototype.listen = function(cb, full) {
    if (full) ++this.autorefresh;
    this.lstns.listen(cb);
};
ObjectAction.prototype.unlisten = function(cb, full) {
    if (full && --this.autorefresh == 0) {
        this.stop();
    }
    this.lstns.unlisten(cb);
};

function ObjectQuery(attrs) {
    this.attrs = attrs;
    this.lstns = new Listeners();
    this.listening = 0;
    this.req = {};
    this.req._type = {
        c: attrs.request,
        owner: attrs
    };
    this.req._owner = this;
    if (attrs.status) {
        this.status = {};
        this.status._type = {
            c: attrs.status,
            ro: 1,
            owner: attrs
        };
        this.status._owner = this;
    }
    var mapLstns = {};
    mapLstns.lstns = new Listeners();
    mapLstns.owner = this;
    mapLstns.listen = function(cb, full) {
        if (full) this.owner.listen(null, full);
        return this.lstns.listen(cb);
    };
    mapLstns.unlisten = function(cb, full) {
        if (full) this.owner.unlisten(null, full);
        return this.lstns.unlisten(cb);
    };
    mapLstns.notify = function(obj) {
        this.lstns.notify(obj);
    };
    var mapAttrs = {
        c: attrs.c,
        columns: attrs.columns,
        path: attrs.path,
        ro: 1,
        ordered: attrs.autolimit != 0,
        autorefresh: attrs.autorefresh,
        refreshfilter: attrs.refreshfilter,
        name: attrs.name,
        nameval: attrs.nameval,
        generic: attrs.generic,
        subtypes: attrs.subtypes,
        typeon: attrs.typeon,
        owner: attrs
    };
    this.map = new ObjectMap(mapAttrs, mapLstns);
    this.map.blockGetall(true);
};
ObjectQuery.prototype.getName = function() {
    return getObjectName(this.req);
};
ObjectQuery.prototype.getFullName = function() {
    return {
        name: this.attrs.title,
        cfg: getSysProps(this.attrs),
        propname: 'title',
        postfix: (this.id != null ? '(Running)' : '')
    };
};
ObjectQuery.prototype.getPath = function(obj) {
    return getPath(this.attrs);
};
ObjectQuery.prototype.getObject = function(id) {
    if (id == null) return this.getRequest();
    return this.map.getObject(id);
};
ObjectQuery.prototype.getRequest = function() {
    return this.req;
};
ObjectQuery.prototype.getStatus = function() {
    return this.status;
};
ObjectQuery.prototype.getMap = function() {
    return this.map;
};
ObjectQuery.prototype.isRunning = function() {
    return this.id != null;
};
ObjectQuery.prototype.start = function() {
    this.stop();
    if (this.starting) return;
    this.starting = true;
    var req = {};
    update(req, this.req);
    req.Uff0001 = this.attrs.path;
    req.uff0007 = this.attrs.startcmd;
    var map = this.map;
    map.foreach(function(obj) {
        map.remove(obj);
    });
    if (this.status) {
        for (var i in this.status) {
            if (i[0] != '_') delete this.status[i];
        }
    }
    if (this.attrs.startcmd == 0xffffffff && this.attrs.autorefresh == null) {
        this.starting = false;
        this.map.blockGetall(false);
        this.map.getall(null, req);
        return;
    }
    var me = this;
    post(req, function(rep) {
        me.starting = false;
        if (isError(rep)) {
            showError('Couldn\'t start', rep);
            return;
        }
        me.id = rep.ufe0001 != null ? rep.ufe0001 : me.req.ufe0001;
        if (me.listening) {
            me.lstns.notify(me.req);
            me.map.setID(me.id);
            me.map.blockGetall(false);
            me.map.getall(function(rep) {
                return me.onGetall(rep);
            });
        }
        else {
            me.stop();
        }
    });
};
ObjectQuery.prototype.stop = function() {
    if (this.id != null) {
        this.map.blockGetall(true);
        var req = {};
        req.Uff0001 = this.attrs.path;
        req.uff0007 = this.attrs.cancelcmd;
        req.ufe0001 = this.id;
        this.id = null;
        var me = this;
        post(req, function(rep) {
            me.lstns.notify(me.req);
        });
    }
};
ObjectQuery.prototype.onGetall = function(rep) {
    if (this.status && rep.Mfe0002 && rep.Mfe0002.length >= 1) {
        update(this.status, rep.Mfe0002[rep.Mfe0002.length - 1]);
        this.lstns.notify(this.status);
    }
    if (this.id == null) return false;
    if (isError(rep)) {
        showError('Couldn\'t continue', rep);
        this.stop();
        return false;
    }
    if (rep.bfe000b) {
        this.map.blockGetall(true);
        this.stop();
        return false;
    }
    if (this.attrs.autolimit && this.map.getSize() >= this.attrs.autolimit) {
        this.map.remove(this.map.getFirst());
    }
    return true;
};
ObjectQuery.prototype.autostart = function(obj) {
    this.start();
    return false;
};
ObjectQuery.prototype.listen = function(cb, full) {
    if (full) ++this.listening;
    if (cb) this.lstns.listen(cb);
};
ObjectQuery.prototype.unlisten = function(cb, full) {
    if (full && --this.listening == 0) {
        this.stop();
    }
    if (cb) this.lstns.unlisten(cb);
};

function Doit(attrs, path) {
    this.attrs = attrs;
    this.path = path;
    this.lstns = new Listeners();
    this.obj = {};
    this.obj._type = attrs;
    this.obj._owner = this;
}
Doit.prototype.getName = function() {
    return getObjectName(this.obj);
};
Doit.prototype.getFullName = function() {
    return {
        name: this.attrs.title || this.attrs.name,
        cfg: getSysProps(this.attrs),
        propname: 'title'
    };
};
Doit.prototype.getPath = function() {
    return getPath(this.attrs);
};
Doit.prototype.getObject = function() {
    return this.obj;
};
Doit.prototype.setID = function(id) {
    if (id != null) {
        this.obj.ufe0001 = id;
    }
    else {
        delete this.obj.ufe0001;
    }
};
Doit.prototype.doit = function(cb) {
    var req = {};
    update(req, this.obj);
    req.Uff0001 = this.attrs.path || this.path;
    req.uff0007 = this.attrs.cmd;
    var me = this;
    post(req, function(rep) {
        if (me.attrs.autoreset) {
            update(me.obj, {});
            me.lstns.notify(me.obj);
        }
        if (isError(rep)) {
            showError(me.attrs.errorprefix || 'Couldn\'t perform action', rep);
        }
        if (cb) cb(!isError(rep));
    });
};
Doit.prototype.autostart = function(obj) {
    if (this.attrs.confirm && !confirm(this.attrs.confirm)) return true;
    this.doit();
    return true;
};
Doit.prototype.listen = function(cb) {
    this.lstns.listen(cb);
};
Doit.prototype.unlisten = function(cb) {
    this.lstns.unlisten(cb);
};

function SetupManager(attrs) {
    this.attrs = attrs;
    this.lstns = new Listeners();
    this.obj = {};
    this.obj._type = attrs;
    this.obj._owner = this;
}
SetupManager.prototype.getName = function() {
    return getObjectName(this.obj);
};
SetupManager.prototype.getFullName = function() {
    return {
        name: this.attrs.title,
        cfg: getSysProps(this.attrs),
        propname: 'title'
    };
};
SetupManager.prototype.getObject = function() {
    return this.obj;
};
SetupManager.prototype.getCurrentPage = function() {
    return this.pageHistory[this.pageNow];
};
SetupManager.prototype.getCurrentDescription = function() {
    return this.pageDescrs[this.pageNow];
};
SetupManager.prototype.isFinished = function() {
    return this.finished;
};
SetupManager.prototype.reset = function() {
    this.finished = false;
    this.pageNow = 0;
    this.pageHistory = [1];
    this.pageDescrs = [];
    this.lstns.notify(this.obj);
};
SetupManager.prototype.back = function() {
    if (this.pageNow > 0) {
        --this.pageNow;
        this.lstns.notify(this.obj);
    }
};
SetupManager.prototype.next = function(fast) {
    if (fast && this.pageNow + 1 < this.pageHistory.length) {
        ++this.pageNow;
        this.lstns.notify(this.obj);
        return;
    }
    var req = {};
    req.Uff0001 = this.attrs.path;
    req.uff0007 = 0xfe0008;
    req.mfe000f = this.obj;
    req.ufe000e = this.pageHistory[this.pageNow];
    var me = this;
    post(req, function(rep) {
        if (isError(rep)) {
            showError(me.getName(), rep);
            if (rep.uff0008 == 0xfe0008) {
                me.finished = true;
                me.lstns.notify(me.obj);
                return;
            }
            return;
        }
        if (rep.bfe000b) {
            me.finished = true;
            me.lstns.notify(me.obj);
            return;
        }
        if (rep.mfe000f) update(me.obj, rep.mfe000f);
        ++me.pageNow;
        me.pageHistory.splice(me.pageNow, me.pageHistory.length - me.pageNow);
        me.pageHistory.push(rep.ufe000e);
        me.pageDescrs[me.pageNow] = rep.sfe0009;
        me.lstns.notify(me.obj);
    });
};
SetupManager.prototype.listen = function(cb) {
    this.lstns.listen(cb);
};
SetupManager.prototype.unlisten = function(cb) {
    this.lstns.unlisten(cb);
};

function fooListener(obj) {}

function getContainer(attrs) {
    while (attrs.inherit) attrs = attrs.inherit;
    for (var i in pool) {
        if (pool[i].attrs == attrs) {
            var cont = pool[i].container;
            pool.splice(i, 1);
            pool.push({
                attrs: attrs,
                container: cont
            });
            return cont;
        }
    }
    var cont = container[attrs.type].create(attrs);
    if (!attrs.autostop) cont.listen(fooListener);
    pool.push({
        attrs: attrs,
        container: cont
    });
    if (pool.length > 10) {
        pool[0].container.unlisten(fooListener);
        pool.splice(0, 1);
    }
    return cont;
}

function getObjectMap(path) {
    var attrs = mapAttrs[path];
    return attrs ? getContainer(attrs) : null;
}

function isContainerVisible(c) {
    return c.title && !c.nonpublic && (!c.pred || isTrue(c.pred));
}

function isTabless(c) {
    return !container[c.service.c[0].type].tab;
}

function isTablessContainer(c) {
    if (c.owner) c = c.owner;
    if (container[c.type].tab) return false;
    var service = c.service;
    for (var i in service.c) {
        if (!isContainerVisible(service.c[i])) continue;
        return service.c[i] == c;
    }
    return false;
}

function isServiceVisible(service) {
    if (service.pred && !isTrue(service.pred)) return false;
    for (var i in service.c) {
        if (isContainerVisible(service.c[i])) return true;
    }
    return false;
}

function isROObj(obj, type) {
    if (!type) type = obj._type;
    return type.ro || obj.bfe0007;
}

function hasApply(obj, type) {
    if (!type) type = obj._type;
    if (isROObj(obj, type)) return false;
    for (var i in type.c) {
        if (!ftype(type.c[i]).isRO(type.c[i])) return true;
    }
    return false;
}

function CmpOrder() {
    this.next = null;
}
CmpOrder.prototype.cmp = function(o1, o2) {
    return o1._num < o2._num;
};

function CmpAscending(col, attrs, next) {
    this.col = col;
    this.attrs = attrs;
    this.next = next;
    this.ascend = true;
}
CmpAscending.prototype.cmp = function(o1, o2) {
    var v1 = ftype(this.attrs).get(this.attrs, o1);
    var v2 = ftype(this.attrs).get(this.attrs, o2);
    if (v1 == null) {
        if (v2 != null) return true;
    }
    else {
        if (v2 == null) return false;
        if (ftype(this.attrs).less(this.attrs, v1, v2)) return true;
        if (ftype(this.attrs).less(this.attrs, v2, v1)) return false;
    }
    if (!this.next) return false;
    return this.next.cmp(o1, o2);
};

function CmpDescending(col, attrs, next) {
    this.col = col;
    this.attrs = attrs;
    this.next = next;
}
CmpDescending.prototype.cmp = function(o1, o2) {
    var v1 = ftype(this.attrs).get(this.attrs, o1);
    var v2 = ftype(this.attrs).get(this.attrs, o2);
    if (v1 == null) {
        if (v2 != null) return false;
    }
    else {
        if (v2 == null) return true;
        if (ftype(this.attrs).less(this.attrs, v2, v1)) return true;
        if (ftype(this.attrs).less(this.attrs, v1, v2)) return false;
    }
    if (!this.next) return false;
    return this.next.cmp(o1, o2);
};

function Table(cnt, map, sb) {
    this.attrs = map.getType();
    this.prefs = getPrefs(this.attrs);
    this.map = map;
    this.columns = [];
    this.columnWidths = {};
    this.flags = [];
    this.rows = {};
    this.order = [];
    this.selected = {};
    this.destroyLstns = new Listeners();
    if (this.attrs.iconon) this.iconon = getAttr(this.attrs, this.attrs.iconon);
    this.dragCnt = 0;
    this.dragging = null;
    if (sb) this.status = el(sb.firstChild.firstChild, 'td', ' ');
    this.init(cnt);
    var me = this;
    this.lstn = function(obj) {
        if (me.updateRow(obj)) me.updateStatus();
    };
    this.map.listen(this.lstn, true);
    this.update();
}
Table.prototype.destroy = function() {
    if (this.redrawTimer) clearTimeout(this.redrawTimer);
    for (var i in this.rows) {
        this.removeRowHandlers(this.rows[i], null);
    }
    for (var i in this.columns) {
        if (!this.columns[i]) continue;
        var attrs = this.columns[i];
        ftype(attrs).unlisten(attrs, this.columnLstn);
    }
    if (this.filter && this.filter.unlstn) this.filter.unlstn();
    this.map.unlisten(this.lstn, true);
    this.destroyLstns.notify();
};
Table.prototype.onDestroy = function(cb) {
    this.destroyLstns.listen(cb);
};
Table.prototype.init = function(cnt) {
    function elw(parent, type, width) {
        var e = el(parent, type);
        e.width = width;
        return e;
    }
    var me = this;
    this.expired = true;
    this.columnLstn = function() {
        if (!me.expired) return;
        me.expired = false;
        me.redrawTimer = setTimeout(function() {
            me.redrawTimer = null;
            me.expired = true;
            me.update();
        }, 200);
    };
    this.table = elc(cnt, 'table', 'table');
    this.table.cellSpacing = 0;
    this.header = el(el(this.table, 'thead'), 'tr');
    el(elw(this.header, 'th', 40), 'span', ' ');
    el(elw(this.header, 'th', 30), 'span', ' ');
    if (this.attrs.ordered) {
        el(elw(this.header, 'th', 40), 'span', '#');
    }
    for (var i in this.attrs.columns) {
        var attrs = this.attrs.columns[i];
        var col = !attrs.nonpublic ? ftype(attrs).column(attrs, this, this.attrs) : null;
        if (col && col[1] && col[1] != 0xffffffff) {
            var width = col[1];
            if (this.columns.length == 0) width += 16;
            var h = el(this.header, 'th');
            h.title = col[0];
            h.width = width;
            el(h, 'span', col[0]);
            ftype(attrs).listen(attrs, this.columnLstn);
            this.columns.push(attrs);
        }
        else {
            this.columns.push(null);
        }
    }
    var th = el(this.header, 'th', ' ').width = '100%';
    var header = this.header;
    var isOnColumnEdge = function(e, x) {
        e = e || event;
        var src = e.srcElement || e.target;
        if (src.nodeName == 'SPAN') src = src.parentNode;
        x -= src.offsetLeft;
        if (x < 6) return src.previousSibling;
        if (x >= src.offsetWidth - 6) return src;
        return null;
    };
    var onmousemove = function(e) {
        if (me.drag) return true;
        var x = getPos(e, me.table).x;
        if (me.columnResized != null) {
            var col = me.columnResized;
            col.width = Math.max(parseInt(col.width) + x - me.lastX, 12);
            me.lastX = x;
            return false;
        }
        if (isOnColumnEdge(e, x)) {
            document.body.style.cursor = 'col-resize';
        }
        else {
            document.body.style.cursor = 'default';
        }
        return false;
    };
    header.onmouseover = onmousemove;
    header.onmousemove = onmousemove;
    header.onmousedown = function(e) {
        var x = getPos(e, me.table).x;
        var col = isOnColumnEdge(e, x);
        if (col) {
            me.columnResized = col;
            me.lastX = x;
            document.body.style.cursor = 'col-resize';
            var release = false;
            if (!e && header.setCapture) {
                header.setCapture();
                release = true;
            }
            else {
                document.onmousemove = onmousemove;
            }
            document.onmouseup = function(e) {
                var i = me.findColumn(me.columnResized);
                if (i != null) {
                    var col = me.columns[i];
                    me.columnWidths[col.name] = me.columnResized.width;
                    me.updateColumnPrefs();
                }
                document.body.style.cursor = 'default';
                if (release) {
                    header.releaseCapture();
                }
                else {
                    document.onmousemove = null;
                }
                document.onmouseup = null;
                me.columnResized = null;
                return false;
            };
            return false;
        }
        var src = getEventSrc(e);
        if (src.nodeName == 'SPAN') src = src.parentNode;
        if (src == header.cells[0] || src == header.cells[1]) return false;
        me.columnPressed = src;
        addClass(src, 'pressed');
        document.onmousemove = function(e) {
            if (getEventSrc(e) == me.columnPressed) {
                addClass(me.columnPressed, 'pressed');
            }
            else {
                removeClass(me.columnPressed, 'pressed');
            }
            return false;
        };
        document.onmouseup = function(e) {
            if (me.columnPressed == null) return true;
            if (hasClass(me.columnPressed, 'pressed')) {
                removeClass(me.columnPressed, 'pressed');
                me.sortBy(me.columnPressed);
            }
            me.columnPressed = null;
            document.onmouseup = null;
            document.onmousemove = null;
        };
        return false;
    };
    header.onmouseout = function(e) {
        e = e || event;
        var to = e.toElement || e.relatedTarget;
        if (to) {
            if (to.nodeName == 'SPAN') to = to.parentNode;
            if (to.nodeName == 'TH') return false;
        }
        if (!me.columnResized) document.body.style.cursor = 'default';
        return false;
    };
    this.loadPrefs();
};
Table.prototype.addFlag = function(attrs, band) {
    this.flags.push([attrs, band]);
};
Table.prototype.addEnable = function(attrs) {
    this.enable = attrs;
};
Table.prototype.addComment = function(attrs) {
    this.comment = attrs;
};
Table.prototype.addAboutInfo = function(attrs) {
    this.about = attrs;
};
Table.prototype.addFilter = function(filterAttrs) {
    this.filterAttrs = filterAttrs;
    var values = filterAttrs.values;
    var attr;
    if (values) {
        attr = getAttr(this.attrs, filterAttrs.filteron);
        if (shouldHide(getAttrProp(this.attrs, attr))) values = null;
    }
    if (filterAttrs.conds) {
        var cvalues = {
            type: 'static',
            map: {}
        };
        for (var i = 0; i < filterAttrs.conds.length; ++i) {
            var c = filterAttrs.conds[i];
            var cc = getAttr(this.attrs, c.on);
            if (!cc) continue;
            var hide = true;
            for (var j in cc.c) {
                var a = getAttr(this.attrs, cc.c[j].on);
                if (a && !shouldHide(getAttrProp(this.attrs, a))) {
                    hide = false;
                    break;
                }
            }
            if (!hide) cvalues.map[-i - 2] = c.name;
        }
        if (!isempty(cvalues.map)) {
            if (values) {
                values = {
                    type: 'pair',
                    c: [values, cvalues]
                };
            }
            else {
                values = cvalues;
            }
        }
    }
    if (!values) return;
    values = {
        type: 'defenum',
        defid: -1,
        defname: 'all',
        values: values
    };
    var me = this;
    var ctrl = el(null, 'select');
    me.filter = {};
    me.filter.values = values;
    me.filter.filteron = attr;
    me.filter.ctrl = ctrl;
    me.filter.name = 'all';
    me.filter.value = -1;
    ctrl.onchange = function(e) {
        me.setFilterValue(parseInt(ctrl.value));
        me.updateFilterPrefs();
    };
    var cb = function(id, idx) {
        if (me.filter.name && me.filter.value == null) {
            var name = enm[me.filter.values.type].toString(id, me.filter.values);
            if (me.filter.name == name) {
                me.setFilterValue(id);
                me.filter.ctrl.selectedIndex = idx;
            }
        }
    }
    if (!me.filter.lstn) {
        me.filter.lstn = fillOptions(ctrl, values, true, null, null, null, cb);
    }
    me.filter.unlstn = function() {
        enm[values.type].unlisten(values, me.filter.lstn);
    };
    var tb = document.getElementById('toolbar');
    var e = elc(elc(tb.firstChild, 'span', 'filter'), 'span', 'select');
    e.appendChild(ctrl);
    return ctrl;
};
Table.prototype.setFilterValue = function(value) {
    this.filter.value = value;
    this.filter.name = enm[this.filter.values.type].toString(value, this.filter.values);
    this.filter.pred = null;
    if (value < -1) {
        var cond = this.filterAttrs.conds[-value - 2];
        var c = getAttr(this.attrs, cond.on);
        this.filter.pred = c.c[0].pred;
        this.filter.attr = getAttr(this.attrs, c.c[0].on);
    }
    this.update();
};
Table.prototype.getFilterValue = function() {
    if (this.filter && this.filter.value >= 0) {
        return this.filter.name;
    }
    return null;
};
Table.prototype.update = function(onlyOrder) {
    var me = this;
    this.map.foreach(function(obj) {
        me.updateRow(obj, onlyOrder);
    });
    this.updateStatus();
};
Table.prototype.updateStatus = function() {
    if (!this.status) return;
    var size = this.table.childNodes.length - 1;
    var msg = size != 1 ? size + ' items' : '1 item';
    var count = this.map.getCount();
    if (count != null && size != count) {
        msg += ' out of ' + count;
    }
    replaceText(this.status, msg);
};
Table.prototype.cancelDragNDrop = function(row) {
    if (this.release) {
        row.releaseCapture();
        row.onmousemove = null;
        row.onmouseup = null;
        row.onlosecapture = null;
    }
    else {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    if (this.dragTimer) {
        clearTimeout(this.dragTimer);
        this.dragTimer = null;
    }
    if (this.dropTarget) {
        removeClass(this.dropTarget, 'droptarget');
    }
    if (this.drag) {
        document.body.removeChild(this.drag);
        this.drag = null;
    }
    this.dropTarget = null;
    this.dragging = null;
};
Table.prototype.addRowHandlers = function(row, obj) {
    var me = this;
    if (!this.attrs.ordered || this.attrs.ro) {
        row.onmousedown = function(e) {
            return false;
        };
        row.onclick = function(e) {
            var src = getEventSrc(e);
            if (src && src.nodeName == 'A') return true;
            var path = me.map.getPath(obj);
            if (path) openContent(path);
            return false;
        };
        return;
    }
    var ondrag = function(e) {
        if (me.dragTimer) {
            clearTimeout(me.dragTimer);
            me.dragTimer = null;
            me.drag.style.display = 'block';
        }
        if (me.dragging == null) {
            me.dragging = obj;
            me.drag = el(null, 'table');
            me.drag.style.position = 'absolute';
            me.drag.style.opacity = '0.6';
            me.drag.style.zIndex = '10';
            me.drag.appendChild(row.cloneNode(true));
            document.body.appendChild(me.drag);
        }
        var pos = getPos(e);
        me.drag.style.left = (pos.x + 8) + 'px';
        me.drag.style.top = (pos.y + 8) + 'px';
        var rowHeight = row.offsetHeight;
        var height = window.innerHeight || document.documentElement.clientHeight;
        var y = pos.clientY;
        var dy = y < 0 ? y : (y > height ? y - height : 0);
        var src = null;
        if (dy == 0) {
            src = getEventSrc(e);
            while (src && src.nodeName != 'TBODY' && src.nodeName != 'THEAD') {
                src = src.parentNode;
            }
            if (src && src.parentNode != me.table) src = null;
        }
        if (me.dropTarget != src) {
            if (me.dropTarget) removeClass(me.dropTarget, 'droptarget');
            me.dropTarget = src;
            if (me.dropTarget) addClass(me.dropTarget, 'droptarget');
        }
        if (dy != 0) {
            var scroll = function() {
                window.scrollBy(0, dy * 2);
                me.dragTimer = setTimeout(scroll, 100);
            };
            me.drag.style.display = 'none';
            me.dragTimer = setTimeout(scroll, 1);
        }
        return false;
    };
    var ondragover = function(e) {
        var dragging = me.dragging;
        var dropTarget = me.dropTarget;
        me.cancelDragNDrop(row);
        if (!dragging) {
            openContent(me.map.getPath(obj));
            return false;
        }
        if (dropTarget) {
            me.map.moveObjectAfter(dragging, me.getRowObject(dropTarget));
        }
        return false;
    };
    row.onmousedown = function(e) {
        if (getEventSrc(e).nodeName == 'A') return false;
        if (!e && row.setCapture) {
            me.release = true;
            row.setCapture();
            row.onmousemove = ondrag;
            row.onmouseup = ondragover;
            row.onlosecapture = function() {
                me.cancelDragNDrop(row);
                return false;
            };
        }
        else {
            me.release = false;
            document.onmousemove = ondrag;
            document.onmouseup = ondragover;
        }
        return false;
    };
};
Table.prototype.removeRowHandlers = function(row, obj) {
    row.onclick = null;
    row.ondblclick = null;
    row.onmousedown = null;
    if (this.dragging == obj) this.cancelDragNDrop(row);
};
Table.prototype.getRowObject = function(row) {
    for (var i in this.rows) {
        if (this.rows[i] == row) {
            return this.map.getObject(i);
        }
    }
    return null;
};
Table.prototype.updateComment = function(row, obj) {
    var val = ftype(this.comment).get(this.comment, obj);
    if (val) {
        if (row.firstChild.className != 'comment') {
            var href = this.map.getPath(obj);
            var line = elc(null, 'tr', 'comment');
            var td = el(line, 'td');
            td.colSpan = this.header.cells.length;
            row.insertBefore(line, row.firstChild);
        }
        replaceText(row.firstChild.firstChild, ';;; ' + val);
    }
    else if (row.firstChild.className == 'comment') {
        row.removeChild(row.firstChild);
    }
};
Table.prototype.updateAboutInfo = function(row, obj) {
    var val = ftype(this.about).get(this.about, obj);
    if (!val) val = [];
    var line = row.firstChild;
    if (line.className == 'comment') line = line.nextSibling;
    var idx;
    for (idx = 0; line.className == 'about' && idx < val.length; ++idx) {
        replaceText(line.firstChild, '--- ' + val[idx]);
        line = line.nextSibling;
    }
    if (idx == val.length) {
        while (line.className == 'about') {
            var next = line.nextSibling;
            row.removeChild(line);
            line = next;
        }
    }
    for (; idx < val.length; ++idx) {
        var href = this.map.getPath(obj);
        var nline = elc(null, 'tr', 'about');
        var td = el(nline, 'td', '--- ' + val[idx]);
        td.colSpan = this.header.cells.length;
        row.insertBefore(nline, line);
    }
};
Table.prototype.updateEnable = function(row, obj) {
    if (isROObj(obj)) return;
    var line = row.lastChild;
    var btns = line.cells[0];
    var val = ftype(this.enable).get(this.enable, obj);
    if (!val) {
        btns.lastChild.innerHTML = 'E';
        btns.lastChild.title = 'Enable';
    }
    else {
        btns.lastChild.innerHTML = 'D';
        btns.lastChild.title = 'Disable';
    }
};
Table.prototype.updateCells = function(row, obj) {
    var line = row.lastChild;
    var flags = line.cells[1];
    clearNodes(flags);
    var bands = {};
    var className = '';
    if (row.className.indexOf('droptarget') != -1) className = 'droptarget';
    for (var i in this.flags) {
        var attrs = this.flags[i][0];
        var band = this.flags[i][1];
        if (band && bands[band]) continue;
        var val = ftype(attrs).get(attrs, obj);
        var f = ftype(attrs).flag(document, attrs, val);
        if (f) {
            if (f.className != '') className = f.className;
            flags.appendChild(f);
            if (band) bands[band] = true;
        }
    }
    if (this.selected[obj.ufe0001]) className += ' selected';
    row.className = className;
    var type = obj._type;
    var idx = 2;
    if (this.attrs.ordered) {
        replaceText(line.cells[idx++], obj._num);
    }
    var first = idx;
    for (var i in this.columns) {
        if (!this.columns[i]) continue;
        var attrs = type.columns[i];
        var val = ftype(attrs).get(attrs, obj);
        attrs = this.attrs.columns[i];
        var cell = line.cells[idx];
        var data = cell.firstChild;
        if (idx == first && this.attrs.icons && data) data = data.nextSibling;
        var d = ftype(attrs).cell(document, attrs, obj, val, data);
        if (d != data) {
            clearNodes(cell);
            if (idx == first) {
                var icons = this.attrs.icons;
                if (obj._type.icons) icons = obj._type.icons;
                if (icons) {
                    var nr = 0;
                    if (this.iconon) {
                        nr = ftype(this.iconon).get(this.iconon, obj);
                        if (nr == null || this.attrs.icons[nr] == null) nr = 0;
                    }
                    createIcon(cell, icons[nr] || 0);
                }
            }
            if (d) cell.appendChild(d);
        }
        ++idx;
    }
    if (this.comment) this.updateComment(row, obj);
    if (this.about) this.updateAboutInfo(row, obj);
    if (this.enable) this.updateEnable(row, obj);
    var color = null;
    if (this.attrs.colors) {
        for (var i in this.attrs.colors) {
            var c = this.attrs.colors[i];
            if (c.cond == null) {
                var cd = getAttr(this.attrs, c.on);
                c.cond = cd ? new Condition(cd) : 0;
            }
            if (c.cond) {
                if (c.cond.isTrue(obj)) {
                    color = c.color;
                    break;
                }
            }
        }
    }
    row.style.color = color;
};
Table.prototype.findRowIndex = function(obj) {
    for (var i = 0; i < this.order.length; ++i) {
        if (this.order[i] == obj) return i;
    }
    return null;
};
Table.prototype.insertRow = function(row, obj, newRow) {
    var order = this.order;
    if (!newRow) {
        var isInRightPlace = function(sortKey, obj, idx) {
            if (idx > 0 && !sortKey.cmp(order[idx - 1], obj)) return false;
            if (idx < order.length - 1 && !sortKey.cmp(obj, order[idx + 1])) return false;
            return true;
        };
        var idx = this.findRowIndex(obj);
        if (idx != null) {
            if (isInRightPlace(this.sortKey, obj, idx)) return;
            order.splice(idx, 1);
        }
        this.table.removeChild(row);
    }
    var sortKey = this.sortKey;
    var idx = binarySearch(this.order, obj, function(a1, a2) {
        return sortKey.cmp(a1, a2);
    });
    if (idx < order.length) {
        order.splice(idx, 0, obj);
        var next = this.rows[order[idx + 1].ufe0001];
        this.table.insertBefore(row, next);
    }
    else {
        order.push(obj);
        this.table.appendChild(row);
    }
};
Table.prototype.shouldHide = function(obj) {
    for (var i in this.matcherFilter) {
        var match = this.matcherFilter[i];
        if (!match.func(ftype(match.attr).get(match.attr, obj))) return true;
    }
    if (!this.filter) return false;
    if (this.filter.value < 0) {
        if (this.filter.pred) {
            var val = ftype(this.filter.attr).get(this.filter.attr, obj);
            return !isTrue(this.filter.pred, val);
        }
        return false;
    }
    var val = ftype(this.filter.filteron).get(this.filter.filteron, obj);
    return val != this.filter.name;
};
Table.prototype.getNextRow = function(obj) {
    while (obj != null) {
        obj = this.map.getNext(obj);
        if (obj == null) return null;
        var row = this.rows[obj.ufe0001];
        if (row != null) return row;
    }
    return null;
};
Table.prototype.updateRow = function(obj, onlyOrder) {
    var id = obj.ufe0001;
    var row = this.rows[id];
    if (obj.ufe0013 || this.shouldHide(obj)) {
        if (row) {
            this.removeRowHandlers(row, obj);
            row.parentNode.removeChild(row);
            delete this.rows[id];
            var idx = this.findRowIndex(obj);
            if (idx != null) this.order.splice(idx, 1);
        }
        return true;
    }
    var ccfg = getContainerProp(obj._type);
    if (!skinMode && ccfg._hide) return true;
    if (obj._type.service) {
        var scfg = getServiceProp(obj._type.service);
        if (!skinMode && scfg._hide) return true;
    }
    var newRow = false;
    if (!row) {
        newRow = true;
        row = el(null, 'tbody');
        var line = el(row, 'tr');
        this.addRowHandlers(row, obj);
        var btns = el(line, 'td');
        var removable = (!obj._type.nonaddable && !this.attrs.ro) || this.attrs.removable;
        if (removable && !shouldHide(getSysProp(obj, 'remove'))) {
            var me = this;
            var rem = tbtn(btns, '-');
            rem.title = 'Remove';
            rem.onclick = function(e) {
                e = e || event;
                if (e.stopPropagation) e.stopPropagation();
                me.map.removeObject(obj);
            };
        }
        if (this.enable && !isROObj(obj)) {
            if (!shouldHide(getSysProp(obj, 'set'))) {
                var en = tbtn(btns, 'E');
                var attrs = this.enable;
                en.onclick = function(e) {
                    e = e || event;
                    if (e.stopPropagation) e.stopPropagation();
                    ftype(attrs).put(attrs, obj, ftype(attrs).get(attrs, obj) ? 0 : 1);
                    obj._owner.setObject(obj);
                };
            }
            else {
                var flag = el(btns, 'span', 'E');
                flag.style.display = 'none';
            }
        }
        el(line, 'td');
        if (this.attrs.ordered) el(line, 'td');
        for (var i in this.columns) {
            if (this.columns[i]) {
                el(line, 'td');
            }
        }
        el(line, 'td');
        this.rows[id] = row;
    }
    if (!this.sortKey) {
        var next = this.getNextRow(obj);
        if (newRow || row.nextSibling != next) {
            if (!newRow) this.table.removeChild(row);
            if (next) {
                this.table.insertBefore(row, next);
            }
            else {
                this.table.appendChild(row);
            }
        }
    }
    else {
        this.insertRow(row, obj, newRow);
    }
    if (!onlyOrder || newRow) this.updateCells(row, obj);
    return newRow;
};
Table.prototype.findColumnByName = function(name) {
    var idx = 2;
    if (this.attrs.ordered) ++idx;
    for (var i in this.columns) {
        if (this.columns[i] == null) continue;
        if (this.columns[i].name == name) return this.header.cells[idx];
        ++idx;
    }
    return null;
};
Table.prototype.findColumn = function(col) {
    var idx = 2;
    if (this.attrs.ordered) ++idx;
    for (var i in this.columns) {
        if (this.columns[i] == null) continue;
        if (this.header.cells[idx] == col) return i;
        ++idx;
    }
    return null;
};
Table.prototype.sortBy = function(col, skipUpdate) {
    var i = this.findColumn(col);
    if (i == null && !this.attrs.ordered) return;
    if (this.sortKey) {
        removeClass(this.sortKey.col, 'sort-descend');
        removeClass(this.sortKey.col, 'sort-ascend');
    }
    var ascend = true;
    var next = this.sortKey;
    if (this.sortKey && this.sortKey.col == col) {
        next = next.next;
        ascend = !this.sortKey.ascend;
    }
    if (!next && this.attrs.ordered) next = new CmpOrder();
    if (i != null) {
        if (ascend) {
            addClass(col, 'sort-ascend');
            this.sortKey = new CmpAscending(col, this.columns[i], next);
        }
        else {
            addClass(col, 'sort-descend');
            this.sortKey = new CmpDescending(col, this.columns[i], next);
        }
    }
    else {
        this.sortKey = null;
    }
    this.updateSortPrefs();
    this.order = [];
    if (!skipUpdate) this.update(true);
};
Table.prototype.loadPrefs = function() {
    if (this.prefs.M1) {
        var cols = this.prefs.M1;
        for (var i in cols) {
            var name = cols[i].sfe0010;
            var width = cols[i].u1;
            this.columnWidths[name] = width;
            var c = this.findColumnByName(name);
            if (c) c.width = width;
        }
    }
    if (this.prefs.S1) {
        var prefs = this.prefs.S1;
        for (var i = prefs.length - 1; i >= 0; --i) {
            var name = prefs[i];
            var ascend = true;
            if (name.charAt(0) == '!') {
                name = name.substr(1);
                ascend = false;
            }
            var col = this.findColumnByName(name);
            if (col) {
                this.sortBy(col, true);
                if (!ascend) this.sortBy(col, true);
            }
        }
    }
    if (this.prefs.s1 && this.filter) {
        this.filter.name = this.prefs.s1;
        this.filter.value = null;
        var map = enm[this.filter.values.type].getMap(this.filter.values);
        for (var id in map) {
            if (map[id] == this.filter.name) {
                this.setFilterValue(id);
                this.filter.ctrl.selectedIndex = getOptionIndex(this.filter.ctrl, id);
                break;
            }
        }
    }
    if (!this.sortKey && !this.attrs.ordered) {
        this.sortBy(this.header.cells[2], true);
    }
};
Table.prototype.updateSortPrefs = function() {
    var limit = 8;
    var prefs = [];
    for (var i = this.sortKey; i && i.attrs; i = i.next) {
        if (--limit == 0) i.next = null;
        var name = i.attrs.name;
        if (!i.ascend) name = '!' + name;
        prefs.push(name);
    }
    this.prefs.S1 = prefs;
    setPrefs(this.prefs);
};
Table.prototype.updateColumnPrefs = function() {
    var c = [];
    for (var i in this.columnWidths) {
        c.push({
            sfe0010: i,
            u1: this.columnWidths[i]
        });
    }
    this.prefs.M1 = c;
    setPrefs(this.prefs);
};
Table.prototype.updateFilterPrefs = function() {
    if (this.filter.name) {
        this.prefs.s1 = this.filter.name;
        setPrefs(this.prefs);
    }
};

function Pane(attrs, top) {
    this.attrs = attrs;
    this.top = top;
}
Pane.prototype.getPath = function() {
    return getPath(this.attrs);
};
Pane.prototype.open = function(cont) {
    var cnt = document.getElementById('content');
    this.createTabs(cont);
    this.tb = el(cnt, 'div');
    this.tb.id = 'toolbar';
    elc(this.tb, 'ul', 'toolbar');
    el(cnt, 'table').id = 'filter';
    var sb = el(cnt, 'table');
    sb.id = 'statusbar';
    sb.cellSpacing = 0;
    sb.cellPadding = 0;
    var sbrow = el(el(sb, 'tbody'), 'tr');
    this.create(cnt);
    this.addButtons(cont);
    if (sbrow.firstChild) {
        sbrow.lastChild.style.width = '100%';
    }
    else {
        cnt.removeChild(sb);
    }
    elc(this.tb.firstChild, 'li', 'postfix');
};
Pane.prototype.close = function() {};
Pane.prototype.setCustomTitle = function(ctrl, postfix) {
    var header = document.getElementById('title');
    clearNodes(header);
    header.appendChild(ctrl);
    el(header, 'span', ' ' + postfix);
    this.customTitle = true;
};
Pane.prototype.setTitle = function(title, cfg, propname, postfix, updateOnlyPostfix) {
    if (this.customTitle) return;
    if (cfg && cfg[propname] && cfg[propname].name) {
        cfg[propname] = cfg[propname].name;
    }
    var header = document.getElementById('title');
    if (!updateOnlyPostfix) {
        clearNodes(header);
        header.appendChild(viewLabel(cfg, title, propname));
        if (postfix != null) el(header, 'span', ' ' + postfix);
    }
    else {
        if (postfix != null) {
            replaceText(header.firstChild.nextSibling, ' ' + postfix);
        }
    }
    if (cfg && cfg[propname]) title = cfg[propname];
    if (postfix) title += ' ' + postfix;
    setDocumentTitle(title);
};
Pane.prototype.setTitleFromObject = function(obj, updateOnlyPostfix) {
    var ni = obj._owner.getFullName(obj);
    this.setTitle(ni.name, ni.cfg, ni.propname, ni.postfix, updateOnlyPostfix);
};
Pane.prototype.createTabs = function(cont) {
    var tabCnt = document.getElementById('tabs');
    clearNodes(tabCnt);
    var tabs = el(tabCnt, 'ul');
    el(tabs, 'li', ' ').className = 'prefix';
    if (isTabless(cont) || !this.top) return;
    var service = cont.service;
    for (var i in service.c) {
        var c = service.c[i];
        if (!isContainerVisible(c) || c.hide) continue;
        if (!container[c.type].tab) continue;
        var cfg = getContainerProp(c);
        if (!skinMode && cfg._hide) continue;
        var li = el(tabs, 'li');
        var a = el(li, 'a');
        a.draggable = 0;
        a.ondragstart = function() {
            return false;
        };
        if (c == cont) a.className = 'active';
        a.href = getPath(c);
        if (skinMode) addClass(a, 'skin');
        var label = viewLabel(cfg, c.title);
        a.appendChild(label);
        if (skinMode) new SkinCntrl(a, cfg, label);
    }
    el(tabs, 'li', ' ').className = 'postfix';
    if (tabs.childNodes.length == 3) {
        clearNodes(tabCnt);
    }
};
Pane.prototype.addButtons = function(cont) {
    if ((!this.top || isTabless(cont)) && !isTablessContainer(cont)) return;
    var service = cont.service;
    var i = 0;
    for (; i < service.c.length; ++i) {
        if (service.c[i] == cont) break;
    }
    for (++i; i < service.c.length; ++i) {
        var c = service.c[i];
        if (!isContainerVisible(c) || c.hide) continue;
        if (this.top && container[c.type].tab) break;
        var cfg = getContainerProp(c);
        if (!skinMode && cfg._hide) continue;
        var b = this.addButton(c.title, cfg, getPath(c));
        if (skinMode) new SkinCntrl(b, cfg, b.firstChild);
    }
};
Pane.prototype.addButton = function(title, cfg, href) {
    return createButton(this.tb.firstChild, title, cfg, href);
};
Pane.prototype.hideToolbar = function() {
    this.tb.style.display = 'none';
};
Pane.prototype.getToolbar = function(b) {
    return this.tb.firstChild;
};

function TablePane(attrs, map, objID) {
    Pane.call(this, attrs, true);
    this.map = map;
    this.objID = objID;
}
TablePane.prototype = inherit(Pane.prototype);
TablePane.prototype.create = function(cnt) {
    if (this.objID != null) {
        var me = this;
        this.lstn = function(obj) {
            if (obj.ufe0001 == me.objID) reopen();
        };
        this.map.listen(this.lstn);
    }
    if (isTabless(this.attrs)) {
        this.addButton('Close', null, getPath(this.attrs.service));
        this.addButton();
    }
    if (this.attrs.service.owner) {
        var owner = this.attrs.service.owner;
        this.addButton('Close', null, getPath(findContainer(normalize(owner.group), normalize(owner.title))));
        this.addButton();
    }
    this.setTitle(this.attrs.service.title, getSysProps(this.attrs), 'title');
    if (!this.attrs.ro && !shouldHide(getSysProp(this.attrs, 'set')) && !shouldHide(getSysProp(this.attrs, 'remove'))) {
        var map = this.map;

        function getSubtypes() {
            var subtypes = map.getSubtypes();
            if (subtypes == null) return null;
            for (var i in subtypes) {
                var t = map.getSubtype(map.getType(), normalize(subtypes[i]));
                if (getContainerProp(t)._hide || (!skinMode && getSysProp(t, 'remove')._hide)) {
                    delete subtypes[i];
                }
            }
            return !isempty(subtypes) ? subtypes : null;
        }

        function getSubtypeCfg(i) {
            var t = map.getSubtype(map.getType(), normalize(i));
            return getSysProp(t, 'remove');
        }
        var addCfg = getSysProp(this.attrs, 'add');
        var subtypes = getSubtypes();
        if (subtypes) {
            var b = new MenuButton(this.getToolbar(), 'Add New', addCfg, getSubtypes, skinMode ? getSubtypeCfg : null);
            var me = this;
            b.onclick = function(t) {
                openContent(getPath(me.attrs) + '.new.' + normalize(subtypes[t]));
            };
            this.addbtn = b;
        }
        else if (!this.attrs.nonaddable) {
            var b = this.addButton('Add New', addCfg);
            var me = this;
            b.onclick = function(e) {
                if (!isSkinEvent(e)) {
                    var href = getPath(me.attrs) + '.new';
                    var filter = me.table.getFilterValue();
                    if (filter) href += '.' + filter;
                    openContent(href);
                    return false;
                }
                return true;
            };
        }
    }
    this.table = new Table(cnt, this.map, document.getElementById('statusbar'));
};
TablePane.prototype.addFilterRow = function(root, before) {
    var filterValues = ['contain', 'contain not', 'is', 'is not', 'in', 'not in', '<', '<=', '>', '>='];
    var me = this;
    var node = el(null, 'div');
    var ftrAttr = el(node, 'select');
    var ftrOp = el(node, 'select');
    ftrAttr.onchange = function(e) {
        ftrOp.innerHTML = "";
        var a = me.attrs.columns[ftrAttr.value];
        var ftrConst = ftype(a).filter(a, true);
        for (var i in ftrConst) {
            var op = ftrConst[i];
            var opt = el(ftrOp, 'option');
            opt.text = filterValues[op];
            opt.value = op;
        }
    };
    for (var i in me.attrs.columns) {
        var a = me.attrs.columns[i];
        if (ftype(a).filter && !a.nonpublic) {
            var opt = el(ftrAttr, 'option');
            opt.text = ftype(a).filter(a);
            opt.value = i;
            var idx = binarySearch(ftrAttr.options, opt, function(a, b) {
                return a.text < b.text;
            });
            try {
                var next = idx < ftrAttr.options.length ? ftrAttr.options[idx] : null;
                ftrAttr.add(opt, next);
            }
            catch (e) {
                ftrAttr.add(opt, idx);
            }
        }
    }
    var a = me.attrs.columns[ftrAttr.value];
    var ftrConst = ftype(a).filter(a, true);
    for (var i in ftrConst) {
        var op = ftrConst[i];
        var opt = el(ftrOp, 'option');
        opt.text = filterValues[op];
        opt.value = op;
    }
    var ftrInput = new TextInput(el(node, 'input'));
    ftrInput.onchange = function(value) {
        var ctrl = ftrInput.getElement();
        ctrl.style.color = '';
    };
    var plus = tbtn(node, '+');
    plus.onclick = function() {
        me.addFilterRow(root, node.nextSibling);
    };
    var minus = tbtn(node, '-');
    minus.onclick = function() {
        me.removeFilterRow(root, node);
    };
    if (before) root.insertBefore(node, before);
    else root.appendChild(node);
};
TablePane.prototype.removeFilterRow = function(root, node) {
    if (root.childNodes.length > 1)
        root.removeChild(node);
};
TablePane.prototype.close = function() {
    this.table.destroy();
    if (this.addbtn) this.addbtn.destroy();
    if (this.lstn) this.map.unlisten(this.lstn);
};

function ItemPane(obj, href) {
    Pane.call(this, obj._type);
    this.obj = obj;
    this.href = href;
}
ItemPane.prototype = inherit(Pane.prototype);
ItemPane.prototype.create = function(cnt) {
    this.setTitleFromObject(this.obj);
    this.nameType = this.obj._owner.getNameType(this.obj);
    if (this.nameType) {
        var me = this;
        this.nameLstn = function() {
            me.setTitleFromObject(me.obj, true);
        };
        ftype(this.nameType).listen(this.nameType, this.nameLstn);
    }
    var me = this;
    var type = this.obj._type;
    var needsSep = false;
    var setCfg = getSysProp(type, 'set');
    var removeCfg = getSysProp(type, 'remove');
    var ok;
    var appley;
    if (!isTablessContainer(type)) {
        if (hasApply(this.obj) && !shouldHide(setCfg)) {
            ok = this.addButton('OK', setCfg);
            if (this.obj._empty) addClass(ok, 'disabled');
            ok.onclick = function(e) {
                if (isSkinEvent(e)) return true;
                if (me.obj._empty) return true;
                if (isROObj(me.obj)) {
                    openContent(me.href);
                    return;
                }
                if (me.ctrl.save()) {
                    me.obj._owner.unlisten(me.lstn);
                    me.lstn = null;
                    me.obj._owner.setObject(me.obj, function(ok) {
                        if (ok && !me.dead) openContent(me.href);
                    });
                }
            };
            if (skinMode) {
                new SkinCntrl(ok, setCfg, ok.firstChild);
            }
            this.addButton('Cancel', getSysProp(type, 'cancel'), this.href);
        }
        else {
            this.addButton('Close', getSysProp(type, 'cancel'), this.href);
        }
        needsSep = true;
    }
    if (hasApply(this.obj) && !shouldHide(setCfg)) {
        apply = this.addButton('Apply', getSysProp(type, 'apply'));
        if (this.obj._empty) addClass(apply, 'disabled');
        apply.onclick = function(e) {
            if (isSkinEvent(e)) return true;
            if (me.obj._empty) return true;
            if (me.ctrl.save()) {
                me.obj._owner.setObject(me.obj);
                me.ctrl.load();
            }
        };
        needsSep = true;
    }
    if (needsSep) this.addButton();
    this.newObj = this.obj.ufe0001 == null && type.type == 'map';
    if (!this.newObj && type.type == 'map' && ((!type.nonaddable && !type.ro) || type.removable) && !shouldHide(removeCfg)) {
        this.remove = this.addButton('Remove', removeCfg);
        this.remove.onclick = function(e) {
            if (isSkinEvent(e)) return true;
            me.obj._owner.removeObject(me.obj);
            openContent(me.href);
        };
        if (skinMode) {
            new SkinCntrl(this.remove, removeCfg, this.remove.firstChild);
        }
        this.addButton();
    }
    this.ctrl = new ViewController(getContainerProp(type));
    this.ctrl.addAllViews(this.obj);
    this.ctrl.create(tableList(cnt));
    this.lstn = function(obj) {
        if (me.obj.ufe0001 == obj.ufe0001) {
            if (ok) removeClass(ok, 'disabled');
            if (apply) removeClass(apply, 'disabled');
            if (obj.ufe0013 == 1) {
                reopen();
            }
            else {
                if (me.newObj) {
                    openContent(me.obj._owner.getPath(me.obj), true);
                }
                else {
                    me.setTitleFromObject(me.obj);
                }
            }
        }
    };
    this.obj._owner.listen(this.lstn);
};
ItemPane.prototype.close = function() {
    this.ctrl.destroy();
    if (this.nameType) {
        ftype(this.nameType).unlisten(this.nameType, this.nameLstn);
    }
    if (this.lstn) this.obj._owner.unlisten(this.lstn);
    this.dead = true;
};

function ActionPane(attrs, prev) {
    Pane.call(this, attrs);
    this.action = getContainer(attrs);
    this.href = prev;
}
ActionPane.prototype = inherit(Pane.prototype);
ActionPane.prototype.create = function(cnt) {
    var me = this;
    this.setTitleFromObject(this.action.getObject());
    var start = this.addButton('Start', getSysProp(this.attrs, 'start'));
    start.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        if (me.ctrl.save()) {
            me.ctrl.load();
            me.action.start();
        }
    };
    var stop = this.addButton('Stop', getSysProp(this.attrs, 'stop'));
    var stopping = false;
    stop.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        stopping = true;
        me.action.stop();
    };
    this.addButton('Close', getSysProp(this.attrs, 'cancel'), this.href);
    this.addButton();
    var table = tableList(cnt);
    this.ctrl = new ViewController(getContainerProp(this.attrs));
    this.ctrl.addAllViews(this.action.getRequest());
    this.ctrl.addAllViews(this.action.getReply());
    this.ctrl.create(table);
    this.lstn = function(obj) {
        if (me.running != me.action.isRunning()) {
            me.running = !me.running;
            me.setTitleFromObject(me.action.getObject(), true);
            if (!me.running && stopping) {
                stopping = false;
                var sb = document.getElementById('statusbar');
                if (sb) {
                    replaceText(sb.firstChild.firstChild.firstChild.firstChild, 'stopped');
                }
            }
        }
    };
    this.action.listen(this.lstn, true);
};
ActionPane.prototype.close = function() {
    this.ctrl.destroy();
    this.action.unlisten(this.lstn, true);
};

function QueryPane(attrs, prev) {
    Pane.call(this, attrs);
    this.query = getContainer(attrs);
    this.href = prev;
}
QueryPane.prototype = inherit(Pane.prototype);
QueryPane.prototype.create = function(cnt) {
    var me = this;
    this.setTitleFromObject(this.query.getObject());
    var singleFetch = this.attrs.startcmd == 0xffffffff && this.attrs.autorefresh == null;
    var start = this.addButton(singleFetch ? 'Get' : 'Start', getSysProp(this.attrs, 'start'));
    start.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        if (me.ctrl.save()) {
            me.ctrl.load();
            me.query.start();
        }
    };
    if (!singleFetch) {
        var stop = this.addButton('Stop', getSysProp(this.attrs, 'stop'));
        stop.onclick = function(e) {
            if (isSkinEvent(e)) return true;
            me.query.stop();
        };
    }
    this.addButton('Close', getSysProp(this.attrs, 'cancel'), this.href);
    this.addButton();
    var table = tableList(cnt);
    var status = this.query.getStatus();
    this.ctrl = new ViewController(getContainerProp(this.attrs));
    this.ctrl.addAllViews(this.query.getRequest());
    if (status) this.ctrl.addAllViews(status);
    this.ctrl.create(table);
    var sep = el(el(el(table, 'tbody'), 'tr'), 'td');
    sep.colSpan = 20;
    sep.className = 'sep';
    el(sep, 'br');
    var map = this.query.getMap();
    this.table = new Table(cnt, map);
    this.lstn = function(obj) {
        if (me.running != me.query.isRunning()) {
            me.running = !me.running;
            me.setTitleFromObject(me.query.getObject(), true);
        }
    };
    this.query.listen(this.lstn);
};
QueryPane.prototype.close = function() {
    this.ctrl.destroy();
    this.table.destroy();
    this.query.unlisten(this.lstn);
};

function DoitPane(attrs, doit, href) {
    Pane.call(this, attrs);
    this.doit = doit ? doit : getContainer(attrs);
    this.href = href;
}
DoitPane.prototype = inherit(Pane.prototype);
DoitPane.prototype.create = function(cnt) {
    this.setTitleFromObject(this.doit.getObject());
    var ok = this.addButton(this.doit.getName(), getSysProp(this.attrs, 'start'));
    var me = this;
    ok.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        if (me.ctrl.save()) {
            me.ctrl.load();
            if (me.attrs.confirm && !confirm(me.attrs.confirm)) return;
            if (me.attrs.progress) me.status.innerHTML = me.attrs.progress;
            me.doit.doit(function(ok) {
                if (ok && !me.dead) openContent(me.href);
            });
        }
    };
    this.addButton('Cancel', getSysProp(this.attrs, 'cancel'), this.href);
    this.addButton();
    var table = tableList(cnt);
    this.ctrl = new ViewController(getContainerProp(this.attrs));
    this.ctrl.addAllViews(this.doit.getObject());
    this.ctrl.create(table);
    if (this.attrs.progress) {
        var sb = document.getElementById('statusbar');
        this.status = el(sb.firstChild.firstChild, 'td', ' ');
        this.status.style.minWidth = '100px';
    }
};
DoitPane.prototype.close = function() {
    this.dead = true;
    this.ctrl.destroy();
};

function SetupPane(attrs, href) {
    Pane.call(this, attrs);
    this.setup = getContainer(attrs);
    this.href = href;
}
SetupPane.prototype = inherit(Pane.prototype);
SetupPane.prototype.create = function(cnt) {
    this.setTitleFromObject(this.setup.getObject());
    this.setup.reset();
    var me = this;
    var back = this.addButton('Back', getSysProp(this.attrs, 'back'));
    back.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        me.setup.back();
    };
    var next = this.addButton('Next', getSysProp(this.attrs, 'next'));
    next.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        if (me.ctrl.save()) {
            me.setup.next(!me.ctrl.isChanged());
        }
    };
    this.addButton('Cancel', getSysProp(this.attrs, 'cancel'), this.href);
    var table = tableList(cnt);
    var sb = document.getElementById('statusbar');
    var status = el(sb.firstChild.firstChild, 'td', ' ');
    this.ctrl = new SetupController(getContainerProp(this.attrs));
    this.ctrl.addAllViews(this.setup.getObject());
    this.ctrl.createPanes();
    this.ctrl.create(table);
    this.lstn = function() {
        if (me.setup.isFinished()) {
            openContent(me.href);
            return;
        }
        me.ctrl.load(me.setup.getObject());
        me.ctrl.show(me.setup.getCurrentPage() - 1);
        replaceText(status, me.setup.getCurrentDescription() || ' ');
    };
    this.setup.listen(this.lstn);
};
SetupPane.prototype.close = function() {
    this.ctrl.destroy();
    this.setup.unlisten(this.lstn);
};

function Termopen(attrs) {
    this.obj = {};
    this.obj._type = attrs;
}
Termopen.prototype.getObject = function() {
    return this.obj;
};
Termopen.prototype.getPath = function() {
    return null;
};
Termopen.prototype.doit = function() {
    var x = window.screenX + document.getElementById('menu').clientWidth;
    var y = window.screenY;
    var w = window.open('terminal.html' + this.getParams(), 'Terminal', 'width=250, height=250, left =' + x + ', top =' + y + ', toolbar=yes, scrollbars=yes');
    if (w) w.focus();
};
Termopen.prototype.autostart = function(obj) {
    this.doit();
    return true;
};
Termopen.prototype.getParams = function() {
    var req = {};
    req.u8 = this.obj.u1 || 0;
    if (this.obj.u2 != null) {
        req.s9 = ipaddr2string(this.obj.u2);
    }
    else if (this.obj.a3 != null) {
        req.s9 = types.ip6addr.tostr({
            ifaceid: 'u4'
        }, [this.obj.a3, this.obj.u4]);
    }
    else if (this.obj.u7 != null) {
        req.s9 = this.obj.u7.toString();
    }
    else if (this.obj.r5 != null) {
        req.s9 = types.macaddr.tostr({}, this.obj.r5);
    }
    if (this.obj.s6 != null) req.sa = this.obj.s6;
    var str = '?';
    for (var i in req) {
        if (str.length > 1) str += '&';
        str += i + '=';
        str += req[i];
    }
    return str;
}
Termopen.prototype.listen = function(cb) {};
Termopen.prototype.unlisten = function(cb) {};

function TermopenPane(attrs, href) {
    Pane.call(this, attrs);
    this.term = getContainer(attrs);
    this.href = href;
}
TermopenPane.prototype = inherit(Pane.prototype);
TermopenPane.prototype.create = function(cnt) {
    this.setTitle('Telnet');
    var tb = this.getToolbar();
    var telnet = this.addButton('Telnet', getSysProp(this.attrs, 'telnet'));
    var me = this;
    telnet.onclick = function(e) {
        if (isSkinEvent(e)) return true;
        if (me.ctrl.save()) {
            me.term.doit();
            openContent(me.href);
        }
        return false;
    };
    var table = tableList(cnt);
    this.ctrl = new ViewController(getContainerProp(this.attrs));
    this.ctrl.addAllViews(this.term.getObject());
    this.ctrl.create(table);
};
TermopenPane.prototype.close = function() {
    this.ctrl.destroy();
};

function lookupContainer(path) {
    if (!path[0]) return null;
    for (var i in sysmap) {
        var off = 0;
        if (sysmap[i].group) {
            if (sysmap[i].group != path[0] || !path[1] || sysmap[i].name != path[1]) continue;
            off = 2;
        }
        else {
            if (sysmap[i].name != path[0]) continue;
            off = 1;
        }
        var service = sysmap[i];
        if (!isServiceVisible(service)) continue;
        for (var i in service.c) {
            if (path[off] == service.c[i].title) {
                var cont = service.c[i];
                if (cont.pred && !isTrue(cont.pred)) continue;
                path.splice(0, off + 1);
                return cont;
            }
        }
    }
    return null;
}

function StatusPane(attrs) {
    this.attrs = attrs;
}
StatusPane.prototype = inherit(Pane.prototype);
StatusPane.prototype.create = function(cnt) {
    function findAttr(type, name, owner) {
        for (var i in type.c) {
            var a = ftype(type.c[i]).lookup(type.c[i], owner, name);
            if (a != null) return a;
        }
        return null;
    }
    var cfg = getContainerProp(this.attrs);
    this.setTitle('Status', getSysProp(this.attrs), 'title');
    var table = tableList(cnt);
    var ctrl = new ViewController(cfg, true);
    for (var i in cfg) {
        var v = cfg[i];
        if (typeof(v) != 'object') continue;
        if (v._hide) continue;
        if (!v.alias) continue;
        var path = v.alias.split(':');
        var type = lookupContainer(path);
        if (!type || !path[0]) continue;
        var cont = getContainer(type);
        var obj;
        if (path[0].charAt(0) == '*') {
            obj = cont.acquireObject(path[0].substr(1));
            path.shift();
        }
        else {
            obj = cont.getObject();
        }
        var owner = null;
        if (path[1]) owner = path.shift();
        var attrs = findAttr(type, path[0], owner);
        if (!attrs) continue;
        var view = ftype(attrs).view(attrs, true);
        ctrl.listenOn(obj);
        ctrl.addView(obj, null, null, view, attrs, v, true);
    }
    ctrl.createGrid(cfg);
    ctrl.create(table);
}

function normalize(str) {
    return str.replace(/[\s\.]/g, '_');
}

function getPath(type) {
    if (type.owner) type = type.owner;
    var s = '';
    var service = type.service ? type.service : type;
    if (service.group) s = service.group + ':';
    s += service.nname;
    if (type.service) s += '.' + type.ntitle;
    return '#' + s;
}

function getTopPath(cont, prev) {
    if (prev) return prev;
    var last = null;
    var service = cont.service;
    for (var i in service.c) {
        var c = service.c[i];
        if (isContainerVisible(c) && container[c.type].tab) last = c;
        if (cont == c) break;
    }
    return last ? getPath(last) : getPath(sysmap[0]);
}

function findDoit(cont, types, name, prev) {
    for (var i in types) {
        var attr = types[i];
        if (attr.type != 'doit' || !attr.c) continue;
        if (normalize(attr.name) == name) {
            var obj = getContainer(cont).getObject();
            attr.title = attr.name;
            attr.path = cont.path;
            attr.container = cont;
            var doit = getContainer(attr);
            if (obj) doit.setID(obj.ufe0001);
            return new DoitPane(attr, doit, prev);
        }
    }
    return null;
}

function findContainer(group, serviceName, name) {
    var firstService = 0;
    while (true) {
        var service = sysmap[firstService];
        var foundService = false;
        for (var i = firstService; i < sysmap.length; ++i) {
            if (!isServiceVisible(sysmap[i])) continue;
            if (shouldHide(getServiceProp(sysmap[i]))) continue;
            if (group && sysmap[i].group != group) continue;
            if (sysmap[i].nname == serviceName) {
                service = sysmap[i];
                foundService = true;
                break;
            }
        }
        var hide = !isServiceVisible(service);
        if (!hide) hide = shouldHide(getServiceProp(service));
        if (!hide && service.group) hide = shouldHide(getProp(skin, service.group));
        if (!hide) {
            var master = null;
            var cont = null;
            for (var i in service.c) {
                var c = service.c[i];
                if (!isContainerVisible(c)) continue;
                if (shouldHide(getContainerProp(c))) {
                    if (!cont && !master && container[c.type].tab) master = c;
                    continue;
                }
                if (foundService && name && c.ntitle == name) {
                    cont = c;
                    break;
                }
                if (!cont) {
                    cont = c;
                }
                else if (cont.hide && !c.hide) {
                    cont = c;
                }
                else if (master) {
                    if (container[c.type].tab && !container[cont.type].tab) cont = c;
                }
            }
            if (cont != null) return cont;
        }
        if (foundService) {
            serviceName = {};
        }
        else {
            ++firstService;
        }
    }
}

function queryString() {
    var res = [];
    var query = location.search;
    var params = query.split('&');
    for (var i = 0; i < params.length; ++i) {
        var pos = params[i].indexOf('=');
        if (pos > 0) {
            var val = params[i].substring(pos + 1);
            res.push(val);
        }
    }
    return res;
}
var safeModeID = null;

function toggleSafeMode(safeMode) {
    if (safeModeID == 0xffffffff) return;
    if (safeModeID != null) {
        post({
            Uff0001: [17],
            uff0007: 0x80005,
            ufe0001: safeModeID
        });
        safeModeID = null;
        toggleClass(safeMode.firstChild, 'active');
    }
    else {
        safeModeID = 0xffffffff;
        post({
            Uff0001: [17],
            uff0007: 0x80003
        }, function(rep) {
            if (isError(rep)) {
                safeModeID = null;
                showError('Could not enable safe mode', rep);
                return;
            }
            safeModeID = rep.ufe0001;
            toggleClass(safeMode.firstChild, 'active');
        });
    }
}
var container = {};
container.map = {};
container.map.tab = true;
container.map.create = function(cont) {
    return new ObjectMap(cont);
};
container.map.createPane = function(cont, path, prev) {
    var map = getContainer(cont);
    if (cont.inherit) map = new FilteredMap(map, cont);
    if (path.length >= 1) {
        var obj;
        if (path[0] == 'new') {
            obj = map.newObject(path[1]);
        }
        else {
            obj = map.getObject(path[0]);
        }
        if (obj) {
            return new ItemPane(obj, getTopPath(cont, prev));
        }
        else {
            var p = findDoit(cont, cont.c, path[0], getTopPath(cont, prev));
            if (p) return p;
        }
    }
    return new TablePane(cont, map, path[0]);
};
container.item = {};
container.item.create = function(cont) {
    return new ObjectHolder(cont);
};
container.item.createPane = function(cont, path, prev) {
    if (path[0]) {
        var p = findDoit(cont, cont.c, path[0], getTopPath(cont, prev));
        if (p) return p;
    }
    var holder = getContainer(cont);
    return new ItemPane(holder.getObject(), getTopPath(cont, prev));
};
container.action = {};
container.action.create = function(cont) {
    return new ObjectAction(cont);
};
container.action.createPane = function(cont, path, prev) {
    if (path[0]) {
        var p = findDoit(cont, cont.request, path[0], getTopPath(cont, prev));
        if (!p) p = findDoit(cont, cont.reply, path[0], getTopPath(cont, prev));
        if (p) return p;
    }
    return new ActionPane(cont, getTopPath(cont, prev));
};
container.query = {};
container.query.create = function(cont) {
    return new ObjectQuery(cont);
};
container.query.createPane = function(cont, path, prev) {
    if (path[0]) {
        var obj = getContainer(cont).getObject(path[0]);
        if (obj) return new ItemPane(obj, getTopPath(cont, prev));
    }
    return new QueryPane(cont, getTopPath(cont, prev));
};
container.doit = {};
container.doit.create = function(cont) {
    return new Doit(cont);
};
container.doit.createPane = function(cont, path, prev) {
    if (cont.c == null) {
        if (!cont.confirm || confirm(cont.confirm)) {
            var doit = new Doit(cont);
            doit.doit();
        }
        return openContent(getTopPath(cont, prev));
    }
    return new DoitPane(cont, null, getTopPath(cont, prev));
};
container.setup = {};
container.setup.create = function(cont) {
    return new SetupManager(cont);
};
container.setup.createPane = function(cont, path, prev) {
    return new SetupPane(cont, getTopPath(cont, prev));
};
container.termopen = {};
container.termopen.create = function(cont) {
    return new Termopen(cont);
};
container.termopen.createPane = function(cont, path, prev) {
    return new TermopenPane(cont, getTopPath(cont, prev));
};
container.alias = {};
container.alias.createPane = function(attrs) {
    var cont = findContainer(attrs.group, normalize(attrs.open), normalize(attrs.tab));
    if (!cont) return null;
    var c = getContainer(cont);
    var dst = c.getObject();
    convert(attrs.link, {}, dst);
    c.autostart(dst);
    return null;
};
container.status = {};
container.status.createPane = function(attrs) {
    return new StatusPane(attrs);
};

function updateContent(url) {
    var path = url.substr(1).split('.');
    var a = path[0].split(':');
    var group = a.length == 1 ? null : a[0];
    var sname = a.length == 1 ? a[0] : a[1];
    var cont = findContainer(group, sname, path[1]);
    if (!cont) return false;
    if (path.length >= 2 && (sname != cont.service.nname || path[1] != cont.ntitle)) {
        path = [];
    }
    var cnt = container[cont.type].createPane(cont, path.slice(2), prevURLs[prevURLs.length - 1]);
    if (!cnt) return false;
    var old = current;
    current = cnt;
    window.scrollTo(0, 0);
    clearNodes(document.getElementById('content'));
    current.open(cont);
    highlightMenuItem(cont);
    try {
        if (old) old.close();
    }
    catch (e) {
        this;
    }
    return true;
}

function reopen() {
    if (!updateContent(currentURL)) {
        openContent('', true);
    }
}

function generateContent(url, replace) {
    if (!sysmap) return;
    if (currentURL == url) return;
    if (!replace) {
        if (prevURLs[prevURLs.length - 1] != url) {
            prevURLs.push(currentURL);
            if (prevURLs.length > 100) prevURLs.splice(0, 1);
        }
        else {
            prevURLs.pop();
        }
    }
    var oldURL = currentURL;
    currentURL = url;
    if (!updateContent(url)) {
        currentURL = oldURL;
        if (current != null) {
            location.hash = currentURL;
        }
        else if (url != '') {
            updateContent('');
            currentURL = '';
            location.hash = '';
        }
    }
}

function openContent(url, replace) {
    location.hash = url;
    generateContent(url, replace);
}

function onFileOpen(hash) {
    var doc = document.getElementById("iframe").contentWindow.document;
    if (window.XMLHttpRequest) {
        doc.open("text/html", "replace");
    }
    else {
        doc.open("javascript:'<html></html>'");
    }
    doc.write("<body onload=\"parent.generateContent('" + hash + "');\">");
    doc.close();
}

function createSkinToolbar(menu) {
    function getValue(sel) {
        var opt = sel.options[sel.selectedIndex];
        return opt ? opt.text : '';
    }
    var skinTB = document.getElementById('skintb');
    if (skinTB) return skinTB;
    skinTB = elc(document.getElementById('top'), 'ul', 'toolbar');
    skinTB.id = 'skintb';
    skinTB.style.display = 'none';
    var li = elc(skinTB, 'li', 'custom');
    txt(li, 'Skin: ');
    var active = el(elc(li, 'span', 'select'), 'select');
    active.size = 1;
    fillOptions(active, {
        type: 'dynamic',
        path: [13, 8]
    }, true, null, null, null, function(id, idx) {
        if (id == 0) active.selectedIndex = idx;
    });
    createButton(skinTB);
    li = elc(skinTB, 'li', 'custom');
    txt(li, 'Name: ');
    var name = input(null);
    name.value = 'default';
    li.appendChild(name);
    var save = createButton(skinTB, 'Save');
    save.onclick = function() {
        var n = name.value;
        if (n == '') n = getValue(active);
        n = n.replace('/\//g/', '');
        if (n == '' || n == null) n = 'default';
        name.value = n;
        saveSkin(n);
    };
    var revert = createButton(skinTB, 'Revert');
    revert.onclick = function() {
        var n = getValue(active);
        name.value = n;
        loadSkin(n);
    };
    createButton(skinTB);
    var empty = createButton(skinTB, 'Reset');
    empty.onclick = function() {
        skin = {};
        reopen();
    };
    active.onchange = function() {
        if (skinMode) {
            var n = getValue(active);
            name.value = n;
            loadSkin(n);
        }
    };
    return skinTB;
}

function openGroup(group) {
    var item = document.getElementById(group);
    var list = document.getElementById(group + 'list');
    if (item.className == 'activegroup') {
        item.className = 'group';
        list.className = 'group';
    }
    else {
        item.className = 'activegroup';
        list.className = 'activegroup';
    }
}
var lastItem;

function highlightMenuItem(cont) {
    if (lastItem) removeClass(lastItem, 'opened');
    var id = 'id_' + getPath(cont).substr(1).split('.')[0];
    var item = document.getElementById(id);
    if (item) addClass(item, 'opened');
    lastItem = item;
}

function generateGroupLists(data, list, groups) {
    for (var i in data) {
        var s = data[i];
        if (!s.name || !isServiceVisible(s) || s.nonpublic) continue;
        if (s.group) {
            if (!groups[s.group]) {
                groups[s.group] = [];
                list.push({
                    name: s.group,
                    prio: s.prio,
                    group: true
                });
            }
            if (s.groupIcon) {
                for (var g in list) {
                    if (list[g].group && list[g].name == s.group) {
                        list[g].icon = s.groupIcon;
                        break;
                    }
                }
            }
            groups[s.group].push(s);
        }
        else {
            s.order = i;
            list.push(s);
        }
    }
    for (var i in groups) {
        var g = groups[i];
        g.sort(function(a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    }
    list.sort(function(a, b) {
        if (a.prio == null) {
            if (b.prio != null) {
                if (b.prio < 500) return 1;
                if (b.prio > 500) return -1;
            }
        }
        else if (b.prio == null) {
            if (a.prio != null) {
                if (a.prio < 500) return -1;
                if (a.prio > 500) return 1;
            }
        }
        else {
            if (a.prio < b.prio) return -1;
            if (a.prio > b.prio) return 1;
        }
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
    });
}

function createMenuItem(menu, name, cfg, href, iconnr) {
    var li = el(null, 'li');
    var item = el(li, 'a');
    item.draggable = 0;
    item.ondragstart = function() {
        return false;
    };
    item.id = 'id_' + href.substr(1).split('.')[0];
    item.href = href;
    if (iconnr && !skinMode) createIcon(item, iconnr);
    var label = viewLabel(cfg, name);
    item.appendChild(label);
    if (skinMode) {
        new SkinCntrl(item, cfg, label);
    }
    else {
        if (cfg._hide) li.style.display = 'none';
    }
    menu.appendChild(li);
    return li;
}

function generateMenu() {
    var list = [];
    var groups = {};
    generateGroupLists(sysmap, list, groups);
    var menu = document.getElementById('menu');
    clearNodes(menu);
    for (var i in list) {
        if (list[i].group) {
            var name = list[i].name;
            var cfg = getProp(skin, name);
            var item = createMenuItem(menu, name, cfg, 'javascript:openGroup("' + name + '")', list[i].icon);
            if (!item) continue;
            item.id = name;
            item.className = 'group';
            var submenu = el(menu, 'ul');
            submenu.id = name + 'list';
            submenu.className = 'group';
            var g = groups[name];
            for (var j in g) {
                createMenuItem(submenu, g[j].name, getProp(cfg, g[j].name), getPath(g[j]));
            }
            continue;
        }
        createMenuItem(menu, list[i].name, getProp(skin, list[i].name), getPath(list[i]), list[i].icon);
    }
    elc(menu, 'li', 'sep');
    var undo = createMenuItem(menu, 'Undo', getProp(skin, 'Undo'), '#Undo', 27);
    undo.firstChild.onclick = function() {
        post({
            Uff0001: [17],
            Uff0002: [1],
            uff0007: 0x80001
        });
        return false;
    };
    var redo = createMenuItem(menu, 'Redo', getProp(skin, 'Redo'), '#Redo', 21);
    redo.firstChild.onclick = function() {
        post({
            Uff0001: [17],
            Uff0002: [1],
            uff0007: 0x80002
        });
        return false;
    };
    elc(menu, 'li', 'sep');
    var showMenu = document.getElementById('showmenu');
    if (!showMenu) {
        var tb = elc(document.getElementById('top'), 'ul', 'toolbar');
        showMenu = createButton(tb, 'Show Menu');
        showMenu.parentNode.style.display = 'none';
        showMenu.onclick = function() {
            hideMenu.parentNode.style.display = 'list-item';
            showMenu.parentNode.style.display = 'none';
            document.getElementById('menu').style.display = 'block';
        };
        elc(tb, 'li', 'ending');
    }
    var hideMenu = createMenuItem(menu, 'Hide Menu', getProp(skin, 'Hide Menu'), '#HideMenu', 4);
    hideMenu.firstChild.onclick = function() {
        showMenu.parentNode.style.display = 'list-item';
        document.getElementById('menu').style.display = 'none';
    };
    if (sysres.policy & (1 << 14)) {
        var prefs = getPrefs();
        hidePasswords = prefs.b1 != null ? prefs.b1 : 1;
        var hide = createMenuItem(menu, 'Hide Passwords', getProp(skin, 'Hide Passwords'), '#HidePwd', 32);
        hide.firstChild.onclick = function() {
            hidePasswords = !hidePasswords;
            toggleClass(hide.firstChild, 'active');
            prefs.b1 = hidePasswords ? 1 : 0;
            setPrefs(prefs);
            hidePasswordsLstn.notify();
            return false;
        };
        if (hidePasswords) addClass(hide.firstChild, 'active');
    }
    else {
        hidePasswords = 1;
    }
    var safeMode = createMenuItem(menu, 'Safe Mode', getProp(skin, 'Safe Mode'), '#Safemode', 23);
    safeMode.firstChild.onclick = function() {
        toggleSafeMode(safeMode);
        return false;
    };
    if (safeModeID != null) addClass(safeMode.firstChild, 'active');
    if ((sysres.policy & (1 << 8)) && (sysres.policy & (1 << 14))) {
        var skinTB = createSkinToolbar(menu);
        var mode = el(el(menu, 'li'), 'a');
        mode.draggable = 0;
        mode.ondragstart = function() {
            return false;
        };
        elc(mode, 'div', 'icon').style.backgroundPosition = (31 * -16) + 'px 0px';
        el(mode, 'span', 'Design Skin');
        mode.onclick = function() {
            var firstTime = skinMode == null;
            skinMode = !skinMode;
            skinTB.style.display = skinMode ? 'block' : 'none';
            if (firstTime) {
                loadSkin('default');
            }
            else {
                generateMenu();
                reopen();
            }
            return true;
        };
        if (skinMode) addClass(mode, 'active');
    }
    elc(menu, 'li', 'sep');
    var url = sysres.manualURL;
    if (url != 'disabled') {
        if (url == '') url = 'http://wiki.mikrotik.com/wiki/Manual:TOC';
        var item = createMenuItem(menu, 'Manual', getProp(skin, 'Manual'), url, 12);
        item.lastChild.target = 'manual';
    }
    var winboxURL = 'http://www.mikrotik.com/download/winbox.exe';
    var winbox = createMenuItem(menu, 'WinBox', getProp(skin, 'WinBox'), winboxURL, 28);
    winbox.lastChild.target = 'winbox';
    var graphs = createMenuItem(menu, 'Graphs', getProp(skin, 'Graphs'), '/graphs', 3);
    graphs.lastChild.target = 'graphs';
    var lic = createMenuItem(menu, 'End-User License', getProp(skin, 'License'), '/help/license.html', 8);
    lic.lastChild.target = 'license';
    elc(menu, 'li', 'sep');
    var logout = createMenuItem(menu, 'Logout', getProp(skin, 'Logout'), '#Logout', 10);
    logout.firstChild.onclick = function() {
        post({
            uff0007: 0xfe0014
        }, function(rep) {
            window.name = 'noautologin=1';
            if (!autonomous) {
                window.location.replace('/' + window.location.hash);
            }
            else {
                window.location.reload();
            }
        });
        return false;
    };
}

function sortSlots(slots, owner) {
    var curTab = null;
    var cur = {
        slots: []
    };
    var tabs = [cur];
    var findTab = function(name) {
        for (var i in tabs) {
            if (tabs[i].tab && tabs[i].tab.name == name) return tabs[i];
        }
        return null;
    };
    for (var i in slots) {
        var s = slots[i];
        if (s.type == 'tab') {
            cur = {
                tab: s,
                slots: []
            };
            if (s.combine) {
                var t = findTab(s.name);
                if (t) {
                    cur = t;
                    continue;
                }
            }
            tabs.push(cur);
            continue;
        }
        if (s.type == 'gridcell') {
            cur = {
                tab: s,
                slots: [s]
            };
            tabs.push(cur);
            continue;
        }
        if (s.type == 'object') {
            var c = s.c;
            if (cur.tab && cur.tab.type == 'tab') c = ([cur.tab]).concat(c);
            s.c = sortSlots(c, owner);
        }
        if (s.type == 'filter') {
            owner.filter = s;
        }
        if (s.type == 'group') {
            if (!s.keys && !s.id && s.c.length == 1) {
                s.type = 'opt';
            }
        }
        if (!s.name) {
            s.name = ftype(s).name;
            s.secondname = ftype(s).secondname;
        }
        if (!ftype(s).outside) {
            if (s.type == 'graphbox') {
                for (var g in s.graphs) s.graphs[g].owner = cur.tab;
            }
            if (s.type != 'comment') s.owner = cur.tab;
        }
        cur.slots.push(s);
    }
    if (tabs.length == 1) return cur.slots;
    tabs.sort(function(a, b) {
        if (!a.tab) return -1;
        if (!b.tab) return 1;
        if ((a.tab.priority || 0) < (b.tab.priority || 0)) return -1;
        if ((a.tab.priority || 0) > (b.tab.priority || 0)) return 1;
        return 0;
    });
    slots = [];
    for (var i in tabs) {
        if (tabs[i].tab && tabs[i].slots.length == 0) continue;
        slots = slots.concat(tabs[i].slots);
    }
    return slots;
}

function handleOverrides(slots) {
    var find = function(name, limit) {
        for (var i = 0; i < limit; ++i) {
            if (slots[i].name == name) return i;
        }
        return null;
    };
    for (var i = 0; i < slots.length;) {
        if (slots[i].override) {
            var p = find(slots[i].name, i);
            if (p) {
                if (!slots[i].on && slots[p].on) slots[i].on = slots[p].on;
                slots[p] = slots[i];
                slots.splice(i, 1);
                continue;
            }
        }
        ++i;
    }
}

function splitColumns(cols) {
    var i = 0;
    while (i < cols.length) {
        if (cols[i].type == 'tuple' && cols[i].separate) {
            cols = cols.slice(0, i).concat(cols[i].c, cols.slice(i + 1));
            continue;
        }
        ++i;
    }
    return cols;
}

function generateMetaInfo(data) {
    var status = {
        name: 'Status',
        c: [],
        prio: 20,
        pred: {
            type: 'statuspane'
        }
    };
    status.c.push({
        title: 'Status',
        type: 'status',
        service: service
    });
    var idx = 0;
    while (data[idx].name == 'Quick Set') ++idx;
    data.splice(idx, 0, status);
    for (var i in data) {
        var service = data[i];
        if (service.name) service.nname = normalize(service.name);
        for (var j in service.c) {
            var attrs = service.c[j];
            attrs.service = service;
            if (attrs.title) attrs.ntitle = normalize(attrs.title);
            if (attrs.nameval && !mapAttrs[attrs.path]) {
                mapAttrs[attrs.path] = attrs;
            }
            attrs.columns = attrs.c ? splitColumns(attrs.c) : [];
            if (attrs.generic) {
                generics[attrs.generic] = attrs;
                attrs.subtypes = {};
                attrs.gensubtypes = [];
            }
            if (attrs.inherit) {
                var p = generics[attrs.inherit];
                if (p) {
                    if (attrs.typevalue != 0xffffffff) {
                        p.subtypes[attrs.typevalue] = attrs;
                    }
                    else {
                        p.gensubtypes.push(attrs);
                    }
                    if (p.origc) attrs.c = p.origc.concat(attrs.c || []);
                    else if (p.c) attrs.c = p.c.concat(attrs.c || []);
                    if (p.columns) {
                        attrs.columns = p.columns.concat(attrs.columns);
                    }
                    if (attrs.c) handleOverrides(attrs.c);
                    if (attrs.columns) handleOverrides(attrs.columns);
                    if (!attrs.name) attrs.name = p.name;
                    if (!attrs.nameval) attrs.nameval = p.nameval;
                    if (!attrs.path) attrs.path = p.path;
                    if (!attrs.treeon) attrs.treeon = p.treeon;
                }
                attrs.inherit = p;
            }
            if (attrs.c) {
                attrs.origc = attrs.c;
                attrs.c = sortSlots(attrs.origc, attrs);
            }
            if (attrs.request) attrs.request = sortSlots(attrs.request, attrs);
            if (attrs.typeon) {
                var typeon = getAttr(attrs, attrs.typeon);
                if (typeon) attrs.typeon = typeon;
            }
        }
    }
}

function loadGUM(maps, gums, idx) {
    for (var i in gums) {
        var name = gums[i].name;
        addons[name.slice(0, name.length - 3)] = true;
    }
    request('GET', 'http://demo.mt.lv/webfig/' + gums[idx].unique, null, function(resp) {
        var c = eval('(' + resp + ')');
        maps = maps ? maps.concat(c) : c;
        if (gums.length == idx + 1) {
            sysmap = maps;
            setTimeout(function() {
                if (relogin) {
                    initSession();
                }
                else {
                    autoLogin();
                }
            }, 10);
        }
        else {
            loadGUM(maps, gums, idx + 1);
        }
    });
}

function initWebfig() {
    request('GET', 'http://demo.mt.lv/webfig/list', null, function(resp) {
        var gums = eval('([' + resp + '{}])');
        var ros;
        for (var i = 0; i < gums.length - 1;) {
            if (gums[i].name == 'roteros.jg') {
                ros = gums[i];
                gums.splice(i, 1);
                continue;
            }
            if (gums[i].name.substr(gums[i].name.length - 4) == '.png') {
                gums.splice(i, 1);
                continue;
            }
            ++i;
        }
        gums.splice(0, 0, ros);
        gums.splice(gums.length - 1, 1);
        loadGUM(null, gums, 0);
    });
}

function start() {
    generateMetaInfo(sysmap);
    loadSkin(sysres.skin, function() {
        generateMenu();
        hide('login');
        hide('startup');
        show('page');
        if (window.XMLHttpRequest || window.ActiveXObject) {
            urlCheker = setInterval(function() {
                if (currentURL != location.hash) onFileOpen(location.hash);
            }, 200);
        }
        generateContent(location.hash);
    });
}

function fetchBoardInfo() {
    var req = {
        Uff0001: [24, 2],
        Uff0002: [44],
        uff0007: 0xfe000d
    };
    post(req, function(rep) {
        if (rep) {
            sysres.uptime = rep.u1;
            sysres.uptimediff = sysres.uptime - getNow();
            sysres.version = rep.s16;
            sysres.displayname = rep.s2c || sysres.boardname;
        }
        if (sysres.version) {
            var v = document.getElementById('version');
            replaceText(v, 'v' + sysres.version);
        }
        start();
    });
}

function initSession() {
    ticker = new Ticker();
    post({}, receive);
    for (var i in sysmap) {
        if (sysmap[i].name == 'Identity') {
            var c = getContainer(sysmap[i].c[0]);
            c.listen(function(obj) {
                var attr = getAttr(obj._type, 'Identity');
                sysres.identity = ftype(attr).get(attr, obj);
                setDocumentTitle();
            });
            break;
        }
    }
    post({
        Uff0001: [13, 7],
        uff0007: 0xfe000d,
        s1: sysres.user
    }, function(rep) {
        if (rep.M1) prefs = rep.M1;
        sysres.manualURL = rep.s2 || '';
        fetchBoardInfo();
    });
}

function doAuth(user, pwd, cb, arg) {
    request('POST', '/jsproxy', '', function(r) {
        session = new Session(str2word(r, 0));
        var resp = session.makeResponse(user, pwd, r);
        request('POST', '/jsproxy', resp, function(r) {
            if (!session.decrypt(r, function(rep) {
                    sysres.user = user;
                    sysres.password = pwd;
                    sysres.policy = rep.uff000b;
                    sysres.skin = rep.sfe0009;
                    sysres.arch = rep.s11;
                    sysres.boardname = rep.s15;
                    sysres.board = rep.s17;
                    post({
                        Uff0001: [120],
                        uff0007: 5
                    }, function(rep) {
                        sysres.qscaps = rep.u1 || 0;
                        cb(null, arg);
                    });
                })) {
                cb('Authentication failed: invalid username or password.', arg);
            };
        }, function(err) {
            cb(err, arg);
        });
    });
}

function onLogin(err, autologin) {
    if (err == null) {
        hide('startup');
        var expires = new Date();
        expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
        document.cookie = 'username=' + sysres.user + '; expires=' + expires.toGMTString() + '; path=/';
        if (relogin) {
            initWebfig();
        }
        else {
            initSession();
        }
    }
    else if (!autonomous) {
        if (autologin) {
            window.name = 'noautologin=1';
            window.location.replace('/' + window.location.hash);
        }
        else {
            window.name = 'error=' + err;
            window.location.replace('/' + window.location.hash);
        }
    }
    else {
        hide('startup');
        show('login');
        if (!autologin) {
            replaceText(get('error'), err);
            show('error');
        }
        authenticate();
    }
}

function onSessionError(error) {
    hide('page');
    relogin = true;
    onLogin(error, false);
}

function authenticate() {
    function login() {
        hide('error');
        document.onkeydown = null;
        var user = get('name').value;
        var password = get('password').value;
        if (relogin) {
            hide('login');
            show('startup');
        }
        doAuth(user, password, onLogin, false);
    }
    get('dologin').onclick = function(e) {
        login();
        return false;
    };
    document.onkeydown = function(e) {
        e = e || event;
        if (e.keyCode == 13) {
            login();
            return false;
        }
        return true;
    };
    var username = null;
    var cookies = document.cookie.split(';');
    for (var i in cookies) {
        var c = trim(cookies[i]).split('=');
        if (c[0] == 'username') {
            username = c[1];
            break;
        }
    }
    if (username != null) {
        get('name').value = username;
        get('password').focus();
    }
    else {
        get('name').focus();
    }
}

function split(str, sep) {
    var i = str.indexOf(sep);
    if (i == -1) return [str];
    return [str.substr(0, i), str.substr(i + 1)];
}

function autoLogin() {
    var info = split(window.name, '=');
    if ((info[0] == 'login' || info[0] == 'autologin') && info[1]) {
        var login = split(info[1], '|');
        doAuth(login[0], login[1], onLogin, info[0] == 'autologin');
    }
    else {
        autonomous = true;
        if (window.name != 'noautologin=1' || true) {
            doAuth('admin', '', onLogin, true);
        }
        else {
            window.name = '';
            hide('startup');
            show('login');
            authenticate();
        }
    }
}
window.onload = initWebfig;