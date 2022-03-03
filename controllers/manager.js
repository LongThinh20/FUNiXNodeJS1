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
  Staff.findById(req.body.staffId.trim())
    .then((staff) => {
      return res.render("manager/staffManager", {
        pageTitle: "Quản lý nhân viên",
        path: "/manager",
        isWork: false,
        totalTime: Methods.getTotalTime(staff.workTime),
        staff,
        moment,
        errorMessage: null
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
        moment,
        errorMessage: null
      });
    })
    .catch((err) => console.log(err));
};

exports.postIsConfirmed = (req, res, next) => {
  Staff.findById(req.body.staffId.trim())
    .then((staff) => {
      const item = {
        confirmed: true,
        month: req.body.month
      };

      if (staff.isConfirm.length > 0) {
        staff.isConfirm.forEach((isConfirm) => {
          if (isConfirm.month.toString() === item.month) {
            return res.render("manager/staffManager", {
              pageTitle: "Quản lý nhân viên",
              path: "/manager",
              isWork: false,
              totalTime: Methods.getTotalTime(staff.workTime),
              staff,
              moment,
              errorMessage: "Tháng đã xác nhận , hãy chọn tháng khác !!"
            });
          }
        });
      }
      staff.isConfirm.push(item);

      staff.save();
    })
    .then((result) => {
      console.log("POST ISCONFIRM !!!");
      return res.redirect("/manager");
    })
    .catch((err) => {
      console.log(err);
    });
};
