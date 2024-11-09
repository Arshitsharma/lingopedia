const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  languageName: {
    type: String,
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const   RecordModel = mongoose.model("Record", recordSchema);

module.exports = RecordModel;