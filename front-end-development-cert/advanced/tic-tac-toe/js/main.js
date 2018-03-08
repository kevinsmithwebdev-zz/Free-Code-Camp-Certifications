$(document).ready(function() {

	var linesArr = {
				r1: [0, 1, 2], r2: [3, 4, 5], r3: [6, 7, 8],
				c1: [0, 3, 6], c2: [1, 4, 7], c3: [2, 5, 8],
				d1: [0, 4, 8], d2: [2, 4, 6]
			};

	var boardTTT = [0,0,0,0,0,0,0,0,0];

	var isTurnAI;
	var iconPlayer;
	var iconAI;
	var isPause = false;


	$('.btn').click(function() {

		var numMoves = 0;

		if ($(this).attr('value') === 'x') {
			iconPlayer = 'X';
			iconAI = 'O';
			isTurnAI = false;
		} else {
			iconPlayer = 'O';
			iconAI = 'X';
			isTurnAI = true;
			moveAI();
		}

		$("#prompt").text("You are playing " + iconPlayer + "'s\n");
		$("#board").css("visibility", "visible"); ;


		$('.TTT').click(function() {

			if (!isPause) {

				var click = $(this);
				var squareNum = click.attr('value');
				console.log
				if (boardTTT[squareNum - 1] === 0) {
					enterTTT(boardTTT, squareNum - 1, iconPlayer);
					isTurnAI = true;
					isPause = true;

					var winner = checkWin(iconPlayer);

					setTimeout(function(){ // slight pause for AI
					if (winner) {
						declareWinner(iconPlayer, winner);
					} else {
						moveAI();
						isPause = false;
					}}, 500);
				}
			}
		});



	function declareWinner(icon, winner) {
		if (icon === iconPlayer) {
			$("#prompt").html("Congrats! You won as " + icon + "'s!")
		} else {
			$("#prompt").html("Too bad! AI won as " + icon + "'s!");
		}

		for (var i = 0 ; i < 3 ; i++) {
			$("span[value=\"" + (linesArr[winner][i]+1) + "\"]").css("color", "red");
		}

		function pulse() {
			for (var i = 0 ; i < 3 ; i++) {
				$("span[value=\"" + (linesArr[winner][i]+1) + "\"]>span").fadeTo(200,.7);
				$("span[value=\"" + (linesArr[winner][i]+1) + "\"]>span").fadeTo(200,1);
			}
		}
		setInterval(pulse, 500);
		promptReset();
	}



	function declareDraw() {
		$("#prompt").html("It's a Draw!");
		promptReset();
	}

	function promptReset() {
		$("#prompt").append("<button class='reset-btn'>Again?</button>");
		$(".TTT").off('click');
		$('.reset-btn').click(function() {
			history.go(0);
		});

	}


	function checkWin(icon) {
		for (var name in linesArr) {
			if (boardTTT[linesArr[name][0]] === icon &&
					boardTTT[linesArr[name][1]] === icon &&
					boardTTT[linesArr[name][2]] === icon) {
				return name;
			}
		}
		return null;
	}

	function checkTwo(icon) {
		for (var name in linesArr) {
			var emptyArr = [];
			var hasEnemy = false;
			for (var i = 0; i < 3; i++) {
				if (boardTTT[linesArr[name][i]] === 0) {
						emptyArr.push(linesArr[name][i]);
				} else if (boardTTT[linesArr[name][i]] !== icon) {
				//	console.log("Enemy piece found, no good!");
					hasEnemy = true;
					break;
				}
			}
			if  (!hasEnemy && emptyArr.length === 1) { // only 1 empty means potential win!
			return [name, emptyArr[0]];
			}
		}
		return null;
	}

	function moveAI() {

		isTurnAI = false;
		// check if can win?
		var twoData;

		if (numMoves === 9) {
			declareDraw();
		} else {
			numMoves++;
		}


		if (twoData = checkTwo(iconAI)) { // check if can win?
			enterTTT(boardTTT, twoData[1], iconAI);
			declareWinner(iconAI, twoData[0]);
		} else if (twoData = checkTwo(iconPlayer)) { // check if need block?
			enterTTT(boardTTT, twoData[1], iconAI);
		} else if (boardTTT[4] === 0) { // check if center open?
			enterTTT(boardTTT,4 , iconAI);
		} else { // random corner?
			var availCorns = [];

			var cornArr = [0, 2, 6, 8];
			for (var i in cornArr) {
				if (boardTTT[cornArr[i]] === 0) {
					availCorns.push(cornArr[i]);
				}
			}
			if (availCorns.length > 0) {
				enterTTT(boardTTT, availCorns[Math.floor(Math.random()*(availCorns.length))], iconAI);
			} else { // no corners so just pick random
				var availCells = []
				for (var i = 0 ; i < boardTTT.length ; i++) {
					if (boardTTT[i] === 0) {
						availCells.push(i);
					}
				}
				enterTTT(boardTTT, availCells[Math.floor(Math.random()*(availCells.length))], iconAI);
			}
		}

		if (numMoves === 9) {
			declareDraw();
		} else {
			numMoves++;
		}
	}


		function enterTTT(arr, cellNum, char) {

			var string = "<span>" + (char === 'X' ? '<i class="fa fa-times" aria-hidden="true"></i>' :
				 '<i class="fa fa-circle-o" aria-hidden="true"></i>') + "</span>";
			$("span[value=\"" + (cellNum+1) + "\"]").html(string);
			arr[cellNum] = char;
		}


	});

});
