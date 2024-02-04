const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Bookmark', BookmarkSchema);
