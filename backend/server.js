import express from 'express'
import cors from 'cors'
import 'dotenv/config'

//app config
const app=express()
const port=process.env.PORT || 8000

//middlewares
app.use(express.json()) // when we pass the request it will send as a json format
app.use(cors()) // this allows connect frontend to backend

//api end point
app.get('/',(req,res)=>{
    res.send("API WORKING")
    
})

//start express
app.listen(port,()=>{
    console.log("App is running on port",port)
})