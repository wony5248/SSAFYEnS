const router = require("express").Router();
const { validationResult } = require("express-validator");
const service = require("../../service/averageService");
const validation = require("../../validation/averageValidation");

//Get daily information
router.get(
  "/daily/:date",
  validation.date,
  validation.month,
  validation.year,
  validation.week,
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
        .get_daily(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").json({ error });
        });
    }
  }
);

//comment on daily
//todo url post /average/daily/{date} context 기능 수정
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
  validation.date,
  validation.month,
  validation.year,
  validation.week,
  validation.user_id,
  (req, res) => {
    const payload = { ...req.body, ...req.params };
    console.log("payload : ", payload);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json(result);
    } else {
      service
        .get_week(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").json({ error });
        });
    }
  }
);

// Get monthly information
router.get(
  "/month/:date",
  validation.date,
  validation.year,
  validation.month,
  validation.user_id,
  (req, res) => {
    const payload = { ...req.params, ...req.body };
    console.log(payload);
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ error: result });
    } else {
      service
        .get_month(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").json({ error });
        });
    }
  }
);
//Get yearly information
router.get(
  "/year/:date",
  validation.date,
  validation.year,
  validation.user_id,
  (req, res) => {
    const payload = { ...req.params, ...req.body };
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ error: result });
    } else {
      service
        .get_year(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").json({ error });
        });
    }
  }
);

// Get yearly information
module.exports = router;
