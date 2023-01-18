/*---- Ajax相关函数-----*/
var Ajax =
{
getInstance : function(_url,_queryString,_recvType,_resultFunc, _errorFunc)
{
this.url = _url;
this.queryString = _queryString;
this.xmlHttp = Ajax.createXmlHttp();
if (this.xmlHttp == null) {
alert("getInstance faied!");
return null;
}
var _objxml = this.xmlHttp;
_objxml.onreadystatechange = function (){Ajax.handleStateChange(_objxml,_recvType,_resultFunc,_errorFunc)};
return this;
},
createXmlHttp : function()
{
var _xmlHttp = null;
try {
_xmlHttp = new ActiveXObject('Msxml2.XMLHTTP'); // Internet Explorer 6
} catch(e) {
try {
_xmlHttp = new ActiveXObject('Microsoft.XMLHTTP'); // Internet Explorer 5.5
} catch(e) {
try {
_xmlHttp = new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari
} catch(e) {
alert('Create XMLHttpRequest failture!');
}
}
}
return _xmlHttp;
},
handleStateChange : function (_xmlHttp,_recvType,_resultFunc, _errorFunc)
{
if (_xmlHttp.readyState == 4)
{
if (_xmlHttp.status == 200) {
_resultFunc(_recvType?_xmlHttp.responseXML:_xmlHttp.responseText);
} else {
if( _errorFunc == undefined)
{
alert("Ooccured unexpected error on requested page!"
+ " status=" + _xmlHttp.status
+ ", statusText=" + _xmlHttp.statusText
+ ", responseText=" + _xmlHttp.responseText);
}
else
{
_errorFunc(_xmlHttp.status);
}
}
}
},
createRequestBody : function(_objForm)
{
var arrParams=new Array();
for(var i=0;i<_objForm.elements.length;i++)
{
var strParam = encodeURIComponent(_objForm.elements[i].name);
strParam += "=";
strParam += encodeURIComponent(_objForm.elements[i].value);
arrParams.push(strParam);
}
return arrParams.join("&");
},
get : function()
{
var _url = this.url;
if(_url.indexOf('?') == -1)
_url += '@timestamp=' + new Date().getTime();
else
_url += "&timestamp=" + new Date().getTime();
if(this.queryString.length > 0)
_url += "&" + this.queryString;
this.xmlHttp.open("GET", _url, true);
this.xmlHttp.send(null);
},
post : function(_objForm)
{
var _url = this.url;
if(_url.indexOf('?') == -1)
_url += '@timestamp=' + new Date().getTime();
else
_url += "&timestamp=" + new Date().getTime();
this.xmlHttp.open("POST", _url, true);
this.xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
this.xmlHttp.send(Ajax.createRequestBody(_objForm));
},
abort : function()
{
this.xmlHttp.onreadystatechange = function(){};
this.xmlHttp.abort();
this.xmlHttp.onreadystatechange = function (){Ajax.handleStateChange(_objxml,_recvType,_resultFunc,_errorFunc)};
}
}
var Xml = {
loadDoc : function(_xmlPath)
{
var _xmlDoc = null;
try{
_xmlDoc = new ActiveXObject("Microsoft.XMLDOM"); //Internet Explorer
} catch(e) {
try {
_xmlDoc = document.implementation.createDocument("","",null);//Firefox, Mozilla, Opera, etc.
}catch(e) {
alert(e.message);
}
}
try {
_xmlDoc.async=false;
_xmlDoc.load(_xmlPath);
} catch(e) {
alert(e.message);
}
return _xmlDoc;
},
loadString : function(_xmlString)
{
var _xmlDoc = null;
try {
_xmlDoc=new ActiveXObject("Microsoft.XMLDOM");//Internet Explorer
_xmlDoc.async="false";
_xmlDoc.loadXML(_xmlString);
} catch(e) {
try
{
parser=new DOMParser(); //Firefox, Mozilla, Opera, etc.
_xmlDoc=parser.parseFromString(_xmlString,"text/xml");
} catch(e) {
alert(e.message);
}
}
return _xmlDoc;
}
}
