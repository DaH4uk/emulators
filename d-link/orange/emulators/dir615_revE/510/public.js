var subnet_mask = new Array(0, 128, 192, 224, 240, 248, 252, 254, 255);
var key_num_array = new Array("64", "128");
var Week = new Array(_Sun, _Mon, _Tue, _Wed, _Thu, _Fri, _Sat);

var BROADCAST_IP_IGNORE = "broadcast_ip_ignore";

function rule_obj(name, prot, public_port, private_port){	
	this.name = name;
	this.prot = prot;		// TCP, UDP
	this.public_port = public_port;
	this.private_port = private_port;
} 

function appl_obj(name, trigger_prot, trigger_port, public_prot, public_port){
	this.name = name;
	this.trigger_prot = trigger_prot;		// TCP, UDP
	this.trigger_port = trigger_port;
	this.public_prot = public_prot;
	this.public_port = public_port;
}

function set_application_option(obj_value, obj_array){
	for (var i = 0; i < obj_array.length; i++){
		var temp_rule = obj_array[i];
		obj_value += "<option>" + temp_rule.name + "</option>";
	}
	return obj_value;
}

function addr_obj(addr, e_msg, allow_zero, is_network){
	this.addr = addr;
	this.e_msg = e_msg;
	this.allow_zero = allow_zero;		
	this.is_network = is_network;
}

function varible_obj(var_value, e_msg, min, max, is_even){
	this.var_value = var_value;
	this.e_msg = e_msg;
	this.min = min;
	this.max = max;		
	this.is_even = is_even;		
}

function raidus_obj(ip, port, secret){
	this.ip = ip;
	this.port = port;
	this.secret = secret;
}

function change_filter(which_filter){
    var html_file;
    
    switch(which_filter){
		case 0 :
	    	html_file = "adv_filters.htm";
	    	break;
		case 1 :
	    	html_file = "adv_filters_mac.htm";
	    	break;	    	
		case 2 :
	    	html_file = "adv_filters_url.htm";
	    	break;
		case 3 :
	    	html_file = "adv_filters_domain.htm";
	    	break;
	}
	
	location.href = html_file;
}

function change_routing(which_routing){
    var html_file;
    
    switch(which_routing){
        case 0 :
            html_file = "adv_routing.htm";
            break;
        case 1 :
            html_file = "adv_routing_dynamic.htm";
            break;
        case 2 :
            html_file = "adv_routing_table.htm";
            break;
    }
    
    location.href = html_file;
}

function check_network_address(my_obj, mask_obj){
	var count_zero = 0;
	var ip = my_obj.addr;
	var mask;
	var allow_cast = false;

	if (my_obj.addr.length == 4){
		// check the ip is not multicast IP (127.x.x.x && 224.x.x.x ~ 239.x.x.x)
		if(my_obj.addr[0] == "127"){
			alert(my_obj.e_msg[MULTICASE_IP_ERROR]);
			return false;
		}
		
		// check the ip is "0.0.0.0" or not
		for(var i = 0; i < ip.length; i++){
			if (ip[i] == "0"){
				count_zero++;			
			}				
		}

		if (!my_obj.allow_zero && count_zero == 4){	// if the ip is not allowed to be 0.0.0.0
			alert(my_obj.e_msg[ZERO_IP]);			// but we check the ip is 0.0.0.0
			return false;
		}else if (count_zero != 4){		// when IP is not 0.0.0.0, checking range. Otherwise no need to check				
				mask = mask_obj.addr;
				for(var i = 0; i < mask.length; i++){
					if (mask[i] != "255"){
					if (ip[i] != (mask[i] & ip[i])){
						alert(my_obj.e_msg[FIRST_RANGE_ERROR + i] + (mask[i] & ip[i]));
						return false;
					}
				}
			}
		}
	}else{	// if the length of ip is not correct, show invalid ip msg
		alert(my_obj.e_msg[INVALID_IP]);
		return false;
	}

	return true;
}

function check_domain(ip, mask, gateway){
	var temp_ip = ip.addr;
	var temp_mask = mask.addr;
	var temp_gateway = gateway.addr;
	var temp_str = "";
	
	for (var i = 0; i < 4; i++){
		temp_str += temp_gateway[i];
		
		if (i < 3){
			temp_str += ".";
		}
	}
	
	if (gateway.allow_zero && (temp_str == "0.0.0.0" || temp_str == "...")){
		return true;
	}

	for (var i = 0; i < temp_ip.length - 1; i++){
		if ((temp_ip[i] & temp_mask[i]) != (temp_gateway[i] & temp_mask[i])){
			return false;		// when not in the same subnet mask, return false
		}
	}

	return true;
}

function check_ip_order(start_ip, end_ip){
	var temp_start_ip = start_ip.addr;
	var temp_end_ip = end_ip.addr;
	var total1 = ip_num(temp_start_ip);
	var total2 = ip_num(temp_end_ip);
    
    if(total1 > total2)
        return false;
	return true;
}
	
function check_lanip_order(ip,start_ip, end_ip){
	var temp_start_ip = start_ip.addr;
	var temp_end_ip = end_ip.addr;
	var temp_ip = ip.addr;
	var total1 = ip_num(temp_start_ip);
	var total2 = ip_num(temp_end_ip);
    var total3 = ip_num(temp_ip);
    if(total1 <= total3 && total3 <= total2)
         return true;
	return false;
}
    
function check_resip_order(reserved_ip,start_ip, end_ip){
	var temp_start_ip = start_ip.addr;
	var temp_end_ip = end_ip.addr;
	var temp_res_ip = reserved_ip.addr;
	var total1 = ip_num(temp_start_ip);
	var total2 = ip_num(temp_end_ip);
    var total3 = ip_num(temp_res_ip);
    if(total1 <= total3 && total3 <= total2)
        return false;
	return true;
}

function check_ip4(ip4){
	var temp_ip = (ip4.ip).split(" ");
	
	if (ip4.ip == ""){
		alert(ip4.e_msg1);
		return false;
	}else if (isNaN(ip4.ip) || temp_ip.length > 1 || parseInt(ip4.ip) < ip4.min_range || parseInt(ip4.ip) > ip4.max_range){
		alert(ip4.e_msg2);
		return false;
	}
	return true;
}

function check_key(){
	var key;
	var def_key = get_by_id("wep_def_key").value;
	var wep_def_key = get_by_id("wep_def_key");
	var wep_key_len = parseInt(get_by_id("wep_key_len").value);
	var hex_len = wep_key_len * 2;
	var wep_error_msg;

	for(var i = 1; i < 5; i++){
			key = get_by_id("key" + i).value;
			if (wep_def_key[i-1].selectedIndex){
		        if (key == ''){
		    	alert(YM122);
					return false;
    	        }
		  }else{
		    	if (key.length != wep_key_len && key.length != hex_len){		    		
					alert(TEXT041.replace("+ i +",i).replace("+ wep_key_len +",wep_key_len).replace("+ hex_len +",hex_len));
			    		return false;
		    	}else if(key.length == hex_len){
			      	for (var j = 0; j < key.length; j++){
			      		if (!check_hex(key.substring(j, j+1))){
							alert(TEXT042.replace("+ i +",i));
			      			return false;
			      		}
			      	}
		    	}
		  }
	}
	return true;
}

function check_integer(which_value, min, max){	
	var temp_obj = trim_string(which_value);	
	if (temp_obj == "" || isNaN(which_value)){		
		return false;
	}else if (parseInt(which_value,10) < min || parseInt(which_value,10) > max){
		return false;
	}
	return true;
}

function get_seq(index){
	var seq;
	
	switch(index){
		case 0:
			seq = "1st";
			break;
		case 1:
			seq = "2nd";
			break;
		case 2:
			seq = "3rd";
			break;
		case 3:
			seq = "4th";
			break;
	}
	return seq;
}

function check_ip_range(order, my_obj, mask, bcastIpCcheckFlag){
	var which_ip = (my_obj.addr[order]).split(" ");
	var start, end;

	if (isNaN(which_ip) || which_ip == "" || which_ip.length > 1 || (which_ip[0].length > 1 && which_ip[0].substring(0,1) == "0")){	// if the address is invalid
		alert(my_obj.e_msg[FIRST_IP_ERROR + order]);
		return false;
	}

	if(bcastIpCcheckFlag != BROADCAST_IP_IGNORE){

		if (order == 0){				// the checking range of 1st address
			start = 1;
		}else{
			start = 0;
		}
			
		if (mask[order] != 255){		
			if (parseInt(which_ip) >= 0 && parseInt(which_ip) <= 255){	
				end = (~mask[order]+256);				
				start = mask[order] & which_ip;	
				end += start;
			
				if (end > 255){
					end = 255;
				}
			}else{
				end = 255;
			}
		}else{
			end = 255;
		}
		
		
		if (order == 3){
			if ((mask[0] == 255) && (mask[1] == 255) && (mask[2] == 255)){
				start += 1;
				end -= 1;
			}else{
				if (((mask[0] | (~my_obj.addr[0]+256)) == 255) && ((mask[1] | (~my_obj.addr[1]+256)) == 255) && ((mask[2] | (~my_obj.addr[2]+256)) == 255)){
					start += 1;
				}
				
				if (((mask[0] | my_obj.addr[0]) == 255) && ((mask[1] | my_obj.addr[1]) == 255) && ((mask[2] | my_obj.addr[2]) == 255)){			
					end -= 1;
				}				
			}
		}
			
		if (parseInt(which_ip) < start || parseInt(which_ip) > end){			
			alert(my_obj.e_msg[FIRST_RANGE_ERROR + order] + " " + start + " ~ " + end + ".");		
			return false;
		}
	}	

	return true;
}

function check_current_range(order, my_obj, checking_ip, mask){
	var which_ip = (my_obj.addr[order]).split(" ");
	var start, end;

	if (isNaN(which_ip) || which_ip == "" || which_ip.length > 1 || (which_ip[0].length > 1 && which_ip[0].substring(0,1) == "0")){	// if the address is invalid
		alert(my_obj.e_msg[FIRST_IP_ERROR + order]);
		return false;
	}
	
	if (order == 0){				// the checking range of 1st address
		start = 1;	
	}else{
		start = 0;				
	}
	
	if (mask[order] != 255){				
		if (parseInt(checking_ip[order]) >= 0 && parseInt(checking_ip[order]) <= 255){	
			end = (~mask[order]+256);				
			start = mask[order] & checking_ip[order];	
			end += start;
		
			if (end > 255){
				end = 255;
			}
		}else{
			end = 255;
		}
	}else{
		end = 255;
	}
	
	if (order == 3){
		if ((mask[0] == 255) && (mask[1] == 255) && (mask[2] == 255)){
			start += 1;
			end -= 1;
		}else{		
			if (((mask[0] | (~my_obj.addr[0]+256)) == 255) && ((mask[1] | (~my_obj.addr[1]+256)) == 255) && ((mask[2] | (~my_obj.addr[2]+256)) == 255)){
				start += 1;
			}
			
			if (((mask[0] | my_obj.addr[0]) == 255) && ((mask[1] | my_obj.addr[1]) == 255) && ((mask[2] | my_obj.addr[2]) == 255)){			
				end -= 1;
			}	
		}	
	}
		
	if (parseInt(which_ip) < start || parseInt(which_ip) > end){			
		alert(my_obj.e_msg[FIRST_RANGE_ERROR + order] + " " + start + " ~ " + end + ".");		
		return false;
	}
	
	return true;
}

function check_hex(data){
	data = data.toUpperCase();

	if (!(data >= 'A' && data <= 'F') && !(data >= '0' && data <= '9')){
		return false;
	}
	return true;
}										
				
function check_wan_setting(ip, mask, gateway, obj_word){				
	
	if (!check_mask(mask)){
		return false;   // when subnet mask is not in the subnet mask range
	}else if (!check_address(ip, mask)){
		return false;		// when ip is invalid
	}else if (!check_address(gateway, mask, ip)){
		return false;	// when gateway is invalid
	}else if (!check_domain(ip, mask, gateway)){		// check if the ip and the gateway are in the same subnet mask or not
		alert(wwa_pv5_alert_5);
		return false;
	}
	return true;
}
function check_mac(mac){
    var temp_mac = mac.split(":");
    var error = true;
	var mac_val = parseInt(temp_mac[0],16);
    if (temp_mac.length == 6){
	    if(mac_val%=2){	
	    	return false;
	    }
	    for (var i = 0; i < 6; i++){        
	        var temp_str = temp_mac[i];
	        
	        if (temp_str == ""){
	            error = false;
	        }else{        	
	            if (!check_hex(temp_str.substring(0,1)) || !check_hex(temp_str.substring(1))){
	                error = false;
	            }
	        }
	        
	        if (!error){
	            break;
	        }
	    }
	}else{
		error = false;
	}
    return error;
}
function check_mac_00(mac){
    var error = true;
    if((mac.indexOf(':') != -1)){
    	var temp_mac = mac.split(":");
    }else if((mac.indexOf('-') != -1)){
    	var temp_mac = mac.split("-");
    }
    
    if(mac.length != 17) {
        return false;
    }
    if(mac.substring(0,2) != "00" && mac.substring(0,2) != "02" && mac.substring(0,2) != "04" && mac.substring(0,2) != "06" && mac.substring(0,2) != "08"){
    	return false;
    }    
    
    if (temp_mac.length == 6){
    	var j=0;
	    for (var i = 0; i < 6; i++){        
	        var temp_str = temp_mac[i];
	        
	        if (temp_str == ""){
	            error = false;
	        }
	        else if(temp_str == "00"){
	        	j++;
	        }	
	        else{        	
	            if (!check_hex(temp_str.substring(0,1)) || !check_hex(temp_str.substring(1))){
	                error = false;
				}
			}
	        if (!error){
	            break;
			}
		}
		if(j==6)
			error = false;
	}else{
		error = false;
	}
    return error;
}

function check_address(my_obj, mask_obj, ip_obj, broadcastIpCcheckFlag){
	var count_zero = 0;
	var count_bcast = 0;	
	var ip = my_obj.addr;
	var mask;
	
	if (my_obj.addr.length == 4){
		// check the ip is not multicast IP (127.x.x.x && 224.x.x.x ~ 239.x.x.x)
		if((my_obj.addr[0] == "127") || ((my_obj.addr[0] >= 224) && (my_obj.addr[0] <= 239))){
			alert(my_obj.e_msg[MULTICASE_IP_ERROR]);
			return false;
		}
		// check the ip is "0.0.0.0" or not
		for(var i = 0; i < ip.length; i++){
			if (ip[i] == "0"){
				count_zero++;			
			}
		}

		if (!my_obj.allow_zero && count_zero == 4){	// if the ip is not allowed to be 0.0.0.0
			alert(my_obj.e_msg[ZERO_IP]);			// but we check the ip is 0.0.0.0
			return false;
		}else if (count_zero != 4){		// when IP is not 0.0.0.0, checking range. Otherwise no need to check		
			count_zero = 0;
				
			if (check_address.arguments.length >= 2 && mask_obj != null){
				mask = mask_obj.addr;
			}else{
				mask = new Array(255,255,255,0);
			}
						
			for(var i = 0; i < ip.length; i++){
				
				if (check_address.arguments.length == 3 && ip_obj != null){
					if (!check_current_range(i, my_obj, ip_obj.addr, mask)){
						return false;
					}
				}else{					
					if (!check_ip_range(i, my_obj, mask, broadcastIpCcheckFlag)){
						return false;
					}
				}
			}		
							
			for (var i = 0; i < 4; i++){	// check the IP address is a network address or a broadcast address																							
				if (((~mask[i] + 256) & ip[i]) == 0){	// (~mask[i] + 256) = reverse mask[i]
					count_zero++;						
				}
								
				if ((mask[i] | ip[i]) == 255){
					count_bcast++;
				}
			}
		
			if ((count_zero == 4 && !my_obj.is_network)){				
				alert(my_obj.e_msg[INVALID_IP]);			
				return false;
			}													
			
			/* broadcast check */
			if (count_bcast == 4){
				if(broadcastIpCcheckFlag != BROADCAST_IP_IGNORE){
					alert(my_obj.e_msg[INVALID_IP]);			
					return false;
				}	
			}	
		}
	}else{	// if the length of ip is not correct, show invalid ip msg
		alert(my_obj.e_msg[INVALID_IP]);
		return false;
	}

	return true;
}

function check_mask(my_mask){
	var temp_mask = my_mask.addr;

	if (temp_mask.length == 4){
		for (var i = 0; i < temp_mask.length; i++){
			var which_ip = temp_mask[i].split(" ");
			var mask = parseInt(temp_mask[i]);
			var in_range = false;
			var j = 0;

			if (isNaN(which_ip) || which_ip == "" || which_ip.length > 1 || (which_ip[0].length > 1 && which_ip[0].substring(0,1) == "0")){	// if the address is invalid
				alert(my_mask.e_msg[FIRST_IP_ERROR + i]);
				return false;
			}

			if (i == 0){	// when it's 1st address
				j = 1;		// the 1st address can't be 0
			}

			for (; j < subnet_mask.length; j++){
				if (mask == subnet_mask[j]){
					in_range = true;
					break;
				}else{
					in_range = false;
				}
			}

			if (!in_range){
				alert(my_mask.e_msg[FIRST_RANGE_ERROR + i]);
				return false;
			}

			if (i != 0 && mask != 0){ // when not the 1st range and the value is not 0
				if (parseInt(temp_mask[i-1]) != 255){  // check the previous value is 255 or not
					alert(my_mask.e_msg[INVALID_IP]);
					return false;
				}
			}

			if (i == 3 && (parseInt(mask) == 254 || parseInt(mask) == 255)){	// when the last mask address is 255
				alert(my_mask.e_msg[FOURTH_RANGE_ERROR]);
				return false;
			}
		}
	}else{
		alert(my_mask.e_msg[INVALID_IP]);
		return false;
	}

	return true;
}


function check_pwd(pwd1, pwd2){
	if (get_by_id(pwd1).value != get_by_id(pwd2).value){
		 alert(YM102);
		return false;
	}
	return true;
}

function check_port(port){
    var temp_port = port.split(" ");
    
    if (isNaN(port) || port == "" || temp_port.length > 1 
    		|| (parseInt(port) < 1 || parseInt(port) > 65535)){
		 return false;
	}
	return true;
}

function check_radius(radius){
	if (!check_address(radius.ip)){
		return false;
	}else if (!check_port(radius.port)){
        alert(radius.ip.e_msg[RADIUS_SERVER_PORT_ERROR]);
        return false;
    }else if (radius.secret == ""){
        alert(radius.ip.e_msg[RADIUS_SERVER_SECRET_ERROR]);
        return false;               
	}
	
	return true;
}

function check_ssid(id){
	if (get_by_id(id).value == ""){
	    alert(_badssid);
	    return false;
	}
	return true;        
}

function check_varible(obj){
	var temp_obj = obj.var_value.split(" ");
    
	if (temp_obj == "" || temp_obj.length > 1){
		alert(obj.e_msg[EMPTY_VARIBLE_ERROR]);
		return false;
	}else if (isNaN(obj.var_value)){
		alert(obj.e_msg[INVALID_VARIBLE_ERROR]);
		return false;
	}else if (parseInt(obj.var_value) < obj.min || parseInt(obj.var_value) > obj.max){
		alert(obj.e_msg[VARIBLE_RANGE_ERROR]);
		return false;
	}else if (obj.is_even && (parseInt(obj.var_value) % 2 != 0)){
		alert(obj.e_msg[EVEN_NUMBER_ERROR]);
        return false;
    }
    return true;
}

function check_pf_port(port){
    var temp_port = port.split(" ");
    
    if (isNaN(port) || port == "" || temp_port.length > 1 
    		|| (parseInt(port) <= 0 || parseInt(port) > 65535)){
        return false;
    }
    return true;
}

function change_color(table_name, row){
    var obj = get_by_id(table_name);
    for (var i = 1; i < obj.rows.length; i++){
        if (row == i){
            obj.rows[i].style.backgroundColor = "#FFFF00";
        }else{
            obj.rows[i].style.backgroundColor = "#FFFFFF";
        }
    }       
}

function exit_wizard(){
    if (confirm(_wizquit)){
        window.close();
    }
}

function exit_access(){
    if (confirm(_wizquit)){
        window.location.href = "adv_access_control.htm";
    }
}

function get_by_id(id){
	with(document){
		return getElementById(id);
	}
}

function get_by_name(name){
	with(document){
		return getElementsByName(name);
	}
}

function openwin(url,w,h) {
	var winleft = (screen.width - w) / 2;
	var wintop = (screen.height - h) / 2;
	window.open(url,"popup",'width='+w+',height='+h+',top='+wintop+',left='+winleft+',scrollbars=yes,status=no,location=no,resizable=yes')
}	

function send_submit(which_form,act){
//	if(act) get_by_id(which_form).action = act;
//	get_by_id(which_form).submit();
}

function set_server(is_enable){
	var enable = get_by_id("enable");
	
    if (is_enable == "1"){
        enable[0].checked = true;
    }else{
        enable[1].checked = true;
    }
}

function set_protocol(which_value, obj){
    for (var i = 0; i < 3; i++){    
        if (which_value == obj.options[i].value){
            obj.selectedIndex = i;
            break;
        }
    }
}

function set_schedule(data, index){ 
	var schd = get_by_name("schd");  
	
    if (data[index] == "0"){
        schd[0].checked = true;      
    }else{
        schd[1].checked = true;        
    }
    
    get_by_id("hour1").selectedIndex = data[index+1];
    get_by_id("min1").selectedIndex = data[index+2];
    get_by_id("am1").selectedIndex = data[index+3];
    get_by_id("hour2").selectedIndex = data[index+4];
    get_by_id("min2").selectedIndex = data[index+5];
    get_by_id("am2").selectedIndex = data[index+6];
    get_by_id("day1").selectedIndex = data[index+7];
    get_by_id("day2").selectedIndex = data[index+8];
}

function AddOption (selectbox, otext, ovalue){
	var option_node = document.createElement("OPTION")  
	var option_text = document.createTextNode(otext);
	option_node.appendChild(option_text);
	option_node.setAttribute("value",ovalue);
	selectbox.appendChild(option_node); 
}

function set_selectIndex(which_value, obj){
    for (var pp=0; pp<obj.options.length; pp++){
        if (which_value == obj.options[pp].value){
            obj.selectedIndex = pp;
            break;
        }
    }
}
	
function set_checked(which_value, obj){
	if(obj.length > 1){
		obj[0].checked = true;
		for(var pp=0;pp<obj.length;pp++){
			if(obj[pp].value == which_value){
				obj[pp].checked = true;
			}
		}
	}else{
		obj.checked = false;
		if(obj.value == which_value){
			obj.checked = true;
		}
	}
}

function get_checked_value(obj){
	if(obj.length > 1){
		for(pp=0;pp<obj.length;pp++){
			if(obj[pp].checked){
				return obj[pp].value;
			}
		}
	}else{
		if(obj.checked){
			return obj.value;
		}else{
			return 0;
		}
	}	
}

function set_schedule_option(){
	for (var i = 0; i < 32; i++){
		var k=i;
		if(parseInt(i,10)<10)
            k="0"+i;       
		var temp_sch = get_by_id("schedule_rule_" + k).value;
		var temp_data = temp_sch.split("/");
		
		if (temp_data.length > 1){
			document.write("<option value=" + temp_data[0] + ">" + temp_data[0] + "</option>");
		}
	}
}

function set_inbound_option(obj_value, idx){
	for (var i = 0; i < 24; i++){
		var k=i;
		if(parseInt(i,10)<10){
			k="0"+i;
		}
		var temp_inb = get_by_id("inbound_filter_name_" + k).value;
		var temp_data = temp_inb.split("/");
		
		if (temp_data.length > 1){
			obj_value += "<option value='" + temp_data[0] + "'>" + temp_data[0] + "</option>";
			load_inbound_used(k, temp_data, idx);
		}else{
			break;
		}
	}
	return obj_value;
}

function load_inbound_used(jj, obj_array, idx){
	if(obj_array[2].charAt(idx) == "1"){
		var is_used = "";
		if(idx == 0){
			is_used = "0"+ obj_array[2].substring(1,obj_array[2].length);
		}else if(idx == 1){
			is_used = obj_array[2].charAt(0) + "0"+ obj_array[2].substring(2,obj_array[2].length);
		}else if(idx == 2){
			is_used = obj_array[2].substring(0,2) + "0"+ obj_array[2].charAt(obj_array[2].length-1);
		}else if(idx == 3){
			is_used = obj_array[2].substr(0,obj_array[2].length-1) + "0";
		}
		get_by_id("inbound_filter_name_" + jj).value = obj_array[0] +"/"+ obj_array[1] +"/"+ is_used;
	}
}

function save_inbound_used(chk_value, idx){
	for (var i = 0; i < 24; i++){
		var k=i;
		if(parseInt(i,10)<10){
			k="0"+i;
		}
		var temp_inb = get_by_id("inbound_filter_name_" + k).value;
		var temp_data = temp_inb.split("/");
		
		if (temp_data.length > 1){
			var is_used = temp_data[2];
			if(temp_data[0] == chk_value){
				if(idx == 0){
					is_used = "1"+ temp_data[2].substring(1,temp_data[2].length);
				}else if(idx == 1){
					is_used = temp_data[2].charAt(0) + "1"+ temp_data[2].substring(2,temp_data[2].length);
				}else if(idx == 2){
					is_used = temp_data[2].substring(0,2) + "1"+ temp_data[2].charAt(temp_data[2].length-1);
				}else if(idx == 3){
					is_used = temp_data[2].substr(0,temp_data[2].length-1) + "1";
				}
			}
			get_by_id("inbound_filter_name_" + k).value = temp_data[0] +"/"+ temp_data[1] +"/"+ is_used;
		}else{
			break;
		}
	}
}

function set_dhcp_list(){
	var temp_dhcp_list = get_by_id("dhcp_list").value.split(",");
	
	for (var i = 0; i < temp_dhcp_list.length; i++){	
		var temp_data = temp_dhcp_list[i].split("/");
		if(temp_data.length > 1){		
		document.write("<option value='" + temp_data[1] + "'>" + temp_data[0] + "</option>");	
		}
	}
}

function set_mac_list(parameter){
	var temp_dhcp_list = get_by_id("dhcp_list").value.split(",");
	
	for (var i = 0; i < temp_dhcp_list.length; i++){	
		var temp_data = temp_dhcp_list[i].split("/");
		if(temp_data.length > 1){		
			if(parameter == "mac"){
				document.write("<option value='" + temp_data[2] + "'>" + temp_data[0] + " (" + temp_data[2] + " )" + "</option>");		
			}else if(parameter == "ip"){
				document.write("<option value='" + temp_data[1] + "'>" + temp_data[0] + " (" + temp_data[1] + " )" + "</option>");		
			}else{
				document.write("<option value='" + temp_data[2] + "'>" + temp_data[0] + "</option>");
			}
		}
	}
}

function set_mac(mac){
	var temp_mac = mac.split(":");
	for (var i = 0; i < 6; i++){
		var obj = get_by_id("mac" + (i+1));
		obj.value = temp_mac[i];
	}
}

function show_dns(type){
    if (type){
        get_by_id("dns1").value = "0.0.0.0";
        get_by_id("dns2").value = "0.0.0.0";
    }
}

function show_wizard(name){
	window.open(name,"Wizard","width=450,height=370");
}

function show_window(name){
	window.open(name,"Window","width=500,height=600,scrollbar=yes");
}

function show_schedule_detail(idx){
	var temp_rule, detail;	
	temp_rule = (parseInt(idx,10)<10)? get_by_id("schedule_rule_0" + idx).value : get_by_id("schedule_rule_" + idx).value;

	var rule = temp_rule.split("/");					
	var s = new Array();
	
	for(var j = 0; j < 8; j++){
		if(rule[1].charAt(j) == "1"){
			s[j] = "1";
		}else{
			s[j] = "0";
		}
	}

	var s_day = "", count = 0;
	for(var j = 0; j < 8; j++){			
		if(s[j] == "1"){
			s_day = s_day + " " + Week[j];
			count++;
		}
	}

	if(count == 7){
		s_day = tsc_AllWk;
	}
			
	var temp_time_array = rule[2] + "~" + rule[3];
	if(rule[2] == "00:00" && rule[3] == "24:00"){
		temp_time_array = tsc_AllDay;
	}
	
	detail = s_day + " " + temp_time_array;
	return detail;
}

function get_row_data(obj, index){	
		
    try {
    	return obj.cells[index].childNodes[0].data;
    }catch(e) {
        return ("");
    }
}

function copy_virtual(index){
	var data;
	
	if (get_by_id("application" + index).selectedIndex > 0){
		data = default_virtual[get_by_id("application" + index).selectedIndex - 1];		
		get_by_id("name" + index).value = data.name;
		get_by_id("public_portS" + index).value = data.public_port;
		get_by_id("private_portS" + index).value = data.private_port;
		get_by_id("protocol" + index).value = data.prot;
		set_vs_protocol(index, data.prot, get_by_id("protocol_select" + index));	
	}else{
		alert(GW_NAT_NAME_INVALID);
	}		
}

function copy_portforward(index){
	var data;
	
	if (get_by_id("application" + index).selectedIndex > 0){
		data = default_rule[get_by_id("application" + index).selectedIndex - 1];		
		get_by_id("name" + index).value = data.name;
		get_by_id("tcp_ports" + index).value = data.public_port;
		//get_by_id("public_portE" + index).value = data.public_port;
		get_by_id("udp_ports" + index).value = data.private_port;
		//get_by_id("private_portE" + index).value = data.private_port;
		//set_protocol(data.prot, get_by_id("protocol" + index));	
	}else{
		alert(GW_NAT_NAME_INVALID);
	}		
}

function copy_special_appl(index){
	var name = get_by_id("name" + index);
	var trigger_port = get_by_id("trigger_port" + index);
	var trigger_type = get_by_id("trigger" + index);
	var public_port = get_by_id("public_port" + index);
	var public_type = get_by_id("public" + index);
	var application = get_by_id("application" + index);		
	var data;
	
	if (application.selectedIndex > 0){
		data = default_appl[application.selectedIndex - 1];
		name.value = data.name;		
		trigger_port.value = data.trigger_port;			
		public_port.value = data.public_port;				
		set_protocol(data.trigger_prot, trigger_type);   
		set_protocol(data.public_prot, public_type);    		
	}else{
		alert(GW_NAT_NAME_INVALID);
	}
	
}

function copy_ip(index){

	if (get_by_id("ip_list" + index).selectedIndex > 0){
		get_by_id("ip" + index).value = get_by_id("ip_list" + index).options[get_by_id("ip_list" + index).selectedIndex].value;
	}else{
		alert(TEXT044);
	}
}

function get_random_char(){
	var number_list = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	var number = Math.round(Math.random()*62);
	
	return(number_list.substring(number, number + 1));
}

function generate_psk(key){
	var i = key.length;
	
	if (key.length < 8){
		for (; i < 8; i++){
			key += get_random_char();
		}
	}

	return key;
}

function create_wep_key128(passpharse, pharse_len){
    var pseed2 = "";
   	var md5_str = "";
   	var count;
   	
   	
    for(var i = 0; i < 64; i++){
        count = i % pharse_len;
        pseed2 += passpharse.substring(count, count+1);
    }
    
    md5_str = calcMD5(pseed2);   
    
    return md5_str.substring(0, 26).toUpperCase(); 
}
function check_ascii_key_fun(data){	

	if (!(data >= 'A' && data <= 'Z') && !(data >= '0' && data <= '9') && !(data >= 'a' && data <= 'z')){	
		return false;
	}	
	return true;
}

function check_name_key_fun(data){
	if (!(data >= 'A' && data <= 'Z') && !(data >= '0' && data <= '9') && !(data >= 'a' && data <= 'z') && !(data == "-") && !(data == "_")){
		return false;
	}	
	return true;
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

function check_name_word_fun(obj,word){
	for(var k=0;k<obj.length;k++){
		if (!check_name_key_fun(obj.substring(k, k+1))){
			alert(word+" invalid. the legal characters are 0~9, A~Z, or a~z,-,_.");
			return false;
		}
	}
	return true;
}

function Find_word(strOrg,strFind){
	var index = 0;
	index = strOrg.indexOf(strFind,index);
	if (index > -1){
		return true;
	}
	return false;
}

function ReplaceRecover(ascii_string)
{
	var tans_lt = ReplaceAll(ascii_string,'&lt;','<');
	var tans_gt  = ReplaceAll(tans_lt,'&gt;','>');
	var tans_sp  = ReplaceAll(tans_gt,'&nbsp;',' ');
	var tans_mp = ReplaceAll(tans_sp,'&amp;','&');
	var tans_ot = ReplaceAll(tans_mp,'&quot;','"');
	return tans_ot;
}

function a_to_hex(inValue) {
	var outValue = "";
	if (inValue) {
		for (i = 0; i < inValue.length; i++) {
			if(inValue.charCodeAt(i).toString(16) < 10)
				outValue += 0;
			if(inValue.charCodeAt(i).toString(16) > 'a' && inValue.charCodeAt(i).toString(16) <= 'f')
				if(inValue.charCodeAt(i).toString(16).length == 1)
					outValue += 0;
			outValue += inValue.charCodeAt(i).toString(16);
		}
	}
	return outValue;
}

function hex_to_a(inValue){
	outValue = "";
	var k = '';
	var tmp_inValue = ((inValue.length%2) == 0)? inValue.toUpperCase(): "0" + inValue.toUpperCase();
	for (i = 0; i < tmp_inValue.length; i+=2) {
		/*inValue could not transfer to visable ascii*/
		if(tmp_inValue.substr(i, 2)<"20"||tmp_inValue.substr(i, 2)>"7E"){
			return inValue;
		}
			k += "%";
		k += inValue.substr(i, 2);
	}
	outValue = unescape(k);
	return outValue;
}

/* create xml request form */
function createRequest(){
	var XMLhttpObject = null;
	try{
		XMLhttpObject = new XMLHttpRequest();
	}catch(e){
		try{
			XMLhttpObject = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLhttpObject = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){
				return null;
			}
		}
	}
	return XMLhttpObject;
}

function change_word(inValue,strFind,strAdd){
	var outValue = "";
	for(var i=0;i<inValue.length;i++){
		if(inValue.substr(i,1) == strFind)
			outValue = outValue + strAdd;
		outValue += inValue.substr(i,1);
	}
	return outValue;
}

function ReplaceAll(strOrg,strFind,strReplace){
	var index = 0;
	while(strOrg.indexOf(strFind,index) != -1){
			strOrg = strOrg.replace(strFind,strReplace);
			index = strOrg.indexOf(strFind,index);
	}
	return strOrg
}

function addstr(input_msg)
{
	var last_msg = "";
	var str_location;
	var temp_str_1 = "";
	var temp_str_2 = "";
	var str_num = 0;
	temp_str_1 = addstr.arguments[0];
	while(1)
	{
		str_location = temp_str_1.indexOf("%s");
		if(str_location >= 0)
		{
			str_num++;
			temp_str_2 = temp_str_1.substring(0,str_location);
			last_msg += temp_str_2 + addstr.arguments[str_num];
			temp_str_1 = temp_str_1.substring(str_location+2,temp_str_1.length);
			continue;
		}
		if(str_location < 0)
		{
			last_msg += temp_str_1;
			break;
		}
	}
	return last_msg;
}

function replace_msg(obj_S){
	obj_D = new Array();
	for (i=0;i<obj_S.length;i++){
		obj_D[i] = addstr(obj_S[i], replace_msg.arguments[1]);
		obj_D[i] = obj_D[i].replace("%1n", replace_msg.arguments[2]);
		obj_D[i] = obj_D[i].replace("%2n", replace_msg.arguments[3]);
	}
	return obj_D;
}
function ip_num(IP_array){
	var total1 = 0;
	if(IP_array.length > 1){
   		total1 += parseInt(IP_array[3],10);
	    total1 += parseInt(IP_array[2],10)*256;
	    total1 += parseInt(IP_array[1],10)*256*256;
	    total1 += parseInt(IP_array[0],10)*256*256*256;
	}
	return total1;
}

function check_LAN_ip(LAN_IP, CHK_IP, obj_name){
	if(ip_num(LAN_IP) == ip_num(CHK_IP)){
		alert(addstr(LW1, obj_name));
		return false;
	}
	return true;
}

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

function open_more(rule_num, num, is_hidden, obj){
	var open_word = "none";
	get_by_id("show_more_word").style.display = "";
	get_by_id("show_less_word").style.display = "none";
	if(is_hidden){
		get_by_id("show_more_word").style.display = "none";
		get_by_id("show_less_word").style.display = "";
		open_word = "";
	}
	var start_num = parseInt(rule_num-1,10);
	for(j=start_num;j>=num;j--){
		get_by_id(obj+j).style.display = open_word;
	}
}

/*Date Used, copy by Netgear*/
function getDaysInMonth(mon,year)
{
	var days;
	if (mon==1 || mon==3 || mon==5 || mon==7 || mon==8 || mon==10 || mon==12) days=31;
	else if (mon==4 || mon==6 || mon==9 || mon==11) days=30;
	else if (mon==2)
	{
		if (isLeapYear(year)) { days=29; }
		else { days=28; }
	}
	return (days);
}

function isLeapYear (Year)
{
	if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
		return (true);
	} else { return (false); }
}

function key_word(newobj,obj){
	get_by_id(obj).value = newobj.value;
}

/*
 * is_form_modified
 *	Check if a form's current values differ from saved values in custom attribute.
 *	Function skips elements with attribute: 'modified'= 'ignore'. 
 */
function is_form_modified(form_id)
{
	var df = document.forms[form_id];
	if (!df) {
		return false;
	}
	if (df.getAttribute('modified') == "true") {
		return true;
	}
	if (df.getAttribute('saved') != "true") {
		return false;
	}
	for (var i = 0, k = df.elements.length; i < k; i++) {
		var obj = df.elements[i];
		if (obj.getAttribute('modified') == 'ignore') {
			continue;
		}
		var name = obj.tagName.toLowerCase();
		if (name == 'input') {
			var type = obj.type.toLowerCase();
			if (((type == 'text') || (type == 'textarea') || (type == 'password') || (type == 'hidden')) &&
					!are_values_equal(obj.getAttribute('default'), obj.value)) {
				return true;
			} else if (((type == 'checkbox') || (type == 'radio')) && !are_values_equal(obj.getAttribute('default'), obj.checked)) {
				return true;
			}
		} else if (name == 'select') {
			var opt = obj.options;
			for (var j = 0; j < opt.length; j++) {
				if (!are_values_equal(opt[j].getAttribute('default'), opt[j].selected)) {
					return true;
				}
			}
		}
	}
	return false;
}

/*
 * set_form_default_values
 *	Save a form's current values to a custom attribute.
 */
function set_form_default_values(form_id)
{
	var df = document.forms[form_id];
	if (!df) {
		return;
	}
	for (var i = 0, k = df.elements.length; i < k; i++) {
		var obj = df.elements[i];
		if (obj.getAttribute('modified') == 'ignore') {
			continue;
		}
		var name = obj.tagName.toLowerCase();
		if (name == 'input') {
			var type = obj.type.toLowerCase();
			if ((type == 'text') || (type == 'textarea') || (type == 'password') || (type == 'hidden')) {
				obj.setAttribute('default', obj.value);
				/* Workaround for FF error when calling focus() from an input text element. */
				if (type == 'text') {
					obj.setAttribute('autocomplete', 'off');
				}
			} else if ((type == 'checkbox') || (type == 'radio')) {
				obj.setAttribute('default', obj.checked);
			}
		} else if (name == 'select') {
			var opt = obj.options;
			for (var j = 0; j < opt.length; j++) {
				opt[j].setAttribute('default', opt[j].selected);
			}
		}
	}
	df.setAttribute('saved', "true");
}

function is_disable_all_items(op){
	var input_objs = document.getElementsByTagName("input");
	var select_objs = document.getElementsByTagName("select");

	if (input_objs != null){
		for (var i = 0; i < input_objs.length; i++){
			input_objs[i].disabled = op;
		}
	}

	if (select_objs != null){
		for (var i = 0; i < select_objs.length; i++){
			select_objs[i].disabled = op;
		}
	}
}

/*
 * are_values_equal()
 *	Compare values of types boolean, string and number. The types may be different.
 *	Returns true if values are equal.
 */
function are_values_equal(val1, val2)
{
	/* Make sure we can handle these values. */
	switch (typeof(val1)) {
	case 'boolean':
	case 'string':
	case 'number':
		break;
	default:
		// alert("are_values_equal does not handle the type '" + typeof(val1) + "' of val1 '" + val1 + "'.");
		return false;
	}

	switch (typeof(val2)) {
	case 'boolean':
		switch (typeof(val1)) {
		case 'boolean':
			return (val1 == val2);
		case 'string':
			if (val2) {
				return (val1 == "1" || val1.toLowerCase() == "true" || val1.toLowerCase() == "on");
			} else {
				return (val1 == "0" || val1.toLowerCase() == "false" || val1.toLowerCase() == "off");
			}
			break;
		case 'number':
			return (val1 == val2 * 1);
		}
		break;
	case 'string':
		switch (typeof(val1)) {
		case 'boolean':
			if (val1) {
				return (val2 == "1" || val2.toLowerCase() == "true" || val2.toLowerCase() == "on");
			} else {
				return (val2 == "0" || val2.toLowerCase() == "false" || val2.toLowerCase() == "off");
			}
			break;
		case 'string':
			if (val2 == "1" || val2.toLowerCase() == "true" || val2.toLowerCase() == "on") {
				return (val1 == "1" || val1.toLowerCase() == "true" || val1.toLowerCase() == "on");
			}
			if (val2 == "0" || val2.toLowerCase() == "false" || val2.toLowerCase() == "off") {
				return (val1 == "0" || val1.toLowerCase() == "false" || val1.toLowerCase() == "off");
			}
			return (val2 == val1);
		case 'number':
			if (val2 == "1" || val2.toLowerCase() == "true" || val2.toLowerCase() == "on") {
				return (val1 == 1);
			}
			if (val2 == "0" || val2.toLowerCase() == "false" || val2.toLowerCase() == "off") {
				return (val1 === 0);
			}
			return (val2 == val1 + "");
		}
		break;
	case 'number':
		switch (typeof(val1)) {
		case 'boolean':
			return (val1 * 1 == val2);
		case 'string':
			if (val1 == "1" || val1.toLowerCase() == "true" || val1.toLowerCase() == "on") {
				return (val2 == 1);
			}
			if (val1 == "0" || val1.toLowerCase() == "false" || val1.toLowerCase() == "off") {
				return (val2 === 0);
			}
			return (val1 == val2 + "");
		case 'number':
			return (val2 == val1);
		}
		break;
	default:
		return false;
	}
}

function jump_if(){
	return true;
}
function jump_3g_if(){
	get_by_id("asp_temp_72").value = get_by_id("usb_type").value
	send_submit('wwan_form');
	for (var i = 0; i < document.forms.length; i++) {
		if (is_form_modified(document.forms[i].id)) {
			if (!confirm(up_jt_1+"\n"+up_jt_2+"\n"+up_jt_3)){
				return false;
			}
		}
	}
	return true;
}

/*
 * Cancel and reset changes to the page.
 */
function page_cancel(form_name, redirect_url){
	if (is_form_modified(form_name) && confirm (up_fm_dc_1)) {
		window.location.href=redirect_url;
	}
}

function page_reboot(){
	jump_if();
	window.location.href='reboot.htm'
}

/*
 * trim_string
 *	Remove leading and trailing blank spaces from a string.
 */
function trim_string(str)
{
	var trim = str + "";
	trim = trim.replace(/^\s*/, "");
	return trim.replace(/\s*$/, "");
}

/*
 * is_mac_valid()
 *	Check if a MAC address is in a valid form.
 *	Allow 00:00:00:00:00:00 and FF:FF:FF:FF:FF:FF if optional argument is_full_range is true.
 */
function is_mac_valid(mac, is_full_range)
{
	var macstr = mac + "";
	var got = macstr.match(/^[0-9a-fA-F]{2}[:-]?[0-9a-fA-F]{2}[:-]?[0-9a-fA-F]{2}[:-]?[0-9a-fA-F]{2}[:-]?[0-9a-fA-F]{2}[:-]?[0-9a-fA-F]{2}$/);
	if (!got) {
		return false;
	}
	macstr = macstr.replace (/[:-]/g, '');
	if (!is_full_range && (macstr.match(/^0{12}$/) || macstr.match(/^[fF]{12}$/))) {
		return false;
	}

	return true;
}

/*
 * is_ipv4_valid
 *	Check is an IP address dotted string is valid.
 */
function is_ipv4_valid(ipaddr)
{
	var ip = ipv4_to_bytearray(ipaddr);
	if (ip === 0) {
		return false;
	}
	return true;
}

/*
 * ipv4_to_bytearray
 *	Convert an IPv4 address dotted string to a byte array
 */
function ipv4_to_bytearray(ipaddr)
{
	var ip = ipaddr + "";
	var got = ip.match (/^\s*(\d{1,3})\s*[.]\s*(\d{1,3})\s*[.]\s*(\d{1,3})\s*[.]\s*(\d{1,3})\s*$/);
	if (!got) {
		return 0;
	}
	var a = [];
	var q = 0;
	for (var i = 1; i <= 4; i++) {
		q = parseInt(got[i],10);
		if (q < 0 || q > 255) {
			return 0;
		}
		a[i-1] = q;
	}
	return a;
}
 
function check_ipv4_symbol(strOrg,strFind){
	/* Search ipv4_address has "." symbol */	
	/*if false return 0, otherwises return 1 */
	var index = 0;
		index = strOrg.indexOf(strFind,index);
	
	if(index == -1)
			return 0;
	else
			return 1;				
					}		
							
			
 
function transValue(data)
{
	var value =0;
	data = data.toUpperCase();
	
	if(data == "0")
		value =0;
	else if(data =="1")
		value = 1;
	else if(data =="2")
		value = 2;
	else if(data =="3")
		value = 3;
	else if(data =="4")
		value = 4;	
	else if(data =="5")
		value = 5;
	else if(data =="6")
		value = 6;
	else if(data =="7")
		value = 7;
	else if(data =="8")
		value = 8;
	else if(data =="9")
		value = 9;
	else if(data =="A")
		value = 10;
	else if(data =="B")
		value = 11;
	else if(data =="C")
		value = 12;
	else if(data =="D")
		value = 13;
	else if(data =="E")
		value = 14;
	else if(data =="F")
		value = 15;				
	else
		value = 0;
	return value ;				
} 
 
function check_symbol(strOrg,strFind){
	var index = 0;
	index = strOrg.indexOf(strFind,index);
	return index;
}

function find_colon(strOrg,strFind)
{
        var index=0;
        var colon=0;
        index = strOrg.indexOf(strFind,index);
        while(index != -1)
        {
                colon++;
                index++;
                index = strOrg.indexOf(strFind,index);
        }
        return colon;                
}
 
function count_colon_pos(strOrg,strFind,count)
{
        var index =0;
        var i=0;
        
        for(i=0;i<count;i++){
                index = strOrg.indexOf(strFind,index);
                index++;        
        }
        return index;                
}

function count_last_colon_pos(strOrg,strFind)
{
				var index =0;
				var pos=0;
        
        while(1){
                index = strOrg.indexOf(strFind,index);
                if(index == -1)
                		break;
                pos = index;		
                index++;		        
        }
        return pos;     	
}
function compare_suffix(start_suffix,end_suffix)
{
	var start_suffix_length = start_suffix.length;
	var end_suffix_length = end_suffix.length;
	
	var start_suffix_value =0;
	var end_suffix_value=0;
	
	//calculate the start_suffix
	if(start_suffix_length == 1){
		start_suffix_value = transValue(start_suffix.charAt(0)) * 1;
	}else if(start_suffix_length == 2){
		start_suffix_value = transValue(start_suffix.charAt(0)) * 16;
		start_suffix_value += transValue(start_suffix.charAt(1)) * 1;
	}else if(start_suffix_length == 3){
		start_suffix_value = transValue(start_suffix.charAt(0)) * 256;
		start_suffix_value += transValue(start_suffix.charAt(1)) * 16;
		start_suffix_value += transValue(start_suffix.charAt(2)) * 1;
	}else if(start_suffix_length == 4){
		start_suffix_value = transValue(start_suffix.charAt(0)) * 4096;
		start_suffix_value += transValue(start_suffix.charAt(1)) * 256;
		start_suffix_value += transValue(start_suffix.charAt(2)) * 16;
		start_suffix_value += transValue(start_suffix.charAt(3)) * 1;
	}
	
	//calculate the end_suffix
	if(end_suffix_length == 1){
		end_suffix_value = transValue(end_suffix.charAt(0)) * 1;
	}else if(end_suffix_length == 2){
		end_suffix_value = transValue(end_suffix.charAt(0)) * 16;
		end_suffix_value += transValue(end_suffix.charAt(1)) * 1;
	}else if(end_suffix_length == 3){
		end_suffix_value = transValue(end_suffix.charAt(0)) * 256;
		end_suffix_value += transValue(end_suffix.charAt(1)) * 16;
		end_suffix_value += transValue(end_suffix.charAt(2)) * 1;
	}else if(end_suffix_length == 4){
		end_suffix_value = transValue(end_suffix.charAt(0)) * 4096;
		end_suffix_value += transValue(end_suffix.charAt(1)) * 256;
		end_suffix_value += transValue(end_suffix.charAt(2)) * 16;
		end_suffix_value += transValue(end_suffix.charAt(3)) * 1;
	}
		
	if(start_suffix_value >= end_suffix_value){
		alert(MSG040);
		return false;	
	}
	return true;
}

function get_current_pagename(){
	var pathname = window.location.pathname;
	var filename = pathname.substr(pathname.lastIndexOf("/")+1,pathname.length);
	return filename;		
}		


function show_words(wd){	
	with(document){
		return write(wd);
	}
}	       

/*The first argument is the sentence, and the other arguments are used to 
  replace word in the sentence with %[s,S,m,u,v,d,04X,04x,lu,02d]	*/

function lingual_replace(){	
	if(arguments.length<=0) return;

	var word = arguments[0];
	if(arguments.length > 1) {
		for(i=1;i<arguments.length;i++)
			word = word.replace(/%([s,S,m,u,v,d]|04X|04x|02d|lu)/,arguments[i]);				
	}
	return word;
}

function disable_items_by_username(username){
	if(username=="user")
		is_disable_all_items(true);
}

function lingual_html_response_message(oriStr){
    var rtnStr="";
    if(oriStr == null || oriStr.length<1)   return rtnStr;

    if(oriStr.match("Success, system rebooting."))
        rtnStr=_success + " ("+YM3+")";
    else if(oriStr.match("Fail, system rebooting."))
        rtnStr=fl_Failure + " ("+YM3+")";
    else if(oriStr.match("Fail, firmware size error."))
        rtnStr=GW_UPGRADE_FAILED;
    else if(oriStr.match("Success, uploading finished."))
        rtnStr=rs_intro_4;
    else if(oriStr.match("Fail, configuration file error."))
        rtnStr=rs_intro_2;
    else if(oriStr.match("The setting is saved."))
        rtnStr=sc_intro_sv;
    else if(oriStr.match("Invalid password, please try again."))
        rtnStr=li_alert_3;
	else if(oriStr.match("Not Estimated"))
		rtnStr=at_NEst;
	else if(oriStr.match("Network is unreachable"))
		rtnStr=fl_Failure;
	else if(oriStr.match("Unknown Host"))
		rtnStr=GW_LAN_DOMAIN_NAME_INVALID;
	else if(oriStr.match("Success"))
		rtnStr=_success;
	else if(oriStr.match("Fail"))
		rtnStr=fl_Failure;
    else
        rtnStr=oriStr;

    return rtnStr;
}
function port_conflict(src_port, dst_port){
	var  src_port_ary = src_port.split(",");
	var  dst_port_ary = dst_port.split(",");
		
	for(i=0; i < src_port_ary.length; i++){
		var src_port_range = src_port_ary[i].split("-");

		for(k=0;k<src_port_range.length;k++){
			if(!check_integer(src_port_range[k],0,65535)){
				alert(src_port +" is invalid.");
				return false;
			}
		}

		if(src_port_range.length>2){
			alert(src_port +" is invalid.");
			return false;
		}else if(src_port_range.length==2){
			var src_port_start =( parseInt(src_port_range [0],10)< parseInt(src_port_range [1],10))? parseInt(src_port_range [0],10):parseInt(src_port_range [1],10);
			var src_port_end =( parseInt(src_port_range [0],10)< parseInt(src_port_range [1],10))? parseInt(src_port_range [1],10):parseInt(src_port_range [0],10);
		}else{
			var src_port_start=parseInt(src_port_range,10), src_port_end=parseInt(src_port_range,10);
		}
		
		for(j=0;j<dst_port_ary.length;j++){
			var dst_port_range = dst_port_ary[j].split("-");  			
			var dst_port_start=parseInt(dst_port_range,10), dst_port_end=parseInt(dst_port_range,10);
			if(dst_port==0) continue;
			
			if(dst_port_range.length>1){
			 dst_port_start =( parseInt(dst_port_range[0],10)< parseInt(dst_port_range[1],10))? parseInt(dst_port_range[0],10):parseInt(dst_port_range[1],10);
			 dst_port_end =( parseInt(dst_port_range[0],10) < parseInt(dst_port_range[1],10))? parseInt(dst_port_range[1],10):parseInt(dst_port_range[0],10);
			} 			
			if(!(dst_port_start > src_port_end || dst_port_end < src_port_start)){
/*	Debug Msg
				alert("port_conflict: "+src_port_ary[i] +" conflict with "+ dst_port_ary[j]);
*/
				return false;
			}
		}		
	} 
	return true;
}

function greyDNSwithOPENDNS(value, dns1, dns2){
	if(parseInt(value,10)==1){
		dns1.disabled = true;
		dns2.disabled = true;
	}else{
		dns1.disabled = false;
		dns2.disabled = false;
	}
}
function emulator(){
	alert("This feature has been disabled on this emulator.");
}
function dont_save(){
	history.go(0);
}
function wan_page(val){
    if(val=="ipv6_static"){
		window.location.href='adv_ipv6_static.htm';
	}
	if(val=="ipv6_dhcp"){
		window.location.href='adv_ipv6_dhcp.htm';
	}
	if(val=="ipv6_pppoe"){
		window.location.href='adv_ipv6_pppoe.htm';
	}
	if(val=="ipv6_6in4"){
		window.location.href='adv_ipv6_6in4.htm';
	}
	if(val=="ipv6_6to4"){
		window.location.href='adv_ipv6_6to4.htm';
	}
	if(val=="ipv6_stateless"){
		window.location.href='adv_ipv6_stateless.htm';
	}
	if(val=="link_local"){
		window.location.href='adv_link_local.htm';
	}
}