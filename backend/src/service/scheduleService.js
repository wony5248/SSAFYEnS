// const constraints = require("../constraint/schedule")
const moment = require("moment");
const Sequelize = require("sequelize");
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
    console.log(body.week);
    console.log("body : ", body);
    //유효성 검사 => schedule => daily 순으로 생성
    //유효성검사. validation에서 두 속성(started_at, finished_at)에 대한 조건 거는법을 몰라서 service에 작성

    //schedule 생성 (트랜젝션 커밋은 마지막에)
    const db_schedules = await db["schedules"].build({
      ...body,
    });

    //daily 생성에 필요한 date 객체 생성
    let data_daily = ({ standard_at, user_id, date, month, year, week } = body);
    data_daily = {
      ...data_daily,
      avgpoint: body.point,
      cntschedule: 1,
      context: body.context + "n",
    };

    var db_daily = await db["daily"].findOne({
      where: {
        date: moment(body.started_at).startOf("day").toDate(),
      },
    });

    //아래부터 트랜잭션 일괄적용
    db_schedules.save();
    if (db_daily == null) {
      console.log("해당 Daily를 생성합니다");
      var db_daily2 = db["daily"].build(data_daily);
      db_daily2.save();
    } else {
      console.log("해당 Daily를 수정합니다");
      db_daily.context = db_daily.context + body.context + "\n";
      db_daily.cntschedule = db_daily.cntschedule + 1 + "\n";
      db_daily.avgpoint = db_daily.avgpoint + body.point;
      db_daily.save();
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

exports.post_daily = function (body) {
  return new Promise(async function (resolve, reject) {
    try {
      const { date } = body;
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
      reject(error);
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

exports.get_month = function (date) {
  return new Promise(async function (resolve, reject) {
    const start = moment(date).startOf("month").toDate();
    const end = moment(start).add(1, "month").toDate();

    console.log(`${start} 월을 조회합니다`, start, end);
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
