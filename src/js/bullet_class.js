function Bullet(x, y, width, height, imgPath, dflt_angle) {
  "use strict";
  this.image = new Image();
  this.image.src = imgPath;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.angle = dflt_angle;
  this.update = function() {
    switch (this.angle) {
      case -Math.PI / 2: //Left
        this.x -= 6;
        break;
      case Math.PI / 2: //Right
        this.x += 6;
        break;
      case 0: //Up
        this.y -= 6;
        break;
      case Math.PI: //Down
        this.y += 6;
        break;
      case -Math.PI / 4: //Up-Left
        this.x -= 6;
        this.y -= 6;
        break;
      case Math.PI / 4: //Up-Right
        this.x += 6;
        this.y -= 6;
        break;
      case (-3 * Math.PI) / 4: //Down-Left
        this.x -= 6;
        this.y += 6;
        break;
      case (3 * Math.PI) / 4: //Down-Right
        this.x += 6;
        this.y += 6;
        break;
    }
    let ctx = myGameArea.ctx;
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
    ctx.restore();
  };
}
