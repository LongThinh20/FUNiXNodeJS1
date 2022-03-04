//POST /time-off

exports.postTimeOff = (req, res, next) => {
  const offTimes = {
    offTime: req.body.offTime,
    reason: req.body.reason,
    offHours: req.body.offHours
  };
  req.staff
    .addOffTime(offTimes)
    .then(() => {
      console.log("POST OFF TIME");
      res.redirect("/registerWork");
    })
    .catch((err) => console.log(err));
};
