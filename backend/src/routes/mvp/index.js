const router = require("express").Router();

const mvp = require("../../service/mvpService");
//user

router.get("/getDaily/:date", (req, res) => {
  mvp
    .getDaily(req.params.date)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send("error");
    });
});

router.post("/addSchedule", (req, res) => {
  mvp
    .addScedule(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send("error");
    });
});

router.get("/getMonthly/:year/:month", (req, res) => {
  const { year, month } = req.params;
  mvp
    .getSchedule(year + "-" + month)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(400).send("error");
    });
});

module.exports = router;
