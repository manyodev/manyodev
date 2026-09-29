function copyEmail() {
  var copyText = document.getElementById("email");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(copyText.value);
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Email copied to clipboard!";
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}
const button = document.getElementById("emailBtn");

button.addEventListener("click", copyEmail);

// When game is hovered, hover teckstack
const hoverGame1 = document.querySelector("#game1");
const game1Tech = document.querySelectorAll(".fa-html5, .fa-css, .fa-js");
if (hoverGame1) {
  hoverGame1.addEventListener("mouseenter", () => {
    game1Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame1.addEventListener("mouseleave", () => {
    game1Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 2
const hoverGame2 = document.querySelector("#game2");
const game2Tech = document.querySelectorAll(".fa-python");
if (hoverGame2) {
  hoverGame2.addEventListener("mouseenter", () => {
    game2Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame2.addEventListener("mouseleave", () => {
    game2Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 3
const hoverGame3 = document.querySelector("#game3");
const game3Tech = document.querySelectorAll(".fa-unity");
if (hoverGame3) {
  hoverGame3.addEventListener("mouseenter", () => {
    game3Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame3.addEventListener("mouseleave", () => {
    game3Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 4
// game 5
// game 6
const hoverGame6 = document.querySelector("#game6");
const game6Tech = document.querySelectorAll(
  ".fa-html5, .fa-css, .fa-js, .fa-python, .cpp",
);
if (hoverGame6) {
  hoverGame6.addEventListener("mouseenter", () => {
    game6Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame6.addEventListener("mouseleave", () => {
    game6Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// back to menu
const menu = document.querySelector("#menuScreen");
const game1Scene = document.querySelector("#game1Scene");
const game2Scene = document.querySelector("#game2Scene");
const game3Scene = document.querySelector("#game3Scene");
const game4Scene = document.querySelector("#game4Scene");
const game5Scene = document.querySelector("#game5Scene");
const game6Scene = document.querySelector("#game6Scene");
const game6Page1 = document.querySelector(".game6page1");
const game6Page2 = document.querySelector(".game6page2");

function showGame6Page(page) {
  const showingPage1 = page === 1;
  game6Page1.classList.toggle("hide", !showingPage1);
  game6Page2.classList.toggle("hide", showingPage1);
}

function backToMenu() {
  const scenes = [
    game1Scene,
    game2Scene,
    game3Scene,
    game4Scene,
    game5Scene,
    game6Scene,
  ];
  scenes.forEach((s) => {
    if (s) {
      s.classList.remove("show");
      s.classList.add("hide");
    }
  });
  if (menu) {
    menu.classList.remove("hide");
    menu.classList.add("show");
  }
  showGame6Page(1);
}
const menuButton = document.querySelectorAll(
  "#toMenu, #toMenu2, #toMenu3, #toMenu4, #toMenu5, #toMenu6",
);
if (menuButton && menuButton.length) {
  menuButton.forEach((btn) => btn.addEventListener("click", backToMenu));
}
//* open game 1
function showGame(scene) {
  const scenes = [
    game1Scene,
    game2Scene,
    game3Scene,
    game4Scene,
    game5Scene,
    game6Scene,
  ];
  scenes.forEach((s) => {
    if (s) {
      if (s.id === scene.id) {
        s.classList.remove("hide");
        s.classList.add("show");
      } else {
        s.classList.remove("show");
        s.classList.add("hide");
      }
    }
  });
  if (menu) {
    menu.classList.remove("show");
    menu.classList.add("hide");
  }
}

function clickGame1() {
  if (game1Scene) showGame(game1Scene);
}

const game1Button = document.getElementById("game1");
if (game1Button) {
  game1Button.addEventListener("click", clickGame1);
}
// open game 2
function clickGame2() {
  if (game2Scene) showGame(game2Scene);
}

const game2Button = document.getElementById("game2");
if (game2Button) {
  game2Button.addEventListener("click", clickGame2);
}
// open game 3
function clickGame3() {
  if (game3Scene) showGame(game3Scene);
}

const game3Button = document.getElementById("game3");
if (game3Button) {
  game3Button.addEventListener("click", clickGame3);
}
// open game 4
function clickGame4() {
  if (game4Scene) showGame(game4Scene);
}

const game4Button = document.getElementById("game4");
if (game4Button) {
  game4Button.addEventListener("click", clickGame4);
}
// open game 5
function clickGame5() {
  if (game5Scene) showGame(game5Scene);
}

const game5Button = document.getElementById("game5");
if (game5Button) {
  game5Button.addEventListener("click", clickGame5);
}
// open game 6
function clickGame6() {
  if (game6Scene) {
    showGame6Page(1);
    showGame(game6Scene);
  }
}

const game6Button = document.getElementById("game6");
if (game6Button) {
  game6Button.addEventListener("click", clickGame6);
}

document
  .getElementById("toGame6Page2")
  .addEventListener("click", () => showGame6Page(2));
document
  .getElementById("toGame6Page1")
  .addEventListener("click", () => showGame6Page(1));
