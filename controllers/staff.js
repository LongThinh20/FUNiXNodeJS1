const moment = require("moment");
exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;
  res.render("staff/staff-info", {
    path: "/staffInfo",
    pageTitle: "Thông tin nhân viên",
    staffInfo: staffInfo,
    isWork: false,
    moment,
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postUpdateAvatar = (req, res, next) => {
  req.staff.image = req.body.avatar;
  req.staff
    .save()
    .then(() => res.redirect("/register-work"))
    .catch((error) => console.log(error));
};
