import React, { useState } from 'react'

const Login = () => {
  const [login,setLogin]=useState(false)

  return (
    <div>
      <div className='flex items-center justify-center mt-20 mb-48 text-sm text-gray-500  '>
        <form action="" className='flex flex-col p-10 rounded-3xl gap-3 shadow-sm shadow-gray-500'>
        
        <h1 className='text-gray-600 font-bold text-2xl'>{!login ? 'Create Account': 'Login'}</h1>
        
        <p>Please {!login ? 'sign up': 'login'} to book appointment</p>  
        
        {!login && (
            <>
              <label htmlFor="fullName">Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                id="fullName" 
                className='border border-gray-300 p-2 rounded-s w-[300px]' 
              />
            </>
          )}
        <label htmlFor="">Email</label>
        <input type="email" name="" id="" className='border border-gray-300 p-2 rounded-s w-[300px]' />
        
        <label htmlFor="">Password</label>
        <input type="password" name="" id="" className='border border-gray-300 p-2 rounded-s w-[300px]' />
        
        <button className='bg-primary  py-3 px-5 text-white '>{!login ? 'Create Account': 'Login'}</button>
        <div className='flex gap-2'> 
           <p>{!login ? 'Already have an account?': 'Create an account?'}</p>
           
           <p  
           className='text-primary cursor-pointer underline decoration-primary '
           onClick={()=>setLogin(!login)}
           >
            
            {!login ? 'Login here': 'Sign up here'}
            
          </p>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login
