import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const  DoctorContext = createContext();

const DoctorContextProvider = (props) =>{

    const [dToken , setDtoken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments , setAppointments] = useState([])
    const [dashData , setDashData] = useState(false)

    const getAppointments = async () =>{
        try {

            const {data} = await axios.get('http://localhost:8000/api/doctor/appointments',{headers:{dToken}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }else{
                toast.error(data.msg)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.msg)
            
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post('http://localhost:8000/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.msg)
                getAppointments()
                
            }else{
                toast.error(data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.msg)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post('http://localhost:8000/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
            if (data.success) {
                toast.success(data.msg)
                getAppointments()
                
            }else{
                toast.error(data.msg)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.msg)
        }
    }


    const getDashData = async () => {
        try {
            const {data} = await axios.get('http://localhost:8000/api/doctor/dashboard',{headers:{dToken}})
            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }else{
                toast.error(data.msg)
            }


        } catch (error) {
            console.log(error);
            toast.error(error.msg) 
        }
    }

    const value = {
        dToken,
        setDtoken,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        setDashData,
        dashData

    }

   
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
