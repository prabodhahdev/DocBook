import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const navigate=useNavigate();

  const {docId}=useParams();
  const {doctors,currencySymbol , token , getDoctorsData}=useContext(AppContext);
  
  const daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const[RelevantDoc,setRelevantDoc]=useState(null)
  const[docSlots,setDocSlots]=useState([])
  const[slotIndex,setSlotIndex]=useState(0)
  const[slotTime,setSlotTime]=useState('')

  const fetchDoctorInfo= async()=>{
    const doc=doctors.find(doc=>doc._id=== docId);
    setRelevantDoc(doc);

  }

  const getAvailableSlots = async () => {
    setDocSlots([]);
  
    // Getting the current date
    let today = new Date();
  
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      console.log(currentDate);
  
      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
  
      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        // If today is the current date, set the current time
        currentDate.setHours(today.getHours() >= 10 ? today.getHours() + 1 : 10);
        currentDate.setMinutes(today.getMinutes() > 30 ? 30 : 0);
      } else {
        // If it's another day, start at 10:00 AM
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
  
      let timeSlots = [];
      // Add the time slots range
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        let day = currentDate.getDate()
        let month = currentDate.getMonth()+1 
        let year = currentDate.getFullYear()


        const slotDate = day+"_"+month+"_"+year
        const slotTime = formattedTime
        
        const isSlotAvailable =RelevantDoc.booked_slots[slotDate] && RelevantDoc.booked_slots[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){

          timeSlots.push({
            dateTime: new Date(currentDate),
            time: formattedTime
          });

        }

        
        // Increment current time
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => [...prev, timeSlots]);
    }
  };
  

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Before Booking, Login")
      return navigate('/login')
      
    }

    try {
      const date = docSlots[slotIndex][0].dateTime

      let day = date.getDate()
      let month = date.getMonth()+1 
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      
      const { data } = await axios.post('https://docbook-backend-cjvu.onrender.com/api/user/book-appointment',{docId,slotDate,slotTime},{headers :{token} })
      if (data.success) {
        toast.success(data.msg)
        getDoctorsData()
        navigate('/my-appointments')    
      }
      else{
        toast.error(data.msg)
      }
      

      
    } catch (error) {
      console.log(error)
      toast.error(error.msg)
    }
  }


  useEffect(()=>{
    fetchDoctorInfo();
  },[doctors,docId])

  useEffect(()=>{
    getAvailableSlots();
  },[RelevantDoc])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  if(!RelevantDoc){
    return <div></div>
  }

  
  const specialityDoc=RelevantDoc.speciality;
  const relevantSpeciDoc=doctors.filter((doc)=>doc.speciality===specialityDoc);


  return  (
    <div className='flex flex-col'>
       {/*------------Top ------------------- */}
      <div className='flex flex-col sm:flex-row sm:items-start gap-10'>
        <div className='sm:w-1/4 bg-primary rounded-2xl '>
        <img className='pt-5 ' src={RelevantDoc.image} alt="" />
        </div>
        {/*--Top------------Right---- Side------------------------------*/}
        <div className='sm:w-3/4 '>
        <div className='flex flex-col gap-1 border border-blue-300 rounded-3xl p-8'>
          <h1 className='text-xl font-medium text-gray-700 sm:text-3xl flex gap-2 items-center'>{RelevantDoc.name} <img className='w-5' src={assets.verified_icon} alt="" /> </h1>
            <div className='flex gap-2 items-center text-gray-500 text-sm'>
            <p >{RelevantDoc.degree}</p><p>-</p><p>{RelevantDoc.speciality}</p><button className='border border-gray-500 rounded-full px-3'>{RelevantDoc.experience}</button>
            </div>
          <p className='text-gray-600 font-semibold flex gap-2 '>About <img className='w-4' src={assets.info_icon} alt="" /> </p>
          <p className='text-gray-500 text-m'>{RelevantDoc.about}</p>
          <p className='text-gray-600 flex gap-2 items-center mt-5'>Appointment fee: <p className='text-gray-900 font-semibold'>{currencySymbol}{RelevantDoc.fees}</p></p>
        </div>
        {/*-----------------Booking Time Slots----------------------- */}
        <div className='sm:pl-4 mt-4 font-medium text-gray-700'>
          <h1>Booking Slots</h1>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4 '>
            {docSlots.length && docSlots.map((item,index)=>(

              <div onClick={()=>setSlotIndex(index)}  key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-primary text-white' : 'border border-gray-200'}`}>
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
              

            ))
            }
          </div>
          <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots[slotIndex].map((item,index)=>(
                <p  onClick={()=>setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-200'}`}>
                  {item.time.toLowerCase()}
                </p>

              ))
            }
          </div>
          <button onClick={bookAppointment} className='my-10 flex  bg-primary text-white py-3 px-16 rounded-full text-sm'>Book an appointment</button>

        </div>
        
        </div>
      </div>
      {/*------------Bottom ------------------- */}
      <div className='my-20'>
        <p className='text-center text-gray-800 text-3xl'>Related Doctors</p>
        <p className='text-center mb-5 text-gray'>Simply browse through our extensive list of trusted doctors.</p>
        <div className=' w-full grid grid-cols-auto gap-4 pt-5 px-3 gap-y-6 sm:px-0'>
          {relevantSpeciDoc.map((item,index)=>
               <div  key={index} onClick={()=>{navigate(`/appointments/${item._id}`);scrollTo(0,0);}} className='border border-blue-100 overflow-hidden rounded-xl cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
               <img className='bg-blue-50' src={item.image} alt="" />
               <div className='p-4'>
                   <div className='flex items-center gap-2 '>
                       <p className='w-1.5 h-1.5 rounded-full bg-green-500'></p><p className='text-sm text-green-500'>Available</p>
                   </div>
                   <p className='text-gray-900 font-medium'>{item.name}</p>
                   <p className='text-gray-500 text-sm'>{item.speciality}</p>
               </div>
           </div>  
          )}
        </div>
      </div>
    </div>
  )
}

export default Appointment
