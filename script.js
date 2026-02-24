// When game is hovered, hover teckstack
const hoverGame1 = document.querySelector("#game1");
const game1Tech = document.querySelectorAll(".fa-html5, .fa-css, .fa-js");

hoverGame1.addEventListener("mouseenter", () => {
  game1Tech.forEach((el) => el.classList.add("is-hovered"));
});

hoverGame1.addEventListener("mouseleave", () => {
  game1Tech.forEach((el) => el.classList.remove("is-hovered"));
});
// game 2
const hoverGame2 = document.querySelector("#game2");
const game2Tech = document.querySelectorAll(".fa-html5, .fa-css");

hoverGame2.addEventListener("mouseenter", () => {
  game2Tech.forEach((el) => el.classList.add("is-hovered"));
});

hoverGame2.addEventListener("mouseleave", () => {
  game2Tech.forEach((el) => el.classList.remove("is-hovered"));
});
// game 3
const hoverGame3 = document.querySelector("#game3");
const game3Tech = document.querySelectorAll(".fa-html5, .fa-css");

hoverGame3.addEventListener("mouseenter", () => {
  game3Tech.forEach((el) => el.classList.add("is-hovered"));
});

hoverGame3.addEventListener("mouseleave", () => {
  game3Tech.forEach((el) => el.classList.remove("is-hovered"));
});
// back to menu
const menu = document.querySelector("#menuScreen");
const game1Scene = document.querySelector("#game1Scene");
const game2Scene = document.querySelector("#game2Scene");
const game3Scene = document.querySelector("#game3Scene");
const game4Scene = document.querySelector("#game4Scene");
const game5Scene = document.querySelector("#game5Scene");
const game6Scene = document.querySelector("#game6Scene");

function backToMenu() {
  console.log("Closing game!");
  game1Scene.classList.remove("show");
  game1Scene.classList.add("hide");
  game2Scene.classList.remove("show");
  game2Scene.classList.add("hide");
  game3Scene.classList.remove("show");
  game3Scene.classList.add("hide");
  game4Scene.classList.remove("show");
  game4Scene.classList.add("hide");
  game5Scene.classList.remove("show");
  game5Scene.classList.add("hide");
  game6Scene.classList.remove("show");
  game6Scene.classList.add("hide");
  console.log("Game closed! Opening menu..");
  menu.classList.remove("hide");
  console.log("Menu opened!");
}
const menuButton = document.querySelectorAll(
  "#toMenu, #toMenu2, #toMenu3, #toMenu4, #toMenu5, #toMenu6",
);
menuButton.forEach((menuButton) => {
  if (menuButton) {
    menuButton.addEventListener("click", backToMenu);
  }
});
//* open game 1
function clickGame1() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game1Scene.classList.remove("hide");
  game1Scene.classList.add("show");
  console.log("Game opened!");
}

const game1Button = document.getElementById("game1");
if (game1Button) {
  game1Button.addEventListener("click", clickGame1);
}
// open game 2
function clickGame2() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game2Scene.classList.remove("hide");
  game2Scene.classList.add("show");
  console.log("Game opened!");
}

const game2Button = document.getElementById("game2");
if (game2Button) {
  game2Button.addEventListener("click", clickGame2);
}
// open game 3
function clickGame3() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game3Scene.classList.remove("hide");
  game3Scene.classList.add("show");
  console.log("Game opened!");
}

const game3Button = document.getElementById("game3");
if (game3Button) {
  game3Button.addEventListener("click", clickGame3);
}
// open game 4
function clickGame4() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game4Scene.classList.remove("hide");
  game4Scene.classList.add("show");
  console.log("Game opened!");
}

const game4Button = document.getElementById("game4");
if (game4Button) {
  game4Button.addEventListener("click", clickGame4);
}
// open game 5
function clickGame5() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game5Scene.classList.remove("hide");
  game5Scene.classList.add("show");
  console.log("Game opened!");
}

const game5Button = document.getElementById("game5");
if (game5Button) {
  game5Button.addEventListener("click", clickGame5);
}
// open game 6
function clickGame6() {
  console.log("Closing menu!");
  menu.classList.add("hide");
  console.log("Menu closed!");
  console.log("Opening game!");
  game6Scene.classList.remove("hide");
  game6Scene.classList.add("show");
  console.log("Game opened!");
}

const game6Button = document.getElementById("game6");
if (game6Button) {
  game6Button.addEventListener("click", clickGame6);
}
// Game 1 -
