const router = require("express").Router();
const aaRoutes = require("./aa");

router.use("/", (req, res, next) => {
  console.log("Path : ", req.path);
});
module.exports = router;
