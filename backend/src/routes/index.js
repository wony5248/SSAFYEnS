const router = require("express").Router();
const aaRoutes = require("./aa");
const mvpRoutes = require("./mvp");

//접속요청 경로 출력
router.use((req, res, next) => {
  console.log("Path : ", req.path);
  next();
});

router.use("/mvp", mvpRoutes);
module.exports = router;
