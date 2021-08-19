const {
  validationResult,
  check,
  oneOf,
  body,
  param,
} = require("express-validator");
const moment = require("moment");
moment.tz.setDefault("Asia/Seoul");

//example

exports.date = check("date")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).startOf("day").toDate());
exports.month = check("month").customSanitizer(
  (value, { req }) => moment(req.body.date || req.params.date).month() + 1
);

exports.week = check("week").customSanitizer((value, { req }) =>
  moment(req.body.date || req.params.date).isoWeek()
);

exports.year = check("year").customSanitizer((value, { req }) =>
  moment(req.body.date || req.params.date).year()
);
exports.point = check("point").customSanitizer((value, { req }) => 0);
exports.user_id = check("user_id").default("jbj");
exports.daily_context = check("daily_context").notEmpty();
