import validator from 'validator'
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'
import Doctor from '../models/doctorModel.js'
import AppointmentModel from '../models/appointmentModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import razorpay from 'razorpay'

// API for registering user

const registerUser = async (req, res) => {
    try {
        
        const {name,email,password} = await req.body

        if(!name || !email || !password){

            return res.json({success:false,msg:"Missing Details"})
        }
        //validating email format
        if(!validator.isEmail(email)){

            return res.json({success:false,msg:"Enter a valid email"})
  
        }
        //validating strong password
        if (password.length<8) {
            return res.json({success:false,msg:"Enter a strong password"})
     
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // saving hash password to the db
        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new User(userData)
        const user = await newUser.save()


        //creating the token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({success:true,token})



    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})

        
    }
}


// API for user login

const loginUser = async (req,res) =>{
    try {

        const {email,password} = req.body
        const user = await User.findOne({email})

        if(!user){
           return res.json({success:false,msg:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        }else{
            res.json({success:false,msg:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})

    }
}


// API to get user profile data
const getProfile  = async (req,res) =>{
    try {

        const {userId } =req.body
        const userData = await User.findById(userId).select('-password')
        
        res.json({success:true,userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

// Update user profile

const updateProfile = async (req,res) =>{
   try {
    
    const {userId, name , phone, address, dob , gender} = req.body
    const imageFile = req.file

    if (!name || !phone || !address  || !dob || !gender) {
        return res.json({success:false,msg:"Data Missing"})
        
    }

    await User.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if (imageFile) {
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{ resource_type: 'image' })
        const imageURL = imageUpload.secure_url

        await User.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true,msg:"Profile Updated"})

   } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
   }

}

// API to book appointment

const bookAppointment = async (req ,res) =>{
    try {

        const  {userId , docId , slotDate , slotTime} = req.body

        const docData = await Doctor.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({success:false,msg:"Doctor is not Available"})
        }

        let booked_slots = docData.booked_slots

        // checking for slot availability
        if(booked_slots[slotDate]){
            if (booked_slots[slotDate].includes(slotTime)) {
                return res.json({success:false,msg:"Slot is not Available"})
            } else{
                booked_slots[slotDate].push(slotTime)
            }
        }else {
            booked_slots[slotDate] = []
            booked_slots[slotDate].push(slotTime)
        }

        const userData = await User.findById(userId).select('-password')

        delete docData.booked_slots

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            slotTime,
            slotDate,
            date: Date.now()

        }

        const newAppointment = new AppointmentModel(appointmentData)

        await newAppointment.save()
        
        //save newslots data in doctors data

        await Doctor.findByIdAndUpdate(docId,{booked_slots})

        res.json({success:true,msg:"Appointment is Booked"})

    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
} 


// API to get appointmnet
const appointmentList = async (req,res) =>{
    try {

       const {userId}= req.body
       const appointment = await AppointmentModel.find({userId})

       res.json({success:true,appointment})


    } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
    }
}

// cancel the appointments by user

const cancelAppointments = async (req,res) => {
    try {

        const {userId , appointmentId} = req.body

        const appointmentData = await AppointmentModel.findById(appointmentId)

        // verify appointment user
        if (appointmentData.userId !== userId) {
            return res.json({success:false,msg:"Unauthorized Access"})
        }

        await AppointmentModel.findByIdAndUpdate(appointmentId,{canceled:true})

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




export {registerUser , loginUser , getProfile , updateProfile ,bookAppointment ,appointmentList ,cancelAppointments }