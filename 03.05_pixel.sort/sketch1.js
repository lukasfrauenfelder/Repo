let img1;
let img2;
let img3;
let img4;
let img5;
let img6;
let img7;
let img8;
let img9;
let img10;
let img11;
let img12;
let img13;
let img14;
let img15;
let img16;
let img17;
let img18;
let img19;
let img20;
let img21;
let img22;
let img23;

let images = [];

let walkers = [];
let buffer;

function preload() {
  img1 = loadImage("assets/pixel-01.jpg");
  img2 = loadImage("assets/pixel-02.jpg");
  img3 = loadImage("assets/pixel-03.jpg");
  img4 = loadImage("assets/pixel-04.jpg");
  img5 = loadImage("assets/pixel-05.jpg");
  img6 = loadImage("assets/pixel-06.jpg");
  img7 = loadImage("assets/pixel-07.jpg");
  img8 = loadImage("assets/pixel-08.jpg");
  img9 = loadImage("assets/pixel-09.jpg");
  img10 = loadImage("assets/pixel-10.jpg");
  img21 = loadImage("assets/TraumaPixelScale-31.jpg");
  img22 = loadImage("assets/TraumaPixelScale-32.jpg");
  img23 = loadImage("assets/TraumaPixelScale-33.jpg");

  // Store images in the array only after they have finished loading
  images = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img21,
    img21,
    img21,
    img22,
    img22,
    img22,
    img23,
    img23,
    img23,
  ];
}

let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth / 2, windowHeight / 2); // Erstelle einen Grafikpuffer mit derselben Größe wie das Canvas

  for (let i = 0; i < 1000; i++) {
    let walker = new Walker(random(0, width), random(0, height));
    walkers.push(walker);
  }

  angleMode(DEGREES);
}

function draw() {
  background(255);
  buffer.background(255, 255, 255, 50); // Setze den Hintergrund des Puffers, um die Spuren der Walker zu zeichnen

  noStroke();
  for (let i = 0; i < walkers.length; i++) {
    walkers[i].display(buffer); // Passe die display() Funktion an, um den Puffer als Argument zu akzeptieren
    walkers[i].update();
  }

  // Zeichne den Puffer auf das Canvas
  //image(buffer, 0, 0);

  // Bestimme die Breite und Höhe der Zellen basierend auf der Größe des Canvas und der Größe des Hintergrundbuffers
  const cellWidth = width / buffer.width;
  const cellHeight = height / buffer.height;

  // Definiere die Größe des Bereichs, über den der Durchschnitt berechnet werden soll
  const areaWidth = 10;
  const areaHeight = 10;

  stroke(0);

  for (let y = 0; y < height; y += areaHeight) {
    for (let x = 0; x < width; x += areaWidth) {
      let pixelColor = buffer.get(
        x / 2 + areaWidth / 2,
        y / 2 + areaHeight / 2
      );
      let brightness =
        (red(pixelColor) + green(pixelColor) + blue(pixelColor)) / 3;

      const imgIndex = floor(map(brightness, 0, 255, 0, images.length));
      const img = images[imgIndex];

      // Zeichne das Bild an der entsprechenden Position

      if (img) {
        image(img, x, y, areaWidth, areaHeight);
      }
    }
  }

  text(frameRate(), 100, 100);
}

class Walker {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.posOld = createVector(x, y);
    this.vel = createVector(0, 1);
  }

  update() {
    let theta = noise(this.pos.x * 0.01, this.pos.y * 0.01) * 100;

    this.vel.setHeading(theta);
    this.posOld = this.pos.copy();
    this.pos.add(this.vel);

    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    ) {
      this.pos = createVector(random(0, width), random(0, height));
      this.posOld = this.pos.copy();
    }
  }

  display(buffer) {
    // Passe die display() Funktion an, um den Puffer als Argument zu akzeptieren
    let c1 = noise(this.pos.x * 1.5);
    buffer.fill(c1, 0, 0, 50);
    buffer.noStroke();

    let rx = noise(this.pos.x * 0.1);
    let ry = noise(this.pos.y * 0.1);

    buffer.push();
    buffer.translate(this.posOld.x, this.posOld.y);
    buffer.rotate(frameCount * 0.01) * 100;

    buffer.ellipse(0, 0, rx * 100, ry * 100);

    buffer.pop();
  }
}
