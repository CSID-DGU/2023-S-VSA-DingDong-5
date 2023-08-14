const User = require('../models/User');

// Database Handler
const getAuthorName = async userId => {
  try {
    const user = await User.findById(userId);
    return user ? user.username : 'unknown';
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAuthorName,
};
