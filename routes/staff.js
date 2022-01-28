const express = require("express");

const staffController = require("../controllers/staff");

const router = express.Router();

router.get("/", staffController.getIndex);

router.post("/", staffController.postWorkTime);

router.get("/infomation", staffController.getStaffInfo);

router.get("/attendance", staffController.getTest);

router.post("/attendance", staffController.postTest);

router.get("/covid", staffController.getCovid);

router.post("/covid", staffController.postCovidInfo);

router.get("/workTime", (req, res, next) => {
  res.render("staff/workTimeAndSalary");
});

module.exports = router;
