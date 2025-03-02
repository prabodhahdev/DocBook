import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorDashboard = () => {

  const {dToken,getDashData, setDashData, dashData} = useContext(DoctorContext)

  useEffect(()=>{
    if (dToken) {
      getDashData()
    }
  },[dToken])

  return dashData && (
    <div>
      
    </div>
  )
}

export default DoctorDashboard
