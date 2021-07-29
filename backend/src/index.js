const express = require("express");
const app = express();
const routes = require("./routes");

require("dotenv").config();

//cors
const cors = require("cors");
app.use(cors);

const env = process.env;

//middleware
app.use("/", routes);

// content-type - application/json
app.use(express.json());

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(env.NODEJS_PORT || 8080, () => {
  console.log(env.NODEJS_PORT || 8080);
  console.log("welecome to nodejs server");
});
