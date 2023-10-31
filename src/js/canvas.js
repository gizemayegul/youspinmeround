const cnv = document.getElementById("game-screen");
const ctx = cnv.getContext("2d");

cnv.style.border = "1px solid black";
cnv.width = window.innerWidth;
cnv.height = window.innerHeight;

ctx.lineWidth = 1.5;
let circles = [];
let countOfClick = 0;
let theCount = 20;
let game = null; //game true then win// false game finished
let speed = 0.02;
let distanceOfMainCircle = 2.5;

//create small circles
const mainCircle = new Circle(ctx, 700, 200, 60, "1");
mainCircle.draw();

for (let i = 0; i < theCount; i++) {
  circles.push({
    circle: new Circle(ctx, 700, i * 40 + 500, 15, theCount - i),
    firstY: i * 40 + 500,
  });
  circles[i].circle.draw();
}
