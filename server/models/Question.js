const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
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
    userId: {
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
  },
  { timestamps: true },
);

// 현재 UTC 시간을 기준으로 한국 시간으로 변환
QuestionSchema.pre('save', function (next) {
  const seoulTime = new Date(this.createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
  this.createdAt = new Date(seoulTime);
  next();
});

module.exports = mongoose.model('Question', QuestionSchema);
