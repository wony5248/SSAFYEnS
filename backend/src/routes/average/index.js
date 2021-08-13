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
  // validation.user_id,
  controller.get_daily_$date$
  // (req, res) => {
  //   payload = { ...req.params, ...req.body };
  //   console.log("payload : ", payload);

  //   const result = validationResult(req);
  //   if (!result.isEmpty()) {
  //     console.log(validationResult(req));
  //     res.status("400").json({ error: result });
  //   } else {
  //     service
  //       .get_daily(payload)
  //       .then((data) => {
  //         res.json(data);
  //       })
  //       .catch((error) => {
  //         res.status("405").json({ error });
  //       });
  //   }
  // }
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
  (req, res) => {
    payload = { ...req.params, ...req.body };
    console.log("payload : ", payload);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ error: result });
    } else {
      service
        .put_daily(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").json({ error });
        });
    }
  }
);
// Delete Comment on daily
// todo delete ​/average​/daily​/{date}

// Get weekly information
router.get(
  "/week/:date",
  validation.month,
  validation.year,
  validation.week,
  validation.user_id,
  controller.get_week_$date$
);

// Get monthly information
router.get(
  "/month/:date",
  validation.year,
  validation.month,
  validation.user_id,
  controller.get_month_$date$
);
//Get yearly information
router.get(
  "/year/:date",
  validation.year,
  validation.user_id,
  controller.get_year_$date$
);

// Get yearly information
module.exports = router;
