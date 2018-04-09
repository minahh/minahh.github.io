var time = 0;

function oscillator() {
  this.update = function() {
    this.x = width/2;
    this.y = 0;
    var freq = 6;
    var amp = 150;
    amp = amp * exp(-0.01*time);
    time++;
    //this.x += time;
    this.y = cos(time * freq) * amp;

  }

  this.show = function() {
    fill(51);
    ellipse(this.x,this.y,50,50);
  }
}
