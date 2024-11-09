const mongoose = require("mongoose");
const { Schema } = mongoose;

const FeedbackSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String
    },
    feedback: {
        type: String,
        required: true
    }
});

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema);
module.exports = FeedbackModel;
