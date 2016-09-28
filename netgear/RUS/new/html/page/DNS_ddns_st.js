
function showDDNSState(_id,_state){
$(_id).style.display = _state;
}
function displayDDNSState(){
if(G_DDNSEnable == "0"){
showDDNSState('displayFail1','');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
else if(G_wanConnction[0][1] == ""){
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
else if(G_DDNSState == 'WAN Connection disconnected'){
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
else if(G_DDNSState == 'Service Provider Invalid'){
//%.2d:%.2d#####%d/%d/%d#####
var _time = G_DDNSStateValue.split('&#35;&#35;&#35;&#35;&#35;');
if(_time[0] == '')
supplyValue('time','...');
else
{
var _timeHM = _time[0].split(':');
var _hour = _timeHM[0];
if(Number(_hour)>12)
var _showTime = (Number(_hour)-12)+':'+_timeHM[1]+'PM'+','+_time[1];
else
var _showTime = _hour+':'+_timeHM[1]+'AM'+','+_time[1];
supplyValue('time',_showTime);
}
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
else if(G_DDNSState == 'Host Name is not registered'){
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
else if(G_DDNSState == 'Wrong user name or password')
{
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','');
showDDNSState('displaySuccess','none');
}
else if(G_DDNSState == 'IP updated successful')
{
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','none');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','');
//I:INADYN: Alias <beyoungs2011.dyndns.org/183.37.100.36> updated successful.
//00:17#####6/18/2012##### <lynxly.oicp.net/10.0.0.2>
if(G_DDNSProvider == 'DynDNS.org' || G_DDNSProvider == '3322.org')
var _temp = G_DDNSStateValue.split('I:INADYN: Alias');
else
var _temp = G_DDNSStateValue.split(' ');
if(_temp[0] == '')
supplyValue('timeSuccess','...');
else
{
//%.2d:%.2d#####%d/%d/%d#####
var _time = _temp[0].split('&#35;&#35;&#35;&#35;&#35;');
var _timeHM = _time[0].split(':');
var _hour = _timeHM[0];
if(Number(_hour)>12)
var _showTime = (Number(_hour)-12)+':'+_timeHM[1]+'PM'+','+_time[1];
else
var _showTime = _hour+':'+_timeHM[1]+'AM'+','+_time[1];
var _showIP = _temp[1];
var _a = _showIP.split('&lt;');
var _b = _a[1].split('&gt;');
supplyValue('ispName','&lt;' + _b[0] + '&gt;');
supplyValue('timeSuccess',_showTime);
}
}
else{
supplyValue('time','...');
showDDNSState('displayFail1','none');
showDDNSState('displayFail2','');
showDDNSState('displayFail3','none');
showDDNSState('displayFail4','none');
showDDNSState('displayFail5','none');
showDDNSState('displaySuccess','none');
}
}
function uiOnload(){
chg_language(data_language);
displayDDNSState();
setTimeout("window.location.reload(true)",15000);
}
