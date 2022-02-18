exports.getIndex = (req, res, next) => {
  res.render("staff/home", {
    pageTitle: "Home",
    path: "/home",
    isWork: false
  });
};
exports.postStartWorkTime = (req, res, next) => {
  const workTime = {
    workSpace: req.body.workSpace,
    startTime: new Date(),
    endTime: null,
    total: 0,
    overTime: 0
  };

  req.staff
    .addWorkTime(workTime)
    .then(() => {
      res.redirect("/attendance");
      console.log("START WORK TIME!!");
    })
    .catch((err) => console.log(err));
};
