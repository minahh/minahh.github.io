let width = 700;
let height = 600;

// general variables
var groundHeight = 90;
var force = 0;
var Playersize = 40;
var metNo = 15;
var score = 0;
var paused = 0;
var gameover = 0;
var bg;
var gameFont;

// object variables
var saina;
var meteorShower = [];

function preload() {
  gameFont = loadFont("Closeness.ttf");
}

function setup() {
  bg = loadImage("https://www.toptal.com/designers/subtlepatterns/patterns/footer_lodyas.png");
  createCanvas(width, height);
  saina = new Saina(Playersize);
}

function draw() {
  background(bg);
  console.log(bg);
  // Draw the ground
  drawGround();

  // Player functions
  saina.show();
  saina.update();
  saina.boundary();
  saina.boost();

  // Update and show the score
  showScore();

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
      meteorShower.splice(i, 1);
      textSize(60);
      textAlign(CENTER);
      fill(198, 65, 55);
      textStyle(BOLD);
      text('GAME OVER', width/2, height/2);
      gameover = 1;
      noLoop();
    }
    if (meteorShower[i].hitGround()) {
      meteorShower.splice(i, 1); // remove meteor if they hit the ground
    }
  }

}

function drawGround() {
  fill(50);
  noStroke();
  rect(-1, height - groundHeight, width + 1, groundHeight);
}

function showScore() {
  score++;
  textSize(25);
  textFont(gameFont);
  fill(255);
  text('Points: ' + nfc(score), 40,55);
}

function keyReleased() {
  force = 0;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    force = 1;
  } else if (keyCode === LEFT_ARROW) {
    force = -1;
  } else if (keyCode === 32 && paused === 0) {
    noLoop();
    paused = 1;
  } else if (keyCode === 32 && gameover === 0) {
    paused = 0;
    loop();
  }
}
