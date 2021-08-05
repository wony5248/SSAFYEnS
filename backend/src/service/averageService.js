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
