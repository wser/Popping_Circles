// new Q5('global');

let circleFilling = false;
let end = false;
let circleSize = 0;
let totalArea = 0;
let circleColor, circleArea, restartButton;

const circles = [];
const width = 500;
const height = 500;
const diameter = 10;
const lineWidth = 2;

function setup() {
  const canvas = createCanvas(width, height); // create canvas to draw on
  canvas.mousePressed(() => {
    circleSize = 0; // initial circle size
    circleColor = color(random(255), random(255), random(255)); // set that circle random color to fill with
    circleFilling = true; // start to fill circle
    strokeWeight(lineWidth); // line thickness
  });

  restartButton = createButton('restart');
  restartButton.mousePressed(reset);
}

function reset() {
  background(200);
  end = false;
  circles.length = 0; // = [];
  totalArea = 0;
  console.log('hello');
}

function draw() {
  background(200); // set canvas background color / clear canvas
  if (circleFilling && !end) {
    circleSize += diameter / 5; // increase speed of circle diameter growth
    circleArea = (circleSize / 2) ** 2 * PI; // area of a circle r2*pi
    totalArea = totalArea + circleArea; // add to total drawn area

    endConditions(); // check if end condition exists

    fill(circleColor); // fill circle with color
    circle(mouseX, mouseY, circleSize); // make circle
  }

  for (const c of circles) c.draw(); // draw all circles in the array of circles

  txtMsg('Total area: ' + numberWithDots(round(totalArea)) + ' pixels', 20, 20);

  if (end) {
    background(200);
    textAlign(CENTER);
    txtMsg(
      'FINAL SCORE: ' + numberWithDots(round(totalArea)) + ' pixels',
      canvas.width / 2,
      canvas.height / 2
    );
  }
}

function txtMsg(txt, x, y) {
  fill(50);
  text(txt, x, y);
}

function endConditions() {
  const overlappingCircle = getOverlappingCircle();
  if (overlappingCircle) {
    circleFilling = false; // stop filling if circles collide
    circles.splice(circles.indexOf(overlappingCircle), 1); // remove active circle and touched one
    end = true;
  }

  if (isOffCanvas()) {
    circleFilling = false; // stop drawing if is offscreen
    end = true;
  }
}

function getOverlappingCircle() {
  for (const c of circles)
    if (dist(c.x, c.y, mouseX, mouseY) < circleSize / 2 + c.size / 2 + 2)
      return c;

  return undefined;
}

function isOffCanvas() {
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
    // this.color.setAlpha(128 + 128 * sin(millis() / 500));
  }
}
