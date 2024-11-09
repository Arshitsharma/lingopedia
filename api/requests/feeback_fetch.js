const FeedbackModel = require("../models/feedback");

const feedbackFetch=async (req, res) => {
    try {
      const feedbacks = await FeedbackModel.find();
      res.json(feedbacks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  }

module.exports= feedbackFetch;