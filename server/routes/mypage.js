const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');
const CopyQuestion = require('../models/CopyQuestion');

const athenticates = require('../middlewares/authenticates');
const CopyAnswer = require('../models/CopyAnswer');
const authenticateToken = athenticates.authenticateToken;

// mypage - user 정보
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json('User not found!');
    }
    const { password, ...userInfo } = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 질문
router.get('/questions', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ userId: userIdFromToken, isDeleted: false });
    const questions = await Question.find({ userId: userIdFromToken, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const updatedQuestion = {
          ...question._doc,
          createdAt: new Date(question.createdAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          updatedAt: new Date(question.updatedAt).toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
        };
        return updatedQuestion;
      }),
    );

    res.status(200).json({
      updatedQuestions,
      totalQuestions,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 답변
router.get('/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({ userId: userIdFromToken });
    const totalPages = Math.ceil(totalAnswers / pageSize);

    const answers = await Answer.find({ userId: userIdFromToken })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedAnswers = await Promise.all(
      answers.map(async answer => {
        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
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
    const nextPageUrl = nextPage ? `/api/answer/answers?page=${nextPage}` : null;

    res.status(200).json({
      answers: updatedAnswers,
      nextPageUrl,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 작성한 댓글
router.get('/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalUserComments = await Comment.countDocuments({ userId: userIdFromToken });
    const totalPages = Math.ceil(totalUserComments / pageSize);

    const comments = await Comment.find({ userId: userIdFromToken })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const updatedComments = await Promise.all(
      comments.map(async comment => {
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
    const nextPageUrl = nextPage ? `/api/mypage/comments?page=${nextPage}` : null;

    res.status(200).json({
      comments: updatedComments,
      nextPageUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const getFormattedDate = date => {
  return new Date(date).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
};

// 북마크 한 질문
router.get('/bookmarks/questions', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const questionIdList = bookmarks.map(bookmark => bookmark.questionId);
    /* const [questions, copyQuestions] = await Promise.all([
      Question.find({ _id: { $in: questionIdList }, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(startIndex)
        .limit(pageSize)
        .exec(),
      CopyQuestion.find({ questionId: { $in: questionIdList }, userId: userIdFromToken }),
    ]);

    const populatedQuestions = await Promise.all(
      copyQuestions.map(async copyQuestion => {
        const originalQuestion = questions.find(
          question => question._id.toString() === copyQuestion.questionId.toString(),
        );
        if (originalQuestion && originalQuestion.isDeleted) {
          copyQuestion.isDeleted = true;
          await copyQuestion.save();
        }
        const user = await User.findById(copyQuestion.authorId);
        const author = user ? user.username : 'unknown';
        return {
          ...copyQuestion._doc,
          author,
          createdAt: getFormattedDate(copyQuestion.createdAt),
          updatedAt: getFormattedDate(copyQuestion.updatedAt),
        };
      }),
    ); */

    const questions = await Question.find({ _id: { $in: questionIdList }, isDeleted: false })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const totalQuestions = questions.length;

    console.log(questions);

    res.status(200).json({ updatedQuestions: questions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

// 북마크한 답변
router.get('/bookmarks/answers', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const answerIdList = bookmarks.map(bookmark => bookmark.answerId);
    const answers = await CopyAnswer.find({ answerId: { $in: answerIdList }, userId: userIdFromToken })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const populatedAnswers = await Promise.all(
      answers.map(async answer => {
        const user = await User.findById(answer.userId);
        const author = user ? user.username : 'unknown';

        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];
        return {
          ...answer._doc,
          author,
          questionHashtags,
          createdAt: getFormattedDate(answer.createdAt),
          updatedAt: getFormattedDate(answer.updatedAt),
        };
      }),
    );

    const hasNextPage = answers.length === pageSize;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/mypage/bookmarks/answers?page=${nextPage}` : null;

    res.status(200).json({ answers: populatedAnswers, nextPageUrl });
  } catch (err) {
    res.status(500).json(err);
  }
});

// 북마크한 댓글
router.get('/bookmarks/comments', authenticateToken, async (req, res) => {
  const userIdFromToken = req.user.id;
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const startIndex = (page - 1) * pageSize;

  try {
    const bookmarks = await Bookmark.find({ userId: userIdFromToken });
    const commentIdList = bookmarks.map(bookmark => bookmark.commentId);
    const comments = await Comment.find({ _id: { $in: commentIdList } })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();

    const populatedComments = await Promise.all(
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
          createdAt: getFormattedDate(comment.createdAt),
          updatedAt: getFormattedDate(comment.updatedAt),
        };
      }),
    );

    const hasNextPage = comments.length === pageSize;
    const nextPage = hasNextPage ? page + 1 : null;
    const nextPageUrl = nextPage ? `/api/mypage/bookmarks/comments?page=${nextPage}` : null;

    res.status(200).json({ comments: populatedComments, nextPageUrl });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
