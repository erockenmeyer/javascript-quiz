var timerEl = document.getElementById('countdown');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer');
var timeLeft = 5;
timerEl.textContent = timeLeft;
var questionCount = 0;

// questions
var questionsArr = [
    {
        question: "What encloses an array?",
        answer: ["Quotes", "Curly brackets", "Square brackets", "Nothing"],
        correct: "Square brackets"
    },
    {
        question: "Which is not truthy?",
        answer: ["true", "null", "34", "Hello"],
        correct: "null"
    },
    {
        question: "What can go in an array?",
        answer: ["Numbers", "Strings", "Objects", "All of the above"],
        correct: "All of the above"
    },
    {
        question: "What goes into localStorage?",
        answer: ["Objects", "Strings", "An array", "Boolean values"],
        correct: "Strings"
    },
    {
        question: "Which is true?",
        answer: ["'2'==2", "'2'===2", "'2'=='two'", "'2'==='two'"],
        correct: "'2'==2"
    }
];

// array to store high scores
var highScores = [];

// timer function
function countdown() {
    var timer = setInterval(function() {
        timerEl.textContent = timeLeft;
        timeLeft--;
        if (timeLeft < 1) {
            clearInterval(timer);
            timerEl.textContent = 0;
            endGame();
        }
    }, 1000)
}

// start the game
function startGame() {
    // start count down
    countdown();
    // call for next (first) question
    nextQuestion();
}

// next question
function nextQuestion() {
    // set make variables easier
    var currentQ = questionsArr[questionCount];
    // check if questioncount less than questions array.length
    if (questionCount < questionsArr.length) {
        // push question into q div
        questionEl.textContent = currentQ.question
        // set up for answers array
        var answerList = document.createElement("ul");
        answerEl.appendChild(answerList);
        // show answers as radio buttons
        for (var i = 0; i < currentQ.answer.length; i++) {
            var answerListItem = document.createElement("li");

            var radioButton = document.createElement("input");
            radioButton.setAttribute("type", "radio");
            radioButton.setAttribute("class", "radio-button");
            radioButton.setAttribute("id", "answer-" + i);
            radioButton.setAttribute("name", "answer");
            radioButton.setAttribute("value", currentQ.answer[i]);

            var radioLabel = document.createElement("label");
            radioLabel.setAttribute("for", "answer-" + i);
            radioLabel.setAttribute("class", "radio-label");
            radioLabel.setAttribute("id", "answer-" + i + "-label");
            radioLabel.setAttribute("value", currentQ.answer[i]);
            radioLabel.innerHTML = currentQ.answer[i];
       
            answerListItem.appendChild(radioButton);
            answerListItem.appendChild(radioLabel);
            answerList.appendChild(answerListItem); 
        }
    } else {
        // ends game when there are no more questions
        endGame();
    }
}

// check if answer is correct
function checkAnswer() {
    // if correct, say correct & call next question
    // if incorrect, deduct 10s, say wrong, call next question
}

// end the game
function endGame() {
    var score = timeLeft;
    answerEl.textContent = "";
    questionEl.textContent = "Game over! Your score was: " + score;
    saveHighScores(score);
}

// save scores -- push to array, save to local
function saveHighScores(score) {
    var formEl = document.querySelector("input");
    //get name somehow?
    var name = formEl.value;
    var hsObject = {
        name: name,
        score: score
    }
    highScores.push(hsObject);
    console.log(highScores);
}

// event listeners
// starting the game
// answering the questions

