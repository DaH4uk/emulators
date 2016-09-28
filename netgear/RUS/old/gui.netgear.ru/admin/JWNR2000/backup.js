function click_yesfactory()
{
cf=document.forms[0];
cf.action="upg_factory.cgi@_2Fpls_wait_factory_reboot.html";
if ( wds_endis_fun == '1' && wds_repeater_basic == '0' && endis_wl_radio == '1' )
 top.contents.location.href="menu_no_link_wds.html";
 else
top.contents.location.href="menu_no_link.html";
cf.submit();

}
