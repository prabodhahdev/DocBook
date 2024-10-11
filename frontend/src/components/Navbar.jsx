import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const [showMenu,setShowMenu]=useState(false);
    const[token,setToken]=useState(true);
    const navigate=useNavigate();

  return (
    <div className='flex items-center justify-between py-3 border-b border-gray-400 mb-5 '>
        <img onClick={()=>navigate('/')} src={assets.logo} alt=""  className='w-44 cursor-pointer'/>
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
        {
            token
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt=""  className='w-8 h-8 rounded-full'/>
                <img src={assets.dropdown_icon} alt=""  className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-14 hidden text-gray-600  text-base z-20 group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer '>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :<div><button onClick={()=>navigate('/login')} className='bg-primary  text-white py-2 px-5 rounded-full font-light md:block'>Create Account</button></div>

        }
       
      
    </div>
  )
}

export default Navbar
