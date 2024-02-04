const router = require('express').Router();
const Question = require('../models/Question');
const Answer = require('../models/Answer');

const convertToKoreanTime = data => {
  return data.map(item => {
    const convertedItem = item.toObject ? item.toObject() : item; // Check if item is a Mongoose document
    return {
      ...convertedItem,
      createdAt: new Date(convertedItem.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
      updatedAt: new Date(convertedItem.updatedAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    };
  });
};

// keyword, hashtag 검색
router.get('/', async (req, res) => {
  const keyword = req.query.keyword;
  const hashtag = req.query.hashtag;
  const searchConditions = [];

  if (keyword) {
    searchConditions.push({
      $or: [{ title: { $regex: keyword, $options: 'i' } }, { content: { $regex: keyword, $options: 'i' } }],
    });
  }
  if (hashtag) {
    searchConditions.push({
      hashtags: { $regex: hashtag, $options: 'i' },
    });
  }

  try {
    const questionResults = await Question.find({
      $and: searchConditions,
    });
    const answerResults = await Answer.find({
      $and: searchConditions,
    });

    const answerResultsWithHashtags = await Promise.all(
      answerResults.map(async answer => {
        const question = await Question.findById(answer.questionId);
        const questionHashtags = question ? question.hashtags : [];

        return {
          ...answer._doc,
          questionHashtags,
        };
      }),
    );

    const convertedQuestions = convertToKoreanTime(questionResults);
    const convertedAnswers = convertToKoreanTime(answerResultsWithHashtags);

    const result = [...convertedQuestions, ...convertedAnswers];
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// hashtag로 검색
router.get('/hashtag', async (req, res) => {
  const hashtag = req.query.hashtag;
  try {
    const result = await Question.find({
      hashtags: { $regex: hashtag, $options: 'i' },
    });

    result.forEach(question => {
      question.createdAt = new Date(question.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      });
    });
    const convertedResult = convertToKoreanTime(result);
    res.status(200).json(convertedResult);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
