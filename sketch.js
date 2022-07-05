new Q5('global');

let circleFilling = false;
let circleSize = 0;
let totalArea = 0;
let circleColor, area;

const circles = [];

function setup() {
  createCanvas(500, 500);
  circleColor = color(random(255), random(255), random(255));
  strokeWeight(2);
}

function draw() {
  background(150);

  if (circleFilling) {
    circleSize += 1;

    const overlappingCircle = getOverlappingCircle();
    if (overlappingCircle) {
      circleFilling = false;
      circles.splice(circles.indexOf(overlappingCircle), 1);
    }

    if (isOffScreen()) {
      circleFilling = false;
    }

    fill(circleColor);
    circle(mouseX, mouseY, circleSize);

    area = (circleSize / 2) ** 2 * PI;
    totalArea = totalArea + area;
  }

  for (const c of circles) {
    c.draw();
  }

  fill(50);
  text('Total area: ' + round(totalArea) + 'pixels', 20, 20);
}

function getOverlappingCircle() {
  for (const c of circles) {
    if (dist(c.x, c.y, mouseX, mouseY) < circleSize / 2 + c.size / 2 + 2) {
      return c;
    }
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

function mousePressed() {
  circleSize = 0;
  circleColor = color(random(255), random(255), random(255));
  circleFilling = true;
}

function mouseReleased() {
  if (circleFilling) {
    circles.push(new Circle(mouseX, mouseY, circleSize, circleColor));
  }
  circleFilling = false;
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
