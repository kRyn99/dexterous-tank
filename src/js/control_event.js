"use strict";
var keyPressing = [];

addEventListener("keydown", function(e) {
  // thisKeypressTime = new Date().getTime();
  // timeSubtract = Math.abs(thisKeypressTime - lastKeypressTime);
  // if (timeSubtract <= threshold) {
  // 	$('#myP').html("Speed boost: YES");
  // 	tank.speed = 5;
  // 	console.log("Speed", tank.speed);
  // 	thisKeypressTime = 0;
  // }																														//Check press time will use for bullet shooting
  // else {
  // 	$('#myP').html("Speed boost: NO");
  // 	tank.speed = 2;
  // 	console.log("Speed", tank.speed);
  // }
  if(!keyPressing.includes(e.key))keyPressing.push(e.key);
  var move = playerTank.move;
  var cross_direction = ["UL", "UR", "DL", "DR"];
  switch (e.keyCode) {
    case 37: //Left  (Arrow left)
      if (!cross_direction.includes(move))
        playerTank.move = move == "U" ? "UL" : move == "D" ? "DL" : "L";
      break;
    case 38: //Up    (Arrow up)
      if (!cross_direction.includes(move))
        playerTank.move = move == "L" ? "UL" : move == "R" ? "UR" : "U";
      break;
    case 39: //Right (Arrow right)
      if (!cross_direction.includes(move))
        playerTank.move = move == "U" ? "UR" : move == "D" ? "DR" : "R";
      break;
    case 40: //Down  (Arrow down)
      if (!cross_direction.includes(move))
        playerTank.move = move == "L" ? "DL" : move == "R" ? "DR" : "D";
      break;
    case 13: //Check info    (Enter)
      console.log(
        "Tank: L",
        playerTank.x,
        "R",
        playerTank.x + playerTank.width,
        "T",
        playerTank.y,
        "B",
        playerTank.y + playerTank.height,
        "W",
        playerTank.width,
        "H",
        playerTank.height,
        "A",
        playerTank.angle
      );
      enemyTanks.forEach(function(e) {
        console.log(
          "Enemy: L",
          e.x,
          "R",
          e.x + e.width,
          "T",
          e.y,
          "B",
          e.y + e.height,
          "W",
          e.width,
          "H",
          e.height,
          "A",
          e.angle
        );
      });
      bullets.forEach(function(e) {
        console.log(
          "Bullet: L",
          e.x,
          "R",
          e.x + e.width,
          "T",
          e.y,
          "B",
          e.y + e.height,
          "W",
          e.width,
          "H",
          e.height,
          "A",
          e.angle
        );
      });
      break;
      case 32: //Shoot (Spacebar)
      this.console.log("Shoot!");
      var bulletW = (playerTank.width / 5) * 2;
      var bulletH = (playerTank.height / 5) * 3;
      switch (playerTank.angle) {
        case -Math.PI / 2: //Left
          var bulletX = playerTank.x - playerTank.width;
          var bulletY = playerTank.y;
          break;
        case Math.PI / 2: //Right
          var bulletX = playerTank.x + playerTank.width;
          var bulletY = playerTank.y;
          break;
        case 0: //Up
          var bulletX = playerTank.x;
          var bulletY = playerTank.y - playerTank.height;
          break;
        case Math.PI: //Down
          var bulletX = playerTank.x;
          var bulletY = playerTank.y + playerTank.height;
          break;
        case -Math.PI / 4: //Up-Left
          var bulletX = playerTank.x - playerTank.width;
          var bulletY = playerTank.y - playerTank.height;
          break;
        case Math.PI / 4: //Up-Right
          var bulletX = playerTank.x + playerTank.width;
          var bulletY = playerTank.y - playerTank.height;
          break;
        case (-3 * Math.PI) / 4: //Down-Left
          var bulletX = playerTank.x - playerTank.width;
          var bulletY = playerTank.y + playerTank.height;
          break;
        case (3 * Math.PI) / 4: //Down-Right
          var bulletX = playerTank.x + playerTank.width;
          var bulletY = playerTank.y + playerTank.height;
          break;
      }
      bullets.push(
        new Bullet(
          bulletX,
          bulletY,
          bulletW,
          bulletH,
          "assets/sprites/bullet/bullet.png",
          playerTank.angle
        )
      );
      shoot_start = new Date().getTime();
      break;
  }
  $("#myP5").html("keys down: " + keyPressing);
});
addEventListener("keyup", function(e) {
  keyPressing.pop(e.key);
  var move = playerTank.move;
  switch (e.keyCode) {
    case 37: //Left
      playerTank.move =
        move == "UL" ? "U" : move == "DL" ? "D" : move == "R" ? "R" : "";
      break;
    case 38: //Up
      playerTank.move =
        move == "UL" ? "L" : move == "UR" ? "R" : move == "D" ? "D" : "";
      break;
    case 39: //Right
      playerTank.move =
        move == "UR" ? "U" : move == "DR" ? "D" : move == "L" ? "L" : "";
      break;
    case 40: //Down
      playerTank.move =
        move == "DL" ? "L" : move == "DR" ? "R" : move == "U" ? "U" : "";
      break;
  }
  // this.console.log("key up: " + e.key);
  // lastKeypressTime = thisKeypressTime;
  $("#myP5").html("keys down: " + keyPressing);
});
