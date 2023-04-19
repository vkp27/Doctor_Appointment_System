const userModel = require('../Models/userModels')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const doctorModel = require('../Models/doctorModel')
const appointmentModel = require('../Models/appointmentModel')
const moment = require('moment')

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

//Notification Controller
const getAllNotificationController = async (req, res) => {
    try {
        
        const user = await userModel.findOne({_id: req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: 'All notifications marked as read',
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.satus(500).send({
            message: 'Error in notification',
            success: false,
            error
        })
    }
}

//delete notification
const deleteAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id: req.body.userId})
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: 'Notification Deleted Successfully',
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Unable to delete all notifications',
            error
        })
    }
}

//get all doctors
const getAllDoctorController = async(req, res) => {
    try {
        const doctors = await doctorModel.find({status: "approved"})
        res.status(200).send({
            success: true,
            message: 'Doctors Lists Fetched Successfully',
            data: doctors
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while fetching doctor'
        })
    }
}

//Book appointment
const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type: 'New-Appointment-Request',
            message: `A new appointment request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success: true,
            message: "Appointment Booked Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error while booking appointment'
        })
    }
}

//checking availability
const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        const fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte:fromTime, $lte:toTime
            }
        })
        if(appointments.length > 0){
            return res.status(200).send({
                message: 'Appointment not available at this time',
                success: true
            })
        }
        else{
            return res.status(200).send({
                success: true,
                message: 'Appointment available!'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in booking'
        })
    }
}

//Appointment List
const userAppointmentsController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: 'Users appointments fetched successfully!',
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in user appointments'
        })
    }
}

module.exports = {loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, getAllDoctorController, bookAppointmentController, bookingAvailabilityController, userAppointmentsController} 