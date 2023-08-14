const Question = require('../models/Question');
const generalHelpers = require('../helpers/generalHelpers');
const questionHelper = require('../helpers/questionHelper');
const userHelper = require('../helpers/userHelper');
const commentController = require('./commentController');
const voteController = require('./voteController');

// Response Handler
const getAllQuestions = (page, pageSize, sortType) => async (req, res) => {
  const startIndex = (page - 1) * pageSize;
  try {
    const totalQuestions = await Question.countDocuments({ isDeleted: false });
    const questions = await questionHelper.getQuestionsSorted(pageSize, startIndex, sortType);
    const updatedQuestions = await questionHelper.getUpdatedQuestions(questions);
    res.status(200).json({ updatedQuestions, totalQuestions });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    const question = await questionHelper.questionExists(questionId);
    const author = await userHelper.getAuthorName(question.userId);
    const commentList = await commentController.getCommentListByQuestionId(questionId);
    const updatedQuestion = await generalHelpers.getUpdatedArticlesWithComments(question, author, commentList);
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    questionHelper.questionExists(questionId);

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionId,
      {
        $set: req.body,
        updatedAt: generalHelpers.formatDateKST(new Date()),
      },
      { new: true },
    );
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteQuestion = async (req, res) => {
  const questionId = req.params.id;
  try {
    await Question.findByIdAndUpdate(
      questionId,
      {
        content: '',
        isDeleted: true,
        updatedAt: generalHelpers.formatDateKST(),
      },
      { new: true },
    );

    const result = await voteController.deleteAllVotes('question', questionId);
    console.log(result);
    res.status(200).json('Question has been deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
