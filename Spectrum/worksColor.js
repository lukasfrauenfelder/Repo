let mic;
let midi_out;
let midi_enabled = false;
let countx = 10;

let button;
let button2;

let blau;
let rot;

let buffer;
let d = 1;

let pos;
let posOld;
function preload() {
  img = loadImage("img.png");

  jazz = loadSound("jazz.mp3");
  trap = loadSound("21Savage_zugeschnitten.mp3");
  dreams = loadSound("Dreams.mp3");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  // cnv.mousePressed(userStartAudio);

  buffer = createGraphics(width, height - 800);
  buffer.background(0);

  textAlign(CENTER);
  angleMode(DEGREES);
  mic = new p5.AudioIn();

  fft = new p5.FFT(0.7, 16);

  button = createButton("trap");
  button.position(width - 100, height - 40);
  button.mousePressed(change);

  button2 = createButton("jazz");
  button2.position(width - 200, height - 40);
  button2.mousePressed(change2);

  button3 = createButton("dreams");
  button3.position(width - 300, height - 40);
  button3.mousePressed(change3);
  frameRate(30);

  blau = color(0, 0, 255);
  rot = color(255, 0, 0);

  pos = createVector(0, 100);

  // jazz.play();
}

function change() {
  fft.setInput(trap);
  trap.play();
  jazz.stop();
  dreams.stop();
}

function change2() {
  fft.setInput(jazz);
  trap.stop();
  jazz.play();
  dreams.stop();
}

function change3() {
  fft.setInput(dreams);
  trap.stop();
  jazz.stop();
  dreams.play();
}

function draw() {
  background(0, 10);

  copy(0, 0, width, 800, -countx, -countx, width - countx, 800 - countx);

  drawCircle();

  drawLine(buffer);

  push();
  translate(0, 800);
  image(buffer, 0, 0);
  pop();
}

function drawCircle() {
  strokeWeight(1);

  noStroke();

  let spectrum = fft.analyze();
  let Value1 = spectrum[3];

  var centerX = width / 2;
  var centerY = height / 2;
  var circleRadius = 50;

  var angleIncrement = 360 / spectrum.length;

  let angel = 90;

  // stroke(255);

  let waves = fft.waveform();
  // noStroke();
  fill(0, 0, 255, 90);

  stroke(255);
  strokeWeight(0.5);
  // noStroke();

  for (let i = 0; i < spectrum.length - 3; i++) {
    // let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);

    var angle = i * angleIncrement;
    var x = centerX + circleRadius * cos(angle);
    var y = centerY + circleRadius * sin(angle);
    push();

    let c = map(spectrum[i], 0, 255, 0, 1);
    intercolor = lerpColor(blau, rot, c);
    fill(intercolor);
    translate(x, y);
    rotate(angel);
    rect(0, 0, width / spectrum.length / 5, h * 0.3, 20);
    pop();
    angel = angel + 22.5;
  }
}

function drawLine() {
  let spectrum = fft.analyze();
  let Value1 = spectrum[3];

  // buffer.push();

  d = d + 0.5;

  buffer.stroke(255);
  buffer.strokeWeight(1);
  buffer.noFill();

  posOld = pos.copy();
  pos = createVector(d, map(Value1 / 3, 0, 100, 100, 0));

  buffer.beginShape();

  buffer.vertex(posOld.x, posOld.y);
  buffer.vertex(pos.x, pos.y);
  // buffer.vertex(posOld.x, posOld.y);

  buffer.endShape();

  console.log(Value1 / 3);

  if (d > width) {
    d = 0;
    buffer.background(0);
  }
}
