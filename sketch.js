// new Q5('global');

let circleFilling = false;
let end = false;
let circleSize = 0;
let totalArea = 0;
let circleColor, circleArea, restartButton;

let canvas;
const circles = [];
const width = 500;
const height = 500;
const diameter = 10;
const lineWidth = 2;

function setup() {
  reset();

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
  canvas = createCanvas(width, height); // redraw canvas / clear all
  end = false; // set to not end
  circles.length = 0; // reset array
  totalArea = 0; //reset global counter
  background(200);
}

function draw() {
  background(200); // set canvas background color / clear canvas
  // active conditions
  if (circleFilling && !end) {
    circleSize += diameter / 5; // increase speed of circle diameter growth
    circleArea = (circleSize / 2) ** 2 * PI; // area of a circle r2*pi
    totalArea = totalArea + circleArea; // add to total drawn area

    endConditions(); // check if end condition exists

    fill(circleColor); // fill circle with color
    circle(mouseX, mouseY, circleSize); // make circle
  }

  for (const c of circles) c.draw(); // draw all circles in the array of circles

  txtMsg(
    'Area saved: ' + numberWithDots(round(totalArea)) + ' pixels',
    20,
    20,
    12
  );
  txtMsg('Number of balloons : ' + circles.length, 20, 40, 12);

  if (end) {
    textAlign(CENTER);
    txtMsg(
      'FINAL SCORE: ' + numberWithDots(round(totalArea)) + ' pixels',
      canvas.width / 2,
      canvas.height / 2 - 40,
      14
    );

    console.log(getAwardLvl());
    txtMsg('YOU ARE: ' + getAwardLvl(), canvas.width / 2, canvas.height / 2, 36);

    txtMsg(
      'TOTAL NUMBER OF CREATED CIRCLES: ' + circles.length,
      canvas.width / 2,
      canvas.height / 2 + 20,
      14
    );
  }
}

function getAwardLvl() {
  // prettier-ignore
  const awards = [
    'begginer','junior','amateur','professional','senior','expert','...you rule','amazing','insane','unbelievable','worship',
  ];
  let level = 0;
  // add calculation for award
  if (circles.length > 2 && totalArea > 5000) level = 1;
  if (circles.length > 2 && totalArea > 10000) level = 2;
  if (circles.length > 3 && totalArea > 50000) level = 3;
  if (circles.length > 4 && totalArea > 100000) level = 4;
  if (circles.length > 5 && totalArea > 500000) level = 5;
  if (circles.length > 6 && totalArea > 1000000) level = 6;
  if (circles.length > 7 && totalArea > 2000000) level = 7;
  if (circles.length > 8 && totalArea > 3000000) level = 8;
  if (circles.length > 9 && totalArea > 4000000) level = 9;
  if (circles.length > 10 && totalArea > 5000000) level = 10;

  return awards[level].toUpperCase();
}

function txtMsg(txt, x, y, s) {
  fill(50);
  textSize(s);
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
  if (circleFilling && !end)
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
