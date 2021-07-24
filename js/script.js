import Question from "./questions.js"
import Quiz from "./quiz.js"

const App = (() => {
  //cache the DOM
  const quizEl = document.querySelector(".jabquiz")
  const quizTrackerEl = document.querySelector(".jabquiz__tracker")
  const quizQuestionEl = document.querySelector(".jabquiz__question")
  const quizChoicesEl = document.querySelector(".jabquiz__choices")
  const progressInnerEl = document.querySelector(".progress__inner")
  const nextButton = document.querySelector(".next")
  const restartButton = document.querySelector(".restart")

  const question1 = new Question(
    "According to Forbes, which entrepreneur became the first person in history to have a net worth of more than $200 billion?",
    ["Jeff Bezos", "Warren Buffett", "Elon Musk", "Bill Gates"],
    0
  )

  const question2 = new Question(
    "How many elements are there in the periodic table?",
    ["145 elements", "124 elements", "118 elements", "203 elements"],
    1
  )

  const question3 = new Question(
    "Typically, what's the strongest muscle in the human body?",
    ["Jaw", "Legs", "Arms", "Brain"],
    0
  )

  const question4 = new Question(
    "To a single decimal point, many kilometers in a mile?",
    ["1.3km", "1.6km", "1.9km", "2.3km"],
    1
  )

  const question5 = new Question(
    "What does the AC button on a calculator stand for?",
    ["Add count", "All clear", "Air Conditioner", "Apple Cider"],
    1
  )

  const question6 = new Question(
    "Mark Zuckerberg founded Facebook in which year?",
    [2003, 2004, 2005, 2006],
    1
  )

  const question7 = new Question(
    "What's the biggest animal in the world?",
    ["White Shark", "Blue Whale", "Polar Bear", "Elephant"],
    1
  )

  const question8 = new Question(
    "How many wings does a mosquito have?",
    [1, 2, 3, 4],
    1
  )

  const question9 = new Question(
    "Which American president was born in Honolulu, Hawaii?",
    ["Biden", "Trump", "Lincoln", "Obama"],
    3
  )

  const question10 = new Question(
    "Which nut is used to flavor the chocolate spread Nutella?",
    ["Peanuts", "Almonds", "Hazelnuts", "Chestnuts"],
    2
  )

  const quiz = new Quiz([
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
    question8,
    question9,
    question10,
  ])

  const listeners = _ => {
    nextButton.addEventListener("click", () => {
      const selectedInput = document.querySelector(
        'input[name="choice"]:checked'
      )
      // console.log(selectedInput)
      if (selectedInput) {
        const key = Number(selectedInput.getAttribute("data-order"))
        // console.log(key)
        quiz.guess(key)
        renderAll()
      }
    })

    restartButton.addEventListener("click", () => {
      //1. reset the quiz
      quiz.reset()
      //2. renderAll
      renderAll()
      //3. restore next button
      nextButton.style.display = "block"
      restartButton.style.display = "none"
      // 4. restore answers box
      quizChoicesEl.style.display = "block"
    })
  }

  const setValue = (element, value) => {
    element.innerHTML = value
  }

  const renderQuestion = _ => {
    const question = quiz.getCurrentQuestion().question
    setValue(quizQuestionEl, question)
  }

  const renderChoicesElements = _ => {
    let html = ""
    const currentChoices = quiz.getCurrentQuestion().choices
    currentChoices.forEach((choice, index) => {
      html += `
      <li class="jabquiz__choice">
      <input
        id="choice${index}" type="radio" name="choice" data-order="${index}" class="jabquiz__input"
      />
      <label for="choice${index}" class="jabquiz__label">
      <i class="icon"></i>
        <span>${choice}</span>
      </label>
    </li>
      `
    })

    setValue(quizChoicesEl, html)
  }

  const renderTracker = _ => {
    const index = quiz.currentIndex
    setValue(quizTrackerEl, `Question ${index + 1} of ${quiz.questions.length}`)
  }

  const getPercentage = (num1, num2) => {
    return Math.round((num1 / num2) * 100)
  }

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(() => {
      if (width > maxPercent) {
        clearInterval(loadingBar)
      } else {
        width++
        progressInnerEl.style.width = width + "%"
      }
    }, 3)
  }

  const renderProgress = _ => {
    // 1. width in percentage
    const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length)
    // console.log(currentWidth)
    // 2. launch(0, width)
    launch(0, currentWidth)
  }

  const resetEndScreen = () => {
    quizChoicesEl.style.display = "none"
    quizTrackerEl.style.textAlign = "center"
    quizTrackerEl.classList.add("result")
    quizQuestionEl.style.textAlign = "center"
  }

  const renderEndScreen = _ => {
    if (quiz.score < 5) {
      setValue(quizQuestionEl, `Almost There...!`)
      resetEndScreen()
    } else if (quiz.score < 8) {
      setValue(quizQuestionEl, `Good Effort..Keep Going!`)
      resetEndScreen()
    } else if (quiz.score <= 10) {
      setValue(quizQuestionEl, `Perfect Score! You're Awesome!`)
      resetEndScreen()
    }

    setValue(
      quizTrackerEl,
      `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`
    )
    nextButton.style.display = "none"
    restartButton.style.display = "block"
    renderProgress()
    // console.log(quiz.score)
    // console.log(quiz.questions.length)
  }

  const renderAll = _ => {
    if (quiz.hasEnded()) {
      //renderEndScreen
      renderEndScreen()
    } else {
      // 1. render the question
      renderQuestion()
      // 2. render the choices elements
      renderChoicesElements()
      // 3. render the tracker
      renderTracker()
      //4. render the progress bar
      renderProgress()
    }
  }

  return {
    renderAll: renderAll,
    listeners: listeners,
  }
})()

App.renderAll()
App.listeners()
