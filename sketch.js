let width = 700;
let height = 600;

// general variables
var groundHeight = 60;
var Playersize = 40;
var metNo = 15;
var score = 0.0;
var highScore = 0;
var mute = 0;
var immortal = 0;
var barWidth = 350;
var playerRed = 0;
var playerGreen = 172;
var playerBlue = 193;
var force
var paused;
var gameover;
var bg;
var gameFont;
var button;
var song;
var speakerIcon;
var muteIcon;

// object variables
var player;
var meteorShower = [];
var upgradeShower = [];

function preload() {
  gameFont = loadFont("Closeness.ttf");
  song = loadSound("bg.mp3");
  bg = loadImage("bg.png");
}

function setup() {
  var myCanvas = createCanvas(width, height);
  myCanvas.parent("wrapper");
  player = new Player(Playersize);
  resetGame();
}

function draw() {
  background(bg);
  createSoundBtn();

  if (immortal === 0) {
    barWidth = 350;
    playerRed = 0;
    playerGreen = 172;
    playerBlue = 193;
  } else {
    fill(100, 200, 103);
    rect(220, 40, barWidth, 10, 3);
    textSize(13);
    text('Invincibility activated', 220, 70);
    if (barWidth > 0.73) {
      barWidth -= 0.73;
    }
    playerRed = 100;
    playerGreen = 200;
    playerBlue = 103;
  }

  // Draw the ground
  drawGround();

  // Player functions
  player.show();
  player.update();
  player.boundary();
  player.boost();

  // Update and show the scores
  showScore();
  showHighScore();

  if (random(100) < 0.2 && upgradeShower.length < 2 && immortal === 0 && score > 1000) {
    upgradeShower.push(new Upgrade());
  }

  for (var i = upgradeShower.length - 1; i > 0; i--) {
    upgradeShower[i].show();
    upgradeShower[i].update();
    // Collision detection algorithm
    var distance = dist(player.x, player.y, upgradeShower[i].x, upgradeShower[i].y);
    var totalRadius = upgradeShower[i].r / 2 + Playersize / 2
    if (distance < totalRadius) { // if they have collided
      immortal = 1;
      playerRed = 255;
      playerBlue = 255;
      playerGreen = 0;
      timeImmortality();
      upgradeShower.splice(i, 1);
      break;
    }
    if (upgradeShower[i].hitGround()) {
      upgradeShower.splice(i, 1); // remove upgrade if it hits the ground
    }
  }

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
    var distance = dist(player.x, player.y, meteorShower[i].x, meteorShower[i].y);
    var totalRadius = meteorShower[i].r / 2 + Playersize / 2
    if (distance < totalRadius && immortal === 0) { // if they have collided
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

function timeImmortality() {
  setTimeout(timeFunc, 8000);
}

function timeFunc() {
  immortal = 0;
}

function drawGround() {
  fill(0, 60);
  noStroke();
  rect(-1, height - groundHeight, width + 1, groundHeight);
}

function showScore() {
  score += 1; // set speed of score
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

function createSoundBtn() {
  if (speakerIcon === undefined && muteIcon === undefined) {
    speakerIcon = createImg("speaker1.png");
    speakerIcon.parent("wrapper");
    speakerIcon.class("soundImg");
    muteIcon = createImg("speaker-mute1.png");
    muteIcon.parent("wrapper");
    muteIcon.class("soundImg");
  }
  if (mute === 1) {
    speakerIcon.style("display", "none");
    muteIcon.style("display", "block");
    muteIcon.mousePressed(toggleMute);
  } else {
    speakerIcon.style("display", "block");
    muteIcon.style("display", "none");
    speakerIcon.mousePressed(toggleMute);
  }
}

function toggleMute() {
  if (mute === 1) {
    mute = 0
    song.setVolume(1);
  } else {
    mute = 1
    song.setVolume(0);
  }
}

function resetGame() {
  if (score >= highScore) {
    highScore = score;
  }
  if (song.isPlaying() === false) {
    song.loop();
  }
  if (button != undefined) {
    button.hide();
  }
  gameover = 0;
  paused = 0;
  score = 0;
  force = 0;
  meteorShower = [];
  upgradeShower = [];
  loop();
  player.initialise();
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
    song.loop();
    loop();
  }
}
