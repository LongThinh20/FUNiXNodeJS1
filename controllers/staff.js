const moment = require("moment");

//GET /staffInfo
exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;
  res.render("staff/staff-info", {
    path: "/staffInfo",
    pageTitle: "THÔNG TIN NHÂN VIÊN",
    staffInfo: staffInfo,
    isWork: false,
    moment
  });
};

//POST /staffInfo
exports.postUpdateAvatar = (req, res, next) => {
  req.staff.image = req.body.image;
  req.staff
    .save()
    .then(() => res.redirect("/registerWork"))
    .catch((error) => console.error(error));
};
