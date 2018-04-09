function tracer() {
  this.history = [];
  this.show = function() {
    this.history.push(bob.y);
    if (this.history.length > 300) {
      this.history.splice(0, 1);
    }
    noStroke();
    fill(0, 255, 100);
    for (var i = 0; i < this.history.length; i++) {
      var pos = this.history[i];
      ellipse(bob.x, pos, 3, 3);
      translate(1, 0);
    }
  }

}
