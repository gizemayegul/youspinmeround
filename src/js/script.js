window.onload = function () {
  const startButton = document.getElementById("start-button");
  const finishButton = document.getElementById("finish-button");
  const getStartSound = document.getElementById("game-startsound");
  const gameTargetSound = document.getElementById("game-target");
  const game = new Game();

  startButton.addEventListener("click", function () {
    game.start();
    getStartSound.play();
  });
  finishButton.addEventListener("click", function () {
    game.resetGame();
    game.start();
  });

  window.addEventListener("keyup", (e) => {
    e.key === " " ? game.click(e) : null;
    console.log("clicked"); //!click part needs to be fixed
    gameTargetSound.play();
  });

  cnv.addEventListener("click", (e) => {
    game.click(e);
  });

  setInterval(game.update, 1000 / 65); //* for the circles animation
};
