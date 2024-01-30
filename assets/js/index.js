let questionIndex = 0;
let timeLimit = 60;
let score = 0;
let timeInterval;

// make questions
const questions = [
  {
    question: "Commonly used data types DO Not Include.",
    answer: "Alerts",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
  },
  {
    question: "The condition in an if/else statement is enclosed with?",
    answer: "Parenthesis",
    choices: ["Quotes", "Curly Brackets", "Parenthesis", "Square Brackets"],
  },
];

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const questionBox = document.getElementById("questionBox");
const quizTimer = document.getElementById("quizTimer");
const showScoreBtnLink = document.getElementById("showScoreBtnLink");

const scoreList = document.querySelector("#scoreList");

// attach start function to a button
startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
showScoreBtnLink.addEventListener("click", showScores);

function startQuiz() {
  // hide warning
  document.getElementById("sWarning").className = "d-none";
  document.getElementById("sScore").className = "d-none";
  document.getElementById("sScores").className = "d-none";

  // show questions
  document.getElementById("sQuestion").className = "";

  // reset params
  document.getElementById("user").value = "";
  timeLimit = 10;
  score = 0;

  showQuestion(questionIndex);
}

// show question
function showQuestion(index) {
  // clear question box
  document.querySelector("#questionBox").innerHTML = "";
  document.querySelector("#answerBox").innerHTML = "";

  // show timer
  quizTimerLimit();

  const question = questions[index];

  // update question
  const questionCardTitle = document.querySelector("#questionTitle");
  questionCardTitle.innerHTML = question.question;

  const choices = question.choices;

  for (let choice of choices) {
    // make new a button for choice item
    const button = document.createElement("button");
    button.innerText = choice;
    button.className = "btn btn-outline-secondary mx-1";

    // add function to check
    button.addEventListener("click", () =>
      checkAnswer(choice, question.answer)
    );

    // to ui
    questionBox.appendChild(button);
  }
}

// check answer
function checkAnswer(choice, answer) {
  // stop when got an answer
  clearInterval(timeInterval);

  // check asnwer
  const answerBox = document.querySelector("#answerBox");

  // deduct time if wrong
  if (choice === answer) {
    score += 1;
    answerBox.innerHTML = "Correct";
  } else {
    timeLimit -= 10;
    answerBox.innerHTML = "Wrong";
  }

  // add 1 to index
  questionIndex++;

  // move to next
  if (questionIndex < questions.length) {
    setTimeout(() => {
      showQuestion(questionIndex);
    }, 1000);
  } else {
    console.log("No more questions, show score.");
    clearInterval(timeInterval);
    showScore();
  }
}

// timer
function quizTimerLimit() {
  timeInterval = setInterval(() => {
    timeLimit--;
    quizTimer.textContent = timeLimit;

    // time is up
    if (timeLimit <= 0) {
      clearInterval(timeInterval);
      console.log("Your time is up!");
      showScore();
    }
  }, 1000);
}

// show score
function showScore() {
  // hide warning
  document.getElementById("sWarning").className = "d-none";
  document.getElementById("sQuestion").className = "d-none";
  document.getElementById("sScores").className = "d-none";

  // show scores
  document.getElementById("sScore").className = "";

  const scoreBox = document.getElementById("scoreBox");
  scoreBox.innerHTML = score;
}

// local storage
function getStoreScores() {
  const scores = JSON.parse(localStorage.getItem("storedScores"));
  return scores !== null ? scores : [];
}

const saveScoreBtn = document.getElementById("saveScoreBtn");
saveScoreBtn.addEventListener("click", saveScoreToLocal);

function saveScoreToLocal() {
  // get value from input
  const user = document.getElementById("user").value;

  // hold user data and score
  const tmp = {
    user: user,
    score: score,
  };

  // console.log(tmp);

  // store search
  let scoresTmp = getStoreScores();
  const scores = scoresTmp.filter((e) => e.user !== user);
  scores.unshift(tmp);

  localStorage.setItem("storedScores", JSON.stringify(scores));

  showScores();
}

function showScores() {
  const scores = getStoreScores();
  // console.log(scores);

  scoreList.innerHTML = "";

  // hide warning
  document.getElementById("sWarning").className = "d-none";
  document.getElementById("sQuestion").className = "d-none";
  document.getElementById("sScore").className = "d-none";

  // show scores
  document.getElementById("sScores").className = "";

  // to ui
  for (let score of scores) {
    const scoreItem = document.createElement("li");
    scoreItem.className = "list-group-item";
    scoreItem.innerHTML = `${score.user} - ${score.score}`;
    scoreList.appendChild(scoreItem);
  }
}
