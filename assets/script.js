const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

let scores = [];

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  startQuiz();
});

let currTime = 50;
let score = 0;

function startQuiz() {
  let idx = 0;
  let id = setInterval(() => {
    currTime--;
    if (currTime <= 0) {
      finishTest(score);
      clearInterval(id);
    }
    timer(currTime);
  }, 1000);
  displayQuestion(idx);
}

function displayQuestion(idx) {
  if (idx < questions.length) {
    const mainArea = document.getElementById("main");
    mainArea.innerHTML = "";

    const question = questionDiv(idx);
    const optionDiv = createOptionDiv(idx);

    mainArea.appendChild(question);
    mainArea.appendChild(optionDiv);

    mainArea.setAttribute("class", "question-area");
    const rule = document.createElement("hr");
    mainArea.appendChild(rule);
  } else {
    finishTest(score);
  }
}

function createOptionDiv(idx) {
  const div = document.createElement("div");

  questions[idx].options.forEach((option, i) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.setAttribute("class", "option-button");
    button.addEventListener("click", () => {
      checkAnswer(idx, option);
    });
    div.appendChild(button);
  });

  return div;
}

function questionDiv(idx) {
  const heading = document.createElement("h1");
  heading.innerText = questions[idx].questionText;
  heading.setAttribute("class", "heading");

  const div = document.createElement("div");
  div.appendChild(heading);

  return div;
}

function checkAnswer(idx, chosenOption) {
  if (questions[idx].answer === chosenOption) {
    score++;
    displayResult("Correct!");
  } else {
    currTime = Math.max(0, currTime - 10);
    displayResult("Incorrect!");
  }
  displayQuestion(idx + 1);
}

function displayResult(result) {
  const main = document.getElementById("main");
  const h2 = document.createElement("h2");
  h2.innerText = result;
  main.appendChild(h2);

  setTimeout(() => {
    main.removeChild(h2);
  }, 1000);
}

function timer(currTime) {
  const timer = document.getElementById("timer");
  if (currTime <= 0) timer.innerText = "Time over";
  else timer.innerText = "Time left " + currTime;
}

function finishTest(score) {
  const main = document.getElementById("main");
  main.innerText = "";

  const h = document.createElement("h1");
  h.innerText = "All Done!";

  const h2 = document.createElement("h2");
  h2.innerText = `Your final score is ${score}.`;

  const div = document.createElement("div");
  div.innerHTML =
    'Enter initials: <input id="name"></input> <button id="submit-test-button" class="btn">Submit</button>';

  main.appendChild(h);
  main.appendChild(h2);
  main.appendChild(div);
  main.setAttribute("class", "main");

  const submitTestButton = document.getElementById("submit-test-button");
  submitTestButton.addEventListener("click", () => {
    const name = document.getElementById("name");
    scores.push({
      name,
      score,
    });
    window.location = "/";
  });
}

const highScoreButton = document.getElementById("high-score");
highScoreButton.addEventListener("click", () => {
  displayHighScores();
});

function displayHighScores() {
  const main = document.getElementById("main");
  main.innerText = "";

  const h1 = document.createElement("h1");
  h1.innerText = "Highscores";
  main.appendChild(h1);

  scores.forEach((ele, idx) => {
    const h2 = document.createElement("h2");
    h2.innerText = `${idx + 1}. ${ele.name} - ${ele.score}`;
    main.appendChild(h2);
  });
  main.setAttribute("class", "high-score");

  const button1 = document.createElement("button");
  button1.innerText = "Go back";
  button1.setAttribute("id", "btn");
  button1.addEventListener("click", () => {
    window.location = "/";
  });

  const button2 = document.createElement("button");
  button2.innerText = "Clear highscores";
  button2.setAttribute("id", "btn");
  button2.addEventListener("click", () => {
    scores = [];
  });

  main.appendChild(button1);
  main.appendChild(button2);
}
