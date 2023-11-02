const nickname = document.getElementsByClassName("nickname");
const saveLocally = document.getElementById("localstorage_test");
const input = document.getElementById("nameinput");
const finishTitle = document.getElementById("finish-title");

saveLocally.addEventListener("click", function () {
  nickname[0].innerHTML =
    "Welcome" + " " + input.value + "<br/>" + "Are you ready to get dizzy?";
  localStorage.setItem("nickname", input.value);
  finishTitle.innerHTML =
    input.value + " " + "you failed the game! 😭 " + "Try again!";
});

window.onload = function () {
  const startButton = document.getElementById("start-button");
  const finishButton = document.getElementById("finish-button");
  const getStartSound = document.getElementById("game-startsound");
  const gameTargetSound = document.getElementById("game-target");

  const game = new Game();

  startButton.addEventListener("click", function () {
    game.start();
    getStartSound.play();
    game.play();
  });
  finishButton.addEventListener("click", function () {
    game.resetGame();
    game.start();
  });

  cnv.addEventListener("click", (e) => {
    game.click(e);
    console.log("clicked"); //!click part needs to be fixed
    gameTargetSound.play();
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === " ") {
      game.click(e);
      console.log("Spacebar key released");
      gameTargetSound.play();
    }
  });

  setInterval(game.update, 1000 / 65); //* for the circles animation
};
