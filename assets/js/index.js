let questionIndex = 0;

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

// controls
const startBtn = document.getElementById("startBtn");
const questionBox = document.getElementById("questionBox");

// attach start function to a button
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  // hide warning
  document.getElementById("sWarning").className = "d-none";

  // show questions
  document.getElementById("sQuestion").className = "";

  showQuestion(questionIndex);
}

// show question
function showQuestion(index) {
  // clear question box
  document.querySelector("#questionBox").innerHTML = "";

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
  const correct = choice === answer ? true : false;
  console.log(correct)
  questionIndex++;

  if (questionIndex < questions.length) {
    showQuestion(questionIndex);
  } 
  else {
    console.log('No more questions, show score.')
  }
}
