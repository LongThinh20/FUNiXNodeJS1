// const WorkTime = require("../models/workTime");
// const OffTime = require("../models/offTime");

const Methods = require("../utils/methods");

const moment = require("moment");

exports.getWorkTimeAndSalary = (req, res, next) => {
  let totalTime = 0;
  let totalTimeLeave = 0;
  const workTime = req.staff.workTime;
  const offTime = req.staff.offTime;

  offTime.forEach((t) => {
    let numberAnnuaLeave = t.offTime.split(",").length;
    totalTimeLeave += numberAnnuaLeave * t.offHours;
  });
  workTime.forEach((t) => {
    totalTime += t.total;
  });
  if (workTime[workTime.length - 1].endTime.getHours() === 24) {
    totalTime += totalTimeLeave;
  }

  const salary = Methods.getSalary(req.staff, req.body.month);
  res.render("staff/workTimeAndSalary", {
    pageTitle: "WorkTimeAndSalary Page ",
    moment,
    workTimes: req.staff.workTime,
    totalTime,
    offTimes: req.staff.offTime,
    salary
  });
};

exports.postSalaryToMonth = (req, res, next) => {
  const salary = Methods.getSalary(req.staff, req.body.month);

  let totalTime = 0;
  let totalTimeLeave = 0;
  const workTime = req.staff.workTime;
  const offTime = req.staff.offTime;

  offTime.forEach((t) => {
    let numberAnnuaLeave = t.offTime.split(",").length;
    totalTimeLeave += numberAnnuaLeave * t.offHours;
  });
  workTime.forEach((t) => {
    totalTime += t.total;
  });
  if (workTime[workTime.length - 1].endTime.getHours() === 24) {
    totalTime += totalTimeLeave;
  }

  res.render("staff/workTimeAndSalary", {
    pageTitle: "WorkTimeAndSalary Page ",
    salary,
    moment,
    workTimes: req.staff.workTime,
    totalTime,
    offTimes: req.staff.offTime
  });
};
