const router = require("express").Router();
const { validationResult } = require("express-validator");
const validation = require("../../validation/averageValidation");
const controller = require("../../controller/averageController")

//Get daily information
router.get(
  "/daily/:date",
  validation.date,
  validation.month,
  validation.year,
  validation.week,
  controller.get_daily_$date$
);

//comment on daily
router.put(
  "/daily/",
  validation.date,
  validation.month,
  validation.year,
  validation.week,
  validation.daily_context,
  validation.user_id,
  controller.put_daily_$date$
);
// Delete Comment on daily
// todo delete ​/average​/daily​/{date}

// Get weekly information
router.get(
  "/weekly/:date",
  validation.week,
  validation.month,
  validation.year,
  validation.user_id,
  controller.get_week_$date$
);

// Get monthly information
router.get(
  "/monthly/:date",
  validation.year,
  validation.month,
  validation.user_id,
  controller.get_month_$date$
);
//Get yearly information
router.get(
  "/yearly/:date",
  validation.year,
  validation.user_id,
  controller.get_year_$date$
);

// Get yearly information
module.exports = router;
