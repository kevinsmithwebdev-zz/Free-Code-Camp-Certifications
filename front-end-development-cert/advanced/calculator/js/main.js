$(document).ready(function() {
	var display = $('#display-area');
	var equation = $('#equation-area');
	var equationArr = [];
	var lastWasEquals = false;

	display.html('ready');
	equation.html('');
	sizeText();

	$('.btn').click(function() {
		var click = $(this);
		var val = click.attr('value');

		switch (val) {
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
			case '.':
				// if there is already a number in stack, then multiple digits

				if (equationArr.length > 0) {
					if (val === '.' && equationArr[equationArr.length-1].indexOf('.') !== -1 && equationArr[equationArr.length-1]!==')') {
						break;
					}
				}
				if (lastWasEquals) {
					equationArr = [val];
					display.html(val);
				} else if ((!isNaN(equationArr[equationArr.length-1]) || equationArr[equationArr.length-1] === '.') && equationArr.length > 0) {
					// if last was a num or decima, then need to append
					equationArr[equationArr.length-1] += val;
					display.html(equationArr[equationArr.length-1]);
				} else {
					equationArr.push(val);
					display.html(val);
				}
				display.html(equationArr[equationArr.length-1]);
				lastWasEquals = false;
				break;

			case '-':
			case '+':
				if (!isNaN(equationArr[equationArr.length-1]) || equationArr[equationArr.length-1] === ')') {
					equationArr.push(val);
					lastWasEquals = false;
				}
			break;

			case '(':
				if (equationArr.length===0 || isNaN(equationArr[equationArr.length-1])) {
					equationArr.push(val);
					lastWasEquals = false;
				}
				break;

			case ')':
				var openParen = (equationArr.join('').match(/\(/g) || []).length;
				var closeParen = (equationArr.join('').match(/\)/g) || []).length;

				if (openParen > closeParen && (!isNaN(equationArr[equationArr.length-1]) || equationArr[equationArr.length-1] === ')')) {
					equationArr.push(val);
					lastWasEquals = false;
				}
				break;

			case '×':
				if (!isNaN(equationArr[equationArr.length-1]) || equationArr[equationArr.length-1] === ')') {
					equationArr.push('*');
					lastWasEquals = false;
				}
				break;

			case '÷':
				if (!isNaN(equationArr[equationArr.length-1]) || equationArr[equationArr.length-1] === ')') {
					equationArr.push('/');
					lastWasEquals = false;
				}
				break;

			case '=':
				var testVal;
				try {
					testVal = (Function("return " + equationArr.join(" ") + " ;"))();
					// round and remove trailing zeroes
					testVal=testVal.toFixed(4).replace(/(\.[0-9]*?)0+$/, "$1").replace(/\.$/, "");
					equation.html(testVal);
					display.html(testVal);
					equationArr = [testVal];
					lastWasEquals = true;
				}	catch (e) {
					display.html('ERROR');
				}
				break;

			case 'AC':
				equationArr = [];
				display.html('ready');
				equation.html('');
				lastWasEquals = false;
				break;

			case 'CE':
					var oldVal = 0;
					equationArr.pop();
					// find the last num value for display
					for (var i = equationArr.length-1 ; i >= 0 ; i--) {
						if (!isNaN(equationArr[i])) {
							oldVal = equationArr[i];
							break;
						}
					}
				display.html(oldVal);
				lastWasEquals = false;
				break;
		}
		equation.html(equationArr.join(" "));
		sizeText();
	}); // btn click
});	// doc ready

function sizeText() {
	$('.box').each(function(i, box) {
		var width = $(box).width();
		var html = '<span style="white-space:nowrap">';
		var line = $(box).wrapInner(html).children()[0];
		var n = $(box).height();

		$(box).css('font-size', n);
		while ($(line).width() > width) {
			$(box).css('font-size', --n);
		}
		$(box).text($(line).text());
	});
}	// sizeText
