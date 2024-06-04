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

let speed = [7, 8, 10, 14, 16, 18, 22, 26, 30, 33, 35, 39, 42, 46];

let index = 0;
let index2 = 0;

let letters;

function preload() {
  song = loadSound("Doomsday_blue_01.wav");
}

let sek = false;
let r;
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
  s = second();

  letters = split(lyrics[10], "");
  words = split(lyrics[10], " ");
}

function change() {
  song.stop();
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
  r = round(frameCount / 60);

  if (r - 1 >= speed[index]) {
    text(lyrics[index], 30, height / 2 - 40, width - 30, height);
  }

  if (r - 1 === speed[index]) {
    index = index + 1;
  }
}

function draw() {
  textAlign(CENTER);
  angleMode(DEGREES);
  // rightempo();
  background(220);
  let b = 40;
  translate(width / 2, height / 2);
  rotate(frameCount / 5);
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
    fill("blue");
    text(letters[i], 0, 0);
    pop();
    // console.log(letters[i]);
  }

  // for (let i = 0; i < words.length; i++) {
  //   text(words[i], x * i, height / 2);
  //   console.log(x * i);
  // }

  // console.log(letters);
}
