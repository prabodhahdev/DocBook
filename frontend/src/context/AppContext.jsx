import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'; 

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [doctors, setDoctors] = useState([]);
    const [token ,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false)
    const [userData,setUserData] =useState(false)


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get('https://docbook-backend-cjvu.onrender.com/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.msg);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || error.message); // ✅ Better error handling
        }
    };

    

    const loadUserProfileData = async() => {
        try {
            const {data} = await axios.get('https://docbook-backend-cjvu.onrender.com/api/user/get-profile',{headers:{token}})
            if (data.success) {
                setUserData(data.userData)
            }else{
                toast.error(data.msg)
            }

        } catch (error) {
            toast.error(error.msg)
        }
    }





    const value = {
        doctors, getDoctorsData,
        setDoctors, 
        currencySymbol,
        token,setToken,
        userData,setUserData,
        loadUserProfileData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(()=>{
        if (token) {
            loadUserProfileData()
            
        } else{
            setUserData(false)
        }

    },[token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
