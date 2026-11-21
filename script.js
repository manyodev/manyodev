function pronounceManyo() {
  if (
    !("speechSynthesis" in window) ||
    !("SpeechSynthesisUtterance" in window)
  ) {
    console.error("Speech synthesis is not supported in this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance("마녀");
  utterance.lang = "ko-KR";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

document
  .getElementById("pronounce-manyo")
  ?.addEventListener("click", pronounceManyo);

const clickSound = new Audio("ui.wav");
const buttons = document.getElementsByClassName("window-button");

if (buttons && buttons.length > 0) {
  Array.from(buttons).forEach((btn) => {
    btn.addEventListener("click", () => {
      clickSound.currentTime = 0; // Rewinds to start so rapid clicks replay immediately
      clickSound.play();
    });
  });
}
//
const windows = document.getElementsByClassName("window");
Array.from(windows).forEach(dragElement);

/**
 * Makes an element draggable by mouse.
 * If an HTMLCollection, NodeList, or array is passed, applies dragging to each element.
 * Expects a single HTMLElement or a collection of HTMLElements.
 * @param {HTMLElement|HTMLCollection|NodeList|Array<HTMLElement>} elmnt - The element or collection to make draggable.
 */
function dragElement(elmnt) {
  // If elmnt is an HTMLCollection or NodeList, iterate over each element
  if (
    elmnt instanceof HTMLCollection ||
    Array.isArray(elmnt) ||
    (window.NodeList && elmnt instanceof NodeList)
  ) {
    Array.from(elmnt).forEach((el) => dragElement(el));
    return;
  }

  // Try to find a header inside the window for dragging
  const header = elmnt.querySelector && elmnt.querySelector(".window-header");
  let placeholder;
  if (header) {
    header.onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    if (e.button !== 0 || e.target.closest("button")) return;

    e.preventDefault();
    const rect = elmnt.getBoundingClientRect();
    const grabX = e.clientX - rect.left;
    const grabY = e.clientY - rect.top;

    if (!placeholder) {
      const style = window.getComputedStyle(elmnt);
      placeholder = document.createElement("div");
      placeholder.setAttribute("aria-hidden", "true");
      placeholder.style.boxSizing = "border-box";
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;
      placeholder.style.margin = style.margin;
      placeholder.style.flex = "none";
      placeholder.style.visibility = "hidden";
      elmnt.before(placeholder);
    }

    elmnt.style.position = "fixed";
    elmnt.style.boxSizing = "border-box";
    elmnt.style.width = `${rect.width}px`;
    elmnt.style.margin = "0";
    elmnt.style.left = `${rect.left}px`;
    elmnt.style.top = `${rect.top}px`;

    document.addEventListener("pointermove", elementDrag);
    document.addEventListener("pointerup", closeDragElement);
    document.addEventListener("pointercancel", closeDragElement);

    function elementDrag(moveEvent) {
      moveEvent.preventDefault();
      const maxLeft = Math.max(
        0,
        document.documentElement.clientWidth - rect.width,
      );
      const maxTop = Math.max(
        0,
        document.documentElement.clientHeight - rect.height,
      );
      const left = Math.min(maxLeft, Math.max(0, moveEvent.clientX - grabX));
      const top = Math.min(maxTop, Math.max(0, moveEvent.clientY - grabY));

      elmnt.style.left = `${left}px`;
      elmnt.style.top = `${top}px`;
    }

    function closeDragElement() {
      document.removeEventListener("pointermove", elementDrag);
      document.removeEventListener("pointerup", closeDragElement);
      document.removeEventListener("pointercancel", closeDragElement);
    }
  }
}
//
const player = document.getElementById("player");
if (player) {
  const playPauseButton = document.getElementById("play-pause");
  const muteButton = document.getElementById("volume-mute");
  const captionButton = document.getElementById("caption-toggle");
  const playPauseIcon = playPauseButton?.querySelector("i");
  const muteIcon = muteButton?.querySelector("i");
  const captionIcon = captionButton?.querySelector("i");

  function updatePlayPauseButton() {
    if (!playPauseButton || !playPauseIcon) return;
    const isPaused = player.paused;
    playPauseIcon.classList.toggle("fa-play", isPaused);
    playPauseIcon.classList.toggle("fa-pause", !isPaused);
    playPauseButton.setAttribute(
      "aria-label",
      isPaused ? "Play video" : "Pause video",
    );
  }

  function updateMuteButton() {
    if (!muteButton || !muteIcon) return;
    muteIcon.classList.toggle("fa-volume-xmark", player.muted);
    muteIcon.classList.toggle("fa-volume-high", !player.muted);
    muteButton.setAttribute(
      "aria-label",
      player.muted ? "Unmute video" : "Mute video",
    );
    muteButton.setAttribute("aria-pressed", String(player.muted));
  }

  function updateCaptionButton() {
    if (!captionButton || !captionIcon || player.textTracks.length === 0)
      return;
    const captionsOn = player.textTracks[0].mode === "showing";
    captionIcon.classList.toggle("fa-closed-captioning", captionsOn);
    captionIcon.classList.toggle("fa-comment-slash", !captionsOn);
    captionButton.setAttribute(
      "aria-label",
      captionsOn ? "Turn captions off" : "Turn captions on",
    );
    captionButton.setAttribute("aria-pressed", String(captionsOn));
  }

  playPauseButton?.addEventListener("click", function () {
    player.paused ? player.play() : player.pause();
  });
  player.addEventListener("play", updatePlayPauseButton);
  player.addEventListener("pause", updatePlayPauseButton);
  updatePlayPauseButton();

  document.getElementById("volume-up")?.addEventListener("click", function () {
    player.volume = Math.min(1, player.volume + 0.1);
  });
  document
    .getElementById("volume-down")
    ?.addEventListener("click", function () {
      player.volume = Math.max(0, player.volume - 0.1);
    });
  muteButton?.addEventListener("click", function () {
    player.muted = !player.muted;
    updateMuteButton();
  });
  updateMuteButton();

  // Toggles the visibility of the first text track (captions/subtitles).
  captionButton?.addEventListener("click", function () {
    if (player.textTracks.length === 0) return;
    const track = player.textTracks[0];
    track.mode = track.mode === "showing" ? "hidden" : "showing";
    updateCaptionButton();
  });
  player.textTracks.addEventListener("change", updateCaptionButton);
  updateCaptionButton();
}
//
// 1. Set your target date (always use ISO format with explicit timezone offset, e.g., "YYYY-MM-DDTHH:MM:SS±HH:MM", for reliability across browsers)
const targetDate = new Date("2027-06-14T19:30:00-05:00").getTime();
const display = document.getElementById("countdown");
let timerInterval;

function updateCountdown() {
  if (!display) return;

  const now = Date.now();
  const distance = targetDate - now;

  // 2. Stop the timer when the countdown finishes
  if (distance <= 0) {
    clearInterval(timerInterval);
    display.textContent = "Countdown complete!";
    return;
  }

  // 3. Calculate days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // 4. Format with leading zeros (e.g., "09" instead of "9") and render
  const pad = (num) => String(num).padStart(2, "0");
  display.textContent = `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

// Run immediately to avoid a 1-second initial delay, then repeat every second
if (display) {
  updateCountdown();
  timerInterval = setInterval(updateCountdown, 1000);
}
//
const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);

let ytplayer;
window.onYouTubeIframeAPIReady = function () {
  const ytplayerElement = document.getElementById("ytplayer");
  if (!ytplayerElement) return;

  // Get videoId from data attribute, fallback to default if not set
  const videoId = ytplayerElement.dataset.videoId || "Pc34Lf6xyJQ";
  ytplayer = new YT.Player(ytplayerElement, {
    videoId: videoId,
    playerVars: {
      controls: 0,
      playsinline: 1,
      mute: 1,
      autoplay: 1,
      rel: 0,
    },
    events: {
      onReady(event) {
        event.target.mute();
        event.target.playVideo();

        // Setup controls and event listeners after ytplayer is ready
        const ytplayPauseButton = document.getElementById("yt-play-pause");
        const ytmuteButton = document.getElementById("yt-volume-mute");
        const ytplayPauseIcon = ytplayPauseButton?.querySelector("i");
        const ytmuteIcon = ytmuteButton?.querySelector("i");

        function isPaused() {
          // YT.Player does not have a direct 'paused' property, so check player state
          return event.target.getPlayerState() !== YT.PlayerState.PLAYING;
        }

        function isMuted() {
          return event.target.isMuted();
        }

        function updatePlayPauseButton() {
          if (!ytplayPauseButton || !ytplayPauseIcon) return;
          const paused = isPaused();
          ytplayPauseIcon.classList.toggle("fa-play", paused);
          ytplayPauseIcon.classList.toggle("fa-pause", !paused);
          ytplayPauseButton.setAttribute(
            "aria-label",
            paused ? "Play video" : "Pause video",
          );
        }

        function updateMuteButton() {
          if (!ytmuteButton || !ytmuteIcon) return;
          const muted = isMuted();
          ytmuteIcon.classList.toggle("fa-volume-xmark", muted);
          ytmuteIcon.classList.toggle("fa-volume-high", !muted);
          ytmuteButton.setAttribute(
            "aria-label",
            muted ? "Unmute video" : "Mute video",
          );
          ytmuteButton.setAttribute("aria-pressed", String(muted));
        }

        ytplayPauseButton?.addEventListener("click", function () {
          if (isPaused()) {
            event.target.playVideo();
          } else {
            event.target.pauseVideo();
          }
        });

        // Listen for state changes to update play/pause button
        event.target.addEventListener("onStateChange", function (e) {
          updatePlayPauseButton();
        });

        document
          .getElementById("yt-volume-up")
          ?.addEventListener("click", function () {
            let currentVolume = event.target.getVolume();
            event.target.setVolume(Math.min(100, currentVolume + 10));
          });
        document
          .getElementById("yt-volume-down")
          ?.addEventListener("click", function () {
            let currentVolume = event.target.getVolume();
            event.target.setVolume(Math.max(0, currentVolume - 10));
          });
        ytmuteButton?.addEventListener("click", function () {
          if (isMuted()) {
            event.target.unMute();
          } else {
            event.target.mute();
          }
          updateMuteButton();
        });

        // Initial update
        updatePlayPauseButton();
        updateMuteButton();
      },
    },
  });
};
//

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

if (button) {
  button.addEventListener("click", copyEmail);
}

// When game is hovered, hover teckstack
const hoverGame1 = document.querySelector("#game1");
const game1Tech = document.querySelectorAll(".fa-html5, .fa-css3-alt, .fa-js");
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
const game3Tech = document.querySelectorAll(
  ".fa-html5, .fa-css3-alt, .fa-js, .fa-python",
);
if (hoverGame3) {
  hoverGame3.addEventListener("mouseenter", () => {
    game3Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame3.addEventListener("mouseleave", () => {
    game3Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 4
const hoverGame4 = document.querySelector("#game4");
const game4Tech = document.querySelectorAll(".fa-html5, .fa-css3-alt, .fa-js");
if (hoverGame4) {
  hoverGame4.addEventListener("mouseenter", () => {
    game4Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame4.addEventListener("mouseleave", () => {
    game4Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 5
const hoverGame5 = document.querySelector("#game5");
const game5Tech = document.querySelectorAll(".fa-html5, .fa-css3-alt, .fa-js");
if (hoverGame5) {
  hoverGame5.addEventListener("mouseenter", () => {
    game5Tech.forEach((el) => el.classList.add("is-hovered"));
  });

  hoverGame5.addEventListener("mouseleave", () => {
    game5Tech.forEach((el) => el.classList.remove("is-hovered"));
  });
}
// game 6
const hoverGame6 = document.querySelector("#game6");
const game6Tech = document.querySelectorAll(
  ".fa-html5, .fa-css3-alt, .fa-js, .fa-python, .cpp",
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
  if (!game6Page1 || !game6Page2) return;

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
  ?.addEventListener("click", () => showGame6Page(2));
document
  .getElementById("toGame6Page1")
  ?.addEventListener("click", () => showGame6Page(1));
