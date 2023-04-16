const express = require('express')
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController} = require('../Controllers/userCntrl')
const authMiddlewares = require('../Middlewares/authMiddlewares')



//router object
const router = express.Router()

//routes
//LOGIN || Post
router.post('/login', loginController)

//register || POST
router.post('/register', registerController)

//Auth || POST
router.post('/getUserData', authMiddlewares, authController)

//Apply-Doctor || POST
router.post('/apply-doctor', authMiddlewares, applyDoctorController)

//Notification Read|| POST
router.post('/get-all-notification', authMiddlewares, getAllNotificationController)

//Notification Delete|| POST
router.post('/delete-all-notification', authMiddlewares, deleteAllNotificationController)

//GET ALL DOCTORS LIST
router.get('/getAllDoctors', authMiddlewares, getAllDoctorController)

//BOOK APPOINTMENT
router.post('/book-appointment', authMiddlewares, bookAppointmentController)

//Booking Availability
router.post('/booking-availability', authMiddlewares, bookingAvailabilityController)

//Appointment List
router.get('/user-appointments', authMiddlewares, userAppointmentsController)

module.exports = router