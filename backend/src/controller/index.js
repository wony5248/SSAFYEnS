const service = require("../service/scheduleService");
const { validationResult } = require("express-validator");

getPayload = (req) => { return { params: req.params, body: req.body, user_id: req.user_id } }

exports.defaultcontroller = async (req, res, func) => {
    payload = getPayload(req)
    console.log("Payload : ", payload)
    const result = validationResult(req);
    if (!result.isEmpty()) {
        console.log(validationResult(req));
        return res.status("400").json({ result });
    } else {
        await func(payload)
            .then((data) => {
                return res.json(data);
            })
            .catch((error) => {
                return res.status("405").send({ error });
            });
    }
}