let img;
let Slider;
let Slider2;

let array = [];
let buffer;
let b = 20;

function preload() {
  img = loadImage("libraries/assets/IMG_9540.JPG");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  buffer = createGraphics(windowWidth, windowHeight);
  buffer.background(0);
  img.resize(width, height);
  // noLoop();

  img.loadPixels();

  Slider = createSlider(5, 100, 50);
  Slider.position(50, 50);

  Slider2 = createSlider(5, 200);
  Slider2.position(50, 100);

  Slider3 = createSlider(1, 50);
  Slider3.position(50, 150);
}

function draw() {
  background(0);

  // let b = Slider.value();

  let r = Slider2.value();
  let b1 = Slider3.value();

  if (b < 10) {
    b = b + 0.5;
  }
  b = b - 0.5;

  console.log(b);

  // image(img, 0, 0);
  // rectMode(CENTER);

  // let c = get(mouseX, mouseY);
  // fill(c);
  // rect(mouseX, mouseY, 50, 50);

  // let b = 10;
  buffer.textSize(400);
  buffer.fill(255);
  buffer.textStyle(BOLD);
  buffer.textAlign(LEFT);
  buffer.text("Creative", 30, height / 2 - 400, 1000, width);
  buffer.text("Coding", 30, height / 2, 1000, width);
  for (let x = 0; x < windowWidth; x += b) {
    for (let y = 0; y < windowHeight; y += b) {
      var c = color(img.get(x, y));
      var c2 = color(buffer.get(x, y));
      // greyscale conversion
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );
      var greyscale2 = round(
        red(c2) * 0.222 + green(c2) * 0.707 + blue(c2) * 0.071
      );

      array.push({ color: c, greyscale: greyscale });

      r = 0;
      // console.log(c2);

      if (greyscale2 > r) {
        // fill(100);
        // stroke(255);
        // noFill();
        noStroke();
        fill(c);
        ellipse(x, y, b);
      }
    }
    // image(img, 0, 0);
    // image(buffer, 0, 0);
  }

  //   console.log(array);
  //   array.sort((a, b) => b.greyscale - a.greyscale);

  //   x = 0;
  //   y = 0;

  //   for (let i = 0; i < array.length; i++) {
  //     let c = array[i].color;
  //     fill(c);
  //     noStroke();
  //     rect(x, y, b1, b1);
  //     x = x + b1;

  // //Zweites Pixelraster
  //     if (x > width) {
  //       x = 0;
  //       y = y + b1;
  //     }
  //   }
}
