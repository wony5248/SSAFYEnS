const router = require("express").Router();
const { validationResult } = require("express-validator");
const service = require("../../service/averageService");
const validation = require("../../validation/averageValidation");
//Get daily information
//todo uml get /average/daily/{date}
router.get("/daily/:date", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    service
      .get_daily(req.params.date)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status("405").json({ error });
      });
  }
});

//comment on daily
//todo url post /average/daily/{date}
router.post(
  "/daily/:date",
  validation.date,
  validation.month,
  validation.year,
  validation.week,
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ result });
    } else {
      service
        .post_submit(req.body)
        .then((data) => {
          res.json({ data });
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
// todo url ​/average​/weekly​/{week}
router.get("/week/:date", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    console.log(req.params);
    service
      .get_week(req.params.date)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status("405").json({ error });
      });
  }
});

// Get monthly information
//todo url get /average/monthly/{month}
router.get("/month/:date", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    service
      .get_month(req.params.date)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status("405").json({ error });
      });
  }
});

// Get yearly information
module.exports = router;
