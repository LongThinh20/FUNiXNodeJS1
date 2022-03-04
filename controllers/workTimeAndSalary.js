const Methods = require("../utils/methods");

const moment = require("moment");

// GET /workTime
exports.getWorkTimeAndSalary = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "WorkTimeAndSalary Page ",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTimes(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary
  });
};

//POST /workTime
exports.postSalaryToMonth = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "WorkTimeAndSalary Page ",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTimes(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary
  });
};
