function Meteor() {

  this.x = random(width + 200);
  this.y = random(-10, -100);
  this.r = random(15, 60);
  this.gravity = random(2, 5);

  this.show = function() {
    fill(200,100);
    ellipse(this.x, this.y, this.r, this.r);
  }

  this.update = function() {
    this.y += this.gravity;
  }

  this.hitGround = function() {
    if (this.y > height - groundHeight && this.y < height) {
      return true;
    } else {
      return false;
    }
  }

}
