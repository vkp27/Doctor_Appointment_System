const userModel = require('../Models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../Models/doctorModel')

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

        const user = await userModel.findById({_id: req.body.userId})
        user.password = undefined
        if(!user){
            return res.status(200).send({
                message: 'User Not Found',
                success: false,
            })
        }
        else{
            res.status(200).send({
                success: true,
                data: user
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

//Apply Doctor Controller
const applyDoctorController = async(req, res) => {
    try {
        
        const newDoctor = await doctorModel({...req.body, status: 'pending'})
        await newDoctor.save()
        const adminUser = await userModel.findOne({isAdmin: true})
        const notification = adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a doctor account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({
            success: true,
            message: 'Doctor Account Applied Successfully!'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while applying for doctor'
        })   
    }
}
module.exports = {loginController, registerController, authController, applyDoctorController} 