const Sequelize = require("sequelize");
const moment = require("moment")
const op = Sequelize.Op;
const db = require("../models");



exports.buildSchedule = async (req) => {
    const { date, point, month, year, week, started_at, finished_at } = req.body;
    console.log("네 : ", req.body)
    const { user_id } = req
    return await db["schedules"].build({
        date, point, month, year, week, started_at, user_id, finished_at
    });
}
exports.createOrUpdateDaily = async (req) => {
    const { date, point, month, year, week, started_at } = req.body;
    const { user_id } = req

    const start_day = moment(started_at).startOf("day");
    const dailyResult = await db["daily"].findOne({
        where: {
            [op.and]: [{ user_id }, { date: start_day }],
        },
    });
    //update할 일자 정보가 없음.
    if (dailyResult == null) {
        db["daily"].create({
            date: start_day,
            week,
            month,
            year,
            user_id,
            sum_point: point,
            cnt_schedule: 1,
        });
    } else {
        dailyResult.sum_point += point;
        dailyResult.cnt_schedule += 1;
    }
    return dailyResult
}
exports.createOrUpdateWeekly = async (req) => {
    const { date, point, month, year, week, started_at } = req.body;
    const { user_id } = req
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
            sum_point: point,
            cnt_schedule: 1,
        });
    } else {
        weeklyResult.sum_point += point;
        weeklyResult.cnt_schedule += 1;
    }
    return weeklyResult
}
exports.createOrUpdateMonthly = async (req) => {
    const { date, point, month, year, week, started_at } = req.body;
    const { user_id } = req
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
            sum_point: point,
            cnt_schedule: 1,
        });
    } else {
        monthlyResult.sum_point += point;
        monthlyResult.cnt_schedule += 1;
    }
    return monthlyResult
}
exports.createOrUpdateYearly = async (req) => {
    const { date, point, month, year, week, started_at } = req.body;
    const { user_id } = req
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
            sum_point: point,
            cnt_schedule: 1,
        });
    } else {
        yearlyResult.sum_point += point;
        yearlyResult.cnt_schedule += 1;
    }
    return yearlyResult
}

exports.findSchedule_id = async (req) => {
    const { schedule_id } = req.params;
    const { user_id } = req
    const schedule = await db["schedules"]
        .findOne({
            where: {
                [op.and]: [
                    {
                        schedule_id,
                    },
                    {
                        user_id,
                    },
                ],
            },
        })
    return schedule
}
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

exports.migrate = async (req, next_schedule) => {
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
        } = next_schedule;
        const { user_id } = req
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
exports.getSchedule_unit = async (req, unit) => {
    if (!unit in ["day", "month", "week"]) return null
    const { user_id } = req;
    const month = moment(req.params.date).startOf(unit);

    const standard1 = moment(month).toDate();
    const standard2 = moment(month)
        .add(1, unit + "s")
        .toDate();

    console.log(`${user_id}의 ${req.params.date} ${unit}을 조회합니다`, standard1, standard2);
    const data = await db["schedules"]
        .findAll({
            where: {
                [op.and]: [
                    {
                        finished_at: {
                            [op.gt]: standard1,
                        },
                    },
                    {
                        started_at: {
                            [op.lt]: standard2,
                        },

                    },
                    {
                        user_id
                    }

                ],
            },
        })

    return data
}

// exports = async (req) => {

// }
// exports = async (req) => {

// }
// exports = async (req) => {

// }
// exports = async (req) => {

// }
// exports = async (req) => {

// }
// exports = async (req) => {

// }
