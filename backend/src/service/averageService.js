const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;
exports.get_daily = function (params) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(params);
      const { user_id, year, month, week } = params;
      // console.log(date, year, month, week, day);

      // console.log(`${today}의 날짜를 조회합니다`, today, today_end);
      const data = await db["daily"].findAll({
        where: {
          [op.and]: [
            {
              user_id,
            },
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

exports.put_daily = function (payload) {
  return new Promise(async function (resolve, reject) {
    //daily 평가 기능
    try {
      const { date, daily_context, user_id, month, year, week } = payload;

      //해당 일에 합산할 point를 알아내기 위해 당일 스케쥴을 검색
      const started_at = date;
      const finished_at = moment(date).add(1, "days").toDate();
      const dailySchedules = await db["schedules"].findAll({
        where: {
          [op.and]: [
            {
              started_at: {
                [op.gte]: started_at,
              },
            },
            {
              finished_at: {
                [op.lte]: finished_at,
              },
            },
            { user_id },
          ],
        },
      });

      const sum_point = dailySchedules.reduce((acc, cur) => {
        return acc + cur.dataValues.point;
      }, 0);
      let prev_sum_point = 0;
      let isExist = false;

      //sum_point 값을 적용
      const dailyResult = await db["daily"].findOne({
        where: {
          [op.and]: [{ user_id }, { date }],
        },
      });
      if (dailyResult == null) {
        return reject("존재하지 않는 daily입니다");
      } else {
        isExist = dailyResult.daily_context == null;
        console.log(isExist);
        prev_sum_point = dailyResult.sum_point;

        dailyResult.daily_context = daily_context;
        dailyResult.sum_point = sum_point;
        dailyResult.cnt_schedule += isExist;
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
        return reject("존재하지 않는 week입니다");
      } else {
        weeklyResult.sum_point += sum_point - prev_sum_point;
        weeklyResult.cnt_schedule += 1;
      }

      //monthly
      const monthlyResult = await db["monthly"].findOne({
        where: {
          year,
          month,
        },
      });

      if (monthlyResult == null) {
        return reject(`존재하지 않는 month입니다`);
      } else {
        monthlyResult.sum_point += sum_point - prev_sum_point;
        monthlyResult.cnt_schedule += 1;
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
        return reject(`존재하지 않는 year입니다.`);
      } else {
        yearlyResult.sum_point += sum_point;
        yearlyResult.cnt_schedule += 1;
      }
      try {
        if (dailyResult != null) dailyResult.save();
        if (weeklyResult != null) weeklyResult.save();
        if (monthlyResult != null) monthlyResult.save();
        if (yearlyResult != null) yearlyResult.save();
      } catch (error) {
        console.log(error);
        reject("error");
      }
      return resolve({ result: "put" });
    } catch (error) {
      console.log(error);
      return reject("error");
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
