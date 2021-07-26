const express = require("express");
const app = express();
const routes = require("./routes");

require("dotenv").config();

//middleware
app.use("/", routes);

// content-type - application/json
app.use(express.json());

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(PORT || 8080, () => {
  console.log(PORT || 8080);
app.listen(env.NODEJS_PORT || 8080, () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
