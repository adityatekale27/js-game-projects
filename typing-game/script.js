const textDisplay = document.getElementById("textDisplay");
const textInput = document.getElementById("textInput");
const timer = document.getElementById("timer");
const quoteAPILink = "https://dummyjson.com/quotes";

async function getRandomText() {
  const response = await fetch(quoteAPILink);
  const data = await response.json();
  let randomIndex = Math.floor(Math.random() * data.quotes.length);
  return data.quotes[randomIndex].quote;
}

async function renderNewText() {
  const text = await getRandomText();
  textDisplay.textContent = "";
  textInput.value = null;

  text.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    textDisplay.appendChild(characterSpan);
  });

  startTimer();
}

textInput.addEventListener("input", () => {
  const displaySpan = textDisplay.querySelectorAll("span");
  const inputSpan = textInput.value.split("");
  const correct = true;

  displaySpan.forEach((characterSpan, index) => {
    const characterInput = inputSpan[index];
    if (characterInput == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (characterInput === characterSpan.textContent) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewText();
});

let startTime;
function startTimer() {
  timer.textContent = 0;
  startTime = new Date();
  setInterval(() => {
    timer.textContent = Math.floor((new Date() - startTime) / 1000);
  }, 1000);
}

document.addEventListener("DOMContentLoaded", renderNewText());
