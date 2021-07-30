const cors = require("cors");

var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  },
};
module.exports = cors(corsOptions);
