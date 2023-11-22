// Get the reference to the game canvas and its 2D context
const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Set the speed of paddles, ball, and winning score
const paddleSpeed = 5;
const ballSpeed = 3;
const winningScore = 5;

// Vertical position of the left and right paddles
let leftPaddleY = 160;
let rightPaddleY = 160;

// Speed of movement for the left and right paddles
let leftPaddleVelocity = 0;
let rightPaddleVelocity = 0;

// Position of the ball on the canvas
let ballX = 300;
let ballY = 200;

// Speed of movement for the ball on the x and y axes
let ballXSpeed = ballSpeed;
let ballYSpeed = ballSpeed;

// Scores of the left and right players
let leftPlayerScore = 0;
let rightPlayerScore = 0;

// Difficulty of artificial intelligence
let aiDifficulty = 0.1;

// Indicates whether the second player is controlled by the computer
let player2IsComputer = false;

let gameStarted = false;

// Event listener for keydown events
document.addEventListener('keydown', (event) => {
    if (gameStarted) {
        if (event.key === 'ArrowUp') {
            // Move the right paddle up
            rightPaddleVelocity = -paddleSpeed;
        } else if (event.key === 'ArrowDown') {
            // Move the right paddle down
            rightPaddleVelocity = paddleSpeed;
        } else if (event.key === 'w') {
            // Move the left paddle up
            leftPaddleVelocity = -paddleSpeed;
        } else if (event.key === 's') {
            // Move the left paddle down
            leftPaddleVelocity = paddleSpeed;
        }
    }
});

// Event listener for keyup events
document.addEventListener('keyup', (event) => {
    if (gameStarted) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            // Stop vertical movement of the right paddle
            rightPaddleVelocity = 0;
        } else if (event.key === 'w' || event.key === 's') {
            // Stop vertical movement of the left paddle
            leftPaddleVelocity = 0;
        }
    }
});

function startGame() {
    // Get elements for difficulty and game mode
    const difficultySelect = document.getElementById('difficulty');
    const modeSelect = document.getElementById('mode');

    // Set the difficulty based on the selection
    switch (difficultySelect.value) {
        case 'easy':
            aiDifficulty = 0.1;
            break;
        case 'medium':
            aiDifficulty = 0.5;
            break;
        case 'hard':
            aiDifficulty = 0.9;
            break;
        default:
            aiDifficulty = 0.1;
    }

    // Determine if the second player is controlled by the computer
    player2IsComputer = modeSelect.value === 'single';

    // Start the game
    gameStarted = true;

    // Hide the menu and display the canvas
    document.getElementById('menu').style.display = 'none';
    document.getElementById('pongCanvas').style.display = 'block';

    // Start the game loop
    gameLoop();
}


function update() {
    // Update paddle positions
    leftPaddleY += leftPaddleVelocity;
    rightPaddleY += rightPaddleVelocity;

    // Update ball position
    ballX += ballXSpeed;
    ballY += ballYSpeed;

    // Reflect the ball if it hits the top or bottom of the canvas
    if (ballY < 0 || ballY > canvas.height) {
        ballYSpeed = -ballYSpeed;
    }

    // Check if the ball passed the left paddle
    if (ballX < 0) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + 80) {
            // Reflect the ball if it hits the left paddle
            ballXSpeed = -ballXSpeed;
        } else {
            // Reset the ball position, increase the right player's score, and check for a win
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            rightPlayerScore++;
            checkWin();
        }
    }

    // Check if the ball passed the right paddle
    if (ballX > canvas.width) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + 80) {
            // Reflect the ball if it hits the right paddle
            ballXSpeed = -ballXSpeed;
        } else {
            // Reset the ball position, increase the left player's score, and check for a win
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            leftPlayerScore++;
            checkWin();
        }
    }

    // Ensure paddles stay within the canvas boundaries
    if (leftPaddleY < 0) {
        leftPaddleY = 0;
    } else if (leftPaddleY > canvas.height - 80) {
        leftPaddleY = canvas.height - 80;
    }

    if (rightPaddleY < 0) {
        rightPaddleY = 0;
    } else if (rightPaddleY > canvas.height - 80) {
        rightPaddleY = canvas.height - 80;
    }

    // If playing against the computer, update the AI for the right paddle
    if (player2IsComputer) {
        // Right paddle AI
        if (ballXSpeed > 0 && ballX > canvas.width / 2) {
            if (Math.random() < aiDifficulty) {
                if (ballY > rightPaddleY + 40) {
                    rightPaddleVelocity = paddleSpeed;
                } else if (ballY < rightPaddleY + 40) {
                    rightPaddleVelocity = -paddleSpeed;
                } else {
                    rightPaddleVelocity = 0;
                }
            }
        } else {
            rightPaddleVelocity = 0;
        }
    }

    // Draw the updated game state
    draw();
}

function checkWin() {
    // Check if players have reached the winning score
    if (leftPlayerScore === winningScore || rightPlayerScore === winningScore) {
        // Display the winning player using an alert
        alert(leftPlayerScore === winningScore ? "Left player wins!" : "Right player wins!");

        // Reset the game to its default state
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        gameStarted = false;

        // Display the menu and hide the canvas
        document.getElementById('menu').style.display = 'block';
        document.getElementById('pongCanvas').style.display = 'none';
    }
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, leftPaddleY, 10, 80); // Left paddle
    ctx.fillRect(canvas.width - 10, rightPaddleY, 10, 80); // Right paddle

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.closePath();

    // Draw score
    ctx.font = '30px Arial';
    ctx.fillText(leftPlayerScore + ' - ' + rightPlayerScore, canvas.width / 2 - 30, 30);
}

function gameLoop() {
    if (gameStarted) {
        // Game update
        update();

        // Recursive call to gameLoop for the next animation frame
        requestAnimationFrame(gameLoop);
    }
}