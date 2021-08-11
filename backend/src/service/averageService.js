const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;
const getSchedules = async (payload, term) => {
  const { user_id } = payload;
  const started_at = moment(payload.date).startOf(term).toDate();
  const end_at = moment(started_at).add(1, term).toDate();
  console.log("week에 포함된 일정들을 조회합니다", started_at, end_at);

  const schedules = await db["schedules"].findAll({
    raw: true,
    where: {
      [op.and]: [
        {
          user_id,
        },
        {
          started_at: {
            [op.gte]: started_at,
          },
        },
        {
          finished_at: {
            [op.lte]: end_at,
          },
        },
      ],
    },
  });
  return schedules;
};
exports.get_daily = function (params) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(params);
      const { user_id, year, month, week } = params;
      // console.log(date, year, month, week, day);

      // console.log(`${today}의 날짜를 조회합니다`, today, today_end);
      await db["daily"]
        .findOne({
          raw: true,
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
        })
        .then(async (result) => {
          const schedules = await getSchedules(payload, "day");
          console.log(schedules);
          result = { ...result, schedules };
          return resolve(result);
        });
    } catch (error) {
      console.log(error);
      return reject("db 에서 daily 조회 중 문제가 발생했습니다.");
    }
  });
};

exports.put_daily = function (payload) {
  return new Promise(async function (resolve, reject) {
    //daily 평가 기능
    try {
      const { date, daily_context, user_id, month, year, week } = payload;

      //해당 일에 합산할 point와 schedule 개수를 알아내기 위해 당일 스케쥴을 검색
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

      //새로 반영되어야 할 값
      // const sum_point = dailySchedules.reduce((acc, cur) => {
      //   return acc + cur.dataValues.point;
      // }, 0);
      // const cnt_schedule = dailySchedules.length;

      // //이전 값
      // let prev_sum_point = 0;
      // let prev_cnt_schedule = 0;
      // let isSubmited = false;

      // //sum_point 값을 적용
      // const dailyResult = await db["daily"].findOne({
      //   where: {
      //     [op.and]: [{ user_id }, { date }],
      //   },
      // });

      // if (dailyResult == null) {
      //   return reject("존재하지 않는 daily입니다");
      // } else {
      //   isSubmited = dailyResult.daily_context != null;

      //   if (isSubmited) {
      //     prev_sum_point = dailyResult.sum_point;
      //     prev_cnt_schedule = dailySchedules.cnt_schedule;
      //   }
      //   dailyResult.daily_context = daily_context;
      //   dailyResult.sum_point = sum_point;
      //   dailyResult.cnt_schedule = cnt_schedule;
      // }

      // //weekly 확인
      // const weeklyResult = await db["weekly"].findOne({
      //   where: {
      //     [op.and]: [
      //       {
      //         year,
      //       },
      //       {
      //         week,
      //       },
      //     ],
      //   },
      // });

      // if (weeklyResult == null) {
      //   return reject("존재하지 않는 week입니다");
      // } else {
      //   console.log(sum_point, prev_sum_point);
      //   weeklyResult.sum_point += sum_point - prev_sum_point;
      //   weeklyResult.cnt_schedule += cnt_schedule - prev_cnt_schedule;
      // }

      // //monthly 확인
      // const monthlyResult = await db["monthly"].findOne({
      //   where: {
      //     year,
      //     month,
      //   },
      // });

      // if (monthlyResult == null) {
      //   return reject(`존재하지 않는 monthly입니다`);
      // } else {
      //   monthlyResult.sum_point += sum_point - prev_sum_point;
      //   monthlyResult.cnt_schedule += 1;
      // }

      // const yearlyResult = await db["yearly"].findOne(
      //   {},
      //   {
      //     where: {
      //       year,
      //     },
      //   }
      // );

      // if (yearlyResult == null) {
      //   return reject(`존재하지 않는 yearly입니다.`);
      // } else {
      //   yearlyResult.sum_point += sum_point;
      //   yearlyResult.cnt_schedule += 1;
      // }
      // try {
      //   if (dailyResult != null) dailyResult.save();
      //   if (weeklyResult != null) weeklyResult.save();
      //   if (monthlyResult != null) monthlyResult.save();
      //   if (yearlyResult != null) yearlyResult.save();
      // } catch (error) {
      //   console.log(error);
      //   reject("error");
      // }
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
      await db["weekly"]
        .findOne({
          raw: true,
          where: {
            [op.and]: [
              {
                year,
              },
              {
                week,
              },
              {
                month,
              },
              {
                user_id,
              },
            ],
          },
        })
        .then(async (result) => {
          const schedules = await getSchedules(payload, "week");
          console.log(schedules);
          result = { ...result, schedules };
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
      .findOne({
        raw: true,
        where: {
          [op.and]: [{ year }, { month }, { user_id }],
        },
      })
      .then(async (result) => {
        const schedules = await getSchedules(payload, "month");
        console.log(schedules);
        result = { ...result, schedules };
        return resolve(result);
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
      .then(async (result) => {
        const schedules = await getSchedules(payload, "year");
        console.log(schedules);
        result = { ...result, schedules };
        return resolve(result);
      })
      .catch((error) => {
        console.log(error);
        reject("db error");
      });
  });
};
