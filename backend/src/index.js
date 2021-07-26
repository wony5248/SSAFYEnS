const express = require("express");
const routes = require("./routes");
require("dotenv").config();
const { PORT } = process.env;
const app = express();

//cors
const cors = require("cors");
app.use(cors);

//middleware
app.use("/", routes);

// content-type - application/json
app.use(express.json());

// content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.listen(PORT || 8080, () => {
  console.log(PORT || 8080);
  console.log("welecome to nodejs server");
});
