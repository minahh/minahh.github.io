function oscillator() {

  this.x = 0;
  this.y = 0;
  this.history = [];
  var time = 0;
  var xoff = 0;
  var inc = 0.001;
  var frequency;
  amplitude = 150;

  this.update = function(force, frequency) {
    this.x = noise(xoff) * 20;
    xoff = xoff + inc;
    time = time + 1;
    this.y = cos(frequency * time) * amplitude * force;
  }

  this.show = function(size) {
    noStroke();
    fill(90);
    ellipse(this.x, this.y, size, size);
    stroke(255, 170, 10);
    var sw = dist(0, -height, this.x, this.y);
    sw = 5500 / sw;
    strokeWeight(sw);
    line(0, -height, this.x, this.y - 25);
  }

  this.dampen = function(alpha) {
    if (amplitude > 0.1) {
      amplitude = amplitude * exp(-alpha * time);
    } else {
      amplitude = 0;
      inc = 0;
    }
  }

  this.time = time;
  this.history.push(this.x);

  // this.trace = function() {
  //   noStroke();
  //   fill(0, 255, 100);
  //   ellipse(this.x + time, this.y, 5, 5);
  // }

}
