const WorkTime = require("../models/workTime");
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

        if (end !== null) {
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
        totalDay: totalDay
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
      console.log("POST WT");
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
        staffName: req.staff.name
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
