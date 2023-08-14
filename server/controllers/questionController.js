const Question = require('../models/Question');
const generalHelpers = require('../helpers/generalHelpers');
const questionHelper = require('../helpers/questionHelper');
const userHelper = require('../helpers/userHelper');

const getAllLatestQuestions = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = questionHelper.getQuestionsSortedByLatest(startIndex, pageSize);

    const updatedQuestions = await Promise.all(
      questions.map(async question => {
        const author = await userHelper.getAuthorName(question.userId);
        return generalHelpers.getUpdatedArticles(question, author);
      }),
    );

    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllLatestQuestions,
};
