import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const  DoctorContext = createContext();

const DoctorContextProvider = (props) =>{

    const [dToken , setDtoken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [appointments , setAppointments] = useState([])

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


    const value = {
        dToken,
        setDtoken,
        appointments,
        setAppointments,
        getAppointments
    }

   
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
