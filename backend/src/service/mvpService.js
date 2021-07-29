const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");
exports.getDaily = function (date) {
  return new Promise(async function (resolve, reject) {
    try {
      const today = moment(date).toDate();
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
      resolve(data);
    } catch (error) {
      resolve(error);
    }
  });
};

exports.addScedule = function (body) {
  return new Promise(async (resolve, reject) => {
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
      } = body;

      const data = await db["schedules"].create({
        user_id,
        date: moment(started_at).format("YYYY-MM-DD hh:mm").toDate(),
        title,
        context,
        started_at: moment(started_at).format("YYYY-MM-DD hh:mm").toDate(),
        finished_at: moment(started_at).format("YYYY-MM-DD hh:mm").toDate(),
        deadline_at: moment(started_at).format("YYYY-MM-DD hh:mm").toDate(),
        point,
        is_finished,
        notification,
        noti_extend,
        challendge_id,
      });
      resolve(data);
    } catch (err) {
      console.log(err);
      console.log(body);
      reject(data);
    }
    //db에 넣기
  });
};

exports.getSchedule = function (date) {
  return new Promise(async (resolve, reject) => {
    try {
      const standard1 = moment(date).toDate();
      const standard2 = moment(date)
        .add(1, "months")
        .subtract(1, "days")
        .toDate();
      const data = await db["schedules"].findAll({
        where: {
          [op.or]: [
            {
              finished_at: {
                [op.gt]: standard1,
              },
              started_at: {
                [op.lt]: standard2,
              },
            },
          ],
        },
      });
      console.log(standard1, standard2);
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
