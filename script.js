const quizData = [
    {
        audio: "",
        options: ["Song A", "Song B", "Song C", "Correct Song 1"],
        answer: "Correct Song 1"
    },
    {
        audio: "song2.mp3",
        options: ["Correct Song 2", "Song D", "Song E", "Song F"],
        answer: "Correct Song 2"
    },
    {
        audio: "song3.mp3",
        options: ["Song G", "Correct Song 3", "Song H", "Song I"],
        answer: "Correct Song 3"
    },
    {
        audio: "song4.mp3",
        options: ["Song J", "Song K", "Correct Song 4", "Song L"],
        answer: "Correct Song 4"
    },
    {
        audio: "song5.mp3",
        options: ["Song M", "Song N", "Song O", "Correct Song 5"],
        answer: "Correct Song 5"
    }
];

let currentQuestion = 0;
let userAnswers = [];

const audioElement = document.getElementById("audio");
const answerButtons = document.querySelectorAll(".answer-btn");
const nextButton = document.querySelector(".Next");

function loadQuestion() {
    const question = quizData[currentQuestion];
    audioElement.src = question.audio;

    answerButtons.forEach((btn, index) => {
        btn.textContent = question.options[index];
        btn.classList.remove("selected");
        btn.onclick = () => selectAnswer(btn);
    });
}

function selectAnswer(selectedButton) {
    
    answerButtons.forEach(btn => btn.classList.remove("selected"));

   
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
        <button onclick="location.reload()">Restart</button>
    `;
}


loadQuestion();

