//.csv Tabelle
let table;

//Liste für Folgewörter
let dict = {};

let currentWord = "";

//Generierter Text
let markovText;

function preload() {
  //Dateipfad zur .csv Datei
  table = loadTable(`Fragen_Schlagzeilen.csv`, "ssv");
}

function setup() {
  createCanvas(800, 800);

  //Liste mit Folgewörter erstellen
  createMarkov();
  generateFirstWordWithUppercase();

  //Kondition, dass die Generation aufhört
  while (!currentWord.includes("?")) {
    generateNextWord();
  }
  textSize(30);
  textFont("Helvetica");
}

function draw() {
  background(200);
  text(markovText, 15, 30, width - 20, height - 20);
  fill(0);

  console.log(markovText);
}

function mousePressed() {
  if (currentWord.includes("?")) generateFirstWordWithUppercase();
  while (!currentWord.includes("?")) {
    generateNextWord();
  }
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

function generateFirstWordWithUppercase() {
  let wordThatStartsWithUppercase = Object.keys(dict).filter(checkIfUpperCase);
  let randomWordThatStartsWithUppercase =
    wordThatStartsWithUppercase[
      getRandomInt(wordThatStartsWithUppercase.length)
    ];

  currentWord = markovText = randomWordThatStartsWithUppercase;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function checkIfUpperCase(value) {
  return value.charAt(0) !== value.charAt(0).toLowerCase();
}
function generateNextWord() {
  let nextWord = dict[currentWord][getRandomInt(dict[currentWord].length)];
  currentWord = nextWord;
  markovText += ` ${nextWord}`;
}
