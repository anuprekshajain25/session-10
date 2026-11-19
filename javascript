
// QUIZ QUESTIONS

const questions = [

    {
        q: "What is the capital of Australia?",
        a: ["Sydney", "Canberra", "Melbourne", "Perth"],
        correct: 1
    },

    {
        q: "Which planet is known as the Red Planet?",
        a: ["Venus", "Jupiter", "Mars", "Mercury"],
        correct: 2
    },

    {
        q: "Who wrote the Indian national anthem?",
        a: [
            "Bankim Chandra Chatterjee",
            "Rabindranath Tagore",
            "Sarojini Naidu",
            "Mahatma Gandhi"
        ],
        correct: 1
    },

    {
        q: "What is the largest ocean on Earth?",
        a: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },

    {
        q: "Which gas do plants absorb?",
        a: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
        correct: 1
    },

    {
        q: "How many sides does a hexagon have?",
        a: ["Five", "Six", "Seven", "Eight"],
        correct: 1
    },

    {
        q: "Which is the largest state in India by area?",
        a: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh"],
        correct: 2
    },

    {
        q: "Who was the first person to walk on the Moon?",
        a: ["Yuri Gagarin", "Buzz Aldrin", "Neil Armstrong", "Michael Collins"],
        correct: 2
    },

    {
        q: "What is the chemical symbol for gold?",
        a: ["Ag", "Au", "Gd", "Go"],
        correct: 1
    },

    {
        q: "Which organ pumps blood around the human body?",
        a: ["Lungs", "Brain", "Liver", "Heart"],
        correct: 3
    },

    {
        q: "In which year did India become independent?",
        a: ["1945", "1947", "1950", "1952"],
        correct: 1
    },

    {
        q: "Which is the fastest land animal?",
        a: ["Lion", "Horse", "Cheetah", "Leopard"],
        correct: 2
    },

    {
        q: "What is the currency of Japan?",
        a: ["Won", "Yuan", "Yen", "Ringgit"],
        correct: 2
    },

    {
        q: "Which instrument measures temperature?",
        a: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
        correct: 1
    },

    {
        q: "What is the smallest prime number?",
        a: ["0", "1", "2", "3"],
        correct: 2
    }

];


// VARIABLES

let current = 0;
let score = 0;
let answered = false;


// HTML ELEMENTS

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");


// DISPLAY QUESTION

function showQuestion() {

    answered = false;

    const item = questions[current];

    document.getElementById("question-count").textContent =
        `Question ${current + 1} of ${questions.length}`;

    document.getElementById("score-count").textContent =
        `Score: ${score}`;

    document.getElementById("progress-fill").style.width =
        `${(current / questions.length) * 100}%`;

    questionEl.textContent = item.q;

    feedbackEl.textContent = "";

    answersEl.innerHTML = "";

    nextButton.disabled = true;

    nextButton.textContent =
        current === questions.length - 1
        ? "See Results"
        : "Next Question";


    // CREATE ANSWER BUTTONS

    item.a.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${answer}`;

        button.addEventListener("click", () => {

            chooseAnswer(index);

        });

        answersEl.appendChild(button);

    });

}


// CHECK ANSWER

function chooseAnswer(selected) {

    if (answered) return;

    answered = true;

    const correct = questions[current].correct;

    const buttons = [...answersEl.children];


    // DISABLE ALL BUTTONS

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === correct) {

            button.classList.add("correct");

        }

        if (index === selected && selected !== correct) {

            button.classList.add("wrong");

        }

    });


    // CHECK CORRECT OR WRONG

    if (selected === correct) {

        score++;

        feedbackEl.textContent = "Correct! Well done.";

        feedbackEl.style.color = "#168253";

    } else {

        feedbackEl.textContent =
            `Incorrect! Correct answer: ${questions[current].a[correct]}`;

        feedbackEl.style.color = "#c13d4b";

    }


    document.getElementById("score-count").textContent =
        `Score: ${score}`;

    nextButton.disabled = false;

}


// NEXT QUESTION

nextButton.addEventListener("click", () => {

    if (!answered) return;

    current++;

    if (current < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


// SHOW FINAL RESULT

function showResult() {

    document.getElementById("quiz").classList.add("hidden");

    document.getElementById("result").classList.remove("hidden");

    document.getElementById("progress-fill").style.width = "100%";


    document.getElementById("final-score").textContent =
        `${score} / ${questions.length}`;


    const percentage = (score / questions.length) * 100;

    let message;

    if (percentage >= 80) {

        message = "Excellent Work!";

    } else if (percentage >= 50) {

        message = "Good Effort!";

    } else {

        message = "Keep Practising!";

    }


    document.getElementById("result-message").textContent = message;

    document.getElementById("result-detail").textContent =
        `You answered ${score} correctly and ${questions.length - score} incorrectly.`;

}


// RESTART QUIZ

document.getElementById("restart-button").addEventListener("click", () => {

    current = 0;

    score = 0;

    document.getElementById("result").classList.add("hidden");

    document.getElementById("quiz").classList.remove("hidden");

    showQuestion();

});


// START QUIZ

showQuestion();
