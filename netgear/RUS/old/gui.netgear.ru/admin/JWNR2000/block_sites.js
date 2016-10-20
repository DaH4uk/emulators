<<<<<<< HEAD
function show_trustedip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.cfTrusted_IPAddress1.value=lanip_array[0];
cf.cfTrusted_IPAddress2.value=lanip_array[1];
cf.cfTrusted_IPAddress3.value=lanip_array[2];
}
function check_blocksites()
{
var cf = document.forms[0];
cf.cfTrusted_IPAddress.value="";
if (cf.trustipenble.checked == true)
{
cf.Trusted_IP_Enable.value=1;
cf.cfTrusted_IPAddress.value=cf.cfTrusted_IPAddress1.value+'.'+cf.cfTrusted_IPAddress2.value+'.'+cf.cfTrusted_IPAddress3.value+'.'+cf.cfTrusted_IPAddress4.value;
if(checkipaddr(cf.cfTrusted_IPAddress.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameIp(cf.cfTrusted_IPAddress.value,lan_ip)==true)
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.cfTrusted_IPAddress.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(same_subnet_ip_trusted);
return false;
}
}
else
cf.Trusted_IP_Enable.value=0;
cf.Text.value = "";
if(cf.cfKeyWord_DomainList.length>0)
{
for(i=0;i<cf.cfKeyWord_DomainList.length-1;i++)
if(cf.cfKeyWord_DomainList.options[i].value!="")
cf.Text.value += cf.cfKeyWord_DomainList.options[i].value + " ";
cf.Text.value+= cf.cfKeyWord_DomainList.options[i].value;
}
for(i=0;i<3;i++)
 if(document.forms[0].skeyword[i].checked == true)
cf.skeyword.value=i;
return true;
}
function checkKeyWord()
{
var cf = document.forms[0];
//add to cfKeyWord_DomainList
var tbox=cf.cfKeyWord_DomainList;
var tbox_length=cf.cfKeyWord_DomainList.length;
if ( tbox_length == 255 )
{
alert(keyword255);
cf.cfKeyWord_Domain.value="";
return false;
}
if ( cf.cfKeyWord_Domain.value == "")
return false;
for(i=0;i<cf.cfKeyWord_Domain.value.length;i++)
 {
 if(isValidChar(cf.cfKeyWord_Domain.value.charCodeAt(i))==false)
 {
 alert(error_keyword);
 return false;
 }
 }
var new_str=cf.cfKeyWord_Domain.value.toLowerCase();
if(new_str.indexOf("://")>0 && new_str.length>7)
{
if(new_str.substring(0,7)=="http://")
new_str=cf.cfKeyWord_Domain.value.substr(7);
else if(new_str.substring(0,8)=="../../https@/")
new_str=cf.cfKeyWord_Domain.value.substr(8);
elsenew_str=cf.cfKeyWord_Domain.value;
}
else
{
new_str=cf.cfKeyWord_Domain.value;
}

for(var i=0;i<tbox_length;i++)
{
if(new_str.toLowerCase()==tbox.options[i].value.toLowerCase())
{
cf.cfKeyWord_Domain.value="";
return false;
}
}
if(tbox_length == 1 && tbox.options[0].value=="")
var new_length=0;
else 
var new_length=tbox_length;
tbox.options[new_length]=new Option(new_str.toLowerCase(),new_str.toLowerCase());
cf.cfKeyWord_Domain.value="";
return true;
}
function checkKeyWordDomainList(act)
{
var cf = document.forms[0];
cf.cfKeyWord_Domain.value = "";
if(cf.cfKeyWord_DomainList.options[0] == null)
{
return false;
}
if (act=='delete' && cf.cfKeyWord_DomainList.selectedIndex!=-1)
{
cf.cfKeyWord_DomainList.options[cf.cfKeyWord_DomainList.selectedIndex]=null;
}
if (act=='clear')
{
var DomainList_length=cf.cfKeyWord_DomainList.length;
for(var i=0;i<DomainList_length;i++)
{
cf.cfKeyWord_DomainList.options[0]=null;
}
}
return true;
}
function checkTrustIP()
{
var cf = document.forms[0];
if(!cf.trustipenble.checked)
cf.cfTrusted_IPAddress4.disabled = true;
else
cf.cfTrusted_IPAddress4.disabled = false;
}
=======
function show_trustedip()
{
var cf=document.forms[0];
var lanip_array=new Array();
lanip_array=lan_ip.split('.');
cf.cfTrusted_IPAddress1.value=lanip_array[0];
cf.cfTrusted_IPAddress2.value=lanip_array[1];
cf.cfTrusted_IPAddress3.value=lanip_array[2];
}
function check_blocksites()
{
var cf = document.forms[0];
cf.cfTrusted_IPAddress.value="";
if (cf.trustipenble.checked == true)
{
cf.Trusted_IP_Enable.value=1;
cf.cfTrusted_IPAddress.value=cf.cfTrusted_IPAddress1.value+'.'+cf.cfTrusted_IPAddress2.value+'.'+cf.cfTrusted_IPAddress3.value+'.'+cf.cfTrusted_IPAddress4.value;
if(checkipaddr(cf.cfTrusted_IPAddress.value)==false)
{
alert(invalid_ip);
return false;
}
if(isSameIp(cf.cfTrusted_IPAddress.value,lan_ip)==true)
{
alert(invalid_ip_dup);
return false;
}
if(isSameSubNet(cf.cfTrusted_IPAddress.value,lan_subnet,lan_ip,lan_subnet) == false)
{
alert(same_subnet_ip_trusted);
return false;
}
}
else
cf.Trusted_IP_Enable.value=0;
cf.Text.value = "";
if(cf.cfKeyWord_DomainList.length>0)
{
for(i=0;i<cf.cfKeyWord_DomainList.length-1;i++)
if(cf.cfKeyWord_DomainList.options[i].value!="")
cf.Text.value += cf.cfKeyWord_DomainList.options[i].value + " ";
cf.Text.value+= cf.cfKeyWord_DomainList.options[i].value;
}
for(i=0;i<3;i++)
 if(document.forms[0].skeyword[i].checked == true)
cf.skeyword.value=i;
return true;
}
function checkKeyWord()
{
var cf = document.forms[0];
//add to cfKeyWord_DomainList
var tbox=cf.cfKeyWord_DomainList;
var tbox_length=cf.cfKeyWord_DomainList.length;
if ( tbox_length == 255 )
{
alert(keyword255);
cf.cfKeyWord_Domain.value="";
return false;
}
if ( cf.cfKeyWord_Domain.value == "")
return false;
for(i=0;i<cf.cfKeyWord_Domain.value.length;i++)
 {
 if(isValidChar(cf.cfKeyWord_Domain.value.charCodeAt(i))==false)
 {
 alert(error_keyword);
 return false;
 }
 }
var new_str=cf.cfKeyWord_Domain.value.toLowerCase();
if(new_str.indexOf("://")>0 && new_str.length>7)
{
if(new_str.substring(0,7)=="http://")
new_str=cf.cfKeyWord_Domain.value.substr(7);
else if(new_str.substring(0,8)=="../../https@/")
new_str=cf.cfKeyWord_Domain.value.substr(8);
elsenew_str=cf.cfKeyWord_Domain.value;
}
else
{
new_str=cf.cfKeyWord_Domain.value;
}

for(var i=0;i<tbox_length;i++)
{
if(new_str.toLowerCase()==tbox.options[i].value.toLowerCase())
{
cf.cfKeyWord_Domain.value="";
return false;
}
}
if(tbox_length == 1 && tbox.options[0].value=="")
var new_length=0;
else 
var new_length=tbox_length;
tbox.options[new_length]=new Option(new_str.toLowerCase(),new_str.toLowerCase());
cf.cfKeyWord_Domain.value="";
return true;
}
function checkKeyWordDomainList(act)
{
var cf = document.forms[0];
cf.cfKeyWord_Domain.value = "";
if(cf.cfKeyWord_DomainList.options[0] == null)
{
return false;
}
if (act=='delete' && cf.cfKeyWord_DomainList.selectedIndex!=-1)
{
cf.cfKeyWord_DomainList.options[cf.cfKeyWord_DomainList.selectedIndex]=null;
}
if (act=='clear')
{
var DomainList_length=cf.cfKeyWord_DomainList.length;
for(var i=0;i<DomainList_length;i++)
{
cf.cfKeyWord_DomainList.options[0]=null;
}
}
return true;
}
function checkTrustIP()
{
var cf = document.forms[0];
if(!cf.trustipenble.checked)
cf.cfTrusted_IPAddress4.disabled = true;
else
cf.cfTrusted_IPAddress4.disabled = false;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
