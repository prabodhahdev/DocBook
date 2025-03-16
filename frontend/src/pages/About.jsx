
import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className=' '>
      <p className='text-2xl my-16 text-center text-gray-400'>ABOUT <span className='text-gray-600 pl-2 font-semibold'>US</span></p>
      <div className='flex flex-col md:flex-row items-center gap-12'>
       <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className=' text-gray-500 text-m flex flex-col gap-8 md:w-2/4'> 
          <p>Welcome to DocBook, your trusted partner in managing your healthcare needs conveniently and efficiently. At DockBook, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p>DocBook is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
          <p className='text-gray-900 font-bold'>Our Vision</p>
          <p>Our vision at DocBook is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
        </div>
      </div>
      <div>
      <p className='text-2xl my-16 text-left text-gray-600'>WHY <span className='text-gray-400 pl-2 font-semibold'>CHOOSE US</span></p>
      <div className='flex flex-col sm:flex-row mb-36'>
        <div className='border border-gray-300 p-16 cursor-pointer hover:bg-primary group'>
          <p className='text-gray-700 font-bold text-l group-hover:text-white'>EFFICIENCY:</p>
          <p className='pt-3 text-gray-500 group-hover:text-white'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border border-gray-300 p-16 cursor-pointer hover:bg-primary group'>
          <p className='text-gray-700 font-bold text-l group-hover:text-white'>CONVENIENCE:</p>
          <p className='pt-3 text-gray-500 group-hover:text-white'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border border-gray-300 p-16 cursor-pointer hover:bg-primary group'>
          <p className='text-gray-700 font-bold text-l group-hover:text-white'>PERSONALIZATION:</p>
          <p className='pt-3 text-gray-500 group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default About
