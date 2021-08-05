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
  validation.user_id,
  (req, res) => {
    //validation middleware에서 에러 발생시 req에 에러 관련 객체 담김.
    const result = validationResult(req);
    if (!result.isEmpty()) {
      console.log(validationResult(req));
      res.status("400").json({ result });
    } else {
      service
        .post(req.body)
        .then((data) => {
          res.json({ data });
        })
        .catch((error) => {
          res.status("405").send(error);
        });
    }
  }
);
///schedule/{schedule_id}
router.get("/:schedule_id", (req, res) => {
  const errors = validationResult(req);
  console.log("error : ", errors);
  service
    .get_$schedule_id$(req.params)
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status("405").send(error);
    });
});
//Updates a schedule with JSON data
//todo 파라미터 추가
router.put(
  "/:schedule_id",
  validation.started_at,
  validation.finished_at,
  validation.deadline_at,
  validation.notification,
  validation.is_finished,
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
          res.json({ data });
        })
        .catch((error) => {
          res.status("405").send(error);
        });
    }
  }
);
//Deletes a schedule
router.delete("/:schedule_id", (req, res) => {
  service
    .delete_$schedule_id$({ id: req.params.schedule_id })
    .then((result) => {
      console.log(result);
      res.status(200).json({ result });
    })
    .catch((error) => {
      res.status("405").json({ error });
    });
});
//todo url 변경 /schedule/month/{month}
router.post("/month", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    service
      .get_month(req.body.date)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status("405").json({ error });
      });
  }
});
//Get all schedules of user of specific month
//todo

//get all scheudle of day
router.post("/daily", validation.date, (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(validationResult(req));
    res.status("400").json({ result });
  } else {
    service
      .post_daily(req.body)
      .then((data) => {
        res.json({ data });
      })
      .catch((error) => {
        res.status("405").json({ error });
      });
  }
});

//아래는 average로 이동 예정
// router.post(
//   "/submit",
//   validation.date,
//   validation.month,
//   validation.year,
//   validation.week,
//   (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       console.log(validationResult(req));
//       res.status("400").json({ result });
//     } else {
//       service
//         .post_submit(req.body)
//         .then((data) => {
//           res.json({ data });
//         })
//         .catch((error) => {
//           res.status("405").json({ error });
//         });
//     }
//   }
// );

module.exports = router;
