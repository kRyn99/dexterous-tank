function Tank(x, y, width, height, imgPath, dflt_angle) {
  "use strict";
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = dflt_angle;
  this.image = new Image();
  this.image.src = imgPath;
  this.speedX = 0;
  this.speedY = 0;
  this.speed = 5;
  this.bullets = 5;
  this.live = true;
  this.move = "";

  this.update = function() {
    let ctx = myGameArea.ctx;
    if (this.live) this.image.src = imgPath;
    else this.image.src = "assets/effects/2.png";
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.width / -2,
      this.height / -2,
      this.width,
      this.height
    );
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.width / -2, this.height / -2, this.width, this.height);
    ctx.restore();
  };

  this.newPosition = function() {
    this.x += this.speedX * Math.abs(Math.sin(this.angle));
    this.y += this.speedY * Math.abs(Math.cos(this.angle));
  };

  // var threshold = 500;
  // var timeSubtract = 0;
  // var lastKeypressTime = 0;
  // var thisKeypressTime;

  this.isCollidedWith = function(enemy) {
    if (this.live && enemy.live) {
      var myLeft = this.x;
      var myRight = this.x + this.width - 1;
      var myTop = this.y;
      var myBottom = this.y + this.height - 1;
      var enemyLeft = enemy.x;
      var enemyRight = enemy.x + enemy.width - 1;
      var enemyTop = enemy.y;
      var enemyBottom = enemy.y + enemy.height - 1;
      var collide = true;
      if (
        myBottom < enemyTop ||
        myTop > enemyBottom ||
        myRight < enemyLeft ||
        myLeft > enemyRight
      ) {
        collide = false;
      }
      return collide;
    }
  };

  this.resetPosition = function(enemy) {
    if (
      this.speedX < 0 &&
      this.isCollidedWith(enemy) &&
      this.x < enemy.x + enemy.width &&
      this.x + this.width > enemy.x + enemy.width
    ) {
      //Collided with Left side
      this.x = enemy.x + enemy.width + 1;
      console.log("Reset position to Right!");
    } else if (
      this.speedX > 0 &&
      this.isCollidedWith(enemy) &&
      this.x + this.width > enemy.x &&
      this.x < enemy.x
    ) {
      //Collided with Right side
      this.x = enemy.x - enemy.width - 1;
      console.log("Reset position to Left!");
    } else if (
      this.speedY < 0 &&
      this.isCollidedWith(enemy) &&
      this.y < enemy.y + enemy.height &&
      this.y + this.height > enemy.y + enemy.height
    ) {
      //Collided with Top side
      this.y = enemy.y + enemy.height + 1;
      console.log("Reset position to Bottom!");
    } else if (
      this.speedY > 0 &&
      this.isCollidedWith(enemy) &&
      this.y + this.height > enemy.y &&
      this.y < enemy.y
    ) {
      //Collided with Bottom side
      this.y = enemy.y - enemy.height - 1;
      console.log("Reset position to Top!");
    }
  };

  this.isShot = function() {
    if (this.live && bullets.length > 0) {
      var check = false;
      var myLeft = this.x;
      var myRight = this.x + this.width;
      var myTop = this.y;
      var myBottom = this.y + this.height;
      bullets.forEach(function(bullet) {
        var bulletLeft = bullet.x;
        var bulletRight = bullet.x + bullet.width;
        var bulletTop = bullet.y;
        var bulletBottom = bullet.y + bullet.height;
        var hit = true;
        if (
          myBottom < bulletTop ||
          myTop > bulletBottom ||
          myRight < bulletLeft ||
          myLeft > bulletRight
        ) {
          hit = false;
        }
        if (hit) {
          console.log("hit!");
          check = true;
          bullets.splice(bullets.indexOf(bullet), 1);
        }
      });
      return check;
    }
  };
}
