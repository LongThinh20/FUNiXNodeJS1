const moment = require("moment");

const Staff = require("../models/staff");

const Methods = require("../utils/methods");

//GET /manager
exports.getIndex = (req, res, next) => {
  try {
    Staff.find({ role: "staff" })
      .then((staffs) => {
        res.render("manager/index", {
          pageTitle: "Quản lý nhân viên",
          path: "/manager",
          isWork: false,
          staffs
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /manager/staffDetail
exports.postStaffDetail = (req, res, next) => {
  try {
    Staff.findById(req.body.staffId.trim())
      .then((staff) => {
        return res.render("manager/staffManager", {
          pageTitle: "Quản lý nhân viên",
          path: "/manager",
          isWork: false,
          totalTime: Methods.getTotalTimeLastDate(
            staff.workTime,
            staff.offTime
          ),
          staff,
          moment,
          errorMessage: null
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /manager/deleteWorkTime
exports.deleteWorkTime = (req, res, next) => {
  try {
    Staff.findById(req.body.staffId.trim())
      .then((staff) => {
        const updateWorkTime = [...staff.workTime];
        const newUpdateArr = updateWorkTime.filter((work) => {
          return work._id.toString() !== req.body.workTimeId.trim().toString();
        });

        staff.workTime = newUpdateArr;

        return staff.save();
      })
      .then((staff) => {
        return res.render("manager/staffManager", {
          pageTitle: "Quản lý nhân viên",
          path: "/manager",
          isWork: false,
          totalTime: Methods.getTotalTimeLastDate(
            staff.workTime,
            staff.offTime
          ),
          staff,
          moment,
          errorMessage: null
        });
      })
      .catch((err) => console.error(err));
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

//POST /manager/isConfirm
exports.postIsConfirmed = (req, res, next) => {
  try {
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
                totalTime: Methods.getTotalTimeLastDate(
                  staff.workTime,
                  staff.offTime
                ),
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
        console.error(err);
      });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
