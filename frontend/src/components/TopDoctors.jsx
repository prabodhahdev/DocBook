import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate=useNavigate();
    const {doctors}=useContext(AppContext)
  return (
    <div className='flex flex-col items-center gap-4 my-16'>
      <h1 className='text-3xl font-medium  text-gray-700 '>Top Doctors to Book</h1>
      <p className='text-sm w-1/3 text-gray-600 text-center'>Simply browse through our extensive list of trusted doctors.</p>
      <div className=' w-full grid grid-cols-auto gap-4 pt-5 px-3 gap-y-6 sm:px-0'>
        {doctors.slice(0,10).map((item,index)=>(
            <div  key={index} onClick={()=>navigate(`/appointments/${item._id}`)} className='border border-blue-100 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                <img className='bg-blue-50' src={item.image} alt="" />
                <div className='p-4'>
                    <div className='flex items-center gap-2 '>
                        <p className='w-1.5 h-1.5 rounded-full bg-green-500'></p><p className='text-sm text-green-500'>Available</p>
                    </div>
                    <p className='text-gray-900 font-medium'>{item.name}</p>
                    <p className='text-gray-500 text-sm'>{item.speciality}</p>
                </div>
            </div>  
        ))}
      </div>
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0);}} className='px-5 py-2 rounded mt-10 bg-gray-200'>more...</button>
    </div>
  )
}

export default TopDoctors
