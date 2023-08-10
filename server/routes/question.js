const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');

// TODO : 로그인한 유저만 질문을 작성할 수 있도록
// create, update, delete 미들웨어 추가

// Question CRUD
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

// GET ALL
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ createdAt: -1 }) // 최신순으로 정렬 (내림차순 : -1)
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        return {
          ...question._doc,
          author: user.username,
          createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    const user = await User.findById(question.userId);
    const comments = await Comment.find({ questionId: req.params.id }).exec();

    if (!question) {
      res.status(404).json('Question not found!');
    }
    const updatedQuestion = {
      ...question._doc,
      author: user.username,
      comments,
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
router.post('/:id/comment', async (req, res) => {
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
router.post('/:id/bookmark', async (req, res) => {
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
