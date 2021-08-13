const router = require("express").Router();
const userRoutes = require("./user");
const groupRoutes = require("./group");
const middleware = require("../middleware");
const averageRoutes = require("./average");
const scheduleRoutes = require("./schedule");

router.use((req, res, next) => {
    console.log(req.socket.remoteAddress, req.method, req.path)
    next()
})

router.use(middleware.verifyToken);
router.use("/user", userRoutes);
router.use("/group", groupRoutes);
router.use("/average", averageRoutes);
router.use("/schedule", scheduleRoutes);

module.exports = router;
