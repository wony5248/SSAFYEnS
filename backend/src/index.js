const express = require("express");
const app = express();
const routes = require("./routes");

require("dotenv").config();

//cors
app.use(require("./config/cors.js"));

const env = process.env;

//middleware

// content-type - application/json
app.use(express.json());
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const date = moment("2021-08-03 11:00:00");
console.log("date : ", date);
console.log("date.startOf.format : ", date.startOf("days").format());
console.log("date.startOf.toDate : ", date.startOf("days").toDate());
// console.log("date2 : ", date2);

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.listen(env.NODEJS_PORT || 8080, "0.0.0.0", () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
