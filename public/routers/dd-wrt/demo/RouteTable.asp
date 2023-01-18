<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=iso-8859-1" />
		<link rel="icon" href="images/favicon.ico" type="image/x-icon" />
		<link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
		<script type="text/javascript" src="common.js"></script>
		<script type="text/javascript" src="lang_pack/english.js"></script>
		<script type="text/javascript" src="lang_pack/language.js"></script>
		<link type="text/css" rel="stylesheet" href="style/elegant/style.css" />
		<!--[if IE]><link type="text/css" rel="stylesheet" href="style/elegant/style_ie.css" /><![endif]-->
		<script type="text/javascript" src="js/prototype.js"></script>
		<script type="text/javascript" src="js/effects.js"></script>
		<script type="text/javascript" src="js/window.js"></script>
		<script type="text/javascript" src="js/window_effects.js"></script>
		<link type="text/css" rel="stylesheet" href="style/pwc/default.css" />
		<link type="text/css" rel="stylesheet" href="style/pwc/ddwrt.css" />
		<title>DD-WRT (build 16562) - Routing Table</title>

</head>
<body>
<form>
<h2><script type="text/javascript">Capture(routetbl.h2)</script></h2>
<table>
<tr>
<th><script type="text/javascript">Capture(routetbl.th1)</script></th>
<th><script type="text/javascript">Capture(share.subnet)</script></th>
<th><script type="text/javascript">Capture(share.gateway)</script></th>
<th><script type="text/javascript">Capture(share.intrface)</script></th>
</tr>
<script type="text/javascript">
//<![CDATA[
var table = new Array( '10.88.193.1','255.255.255.255','10.88.193.1','WAN'
,'195.227.105.178','255.255.255.255','10.88.193.1','WAN'
,'10.88.193.0','255.255.255.0','0.0.0.0','WAN'
,'172.16.1.0','255.255.255.0','0.0.0.0','LAN'
,'169.254.0.0','255.255.0.0','0.0.0.0','LAN'
//,'127.0.0.0','255.0.0.0','0.0.0.0','lo'
);

if(table.length == 0) {
document.write("<tr><td align=\"center\" colspan=\"4\">- " + share.none + " -</td></tr>");
} else {
for(var i = 0; i < table.length; i = i+4) {
if(table[i+3] == "LAN")
table[i+3] = "LAN &amp; WLAN";
else if(table[i+3] == "WAN")
table[i+3] = "WAN";
document.write("<tr><td>"+table[i]+"</td><td>"+table[i+1]+"</td><td>"+table[i+2]+"</td><td>"+table[i+3]+"</td></tr>");
}
}
//]]>
</script>
</table><br />
<div class="submitFooter">
<script type="text/javascript">
//<![CDATA[
submitFooterButton(0,0,0,0,1,1);
//]]>
</script>
</div>
</form>
</body>
</html>