let img;
let Slider;
let Slider2;

let array = [];

function preload() {
  img = loadImage("libraries/assets/dömi.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  img.resize(700, height);
  noLoop();

  img.loadPixels();

  Slider = createSlider(5, 100, 5);
  Slider.position(50, 50);

  Slider2 = createSlider(5, 200);
  Slider2.position(50, 100);

  Slider3 = createSlider(1, 50);
  Slider3.position(50, 150);
}

function draw() {
  background(0);

  let b = Slider.value();
  let r = Slider2.value();
  let b1 = Slider3.value();

  // image(img, 0, 0);
  // rectMode(CENTER);

  // let c = get(mouseX, mouseY);
  // fill(c);
  // rect(mouseX, mouseY, 50, 50);

  // let b = 10;

  for (let x = 0; x < windowWidth; x += b) {
    for (let y = 0; y < windowHeight; y += b) {
      var c = color(img.get(x, y));
      // greyscale conversion
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );

      array.push({ color: c, greyscale: greyscale });

      if (greyscale > r) {
        // fill(100);
        // stroke(255);
        // noFill();
        noStroke();
        fill(c);
        ellipse(x, y, b);
      }
    }
  }

  console.log(array);
  array.sort((a, b) => b.greyscale - a.greyscale);

  x = 0;
  y = 0;

  for (let i = 0; i < array.length; i++) {
    let c = array[i].color;
    fill(c);
    noStroke();
    rect(x, y, b1, b1);
    x = x + b1;

//Zweites Pixelraster
    if (x > width) {
      x = 0;
      y = y + b1;
    }
  }
}
