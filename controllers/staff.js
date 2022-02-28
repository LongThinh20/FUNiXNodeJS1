const moment = require("moment");
exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;
  res.render("staff/staff-info", {
    path: "/staffInfo",
    pageTitle: "Thông tin nhân viên",
    staffInfo: staffInfo,
    isWork: false,
    moment
  });
};

exports.postUpdateAvatar = (req, res, next) => {
  const imageUrl = req.body.avatar;
  if (!imageUrl) {
    return res.redirect("/staffInfo");
  }
  req.staff.image = imageUrl;
  req.staff
    .save()
    .then(() => res.redirect("/register-work"))
    .catch((error) => console.log(error));
};
