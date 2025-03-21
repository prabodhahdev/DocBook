import express, { Router } from 'express'
import { registerUser , loginUser, getProfile,appointmentList, updateProfile ,bookAppointment, cancelAppointments } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/get-profile', authUser ,getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment',authUser , bookAppointment)
userRouter.get('/appointment-lists',authUser, appointmentList)
userRouter.post('/cancel-appointment',authUser, cancelAppointments)
export default userRouter