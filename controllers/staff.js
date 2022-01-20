const Staff = require("../models/staff");

exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;

  res.render("staff/staff-info", {
    pageTitle: "Staff Information",
    staffInfo: staffInfo
  });
};
