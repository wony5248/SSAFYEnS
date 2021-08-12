const router = require("express").Router();
const aaRoutes = require("./aa");
// const mvpRoutes = require("./mvp");
const userRoutes = require("./user");
const groupRoutes = require("./group");
// const middleware = require("../middleware");
const averageRoutes = require("./average");
const scheduleRoutes = require("./schedule");

//접속요청 경로 출력
router.use((req, res, next) => {
  console.log("Path : ", req.path, req.socket.remoteAddress);
  next();
});

// jwt 토큰
// router.use(middleware.verifyToken)
// jwt 토큰 없는 경우도 고려
// jwt 토큰 뜯어서 전달
// verifyToken(req, res, next);

// router.use("/mvp", mvpRoutes);
router.use("/user", userRoutes);
router.use("/group", groupRoutes);
router.use("/average", averageRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
