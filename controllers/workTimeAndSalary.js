const Methods = require("../utils/methods");

const moment = require("moment");

exports.getWorkTimeAndSalary = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary
  });
};

exports.postSalaryToMonth = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    path: "/workTimeAndSalary",
    pageTitle: "Thông tin giờ làm và lương",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime),
    offTimes: req.staff.offTime,
    isWork: false,
    salary
  });
};
