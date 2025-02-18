import validator from 'validator'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

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

export {registerUser , loginUser}