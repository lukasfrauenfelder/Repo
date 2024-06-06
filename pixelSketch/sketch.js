let img;
let Slider;
let Slider2;

function preload() {
  img = loadImage("libraries/assets/pitbull.jpeg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  img.resize(700, height);
  // noLoop();

  img.loadPixels();

  Slider = createSlider(5, 100, 5);
  Slider.position(50, 50);

  Slider2 = createSlider(5, 200);
  Slider2.position(50, 100);
}

function draw() {
  background(0);

  let b = Slider.value();
  let r = Slider2.value();

  // let b = 10;

  for (let x = 0; x < windowWidth; x += b) {
    for (let y = 0; y < windowHeight; y += b) {
      var c = color(img.get(x, y));
      // greyscale conversion
      var greyscale = round(
        red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
      );

      stroke(255);
      fill(greyscale);
      rect(x, y, b);
      // if (greyscale > r) {
      //   // fill(100);
      //   stroke(255);
      //   noFill();
      //   rect(x, y, b);
      // }

      // console.log(greyscale);
    }
  }

  // image(img, 0, 0);
}
