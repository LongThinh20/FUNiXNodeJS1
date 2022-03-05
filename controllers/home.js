//GET /
exports.getIndex = (req, res, next) => {
  res.render("staff/home", {
    pageTitle: "TRANG CHỦ",
    path: "/home",
    isWork: false
  });
};
