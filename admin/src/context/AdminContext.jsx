import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext();


const AdminContextProvider = (props) =>{
    const [aToken , setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors] = useState([])
    const [appointments,setAppointments] = useState([])
    const [dashData,setDashData]=useState(false)

    const getAllDoctors = async () =>{
        try {
            
            const {data} = await axios.get('https://docbook-backend-cjvu.onrender.com/api/admin/alldoctors',{headers:{aToken}})
            
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.msg)
            }

        } catch (error) {
            toast.error(error.msg)
        }
    }

    const changeAvailability = async (docId) =>{
        try {
            const {data} = await axios.post('https://docbook-backend-cjvu.onrender.com/api/admin/change-availability',{docId},{headers:{aToken}})
            
            if(data.success){
                toast.success(data.msg)
                getAllDoctors()

            }else{
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error(error.msg)
        }
    }

    const getAllAppointments = async () => {
        try {
            
            const { data } = await axios.get('https://docbook-backend-cjvu.onrender.com/api/admin/get-adminappointments',{headers:{aToken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            }else{
                toast.error(data.msg)
            }
        } catch (error) {
            toast.error(error.msg)
        }
    }

    const cancelAppointments = async (appointmentId ) => {
        try {
            
            const { data } = await axios.post('https://docbook-backend-cjvu.onrender.com/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
            if(data.success){
                toast.success(data.msg)
                getAllAppointments()
                
            }else{
                toast.error(data.msg)
            }

        } catch (error) {
            toast.error(error.msg)
  
        }
    }


    // get dashboard data

    const getDashData = async () => {
        try {

            const { data } = await axios.get('https://docbook-backend-cjvu.onrender.com/api/admin/dashboard',{headers:{aToken}})
            
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
                    
            }else{
                toast.error(data.msg)
            }
            
        } catch (error) {
            toast.error(error.msg)
 
        }
    }
    const value ={
        aToken,
        setAtoken ,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointments,
        getDashData,
        dashData
    }

    
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
