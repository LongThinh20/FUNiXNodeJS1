const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("staff/attendance");
});

router.get("/infomation", (req, res, next) => {
  res.render("staff/staff-info");
});
router.get("/covid", (req, res, next) => {
  res.render("staff/covid-info");
});

router.get("/workTime", (req, res, next) => {
  res.render("staff/workTimeAndSalary");
});

module.exports = router;
