
function page_data_load(page) {
    if (chkUserDataModification())
        return false;

    //activation
    if (page == "activation")
    {
        page_activation_load();
        return true;
    }

    if (page == "overview" || page == "phone" || page == "internet" ||
            page == "wifi" || page == "settings" || page == "status-and-support") {
        loginUserChkLoginTimeout.set(sys_username, loginUserChkLoginTimeoutRet, 'login');

        setTimeout(function () { //waiting page id changed
            if (page == "overview") {
                var JSONSource = './data/' + page + '.json?_=' + new Date().getTime();
                $.getJSON(JSONSource, function (data) {
                    //Invalid filter
                    data = filterInvalidString(data);

                    page_data_already_load(page, data);
                });
            } else {
                page_data_already_load(page, null);
            }
        }, 400);
    } else {

        var JSONSource = './data/' + page + '.json?_=' + new Date().getTime();

        $.getJSON(JSONSource, function (data) {
            //Invalid filter
            data = filterInvalidString(data);

            page_data_already_load(page, data);
        });
    }
}

function page_data_already_load(page, data) {
    //overview
    if (page == "overview")
        page_overview_load(data);

    //phone
    if (page == "phone")
        page_phone_load();
    if (page == "phone_call_log")
        page_phone_call_log_load(data);
    if (page == "phone_contacts")
        page_phone_contacts_load(data);
    if (page == "phone_wake_up_call")
        page_phone_wake_up_call_load(data);
    if (page == "phone_ringing_schedule")
        page_phone_ringing_schedule_load(data);
    if (page == "phone_phone_settings")
        page_phone_phone_settings_load(data);

    //internet
    if (page == "internet")
        page_internet_load();
    if (page == "internet_port_mappin")
        page_internet_port_mappin_load(data);
    if (page == "internet_dmz")
        page_internet_dmz_load(data);
    if (page == "internet_parental_control")
        page_internet_parental_control_load(data);

    //wifi
    if (page == "wifi")
        page_wifi_load();
    if (page == "wifi_general")
        page_wifi_general_load(data);
    if (page == "wifi_wps")
        page_wifi_wps_load(data);

    //settings
    if (page == "settings")
        page_settings_load();
    if (page == "settings_password")
        page_settings_password_load(data);
    if (page == "settings_configuration")
        page_settings_configuration_load(data);
    if (page == "settings_fw_update")
        page_settings_fw_update_load(data);

    //status-and-support
    if (page == "status-and-support")
        page_statussupport_load();
}

function page_data_send(send_url, in_data, func_back) {
    var input_url = send_url + '?_=' + new Date().getTime();
    $.post(input_url, in_data, function (data, textStatus, jqXHR) {
        if (logMessage && window.console)
            console.log("post " + input_url + ":" + textStatus);

        if (func_back != null)
            func_back(data, textStatus, jqXHR);
    });
}

function dataBatchSend(obj, func, send_url) {
    if (send_url == undefined)
        return;
    else
        send_url = "./data/" + send_url + ".json";
    var in_data = "";

    for (var key in obj) {
        var nameObj = obj[key]["nameObj"];
        var value = obj[key]["value"];
        //Invalid filter
        value = filterInvalidString(value);

        if (key == "0")
            in_data = nameObj.id + "=" + encodeURIComponent(value);
        else
            in_data += "&" + nameObj.id + "=" + encodeURIComponent(value);
    }

    //page_data_send(send_url, in_data, func);
    //modify 20131016
    if (usermode == '') { //not login
        $.post("./data/reset.json" + '?_=' + new Date().getTime(), "chk_sys_busy=" + encodeURIComponent(sys_username), function (data, textStatus, jqXHR) {
            if (data == "1") {
                window.parent.location = 'fw_upgrade_progress.html';
            } else {
                page_data_send(send_url, in_data, func);
            }
        });
    } else {
        $.post("./data/reset.json" + '?_=' + new Date().getTime(), "chk_sys_busy=" + encodeURIComponent(sys_username), function (data, textStatus, jqXHR) {
            if (data == "1") {
                window.parent.location = 'fw_upgrade_progress.html';
            } else {
                loginUserChkLoginTimeout.set(sys_username, loginUserChkLoginTimeoutRet, 'login');
                page_data_send(send_url, in_data, func);
            }
        });
    }
    //add end

    return true;
}

function Scalar(name, id) {
    this.name = name;
    this.id = id;
    this.set = function (value, func, send_url) {
        if (send_url == undefined)
            return;
        else
            send_url = "./data/" + send_url + ".json";

        //Invalid filter
        value = filterInvalidString(value);

        var in_data = this.id + "=" + encodeURIComponent(value);

        //page_data_send(send_url, in_data, func);
        //modify 20131016
        if (usermode == '') { //not login
            $.post("./data/reset.json" + '?_=' + new Date().getTime(), "chk_sys_busy=" + encodeURIComponent(sys_username), function (data, textStatus, jqXHR) {
                if (data == "1") {
                    window.parent.location = 'fw_upgrade_progress.html';
                } else {
                    page_data_send(send_url, in_data, func);
                }
            });
        } else {
            if (name == 'loginUserChkLoginTimeout') {
                page_data_send(send_url, in_data, func);
            } else {
                $.post("./data/reset.json" + '?_=' + new Date().getTime(), "chk_sys_busy=" + encodeURIComponent(sys_username), function (data, textStatus, jqXHR) {
                    if (data == "1") {
                        window.parent.location = 'fw_upgrade_progress.html';
                    } else {
                        loginUserChkLoginTimeout.set(sys_username, loginUserChkLoginTimeoutRet, 'login');
                        page_data_send(send_url, in_data, func);
                    }
                });
            }
        }
        //add end

        return true;
    };
}
//justin add 20140326
function filterInvalidString(data) {
    if (logMessage && window.console)
        console.log('filterInvalidString : ' + typeof (data));

    if (typeof (data) == 'object') {
        data = replaceXssByJSON(data);

    } else if ((typeof (data) == 'string') && (data.length >= 2)) {
        var tmp_first = data.slice(0, 1);
        var tmp_last = data.slice(-1);
        if ((tmp_first == '[' && tmp_last == ']') || (tmp_first == '{' && tmp_last == '}')) { //JSON data
            var tmp_obj = jQuery.parseJSON(data);
            tmp_obj = replaceXssByJSON(tmp_obj);
            data = JSONToString(tmp_obj, tmp_first, tmp_last);

        } else { //string
            data = replaceXssByString(data);

        }
    } else if (typeof (data) == 'string') { //string
        data = replaceXssByString(data);

    } else { //unknow
        data = replaceXssByString(data.toString());
    }

    return data;
}

function JSONToString(obj, first_s, last_s) {
    var data = first_s;
    var have_data = false;
    $.each(obj, function (key, val) {
        if (!have_data)
            have_data = true;

        if (typeof (val) == 'object') {
            data += JSONToString(val, '{', '}') + ',';
        } else {
            data += '"' + key + '":"' + val + '",';
        }
    });

    if (have_data)
        data = data.slice(0, -1);
    data += last_s;

    return data;
}

function replaceXssByJSON(obj) {
    $.each(obj, function (key, val) {
        if (typeof (val) == 'object') {
            replaceXssByJSON(val);
        } else {
            obj[key] = replaceXssByString(val.toString());
        }
    });

    return obj;
}

function replaceXssByString(data) {
    //filter &
    var testdata = data.toLowerCase();
    var rege1 = new RegExp('&lt');
    var rege2 = new RegExp('&gt');
    var rege3 = new RegExp('&#');
    while (rege1.test(testdata) || rege2.test(testdata) || rege3.test(testdata)) {
        if (logMessage && window.console)
            console.log('filterInvalidString!');

        testdata = testdata.replace('&', ''); //& amp;
        data = data.replace('&', ''); //& amp;
    }
    //filter other
    var rege = /[<>"'\\]/;
    while (rege.test(data)) {
        if (logMessage && window.console)
            console.log('filterInvalidString!');

        //data = data.replace('&', ''); //& amp;
        data = data.replace('<', ''); //& lt;
        data = data.replace('>', ''); //& gt;
        data = data.replace('"', ''); //& #34;
        data = data.replace("'", ''); //& #39;
        //data = data.replace("\/", ''); //& #47;
        data = data.replace("\\", ''); //& #92;
    }

    return data;
}
//justin add end

//justin add
var userDataPageId = new Scalar("userDataPageId", "pageid");
var userDataDropDownBasExp = new Scalar("userDataDropDownBasExp", "dropDownBasExp");
var userDataLangCode = new Scalar("userDataLangCode", "lang_code");
var LoginName = new Scalar("LoginName", "LoginName");
var LoginPWD = new Scalar("LoginPWD", "LoginPWD");
var loginUserResetToDefault = new Scalar("loginUserResetToDefault", "loginUserResetToDefault");
var loginUserChkLoginTimeout = new Scalar("loginUserChkLoginTimeout", "loginUserChkLoginTimeout");

var remoteAccessLoginName = new Scalar("remoteAccessLoginName", "remoteAccessLoginName"); //20131001
var remoteAccessLoginPassword = new Scalar("remoteAccessLoginPassword", "remoteAccessLoginPassword");

var overviewGetConnectionTrainingStatus = new Scalar("overviewGetConnectionTrainingStatus", "GetConnectionTrainingStatus");
var overviewMSGDefaultConfiguration = new Scalar("overviewMSGDefaultConfiguration", "MSGDefaultConfiguration");
var overviewMSGDefaultWIFI = new Scalar("overviewMSGDefaultWIFI", "MSGDefaultWIFI");
var overviewMSGActivation = new Scalar("overviewMSGActivation", "MSGActivation");
var overviewMSGExpertMode = new Scalar("overviewMSGExpertMode", "MSGExpertMode");
var overviewMSGNeedNewWPS = new Scalar("overviewMSGNeedNewWPS", "MSGNeedNewWPS");
var overviewMSGDefaultWPS = new Scalar("overviewMSGDefaultWPS", "MSGDefaultWPS");

var phoneCallLogDeleteById = new Scalar("phoneCallLogDeleteById", "CallLogDeleteById");
//var phoneCallLogDeleteAll = new Scalar("phoneCallLogDeleteAll", "CallLogDeleteAll"); //20130905
var phoneCallLogCallById = new Scalar("phoneCallLogCallById", "CallLogCallById");
var phoneCallLogCallEnable = new Scalar("phoneCallLogCallEnable", "CallLogCallEnable");
var phoneCallLogGetActiveStatusById = new Scalar("phoneCallLogGetActiveStatusById", "CallLogGetActiveStatusById");

var phoneContactsDeleteById = new Scalar("phoneContactsDeleteById", "ContactsDeleteById");
var phoneContactsEditData = new Scalar("phoneContactsEditData", "ContactsEditData");
var phoneContactsAddData = new Scalar("phoneContactsAddData", "ContactsAddData");
var phoneContactsFileDownload = new Scalar("phoneContactsFileDownload", "ContactsFileDownload");

var phoneWakeUpCallEditData = new Scalar("phoneWakeUpCallEditData", "WakeUpCallEditData");

var phoneRingingScheduleEditData = new Scalar("phoneRingingScheduleEditData", "RingingScheduleEditData");

var internetPortMappingNATTraversal = new Scalar("internetPortMappingNATTraversal", "nat_traversal"); //20140417
var internetPortMappingEditData = new Scalar("internetPortMappingEditData", "PortMappingEditData");
var internetPortMappingIsIPaddrError = new Scalar("internetPortMappingIsIPaddrError", "PortMappingIsIPaddrError");
var internetPortMappingTriggerEditData = new Scalar("internetPortMappingTriggerEditData", "PortMappingTriggerEditData");
var internetPortMappingALGsSIP = new Scalar("internetPortMappingALGsSIP", "alg_sip");
var internetPortMappingALGsH323 = new Scalar("internetPortMappingALGsH323", "alg_h323");
var internetPortMappingALGsFTP = new Scalar("internetPortMappingALGsFTP", "alg_ftp");
var internetPortMappingALGsFTPPort = new Scalar("internetPortMappingALGsFTPPort", "alg_ftp_port"); //20140710
var internetPortMappingALGsL2TP = new Scalar("internetPortMappingALGsL2TP", "alg_l2tp");
var internetPortMappingALGsPPTP = new Scalar("internetPortMappingALGsPPTP", "alg_pptp");
var internetPortMappingALGsIPSE = new Scalar("internetPortMappingALGsIPSE", "alg_ipse");

var internetDMZOnOff = new Scalar("internetDMZOnOff", "dmz_enable");
var internetDMZIPAddr = new Scalar("internetDMZIPAddr", "dmz_ip");
var internetCheckDMZIPAddr = new Scalar("internetCheckDMZIPAddr", "chk_dmz_ip"); //20131012

var settingsPasswordUserData = new Scalar("settingsPasswordUserData", "PasswordUserData");
var settingsPasswordPWD = new Scalar("settingsPasswordPWD", "pwd");
var settingsPasswordAutoLogout = new Scalar("settingsPasswordAutoLogout", "auto_logout");
var settingsPasswordResetPWDByID = new Scalar("settingsPasswordResetPWDByID", "reset_pwd_by_id"); //20131203

var settingsConfigurationSaveType = new Scalar("settingsConfigurationSaveType", "ConfigurationSaveType");
var settingsConfigurationSaveDescription = new Scalar("settingsConfigurationSaveDescription", "ConfigurationSaveDescription");
var settingsConfigurationSavePWD = new Scalar("settingsConfigurationSavePWD", "ConfigurationSavePWD");
var settingsConfigurationRestore = new Scalar("settingsConfigurationRestore", "ConfigurationRestore");
var settingsConfigurationRestorePWD = new Scalar("settingsConfigurationRestorePWD", "ConfigurationRestorePWD");
var settingsConfigurationResetFactory = new Scalar("settingsConfigurationResetFactory", "ConfigurationResetFactory"); //new add
var settingsConfigurationRestoreType = new Scalar("settingsConfigurationRestoreType", "ConfigurationRestoreType"); //new add

var settingsFWUpdateInstallUpdateByUSB = new Scalar("settingsFWUpdateInstallUpdateByUSB", "FWUpdateInstallUpdateByUSB");
//20150508 add
var settingsFWUpdateAutoUpgradeEN = new Scalar("settingsFWUpdateAutoUpgradeEN", "auto_upgrade_en");
var settingsFWUpdateAutoUpgradeServPath = new Scalar("settingsFWUpdateAutoUpgradeServPath", "auto_upgrade_serv_path");
//20150508 add end

var wifiWPSOnOff = new Scalar("wifiWPSOnOff", "WPSOnOff");
var wifiWPS20Enable = new Scalar("wifiWPS20Enable", "wps20_enable"); //20131107 add
var wifiWPSPairToDeviceOnOff = new Scalar("wifiWPSPairToDeviceOnOff", "WPSPairToDeviceOnOff");
var wifiWPSGetPairStatus = new Scalar("wifiWPSGetPairStatus", "WPSGetPairStatus");
var wifiWPSPINNumber = new Scalar("wifiWPSPINNumber", "wps_pin_number"); //20140423
var wifiWPSPINPairOnOff = new Scalar("wifiWPSPINPairOnOff", "wps_pin_pair_onoff"); //20140423
var wifiWPSPINGetPairStatus = new Scalar("wifiWPSPINGetPairStatus", "wps_pin_status"); //20140423

var wifiWDSOnOff = new Scalar("wifiWDSOnOff", "wifi_wdsonoff"); //20140113 add
var wifiWDSAPList = new Scalar("wifiWDSAPList", "wifi_wds_ap_list"); //20140113 add

var wifiGeneralNetworkOnOff = new Scalar("wifiGeneralNetworkOnOff", "wifi_network_onoff");
var wifiGeneralSSID = new Scalar("wifiGeneralSSID", "wifi_ssid");
var wifiGeneralEnabled = new Scalar("wifiGeneralEnabled", "wifi_enabled"); //20141211 add
var wifiGeneralChannel = new Scalar("wifiGeneralChannel", "wifi_channel");
var wifiGeneralBandwidth = new Scalar("wifiGeneralBandwidth", "bandwidth"); //20150327
var wifiGeneralSignalStrength = new Scalar("wifiGeneralSignalStrength", "signalStrength"); //20150327
var wifiGeneralExtensionChannel = new Scalar("wifiGeneralExtensionChannel", "wifi_extension_channel"); //20150324
var wifiGeneralBroadcastSSID = new Scalar("wifiGeneralBroadcastSSID", "wifi_broadcast_ssid");
var wifiGeneralProtection = new Scalar("wifiGeneralProtection", "wifi_protection");
var wifiGeneralEncryptionType = new Scalar("wifiGeneralEncryptionType", "wifi_encryption_type"); //20141211 add
var wifiGeneralWEPModeLength = new Scalar("wifiGeneralWEPModeLength", "wep_mode_length"); //20130904 add
var wifiGeneralWEPModeEncrypt = new Scalar("wifiGeneralWEPModeEncrypt", "wep_mode_encrypt"); //20130904 add
var wifiGeneralWEPModeKey1 = new Scalar("wifiGeneralWEPModeKey1", "wep_mode_key1"); //20130904 add
var wifiGeneralWEPModeKey2 = new Scalar("wifiGeneralWEPModeKey2", "wep_mode_key2"); //20130904 add
var wifiGeneralWEPModeKey3 = new Scalar("wifiGeneralWEPModeKey3", "wep_mode_key3"); //20130904 add
var wifiGeneralWEPModeKey4 = new Scalar("wifiGeneralWEPModeKey4", "wep_mode_key4"); //20130904 add
var wifiGeneralWEPModeKeySelect = new Scalar("wifiGeneralWEPModeKeySelect", "wep_mode_key_select"); //20130904 add
var wifiGeneralWEPModeENPassphrase = new Scalar("wifiGeneralWEPModeENPassphrase", "wep_mode_en_passphrase"); //20130904 add
var wifiGeneralWEPModePassphrase = new Scalar("wifiGeneralWEPModePassphrase", "wep_mode_passphrase"); //20130904 add
var wifiGeneralPassword = new Scalar("wifiGeneralPassword", "wifi_password");
var wifiGeneralGenFrenquency = new Scalar("wifiGeneralGenFrenquency", "wifi_genFrenquency"); //admin
var wifiGeneralNumberOfWIFIDevices = new Scalar("wifiGeneralNumberOfWIFIDevices", "wifi_number_of_wifi_devices"); //admin

var wifiGeneralEnabled_5G = new Scalar("wifiGeneralEnabled_5G", "wifi_enabled_5g"); //20141211 add
var wifiGeneralSSID_5G = new Scalar("wifiGeneralSSID_5G", "wifi_ssid_5g"); //20141211 add
var wifiGeneralChannel_5G = new Scalar("wifiGeneralChannel_5G", "wifi_channel_5g"); //20141211 add
var wifiGeneralBandwidth_5G = new Scalar("wifiGeneralBandwidth_5G", "bandwidth_5g"); //20150327
var wifiGeneralSignalStrength_5G = new Scalar("wifiGeneralSignalStrength_5G", "signalStrength_5g"); //20150327
var wifiGeneralExtensionChannel_5G = new Scalar("wifiGeneralExtensionChannel_5G", "wifi_extension_channel_5g"); //20150324
var wifiGeneralBroadcastSSID_5G = new Scalar("wifiGeneralBroadcastSSID_5G", "wifi_broadcast_ssid_5g"); //20141211 add
var wifiGeneralNumberOfWIFIDevices_5G = new Scalar("wifiGeneralNumberOfWIFIDevices_5G", "wifi_number_of_wifi_devices_5g"); //20141211 add
var wifiGeneralProtection_5G = new Scalar("wifiGeneralProtection_5G", "wifi_protection_5g"); //20141211 add
var wifiGeneralEncryptionType_5G = new Scalar("wifiGeneralEncryptionType_5G", "wifi_encryption_type_5g"); //20141211 add
var wifiGeneralPassword_5G = new Scalar("wifiGeneralPassword_5G", "wifi_password_5g"); //20141211 add
var wifiGeneralWEPModeLength_5G = new Scalar("wifiGeneralWEPModeLength_5G", "wep_mode_length_5g"); //20141224
var wifiGeneralWEPModeEncrypt_5G = new Scalar("wifiGeneralWEPModeEncrypt_5G", "wep_mode_encrypt_5g"); //20141224
var wifiGeneralWEPModeKey1_5G = new Scalar("wifiGeneralWEPModeKey1_5G", "wep_mode_key1_5g"); //20141224
var wifiGeneralWEPModeKey2_5G = new Scalar("wifiGeneralWEPModeKey2_5G", "wep_mode_key2_5g"); //20141224
var wifiGeneralWEPModeKey3_5G = new Scalar("wifiGeneralWEPModeKey3_5G", "wep_mode_key3_5g"); //20141224
var wifiGeneralWEPModeKey4_5G = new Scalar("wifiGeneralWEPModeKey4_5G", "wep_mode_key4_5g"); //20141224
var wifiGeneralWEPModeKeySelect_5G = new Scalar("wifiGeneralWEPModeKeySelect_5G", "wep_mode_key_select_5g"); //20141224
var wifiGeneralWEPModeENPassphrase_5G = new Scalar("wifiGeneralWEPModeENPassphrase_5G", "wep_mode_en_passphrase_5g"); //20141224
var wifiGeneralWEPModePassphrase_5G = new Scalar("wifiGeneralWEPModePassphrase_5G", "wep_mode_passphrase_5g"); //20141224


var internetParentalControlEditData = new Scalar("internetParentalControlEditData", "ParentalControlEditData");

var phoneSettingsSipPriRegistrarAddr = new Scalar("phoneSettingsSipPriRegistrarAddr", "sip_pri_registrar_addr");
var phoneSettingsSipPriRegistrarPort = new Scalar("phoneSettingsSipPriRegistrarPort", "sip_pri_registrar_port");
var phoneSettingsSipPriProxyServerAddr = new Scalar("phoneSettingsSipPriProxyServerAddr", "sip_pri_proxy_server_addr");
var phoneSettingsSipPriProxyServerPort = new Scalar("phoneSettingsSipPriProxyServerPort", "sip_pri_proxy_server_port");
var phoneSettingsSipPriOutboundProxy = new Scalar("phoneSettingsSipPriOutboundProxy", "sip_pri_outbound_proxy");
var phoneSettingsSipPriOutboundPort = new Scalar("phoneSettingsSipPriOutboundPort", "sip_pri_outbound_port");
var phoneSettingsSipSecRegistrarAddr = new Scalar("phoneSettingsSipSecRegistrarAddr", "sip_sec_registrar_addr");
var phoneSettingsSipSecRegistrarPort = new Scalar("phoneSettingsSipSecRegistrarPort", "sip_sec_registrar_port");
var phoneSettingsSipSecProxyServerAddr = new Scalar("phoneSettingsSipSecProxyServerAddr", "sip_sec_proxy_server_addr");
var phoneSettingsSipSecProxyServerPort = new Scalar("phoneSettingsSipSecProxyServerPort", "sip_sec_proxy_server_port");
var phoneSettingsSipSecOutboundProxy = new Scalar("phoneSettingsSipSecOutboundProxy", "sip_sec_outbound_proxy");
var phoneSettingsSipSecOutboundPort = new Scalar("phoneSettingsSipSecOutboundPort", "sip_sec_outbound_port");
var phoneSettingsUserAgentDomain = new Scalar("phoneSettingsUserAgentDomain", "user_agent_domain");
var phoneSettingsExpirationDuration = new Scalar("phoneSettingsExpirationDuration", "expiration_duration");
var phoneSettingsSessionExpires = new Scalar("phoneSettingsSessionExpires", "session_expires");
var phoneSettingsUserAccountLine = new Scalar("phoneSettingsUserAccountLine", "user_account_line"); // 20131001
var phoneSettingsUserDisplayName = new Scalar("phoneSettingsUserDisplayName", "user_display_name");
var phoneSettingsUserPhoneNumber = new Scalar("phoneSettingsUserPhoneNumber", "user_phone_number");
var phoneSettingsUserName = new Scalar("phoneSettingsUserName", "user_name");
var phoneSettingsUserPassword = new Scalar("phoneSettingsUserPassword", "user_password");
var phoneSettingsVoiceDialPlanEnable = new Scalar("phoneSettingsVoiceDialPlanEnable", "voicedialplan_enable");
var phoneSettingsVoipDialPlanSettings = new Scalar("phoneSettingsVoipDialPlanSettings", "voip_dial_plan_settings");
var phoneSettingsVoipDialTimeout = new Scalar("phoneSettingsVoipDialTimeout", "voip_dial_timeout");
var phoneSettingsFirstDigitTimeout = new Scalar("phoneSettingsFirstDigitTimeout", "first_digit_timeout");
var phoneSettingsMinHookFlash = new Scalar("phoneSettingsMinHookFlash", "min_hook_flash");
var phoneSettingsMaxHookFlash = new Scalar("phoneSettingsMaxHookFlash", "max_hook_flash");

//var phoneSettingsPreferredTimeOption = new Scalar("phoneSettingsPreferredTimeOption", "preferred_time_option");
var phoneSettingsPreferredCodec1 = new Scalar("phoneSettingsPreferredCodec1", "preferred_codec_1");
var phoneSettingsPreferredCodec2 = new Scalar("phoneSettingsPreferredCodec2", "preferred_codec_2");
var phoneSettingsPreferredTimeOption1 = new Scalar("phoneSettingsPreferredTimeOption1", "preferred_time_option_1"); //20140515
//var phoneSettingsT38Codec1 = new Scalar("phoneSettingsT38Codec1", "t38_codec_1"); //20140515
var phoneSettingsPreferredTimeOption2 = new Scalar("phoneSettingsPreferredTimeOption2", "preferred_time_option_2"); //20140515
//var phoneSettingsT38Codec2 = new Scalar("phoneSettingsT38Codec2", "t38_codec_2"); //20140515
var phoneSettingsStateCodec1 = new Scalar("phoneSettingsStateCodec1", "state_codec_1"); //20140527
var phoneSettingsStateCodec2 = new Scalar("phoneSettingsStateCodec2", "state_codec_2"); //20140527
var phoneSettingsT38Codec = new Scalar("phoneSettingsT38Codec", "t38_codec");

var phoneSettingsVoiceReInjectionSettings = new Scalar("phoneSettingsVoiceReInjectionSettings", "voice_re_injection_settings");
var phoneSettingsLocationSelect = new Scalar("phoneSettingsLocationSelect", "location_select");
var phoneSettingsEchoCancellation = new Scalar("phoneSettingsEchoCancellation", "echo_cancellation");
var phoneSettingsComfortNoise = new Scalar("phoneSettingsComfortNoise", "comfort_noise");
var phoneSettingsVadSupport = new Scalar("phoneSettingsVadSupport", "vad_support");
var phoneSettingsIngressGain = new Scalar("phoneSettingsIngressGain", "ingress_gain");
var phoneSettingsEgressGain = new Scalar("phoneSettingsEgressGain", "egress_gain");
var phoneSettingsFaxDetection = new Scalar("phoneSettingsFaxDetection", "fax_detection");
var phoneSettingsDscpForRtp = new Scalar("phoneSettingsDscpForRtp", "dscp_for_rtp");
var phoneSettingsSignallingDSCP = new Scalar("phoneSettingsSignallingDSCP", "signalling_dscp");
var phoneSettingsLocalRtpMaxPort = new Scalar("phoneSettingsLocalRtpMaxPort", "local_rtp_max_port");
var phoneSettingsLocalRtpMinPort = new Scalar("phoneSettingsLocalRtpMinPort", "local_rtp_min_port");
var phoneSettingsRtcpPacketInterval = new Scalar("phoneSettingsRtcpPacketInterval", "rtcp_packet_interval");
var phoneSettingsDtmfRelaySetting = new Scalar("phoneSettingsDtmfRelaySetting", "dtmf_relay_setting");
var phoneSettingsDtmfPayloadValue = new Scalar("phoneSettingsDtmfPayloadValue", "dtmf_payload_value");
var phoneSettingsRegistrationExpireTimeout = new Scalar("phoneSettingsRegistrationExpireTimeout", "registration_expire_timeout");
var phoneSettingsRegistrationRetryInterval = new Scalar("phoneSettingsRegistrationRetryInterval", "registration_retry_interval");
var phoneSettingsPrimaryProxyRetryInterval = new Scalar("phoneSettingsPrimaryProxyRetryInterval", "primary_proxy_retry_interval");
var phoneSettingsSessionTimerExpires = new Scalar("phoneSettingsSessionTimerExpires", "session_timer_expires");
var phoneSettingsSessionTimerMinSE = new Scalar("phoneSettingsSessionTimerMinSE", "session_timer_min_se");
var phoneSettingsPrack = new Scalar("phoneSettingsPrack", "prack");
var phoneSettingsInterfaceName = new Scalar("phoneSettingsInterfaceName", "interface_name"); //20130815

var StatusAndSupportRestartDevice = new Scalar("StatusAndSupportRestartDevice", "restart_device");

var StatusAndSupportEventLogDeleteAllLog = new Scalar("StatusAndSupportEventLogDeleteAllLog", "delete_all_log");

var settingsAccessControlICMPWanSelect = new Scalar("settingsAccessControlICMPWanSelect", "icmp_wan");
var settingsAccessControlICMPLanSelect = new Scalar("settingsAccessControlICMPLanSelect", "icmp_lan");
var settingsAccessControlSNMPWanSelect = new Scalar("settingsAccessControlSNMPWanSelect", "snmp_wan");
var settingsAccessControlSNMPLanSelect = new Scalar("settingsAccessControlSNMPLanSelect", "snmp_lan");
var settingsAccessControlTelnetWanSelect = new Scalar("settingsAccessControlTelnetWanSelect", "telnet_wan");
var settingsAccessControlTelnetLanSelect = new Scalar("settingsAccessControlTelnetLanSelect", "telnet_lan");
var settingsAccessControlHTTPWanSelect = new Scalar("settingsAccessControlHTTPWanSelect", "http_wan");
var settingsAccessControlHTTPLanSelect = new Scalar("settingsAccessControlHTTPLanSelect", "http_lan");
var settingsAccessControlTR069WanSelect = new Scalar("settingsAccessControlTR069WanSelect", "tr069_wan");
var settingsAccessControlTR069LanSelect = new Scalar("settingsAccessControlTR069LanSelect", "tr069_lan");
var settingsAccessControlSSHWanSelect = new Scalar("settingsAccessControlSSHWanSelect", "ssh_wan"); //20140428
var settingsAccessControlSSHLanSelect = new Scalar("settingsAccessControlSSHLanSelect", "ssh_lan"); //20140428
var settingsAccessControlSSHWanPort = new Scalar("settingsAccessControlSSHWanPort", "wan_access_port"); //20140428


var settingsxDSLSettingsVDSL8a = new Scalar("settingsxDSLSettingsVDSL8a", "vdsl_8a"); //new 20131129
var settingsxDSLSettingsVDSL8b = new Scalar("settingsxDSLSettingsVDSL8b", "vdsl_8b"); //new 20131129
var settingsxDSLSettingsVDSL8c = new Scalar("settingsxDSLSettingsVDSL8c", "vdsl_8c"); //new 20131129
var settingsxDSLSettingsVDSL8d = new Scalar("settingsxDSLSettingsVDSL8d", "vdsl_8d"); //new 20131129
var settingsxDSLSettingsVDSL12a = new Scalar("settingsxDSLSettingsVDSL12a", "vdsl_12a"); //new 20131129
var settingsxDSLSettingsVDSL12b = new Scalar("settingsxDSLSettingsVDSL12b", "vdsl_12b"); //new 20131204
var settingsxDSLSettingsVDSL17a = new Scalar("settingsxDSLSettingsVDSL17a", "vdsl_17a"); //new 20131129
var settingsxDSLSettingsVDSL30a = new Scalar("settingsxDSLSettingsVDSL30a", "vdsl_30a"); //new 20131129
var settingsxDSLSettingsVDSLUS0 = new Scalar("settingsxDSLSettingsVDSLUS0", "vdsl_us0"); //new 20131129

var settingsADSLSettingsGDmt = new Scalar("settingsADSLSettingsGDmt", "g_dmt"); //new 20130809
var settingsADSLSettingsGLite = new Scalar("settingsADSLSettingsGLite", "g_lite"); //new 20130809
var settingsADSLSettingsT1_413 = new Scalar("settingsADSLSettingsT1_413", "t1_413"); //new 20130809
var settingsADSLSettingsADSL2 = new Scalar("settingsADSLSettingsADSL2", "adsl2"); //new 20130809
var settingsADSLSettingsAnnexL = new Scalar("settingsADSLSettingsAnnexL", "annexl"); //new 20130809
var settingsADSLSettingsADSL2Plus = new Scalar("settingsADSLSettingsADSL2Plus", "adsl2plus"); //new 20130809
var settingsADSLSettingsAnnexM = new Scalar("settingsADSLSettingsAnnexM", "annexm"); //new 20130809
var settingsADSLSettingsBitswap = new Scalar("settingsADSLSettingsBitswap", "bitswap");
var settingsADSLSettingsSRA = new Scalar("settingsADSLSettingsSRA", "sra"); //new 20130808

var wifiSettingsWIFIMode = new Scalar("wifiSettingsWIFIMode", "wifi-mode");
//var wifiSettingsBandwidth = new Scalar("wifiSettingsBandwidth", "bandwidth");
//var wifiSettingsSignalStrength = new Scalar("wifiSettingsSignalStrength", "signalStrength");
var wifiSettingsPreamble = new Scalar("wifiSettingsPreamble", "preamble"); //20150311
var wifiSettingsCountryCode = new Scalar("wifiSettingsCountryCode", "country_code"); //20150324
var wifiSettingsEncryption = new Scalar("wifiSettingsEncryption", "encrypthion");
var wifiSettingsKeyUpdateIntervall = new Scalar("wifiSettingsKeyUpdateIntervall", "key_update_intervall");
var wifiSettingsCTSMode = new Scalar("wifiSettingsCTSMode", "cts_mode");
var wifiSettingsCTSType = new Scalar("wifiSettingsCTSType", "cts_type");
var wifiSettingsBeaconInterval = new Scalar("wifiSettingsBeaconInterval", "beacon_interval");
var wifiSettingsDTIMInterval = new Scalar("wifiSettingsDTIMInterval", "dtim_interval");
var wifiSettingsFragmentationTreshold = new Scalar("wifiSettingsFragmentationTreshold", "fragmentation_treshold");
var wifiSettingsRTSTreshold = new Scalar("wifiSettingsRTSTreshold", "rts_treshold");

var wifiSettingsCTSThreshold = new Scalar("wifiSettingsCTSThreshold", "cts_treshold");
var wifiSettingsGuardInterval = new Scalar("wifiSettingsGuardInterval", "guard_treshold");

var wifiSettingsCTSThreshold_5G = new Scalar("wifiSettingsCTSThreshold_5G", "cts_treshold_5g");
var wifiSettingsGuardInterval_5G = new Scalar("wifiSettingsGuardInterval_5G", "guard_treshold_5g");

var wifiSettingsWMMEnabled = new Scalar("wifiSettingsWMMEnabled", "wmm_enabled");
var wifiSettingsAutoChannelReselection = new Scalar("wifiSettingsAutoChannelReselection", "auto_channel_reselection");
var wifiSettingsWIFIMode_5G = new Scalar("wifiSettingsWIFIMode_5G", "wifi-mode_5g");
//var wifiSettingsBandwidth_5G = new Scalar("wifiSettingsBandwidth_5G", "bandwidth_5g");
//var wifiSettingsSignalStrength_5G = new Scalar("wifiSettingsSignalStrength_5G", "signalStrength_5g");
var wifiSettingsPreamble_5G = new Scalar("wifiSettingsPreamble_5G", "preamble_5g"); //20150311
var wifiSettingsCountryCode_5G = new Scalar("wifiSettingsCountryCode_5G", "country_code_5g"); //20150324
var wifiSettingsEncryption_5G = new Scalar("wifiSettingsEncryption_5G", "encrypthion_5g");
var wifiSettingsKeyUpdateIntervall_5G = new Scalar("wifiSettingsKeyUpdateIntervall_5G", "key_update_intervall_5g");
var wifiSettingsCTSMode_5G = new Scalar("wifiSettingsCTSMode_5G", "cts_mode_5g");
var wifiSettingsCTSType_5G = new Scalar("wifiSettingsCTSType_5G", "cts_type_5g");
var wifiSettingsBeaconInterval_5G = new Scalar("wifiSettingsBeaconInterval_5G", "beacon_interval_5g");
var wifiSettingsDTIMInterval_5G = new Scalar("wifiSettingsDTIMInterval_5G", "dtim_interval_5g");
var wifiSettingsFragmentationTreshold_5G = new Scalar("wifiSettingsFragmentationTreshold_5G", "fragmentation_treshold_5g");
var wifiSettingsRTSTreshold_5G = new Scalar("wifiSettingsRTSTreshold_5G", "rts_treshold_5g");
var wifiSettingsWMMEnabled_5G = new Scalar("wifiSettingsWMMEnabled_5G", "wmm_enabled_5g");
var wifiSettingsAutoChannelReselection_5G = new Scalar("wifiSettingsAutoChannelReselection_5G", "auto_channel_reselection_5g");

var internetFirewallFirewallContent = new Scalar("internetFirewallFirewallContent", "firewallContent");
var internetFirewallFirewallLevel = new Scalar("internetFirewallFirewallLevel", "firewall_level");
var internetFirewallAllowPing = new Scalar("internetFirewallAllowPing", "allow_ping");
var internetFirewallAttackAlertViaEmail = new Scalar("internetFirewallAttackAlertViaEmail", "attackAlertViaEmail"); //add 20131114
var internetFirewallEmailUsername = new Scalar("internetFirewallEmailUsername", "email_username"); //add 20131114
var internetFirewallEmailPassword = new Scalar("internetFirewallEmailPassword", "email_password"); //add 20131114
var internetFirewallEmailSMTPServ = new Scalar("internetFirewallEmailSMTPServ", "email_smtp_serv"); //add 20131114
var internetFirewallEmailSMTPPort = new Scalar("internetFirewallEmailSMTPPort", "email_smtp_port"); //add 20131114
var internetFirewallEmailTargetEmailAddr = new Scalar("internetFirewallEmailTargetEmailAddr", "email_target_email_addr"); //add 20131114
var internetFirewallTestEmail = new Scalar("internetFirewallTestEmail", "test_email"); //add 20131114
var internetFirewallDoS = new Scalar("internetFirewallDoS", "DoS");
var internetFirewallSystemICMP = new Scalar("internetFirewallSystemICMP", "system_icmp");
var internetFirewallSystemICMPText = new Scalar("internetFirewallSystemICMPText", "system_icmp_text");
var internetFirewallIpICMP = new Scalar("internetFirewallIpICMP", "ip_icmp");
var internetFirewallIpICMPText = new Scalar("internetFirewallIpICMPText", "ip_icmp_text");
var internetFirewallSystemTCP = new Scalar("internetFirewallSystemTCP", "system_tcp");
var internetFirewallSystemTCPText = new Scalar("internetFirewallSystemTCPText", "system_tcp_text");
var internetFirewallIpTCP = new Scalar("internetFirewallIpTCP", "ip_tcp");
var internetFirewallIpTCPText = new Scalar("internetFirewallIpTCPText", "ip_tcp_text");
var internetFirewallSystemUDP = new Scalar("internetFirewallSystemUDP", "system_udp");
var internetFirewallSystemUDPText = new Scalar("internetFirewallSystemUDPText", "system_udp_text");
var internetFirewallIpUDP = new Scalar("internetFirewallIpUDP", "ip_udp");
var internetFirewallIpUDPText = new Scalar("internetFirewallIpUDPText", "ip_udp_text");
var internetFirewallICMPSmurf = new Scalar("internetFirewallICMPSmurf", "icmp_smurf");
var internetFirewallIpFragmentation = new Scalar("internetFirewallIpFragmentation", "ip_fragmentation");
var internetFirewallIpLand = new Scalar("internetFirewallIpLand", "ip_land");
var internetFirewallIpSpoof = new Scalar("internetFirewallIpSpoof", "ip_spoof");
var internetFirewallTCPUDPPortscan = new Scalar("internetFirewallTCPUDPPortscan", "tcpudp_portscan");
var internetFirewallTCPSynwithdata = new Scalar("internetFirewallTCPSynwithdata", "tcp_synwithdata");
var internetFirewallUDPBomb = new Scalar("internetFirewallUDPBomb", "udp_bomb");

var settingsWanSettingsEnable = new Scalar("settingsWanSettingsEnable", "wan_settings_enable"); //20130816
var settingsWanDeviceDrop = new Scalar("settingsWanDeviceDrop", "deviceDrop");
var settingsWanConnectionType = new Scalar("settingsWanConnectionType", "connection_type");
var settingsWanConnectionStatus = new Scalar("settingsWanConnectionStatus", "connection_status");
var settingsWanConnectionUsedFor = new Scalar("settingsWanConnectionUsedFor", "connection_used_for");
var settingsWanNetworkAddrTranslation = new Scalar("settingsWanNetworkAddrTranslation", "network_addr_translation"); //new 20130808
var settingsWanFirewall = new Scalar("settingsWanFirewall", "firewall"); //new 20130808

var settingsWanDataList = new Scalar("settingsWanDataList", "wan_data_list"); //20140114
var settingsWanDelIDList = new Scalar("settingsWanDelIDList", "del_id_list"); //20140418
var settingsWanEditIDList = new Scalar("settingsWanEditIDList", "edit_id_list"); //20140418

var settingsWanATMVPI = new Scalar("settingsWanATMVPI", "atm_vpi"); //20131002
var settingsWanATMVCI = new Scalar("settingsWanATMVCI", "atm_vci"); //20131002
var settingsWanATMEncapsulationMode = new Scalar("settingsWanATMEncapsulationMode", "atm_encapsulation_mode"); //20131002
var settingsWanATMServiceCategory = new Scalar("settingsWanATMServiceCategory", "atm_service_category"); //20131002
var settingsWanATMPeakCellRate = new Scalar("settingsWanATMPeakCellRate", "atm_peak_cell_rate"); //20131002
var settingsWanATMSustainableCellRate = new Scalar("settingsWanATMSustainableCellRate", "atm_sustainable_cell_rate"); //20131002
var settingsWanATMMaximumBurstSize = new Scalar("settingsWanATMMaximumBurstSize", "atm_maximum_burst_size"); //20131002

var settingsWanVlanID = new Scalar("settingsWanVlanID", "vlan_id"); //20131008
var settingsWanVlan802dot1P = new Scalar("settingsWanVlan802dot1P", "vlan_802dot1p"); //20131008

var settingsWanPPPUsername = new Scalar("settingsWanPPPUsername", "ppp_username");
var settingsWanPPPPassword = new Scalar("settingsWanPPPPassword", "ppp_password");
var settingsWanPPPServiceName = new Scalar("settingsWanPPPServiceName", "ppp_service_name");
var settingsWanPPPAuthenticationMethod = new Scalar("settingsWanPPPAuthenticationMethod", "ppp_authentication_method");
var settingsWanPPPConnectionTrigger = new Scalar("settingsWanPPPConnectionTrigger", "ppp_connection_trigger");
var settingsWanPPPLCPEchoRequestInterval = new Scalar("settingsWanPPPLCPEchoRequestInterval", "ppp_lcp_echo_request_interval");
var settingsWanPPPMTU = new Scalar("settingsWanPPPMTU", "ppp_mtu"); //new 20130808
var settingsWanPPPIdleTime = new Scalar("settingsWanPPPIdleTime", "ppp_idle_time"); //new 20130816
var settingsWanPPPObtainDNSServers = new Scalar("settingsWanPPPObtainDNSServers", "ppp_obtain_dns_servers");
var settingsWanPPPPrimaryDNS = new Scalar("settingsWanPPPPrimaryDNS", "ppp_primary_dns"); //new 20130808
var settingsWanPPPSecondaryDNS = new Scalar("settingsWanPPPSecondaryDNS", "ppp_secondary_dns"); //new 20130808
var settingsWanDHCPHostName = new Scalar("settingsWanDHCPHostName", "dhcp_host_name"); //new 20130808
var settingsWanDHCPMTU = new Scalar("settingsWanDHCPMTU", "dhcp_mtu"); //20131002
var settingsWanDHCPObtainDNSServers = new Scalar("settingsWanDHCPObtainDNSServers", "dhcp_obtain_dns_servers"); //new 20130808
var settingsWanDHCPPrimaryDNS = new Scalar("settingsWanDHCPPrimaryDNS", "dhcp_primary_dns"); //new 20130808
var settingsWanDHCPSecondaryDNS = new Scalar("settingsWanDHCPSecondaryDNS", "dhcp_secondary_dns"); //new 20130808
var settingsWanStaticHostName = new Scalar("settingsWanStaticHostName", "static_host_name"); //new 20130808
var settingsWanStaticIpAddr = new Scalar("settingsWanStaticIpAddr", "static_ip_addr"); //new 20130808
var settingsWanStaticNetmask = new Scalar("settingsWanStaticNetmask", "static_netmask"); //new 20130808
var settingsWanStaticGateway = new Scalar("settingsWanStaticGateway", "static_gateway"); //new 20130808
var settingsWanStaticMTU = new Scalar("settingsWanStaticMTU", "static_mtu"); //20131002
var settingsWanStaticObtainDNSServers = new Scalar("settingsWanStaticObtainDNSServers", "static_obtain_dns_servers"); //new 20130808
var settingsWanStaticPrimaryDNS = new Scalar("settingsWanStaticPrimaryDNS", "static_primary_dns"); //new 20130808
var settingsWanStaticSecondaryDNS = new Scalar("settingsWanStaticSecondaryDNS", "static_secondary_dns"); //new 20130808

var settingsStaticRoutingEditData = new Scalar("settingsStaticRoutingEditData", "StaticRoutingEditData"); // new 20130927

var settingsPolicyRoutingEditData = new Scalar("settingsPolicyRoutingEditData", "PolicyRoutingEditData"); //20140122
var settingsPolicyRoutingDelIDList = new Scalar("settingsPolicyRoutingDelIDList", "del_id_list"); //20140214
var settingsPolicyRoutingEditIDList = new Scalar("settingsPolicyRoutingEditIDList", "edit_id_list"); //20140214

var internetUPnPEnable = new Scalar("internetUPnPEnable", "upnp"); // new 20130927
var internetUPnPConfigurableEnable = new Scalar("internetUPnPConfigurableEnable", "configurable"); // new 20130927
var internetUPnPNATTraversalEnable = new Scalar("internetUPnPNATTraversalEnable", "nat_raversal"); // new 20130927
var settingsPPPoERelayEnable = new Scalar("settingsPPPoERelayEnable", "pppoe_relay"); 

var settingsTrustedNetworkEnable = new Scalar("settingsTrustedNetworkEnable", "trusted_network"); // new 20130930
var settingsTrustedNetworkList = new Scalar("settingsTrustedNetworkList", "trusted_network_list"); // new 20130930

var settingsContentSharingFolderDeviceID = new Scalar("settingsContentSharingFolderDeviceID", "device_id"); // new 20131019
var settingsContentSharingFolderPATH = new Scalar("settingsContentSharingFolderPATH", "folder_path"); // new 20131019

var settingsContentSharingUser = new Scalar("settingsContentSharingUser", "sharing_user"); // new 20131019
var settingsContentSharingDevice = new Scalar("settingsContentSharingDevice", "sharing_device"); // new 20131019

var statusSupport_Syslog_Client = new Scalar("statusSupport_Syslog_Client", "syslogclient"); // new 20131019
var statusSupport_Syslog_IP = new Scalar("statusSupport_Syslog_IP", "syslogip"); // new 20131019

var settingsContentSharingEnable = new Scalar("settingsContentSharingEnable", "content_sharing_enable"); // new 20131021

var settingsNetworkSharingEnable = new Scalar("settingsNetworkSharingEnable", "network_sharing_enable"); //20140414
var settingsNetworkSharingFriendlyName = new Scalar("settingsNetworkSharingFriendlyName", "network_sharing_friendly_name"); //20150323

var settingsPrinterSharingEnable = new Scalar("settingsPrinterSharingEnable", "printer_sharing_enable"); // new 20131021
var settingsPrinterSharingName = new Scalar("settingsPrinterSharingName", "printer_name"); //20140416
var settingsPrinterSharingServerURL = new Scalar("settingsPrinterSharingServerURL", "printer_server_url"); //20140416

var settingsUSBEjectID = new Scalar("settingsUSBEjectID", "eject_id"); // new 20131021

var settingsSNMPAgent = new Scalar("settingsSNMPAgent", "snmpagent"); // new 20131021
var settingsSNMPReadCommunity = new Scalar("settingsSNMPReadCommunity", "snmp_read_community"); // new 20131021
var settingsSNMPWriteCommunity = new Scalar("settingsSNMPWriteCommunity", "snmp_write_community"); // new 20131021
var settingsSNMPSystemName = new Scalar("settingsSNMPSystemName", "snmp_system_name"); // new 20131021
var settingsSNMPSystemLocation = new Scalar("settingsSNMPSystemLocation", "snmp_system_location"); // new 20131021
var settingsSNMPSystemContact = new Scalar("settingsSNMPSystemContact", "snmp_system_contact"); // new 20131021
var settingsSNMPSystemDescription = new Scalar("settingsSNMPSystemDescription", "snmp_system_description"); //20140121
var settingsSNMPUsername = new Scalar("settingsSNMPUsername", "snmp_username"); //20140414
var settingsSNMPAuthenticationProtocol = new Scalar("settingsSNMPAuthenticationProtocol", "snmp_authentication_protocol"); //20140414
var settingsSNMPAuthenticationKey = new Scalar("settingsSNMPAuthenticationKey", "snmp_authentication_key"); //20140414
var settingsSNMPPrivacyProtocol = new Scalar("settingsSNMPPrivacyProtocol", "snmp_privacy_protocol"); //20140414
var settingsSNMPPrivacyKey = new Scalar("settingsSNMPPrivacyKey", "snmp_privacy_key"); //20140414

var settingsQoS = new Scalar("settingsQoS", "qos_enable"); // new 20131022
var settingsQoSFTTHUpstreamBW = new Scalar("settingsQoSFTTHUpstreamBW", "ftth_upstream_bw"); //20140509
var settingsQoSRules = new Scalar("settingsQoSRules", "qos_rules"); // new 20131022
var settingsQoSDelIDList = new Scalar("settingsQoSDelIDList", "qos_del_id_list"); // new 20131213
var settingsQoSEditIDList = new Scalar("settingsQoSEditIDList", "qos_edit_id_list"); // new 20131213
var StatusAndSupportRunDiagnostic = new Scalar("StatusAndSupportRunDiagnostic", "run_diagnostic"); // new 20131022
var StatusAndSupportGetDiagnosticStatus = new Scalar("StatusAndSupportGetDiagnosticStatus", "get_diagnostic_status"); // new 20131022

var settingsDLNA = new Scalar("settingsDLNA", "settings_dlna"); // new 20131024
var settingsDLNAEnable = new Scalar("settingsDLNAEnable", "dlna_enable"); // new 20131024
var settingsDLNALanguage = new Scalar("settingsDLNALanguage", "dlna_language"); // new 20131024
var settingsDLNAFriendlyName = new Scalar("settingsDLNAFriendlyName", "dlna_friendly_name"); //20140612

var settingsFTPEnable = new Scalar("settingsFTPEnable", "ftp_enable"); //20140514
var settingsFTPShareViaInternetPort = new Scalar("settingsFTPShareViaInternetPort", "ftp_share_via_internet_port"); // new 20131024

var StatusAndSupportVOIPDiagnosticsSelectLogLevel = new Scalar("StatusAndSupportVOIPDiagnosticsSelectLogLevel", "select_log_level"); //new 20131025
var StatusAndSupportVOIPDiagnosticsDownload = new Scalar("StatusAndSupportVOIPDiagnosticsDownload", "download"); //new 20131025
var StatusAndSupportVOIPDiagnosticsTelephonyDiagnoseRing = new Scalar("StatusAndSupportVOIPDiagnosticsTelephonyDiagnoseRing", "voip_tel_diagnose_ring"); //new 20131212

var internetDSLAndUMTSReconnect = new Scalar("internetDSLAndUMTSReconnect", "dsl_reconnect"); //new 20131025
var internetDSLAndUMTSDetails = new Scalar("internetDSLAndUMTSDetails", "umts_details"); //add 20131107
var internetDSLAndUMTSBackupMode = new Scalar("internetDSLAndUMTSBackupMode", "umts_backup_mode"); //new 20131025
var internetDSLAndUMTSWirelessMode = new Scalar("internetDSLAndUMTSWirelessMode", "umts_wireless_mode"); //new 20131025
var internetDSLAndUMTSAPN = new Scalar("internetDSLAndUMTSAPN", "umts_apn"); //new 20131025
var internetDSLAndUMTSStick = new Scalar("internetDSLAndUMTSStick", "umts_stick"); //new 20131025
var internetDSLAndUMTSTimeUntilDisconnect = new Scalar("internetDSLAndUMTSTimeUntilDisconnect", "umts_time_until_disconnect"); //new 20131025
var internetDSLAndUMTSPINEnable = new Scalar("internetDSLAndUMTSPINEnable", "umts_pin_enable"); //add 20131107
var internetDSLAndUMTSPINCode = new Scalar("internetDSLAndUMTSPINCode", "umts_pin_code"); //add 20131107
var internetDSLAndUMTSSavePINCodeEnable = new Scalar("internetDSLAndUMTSSavePINCodeEnable", "umts_save_pin_code"); //20131206
var internetDSLAndUMTSResetPINCode = new Scalar("internetDSLAndUMTSResetPINCode", "reset_pin_code"); //add 20131107
var internetDSLAndUMTSPUKCode = new Scalar("internetDSLAndUMTSPUKCode", "umts_puk_code"); //20140120

var settingsUMTSBackup = new Scalar("settingsUMTSBackup", "backup"); // add 20131107
var settingsUMTSDisconnectionTimeout = new Scalar("settingsUMTSDisconnectionTimeout", "disconnection_timeout"); // 20140528
var settingsUMTSBackupMode = new Scalar("settingsUMTSBackupMode", "backup_mode"); // add 20131107
var settingsUMTSBackupModeDGW = new Scalar("settingsUMTSBackupModeDGW", "backup_mode_dgw"); // 20140528
var settingsUMTSBackupModeDNS = new Scalar("settingsUMTSBackupModeDNS", "backup_mode_dns"); // 20140528
var settingsUMTSDialNumber = new Scalar("settingsUMTSDialNumber", "dial_number"); // add 20131125
var settingsUMTS_PPPUsername = new Scalar("settingsUMTS_PPPUsername", "ppp_username"); // 20140528
var settingsUMTS_PPPPassword = new Scalar("settingsUMTS_PPPPassword", "ppp_pwd"); // 20140528
var settingsUMTSIdleTime = new Scalar("settingsUMTSIdleTime", "idle_time"); // 20140528
var settingsUMTSVoiceOverPSBackup = new Scalar("settingsUMTSVoiceOverPSBackup", "voice_over_ps_backup"); // add 20131125
var settingsUMTSVoiceOverPSBackupMode = new Scalar("settingsUMTSVoiceOverPSBackupMode", "voice_over_ps_backup_mode"); //20140417
var settingsUMTSAPNData = new Scalar("settingsUMTSAPNData", "apn_data"); // add 20131107
var settingsUMTSNetworkSelection = new Scalar("settingsUMTSNetworkSelection", "network_selection"); // add 20131107
var settingsUMTSNetworkGeneration = new Scalar("settingsUMTSNetworkGeneration", "network_generation"); // 20140528
var settingsUMTSNetworkOperator = new Scalar("settingsUMTSNetworkOperator", "network_operator"); // add 20131107
var settingsUMTSICMPCheckTimer = new Scalar("settingsUMTSICMPCheckTimer", "icmp_check_timer"); // add 20131107
var settingsUMTSDNSLookupTimer = new Scalar("settingsUMTSDNSLookupTimer", "dns_lookup_timer"); // add 20131107
var settingsUMTSDelayBeforeSwitchingVoiceFromWANtoHSPA = new Scalar("settingsUMTSDelayBeforeSwitchingVoiceFromWANtoHSPA", "delay_before_switching_voice_from_wan_to_hspa"); // add 20131107
var settingsUMTSDelayBeforeSwitchingVoiceFromHSPAtoWAN = new Scalar("settingsUMTSDelayBeforeSwitchingVoiceFromHSPAtoWAN", "delay_before_switching_voice_from_hspa_to_wan"); // add 20131107
var settingsUMTSDelayBeforeSwitchingDataFromWANtoHSPA = new Scalar("settingsUMTSDelayBeforeSwitchingDataFromWANtoHSPA", "delay_before_switching_data_from_wan_to_hspa"); // add 20131125
var settingsUMTSDelayBeforeSwitchingDataFromHSPAtoWAN = new Scalar("settingsUMTSDelayBeforeSwitchingDataFromHSPAtoWAN", "delay_before_switching_data_from_hspa_to_wan"); // add 20131125

var settingsIPv6BasicConfigurationIPv6Enable = new Scalar("settingsIPv6BasicConfigurationIPv6Enable", "ipv6_enable");
var settingsIPv6BasicConfigurationIPv6ClientRapidCommit = new Scalar("settingsIPv6BasicConfigurationIPv6ClientRapidCommit", "ipv6client_rapid_commit");
var settingsIPv6BasicConfigurationIPv6Client_IA_NA = new Scalar("settingsIPv6BasicConfigurationIPv6Client_IA_NA", "ipv6client_ia_na"); //20140417
var settingsIPv6BasicConfigurationIPv6ClientIA_PD = new Scalar("settingsIPv6BasicConfigurationIPv6ClientIA_PD", "ipv6client_ia_pd");
var settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixMode = new Scalar("settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixMode", "ipv6client_ia_pd_prefix_mode");
var settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeSelect = new Scalar("settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeSelect", "ipv6client_ia_pd_prefix_mode_select");
var settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeFromTimerBased = new Scalar("settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeFromTimerBased", "ipv6client_ia_pd_prefix_mode_from_timer_based"); //20140508
var settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeToTimerBased = new Scalar("settingsIPv6BasicConfigurationIPv6Client_IA_PD_PrefixModeToTimerBased", "ipv6client_ia_pd_prefix_mode_to_timer_based"); //20140508
var settingsIPv6BasicConfigurationIPv6ClientDNS = new Scalar("settingsIPv6BasicConfigurationIPv6ClientDNS", "ipv6client_dns");
var settingsIPv6BasicConfigurationIPv6Server_IA_NA = new Scalar("settingsIPv6BasicConfigurationIPv6Server_IA_NA", "ipv6server_ia_na");

var settingsIPv6BasicConfigurationIPv6ServerIA_PD = new Scalar("settingsIPv6BasicConfigurationIPv6ServerIA_PD", "ipv6server_ia_pd"); //20140417
/*var settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixMode = new Scalar("settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixMode", "ipv6server_ia_pd_prefix_mode"); //20140417
 var settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeSelect = new Scalar("settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeSelect", "ipv6server_ia_pd_prefix_mode_select"); //20140417
 var settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeFromTimerBased = new Scalar("settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeFromTimerBased", "ipv6server_ia_pd_prefix_mode_from_timer_based"); //20140417
 var settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeToTimerBased = new Scalar("settingsIPv6BasicConfigurationIPv6Server_IA_PD_PrefixModeToTimerBased", "ipv6server_ia_pd_prefix_mode_to_timer_based"); //20140417
 */

var settingsIPv6BasicConfigurationIPv6ServerDNS = new Scalar("settingsIPv6BasicConfigurationIPv6ServerDNS", "ipv6server_dns");
var settingsIPv6BasicConfigurationAdvManagedFlag = new Scalar("settingsIPv6BasicConfigurationAdvManagedFlag", "adv_managed_flag");
var settingsIPv6BasicConfigurationAdvOtherConfigFlag = new Scalar("settingsIPv6BasicConfigurationAdvOtherConfigFlag", "adv_other_config_flag");
var settingsIPv6BasicConfigurationAdvAutonomous = new Scalar("settingsIPv6BasicConfigurationAdvAutonomous", "adv_auto_nomous");
var settingsIPv6BasicConfigurationManuallyAssignPrefixtoLAN = new Scalar("settingsIPv6BasicConfigurationManuallyAssignPrefixtoLAN", "ipv6manually_assign_prefix_to_lan");
var settingsIPv6BasicConfigurationManuallyAssignPrefixtoLANValue = new Scalar("settingsIPv6BasicConfigurationManuallyAssignPrefixtoLANValue", "ipv6manually_assign_prefix_to_lan_value");
var settingsIPv6BasicConfigurationDHCPv6AddressLifetime = new Scalar("settingsIPv6BasicConfigurationDHCPv6AddressLifetime", "dhcpv6_address_lifetime");



var settingsIPv6BasicConfigurationAdvDefaultLifetime = new Scalar("settingsIPv6BasicConfigurationAdvDefaultLifetime", "adv_default_lifetime");
var settingsIPv6BasicConfigurationAdvLinkMTU = new Scalar("settingsIPv6BasicConfigurationAdvLinkMTU", "adv_link_mtu");
var settingsIPv6BasicConfigurationMaxRtrAdvInterval = new Scalar("settingsIPv6BasicConfigurationMaxRtrAdvInterval", "max_rtr_adv_interval");
var settingsIPv6BasicConfigurationMinRtrAdvInterval = new Scalar("settingsIPv6BasicConfigurationMinRtrAdvInterval", "min_rtr_adv_interval");
var settingsIPv6BasicConfigurationAdvPreferredLifetime = new Scalar("settingsIPv6BasicConfigurationAdvPreferredLifetime", "adv_preferred_lifetime");
var settingsIPv6BasicConfigurationAdvValidLifetime = new Scalar("settingsIPv6BasicConfigurationAdvValidLifetime", "adv_valid_lifetime");

var settingsIPv6BasicConfigurationIA_PD_PrefixModeRenew = new Scalar("settingsIPv6BasicConfigurationIA_PD_PrefixModeRenew", "ia_pd_prefix_mode_renew");

var StatusAndSupportPortMirroringStart = new Scalar("StatusAndSupportPortMirroringStart", "port_mirroring_start"); //20140430
var StatusAndSupportPortMirroringStop = new Scalar("StatusAndSupportPortMirroringStop", "port_mirroring_stop"); //20140430

var settingsVLANData = new Scalar("settingsVLANData", "settings_vlan_data"); //20141223

var settingsIPTVLanPort1 = new Scalar("settingsIPTVLanPort1", "lan_port_1"); //20141218
var settingsIPTVLanPort2 = new Scalar("settingsIPTVLanPort2", "lan_port_2"); //20141218
var settingsIPTVLanPort3 = new Scalar("settingsIPTVLanPort3", "lan_port_3"); //20141218
var settingsIPTVLanPort4 = new Scalar("settingsIPTVLanPort4", "lan_port_4"); //20141218
var settingsIPTVIGMPProxy = new Scalar("settingsIPTVIGMPProxy", "igmp_proxy"); //20141227

var wifiVFNetworkEnable = new Scalar("wifiVFNetworkEnable", "vf_wifi_network_enable"); //20140715
var wifiVFNetworkL2TPEnable = new Scalar("wifiVFNetworkL2TPEnable", "l2tp_enable"); //20140715
var wifiVFNetworkL2TPServer = new Scalar("wifiVFNetworkL2TPServer", "l2tp_server"); //20140715
var wifiVFNetworkQOSMaxAssocUsers = new Scalar("wifiVFNetworkQOSMaxAssocUsers", "qos_max_assoc_users"); //20140715
var wifiVFNetworkQOSMaxLoggedUsers = new Scalar("wifiVFNetworkQOSMaxLoggedUsers", "qos_max_logged_users"); //20140715
var wifiVFNetworkQOSPercentBWSelect = new Scalar("wifiVFNetworkQOSPercentBWSelect", "qos_percent_bw_select"); //20140715
var wifiVFNetworkQOSPercentBW = new Scalar("wifiVFNetworkQOSPercentBW", "qos_percent_bw"); //20140715
var wifiVFNetworkQOSMaxBWSelect = new Scalar("wifiVFNetworkQOSMaxBWSelect", "qos_max_bw_select"); //20140715
var wifiVFNetworkQOSMaxBW = new Scalar("wifiVFNetworkQOSMaxBW", "qos_max_bw"); //20140715
var wifiVFNetworkCaptivePortalUAMServer = new Scalar("wifiVFNetworkCaptivePortalUAMServer", "captive_portal_uam_server"); //20140715
var wifiVFNetworkCaptivePortalUAMSecret = new Scalar("wifiVFNetworkCaptivePortalUAMSecret", "captive_portal_uam_secret"); //20140715
var wifiVFNetworkWhiteListServer = new Scalar("wifiVFNetworkWhiteListServer", "white_list_server"); //20140715
//justin add end

//luis add
var settingsLanIP = new Scalar("settingsLanIP", "LanIP");
var settingsLanSubnetMask = new Scalar("settingsLanSubnetMask", "LanSubnetMask");
var settingsLanHostName = new Scalar("settingsLanHostName", "LanHostName");
var settingsLanDNSServer = new Scalar("settingsLanDNSServer", "LanDNSServer"); //20130909
var settingsLanDNSProxy = new Scalar("settingsLanDNSProxy", "LanDNSProxy"); //20130909
var settingsLanDHCP = new Scalar("settingsLanDHCP", "LanDHCP");
var settingsLanDHCPStartIP = new Scalar("settingsLanDHCPStartIP", "LanDHCPStartIP");
var settingsLanDHCPEndIP = new Scalar("settingsLanDHCPEndIP", "LanDHCPEndIP");
var settingsLanLeaseTime = new Scalar("settingsLanDHCPLeaseTime", "LanDHCPLeaseTime");
var settingsLanDomainName = new Scalar("settingsLanDHCPDomainName", "LanDHCPDomainName");
var settingsLanDHCPOption66 = new Scalar("settingsLanDHCPOption66", "LanDHCPOption66"); //20140526
var settingsLanDHCPOption67 = new Scalar("settingsLanDHCPOption67", "LanDHCPOption67"); //20140526
var settingsLanDHCPOption160 = new Scalar("settingsLanDHCPOption160", "LanDHCPOption160"); //20140526
var settingsLanStaticDHCPList = new Scalar("settingsLanStaticDHCPList", "LanStaticDHCPList");
var settingsLanIPv6DHCPServer = new Scalar("settingsLanIPv6DHCPServer", "ip6_dhcp_server"); //20140429
var settingsLanIPv6RouterAdvertisement = new Scalar("settingsLanIPv6RouterAdvertisement", "ip6_router_advertisement"); //20140429

var wifiScheduleFunction = new Scalar("wifiScheduleFunction", "ScheduleFunction");
var wifiScheduleAllowwifi = new Scalar("wifiScheduleAllowwifi", "ScheduleAllowwifi");
var wifiScheduleList = new Scalar("wifiScheduleList", "ScheduleList");

var internetdyndnsDNS = new Scalar("internetdyndnsDNS", "dyndnsEnable");
var internetdyndnsProvider = new Scalar("internetdyndnsProvider", "dyndnsProvider");
var internetdyndnsDomainName = new Scalar("internetdyndnsDomainName", "dyndnsDomainName");
var internetdyndnsAccount = new Scalar("internetdyndnsAccount", "dyndnsAccount");
var internetdyndnsPassword = new Scalar("internetdyndnsPassword", "dyndnsPassword");

var phonecallsettingdisplaycallnumber = new Scalar("phonecallsettingdisplaycallnumber", "callsetting_display_call_number");
var phonecallsettingsendphonenumber = new Scalar("phonecallsettingsendphonenumber", "callsetting_send_phone_number");
var phonecallsettingcallhold = new Scalar("phonecallsettingcallhold", "callsetting_call_hold");
var phonecallsettingcallwaiting = new Scalar("phonecallsettingcallwaiting", "callsetting_call_waiting");
var phonecallsettingthreewaycalling = new Scalar("phonecallsettingthreewaycalling", "callsetting_three_way_calling");
var phonecallsettingcalltransfer = new Scalar("phonecallsettingcalltransfer", "callsetting_call_transfer");
var phonecallsettingautomaticcall = new Scalar("phonecallsettingautomaticcall", "callsetting_automatic_call");
var phonecallsettingautomaticcallnumber = new Scalar("phonecallsettingautomaticcallnumber", "callsetting_automatic_call_number");
var phonecallsettingautomaticcalltimeout = new Scalar("phonecallsettingautomaticcalltimeout", "callsetting_automatic_call_timeout");
var phonecallsettingmwi = new Scalar("phonecallsettingmwi", "callsetting_mwi");
//
var phonecallsettingdisplaycallnumber_prov = new Scalar("phonecallsettingdisplaycallnumber_prov", "callsetting_display_call_number_prov");
var phonecallsettingsendphonenumber_prov = new Scalar("phonecallsettingsendphonenumber_prov", "callsetting_send_phone_number_prov");
var phonecallsettingcallhold_prov = new Scalar("phonecallsettingcallhold_prov", "callsetting_call_hold_prov");
var phonecallsettingcallwaiting_prov = new Scalar("phonecallsettingcallwaiting_prov", "callsetting_call_waiting_prov");
var phonecallsettingthreewaycalling_prov = new Scalar("phonecallsettingthreewaycalling_prov", "callsetting_three_way_calling_prov");
var phonecallsettingcalltransfer_prov = new Scalar("phonecallsettingcalltransfer_prov", "callsetting_call_transfer_prov");
var phonecallsettingautomaticcall_prov = new Scalar("phonecallsettingautomaticcall_prov", "callsetting_automatic_call_prov");
var phonecallsettingmwi_prov = new Scalar("phonecallsettingmwi_prov", "callsetting_mwi_prov");

//
var wifimacFilterFiltering = new Scalar("wifimacFilterFiltering", "macFilterFiltering");
var wifimacFilterAccessListed = new Scalar("wifimacFilterAccessListed", "access_listed");
var wifimacFilterList = new Scalar("wifimacFilterList", "macFilterList");

var statusSupport_adsl_reset = new Scalar("statusSupport_adsl_reset", "adsl_reset");

var statusSupport_wan_reset = new Scalar("statusSupport_wan_reset", "wan_reset");
var statusSupport_ipv6wan_reset = new Scalar("statusSupport_ipv6wan_reset", "ipv6wan_reset"); //20140626

var statusSupport_lan_reset = new Scalar("statusSupport_lan_reset", "lan_reset");

var settingstr069_inform = new Scalar("settingstr069_inform", "tr069_inform");
var settingstr069_inform_interval = new Scalar("settingstr069_inform_interval", "tr069_inform_interval");
var settingstr069_acs_url = new Scalar("settingstr069_acs_url", "tr069_acs_url");
var settingstr069_acs_username = new Scalar("settingstr069_acs_username", "tr069_acs_username");
var settingstr069_acs_password = new Scalar("settingstr069_acs_password", "tr069_acs_password");
var settingstr069_request_username = new Scalar("settingstr069_request_username", "tr069_request_username");
var settingstr069_request_password = new Scalar("settingstr069_request_password", "tr069_request_password");

var settingInternet_TimeZone = new Scalar("settingInternet_TimeZone", "time_zone"); //20150312
var settingInternet_synchronize = new Scalar("settingInternet_synchronize", "time_synchronize");
var settingInternet_update_period = new Scalar("settingInternet_update_period", "time_update_period");
var settingInternet_retry_interval = new Scalar("settingInternet_retry_interval", "time_retry_interval");
var settingInternet_ntp1 = new Scalar("settingInternet_ntp1", "time_ntp1");
var settingInternet_ntp2 = new Scalar("settingInternet_ntp2", "time_ntp2");
var settingInternet_ntp3 = new Scalar("settingInternet_ntp3", "time_ntp3");
var settingInternet_ntp4 = new Scalar("settingInternet_ntp4", "time_ntp4");
var settingInternet_ntp5 = new Scalar("settingInternet_ntp5", "time_ntp5");
//luis add end

//activation
var ActivationUserChoose = new Scalar("activation", "wan_user_choose");
var ResetWanFibre = new Scalar("activation", "reset_wan_fibre");
var ResetWanDsl = new Scalar("activation", "reset_wan_dsl");
var WPSStart = new Scalar("activation", "wps_start");
var AuthUsername = new Scalar("activation", "ppp_auth_username");
var AuthPassword = new Scalar("activation", "ppp_auth_password");
var RestartWIFI = new Scalar("activation", "wifi_start");
var activationIPTV_Lan = new Scalar("activationIPTV_Lan", "iptv_lan"); //20150323

//umts_activation
var umtsa_next_pageid = new Scalar("umts_activation", "next_pageid");
var umtsa_wait_time = new Scalar("umts_activation", "wait_time");
var umtsa_PIN = new Scalar("umts_activation", "PIN");
var umtsa_New_PIN = new Scalar("umts_activation", "New_PIN");
var umtsa_Repeat_New_PIN = new Scalar("umts_activation", "Repeat_New_PIN");
var umtsa_Save_PIN = new Scalar("umts_activation", "Save_PIN");
var umtsa_Deactivate_PIN = new Scalar("umts_activation", "Deactivate_PIN");
var umtsa_PIN_stat = new Scalar("umts_activation", "PIN_stat");
var umtsa_PUK = new Scalar("umts_activation", "PUK");
var umtsa_PUK_stat = new Scalar("umts_activation", "PUK_stat");
var umtsa_Connection = new Scalar("umts_activation", "Connection");
var umtsa_Signal_Strength = new Scalar("umts_activation", "Signal_Strength");
var umtsa_Download_Speed = new Scalar("umts_activation", "Download_Speed");
var umtsa_Upload_Speed = new Scalar("umts_activation", "Upload_Speed");
var umtsa_Downloaded_Data = new Scalar("umts_activation", "Downloaded_Data");
var umtsa_Uploaded_Data = new Scalar("umts_activation", "Uploaded_Data");
var umtsa_Uptime = new Scalar("umts_activation", "Uptime");
//var umtsa_ = new Scalar("umts_activation", "");

//wizard_er
var wizard_er_changepopup_login_name = new Scalar("wizard_er_changepopup_login_name", "login_name");
var wizard_er_changepopup_login_pwd = new Scalar("wizard_er_changepopup_login_pwd", "login_pwd");
var wizard_er_changepopup_mode = new Scalar("wizard_er_changepopup_mode", "mode");
var wizard_er_changepopup_channel = new Scalar("wizard_er_changepopup_channel", "channel");
var wizard_er_changepopup_encryption = new Scalar("wizard_er_changepopup_encryption", "encryption");
var wizard_er_changepopup_network_key = new Scalar("wizard_er_changepopup_network_key", "network_key");

var wizard_er_changepopup_band = new Scalar("wizard_er_changepopup_band", "band");
var wizard_er_changepopup_mode_5g = new Scalar("wizard_er_changepopup_mode_5g", "mode_5g");
var wizard_er_changepopup_channel_5g = new Scalar("wizard_er_changepopup_channel_5g", "channel_5g");
var wizard_er_changepopup_encryption_5g = new Scalar("wizard_er_changepopup_encryption_5g", "encryption_5g");
var wizard_er_changepopup_network_key_5g = new Scalar("wizard_er_changepopup_network_key_5g", "network_key_5g");

var wizard_er_changepopup_reset = new Scalar("wizard_er_changepopup_reset", "reset");

var wizard_er_restorewifi_get_parameters = new Scalar("wizard_er_restorewifi_get_parameters", "get_parameters");
var wizard_er_restorewifi_default_key = new Scalar("wizard_er_restorewifi_default_key", "default_key");
var wizard_er_restorewifi_pppoe_login = new Scalar("wizard_er_restorewifi_pppoe_login", "pppoe_login");

var wizard_er_connect1_login_name = new Scalar("wizard_er_connect1_login_name", "connect1_login_name");
var wizard_er_connect1_login_pwd = new Scalar("wizard_er_connect1_login_pwd", "connect1_login_pwd");

var wizard_er_connect3_connectstatus = new Scalar("wizard_er_connect3_connectstatus", "new_connect_status");
var wizard_er_connect3_start_check_new_fw = new Scalar("wizard_er_connect3_start_check_new_fw", "start_check_new_fw");

var wizard_er_update1_new_fw_version = new Scalar("wizard_er_update1_new_fw_version", "new_fw_version_status");


//wizard_er end

//sample
/*
 var mainScreenLoggedIn = new Scalar("mainScreenLoggedIn", "mainScreenLoggedIn_out");
 var mainWANIPaddr = new Scalar("mainWANIPaddr", "mainWANIPaddr_out");


 //single
 mainScreenLoggedIn.set("test", null, "filename");


 //multi
 var data_format = [
 {nameObj : mainScreenLoggedIn, value : "123"},
 {nameObj : mainWANIPaddr, value : "456"},
 ];
 dataBatchSend(data_format, callback, "filename");


 //call back
 function callback(data, textStatus, jqXHR){
 //alert(data);
 alert(textStatus);
 //alert(jqXHR);
 }
 */
//sample end

