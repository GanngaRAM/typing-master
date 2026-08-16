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
conss