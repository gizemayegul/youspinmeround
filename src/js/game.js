class Game {
  constructor() {
    this.gameScreen = document.getElementById("game-screen");
    this.gameStart = document.getElementById("start-page");
    this.finishPage = document.getElementById("finish-page");
  }

  start() {
    this.gameScreen.style.display = "block";
    this.gameStart.style.display = "none";
    if (game) {
      this.gameStart.style.backgroundColor = "green";
    } else if (game === false) {
      this.gameStart.style.backgroundColor = "red";
    }
    this.gameLoop();
  }
  gameLoop() {
    console.log("in the game loop");
    if (game === false) {
      //this.resetGame();
      setTimeout(() => {
        this.gameScreen.style.display = "none";
        this.finishPage.style.display = "block";
        console.log("game is finished");
      }, 1000); // Delay

      return console.log("game is finished");
    }

    window.requestAnimationFrame(() => this.gameLoop());
  }
  click() {
    if (game === null) {
      circles.forEach((circle) => {
        circle = circle.circle;
        if (circle.isFree) return;
        if (
          circles[countOfClick].circle.x >= circle.x - 25 &&
          circles[countOfClick].circle.x <= circle.x + 15 + 3 &&
          circle.y >= mainCircle.y / 2
        ) {
          game = false;
          return;
        }
      });
      circles[countOfClick].circle.isFree = false;
      countOfClick++;
      if (countOfClick === theCount) {
        game = true; // game wind
        //bring the start screen
        //hoW?
        if (game) {
          setTimeout(() => {
            this.finishPage.style.display = "none";
            this.gameScreen.style.display = "none";
            this.gameStart.style.display = "block";
            console.log("game is finished");
            this.resetGame();
          }, 2000); // Delay
        }
      }
    } else if (countOfClick === theCount && game === false) {
      game = false;
      window.location.reload();
    }
  }

  update() {
    if (game === null) {
      ctx.fillStyle = "antiquewhite";
    } else if (game) {
      ctx.fillStyle = "#98C9A6";
      speed -= speed > 0 ? 0.00025 : 0;
      distanceOfMainCircle += distanceOfMainCircle < 10 ? 0.05 : 0;
    } else {
      ctx.fillStyle = "#F08080";
      speed -= speed > 0 ? 0.00025 : 0; //animation
      distanceOfMainCircle += distanceOfMainCircle > 0 ? 0.05 : 0; // the distance is increa
    }
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    circles.forEach((circle) => {
      const firstY = circle.firstY; // this is the y position of the first circle
      circle = circle.circle;

      if (circle.isFree) {
        const y = firstY - countOfClick * 40; //
        circle.translate(circle.x, y);
      } else {
        circle.translate(
          mainCircle.x +
            Math.cos(circle.angle) * mainCircle.r * distanceOfMainCircle,
          mainCircle.y +
            Math.sin(circle.angle) * mainCircle.r * distanceOfMainCircle
        );
        circle.angle += speed;

        circle.line(circle.x, circle.y, mainCircle.x, mainCircle.y);
      }
      circle.draw();
    });
    mainCircle.draw();
  }

  resetGame() {
    this.finishPage.style.display = "none";
    circles = [];
    distanceOfMainCircle = 2.5;
    countOfClick = 0;
    theCount = 20;
    game = null; //game true then win// se game finished
    speed = 0.02;
    for (let i = 0; i < theCount; i++) {
      circles.push({
        circle: new Circle(ctx, 700, i * 40 + 500, 15, theCount - i),
        firstY: i * 40 + 500,
      });
      circles[i].circle.draw();
    }
  }
}
