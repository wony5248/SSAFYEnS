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

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.listen(env.NODEJS_PORT || 8080, () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
