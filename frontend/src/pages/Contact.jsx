
import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='mb-36'>
    <p className='text-2xl my-16 text-center text-gray-400'>CONTACT <span className='text-gray-600 pl-2 font-semibold'>US</span></p>

    <div className='flex flex-col md:flex-row items-center justify-center gap-12'>
      <img src={assets.contact_image} alt="" className='w-full md:max-w-[360px]' />
      <div className='flex flex-col gap-6 items-start'>
        <p className='text-gray-600 font-bold text-lg'>OUR OFFICE</p>
       <div className='text-gray-500'>
       <p>No 106, Aranayak Road</p>
       <p>Mawanella</p>
       </div>
       <div className='text-gray-500'>
        <p>Tel: +94754569872</p>
        <p>Email:prabodaharshani95@gmail.com</p>
       </div>
       <p className='text-gray-600 font-bold text-lg'>CAREERS AT PRESCRIPTO</p>
       <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa.</p>
       <button className='text-black  py-4 px-8 text-sm border border-black hover:bg-black hover:text-white'>Explore Jobs</button>
      </div>

    </div>
      
    </div>
  )
}

export default Contact
