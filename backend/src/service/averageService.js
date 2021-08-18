const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;
const logic = require("../module/average")

exports.get_daily_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      const daily = await logic.getAverage(req, "daily")
      if (daily == null) {
        return reject("존재하지 않는 일정입니다.")
      }

      const schedules = await logic.getSchedule_unit(req, "day");
      const result = { ...daily, schedules };
      return resolve(result);

    } catch (error) {
      console.log(error);
      return reject("db 에서 daily 조회 중 문제가 발생했습니다.");
    }
  });
};

exports.put_daily_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    //daily 평가 기능
    try {
      const { date, daily_context } = req.body;
      const { user_id } = req
      const dailyResult = await db["daily"].findOne({
        where: {
          date,
        },
      });

      if (dailyResult == null) {
        reject("해당 일에 대한 정보가 없습니다.");
      } else {
        dailyResult.daily_context = daily_context;
      }
      //is_finished 처리할 schedule 검색
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
        dailyResult.save();
        return resolve({ result: "put" });
      }
    } catch (error) {
      console.log(error);
      return reject("error");
    }
  });
};
exports.get_week_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(` weekly 통계 결과를 조회합니다`, payload);

      const weekly = await logic.getAverage(req, "weekly")
      if (weekly == null) {
        return reject("존재하지 않는 일정입니다.")
      }

      const schedules = await logic.getSchedule_unit(req, "week");
      const result = { ...weekly, schedules };
      return resolve(result);

    } catch (error) {
      console.log(error);
      return reject("db 에서 week 조회 중 문제가 발생했습니다.");
    }
  });
};

exports.get_month_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(` monthly 통계 결과를 조회합니다`, req);

      const weekly = await logic.getAverage(req, "monthly")
      if (weekly == null) {
        return reject("존재하지 않는 일정입니다.")
      }

      const schedules = await logic.getSchedule_unit(req, "month");
      const result = { ...weekly, schedules };
      return resolve(result);

    } catch (error) {
      console.log(error);
      return reject("db 에서 month 조회 중 문제가 발생했습니다.");
    }
  });
};
exports.get_year_$date$ = function (payload) {
  return new Promise(async function (resolve, reject) {
    try {
      console.log(` yearly 통계 결과를 조회합니다`, req);

      const weekly = await logic.getAverage(req, "yearly")
      if (weekly == null) {
        return reject("존재하지 않는 일정입니다.")
      }

      const schedules = await logic.getSchedule_unit(req, "year");
      const result = { ...weekly, schedules };
      return resolve(result);

    } catch (error) {
      console.log(error);
      return reject("db 에서 yearly 조회 중 문제가 발생했습니다.");
    }
  });
};
