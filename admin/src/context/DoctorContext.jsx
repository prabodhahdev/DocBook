import { useState } from "react";
import { createContext } from "react";

export const  DoctorContext = createContext();

const DoctorContextProvider = (props) =>{

    const [dToken , setDtoken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    const value = {
        dToken,
        setDtoken
    }

   
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider
