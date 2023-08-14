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
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const user = await User.findById(question.userId);
    const commentList = await Comment.find({ questionId: req.params.id }).exec();
    const author = user ? user.username : 'unknown';

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const updatedQuestion = {
      ...question._doc,
      author,
      commentList,
      createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      res.status(404).json('Question not found!');
    }

    // if (question.author === req.body.author) {
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
          updatedAt: new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        },
        { new: true },
      );
      res.status(200).json(updatedQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
    // } else {
    //   res.status(401).json('You can update only your Question!');
    // }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.put('/:id/delete', async (req, res) => {
  try {
    await Question.findByIdAndUpdate(
      req.params.id,
      {
        content: '',
        isDeleted: true,
        updatedAt: new Date().toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      },
      { new: true },
    );
    await Vote.deleteMany({ questionId: req.params.id });

    res.status(200).json('Question has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
});

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
