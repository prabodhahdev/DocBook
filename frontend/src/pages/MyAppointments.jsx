import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

const MyAppointments = () => {
  const {doctors}= useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-12 text-gray-500 text-xl font-bold border-b'>My Appointments</p>
      <div className=''>
        {doctors.map((item,index)=>(
          <div key={index} className='grid gap-4 grid-cols-[1fr_2fr] sm:flex sm:gap-6  border-b items-end p-2'>
            <div>
            <img className='w-32 bg-indigo-50' src={item.image} alt="" />
            </div>            
            <div className='flex-1 text-zinc-500 text-sm'>
              <p className='text-zinc-700 text-lg font-bold'>{item.name}</p>
              <p>{item.speciality}</p>
              <p className='pt-2 text-zinc-500 font-bold'>Address:</p>
              <p>{item.address.line1}</p>
              <p>{item.address.line2}</p>
              <p className='pt-2'><span className=' text-zinc-500 font-bold'>Date & Time:</span>  25, July, 2024 |  8:30 PM</p>
            </div>
            <div></div>
            <div className='flex flex-col gap-3 justify-end' >
              <button className=' text-black border border-gray  text-sm py-2 sm:min-w-[48px] hover:bg-primary hover:text-white'>Pay Online</button>
              <button className=' text-black border border-gray text-sm py-2 px-10 hover:bg-red-600 hover:text-white'>Cansle Appointment</button>
            </div>
          </div>
        ))}

      </div>
      
    </div>
  )
}

export default MyAppointments
