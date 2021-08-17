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
  validation.generateMonthFromBody,
  validation.generateWeekFromBody,
  validation.generateYearFromBody,

  validation.started_at,
  validation.finished_at,
  validation.deadline_at,

  validation.notification,
  validation.notificationtime,

  validation.is_finished,

  validation.point,
  validation.cnt_schedule,

  validation.notHumidity,
  validation.notIlluminance,
  validation.notNoise,
  validation.notTemperature,

  controller.post
);
router.get("/:schedule_id", controller.get_$schedule_id$);

//Updates a schedule with JSON data
router.put(
  "/:schedule_id",
  validation.date,
  validation.generateMonthFromBody,
  validation.generateWeekFromBody,
  validation.generateYearFromBody,

  validation.started_at,
  validation.finished_at,
  validation.deadline_at,

  validation.notification,
  validation.notificationtime,

  validation.is_finished,
  validation.cnt_schedule,

  validation.humidity,
  validation.illuminance,
  validation.noise,
  validation.temperature,

  controller.put_$schedule_id$
);
//Deletes a schedule
router.delete("/:schedule_id", validation.date, controller.delete_$schedule_id$);

//Get all schedules of user of specific month
router.get("/month/:date", validation.date, controller.get_month_$date$);

//get all scheudle of day
router.get("/daily/:date", validation.date, controller.get_daily_$date$);

// Get yearly schedule
router.get("/year/:date", validation.date, controller.get_year_$date$);
module.exports = router;
