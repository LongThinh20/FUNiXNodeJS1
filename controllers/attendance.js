const moment = require("moment");

//POST-/
exports.getWorkTimesList = (req, res, next) => {
  const today = new Date();
  let total = 0;
  const workTimes = req.staff.workTime.filter(
    (t) => t.startTime.getDate() === today.getDate()
  );
  workTimes.forEach((t) => {
    total += t.total;
  });

  res.render("staff/home", {
    pageTitle: "Home",
    staffInfo: req.staff,
    workTimes: workTimes,
    totalDay: total,
    moment
  });
};

exports.postStartWorkTime = (req, res, next) => {
  const workTime = {
    workSpace: req.body.workSpace,
    startTime: new Date(),
    endTime: null,
    total: 0,
    overTime: 0,
    annualLeave: 0
  };
  req.staff
    .addWorkTime(workTime)
    .then(() => {
      res.redirect("/attendance");
      console.log("START WORK TIME!!");
    })
    .catch((err) => console.log(err));
};

//GET - /attendance
exports.getStartWorkTime = (req, res, next) => {
  const workTime = req.staff.workTime;
  res.render("staff/attendance", {
    pageTitle: "Attendance Page ",
    workTime: workTime[workTime.length - 1],
    staffName: req.staff.name,
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
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
