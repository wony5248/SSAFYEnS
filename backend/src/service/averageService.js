const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;
exports.get_daily = function (date) {
  return new Promise(async function (resolve, reject) {
    try {
      const today = date;
      const today_end = moment(date).add(1, "days").toDate();

      console.log(`${today}의 날짜를 조회합니다`, today, today_end);
      const data = await db["schedules"].findAll({
        where: {
          [op.and]: [
            {
              started_at: {
                [op.gte]: today,
              },
            },
            {
              finished_at: {
                [op.lte]: today_end,
              },
            },
          ],
        },
      });
      console.log(data);
      resolve(data);
    } catch (error) {
      reject("db 에서 daily 조회 중 문제가 발생했습니다.");
    }
  });
};

exports.post_submit = function (body) {
  return new Promise(async function (resolve, reject) {
    const { date, point, context, user_id, month, year, week } = body;

    console.log(date);
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
    resolve({ result: "put" });
  });
};
exports.get_week = function (date) {
  return new Promise(async function (resolve, reject) {
    const week = moment(date).startOf("week");

    const start = moment(week).startOf("week").toDate();
    const end = moment(week).add(1, "week").toDate();

    console.log(` weekly schedule을 조회합니다`, start, end);
    const data = await db["schedules"]
      .findAll({
        where: {
          [op.or]: [
            {
              finished_at: {
                [op.gt]: start,
              },
              started_at: {
                [op.lt]: end,
              },
            },
          ],
        },
      })
      .then((result) => {
        return resolve(result);
      })
      .catch((error) => {
        console.log(error);
        return reject("db error");
      });
  });
};

exports.get_month = function (date) {
  return new Promise(async function (resolve, reject) {
    const month = moment(date).startOf("month");

    const standard1 = moment(month).toDate();
    const standard2 = moment(month)
      .add(1, "months")
      .subtract(1, "days")
      .toDate();

    console.log(`${month} 월을 조회합니다`, standard1, standard2);
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
        // console.log("답 : ", result);
        resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });
    // reject("db instance not finded");
  });
};
