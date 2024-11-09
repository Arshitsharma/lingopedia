const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  lang: {
    type: Number,
    required: true
  },
  questions: [{
    question: {
      type: String,
      required: true
    },
    options: {
      type: [String],
      required: true
    },
    answer: {
      type: Number,
      required: true
    }
  }]
});

const QuizModel = mongoose.model('Question', quizSchema);

module.exports = QuizModel;
