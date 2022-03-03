const moment = require("moment");

exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;
  res.render("staff/staff-info", {
    path: "/staffInfo",
    pageTitle: "Staff Information",
    staffInfo: staffInfo,
    isWork: false,
    moment
  });
};

exports.postUpdateAvatar = (req, res, next) => {
  req.staff.image = req.body.image;
  req.staff
    .save()
    .then(() => res.redirect("/registerWork"))
    .catch((error) => console.log(error));
};
