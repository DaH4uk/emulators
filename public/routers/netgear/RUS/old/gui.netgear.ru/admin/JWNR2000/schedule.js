function BlockAllClickCheck(cf)
{
if(cf.checkboxNameAll.checked)
{
cf.checkboxNameMon.checked = true;
cf.checkboxNameTue.checked = true;
cf.checkboxNameWed.checked = true;
cf.checkboxNameThu.checked = true;
cf.checkboxNameFri.checked = true;
cf.checkboxNameSat.checked = true;
cf.checkboxNameSun.checked = true;
cf.checkboxNameMon.disabled = true;
cf.checkboxNameTue.disabled = true;
cf.checkboxNameWed.disabled = true;
cf.checkboxNameThu.disabled = true;
cf.checkboxNameFri.disabled = true;
cf.checkboxNameSat.disabled = true;
cf.checkboxNameSun.disabled = true;
}
else
{
cf.checkboxNameMon.disabled = false;
cf.checkboxNameTue.disabled = false;
cf.checkboxNameWed.disabled = false;
cf.checkboxNameThu.disabled = false;
cf.checkboxNameFri.disabled = false;
cf.checkboxNameSat.disabled = false;
cf.checkboxNameSun.disabled = false;
}
 BlockPeriodClick(cf);
return;
}
function BlockPeriodClick(cf)
{
if(cf.checkboxNamehours.checked == true)
{
cf.starthour.disabled = true;
cf.startminute.disabled = true;
cf.endhour.disabled = true;
cf.endminute.disabled = true;
TimePeriodDisabled = true;
ClearData1();
}
else
{
cf.starthour.disabled = false;
cf.startminute.disabled = false;
cf.endhour.disabled = false;
cf.endminute.disabled = false;
TimePeriodDisabled = false;
}
return;
}
function ClearData1()
{
var cf = document.forms[0];

cf.starthour.value = "0";
cf.startminute.value = "0";
cf.endhour.value = "24";
cf.endminute.value = "0";
}
function check_schedule_apply(cf)
{
var cf = document.forms[0];
var value = 0;
var start_time,end_time;
var day_str="";

if (cf.checkboxNameAll.checked)
day_str = "everyday";
else
{
if (cf.checkboxNameSun.checked)
day_str += "0,";
if (cf.checkboxNameMon.checked)
day_str += "1,";
if (cf.checkboxNameTue.checked)
day_str += "2,";
if (cf.checkboxNameWed.checked)
day_str += "3,";
if (cf.checkboxNameThu.checked)
day_str += "4,";
if (cf.checkboxNameFri.checked)
day_str += "5,";
if (cf.checkboxNameSat.checked)
day_str += "6,";
}
cf.days_to_block.value = day_str;

if (cf.checkboxNamehours.checked == true)
all_day = 1;
else
{
all_day = 0;
if (cf.starthour.value == cf.endhour.value && cf.startminute.value == cf.endminute.value)
{
alert(invalid_time);
return false;
}
if( !_isNumeric(cf.starthour.value) || !_isNumeric(cf.endhour.value) || !_isNumeric(cf.startminute.value) || !_isNumeric(cf.endminute.value) )
{
alert(invalid_time);
return false;
}
if ((cf.starthour.value < 0) || (cf.starthour.value > 23) ||
(cf.endhour.value < 0) || (cf.endhour.value > 23) ||
(cf.startminute.value < 0) || (cf.startminute.value > 59) ||
(cf.endminute.value < 0) || (cf.endminute.value > 59))
{
if( (cf.starthour.value == "24" && cf.startminute.value == "0") ||(cf.starthour.value == "24" && cf.startminute.value == "00") || (cf.endhour.value == "24" && cf.endminute.value == "0" ) || (cf.endhour.value == "24" && cf.endminute.value == "00" ) )
{
if ((cf.starthour.value < 0) || (cf.starthour.value > 23) ||
(cf.startminute.value < 0) || (cf.startminute.value > 59) )
{
alert(invalid_time);
return false;
}
}
else
{
alert(invalid_time);
return false;
}
}

if ((cf.starthour.value == '') || (cf.endhour.value == ''))
{
alert(invalid_time);
return false;
}
if ((cf.starthour.value != '') && (cf.endhour.value != ''))
{
if (cf.startminute.value == '')
cf.startminute.value = 0;
if (cf.endminute.value == '')
cf.endminute.value = 0;
}
start_time = cf.starthour.value + ':' + cf.startminute.value;
end_time = cf.endhour.value + ':' + cf.endminute.value;
cf.start_block_time.value = start_time;
cf.end_block_time.value = end_time;
}

if (all_day == 1)
{
cf.start_block_time.value = "0:0";
cf.end_block_time.value = "24:0";
}
else
{
var start_time = cf.start_block_time.value.split(":");
var end_time = cf.end_block_time.value.split(":");

cf.start_block_time.value = start_time[0]+":"+start_time[1];
cf.end_block_time.value = end_time[0]+":"+end_time[1];
}
cf.all_day.value=all_day;
return true;
}
