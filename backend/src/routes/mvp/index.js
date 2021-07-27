const router = require("express").Router();
const db = require("../../models");

router.get("/addDaily", (req, res) => {});
router.get("/addSchedule", async (req, res) => {
  //스케쥴 값 입력받기
  //   const {schedule_id, user_id, date, title, context, started, finisted_at, deadline_at, point, is_finished, notification, noti_extend, challendge_id} = req
  //   const {schedule_id, user_id, date, title, context, started, finisted_at, deadline_at, point, is_finished, notification, noti_extend, challendge_id} = req.body
  //db에 넣기
});
router.get("/getSchedule", async (req, res) => {
  try {
    const data = await db["schedules"].findAll({});
    console.log(data);
    res.send("hi");
  } catch {
    res.send("error");
  }
});
module.exports = router;
