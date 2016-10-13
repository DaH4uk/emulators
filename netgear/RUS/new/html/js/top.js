function languageShowlist()
{
document.write('<option value=Auto id=lang_auto>Auto</option>');
if (language_valueArray != "")
{
for (j=0; j<language_valueArray.length; j++)
{
document.write('<option value='+language_valueArray[j]+' id='+language_lang_Array[j]+'>'+language_showArray[j]+'</option>');
}
}
else
document.write('<option value=English id=lang_en_us>'+language_valueArray[0]+'</option>');
}
function change_container_posision()
{
if( document.body.clientWidth < document.body.scrollWidth )
document.getElementById("container").className="container_left";
else
document.getElementById("container").className="container_center";
}
function goto_top( page,first_menu)
{
if(first_menu=='basic'){
top.location.href=page; // BAS_bpa
}else if(first_menu=='adv'){
top.location.href=page; // BAS_bpa
}
}
function load_top_value()
{
form=document.forms[0];
var width = top.document.documentElement.clientWidth;
var upgrade_div = document.getElementById("update_info");
if(upgrade_div != null)
{
if(wan_status==1 && config_status==1 && updateFirmware==1)
upgrade_div.style.display = "inline";
else
upgrade_div.style.display = "none";
}
var basic_label = document.getElementById("basic_label");
var advanced_label = document.getElementById("advanced_label");
if(language_cgi=="Arabic")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click";
advanced_label.className = "label_unclick_long";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick";
advanced_label.className = "label_click_long";
}
}
else if(language_cgi=="Danish")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_long";
advanced_label.className = "label_unclick";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_long";
advanced_label.className = "label_click";
}
}
else if(language_cgi=="Finnish")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_long";
advanced_label.className = "label_unclick_long";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_long";
advanced_label.className = "label_click_long";
}
}
else if(language_cgi=="Greek")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_longest";
advanced_label.className = "label_unclick_longest";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_longest";
advanced_label.className = "label_click_longest";
}
}
else if(language_cgi=="Norwegian")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_long";
advanced_label.className = "label_unclick";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_long";
advanced_label.className = "label_click";
}
}
else if(language_cgi=="Polish")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_middle";
advanced_label.className = "label_unclick_long";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_middle";
advanced_label.className = "label_click_long";
}
}
else if(language_cgi=="Russian")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_long";
advanced_label.className = "label_unclick_middle";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_long";
advanced_label.className = "label_click_middle";
}
}
else if(language_cgi=="Swedish")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click_long";
advanced_label.className = "label_unclick";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick_long";
advanced_label.className = "label_click";
}
}
else if(language_cgi=="Dutch")
{
if(menu_Type == "basic")
{
basic_label.className = "label_click";
advanced_label.className = "label_unclick_middle";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick";
advanced_label.className = "label_click_middle";
}
}
else
{
if(menu_Type == "basic")
{
basic_label.className = "label_click";
advanced_label.className = "label_unclick";
}
else if(menu_Type == "advanced")
{
basic_label.className = "label_unclick";
advanced_label.className = "label_click";
}
}
/* to fix bug 25107 */
if(upgrade_div!=null&&upgrade_div.style.display != "none")
{
var upgrade_mess = upgrade_div.getElementsByTagName("i")[0];
var left = document.getElementById("labels").clientWidth + 20;
var free_width = width - left - 181;
var info_width = document.getElementById("update_info_middle").clientWidth + 34;
if( free_width > info_width )
{
var upgrade_left = (free_width - info_width)/2 > 20 ? 20 : (free_width - info_width)/2;
upgrade_div.className = "update_info_down";
upgrade_div.style.left = (left + upgrade_left) + "px";
}
else
{
upgrade_div.className="update_info_up";
upgrade_div.style.left="270px";
}
}
}
function disableMenu(flag)
{
if(flag==1)
{
top.document.getElementById('light').style.display='block';
top.document.getElementById('fade').style.display='block';
}
else if(flag==0)
{
top.contents.document.getElementById('light').style.display='none';
top.contents.document.getElementById('fade').style.display='none';
}
}
function firmwareUpgrade()
{
goto_formframe('UPG_check_version.htm');
}
function goto_formframe(page)
{
top.formframe.location.href=page;
}
