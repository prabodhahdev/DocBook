import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    speciality:{
        type:String,
        required:true
    },
    degree:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true 
    },
    about:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    },
    fees:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    booked_slots:{
        type:Object,
        default:{}
    }


},{minimize:false}) // to store empty object in any data (if we add true we cannot create empty object)

const Doctor=mongoose.model('Doctor',doctorSchema);
module.exports=Doctor