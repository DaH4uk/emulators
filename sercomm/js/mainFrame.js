<<<<<<< HEAD

function chkPageSelect(page, dropDownBasExp) {
    var reloadPage = false;

    var locationInfo = window.location.toString().split("#");
    var pageId = locationInfo[1];
    if (typeof (pageId) == 'undefined') {
        //alert('undefined');
        reloadPage = true;
    }

    if (page != "overview") {
        if (page == "phone") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=7", "sub=8");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=7", "sub=8", "sub=13", "sub=16", "sub=79");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=7", "sub=8", "sub=13", "sub=16", "sub=79", "sub=20");

            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=7";
                reloadPage = true;
            }
        }
        if (page == "internet") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=26", "sub=29");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=26", "sub=27", "sub=23", "sub=29", "sub=85", "sub=22");
            //
            if (sys_umts_status) { //umts status enable(all)
                ary_sub_page.push("sub=89");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                if (sys_umts_status) { //umts status enable
                    pageId = "sub=89";
                } else {
                    pageId = "sub=26";
                }
                reloadPage = true;
            }
        }
        if (page == "wifi") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=35", "sub=36");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=35", "sub=36", "sub=38");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=35", "sub=36", "sub=38", "sub=40");
            //
            if (sys_type !== 'ER') { //WPS enable(all)
                ary_sub_page.push("sub=37");
            }
            if (sys_fon_status) { //FON status enable(admin)
                ary_sub_page.push("sub=102");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=35";
                reloadPage = true;
            }
        }
        if (page == "settings") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=77", "sub=56", "sub=56&subSub=57");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=77", "sub=58", "sub=56", "sub=56&subSub=57", "sub=56&subSub=51", "sub=56&subSub=50", "sub=54", "sub=68");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=77", "sub=60", "sub=58", "sub=56", "sub=56&subSub=57", "sub=56&subSub=51", "sub=56&subSub=50", "sub=54", "sub=52", "sub=68", "sub=59", "sub=73", "sub=74", "sub=75", "sub=80", "sub=68", "sub=301", "sub=303", "sub=86", "sub=93");
            //
            if (dropDownBasExp == "expert" && sys_umts_status) {  //umts status enable(expert)
                ary_sub_page.push("sub=88");
            }
            if (dropDownBasExp == "admin" && sys_umts_status) {  //umts status enable(admin)
                ary_sub_page.push("sub=88");
            }
            if (dropDownBasExp == "admin" && sys_ipv6_status) {  //IPv6 status enable(admin)
                ary_sub_page.push("sub=97");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=77";
                reloadPage = true;
            }
        }
        if (page == "status-and-support") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=42");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=42");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=1&subSub=82", "sub=1&subSub=67", "sub=1&subSub=70", "sub=1&subSub=71", "sub=28", "sub=4", "sub=41", "sub=6", "sub=87", "sub=98", "sub=42");
            //
            if (dropDownBasExp == "admin" && sys_umts_status) { //umts status enable(admin)
                ary_sub_page.push("sub=1&subSub=44");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=1";
                reloadPage = true;
            }
        }

        sys_pageid = pageId;
        if (reloadPage) {
            window.parent.location = locationInfo[0] + "#" + pageId;
        }
    } else {
        sys_pageid = pageId;
    }
}

function header_init(page, dropDownBasExp) {
    var html_out = "";
    html_out += '<div id="head-wrap" class="clearfix">';
    html_out += '<a href="overview.html" class="logos"><img src="img/logos/entry-level.png" alt="Sercomm Logo" /></a>';


    
        if ((usermode != 'admin')&&(sys_username == null || sys_username.length == ""))
        {
         var connect3=   'wizard_er.html?page=connect3&_='+new Date().getTime();
           
             html_out =html_out+  '<a href="'+connect3+'" id="logout">&nbsp;</a>';
               
        }else        
        html_out += '<a href="index.html" id="logout">&nbsp;</a>';
    
    if (dropDownBasExp == "basic")
        html_out += '<div href="#" id="basexp" class="' + dropDownBasExp + ' closed" style="display: none;"><span id="lang700056" title="' + getHTMLString(700056) + '">' + getHTMLString(700056) + '</span></div>';
    else if (dropDownBasExp == "expert")
        html_out += '<div href="#" id="basexp" class="' + dropDownBasExp + ' closed" style="display: none;"><span id="lang700057" title="' + getHTMLString(700057) + '">' + getHTMLString(700057) + '</span></div>';
    html_out += '<div id="dropDownBasExp" class="' + dropDownBasExp + '" style="display: none;">';
    html_out += '<div href="" id="selectBasic" class="selectBasic"><span id="lang700056" title="' + getHTMLString(700056) + '">' + getHTMLString(700056) + '</span></div>';
    html_out += '<div href="" id="selectExpert" class="selectExpert"><span id="lang700057" title="' + getHTMLString(700057) + '">' + getHTMLString(700057) + '</span></div>';
    html_out += '</div>';
    html_out += '</div>';

    html_out += '<nav>';
    //<!-- main navigation START -->
    if (sys_phone_service /* || (usermode == 'admin')*/)
        html_out += '<ul class="clearfix six ' + page + 'Menu ">';
    else
    {
        if (usermode == 'admin') {
            html_out += '<ul class="clearfix five ' + page + 'Menu ">';
        } else {
            html_out += '<ul class="clearfix four ' + page + 'Menu ">';
        }
    }
    if (page == "overview")
        html_out += '<li id="overview" class="active"><a href="overview.html"><span id="lang700031" title="' + getHTMLString(700031) + '">' + getHTMLString(700031) + '</span></a></li>';
    else
        html_out += '<li id="overview"><a href="overview.html"><span id="lang700031" title="' + getHTMLString(700031) + '">' + getHTMLString(700031) + '</span></a></li>';

    if (sys_phone_service /* || (usermode == 'admin')*/) {
        if (page == "phone")
            html_out += '<li id="phone" class="active"><a href="phone.html#sub=7"><span id="lang700032" title="' + getHTMLString(700032) + '">' + getHTMLString(700032) + '</span></a></li>';
        else
            html_out += '<li id="phone"><a href="phone.html#sub=7"><span id="lang700032" title="' + getHTMLString(700032) + '">' + getHTMLString(700032) + '</span></a></li>';
    }

    if (page == "internet")
        html_out += '<li id="internet" class="active"><a href="internet.html#sub=89"><span id="lang700033" title="' + getHTMLString(700033) + '">' + getHTMLString(700033) + '</span></a></li>';
    else
        html_out += '<li id="internet"><a href="internet.html#sub=89"><span id="lang700033" title="' + getHTMLString(700033) + '">' + getHTMLString(700033) + '</span></a></li>';
    if (usermode == 'admin') {
        if (page == "wifi")
            html_out += '<li id="wifi" class="active"><a href="wifi.html#sub=35"><span id="lang700034" title="' + getHTMLString(700034) + '">' + getHTMLString(700034) + '</span></a></li>';
        else
            html_out += '<li id="wifi"><a href="wifi.html#sub=35"><span id="lang700034" title="' + getHTMLString(700034) + '">' + getHTMLString(700034) + '</span></a></li>';
    }
    if (page == "settings")
        html_out += '<li id="settings" class="active"><a href="settings.html#sub=77"><span id="lang700035" title="' + getHTMLString(700035) + '">' + getHTMLString(700035) + '</span></a></li>';
    else
        html_out += '<li id="settings"><a href="settings.html#sub=77"><span id="lang700035" title="' + getHTMLString(700035) + '">' + getHTMLString(700035) + '</span></a></li>';

    if (page == "status-and-support")
        html_out += '<li id="status-and-support" class="active"><a href="status-and-support.html#sub=1"><span id="lang700036" title="' + getHTMLString(700036) + '">' + getHTMLString(700036) + '</span></a></li>';
    else
        html_out += '<li id="status-and-support"><a href="status-and-support.html#sub=1"><span id="lang700036" title="' + getHTMLString(700036) + '">' + getHTMLString(700036) + '</span></a></li>';

    html_out += '</ul>';
    //<!-- main navigation ENDE -->

    html_out += '</nav>';

    $("#header").html(html_out);
}

function navigation_init(page, dropDownBasExp) {
    if (dropDownBasExp == "basic")
        return navigation_basic_init(page);
    else if (dropDownBasExp == "expert")
        return navigation_expert_init(page);
    else if (dropDownBasExp == "admin")
        return navigation_admin_init(page);
}

function navigation_basic_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="exposed-host" class="menuItem">';
         html_out += '<a href="#sub=27"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="password" class="menuItem">';
         html_out += '<a href="#sub=60"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="iptv" class="menuItem">';
        //	html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        //	html_out += '</ul>';

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="voice-status" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';
        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        //	html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //html_out += '</li>';
        //	html_out += '</ul>';
        //	html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="'+getHTMLString(903013)+'">'+getHTMLString(903013)+'</span></a>'; //WAN
        //	html_out += '</li>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';
        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}

function navigation_expert_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wake-up-call" class="menuItem">';
        html_out += '<a href="#sub=13"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ringing-schedule" class="menuItem">';
        html_out += '<a href="#sub=16"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="call-settings" class="menuItem">';
        html_out += '<a href="#sub=79"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="exposed-host" class="menuItem">';
         html_out += '<a href="#sub=27"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';

         html_out += '<li id="parental-control" class="menuItem">';
         html_out += '<a href="#sub=23"><span id="lang903002" title="'+getHTMLString(903002)+'">'+getHTMLString(903002)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="dns-ddns" class="menuItem">';
        html_out += '<a href="#sub=29"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="upnp" class="menuItem">';
         html_out += '<a href="#sub=85"><span id="lang315001" title="'+getHTMLString(315001)+'">'+getHTMLString(315001)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="mac-filter" class="menuItem">';
        html_out += '<a href="#sub=38"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="password" class="menuItem">';
         html_out += '<a href="#sub=60"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="usb" class="menuItem">';
        html_out += '<a href="#sub=58"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="network-share-samba" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ftp" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="configuration" class="menuItem">';
        html_out += '<a href="#sub=54"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan" class="menuItem">';
        html_out += '<a href="#sub=52"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts-settings" class="menuItem">';
            html_out += '<a href="#sub=88"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        /*
         html_out += '<li id="iptv" class="menuItem">';
         html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
         html_out += '</li>';
         html_out += '</ul>';
         */

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="voice-status" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';


        html_out += '<li id="nat-mapping-table" class="menuItem">';
        html_out += '<a href="#sub=28"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="diagnostic-utility" class="menuItem">';
        html_out += '<a href="#sub=4"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="restart" class="menuItem">';
        html_out += '<a href="#sub=41"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="event-log" class="menuItem">';
        html_out += '<a href="#sub=6"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';

        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="13" class="menuItem"><a href="#sub=13" onclick="page_data_load(\'phone\');"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="16" class="menuItem"><a href="#sub=16" onclick="page_data_load(\'phone\');"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="79" class="menuItem"><a href="#sub=79" onclick="page_data_load(\'phone\');"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '<li id="23" class="menuItem"><a href="#sub=23" onclick="page_data_load(\'internet\');"><span id="lang903002" title="'+getHTMLString(903002)+'">'+getHTMLString(903002)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="29" class="menuItem"><a href="#sub=29" onclick="page_data_load(\'internet\');"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="85" class="menuItem"><a href="#sub=85" onclick="page_data_load(\'internet\');"><span id="lang315001" title="'+getHTMLString(315001)+'">'+getHTMLString(315001)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="38" class="menuItem"><a href="#sub=38" onclick="page_data_load(\'wifi\');"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="58" class="menuItem"><a href="#sub=58" onclick="page_data_load(\'settings\');"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="51" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=51" onclick="page_data_load(\'settings\');"><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="50" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=50" onclick="page_data_load(\'settings\');"><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="54" class="menuItem"><a href="#sub=54" onclick="page_data_load(\'settings\');"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="52" class="menuItem sub"><a href="#sub=52" onclick="page_data_load(\'settings\');"><span id="lang905009" title="'+getHTMLString(905009)+'">'+getHTMLString(905009)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';

        //html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="88" class="menuItem"><a href="#sub=88" onclick="page_data_load(\'settings\');"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';


        html_out += '<li id="28" class="menuItem"><a href="#sub=28" onclick="page_data_load(\'status-and-support\');"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="4" class="menuItem"><a href="#sub=4" onclick="page_data_load(\'status-and-support\');"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="41" class="menuItem"><a href="#sub=41" onclick="page_data_load(\'status-and-support\');"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="6" class="menuItem"><a href="#sub=6" onclick="page_data_load(\'status-and-support\');"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';


        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}

function navigation_admin_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wake-up-call" class="menuItem">';
        html_out += '<a href="#sub=13"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ringing-schedule" class="menuItem">';
        html_out += '<a href="#sub=16"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="call-settings" class="menuItem">';
        html_out += '<a href="#sub=79"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="phone-settings" class="menuItem">';
        html_out += '<a href="#sub=20"><span id="lang902014" title="' + getHTMLString(902014) + '">' + getHTMLString(902014) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="exposed-host" class="menuItem">';
        html_out += '<a href="#sub=27"><span id="lang903006" title="' + getHTMLString(903006) + '">' + getHTMLString(903006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="parental-control" class="menuItem">';
        html_out += '<a href="#sub=23"><span id="lang903002" title="' + getHTMLString(903002) + '">' + getHTMLString(903002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="dns-ddns" class="menuItem">';
        html_out += '<a href="#sub=29"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="upnp" class="menuItem">';
        html_out += '<a href="#sub=85"><span id="lang315001" title="' + getHTMLString(315001) + '">' + getHTMLString(315001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="firewall" class="menuItem">';
        html_out += '<a href="#sub=22"><span id="lang903001" title="' + getHTMLString(903001) + '">' + getHTMLString(903001) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="mac-filter" class="menuItem">';
        html_out += '<a href="#sub=38"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wifi-settings" class="menuItem">';
        html_out += '<a href="#sub=40"><span id="lang904006" title="' + getHTMLString(904006) + '">' + getHTMLString(904006) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="password" class="menuItem">';
        html_out += '<a href="#sub=60"><span id="lang905001" title="' + getHTMLString(905001) + '">' + getHTMLString(905001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="usb" class="menuItem">';
        html_out += '<a href="#sub=58"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="network-share-samba" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ftp" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="configuration" class="menuItem">';
        html_out += '<a href="#sub=54"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan" class="menuItem">';
        html_out += '<a href="#sub=52"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="firmware-update" class="menuItem">';
        html_out += '<a href="#sub=59"><span id="lang905002" title="' + getHTMLString(905002) + '">' + getHTMLString(905002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="qos" class="menuItem">';
        html_out += '<a href="#sub=73"><span id="lang905018" title="' + getHTMLString(905018) + '">' + getHTMLString(905018) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="internet-time" class="menuItem">';
        html_out += '<a href="#sub=74"><span id="lang513001" title="' + getHTMLString(513001) + '">' + getHTMLString(513001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="tr-069" class="menuItem">';
        html_out += '<a href="#sub=75"><span id="lang905019" title="' + getHTMLString(905019) + '">' + getHTMLString(905019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="settings-access-control" class="menuItem">';
        html_out += '<a href="#sub=80"><span id="lang906017" title="' + getHTMLString(906017) + '">' + getHTMLString(906017) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts-settings" class="menuItem">';
            html_out += '<a href="#sub=88"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }

        html_out += '<li id="wan" class="menuItem">';
        html_out += '<a href="#sub=68"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';
        html_out += '<li id="pppoe_relay" class="menuItem">';
        html_out += '<a href="#sub=302"><span id="lang1301402">' + getHTMLString(526028) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="vlan_settings" class="menuItem">';
        html_out += '<a href="#sub=301"><span id="lang1301402">' + getHTMLString(1301402) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="syslog_client" class="menuItem">';
        html_out += '<a href="#sub=303"><span id="lang1310572">'+getHTMLString(1310572)+'</span></a>'; //Syslog Client
        html_out += '</li>';	
        html_out += '<li id="iptv" class="menuItem">';
        //	html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        if (sys_ipv6_status) { //IPv6 status enable
            html_out += '<li id="ipv6-basic-configuration" class="menuItem">';
            html_out += '<a href="#sub=97"><span id="lang905023">' + getHTMLString(905023) + '</span></a>'; //IPv6 Basic Configuration
            html_out += '</li>';
        }
        html_out += '<li id="static-routing" class="menuItem">';
        html_out += '<a href="#sub=86"><span id="lang522001" title="' + getHTMLString(522001) + '">' + getHTMLString(522001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="policy-routing" class="menuItem">';
        html_out += '<a href="#sub=93"><span id="lang903018" title="' + getHTMLString(903018) + '">' + getHTMLString(903018) + '</span></a>'; //Policy Routing
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="voice-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="adsl-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906012" title="' + getHTMLString(906012) + '">' + getHTMLString(906012) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wan-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906013" title="' + getHTMLString(906013) + '">' + getHTMLString(906013) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906014" title="' + getHTMLString(906014) + '">' + getHTMLString(906014) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="routing-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906015" title="' + getHTMLString(906015) + '">' + getHTMLString(906015) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="nat-mapping-table" class="menuItem">';
        html_out += '<a href="#sub=28"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="diagnostic-utility" class="menuItem">';
        html_out += '<a href="#sub=4"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="restart" class="menuItem">';
        html_out += '<a href="#sub=41"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="event-log" class="menuItem">';
        html_out += '<a href="#sub=6"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="voip-diagnostics" class="menuItem">';
        html_out += '<a href="#sub=87"><span id="lang616001" title="' + getHTMLString(616001) + '">' + getHTMLString(616001) + '</span></a>'; //VOIP Diagnostics
        html_out += '</li>';
        html_out += '<li id="port-mirroring" class="menuItem">';
        html_out += '<a href="#sub=98"><span id="lang906019">' + getHTMLString(906019) + '</span></a>'; //Port Mirroring
        html_out += '</li>';
        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="13" class="menuItem"><a href="#sub=13" onclick="page_data_load(\'phone\');"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="16" class="menuItem"><a href="#sub=16" onclick="page_data_load(\'phone\');"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="79" class="menuItem"><a href="#sub=79" onclick="page_data_load(\'phone\');"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="20" class="menuItem"><a href="#sub=20" onclick="page_data_load(\'phone\');"><span id="lang902014" title="' + getHTMLString(902014) + '">' + getHTMLString(902014) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="' + getHTMLString(903006) + '">' + getHTMLString(903006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="23" class="menuItem"><a href="#sub=23" onclick="page_data_load(\'internet\');"><span id="lang903002" title="' + getHTMLString(903002) + '">' + getHTMLString(903002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="29" class="menuItem"><a href="#sub=29" onclick="page_data_load(\'internet\');"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="85" class="menuItem"><a href="#sub=85" onclick="page_data_load(\'internet\');"><span id="lang315001" title="' + getHTMLString(315001) + '">' + getHTMLString(315001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="22" class="menuItem"><a href="#sub=22" onclick="page_data_load(\'internet\');"><span id="lang903001" title="' + getHTMLString(903001) + '">' + getHTMLString(903001) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="38" class="menuItem"><a href="#sub=38" onclick="page_data_load(\'wifi\');"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="40" class="menuItem"><a href="#sub=40" onclick="page_data_load(\'wifi\');"><span id="lang904006" title="' + getHTMLString(904006) + '">' + getHTMLString(904006) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="' + getHTMLString(905001) + '">' + getHTMLString(905001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="58" class="menuItem"><a href="#sub=58" onclick="page_data_load(\'settings\');"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="51" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=51" onclick="page_data_load(\'settings\');"><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="50" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=50" onclick="page_data_load(\'settings\');"><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="54" class="menuItem"><a href="#sub=54" onclick="page_data_load(\'settings\');"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="52" class="menuItem"><a href="#sub=52" onclick="page_data_load(\'settings\');"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="59" class="menuItem"><a href="#sub=59" onclick="page_data_load(\'settings\');"><span id="lang905002" title="' + getHTMLString(905002) + '">' + getHTMLString(905002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="73" class="menuItem"><a href="#sub=73" onclick="page_data_load(\'settings\');"><span id="lang905018" title="' + getHTMLString(905018) + '">' + getHTMLString(905018) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="74" class="menuItem"><a href="#sub=74" onclick="page_data_load(\'settings\');"><span id="lang513001" title="' + getHTMLString(513001) + '">' + getHTMLString(513001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="75" class="menuItem"><a href="#sub=75" onclick="page_data_load(\'settings\');"><span id="lang905019" title="' + getHTMLString(905019) + '">' + getHTMLString(905019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="80" class="menuItem"><a href="#sub=80" onclick="page_data_load(\'settings\');"><span id="lang906017" title="' + getHTMLString(906017) + '">' + getHTMLString(906017) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="88" class="menuItem"><a href="#sub=88" onclick="page_data_load(\'settings\');"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';
        html_out += '<li id="302" class="menuItem"><a href="#sub=302" onclick="page_data_load(\'settings\');"><span id="lang1301402">' + getHTMLString(526028) + '</span></a>'; //PPPoE Relay
        html_out += '</li>';
        html_out += '<li id="301" class="menuItem"><a href="#sub=301" onclick="page_data_load(\'settings\');"><span id="lang1301402">' + getHTMLString(1301402) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">' + getHTMLString(606029) + '</span></a>'; //IPTV
        html_out += '</li>';
        html_out += '<li id="303" class="menuItem"><a href="#sub=303" onclick="page_data_load(\'settings\');"><span id="lang1310572">'+getHTMLString(1310572)+'</span></a>'; //Syslog Client
        html_out += '</li>';

        if (sys_ipv6_status) { //IPv6 status enable
            html_out += '<li id="97" class="menuItem"><a href="#sub=97" onclick="page_data_load(\'settings\');"><span id="lang905023">' + getHTMLString(905023) + '</span></a>'; //IPv6 Basic Configuration
            html_out += '</li>';
        }
        html_out += '<li id="86" class="menuItem"><a href="#sub=86" onclick="page_data_load(\'settings\');"><span id="lang522001" title="' + getHTMLString(522001) + '">' + getHTMLString(522001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="93" class="menuItem"><a href="#sub=93" onclick="page_data_load(\'settings\');"><span id="lang903018" title="' + getHTMLString(903018) + '">' + getHTMLString(903018) + '</span></a>'; //Policy Routing
        html_out += '</li>';

        html_out += '</ul>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';

        if (sys_phone_service /* || (usermode == 'admin')*/) {
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';  // Voice Status
            html_out += '</li>';
        }

        html_out += '<li id="82" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=82" onclick="page_data_load(\'status-and-support\');"><span id="lang907003" title="' + getHTMLString(907003) + '">' + getHTMLString(907003) + '</span></a>'; //Fibre Status
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="44" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=44" onclick="page_data_load(\'status-and-support\');"><span id="lang906010" title="' + getHTMLString(906010) + '">' + getHTMLString(906010) + '</span></a>'; //UMTS Status
            html_out += '</li>';
        }
        html_out += '<li id="67" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=67" onclick="page_data_load(\'status-and-support\');"><span id="lang906013" title="' + getHTMLString(906013) + '">' + getHTMLString(906013) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="70" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=70" onclick="page_data_load(\'status-and-support\');"><span id="lang906014" title="' + getHTMLString(906014) + '">' + getHTMLString(906014) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="71" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=71" onclick="page_data_load(\'status-and-support\');"><span id="lang906015" title="' + getHTMLString(906015) + '">' + getHTMLString(906015) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="28" class="menuItem"><a href="#sub=28" onclick="page_data_load(\'status-and-support\');"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="4" class="menuItem"><a href="#sub=4" onclick="page_data_load(\'status-and-support\');"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="41" class="menuItem"><a href="#sub=41" onclick="page_data_load(\'status-and-support\');"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="6" class="menuItem"><a href="#sub=6" onclick="page_data_load(\'status-and-support\');"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';
        if (sys_phone_service /* || (usermode == 'admin')*/) {
            html_out += '<li id="87" class="menuItem"><a href="#sub=87" onclick="page_data_load(\'status-and-support\');"><span id="lang616001" title="' + getHTMLString(616001) + '">' + getHTMLString(616001) + '</span></a>'; //VOIP Diagnostics
            html_out += '</li>';
        }
        html_out += '<li id="98" class="menuItem"><a href="#sub=98" onclick="page_data_load(\'status-and-support\');"><span id="lang906019">' + getHTMLString(906019) + '</span></a>'; //Port Mirroring
        html_out += '</li>';
        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}
=======

function chkPageSelect(page, dropDownBasExp) {
    var reloadPage = false;

    var locationInfo = window.location.toString().split("#");
    var pageId = locationInfo[1];
    if (typeof (pageId) == 'undefined') {
        //alert('undefined');
        reloadPage = true;
    }

    if (page != "overview") {
        if (page == "phone") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=7", "sub=8");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=7", "sub=8", "sub=13", "sub=16", "sub=79");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=7", "sub=8", "sub=13", "sub=16", "sub=79", "sub=20");

            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=7";
                reloadPage = true;
            }
        }
        if (page == "internet") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=26", "sub=29");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=26", "sub=27", "sub=23", "sub=29", "sub=85", "sub=22");
            //
            if (sys_umts_status) { //umts status enable(all)
                ary_sub_page.push("sub=89");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                if (sys_umts_status) { //umts status enable
                    pageId = "sub=89";
                } else {
                    pageId = "sub=26";
                }
                reloadPage = true;
            }
        }
        if (page == "wifi") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=35", "sub=36");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=35", "sub=36", "sub=38");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=35", "sub=36", "sub=38", "sub=40");
            //
            if (sys_type !== 'ER') { //WPS enable(all)
                ary_sub_page.push("sub=37");
            }
            if (sys_fon_status) { //FON status enable(admin)
                ary_sub_page.push("sub=102");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=35";
                reloadPage = true;
            }
        }
        if (page == "settings") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=77", "sub=56", "sub=56&subSub=57");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=77", "sub=58", "sub=56", "sub=56&subSub=57", "sub=56&subSub=51", "sub=56&subSub=50", "sub=54", "sub=68");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=77", "sub=60", "sub=58", "sub=56", "sub=56&subSub=57", "sub=56&subSub=51", "sub=56&subSub=50", "sub=54", "sub=52", "sub=68", "sub=59", "sub=73", "sub=74", "sub=75", "sub=80", "sub=68", "sub=301", "sub=303", "sub=86", "sub=93");
            //
            if (dropDownBasExp == "expert" && sys_umts_status) {  //umts status enable(expert)
                ary_sub_page.push("sub=88");
            }
            if (dropDownBasExp == "admin" && sys_umts_status) {  //umts status enable(admin)
                ary_sub_page.push("sub=88");
            }
            if (dropDownBasExp == "admin" && sys_ipv6_status) {  //IPv6 status enable(admin)
                ary_sub_page.push("sub=97");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=77";
                reloadPage = true;
            }
        }
        if (page == "status-and-support") {
            if (dropDownBasExp == "basic")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=42");
            if (dropDownBasExp == "expert")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=42");
            if (dropDownBasExp == "admin")
                var ary_sub_page = Array("sub=1", "sub=1&subSub=3", "sub=1&subSub=82", "sub=1&subSub=67", "sub=1&subSub=70", "sub=1&subSub=71", "sub=28", "sub=4", "sub=41", "sub=6", "sub=87", "sub=98", "sub=42");
            //
            if (dropDownBasExp == "admin" && sys_umts_status) { //umts status enable(admin)
                ary_sub_page.push("sub=1&subSub=44");
            }
            //
            if (!in_array(pageId, ary_sub_page)) {
                pageId = "sub=1";
                reloadPage = true;
            }
        }

        sys_pageid = pageId;
        if (reloadPage) {
            window.parent.location = locationInfo[0] + "#" + pageId;
        }
    } else {
        sys_pageid = pageId;
    }
}

function header_init(page, dropDownBasExp) {
    var html_out = "";
    html_out += '<div id="head-wrap" class="clearfix">';
    html_out += '<a href="overview.html" class="logos"><img src="img/logos/entry-level.png" alt="Sercomm Logo" /></a>';


    
        if ((usermode != 'admin')&&(sys_username == null || sys_username.length == ""))
        {
         var connect3=   'wizard_er.html?page=connect3&_='+new Date().getTime();
           
             html_out =html_out+  '<a href="'+connect3+'" id="logout">&nbsp;</a>';
               
        }else        
        html_out += '<a href="index.html" id="logout">&nbsp;</a>';
    
    if (dropDownBasExp == "basic")
        html_out += '<div href="#" id="basexp" class="' + dropDownBasExp + ' closed" style="display: none;"><span id="lang700056" title="' + getHTMLString(700056) + '">' + getHTMLString(700056) + '</span></div>';
    else if (dropDownBasExp == "expert")
        html_out += '<div href="#" id="basexp" class="' + dropDownBasExp + ' closed" style="display: none;"><span id="lang700057" title="' + getHTMLString(700057) + '">' + getHTMLString(700057) + '</span></div>';
    html_out += '<div id="dropDownBasExp" class="' + dropDownBasExp + '" style="display: none;">';
    html_out += '<div href="" id="selectBasic" class="selectBasic"><span id="lang700056" title="' + getHTMLString(700056) + '">' + getHTMLString(700056) + '</span></div>';
    html_out += '<div href="" id="selectExpert" class="selectExpert"><span id="lang700057" title="' + getHTMLString(700057) + '">' + getHTMLString(700057) + '</span></div>';
    html_out += '</div>';
    html_out += '</div>';

    html_out += '<nav>';
    //<!-- main navigation START -->
    if (sys_phone_service /* || (usermode == 'admin')*/)
        html_out += '<ul class="clearfix six ' + page + 'Menu ">';
    else
    {
        if (usermode == 'admin') {
            html_out += '<ul class="clearfix five ' + page + 'Menu ">';
        } else {
            html_out += '<ul class="clearfix four ' + page + 'Menu ">';
        }
    }
    if (page == "overview")
        html_out += '<li id="overview" class="active"><a href="overview.html"><span id="lang700031" title="' + getHTMLString(700031) + '">' + getHTMLString(700031) + '</span></a></li>';
    else
        html_out += '<li id="overview"><a href="overview.html"><span id="lang700031" title="' + getHTMLString(700031) + '">' + getHTMLString(700031) + '</span></a></li>';

    if (sys_phone_service /* || (usermode == 'admin')*/) {
        if (page == "phone")
            html_out += '<li id="phone" class="active"><a href="phone.html#sub=7"><span id="lang700032" title="' + getHTMLString(700032) + '">' + getHTMLString(700032) + '</span></a></li>';
        else
            html_out += '<li id="phone"><a href="phone.html#sub=7"><span id="lang700032" title="' + getHTMLString(700032) + '">' + getHTMLString(700032) + '</span></a></li>';
    }

    if (page == "internet")
        html_out += '<li id="internet" class="active"><a href="internet.html#sub=89"><span id="lang700033" title="' + getHTMLString(700033) + '">' + getHTMLString(700033) + '</span></a></li>';
    else
        html_out += '<li id="internet"><a href="internet.html#sub=89"><span id="lang700033" title="' + getHTMLString(700033) + '">' + getHTMLString(700033) + '</span></a></li>';
    if (usermode == 'admin') {
        if (page == "wifi")
            html_out += '<li id="wifi" class="active"><a href="wifi.html#sub=35"><span id="lang700034" title="' + getHTMLString(700034) + '">' + getHTMLString(700034) + '</span></a></li>';
        else
            html_out += '<li id="wifi"><a href="wifi.html#sub=35"><span id="lang700034" title="' + getHTMLString(700034) + '">' + getHTMLString(700034) + '</span></a></li>';
    }
    if (page == "settings")
        html_out += '<li id="settings" class="active"><a href="settings.html#sub=77"><span id="lang700035" title="' + getHTMLString(700035) + '">' + getHTMLString(700035) + '</span></a></li>';
    else
        html_out += '<li id="settings"><a href="settings.html#sub=77"><span id="lang700035" title="' + getHTMLString(700035) + '">' + getHTMLString(700035) + '</span></a></li>';

    if (page == "status-and-support")
        html_out += '<li id="status-and-support" class="active"><a href="status-and-support.html#sub=1"><span id="lang700036" title="' + getHTMLString(700036) + '">' + getHTMLString(700036) + '</span></a></li>';
    else
        html_out += '<li id="status-and-support"><a href="status-and-support.html#sub=1"><span id="lang700036" title="' + getHTMLString(700036) + '">' + getHTMLString(700036) + '</span></a></li>';

    html_out += '</ul>';
    //<!-- main navigation ENDE -->

    html_out += '</nav>';

    $("#header").html(html_out);
}

function navigation_init(page, dropDownBasExp) {
    if (dropDownBasExp == "basic")
        return navigation_basic_init(page);
    else if (dropDownBasExp == "expert")
        return navigation_expert_init(page);
    else if (dropDownBasExp == "admin")
        return navigation_admin_init(page);
}

function navigation_basic_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="exposed-host" class="menuItem">';
         html_out += '<a href="#sub=27"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="password" class="menuItem">';
         html_out += '<a href="#sub=60"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="iptv" class="menuItem">';
        //	html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        //	html_out += '</ul>';

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="voice-status" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';
        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        //	html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //html_out += '</li>';
        //	html_out += '</ul>';
        //	html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="'+getHTMLString(903013)+'">'+getHTMLString(903013)+'</span></a>'; //WAN
        //	html_out += '</li>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';
        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}

function navigation_expert_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wake-up-call" class="menuItem">';
        html_out += '<a href="#sub=13"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ringing-schedule" class="menuItem">';
        html_out += '<a href="#sub=16"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="call-settings" class="menuItem">';
        html_out += '<a href="#sub=79"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="exposed-host" class="menuItem">';
         html_out += '<a href="#sub=27"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';

         html_out += '<li id="parental-control" class="menuItem">';
         html_out += '<a href="#sub=23"><span id="lang903002" title="'+getHTMLString(903002)+'">'+getHTMLString(903002)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="dns-ddns" class="menuItem">';
        html_out += '<a href="#sub=29"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="upnp" class="menuItem">';
         html_out += '<a href="#sub=85"><span id="lang315001" title="'+getHTMLString(315001)+'">'+getHTMLString(315001)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="mac-filter" class="menuItem">';
        html_out += '<a href="#sub=38"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="password" class="menuItem">';
         html_out += '<a href="#sub=60"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="usb" class="menuItem">';
        html_out += '<a href="#sub=58"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="network-share-samba" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ftp" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="configuration" class="menuItem">';
        html_out += '<a href="#sub=54"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan" class="menuItem">';
        html_out += '<a href="#sub=52"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts-settings" class="menuItem">';
            html_out += '<a href="#sub=88"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        /*
         html_out += '<li id="iptv" class="menuItem">';
         html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
         html_out += '</li>';
         html_out += '</ul>';
         */

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="voice-status" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';


        html_out += '<li id="nat-mapping-table" class="menuItem">';
        html_out += '<a href="#sub=28"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="diagnostic-utility" class="menuItem">';
        html_out += '<a href="#sub=4"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="restart" class="menuItem">';
        html_out += '<a href="#sub=41"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="event-log" class="menuItem">';
        html_out += '<a href="#sub=6"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';

        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="13" class="menuItem"><a href="#sub=13" onclick="page_data_load(\'phone\');"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="16" class="menuItem"><a href="#sub=16" onclick="page_data_load(\'phone\');"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="79" class="menuItem"><a href="#sub=79" onclick="page_data_load(\'phone\');"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="'+getHTMLString(903006)+'">'+getHTMLString(903006)+'</span></a>';
         html_out += '</li>';
         html_out += '<li id="23" class="menuItem"><a href="#sub=23" onclick="page_data_load(\'internet\');"><span id="lang903002" title="'+getHTMLString(903002)+'">'+getHTMLString(903002)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="29" class="menuItem"><a href="#sub=29" onclick="page_data_load(\'internet\');"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="85" class="menuItem"><a href="#sub=85" onclick="page_data_load(\'internet\');"><span id="lang315001" title="'+getHTMLString(315001)+'">'+getHTMLString(315001)+'</span></a>';
         html_out += '</li>';
         html_out += '</ul>';
         */
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="38" class="menuItem"><a href="#sub=38" onclick="page_data_load(\'wifi\');"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="'+getHTMLString(905001)+'">'+getHTMLString(905001)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="58" class="menuItem"><a href="#sub=58" onclick="page_data_load(\'settings\');"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="51" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=51" onclick="page_data_load(\'settings\');"><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="50" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=50" onclick="page_data_load(\'settings\');"><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="54" class="menuItem"><a href="#sub=54" onclick="page_data_load(\'settings\');"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        /*
         html_out += '<li id="52" class="menuItem sub"><a href="#sub=52" onclick="page_data_load(\'settings\');"><span id="lang905009" title="'+getHTMLString(905009)+'">'+getHTMLString(905009)+'</span></a>';
         html_out += '</li>';
         */
        html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';

        //html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="88" class="menuItem"><a href="#sub=88" onclick="page_data_load(\'settings\');"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        if (sys_phone_service) {
            html_out += '<div class="subMenu" style="display: none;">';
            html_out += '<ul>';
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
            html_out += '</li>';
            html_out += '</ul>';
            html_out += '</div>';
        }
        html_out += '</li>';


        html_out += '<li id="28" class="menuItem"><a href="#sub=28" onclick="page_data_load(\'status-and-support\');"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="4" class="menuItem"><a href="#sub=4" onclick="page_data_load(\'status-and-support\');"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="41" class="menuItem"><a href="#sub=41" onclick="page_data_load(\'status-and-support\');"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="6" class="menuItem"><a href="#sub=6" onclick="page_data_load(\'status-and-support\');"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';


        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}

function navigation_admin_init(page) {
    var html_out = "";

    if (page == "overview") {
        html_out += '<ul class="navigation-overview" style="display: none;">';
        html_out += '</ul>';

        html_out += '<ul class="navigation-phone" style="display: none;">';
        html_out += '<li id="call-log" class="menuItem">';
        html_out += '<a href="#sub=7"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="contacts" class="menuItem">';
        html_out += '<a href="#sub=8"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wake-up-call" class="menuItem">';
        html_out += '<a href="#sub=13"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ringing-schedule" class="menuItem">';
        html_out += '<a href="#sub=16"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="call-settings" class="menuItem">';
        html_out += '<a href="#sub=79"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="phone-settings" class="menuItem">';
        html_out += '<a href="#sub=20"><span id="lang902014" title="' + getHTMLString(902014) + '">' + getHTMLString(902014) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '<ul class="navigation-internet" style="display: none;">';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts" class="menuItem">';
            html_out += '<a href="#sub=89"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="port-mapping" class="menuItem">';
        html_out += '<a href="#sub=26"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="exposed-host" class="menuItem">';
        html_out += '<a href="#sub=27"><span id="lang903006" title="' + getHTMLString(903006) + '">' + getHTMLString(903006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="parental-control" class="menuItem">';
        html_out += '<a href="#sub=23"><span id="lang903002" title="' + getHTMLString(903002) + '">' + getHTMLString(903002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="dns-ddns" class="menuItem">';
        html_out += '<a href="#sub=29"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="upnp" class="menuItem">';
        html_out += '<a href="#sub=85"><span id="lang315001" title="' + getHTMLString(315001) + '">' + getHTMLString(315001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="firewall" class="menuItem">';
        html_out += '<a href="#sub=22"><span id="lang903001" title="' + getHTMLString(903001) + '">' + getHTMLString(903001) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-wifi" style="display: none;">';
        html_out += '<li id="general" class="menuItem">';
        html_out += '<a href="#sub=35"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="schedule" class="menuItem">';
        html_out += '<a href="#sub=36"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="wps" class="menuItem">';
            html_out += '<a href="#sub=37"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="mac-filter" class="menuItem">';
        html_out += '<a href="#sub=38"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wifi-settings" class="menuItem">';
        html_out += '<a href="#sub=40"><span id="lang904006" title="' + getHTMLString(904006) + '">' + getHTMLString(904006) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="vf-wifi-network" class="menuItem">';
            html_out += '<a href="#sub=102"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';

        html_out += '<ul class="navigation-settings" style="display: none;">';
        html_out += '<li id="language" class="menuItem">';
        html_out += '<a href="#sub=77"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="password" class="menuItem">';
        html_out += '<a href="#sub=60"><span id="lang905001" title="' + getHTMLString(905001) + '">' + getHTMLString(905001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="usb" class="menuItem">';
        html_out += '<a href="#sub=58"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="content-sharing" class="menuItem sub">';
        html_out += '<a href="#sub=56"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="dlna" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="network-share-samba" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="ftp" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub="><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="configuration" class="menuItem">';
        html_out += '<a href="#sub=54"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan" class="menuItem">';
        html_out += '<a href="#sub=52"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="firmware-update" class="menuItem">';
        html_out += '<a href="#sub=59"><span id="lang905002" title="' + getHTMLString(905002) + '">' + getHTMLString(905002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="qos" class="menuItem">';
        html_out += '<a href="#sub=73"><span id="lang905018" title="' + getHTMLString(905018) + '">' + getHTMLString(905018) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="internet-time" class="menuItem">';
        html_out += '<a href="#sub=74"><span id="lang513001" title="' + getHTMLString(513001) + '">' + getHTMLString(513001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="tr-069" class="menuItem">';
        html_out += '<a href="#sub=75"><span id="lang905019" title="' + getHTMLString(905019) + '">' + getHTMLString(905019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="settings-access-control" class="menuItem">';
        html_out += '<a href="#sub=80"><span id="lang906017" title="' + getHTMLString(906017) + '">' + getHTMLString(906017) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="umts-settings" class="menuItem">';
            html_out += '<a href="#sub=88"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }

        html_out += '<li id="wan" class="menuItem">';
        html_out += '<a href="#sub=68"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';
        html_out += '<li id="pppoe_relay" class="menuItem">';
        html_out += '<a href="#sub=302"><span id="lang1301402">' + getHTMLString(526028) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="vlan_settings" class="menuItem">';
        html_out += '<a href="#sub=301"><span id="lang1301402">' + getHTMLString(1301402) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="syslog_client" class="menuItem">';
        html_out += '<a href="#sub=303"><span id="lang1310572">'+getHTMLString(1310572)+'</span></a>'; //Syslog Client
        html_out += '</li>';	
        html_out += '<li id="iptv" class="menuItem">';
        //	html_out += '<a href="#sub=300"><span id="lang606029">'+getHTMLString(606029)+'</span></a>'; //IPTV
        //	html_out += '</li>';
        if (sys_ipv6_status) { //IPv6 status enable
            html_out += '<li id="ipv6-basic-configuration" class="menuItem">';
            html_out += '<a href="#sub=97"><span id="lang905023">' + getHTMLString(905023) + '</span></a>'; //IPv6 Basic Configuration
            html_out += '</li>';
        }
        html_out += '<li id="static-routing" class="menuItem">';
        html_out += '<a href="#sub=86"><span id="lang522001" title="' + getHTMLString(522001) + '">' + getHTMLString(522001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="policy-routing" class="menuItem">';
        html_out += '<a href="#sub=93"><span id="lang903018" title="' + getHTMLString(903018) + '">' + getHTMLString(903018) + '</span></a>'; //Policy Routing
        html_out += '</li>';
        html_out += '</ul>';

        html_out += '<ul class="navigation-status-and-support" style="display: none;">';
        html_out += '<li id="status" class="menuItem sub">';
        html_out += '<a href="#sub=1"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';
        html_out += '<li id="voice-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="adsl-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906012" title="' + getHTMLString(906012) + '">' + getHTMLString(906012) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="wan-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906013" title="' + getHTMLString(906013) + '">' + getHTMLString(906013) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="lan-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906014" title="' + getHTMLString(906014) + '">' + getHTMLString(906014) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="routing-status" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&amp;subSub="><span id="lang906015" title="' + getHTMLString(906015) + '">' + getHTMLString(906015) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="nat-mapping-table" class="menuItem">';
        html_out += '<a href="#sub=28"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="diagnostic-utility" class="menuItem">';
        html_out += '<a href="#sub=4"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="restart" class="menuItem">';
        html_out += '<a href="#sub=41"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="event-log" class="menuItem">';
        html_out += '<a href="#sub=6"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="voip-diagnostics" class="menuItem">';
        html_out += '<a href="#sub=87"><span id="lang616001" title="' + getHTMLString(616001) + '">' + getHTMLString(616001) + '</span></a>'; //VOIP Diagnostics
        html_out += '</li>';
        html_out += '<li id="port-mirroring" class="menuItem">';
        html_out += '<a href="#sub=98"><span id="lang906019">' + getHTMLString(906019) + '</span></a>'; //Port Mirroring
        html_out += '</li>';
        html_out += '<li id="about" class="menuItem">';
        html_out += '<a href="#sub=42"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "phone") {
        html_out += '<ul>';
        html_out += '<li id="7" class="menuItem"><a href="#sub=7" onclick="page_data_load(\'phone\');"><span id="lang902001" title="' + getHTMLString(902001) + '">' + getHTMLString(902001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="8" class="menuItem"><a href="#sub=8" onclick="page_data_load(\'phone\');"><span id="lang902002" title="' + getHTMLString(902002) + '">' + getHTMLString(902002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="13" class="menuItem"><a href="#sub=13" onclick="page_data_load(\'phone\');"><span id="lang902007" title="' + getHTMLString(902007) + '">' + getHTMLString(902007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="16" class="menuItem"><a href="#sub=16" onclick="page_data_load(\'phone\');"><span id="lang902010" title="' + getHTMLString(902010) + '">' + getHTMLString(902010) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="79" class="menuItem"><a href="#sub=79" onclick="page_data_load(\'phone\');"><span id="lang902019" title="' + getHTMLString(902019) + '">' + getHTMLString(902019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="20" class="menuItem"><a href="#sub=20" onclick="page_data_load(\'phone\');"><span id="lang902014" title="' + getHTMLString(902014) + '">' + getHTMLString(902014) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "internet") {
        html_out += '<ul>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="89" class="menuItem"><a href="#sub=89" onclick="page_data_load(\'internet\');"><span id="lang903016" title="' + getHTMLString(903016) + '">' + getHTMLString(903016) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="26" class="menuItem"><a href="#sub=26" onclick="page_data_load(\'internet\');"><span id="lang903005" title="' + getHTMLString(903005) + '">' + getHTMLString(903005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="27" class="menuItem"><a href="#sub=27" onclick="page_data_load(\'internet\');"><span id="lang903006" title="' + getHTMLString(903006) + '">' + getHTMLString(903006) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="23" class="menuItem"><a href="#sub=23" onclick="page_data_load(\'internet\');"><span id="lang903002" title="' + getHTMLString(903002) + '">' + getHTMLString(903002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="29" class="menuItem"><a href="#sub=29" onclick="page_data_load(\'internet\');"><span id="lang903008" title="' + getHTMLString(903008) + '">' + getHTMLString(903008) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="85" class="menuItem"><a href="#sub=85" onclick="page_data_load(\'internet\');"><span id="lang315001" title="' + getHTMLString(315001) + '">' + getHTMLString(315001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="22" class="menuItem"><a href="#sub=22" onclick="page_data_load(\'internet\');"><span id="lang903001" title="' + getHTMLString(903001) + '">' + getHTMLString(903001) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }

    if (page == "wifi") {
        html_out += '<ul>';
        html_out += '<li id="35" class="menuItem"><a href="#sub=35" onclick="page_data_load(\'wifi\');"><span id="lang904001" title="' + getHTMLString(904001) + '">' + getHTMLString(904001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="36" class="menuItem"><a href="#sub=36" onclick="page_data_load(\'wifi\');"><span id="lang904002" title="' + getHTMLString(904002) + '">' + getHTMLString(904002) + '</span></a>';
        html_out += '</li>';
        if (sys_type !== 'ER') { //WPS enable(all)
            html_out += '<li id="37" class="menuItem"><a href="#sub=37" onclick="page_data_load(\'wifi\');"><span id="lang904003" title="' + getHTMLString(904003) + '">' + getHTMLString(904003) + '</span></a>';
            html_out += '</li>';
        }
        html_out += '<li id="38" class="menuItem"><a href="#sub=38" onclick="page_data_load(\'wifi\');"><span id="lang904004" title="' + getHTMLString(904004) + '">' + getHTMLString(904004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="40" class="menuItem"><a href="#sub=40" onclick="page_data_load(\'wifi\');"><span id="lang904006" title="' + getHTMLString(904006) + '">' + getHTMLString(904006) + '</span></a>';
        html_out += '</li>';
        if (sys_fon_status) { //FON status enable(admin)
            html_out += '<li id="102" class="menuItem"><a href="#sub=102" onclick="page_data_load(\'wifi\');"><span id="lang904008" title="' + getHTMLString(904008) + '">' + getHTMLString(904008) + '</span></a>'; //VF WiFi network
            html_out += '</li>';
        }
        html_out += '</ul>';
    }

    if (page == "settings") {
        html_out += '<ul>';
        html_out += '<li id="77" class="menuItem"><a href="#sub=77" onclick="page_data_load(\'settings\');"><span id="lang905021" title="' + getHTMLString(905021) + '">' + getHTMLString(905021) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="60" class="menuItem"><a href="#sub=60" onclick="page_data_load(\'settings\');"><span id="lang905001" title="' + getHTMLString(905001) + '">' + getHTMLString(905001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="58" class="menuItem"><a href="#sub=58" onclick="page_data_load(\'settings\');"><span id="lang905003" title="' + getHTMLString(905003) + '">' + getHTMLString(905003) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="56" class="menuItem sub"><a href="#sub=56" onclick="page_data_load(\'settings\');"><span id="lang505001" title="' + getHTMLString(505001) + '">' + getHTMLString(505001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none; height: 0px;">';
        html_out += '<ul>';
        html_out += '<li id="57" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=57" onclick="page_data_load(\'settings\');"><span id="lang905004" title="' + getHTMLString(905004) + '">' + getHTMLString(905004) + '</span></a>'; //DLNA
        html_out += '</li>';
        html_out += '<li id="51" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=51" onclick="page_data_load(\'settings\');"><span id="lang505005" title="' + getHTMLString(505005) + '">' + getHTMLString(505005) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="50" class="subMenuItem sub">';
        html_out += '<a href="#sub=56&amp;subSub=50" onclick="page_data_load(\'settings\');"><span id="lang905011" title="' + getHTMLString(905011) + '">' + getHTMLString(905011) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="54" class="menuItem"><a href="#sub=54" onclick="page_data_load(\'settings\');"><span id="lang905007" title="' + getHTMLString(905007) + '">' + getHTMLString(905007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="52" class="menuItem"><a href="#sub=52" onclick="page_data_load(\'settings\');"><span id="lang905009" title="' + getHTMLString(905009) + '">' + getHTMLString(905009) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="59" class="menuItem"><a href="#sub=59" onclick="page_data_load(\'settings\');"><span id="lang905002" title="' + getHTMLString(905002) + '">' + getHTMLString(905002) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="73" class="menuItem"><a href="#sub=73" onclick="page_data_load(\'settings\');"><span id="lang905018" title="' + getHTMLString(905018) + '">' + getHTMLString(905018) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="74" class="menuItem"><a href="#sub=74" onclick="page_data_load(\'settings\');"><span id="lang513001" title="' + getHTMLString(513001) + '">' + getHTMLString(513001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="75" class="menuItem"><a href="#sub=75" onclick="page_data_load(\'settings\');"><span id="lang905019" title="' + getHTMLString(905019) + '">' + getHTMLString(905019) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="80" class="menuItem"><a href="#sub=80" onclick="page_data_load(\'settings\');"><span id="lang906017" title="' + getHTMLString(906017) + '">' + getHTMLString(906017) + '</span></a>';
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="88" class="menuItem"><a href="#sub=88" onclick="page_data_load(\'settings\');"><span id="lang903015" title="' + getHTMLString(903015) + '">' + getHTMLString(903015) + '</span></a>'; //UMTS
            html_out += '</li>';
        }
        html_out += '<li id="68" class="menuItem"><a href="#sub=68" onclick="page_data_load(\'settings\');"><span id="lang903013" title="' + getHTMLString(903013) + '">' + getHTMLString(903013) + '</span></a>'; //WAN
        html_out += '</li>';
        html_out += '<li id="302" class="menuItem"><a href="#sub=302" onclick="page_data_load(\'settings\');"><span id="lang1301402">' + getHTMLString(526028) + '</span></a>'; //PPPoE Relay
        html_out += '</li>';
        html_out += '<li id="301" class="menuItem"><a href="#sub=301" onclick="page_data_load(\'settings\');"><span id="lang1301402">' + getHTMLString(1301402) + '</span></a>'; //VLAN
        html_out += '</li>';
        html_out += '<li id="300" class="menuItem"><a href="#sub=300" onclick="page_data_load(\'settings\');"><span id="lang606029">' + getHTMLString(606029) + '</span></a>'; //IPTV
        html_out += '</li>';
        html_out += '<li id="303" class="menuItem"><a href="#sub=303" onclick="page_data_load(\'settings\');"><span id="lang1310572">'+getHTMLString(1310572)+'</span></a>'; //Syslog Client
        html_out += '</li>';

        if (sys_ipv6_status) { //IPv6 status enable
            html_out += '<li id="97" class="menuItem"><a href="#sub=97" onclick="page_data_load(\'settings\');"><span id="lang905023">' + getHTMLString(905023) + '</span></a>'; //IPv6 Basic Configuration
            html_out += '</li>';
        }
        html_out += '<li id="86" class="menuItem"><a href="#sub=86" onclick="page_data_load(\'settings\');"><span id="lang522001" title="' + getHTMLString(522001) + '">' + getHTMLString(522001) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="93" class="menuItem"><a href="#sub=93" onclick="page_data_load(\'settings\');"><span id="lang903018" title="' + getHTMLString(903018) + '">' + getHTMLString(903018) + '</span></a>'; //Policy Routing
        html_out += '</li>';

        html_out += '</ul>';
    }

    if (page == "status-and-support") {
        html_out += '<ul>';
        html_out += '<li id="1" class="menuItem sub"><a href="#sub=1" onclick="page_data_load(\'status-and-support\');"><span id="lang906001" title="' + getHTMLString(906001) + '">' + getHTMLString(906001) + '</span></a>';
        html_out += '<div class="subMenu" style="display: none;">';
        html_out += '<ul>';

        if (sys_phone_service /* || (usermode == 'admin')*/) {
            html_out += '<li id="3" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=3" onclick="page_data_load(\'status-and-support\');"><span id="lang906003" title="' + getHTMLString(906003) + '">' + getHTMLString(906003) + '</span></a>';  // Voice Status
            html_out += '</li>';
        }

        html_out += '<li id="82" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=82" onclick="page_data_load(\'status-and-support\');"><span id="lang907003" title="' + getHTMLString(907003) + '">' + getHTMLString(907003) + '</span></a>'; //Fibre Status
        html_out += '</li>';
        if (sys_umts_status) { //umts status enable
            html_out += '<li id="44" class="subMenuItem sub">';
            html_out += '<a href="#sub=1&subSub=44" onclick="page_data_load(\'status-and-support\');"><span id="lang906010" title="' + getHTMLString(906010) + '">' + getHTMLString(906010) + '</span></a>'; //UMTS Status
            html_out += '</li>';
        }
        html_out += '<li id="67" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=67" onclick="page_data_load(\'status-and-support\');"><span id="lang906013" title="' + getHTMLString(906013) + '">' + getHTMLString(906013) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="70" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=70" onclick="page_data_load(\'status-and-support\');"><span id="lang906014" title="' + getHTMLString(906014) + '">' + getHTMLString(906014) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="71" class="subMenuItem sub">';
        html_out += '<a href="#sub=1&subSub=71" onclick="page_data_load(\'status-and-support\');"><span id="lang906015" title="' + getHTMLString(906015) + '">' + getHTMLString(906015) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
        html_out += '</div>';
        html_out += '</li>';
        html_out += '<li id="28" class="menuItem"><a href="#sub=28" onclick="page_data_load(\'status-and-support\');"><span id="lang903007" title="' + getHTMLString(903007) + '">' + getHTMLString(903007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="4" class="menuItem"><a href="#sub=4" onclick="page_data_load(\'status-and-support\');"><span id="lang906004" title="' + getHTMLString(906004) + '">' + getHTMLString(906004) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="41" class="menuItem"><a href="#sub=41" onclick="page_data_load(\'status-and-support\');"><span id="lang906007" title="' + getHTMLString(906007) + '">' + getHTMLString(906007) + '</span></a>';
        html_out += '</li>';
        html_out += '<li id="6" class="menuItem"><a href="#sub=6" onclick="page_data_load(\'status-and-support\');"><span id="lang906006" title="' + getHTMLString(906006) + '">' + getHTMLString(906006) + '</span></a>';
        html_out += '</li>';
        if (sys_phone_service /* || (usermode == 'admin')*/) {
            html_out += '<li id="87" class="menuItem"><a href="#sub=87" onclick="page_data_load(\'status-and-support\');"><span id="lang616001" title="' + getHTMLString(616001) + '">' + getHTMLString(616001) + '</span></a>'; //VOIP Diagnostics
            html_out += '</li>';
        }
        html_out += '<li id="98" class="menuItem"><a href="#sub=98" onclick="page_data_load(\'status-and-support\');"><span id="lang906019">' + getHTMLString(906019) + '</span></a>'; //Port Mirroring
        html_out += '</li>';
        html_out += '<li id="42" class="menuItem"><a href="#sub=42" onclick="page_data_load(\'status-and-support\');"><span id="lang906008" title="' + getHTMLString(906008) + '">' + getHTMLString(906008) + '</span></a>';
        html_out += '</li>';
        html_out += '</ul>';
    }


    return html_out;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
