const router = require("express").Router();
router.post(
  "/submit",
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
