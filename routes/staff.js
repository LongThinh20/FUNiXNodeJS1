const express = require("express");

const staffController = require("../controllers/staff");
const attendanceController = require("../controllers/attendance");
const covidController = require("../controllers/covid");
const workTimeAndSalaryController = require("../controllers/workTimeAndSalary");
const OffTimeController = require("../controllers/offTime");
const HomeController = require("../controllers/home");

const router = express.Router();

router.get("/", HomeController.getIndex);

router.get("/register-work", attendanceController.getWorkTimesList);

router.post("/register-work ", attendanceController.postStartWorkTime);

router.get("/attendance", attendanceController.getStartWorkTime);

router.post("/attendance", attendanceController.postEndWorkTime);

router.post("/time-off", OffTimeController.postTimeOff);

router.get("/workTime", workTimeAndSalaryController.getWorkTimeAndSalary);

router.post("/workTime", workTimeAndSalaryController.postSalaryToMonth);

router.get("/covid", covidController.getCovid);

router.post("/infected", covidController.postInfectedInfo);

router.post("/vaccine", covidController.postVaccineInfo);

router.post("/temperature", covidController.postTemperatureInfo);

router.get("/staffInfo", staffController.getStaffInfo);

router.post("/staffInfo", staffController.postUpdateAvatar);

module.exports = router;
