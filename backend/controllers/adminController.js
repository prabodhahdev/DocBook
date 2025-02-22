import validator from "validator";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import Doctor from '../models/doctorModel.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const addDoctor = async (req,res)=>{
    try {
        const {name, email,password,speciality,degree,experience,about,fees,address}= req.body;
        const image=req.file;

        //Checking all details 
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,msg:"Missing Details"})
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({success:false,msg:"Enter a valid email address"})

        }

        //validating strong password
        if (password.length<8) {
            return res.json({success:false,msg:"Enter a strong password"})
  
        }
        // hashing doctor password
        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //Upload image to cloudinary
        const imageUpload =await cloudinary.uploader.upload(image.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const docterData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            about,
            experience,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new Doctor(docterData)
        await newDoctor.save()

        res.json({success:true,msg:"Docter Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//Admin Login
const AdminLogin = async (req,res) =>{
    try {
        const {email, password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,msg:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}


//get all doctors
const allDoctors = async (req,res) =>{
    try {
        const doctors = await Doctor.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//API to get all appointments lists

const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//API for appointment cancel

const cancelAppointments = async (req,res) => {
    try {

        const { appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

       

        await appointmentModel.findByIdAndUpdate(appointmentId,{canceled:true})

        //releasing the doctor slot

        const {docId,slotDate,slotTime} = appointmentData

        const docData = await Doctor.findById(docId)

        let booked_slots = docData.booked_slots

        booked_slots[slotDate] = booked_slots[slotDate].filter(e => e !== slotTime)

        await Doctor.findByIdAndUpdate(docId,{booked_slots})
        
        res.json({success:true, msg:"Appointment is cancelled"})
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

//API to get Dashboard Data for admin panel

const adminDashboard = async (req,res) => {
    try {
        const doctors = await Doctor.find({})
        const users = await User.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors:doctors.length,
            appointments:appointments.length,
            patients:users.length,
            latestAppointments:appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        
    }
}

export {
    addDoctor , 
    AdminLogin , 
    allDoctors , 
    appointmentsAdmin ,
    cancelAppointments , 
    adminDashboard
    
    }