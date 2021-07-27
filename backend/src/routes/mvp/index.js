const router = require("express").Router();
const Sequelize = require("sequelize");

const moment = require("moment");
const op = Sequelize.Op;
const db = require("../../models");
const { json } = require("sequelize");

router.get("/getDaily/:year/:month/:day", async (req, res) => {
  try {
    const { year, month, day } = req.params;
    const today = moment(`${year}-${month}-${day}`).toDate();
    const data = await db["schedules"].findAll({
      where: {
        [op.and]: [
          {
            started_at: {
              [op.lte]: today,
            },
          },
          {
            finished_at: {
              [op.gte]: today,
            },
          },
        ],
      },
    });
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send("error");
  }
});
router.post("/addSchedule", async (req, res) => {
  //스케쥴 값 입력받기
  // const {schedule_id, user_id, date, title, context, started, finished_at, deadline_at, point, is_finished, notification, noti_extend, challendge_id} = req
  try {
    const {
      user_id,
      date,
      title,
      context,
      started_at,
      finisted_at,
      deadline_at,
      point,
      is_finished,
      notification,
      noti_extend,
      challendge_id,
    } = req.body;

    await db["schedules"].create({
      user_id,
      date: moment(date).toDate(),
      title,
      context,
      started_at: moment(started_at).toDate(),
      finished_at: moment(finisted_at).toDate(),
      deadline_at: moment(deadline_at).toDate(),
      point,
      is_finished,
      notification,
      noti_extend,
      challendge_id,
    });
    return res.status(200).send("ok");
  } catch (err) {
    console.log(err);
    return res.status(400).send("error");
  }
  //db에 넣기
});

module.exports = router;
