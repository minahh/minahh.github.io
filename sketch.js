var inc = 0.005;
var xoff0 = 100;
var xoff1 = 1400;
var xoff2 = 3000;


function setup() {
  var width = windowWidth;
  var height = windowHeight;
  startRed = width / 4;
  startGreen = 2 * startRed;
  startBlue = 3 * startRed;
  createCanvas(width, height);
}

function draw() {
  xoff0 = xoff0 + inc;
  xoff1 = xoff1 + inc;
  xoff2 = xoff2 + inc;
  var red = floor(noise(xoff0) * 255);
  var green = floor(noise(xoff1) * 255);
  var blue = floor(noise(xoff2) * 255);
  background(red, green, blue);
  blueSize = map(blue, 0, 255, 0, width / 3);
  redSize = map(red, 0, 255, 0, width / 3);
  greenSize = map(green, 0, 255, 0, width / 3);
  noStroke();
  fill(255, 101, 100);
  ellipse(startRed, height / 2, redSize, redSize);
  fill(20, 255, 100);
  ellipse(startGreen, height / 2, greenSize, greenSize);
  fill(20, 150, 255);
  ellipse(startBlue, height / 2, blueSize, blueSize);
}
