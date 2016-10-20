<<<<<<< HEAD
function checkpasswd(cf)
{
for(i=0;i<cf.szPasswd1.value.length;i++)
 { 
if(isValidChar_space(cf.szPasswd1.value.charCodeAt(i))==false)
 {
 alert(password_error);
 return false;
 }
 }
if (cf.szPasswd1.value.length == 33 || cf.szPasswd2.value.length == 33)
{
alert(passwd_leng);
return false;
}
if(cf.szPasswd1.value != cf.szPasswd2.value)
{ 
alert(newpas_notmatch);
return false;
}
cf.passwd_length.value=cf.szPasswd1.value.length;
return true;
}
=======
function checkpasswd(cf)
{
for(i=0;i<cf.szPasswd1.value.length;i++)
 { 
if(isValidChar_space(cf.szPasswd1.value.charCodeAt(i))==false)
 {
 alert(password_error);
 return false;
 }
 }
if (cf.szPasswd1.value.length == 33 || cf.szPasswd2.value.length == 33)
{
alert(passwd_leng);
return false;
}
if(cf.szPasswd1.value != cf.szPasswd2.value)
{ 
alert(newpas_notmatch);
return false;
}
cf.passwd_length.value=cf.szPasswd1.value.length;
return true;
}
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
