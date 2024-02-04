const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// NODE_ENV에 따라 적절한 .env 파일을 로드한다.
if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: "./.env.development" });
} else if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./.env.production" });
}

exports.authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No Token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Authentication failed" });
    req.user = user;
    next();
  });
};
