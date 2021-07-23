const express = require("express");
const app = express();
const routes = require("./routes");

require("dotenv").config();

const { PORT } = process.env;

//middleware
app.use("/", routes);

app.listen(PORT || 8080, () => {
  console.log(PORT || 8080);
  console.log("welecome to nodejs server");
});
