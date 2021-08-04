// const constraints = require("../constraint/schedule")
const moment = require("moment");
const Sequelize = require("sequelize");
const { finished } = require("stream");
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
    if (
      moment(started_at).format("YYYY-MM-DD") !=
      moment(finished_at).format("YYYY-MM-DD")
    ) {
      reject(
        "started_at과 end_at이 다른 날짜로 작성되었습니다. 같은 날짜만 지원하도록 구현되어 있습니다."
      );
    }
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
        return resolve(data);
      })
      .catch((error) => {
        console.error(error);
        return reject("schedules 인스턴스를 생성하는데 오류가 발생했습니다.");
      });
    const day = moment(started_at).format("DD");
    const month = moment(started_at).format("DD");
    const year = moment(started_at).format("DD");
    console.log(day, month, year);
    //daily가 있을경우 => 키 가져오기

    //daily가 없을경우 생성
    //week가 있을 경우 => 키 가져오기
    //week가 없을 경우
    //month가 있을 경우 => 키 가져오기
    //month가 없을 경우
    //month 생성 => 키가져오기
    //month에 week 할당
    //week에 daily 추가 후 daily 생성
    //daily에 schedule 할당
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
