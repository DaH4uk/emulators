function checkadv(form)
{
if(form.szRts_11g.value == "")
{
alert(rts_null);
return false;
}
if(form.szFrag_11g.value == "")
{
alert(fragmentation_null);
return false;
}
if(!(form.szRts_11g.value > 0 && form.szRts_11g.value <= 2347))
{
alert(rts_range);
return false;
}
if(!(form.szFrag_11g.value > 255 && form.szFrag_11g.value < 2347))
{
alert(fragmentation_range);
return false;
}
if(form.endis_ssid_broadcast.checked == true)
 form.enable_ssid_broadcast.value="1";
else
 form.enable_ssid_broadcast.value="0";
if(form.endis_router.checked == true)
 form.enable_router.value="1";
else
 form.enable_router.value="0";
if(form.endis_wps.checked == true )
form.endis_pin.value="1";
else
form.endis_pin.value="0";
 if(form.keep_exist.checked == true)
form.endis_wsc_config.value="5";
else
form.endis_wsc_config.value="1";
 return true;
}
