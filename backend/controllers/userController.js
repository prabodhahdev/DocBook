import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {V2 as cloudinary} from 'cloudinary'

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
    
    const {userId, name , phonr, address, dob , gender} = req.body
    const imageFile = req.imageFile

    if (!name || !phonr || !address  || !dob || !gender) {
        return res.json({success:false,msg:"Data Missing"})
        
    }

    await User.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender})

    if (imageFile) {
        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resourse_type})
        const imageURL = imageUpload.secure_url

        await User.findByIdAndUpdate(userId,{image:imageURL})
    }
    res.json({success:true,msg:"Profile Updated"})

   } catch (error) {
        console.log(error)
        res.json({success:false,msg:error.msg})
   }

}

export {registerUser , loginUser , getProfile , updateProfile}