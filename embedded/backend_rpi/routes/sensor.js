var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");
var sensorData = [];

/*DB 에서 가져올 센서 값*/
router.get("/", function (req, res, next) {
  //   res.send({ "temp": "36", "humid": "56", "noise": "168", "light": "32" });
  res.json({
    temp: sensorData[0],
    humid: sensorData[1],
    noise: sensorData[2],
    light: sensorData[3],
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

module.exports = router;
