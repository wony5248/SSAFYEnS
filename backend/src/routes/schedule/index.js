const router = require("express").Router();
const validation = require("../../validation/scheduleValidation");
const service = require("../../service/scheduleService");
const controller = require("../../controller/scheduleController");
const { validationResult } = require("express-validator");
// Add a new schedule to user
getPayload = (req) => { return { body: req.body, params: req.params, user_id: req.user_id } };
router.post(
  "/",
  validation.date,
  validation.started_at,
  validation.finished_at,
  validation.deadline_at,
  validation.notification,
  validation.notificationtime,
  validation.is_finished,
  validation.month,
  validation.year,
  validation.week,
  validation.point,
  validation.cnt_schedule,
  validation.user_id,
  validation.humidity,
  validation.illuminance,
  validation.noise,
  validation.temperature,
  controller.post
);
router.get("/:schedule_id", controller.get_$schedule_id$);

//Updates a schedule with JSON data
router.put(
  "/:schedule_id",
  validation.date,
  validation.started_at,
  validation.finished_at,
  validation.deadline_at,
  validation.notification,
  validation.notificationtime,
  validation.is_finished,
  validation.month,
  validation.year,
  validation.week,
  validation.cnt_schedule,
  validation.user_id,
  validation.humidity,
  validation.illuminance,
  validation.noise,
  validation.temperature,
  controller.put_$schedule_id$
);
//Deletes a schedule
router.delete("/:schedule_id", controller.delete_$schedule_id$);

//Get all schedules of user of specific month
//todo url 변경 /schedule/month/{month}
router.get("/month/:date", validation.date, controller.get_month_$date$);

//unspceified

//get all scheudle of day
router.get("/daily/:date", validation.date, controller.get_daily_$date$);

//get all scheudle of day
// router.get("/week/:date", validation.date, (req, res) => {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     console.log(validationResult(req));
//     res.status("400").json({ result });
//   } else {
//     console.log(req.params);
//     service
//       .get_week(req.params.date)
//       .then((data) => {
//         res.json({ data });
//       })
//       .catch((error) => {
//         res.status("405").json({ error });
//       });
//   }
// });

// Get yearly schedule
router.get("/year/:date", validation.date, controller.get_year_$date$);
module.exports = router;
