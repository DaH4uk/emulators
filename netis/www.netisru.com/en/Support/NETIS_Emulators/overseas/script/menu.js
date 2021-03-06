function Parent(m,menu){
	Element.call(this,"DIV");
	this.setID("p_menu_" + m.name);
	var _this = this;
	this.mode = m.mode;
	this.setClass("menu_parent");
	if(m.mode){
		var img = new Element("DIV:m_p_img m_no");
	}else{
		var img = new Element("DIV:m_p_img m_jia");
	}
	var txt = new Element("DIV:m_p_txt");
	txt.html(m.Lan.txt);
	this.push(img,txt);
	this.img = img;
	this.txt = txt;
	this.entity.onclick = function(){
		$.CurrentModule = m.name;
		for(var i=0;i<menu.Parent.length;i++){
			var p = menu.Parent[i];
			if(p.mode){
				p.img.entity.className = 'm_p_img m_no';
			}else{
				p.img.entity.className = 'm_p_img m_jia';
			}
		}
		for(var i=0;i<menu.Panel.length;i++){
			menu.Panel[i].hide();	
		}
		if(m.mode){
			_this.img.entity.className = 'm_p_img m_now';
			$.CurrentApp = m.name;	
			netcore.load(m.name);
			return;
		}else{
			_this.img.entity.className = 'm_p_img m_jian';
		}
		_this.panel.show();	
		if($.CurrentApp != $.CurrentModule){
			ID("c_menu_" + Applications[m.name][0].name).onclick();	
			var opmode = $.DataMap.access_mode;
			if($.CurrentModule == "network"){
				if(opmode == "1"){
					ID("c_menu_lan").onclick();
				}
			} 
		}
	}
}
function MenuPanel(m){
	Element.call(this,"DIV");
	this.setID("panel_" + m.name);
	this.setClass("menu_child_panel");
}
function Child(a,menu){
	Element.call(this,"DIV");
	this.setID("c_menu_" + a.name);
	this.setClass("menu_child");
	var _this = this;
	var img = new Element("DIV:m_c_img m_no");
	var txt = new Element("DIV:m_c_txt");
	txt.html(a.Lan.txt);
	this.push(img,txt);
	this.img = img;
	this.txt = txt;
	this.entity.onclick = function(){
		$.CurrentApp = a.name;
		for(var i=0;i<menu.Child.length;i++){
			menu.Child[i].setClass("menu_child");	
			menu.Child[i].img.setClass("m_c_img m_no");	
		}
		_this.img.setClass("m_c_img m_now");	
		_this.entity.className = "menu_child_checked";
		netcore.load($.CurrentApp);	
	}
}
function Menu(o){
	if(o){
	$.CurrentModule = o.loadPage.split(":")[0];	
	$.CurrentApp = o.loadPage.split(":")[1];
	}
	Element.call(this,"DIV");
	var menu = this;
	menu.setClass("m_menu");
	menu.Parent = new Array();
	menu.Panel = new Array();
	menu.Child = new Array();
	var ms = $.Modules;
	for(var i in ms){
		if(checknobj(i)){
			continue;	
		}
		var parent = new Parent(ms[i],menu);
		var panel = new MenuPanel(ms[i]);
		parent.panel = panel;
		var as = ms[i].Apps;
		for(var j in as){
			if(checknobj(j)){
				continue;	
			}
			var child = new Child(as[j],menu);
			panel.append(child);		
			menu.Child.push(child);
		}
		menu.append(parent);	
		menu.Parent.push(parent);
		menu.append(panel);	
		menu.Panel.push(panel);
		//IE兼容
		var clear = new Element("DIV:clear");
		menu.append(clear);
	}
	$.MenuLayer.appendChild(this.entity);
	var clear = new Element("DIV");
	clear.setAttr({"style":"clear:both"});
	$.MenuLayer.appendChild(clear.entity);
	if(o){
	if($.CurrentModule == $.CurrentApp){
		ID("p_menu_" + $.CurrentModule).onclick();	
	}else{
		ID("p_menu_" + $.CurrentModule).onclick();	
		ID("c_menu_" + $.CurrentApp).onclick();	
	}
	}
}

