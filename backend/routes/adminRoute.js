import express from 'express'
import { addDoctor , AdminLogin , allDoctors ,appointmentsAdmin ,cancelAppointments ,adminDashboard} from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controllers/doctorController.js'

const adminRouter=express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',AdminLogin)
adminRouter.get('/alldoctors',authAdmin, allDoctors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/get-adminappointments',authAdmin,appointmentsAdmin)
adminRouter.post('/cancel-appointment',authAdmin,cancelAppointments)
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter