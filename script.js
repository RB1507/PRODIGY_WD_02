let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timer = document.getElementById("timer");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

lapBtn.style.display = "none";

//format
function timeToString(time) {
    const ms = time % 1000;
    const totalSeconds = Math.floor(time / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(ms).padStart(3, "0")}`;
}

function print(txt) {
    timer.innerText = txt;
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 10);
    startStopBtn.textContent = "Pause";
    isRunning = true;
    lapBtn.style.display = "inline-block";
}

function pauseTimer() {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    isRunning = false;
    lapBtn.style.display = "none";
}

/// logic
startStopBtn.addEventListener("click", () => {
    isRunning ? pauseTimer() : startTimer();
});

// Reset button logic
resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    print("00:00:00.000");
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = "Start";
    laps.innerHTML = "";
    lapBtn.style.display = "none";
});
// Lap button logic
lapBtn.addEventListener("click", () => {
    if (isRunning) {
        const li = document.createElement("li");
        li.textContent = timeToString(elapsedTime);
        laps.appendChild(li);
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "a") startStopBtn.click();
    if (e.key === "w") resetBtn.click();
    if (e.key === "d") lapBtn.click();
});

const toggle = document.getElementById("themeToggle");
const body = document.body;

if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    toggle.checked = true;
}
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        body.classList.add("light-mode");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark");
    }
});