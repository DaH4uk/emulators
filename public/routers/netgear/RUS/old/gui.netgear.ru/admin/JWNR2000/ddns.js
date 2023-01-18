
function click_ddns(form)
{
if ( form.sysDNSActive.checked)
form.ddns_enabled.value = "1";
else
form.ddns_enabled.value = "0";

/*if ( form.sysDNSWildCard.checked)
form.wildcards_enabled.value="1";
else
form.wildcards_enabled.value="0";
*/
if ( form.sysDNSActive.checked)
{
if(form.sysDNSHost.value=="" && form.sysDNSProviderlist.value != 3)
 {
 alert(hostname_null);
 return false;
 }
if(form.sysDNSUser.value=="")
{
alert(user_name_null);
return false;
}
if(form.sysDNSPassword.value=="")
 {
 alert(password_null);
 return false;
 }
}
if(form.sysDNSProviderlist.value != 3){
for(i=0;i<form.sysDNSHost.value.length;i++)
 {
 if(isValidDdnsHost(form.sysDNSHost.value.charCodeAt(i))==false)
 {
 alert(hostname_error);
 return false;
 }
 }
}
for(i=0;i<form.sysDNSUser.value.length;i++)
 {
 if(isValidChar_all(form.sysDNSUser.value.charCodeAt(i))==false)
 {
 alert(user_name_error);
 return false;
 }
 }
 for(i=0;i<form.sysDNSPassword.value.length;i++)
 {
 if(isValidChar_all(form.sysDNSPassword.value.charCodeAt(i))==false)
 {
 alert(password_error);
 return false;
 }
 }
if( old_endis_ddns != form.ddns_enabled.value || old_sysDNSHost != form.sysDNSHost.value || old_sysDNSUser != form.sysDNSUser.value || old_sysDNSPassword != form.sysDNSPassword.value /*|| old_endis_wildcards != form.wildcards_enabled.value*/)
form.change_wan_type.value=0;
else
form.change_wan_type.value=1;
return true;
}
