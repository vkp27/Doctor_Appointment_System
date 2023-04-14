const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
} = require('../Controllers/doctorCntrl');

const authMiddlewares = require('../Middlewares/authMiddlewares');
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddlewares, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddlewares, updateProfileController);

module.exports = router;