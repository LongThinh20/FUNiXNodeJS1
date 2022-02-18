exports.postTimeOff = (req, res, next) => {
  // const offTime
  //times of ',' in string offTime
  // let timesDatePicker = offTime.split(",").length - 1 + 1;

  const offTimes = {
    offTime: req.body.offTime,
    reason: req.body.reason,
    offHours: req.body.offHours
  };

  req.staff
    .addOffTime(offTimes)
    .then(() => {
      console.log("POST OFF TIME");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
