<<<<<<< HEAD
	/* function: load config file */
	var loadXml = function()
	{
		try 
  		{
   			if ($.w.ActiveXObject)
 			{
				$.userxmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				$.defaultDoc = new ActiveXObject("Microsoft.XMLDOM");  					
				$.userxmlDoc.async = false;
				$.defaultDoc.async = false;
  				$.userxmlDoc.load("./config/setconf.xml");
				$.defaultDoc.load("./config/setreduced_data_model.xml");
			}
			else
			{
				var oXmlHttp1 = new XMLHttpRequest();
				var oXmlHttp2 = new XMLHttpRequest();
				var url1 = "./config/setconf.xml";
				var url2 = "./config/setreduced_data_model.xml";
				oXmlHttp1.open("GET", url1, false);
				oXmlHttp2.open("GET", url2, false);
				oXmlHttp1.send(null);
				oXmlHttp2.send(null);
				$.userxmlDoc = oXmlHttp1.responseXML;
				$.defaultDoc = oXmlHttp2.responseXML;
			}
  		}
		catch(e)
		{
 			alert("Load file Fail");
  		}
	}
	
	/* function: fix object stack. Such as ACT_GL operation, get stack from local is null, we should to modify this stack */
	var gl_fixinstance = function(oid, stack)
	{
		var depth = 0;
		var index = [];
		var firstname = null;
		var firstindex;
		var savestack = stack;
		var path = oid_str[oid].split('.');
		for (var i = 0; i < path.length; i++)
		{
			if (path[i] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = path[i-1];
					firstindex = i;	
				}
			}
		}
		if (depth == 0 || firstname == null)
		{
			/* Error */
			return null;
		}
		var myarray = [];
		var number = 0;
		var savenum = 0;
		var len = 0;
		var mystack;
		if (depth)
		{	
			var stack1 = stack.split(',');
			if (stack1.length != 6)
			{
				/* Error */
				return null;
			}
		}
		
		if (depth)
		{
			for (var i = 0; i < depth; i++)
			{
				index[i] = parseInt(stack1[i], 10);
			}
		}	
		var tmp;
		var tmpnode;
		var parentnode;
		var child = [];
		var tmpas = [];
		var tmpds = [];
		tmp = $.userxmlDoc.documentElement.getElementsByTagName(path[0])[0];
		$.ff = 0;
		if (tmp == null)
		{
			tmp = $.defaultDoc.documentElement.getElementsByTagName(path[0])[0];
			$.ff = 1;
			if (tmp == null)
			{
				$.ff = 2;
				return null;
			}
		}
		var sss = stack.split(',');
		var instance = {}; 

		var index1 = 1;
		var tmptarget;
		while (path[index1] != "{i}")
		{
			var tmpchild = tmp.childNodes;
			for (var h = 0; h < tmpchild.length; h++)
			{
				if (tmpchild[h].nodeName == path[index1])
				{
					tmp = tmpchild[h];
					index1++;
					break;
				}
			}

			if (h == tmpchild.length)
			{
				break;
			}			
		}
		
		if (index[len] == 0)
		{	
			var nextflag = 0;
			while (1)
			{
				var oldtmp = tmp;
				if (oldtmp.getAttribute("instance") != null)
				{
					instance = {};
					sss[len] = oldtmp.getAttribute("instance");
					instance.__stack = sss.join(",");
					instance.__node = oldtmp;
					tmpds.push(instance);
				}
				else
				{
					break;
				}
				while (oldtmp.nextSibling.nodeType != 1)
				{
					oldtmp = oldtmp.nextSibling;
					if (oldtmp.nextSibling == null)
					{
						nextflag = 1;
						break;
					}
				}
				if (nextflag)
				{
					break;
				}
				if (oldtmp.nextSibling.nodeName == tmp.nodeName)
				{
					tmp = oldtmp.nextSibling;
				}
				else
				{
					break;
				}
			}
			len++;
		}
		else
		{
			instance = {};
			var count = index[len] - 1;
			if (count == 0)
			{
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
			else
			{
				while (count)
				{
					var oldtmp = tmp;
					while (oldtmp.nextSibling.nodeType != 1)
					{
						oldtmp = oldtmp.nextSibling;
					}
					tmp = oldtmp.nextSibling;
					if (tmp.nodeName == oldtmp.nodeName)
					{
						count--;
					}
				}
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
		}
		var obj;
		
		for (var i  = firstindex + 1; i < path.length - 1; i++)
		{	
			if (path[i] == "{i}")
			{	
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					parentnode = tmpnode.parentNode;
					child = parentnode.childNodes;
					if (index[len] == 0)
					{
						for (var y = 0; y < child.length; y++)
						{
							sss = obj.__stack.split(',');
							if (child[y].nodeName.toLowerCase() == tmpnode.nodeName.toLowerCase())
							{
								if (child[y].getAttribute("instance") != null)
								{
									var newobj = {};
									sss[len] = child[y].getAttribute("instance");
									newobj.__stack = sss.join(",");
									newobj.__node = child[y];
									tmpas.push(newobj);
								}
							}
						}
					}
					else
					{
						for (var z = 0; z < child.length; z++)
						{		
							if (child[z].nodeName.toLowerCase() == obj.__node.nodeName.toLowerCase())
							{
								if (parseInt(child[z].getAttribute("instance"), 10) == index[len])
								{
									obj.__node = child[z];
									tmpas.push(obj);
								}
							}
						}
							
					}
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
				len++;
			}
			else
			{
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					child = tmpnode.childNodes;
					var findindex = 0;
					for (var j = 0 ; j < child.length; j++)
					{
						if (child[j].nodeName.toLowerCase() == path[i].toLowerCase())
						{
							instance = {};
							instance.__node = child[j];
							instance.__stack = obj.__stack;
							tmpas.push(instance);
							break;
						}
					}	
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
			}
		}
		return tmpds;
	}
	
	/* function: fix object stack. Such as ACT_GS operation, we should to modify this stack */
	var gs_fixinstance = function(oid, stack)
	{
		var depth = 0;
		var firstname = null;
		var firstindex = 0;
		var index = [];
		var savestack = stack;
		var path = oid_str[oid].split('.');
		for (var i = 0; i < path.length; i++)
		{
			if (path[i] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = path[i-1];
					firstindex = i;
				}
			}
		}
		if (depth == 0 || firstname == null)
		{
			return null;
		}
		var myarray = [];
		var number = 0;
		var savenum = 0;
		var len = 0;
		var mystack;
		if (depth)
		{	
			var stack1 = stack.split(',');
			if (stack1.length != 6)
			{
				return null;
			}
		}
		
		if (depth)
		{
			for (var i = 0; i < depth; i++)
			{
				index[i] = parseInt(stack1[i], 10);
			}
		}
			
		var tmp;
		var tmpnode;
		var parentnode;
		var child = [];
		var tmpas = [];
		var tmpds = [];

		tmp = $.userxmlDoc.documentElement.getElementsByTagName(path[0])[0];
		$.ff = 0;
		if (tmp == null)
		{
			tmp = $.defaultDoc.documentElement.getElementsByTagName(path[0])[0];
			$.ff = 1;
			if (tmp == null)
			{
				$.ff = 2;
				return null;
			}
		}

		var index1 = 1;
		var tmptarget;
		while (path[index1] != "{i}")
		{
			var tmpchild = tmp.childNodes;
			for (var h = 0; h < tmpchild.length; h++)
			{
				if (tmpchild[h].nodeName == path[index1])
				{
					tmp = tmpchild[h];
					index1++;
					break;
				}
			}
		}
		var sss = stack.split(',');
		var instance = {};
		
		
		if (index[0] == 0)
		{

			//alert("ACT_GS pstack ERROR");
		}
		else
		{
			instance = {};
			var count = index[len] - 1;
            var instanceVal = index[len];
			if(instanceVal === parseInt(tmp.getAttribute("instance"),10))
			{
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
			else
			{
				var oldtmp;
				oldtmp = tmp;
				while (count)
				{
					while (oldtmp.nextSibling.nodeType != 1)
					{
						oldtmp = oldtmp.nextSibling;
					}
					oldtmp = oldtmp.nextSibling;
                    if(instanceVal === parseInt(oldtmp.getAttribute("instance"),10))
                    {
					   tmp = oldtmp;
                       break;
                    }
					count--;
				}
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
		}
		
		var obj;
		for (var i  = firstindex + 1; i < path.length - 1; i++)
		{	
			if (path[i] == "{i}")
			{	
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					parentnode = tmpnode.parentNode;
					child = parentnode.childNodes;
					if (index[len] == 0)
					{
						for (var y = 0; y < child.length; y++)
						{
							sss = obj.__stack.split(',');
							if (child[y].nodeName.toLowerCase() == tmpnode.nodeName.toLowerCase())
							{
								if (child[y].getAttribute("instance") != null)
								{
									var newobj = {};
									sss[len] = child[y].getAttribute("instance");
									newobj.__stack = sss.join(",");
									newobj.__node = child[y];
									tmpas.push(newobj);
								}
							}
						}
					}
					else
					{
						for (var z = 0; z < child.length; z++)
						{		
							if (child[z].nodeName.toLowerCase() == obj.__node.nodeName.toLowerCase())
							{
								if (parseInt(child[z].getAttribute("instance"), 10) == index[len])
								{
									obj.__node = child[z];
									tmpas.push(obj);
								}
							}
						}
							
					}
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
				len++;
			}
			else
			{
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					child = tmpnode.childNodes;
					var findindex = 0;
					for (var j = 0 ; j < child.length; j++)
					{
						if (child[j].nodeName.toLowerCase() == path[i].toLowerCase())
						{
							instance = {};
							instance.__node = child[j];
							instance.__stack = obj.__stack;
							tmpas.push(instance);
							break;
						}
					}				
				}
				
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
			}
		}
		return tmpds;
	}	
	
	/* function: check up object's attribute name. The attribute name in config files is unlike in web page. */
	var check_name = function(name)
	{
		var lowerflag1;
		var lowerflag2;
		if (/^[a-z]+$/.test(name.charAt(0)))
		{
			lowerflag1 = 1;
		}
		else if (/^[A-Z]+$/.test(name.charAt(0)))
		{
			lowerflag1 = 2;
		}
		else
		{
			lowerflag1 = 0;
		}
		if (/^[a-z]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 1;
		}
		else if (/^[A-Z]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 2;
		}
		else if (/^[0-9]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 3;
		}
		else
		{
			lowerflag2 = 0;
		}
		
		if (lowerflag1 == 1 && lowerflag2 == 1)
		{
			return 2;
		}
		else if (lowerflag1 == 2 && lowerflag2 == 1) 
		{
			return 3;
		}
		else if (lowerflag1 == 2 && lowerflag2 == 3)
		{
			return 4;
		}
		else if (lowerflag1 != 1 && lowerflag2 != 1 )
		{
			return false;
		}
	}
	
	/* function: get object stack */
	var getstack = function(stack)
	{
		while(1)
		{
			var z = stack.indexOf("#");
			stack = stack.substr(z+1);
			z = stack.indexOf("#");
			if (z == -1)
			{
				stack2 = stack;
			}
			else
			{
				stack2 = stack.substr(0, z);
			}
			var stack1 = stack2.split(',');
			if (stack1.length == 6)
			{
				break;
			}
						
		}
			
		return stack2;
	}
	
	/* function: get object pstack */
	var getpstack = function(stack)
	{
		var count = 0;
		while(1)
		{
			var z = stack.indexOf("#");
			stack = stack.substr(z+1);
			z = stack.indexOf("#");
			if (z == -1)
			{
				stack2 = stack;
			}
			else
			{
				stack2 = stack.substr(0, z);
			}
			var stack1 = stack2.split(',');
			if (stack1.length == 6)
			{
				count++;
				if (count == 2)
				{
					break;
				}
			}
						
		}
			
		return stack2;
	}
	
	/* function: get all attributes. Such as ACT_GL operation, attrs parameter is null. */
	var gl_getattr = function(ds)
	{
		var obj = {};
		var tmpobj;
		var tmpas = [];
		while (tmpobj = ds.shift())
		{
			obj = tmpobj;
			var child = obj.__node.childNodes;
			var targetname = obj.__node.nodeName;
			for (var i  = 0; i < child.length; i++)
			{
				if ($.ff == 0)
				{
					if (child[i].nodeType == 1)
					{
						var name = child[i].nodeName;
						if (check_name(name))
						{
							var first = name.charAt(0).toLowerCase();
							obj[first+name.slice(1)] = child[i].getAttribute("val");
						}
						else
						{
							obj[child[i].nodeName] = child[i].getAttribute("val");
						}
							
					}	
				}
				else if ($.ff == 1)
				{
					if (child[i].nodeType == 1)
					{
						var name1 = child[i].nodeName;
						if (check_name(name1))
						{
							var first = name1.charAt(0).toLowerCase();
							obj[first+name1.slice(1)] = child[i].getAttribute("d");
						}
						else
						{
							obj[child[i].nodeName] = child[i].getAttribute("d");
						}
					}
				}
			}
			if ($.ff == 0)
			{
				var node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
				if (node)
				{
					var childnode = node.childNodes;
					if (childnode.length)
					{
						for (var j = 0; j < childnode.length; j++)
						{
							if (childnode[j].nodeType == 1)
							{
								var rename;
								var childname = childnode[j].nodeName;
								if (check_name(childname))
								{
									var ret = childname.charAt(0).toLowerCase();
									rename = ret + childname.slice(1);
								}
								else
								{
									rename = childname;
								}
								if (obj[rename] == undefined)
								{
									if (childnode[j].getAttribute("d"))
									{
										obj[rename] = childnode[j].getAttribute("d");
									}
									else
									{
										obj[rename] = "";
									}
								}						
							}
						}
					}
				}
			}
			tmpas.push(obj);
			obj = {};
		}
		return tmpas;
	}
	
	/* function: get all attributes. Such as ACT_GET operation, attrs parameter is null. */
	var get_getattr = function(targetnode, instance)
	{
		var child = [];
		var newname;
		var targetname;
		var node;
		var childnode;
		var rename;
		var childname;
		var ret;
		child = targetnode.childNodes;
		for (var i = 0; i < child.length; i++)
		{	
			if (child[i].nodeType == 1)
			{
				if ($.ff == 0)
				{
					var name = child[i].nodeName;		
					if (check_name(name))
					{
						var first = name.charAt(0).toLowerCase();
						instance[first+name.slice(1)] = child[i].getAttribute("val");
						newname = first + name.slice(1);
					}
					else
					{
						instance[child[i].nodeName] = child[i].getAttribute("val");
						newname = child[i].nodeName;
					}		
				}
				else if ($.ff == 1)
				{
				
					var name1 = child[i].nodeName;
					if (check_name(name1))
					{
						var first = name1.charAt(0).toLowerCase();
						instance[first+name1.slice(1)] = child[i].getAttribute("d");
						newname = first + name1.slice(1);
					}
					else
					{
						instance[child[i].nodeName] = child[i].getAttribute("d");
						newname = child[i].nodeName;
					}
				}
				if (instance[newname] == null)
				{
					instance[newname] = "";
				}
			}
		}
		if ($.ff == 0)
		{
			targetname = targetnode.nodeName;
			node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
			childnode = node.childNodes;
			if (childnode.length)
			{
				for (var j = 0; j < childnode.length; j++)
				{
					if (childnode[j].nodeType == 1)
					{
						childname = childnode[j].nodeName;
						if (check_name(childname))
						{
							ret = childname.charAt(0).toLowerCase();
							rename = ret + childname.slice(1);
						}
						else
						{
							rename = childname;
						}
						if (instance[rename] == undefined)
						{	
							if (childnode[j].getAttribute("d") == null)
							{	
								instance[rename] = "";
							}
							else
							{
								instance[rename] = childnode[j].getAttribute("d");
							}
						}
					}
				}
			}
		}
		
		if ($.ff == 1)
		{
			targetname = targetnode.nodeName;
			node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
			childnode = node.childNodes;
			if (childnode.length)
			{
				for (var t = 0; t < childnode.length; t++)
				{
					if (childnode[t].nodeType == 1)
					{
						childname = childnode[t].nodeName;
						if (check_name(childname))
						{
							ret = childname.charAt(0).toLowerCase();
							rename = ret + childname.slice(1);
						}
						else
						{
							rename = childname;
						}
						
						if (instance[rename] == undefined)
						{
							if (childnode[t].getAttribute("d") == null)
							{	
								instance[rename] = "";
							}
							else
							{
								instance[rename] = childnode[t].getAttribute("d");
							}
						}
					}
				}
			}
		}
		return instance;
	}
	
	/* function: get object path in datamodel */
	var getpath = function(path, stack, optype) 
	{
		var depth = 0;
		var index =[];
		var firstname = null;
		var id_path = path.split(".");
		var firstindex = 0;
		var tmp = [];
		var parentnode;
		var node;
		var childnode;
		var len = 0;
		for (var x = 0; x < id_path.length; x++)
		{
			if (id_path[x] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = id_path[x-1];
					firstindex = x;
				}
			}
		}
		var stack1 = stack.split(',');
		if (depth) 
		{
			for (var n = 0; n < depth; n++)
			{
				index[n] = parseInt(stack1[n], 10);
			}
		}
		else
		{
			index[0] = 0;
		}
		if (optype == ACT_GET || optype == ACT_SET)
		{
			if (depth == 0)
			{
				tmp = $.userxmlDoc.documentElement.getElementsByTagName(id_path[id_path.length-2]);
				$.ff = 0;
				if (tmp.length == 0)
				{
					tmp = $.defaultDoc.documentElement.getElementsByTagName(id_path[id_path.length-2]);
					$.ff = 1;
					if (tmp.length == 0)
					{
						$.ff = 2;
						return null;
					}
				}
				return tmp[0];	
			}
			else
			{
				tmp = $.userxmlDoc.documentElement.getElementsByTagName(id_path[0])[0];
				$.ff = 0;
				if (tmp == null)
				{
					tmp = $.defaultDoc.documentElement.getElementsByTagName(id_path[0])[0];
					$.ff = 1;
					if (tmp == null)
					{
						$.ff = 2;
						return null;
					}
				}

				var index1 = 1;
				var tmptarget;
				while (id_path[index1] != "{i}")
				{
					var tmpchild = tmp.childNodes;
					for (var h = 0; h < tmpchild.length; h++)
					{
						if (tmpchild[h].nodeName == id_path[index1])
						{
							tmp = tmpchild[h];
							index1++;
							break;
						}
					}
				}
				if (len < depth)
				{
					if (index[len] == 0)
					{
						node = tmp;
					}
					else
					{
						var count = index[len] - 1;
                        var instanceVal = index[len];
						if (instanceVal === parseInt(tmp.getAttribute("instance"), 10))
						{
							node = tmp;
						}
						else
						{
							while (count)
							{
								node = tmp;
								while (node.nextSibling.nodeType != 1)
								{
									node = node.nextSibling;
								}
								tmp = node.nextSibling;
                                if (instanceVal === parseInt(tmp.getAttribute("instance"), 10))
                                {
								    node = tmp;
                                    break;
                                }
								count--;
							}
						}
						
					}
					len++;
				}
				else
				{
					return null;
				}
				parentnode = node;
				for (var i = firstindex + 1; i < id_path.length - 1; i++)
				{
					if (id_path[i] == "{i}")
					{
						if (len < depth && index[len] != 1 && index[len] != 0)
						{
							childnode = parentnode;
							parentnode = parentnode.parentNode;
							tmp = parentnode.childNodes;
							node = null;
							for (var p = 0; p < tmp.length; p++)
							{
								if (tmp[p].nodeName.toLowerCase() == childnode.nodeName.toLowerCase())
								{
									if (tmp[p].getAttribute("instance") == null)
									{
										continue;
									}
									else if (tmp[p].getAttribute("instance").toString(10) == index[len])
									{
										node = tmp[p];
										break;
									}
									
								}
							}
							
							if (p >= tmp.length && node == null)
							{

							}
							else if (p <= tmp.length)
							{
								parentnode = node;
								len++;
							}	
						}
					}
					else
					{
						tmp = parentnode.childNodes;
						var nextnode = null;
						for (var j = 0; j < tmp.length; j++)
						{
							if (tmp[j].nodeName.toLowerCase() == id_path[i].toLowerCase())
							{
								nextnode = tmp[j];
								break;
							}
						}
						if (j == tmp.length && nextnode == null)
						{
				
						}
						else if (j <= tmp.length)
						{
							parentnode = nextnode;
						}
					}
				}	
				return parentnode;
			}
		}	
		else
		{
			return null;
		}
	}	
	var localexe = function(hook, unerr) {
		var data = "";
		var index = 0;
		var obj;
		while (obj = $.as.shift())
		{
			data += "[" + obj[0] + "&" + obj[2] + "#" + obj[3] + "#" + obj[4] + "]" + index + "," +obj[6] + "\r\n" + obj[5];
			index++;
		}
		var lines = data.split('\n');
		var targetnode;
		var attrnum;
		for (var i = 0; i < lines.length; i++)
		{
			if (lines[i] == "") 
				continue;
			if (lines[i].charAt(0) == "[")
			{
				var p = lines[i].indexOf("&");
				var optype = parseInt(lines[i].substr(1, p-1), 10);
				var k =	lines[i].indexOf("#");
				var oid = lines[i].substr(p+1 ,k-p-1);
				var n = lines[i].indexOf("]");
				var j = parseInt(lines[i].substr(n+1), 10);
				var stack = lines[i].substr(p+1, n-p-1);
				var subline = lines[i].substr(n+1);
				var q = subline.indexOf(",");
				attrnum = parseInt(subline.substr(q+1), 10);
				var mystack = getstack(stack);
				var instance;
				var newline;
				var linename1;

				if (mystack == "error")
				{
					if (j)
					{
						var ret = j;
						if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) $.err("exe", ret, unerr);
							break;
					}
				}
				else if ($.ds[j] instanceof Array && optype == ACT_GL)
				{
					var tmparray = [];
					tmparray = gl_fixinstance(oid, mystack);
					if (attrnum == 0)
					{
						var tmparray1 = gl_getattr(tmparray);
						var tttobj;
						while (tttobj = tmparray1.shift())
						{
							$.ds[j].push(tttobj);
						}
					}
					else
					{
						var tmpobj = {};
						while (tmpobj = tmparray.shift())
						{
							$.ds[j].push(tmpobj);
						}
					}
	
				}
				else if ($.ds[j] instanceof Array && optype == ACT_GS)
				{
					var mypstack = getpstack(stack);
					var tmparray = [];
					tmparray = gs_fixinstance(oid, mypstack);
					if (attrnum == 0)
					{
						var tmparray1 = gl_getattr(tmparray);
						var tttobj;
						while (tttobj = tmparray1.shift())
						{
							$.ds[j].push(tttobj);
						}
					}
					else
					{
						var tmpobj = {};
						while (tmpobj = tmparray.shift())
						{
							$.ds[j].push(tmpobj);
						}
					}
				}
				else if ($.ds[j] != null)
				{
					instance  = $.ds[j];
					instance.__stack = mystack;
					targetnode = getpath(oid_str[oid], mystack, optype);
					if (attrnum == 0 && optype != ACT_ADD)
					{
						instance = get_getattr(targetnode, instance);
					}
				}
			}
			else 
			{
				if (optype == ACT_GET)
				{
					if (targetnode == null) continue;
					if (lines[i])
					{
						lines[i] = lines[i].substr(0, lines[i].length-1);
						if ((check_name(lines[i])) == 3)
						{
							newline = lines[i].charAt(0).toLocaleLowerCase();
							linename1 = newline + lines[i].slice(1);
						}
						else
						{
							linename1 = lines[i].slice(0);
						}
						var child = targetnode.childNodes;
						for (var k = 0; k < child.length; k++)
						{
							if (child[k].nodeName.toLowerCase() == lines[i].toLowerCase())
							{
								if ($.ff == 0)
								{
									if (child[k].getAttribute("val"))
									{
										instance[linename1] = child[k].getAttribute("val");
										break;
									}
								}
								else if ($.ff == 1)
								{	
									if (child[k].getAttribute("d") == null)
									{

										instance[linename1] = "";
										break;
									}
									else
									{
										instance[linename1] = child[k].getAttribute("d");
										break;
									}
								}
							}
						}
						if (k >= child.length && instance[linename1] == undefined)
						{
							var tmptargetname = targetnode.nodeName;
							var tmpnode = $.defaultDoc.documentElement.getElementsByTagName(tmptargetname)[0];
							var tmpchildnode = tmpnode.childNodes;
							if (tmpchildnode.length)
							{
								for (var j = 0; j < tmpchildnode.length; j++)
								{
									if (tmpchildnode[j].nodeType == 1)
									{
										tmpchildname = tmpchildnode[j].nodeName;
										if(linename1.toLowerCase() == tmpchildname.toLowerCase())
										{
											instance[linename1] = tmpchildnode[j].getAttribute("d")
										}
									}
								}
							}
							if(instance[linename1] == undefined)
								instance[linename1] = "";
						}
						
						if (linename1 == "WEPKeyIndex")
						{
							var temp = instance[linename1];
							instance[linename1] = parseInt(temp, 10);
						}
					}
				}
				else if (optype == ACT_GL || optype == ACT_GS)
				{
					if (!($.ds[j] instanceof Array)) continue;
					if ($.ds[j].length == 0) continue;
					if (lines[i])
					{
						lines[i] = lines[i].substr(0, lines[i].length-1);
						if ((check_name(lines[i])) == 3)
						{
							newline = lines[i].charAt(0).toLocaleLowerCase();
							linename1 = newline + lines[i].slice(1);
						}
						else
						{
							linename1 = lines[i].slice(0);
						}
						var tmpobj;
						var tmpds = $.ds[j];
						var tmpas = [];
						while (tmpobj = tmpds.shift())
						{
							var child = tmpobj.__node.childNodes;
							for (var p = 0 ; p < child.length; p++)
							{
								if (child[p].nodeName.toLowerCase() == lines[i].toLowerCase())
								{
									if ($.ff == 0)
									{
										if (child[p].getAttribute("val"))
										{
											tmpobj[linename1] = child[p].getAttribute("val");
											break;
										}
									}
									else if ($.ff == 1)
									{
	
										if (child[p].getAttribute("d") == null)
										{
											tmpobj[linename1] = "";				
											break;
										}
										else
										{
											tmpobj[linename1] = child[p].getAttribute("d");
											break;
										}
									}
								}
							}
							if (p >= child.length && tmpobj[linename1] == undefined)
							{

								if ($.ff == 0)
								{
									if ((check_name(lines[i])) == 2)
									{
										var newchar1 = lines[i].charAt(0).toLocaleUpperCase();
										var newname1 = newchar1 + lines[i].slice(1);
									}
									else
									{
										newname1 = lines[i].slice(0);
									}
									
									var dtmp1 = $.defaultDoc.documentElement.getElementsByTagName(newname1)[0];
						
									if (dtmp1.getAttribute("d") == null)
									{
										tmpobj[linename1] = "";
									}
									else
									{
										tmpobj[linename1] = dtmp1.getAttribute("d");
									}
								}
								else
								{
									tmpobj[linename1] = "";
								}
							}	

							if (linename1 == "WEPKeyIndex")
							{
								var tempvalue = tmpobj[linename1];
								tmpobj[linename1] = parseInt(tempvalue, 10);
							}
							tmpas.push(tmpobj);
						}
					}	
					while (tmpobj = tmpas.shift())
					{
						$.ds[j].push(tmpobj);
					}			
				}	
			}
			
		}
		while($.ds.length)  $.ds.pop();
		if (hook && typeof hook === "function")
		{
			hook(0);
		}
		return 0;
	
=======
	/* function: load config file */
	var loadXml = function()
	{
		try 
  		{
   			if ($.w.ActiveXObject)
 			{
				$.userxmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				$.defaultDoc = new ActiveXObject("Microsoft.XMLDOM");  					
				$.userxmlDoc.async = false;
				$.defaultDoc.async = false;
  				$.userxmlDoc.load("./config/setconf.xml");
				$.defaultDoc.load("./config/setreduced_data_model.xml");
			}
			else
			{
				var oXmlHttp1 = new XMLHttpRequest();
				var oXmlHttp2 = new XMLHttpRequest();
				var url1 = "./config/setconf.xml";
				var url2 = "./config/setreduced_data_model.xml";
				oXmlHttp1.open("GET", url1, false);
				oXmlHttp2.open("GET", url2, false);
				oXmlHttp1.send(null);
				oXmlHttp2.send(null);
				$.userxmlDoc = oXmlHttp1.responseXML;
				$.defaultDoc = oXmlHttp2.responseXML;
			}
  		}
		catch(e)
		{
 			alert("Load file Fail");
  		}
	}
	
	/* function: fix object stack. Such as ACT_GL operation, get stack from local is null, we should to modify this stack */
	var gl_fixinstance = function(oid, stack)
	{
		var depth = 0;
		var index = [];
		var firstname = null;
		var firstindex;
		var savestack = stack;
		var path = oid_str[oid].split('.');
		for (var i = 0; i < path.length; i++)
		{
			if (path[i] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = path[i-1];
					firstindex = i;	
				}
			}
		}
		if (depth == 0 || firstname == null)
		{
			/* Error */
			return null;
		}
		var myarray = [];
		var number = 0;
		var savenum = 0;
		var len = 0;
		var mystack;
		if (depth)
		{	
			var stack1 = stack.split(',');
			if (stack1.length != 6)
			{
				/* Error */
				return null;
			}
		}
		
		if (depth)
		{
			for (var i = 0; i < depth; i++)
			{
				index[i] = parseInt(stack1[i], 10);
			}
		}	
		var tmp;
		var tmpnode;
		var parentnode;
		var child = [];
		var tmpas = [];
		var tmpds = [];
		tmp = $.userxmlDoc.documentElement.getElementsByTagName(path[0])[0];
		$.ff = 0;
		if (tmp == null)
		{
			tmp = $.defaultDoc.documentElement.getElementsByTagName(path[0])[0];
			$.ff = 1;
			if (tmp == null)
			{
				$.ff = 2;
				return null;
			}
		}
		var sss = stack.split(',');
		var instance = {}; 

		var index1 = 1;
		var tmptarget;
		while (path[index1] != "{i}")
		{
			var tmpchild = tmp.childNodes;
			for (var h = 0; h < tmpchild.length; h++)
			{
				if (tmpchild[h].nodeName == path[index1])
				{
					tmp = tmpchild[h];
					index1++;
					break;
				}
			}

			if (h == tmpchild.length)
			{
				break;
			}			
		}
		
		if (index[len] == 0)
		{	
			var nextflag = 0;
			while (1)
			{
				var oldtmp = tmp;
				if (oldtmp.getAttribute("instance") != null)
				{
					instance = {};
					sss[len] = oldtmp.getAttribute("instance");
					instance.__stack = sss.join(",");
					instance.__node = oldtmp;
					tmpds.push(instance);
				}
				else
				{
					break;
				}
				while (oldtmp.nextSibling.nodeType != 1)
				{
					oldtmp = oldtmp.nextSibling;
					if (oldtmp.nextSibling == null)
					{
						nextflag = 1;
						break;
					}
				}
				if (nextflag)
				{
					break;
				}
				if (oldtmp.nextSibling.nodeName == tmp.nodeName)
				{
					tmp = oldtmp.nextSibling;
				}
				else
				{
					break;
				}
			}
			len++;
		}
		else
		{
			instance = {};
			var count = index[len] - 1;
			if (count == 0)
			{
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
			else
			{
				while (count)
				{
					var oldtmp = tmp;
					while (oldtmp.nextSibling.nodeType != 1)
					{
						oldtmp = oldtmp.nextSibling;
					}
					tmp = oldtmp.nextSibling;
					if (tmp.nodeName == oldtmp.nodeName)
					{
						count--;
					}
				}
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
		}
		var obj;
		
		for (var i  = firstindex + 1; i < path.length - 1; i++)
		{	
			if (path[i] == "{i}")
			{	
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					parentnode = tmpnode.parentNode;
					child = parentnode.childNodes;
					if (index[len] == 0)
					{
						for (var y = 0; y < child.length; y++)
						{
							sss = obj.__stack.split(',');
							if (child[y].nodeName.toLowerCase() == tmpnode.nodeName.toLowerCase())
							{
								if (child[y].getAttribute("instance") != null)
								{
									var newobj = {};
									sss[len] = child[y].getAttribute("instance");
									newobj.__stack = sss.join(",");
									newobj.__node = child[y];
									tmpas.push(newobj);
								}
							}
						}
					}
					else
					{
						for (var z = 0; z < child.length; z++)
						{		
							if (child[z].nodeName.toLowerCase() == obj.__node.nodeName.toLowerCase())
							{
								if (parseInt(child[z].getAttribute("instance"), 10) == index[len])
								{
									obj.__node = child[z];
									tmpas.push(obj);
								}
							}
						}
							
					}
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
				len++;
			}
			else
			{
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					child = tmpnode.childNodes;
					var findindex = 0;
					for (var j = 0 ; j < child.length; j++)
					{
						if (child[j].nodeName.toLowerCase() == path[i].toLowerCase())
						{
							instance = {};
							instance.__node = child[j];
							instance.__stack = obj.__stack;
							tmpas.push(instance);
							break;
						}
					}	
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
			}
		}
		return tmpds;
	}
	
	/* function: fix object stack. Such as ACT_GS operation, we should to modify this stack */
	var gs_fixinstance = function(oid, stack)
	{
		var depth = 0;
		var firstname = null;
		var firstindex = 0;
		var index = [];
		var savestack = stack;
		var path = oid_str[oid].split('.');
		for (var i = 0; i < path.length; i++)
		{
			if (path[i] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = path[i-1];
					firstindex = i;
				}
			}
		}
		if (depth == 0 || firstname == null)
		{
			return null;
		}
		var myarray = [];
		var number = 0;
		var savenum = 0;
		var len = 0;
		var mystack;
		if (depth)
		{	
			var stack1 = stack.split(',');
			if (stack1.length != 6)
			{
				return null;
			}
		}
		
		if (depth)
		{
			for (var i = 0; i < depth; i++)
			{
				index[i] = parseInt(stack1[i], 10);
			}
		}
			
		var tmp;
		var tmpnode;
		var parentnode;
		var child = [];
		var tmpas = [];
		var tmpds = [];

		tmp = $.userxmlDoc.documentElement.getElementsByTagName(path[0])[0];
		$.ff = 0;
		if (tmp == null)
		{
			tmp = $.defaultDoc.documentElement.getElementsByTagName(path[0])[0];
			$.ff = 1;
			if (tmp == null)
			{
				$.ff = 2;
				return null;
			}
		}

		var index1 = 1;
		var tmptarget;
		while (path[index1] != "{i}")
		{
			var tmpchild = tmp.childNodes;
			for (var h = 0; h < tmpchild.length; h++)
			{
				if (tmpchild[h].nodeName == path[index1])
				{
					tmp = tmpchild[h];
					index1++;
					break;
				}
			}
		}
		var sss = stack.split(',');
		var instance = {};
		
		
		if (index[0] == 0)
		{

			//alert("ACT_GS pstack ERROR");
		}
		else
		{
			instance = {};
			var count = index[len] - 1;
            var instanceVal = index[len];
			if(instanceVal === parseInt(tmp.getAttribute("instance"),10))
			{
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
			else
			{
				var oldtmp;
				oldtmp = tmp;
				while (count)
				{
					while (oldtmp.nextSibling.nodeType != 1)
					{
						oldtmp = oldtmp.nextSibling;
					}
					oldtmp = oldtmp.nextSibling;
                    if(instanceVal === parseInt(oldtmp.getAttribute("instance"),10))
                    {
					   tmp = oldtmp;
                       break;
                    }
					count--;
				}
				sss[len] = tmp.getAttribute("instance");
				instance.__stack = sss.join(",");
				instance.__node = tmp;
				tmpds.push(instance);
				len++;
			}
		}
		
		var obj;
		for (var i  = firstindex + 1; i < path.length - 1; i++)
		{	
			if (path[i] == "{i}")
			{	
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					parentnode = tmpnode.parentNode;
					child = parentnode.childNodes;
					if (index[len] == 0)
					{
						for (var y = 0; y < child.length; y++)
						{
							sss = obj.__stack.split(',');
							if (child[y].nodeName.toLowerCase() == tmpnode.nodeName.toLowerCase())
							{
								if (child[y].getAttribute("instance") != null)
								{
									var newobj = {};
									sss[len] = child[y].getAttribute("instance");
									newobj.__stack = sss.join(",");
									newobj.__node = child[y];
									tmpas.push(newobj);
								}
							}
						}
					}
					else
					{
						for (var z = 0; z < child.length; z++)
						{		
							if (child[z].nodeName.toLowerCase() == obj.__node.nodeName.toLowerCase())
							{
								if (parseInt(child[z].getAttribute("instance"), 10) == index[len])
								{
									obj.__node = child[z];
									tmpas.push(obj);
								}
							}
						}
							
					}
				}
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
				len++;
			}
			else
			{
				while (obj = tmpds.shift())
				{
					tmpnode = obj.__node;
					child = tmpnode.childNodes;
					var findindex = 0;
					for (var j = 0 ; j < child.length; j++)
					{
						if (child[j].nodeName.toLowerCase() == path[i].toLowerCase())
						{
							instance = {};
							instance.__node = child[j];
							instance.__stack = obj.__stack;
							tmpas.push(instance);
							break;
						}
					}				
				}
				
				tmpds.length = 0;
				tmpds = tmpas.slice(0);
				tmpas.length = 0;
			}
		}
		return tmpds;
	}	
	
	/* function: check up object's attribute name. The attribute name in config files is unlike in web page. */
	var check_name = function(name)
	{
		var lowerflag1;
		var lowerflag2;
		if (/^[a-z]+$/.test(name.charAt(0)))
		{
			lowerflag1 = 1;
		}
		else if (/^[A-Z]+$/.test(name.charAt(0)))
		{
			lowerflag1 = 2;
		}
		else
		{
			lowerflag1 = 0;
		}
		if (/^[a-z]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 1;
		}
		else if (/^[A-Z]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 2;
		}
		else if (/^[0-9]+$/.test(name.charAt(1)))
		{
			lowerflag2 = 3;
		}
		else
		{
			lowerflag2 = 0;
		}
		
		if (lowerflag1 == 1 && lowerflag2 == 1)
		{
			return 2;
		}
		else if (lowerflag1 == 2 && lowerflag2 == 1) 
		{
			return 3;
		}
		else if (lowerflag1 == 2 && lowerflag2 == 3)
		{
			return 4;
		}
		else if (lowerflag1 != 1 && lowerflag2 != 1 )
		{
			return false;
		}
	}
	
	/* function: get object stack */
	var getstack = function(stack)
	{
		while(1)
		{
			var z = stack.indexOf("#");
			stack = stack.substr(z+1);
			z = stack.indexOf("#");
			if (z == -1)
			{
				stack2 = stack;
			}
			else
			{
				stack2 = stack.substr(0, z);
			}
			var stack1 = stack2.split(',');
			if (stack1.length == 6)
			{
				break;
			}
						
		}
			
		return stack2;
	}
	
	/* function: get object pstack */
	var getpstack = function(stack)
	{
		var count = 0;
		while(1)
		{
			var z = stack.indexOf("#");
			stack = stack.substr(z+1);
			z = stack.indexOf("#");
			if (z == -1)
			{
				stack2 = stack;
			}
			else
			{
				stack2 = stack.substr(0, z);
			}
			var stack1 = stack2.split(',');
			if (stack1.length == 6)
			{
				count++;
				if (count == 2)
				{
					break;
				}
			}
						
		}
			
		return stack2;
	}
	
	/* function: get all attributes. Such as ACT_GL operation, attrs parameter is null. */
	var gl_getattr = function(ds)
	{
		var obj = {};
		var tmpobj;
		var tmpas = [];
		while (tmpobj = ds.shift())
		{
			obj = tmpobj;
			var child = obj.__node.childNodes;
			var targetname = obj.__node.nodeName;
			for (var i  = 0; i < child.length; i++)
			{
				if ($.ff == 0)
				{
					if (child[i].nodeType == 1)
					{
						var name = child[i].nodeName;
						if (check_name(name))
						{
							var first = name.charAt(0).toLowerCase();
							obj[first+name.slice(1)] = child[i].getAttribute("val");
						}
						else
						{
							obj[child[i].nodeName] = child[i].getAttribute("val");
						}
							
					}	
				}
				else if ($.ff == 1)
				{
					if (child[i].nodeType == 1)
					{
						var name1 = child[i].nodeName;
						if (check_name(name1))
						{
							var first = name1.charAt(0).toLowerCase();
							obj[first+name1.slice(1)] = child[i].getAttribute("d");
						}
						else
						{
							obj[child[i].nodeName] = child[i].getAttribute("d");
						}
					}
				}
			}
			if ($.ff == 0)
			{
				var node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
				if (node)
				{
					var childnode = node.childNodes;
					if (childnode.length)
					{
						for (var j = 0; j < childnode.length; j++)
						{
							if (childnode[j].nodeType == 1)
							{
								var rename;
								var childname = childnode[j].nodeName;
								if (check_name(childname))
								{
									var ret = childname.charAt(0).toLowerCase();
									rename = ret + childname.slice(1);
								}
								else
								{
									rename = childname;
								}
								if (obj[rename] == undefined)
								{
									if (childnode[j].getAttribute("d"))
									{
										obj[rename] = childnode[j].getAttribute("d");
									}
									else
									{
										obj[rename] = "";
									}
								}						
							}
						}
					}
				}
			}
			tmpas.push(obj);
			obj = {};
		}
		return tmpas;
	}
	
	/* function: get all attributes. Such as ACT_GET operation, attrs parameter is null. */
	var get_getattr = function(targetnode, instance)
	{
		var child = [];
		var newname;
		var targetname;
		var node;
		var childnode;
		var rename;
		var childname;
		var ret;
		child = targetnode.childNodes;
		for (var i = 0; i < child.length; i++)
		{	
			if (child[i].nodeType == 1)
			{
				if ($.ff == 0)
				{
					var name = child[i].nodeName;		
					if (check_name(name))
					{
						var first = name.charAt(0).toLowerCase();
						instance[first+name.slice(1)] = child[i].getAttribute("val");
						newname = first + name.slice(1);
					}
					else
					{
						instance[child[i].nodeName] = child[i].getAttribute("val");
						newname = child[i].nodeName;
					}		
				}
				else if ($.ff == 1)
				{
				
					var name1 = child[i].nodeName;
					if (check_name(name1))
					{
						var first = name1.charAt(0).toLowerCase();
						instance[first+name1.slice(1)] = child[i].getAttribute("d");
						newname = first + name1.slice(1);
					}
					else
					{
						instance[child[i].nodeName] = child[i].getAttribute("d");
						newname = child[i].nodeName;
					}
				}
				if (instance[newname] == null)
				{
					instance[newname] = "";
				}
			}
		}
		if ($.ff == 0)
		{
			targetname = targetnode.nodeName;
			node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
			childnode = node.childNodes;
			if (childnode.length)
			{
				for (var j = 0; j < childnode.length; j++)
				{
					if (childnode[j].nodeType == 1)
					{
						childname = childnode[j].nodeName;
						if (check_name(childname))
						{
							ret = childname.charAt(0).toLowerCase();
							rename = ret + childname.slice(1);
						}
						else
						{
							rename = childname;
						}
						if (instance[rename] == undefined)
						{	
							if (childnode[j].getAttribute("d") == null)
							{	
								instance[rename] = "";
							}
							else
							{
								instance[rename] = childnode[j].getAttribute("d");
							}
						}
					}
				}
			}
		}
		
		if ($.ff == 1)
		{
			targetname = targetnode.nodeName;
			node = $.defaultDoc.documentElement.getElementsByTagName(targetname)[0];
			childnode = node.childNodes;
			if (childnode.length)
			{
				for (var t = 0; t < childnode.length; t++)
				{
					if (childnode[t].nodeType == 1)
					{
						childname = childnode[t].nodeName;
						if (check_name(childname))
						{
							ret = childname.charAt(0).toLowerCase();
							rename = ret + childname.slice(1);
						}
						else
						{
							rename = childname;
						}
						
						if (instance[rename] == undefined)
						{
							if (childnode[t].getAttribute("d") == null)
							{	
								instance[rename] = "";
							}
							else
							{
								instance[rename] = childnode[t].getAttribute("d");
							}
						}
					}
				}
			}
		}
		return instance;
	}
	
	/* function: get object path in datamodel */
	var getpath = function(path, stack, optype) 
	{
		var depth = 0;
		var index =[];
		var firstname = null;
		var id_path = path.split(".");
		var firstindex = 0;
		var tmp = [];
		var parentnode;
		var node;
		var childnode;
		var len = 0;
		for (var x = 0; x < id_path.length; x++)
		{
			if (id_path[x] == "{i}")
			{
				depth++;
				if (firstname == null)
				{
					firstname = id_path[x-1];
					firstindex = x;
				}
			}
		}
		var stack1 = stack.split(',');
		if (depth) 
		{
			for (var n = 0; n < depth; n++)
			{
				index[n] = parseInt(stack1[n], 10);
			}
		}
		else
		{
			index[0] = 0;
		}
		if (optype == ACT_GET || optype == ACT_SET)
		{
			if (depth == 0)
			{
				tmp = $.userxmlDoc.documentElement.getElementsByTagName(id_path[id_path.length-2]);
				$.ff = 0;
				if (tmp.length == 0)
				{
					tmp = $.defaultDoc.documentElement.getElementsByTagName(id_path[id_path.length-2]);
					$.ff = 1;
					if (tmp.length == 0)
					{
						$.ff = 2;
						return null;
					}
				}
				return tmp[0];	
			}
			else
			{
				tmp = $.userxmlDoc.documentElement.getElementsByTagName(id_path[0])[0];
				$.ff = 0;
				if (tmp == null)
				{
					tmp = $.defaultDoc.documentElement.getElementsByTagName(id_path[0])[0];
					$.ff = 1;
					if (tmp == null)
					{
						$.ff = 2;
						return null;
					}
				}

				var index1 = 1;
				var tmptarget;
				while (id_path[index1] != "{i}")
				{
					var tmpchild = tmp.childNodes;
					for (var h = 0; h < tmpchild.length; h++)
					{
						if (tmpchild[h].nodeName == id_path[index1])
						{
							tmp = tmpchild[h];
							index1++;
							break;
						}
					}
				}
				if (len < depth)
				{
					if (index[len] == 0)
					{
						node = tmp;
					}
					else
					{
						var count = index[len] - 1;
                        var instanceVal = index[len];
						if (instanceVal === parseInt(tmp.getAttribute("instance"), 10))
						{
							node = tmp;
						}
						else
						{
							while (count)
							{
								node = tmp;
								while (node.nextSibling.nodeType != 1)
								{
									node = node.nextSibling;
								}
								tmp = node.nextSibling;
                                if (instanceVal === parseInt(tmp.getAttribute("instance"), 10))
                                {
								    node = tmp;
                                    break;
                                }
								count--;
							}
						}
						
					}
					len++;
				}
				else
				{
					return null;
				}
				parentnode = node;
				for (var i = firstindex + 1; i < id_path.length - 1; i++)
				{
					if (id_path[i] == "{i}")
					{
						if (len < depth && index[len] != 1 && index[len] != 0)
						{
							childnode = parentnode;
							parentnode = parentnode.parentNode;
							tmp = parentnode.childNodes;
							node = null;
							for (var p = 0; p < tmp.length; p++)
							{
								if (tmp[p].nodeName.toLowerCase() == childnode.nodeName.toLowerCase())
								{
									if (tmp[p].getAttribute("instance") == null)
									{
										continue;
									}
									else if (tmp[p].getAttribute("instance").toString(10) == index[len])
									{
										node = tmp[p];
										break;
									}
									
								}
							}
							
							if (p >= tmp.length && node == null)
							{

							}
							else if (p <= tmp.length)
							{
								parentnode = node;
								len++;
							}	
						}
					}
					else
					{
						tmp = parentnode.childNodes;
						var nextnode = null;
						for (var j = 0; j < tmp.length; j++)
						{
							if (tmp[j].nodeName.toLowerCase() == id_path[i].toLowerCase())
							{
								nextnode = tmp[j];
								break;
							}
						}
						if (j == tmp.length && nextnode == null)
						{
				
						}
						else if (j <= tmp.length)
						{
							parentnode = nextnode;
						}
					}
				}	
				return parentnode;
			}
		}	
		else
		{
			return null;
		}
	}	
	var localexe = function(hook, unerr) {
		var data = "";
		var index = 0;
		var obj;
		while (obj = $.as.shift())
		{
			data += "[" + obj[0] + "&" + obj[2] + "#" + obj[3] + "#" + obj[4] + "]" + index + "," +obj[6] + "\r\n" + obj[5];
			index++;
		}
		var lines = data.split('\n');
		var targetnode;
		var attrnum;
		for (var i = 0; i < lines.length; i++)
		{
			if (lines[i] == "") 
				continue;
			if (lines[i].charAt(0) == "[")
			{
				var p = lines[i].indexOf("&");
				var optype = parseInt(lines[i].substr(1, p-1), 10);
				var k =	lines[i].indexOf("#");
				var oid = lines[i].substr(p+1 ,k-p-1);
				var n = lines[i].indexOf("]");
				var j = parseInt(lines[i].substr(n+1), 10);
				var stack = lines[i].substr(p+1, n-p-1);
				var subline = lines[i].substr(n+1);
				var q = subline.indexOf(",");
				attrnum = parseInt(subline.substr(q+1), 10);
				var mystack = getstack(stack);
				var instance;
				var newline;
				var linename1;

				if (mystack == "error")
				{
					if (j)
					{
						var ret = j;
						if (ret != ERR_HTTP_ERR_CGI_INVALID_ANSI) $.err("exe", ret, unerr);
							break;
					}
				}
				else if ($.ds[j] instanceof Array && optype == ACT_GL)
				{
					var tmparray = [];
					tmparray = gl_fixinstance(oid, mystack);
					if (attrnum == 0)
					{
						var tmparray1 = gl_getattr(tmparray);
						var tttobj;
						while (tttobj = tmparray1.shift())
						{
							$.ds[j].push(tttobj);
						}
					}
					else
					{
						var tmpobj = {};
						while (tmpobj = tmparray.shift())
						{
							$.ds[j].push(tmpobj);
						}
					}
	
				}
				else if ($.ds[j] instanceof Array && optype == ACT_GS)
				{
					var mypstack = getpstack(stack);
					var tmparray = [];
					tmparray = gs_fixinstance(oid, mypstack);
					if (attrnum == 0)
					{
						var tmparray1 = gl_getattr(tmparray);
						var tttobj;
						while (tttobj = tmparray1.shift())
						{
							$.ds[j].push(tttobj);
						}
					}
					else
					{
						var tmpobj = {};
						while (tmpobj = tmparray.shift())
						{
							$.ds[j].push(tmpobj);
						}
					}
				}
				else if ($.ds[j] != null)
				{
					instance  = $.ds[j];
					instance.__stack = mystack;
					targetnode = getpath(oid_str[oid], mystack, optype);
					if (attrnum == 0 && optype != ACT_ADD)
					{
						instance = get_getattr(targetnode, instance);
					}
				}
			}
			else 
			{
				if (optype == ACT_GET)
				{
					if (targetnode == null) continue;
					if (lines[i])
					{
						lines[i] = lines[i].substr(0, lines[i].length-1);
						if ((check_name(lines[i])) == 3)
						{
							newline = lines[i].charAt(0).toLocaleLowerCase();
							linename1 = newline + lines[i].slice(1);
						}
						else
						{
							linename1 = lines[i].slice(0);
						}
						var child = targetnode.childNodes;
						for (var k = 0; k < child.length; k++)
						{
							if (child[k].nodeName.toLowerCase() == lines[i].toLowerCase())
							{
								if ($.ff == 0)
								{
									if (child[k].getAttribute("val"))
									{
										instance[linename1] = child[k].getAttribute("val");
										break;
									}
								}
								else if ($.ff == 1)
								{	
									if (child[k].getAttribute("d") == null)
									{

										instance[linename1] = "";
										break;
									}
									else
									{
										instance[linename1] = child[k].getAttribute("d");
										break;
									}
								}
							}
						}
						if (k >= child.length && instance[linename1] == undefined)
						{
							var tmptargetname = targetnode.nodeName;
							var tmpnode = $.defaultDoc.documentElement.getElementsByTagName(tmptargetname)[0];
							var tmpchildnode = tmpnode.childNodes;
							if (tmpchildnode.length)
							{
								for (var j = 0; j < tmpchildnode.length; j++)
								{
									if (tmpchildnode[j].nodeType == 1)
									{
										tmpchildname = tmpchildnode[j].nodeName;
										if(linename1.toLowerCase() == tmpchildname.toLowerCase())
										{
											instance[linename1] = tmpchildnode[j].getAttribute("d")
										}
									}
								}
							}
							if(instance[linename1] == undefined)
								instance[linename1] = "";
						}
						
						if (linename1 == "WEPKeyIndex")
						{
							var temp = instance[linename1];
							instance[linename1] = parseInt(temp, 10);
						}
					}
				}
				else if (optype == ACT_GL || optype == ACT_GS)
				{
					if (!($.ds[j] instanceof Array)) continue;
					if ($.ds[j].length == 0) continue;
					if (lines[i])
					{
						lines[i] = lines[i].substr(0, lines[i].length-1);
						if ((check_name(lines[i])) == 3)
						{
							newline = lines[i].charAt(0).toLocaleLowerCase();
							linename1 = newline + lines[i].slice(1);
						}
						else
						{
							linename1 = lines[i].slice(0);
						}
						var tmpobj;
						var tmpds = $.ds[j];
						var tmpas = [];
						while (tmpobj = tmpds.shift())
						{
							var child = tmpobj.__node.childNodes;
							for (var p = 0 ; p < child.length; p++)
							{
								if (child[p].nodeName.toLowerCase() == lines[i].toLowerCase())
								{
									if ($.ff == 0)
									{
										if (child[p].getAttribute("val"))
										{
											tmpobj[linename1] = child[p].getAttribute("val");
											break;
										}
									}
									else if ($.ff == 1)
									{
	
										if (child[p].getAttribute("d") == null)
										{
											tmpobj[linename1] = "";				
											break;
										}
										else
										{
											tmpobj[linename1] = child[p].getAttribute("d");
											break;
										}
									}
								}
							}
							if (p >= child.length && tmpobj[linename1] == undefined)
							{

								if ($.ff == 0)
								{
									if ((check_name(lines[i])) == 2)
									{
										var newchar1 = lines[i].charAt(0).toLocaleUpperCase();
										var newname1 = newchar1 + lines[i].slice(1);
									}
									else
									{
										newname1 = lines[i].slice(0);
									}
									
									var dtmp1 = $.defaultDoc.documentElement.getElementsByTagName(newname1)[0];
						
									if (dtmp1.getAttribute("d") == null)
									{
										tmpobj[linename1] = "";
									}
									else
									{
										tmpobj[linename1] = dtmp1.getAttribute("d");
									}
								}
								else
								{
									tmpobj[linename1] = "";
								}
							}	

							if (linename1 == "WEPKeyIndex")
							{
								var tempvalue = tmpobj[linename1];
								tmpobj[linename1] = parseInt(tempvalue, 10);
							}
							tmpas.push(tmpobj);
						}
					}	
					while (tmpobj = tmpas.shift())
					{
						$.ds[j].push(tmpobj);
					}			
				}	
			}
			
		}
		while($.ds.length)  $.ds.pop();
		if (hook && typeof hook === "function")
		{
			hook(0);
		}
		return 0;
	
>>>>>>> 59bffef8551d69606b594c223f73f1df7ea23746
	}