const { render } = require("express/lib/response");

exports.getIndex = (req, res, next) => {
  res.render("staff/home", {
    pageTitle: "Home",
    path: "/home",
    isWork: false
  });
};
