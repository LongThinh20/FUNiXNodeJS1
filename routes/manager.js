const express = require("express");

const router = express.Router();

const staffManageController = require("../controllers/manager");

const isAuth = require("../middleware/is-auth");

router.get("/manager", isAuth, staffManageController.getIndex);

router.post(
  "/manager/staffDetail",
  isAuth,
  staffManageController.postStaffDetail
);

router.post(
  "/manager/deleteWorkTime",
  isAuth,
  staffManageController.deleteWorkTime
);

module.exports = router;
