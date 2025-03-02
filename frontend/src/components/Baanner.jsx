import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import Banner from '../assets/b.png'


const Baanner = () => {
    const navigate= useNavigate();
  return (
    <div className='flex bg-primary px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 rounded-xl'>
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <p className='text-white font-bold text-3xl leading-normal'>Book Appointment <br />
        With 100+ Trusted Doctors</p>
        <button onClick={()=>{navigate('/login');scrollTo(0,0);}} className='mt-5 py-2 px-6 bg-white rounded-full text-sm  text-gray-700 hover:scale-105 transition-all'>Create Account</button>
      </div>
      <div className='hidden md:block  md:w-1/2 relative lg:w-[650px] '><img className='w-full absolute bottom-5 right-0 max-w-md' src={Banner} alt="" /></div>
    </div>
  )
}

export default Baanner
