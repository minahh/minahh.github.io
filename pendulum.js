function heleyBoalha(dhigumin, barudhan) {
  var dhigumin = dhigumin;
  var barudhan = barudhan;
  var aVel = 0;
  var aAcc = 0;

  this.physicsUpdateKurey = function() {
    this.angle += aVel;
    aVel += aAcc;
    this.x = sin(this.angle) * 160;
    this.y = cos(this.angle) * 160;
  }

  this.dhakkaa = function() {
    stroke(230,200,0);
    strokeWeight(3);
    line(0, 0, this.x, this.y);
    fill(188, 124, 33);
    noStroke();
    ellipse(this.x, this.y, barudhan, barudhan);
  }

  this.oscillateKurey = function() {
    aAcc = 0.4 * -sin(this.angle);
  }

  this.resistKurey = function() {
    aVel *= 0.99053;
  }

  this.clampKurahaa = function() {
    rectMode(CENTER);
    fill(150);
    rect(0, 0, 20, 20, 5);
    rect(0, iskolhu - 35, 100, 30,5);
    fill(100);
    stroke(150);
    strokeWeight(5);
    line(0, -20, 0, iskolhu);
    noStroke();
    rect(0, 0, 10, 10,5);
  }

}
