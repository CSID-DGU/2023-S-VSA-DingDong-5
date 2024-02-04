const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");

const port = process.env.PORT || 5001;

const adminRoute = require("./admin/admin");
const authRoute = require("./routes/auth");
const questionRoute = require("./routes/question");
const userRoute = require("./routes/user");
const answerRoute = require("./routes/answer");
const commentRoute = require("./routes/comment");
const searchRoute = require("./routes/search");
const mypageRoute = require("./routes/mypage");
const setupScheduledJob = require("./utils/setupScheduledJob");

console.log(process.env.NODE_ENV);

// NODE_ENV에 따라 적절한 .env 파일을 로드한다.
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./.env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" });
}

app.use(bodyParser.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(passport.initialize());
app.use(express.json({ limit: "50mb" }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/admin", adminRoute);
app.use("/api/auth", authRoute);
app.use("/api/articles", questionRoute);
app.use("/api/users", userRoute);
app.use("/api/answer", answerRoute);
app.use("/api/comment", commentRoute);
app.use("/api/search", searchRoute);
app.use("/api/mypage", mypageRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  setupScheduledJob();
});
