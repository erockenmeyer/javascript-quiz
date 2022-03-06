var timerEl = document.getElementById('countdown');
var questionEl = document.getElementById('question');
var answerEl = document.getElementById('answer');
var checkEl = document.getElementById('check-display');
var formDiv = document.getElementById('score-entry');
var formEl = document.getElementById('hs-form');
var submitBtn = document.getElementById('submit-btn');
var scoreDiv = document.getElementById('high-scores');
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
    if (!timer) {
        var timer = setInterval(function() {
            timerEl.textContent = timeLeft;
            timeLeft--;
            if (timeLeft < 1) {
                clearInterval(timer);
                timerEl.textContent = 0;
                endGame();
            }
            if (questionCount > questionsArr.length - 1) {
                clearInterval(timer);
            }
        }, 1000)
    }
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
    formDiv.style.display = "block";
}

// save scores -- push to array, save to local
function saveHighScores() {
    formDiv.style.display = "none";
    //get name somehow?
    var name = formEl.value;
    var score = timeLeft;

    if (!name) {
        alert("Please enter a name first!");
        return endGame();
    }

    // saves name & score to an object & pushes to array
    var hsObject = {
        name: name,
        score: score
    }
    highScores.push(hsObject);

    // change to string & save to local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayHighScores();
}

// show the high scores
function displayHighScores() {
    checkScores();
    questionEl.textContent = "High Scores";
    answerEl.textContent = "";
    var scoreList = document.createElement("ul");
    answerEl.appendChild(scoreList);
    for (var i = 0; i < highScores.length; i++) {
        var currentScore = highScores[i];
        var currentScoreItem = document.createElement("li");
        currentScoreItem.textContent = currentScore.name + " ..... " + currentScore.score;
        scoreList.appendChild(currentScoreItem);
    }

    timeLeft = 60;
    questionCount = 0;

    var againBtn = document.createElement("button");
    againBtn.className = "start-btn";
    againBtn.textContent = "Play again";
    answerEl.appendChild(againBtn);
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

// checks to see if any scores exist in local storage
function checkScores() {
    var savedScores = localStorage.getItem("highScores");
    if (!savedScores) {
        return false;
    }
    highScores = JSON.parse(savedScores);
}

checkScores();

// event listeners
answerEl.addEventListener("click", answerButtonHandler);
submitBtn.addEventListener("click", saveHighScores);
scoreDiv.addEventListener("click", displayHighScores);