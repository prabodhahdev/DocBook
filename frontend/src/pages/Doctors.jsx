import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const {speciality}=useParams();
  const navigate=useNavigate();
  const {doctors}=useContext(AppContext);

  const [filteredDoctors,setFilterdDoctors]=useState(doctors);
  const[fliterButton,setFilterButton]=useState(false)

  const filterBySpeciality=()=>{
    const SpecialDoctors= doctors.filter(doctor=>doctor.speciality===speciality);
    if(speciality){
      setFilterdDoctors(SpecialDoctors);
    }else{
      setFilterdDoctors(doctors);
    }

  }

  useEffect(()=>{
    filterBySpeciality();
  },[doctors,speciality])
  
  return (
    <div className=''>
            <p>Browse through the doctors</p>
      <div className='flex flex-col sm:flex-row py-5 items-start'>
        <button onClick={()=>setFilterButton(prev=>!prev)} className={`py-3 border border-gray-400 w-20 rounded-s ${fliterButton ? 'bg-primary text-white':'sm:hidden'}`}>Filter</button>
      {/*-- LEFT SIDE-*/}
      <div >
        <ul className={`mr-4  flex-col ${fliterButton ? 'flex':'hidden sm:flex'} `}>
          <li onClick={()=>speciality === 'General physician' ?navigate('/doctors'):navigate('/doctors/General physician')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="General physician"?"bg-indigo-100 text-black" :""}`}>General physician</li>
          <li onClick={()=>speciality === 'Gynecologist' ?navigate('/doctors'):navigate('/doctors/Gynecologist')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="Gynecologist"?"bg-indigo-100 text-black" :""}`}>Gynecologist</li>
          <li onClick={()=>speciality === 'Dermatologist' ?navigate('/doctors'):navigate('/doctors/Dermatologist')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="Dermatologist"?"bg-indigo-100 text-black" :""}`}>Dermatologist</li>
          <li onClick={()=>speciality === 'Pediatricians' ?navigate('/doctors'):navigate('/doctors/Pediatricians')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="Pediatricians"?"bg-indigo-100 text-black" :""}`}>Pediatricians</li>
          <li onClick={()=>speciality === 'Neurologist' ?navigate('/doctors'):navigate('/doctors/Neurologist')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="Neurologist"?"bg-indigo-100 text-black" :""}`}>Neurologist</li>
          <li onClick={()=>speciality === 'Gastroenterologist' ?navigate('/doctors'):navigate('/doctors/Gastroenterologist')} className= {`border bg-white rounded-xl cursor-pointer hover:bg-blue-50  mt-5 py-2 px-6 ${speciality==="Gastroenterologist"?"bg-indigo-100 text-black" :""}`}>Gastroenterologist</li>
        </ul>
      </div>
       {/*-- RIGHT SIDE-*/}
     
   
      <div className=' w-full grid grid-cols-auto gap-4 pt-5 px-3 gap-y-6 sm:px-0'>
      {filteredDoctors.map((item,index)=>(
          <div  key={index} onClick={()=>navigate(`/appointments/${item._id}`)} className='border border-blue-100 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
              <img className='bg-blue-50' src={item.image} alt="" />
              <div className='p-4'>
                  <div className='flex items-center gap-2 '>
                      <p className='w-1.5 h-1.5 rounded-full bg-green-500'></p><p className='text-sm text-green-500'>Available</p>
                  </div>
                  <p className='text-gray-900 font-medium'>{item.name}</p>
                  <p className='text-gray-500 text-sm'>{item.speciality}</p>
              </div>
          </div>  
      ))}
    </div>
    
      </div>
     
    </div>
  )
}

export default Doctors
