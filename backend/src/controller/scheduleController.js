const service = require("../service/scheduleService");
const { defaultcontroller } = require("./index.js")

exports.post = async (req, res, next) => {
    await defaultcontroller(req, res, service.post)
}
exports.get_$schedule_id$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_$schedule_id$)
}
exports.put_$schedule_id$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.put_$schedule_id$)
}
exports.delete_$schedule_id$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.delete_$schedule_id$)
}
exports.get_daily_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_daily_$date$)
}
exports.get_month_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_month_$date$)
}
exports.get_year_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_year_$date$)
}
