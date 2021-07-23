const express = require("express");
const app = express();
const routes = require("./routes");

require("dotenv").config();

const env = process.env;

//middleware
app.use("/", routes);

app.listen(env.NODEJS_PORT || 8080, () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
