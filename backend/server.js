import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'

//app config
const app=express()
const port=process.env.PORT || 8000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json()) // when we pass the request it will send as a json format
app.use(cors()) // this allows connect frontend to backend


//api end point
app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)

//start express
app.listen(port,()=>{
    console.log("App is running on port",port)
})