let mic;
let midi_out;
let midi_enabled = false;

function preload() {
  img = loadImage("img.png");

  sound = loadSound("Dreams.mp3");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();

  sound.play();

  fft = new p5.FFT(0.7, 1024);
  fft.setInput(sound);

  frameRate(30);

  angleMode(DEGREES);
}

function draw() {
  drawBlob();
  // fill(0);
  // noStroke();
  // rectMode(CENTER);
  // rect(width / 2, height / 2, width, 250);
}

function drawBlob() {
  background(0, 10);
  strokeWeight(1);
  stroke(255);
  noStroke();
  micLevel = mic.getLevel();

  let spectrum = fft.analyze();
  let Value1 = spectrum[3];

  let waves = fft.waveform();
  noStroke();
  fill("blue");
  // for (let i = 0; i < spectrum.length; i++) {
  //   let x = map(i, 0, spectrum.length, 0, width);
  //   let h = -height + map(spectrum[i], 0, 255, height, 0);
  //   rect(x, height, width / spectrum.length, h * 0.3);
  // }
  // strokeWeight(10);
  // stroke(255);
  // noFill();
  // ellipse(width / 2, height / 2, Value1);

  let centerX = width / 2;
  let centerY = height / 2;
  let radius = Value1 * 1.5;

  let angleIncrement = 360 / waves.length;

  beginShape(POINTS);

  noFill();
  stroke(90, 93, 250);
  strokeWeight(30);
  for (let i = 0; i < waves.length; i++) {
    // let x = map(i, 0, waves.length, 0, width);
    // let y = map(waves[i], -1, 1, 0, height);
    let h = map(waves[i], -1, 1, 0, 2);

    var angle = i * angleIncrement;
    var x = centerX + radius * h * cos(angle);
    var y = centerY + radius * h * sin(angle);

    vertex(x, y);
  }
  endShape(CLOSE);

  // ******************************************
}
