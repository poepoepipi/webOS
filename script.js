const topbarClock = document.getElementById("clock");
const desktopIcons = document.querySelectorAll(".desktop-icon");
const windows = document.querySelectorAll(".window");
let topZ = 1;

function updateClock() {
  const now = new Date();
  topbarClock.textContent = now.toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

function bringToFront(win) {
  topZ += 1;
  win.style.zIndex = topZ;
}

function openWindow(id) {
  const win = document.getElementById(id);
  if (!win) return;
  win.style.display = "block";
  bringToFront(win);
}

function closeWindow(win) {
  win.style.display = "none";
}

desktopIcons.forEach(icon => {
  icon.addEventListener("click", () => {
    openWindow(icon.dataset.open);
  });
});

windows.forEach(win => {
  const header = win.querySelector(".window-header");
  const closeBtn = win.querySelector(".close-btn");

  bringToFront(win);

  closeBtn.addEventListener("click", () => {
    closeWindow(win);
  });

  win.addEventListener("mousedown", () => {
    bringToFront(win);
  });

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    bringToFront(win);

    const rect = win.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    win.style.left = (e.clientX - offsetX) + "px";
    win.style.top = (e.clientY - offsetY) + "px";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
});

const calcInput = document.getElementById("calcInput");
const calcButton = document.getElementById("calcButton");
const calcResult = document.getElementById("calcResult");

calcButton.addEventListener("click", () => {
  try {
    const value = calcInput.value;
    const result = eval(value);
    calcResult.textContent = "Result: " + result;
  } catch (error) {
    calcResult.textContent = "Invalid expression.";
  }
});