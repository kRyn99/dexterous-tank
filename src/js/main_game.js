"use strict";

var playerTank;
var enemyTanks = [];
var bullets = [];
var shoot_start;
var shoot_end;
var timeSubtract;

function startGame() {
  myGameArea.start();
  playerTank = new Tank(
    100,
    225 - 30,
    30,
    30,
    "assets/sprites/tank/player.png",
    Math.PI / 2
  );
  enemyTanks.push(
    new Tank(
      300,
      225 - 30,
      30,
      30,
      "assets/sprites/enemy/enemy.png",
      -Math.PI / 2
    )
  );
  enemyTanks.push(
    new Tank(
      500,
      225 - 130,
      30,
      30,
      "assets/sprites/enemy/enemy.png",
      -Math.PI / 2
    )
  );
  enemyTanks.push(
    new Tank(
      400,
      225 + 70,
      30,
      30,
      "assets/sprites/enemy/enemy.png",
      -Math.PI / 2
    )
  );
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 800;
    this.canvas.height = 450;
    this.canvas.style.border = "7px solid #000000";
    this.ctx = this.canvas.getContext("2d");
    $("body").prepend(this.canvas);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    var img = new Image();
    img.src = "assets/maptile2.png";
    var ptrn = this.ctx.createPattern(img, "repeat");
    this.ctx.fillStyle = ptrn;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function updateGameArea() {
  myGameArea.clear();

  //Update bullet
  $("#myP4").html("this.bullets.length:" + bullets.length);
  bullets.forEach(function(element) {
    element.update();
  });

  //Update enemy
  if (enemyTanks.length > 0) {
    enemyTanks.forEach(function(element) {
      element.newPosition();
      element.update();
    });
    // enemyTanks.forEach(function (enemy) {
    // 	if (!enemy.live) enemyTanks.splice(enemyTanks.indexOf(enemy), 1);
    // });
  }

  //Tank moving
  playerTank.speedX = 0;
  playerTank.speedY = 0;

  if (playerTank.move == "L") {
    playerTank.speedX = -playerTank.speed;
    playerTank.angle = -Math.PI / 2;
  }
  if (playerTank.move == "R") {
    playerTank.speedX = playerTank.speed;
    playerTank.angle = Math.PI / 2;
  }
  if (playerTank.move == "U") {
    playerTank.speedY = -playerTank.speed;
    playerTank.angle = 0;
  }
  if (playerTank.move == "D") {
    playerTank.speedY = playerTank.speed;
    playerTank.angle = Math.PI;
  }
  if (playerTank.move == "UL") {
    playerTank.speedX = -playerTank.speed;
    playerTank.speedY = -playerTank.speed;
    playerTank.angle = -Math.PI / 4;
  }
  if (playerTank.move == "UR") {
    playerTank.speedX = playerTank.speed;
    playerTank.speedY = -playerTank.speed;
    playerTank.angle = Math.PI / 4;
  }
  if (playerTank.move == "DL") {
    playerTank.speedX = -playerTank.speed;
    playerTank.speedY = playerTank.speed;
    playerTank.angle = (-3 * Math.PI) / 4;
  }
  if (playerTank.move == "DR") {
    playerTank.speedX = playerTank.speed;
    playerTank.speedY = playerTank.speed;
    playerTank.angle = (3 * Math.PI) / 4;
  }

  //Update player & check collision
  playerTank.newPosition();
  enemyTanks.forEach(function(e) {
    playerTank.resetPosition(e);
  });
  playerTank.update();

  //Event with area wall
  //--Bullets
  bullets.forEach(function(e) {
    //Bullets destroy when out of area mode
    // if (
    //   e.x > myGameArea.canvas.width ||
    //   e.x < 0 ||
    //   e.y > myGameArea.canvas.height ||
    //   e.y < 0
    // ) {
    //   bullets.splice(bullets.indexOf(e), 1);
    // }
    
    //Bullets wall tele mode
    if (e.x > myGameArea.canvas.width) {e.x = 0;shoot_end = new Date().getTime();timeSubtract = Math.abs(shoot_end - shoot_start);console.log(timeSubtract);shoot_start=shoot_end;}
    if (e.x < 0) {e.x = myGameArea.canvas.width - e.width;shoot_end = new Date().getTime();timeSubtract = Math.abs(shoot_end - shoot_start);console.log(timeSubtract);shoot_start=shoot_end;}
    if (e.y > myGameArea.canvas.height) {e.y = 0;shoot_end = new Date().getTime();timeSubtract = Math.abs(shoot_end - shoot_start);console.log(timeSubtract);shoot_start=shoot_end;}
    if (e.y < 0) {e.y = myGameArea.canvas.height - e.height;shoot_end = new Date().getTime();timeSubtract = Math.abs(shoot_end - shoot_start);console.log(timeSubtract);shoot_start=shoot_end;}

    //Bullets wall bounce mode
  });
  //--Tanks (only tele mode)
  //----Player
  if (playerTank.x > myGameArea.canvas.width) playerTank.x = 0;
  if (playerTank.x < 0)
    playerTank.x = myGameArea.canvas.width - playerTank.width;
  if (playerTank.y > myGameArea.canvas.height) playerTank.y = 0;
  if (playerTank.y < 0)
    playerTank.y = myGameArea.canvas.height - playerTank.height;
  //----Enemies
  enemyTanks.forEach(function(e) {
    if (e.x > myGameArea.canvas.width) e.x = 0;
    if (e.x < 0) e.x = myGameArea.canvas.width - e.width;
    if (e.y > myGameArea.canvas.height) e.y = 0;
    if (e.y < 0) e.y = myGameArea.canvas.height - e.height;
  });

  //Check player destroyed
  if (playerTank.isShot()) playerTank.live = false;
  //Check enemy destroyed
  enemyTanks.forEach(function(enemy) {
    if (enemy.isShot()) enemy.live = false;
  });

  $("#myP2").html(
    "Current tank speed: " +
      playerTank.speed +
      ", speedX: " +
      playerTank.speedX +
      ", speedY: " +
      playerTank.speedY
  );
  $("#myP3").html("Key.move: " + playerTank.move);
  // $('#myP5').html("enemyTanks.length: " + enemyTanks.length);
}
