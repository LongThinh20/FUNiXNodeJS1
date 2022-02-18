exports.getCovid = (req, res, next) => {
  res.render("staff/covid-info", {
    pageTitle: "Resister Covid Infomation"
  });
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
        pageTitle: "Resister Covid Infomation"
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
        pageTitle: "Resister Covid Infomation"
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
        pageTitle: "Resister Covid Infomation"
      });
    })
    .catch((err) => console.log(err));
};
