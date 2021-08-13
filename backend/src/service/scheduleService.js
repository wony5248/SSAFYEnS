// const constraints = require("../constraint/schedule")
const Sequelize = require("sequelize");
const moment = require("moment");
const op = Sequelize.Op;
const db = require("../models");
const logic = require("../module/schedule")


exports.unimplemented = function () {
  return new Promise(async function (resolve, reject) {
    reject("Not yet");
  });
};

exports.post = function (req) {
  return new Promise(async function (resolve, reject) {

    const sum_point = 0;

    //schedule이 생성되면 관련된 daily, weekly, monthly,yearly 생성
    const db_schedules = await logic.buildSchedule(req)
    const dailyResult = await logic.createOrUpdateDaily(req)
    const weeklyResult = await logic.createOrUpdateWeekly(req)
    const monthlyResult = await logic.createOrUpdateMonthly(req)
    const yearlyResult = await logic.createOrUpdateYearly(req)
    try {
      db_schedules.save();
      if (dailyResult != null) dailyResult.save();
      if (weeklyResult != null) weeklyResult.save();
      if (monthlyResult != null) monthlyResult.save();
      if (yearlyResult != null) yearlyResult.save();
      resolve({ result: "put" });
    } catch (error) {
      console.log(error);
      reject("error");
    }
    return resolve({ result: "post" });
  });
};

exports.get_$schedule_id$ = function (req) {
  return new Promise(async function (resolve, reject) {
    const schedule = await logic.findSchedule_id(req)
    resolve(schedule);
  });
};

exports.put_$schedule_id$ = function (req) {
  return new Promise(async function (resolve, reject) {
    const next_schedule = req.body;
    const prev_schedule = await logic.findSchedule_id(req)

    //1. 존재하지않을 경우 반환
    if (prev_schedule == null) return reject("존재하지 않는 스케쥴입니다");
    //2. 이미 완료된 일정일 경우 반환
    if (prev_schedule.is_finished == true)
      return reject("평가 완료된 일정입니다.");

    //schedule 수정

    //point 수정
    await logic.migrate_undo(prev_schedule).then(async (result) => {
      await result.reduce(async (promise, cur) => {
        const acc = await promise.then();
        cur && cur.save();
        return Promise.resolve();
      }, Promise.resolve({}));
    });
    await logic.migrate(req, next_schedule).then(async (result) => {
      await result.reduce(async (promise, cur) => {
        const acc = await promise.then();
        cur && cur.save();
        return Promise.resolve();
      }, Promise.resolve({}));
    });
    try {
      prev_schedule.update({
        ...next_schedule,
      });
      prev_schedule.save();

      // migrate_Result.map((data) => data.save());

      resolve({ result: "put" });
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
};
exports.delete_$schedule_id$ = function (req) {
  return new Promise(async function (resolve, reject) {
    const { schedule_id, user_id } = payload;

    const prev_schedule = await logic.findSchedule_id(req)

    if (prev_schedule == null) {
      return reject("존재하지 않는 schedule_id입니다");
    }
    await logic.migrate_undo(prev_schedule)
      .then((data) => {
        prev_schedule.destroy();
        return resolve({ result: "delete" });
      })
      .catch((error) => {
        console.log(error);
        return reject("migrate_undo 에러");
      });
  });
};


exports.post_daily = function (payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const { date, user_id } = payload;
      const date_end = moment(date).add(1, "days").toDate();
      const data = await db["schedules"].findAll({
        where: {
          [op.and]: [
            {
              started_at: {
                [op.gte]: date,
              },
            },
            {
              finished_at: {
                [op.lte]: date_end,
              },
            },
            {
              user_id,
            },
          ],
        },
      });
      resolve(data);
    } catch (error) {
      reject("error");
    }
  });
};


exports.get_daily_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    console.log("dd")
    const schedules = await logic.getSchedule_unit(req, "day")
    console.log(schedules)
    return resolve(schedules);
  });
};
exports.get_month_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    const schedules = await logic.getSchedule_unit(req, "month")
    console.log(schedules)
    return resolve(schedules);
  });
};

exports.get_year_$date$ = function (req) {
  return new Promise(async function (resolve, reject) {
    const schedules = await logic.getSchedule_unit(req, "year")
    console.log(schedules)
    return resolve(schedules);
    // reject("db instance not finded");
  });
};


//!unsued
// exports.post_submit = function (body) {
//   return new Promise(async function (resolve, reject) {
//     const { date, sum_point, context, user_id, month, year, week } = body;

//     console.log(date);
//     const dailyResult = await db["daily"].update(
//       {
//         context,
//         sum_point,
//         is_finished: true,
//       },
//       {
//         where: {
//           [op.and]: [
//             {
//               date,
//             },
//             {
//               user_id,
//             },
//           ],
//         },
//       }
//     );
//     //update할 일자 정보가 없음.
//     if (dailyResult == null || dailyResult[0] == 0)
//       return reject("해당 일자를 찾을 수 없습니다.");

//     //weekly 확인
//     const weeklyResult = await db["weekly"].findOne({
//       where: {
//         [op.and]: [
//           {
//             year,
//           },
//           {
//             week,
//           },
//           {
//             user_id,
//           },
//         ],
//       },
//     });

//     if (weeklyResult == null) {
//       //weekly가 해당 존재하지않음
//       console.log(`week ${week}가 존재하지 않습니다.`);
//       db["weekly"].create({
//         week,
//         month,
//         year,
//         user_id,
//         sum_point,
//       });
//     } else {
//       weeklyResult.sum_point += sum_point;
//       weeklyResult.cnt_shedule += cnt_schedule;
//     }

//     //monthly
//     const monthlyResult = await db["monthly"].findOne({
//       where: {
//         [op.and]: [
//           {
//             year,
//           },
//           {
//             month,
//           },
//           { user_id },
//         ],
//       },
//     });

//     if (monthlyResult == null) {
//       console.log(`month ${month}가 존재하지 않습니다.`);
//       db["monthly"].create({
//         month,
//         year,
//         user_id,
//         sum_point,
//       });
//     } else {
//       monthlyResult.sum_point += sum_point;
//       monthlyResult.cnt_shedule += cnt_schedule;
//     }

//     const yearlyResult = await db["yearly"].findOne(
//       {},
//       {
//         where: {
//           [op.and]: [
//             {
//               year,
//             },
//             {
//               user_id,
//             },
//           ],
//         },
//       }
//     );

//     if (yearlyResult == null) {
//       console.log(`year ${week}가 존재하지 않습니다.`);
//       db["yearly"].create({
//         year,
//         user_id,
//         avgpoint: point,
//       });
//     } else {
//       yearlyResult.sum_point += sum_point;
//       yearlyResult.cnt_shedule += cnt_schedule;
//     }
//     try {
//       if (dailyResult != null) dailyResult.save();
//       if (weeklyResult != null) weeklyResult.save();
//       if (monthlyResult != null) monthlyResult.save();
//       if (yearlyResult != null) yearlyResult.save();
//       resolve({ result: "put" });
//     } catch (error) {
//       console.log(error);
//       reject("error");
//     }
//   });
// };

// exports.get_week = function (date) {
//   return new Promise(async function (resolve, reject) {
//     const week = moment(date).startOf("week");

//     const start = moment(week).startOf("week").toDate();
//     const end = moment(week).add(1, "week").toDate();

//     console.log(` weekly schedule을 조회합니다`, start, end);
//     const data = await db["schedules"]
//       .findAll({
//         where: {
//           [op.or]: [
//             {
//               finished_at: {
//                 [op.gt]: start,
//               },
//               started_at: {
//                 [op.lt]: end,
//               },
//             },
//           ],
//         },
//       })
//       .then((result) => {
//         return resolve(result);
//       })
//       .catch((error) => {
//         console.log(error);
//         return reject("db error");
//       });
//   });
// };