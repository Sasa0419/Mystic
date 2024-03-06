let score = parseInt(localStorage.getItem('score')) || 0;

// Récupérez l'élément score par son ID
const scoreElement = document.getElementById("score");

//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

var gameOver = false;
var blocksCollected = 0;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 10); //100 milliseconds
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        blocksCollected++;

        // Vérifiez si le joueur a collecté 5 blocs
        if (blocksCollected === 5) {
            // Redirigez vers une autre page ici

            score += 5;
            localStorage.setItem('score', score);
            scoreElement.innerText = "Score : " + score;

            // Rediriger vers game2.php en cas de réponse correcte
            setTimeout(function () {
                window.location.href = "game17.php";
            }, 1000)
        }
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        // Redirigez vers une autre page ici
        score -= 5;
        if (score < 0) {
            score = 0;
        }
        localStorage.setItem('score', score);
        window.location.href = "game_over.php";
        scoreElement.innerText = "Score : " + score;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            // Redirigez vers une autre page ici
            score -= 5;
            if (score < 0) {
                score = 0;
            }
            localStorage.setItem('score', score);
            window.location.href = "game_over.php";
            scoreElement.innerText = "Score : " + score;
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}


function placeFood() {
    //(0-1) * cols -> (0-19.9999) -> (0-19) * 25
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}


