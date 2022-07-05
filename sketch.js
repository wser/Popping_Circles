// new Q5('global');

let circleFilling = false;
let circleSize = 0;
let totalArea = 0;
let lineWidth = 1;
let diameter = 10;
let circleColor, area;

const circles = [];
const width = 500;
const height = 500;

function setup() {
  var canvas = createCanvas(width, height); // create canvas to draw on
  canvas.mousePressed(() => {
    circleSize = 0; // initial circle size
    circleColor = color(random(255), random(255), random(255)); // set that circle color
    circleFilling = true; // start to fill circle
  });
  circleColor = color(random(255), random(255), random(255)); //set random color to fill with
  strokeWeight(lineWidth); // line thickness
}

function draw() {
  background(150); // set background color

  if (circleFilling) {
    circleSize += diameter; // increase circle diameter

    const overlappingCircle = getOverlappingCircle();
    if (overlappingCircle) {
      circleFilling = false; // stop filling if circles collide
      circles.splice(circles.indexOf(overlappingCircle), 1); // remove active circle and touched one
    }

    if (isOffScreen()) circleFilling = false; // stop drawing if is offscreen

    fill(circleColor); // fill circle with color
    circle(mouseX, mouseY, circleSize); // make circle

    area = (circleSize / 2) ** 2 * PI; // area of a circle r2*pi
    totalArea = totalArea + area; // add to total drawn area
  }

  fill(50); // set color of next line of code
  text('Total area: ' + numberWithDots(round(totalArea)) + ' pixels', 20, 20); // write text/total score

  for (const c of circles) {
    c.draw(); // draw all circles in the array of circles
  }
}

function getOverlappingCircle() {
  for (const c of circles) {
    if (dist(c.x, c.y, mouseX, mouseY) < circleSize / 2 + c.size / 2 + 2)
      return c;
  }

  return undefined;
}

function isOffScreen() {
  return (
    mouseX < circleSize / 2 ||
    mouseX > width - circleSize / 2 ||
    mouseY < circleSize / 2 ||
    mouseY > height - circleSize / 2
  );
}

function mouseReleased() {
  if (circleFilling)
    circles.push(new Circle(mouseX, mouseY, circleSize, circleColor)); // if not touched, add to an array
  circleFilling = false; // stop filling the circle
}

function numberWithDots(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

class Circle {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
}
