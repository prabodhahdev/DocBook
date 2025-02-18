import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
    const {token,setToken} =useContext(AppContext)
    const [showMenu,setShowMenu]=useState(true);
    const navigate=useNavigate();

    const logout = () =>{
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between py-3 border-b border-gray-400 mb-5 '>
        <img onClick={()=>navigate('/')} src={assets.MyLogo} alt=""  className='w-44 cursor-pointer'/>
        <ul className=' hidden items-start md:flex gap-5 font-medium'>
            <NavLink to='/' >
                <li className='py-1'>HOME</li>
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
       <div className='flex gap-4 items-center'>
       {
            token
            ?<div className='flex items-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt=""  className='w-8 h-8 rounded-full'/>
                <img src={assets.dropdown_icon} alt=""  className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-14 hidden text-gray-600  text-base z-20 group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                        <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer '>My Profile</p>
                        <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                        <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :<div><button onClick={()=>navigate('/login')} className='bg-primary  text-white py-2 px-5 rounded-full font-light md:block text-sm'>Create Account</button></div>

        }
        <img onClick={()=>setShowMenu(true)} className='block md:hidden w-6' src={assets.menu_icon} alt="" />
        {/*------   Mobile Menu       -----*/}
        <div className={`${showMenu ? 'fixed w-full': 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-8'>
                <img className='h-10' src={assets.MyLogo} alt="" />
                <img className='w-10' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
            </div>
            <ul className='flex flex-col px-5 py-5 gap-8'>
               <NavLink onClick={()=>setShowMenu(false)} to='/'><p>HOME</p></NavLink>
               <NavLink onClick={()=>setShowMenu(false)} to='/doctors'><p>ALL DOCTORS</p></NavLink>
               <NavLink onClick={()=>setShowMenu(false)} to='/about'><p>ABOUT</p></NavLink>
               <NavLink onClick={()=>setShowMenu(false)} to='/contact'><p>CONTACT</p></NavLink>
            </ul>
        </div>
       </div>
       
    </div>
  )
}

export default Navbar
