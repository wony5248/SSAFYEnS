const express = require("express");
const routes = require("./routes");
require("dotenv").config();
const { PORT } = process.env;
const app = express();
//middleware
app.use("/", routes);

app.listen(PORT || 8080, () => {
  console.log(PORT || 8080);
  console.log("welecome to nodejs server");
});
