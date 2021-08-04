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
const moment = require("moment");
const date = moment("2021-01-23 4:5:6");
console.log(date);
console.log(date.utc());
console.log(date.toDate());
console.log(date.utc().toDate());
console.log(date.startOf("days"));

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.listen(env.NODEJS_PORT || 8080, "0.0.0.0", () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
