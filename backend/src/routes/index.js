const router = require("express").Router();
const aaRoutes = require("./aa");
// const mvpRoutes = require("./mvp");
const userRoutes = require("./user");
const groupRoutes = require("./group");
const averageRoutes = require("./average");
const scheduleRoutes = require("./schedule");

//접속요청 경로 출력
router.use((req, res, next) => {
  console.log("Path : ", req.path, req.socket.remoteAddress);
  next();
});

// router.use("/mvp", mvpRoutes);
router.use("/user", userRoutes);
router.use("/group", groupRoutes);
router.use("/average", averageRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
