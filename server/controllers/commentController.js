const Comment = require('../models/Comment');

// Database Handler
const getCommentListByQuestionId = async questionId => {
  try {
    const commentList = await Comment.find({ questionId: questionId });
    return commentList;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getCommentListByQuestionId,
};
