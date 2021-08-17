const { validationResult, check, oneOf, body } = require("express-validator");
const logic = require("./")
const moment = require("moment");
moment.tz.setDefault("Asia/Seoul");


//not null
exports.date = check("date")
  .notEmpty()
  .custom(logic.verifyDate)
  .customSanitizer(logic.startOfDay);

exports.started_at = check("started_at") //req에 있는 key 중 started_at를 찾아 value를 검사
  .notEmpty()
  .custom(logic.verifyDate) // (validation) 반환값이 false면 req에 에러추가
  .custom(logic.start_atBeforeFinished_at) //started_at과 finished_at 차이가 하루 이상이면 에러
  .customSanitizer(logic.momentToDate); //(Sanitization) 입려된 started_at value값을 변조해 반환

exports.finished_at = check("finished_at")
  .notEmpty()
  .custom(logic.verifyDate)
  .customSanitizer(logic.momentToDate);

exports.deadline_at = check("deadline_at")
  .custom(logic.verifyDate)
  .customSanitizer(logic.momentToDate);


//notification
exports.notification = check("notification").default(null);
exports.notificationtime = check("notificationtime")
  .custom(logic.verifyDateOrNull)
  .customSanitizer(logic.momentToDate);

//submit
exports.is_finished = check("is_finished").isIn([null, true, false]);
exports.point = check("point").default(0).isInt()
exports.cnt_schedule = check("cnt_schedule").default(0);

//environment
exports.humidity = check("humidity").default(0).isInt();
exports.illuminance = check("illuminance").default(0).isInt();
exports.noise = check("noise").default(0).isInt();
exports.temperature = check("temperature").default(0).isInt();

exports.notHumidity = check("humidity").not().notEmpty();
exports.notIlluminance = check("illuminance").not().notEmpty();
exports.notNoise = check("noise").not().notEmpty();
exports.notTemperature = check("temperature").not().notEmpty();


//auto generic
exports.generateWeekFromBody = check("week").customSanitizer((value, { req }) =>
  moment(req.body.started_at).isoWeek()
);
exports.generateMonthFromBody = check("month").customSanitizer(
  (value, { req }) => moment(req.body.started_at).month() + 1
);
exports.generateYearFromBody = check("year").customSanitizer((value, { req }) =>
  moment(req.body.started_at).year()
);