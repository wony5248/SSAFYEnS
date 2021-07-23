const express = require("express");
const routes = require("./routes");
const app = express();
//middleware
app.use("/", routes);

app.listen(8080, () => {
  console.log("welecome to nodejs server");
});
