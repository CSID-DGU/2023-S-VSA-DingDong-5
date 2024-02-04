const router = require('express').Router();
const User = require('../models/User');
const Question = require('../models/Question');
const bcrypt = require('bcrypt');

// GET
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json('You can update only your account!');
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Question.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json('User not found!');
    }
  } else {
    res.status(401).json('You can delete only your account!');
  }
});

// Bookmark Question 조회
router.get('/mypage/bookmark/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId).populate('bookmarkedQuestions');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const bookmarkedQuestions = user.bookmarkedQuestions;
    res.status(200).json(bookmarkedQuestions);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
