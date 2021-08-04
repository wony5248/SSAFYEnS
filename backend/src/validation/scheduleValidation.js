const { validationResult, check, oneOf } = require("express-validator");
const moment = require("moment");

//example

exports.date = check("date")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) =>
    moment(value).format("YYYY-MM-DD").toDate()
  );

exports.started_at = check("started_at") //req에 있는 key 중 started_at를 찾아 value를 검사
  .notEmpty() //(validation) empty 값 null, "", false 이면 req에 에러 추가
  .custom((value, { req }) => moment(value).isValid()) // (validation) 반환값이 false면 req에 에러추가
  .customSanitizer((value, { req }) => moment(value).toDate()); //(Sanitization) 입려된 started_at value값을 변조해 반환
exports.finished_at = check("finished_at")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).toDate());
exports.deadline_at = check("deadline_at")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) => moment(value).toDate());
exports.notification = oneOf([
  check("notification")
    .custom((value, { req }) => moment(value).isValid())
    .customSanitizer((value, { req }) =>
      moment(value).isValid() ? moment(value).toDate() : null
    ),
  check("notification").custom((value, { req }) => value == null),
]);
exports.isfinished = check("is_finished").isIn([null, true, false]);
//   check("isfinished").isBoolean(),);
//   .custom((value, { req }) => [null, true, false].indexOf(value) != -1)

exports.month = check("month")
  .notEmpty()
  .custom((value, { req }) => moment(value).isValid())
  .customSanitizer((value, { req }) =>
    moment(value).isValid() ? moment(value).toDate() : null
  );
