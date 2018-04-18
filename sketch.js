let width = 700;
let height = 600;

var groundHeight = 90;
var force = 0;
var Playersize = 40;
var metNo = 15; // number of meteors;
var score = 0;
var paused = 0;

var saina;
var meteorShower = [];

function setup() {
  createCanvas(width, height);
  saina = new Saina(Playersize);
}

function draw() {
  background(80);
  drawGround();
  saina.show();
  saina.update();
  saina.boundary();
  saina.boost();
  score++;
  textSize(25);
  fill(255);
  text('Points: ' + nfc(score), 40,55);

  if (meteorShower.length < metNo) {
    for (var i = 0; i < metNo; i++) {
      meteorShower.push(new Meteor());
    }
  }

  for (var i = meteorShower.length - 1; i > 0; i--) {
    meteorShower[i].show();
    meteorShower[i].update();
    if (dist(saina.x, saina.y, meteorShower[i].x, meteorShower[i].y) < meteorShower[i].r / 2 + Playersize / 2) {
      meteorShower.splice(i, 1);
      textSize(60);
      textAlign(CENTER);
      fill(198, 65, 55);
      textStyle(BOLD);
      text('GAME OVER', width/2, height/2);
      noLoop();
    }
    if (meteorShower[i].hitGround()) {
      meteorShower.splice(i, 1);
    }
  }

}

function drawGround() {
  fill(50);
  noStroke();
  rect(-1, height - groundHeight, width + 1, groundHeight);
}

function keyReleased() {
  force = 0;
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    force = 1;
  } else if (keyCode === LEFT_ARROW) {
    force = -1;
  } else if (keyCode === 32 && paused == 0) {
    // textSize(25);
    // fill(255);
    // text('PAUSED', width/2,height/2);
    noLoop();
    paused = 1;
  } else if (keyCode === 32) {
    paused = 0;
    loop();
  }
}
