import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate=useNavigate();

  return (
    <div className='flex items-center justify-between py-3 border-b border-gray-400 mb-5 '>
        <img src={assets.logo} alt=""  className='w-44 cursor-pointer'/>
        <ul className=' hidden items-start md:flex gap-5 font-medium'>
            <NavLink to='/' >
                <li py-1>HOME</li>
                <hr className='border-none outline-none bg-primary m-auto w-3/5 h-0.5 hidden'/>
            </NavLink>
            <NavLink  to='/doctors' >
                <li py-1>ALL DOCTORS</li>
                <hr className='border-none outline-none bg-primary m-auto w-3/5 h-0.5 hidden'/>
            </NavLink>
            < NavLink  to='/about'>
                <li py-1>ABOUT</li>
                <hr className='border-none outline-none bg-primary m-auto w-3/5 h-0.5 hidden'/>
            </NavLink>
            <NavLink  to='/contact'>
                <li py-1>CONTACT</li>
                <hr className='border-none outline-none bg-primary m-auto w-3/5 h-0.5 hidden'/>
            </NavLink>
        </ul>
        <div><button onClick={()=>navigate('/login')} className='bg-primary  text-white py-2 px-5 rounded-full font-light md:block'>Create Account</button></div>
       
      
    </div>
  )
}

export default Navbar
