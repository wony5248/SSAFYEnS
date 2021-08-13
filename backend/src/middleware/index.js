const config = require("../config/config.js");
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const payload = jwt.verify(
    req.headers["access_token"],
    config.secret || "secret",
    (error, decoded) => {
      if (error) {
        console.log("[TEST]This is jwt error:", error);
        return res.json({ error })
      } else {
        console.log("[TEST]This is jwt decoded:", decoded);
        req.user_id = decoded.user_id;
        next();
      }
    }
  );
};
