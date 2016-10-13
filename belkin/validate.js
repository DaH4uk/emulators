var daysOfMonth = new Array(
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
);

var daysOfMonthLY = new Array(
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
);
function isLeapYear(year) {
  year = year - 0;
  if ((year/4)   != Math.floor(year/4))   return false;
  if ((year/100) != Math.floor(year/100)) return true;
  if ((year/400) != Math.floor(year/400)) return false;
  return true;
}

function isValidDate(day, month, year) {
 day = day - 0; month = month - 0; year = year - 0;
 if ((isLeapYear(year) && day > daysOfMonthLY[month-1]) ||
	(!isLeapYear(year) && day > daysOfMonth[month-1]))
	return false;
 else
	return true;
}

function validateIp(val){
 if(val.length==0) return false;
 var ii; sval=String(val);
 if(val.length>15)
	{alert(vjs1);return false;}
 i1=val.indexOf('.');
 if(i1==-1)
	{alert(vjs2);return false;}
 sub1=val.substring(0,i1);

 tempval=val.substring(i1+1,val.length);
 i2=tempval.indexOf('.');
 if(i2==-1)
	{alert(vjs2);return false;}
 sub2=tempval.substring(0,i2);

 tempval=tempval.substring(i2+1,tempval.length);
 i3=tempval.indexOf('.');
 if(i3==-1)
	{alert(vjs2);return false;}
 sub3=tempval.substring(0,i3);

 tempval=tempval.substring(i3+1,tempval.length);
 i4=tempval.indexOf('.');
 if(i4!=-1)
	{alert(vjs4);return false;}
 sub4=tempval.substring(0,tempval.length);

 if(sub1.length==0 || sub2.length==0 || sub3.length==0 || sub4.length==0)
	{alert(vjs3);return false;}

 if((sub1-0)<0 || (sub1-0)>255 || (sub2-0)<0 || (sub2-0)>255 ||
 (sub3-0)<0 || (sub3-0)>255 || (sub4-0)<0 || (sub4-0)>255)
	{alert(vjs5);return false;}

 for (ii=0; ii<sval.length; ii++)
 {
	if (sval.charAt(ii)=='.')
	{continue;}
	else if (sval.charAt(ii)<'0' || sval.charAt(ii)>'9')
	{
	 alert(vm1+'['+sval.charAt(ii)+'] '+vm2+(ii+1)+'! '+vm3+' 0123456789');
	 return false;
	}
 }
 
 return true;
}

function validateMTU(val) 
{
 mval = val; mval=mval-0;
 if(val.length<3 || mval<500 || mval>1500)
 {
	alert(vjs14);
	return false;
 }
 for(i=0; i<val.length; i++)
 {
	if(val.charAt(i)<'0' || val.charAt(i)>'9')
	{	alert(vm4+val.charAt(i)+vm2+ (i+1)+'! '+vm3+' 0123456789');
		return false;
	}
 }
 return true;
}

function hex(val)
{
	var h = (val-0).toString(16);
	if(h.length==1) h='0'+h;
	return h.toUpperCase();
}

function validateGateway(wanIp,netmaskIp,gatewayIp) {
	if(gatewayIp.length==0) return true;
	if(validateWanIp(gatewayIp) == false) return false;
	var i1,i2,i3, wip, nip, gip;

	i1=wanIp.indexOf('.');
	i2=wanIp.indexOf('.',(i1+1));
	i3=wanIp.indexOf('.',(i2+1));
	wip = hex(wanIp.substring(0,i1)) + hex(wanIp.substring((i1+1),i2)) +hex(wanIp.substring((i2+1),i3))+hex(wanIp.substring((i3+1),wanIp.length));
	wip = '0x'+wip;

	i1=netmaskIp.indexOf('.');
	i2=netmaskIp.indexOf('.',(i1+1));
	i3=netmaskIp.indexOf('.',(i2+1));
	nip = hex(netmaskIp.substring(0,i1)) + hex(netmaskIp.substring((i1+1),i2)) +hex(netmaskIp.substring((i2+1),i3)) +hex(netmaskIp.substring((i3+1),netmaskIp.length));
	nip = '0x'+nip;

	i1=gatewayIp.indexOf('.');
	i2=gatewayIp.indexOf('.',(i1+1));
	i3=gatewayIp.indexOf('.',(i2+1));
	gip = hex(gatewayIp.substring(0,i1)) + hex(gatewayIp.substring((i1+1),i2)) +hex(gatewayIp.substring((i2+1),i3)) +hex(gatewayIp.substring((i3+1),gatewayIp.length));
	gip = '0x'+gip;

	if((wip & nip) != (gip & nip))
	{
		alert(vjs16 +gatewayIp+vjs161 + wanIp+"/"+netmaskIp+vjs162);
		return false;
	}
	return true;
}

function validateMac(val){
 var i;
 sval=String(val);

 if (sval.length>0 && sval.length!=17)
 {	
	return false;
 }
 for (i=0; i<sval.length; i++)
 {	
    if ((i % 3)==2)
	{
	    if (sval.charAt(i)!=':')
	    { 
            return false;
        }
 	}
	else if (!((sval.charAt(i)>='0' && sval.charAt(i)<='9') ||
	(sval.charAt(i)>='A' && sval.charAt(i)<='F')  ||
	(sval.charAt(i)>='a' && sval.charAt(i)<='f')))
 	{  
	 return false;
 	}
 }
 var sub1=val.substring(0,2);
 var sub2=val.substring(3,5);
 var sub3=val.substring(6,8);
 var sub4=val.substring(9,11);
 var sub5=val.substring(12,14);
 var sub6=val.substring(15);

 if (sub1=='ff' && sub2=='ff' && sub3=='ff' && sub4=='ff' && sub5=='ff' && sub6=='ff')
 {
	alert(vjs23);
	return false;
 }
 if (sub1=='00' && sub2=='00' && sub3=='00' && sub4=='00' && sub5=='00' && sub6=='00')
 {
	alert(vjs24);
	return false;
 }
 sub1='0x'+sub1;
 if((sub1 & 1)==1)
 {
	alert(vjs25);
	return false;
 }
 return true;
}

function validateStartEndIp(lanip,netip,startip, endip)
{
 if(endip.length==0) return;
 if((validateGateway(lanip,netip,endip)) == false) return false;

 i1=startip.indexOf('.');
 i2=startip.indexOf('.',(i1+1));
 i3=startip.indexOf('.',(i2+1));
 sip = hex(startip.substring(0,i1)) + hex(startip.substring((i1+1),i2)) +hex(startip.substring((i2+1),i3))+hex(startip.substring((i3+1),startip.length));
 sip = '0x'+sip;

 i1=endip.indexOf('.');
 i2=endip.indexOf('.',(i1+1));
 i3=endip.indexOf('.',(i2+1));
 eip = hex(endip.substring(0,i1)) + hex(endip.substring((i1+1),i2)) +hex(endip.substring((i2+1),i3))+hex(endip.substring((i3+1),endip.length));
 eip = '0x'+eip;

 if(sip>eip)
 {
	alert(vjs26);
	return false;
 }
}

function validateLanClassANetmask(val)
{
    if(val!='255.0.0.0' && val!='255.128.0.0' && val!='255.192.0.0' && val!='255.224.0.0' 
        && val!='255.240.0.0' && val!='255.248.0.0' && val!='255.252.0.0' && val!='255.254.0.0'
        && !validateLanClassBNetmask(val))
    {
        return false;
    }
    return true;
}

function validateLanClassBNetmask(val)
{
    if(val!='255.255.0.0' && val!='255.255.128.0' && val!='255.255.192.0' && val!='255.255.224.0' 
        && val!='255.255.240.0' && val!='255.255.248.0' && val!='255.255.252.0' && val!='255.255.254.0'
        && !validateLanNetmask(val))
    {
        return false;
    }
    return true;
}

function validateLanNetmask(val)
{
    if(val!='255.255.255.0' && val!='255.255.255.128' && val!='255.255.255.192' && val!='255.255.255.224' 
        && val!='255.255.255.240' && val!='255.255.255.248' && val!='255.255.255.252' && val!='255.255.255.254')
    {
        return false;
    }
    return true;
}

function validateWanIp(val)
{
	if(validateIp(val)==false) return false;

	var ii; sval=String(val);
	i1=val.indexOf('.');
	sub1=val.substring(0,i1);

	tempval=val.substring(i1+1,val.length);
	i2=tempval.indexOf('.');
	sub2=tempval.substring(0,i2);

	tempval=tempval.substring(i2+1,tempval.length);
	i3=tempval.indexOf('.');
	sub3=tempval.substring(0,i3);

	tempval=tempval.substring(i3+1,tempval.length);
	i4=tempval.indexOf('.');
	sub4=tempval.substring(0,tempval.length);
	
	if(sub4=='0' || sub4=='255')
	{
		alert(vjs30);
		return false;
	}
	if(sub1=='0' || sub1=='255')
	{
		alert(vjs35);
		return false;
	}
	if(sub1=='127')
	{
		alert(vjs31);
		return false;
	}
	if(val=='0.0.0.0')
	{
		alert(vjs32);
		return false;
	}

	if((sub1-0)>223)
	{
		alert(vjs33);
		return false;
	}
	return true;
}

function badMask(ip1, ip2, ip3, ip4)   // mask fields
{
	var i,j,match0,match1 = -1;
	var m = new Array(4);

	for( i = 0; i < 4; i++ )
	{
		m[i] = badMask.arguments[i].value;
		if(!(isInteger(m[i], 0, 255, false)))
			return true; // bad
	    if(i == 0)
	    {
	        if(!(isInteger(m[i], 255, 255, false)))
	            return true;
	    }		
	}
	for(i = 3; i >= 0; i--)
	{
		for(j = 1;j <= 8;j++)
		{
			if( ( m[i] % 2 ) == 0)   match0 = ( 3 - i ) * 8 + j;
			else if(((m[i] % 2) == 1) && match1 == -1)   match1 = ( 3 - i ) * 8 + j;
			m[i] = Math.floor(m[i] / 2);
		}
	}
	if((match0 > match1) 
	    || (match1 == 1) 
	    || (badMask.arguments[3].value == 254))
		return true;
	else 
		return false;
}
function isInteger(str, min_value, max_value, allowBlank)  // allowBlank = true or false
{
	if(str.length == 0)
		if(allowBlank)
			return true;
		else
			return false;
	for (var i=0; i < str.length; i++)
	{
		if ((str.charAt(i) < '0') || (str.charAt(i) > '9'))
				return false;
	}
	var int_value = parseInt(str,10);
	if ((int_value < min_value) || (int_value > max_value))
		return false;
	return true;
}

function validVisibleStr(Str)
{
    var i, len = Str.length;

    for(i = 0; i < len; i++)
    {
        if(Str.charAt(i) < ' ' || Str.charAt(i) > '~')
            return false;
    }
    
    return true;
}

function validHostName(name)
{
    var localname = name.toLowerCase();
    for(i=0;i<localname.length;i++)
    {
        var token=localname.charAt(i);
        if(token=='`' || token=='~' || token=='!' || token=='@' || token=='#'
	       || token=='$' || token=='%' || token=='^' || token=='&' || token=='*'
	       || token=='(' || token==')' || token=='_' || token=='+' || token=='['
	       || token==']' || token=='{' || token=='}' || token=='\\'|| token=='|'
	       || token==';' || token==':' || token=='\''|| token=='"' || token=='<'
	       || token=='>' || token=='/' || token=='?' || token=='.' || token==',')
        {
            return false;
        } 
    }
    
    return true;
}

function validNumLetter(name)
{
    var localname = name.toLowerCase();
    
    for(i = 0; i < localname.length; i++)
    {
        var onec = localname.charAt(i);
        
        if((onec >= '0' && onec <= '9')
            || (onec >= 'a' && onec <= 'z'))
        {
            continue;
        }
        
        return false;
    }
    
    return true;
}

function isBlank(s) 
{
 for(var i = 0; i < s.length; i++) 
 {
     var c = s.charAt(i);
     if((c !=' ') && (c!='\n') && (c !='\t')) 
        return false;
 }
 return true;
}

function isNValidIP(s) 
{
    if((isBlank(s))||(isNaN(s))||(s<0||s>255)) 
        return true;
    else 
        return false;
}

function isNValidEndIP(s) 
{
    if((isBlank(s))||(isNaN(s))||(s<=0||s>=255)) 
        return true;
    else 
        return false;
}

function isNValidSingleFirstIP(s) 
{
    if((isBlank(s))||(isNaN(s))||(s<=0||s>=224)) 
        return true;
    else 
        return false;
}

function isNValidPort(s) 
{
    if((isBlank(s))||(isNaN(s)||(s < 1)||(s>65535))) 
        return true;
    else	
        return false;
}

function isLoopBackFirstIP(s)
{
    if(s == 127)
        return true;
    else
        return false;        
}

function isHex(s) 
{
    var j;
    for(var i = 0; i < s.length; i++) 
    {
        var c = s.charAt(i);
        j = parseInt(c,16);
        if ((j == 0) || (j == 1)|| (j == 2)|| (j == 3)|| (j == 4)|| (j == 5)|| (j == 6)
        || (j == 7)|| (j == 8)|| (j == 9)|| (j == 10)|| (j == 11)|| (j == 12)|| (j == 13)|| (j == 14)|| (j == 15)) 
        {
            ;      
        }
        else
            return false;
            
    }
    return true;
}

function isNValid(s) 
{
    if( isBlank(s) || !isHex(s)) 
        return true;
    else
        return false;
}

function filter_enter(e)
{
    var key = window.event ? e.keyCode : e.which;
    
    if(13 == key)
        return true;
    else
    	return false;
}
