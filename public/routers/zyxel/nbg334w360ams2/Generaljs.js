    function doMACcheck(object)
    {
      var szAddr = object.value;
      var len = szAddr.length;
      var errMsg = "Invalid MAC Address";

      if ( len == 0 )
        return;

      if ( len == 12 )
      {
        var newAddr = "";
        var i = 0;

        for ( i = 0; i < len; i++ )
        {
          var c = szAddr.charAt(i);

          if ( doHexCheck(c) < 0 )
          {
            alert(errMsg);
            object.value ="00:00:00:00:00:00";
            object.focus();
            return;
          }
          if ( (i == 2) || (i == 4) || (i == 6) || (i == 8) || (i == 10) )
            newAddr = newAddr + ":";
          newAddr = newAddr + c;
        }
        object.value = newAddr;
        return;
      }
      else if ( len == 17 )
      {
        var i = 2;
        var c0 = szAddr.charAt(0);
        var c1 = szAddr.charAt(1);
		
        if ( (doHexCheck(c0) < 0) || (doHexCheck(c1) < 0) )
        {
          alert(errMsg);
          object.value ="00:00:00:00:00:00";
          object.focus();
          return;
        }

        i = 2;
        while ( i < len )
        {
          var c0 = szAddr.charAt(i);
          var c1 = szAddr.charAt(i+1);
          var c2 = szAddr.charAt(i+2);
		  if(c0 == "-")
		  	c0 = ":";
          if ( (c0 != ":") || (doHexCheck(c1) < 0) || (doHexCheck(c2) < 0) )
          {
            alert(errMsg);
            object.value ="00:00:00:00:00:00";
            object.focus();
            return;
          }
          i = i + 3;
        }
		
		i=0;
		var newAddr = "";
		while ( i < len )
        {
          var c = szAddr.charAt(i);
          if ( (i == 2) || (i == 5) || (i == 8) || (i == 11) || (i == 14) )
            newAddr = newAddr + ":";
		  else
          	newAddr = newAddr + c;
		  i++;
		  
        }
        object.value = newAddr;
        return;
      }
      return;
    }
    
    function doHexCheck(c)
    {
      if ( (c >= "0") && (c <= "9") )
        return 1;
      else if ( (c >= "A") && (c <= "F") )
        return 1;
      else if ( (c >= "a") && (c <= "f") )
        return 1;

      return -1;
    }
	
	function checkIPFormat(address) {
		var IP = address.value;
		if (IP == "N/A")
			return;
		IP = IP.replace(/ /g, "");
		address.value = IP;
		IPsplit = IP.split(".");

		if(IPsplit.length != 4 ) {
				alert("IP format error !");
				address.focus();
				address.value="0.0.0.0";
				return (false);
		}

		for(i = 0; i < 4; i++) {
			if((isNaN(IPsplit[i])) || (IPsplit[i] == 'undefined') || (IPsplit[i] == "")) {
				alert("IP format error !");
				address.focus();
				address.value="0.0.0.0";
				return(false);
			} else {
				if((parseInt(IPsplit[i], 10) > 255) || (parseInt(IPsplit[i], 10) < 0)) {
					alert("IP format error !");
					address.focus();
					address.value="0.0.0.0";
					return(false);
				}
			}
		}	
	}

	function SubnetCheck(mask)
	{	
		if ( !((mask.value == "128.0.0.0")||
	     	(mask.value == "192.0.0.0")||
	     	(mask.value == "224.0.0.0")||
	     	(mask.value == "240.0.0.0")||
	     	(mask.value == "248.0.0.0")||
	     	(mask.value == "252.0.0.0")||
	     	(mask.value == "254.0.0.0")||
	     	(mask.value == "255.0.0.0")||
	     	(mask.value == "255.128.0.0")||
	     	(mask.value == "255.192.0.0")||
	     	(mask.value == "255.224.0.0")||
	     	(mask.value == "255.240.0.0")||
	     	(mask.value == "255.248.0.0")||
	     	(mask.value == "255.252.0.0")||
	     	(mask.value == "255.254.0.0")||
	     	(mask.value == "255.255.0.0")||
	     	(mask.value == "255.255.128.0")||
	     	(mask.value == "255.255.192.0")||
	     	(mask.value == "255.255.224.0")||
	     	(mask.value == "255.255.240.0")||
	     	(mask.value == "255.255.248.0")||
	     	(mask.value == "255.255.252.0")||
	     	(mask.value == "255.255.254.0")||
	     	(mask.value == "255.255.255.0")||
	     	(mask.value == "255.255.255.128")||
	     	(mask.value == "255.255.255.192")||
	     	(mask.value == "255.255.255.224")||
	     	(mask.value == "255.255.255.240")||
	     	(mask.value == "255.255.255.248")||
	     	(mask.value == "255.255.255.252")) )	     	
		{	alert('Subnet Mask error');
	    	 	mask.value = "0.0.0.0";
	    	 	return(false);
		}    
	}

	function SubnetCheckZero(mask)
	{	
		if ( !((mask.value == "128.0.0.0")||
			(mask.value == "0.0.0.0")||
	     	(mask.value == "192.0.0.0")||
	     	(mask.value == "224.0.0.0")||
	     	(mask.value == "240.0.0.0")||
	     	(mask.value == "248.0.0.0")||
	     	(mask.value == "252.0.0.0")||
	     	(mask.value == "254.0.0.0")||
	     	(mask.value == "255.0.0.0")||
	     	(mask.value == "255.128.0.0")||
	     	(mask.value == "255.192.0.0")||
	     	(mask.value == "255.224.0.0")||
	     	(mask.value == "255.240.0.0")||
	     	(mask.value == "255.248.0.0")||
	     	(mask.value == "255.252.0.0")||
	     	(mask.value == "255.254.0.0")||
	     	(mask.value == "255.255.0.0")||
	     	(mask.value == "255.255.128.0")||
	     	(mask.value == "255.255.192.0")||
	     	(mask.value == "255.255.224.0")||
	     	(mask.value == "255.255.240.0")||
	     	(mask.value == "255.255.248.0")||
	     	(mask.value == "255.255.252.0")||
	     	(mask.value == "255.255.254.0")||
	     	(mask.value == "255.255.255.0")||
	     	(mask.value == "255.255.255.128")||
	     	(mask.value == "255.255.255.192")||
	     	(mask.value == "255.255.255.224")||
	     	(mask.value == "255.255.255.240")||
	     	(mask.value == "255.255.255.248")||
	     	(mask.value == "255.255.255.252")) )	     	
		{	alert('Subnet Mask error');
	    	 	mask.value = "0.0.0.0";
	    	 	return(false);
		}    
	}

function checkIPRange(address) {
		var IP = address.value;
		if (IP == "N/A")
			return;
		if(IP == "0.0.0.0"){
			alert("0.0.0.0 is not a valid IP address !");
			return(false);
		}			
		IP = IP.replace(/ /g, "");
		address.value = IP;
		IPsplit = IP.split(".");

		if(IPsplit.length != 4 ) {
				alert("IP format error !");
				address.value="0.0.0.0";
				return (false);
		}

		for(i = 0; i < 4; i++) {
			if((isNaN(IPsplit[i])) || (IPsplit[i] == 'undefined') || (IPsplit[i] == "")) {
				alert("IP format error !");
				address.value="0.0.0.0";
				return(false);
			} else {
				if((parseInt(IPsplit[i], 10) > 255) || (parseInt(IPsplit[i], 10) < 0)) {
					alert("IP format error !");
					address.value="0.0.0.0";
					return(false);
				}
			}
		}
		
		if(parseInt(IPsplit[0], 10) > 223){
			alert("IP format error !");
			return(false);
		}		

	}

function chk_num(event)
{
	if (event.keyCode < 48 || event.keyCode > 57 ) /* 0-9 */
		event.returnValue = false;
}

function chk_phonenum(event)
{
	 if(event.keyCode == 44)/* ,  */
     event.returnValue = true;
	else if (event.keyCode < 48 || event.keyCode > 57 ) /* 0-9 */
		event.returnValue = false;
}


function chk_chtNum(event){
	if(event.keyCode == 95)/* _  */
		event.returnValue = true;
	else if (event.keyCode > 96 && event.keyCode < 123 ) /* a-z */
		event.returnValue = true;
	else if (event.keyCode > 64 && event.keyCode < 91 ) /* A-Z */
		event.returnValue = true;
	else if (event.keyCode < 48 || event.keyCode > 57 ) /* 0-9 */
		event.returnValue = false;
	return;
} 

function chk_CR(event)
{
	if (event.keyCode == 13)
		document.forms[0].submit();
}


function HourCheck(I)
{	d =parseInt(I.value, 10);
	if ( !(d<24 && d>=0) )
	{		
			alert('Hour value is out of range [0 - 23]');
			I.value = I.defaultValue;
	}
}

function MinCheck(I)
{	d =parseInt(I.value, 10);
	if ( !(d<60 && d>=0) )
	{		
			alert('Minute value is out of range [0 - 59]');
			I.value = I.defaultValue;
	}
}


function MM_swapImage() {
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
	if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_swapImgRestore() {
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_preloadImages() {
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
	var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
	if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) {
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
	d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function showLayer(layerName) {
	if (document.all) { 
		document.all[layerName].style.display = 'block';
	} else if (document.layers) { 
		document.layers[layerName].dispaly = 'block';
	} else if (document.getElementById) {
		document.getElementById(layerName).style.display = 'block';
	}
}

function hideLayer(layerName) {
	if (document.all) {
		document.all[layerName].style.display = 'none';
	} else if (document.layers) {
		document.layers[layerName].display = 'none';
	} else if (document.getElementById) {
		document.getElementById(layerName).style.display = 'none';
	}
}
	
function showFullPath(str){	
	fr =2;
	parent.frames[fr].document.open();
	parent.frames[fr].document.writeln(' <html>');
	parent.frames[fr].document.writeln(' <head>
<link rel="shortcut icon" href="https://zyxel.ru/favicon.ico" type="image/x-icon">');
	parent.frames[fr].document.writeln(' <title>Untitled Document<\/title>');
	parent.frames[fr].document.writeln(' <meta http-equiv=\"Content-Type\" content=\"text\/html; charset=iso-8859-1\">');	
	parent.frames[fr].document.writeln(' <link href=\"control.css\" rel=\"stylesheet\" type=\"text/css\">');
	parent.frames[fr].document.writeln(' <\/head>');
	parent.frames[fr].document.writeln(' <body background=\"images\/full_path_bg.gif\">');	
	parent.frames[fr].document.writeln(' <table width=\"100%\"  border=\"0\" cellspacing=\"0\" cellpadding=\"0\">');
	parent.frames[fr].document.writeln(' <tr>');
	parent.frames[fr].document.writeln(' <td height=\"19\" class=\"path\">&nbsp;<img src=\"images\/dot_2.gif\" width=\"12\" height=\"12\"  align=\"absmiddle\">&nbsp;'+str+'<\/td>');
	parent.frames[fr].document.writeln(' <\/tr>');
	parent.frames[fr].document.writeln(' <\/table>');
	parent.frames[fr].document.writeln(' <\/body>');
	parent.frames[fr].document.writeln(' <\/html>');	
	parent.frames[fr].document.close();
}	
