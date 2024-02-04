const mongoose = require('mongoose');

const CopyAnswerSchema = new mongoose.Schema(
  {
    answerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Answer',
      required: true,
    },
    content: {
      type: String,
    },
    questionTitle: {
      type: String,
      index: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    votes: {
      type: Number,
      default: 0,
    },
    saves: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('CopyAnswer', CopyAnswerSchema);
