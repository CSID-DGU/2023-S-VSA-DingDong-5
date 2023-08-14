const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    content: {
      type: String,
      required: true,
      index: true,
    },
    questionTitle: {
      type: String,
      index: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },
    userId: {
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
  },
  { timestamps: true },
);

// 현재 UTC 시간을 기준으로 한국 시간으로 변환
AnswerSchema.pre('save', function (next) {
  const seoulTime = new Date(this.createdAt).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
  });
  this.createdAt = new Date(seoulTime);
  next();
});

module.exports = mongoose.model('Answer', AnswerSchema);
