const moment = require("moment");
const Sequelize = require("sequelize");
const db = require("../models");
const op = Sequelize.Op;
exports.migrate_undo = async (prev_schedule) => {
  return new Promise(async (resolve, reject) => {
    const {
      year,
      month,
      week,
      point,
      humidity,
      illuminance,
      noise,
      temperature,
      user_id,
    } = prev_schedule;
    const started_day = moment(prev_schedule.started_at).startOf("day");

    const dailyResult = await db["daily"].findOne({
      where: {
        [op.and]: [
          {
            date: started_day,
          },
          {
            user_id,
          },
        ],
      },
    });
    if (dailyResult == null || dailyResult[0] == 0) {
      return reject("해당 daily를 찾을 수 없습니다.1");
      // await db["daily"].create({
      //   date: started_day,
      //   week,
      //   month,
      //   year,
      //   user_id,
      //   point,
      //   cnt_schedule: 1,
      //   is_finished: true,
      // });
    } else if (dailyResult.dataValues.cnt_schedule == 1) {
      console.log("해당 daily를 제거합니다");
      dailyResult.destroy();
    } else {
      console.log("해당 daily를 취소합니다");
      dailyResult.sum_point -= point;
      dailyResult.cnt_schedule -= 1;
      dailyResult.sum_humidity -= humidity;
      dailyResult.sum_illuminance -= illuminance;
      dailyResult.sum_noise -= noise;
      dailyResult.sum_temperature -= temperature;
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
      return reject(`week 가 존재하지 않습니다.1`);
    } else if (weeklyResult.dataValues.cnt_schedule == 1) {
      console.log(`week 을 제거합니다.1`);
      await db["weekly"].destroy({
        where: {
          [op.and]: [{ year }, { month }, { week }, { user_id }],
        },
      });
    } else {
      weeklyResult.sum_point -= point;
      weeklyResult.cnt_schedule -= 1;

      weeklyResult.sum_humidity -= humidity;
      weeklyResult.sum_illuminance -= illuminance;
      weeklyResult.sum_noise -= noise;
      weeklyResult.sum_temperature -= temperature;
    }

    const monthlyResult = await db["monthly"].findOne({
      where: {
        year,
        month,
      },
    });

    if (monthlyResult == null) {
      return reject(`month 가 존재하지 않습니다.1`);
    } else if (monthlyResult.dataValues.cnt_schedule == 1) {
      console.log("해당 monthly를 제거합니다");
      await db["monthly"].destroy({
        where: {
          [op.and]: [{ year }, { month }, { user_id }],
        },
      });
    } else {
      monthlyResult.sum_point -= point;
      monthlyResult.cnt_schedule -= 1;

      monthlyResult.sum_humidity -= humidity;
      monthlyResult.sum_illuminance -= illuminance;
      monthlyResult.sum_noise -= noise;
      monthlyResult.sum_temperature -= temperature;
    }

    const yearlyResult = await db["yearly"].findOne({
      where: {
        year,
      },
    });

    if (yearlyResult == null) {
      return reject(`year 가 존재하지 않습니다.1`);
    } else if (yearlyResult.dataValues.cnt_schedule == 1) {
      console.log("해당 yearly를 제거합니다");
      await db["yearly"].destroy({
        where: {
          [op.and]: [{ year }, { user_id }],
        },
      });
    } else {
      yearlyResult.sum_point -= point;
      yearlyResult.cnt_schedule -= 1;

      yearlyResult.sum_humidity -= humidity;
      yearlyResult.sum_illuminance -= illuminance;
      yearlyResult.sum_noise -= noise;
      yearlyResult.sum_temperature -= temperature;
    }
    resolve([dailyResult, weeklyResult, monthlyResult, yearlyResult]);
  });
};

exports.migrate = async (prev_schedule, next_schedule) => {
  return new Promise(async (resolve, reject) => {
    const {
      year,
      month,
      week,
      point,
      humidity,
      illuminance,
      noise,
      temperature,
      user_id,
    } = next_schedule;
    const started_day = moment(next_schedule.started_at).startOf("day");

    const dailyResult = await db["daily"].findOne({
      where: {
        [op.and]: [
          {
            date: started_day,
          },
          {
            user_id,
          },
        ],
      },
    });

    //update할 일자 정보가 없음.
    if (dailyResult == null || dailyResult[0] == 0) {
      console.log("해당 daily를 생성합니다");
      const dailyResult = await db["daily"].create({
        date: started_day,
        week,
        month,
        year,
        user_id,
        sum_point: point,
        cnt_schedule: 1,
        is_finished: false,
        sum_humidity: humidity,
        sum_illuminance: illuminance,
        sum_noise: noise,
        sum_temperature: temperature,
      });
    } else {
      dailyResult.sum_point += point;
      dailyResult.cnt_schedule += 1;

      dailyResult.sum_humidity = humidity;
      dailyResult.sum_illuminance = illuminance;
      dailyResult.sum_noise = noise;
      dailyResult.sum_temperature = temperature;
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
      console.log(`week 가 존재하지 않습니다.1`);
      await db["weekly"].create({
        week,
        month,
        year,
        user_id,
        sum_point: point,
        cnt_schedule: 1,
        is_finished: true,

        sum_humidity: humidity,
        sum_illuminance: illuminance,
        sum_noise: noise,
        sum_temperature: temperature,
      });
    } else {
      weeklyResult.sum_point += point;
      weeklyResult.cnt_schedule += 1;

      weeklyResult.sum_humidity = humidity;
      weeklyResult.sum_illuminance = illuminance;
      weeklyResult.sum_noise = noise;
      weeklyResult.sum_temperature = temperature;
    }

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
      console.log(`month 가 존재하지 않습니다.1`);
      await db["monthly"].create({
        month,
        year,
        user_id,
        sum_point: point,
        cnt_schedule: 1,
        is_finished: true,

        sum_humidity: humidity,
        sum_illuminance: illuminance,
        sum_noise: noise,
        sum_temperature: temperature,
      });
    } else {
      monthlyResult.sum_point += point;
      monthlyResult.cnt_schedule += 1;

      monthlyResult.sum_humidity = humidity;
      monthlyResult.sum_illuminance = illuminance;
      monthlyResult.sum_noise = noise;
      monthlyResult.sum_temperature = temperature;
    }

    const yearlyResult = await db["yearly"].findOne(
      {},
      {
        where: {
          [op.and]: [
            {
              year,
            },
            {
              user_id,
            },
          ],
        },
      }
    );

    if (yearlyResult == null) {
      console.log(`year 가 존재하지 않습니다.1`);
      await db["yearly"].create({
        year,
        user_id,
        sum_point: point,
        cnt_schedule: 1,
        is_finished: true,

        sum_humidity: humidity,
        sum_illuminance: illuminance,
        sum_noise: noise,
        sum_temperature: temperature,
      });
    } else {
      yearlyResult.sum_point += point;
      yearlyResult.cnt_schedule += 1;

      yearlyResult.sum_humidity = humidity;
      yearlyResult.sum_illuminance = illuminance;
      yearlyResult.sum_noise = noise;
      yearlyResult.sum_temperature = temperature;
    }
    return resolve([dailyResult, weeklyResult, monthlyResult, yearlyResult]);
  });
};
