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

let speed = [7.5, 9, 10, 14, 16, 18, 22, 26, 30, 33, 35, 39, 42, 46];

function preload() {
  song = loadSound("Doomsday_blue_01.wav");
  font = loadFont("RetroCool-Regular.otf");
}

let index = 0;

let sek = false;
let r;
let words;
function setup() {
  createCanvas(windowWidth, windowHeight);

  textSize(80);
  // textAlign(CENTER);

  button = createButton("play");
  button.position(30, 30);
  button.mousePressed(change);

  button1 = createButton("replay");
  button1.position(100, 30);
  button1.mousePressed(replaySong);

  count = 0;
  textFont(font);
  f = random(0, height - 100);

  textSize(200);
  fill(70, 70, 200);

  words = split(lyrics[0], " ");
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
  r = 0;
  frameCount = 0;
  index = 0; // Reset index to start from the first lyric
  background(220);
}

function rightempo() {
  r = round(frameCount / 60, 1);

  if (r === speed[index + 1]) {
    index = index + 1;
  }
}

function draw() {
  background(200);

  rightempo();
  // text(r, 100, 100);
  // text(lyrics[0], 30, f, width - 30, height);

  for (word in words) {
    // text(words, 0, 300);
    // console.log(words);
  }
  let x = 30;
  let y = height / 3;
  for (let i = 0; i < words.length; i++) {
    let r = words[i];

    text(r, 30 + x, y);
    if (x > width) {
      x = 0;
      y = y + 200;
    }
    x = x + 600;
    console.log(x);
  }

  // console.log(words);
}
