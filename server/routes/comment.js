const router = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Bookmark = require('../models/Bookmark');

const authMiddleware = require('../middlewares/authenticates');
const authenticateToken = authMiddleware.authenticateToken;

// GET ALL BY QUESTION ID OR ANSWER ID
router.get('/', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  try {
    let comments;

    if (req.query.questionId) {
      comments = await Comment.find({ questionId: req.query.questionId });
    }
    if (req.query.answerId) {
      comments = await Comment.find({ answerId: req.query.answerId });
    }
    if (!req.query.questionId && !req.query.answerId) {
      res.status(400).json('Invalid query parameters');
      return;
    }

    if (!comments) {
      res.status(404).json('Comments not found!');
      return;
    }

    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';

        const vote = await Vote.findOne({ userId: userIdFromToken, commentId: comment._id });
        const save = await Bookmark.findOne({ userId: userIdFromToken, commentId: comment._id });
        const updatedComment = {
          ...comment._doc,
          author,
          isVoted: vote ? true : false,
          isSaved: save ? true : false,
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

// GET ALL BY QUESTION ID OR ANSWER ID
router.get('/all/public', async (req, res) => {
  try {
    let comments;

    if (req.query.questionId) {
      comments = await Comment.find({ questionId: req.query.questionId });
    }
    if (req.query.answerId) {
      comments = await Comment.find({ answerId: req.query.answerId });
    }
    if (!req.query.questionId && !req.query.answerId) {
      res.status(400).json('Invalid query parameters');
      return;
    }

    if (!comments) {
      res.status(404).json('Comments not found!');
      return;
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

// GET ALL COMMENTS WITH PAGINATION - VOTES
router.get('/all', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalComments = await Comment.countDocuments({});
    const totalPages = Math.ceil(totalComments / pageSize);

    const comments = await Comment.find().sort({ votes: -1 }).skip(startIndex).limit(pageSize).exec();

    const updatedComments = await Promise.all(
      comments.map(async comment => {
        const user = await User.findById(comment.userId);
        const author = user ? user.username : 'unknown';

        let questionHashtags;

        if (comment.answerId) {
          const answer = await Answer.findById(comment.answerId);
          if (answer && answer.questionId) {
            const question = await Question.findById(answer.questionId);
            questionHashtags = question ? question.hashtags : [];
          }
        }
        if (comment.questionId) {
          const question = await Question.findById(comment.questionId);
          questionHashtags = question ? question.hashtags : [];
        }

        return {
          ...comment._doc,
          author,
          questionHashtags,
          createdAt: new Date(comment.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
      }),
    );

    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/comment/all?page=${nextPage}` : null;

    res.status(200).json({
      comments: updatedComments,
      nextPageUrl,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json(err);
  }
});

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

// UPDATE
router.put('/:id', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json('Comment not found!');
    }
    if (comment.userId.toString() !== userIdFromToken) {
      return res.status(401).json('You can update only your Comment!');
    }
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
          $set: req.body,
          updatedAt: new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        },
        { new: true },
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json('Comment not found!');
    }
    if (comment.userId.toString() !== userIdFromToken) {
      return res.status(401).json('You can delete only your Comment!');
    }
    try {
      await Comment.findByIdAndDelete(commentId);
      const model = comment.questionId ? Question : Answer;
      await model.findByIdAndUpdate(comment.questionId || comment.answerId, {
        $inc: { comments: -1 },
      });
      res.status(200).json('Comment has been deleted!');
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// VOTE
router.put('/:id/vote', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;

  try {
    const comment = await Comment.findById(commentId);
    let isVoted = false;

    if (!comment) {
      return res.status(404).json('Comment not found!');
    }
    if (comment.userId.toString() === userIdFromToken) {
      return res.status(401).json('You cannot vote your own comment!');
    }
    const existingVote = await Vote.findOne({
      commentId,
      userId: userIdFromToken,
    });

    if (!existingVote) {
      await Vote.create({
        commentId,
        userId: userIdFromToken,
      });
      comment.votes += 1;
      isVoted = true;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      comment.votes -= 1;
      isVoted = false;
    }
    await comment.save();
    res.status(200).json({ message: 'Vote has been updated', isVoted });
  } catch (err) {
    res.status(500).json(err);
  }
});

// isVoted
router.get('/:id/isVoted', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const vote = await Vote.findOne({
      commentId,
      userId: userIdFromToken,
    });
    if (!vote) {
      return res.status(200).json(false);
    }
    res.status(200).json(true);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark
router.put('/:id/bookmark', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const comment = await Comment.findById(commentId);
    let isBookmarked = false;
    if (!comment) {
      return res.status(404).json('Comment not found!');
    }
    if (comment.userId.toString() === userIdFromToken) {
      return res.status(401).json('You cannot bookmark your own comment!');
    }
    const existingBookmark = await Bookmark.findOne({
      commentId,
      userId: userIdFromToken,
    });

    if (!existingBookmark) {
      await Bookmark.create({
        commentId,
        userId: userIdFromToken,
      });
      comment.saves += 1;
      isBookmarked = true;
    } else {
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      comment.saves -= 1;
      isBookmarked = false;
    }
    await comment.save();
    res.status(200).json({ message: 'Bookmark has been updated', isBookmarked });
  } catch (err) {
    res.status(500).json(err);
  }
});

// isBookmarked
router.get('/:id/isBookmarked', authenticateToken, async (req, res) => {
  const commentId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const bookmark = await Bookmark.findOne({
      commentId,
      userId: userIdFromToken,
    });
    if (!bookmark) {
      return res.status(200).json(false);
    } else {
      return res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
