let mic;
let midi_out;
let midi_enabled = false;

function preload() {
  img = loadImage("img.png");

  sound = loadSound("jazz.mp3");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();

  sound.play();

  fft = new p5.FFT(0.7, 16);
  fft.setInput(sound);
}

function draw() {
  background(0, 20);
  // ******************************************
  // ******************************************

  // ******************************************
  // ******************************************

  strokeWeight(1);
  stroke(255);
  noStroke();
  // text("tap to start", width / 2, 20);
  micLevel = mic.getLevel();

  let spectrum = fft.analyze();
  let Value1 = spectrum[3];
  console.log(Value1);

  // texture(img);

  // let y = height - micLevel * height * 20;
  // ellipse(width / 2, y, 10, 10);
  // lights();
  // noStroke();
  // normalMaterial();
  // ambientMaterial(0, 100, 255);
  // specularMaterial(0, 100, 255);

  // push();
  // translate(100, 33);
  // rotateZ(map(Value1, 0, 255, 0, 2 * PI));
  // rotateX(0.01 * frameCount);
  // sphere(120 + 200 * micLevel);
  // box(200, 200, 200);
  // pop();

  // ******************************************
  // ******************************************
  // FFT analysis
  // let spectrum = fft.analyze();
  let waves = fft.waveform();
  noStroke();
  fill("blue");
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h * 0.3);
  }
  strokeWeight(10);
  stroke(255);
  noFill();
  ellipse(width / 2, height / 2, Value1);
  // beginShape();

  // noFill();
  // stroke(255);
  // strokeWeight(3);
  // for (let i = 0; i < waves.length; i++) {
  //   let x = map(i, 0, waves.length, 0, width);
  //   let y = map(waves[i], -1, 1, 0, height);
  //   vertex(x, y);
  // }
  // endShape();

  // ******************************************
}
