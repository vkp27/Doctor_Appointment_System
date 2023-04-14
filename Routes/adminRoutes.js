const express = require('express')
const { getAllUsersController, getAllDoctorsController, changeAccountStatusController } = require('../Controllers/adminCntrl')
const authMiddlewares = require('../Middlewares/authMiddlewares')

const router = express.Router()

//GET METHOD || USERS
router.get('/getAllUsers', authMiddlewares, getAllUsersController)

//GET METHOD || DOCTORS
router.get('/getAllDoctors', authMiddlewares, getAllDoctorsController)

//POST ACCOUNT STATUS
router.post('/changeAccountStatus', authMiddlewares, changeAccountStatusController)

module.exports = router