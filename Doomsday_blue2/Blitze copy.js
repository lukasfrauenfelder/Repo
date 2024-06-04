let mic;
let midi_out;
let midi_enabled = false;
let lyrics = [
  "Avada Kedavra, I speak to destroy",
  "The feelings I have, I cannot avoid",
  "Through twisted tongues, a hex deployed on you",
  "That all the pretties in your bed",
  "Escape your hands and make you sad",
  "And all the things you wish you had you'd lose",
  "I, I, I know you're living a lie",
  "I, I, I see the scars in your eyes",
  "I, I, I know you're living a lie",
  "I, I",
  "I guess you'd rather have a star than the moon",
  "I guess I always overestimate you",
  "Hoodoo, all the things that you do",
  "I'm down, down in my doomsday blues",
  "I, I, I know you're living a lie",
  "I, I, I know you're living a lie",
  "Avada Kedavra, the thoughts in my head",
  "The places I touch when lying in bed",
  "The visions of you, the words that you said, undo",
  "My heartbeat buried in the ground",
  "And to the strings I bind, you're bound",
  "So when you sleep, you'll hear the sound (ah!)",
  "I, I, I know you're living a lie",
  "I, I, I see the scars in your eyes",
  "I, I, I know you're living a lie",
  "I, I",
  "I guess you'd rather have a star than the moon",
  "I guess I always overestimate you",
  "Hoodoo, all the things that you do",
  "I'm down, down in my doomsday blue",
  "I guess you'd rather have a star than the moon",
  "I guess I always overestimate you",
  "Hoodoo, all the things that you do",
  "I'm down, down in my doomsday blue",
  "For your romance, I'd beg, steal and borrow",
  "It's draining me hollow, you",
  "(I guess you'd rather have a)",
  "(Star than the moon) you slow dance me out of my sorrow",
  "(I guess you'd rather have a star than the moon) but your favourite colour",
  "Compared to the others is doom, doomsday blue",
  "Blue",
  "Blue",
  "Blue, blue, blue, blue",
  "Blue, blue, blue, blue",
  "Blue, blue, blue, blue",
  "Blue, blue, blue, blue",
  "Avada Kedavra, I speak to destroy!",
];

let speed = [
  7.5, 9, 10, 14, 16, 18, 22, 26, 30, 33, 35, 39, 42, 46, 51, 55, 58, 60, 62,
  66, 67, 69, 74, 78, 81, 85, 87, 90, 94, 98, 101, 105, 109, 112, 117, 124, 132,
  138, 141, 156, 160, 164, 167, 171, 175, 178, 180,
];

index = 0;
timerValue = 1;

function preload() {
  sound = loadSound("Doomsday_blue_01.wav");
}

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight - 10);
  cnv.mousePressed(userStartAudio);
  textAlign(CENTER);
  mic = new p5.AudioIn();

  sound.play();
  setInterval(timeIt, 1000);

  fft = new p5.FFT(0.7, 1024);
  fft.setInput(sound);

  frameRate(30);

  angleMode(DEGREES);
  slider = createSlider(0, 100);
  slider.position(30, 30);
  slider.hide();

  // background(0);
  // button = createButton(30,100)
}

function timeIt() {
  if (timerValue > 0) {
    timerValue++;
  }
}

function mousePressed() {
  sound.stop();
  sound.play();
  timerValue = 1;
  timerValue = 1;
}

function draw() {
  if (timerValue - 1 === speed[index + 1]) {
    index = index + 1;
  }

  letters = split(lyrics[index], "");
  console.log(timerValue);
  drawBlob();
}

function drawBlob() {
  b = slider.value();
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

  // noFill();
  strokeWeight(3);
  fill("#5C64F2");
  stroke(62, 242, 12);

  textSize(150);
  // strokeWeight(20);
  for (let i = 0; i < waves.length; i++) {
    let x = map(i, 0, waves.length, 0, width);
    let y = map(waves[i], -1, 1, 0, height);
    let h = map(waves[i], -1, 1, 0, 2);

    var angle = i * angleIncrement;
    // var x = centerX + radius * h * cos(angle);
    // var y = centerY + radius * h * sin(angle);
    var r = i * 0.02;
    push();
    translate(100 + x, y);

    // rotate(angle + 90);

    text(letters[r], 0, 0);
    pop();
    // vertex(x, y);
  }
  endShape(CLOSE);

  push();
  translate(random(300, 1000), random(0, -300));
  rotate(45);
  beginShape();
  stroke("#5C64F2");
  strokeWeight(1);
  noFill();

  for (let i = 0; i < waves.length; i++) {
    let x = map(i, 0, waves.length, 0, width);
    let y = map(waves[i], -1, 1, 0, height);
    let h = map(waves[i], -1, 1, 0, 2);

    vertex(x, y);
  }
  endShape();
  pop();
  // ******************************************
}
