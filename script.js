//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
beforeEach(() => {
  cy.window().then((win) => {
    win.sessionStorage.clear()
    win.localStorage.clear()
  })
})

it('should persist data', () => {
  //... your test code

  cy.window().then((win) => {
    win.sessionStorage.setItem('progress', JSON.stringify(choiList))
    win.localStorage.setItem('score', currentScore)
  })

  cy.reload()

  //... rest of your test code
	const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Display the quiz questions and choices

const questionsElement = document.getElementById("questions");
const submit = document.getElementById("submit");
const score = document.getElementById("score");

function pageLoad() {
  let preScore = localStorage.getItem("score");
  let preChoices = JSON.parse(sessionStorage.getItem("progress"));
  // console.log(preScore, preChoices);
  if (preScore) score.innerText = "Your score is " + preScore + " out of 5.";
  // if (preChoices) {
  //   preChoices.forEach((k, i) => {
  //     let name = "question-" + i;
  //     let choices = document.getElementsByName(name);
  //     for (cho of choices) {
  //       if (cho.value == k) cho.setAttribute("checked", true);
  //     }
  //   });
  // }
  return preChoices;
}

function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);
    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      /////////////////
      let userAnswers = pageLoad();
      if (userAnswers && userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
		  choiceElement.checked=true;
      }
      ////////////////////
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }
    questionsElement.appendChild(questionElement);
  }
}
renderQuestions();

submit.addEventListener("click", (e) => {
  e.preventDefault();
  let currentScore = 0;
  let choiList = [];
  for (let i = 0; i < questions.length; i++) {
    let name = "question-" + i;
    let choices = document.getElementsByName(name);
    let ans = "";
    choices.forEach((k) => {
      if (k.checked) ans = k;
    });
    if (ans.value == questions[i].answer) currentScore++;
    choiList.push(ans.value);
  }
  // console.log(choiList, currentScore);
  sessionStorage.setItem("progress", JSON.stringify(choiList));
  localStorage.setItem("score", currentScore);
  score.innerText = "Your score is " + currentScore + " out of 5.";
});

})
