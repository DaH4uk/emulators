<<<<<<< HEAD
function check_DNS(dnsaddr1,dnsaddr2,wan_assign,wan_ip)
{
 if(dnsaddr1!="")
 {
 if(checkipaddr(dnsaddr1)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if( wan_assign == true && isSameIp(dnsaddr1,wan_ip))
 {
 alert(invalid_primary_dns);
 return false;
 }
 }
 if(dnsaddr2!="")
 {
 if(checkipaddr(dnsaddr2)==false)
 {
 alert(invalid_second_dns);
 return false;
 }
 if( wan_assign == true && isSameIp(dnsaddr2,wan_ip))
 {
 alert(invalid_second_dns);
 return false;
 }
 }
 if(dnsaddr1=="" && dnsaddr2=="" )
 {
 alert(invalid_primary_dns);
 return false;
 }
 return true;
}
function getObj(name)
{
 if (document.getElementById)
 {
 return document.getElementById(name).style;
 }
 else if (document.all)
 {
 return document.all[name].style;
 }
 else if (document.layers)
 {
 return document.layers[name];
 }
}
function check_maxNumAdd(form,nowNum,maxNum,msg,go2href)
{
nowNum=parseInt(nowNum,10);
if ( nowNum >= maxNum )
{
alert(msg);
return false;
}
else
location.href=go2href;
}
function checkIPMain(ip,max) {
 if( isNumeric(ip, max) == false ) 
 return false;
}
function checkIP(ip1, ip2, ip3, ip4,max) {
 if(checkIPMain(ip1,255)==false) return false; 
 if(checkIPMain(ip2,255)==false) return false;
 if(checkIPMain(ip3,255)==false) return false;
 if(checkIPMain(ip4,max)==false) return false;
 if((parseInt(ip1)==0)||(parseInt(ip1)==0)&&(parseInt(ip2)==0)&&(parseInt(ip3)==0)&&(parseInt(ip4)==0))
 return false;
if ( ip1 == 0 )
return false;
if ( ip1 == 127 )
return false;
 return true;
}
/* Check Numeric*/
function isNumeric(str, max) 
{
 if(str.length == 0 || str == null || str == "") 
 return false;
 for(i=0; i<str.length; i++) 
{
 var c = str.substring(i, i+1);
 if("0" <= c && c <= "9") 
 continue;
else
 return false;
 }
 var i = parseInt(str);
 if(i>max) 
 return false;
 
 return true;
}
function isIE()
{
var browser = new Object();
browser.version = parseInt(navigator.appVersion);
browser.isNs = false;
browser.isIe = false;
if(navigator.appName.indexOf("Netscape") != -1)
browser.isNs = true;
else if(navigator.appName.indexOf("Microsoft") != -1)
browser.isIe = true;

if(browser.isNs)
return false;
else if (browser.isIe)
return true;
}
function load_default(step){

if (parent.frames['IA_menu']){
for(var i=1;i<=5;i++){
eval("parent.IA_menu.IA_menu_"+i).className ="left_nav_headers";
}
eval("parent.frames[\'IA_menu\'].IA_menu_"+step).className ="left_nav_headers_current_state";
}
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
function isSameIp(ipstr1,ipstr2)
{
 var count = 0;
 var ip1_array=ipstr1.split('.');
 var ip2_array=ipstr2.split('.');
 for(i = 0;i<4;i++)
 {
 num1 = parseInt(ip1_array[i]);
 num2 = parseInt(ip2_array[i]);
 if( num1 == num2)
 count++;
 }
 if( count == 4)
 return true;
 else
 return false;
}
function cp_ip2(from,to)
//true invalid from and to ip; false valid from and to ip;
{
 var total1 = 0;
 var total2 = 0;
var from_array=from.split('.');
var to_array = to.split('.');
var from1=from_array[0];
var from2=from_array[1];
var from3=from_array[2];
var from4=from_array[3];
var to1=to_array[0];
var to2=to_array[1];
var to3=to_array[2];
var to4=to_array[3];
 total1 += parseInt(from4);
 total1 += parseInt(from3)*256;
 total1 += parseInt(from2)*256*256;
 total1 += parseInt(from1)*256*256*256;
 total2 += parseInt(to4);
 total2 += parseInt(to3)*256;
 total2 += parseInt(to2)*256*256;
 total2 += parseInt(to1)*256*256*256;
 if(total1 <= total2)
 return true;
 return false;
}
function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) 
{
var count = 0;
 lan1a = lan1Ip.split('.');
lan1m = lan1Mask.split('.');
lan2a = lan2Ip.split('.');
lan2m = lan2Mask.split('.');
for (i = 0; i < 4; i++) 
{
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
if (ipaddr == "127.0.0.1")
 {
 return false;
 }
if (!ipArray || ipArray.length != 4)
 {
 return false;
}
if (ipArray[0] == 127)
{
return false
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
 if( subnetArray[0] == 127 ) 
 {
 return false;
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
 case "00":
 case "000":
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
function checkgateway(gateway)
{
var form = document.forms[0];
var dgArray = gateway.split(".");
 var dgstr = dgArray[0]+dgArray[1]+dgArray[2]+dgArray[3];
var i = 0;
if((dgArray[0]=="")||(dgArray[0]<0)||(dgArray[0]>255)||(dgArray[1]=="")||(dgArray[1]<0)||(dgArray[1]>255)
 ||(dgArray[2]=="")||(dgArray[2]<0)||(dgArray[2]>255)||(dgArray[3]=="")||(dgArray[3]<0)||(dgArray[3]>255))
{
return false;
}
for(i=0;i<dgstr.length;i++)
 {
 if((dgstr.charAt(i)!='0')&&(dgstr.charAt(i)!='1')&&(dgstr.charAt(i)!='2')
 &&(dgstr.charAt(i)!='3')&&(dgstr.charAt(i)!='4')&&(dgstr.charAt(i)!='5')
 &&(dgstr.charAt(i)!='6')&&(dgstr.charAt(i)!='7')&&(dgstr.charAt(i)!='8')
 &&(dgstr.charAt(i)!='9'))
 {
 return false;
 }
 }
if( dgArray[0] > 223 || dgArray[0] == 0 )
 return false;
 if (gateway == "0.0.0.0" || gateway == "255.255.255.255")
 {
 return false;
 }
 if (gateway == "127.0.0.1")
 {
 return false;
 }
 if ( dgArray[0] == 127 )
 {
 return false;
 }
if (!dgArray || dgArray.length != 4)
 {
 return false;
 }
 else
 {
 for (i = 0; i < 4; i++) {
 thisSegment = dgArray[i];
 if (thisSegment != "") {
 if (!(thisSegment >=0 && thisSegment <= 255)) { //check if number?
 
 return false;
 }
 } else {
 return false;
 }
}
 }
return true;
}
function is_sub_or_broad(be_checkip, ip, mask)
{
 addr_arr = be_checkip.split('.');
 var ip_addr=0;
 for (i = 0; i < 4; i++)
 {
 addr_str = parseInt(addr_arr[i],10);
 ip_addr=ip_addr*256+parseInt(addr_str);
 }
 var ip_sub=isSub(ip, mask);
 var ip_broadcast=isBroadcast(ip, mask)
if(ip_addr == ip_sub || ip_addr == ip_broadcast){
return false;
}
return true;
}
function isBroadcast(lanIp, lanMask)
{
 ip_arr = lanIp.split('.');
 mask_arr = lanMask.split('.');
 var ip_broadcast=0
 for (i = 0; i < 4; i++)
 {
 ip_str = parseInt(ip_arr[i]);
 mask_str = parseInt(mask_arr[i]);
n_str = ~mask_str+256; 
ip_broadcast=ip_broadcast*256+parseInt(ip_str | n_str) 
 }
return(ip_broadcast);
}
function isSub(lanIp, lanMask)
{
 ip_arr = lanIp.split('.');
 mask_arr = lanMask.split('.');
 var ip_sub=0
 for (i = 0; i < 4; i++)
 {
 ip_str = parseInt(ip_arr[i]);
 mask_str = parseInt(mask_arr[i]);
ip_sub=ip_sub*256+parseInt(ip_str & mask_str) 
 }
return(ip_sub)
}
function isGateway(lanIp, lanMask,gtwIp)
{
gtw_arr = gtwIp.split('.');
var ip_gtw=0
for (i = 0; i < 4; i++)
 {
 gtw_str = parseInt(gtw_arr[i]);
ip_gtw=ip_gtw*256+parseInt(gtw_str); 
 }
var ip_sub=isSub(lanIp, lanMask);
var ip_broadcast=isBroadcast(lanIp, lanMask)
if((parseInt(ip_sub)<parseInt(ip_gtw))&&(parseInt(ip_gtw)<parseInt(ip_broadcast)))
return true;
else
return false;
}
function loadhelp(fname,anchname)
{
parent.help_info = fname;
if(parent.parent.help_info)
parent.parent.help_info = fname;
 if ((loadhelp.arguments.length == 1 ) || (anchname == "" )){
 top.helpframe.location.href="help.html"; 
//"../h"+fname+".html";
}
 else{
 top.helpframe.location.href="help.html#" + anchname;
//"../h"+fname+".html#" + anchname;
}
 return;
}
function getkeya(e)
{
var keycode;
 if (window.event) 
 {
 keycode = window.event.keyCode;
 if (((keycode>47) && (keycode<58))||(keycode==8)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else if (e) 
 {
 keycode = e.which;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==0)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else 
 {
 return true;
 }
}
function getkeyb(e)
{
var keycode;
 if (window.event)
 {
 keycode = window.event.keyCode;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==58)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else if (e)
 {
 keycode = e.which;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==58)||(keycode==0)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else
 {
 return true;
 }
}
function getkey(type, e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if(type == "apname")
{
if ((keycode==34) ||(keycode==39)||(keycode==92)) { return false; }
else return true;
}
else if(type == "ipaddr")
{
if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==0)||(keycode==46)) { return true; }
else return false;
}
else if(type == "ssid")
{
if (keycode==32) return false;
else return true;
}
else if(type == "wep")
{
if (((keycode>47) && (keycode<58))||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))||(keycode == 8)||(keycode == 0)) 
return true;
else return false;
}
else if(type == "num")
{
if(((keycode>47) && (keycode<58)) || (keycode==8)||(keycode==0))
return true;
else return false;
}
else if(type == "hostname")
{
if (((keycode>47) && (keycode<58))||(keycode==45)||((keycode>64) && (keycode<91))||((keycode>96) && (keycode<123)) || (keycode==8)||(keycode==0)) { return true; }
else return false;
}
else if(type == "ddns_hostname")
{
if (((keycode>47) && (keycode<58))||(keycode==45)||(keycode==46)||((keycode>64) && (keycode<91))||((keycode>96) && (keycode<123)) || (keycode==8)||(keycode==0)) { return true; }
else return false;
}
else if(type == "mac")
{
if (((keycode>47) && (keycode<58))||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))||(keycode == 8)||(keycode == 0) || (keycode == 58) || (keycode == 45))
 return true;
 else return false;
}
else if(type == "ascii")
{
if ((keycode<32) || (keycode>126)) return false;
else return true;
}
else
return true;
}
function changesectype(fname)
{
var html_href;
if(fname.options[0].selected == true) html_href = "security_off.html";
else if(fname.options[1].selected == true) html_href = "wep.html";
else if(fname.options[2].selected == true) html_href = "wpa.html";
else if(fname.options[3].selected == true) html_href = "wpa2.html";
else if(fname.options[4].selected == true) html_href = "wpas.html";

location.href = html_href;
}
function printableKeyFilter() 
{
if (event.keyCode < 32 || event.keyCode > 126)
 event.returnValue = false;
}
function checkpsk(form)
{
 var len = form.sec_wpaphrase.value.length;
 if ( len == 64 )
 {
 for(i=0;i<len;i++)
 {
 if(isValidHex(form.sec_wpaphrase.value.charAt(i))==false)
 {
 alert(wpa_phrase);
 return false;
 }
 }
 }
 else
 {
 if(len < 8 || len > 63){
 alert(wpa_phrase);
 return false;
 }
 for(i=0;i<form.sec_wpaphrase.value.length;i++)
 {
 if(isValidChar_space(form.sec_wpaphrase.value.charCodeAt(i))==false)
 {
 alert(wpa_phrase);
 return false;
 }
 }
 }
 form.sec_wpaphrase_len.value=len;
 return true;
}
function checkwep(form,mssid)
{
form.wep_press_flag.value=0;
var wepkey1=form.wepkey1.value;
var wepkey2=form.wepkey2.value;
var wepkey3=form.wepkey3.value;
var wepkey4=form.wepkey4.value;
if(form.sec_keylen.value==13)
{
if( form.wepkeyno[0].checked == true )
{
if(form.wepkey1.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey1.value.length!=0 && form.wepkey1.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey1.value.length!=0)
for(i=0;i<wepkey1.length;i++)
{
 if(isValidHex(wepkey1.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
}

if( form.wepkeyno[1].checked == true )
{
if(form.wepkey2.value.length!=26)
{
alert(wep_128);
return false;
}
}
else if( form.wepkey2.value.length!=0 && form.wepkey2.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey2.value.length!=0)
for(i=0;i<wepkey2.length;i++)
 {
 if(isValidHex(wepkey2.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
if( form.wepkeyno[2].checked == true)
{
if(form.wepkey3.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey3.value.length!=0 && form.wepkey3.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey3.value.length!=0)
for(i=0;i<wepkey3.length;i++)
 {
 if(isValidHex(wepkey3.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
if( form.wepkeyno[3].checked == true)
{
if(form.wepkey4.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey4.value.length!=0 && form.wepkey4.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey4.value.length!=0)
for(i=0;i<wepkey4.length;i++)
 {
 if(isValidHex(wepkey4.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
}
if(form.sec_keylen.value==5)
{
if( form.wepkeyno[0].checked == true)
{
if(form.wepkey1.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey1.value.length!=0 && form.wepkey1.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey1.value.length!=0)
for(i=0;i<wepkey1.length;i++)
 {
 if(isValidHex(wepkey1.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
if( form.wepkeyno[1].checked == true)
{
if(form.wepkey2.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey2.value.length!=0 && form.wepkey2.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey2.value.length!=0)
for(i=0;i<wepkey2.length;i++)
 {
 if(isValidHex(wepkey2.charAt(i))==false)
 {
 alert(wep_64);
 return false;
}
 }
if( form.wepkeyno[2].checked == true)
{
if(form.wepkey3.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey3.value.length!=0 && form.wepkey3.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey3.value.length!=0)
for(i=0;i<wepkey3.length;i++)
 {
 if(isValidHex(wepkey3.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
if( form.wepkeyno[3].checked == true)
{
if(form.wepkey4.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey4.value.length!=0 && form.wepkey4.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey4.value.length!=0)
for(i=0;i<wepkey4.length;i++)
  {
 if(isValidHex(wepkey4.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
}
if ( form.sec_auth.value != 2 && mssid ==0)
{
if (!confirm(wep_or_wps))
return false;
}
return true;
}
/////////////////////////////////////generate wep key by md5////////////////////////////////////////////////////
function HexToAscii(F,I,S,D) {
 var temp1="";
 S = S.toUpperCase();
 var optionindex=F.sec_keylen.selectedIndex;
 if( F.sec_keylen.options[optionindex].value=="13" )
 {
 wordCount = 26;
 }
 else {
 wordCount = 10;
 }
 //if(F.keyno_11g[I].checked)
 if(1)
 {
 if( (S.length!=wordCount) )
 {
 if(F.wepkeyno[I].checked)
 {
 var s="Hex type key length must be ";
 alert(s + wordCount);
 }
 D.value="";
 S="";
 return S;
 }
 for(i=0;i<wordCount;i+=2)
 {
 var c=S.charCodeAt(i);
 var d=S.charCodeAt(i+1);
 if( (c>=48)&&(c<=57) )
 c=c-48;
 else if( (c>=65)&&(c<=70) )
 c=c-55;
 else
 {
 var s="Over Hex range (0~F)";
 alert(s);
 return S;
 }
 if( (d>=48)&&(d<=57) )
 d=d-48;
 else if( (d>=65)&&(d<=70) )
 d=d-55;
 else
 {
 var s="Over Hex range (0~F)";
 alert(s);
 return S;
 }
 var value=c*16+d;
 if( ((value>=0)&&(value<32)) || ((value>128)&&(value<=255)) )
 {
 temp1+=String.fromCharCode(92);
 temp1+=S.substring(i,i+2);
 }
 else
 {
 if(value==92)
 {
 temp1+=String.fromCharCode(value);
 temp1+=String.fromCharCode(value);
 }
 else
 temp1+=String.fromCharCode(value);
 }
 }
 D.value=temp1;
 }
 return S;
}
function PassPhrase40(F)
{
 var seed = 0;
 var pseed = new Array(0, 0, 0, 0);
 var pkey = new Array(4);
 var asciiObj = new Array(4);
 Length = F.weppassphrase.value.length;
 if(Length != 0) {
 for (i=0; i<Length; i++ ) {
 pseed[i%4] ^= F.weppassphrase.value.charCodeAt(i);
 }
 seed = pseed[0];
 seed += pseed[1] << 8;
 seed += pseed[2] << 16;
 seed += pseed[3] << 24;
 }
 F.wepkey1.value = F.wepkey2.value = "";
 F.wepkey3.value = F.wepkey4.value = "";
 // init key array
 pkey[0] = F.wepkey1;
 pkey[1] = F.wepkey2;
 pkey[2] = F.wepkey3;
 pkey[3] = F.wepkey4;
 for(j=0; j<4; j++) {
 for (i=0; i<5 ;i++ ) {
 seed = (214013 * seed) & 0xffffffff;
 if(seed & 0x80000000) {
 seed = (seed & 0x7fffffff) + 0x80000000 + 0x269ec3;
 }
 else {
 seed = (seed & 0x7fffffff) + 0x269ec3;
 }
 temp = ((seed >> 16) & 0xff);
 if(temp < 0x10) {
 pkey[j].value += "0" + temp.toString(16).toUpperCase();
 }
 else {
 pkey[j].value += temp.toString(16).toUpperCase();
 }
 }
 }
 asciiObj[0] = "";
 asciiObj[1] = "";
 asciiObj[2] = "";
 asciiObj[3] = "";
 for(k=0; k<4; k++) {
 HexToAscii(F, k, pkey[k].value, asciiObj[k]);
 }
 wepkey1 = pkey[0].value;
 wepkey2 = pkey[1].value;
 wepkey3 = pkey[2].value;
 wepkey4 = pkey[3].value;
}
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */
/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
 str = "";
 for(j = 0; j <= 3; j++)
 str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
 hex_chr.charAt((num >> (j * 8)) & 0x0F);
 return str;
}
/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
 nblk = ((str.length + 8) >> 6) + 1;
 blks = new Array(nblk * 16);
 for(i = 0; i < nblk * 16; i++) blks[i] = 0;
 for(i = 0; i < str.length; i++)
 blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
 blks[i >> 2] |= 0x80 << ((i % 4) * 8);
 blks[nblk * 16 - 2] = str.length * 8;
 return blks;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
 var lsw = (x & 0xFFFF) + (y & 0xFFFF);
 var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
 return (msw << 16) | (lsw & 0xFFFF);
}
/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
 return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
 return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
 return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
 return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
 return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
 return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
 x = str2blks_MD5(str);
 a = 1732584193;
 b = -271733879;
 c = -1732584194;
 d = 271733878;
 for(i = 0; i < x.length; i += 16)
 {
 olda = a;
 oldb = b;
 oldc = c;
 oldd = d;
 a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
 d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
 c = ff(c, d, a, b, x[i+ 2], 17, 606105819);
 b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
 a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
 d = ff(d, a, b, c, x[i+ 5], 12, 1200080426);
 c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
 b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
 a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
 d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
 c = ff(c, d, a, b, x[i+10], 17, -42063);
 b = ff(b, c, d, a, x[i+11], 22, -1990404162);
 a = ff(a, b, c, d, x[i+12], 7 , 1804603682);
 d = ff(d, a, b, c, x[i+13], 12, -40341101);
 c = ff(c, d, a, b, x[i+14], 17, -1502002290);
 b = ff(b, c, d, a, x[i+15], 22, 1236535329); 
 a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
 d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
 c = gg(c, d, a, b, x[i+11], 14, 643717713);
 b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
 a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
 d = gg(d, a, b, c, x[i+10], 9 , 38016083);
 c = gg(c, d, a, b, x[i+15], 14, -660478335);
 b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
 a = gg(a, b, c, d, x[i+ 9], 5 , 568446438);
 d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
 c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
 b = gg(b, c, d, a, x[i+ 8], 20, 1163531501);
 a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
 d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
 c = gg(c, d, a, b, x[i+ 7], 14, 1735328473);
 b = gg(b, c, d, a, x[i+12], 20, -1926607734);
 
 a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
 d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
 c = hh(c, d, a, b, x[i+11], 16, 1839030562);
 b = hh(b, c, d, a, x[i+14], 23, -35309556);
 a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
 d = hh(d, a, b, c, x[i+ 4], 11, 1272893353);
 c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
 b = hh(b, c, d, a, x[i+10], 23, -1094730640);
 a = hh(a, b, c, d, x[i+13], 4 , 681279174);
 d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
 c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
 b = hh(b, c, d, a, x[i+ 6], 23, 76029189);
 a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
 d = hh(d, a, b, c, x[i+12], 11, -421815835);
 c = hh(c, d, a, b, x[i+15], 16, 530742520);
 b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
 a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
 d = ii(d, a, b, c, x[i+ 7], 10, 1126891415);
 c = ii(c, d, a, b, x[i+14], 15, -1416354905);
 b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
 a = ii(a, b, c, d, x[i+12], 6 , 1700485571);
 d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
 c = ii(c, d, a, b, x[i+10], 15, -1051523);
 b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
 a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
 d = ii(d, a, b, c, x[i+15], 10, -30611744);
 c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
 b = ii(b, c, d, a, x[i+13], 21, 1309151649);
 a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
 d = ii(d, a, b, c, x[i+11], 10, -1120210379);
 c = ii(c, d, a, b, x[i+ 2], 15, 718787259);
 b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
 a = add(a, olda);
 b = add(b, oldb);
 c = add(c, oldc);
 d = add(d, oldd);
 }
 return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
function PassPhrase104(F) 
{
 var pseed2 = "";
 Length2 = F.weppassphrase.value.length;
 for(p=0; p<64; p++) {
 tempCount = p % Length2;
 pseed2 += F.weppassphrase.value.substring(tempCount, tempCount+1);
 }
 md5Str = calcMD5(pseed2);
 F.wepkey1.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey2.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey3.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey4.value = md5Str.substring(0, 26).toUpperCase();
}
function clickgenerate(form)
{
if(form.weppassphrase.value.length == 0 )
{
alert(gene_phrase)
 return false;
}
for(i=0;i<form.weppassphrase.value.length;i++)
 {
 if(isValidChar_space(form.weppassphrase.value.charCodeAt(i))==false)
 {
 alert(gene_phrase);
 return false;
 }
 }
 if(form.sec_keylen.options[0].selected == true)
 PassPhrase40(form);
else
 PassPhrase104(form);
form.generate_flag.value=1;
}
function doPortChange(check)
{
if(check == 0)
location.href="forwarding.html"
else
location.href="triggering.html"
}
function setDisabled(OnOffFlag,formFields)
{
for (var i = 1; i < setDisabled.arguments.length; i++)
setDisabled.arguments[i].disabled = OnOffFlag;
}
function change_serv(cf)
{
if( cf.login_type[1].selected == true ){
location.href="bas_pppoe.html";
loadhelp('_BAS_pppoe')
}
else if( cf.login_type[0].selected == true ){
location.href="bas_pptp.html";
loadhelp('_BAS_pptp')
}
else if (cf.login_type[2].selected == true )
{
 location.href="bas_l2tp.html";
 loadhelp('_BAS_l2tp')
} 

}
function ew_change_serv(cf)
{
if( cf.login_type[1].selected == true )
location.href="ew_bas_pppoe.html";
else if( cf.login_type[0].selected == true )
location.href="ew_bas_pptp.html"; 

}
function maccheck(mac_addr)
{
if ( mac_addr.indexOf(":")==-1 && mac_addr.length=="12" )
{
 var tmp_mac=mac_addr.substr(0,2)+":"+mac_addr.substr(2,2)+":"+mac_addr.substr(4,2)+":"+mac_addr.substr(6,2)+":"+mac_addr.substr(8,2)+":"+mac_addr.substr(10,2);
mac_addr = tmp_mac;
}
mac_array=mac_addr.split(':');
var mac11 = mac_array[0];
 mac11 = mac11.substr(1,1);
if((mac11=="1")||(mac11=="3")||(mac11=="5")||(mac11=="7")||(mac11=="9")||(mac11=="b")||(mac11=="d")||(mac11=="f")||(mac11=="B")||(mac11=="D")||(mac11=="F"))
 {
if(mac11=="1" && mac_array[0] == "11")
{}
else
{
alert(invalid_mac);
 return false;
}
 }
if(mac_array.length!=6)
{
alert(invalid_mac);
 return false;
}
 if(( mac_array[0]=="")||( mac_array[1]=="")||( mac_array[2]=="")||( mac_array[3]=="")||( mac_array[4]=="")||( mac_array[5]==""))
{
alert(enter_full_mac);
return false;
}
 if((( mac_array[0]=="00")&&( mac_array[1]=="00")&&
 ( mac_array[2]=="00")&&( mac_array[3]=="00")&&
 ( mac_array[4]=="00")&&( mac_array[5]=="00"))||
 (( mac_array[0]=="ff")&&( mac_array[1]=="ff")&&
 ( mac_array[2]=="ff")&&( mac_array[3]=="ff")&&
 ( mac_array[4]=="ff")&&( mac_array[5]=="ff"))||
 (( mac_array[0]=="FF")&&( mac_array[1]=="FF")&&
 ( mac_array[2]=="FF")&&( mac_array[3]=="FF")&&
 ( mac_array[4]=="FF")&&( mac_array[5]=="FF")))
{
alert(invalid_mac);
return false;
}
if(( mac_array[0].length!=2)||( mac_array[1].length!=2)||
 ( mac_array[2].length!=2)||( mac_array[3].length!=2)||
 ( mac_array[4].length!=2)||( mac_array[5].length!=2))
{
alert(invalid_mac);
return false;
}

for(i=0;i<mac_addr.length;i++)
 {
 if(isValidMac(mac_addr.charAt(i))==false)
 {
 alert(invalid_mac);
 return false;
 }
 }
return true;
}
function setMAC(cf,this_mac)
{
var dflag;
if (cf.MACAssign[0].checked || cf.MACAssign[1].checked)
{
dflag = true;
cf.this_mac.value=this_mac;
setDisabled(dflag,cf.this_mac);
}
else
{
dflag = false;
setDisabled(dflag,cf.this_mac);
cf.this_mac.value=this_mac;
}
}
function maccheck_wds(mac_addr,num,form)
{
var return_num=0;
//if(mac_addr==":::::")
if(mac_addr=="")
return 2;
var mac_array=mac_addr.split(':');
var mac11 = mac_array[0];
 mac11 = mac11.substr(1,1);
 if((mac11=="1")||(mac11=="3")||(mac11=="5")||(mac11=="7")||
 (mac11=="9")||(mac11=="b")||(mac11=="d")||(mac11=="f")||
 (mac11=="B")||(mac11=="D")||(mac11=="F"))
{
if( mac11 == "1" && mac_array[0]=="11")
{}
else
 return 1;
}
if(mac_addr.length!=17 && mac_addr.length!=0)
 return 1;
if((mac_array[0]=="")||(mac_array[1]=="")||(mac_array[2]=="")||(mac_array[3]=="")|| (mac_array[4]=="")||(mac_array[5]==""))
{
if((mac_array[0]=="")&&(mac_array[1]=="")&&(mac_array[2]=="")&&(mac_array[3]=="")&& (mac_array[4]=="")&&(mac_array[5]==""))
 return 2;
else
return 1;
 }
if(((mac_array[0]=="00")&&(mac_array[1]=="00")&&
 (mac_array[2]=="00")&&(mac_array[3]=="00")&&
 (mac_array[4]=="00")&&(mac_array[5]=="00"))||
 ((mac_array[0]=="ff")&&(mac_array[1]=="ff")&&
 (mac_array[2]=="ff")&&(mac_array[3]=="ff")&&
 (mac_array[4]=="ff")&&(mac_array[5]=="ff"))||
 ((mac_array[0]=="FF")&&(mac_array[1]=="FF")&&
 (mac_array[2]=="FF")&&(mac_array[3]=="FF")&&
 (mac_array[4]=="FF")&&(mac_array[5]=="FF")))
 return 1;
 if((mac_array[0].length!=2)||(mac_array[1].length!=2)||
 (mac_array[2].length!=2)||(mac_array[3].length!=2)||
 (mac_array[4].length!=2)||(mac_array[5].length!=2))
 return 1;
for(i=0;i<mac_addr.length;i++)
 if(isValidMac(mac_addr.charAt(i))==false)
 return 1;
if( num != "" && num != 0 && num != 1 )
{
for( k=1;k<num;k++)
{
mac_str=eval('the_mac'+k);
if( mac_str != "" && mac_str == mac_addr)
{
return 3;
}
}
}
return return_num;
}
function change_sec_to_time(uptime)
{
var sec=uptime;
var sec=parseInt(sec);
var hour_sec=sec%3600;
if(hour_sec!=sec)
 new_hour=(sec-hour_sec)/3600;
else
 new_hour=0;
var min_sec=hour_sec%60;
if(min_sec!=hour_sec)
 new_min=(hour_sec-min_sec)/60;
else
 new_min=0;
var new_sec=min_sec;
new_hour=new_hour.toString();
new_min=new_min.toString();
new_sec=new_sec.toString();
if(new_hour.length==1)
 new_hour='0'+new_hour;
if(new_min.length==1)
 new_min='0'+new_min;
if(new_sec.length==1)
 new_sec='0'+new_sec;
var new_time=new_hour+':'+new_min+':'+new_sec;
return new_time;
}
function goTestApply()
{
var winoptions = "width=640,height=480,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes"
if( run_test == "test")
window.open('testpage.html',null,winoptions);
}
function isValidMac(digit)
{
 var macVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f",":");
 var len = macVals.length;
 var i = 0;
 var ret = false;
 for ( i = 0; i < len; i++ )
 if ( digit == macVals[i] ) break;
 if ( i < len )
 ret = true;
 return ret;
}
function isValidHex(each_char)
{
var macVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
 var len = macVals.length;
 var i = 0;
 var ret = false;
 for ( i = 0; i < len; i++ )
 if ( each_char == macVals[i] ) break;
 if ( i < len )
 ret = true;
 return ret;
}
function isValidChar_space(each_char)
{
if( each_char < 32 || each_char > 127)
return false;
}
function isValidChar(each_char)
{
if( each_char < 33 || each_char > 126)
return false;
}
function isValidChar_all(each_char)
{
if( each_char < 32 || each_char > 126)
return false;
}
function isValidDdnsHost(each_char)
{
if (!(((each_char>47) && (each_char<58))||(each_char==45)||(each_char==46)||((each_char>64) && (each_char<91))||((each_char>96) && (each_char<123)) || (each_char==8)||(each_char==0))) 
return false;
}
function printPage()
{
 if (window.print)
 window.print();
 else
 alert(no_support_print);
}
=======
function check_DNS(dnsaddr1,dnsaddr2,wan_assign,wan_ip)
{
 if(dnsaddr1!="")
 {
 if(checkipaddr(dnsaddr1)==false)
 {
 alert(invalid_primary_dns);
 return false;
 }
 if( wan_assign == true && isSameIp(dnsaddr1,wan_ip))
 {
 alert(invalid_primary_dns);
 return false;
 }
 }
 if(dnsaddr2!="")
 {
 if(checkipaddr(dnsaddr2)==false)
 {
 alert(invalid_second_dns);
 return false;
 }
 if( wan_assign == true && isSameIp(dnsaddr2,wan_ip))
 {
 alert(invalid_second_dns);
 return false;
 }
 }
 if(dnsaddr1=="" && dnsaddr2=="" )
 {
 alert(invalid_primary_dns);
 return false;
 }
 return true;
}
function getObj(name)
{
 if (document.getElementById)
 {
 return document.getElementById(name).style;
 }
 else if (document.all)
 {
 return document.all[name].style;
 }
 else if (document.layers)
 {
 return document.layers[name];
 }
}
function check_maxNumAdd(form,nowNum,maxNum,msg,go2href)
{
nowNum=parseInt(nowNum,10);
if ( nowNum >= maxNum )
{
alert(msg);
return false;
}
else
location.href=go2href;
}
function checkIPMain(ip,max) {
 if( isNumeric(ip, max) == false ) 
 return false;
}
function checkIP(ip1, ip2, ip3, ip4,max) {
 if(checkIPMain(ip1,255)==false) return false; 
 if(checkIPMain(ip2,255)==false) return false;
 if(checkIPMain(ip3,255)==false) return false;
 if(checkIPMain(ip4,max)==false) return false;
 if((parseInt(ip1)==0)||(parseInt(ip1)==0)&&(parseInt(ip2)==0)&&(parseInt(ip3)==0)&&(parseInt(ip4)==0))
 return false;
if ( ip1 == 0 )
return false;
if ( ip1 == 127 )
return false;
 return true;
}
/* Check Numeric*/
function isNumeric(str, max) 
{
 if(str.length == 0 || str == null || str == "") 
 return false;
 for(i=0; i<str.length; i++) 
{
 var c = str.substring(i, i+1);
 if("0" <= c && c <= "9") 
 continue;
else
 return false;
 }
 var i = parseInt(str);
 if(i>max) 
 return false;
 
 return true;
}
function isIE()
{
var browser = new Object();
browser.version = parseInt(navigator.appVersion);
browser.isNs = false;
browser.isIe = false;
if(navigator.appName.indexOf("Netscape") != -1)
browser.isNs = true;
else if(navigator.appName.indexOf("Microsoft") != -1)
browser.isIe = true;

if(browser.isNs)
return false;
else if (browser.isIe)
return true;
}
function load_default(step){

if (parent.frames['IA_menu']){
for(var i=1;i<=5;i++){
eval("parent.IA_menu.IA_menu_"+i).className ="left_nav_headers";
}
eval("parent.frames[\'IA_menu\'].IA_menu_"+step).className ="left_nav_headers_current_state";
}
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
function isSameIp(ipstr1,ipstr2)
{
 var count = 0;
 var ip1_array=ipstr1.split('.');
 var ip2_array=ipstr2.split('.');
 for(i = 0;i<4;i++)
 {
 num1 = parseInt(ip1_array[i]);
 num2 = parseInt(ip2_array[i]);
 if( num1 == num2)
 count++;
 }
 if( count == 4)
 return true;
 else
 return false;
}
function cp_ip2(from,to)
//true invalid from and to ip; false valid from and to ip;
{
 var total1 = 0;
 var total2 = 0;
var from_array=from.split('.');
var to_array = to.split('.');
var from1=from_array[0];
var from2=from_array[1];
var from3=from_array[2];
var from4=from_array[3];
var to1=to_array[0];
var to2=to_array[1];
var to3=to_array[2];
var to4=to_array[3];
 total1 += parseInt(from4);
 total1 += parseInt(from3)*256;
 total1 += parseInt(from2)*256*256;
 total1 += parseInt(from1)*256*256*256;
 total2 += parseInt(to4);
 total2 += parseInt(to3)*256;
 total2 += parseInt(to2)*256*256;
 total2 += parseInt(to1)*256*256*256;
 if(total1 <= total2)
 return true;
 return false;
}
function isSameSubNet(lan1Ip, lan1Mask, lan2Ip, lan2Mask) 
{
var count = 0;
 lan1a = lan1Ip.split('.');
lan1m = lan1Mask.split('.');
lan2a = lan2Ip.split('.');
lan2m = lan2Mask.split('.');
for (i = 0; i < 4; i++) 
{
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
if (ipaddr == "127.0.0.1")
 {
 return false;
 }
if (!ipArray || ipArray.length != 4)
 {
 return false;
}
if (ipArray[0] == 127)
{
return false
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
 if( subnetArray[0] == 127 ) 
 {
 return false;
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
 case "00":
 case "000":
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
function checkgateway(gateway)
{
var form = document.forms[0];
var dgArray = gateway.split(".");
 var dgstr = dgArray[0]+dgArray[1]+dgArray[2]+dgArray[3];
var i = 0;
if((dgArray[0]=="")||(dgArray[0]<0)||(dgArray[0]>255)||(dgArray[1]=="")||(dgArray[1]<0)||(dgArray[1]>255)
 ||(dgArray[2]=="")||(dgArray[2]<0)||(dgArray[2]>255)||(dgArray[3]=="")||(dgArray[3]<0)||(dgArray[3]>255))
{
return false;
}
for(i=0;i<dgstr.length;i++)
 {
 if((dgstr.charAt(i)!='0')&&(dgstr.charAt(i)!='1')&&(dgstr.charAt(i)!='2')
 &&(dgstr.charAt(i)!='3')&&(dgstr.charAt(i)!='4')&&(dgstr.charAt(i)!='5')
 &&(dgstr.charAt(i)!='6')&&(dgstr.charAt(i)!='7')&&(dgstr.charAt(i)!='8')
 &&(dgstr.charAt(i)!='9'))
 {
 return false;
 }
 }
if( dgArray[0] > 223 || dgArray[0] == 0 )
 return false;
 if (gateway == "0.0.0.0" || gateway == "255.255.255.255")
 {
 return false;
 }
 if (gateway == "127.0.0.1")
 {
 return false;
 }
 if ( dgArray[0] == 127 )
 {
 return false;
 }
if (!dgArray || dgArray.length != 4)
 {
 return false;
 }
 else
 {
 for (i = 0; i < 4; i++) {
 thisSegment = dgArray[i];
 if (thisSegment != "") {
 if (!(thisSegment >=0 && thisSegment <= 255)) { //check if number?
 
 return false;
 }
 } else {
 return false;
 }
}
 }
return true;
}
function is_sub_or_broad(be_checkip, ip, mask)
{
 addr_arr = be_checkip.split('.');
 var ip_addr=0;
 for (i = 0; i < 4; i++)
 {
 addr_str = parseInt(addr_arr[i],10);
 ip_addr=ip_addr*256+parseInt(addr_str);
 }
 var ip_sub=isSub(ip, mask);
 var ip_broadcast=isBroadcast(ip, mask)
if(ip_addr == ip_sub || ip_addr == ip_broadcast){
return false;
}
return true;
}
function isBroadcast(lanIp, lanMask)
{
 ip_arr = lanIp.split('.');
 mask_arr = lanMask.split('.');
 var ip_broadcast=0
 for (i = 0; i < 4; i++)
 {
 ip_str = parseInt(ip_arr[i]);
 mask_str = parseInt(mask_arr[i]);
n_str = ~mask_str+256; 
ip_broadcast=ip_broadcast*256+parseInt(ip_str | n_str) 
 }
return(ip_broadcast);
}
function isSub(lanIp, lanMask)
{
 ip_arr = lanIp.split('.');
 mask_arr = lanMask.split('.');
 var ip_sub=0
 for (i = 0; i < 4; i++)
 {
 ip_str = parseInt(ip_arr[i]);
 mask_str = parseInt(mask_arr[i]);
ip_sub=ip_sub*256+parseInt(ip_str & mask_str) 
 }
return(ip_sub)
}
function isGateway(lanIp, lanMask,gtwIp)
{
gtw_arr = gtwIp.split('.');
var ip_gtw=0
for (i = 0; i < 4; i++)
 {
 gtw_str = parseInt(gtw_arr[i]);
ip_gtw=ip_gtw*256+parseInt(gtw_str); 
 }
var ip_sub=isSub(lanIp, lanMask);
var ip_broadcast=isBroadcast(lanIp, lanMask)
if((parseInt(ip_sub)<parseInt(ip_gtw))&&(parseInt(ip_gtw)<parseInt(ip_broadcast)))
return true;
else
return false;
}
function loadhelp(fname,anchname)
{
parent.help_info = fname;
if(parent.parent.help_info)
parent.parent.help_info = fname;
 if ((loadhelp.arguments.length == 1 ) || (anchname == "" )){
 top.helpframe.location.href="help.html"; 
//"../h"+fname+".html";
}
 else{
 top.helpframe.location.href="help.html#" + anchname;
//"../h"+fname+".html#" + anchname;
}
 return;
}
function getkeya(e)
{
var keycode;
 if (window.event) 
 {
 keycode = window.event.keyCode;
 if (((keycode>47) && (keycode<58))||(keycode==8)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else if (e) 
 {
 keycode = e.which;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==0)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else 
 {
 return true;
 }
}
function getkeyb(e)
{
var keycode;
 if (window.event)
 {
 keycode = window.event.keyCode;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==58)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else if (e)
 {
 keycode = e.which;
 if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==58)||(keycode==0)||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))) { return true; }
 else return false;
 }
 else
 {
 return true;
 }
}
function getkey(type, e)
{
var keycode;
if (window.event) keycode = window.event.keyCode;
else if (e) keycode = e.which;
else return true;

if(type == "apname")
{
if ((keycode==34) ||(keycode==39)||(keycode==92)) { return false; }
else return true;
}
else if(type == "ipaddr")
{
if (((keycode>47) && (keycode<58))||(keycode==8)||(keycode==0)||(keycode==46)) { return true; }
else return false;
}
else if(type == "ssid")
{
if (keycode==32) return false;
else return true;
}
else if(type == "wep")
{
if (((keycode>47) && (keycode<58))||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))||(keycode == 8)||(keycode == 0)) 
return true;
else return false;
}
else if(type == "num")
{
if(((keycode>47) && (keycode<58)) || (keycode==8)||(keycode==0))
return true;
else return false;
}
else if(type == "hostname")
{
if (((keycode>47) && (keycode<58))||(keycode==45)||((keycode>64) && (keycode<91))||((keycode>96) && (keycode<123)) || (keycode==8)||(keycode==0)) { return true; }
else return false;
}
else if(type == "ddns_hostname")
{
if (((keycode>47) && (keycode<58))||(keycode==45)||(keycode==46)||((keycode>64) && (keycode<91))||((keycode>96) && (keycode<123)) || (keycode==8)||(keycode==0)) { return true; }
else return false;
}
else if(type == "mac")
{
if (((keycode>47) && (keycode<58))||((keycode>64) && (keycode<71))||((keycode>96) && (keycode<103))||(keycode == 8)||(keycode == 0) || (keycode == 58) || (keycode == 45))
 return true;
 else return false;
}
else if(type == "ascii")
{
if ((keycode<32) || (keycode>126)) return false;
else return true;
}
else
return true;
}
function changesectype(fname)
{
var html_href;
if(fname.options[0].selected == true) html_href = "security_off.html";
else if(fname.options[1].selected == true) html_href = "wep.html";
else if(fname.options[2].selected == true) html_href = "wpa.html";
else if(fname.options[3].selected == true) html_href = "wpa2.html";
else if(fname.options[4].selected == true) html_href = "wpas.html";

location.href = html_href;
}
function printableKeyFilter() 
{
if (event.keyCode < 32 || event.keyCode > 126)
 event.returnValue = false;
}
function checkpsk(form)
{
 var len = form.sec_wpaphrase.value.length;
 if ( len == 64 )
 {
 for(i=0;i<len;i++)
 {
 if(isValidHex(form.sec_wpaphrase.value.charAt(i))==false)
 {
 alert(wpa_phrase);
 return false;
 }
 }
 }
 else
 {
 if(len < 8 || len > 63){
 alert(wpa_phrase);
 return false;
 }
 for(i=0;i<form.sec_wpaphrase.value.length;i++)
 {
 if(isValidChar_space(form.sec_wpaphrase.value.charCodeAt(i))==false)
 {
 alert(wpa_phrase);
 return false;
 }
 }
 }
 form.sec_wpaphrase_len.value=len;
 return true;
}
function checkwep(form,mssid)
{
form.wep_press_flag.value=0;
var wepkey1=form.wepkey1.value;
var wepkey2=form.wepkey2.value;
var wepkey3=form.wepkey3.value;
var wepkey4=form.wepkey4.value;
if(form.sec_keylen.value==13)
{
if( form.wepkeyno[0].checked == true )
{
if(form.wepkey1.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey1.value.length!=0 && form.wepkey1.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey1.value.length!=0)
for(i=0;i<wepkey1.length;i++)
{
 if(isValidHex(wepkey1.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
}

if( form.wepkeyno[1].checked == true )
{
if(form.wepkey2.value.length!=26)
{
alert(wep_128);
return false;
}
}
else if( form.wepkey2.value.length!=0 && form.wepkey2.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey2.value.length!=0)
for(i=0;i<wepkey2.length;i++)
 {
 if(isValidHex(wepkey2.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
if( form.wepkeyno[2].checked == true)
{
if(form.wepkey3.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey3.value.length!=0 && form.wepkey3.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey3.value.length!=0)
for(i=0;i<wepkey3.length;i++)
 {
 if(isValidHex(wepkey3.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
if( form.wepkeyno[3].checked == true)
{
if(form.wepkey4.value.length!=26) 
{
alert(wep_128);
return false;
}
}
else if( form.wepkey4.value.length!=0 && form.wepkey4.value.length!=26) 
{
alert(wep_128);
return false;
}
if(form.wepkey4.value.length!=0)
for(i=0;i<wepkey4.length;i++)
 {
 if(isValidHex(wepkey4.charAt(i))==false)
 {
 alert(wep_128);
 return false;
 }
 }
}
if(form.sec_keylen.value==5)
{
if( form.wepkeyno[0].checked == true)
{
if(form.wepkey1.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey1.value.length!=0 && form.wepkey1.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey1.value.length!=0)
for(i=0;i<wepkey1.length;i++)
 {
 if(isValidHex(wepkey1.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
if( form.wepkeyno[1].checked == true)
{
if(form.wepkey2.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey2.value.length!=0 && form.wepkey2.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey2.value.length!=0)
for(i=0;i<wepkey2.length;i++)
 {
 if(isValidHex(wepkey2.charAt(i))==false)
 {
 alert(wep_64);
 return false;
}
 }
if( form.wepkeyno[2].checked == true)
{
if(form.wepkey3.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey3.value.length!=0 && form.wepkey3.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey3.value.length!=0)
for(i=0;i<wepkey3.length;i++)
 {
 if(isValidHex(wepkey3.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
if( form.wepkeyno[3].checked == true)
{
if(form.wepkey4.value.length!=10) 
{
alert(wep_64);
return false;
}
}
else if( form.wepkey4.value.length!=0 && form.wepkey4.value.length!=10) 
{
alert(wep_64);
return false;
}
if(form.wepkey4.value.length!=0)
for(i=0;i<wepkey4.length;i++)
  {
 if(isValidHex(wepkey4.charAt(i))==false)
 {
 alert(wep_64);
 return false;
 }
 }
}
if ( form.sec_auth.value != 2 && mssid ==0)
{
if (!confirm(wep_or_wps))
return false;
}
return true;
}
/////////////////////////////////////generate wep key by md5////////////////////////////////////////////////////
function HexToAscii(F,I,S,D) {
 var temp1="";
 S = S.toUpperCase();
 var optionindex=F.sec_keylen.selectedIndex;
 if( F.sec_keylen.options[optionindex].value=="13" )
 {
 wordCount = 26;
 }
 else {
 wordCount = 10;
 }
 //if(F.keyno_11g[I].checked)
 if(1)
 {
 if( (S.length!=wordCount) )
 {
 if(F.wepkeyno[I].checked)
 {
 var s="Hex type key length must be ";
 alert(s + wordCount);
 }
 D.value="";
 S="";
 return S;
 }
 for(i=0;i<wordCount;i+=2)
 {
 var c=S.charCodeAt(i);
 var d=S.charCodeAt(i+1);
 if( (c>=48)&&(c<=57) )
 c=c-48;
 else if( (c>=65)&&(c<=70) )
 c=c-55;
 else
 {
 var s="Over Hex range (0~F)";
 alert(s);
 return S;
 }
 if( (d>=48)&&(d<=57) )
 d=d-48;
 else if( (d>=65)&&(d<=70) )
 d=d-55;
 else
 {
 var s="Over Hex range (0~F)";
 alert(s);
 return S;
 }
 var value=c*16+d;
 if( ((value>=0)&&(value<32)) || ((value>128)&&(value<=255)) )
 {
 temp1+=String.fromCharCode(92);
 temp1+=S.substring(i,i+2);
 }
 else
 {
 if(value==92)
 {
 temp1+=String.fromCharCode(value);
 temp1+=String.fromCharCode(value);
 }
 else
 temp1+=String.fromCharCode(value);
 }
 }
 D.value=temp1;
 }
 return S;
}
function PassPhrase40(F)
{
 var seed = 0;
 var pseed = new Array(0, 0, 0, 0);
 var pkey = new Array(4);
 var asciiObj = new Array(4);
 Length = F.weppassphrase.value.length;
 if(Length != 0) {
 for (i=0; i<Length; i++ ) {
 pseed[i%4] ^= F.weppassphrase.value.charCodeAt(i);
 }
 seed = pseed[0];
 seed += pseed[1] << 8;
 seed += pseed[2] << 16;
 seed += pseed[3] << 24;
 }
 F.wepkey1.value = F.wepkey2.value = "";
 F.wepkey3.value = F.wepkey4.value = "";
 // init key array
 pkey[0] = F.wepkey1;
 pkey[1] = F.wepkey2;
 pkey[2] = F.wepkey3;
 pkey[3] = F.wepkey4;
 for(j=0; j<4; j++) {
 for (i=0; i<5 ;i++ ) {
 seed = (214013 * seed) & 0xffffffff;
 if(seed & 0x80000000) {
 seed = (seed & 0x7fffffff) + 0x80000000 + 0x269ec3;
 }
 else {
 seed = (seed & 0x7fffffff) + 0x269ec3;
 }
 temp = ((seed >> 16) & 0xff);
 if(temp < 0x10) {
 pkey[j].value += "0" + temp.toString(16).toUpperCase();
 }
 else {
 pkey[j].value += temp.toString(16).toUpperCase();
 }
 }
 }
 asciiObj[0] = "";
 asciiObj[1] = "";
 asciiObj[2] = "";
 asciiObj[3] = "";
 for(k=0; k<4; k++) {
 HexToAscii(F, k, pkey[k].value, asciiObj[k]);
 }
 wepkey1 = pkey[0].value;
 wepkey2 = pkey[1].value;
 wepkey3 = pkey[2].value;
 wepkey4 = pkey[3].value;
}
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */
/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";
function rhex(num)
{
 str = "";
 for(j = 0; j <= 3; j++)
 str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
 hex_chr.charAt((num >> (j * 8)) & 0x0F);
 return str;
}
/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str)
{
 nblk = ((str.length + 8) >> 6) + 1;
 blks = new Array(nblk * 16);
 for(i = 0; i < nblk * 16; i++) blks[i] = 0;
 for(i = 0; i < str.length; i++)
 blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
 blks[i >> 2] |= 0x80 << ((i % 4) * 8);
 blks[nblk * 16 - 2] = str.length * 8;
 return blks;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
 var lsw = (x & 0xFFFF) + (y & 0xFFFF);
 var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
 return (msw << 16) | (lsw & 0xFFFF);
}
/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
 return (num << cnt) | (num >>> (32 - cnt));
}
/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t)
{
 return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ff(a, b, c, d, x, s, t)
{
 return cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function gg(a, b, c, d, x, s, t)
{
 return cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function hh(a, b, c, d, x, s, t)
{
 return cmn(b ^ c ^ d, a, b, x, s, t);
}
function ii(a, b, c, d, x, s, t)
{
 return cmn(c ^ (b | (~d)), a, b, x, s, t);
}
/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str)
{
 x = str2blks_MD5(str);
 a = 1732584193;
 b = -271733879;
 c = -1732584194;
 d = 271733878;
 for(i = 0; i < x.length; i += 16)
 {
 olda = a;
 oldb = b;
 oldc = c;
 oldd = d;
 a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
 d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
 c = ff(c, d, a, b, x[i+ 2], 17, 606105819);
 b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
 a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
 d = ff(d, a, b, c, x[i+ 5], 12, 1200080426);
 c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
 b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
 a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
 d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
 c = ff(c, d, a, b, x[i+10], 17, -42063);
 b = ff(b, c, d, a, x[i+11], 22, -1990404162);
 a = ff(a, b, c, d, x[i+12], 7 , 1804603682);
 d = ff(d, a, b, c, x[i+13], 12, -40341101);
 c = ff(c, d, a, b, x[i+14], 17, -1502002290);
 b = ff(b, c, d, a, x[i+15], 22, 1236535329); 
 a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
 d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
 c = gg(c, d, a, b, x[i+11], 14, 643717713);
 b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
 a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
 d = gg(d, a, b, c, x[i+10], 9 , 38016083);
 c = gg(c, d, a, b, x[i+15], 14, -660478335);
 b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
 a = gg(a, b, c, d, x[i+ 9], 5 , 568446438);
 d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
 c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
 b = gg(b, c, d, a, x[i+ 8], 20, 1163531501);
 a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
 d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
 c = gg(c, d, a, b, x[i+ 7], 14, 1735328473);
 b = gg(b, c, d, a, x[i+12], 20, -1926607734);
 
 a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
 d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
 c = hh(c, d, a, b, x[i+11], 16, 1839030562);
 b = hh(b, c, d, a, x[i+14], 23, -35309556);
 a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
 d = hh(d, a, b, c, x[i+ 4], 11, 1272893353);
 c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
 b = hh(b, c, d, a, x[i+10], 23, -1094730640);
 a = hh(a, b, c, d, x[i+13], 4 , 681279174);
 d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
 c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
 b = hh(b, c, d, a, x[i+ 6], 23, 76029189);
 a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
 d = hh(d, a, b, c, x[i+12], 11, -421815835);
 c = hh(c, d, a, b, x[i+15], 16, 530742520);
 b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
 a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
 d = ii(d, a, b, c, x[i+ 7], 10, 1126891415);
 c = ii(c, d, a, b, x[i+14], 15, -1416354905);
 b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
 a = ii(a, b, c, d, x[i+12], 6 , 1700485571);
 d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
 c = ii(c, d, a, b, x[i+10], 15, -1051523);
 b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
 a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
 d = ii(d, a, b, c, x[i+15], 10, -30611744);
 c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
 b = ii(b, c, d, a, x[i+13], 21, 1309151649);
 a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
 d = ii(d, a, b, c, x[i+11], 10, -1120210379);
 c = ii(c, d, a, b, x[i+ 2], 15, 718787259);
 b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
 a = add(a, olda);
 b = add(b, oldb);
 c = add(c, oldc);
 d = add(d, oldd);
 }
 return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
function PassPhrase104(F) 
{
 var pseed2 = "";
 Length2 = F.weppassphrase.value.length;
 for(p=0; p<64; p++) {
 tempCount = p % Length2;
 pseed2 += F.weppassphrase.value.substring(tempCount, tempCount+1);
 }
 md5Str = calcMD5(pseed2);
 F.wepkey1.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey2.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey3.value = md5Str.substring(0, 26).toUpperCase();
 F.wepkey4.value = md5Str.substring(0, 26).toUpperCase();
}
function clickgenerate(form)
{
if(form.weppassphrase.value.length == 0 )
{
alert(gene_phrase)
 return false;
}
for(i=0;i<form.weppassphrase.value.length;i++)
 {
 if(isValidChar_space(form.weppassphrase.value.charCodeAt(i))==false)
 {
 alert(gene_phrase);
 return false;
 }
 }
 if(form.sec_keylen.options[0].selected == true)
 PassPhrase40(form);
else
 PassPhrase104(form);
form.generate_flag.value=1;
}
function doPortChange(check)
{
if(check == 0)
location.href="forwarding.html"
else
location.href="triggering.html"
}
function setDisabled(OnOffFlag,formFields)
{
for (var i = 1; i < setDisabled.arguments.length; i++)
setDisabled.arguments[i].disabled = OnOffFlag;
}
function change_serv(cf)
{
if( cf.login_type[1].selected == true ){
location.href="bas_pppoe.html";
loadhelp('_BAS_pppoe')
}
else if( cf.login_type[0].selected == true ){
location.href="bas_pptp.html";
loadhelp('_BAS_pptp')
}
else if (cf.login_type[2].selected == true )
{
 location.href="bas_l2tp.html";
 loadhelp('_BAS_l2tp')
} 

}
function ew_change_serv(cf)
{
if( cf.login_type[1].selected == true )
location.href="ew_bas_pppoe.html";
else if( cf.login_type[0].selected == true )
location.href="ew_bas_pptp.html"; 

}
function maccheck(mac_addr)
{
if ( mac_addr.indexOf(":")==-1 && mac_addr.length=="12" )
{
 var tmp_mac=mac_addr.substr(0,2)+":"+mac_addr.substr(2,2)+":"+mac_addr.substr(4,2)+":"+mac_addr.substr(6,2)+":"+mac_addr.substr(8,2)+":"+mac_addr.substr(10,2);
mac_addr = tmp_mac;
}
mac_array=mac_addr.split(':');
var mac11 = mac_array[0];
 mac11 = mac11.substr(1,1);
if((mac11=="1")||(mac11=="3")||(mac11=="5")||(mac11=="7")||(mac11=="9")||(mac11=="b")||(mac11=="d")||(mac11=="f")||(mac11=="B")||(mac11=="D")||(mac11=="F"))
 {
if(mac11=="1" && mac_array[0] == "11")
{}
else
{
alert(invalid_mac);
 return false;
}
 }
if(mac_array.length!=6)
{
alert(invalid_mac);
 return false;
}
 if(( mac_array[0]=="")||( mac_array[1]=="")||( mac_array[2]=="")||( mac_array[3]=="")||( mac_array[4]=="")||( mac_array[5]==""))
{
alert(enter_full_mac);
return false;
}
 if((( mac_array[0]=="00")&&( mac_array[1]=="00")&&
 ( mac_array[2]=="00")&&( mac_array[3]=="00")&&
 ( mac_array[4]=="00")&&( mac_array[5]=="00"))||
 (( mac_array[0]=="ff")&&( mac_array[1]=="ff")&&
 ( mac_array[2]=="ff")&&( mac_array[3]=="ff")&&
 ( mac_array[4]=="ff")&&( mac_array[5]=="ff"))||
 (( mac_array[0]=="FF")&&( mac_array[1]=="FF")&&
 ( mac_array[2]=="FF")&&( mac_array[3]=="FF")&&
 ( mac_array[4]=="FF")&&( mac_array[5]=="FF")))
{
alert(invalid_mac);
return false;
}
if(( mac_array[0].length!=2)||( mac_array[1].length!=2)||
 ( mac_array[2].length!=2)||( mac_array[3].length!=2)||
 ( mac_array[4].length!=2)||( mac_array[5].length!=2))
{
alert(invalid_mac);
return false;
}

for(i=0;i<mac_addr.length;i++)
 {
 if(isValidMac(mac_addr.charAt(i))==false)
 {
 alert(invalid_mac);
 return false;
 }
 }
return true;
}
function setMAC(cf,this_mac)
{
var dflag;
if (cf.MACAssign[0].checked || cf.MACAssign[1].checked)
{
dflag = true;
cf.this_mac.value=this_mac;
setDisabled(dflag,cf.this_mac);
}
else
{
dflag = false;
setDisabled(dflag,cf.this_mac);
cf.this_mac.value=this_mac;
}
}
function maccheck_wds(mac_addr,num,form)
{
var return_num=0;
//if(mac_addr==":::::")
if(mac_addr=="")
return 2;
var mac_array=mac_addr.split(':');
var mac11 = mac_array[0];
 mac11 = mac11.substr(1,1);
 if((mac11=="1")||(mac11=="3")||(mac11=="5")||(mac11=="7")||
 (mac11=="9")||(mac11=="b")||(mac11=="d")||(mac11=="f")||
 (mac11=="B")||(mac11=="D")||(mac11=="F"))
{
if( mac11 == "1" && mac_array[0]=="11")
{}
else
 return 1;
}
if(mac_addr.length!=17 && mac_addr.length!=0)
 return 1;
if((mac_array[0]=="")||(mac_array[1]=="")||(mac_array[2]=="")||(mac_array[3]=="")|| (mac_array[4]=="")||(mac_array[5]==""))
{
if((mac_array[0]=="")&&(mac_array[1]=="")&&(mac_array[2]=="")&&(mac_array[3]=="")&& (mac_array[4]=="")&&(mac_array[5]==""))
 return 2;
else
return 1;
 }
if(((mac_array[0]=="00")&&(mac_array[1]=="00")&&
 (mac_array[2]=="00")&&(mac_array[3]=="00")&&
 (mac_array[4]=="00")&&(mac_array[5]=="00"))||
 ((mac_array[0]=="ff")&&(mac_array[1]=="ff")&&
 (mac_array[2]=="ff")&&(mac_array[3]=="ff")&&
 (mac_array[4]=="ff")&&(mac_array[5]=="ff"))||
 ((mac_array[0]=="FF")&&(mac_array[1]=="FF")&&
 (mac_array[2]=="FF")&&(mac_array[3]=="FF")&&
 (mac_array[4]=="FF")&&(mac_array[5]=="FF")))
 return 1;
 if((mac_array[0].length!=2)||(mac_array[1].length!=2)||
 (mac_array[2].length!=2)||(mac_array[3].length!=2)||
 (mac_array[4].length!=2)||(mac_array[5].length!=2))
 return 1;
for(i=0;i<mac_addr.length;i++)
 if(isValidMac(mac_addr.charAt(i))==false)
 return 1;
if( num != "" && num != 0 && num != 1 )
{
for( k=1;k<num;k++)
{
mac_str=eval('the_mac'+k);
if( mac_str != "" && mac_str == mac_addr)
{
return 3;
}
}
}
return return_num;
}
function change_sec_to_time(uptime)
{
var sec=uptime;
var sec=parseInt(sec);
var hour_sec=sec%3600;
if(hour_sec!=sec)
 new_hour=(sec-hour_sec)/3600;
else
 new_hour=0;
var min_sec=hour_sec%60;
if(min_sec!=hour_sec)
 new_min=(hour_sec-min_sec)/60;
else
 new_min=0;
var new_sec=min_sec;
new_hour=new_hour.toString();
new_min=new_min.toString();
new_sec=new_sec.toString();
if(new_hour.length==1)
 new_hour='0'+new_hour;
if(new_min.length==1)
 new_min='0'+new_min;
if(new_sec.length==1)
 new_sec='0'+new_sec;
var new_time=new_hour+':'+new_min+':'+new_sec;
return new_time;
}
function goTestApply()
{
var winoptions = "width=640,height=480,menubar=yes,scrollbars=yes,toolbar=yes,status=yes,location=yes,resizable=yes"
if( run_test == "test")
window.open('testpage.html',null,winoptions);
}
function isValidMac(digit)
{
 var macVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f",":");
 var len = macVals.length;
 var i = 0;
 var ret = false;
 for ( i = 0; i < len; i++ )
 if ( digit == macVals[i] ) break;
 if ( i < len )
 ret = true;
 return ret;
}
function isValidHex(each_char)
{
var macVals = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9","A", "B", "C", "D", "E", "F", "a", "b", "c", "d", "e", "f");
 var len = macVals.length;
 var i = 0;
 var ret = false;
 for ( i = 0; i < len; i++ )
 if ( each_char == macVals[i] ) break;
 if ( i < len )
 ret = true;
 return ret;
}
function isValidChar_space(each_char)
{
if( each_char < 32 || each_char > 127)
return false;
}
function isValidChar(each_char)
{
if( each_char < 33 || each_char > 126)
return false;
}
function isValidChar_all(each_char)
{
if( each_char < 32 || each_char > 126)
return false;
}
function isValidDdnsHost(each_char)
{
if (!(((each_char>47) && (each_char<58))||(each_char==45)||(each_char==46)||((each_char>64) && (each_char<91))||((each_char>96) && (each_char<123)) || (each_char==8)||(each_char==0))) 
return false;
}
function printPage()
{
 if (window.print)
 window.print();
 else
 alert(no_support_print);
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
