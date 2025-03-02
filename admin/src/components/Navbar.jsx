import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import {DoctorContext} from '../context/DoctorContext'


const Navbar = () => {
    const {aToken, setAtoken } =useContext(AdminContext)
    const {dToken ,setDtoken} = useContext(DoctorContext)

    const navigate= useNavigate()

    const logout=()=>{
      navigate('/')
      aToken &&  setAtoken ('')
      aToken && localStorage.removeItem('aToken')
      dToken && setDtoken('')
      dToken && localStorage.removeItem('dToken')
    }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border bg-white'>
      <div className='flex items-center gap-4 text-xs'>
        <img className='w-44 cursor-pointer' src={assets.MyLogo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500'>{aToken ? 'Admin' :'Doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar
