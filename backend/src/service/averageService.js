const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;
exports.get_daily = function (params) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(params);
      const { year, month, week } = params;
      // console.log(date, year, month, week, day);

      // console.log(`${today}의 날짜를 조회합니다`, today, today_end);
      const data = await db["daily"].findAll({
        where: {
          [op.and]: [
            {
              year,
            },
            {
              month,
            },
            {
              week,
            },
          ],
        },
      });
      resolve(data);
    } catch (error) {
      console.log(error);
      reject("db 에서 daily 조회 중 문제가 발생했습니다.");
    }
  });
};

exports.post_daily = function (payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const { date, point, context, user_id, month, year, week } = payload;

      const dailyResult = await db["daily"].findOne({
        where: {
          [op.and]: [{ user_id }, { date }],
        },
      });
      //update할 일자 정보가 없음.
      if (dailyResult == null) {
        console.log("Daily를 생성합니다");
        let data_daily = ({} = payload);
        console.log("??");

        db["daily"].create({
          user_id,
          date,
          month,
          year,
          week,
          avgpoint: point,
          context,
          cntschedule: 1,
        });
      } else {
        dailyResult.avgpoint += point;
        dailyResult.context = context;
        dailyResult.cntschedule += 1;
      }

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
        console.log(`week ${week}를 생성합니다`);
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
        console.log(`month ${month}를 생성합니다`);
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
        console.log(`year ${week}를 생성합니다`);
        db["yearly"].create({
          year,
          user_id,
          avgpoint: point,
        });
      } else {
        yearlyResult.avgpoint += point;
      }
      if (dailyResult != null) dailyResult.save();
      if (weeklyResult != null) weeklyResult.save();
      if (monthlyResult != null) monthlyResult.save();
      if (yearlyResult != null) yearlyResult.save();
      resolve({ result: "put" });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
exports.get_week = function (payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const { year, week, month, date, user_id } = payload;

      console.log(` weekly 통계 결과를 조회합니다`, payload.date);
      const data = await db["weekly"]
        .findAll({
          where: {
            [op.and]: [
              {
                year,
                week,
                month,
                user_id,
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
    } catch (error) {
      console.log(error);
      return reject("db error");
    }
  });
};

exports.get_month = function (payload) {
  return new Promise(async function (resolve, reject) {
    const { year, month, user_id } = payload;
    // const start = moment(date).startOf("month").toDate();
    // const end = moment(start).add(1, "month").toDate();

    console.log(`${user_id} 의 ${year} 년 ${month} 월을 조회합니다`);
    const data = await db["monthly"]
      .findAll({
        where: {
          [op.and]: [{ year }, { month }, { user_id }],
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
exports.get_year = function (payload) {
  return new Promise(async function (resolve, reject) {
    const { user_id, year, date } = payload;

    console.log(`${start} 년을 조회합니다`, start, end);
    const data = await db["yearly"]
      .findAll({
        where: {
          [op.and]: [{ year }, { user_id }],
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
  });
};
