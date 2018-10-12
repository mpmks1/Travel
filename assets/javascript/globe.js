//=========p5js background============
var img;
var angle = 0;
var xangle = 0;
var canvas;
function preload() {
  img = loadImage("assets/images/1_earth_8k.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  camera(0, 350, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);
  background(50);
  rectMode(CENTER);
  rotateY(angle);
  rotateX(xangle);
  texture(img);
  sphere(width / 3, 24, 24);
  xangle += .0002;
  angle += .001;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
//=========== end p5js background==========