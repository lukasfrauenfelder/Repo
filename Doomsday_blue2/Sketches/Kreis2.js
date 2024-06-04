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
  "I guess I always overestimate you",
  "Hoodoo, all the things that you do",
  "I'm down, down in my doomsday blues",
];

let speed = [7.5, 8, 10, 14, 16, 18, 22, 26, 30, 33, 35, 39, 42, 46];

let index = 0;
var timerValue = 1;

let letters;

function preload() {
  song = loadSound("Doomsday_blue_01.wav");
  font = loadFont("Helvetica.ttf");
}

let sek = false;
let r;
function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(40);
  // textAlign(CENTER);

  button = createButton("play");
  button.position(30, 30);
  button.mousePressed(change);

  button1 = createButton("replay");
  button1.position(100, 30);
  button1.mousePressed(replaySong);

  slider = createSlider(0, 199);
  slider.position(30, 100);

  count = 0;

  letters = split(lyrics[5], "");
  words = split(lyrics[10], " ");

  fft = new p5.FFT(0.7, 128);
  fft.setInput(song);

  setInterval(timeIt, 1000);
}

function change() {
  song.play();
  sek = true;
  r = 0;
  frameCount = 0;
  index = 0;
}

function replaySong() {
  song.stop();
  song.play();
  sek = true;
  r = 1;
  timerValue = 1;
  frameCount = 1;
  index = 0; // Reset index to start from the first lyric
  background(220);
}

function timeIt() {
  if (timerValue > 0) {
    timerValue++;
  }
}

function rightempo() {
  r = round(frameCount / 60);

  if (timerValue === speed[index + 1]) {
    index = index + 1;
  }
}

function draw() {
  // textAlign(CENTER);
  angleMode(DEGREES);
  // rightempo();
  background(220);
  let b = 40;
  // translate(width / 2, height / 2);
  // rotate(frameCount / 5);
  let centerX = 0;
  let centerY = 0;
  let radius = 350;

  let increment = 360 / letters.length;
  // text(lyrics[10], 30, height / 2 - 40, width - 30, height);
  for (let i = 0; i < letters.length; i++) {
    var angel = increment * i;
    var x = centerX + radius * cos(angel);
    var y = centerY + radius * sin(angel);

    push();

    translate(x, y);
    rotate(angel + 90);
    strokeWeight(6);
    fill(90, 93, 250);
    // text(letters[i], 0, 0);
    pop();
    // console.log(letters[i]);
  }

  // for (let i = 0; i < words.length; i++) {
  //   text(words[i], x * i, height / 2);
  //   console.log(x * i);
  // }

  // console.log(letters);
  drawBlob();
}

function drawBlob() {
  background(0, 10);
  text(timerValue, width / 2 - 300, height / 2);
  rightempo();

  b = slider.value();

  strokeWeight(3);

  let spectrum = fft.analyze();
  let Value1 = map(spectrum[3], 0, 255, 1, 10);
  points = font.textToPoints(lyrics[index], width / 2 - 200, height / 2, 100, {
    sampleFactor: 0.2,
  });

  let waves = fft.waveform();
  fill("blue");

  // strokeWeight(Value1);
  // strokeWeight(20);
  noFill();

  for (let i = 0; i < points.length; i++) {
    // let r = map(spectrum[i], 0, 255, 1, 30);

    // strokeWe§ight(r);

    ellipse(points[i].x, points[i].y, b);
  }

  console.log(b);
}
