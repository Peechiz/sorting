console.log('hello sorting!');

// this sketch sorts the pixels in each column slice

var img;
var sorted;
var para;
var testColor;

function preload(){
  img = loadImage("./forest.jpg")
}

var canvas
function setup() {
  canvas = createCanvas(img.width, img.height);
  canvas.parent("p5canvas");
  pixelDensity(1);
  // colorMode(HSB,255)
  img.loadPixels();
  image(img,0,0);

  sorted = createImage(img.width, img.height);
  sorted.loadPixels();

  for (var i = 0; i < img.pixels.length; i++) {
    sorted.pixels[i] = img.pixels[i];
  }
  para = document.querySelector('#status');
}

var x = 0;
function draw() {
  para.innerHTML = `${Math.round((x/img.width) *1000)/10}%`;
  image(sorted, 0, 0)

  // Change this function to use a different sort method
  function compare(a,b) {
    return b[0]-(sin(a[0]*a[0]))
    // return (b[0]-b[1]) - (a[0]-a[1])
  }

  var temp = [];
  for (var y = 0; y < sorted.height; y++) {
    var index = (x + y * img.width) * 4;
    var r = sorted.pixels[index + 0];
    var g = sorted.pixels[index + 1];
    var b = sorted.pixels[index + 2];
    var a = sorted.pixels[index + 3];

    temp.push([r,g,b,a]);
  }
  temp.sort(compare);
  for (var y = 0; y < sorted.height; y++) {
    var index = (x + y * img.width) * 4;
    sorted.pixels[index + 0] = temp[y][0];
    sorted.pixels[index + 1] = temp[y][1];
    sorted.pixels[index + 2] = temp[y][2];
    sorted.pixels[index + 3] = temp[y][3];
  }


  if (x < sorted.width){
    sorted.updatePixels();
    x++
  }
}
