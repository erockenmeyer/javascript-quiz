var timerEl = document.getElementById('countdown');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer');
var checkEl = document.getElementById('check-display');
var timeLeft = 15;
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
        answerEl.textContent = "";
        var answerList = document.createElement("ul");
        answerEl.appendChild(answerList);
        // show answers as radio buttons
        for (var i = 0; i < currentQ.answer.length; i++) {
            var answerListItem = document.createElement("li");

            var answerButton = document.createElement("button");
            answerButton.className = "answer"
            answerButton.setAttribute("name", "answer");
            answerButton.setAttribute("value", currentQ.answer[i]);
            answerButton.innerHTML = currentQ.answer[i];
       
            answerListItem.appendChild(answerButton);
            answerList.appendChild(answerListItem); 
        }
    } else {
        // ends game when there are no more questions
        endGame();
    }
}

// check if answer is correct
function checkAnswer(answer) {
    var currentQ = questionsArr[questionCount];
    console.log(answer.value);
    // if correct, say correct & call next question
    if (answer.value == currentQ.correct) {
        checkEl.textContent = "Correct!";
    } else if (answer.value !== currentQ.correct) {
    // if incorrect, deduct 10s, say wrong, call next question
        checkEl.textContent = "Wrong!";
        timeLeft -= 10;
    }
}

// end the game
function endGame() {
    var score = timeLeft;
    answerEl.textContent = "";
    checkEl.textContent = "";
    questionEl.textContent = "Game over! Your score was: " + score;
    var formEl = document.createElement("input");
    formEl.setAttribute("type", "text");
    formEl.setAttribute("id", "name-form");
    answerEl.appendChild(formEl);
}

// save scores -- push to array, save to local
function saveHighScores(score) {
    //get name somehow?
    var name = formEl.value;
    var hsObject = {
        name: name,
        score: score
    }
    highScores.push(hsObject);
    console.log(highScores);
}

// figures out what was clicked
var answerButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".start-btn")) {
        // starts game if it's the start button
        startGame();
    } else if (targetEl.matches(".answer")) {
        // checks answer and moves to next question if it was an answer
        checkAnswer(targetEl);
        questionCount++;
        nextQuestion();
    }
}

// event listeners
answerEl.addEventListener("click", answerButtonHandler);