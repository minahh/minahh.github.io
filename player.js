function Saina(size) {

  this.x = width / 2;
  this.y = height - groundHeight - (size / 2);

  this.vel = 0;

  this.show = function() {
    fill(65, 217, 244);
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
