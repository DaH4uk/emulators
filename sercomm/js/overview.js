
function page_overview_init() {
    var data = '?_=' + new Date().getTime();

    if (sys_phone_service /* || (usermode == 'admin')*/) { //all
        $('#overviewContent').load('./overview_int_all.html' + data, function (response, status, xhr) {
            var tmp_js_ary = ['js/overview_int_all.js'];
            getScriptByArray(tmp_js_ary);
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    } else { //not phone
        $('#overviewContent').load('./overview_int_notphone.html' + data, function (response, status, xhr) {
            var tmp_js_ary = ['js/overview_int_notphone.js'];

            getScriptByArray(tmp_js_ary, ret_overview_int_notphone);

            function ret_overview_int_notphone(response, status) {
                $('html.product16').addClass('task8');
            }
            //alert(response);
            //alert(status);
            //alert(xhr);
        });

    }
}
