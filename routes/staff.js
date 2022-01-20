const express = require("express");

const staffController = require("../controllers/staff");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("staff/attendance");
});

router.get("/infomation", staffController.getStaffInfo);
router.get("/covid", (req, res, next) => {
  res.render("staff/covid-info");
});

router.get("/workTime", (req, res, next) => {
  res.render("staff/workTimeAndSalary");
});

module.exports = router;
