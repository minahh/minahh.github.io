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
  translate(fulhaamin / 2, 40);
  boalha.clampKurahaa();
  boalha.dhakkaa();
  boalha.physicsUpdateKurey();
  boalha.resistKurey();
  if (fattaa == 1) {
    boalha.oscillateKurey();
  }
  if (mouseX < boalha.x+40+fulhaamin/2 && mouseX > boalha.x-40+fulhaamin/2 && mouseY > boalha.y-40+40 && mouseY < boalha.y+40+40) {
    cursor(HAND);
  }
}


function mousePressed() {
  if (mouseX < boalha.x+40+fulhaamin/2 && mouseX > boalha.x-40+fulhaamin/2 && mouseY > boalha.y-40+40 && mouseY < boalha.y+40+40) {
    fattaa = 1;
  }
}
