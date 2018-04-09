let width = 700;
let height = 600;

var bob;

function setup() {
  createCanvas(width, height);
  bob = new oscillator();
  angleMode(DEGREES);
  //console.log(bob.amp);
  background(255);
}

function draw() {
  background(255);
  translate(0,300);
  bob.update(); //FORCE BETWEEN 0 AND 1, FREQ
  bob.show(); //BOB SIZE
}
