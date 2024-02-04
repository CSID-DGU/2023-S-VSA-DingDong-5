const router = require('express').Router();
const Answer = require('../models/Answer');
const Question = require('../models/Question');
const Vote = require('../models/Vote');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');

const authMiddleware = require('../middlewares/authenticates');
const CopyAnswer = require('../models/CopyAnswer');
const authenticateToken = authMiddleware.authenticateToken;

// Answer CRUD
// CREATE
router.post('/:questionId', authenticateToken, async (req, res) => {
  const questionId = req.params.questionId;
  const userIdFromToken = req.user.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json('Question not found!');
    }
    if (question.userId.toString() === userIdFromToken) {
      res.status(401).json('You cannot answer your own question!');
    }
    const newAnswer = new Answer({
      questionId: req.params.questionId,
      questionTitle: question.title,
      content: req.body.content,
      userId: userIdFromToken,
    });
    const savedAnswer = await newAnswer.save();
    question.answers += 1;
    await question.save();
    res.status(200).json(savedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL
router.get('/all/public/:questionId', async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const answers = await Answer.find({ questionId: questionId });

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';
        return {
          ...answer._doc,
          author,
          createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );
    res.status(200).json(updatedAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL - LoggedIn
router.get('/all/:questionId', authenticateToken, async (req, res) => {
  const questionId = req.params.questionId;
  const userIdFromToken = req.user.id;
  try {
    const answers = await Answer.find({ questionId: questionId });
    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';
        const vote = await Vote.findOne({ userId: userIdFromToken, answerId: answer._id });
        const save = await Bookmark.findOne({ userId: userIdFromToken, answerId: answer._id });
        return {
          ...answer._doc,
          author,
          isVoted: vote ? true : false,
          isSaved: save ? true : false,
          createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );
    res.status(200).json(updatedAnswers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL ANSWERS WITH PAGINATION - VOTES
router.get('/all', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({});
    const totalPages = Math.ceil(totalAnswers / pageSize);

    const answers = await Answer.find({}).sort({ votes: -1 }).skip(startIndex).limit(pageSize).exec();

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';

        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
          author,
          questionHashtags,
          createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/answer/all?page=${nextPage}` : null;

    res.status(200).json({
      answers: updatedAnswers,
      nextPageUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET
router.get('/:id', async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.id);
    const user = await User.findById(answer.userId);
    const comments = await Comment.find({ answerId: req.params.id }).exec();

    if (!answer) {
      res.status(404).json('Answer not found!');
    }
    const author = user ? user.username : 'unknown';
    const updatedAnswer = {
      ...answer._doc,
      author,
      comments,
      createdAt: new Date(answer.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(answer.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedAnswer);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json('Answer not found!');
    }
    if (answer.userId.toString() === userIdFromToken) {
      // 수정 사항에 questionId, title 있으면 무시
      delete req.body.questionId;
      delete req.body.questionTitle;
      try {
        const updateAnswer = await Answer.findByIdAndUpdate(
          answerId,
          {
            $set: req.body,
            updatedAt: new Date().toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            }),
          },
          { new: true },
        );
        res.status(200).json({ message: 'Answer has been updated', updateAnswer });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('Access denied');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json('Answer not found!');
    }
    if (answer.userId.toString() !== userIdFromToken) {
      return res.status(401).json('Access denied');
    }
    try {
      const question = await Question.findById(answer.questionId);

      await Answer.findByIdAndDelete(answerId);
      await Vote.deleteMany({ answerId: answerId });
      question.answers -= 1;
      await question.save();
      res.status(200).json('Answer has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ETC

// Comment
router.put('/:id/comment', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json('Answer not found!');
    }

    const newComment = new Comment({
      answerId: answerId,
      content: req.body.content,
      userId: userIdFromToken,
    });
    const savedComment = await newComment.save();
    answer.comments += 1;
    await answer.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// VOTE
router.put('/:id/vote', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    let isVoted = false;
    if (!answer) {
      return res.status(404).json('Answer not found!');
    }
    if (answer.userId.toString() === userIdFromToken) {
      return res.status(401).json('You cannot vote your answer');
    }
    const existingVote = await Vote.findOne({
      answerId,
      userId: userIdFromToken,
    });

    if (!existingVote) {
      await Vote.create({
        answerId,
        userId: userIdFromToken,
      });
      answer.votes += 1;
      isVoted = true;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      answer.votes -= 1;
      isVoted = false;
    }
    await answer.save();
    res.status(200).json({ message: 'Vote has been updated', isVoted });
  } catch (err) {
    res.status(500).json(err);
  }
});

// isVoted - 투표 여부 확인
router.get('/:id/isVoted', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const vote = await Vote.findOne({
      answerId,
      userId: userIdFromToken,
    });
    if (!vote) {
      return res.status(200).json(false);
    } else {
      return res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark
router.put('/:id/bookmark', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const answer = await Answer.findById(answerId);
    let isBookmarked = false;
    if (!answer) {
      return res.status(404).json('Answer not found!');
    }
    if (answer.userId.toString() === userIdFromToken) {
      return res.status(401).json('You cannot bookmark your answer');
    }

    const existingBookmark = await Bookmark.findOne({
      answerId,
      userId: userIdFromToken,
    });
    if (!existingBookmark) {
      await Bookmark.create({
        answerId,
        userId: userIdFromToken,
      });
      await CopyAnswer.create({
        answerId,
        content: answer.content,
        questionTitle: answer.questionTitle,
        questionId: answer.questionId,
        authorId: answer.userId,
        votes: answer.votes,
        saves: answer.saves,
        comments: answer.comments,
        isDeleted: false,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        userId: userIdFromToken,
      });

      answer.saves += 1;
      isBookmarked = true;
    } else {
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      await CopyAnswer.deleteOne({ answerId, userId: userIdFromToken });
      answer.saves -= 1;
      isBookmarked = false;
    }
    await answer.save();
    res.status(200).json({ message: 'Bookmark has been updated', isBookmarked });
  } catch (err) {
    res.status(500).json(err);
  }
});

// isBookmarked - 북마크 여부 확인
router.get('/:id/isBookmarked', authenticateToken, async (req, res) => {
  const answerId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const bookmark = await Bookmark.findOne({
      answerId,
      userId: userIdFromToken,
    });
    if (!bookmark) {
      return res.status(200).json(false);
    }
    return res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
