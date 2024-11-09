const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true
  },
  beginner: [{
    type: String,
    required: true
  }],
  advance: [{
    type: String,
    required: true
  }]
});

const VideoModel = mongoose.model('Video', videoSchema);

module.exports = VideoModel;
