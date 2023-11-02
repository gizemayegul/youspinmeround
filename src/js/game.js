class Game {
  constructor() {
    this.gameScreen = document.getElementById("game-screen");
    this.gameStart = document.getElementById("start-page");
    this.finishPage = document.getElementById("finish-page");
    this.endGameSound = document.getElementById("game-endsound");
    this.winGameSound = document.getElementById("game-win");

    //this.element = document.createElement("span");
    // this.element.innerHTML = this.nickname;
    // this.finishPage.appendChild(this.element);
  }

  start() {
    this.gameScreen.style.display = "block";
    this.gameStart.style.display = "none";
    this.gameLoop();
  }
  gameLoop() {
    console.log("in the game loop");
    if (game === false) {
      console.log("Your nickname is " + this.nickname);
      this.endGameSound.play();
      setTimeout(() => {
        localStorage.removeItem("nickname");
        this.gameScreen.style.display = "none";
        this.finishPage.style.display = "block";
      }, 2200); //* Delaying the screen changes

      return;
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
          circles[countOfClick].circle.x <= circle.x + 15 && //! the collision part should be improved
          //! make a better explanation
          circle.y >= mainCircle.y / 2
        ) {
          game = false;
          return;
        }
      });
      circles[countOfClick].circle.isFree = false;
      countOfClick++;
      if (countOfClick === theCount) {
        game = true; //* game wind
        if (game) {
          this.winGameSound.play();
          setTimeout(() => {
            this.finishPage.style.display = "none";
            this.gameStart.style.display = "none";
            this.changeLevel();
          }, 2000);

          // setTimeout(() => {
          //   this.finishPage.style.display = "none";
          //   this.gameScreen.style.display = "none";
          //   this.gameStart.style.display = "block";
          //   this.resetGame();
          // }, 2000); //* delayin the screen
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
      speed -= speed > 0 ? 0.00025 : 0; //* to stop the animation
      distanceOfMainCircle += distanceOfMainCircle < 10 ? 0.05 : 0; //! changes the distance of the main circle to get the  animation
    } else {
      ctx.fillStyle = "#F08080";
      speed -= speed > 0 ? 0.00025 : 0; //* to stop the animation
      distanceOfMainCircle += distanceOfMainCircle > 0 ? 0.05 : 0; // the distance is increa //! check the logic better
    }
    ctx.fillRect(0, 0, cnv.width, cnv.height); //* to clan the canvas

    circles.forEach((circle) => {
      const firstY = circle.firstY; //* this is the y position of the small circles
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
    mainCircle.draw(); //* each rotation draws the main circle
  }

  changeLevel() {
    if (game) {
      mainCircle.text += 1;
      this.gameStart.style.display = "none";
      theCount = getRandomInt(5, 20); //* this could be random !
      speed += 0.02; //add random speed to speed

      theLevel += 1;
      circles = [];
      distanceOfMainCircle = 2.5;
      countOfClick = 0;
      game = null; //game true then win// se game finished
      this.isFree = true;
      for (let i = 0; i < theCount; i++) {
        circles.push({
          circle: new Circle(ctx, 700, i * 40 + 500, 15, theCount - i),
          firstY: i * 40 + 500,
        });
        circles[i].circle.draw();
      }
    }

    //window.location.reload();
  }
  resetGame() {
    this.finishPage.style.display = "none";
    circles = [];
    mainCircle.text = 1;
    distanceOfMainCircle = 2.5;
    countOfClick = 0;
    theCount = 5;
    game = null; //game true then win// se game finished
    speed = 0.02;
    for (let i = 0; i < theCount; i++) {
      circles.push({
        circle: new Circle(ctx, 700, i * 40 + 200, 15, theCount - i),
        firstY: i * 40 + 500,
      });
      circles[i].circle.draw();
    }
  }
}
