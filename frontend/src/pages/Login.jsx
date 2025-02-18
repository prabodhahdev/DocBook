import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { token, setToken } = useContext(AppContext)
  const [login, setLogin] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      let data;
      if (!login) {
        // Register
        data = await axios.post('http://localhost:8000/api/user/register', { name, email, password })
      } else {
        // Login
        data = await axios.post('http://localhost:8000/api/user/login', { email, password })
      }

      if (data.data.success) {
        localStorage.setItem('token', data.data.token)
        setToken(data.data.token)
        toast.success(`Successfully ${login ? 'logged in' : 'registered'}`)
      } else {
        toast.error(data.data.msg)
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className='flex items-center justify-center mt-20 mb-48 text-sm text-gray-500'>
      <form onSubmit={onSubmitHandler} className='flex flex-col p-10 rounded-3xl gap-3 shadow-sm shadow-gray-500'>
        
        <h1 className='text-gray-600 font-bold text-2xl'>{login ? 'Login' : 'Create Account'}</h1>
        
        <p>Please {login ? 'login' : 'sign up'} to book an appointment</p>  
        
        {!login && (
          <>
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              id="fullName" 
              className='border border-gray-300 p-2 rounded w-[300px]'
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </>
        )}
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          className='border border-gray-300 p-2 rounded w-[300px]'
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          id="password" 
          className='border border-gray-300 p-2 rounded w-[300px]'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type='submit' className='bg-primary py-3 px-5 text-white'>
          {login ? 'Login' : 'Create Account'}
        </button>
        
        <div className='flex gap-2'> 
          <p>{login ? 'Create an account?' : 'Already have an account?'}</p>
          <p  
            className='text-primary cursor-pointer underline'
            onClick={() => setLogin(!login)}
          >
            {login ? 'Sign up here' : 'Login here'}
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
