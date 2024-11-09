const QuizModel = require('../models/quiz');

const fetchQuizdata= async (req, res) => {
    const langid = req.params.langid;
  try {
    const quizData = await QuizModel.findOne({ lang: langid });
    if (!quizData) {
      return res.status(404).json({ message: 'Quiz data not found' });
    }
    
    res.json({ questions: quizData.questions });
  } catch (error) {
    console.error('Error fetching quiz data:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports= fetchQuizdata;
