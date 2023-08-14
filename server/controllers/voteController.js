const Vote = require('../models/Vote');

// Database Handler
const deleteAllVotes = (article, articleId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Vote.deleteMany({
        [article]: articleId,
      });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  deleteAllVotes,
};
