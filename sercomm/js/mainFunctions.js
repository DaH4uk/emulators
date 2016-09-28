var logMessage = false;

var usermode = '';
var sys_type = 'ER'; //NBN,ER
var sys_phone_service = true;
var sys_fon_status = true;
var sys_umts_status = true;
var sys_ipv6_status = true;
var sys_ipv6_configuration = true;
var sys_11ac_status = false;
var sys_username = '';
var sys_dropDownBasExp = '';
var sys_pageid = '';
var sys_lang_code = '';
var sys_delay_time = 0;
var sys_encryption_key = '';
var wizard_backup_mode= '';


function main_init(page) {
    if (self == top) {
        document.documentElement.style.display = 'block';
    } else {
        top.location = self.location;
    }

    $.ajax({
        type: 'get',
        dataType: "json",
        url: './data/user_data.json?_=' + new Date().getTime(),
        async: false,
        success: function (data) {
            //Invalid filter
            data = filterInvalidString(data);

            usermode = getUserData('usermode', data);
            sys_phone_service = getUserData('phone_service', data);
            sys_fon_status = getUserData('fon_status', data);
            sys_umts_status = getUserData('umts_status', data);
            sys_ipv6_status = getUserData('ipv6_status', data);
            sys_ipv6_configuration = getUserData('ipv6_configuration', data);
            sys_11ac_status = getUserData('11ac_status', data);
            sys_username = getUserData('username', data);
            sys_dropDownBasExp = getUserData('dropDownBasExp', data);
            sys_pageid = getUserData('pageid', data);
            sys_lang_code = getUserData('lang_code', data);

            if (sys_lang_code == '') {
                if (usermode == 'admin') {
                    sys_lang_code = 'en';
                } else {
                    sys_lang_code = 'ru';
                }
            }
 						wizard_backup_mode = getUserData('wizard_backup_mode', data);
            page_data_init(page);
        }
    });
}

function page_data_init(page) {
    var dropDownBasExp = sys_dropDownBasExp;
    if (usermode == 'admin')
        dropDownBasExp = usermode;

    if (dropDownBasExp == '') {
        sys_dropDownBasExp = "basic";
        chkPageSelect(page, "basic");
        load_multi_lang_data();
        header_init(page, "basic");
        $('#navigation').html(navigation_init(page, "basic"));
    } else {
        chkPageSelect(page, dropDownBasExp);
        load_multi_lang_data();
        header_init(page, dropDownBasExp);
        $('#navigation').html(navigation_init(page, dropDownBasExp));
    }

    //lang
    var html_out = "";
    html_out += '<a href="javascript:lang_change(\'en\');" class="language-links line">English</a>';
    html_out += '<a href="javascript:lang_change(\'ru\');" class="language-links">Русский</a>';
    $('#langSelector').html(html_out);

    $("#selectBasic").bind("click", function (event, data) {
        setUserData("dropDownBasExp", "basic");
    });
    $("#selectExpert").bind("click", function (event, data) {
        setUserData("dropDownBasExp", "expert");
    });


    $('#head-wrap a').click(function () {
        if (chkUserDataModification())
            return false;
    });

    $('#basexp').click(function () {
        if (chkUserDataModification())
            return false;

        if ($(this).hasClass('closed')) {
            $(this).toggleClass('closed open');
            $('#dropDownBasExp').fadeIn();

        } else if ($(this).hasClass('open')) {
            $(this).toggleClass('open closed');
            $('#dropDownBasExp').fadeOut();

        }
    });

    $('#logout').click(function () {
        if (chkUserDataModification())
            return false;

        delCookie('dropDownBasExp');
        delCookie('pageid');
        delCookie('username');
        delCookie('lang_code');

    });

    $('#navigation ul .menuItem').click(function () {
        if (chkUserDataModification())
            return false;
    });

    $('#helpWrap').remove();

    //.apply-cancel-margin-top .clearfix.apply-cancel .button-cancel
    $('.apply-cancel-margin-top .clearfix.apply-cancel .button-cancel').live('click', function () {
        if (logMessage && window.console)
            console.log(".button-cancel live click");

        loginUserChkLoginTimeout.set(sys_username, loginUserChkLoginTimeoutRet, 'login');
    });

    if (page == "overview") {
        page_overview_init();
    } else {
        page_data_load(page);
    }
}

function getUserData(name, data) {
    var tmp_phone_service = true;
    var tmp_fon_status = true;
    var tmp_umts_status = true;
    var tmp_ipv6_status = true;
    var tmp_ipv6_configuration = true;
    var tmp_11ac_status = false;
    var tmp_username = '';
    var tmp_usermode = '';
    var tmp_pageid = '';
    var tmp_dropDownBasExp = '';
    var tmp_lang_code = '';
    var tmp_delay_time = '';
    var tmp_encryption_key = '';
    var tmp_wizard_backup_mode = '';

    $.each(data, function (main_key, main_val) {
        $.each(main_val, function (key, val) {
            if (key == "phone_service") {
                if (val == '1')
                    tmp_phone_service = true;
                else
                    tmp_phone_service = false;
            }
            if (key == "fon_status") {
                if (val == '1')
                    tmp_fon_status = true;
                else
                    tmp_fon_status = false;
            }
            if (key == "umts_status") {
                if (val == '1')
                    tmp_umts_status = true;
                else
                    tmp_umts_status = false;
            }
            if (key == "ipv6_status") {
                if (val == '1')
                    tmp_ipv6_status = true;
                else
                    tmp_ipv6_status = false;
            }
            if (key == "ipv6_configuration") {
                if (val == '1')
                    tmp_ipv6_configuration = true;
                else
                    tmp_ipv6_configuration = false;
            }
            if (key == "11ac_status") {
                if (val == '1')
                    tmp_11ac_status = true;
                else
                    tmp_11ac_status = false;
            }

            if (key == "username")
                tmp_username = val;
            if (key == "usermode")
                tmp_usermode = val;
            if (key == "pageid")
                tmp_pageid = val;
            if (key == "dropDownBasExp")
                tmp_dropDownBasExp = val;
            if (key == "lang_code")
                tmp_lang_code = val;
            if (key == "delay_time")
                tmp_delay_time = val;
            if (key == "encryption_key")
                tmp_encryption_key = val;
            if (key == "wizard_backup_mode")
							 tmp_wizard_backup_mode = val;    

        });
    });
    if (name == 'phone_service')
        return tmp_phone_service;
    if (name == 'fon_status')
        return tmp_fon_status;
    if (name == 'umts_status')
        return tmp_umts_status;
    if (name == 'ipv6_status')
        return tmp_ipv6_status;
    if (name == 'ipv6_configuration')
        return tmp_ipv6_configuration;
    if (name == '11ac_status')
        return tmp_11ac_status;
    if (name == 'username')
        return tmp_username;
    if (name == 'usermode')
        return tmp_usermode;
    if (name == 'pageid')
        return tmp_pageid;
    if (name == 'dropDownBasExp')
        return tmp_dropDownBasExp;
    if (name == 'lang_code')
        return tmp_lang_code;
    if (name == 'delay_time')
        return tmp_delay_time;
    if (name == 'encryption_key')
        return tmp_encryption_key;
    if (name == 'wizard_backup_mode')
    	 return tmp_wizard_backup_mode;
}

function setUserData(data, val) {
    if (chkUserDataModification())
        return false;

    if (data == 'dropDownBasExp') {
        sys_dropDownBasExp = val;
        userDataDropDownBasExp.set(val, userDataDropDownBasExpRet, "user_data");
    }
    if (data == 'pageid') {
        sys_pageid = val;
        userDataPageId.set(val, null, "user_data");
    }
    if (data == 'lang_code') {
        sys_lang_code = val;
        userDataLangCode.set(val, userDataLangCodeRet, "user_data");
    }

}

function setUserLang(data, val) {
    if (data == 'lang_code') {
        sys_lang_code = val;
        userDataLangCode.set(val, userDataLangCodeRet, "user_lang");
    }
}

function setCookie(c_name, value, exdays) {
    //alert(c_name + ":" + value);
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1)
    {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1)
    {
        c_value = null;
    }
    else
    {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1)
        {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function delCookie(c_name) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    var value = getCookie(c_name);
    var c_value = escape(value) + "; expires=" + exdate.toUTCString();
    document.cookie = c_name + "=" + c_value;
}

function in_array(stringToSearch, arrayToSearch) {

    return false;
}

function isBrowserDetectSupport() {
    var browser = "";
    var version = "";
    jQuery.each(jQuery.browser, function (i, val) {
        if (i == "msie")
            browser = i;
        if (i == "version")
            version = val;
    });

    if (browser == "msie" && version <= 7)
        return false;

    else
        return true;
}

function loginUserChkLoginTimeoutRet(data, textStatus, jqXHR) {
    if (data.length < 3) {
        window.parent.location = 'login.html';
    } else {
	if (data.length > 2) {
            var status = data.slice(0, 3);
            if (status != "[ ]") {
                window.parent.location = 'login.html';
              }
	}
    }
}

function userDataDropDownBasExpRet(data, textStatus, jqXHR) {
    if (data == "1") {
        location.reload();
    }
}

function userDataLangCodeRet(data, textStatus, jqXHR) {
    if (data == "1") {
        location.reload();
    }
}

function chkUserDataModification() {
    var modify_msg = $('#lang700175').closest('.message-arrowbox').css('display')
    //alert(modify_msg);

    if (modify_msg == undefined)
        return false;
    if (modify_msg != 'none') {
        $('body, html').animate({scrollTop: $('body').height()});

        return true;
    } else {
        return false;
    }
}

function isFontElementOverflow(obj) {
    var _hasScrollBar = false;
    if ((obj.clientHeight < obj.scrollHeight) || (obj.clientWidth < obj.scrollWidth)) {
        _hasScrollBar = true;
    }
    return _hasScrollBar;
}

function isThisValNoMask(maskVal, thisVal) {
    if (maskVal == 'NaN' || maskVal < 0 || maskVal.length > 8)
        return true;
    if (thisVal == 'NaN' || thisVal < 0 || thisVal.length > 8)
        return true;

    var maskVal_ary = Array();
    var thisVal_ary = Array();

    for (var i = maskVal.length; i > 0; i--) {
        maskVal_ary.push(maskVal.slice(i - 1, i));
    }
    for (var i = 8 - maskVal.length; i > 0; i--) {
        maskVal_ary.push('0');
    }

    for (var i = thisVal.length; i > 0; i--) {
        thisVal_ary.push(thisVal.slice(i - 1, i));
    }
    for (var i = 8 - thisVal.length; i > 0; i--) {
        thisVal_ary.push('0');
    }

    for (var key in maskVal_ary) {
        if (maskVal_ary[key] == '0' && thisVal_ary[key] == '1')
            return true;
    }

    return false;
}

function getScriptByArray(ary, ret_func) {
    if (ary.length != 0) {
        var tmp_getScript = ary.pop();
        $.getScript(tmp_getScript + '?_=' + new Date().getTime(), function (response, status) {
            if (ary.length == 0) {
                if (ret_func != null) {
                    ret_func(response, status);
                }
            } else {
                getScriptByArray(ary, ret_func);
            }
        });
    }
}

function chkIsSysType(val) {
    if (sys_type === val) {
        return true;
    } else {
        return false;
    }
}

function chkIsNotSysType(val) {
    if (sys_type !== val) {
        return true;
    } else {
        return false;
    }
}

function passwordStrength(password, obj) {
    var desc = new Array();
    desc[0] = '<span>' + getHTMLString(700231) + '</span>'; //Very Weak
    desc[1] = '<span>' + getHTMLString(700232) + '</span>'; //Weak
    desc[2] = '<span>' + getHTMLString(700233) + '</span>'; //Better
    desc[3] = '<span>' + getHTMLString(700234) + '</span>'; //Medium
    desc[4] = '<span>' + getHTMLString(700235) + '</span>'; //Strong
    desc[5] = '<span>' + getHTMLString(700236) + '</span>'; //Strongest
    var score = 0;

    //if password bigger than 6 give 1 point
    if (password.length > 6)
        score++;

    //if password has both lower and uppercase characters give 1 point      
    if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/)))
        score++;

    //if password has at least one number give 1 point
    if (password.match(/\d+/))
        score++;

    //if password has at least one special caracther give 1 point
    if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/))
        score++;

    //if password bigger than 12 give another 1 point
    if (password.length > 12)
        score++;


    if (typeof (obj) != 'object') {
        return false;
    } else {
        obj.html(desc[score]).removeClass().addClass('passwordStrength strength' + score);
        return true;
    }
}

//Validation
function inputFormateValidateion(val) {
    //if(val == "") return false;

    var rege = /[&'"//\\\[\]\{\}\(\):;|=,+*?<>]/;
    if (rege.test(val))
        return false;
    else
        return true;
}

function inputNotEmptyFormate2Validateion(val) {
    if (val == "")
        return false;

    var rege = /[&'"//\\\[\]\{\}\(\);|=,+*?<>]/;
    if (rege.test(val))
        return false;
    else
        return true;
}

function inputNotEmptyFormateValidateion(val) {
    if (val == "")
        return false;

    var rege = /[&'"//\\\[\]\{\}\(\):;|=,+*?<>]/;
    if (rege.test(val))
        return false;
    else
        return true;
}

function timeFormateValidateion(time) {
    // check colum in between
    timeAry = time.split(":");
    if (timeAry.length != 2)
        return false;

    // check both are integers
    if (isNaN(timeAry[0]))
        return false;
    if (isNaN(timeAry[1]))
        return false;

    var hour = parseInt(timeAry[0]);
    var min = parseInt(timeAry[1]);
    // check if hour field in right range
    if (hour < 0 || hour > 23)
        return false;
    // check if the min field in right range
    if (min < 0 || min > 59)
        return false;

    // check passed
    return true;
}

function phoneFormateValidateion(val) {
    if (/^\+?\d+$/.test(val))
        return true;
    else
        return false;
}

function ipv4FormateValidateion(val) {
    if (val == "")
        return false;

    if (val.length <= 3) {
        if (/^[0-9]*$/.test(val)) {
            var tmp_val = parseInt(val, 10);
            if (tmp_val <= 255 && tmp_val >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function macSegmentormateValidateion(val) {
    if (val == "" || val.length < 2)
        return false;

    var rege = /[0-9a-fA-F]+$/;
    if (rege.test(val[0]) && rege.test(val[1]))
        return true;
    else
        return false;
}

function macStringValidateion(val) {
    if (val == "")
        return true;
    var rege = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/;
    if (rege.test(val))
        return true;
    else
        return false;
}

function numberFormateValidateion(val) {
    if (val == "")
        return true;

    if (/^\d+$/.test(val)) {
        var tmp_val = parseInt(val, 10);
        if (tmp_val <= 0)
            return false;
        else
            return true;
    }
    else
        return false;
}

function numberNotEmptyFormateValidateion(val) {
    if (/^\d+$/.test(val)) {
        var tmp_val = parseInt(val, 10);
        if (tmp_val <= 0)
            return false;
        else
            return true;
    }
    else
        return false;
}

function signedINTFormateValidateion(val) {
    if (val == "")
        return false;

    if (/^-?\d+$/.test(val))
        return true;
    else
        return false;
}

function unsignedINTFormateValidateion(val) {
    if (val == "")
        return false;

    if (/^\d+$/.test(val))
        return true;
    else
        return false;
}

function portFormateValidateion(val) {
    if (val == "")
        return false;

    if (/\d+$/.test(val)) {
        var tmp_val = parseInt(val, 10);
        if (tmp_val < 0 || tmp_val > 65535)
            return false;
        else
            return true;
    }
    else
        return false;
}

function timeRangeValidation(timeA, timeB) {
    if (timeToMin(timeB) < timeToMin(timeA))
        return false;
    return true;
}

function timeRangeInterfierValidation(rangeAstart, rangeAend, rangeBstart, rangeBend) {
    rangeAstartMin = timeToMin(rangeAstart);
    rangeAendMin = timeToMin(rangeAend) - 1;
    rangeBstartMin = timeToMin(rangeBstart);
    rangeBendMin = timeToMin(rangeBend) - 1;

    if ((rangeBstartMin >= rangeAstartMin) && (rangeBstartMin <= rangeAendMin))
        return false;
    if ((rangeBendMin >= rangeAstartMin) && (rangeBendMin <= rangeAendMin))
        return false;

    if ((rangeBstartMin < rangeAstartMin) && (rangeBendMin > rangeAendMin))
        return false;
    if ((rangeAstartMin < rangeBstartMin) && (rangeAendMin > rangeBendMin))
        return false;

    return true;
}

function timeInterfierValidation(timeA, timeB) {
    timeAmin = timeToMin(timeA);
    timeBmin = timeToMin(timeB);
    if (timeAmin == timeBmin)
        return false;

    return true;
}

function timeToMin(inTime) {
    timeAry = inTime.split(":");
    var min = parseInt(timeAry[0] * 60 + parseInt(timeAry[1]));
    return min;
}

function maxLengthValidateion(val, len) {
    if (!basicFormateValidation(val))
        return false;

    if (val.length <= len)
        return true;
    else
        return false;
}

function minLengthValidateion(val, len) {
    if (!basicFormateValidation(val))
        return false;

    if (val.length >= len)
        return true;
    else
        return false;
}

function maxNumberValidateion(val, number) {
    if (parseInt(val, 10) <= parseInt(number, 10))
        return true;
    else
        return false;
}

function minNumberValidateion(val, number) {
    if (parseInt(val, 10) >= parseInt(number, 10))
        return true;
    else
        return false;
}

function domainFormateValidateion(val) {
    var tmp_val = val.split('.');
    if (tmp_val.length < 2)
        return false;

    var rege = /^(([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.)(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){2}([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^(?:(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){6})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:::(?:(?:(?:[0-9a-fA-F]{1,4})):){5})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){4})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,1}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){3})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,2}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){2})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,3}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:[0-9a-fA-F]{1,4})):)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,4}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,5}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,6}(?:(?:[0-9a-fA-F]{1,4})))?::))))$/;
    if (rege.test(val))
        return true;
    else
        return false;
}

function emailFormateValidateion(val) {
    var tmp_val = val.split('@');
    if (tmp_val.length != 2)
        return false;

    var rege = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (rege.test(val))
        return true;
    else
        return false;
}

function ip4ip6FormateValidation(val) {
    var rege = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
    if (rege.test(val))
        return true;
    else
        return false;
}

function basicFormateValidation(val) {
    var rege = /['"\\<>]/;
    if (rege.test(val)) {
        return false;
    } else {
        var testdata = val.toLowerCase();
        var rege1 = new RegExp('&lt');
        var rege2 = new RegExp('&gt');
        var rege3 = new RegExp('&#');
        if (rege1.test(testdata) || rege2.test(testdata) || rege3.test(testdata)) {
            return false;
        } else {
            return true;
        }
    }
}

function chkInputTextValidation(obj) {
    var ret_val = true;
    $(obj).each(function () {
        $(this).removeClass('input-message-error');

        if (ret_val) {
            if ($(this).hasClass('scm_not_chk')) { //no need check

            } else {
                var not_checked = true;
                //time format
                if ($(this).hasClass('scm_time')) {
                    not_checked = false;

                    if (!timeFormateValidateion($(this).val()))
                        ret_val = false;
                }
                //phone format
                if ($(this).hasClass('scm_phone')) {
                    not_checked = false;

                    if (!phoneFormateValidateion($(this).val()))
                        ret_val = false;
                }
                //ipv4
                if ($(this).hasClass('scm_ip4')) {
                    not_checked = false;

                    if (!ipv4FormateValidateion($(this).val()))
                        ret_val = false;
                }
                //ipv4 and empty
                if ($(this).hasClass('scm_ip4_and_empty')) {
                    not_checked = false;
                    if ($(this).val() !== '') {
                        if (!ipv4FormateValidateion($(this).val()))
                            ret_val = false;
                    }
                }
                //mac segment
                if ($(this).hasClass('scm_mac_segment')) {
                    not_checked = false;

                    $(this).val($(this).val().toUpperCase());
                    if (!macSegmentormateValidateion($(this).val()))
                        ret_val = false;
                }
                //mac string 
                if ($(this).hasClass('scm_mac_string')) {
                    not_checked = false;

                    $(this).val($(this).val().toUpperCase());
                    if (!macStringValidateion($(this).val()))
                        ret_val = false;
                }
                //number
                if ($(this).hasClass('scm_num')) {
                    not_checked = false;

                    if (!numberFormateValidateion($(this).val())) {
                        ret_val = false;
                    } else {
                        $(this).val(parseInt($(this).val(), 10));
                    }
                }
                //port 
                if ($(this).hasClass('scm_port')) {
                    not_checked = false;

                    if (!portFormateValidateion($(this).val()))
                        ret_val = false;
                }

                //number not empty
                if ($(this).hasClass('scm_num_not_empty')) {
                    not_checked = false;

                    if (!numberNotEmptyFormateValidateion($(this).val())) {
                        ret_val = false;
                    } else {
                        $(this).val(parseInt($(this).val(), 10));
                    }
                }
                //signed int
                if ($(this).hasClass('scm_signed_int')) {
                    not_checked = false;

                    if (!signedINTFormateValidateion($(this).val())) {
                        ret_val = false;
                    } else {
                        $(this).val(parseInt($(this).val(), 10));
                    }
                }
                //unsigned int
                if ($(this).hasClass('scm_unsigned_int')) {
                    not_checked = false;

                    if (!unsignedINTFormateValidateion($(this).val())) {
                        ret_val = false;
                    } else {
                        $(this).val(parseInt($(this).val(), 10));
                    }
                }
                //max length
                if ($(this).hasClass('scm_max_length')) {
                    not_checked = false;

                    if (!maxLengthValidateion($(this).val(), $(this).attr('scm_max_length')))
                        ret_val = false;
                }
                //min length
                if ($(this).hasClass('scm_min_length')) {
                    not_checked = false;

                    if (!minLengthValidateion($(this).val(), $(this).attr('scm_min_length')))
                        ret_val = false;
                }
                //max number
                if ($(this).hasClass('scm_max_number')) {
                    not_checked = false;

                    if (!maxNumberValidateion($(this).val(), $(this).attr('scm_max_number')))
                        ret_val = false;
                }
                //min number
                if ($(this).hasClass('scm_min_number')) {
                    not_checked = false;

                    if (!minNumberValidateion($(this).val(), $(this).attr('scm_min_number')))
                        ret_val = false;
                }
                //domain
                if ($(this).hasClass('scm_domain')) {
                    not_checked = false;

                    if (!domainFormateValidateion($(this).val()))
                        ret_val = false;
                }
                //email
                if ($(this).hasClass('scm_email')) {
                    not_checked = false;

                    if (!emailFormateValidateion($(this).val()))
                        ret_val = false;
                }
                //IPv4 IPv6
                if ($(this).hasClass('scm_ip4ip6')) {
                    if ($(this).hasClass('scm_can_empty'))
                    {
                        if ($(this).val() == "")
                            not_checked = true;
                        else
                            not_checked = false;
                    }
                    else
                        not_checked = false;
                    if (!not_checked)
                        if (!ip4ip6FormateValidation($(this).val()))
                            ret_val = false;
                }
                //basic
                if ($(this).hasClass('scm_basic_valid')) {
                    not_checked = false;

                    if (!basicFormateValidation($(this).val()))
                        ret_val = false;
                }
                //not empty
                if ($(this).hasClass('scm_not_empty')) {
                    not_checked = false;

                    if (!inputNotEmptyFormateValidateion($(this).val()))
                        ret_val = false;
                }
                //scm_not_empty2
                if ($(this).hasClass('scm_not_empty2')) {
                    not_checked = false;

                    if (!inputNotEmptyFormate2Validateion($(this).val()))
                        ret_val = false;
                }

                if (not_checked) {
                    if (!inputFormateValidateion($(this).val()))
                        ret_val = false;
                }

            }

            if (!ret_val) {
                $(this).addClass('input-message-error');
            }
        }
    });

    return ret_val;
}
