let mic;
let midi_out;
let midi_enabled = false;
let pos;
let posOld;

function preload() {
  img = loadImage("img.png");

  sound = loadSound("21Savage_zugeschnitten.wav");
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
  pos = createVector(width / 2, height / 2);
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
  let colordunkel = color(90, 93, 250);
  let colorhell = color("#E5D400");

  strokeWeight(3);
  for (let i = 0; i < waves.length; i++) {
    // let x = map(i, 0, waves.length, 0, width);
    // let y = map(waves[i], -1, 1, 0, height);

    let h = map(waves[i], -1, 1, 0, 2);
    let b = map(waves[i], -1, 1, 0, 1);

    stroke(lerpColor(colordunkel, colorhell, b));
    var angle = i * angleIncrement;
    var x = centerX + radius * h * cos(angle);
    var y = centerY + radius * h * sin(angle);

    posOld = pos.copy();
    pos = createVector(x, y);

    vertex(posOld.x, posOld.y);
    vertex(pos.x, pos.y);
    console.log(b);
  }
  endShape(CLOSE);

  // ******************************************
}
