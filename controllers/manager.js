const moment = require("moment");

const Staff = require("../models/staff");

const Methods = require("../utils/methods");

exports.getIndex = (req, res, next) => {
  Staff.find({ role: "staff" })
    .then((staffs) => {
      res.render("manager/index", {
        pageTitle: "Quản lý nhân viên",
        path: "/manager",
        isWork: false,
        staffs
      });
    })
    .catch((err) => console.log(err));
};

exports.postStaffDetail = (req, res, next) => {
  // console.log("month", req.body.month);

  Staff.findById(req.body.staffId.trim())
    .then((staff) => {
      return res.render("manager/staffManager", {
        pageTitle: "Quản lý nhân viên",
        path: "/manager",
        isWork: false,
        totalTime: Methods.getTotalTime(staff.workTime),
        staff,
        moment
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteWorkTime = (req, res, next) => {
  Staff.findById(req.body.staffId.trim())
    .then((staff) => {
      const updateWorkTime = [...staff.workTime];
      const newUpdateArr = updateWorkTime.filter((work) => {
        return work._id.toString() !== req.body.workTimeId.trim().toString();
      });

      staff.workTime = newUpdateArr;

      return staff.save();
    })
    .then((result) => {
      return res.render("manager/staffManager", {
        pageTitle: "Quản lý nhân viên",
        path: "/manager",
        isWork: false,
        totalTime: Methods.getTotalTime(result.workTime),
        staff: result,
        moment
      });
    })
    .catch((err) => console.log(err));
};
