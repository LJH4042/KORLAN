const express = require('express');
const router = express.Router();
const { authUser } = require('../middleware/authMiddleware');
const { getWrongAnswers, submitAnswer } = require('../controller/gameController');

router.get('/wrong-answers', authUser, getWrongAnswers);
router.post('/wrong-answers', authUser, submitAnswer);

module.exports = router;