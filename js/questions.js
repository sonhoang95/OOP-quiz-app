export default class Question {
  constructor(question, choices, answerKey) {
    this.question = question
    this.choices = choices
    this.answerKey = answerKey
  }
  isCorrect(guessKey) {
    return guessKey === this.answerKey
  }
}
