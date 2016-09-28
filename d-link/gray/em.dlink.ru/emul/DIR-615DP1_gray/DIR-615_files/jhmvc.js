/*!
 * jHMVC JavaScript Library v1.0pre
 *
 * Date: Wed Mar 24 16:16:13 2010 -0400
 */
//(function( window, undefined ) {

/**
 * @fileoverview Главный модуль библиотеки jHMVC.
 * Библиотека jHMVC представляет собой набор базовых класов для построения клиентских web приложений в соответcтвии
 * с архитетурой HMVC (Hierarchical Model View Controller).<br>
 * Основные понятия:
 * <ul>
 * 	<li>
 * 		Модель. Объект, который хранит данные в наболее подходящем для их обработки виде.
 * 	</li>
 * 	<li>
 * 		Представление. Объект, который представляет данные модели в наиболее понятном для пользователя виде.
 * 	</li>
 * 	<li>
 * 		Контроллер. Объект, управляющий связкой модели и представлений, а также иерархическими связями.
 * 	</li>
 * 	<li>
 * 		Интерфейс. Совокупность представлений на разных уровнях иерархии и имеющих один и тот-же индекс.
 * 		Интерфейсы объявляются в контроллере полем ifaceTypes.
 * 	</li>
 * 	<li>
 * 		Элемент. Контроллер в совокупности с моделью и, возможно, имеющий один или более интерфейсов.
 * </ul>
 * Основная задача базовых классов jsModel, jsView, jsController это поддержка буквы "H" в названии библиотеки, т.е.
 * иерархии элементов. Общение с сервером производится тоже с помощью интерфейса, при этом сервер рассматривается как пользователь,
 * и наиболее удобным представлением данных для этого пользователя являтся HTTP запрос. Базовым классом серверного представления является
 * jsSSideView. Базовым классом клиентского является jsCSideView. Также в главном модуле определён класс клиентского представления 
 * для отрисовки деревьев так как он является естевственным представлением иерархической сущности библиотеки.
 */


/*
 * TODO: Загнать все глобальные функции в "фирменное" пространство имён
 * Все конструкторы классов должны быть написаны таким образом, чтобы, при отсутствии
 * хотя-бы одного обязательного аргумента, они немедленно возвращали управление и не вызывали
 * ошибок. Это связано с тем, что, в случае когда вызывающий хранит список аргументов в массиве,
 * он может вызвать конструктор следующим образом в 2 этапа:
 * myObj = new myClass(); 			//создание неинициализированного объекта
 * myClass.apply(myObj, myArgs);	//инициализация объекта; myArgs - объект типа Array
 * Если myArgs, перед передачей вызывающему, был создан так:
 * myArgs = [1, 2, 3];
 * то приведённый пример аналогичен вызову:
 * myObj = new myClass(1, 2, 3)
 */ 

if (!window.INIT_SCRIPT) {
	$('head').prepend("<script src='scripts/init.js'></script>");
}

var jhmvcUID = 0;


controlTypes = {
};

/** Возвращает уникальный идентификатор.
 *  Пока это просто счётчик.
 *  @type int
 * 	@return Уникальное, в пределах window, число.
 */
function getUID(){
	return window.jhmvcUID++;
}


/** Пустая функция.
 */
function dummyFunc(){};

/** Берёт два класса и делает первый потомком второго.<br>
 *  Есть разные мнения, кто придумал функцию extend, но популяризацией она обязана Дугласу Крокфорду (http://www.crockford.com/).<br>
 * 	Функция модифицирована по сравнению с оригиналом: в прототип классов добавляется функция getAncestry(), которая
 *	возвращает родословную класса в виде массива предков в порядке от базового к производному классу.
 *  @param {Function} Child Производный класс.
 * 	@param {Function} Parent Базовый класс.
 */
function extend(Child, Parent) {
	var F = function(){};
	F.prototype = Parent.prototype;
	Child.prototype = new F();
	Child.prototype.constructor = Child;
	Child.superclass = Parent.prototype;
	Child.prototype.getAncestry = function(){
		arr = Child.superclass.getAncestry();
		arr.push(Child);
		return arr;
	}
	if(!Parent.superclass)	Parent.prototype.getAncestry = function(){return [Parent];}
}

/** Тест на существование значения.<br>
 *  Если тестируется переменная в глобальной области видимости,
 * 	используйте функцию так: no(window.val).
 *  @param {} arguments тестируемые значения.
 *  @return true если хотя бы один аргумент имеет зн. undefined или null.<br>
 *  false - все аргументы имеют адекватное значение.
 *  @type boolum
 */
function no(){
	for(var i=0;i<arguments.length;i++){
		val = arguments[i];
		if(val == undefined || val == null) return true;
	}
	return false
}


/** Запускает callback в нужном контексте.<br>
 * 	usage: context(&lt;context&gt;).callback('&lt;method&gt;')<br>
 * 	Идея взята из статьи Jason Pincin <a href='http://knol.google.com/k/jquery-callback-contexts'>jQuery Callback Contexts</a>
 *  @param {Object}	context Контекст.
 *  @type Object
 *  @return	callback-оболочка запускающаю целевой callback.
 */
/*function context(context){
	var co = {
		callback: function(method){
//			if(typeof method == 'string') method = context[method];
			var cb = function(){return method.apply(context, arguments);}
			return cb;
		}
	};
	return co;
}*/

/** Безопасный поиск перевода.
 *  Предполагается, что если список ключевых слов есть, то он в объекте lang.
 *  @param {String}	key Ключевое слово.
 *  @return	Перевод или key.
 */
/*function lng(key){
	var trans = key;
	var lang = window.lang;
	var baselang = window.baselang;
	if(lang && lang[key]){
		trans = lang[key];
	}
	else if(baselang && baselang[key]){
		trans = baselang[key];
	}
	return trans;
}*/

/*
======================================================================
sprintf()
======================================================================
Purpose : format a string
Author : Antoine Hurkmans, January 2002

----------------------------------------------------------------------
Parameters :
you may figure this one out yourself (hint: www.php.net/sprintf)
----------------------------------------------------------------------
Returns : a formatted string
----------------------------------------------------------------------
Revision History :
16-Jul-08 SA - Fixed bug with using undefined aMatch[...] values
               and added integer precision support like "%.2d"
12-Feb-02 AH - Added support for alternate padding char
05-Feb-02 AH - Fixed bug in display of decimal part for floats
28-Jan-02 AH - Initial Version
======================================================================
*/
function sprintf() {
var iCount, iPadLength, aMatch, iMatchIndex = 1;
var bAlignLeft, sPad, iWidth, iPrecision, sType;
var aArgs = sprintf.arguments;
if (aArgs.length < 2) return '';
 var sFormat = aArgs[0];
 var re = /%(-)?(0| |'.)?(\d+)?(\.\d*)?([bcdfosxX]{1})/;
 var i;

 while (re.test(sFormat)) {
  aMatch = re.exec(sFormat);
  for(i=0;i<aMatch.length;i++){
	  aMatch[i] = aMatch[i]?aMatch[i]:"";
  }
  bAlignLeft = (aMatch[1] == '-');
  sPad = (aMatch[2] == '' ? ' ' : aMatch[2]);
  if (sPad.substring(0, 1) == "'") sPad = sPad.substring(1);
  sPad = "";
  iWidth = (aMatch[3] > 0 ? parseInt(aMatch[3]) : 0);
  sType = aMatch[5];
  mArgument = (aArgs[iMatchIndex] != null ? aArgs[iMatchIndex] : '');
  ++iMatchIndex;
  if (mArgument.toString().length) {
   if ('fbcdoxX'.indexOf(sType) != -1 && isNaN(mArgument)) mArgument = 0;
   switch (sType) {
    case 'f': // floats
     var iPower = Math.pow(10, iPrecision);
     mArgument = (Math.round(parseFloat(mArgument) * iPower) / iPower).toString();
     var aFloatParts = mArgument.split('.');
     iPrecision = (aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 6);
     if (iPrecision > 0) {
      if (aFloatParts.length == 1) aFloatParts[1] = '';
      // pad with zeroes to precision
      for (iCount = aFloatParts[1].length; iCount < iPrecision; iCount++)
       aFloatParts[1] += '0';
      mArgument = aFloatParts[0] + '.' + aFloatParts[1];
     } else mArgument = aFloatParts[0];
     iPadLength = aFloatParts[0].length;
     break;
    case 'b': // binary
     mArgument = parseInt(mArgument).toString(2);
     iPadLength = mArgument.length;
     break;
    case 'c': // character
     mArgument = String.fromCharCode(parseInt(mArgument));
     break;
    case 'd': // decimal
     mArgument = mArgument.toString();
     iPadLength = mArgument.length;
     break;
    case 'o': // octal
     mArgument = parseInt(mArgument).toString(8);
     iPadLength = mArgument.length;
     break;
    case 'x': // hexadecimal (lowercase)
     mArgument = parseInt(mArgument).toString(16);
     iPadLength = mArgument.length;
     break;
    case 'X': // hexadecimal (uppercase)
     mArgument = parseInt(mArgument).toString(16).toUpperCase();
     iPadLength = mArgument.length;
     break;
    default: // strings
     mArgument = mArgument.toString();
     iPadLength = mArgument.length;
    }
   if(sType == 'b' || sType == 'd' || sType == 'o' || sType == 'x' || sType == 'X'){
       iPrecision = (aMatch[4].length > 1 ? parseInt(aMatch[4].substring(1)) : 1);
	   if(iPrecision > mArgument.length){
           zeros = "";
		   for(i=0;i<(iPrecision-mArgument.length);i++){
			   zeros += "0";
		   }
		   mArgument = zeros + mArgument;
	   }
   }
    if ('fbdoxX'.indexOf(sType) != -1) {
     // pad with padding-char to width
     if (bAlignLeft)
      for (iCount = iPadLength; iCount < iWidth; iCount++)
       mArgument += sPad;
     else
      for (iCount = iPadLength; iCount < iWidth; iCount++)
     mArgument = sPad + mArgument;
    }
   }
   sFormat = sFormat.replace(re, mArgument);
  }

 return sFormat;
}

/** Создаёт новый экземпляр класса jsModel.
 *  @class Представляет базовую функциональность модели.
 *  @constructor
 */
function jsModel(){
	/**Ссылка на контроллер.*/
	this.ctrl = null;
}

/** Создаёт новый экземпляр класса jsView
 *  @class Представляет базовую функциональность представления.
 *  @constructor
 *  @param {int} viewInx Индекс интерфейса, к которому будет принадлежать представление.
 * 						 Нужен для вызова конструкторов детей.
 * 	@param {Object}	ctrl Ссылка на контроллер.
 * 	@param {Object}	options Опции представления.
 */
function jsView(ctrl, viewInx, options){
	if(no(ctrl, viewInx)) return;

	/**Индекс интерфейса, к которому будет принадлежать представление.*/
	this.viewInx = viewInx;
	/**Ссылка на контроллер.*/
	this.ctrl = ctrl;
	/**Опции представления.*/
	this.options = options?options:{};

	/** Вызов updateModel детей и запуск события updmodel.<br>
	*   Методы производного класса должны вызывать его в КОНЦЕ, а не в начале.
	*   @type	bool
	* 	@return	Результат обновления модели.
	*/
	jsView.prototype.updateModel = function(){
		var child = null;
		var children = null;
		var res = !this.statusCode;
		
		children = this.ctrl.children;
		for(var i in children){
			child = this.getChild(i);
			if(child instanceof jsView){
				res &= child.updateModel();
			}
		}
		this.ctrl.event("updmodel", this.ctrl.model);
		return res;
	}

	/** Вызов updateView детей
	*/
	jsView.prototype.updateView = function(){
		var child = null;
		var children = null;

		children = this.ctrl.children;
		for(var i in children){
			child = this.getChild(i);
			if(child instanceof jsView) child.updateView();
		}
	}
	
	/** Привязывает обработчик к событию контроллера.
	*   @param {String}	eventType	Тип события.
	* 	@param {int}	viewInx		Индекс представления.
	*/
	jsView.prototype.bind = function(eventType, handler){
		this.ctrl.addEventHandler(eventType, handler, this.viewInx);
	}

	/** Простой доступ к любому представлению-предку в иерархии.
	 * @param	arg		Номер в иерархии или тип контроллера.
	 * 					Если аргумент не задан считается что был передан номер в иерархии равный 1.
	 * 					Если был передан тип контроллера, то будет найден первый контроллер заданного типа.
	 * @return			Объект представления или пустой объект {}.
	 */
	this.getParent = function(arg){
		var obj = this.ctrl.getParent(arg);
		if(obj.views){
			obj = obj.views[this.viewInx];
		}
		return obj;
	}

	/** Простой доступ к любому представлению-потомку в иерархии.
	*   @param	arguments	Массив аргументов - массив индексов для доступа в массив children
	*   @type	Object
	*   @return				Объект представления или пустой объект {}
	*/
	this.getChild = function(){
		var obj = this.ctrl.getChild.apply(this.ctrl, arguments);
		if(obj.views){
			obj = obj.views[this.viewInx];
		}
		return obj;
	}

	if(!options.plainIface){
		var children = this.ctrl.children;
		var child;
		for(var i in children){
			child = children[i];
			if(child instanceof jsController){
				child.changeIface(viewInx, this, this.options);
			}
		}
	}
		
	/**Вызов валидаторов детей и запуск события validate.<br>
	 * statusCode устанавливается методами validate
	 * производного класса, которые должны вызывать в КОНЦЕ работы
	 * validate базового класса.
	 * statusCode должен являеться ключём глобального объекта lang.
	 * @type	bool
	 * @return	false - содержимое неких полей не корректно.
	 * 			true - содержимое неких полей корректно.
	 */
	jsView.prototype.validate = function(){
		var res = !this.statusCode;
		var obj = null;
		var children = this.ctrl.children;
		if(children.length){
			for(var i in children){
				obj = this.getChild(i);
				if(obj instanceof jsView){
					res &= obj.validate();
				}
			}
		}
		return res;
	};

	/**Установить опцию.
	 * @param 	name	Имя.
	 * @param	value	Значение.
	 */
	jsView.prototype.setOption = function(name, value){
		var children = this.ctrl.children;
		var child;

		this.options[name] = value;
		for(var i=0;i<children.length;i++){
			child = this.getChild(i);
			if(child instanceof jsView)	child.setOption(name, value);
		}
		
	}
	
	/**Код ошибки выявленной валидатором. Он должен являеться ключём глобального объекта lang.*/
	this.statusCode = null;
}

/**Создаёт новый экземпляр класса jsController
 * @class Представляет базовую функциональность контроллера.
 * @constructor
 */ 
function jsController(){

	/**Добавить интерфейс.<br>
	 * Эта функция всего лиш обёртка чтобы добавлять интерфейс в более привычной форме.
	 * @param	{jsView}		parentView - родительское представление, конструктор которого ещё не вернул управление, 
	 * 							потому нельзя брать через this.ctrl.parent.
	 * @param	{Object}		parentOptions Опции родительского представления.
	 * @type	int
	 */
	this.addIface = function(parentView, parentOptions){
//		var viewInx = this.views.length;
		var viewInx = window.getUID();
		this.changeIface(viewInx, parentView, parentOptions);
		return viewInx;
	}

	/**Вычеркнуть интерфейс из списка.
	 * @param	{int}	viewInx	Индекс представления в массиве представлений.
	 */
	this.unlinkIface = function(viewInx){
		var children = this.children;
		var handlers = this.handlers;
		var child;
		for(var i in children){
			child = children[i];
			if(child instanceof jsController){
				child.unlinkIface(viewInx);
			}
		}
		this.views[viewInx] = null;
		//удалить хандлеры для этого интерфейса
		//TODO: добавить это в тесты
		for(var i in handlers){
			handlers[i][viewInx] = null;
		}
	}

	/**Изменить интерфейс на интерфейс другого типа.
	 * Кроме аргументов на работу метода влияет поле nextIface, которое является ключём
	 * в объекте ifaceTypes. Если nextIface == null, то метод пытается найти представление
	 * имеющего ближайшего общего предка с типом parentView. Чтобы прервать создание интерфейса
	 * на этом контроллере надо установить nextIface в значение, которого нет ifaceTypes.
	 * @param	{int}		viewInx			Индекс представления в массиве представлений.
	 * @param	{jsView}	parentView		Родительское представление, конструктор которого ещё не вернул управление, 
	 * 										потому нельзя брать через this.ctrl.parent.
	 * @param	{Object}	parentOptions	Опции родительского представления.
	 * 										Метод осуществляет наследование опции родительского представления.
	 */
	this.changeIface = function(viewInx, parentView, parentOptions){
		var options = new Object();
		var pOptions = parentOptions?parentOptions:{};
		var integrate = null;
		
		
		if(this.nextIface){
			iface = this.ifaceTypes[this.nextIface];
			this.lastIface = this.nextIface;
			this.nextIface = null;
			if(iface){
				$.extend(options, pOptions, iface.options?iface.options:{});
				this.views[viewInx] = new iface.type(this, viewInx, options);
			}
		}
		else{
			if(this.parent){
//				if(this.constructor == this.parent.constructor){
				if(false){
					//наследование в смысле DOM происходит только в случае если контроллер this
					//имеет тот-же тип или является производным от this.parent
					//это упрощённый вариант
					//TODO: чтобы можно было взять отдельно опции конструкторов представлений каждого базового класса
					//      в этом случае можно наследовать от this.parent только опции общих предков
					this.views[viewInx] = new parentView.constructor(this, viewInx, parentView.options);
				}
				else{
					//если наследования в смысле DOM не получилось,
					//создаём интерфейс по умолчанию имеющий ближайшего общего предка с типом parentView
					ancestors1 = parentView.getAncestry();
					iface = null;
					ifaceTypes = this.ifaceTypes;
					for(var i=ancestors1.length-1;i>=0;i--){
						ancestor1 = ancestors1[i];
						cmin = 1000000;
						jj = -1;
						for(var j in ifaceTypes){
							ancestors2 = ifaceTypes[j].type.prototype.getAncestry();
							inx = $.inArray(ancestor1, ancestors2);
							if(inx >= 0){
								ccur = ancestors2.length - 1 - inx;
								if(ccur <= cmin){
									if(ccur == cmin){
										if(ifaceTypes[j].def){
											iface = ifaceTypes[j];
										}
									}
									else{
										iface = ifaceTypes[j];
										cmin = ccur;
									}
								}
							}
						}
						if(iface) break;
					}
					if(iface){
						$.extend(options, pOptions, iface.options?iface.options:{});
						// this.views[viewInx] = new iface.type(this, viewInx, options);
					}
				}
			}
		}
	}
	
	

	/**Изменить дочерний объект на другой дочерний объект.
	 * @param	{int}			childInx	Индекс дочернего объекта.
	 * @param	{jsController}	childObj	Дочерний объект.
	 * @param	{String}		alias		Псевдоним объекта.
	 * @type	jsController
	 * @return	Созданный объект.
	 */
	this.changeChild = function(childInx, childObj, alias){
		this.children[childInx] = childObj;
		childObj.integrate(childInx, this);
		if(alias) this.children[childInx].setAlias(alias);
		if(this.active && !childInx && this.activateToBottom) childObj.activate();
		return childObj;
	}

	/**Установить псевдоним контроллеру по которому к нему будет можно обращаться вместо индекса в массиве children.
	 * @param	{String}	alias	Псевдоним.
	 */
	this.setAlias = function(alias){
		this.alias = alias;
		if(this.parent){
			this.parent.children_refs[alias] = this;
		}
	}
	
	/**Добавить дочерний объект.
	 * @param	arguments	Массив аргументов интерпретируется методом по разному.
	 * 						obj1, obj2, ... - массив дочерних объектов.
	 * 						За obj может следовать строка-псевдоним, например:
	 * 						obj1, alias1, obj2, alias2, ...
	 * 						А в таком случае obj1 будет иметь alias3:
	 * 						obj1, alias1, alias2, alias3
	 * @type	jsController
	 * @return				Первый добавленный объект.
	 */
	this.addChild = function(){
		var j = -1;
		for(var i=0;i<arguments.length;i++){
			if(arguments[i] instanceof jsController){
				j = this.children.length;
				this.changeChild(j, arguments[i]);
			}
			else if(j >= 0){
				var obj = this.getChild(j);
				var alias = arguments[i];
				obj.setAlias(alias);
			}
		}
		return arguments[0];
	}

	/**Изменить объект модели на другой объект.
	 * @param	{Object}	modelObj	Объект модели.
	 */
	this.changeModel = function(modelObj){
		this.model = modelObj;
		this.model.ctrl = this;
	}

	/**Сбросить активный дочерний контроллер, если таковой есть.
	 * По фактической деактивации контроллера запускается событие "deactivate".
	 * Когда контроллер отмечается для деактивации запускается событие "predeactivate".
	 * Эти 2 события отличаются направлением распространения:
	 * deactivate - снизу вверх,
	 * predeactivate - сверху вниз.
	 * Если бы deactivate распространялось сверху вниз, то получилось бы что у нективного 
	 * контроллера есть активные потомки, а это противоречит логике библиотеки.
	 */
	this.deactivateChild = function(){
		if(this.childActiveInx >= 0){
			var child = this.children[this.childActiveInx];
			if(!child.root){
				child.event("predeactivate");
				child.deactivateChild();
				child.active = false;
				child.activatedByIface = null;
				this.childActiveInx = -1;
				child.event("deactivate");
			}
		}
	}

	/**Удалить дочерний контроллер.
	 * Дочерний объект удаляется из children и children_refs, если есть псевдоним.
	 * Причём объект именно удаляется а не устанавливается в null.
	 * @param	id	Идентификатор дочернего объекта.
	 * 				Задаётся либо как индекс, либо как псевдоним.
	 */
	this.unlinkChild = function(id){
		if(parseInt(id, 10).toString() != "NaN"){
			//Это индекс
			var alias = this.children[id].alias;
			this.children.splice(id, 1);
			if(alias){
				delete this.children_refs[alias];
			}
			if(this.childActiveInx == id) this.childActiveInx = -1;
		}
		else{
			//Это псевдоним
			var inx = this.getInxByAlias(id);
			this.children.splice(inx, 1);
			delete this.children_refs[id];
			if(this.childActiveInx == inx) this.childActiveInx = -1;
		}
	}

	/**Сделать контроллер активным.
	 * По фактической активации контроллера запускается событие "activate".
	 * Когда контроллер отмечается для активации запускается событие "preactivate".
	 * Эти 2 события отличаются направлением распространения:
	 * activate - сверху вниз,
	 * preactivate - снизу вверх.
	 * Если бы activate распространялось снизу вверх, то получилось бы что у активного 
	 * контроллера есть нективные предки, а это противоречит логике библиотеки.
	 * @param	{bool}	force	Активировать не спросив родителя.
	 */
	this.activate = function(force){
		this.event("preactivate");
		if(!force){
			if(this.parent && !this.root){
				if(this.parent.active){
					this.parent.deactivateChild();
					this.parent.childActiveInx = this.thisInx;
				}
				else{
					this.parent.childActiveInx = this.thisInx;
					this.parent.activatedByIface = this.activatedByIface;
					this.parent.activate();
				}
			}
		}
		this.active = true;
		this.event("activate");

		if(this.childActiveInx < 0){
			if(this.activateToBottom){
				if(this.children.length){
					this.children[0].activatedByIface = this.activatedByIface; 
					this.children[0].activate(true);
					this.childActiveInx = 0;
				}
			}
		}
		else if(this.children[this.childActiveInx].active && !this.activateToBottom){
			this.deactivateChild();
		}
	}

	/**Запустить событие.<br>
	 * Обработчик должен вернуть true, чтобы событие всплыло.
	 * @param	{String}	eventType	Тип события.
	 * @param	{Object}	eventObject	Объект события.
	 * @param	{bool}		bubble	Всплывать даже если нет обработчиков.
	 */
	this.event = function(eventType, eventObject, bubble){
		var handlers;
		var parent;
		var handler;
		var res = true;
		
		//вызываем обработчики контроллера
		handlers = this.ctrlHandlers[eventType];
		if(handlers instanceof Array){
			for(var i in handlers){
				handler = handlers[i];
				if(handler instanceof Function){
					res &= handlers[i].call(this, eventObject);
					bubble = true;
				}
			}
		}

		//вызываем обработчики представлений.
		//Может быть только один обработчик на представление.
		handlers = this.handlers[eventType];
		if(handlers){
			for(var i in handlers){
				handler = handlers[i];
				if(handler instanceof Function){
					res &= handlers[i].call(this.views[i], eventObject);
					bubble = true;
				}
			}
		}

		//всплытие
		if(res && bubble){
			parent = this.getParent();
			if(parent instanceof jsController){
				parent.event(eventType, eventObject, bubble);
			}
		}
	}


	/**Добавить обработчик события.<br>
	 * Это низкоуровневая функция добавления обработчика события контроллера.
	 * Если нужно добавить обработчик представлению, пользуйтесь её фронтэндом их jsView - bind.
	 * Если нужно добавить обработчик контроллера можно использовать функцию напрямую.
	 * При добавлении обработчика в контроллер возможно добавить их несколько. Такую фичу планируется
	 * сделать также и для обработчиков в представлениях.
	 * @see		jsView#bind
	 * @param	{String}	eventType	Тип события.
	 * @param	{int}		viewInx		Индекс представления. Если параметр не передан, обработчик добавляется самому контроллеру.
	 * @param	{Function}	handler		Обработчик.
	 */
	this.addEventHandler = function(eventType, handler, viewInx){
		if(no(eventType) || no(handler)) return;
		if(!no(viewInx)){
			if(!this.handlers[eventType]){
				this.handlers[eventType] = new Array();
			}
			this.handlers[eventType][viewInx] = handler;
		}
		else{
			if(!(this.ctrlHandlers[eventType] instanceof Array)){
				this.ctrlHandlers[eventType] = [];
			}
			this.ctrlHandlers[eventType].push(handler);
		}
	}
	
	/**Простой доступ к любому контроллеру-предку в иерархии.
	 * @param	arg		Номер в иерархии или тип контроллера.
	 * 					Если аргумент не задан считается что был передан номер в иерархии равный 1.
	 * 					Если был передан тип контроллера, то будет найден первый контроллер заданного типа.
	 * @type		Object
	 * @return	Объект контроллера или пустой объект {}
	 */
	this.getParent = function(arg){
		var type;
		var i;
		if(arg instanceof Object){
			i = -1;
			type = arg;
			obj = this;
			while(i){
				i--;
				obj = obj.parent;
				if(no(obj)){
					obj = {};
					break;
				}
				if(type && obj instanceof type) break;
			}
		}
		else{
			i = no(arg)?1:arg;
			obj = this;
			while(i && !no(obj.parent)){
				i--;
				obj = obj.parent;
			}
			if(i > 0) obj = {};
		}
		return obj;
	}
	
	/**Простой доступ к любому контроллеру-потомку в иерархии.
	 * @param	arguments	Массив аргументов - массив индексов для доступа в массив children.
	 * 						Если аргументов нет, то берётся 1ый потомок в иерархии.<br>
	 *       				Пример 1:<br>
	 * 		   					<code>obj = getChild();</code>
	 * 							аналогично
	 * 							<code>obj = this.children[0];</code><br>
	 * 						Пример 2:<br>
	 * 							<code>obj = getChild(0, 5, 3);</code>
	 * 							аналогично
	 * 							<code>obj = this.children[0].children[5].children[3];</code>
	 * @type	Object
	 * @return	Объект контроллера или пустой объект {}
	 */
	this.getChild = function(gen){
		var l = arguments.length;
		var obj;
		var j;
		if(!l){
			obj = this.children[0];
		}
		else{
			obj = this;
			for(var i=0;i<l;i++){
				j = arguments[i];
				if(parseInt(j).toString() == "NaN"){
					obj = obj.children_refs[j];
				}
				else{
					obj = obj.children[j];
				}
				if(!obj) break;
			}
		}
		if(!obj) obj = {};
		return obj;
	}

	/**Получить индекс ребёнка по его псевдониму.
	 * @param	{String}	alias	Псевдоним дочернего объекта.
	 * @type	int
	 * @return						Индекс объекта в массиве children родителя.
	 */
	this.getInxByAlias = function(alias){
		var children = this.children;
		var inx = null;
		var child;
		
		for(var i in children){
			child = children[i];
			if((child instanceof jsController) && child.alias == alias){
				inx = i;
				break;
			}
		}
		
		return inx;
	}
	
	/**Встроить контроллер в иерархию
	 * @param	{int}		childInx	Индекс объекта в массиве children родителя.
	 * @param	{jsController}	parent		Родитель.
	 */
	jsController.prototype.integrate = function(childInx, parent){
		this.thisInx = childInx;
		this.parent = parent;
		this.activateToBottom = parent.activateToBottom;
	}

	/**Описать потомков с помощью массива или объекта специального формата.
	 * Также описываются опции и название следующего интерфейса который будет создан.
	 * Метод используется для упрощения процесса создания web форм, т.к. контроллеры и опции представления указываются в одном месте.
	 * Если требуется более одного интерфейса/представления, можно, например, в конструкторе 2го представления проставить nextIface потомков
	 * и изменить опции требующие изменения "вручную".
	 * Контроллеры потомков 2ой раз создаваться не будут.
	 * @param {Object}	obj	Массива или объект описания потомков специального формата.
	 * 						массив:
	 * 								[
	 * 									{
     * 										ctrl: <объект контроллера>,
     * 										nextIface: <название следующего создаваемого интерфейса>,
     * 										options: {...},
     * 										alias: <псевдоним контроллера>
     * 									},
     * 									...
     * 								]
     * 						объект:
     * 								{
	 *									<alias>: {
	 * 										ctrl: <объект контроллера>,
	 * 										nextIface: <название следующего создаваемого интерфейса>,
	 *                                      options: {...},
	 * 										inx: <индекс потомка>
	 * 									},
	 * 									...
	 * 								}
	 */
	jsController.prototype.describe = function(obj){
		var child;
		var item;
		var typeParser;
		var children;
		var children_refs;
		for(var i in obj){
			typeParser = controlTypes[obj[i].type];
			if(typeParser) typeParser(obj[i]);
			if(obj instanceof Array){
				child = this.getChild(obj[i].alias);
				if(!(child instanceof jsController)){
					child = this.addChild(obj[i].ctrl, obj[i].alias);
				}
			}
			else{
				child = this.getChild(obj[i].inx);
				if(!(child instanceof jsController)){
					child = this.changeChild(obj[i].inx, obj[i].ctrl, i);
				}
			}
			child.nextIface = obj[i].nextIface;
			if(obj[i].options && child.nextIface && child.ifaceTypes[child.nextIface]){
				var srcOpt = child.ifaceTypes[child.nextIface].options;
				srcOpt = srcOpt?srcOpt:{};
				child.ifaceTypes[child.nextIface].options = $.extend(true, srcOpt, obj[i].options);
			}
			//Рекурсия
			if(obj[i].children_refs){
				children_refs = obj[i].children_refs;
				obj[i].children = [];
				children = obj[i].children;
				for(var j in children_refs){
					children[children_refs[j].inx] = children_refs[j];
					children[children_refs[j].inx].alias = j;
				}
			}
			if(obj[i].children){
				this.getChild(i).describe(obj[i].children);
			}
		}
	}
	
	/**Объявление интерфейсов контроллера.
	 * Класс jsController не имеет интерфейсов.
	 * Интерфейсы объявляются в производных классах
	 * следующим образом:
	 * <code>
	 * ifname: {type:jsSomeViewClass, options:optionsObject}
	 * </code>
	 */
	this.ifaceTypes = {
//		treeFrame: {type:jsViewTree}
	}

	/**Привилегия.<br>
	 * Позволяет или запрещает определённые действия как правило путём изменения
	 * внешнего вида представлений клиентской стороны.
	 * На самом деле что-то запретить javascript'ом по настоящему невозможно,
	 * поэтому данное свойство лиш делает адекватным внешний вид представлений,
	 * а для ограничения доступа должны быть задействованы серверные механизмы.
	 * По умолчанию даны привилегии администратора.
	 */
	jsController.prototype.privilege = "admin";

	/**Массив дочерних объектов. Тип Array используется что сохранить порядок элементов в списке.
	 * @type	Array 
	 */
	this.children = new Array();
	/**Cсылки на детей для быстрого доступа по псевдонимам*/
	this.children_refs = new Object();
	/**Ссылка на родительский объект
	 */
	this.parent = null;
	/**Экземпляр модели
	 * @type jsModel
	 */
	this.model = null;
	/**Массив представлений.<br> 
	 * Представления разных уровней иерархии с одинаковым индексом в этом массиве
	 * образуют интерфейс.
	 * @see #changeIface
	 * @type Array
	 */
	this.views = new Array();
	/**URL сервера.<br> 
	 * Имеет смысл устанавливать только для "гостевых" контроллеров.
	 * при интеграции вебинтерфейсов разных устройств,
	 * но данная возможность ещё использовалась и не проверялась.
	 */
	this.serverUrl = null;
	/**Признак того, что контроллер активный.
	 * Это некий аналог фокуса.
	 * @type bool
	 */
	this.active = false;
	/**Устанавливается представлением, из которого активировали контроллер.
	 * Если контроллер активирован программно, то activatedByIface = null.
	 */
	this.activatedByIface = null;
	/**Индекс активного дочернего объекта.
	 * @type int
	 */
	this.childActiveInx = -1;
	/**Индекс контроллера в массиве this.parent.children.
	 * @type int
	 */
	this.thisInx = 0;
	/**Массив обработчиков событий (для контроллера). Исполняются перед обработчиками в this.handlers.
	 * Имя события 1: массив обработчиков.
	 * Для одного события может быть несколько обработчиков.
	 * @type Array
	 */
	this.ctrlHandlers = {};
	/**Двумерный массив обработчиков событий (для представлений)
	 * Имеет структуру:
	 * Имя события 1: массив представлений.
	 * Имя события 2: массив представлений.
	 * Номер в массиве представлений соответствует индексу в this.views, т.е. номеру интерфейса.
	 * Для одного события может быть только один обработчик в одном представлении.
	 * @type Array
	 */
	this.handlers = new Array();
	/**Активировать дочерние объекты
	 */
	this.activateToBottom = true;
	/**Ключ в ifaceTypes, который задаёт this.parent когда хочет жёстко определить интерфейсы своих детей
	 * @type String
	 */
	this.nextIface = null;
	/**Последний, nextIface.
	 * @type String
	 */
	this.lastIface = null;
	/**Общее количество интерфейсов для всех контроллеров. 
	 * Инкрементируется и используется только в корневом контроллере.
	 * @type int
	 */
	this.totalIfaceCount = 0;
	/**Псевдоним контроллера.
	 * По этому псевдониму контроллер можно найти в this.children_refs родителя.
	 * @type String
	 */
	this.alias = null;
	/**Признак корневого контроллера.
	 * Два разных корневых контроллера имеют независимую логику выбора активных контроллеров.
	 * Снятие признака "нагорячую пока не поддерживается".
	 * @type bool
	 */
	this.root = false;
}


/**Создаёт новый экземпляр класса jsSSideView
 * @class 							Представляет базовую функциональность представлений серверной стороны
 * @constructor
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 									jsSSideView принимает следующие опции:<br>
 * 									action - то-же что и action в HTML форме.<br>
 * 									method - то-же что и method в форме.<br>
 * 									dataType - установить в "json", если надо преобразовать данные перед отправкой в JSON строку.
 */
function jsSSideView(ctrl, viewInx, options){
	options = options?options:{};
	if(options.action){
		/**Считать это представление отправителем 
		 * в отличие от других представлений интерфейса, которые
		 * просто добавляют свои данные в запрос.
		 * @type jsSSideView
		 */
		this.sender = this;
		options.sender = this;
		/**То-же что и action в HTML форме.
		 * Дублирует соотв. опцию наследование которой прерывается.
		 * @type String
		 */
		this.action = options.action;
		options.action = null;
	}
	else{
		this.sender = options.sender;
	}
	if(options.method){
		/**То-же что и method в HTML форме.
		 * Дублирует соотв. опцию наследование которой прерывается.
		 * @type String
		 */
		this.method = options.method;
		options.method = null;
	}
	jsSSideView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Обработка полученных с сервера данных.
	 * 1. Инициализации this.responseData пришедшими данными.
	 * 2. Обновление модели детей.
	 * 3. Вызов метода checkServerData корневого контроллера если он существует.
	 * 		checkServerData принимает как аргумент данные принятые от сервера и возвращает bool:
	 * 		true - продолжить обработку принятых данных,
	 * 		false - отменить обработку принятых данных.
	 * См. <a href='http://api.jquery.com/ajaxSuccess/'></a>
	 * @param	{Object}	data		Данные.
	 * @param	{String}	textStatus	Текстовое описание статуса.
	 */
	this.sendSuccess = function(data){
		this.xmlhttprequest = null;
		try{
			if(data){
				this.responseData = data;
			}
			else{
				this.responseData={};
			}
			if(!this.rootCtrl){
				this.rootCtrl = window.rootCtrl; //this.ctrl.getParent(-1);
			}
			if(this.rootCtrl.checkServerData instanceof Function){
				if(!this.rootCtrl.checkServerData(this.responseData)){
					return;
				}
			}
		}
		catch(e){
			this.responseData={baddata:true};
		}
		this.updateModel(true);
		if(this.refreshTime > 0){
			this.refreshId = setTimeout(context(this).callback(this.updateView), this.refreshTime);
		}
		
	}
	
	/**Отослать данные серверу и/или подготовить их к отправке.
	 * Отсылает данные только тот у кого установлен this.action.
	 * Все остальные только подготавливают данные к отправке собирая из строке requestData отправителя,
	 * для чего в серверных представлениях имеется ссылка на отправителя this.sender.
	 * Все представления, которые имеют что сказать серверу, должны определить метод prepareData.
	 * Метод prepareData дописывает в конец строки requestData свои параметры в виде "name1=val1&name2=val2...".
	 */
	this.updateView = function(){
		if(this.action) this.requestData = null;	//сброс данных предыдующего запроса
		if(this.prepareData instanceof Function) this.prepareData(); 
		jsSSideView.superclass.updateView.call(this);
		if(this.action && !window.isIdle)	this.sendRequest();
	}
	
	/**Запрещает вызов updateModel детей (не вызывая метод базового класса) для класса который
	 * делал запрос к серверу если вызов updateModel инициировало не это представление,
	 * для этого sendSuccess должен вызвать updateModel(true).
	 * Все представления, которым есть что взять от сервера, должны определить метод pickData.
	 * @param	{bool}	force	Не запрещать обновление модели и погружение в иерархию.
	 * @type	bool
	 * @return					Результат обновления модели.
	 * @see	jsView#updateModel
	 */
	this.updateModel = function(force){
		if((this.action && force) || !this.action){
			if(this.pickData instanceof Function) this.pickData();
			return jsSSideView.superclass.updateModel.call(this);
		}
		return true;
	}
	
	/**Осуществляет запрос к серверу.
	 * Также он вызывает метод checkClientData корневого контроллера если он существует.
	 * 		checkClientData принимает как аргумент данные для отправки на сервер и возвращает изменённые данные.
	 * 		Если checkClientData ничего не возвращает - отправка данных отменяется.
	 */
	this.sendRequest = function(){
		var url = ctrl.serverUrl?ctrl.serverUrl:"";
		$(window).bind("ajaxError", context(this).callback(this.onajaxerror));
		this.requestData += "&proxy=y";
		if (mode_emul) {
			var action = this.action.toString();
			var url = CGI_URL;
			var patt = /index.cgi$/;
			if (!patt.test(action)) {
				url = url.replace('index.cgi', '');
				url += action;
			}
			device.request(url, this.method, this.requestData, context(this).callback(this.sendSuccess));
		} else {
			device.request(url + "/" + this.action, this.method, this.requestData, context(this).callback(this.sendSuccess));
		}
//		device.request(CGI_URL, this.method, this.requestData, context(this).callback(this.sendSuccess));
/*		if(this.method == "post"){
			this.xmlhttprequest = $.post(url + "/" + this.action, this.requestData, context(this).callback(this.sendSuccess));
		}
		else{
			this.xmlhttprequest = $.get(url + "/" + this.action, this.requestData, context(this).callback(this.sendSuccess));
		}*/
	}
	
	/**Обработчик события ajaxError.
	 * См. <a href='http://api.jquery.com/ajaxError/'></a>
	 * Внимание!!! Должен вызываться в контексте представления
	 */
	this.onajaxerror = function(){
		var isItMyError = this.xmlhttprequest &&
						this.xmlhttprequest.readyState == 4 &&
						this.xmlhttprequest.status != 200;
		if(isItMyError) this.xmlhttprequest = null;
		if(isItMyError && this.refreshTime > 0 && !this.stopOnAjaxError){
			this.refreshId = setTimeout(context(this).callback(this.updateView), this.refreshTime);
		}
	}

	/**Пребразовать javascript объект в строку запроса this.sender.requestData.
	 * Также он вызывает метод checkClientData корневого контроллера если он существует.
	 * checkClientData принимает как аргумент данные для отправки на сервер и возвращает изменённые данные.
	 * В отличие от checkServerData checkClientData не может отменить отправку данных.
	 * Если установлена опция "json", то данные перед отправкой преобразовываются в JSON строку.
	 * Эта опция требует наличия jquery плагина <a href = 'http://code.google.com/p/jquery-json/'>jquery.json</a>.
	 * @param	{Object}	obj	Object или Array (ассоциативный)
	 */
	this.addToRequest = function(obj){
		var sender = this.sender;
		var splitter = '';
		
		if(this.options.dataType && this.options.dataType == "json"){
			sender.requestData = $.toJSON(obj);
		}
		else{
			if(!sender.requestData){
				splitter = "";
				sender.requestData = "";
			}
			else{
				splitter = "&";
			}
		
			if(!this.rootCtrl){
				this.rootCtrl = window.rootCtrl; //this.ctrl.getParent(-1);
			}
			for(var key in obj){
				if(this.rootCtrl.checkClientData instanceof Function){
					obj[key] = this.rootCtrl.checkClientData(obj[key]);
				}
				sender.requestData += splitter + key + "=" + obj[key];
				splitter = "&";
			}
		}
	}

	/**Запустить обновление после задержки delay.
	 * @param	{int}	delay			Начальная задержка в милисекундах.
	 * @param	{int}	period			Период обновления:  >0 - время в милисекундах, 0 - отключен.
	 * @param	{bool}	stopOnAjaxError	Остановить обновление при срабатывание события ajaxError.
	 */
	this.startRefresh = function(delay, period, stopOnAjaxError){
		if(period > 0){
			this.refreshTime = period;
			this.stopOnAjaxError = stopOnAjaxError;
			delay = delay?delay:0;
			this.refreshId = setTimeout(context(this).callback(this.updateView), delay);
		}
	}

	/**Остановить обновление
	 */
	this.stopRefresh = function(){
//		alert(this.refreshId + "|" + this.refreshTime);
		clearTimeout(this.refreshId);
		this.refreshId = null;
		this.refreshTime = 0;
		this.stopOnAjaxError = false;
	}
	
//	$(window).bind("ajaxError", context(this).callback(this.onajaxerror));

	/**Данные для запроса к серверу*/
	this.requestData = null;
	/**Данные полученные от сервера*/
	this.responseData = null;
	/**callback подготовки данных для запроса сервера
	 * @type	Function
	 */
	this.prepareData = null;
	/**Период запуска updateView: >0 - время в милисекундах, 0 - отключен.
	 * Устанавливается в startRefresh, обнуляется в stopRefresh.
	 * @type	int
	 */
	this.refreshTime = 0;
	/**Корневой контроллер нужен для, того чтобы сообщать ему о том, что
	 * завершился eval данных, пришедших с сервера, которые могут понадобиться ему
	 * для совершения некоторых глобальных действий таких как logout.
	 * Устанавливается методом addToRequest, т.к. в конструкторе контроллер может быть ещё не интегрирован.
	 * @type	jsController
	 */
	this.rootCtrl = null;
	/**Идентификатор таймера обновления.
	 * @type	int
	 */
	this.refreshId = null;
	/**XMLHttpRequest текущего запроса
	 * @type	Object
	 */
	this.xmlhttprequest = null;
	/**Остановить обновление при первом неудачном запросе
	 * @type	bool
	 */
	this.stopOnAjaxError = false;
	/*  */
	this.bind('stoprefreshrq', this.stopRefresh);
}
extend(jsSSideView, jsView);

/**Создаёт новый экземпляр класса jsCSideView
 * @class 							Представляет базовую функциональность представлений клиентской стороны
 * @constructor
 * @param	{int}		viewInx		Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{Object}	ctrl		Ссылка на контроллер.
 * @param	{Object}	options		Опции представления.
 * 									jsCSideView принимает следующие опции:<br>
 * 									hide - Скрыть представление.<br>
 * 									viewBoxSel - HTML контейнер представления.<br>
 * 									childBoxSel - HTML контейнер для представлений потомков.<br>
 * 									myBoxSel - HTML контейнер для собственных данных.<br>
 * 									Информационные опции:
 * 									ishidden - Пред��тавление скрыто под средством опции hide, методом hide()
 * 									или одно из родительских представлений скрыто
 */
function jsCSideView(ctrl, viewInx, options){
	if(options.hide){
		/**По этому полю метод drawView определяет надо скрывать представление или нет.
		 * @type	bool
		 * @see		#drawView
		 */
		this.hidden = options.ishidden = options.hide;
		options.hide = false;
	}
	jsCSideView.superclass.constructor.call(this, ctrl, viewInx, options);

	/** Базовый функционал для отрисовки страницы.<br>
	 * Метод производного класса может вызвать его в конце, иначе не сработают действия, которые основаны на том, что раскладка уже есть.
	 * Это касается только первого производного, остальные могут работать как хотят.
	 */
	jsCSideView.prototype.drawView = function(){
		var child = null;
		var children = null;
		var options = this.options;
		var $viewbox = $(options.viewBoxSel);

		if(options.hide){
			this.hidden = options.hide;
			this.setOption("ishidden", options.hide);
			options.hide = false;
		}

		//привязать событие к DOM элементу представления (myBoxSel)
		this.bindDOMEvent("click", this.onclick);

		if(this.hidden) this.hide();
		if(no($viewbox.attr("id"))){
			$viewbox.attr("id", "viewbox" + getUID());
		}
			
		
		children = this.ctrl.children;
		for(var i in children){
			child = this.getChild(i);
			if(child instanceof jsCSideView) child.drawView();
		}
	}
	
	/**Подогнать размер заглушки под размеры окна (вызывается автоматически при изменении размера окна браузера)
	 * */
	this.correctModalOverlay = function() {
		$('#modalOverlayBox').css({
			'width': $(document).width(),
			'height': $(document).height()
		});
	}
	
	/**Показать глушилку.
	 */
	jsCSideView.prototype.showModalOverlay = function(message){
		//Добавить modalOverlayBox если требуется
		if($("#modalOverlayBox").length == 0){
			$("body").append("<div id='modalOverlayBox' class='overlay' style='display: none;' ><input type='hidden' value='0' /><div class='message'><div></div></div></div>");
		}
		
		if(this.isWin){
			var winCount = new Number($('#modalOverlayBox>input').val());
			$('#modalOverlayBox>input').val(winCount+1);
		}
	
		$('body').css('overflow', 'hidden');
		$('#modalOverlayBox').css({
			'left': 0,
			'top': 0,
			'width': $(document).width(),
			'height': $(document).height(),
			'display': 'block',
			'opacity': 0.7
		});
		if(message){
			$('#modalOverlayBox div.message').css('display', '');
			$('#modalOverlayBox div.message>div').html(lng(message));
			var width = $('#modalOverlayBox div.message').width();
			var height = $('#modalOverlayBox div.message').height();
			$('#modalOverlayBox div.message').css({
				'left': $(document).width()/2 - width/2,
				'top': $(document).height()/2 - height/2
			});
		}
		else{
			$('#modalOverlayBox div.message').css('display', 'none');
			$('#modalOverlayBox div.message>div').html("");
		}
		$(window).bind('resize', context(this).callback(this.correctModalOverlay));
		$(window).trigger('overlay.core', {
			'visible': true,
			'obj': this
		});
	}

	/**Скрыть глушилку.
	 */
	jsCSideView.prototype.hideModalOverlay = function(){
		var winCount = new Number($('#modalOverlayBox>input').val());
		
		if(this.isWin){
			$('#modalOverlayBox>input').val(--winCount);
		}
		if ($('#modalOverlayBox').is(':hidden') || winCount > 0) return ;

		$('#modalOverlayBox').fadeOut(600, function(){
			$(this).css({
				'width': '0px',
				'height': '0px',
				'display': 'none'
			});
			$('body').css('overflow', 'auto');
		});
	
		$('#modalOverlayBox div.message').css('display', 'none');
		$(window).unbind('resize', context(this).callback(this.correctModalOverlay));
		$(window).trigger('overlay.core', {
			'visible': false,
			'obj': this
		});
	}

	/**Скрыть представление.
	 */
	jsCSideView.prototype.hide = function(){
		this.hidden = true;
		this.setOption("ishidden", true);
		$(this.options.viewBoxSel).css("display", "none");
	}
	
	/**Показать представление
	 */
	jsCSideView.prototype.show = function(){
		this.hidden = false;
		this.unSetOptionHidden();
		$(this.options.viewBoxSel).css("display", "");
	}
	
		
	/**Снять информационную опцию hidden у себя и потомков.
	 * У потомка опция снимается только если его прямой родитель не скрыт.
	 */
	jsCSideView.prototype.unSetOptionHidden = function(){
		var children = this.ctrl.children;
		var child;

		for(var i=0;i<children.length;i++){
			child = this.getChild(i);
			if(child && !child.hidden){
				child.unSetOptionHidden();
			}
		}
		this.options.ishidden = false;
	}
	
	/**Привязывает обработчик к событию DOM элемента.
	 * Вызов обработчика происходит с предварительной подменой контекста
	 * с контекста	DOM на контекст представления.
	 * @param	{String}	eventType	Тип события.
	 * @param	{int}		viewInx		Индекс представления.
	 */
	jsCSideView.prototype.bindDOMEvent = function(eventType, handler){
		$(this.myBoxSel).bind(eventType, {}, context(this).callback(handler));
	}

	jsCSideView.prototype.onblur = dummyFunc;
	jsCSideView.prototype.onchange = dummyFunc;
	/**Обработчик события click (события jQuery).
	 * Активирует контроллер
	 */
	jsCSideView.prototype.onclick = function(event){
	    if(event.target == event.currentTarget){
			this.ctrl.activatedByIface=this.viewInx;
			this.ctrl.activate();
	    }
		return true;
	};
	jsCSideView.prototype.ondblclick = dummyFunc;
	jsCSideView.prototype.onerror = dummyFunc;
	jsCSideView.prototype.onfocus = dummyFunc;
	jsCSideView.prototype.onfocusin = dummyFunc;
	jsCSideView.prototype.onfocusout = dummyFunc;
	jsCSideView.prototype.onhover = dummyFunc;
	jsCSideView.prototype.onkeydown = dummyFunc;
	jsCSideView.prototype.onkeypress = dummyFunc;
	jsCSideView.prototype.onkeyup = dummyFunc;
	jsCSideView.prototype.onmousedown = dummyFunc;
	jsCSideView.prototype.onmouseenter = dummyFunc;
	jsCSideView.prototype.onmouseleave = dummyFunc;
	jsCSideView.prototype.onmousemove = dummyFunc;
	jsCSideView.prototype.onmouseout = dummyFunc;
	jsCSideView.prototype.onmouseover = dummyFunc;
	jsCSideView.prototype.onmouseup = dummyFunc;
	jsCSideView.prototype.onresize = dummyFunc;
	jsCSideView.prototype.onscroll = dummyFunc;
	jsCSideView.prototype.onselect = dummyFunc;
	jsCSideView.prototype.onsubmit = dummyFunc;
	
	/*!!! TODO: Добавить контекстное меню с выбором интерфейса !!!*/
	
	if(!options.viewBoxSel) options.viewBoxSel = null;
	if(!options.myBoxSel) options.myBoxSel = options.viewBoxSel;
	if(!options.childBoxSel) options.childBoxSel = options.viewBoxSel;
	/**HTML контейнер представления.<br>
	 * deprecated Используйте соотв. опцию взамен.
	 * @type	String
	 */
	this.viewBoxSel = options.viewBoxSel;
	/**HTML контейнер для собственных данных.<br>
	 * deprecated Используйте соотв. опцию взамен.
	 * @type	String
	 */
	this.myBoxSel = options.myBoxSel;
	/**HTML контейнер для представлений потомков.<br>
	 * deprecated Используйте соотв. опцию взамен.
	 * @type	String
	 */
	this.childBoxSel = options.childBoxSel;	//необязательный селектор HTML контейнера для дочерних объектов
	
	/**Признак модального окна.
	 * Используется как защита случайного скрытия глушилки при вызове hideModalOverlay.
	 * @type	bool
	 */
	this.isWin = false;

}
extend(jsCSideView, jsView);

/* Name:			jsCSideViewOptions
 * Description: 	Глобальные опции всех представлений клиентской стороны
 * Arguments:		нет
 * Return value:	нет
 * Notes:
 */
jsCSideViewOptions = {
		rtl: false,						//направление письма справа налево
		pda: false,						//версия для кпк
		lng: "rus"						//обозначение языка в соотв. ИСО 639–88 
										//соотв. ГОСТ 7.75–97 http://gsnti-norms.ru/norms/common/doc.asp?2&/norms/stands/7_75.htm
}

/*********** Способы отрисовки иерархической сущности библиотеки **************************
 *	Наследование от разных базовых классов, таких как jsViewTree, jsListTree и т.д.
 *	даёт возможность объединение узлов в дерево, список и т.д.
 *	Т.е. при вызове метода drawView экземпляра класса jsNodeView, для которого
 *	вызвали extend(jsNodeView, jsTreeView) нарисуется дерево объектов типа 
 *	jsNodeView, если контроллер этого экземпляра содержал дочерние объекты.
 * 	Если применять наследование непосредственно перед созданием интерфейса,
 * 	то можно делать разные интерфейсы на основе одного представления!
 ******************************************************************************************/

/**Создаёт новый экземпляр класса jsViewTree
 * @class	Представляет базовую функциональность деревьев и списков.
 * @constructor
 * @param	{int}		viewInx		Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl		Ссылка на контроллер.
 * @param	{Object}	options		Опции представления.
 * 									jsViewTree принимает следующие опции:<br>
 * 									<ul>
 * 										<li>
 * 											open - Открытое дерево (bool).
 * 										</li>
 * 										<li>
 * 											style - Название стиля (String).
 *	 										Стили: fastmenu, tabs1.
 * 										</li>
 * 										<li>
 * 											noPath - Не отображать путь в в строке URL. Для полного описание этой фичи см. поле path.
 * 										</li>
 * 									</ul>
 */
function jsViewTree(ctrl, viewInx, options){
	jsViewTree.superclass.constructor.call(this, ctrl, viewInx, options);

	if(!options) options = {};
	
	/**Рисует раскладку страницы для дерева или списка
	 * и проставляет селекторы HTML контейнеров потомкам.
	 * Список рисуется в соотв. с опцией style.
	 * Если узел активный или установлен флаг open, список рисуется раскрытым.
	 */
	jsViewTree.prototype.drawView = function(){
		var children;
		var lft;
		var rgt;
		var alias = this.ctrl.alias?this.ctrl.alias:"";
		var htmlToAppend = "";
		var anchor_href = "";
		var child;

		if(this.options.plainIface){
			children = [];
		}
		else{
			children = this.ctrl.children;
		}
		
		if(!(this.getParent(1) instanceof jsViewTree)){
			this.ctrl.root = true;
			this.path = alias;
			this.rootOfTree = this;
		}
		else{
			this.path = this.getParent().path + "/" + alias;
			this.rootOfTree = this.getParent().rootOfTree;
		}

		if (this.options.noPath) {
			this.path = "";
			anchor_href = "";
		} else {
			anchor_href = " href='#" + this.path + "' ";
		}
		
		if(this.style == "fastmenu"){
			if(this.ctrl.root){
				$(this.viewBoxSel).html("<div></div>");
				this.myBoxSel = this.viewBoxSel + ">div";
				$(this.viewBoxSel).addClass("fastmenu");
				$(this.myBoxSel).css("display", "none");	//нужно логически, но не нужно визуально
			}
			else{
				$(this.viewBoxSel).html("<a " + anchor_href + "></a>");
				this.myBoxSel = this.viewBoxSel + ">a";
			}
			if(children.length){
				this.childBoxSel = this.viewBoxSel + ">ul";
				$(this.viewBoxSel).append("<ul></ul>");
			}
			else{
				this.childBoxSel = null;
			}
			htmlToAppend = "";
			for(var i=0;i<children.length;i++){
//				$(this.childBoxSel).append("<li></li>");
				htmlToAppend += "<li></li>";
				child = this.getChild(i);
				child.options.viewBoxSel = this.childBoxSel+">li:eq("+i+")";
				child.viewBoxSel = this.childBoxSel+">li:eq("+i+")";
//				children[i].views[this.viewInx].viewBoxSel = this.childBoxSel+">li:eq("+i+")";
			}
			$(this.childBoxSel).append(htmlToAppend);
		}
		else{
			if(this.ctrl.getParent(2).root){
				$(this.viewBoxSel).html("<a " + anchor_href + "></a>");
				this.myBoxSel = this.viewBoxSel + ">a";
			}
			else if(this.ctrl.root){
				$(this.viewBoxSel).html("<div></div>");
				this.myBoxSel = this.viewBoxSel + ">div";
				if(this.style == "tabs1"){
					$(this.viewBoxSel).addClass("menu");
				}
				else{
					$(this.viewBoxSel).addClass("menuvert1");
//					$(this.viewBoxSel).attr("class", "");
				}
				$(this.myBoxSel).css("display", "none");	//нужно логически, но не нужно визуально
			}
			else{
				if(this.style == "tabs1"){
					lft = "class = 'lft'";
					rgt = "class = 'rgt'";
					$(this.viewBoxSel).html("<a " + anchor_href + "><em " + lft + "></em><b></b><em " + rgt + "></em></a>");
					this.myBoxSel = this.viewBoxSel + ">a>b";
				}
				else{
					$(this.viewBoxSel).html("<a " + anchor_href + "></a>");
					this.myBoxSel = this.viewBoxSel + ">a";
				}
			}
			if(children.length){
				this.childBoxSel = this.viewBoxSel + ">ul";
				$(this.viewBoxSel).append("<ul></ul>");
			}
			else{
				this.childBoxSel = null;
			}
			htmlToAppend = "";
			for(var i=0;i<children.length;i++){
//				$(this.childBoxSel).append("<li></li>");
				htmlToAppend += "<li></li>";
				child = this.getChild(i);
				child.options.viewBoxSel = this.childBoxSel+">li:eq("+i+")";
				child.viewBoxSel = this.childBoxSel+">li:eq("+i+")";
				//children[i].views[this.viewInx].viewBoxSel = this.childBoxSel+">li:eq("+i+")";
			}
			$(this.childBoxSel).append(htmlToAppend);
			if(this.style != "tabs1"){
				if(this.ctrl.active){
//					$(this.myBoxSel).css("font-weight", "bold");
					this.onactivate();
				}
				else{
//					$(this.myBoxSel).css("font-weight", "normal");
					this.ondeactivate();
				}
			}
			
			if(!this.ctrl.active && !this.open && !this.ctrl.root){
				$(this.childBoxSel).css("display", "none");
			}
			else{
				$(this.childBoxSel).css("display", "");
			}
		}
		if(children.length){
			if(children.length == 1){
				$(this.getChild(0).viewBoxSel).addClass("nodesingle");
			}
			else{
				$(this.getChild(0).viewBoxSel).addClass("nodefirst");
				$(this.getChild(children.length - 1).viewBoxSel).addClass("nodelast");
			}
		}
		jsViewTree.superclass.drawView.call(this);

		if(this.ctrl.root && this.style == "fastmenu"){
			//прикрутить анимацию после того, как всё дерево будет отрисовано
			$(this.viewBoxSel + ' ul li').hover(
				function() {
					$(this).find('ul').stop(true, true);
					$(this).find('ul').slideDown('normal');
				},
				function() {
					$(this).find('ul').slideUp('normal');
				}
			);
		}
		
	}
	
	/**Обработчик события activate.
	 * Изменяет внешний вид активного представления.
	 * @type	bool
	 * @return	true - всплывать.<br>
	 * 			false - не всплывать.
	 * @see		jsController#event
	 */
	jsViewTree.prototype.onactivate = function(){
		$(this.viewBoxSel).addClass(this.getClasses());
		if(this.style != "fastmenu"){
			if(this.style != "tabs1") $(this.myBoxSel).css("font-weight", "bold");
			if(!this.open) $(this.childBoxSel).css("display", "");
		}
		return false;
	}
	
	/**Определить классы CSS для onactivate и ondeactivate
	 * @type	{String}	nodeactive/nodefirstactive/nodelastactive
	 */
	 jsViewTree.prototype.getClasses = function(){
		var classes = "";
		var parent = this.ctrl.getParent();
		if(parent instanceof jsController){
			if(parent.children.length == 1){
				classes += "nodesingleactive";
			}
			else if(this.ctrl.thisInx < parent.children.length - 1 && this.ctrl.thisInx > 0){
				classes += "nodeactive";
			}
			else{
				if(this.ctrl.thisInx == 0){
					classes += " nodefirstactive";
				}
				if(this.ctrl.thisInx == parent.children.length - 1){
					classes += " nodelastactive";
				}
			}
		}
		else{
			classes += "nodesingleactive";
		}
		return classes;
	 }
	 
	/**Обработчик события deactivate.
	 * @type	bool
	 * @return	true - всплывать.<br>
	 * 			false - не всплывать.
	 * @see		jsController#event
	 */
	jsViewTree.prototype.ondeactivate = function(){
		$(this.viewBoxSel).removeClass(this.getClasses());
		if(this.style != "fastmenu"){
			if(this.style != "tabs1") $(this.myBoxSel).css("font-weight", "normal");
			if(!this.open) $(this.childBoxSel).css("display", "none");
		}
		return false;
	}
	
//	jsViewTree.prototype.onactivate = function(){this.drawView(); return false;};
//	jsViewTree.prototype.ondeactivate = function(){this.drawView(); return false;};

	this.bind("activate", this.onactivate);
	this.bind("deactivate", this.ondeactivate);

	/**Стиль списка
	 * @type	String
	 * @see		#drawView
	 */
	this.style = options.style;
	/**Указание drawView рисовать открытое дерево (список).
	 * @type	bool
	 * @see		#drawView
	 */
	this.open = (this.style == "tabs1")?true:options.open;
	/**Ссылка на корневой узел дерева.
	 * Заполняется по цепочке от родителя к потомку в drawView.
	 * @type	Object
	 */
	this.rootOfTree = null; 
	
	/**Путь аналогичный пути в файловой системе.
	 * Записывается в атрибут href после #.
	 * Формируется на основе алисов контроллеров.
	 * Корнем считается первое представление типа jsViewTree.
	 * @type	String
	 */
	this.path = "";
}
extend(jsViewTree, jsCSideView);
/**
 * @fileoverview Модуль меню.
 * Данный модуль предназначен для создания меню различного вида.
 * Как этим пользоваться:
 * <ul>
 * 	<li>
 * 	Создать дерево меню, указав главным фреймом тот контроллер, который должен получать событие menuchange.
 * 	</li>
 * 	<li>
 * 	Объявить обработчик menuchange, в контроллере и представлении.
 * 	</li>
 * </ul>
 * Пример использования в тестовом наборе.
 */

/**Создаёт новый экземпляр класса jsMenuModel
 * @class				Модель содержит только имя узла меню.
 * @param	nodeName	Имя узла меню. (ключ объекта lang)
 * @constructor
 */ 
function jsMenuModel(nodeName){
	jsMenuModel.superclass.constructor.call(this);
	
	this.nodeName = nodeName;
}
extend(jsMenuModel, jsModel);

/**Создаёт новый экземпляр класса jsMenuController
 * @class				Контроллер дерева меню.
 * @constructor
 * @param	{String}	nodeName	Имя узла (для немедленного создания модели).
 * @param	{Object}	options		Опции.<br>
 * 						<span>&nbsp;&nbsp;</span>frame			-	ссылка на объект, которому принадлежит всё дерево меню.
 * 																	Его достаточно задать только корневому узлу.<br>
 * 						<span>&nbsp;&nbsp;</span>contentClass 	-	класс контроллера страницы контента.
 * 																	Если класс ещё не подгружен, то должна стоять заглушка.<br>
 * 						<span>&nbsp;&nbsp;</span>contentOptions	-	массив (Array()) аргументов конструктора контроллера страницы контента,
 * 																	или любой другой тип, если contentClass не задан. В последнем случае.<br>
 * 						<span>&nbsp;&nbsp;</span>contentOptions -	используется по усмотрению класса frame.<br>
 * 						<span>&nbsp;&nbsp;</span>contentUrl		-	URL js файла, в котором находится contentClass,
 * 																	если contentClass не является потомком jsController,
 * 																	то будет предпринята попытка загрузить класс из contentUrl.
 */
function jsMenuController(nodeName, options){
	if(no(nodeName)) return;
	jsMenuController.superclass.constructor.call(this);

	if(!options) options = {};
	
	if(!this.contentOptions) this.contentOptions = [];	//для совместимости c IE, который не жрёт undefined в apply()
	//класс контентной страницы, может иметь значение по умолчанию в прототипе
	if(options.contentClass) this.contentClass = options.contentClass;
	//аргументы конструктора класса контентной страницы
	if(options.contentOptions) this.contentOptions = options.contentOptions;

	this.changeModel(new jsMenuModel(nodeName));
	
	this.ifaceTypes.tree = {type: jsMenuView, def:true};

	/**Встроить контроллер в иерархию.
	 * А именно:<br>
	 * Проставляются поля frame и level.
	 * frame это ссылка на объект, которому принадлежит всё дерево меню.
	 * Ему нужно сообщать о том, какое меню активно в давный момент.
	 * level это уровень меню для быстрого отображения раздела и подразделов контроллером this.frame.
	 * @see jsController#integrate
	 */
	this.integrate = function(childInx, parent){
		jsMenuController.superclass.integrate.call(this, childInx, parent);

		//ссылка на объект, которому принадлежит всё дерево меню
		//ему нужно сообщать о том, какое меню активно в давный момент
		//благодаря такому присвоению можно задавать только для корневого меню
		if(!this.frame) this.frame = this.getParent(1).frame;
		//уровень меню для быстрого отображения раздела и подразделов контроллером this.frame
		//благодаря такому присвоению можно задавать только для корневого меню
		parent = this.getParent(1);
		if(parent instanceof jsMenuController && parent.level >= 0) this.level = this.getParent(1).level + 1;
	}

	/**Создать контроллер страницы, выбираемой с помощью меню.
	 * @type	jsController
	 * @return	Созданный объект.
	 */
	this.createContent = function(){
//		if(this.contentClass && !this.contentCtrl){
		if(this.contentClass){
			this.contentCtrl = new this.contentClass();
			this.contentClass.apply(this.contentCtrl, this.contentOptions);
		}
		return this.contentCtrl;
	}
	
	
	/**Обработчик события activate.
	 * Создаёт контентный контроллер и запускает событие menuchange на главном фрейме.
	 * @type	bool
	 * @see		jsController#event
	 */
	this.onactivate = function(){
		this.createContent();
		
		frame = this.frame
		if(frame) frame.event("menuchange", this);
		return false;
	}
	
	this.addEventHandler("activate", this.onactivate);

	/**Уровень вложенности меню
	 * @type	int
	 */
	this.level = 0;
	/**Ссылка на объект, которому принадлежит всё дерево меню.
	 * @type	jsController
	 */
	this.frame = options.frame;
	/**Контроллер контента страницы выбираемой с помощью меню.
	 * Создаётся в onactivate представления.
	 * @type	jsController
	 */
	this.contentCtrl = null;
	/**Индекс представления, с помощью которого выбрано меню
	 * @type	int
	 */
	this.selectedByView = null;
}
extend(jsMenuController, jsController);

/**Создаёт новый экземпляр класса jsMenuView
 * @class					Представление дерева меню.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * @constructor
 */ 
function jsMenuView(ctrl, viewInx, options){
	jsMenuView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отображает имя узла (через функцию lng) в раскладке предоставленной drawView базового класса.*/
	jsMenuView.prototype.drawView = function(){
		jsMenuView.superclass.drawView.call(this);
		$(this.myBoxSel).html(lng(this.ctrl.model.nodeName));
	}

	/**Обработчик события activate. Устанавливает поле selectedByView.*/
	jsMenuView.prototype.onactivate = function(){
		jsMenuView.superclass.onactivate.call(this);
		this.ctrl.selectedByView = this.viewInx;
	}

	this.bind("activate", this.onactivate);

}
extend(jsMenuView, jsViewTree);
/**
 * @fileoverview Модуль recordset.
 * Данный модуль является основным элементом страниц для редактирования некоторого набора записей.
 * Набор записей отображается в виде таблицы. Клик на строку таблицы открывает режим редактирования записи.<br>
 * Как этим пользоваться:
 * <ul>
 * 	<li>
 * 	Создать класс контроллера, прозводный от jsRecordSetController.<br>
 * 		В нём:
 * 		<ul>
 * 			<li>
 * 			Объявить интерфейсы.
 * 			</li>
 * 			<li>
 * 			Объявить обработчик события recselect. В нём создать потомков, которые и будут образовывать
 * 			страницу в режиме редактирования.
 * 			</li>
 * 		</ul>
 * 	</li>
 * 	<li>
 * 	Создать класс представления, произодный от jsRecordSetClientView.<br>
 * 		В нём:
 * 		<ul>
 * 			<li>
 * 			Объявить обработчик события recselect. В нём проставить опции потомков.
 * 			</li>
 * 			<li>
 * 			Объявить обработчик события fieldchange. В нём поместить логику, которая включается при изменении полей ввода.
 * 			</li>
 * 		</ul>
 * 	</li>
 * 	<li>
 * 	Создать класс модели, произодный от jsRecordSetModel если требуется кастомизация модели.
 * 	</li>
 * </ul>
 * Пример использования в тестовом наборе.
 */

/**Создаёт новый экземпляр класса jsRecordSetModel.
 * @class	Хранит массив объектов типа:<br>
 * <code>
 * [
 * {val1:"val1_1", val2:"val1_2", val3:"val1_3"},
 * {val1:"val2_1", val2:"val2_2", val3:"val2_3"},
 * {val1:"val3_1", val2:"val3_2", val3:"val3_3"},
 * {val1:"val4_1", val2:"val4_2", val3:"val4_3"}
 * ]
 * </code>
 * который и является набором записей.
 * Если значение является объектом, например {value:true, type:"radio", extrattrs:{disabled:""}},
 * то вместо надписи выведется элемент заданного типа. В настоящее время доступен только radio и checkbox,
 * которые являются радиокнопкой и "флажком" со значением value, и отмеченной, если value == true. Объект extrattrs
 * задаёт дополнительные атрибуты тега input. При клике на этих элементах вызывается событие cellselect с аргументом
 * {row:строка, cell:столбец}.
 * Объекты в качестве значения являются устаревшим способом вывести в ячейке таблицы элемент отличный от текста.
 * Далее развиваться этот способ не будет. Вместо этого, чтобы вывести нестандартное содержимое ячейки, можно сделать
 * производный, от jsRecordSetClientView, класс и переопределить в нём методы drawTd и drawShowView. Переопределение последнего
 * требуется чтобы проставить обработчики событий, если это требуется.
 * @param	{Array}	recordSet	Массив объектов.
 * @constructor
 */ 
function jsRecordSetModel(recordSet){
	jsRecordSetModel.superclass.constructor.call(this);
	
	/**Набор записей
	 * @type	Array
	 */
	this.recordSet = recordSet?recordSet:[];
	/**Ширина ячеек таблицы
	 * @type	Array
	 */
	this.colsWidth = {};
}
extend(jsRecordSetModel, jsModel);

/* Name:			jsRecordSetController
 * Description: 	конструктор класса jsRecordSetController
 * Arguments:		нет
 * Return value:	нет
 * Compatibility:	jsRecordSetModel
 * Notes:
 */
/**Создаёт новый экземпляр класса jsRecordSetController
 * @class						Базовый функционал контроллера набора записей.
 * @constructor
 */ 
function jsRecordSetController(){
	jsRecordSetController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsRecordSetClientView};
//	this.ifaceTypes.server = {type: jsRecordSetServerView};

	this.changeModel(new jsRecordSetModel());

	/**Обработчик события recselect. 
	 * Устанавливает поле activeRecordInx.
	 * @param	int	recordInx
	 * @type	bool
	 * @return	Позволяет событию всплыть.
	 * @see		jsController#event
	 */
	jsRecordSetController.prototype.onrecselect = function(recordInx){
		this.activeRecordInx = recordInx;
		return true;
	}

	this.addEventHandler("recselect", this.onrecselect);
	
	/**Текущий индекс активной записи.
	 * -1 Означает то, что ни одна запись не активна.
	 * @type	int
	 */
	this.activeRecordInx = -1;
}
extend(jsRecordSetController, jsController);

/**Создаёт новый экземпляр класса jsRecordSetClientView
 * @class					Представление набора записей.<br>
 * 							Чтобы нарисовать нестандартную таблицу можно переопределить методы
 * 							drawTh, drawTr, drawTd, drawShowView.<br>
 * 							drawShowView - в основном чтобы проставить обработчики событий.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>header - Массив объектов вида: <code>{key:name, name:humanName}</code>.</li>
 * 								<li>resizingOff - отключает возможность изменение размера столбцов</li>
 * 								<li>name - имя поля в модели.</li>
 * 								<li>humanName - то, что будет в заголовке таблицы (ключ объекта lang).</li>
 * 								<li>header - Массив объектов вида: <code>{key:name, name:humanName}</code>.</li>
 * 								<li>editBoxSel - Селектор контейнера для режима редактирования. Если он не
 * 									установленовлен, то будет использоваться myBoxSel.
 * 								</li>
 * 							</ul>
 * 																
 * @constructor
 */ 
function jsRecordSetClientView(ctrl, viewInx, options){
	jsRecordSetClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	// По дефолту возможность изменения размера столбцов включена
	if (options.resizingOff == undefined) {
		options.resizingOff = false;
	}
	
	/**Отрисовка представления в режиме просмотра и редактирования.
	 * <br>
	 * Режим просмотра: 		activeRecordInx < 0.<br>
	 * Режим редактирования:	activeRecordInx >=0.<br>
	 * В зависимости режима вызывает либо drawShowView, либо drawEditView.
	 * @see #drawShowView
	 * @see #drawEditView
	 */
	jsRecordSetClientView.prototype.drawView = function(){
		if(this.ctrl.activeRecordInx < 0) this.drawShowView();
		else this.drawEditView();
		if(this.options.hide){
			this.hidden = this.options.hide;
			this.setOption("ishidden", this.options.hide);
			this.options.hide = false;
		}
		if(this.hidden) this.hide();
	}
	
	/**Добавляет представлению возможность изменять размер колонок.
	 * 
	 */
	jsRecordSetClientView.prototype.setResizing = function() {
		var table = $(this.myBoxSel+'>table');
		var tds = $(table).find('tr:eq(0)>td');
		var colsWidth = this.ctrl.model.colsWidth;
		var rtlIndex = ($('body').css('direction') != 'rtl')?$(tds).length-1:0;
		
		document.extra = {
			resizing: false,
			oldX: 0,
			oldWidth: 0,
			currentTD: null
		};
				
		$(tds).each(function(index){
			if (rtlIndex == index) {
				return;
			}
			
			if (colsWidth[index.toString()] != undefined) {
				$(this).css('width', colsWidth[index.toString()]);
			}
			
			var thText = $(this).text();
			var divTh = $("<div />").css({
				'width': '100%',
				'height': '100%',
				'position': 'relative'
			});
			var resizer = $("<div />").css({
				'cursor': 'col-resize',
				'height': '100%',
				'left': '100%',
				'position': 'absolute',
				'top': '0px',
				'width': '5px'
			});
			$(resizer).mousedown(function(e){
				document.extra.resizing = true;
				document.extra.oldX = e.pageX;
				document.extra.oldWidth = $(this).parents('td').width();
				document.extra.currentTD = $(this).parents('td');
				$('body').css('cursor', 'col-resize');
				$(resizer).parents('table').fadeTo('fast', 0.7);
				return false;
			});
			$(resizer).mouseup(function(e){
				document.extra.resizing = false;
				$('body').css('cursor', 'default');
				$(resizer).parents('table').fadeTo('slow', 1);
				colsWidth[$(document.extra.currentTD).index().toString()] = $(document.extra.currentTD).width();
				return false;
			});
			$('body').mouseup(function(e){
				if (document.extra.resizing) {
					$(resizer).mouseup();
					return false;
				}
			});
			$('body').mousemove(function(e){
				if (document.extra.resizing) {
					var width = e.pageX - document.extra.oldX;
					$(document.extra.currentTD).css('width', document.extra.oldWidth + width);
					return false;
				}
			});
			$(divTh).text(thText)
			$(divTh).append(resizer);
			$(this).html($(divTh));
		});
	}
	
	/**Нарисовать таблицу записей.
	 * Это, так называемый, режим просмотра.
	 * @see #drawEditView
	 */
	jsRecordSetClientView.prototype.drawShowView = function(){
		var recordSet = this.ctrl.model.recordSet;
		var record = null;
		var header = null;
		var htmlToDraw = "";
		var id;
		var idPrefix;
		
		htmlToDraw = "<table class='gridTable' cellspacing='0' cellpadding='0'>";
		//header
		header = this.options.header;
		htmlToDraw += this.drawTh();
		//body
		if(recordSet && recordSet.length){
			idPrefix = "rsShow" + getUID() + "_";
			htmlToDraw += "<tbody>";
			for(var i=0; i<recordSet.length; i++){
				htmlToDraw += this.drawTr(idPrefix, i);
			}
			htmlToDraw += "</tbody>";
		}
		htmlToDraw += "</table>";
		if(!this.options.viewBoxSel) this.options.viewBoxSel = this.viewBoxSel;
		this.options.myBoxSel = this.options.viewBoxSel;
		this.myBoxSel = this.options.myBoxSel;
		this.options.childBoxSel = this.options.viewBoxSel;
		this.childBoxSel = this.options.childBoxSel;
		$(this.myBoxSel).html(htmlToDraw);
		
		if (!this.options.resizingOff) {
			this.setResizing();
		}
		
		//проставить onclick'ки
//		for(var i=1;i<$(this.myBoxSel+">table>tbody>tr").length;i++){
		for(var i=0;i<recordSet.length;i++){
//			$(this.myBoxSel+">table>tbody>tr:eq(" + i + ")").bind("click", {recordInx:i-1}, context(this).callback(this.onrowclick));
			$("#" + idPrefix + i).bind("click", {recordInx:i}, context(this).callback(this.onrowclick));
		}
		var rowSel;
		var cellSel;
		var curVal;
		for(var i=0;i<recordSet.length;i++){
			rowSel = "#" + idPrefix + i;
			for(var j in header){
				curVal = recordSet[i][header[j].key];
				if(curVal instanceof Object) {
					if (curVal.type == "radio" || curVal.type == "checkbox"){
						cellSel = rowSel + ">td:eq(" + j + ")>input";
						$(cellSel).bind("click", {row:i, cell:j}, context(this).callback(this.oncellclick));
					}
				}
			}
		}
	}
	
	/**Нарисовать строку заголовков.
	 * @type	String
	 * @return			HTML код ячейки.
	 */
	jsRecordSetClientView.prototype.drawTh = function(){
		var header = this.options.header;
		var htmlToDraw = "<thead><tr class='gridHeader'>";
		for(var i in header){
			htmlToDraw += "<td>" + lng(header[i].name) + "</td>";
		}
		htmlToDraw += "</tr></thead>";
		return htmlToDraw;
	}
	
	/**Нарисовать строку.
	 * @param	{String}	idPrefix	Префикс идентификатора.
	 * @param	{int}		i			Индекс строки
	 * @type	String	
	 * @return							HTML код ячейки.
	 */
	jsRecordSetClientView.prototype.drawTr = function(idPrefix, i){
		var id = idPrefix + i;
		var record = this.ctrl.model.recordSet[i];
		var htmlToDraw = "<tr id='" + id + "' class='";
		var header = this.options.header;

		if(i%2){
			htmlToDraw += "gridRow2";
		}
		else{
			htmlToDraw += "gridRow1";
		}
		htmlToDraw += "'>";
		if(record){	//защита для IE от массива с запятой в конце [1,2,3,] 
			for(var j in header){
				htmlToDraw += this.drawTd(record, j);
			}
		}
		htmlToDraw += "</tr>";
		return htmlToDraw;
	}
	
	/**Нарисовать одну ячейку.
	 * @param	{Object}	record	Текущая запись.
	 * @param	{int}		i		Индекс столбца.
	 * @type	String
	 * @return						HTML код ячейки.
	 */
	jsRecordSetClientView.prototype.drawTd = function(record, i){
		var curHeader = this.options.header[i];
		var htmlToDraw;
		var curVal = record[curHeader.key];
		if(curVal instanceof Object){
			if(curVal.type =="radio" || curVal.type == "checkbox"){
				var checked = curVal.value?"checked":"";
				var attr;
				extrattrs = curVal.extrattrs;
				htmlToDraw = "<td  cell-name='" + lng(curHeader.name) + "' ><input name='" + curHeader.key + "' value='" + curVal.value + "' type='" + curVal.type + "' " + checked;
				if(extrattrs){
					for(var i in extrattrs){
						htmlToDraw	+=	i + "='" + extrattrs[i] + "' ";
					}
				}
				htmlToDraw += " ></td>";
			}
		}
		else{
			if(no(curVal) || curVal == "") curVal = "&nbsp;";
			htmlToDraw = "<td cell-name='" + lng(curHeader.name) + "'>" + curVal + "</td>";
		}
		return htmlToDraw;
	}
	
	/**Нарисовать раскладку для потомков и вызвать их методы drawView.
	 * Перед вызовом метод создаёт представления потомков и добавляет их в интерфейс.
	 */
	jsRecordSetClientView.prototype.drawEditView = function(){
		var childCtrls = this.ctrl.children;
		var options = {};
		var header = this.options.header;
		var id;
		var editBoxSel = this.options.editBoxSel?this.options.editBoxSel:this.myBoxSel;
		
		$.extend(options, this.options);
		
		if(childCtrls.length)	$(this.myBoxSel).html("");
			
		options.myBoxSel = null;
		options.childBoxSel = null;

		if(childCtrls.length > 1){
			var htmlToAppend = "";
			for(var i in childCtrls){
				id = "rsEdit" + getUID();
//				$(editBoxSel).append("<div id='" + id + "'></div>");
				htmlToAppend += "<div id='" + id + "'></div>";
				htmlToAppend += "<div class='recordSetSpacer'></div>";
//				options.viewBoxSel = this.myBoxSel + ">div:eq(" + i + ")";
				options.viewBoxSel = "#" + id;
				options.name = header[i];
				childCtrls[i].changeIface(this.viewInx, this, options);
//				this.ctrl.children[i].views[this.viewInx].drawView();
//				this.getChild(i).drawView();
			}
			$(editBoxSel).append(htmlToAppend);
		}
		else if(childCtrls.length){
				options.viewBoxSel = editBoxSel;
				options.name = header[0];
				childCtrls[0].changeIface(this.viewInx, this, options);
//				this.getChild(0).drawView();
		}
		jsRecordSetClientView.superclass.drawView.call(this);
	}

	/**Обработчик DOM события click на конкретной строке.
	 * @param	event
	 */
	jsRecordSetClientView.prototype.onrowclick = function(event){
		this.ctrl.event("recselect", event.data.recordInx);
	}
	
	/**Устарело. Оставляю только из боязни что-то сломать*/
	jsRecordSetClientView.prototype.onrecselect = function(recordInx){
//		this.drawEditView(recordInx);
		return true;
	}


	/**Обработчик DOM события click на конкретной ячейке.
	 * @param	event
	 */
	jsRecordSetClientView.prototype.oncellclick = function(event){
		this.ctrl.event("cellselect", event.data);
		event.stopPropagation();
		return true;
	}

	this.bind("recselect", this.onrecselect);
}
extend(jsRecordSetClientView, jsCSideView);
/**
 * @fileoverview Модуль fieldset.
 * Данный модуль осуществляет логическое и визуальное объединение набора элементов.
 * Как этим пользоваться:
 * <ul>
 * 	<li>
 * 	Создать класс контроллера, прозводный от jsFieldSetController.<br>
 * 		В нём:
 * 		<ul>
 * 			<li>
 * 			Объявить интерфейсы.
 * 			</li>
 * 			<li>
 * 			Создать потомков.
 * 			</li>
 * 		</ul>
 * 	</li>
 * 	<li>
 * 	Создать класс представления, произодный от jsFieldSetClientView.<br>
 * 		В нём:
 * 		<ul>
 * 			<li>
 * 			Проставить опции потомков.
 * 			</li>
 * 		</ul>
 * 	</li>
 * </ul>
 * Пример использования в тестовом наборе.
 */

/**Создаёт новый экземпляр класса jsFieldSetController
 * @class Набор полей. Объявляет интерфейс клиентской стороны, в котором и содержится весь функционал.
 * @constructor
 */ 
function jsFieldSetController(){
	jsFieldSetController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsFieldSetClientView};
	this.ifaceTypes.popup = {type: jsFieldSetPopUpClientView};
	this.ifaceTypes.server = {type: jsSSideView};
}
extend(jsFieldSetController, jsController);

/**Создаёт новый экземпляр класса jsFieldSetClientView
 * @class	Визуальное объединение полей и кнопки, на которые можно вешать различные обработчики.
 * 			Использование:<br>
 * 			1. Создать производный класс.<br>
 * 			2. В производном классе описать опции потомков, которые будут объединяться под эти набором полей.<br>
 * 			3. Создать контроллер, в котором объявить интерфейсы, создать потомков и прочее.
 * @constructor
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>
 * 									buttons - объект, описывающий кнопку.
 * 									Формат объекта: {name:&lt;name&gt;, value:&lt;value&gt;, handler:&lt;handler&gt;}.
 * 									<ul>
 * 										<li>name - атрибут тега button.</li>
 * 										<li>value - атрибут тега button.</li>
 * 										<li>handler - обработчик клика на кнопку.</li>
 * 									</ul>
 * 								</li>
 * 								<li>title - Заголовок. Имеет значение при simple=false и nothing=false.
 * 									Формат: {type: &lt;"link"/null&gt;, name: &lt;text&gt;, handler: &lt;метод класса - обработчик клика при type == "link"&gt;}
 * 								</li>
 * 								<li>simple - простой стиль fieldset.</li>
 * 								<li>nothing - ничего не рисует. Эта опция используется чтобы объединить логически несколько полей.</li>
 * 								<li>
 * 									tabs - fieldset с вкладками. При включенной опции tabs дочерние представления отрисовываются
 * 									на вкладках (по вкладке на "ребёнка"). Название вкладки берётся из опции title дочернего представления.
 * 									В качестве дочернего элемента удобно использовать jsFieldSet, установив его представлению опцию nothing.
 * 									При включенной опции nothing вкладки не предусмотрены.
 * 									Шаги, необходимые для добавления поддержки вкладок с новым стилем fieldset:
 * 									<ul>
 * 										<li>Для отрисовки панели вкладок поместить вызов метода drawTabBar в нужное место drawView.</li>
 * 										<li>Для того, чтобы вкладки были "кликабельны" поместить вызов метода setTabClicks в нужное место drawView.</li>
 * 										<li>Создать CSS файл fieldset_tabs_xxx.css</li>
 * 										<li>Создать набор рисунков для CSS в image/tabs_xxx</li>
 * 										<li>Добавить возможность выключения файлов CSS и рисунков из сборки редактированием jhmvc.kconfig и build/modlist.sh</li>
 * 									</ul>
 * 								</li>
 * 								<li>
 * 									pages - fieldset, разбитый на страницы, как в google.
 * 									<ul>
 * 										<li>
 * 											prev - языковой ключ ссылки "Предыдующая".
 * 										</li>
 * 										<li>
 * 											next - языковой ключ ссылки "Следующая".
 * 										</li>
 * 										<li>
 * 											maxPageLinks - Максимальное количество отображаемых ссылок на страницы. Если не задано, то количество ничем не ограничено.
 * 															Пока не поддерживается!
 * 										</li>
 * 									</ul>
 * 								</li>
 * 								<li>
 * 									wizard - fieldset, позволяющий перемещаться по своим потомкам с помощью кнопок "next", "prev".
 * 									Включение опции wizard не подразумевает автоматической добавление кнопок "next", "prev".
 * 									Т.к. реакция на кнопки может сильно отличаться в зависимости от вида мастера, то кнопки надо объявлять
 * 									самостаятельно с помощью опции buttons. Класс предоставляет метод switchChild для перемещения по шагам мастера,
 * 									который можно вызывать после совершения всех специфических действий в обработчике нажатия на кнопку.
 * 									Опция wizard ведёт себя аналогично опциям pages и tabs, за исключением того, что не рисует никаких дополнительных панелей.
 * 									Текущий шаг мастера (видимый потомок) определяется свойством activeTab и изменяется методом switchChild.
 * 								</li>
 * 								<li>
 * 									slider - fieldset, позволяющий сворачивать/разворачивать содержимое.
 * 									Следующие опции имеют значение только при включенной опции slider:
 * 									<ul>
 * 										<li>
 * 											nocollapse - Слайдер вырождается в обычный разделитеть.
 * 										</li>
 * 										<li>
 * 											collapsed - Начальное состояние слайдера свёрнутое.
 * 										</li>
 * 										<li>
 * 											title - Заголовок слайдера. Не путать с одноимённой опцией, которая задаёт заголовок окна. Этот title имеет формат строки, а не объекта.
 * 										</li>
 * 										<li>
 * 											descText - Текст описания слайдера. Распологается под заголовком.
 * 										</li>
 * 										<li>
 * 											descClass - Класс CSS описания слайдера. Задаёт стиль описания слайдера.
 * 										</li>
 * 									</ul>
 * 								</li> 
 * 							</ul>
 */
function jsFieldSetClientView(ctrl, viewInx, options){
	if(options){
		//Копирование опций не требующих наследования. Сама опция обнуляется что-бы пресечь наследование.
		var title = options.title;
		var tabs  = options.tabs;
		var wizard  = options.wizard;
		options.title = "";
		options.tabs = false;
		options.wizard = false;
	}
	jsFieldSetClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	if(options){
		//Восстановить опции не требующих наследования
		this.options.title = title;
		this.options.tabs = tabs;
		this.options.wizard = wizard;
	}		

	/**Отрисовка fieldset.
	 * Метод производного класса должен вызывать его в начале.
	 */
	jsFieldSetClientView.prototype.drawView = function(){
		var htmlToDraw;
		var childCtrls = this.ctrl.children;
		var button;
		var options = this.options;
		var title = options.title?options.title:"&nbsp;";
		var obj = null;
		var	htmlToDraw = "";
		
		if(options.slider){
			if(options.nocollapse){
				htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderNoCollapse'>";
			}
			else{
				if(options.collapsed){
					htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderCollapsed'>";
				}
				else{
					htmlToDraw		+= 	"<div class='fieldSetSlider fieldSetSliderExpanded'>";
				}
			}
			htmlToDraw		+= 	"<div>";

			if(options.title){
				htmlToDraw	+=	lng(options.title);
			}
			htmlToDraw		+=	"</div></div>";		//конец fieldSetSlider
			if(options.descClass){
				htmlToDraw	+=	"<div class='" + options.descClass + "'>";
			}
			else{
				htmlToDraw	+=	"<div class='fieldSetSliderBottom'>";
			}
			if(options.descText){
				htmlToDraw	+=	"<div>" + lng(options.descText) + "</div>";
			}
			htmlToDraw		+=	"</div>";		//конец fieldSetSliderBottom
	
		}
		if(options.slider || options.nothing){
			if(options.slider && options.collapsed && !options.nocollapse){
				htmlToDraw	+=	"<div style='display:none'></div>";
			}
			else{
				htmlToDraw	+=	"<div></div>";
			}
			if(options.pages && childCtrls.length > 1){
				this.pageBarSel = this.viewBoxSel + ">div.fieldSetPages";
				htmlToDraw	+=	this.drawPageBar();
			}

			if(this.options.buttons){
				this.buttonBarSel = this.viewBoxSel + ">div.fieldSetMainButtons";
				htmlToDraw	+=	"<div class='fieldSetMainButtons'>";
				htmlToDraw	+=	this.drawButtons();
				htmlToDraw	+=	"</div>";
			}

			$(this.viewBoxSel).html(htmlToDraw);

			if(options.slider){
				this.childBoxSel = this.viewBoxSel + ">div:eq(2)";
			}
			else{
				this.childBoxSel = this.viewBoxSel + ">div:eq(0)";
			}
			
			this.options.childBoxSel = this.childBoxSel;

			if(options.pages && childCtrls.length > 1){
				this.setPageClicks();
			}
			this.setButtonClicks();
			
			if(options.slider && !options.nocollapse){
				$(this.viewBoxSel + ">div.fieldSetSlider").bind("click", 
																				{},
																				context(this).callback(this.toggleSlider));
			}
		}
		else if(options.simple){
			if(options.tabs && childCtrls.length > 1){
				this.tabBarSel = this.viewBoxSel + ">div.fieldSetMainTabsSimple"
				htmlToDraw	+=		"<div class='fieldSetMainTabsSimple'>";
				htmlToDraw	+=		this.drawTabBar();
				htmlToDraw	+=		"</div>";
			}
			htmlToDraw += "<div><fieldset></fieldset></div><div class='fieldSetMainButtons'>";
			htmlToDraw += this.drawButtons();
			htmlToDraw += "</div>";

			if(options.pages && childCtrls.length > 1){
				this.pageBarSel = this.viewBoxSel + ">div.fieldSetPages";
				htmlToDraw	+=		this.drawPageBar();
			}

			$(this.viewBoxSel).html(htmlToDraw);

			
			if(options.tabs && childCtrls.length > 1){
				this.buttonBarSel = this.viewBoxSel + ">div:eq(2)";
			}
			else{
				this.buttonBarSel = this.viewBoxSel + ">div:eq(1)";
			}
			this.setButtonClicks();

			if(options.tabs){
				this.setTabClicks();
			}
			else if(options.pages && childCtrls.length > 1){
				this.setPageClicks();
			}

			this.childBoxSel = this.viewBoxSel + ">div>fieldset";
			this.options.childBoxSel = this.childBoxSel;
		}
		else{
			if(options.title){
				if(options.title.type == "link"){
					title = "<font class='fieldSetTitleLink'>" + lng(options.title.name) + "</font>"
				}
				else{
					title = "<font class='fieldSetTitleText'>" + lng(options.title.name) + "</font>"
				}
			}
			else{
				title = "&nbsp;";
			}
	
			//раскладка viewBoxSel
			htmlToDraw 	= 			"<div class='fieldSetMainPath'><div style='display: inline; vertical-align: middle;'></div>"
						+ 			"<div style='margin-left: 4px; display: inline;'>"
	//					+ 			"<font class='fieldSetTitle'>"
						+ 			title
	//					+ 			"</font>"
						+ 			"</div></div>"
						+ 			"<div class='fieldSetMainContentContainer'>";
			if(options.tabs && childCtrls.length > 1){
				this.tabBarSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainTabs"
				htmlToDraw	+=		"<div class='fieldSetMainTabs'>";
				htmlToDraw	+=		this.drawTabBar();
				htmlToDraw	+=		"</div>";
			}
			htmlToDraw  +=			"<div class='fieldSetMainContent'>"
						+ 			"<div class='fieldSetGeneral' style='display: block;'>"
						+ 			"</div></div>"
						+ 			"<div class='fieldSetMainButtons'>";
	
			if(options.pages && childCtrls.length > 1){
				this.pageBarSel = this.viewBoxSel + " div.fieldSetPages";
				htmlToDraw	+=		this.drawPageBar();
			}
			htmlToDraw 	+= this.drawButtons();
			htmlToDraw	+= 		"</div></div>";

			$(this.viewBoxSel).html(htmlToDraw);
			
			this.buttonBarSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainButtons";
			this.setButtonClicks();
			
			if(options.title && options.title.type == "link"){
				$(this.viewBoxSel + ">div.fieldSetMainPath>div>font").bind("click", 
																				{},
																				context(this).callback(options.title.handler));
			}
			if(options.tabs){
				this.setTabClicks();
			}
			else if(options.pages && childCtrls.length > 1){
				this.setPageClicks();
			}
			
			this.childBoxSel = this.viewBoxSel + ">div.fieldSetMainContentContainer>div.fieldSetMainContent>div.fieldSetGeneral";
			this.options.childBoxSel = this.childBoxSel;
		}

			
		if(options.pages && childCtrls.length > 1){
			this.switchPage(this.activeTab);
		}
		if(options.wizard && childCtrls.length > 1){
			this.switchChild(this.activeTab);
		}

		//раскладка childBoxSel
		if(childCtrls.length)	$(this.childBoxSel).html("");
		var htmlToAppend = "";
		var j = 0;
		if(childCtrls.length > 1){
			for(var i in childCtrls){
//				$(this.childBoxSel).append("<div></div>");
				htmlToAppend += "<div></div>";
				obj = this.getChild(i);
				if(!(obj instanceof jsCSideView)) continue;
				if(options.tabs || options.pages || options.wizard){
					obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j + ")";
				}
				else{
//					$(this.childBoxSel).append("<div class='fieldSetSpacer'></div>");
					htmlToAppend += "<div class='fieldSetSpacer'></div>";
					obj.viewBoxSel = this.childBoxSel + ">div:eq(" + j*2 + ")";
				}
				obj.options.viewBoxSel = obj.viewBoxSel;
				j++
			}

			if(options.tabs || options.pages || options.wizard){
				for(var i=0;i<this.ctrl.children.length;i++){
					obj = this.getChild(i);
					if(obj instanceof jsCSideView){
						obj.options.hide = true;
					}
				}
				this.getChild(this.activeTab).options.hide = false;
			}

			$(this.childBoxSel).append(htmlToAppend);
		}
		else if(childCtrls.length){
			obj = this.getChild(0);
			if(obj instanceof jsCSideView){
				obj.viewBoxSel = this.childBoxSel;
				obj.options.viewBoxSel = obj.viewBoxSel;
			}
		}

		jsFieldSetClientView.superclass.drawView.call(this);
	}
	

	/**Переключить состояние слайдера.*/
	this.toggleSlider = function(){
		var options = this.options;
		var obj = $(options.viewBoxSel + ">div.fieldSetSlider");
		if(options.collapsed){
			obj.removeClass("fieldSetSliderCollapsed");
			obj.addClass("fieldSetSliderExpanded");
			$(options.childBoxSel).css("display", "");
			options.collapsed = false;
		}
		else{
			obj.removeClass("fieldSetSliderExpanded");
			obj.addClass("fieldSetSliderCollapsed");
			$(options.childBoxSel).css("display", "none");
			options.collapsed = true;
		}
	}
	
	/**Скрыть кнопку
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.hideButton = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).css("display", "none");
		}				
	}

	/**Показать кнопку.
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.showButton = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).css("display", "");
		}				
	}
	
	/**Запретить кнопку
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.disableButton = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).attr("disabled", true);
		}				
	}

	/**Разрешить кнопку.
	 * @param	{String} name	Имя, которое передавалось для кнопки в опциях (options.name).
	 */
	jsFieldSetClientView.prototype.enableButton = function(name){
		if(this.buttons){
			$(this.buttons[name].sel).attr("disabled", false);
		}				
	}

	/**Обновить кнопки.
	 */
	jsFieldSetClientView.prototype.updateButtons = function(){
		if(this.options.buttons){
			$(this.buttonBarSel).html(this.drawButtons());
			this.setButtonClicks();
		}
		else{
			$(this.buttonBarSel).html("");
		}
	}
	
	/**Показать вкладку.
	 * Подсвечивает вкладку и показывает её содержимое.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.showTab = function(tabInx){
		var tabSel = this.tabBarSel + ">span:eq(" + tabInx + ")";
		var prevTabInx = tabInx - 1;
		var prevTabSel = this.tabBarSel + ">span:eq(" + prevTabInx + ")";
		if(tabInx == 0){
			$(tabSel).removeClass("tabStartOff");
			$(tabSel).addClass("tabStartOn");
			$(tabSel + ">span:eq(1)").removeClass("tabBgOff");
			$(tabSel + ">span:eq(1)").addClass("tabBgOn");
			$(tabSel + ">span:eq(2)").removeClass("tabMidOff");
			$(tabSel + ">span:eq(2)").addClass("tabMidLeftOn");
		}
		else if(tabInx > 0 && tabInx < this.ctrl.children.length - 1){
			$(prevTabSel + ">span:last").removeClass("tabMidRightOff");
			$(prevTabSel + ">span:last").addClass("tabMidRightOn");
			$(tabSel + ">span:eq(0)").removeClass("tabBgOff");
			$(tabSel + ">span:eq(0)").addClass("tabBgOn");
			$(tabSel + ">span:eq(1)").removeClass("tabMidOff");
			$(tabSel + ">span:eq(1)").addClass("tabMidLeftOn");
			
		}
		else if(tabInx == this.ctrl.children.length - 1){
			$(prevTabSel + ">span:last").removeClass("tabMidRightOff");
			$(prevTabSel + ">span:last").addClass("tabMidRightOn");
			$(tabSel + ">span:eq(0)").removeClass("tabBgOff");
			$(tabSel + ">span:eq(0)").addClass("tabBgOn");
			$(tabSel + ">span:eq(1)").removeClass("tabEndOff");
			$(tabSel + ">span:eq(1)").addClass("tabEndOn");
		}
		this.getChild(tabInx).show();
	}
	
	/**Cкрыть  вкладку.
	 * Приглушает вкладку и скрывает её содержимое.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.hideTab = function(tabInx){
		var tabSel = this.tabBarSel + ">span:eq(" + tabInx + ")";
		var prevTabInx = tabInx - 1;
		var prevTabSel = this.tabBarSel + ">span:eq(" + prevTabInx + ")";
		if(tabInx == 0){
			$(tabSel).removeClass("tabStartOn");
			$(tabSel).addClass("tabStartOff");
			$(tabSel + ">span:eq(1)").removeClass("tabBgOn");
			$(tabSel + ">span:eq(1)").addClass("tabBgOff");
			$(tabSel + ">span:eq(2)").removeClass("tabMidLeftOn");
			$(tabSel + ">span:eq(2)").addClass("tabMidOff");
		}
		else if(tabInx > 0 && tabInx < this.ctrl.children.length - 1){
			$(prevTabSel + ">span:last").removeClass("tabMidRightOn");
			$(prevTabSel + ">span:last").addClass("tabMidRightOff");
			$(tabSel + ">span:eq(0)").removeClass("tabBgOn");
			$(tabSel + ">span:eq(0)").addClass("tabBgOff");
			$(tabSel + ">span:eq(1)").removeClass("tabMidLeftOn");
			$(tabSel + ">span:eq(1)").addClass("tabMidOff");
		}
		else if(tabInx == this.ctrl.children.length - 1){
			$(prevTabSel + ">span:last").removeClass("tabMidRightOn");
			$(prevTabSel + ">span:last").addClass("tabMidRightOff");
			$(tabSel + ">span:eq(0)").removeClass("tabBgOn");
			$(tabSel + ">span:eq(0)").addClass("tabBgOff");
			$(tabSel + ">span:eq(1)").removeClass("tabEndOn");
			$(tabSel + ">span:eq(1)").addClass("tabEndOff");
		}
		this.getChild(tabInx).hide();
	}
	
	/**Переключиться на вкладку.
	 * Переключается на новую вкладку.
	 * @param	{int}		tabInx		Индекс вкладки.
	 */
	jsFieldSetClientView.prototype.switchTab = function(tabInx){
		this.hideTab(this.activeTab);
		this.showTab(tabInx);
		this.activeTab = tabInx;
	}
	
	/**Переключиться на страницу.
	 * @param	{int}		pageInx		Индекс страницы.
	 */
	jsFieldSetClientView.prototype.switchPage = function(pageInx){
		var pos = new Number(this.activeTab) + 1;
		$(this.pageBarSel + ">a:eq(" + pos + ")").removeClass("fieldSetPageActive");
		pos = new Number(pageInx) + 1;
		$(this.pageBarSel + ">a:eq(" + new Number(pageInx + 1) + ")").addClass("fieldSetPageActive");
		pos = this.ctrl.children.length + 1;
		if(pageInx == 0){
			$(this.pageBarSel + ">a:eq(0)").css("display", "none");
			$(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "");
		}
		else if(pageInx == this.ctrl.children.length - 1){
			$(this.pageBarSel + ">a:eq(0)").css("display", "");
			$(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "none");
		}
		else{
			$(this.pageBarSel + ">a:eq(0)").css("display", "");
			$(this.pageBarSel + ">a:eq(" + pos + ")").css("display", "");
		}
		this.switchChild(pageInx);
	}
	
	/**Изменить видимого потомка.
	 * @param	childId		Индекс или алиас потомка.
	 */
	jsFieldSetClientView.prototype.switchChild = function(childId){
		this.getChild(this.activeTab).hide();
		var child = this.getChild(childId);
		child.show();
		this.activeTab = child.ctrl.thisInx;
	}
	
	/**Сгенерировать HTML код панели вкладок.
	 * @return	HTML код панели вкладок.
	 */
	jsFieldSetClientView.prototype.drawTabBar = function(){
		var childrenLength = this.ctrl.children.length;
		var htmlToDraw	=		"<span class='tabStart tabStartOn'>"
						+		"<span>"
						+		"</span>"
						+		"<span class='fieldSetTabText tabBgOn'>"
						+		"<a>" + lng(this.getChild(0).options.title) + "</a>"
						+		"</span>"
						+		"<span class='tabMidLeft tabMidLeftOn'>"
						+		"</span>"
						+		"</span>";
		for(var i=1;i<childrenLength-1;i++){
			htmlToDraw	+=		"<span>"
						+		"<span class='fieldSetTabText tabBgOff'>"
						+		"<a>" + lng(this.getChild(i).options.title) + "</a>"
						+		"</span>"
						+		"<span class='tabMidLeft tabMidOff'>"
						+		"</span>"
						+		"</span>";
		}
		htmlToDraw		+=		"<span>"
						+		"<span class='fieldSetTabText tabBgOff'>"
						+		"<a>" + lng(this.getChild(childrenLength-1).options.title) + "</a>"
						+		"</span>"
						+		"<span class='tabEnd tabEndOff'>"
						+		"</span>"
						+		"</span>";
		return htmlToDraw;
	}

	/**Сгенерировать HTML код панели переключения страниц.
	 * @return	HTML код панели вкладок.
	 */
	jsFieldSetClientView.prototype.drawPageBar = function(){
		var childrenLength = this.ctrl.children.length;
		var options = this.options;

		var	htmlToDraw = "<div class='fieldSetPages'>";
		htmlToDraw	+=	"<a class='fieldSetPrev'>";
		if(!no(options.prev)){
			htmlToDraw	+=	lng(this.options.prev);
		}
		htmlToDraw	+=	"</a>";
		for(var i in this.ctrl.children){
			htmlToDraw	+=	"<a>" + (new Number(i) + 1) + "</a>";
		}
		htmlToDraw	+=	"<a class='fieldSetNext'>";
		if(!no(options.next)){
			htmlToDraw	+=	lng(this.options.next);
		}
		htmlToDraw	+=	"</a>";
		htmlToDraw	+=	"</div>";

		return htmlToDraw;
	}

	/*Нарисовать кнопки*/
	this.drawButtons = function(){
		var options = this.options;
		var htmlToDraw = "";
		if(options.buttons){
			for(var i=0;i<options.buttons.length-1;i++){
				button = options.buttons[i];
				if(button){		//защита для IE от массива с запятой в конце [1,2,3,] 
					htmlToDraw 	+= "<input name='" + button.name + "' value='" + lng(button.value) + "' class='fieldSetButton' type='button'>&nbsp;";
				}
			}
			button = options.buttons[i];
			if(button){		//защита для IE от массива с запятой в конце [1,2,3,] 
				htmlToDraw 	+= "<input name='" + button.name + "' value='" + lng(button.value) + "' class='fieldSetButton' type='button'>";
			}
		}
		return htmlToDraw;
	}
	
	/**Обработчик DOM события от клика на ссылке вкладки.
	 * В event.data.tabInx приходит индекс вкладки.
	 * @param	event
	 */
	jsFieldSetClientView.prototype.ontabclick = function(event){
		this.switchTab(event.data.tabInx);
	}	

	/**Обработчик DOM события от клика на ссылке страницы.
	 * В event.data.pageInx приходит индекс вкладки.
	 * @param	event
	 */
	jsFieldSetClientView.prototype.onpageclick = function(event){
		if(event.data.prev){
			this.switchPage(this.activeTab - 1);
		}
		else if(event.data.next){
			this.switchPage(this.activeTab + 1);
		}
		else{
			this.switchPage(event.data.pageInx);
		}
	}	

	/**Проставляет обработчики события "click" на вкладках.
	 */
	jsFieldSetClientView.prototype.setTabClicks = function(){
		var tabLinkSel = this.tabBarSel + ">span:eq(0)>span:eq(1)>a";
		for(var i=1;i<this.ctrl.children.length;i++){
			$(tabLinkSel).bind("click", {tabInx:i-1}, context(this).callback(this.ontabclick));
			tabLinkSel = this.tabBarSel + ">span:eq(" + i + ")>span:eq(0)>a";
		}
		$(tabLinkSel).bind("click", {tabInx:this.ctrl.children.length-1}, context(this).callback(this.ontabclick));
	}

	/**Проставляет обработчики события "click" на панели переключения страниц.
	 */
	jsFieldSetClientView.prototype.setPageClicks = function(){
		var pageLinkSel;
		var pos;
		$(this.pageBarSel + ">a.fieldSetPrev").bind("click", {prev:true}, context(this).callback(this.onpageclick));
		pos = this.ctrl.children.length + 1;
		$(this.pageBarSel + ">a.fieldSetNext").bind("click", {next:true}, context(this).callback(this.onpageclick));
		for(var i=0;i<this.ctrl.children.length;i++){
			pos = i + 1;
			pageLinkSel = this.pageBarSel + ">a:eq(" + pos + ")";
			$(pageLinkSel).bind("click", {pageInx:i}, context(this).callback(this.onpageclick));
		}
	}

	/**Проставляет обработчики события "click" на кнопках.
	 */
	jsFieldSetClientView.prototype.setButtonClicks = function(){
			var options = this.options;
			//проставить onclick'и
			if(options.buttons){
				var buttonSel;
				this.buttons = {};
				for(var i=0;i<options.buttons.length;i++){
					button = options.buttons[i];
					if(button){		//защита для IE от массива с запятой в конце [1,2,3,] 
						buttonSel = this.buttonBarSel + ">input:eq(" + i + ")";
						this.buttons[button.name] = {sel: buttonSel};
						$(buttonSel).bind("click", 
																												{},
																												context(this).callback(button.handler));
					}
				}
			}
	}
	
	/**Проставляет обработчики события "click" на кнопках.
	 */
	jsFieldSetClientView.prototype.onerrstat = function(){
		var options = this.options;
		if(options.slider && options.collapsed){
			this.toggleSlider();
		}
		return true;
	}
	
	/**Номер активной вкладки или страницы.
	 * Инициализируется из одноимённой опции и изменяется методами switchTab и switchPage.
	 * @see		#showTab
	 * @see		#hideTab
	 * @type	int
	 */
	this.activeTab = this.options.activeTab?this.options.activeTab:0;
	/**Селектор панели вкладок.
	 * @see		#drawView
	 * @type	String
	 */
	this.tabBarSel = null;
	/**Селектор панели переключения страниц.
	 * @see		#drawView
	 * @type	String
	 */
	this.pageBarSel = null;

	this.bind("errstat", this.onerrstat)
}
extend(jsFieldSetClientView, jsCSideView);

/**Создаёт новый экземпляр класса jsFieldSetPopUpClientView
 * @class	Всплывающее окно.
 * 			Использовать так как jsFieldSetPopUpClientView.
 * @constructor
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 									Опции:
 * 									<ul>
 * 										<li>width - Ширина окна.</li>
 * 										<li>height - Высота окна</li>
 * 									</ul>
 */
function jsFieldSetPopUpClientView(ctrl, viewInx, options){
	options.simple = false;
	options.nothing = false;
	
	jsFieldSetPopUpClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Отрисовка.
	 */
	jsFieldSetPopUpClientView.prototype.drawView = function(){
		jsFieldSetPopUpClientView.superclass.drawView.call(this);
		var dialog = this.viewBoxSel;
		var caption = this.viewBoxSel+">div.fieldSetMainPath";
		var options = this.options;
		
		if (!options.notCloser) {
//			$(caption).append($("<div class='dialog_closer' style='float:right' />").append($("<img src='../image/closer.png' style='cursor:pointer' />")));
			$(caption).append("<div class='dialog_closer'></div>");
		}
		$(caption).css('cursor', 'move');
		$(this.viewBoxSel+">div.fieldSetMainPath>div.dialog_closer").click(context(this).callback(this.hide));
		$(this.viewBoxSel).css({
			'display': 'none',
			'position': 'absolute',
			'z-index': '9999',
			'box-shadow': '0px 0px 20px #000',
			'-moz-box-shadow': '0px 0px 20px #000',
			'-webkit-box-shadow': '0px 0px 20px #000'
		});
		$(this.viewBoxSel + '>div:last>div:eq(0)').css({'overflow': 'auto', 'width': options.width, 'height': options.height});
		
		document.extra = {
			dragging: false,
			oldLeft: 0,
			oldTop: 0
		};
		
		$(caption).mousedown(function(e){
			document.extra.dragging = true;
			document.extra.oldLeft = e.pageX - $(this).offset().left;
			document.extra.oldTop = e.pageY - $(this).offset().top;
			$('body').css('cursor', 'move');
			return false;
		});
				
		$(caption).mouseup(function(e){
			document.extra.dragging = false;
			$('body').css('cursor', 'default');
			return false;
		});
		
		$('body').mouseup(function(e){
			if (document.extra.dragging) {
				$(caption).mouseup();
				return false;
			}
		});
				
		$('body').mousemove(function(e){
			if (document.extra.dragging) {
				var x = e.pageX - $(caption).offset().left;
				var y = e.pageY - $(caption).offset().top;
				$(dialog).css({
					'left': $(dialog).offset().left + x - document.extra.oldLeft,
					'top': $(dialog).offset().top + y - document.extra.oldTop
				});
				return false;
			}
		});
		

		return false;
	}
	
	/**Обработчик всех событий от открытия/закрытия диалога этого класса.
	 * Нужен только чтобы обеспечить всплытие события из-за несовершенства коры.
	 * Запуск события непосредственно родителю чреват его отсутствием.
	 * @return	true/false всплывать иль невсплывать вот в чём вопрос.
	 */
	this.hnd = function(){
		return true;
	}
	
	/**Показать диалоговое окно.
	 */
	jsFieldSetPopUpClientView.prototype.show = function() {
		this.ctrl.event("showpopupdlg", this);
		$(this.viewBoxSel).css('left', $(document).scrollLeft() + $(window).width()/2-$(this.viewBoxSel).width()/2);
		$(this.viewBoxSel).css('top', $(document).scrollTop() + ($(window).height()/2-$(this.viewBoxSel).height()/2));
		$(this.viewBoxSel).fadeIn("slow");
	}
	
	/**Скрыть диалоговое окно.
	 */
	jsFieldSetPopUpClientView.prototype.hide = function() {
		this.ctrl.event("hidepopupdlg", this);
		$('body').css('overflow', 'auto');
		//Скрыть глушилку
		this.hideModalOverlay();
		//Скрыть окно
		$(this.viewBoxSel).fadeOut("slow");
	}
	
	/**Показать диалоговое окно в модальном режиме.
	 */
	jsFieldSetPopUpClientView.prototype.showModal = function(){
		this.ctrl.event("showpopupmodaldlg", this);
		$('body').css('overflow', 'hidden');
		this.showModalOverlay();
		this.show();
		
	}
	
	this.isWin = true;

	this.bind("showpopupdlg", this.hnd);
	this.bind("showpopupmodaldlg", this.hnd);
	this.bind("hidepopupdlg", this.hnd);
}
extend(jsFieldSetPopUpClientView, jsFieldSetClientView);
/* *************************
 * jhmvc library edit module
 * 
 * *************************/

/**Создаёт новый экземпляр класса jsInputController
 * @class			Контроллер полей ввода. Единственное назначение - хранение и установка признака modified.<br>
 * @constructor
 */ 
function jsEditController(){
	jsEditController.superclass.constructor.call(this);
	
	/**Признак того, что хотя бы в одном из представлений поле было изменено.
	 * @type	bool
	 */
	this.modified = false;
	
	/**Обработчик "fieldchange".
	 * Устанавливает признак того, что хотя бы в одном из представлений поле было изменено.
	 */
	this.setModified = function(obj){
		this.modified = true;
		return true;
	}

	this.addEventHandler("fieldchange", this.setModified);
	
}
extend(jsEditController, jsController);

/**Создаёт новый экземпляр класса jsEditClientView
 * @class 							Представляет базовую функциональность полей ввода.
 * @constructor
 * @param	{int}		viewInx		Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{Object}	ctrl		Ссылка на контроллер.
 * @param	{Object}	options		Опции представления.
 * 									jsEditClientView принимает следующие опции:<br>
 * 									<ul>
 * 										<li>comment - Комментарий к полю.</li>
 * 										<li>optional - Необязательное поле. Будут игнорироваться все statusCode оканчивающиеся на Empty</li>
 * 										<li>summary	-  Показать в режиме "сводки" (без поля комментария)</li>
 * 									</ul>
 */
function jsEditClientView(ctrl, viewInx, options){
	jsEditClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отрисовка раскладки элемента редактирования.
	 * Раскладка включает себя следующие элементы:<br>
	 * 1. Контейнер для поля конкретного вида, которое определяет производный класс.<br>
	 * 2. Комментарий, если есть (опция comment).<br>
	 * 3. Сообщение об ошибке, если есть (поле statusCode).<br>
	 * После отработки метода поле myBoxSel указывает методу drawView производного класса куда
	 * вставлять поле редактирования. Метод производного класса должен вызывать его в начале.
	 */
	jsEditClientView.prototype.drawView = function(){
		var htmlToDraw;
		var options = this.options;
		var statusCode = this.ctrl.model?this.ctrl.model.statusCode:null;
		var uid = getUID();
		var errorMessage = statusCode?lng(statusCode):"";
		var comment = options.comment?lng(options.comment):"";
		var inputBoxId = "editInputBox" + uid;
		this.inputId = "editInput" + uid;
		var errorId = "editError" + uid;
		var commentId = "editComment" + uid;
		var style = options.inputPadding?" style='width: " + options.inputPadding + "'":"";
		this.errorSel = "#" + errorId;
		this.commentSel = "#" + commentId;
		this.inputSel = "#" + this.inputId;
		options.myBoxSel = null;
		options.childBoxSel = "#" + inputBoxId;

		htmlToDraw  = "<div class='edit'>";
		htmlToDraw += "<div class='label'" + style + ">";
		htmlToDraw += "<label for='" + this.inputId + "'>";
		if(options.humanName){
			htmlToDraw += lng(options.humanName) + ":"
		}
		else{
			htmlToDraw += "&nbsp;"
		}
		htmlToDraw += "</label>";
		htmlToDraw += "</div>"; //label
		htmlToDraw += "<div id='" + inputBoxId + "' class='input'></div>";
		htmlToDraw += "<div id='" + errorId + "' class='error'>" + errorMessage + "</div>";
		htmlToDraw += "<div style='clear: both'></div>";
		htmlToDraw += "<div id='" + commentId + "'class='comment'>" + comment + "</div>";
		htmlToDraw += "<div style='clear: both'></div></div>";
		htmlToDraw += "<div style='clear: both'></div>";

		var child = this.getChild(0);	//Может быть только один потомок
		if(child instanceof jsCSideView){
			child.options.viewBoxSel = options.childBoxSel;
			child.inputId = this.inputId;
		}
		$(options.viewBoxSel).html(htmlToDraw);

		if(options.mandatory && !options.optional && !options.summary){
			this.setMandatory();
		}
		if(!comment.length){
			this.cleanComment();
		}
		jsEditClientView.superclass.drawView.call(this);
	}

	/**Подкорректировать стиль запрещённого поля.
	 */
	jsEditClientView.prototype.disable = function(view){
		this.setOption("disabled", true);
		$(this.options.viewBoxSel).addClass("editDisabled");
		this.hideError();
		var obj = this.getChild(0);
		if(obj.disable instanceof Function){
			obj.disable();
		}
		this.clearMandatory();
	}

	/**Вернуть стиль разрешённого поля.
	 */
	jsEditClientView.prototype.enable = function(view){
		this.setOption("disabled", false);
		var options = this.options;
		$(options.viewBoxSel).removeClass("editDisabled");
		var obj = this.getChild(0);
		if(obj.statusCode){
			this.showError();
		}
		if(obj.enable instanceof Function){
			obj.enable();
		}
		if(options.mandatory && !options.optional && !options.summary){
			this.setMandatory();
		}
	}
	
	/**Обработчик события 'validate'.
	 * Скрывает/показывает сообщение об ошибке, но только если она произошла в этом представлении.
	 */
	jsEditClientView.prototype.onvalidate = function(view){
//		if(!view) return false;
		if(this.viewInx == view.viewInx){
			this.setError();
		}
		return false;
	}

	/**Скрывает/показывает сообщение об ошибке.
	 */
	jsEditClientView.prototype.setError = function(statusCode){
		var child = this.getChild(0);

		statusCode = statusCode?statusCode:(child.statusCode?child.statusCode:this.statusCode);
		if(statusCode){
			$(this.errorSel).html(lng(statusCode));
			this.showError();
		}
		else{
			$(this.errorSel).html("");
			this.hideError();
		}
	}
	
	/**Показать сообщение об ошибке.
	 */
	jsEditClientView.prototype.showError = function(){
		$(this.errorSel).show();
		$(this.inputSel).addClass('validate');
	}

	/**Скрыть сообщение об ошибке.
	 */
	jsEditClientView.prototype.hideError = function(){
		$(this.errorSel).hide();
		$(this.inputSel).removeClass('validate');
	}
	
	/**Установить поле комментария.
	 * @param	{String}	comment
	 */
	jsEditClientView.prototype.setComment = function(comment){
		$(this.commentSel).html(lng(comment));
	}
	
	jsEditClientView.prototype.cleanComment = function(){
		$(this.commentSel).html("").hide();
	}

	jsEditClientView.prototype.onfieldchange = function(obj){
		this.ctrl.getParent().event("fieldchange", {view:this, value:obj.value}, true);
		return false;
	}

	/**Установить признак обязательного поля (*).
	 */
	jsEditClientView.prototype.setMandatory = function(){
		this.clearMandatory();
		$(this.options.viewBoxSel + " div.label").append("<span class='mandatory'>*</span>");
	}

	/**Снять признак обязательного поля (*).
	 */
	jsEditClientView.prototype.clearMandatory = function(){
		$(this.options.viewBoxSel + " span.mandatory").detach();
	}

/*	
	jsEditClientView.prototype.onmandatory = function(flag){
		if(flag){
			this.setMandatory();
		}
		else{
			this.clearMandatory();
		}
		return false;
	}
*/
	this.bind("fieldchange", this.onfieldchange);
	this.bind("validate", this.onvalidate);
//	this.bind("mandatory", this.onmandatory);
	
	/**Селектор сообщения об ошибке.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.errorSel = null;
	
	/**Селектор комментария.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.commentSel = null;

	/**ID поля ввода, которое рисуется производным классом.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.inputId = null;

	/**Селектор поля ввода, которое рисуется производным классом.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.inputSel = null;
	
}
extend(jsEditClientView, jsCSideView);

/**Создаёт новый экземпляр класса jsInputModel
 * @class			Модель, представляющая введённые пользователем данные.
 * 					Данные представляются одной переменной value.
 * @param	value	Значение модели.
 * @constructor
 */ 
function jsInputModel(value){
	jsInputModel.superclass.constructor.call(this);
	
	/**Значение модели*/
	this.value = value;
	
	
	/**Преобразовать значение модели в строку.
	 * Поскольку модель уже и так фактически строка, это метод только делает
	 * проверку на наличие значения с помощью функции no() и, если она завершилась
	 * успешно, то возвращает пустую строку "".
	 * @see GLOBALS#no
	 */
	jsInputModel.prototype.toString = function(){
		var value;
		if(no(this.value)){
			value = "";
		}
		else{
			value = this.value;
		}
		return value;
	}
	
}
extend(jsInputModel, jsModel);

/**Создаёт новый экземпляр класса jsInputController
 * @class			Контроллер полей ввода. Объявляет набор интерфейсов и создаёт модель.<br>
 * 					Типы интерфейсов: 
 * 					<ul>
 * 						<li>input - текстовое поле.</li>
 * 						<li>select - выпадающий список.</li>
 * 						<li>selectex - дверовидный выпадающий список.</li>
 * 						<li>radio - радио-кнопка.</li>
 * 						<li>checkbox - галка.</li>
 * 						<li>number - числовое поле.</li>
 * 						<li>text - статический текст</li>
 * 						<li>server - серверный интерфейс</li>
 * 					</ul>
 * текстовое поле, выпадающий список, радио-кнопка, галка, числовое поле.
 * 					Серверный интерфейс один.
 * @param	value	Значение для создания модели.
 * @constructor
 */ 
function jsInputController(value){
	jsInputController.superclass.constructor.call(this);

	/**Добавляет потомка котролу field.
	 * Сделано для расширенного списка, чтобы не надо было лезть в потроха контрола.
	 */
	jsInputController.prototype.addItem = function(){
		return this.addChild.apply(this.getChild("field"), arguments);
	}
	
	this.ifaceTypes.input = {type: jsInputSlotView};
	this.ifaceTypes.select = {type: jsInputSlotView};
	this.ifaceTypes.selectex = {type: jsInputSlotView};
	this.ifaceTypes.radio = {type: jsInputSlotView};
	this.ifaceTypes.radio2 = {type: jsRadio2SlotView};
	this.ifaceTypes.checkbox = {type: jsInputSlotView};
	this.ifaceTypes.number = {type: jsInputSlotView};
	this.ifaceTypes.text = {type: jsInputSlotView};
		
	this.addChild(new jsInputFieldController(value), "field");
	this.changeModel(this.getChild("field").model);
}
extend(jsInputController, jsEditController);

/**Создаёт новый экземпляр класса jsInputSlotView
 * @class			Внешняя раскладка для полей ввода.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * @constructor
 */ 
function jsInputSlotView(ctrl, viewInx, options){
	ctrl.getChild("field").nextIface = ctrl.lastIface;
	if(ctrl.lastIface == "number") options.mandatory = true;
	jsInputSlotView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	jsInputSlotView.prototype.drawView = function(){
		
		try{
			switch(this.ctrl.model.value.__attrs__.mode){
				case 4:
					this.setOption("disabled", true);
				break;
				case 0:
					this.options.hide = true;
				break;
			}
		}
		catch(e){}

		jsInputSlotView.superclass.drawView.call(this);
					
	}
}
extend(jsInputSlotView, jsEditClientView);

/**Создаёт новый экземпляр класса jsRadio2SlotView
 * @class 							Внешняя раскладка для радиокнопок версии 2 (с описаниями на каждую кнопку).
 * @constructor
 * @param	{int}		viewInx		Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{Object}	ctrl		Ссылка на контроллер.
 * @param	{Object}	options		Опции представления.
 * 									jsRadio2SlotView принимает следующие опции:<br>
 * 									<ul>
 * 										<li>summary	-  Показать в режиме "сводки" (без поля комментария)</li>
 * 									</ul>
 */
function jsRadio2SlotView(ctrl, viewInx, options){
	ctrl.getChild("field").nextIface = ctrl.lastIface;
	jsRadio2SlotView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отрисовка раскладки элемента редактирования.
	 */
	jsRadio2SlotView.prototype.drawView = function(){

		try{
			switch(this.ctrl.model.value.__attrs__.mode){
				case 4:
					this.setOption("disabled", true);
				break;
				case 0:
					this.options.hide = true;
				break;
			}
		}
		catch(e){}

		var htmlToDraw;
		var options = this.options;
		var statusCode = this.ctrl.model?this.ctrl.model.statusCode:null;
		var uid = getUID();
		var errorMessage = statusCode?lng(statusCode):"";
		var comment = options.comment?lng(options.comment):"";
		var inputBoxId = "editInputBox" + uid;
		this.inputId = "editInput" + uid;
		var errorId = "editError" + uid;
		var commentId = "editComment" + uid;
		var style = options.inputPadding?" style='padding-left: " + options.inputPadding + "'":"";
		this.errorSel = "#" + errorId;
		this.commentSel = "#" + commentId;
		this.inputSel = "#" + this.inputId;
		options.myBoxSel = null;
		options.childBoxSel = "#" + inputBoxId;

		if(options.summary){
			htmlToDraw	= "<div class='radio2smr'>";
			htmlToDraw += "<div class='name'> " + lng(options.humanName) + "</div>";
		}
		else{
			htmlToDraw	= "<div class='radio2'>";
			htmlToDraw += "<div class='name'> " + lng(options.humanName) + ":</div>";
		}
		htmlToDraw += "<div class='input' id='" + inputBoxId + "' " + style + "></div>";
		htmlToDraw += "<div style='clear: both'></div>";
		htmlToDraw += "</div>";

		var child = this.getChild(0);	//Может быть только один потомок
		if(child instanceof jsCSideView){
			child.options.viewBoxSel = options.childBoxSel;
			child.inputId = this.inputId;
		}
		$(options.viewBoxSel).html(htmlToDraw);

		jsRadio2SlotView.superclass.drawView.call(this);
	}

	/**Подкорректировать стиль запрещённого поля.
	 */
	jsRadio2SlotView.prototype.disable = function(view){
		this.setOption("disabled", true);
		$(this.options.viewBoxSel).addClass("radio2Disabled");
		this.getChild(0).disable();
	}

	/**Вернуть стиль разрешённого поля.
	 */
	jsRadio2SlotView.prototype.enable = function(view){
		this.setOption("disabled", false);
		$(this.options.viewBoxSel).removeClass("radio2Disabled");
		this.getChild(0).enable();
	}

	/**Сообщить об ошибке.
	 * @param	{String}	statusCode	Код ошибки.
	 */
	jsRadio2SlotView.prototype.setError = function(statusCode){
		var child = this.getChild(0);

		statusCode = statusCode?statusCode:(child.statusCode?child.statusCode:this.statusCode);
		if(statusCode){
			alert(lng(statusCode));
			this.showError();
		}
	}
	/**ID поля ввода, которое рисуется производным классом.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.inputId = null;

	/**Селектор поля ввода, которое рисуется производным классом.
	 * Выставляется методом drawView.
	 * @see #drawView
	 * @type String
	 */
	this.inputSel = null;
}
extend(jsRadio2SlotView, jsCSideView);

/**Создаёт новый экземпляр класса jsInputFieldController
 * @class			Контроллер полей ввода. Объявляет набор интерфейсов и создаёт модель.<br>
 * 					Типы интерфейсов: 
 * 					<ul>
 * 						<li>input - текстовое поле.</li>
 * 						<li>select - выпадающий список.</li>
 * 						<li>selectex - дверовидный выпадающий список.</li>
 * 						<li>radio - радио-кнопка.</li>
 * 						<li>checkbox - галка.</li>
 * 						<li>number - числовое поле.</li>
 * 						<li>text - статический текст</li>
 * 						<li>server - серверный интерфейс</li>
 * 					</ul>
 * текстовое поле, выпадающий список, радио-кнопка, галка, числовое поле.
 * 					Серверный интерфейс один.
 * @param	value	Значение для создания модели.
 * @constructor
 */ 
function jsInputFieldController(value){
	jsInputFieldController.superclass.constructor.call(this);
	
	this.ifaceTypes.input = {type: jsInputClientView};
	this.ifaceTypes.select = {type: jsSelectClientView};
	if(!no(window.jsSelectExClientView)){
		this.ifaceTypes.selectex = {type: jsSelectExClientView};
	}
	this.ifaceTypes.radio = {type: jsRadioClientView};
	this.ifaceTypes.radio2 = {type: jsRadio2ClientView};
	this.ifaceTypes.checkbox = {type: jsCheckboxClientView};
	this.ifaceTypes.number = {type: jsNumberClientView};
	this.ifaceTypes.text = {type: jsStaticTextClientView};
	
	this.changeModel(new jsInputModel(value));

	
	/**Признак того, что хотя бы в одном из представлений поле было изменено.
	 * @type	bool
	 */
	this.modified = false;
	
	/**Обработчик "fieldchange".
	 * Устанавливает признак того, что хотя бы в одном из представлений поле было изменено.
	 */
	this.setModified = function(obj){
		this.modified = true;
		return true;
	}

	this.addEventHandler("fieldchange", this.setModified);
}
extend(jsInputFieldController, jsController);

/**Создаёт новый экземпляр класса jsBaseInputView
 * @class			Базовый функционал для полей ввода.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>disabled - Запретить элемент редактирования.</li>
 * 								<li>extrattrs - Дополнительные атрибуты тега input или select.</li>
 * 							</ul>
 * @constructor
 */ 
function jsBaseInputView(ctrl, viewInx, options){
	jsBaseInputView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Отрисовка раскладки и всякие сопутствующие действия.
	 * @param	{String}	htmlToDraw	HTML для отрисовки.
	 */
	jsBaseInputView.prototype.html = function(htmlToDraw){
		var options = this.options;
		$(options.viewBoxSel).html(htmlToDraw);
		this.$input = $(this.inputSel);
		this.updateView();
		for(var i in options.extrattrs){
			this.$input.attr(i, options.extrattrs[i]);
		}
		if(options.title){
			this.$input.attr("title", lng(options.title));
		}
		if(options.disabled) this.disable();
		this.$input.bind("blur", context(this).callback(this.onfieldchangejq));
	}

	/**Стандартное jquery 'change' событие от поля input или select.
	 * Запускает jHMVC событие fieldchange и останавливает дальнейшее всплытие события методом stopPropagation.
	 * Останавливать всплытие вернув false нельзя, так как это интерпретируется некоторыми браузерами как отказ
	 * от изменения значения в поле.
	 * @param	event	Объект события.
	 */
	jsBaseInputView.prototype.onfieldchangejq = function(event){
		var value = this.val();
		if(this.lastValue != value){
			this.ctrl.event("fieldchange", {view:this, value:value}, true);
			
			event.stopPropagation();
			this.validate();
			this.lastValue = value;
		}
		return true;
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * Для select и radio надо переопределять.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		if(!no(value)){
			if(this.options.summary){
				this.$input.html(value);
			}
			else{
				this.$input.val(value);
			}
		}
		if(this.options.summary){
			return this.$input.html();
		}
		else{
			return this.$input.val();
		}
	}

	/**Запретить элемент редактирования.
	 */
	jsBaseInputView.prototype.disable = function(){
		$(this.inputSel).attr("disabled", true);
	}

	/**Разрешить элемент редактирования.
	 */
	jsBaseInputView.prototype.enable = function(){
		$(this.inputSel).attr("disabled", false);
	}

	/**Cбросить statusCode если поле необязательное и валидатор производного класса обнаружил пустое поле.
	 * Поле становится необязательным если установлена опция "optional"
	 * @type	bool
	 * @return	Код возврата метода базового класса.
	 */
	jsBaseInputView.prototype.validate = function(){
		if(this.options.optional){
			var patt=/.*Empty$/;
			if(patt.test(this.statusCode)) this.statusCode = null;
		}
		this.ctrl.event("validate", this, true);
		return jsBaseInputView.superclass.validate.call(this);
	}
		
	/**jQuery объект поля ввода
	 * @type	Object
	 */
	this.$input = null;	

	/**Последнее введённое значение. Используется для того, чтобы имитировать событие blur, т.к. событие change не всегда корректно срабатывает.
	 */
	this.lastValue = null;
}
extend(jsBaseInputView, jsCSideView);

/**Создаёт новый экземпляр класса jsInputClientView
 * @class			Представление текстового поля ввода.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>password - Генерировать поле пароля (со звёздочками)(bool).</li>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 							</ul>
 * @constructor
 */ 
function jsInputClientView(ctrl, viewInx, options){
	jsInputClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отрисовка поля ввода*/
	jsInputClientView.prototype.drawView = function(){
		jsInputClientView.superclass.drawView.call(this);
		
		var htmlToDraw = "";
		var options = this.options;
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
			htmlToDraw  = "<input id='" + this.inputId + "' type='";
			htmlToDraw += options.password?"password":"text";
			htmlToDraw += "'/>";
		}

		this.html(htmlToDraw);
	}
	
	/**Обновить модель.
	 * Так как поле текстовое, валидатора нет.
	 * При option.summmary не работает
	 */
	jsInputClientView.prototype.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsInputClientView.superclass.updateModel.call(this);
	}
	
	/**Обновить представление.
	 * Значения undefined и null интерпретируются как пустая строка "".
	 * @see jsInputModel#toString
	 */
	jsInputClientView.prototype.updateView = function(){
		this.val(this.ctrl.model.value);
		jsInputClientView.superclass.updateView.call(this);
	}
}
extend(jsInputClientView, jsBaseInputView);

/**Создаёт новый экземпляр класса jsSelectClientView
 * @class			Представление выпадающего списка.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>valset - набор значений.<br>
 * 											Например: {value0:"val0", value1:"val1"}.<br>
 * 											Ключ является также языковым ключом.<br>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 							</ul>
 * @constructor
 */ 
function jsSelectClientView(ctrl, viewInx, options){
	jsSelectClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Нарисовать выпадающий список*/
	jsSelectClientView.prototype.drawView = function(){
		jsSelectClientView.superclass.drawView.call(this);
		
		var htmlToDraw = "";
		var attr;
		var options = this.options;
		var value = this.ctrl.model.value;
		var valset = options.valset;
	
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
			htmlToDraw				= "<select id='" + this.inputId + "'>";
			if(valset){
				for(var i in valset){
					htmlToDraw		+= 	"<option value='" + valset[i] + "'>" + lng(i) + "</option>";
				}
			}
			htmlToDraw				+=	"</select>";
		}

		this.html(htmlToDraw);
		this.$input.unbind("blur");
		this.$input.bind("change", context(this).callback(this.onfieldchangejq));
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		var valset = this.options.valset;
		if(this.options.summary){
			if(!no(value)){
				var humanValue = "";
				for(var i in valset){
					if(value == valset[i]){
						humanValue = i;
						break;
					}
				}
				this.$input.html(lng(humanValue));
			}
			return valset[this.$input.html()];
		}
		else{
			if(!no(value)){
				this.$input.val(value);
			}
			return this.$input.val();
		}
	}
	
	/**Обновить модель
 	 * При option.summmary не работает
	 */ 
	this.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsSelectClientView.superclass.updateModel.call(this);
	}
	
	/**Обновить представление*/
	this.updateView = function(){
		this.val(this.ctrl.model.value);
		jsSelectClientView.superclass.updateView.call(this);
	}
}
extend(jsSelectClientView, jsBaseInputView);

/**Создаёт новый экземпляр класса jsRadioClientView
 * @class			Представление радио-кнопки.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>valset - набор значений.<br>
 * 											Например: {value0:"val0", value1:"val1"}.<br>
 * 											Ключ является также языковым ключом.<br>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 							</ul>
 * @constructor
 */ 
function jsRadioClientView(ctrl, viewInx, options){
	jsRadioClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Нарисовать радио-кнопку*/
	this.drawView = function(){
		jsRadioClientView.superclass.drawView.call(this);
		
		var htmlToDraw = "";
		var attr;
		var value = this.ctrl.model.value;		
		var options = this.options;
		var valset = options.valset;
		
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
			var humanValue = value;
			if(valset){
				for(var i in valset){
					if(value == valset[i]){
						humanValue = i;
						break;
					}
				}
			}
			htmlToDraw += no(humanValue)?"":lng(humanValue);
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = options.viewBoxSel + " input[name='" + this.inputId + "']";
			if(valset){
				for(var i in valset){
					htmlToDraw			+=	"<div><label><input type='radio' name='" + this.inputId + "' value='"+valset[i]+"' ";
					if(value == valset[i]){
						htmlToDraw		+=	"checked ";
					}
					htmlToDraw			+=	"/>"+lng(i)+"</label></div>";
				}
			}
		}

		this.html(htmlToDraw);
		this.$input.unbind("blur");
		this.$input.bind("change", context(this).callback(this.onfieldchangejq));
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		var valset = this.options.valset;
		if(this.options.summary){
			if(!no(value)){
				var humanValue = "";
				for(var i in valset){
					if(value == valset[i]){
						humanValue = i;
						break;
					}
				}
				this.$input.html(lng(humanValue));
			}
			return valset[this.$input.html()];
		}
		else{
			if(!no(value)){
				var j = 0;
				for(var i in valset){
					if(value == valset[i]){
						this.$input.eq(j).attr("checked", true);
					}
					else{
						this.$input.eq(j).attr("checked", false);
					}
					j++;
				}
			}
			if(this.$input.length > 0 && !this.$input.filter(":checked").length){
				return this.$input.filter(":eq(0)").val();
			}
			else{
				return this.$input.filter(":checked").val();
			}
		}
		
	}
	
	/**Обновить модель
 	 */
	this.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsRadioClientView.superclass.updateModel.call(this);
	}
	
	/**Обновить представление*/
	this.updateView = function(){
		this.val(this.ctrl.model.value);
		jsRadioClientView.superclass.updateView.call(this);
	}
}
extend(jsRadioClientView, jsBaseInputView);


/**Создаёт новый экземпляр класса jsRadio2ClientView
 * @class			Представление радио-кнопки с возможностью добавить описание к каждому значению.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опция summary не требуется так как вместо неё можно использовать представление jsRadioClientView с опцией summary.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>valset - набор значений.<br>
 * 											Например: {<br>
 * 														val0: {value: "value0", desc: "desc0", disabled: true},<br>
 * 														val1: {value: "value1", desc: "desc1"}<br>
 * 													   }<br>
 * 											value является языковым ключом.<br>
 * 											desc является языковым ключом.<br>
 * 							</ul>
 * @constructor
 */ 
function jsRadio2ClientView(ctrl, viewInx, options){
	jsRadio2ClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Нарисовать радио-кнопку*/
	this.drawView = function(){
		jsRadio2ClientView.superclass.drawView.call(this);
				
		var htmlToDraw = "";
		var attr;
		var value = this.ctrl.model.value;		
		var options = this.options;
		var valset = options.valset;
		var obj;
		var id;
		
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = this.myBoxSel + " input[name='" + this.inputId + "']";
			if(valset){
				htmlToDraw += "<ul class='radio2'>";
				for(var i in valset){
					obj = valset[i];
					id = this.inputId + "_" + i;
					htmlToDraw += "<li onclick='var obj = $(this).children(\"input\"); obj.attr(\"checked\", true); obj.change();'>";
					htmlToDraw += "<input name='" + this.inputId + "' type='radio' value='" + i + "'>";
					htmlToDraw += obj.value?lng(obj.value):"";
					htmlToDraw += "<div>";
					htmlToDraw += obj.desc?lng(obj.desc):"";
					htmlToDraw += "</div>";
					htmlToDraw += "</li>";
				}
				htmlToDraw += "</ul>";
			}
		}
		
		this.html(htmlToDraw);
		this.$input.unbind("blur");
		this.$input.bind("change", context(this).callback(this.onfieldchangejq));
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		var valset = this.options.valset;
		if(this.options.summary){
			if(!no(value)){
				this.$input.html(lng(valset[value].value));
			}
			var humanValue = this.$input.html();
			for(var i in valset){
				if(humanValue == lng(valset[i])){
					return i;
				}
			}
		}
		else{
			if(!no(value)){
				var j = 0;
				for(var i in valset){
					if(value == i){
						this.$input.eq(j).attr("checked", true);
					}
					else{
						this.$input.eq(j).attr("checked", false);
					}
					j++;
				}
			}
			if(this.$input.length > 0 && !this.$input.filter(":checked").length){
				return this.$input.filter(":eq(0)").val();
			}
			else{
				return this.$input.filter(":checked").val();
			}
		}
	}
}
extend(jsRadio2ClientView, jsRadioClientView);


/**Создаёт новый экземпляр класса jsCheckboxClientView
 * @class			Представление галки.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>valset - набор значений с двумя фиксированными ключами - on, off.<br>
 * 											Например: {on:"val0", off:"val1"}.<br>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 							</ul>
 * @constructor
 */
function jsCheckboxClientView(ctrl, viewInx, options){
	jsCheckboxClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Нарисовать галку.*/
	this.drawView = function(){
		jsCheckboxClientView.superclass.drawView.call(this);
		
		var htmlToDraw = "";
		var options = this.options;

		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
	
			htmlToDraw	+=	"<input type='checkbox' "
						+	"id='" + this.inputId + "' "
						+	"value='unimportant'>";
		}
		this.html(htmlToDraw);
		this.$input.unbind("blur");
		this.$input.bind("change", context(this).callback(this.onfieldchangejq));
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		var options = this.options;
		var valset = options.valset;
		if(options.summary){
			if(!no(value)){
				if(value == valset.on){
					this.$input.html(lng("yes"));
				}
				else{
					this.$input.html(lng("no"));
				}
			}
			if(this.$input.html() == lng("yes")){
				return valset.on;
			}
			else{
				return valset.off;
			}
		}
		else{
			if(!no(value)){
				if(value == options.valset.on){
					this.$input.attr("checked", true);
				}
				else{
					this.$input.attr("checked", false);
				}
			}
			if(this.$input.attr("checked")){
				return valset.on;
			}
			else{
				return valset.off;
			}
		}
	}
	/**Обновить модель*/
	this.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsCheckboxClientView.superclass.updateModel.call(this);
	}
	
	/**Обновить представление*/
	this.updateView = function(){
		this.val(this.ctrl.model.value);
		jsCheckboxClientView.superclass.updateView.call(this);
	}
}
extend(jsCheckboxClientView, jsBaseInputView);

/**Создаёт новый экземпляр класса jsNumberClientView
 * @class			Представление числа (пока только десятичного). 
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>minval - минимальное значение числа.</li>
 * 								<li>maxval - максимальное значение числа.</li>
 * 							</ul>
 * @constructor
 */
function jsNumberClientView(ctrl, viewInx, options){
	jsNumberClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	

	/**Устарело. Оставляю только из боязни что-то сломать*/	
	this.drawView = function(){
		jsNumberClientView.superclass.drawView.call(this);
//		this.validate();
	}
	
	
	/**Устарело. Оставляю только из боязни что-то сломать*/	
	this.updateView = function(){
		jsNumberClientView.superclass.updateView.call(this);
//		this.validate();
	}

	/**Обновить модель.
	 * Запускает валидатор и, в случае успеха, обновляет модель методом базового класса.
	 * @type	bool
	 * @return	false если валидатор завершился неудачей.
	 * 			Результат работы метода базового класса если валидатор завершился успешно .
	 */
	this.updateModel = function(){
		var res = false;
		if(this.validate()){
			res = jsNumberClientView.superclass.updateModel.call(this);
			var value = this.ctrl.model.value;
			if(value && value != ""){
				this.ctrl.model.value = parseInt(this.ctrl.model.value, 10);
			}
		}
		return res;
	}
	
	/**Проверить число ли это и принадлежит ли оно интервалу [minval, maxval].
	 * statusCode может принимать следующие значения:<br>
	 * <span>&nbsp;&nbsp;</span>numEmpty		-	пользователь оставил поле пустым.
	 * <span>&nbsp;&nbsp;</span>numNaN			-	пользователь ввёл не число.
	 * <span>&nbsp;&nbsp;</span>numLessThanMin	-	Число меньше минимального.
	 * <span>&nbsp;&nbsp;</span>numMoreThanMax	-	Число больше максимального.
	 * Если при скрытом или запрещённом представлении валидатор находит ошибку, то устанавливает значение undefined
	 * в поле ввода и сбрасывает код ошибки.
	 * @type	bool
	 * @return	Код возврата метода базового класса.
	 */
	this.validate = function(){
		var result = true;
		var value;
		var re = new RegExp("^[0-9]+(\.?[0-9]+|[0-9]*)$");

		var options = this.options;
		value = this.val();
		
		if(value.match(/^\s*$/)){
			this.statusCode = "numEmpty";
		}
		else if (!re.test(value)) {/*if(parseInt(value, 10).toString() == "NaN"){*/
			this.statusCode = "numNaN";
		}
		else if(!no(options.minval) && value < options.minval){
			this.statusCode = "numLessThanMin";
		}
		else if(!no(options.maxval) && value > options.maxval){
			this.statusCode = "numMoreThanMax";
		}
		else{
			this.statusCode = null;
		}
		if((this.options.ishidden || this.options.disabled) && this.statusCode){
			this.val(undefined);
			this.statusCode = null;
		}
		return jsNumberClientView.superclass.validate.call(this);
	}
}
extend(jsNumberClientView, jsInputClientView);

/**Создаёт новый экземпляр класса jsStaticTextClientView
 * @class			Представление статического текстового поля.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления. Никаких специальных опций для этого класса нет.
 * @constructor
 */ 
function jsStaticTextClientView(ctrl, viewInx, options){
	jsStaticTextClientView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отрисовка тектового поля.*/
	jsStaticTextClientView.prototype.drawView = function(){
		jsStaticTextClientView.superclass.drawView.call(this);
		
		var options = this.options;
		this.inputSel = options.viewBoxSel;
		delete this.inputId;
		this.html("");
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * Для select и radio надо переопределять.
	 * @param	{String}	value	Значение для установки.
	 * @return	String				Значение контрола.
	 */
	this.val = function(value){
		if(!no(value)){
			this.$input.html(value);
		}
		return this.$input.html();
	}

	/**Обновить представление.
	 * Значения undefined и null интерпретируются как пустая строка "".
	 * @see jsInputModel#toString
	 */
	jsStaticTextClientView.prototype.updateView = function(){
		this.val(this.ctrl.model.value);
		jsStaticTextClientView.superclass.updateView.call(this);
	}
}
extend(jsStaticTextClientView, jsBaseInputView);

/**Генератор стандартного описания обычного поля ввода для метода describe.
 * @param	{Object}	obj	Краткое описание обычного поля ввода.
 */
controlTypes.input = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "input";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Генератор стандартного описания поля ввода пароля для метода describe.
 * @param	{Object}	obj	Краткое описание поля ввода пароля.
 */
controlTypes.password = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "input";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	opt.password = true;
}

/**Генератор стандартного описания выпадающего списка для метода describe.
 * @param	{Object}	obj	Краткое описание выпадающего списка.
 * 							Формат:
 * 								{
 *									name: <имя>,
 * 									value: <значение>,
 * 									valset: <набор значений>
 * 								}
 */
controlTypes.select = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "select";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	opt.valset = obj.valset;
}

/**Генератор стандартного описания радио кнопки для метода describe.
 * @param	{Object}	obj	Краткое описание радио кнопки.
 * 							Формат:
 * 								{
 *									name: <имя>,
 * 									value: <значение>,
 * 									valset: <набор значений>
 * 								}
 */
controlTypes.radio = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "radio";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	opt.valset = obj.valset;
}

/**Генератор стандартного описания чекбокса для метода describe.
 * @param	{Object}	obj	Краткое описание чекбокса.
 * 							Формат:
 * 								{
 *									name: <имя>,
 * 									value: <значение>,
 * 									valset: <набор значений>
 * 								}
 * 							Формат valset см. в описании класса jsCheckboxClientView.
 * 							Набор значений по умолчанию: {on: true, off: false}.
 */
controlTypes.checkbox = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "checkbox";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	if(obj.valset){
		opt.valset = obj.valset;
	}
	else{
		opt.valset = {on: true, off: false};
	}
}

/**Генератор стандартного описания поля ввода числа для метода describe.
 * @param	{Object}	obj	Краткое описание поля ввода числа.
 * 							Формат:
 * 								{
 *									name: <имя>,
 * 									value: <значение>,
 * 									minval: <минимальное значение>,
 * 									maxval: <максимальное значение>
 * 								}
 */
controlTypes.number = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "number";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	opt.minval = obj.minval;
	opt.maxval = obj.maxval;
}

/**Генератор стандартного описания поля статического текста для метода describe.
 * @param	{Object}	obj	Краткое описание поля статического текста.
 * 							Формат:
 * 								{
 *									name: <имя>,
 * 									value: <значение>
 * 								}
 */
controlTypes.text = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "text";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**
 * @fileoverview Модуль selectex.<br />
 * Данный модуль реализует расширенный выпадающий список, элементы которого списка имеют самостаятельную реализацию и могут образовывать список любого вида.<br />
 * Как этим пользоваться:<br />
 * <ul>
 * 	<li>
 * 	Создать класс контроллера jsInputController<br>
 *  </li>
 *  <li>
 *  Добавить созданному контроллеру список методом jsSelectExClientView.addItem.<br />
 *  <i>Список может иметь древовидную или любую другую структуру, но должен удовлетворять ряду требований.<br />
 *  Если бы мы писали на языке с жёсткой типизацией поддрежиющем множественное наследование, то эти требования были бы офирмлены в виде интерфейсных классов.<br />
 *  Вот эти требования:
 *     Модель элементов списка должна содержать методы:
 *		<ul>
 *			<li>
 *				getValue /все элементы списка/
 *			</li>
 *		</ul>
 *		Представление элементов списка должно содержать методы:
 *		<ul>
 *			<li>
 *				getName /все элементы списка/
 *			</li>
 *			<li>
 *				clearSelection /корневой элемент списка/
 *			</li>
 * 			<li>
 * 				setItemSelected /все элементы списка/
 * 			</li>
 * 			<li>
 * 				clearVisited /если поддерживается поиск; корневой элемент списка/
 * 			</li>
 * 			<li>
 * 				searchItem /если поддерживается поиск; корневой элемент списка/
 * 			</li>
 * 			<li>
 * 				findItemName /корневой элемент списка/
 * 			</li>
 * 		</ul>
 * 		И свойства:
 * 		<ul>
 * 			<li>
 * 				selectedSelectExItem /корневой элемент списка/
 * 			</li>
 * 		</ul>
 * 		Прототипы и смысл методов и свойств можно посмотреть в частной реализации списка в классах jsSelectExItemView и jsSelectExItemModel.
 *  </li>
 * 	<li>
 * 	В качестве интерфейса указать 'selectex'
 * 	</li>
 * </ul></i>
 * Пример использования в тестовом наборе.
 */

/**Генератор стандартного описания расширенного выпадающего списка для метода describe.
 * @param	{Object}	obj	Краткое описание расширенного выпадающего списка.
 */
controlTypes.selectex = function(obj){
	obj.ctrl = new jsInputController(obj.value);
	obj.nextIface = "selectex";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
	opt.editable = obj.editable;
	opt.width = obj.width;
	opt.height = obj.height;
}

/**Создаёт новый экземпляр класса jsSelectExClientView
 * @class			Представление расширенного выпадающего списка.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 								<li>editable - Редактируемое поле</li>
 * 								<li>width - Ширина выпадающего списка</li>
 * 								<li>height - Высота выпадающего списка (если не указать, то будет растягиватся самостоятельно)</li>
 * 							</ul>
 * @constructor
 */ 
function jsSelectExClientView(ctrl, viewInx, options){
	jsSelectExClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Нарисовать выпадающий список*/
	jsSelectExClientView.prototype.drawView = function(){		
		var htmlToDraw = "";
		var options = this.options;
		var elemID = "elemID" + getUID();
		var childCtrls = this.ctrl.children;
		var childBoxSel = null;
		var obj;
		
		if(options.summary){
			this.inputSel = options.viewBoxSel + ">div.selectex>div.s_ex_input";
			this.childBoxSel = options.viewBoxSel + ">div.selectex>div.box";
			this.options.childBoxSel = this.childBoxSel;
			if(childCtrls.length > 0){
				obj = this.getChild(0);
				obj.options.viewBoxSel = this.options.childBoxSel;
				obj.viewBoxSel = obj.options.viewBoxSel;
			}
			htmlToDraw += "<div class='selectex'>";
			htmlToDraw += "<div class='s_ex_input'></div>";
			htmlToDraw += "<div class='box'></div>";
			htmlToDraw += "</div>";

			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
			this.childBoxSel = options.viewBoxSel + ">div.selectex>div.box";
			this.options.childBoxSel = this.childBoxSel;
			if(childCtrls.length > 0){
				obj = this.getChild(0);
				obj.options.viewBoxSel = this.options.childBoxSel;
				obj.viewBoxSel = obj.options.viewBoxSel;
			}
			htmlToDraw += "<div class='selectex'>";
			htmlToDraw += "<div class='s_ex_input'>";
			htmlToDraw += "<input type='text' id='" + this.inputId + "'";
			if(!options.editable){
				htmlToDraw += " readonly='readonly'";
			}
			htmlToDraw += "/>";
			htmlToDraw += "</div>";
			htmlToDraw += "<div class='s_ex_btn'>&nbsp;</div>";
			htmlToDraw += "<div class='clear'></div>";
			htmlToDraw += "<div class='box'></div>";
			htmlToDraw += "</div>";
		}
		
		this.html(htmlToDraw);
		
		jsSelectExClientView.superclass.drawView.call(this);

		if(!options.summary) {

			if(options.width){
				$(this.childBoxSel).css('width', options.width);
			}
			if(options.height){
				$(this.childBoxSel).css('height', options.height);
			}
			if(childCtrls.length > 0){
				$(this.childBoxSel).append("<div/>");
			}
			//привязать обработчики событий
			if(!options.disabled){
				this.$input.click(context(this).callback(this.showBox));
				$(options.viewBoxSel+'>div.selectex>div.s_ex_btn').click(context(this).callback(this.setDisplayBox));
				this.$input.keypress(context(this).callback(this.keyPress));
				// Потому что webkit-подобные и ie решили пойти своим путем :D
				if($.browser.msie || $.browser.webkit){
					this.$input.keydown(context(this).callback(this.keyDown));
				}
				//Имитация потери фокуса при клике вне viewBoxSel
				$(window).click(context(this).callback(this.onbodyclick));
				$(options.viewBoxSel).click(context(this).callback(this.onviewboxclick));
				
			}
			else{
				$(options.viewBoxSel+'>div.selectex>div.s_ex_btn').addClass("disabled");
			}
			this.getChild(0).setItemSelected(this.ctrl.model.value);
		}
	}
	
	/**Обработчик клика на body.
	 * Нужен для имитации потери фикуса списком.
	 */
	this.onbodyclick = function(){
		if(!this.infocus){
			this.hideBox(this.getChild(0).selectedSelectExItem.length);
		}
		this.infocus = false;
		return true;
	}
	
	/**Обработчик клика на боксе представления.
	 * Нужен для имитации потери фикуса списком.
	 */
	this.onviewboxclick = function(){
		this.infocus = true;
	}
	
	/**Показать\Скрыть выпадающий список*/
	this.setDisplayBox = function(e) {
		this.$input.focus();
		if ($(this.childBoxSel).is(':visible')) {
			this.hideBox(false);
		} else {
			this.showBox();
		}
		this.onviewboxclick(e);
		$(window).click();
		return false;
	}

	/**Показать выпадающий список*/
	this.showBox = function() {
		$(this.childBoxSel).show();
	}

	/**Скрыть выпадающий список*/
	this.hideBox = function(isSelected) {
		if (!isSelected) {
			this.updateView();
		}
		$(this.childBoxSel).hide();
	}

	/**Обработка нажатие клавиши (для webkit & ie)*/
	this.keyDown = function(event) {
		if(event.keyCode == 9
			|| event.keyCode == 38
			|| event.keyCode == 40){
			this.keyPress(event);
			return false;
		}
		
	}

	/**Обработка нажатие клавиши*/
	this.keyPress = function(event) {
		var rootOfList = this.getChild(0);
		var item;
		var name;
		// Если нажали enter и есть выделенный пункт списка
		if(event.keyCode == 13){
			if($(this.childBoxSel).is(':visible')){
				if(rootOfList.currentSelectExItem){
					if(rootOfList.currentSelectExItem.getName()){
						this.onselectitem(rootOfList.currentSelectExItem);
					}
					var i = this.$input.val().length;
					this.$input.caret(i,i);
				}
			}
			else if(!$(this.childBoxSel).is(':visible')){
				this.showBox();
			}
		}
		if (!isCharCode(event.which)
			&& event.keyCode != 9		//не tab
			&& event.keyCode != 38		//не стрелка вверх
			&& event.keyCode != 40){	//не стрелка вниз
			return true;
		}
		// Если выпадающий список закрыт
		if (!$(this.childBoxSel).is(':visible')) {
			this.showBox();
		}
		if (event.keyCode == 38) {		//стрелка вверх
			if (rootOfList.currentSelectExItem.ctrl.thisInx > 0) {
				item = rootOfList.currentSelectExItem.getParent().getChild(rootOfList.currentSelectExItem.ctrl.thisInx - 1).setItemSelected();
				name = item.getName();
				if(name){
					this.$input.val(lng(name));
				}
			}
			return true;
		}
		if (event.keyCode == 40) {	//стрелка вниз
			if (rootOfList.currentSelectExItem.ctrl.thisInx < rootOfList.currentSelectExItem.ctrl.getParent().children.length - 1) {
				item = rootOfList.currentSelectExItem.getParent().getChild(rootOfList.currentSelectExItem.ctrl.thisInx + 1).setItemSelected();
				name = item.getName();
				if(name){
					this.$input.val(lng(name));
				}
			}
			return true;
		}
		var nchar = '';
		var offset = 0;
		// Если нажали не tab
		if (event.keyCode != 9		//не tab
			&& event.keyCode != 38		//не стрелка вверх
			&& event.keyCode != 40) {	//не стрелка вниз
			rootOfList.clearVisited();
			nchar = String.fromCharCode(event.which);
			offset = 1;
		}
		var caret = $(event.target).caret();
		var leftText = this.$input.val().substring(0, caret.start) + nchar;
		var rightText = rootOfList.searchItem(leftText);
		if (rootOfList.selectedSelectExItem.length > 0 && rightText == null) {
			rootOfList.clearVisited();
			rightText = rootOfList.searchItem(leftText);
		}
		if (rightText != null) {
			this.$input.val(rightText);
			this.$input.caret(caret.start+offset, rightText.length);
		} else {
			this.$input.caret(caret.start, this.$input.val().length);
		}
		return false
	}
	/***/
	isCharCode = function(x) {
		if (x>46 && x != 91 && x!=92 || x==32) {
			return true;
		} else {
			return false;
		}
	}
	/**Обновить модель*/
	this.updateModel = function(){
		this.ctrl.model.value = this.val();
		return jsSelectExClientView.superclass.updateModel.call(this);
	}
	
	/**Обновить представление*/
	this.updateView = function(){
		this.val(this.ctrl.model.value);
		jsSelectExClientView.superclass.updateView.call(this);
	}

	/**Обработка события выбора пункта списка */
	this.onselectitem = function(obj){
		var name = lng(obj.getName());
		var val = obj.ctrl.model.getValue();
		this.tempValue = val;
		this.$input.val(name);
		obj.setItemSelected();
		this.hideBox(true);
		this.ctrl.event('fieldchange', {view:this,value:val}, true);
		return false; //не всплывает!
	}
	
	/**Возвращает и устанавливает значение в поле.
	 * @param	{String}	value	Значение для установки.
	 * @return	{String}			Значение контрола.
	 */
	this.val = function(value){
		if(!no(value)){
			var name = this.getChild(0).findItemName(value);
			if(this.options.summary){
				this.$input.html(lng(name));
			}
			else{
				this.$input.val(lng(name));
			}
			this.tempValue = value;
		}
		return this.tempValue;
	}
	
	this.bind("selectitem", this.onselectitem);
	
	this.tempValue = this.ctrl.model.value;
	this.infocus = false;
}
extend(jsSelectExClientView, jsBaseInputView);

/**Создаёт новый экземпляр класса jsSelectExItemModel
 * @class				Модель содержит отображаемое имя и соответствующее значение.
 * @param	itemInfo	Свойства пункта списка ({name: <имя>, value: <значение>}).
 * @constructor
 */ 
function jsSelectExItemModel(itemInfo){
	jsSelectExItemModel.superclass.constructor.call(this);
	
	this.itemName = (itemInfo.name)?itemInfo.name:'';
	this.itemValue = (itemInfo.value)?itemInfo.value:null;

		
	/**Получить значение.
	 * Интерфейсный метод.
	 * @return	{String}	Значение элемента списка.
	 */
	this.getValue = function(){
		if(!this.ctrl.children.length){
			return this.ctrl.model.itemValue;
		}
		return null;
	};
}
extend(jsSelectExItemModel, jsModel);

/**Создаёт новый экземпляр класса jsSelectExItemController
 * @class				Контроллер древовидной структуры списка.
 * @constructor
 * @param	{Object}	itemInfo	Свойства пункта списка ({name: <имя>, value: <значение>}).
 * @param	{Object}	options		Опции.<br>
 */
function jsSelectExItemController(itemInfo, options){
	jsSelectExItemController.superclass.constructor.call(this);

	if (itemInfo == undefined) {
		itemInfo = {};
	}

	this.changeModel(new jsSelectExItemModel(itemInfo));	
	this.ifaceTypes.tree = {type: jsSelectExItemView, def:true, options: {style:null,open:false,noPath:true}};
	
}
extend(jsSelectExItemController, jsController);

/**Создаёт новый экземпляр класса jsSelectExItemView
 * @class					Представление древовидной структуры списка.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * @constructor
 */ 
function jsSelectExItemView(ctrl, viewInx, options){
	jsSelectExItemView.superclass.constructor.call(this, ctrl, viewInx, options);
		
	/**Получить имя элемента списка.
	 * Интерфейсный метод.
	 * @return	{String}	Имя элемента списка.
	 */
	this.getName = function(){
		if(!this.ctrl.children.length){
			return this.ctrl.model.itemName;
		}
		return null;
	};

	 /**Обработчик клика по пункту списка.
	  */
	this.click = function(e) {
		this.ctrl.event("selectitem", this, true);
		return true;
	}
	
	/**Переопределение drawView.
	 */
	jsSelectExItemView.prototype.drawView = function(){
		jsSelectExItemView.superclass.drawView.call(this);
		if (!this.ctrl.root) {
			$(this.myBoxSel).html(lng(this.ctrl.model.itemName));
			$(this.viewBoxSel).parent().addClass('selectexItem');
			if (this.ctrl.children.length > 0) {
				$(this.viewBoxSel).addClass('branch_close');
			} else {
				$(this.viewBoxSel).addClass('leaf');
				$(this.viewBoxSel+'>a').bind('click', context(this).callback(this.click));
			}
		}
	}

	/**Переопределение активации пункта списка.
	 */
	jsSelectExItemView.prototype.onactivate = function(){
		jsSelectExItemView.superclass.onactivate.call(this);
		if (!this.ctrl.root) {
			if (this.ctrl.children.length > 0) {
				$(this.viewBoxSel).removeClass('branch_close');
				$(this.viewBoxSel).addClass('branch_open');
			} else {
				$(this.viewBoxSel+'>a').css('font-weight', 'normal');
			}
		}
		return false; // прервать всплытие события
	}
	
	/**Переопределение деактивации пункта списка
	 */
	jsSelectExItemView.prototype.ondeactivate = function(){
		jsSelectExItemView.superclass.ondeactivate.call(this);
		if (!this.ctrl.root) {
			if (this.ctrl.children.length > 0) {
				$(this.viewBoxSel).removeClass('branch_open');
				$(this.viewBoxSel).addClass('branch_close');
			}
		}
		return false; // прервать всплытие события
	}

	/**Установить выделенный элемент по значению.
	 * @param	value					Значение для сравнения со своим значением, если не задано, то выделяет себя.
	 * @return	{jsSelectExItemView}	Возвращает this потомка (или свой) у которого значения совпали.
	 * 									Если не было ни одного совпадения, то возвращает null.
	 */
	this.setItemSelected = function(value){
		//Найти элемент по значению и выделить
		if(no(value) || value == this.ctrl.model.itemValue){
			this.clearSelection();
			$(this.options.viewBoxSel).addClass('marked');
			this.ctrl.activate();
			this.rootOfTree.currentSelectExItem = this;
			this.rootOfTree.selectedSelectExItem.push(this);
			return this;
		}
		else{
			var obj;
			for(var i in this.ctrl.children){
				obj = this.getChild(i).setItemSelected(value);
				if(obj){
					return obj;
				}
			}
		}
		return null;
	}
	
	/**Очистить все выделения.
	 */
	this.clearSelection = function(){
		$(this.rootOfTree.options.viewBoxSel + ' ul.selectexItem>li.marked').removeClass('marked');
	}
	
	/**Очистить список найденных элементов.
	 */
	this.clearVisited = function(){
		this.rootOfTree.selectedSelectExItem = [];
	}

	/**Определяет, есть ли текущий элемент в списке найденных.
	 */
	this.isNotVisited = function(){
		for(var i in this.rootOfTree.selectedSelectExItem){
			if(this.rootOfTree.selectedSelectExItem[i] == this){
				return false;
			}
		}
		return true;
	}

	/**Помощник поиска значения.
	 * @param	{String}				Строка для поиска.
	 * @return	{jsSelectExItemView}	Представление найденного элемента или null.
	 */
	this.searchItem = function(str){
		var result = null;
		var obj;
		var currName = lng(this.ctrl.model.itemName);
		
		if(this.isNotVisited()
			&& !no(this.ctrl.model.itemValue)
			&& currName.length >= str.length
			&& currName.substring(0, str.length).toLowerCase() == str.toLowerCase()){
			
			this.setItemSelected();
			return currName;
		}
		else{
			for(var i in this.ctrl.children){
				result = this.getChild(i).searchItem(str);
				if(!no(result)){
					return result;
				}
			}
		}
		return null;
	}

	/**Найти название элемента списка по значению.
	 * @param				Значение для поиска имени.
	 * @return	{String}	Представление найденного элемента или null.
	 */
	this.findItemName = function(value){
		var model = this.ctrl.model;
		if(model.itemValue == value){
			return model.itemName;
		}
		else{
			var itemName;
			for(var i in this.ctrl.children){
				itemName = this.getChild(i).findItemName(value);
				if(!no(itemName)){
					return itemName;
				}
			}
		}
		return null;
	}

	/**Массив представлений найденных элементов списка.
	 * @type	Array
	 */
	this.selectedSelectExItem = [];
	
	this.bind("activate", this.onactivate);
	this.bind("deactivate", this.ondeactivate);
}
extend(jsSelectExItemView, jsViewTree);

/**Создаёт новый экземпляр класса jsSubNetAddrModel.
 * @class				Модель, представляющая адрес подсети. Общий случай, применим для всех сетевых адресов.
 * 						Она представляет его следующим образом:<br>
 * 						1. Массивом parts. Массив частей адреса (октеты в случае IPv4).<br>
 * 						2. Полем bits. Количество бит в адресе.
 * 						3. Полем bitmask. Количество бит в маске.
 * @param	{int}		bits	Общее количество бит в адресе.
 * @param	{int}		radix	Система счисления.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{String}	delim	Разделитель.
 * @param	{String}	expandZero	Заполнять нулями часть на все digitCount если часть нулевая
 * @param	{bool}		omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 */ 
function jsSubNetAddrModel(bits, addr, radix, delim, expandZero, omitFullMask){
	jsSubNetAddrModel.superclass.constructor.call(this);
	
	/**Вычислить массив частей маски адреса исходя из поля bitmask.*/
	jsSubNetAddrModel.prototype.getMaskParts = function(){
		var i = 0;
		var partCount = this.parts.length;
		var partMax = Math.pow(2, this.partBitCount) - 1;
		var b = this.bitmask - this.partBitCount;
		var maskParts = new Array();
		while(b>=0 && i < partCount){
			maskParts[i++] = partMax;
			b -= this.partBitCount;
		}
		if(i<partCount){
			if(b < 0 && b < Math.abs(this.partBitCount)){
				maskParts[i++] = (~(Math.pow(2, Math.abs(b)) - 1))&(Math.pow(2, this.partBitCount) - 1);
			}
			while(i<partCount){
				maskParts[i++] = 0;
			}
		}
		return maskParts;
	}

	/**Наложить маску.*/
	jsSubNetAddrModel.prototype.applyMask = function(){
		var maskParts = this.getMaskParts();
		for(var i=0;i<this.parts.length;i++){
			this.parts[i] = this.parts[i] & maskParts[i];
		}

	}
	
	/**Установить поле parts из строки или массива.
	 * @param				addr	Массив частей адреса или строка.
	 * @param	{int}		radix	Система счисления. Необходим если параметр addr задаётся строкой. Если не задавать, будет использ. this.radix, иначе изменит this.radix.
	 * @param	{String}	delim	Разделитель. Необходим если параметр addr задаётся строкой. Если не задавать, будет использ. this.delim, иначе изменит this.delim
	 */
	jsSubNetAddrModel.prototype.setParts = function(addr, radix, delim){
		
		try{
			this.attrs = addr.__attrs__;
		}
		catch(e){}
		
		if(!(addr instanceof Array)){
			var addrArray = (new String(addr)).split('/');
			addr = addrArray[0];
			if(addrArray.length > 1){
				this.bitmask = addrArray[1];
			}
			else{
				this.bitmask = this.bits
			}
		}

		this.radix = no(radix)?this.radix:radix;
		this.delim = no(delim)?this.delim:delim;
		
		//addr = addrArray[0];
		if(!addr && this.parts instanceof Array){
			for(var i in this.parts){
				this.parts[i] = null;
			}
		}
		else if(addr){
			if(addr instanceof Array){
				this.parts = addr;
			}
			else{
				if(this.radix && this.delim){
					var strParts = addr.split(this.delim);
					this.partBitCount = this.bits/strParts.length;
					for(var i in strParts){
						this.parts[i] = this.parsePart(strParts[i], this.radix);
					}
				}
			}
		}

		this.partBitCount = this.bits/this.parts.length;
		this.digitCount = Math.ceil(Math.log(Math.pow(2, this.partBitCount))/Math.log(this.radix));
	}	


	/**Проанализировать часть адреса и вернуть адекватное значение.
	 * @param				part	Часть адреса.
	 * @param	{int}		radix	Система счисления. Необходим если параметр addr задаётся строкой.
	 * @type	int
	 * @return						Число, если метод обнаружил в аргументе part адекватное для части адреса число,
	 * 								иначе null.
	 */
	jsSubNetAddrModel.prototype.parsePart = function(part, radix){
		var res = null;
		if(!this.checkPart(part, Math.pow(2, this.partBitCount) - 1)){
			 res = parseInt(part, radix);
		 }
		 return res;
	}
	
	/**Проверить часть сетевого адреса (октет в случае IPv4)
	 * @param	part	Часть адреса для проверки. В общем случае это строка, но может быть и число. В случае
	 * 					числа netAddrEmpty и netAddrEmpty никогда не будут иметь место. Это метод используется
	 * 					методом toString данного класса и валидатором клиентского представления.
	 * @param	maxval	Максимальное значение части.
	 * @param	radix	Система счисления. Если не указана используется this.radix.
	 * @type	String
	 * @return	Код ошибки. Возможные коды ошибки:
	 * 			<ul>
	 * 				<li>Empty</li>
	 * 				<li>NaN</li>
	 * 				<li>OutOfScope</li>
	 * 			</ul>
	 * 			В случае успеха возвращает null;
	 */
	this.checkPart = function(part, maxval, radix){
		var res = null;
		var empty = (no(part) || part.toString().match(/^\s*$/));
		var isString = part instanceof String || typeof(part) == "string";
		var radix = radix?radix:this.radix;
		if(empty){
			res = "Empty";
		}
		else{
			if(isString){
				var p = parseInt(part, radix).toString(radix);
//				if(!part.match(/^0+$/) && (p == "NaN" || p.length != part.replace(/^0*/, "").length)){
				if(!part.match(/^0+$/) && (p == "NaN" || p.length != part.replace(/^0*/, "").length)){
					res = "NaN";
				}
				else{
					part = parseInt(part, radix);
				}
			}
			if(!res){
				if(part < 0){
					res = "OutOfScope";
				}
				else if(part > maxval){
					res = "OutOfScope";
				}
			}
		}
		return res;
	}

	/**Преобразовать адрес в строку.*/
	jsSubNetAddrModel.prototype.toString = function(){
		var parts = this.parts;
		var addr = "";
		var clear = false;
		var part;
		var format = "%." + this.digitCount;
		
		switch(this.radix){
			case 2:
				format += "b";
			break;
			case 8:
				format += "o";
			break;
			case 10:
				format += "d";
			break;
			case 16:
				format += "X";
			break;
			default:
				format += "d";
			break;
		}
		
		if(parts.length){
			var noPart;
			for(var i=0;i<parts.length-1;i++){
				part = parts[i];
				noPart = no(part) && !this.optionalParts
				if(!noPart && !this.checkPart(part, Math.pow(2, this.partBitCount) - 1)){
					if(no(part)) part = 0;
					if(this.expandZero){
						addr += sprintf(format, part) + this.delim;
					}
					else{
						addr += part.toString(this.radix) + this.delim;
					}
				}
				else{
					clear = true;
					break;
				}
			}
			part = parts[parts.length-1];
			noPart = no(part) && !this.optionalParts
			if(!noPart && !clear){
				if(no(part)) part = 0;
				if(this.expandZero){
					addr += sprintf(format, part);
				}
				else{
					addr += part.toString(this.radix);
				}
			}
			else{
				addr = "";
			}
		}

		if(this.omitFullMask){
			if(addr != "" && this.bitmask && this.bitmask < this.bits) addr += "/" + this.bitmask;
		}
		else{
			if(addr != "" && this.bitmask) addr += "/" + this.bitmask;
		}
		return addr;
	}

	/**Количество бит в маске.
	 * @type	int
	 */
	this.bitmask = bits;

	/**Количество бит в маске.
	 * @type	bool	omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
	 */
	this.omitFullMask = omitFullMask;
		
	/**Массив частей адреса (октеты в случае IPv4).
	 * @type	Array
	 */
	this.parts = [];
	/**Общее количество бит в адресе.
	 * @type	int
	 */
	this.bits = bits;

	/**Система счисления. Необходим если параметр addr задаётся строкой.
	 * @type	int
	 */
	this.radix = radix;
	/**Разделитель. Необходим если параметр addr задаётся строкой.
	 * @type	String
	 */
	this.delim = delim;


	/**Количество бит в одной части адреса
	 * @type	int
	 */
	this.partBitCount = null;

	/**Количество цифр в одной части адреса
	 * @type	int
	 */
	this.digitCount = null;
	
	if(addr instanceof Object){
		this.attrs = addr.__attrs__;
	}

	this.setParts(addr, radix, delim);


	
	/**Заполнять нулями часть на все digitCount если часть нулевая
	 * @type	bool
	 */
	this.expandZero = expandZero;

}
extend(jsSubNetAddrModel, jsModel);

/**Создаёт новый экземпляр класса jsSubNetAddrController
 * @class						Главный контроллер адреса подсети.
 * 								Все аргументы используются для создания модели.
 * @param	{int}		bits	Общее количество бит в адресе.
 * @param	{int}		radix	Система счисления.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{String}	delim	Разделитель.
 * @param	{String}	expandZero	Заполнять нулями часть на все digitCount если часть нулевая
 * @param	{bool}		omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 * @see 	jsSubNetAddrModel
 */ 
function jsSubNetAddrController(bits, addr, radix, delim, expandZero, omitFullMask){
	jsSubNetAddrController.superclass.constructor.call(this);

	this.ifaceTypes.client = {type: jsSubNetAddrSlotView, options:{}};
		
	this.addChild(new jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, omitFullMask), "field");
	this.changeModel(this.getChild("field").model);

}
extend(jsSubNetAddrController, jsEditController);

/**Создаёт новый экземпляр класса jsSubNetAddrFieldController
 * @class						Контроллер поля ввода адреса подсети. Само поле ввода.
 * 								Все аргументы используются для создания модели.
 * @param	{int}		bits	Общее количество бит в адресе.
 * @param	{int}		radix	Система счисления.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{String}	delim	Разделитель.
 * @param	{String}	expandZero	Заполнять нулями часть на все digitCount если часть нулевая
 * @param	{bool}		omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 * @see 	jsSubNetAddrModel
 */ 
function jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, omitFullMask){
	jsSubNetAddrFieldController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsSubNetAddrClientView, options:{}};
	this.changeModel(new jsSubNetAddrModel(bits, addr, radix, delim, expandZero, omitFullMask));
}
extend(jsSubNetAddrFieldController, jsController);

/**Создаёт новый экземпляр класса jsSubNetAddrSlotView
 * @class							Внешняя раскладка для полей ввода.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * @constructor
 */ 
function jsSubNetAddrSlotView(ctrl, viewInx, options){
	ctrl.getChild("field").nextIface = ctrl.lastIface;
	options.mandatory = true;
	jsSubNetAddrSlotView.superclass.constructor.call(this, ctrl, viewInx, options);	
	
	jsSubNetAddrSlotView.prototype.drawView = function(){
		
		try{
			switch(this.ctrl.model.attrs.mode){
				case 4:
					this.setOption("disabled", true);
				break;
				case 0:
					this.options.hide = true;
				break;
			}
		}
		catch(e){}

		jsSubNetAddrSlotView.superclass.drawView.call(this);
					
	}
}
extend(jsSubNetAddrSlotView, jsEditClientView);

/**Создаёт новый экземпляр класса jsSubNetAddrClientView
 * @class							Представление поля ввода адреса подсети.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							<ul>
 * 								<li>summary - Показать в режиме "сводки" (текст без возможности изменения)</li>
 * 							</ul>
 * @constructor
 */ 
function jsSubNetAddrClientView(ctrl, viewInx, options){
	jsSubNetAddrClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Отрисовка поля ввода сетевого адреса.*/
	jsSubNetAddrClientView.prototype.drawView = function(){
		jsSubNetAddrClientView.superclass.drawView.call(this);
		
		var htmlToDraw;
		var model = this.ctrl.model;
		var options = this.options;
		
		if(options.summary){
			this.inputSel = options.viewBoxSel;
			delete this.inputId;
		}
		else{
			if(no(this.inputId)){
				this.inputId = "elemId" + getUID();
			}
			this.inputSel = "#" + this.inputId;
			var	size = model.digitCount*model.parts.length + model.parts.length -1;
			htmlToDraw  = "<input id='" + this.inputId + "' type='";
			htmlToDraw += options.password?"password":"text";
			htmlToDraw += "' maxlength='" + size + "'";
			htmlToDraw += "' size='" + size + "'";
			htmlToDraw += "/>";
		}

		this.html(htmlToDraw);

		if(!options.summary && (model.bitmask < model.bits || !model.omitFullMask)){
			var size = parseInt(this.$input.attr("size"));
			this.bitmaskDigitCount = Math.ceil(Math.log(this.ctrl.model.bits)/Math.log(10));
			size += this.bitmaskDigitCount + 1;
			this.$input.attr("size", size).attr("maxlength", size);
		}
			
	}
	
	/**Проверить введённый сетевой адрес.
	 * statusCode может принимать следующие значения:<br>
	 * <span>&nbsp;&nbsp;</span>subNetMaskEmpty			-	пользователь оставил поле пустым.
	 * <span>&nbsp;&nbsp;</span>subNetMaskNaN			-	пользователь ввёл не число.
	 * <span>&nbsp;&nbsp;</span>subNetMaskOutOfScope	-	Одна из частей адреса вышла за допустимые пределы.
	 * Если при скрытом или запрещённом представлении валидатор находит ошибку, то устанавливает значение undefined
	 * в поле ввода и сбрасывает код ошибки.
	 * @param	{String}	value	Значение для проверки. Если не задано, то валидатор работает как обычно, т.е. проверяет значение из поля ввода.
	 * @type	bool
	 * @return	Код возврата метода базового класса.
	 */
	jsSubNetAddrClientView.prototype.validate = function(){
		this.statusCode = null;
		var notEmpty;
		value = this.val();
		var realtek = this.options.isRealtek;
		
		if(value.match(/^\s*$/)){
			this.statusCode = "netAddrEmpty";
		}

		value = value.split("/")[0];
		var parts = value.split(this.ctrl.model.delim);
//		this.ctrl.model.partBitCount = this.ctrl.model.bits/parts.length;
		for(var i=0;i<parts.length;i++){
			value = parts[i];
			
			if(!no(value) && !value.toString().match(/^\s*$/)){
				notEmpty = true;
			}
			this.statusCode = this.ctrl.model.checkPart(value, Math.pow(2, this.partBitCount) - 1);
			if((this.options.ishidden || this.options.disabled) && this.statusCode){
				this.val(undefined);
				this.statusCode = null;
			}
			if(this.statusCode){
				if(this.statusCode == "Empty") this.statusCode = "Invalid";
				this.statusCode = "netAddr" + this.statusCode;
				break;
			}
		}

		if (realtek && options.pageTitle == 'LAN') {
			if (parts[0]!=255 || parts[1]!=255 || parts[2]!=255) {
				this.statusCode = "NetmaskErrorRealtek";
			}
		}

		if(!this.options.ishidden && !this.options.disabled && !notEmpty) this.statusCode = "netAddrEmpty";

		if(!this.statusCode){
			var arr = value.split("/");
			if(arr instanceof Array && arr[1]){
				this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10);
				if(this.statusCode){
					this.statusCode = "netAddr" + this.statusCode;
				}
			}
		}
		return jsSubNetAddrClientView.superclass.validate.call(this);
	}
	

	/**Обновить модель. Включает валидатор.
	 * @type	bool
	 * @return	true - обновилась, false - нет.
	 */
	jsSubNetAddrClientView.prototype.updateModel = function(){
		if(this.validate()){
			this.ctrl.model.setParts(this.val());
			return jsSubNetAddrClientView.superclass.updateModel.call(this);
		}
		else{
			return false;
		}
	}

	
	/**Обновить представление.
	 */
	jsSubNetAddrClientView.prototype.updateView = function(){
		this.val(this.ctrl.model.toString());
		jsSubNetAddrClientView.superclass.updateView.call(this);
	}
	
	/*Событие изменения значения поля ввода
	 * */
	jsSubNetAddrClientView.prototype.onfieldchange = function(obj){
		if (this.ctrl.subIPController) {
			this.ctrl.subIPController.getChild(0).event("guessmask", obj.value);
		}
		return true;
	}
	
	/*Событие автоматической подстановки маски подсети
	 * */
	this.onguessmask = function(ip) {
		/* IPv4 Only */
		function guessMask(ip) {
			if (ip.indexOf('.') > 0) {
				if (options.isRealtek && options.pageTitle == 'LAN') {
					return '255.255.255.0';
				} else {
					var classX = parseInt(ip.substring(0, ip.indexOf('.')));

					if (classX >= 1 && classX <= 126) {
						return '255.0.0.0';
					}
					if (classX >= 128 && classX <= 191) {
						return '255.255.0.0';
					}
					if (classX >= 192 && classX <= 223) {
						return '255.255.255.0';
					}
					return '255.255.255.0'; // Скорее всего все-таки эт�� маска :)
				}
			}
			return null;
		}
		
		var mask = guessMask(ip);
		if (mask) {
			this.ctrl.model.setParts(mask);
			this.updateView();
		}
		return true;
	}
	
	/**Количество частей адреса.
	 * @type	int
	 */
	this.partCount = this.ctrl.model.parts.length;
	/**Количество бит в одной части адреса
	 * @type	int
	 */
	this.partBitCount = this.ctrl.model.bits/this.partCount;

	/**Количество цифр в поле ввода битовой маски.
	 * Вычисляется исходя из максимального количества бит в маске.
	 * @type	int
	 */
	this.bitmaskDigitCount = Math.ceil(Math.log(this.ctrl.model.bits)/Math.log(10));
	
	this.bind("fieldchange", this.onfieldchange);
	this.bind("guessmask", this.onguessmask);
}
extend(jsSubNetAddrClientView, jsBaseInputView);


/**Генератор стандартного описания MAC адреса для метода describe.
 * @param	{Object}	obj	Краткое описание MAC адреса.
 */
controlTypes.mac = function(obj){
	obj.ctrl = new jsMAController(obj.value);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Создаёт новый экземпляр класса jsNetAddrController
 * @class						Контроллер одиночного сетевого адреса.
 * 								Все аргументы используются для создания модели.
 * @param	{int}		bits	Общее количество бит в адресе.
 * @param	{int}		radix	Система счисления.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{String}	delim	Разделитель.
 * @param	{String}	expandZero	Заполнять нулями часть на все digitCount если часть нулевая
 * @constructor
 * @see 	jsNetAddrModel
 */ 
function jsNetAddrController(bits, addr, radix, delim, expandZero){
	jsNetAddrController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsSubNetAddrSlotView, options:{}};
	
	this.addChild(new jsSubNetAddrFieldController(bits, addr, radix, delim, expandZero, true), "field");
	this.changeModel(this.getChild("field").model);
}
extend(jsNetAddrController, jsEditController);

//===============MAC адрес=======================

/**Создаёт новый экземпляр класса jsMAController
 * @class						Контроллер MAC адреса.
 * @param	{String}	addr	MAC адрес.
 * @constructor
 * @see 	jsNetAddrModel
 */ 
function jsMAController(addr){
	if(!addr) addr = [null, null, null, null, null, null];
	jsMAController.superclass.constructor.call(this, 48, addr, 16, ":", true);
	
	this.ifaceTypes.client.options = {
		delim: ":",
		radix: 16
	};
}
extend(jsMAController, jsNetAddrController);

/**Генератор стандартного описания IP адреса подсети для метода describe.
 * @param	{Object}	obj	Краткое описание IP адреса подсети.
 */
controlTypes.ipsubnet = function(obj){
	obj.ctrl = new jsSubNetIPController(obj.value, obj.version);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Генератор стандартного описания IPv4 адреса подсети для метода describe.
 * @param	{Object}	obj	Краткое описание IPv4 адреса подсети.
 */
controlTypes.ipv4subnet = function(obj){
	obj.ctrl = new jsSubNetIPv4Controller(obj.value);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Генератор стандартного описания IPv6 адреса подсети для метода describe.
 * @param	{Object}	obj	Краткое описание IPv6 адреса подсети.
 */
controlTypes.ipv6subnet = function(obj){
	obj.ctrl = new jsSubNetIPv6Controller(obj.value);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Создаёт новый экземпляр класса jsSubNetIPModel.
 * Хранить адрес одним числом нельзя из-за ограничения разрядности числа в javascript - 32.
 * @class				Модель, представляющая IP адреса версий 4 и 6.
 * 						Переопределяет методы toString и setParts для поддержки специфических нотаций IPv6<br>
 * @param	{int}		bits	Общее количество бит в адресе.
 * @param	{int}		radix	Система счисления частей (октетов в IPv4).
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{String}	delim	Разделитель частей (октетов в IPv4).
 * @param	{bool}		expandZero	Заполнять нулями часть на все digitCount если часть нулевая
 * @param	{bool}		omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 */ 
function jsSubNetIPModel(bits, addr, radix, delim, expandZero, omitFullMask){

	/**Установить поле parts из строки или массива.
	 * @param				addr	Массив частей адреса или строка.
	 * @param	{int}		radix	Система счисления. Необходим если параметр addr задаётся строкой. Если не задавать, будет использ. this.radix, иначе изменит this.radix.
	 * @param	{String}	delim	Разделитель. Необходим если параметр addr задаётся строкой. Если не задавать, будет использ. this.delim, иначе изменит this.delim
	 */
	jsSubNetIPModel.prototype.setParts = function(addr, radix, delim){
		if(this.bits == 32){
			//IPv4
			jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim);
		}
		else{
			if(!addr || addr instanceof Array){
				jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim);
			}
			else{
				//IPv6
				this.radix = no(radix)?this.radix:radix;
				this.delim = no(delim)?this.delim:delim;
				this.partBitCount = 16;
				var bitmask = addr.split("/")[1];
				if(no(bitmask)){
					this.bitmask = this.bits;
				}
				else{
					this.bitmask = parseInt(bitmask);
				}
				if(addr.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)){
					this.parts = this.parseIPv4MappedIPv6(addr);
				}
				else if(addr.match(/::/) || addr.match(/^0+:0+/) || addr.match(/0+:0+$/)){
					this.parts = this.parseShortNotation(addr);
				}
				else{
					jsSubNetIPModel.superclass.setParts.call(this, addr, radix, delim);
				}
				this.partBitCount = this.bits/this.parts.length;
				this.digitCount = Math.ceil(Math.log(Math.pow(2, this.partBitCount))/Math.log(this.radix));
			}
		}
	}
	
	/**Распарсить сокращённую нотацию IPv6
	 * @param	{String}	addr	Адрес
	 * @type				Array	Массив частей адреса
	 */
	this.parseShortNotation = function(addr){
		addr = addr.split(/\//)[0];
		addr = addr.replace(/^::/, "z:");
		addr = addr.replace(/::$/, ":z");
		addr = addr.replace(/^0:0/, "z:");
		addr = addr.replace(/0:0$/, ":z");
		addr = addr.replace(/::/, ":z:");
		var arr = addr.split(/:/);
		
		var parts = [0,0,0,0,0,0,0,0];
		var j = 0;
		for(var i in arr){
		   if(arr[i] != "z"){
		      parts[j++] = this.parsePart(arr[i], this.radix);
		   }
		   else{
		      break;
		   }
		}
		j = parts.length - 1;
		for(var i=arr.length-1;i>=0;i--){
		   if(arr[i] != "z"){
		      parts[j--] = this.parsePart(arr[i], this.radix);;
		   }
		   else{
		      break;
		   }
		}
		return parts;
	}
	
	/**Распарсить IPv6, отображенный на IPv4
	 * @param	{String}	addr	Адрес
	 * @type				Array	Массив частей адреса
	 */
	this.parseIPv4MappedIPv6 = function(addr){
		var parts = [0,0,0,0,0,0xffff,0,0];
		var ipv4 = addr.match(/[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)[0];
		var arr = ipv4.split(".");
		var part7 = sprintf("%.2X%.2X", parseInt(arr[0], 10), parseInt(arr[1], 10));
		parts[6] = this.parsePart(part7, this.radix);
		var part8 = sprintf("%.2X%.2X", parseInt(arr[2], 10), parseInt(arr[3], 10));
		parts[7] = this.parsePart(part8, this.radix);
		return parts;
	}

	/**Преобразовать адрес в строку.*/
	jsSubNetIPModel.prototype.toString = function(noMappedIPv4){
		if(this.bits == 32){
			//IPv4
			return jsSubNetIPModel.superclass.toString.call(this);
		}
		else{
			//IPv6
			var addr = "";
			var parts = this.parts;
			if(!noMappedIPv4
				&& parts[0] == 0
				&& parts[1] == 0
				&& parts[2] == 0
				&& parts[3] == 0
				&& parts[4] == 0
				&& parts[5] == 0xffff){
					if(!no(parts[6]) && !no(parts[7])){
						//IPv6, отображенный на IPv4
						addr = sprintf("::ffff:%d.%d.%d.%d", (parts[6] & 0xff00) >>> 8, parts[6] & 0x00ff, (parts[7] & 0xff00) >>> 8, parts[7] & 0x00ff);
						if(this.bitmask < this.bits || !this.omitFullMask){
							addr += "/" + this.bitmask;
						}
					}
					else{
						addr == "";
					}
			}
			else{
				//Сокращённая или обычная нотация
				var z = 0;
				var clear = false;
				var part = null
				for(var i=0;i<parts.length-1;i++){
					part = parts[i];
					if(!no(part) && !this.checkPart(part, Math.pow(2, this.partBitCount) - 1)){
						if(part || (z > 0 && z <= i)){
							addr += part.toString(this.radix);
						}
						else{
							z++;
						}
						addr += this.delim;
					}
					else{
						clear = true;
						break;
					}
				}
				if(!no(parts[parts.length - 1]) && !clear){
					if(parts[parts.length - 1] || (z > 0 && z <= i)){
						addr += parts[parts.length - 1].toString(this.radix);
					}
				}
				else{
					addr = "";
				}
				addr = addr.replace(/:[0:]+/, "::");
				addr = addr.replace(/::[0:]+/, "::");
				addr = addr.replace(/:::+/, "::");
				
				if(!clear && (this.bitmask < this.bits || !this.omitFullMask)){
					addr += "/" + this.bitmask;
				}
			}
			return addr;
		}
	}
	jsSubNetIPModel.superclass.constructor.call(this, bits, addr, radix, delim, expandZero, omitFullMask);
}
extend(jsSubNetIPModel, jsSubNetAddrModel);

/**Создаёт новый экземпляр класса jsSubNetIPController
 * @class						Главный контроллер адреса подсети.
 * 								Все аргументы используются для создания модели.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{int}		version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
 * @param	{bool}		omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 * @see 	jsSubNetIPModel
 */ 
function jsSubNetIPController(addr, version, omitFullMask){
	jsSubNetIPController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsSubNetAddrSlotView, options:{}};
		
	this.addChild(new jsSubNetIPFieldController(addr, version, omitFullMask), "field");
	this.changeModel(this.getChild("field").model);

	/**Вызвать метод setVersion своего потомка field.
	 * @param	{int}	version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
	 */
	this.setVersion = function(version){
		this.getChild("field").setVersion(version);
	}
}
extend(jsSubNetIPController, jsEditController);

/**Создаёт новый экземпляр класса jsSubNetIPFieldController
 * @class					Контроллер IP адреса подсети. Само поле ввода.
 * @param	{String}		addr			Адрес в принятой нотации.
 * @param	{int}			version			Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
 * @param	{bool}			omitFullMask	Не приписывать "/<кол. бит>" если кол. бит равно полному кол. бит в адресе.
 * @constructor
 * @see 	jsSubNetAddrModel
 */ 
function jsSubNetIPFieldController(addr, version, omitFullMask){
	jsSubNetIPFieldController.superclass.constructor.call(this);
	var radix = 10;
	var delim = ".";
	var bits = 32;
	if(version && version == 6){
		if(!addr) addr = [null, null, null, null, null, null, null, null];
		radix = 16;
		delim = ":";
		bits = 128;
	}
	else{
		if(!addr) addr = [null, null, null, null];
	}
	this.ifaceTypes.client = {type: jsSubNetIPClientView, options:{}};
	this.changeModel(new jsSubNetIPModel(bits, addr, radix, delim, false, omitFullMask));
//	jsSubNetIPController.superclass.constructor.call(this, bits, addr, radix, delim, omitFullMask);
	
	/**Установить версию протокола IP и преобразовать адрес, если это возможно
	 * @param	{int}	version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
	 */
	this.setVersion = function(version){
		var model  = this.model;
		if(version && version == 6){
			model.bits = 128;
			model.radix = 16;
			model.delim = ":";
			model.setParts([null, null, null, null, null, null, null, null]);
		}
		else{
			model.bits = 32;
			model.radix = 10;
			model.delim = ".";
			model.setParts([null, null, null, null]);
		}
		model.bitmask = model.bits;
		model.partBitCount = model.bits/model.parts.length;
		model.digitCount = Math.ceil(Math.log(Math.pow(2, model.partBitCount))/Math.log(model.radix));
	}
}
extend(jsSubNetIPFieldController, jsController);

/**Создаёт новый экземпляр класса jsSubNetIPv4Controller
 * @class					Контроллер IPv4 адреса подсети.
 * @param	{String}		addr	Адрес в принятой нотации.
 * @constructor
 * @see 	jsSubNetAddrModel
 */ 
function jsSubNetIPv4Controller(addr){
	jsSubNetIPv4Controller.superclass.constructor.call(this, addr, 4);
}
extend(jsSubNetIPv4Controller, jsSubNetIPController);

/**Создаёт новый экземпляр класса jsSubNetIPv6Controller
 * @class					Контроллер IPv6 адреса подсети.
 * @param	{String}		addr	Адрес в принятой нотации.
 * @constructor
 * @see 	jsSubNetAddrModel
 */ 
function jsSubNetIPv6Controller(addr){
	jsSubNetIPv6Controller.superclass.constructor.call(this, addr, 6, true);
}
extend(jsSubNetIPv6Controller, jsSubNetIPController);

/**Создаёт новый экземпляр класса jsSubNetIPClientView
 * @class					Представление адреса подсети.
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * @constructor
 */ 
function jsSubNetIPClientView(ctrl, viewInx, options){
	jsSubNetIPClientView.superclass.constructor.call(this, ctrl, viewInx, options);
	
	/**Проверить введённый сетевой адрес.
	 * statusCode может принимать следующие значения:<br>
	 * <span>&nbsp;&nbsp;</span>subNetMaskEmpty			-	пользователь оставил поле пустым.
	 * <span>&nbsp;&nbsp;</span>subNetMaskNaN			-	пользователь ввёл не число.
	 * <span>&nbsp;&nbsp;</span>subNetMaskOutOfScope	-	Одна из частей адреса вышла за допустимые пределы.
	 * Если при скрытом или запрещённом представлении валидатор находит ошибку, то устанавливает значение undefined
	 * в поле ввода и сбрасывает код ошибки.
	 * @type	bool
	 * @return	Код возврата метода базового класса.
	 */
	jsSubNetIPClientView.prototype.validate = function(){
		this.statusCode = null;
		var value = this.val();
		var arr;
		if(this.options.ishidden || this.options.disabled) return jsSubNetAddrClientView.superclass.validate.call(this);
		
		if(value.match(/^$/)){
			this.statusCode = "netAddrEmpty";
			return jsSubNetAddrClientView.superclass.validate.call(this);
		}
		
		if(this.ctrl.model.bits == 128){
			this.ctrl.model.partBitCount = 16;
			if(value.match(/::/) || value.match(/^0+:0+/) || value.match(/0+:0+$/)){
				//специальная нотация
				if(!value.match(/^::ffff:[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)){
					//сокращённая нотация
					if(value.match(/^\s*$/)){
						this.statusCode = "netAddrEmpty";
					}
					if(!value.match(/^::$/) && !value.match(/^::[0:]*$/)  && !value.match(/^[0:]*::$/)){
						var parts = this.ctrl.model.parseShortNotation(value);
						if(no(parts[0])
							|| no(parts[1])
							|| no(parts[2])
							|| no(parts[3])
							|| no(parts[4])
							|| no(parts[5])
							|| no(parts[6])
							|| no(parts[7])){
							this.statusCode = "netAddrInvalid";
						}
						if(!this.statusCode){
							var arr = value.split("/");
							if(arr instanceof Array && arr[1]){
								this.statusCode = this.ctrl.model.checkPart(arr[1], this.ctrl.model.bits, 10);
								if(this.statusCode){
									this.statusCode = "netAddr" + this.statusCode;
								}
							}
						}
					}
				}
				return jsSubNetAddrClientView.superclass.validate.call(this);
			}
			else{
				//общая нотация
				arr = value.split(":");
				if(arr.length == 8){
//				if(value.match(/^\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}\/*/)){
//				if(value.match(/^\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}:\w{1,4}$/)){
					return jsSubNetIPClientView.superclass.validate.call(this);
				}
				else{
					this.statusCode = "netAddrInvalid";
					return jsSubNetAddrClientView.superclass.validate.call(this);
				}

			}
		}
		else{
			this.ctrl.model.partBitCount = 8;
			arr = value.split(".");
			if(arr.length == 4){
//			if(value.match(/^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}\/*/)){
//			if(value.match(/^[0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}[.][0-9]{1,3}/)){
				return jsSubNetIPClientView.superclass.validate.call(this);
			}
			else{
				this.statusCode = "netAddrInvalid";
				return jsSubNetAddrClientView.superclass.validate.call(this);
			}
		}
	}
}
extend(jsSubNetIPClientView, jsSubNetAddrClientView);

/**Генератор стандартного описания IP адреса для метода describe.
 * @param	{Object}	obj	Краткое описание IP адреса.
 */
controlTypes.ip = function(obj){
	obj.ctrl = new jsIPController(obj.value, obj.version);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Генератор стандартного описания IPv4 адреса для метода describe.
 * @param	{Object}	obj	Краткое описание IPv4 адреса.
 */
controlTypes.ipv4 = function(obj){
	obj.ctrl = new jsIPv4Controller(obj.value);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}

/**Генератор стандартного описания IPv6 адреса для метода describe.
 * @param	{Object}	obj	Краткое описание IPv6 адреса.
 */
controlTypes.ipv6 = function(obj){
	obj.ctrl = new jsIPv6Controller(obj.value);
	obj.nextIface = "client";
	if(!obj.options) obj.options = {};
	var opt = obj.options;
	opt.humanName = obj.name;
}


/**Создаёт новый экземпляр класса jsIPController
 * @class						Главный контроллер IP-адреса.
 * 								Все аргументы используются для создания модели.
 * @param	{String}	addr	Адрес в принятой нотации.
 * @param	{int}		version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
 * @param	{jsIPController}	subIPController	Ссылка на контроллер связанный с данным (маска подсети!).
 * @constructor
 * @see 	jsSubNetIPModel
 */ 
function jsIPController(addr, version, subIPController, realtek){
	jsIPController.superclass.constructor.call(this);
	
	this.ifaceTypes.client = {type: jsSubNetAddrSlotView, options:{}};
		
	this.addChild(new jsIPFieldController(addr, version, subIPController, realtek), "field");
	this.changeModel(this.getChild("field").model);

	/**Вызвать метод setVersion своего потомка field.
	 * @param	{int}	version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
	 */
	this.setVersion = function(version){
		this.getChild("field").setVersion(version);
	}
}
extend(jsIPController, jsEditController);

/**Создаёт новый экземпляр класса jsIPFieldController
 * @class					Контроллер IP адреса подсети. Само поле ввода.
 * @param	{String}		addr	Адрес в принятой нотации.
 * @param	{int}			version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
 * @param	{jsIPController}	subIPController	Ссылка на контроллер связанный с данным (маска подсети!).
 * @constructor
 */ 
function jsIPFieldController(addr, version, subIPController, realtek){
	jsIPFieldController.superclass.constructor.call(this);
	
	if (subIPController) {
		this.subIPController = subIPController;
	} else this.subIPController = null;
	
	var radix = 10;
	var delim = ".";
	var bits = 32;
	if(version && version == 6){
		if(!addr) addr = [null, null, null, null, null, null, null, null];
		radix = 16;
		delim = ":";
		bits = 128;
	}
	else{
		if(!addr) addr = [null, null, null, null];
	}
	this.changeModel(new jsSubNetIPModel(bits, addr, radix, delim, false, true));	
	
	this.ifaceTypes.client = {type: jsSubNetIPClientView, options:{ isRealtek:realtek }};
	
	/**Установить версию протокола IP и преобразовать адрес, если это возможно
	 * @param	{int}	version	Версия IP протокола. Допустимые значения: 4 (по умолчанию), 6.
	 */
	this.setVersion = function(version){
		var model  = this.model;
		if(version && version == 6){
			model.bits = 128;
			model.radix = 16;
			model.delim = ":";
			model.setParts([null, null, null, null, null, null, null, null]);
		}
		else{
			model.bits = 32;
			model.radix = 10;
			model.delim = ".";
			model.setParts([null, null, null, null]);
		}
		model.bitmask = model.bits;
		model.partBitCount = model.bits/model.parts.length;
		model.digitCount = Math.ceil(Math.log(Math.pow(2, model.partBitCount))/Math.log(model.radix));
	}
}
extend(jsIPFieldController, jsController);

//===============IP адрес одиночного узла конкретной версии=======================

/**Создаёт новый экземпляр класса jsIPv4Controller
 * @class						Контроллер IPv4 адреса.
 * @param	{String}	addr	IPv4 адрес.
 * @param	{jsIPController}	subIPv4Controller	Ссылка на контроллер связанный с данным (маска подсети!).
 * @constructor
 * @see 	jsNetAddrModel
 */ 
function jsIPv4Controller(addr, subIPv4Controller, realtek){
	jsIPv4Controller.superclass.constructor.call(this, addr, 4, subIPv4Controller, realtek);
}
extend(jsIPv4Controller, jsIPController);

/**Создаёт новый экземпляр класса jsIPv6Controller
 * @class				Контроллер IPv6 адреса.
 * @param	{String}	addr	IPv6 адрес.
 * @constructor
 * @see 	jsNetAddrModel
 */ 
function jsIPv6Controller(addr){
	jsIPv6Controller.superclass.constructor.call(this, addr, 6, null);
}
extend(jsIPv6Controller, jsIPController);


/**Создаёт новый экземпляр класса jsDecorController.
 * @class Главная функция этого контроллера объявлять интерфейсы клиентской стороны,
 * которые рисуют всякие декоративные элементы. На данный момент есть всего один - разделитель.
 * @constructor
 */
function jsDecorController(){
	jsDecorController.superclass.constructor.call(this);
	
	this.ifaceTypes.separator = {type: jsSeparatorView};
}
extend(jsDecorController, jsController);

/**Создаёт новый экземпляр класса jsSeparatorView
 * @class	Представляет горизонтальный разделитель старницы
 * 			для визуального разделения группы полей ввода и прочего.
 * @constructor
 * @param	{int}			viewInx	Индекс интерфейса, к которому будет принадлежать представление.
 * @param	{jsController}	ctrl	Ссылка на контроллер.
 * @param	{Object}		options	Опции представления.
 * 							Опции:<br>
 * 							label - то, что написано над разделителем (ключ объекта lang).<br>
 * 							descText - то, что написано под разделителем (ключ объекта lang).
 */
function jsSeparatorView(ctrl, viewInx, options){
	jsSeparatorView.superclass.constructor.call(this, ctrl, viewInx, options);

	/**Отрисовка разделителя.*/
	jsSeparatorView.prototype.drawView = function(){
		jsSeparatorView.superclass.drawView.call(this);
		
		var htmlToDraw;
		
		var options = this.options?this.options:{};
		
		htmlToDraw		=  	"<div class='decorSeparator'>"
						+	"<div class='decorLabelImage'></div>"
						+	"<div class='decorLabelText'>"
		if(options.label){
			htmlToDraw	+=	"<font>"
						+	"&nbsp;&nbsp;"+lng(options.label)
						+	"</font>";
		}
		htmlToDraw		+=	"</font>"
						+	"</div>"
						+	"<div class='decorEndUpImage'>"
						+	"</div>"
						+	"</div>";

		htmlToDraw		+=	"<div class='decorSection'>"
						+	"<div class='decorDescImage'></div>";
		htmlToDraw		+=	"</div>";
		if(options.descText){
			htmlToDraw	+=	"<div class='decorDescText'>"
						+	lng(options.descText)
						+	"</div>";
		}
		htmlToDraw		+=	"<div class='decorSpacer'></div>";
		$(options.viewBoxSel).html(htmlToDraw);
	}

}
extend(jsSeparatorView, jsCSideView);
(function(){

	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIOverlay = function(){
		var $overlay = this.find(">.lightUI>.overlay");
		if(!$overlay.length){
			this.append("<div class='lightUI'><div class='overlay' style='display: none'></div></div>");
			this.css("position", "relative");
		}

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			show: function(){
				if(this.is(":visible")){
					var $content = this.find(">.lightUI>.overlay");
					var nodeName = this.get(0).nodeName;
					this.find(">.lightUI>.overlay").css("display", "");
				}
				return this;
			},
			hide: function(){
				this.find(">.lightUI>.overlay").css("display", "none");
				return this;
			}
		});

		return plugin(this);
	}
})();
(function(){
		
	//-------------------------------------
	// Делаем копии jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();		//для самого плагина 
	var rowPlugin = jQuery.sub();	//для подплагина строки
	var colPlugin = jQuery.sub();	//для подплагина столбца
	var cellPlugin = jQuery.sub();	//для подплагина ячейки


	//-------------------------------------
	// Объявляем статические свойства
	//-------------------------------------
	var lockEditing = false;

	//-------------------------------------
	// Объявляем статические методы
	//-------------------------------------
	var checkUniqueFlag = function(index, flags){
		if(is.unset(flags)) flags = {};
		if(is.unset(flags.unique)) return;
		if(is.unset(flags.re)) flags.re = [];
		else if(is.func(flags.re)){
			var foo = flags.re;
			flags.re = [foo];
		}
		
		flags.re.push(callbackEx(this, function(value, alias, index, matchCase){
			var $col = this.col(index);
			var $cell;
			if(matchCase){
				var val;
				for(var i=0; i<$col.length; i++){
					$cell = $col.row(i);
					val = $cell.html();
					if(is.unset($cell.data("$input")) && val != "" && alias == val) return "dup";
				}
			}
			else{
				var alias = alias.toLowerCase();
				var val;
				for(var i=0; i<$col.length; i++){
					$cell = $col.row(i);
					val = $cell.html();
					if(is.unset($cell.data("$input")) && val != "" && alias == val.toLowerCase()) return "dup";
				}
			}
			return null;
		}, index, flags.unique=="hard"?true:false));
	}
	
	var getRowPattern = function(){
		var pattern = "<tr>";
			
		var header = this.data("header");
		var colspan;
		for(var i=0; i<header.length; i++){
			pattern += "<td";
			pattern += " cell-name='" + lng(header[i].name) + "'";
			colspan = header[i].colspan;
			if(is.set(colspan) && colspan > 1){
				pattern += " colspan=" + colspan;
			}
			pattern += "></td>";
		}
		pattern += "</tr>";
		return pattern;
	}
		
	var getHeadRow = function(header){
		var pattern = "<tr>";
		for(var i=0; i<header.length; i++){
			pattern += "<td";
			if(header[i].colspan){
				pattern += " colspan='" + header[i].colspan + "'";
			}
			if(header[i].rowspan){
				pattern += " rowspan='" + header[i].rowspan + "'";
			}
			if(is.set(header[i].name)){
				if(header[i].notranslate){
					pattern += ">" + header[i].name;
				}
				else{
					pattern += " langkey='" + header[i].name + "'>";
					pattern += lng(header[i].name);
				}
			}
			else{
				pattern += ">";
			}
			pattern += "</td>";
		}
		pattern += "</tr>";
		return pattern;
	}
		
	var getHeadPattern = function(header){
		var pattern = "<thead>";
		if(is.array(header[0])){
			for(var i=0; i<header.length; i++){
				pattern += getHeadRow(header[i]);
			}
		}
		else{
			pattern += getHeadRow(header);
		}
		pattern += "</thead>";
		return pattern;
	}
		
	var getColInx = function(index){
		if(is.string(index)){
			var namedColumns = this.data("namedColumns");
			if(is.unset(namedColumns)){
				namedColumns = this.data("plugin").data("namedColumns");
			}
			return namedColumns[index].inx;
		}
		else{
			return index;
		}
	}

	var zebra = function($grid){
		$grid.find("tbody tr:even").addClass("even").removeClass("odd");
		$grid.find("tbody tr:odd").removeClass("even").addClass("odd");
	}
		
	var selectAll = function(event){
		$(this).closest("table").find(" tbody td.selectable>input").attr("checked", is.set($(this).attr("checked"))?$(this).attr("checked"):false).trigger("change");
	}
	
	var selectRow = function(event){
		var $row = rowPlugin($(this).parent());
		if($(this).find("input").attr("checked")){
			$row.selectRow();
		}
		else{
			$row.unselectRow();
		}
	}

	var insSelCol = function(){
		var pattern = "<td class='selectable' rowspan='" + this.data("headerHeight") + "'><input type='checkbox'/></td>";
		this.find("thead tr:first")
			.find("td:first")
			.before(pattern);
		this.find("thead tr:first td:first input")
			.change(selectAll);
		this.find("tbody tr")
			.find("td:first")
			.before("<td class='selectable'><input type='checkbox'/></td>")
			.prev()
			.change(selectRow);
	}

	var insDragCol = function(){
		this.find("thead tr:first")
			.find("td:last")
			.after("<td rowspan='" + this.data("headerHeight") + "'>&nbsp;</td>");
		this.find("thead tr:first td:last")
			.addClass("draggable");
		this.find("tbody tr")
			.find("td:last")
			.after("<td class='draggable'>&nbsp;</td>");
	}

	var createInput = function($inputBox, type, flags){
		var inputFlags;
		var $input = null;
		switch(type){
			case "ipv4":
				inputFlags = $.extend(true, {maxLength: 18}, flags);
				$input = $inputBox.lightUIIPv4(inputFlags);
			break;
			case "ipv6":
				inputFlags = $.extend(true, {maxLength: 43}, flags);
				$input = $inputBox.lightUIIPv6(inputFlags);
			break;
			case "ipv4ipv6":
				inputFlags = $.extend(true, {maxLength: 43}, flags);
				$input = $inputBox.lightUIIPv4IPv6(inputFlags);
			break;
			case "mac":
				inputFlags = $.extend(true, {maxLength: 17}, flags);
				$input = $inputBox.lightUIMAC(inputFlags);
			break;
			case "port":
				$input = $inputBox.lightUIPort(flags);
			break;
			case "host":
				$input = $inputBox.lightUIDomainName(flags);
			break;
			case "select":
				$input = $inputBox.lightUISelect(flags);
			break;
			case "combogrid":
				$input = $inputBox.lightUIComboGrid(flags);
			break;
			case "number":
				$input = $inputBox.lightUINumber(flags);
			break;
			case "checkbox":
				$input = $inputBox.lightUICheckbox(flags);
			break;
			case "text":
			default:
				if(is.func(type)){
					$input = type.call($inputBox, flags);
				}
				else{
					$input = $inputBox.lightUIText(flags);
				}
//				$input = $inputBox.lightUIText(flags);
			break;
		}
		return $input;
	}
	
	var onedit = function(event){
		setTimeout(callback(this, function(){
			if(lockEditing) return;
			
			var $cell = cellPlugin(this);
			var $grid = $cell.data("plugin");

			//Закрыть активную ячейку
			var $activeCell = $grid.data("$activeCell");
			if(is.set($activeCell)){
				$activeCell.stopEditing();
			}
			
			$cell.startEditing();
			var $input = $cell.data("$input");
			
			//Инициализация и позиционирование
			if(is.jquery($input)){
				var data = {$cell: $cell, $input: $input};
				$input.bind("enter.input", data, ontab)
					.bind("tab.input", data, ontab)
					.bind("unfocus.input", data, onenter)
					.bind("error.input", data, onerror)
					.bind("esc.input", data, onescape)
					.find("input, select")
					.bind("keydown", function(event){$(this).removeClass("error")});
					
					if($cell.data("type") == "checkbox"){
						if(navigator.userAgent.match(/Chrome|Safari/)){
							$input.unbind("unfocus.input");
							$(window).bind("click", data, function(event){
								if(event.target.tagName != "INPUT"){
									onenter(event);
								}
							});
						}
					}
			}
			
			//Запретить добавлять новые строки
			var $buttonAdd = $grid.data("$buttonAdd");
			if($buttonAdd) $buttonAdd.disable();

			//Установить новую активную ячейку
			$grid.data("$activeCell", $cell)
		}), 1);
	}
	
	var onerror = function(event, errorCode){
		lockEditing = true;
		$(this).addClass("error");
		if(confirm(lng(errorCode) + ". " + lng("edit_or_esc"))){
			setTimeout("$('#"+event.data.$input.find("input, select").attr("id")+"').focus()", 1);
		}
		else{
			onescape.call(this, event);
		}
	}
	
	var onenter = function(event){
		lockEditing = false;

		$cell = event.data.$cell;
		$grid = $cell.data("plugin");
		$cell.applyEditing().stopEditing();
		$grid.data("editing", false);

		//Разрешить добавлять новые строки
		var $buttonAdd = $grid.data("$buttonAdd");
		if($buttonAdd) $buttonAdd.enable();
	}
	
	var ontab = function(event){
		onenter.call(this, event);
		var $cell = event.data.$cell;
		var $editableCells = $cell.parents(".lightUI:eq(0)").find("table td.editable").not(".disabled");
		var nextInx = $editableCells.index($cell) + 1;
		if(nextInx >= $editableCells.length) nextInx = 0;
		var $next = $editableCells.eq(nextInx);
		$next.trigger("click");
	}
	
	var onescape = function(event){
		lockEditing = false;

		$cell = event.data.$cell;
		$grid = $cell.data("plugin");
		$cell.stopEditing();
		$grid.data("editing", false);

		//Разрешить добавлять новые строки
		var $buttonAdd = $grid.data("$buttonAdd");
		if($buttonAdd) $buttonAdd.enable();
	}
		
	var toggle = function(event){
		var $options = $(this).parents(".lightUI:eq(0)").find(".options");
		if($options.is(":visible")){
			$options.css("display", "none");
		}
		else{
			$options.css("display", "block");
		}
	}
		
	var clickWin = function(event){
		var $gridBox = $("#" + event.data.id).closest(".lightUI");
		if(!$gridBox.length) return;
		if(!$(event.target).closest(".options, .select .arrow").length){
			$gridBox.find(".options").css("display", "none");
		}
		if(!$(event.target).closest(".combo").length){

			$input = $gridBox.data("fieldPlugin");
			if(is.set($input)){
				var errorCode = $input.validate();
				if(is.string(errorCode)){
					$gridBox.trigger("error.input", errorCode);
				}
				else{
					$gridBox.trigger("unfocus.input");
				}
			}

		}
	}
		
	var selectOption = function(event, $row){
		var flags = $(this).data("flags");
		if(!is.string(flags.combobox.blank)){
			$(this).data("fieldPlugin").fieldval($row.col(flags.combobox.index).html()).find("input").focus();
		}
		$(this).find(".options").css("display", "none");
	}

	var onrowclick = function(event){
		var $this = $(this);
		var $grid = $this.data("plugin");
		var $row = rowPlugin($this.parent());
/*		
		if($grid.data("hasEditable") && !$grid.data("editing")){
			
			$row.startEditing();
			
			var setError = function($input, errorCode){
				if(errorCode){
					$input.attr("title", lng(errorCode));
					$input.data("$cell").addClass("error").attr("title", lng(errorCode));
				}
				else{
					$input.attr("title", "");
					$input.data("$cell").removeClass("error").attr("title", "");
				}
			}
				
			$grid.find(">div.editable").bind("error.input", function(event, errorCode){
				setError($(event.target), errorCode);
			}).bind("onfocus.input", function(event, errorCode){
				setError($(event.target));
			});

			//Показать или добавить кнопки в футер
			var $footerRight = $grid.find(".grid-footer-right");
			var $buttonUpdate = $row.data("$buttonUpdate");
			if($buttonUpdate){
				$buttonUpdate.show();
			}
			else{
				$footerRight.append("<div></div>");
				$row.data("$buttonUpdate", $footerRight.find(">div:last").lightUIButton("update").bind("button.click", callback($row, function(){

					var $grid = $row.data("plugin");
					var flags = $grid.data("flags");
					var colBegin = flags.selectable?1:0;
					var $cell, errorCode;
					var hasError = false;
					for(var i=colBegin; i<colBegin + $grid.ncol(); i++){
						var $cell = this.col(i);
						$input = $cell.data("$input");
						if($input){
							errorCode = $input.validate();
							if(errorCode){
								hasError |= true;
								$input.trigger("error.input", errorCode);
							}
							else{
								setError($input);
								
							}
						}
					}

					if(hasError){
						if(confirm(lng("hasError"))){
							return;
						}
						else{
							this.stopEditing();
						}
					}
					else{
						this.applyEditing();
					}
					
					//Скрыть кнопки
					this.data("$buttonCancel").hide();
					this.data("$buttonUpdate").hide();

					//Разрешить добавлять новые строки
					var $grid = this.data("plugin");
					var $buttonAdd = $grid.data("$buttonAdd");
					if($buttonAdd) $buttonAdd.enable();
					
					//Сбросить флаг редактирования таблицы
					$grid.data("editing", false);
					
				})));
			}
			var $buttonCancel = $row.data("$buttonCancel");
			if($buttonCancel){
				$buttonCancel.show();
			}
			else{
				$footerRight.append("<div></div>");
				$row.data("$buttonCancel", $footerRight.find(">div:last").lightUIButton("cancel").bind("button.click", callback($row, function(){

					this.stopEditing();

					//Скрыть кнопки
					this.data("$buttonCancel").hide();
					this.data("$buttonUpdate").hide();

					//Разрешить добавлять новые строки
					var $grid = this.data("plugin");
					var $buttonAdd = $grid.data("$buttonAdd");
					if($buttonAdd) $buttonAdd.enable();

					//Сбросить флаг редактирования таблицы
					$grid.data("editing", false);
				})));
			}
		}
		*/

		if($grid.data("hasEditable") && getCookie("viewmode") == "mobile"){
//			$overlay = $("body").lightUIOverlay().show();

			//Создать форму
			var formID = gID.get();
			var $form = $("<div class='lightUI gridMobileForm' id='" + formID + "'><div class='header'></div><div class='content'></div><div class='footer'></div></div>");

			//Накидать поля ввода
			var $col, $input, $edit, inputFlags, inputType, inputName;
			var flags = $grid.data("flags");
			var colBegin = flags.selectable?1:0;
			var header = $grid.data("header");
			var $footer = $form.find(".footer");
			var $content = $form.find(".content");
			for(var i=colBegin, ii=0; i<colBegin + $grid.ncol(); i++, ii++){
				$cell = $row.col(i);
				inputName = header[ii].name;
				if($cell.hasClass("editable")){
					inputType = $cell.data("type");
					inputFlags = $cell.data("flags");
					$edit = $("<div></div>").lightUIEdit(inputName);
					var value = $cell.html();
					$input = createInput($edit.find(".input"), inputType, inputFlags).fieldval(value).data("lastRightValue", value);
					$content.append($edit);
					$cell.data("$input", $input);	//Необходим для работы метода ячейки applyEditing()
				}
				
			}
						
			function onsave(){
				$row.applyEditing();
				$form.remove();
			}

			function oncancel(){
				//Удалить форму
				$form.remove();
				//Удалить обработчик resize
				$(window).unbind("resize", onresize);
			}

			//Кнопка сохранения
			var $apply = $("<div></div>");
			$apply.lightUIButton("save").bind("click.button", onsave);
			$content.append($apply);
						
			//Кнопка отмены
			var $cancel = $("<div></div>");
			$cancel.lightUIButton("cancel").bind("click.button", oncancel);
			$content.append($cancel);

			//Привязать обработчик ошибок
			$form.bind("error.input", function(event, errorCode){
				var $input = $(event.target).getLightUIElem("input");
				if(confirm(lng(errorCode) + ". " + lng("edit_or_esc"))){
					setTimeout(function(){$input.find("input, select").focus()}, 1);
				}
				else{
					$input.fieldval($input.data("lastRightValue"));
				}
			});
									
			//Здесь изменяем последнее валидное значение для отката в слючае ошибки
			$form.bind("unfocus.input", function(event, errorCode){
				var $input = $(event.target).getLightUIElem("input");
				$input.data("lastRightValue", $input.fieldval());
			});

			var inForm;

			function onresize(event){
				if(id) clearTimeout(id);
				var id = setTimeout(function(){
					//позиционирование
					$form = $("#" + formID);
					$form.css({
//						top: $(document).scrollTop() + ($(window).height() - $form.height())/2,
						top: $(document).scrollTop(),
						left: $(document).scrollLeft() + ($(window).width() - $form.width())/2
					});
				}, 100);
			}
			
			function onrelease(event){
				if(inForm){
					inForm = false;
					$(document).one("click", onrelease);
					return;
				}
				oncancel();
			}

			function onformclick(event){
				inForm = true;
			}
			
			//Реакция на enter
			$form.bind("enter.input", onsave);

			//Реакция на escape
			$form.bind("esc.input", onsave);
			
			$("body").append($form);
			$(window).resize(onresize).trigger("resize");
			setTimeout(function(){
				$(".gridMobileForm").bind("click", onformclick);
				$(document).one("click", onrelease);
			}, 5);
		}
		
		if(!$row.data("editing")) $grid.trigger("rowclick.grid", [$row]);
	}

	var ondragstart = function(event){
		event.preventDefault();
		event.stopImmediatePropagation();
		
		var $target = $(event.target);
		var $grid = $target.closest(".lightUI");
		var $rows = $target.closest("tbody").find("tr");
		$rows.mouseover(ondragstep);
		$("body").bind("mouseup", {$grid: $target.data("plugin")}, ondragstop);
		
		$(event.target).data("row").startDragging();
	}
	
	var ondragstop = function(event){
		event.preventDefault();
		event.stopImmediatePropagation();

		var $grid = event.data.$grid;
		if(!$grid.data("dragging")) return;
		
		var $rows = $grid.find("tbody tr");
		$rows.unbind("mouseover", ondragstep);
		$("body").unbind("mouseup", ondragstop);
		
		event.data.$grid.stopDragging();
	}
	
	var ondragstep = function(event){
		event.preventDefault();
		event.stopImmediatePropagation();

		var $row = $(event.target).closest("table").find("tbody tr.draggable");
		if($row.length){
			rowPlugin($row).moveTo(rowPlugin(this).irow());
		}
	}


	var applyAttrs = function(value){
		try{
			this.data("flags").accessMode = value.__attrs__.mode;
		}
		catch(e){
		}
	}

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIGrid = function(header, nrow, flags){

		//Вариант вызова без аргументов - получение ссылки на уже созданный плагин
		if(!is.array(header)){
			var $grid = this.data("light_ui_grid");
			if($grid){
				return $grid;
			}
			else{
				return this;
			}
		}

		if(!is.object(flags)) flags = {};
		
		var $this = plugin(this);
		var colBegin = flags.selectable?1:0;

		//header0 используется при формировании патерна строки
		var _header = $.extend(true, [], header);
		if(is.array(_header[0])){
			for(var i=0; i<_header.length-1; i++){
				var h = _header[i];
				for(var j=0, c=0; j<h.length; j++){
					var h0 = h[j];
					if(is.set(h0.rowspan)){
						var rowspan = h0.rowspan;
						delete h0.rowspan;
						h0.spaned = {irow: i, icol: j + colBegin};
						for(var k=1; k<=rowspan; k++){
							if(is.unset(_header[i+k])) break;
							_header[i+k].splice(c, 0, h0);
						}
					}
					c += is.set(h0.colspan)?h0.colspan:1;
				}
			}
			var header0 = _header[_header.length-1];
		}
		else{
			var header0 = _header;
		}
		
		//namedColumns используется при доступе к ячейкам и столбцам по символьному имени (index)
		var namedColumns = {};
		for(var i in header0){
			var h = header0[i];
			if(is.object(h) && is.string(h.index)){
				namedColumns[h.index] = {inx: colBegin + Number(i), name: h.name, header: h};
			}
		}

		//Навешивание данных на контейнер плагина
		this.data("namedColumns", namedColumns)
			.data("header", header0)
			.data("headerHeight", is.array(header[0])?header.length:1)
			.data("light_ui_grid", $this);
			

		var objID = gID.get();

		//Формирование паттерна таблицы
		var pattern = "<table cellspacing='0' cellpadding='0'>" + getHeadPattern(header) + "<tbody>";
		pattern += "</tbody></table><div class='grid-footer'><div class='grid-footer-left'></div><div class='grid-footer-right'></div></div>";

		//Завершение формирования паттерна таблицы в зависимости от типа
		if(is.object(flags.combobox)){
			
			flags.clickable = true;
			
			if(is.unset(flags.combobox.index)) flags.combobox.index = 0;
			
			pattern =	"<div class='combo'>"
					+	"<div class='select'>"
					+	"<div class='field'></div>"
					+	"<div class='arrow'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>"
					+	"<div class='icon'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>"
					+	"<div class='iconReset'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>"
					+	"<div style='clear: both'></div>"
					+	"</div>"
					+	"<div class='options'>" + pattern + "</div>"
					+	"</div>"
					+	"</div>";

			this.html(pattern)
				.find(".arrow")
				.click(toggle);

			$(document).bind("click", {id: objID}, clickWin);
			this.bind("rowclick.grid", selectOption);
			this.find(".select .icon").bind("click", function(event){
				$(event.target).closest(".lightUI").trigger("iconclick.grid")
			});
			
			this.find(".select .iconReset").bind("click", function(event){
				$(event.target).closest(".lightUI").trigger("iconResetclick.grid")
			});

			var $field = this.find(".select .field");
			var validType = false;
			switch(flags.combobox.type){
				case "ipv4":
					var inputFlags = $.extend(true, {maxLength: 18}, flags.combobox.flags);
					this.data("fieldPlugin", $field.lightUIIPv4(inputFlags));
					validType = true;
				break;
				case "ipv6":
					var inputFlags = $.extend(true, {maxLength: 43}, flags.combobox.flags);
					this.data("fieldPlugin", $field.lightUIIPv6(inputFlags));
					validType = true;
				break;
				case "ipv4ipv6":
					var inputFlags = $.extend(true, {maxLength: 43}, flags.combobox.flags);
					this.data("fieldPlugin", $field.lightUIIPv4IPv6(inputFlags));
					validType = true;
				break;
				case "mac":
					var inputFlags = $.extend(true, {maxLength: 17}, flags.combobox.flags);
					this.data("fieldPlugin", $field.lightUIMAC(inputFlags));
					validType = true;
				break;
				case "host":
					this.data("fieldPlugin", $field.lightUIDomainName(flags.combobox.flags));
					validType = true;
				break;
				case "port":
					this.data("fieldPlugin", $field.lightUIPort(inputFlags));
					validType = true;
				break;
				case "text":
				default:
					this.data("fieldPlugin", $field.lightUIText(flags.combobox.flags))
					validType = true;
				break;
			}
			if(validType){
				var blank = flags.combobox.blank;
				if(is.string(blank)){
					this.find(".field input").val(lng(blank))
										.attr("langkey", blank)
										.css("cursor", "pointer")
										.css("text-align", "center")
										.click(toggle)
										.unbind("keypress")
										.unbind("keydown")
										.bind("keypress", function(event){
											event.preventDefault();
										})
										.bind("keydown", function(event){
											event.preventDefault();
										});
				}
				//Глушим и/или заменяем события вложенного input плагина чтобы event.target указывал на combobox
				//Это важно для определения источника событий в обработчике
				this.data("fieldPlugin").bind("unfocus.input", function(event){
					//Чтобы не конфиктовало с имитацией потери фокуса в функе clickWin
					event.stopPropagation();
				}).bind("onfocus.input", function(event){
					event.stopPropagation();
					setTimeout(callback(this, function(){
						$(this).closest(".lightUI").trigger("onfocus.input");
					}), 1);
				}).bind("error.input", function(event, errorCode, keyCode){
					event.stopPropagation();
					if(is.set(keyCode)){
						setTimeout(callback(this, function(){
							$(this).closest(".lightUI").trigger("error.input", errorCode);
						}), 1);
					}
				});
			}
		
			plugin.fn.extend({
				validate: function(){
					return this.data("fieldPlugin").validate();
				},
				fieldval: function(value){
					return this.data("fieldPlugin").fieldval(value);
				},
				isEmpty: function(){
					return this.data("fieldPlugin").isEmpty();
				},
				clean: function(){
					this.data("fieldPlugin").clean();
				},
				flags: function(){
					return this.data("flags");
				}
			});

		}
		else{
			this.html(pattern);
		}

		//Разное
		this.addClass("lightUI grid")
			.data("flags", flags)
			.find("table").attr("id", objID)
			.find("tbody tr").data("plugin", $this)
			.find("td").data("plugin", $this);
		zebra(this);

		//Обработка опций плагина
		if(flags.selectable) insSelCol.call(this);
		
		if(flags.clickable){
			var $rows = $("#" + objID + " tbody tr");
			$rows.addClass("clickable");
			$rows.find("td:not(.draggable,.selectable)").bind("click", onrowclick);
		}
	
		if(flags.draggable){
			insDragCol.call(this);
			var $rows = this.find("tbody tr");
			var $dragCol = $rows.find("td:last");
			$dragCol.bind("mousedown", ondragstart);
		}

		if(flags.addable){
			var $footerLeft = this.find(".grid-footer-left").append("<div></div>");
			this.data("$buttonAdd", $footerLeft.find(">div:last").lightUIButton("add").bind("button.click", callback($this, function(){
				this.addRow();
			})));
		}
		
		//-----------------------------------------------------------------------
		// Расширим возможности полученных копий новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			row: function(i){
				if(i == "last"){
					i = this.nrow() - 1;
				}
				else if(i == "first"){
					i = 0;
				}
				var $row = rowPlugin(this.find("tbody tr:eq(" + i + ")"));
				return $row;
			},
			col: function(index){
				var icol = getColInx.call(this, index);
				var $col = colPlugin(this.find("tbody tr").find("td:eq(" + icol + ")"));
				return $col;
			},
			colEditable: function(index, type, inputFlags){
				if(is.unset(index) || is.unset(type)) return this;
				if(is.unset(inputFlags)) inputFlags = {};

				var flags = this.data("flags");
				var $tbody = this.find("table tbody");
				
				//Поиск столбца заголовка
				var namedColumns = this.data("namedColumns");
				var header = namedColumns[index].header;
				var inx = namedColumns[index].inx;
				header.editable = {type: type, flags: inputFlags};
				if(header.spaned){
					var $obj = this.find("thead tr").eq(header.spaned.irow).find("td").eq(header.spaned.icol );
				}
				else{
					var $obj = this.find("thead tr:last td").eq(inx)
				}

				var $col = this.col(index);

				//Привязка классов и данных к столбцу
				$col.addClass("editable");
				$col.data("type", type).data("flags", inputFlags);
				if(inputFlags.mandatory){
					$obj.append("<span class='mandatory'>*</span>").addClass("mandatory");
					$col.addClass("mandatory");
				}

				//Установка дефолтного значения для селекта
				//TODO: Учесть возможность задания опций через optionArray
				if(type == "select" && inputFlags.options){
					for(var i in inputFlags.options){
						var def = i;
						break;
					}
					var $cell;
					if(is.set(def)){
						for(var i=0; i<$col.length; i++){
							$cell = $col.row(i);
							if(!$cell.html().length){
								$cell.html(lng(def)).attr("langkey", def);
							}
						}
					}
							
				}

				checkUniqueFlag.call(this, index, inputFlags);

				if(flags.clickable){
					this.data("hasEditable", true);
				}
				else{
					$col.bind("click", onedit);
				}

				return this;
			},
			addRow: function(n){
				if(is.unset(n)) n = 1;
				var flags = this.data("flags");
				var header = this.data("header");
				for(var k=0; k<n; k++){
					var nrow = this.nrow();
					this.find("table").append(getRowPattern.call(this));
	
					var $lastRow = this.row("last");
								
					var colBegin = 0;
					if(flags.selectable){
						$lastRow.find("td:first")
								.before("<td class='selectable'><input type='checkbox'/></td>")
								.prev()
								.change(selectRow);
						if(this.find("table thead tr:last td.selectable input").attr("checked")){
							$lastRow.find("td.selectable input")
								.attr("checked", true)
								.change();
						}
						colBegin = 1;
					}
					if(flags.clickable){
						$lastRow.addClass("clickable");
						$lastRow.find("td:not(.draggable,.selectable)").bind("click", {$gridBox: this}, onrowclick);
					}
					if(flags.draggable){
						$lastRow.find("td:last")
								.after("<td class='draggable'>&nbsp;</td>")
								.next()
								.mousedown(ondragstart);
						$lastRow.mouseover(ondragstep);
					}
	
					$lastRow.addClass("new")
							.data("plugin", this)
							.find("td")
							.data("plugin", this)
							.data("row", $lastRow);
	
					for(var i=0; i<header.length; i++){
						var editable = header[i].editable;
						if(is.set(editable)){
							$lastRow.col(colBegin + i).editable(editable.type, editable.flags);
						}
					}
				}

				zebra(this);
				this.trigger("addrow.grid", n);

				return this;
			},
			cleanTable: function(){
				this.find("table tbody tr").remove();
				return this;
			},
			selection: function(){
				return rowPlugin(this.find("tbody tr.selected"));
			},
			nrow: function(){
				return this.find("tbody tr").length;
			},
			ncol: function(){
				return this.data("header").length;
//				return this.find("thead tr:last td").length;
			},
			checkMandatory: function(checkSelected){
				var res = true;

				if(checkSelected){
					var $cellSet = this.find("tbody tr").not(".selected").find("td.mandatory").not(".disabled");
				}
				else{
					var $cellSet = this.find("tbody td.mandatory").not(".disabled");
				}
					
				$cellSet.each(function(index, elem){
					var $cell = cellPlugin($(elem));
					var $input = createInput($("<div></div>"), $cell.data("type"), $cell.data("flags")).fieldval($cell.html());
					if($input.isEmpty()){
						res = false;
						$cell.addClass("error");
					}
				});
				
				//TODO: Заточнить под сложный заголовок
				this.find("thead tr:last td").each(function(index, elem){
					if($(elem).hasClass("mandatory")){
						if($(this).parents("table")
							.find("tbody tr")
							.find("td:eq(" + index +")")
							.filter(".error")
							.length){
							$(elem).addClass("error");
						}
					}
				});

				return res;
			},
			cleanErrors: function(){
				this.find("td.error").removeClass("error");
				return this;
			},
			changedRows: function(){
				return rowPlugin(this.find("tr.changed"));
			},
			newRows: function(){
				return rowPlugin(this.find("tr.new"));
			},
			resetNew: function(){
				this.find("tr.new").removeClass("new");
				return this;
			},
			resetChanged: function(){
				this.find("tr.changed").removeClass("changed");
				return this;
			},
			resetAll: function(){
				this.find("tr.changed, tr.new").removeClass("changed").removeClass("new");
				return this;
			},
			stopDragging: function(){
				var $table = this.find(">table");
	
				$table.removeClass("unselectable").find("tbody tr.draggable td").attr("unselectable", false);
	
				//разрешить добавление строк
				var $buttonAdd = this.data("$buttonAdd");
				if($buttonAdd) $buttonAdd.enable();
				
				var $row = rowPlugin($table.find("tr.draggable"));
				$row.removeClass("draggable");
				this.data("dragging", false).trigger("dragstop.grid", [$row]);
				
				return this;
			}
				
		});
		
		rowPlugin.fn.extend({
			col: function(index){
				var icol = getColInx.call(this, index);
				var $cell = cellPlugin(this.find("td:eq(" + icol + ")"));
				return $cell;
			},
			moveTo: function(i){
				if(!this.length) return this;
				var src = this.irow();
				var dst = i;
				if(is.set(i)){
					var $parent = this.parent();
					if(i == "last"){
						i = $parent.find("tr").length - 1;
					}
					else if(i == "first"){
						i = 0;
					}
					var irow = this.irow();
					if(i != irow){
						this.detach();
						if(i > irow){
							$parent.find("tr:eq(" + (i-1) + ")").after(this);
						}
						else{
							$parent.find("tr:eq(" + i + ")").before(this);					
						}
						zebra(this.data("plugin"));
					}
				}
				else{
					this.detach();
				}
				this.data("plugin").trigger("moverow.grid", [src, dst]);
				return this;
			},
			removeRow: function(){
				return this.moveTo();
			},
			selectRow: function(i){
				this.addClass("selected");
				var plugin = this.data("plugin");
				if(plugin.data("flags").selectable){
					this.find("td.selectable input").attr("checked", true);
				}
				plugin.trigger("selection.grid")				
				return this;
			},
			unselectRow: function(i){
				this.removeClass("selected");
				var plugin = this.data("plugin");
				if(plugin.data("flags").selectable){
					this.find("td.selectable input").attr("checked", false);
					this.parents(".lightUI:eq(0)").find("table thead tr:last td.selectable input").attr("checked", false);
				}
				plugin.trigger("selection.grid")				
				return this;
			},
			selected: function(){
				return this.hasClass("selected");
			},
			changed: function(){
				return this.hasClass("changed");
			},
			isNew: function(){
				return this.hasClass("new");
			},
			irow: function(){
				return this.parent().find("tr").index(this);
			},
			startEditing: function(){
				var $grid = this.data("plugin");

				//Запретить добавлять новые строки
				var $buttonAdd = $grid.data("$buttonAdd");
				if($buttonAdd) $buttonAdd.disable();

				var $col;
				var flags = $grid.data("flags");
				var colBegin = flags.selectable?1:0;
				for(var i=colBegin; i<colBegin + $grid.ncol(); i++){
					$col = this.col(i);
					if($col.hasClass("editable")){
						$col.startEditing();
						var editing = true;
					}
				}
				if(editing){
					//Флаги для блокировок различных действий 
					this.data("editing", true);
					$grid.data("editing", true);
				}
				
				return this;
			},
			stopEditing: function(){
				var $col;
				var $grid = this.data("plugin");
				var flags = $grid.data("flags");
				var colBegin = flags.selectable?1:0;
				var editing = this.data("editing");
				for(var i=colBegin; i<colBegin + $grid.ncol(); i++){
					$col = this.col(i);
					if($col.hasClass("editable")){
						$col.stopEditing();
						editing = false;
					}
				}
				this.data("editing", editing);
				return this;
			},
			applyEditing: function(){
				var $col;
				var $grid = this.data("plugin");
				var flags = $grid.data("flags");
				var colBegin = flags.selectable?1:0;
				var editing = this.data("editing");
				for(var i=colBegin; i<colBegin + $grid.ncol(); i++){
					$col = this.col(i);
					$col.applyEditing();
					editing = false;
				}
				this.data("editing", editing);
				return this;
			},
			startDragging: function(){
				var $grid = this.data("plugin");
				var $table = $grid.find(">table");
	
				if($grid.data("editing")) return;
				
				this.addClass("draggable");
				$table.addClass("unselectable");
				this.find("td").attr("unselectable", true);
				
				//запретить добавление строк
				var $buttonAdd = $grid.data("$buttonAdd");
				if($buttonAdd) $buttonAdd.disable();
				
				$grid.data("dragging", true).trigger("dragstart.grid", [this]);
				
				return this;
			}
		});
		
		colPlugin.fn.extend({
			row: function(i){
				var $cell = cellPlugin(this.filter("td:eq(" + i + ")"));
				return $cell;
			},
			icol: function(){
				return this.eq(0).parent().find("td").index(this.eq(0));
			}
		});
		
		cellPlugin.fn.extend({
			irow: function(){
				return $(this.parents()[1]).find("tr").index(this.parent());
			},
			icol: function(){
				return this.parent().find("td").index(this);
			},
			getColAlias: function(){
				var icol = this.icol();
				var namedColumns = this.parents(".lightUI:eq(0)").data("namedColumns");
				for(var i in namedColumns){
					if(namedColumns[i].inx == icol){
						return i;
					}
				}
				return null;
			},
			editable: function(type, inputFlags){
				var $row = this.parent();
				this.addClass("editable");

				if(is.unset(inputFlags)) inputFlags = {};
				if(inputFlags.mandatory) this.addClass("mandatory");
				
				this.data("type", type).data("flags", inputFlags);

				if(type == "select" && inputFlags && inputFlags.options){
					for(var i in inputFlags.options){
						var def = i;
						break;
					}
					if(is.set(def) && !this.html().length){
						this.html(lng(def)).attr("langkey", def);
					}							
				}

				if(inputFlags.disabled){
					this.disable();
				}
				else{
					this.enable();
				}
									
				if($row.hasClass("clickable")){
					this.data("plugin").data("hasEditable", true);
				}
				else{
					this.bind("click", onedit);
					// Кастылёчек для мобильной темы 
					if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/iPhone|iPad|iPod/i) || navigator.userAgent.match(/Opera Mini/i) || navigator.userAgent.match(/IEMobile/i)){
						this.bind("mouseover", onedit);
					}
				}

				return this;
			},
			startEditing: function(){
				var flags = this.data("flags");
				if(flags.disabled || flags.accessMode == 4 || flags.accessMode == 0) return;

				var $table = this.closest("table"); 
				var $grid = this.data("plugin");
				
				var type = this.data("type");
				var objID = $table.attr("id");
				var inputID = objID + "_edit_" + this.irow() + "_" + this.icol();
				if(!$("#" + inputID).length){
					$grid.append("<div id='" + inputID + "' class='lightUI editable'></div>");
				}
				var $inputBox = $("#" + inputID);
				var $input = createInput($inputBox, type, flags);

				//Инициализация и позиционирование
				if(is.jquery($input)){
					var $this = $(this);
					var width = $this.width();
					var innerWidth = $this.innerWidth();
					var height = $this.height();
					var innerHeight = $this.innerHeight();
					var borderLeft = (new Number($this.css("border-left-width").match(/\d*/)[0])).valueOf();
					var borderTop = (new Number($this.css("border-top-width").match(/\d*/)[0])).valueOf();

					var $field = $input.find("input,select");
					var paddingLeft = (new Number($field.css("padding-left").match(/\d*/)[0])).valueOf();
					var paddingRight = (new Number($field.css("padding-right").match(/\d*/)[0])).valueOf();

					if(type == "checkbox"){
						if(navigator.userAgent.match(/Chrome|Safari/)){
							$input.css({
								'position': 'absolute',
								'left': $(this).position().left,
								'top': $(this).position().top,
								'width': '21px',
								'height': '21px'
							});
						}
						else{
							var fieldWidth = $field.width();
							var fieldHeight = $field.height();
							$input.css({
								'position': 'absolute',
								'left': $(this).position().left,// + (innerWidth - fieldWidth - 1)/2 + borderLeft,
								'top': $(this).position().top + (innerHeight - fieldHeight - 1)/2 + borderTop
							});
						}
						$field.focus().select();
						
						debug($(this).position());
						debug($input.css('top'));
						debug($input.css('left'));
						
						var langkey = $this.attr("langkey");
						if(langkey == "yes"){
							$input.fieldval(true);
						}
						else{
							$input.fieldval(false);
						}
						$this.html("");
					}
					else{
						$input.css({
							'position': 'absolute',
							'left': $(this).position().left + (innerWidth - width)/2 + borderLeft,
							'top': $(this).position().top + (innerHeight - height)/2 + borderTop
						});

						$field.width($this.width() - paddingLeft - paddingRight).focus().select();

						if(is.func($input.fieldalias)){
							$input.fieldalias($(this).attr("langkey"));
						}
						else{
							$input.fieldval($(this).html());
						}
					}


//					var data = {$cell: this, $input: $input};
//					$input.bind("error.input", data, onerror);

					$table.parent().trigger("startEditing.grid", [this, $input]);
					this.data("$input", $input);
					$input.data("$cell", this);

					//Установить флаги для различных блокировок
					this.data("editing", true);
					$grid.data("editing", true);
				}
				
				return this;
			},
			stopEditing: function(){
				var $input = this.data("$input");
				if($input){
					var $grid = this.data("plugin");
					$grid.trigger("stopEditing.grid", [this, $input]);
					$input.remove();
					this.data("$input", null);

					this.removeClass("error").attr("title", "");
					
					if(this.data("type") == "checkbox"){
						var langkey = this.attr("langkey");
						if(langkey){
							this.html(lng(langkey));
						}
					}
				}
				this.data("editing", false);
				return this;
			},
			applyEditing: function(){
				var $input = this.data("$input");
				if($input){
					var isDataChanged = false;
					if(is.func($input.fieldalias)){
						var alias = $input.fieldalias();
						var lngAlias = lng(alias);
						var oldLngAlias = this.html();
						isDataChanged = lngAlias != oldLngAlias;
						this.html(lngAlias);
						this.attr("langkey", alias);
					}
					else{
						var value = $input.fieldval();
						if(this.data("type") == "checkbox"){
							if(value){
								isDataChanged = (this.attr("langkey") != "yes");
								this.attr("langkey", "yes")
									.html(lng("yes"));
							}
							else{
								isDataChanged = (this.attr("langkey") != "no");
								this.attr("langkey", "no")
									.html(lng("no"));
							}
						}
						else{
							isDataChanged = this.html() != value;
							this.html(value);
						}
					}
					if(isDataChanged){
						var $row = this.parent();
						$row.addClass("changed");
						this.data("plugin").trigger("cellChange.grid", [this, $input]);
					}
				}
				return this;
			},
			enable: function(){
				//копирую флаги чтобы не изменить через ссылку общие для столбца флаги
				var flags = $.extend(true, {}, this.data("flags"));
				if(is.unset(flags.accessMode) || flags.accessMode != 4){
					this.removeClass("disabled");
					flags.disabled = false;
					this.data("flags", flags);
				}

				return this;
			},
			disable: function(){
				this.addClass("disabled");
				//копирую флаги чтобы не изменить через ссылку общие для столбца флаги
				var flags = $.extend(true, {}, this.data("flags"));
				flags.disabled = true;
				this.data("flags", flags);

				return this;
			},
			fieldval: function(value){
				if(this.hasClass("editable")){
					if(is.set(value)){
						applyAttrs.call(this, value);
						var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
						if(is.func($input.fieldalias)){
							$input.fieldval(value);
							var alias = $input.fieldalias();
							this.html(lng(alias));
							this.attr("langkey", alias);
						}
						else if(this.data("type") == "checkbox"){
							if(value){
								isDataChanged = (this.attr("langkey") != "yes");
								this.attr("langkey", "yes")
									.html(lng("yes"));
							}
							else{
								isDataChanged = (this.attr("langkey") != "no");
								this.attr("langkey", "no")
									.html(lng("no"));
							}
						}
						else{
							this.html(value);
						}
						return this;
					}
					else{
						var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
						if(is.func($input.fieldalias)){
							$input.fieldalias(this.attr("langkey"));
							return $input.fieldval();
						}
						else if(this.data("type") == "checkbox"){
							return (this.attr("langkey") == "yes")?true:false;
						}
						else{
							return this.html();
						}
					}
				}
				else{
					if(is.set(value)) return this.html(value);
					else return this.html();
				}
/*				if(is.set(value)){
					if(this.hasClass("editable")){
						applyAttrs.call(this, value);
						var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
						if(is.func($input.fieldalias)){
							$input.fieldval(value);
							var alias = $input.fieldalias();
							this.html(lng(alias));
							this.attr("langkey", alias);
						}
						else if(this.data("type") == "checkbox"){
							if(value){
								isDataChanged = (this.attr("langkey") != "yes");
								this.attr("langkey", "yes")
									.html(lng("yes"));
							}
							else{
								isDataChanged = (this.attr("langkey") != "no");
								this.attr("langkey", "no")
									.html(lng("no"));
							}
						}
						else{
							this.html(value);
						}
					}
					else{
						this.html(value);
					}
					return this;
				}
				else{
					if(this.hasClass("editable")){
						var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
						if(is.func($input.fieldalias)){
							$input.fieldalias(this.attr("langkey"));
							return $input.fieldval();
						}
						else{
							return $input.fieldval();
						}
					}
					else{
						return this.html();
					}
				}*/
			},
			__html__: this.html,
			html: function(value){
				if(value instanceof String){
					arguments[0] = value.valueOf();
				}
				return this.__html__.apply(this, arguments);
			},
			validate: function(){
				if(this.hasClass("editable")){
					var $input = createInput($("<div></div"), this.data("type"), this.data("flags"));
					return $input.validate();
				}
				return null;
			}
			
		});
		
		//Добавить начальные строки
		$this.addRow(nrow);
		$this.find("tbody tr.new").removeClass("new");
			
		// Убеждаемся, что наш плагин возвращает нашу "скопированную" версию jQuery
		return $this;
	};

})();
(function(){

	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIEdit = function(name, comment, flags){

		if(is.unset(flags)) flags = {};

		var applyArgs = function(){
			if(is.string(comment)) this.find(".comment").html(lng(comment)).attr("langkey", comment);
			if(is.string(flags.inputPadding)) this.find(".label").css("width", flags.inputPadding);
			if(is.string(name) && name.length){
				if(name.match(/[\.,;:?!]/)){
					this.find(".label>span:eq(0)").html("&nbsp;");
				}
				var $label = this.find(".label>label");
				$label.html(lng(name));
				$label.attr("langkey", name);
			}
			else{
				this.find(".label>span:eq(0)").html("&nbsp;");
			}
			if(is.string(flags.altname)) this.find(".altname").html(lng(flags.altname)).attr("langkey", flags.altname);
			this.data("flags", flags);
		}
		
		var key = "$" + this.find(".edit").attr("id");
		
		var pattern  = "<div class='edit'>";
		pattern += "<div class='label'><label></label><span>:</span></div>";
		pattern += "<div class='input'></div>";
		pattern += "<div class='altname'></div>";
		pattern += "<div class='error'></div>";
		pattern += "<div class='clear'>&nbsp;</div>";
		pattern += "<div class='comment'></div>";
		pattern += "<div class='clear'>&nbsp;</div></div>";
		pattern += "<div class='clear'>&nbsp;</div>";

		this.html(pattern);

		if(flags.mandatory){
			this.find(".label").append("<span class='mandatory'>*</span>");
		}
		this.find(".error").css("display", "none");
		var $input = this.find("input");
		
		if(is.unset(comment)){
			this.find(".comment").css("display", "none");
		}
		
		$input.live('focusin', function(){
			$(this).addClass('focus');
		}).live('focusout', function(){
			$(this).removeClass('focus');
		});

		var objID = gID.get();
		
		this.find(".edit").attr("id", objID);
		this.addClass("lightUI");

		//-----------------------------------------------------------------------
		// Расширим возможности полученных копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			enable: function(){
				this.find(".edit").removeClass("editDisabled");
				if(this.find("input").hasClass("validate")){
					this.find(".error").css("display", "");
				}
				this.find("input,select,textarea").attr("disabled", false);
				this.find(".label .mandatory").html("*");
				return this;
			},
			disable: function(){
				this.find(".edit").addClass("editDisabled");
				this.find(".error").css("display", "none");
				this.find("input,select,textarea").attr("disabled", true);
				this.find(".label .mandatory").html("");
				return this;
			},
			isDisabled: function(){
				return this.find(".edit").hasClass("editDisabled");
			},
			setError: function(message){
				if(is.unset(message)){
					this.cleanError();
				}
				else{
					var $error = this.find(".error");
					this.find("input").addClass("validate");
					$error.fadeIn('slow');
					$error.attr("langkey", message);
					$error.html(lng(message));
				}
			},
			cleanError: function(){
				var $error = this.find(".error");
				this.find("input").removeClass("validate");
				$error.css("display", "none");
				$error.attr("langkey", "");
				this.find(".error").html("");
			},
			setComment: function(message){
				comment = message;
				this.find(".comment").show()
					.html(lng(comment))
					.attr("langkey", comment);
			},
			cleanComment: function(){
				this.find(".comment").hide();
			},
			label: function(name){
				var $label = this.find(".label>label");
				if(is.string(name)){
					$label.html(lng(name));
					$label.attr("langkey", name);
					this.find(".label>span").html(":");
					return this;
				}
				else{
					return $label.html(lng(name));
				}
			},
			altname: function(name){
				var $altname = this.find(".altname");
				if(is.string(name)){
					$altname.html(lng(name));
					$altname.attr("langkey", name);
					return this;
				}
				else{
					return $altname.html(lng(name));
				}
			},
			mandatory: function(value){
				if(is.set(value)){
					if(value){
						var $manda = this.find(".label .mandatory");
						if($manda.length){
							$manda.html("*");
						}
						else{
							this.find(".label").append("<span class='mandatory'>*</span>");
						}
						this.flags().mandatory = true;
					}
					else{
						this.find(".label .mandatory").remove();
						this.flags().mandatory = false;
					}
					return this;
				}
				else{
					return this.flags().mandatory;
				}
			},
			flags: function(){return this.data("flags");}
		});

		applyArgs.call(this);

		// Убеждаемся, что наш плагин возвращает нашу "скопированную" версию jQuery
		return plugin(this);
	}
})();
(function(){
	
	//-------------------------------------
	// Делаем копии jQuery, используя sub()
	//-------------------------------------
	var pluginDomainName = jQuery.sub();
	var pluginIPv4 = jQuery.sub();
	var pluginIPv6 = jQuery.sub();
	var pluginIPv4IPv6 = jQuery.sub();
	var pluginMAC = jQuery.sub();
	var pluginText = jQuery.sub();
	var pluginPort = jQuery.sub();
	var pluginPortOld = jQuery.sub();
	var pluginNumber = jQuery.sub();
	var pluginSelect = jQuery.sub();
	var pluginStatic = jQuery.sub();
	var pluginCheckbox = jQuery.sub();

	
	var keyDown = function(event){
		if(event.keyCode == 27) {
			//~ || event.keyCode == 9){
			if(!$.browser.opera){
				keyPress.call(this, event);
			}
			return false;
		}
	}
	
	var keyPress = function(event){
		if(navigator.userAgent.match('/Iceweasel/') && event.keyCode == 9) return;
		if(event.keyCode == 13 || event.keyCode == 9){
			this.data("noblur", true);
			setTimeout(context(this).callback(function(){this.data("noblur", false);}), 1);
			var $input = this.find("input");
			var errorCode = this.validate();
			if(is.string(errorCode)){
				this.trigger("error.input", [errorCode, event.keyCode]);
//				$input.focus();
				return false;
			}
			else{
				var obj = {13: "enter", 9: "tab"};
				this.trigger(obj[event.keyCode] + ".input");
			}
		}
		else if(event.keyCode == 27){
			var $input = this.find("input");
			this.trigger("esc.input");
		}			
		
		return true;
	}
	
	var onblur = function(event){
		if(this.data("noblur")) return;
		var errorCode = this.validate();
		if(is.string(errorCode)){
			var $input = this.find("input");
			this.trigger("error.input", errorCode);
//			setTimeout("$('#"+$input.attr("id")+"').focus()", 1);
		}
		else{
			this.trigger("unfocus.input");
		}
		event.stopPropagation();
	}

	var onfocus = function(event){
		this.trigger("onfocus.input");
		event.stopPropagation();
	}		
	
	var bindEvents = function($obj){
		var $input = this.find("input, select");
		if($.browser.opera
			|| $.browser.webkit
			|| $.browser.msie){
			$input.keydown(context($obj).callback(keyDown));
		}
		$input.keypress(context($obj).callback(keyPress));
		this.focusout(context($obj).callback(onblur));
		this.focusin(context($obj).callback(onfocus));
	}
	
	var	fieldval = function(value){
		if(is.set(value)){
			applyAttrs.call(this, value);
			this.find("input").val(value);
			return this;
		}
		else{
			return this.find("input").val();
		}
			
	};
	
	var checkRe = function(errorCode){
		if(!errorCode){
			var re = this.flags().re;
			var validater;
			var value = this.fieldval();
			var alias = value;
			if(is.func(this.fieldalias)) alias = this.fieldalias();
			if(is.array(re)){
				for(var i=0; i<re.length; i++){
					validater = re[i];
					if(is.func(validater)){
						errorCode = validater(value, alias);
						if(errorCode){
							break;
						}
					}
				}
			}
			else if(is.func(re)){
				errorCode = re(value, alias);
			}
		}
		return errorCode;
	}

	var	clean = function(){
		this.fieldval("");
		return this;
	};

	var initPlugin = function(flags){
		if(flags.password){
			this.append("<input type='password'/>");
		}
		else{
			this.append("<input type='text'/>");
		}
		var $input = this.find("input");
		objID = gID.get();
		$input.attr("id", objID);
		if(is.number(flags.size)) $input.attr("size", flags.size);
		if(is.number(flags.maxLength)) $input.attr("maxLength", flags.maxLength);
		if(flags.disabled) $input.attr("disabled", true);
		this.data("flags", flags);
	}
	
	var validateIPv4 = function(str){
		var patt = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/; 

		if(str.length){
			str = str.match(/\S+/)[0];
			
			if(str.length > 18) return "netAddrInvalid";
			
			if(!patt.test(str)) return "netAddrInvalid";

			var arr = str.split(".");
			for(var i in arr){
				if(arr[i] > 255){
					return "netAddrInvalid";
				}
			}
		}
		return null;
	}
	
	var validateIPv6 = function(str, flags) {
		
		if(str.match(/^::ffff:/)){
		//IPv6, отображенный на IPv4
			
			return validateIPv4(str.replace(/^::ffff:/, ""), flags);
		}
		else{
			var re = new RegExp(/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/);
			if (!re.test(str)) return "netAddrInvalid";
		}
		return null;
	}
	
	var validateDomain = function(str, flags) {
		var host = str;
		if(host.length){
			var pat = /^[\wа-яА-Я-]+$/;
			var dot = host.lastIndexOf("."); 
			var dname = host.substring(0,dot);
			var ext = host.substring(dot+1,host.length); //после последней точки
			if(((ext.length-1) < 1) || ((ext.length) > 6)) {
				return false;
			}
			host = host.replace(/(^\s+|\s+$)/g,''); // удаляем пробелы в начале и в конце
			if ((dot < 2) || (dot > 63)) { // доменное имя от 2 до 63 символов
				return false;
			}
			if ((dot < 2) || (dot > 63)) { // доменное имя от 2 до 63 символов
				return false;
			}
			var labels = host.split("."); 
			for(var j=0; j<labels.length; j++) {
				if (!pat.test(labels[j])) {
					return false;
				}
			}
			var pat_ext = /^[\wа-яА-Я][^0-9-]+$/; // после последней точки только буквы
			if (!pat_ext.test(ext)) {
				return false;
			}
			return true;
		}
	}
/*
 * Маски для тестов.
	var bitmask = ["255.255.255.254", "255.255.255.252", "255.255.255.248", "255.255.255.240", "255.255.255.224", "255.255.255.192", "255.255.255.128", "255.255.255.0", 
				   "255.255.254.0", "255.255.252.0", "255.255.248.0", "255.255.240.0", "255.255.224.0", "255.255.192.0", "255.255.128.0", "255.255.0.0", 
				   "255.254.0.0", "255.252.0.0", "255.248.0.0", "255.240.0.0", "255.224.0.0", "255.192.0.0", "255.128.0.0", 
				   "255.0.0.0", "254.0.0.0", "252.0.0.0", "248.0.0.0", "240.0.0.0", "224.0.0.0", "192.0.0.0", "128.0.0.0", "0.0.0.0" ];
	for (var i = 0; i <= 128; i++) {
		bitmask.push(i.toString());
	}
	var bitmaskbag = ["/8", "/255.0.0.0", "192.168.0.1", "255,255.255,254", "255.255.o.o", "255.255.127.0", "255.255.253.0", "255.255..0", "255.255.3.1", "1.2.3.4", "8.8.8.8"];
*/
/*
 * Функция checkMask(mask, type), проверяет валидность введенной маски в зависимости от типа адреса(ipv4 или ipv6);
 * входные данные mask - значение маски типа string;
 * 				  type - значение типа сети;
 * возвращаемое значение - "InvalidMask", если ошибка. null - если маска прошла валидацию
 * Вспомогательная функция - checkMaskRange(val, start_range, end_range), проверяет маску при короткой записи(/n)
 * входные значения val - значение, start_range - нижний предел(0), end_range - верхний предел(32 или 128);
 * возвращает true - если валидация не пройдена, false - если пройдена.
*/
	var checkMask = function(mask, type) {

		if(is.string(mask)) {
			var arr = mask.split(".");
			var len = arr.length;
			switch(len) {
				case 1:
					var endrange = (type == "ipv4")?32:128;
					if (checkMaskRange(arr[0], 0, endrange)) return "InvalidMask";
				break;
				case 4:
					if (is.IPv4(mask)) {
						var bits = "";
						for (var i = 0; i < 4; i++) {
							var octet = parseInt(arr[i]);
							if (octet == 0) {
								bits += "00000000";
							} else {
							   bits += octet.toString(2);
							}
						}
						if (bits.length == 32) {
							var flagmask;
							flagmask = (bits.charAt(0) == "1")?false:true;
							for (var j = 1; j <= bits.length; j++) {
								if (bits.charAt(j) == 0) {
									flagmask = true;
								}
								if ((bits.charAt(j) == 1) && flagmask) {
									return "InvalidMask";  
								}
							}
						} else {
						  return "InvalidMask" 
						}
					} else {
					   return "InvalidMask" 
					}
				break;
				default:
					return "InvalidMask"
				break;
			}
			return null;
		}
	}

	var checkMaskRange = function(val, start_range, end_range) {
		
		if ((parseInt(val) == "NaN") || (parseInt(val) < start_range) || (parseInt(val) > end_range)) {
			return true;
		} else {
			return false;
		}
	}
/*
 * Функция checkPort(port, range, several, use_ports), проверяет валидность введенного значения порта или нескольких портов(введенных через диапазон (":") или перечисление(","));
 * входные данные port - значение порта типа string;
 * входные данные range - значение флага типа bool. Определяет возможность ввода диапазона значений для порта;
 * входные данные several - значение флага типа bool. Определяет возможность ввода нескольких значений(перечисление) для порта;
 * входные данные use_ports - массив портов, которые уже используются;
 * возвращаемое значение - "InvalidPort", если ошибка. null - если маска прошла валидацию;
 * Вспомогательная функция - isPort(val), проверяет действительно ли это порт;
 * входные значения val - значение;
 * возвращает true - если валидация пройдена, false - если не пройдена.
*/
	var checkPort = function(port, range, several, use_ports) {
		var arrport = [];
		var isrange = false;
		var isseveral = false;
		var use_ports = use_ports;
		if (range) {
			arrport = port.split(":");
			if (arrport.length > 1) {
				isrange = true;
				if (arrport.length > 2) return "InvalidPort";
				for (var i = 0; i < arrport.length; i++) {
					if (!isPort(arrport[i])) return "InvalidPort";
				};
				if (parseInt(arrport[0]) >= parseInt(arrport[1])) return "InvalidPort";
			}
		}
		if (several) {
			arrport = port.split(",");
			if (arrport.length > 1) {
				isseveral = true;
				if (isrange) return "InvalidPort";
				for (var i = 0; i < arrport.length; i++) {
					if (!isPort(arrport[i])) return "InvalidPort";
				}
			}
		}
		if (!isrange && !isseveral) {
			if (!isPort(port)) return "InvalidPort";
		}
		if (use_ports) {
			if (_.indexOf(use_ports, parseInt(port)) != -1) return "InvalidPortExist";
		}
		return null;
	}

	var isPort = function(val){
		var patt = /^[0-9]*$/;;
		val = val.match(/\S+/)[0];
		if(!patt.test(val)) return false;
		var num = new Number(val);
		if(num < 1) return false;
		if(num > 65535) return false;
		return true;
	}

	var isEmpty = function(){
		return !this.find("input").val().length;
	}

	var enable = function(){
		var flags = this.data("flags");
		if(is.unset(flags.accessMode) || flags.accessMode != 4){
			this.find("input, select").attr("disabled", false);
		}
		return this;
	}
	
	var show = function(){
		var flags = this.data("flags");
		if(is.unset(flags.accessMode) || flags.accessMode != 0){
			this.__show__();
		}
		return this;
	}

	var isDisabled = function(){
		return this.find("input, select").attr("disabled")
	}
	
	var disable = function(){
		this.find("input, select").attr("disabled", true);
	}

	var applyAttrs = function(value){
/*
//		function toDefaultMode(){
//			delete this.data("flags").accessMode;
//			if(!this.flags().disabled) this.enable();
//		}
		
		try{
			var mode = this.data("flags").accessMode = value.__attrs__.mode;
			switch(mode){
				case 4:
					this.find("input, select").attr("disabled", true);
				break;
				case 0:
					this.hide();
				break;
//				default:
//					toDefaultMode.call(this);
//				break;
			}
		}
		catch(e){
//			toDefaultMode.call(this);
		}*/
	}

	// Добавим плагин input к оригинальной копии jQuery
	jQuery.fn.lightUIDomainName = function(flags){
		if(is.unset(flags)) flags = {};
		if(is.set(flags)){
			var isip = flags.isip;
			var ipv6 = flags.ipv6;
		}
		
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginDomainName.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					var host = this.find("input").val();
					if(host.length){
						if(isip) {
							if(ipv6 == true){ // если v6
								if(!validateDomain(host) && (validateIPv4(host)!=null) && (validateIPv6(host)!=null)){ 
									return "domainNameInvalid";
								}
							}
							else { // если нет v6
								if(!validateDomain(host) && (validateIPv4(host)!=null)){ 
									return "domainNameInvalid";
								}
							}
						}
						else {
							if(!validateDomain(host)) {
								return "domainNameInvalid";	
							}
						}
					}
					return checkRe.call(this);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		var $obj = pluginDomainName(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	
	}

	// Добавим плагин IPv4 к оригинальной копии jQuery
	jQuery.fn.lightUIIPv4 = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginIPv4.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					var str = this.find("input").val();
					var arr = str.split("/");
					var errorCode = null;
	
					var bitmask = arr[1];
					if(is.string(bitmask)){
						if(parseInt(bitmask).toString() == "NaN" || bitmask > 32 || bitmask < 0){
							return "netAddrInvalid";
						}
					}
	
					errorCode = validateIPv4(arr[0], flags);
					return checkRe.call(this, errorCode);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginIPv4(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}

	// Добавим плагин IPv6 к оригинальной копии jQuery
	jQuery.fn.lightUIIPv6 = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginIPv6.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					var str = this.find("input").val();
					var errorCode = null;
	
					if(str.length){
						str = str.match(/\S+/)[0];
						var arr = str.split("/");
						var bitmask = arr[1];
						str = arr[0];
						if(is.string(bitmask)){
							if(parseInt(bitmask).toString() == "NaN" || bitmask > 128 || bitmask < 0){
								return "netAddrInvalid";
							}
						}
						errorCode = validateIPv6(str);
					}
					
					return checkRe.call(this, errorCode);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginIPv6(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}

	// Добавим плагин IPv4IPv6 к оригинальной копии jQuery
	jQuery.fn.lightUIIPv4IPv6 = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginIPv4IPv6.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					var str = this.find("input").val();
					var arr = str.split("/");
					var errorCode = null;
	
					var bitmask = arr[1];
					errorCode = validateIPv4(arr[0]);
					if (!errorCode) {
						errorCode = checkMask(arr[1], "ipv4");
					} else {
						errorCode = validateIPv6(arr[0]);
						if (!errorCode) {
							errorCode = checkMask(arr[1], "ipv6");
						}
					}
	
					return checkRe.call(this, errorCode);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginIPv4IPv6(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}

	// Добавим плагин MAC к оригинальной копии jQuery
	jQuery.fn.lightUIMAC = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginMAC.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					if (flags.isRange) {
						var patt = /^[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}:[0-9a-fA-F*]{1,2}$/; 
					} else {
						var patt = /^[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}:[0-9a-fA-F]{1,2}$/; 
					}
					var str = this.find("input").val();
	
					if(str.length){
						str = str.match(/\S+/)[0];
		
						if(!patt.test(str)) return "netAddrInvalid";
		
						var arr = str.split(".");
						for(var i in arr){
							if(arr[i] > 255){
								return "netAddrInvalid";
							}
						}
					}
					return checkRe.call(this);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginMAC(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}
	// Добавим плагин Port к оригинальной копии jQuery
	jQuery.fn.lightUIPort = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginPort.fn.extend({
			validate: function(){
				
				if(!this.find("input").attr("disabled")){
					var errorCode = null;
					var isRange = (flags.isRange)?true:false;
					var isSeveral = (flags.isSeveral)?true:false;
					var use_ports = (flags.use_ports)?flags.use_ports:false;
					var str = this.find("input").val();
					if(str.length){
						errorCode = checkPort(str, isRange, isSeveral, use_ports);
					}
					return checkRe.call(this, errorCode);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginPort(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}

		// Добавим плагин PortOld к оригинальной копии jQuery
		// Плагин нужен на странице виртуальных серверов, т.к. подряд идет 4 поля nodeport
		// и только в первых 2-х задан параметр use_ports, в итоге не работает проверка на совадение портов
	jQuery.fn.lightUIPortOld = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginPortOld.fn.extend({
			validate: function(){

				if(!this.find("input").attr("disabled")){
					var errorCode = null;
					var isRange = (flags.isRange)?true:false;
					var isSeveral = (flags.isSeveral)?true:false;
					var str = this.find("input").val();
					if(str.length){
						errorCode = checkPort(str, isRange, isSeveral);
					}
					return checkRe.call(this, errorCode);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		var $obj = pluginPortOld(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}


	// Добавим плагин MAC к оригинальной копии jQuery
	jQuery.fn.lightUIText = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginText.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					return checkRe.call(this);
				}
				return null;
			},
			fieldval: fieldval,
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginText(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}


	// Добавим плагин Static к оригинальной копии jQuery
	jQuery.fn.lightUIStatic = function(){
		this.data("flags", {});
		this.addClass("static");
		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginStatic.fn.extend({
			validate: function(){
				return null;
			},
			fieldval: function(value){
				applyAttrs.call(this, value);
				if(is.set(value)){
					return this.html(value.valueOf());
				}
				else{
					return this.html();
				}
					
			},
			isEmpty: function(){
				return !this.html().length;
			},
			enable: function(){
				return this;
			},
			disable: function(){
				return this;
			},
			isDisabled: function(){
				return false;
			},
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		var $obj = pluginStatic(this)
		this.data("light_ui_input", $obj);

		return $obj;
	}
	
	// Добавим плагин Number к оригинальной копии jQuery
	jQuery.fn.lightUINumber = function(flags){
		if(is.unset(flags)) flags = {};
		var objID;
		initPlugin.call(this, flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginNumber.fn.extend({
			validate: function(){
				if(!this.find("input").attr("disabled")){
					var str = this.find("input").val();
	
					var flags = this.flags();
					if(str.length){
						str = str.match(/\S+/)[0];
						var patt = /^-*[0-9]+(\.?[0-9]+|[0-9]*)$/;
						if(!patt.test(str)) return "numNaN";
	
						var num  = new Number(str);
						if(is.number(flags.minval) && num < flags.minval) return "numLessThanMin";
						if(is.number(flags.maxval) && num > flags.maxval) return "numMoreThanMax";
					}
					return checkRe.call(this);
				}
				return null;
			},
			fieldval: function(value){
				if(is.set(value)){
					applyAttrs.call(this, value);
					this.find("input").val(value);
					return this;
				}
				else{
					var val = this.find("input").val();
					if(val.length){
						return (new Number(this.find("input").val())).valueOf();
					}
					else{
						return val;
					}
				}
					
			},
			isEmpty: isEmpty,
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: clean,
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginNumber(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}

	// Добавим плагин Select к оригинальной копии jQuery
	jQuery.fn.lightUISelect = function(flags){
		if(is.unset(flags)) flags = {};
		if(is.unset(flags.options)) flags.options = {};

		var $input = this.append("<select></select").find("select");
		if(flags.disabled) $input.attr("disabled", true);

		var options = flags.options;
		var optionArray = flags.optionArray;
		if(is.array(optionArray)){
			var opt;
			flags.options = {};
			options = flags.options;
			for(var i=0; i<optionArray.length; i++){
				opt = optionArray[i];
				options[opt.name] = opt.value;
				$input.append("<option value='" + opt.value + "'>" + lng(opt.name) + "</option>")
					.find("option:last").attr("langkey", opt.name);
			}
		}
		else if(is.object(options)){
			for(var i in options){
				$input.append("<option value='" + options[i] + "'>" + lng(i) + "</option>")
					.find("option:last").attr("langkey", i);
			}
		}
		if(options.length){
			var value = this.find("option:eq(0)").attr(value);
			$input.val(value).data("value", value);
		}
		$input.attr("id", gID.get());
		if(is.number(flags.size)) $input.attr("size", flags.size);
		if(is.set(flags.multiple)) $input.attr("multiple", flags.multiple);
		this.data("flags", flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginSelect.fn.extend({
			validate: function(){
				if(!this.find("select").attr("disabled")){
					return checkRe.call(this);
				}
				return null;
			},
			fieldval: function(value){
				var $select = this.find("select");
				if(is.set(value)){
					applyAttrs.call(this, value);
					$select.val(value.valueOf()).data("value", value.valueOf());
					return this;
				}
				else{
					return $select.val();
				}
			},
			fieldalias: function(alias){
				var $select = this.find("select");
				var options = this.flags().options;
				if(is.set(alias)){
					var $option = this.find("option");
					for(var i=0; i<$option.length; i++){
						if($option.eq(i).attr("langkey") == alias){
							this.fieldval($option.eq(i).attr("value"));
							break
						}
					}
					return this;
				}
				else{
					return this.find("select option:selected").attr("langkey");
/*					var value = this.fieldval();
					for(var i in options){
						if(value == options[i]){
							return i;
						}
					}
					return null;*/
				}
			},
			addOption: function(__name, __value){
				var $select = this.find("select");
				var value = $select.data("value");
				$select.append("<option value='" + __value + "'>" + lng(__name) + "</option>")
					.find("option:last").attr("langkey", __name);
				if(!this.data("flags").manualCorrection){
					//Выставить начальное значение автоматически
					var value = $select.data("value");
					if(is.unset(value) || value == __value){
						this.fieldval(__value);
					}
				}
				return this;
			},
			correctValue: function(){
				//Откорректировать в соотв. с начальным значением
				var $options = this.find("select option");
				var value = this.find("select").data("value");
				for(var i=0; i<$options.length; i++){
					if($options.eq(i).attr("value") == value){
						this.fieldval(value);
						return this;
					}
				}
				return this;
			},
			cleanOptions: function(){
				this.find("select").html("");
			},
			updateSelect: function(){
				this.html(this.html());
				return this;
			},
			isEmpty: function(){return false},
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: function(){return this},
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginSelect(this);
		bindEvents.call(this, $obj);
		this.data("light_ui_input", $obj);

		return $obj;
	}


	// Добавим плагин Checkbox к оригинальной копии jQuery
	jQuery.fn.lightUICheckbox = function(flags){
		if(is.unset(flags)) flags = {};
		if(is.unset(flags.options)) flags.options = {};

		var $input = this.append("<input type='checkbox'></checkbox").find("input");
		if(flags.disabled) $input.attr("disabled", true);

		$input.attr("id", gID.get());
		this.data("flags", flags);

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginCheckbox.fn.extend({
			validate: function(){
				return null;
			},
			fieldval: function(value){
				var $input = this.find("input");
				if(is.set(value)){
					applyAttrs.call(this, value);
					$input.attr("checked", value?true:false);
					return this;
				}
				else{
					return $input.attr("checked")?true:false;
				}
			},
			isEmpty: function(){return false},
			enable: enable,
			disable: disable,
			isDisabled: isDisabled,
			flags: function(){return this.data("flags");},
			clean: function(){return this},
			show: show,
			__show__: this.show
		});

		
		var $obj = pluginCheckbox(this);
		bindEvents.call(this, $obj);

		return $obj;
	}
})();


(function(){

	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();
	
	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIUpload = function(action, filename, options){
		
		this.iframename = gID.get();
		
		options = $.extend({
			'auto': true,
			'method': 'post',
			'browse': 'Browse',
			'cancel': 'Cancel'
		}, options);
		
		action = (action.indexOf('?')>=0)?action+'&proxy=y':action+'?proxy=y'
		
		var $pattern = $("\
			<div class='upload normal'>\
				<div class='ustatus'></div>\
				<div class='ufile'>\
					<input type='text' class='path' readonly='readonly' value='' />\
				</div>\
				<div class='ubutton'>\
					<input type='button' class='browse' langkey='" + options.browse + "' value='" + lng(options.browse) + "' />\
					<input type='button' class='cancel' langkey='" + options.cancel + "' value='" + lng(options.cancel) + "' />\
				</div>\
				<div class='clear'></div>\
				<form action='" + action + "' id='" + gID.get() + "' enctype='multipart/form-data' target='" + this.iframename + "' method='" + options.method + "'>\
					<input type='file' name='" + filename + "' />\
					<input type='reset' />\
				</form>\
				<iframe frameborder='0' scrolling='no' name='" + this.iframename + "' id='" + this.iframename + "'></iframe>\
			</div>\
		");
		
		this.html($pattern);
		this.addClass("lightUI");
		this.uploading = false;
		this.auto = options.auto;
		
		this.find('>.upload input.browse').bind('click', callback(this, function(){
			this.find('>.upload input[type=file]').trigger('click');
			return false;
		}));
		this.find('>.upload input.cancel').bind('click', callback(this, function(){
			if (this.uploading) {
				for (var i = 0; i < window.frames.length; i++){
					if (window.frames[i].name == this.iframename) {
						if (jQuery.browser.msie) {
							window.frames[i].document.execCommand('Stop');
						} else {
							window.frames[i].stop();
						}
					}
				}
				this.find('>.upload').removeClass('uploading').trigger('clear');
				this.uploading = false;
				this.trigger('break.upload');
			}
			return false;
		}));
		this.find('>.upload iframe').bind('load', callback(this, function(e){
			if (this.uploading) {
				this.find(">.upload").removeClass('uploading');
				this.uploading = false;
				this.trigger('end.upload', $(e.target).contents().find("body").html());
			}
			return false;
		}));
		this.find('>.upload input[type=file]').bind('change', callback(this, function(e){
			var path = basename($(e.target).val());
			this.find('>.upload input.path').val(path);
			if (this.auto) {
				this.find(">.upload").trigger('upload');
			}
			this.trigger('change.upload');
			return false;
		}));
		this.find(">.upload").bind({
			'upload': callback(this, function(){
				if (!this.uploading && this.find('>.upload input[type=file]').val() != '') {
					this.uploading = true;
					this.find(">.upload").addClass('uploading').find('form').submit();
					this.trigger('begin.upload');
				}
				return false;
			}),
			'clear': callback(this, function(){
				this.find('>.upload input.path').val('');
				this.find('>.upload input[type=reset]').trigger('click');
				this.find('>.upload form').get(0).reset();
				return false;
			})
		});

		//Костыль для IE
		try{
			var ieversion = navigator.appVersion.match(/MSIE\s+\d+/)[0].replace('MSIE', '')
/*			if(ieversion >= 8){
				this.find('>.upload').addClass('upload-ie8').find('input.browse').unbind('click');
			}
			else if(ieversion < 8){
				this.find('>.upload').addClass('upload-ie7').find('input.browse').unbind('click');
			}*/
			if(ieversion){
				this.find('>.upload').addClass('upload-ie');
			}
			
		}
		catch(e){
		}
		//-----------------------------------------------------------------------
		// Расширим возможности полученных копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			enable: function(){
				this.find(">.upload").removeClass('disable').addClass('normal');
				this.find(">.upload :input").removeAttr('disabled');
				return this;
			},
			disable: function(){
				this.find(">.upload").removeClass('normal').addClass('disable');
				this.find(">.upload :input").attr('disabled','disabled');
				return this;
			},
			upload: function(){
				this.find(">.upload").trigger('upload');
				return this;
			},
			cancel: function(){
				this.find(">.upload input.cancel").trigger('click');
				return this;
			},
			clear: function(){
				this.find(">.upload").trigger('clear');
				return this;
			}
		});
		return plugin(this);
	}
})();
(function(){

	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();
	
	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUITrackbar = function(value, flags){
		
		var objID = gID.get();
		
		flags = $.extend({
			'minval': 0,
			'maxval': 100,
			'suffix': '%',
			'direct': 'horizontal'
		}, flags);
		
		this.data('flags', flags);
		
		var $pattern = $("\
			<div class='trackbar unselectable'>\
				<div class='shell'>\
					<div class='rail'>\
						<div class='tail'></div>\
						<div class='toddler'></div>\
					</div>\
					<div class='value' unselectable='unselectable'></div>\
				</div>\
			</div>\
		");
		
		this.html($pattern);
		this.addClass("lightUI");
		
		this.find('>.trackbar').attr("id", objID).addClass(flags.direct=='horizontal'?'horizontal':'vertical');
		
		DRAGGER.add(this.find('.toddler').bind({
			'up.dragger': callback(this, function(){
				this.trigger('change.trackbar');
				return false;
			}),
			'down.dragger': callback(this, function(){
				return false;
			}),
			'move.dragger': callback(this, function(e, info){
				var flags = this.data('flags');
				var $trackbar = this.find('>.trackbar');
				var $rail = $trackbar.find('.rail');
				var $tail = $rail.find('>.tail');
				var $toddler = $rail.find('>.toddler');
				var $value = $trackbar.find('.value');
				if (flags.direct == 'horizontal') {
					if (info.left >=0 && info.left < $rail.width()) {
						var offset = 100*info.left/$rail.width();
						$toddler.css({
							left: offset + '%'
						});
						$tail.width(offset + '%');
						$value.text(Math.ceil(offset*(flags.maxval-flags.minval)/100+flags.minval) + flags.suffix);
					}
				} else {
					if (info.top >=0 && info.top < $rail.height()) {
						info.bottom = $rail.height() - info.top - 1;
						var offset = 100*info.bottom/$rail.height();
						$toddler.css({
							bottom: offset + '%'
						});
						$tail.height(offset + '%');
						$value.text(Math.ceil(offset*(flags.maxval-flags.minval)/100+flags.minval) + flags.suffix);
					}
				}
				return false;
			})
		}));
		
		var	fieldval = function(value){
			var flags = this.data('flags');
			var $trackbar = this.find('>.trackbar');
			var $rail = $trackbar.find('.rail');
			var $tail = $rail.find('>.tail');
			var $toddler = $rail.find('>.toddler');
			var $value = $trackbar.find('.value');
			var offset = null;
			if(is.set(value)){
				if (value < flags.minval) value = flags.minval;
				if (value > flags.maxval) value = flags.maxval;
				offset = (value - flags.minval)*100/(flags.maxval - flags.minval);
				if (flags.direct == 'horizontal') {
					$toddler.css({
						left: offset + '%'
					});
					$tail.width(offset + '%');
				} else {
					$toddler.css({
						bottom: offset + '%'
					});
					$tail.height(offset + '%');
				}
				$value.text(value + flags.suffix);
				return this;
			}
			if (flags.direct == 'horizontal') {
				offset = 100*$toddler.position().left/$rail.width();
			} else {
				offset = 100*$toddler.position().bottom/$rail.height();
			}
			return Math.ceil(offset*(flags.maxval-flags.minval)/100+flags.minval);
		};
		
		fieldval.call(this, is.number(value)?value:flags.minval);

		//-----------------------------------------------------------------------
		// Расширим возможности полученных копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			fieldval: fieldval,
			flags: function(){return this.data("flags");},
			enable: function(){
				this.find('>.trackbar').removeClass('disable');
				DRAGGER.add(this.find('.toddler'));
				return this;
			},
			disable: function(){
				this.find('>.trackbar').addClass('disable');
				DRAGGER.remove(this.find('.toddler'));
				return this;
			}
		});
		return plugin(this);
	}
})();
(function(){
	var pluginComboGrid = jQuery.sub();

	// Добавим плагин Select к оригинальной копии jQuery
	jQuery.fn.lightUIComboGrid = function(flags){
		if(is.unset(flags)) flags = {};

		//-----------------------------------------------------------------------
		// Расширим возможности полученной копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		pluginComboGrid.fn.extend({
			validate: function(){
				return this.getGrid().validate();
			},
			fieldval: function(value){
				return this.getGrid().fieldval(value);
			},
			addOption: function(obj){
				var $row = this.getGrid().addRow().row("last");
				if(is("Object", obj)){
					for(var i in obj){
						$row.col(i).html(lng(obj[i])).attr("langkey", obj[i]);
					}
				}
				else{
					for(var i=0; i<arguments.length; i++){
						$col = $row.col(i);
						if($col.length){
							value = arguments[i];
							if(is.unset(value)) value = "";
							$col.html(lng(value)).attr("langkey", value);
						}
					}
				}
				return this;
			},
			cleanOptions: function(){
				this.getGrid().cleanTable();
				return this;
			},
			cleanTable: function(){
				this.getGrid().cleanTable();
				return this;
			},
			isEmpty: function(){
				return !this.find("input").val().length;
			},
			isDisabled: function(){
				return this.find("input").attr("disabled");
			},
			flags: function(){return this.data("flags");},
			clean: function(){
				this.fieldval("");
				return this;
			},
			getGrid: function(){
				return this.data("grid");
			}
		});

		var $grid = this.lightUIGrid(flags.header, 0, {
			combobox: {
				type: flags.type,
				index: flags.index,
				blank: flags.blank,
				flags: {
					maxLength: flags.maxLength,
					mandatory: flags.mandatory,
					re: flags.re
		}}});
		
		this.data("grid", $grid);

		var $obj = pluginComboGrid(this);
		this.data("light_ui_input", $obj);

		var optionArray = flags.optionArray;
		if(is.array(optionArray)){
			for(var i=0; i<optionArray.length; i++){
				var opt = optionArray[i];
				if(is.array(opt)){
					$obj.addOption.apply($obj, opt);
				}
				else{
					$obj.addOption(opt);
				}
			}
		}

		return $obj;
	}
})();
(function(){

	var plugin = jQuery.sub();

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUITextComment = function(textComment){

		var pattern	=	"<div class='title'>"
					+	"<div class='name'><div></div></div>"
					+	"</div>";

		this.addClass("lightUI textComment");
		this.html(pattern);		

		this.find(".name>div").attr("langkey", textComment);

		plugin.fn.extend({
			setTextComment: function(textComment){
				if(is.string(textComment)){
					this.find(".title>.name>div")
						.html(lng(textComment))
						.attr("langkey", textComment);
				}
				return this;
			},
		});

		return plugin(this).setTextComment(textComment);
	}
})();
(function(){

	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIButton = function(name, options){

		if(is.unset(options)) options = {};

		var pattern	=	"<div class='button normal unselectable'>";
	
		if(is.set(options.icon)){
			pattern	+=	"<div class='icon'>";
			pattern	+=	"<img src='" + options.icon + "' />";
			pattern	+=	"</div>";
		}
	
		pattern		+=	"<div class='title' unselectable='on' langkey='" + name + "'>" + lng(name) + "</div>";
		pattern		+=	"<div class='clear'></div>";
		pattern		+=	"</div>";

		this.html(pattern);
		this.addClass("lightUI");

		if(is.set(options.iconRightSide)){
			this.find(".icon").css('float', 'right');
		}

		this.find(".button").mouseenter(function(){
			$(this).not('.disable').addClass('hover');
		}).mouseleave(function(){
			$(this).not('.disable').removeClass('hover');
		}).mousedown(function(){
			$(this).not('.disable').addClass('push');
		}).mouseup(function(){
			$(this).not('.disable').removeClass('push');
		}).click(function(event){
			if(!$(this).hasClass('disable')){
				$(this).trigger("click.button");
				$(this).trigger("button.click");
			}
			event.stopPropagation();
		});	

		//-----------------------------------------------------------------------
		// Расширим возможности полученных копии новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			enable: function(){
				this.find(".button").removeClass('disable').addClass('normal');
				return this;
			},
			disable: function(){
				this.find(".button").removeClass('normal push').addClass('disable');
				return this;
			},
			title: function(name){
				if(is.string(name)){
					this.find(".title").text(lng(name));
					return this;
				}
				else{
					return this.find(".title").text();
				}
			},
			click: function(){
				this.find(".button").trigger("click");
				return this;
			}
		});
		return plugin(this);
	}
})();
(function(){

	var plugin = jQuery.sub();

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUISection = function(name, comment){

		var pattern	=	"<div class='title'>"
					+	"<div class='name'><div></div></div>"
					+	"<div class='comment' style='display: none'><div></div></div>"
					+	"</div>"
					+	"<div class='content'></div>";

		this.addClass("lightUI section");
		this.html(pattern);
		
		if(comment) this.find(".comment").show();
		

		this.find(".name>div").attr("langkey", name);
		this.find(".comment>div").attr("langkey", comment);


		plugin.fn.extend({
			setName: function(name){
				if(is.string(name)){
					this.find(".title>.name>div")
						.html(lng(name))
						.attr("langkey", name);
				}
				return this;
			},
			setComment: function(comment){
				if(is.string(comment)){
					this.find(".title>.comment>div")
						.html(lng(comment))
						.attr("langkey", comment);
					this.find(".title>.comment").show();
				}
				return this;
			},
			setContent: function(content){
				if(is.string(content)){
					this.find(".content").html(content);
				}
				return this;
			}
		});

		return plugin(this).setName(name).setComment(comment);
	}
})();

(function(){
	
	//-------------------------------------
	// Делаем копию jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();

	//-----------------------------------------------------------------------
	// Расширим возможности полученных копии новыми методами плагина (public)
	//-----------------------------------------------------------------------
	plugin.fn.extend({
		addItem: function(name, html){
			if(is.unset(html)) html = "";
			if(name.match(/^[0-9a-zA-Z]+$/)){
				var nameClass = "__iam__" + name;
			}
			else{
				var id = gID.get();
				var nameClass = "__iam__" + id;
				this.data("__iam__" + name, "__iam__" + id);
			}
			var isEmpty = !this.find("li:last").removeClass("last").length;
			if(isEmpty){
				this.append("<ul><li>" + html + "</li></ul>");
				if(this.is("li")){
					this.prepend("<div class='hitarea'></div>")
						.addClass("collapsed")
						.find(">ul").hide();

					this.find(">.hitarea").bind("click", function(event){
						if(event.target == this){
							$(this).trigger("li.toggle");
						}
					});
					this.bind("li.toggle", function(event){
						event.stopPropagation();
						$(this).lightUIList().toggleList();
					});
						
											
											
				}
				else{
					this.addClass("expanded");
				}
				this.find("li:last").addClass("last")
									.addClass(nameClass)
									.data("options", this.data("options"));
			}
			else{
				this.find("ul").append("<li>" + html + "</li>")
					.find("li:last").addClass("last")
									.addClass(nameClass)
									.data("options", this.data("options"));

			}
			return this;
		},
		childItem: function(name){
			var arr = name.split("/");
			var s = "";
			var nameClass;
			for(var i=0;i<arr.length;i++){
				nameClass = "__iam__" + arr[i];
				if(!arr[i].match(/^[0-9a-zA-Z]+$/)){
					nameClass = this.data("__iam__" + arr[i]);
				}
				s += ">ul>li." + nameClass;
			}
			
			return this.find(s).lightUIList();
		},
		parentItem: function(){
			if(this.is("li")){
				return this.parents("ul").eq(0).parent().lightUIList();
			}
			else{
				return $();
			}
		},
		expandedItem: function(){
			return this.find(">ul>li.expanded").lightUIList();
		},
		collapsedItem: function(){
			return $parent.find(">ul>li.collapsed").lightUIList();
		},
		expandList: function(){
			var $parent = this.parentItem();
			if($parent.length && this.listOptions().unique){
				$parent.expandedItem().collapseList();
			}
			this.find(">ul").show(this.listOptions().speed);
			this.removeClass("collapsed")
				.addClass("expanded");
			return this;
		},
		collapseList: function(){
			this.find(">ul").hide(this.listOptions().speed);
			this.removeClass("expanded")
				.addClass("collapsed");
			return this;
		},
		toggleList: function(){
			if(this.hasClass("expanded")){
				this.collapseList();
			}
			else{
				this.expandList();
			}
			return this;
		},
		listOptions: function(options){
			if(is.set(options)){
				this.data("options", options);
				return this;
			}
			else{
				var options = this.data("options");
				return options?options:{};
			}
		},
		cleanList: function(){
			this.unbind("li.toggle");
			this.find(".hitarea").remove();
			this.find("ul").eq(0).remove();
			return this;
		}
	});

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIList = function(options){

		var pluginInstance = this.data("lightUIList")
		if(pluginInstance) return pluginInstance;
		
		if(!this.is("li")){
			this.addClass("lightUI list");

			if(is.set(options)){
				this.data("options", options);
			}

		}

		this.bind("click", function(event){
			if(event.target == this){
				var event0 = jQuery.Event("li.click");
				event0.collapseMenu = function(){
					$(this.target).parents(".lightUI").eq(0).hide("fast");
				}
				event0.menuTarget = function(){
					return $(this.target).parents(".lightUI").data("menuTarget");
				}
				$(this).trigger(event0);
			}
		});
		
		pluginInstance = plugin(this)
		this.data("lightUIList", pluginInstance);
		
		return pluginInstance;
	}
	

	jQuery.fn.contextMenu = function(name){

		var $list = this.data("contextMenu");
		if(!is.jquery($list) && is.unset(name)){
			var id = "context_menu_" + gID.get();
			$("body").append("<div id='" + id + "'></div>");
	
			$list = $("#" + id).lightUIList({unique: true})
								.addClass("context")
								.hide();
								
			
			$list.live("mouseleave", function(event){
				event.stopPropagation();
				$(this).find(">li").lightUIList().collapseList();
			}).live("contextmenu", function(event){
				event.preventDefault();
				event.stopImmediatePropagation();
				return false;								
			}).bind("click", function(event){
				event.stopPropagation();
			}).find("li").live("mouseenter", function(event){
				event.stopPropagation();
				if($(this).is(".collapsed")){
					$(this).lightUIList()
						.expandList()
						.find(">ul").css("left", ($(this).parents("ul").eq(0).width() - 20) + "px");
				}
			}).live("mouseleave", function(event){
				if($(this).is(".expanded")){
					$(this).lightUIList()
						.collapseList();
				}
			});
			
			this.bind("contextmenu", function(event){
				event.preventDefault();
				event.stopImmediatePropagation();
				var $menu = $(this).data("contextMenu");
				if($menu.is(":hidden")){
					$menu.show("fast")
						.offset({top: event.pageY, left: event.pageX})
						.data("menuTarget", event.target);
					window.contextMenuActive = $menu;
				}
				else{
					$menu.hide("fast");
					window.contextMenuActive = null;
				}
				return false;				
			}).data("contextMenu", $list);
			
			$("body").click(function(){
				if(is.set(window.contextMenuActive)){
					window.contextMenuActive.hide("fast");
					window.contextMenuActive = null;
				}
			}).bind("contextmenu", function(event){
				if(is.set(window.contextMenuActive)){
					window.contextMenuActive.hide("fast");
					window.contextMenuActive = null;
				}
			});
				
		}
		else if(is.set(name)){
			if(is.jquery($list)){
				$list = $list.childItem(name);
			}
			else{
				$list = $();
			}
		}

		return $list;
	}
	
})();
(function(){
		
	//-------------------------------------
	// Делаем копии jQuery, используя sub()
	//-------------------------------------
	var plugin = jQuery.sub();		//для самого плагина 

	// Добавим наш плагин к оригинальной копии jQuery
	jQuery.fn.lightUIWizard = function(inx, n){
		
		var addStep = function(arg){
			if(is.string(arg)){
				var arr = arg.split(" ");
				for(var i=0; i<arr.length; i++){
					this.append(pattern)
						.find("div:last")
						.addClass(nameClass + arr[i]);
				}
			}
			else{
				this.append(pattern);
			}
			return this;
		}
		
		var addFirstStep = function(arg){
			addStep.call(this, arg);
			if(!this.getActiveStep().length){
				this.switchStep("first");
			}
			this.addStep = addStep;
			return this;
		}
		
		//-----------------------------------------------------------------------
		// Расширим возможности полученных копий новыми методами плагина (public)
		//-----------------------------------------------------------------------
		plugin.fn.extend({
			addStep: addStep = function(arg){
				if(is.string(arg)){
					var arr = arg.split(" ");
					for(var i=0; i<arr.length; i++){
						this.append(pattern)
							.find("div:last")
							.addClass(nameClass + arr[i]);
					}
				}
				else{
					this.append(pattern);
				}
				if(!this.getActiveStep().length){
					this.switchStep("first");
				}
				return this;
			},
			switchStep: function(arg, effect){
				var $cur = this.find(">div.active");
				var $next;

				if(arg == "next"){
					$next = this.getStep("next");
				}
				else if(arg == "prev"){
					$next = this.getStep("prev");
				}
				else if(arg == "last" || is.unset(arg)){
//					$next = this.find(">(div:not(.skiped)):last");
					$next = this.getStep("last");
				}
				else if(arg == "first"){
//					$next = this.find(">(div:not(.skiped)):first");
					$next = this.getStep("first")	;
				}
				else if(is.string(arg)){
					$next = this.find("." + nameClass + arg);
				}
				else if(is.number(arg)){
					$next = this.find(">div").eq(arg);
				}

				if(is.jquery($next) && $next.length){
					if(is.func(effect)){
						effect.call(this, $cur, $next);
					}
					else{
						$cur.hide().removeClass("active");
						$next.show().addClass("active");
					}
				}
				
				return this;
			},
			removeStep: function(arg){
				if(arg == "next"){
					this.getStep("next").remove();
				}
				else if(arg == "prev"){
					this.getStep("prev").remove();
				}
				else if(arg == "last" || is.unset(arg)){
					this.getStep("last").remove();
				}
				else if(arg == "first"){
					this.getStep("first").remove();
				}
				else if(is.string(arg)){
					this.find("." + nameClass + arg).remove();
				}
				else if(is.number(arg)){
					this.find(">div").eq(arg).remove();
				}
				if(!this.find(">div").length){
					this.addStep = addFirstStep;
				}
				return this;
			},
			getStep: function(arg){
				if(arg == "next"){
					var $step = this.find(">div.active").next();
					while($step.hasClass("skiped")){
						$step = $step.next();
					}
					return $step;
				}
				else if(arg == "prev"){
					var $step = this.find(">div.active").prev();
					while($step.hasClass("skiped")){
						$step = $step.prev();
					}
					return $step;
				}
				else if(arg == "last" || is.unset(arg)){
					return this.find(">div:not(.skiped):last");
				}
				else if(arg == "first"){
					return this.find(">div:not(.skiped):first");
				}
				else if(is.string(arg)){
					return this.find("." + nameClass + arg);
				}
				else if(is.number(arg)){
					return this.find(">div").eq(arg);
				}
				return $();
			},
			getStepIndex: function(arg){
				return this.getStep(arg).index();
			},
			getActiveIndex: function(){
				return this.getActiveStep().index();
			},
			getActiveStep: function(){
				return this.find(">div.active");
			},
			skipStepOn: function(arg){
				this.getStep(arg).addClass("skiped").removeClass("active").hide();
				return this;
			},
			skipStepOff: function(arg){
				this.getStep(arg).removeClass("skiped");
				return this;
			},
			isStepLast: function(arg){
				var $step = this.getStep(arg).next();
				while($step.hasClass("skiped")){
					$step = $step.next();
				}
				return !$step.length;
			},
			isStepFirst: function(arg){
				var $step = this.getStep(arg).prev();
				while($step.hasClass("skiped")){
					$step = $step.prev();
				}
				return !$step.length;
			}
		});
		
		var $plugin = plugin(this);
		
		var pattern = "<div style='display: none'></div>";
		var nameClass = "__iam__";
		
		if(is.number(n)){
			var n0 = this.find(">div").length;
			if(n0 < n){
				for(var i=0; i<(n-n0); i++){
					$plugin.addStep();
				}
			}
		}				
		
		if(is.set(inx)){
			$plugin.switchStep(inx);
		}
		else{
			if(!$plugin.getActiveStep().length){
				$plugin.switchStep("first");
			}
		}

		return $plugin;
	}

})();

function node(options){

	this.options = options?options:{};

	node.prototype.add = function(obj, alias, arg3){
		this.children.push(obj);
		obj.parent = this;
		obj.root = this.root;
		if(alias){
			this.childrenRefs[alias] = obj;
		}
		if(is.set(arg3)){
			this.locate(this.children.length - 1, arg3);
		}
		return this;
	}

	node.prototype.child = function(i){
		if(is.number(i)){
			return getChild.call(this, i);
		}
		else if(is.string(i)){
			var arr = i.split("/");
			var begin = 0;
			var obj = this;
			if(!arr[0].length){
				begin = 1;
				obj = this.root;
			}
			var num, item;
			for(var ii=begin;ii<arr.length;ii++){
				item = arr[ii];
				num = Number(item);
				if(num.toString() == arr[ii]){
					obj = getChild.call(obj, num);
				}
				else if(item == ".."){
					obj = obj.parent;
				}
				else{
					obj = getChild.call(obj, arr[ii]);
				}
			}
			return obj;
		}
		return null;
	}
	
	node.prototype.get = node.prototype.child;
	
	node.prototype.setAlias = function(i, alias){
		this.childrenRefs[alias] = this.child(i);
		return this;
	}
	
	node.prototype.getAlias = function(){
		var brothers = this.parent.childrenRefs;
		for(var i in brothers){
			if(brothers[i] === this){
				return i;
			}
		}
		return null;
	}
	
	node.prototype.replace = function(i, obj){
		if(is.number(i)){
			var child = this.children[i];
			var parent = this;
			for(var j in this.childrenRefs){
				if(this.childrenRefs[j] == child){
					this.childrenRefs[j] = obj;
					break;
				}
			}
			this.children[i] = obj;
		}
		else if(is.string(i)){
			var child = this.get(i);
			var parent = child.get("..");
			var alias = child.getAlias();
			for(var j in parent.children){
				if(child == parent.children[j]){
					parent.children[j] = obj;
					break;
				}
			}
			parent.childrenRefs[alias] = obj;
		}
		if(obj instanceof node && child instanceof node){
			obj.parent = parent;
			obj.boxid = child.boxid;
			
			if(child.$box.isRendered()){
				obj.locate(child.$outerBox).deep.updateView();
			}
		}			
		return this;
	}

	node.prototype.set = function(obj, i, arg3){
		if(is.set(this.get(i))){
			this.replace(i, obj);
		}
		else if(is.string(i)){
			this.add(obj, i, arg3);
		}
		return this;
	}
	
	node.prototype.index = function(){
		var arr = this.parent.children;
		for(var i=0; i<arr.length; i++){
			if(arr[i] == this){
				return i;
			}
		}
		return -1;
	}
	
	node.prototype.emit = function(arg){
		if(is.object(arg)){
			var status = arg;
			status.target = this;
			var type = status.type;
		}
		else{
			var type = arg;
			var status = {
				target: this,
				type: type,
				bubbling: true
			}
		}
		if(is.set(type)){
			var event = this.events[type];
			var args = [status];
			args = args.concat(Array.prototype.slice.call(arguments, 1));
			callHandlers.apply(this, args);
		}
		return this;
	}
	
	node.prototype.bind = function(typeList, handler){
		if(is.unset(typeList)) return this;
		var arr = typeList.split(" ");
		for(var i=0; i<arr.length; i++){
			var type = arr[i];
			if(!is.object(this.events[type])){
				var event = this.events[type] = {};
				event.handlers = [];
			}
			this.events[type].handlers.push(handler);
		}
		return this;
	}
	
	node.prototype.unbind = function(type, handler){
		if(is.string(type)){
			if(is.func(handler)){
				var event = this.events[type];
				for(var i in event.handlers){
					if(event.handlers[i] == handler){
						event.handlers[i] = null;
						break;
					}
				}
			}
			else{
				delete this.events[type];
			}
		}
		else{
			this.events = {};
		}
		return this;
	}

	node.prototype.listen = function(path, type, handler){
		var callback = context(this).callback(handler);
		this.listeners.push({handler: handler, callback: callback});
		this.get(path).bind(type, callback);
		return this;
	}

	node.prototype.unbindListener = function(path, type, handler){
		var listeners = this.listeners;
		var obj;
		for(var i in listeners){
			obj = listeners[i];
			if(is.set(obj) && obj.handler == handler){
				this.get(path).unbind(type, obj.callback);
				delete obj;
				break;
			}
		}
	}
	
	node.prototype.updateView = function(phase){
		if(phase == "forward"){

			if(!this.$outerBox.isRendered()){
				if(this.parent && this.parent.$box.length){
					var $pbox = this.parent.$box;
				}
				else{
					var $pbox = $("body");
				}
				this.$outerBox = $pbox.append("<div class='nodebox'></div>").find("div.nodebox:last");
			}
			
			var id = this.$outerBox.attr("id");
			if(is.set(id) && id.length){
				this.boxid = this.$outerBox.attr("id");
			}
			else{
				this.$outerBox.attr("id", this.id);
			}
			
			this.$outerBox.html("<div class='nodecontent'></div>");
			if(!this.$buttonBar.isRendered()){
				this.$outerBox.append("<div class='buttonbar' id='" + this.boxid + "ButtonBar'></div>");
				this.$buttonBar = $("#" + this.boxid + "ButtonBar");
			}

			if(!this.parent) this.$outerBox.data("rootNode", this).attr("rootNode", "yes");
			
			//Текущий бокс для содержимого. Он может быть перезаписан производным классом
			this.$box = this.$innerBox = this.$outerBox.find(">.nodecontent");

			if(this.options.hidden) this.hide();
			
		}
		return this;
	};
	
	node.prototype.toHTML = function(){
		if(!this.$box.isRendered()){
			this.deep.updateView();
		}
		return "<div class='nodebox'>" + this.$outerBox.html() + "</div>";
	}
	
	node.prototype.jQuery = function(i){
		if(is.set(i)){
			return this.child(i).$box;
		}
		else{
			return this.$box;
		}
	}
	
	node.prototype.locate = function(arg1, arg2){
		if(is.set(arg2)){
			if(is.number(arg1) || is.string(arg1)){
				if(is.jquery(arg2)){
					this.child(arg1).$outerBox = arg2;
				}
				else if(is.string(arg2)){
					this.child(arg1).$outerBox = this.$box.find(arg2);
				}
				
			}
			else if(is.object(arg1)){
				for(var i in arg1){
					if(is.jquery(arg2)){
						this.child(i).$outerBox = arg1[i];
					}
					else if(is.string(arg2)){
						this.child(i).$outerBox = this.$box.find(arg1[i]);
					}
				}
			}
		}
		else{
			if(is.jquery(arg1)){
				this.$outerBox = arg1;
			}
			else if(is.string(arg1)){
				this.$outerBox = $(arg1);
			}
		}
		return this;
	}
	
	node.prototype.addButton = function(name, options){
		var $buttonBar = this.$buttonBar;
		if(is.jquery($buttonBar)){
			this.buttons[name] = $buttonBar.append("<div class='buttonbox'></div>")
											.find("div.buttonbox:last")
											.lightUIButton(name, options);
		}
		return this;
	}
	
	node.prototype.getButton = function(name){
		return this.buttons[name];
	}
	
	node.prototype.cleanButtonBar = function(){
		this.buttons = [];
		this.$buttonBar.find("*").remove();
		return this;
	}

	node.prototype.initForm = function(){
		this.children = [];
		this.childrenRefs = {};
		return this;
	}

	node.prototype.startForm = node.prototype.initForm;
	
	node.prototype.endForm = function(){
		var child;
		for(var i=0; i<this.children.length; i++){
			child = this.get(i);
			child.emit({type: "endform", bubbling: false}, child.val());
		}
		return this;
	}
		
	node.prototype.buttonBar = function($obj){
		if(is.jquery($obj)){
			this.$buttonBar = $obj;
			return this;
		}
		else{
			return this.$buttonBar;
		}
	}
	
	node.prototype.hide = function(){
		this.options.hidden = true;
		this.$outerBox.hide();
		return this;
	}

	node.prototype.show = function(){
		this.options.hidden = false;
		this.$outerBox.show();
		return this;
	}
	
	node.prototype.nchild = function(){
		return this.children.length;
	}

	node.prototype.self = this;
	
	node.prototype.val = function(){};
	
	this.jq = null;
	this.model = {};
	this.s = null;
	this.parent = null;
	this.events = {};
	this.listeners = [];
	this.bubbling = true;
	this.$box = this.$outerBox = this.$innerBox = $();
	this.boxid = gID.get();	//id DOM объекта (может отличаться от this.id если заданный this.$box уже имеет id)
	this.id = this.boxid;	//id объекта
	this.buttons = {};
	this.$buttonBar = $();
	this.root = this;
	
	this.initForm();
	
	var callHandlers = function(status){
		var event = this.events[status.type];
		if(is.object(event)){
			for(var i in event.handlers){
				if(is.func(event.handlers[i])){
					event.handlers[i].apply(this, arguments);
				}
			}
		}
		if(status.bubbling){
			if(this.parent instanceof node) callHandlers.apply(this.parent, arguments);
		}
	}
	
	var getChild = function(i){
		if(is.number(i)){
			return this.children[i];
		}
		else if(is.string(i)){
			return this.childrenRefs[i];
		}
		return null;
	}
	
	
	this.deep = function(methodName, arg1){
		var method = this[methodName];
		method = is.func(method)?method:function(){};
		
		if(is.object(arg1)){
			var status = arg1;
			var phase = status.phase?status.phase:"back"
		}
		else if(is.string(arg1)){
			var phase = arg1;
			var status = arg1 = {phase: phase};
		}
		else{
			var phase = "back";
			var status = arg1 = {phase: phase};
		}

		var methodArgs = Array.prototype.slice.call(arguments, 2).concat([status]);
		switch(phase){
			case "both":
				method.apply(this, ["forward"].concat(methodArgs));
				if(!status.stop){
					this.deepInner.apply(this, arguments);
					method.apply(this, ["back"].concat(methodArgs));
				}
			break;
			case "forward":
				method.apply(this, methodArgs);
				if(!status.stop){
					this.deepInner.apply(this, arguments);
				}
			break;
			case "back":
				this.deepInner.apply(this, arguments);
				method.apply(this, methodArgs);
			break;
		}
		return this;
	}

	this.deepInner = function(){
		var args = arguments;
		this.each(function(i, child){
			child.deep.apply(child, args);
		});
		return this;
	}
	
	this.each = function(c){
		if(is.func(c)){
			for(var i in this.children){
				c(i, this.child(i));
			}
		}
		else if(is.string(c)){
			var methodArgs = Array.prototype.slice.call(arguments, 1);
			var child, method;
			for(var i in this.children){
				child = this.child(i);
				method = child[c];
				if(is.func(method)) method.apply(child, methodArgs);
			}
		}
		return this;
	}
	
	var ext = node.extensions;
	for(var i in ext){
		for(var j in ext[i]){
			this[i][j] = ext[i][j];
			this[i].self = this;
		}
	}
};

node.extensions = {};
node.extendMethod = function(methodName, extName, extension){
	var ext = node.extensions;
	if(!is.object(ext[methodName])) ext[methodName] = {};
	ext[methodName][extName] = extension;
} 

node.extendMethod("deep", "updateModel", function(status){
	var status = {error: false, nodes: []};
	this.self.deep("updateModel", "back", status);
	return !status.error;
});
node.extendMethod("deep", "updateView", function($box){
	if(is.jquery($box)) this.self.$outerBox = $box;
	return this.self.deep("updateView", "both");
});

function nodeInputBase(name, value, options){
	this.value = value;
	this.name = name;	
	nodeInputBase.superclass.constructor.call(this, options);
	

	this.enable = function(){
		var options = this.options;
		if(is.unset(options.accessMode) || options.accessMode != 4){
			options.disabled = false;
			if(this.pluginEdit) this.pluginEdit.enable();
		}
		return this;
	}
	
	this.disable = function(){
		this.options.disabled = true;
		if(this.pluginEdit) this.pluginEdit.disable();
		return this;
	}
	
	this.show = function(){
		var options = this.options;
		if(is.unset(options.accessMode) || options.accessMode != 0){
			nodeInputBase.superclass.show.call(this);
		}
		return this;
	}
	
	this.isDisabled	 = function(){
		return this.pluginEdit.isDisabled();
	}
	
	this.setError = function(message){
		this.pluginEdit.setError(message);
		return this;
	}
	
	this.cleanError = function(){
		this.pluginEdit.cleanError();
		return this;
	}
	
	this.setComment = function(message){
		this.options.comment = message;
		if(this.$box.isRendered()){
			this.pluginEdit.setComment(message);
		}
		return this;
	}
	
	this.cleanComment = function(){
		delete this.options.comment;
		if(this.$box.isRendered()){
			this.pluginEdit.cleanComment();
		}
		return this;
	}
	
	this.label = function(name){
		if(is.set(name)){
			if(this.$box.isRendered()){
				this.pluginEdit.label(name);
			}
			else{
				this.name = name;
			}
		}
		else{
			if(this.$box.isRendered()){
				return this.pluginEdit.label();
			}
			else{
				return this.name;
			}
		}
		return this;
	}

	this.bind("fieldchange", function(){
		//this.valXSS();
		this.modified = (this.value != this.val());
	});
	
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.val());
		return this;
	}

// временно не используем функцию, ломает уходилку со страниц
	//~ this.valXSS = function() {
		//~ var str = this.val();
		//~ if (is.string(str)) {
			//~ str = str.replace(/</g,"&lt;");
			//~ str = str.replace(/>/g,"&gt;");
			//~ this.val(str);
		//~ }
		//~ return null;
	//~ }
	
	this.mandatory = function(value){
		if(is.set(value)){
			if(this.pluginEdit)	this.pluginEdit.mandatory(value);
			this.options.mandatory = value;
			return this;
		}
		else{
			return this.options.mandatory;
		}
	}
	
	nodeInputBase.prototype.toString = function(){
		var value = this.val();
		if(this.isDisabled()){
			return "[<span langkey='notreq'>" + lng("notreq") + "</span>]";
		}
		else{
			if((is.string(value) && value != "") || (!is.string(value) && is.set(value))){
				return value;
			}
			else{
				return "[<span langkey='notspec'>" + lng("notspec") + "</span>]";
			}
		}
	}
	
	nodeInputBase.prototype.getSummary = function($box){
		var $summary = $();
		var options = this.options;
		var disabled = this.isDisabled();
		if(!$box || options.forceSummary || (this.modified && !this.options.password && !disabled && !options.hidden)){
			var $obj = $("<div></div>").html(this.toHTML());
			$obj.find(".edit").removeClass("editDisabled");
			var value = this.toString();
			var $input = $obj.find(".input").addClass("static").html(value);
			$obj.find(".mandatory").remove();
			$obj.find(".comment").hide();
			$summary = $obj;
			if(is.jquery($box)) $box.append($summary);
		}
		return $summary;
	}
	
	nodeInputBase.prototype.applyAttrs = function(value){
		function toDefaultMode(){
			delete this.options.accessMode;
			if(!this.options.disabled) this.enable();
			if(!this.options.hidden) this.show();
		}

		try{
			var mode = this.options.accessMode = value.__attrs__.mode;
			switch(mode){
				case 4:
					if(this.pluginEdit) this.pluginEdit.disable();
				break;
				case 0:
					this.$outerBox.hide();
				break;
				default:
					toDefaultMode.call(this);
				break;
			}
		}
		catch(e){
			toDefaultMode.call(this);
		}
	}
	
	nodeInputBase.prototype.isModified = function(status){
		if(this.$box.isRendered()
			&& !this.isDisabled()
			&& this.$box.is(":visible")
			&& !this.isEqual(this.value, this.val())){

			status.modified = true;
			status.nodes.push(this);
		}
	}
	
	nodeInputBase.prototype.isEqual = function(value1, value2){
		if(is.number(value1)) value1 = value1.toString();
		if(is.number(value2)) value2 = value2.toString();
		if(is.unset(value1) || value1 == "") value1 = null;
		if(is.unset(value2) || value2 == "") value2 = null;
		return value1 == value2;
	}
	
}
extend(nodeInputBase, node);

node.extendMethod("deep", "isModified", function(status){
	var status = {modified: false, nodes: []};
	this.self.deep("isModified", "back", status);
//	if(status.modified){
//		for(var i=0; i< status.nodes.length; i++){
//			debug(status.nodes[i], "; value = ", status.nodes[i].value, "; val() = ", status.nodes[i].val());
//		}
//	}
	return status.modified;
});

function nodeInput(name, value, options){
	nodeInput.superclass.constructor.call(this, name, value,  options);

	this.bindEvents = function(){
		this.pluginInput.find("input").bind("change", context(this).callback(function(event){
			this.pluginEdit.cleanError();
			this.fieldchange();
			event.stopPropagation();
			return true;
		}));
		this.pluginInput.bind("error.input", context(this).callback(function(event, errorCode){
			this.pluginEdit.setError(errorCode);
		}));
		this.pluginInput.bind("onfocus.input", context(this).callback(function(event){
			this.pluginEdit.cleanError();
		}));
		return this;
	}
	
	nodeInput.prototype.val = function(value){
		if(is.set(value)){
			this.applyAttrs(value);
			if(this.pluginInput){
				this.pluginInput.fieldval(value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginInput){
				return this.pluginInput.fieldval();
			}
			else{
				return this.value;
			}
		}
	}
	
	this.updateModel = function(status){

		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")){
			return;
		}

		var errorCode;
		if(this.options.mandatory){
			errorCode = this.pluginInput.isEmpty()?"fieldEmpty":null;
		}
		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}
		else{
			this.value = this.val();
		}
		return this;
	}

	this.validate = function(){
		this.pluginInput.flags().re = this.options.re;
		var errorCode = this.pluginInput.validate();
		if(errorCode){
			this.pluginEdit.setError(errorCode);
		}
		else{
			this.pluginEdit.cleanError();
		}
		return errorCode;
	}
	
}
extend(nodeInput, nodeInputBase);

function nodeip(name, value, options){
	nodeip.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodeip.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			var version = options.version;
			switch(version){
				case 46:
					this.pluginInput = this.pluginEdit.find(".input").lightUIIPv4IPv6({mandatory: options.mandatory, maxLength: 43, re: options.re});
				break;
				case 6:
					this.pluginInput = this.pluginEdit.find(".input").lightUIIPv6({mandatory: options.mandatory, maxLength: 43, re: options.re});
				break;
				case 4:
				default:
					this.pluginInput = this.pluginEdit.find(".input").lightUIIPv4({mandatory: options.mandatory, maxLength: 18, re: options.re});
				break;			
			}
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}
		
		return this;
	}
		
	this.setVersion = function(version){
		this.options.version = version;
		value = this.val();
		this.updateView("forward");
		return this;
	}

}
extend(nodeip, nodeInput);

function nodemac(name, value, options){
	nodemac.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodemac.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUIMAC({mandatory: options.mandatory, maxLength: 17, re: options.re});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}

		return this;
	}
}
extend(nodemac, nodeInput);

function nodeDomainName(name, value, options){
	nodeDomainName.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodeDomainName.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUIDomainName({mandatory: options.mandatory, re: options.re, isip: options.isip, ipv6: options.ipv6});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}
		
		return this;
	}
}
extend(nodeDomainName, nodeInput);

function nodetext(name, value, options){
	nodetext.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodetext.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUIText({mandatory: options.mandatory, password: options.password, re: options.re, maxLength: options.maxLength});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}

		return this;
	}
}
extend(nodetext, nodeInput);

function nodestatic(name, value, options){
	nodestatic.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodestatic.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory, re: options.re});
			this.pluginInput = this.pluginEdit.find(".input").lightUIStatic();
			if(options.translate){
				this.pluginEdit.find(".input").html(lng(this.value)).attr("langkey", this.value);
			}
			else{
				this.pluginEdit.find(".input").html(this.value);
			}
			
			if(options.disabled) this.disable();
		}

		return this;
	}
	
	this.isModified = function(){};

/*	this.val = function(value){
		if(is.set(value)){
			if(this.pluginEdit){
				this.pluginEdit.find(".input").html(value);
			}
			else{
				this.value = value;
			}
			return this;
		}
		else{
			if(this.pluginEdit){
				return this.pluginEdit.find(".input").html();;
			}
			else{
				return this.value;
			}
		}
	}
	
	this.updateModel = function(status){
		return this;
	}
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.pluginEdit.find(".input").html());
		return this;
	}

	this.validate = function(){
		return this;
	}*/
}
extend(nodestatic, nodeInput);

function nodenum(name, value, options){
	nodenum.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodenum.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUINumber({mandatory: options.mandatory, minval: options.minval, maxval: options.maxval, re: options.re});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}

		return this;
	}
	
	this.val = function(value){
		if(is.set(value)){
			return nodenum.superclass.val.call(this, (new Number(value)).valueOf());
		}
		else{
			return nodenum.superclass.val.call(this)
		}
	}
	
	this.minval = function(value){
		if(is.set(value)){
			this.options.minval = value;
			if(this.$box.isRendered()){
				this.pluginInput.flags().minval = value;
			}
			return this;
		}
		else{
			return this.options.minval;
		}
	}
	
	this.maxval = function(value){
		if(is.set(value)){
			this.options.maxval = value;
			if(this.$box.isRendered()){
				this.pluginInput.flags().maxval = value;
			}
			return this;
		}
		else{
			return this.options.maxval;
		}
	}

}
extend(nodenum, nodeInput);

function nodeport(name, value, options){
	nodeport.superclass.constructor.apply(this, arguments);
	
	this.updateView = function(phase){
		nodemac.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUIPort({mandatory: options.mandatory, re: options.re, isRange: options.isRange, isSeveral: options.isSeveral, use_ports: options.use_ports});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}

		return this;
	}
}
extend(nodeport, nodeInput);

function nodeportold(name, value, options){
	nodeport.superclass.constructor.apply(this, arguments);

	this.updateView = function(phase){
		nodemac.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput = this.pluginEdit.find(".input").lightUIPortOld({mandatory: options.mandatory, re: options.re, isRange: options.isRange, isSeveral: options.isSeveral});
			this.val(this.value);
			this.bindEvents();
			if(options.disabled) this.disable();
		}

		return this;
	}
}
extend(nodeportold, nodeInput);

(function(){
	jQuery.fn.isModified = function(){
		var $obj = this.find("[rootnode]")
		var modified = false;
		for(var i=0; i<$obj.length; i++){
			if($obj.eq(i).data("rootNode").deep.isModified()){
				modified = true;
				break;
			}
		}
		return modified;
	}
	return this;
})();
function nodeCheckBox(name, value, options){
	nodeCheckBox.superclass.constructor.call(this, name, value, options);
	
	this.updateView = function(phase){
		nodeCheckBox.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory, altname: options.optionName});
			this.pluginInput = this.pluginEdit.find(".input").lightUICheckbox();
				
			this.pluginInput.bind("change", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange();
				event.stopPropagation();
				return true;
			}));

			this.val(this.value);
			if(options.disabled) this.disable();
		}

		return this;
	}
	
	this.val = function(value){
		if(is.set(value)){
			this.applyAttrs(value);
			if(this.pluginInput){
				this.pluginInput.fieldval(value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginInput){
				return this.pluginInput.fieldval();
			}
			else{
				return this.value;
			}
		}
	}
	
	this.toString = function(){
		return this.val()?"[<span langkey='yes'>" + lng("yes") + "</span>]":"[<span langkey='no'>" + lng("no") + "</span>]";
	}
	
	this.updateModel = function(status){
		this.value = this.val();
	}	
}
extend(nodeCheckBox, nodeInputBase);


function nodeComboGrid(name, value, options){
	nodeComboGrid.superclass.constructor.call(this, name, value, options);
	
	this.bindEvents = function(){
		if(is.string(this.options.blank)){
/*			this.pluginCombo.bind("unfocus.input enter.input tab.input", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));*/
			this.pluginCombo.find("input").bind("change", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));
			this.pluginCombo.bind("rowclick.grid", context(this).callback(function(event, $row){
				this.pluginEdit.cleanError();
				this.emit("ruleselect", $row);
				event.stopPropagation();
				return true;
			}));
		}
		else{
/*			this.pluginCombo.bind("unfocus.input enter.input tab.input rowclick.grid", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));*/
			this.pluginCombo.find("input").bind("change", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange()
				event.stopPropagation();
				return true;
			}));
		}
		this.pluginCombo.bind("error.input", context(this).callback(function(event, errorCode){
			this.pluginEdit.setError(errorCode);
		}));
		this.pluginCombo.bind("onfocus.input", context(this).callback(function(event){
			this.pluginEdit.cleanError();
		}));
		return this;
	}

	nodeComboGrid.prototype.updateView = function(phase){
		nodeComboGrid.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			var $input = this.pluginEdit.find(".input");
			var flags = {header: options.header, type: options.type, index: options.index, blank: options.blank, optionArray: options.optionArray,
							flags: {maxLength: options.maxLength, mandatory: options.mandatory, re: options.re}};
			this.pluginCombo = $input.lightUIComboGrid(flags);
			this.pluginCombo.find(".icon").css("display", "none");

			this.bindEvents();
			
			this.val(this.value);
			if(options.disabled) this.disable();
		}
		return this;
	}
	
	this.val = function(value){
		if(is.set(value)){
			this.applyAttrs(value);
			if(this.pluginCombo){
				this.pluginCombo.fieldval(value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginCombo){
				return this.pluginCombo.fieldval();
			}
			else{
				return this.value;
			}
		}
	}
	
	nodeComboGrid.prototype.addRow = function( header ){		
		var options = this.options;
		
		if(is('Object', header)){
			options.optionArray.push(header);
		}

		if(this.pluginCombo){
			this.pluginCombo.addOption.apply(this.pluginCombo, arguments);
		}
		
		return this;
	}
	
	nodeComboGrid.prototype.cleanRows = function(){
		this.pluginCombo.cleanTable();
		return this;
	}
	
	nodeComboGrid.prototype.updateModel = function(status){

		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")) return;

		var errorCode;
		if(this.options.mandatory){
			errorCode = this.pluginCombo.isEmpty()?"fieldEmpty":null;
		}
		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}
		else{
			this.value = this.val();
		}
		return this;
	}
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.pluginCombo.fieldval());
		return this;
	}
	
	this.validate = function(){
		this.pluginCombo.flags().re = this.options.re;
		var errorCode = this.pluginCombo.validate();
		if(errorCode){
			this.pluginEdit.setError(errorCode);
		}
		else{
			this.pluginEdit.cleanError();
		}
		return errorCode;
	}		

	this.isModified = function(){
		if(!this.options.blank) nodeComboGrid.superclass.isModified.apply(this, arguments);
	}
	
	if(!options.optionArray) options.optionArray = [];
}
extend(nodeComboGrid, nodeInputBase);

function nodeComboIP(name, value, options){
	
	this.setVersion = function(version){
		if (version) {
			var ver = new String(version)
			options.type = "";
			for (var i = 0; i < ver.length; i++) {
				options.type = options.type + "ipv" + ver.charAt(i);
			}
		} else {
			options.type = "ipv4";
		}
		value = this.val();
		this.updateView("forward");
		return this;
	}

	if(is.unset(options)) options = {};
	
	if (options.version) {
		var ver = new String(options.version)
		options.type = "";
		for (var i = 0; i < ver.length; i++) {
			options.type = options.type + "ipv" + ver.charAt(i);
		}
	} else {
		options.type = "ipv4";
	}
	
	delete options.version;
	
	
	options.index = "ip";

	nodeComboIP.superclass.constructor.call(this, name, value, options);
}
extend(nodeComboIP, nodeComboGrid);

function nodeComboMAC(name, value, options){
	if(is.unset(options)) options = {};
	options.type = "mac";
	options.index = "mac";
	nodeComboMAC.superclass.constructor.call(this, name, value, options);
	
	nodeComboMAC.prototype.updateView = function(phase){
		nodeComboMAC.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var userip = this.options.userip;
			if(is.set(userip)){
				this.pluginCombo
					.addClass("node-combo-mac")
					.bind("iconclick.grid", context(this).callback(function(){
						var $grid = this.pluginCombo;
						var userip = this.options.userip;
						var $row;
						for(var i=0; i<$grid.nrow(); i++){
							$row = $grid.row(i);
							if($row.col("ip").html() == userip){
								this.val($row.col("mac").html());
								break;
							}
						}
					}))
					.find(".icon")
					.show()
					.html("<span></span>")
					.find("span")
					.html(lng("clonemac"))
					.attr("langkey", "clonemac");
					
				this.pluginCombo
					.bind("iconResetclick.grid", context(this).callback(function(){
						var $grid = this.pluginCombo;
						var userip = this.options.userip;
						var $row;
						for(var i=0; i<$grid.nrow(); i++){
							$row = $grid.row(i);
							if($row.col("ip").html() == userip){
								this.val($row.col("mac").html());
								break;
							}
						}
					}))
					.find(".iconReset")
					.show()
					.html("<span></span>")
					.find("span")
					.html(lng("cloneMACReset"))
					.attr("langkey", "cloneMACReset");
			}
		}
		return this;
	}

	this.addRow = function(){
		nodeComboMAC.superclass.addRow.apply(this, arguments);
		
		if(this.pluginCombo){
			var $grid = this.pluginCombo.getGrid();
			var $span = $grid.find(".icon span");
			if($span.is(":hidden")){
				if($grid.row("last").col("ip").html() == this.options.userip){
					$span.show();
				}
			}
		}

		return this;
	}
	
	this.cleanRows = function(){
		nodeComboMAC.superclass.cleanRows.apply(this, arguments);
		this.pluginCombo.find(".icon span").hide();
		return this;
	}
	
}
extend(nodeComboMAC, nodeComboGrid);

function nodeComboHost(name, value, options){
	if(is.unset(options)) options = {};
	options.type = "host";
	options.index = "host";
	nodeComboHost.superclass.constructor.call(this, name, value, options);
}
extend(nodeComboHost, nodeComboGrid);

function nodeComboText(name, value, options){
	if(is.unset(options)) options = {};
	options.type = "text";
	nodeComboText.superclass.constructor.call(this, name, value, options);
}
extend(nodeComboText, nodeComboGrid);
function nodeSelect(name, value, options){
	nodeSelect.superclass.constructor.call(this, name, value, options);
	
	nodeSelect.prototype.updateView = function(phase){
		nodeSelect.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.pluginInput  = this.pluginEdit.find(".input").lightUISelect({size: options.size, multiple: options.multiple, optionArray: options.optionArray, options: options.options, manualCorrection: options.manualCorrection});
				
			this.pluginInput.bind("change", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.fieldchange();
				event.stopPropagation();
				return true;
			}));

			this.correctValue();
			
			this.val(this.value);
			if(options.disabled) this.disable();
		}

		return this;
	}
	
	this.val = function(value){
		if(is.set(value)){
			this.applyAttrs(value);
			if(this.pluginInput){
				this.pluginInput.fieldval(value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginInput){
				return this.pluginInput.fieldval();
			}
			else{
				return this.value;
			}
		}
	}
	
	this.toString = function(){
		var value = this.val();
		var alias = value;
		var options = this.options.options;
		if(options){
			for(var i in options){
				if(options[i] == value){
					alias = i;
					break;
				}
			}
		}
		return "<span langkey='" + alias + "'>" + lng(alias) + "</span>";
	}
	
	this.addOption = function(name, value){
		if(is.unset(value)) value = name;
		if(is.unset(this.value)) this.value = value;
		
		var options = this.options;
		options.options[name] = value;
		options.optionArray.push({name: name, value: value});
		
		if(this.pluginInput){
			this.pluginInput.addOption(name, value);
		}
		return this;
	}
	
	this.cleanOptions = function(){
		this.options.options = {};
		this.options.optionArray = [];
		if(this.pluginInput){
			this.pluginInput.cleanOptions();
		}
		return this;
	}

	this.correctValue = function(){
		var options = this.options;
		var isInList = false;
		var defValue;
		var optionArray = options.optionArray;
		var optionObject = options.options;
		var value = this.value;
		if(optionArray && optionArray.length){
			defValue = optionArray[0].value;
			for(var i=0; i<optionArray.length; i++){
				if(value == optionArray[i].value){
					isInList = true;
					break;
				}
			}
		}
		else if(optionObject){
			var j = 0;
			for(var i in optionObject){
				if(!j++) defValue = optionObject[i];
				if(value == optionObject[i]){
					isInList = true;
					break;
				}
			}
		}
		if(!isInList && is.set(defValue)) this.val(defValue);

		return this;
	}
		
	this.updateModel = function(status){
		this.value = this.val();
	}	

	this.isModified = function(status){
		if(this.$box.isRendered()
			&& !this.isDisabled()
			&& this.$box.is(":visible")){
				
			var optionArray = this.options.optionArray;
			for(var i=0; i<optionArray.length; i++){
				if(this.isEqual(this.value, optionArray[i].value)){
					if(!this.isEqual(this.value, this.val())){
						status.modified = true;
						status.nodes.push(this);
					}
					return;
				}
			}
		}
	}

	this.bind("fieldchange", this.onfieldchange);

	
	var options = this.options;
	var opt;
	if(!options.options) options.options = {};
	if(options.optionArray){
		for(var i=0; i<options.optionArray.length; i++){
			opt = options.optionArray[i];
			options.options[opt.name] = opt.value?opt.value:opt.name;
//			this.addOption(opt.name, opt.value);
		}
	}
	else{
		options.optionArray = [];
		for(var i in options.options){
			opt = options.options[i];
			options.optionArray.push({name: opt.name, value: opt.value?opt.value:opt.name});
//			this.addOption(i, options.options[i]);
		}
	}
		
}
extend(nodeSelect, nodeInputBase);


function nodemask(name, value, options){
	if(is.unset(options)) options = {};
	options.manualCorrection = true;
	nodemask.superclass.constructor.apply(this, arguments);

	this.bind("endform", function(){
		var ipath = this.options.bind;
		this.listen(ipath, "fieldchange", function(status, value){
			var version = status.target.options.version;

			// IPv4 Only 
			if(is.set(version) && version != 4) return;
			
			function getClass(ip){
				if (is.unset(ip)) return null;
				if (ip.indexOf('.') > 0) {
					var classX = parseInt(ip.substring(0, ip.indexOf('.')));
				
					if (classX >= 1 && classX <= 126) {
						return 'A';
					}
					if (classX >= 128 && classX <= 191) {
						return 'B';
					}
					if (classX >= 192 && classX <= 223) {
						return 'C';
					}
					if (classX >= 224 && classX <= 239) {
						return 'D';
					}
					if (classX >= 240 && classX <= 247) {
						return 'E';
					}
					return null;
				}
			}

			this.setClass(getClass(value));
		}).get(ipath).fieldchange();
	});
	
	this.setClass = function(ipClass){
		
		var oldValue = this.val();
		
		switch(ipClass){
			case 'A':
				this.cleanMasks()
					.addClass('A');
				if($.browser.msie && this.pluginInput){
					this.pluginInput.updateSelect();
				}
				if(this.checkMask(oldValue)){
					this.val(oldValue);
				}
				else{
					this.val('255.0.0.0');
				}
			break;
			case 'B':
				this.cleanMasks()
					.addClass('B');
				if($.browser.msie && this.pluginInput){
					this.pluginInput.updateSelect();
				}
				if(this.checkMask(oldValue)){
					this.val(oldValue);
				}
				else{
					this.val('255.255.0.0');
				}
			break;
			case 'C':
				this.cleanMasks()
					.addClass('C');
				if($.browser.msie && this.pluginInput){
					this.pluginInput.updateSelect();
				}
				if(this.checkMask(oldValue)){
					this.val(oldValue);
				}
				else{
					this.val('255.255.255.0');
				}
			break;
			default:
				this.cleanMasks()
					.addClass('A')
					.addClass('B')
					.addClass('C')
				if($.browser.msie && this.pluginInput){
					this.pluginInput.updateSelect();
				}
				if(this.checkMask(oldValue)){
					this.val(oldValue);
				}
				else{
					this.val('255.255.255.0');
				}
		}
		this.ipClass = ipClass;
		return this;
	}

	this.addMask = function(mask){
		this.addOption(mask);
		this.maskCheckList[mask] = true;
		return this;
	}

	this.cleanMasks = function(){
		this.maskCheckList = {};
		this.cleanOptions();
		return this;
	}

	this.addClass = function(ipClass){
		switch(ipClass){
			case 'A':
				this.addMask('255.0.0.0')
					.addMask('254.0.0.0')
					.addMask('252.0.0.0')
					.addMask('248.0.0.0')
					.addMask('240.0.0.0')
					.addMask('224.0.0.0')
					.addMask('192.0.0.0')
					.addMask('128.0.0.0');
			break;
			case 'B':
				this.addMask('255.255.0.0')
					.addMask('255.254.0.0')
					.addMask('255.252.0.0')
					.addMask('255.248.0.0')
					.addMask('255.240.0.0')
					.addMask('255.224.0.0')
					.addMask('255.192.0.0')
					.addMask('255.128.0.0');
			break;
			case 'C':
				this.addMask('255.255.255.255')
					.addMask('255.255.255.254')
					.addMask('255.255.255.252')
					.addMask('255.255.255.248')
					.addMask('255.255.255.240')
					.addMask('255.255.255.224')
					.addMask('255.255.255.192')
					.addMask('255.255.255.128')
					.addMask('255.255.255.0')
					.addMask('255.255.254.0')
					.addMask('255.255.252.0')
					.addMask('255.255.248.0')
					.addMask('255.255.240.0')
					.addMask('255.255.224.0')
					.addMask('255.255.192.0')
					.addMask('255.255.128.0');
			break;
		}
		return this;
	}
	
	this.checkMask = function(value){
		return this.maskCheckList[value]
	}
	
	this.maskCheckList = {};
	
}
extend(nodemask, nodeSelect);

function nodeTextArea(name, value, options){
	nodeTextArea.superclass.constructor.call(this, name, value, options);
	
	this.updateView = function(phase){
		nodeTextArea.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			var $textarea = this.pluginEdit.find(".input").html("<textarea></textarea>").find("textarea");
			if(is.set(options.cols)){
				$textarea.attr("cols", options.cols);
			}
			if(is.set(options.rows)){
				$textarea.attr("rows", options.rows);
			}
			if(is.set(options.readonly)){
				$textarea.attr("readonly", options.readonly);
			}
				
			$textarea.bind("change", context(this).callback(function(event){
				var errorCode = this.validate();
				if(errorCode){
					this.pluginEdit.setError(errorCode);
				}
				else{
					this.pluginEdit.cleanError();
					this.fieldchange();
				}
				event.stopPropagation();
				return true;
			}));

			this.val(this.value);
			if(options.disabled) this.disable();
		}
		return this;
	}
	
	this.val = function(value){
		var $textarea = this.$box.find("textarea");
		if(is.set(value)){
			this.applyAttrs(value);
			if($textarea.length){
				$textarea.val(value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginEdit){
				return $textarea.val();
			}
			else{
				return this.value;
			}
		}
	}
	
	this.isEmpty = function(){
		return !this.val().length;
	}
	
	this.validate = function(){
		var errorCode = null;
		var re = this.options.re;
		var validater;
		var value = this.val();
		if(is.array(re)){
			for(var i=0; i<re.length; i++){
				validater = re[i];
				if(is.func(validater)){
					errorCode = validater(value);
					if(errorCode){
						break;
					}
				}
			}
		}
		else if(is.func(re)){
			errorCode = re(value);
		}
		if(errorCode){
			this.pluginEdit.setError(errorCode);
		}
		else{
			this.pluginEdit.cleanError(errorCode);
		}
		return errorCode;
	}		

	this.updateModel = function(status){

		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")) return;

		var errorCode = (this.options.mandatory && this.isEmpty())?"fieldEmpty":null;

		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}
		else{
			this.value = this.val();
		}

		return this;
	}
	
	this.toString = function(){
		var value = this.val();
		if(is.set(value)){
			return value.replace('\n', ',');
		}
		else{
			return nodeTextArea.superclass.toString.call(this);
		}
				
	}
}
extend(nodeTextArea, nodeInputBase);

function nodeCaption(name, comment){
	this.name = name;
	this.comment = comment;
	nodeCaption.superclass.constructor.call(this);
	
	this.updateView = function(phase){
		nodeCaption.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			this.pluginSection = this.$innerBox.lightUISection(this.name, this.comment);
			this.$box = this.pluginSection.find(".content");
		}

		return this;
	}

	this.setName = function(name){
		this.name = name;
		if(this.pluginSection){
			this.pluginSection.setName(name);
		}
		return this;
	}

	this.setContent = function(value){
		if(this.pluginSection){
			this.pluginSection.setContent(value);
		}
		return this;
	}

	this.setComment = function(value){
		this.comment = value;
		if(this.pluginSection){
			this.pluginSection.setComment(value);
		}
		return this;
	}
}
extend(nodeCaption, node);

function nodeComment(textComment){
	this.textComment = textComment;
	nodeComment.superclass.constructor.call(this);

	this.updateView = function(phase){
		nodeComment.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			this.pluginTextComment = this.$innerBox.lightUITextComment(this.textComment);
		}

		return this;
	}

	this.setTextComment = function(textComment){
		this.textComment = textComment;
		if(this.pluginTextComment){
			this.pluginTextComment.setTextComment(textComment);
		}
		return this;
	}
}
extend(nodeComment, node);



function nodeUpload(name, action, filename, options){
	
	if(is.unset(options)) options = {};
	
	this.name = name;
	this.action = action;
	this.filename = filename;
	this.options = options;

	nodeUpload.superclass.constructor.call(this, options);
	
	this.$upload = null;
	
	this.updateView = function(phase){
		nodeUpload.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.$upload = this.pluginEdit.find(".input").lightUIUpload(this.action, this.filename, options).bind({
				'begin.upload': callback(this, function(){
					this.emit("uploading", this.val());
				}),
				'end.upload': callback(this, function(e, data){
					this.emit("uploaded", this.val(), data);
				}),
				'change.upload': callback(this, function(){
					this.fieldchange();
				}),
				'break.upload': callback(this, function(){
					this.emit("cancel", this.val());
				})
			});

			if(options.disabled) this.disable();
		}
		return this;
	}
	
	this.val = function(value){
		if(this.$upload){
			return this.$upload.find("form input[type='file']").val();
		}
		else{
			return "";
		}
	}
	
	this.isEmpty = function(){
		return !this.val().length;
	}
	
	this.validate = function(){
		var errorCode = null;
		var re = this.options.re;
		var validater;
		var value = this.val();
		if(is.array(re)){
			for(var i=0; i<re.length; i++){
				validater = re[i];
				if(is.func(validater)){
					errorCode = validater(value);
					if(errorCode){
						break;
					}
				}
			}
		}
		else if(is.func(re)){
			errorCode = re(value);
		}
		if(errorCode){
			this.pluginEdit.setError(errorCode);
		}
		else{
			this.pluginEdit.cleanError(errorCode);
		}
		return errorCode;
	}		

	this.updateModel = function(status){

		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")) return;

		var errorCode = (this.options.mandatory && this.isEmpty())?"fieldEmpty":null;

		if(is.unset(errorCode)){
			errorCode = this.validate();
		}
		if(is.set(errorCode)){
			this.pluginEdit.setError(errorCode);
			status.error = true;
			status.nodes.push(this);
		}

		return this;
	}
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.val());
		return this;
	}
	
	this.upload = function(){
		this.$upload.upload();
		return this;
	}
	
	this.cancel = function(){
		this.$upload.cancel();
		return this;
	}
	
	this.clear = function(){
		this.$upload.clear();
		return this;
	}

	this.enable = function(){
		this.options.disabled = false;
		if(this.pluginEdit) this.pluginEdit.enable();
		if(this.$upload) this.$upload.enable();
		return this;
	}
	
	this.disable = function(){
		this.options.disabled = true;
		if(this.pluginEdit) this.pluginEdit.disable();
		if(this.$upload) this.$upload.disable();
		return this;
	}
	
	this.isDisabled	 = function(){
		return this.pluginEdit.isDisabled();
	}
	
	this.setError = function(message){
		this.pluginEdit.setError(message);
		return this;
	}
	
	this.cleanError = function(){
		this.pluginEdit.cleanError();
		return this;
	}
	
	this.setComment = function(message){
		this.options.comment = message;
		this.pluginEdit.setComment(message);
		return this;
	}
	
	this.cleanComment = function(){
		delete this.options.comment;
		this.pluginEdit.cleanComment();
		return this;
	}
	
	this.label = function(name){
		if(is.set(name)) this.name = name;
		return this.pluginEdit.label(name);
	}

	this.onfieldchange = function(){
		this.modified = true;
	}
	
	this.mandatory = function(value){
		if(is.set(value)){
			if(this.pluginEdit)	this.pluginEdit.mandatory(value);
			this.options.mandatory = value;
			return this;
		}
		else{
			return this.options.mandatory;
		}
	}
	
	this.bind("fieldchange", this.onfieldchange);
}
extend(nodeUpload, node);
function nodeRadioBox(name, value, options){
	nodeRadioBox.superclass.constructor.call(this, name, value, options);

	this.updateView = function(phase){
		nodeRadioBox.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory, altname: options.optionName});
			var $input = this.pluginEdit.find(".input").html("<input type='radio' name='" + options.groupName + "' value='" + options.optionValue + "'/>").find("input");
				
			$input.bind("change", context(this).callback(function(event){
				this.pluginEdit.cleanError();
				this.emit("fieldchange", this.val());
				event.stopPropagation();
				return true;
			}));

			this.val(this.value);
			if(options.disabled) this.disable();
		}

		return this;
	}
	
	this.val = function(value){
		var $input = this.$box.find("input");
		if(is.bool(value)){
			this.applyAttrs(value);
			if($input.length){
				$input.attr("checked", value);
			}
			this.value = value;
			return this;
		}
		else{
			if(this.pluginEdit){
				return $input.attr("checked")?true:false;
			}
			else{
				return this.value;
			}
		}
	}
	
	this.optionValue = function(value){
		var $input = this.$box.find("input");		
		if(is.set(value)){
			$input.attr("value", value);
			return this;
		}
		else{			
			if(this.pluginEdit && $input.attr("value")){
				return $input.attr("value");
			}
			else{
				return this.options.optionValue;
			}
		}
	}
	
	this.updateModel = function(status){
		this.value = this.val();
	}	
	
}
extend(nodeRadioBox, nodeInputBase);



function nodeOptionsBase(name, options){
	nodeOptionsBase.superclass.constructor.call(this, name, null, options);
	if(!this.options.options) this.options.options = {};
	options = this.options;
	
	this.updateView = function(phase){
		nodeOptionsBase.superclass.updateView.call(this, phase);
		
		if(phase == "forward"){
			this.$box.addClass("node-options");
		}
	}
	
	this.cleanOptions = function(){
		this.initForm();
		if(this.$box.isRendered()){
			this.deep.updateView();
		}
		return this;
	}

	this.enable = function(){
		for(var i=0; i<this.nchild(); i++){
			this.child(i).enable();
		}
		return this;
	}
	
	this.disable = function(){
		for(var i=0; i<this.nchild(); i++){
			this.child(i).disable();
		}
		return this;
	}
	
	this.isDisabled	 = function(){
		var child0 = this.child(0);
		if(child0) return child0.isDisabled();
		return false;
	}
	
	this.setError = function(message){
		return this;
	}
	
	this.cleanError = function(){
		return this;
	}
	
	this.setComment = function(message){
		return this;
	}
	
	this.cleanComment = function(){
		return this;
	}
	
	this.label = function(name){
		var child0 = this.child(0);
		if(child0) child0.label(name);
		return this;
	}
	
	delete this.isModified;

	this.name = name;
	this.options = options;
	
	var arr = options.options;
	if(is.array(arr)){
		for(var i=0; i<arr.length; i++){
			this.addOption(arr[i].name, arr[i].value, arr[i].checked, arr[i].comment);
		}
	}
	
}
extend(nodeOptionsBase, nodeInputBase);

function nodeOptions(name){
	
	this.addOption = function(name, value, checked, comment){
		var label = null;
		if(!this.nchild()){
			var label = this.name;
		}
		this.add(new nodeCheckBox(label, checked, {optionName: name, comment: comment}), name);
		// if(this.$box.isRendered()){
		// 	this.child(this.nchild() - 1).deep.updateView();
		// }
		return this;
	}

	if(is.array(arguments[1])){
		var options = {
			options: arguments[1]
		};
	}
	else if(is.object(arguments[1])){
		var options = arguments[1];
	}
	else if(is.object(arguments[2])){
		var options = arguments[2];
	}
	
	nodeOptions.superclass.constructor.call(this, name, options);
	
	this.val = function(value){
		if(is.set(value)){
			return this;
		}
		else{
			return null;
		}
	}
	
	this.toString = function(){
		var child, name;
		var str = "";
		var delim = "";
		for(var i=0; i<this.children.length; i++){
			child = this.get(i);
			name = child.options.optionName;
			if(child.val()){
				str += delim + "<span langkey='" + name + "'>" + lng(name) + "</span>";
				delim = ",";
			}
		}
		return str;
	}
}
extend(nodeOptions, nodeOptionsBase);

function nodeOptionsRadio(name, value, options){
	
	this.addOption = function(name, value, checked, comment){
		var label = null;
		if(!this.nchild()){
			var label = this.name;
			if(is.unset(this.value)){
				this.value = value;
				checked = true;
			}
		}
		if(checked){
			this.value = value;
		}
		else if(this.value == value){
			checked = true;
		}
			
		this.add(new nodeRadioBox(label, checked, {optionName: name, groupName: this.groupName, optionValue: value, comment: comment}), value);

		this.listen(value, "fieldchange", function(status){
			status.bubbling = false;
			this.emit("fieldchange", status.target.options.optionValue);
		});

		// if(this.$box.isRendered()){
		// 	this.child(this.nchild() - 1).deep.updateView();
		// }
		return this;
	}

	if(name){
		this.groupName = name;
	}
	else{
		this.groupName = gID.get();
	}

	nodeOptionsRadio.superclass.constructor.call(this, name, options);
	
	this.val = function(value){
		if(is.set(value)){
			this.applyAttrs(value);
			var child;
			for(var i=0; i<this.nchild(); i++){
				child = this.child(i);
				if(child.optionValue() == value){
					this.value = value;
					child.val(true);
				}
				else{
					child.val(false);
				}
			}
			return this;
		}
		else{
			var child;
			for(var i=0; i<this.nchild(); i++){
				child = this.child(i);
				if(child.val()){
					return child.optionValue();
					break;
				}
			}
			return null;
		}
	}

	
	this.toString = function(){
		var child;
		var str = "";
		for(var i=0; i<this.children.length; i++){
			var child = this.get(i);
			var name = child.options.optionName;
			if(child.val()) return "<span langkey='" + name + "'>" + lng(name) + "</span>";
		}
		return "";
	}

	
	this.updateModel = function(status){
		this.value = this.val();
	}	

	this.value = value;
}
extend(nodeOptionsRadio, nodeOptionsBase);
function nodeStepWizard(){
	nodeStepWizard.superclass.constructor.call(this);

	nodeStepWizard.prototype.updateView = function(phase, status){
		nodeStepWizard.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			status.stop = true;
			if(is.set(this.lastActiveInx)){
				this.switchStep(this.lastActiveInx);
			}
			else{
				this.switchStep("first");
			}
		}
		return this;
	}

	nodeStepWizard.prototype.addStep = function(obj, alias){
		this.add(obj, alias);
		return this;
	}
	
	nodeStepWizard.prototype.removeStep = function(arg){
		this.skipStepOn(arg);
		return this;
	}
	
	nodeStepWizard.prototype.switchStep = function(arg){
		var step = this.getStep(arg);
		if(step) step.deep.updateView(this.$box);
			
		return this;
	}
	
	nodeStepWizard.prototype.getStep = function(arg){		
		var step;
		
		function seekForward(inx){
			do{
				step = this.get(inx++);
			}
			while(step && step.options.skip)
			return step;
		}
		
		function seekBackward(inx){
			do{
				step = this.get(inx--);
			}
			while(step && step.options.skip)
			return step;
		}
		
		if(arg == "next"){
			return seekForward.call(this, this.getActiveIndex() + 1);
		}
		else if(arg == "prev"){
			return seekBackward.call(this, this.getActiveIndex() - 1);
		}
		else if(arg == "last"){
			return seekBackward.call(this, this.children.length - 1);
		}
		else if(arg == "first"){
			return seekForward.call(this, 0);
		}
		else if(arg == "active" || is.unset(arg)){
			return this.getActiveStep();
		}
		else if(is.string(arg) || is.number(arg)){
			return this.get(arg);
		}
		
		return null;
	}
	
	nodeStepWizard.prototype.getActiveIndex = function(){
		var i;
		for(var i=0; i<this.children.length; i++){
			if(this.get(i).$box.isRendered()) break;
		}
		this.lastActiveInx = i;

		return i;
	}

	nodeStepWizard.prototype.getActiveStep = function(){
		return this.get(this.getActiveIndex());;
	}
	
	nodeStepWizard.prototype.skipStepOn = function(arg){
		this.getStep(arg).options.skip = true;
		return this;
	}
	
	nodeStepWizard.prototype.skipStepOff = function(arg){
		delete this.getStep(arg).options.skip;
		return this;
	}
	
	nodeStepWizard.prototype.isStepFirst = function(inx){
		return this.getStep("first") == this.getStep(inx);
	}
	
	nodeStepWizard.prototype.isStepLast = function(inx){
		return this.getStep("last") == this.getStep(inx);
	}

	function __next(stepDone, inx, __return){
		if(!is.func(__return)) __return = function(){};
		function __stepUp(__return){
			this.switchStep("next");
			if(is.func(this.doAfter)) this.doAfter(this.getActiveStep(), callbackEx(this, __return, true));
			else __return(true);
		}
		
		if(!stepDone && !this.isStepLast(inx)){
			if(is.func(this.doBefore)) this.doBefore(this.getActiveStep(), callbackEx(this, __stepUp, __return));
			else __stepUp.call(this, __return)
		}
		else{
			if(is.func(__return)) __return(stepDone);
		}
		return this;
	}

	function __previous(stepDone, inx, __return){
		if(!is.func(__return)) __return = function(){};
		if(!stepDone && !this.isStepFirst(inx)){
			this.switchStep("prev");
			if(is.func(this.doAfter)) this.doAfter(this.getActiveStep(), callbackEx(this, __return, true));
			else __return(true);
		}
		else{
			__return(stepDone);
		}
		return this;
	}

	function __doStep(method, __return){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(step instanceof nodeStepWizard){
			__doStep.call(step, method, callbackEx(this, method, inx, __return));
		}
		else method.call(this, false, inx, __return);
		
		return this;
	}
	
	//Логика такая: методы doBefore и doAfter исполняются только теми мастерами которые реально делают шаг
	//Вложенные и родительские мастера doBefore и doAfter не испольняют

	nodeStepWizard.prototype.next = function(__return){
		return __doStep.call(this, __next, __return);
	}

	nodeStepWizard.prototype.previous = function(__return){
		return __doStep.call(this, __previous, __return);
	}

	nodeStepWizard.prototype.checkNext = function(){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(!this.isStepLast(inx)){
			return true;
		}
		else{
			if(step instanceof nodeStepWizard){
				return step.checkNext();
			}
			else{
				return false;
			}
		}
	}

	nodeStepWizard.prototype.checkPrevious = function(){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(!this.isStepFirst(inx)){
			return true;
		}
		else{
			if(step instanceof nodeStepWizard){
				return step.checkPrevious();
			}
			else{
				return false;
			}
		}
	}

	this.activeIndex = 0;
}
extend(nodeStepWizard, node);

//deprecated class

function nodeWizard(){
	nodeWizard.superclass.constructor.call(this);

	nodeWizard.prototype.updateView = function(phase){
		nodeWizard.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			var child;
			this.pluginWizard = this.$box.lightUIWizard();
			for(var i=0; i<this.children.length; i++){
				child = this.child(i)
				child.$outerBox = this.pluginWizard.addStep(this.child(i).getAlias()).getStep(i);
				if(child.options.skip) this.pluginWizard.skipStepOn(i);
			}
		}
		return this;
	}

	nodeWizard.prototype.addStep = function(obj, alias){
		this.add(obj, alias);
		if(is.jquery(this.pluginWizard)){
			var $obj = this.pluginWizard.addStep(alias).getStep(alias);
			if(is.set(alias)){
				this.child(alias).$outerBox = $obj;
				this.child(alias).deep.updateView();
			}
			else{
				this.child(this.children.length-1).$outerBox = $obj;
				this.child(this.children.length-1).deep.updateView();
			}
		}
		return this;
	}
	
	nodeWizard.prototype.removeStep = function(arg){
		this.pluginWizard.removeStep(arg);
		for(var i=0; i<this.children.length; i++){
			if(!this.jQuery(i).length){
				this.replace(i);
			}
		}
		return this;
	}
	
	nodeWizard.prototype.switchStep = function(arg){
		this.pluginWizard.switchStep(arg);
		return this;
	}
	
	nodeWizard.prototype.getActiveIndex = function(){
		return this.pluginWizard.getActiveIndex();
	}

	nodeWizard.prototype.getActiveStep = function(){
		var inx = this.getActiveIndex();
		return this.get(inx);
	}
	
	nodeWizard.prototype.skipStepOn = function(arg){
		var step = this.get(arg);
		var index = step.index();
		step.options.skip = true;
		if(is.jquery(this.pluginWizard)) this.pluginWizard.skipStepOn(index);
		return this;
	}
	
	nodeWizard.prototype.skipStepOff = function(arg){
		var step = this.get(arg);
		var index = step.index();
		delete step.options.skip;
		if(is.jquery(this.pluginWizard)) this.pluginWizard.skipStepOff(index);
		return this;
	}
	
	function __next(stepDone, inx, __return){
		if(!is.func(__return)) __return = function(){};
		function __stepUp(__return){
			this.switchStep("next");
			if(is.func(this.doAfter)) this.doAfter(this.getActiveStep(), callbackEx(this, __return, true));
			else __return(true);
		}
		
		if(!stepDone && !this.pluginWizard.isStepLast(inx)){
			if(is.func(this.doBefore)) this.doBefore(this.getActiveStep(), callbackEx(this, __stepUp, __return));
			else __stepUp.call(this, __return)
		}
		else{
			if(is.func(__return)) __return(stepDone);
		}
		return this;
	}

	function __previous(stepDone, inx, __return){
		if(!is.func(__return)) __return = function(){};
		if(!stepDone && !this.pluginWizard.isStepFirst(inx)){
			this.switchStep("prev");
			if(is.func(this.doAfter)) this.doAfter(this.getActiveStep(), callbackEx(this, __return, true));
			else __return(true);
		}
		else{
			__return(stepDone);
		}
		return this;
	}

	function __doStep(method, __return){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(step instanceof nodeWizard){
			__doStep.call(step, method, callbackEx(this, method, inx, __return));
		}
		else method.call(this, false, inx, __return);
		
		return this;
	}
	
	//Логика такая: методы doBefore и doAfter исполняются только теми мастерами которые реально делают шаг
	//Вложенные и родительские мастера doBefore и doAfter не испольняют

	nodeWizard.prototype.next = function(__return){
		return __doStep.call(this, __next, __return);
	}

	nodeWizard.prototype.previous = function(__return){
		return __doStep.call(this, __previous, __return);
	}

	nodeWizard.prototype.checkNext = function(){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(!this.pluginWizard.isStepLast(inx)){
			return true;
		}
		else{
			if(step instanceof nodeWizard){
				return step.checkNext();
			}
			else{
				return false;
			}
		}
	}

	nodeWizard.prototype.checkPrevious = function(){
		var inx = this.getActiveIndex();
		var step = this.get(inx);

		if(!this.pluginWizard.isStepFirst(inx)){
			return true;
		}
		else{
			if(step instanceof nodeWizard){
				return step.checkPrevious();
			}
			else{
				return false;
			}
		}
	}

	this.activeIndex = 0;
}
extend(nodeWizard, node);




function nodeTrackbar(name, value, options){
	
	if(is.unset(options)) options = {};
	
	this.name = name;
	this.options = options;

	nodeTrackbar.superclass.constructor.call(this, options);
	
	this.$trackbar = null;
	
	this.updateView = function(phase){
		nodeTrackbar.superclass.updateView.apply(this, arguments);

		if(phase == "forward"){
			var options = this.options;
			this.pluginEdit = this.$box.lightUIEdit(this.name, options.comment, {mandatory: options.mandatory});
			this.$trackbar = this.pluginEdit.find(".input").lightUITrackbar(value, options).bind({
				'change.trackbar': callback(this, function(){
					this.fieldchange();
				})
			});

			if(options.disabled) this.disable();
		}
		return this;
	}
	
	this.val = function(value){
		if (is.set(value)) {
			this.applyAttrs(value);
			this.$trackbar.fieldval(value);
			return this;
		}
		return this.$trackbar.fieldval();
	}		

	this.updateModel = function(status){
		if(this.pluginEdit.isDisabled() || this.pluginEdit.is(":hidden")) return;
		return this;
	}
	
	this.fieldchange = function(){
		this.emit("fieldchange", this.val());
		return this;
	}

	this.enable = function(){
		this.options.disabled = false;
		if(this.pluginEdit) this.pluginEdit.enable();
		if(this.$trackbar) this.$trackbar.enable();
		return this;
	}
	
	this.disable = function(){
		this.options.disabled = true;
		if(this.pluginEdit) this.pluginEdit.disable();
		if(this.$trackbar) this.$trackbar.disable();
		return this;
	}
	
	this.isDisabled	 = function(){
		return this.pluginEdit.isDisabled();
	}
	
	this.setComment = function(message){
		this.options.comment = message;
		this.pluginEdit.setComment(message);
		return this;
	}
	
	this.cleanComment = function(){
		delete this.options.comment;
		this.pluginEdit.cleanComment();
		return this;
	}
	
	this.label = function(name){
		if(is.set(name)) this.name = name;
		return this.pluginEdit.label(name);
	}

	this.onfieldchange = function(){
		this.modified = true;
	}
	
	this.bind("fieldchange", this.onfieldchange);
}
extend(nodeTrackbar, nodeInputBase);
//})(window);
