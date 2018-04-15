let fulhaamin = 355;
let iskolhu = 300;

var boalha;
var fattaa = 0;
var angleSlider;

function setup() {
  createCanvas(fulhaamin, iskolhu);
  angleMode(DEGREES);
  boalha = new heleyBoalha(160, 50);
  angleSlider = createSlider(-55,55,-30);
  angleSlider.position(40,120);
}

function draw() {
  if (fattaa == 0) {
    boalha.angle = angleSlider.value();
  }
  background(255);
  translate(width / 2, 40);
  boalha.clampKurahaa();
  boalha.dhakkaa();
  boalha.physicsUpdateKurey();
  boalha.resistKurey();
  if (fattaa == 1) {
    boalha.oscillateKurey();
  }
}

function keyPressed() {
  if (keyCode == 32) {
    fattaa = 1;
  }
}
