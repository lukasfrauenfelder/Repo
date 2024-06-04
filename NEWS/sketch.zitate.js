//.csv Tabelle
let table;

let font;

function preload() {
  font = loadFont("assets/Helvetica-Bold.ttf");
}

//Liste für Folgewörter
let dict = {};

let currentWord = "";

//Generierter Text
let markovText;

let r;

let anfangsSatz = [
  "Zeki bei «Zweipunktnull» -",
  "Geldabwurf in Zürich:",
  "Befristete Stellen -",
  "Kaserne Kloten -",
  "Hohe Abschussquote -",
  "Eigentümer (79) gibt auf - ",
  "Corona-Fettleibigkeit -",
  "David Degen ist neuer FCB-Besitzer -",
  "Coronavirus -",
  "So tickt er jetzt -",
];

function preload() {
  //Dateipfad zur .csv Datei
  table = loadTable(`Schlagzeilen.csv`, "ssv");
}

function setup() {
  createCanvas(800, 500);

  //Liste mit Folgewörter erstellen
  // createMarkov();
  // generateFirstWordWithQuotationMark();

  // //Kondition, dass die Generation aufhört
  // while (!currentWord.endsWith("»")) {
  //   generateNextWord();
  // }

  // r = floor(random(0, 9));

  rectMode(CENTER);
  angleMode(DEGREES);
  createMarkov();

  // textAlign(CENTER);
}

function draw() {
  textSize(35);
  textStyle(ITALIC);
  noStroke();

  fill("blue");
  rect(width / 2, height - 20, width, 40);
  fill(255);

  text("NEWS", 15, height - 8);
}

function mousePressed() {
  stroke(1);
  textStyle(BOLD);
  textSize(50);
  fill(255);
  strokeWeight(2);

  generateFirstWordWithQuotationMark();

  //Kondition, dass die Generation aufhört
  while (!currentWord.endsWith("»")) {
    generateNextWord();
  }

  r = floor(random(0, 9));

  let woerter = markovText.split(/\s+/);

  console.log(woerter);

  push();
  translate(random(350, 400), random(400, 450));
  rotate(random(-10, 10));
  rect(0, 0, 700, 700);
  for (let i = 0; i < 11 - woerter.length; i++) {
    fill(200);
    noStroke();
    let b = 120;
    rect(240, 50 + i * -25, b, 10);
    rect(80, 50 + i * -25, b, 10);
    rect(-80, 50 + i * -25, b, 10);
    rect(-240, 50 + i * -25, b, 10);
  }
  fill(0);
  text(anfangsSatz[r] + markovText.toUpperCase(), 0, 50, 616, 700);
  // text(markovText.toUpperCase(), 15, 100, 500, 700);
  pop();
}

//Möglichkeit Kommas ebenfalls abzutrennen, aber ist momentan nicht so nötig und nur kompliziert
function createMarkov() {
  let temp = [];
  table.rows.forEach((row) => (temp = [...temp, ...row.arr[0].split(" ")]));

  temp.forEach((word, i) => {
    if (i === temp.length) return;

    if (word in dict) {
      dict[word].push(temp[i + 1]);
    } else {
      dict[word] = [temp[i + 1]];
    }
  });
}

function generateFirstWordWithQuotationMark() {
  let wordsThatStartWithQuote = Object.keys(dict).filter((key) =>
    key.startsWith("«")
  );
  print(wordsThatStartWithQuote);

  let randomWordsThatStartWithQuote =
    wordsThatStartWithQuote[getRandomInt(wordsThatStartWithQuote.length)];

  currentWord = markovText = randomWordsThatStartWithQuote;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function generateNextWord() {
  let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
  currentWord = nextWord;
  markovText += ` ${nextWord}`;
  console.log(dict);
}
