const router = require('express').Router();
const User = require('../models/User');
const Question = require('../models/Question');
const userController = require('../controllers/userController');

// GET
router.get('/:id', userController.getUser);

// UPDATE
router.put('/:id', userController.updateUser);

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
