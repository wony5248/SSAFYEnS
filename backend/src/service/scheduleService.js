// const constraints = require("../constraint/schedule")
const { update, result } = require("lodash");
const moment = require("moment");
const Sequelize = require("sequelize");
const { finished } = require("stream");
const op = Sequelize.Op;
const db = require("../models");
const router = require("../routes/schedule");
exports.unimplemented = function () {
  return new Promise(async function (resolve, reject) {
    reject("Not yet");
  });
};
exports.post = function (body) {
  return new Promise(async function (resolve, reject) {
    let {
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

    const day = moment(started_at).startOf("day").toDate();
    const month = moment(started_at).month() + 1;
    const year = moment(started_at).year();
    const week = moment(started_at).isoWeek();

    let result = await db["daily"].findOne({
      where: {
        date: day,
      },
    });
    console.log(result);

    if (result == null) {
      console.log("no date");
      db["daily"].create({
        date: day,
        week,
        month,
        year,
        user_id,
        context: context + "\n",
        avgpoint: point,
        cntschedule: 1,
        // avgenvironment,
      });
    } else {
      result.context = result.context + context + "\n";
      result.cntschedule = result.cntschedule + 1 + "\n";
      result.avgpoint = result.avgpoint + point;
      result.save();
    }
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
    let result = await db["schedules"]
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

exports.post_submit = function (body) {
  return new Promise(async function (resolve, reject) {
    const { date, point, context, user_id } = body;
    const day = moment(date).startOf("day").toDate();
    const month = moment(date).month() + 1;
    const year = moment(date).year();
    const week = moment(date).isoWeek();

    const dailyResult = await db["daily"].update(
      {
        context,
        point,
        is_finished: true,
      },
      {
        where: {
          date,
        },
      }
    );
    console.log(dailyResult);
    //update할 일자 정보가 없음.
    if (dailyResult == null || dailyResult[0] == 0)
      return reject("해당 일자를 찾을 수 없습니다.");

    //weekly 확인
    const weeklyResult = await db["weekly"].findOne({
      where: {
        [op.and]: [
          {
            year,
          },
          {
            week,
          },
        ],
      },
    });

    if (weeklyResult == null) {
      //weekly가 해당 존재하지않음
      console.log(`week ${week}가 존재하지 않습니다.`);
      db["weekly"].create({
        week,
        month,
        year,
        user_id,
        avgpoint: point,
      });
    } else weeklyResult.avgpoint += point;

    //monthly
    const monthlyResult = await db["monthly"].findOne({
      where: {
        year,
        month,
      },
    });

    if (monthlyResult == null) {
      console.log(`month ${month}가 존재하지 않습니다.`);
      db["monthly"].create({
        month,
        year,
        user_id,
        avgpoint: point,
      });
    } else {
      monthlyResult.avgpoint += point;
    }

    const yearlyResult = await db["yearly"].findOne(
      {},
      {
        where: {
          year,
        },
      }
    );

    if (yearlyResult == null) {
      console.log(`year ${week}가 존재하지 않습니다.`);
      db["yearly"].create({
        year,
        user_id,
        avgpoint: point,
      });
    } else {
      yearlyResult.avgpoint += point;
    }
    // if (dailyResult != null) dailyResult.save();
    if (weeklyResult != null) weeklyResult.save();
    if (monthlyResult != null) monthlyResult.save();
    if (yearlyResult != null) yearlyResult.save();
    resolve({ result: "changed" });
  });
};
