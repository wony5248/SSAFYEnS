const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const service = require("../../service/scheduleService");
const myValidationResult = validationResult.withDefaults({
  formatter: (error) => {
    return {
      myLocation: error.location,
    };
  },
});

router.post("/", (req, res) => {
  service
    .post(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status("405").send(error);
    });
});
router.get(
  "/:schedule_id",
  // username must be an email
  check("started_at"),
  (req, res) => {
    const errors = validationResult(req);
    console.log("error : ", errors);
    service
      .get_$schedule_id$(req.params)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status("405").send(error);
      });
  }
);
router.put(
  "/:schedule_id",

  (req, res) => {
    service
      .put_$schedule_id$({
        schedule_id: req.params.schedule_id,
        body: req.body,
      })
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.status("405").send(error);
      });
  }
);
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
router.post("/month", (req, res) => {
  service
    .get_month(req.body.date)
    .then((data) => {
      res.json({ data });
    })
    .catch((error) => {
      res.status("405").json({ error });
    });
});

// router.put("/:schedule_id", (req, res) => {
//   console.log("zzz");
//   service
//     .unimplemented()
//     .then((data) => {})
//     .catch((error) => {
//       console.log("zzz");
//       res.status(403).send(error);
//     });
// });
module.exports = router;
