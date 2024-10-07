import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const Specialitymenu = () => {
  return (
    <div id='speciality' className='py-14 flex flex-col items-center gap-5'>
      <h1 className='text-3xl font-medium  text-gray-700 '>Find by Speciality</h1>
      <p className='text-sm w-1/3 text-gray-600 text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
     <div className='flex gap-5 sm:justify-center w-full overflow-scroll '>
      
     {specialityData.map((item,index)=> 
            <Link onClick={()=>scrollTo(0,0)} className='cursor-pointer items-center pt-5 flex flex-col flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
            <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
            <p className='text-center text-gray-600 text-sm'>{item.speciality}</p>
            </Link>      
     )}
       
     </div>
    </div>
  )
}

export default Specialitymenu
