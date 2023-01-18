function clickUpgrade(form)
{
if(form.filename.value=="")
{
alert(in_upgrade);
return false;
}
 var filestr=form.filename.value;
 var file_format=filestr.substr(filestr.lastIndexOf(".")+1); 
if(file_format.toUpperCase()!="IMG")
{
alert(not_img);
 return false;
}
var win_file_name=filestr.substr(filestr.lastIndexOf("\\")+1);
var unix_file_name=filestr.substr(filestr.lastIndexOf("/")+1);
if(win_file_name == filestr && unix_file_name == filestr)
file_name=unix_file_name;
else if(win_file_name == filestr && unix_file_name != filestr)
file_name=unix_file_name;
else if( win_file_name != filestr && unix_file_name == filestr)
file_name=win_file_name;
else
{
alert(invalid_filename);
return false;
}
var file_array=file_name.split('-V');
if(file_array.length!=2)
{
alert(invalid_filename);
return false;
}
var file_module=file_array[0];
if(vender_model_name.toUpperCase()=="JWNB2100-1ZGNLS")
{
if(file_module.toUpperCase()!="JWNB2100")
{
alert("Error upgrade file module name! (Module name is JWNB2100");
return false;
}
}else{
if(file_module.toUpperCase()!=netgear_module.toUpperCase())
{
alert(error_module);
return false;
}
}
var ver_reg=file_array[1].substring(0,file_array[1].length-4);
find_reg=ver_reg;
for(i=0;i<find_reg.length;i++)
{
if((find_reg.charCodeAt(i)>58 && find_reg.charCodeAt(i)!=95)||find_reg.charCodeAt(i)<45)
break;
}

var file_region=find_reg.substring(i);
if(netgear_region == "NA")
{
if(file_region.toUpperCase()=="WW" || file_region=="")
{
if(!confirm(upgrade_1))
return false;
}
else
{
if(file_region.toUpperCase() == "GR")
{
if(!confirm(upgrade_2))
return false;
}
else if (file_region.toUpperCase() == "JP")
{
if(!confirm(upgrade_3))
return false;
}
else if (file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_13))
return false;
}
else if (file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_14))
return false;
}
else if (file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_15))
return false;
}
else if (file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_29))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_38))
return false;
}
else if (file_region.toUpperCase() != "NA")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "" || netgear_region.toUpperCase() == "WW")
{
if(file_region.toUpperCase() == "GR")
{
if(!confirm(upgrade_4))
return false;
}
else if (file_region.toUpperCase() == "JP")
{
if(!confirm(upgrade_5))
return false;
}
else if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_6))
return false;
}
else if(file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_26))
return false;
}
else if(file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_27))
return false;
}
else if(file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_28))
return false;
}
else if(file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_37))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_48))
return false;
}
else if (file_region.toUpperCase() != "" && file_region.toUpperCase() != "WW")
{
alert(error_firm_reg);
return false;
}
}
else if(netgear_region == "JP")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_7))
return false;
}
else
{
if(file_region.toUpperCase() == "GR")
{
if(!confirm(upgrade_8))
return false;
}
else if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_9))
return false;
}
else if (file_region.toUpperCase() != "JP")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "GR")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_11))
return false;
}
else if (file_region.toUpperCase() == "JP")
{
if(!confirm(upgrade_12))
return false;
}
else if (file_region.toUpperCase() != "GR")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "PR")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_16))
return false;
}
else if (file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_17))
return false;
}
else if (file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_18))
return false;
}
else if (file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_30))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_39))
return false;
}
else if (file_region.toUpperCase() != "PR")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "RU")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_19))
return false;
}
else if (file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_20))
return false;
}
else if (file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_21))
return false;
}
else if (file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_32))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_41))
return false;
}
else if (file_region.toUpperCase() != "RU")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "PT")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_22))
return false;
}
else if (file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_23))
return false;
}
else if (file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_24))
return false;
}
else if (file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_31))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_40))
return false;
}
else if (file_region.toUpperCase() != "PT")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "KO")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_33))
return false;
}
else if (file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_34))
return false;
}
else if (file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_36))
return false;
}
else if (file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_35))
return false;
}
else if (file_region.toUpperCase() == "IN")
{
if(!confirm(upgrade_42))
return false;
}
else if (file_region.toUpperCase() != "KO")
{
alert(error_firm_reg);
return false;
}
}
}
else if(netgear_region == "IN")
{
if(file_region=="" || file_region.toUpperCase() == "WW")
{
if(!confirm(upgrade_10))
return false;
}
else
{
if(file_region.toUpperCase() == "NA")
{
if(!confirm(upgrade_43))
return false;
}
else if (file_region.toUpperCase() == "PR")
{
if(!confirm(upgrade_44))
return false;
}
else if (file_region.toUpperCase() == "RU")
{
if(!confirm(upgrade_46))
return false;
}
else if (file_region.toUpperCase() == "PT")
{
if(!confirm(upgrade_45))
return false;
}
else if (file_region.toUpperCase() == "KO")
{
if(!confirm(upgrade_47))
return false;
}
else if (file_region.toUpperCase() != "IN")
{
alert(error_firm_reg);
return false;
}
}
}
var reglen=file_region.length;
var verreglen=ver_reg.length;
var version_len=verreglen-reglen;
var file_version=ver_reg.substring(0,version_len);
var netgear_version=netgear_ver.substring(1,netgear_ver.length);
parent.file_version = file_version;
parent.netgear_version = netgear_version;
var file_num=0;
var numa_array=file_version.split('.');
for(i=0;i<numa_array.length;i++)
file_num=parseInt(numa_array[i])+file_num*100;
var netgear_num=0;

var numc_array=netgear_version.split('.');
for(i=0;i<numc_array.length;i++)
netgear_num=parseInt(numc_array[i])+netgear_num*100;

if(netgear_num>file_num)
{
if(!confirm(oldver1 +file_version + oldver2 +netgear_version+ oldver3))
return false;
}
return true;
}
function clickUpgradeLanguage(form)
{
if(form.filename.value=="")
{
alert(in_upgrade);
return false;
}
 var filestr=form.filename.value;
 var file_format=filestr.substr(filestr.lastIndexOf("-")+1); 
if(file_format.toUpperCase()!="TABLE")
{
alert(not_language_img);
 return false;
}
var win_file_name=filestr.substr(filestr.lastIndexOf("\\")+1);
var unix_file_name=filestr.substr(filestr.lastIndexOf("/")+1);
if(win_file_name == filestr && unix_file_name != filestr)
file_name=unix_file_name;
else if( win_file_name != filestr && unix_file_name == filestr)
file_name=win_file_name;
else
{
alert(invalid_filename);
return false;
}
var file_array=file_name.split('-');
if(file_array.length!=4)
{
alert(invalid_filename);
return false;
}
var file_module=file_array[0];
if(file_module.toUpperCase()!=netgear_module.toUpperCase())
{
alert(error_module);
return false;
}
var file_end=file_array[2];
if(file_end.toUpperCase()!="LANGUAGE")
{
alert(error_language_form);
return false;
}
return true;
}
function check_if_show()
{
var cf = document.forms[0];
 if (cf.check_upon.checked == true)
 cf.auto_check_for_upgrade.value=1;
 else
 {
 if(confirm(upgrade_turnoff_auto))
 cf.auto_check_for_upgrade.value=0;
 else
 return false;
 }
cf.submit_flag.value="auto_upgrade_check";
cf.submit();
}
function check_if_show_auto()
{
 var cf = document.forms[0];
 if (cf.check_upon.checked == true)
 cf.auto_check_for_upgrade.value=1;
 else
 {
 if(confirm(upgrade_turnoff_auto))
 cf.auto_check_for_upgrade.value=0;
 else
{
cf.check_upon.checked = true;
 return false;
}
 }
 cf.submit_flag.value="auto_upgrade_check";
cf.action="setobject.cgi@_2Fcgi-bin_2FCheckNewFW.html"
 cf.submit();
}
function click_check()
{
var cf=document.forms[0];
cf.submit_flag.value="download_confile";
cf.action="no_commit.cgi@_2Fcgi-bin_2Fsearch_serv.html"
cf.submit();
}
function click_check_language()
{
var cf=document.forms[0];
cf.submit_flag.value="download_language_confile";
cf.action="no_commit.cgi@_2Fcgi-bin_2Fsearch_serv_language.html"
cf.submit();
}
function auto_search()
{
 var cf=document.forms[0];
cf.submit_flag.value="auto_download_confile";
cf.action="no_commit.cgi@_2Fcgi-bin_2Fsearch_serv.html"
cf.submit();
}
