//import module
const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// NODE_ENV에 따라 적절한 .env 파일을 로드한다.
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./.env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" });
}

// TODO : httpOnly cookie 에 jwt 토큰 저장 (refresh token)

//jwt
passport.use(
  "jwt",
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (jwt_payload, done) => {
      done(null, {
        id: jwt_payload.id,
      });
    }
  )
);

// login for the firt time
passport.use(
  "local",
  new passportLocal.Strategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        console.log(user);
        if (!user) {
          return done(null, false, { reason: "User not found" });
        }
        if (!user.comparePassword(password)) {
          return done(null, false, { reason: "Invalid password" });
        }
        // authentication success
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNIN
router.post("/signin", async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user)
      return res.status(400).json({ message: "Authentication failed" });
    return req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      // const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '7d' });
      // res.cookie('refreshToken', refreshToken, { httpOnly: true });
      return res.status(200).json({ token: token });
    });
  })(req, res, next);
});

// SIGNOUT
router.get("/signout", (req, res) => {
  // client에서 token 지움
  res.status(200).json({ message: "Signout success" });
});

module.exports = router;
