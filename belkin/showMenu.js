//added by bin 04/03/2003

function showHead(wanStatus,helpItem,isRouter,isPS)
{
	var strHtml;
	strHtml = '<table border="0" cellspacing="0" cellpadding="0" align="center" width="100%" height="100%">'+
  				'<tr>'+ 
    				'<td colspan=3 bordercolor="#FFFFFF">'+ 
      					'<table width=100% border="0" cellspacing="0" cellpadding="0" bgcolor="#d6d6d6">'+
          					'<tr>'+ 
          						'<td valign="bottom" width=238>'+
          							'<a href="http://www.belkin.com"><img src="headlogo.gif" border="0" width="180" height="70">                                 </a>'+
          						'</td>'+
								'<td align=left class=app_name width=260>' + wizard_name + '</td>';
            			
          		
    document.write(strHtml); 
    
	
	      strHtml =            	'<td height="28" align="left" nowrap class="top_nav" valign=middle> '+
            	    			'<nobr><a href="javascript:top.location.href=\'home.html\';" class="top_nav">'+show1+'</a>&nbsp;'+ 
            		    		'| &nbsp;<a href="javascript:top.location.href=\'help.html\';" class="top_nav">'+show2+'</script></a>&nbsp;';
    document.write(strHtml);        						 
	if(helpItem =='Login' )
	{
     	strHtml = '| &nbsp;<a href="javascript:top.location.href=\'login.html\';" class="top_nav">'+show3+'</a> &nbsp; &nbsp;';
     	document.write(strHtml); 
    }
    else
    {
      	strHtml = '| &nbsp;<a href="javascript:top.location.href=\'index.html\';" class="top_nav">'+show4+'</a> &nbsp; &nbsp;';
     	document.write(strHtml);
    }
    if(isAPmode =='0')
    { 
            //alert(wanStatus);
            if(wanStatus == 'Up')
            {
             	strHtml =      				'<span class="status">'+show5+':</span> '+
                    						'<span class="connected">'+show6+'</span></nobr> ';
                document.write(strHtml);
        	} 
        	else if(wanStatus == 'Down')
        	{
        		strHtml =      				'<span class="status">'+show5+':</span> '+
                    						'<span class="disconnected">'+show7+'</span></nobr>';
                document.write(strHtml);
        	}
        	else 
        	{
        	}
     }
        strHtml =  				'</td>'+          						
          					'</tr>'+
      					'</table>'+
    				'</td>'+
  				'</tr>';
  	document.write(strHtml);
}

function wiz_start(mode)
{
    if(mode == '1') //AP MODE
        alert(wiz_apmode);
    else        
        top.location.href='wiz_main.html';    
}

function manual_start()
{
    top.location.href='index.html';    
}

function showmenu(menuSection,menuItem,isRouter,isPS,isAPmode)
{
	var yellow   ='#FFFF00';
	var white    ='#FFFFFF';
	var red    	 ='#FF0000';
	var blue   	 ='#E8F8FF';
	var darkBlue ='#94CAE4';
	var black    ='#000000';
	var bssid = '00:30:bd:f6:ee:95';
	var darkgrey ='#666666';
	var lightblue ='#6699ff';
	var white1 = '#cccccc';
	
	//alert(isRouter);
	//alert(isAPmode);
	var strHtml;
		strHtml=   '<tr>'+ 
    				'<td valign="top" width="180" height="100%" bgcolor="#666666">'+ 
      				'<table width="180" border="0" cellspacing="0" cellpadding="0" align="left">'+
					'<tr>'+
					'<td ><a href="javascript:manual_start()"></a>'+
					'</td></tr>';
      	document.write(strHtml);
    
    // Router Mode
    if(isAPmode =='0')
    {
    
		// LAN Section   
   		if(menuSection=='LAN')
   		{
   			printMenuSection('lan_main.html', show8, yellow);
   			
   			if(menuItem=='LAN Settings')
   			{
   				printMenuItem('lan_sett.html', show9, lightblue, darkgrey);
        	}
        	else
        	{
        		printMenuItem('lan_sett.html', show9, white1, darkgrey);
        	}
        	if(menuItem=='DHCP Client List')
       	 	{
       	 		printMenuItem('lan_dhcp.html', show10, lightblue, darkgrey);
       		}
       		else
       		{
       			printMenuItem('lan_dhcp.html', show10, white1, darkgrey);
       		}
    	}
    	else
    	{ 
    		printMenuSection('lan_main.html', show8, white); 
        	printMenuItem('lan_sett.html', show9, white1, darkgrey);
        	printMenuItem('lan_dhcp.html', show10, white1, darkgrey);
		}
		
		// WAN Section   
		if(menuSection=='WAN')
		{
			printMenuSection('wan_menu.html', show11, yellow);
			
    		if(menuItem=='Connection Type')
    		{
    			printMenuItem('wan_conn.html', show12, lightblue, darkgrey);
    		}
    		else
    		{
    			printMenuItem('wan_conn.html', show12, white1, darkgrey);
    		}
    		
    		if(menuItem=='DNS')
    		{
    			printMenuItem('wan_dns.html', show13, lightblue, darkgrey);
    		}
    		else
    		{
    			printMenuItem('wan_dns.html', show13, white1, darkgrey);
    		}
    		
    		if(menuItem=='MAC Address')
    		{
    			printMenuItem('wan_mac.html', show14, lightblue, darkgrey);
    		}
    		else
    		{
    			printMenuItem('wan_mac.html', show14, white1, darkgrey);
    		}
    	}
		else
		{	
			printMenuSection('wan_menu.html', show11, white);    		
    		printMenuItem('wan_conn.html', show12, white1, darkgrey);
    		printMenuItem('wan_dns.html', show13, white1, darkgrey);
    		printMenuItem('wan_mac.html', show14, white1, darkgrey);
        }
	}
	
	// router or ap mode
      	
      	// WLAN Section   
      	if(bssid != show16) {
		if(menuSection=='WLAN')
		{
			printMenuSection('wls_main.html', show17, yellow);
			
        	if(menuItem=='Channel and SSID')
    		{
        		printMenuItem('wls_chan.html', show18, lightblue, darkgrey);
         	}
         	else
         	{
         		printMenuItem('wls_chan.html', show18, white1, darkgrey);
         	}
         	
            if(menuItem=='Security')
    		{
         		printMenuItem('wls_encr.html', show19, lightblue, darkgrey);
         	}
         	else
         	{
         		printMenuItem('wls_encr.html', show19, white1, darkgrey);
         	}
			
			if(menuItem=='Wi-Fi Protected Setup')
    		{
         		printMenuItem('wls_wps.html', show21, lightblue, darkgrey);
         	}
         	else
         	{
         		printMenuItem('wls_wps.html', show21, white1, darkgrey);
         	}
            
         	if(menuItem=='Use as Access Point')
    		{
     			printMenuItem('wls_apt.html', show20, lightblue, darkgrey);
         	}
         	else
         	{
     			printMenuItem('ap_disab.html', show20, white1, darkgrey);
         	}
         	/*
     		if(menuItem=='Wireless Bridging')
			{
     			printMenuItem('wls_wds.html', show23, lightblue, darkgrey);
    		}
    		else
    		{
    			printMenuItem('wls_wds.html', show23, white1, darkgrey);
    		}
    		*/
       	    if(menuItem =='MAC Address Control')
      		{
          		printMenuItem('wls_acl.html', show22, lightblue, darkgrey);
          	}
          	else
           	{
           		printMenuItem('wls_acl.html', show22, white1, darkgrey);
           	}
  
		}
		else
		{
			printMenuSection('wls_main.html', show17, white);
    		printMenuItem('wls_chan.html', show18, white1, darkgrey);
    		printMenuItem('wls_encr.html', show19, white1, darkgrey);
			printMenuItem('wls_wps.html', show21, white1, darkgrey);
     		printMenuItem('ap_disab.html', show20, white1, darkgrey);
     		//printMenuItem('wls_wds.html', show23, white1, darkgrey);
     	    printMenuItem('wls_acl.html', show22, white1, darkgrey);
      	}
      } 	      	
    //router mode    			
    if(isAPmode=='0') 
    {   	
       	
       	// Fire Wall Section   
		if(menuSection=='Fire')
		{
			printMenuSection('fw_main.html', show24, yellow);
      	
          	if(menuItem=='Virtual Servers')
    		{
    			printMenuItem('fw_virt.html', show25, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('fw_virt.html', show25, white1, darkgrey);
          	}
          	
          	if(menuItem=='Client IP Filters')
    		{
    			printMenuItem('fw_acl.html', show26, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('fw_acl.html', show26, white1, darkgrey);
          	}
          	
          	if(menuItem=='MAC Address Filtering')
    		{
    			printMenuItem('fw_mac.html', show27, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('fw_mac.html', show27, white1, darkgrey);
          	}
          	
          	if(menuItem=='DMZ')
    		{
    			printMenuItem('fw_dmz.html', show28, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('fw_dmz.html', show28, white1, darkgrey);
          	}
    		if(menuItem=='DDNS')
    		{
    			printMenuItem('ddns.html', show15, lightblue, darkgrey);
    		}
    		else
    		{
    			printMenuItem('ddns.html', show15, white1, darkgrey);
    		}          	
          	
          	if(menuItem=='WAN Ping Blocking')
    		{
    			printMenuItem('fw_ping.html', show29, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('fw_ping.html', show29, white1, darkgrey);
          	}
          	
          	if(menuItem=='Security Log')
    		{
    			printMenuItem('fw_sec.html', show30, lightblue, darkgrey);
        	}
        	else
        	{
        		printMenuItem('fw_sec.html', show30, white1, darkgrey);
        	}
		}
		else
		{
         	printMenuSection('fw_main.html', show24, white);
         	
    		//printMenuItem('fw_gtwy.html', 'Application Gateways', black, white);
          	printMenuItem('fw_virt.html', show25, white1, darkgrey);
          	printMenuItem('fw_acl.html', show26, white1, darkgrey);
          	printMenuItem('fw_mac.html', show27, white1, darkgrey);
          	printMenuItem('fw_dmz.html', show28, white1, darkgrey);
          	printMenuItem('ddns.html', show15, white1, darkgrey);
          	printMenuItem('fw_ping.html', show29, white1, darkgrey);
        	printMenuItem('fw_sec.html', show30, white1, darkgrey);
        }
	} 
        
        // router or ap mode
      	// Utilities Section  
      	if(menuSection=='Util')
      	{	
      		printMenuSection('ut_main.html', show31, yellow);
      		
          	
        	if(menuItem=='Restart Router')
    		{
  				printMenuItem('ut_reset.html', show33, lightblue, darkgrey);
          	}
          	else
          	{
  				printMenuItem('ut_reset.html', show33, white1, darkgrey);
          	}
          	if(menuItem=='Restore Factory Default')
    		{
    			printMenuItem('ut_facty.html', show35, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('ut_facty.html', show35, white1, darkgrey);
          	}
          	if(menuItem=='Save/Backup Settings')
    		{	
    			printMenuItem('ut_save.html', show36, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('ut_save.html', show36, white1, darkgrey);
          	}
          	if(menuItem=='Restore Previous Settings')
    		{
    			printMenuItem('ut_prev.html', show37, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('ut_prev.html', show37, white1, darkgrey);
          	}
          	if(menuItem=='Firmware Update')
    		{
    			printMenuItem('ut_firew.html', show38, lightblue, darkgrey);
          	}
          	else
          	{
          		printMenuItem('ut_firew.html', show38, white1, darkgrey);
          	}
          	if(menuItem=='System Settings')
    		{
    			if(isAPmode=='0')
    			{
    				printMenuItem('ut_sys.html', show39, lightblue, darkgrey);
    				
        		}
        		else
        		{
        			printMenuItem('utb_sys.html', show39, lightblue, darkgrey);
        		}
        	}
        	else
        	{
        		if(isAPmode=='0')
    			{
    				printMenuItem('ut_sys.html', show39,  white1, darkgrey);
    				
        		}
        		else
        		{
        			printMenuItem('utb_sys.html', show39,  white1, darkgrey);
        		}
        	}
      	}
      	else
      	{
      		printMenuSection('ut_main.html', show31, white);
  			printMenuItem('ut_reset.html', show33, white1, darkgrey);
          	printMenuItem('ut_facty.html', show35, white1, darkgrey);
          	printMenuItem('ut_save.html', show36, white1, darkgrey);
          	printMenuItem('ut_prev.html', show37, white1, darkgrey);
          	printMenuItem('ut_firew.html', show38, white1, darkgrey);
        	if(isAPmode=='0')
    		{
    			printMenuItem('ut_sys.html', show39,  white1, darkgrey);
        	}
        	else
        	{
        		printMenuItem('utb_sys.html', show39,  white1, darkgrey);
        	}
        }
       
        strHtml = '<tr>'+  
          				'<td width="5" bgcolor="#666666">&nbsp;</td>'+ 
          				'<td bgcolor="#666666">'+ 
          				'&nbsp;</td>'+ 
         			'</tr>';
         			
        document.write(strHtml);
    
   		strHtml=		'</table>'+
    				'</td>'+
    				'<td valign="top" width="1" bgcolor="#006699" height="100%">'+
    					'<img src="shim.gif" width="1" height="1">'+
    				'</td>';
   	document.write(strHtml);
   	
   
}

function showTail()
{
	var strHtml;
	strHtml = '</tr>'+
			'</table>'+
		'</body>'+
	'</html>';
	document.write(strHtml);
}

function printMenuSection(link, content, color)
{
	var strHtml;
	strHtml=		    '<tr><td colspan="2" height=12 width=140></td></tr>'+
	                    '<tr>'+ 
          				'<td colspan="2" height="20" width="140" bgcolor="#666666">'+
          					'&nbsp&nbsp&nbsp&nbsp&nbsp'+
          					'<a  class="uptest" href="' + link + '" class="section"><font color="' + color + '">'+
          					content+
          					'</font></a>'+
          				'</td>'+
        			'</tr>';
    document.write(strHtml);
    
}

function printMenuItem(link, content, color, background)
{
	var strHtml;	
    strHtml=		'<tr><td colspan="2" height=4 width=140></td></tr>'+
                        '<tr>'+  
          				'<td width="5" bgcolor="' + background + '">&nbsp;</td>'+ 
          				'<td bgcolor="' + background + '">'+ 
									'&nbsp&nbsp&nbsp&nbsp&nbsp'+
          				'<a class="test" href="' + link + '"><font color="' + color + '">' + content + '</font></a>'+ 
          				'</td>'+ 
         			'</tr>';
    document.write(strHtml);
}
