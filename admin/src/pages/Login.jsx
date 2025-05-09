/*
import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state ,setState]=useState('Admin')
    const [email,setEmail] = useState('')
    const [password,setPasssword] = useState('')
    const {setAtoken} = useContext(AdminContext)
    const {setDtoken} = useContext(DoctorContext)

    const formSubmit = async (e) =>{
        e.preventDefault()
        try {
          if(state === 'Admin'){
            const {data} = await axios.post('http://localhost:8000/api/admin/login',{email,password})
            if(data.success){
              console.log(data.token)
              localStorage.setItem('aToken', data.token);
              setAtoken(data.token)
              toast.success('Loggin is Successfull')
            }else{
              toast.error(data.msg)
            }

          }else{

            const {data} = await axios.post('http://localhost:8000/api/doctor/login',{email,password})
            if(data.success){
              console.log(data.token)
              localStorage.setItem('dToken', data.token);
              setDtoken(data.token)
              console.log(data.token);
              
              toast.success('Loggin is Successfull')
            }else{
              toast.error(data.msg)
            }
          }

        } catch (error) {
          
        }
        
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
           type="email" 
           required  
           value={email}
           className='border rounded-sm w-full my-1 py-1'
           onChange={(e)=>setEmail(e.target.value)}
           />
           
           
           <p className='text-sm text-gray-500'>Password</p>
           <input 
           type="password" 
           required  
           value={password}
           className='border rounded-sm w-full my-1 py-1'
           onChange={(e)=>setPasssword(e.target.value)}
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
*/

import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPasssword] = useState('');
  const { setAtoken } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post('http://localhost:8000/api/admin/login', { email, password });
        if (data.success) {
          console.log(data.token);
          localStorage.setItem('aToken', data.token);
          setAtoken(data.token);

          // Handle demo account response
          if (data.msg && data.msg === 'Demo account has read-only access. Write operations are disabled.') {
            toast.warning(data.msg);  // Show warning for demo account
          } else {
            toast.success('Login is Successful');
          }
          console.log('demo');
          alert('Read-only access in live demo. Contact me for full access.')
          
        } else {
          toast.error(data.msg);
        }
      } else {
        const { data } = await axios.post('http://localhost:8000/api/doctor/login', { email, password });
        if (data.success) {
          console.log(data.token);
          localStorage.setItem('dToken', data.token);
          setDtoken(data.token);

          toast.success('Login is Successful');
        } else {
          toast.error(data.msg);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong, please try again.');
    }
  };

  return (
    <form onSubmit={formSubmit} className="flex items-center justify-center min-h-[80vh]">
      <div className="flex flex-col shadow-lg w-[340px] p-6">
        <h1 className="text-center pb-5 text-xl text-gray-500 font-semibold">
          <span className="text-primary">{state === 'Admin' ? 'Admin' : 'Doctor'}</span> Login
        </h1>

        <p className="text-sm text-gray-500">Email</p>
        <input
          type="email"
          required
          value={email}
          className="border rounded-sm w-full my-1 py-1"
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="text-sm text-gray-500">Password</p>
        <input
          type="password"
          required
          value={password}
          className="border rounded-sm w-full my-1 py-1"
          onChange={(e) => setPasssword(e.target.value)}
        />
        <button className="my-3 bg-primary p-2 text-white rounded-lg">Login</button>
        {state === 'Admin' ? (
          <p className="text-sm text-gray-600">
            <span>Doctor</span> Login{' '}
            <span onClick={() => setState('Doctor')} className="text-primary cursor-pointer">
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            <span>Admin</span> Login{' '}
            <span onClick={() => setState('Admin')} className="text-primary cursor-pointer">
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
