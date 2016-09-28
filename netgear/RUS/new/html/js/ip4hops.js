var TAB_CODE=9;
var DEL_CODE=46 ;
var BS_CODE=8;
var SP_CODE=32;
var DOT_CODE=190;
var DOT2_CODE=110;
function CheckNum(keynum)
{
if( ((keynum >= 96) && keynum <= 105)
||((keynum >= 48) && keynum <= 57)
||((keynum >= 65) && keynum <= 70)
)
return true;
return false;
}
function IPKeyUp(e,v)
{
var prefix=v.id.slice(0,-1);
var idx=v.id.charAt(v.id.length-1);
var obj=document.getElementById(prefix+idx);
var len;
var nextidx = Number(idx) + 1;
var keynum;
if(window.event)
keynum = event.keyCode;
else if(e.which) // Netscape/Firefox/Opera
keynum = e.which;
if(keynum == TAB_CODE || keynum == BS_CODE) return;
len = obj.value.length;
if(len == 3 || keynum == DOT_CODE || keynum == DOT2_CODE)
{
if(len == 0) return;
obj=document.getElementById(prefix+nextidx);
if(obj) obj.focus();
return;
}
}
function IPKeyDown(e,v)
{
var prefix=v.id.slice(0,-1);
var idx=v.id.charAt(v.id.length-1);
var obj=document.getElementById(prefix+idx);
var previdx = Number(idx) - 1;
var keynum;
if(window.event)
keynum = event.keyCode;
else if(e.which) // Netscape/Firefox/Opera
keynum = e.which;
if((keynum == TAB_CODE)
|| (keynum == DEL_CODE)
|| (keynum == BS_CODE) )
{
if(obj.value.length == 0 && keynum == BS_CODE)
{
obj=document.getElementById(prefix+previdx);
if(obj) obj.focus();
}
return 1;
}
return CheckNum(keynum);
}
/*
函数作用：实现IP地址用4个框表示时，页面返回值时，将get到的值分配给相应的4个框
参数说明： ip 需要返回到页面上的IP地址;
pageip1--pageip4 页面上4个框对应的id
*/
function OnloadIP4hops(ip, pageip1, pageip2, pageip3, pageip4)
{
var myIP=new Array();
var ip_str = ip;
myIP[0] = myIP[1] = myIP[2] = myIP[3] = "";
if(ip_str != "")
{
var tmp = ip_str.split(".");
myIP[0] = tmp[0];
myIP[1] = tmp[1];
myIP[2] = tmp[2];
myIP[3] = tmp[3];
}
$(pageip1).value = myIP[0] ;
$(pageip2).value = myIP[1] ;
$(pageip3).value = myIP[2];
if(pageip4!='')
$(pageip4).value = myIP[3];
}