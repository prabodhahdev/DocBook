import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const[userData,setUserData]=useState({
    name:"Prabodha Harshani",
    image:assets.profile_pic,
    email:"prabodaharshani@gmail.com",
    phone:"+9457862154",
    address:{
      line1:"addf",
      line2:"dfggg"
    },
    gender:"Female",
    dob:"2000-09-04"
  })

  const [isEdit , setIsEdit]=useState(true)

  return (
    <div className='flex flex-col text-sm text-gray-900 max-w-lg  pb-10'>
      <img className='w-[175px] rounded-xl ' src={assets.profile_pic} alt="" />
      <div className='text-2xl text-gray-600 font-bold mt-2'>
      {
        isEdit ?
        < 
          input 
          type="text" 
          value={userData.name} 
          className='bg-gray-100 '
          onChange={e=>setUserData(prev =>({...prev,name:e.target.value})) }
         />

        :
        <p >{userData.name}</p>
      }
      </div>

      <hr />
      <p className='text-gray-600 py-3 underline text-m'>CONTACT INFOMATION</p>

      <div className='grid grid-cols-[1fr_3fr] gap-2 text-sm text-gray-900 '>
      <p>Email: </p>
      <p className='text-primary underline'>{userData.email}</p>
      <p>Phone:</p>
      {
        isEdit 
        ?
        <
          input 
          type="text" 
          name="" 
          id="" 
          className='bg-gray-100 max-w-28'
          value={userData.phone}
          onChange={e=> setUserData(prev=>({...prev,phone:e.target.value}))}
          />
        :
        <p>{userData.phone}</p>

      }
      <p>Address:</p>
      {
        isEdit 
        ?
          <p>
            <
            input
            type='text'
            name=''
            id=''
            className='bg-gray-100'
            value={userData.address.line1}          
            onChange={e=> setUserData(prev=>({...prev,line1:e.target.value}))}

          
          />
          <br />
          <
            input
            type='text'
            name=''
            id=''
            className='bg-gray-100 mt-1'
            value={userData.address.line1}          
            onChange={e=> setUserData(prev=>({...prev,line1:e.target.value}))}  
        />
        </p>
        :
        <p>
          {userData.address.line1}
          <br />
          {userData.address.line2}       
        </p>    
      }

      </div>
      <p className='text-gray-600 py-3 underline text-m'>BASIC INFORMATION</p>
      <div className='grid grid-cols-[1fr_3fr] gap-2 text-sm text-gray-900 '>
        <p>Gender:</p>
        {
          isEdit
          ? <select  className='bg-gray-100 max-w-28' onChange={e=>setUserData(prev=>({...prev,gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          :
          <p>
            {userData.gender}
          </p>
        }
        <p>DOB:</p>
        {
          isEdit ?
          <
          input
          type='date'
          name=''
          id=''
          className='bg-gray-100 max-w-28'
          value={userData.dob}          
          onChange={e=> setUserData(prev=>({...prev,dob:e.target.value}))}  
           />
           :
           <p>{userData.dob}</p>
        }

        
      </div> 
     <div>
      {
        isEdit 
        ? <button onClick={()=>setIsEdit(false)} className='bg-primary text-white py-2 px-5 rounded-xl my-8 hover:bg-black'>Save Details</button>
        : <button onClick={()=>setIsEdit(true)} className='bg-primary text-white py-2 px-5 rounded-xl my-8 hover:bg-black'>Edit</button>
      }
      
    </div>    
   
      
    </div>
  )
}

export default MyProfile
