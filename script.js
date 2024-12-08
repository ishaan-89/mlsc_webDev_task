const quizData = [
    {
        question: "How many 0.5cm slices can you cut from a bread that is 25cm long?",
        options: ["50", "25", "39", "40"],
        answer: "50"
    },
    {
        question: "There are two clocks of different colors: The green clock is broken and doesn't run at all, but the yellow clock loses one second every 24 hours. Which clock is more accurate?",
        options: ["Green Clock", "Yellow Clock", "Neither", "Both"],
        answer: "Green Clock"
    },
    {
        question: "A farmer has 17 goats. All of them but 8 die. How many goats are alive?",
        options: ["8", "9", "25", "35"],
        answer: "8"
    },
    {
        question: "If Sarah has a red pen, a blue pen, and a green pen, how many different ways can she arrange them in a row on her desk?",
        options: ["3 ways", "6 ways", "9 ways", "12 ways"],
        answer: "6 ways"
    },
    {
        question: "If 'CHAIR' is coded as 'FKDLU', how would 'TABLE' be coded?",
        options: ["WDFOH", "WDFPH", "WDEOG", "WDEOH"],
        answer: "WDEOH"
    }
];

let currentQuestion = 0;
let userAnswers = [];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.querySelector(".Next");

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionElement.textContent = question.question;

    answerButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.classList.remove("selected");
        btn.onclick = () => selectAnswer(btn);
        
    });
}

function selectAnswer(selectedButton) {
    // Deselect previous selection
    answerButtons.forEach(btn => btn.classList.remove("selected"));

    // Mark current selection
    selectedButton.classList.add("selected");
    userAnswers[currentQuestion] = selectedButton.textContent;
}

nextButton.addEventListener("click", () => {
    if (!userAnswers[currentQuestion]) {
        alert("Please select an answer before proceeding.");
        return;
    }

    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    let score = 0;

    quizData.forEach((question, index) => {
        if (question.answer === userAnswers[index]) {
            score++;
        }
    });

    document.querySelector(".quiz").innerHTML = `
        <h2>Your Score</h2>
        <p>You got ${score} out of ${quizData.length} correct!</p>
        <button onclick="location.reload()" class="restart">
            Restart
        </button>
    `;
}

loadQuestion();