function checkChanges(){MENU.form&&"page"!=window.hasChanges&&(window.hasChanges=$("#page").isModified());var page=$("#page .cover .header ._page").attr("langkey");if("menu_ipsec"!=page&&!window.hasChanges)for(var $grids=$("#page div.grid"),i=0;i<$grids.length;i++)if($grid=$grids.eq(i).data("light_ui_grid"),$grid.find("tbody td.editable").length&&gridActionConverter($grid).count){window.hasChanges="grid";break}return window.hasChanges}function mayGo(){var group=$("#page .cover .header ._group").attr("langkey"),page=$("#page .cover .header ._page").attr("langkey");return"menu_sw_home"!=group&&"menu_ping"!=page&&"menu_traceroute"!=page&&"menu_devmode"!=page&&checkChanges()?!1:(window.hasChanges=null,!0)}var MENU=new function(){function clear(){$$.form&&$$.form.event&&$$.form.event("stoprefreshrq"),$$.form&&$$.form.emit&&$$.form.emit("stoprefreshrq"),delete $$.form,$("#page>.cover>.content, #page>.cover>.footer>.buttonbar").find("*").unbind().remove()}function expand(group,item,tab){$menubox.find("ul.menu>li.menu").removeClass("active").filter("[_alias="+group.alias+"]").addClass("active"),item&&$menubox.find("ul.submenu>li.submenu").removeClass("active").filter("[_alias="+item.alias+"]").addClass("active"),tab&&$menubox.find("ul.tabmenu>li.tabmenu").removeClass("active").filter("[_alias="+tab.alias+"]").addClass("active")}function open(group,item,tab){if(clear(),item&&!tab&&item.tabs&&item.tabs.length>1&&(tab=item.tabs[0]),expand(group,item,tab),$title.html($("<span class='_group' langkey=\""+group.name+'"></span>')),item&&$title.append($("			<span>&nbsp;/&nbsp;</span>			<span class='_page' langkey=\""+item.item+'"></span>		')),item&&item.tabs&&item.tabs.length>1&&$title.append($("				<span>&nbsp;/&nbsp;</span>				<span class='_tab' langkey=\""+tab.subitem+'"></span>			')),translate($title),group.page instanceof Function){$$.form=new group.page,$$.form.nextIface="client",$$.form.ifaceTypes.client.options={viewBoxSel:"#page>.cover>.content"};var curViewInx=$$.form.addIface();$$.form.views[curViewInx].options.pageTitle=group.name,$$.form.views[curViewInx].options.buttonsInline=!1,$$.form.views[curViewInx].drawView(),$$.form.event("updaterq"),setCookie("url_hash",group.alias)}else if(item.page instanceof Function){$$.form=new item.page,$$.form.nextIface="client",$$.form.ifaceTypes.client.options={viewBoxSel:"#page>.cover>.content"};var curViewInx=$$.form.addIface();$$.form.views[curViewInx].options.pageTitle=item.item,$$.form.views[curViewInx].options.buttonsInline=!1,$$.form.views[curViewInx].drawView(),$$.form.event("updaterq"),setCookie("url_hash",group.alias+"/"+item.alias)}else{var tablist=new Array;if(item.tabs)for(var i=0;i<item.tabs.length;i++)tablist.push({caption:item.tabs[i].subitem,page:item.tabs[i].page,alias:item.tabs[i].alias});else tablist.push({caption:item.item,page:item.page,alias:item.alias});for(var tabindex=0,i=0;i<tablist.length;i++){{var tabitem=tablist[i];item.page!=tabitem.page?"/"+tabitem.alias:""}tab&&tab.alias==tabitem.alias&&(tabindex=i)}var curtab=tablist[tabindex];$$.form=curtab.page,$$.form.locate("#page>.cover>.content"),$$.form.$buttonBar=$("#page>.cover>.footer>#pageToolbarButtons"),$$.form.emit("updaterq");var curtabalias=item.page!=curtab.page?"/"+curtab.alias:"";setCookie("url_hash",group.alias+"/"+item.alias+curtabalias)}return $$.form}var $$={list:MENULIST,wzlist:window.MENULISTWZ?MENULISTWZ:{},path:null,lang:null};this.list=function(){return $$.list},this.wzlist=function(){return $$.wzlist};var $menubox="#menu .spisok",$title="#page>.cover>.header>h2",$page="#page>.cover>.content";this.path=function(){var tabalias=$$.path&&$$.path.tab?"/"+$$.path.tab.alias:"";return tabalias=$$.path&&$$.path.item?"/"+$$.path.item.alias+tabalias:"",$$.path?$$.path.group.alias+tabalias:""},this.open=function(group,item,tab,switching){if(window.scrollGrid={},NOTIFY.messboxclose(),$("#pageToolbarModeSwitch").hide(),$("#pageToolbarButtons").empty(),is.string(arguments[0])){var path=arguments[0].split("?")[0].split("/"),list=$$.list.concat($$.wzlist);group=null,item=null,tab=null;for(var g=0;g<list.length&&!group;g++){var GROUP=list[g];is.empty(GROUP)||GROUP.alias==path[0]&&(group=GROUP)}if(group&&group.list)for(var i=0;i<group.list.length&&!item;i++){var ITEM=group.list[i];is.empty(ITEM)||ITEM.alias==path[1]&&(item=ITEM)}if(item&&path[2])for(var i=0;item.tabs&&i<item.tabs.length&&!tab;i++){var TAB=item.tabs[i];is.empty(TAB)||TAB.alias==path[2]&&(tab=TAB)}switching=arguments[1]}return switching=is.set(switching)?switching:!0,group||item?($$.path={group:group,item:item,tab:tab},this.form=open(group,item,tab),goTop(),this.form):null},this.find=function(value){var reslist=new Array,count=0;if(value=value.toLowerCase(),value.length){var list=$$.list.concat($$.wzlist);if($$.lang!=LANG.lang()){$$.lang=LANG.lang();for(var g=0;g<list.length;g++){var group=list[g];if(!is.empty(group)&&!group.hide)for(var i=0;i<group.list.length;i++){var item=group.list[i];!is.set(item)||is.empty(item)||item.hide||(item.translate={name:lng(item.item).toLowerCase(),description:is.set(item.description)?lng(item.description).toLowerCase():""})}}}for(var g=0;g<list.length;g++){var group=list[g];if(!is.empty(group)&&!group.hide){for(var temp=new Array,i=0;i<group.list.length;i++){var item=group.list[i];!is.set(item)||is.empty(item)||item.hide||(item.translate.name.search(value)>=0||item.translate.description.search(value)>=0)&&(temp.push(item),count++)}temp.length&&reslist.push({group:group,list:temp})}}}return{matches:reslist,count:count}},this.build=function(){function buildItem(level,el,pAlias){var classLi,classA,classChildUl,elName,chAlias="",pAlias="#"+(pAlias?pAlias+"/":"");switch(level){case 1:classLi="menu",classA="menu",classChildUl="submenu",elName=el.name,chAlias="/"+el.list[0].alias;break;case 2:classLi="submenu",classA="submenu",classChildUl="tabmenu",elName=el.item;break;case 3:classLi="tabmenu",classA="tabmenu",classChildUl=null,elName=el.subitem}var $el=$("				<li class='"+classLi+"'>					<a class='"+classA+"' href='#' langkey=\""+elName+'"></a>				</li>			').attr("_alias",el.alias);return/^\//i.test(el.alias)?($el.find(">a").attr("href",el.alias),$el.find(">a").bind("click",function(){return mayGo()||confirm(lng("leavePageMes"))?void(window.hasChanges=null):!1})):/^http/i.test(el.alias)?($el.find(">a").attr("href",el.alias),$el.find(">a").bind("click",function(){var href=this.href||"";return"ukr"==LANG.lang()&&(href=href.replace(/dns.yandex.ru/gi,"dns.yandex.ua")),!window.open(href,"_blank")})):($el.find(">a").attr("href",pAlias+el.alias+chAlias),$el.find(">a").bind("click",callback(this,function(e){if(!mayGo()&&!confirm(lng("leavePageMes")))return!1;window.hasChanges=null,clearTimeouts();var $a=$(e.currentTarget),$li=$a.parent();if(classChildUl&&$li.find(">ul."+classChildUl).length)location.href=$li.find(">ul."+classChildUl+">li:eq(0)>a").attr("href");else if($li.hasClass("active")){var href=$a.attr("href");href=href.substring(1,href.length),MENU.open(href)}else location.href=$a.attr("href");return!1}))),$el}$menubox.find("*").unbind().remove();for(var $menulist=$("<ul class='menu osn main_navigation'></ul>").appendTo($menubox),g=0;g<$$.list.length;g++){var group=$$.list[g];if(!is.empty(group)&&!group.hide){var $group=buildItem(1,group).appendTo($menulist);if(is.set(group.list))for(var $submenu=$("<ul class='submenu'></ul>").appendTo($group),i=0;i<group.list.length;i++){var item=group.list[i];if(is.set(item)&&!is.empty(item)&&!item.hide){var $item=buildItem(2,item,group.alias).appendTo($submenu);if(item.tabs&&item.tabs.length>1)for(var $tabmenu=$("<ul class='tabmenu'></ul>").appendTo($item),t=0;t<item.tabs.length;t++)buildItem(3,item.tabs[t],group.alias+"/"+item.alias).appendTo($tabmenu)}}}}translate($menubox)},this.onmodeswitchshowrq=function(){return $("#pageToolbarModeSwitch").show(),!1},this.onmodeswitchhiderq=function(){return $("#pageToolbarModeSwitch").hide(),!1},$(document).bind("ready",callback(this,function(){window.engine={simpleAir:!0},$menubox=$($menubox),$title=$($title),$page=$($page),MENU.build(),mSwitcher={bar:$("#pageToolbarModeSwitch"),button:$("#modeswitcher"),label:$(".modeswitcher-labbel"),on:$("#modeswitcher>#on"),off:$("#modeswitcher>#off")},mSwitcher.label.html(""),mSwitcher.on.attr("langkey","expert").html(lng("expert")),mSwitcher.off.attr("langkey","brief").html(lng("brief")),mSwitcher.button.attr("value",!1),mSwitcher.button.click(function(){var value=$(this).attr("value");return value?($(this).removeClass("active"),$(this).attr("value",!1)):($(this).addClass("active"),$(this).attr("value",!0)),MENU.form.event("modeswitch",value),!1}),mSwitcher.bar.hide();var colcount_search=(MENU.list(),2),$search={bar:$("#searchbar"),box:$("#searchbox"),copy:$("#searchbox>.caption span.copy"),matches:$("#searchbox>.caption .match span.count"),input:$("#SEARCH"),result:$("#searchbox>.result")};$search.bar.find("input").val(""),$search.input.bind("keyup",function(e){var str=$(e.currentTarget).val(),findres=MENU.find(str);if($search.box.css("display","block"),$search.bar.find("label").css("display","none"),$search.result.find("*").remove(),$search.copy.html("&laquo;&raquo;"),$search.matches.text("0"),findres.count){$search.copy.html("&laquo;"+str+"&raquo;"),$search.matches.text(findres.count);for(var currI=0,i=0;i<findres.matches.length;i++){for(var group=findres.matches[i].group,list=findres.matches[i].list,$block=$("                                                            <div class='block unselectable'>                                                                    <div class='group'>                                                                            <div class='title'>                                                                                    <span langkey='"+group.name+"'>"+lng(group.name)+"</span>                                                                                    <span class='count'>("+list.length+")</span>                                                                            </div>                                                                            <ul></ul>                                                                    </div>                                                                    <div class='clear'></div>                                                            </div>                                                    ").appendTo($search.result),$ul=$block.find("ul"),j=0;j<list.length;j++){var item=list[j];$("                                                                    <li>                                                                            <a href='#"+group.alias+"/"+item.alias+"' langkey='"+item.item+"'>"+lng(item.item)+"</a>                                                                            <span>-</span>                                                                            <span class='desc' langkey='"+item.description+"'>"+(is.set(lng(item.description))?lng(item.description).replace(new RegExp(str,"gi"),"<span class='mark'>"+str+"</span>"):"").toString()+"</span>                                                                    </li>                                                            ").appendTo($ul)}currI++,currI%colcount_search==0&&$search.result.append($("<div class='separator'></div>"))}}}),$search.input.bind("focusout",function(){$search.box.find("a").each(function(){$(this).is(":hover")&&(location.href=$(this).prop("href"))}),$search.box.css("display","none")})}))};window.history.pushState&&(window.history.pushState({},"",document.location.href),$(window).bind("popstate",function(){window.history.pushState({},"",document.location.href),$("#page [langkey='button_prev']").length&&MENU.open(window.location.hash.substr(1))})),$(window).bind("onbeforeunload",callback(this,function(){return mayGo()?null:lng("leavePageMes")}));