var CSI = require('js-csi');

/** Terminal UI (TUI) 

*/
var TUI = function() {
	this.textArray = [];
	this.text;
	this.lines = 24;
	this.cols = 80;
};

TUI.prototype.clear = function() {
	CSI.clear();
};

/** Draw

	If given an array of diffs, draw each of those changes to screen
	Otherwise just draw the textArray we already have.

 */
TUI.prototype.draw = function(diffs) {
	if(diffs) {
		while(diffs.length) {
			var diff = diffs.shift();
			var content = diff.content;
			var discrepancy = (diff.to - diff.from) - content.length;
			var ct = 0;
			while(discrepancy > 0) {
				content += ' ';
				discrepancy--;
			}
			this.drawChars(content, diff.line, diff.start)				
		}
	} else {
		for(var i in this.textArray) {
			if(this.textArray.hasOwnProperty(i)) {
				this.drawChars(this.textArray[i],i);
			}
		}
	}
};


TUI.prototype.drawChars = function(chars,line,col) {
	//First write on screen
	CSI.move(line, col);
	CSI.write(chars);

	//Then record personally
	while(this.textArray.length <= line) {
		this.textArray.push('');
	}
	if(col) {
		while(this.textArray[line].length < col) {
			this.textArray[line] += ' ';
		}
		var arr = this.textArray[line].split('');
		for(var i in chars) {
			arr.splice(col + i,1,chars[i]);
		}
		this.textArray[line] = arr.join('');
	}
	
};

module.exports = new TUI();
