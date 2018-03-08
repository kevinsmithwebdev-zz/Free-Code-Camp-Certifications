$(function() {

	var cellArr = [
				{ cell: $("#cell0"), color1: "#8B0000", color2: '#FF3333', border: "#8B0000" },
				{ cell: $("#cell1"), color1: "#00008B", color2: '#2052f3', border: "#00008B" },
				{ cell: $("#cell2"), color1: '#DDDD00', color2: "#FFFFAA", border: '#DDDD00' },
				{ cell: $("#cell3"), color1: "#006400", color2: '#44DD00', border: "#006400"} ];

	var tones = [new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
							 new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
							 new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
							 new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3') ];

	var $startBtn = $('#startBtn');
	var $strictBtn = $('#strictBtn');
	var $btnCell = $(".btnCell");
	var $message = $('#message');

	var noteDur = [0.7 , 0.5, 0.3 ];

	var winNumSpinner = $("#spinner").spinner();
	winNumSpinner.spinner({ min: 3, max: 20 }).val(10).width(30);

	var disableMove = true;
	var strict = false;
	var moveList;
	initializeBoard();
	var moveNum;

	$strictBtn.on("click", function(){
		strict = !strict;
		if (strict) {
			$strictBtn.html('On');
		} else {
			$strictBtn.html('Off');
		}
	});



	$startBtn.on("click", function(){
	 	moveList = [];

		$startBtn.html('Restart');
		$startBtn.css('background-color', 'red');
		makeMove();
		moveListPlay();


		$btnCell.unbind().on("click", function() { //player makes a move
			if (!disableMove) {
				disableMove = true;
				var curMove = $(this).attr('value');

				if (curMove == moveList[moveNum]) { // correct answer
					cellPlay(curMove, true);
					if (moveNum === moveList.length-1) { // played all in current move list
						if (moveNum >= winNumSpinner.spinner("value") - 1 ) { // have we won?
							setTimeout(function() { disableMove = true; declareWinner(); }, 400);
						}  else { // not won, AI makes another move;
							makeMove();
							setTimeout(function() { moveListPlay(); }, 200);
						}
					} else {
						moveNum++; // good so far, need next player move
						disableMove = false;
					}

				} else { // wrong move!!!
					cellPlay(curMove, false);
					if (strict) {
						moveList = [];
						makeMove();

					}
					setTimeout(function() { moveListPlay(); }, (strict ? 1500 : 400));
				}
			} // if !disableMove
		}); // btnCell click
	});	// startBtn click


	function declareWinner() {
		for (var i = 7 ; i >= 0 ; i--) {
			setTimeout(cellPlay.bind(undefined, i%4, true), (7-i)*200);
		}

		$message.html('Win!!!');
		setTimeout(function() {
			$startBtn.css('background-color', 'green');
			$startBtn.html("Start");
			$message.html("Ready?");
		}, 2000);


	} // declareWinner()

	function makeMove() {
		moveList.push(Math.floor(Math.random() * 4));
	} // makeMove()

	function moveListPlay() {
		var delay = 0.2;
		var speed;

		disableMove = true;

		if ( moveList.length <= 4 ) {
			speed = noteDur[0];
		} else if (moveList.length <= 13) {
			speed = noteDur[1];
		} else  {
			speed = noteDur[2];
		}

		for (var i = 0 ; i < moveList.length ; i++ ) {
			delay += speed;
			setTimeout(cellPlay.bind(undefined, moveList[i], true), delay*1000);
		} // for
		setTimeout( function() { disableMove = false; $('#message').html('Move #' + moveList.length); } , delay*1000);
		moveNum = 0;
	} // moveListPlay()

	function initializeBoard() {
		for (var i = 0 ; i <= 3 ; i++) {
			cellArr[i].cell.css({"background-color": cellArr[i].color1, "border": "5px solid " + cellArr[i].border });
		}	// for i
		$message.html("Ready?");
	} // initialize()

	function cellPlay(cellNum, correct) {

		for (var i = 0 ; i < 4 ; i++) {
			tones[cellNum].pause();
			tones[cellNum].currentTime = 0;
		}
		cellArr[cellNum].cell.css("background-color", cellArr[cellNum].color2);

		if (correct) {
			tones[cellNum].play();
		} else {
			beep();
			setTimeout( function() { beep(); $btnCell.toggle(); }, 150);
			setTimeout( function() { beep(); $btnCell.toggle(); }, 300);
			setTimeout( function() { beep(); $btnCell.toggle(); }, 450);
			setTimeout( function() { beep(); $btnCell.toggle(); }, 600);
			if (strict) {
				$message.html("Fail!!!");
			} else {
				$message.html("Try again!");
			}
		}
		setTimeout( function() { cellArr[cellNum].cell.css("background-color", cellArr[cellNum].color1); }, 200 );
	} // cellPlay()

	function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
	} // beep()
}); // doc ready
