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
      if (dailySchedules == null) {
        return reject("해당 일자 스케쥴이 존재하지 않습니다");
      } else {
        await dailySchedules.reduce(async (promise, cur) => {
          const acc = await promise.then();
          cur.is_finished = true;
          cur.save();
          return Promise.resolve(acc);
        }, Promise.resolve({}));
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
