const moment = require("moment");
const Methods = require("../utils/methods");

//GET /registerWork
exports.getWorkTimesList = (req, res, next) => {
  res.render("staff/workPage", {
    path: "/adttendance",
    pageTitle: "ĐĂNG KÍ LÀM VIỆC",
    staffInfo: req.staff,
    isWork: false,
    workTimes: Methods.getTotalTimesOfDay(req.staff.workTime).listWorkTime,
    totalTime: Methods.getTotalTimesOfDay(req.staff.workTime).totalTime,
    moment
  });
};

//POST /registerWork
exports.postStartWorkTime = (req, res, next) => {
  const workTime = {
    workSpace: req.body.workSpace,
    startTime: new Date(),
    endTime: null,
    total: 0,
    overTime: 0
  };

  req.staff
    .addWorkTime(workTime)
    .then(() => {
      res.redirect("/attendance");
      console.log("START WORK TIME!!");
    })
    .catch((err) => console.log(err));
};

//GET  /attendance
exports.getStartWorkTime = (req, res, next) => {
  const workTime = req.staff.workTime;
  res.render("staff/attendance", {
    pageTitle: "ĐIỂM DANH",
    path: "/adttendance",
    workTime: workTime[workTime.length - 1],
    staffName: req.staff.name,
    isWork: true,
    moment
  });
};

// POST - /attendance
exports.postEndWorkTime = (req, res, next) => {
  const endTime = new Date();
  req.staff
    .updateWorkTime(endTime)
    .then(() => {
      console.log("POST END WORKTIME");
      res.redirect("/registerWork");
    })
    .catch((err) => console.log(err));
};
