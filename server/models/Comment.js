const mongoose = require('mongoose');

// 제목, 내용, 작성자, 조회수, 해시태그
const CommentSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    questionId: {
      type: Number,
      required: true,
    },
    answerId: {
      type: Number,
      default: 0,
    },
    userId: {
      type: Number,
      default: 0,
    }
  },
  // 생성일(createdAt)과 수정일(updatedAt)을 자동으로 관리
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);