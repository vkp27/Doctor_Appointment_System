const express = require('express')
const { loginController, registerController, authController, applyDoctorController } = require('../Controllers/userCntrl')
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

module.exports = router