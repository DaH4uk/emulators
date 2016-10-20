# Эмуляторы
Проект для Дом.ru. Эмуляторы веб-интерфейсов роутеров.
# Создание эмуляторов #
Я использовал 3 способа создания эмуляторов:

1. ##  Если для текущей Linux/Mac машины доступен веб-интерфейс роутера через http/https: ##

    **Загружаем каждую html страницу со всеми ресурсами, используя команду wget.**
      Я лично использовал ключи wget -r -k -l 5 -p -E -nc -np, где 
       * r - ходим по ссылкам (рекурсивное скачивание)
       * k - преобразовываем ссылки к локальному виду
       * p - скачивание ресурсов необходимых для отображения html-страницы (стили, картинки и т.д.)
       * l - глубина скачивания, 0 - бесконечная вложенность ссылок
       * nc - не перезаписывать существующие файлы
       * np - не подниматься выше начального адреса при рекурсивной загрузке
       
    **Проверяем, все ли верно загрузилось, местами правим ссылки и верстку вручную**
       
2. ## Если на текущей Linux/Mac машине не доступен веб-интерфейс роутера, или его не удается скачать через wget :##

    Я использовал этот метод, когда веб-интерфейс доступен только через прокси, или когда роутер подключен через другой ПК.
    
    **Сохраняем страницу через браузер (CTRL+S или правой кнопкой на странице -> Сохранить как...)**
    
    **Добавляем в проект и правим ссылки на ресурсы и верстку.**
    
3. ## Если веб-интерфейс роутера генерируется динамически с помощью js ##

   **Сохраняем страницу через браузер (CTRL+S или правой кнопкой на странице -> Сохранить как...)**
   
   **Правим ссылки на ресурсы**
   
   **Разбираемся в исходном коде и правим его под себя**
   
   
#Создание интерактивного мануала#

Здесь я использовал js библиотеку intro.js (http://introjs.com/)
Я загрузил библиотеку в главную директорию проекта и указал ссылки на ресурсы в готовом мануале:

```
	<!--Необходимо подключить jQuery-->
	<script src="/js/jquery.min.js"></script>
  
	<!--Импортируем тему-->
	<link rel="stylesheet" type="text/css" href="/intro/themes/introjs-nassim.css">
  
	<!--Импортируем стили-->
	<link rel="stylesheet" type="text/css" href="/intro/introjs.css">
  
	<!--Сам introjs-->
	<script type="text/javascript" src="/intro/intro.js"></script>
```
Сам JS:
```
		$(function() {
			//Создаем ссылку на IntroJS
			var introguide = introJs();
			//Переводим кнопки Далее, Назад и пропустить
			introguide.setOption('nextLabel', 'Далее &rarr;').start();
			introguide.setOption('prevLabel', '&larr; Назад').start();
			introguide.setOption('skipLabel', 'Пропустить').start();

			//Переименовываем кнопку Done (она нас переводи на следующую страницу) и вешаем слушателя, который переводит нас на следующую страницу с get параметром manual, значением true.
			introguide.setOption('doneLabel', 'Следующая страница').start().oncomplete(function() {
				window.location.href = 'wan_poe.htm?manual=true';
			});


			//Здесь мы указываем шаги, по которым будем переходить. 
			//element - стандартный селектор, где можно выбирать элемент по id (#) или по классу (.), все как в css.
			//intro - Текст, который будет выводиться в теле intro, можно использовать html-разметку.
			//position - Позиция, где будет выводиться подсказка (top, right, bottom, left).
			introguide.setOptions({
				steps: [{
						element: '#topnavon',
						intro: 'В верхнем меню выбираем раздел <b>Setup</b>.',
						position: 'bottom'
					}, {
						element: '#sidenavoff',
						intro: "В левом меню выбираем <b>Internet</b>",
						position: 'right'
					}, {
						element: '#button2',
						intro: 'В центре нажимаем кнопку <b>Manual Internet Connection Setup</b>',
						position: 'top'
					}

				]
			});
			
			//Здесь описана функция получения параметра из url.
			var getUrlParameter = function getUrlParameter(sParam) {
				var sPageURL = decodeURIComponent(window.location.search.substring(1)),
					sURLVariables = sPageURL.split('&'),
					sParameterName,
					i;

				for (i = 0; i < sURLVariables.length; i++) {
					sParameterName = sURLVariables[i].split('=');

					if (sParameterName[0] === sParam) {
						return sParameterName[1] === undefined ? true : sParameterName[1];
					}
				}
			};
			
			//Проверяем, если значения параметра manual = true, то запускаем introjs.
			if (getUrlParameter('manual') == 'true') {
				introguide.start();
			};

		});
```



