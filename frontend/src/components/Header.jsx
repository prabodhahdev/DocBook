import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col flex-wrap md:flex-row bg-primary  px-12 rounded-xl md:px-10 lg:px-20'>
      {/*----Left Side------*/}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]' >
        <p className='text-3xl text-stone-100 font-medium lg:text-5xl md:text-4xl'>Book Appointment <br/> With Trusted Doctors</p>
        <div className='flex flex-col md:flex-row items-center gap-5 py-4'>
            <img src={assets.group_profiles} alt=""  className='w-28'/>
            <p className='text-stone-100'>Simply browse through our extensive list of trusted doctors, <br  className='hid
             sm:block'/>
            schedule your appointment hassle-free.</p>
        </div>
       <div>
       <a href="#speciality" className='flex items-center py-3 px-8 rounded-full  bg-stone-100  gap-3 text-gray-600 md:m-auto hover:scale-105 transition-all duration-300'>
            Book Appointmemt <img className='w-3' src={assets.arrow_icon} alt="" />
         </a>
       </div>
      </div>




      {/*------Right Side--------- */}
      <div className='md:w-1/2 relative'>
        <img src={assets.header_img} alt="" className='w-full md:absolute bottom-0 h-auto rounded-xl' />
      </div>
    </div>
  )
}

export default Header
