import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify'; // ✅ Correct import

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [doctors, setDoctors] = useState([]);
    const [token ,setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token') : false)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/api/doctor/list');
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

    useEffect(() => {
        getDoctorsData();
    }, []);

    const value = {
        doctors,
        setDoctors, // ✅ Now other components can update doctors
        currencySymbol,
        token,setToken
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
