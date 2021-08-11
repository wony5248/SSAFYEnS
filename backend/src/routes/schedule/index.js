const router = require("express").Router();
const validation = require("../../validation/scheduleValidation");
const service = require("../../service/scheduleService");
const { validationResult } = require("express-validator");
// Add a new schedule to user
router.post(
  "/",
  validation.date,
  validation.started_at,
  validation.finished_at,
  validation.deadline_at,
  validation.notification,
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
  (req, res) => {
    //validation middleware에서 에러 발생시 req에 에러 관련 객체 담김.
    payload = { ...req.body, ...req.params };
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ result });
    } else {
      service
        .post(payload)
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").send({ error: "error" });
        });
    }
  }
);
router.get("/:schedule_id", (req, res) => {
  const errors = validationResult(req);
  console.log("error : ", errors);
  service
    .get_$schedule_id$(req.params)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status("405").send(error);
    });
});
//Updates a schedule with JSON data
//todo 파라미터 추가
router.put(
  "/:schedule_id",
  validation.date,
  validation.started_at,
  validation.finished_at,
  validation.deadline_at,
  validation.notification,
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
  (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ result });
    } else {
      service
        .put_$schedule_id$({
          schedule_id: req.params.schedule_id,
          body: req.body,
        })
        .then((data) => {
          res.json(data);
        })
        .catch((error) => {
          res.status("405").send(error);
        });
    }
  }
);
//Deletes a schedule
router.delete("/:schedule_id", (req, res) => {
  const payload = { ...req.body };
  service
    .delete_$schedule_id$(payload)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status("405").json({ error });
    });
});
//Get all schedules of user of specific month
//todo url 변경 /schedule/month/{month}
router.get("/month/:date", validation.date, (req, res) => {
  const result = validationResult(req);
  const payload = { ...req.body, ...req.params };
  console.log("payload :", payload);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
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
});

//unspceified

//get all scheudle of day
router.get("/daily/:date", validation.date, (req, res) => {
  const payload = { ...req.body, ...req.params };
  console.log("payload 22:", payload);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ error: "error" });
  } else {
    service
      .post_daily(payload)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status("405").json({ error: "error" });
      });
  }
});

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
router.get("/year/:date", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    service
      .get_year(req.params.date)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status("405").json({ error: "error" });
      });
  }
});
module.exports = router;
