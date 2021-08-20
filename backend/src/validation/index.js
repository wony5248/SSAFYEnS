const logic = require("./index.js")
const moment = require("moment");
moment.tz.setDefault("Asia/Seoul");

exports.verifyDate = (value, { req }) => moment(value).isValid()
exports.verifyDateOrNull = (value, { req }) => value == null || moment(value).isValid()
exports.startOfDay = (value, { req }) => moment(value).startOf("day").toDate();
exports.start_atBeforeFinished_at = (value, { req }) => {
    let { started_at, finished_at } = req.body;
    const contidion1 =
        moment(started_at).isSame(finished_at, "day") &&
        moment(started_at).diff(finished_at, "second") <= 0;

    if (!contidion1)
        throw new Error(
            "started_at과 end_at이 다른 날짜로 작성되었거나 started_at이 finished_at보다 늦게 설정되었습니다."
        );
    else return true;
}
exports.momentToDate = (value, { req }) => {
    if (value == null) return value;
    else return moment(value).toDate();
}
exports.started_atSameBodyDate = (value, { req }) => {
    return (moment(value).startOf("day").isSame(moment(req.body.date).startOf("day")))
}