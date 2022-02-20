var snake;
var gameState = 'play'
var scl = 20;
var ctrl = 2;
var bg
var food
var flag = true

function preload() {
  bg = loadImage("./background.png")
}

function setup() {
  createCanvas(600, 600);
  snake = new Snake();
  console.log("Don't click many keys at a time. May cause issues.")
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
  flag = true;
}

function draw() {
  background(bg);
  if (gameState == 'play') {
    snake.update();
    if(snake.eatFood(food)) {
      pickLocation()
    }
    var colorList = ["#db0000", "#db5400", "#dbc500", "#42db00", "#00db96", "#00a1db", "#2b2fff", "#b52bff", "#ff2bfb", "#ff2b6b"]
    if (flag) {
      fill(random(colorList));  
      flag = false
    }
    rect(food.x, food.y, scl, scl);
  }
  snake.die();
  snake.show();
  snake.displayScore();
}

function keyPressed() {
  // Going Backward is restricted
  // If many keys pressed, backwards is possible. Needs to be resolved.
  if (gameState == 'play') {
    if (keyCode === UP_ARROW && ctrl != 1) {
      ctrl = snake.changeDir(0, -1);
    } else if (keyCode === DOWN_ARROW && ctrl != -1) {
      ctrl = snake.changeDir(0, 1);
    } else if (keyCode === LEFT_ARROW && ctrl != 2) {
      ctrl = snake.changeDir(-1, 0)
    } else if (keyCode === RIGHT_ARROW && ctrl != 0) {
      ctrl = snake.changeDir(1, 0)
    }
  }
}