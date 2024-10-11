import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10 '>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm'>
      <div className=''>
        <img className='h-8 mb-5' src={assets.logo} alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      </div>
      <div className=''>
        <p className='mb-5 text-gray-700 font-bold'>COMPANY</p>
        <ul className='text-gray-600 flex flex-col gap-2'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div className='text-gray-600 flex flex-col gap-2 '>
        <p className='mb-5 text-gray-700 font-bold'>GET IN TOUCH</p>
        <p >+94705845756</p>
        <p>prabodaharshani94@gmail.com</p>
        
      </div>
      </div>
      <div className='pb-5'>
        <hr />
        <p className='text-center text-xs text-gray-400 pt-2'>Copyright © 2024 GreatStack - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
