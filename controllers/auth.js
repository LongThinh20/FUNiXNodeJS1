const Staff = require("../models/staff");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Đăng nhập",
    isWork: false,
    errorMessage: null
  });
};

exports.postLogin = (req, res, next) => {
  const user = req.body.user;
  const password = req.body.password;

  Staff.findOne({ user: user })
    .then((staff) => {
      if (!staff) {
        return res.render("auth/login", {
          path: "/login",
          pageTitle: "Login",
          pageTitle: "Đăng nhập",
          isWork: false,
          errorMessage: "Tên đăng nhập hoặc mật khẩu sai"
        });
      }

      req.session.staff = staff;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        return res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};
