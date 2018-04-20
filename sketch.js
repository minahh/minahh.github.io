let width = 700;
let height = 600;

// general variables
var groundHeight = 60;
var Playersize = 40;
var metNo = 15;
var score = 0;
var highScore = 0;
var force
var paused;
var gameover;
var bg;
var gameFont;
var button;
var pauseCount = 0;
var song;

// object variables
var saina;
var meteorShower = [];

function preload() {
  gameFont = loadFont("Closeness.ttf");
  song = loadSound("bg.mp3");
}

function setup() {
  bg = loadImage("bg.png");
  createCanvas(width, height);
  saina = new Saina(Playersize);
  resetGame();
}

function draw() {
  background(bg);
  // Draw the ground
  drawGround();

  // Player functions
  saina.show();
  saina.update();
  saina.boundary();
  saina.boost();

  // Update and show the scores
  showScore();
  showHighScore();

  // Add new meteors as old meteors get destroyed
  if (meteorShower.length < metNo) {
    for (var i = 0; i < metNo; i++) {
      meteorShower.push(new Meteor());
    }
  }

  // Loop to control each individual meteor
  for (var i = meteorShower.length - 1; i > 0; i--) {
    meteorShower[i].show();
    meteorShower[i].update();

    // Collision detection algorithm
    var distance = dist(saina.x, saina.y, meteorShower[i].x, meteorShower[i].y);
    var totalRadius = meteorShower[i].r / 2 + Playersize / 2
    if (distance < totalRadius) { // if they have collided
      if (button === undefined) {
        button = createButton("TRY AGAIN");
        button.style('position', 'absolute');
        button.style('margin-top', '1px');
        button.mouseClicked(resetGame);
      }
      button.show();
      fill(0, 90);
      rect(-1, height / 2 - 150 / 2 - groundHeight / 2, width + 1, 150);
      textSize(60);
      textAlign(CENTER);
      fill(198, 65, 55);
      textStyle(BOLD);
      text('GAME OVER', width / 2, height / 2 - 35);
      gameover = 1;
      noLoop();
    }
    if (meteorShower[i].hitGround()) {
      meteorShower.splice(i, 1); // remove meteor if they hit the ground
    }
  }

  if (paused === 1) {
    fill(198, 40, 40, 200);
    rect(270, height / 2 - 38, 160, 60, 10);
    fill(244);
    textAlign(CENTER);
    text('PAUSED', width / 2, height / 2);
  }

} // end of draw loop

function drawGround() {
  fill(0, 60);
  noStroke();
  rect(-1, height - groundHeight, width + 1, groundHeight);
}

function showScore() {
  score++;
  textSize(25);
  textFont(gameFont);
  textAlign(LEFT);
  fill(255);
  text('Points ' + nfc(score), 40, 55);
}

function showHighScore() {
  textSize(20);
  textFont(gameFont);
  textAlign(LEFT);
  fill(255, 150);
  text('HIGHEST ' + nfc(highScore), 40, 80);
}

function resetGame() {
  if (score >= highScore) {
    highScore = score;
  }
  if (song.isPlaying() === false) {
    song.play();
  }
  if (button != undefined) {
    button.hide();
  }
  gameover = 0;
  paused = 0;
  score = 0;
  force = 0;
  meteorShower = [];
  loop();
  saina.initialise();
}

function keyReleased() {
  force = 0;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    force = 1;
  } else if (keyCode === LEFT_ARROW) {
    force = -1;
  } else if (keyCode === 32 && paused === 0 && gameover === 0) {
    noLoop();
    song.pause();
    paused = 1;
  } else if (keyCode === 32 && gameover === 0) {
    paused = 0;
    song.play();
    loop();
  }
}
