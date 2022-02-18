exports.getStaffInfo = (req, res, next) => {
  const staffInfo = req.staff;

  res.render("staff/staff-info", {
    pageTitle: "Staff Information",
    staffInfo: staffInfo
  });
};

exports.postUpdateAvatar = (req, res, next) => {
  req.staff.image = req.body.avatar;
  req.staff
    .save()
    .then(() => res.redirect("/"))
    .catch((error) => console.log(error));
};
