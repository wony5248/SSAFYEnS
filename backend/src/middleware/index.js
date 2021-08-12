const config = require("../config/config.js");
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const payload = jwt.verify(
    req.headers["access_token"],
    config.secret || "secret",
    (err, decoded) => {
      if (err) {
        console.log("[TEST]This is jwt err:", err);
        return res.status(400).send({ error: "올바르지 않은 토큰입니다" });
      } else {
        console.log("[TEST]This is jwt decoded:", decoded);
        req.body.user_id = decoded.user_id;
        next();
      }
    }
  );
};
