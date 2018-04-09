let width = 700;
let height = 600;

var bob;
var tracer;

function setup() {
  createCanvas(width, height);
  bob = new oscillator();
  tracer = new tracer();
  angleMode(DEGREES);
}

function draw() {
  background(255);
  stroke(240);
  strokeWeight(2);
  translate(width / 2, height / 2);
  line(-width / 2, 0, width / 2, 0);
  bob.update(0.8, 8); //FORCE BETWEEN 0 AND 1, FREQ
  bob.dampen(0.0001); //ALPHA MORE ZEROS LESS DAMPING
  bob.show(50); //BOB SIZE
}

