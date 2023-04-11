const express = require('express')
const { loginController, registerController, authController } = require('../Controllers/userCntrl')
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

module.exports = router