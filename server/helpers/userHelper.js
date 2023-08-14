const User = require('../models/User');

const getAuthorName = async userId => {
  const user = await User.findById(userId);
  return user ? user.username : 'unknown';
};

module.exports = {
  getAuthorName,
};
