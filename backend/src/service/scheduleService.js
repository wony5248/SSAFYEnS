// const constraints = require("../constraint/schedule")
const moment = require("moment");
const Sequelize = require("sequelize");
const op = Sequelize.Op;
const db = require("../models");
const router = require("../routes/schedule");
const { cnt_schedule } = require("../validation/scheduleValidation");
//url 구현 전 임시 코드
exports.unimplemented = function () {
  return new Promise(async function (resolve, reject) {
    reject("Not yet");
  });
};

exports.post = function (body) {
  return new Promise(async function (resolve, reject) {
    const { date, point, user_id, month, year, week, started_at } = body;
    const sum_point = 0;
    //schedule이 생성되면 관련된 daily, weekly, monthly,yearly 생성
    const db_schedules = await db["schedules"].build({
      ...body,
    });
    const dailyResult = await db["daily"].findOne({
      where: {
        user_id,
        date,
      },
    });
    //update할 일자 정보가 없음.
    if (dailyResult == null) {
      db["daily"].create({
        date: moment(started_at).startOf("day"),
        week,
        month,
        year,
        user_id,
        sum_point,
        cnt_schedule: 0,
      });
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
          {
            user_id,
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
        sum_point,
        cnt_schedule: 0,
      });
    }

    //monthly
    const monthlyResult = await db["monthly"].findOne({
      where: {
        [op.and]: [
          {
            year,
          },
          {
            month,
          },
          {
            user_id,
          },
        ],
      },
    });

    if (monthlyResult == null) {
      console.log(`month ${month}가 존재하지 않습니다.`);
      db["monthly"].create({
        month,
        year,
        user_id,
        sum_point,
        cnt_schedule: 0,
      });
    }

    const yearlyResult = await db["yearly"].findOne({
      [op.and]: [
        {
          year,
        },
        {
          user_id,
        },
      ],
    });

    if (yearlyResult == null) {
      console.log(`year ${week}가 존재하지 않습니다.`);
      db["yearly"].create({
        year,
        user_id,
        sum_point,
        cnt_schedule: 0,
      });
    }
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
exports.get_$schedule_id$ = function (params) {
  return new Promise(async function (resolve, reject) {
    const { schedule_id } = params;
    db["schedules"]
      .findOne({
        where: {
          schedule_id,
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
            schedule_id,
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
          schedule_id,
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
    const { date, sum_point, context, user_id, month, year, week } = body;

    console.log(date);
    const dailyResult = await db["daily"].update(
      {
        context,
        sum_point,
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
        sum_point,
      });
    } else {
      weeklyResult.sum_point += sum_point;
      weeklyResult.cnt_shedule += cnt_schedule;
    }

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
        sum_point,
      });
    } else {
      monthlyResult.sum_point += sum_point;
      monthlyResult.cnt_shedule += cnt_schedule;
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
      yearlyResult.sum_point += sum_point;
      yearlyResult.cnt_shedule += cnt_schedule;
    }
    try {
      // if (dailyResult != null) dailyResult.save();
      if (weeklyResult != null) weeklyResult.save();
      if (monthlyResult != null) monthlyResult.save();
      if (yearlyResult != null) yearlyResult.save();
      resolve({ result: "put" });
    } catch (error) {
      console.log(error);
      reject("error");
    }
  });
};

exports.post_daily = function (payload) {
  return new Promise(async function (resolve, reject) {
    try {
      const { date } = payload;
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
          ],
        },
      });
      resolve(data);
    } catch (error) {
      reject("error");
    }
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
exports.get_month = function (payload) {
  return new Promise(async function (resolve, reject) {
    console.log("hi: ", payload);
    const month = moment(payload.date).startOf("month");

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

exports.get_year = function (date) {
  return new Promise(async function (resolve, reject) {
    const start = moment(date).startOf("year");
    const end = moment(start).add(1, "year").toDate();

    console.log(`${start} 년을 조회합니다`, start, end);
    const data = await db["schedules"]
      .findAll({
        where: {
          [op.or]: [
            {
              started_at: {
                [op.gte]: start,
              },
              finished_at: {
                [op.lte]: end,
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
