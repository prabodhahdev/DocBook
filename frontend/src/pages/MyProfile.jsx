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
  return (
    <div>
      <img src={assets.profile_pic} alt="" />
    </div>
  )
}

export default MyProfile
