var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");
var sensorData = [];
/*DB 에서 가져올 센서 값*/
router.get("/sensor", function (req, res, next) {
  //   res.send({ "temp": "36", "humid": "56", "noise": "168", "light": "32" });
  res.json({
    temp: `${sensorData[0]}`,
    humid: `${sensorData[1]}`,
    noise: `${sensorData[2]}`,
    light: `${sensorData[3]}`,
  });
});

router.post("/sensor", function (req, res, next) {
  //   res.send("DB로 보낼 센서값");
  sensorData = [];
  sensorData.push(req.body["temp"]);
  sensorData.push(req.body["humid"]);
  sensorData.push(req.body["noise"]);
  sensorData.push(req.body["light"]);
  console.log(sensorData);
  res.json(req.body);
});


// 일정 추가
router.post("/schedule", async function (req, res, next) {

  await axios
    .post("http://127.0.0.1:8079/schedule", {
      "date" : req.body.date,
      "started_at" : req.body.started_at,
      "finished_at" : req.body.finished_at,
      "deadline_at" : req.body.deadline_at,
      "notification" : req.body.notification,
      "is_finished" : req.body.is_finished,
      "title" : req.body.title,
      "context" : req.body.context,
      "month" : req.body.month,
      "year" : req.body.year,
      "week" : req.body.week,
      "point" : req.body.point,
      "user_id" : req.body.user_id
    })
    .then((response) => {
      res.send(response.data);
      console.log(11111);
    })
    .catch(function (error) {
      res.send(error);
      console.log(error);
      console.log(222222);
    });
  console.log(sensorData);
  res.json(req.body);
});

// 일정 삭제
router.delete("/schedule/:id", async function (req, res, next) {
  console.log(req)
  console.log(req.body);
  await axios
    .delete(`http://127.0.0.1:8079/schedule/${req.params.id}`)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});
// test용
router.get("/schedule", async function (req, res, next) {

  await axios
    .get("http://127.0.0.1:8079/schedule/6")
    .then((response) => {
      res.send(response.data);
      console.log(11111);
    })
    .catch(function (error) {
      res.send(error);
      console.log(error);
      console.log(222222);
    });
  console.log(sensorData);
  res.json(req.body);
});

// router.post("/timer", function (req, res, next) {
//   //   res.send("2");
//   res.json(req.body);
// });
// router.post("/stopwatch", function (req, res, next) {
//   //   res.send("3");
//   res.json(req.body);
// });

// 하루일정 가져오기
router.get("/getdaily/:date", async function (req, res, next) {
  console.log("여기야여기")
  console.log(req)
  console.log("저기야저기")
  console.log(req.body);
  await axios
    .get(`http://127.0.0.1:8079/schedule/daily/${req.params.date}`)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});

//일정 가져오기
router.get("/:id", async function (req, res, next) {
  console.log("여기야여기")
  console.log(req)
  console.log("저기야저기")
  console.log(req.params);
  await axios
    .get(`http://127.0.0.1:8079/schedule/${req.params.id}`)
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});

//일정 변경하기
router.put("/:id", async function (req, res, next) {
  console.log("여기")
  console.log("저기")
  console.log(req.params);
  console.log(req.body)
  await axios
    .put(`http://127.0.0.1:8079/schedule/${req.params.id}`, {
      "started_at" : req.body.started_at,
      "finished_at" : req.body.finished_at,
      "deadline_at" : req.body.deadline_at,
      "notification" : req.body.notification,
      "is_finished" : req.body.is_finished,
      "title" : req.body.title,
      "point" : req.body.point,
      "context" : req.body.context
    })
    .then((response) => {
      res.send(response.data);
      console.log(response.data);
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});
// router.post('/getModule', function(req, res, next) {
//     console.log("1" + req.headers["x-access-token"]);
//     axios.post('http://127.0.0.1:4500/auth/getModule', {
//             module_id: req.body.module_id,
//             headers:{
//                 "x-access-token" : req.headers["x-access-token"]
//             }
//         })
//         .then(response => {
//             res.send(response.data)
//             console.log(response.data)
//             console.log(22222)

//         })
//         .catch(function(error) {
//             res.send(error)
//             console.log(11111)
//             console.log(error);
//         });
// });

// router.post('/setModule', function(req, res, next) {
//     axios.post('http://127.0.0.1:4500/unauth/setModule', {
//             module_id : req.body.module_id,
//             module_data : req.body.module_data
//         })
//         .then(response => {
//             res.send(response.data)
//         })
//         .catch(function(error) {
//             res.send(error)
//             console.log(error);
//         });
// });

module.exports = router;
