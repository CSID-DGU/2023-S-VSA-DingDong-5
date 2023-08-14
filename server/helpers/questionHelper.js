const Question = require('../models/Question');

const getQuestionsSortedByLatest = async (startIndex, pageSize) => {
  const questions = await Question.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .skip(startIndex)
    .limit(pageSize)
    .exec();
  return questions;
};

module.exports = {
  getQuestionsSortedByLatest,
};
