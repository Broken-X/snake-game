class Snake {
  constructor() {
    this.x = 20;
    this.y = 20;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 3;
    this.tail = [createVector(this.x, this.y), createVector(this.x+10, this.y)];
    this.score = 0;
  }

  update() {
    // Left shift the snake entries
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length-1; i++) {
        this.tail[i] = this.tail[i+1];
      }
    }

    // Add or move head
    this.tail[this.total-1] = createVector(this.x, this.y);
    
    this.x += this.xspeed * scl;
    this.y += this.yspeed * scl;

    this.x = constrain(this.x, 0, width-scl);
    this.y = constrain(this.y, 0, height-scl);
  }

  gameOver() {
    this.xspeed = 0;
    this.yspeed = 0;
    swal({
      title: `Game Over`,
      text: "The Snake Died!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Restart"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload()
      }
    });
    gameState = 'end';
    if (keyDown("r")) {
      location.reload();
    }

  }

  die() {
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        //this.total = 1;
        //this.tail = [];
        snake.gameOver();
      }
    }
  }

  eatFood(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
        this.total++
        this.score++
        return true;
    } else {
        return false;
    }
  }

  displayScore() {
    textSize(15);
    noStroke();
    fill("yellow");
    textAlign(CENTER);
    text("Score: " + this.score, 70 , 30)    
  }

  show() {
    fill("#11ff00");
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
  }

  changeDir(x, y) {
    this.xspeed = x;
    this.yspeed = y;
    
    if (this.yspeed != 0) {
      return this.yspeed; 
    }
    if (this.xspeed != 0) {
      return this.xspeed + 1;
    }
  }
}