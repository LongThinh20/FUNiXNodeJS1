const WorkTime = require("../models/workTime");
const OffTime = require("../models/offTime");
const Staff = require("../models/staff");
const moment = require("moment");

exports.getIndex = (req, res, next) => {
  const staffInfo = req.staff;
  const today = new Date();

  WorkTime.find()
    .then((workTimes) => {
      return workTimes.filter((t) => t.startTime.getDate() === today.getDate());
    })
    .then((result) => {
      let totalDay = 0;

      result.map((t) => {
        let end = moment(t.endTime);
        let now = moment(t.startTime);
        if (end == null || t.endTime.getDate() !== today.getDate()) {
          totalDay = 0;
          return totalDay;
        } else {
          let duration = moment.duration(end.diff(now));
          let days = duration.asHours();
          totalDay = totalDay + days;
          return totalDay;
        }
      });

      res.render("staff/home", {
        pageTitle: "Home",
        staffInfo: staffInfo,
        workTimes: result,
        totalDay: totalDay,
        moment: moment
      });
    })
    .catch((err) => console.log(err));
};

exports.postWorkTime = (req, res, next) => {
  const workSpace = req.body.workSpace;
  const startTime = new Date();

  const workTimes = new WorkTime({
    workSpace: workSpace,
    startTime: startTime,
    endTime: null,
    staffId: req.staff
  });
  workTimes
    .save()
    .then((result) => {
      // console.log(result);
      console.log("POST WorkTime");
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/attendance");
};

exports.getTest = (req, res, next) => {
  WorkTime.find()
    .then((workTimes) => {
      return workTimes[workTimes.length - 1];
    })
    .then((result) => {
      res.render("staff/attendance", {
        pageTitle: "Attendance Page ",
        workTime: result,
        staffName: req.staff.name,
        moment: moment
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postTest = (req, res, next) => {
  const workTimeId = req.body.workTimeId;
  WorkTime.findById(workTimeId)
    .then((workTime) => {
      workTime.endTime = new Date();
      return workTime.save();
    })
    .then((result) => {
      console.log("UPDATED staff!");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;

  res.render("staff/staff-info", {
    pageTitle: "Staff Information",
    staffInfo: staffInfo
  });
};

exports.postCovidInfo = (req, res, next) => {
  res.render("staff/covid-info", {
    pageTitle: "Covid Infomation"
  });
};

exports.getCovid = (req, res, next) => {
  res.render("staff/covid-info", {
    pageTitle: "Resister Covid Infomation"
  });
};

exports.postTimeOff = (req, res, next) => {
  const offTime = req.body.offTime;
  const reason = req.body.reason;
  const offHours = req.body.offHours;
  const offTimes = new OffTime({
    offTime: offTime,
    reason: reason,
    offHours: offHours,
    staffId: req.staff
  });

  if (offHours > 0 && offHours <= 8) {
    offTimes
      .save()
      .then((result) => {
        req.staff.updateAnnualLeave(offHours);
        console.log("POST OFF TIME ");
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
    console.log("invalid time number!!!");
    res.redirect("/");
  }
};
