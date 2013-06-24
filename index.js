var CSI = require('js-csi');

var Term_diff = require('../terminal-diff');

var td = new Term_diff();

/** Terminal UI (TUI) 

*/
var TUI = function() {
	this.textArray = [];
	this.text;
	this.lines = 24;
	this.cols = 80;

		td.on('update', function(update) {
			update.forEach(this.writeLine);
		}.bind(this));

};




TUI.prototype.clear = function() {
	CSI.hide();
	CSI.clear();
	CSI.move(1,1);
};

/** Draw

	If given an array of diffs, draw each of those changes to screen
	Otherwise just draw the textArray we already have.

 */

TUI.prototype.writeLine = function(line) {
	//Move to the line
	process.stdout.write('\u001B[' + (line.line+1) + ';0f');

	//Clear it
	process.stdout.write('\u001B[' + '2K');

	//Write it
	process.stdout.write(line.content);
};

TUI.prototype.write = function(change) {
	td.update(change);
/*	if(typeof change === 'string') {
		CSI.clear();
		var lines = change.split('\n');
		lines.forEach(function(text, index) {
			process.stdout.write('\u001B[' + (index+1) + ';0f');
			process.stdout.write(text);
		});
		return;
	}
*/


/*
	if(diffs) {
		while(diffs.length) {
			var diff = diffs.shift();
			var content = diff.content;
			var discrepancy = (diff.to - diff.from) - content.length;
			var ct = 0;
			while(discrepancy >= 0) {
//				content += ' ';
				discrepancy--;
			}
			this.drawChars(content, diff.line, diff.from)				
		}
	} else {
		for(var i in this.textArray) {
			if(this.textArray.hasOwnProperty(i)) {
				this.drawChars(this.textArray[i],i);
			}
		}
	}
*/
};


TUI.prototype.drawChars = function(chars,line,col) {
	//First write on screen
	CSI.move(line, col+1);
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

TUI.prototype.patch = function(patch) {
	var diff;
	var col = 0,
			line = 0;
	while(patch.length) {
		diff = patch.shift();
		if(diff[0] === -1) continue;
		if(diff[0] === 1 || diff[0] === 0) {
			var chars = diff[1].split('');
			var chr;
			while(chars.length) {
				chr = chars.shift();	
				if(chr === '\n') {
					col = 0;
					line++;
				} else {
					if(diff[0] === 1) {
						this.write(chr,line,col);
					}
					col++;
				}
			}	
		}
	}
};

var tui = module.exports = new TUI();

