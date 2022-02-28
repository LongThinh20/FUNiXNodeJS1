const moment = require("moment");
const fs = require("fs");
const { log } = require("console");

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
  const image = req.file;

  if (!image) {
    return res.redirect("/staffInfo");
  }

  const imageUrl = image.path;

  req.staff.image = imageUrl;

  req.staff
    .save()
    .then(() => res.redirect("/registerWork"))
    .catch((error) => console.log(error));
};
