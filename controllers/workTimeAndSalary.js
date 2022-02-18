// const WorkTime = require("../models/workTime");
// const OffTime = require("../models/offTime");

const Methods = require("../utils/methods");

const moment = require("moment");

exports.getWorkTimeAndSalary = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    pageTitle: "WorkTimeAndSalary Page ",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime, req.staff.offTime),
    offTimes: req.staff.offTime,
    salary
  });
};

exports.postSalaryToMonth = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    pageTitle: "WorkTimeAndSalary Page ",
    moment,
    workTimes: req.staff.workTime,
    totalTime: Methods.getTotalTime(req.staff.workTime, req.staff.offTime),
    offTimes: req.staff.offTime,
    salary
  });
};
