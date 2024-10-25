import React, { useState } from 'react'

const Login = () => {
    const [state ,setState]=useState('Admin')

    const formSubmit = async (req,res) =>{
        e.preventDefault()
        
    }

  return (
 
      <form 
      action="" 
      onSubmit={formSubmit}
      className='flex  items-center justify-center min-h-[80vh]'
      >
        <div className='flex flex-col  shadow-lg w-[340px] p-6'>
           <h1 className='text-center pb-5 text-xl text-gray-500 font-semibold'><span className='text-primary '>{ state === 'Admin' ? 'Admin' : 'Doctor'}</span> Login</h1> 
           
           <p className='text-sm text-gray-500'>Email</p>
           <input
           type="emai" 
           required  
           className='border rounded-sm w-full my-1 py-1'
           />
           
           
           <p className='text-sm text-gray-500'>Password</p>
           <input 
           type="password" 
           required  
           className='border rounded-sm w-full my-1 py-1'
           />
           <button className='my-3 bg-primary p-2 text-white rounded-lg'>Login</button>
           {
            state === 'Admin' ? 
            <p className='text-sm text-gray-600'> <span>Doctor</span> Login <span onClick={()=>setState('Doctor')} className='text-primary cursor-pointer'> Click here</span></p>
            :
            <p className='text-sm text-gray-600'> <span>Admin</span> Login <span onClick={()=>setState('Admin')} className='text-primary cursor-pointer'>Click here</span></p>
           }
        </div>
      </form>

  )
}

export default Login
