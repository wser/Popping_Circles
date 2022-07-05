// new Q5('global');

let circleFilling = false;
let end = false;
let circleSize = 0;
let totalArea = 0;
let circleColor, circleArea, restartButton;

let can;
const circles = [];
const width = 500;
const height = 500;
const diameter = 10;

function setup() {
  restart();

  can.mousePressed(() => {
    circleSize = 0; // initial circle size
    circleColor = color(random(255), random(255), random(255)); // set that circle random color to fill with
    circleFilling = true; // start to fill circle
  });

  restartButton = createButton('restart');
  restartButton.mousePressed(restart);
}

function restart() {
  can = createCanvas(width, height); // redraw can / clear all
  end = false; // set to not end
  circles.length = 0; // reset array
  totalArea = 0; //reset global counter
  strokeWeight(1); // line thickness
}

function draw() {
  background(230); // set can background color / clear can
  restartButton.hide(); // hide reset button

  if (circleFilling && !end) {
    circleSize += diameter / 3; // increase speed of circle diameter growth
    circleArea = (circleSize / 2) ** 2 * PI; // area of a circle r2*pi
    totalArea = totalArea + circleArea; // add to total drawn area

    endConditions(); // check if end condition exists

    fill(circleColor); // fill circle with color
    circle(mouseX, mouseY, circleSize); // make circle
  }

  for (const c of circles) c.draw(); // draw all circles in the array of circles

  showScore(); // display current score results in front of circles

  if (end) {
    restartButton.position(can.width / 2 - 80, can.height / 2 + 80);
    restartButton.size(160, 50);
    textAlign(CENTER);
    restartButton.show();

    endText();
  }
}

function showScore() {
  textAlign(LEFT);
  fill(50);
  textSize(12);

  text('Area: ' + numberWithDots(round(totalArea)) + ' pixels', 20, 20);
  text('Balloons : ' + circles.length, 20, 40);
}

function endText() {
  textAlign(CENTER);
  fill(50);
  textSize(14);

  text(
    'FINAL SCORE: ' + numberWithDots(round(totalArea)) + ' pixels',
    can.width / 2,
    can.height / 2 - 40
  );

  text(
    'TOTAL NUMBER OF CREATED CIRCLES: ' + circles.length,
    can.width / 2,
    can.height / 2 + 20
  );

  textSize(36);
  text('YOU ARE: ' + getAwardLvl(), can.width / 2, can.height / 2);

  stroke(255, 204, 0);
  strokeWeight(4);
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
    this.color.setAlpha(128 + 128 * sin(millis() / 500));
  }
}
