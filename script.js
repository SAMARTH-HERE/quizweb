const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Dog", correct: false }
        ]
    },
    {
        question: "2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "69", correct: false },
            { text: "22", correct: false },
            { text: "11", correct: false }
        ]
    }
];

const quesElement = document.getElementById("question");
const ansButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let current = 0; // Fixed variable name to be consistent
let score = 0;

function startQuiz() {
    current = 0; // Fixed variable name to be consistent
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQues = questions[current];
    let qsno = current + 1;
    quesElement.innerHTML = qsno + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        ansButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (ansButton.firstChild) {
        ansButton.removeChild(ansButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++; // Increment score for correct answer
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Show the next button after selecting an answer
    nextButton.style.display = "block";
}

// Add event listener to next button to go to the next question
nextButton.addEventListener("click", () => {
    current++; // Move to the next question
    if (current < questions.length) {
        showQuestions(); // Show next question
    } else {
        // Quiz finished, display score or any other ending logic
        quesElement.innerHTML = `Quiz finished! Your score is ${score} out of ${questions.length}.`;
        ansButton.innerHTML = ""; // Clear answers
        nextButton.style.display = "none"; // Hide next button
    }
});

// Start the quiz
startQuiz();
