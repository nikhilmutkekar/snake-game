startgame = function () {

	var BOARD_WIDTH = 480;
	var BOARD_HEIGHT = 540;
	var BOARD_BGCOLOR = "#24AE5E";

	var SCORE_BOARD_HEIGHT = 20;
	var SCORE_BOARD_BGCOLOR = "#c0c96b";

	var TEXT_COLOR = "white";
	var TEXT_FONT = "bold 16px 'Courier new', monospace";

	var gameBoard = document.getElementById('board');
	var context = gameBoard.getContext('2d');

	var horizontalMargin = 4;
	var bottomMarigin = 5;

	var score = 0;
	

	var snakeArray = [];
	var snakeImage = {};
	var snakeDirection = "right";
	var snakeSpeed;
	var currentSpeed;

	var obstracleObject = [];

	var server = [];
	var serverPoint = 10;
	var serversCreated = 0;
	var obstacle = [];
	var INITIAL_X_CORD = 0;
	var INITIAL_Y_CORD = 0;
	var MOVE_PX = 20;

	var isGameOver = false;
	var isLevelChanged = false;
	var i = 0;
	var gameOver = false;
	var gameLevel = 1;
	var gameLevelChange = 5;
	var obstracleIntroLevel = 5;
	var obstractleIntro = false;


	document.addEventListener('keydown', (event) => {
		if (snakeDirection === "right" && event.keyCode === 37) {
			return
		}
		if (snakeDirection === "left" && event.keyCode === 39) {
			return
		}
		if (snakeDirection === "up" && event.keyCode === 40) {
			return
		}
		if (snakeDirection === "down" && event.keyCode === 38) {
			return
		}
		switch (event.keyCode) {
			case 38:
				snakeDirection = "up";
				break;
			case 40:
				snakeDirection = "down";
				break;
			case 37:
				snakeDirection = "left";
				break;
			case 39:
				snakeDirection = "right";
				break;
			case 82: isGameOver = false;
				init();
			default: break;
		}
	}, false);

	loadImages();
	init();
	function setSpeed(snakeSpeed) {
		currentSpeed = setInterval(() => {
			console.log("snake speed in set interval " + snakeSpeed);
		moveSnake();
		}, snakeSpeed);
	}

	function ChangeSpeed() {
		clearTimeout(currentSpeed);
	}



	function loadImages() {
		//Snake textures for different parts of snake body
		snakeImage["headright"] = document.getElementById("headright");
		snakeImage["headup"] = document.getElementById("headup");
		snakeImage["headdown"] = document.getElementById("headdown");
		snakeImage["headleft"] = document.getElementById("headleft");
		snakeImage["bodyx"] = document.getElementById("bodyx");
		snakeImage["bodyy"] = document.getElementById("bodyy");
		snakeImage["corner1"] = document.getElementById("corner1");
		snakeImage["corner2"] = document.getElementById("corner2");
		snakeImage["corner3"] = document.getElementById("corner3");
		snakeImage["corner4"] = document.getElementById("corner4");
		snakeImage["taildown"] = document.getElementById("taildown");
		snakeImage["tailup"] = document.getElementById("tailup");
		snakeImage["tailleft"] = document.getElementById("tailleft");
		snakeImage["tailright"] = document.getElementById("tailright");

		server.image = document.getElementById("server");
		obstracleObject.image = document.getElementById("obstracle");
	}

	function init() {
		reset();
		context.clearRect(INITIAL_X_CORD, INITIAL_Y_CORD, BOARD_WIDTH, BOARD_HEIGHT + SCORE_BOARD_HEIGHT);
		buildSnake();
		buildServer();
		if (obstractleIntro) {
			buildObstracle();
		}
		drawBoard();
		setSpeed(snakeSpeed);
	}
	function reset() {
		score = 0;
		gameLevel = 1;
		snakeSpeed = 150
		//snakeSpeed = 160;
		ChangeSpeed();
		obstractleIntro = false;
	}

	function buildSnake() {
		snakeArray = [];
		snakeArray[0] = { x: 260, y: 400, style: "headright" };
		snakeArray[1] = { x: 240, y: 400, style: "bodyx" };
		snakeArray[2] = { x: 220, y: 400, style: "bodyx" };
		snakeArray[3] = { x: 200, y: 400, style: "tailright" };
		snakeDirection = "right";
	}

	function buildServer() {
		var randomPoint = getRandomPoint();
		while (isPointOnSnake(randomPoint) || isPointOnObstacle(randomPoint)) {
			randomPoint = getRandomPoint();
		}
		server.x = randomPoint.x;
		server.y = randomPoint.y;
		serversCreated += 1;
	}
	function buildObstacle() {
		obstacle.x = 200;
		obstacle.y = BOARD_WIDTH / 2;
		obstacle.length = 5;
	}
	
	function buildObstracle() {
		var randomPoint = getRandomPoint();
		while (isPointOnSnake(randomPoint)) {
			randomPoint = getRandomPoint();
		}
		obstracleObject.x = randomPoint.x;
		obstracleObject.y = randomPoint.y;
		console.log("test");
	}

	function getRandomPoint() {
		var x = Math.floor((Math.random() * (BOARD_WIDTH / MOVE_PX))) * MOVE_PX;
		var y = Math.floor((Math.random() * ((BOARD_HEIGHT - SCORE_BOARD_HEIGHT) / MOVE_PX))) * MOVE_PX + SCORE_BOARD_HEIGHT;
		return { x, y };
	}

	function isPointOnSnake(randomPoint) {
		for (var i = 0; i < snakeArray.length; i++) {
			if (snakeArray[i].x === randomPoint.x && snakeArray[i].y === randomPoint.y) {
				return true;
			}
		}
		return false;
	}
	function isPointOnObstacle(randomPoint) {
		for (var i = 1; i <= obstacle.length; i++){
			if((obstacle.x + (i*20)) === randomPoint.x && obstacle.y === randomPoint.y){
				return true;
			}
		}
		return false;
	}
	function isPointOnObstracle(randomPoint) {
		if (obstractleIntro) {
			for (var i = 0; i < snakeArray.length; i++) {
				if (snakeArray[i].x === randomPoint.x && snakeArray[i].y === randomPoint.y) {
					return true;
				}
			}
		}
		return false;
	}

	function drawBoard() {
		if (!isGameOver) {
			context.fillStyle = BOARD_BGCOLOR;
			context.fillRect(INITIAL_X_CORD, INITIAL_Y_CORD, BOARD_WIDTH, BOARD_HEIGHT + SCORE_BOARD_HEIGHT);

			context.translate(INITIAL_X_CORD, SCORE_BOARD_HEIGHT);
			context.translate(INITIAL_X_CORD, -SCORE_BOARD_HEIGHT);
			context.fillStyle = SCORE_BOARD_BGCOLOR;
			context.fillRect(INITIAL_X_CORD, INITIAL_Y_CORD, BOARD_WIDTH, SCORE_BOARD_HEIGHT);

			context.fillStyle = TEXT_COLOR;
			context.font = TEXT_FONT;

			context.textAlign = "right";
			context.fillText("Top Score : " + topscore, BOARD_WIDTH - horizontalMargin, SCORE_BOARD_HEIGHT - bottomMarigin);

			//context.textAlign = "centre";
			//context.fillText("Level : " + gameLevel, (BOARD_WIDTH / 2) + 8, SCORE_BOARD_HEIGHT - bottomMarigin);

			context.textAlign = "left";
			context.fillText("Score : " + score, horizontalMargin, SCORE_BOARD_HEIGHT - bottomMarigin);

			for (var i = 0; i < snakeArray.length; i++) {
				context.drawImage(snakeImage[snakeArray[i].style], snakeArray[i].x, snakeArray[i].y);
			}

			context.drawImage(server.image, server.x, server.y);
			if(obstracleIntroLevel){
					context.fillRect(obstacle.x, obstacle.y, obstacle.length*20, 20);
			}
		}

	}

	function moveSnake() {
		let x_temp = snakeArray[0].x;
		let y_temp = snakeArray[0].y;

		if (snakeDirection === "left") {
			snakeArray.unshift({ x: x_temp - MOVE_PX, y: y_temp, style: "headleft" })
		} else if (snakeDirection === "up") {
			snakeArray.unshift({ x: x_temp, y: y_temp - MOVE_PX, style: "headup" })
		} if (snakeDirection === "right") {
			snakeArray.unshift({ x: x_temp + MOVE_PX, y: y_temp, style: "headright" })
		} if (snakeDirection === "down") {
			snakeArray.unshift({ x: x_temp, y: y_temp + MOVE_PX, style: "headdown" })
		}
		var tmpItem = snakeArray.pop();
		for (i = 1; i < snakeArray.length - 1; i++) {
			if (snakeArray[i].y === snakeArray[i - 1].y && snakeArray[i].y === snakeArray[i + 1].y)
				snakeArray[i].style = "bodyx";
			else if (snakeArray[i].x === snakeArray[i - 1].x && snakeArray[i].x === snakeArray[i + 1].x)
				snakeArray[i].style = "bodyy";
			else {
				if (snakeArray[i].x === BOARD_WIDTH - MOVE_PX && (snakeArray[i + 1].x === 0 || snakeArray[i - 1].x === 0)) {
					if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner1";
					else if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner1";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner4";
					else if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner4";
				}
				else if (snakeArray[i].x === 0 && (snakeArray[i + 1].x === BOARD_WIDTH - MOVE_PX || snakeArray[i - 1].x === BOARD_WIDTH - MOVE_PX)) {
					if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner3";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner3";
				}
				else if (snakeArray[i].y === 0 && (snakeArray[i + 1].y === BOARD_HEIGHT - MOVE_PX || snakeArray[i - 1].y === BOARD_HEIGHT - MOVE_PX)) {
					if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner3";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner3";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner4";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner4";
				}
				else if (snakeArray[i].y === BOARD_HEIGHT - MOVE_PX && (snakeArray[i + 1].y === 0 || snakeArray[i - 1].y === 0)) {
					if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner1";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner1";
				}
				else {
					if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner1";
					else if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner3";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner4";
					else if (snakeArray[i + 1].x > snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y > snakeArray[i].y)
						snakeArray[i].style = "corner1";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x < snakeArray[i].x && snakeArray[i + 1].y > snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner2";
					else if (snakeArray[i + 1].x < snakeArray[i].x && snakeArray[i - 1].x === snakeArray[i].x && snakeArray[i + 1].y === snakeArray[i].y && snakeArray[i - 1].y < snakeArray[i].y)
						snakeArray[i].style = "corner3";
					else if (snakeArray[i + 1].x === snakeArray[i].x && snakeArray[i - 1].x > snakeArray[i].x && snakeArray[i + 1].y < snakeArray[i].y && snakeArray[i - 1].y === snakeArray[i].y)
						snakeArray[i].style = "corner4";
				}
			}
		}

		//determine the tail shape
		if (snakeArray[snakeArray.length - 1].x === BOARD_WIDTH - MOVE_PX && snakeArray[snakeArray.length - 2].x === 0)
			snakeArray[snakeArray.length - 1].style = "tailright";
		else if (snakeArray[snakeArray.length - 1].y === BOARD_HEIGHT - MOVE_PX && snakeArray[snakeArray.length - 2].y === 0)
			snakeArray[snakeArray.length - 1].style = "taildown";
		else if (snakeArray[snakeArray.length - 1].x === 0 && snakeArray[snakeArray.length - 2].x === BOARD_WIDTH - MOVE_PX)
			snakeArray[snakeArray.length - 1].style = "tailleft";
		else if (snakeArray[snakeArray.length - 1].y === 0 && snakeArray[snakeArray.length - 2].y === BOARD_HEIGHT - MOVE_PX)
			snakeArray[snakeArray.length - 1].style = "tailup";
		else if (snakeArray[snakeArray.length - 2].x > snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y === snakeArray[snakeArray.length - 1].y)
			snakeArray[snakeArray.length - 1].style = "tailright";
		else if (snakeArray[snakeArray.length - 2].x === snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y > snakeArray[snakeArray.length - 1].y)
			snakeArray[snakeArray.length - 1].style = "taildown";
		else if (snakeArray[snakeArray.length - 2].x < snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y === snakeArray[snakeArray.length - 1].y)
			snakeArray[snakeArray.length - 1].style = "tailleft";
		else if (snakeArray[snakeArray.length - 2].x === snakeArray[snakeArray.length - 1].x && snakeArray[snakeArray.length - 2].y < snakeArray[snakeArray.length - 1].y)
			snakeArray[snakeArray.length - 1].style = "tailup";

		if (snakeArray[0].x === server.x && snakeArray[0].y === server.y) {
			snakeArray.push(tmpItem);
			buildServer();
			score += serverPoint;
			if (score > topscore) {
				topscore = score;
		}
			if ((serversCreated % gameLevelChange) == 0) {
				if (snakeSpeed > 40) {
					snakeSpeed -= 10;
					ChangeSpeed();
					setSpeed(snakeSpeed);
				}
				console.log("during level change" + snakeSpeed);
				gameLevel += 1;
				isLevelChanged = true;
				fadeLevelChange();
				if (gameLevel > obstracleIntroLevel) {
					obstractleIntro = true;
					buildObstracle();
				}
			}
		}

		if (snakeArray[0].x === BOARD_WIDTH || snakeArray[0].y === BOARD_HEIGHT + MOVE_PX || snakeArray[0].x === 0 - MOVE_PX || snakeArray[0].y === 0) {
			context.fillStyle = "white";
			context.fillText("Game Over, Please press 'R' to Restart", BOARD_WIDTH / 8, BOARD_HEIGHT / 2);
			isGameOver = true;
		}

		for (let i = 1; i < snakeArray.length - 1; i++) {
			if (snakeArray[0].x === snakeArray[i].x && snakeArray[0].y === snakeArray[i].y) {
				context.fillStyle = "white";
				context.fillText("Game Over, Please press 'R' to Restart", BOARD_WIDTH / 8, BOARD_HEIGHT / 2);
				isGameOver = true;
			}

		}

		if (gameLevel > obstracleIntroLevel && snakeArray[0].x === obstracleObject.x && snakeArray[0].y === obstracleObject.y) {
			context.fillStyle = "white";
			context.fillText("Game Over, Please press 'R' to Restart", BOARD_WIDTH / 8, BOARD_HEIGHT / 2);
			isGameOver = true;
		}
		console.log("is L" + isLevelChanged);
		//if(!isLevelChanged){
		drawBoard();
		//}
		
		function fadeLevelChange(){
		if(isLevelChanged){
			var alpha = 1.0, 
			interval = setInterval(function () {
				//context.width = context.width; // Clears the canvas
				context.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
				context.font = "italic 50pt Arial";
				context.fillText("   Level "+gameLevel, BOARD_WIDTH / 8, BOARD_HEIGHT / 2);
				alpha = alpha - 0.05; // decrease opacity (fade out)
				if (alpha < 0) {
					//context.width = context.width;
					clearInterval(interval);
					isLevelChanged = false;
	}
			}, 50); 
		}

	}
		
	}
	
	
	
	// function gameOver() {
	// 	context.fillStyle = "white";
	// 	context.fillText("Game Over, Please press 'R' to Restart", BOARD_WIDTH / 8, BOARD_HEIGHT / 2);
	// 	isGameOver = true;
	// }
}
