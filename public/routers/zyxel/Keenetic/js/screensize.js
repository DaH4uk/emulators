rs();window.onresize=function(){rs()};function rs(){$("#content").css("height",(screenSize().height-227+"px"));if(screenSize().width>800){var A=0.5*(screenSize().width-830);$(".logger").css("right",((-A)+"px"));if(A>285){$(".logger").css("width",((A-35)+"px"))}}$("#log_pane").css("height",(screenSize().height-440+"px"))}function screenSize(){var A,B;A=(window.innerWidth?window.innerWidth:(document.documentElement.clientWidth?document.documentElement.clientWidth:document.body.offsetWidth));B=(window.innerHeight?window.innerHeight:(document.documentElement.clientHeight?document.documentElement.clientHeight:document.body.offsetHeight));return{width:A,height:B}};