const express = require('express');
const router = express.Router();
const WrongAnswer = require('../model/WrongAnswer');
const { authUser } = require('../middleware/authMiddleware'); 

// 사용자 오답을 저장하는 엔드포인트
router.post('/wrong-answers', authUser, async (req, res) => {
  const { question, givenAnswer, correctAnswer } = req.body;
  const userId = req.user._id;

  const newWrongAnswer = new WrongAnswer({
    userId,
    question,
    givenAnswer,
    correctAnswer
  });

  try {
    await newWrongAnswer.save();
    res.status(201).json({ message: '오답이 저장되었습니다.', data: newWrongAnswer });
  } catch (error) {
    res.status(500).json({ error: '오답 저장에 실패했습니다.', message: error.message });
  }
});

// 사용자 오답을 불러오는 엔드포인트
router.get('/wrong-answers', authUser, async (req, res) => {
  const userId = req.user._id;

  try {
    const wrongAnswers = await WrongAnswer.find({ userId });
    res.status(200).json(wrongAnswers);
  } catch (error) {
    res.status(500).json({ error: '오답을 찾는데 실패했습니다.', message: error.message });
  }
});

module.exports = router;
