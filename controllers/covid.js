const Staff = require("../models/staff");

exports.getCovid = (req, res, next) => {
  Staff.find({ role: "staff" })
    .then((staffs) => {
      res.render("staff/covid-info", {
        path: "/covid",
        pageTitle: "Đăng kí thông tin Covid",
        isWork: false,
        role: req.staff.role,
        staffs
      });

      staffs.forEach((staff) => {
        console.log(staff.covidInfo.temperatureInfo[0].temperature);
      });
    })
    .catch((err) => console.log(err));
};

exports.postVaccineInfo = (req, res, next) => {
  const { nameVaccine1, nameVaccine2, dateVaccine1, dateVaccine2 } = req.body;
  const vaccine1 = {
    name: nameVaccine1,
    date: dateVaccine1
  };
  const vaccine2 = {
    name: nameVaccine2,
    date: dateVaccine2
  };
  req.staff
    .updateVaccineInfo(vaccine1, vaccine2)
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.log(err));
};

exports.postInfectedInfo = (req, res, next) => {
  const { infectedDate, cureDate } = req.body;
  req.staff.covidInfo.infectedInfo = {
    infectedDate: infectedDate,
    cureDate: cureDate
  };
  req.staff
    .save()
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin Covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.log(err));
};

exports.postTemperatureInfo = (req, res, next) => {
  const { temperature, timeTemperature } = req.body;
  req.staff.covidInfo.temperatureInfo = {
    temperature: temperature,
    time: timeTemperature
  };
  req.staff
    .save()
    .then(() => {
      res.render("staff/covid-info", {
        pageTitle: "Đăng kí thông tin Covid",
        path: "/covid",
        isWork: false,
        role: req.staff.role
      });
    })
    .catch((err) => console.log(err));
};
