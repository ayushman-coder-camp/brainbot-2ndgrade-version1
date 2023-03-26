const questions = [
    {
        question: "What is 5x6?", 
        anwsers: [
            {name: "56", correct: false},
            {name: "24", correct: false},
            {name: "92", correct: false},
            {name: "30", correct: true}
        ]
    },

    {
        question: "What is 8x4?", 
        anwsers: [
            {name: "32", correct: true},
            {name: "64", correct: false},
            {name: "23", correct: false},
            {name: "40", correct: false}
        ]
    },

    {
        question: "What is 11x6?", 
        anwsers: [
            {name: "116", correct: false},
            {name: "95", correct: false},
            {name: "66", correct: true},
            {name: "81", correct: false}
        ]
    },

    {
        question: "What is 24/6?", 
        anwsers: [
            {name: "45", correct: false},
            {name: "4", correct: true},
            {name: "67", correct: false},
            {name: "246", correct: false}
        ]
    },

    {
        question: "What is 7x6?", 
        anwsers: [
            {name: "56", correct: false},
            {name: "42", correct: true},
            {name: "92", correct: false},
            {name: "30", correct: false}
        ]
    }
]

const question = document.getElementById("question")
const anwserBtns = document.getElementById("anwser-btns")
const nextBtn = document.getElementById("next-btn")

let questionIndexNo = 0
let points = 0

function showQuestions(){
    resetState()
    let mainQuestion = questions[questionIndexNo]
    let qNumber = questionIndexNo + 1
    
    question.innerHTML = qNumber + ". " + mainQuestion.question

    mainQuestion.anwsers.forEach(anwser => {
        const btn = document.createElement("button")
        btn.innerHTML = anwser.name
        btn.classList.add("btn")
        anwserBtns.appendChild(btn)
        if (anwser.correct) {
            btn.dataset.correct = anwser.correct
        }
        btn.addEventListener("click", chooseAnswer);
    })
}

function beginQuiz(){
    questionIndexNo = 0
    points = 0

    nextBtn.innerHTML = "Next"
    showQuestions()
}

function resetState(){
    nextBtn.style.display = "none"
    while (anwserBtns.firstChild) {
        anwserBtns.removeChild(anwserBtns.firstChild)
    }
}

function chooseAnswer(event) {
    const selectedBtn = event.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect){
        alert("You chose the correct anwser!")
        points++
    } else {
        alert("You chose the wrong anwser.")
    }

    Array.from(anwserBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }

        button.disabled = true
    })
    nextBtn.style.display = "block";
}

function showPoints(){
    resetState()
    question.innerHTML = `Your Score is ${points} out of ${questions.length}!`
    nextBtn.innerHTML = "Play Quiz Again"
    nextBtn.style.display = "block"
}

function handleNextBtn(){
    questionIndexNo++
    if(questionIndexNo < questions.length){
        showQuestions()
    } else {
        showPoints()
    }
}

nextBtn.addEventListener("click", () => {
    if(questionIndexNo < questions.length){
        handleNextBtn()
    } else {
        beginQuiz()
    }
})

beginQuiz();