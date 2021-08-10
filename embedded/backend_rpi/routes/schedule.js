var express = require("express");
var router = express.Router();
const axios = require("axios");
var fs = require("fs");
var sensorData = [];
var moment = require("moment");

// 일정 추가
router.post("/", async function (req, res, next) {
  await axios
    .post("http://i5a109.p.ssafy.io:8079/schedule", {
      
      date: req.body.date,
      started_at: req.body.started_at,
      finished_at: req.body.finished_at,
      deadline_at: req.body.deadline_at,
      notification: req.body.notification,
      is_finished: req.body.is_finished,
      title: req.body.title,
      context: req.body.context,
      month: req.body.month,
      year: req.body.year,
      week: req.body.week,
      point: req.body.point,
      user_id: req.body.user_id,
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
router.delete("/:id", async function (req, res, next) {
  console.log(req);
  console.log(req.body);
  await axios
    .delete(`http://i5a109.p.ssafy.io:8079/schedule/${req.params.id}`)
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
// 일정 변경 및 완료
router.put("/:id", async function (req, res, next) {
  console.log("여기");
  console.log("저기");
  console.log(req.params);
  console.log(req.body);
  await axios
    .put(`http://i5a109.p.ssafy.io:8079/schedule/${req.params.id}`, {
      started_at: req.body.started_at,
      finished_at: req.body.finished_at,
      deadline_at: req.body.deadline_at,
      notification: req.body.notification,
      is_finished: req.body.is_finished,
      title: req.body.title,
      point: req.body.point,
      context: req.body.context,
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
// test용
router.get("/", async function (req, res, next) {
  await axios
    .get("http://i5a109.p.ssafy.io:8079/schedule/6")
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

// 현재 일정 가져오기
router.get("/getdaily/:date/current", async function (req, res, next) {
  await axios
    .get(`http://i5a109.p.ssafy.io:8079/schedule/daily/${req.params.date}`)
    .then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {

        response.data.data[i].date = moment(response.data.data[i].date).format("YYYYMMDD")
        response.data.data[i].started_at = moment(response.data.data[i].started_at).format("YYYYMMDD HHmm")
        response.data.data[i].finished_at = moment(response.data.data[i].finished_at).format("YYYYMMDD HHmm")
        response.data.data[i].deadline_at = moment(response.data.data[i].deadline_at).format("YYYYMMDD HHmm")
        response.data.data[i].notification = moment(response.data.data[i].notification).format("YYYYMMDD HHmm")
        const startTime = Number(
          moment(response.data.data[i].started_at).format("HH")
        );
        const startMin = Number(
          moment(response.data.data[i].started_at).format("mm")
        );
        const endTime = Number(
          moment(response.data.data[i].finished_at).format("HH")
        );
        const endMin = Number(
          moment(response.data.data[i].finished_at).format("mm")
        );
        const currentTime = Number(moment().format("HH"));

        const currentMin = Number(moment().format("mm"));

        if (
          startTime < currentTime &&
          currentTime < endTime &&
          response.data.data[i].is_finished === false
        ) {
          res.send(response.data.data[i]);
        } else if (
          currentTime === endTime &&
          currentMin <= endMin &&
          response.data.data[i].is_finished === false
        ) {
          res.send(response.data.data[i]);
        } else if (
          currentTime === startTime &&
          startMin <= currentMin &&
          response.data.data[i].is_finished === false
        ) {
          res.send(response.data.data[i]);
        }
      }
      res.send("현재 등록된 일정이 없습니다.");
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});
// 하루일정 가져오기 음성비서용
router.get("/getdaily/secretary/:date", async function (req, res, next) {
  await axios
    .get(`http://i5a109.p.ssafy.io:8079/schedule/daily/${req.params.date}`)
    .then((response) => {
      const arr = response.data.data;
      arr.sort(function (a, b) {
        return (
          Number(moment(a.started_at).format("HHmm")) -
          Number(moment(b.started_at).format("HHmm"))
        );
      });
      for (let i =0; i < arr.length; i++){
        arr[i].date = moment(arr[i].date).format("YYYYMMDD")
        arr[i].started_at = moment(arr[i].started_at).format("YYYYMMDD HHmm")
        arr[i].finished_at = moment(arr[i].finished_at).format("YYYYMMDD HHmm")
        arr[i].deadline_at = moment(arr[i].deadline_at).format("YYYYMMDD HHmm")
        arr[i].notification = moment(arr[i].notification).format("YYYYMMDD HHmm")
      }
      res.send(arr);
      console.log(22222);
    })
    .catch(function (error) {
      res.send(error);
      console.log(11111);
      console.log(error);
    });
});

// 하루일정 가져오기
router.get("/getdaily/:date", async function (req, res, next) {
  await axios
    .get(`http://i5a109.p.ssafy.io:8079/schedule/daily/${req.params.date}`)
    .then((response) => {
      const arr = response.data.data;
      arr.sort(function (a, b) {
        return (
          Number(moment(a.started_at).format("HHmm")) -
          Number(moment(b.started_at).format("HHmm"))
        );
      });
      res.send(arr);
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
  console.log("여기야여기");
  console.log(req);
  console.log("저기야저기");
  console.log(req.params);
  await axios
    .get(`http://i5a109.p.ssafy.io:8079/schedule/${req.params.id}`)
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
