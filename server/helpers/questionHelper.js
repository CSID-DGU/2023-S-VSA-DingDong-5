const Question = require('../models/Question');
const generalHelpers = require('../helpers/generalHelpers');
const userHelper = require('../helpers/userHelper');

const questionExists = async questionId => {
  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error('Question not found');
  }
  return question;
};

const getQuestionsSorted = async (pageSize, startIndex, sortType) => {
  let questions = [];
  if (sortType === 'latest') {
    questions = getQuestionsSortedByLatest(startIndex, pageSize);
  } else if (sortType === 'popular') {
    questions = getQuestionsSortedByPopular(startIndex, pageSize);
  } else if (sortType === 'interest') {
    questions = getQuestionsSortedByInterest(startIndex, pageSize);
  }
  return questions;
};

const getQuestionsSortedByLatest = async (startIndex, pageSize) => {
  const questions = await Question.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(pageSize)
    .exec();
  return questions;
};

const getQuestionsSortedByPopular = async (startIndex, pageSize) => {
  const questions = await Question.find({ isDeleted: false })
    .sort({ views: -1 })
    .skip(startIndex)
    .limit(pageSize)
    .exec();
  return questions;
};

const getQuestionsSortedByInterest = async (startIndex, pageSize) => {
  const questions = await Question.find({ isDeleted: false })
    .sort({ votes: -1 })
    .skip(startIndex)
    .limit(pageSize)
    .exec();
  return questions;
};

const getUpdatedQuestions = async questions => {
  const updatedQuestions = await Promise.all(
    questions.map(async question => {
      const author = await userHelper.getAuthorName(question.userId);
      return generalHelpers.getUpdatedArticles(question, author);
    }),
  );
  return updatedQuestions;
};

module.exports = {
  questionExists,
  getQuestionsSorted,
  getUpdatedQuestions,
};
