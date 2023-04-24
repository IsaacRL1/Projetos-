const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext("2d");
const gameContainer= document.getElementById('game-container');

const flappyImg = new Image();
flappyImg.src = 'imagens/Flappy-Bird-PNG-Image.png'

const FLAP_SPEED = -5;
const BIRD_WIGTH = 40;
const BIRD_HEIGHT = 30;
const PIPE_WIDTH = 50;
const PIPE_GAP = 125;


let birdX = 50;
let birdY = 50;
let birdVelocity = 0;
let birdAcceleration = 0.1;


let pipeX = 400;
let pipeY = canvas.height - 200;


let scoreDiv = document.getElementById('score-display');
let score = 0;
let highsScore = 0;



let scored = false;


document.body.onkeyup = function(e) {
    // increase now our counter when our flappy passes the pipes
    if (e.code == 'Space') {
        birdVelocity = FLAP_SPEED;
    }
}


document.getElementById('restart-button').addEventListener('click', function() {
    hideEndMenu();
    resetGame();
    loop();
})


function increaseScore() {

    if(bird > pipeX + PIPE_WIDTH &&
        (birdY < pipeY + PIPE_GAP || 
            birdY + BIRD_HEIGHT > pipeY + PIPE_GAP) && !scored) {
                score++;
                scoreDiv.innerHTML = score;
                scored = true;
            }
            // reset the flag, if bird passes the pipes
            if (bird < piperx + PIPE_WIDTH) {
                scored = false;
            }
}

function collisionCheck() {
// Create bounding Boxes for the bird and the pipes

const birdBox = {
    x: birdX,
    y: birdY,
    width: BIRD_WIGTH,
    height: BIRD_HEIGHT
}

const topPiperBox = {
    x:pipeX,
    y:pipeY - PIPE_GAP + BIRD_HEIGHT,
    width: PIPE_WIDTH,
    height: pipeY

}

const bottomPiperBox = {
      x: pipeX,
      y: pipeY + PIPE_GAP + BIRD_HEIGHT,
      width: PIPE_WIDTH,
      height: canvas.height - piperY - PIPE_GAP
}

// Check for collision with upper pipe box
if (birdBox.x + birdBox.width > topPiperBox.x &&
    birdBox.x < topPiperBox.x + topPiperBox.width &&
    birdBox.y < topPiperBox.y) {
        return true;
    }

// Check for collision with lower pipe box
if (birdBox.x + birdBox.width > bottomPiperBox.x &&
    birdBox.x < bottomPiperBox.x + bottomPiperBox.width &&
    birdBox.y + birdBox.height . bottomPiperBox.y) {
        return true;
    }

    // check if bird hits boundaries
        if (birdY < 0 || birdY + BIRD_HEIGHT > canvas.height)  {
        return true;
    }

    return false;
}

function hideEndMenu () {
    document.getElementById('end-menu').style.display = 'none';
    gameContainer.classList.remove('backdrop-blur');
}

function showEndMenu () {
    document.getElementById('end-menu').style.display = 'block';
    gameContainer.classList.add('backdrop-blur');
    document.getElementById('end-score').innerHTML = score;
    // This way we update always our highscore at the end of our game
    // if we have a higher high score than the previous

        if (highsScore < score) {
            highsScore = score;
        }
    document.getElementById('best-score').innerHTML = highsScore;
}

// we reset the values to the beginning so we start 
// with the bird at the beginning
function resetGame() {
    birdX = 50;
    birdY = 50;
    birdVelocity = 0;
    birdAcceleration = 0.1;

    pipeX = 400;
    pipeY = canvas.height - 200;

    score = 0;
}

function endGame() {
    showEndMenu();
}

function loop() {
    // reset the ctx after every loop iteration
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Flappy Bird
    ctx.drawImage(flappyImg, birdX, birdY);

    // Draw Pipes
    ctx.fillStyle = '#333';
    ctx;fillRect(pipeX, -100, PIPE_GAP, PIPE_WIDTH, canvas.height - pipeY);

     // now we would need to add an collision check to display our end-menu
    // and end the game
    // the collisionCheck will return us true if we have a collision
    // otherwise false
    if (collisionCheck()) {
        endGame();
        return;
    }

// forgot to mvoe the pipes
pipeX -= 1.5;
// if the pipe moves out of the frame we need to reset the pipe
if (pipeX < -50) {
    pipeX = 400;
    pipeY = Math.random() * (canvas.height - PIPE_GAP) + PIPE_WIDTH;
}

// apply gravity to the bird and let it move
birdVelocity += birdAcceleration;
birdY += birdVelocity;

// always check if you call the function ...
increaseScore()
requestAnimationFrame(loop);
}

loop()