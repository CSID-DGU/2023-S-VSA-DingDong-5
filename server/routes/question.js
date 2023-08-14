const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const questionController = require('../controllers/questionController');

// TODO : 로그인한 유저만 질문을 작성할 수 있도록
//        create, update, delete 미들웨어 추가

const pageSize = 5;

// CREATE
router.post('/', async (req, res) => {
  const newQuestion = new Question(req.body);
  try {
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -LATEST
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  await questionController.getAllQuestions(page, pageSize, 'latest')(req, res);
});

// GET ALL -POPULAR
router.get('/popular', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  await questionController.getAllQuestions(page, pageSize, 'popular')(req, res);
});

// GET ALL -INTEREST
router.get('/interest', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  await questionController.getAllQuestions(page, pageSize, 'interest')(req, res);
});

// GET
router.get('/:id', questionController.getQuestion);

// UPDATE
router.put('/:id', questionController.updateQuestion);

// DELETE
router.put('/:id/delete', questionController.deleteQuestion);

// UPDATE ETC

// Comment
router.put('/:id/comment', async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await Question.findById(questionId);
    const userId = req.body.userId;
    const user = await User.findById(userId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    if (!user) {
      res.status(404).json('User not found!');
    }

    const newComment = new Comment({
      questionId: questionId,
      content: req.body.content,
      userId: userId,
    });
    const savedComment = await newComment.save();
    question.comments += 1;
    await question.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Votes
router.put('/:id/vote', async (req, res) => {
  const questionId = req.params.id;
  const userId = req.body.userId;
  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const existingVote = await Vote.findOne({
      questionId,
      userId: userId,
    });

    if (!existingVote) {
      await Vote.create({
        questionId,
        userId: userId,
      });
      question.votes += 1;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      question.votes -= 1;
    }
    await question.save();
    res.status(200).json(question);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark
// login 구현 후에 userId 수정 예정
router.put('/:id/bookmark', async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json('Question not found!');
    }
    question.saves += 1;
    await question.save();
    res.status(200).json('Question has been bookmarked');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
