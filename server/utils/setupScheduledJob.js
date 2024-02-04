const schedule = require('node-schedule');
const Question = require('../models/Question');

// hard deletion 시간 설정
const setupScheduledJob = () => {
  const scheduleHardDelete = schedule.scheduleJob('0 0 * * 1', async () => {
    try {
      const currentDate = new Date();

      const deletedQuestions = await Question.deleteMany({
        isDeleted: true,
        hardDeleteAt: { $lte: currentDate },
      });
      console.log(`${deletedQuestions.deletedCount} questions hard deleted.`);
    } catch (err) {
      console.error('Error during hard delete:', err);
    }
  });
};

module.exports = setupScheduledJob;
