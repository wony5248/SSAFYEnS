const moment = require("moment");
const Sequelize = require("sequelize");
const db = require("../models");
const op = Sequelize.Op;
exports.migrate_undo = async (prev_schedule, next_schedule) => {
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

  const started_day = moment(next_schedule.started_at).startOf("day");

  const dailyResult = await db["daily"].findOne({
    where: {
      date: started_day,
    },
  });

  //update할 일자 정보가 없음.
  if (dailyResult == null || dailyResult[0] == 0)
    return reject("해당 daily를 찾을 수 없습니다.1");
  else {
    dailyResult.sum_point -= point;
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
    console.log(`week 가 존재하지 않습니다.1`);
    db["weekly"].create({
      week,
      month,
      year,
      user_id,
      sum_point,
    });
  } else {
    weeklyResult.sum_point -= point;
  }

  const monthlyResult = await db["monthly"].findOne({
    where: {
      year,
      month,
    },
  });

  if (monthlyResult == null) {
    console.log(`month 가 존재하지 않습니다.1`);
    db["monthly"].create({
      month,
      year,
      user_id,
      sum_point,
    });
  } else {
    monthlyResult.sum_point -= point;
  }

  const yearlyResult = await db["yearly"].findOne({
    where: {
      year,
    },
  });

  if (yearlyResult == null) {
    console.log(`year 가 존재하지 않습니다.1`);
    db["yearly"].create({
      year,
      user_id,
      sum_point: point,
    });
  } else {
    yearlyResult.sum_point -= point;
  }
  [dailyResult, weeklyResult, monthlyResult, yearlyResult].reduce(
    (acc, cur) => {
      return console.log(cur.sum_point);
    }
  );
  console.log("1");
  return [dailyResult, weeklyResult, monthlyResult, yearlyResult];
};

exports.migrate = async (prev_schedule, next_schedule) => {
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
      date: started_day,
    },
  });

  //update할 일자 정보가 없음.
  if (dailyResult == null || dailyResult[0] == 0)
    return reject("해당 daily를 찾을 수 없습니다.1");
  else {
    dailyResult.sum_point += point;
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
    console.log(`week 가 존재하지 않습니다.1`);
    db["weekly"].create({
      week,
      month,
      year,
      user_id,
      sum_point,
    });
  } else {
    weeklyResult.sum_point += point;
  }

  const monthlyResult = await db["monthly"].findOne({
    where: {
      year,
      month,
    },
  });

  if (monthlyResult == null) {
    console.log(`month 가 존재하지 않습니다.1`);
    db["monthly"].create({
      month,
      year,
      user_id,
      sum_point,
    });
  } else {
    monthlyResult.sum_point += point;
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
    console.log(`year 가 존재하지 않습니다.1`);
    db["yearly"].create({
      year,
      user_id,
      sum_point: point,
    });
  } else {
    yearlyResult.sum_point += point;
  }
  return [dailyResult, weeklyResult, monthlyResult, yearlyResult];
};
