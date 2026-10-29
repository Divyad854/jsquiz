
const questionNumber = document.getElementById("questionNumber");
const timerText = document.getElementById("timer");
const startButton = document.getElementById("startButton");
const question = document.getElementById("question");
const optionA = document.getElementById("optionA");
const optionB = document.getElementById("optionB");
const optionC = document.getElementById("optionC");
const optionD = document.getElementById("optionD");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const result = document.getElementById("result");


const questions = [

    {
        question: "What is JavaScript mainly used for?",

        options: {
            A: "Styling websites",
            B: "Adding interactivity to websites",
            C: "Creating databases only",
            D: "Creating images"
        },

        correct: "B"
    },


    {
        question: "Which keyword is used to declare a variable that can be changed?",

        options: {
            A: "const",
            B: "fixed",
            C: "let",
            D: "static"
        },

        correct: "C"
    },


    {
        question: "Which method selects an HTML element by its ID?",

        options: {
            A: "getElementById()",
            B: "getById()",
            C: "selectId()",
            D: "findElement()"
        },

        correct: "A"
    },


    {
        question: "Which symbol is used for strict equality?",

        options: {
            A: "=",
            B: "==",
            C: "===",
            D: "!="
        },

        correct: "C"
    },


    {
        question: "Which method is used to add an event handler?",

        options: {
            A: "addEventListener()",
            B: "addEvent()",
            C: "event()",
            D: "listen()"
        },

        correct: "A"
    }

];


let currentQuestion = 0;

let score = 0;

let timeLeft = 180;

let timer = null;


startButton.addEventListener("click", function () {

    startButton.style.display = "none";

    nextButton.style.display = "block";

    showQuestion();

    startTimer();

});


function showQuestion() {

    const current = questions[currentQuestion];


    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    question.textContent =
        current.question;


    // Show real options

    optionA.textContent = current.options.A;

    optionB.textContent = current.options.B;

    optionC.textContent = current.options.C;

    optionD.textContent = current.options.D;


    message.textContent = "";


    const radioButtons =
        document.querySelectorAll('input[name="answer"]');


    radioButtons.forEach(function (radio) {

        radio.checked = false;

    });

}


// =====================================
// Start Timer
// =====================================

function startTimer() {

    clearInterval(timer);


    timer = setInterval(function () {

        timeLeft--;


        const minutes =
            Math.floor(timeLeft / 60);


        const seconds =
            timeLeft % 60;


        timerText.textContent =
            `⏱️ Time: ${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;


        // Time finished

        if (timeLeft <= 0) {

            clearInterval(timer);

            message.textContent =
                "⏰ Time's up!";

            showResult();

        }

    }, 1000);

}


// =====================================
// Next Button
// =====================================

nextButton.addEventListener("click", function () {


    // Find selected answer

    const selectedAnswer =
        document.querySelector(
            'input[name="answer"]:checked'
        );


    // No answer

    if (!selectedAnswer) {

        message.textContent =
            "⚠️ Please select an answer.";

        return;

    }


    const correctAnswer =
        questions[currentQuestion].correct;


    // =================================
    // Correct Answer
    // =================================

    if (selectedAnswer.value === correctAnswer) {

        score += 1;

       

    }


    // =================================
    // Wrong Answer
    // =================================

    else {

        score -= 0.25;

    }


    scoreText.textContent =
        `Score: ${score}`;


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        clearInterval(timer);

        showResult();

        return;

    }


    currentQuestion++;


    showQuestion();

});


// =====================================
// Show Final Result
// =====================================

function showResult() {

    clearInterval(timer);


    questionNumber.textContent =
        "Quiz Finished!";


    question.textContent =
        "🎉 Quiz Completed!";

        

    document
        .querySelectorAll(".answers label")
        .forEach(function (label) {

            label.style.display = "none";

        });


    nextButton.style.display = "none";

       restartButton.style.display = "block";


    result.innerHTML = `
        <p>🏆 Final Score: ${score}</p>
      
        <p>Unanswered: 0</p>
    `;

}


// =====================================
// Restart Quiz
// =====================================

restartButton.addEventListener("click", function () {

    // Stop old timer

    clearInterval(timer);


    // Reset variables

    currentQuestion = 0;

    score = 0;

    timeLeft = 180;


    // Reset display

    scoreText.textContent =
        "Score: 0";


    timerText.textContent =
        "⏱️ Time: 3:00";


    questionNumber.textContent =
        "Question 1 of 5";


    question.textContent =
        "Click Start Quiz to begin";


    message.textContent = "";


    result.innerHTML = "";


    // Show answer options again

    document
        .querySelectorAll(".answers label")
        .forEach(function (label) {

            label.style.display = "flex";

        });


    // Clear radio buttons

    document
        .querySelectorAll('input[name="answer"]')
        .forEach(function (radio) {

            radio.checked = false;

        });


    // Hide restart

    restartButton.style.display = "none";


    // Show start

    startButton.style.display = "block";


    // Hide next until Start is clicked

    nextButton.style.display = "none";


});