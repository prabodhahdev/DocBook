import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext();


const AdminContextProvider = (props) =>{
    const [aToken , setAtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors] = useState([])

    const getAllDoctors = async () =>{
        try {
            
            const {data} = await axios.get('http://localhost:8000/api/admin/alldoctors',{headers:{aToken}})
            
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

    const value ={
        aToken,
        setAtoken ,
        doctors,
        getAllDoctors
    }

    
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider
