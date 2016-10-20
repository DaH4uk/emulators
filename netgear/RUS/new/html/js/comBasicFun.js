<<<<<<< HEAD
﻿/*+-----------------------------------------+
| FileName : Javascript Common Web Check Function |
| Edtion : To Trunk R2 |
| Author : TBS Software |
+-----------------------------------------+*/
/*检测是否全部是数字*/
function validateKey(str)
{
for (var i=0; i<str.length; i++) {
if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) == '.' ) )
continue;
return 0;
}
return 1;
}
function _isNumeric(str) {
var i;
for(i = 0; i<str.length; i++) {
var c = str.substring(i, i+1);
if("0" <= c && c <= "9") {
continue;
}
return false;
}
return true;
}
/*控制文本输入框 add by suxiaoqing */
function getkey(type, e)
{
var keycode, event;
if (window.event)
{
event = window.event;
keycode = window.event.keyCode;
}
else if (e)
{
event = e;
keycode = e.which;
}
else return true;
if(type == "num")
{
if(((keycode>47) && (keycode<58)) || (keycode==8)||(keycode==0))
return true;
else return false;
}
else if(type == "ssid")
{
if (keycode==1) return false;
else return true;
}
}
function getDigit(str, num)
{
i=1;
if ( num != 1 ) {
while (i!=num && str.length!=0) {
if ( str.charAt(0) == '.' ) {
i++;
}
str = str.substring(1);
}
if ( i!=num )
return -1;
}
for (i=0; i<str.length; i++) {
if ( str.charAt(i) == '.' ) {
str = str.substring(0, i);
break;
}
}
if ( str.length == 0)
return -1;
var d = parseInt(str, 10);
return d;
}
/*判断地址是否在范围内*/
function checkDigitRange(str, num, min, max)
{
var d = getDigit(str,num);
if ( d > max || d < min )
return false;
return true;
}
function checkIpAddr(_value)
{
if (_value == "...") {
alertError('CheckIpValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckIpValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckIpValue3',1);
return false;
}
if ( getDigit(_value,1) ==127) {
alertError('CheckIpValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckIpValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckIpValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckIpValue7',1);
return false;
}
return true;
}
/*检测Mask地址是否合法*/
function checkMask(str, num)
{
var d = getDigit(str,num);
if( !(d==0 || d==128 || d==192 || d==224 || d==240 || d==248 || d==252 || d==254 || d==255 ))
return false;
return true;
}
function isValidMask2(str)
{
var _value = str.split('.');
var _numValue=0;
var _flag=0;
for(var _i=0; _i<_value.length; _i++)
{
var _numValue = parseInt(_value[_i],10);
for(var _j=0; _j<8; _j++)
{
if(parseInt(_numValue&128,10)==128)
{
if(_flag==1)
{
return false;
}
}
else if(parseInt(_numValue&128,10)!=128)
{
_flag=1;
}
_numValue = _numValue << 1;
}
}
return true;
}
/*判断子网掩码的合法性*/
function isValidMask(_value)
{
if (_value=="...")
{
alertError('CheckMaskValue1',1);
return false;
}
if (_value == "255.255.255.255")
{
alertError('CheckMaskValue2',1);
return false;
}
if (_value == "0.0.0.0")
{
alertError('CheckMaskValue3',1);
return false;
}
if ( validateKey(_value) == 0 )
{
alertError('CheckMaskValue4',1);
return false;
}
if ( !checkMask(_value,1))
{
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,2)) {
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,3)) {
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,4)) {
alertError('CheckMaskValue5',1);
return false;
}
if (! ( (getDigit(_value,1) >= getDigit(_value,2))
&& (getDigit(_value,2) >= getDigit(_value,3))
&& (getDigit(_value,3) >= getDigit(_value,4)) ) )
{
alertError('CheckMaskValue5',1);
return false;
}
if (!isValidMask2(_value)) {
alertError('CheckMaskValue5',1);
return false;
}
return true;
}
//for lan.html page checking Ip & Mask is valid value
function checkIp_Mask(lanIp,lanMask)
{
var count = 0;
var count2 = 0;
var l1a_n,l1m_n;
var _lanIp = lanIp.split('.');
var _lanMask = lanMask.split('.');
for (i = 0; i < 4; i++) {
l1a_n = parseInt(_lanIp[i]);
l1m_n = parseInt(_lanMask[i]);
if ((l1a_n & l1m_n)==0)
count++;
else if((l1a_n & l1m_n)==1)
count2++;
}
if (count == 4)
{
alertError('CheckIp_Mask',1);
return false;
}
else if(count2 == 4)
{
alertError('CheckIp_Mask',1);
return false;
}
else
return true;
}
/*判断网关地址是否合法*/
function checkGatewayAddr(_value)
{
if (_value == "...") {
alertError('CheckGatewayValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckGatewayValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckGatewayValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckGatewayValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckGatewayValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckGatewayValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckGatewayValue7',1);
return false;
}
return true;
}
/*判断DNS地址是否合法*/
function checkPrimaryDNS(_value)
{
if (_value == "...") {
alertError('CheckPrimaryDnsValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckPrimaryDnsValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckPrimaryDnsValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckPrimaryDnsValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckPrimaryDnsValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckPrimaryDnsValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckPrimaryDnsValue7',1);
return false;
}
return true;
}
function checkSecondaryDNS(_value)
{
if ( validateKey(_value) == 0) {
alertError('CheckSecondaryDnsValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckSecondaryDnsValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckSecondaryDnsValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckSecondaryDnsValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckSecondaryDnsValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckSecondaryDnsValue7',1);
return false;
}
return true;
}
function checkHex(str)
{
for(var i=0; i<str.length; i++)
{
if((str.charAt(i) >= '0' && str.charAt(i) <= '9')||
(str.charAt(i) >= 'a' && str.charAt(i) <= 'f')||
(str.charAt(i) >= 'A' && str.charAt(i) <= 'F'))
{continue;}
else {return false;}
}
}
function checkSecurityKey(str)
{
if($('wepenc').value == '1')
{
if(checkHex(str) == false || str.length != 10)
{
alertError("CheckSecurityKey1");
return false;
}
}
else if($('wepenc').value == '2')
{
if(checkHex(str) == false || str.length != 26)
{
alertError("CheckSecurityKey2");
return false;
}
}
}
function checkWord(s)
{
var patrn=/(\|)|(\\)|(\`)/;
if(patrn.test(s)==true)
{
alertError('CheckPassphrase');
return false;
}
else
{
return true;
}
}
function checkBlank(str)
{
if(str.charAt(str.length-1) == " " || str.charAt(0) == " ")
{
alertError('CheckBlank');
}
str = str.replace(/(^\s*)|(\s*$)/g,"");
return str;
}
function checkPassphrase(str)
{
if(str.length == 64)
{
if(checkHex(str) == false)
{
alertError("CheckSecurityPwd1");
return false;
}
}
if(str.length < 8)
{
alertError("CheckSecurityPwd2");
return false;
}
if(checkWord(str)==false)
return false;
else
return true;
}
function checkNameBlank(str)
{
var patrn = /^\S{1,100}$/;
var tmp = str;
if(str == "")
{
return false;
}
else
{ 
if(!patrn.exec(str))
{
str = str.replace(/\s/g,"");
}
if (tmp == str)
{
return true;
}
else
{
return str;
}
}
}
function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask)
{
var count = 0;
lan1a = lan1Ip.split('.');
lan1m = lan1Mask.split('.');
lan2a = lan2Ip.split('.');
lan2m = lan2Mask.split('.');
for (i = 0; i < 4; i++) {
l1a_n = parseInt(lan1a[i]);
l1m_n = parseInt(lan1m[i]);
l2a_n = parseInt(lan2a[i]);
l2m_n = parseInt(lan2m[i]);
if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
count++;
}
if (count == 4)
return true;
else
return false;
}
function checkURL(s)
{
var patrn=/^\w+$/;
var patrn2=/\./;
var patrn3=/\//;
for (var i = 0; i < s.length; i++)
{
if (!patrn.exec(s.substr(i, 1)))
{
if(!patrn2.exec(s.substr(i, 1)))
{
if(!patrn3.exec(s.substr(i, 1)))
{
alert('###nomatch');
return false;
}
}
}
}
return true;
}
function checkSSID(s)
{
var patrn=/[^A-Za-z0-9-_]/;
if(patrn.test(s)==true)
{
alertError('CheckSSID',1);
return false;
}
else
return true;
}
function hideChForWep(_tap,_num,_Bool)
{
var _tmpFlag;
for(var _i=0; _i < _num; _i++)
{
_tmpFlag=_tap+(_i+1);
_tmpFlag = document.getElementById(_tmpFlag);
_tmpFlag.style.display=_Bool;
}
}
function getNameValue(_Name)
{
var _tmp = document.getElementsByName(_Name);
for (var i=0;i<_tmp.length;i++) {
if (_tmp[i].checked) {
return _tmp[i].value;
}
}
return null;
}
//for Netgear
function isHex(str) {
var i;
for(i = 0; i<str.length; i++) {
var c = str.substring(i, i+1);
if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
continue;
}
return false;
}
return true;
}
/* Just check if MAC address is all "F", or all "0" , with ':' in it or not weal @ Aug 14*/
function MacStrallf(mac) {
var temp=mac.value;
for(i=0; i<mac.value.length;i++) {
var c = mac.value.substring(i, i+1)
if (c == "f" || c == "F" || c == "0" || c == ":" || c == "-")
continue;
else
break;
}
if (i == mac.value.length)
return true;
else
return false;
}
/* Check Multicast MAC */
function checkMulticastMAC(macaddr) {
var mac_defined = macaddr.value;
var macadr_first_byte = parseInt(mac_defined.substring(0,2),16);
var Multicast_Flag = macadr_first_byte & 0x01;
if( Multicast_Flag )
return true;
return false;
}
/* Check Mac Address Format*/
function checkMacMain(mac) {
if(mac.value.length == 0) {
if (mac.focus)
mac.focus();
return true;
}
for(i=0; i<mac.value.length;i++) {
var c = mac.value.substring(i, i+1)
if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
continue;
}
if (mac.focus)
mac.focus();
return true;
}
if(mac.value.length == 1) {
mac.value = "0"+mac.value;
}
mac.value = mac.value.toUpperCase();
return false;
}
/* Check Numeric*/
function isNumeric(str, max) {
if(str.value.length == 0 || str.value == null || str.value == "") {
if (str.focus)
str.focus();
return true;
}
var i = parseInt(str.value,10);
if(i>max) {
if (str.focus)
str.focus();
return true;
}
for(i=0; i<str.value.length; i++) {
var c = str.value.substring(i, i+1);
if("0" <= c && c <= "9") {
continue;
}
if (str.focus)
str.focus();
return true;
}
return false;
}
/* Check IP Address Format*/
function checkIPMain(ip,max) {
if( isNumeric(ip, max) ) {
if (ip.focus)
ip.focus();
return true;
}
}
function checkMacAddress(mac1, mac2, mac3, mac4, mac5, mac6) {
if(checkMacMain(mac1)) return true;
if(checkMacMain(mac2)) return true;
if(checkMacMain(mac3)) return true;
if(checkMacMain(mac4)) return true;
if(checkMacMain(mac5)) return true;
if(checkMacMain(mac6)) return true;
var mac_str = new String("");
mac_str.value = mac1.value + mac2.value + mac3.value+ mac4.value + mac5.value + mac6.value;
if(checkMulticastMAC(mac_str) || MacStrallf(mac_str))
return true;
return false;
}
function check_mac(mac1, mac2, mac3, mac4, mac5, mac6)
{
var msg = "";
var m1;
if(checkMacAddress(mac1, mac2, mac3, mac4, mac5, mac6))
msg += "Invalid MAC address.";
if (mac1.value == "00" && mac2.value == "00" && mac3.value == "00" && mac4.value == "00" && mac5.value == "00" && mac6.value == "00")
msg += "Invalid MAC address.";
if (mac1.value == "FF" && mac2.value == "FF" && mac3.value == "FF" && mac4.value == "FF" && mac5.value == "FF" && mac6.value == "FF")
msg += "Invalid MAC address.";
m1 = parseInt(mac1.value, 16);
if (m1 & 1)
msg += "Invalid MAC address.";
if (msg.length > 1) {
//alert("Invalid MAC address.");
alertError('WLG_wdsWrongMac',1);
return false;
}
return true;
}
function checkIP(ip1, ip2, ip3, ip4,max) {
if(checkIPMain(ip1,255)) return true;
if(checkIPMain(ip2,255)) return true;
if(checkIPMain(ip3,255)) return true;
if(checkIPMain(ip4,max)) return true;
if((ip1.value.charAt(0)=="0" && ip1.value.length!=1) ||
(ip2.value.charAt(0)=="0" && ip2.value.length!=1) ||
(ip3.value.charAt(0)=="0" && ip3.value.length!=1) ||
(ip4.value.charAt(0)=="0" && ip4.value.length!=1))
return true;
if((parseInt(ip1.value)==0)||
((parseInt(ip1.value)==0)&&(parseInt(ip2.value)==0)&&
(parseInt(ip3.value)==0)&&(parseInt(ip4.value)==0)))
return true;
var loopback_ip_start = (127 << 24) | (0 << 16) | (0 << 8) | (0);
var loopback_ip_end = (127 << 24) | (255 << 16) | (255 << 8) | (255);
var groupcast_ip_start = (224 << 24) | (0 << 16) | (0 << 8) | (0);
var groupcast_ip_end = (239 << 24) | (255 << 16) | (255 << 8) | (255);
var dhcpresv_ip_start = (169 << 24) | (254 << 16) | (0 << 8) | (0);
var dhcpresv_ip_end = (169 << 24) | (254 << 16) | (255 << 8) | (255);
var ip_addr = (ip1.value << 24) | (ip2.value << 16) | (ip3.value << 8) | (ip4.value);
if((ip_addr >= loopback_ip_start)&&(ip_addr <= loopback_ip_end))
return true;
if((ip_addr >= groupcast_ip_start)&&(ip_addr <= groupcast_ip_end ))
return true;
if((ip_addr >= dhcpresv_ip_start)&&(ip_addr <= dhcpresv_ip_end))
return true;
return false;
}
function ipNum(ipStr)
{
var total = 0;
var ip_array=ipStr.split('.');
var ip1=ip_array[0];
var ip2=ip_array[1];
var ip3=ip_array[2];
var ip4=ip_array[3];
total += parseInt(ip4);
total += parseInt(ip3)*256;
total += parseInt(ip2)*256*256;
total += parseInt(ip1)*256*256*256;
total = parseInt(total);
return total;
}
function checkipaddr(ipaddr)
{
var form = document.forms[0];
var ipArray = ipaddr.split(".");
var ipstr = ipArray[0]+ipArray[1]+ipArray[2]+ipArray[3];
var i = 0;
if((ipArray[0]=="")||(ipArray[0]<0)||(ipArray[0]>255)||(ipArray[1]=="")||(ipArray[1]<0)||(ipArray[1]>255)
||(ipArray[2]=="")||(ipArray[2]<0)||(ipArray[2]>255)||(ipArray[3]=="")||(ipArray[3]<0)||(ipArray[3]>255))
{
return false;
}
for(i=0;i<ipstr.length;i++)
{
if((ipstr.charAt(i)!='0')&&(ipstr.charAt(i)!='1')&&(ipstr.charAt(i)!='2')
&&(ipstr.charAt(i)!='3')&&(ipstr.charAt(i)!='4')&&(ipstr.charAt(i)!='5')
&&(ipstr.charAt(i)!='6')&&(ipstr.charAt(i)!='7')&&(ipstr.charAt(i)!='8')
&&(ipstr.charAt(i)!='9'))
{
return false;
}
}
if( ipArray[0] > 223 || ipArray[0] == 0 )
return false;
if (ipaddr == "0.0.0.0" || ipaddr == "255.255.255.255")
{
return false;
}
var each=ipaddr.split(".");
if (each[0] == "127")
{
return false;
}
if (!ipArray || ipArray.length != 4)
{
return false;
}
else
{
for (i = 0; i < 4; i++)
{
thisSegment = ipArray[i];
if (thisSegment != "")
{
if(i==3){
if (!((ipArray[3] > 0) && (ipArray[3] < 255)))
{
return false;
}
}
else if (!(thisSegment >=0 && thisSegment <= 255))
{
return false;
}
}
else
{
return false;
}
}
}
return true;
}
function cp_ip2(from,to)
//true invalid from and to ip; false valid from and to ip;
{
var total1 = 0;
var total2 = 0;
var from_array=from.split('.');
var to_array = to.split('.');
var from1=from_array[0];
var to1=to_array[0];
if(parseInt(from1,10) <= 127 && parseInt(to1,10) >= 127 )
{
return false;
}
var from2=from_array[1];
var from3=from_array[2];
var from4=from_array[3];
var to2=to_array[1];
var to3=to_array[2];
var to4=to_array[3];
total1 += parseInt(from4,10);
total1 += parseInt(from3,10)*256;
total1 += parseInt(from2,10)*256*256;
total1 += parseInt(from1,10)*256*256*256;
total2 += parseInt(to4,10);
total2 += parseInt(to3,10)*256;
total2 += parseInt(to2,10)*256*256;
total2 += parseInt(to1,10)*256*256*256;
if(total1 <= total2)
return true;
return false;
}
function checksubnet(subnet)
{
var subnetArray = subnet.split(".");
var subnetstr = subnetArray[0]+subnetArray[1]+subnetArray[2]+subnetArray[3];
var i = 0;
var maskTest = 0;
var validValue = true;
if((subnetArray[0]=="")||(subnetArray[0]<0)||(subnetArray[0]>255)||(subnetArray[1]=="")||(subnetArray[1]<0)||(subnetArray[1]>255)
||(subnetArray[2]=="")||(subnetArray[2]<0)||(subnetArray[2]>255)||(subnetArray[3]=="")||(subnetArray[3]<0)||(subnetArray[3]>255))
{
return false;
}
for(i=0;i<subnetstr.length;i++)
{
if((subnetstr.charAt(i)!='0')&&(subnetstr.charAt(i)!='1')&&(subnetstr.charAt(i)!='2')
&&(subnetstr.charAt(i)!='3')&&(subnetstr.charAt(i)!='4')&&(subnetstr.charAt(i)!='5')
&&(subnetstr.charAt(i)!='6')&&(subnetstr.charAt(i)!='7')&&(subnetstr.charAt(i)!='8')
&&(subnetstr.charAt(i)!='9'))
{
return false;
}
}
if (!subnetArray || subnetArray.length != 4)
{
return false;
}
else
{
for (i = 0; i < 4; i++) {
thisSegment = subnetArray[i];
if (thisSegment != "") {
if (!(thisSegment >=0 && thisSegment <= 255)) { //check if number?
return false;
}
} else {
return false;
}
}
}
if( subnetArray[0] < 255 )
{
if( (subnetArray[1] > 0) || (subnetArray[2] > 0) || (subnetArray[3] > 0))
validValue = false;
else
maskTest = subnetArray[0];
}
else
{
if( subnetArray[1] < 255 )
{
if( (subnetArray[2] > 0) || (subnetArray[3] > 0))
validValue = false;
else
maskTest = subnetArray[1];
}
else
{
if( subnetArray[2] < 255 )
{
if( (subnetArray[3] > 0) )
validValue = false;
else
maskTest = subnetArray[2];
}
else
maskTest = subnetArray[3];
}
}
if( validValue ) {
switch( maskTest ) {
case "0":
case "128":
case "192":
case "224":
case "240":
case "248":
case "252":
case "254":
case "255":
break;
default:
validValue = false;
}
if( subnet == "0.0.0.0" )
validValue = false;
}
else
validValue = false;
return validValue;
}
function address_parseInt(addr)/*to fix bug 26258*/
{
addr_array = addr.split(".");
for(i=0; i< 4; i++)
{
if( 0 == i )
addr = parseInt(addr_array[i], 10);
else
addr = addr + "." +parseInt(addr_array[i], 10);
}
return addr;
}
function isGateway(lanIp, lanMask, gtwIp)
{
gtw_arr = gtwIp.split('.');
var ip_gtw=0;
for (i = 0; i < 4; i++)
{
gtw_str = parseInt(gtw_arr[i],10);
ip_gtw=ip_gtw*256+parseInt(gtw_str);
}
addr_arr = lanIp.split('.');
var ip_addr=0;
for (i = 0; i < 4; i++)
{
addr_str = parseInt(addr_arr[i],10);
ip_addr=ip_addr*256+parseInt(addr_str);
}
var ip_sub=isSub(lanIp, lanMask);
var ip_broadcast=isBroadcast(lanIp, lanMask)
if((parseInt(ip_sub)<parseInt(ip_gtw))&&(parseInt(ip_gtw)<parseInt(ip_broadcast)))
return true;
else
return false;
}
function isSameIp(ipstr1,ipstr2)
{
var count = 0;
var ip1_array=ipstr1.split('.');
var ip2_array=ipstr2.split('.');
for(i = 0;i<4;i++)
{
num1 = parseInt(ip1_array[i], 10);
num2 = parseInt(ip2_array[i], 10);
if( num1 == num2)
count++;
}
if( count == 4)
return true;
else
return false;
}
/*去掉字符串的 头空格*/
function LTrim(str){
var i; 
for(i=0;;i++)
{ 
if(str.charAt(i)!=" ")
break; 
} 
str = str.substring(i,str.length); 
return str; 
}
/*去掉字符串的 尾空格*/
function RTrim(str){
var i; 
for(i=str.length-1;i>=0;i--)
{ 
if(str.charAt(i)!=" ")
break; 
} 
str = str.substring(0,i+1); 
return str; 
} 
/*去掉字符串的 前、尾空格(注意是调用以上两个方法)*/
function Trim(str){
return LTrim(RTrim(str)); 
}
=======
﻿/*+-----------------------------------------+
| FileName : Javascript Common Web Check Function |
| Edtion : To Trunk R2 |
| Author : TBS Software |
+-----------------------------------------+*/
/*检测是否全部是数字*/
function validateKey(str)
{
for (var i=0; i<str.length; i++) {
if ( (str.charAt(i) >= '0' && str.charAt(i) <= '9') || (str.charAt(i) == '.' ) )
continue;
return 0;
}
return 1;
}
function _isNumeric(str) {
var i;
for(i = 0; i<str.length; i++) {
var c = str.substring(i, i+1);
if("0" <= c && c <= "9") {
continue;
}
return false;
}
return true;
}
/*控制文本输入框 add by suxiaoqing */
function getkey(type, e)
{
var keycode, event;
if (window.event)
{
event = window.event;
keycode = window.event.keyCode;
}
else if (e)
{
event = e;
keycode = e.which;
}
else return true;
if(type == "num")
{
if(((keycode>47) && (keycode<58)) || (keycode==8)||(keycode==0))
return true;
else return false;
}
else if(type == "ssid")
{
if (keycode==1) return false;
else return true;
}
}
function getDigit(str, num)
{
i=1;
if ( num != 1 ) {
while (i!=num && str.length!=0) {
if ( str.charAt(0) == '.' ) {
i++;
}
str = str.substring(1);
}
if ( i!=num )
return -1;
}
for (i=0; i<str.length; i++) {
if ( str.charAt(i) == '.' ) {
str = str.substring(0, i);
break;
}
}
if ( str.length == 0)
return -1;
var d = parseInt(str, 10);
return d;
}
/*判断地址是否在范围内*/
function checkDigitRange(str, num, min, max)
{
var d = getDigit(str,num);
if ( d > max || d < min )
return false;
return true;
}
function checkIpAddr(_value)
{
if (_value == "...") {
alertError('CheckIpValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckIpValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckIpValue3',1);
return false;
}
if ( getDigit(_value,1) ==127) {
alertError('CheckIpValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckIpValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckIpValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckIpValue7',1);
return false;
}
return true;
}
/*检测Mask地址是否合法*/
function checkMask(str, num)
{
var d = getDigit(str,num);
if( !(d==0 || d==128 || d==192 || d==224 || d==240 || d==248 || d==252 || d==254 || d==255 ))
return false;
return true;
}
function isValidMask2(str)
{
var _value = str.split('.');
var _numValue=0;
var _flag=0;
for(var _i=0; _i<_value.length; _i++)
{
var _numValue = parseInt(_value[_i],10);
for(var _j=0; _j<8; _j++)
{
if(parseInt(_numValue&128,10)==128)
{
if(_flag==1)
{
return false;
}
}
else if(parseInt(_numValue&128,10)!=128)
{
_flag=1;
}
_numValue = _numValue << 1;
}
}
return true;
}
/*判断子网掩码的合法性*/
function isValidMask(_value)
{
if (_value=="...")
{
alertError('CheckMaskValue1',1);
return false;
}
if (_value == "255.255.255.255")
{
alertError('CheckMaskValue2',1);
return false;
}
if (_value == "0.0.0.0")
{
alertError('CheckMaskValue3',1);
return false;
}
if ( validateKey(_value) == 0 )
{
alertError('CheckMaskValue4',1);
return false;
}
if ( !checkMask(_value,1))
{
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,2)) {
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,3)) {
alertError('CheckMaskValue5',1);
return false;
}
if ( !checkMask(_value,4)) {
alertError('CheckMaskValue5',1);
return false;
}
if (! ( (getDigit(_value,1) >= getDigit(_value,2))
&& (getDigit(_value,2) >= getDigit(_value,3))
&& (getDigit(_value,3) >= getDigit(_value,4)) ) )
{
alertError('CheckMaskValue5',1);
return false;
}
if (!isValidMask2(_value)) {
alertError('CheckMaskValue5',1);
return false;
}
return true;
}
//for lan.html page checking Ip & Mask is valid value
function checkIp_Mask(lanIp,lanMask)
{
var count = 0;
var count2 = 0;
var l1a_n,l1m_n;
var _lanIp = lanIp.split('.');
var _lanMask = lanMask.split('.');
for (i = 0; i < 4; i++) {
l1a_n = parseInt(_lanIp[i]);
l1m_n = parseInt(_lanMask[i]);
if ((l1a_n & l1m_n)==0)
count++;
else if((l1a_n & l1m_n)==1)
count2++;
}
if (count == 4)
{
alertError('CheckIp_Mask',1);
return false;
}
else if(count2 == 4)
{
alertError('CheckIp_Mask',1);
return false;
}
else
return true;
}
/*判断网关地址是否合法*/
function checkGatewayAddr(_value)
{
if (_value == "...") {
alertError('CheckGatewayValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckGatewayValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckGatewayValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckGatewayValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckGatewayValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckGatewayValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckGatewayValue7',1);
return false;
}
return true;
}
/*判断DNS地址是否合法*/
function checkPrimaryDNS(_value)
{
if (_value == "...") {
alertError('CheckPrimaryDnsValue1',1);
return false;
}
if ( validateKey(_value) == 0) {
alertError('CheckPrimaryDnsValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckPrimaryDnsValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckPrimaryDnsValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckPrimaryDnsValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckPrimaryDnsValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckPrimaryDnsValue7',1);
return false;
}
return true;
}
function checkSecondaryDNS(_value)
{
if ( validateKey(_value) == 0) {
alertError('CheckSecondaryDnsValue2',1);
return false;
}
if ( !checkDigitRange(_value,1,1,223) ) {
alertError('CheckSecondaryDnsValue3',1);
return false;
}
if ( getDigit(_value,1) ==127)
{
alertError('CheckSecondaryDnsValue4',1);
return false;
}
if ( !checkDigitRange(_value,2,0,255) ) {
alertError('CheckSecondaryDnsValue5',1);
return false;
}
if ( !checkDigitRange(_value,3,0,255) ) {
alertError('CheckSecondaryDnsValue6',1);
return false;
}
if ( !checkDigitRange(_value,4,1,254) ) {
alertError('CheckSecondaryDnsValue7',1);
return false;
}
return true;
}
function checkHex(str)
{
for(var i=0; i<str.length; i++)
{
if((str.charAt(i) >= '0' && str.charAt(i) <= '9')||
(str.charAt(i) >= 'a' && str.charAt(i) <= 'f')||
(str.charAt(i) >= 'A' && str.charAt(i) <= 'F'))
{continue;}
else {return false;}
}
}
function checkSecurityKey(str)
{
if($('wepenc').value == '1')
{
if(checkHex(str) == false || str.length != 10)
{
alertError("CheckSecurityKey1");
return false;
}
}
else if($('wepenc').value == '2')
{
if(checkHex(str) == false || str.length != 26)
{
alertError("CheckSecurityKey2");
return false;
}
}
}
function checkWord(s)
{
var patrn=/(\|)|(\\)|(\`)/;
if(patrn.test(s)==true)
{
alertError('CheckPassphrase');
return false;
}
else
{
return true;
}
}
function checkBlank(str)
{
if(str.charAt(str.length-1) == " " || str.charAt(0) == " ")
{
alertError('CheckBlank');
}
str = str.replace(/(^\s*)|(\s*$)/g,"");
return str;
}
function checkPassphrase(str)
{
if(str.length == 64)
{
if(checkHex(str) == false)
{
alertError("CheckSecurityPwd1");
return false;
}
}
if(str.length < 8)
{
alertError("CheckSecurityPwd2");
return false;
}
if(checkWord(str)==false)
return false;
else
return true;
}
function checkNameBlank(str)
{
var patrn = /^\S{1,100}$/;
var tmp = str;
if(str == "")
{
return false;
}
else
{ 
if(!patrn.exec(str))
{
str = str.replace(/\s/g,"");
}
if (tmp == str)
{
return true;
}
else
{
return str;
}
}
}
function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask)
{
var count = 0;
lan1a = lan1Ip.split('.');
lan1m = lan1Mask.split('.');
lan2a = lan2Ip.split('.');
lan2m = lan2Mask.split('.');
for (i = 0; i < 4; i++) {
l1a_n = parseInt(lan1a[i]);
l1m_n = parseInt(lan1m[i]);
l2a_n = parseInt(lan2a[i]);
l2m_n = parseInt(lan2m[i]);
if ((l1a_n & l1m_n) == (l2a_n & l2m_n))
count++;
}
if (count == 4)
return true;
else
return false;
}
function checkURL(s)
{
var patrn=/^\w+$/;
var patrn2=/\./;
var patrn3=/\//;
for (var i = 0; i < s.length; i++)
{
if (!patrn.exec(s.substr(i, 1)))
{
if(!patrn2.exec(s.substr(i, 1)))
{
if(!patrn3.exec(s.substr(i, 1)))
{
alert('###nomatch');
return false;
}
}
}
}
return true;
}
function checkSSID(s)
{
var patrn=/[^A-Za-z0-9-_]/;
if(patrn.test(s)==true)
{
alertError('CheckSSID',1);
return false;
}
else
return true;
}
function hideChForWep(_tap,_num,_Bool)
{
var _tmpFlag;
for(var _i=0; _i < _num; _i++)
{
_tmpFlag=_tap+(_i+1);
_tmpFlag = document.getElementById(_tmpFlag);
_tmpFlag.style.display=_Bool;
}
}
function getNameValue(_Name)
{
var _tmp = document.getElementsByName(_Name);
for (var i=0;i<_tmp.length;i++) {
if (_tmp[i].checked) {
return _tmp[i].value;
}
}
return null;
}
//for Netgear
function isHex(str) {
var i;
for(i = 0; i<str.length; i++) {
var c = str.substring(i, i+1);
if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
continue;
}
return false;
}
return true;
}
/* Just check if MAC address is all "F", or all "0" , with ':' in it or not weal @ Aug 14*/
function MacStrallf(mac) {
var temp=mac.value;
for(i=0; i<mac.value.length;i++) {
var c = mac.value.substring(i, i+1)
if (c == "f" || c == "F" || c == "0" || c == ":" || c == "-")
continue;
else
break;
}
if (i == mac.value.length)
return true;
else
return false;
}
/* Check Multicast MAC */
function checkMulticastMAC(macaddr) {
var mac_defined = macaddr.value;
var macadr_first_byte = parseInt(mac_defined.substring(0,2),16);
var Multicast_Flag = macadr_first_byte & 0x01;
if( Multicast_Flag )
return true;
return false;
}
/* Check Mac Address Format*/
function checkMacMain(mac) {
if(mac.value.length == 0) {
if (mac.focus)
mac.focus();
return true;
}
for(i=0; i<mac.value.length;i++) {
var c = mac.value.substring(i, i+1)
if(("0" <= c && c <= "9") || ("a" <= c && c <= "f") || ("A" <= c && c <= "F")) {
continue;
}
if (mac.focus)
mac.focus();
return true;
}
if(mac.value.length == 1) {
mac.value = "0"+mac.value;
}
mac.value = mac.value.toUpperCase();
return false;
}
/* Check Numeric*/
function isNumeric(str, max) {
if(str.value.length == 0 || str.value == null || str.value == "") {
if (str.focus)
str.focus();
return true;
}
var i = parseInt(str.value,10);
if(i>max) {
if (str.focus)
str.focus();
return true;
}
for(i=0; i<str.value.length; i++) {
var c = str.value.substring(i, i+1);
if("0" <= c && c <= "9") {
continue;
}
if (str.focus)
str.focus();
return true;
}
return false;
}
/* Check IP Address Format*/
function checkIPMain(ip,max) {
if( isNumeric(ip, max) ) {
if (ip.focus)
ip.focus();
return true;
}
}
function checkMacAddress(mac1, mac2, mac3, mac4, mac5, mac6) {
if(checkMacMain(mac1)) return true;
if(checkMacMain(mac2)) return true;
if(checkMacMain(mac3)) return true;
if(checkMacMain(mac4)) return true;
if(checkMacMain(mac5)) return true;
if(checkMacMain(mac6)) return true;
var mac_str = new String("");
mac_str.value = mac1.value + mac2.value + mac3.value+ mac4.value + mac5.value + mac6.value;
if(checkMulticastMAC(mac_str) || MacStrallf(mac_str))
return true;
return false;
}
function check_mac(mac1, mac2, mac3, mac4, mac5, mac6)
{
var msg = "";
var m1;
if(checkMacAddress(mac1, mac2, mac3, mac4, mac5, mac6))
msg += "Invalid MAC address.";
if (mac1.value == "00" && mac2.value == "00" && mac3.value == "00" && mac4.value == "00" && mac5.value == "00" && mac6.value == "00")
msg += "Invalid MAC address.";
if (mac1.value == "FF" && mac2.value == "FF" && mac3.value == "FF" && mac4.value == "FF" && mac5.value == "FF" && mac6.value == "FF")
msg += "Invalid MAC address.";
m1 = parseInt(mac1.value, 16);
if (m1 & 1)
msg += "Invalid MAC address.";
if (msg.length > 1) {
//alert("Invalid MAC address.");
alertError('WLG_wdsWrongMac',1);
return false;
}
return true;
}
function checkIP(ip1, ip2, ip3, ip4,max) {
if(checkIPMain(ip1,255)) return true;
if(checkIPMain(ip2,255)) return true;
if(checkIPMain(ip3,255)) return true;
if(checkIPMain(ip4,max)) return true;
if((ip1.value.charAt(0)=="0" && ip1.value.length!=1) ||
(ip2.value.charAt(0)=="0" && ip2.value.length!=1) ||
(ip3.value.charAt(0)=="0" && ip3.value.length!=1) ||
(ip4.value.charAt(0)=="0" && ip4.value.length!=1))
return true;
if((parseInt(ip1.value)==0)||
((parseInt(ip1.value)==0)&&(parseInt(ip2.value)==0)&&
(parseInt(ip3.value)==0)&&(parseInt(ip4.value)==0)))
return true;
var loopback_ip_start = (127 << 24) | (0 << 16) | (0 << 8) | (0);
var loopback_ip_end = (127 << 24) | (255 << 16) | (255 << 8) | (255);
var groupcast_ip_start = (224 << 24) | (0 << 16) | (0 << 8) | (0);
var groupcast_ip_end = (239 << 24) | (255 << 16) | (255 << 8) | (255);
var dhcpresv_ip_start = (169 << 24) | (254 << 16) | (0 << 8) | (0);
var dhcpresv_ip_end = (169 << 24) | (254 << 16) | (255 << 8) | (255);
var ip_addr = (ip1.value << 24) | (ip2.value << 16) | (ip3.value << 8) | (ip4.value);
if((ip_addr >= loopback_ip_start)&&(ip_addr <= loopback_ip_end))
return true;
if((ip_addr >= groupcast_ip_start)&&(ip_addr <= groupcast_ip_end ))
return true;
if((ip_addr >= dhcpresv_ip_start)&&(ip_addr <= dhcpresv_ip_end))
return true;
return false;
}
function ipNum(ipStr)
{
var total = 0;
var ip_array=ipStr.split('.');
var ip1=ip_array[0];
var ip2=ip_array[1];
var ip3=ip_array[2];
var ip4=ip_array[3];
total += parseInt(ip4);
total += parseInt(ip3)*256;
total += parseInt(ip2)*256*256;
total += parseInt(ip1)*256*256*256;
total = parseInt(total);
return total;
}
function checkipaddr(ipaddr)
{
var form = document.forms[0];
var ipArray = ipaddr.split(".");
var ipstr = ipArray[0]+ipArray[1]+ipArray[2]+ipArray[3];
var i = 0;
if((ipArray[0]=="")||(ipArray[0]<0)||(ipArray[0]>255)||(ipArray[1]=="")||(ipArray[1]<0)||(ipArray[1]>255)
||(ipArray[2]=="")||(ipArray[2]<0)||(ipArray[2]>255)||(ipArray[3]=="")||(ipArray[3]<0)||(ipArray[3]>255))
{
return false;
}
for(i=0;i<ipstr.length;i++)
{
if((ipstr.charAt(i)!='0')&&(ipstr.charAt(i)!='1')&&(ipstr.charAt(i)!='2')
&&(ipstr.charAt(i)!='3')&&(ipstr.charAt(i)!='4')&&(ipstr.charAt(i)!='5')
&&(ipstr.charAt(i)!='6')&&(ipstr.charAt(i)!='7')&&(ipstr.charAt(i)!='8')
&&(ipstr.charAt(i)!='9'))
{
return false;
}
}
if( ipArray[0] > 223 || ipArray[0] == 0 )
return false;
if (ipaddr == "0.0.0.0" || ipaddr == "255.255.255.255")
{
return false;
}
var each=ipaddr.split(".");
if (each[0] == "127")
{
return false;
}
if (!ipArray || ipArray.length != 4)
{
return false;
}
else
{
for (i = 0; i < 4; i++)
{
thisSegment = ipArray[i];
if (thisSegment != "")
{
if(i==3){
if (!((ipArray[3] > 0) && (ipArray[3] < 255)))
{
return false;
}
}
else if (!(thisSegment >=0 && thisSegment <= 255))
{
return false;
}
}
else
{
return false;
}
}
}
return true;
}
function cp_ip2(from,to)
//true invalid from and to ip; false valid from and to ip;
{
var total1 = 0;
var total2 = 0;
var from_array=from.split('.');
var to_array = to.split('.');
var from1=from_array[0];
var to1=to_array[0];
if(parseInt(from1,10) <= 127 && parseInt(to1,10) >= 127 )
{
return false;
}
var from2=from_array[1];
var from3=from_array[2];
var from4=from_array[3];
var to2=to_array[1];
var to3=to_array[2];
var to4=to_array[3];
total1 += parseInt(from4,10);
total1 += parseInt(from3,10)*256;
total1 += parseInt(from2,10)*256*256;
total1 += parseInt(from1,10)*256*256*256;
total2 += parseInt(to4,10);
total2 += parseInt(to3,10)*256;
total2 += parseInt(to2,10)*256*256;
total2 += parseInt(to1,10)*256*256*256;
if(total1 <= total2)
return true;
return false;
}
function checksubnet(subnet)
{
var subnetArray = subnet.split(".");
var subnetstr = subnetArray[0]+subnetArray[1]+subnetArray[2]+subnetArray[3];
var i = 0;
var maskTest = 0;
var validValue = true;
if((subnetArray[0]=="")||(subnetArray[0]<0)||(subnetArray[0]>255)||(subnetArray[1]=="")||(subnetArray[1]<0)||(subnetArray[1]>255)
||(subnetArray[2]=="")||(subnetArray[2]<0)||(subnetArray[2]>255)||(subnetArray[3]=="")||(subnetArray[3]<0)||(subnetArray[3]>255))
{
return false;
}
for(i=0;i<subnetstr.length;i++)
{
if((subnetstr.charAt(i)!='0')&&(subnetstr.charAt(i)!='1')&&(subnetstr.charAt(i)!='2')
&&(subnetstr.charAt(i)!='3')&&(subnetstr.charAt(i)!='4')&&(subnetstr.charAt(i)!='5')
&&(subnetstr.charAt(i)!='6')&&(subnetstr.charAt(i)!='7')&&(subnetstr.charAt(i)!='8')
&&(subnetstr.charAt(i)!='9'))
{
return false;
}
}
if (!subnetArray || subnetArray.length != 4)
{
return false;
}
else
{
for (i = 0; i < 4; i++) {
thisSegment = subnetArray[i];
if (thisSegment != "") {
if (!(thisSegment >=0 && thisSegment <= 255)) { //check if number?
return false;
}
} else {
return false;
}
}
}
if( subnetArray[0] < 255 )
{
if( (subnetArray[1] > 0) || (subnetArray[2] > 0) || (subnetArray[3] > 0))
validValue = false;
else
maskTest = subnetArray[0];
}
else
{
if( subnetArray[1] < 255 )
{
if( (subnetArray[2] > 0) || (subnetArray[3] > 0))
validValue = false;
else
maskTest = subnetArray[1];
}
else
{
if( subnetArray[2] < 255 )
{
if( (subnetArray[3] > 0) )
validValue = false;
else
maskTest = subnetArray[2];
}
else
maskTest = subnetArray[3];
}
}
if( validValue ) {
switch( maskTest ) {
case "0":
case "128":
case "192":
case "224":
case "240":
case "248":
case "252":
case "254":
case "255":
break;
default:
validValue = false;
}
if( subnet == "0.0.0.0" )
validValue = false;
}
else
validValue = false;
return validValue;
}
function address_parseInt(addr)/*to fix bug 26258*/
{
addr_array = addr.split(".");
for(i=0; i< 4; i++)
{
if( 0 == i )
addr = parseInt(addr_array[i], 10);
else
addr = addr + "." +parseInt(addr_array[i], 10);
}
return addr;
}
function isGateway(lanIp, lanMask, gtwIp)
{
gtw_arr = gtwIp.split('.');
var ip_gtw=0;
for (i = 0; i < 4; i++)
{
gtw_str = parseInt(gtw_arr[i],10);
ip_gtw=ip_gtw*256+parseInt(gtw_str);
}
addr_arr = lanIp.split('.');
var ip_addr=0;
for (i = 0; i < 4; i++)
{
addr_str = parseInt(addr_arr[i],10);
ip_addr=ip_addr*256+parseInt(addr_str);
}
var ip_sub=isSub(lanIp, lanMask);
var ip_broadcast=isBroadcast(lanIp, lanMask)
if((parseInt(ip_sub)<parseInt(ip_gtw))&&(parseInt(ip_gtw)<parseInt(ip_broadcast)))
return true;
else
return false;
}
function isSameIp(ipstr1,ipstr2)
{
var count = 0;
var ip1_array=ipstr1.split('.');
var ip2_array=ipstr2.split('.');
for(i = 0;i<4;i++)
{
num1 = parseInt(ip1_array[i], 10);
num2 = parseInt(ip2_array[i], 10);
if( num1 == num2)
count++;
}
if( count == 4)
return true;
else
return false;
}
/*去掉字符串的 头空格*/
function LTrim(str){
var i; 
for(i=0;;i++)
{ 
if(str.charAt(i)!=" ")
break; 
} 
str = str.substring(i,str.length); 
return str; 
}
/*去掉字符串的 尾空格*/
function RTrim(str){
var i; 
for(i=str.length-1;i>=0;i--)
{ 
if(str.charAt(i)!=" ")
break; 
} 
str = str.substring(0,i+1); 
return str; 
} 
/*去掉字符串的 前、尾空格(注意是调用以上两个方法)*/
function Trim(str){
return LTrim(RTrim(str)); 
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
