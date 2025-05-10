import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {

  const {userData,setUserData, token,loadUserProfileData} = useContext(AppContext)

  const [isEdit , setIsEdit]=useState(false)
  const [image,setImage] = useState(false)

  const updateUserprofiledata = async () => {
    try {
      const formData = new FormData();
  
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
  
      if (image) {
        console.log("Appending image:", image); 
        formData.append("image", image);
      }
      
  

      console.log("Form Data: ", formData); // Debugging
      // Log the contents of FormData
for (let pair of formData.entries()) {
  console.log(pair[0] + ": " + pair[1]);
}
  
      const { data } = await axios.post("https://docbook-backend-cjvu.onrender.com/api/user/update-profile", formData, {
        headers: { token }
      });
  
      if (data.success) {
        toast.success(data.msg);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(error.msg);
    }
  };
  


  return  userData && (
    <div className='flex flex-col text-sm text-gray-900 max-w-lg  pb-10'>
      {
        isEdit ?
        <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file"  id='image' hidden/>

        </label> 
              
        : <img className='w-[175px] rounded-xl ' src={userData.image} alt="" />


      }
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
            onChange={(e)=> setUserData(prev=>({...prev,address:{...prev.address, line1:e.target.value}}))}

          
          />
          <br />
          <
            input
            type='text'
            name=''
            id=''
            className='bg-gray-100 mt-1'
            value={userData.address.line2}          
            onChange={(e)=> setUserData(prev=>({...prev,address:{...prev.address, line2:e.target.value}}))}
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
        ? <button onClick={updateUserprofiledata} className='bg-primary text-white py-2 px-5 rounded-xl my-8 hover:bg-black'>Save Details</button>
        : <button onClick={()=>setIsEdit(true)} className='bg-primary text-white py-2 px-5 rounded-xl my-8 hover:bg-black'>Edit</button>
      }
      
    </div>    
   
      
    </div>
  )
}

export default MyProfile
