const mongoose = require('mongoose');

const WrongAnswerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  question: { type: String, required: true },
  givenAnswer: { type: String, required: true },
  correctAnswer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('WrongAnswer', WrongAnswerSchema);
