const userModel = require('../Models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerController = async(req, res) => {
    try {

        //search in db if user is already registered
        const existingUser = await userModel.findOne({email: req.body.email})

        if(existingUser){
            return res.status(200).send({message: 'User already registered', success: false})
        }

        //Encrypt and hash our password using bcryptjs
        const password = req.body.password
        //used to hash our password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword

        //save new user to our db
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message: 'Registration successfull!', success: true})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message: `Register Controller ${error.message}`, success: false,})
    }
}

//login callback 
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.body.email})
        if(!user){
            return res.status(200).send({message:'User not found', success: false})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch){
            return res.status(200).send({message: 'Invalid Email or Password', success: false})
        }
        //to create token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn:'1d'})
        res.status(200).send({message: 'Login Successful', success: true, token})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message: `Error in login cntrl ${error.message}`})
    }
}

const authController = async(req, res) => {
    try {

        const user = await userModel.findOne({_id: req.body.userId})
        if(!user){
            return res.status(200).send({
                message: 'User Not Found',
                success: false,
            })
        }
        else{
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

module.exports = {loginController, registerController, authController} 