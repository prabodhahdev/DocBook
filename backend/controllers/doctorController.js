import Doctor from "../models/doctorModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentsModel from '../models/appointmentModel.js'

const changeAvailability = async (req,res) =>{
    try {

        const {docId} = req.body
        const docData =await Doctor.findById(docId)
        await Doctor.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,msg:'Availability is Changed'})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//get all doctors list for frontend

const doctorList = async (req,res) =>{
    try {
        const doctors = await Doctor.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}


//API for login doctor
const loginDoctor = async (req,res) => {
    try {
        const {email,password} = req.body
        const doctor = await Doctor.findOne({email})
        if (!doctor) {
            return res.json({success:false,msg:"Invalid Credentials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,msg:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
    
}


//API to get doctor appointments

const appointmentsDoctor = async (req,res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentsModel.find({docId })

        res.json({success:true,appointments})

        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
    
}

//API to mark appointment completed for doctor panel

const appointmentComplete = async (req,res) => {
    try {
        const {docId , appointmentId} = req.body

        const appointmentData =  await appointmentsModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentsModel.findByIdAndUpdate(appointmentId,{isCompleted:true})
            return res.json({success:true,msg:"Appointment Completed"})
        }
        else{
            return res.json({success:false,msg:"Mark Failed"})

        }
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}


//API to cancel appointment for doctor panel

const appointmentCancel = async (req,res) => {
    try {
        const {docId , appointmentId} = req.body

        const appointmentData = await appointmentsModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentsModel.findByIdAndUpdate(appointmentId,{canceled:true})
            return res.json({success:true,msg:"Appointment Canceled"})
        }
        else{
            return res.json({success:false,msg:"Cancelation Failed"})

        }
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}


export {changeAvailability, doctorList ,loginDoctor , appointmentsDoctor ,appointmentCancel ,appointmentComplete}