const router = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');

// GET BY COMMENT ID
router.get('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }
    const updatedComment = {
      ...comment._doc,
      createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
      updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      }),
    };
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BY QUESTION ID
router.get('/', async (req, res) => {
  const questionId = req.query.questionId;
  try {
    const comments = await Comment.find({ questionId: questionId });
    if (!comments) {
      res.status(404).json('Comments not found!');
    }
    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';
        const updatedComment = {
          ...comment._doc,
          author,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
        return updatedComment;
      }),
    );

    res.status(200).json(updatedComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }
    // TODO : token 구현 후 수정 예정
    if (comment.userId.toString() === req.body.userId) {
      try {
        const updatedComment = await Comment.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true },
        );
        res.status(200).json(updatedComment);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can update only your Comment!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      res.status(404).json('Comment not found!');
    }

    // TODO : token 구현 후 수정 예정
    if (comment.userId.toString() === req.body.userId) {
      if (comment.questionId) {
        const question = await Question.findById(comment.questionId);
        question.comments -= 1;
        await question.save();
      } else if (comment.answerId) {
        const answer = await Answer.findById(comment.answerId);
        answer.comments -= 1;
        await answer.save();
      }
      // comment 삭제
      try {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json('Comment has been deleted...');
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json('You can delete only your Comment!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
