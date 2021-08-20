const moment = require("moment");
const db = require("../models");
const op = require("sequelize").Op;

exports.getSchedule_unit = async (req, unit) => {
    return new Promise(async (resolve, reject) => {
        const { user_id } = req
        const { date } = req.params
        const standard1 = moment(date).startOf(unit).toDate();
        const standard2 = moment(standard1).add(1, unit).toDate();
        console.log("week에 포함된 일정들을 조회합니다", standard1, standard2);

        const schedules = await db["schedules"].findAll({
            raw: true,
            where: {
                [op.and]: [
                    {
                        user_id,
                    },
                    {
                        started_at: {
                            [op.gte]: standard1,
                        },
                    },
                    {
                        finished_at: {
                            [op.lte]: standard2,
                        },
                    },
                ],
            },
        });
        resolve(schedules)
    })
}
exports.getAverage = async (req, unit) => {
    if (!unit in ["daily", "weekly", "monthly", "yearly"]) return null

    const condition1 = {}
    const condition2 = {}
    const condition3 = {}
    const condition4 = {}
    console.log("파라미터 : ", req, unit)

    switch (unit) {
        case "daily":
            if (req.params.date != null) condition4.date = req.params.date
        case "weekly":
            if (req.body.week != null) condition3.week = req.body.week
        case "monthly":
            if (req.body.month != null) condition2.month = req.body.month
        case "yearly":
            if (req.body.year != null) condition1.year = req.body.year
    }

    const { user_id } = req
    console.log(condition1, condition2, condition3, condition4)

    const daily = await db[unit]
        .findOne({
            raw: true,
            where: {
                [op.and]: [
                    {
                        user_id,
                    },
                    condition1,
                    condition2,
                    condition3,
                    condition4
                ],
            },
        })
    return daily
}
// exports.getSchedule_unit = async (req, unit) => {
//     return new Promise(async (resolve, reject) => {
//         resolve(schedules)
//     })
// }
// exports.getSchedule_unit = async (req, unit) => {
//     return new Promise(async (resolve, reject) => {
//         resolve(schedules)
//     })
// }
// exports.getSchedule_unit = async (req, unit) => {
//     return new Promise(async (resolve, reject) => {
//         resolve(schedules)
//     })
// }