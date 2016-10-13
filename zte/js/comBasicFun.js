var TAB_CODE = 9;
var DEL_CODE = 46;
var BS_CODE = 8;
var SP_CODE = 32;
var DOT_CODE = 190;
var DOT2_CODE = 110;

/*+-----------------------------------------+
  | FileName : Javascript Common Web Check Function |
  | Edtion   : To Trunk R2                  |
  | Author   : TBS Software                 |
  +-----------------------------------------+*/

/*检测是否全部是数字*/
function validateKey(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) == '.'))
            continue;
        return 0;
    }
    return 1;
}

function getDigit(str, num) {
    i = 1;
    if (num != 1) {
        while (i != num && str.length != 0) {
            if (str.charAt(0) == '.') {
                i++;
            }
            str = str.substring(1);
        }
        if (i != num)
            return -1;
    }
    for (i = 0; i < str.length; i++) {
        if (str.charAt(i) == '.') {
            str = str.substring(0, i);
            break;
        }
    }
    if (str.length == 0)
        return -1;
    var d = parseInt(str, 10);
    return d;
}

/*判断地址是否在范围内*/
function checkDigitRange(str, num, min, max) {
    var d = getDigit(str, num);
    if (d > max || d < min)
        return false;
    return true;
}


function checkIpAddr(_value) {
    if (_value == "...") {
        alertError('CheckIpValue1', 1);
        return false;
    }

    if (validateKey(_value) == 0) {
        alertError('CheckIpValue2', 1);
        return false;
    }
    if (!checkDigitRange(_value, 1, 1, 223)) {
        alertError('CheckIpValue3', 1);
        return false;
    }

    if (getDigit(_value, 1) == 127) {
        alertError('CheckIpValue4', 1);
        return false;
    }

    if (!checkDigitRange(_value, 2, 0, 255)) {
        alertError('CheckIpValue5', 1);
        return false;
    }
    if (!checkDigitRange(_value, 3, 0, 255)) {
        alertError('CheckIpValue6', 1);
        return false;
    }
    if (!checkDigitRange(_value, 4, 1, 254)) {
        alertError('CheckIpValue7', 1);
        return false;
    }

    return true;
}


/*检测Mask地址是否合法*/
function checkMask(str, num) {
    var d = getDigit(str, num);
    if (!(d == 0 || d == 128 || d == 192 || d == 224 || d == 240 || d == 248 || d == 252 || d == 254 || d == 255))
        return false;
    return true;
}

function isValidMask2(str) {

    var _value = str.split('.');
    var _numValue = 0;
    var _flag = 0;

    for (var _i = 0; _i < _value.length; _i++) {
        var _numValue = parseInt(_value[_i], 10);

        for (var _j = 0; _j < 8; _j++) {
            if (parseInt(_numValue & 128, 10) == 128) {
                if (_flag == 1) {
                    return false;
                }
            }
            else if (parseInt(_numValue & 128, 10) != 128) {
                _flag = 1;
            }

            _numValue = _numValue << 1;

        }

    }

    return true;

}


/*判断子网掩码的合法性*/
function isValidMask(_value) {

    if (_value == "...") {
        alertError('CheckMaskValue1', 1);
        return false;
    }


    if (_value == "255.255.255.255") {
        alertError('CheckMaskValue2', 1);
        return false;

    }

    if (_value == "0.0.0.0") {
        alertError('CheckMaskValue3', 1);
        return false;

    }

    if (validateKey(_value) == 0) {

        alertError('CheckMaskValue4', 1);
        return false;
    }

    if (!checkMask(_value, 1)) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    if (!checkMask(_value, 2)) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    if (!checkMask(_value, 3)) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    if (!checkMask(_value, 4)) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    if (!((getDigit(_value, 1) >= getDigit(_value, 2)) &&
            (getDigit(_value, 2) >= getDigit(_value, 3)) &&
            (getDigit(_value, 3) >= getDigit(_value, 4)))) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    if (!isValidMask2(_value)) {
        alertError('CheckMaskValue5', 1);
        return false;
    }

    return true;
}

//for lan.html page checking Ip & Mask is valid value
function checkIp_Mask(lanIp, lanMask) {

    var count = 0;
    var count2 = 0;
    var l1a_n, l1m_n;

    var _lanIp = lanIp.split('.');
    var _lanMask = lanMask.split('.');

    for (i = 0; i < 4; i++) {
        l1a_n = parseInt(_lanIp[i]);
        l1m_n = parseInt(_lanMask[i]);
        if ((l1a_n & l1m_n) == 0)
            count++;
        else if ((l1a_n & l1m_n) == 1)
            count2++;
    }
    if (count == 4) {
        alertError('CheckIp_Mask', 1);
        return false;
    }
    else if (count2 == 4) {
        alertError('CheckIp_Mask', 1);
        return false;
    }
    else
        return true;
}


/*判断网关地址是否合法*/
function checkGatewayAddr(_value) {

    if (_value == "...") {
        alertError('CheckGatewayValue1', 1);
        return false;
    }

    if (validateKey(_value) == 0) {
        alertError('CheckGatewayValue2', 1);
        return false;
    }
    if (!checkDigitRange(_value, 1, 1, 223)) {
        alertError('CheckGatewayValue3', 1);
        return false;
    }
    if (getDigit(_value, 1) == 127) {
        alertError('CheckGatewayValue4', 1);
        return false;

    }

    if (!checkDigitRange(_value, 2, 0, 255)) {
        alertError('CheckGatewayValue5', 1);
        return false;
    }

    if (!checkDigitRange(_value, 3, 0, 255)) {
        alertError('CheckGatewayValue6', 1);
        return false;
    }

    if (!checkDigitRange(_value, 4, 1, 254)) {
        alertError('CheckGatewayValue7', 1);
        return false;
    }
    return true;
}


/*判断DNS地址是否合法*/
function checkPrimaryDNS(_id, _value, _flag) {
    var INPUT_ID = _id;
    var INPUT_value = _value;
    var INPUT_flag = _flag;

    if (INPUT_value == "") {
        if (INPUT_flag != 'Empty') {
            DealWith.Wrong(INPUT_ID, 'DNS address format error:It should not be empty.');
            return false;
        }
        else {
            return true;
        }
    }
    if (validateKey(INPUT_value) == 0) {
        DealWith.Wrong(INPUT_ID, 'It should be a [0-9] number.');
        return false;
    }
    if (!checkDigitRange(INPUT_value, 1, 1, 223)) {
        DealWith.Wrong(INPUT_ID, 'DNS address format error:Please fill the first digit numbers between (1-223).');
        return false;
    }
    if (getDigit(INPUT_value, 1) == 127) {
        DealWith.Wrong(INPUT_ID, 'DNS address format error:The first digit numbers can\'t be 127 .');
        return false;
    }
    if (!checkDigitRange(INPUT_value, 2, 0, 255)) {
        DealWith.Wrong(INPUT_ID, 'DNS address format error:It should be filled with 4 digit numbers as (xxx.xxx.xxx.xxx).');
        return false;
    }
    if (!checkDigitRange(INPUT_value, 3, 0, 255)) {
        DealWith.Wrong(INPUT_ID, 'DNS address format error:It should be filled with 4 digit numbers as (xxx.xxx.xxx.xxx).');
        return false;
    }
    if (!checkDigitRange(INPUT_value, 4, 1, 254)) {
        DealWith.Wrong(INPUT_ID, 'DNS address format error:Please fill the last digit numbers between (1-254).');
        return false;
    }
    return true;
}

function checkSecondaryDNS(_value) {
    if (validateKey(_value) == 0) {
        DealWith.Wrong('INPUT_ServerSec', 'It should be a [0-9] number.');
        return false;
    }
    if (!checkDigitRange(_value, 1, 1, 223)) {
        DealWith.Wrong('INPUT_ServerSec', 'DNS address format error:Please fill the first digit numbers between (1-223).');
        return false;
    }
    if (getDigit(_value, 1) == 127) {
        DealWith.Wrong('INPUT_ServerSec', 'DNS address format error:The first digit numbers can\'t be 127 .');
        return false;
    }
    if (!checkDigitRange(_value, 2, 0, 255)) {
        DealWith.Wrong('INPUT_ServerSec', 'DNS address format error:It should be filled with 4 digit numbers as (xxx.xxx.xxx.xxx).');
        return false;
    }
    if (!checkDigitRange(_value, 3, 0, 255)) {
        DealWith.Wrong('INPUT_ServerSec', 'DNS address format error:It should be filled with 4 digit numbers as (xxx.xxx.xxx.xxx).');
        return false;
    }
    if (!checkDigitRange(_value, 4, 1, 254)) {
        DealWith.Wrong('INPUT_ServerSec', 'DNS address format error:Please fill the last digit numbers between (1-254).');
        return false;
    }
    return true;
}

function checkHex(str) {
    for (var i = 0; i < str.length; i++) {
        if ((str.charAt(i) >= '0' && str.charAt(i) <= '9') ||
            (str.charAt(i) >= 'a' && str.charAt(i) <= 'f') ||
            (str.charAt(i) >= 'A' && str.charAt(i) <= 'F')) {
            continue;
        }
        else {
            return false;
        }
    }
}

function checkSecurityKey(str) {
    if ($('SELECT_Encryptstrength').value == '64bits') {
        if (checkHex(str) == false || str.length != 10) {
            alertError("CheckSecurityKey1");
            return false;
        }
    }
    else if ($('SELECT_Encryptstrength').value == '128bits') {
        if (checkHex(str) == false || str.length != 26) {
            alertError("CheckSecurityKey2");
            return false;
        }
    }

}

function checkWord(s) {

    var patrn = /(\|)|(\\)|(\`)/;
    if (patrn.test(s) == true) {
        alertError('CheckPassphrase');
        return false;
    }
    else {
        return true;
    }

}

function checkBlank(str) {
    if (str.charAt(str.length - 1) == " " || str.charAt(0) == " ") {
        alertError('CheckBlank');
    }
    str = str.replace(/(^\s*)|(\s*$)/g, "");
    return str;
}

function checkPassphrase(str) {


    if (str.length == 64) {
        if (checkHex(str) == false) {
            alertError("CheckSecurityPwd1");
            return false;
        }
    }
    if (str.length < 8) {
        alertError("CheckSecurityPwd2");
        return false;
    }

    if (checkWord(str) == false)
        return false;
    else
        return true;
}

function checkNameBlank(str) {
    var patrn = /^\S{1,100}$/;
    var tmp = str;
    if (str == "") {
        return false;
    }
    else {
        if (!patrn.exec(str)) {
            str = str.replace(/\s/g, "");
        }
        if (tmp == str) {
            return true;
        }
        else {
            return str;
        }
    }
}


function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) {

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
    if (count == 4)
        return true;
    else
        return false;
}


function checkURL(s) {

    var patrn = /^\w+$/;
    var patrn2 = /\./;
    var patrn3 = /\//;

    for (var i = 0; i < s.length; i++) {
        if (!patrn.exec(s.substr(i, 1))) {
            if (!patrn2.exec(s.substr(i, 1))) {
                if (!patrn3.exec(s.substr(i, 1))) {
                    alert('###nomatch');
                    return false;
                }
            }
        }

    }

    return true;
}

function checkSSID(s) {

    var patrn = /[^A-Za-z0-9-_\x20\.]/;

    if (patrn.test(s) == true) {
        return false;
    }
    else
        return true;

}


function hideChForWep(_tap, _num, _Bool) {
    var _tmpFlag;

    for (var _i = 0; _i < _num; _i++) {
        _tmpFlag = _tap + (_i + 1);
        _tmpFlag = document.getElementById(_tmpFlag);
        _tmpFlag.style.display = _Bool;
    }
}

function getNameValue(_Name) {
    var _tmp = document.getElementsByName(_Name);
    for (var i = 0; i < _tmp.length; i++) {

        if (_tmp[i].checked) {
            return _tmp[i].value;
        }
    }

    return null;
}

function IPtoNumber(_tmp) {
    var _tmpSplit = _tmp.split('.');
    if (_tmpSplit.length == 4) {
        _tmp = Number(_tmpSplit[0]) + '.' + Number(_tmpSplit[1]) + '.' + Number(_tmpSplit[2]) + '.' + Number(_tmpSplit[3]);
    }
    return _tmp;
}

/*
说明：IPKeyUp和IPKeyDown需要传递两个参数
		参数e表示这个键盘down或up这个事件；
		参数v表示这个对象。函数中的v.id表示这个对象的id。
		prefix表示把这个id按"_"分割的前缀，idx表示分割的后缀。
		因此html文件中对象的id应该命名为 “前缀_数字后缀”的形式，例如在pf_edit中的一个id命名为"INPUTIpAddr_1"
*/
function IPKeyUp(e, v) {
    var prefix = (v.id).split('_')[0] + '_';
    var idx = (v.id).split('_')[1];

    var obj = document.getElementById(prefix + idx);
    var len;
    var nextidx = Number(idx) + 1;
    var keynum;

    if (window.event)
        keynum = event.keyCode;
    else if (e.which) // Netscape/Firefox/Opera
        keynum = e.which;


    if (keynum == TAB_CODE || keynum == BS_CODE) return;

    len = obj.value.length;

    if (len == 3 || keynum == DOT_CODE || keynum == DOT2_CODE) {
        if (len == 0) return;
        obj = document.getElementById(prefix + nextidx);
        if (obj) obj.focus();
        return;
    }
}

function IPKeyDown(e, v) {
    var prefix = (v.id).split('_')[0] + '_';
    var idx = (v.id).split('_')[1];
    var obj = document.getElementById(prefix + idx);
    var previdx = Number(idx) - 1;
    var keynum;
    if (window.event)
        keynum = event.keyCode;
    else if (e.which) // Netscape/Firefox/Opera
        keynum = e.which;

    if ((keynum == TAB_CODE) ||
        (keynum == DEL_CODE) ||
        (keynum == BS_CODE)) {
        if (obj.value.length == 0 && keynum == BS_CODE) {
            obj = document.getElementById(prefix + previdx);
            if (obj) obj.focus();
        }
        return 1;
    }


    return CheckNum(keynum);
}

function CheckNum(keynum) {
    if (((keynum >= 96) && keynum <= 105) ||
        ((keynum >= 48) && keynum <= 57)
    )
        return true;
    return false;
}

function checkNameBlank(str) {
    var patrn = /^\S{1,100}$/;
    var tmp = str;
    if (str == "") {
        return false;
    }
    else {
        if (!patrn.exec(str)) {
            str = str.replace(/\s/g, "");
        }
        if (tmp == str) {
            return true;
        }
        else {
            return str;
        }
    }
}

/*
函数作用：实现IP地址用4个框表示时，页面返回值时，将get到的值分配给相应的4个框
参数说明： ip 需要返回到页面上的IP地址;
          pageip1--pageip4 页面上4个框对应的id
*/
function OnloadIP4hops(ip, pageip1, pageip2, pageip3, pageip4) {
    var myIP = new Array();
    var ip_str = ip;
    myIP[0] = myIP[1] = myIP[2] = myIP[3] = "";

    if (ip_str != "") {
        var tmp = ip_str.split(".");
        myIP[0] = tmp[0];
        myIP[1] = tmp[1];
        myIP[2] = tmp[2];
        myIP[3] = tmp[3];
    }
    $(pageip1).value = myIP[0];
    $(pageip2).value = myIP[1];
    $(pageip3).value = myIP[2];
    if (pageip4 != '')
        $(pageip4).value = myIP[3];
}
