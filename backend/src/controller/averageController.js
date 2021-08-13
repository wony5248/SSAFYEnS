const service = require("../service/averageService");
const { defaultcontroller } = require("./index.js")

exports.get_daily_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_daily_$date$)
}
exports.put_daily_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.put_daily_$date$)
}
exports.get_week_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_week_$date$)
}
exports.get_month_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_month_$date$)
}
exports.get_year_$date$ = async (req, res, next) => {
    await defaultcontroller(req, res, service.get_year_$date$)
}
