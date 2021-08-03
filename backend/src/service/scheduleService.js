// const constraints = require("../constraint/schedule")
const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");
exports.unimplemented = function () {
  return new Promise(async function (resolve, reject) {
    reject("Not yet");
  });
};
exports.post = function (body) {
  return new Promise(async function (resolve, reject) {
    const {
      user_id,
      date,
      title,
      context,
      started_at,
      finished_at,
      deadline_at,
      updated_at,
      point,
      is_finished,
      notification,
      noti_extend,
      challendge_id,
    } = body;
    console.log(" gg : ", notification);
    const data = await db["schedules"]
      .create({
        user_id,
        date,
        title,
        context,
        started_at,
        finished_at,
        deadline_at,
        point,
        is_finished,
        notification,
        noti_extend,
        challendge_id,
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject("sequelize error");
      });
  });
};
exports.get_$schedule_id$ = function (params) {
  return new Promise(async function (resolve, reject) {
    const { schedule_id } = params;
    db["schedules"]
      .findOne({
        where: {
          id: schedule_id,
        },
      })
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });

    // reject("db instance not finded");
  });
};
exports.put_$schedule_id$ = function (data) {
  return new Promise(async function (resolve, reject) {
    const { schedule_id, body } = data;
    db["schedules"]
      .update(
        {
          ...body,
        },
        {
          where: {
            id: schedule_id,
          },
        }
      )
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });
    // reject("db instance not finded");
  });
};
exports.delete_$schedule_id$ = function (data) {
  return new Promise(async function (resolve, reject) {
    const { id } = data;
    db["schedules"]
      .destroy({
        where: {
          id,
        },
      })
      .then((result) => {
        console.log("답 : ", result);
        if (result == 0) reject("no db instance");
        else if (result == 1) resolve(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });
    // reject("db instance not finded");
  });
};
exports.get_month = function (date) {
  return new Promise(async function (resolve, reject) {
    const month = moment(date, "YYYY-MM");
    console.log(month);
    const standard1 = moment(month).toDate();
    const standard2 = moment(month)
      .add(1, "months")
      .subtract(1, "days")
      .toDate();

    console.log(standard1, standard2);
    const data = await db["schedules"]
      .findAll({
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
      })
      .then((result) => {
        console.log("답 : ", result);
        if (result == 0) reject("no db instance");
        else if (result == 1) resolve(result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });

    // reject("db instance not finded");
  });
};
