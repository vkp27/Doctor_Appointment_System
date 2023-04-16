const express = require("express");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentsController,
  updateStatusController,
} = require('../Controllers/doctorCntrl');

const authMiddlewares = require('../Middlewares/authMiddlewares');
const router = express.Router();

//POST SINGLE DOC INFO
router.post("/getDoctorInfo", authMiddlewares, getDoctorInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddlewares, updateProfileController);

//POST GET SINGLE DOC INFO
router.post('/getDoctorById', authMiddlewares, getDoctorByIdController)

//Get Appointments
router.get('/doctor-appointments', authMiddlewares, doctorAppointmentsController)

//Update approve reject status
router.post('/update-status', authMiddlewares, updateStatusController)

module.exports = router;