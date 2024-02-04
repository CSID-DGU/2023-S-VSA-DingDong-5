const router = require('express').Router();
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');

// DELETE ALL QUESTION
router.delete('/deleteallQuestion', async (req, res) => {
  try {
    await Question.deleteMany({});
    res.status(200).json('All Question data has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ALL ANSWER
router.delete('/deleteallAnswer', async (req, res) => {
  try {
    await Answer.deleteMany({});
    res.status(200).json('All Answer data has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ALL COMMENT
router.delete('/deleteallComment', async (req, res) => {
  try {
    await Comment.deleteMany({});
    res.status(200).json('All Comment data has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
