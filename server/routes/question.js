const router = require('express').Router();
const Question = require('../models/Question');
const User = require('../models/User');
const Vote = require('../models/Vote');
const Comment = require('../models/Comment');
const Bookmark = require('../models/Bookmark');
const CopyQuestion = require('../models/CopyQuestion');

const authMiddleware = require('../middlewares/authenticates');
const authenticateToken = authMiddleware.authenticateToken;

/*
  Question 메서드
  - createQuestion
  - getQuestions
  - getLatestQuestions
  - getPopularQuestions
  - getInterestingQuestions
  - getQuestion
  - updateQuestion
  - deleteQuestion
  - getAllHashtags
  - comment
  - vote
  - bookmark
  - updateViews
  - getVoteList
  - getBookmarkList
*/

const getFormattedDate = date => {
  return new Date(date).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
};

// CREATE
router.post('/', authenticateToken, async (req, res) => {
  const userId = req.body.userId;
  const userIdFromToken = req.user.id;
  const newQuestion = new Question(req.body);
  try {
    if (userId !== userIdFromToken) {
      return res.status(403).json({ message: 'Authentication failed' });
    }
    const savedQuestion = await newQuestion.save();
    res.status(200).json(savedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -LATEST
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
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
          createdAt: getFormattedDate(question.createdAt),
          updatedAt: getFormattedDate(question.updatedAt),
        };
        return updatedQuestion;
      }),
    );

    //extract hashtags list in one page
    const hashtagsList = questions.flatMap(question => question.hashtags);

    res.status(200).json({ updatedQuestions, totalQuestions, hashtags: hashtagsList });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -POPULAR
router.get('/popular', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ views: -1 }) // 조회순으로 정렬
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
          createdAt: getFormattedDate(question.createdAt),
          updatedAt: getFormattedDate(question.updatedAt),
        };
        return updatedQuestion;
      }),
    );
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL -INTEREST
router.get('/interest', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await Question.find({ isDeleted: false })
      .sort({ votes: -1 })
      .skip(startIndex)
      .limit(pageSize)
      .exec();
    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const user = await User.findById(question.userId);
        const author = user ? user.username : 'unknown';
        const updatedQuestion = {
          ...question._doc,
          author,
          createdAt: getFormattedDate(question.createdAt),
          updatedAt: getFormattedDate(question.updatedAt),
        };
        return updatedQuestion;
      }),
    );
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL - without pagination
router.get('/all', async (req, res) => {
  try {
    const questions = await Question.find();
    const updatedQuestions = questions.map(question => {
      return {
        ...question._doc,
        createdAt: getFormattedDate(question.createdAt),
        updatedAt: getFormattedDate(question.updatedAt),
      };
    });
    res.status(200).json(updatedQuestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get All hashtags
router.get('/allhashtags', async (req, res) => {
  try {
    const allQuestions = await Question.find({ isDeleted: false });

    // Create an array of hashtag objects with their creation dates
    const hashtagObjects = allQuestions.flatMap(question => {
      return question.hashtags.map(hashtag => {
        return {
          hashtag,
          createdAt: question.createdAt,
        };
      });
    });

    // Count hashtag frequencies
    const hashtagFrequencies = hashtagObjects.reduce((map, obj) => {
      map.set(obj.hashtag, (map.get(obj.hashtag) || 0) + 1);
      return map;
    }, new Map());

    // Sort hashtag objects by frequency and then by creation date
    const sortedHashtagObjects = hashtagObjects.sort((a, b) => {
      const frequencyComparison = hashtagFrequencies.get(b.hashtag) - hashtagFrequencies.get(a.hashtag);
      if (frequencyComparison === 0) {
        // If frequencies are the same, sort by creation date (newest first)
        return b.createdAt - a.createdAt;
      }
      return frequencyComparison;
    });

    // Extract the sorted hashtags and remove duplicates
    const uniqueSortedHashtags = [...new Set(sortedHashtagObjects.map(obj => obj.hashtag))];

    res.status(200).json({ hashtags: uniqueSortedHashtags });
  } catch (err) {
    res.status(500).json(err);
  }
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
      createdAt: getFormattedDate(question.createdAt),
      updatedAt: getFormattedDate(question.updatedAt),
    };
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET - 클라이언트에서 요청한 질문 ID의 유효성을 검증
router.get('/valid/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findOne({ _id: questionId, isDeleted: false });
    const copyQuestion = await CopyQuestion.findOne({ _id: questionId, isDeleted: false });

    if (question || copyQuestion) {
      // 유효한 질문 ID인 경우
      res.status(200).json({ isValid: true });
    } else {
      // 유효하지 않은 질문 ID인 경우
      res.status(200).json({ isValid: false });
    }
  } catch (error) {
    console.error('Error checking question ID validity:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// UPDATE
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json('Question not found!');
    }
    if (question.userId.toString() !== req.user.id) {
      return res.status(403).json('You can update only your question!');
    }
    try {
      const updatedQuestion = await Question.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
          updatedAt: getFormattedDate(question.updatedAt),
        },
        { new: true },
      );
      res.status(200).json(updatedQuestion);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.put('/:id/delete', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userIdFromToken = req.user.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    if (question.userId.toString() !== userIdFromToken) {
      return res.status(403).json({ error: 'Access denied' });
    }
    await Question.findByIdAndUpdate(
      questionId,
      {
        content: '삭제된 게시물 입니다. (' + getFormattedDate(question.updatedAt) + ')',
        isDeleted: true,
        updatedAt: getFormattedDate(question.updatedAt),
        hardDeletedAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul',
        }),
      },
      { new: true },
    );
    await Vote.deleteMany({ questionId: req.params.id });

    res.status(200).json({ message: 'Question has been deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ETC

// Comment
router.put('/:id/comment', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ error: 'Question not found!' });
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
router.put('/:id/vote', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;
  try {
    const question = await Question.findById(questionId);
    let isVoted = false;
    if (!question) {
      res.status(404).json({ error: 'Question not found!' });
    }
    // token userId 와 question userId 가 같은 경우 투표할 수 없음
    if (question.userId.toString() === userId) {
      return res.status(403).json({ error: 'You cannot vote your own question!' });
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
      isVoted = true;
    } else {
      await Vote.deleteOne({ _id: existingVote._id });
      question.votes -= 1;
      isVoted = false;
    }
    await question.save();
    // 해당 사용자의 투표 여부 전달
    res.status(200).json(isVoted);
  } catch (err) {
    res.status(500).json(err);
  }
});

// isVoted - 투표 여부 확인
router.get('/:id/isVoted', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;
  try {
    const vote = await Vote.findOne({
      questionId,
      userId,
    });

    if (!vote) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Bookmark
router.put('/:id/bookmark', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;
  try {
    const question = await Question.findById(questionId);
    let isBookmarked = false;
    if (!question) {
      res.status(404).json({ error: 'Question not found!' });
    }
    if (question.userId.toString() === userId) {
      return res.status(403).json({ error: 'You cannot bookmark your own question' });
    }
    const existingBookmark = await Bookmark.findOne({
      questionId,
      userId,
    });

    if (!existingBookmark) {
      await Bookmark.create({
        questionId,
        userId,
      });
      await CopyQuestion.create({
        questionId,
        title: question.title,
        content: question.content,
        votes: question.votes,
        answers: question.answers,
        views: question.views,
        saves: question.saves,
        comments: question.comments,
        authorId: question.userId, // Question 작성자 id
        hashtags: question.hashtags,
        isDeleted: question.isDeleted,
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
        userId: userId, // Bookmark 한 사용자 id
      });
      question.saves += 1;
      isBookmarked = true;
    } else {
      await Bookmark.deleteOne({ _id: existingBookmark._id });
      await CopyQuestion.deleteOne({ questionId, userId });
      question.saves -= 1;
      isBookmarked = false;
    }
    await question.save();
    res.status(200).json(isBookmarked);
  } catch (err) {
    res.status(500).json(err);
  }
});

// isBookmarked - 북마크 여부 확인
router.get('/:id/isBookmarked', authenticateToken, async (req, res) => {
  const questionId = req.params.id;
  const userId = req.user.id;
  try {
    const bookmark = await Bookmark.findOne({
      questionId,
      userId,
    });

    if (!bookmark) {
      res.status(200).json(false);
    } else {
      res.status(200).json(true);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// questionId 로 copyQuestion 조회
router.get('/:id/bookmark', async (req, res) => {
  const questionId = req.params.id;
  try {
    const copyQuestion = await CopyQuestion.findOne({
      questionId,
    });
    const user = await User.findById(copyQuestion.authorId);
    const author = user ? user.username : 'unknown';
    const updatedQuestion = {
      ...copyQuestion._doc,
      author,
      createdAt: getFormattedDate(copyQuestion.createdAt),
      updatedAt: getFormattedDate(copyQuestion.updatedAt),
    };

    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Views
router.put('/:id/view', async (req, res) => {
  const questionId = req.params.id;

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      res.status(404).json({ error: 'Question not found!' });
    }
    question.views += 1;
    await question.save();
    res.status(200).json({ error: 'Question has been viewed' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET VOTE LIST
router.get('/:id/votelist', async (req, res) => {
  const questionId = req.params.id;
  try {
    const votelist = await Vote.find({ questionId: questionId });
    res.status(200).json(votelist);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET BOOKMARK LIST
router.get('/:id/bookmarklist', async (req, res) => {
  const questionId = req.params.id;
  try {
    const bookmarklist = await Bookmark.find({ questionId: questionId });
    res.status(200).json(bookmarklist);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
