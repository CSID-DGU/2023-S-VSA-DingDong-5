const Question = require('../models/Question');
const generalHelpers = require('../helpers/generalHelpers');
const questionHelper = require('../helpers/questionHelper');
const userHelper = require('../helpers/userHelper');

const getAllQuestions = (page, pageSize, sortType) => async (req, res) => {
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await questionHelper.getQUestionsSorted(pageSize, startIndex, sortType);
    const updatedQuestions = await questionHelper.getUpdatedQuestions(questions);
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllQuestions,
};
