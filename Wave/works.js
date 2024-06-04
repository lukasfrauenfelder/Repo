let mic;
let midi_out;
let midi_enabled = false;
let countx = 10;

let button;
let button2;

function preload() {
  img = loadImage("img.png");

  jazz = loadSound("jazz.mp3");
  trap = loadSound("21Savage.wav");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  // cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();

  fft = new p5.FFT(0.7, 16);

  button = createButton("trap");
  button.position(30, height - 40);
  button.mousePressed(change);

  button2 = createButton("jazz");
  button2.position(200, height - 40);
  button2.mousePressed(change2);
  frameRate(30);
}

function change() {
  fft.setInput(trap);
  trap.play();
  jazz.stop();
}

function change2() {
  fft.setInput(jazz);
  trap.stop();
  jazz.play();
}

function draw() {
  background(0, 10);
  copy(0, 0, width, height, -countx, -countx, width - countx, height - countx);

  drawCircle();
}

function drawCircle() {
  strokeWeight(1);

  noStroke();

  let spectrum = fft.analyze();
  let Value1 = spectrum[3];
  console.log(Value1);

  var centerX = width / 2;
  var centerY = height / 2;
  var circleRadius = 200;

  var angleIncrement = 360 / spectrum.length;

  let angel = 90;

  // stroke(255);

  let waves = fft.waveform();
  // noStroke();
  fill(0, 0, 255, 90);

  stroke(255);

  for (let i = 0; i < spectrum.length - 3; i++) {
    // let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);

    var angle = i * angleIncrement;
    var x = centerX + circleRadius * cos(angle);
    var y = centerY + circleRadius * sin(angle);
    push();
    angleMode(DEGREES);

    translate(x, y);
    rotate(angel);
    rect(0, 0, width / spectrum.length, h * 0.3, 20);
    pop();
    angel = angel + 22.5;
  }
}
