const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 5001;

const adminRoute = require('./admin/admin');
const authRoute = require('./routes/auth');
const questionRoute = require('./routes/question');
const userRoute = require('./routes/user');
const answerRoute = require('./routes/answer');
const commentRoute = require('./routes/comment');
const searchRoute = require('./routes/search');
const mypageRoute = require('./routes/mypage');
const setupScheduledJob = require('./utils/setupScheduledJob');

dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(express.json({ limit: '50mb' }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/admin', adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/articles', questionRoute);
app.use('/api/users', userRoute);
app.use('/api/answer', answerRoute);
app.use('/api/comment', commentRoute);
app.use('/api/search', searchRoute);
app.use('/api/mypage', mypageRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setupScheduledJob();
});
