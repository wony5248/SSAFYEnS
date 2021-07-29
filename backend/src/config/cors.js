const cors = require("cors");
var whitelist = ["http://127.0.0.1:3000", "http://localhost:3000"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
module.exports = cors(corsOptions);
