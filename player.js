function Saina(size) {

  var inc = 0.001;
  var xoff0 = 100;
  var xoff1 = 1400;
  var xoff2 = 3000;

  this.x = width / 2;
  this.y = height - groundHeight - (size / 2);

  this.vel = 0;

  this.show = function() {
    xoff0 += inc;
    xoff1 += inc;
    xoff2 += inc;
    var red = floor(noise(xoff0) * 255);
    var green = floor(noise(xoff1) * 255);
    var blue = floor(noise(xoff2) * 255);
    fill(red, green, blue);
    //fill(0,172,193);
    //fill(65, 217, 244);
    ellipse(this.x, this.y, size, size);
  }

  this.update = function() {
    this.x += this.vel;
    this.vel *= 0.90;
  }

  this.boost = function() {
    this.vel += force;
  }

  this.boundary = function() {
    if (this.x > width - size/2) {
      this.x = width - size/2;
      this.vel = 0;
    }
    if (this.x < size/2) {
      this.x = size/2;
      this.vel = 0;
    }
  }

}
