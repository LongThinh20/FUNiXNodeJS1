const moment = require("moment");
const fs = require("fs");
const deleteFile = require("../utils/file");

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
  deleteFile(req.staff.image);
  const imageUrl = image.path;
  req.staff.image = imageUrl;
  req.staff
    .save()
    .then(() => res.redirect("/registerWork"))
    .catch((error) => console.log(error));
};
