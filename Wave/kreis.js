let mic, fft, img, sound;
let midi_out;
let midi_enabled = false;
let countx = 0;

function preload() {
  img = loadImage("img.png");
  sound = loadSound("jazz.mp3");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();
  mic.start();
  sound.loop();
  fft = new p5.FFT(0.7, 16);
  fft.setInput(sound);
  background(0);
  frameRate(30);
}

function draw() {
  background(0, 20); // Create a fading trail effect
  countx += 1;

  let spectrum = fft.analyze();
  let value1 = spectrum[3];

  let centerX = width / 2;
  let centerY = height / 2;
  let circleRadius = 100;

  let angleIncrement = 360 / spectrum.length;
  let angleOffset = 90;

  translate(centerX, centerY); // Center the shapes
  for (let i = 0; i < spectrum.length - 3; i++) {
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    let angle = i * angleIncrement;
    let x = circleRadius * cos(angle);
    let y = circleRadius * sin(angle);

    push();
    angleMode(DEGREES);
    translate(x, y);
    rotate(angleOffset + i * 22.5);
    fill(0, 0, 255, 50);
    rect(0, 0, width / spectrum.length, h * 0.3, 20);
    pop();
  }

  push();
  noFill();
  stroke(255);
  ellipse(0, 0, circleRadius * 2.2);
  pop();
}

function userStartAudio() {
  if (!sound.isPlaying()) {
    sound.loop();
  }
  mic.start();
}
