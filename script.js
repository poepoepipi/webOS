function UpdateTime() {
  const timeText = document.querySelector("#TimeElement");
  if (timeText) {
    timeText.innerHTML = new Date().toLocaleString();
  }
}
setInterval(UpdateTime, 1000);

const welcomeScreen = document.querySelector("#welcome");
const welcomeScreenClose = document.querySelector("#welcomeclose");
const welcomeScreenOpen = document.querySelector("#welcomeopen");

function closeWindow(el) {
  el.style.display = "none";
}

function openWindow(el) {
  el.style.display = "block";
}

if (welcomeScreenClose) {
  welcomeScreenClose.addEventListener("click", () => {
    closeWindow(welcomeScreen);
  });
}

if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", () => {
    openWindow(welcomeScreen);
  });
}

function dragElement(win, handle) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;

    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    win.classList.remove("maximized");
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
    win.style.transform = "none";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

const win = document.getElementById("welcome");
const bar = document.getElementById("dragBar");
const closeBtn = document.getElementById("closeBtn");

if (win && bar) {
  dragElement(win, bar);
}

if (closeBtn && win) {
  closeBtn.addEventListener("click", () => {
    win.style.display = "none";
  });
}

if (bar && win) {
  bar.addEventListener("dblclick", () => {
    win.classList.toggle("maximized");
  });
}

const fullscreenBtn = document.getElementById("fullscreenBtn");
const win = document.getElementById("welcome");

let isMaximized = false;
let prevState = { top: 0, left: 0, width: 0, height: 0, transform: "" };

if (fullscreenBtn) {
  fullscreenBtn.addEventListener("click", () => {

    if (!isMaximized) {
      // save current position
      const rect = win.getBoundingClientRect();
      prevState = {
        top: win.style.top,
        left: win.style.left,
        width: win.style.width,
        height: win.style.height,
        transform: win.style.transform
      };

      // maximize
      win.classList.add("maximized");
      isMaximized = true;

    } else {
      // restore
      win.classList.remove("maximized");

      win.style.top = prevState.top;
      win.style.left = prevState.left;
      win.style.width = prevState.width;
      win.style.height = prevState.height;
      win.style.transform = prevState.transform;

      isMaximized = false;
    }
  });
}