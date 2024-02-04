const mongoose = require('mongoose');

// Question[id, title, content, votes, answers, views, saves, comments,
// userId(author), hashtags], User 저장

const CopyQuestionSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    title: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      index: true,
    },
    votes: {
      type: Number,
      default: 0,
    },
    answers: {
      type: Number,
      default: 0,
    },
    views: {
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
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    hashtags: {
      type: [String],
      required: false,
      index: true,
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

module.exports = mongoose.model('CopyQuestion', CopyQuestionSchema);
