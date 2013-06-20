var tui = require('./index');

tui.clear();

var changes = [
	['h',1,1],
	['e',1,2],
	['a',1,1],
	['i',1,3],
	['o',1,4],
	['u',1,5],
	['',2,1]
];


setInterval(function() {
	if(!changes.length) process.exit();
		tui.drawChars.apply(tui,changes.shift());
},500);
