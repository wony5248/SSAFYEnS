var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");
var sensorData = [];
var { PythonShell } = require("python-shell");
var moment = require("moment")
/*DB 에서 가져올 센서 값*/
router.get("/", function (req, res, next) {
  //   res.send({ "temp": "36", "humid": "56", "noise": "168", "light": "32" });
  res.json({
    temp: `${sensorData[0]}`,
    humid: `${sensorData[1]}`,
    noise: `${sensorData[2]}`,
    light: `${sensorData[3]}`,
  });
});

router.post("/", function (req, res, next) {
  //   res.send("DB로 보낼 센서값");
  sensorData = [];
  sensorData.push(req.body["temp"]);
  sensorData.push(req.body["humid"]);
  sensorData.push(req.body["noise"]);
  sensorData.push(req.body["light"]);
  console.log(sensorData);
  res.json(req.body);
});

router.post("/notification", function (req, res, next) {
  console.log(req.body.arr);

  for (let i = 0; i < req.body.arr.length; i++) {
    var options = {
      mode: "text",

      pythonPath: "",

      pythonOptions: ["-u"],

      scriptPath: "",

      args: [
        req.body.arr[i].title,
        req.body.arr[i].started_at,
        req.body.arr[i].finished_at,
        req.body.arr[i].notificationtime,
      ],
      encoding: 'utf8'
    };
    PythonShell.run("../hardware/notification1.py", options, function (err, msg) {
      if (err) throw err;
      let data = msg[2]
      console.log(data)
      // console.log("results: %j", msg)
    });
  }
  
});

module.exports = router;
