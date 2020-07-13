let currentScene;
let curs;
var emptyHeart;
var redHeart;

function preload() {
  emptyHeart = loadImage("assets/emptyheart.png");
  redHeart   = loadImage("assets/redheart.png");
}


function setup() {
  // setup
  currentScene = new menu();
  createCanvas(windowWidth, windowHeight);
}

function draw() {  
  //console.log(deltaTime);
  resizeCanvas(windowWidth, windowHeight);
  background(0);
  currentScene.update();
  currentScene.draw();
}

function mouseClicked() {
  if (document.pointerLockElement || document.mozPointerLockElement) {
    currentScene.mouseClicked();
  } else {
    requestPointerLock();
  }
}

function mouseMoved() {
  currentScene.mouseMoved();
}

function mouseDragged() {
  currentScene.mouseDragged();
}

function keyPressed() {
  console.log("pressed");
}