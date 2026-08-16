const words = [
"apple", "river", "cloud", "light", "stone", "dream", "green",
"quick", "house", "world", "night", "water", "music", "space",
"plant", "fire", "ocean", "pixel", "sound", "storm", "shadow",
"bright", "future", "simple", "random", "window", "coffee",
"forest", "summer", "winter", "orange", "silver", "yellow",
"rocket", "energy", "circle", "camera", "memory", "travel"
];

const wordsContainer = document.getElementById("words");
const input = document.getElementById("input");
const scoreElement = document.getElementById("score");
const accuracyElement = document.getElementById("accuracy");
const wpmElement = document.getElementById("wpm");
const streakElement = document.getElementById("streak");
const restartButton = document.getElementById("restart");
const playArea = document.getElementById("playArea");

let score = 0;
let streak = 0;
let typed = 0;
let correct = 0;
let speed = 11;
let activeWord = null;
let startTime = null;
let gameTimer = null;

function randomWord() {
return words[Math.floor(Math.random() * words.length)];
}

function createWord() {
const element = document.createElement("div");
element.className = "word";
element.textContent = randomWord();
const top = Math.floor(Math.random() * 55) + 8;
const duration = speed + Math.random() * 2;
element.style.setProperty("--top", `${top}%`);
element.style.setProperty("--speed", `${duration}s`);
wordsContainer.appendChild(element);
if (!activeWord) {
activeWord = element;
element.classList.add("active");
}
}

function setActiveWord() {
const visibleWords = [...document.querySelectorAll(".word")];
if (!visibleWords.length) {
createWord();
return;
}
activeWord = visibleWords[0];
activeWord.classList.add("active");
}

function updateStats() {
scoreElement.textContent = score;
streakElement.textContent = streak;
}
function checkInput() {
if (!activeWord) return;

const value = input.value.trim().toLowerCase();
const target = activeWord.textContent.toLowerCase();

if (!startTime) startTime = Date.now();

if (value === target) {
typed += target.length;
correct += target.length;
score += 10 + streak;
streak++;

activeWord.classList.remove("active");
activeWord.classList.add("correct");
activeWord.style.animationPlayState = "paused";

setTimeout(() => {
if (activeWord) {
activeWord.remove();
activeWord = null;
input.value = "";
setActiveWord();
}
}, 100);

updateStats();
}

updateAccuracy();
}

function updateAccuracy() {
const total = typed + input.value.length;

if (!total) {
accuracyElement.textContent = "100%";
return;
}

const accuracy = Math.round((correct / total) * 100);
accuracyElement.textContent = `${Math.max(0, accuracy)}%`;
}

function updateWPM() {
if (!startTime) {
wpmElement.textContent = "0";
return;
}

const minutes = (Date.now() - startTime) / 60000;
const wpm = Math.round((correct / 5) / minutes);
wpmElement.textContent = Number.isFinite(wpm) ? wpm : 0;
}